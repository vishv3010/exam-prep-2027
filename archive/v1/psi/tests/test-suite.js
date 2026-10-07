/**
 * Gujarat Police PSI Engine - Comprehensive Automated Test Suite
 * Covers Part 20 requirements:
 * 1. SCORING
 * 2. SRS
 * 3. QUESTION ENGINE
 * 4. ANSWER BALANCE & PARITY
 * 5. LOCAL STORAGE ISOLATION
 * 6. IMPORT / EXPORT & SANITIZATION
 * 7. METRO SESSION & RESUME
 * 8. LANGUAGE TOGGLE STATE PRESERVATION
 * 9. TIMER LIFECYCLE & WAKE LOCK SAFETY
 * 10. MOBILE LAYOUT & ERGONOMICS
 * 11. CDS DASHBOARD INTEGRITY
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    passedTests++;
    console.log('  ✓ ' + message);
  } else {
    failedTests++;
    console.error('  ✗ FAIL: ' + message);
  }
}

function createMockStorage() {
  const store = {};
  return {
    getItem: function(key) { return store[key] || null; },
    setItem: function(key, val) { store[key] = String(val); },
    removeItem: function(key) { delete store[key]; },
    clear: function() { Object.keys(store).forEach(k => delete store[k]); },
    _store: store
  };
}

function loadPsiEnvironment(customStorage) {
  const mockStorage = customStorage || createMockStorage();
  const mockElement = { innerHTML: '', textContent: '', classList: { add: function() {}, remove: function() {} } };
  const context = {
    window: {},
    console: console,
    localStorage: mockStorage,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date,
    Math: Math,
    JSON: JSON,
    document: {
      addEventListener: function() {},
      getElementById: function(id) { return mockElement; },
      querySelector: function() { return mockElement; },
      querySelectorAll: function() { return []; }
    },
    navigator: {
      wakeLock: {
        request: function() { return Promise.resolve({ release: function() { return Promise.resolve(); } }); }
      }
    }
  };
  context.window = context;

  vm.createContext(context);

  const files = [
    'site/data/psi/index.js',
    'site/data/psi/pyq-2021.js',
    'site/data/psi/gujarat-gk.js',
    'site/data/psi/law.js',
    'site/data/psi/ai-practice.js',
    'site/data/psi/diagnostic-bank.js',
    'site/data/psi/math-drills.js',
    'site/data/psi/english-drills.js',
    'site/data/psi/science-drills.js',
    'site/data/psi/lexicon.js',
    'site/data/psi/lessons.js',
    'site/data/syllabus.js',
    'site/psi/psi-config.js',
    'site/psi/psi-storage.js',
    'site/psi/psi-srs.js',
    'site/psi/psi-question-engine.js',
    'site/psi/psi-ui.js'
  ];

  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    vm.runInContext(code, context);
  });

  if (context.PSI_QUESTION_BANK && typeof context.PSI_QUESTION_BANK.flushPending === 'function') {
    context.PSI_QUESTION_BANK.flushPending();
  }

  return context;
}

console.log('====================================================');
console.log('STARTING PSI AUTOMATED TEST SUITE');
console.log('====================================================\n');

// ----------------------------------------------------
// 1. SCORING ENGINE TESTS
// ----------------------------------------------------
console.log('TEST GROUP 1: SCORING ENGINE');
{
  const env = loadPsiEnvironment();
  const QE = env.PSIQuestionEngine;
  const configScoring = env.PSI_EXAM_CONFIG.scoring;

  // A. All correct (10 Qs)
  const allCorrect = QE.calculateScore({ correct: 10, wrong: 0, blank: 0, optionE: 0 }, configScoring);
  assert(allCorrect === 10.0, 'All correct: 10 questions -> score 10.0');

  // B. All wrong (10 Qs) -> negative score
  const allWrong = QE.calculateScore({ correct: 0, wrong: 10, blank: 0, optionE: 0 }, configScoring);
  assert(allWrong === -2.5, 'All wrong: 10 wrong -> score -2.5 (negative preserved)');

  // C. All blank (10 Qs) -> blank penalty applied
  const allBlank = QE.calculateScore({ correct: 0, wrong: 0, blank: 10, optionE: 0 }, configScoring);
  assert(allBlank === -2.5, 'All blank: 10 blank -> score -2.5 (blank penalty applied)');

  // D. Mixed correct and wrong (6 correct, 4 wrong)
  const mixedCW = QE.calculateScore({ correct: 6, wrong: 4, blank: 0, optionE: 0 }, configScoring);
  assert(mixedCW === 5.0, 'Mixed correct/wrong: 6 correct (6.0) - 4 wrong (1.0) -> score 5.0');

  // E. Mixed correct, wrong, and blank (4 correct, 2 wrong, 4 blank)
  const mixedCWB = QE.calculateScore({ correct: 4, wrong: 2, blank: 4, optionE: 0 }, configScoring);
  assert(mixedCWB === 2.5, 'Mixed correct/wrong/blank: 4 correct (4.0) - 2 wrong (0.5) - 4 blank (1.0) -> score 2.5');

  // F. Option E vs Blank distinction
  // 4 correct, 2 wrong, 4 Option E (optionEPenalty = 0.0)
  const withOptE = QE.calculateScore({ correct: 4, wrong: 2, blank: 0, optionE: 4 }, configScoring);
  assert(withOptE === 3.5, 'Option E: 4 correct (4.0) - 2 wrong (0.5) - 4 Option E (0) -> score 3.5');
  assert(withOptE > mixedCWB, 'Option E explicitly carries 0 penalty while Blank incurs 0.25 penalty');

  // G. Negative final score (not clamped by default)
  const negScore = QE.calculateScore({ correct: 1, wrong: 8, blank: 1, optionE: 0 }, configScoring);
  assert(negScore === -1.25, 'Negative final score: 1 - 2.0 - 0.25 = -1.25 (not clamped)');

  // H. Clamping when clampAtZero is true
  const clampedConfig = Object.assign({}, configScoring, { clampAtZero: true });
  const clampedScore = QE.calculateScore({ correct: 1, wrong: 8, blank: 1, optionE: 0 }, clampedConfig);
  assert(clampedScore === 0, 'Negative score clamps to 0 when clampAtZero is true');

  // I. Dynamic configuration changes (e.g. 2 marks per question, 0.5 negative, 0.33 blank, 0.1 Option E)
  const customConfig = { positiveMark: 2.0, negativeMark: 0.5, blankPenalty: 0.33, optionEPenalty: 0.1, clampAtZero: false };
  const customScore = QE.calculateScore({ correct: 5, wrong: 2, blank: 2, optionE: 1 }, customConfig);
  // 5 * 2.0 (10) - 2 * 0.5 (1.0) - 2 * 0.33 (0.66) - 1 * 0.1 (0.1) = 10 - 1.0 - 0.66 - 0.1 = 8.24
  assert(customScore === 8.24, 'Custom scoring configuration dynamically applied without hardcoding');
}

// ----------------------------------------------------
// 2. SRS ENGINE TESTS
// ----------------------------------------------------
console.log('\nTEST GROUP 2: SPACED REPETITION SYSTEM (SRS)');
{
  const env = loadPsiEnvironment();
  const SRS = env.PSISRS;

  const card0 = SRS.processAttempt(null, true, 'confident');
  assert(card0.repetition === 1 && card0.intervalDays === 1, 'New card with confident correct answer schedules SM-2 interval of 1 day');
  assert(card0.attempts === 1 && card0.correct === 1, 'Card attempt and correct counters incremented');

  const card1 = SRS.processAttempt(card0, true, 'unsure');
  assert(card1.intervalDays === 6 && card1.ef < card0.ef + 0.1, 'Second success jumps to 6 days; unsure answer does not raise easiness');

  const card2 = SRS.processAttempt(card1, false, 'confident');
  assert(card2.box === 1 && card2.lapses === 1, 'Incorrect attempt resets card to Box 1 and increments lapses');
}

// ----------------------------------------------------
// 3. QUESTION ENGINE & SMALL BANK SCALING
// ----------------------------------------------------
console.log('\nTEST GROUP 3: QUESTION ENGINE & SMALL BANK BEHAVIOR');
{
  const env = loadPsiEnvironment();
  const engine = new env.PSIQuestionEngine(env.PSI_QUESTION_BANK, env.PSIStorage, env.PSISRS, env.PSI_EXAM_CONFIG);

  const allQs = env.PSI_QUESTION_BANK.getAll();
  const N = allQs.length;
  assert(N >= 100, 'Question bank contains at least 100 verified questions (found ' + N + ')');

  const metroSessionIds = engine.buildMetro40Session(40);
  assert(metroSessionIds.length === Math.min(40, N), 'Metro session size is min(requested, bank size)');

  // Verify no duplicate IDs in session
  const uniqueIds = new Set(metroSessionIds);
  assert(uniqueIds.size === metroSessionIds.length, 'No duplicate questions exist in the session');

  // Create session and verify structure
  const session = engine.createSession('metro40');
  const SN = session.questionIds.length;
  assert(SN === Math.min(40, N), 'Metro session created with expected number of questions (' + SN + ')');
  assert(session.status === 'active', 'Session is initialized as active');

  // Answer question 0 with correct answer
  const q0 = env.PSI_QUESTION_BANK.getById(session.questionIds[0]);
  const ans0 = engine.recordAnswer(q0.id, q0.answer);
  assert(ans0.isCorrect === true && ans0.isOptionE === false, 'Recorded answer 0 is correct');

  // Answer question 1 with Option E
  const q1 = env.PSI_QUESTION_BANK.getById(session.questionIds[1]);
  const ans1 = engine.recordAnswer(q1.id, 4);
  assert(ans1.isOptionE === true && ans1.isCorrect === false, 'Recorded answer 1 is Option E');

  // Answer question 2 with wrong answer
  const q2 = env.PSI_QUESTION_BANK.getById(session.questionIds[2]);
  const wrongChoice = (q2.answer + 1) % 4;
  const ans2 = engine.recordAnswer(q2.id, wrongChoice);
  assert(ans2.isCorrect === false && ans2.isOptionE === false, 'Recorded answer 2 is wrong');

  // Leave rest blank and finish session
  const summary = engine.finishSession();
  assert(summary.totalQuestions === SN, 'Summary total matches session size');
  assert(summary.correct === 1, 'Summary reports 1 correct');
  assert(summary.wrong === 1, 'Summary reports 1 wrong');
  assert(summary.optionE === 1, 'Summary reports 1 Option E');
  assert(summary.blank === SN - 3, 'Summary reports all unanswered questions as blank');
  // Score: 1*1.0 - 1*0.25 - blank*0.25 - 1*0 (blank = SN-3)
  const expectedScore = Math.round((1 - 0.25 - (SN - 3) * 0.25) * 100) / 100;
  assert(summary.score === expectedScore, 'Summary score matches exact formula including blank deduction (' + expectedScore + ')');
}

// ----------------------------------------------------
// 4. ANSWER BALANCE & PARITY VALIDATION
// ----------------------------------------------------
console.log('\nTEST GROUP 4: ANSWER BALANCE & BILINGUAL PARITY');
{
  const env = loadPsiEnvironment();
  const qs = env.PSI_QUESTION_BANK.getAll();

  const dist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  let parityOk = true;

  qs.forEach(q => {
    dist[q.answer] = (dist[q.answer] || 0) + 1;
    if (q.options_gu.length !== 5 || q.options_en.length !== 5) {
      parityOk = false;
    }
    if (q.options_en[4] !== '(E) Not Attempted' || q.options_gu[4] !== '(E) પ્રયાસ કરેલ નથી') {
      parityOk = false;
    }
    if (!q.explanation_gu || !q.explanation_en) {
      parityOk = false;
    }
  });

  const total = qs.length;
  [0, 1, 2, 3].forEach(i => {
    const share = dist[i] / total;
    assert(share >= 0.15 && share <= 0.35, 'Choice ' + 'ABCD'[i] + ' share is balanced (' + (share * 100).toFixed(1) + '%)');
  });
  assert(dist[4] === 0, 'Choice E is never the correct knowledge answer (0%)');
  assert(parityOk, 'All questions have complete 5-choice bilingual parity and explanations');
}

// ----------------------------------------------------
// 5. LOCAL STORAGE ISOLATION & IMPORT SANITIZATION
// ----------------------------------------------------
console.log('\nTEST GROUP 5: STORAGE ISOLATION & IMPORT SANITIZATION');
{
  const mockStore = createMockStorage();
  // Simulate preexisting CDS dashboard data
  mockStore.setItem('cds2027.v1', JSON.stringify({ hours: 140, habitDone: 12 }));

  const env = loadPsiEnvironment(mockStore);
  env.PSIStorage.setPreference('language', 'en');
  env.PSIStorage.recordMistake('test_q', 'gap');

  // Verify CDS dashboard key was untouched
  const cdsRaw = mockStore.getItem('cds2027.v1');
  const cdsParsed = JSON.parse(cdsRaw);
  assert(cdsParsed.hours === 140 && cdsParsed.habitDone === 12, 'Existing CDS dashboard state cds2027.v1 is completely untouched');

  // Test Export
  const backupStr = env.PSIStorage.exportBackup();
  assert(typeof backupStr === 'string' && backupStr.includes('psi_trainer.v1') === false, 'Export produces clean JSON string');

  // Test Import with Malicious XSS Payload
  const maliciousPayload = JSON.stringify({
    version: 2,
    preferences: { language: 'en' },
    userProfile: { level: 'foundation', hasStudiedBefore: '<script>alert("xss")</script>' },
    mistakes: { 'q1': { type: '<img src=x onerror=alert(1)>', count: 3 } }
  });

  const importResult = env.PSIStorage.importBackup(maliciousPayload);
  assert(importResult.success === true, 'Import successfully parsed and migrated valid structure');
  // hasStudiedBefore must be sanitized to default allowed value
  const prof = env.PSIStorage.getUserProfile();
  assert(prof.hasStudiedBefore === 'not_yet', 'Malicious userProfile field rejected/sanitized to safe enum');
}

// ----------------------------------------------------
// 6. METRO SESSION INTERRUPT & RESUME
// ----------------------------------------------------
console.log('\nTEST GROUP 6: METRO SESSION INTERRUPT & RESUME');
{
  const mockStore = createMockStorage();
  const env1 = loadPsiEnvironment(mockStore);
  const engine1 = new env1.PSIQuestionEngine(env1.PSI_QUESTION_BANK, env1.PSIStorage, env1.PSISRS, env1.PSI_EXAM_CONFIG);

  const sess1 = engine1.createSession('metro40');
  sess1.currentIndex = 4;
  sess1.timeRemainingSec = 1850;
  engine1.recordAnswer(sess1.questionIds[0], 0);
  engine1.persistActiveSession();

  // Now create brand new environment (simulating page reload or return from dashboard)
  const env2 = loadPsiEnvironment(mockStore);
  const engine2 = new env2.PSIQuestionEngine(env2.PSI_QUESTION_BANK, env2.PSIStorage, env2.PSISRS, env2.PSI_EXAM_CONFIG);
  const resumable = engine2.getResumableSession();

  assert(resumable !== null, 'Resumable session detected on new instance load');
  assert(resumable.currentIndex === 4, 'Current question index (4) restored');
  assert(resumable.timeRemainingSec === 1850, 'Remaining timer duration (1850s) restored');
  assert(resumable.answers[sess1.questionIds[0]] !== undefined, 'Previous answer state restored');
}

// ----------------------------------------------------
// 7. TIMER LIFECYCLE & WAKE LOCK SAFETY
// ----------------------------------------------------
console.log('\nTEST GROUP 7: TIMER LIFECYCLE & WAKE LOCK SAFETY');
{
  const env = loadPsiEnvironment();
  const dummyDiv = { innerHTML: '', addEventListener: function() {} };
  const ui = new env.PSIUI(dummyDiv, new env.PSIQuestionEngine(env.PSI_QUESTION_BANK, env.PSIStorage, env.PSISRS, env.PSI_EXAM_CONFIG), env.PSIStorage, env.PSI_QUESTION_BANK, env.PSISRS, env.PSI_EXAM_CONFIG);

  ui.startSession('metro40');
  assert(ui.timerInterval !== null, 'Timer interval successfully started');

  // Stop timer on leaving
  ui.stopMetroTimer();
  assert(ui.timerInterval === null, 'Timer interval cleanly cleared on stopMetroTimer');

  // Safe wakeLock test without navigator throws
  assert(typeof ui.requestWakeLock === 'function', 'requestWakeLock method exists');
  ui.requestWakeLock(); // Should run safely without throwing
  assert(typeof ui.releaseWakeLock === 'function', 'releaseWakeLock method exists');
  ui.releaseWakeLock(); // Should run safely without throwing
}

// ----------------------------------------------------
// 8. MOBILE RESPONSIVE CSS VALIDATION
// ----------------------------------------------------
console.log('\nTEST GROUP 8: MOBILE CSS & STICKY FOOTER');
{
  const css = fs.readFileSync('site/psi/psi.css', 'utf8');
  assert(css.includes('position: sticky'), 'CSS contains position: sticky for footer');
  assert(css.includes('bottom: 0'), 'CSS contains bottom: 0 for sticky footer');
  assert(css.includes('max-width: 480px'), 'CSS contains media query for small mobile devices (<=480px)');
  assert(css.includes('max-width: 340px'), 'CSS contains media query for ultra-narrow devices (<=340px like 320px screen)');
  assert(css.includes('env(safe-area-inset-bottom)'), 'CSS includes safe-area-inset-bottom for modern phones');
}

// ----------------------------------------------------
// 9. CDS DASHBOARD INTEGRITY
// ----------------------------------------------------
console.log('\nTEST GROUP 9: CDS DASHBOARD INTEGRITY');
{
  const html = fs.readFileSync('site/index.html', 'utf8');
  const requiredSections = [
    'id="today"',
    'id="progress"',
    'id="month"',
    'id="plan"',       // Strategy & Route
    'id="phases"',     // Phases
    'id="shelf"',      // Books
    'id="mscore"',     // Mock logging
    'id="raddbtn"',    // Run logging
    'id="counters"',   // Habit counters
    'data-theme'       // Theme toggle
  ];

  let allSectionsPresent = true;
  requiredSections.forEach(sec => {
    if (!html.includes(sec)) {
      console.error('Missing section in index.html:', sec);
      allSectionsPresent = false;
    }
  });

  assert(allSectionsPresent, 'All 10 required CDS dashboard sections and theme controls remain intact in index.html');
  assert(/<script defer src="psi\/psi-app\.js[^"]*">/.test(html), 'PSI scripts load with non-blocking defer attribute');
}

// ----------------------------------------------------
// 10. LANGUAGE TOGGLE STATE PRESERVATION
// ----------------------------------------------------
console.log('\nTEST GROUP 10: LANGUAGE TOGGLE STATE PRESERVATION');
{
  const env = loadPsiEnvironment();
  const dummyDiv = { innerHTML: '', addEventListener: function() {} };
  const engine = new env.PSIQuestionEngine(env.PSI_QUESTION_BANK, env.PSIStorage, env.PSISRS, env.PSI_EXAM_CONFIG);
  const ui = new env.PSIUI(dummyDiv, engine, env.PSIStorage, env.PSI_QUESTION_BANK, env.PSISRS, env.PSI_EXAM_CONFIG);

  ui.startSession('metro40');
  const sess = engine.currentSession;
  sess.currentIndex = 3;
  sess.timeRemainingSec = 1420;
  engine.recordAnswer(sess.questionIds[0], 1);

  // Capture timer interval reference
  const initialTimer = ui.timerInterval;

  // Toggle language from 'gu' to 'en'
  ui.setLanguage('en');

  assert(ui.lang === 'en', 'Language changed to English');
  assert(env.PSIStorage.getPreferences().language === 'en', 'Language preference persisted in storage');
  assert(engine.currentSession.currentIndex === 3, 'Current question index (3) preserved across language switch');
  assert(engine.currentSession.timeRemainingSec === 1420, 'Time remaining (1420s) preserved across language switch');
  assert(engine.currentSession.answers[sess.questionIds[0]] !== undefined, 'Recorded answers preserved across language switch');
  assert(ui.timerInterval === initialTimer, 'Timer interval was not disrupted or restarted');

  ui.stopMetroTimer();
}

// ----------------------------------------------------
// 11. VIEWPORT BREAKPOINT COVERAGE (320, 360, 375, 390, 430px)
// ----------------------------------------------------
console.log('\nTEST GROUP 11: VIEWPORT BREAKPOINT COVERAGE');
{
  const css = fs.readFileSync('site/psi/psi.css', 'utf8');
  const targetWidths = [320, 360, 375, 390, 430];

  // Verify CSS contains mobile optimizations targeting <= 480px and <= 340px
  assert(css.includes('@media (max-width: 480px)'), 'Media query @media (max-width: 480px) covers 360, 375, 390, 430px');
  assert(css.includes('@media (max-width: 340px)'), 'Media query @media (max-width: 340px) covers narrowest 320px devices');
  assert(css.includes('box-sizing: border-box'), 'Box-sizing border-box applied to prevent horizontal overflow');
  assert(css.includes('overflow-x: auto'), 'Nav has horizontal scrolling for narrow touch viewports');
  assert(css.includes('padding-bottom: max(10px, env(safe-area-inset-bottom))'), 'Footer uses safe area inset for modern mobile screens');
}

// ----------------------------------------------------
// 12. BEGINNER FLOW PROGRESSION
// ----------------------------------------------------
console.log('\nTEST GROUP 12: BEGINNER FLOW PROGRESSION');
{
  const mockStore = createMockStorage();
  const env = loadPsiEnvironment(mockStore);
  const dummyDiv = { innerHTML: '', addEventListener: function() {} };
  const engine = new env.PSIQuestionEngine(env.PSI_QUESTION_BANK, env.PSIStorage, env.PSISRS, env.PSI_EXAM_CONFIG);
  const ui = new env.PSIUI(dummyDiv, engine, env.PSIStorage, env.PSI_QUESTION_BANK, env.PSISRS, env.PSI_EXAM_CONFIG);

  // Step 1: Initial state (0 lessons, 0 attempts)
  let fProg = ui.getFoundationProgress();
  assert(fProg.completedCount === 0, 'New user has 0 foundation topics completed');
  assert(fProg.nextModule.code === '01', 'Step 1 recommends Module 01 Constitution basics');

  // Step 2: Complete Module 01 lesson
  env.PSIStorage.recordLessonComplete('lesson_const_fr', 1.0);
  fProg = ui.getFoundationProgress();
  assert(fProg.completedCount === 1, 'Foundation topics completed increases to 1');
  assert(fProg.nextModule.code === '02', 'Step 2 advances to recommend Module 02 Gujarat Geography basics');

  // Step 3: Check topic mastery
  const masteryBefore = engine.getTopicMastery('law_constitution', 'constitution');
  assert(masteryBefore.status === 'FOUNDATION', 'Topic with completed lesson is in FOUNDATION status');

  // Step 4: Practice MCQs for this topic
  const practiceQIds = engine.buildLessonPracticeSession('lesson_const_fr');
  assert(practiceQIds.length > 0, 'Practice question pool generated for topic');
}

// ----------------------------------------------------
// 13. ANALYTICS, STORAGE SAFETY & DATA INTEGRITY
// ----------------------------------------------------
console.log('\nTEST GROUP 13: ANALYTICS, STORAGE SAFETY & DATA INTEGRITY');
{
  // Dashboard-owned fields in cds2027.v1 must survive PSI saves
  const store = createMockStorage();
  store.setItem('cds2027.v1', JSON.stringify({ days: {}, hours: 140, habitDone: 12 }));
  const env = loadPsiEnvironment(store);
  env.PSIStorage.setPreference('language', 'en');
  const cds = JSON.parse(store.getItem('cds2027.v1'));
  assert(cds.hours === 140 && cds.habitDone === 12, 'PSI save preserves extra fields in dashboard key');

  // Default state must not be mutated through returned state
  const env2 = loadPsiEnvironment();
  env2.PSIStorage.state.stats.attempted = 999;
  const fresh = env2.PSIStorage.migrate({});
  assert(fresh.stats.attempted === 0, 'migrate() returns state independent of shared defaults');

  // Preference sanitization
  const bad = env2.PSIStorage.migrate({ preferences: { language: 'fr', defaultMode: '<x>' } });
  assert(bad.preferences.language === 'gu' && bad.preferences.defaultMode === 'metro', 'Invalid preference values fall back to defaults');

  // Local date (not UTC) used for session dates: 05:30 IST is still "today"
  const st = env2.PSIStorage;
  const ts = new Date(2026, 9, 6, 5, 30).getTime();
  assert(st.localDateStr(ts) === '2026-10-06', 'localDateStr uses local calendar day');

  // Streak logic
  const dayStr = off => { const d = new Date(); d.setDate(d.getDate() - off); return st.localDateStr(d.getTime()); };
  st.state.history = [
    { date: dayStr(0), attempted: 10, correct: 5 },
    { date: dayStr(1), attempted: 10, correct: 5 },
    { date: dayStr(2), attempted: 10, correct: 5 },
    { date: dayStr(4), attempted: 10, correct: 5 }
  ];
  assert(st.getStreak() === 3, 'Streak counts consecutive days and stops at a gap');
  st.state.history.shift();
  assert(st.getStreak() === 2, 'Streak not broken when today has no activity yet');
  st.state.history = [{ date: dayStr(3), attempted: 10, correct: 5 }];
  assert(st.getStreak() === 0, 'Streak is 0 after a full missed day');

  // Subject accuracy
  const q = env2.PSI_QUESTION_BANK.getAll()[0];
  st.state.cards[q.id] = { attempts: 4, correct: 1 };
  const acc = st.getSubjectAccuracy(env2.PSI_QUESTION_BANK);
  assert(acc.length === 1 && acc[0].accuracy === 25, 'Subject accuracy aggregates card counters');

  // Option shuffling: stable, 5 options, correct answer text preserved
  const qs = env2.PSI_QUESTION_BANK.getAll();
  assert(qs.every(x => x.options_en.length === 5 && x.options_gu.length === 5 && x.answer >= 0 && x.answer < 4),
    'Every question has 4 answers + canonical Option E with in-range answer index');
  const diag = qs.find(x => x.id === 'diag_math_01');
  assert(diag.options_en[diag.answer] === '2', 'Shuffle remaps answer index to the same correct option text');

  // Progress screen renders insights without throwing
  const dummyDiv = { innerHTML: '', addEventListener: function() {}, querySelector: function() { return null; }, querySelectorAll: function() { return []; } };
  const engine = new env2.PSIQuestionEngine(env2.PSI_QUESTION_BANK, st, env2.PSISRS, env2.PSI_EXAM_CONFIG);
  const ui = new env2.PSIUI(dummyDiv, engine, st, env2.PSI_QUESTION_BANK, env2.PSISRS, env2.PSI_EXAM_CONFIG);
  ui.lang = 'en';
  const html = ui.renderProgressScreen();
  assert(html.includes('Consistency') && html.includes('Accuracy by Subject'), 'Progress screen renders consistency and subject accuracy panels');
}

// ----------------------------------------------------
// 14. SYLLABUS ROADMAP
// ----------------------------------------------------
console.log('\nTEST GROUP 14: SYLLABUS ROADMAP');
{
  const env = loadPsiEnvironment();
  const syl = env.GOAL_SYLLABUS;
  assert(syl && syl.subjects.length >= 5, 'Syllabus data loads with subjects');

  const topics = syl.subjects.flatMap(s => s.topics);
  const ids = new Set(topics.map(t => t.id));
  assert(ids.size === topics.length, 'Syllabus topic ids are unique');
  assert(topics.every(t => ['high', 'med', 'low'].includes(t.priority) && t.stage >= 1 && t.stage <= 4 && t.exams.length),
    'Every topic has valid priority, stage and exam tags');

  const bankKeys = new Set(env.PSI_QUESTION_BANK.getAll().map(q => q.subject + '::' + q.topic));
  const deadKeys = topics.flatMap(t => t.match).filter(k => !bankKeys.has(k));
  assert(deadKeys.length === 0, 'Every syllabus match key exists in the question bank' + (deadKeys.length ? ' (missing: ' + deadKeys.join(', ') + ')' : ''));

  const lessonIds = new Set((env.PSI_LESSON_BANK.lessons || []).map(l => l.id));
  const badLessons = topics.filter(t => t.lesson && !lessonIds.has(t.lesson)).map(t => t.lesson);
  assert(badLessons.length === 0, 'Every linked lesson exists' + (badLessons.length ? ' (missing: ' + badLessons.join(', ') + ')' : ''));

  // Checklist persistence + sanitization
  const st = env.PSIStorage;
  assert(st.toggleSyllabusDone('m_percent') === true && st.isSyllabusDone('m_percent'), 'Topic can be ticked done');
  assert(st.toggleSyllabusDone('m_percent') === false, 'Topic can be unticked');
  const m = st.migrate({ syllabusDone: { m_number: 123, '<bad>': 1 } });
  assert(m.syllabusDone.m_number === 123 && !('<bad>' in m.syllabusDone), 'Imported syllabus ticks are sanitized');

  // Topic-specific practice only draws from requested topics
  const engine = new env.PSIQuestionEngine(env.PSI_QUESTION_BANK, st, env.PSISRS, env.PSI_EXAM_CONFIG);
  const sess = engine.createSession('practice', { topics: ['law_constitution::bns', 'law_constitution::bnss'], count: 10 });
  const allBns = sess.questionIds.every(id => { const q = env.PSI_QUESTION_BANK.getById(id); return q.topic === 'bns' || q.topic === 'bnss'; });
  assert(sess.questionIds.length > 0 && allBns, 'Topic practice draws only from the requested topics');

  // Screen renders, next-up list and exam filter work
  const dummyDiv = { innerHTML: '', addEventListener: function() {}, querySelector: function() { return null; }, querySelectorAll: function() { return []; } };
  const ui = new env.PSIUI(dummyDiv, engine, st, env.PSI_QUESTION_BANK, env.PSISRS, env.PSI_EXAM_CONFIG);
  ui.lang = 'en';
  let html = ui.renderSyllabusScreen();
  assert(html.includes('Start here') && html.includes('Full syllabus by subject'), 'Syllabus screen renders roadmap sections');
  ui.syllabusExam = 'CDS';
  html = ui.renderSyllabusScreen();
  assert(!html.includes('Gujarat geography') && html.includes('Defence'), 'CDS filter hides PSI-only topics');
}

console.log('\n====================================================');
console.log('TEST SUMMARY: ' + passedTests + ' PASSED, ' + failedTests + ' FAILED');
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
}
