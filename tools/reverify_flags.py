"""Re-verify flagged questions with a fuller transcript.

Several BAD flags come from truncated/garbled ASR (VAD clipping the clip start).
This re-transcribes each flagged key with vad_filter=False and a larger model,
then re-judges, so we can separate genuine audio/question mismatches from ASR noise.

Usage:
  python tools/reverify_flags.py T24Q38,T33Q26,T36Q31 --model medium
  python tools/reverify_flags.py --from-report        # all verdict==no in verify-report.json
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import verify_audio as va  # reuse download/ffmpeg/judge + env loading

HERE = os.path.dirname(os.path.abspath(__file__))


def transcribe_full(url: str, model_name: str) -> str:
    """Transcribe with NO vad filter (keep the whole clip) and a bigger beam."""
    audio = va.download(url)
    if va._MODEL is None:
        from faster_whisper import WhisperModel
        va._MODEL = WhisperModel(model_name, device="cpu", compute_type="int8")

    def run(path):
        segments, _ = va._MODEL.transcribe(path, language="fr", beam_size=5,
                                           vad_filter=False)
        return " ".join(s.text.strip() for s in segments).strip()

    try:
        return run(audio)
    except Exception:
        wav = va._ffmpeg_to_wav(audio)
        try:
            return run(wav)
        finally:
            os.remove(wav)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("keys", nargs="?", default="")
    ap.add_argument("--from-report", action="store_true")
    ap.add_argument("--model", default="medium")
    args = ap.parse_args()

    data = json.load(open(va.QUESTIONS, encoding="utf-8"))
    by_key = {q["key"]: q for q in data}

    if args.from_report:
        rep = json.load(open(os.path.join(HERE, "verify-report.json"), encoding="utf-8"))
        keys = [r["key"] for r in rep if r.get("verdict") == "no"]
    else:
        keys = [k for k in args.keys.split(",") if k]

    print(f"Re-verifying {len(keys)} flagged questions with model={args.model}, vad_filter=OFF\n")
    still_bad = []
    for k in keys:
        q = by_key.get(k)
        if not q:
            print(f"{k}: not found")
            continue
        tr = transcribe_full(q["audio"], args.model)
        # fresh judgement (bypass cache: judge() keys on transcript+options, and this
        # transcript differs from the vad-filtered one, so it is a new entry)
        j = va.judge(tr, q["options"], q["correctAnswer"])
        verdict = j.get("match", "unclear")
        mark = {"yes": "OK ", "no": "BAD", "unclear": "?? "}.get(verdict, "?? ")
        print(f"{k}: match={mark} answer_ok={j.get('answer_ok')} conf={j.get('confidence')}")
        print(f"   reason : {j.get('reason','')}")
        print(f"   marked : [{q['correctAnswer']}] {q['options'][q['correctAnswer']]}")
        print(f"   transc.: {tr[:280]}\n")
        if verdict == "no":
            still_bad.append(k)

    print("=" * 60)
    print(f"Still BAD after fuller transcript: {len(still_bad)} -> {', '.join(still_bad) if still_bad else 'none'}")


if __name__ == "__main__":
    main()
