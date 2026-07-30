const LETTERS = ['A', 'B', 'C', 'D'];

export default function ReviewScreen({ questions = [], answers, onBack, onFinish, onGoToQuestion }) {
  return (
    <div className="review-screen">
      <div className="review-header">
        <h2>Révision des réponses</h2>
        <p>{Object.keys(answers).length}/{questions.length} questions répondues</p>
        <p className="review-hint">Cliquez sur une question pour y retourner et corriger votre réponse</p>
      </div>

      <div className="review-list">
        {questions.map(q => {
          const userAnswer = answers[q.id];
          const answered = userAnswer !== undefined;
          const isCorrect = answered && q.correctAnswer !== null && userAnswer === q.correctAnswer;
          const isIncorrect = answered && q.correctAnswer !== null && userAnswer !== q.correctAnswer;

          let statusClass = 'unanswered';
          if (isCorrect) statusClass = 'correct';
          else if (isIncorrect) statusClass = 'incorrect';
          else if (answered) statusClass = 'answered';

          return (
            <div key={q.id} className={`review-item ${statusClass} clickable`} onClick={() => onGoToQuestion(q.id)}>
              <div className="review-item-header">
                <span className="review-q-num">Q{q.id}</span>
                <span className="review-section">S{q.section}</span>
                <span className={`level-badge level-${q.level?.toLowerCase()}`}>{q.level}</span>
                {isCorrect && <span className="review-status correct-badge">✓ Correct</span>}
                {isIncorrect && <span className="review-status incorrect-badge">✗ Incorrect</span>}
              </div>
              <div className="review-item-body">
                {answered ? (
                  <div className="review-answer-details">
                    <div className={`review-user-answer ${isIncorrect ? 'wrong' : ''}`}>
                      <span className="review-label">Votre réponse :</span>
                      <span className="review-answer-letter">{LETTERS[userAnswer]}</span>
                      {q.options && q.options[userAnswer] && (
                        <span className="review-answer-text">{q.options[userAnswer]}</span>
                      )}
                    </div>
                    {isIncorrect && q.correctAnswer !== null && (
                      <div className="review-correct-answer">
                        <span className="review-label">Bonne réponse :</span>
                        <span className="review-answer-letter correct-letter">{LETTERS[q.correctAnswer]}</span>
                        {q.options && q.options[q.correctAnswer] && (
                          <span className="review-answer-text">{q.options[q.correctAnswer]}</span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="review-answer-details">
                    <span className="review-no-answer">Pas de réponse</span>
                    {q.correctAnswer !== null && (
                      <div className="review-correct-answer">
                        <span className="review-label">Bonne réponse :</span>
                        <span className="review-answer-letter correct-letter">{LETTERS[q.correctAnswer]}</span>
                        {q.options && q.options[q.correctAnswer] && (
                          <span className="review-answer-text">{q.options[q.correctAnswer]}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="review-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Retour au test
        </button>
        <button className="btn btn-primary" onClick={onFinish}>
          Terminer
        </button>
      </div>
    </div>
  );
}
