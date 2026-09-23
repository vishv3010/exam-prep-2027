/**
 * Automated Test Suite for GOAL OS Metro Mode Viewport & Lexicon Flashcard Trainer
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('   METRO TRANSIT & LEXICON FLASHCARD TEST SUITE     ');
console.log('====================================================');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'site', 'data', 'psi');
const PSI_DIR = path.join(ROOT_DIR, 'site', 'psi');

// Mock browser environment
const localStorageStore = {};
const mockLocalStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }
};

const ctx = {
  window: {},
  console: console,
  localStorage: mockLocalStorage,
  Date: Date,
  Math: Math,
  JSON: JSON,
  parseInt: parseInt,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  navigator: {
    vibrate: () => true
  }
};
ctx.window = ctx;
vm.createContext(ctx);

function loadFile(dir, file) {
  const p = path.join(dir, file);
  const code = fs.readFileSync(p, 'utf8');
  vm.runInContext(code, ctx);
}

// 1. Load Registry & Data Modules
loadFile(DATA_DIR, 'index.js');
loadFile(DATA_DIR, 'lexicon.js');
loadFile(DATA_DIR, 'math-drills.js');

// Flush pending into QuestionBank
ctx.GoalQuestionBank.flushPending();
assert(ctx.GoalQuestionBank.getAll().length >= 15, 'Lexicon questions must be registered');
console.log('[PASS] Test 1: Lexicon data successfully registered and validated in QuestionBank');

// 2. Load Storage, SRS, Config, Engine
loadFile(PSI_DIR, 'psi-config.js');
loadFile(PSI_DIR, 'psi-storage.js');
loadFile(PSI_DIR, 'psi-srs.js');
loadFile(PSI_DIR, 'psi-question-engine.js');

const storage = ctx.GoalStorage;
const bank = ctx.GoalQuestionBank;
const srs = ctx.PSISRS;
const config = ctx.PSI_EXAM_CONFIG;
const engine = new ctx.PSIQuestionEngine(bank, storage, srs, config);

// 3. Test Lexicon Session Creation
{
  const sess = engine.createSession('lexicon', { count: 15 });
  assert.strictEqual(sess.mode, 'lexicon', 'Session mode should be lexicon');
  assert.strictEqual(sess.questionIds.length, 15, 'Lexicon session should contain 15 questions');

  // Verify questions are administrative lexicon
  const firstQ = bank.getById(sess.questionIds[0]);
  assert.strictEqual(firstQ.topic, 'administrative_lexicon', 'Question topic should be administrative_lexicon');
  console.log('[PASS] Test 2: Lexicon session creation builds targeted 15-question administrative sprint');
}

// 4. Test Option E Safety in Metro/Lexicon Sessions
{
  const sess = engine.createSession('lexicon', { count: 5 });
  const qId = sess.questionIds[0];
  const ans = engine.recordAnswer(qId, 4); // Option E is index 4

  assert.strictEqual(ans.isOptionE, true, 'Index 4 must be flagged as isOptionE');
  assert.strictEqual(ans.isCorrect, false, 'Option E is not correct');
  assert.strictEqual(ans.isBlank, false, 'Option E is not blank');

  // Verify scoring calculation gives 0 penalty for Option E
  const score = ctx.PSIQuestionEngine.calculateScore({ correct: 0, wrong: 0, blank: 0, optionE: 1 }, config.scoring);
  assert.strictEqual(score, 0, 'Option E must incur exactly 0 penalty');
  console.log('[PASS] Test 3: Option E selection incurs exactly 0 penalty and protects candidate score');
}

// 5. Test Resumable Session Persistence (Metro transit connectivity recovery)
{
  const sess = engine.createSession('metro40');
  const q1 = sess.questionIds[0];
  engine.recordAnswer(q1, 1);

  // Advance index to simulate user being on question 2
  sess.currentIndex = 1;
  engine.persistActiveSession();

  // Simulate new engine instance / page refresh
  const freshEngine = new ctx.PSIQuestionEngine(bank, storage, srs, config);
  const resumable = freshEngine.getResumableSession();

  assert(resumable !== null, 'Resumable session must be recovered');
  assert.strictEqual(resumable.currentIndex, 1, 'Resumable session must recover exact question index');
  assert.strictEqual(resumable.mode, 'metro40', 'Session mode must be preserved');
  console.log('[PASS] Test 4: Metro session recovers from interruption at exact question index');
}

// 6. Test Flashcard Screen Generator
{
  loadFile(PSI_DIR, 'psi-ui.js');

  const mockContainer = { innerHTML: '', addEventListener: () => {} };
  const ui = new ctx.PSIUI(mockContainer, engine, storage, bank, srs, config);

  const flashcardHtml = ui.renderLexiconFlashcardScreen();
  assert(flashcardHtml.includes('psi-flashcard-stage'), 'Flashcard HTML must include 3D stage');
  assert(flashcardHtml.includes('psi-flashcard-inner'), 'Flashcard HTML must include flippable inner container');
  assert(flashcardHtml.includes('psi-card-still-learning-btn'), 'Flashcard HTML must include Still Learning button');
  assert(flashcardHtml.includes('psi-card-mastered-btn'), 'Flashcard HTML must include Mastered button');
  console.log('[PASS] Test 5: Interactive Flashcard screen renders complete 3D flip card and SRS buttons');
}

// 7. Verify CSS contains Metro Mode & Flashcard components
{
  const css = fs.readFileSync(path.join(PSI_DIR, 'psi.css'), 'utf8');
  assert(css.includes('.psi-quiz-card.metro-mode-active'), 'CSS must define .metro-mode-active');
  assert(css.includes('.psi-flashcard-stage'), 'CSS must define .psi-flashcard-stage');
  assert(css.includes('.psi-flashcard-inner.is-flipped'), 'CSS must define .is-flipped transform');
  assert(css.includes('.psi-offline-pill'), 'CSS must define .psi-offline-pill');
  console.log('[PASS] Test 6: CSS stylesheet defines all required Metro Viewport and 3D Flashcard classes');
}

console.log('\n[ALL TESTS PASSED] Metro Transit Mode & Lexicon Flashcard Trainer verified 100%.\n');
