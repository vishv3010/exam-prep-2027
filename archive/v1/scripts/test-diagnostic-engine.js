/**
 * Automated Verification Test for GOAL OS Diagnostic Engine (Phase 2)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'site', 'data', 'psi');
const PSI_DIR = path.join(ROOT_DIR, 'site', 'psi');

console.log('====================================================');
console.log('   GOAL OS DIAGNOSTIC ENGINE VERIFICATION SUITE     ');
console.log('====================================================\n');

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
  parseInt: parseInt
};
ctx.window = ctx;
vm.createContext(ctx);

function loadFile(dir, file) {
  const p = path.join(dir, file);
  const code = fs.readFileSync(p, 'utf8');
  vm.runInContext(code, ctx);
}

// 1. Load Question Data
loadFile(DATA_DIR, 'index.js');
loadFile(DATA_DIR, 'pyq-2021.js');
loadFile(DATA_DIR, 'gujarat-gk.js');
loadFile(DATA_DIR, 'law.js');
loadFile(DATA_DIR, 'ai-practice.js');
loadFile(DATA_DIR, 'diagnostic-bank.js');
loadFile(DATA_DIR, 'lessons.js');

// 2. Load Engine Modules
loadFile(PSI_DIR, 'psi-config.js');
loadFile(PSI_DIR, 'psi-storage.js');
loadFile(PSI_DIR, 'psi-srs.js');
loadFile(PSI_DIR, 'psi-question-engine.js');

const bank = ctx.window.GoalQuestionBank;
const storage = ctx.window.GoalStorage;
const srs = ctx.window.PSISRS;
const config = ctx.window.PSI_EXAM_CONFIG;

// Flush pending
if (bank.flushPending) bank.flushPending();

console.log(`[Test] Total Questions Registered: ${bank.getAll().length}`);
if (bank.getAll().length !== 70) {
  console.error(`FAIL: Expected 70 questions, got ${bank.getAll().length}`);
  process.exit(1);
}

const engine = new ctx.window.PSIQuestionEngine(bank, storage, srs, config);

// 3. Test buildDiagnosticSession
console.log('\n--- 1. Testing Diagnostic Session Assembly ---');
const diagIds = engine.buildDiagnosticSession();
console.log(`Diagnostic Question Count: ${diagIds.length}`);

if (diagIds.length !== 25) {
  console.error(`FAIL: Expected 25 diagnostic questions, got ${diagIds.length}`);
  process.exit(1);
}

// Verify sequential section distribution
const sectionCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
let lastSection = 1;

diagIds.forEach((id, idx) => {
  const q = bank.getById(id);
  if (!q) {
    console.error(`FAIL: Question ID ${id} not found in bank`);
    process.exit(1);
  }
  const sec = q.diagnosticSection;
  if (!sec || sec < 1 || sec > 5) {
    console.error(`FAIL: Question ${id} has invalid diagnosticSection: ${sec}`);
    process.exit(1);
  }
  if (sec < lastSection) {
    console.error(`FAIL: Section out of order: ${sec} after ${lastSection} at question index ${idx}`);
    process.exit(1);
  }
  lastSection = sec;
  sectionCounts[sec]++;
});

console.log('Section Distribution:');
console.log(`  Section 1 (Quant & Arithmetic) : ${sectionCounts[1]} questions (expected 5)`);
console.log(`  Section 2 (Reasoning & Ability): ${sectionCounts[2]} questions (expected 4)`);
console.log(`  Section 3 (English Grammar)    : ${sectionCounts[3]} questions (expected 5)`);
console.log(`  Section 4 (GK & Constitution)  : ${sectionCounts[4]} questions (expected 6)`);
console.log(`  Section 5 (Gujarat GK & Admin) : ${sectionCounts[5]} questions (expected 5)`);

if (sectionCounts[1] !== 5 || sectionCounts[2] !== 4 || sectionCounts[3] !== 5 || sectionCounts[4] !== 6 || sectionCounts[5] !== 5) {
  console.error('FAIL: Section counts do not match official specification!');
  process.exit(1);
}
console.log('[OK] Diagnostic session assembly passed with perfect section ordering.');

// 4. Test Session Execution & Answering
console.log('\n--- 2. Simulating Diagnostic Session Run ---');
const sess = engine.createSession('diagnostic');

// Simulation script:
// Section 1 (Maths): 2 correct, 2 wrong (calculation slips), 1 option E
// Section 2 (Reasoning): 3 correct, 1 wrong (time pressure)
// Section 3 (English): 4 correct, 1 wrong (misread)
// Section 4 (GK & Const): 4 correct, 2 wrong (knowledge gap)
// Section 5 (Gujarat GK): 3 correct, 1 wrong (knowledge gap), 1 blank
diagIds.forEach((id, i) => {
  const q = bank.getById(id);
  const sec = q.diagnosticSection;

  if (sec === 1) {
    if (i === 0 || i === 1) engine.recordAnswer(id, q.answer, 'confident', null, 55);
    else if (i === 2 || i === 3) engine.recordAnswer(id, (q.answer + 1) % 4, 'unsure', 'CALCULATION_SLIP', 80);
    else engine.recordAnswer(id, 4, 'confident', null, 15); // Option E
  } else if (sec === 2) {
    if (i === 5 || i === 6 || i === 7) engine.recordAnswer(id, q.answer, 'confident', null, 40);
    else engine.recordAnswer(id, (q.answer + 1) % 4, 'unsure', 'TIME_PRESSURE', 90);
  } else if (sec === 3) {
    if (i === 9 || i === 10 || i === 11 || i === 12) engine.recordAnswer(id, q.answer, 'confident', null, 30);
    else engine.recordAnswer(id, (q.answer + 1) % 4, 'unsure', 'MISREAD', 45);
  } else if (sec === 4) {
    if (i === 14 || i === 15 || i === 16 || i === 17) engine.recordAnswer(id, q.answer, 'confident', null, 25);
    else engine.recordAnswer(id, (q.answer + 1) % 4, 'unsure', 'KNOWLEDGE_GAP', 35);
  } else {
    // Section 5
    if (i === 20 || i === 21 || i === 22) engine.recordAnswer(id, q.answer, 'confident', null, 20);
    else if (i === 23) engine.recordAnswer(id, (q.answer + 1) % 4, 'unsure', 'KNOWLEDGE_GAP', 25);
    else engine.recordAnswer(id, null, null, null, 10); // Blank
  }
});

// 5. Test Finish Session and Diagnostic Report Generation
console.log('\n--- 3. Testing Diagnostic Report Evaluation ---');
const summary = engine.finishSession();

if (!summary.diagnosticReport) {
  console.error('FAIL: summary.diagnosticReport was not generated!');
  process.exit(1);
}

const rep = summary.diagnosticReport;
console.log(`Total Questions: ${rep.totalQuestions}`);
console.log(`Attempted      : ${rep.attempted}`);
console.log(`Correct        : ${rep.correct}`);
console.log(`Wrong          : ${rep.wrong}`);
console.log(`Option E       : ${rep.optionE}`);
console.log(`Blank          : ${rep.blank}`);
console.log(`Net Score      : ${rep.netScore}`);
console.log(`Preparedness   : ${rep.overallPreparednessScore}/100`);
console.log(`Overall Level  : ${rep.overallLevel}`);

// Check 6 key outputs
console.log('\n--- 4. Verifying 6 Required Deliverables ---');

// Output 1: Level per domain and overall
console.log('Output 1: Level per domain:');
rep.sections.forEach(s => {
  console.log(`  Section ${s.sectionIndex} (${s.name}): ${s.accuracy}% -> [${s.level}]`);
  if (!s.level || !s.accuracy) {
    console.error(`FAIL: Missing level or accuracy in section ${s.sectionIndex}`);
    process.exit(1);
  }
});

// Output 2: Critical Weaknesses
console.log('\nOutput 2: Critical Weaknesses:');
if (!Array.isArray(rep.criticalWeaknesses) || rep.criticalWeaknesses.length === 0) {
  console.error('FAIL: Expected critical weaknesses to be flagged!');
  process.exit(1);
}
rep.criticalWeaknesses.forEach(w => {
  console.log(`  - ${w.sectionName}: ${w.accuracy}% accuracy (${w.wrongCount} wrong). Advice: ${w.advice.slice(0, 60)}...`);
});

// Output 3: High-Return Topics
console.log('\nOutput 3: High-Return Topics:');
if (!Array.isArray(rep.highReturnTopics) || rep.highReturnTopics.length === 0) {
  console.error('FAIL: Missing highReturnTopics!');
  process.exit(1);
}
rep.highReturnTopics.forEach(t => {
  console.log(`  - ${t.topic}`);
});

// Output 4: Unknown Areas
console.log('\nOutput 4: Unknown Areas:');
if (!Array.isArray(rep.unknownAreas)) {
  console.error('FAIL: unknownAreas is not an array!');
  process.exit(1);
}
console.log(`  Logged: ${rep.unknownAreas.join(', ')}`);

// Output 5: 7-Day Training Plan
console.log('\nOutput 5: Immediate 7-Day Training Plan:');
if (!Array.isArray(rep.sevenDayPlan) || rep.sevenDayPlan.length !== 7) {
  console.error(`FAIL: Expected 7-day plan with 7 entries, got ${rep.sevenDayPlan ? rep.sevenDayPlan.length : 0}`);
  process.exit(1);
}
rep.sevenDayPlan.forEach(p => {
  console.log(`  ${p.title} (Focus: ${p.focus})`);
});

// Output 6: Starting preparedness score (0-100)
console.log(`\nOutput 6: Starting Preparedness Score: ${rep.overallPreparednessScore} / 100`);
if (typeof rep.overallPreparednessScore !== 'number' || rep.overallPreparednessScore < 0 || rep.overallPreparednessScore > 100) {
  console.error(`FAIL: Invalid overallPreparednessScore: ${rep.overallPreparednessScore}`);
  process.exit(1);
}

// 6. Test Persistence in Storage
console.log('\n--- 5. Verifying Storage Persistence ---');
const persisted = storage.getDiagnosticResult();
if (!persisted || persisted.overallPreparednessScore !== rep.overallPreparednessScore) {
  console.error('FAIL: storage.getDiagnosticResult() failed to retrieve persisted report!');
  process.exit(1);
}
console.log('[OK] Diagnostic result successfully persisted and retrieved from storage.');

console.log('\n====================================================');
console.log('   ALL 5 SECTIONS & 6 DELIVERABLES VERIFIED 100%    ');
console.log('====================================================');
