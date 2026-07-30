const LETTERS = ['A', 'B', 'C', 'D'];

export default function OptionsList({ question, selectedAnswer, onSelect }) {
  const hasTextOptions = (question.type === 'text-answers' || question.type === 'reading') && question.options;

  return (
    <div className="options-list" role="radiogroup" aria-label="Options de réponse">
      {LETTERS.map((letter, i) => {
        const isSelected = selectedAnswer === i;
        const text = hasTextOptions
          ? question.options[i]
          : `Proposition ${letter} (dans l'audio)`;

        return (
          <div
            key={letter}
            className={`option-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(i); } }}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            aria-label={`Option ${letter}`}
          >
            <div className="option-letter">{letter}</div>
            <div className="option-text">{text}</div>
          </div>
        );
      })}
    </div>
  );
}
