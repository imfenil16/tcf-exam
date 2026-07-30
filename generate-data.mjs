// generate-data.mjs - Generates .js data files from JSON extractions
// Run: node generate-data.mjs
import { readFileSync, writeFileSync, existsSync } from 'fs';

function generateCOFile(testNum, rawData) {
  const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  const varName = `questionsTest${testNum}`;
  const sectionsVar = `sectionsTest${testNum}`;
  
  // Determine question types based on data structure
  const questions = data.map(q => {
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
    
    const entry = { id: q.id, type, instruction };
    if (q.image) entry.image = q.image;
    if (q.audio) entry.audio = q.audio;
    if (type === 'image' || type === 'audio-only') {
      entry.options = null;
    } else {
      entry.options = q.options;
    }
    entry.correctAnswer = q.correctAnswer;
    return entry;
  });

  // Find section boundaries
  let lastImageQ = 0, lastAudioOnlyQ = 0;
  questions.forEach(q => {
    if (q.type === 'image') lastImageQ = q.id;
    if (q.type === 'audio-only') lastAudioOnlyQ = q.id;
  });
  // If no image questions, audio-only extends further
  const firstTextQ = questions.find(q => q.type === 'text-answers')?.id || lastAudioOnlyQ + 1;

  // Generate file content
  let content = `export const ${varName} = [\n`;
  
  let currentType = '';
  questions.forEach((q, i) => {
    if (q.type !== currentType) {
      currentType = q.type;
      const typeLabel = q.type === 'image' ? 'Image type' : q.type === 'audio-only' ? 'Audio-only type' : 'Text answers type';
      content += `  // Q${q.id}+: ${typeLabel}\n`;
    }
    
    const parts = [`id: ${q.id}`, `type: '${q.type}'`, `instruction: "${q.instruction}"`];
    if (q.image) parts.push(`image: '${q.image}'`);
    if (q.audio) parts.push(`audio: '${q.audio}'`);
    if (q.options === null) {
      parts.push(`options: null`);
    } else {
      parts.push(`correctAnswer: ${q.correctAnswer}`);
      parts.push(`options: ${JSON.stringify(q.options)}`);
    }
    if (q.options === null) parts.push(`correctAnswer: ${q.correctAnswer}`);
    
    content += `  { ${parts.join(', ')} },\n`;
  });
  content += `];\n\n`;

  // Section metadata - standard TCF CO structure
  content += `const sectionMeta = [\n`;
  if (lastImageQ >= 4) {
    const midImage = Math.ceil(lastImageQ / 2);
    content += `  { range: [1, ${midImage}], section: 1, sectionTitle: "Identifier une image", level: "A1" },\n`;
    content += `  { range: [${midImage + 1}, ${lastImageQ}], section: 1, sectionTitle: "Identifier une image", level: "A2" },\n`;
  } else if (lastImageQ > 0) {
    content += `  { range: [1, ${lastImageQ}], section: 1, sectionTitle: "Identifier une image", level: "A1/A2" },\n`;
  }
  
  if (lastAudioOnlyQ > lastImageQ) {
    content += `  { range: [${lastImageQ + 1}, ${lastAudioOnlyQ}], section: 2, sectionTitle: "Comprendre un extrait court", level: "A2" },\n`;
  }
  
  const textStart = firstTextQ;
  const textMid1 = Math.min(textStart + 4, 20);
  const textMid2 = Math.min(textMid1 + 1, 25);
  
  content += `  { range: [${textStart}, ${Math.min(textStart + 5, 16)}], section: 3, sectionTitle: "Comprendre une interaction", level: "B1" },\n`;
  content += `  { range: [${Math.min(textStart + 6, 17)}, 20], section: 3, sectionTitle: "Comprendre une interaction", level: "B2" },\n`;
  content += `  { range: [21, 25], section: 4, sectionTitle: "Comprendre un exposé", level: "B2" },\n`;
  content += `  { range: [26, 35], section: 4, sectionTitle: "Comprendre un exposé", level: "C1" },\n`;
  content += `  { range: [36, 39], section: 4, sectionTitle: "Comprendre un exposé", level: "C2" },\n`;
  content += `];\n\n`;

  content += `sectionMeta.forEach(({ range, section, sectionTitle, level }) => {\n`;
  content += `  ${varName}.forEach(q => {\n`;
  content += `    if (q.id >= range[0] && q.id <= range[1]) {\n`;
  content += `      q.section = section;\n`;
  content += `      q.sectionTitle = sectionTitle;\n`;
  content += `      q.level = level;\n`;
  content += `    }\n`;
  content += `  });\n`;
  content += `});\n\n`;

  // Sections export
  const sec1Range = lastImageQ > 0 ? `[1, ${lastImageQ}]` : `[1, 2]`;
  const sec2Range = lastAudioOnlyQ > lastImageQ ? `[${lastImageQ + 1}, ${lastAudioOnlyQ}]` : `[${lastImageQ + 1}, ${lastImageQ + 4}]`;
  
  content += `export const ${sectionsVar} = [\n`;
  if (lastImageQ > 0) {
    content += `  { id: 1, title: "Section 1 — Identifier une image", levels: "A1 · A2", range: ${sec1Range}, description: "Écoutez les propositions et identifiez l'image correspondante." },\n`;
  }
  content += `  { id: 2, title: "Section 2 — Comprendre un extrait court", levels: "A2", range: ${sec2Range}, description: "Écoutez un court extrait sonore et les propositions." },\n`;
  content += `  { id: 3, title: "Section 3 — Comprendre une interaction", levels: "B1 · B2", range: [${firstTextQ}, 20], description: "Écoutez un dialogue ou un document et répondez à la question écrite." },\n`;
  content += `  { id: 4, title: "Section 4 — Comprendre un exposé", levels: "B2 · C1 · C2", range: [21, 39], description: "Écoutez un exposé, un débat ou une argumentation complexe." },\n`;
  content += `];\n`;

  return content;
}

function generateCEFile(testNum, rawData) {
  const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  const varName = `questionsCeTest${testNum}`;
  const sectionsVar = `sectionsCeTest${testNum}`;

  let content = `export const ${varName} = [\n`;
  data.forEach(q => {
    const parts = [`id: ${q.id}`, `type: 'reading'`];
    if (q.image) parts.push(`image: '${q.image}'`);
    parts.push(`options: ${JSON.stringify(q.options)}`);
    parts.push(`correctAnswer: ${q.correctAnswer}`);
    content += `  { ${parts.join(', ')} },\n`;
  });
  content += `];\n\n`;

  // CE section metadata
  content += `const sectionMeta = [\n`;
  content += `  { range: [1, 5], section: 1, sectionTitle: "Comprendre un document court", level: "A1" },\n`;
  content += `  { range: [6, 10], section: 1, sectionTitle: "Comprendre un document court", level: "A2" },\n`;
  content += `  { range: [11, 15], section: 2, sectionTitle: "Comprendre un document informatif", level: "B1" },\n`;
  content += `  { range: [16, 20], section: 2, sectionTitle: "Comprendre un document informatif", level: "B2" },\n`;
  content += `  { range: [21, 25], section: 3, sectionTitle: "Comprendre un texte argumentatif", level: "B2" },\n`;
  content += `  { range: [26, 30], section: 3, sectionTitle: "Comprendre un texte argumentatif", level: "C1" },\n`;
  content += `  { range: [31, 35], section: 4, sectionTitle: "Comprendre un texte complexe", level: "C1" },\n`;
  content += `  { range: [36, 39], section: 4, sectionTitle: "Comprendre un texte complexe", level: "C2" },\n`;
  content += `];\n\n`;

  content += `sectionMeta.forEach(({ range, section, sectionTitle, level }) => {\n`;
  content += `  ${varName}.forEach(q => {\n`;
  content += `    if (q.id >= range[0] && q.id <= range[1]) {\n`;
  content += `      q.section = section;\n`;
  content += `      q.sectionTitle = sectionTitle;\n`;
  content += `      q.level = level;\n`;
  content += `    }\n`;
  content += `  });\n`;
  content += `});\n\n`;

  content += `export const ${sectionsVar} = [\n`;
  content += `  { id: 1, title: "Section 1 — Comprendre un document court", levels: "A1 · A2", range: [1, 10], description: "Lisez le document et répondez à la question." },\n`;
  content += `  { id: 2, title: "Section 2 — Comprendre un document informatif", levels: "B1 · B2", range: [11, 20], description: "Lisez le document informatif et répondez à la question." },\n`;
  content += `  { id: 3, title: "Section 3 — Comprendre un texte argumentatif", levels: "B2 · C1", range: [21, 30], description: "Lisez le texte argumentatif et répondez à la question." },\n`;
  content += `  { id: 4, title: "Section 4 — Comprendre un texte complexe", levels: "C1 · C2", range: [31, 39], description: "Lisez le texte complexe et répondez à la question." },\n`;
  content += `];\n`;

  return content;
}

// Process all available JSON files
const dataDir = './temp-extract';
const outDir = './src/data';

// Generate CO files
for (let n = 31; n <= 35; n++) {
  const file = `${dataDir}/co${n}.json`;
  if (existsSync(file)) {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    const content = generateCOFile(n, data);
    writeFileSync(`${outDir}/questions-test${n}.js`, content);
    console.log(`✓ CO Test ${n}: ${data.length} questions -> questions-test${n}.js`);
  } else {
    console.log(`✗ CO Test ${n}: ${file} not found`);
  }
}

// Generate CE files
for (let n = 26; n <= 30; n++) {
  const file = `${dataDir}/ce${n}.json`;
  if (existsSync(file)) {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    const content = generateCEFile(n, data);
    writeFileSync(`${outDir}/questions-ce-test${n}.js`, content);
    console.log(`✓ CE Test ${n}: ${data.length} questions -> questions-ce-test${n}.js`);
  } else {
    console.log(`✗ CE Test ${n}: ${file} not found`);
  }
}

console.log('\nDone! Run remaining extractions to fill missing tests.');
