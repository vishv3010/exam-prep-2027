/**
 * GOAL OS Data Integrity & Question Validation Suite
 * Validates all question datasets, lessons, schemas, and references.
 * Exit code 0: All checks passed.
 * Exit code 1: Integrity violation found.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'site', 'data', 'psi');

console.log('====================================================');
console.log('   GOAL OS DATA INTEGRITY & VALIDATION SUITE        ');
console.log('====================================================');

const ctx = { window: {}, console: console };
vm.createContext(ctx);

function loadScript(relPath) {
  const fullPath = path.join(DATA_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  const code = fs.readFileSync(fullPath, 'utf8');
  vm.runInContext(code, ctx);
}

try {
  loadScript('pyq-2021.js');
  loadScript('gujarat-gk.js');
  loadScript('law.js');
  loadScript('ai-practice.js');
  loadScript('diagnostic-bank.js');
  loadScript('math-drills.js');
  loadScript('english-drills.js');
  loadScript('science-drills.js');
  loadScript('lexicon.js');
  loadScript('lessons.js');
} catch (e) {
  console.error('FATAL: Error loading data files:', e.message);
  process.exit(1);
}

const allQuestions = [
  ...(ctx.window.__PENDING_PYQ_DATA || []),
  ...(ctx.window.__PENDING_GUJARAT_GK_DATA || []),
  ...(ctx.window.__PENDING_LAW_DATA || []),
  ...(ctx.window.__PENDING_AI_PRACTICE_DATA || []),
  ...(ctx.window.__PENDING_DIAGNOSTIC_DATA || []),
  ...(ctx.window.__PENDING_MATH_DATA || []),
  ...(ctx.window.__PENDING_ENGLISH_DATA || []),
  ...(ctx.window.__PENDING_SCIENCE_DATA || []),
  ...(ctx.window.__PENDING_LEXICON_DATA || [])
];

const lessons = (ctx.window.PSI_LESSON_BANK && ctx.window.PSI_LESSON_BANK.lessons) || [];

let errors = [];
let warnings = [];

// 1. Check Question ID Uniqueness & Schema Validity
const idMap = new Map();
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const VALID_PROVENANCE = new Set(['PYQ_OFFICIAL', 'PYQ_REPRODUCED', 'REFERENCE', 'SIMULATED', 'AI_GENERATED', 'AI_GENERATED_VERIFIED']);

allQuestions.forEach((q, idx) => {
  const loc = `Question #${idx + 1} (${q.id || 'NO_ID'})`;

  if (!q.id || typeof q.id !== 'string') {
    errors.push(`${loc}: Missing or non-string ID.`);
    return;
  }

  if (idMap.has(q.id)) {
    errors.push(`DUPLICATE ID: '${q.id}' found in multiple questions!`);
  } else {
    idMap.set(q.id, q);
  }

  // Question stems
  if (!q.question_gu || typeof q.question_gu !== 'string' || !q.question_gu.trim()) {
    errors.push(`${loc}: Missing Gujarati question stem.`);
  }
  if (!q.question_en || typeof q.question_en !== 'string' || !q.question_en.trim()) {
    errors.push(`${loc}: Missing English question stem.`);
  }

  // Options
  if (!Array.isArray(q.options_gu) || q.options_gu.length < 4) {
    errors.push(`${loc}: Invalid or incomplete options_gu (must be array with >= 4 items).`);
  }
  if (!Array.isArray(q.options_en) || q.options_en.length < 4) {
    errors.push(`${loc}: Invalid or incomplete options_en (must be array with >= 4 items).`);
  }
  if (Array.isArray(q.options_gu) && Array.isArray(q.options_en) && q.options_gu.length !== q.options_en.length) {
    errors.push(`${loc}: Option count mismatch between GU (${q.options_gu.length}) and EN (${q.options_en.length}).`);
  }

  // Answer index
  if (typeof q.answer !== 'number' || q.answer < 0 || (q.options_gu && q.answer >= q.options_gu.length)) {
    errors.push(`${loc}: Invalid answer index '${q.answer}'. Must be within 0 and ${q.options_gu.length - 1}.`);
  }

  // Explanations
  if (!q.explanation_gu || !q.explanation_gu.trim()) {
    warnings.push(`${loc}: Missing Gujarati explanation.`);
  }
  if (!q.explanation_en || !q.explanation_en.trim()) {
    warnings.push(`${loc}: Missing English explanation.`);
  }

  // Difficulty
  if (!VALID_DIFFICULTIES.has(q.difficulty)) {
    warnings.push(`${loc}: Unknown difficulty '${q.difficulty}'. Expected easy|medium|hard.`);
  }

  // Provenance / Source
  if (q.sourceType && !VALID_PROVENANCE.has(q.sourceType)) {
    warnings.push(`${loc}: Unknown sourceType '${q.sourceType}'.`);
  }
});

// 2. Check Lesson integrity & references
const lessonIdMap = new Set();
lessons.forEach((lesson, idx) => {
  const loc = `Lesson #${idx + 1} (${lesson.id || 'NO_ID'})`;
  if (!lesson.id) {
    errors.push(`${loc}: Missing lesson ID.`);
    return;
  }
  if (lessonIdMap.has(lesson.id)) {
    errors.push(`DUPLICATE LESSON ID: '${lesson.id}'.`);
  } else {
    lessonIdMap.add(lesson.id);
  }

  if (Array.isArray(lesson.practiceQuestionIds)) {
    lesson.practiceQuestionIds.forEach(qId => {
      if (!idMap.has(qId)) {
        errors.push(`${loc}: References non-existent question ID '${qId}'.`);
      }
    });
  }
});

// 3. Print Results
console.log(`\nVerified Questions : ${allQuestions.length}`);
console.log(`Verified Lessons   : ${lessons.length}`);
console.log(`Unique Question IDs: ${idMap.size}`);
console.log(`Unique Lesson IDs  : ${lessonIdMap.size}\n`);

if (warnings.length > 0) {
  console.log(`[!] ${warnings.length} WARNING(S):`);
  warnings.forEach(w => console.log(`   - ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.error(`[X] ${errors.length} ERROR(S) FOUND:`);
  errors.forEach(e => console.error(`   - ${e}`));
  console.log('\nIntegrity validation FAILED. Correct errors before deploying.');
  process.exit(1);
} else {
  console.log('[OK] All data integrity checks PASSED with 100% validity.');
  process.exit(0);
}
