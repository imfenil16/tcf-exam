import { useEffect } from 'react';
import QuestionGrid from './QuestionGrid';

// Bottom-sheet question navigator for phones (the sidebar is hidden under 768px).
export default function MobileNavigator({ open, onClose, ...gridProps }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-nav-sheet" role="dialog" aria-modal="true" aria-label="Navigation des questions">
      <div className="mobile-nav-backdrop" onClick={onClose} />
      <div className="mobile-nav-panel">
        <div className="mobile-nav-handle" />
        <div className="mobile-nav-sheet-header">
          <span>Questions</span>
          <button className="mobile-nav-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>
        <div className="mobile-nav-sheet-body">
          <QuestionGrid {...gridProps} />
        </div>
      </div>
    </div>
  );
}
