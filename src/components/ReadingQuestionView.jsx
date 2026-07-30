import { useState } from 'react';
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
          >
            🚩 {isFlagged ? 'Marquée' : 'Marquer'}
          </button>
        </div>
      </div>

      {/* Document image */}
      <div className="reading-document" onClick={() => setZoomedImage(question.image)}>
        <img src={question.image} alt={`Document question ${question.id}`} />
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
        <div className="image-zoom-overlay" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Document agrandi" />
        </div>
      )}
    </div>
  );
}
