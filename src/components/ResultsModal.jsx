function estimateCECRLevel(questions, answers) {
  const sectionScores = {};
  questions.forEach(q => {
    const section = q.section || 1;
    if (!sectionScores[section]) sectionScores[section] = { correct: 0, total: 0 };
    sectionScores[section].total++;
    if (answers[q.id] === q.correctAnswer) sectionScores[section].correct++;
  });

  const pct = (s) => sectionScores[s] ? (sectionScores[s].correct / sectionScores[s].total) * 100 : 0;

  let level;
  if (pct(4) >= 60) level = 'C1';
  else if (pct(4) >= 30 && pct(3) >= 60) level = 'B2';
  else if (pct(3) >= 60) level = 'B1';
  else if (pct(2) >= 60 || pct(1) >= 60) level = 'A2';
  else level = 'A1';

  return { level, sectionScores, pct };
}

const levelColors = {
  'A1': '#ef4444',
  'A2': '#f97316',
  'B1': '#eab308',
  'B2': '#22c55e',
  'C1': '#3b82f6',
  'C2': '#8b5cf6',
};

const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function ResultsModal({ questions = [], answers, totalQuestions, onRestart, onReview }) {
  const answeredCount = Object.keys(answers).length;
  const unanswered = totalQuestions - answeredCount;

  let correctCount = 0;
  let incorrectCount = 0;
  questions.forEach((q) => {
    if (answers[q.id] !== undefined && q.correctAnswer !== null) {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });
  const gradable = questions.filter((q) => q.correctAnswer !== null).length;
  const scorePercent = gradable > 0 ? Math.round((correctCount / gradable) * 100) : 0;

  const { level, sectionScores, pct } = estimateCECRLevel(questions, answers);
  const levelIndex = levelOrder.indexOf(level);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-icon">📋</span>
          <h2 className="modal-title">Test terminé</h2>
          <p className="modal-subtitle">Voici le résumé de vos réponses</p>
        </div>

        {gradable > 0 && (
          <div className="cecr-card">
            <div className="cecr-badge" style={{ background: levelColors[level] }}>
              {level}
            </div>
            <div className="cecr-info">
              <span className="cecr-label">Niveau CECR estimé</span>
              <div className="cecr-progress">
                {levelOrder.map((l, i) => (
                  <div
                    key={l}
                    className={`cecr-dot ${i <= levelIndex ? 'active' : ''}`}
                    style={{ background: i <= levelIndex ? levelColors[l] : 'var(--bg-tertiary)' }}
                    title={l}
                  >
                    <span className="cecr-dot-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value stat-correct">{correctCount}</div>
            <div className="stat-label">Correctes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value stat-incorrect">{incorrectCount}</div>
            <div className="stat-label">Incorrectes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{unanswered}</div>
            <div className="stat-label">Sans réponse</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{scorePercent}%</div>
            <div className="stat-label">Score</div>
          </div>
        </div>

        {gradable > 0 && Object.keys(sectionScores).length > 1 && (
          <div className="section-breakdown">
            <h4 className="breakdown-title">Performance par section</h4>
            {Object.entries(sectionScores).sort(([a],[b]) => a - b).map(([sec, data]) => {
              const percent = Math.round((data.correct / data.total) * 100);
              return (
                <div key={sec} className="breakdown-row">
                  <span className="breakdown-label">Section {sec}</span>
                  <div className="breakdown-bar-container">
                    <div className="breakdown-bar" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="breakdown-pct">{percent}%</span>
                  <span className="breakdown-detail">{data.correct}/{data.total}</span>
                </div>
              );
            })}
          </div>
        )}

        {gradable === 0 && (
          <p className="grading-note">
            ⚠️ Les réponses correctes ne sont pas encore configurées. Le score sera disponible une fois la clé de correction ajoutée.
          </p>
        )}

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onReview}>
            📝 Revoir
          </button>
          <button className="btn btn-primary" onClick={onRestart}>
            🔄 Recommencer
          </button>
        </div>
      </div>
    </div>
  );
}
