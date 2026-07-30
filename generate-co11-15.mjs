import fs from 'fs';

// Raw data extracted from browser
const tests = {
  11: { serie: 171, imgCount: 2, audioOnlyEnd: 6, textStart: 7 },
  12: { serie: 172, imgCount: 2, audioOnlyEnd: 10, textStart: 11 },
  13: { serie: 176, imgCount: 3, audioOnlyEnd: 9, textStart: 10 },
  14: { serie: 163, imgCount: 4, audioOnlyEnd: 9, textStart: 10 },
  15: { serie: 178, imgCount: 2, audioOnlyEnd: 7, textStart: 8 },
};

function cleanOption(text) {
  return text.replace(/^[A-D]88\s*/, '').replace(/^\s+/, '').trim();
}

function isAudioOnly(options) {
  return options.every(o => /^[A-D]88$/.test(o));
}

function determineType(q) {
  if (q.image) return 'image';
  if (isAudioOnly(q.options)) return 'audio-only';
  return 'text-answers';
}

function processQuestion(q) {
  const type = determineType(q);
  const result = { id: q.id, type };

  // Instruction
  if (type === 'image') {
    result.instruction = "Écoutez les 4 propositions. Choisissez celle qui correspond à l'image.";
    result.image = q.image;
  } else if (type === 'audio-only') {
    result.instruction = "Écoutez l'extrait sonore et les 4 propositions. Choisissez la bonne réponse.";
  } else {
    result.instruction = "Écoutez le document sonore et la question. Choisissez la bonne réponse.";
  }

  result.audio = q.audio;

  if (type === 'text-answers') {
    result.correctAnswer = q.correctAnswer;
    result.options = q.options.map(cleanOption);
  } else {
    result.options = null;
    result.correctAnswer = q.correctAnswer;
  }

  return result;
}

function getSectionMeta(questions) {
  // Determine section boundaries based on question types
  let lastImage = 0, lastAudioOnly = 0, firstText = 0;
  
  questions.forEach(q => {
    if (q.type === 'image') lastImage = q.id;
    if (q.type === 'audio-only') lastAudioOnly = q.id;
    if (q.type === 'text-answers' && !firstText) firstText = q.id;
  });

  const sections = [];
  
  // Section 1: Image questions (A1-A2)
  if (lastImage > 0) {
    const mid = Math.ceil(lastImage / 2);
    if (lastImage <= 2) {
      sections.push({ range: [1, lastImage], section: 1, sectionTitle: 'Section 1 – Image', level: 'A1' });
    } else {
      sections.push({ range: [1, mid], section: 1, sectionTitle: 'Section 1 – Image', level: 'A1' });
      sections.push({ range: [mid + 1, lastImage], section: 1, sectionTitle: 'Section 1 – Image', level: 'A2' });
    }
  }

  // Section 2: Audio-only (A2)
  if (lastAudioOnly > lastImage) {
    sections.push({ range: [lastImage + 1, lastAudioOnly], section: 2, sectionTitle: 'Section 2 – Écoute', level: 'A2' });
  }

  // Section 3: Text answers (first half B1, second half B2)
  if (firstText > 0) {
    const textQs = questions.filter(q => q.type === 'text-answers');
    const totalText = textQs.length;
    // Split: ~first 40% B1, next 30% B2, next 20% C1, last 10% C2
    const b1End = firstText + Math.floor(totalText * 0.3) - 1;
    const b2End = firstText + Math.floor(totalText * 0.55) - 1;
    const c1End = firstText + Math.floor(totalText * 0.85) - 1;
    const lastQ = questions[questions.length - 1].id;

    sections.push({ range: [firstText, b1End], section: 3, sectionTitle: 'Section 3 – Compréhension', level: 'B1' });
    sections.push({ range: [b1End + 1, b2End], section: 3, sectionTitle: 'Section 3 – Compréhension', level: 'B2' });
    sections.push({ range: [b2End + 1, c1End], section: 4, sectionTitle: 'Section 4 – Compréhension avancée', level: 'C1' });
    sections.push({ range: [c1End + 1, lastQ], section: 4, sectionTitle: 'Section 4 – Compréhension avancée', level: 'C2' });
  }

  return sections;
}

function generateFile(testNum, rawData, serie) {
  const questions = rawData.map(processQuestion);
  const sectionMeta = getSectionMeta(questions);

  // Apply sections
  sectionMeta.forEach(({ range, section, sectionTitle, level }) => {
    questions.forEach(q => {
      if (q.id >= range[0] && q.id <= range[1]) {
        q.section = section;
        q.sectionTitle = sectionTitle;
        q.level = level;
      }
    });
  });

  // Generate unique sections array
  const sectionsSet = new Map();
  sectionMeta.forEach(({ section, sectionTitle, level }) => {
    const key = `${section}-${level}`;
    if (!sectionsSet.has(key)) {
      sectionsSet.set(key, { id: section, title: sectionTitle, level });
    }
  });
  const sectionsArr = [...sectionsSet.values()];

  // Build file content
  let content = `export const questionsTest${testNum} = [\n`;
  questions.forEach((q, i) => {
    const parts = [];
    parts.push(`  { id: ${q.id}`);
    parts.push(`type: '${q.type}'`);
    parts.push(`instruction: ${JSON.stringify(q.instruction)}`);
    if (q.image) parts.push(`image: '${q.image}'`);
    parts.push(`audio: '${q.audio}'`);
    parts.push(`correctAnswer: ${q.correctAnswer}`);
    if (q.options) {
      parts.push(`options: ${JSON.stringify(q.options)}`);
    } else {
      parts.push(`options: null`);
    }
    content += parts.join(', ') + ` }${i < questions.length - 1 ? ',' : ''}\n`;
  });
  content += `];\n\n`;

  // Section metadata
  content += `const sectionMeta = [\n`;
  sectionMeta.forEach((s, i) => {
    content += `  { range: [${s.range[0]}, ${s.range[1]}], section: ${s.section}, sectionTitle: '${s.sectionTitle}', level: '${s.level}' }${i < sectionMeta.length - 1 ? ',' : ''}\n`;
  });
  content += `];\n\n`;
  content += `sectionMeta.forEach(({ range, section, sectionTitle, level }) => {\n`;
  content += `  questionsTest${testNum}.forEach(q => {\n`;
  content += `    if (q.id >= range[0] && q.id <= range[1]) {\n`;
  content += `      q.section = section; q.sectionTitle = sectionTitle; q.level = level;\n`;
  content += `    }\n`;
  content += `  });\n`;
  content += `});\n\n`;

  // Sections export
  content += `export const sectionsTest${testNum} = [\n`;
  sectionsArr.forEach((s, i) => {
    content += `  { id: ${s.id}, title: '${s.title}', level: '${s.level}' }${i < sectionsArr.length - 1 ? ',' : ''}\n`;
  });
  content += `];\n`;

  return content;
}

// Read raw JSON files and generate
async function main() {
  const rawDir = 'src/data/answer-keys';
  
  for (let n = 11; n <= 15; n++) {
    const rawPath = `${rawDir}/co-test${n}-raw.json`;
    if (!fs.existsSync(rawPath)) {
      console.log(`Skipping test ${n} - raw file not found`);
      continue;
    }
    const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
    const serie = tests[n].serie;
    const content = generateFile(n, rawData, serie);
    const outPath = `src/data/questions-test${n}.js`;
    fs.writeFileSync(outPath, content);
    console.log(`Generated ${outPath} (${rawData.length} questions, Série ${serie})`);
  }
}

main();
