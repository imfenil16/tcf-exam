const LETTERS = ['A', 'B', 'C', 'D'];

export default function OptionsList({ question, selectedAnswer, onSelect }) {
  const hasTextOptions = (question.type === 'text-answers' || question.type === 'reading') && question.options;

  return (
    <div className="options-list">
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
          >
            <div className="option-letter">{letter}</div>
            <div className="option-text">{text}</div>
          </div>
        );
      })}
    </div>
  );
}
