// Structural audit of CO question options for tests 1-20.
// Flags: wrong option count, empty/blank options, duplicate options within a
// question, and identical option-sets shared across questions (possible mis-paste).
// Run: node tools/audit-options.mjs
import { readFileSync } from 'fs';
import { join } from 'path';

const data = JSON.parse(readFileSync(join('tools', 'co-questions.json'), 'utf8'))
  .filter(q => q.test <= 20);

const norm = s => (s || '').toLowerCase().replace(/\s+/g, ' ').replace(/[.,;:!?'""]/g, '').trim();

const issues = [];
const bySig = new Map(); // option-set signature -> [keys]

for (const q of data) {
  const isText = q.type === 'text-answers';
  const opts = q.options;

  if (isText) {
    if (!Array.isArray(opts)) { issues.push([q.key, 'MISSING options (null) on text question']); continue; }
    if (opts.length !== 4) issues.push([q.key, `option count = ${opts.length} (expected 4)`]);
    const blanks = opts.filter(o => !o || !o.trim()).length;
    if (blanks) issues.push([q.key, `${blanks} blank/empty option(s)`]);
    // duplicate options within the question
    const seen = {};
    for (const o of opts) { const n = norm(o); if (n) seen[n] = (seen[n] || 0) + 1; }
    const dups = Object.entries(seen).filter(([, c]) => c > 1);
    if (dups.length) issues.push([q.key, `duplicate option(s) within question: ${dups.map(d => '"' + d[0].slice(0,30) + '"').join(', ')}`]);
    // very short options (suspicious for non-image text answers, but some are legit like "D'un plombier.")
    // cross-question identical set
    const sig = q.test + '::' + opts.map(norm).sort().join('|');
    if (!bySig.has(sig)) bySig.set(sig, []);
    bySig.get(sig).push(q.key);
  } else {
    // image / audio-only: options should be null (4 propositions are spoken)
    if (Array.isArray(opts) && opts.length) issues.push([q.key, `type ${q.type} unexpectedly has text options`]);
  }
}

// identical option-sets shared across different questions (same test)
for (const [sig, keys] of bySig) {
  if (keys.length > 1) issues.push([keys.join(' = '), `IDENTICAL option-set across questions (possible mis-paste)`]);
}

console.log(`=== Options audit: tests 1-20 (${data.length} questions) ===\n`);
if (!issues.length) console.log('No structural option issues found.');
else {
  issues.sort();
  for (const [k, msg] of issues) console.log(`  ${k}: ${msg}`);
  console.log(`\nTotal issues: ${issues.length}`);
}
