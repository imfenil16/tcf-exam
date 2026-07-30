import { sections } from '../data/questions';

export default function SectionIntro({ sectionId, onDismiss }) {
  const section = sections.find(s => s.id === sectionId);
  if (!section) return null;

  return (
    <div className="section-intro-overlay" onClick={onDismiss}>
      <div className="section-intro-card" onClick={e => e.stopPropagation()}>
        <div className="section-intro-number">Section {section.id}</div>
        <h2 className="section-intro-title">{section.title.split(' — ')[1]}</h2>
        <div className="section-intro-levels">{section.levels}</div>
        <p className="section-intro-desc">{section.description}</p>
        <button className="btn btn-primary" onClick={onDismiss}>
          Commencer →
        </button>
      </div>
    </div>
  );
}
