export default function Header({ timer, onSubmit }) {
  const timerClass = timer.minutes < 5 ? 'danger' : timer.minutes < 10 ? 'warning' : '';

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">🎧</div>
          <span>TCF Canada</span>
        </div>
        <span className="test-badge">Compréhension Orale</span>
      </div>

      <div className="header-center">
        <div className={`timer-display ${timerClass}`}>
          <span className="timer-icon">⏱</span>
          <span className="timer-value">{timer.formatted}</span>
        </div>
      </div>

      <div className="header-right">
        <button className="btn btn-primary" onClick={onSubmit}>
          ✓ Terminer
        </button>
      </div>
    </header>
  );
}
