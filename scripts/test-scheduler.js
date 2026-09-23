/**
 * Automated Test Suite for GOAL OS Adaptive Scheduler (psi-scheduler.js)
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('   GOAL OS ADAPTIVE SCHEDULER TEST SUITE            ');
console.log('====================================================');

// Setup mock browser environment
const globalScope = {
  GoalStorage: null,
  GoalQuestionBank: null,
  PSISRS: null
};

// Load Scheduler
const schedulerCode = fs.readFileSync(path.join(__dirname, '../site/psi/psi-scheduler.js'), 'utf8');
const runInContext = new Function('window', 'root', schedulerCode);
runInContext(globalScope, globalScope);

const GoalScheduler = globalScope.GoalScheduler;
assert(typeof GoalScheduler === 'function', 'GoalScheduler should be defined');

// 1. Test Weekday Plan Generation without diagnostic
{
  const mockStorage = {
    getDiagnosticResult: () => null,
    state: { cdsHabitData: { days: {} } }
  };
  const mockBank = { getAll: () => [] };
  const mockSrs = {
    filterDue: () => [],
    filterRepeatedMistakes: () => []
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);
  // Wednesday (2026-09-23 is Wednesday)
  const plan = scheduler.generateDailyPlan('2026-09-23T06:00:00Z');

  assert.strictEqual(plan.isWeekend, false, 'Wednesday should not be weekend');
  assert.strictEqual(plan.blocks.length, 3, 'Weekday must have exactly 3 training blocks');
  assert.strictEqual(plan.blocks[0].type, 'desk', 'Morning block must be desk study');
  assert.strictEqual(plan.blocks[0].actionId, 'diagnostic', 'Without diagnostic, morning block must prompt diagnostic assessment');
  assert.strictEqual(plan.blocks[1].type, 'transit', 'Middle block must be transit commute');
  assert.strictEqual(plan.blocks[1].actionId, 'metro40', 'With 0 due cards, transit block must assign lexicon drill');
  assert.strictEqual(plan.blocks[2].type, 'desk', 'Evening block must be consolidation desk study');

  console.log('[PASS] Test 1: Weekday default plan with uncalibrated diagnostic baseline');
}

// 2. Test Dynamic Rebalancing for Math Weakness
{
  const mockStorage = {
    getDiagnosticResult: () => ({
      criticalWeaknesses: [
        { sectionName: 'Quantitative Aptitude', accuracy: 20, advice: 'Arithmetic drill' }
      ]
    }),
    state: { cdsHabitData: { days: {} } }
  };
  const mockBank = { getAll: () => [] };
  const mockSrs = {
    filterDue: () => [],
    filterRepeatedMistakes: () => []
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);
  const plan = scheduler.generateDailyPlan('2026-09-23T06:00:00Z');

  assert.strictEqual(plan.blocks[0].subject, 'mathematics', 'Morning block must adapt to mathematics for quant weakness');
  assert.strictEqual(plan.blocks[0].actionId, 'practice');
  assert(plan.blocks[0].why.includes('Quantitative Aptitude (20% accuracy)'), 'Why directive must cite diagnostic accuracy');

  console.log('[PASS] Test 2: Dynamic rebalancing prioritizes Quantitative Aptitude when diagnosed weak');
}

// 3. Test Dynamic Rebalancing for English Weakness
{
  const mockStorage = {
    getDiagnosticResult: () => ({
      criticalWeaknesses: [
        { sectionName: 'English Language', accuracy: 35, advice: 'Grammar drill' }
      ]
    }),
    state: { cdsHabitData: { days: {} } }
  };
  const mockBank = { getAll: () => [] };
  const mockSrs = {
    filterDue: () => [],
    filterRepeatedMistakes: () => []
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);
  const plan = scheduler.generateDailyPlan('2026-09-23T06:00:00Z');

  assert.strictEqual(plan.blocks[0].subject, 'english', 'Morning block must adapt to english');
  assert(plan.blocks[0].why.includes('English (35% accuracy)'));

  console.log('[PASS] Test 3: Dynamic rebalancing prioritizes English Language when diagnosed weak');
}

// 4. Test Due SRS Cards Triggering Metro Revision
{
  const mockStorage = {
    getDiagnosticResult: () => null,
    state: { cdsHabitData: { days: {} } }
  };
  const mockBank = { getAll: () => [{ id: 'q1' }, { id: 'q2' }] };
  const mockSrs = {
    filterDue: () => [{ id: 'q1' }, { id: 'q2' }],
    filterRepeatedMistakes: () => []
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);
  const plan = scheduler.generateDailyPlan('2026-09-23T06:00:00Z');

  assert.strictEqual(plan.blocks[1].actionId, 'revision', 'Transit block must switch to revision when SRS cards are due');
  assert(plan.blocks[1].title.includes('2 SRS Due Cards'), 'Transit block title must reflect due card count');

  console.log('[PASS] Test 4: Metro transit block dynamically assigns SM-2 due card review');
}

// 5. Test Repeated Mistakes Triggering Evening Remediation
{
  const mockStorage = {
    getDiagnosticResult: () => null,
    state: { cdsHabitData: { days: {} } }
  };
  const mockBank = { getAll: () => [{ id: 'q1' }] };
  const mockSrs = {
    filterDue: () => [],
    filterRepeatedMistakes: () => [{ id: 'q1' }]
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);
  const plan = scheduler.generateDailyPlan('2026-09-23T06:00:00Z');

  assert(plan.blocks[2].title.includes('1 Repeated Mistakes'), 'Evening block must target repeated mistakes');

  console.log('[PASS] Test 5: Evening consolidation block prioritizes repeated mistake repair');
}

// 6. Test Weekend Plans (Saturday & Sunday)
{
  const mockStorage = {
    getDiagnosticResult: () => null,
    state: { cdsHabitData: { days: {} } }
  };
  const mockBank = { getAll: () => [] };
  const mockSrs = {
    filterDue: () => [],
    filterRepeatedMistakes: () => []
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);

  // Saturday: 2026-09-26
  const satPlan = scheduler.generateDailyPlan('2026-09-26T09:00:00Z');
  assert.strictEqual(satPlan.isWeekend, true);
  assert.strictEqual(satPlan.blocks.length, 3);
  assert.strictEqual(satPlan.blocks[0].badge, 'Deep Problem Solving');
  assert.strictEqual(satPlan.blocks[1].badge, 'PET 5 km Run');
  assert.strictEqual(satPlan.blocks[2].badge, 'SRS Zero Inbox');

  // Sunday: 2026-09-27
  const sunPlan = scheduler.generateDailyPlan('2026-09-27T09:00:00Z');
  assert.strictEqual(sunPlan.isWeekend, true);
  assert.strictEqual(sunPlan.blocks.length, 3);
  assert.strictEqual(sunPlan.blocks[0].badge, 'Exam Simulation');
  assert.strictEqual(sunPlan.blocks[1].badge, 'Audit & Calibration');
  assert.strictEqual(sunPlan.blocks[2].badge, 'SSB Fitness & Life');

  console.log('[PASS] Test 6: Weekend schedule provides 3-block Deep/Run/SRS on Sat and Mock/Audit/Life on Sun');
}

// 7. Test HTML Rendering in Container
{
  const mockStorage = {
    getDiagnosticResult: () => null,
    state: { cdsHabitData: { days: { '2026-09-23': true } } }
  };
  const mockBank = { getAll: () => [] };
  const mockSrs = {
    filterDue: () => [],
    filterRepeatedMistakes: () => []
  };

  const scheduler = new GoalScheduler(mockStorage, mockBank, mockSrs);
  let renderedHtml = '';
  const mockContainer = {
    set innerHTML(html) {
      renderedHtml = html;
    }
  };

  scheduler.renderTodayCard(mockContainer);
  assert(renderedHtml.includes('WHAT TO DO NOW'), 'Card must render WHAT TO DO NOW directive');
  assert(renderedHtml.includes('START THIS BLOCK'), 'Card must render action button');
  assert(renderedHtml.includes('sched-action-btn'), 'Card must include sched-action-btn id');

  console.log('[PASS] Test 7: renderTodayCard generates complete interactive coaching DOM');
}

console.log('\n[ALL TESTS PASSED] GoalScheduler fulfills all adaptive coaching criteria.\n');
