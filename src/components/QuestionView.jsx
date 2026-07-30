import AudioPlayer from './AudioPlayer';
import OptionsList from './OptionsList';

export default function QuestionView({
  question,
  selectedAnswer,
  isFlagged,
  onSelectAnswer,
  onToggleFlag,
  onPrev,
  onNext,
  audio,
  totalQuestions,
  mode,
}) {
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

      {/* Instruction */}
      <div className="instruction-text">{question.instruction}</div>

      {/* Question-type content */}
      {question.type === 'image' && (
        <div className="question-image">
          <img src={question.image} alt={`Question ${question.id}`} />
        </div>
      )}



      {/* Audio Player */}
      <AudioPlayer
        isPlaying={audio.isPlaying}
        currentTime={audio.currentTime}
        duration={audio.duration}
        progress={audio.progress}
        onToggle={audio.toggle}
        onSeek={audio.seek}
      />

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
          <kbd>←</kbd> <kbd>→</kbd> naviguer &nbsp; <kbd>1</kbd>–<kbd>4</kbd> répondre &nbsp; <kbd>espace</kbd> lecture
        </span>
        <button
          className="btn btn-secondary"
          onClick={onNext}
          disabled={question.id === totalQuestions}
        >
          Suivante →
        </button>
      </div>
    </div>
  );
}
