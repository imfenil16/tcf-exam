import { useState } from 'react';
import { loadIndex, getLastActive, loadProgress } from '../lib/progress';

function testLabel(id) {
  if (id === 'co-all') return 'Compréhension Orale · Toutes les questions';
  if (id === 'ce-all') return 'Compréhension Écrite · Toutes les questions';
  const m = id && id.match(/^(co|ce)-test-(\d+)$/);
  if (m) return `${m[1] === 'co' ? 'Compréhension Orale' : 'Compréhension Écrite'} · Test ${m[2]}`;
  return id;
}

export default function TestSelection({ onStartTest }) {
  const [selectedMode, setSelectedMode] = useState('training');
  const [index] = useState(() => loadIndex());
  const [resumeId] = useState(() => getLastActive());
  const resume = resumeId ? loadProgress(resumeId) : null;

  const coTests = Array.from({ length: 40 }, (_, i) => ({
    id: `co-test-${i + 1}`,
    number: i + 1,
  }));

  const ceTests = Array.from({ length: 40 }, (_, i) => ({
    id: `ce-test-${i + 1}`,
    number: i + 1,
  }));

  const handleStart = (testId) => {
    onStartTest(testId, selectedMode);
  };

  // Progress badge + state class for a test tile.
  const tileClass = (base, id) => {
    const p = index[id];
    if (p && p.done) return `${base} done`;
    if (p && p.answered > 0) return `${base} in-progress`;
    return base;
  };
  const tileBadge = (id) => {
    const p = index[id];
    if (!p) return null;
    if (p.done) return <span className="tile-badge done" aria-label="Terminé">✓</span>;
    if (p.answered > 0) return <span className="tile-badge" aria-label={`${p.answered} répondu(s)`}>{p.answered}</span>;
    return null;
  };

  return (
    <div className="test-selection">
      <div className="ts-header">
        <div className="ts-logo">
          <div className="ts-logo-icon">TCF</div>
          <div>
            <h1 className="ts-title">Réussir <span>TCF Canada</span></h1>
            <p className="ts-subtitle">Plateforme de préparation au TCF</p>
          </div>
        </div>
      </div>

      <div className="ts-content">
        {resume && (
          <div className="continue-card-wrap">
            <button className="continue-card" onClick={() => onStartTest(resumeId)}>
              <span className="continue-eyebrow">▶ Reprendre où vous vous êtes arrêté</span>
              <span className="continue-title">{testLabel(resumeId)}</span>
              <span className="continue-meta">
                Question {resume.currentQuestion || 1}{resume.count ? ` sur ${resume.count}` : ''}
                {' · '}{Object.keys(resume.answers || {}).length} répondu(s)
                {' · '}{resume.mode === 'exam' ? 'Mode examen' : 'Mode entraînement'}
              </span>
            </button>
            <button
              className="continue-restart"
              onClick={() => onStartTest(resumeId, selectedMode, { fresh: true })}
              title="Recommencer ce test depuis le début"
            >
              Recommencer
            </button>
          </div>
        )}

        <div className="stats-banner">
          <div className="stat">
            <span className="stat-number">80</span>
            <span className="stat-label">Tests disponibles</span>
          </div>
          <div className="stat">
            <span className="stat-number">3 120</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{"A1\u2192C2"}</span>
            <span className="stat-label">Tous niveaux</span>
          </div>
        </div>

        <div className="test-grids">
          <div className="test-grid-section">
            <div className="grid-header">
              <h2>{"\uD83C\uDFA7"} Compréhension Orale</h2>
              <span className="grid-meta">40 tests · 39 questions · 35 min</span>
            </div>
            <button
              className={tileClass('all-questions-btn', 'co-all')}
              onClick={() => handleStart('co-all')}
            >
              {"🎯"} Toutes les questions uniques (1 214){tileBadge('co-all')}
            </button>
            <div className="test-grid">
              {coTests.map(t => (
                <button
                  key={t.id}
                  className={tileClass('test-grid-btn', t.id)}
                  onClick={() => handleStart(t.id)}
                  title={`Test ${t.number}`}
                >
                  {t.number}{tileBadge(t.id)}
                </button>
              ))}
            </div>
          </div>

          <div className="test-grid-section">
            <div className="grid-header">
              <h2>{"\uD83D\uDCD6"} Compréhension Écrite</h2>
              <span className="grid-meta">40 tests · 39 questions · 60 min</span>
            </div>
            <button
              className={tileClass('all-questions-btn', 'ce-all')}
              onClick={() => handleStart('ce-all')}
            >
              {"🎯"} Toutes les questions uniques (1 266){tileBadge('ce-all')}
            </button>
            <div className="test-grid">
              {ceTests.map(t => (
                <button
                  key={t.id}
                  className={tileClass('test-grid-btn', t.id)}
                  onClick={() => handleStart(t.id)}
                  title={`Test ${t.number}`}
                >
                  {t.number}{tileBadge(t.id)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mode-section">
          <h3>Mode de passation</h3>
          <div className="mode-options">
            <div
              className={`mode-card ${selectedMode === 'exam' ? 'active' : ''}`}
              onClick={() => setSelectedMode('exam')}
            >
              <span className="mode-icon">{"\uD83C\uDF93"}</span>
              <strong>Mode examen</strong>
              <p>{"Conditions réelles : audio joué une seule fois, navigation linéaire"}</p>
            </div>
            <div
              className={`mode-card ${selectedMode === 'training' ? 'active' : ''}`}
              onClick={() => setSelectedMode('training')}
            >
              <span className="mode-icon">{"\uD83D\uDCDA"}</span>
              <strong>{"Mode entraînement"}</strong>
              <p>Audio rejouable, navigation libre entre les questions</p>
            </div>
          </div>
        </div>

        <div className="ts-info">
          <h3>{"Consignes générales"}</h3>
          <ul>
            <li>{"Chaque question ne comporte qu'une seule réponse correcte parmi les quatre proposées (A, B, C, D)."}</li>
            <li>{"Les épreuves se présentent selon un principe de difficulté progressive."}</li>
            <li>{"Compréhension Orale : chaque enregistrement n'est diffusé qu'une seule fois (35 minutes)."}</li>
            <li>{"Compréhension Écrite : lisez attentivement les documents avant de répondre (60 minutes)."}</li>
            <li>{"Gérez bien votre temps."}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
