export default function Header({ timer, onSubmit, onGoHome, isReadingTest }) {
  const timerClass = timer.minutes < 5 ? 'danger' : timer.minutes < 10 ? 'warning' : '';

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button className="logo" onClick={onGoHome} title="Retour à l'accueil" aria-label="Retour à l'accueil">
          <div className="logo-icon">{isReadingTest ? '📖' : '🎧'}</div>
          <span>TCF Canada</span>
        </button>
        <span className="test-badge">{isReadingTest ? 'Compréhension Écrite' : 'Compréhension Orale'}</span>
      </div>

      <div className="header-center">
        <div className={`timer-display ${timerClass}`}>
          <span className="timer-icon">⏱</span>
          <span className="timer-value">{timer.formatted}</span>
        </div>
      </div>

      <div className="header-right">
        <button className="btn btn-primary" onClick={onSubmit} aria-label="Terminer le test">
          ✓ Terminer
        </button>
      </div>
    </header>
  );
}
