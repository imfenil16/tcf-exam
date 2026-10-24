"""TCF listening audio verifier (semantic).

Pipeline per question:
  1. Download the audio clip (cached).
  2. Transcribe it to French with faster-whisper (cached).
  3. For 'text-answers' questions, ask an LLM (Groq) whether the audio actually
     belongs to this question and whether the marked correct answer is supported.
     The judgement tolerates paraphrase and ASR noise (judges meaning, not words).

Caches downloads, transcripts, and judgements, so re-runs are cheap and only new
work hits the network / API.

Usage (repo root, astro-compare venv python):
  python tools/verify_audio.py --keys T12Q39,T14Q29        # specific questions
  python tools/verify_audio.py --test 28                   # one whole test
  python tools/verify_audio.py --test 3 --sample 8         # 8 random from a test
  python tools/verify_audio.py --all                       # every listening clip
  python tools/verify_audio.py --keys T3Q13 --no-judge     # transcript only

Flags: --model {tiny,base,small,medium} (default small), --no-judge
Needs GROQ_API_KEY (read from astro-compare/.env).
"""
import argparse
import hashlib
import json
import os
import random
import re
import sys
import time
import urllib.parse
import urllib.request

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass
try:
    import truststore
    truststore.inject_into_ssl()
except Exception:
    pass

HERE = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR = os.path.join(HERE, "audio-cache")
TRANS_DIR = os.path.join(HERE, "transcripts")
JUDGE_DIR = os.path.join(HERE, "judgements")
QUESTIONS = os.path.join(HERE, "co-questions.json")
for d in (AUDIO_DIR, TRANS_DIR, JUDGE_DIR):
    os.makedirs(d, exist_ok=True)

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"


def load_env(path):
    if not os.path.exists(path):
        return
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env(r"C:\Users\P12B537\astro-compare\.env")


def cache_name(url: str) -> str:
    base = re.sub(r"[^A-Za-z0-9._-]", "_", urllib.parse.unquote(url.split("/")[-1]))
    folder = url.split("/uploads/")[-1].rsplit("/", 1)[0].replace("/", "-") if "/uploads/" in url else "x"
    return f"{folder}__{base}"


def download(url: str) -> str:
    path = os.path.join(AUDIO_DIR, cache_name(url))
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return path
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return path


_MODEL = None


def transcribe(url: str, model_name: str) -> str:
    tpath = os.path.join(TRANS_DIR, cache_name(url) + f".{model_name}.txt")
    if os.path.exists(tpath):
        return open(tpath, encoding="utf-8").read()
    audio = download(url)
    global _MODEL
    if _MODEL is None:
        from faster_whisper import WhisperModel
        _MODEL = WhisperModel(model_name, device="cpu", compute_type="int8")
    segments, _ = _MODEL.transcribe(audio, language="fr", beam_size=1, vad_filter=True)
    text = " ".join(s.text.strip() for s in segments).strip()
    with open(tpath, "w", encoding="utf-8") as f:
        f.write(text)
    return text


JUDGE_SYSTEM = (
    "You verify French TCF listening-comprehension questions. You receive a TRANSCRIPT of an "
    "audio clip (automatic speech recognition, so it may contain errors) and a multiple-choice "
    "QUESTION with four options plus the index of the marked correct answer. Judge by MEANING "
    "and TOPIC, tolerating transcription noise and the fact that options paraphrase the audio "
    "rather than quoting it.\n"
    "Return STRICT JSON only: {\"match\": \"yes|no|unclear\", \"answer_ok\": \"yes|no|unclear\", "
    "\"confidence\": 0.0-1.0, \"reason\": \"one short sentence\"}.\n"
    "match = the audio is plausibly the source document these four options were written about "
    "(same scenario/topic). answer_ok = the marked correct answer is supported by the audio. "
    "Use 'no' for match only when the audio is clearly about a different subject than ALL four "
    "options."
)


def _groq_call(messages):
    key = os.environ["GROQ_API_KEY"]
    model = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
    body = {"model": model, "messages": messages, "temperature": 0.1,
            "max_completion_tokens": 700, "response_format": {"type": "json_object"}}
    if "gpt-oss" in model:
        body["reasoning_effort"] = "low"
    req = urllib.request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}",
                 "User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    content = data["choices"][0]["message"]["content"]
    if not content or not content.strip():
        raise RuntimeError("empty generation")
    return json.loads(content)


def judge(transcript, options, correct_idx):
    sig = hashlib.sha1((transcript + "||" + "|".join(options) + f"||{correct_idx}").encode("utf-8")).hexdigest()
    jpath = os.path.join(JUDGE_DIR, sig + ".json")
    if os.path.exists(jpath):
        return json.load(open(jpath, encoding="utf-8"))
    opts = "\n".join(f"  [{i}] {o}" for i, o in enumerate(options))
    user = (f"TRANSCRIPT:\n{transcript}\n\nQUESTION OPTIONS:\n{opts}\n\n"
            f"MARKED CORRECT ANSWER: index {correct_idx} = \"{options[correct_idx]}\"")
    out = _groq_call([{"role": "system", "content": JUDGE_SYSTEM},
                      {"role": "user", "content": user}])
    json.dump(out, open(jpath, "w", encoding="utf-8"), ensure_ascii=False)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--keys")
    ap.add_argument("--test", type=int)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--sample", type=int)
    ap.add_argument("--model", default="small")
    ap.add_argument("--no-judge", action="store_true")
    args = ap.parse_args()

    data = json.load(open(QUESTIONS, encoding="utf-8"))
    by_key = {q["key"]: q for q in data}
    if args.keys:
        items = [by_key[k] for k in args.keys.split(",") if k in by_key]
    elif args.test:
        items = [q for q in data if q["test"] == args.test]
    elif args.all:
        items = list(data)
    else:
        print("Specify --keys, --test, or --all")
        return
    if args.sample and len(items) > args.sample:
        items = random.sample(items, args.sample)

    results = []
    for i, q in enumerate(items, 1):
        if not q["audio"]:
            continue
        # In judge mode only text-answers can be checked (they carry on-screen options).
        if not args.no_judge and (q["type"] != "text-answers" or not q["options"]):
            continue
        try:
            tr = transcribe(q["audio"], args.model)
        except Exception as e:
            print(f"[{i}/{len(items)}] {q['key']}: TRANSCRIBE ERROR {e}")
            results.append({"key": q["key"], "verdict": "error", "reason": str(e),
                            "type": q["type"], "audio": q["audio"], "transcript": ""})
            continue
        if q["type"] == "text-answers" and q["options"] and not args.no_judge:
            try:
                j = judge(tr, q["options"], q["correctAnswer"])
            except Exception as e:
                print(f"[{i}/{len(items)}] {q['key']}: JUDGE ERROR {e}")
                results.append({"key": q["key"], "verdict": "judge-error", "reason": str(e),
                                "type": q["type"], "audio": q["audio"], "transcript": tr})
                continue
            verdict = j.get("match", "unclear")
            mark = {"yes": "OK ", "no": "BAD", "unclear": "?? "}.get(verdict, "?? ")
            ans = j.get("answer_ok", "?")
            print(f"[{i}/{len(items)}] {q['key']}: match={mark} answer_ok={ans} "
                  f"conf={j.get('confidence')}  {j.get('reason','')}")
            results.append({"key": q["key"], "verdict": verdict, "answer_ok": ans,
                            "confidence": j.get("confidence"), "reason": j.get("reason", ""),
                            "type": q["type"], "audio": q["audio"],
                            "options": q["options"], "correctAnswer": q["correctAnswer"],
                            "transcript": tr})
            if args.all:
                time.sleep(0.4)
        else:
            print(f"[{i}/{len(items)}] {q['key']}: (type {q['type']} - no options to judge)")
            results.append({"key": q["key"], "verdict": "n/a", "type": q["type"],
                            "audio": q["audio"], "transcript": tr})

    bad = [r for r in results if r.get("verdict") == "no"]
    unclear = [r for r in results if r.get("verdict") == "unclear"]
    ans_bad = [r for r in results if r.get("answer_ok") == "no"]
    print("\n===== FLAGGED: audio does NOT match question =====")
    for r in bad:
        print(f"  {r['key']}: {r.get('reason','')}")
        print(f"     audio: {r['transcript'][:150]}")
        print(f"     opts : {' | '.join(r.get('options', []))[:150]}")
    if ans_bad:
        print("\n===== answer key possibly wrong (audio matches, marked answer unsupported) =====")
        for r in ans_bad:
            if r.get("verdict") != "no":
                print(f"  {r['key']}: {r.get('reason','')}")
    print(f"\nChecked {len(results)} | mismatched {len(bad)} | unclear {len(unclear)} | "
          f"answer-suspect {len(ans_bad)}")
    report = os.path.join(HERE, "verify-report.json")
    json.dump(results, open(report, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"Report -> {report}")


if __name__ == "__main__":
    main()
