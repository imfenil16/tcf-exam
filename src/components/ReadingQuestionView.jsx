import { useState, useEffect } from 'react';
import OptionsList from './OptionsList';

export default function ReadingQuestionView({
  question,
  selectedAnswer,
  isFlagged,
  onSelectAnswer,
  onToggleFlag,
  onPrev,
  onNext,
  totalQuestions,
  mode,
}) {
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    if (!zoomedImage) return;
    const handleKey = (e) => { if (e.key === 'Escape') setZoomedImage(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomedImage]);

  return (
    <div className="question-area">
      {/* Header */}
      <div className="question-header">
        <div className="question-number">
          <span className="q-num-badge">Q{question.id}</span>
          <span className="q-type-badge">{question.sectionTitle}</span>
          <span className={`level-badge level-${question.level?.toLowerCase()}`}>{question.level}</span>
          {mode === 'exam' && <span className="mode-badge mode-exam">Mode examen</span>}
          {mode === 'training' && <span className="mode-badge mode-training">Mode entraînement</span>}
        </div>
        <div className="question-actions">
          <button
            className={`flag-btn ${isFlagged ? 'flagged' : ''}`}
            onClick={onToggleFlag}
            aria-label={isFlagged ? 'Retirer le marquage' : 'Marquer la question'}
            aria-pressed={isFlagged}
          >
            🚩 {isFlagged ? 'Marquée' : 'Marquer'}
          </button>
        </div>
      </div>

      {/* Document image */}
      <div className="reading-document" onClick={() => setZoomedImage(question.image)} role="button" tabIndex={0} aria-label="Agrandir le document" onKeyDown={(e) => { if (e.key === 'Enter') setZoomedImage(question.image); }}>
        <img src={question.image} alt={`Document pour la question ${question.id}`} />
        <span className="zoom-hint">🔍 Cliquez sur l'image pour agrandir</span>
      </div>

      {/* Question text */}
      <div className="reading-question">{question.question}</div>

      {/* Options */}
      <OptionsList
        question={question}
        selectedAnswer={selectedAnswer}
        onSelect={onSelectAnswer}
      />

      {/* Navigation */}
      <div className="question-nav">
        <button
          className="btn btn-secondary"
          onClick={onPrev}
          disabled={question.id === 1 || mode === 'exam'}
        >
          ← Précédente
        </button>
        <span className="nav-info">
          <kbd>←</kbd> <kbd>→</kbd> naviguer &nbsp; <kbd>1</kbd>–<kbd>4</kbd> répondre
        </span>
        <button
          className="btn btn-secondary"
          onClick={onNext}
          disabled={question.id === totalQuestions}
        >
          Suivante →
        </button>
      </div>

      {/* Zoom overlay */}
      {zoomedImage && (
        <div className="image-zoom-overlay" onClick={() => setZoomedImage(null)} role="dialog" aria-label="Document agrandi">
          <img src={zoomedImage} alt="Document agrandi" />
        </div>
      )}
    </div>
  );
}
