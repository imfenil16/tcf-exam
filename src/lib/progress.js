// Per-test progress persistence (localStorage).
//
// Shape under one root key:
//   { lastActive: testId|null, tests: { [testId]: TestProgress } }
// TestProgress = { currentQuestion, answers, flagged, mode, remaining, total, done, updatedAt }
//
// All access is wrapped so private-mode / quota errors degrade to "no persistence"
// rather than crashing the app.

const KEY = 'tcf:progress:v1';

function readRoot() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { lastActive: null, tests: {} };
    const parsed = JSON.parse(raw);
    return {
      lastActive: parsed.lastActive ?? null,
      tests: parsed.tests && typeof parsed.tests === 'object' ? parsed.tests : {},
    };
  } catch {
    return { lastActive: null, tests: {} };
  }
}

function writeRoot(root) {
  try {
    localStorage.setItem(KEY, JSON.stringify(root));
  } catch {
    // ignore: storage unavailable or full
  }
}

export function loadProgress(testId) {
  return readRoot().tests[testId] || null;
}

export function saveProgress(testId, data) {
  const root = readRoot();
  root.tests[testId] = { ...data, updatedAt: Date.now() };
  writeRoot(root);
}

export function clearProgress(testId) {
  const root = readRoot();
  delete root.tests[testId];
  if (root.lastActive === testId) root.lastActive = null;
  writeRoot(root);
}

export function markDone(testId) {
  const root = readRoot();
  if (root.tests[testId]) {
    root.tests[testId].done = true;
    root.tests[testId].updatedAt = Date.now();
  }
  if (root.lastActive === testId) root.lastActive = null; // don't auto-resume a finished test
  writeRoot(root);
}

export function setLastActive(testId) {
  const root = readRoot();
  root.lastActive = testId;
  writeRoot(root);
}

export function getLastActive() {
  const root = readRoot();
  const id = root.lastActive;
  if (id && root.tests[id] && !root.tests[id].done) return id;
  return null;
}

// Map of testId -> summary, for rendering badges on the selection screen.
export function loadIndex() {
  const { tests } = readRoot();
  const out = {};
  for (const [id, p] of Object.entries(tests)) {
    const answered = p.answers ? Object.keys(p.answers).length : 0;
    out[id] = { answered, count: p.count || 0, done: !!p.done, mode: p.mode, updatedAt: p.updatedAt || 0 };
  }
  return out;
}
