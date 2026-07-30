// This script generates the JS data files from extracted JSON data
// Run: node extract-and-generate.mjs
import { writeFileSync, readFileSync } from 'fs';

// CO test data - will be populated from browser extraction
const coTests = {};
const ceTests = {};

// Load extracted data from temp files
for (let n = 31; n <= 35; n++) {
  try {
    coTests[n] = JSON.parse(readFileSync(`temp-extract/co${n}.json`, 'utf8'));
  } catch(e) { console.log(`Missing CO${n} data`); }
}
for (let n = 26; n <= 30; n++) {
  try {
    ceTests[n] = JSON.parse(readFileSync(`temp-extract/ce${n}.json`, 'utf8'));
  } catch(e) { console.log(`Missing CE${n} data`); }
}

function generateCOFile(testNum, data) {
  // Determine question types and assign section metadata
  const lines = [];
  lines.push(`export const questionsTest${testNum} = [`);
  
  data.forEach((q, idx) => {
    let type, instruction;
    if (q.image) {
      type = 'image';
      instruction = "Écoutez les 4 propositions. Choisissez celle qui correspond à l'image.";
    } else if (!q.options) {
      type = 'audio-only';
      instruction = "Écoutez l'extrait sonore et les 4 propositions. Choisissez la bonne réponse.";
    } else {
      type = 'text-answers';
      instruction = "Écoutez le document sonore et la question. Choisissez la bonne réponse.";
    }
    
    let parts = [`id: ${q.id}`, `type: '${type}'`, `instruction: ${JSON.stringify(instruction)}`];
    if (q.image) parts.push(`image: '${q.image}'`);
    if (q.audio) parts.push(`audio: '${q.audio}'`);
    if (q.options) {
      parts.push(`options: ${JSON.stringify(q.options)}`);
    } else {
      parts.push(`options: null`);
    }
    parts.push(`correctAnswer: ${q.correctAnswer}`);
    
    const comma = idx < data.length - 1 ? ',' : ',';
    lines.push(`  { ${parts.join(', ')} }${comma}`);
  });
  lines.push(`];`);
  lines.push('');
  
  // Determine sections based on question structure
  // Find boundaries: image questions, audio-only, text with low points, text with high points
  const imageQs = data.filter(q => q.image);
  const audioOnlyQs = data.filter(q => !q.image && !q.options);
  const textQs = data.filter(q => q.options);
  
  let sectionMeta = [];
  
  if (imageQs.length > 0) {
    const lastImg = imageQs[imageQs.length - 1].id;
    sectionMeta.push({ range: [1, lastImg], section: 1, sectionTitle: "Identifier une image", level: "A1" });
    
    if (audioOnlyQs.length > 0) {
      const firstAO = audioOnlyQs[0].id;
      const lastAO = audioOnlyQs[audioOnlyQs.length - 1].id;
      sectionMeta.push({ range: [firstAO, lastAO], section: 2, sectionTitle: "Comprendre un extrait court", level: "A2" });
    }
    
    if (textQs.length > 0) {
      const firstText = textQs[0].id;
      const totalQ = data.length;
      // Split text questions into B1, B2, C1, C2 sections
      const textStart = firstText;
      const textCount = totalQ - textStart + 1;
      
      // Roughly: first third = B1, second third = B2, last section = C1/C2
      const b1End = textStart + Math.floor(textCount * 0.3) - 1;
      const b2End = textStart + Math.floor(textCount * 0.6) - 1;
      const c1End = totalQ - 4; // Last 4 are typically C2
      
      sectionMeta.push({ range: [textStart, b1End], section: 3, sectionTitle: "Comprendre une interaction", level: "B1" });
      sectionMeta.push({ range: [b1End + 1, b2End], section: 3, sectionTitle: "Comprendre une interaction", level: "B2" });
      sectionMeta.push({ range: [b2End + 1, c1End], section: 4, sectionTitle: "Comprendre un exposé", level: "C1" });
      sectionMeta.push({ range: [c1End + 1, totalQ], section: 4, sectionTitle: "Comprendre un exposé", level: "C2" });
    }
  } else if (audioOnlyQs.length > 0) {
    // No image questions - starts with audio-only (like CO30)
    const lastAO = audioOnlyQs[audioOnlyQs.length - 1].id;
    sectionMeta.push({ range: [1, lastAO], section: 2, sectionTitle: "Comprendre un extrait court", level: "A2" });
    
    if (textQs.length > 0) {
      const firstText = textQs[0].id;
      const totalQ = data.length;
      const textCount = totalQ - firstText + 1;
      const b1End = firstText + Math.floor(textCount * 0.25) - 1;
      const b2End = firstText + Math.floor(textCount * 0.5) - 1;
      const c1End = totalQ - 4;
      
      sectionMeta.push({ range: [firstText, b1End], section: 3, sectionTitle: "Comprendre une interaction", level: "B1" });
      sectionMeta.push({ range: [b1End + 1, b2End], section: 3, sectionTitle: "Comprendre une interaction", level: "B2" });
      sectionMeta.push({ range: [b2End + 1, c1End], section: 4, sectionTitle: "Comprendre un exposé", level: "C1" });
      sectionMeta.push({ range: [c1End + 1, totalQ], section: 4, sectionTitle: "Comprendre un exposé", level: "C2" });
    }
  } else {
    // All text questions
    const totalQ = data.length;
    sectionMeta.push({ range: [1, 9], section: 2, sectionTitle: "Comprendre un extrait court", level: "A2" });
    sectionMeta.push({ range: [10, 17], section: 3, sectionTitle: "Comprendre une interaction", level: "B1" });
    sectionMeta.push({ range: [18, 22], section: 3, sectionTitle: "Comprendre une interaction", level: "B2" });
    sectionMeta.push({ range: [23, 35], section: 4, sectionTitle: "Comprendre un exposé", level: "C1" });
    sectionMeta.push({ range: [36, totalQ], section: 4, sectionTitle: "Comprendre un exposé", level: "C2" });
  }
  
  lines.push(`const sectionMeta = [`);
  sectionMeta.forEach((s, i) => {
    lines.push(`  { range: [${s.range[0]}, ${s.range[1]}], section: ${s.section}, sectionTitle: "${s.sectionTitle}", level: "${s.level}" },`);
  });
  lines.push(`];`);
  lines.push('');
  lines.push(`sectionMeta.forEach(({ range, section, sectionTitle, level }) => {`);
  lines.push(`  questionsTest${testNum}.forEach(q => {`);
  lines.push(`    if (q.id >= range[0] && q.id <= range[1]) {`);
  lines.push(`      q.section = section;`);
  lines.push(`      q.sectionTitle = sectionTitle;`);
  lines.push(`      q.level = level;`);
  lines.push(`    }`);
  lines.push(`  });`);
  lines.push(`});`);
  lines.push('');
  lines.push(`export const sectionsTest${testNum} = [...new Set(sectionMeta.map(s => s.section))].map(num => {`);
  lines.push(`  const meta = sectionMeta.find(s => s.section === num);`);
  lines.push(`  const questions = questionsTest${testNum}.filter(q => q.section === num);`);
  lines.push(`  return { number: num, title: meta.sectionTitle, questionCount: questions.length, startId: questions[0]?.id };`);
  lines.push(`});`);
  
  return lines.join('\n');
}

function generateCEFile(testNum, data) {
  const lines = [];
  lines.push(`export const questionsCeTest${testNum} = [`);
  
  data.forEach((q, idx) => {
    let parts = [`id: ${q.id}`, `type: 'reading'`];
    if (q.image) parts.push(`image: '${q.image}'`);
    if (q.options) {
      parts.push(`options: ${JSON.stringify(q.options)}`);
    }
    parts.push(`correctAnswer: ${q.correctAnswer}`);
    
    const comma = idx < data.length - 1 ? ',' : ',';
    lines.push(`  { ${parts.join(', ')} }${comma}`);
  });
  lines.push(`];`);
  lines.push('');
  
  // CE sections are standard
  const totalQ = data.length;
  let sectionMeta;
  if (totalQ === 39) {
    sectionMeta = [
      { range: [1, 5], section: 1, sectionTitle: "Comprendre un document court", level: "A1" },
      { range: [6, 10], section: 1, sectionTitle: "Comprendre un document court", level: "A2" },
      { range: [11, 15], section: 2, sectionTitle: "Comprendre un document informatif", level: "B1" },
      { range: [16, 20], section: 2, sectionTitle: "Comprendre un document informatif", level: "B2" },
      { range: [21, 25], section: 3, sectionTitle: "Comprendre un texte argumentatif", level: "B2" },
      { range: [26, 30], section: 3, sectionTitle: "Comprendre un texte argumentatif", level: "C1" },
      { range: [31, 35], section: 4, sectionTitle: "Comprendre un texte complexe", level: "C1" },
      { range: [36, 39], section: 4, sectionTitle: "Comprendre un texte complexe", level: "C2" },
    ];
  } else {
    // Fallback for non-39 question tests
    const q4 = Math.ceil(totalQ / 4);
    sectionMeta = [
      { range: [1, q4], section: 1, sectionTitle: "Comprendre un document court", level: "A1/A2" },
      { range: [q4+1, q4*2], section: 2, sectionTitle: "Comprendre un document informatif", level: "B1/B2" },
      { range: [q4*2+1, q4*3], section: 3, sectionTitle: "Comprendre un texte argumentatif", level: "B2/C1" },
      { range: [q4*3+1, totalQ], section: 4, sectionTitle: "Comprendre un texte complexe", level: "C1/C2" },
    ];
  }
  
  lines.push(`const sectionMeta = [`);
  sectionMeta.forEach((s, i) => {
    lines.push(`  { range: [${s.range[0]}, ${s.range[1]}], section: ${s.section}, sectionTitle: "${s.sectionTitle}", level: "${s.level}" },`);
  });
  lines.push(`];`);
  lines.push('');
  lines.push(`sectionMeta.forEach(({ range, section, sectionTitle, level }) => {`);
  lines.push(`  questionsCeTest${testNum}.forEach(q => {`);
  lines.push(`    if (q.id >= range[0] && q.id <= range[1]) {`);
  lines.push(`      q.section = section;`);
  lines.push(`      q.sectionTitle = sectionTitle;`);
  lines.push(`      q.level = level;`);
  lines.push(`    }`);
  lines.push(`  });`);
  lines.push(`});`);
  lines.push('');
  lines.push(`export const sectionsCeTest${testNum} = [...new Set(sectionMeta.map(s => s.section))].map(num => {`);
  lines.push(`  const meta = sectionMeta.find(s => s.section === num);`);
  lines.push(`  const questions = questionsCeTest${testNum}.filter(q => q.section === num);`);
  lines.push(`  return { number: num, title: meta.sectionTitle, questionCount: questions.length, startId: questions[0]?.id };`);
  lines.push(`});`);
  
  return lines.join('\n');
}

// Generate CO files
let generated = 0;
for (const [num, data] of Object.entries(coTests)) {
  const content = generateCOFile(num, data);
  writeFileSync(`src/data/questions-test${num}.js`, content, 'utf8');
  console.log(`✓ CO${num}: ${data.length} questions`);
  generated++;
}

// Generate CE files
for (const [num, data] of Object.entries(ceTests)) {
  const content = generateCEFile(num, data);
  writeFileSync(`src/data/questions-ce-test${num}.js`, content, 'utf8');
  console.log(`✓ CE${num}: ${data.length} questions`);
  generated++;
}

console.log(`\nGenerated ${generated} files total`);
