"""Re-transcribe any cached clips whose transcript came out empty.

verify_audio.py caches empty results too, so a clip that VAD-filtered to nothing
never gets retried. This pass finds 0-byte *.small.txt transcripts, and re-runs
faster-whisper with VAD disabled (small, then medium fallback) on the already
downloaded audio in audio-cache/.

Run with the astro-compare venv python:
  python tools/retry_empty.py
"""
import os
import subprocess
import sys
import tempfile

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

HERE = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR = os.path.join(HERE, "audio-cache")
TRANS_DIR = os.path.join(HERE, "transcripts")

_MODELS = {}


def get_model(name):
    if name not in _MODELS:
        from faster_whisper import WhisperModel
        _MODELS[name] = WhisperModel(name, device="cpu", compute_type="int8")
    return _MODELS[name]


def ffmpeg_to_wav(src):
    import imageio_ffmpeg
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    fd, wav = tempfile.mkstemp(suffix=".wav")
    os.close(fd)
    r = subprocess.run([ff, "-y", "-i", src, "-ac", "1", "-ar", "16000", "-f", "wav", wav],
                       capture_output=True)
    if r.returncode != 0 or not os.path.exists(wav) or os.path.getsize(wav) == 0:
        raise RuntimeError("ffmpeg decode failed")
    return wav


def run(model_name, audio_path):
    model = get_model(model_name)
    try:
        segments, _ = model.transcribe(audio_path, language="fr", beam_size=5, vad_filter=False)
        return " ".join(s.text.strip() for s in segments).strip()
    except Exception:
        wav = ffmpeg_to_wav(audio_path)
        try:
            segments, _ = model.transcribe(wav, language="fr", beam_size=5, vad_filter=False)
            return " ".join(s.text.strip() for s in segments).strip()
        finally:
            os.remove(wav)


def main():
    empties = []
    for fn in os.listdir(TRANS_DIR):
        if not fn.endswith(".small.txt"):
            continue
        p = os.path.join(TRANS_DIR, fn)
        if os.path.getsize(p) == 0:
            empties.append(fn)
    print(f"Found {len(empties)} empty transcripts.")
    for fn in empties:
        audio_name = fn[:-len(".small.txt")]  # strip suffix -> cached audio filename
        audio = os.path.join(AUDIO_DIR, audio_name)
        if not os.path.exists(audio):
            print(f"  {audio_name}: audio missing, skip")
            continue
        text = run("small", audio)
        used = "small"
        if not text:
            text = run("medium", audio)
            used = "medium"
        tp = os.path.join(TRANS_DIR, fn)
        with open(tp, "w", encoding="utf-8") as f:
            f.write(text)
        preview = (text[:80] + "...") if len(text) > 80 else text
        print(f"  {audio_name}: [{used}] {'EMPTY-STILL' if not text else preview}")


if __name__ == "__main__":
    main()
