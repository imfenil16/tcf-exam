// Export all CO (listening) questions to JSON for the audio verifier.
// Run: node tools/export-co.mjs  ->  tools/co-questions.json
import { readdirSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';

const dataDir = join(process.cwd(), 'src', 'data');
const files = readdirSync(dataDir).filter(f => /^questions(-test\d+)?\.js$/.test(f));

const out = [];
for (const file of files) {
  const testNum = file === 'questions.js' ? 1 : parseInt(file.match(/test(\d+)/)[1], 10);
  const mod = await import(pathToFileURL(join(dataDir, file)).href);
  const arr = Object.values(mod).find(v => Array.isArray(v) && v[0] && 'id' in v[0]);
  for (const q of arr) {
    out.push({
      key: `T${testNum}Q${q.id}`,
      test: testNum,
      id: q.id,
      type: q.type,
      audio: q.audio || null,
      options: q.options || null,
      correctAnswer: q.correctAnswer,
    });
  }
}
out.sort((a, b) => a.test - b.test || a.id - b.id);
writeFileSync(join('tools', 'co-questions.json'), JSON.stringify(out, null, 0));
console.log(`Exported ${out.length} questions from ${files.length} tests.`);
