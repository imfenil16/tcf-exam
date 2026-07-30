import { useMemo } from 'react';

function formatTime(sec) {
  if (!sec || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function AudioPlayer({ isPlaying, currentTime, duration, progress, onToggle, onSeek }) {
  const bars = useMemo(
    () => Array.from({ length: 30 }, (_, i) => 8 + Math.random() * 20),
    []
  );

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(ratio * duration);
  };

  return (
    <div className="audio-player">
      <button className="play-btn" onClick={onToggle}>
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="player-body">
        <div className="waveform">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`wave-bar ${isPlaying ? 'active' : ''}`}
              style={{
                height: `${isPlaying ? h : 8}px`,
                animationDelay: `${i * 0.04}s`,
              }}
            />
          ))}
        </div>
        <div className="player-progress" onClick={handleProgressClick}>
          <div className="player-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="player-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
