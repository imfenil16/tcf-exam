import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import OptionsList from './OptionsList';

// Load the (large) transcript map once, and only when first needed.
let _transcriptsPromise = null;
function loadTranscripts() {
  if (!_transcriptsPromise) {
    _transcriptsPromise = import('../data/transcripts')
      .then((m) => m.transcripts)
      .catch(() => ({}));
  }
  return _transcriptsPromise;
}

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
  onOpenNavigator,
}) {
  const [transcript, setTranscript] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // Collapse the reveal whenever we move to a different question.
  useEffect(() => { setShowTranscript(false); }, [question.id]);

  // Transcripts are a training-mode study aid only.
  useEffect(() => {
    if (mode !== 'training' || !question.audio) {
      setTranscript(null);
      return;
    }
    let active = true;
    loadTranscripts().then((map) => {
      if (active) setTranscript(map[question.audio] || null);
    });
    return () => { active = false; };
  }, [question.audio, mode]);

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

      {/* Transcript (training mode only) */}
      {mode === 'training' && transcript && (
        <div className="transcript-block">
          <button
            type="button"
            className="transcript-toggle"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
          >
            <span className="transcript-caret" aria-hidden="true">{showTranscript ? '\u25be' : '\u25b8'}</span>
            {showTranscript ? 'Masquer la transcription' : 'Afficher la transcription'}
          </button>
          {showTranscript && (
            <div className="transcript-panel">
              <p className="transcript-text" lang="fr">{transcript}</p>
              <p className="transcript-note">Transcription automatique - de petites erreurs sont possibles.</p>
            </div>
          )}
        </div>
      )}

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

      {/* Mobile bottom nav */}
      <div className="mobile-nav">
        <button onClick={onPrev} disabled={question.id === 1 || mode === 'exam'} aria-label="Question précédente">←</button>
        <button className="mobile-progress" onClick={onOpenNavigator} aria-label="Ouvrir la navigation des questions">Q{question.id} / {totalQuestions} <span className="mobile-progress-caret" aria-hidden="true">▾</span></button>
        <button onClick={onNext} disabled={question.id === totalQuestions} aria-label="Question suivante">→</button>
      </div>
    </div>
  );
}
