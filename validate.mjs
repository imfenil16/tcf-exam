import { questions } from './src/data/questions.js';
import { questionsTest2 } from './src/data/questions-test2.js';
import { questionsCeTest1 } from './src/data/questions-ce-test1.js';

function validate(name, qs) {
  const errors = [];
  if (qs.length !== 39) errors.push('Expected 39, got ' + qs.length);
  
  qs.forEach(q => {
    if (q.correctAnswer === null) errors.push('Q' + q.id + ': null correctAnswer');
    if (q.correctAnswer === undefined) errors.push('Q' + q.id + ': undefined correctAnswer');
    if (q.correctAnswer < 0) errors.push('Q' + q.id + ': negative correctAnswer');
    if (q.correctAnswer > 3) errors.push('Q' + q.id + ': correctAnswer > 3');
    if (!q.section) errors.push('Q' + q.id + ': missing section');
    if (!q.level) errors.push('Q' + q.id + ': missing level');
    if (!q.id) errors.push('missing id');
  });

  // Check answer distribution
  const dist = [0, 0, 0, 0];
  qs.forEach(q => { if (q.correctAnswer >= 0 && q.correctAnswer <= 3) dist[q.correctAnswer]++; });
  
  // Check audio/image URLs exist
  const hasAudio = qs.filter(q => q.audio).length;
  const hasImage = qs.filter(q => q.image).length;
  const hasOptions = qs.filter(q => q.options && q.options.length === 4).length;

  const status = errors.length === 0 ? '✓ PASS' : '✗ FAIL (' + errors.length + ' errors)';
  console.log(`${name}: ${status}`);
  console.log(`  Questions: ${qs.length}, Audio: ${hasAudio}, Images: ${hasImage}, TextOptions: ${hasOptions}`);
  console.log(`  Answer distribution: A=${dist[0]}, B=${dist[1]}, C=${dist[2]}, D=${dist[3]}`);
  
  if (errors.length > 0) {
    console.log('  Errors:', errors.slice(0, 10).join('; '));
  }
  console.log('');
}

console.log('=== TCF App Data Validation ===\n');
validate('Compréhension Orale - Test 1', questions);
validate('Compréhension Orale - Test 2', questionsTest2);
validate('Compréhension Écrite - Test 1', questionsCeTest1);

// Cross-check: verify Test 1 CO answer key matches what we extracted
const coTest1Expected = [3,0,2,0,1,3,0,3,1,3,2,1,1,3,3,3,3,1,2,1,2,0,3,2,2,3,0,1,1,1,1,3,2,2,0,0,3,1,2];
const coTest1Actual = questions.map(q => q.correctAnswer);
const coTest1Match = JSON.stringify(coTest1Expected) === JSON.stringify(coTest1Actual);
console.log(`CO Test 1 answer key integrity: ${coTest1Match ? '✓ VERIFIED' : '✗ MISMATCH'}`);

const coTest2Expected = [0,1,2,3,0,2,2,1,1,0,3,2,2,1,3,1,1,1,0,0,0,1,1,3,3,1,0,0,3,0,2,1,1,0,1,1,1,3,1];
const coTest2Actual = questionsTest2.map(q => q.correctAnswer);
const coTest2Match = JSON.stringify(coTest2Expected) === JSON.stringify(coTest2Actual);
console.log(`CO Test 2 answer key integrity: ${coTest2Match ? '✓ VERIFIED' : '✗ MISMATCH'}`);

const ceTest1Expected = [0,3,2,3,2,0,0,3,1,1,1,2,3,0,3,2,1,3,0,0,0,1,1,2,3,0,1,0,3,3,3,1,0,1,0,2,3,3,0];
const ceTest1Actual = questionsCeTest1.map(q => q.correctAnswer);
const ceTest1Match = JSON.stringify(ceTest1Expected) === JSON.stringify(ceTest1Actual);
console.log(`CE Test 1 answer key integrity: ${ceTest1Match ? '✓ VERIFIED' : '✗ MISMATCH'}`);

console.log('\n=== Build Check ===');
console.log('All validations complete.');
