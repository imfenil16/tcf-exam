export default function Sidebar({ questions = [], sections = [], currentQuestion, answers, flagged, onSelect }) {
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <aside className="sidebar">
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Progression</span>
          <span className="progress-value">{answeredCount}/{questions.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {sections.map(({ id, title, levels, range }) => {
        const sectionQs = questions.filter(q => q.id >= range[0] && q.id <= range[1]);
        const answeredInSection = sectionQs.filter(q => answers[q.id] !== undefined).length;
        return (
          <div className="sidebar-section" key={id}>
            <div className="sidebar-title">
              {title.split(' — ')[0]}
              <span className="section-progress">{answeredInSection}/{sectionQs.length}</span>
            </div>
            <div className="sidebar-subtitle">{title.split(' — ')[1]} · {levels}</div>
            <div className="question-grid">
              {sectionQs.map((q) => {
                const classes = ['q-btn'];
                if (q.id === currentQuestion) classes.push('active');
                if (answers[q.id] !== undefined) classes.push('answered');
                if (flagged.includes(q.id)) classes.push('flagged');
                return (
                  <button
                    key={q.id}
                    className={classes.join(' ')}
                    onClick={() => onSelect(q.id)}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="legend">
        <div className="legend-item">
          <span className="legend-dot current" />
          Actuelle
        </div>
        <div className="legend-item">
          <span className="legend-dot answered" />
          Répondu
        </div>
        <div className="legend-item">
          <span className="legend-dot flagged" />
          Marquée
        </div>
      </div>
    </aside>
  );
}
