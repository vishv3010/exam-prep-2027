#!/usr/bin/env node
/**
 * Loads the app's engine + content exactly as the browser does (same file order as
 * site/index.html) and checks data integrity and scheduler behaviour.
 *   node scripts/check.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = path.join(__dirname, '..', 'site');
const html = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"?]+)/g)].map(m => m[1]).filter(s => s !== 'ui.js');

const ctx = { console, Math, Date, JSON };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(SITE, s), 'utf8'), ctx, { filename: s });
const G = ctx.GOAL;

let fail = 0;
const err = (m) => { fail++; console.error('  ✗ ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

console.log('Content');
let n = { learn: 0, mcq: 0, flash: 0, task: 0 };
const ids = new Set();
const qtext = new Map();
for (const t of G.topics) {
  if (!t.seq.length) err(`topic ${t.id} has no content`);
  for (const it of t.seq) {
    n[it.type]++;
    if (ids.has(it.id)) err(`duplicate id ${it.id}`);
    ids.add(it.id);
    if (it.type === 'mcq') {
      if (!Array.isArray(it.o) || it.o.length !== 4) err(`${it.id}: needs 4 options`);
      if (!(it.a >= 0 && it.a < 4)) err(`${it.id}: bad answer index`);
      if (new Set(it.o).size !== it.o.length) err(`${it.id}: duplicate options: ${it.o.join(' | ')}`);
      if (!it.q) err(`${it.id}: empty question`);
      const key = (it.ctx || '') + it.q;
      if (qtext.has(key)) err(`${it.id}: same question text as ${qtext.get(key)}`);
      qtext.set(key, it.id);
    }
    if (it.type === 'flash' && (!it.front || !it.back)) err(`${it.id}: empty flashcard side`);
    if (it.type === 'task' && (!it.rubric || !it.rubric.length || !it.min)) err(`${it.id}: task needs rubric + min`);
  }
}
ok(`${G.topics.length} topics · ${n.learn} lessons · ${n.mcq} questions · ${n.flash} flashcards · ${n.task} writing tasks`);
ok(`${G.legacyCount} v1 questions imported, ${G.legacySkipped} skipped`);

console.log('Marks budget');
for (const e of ['psi', 'cds']) {
  const sum = G.topics.reduce((a, t) => a + t[e], 0);
  sum === 300 ? ok(`${e.toUpperCase()} topics sum to 300`) : err(`${e.toUpperCase()} topics sum to ${sum}, expected 300`);
  for (const s of G.EXAMS[e].sections) {
    const ss = G.topics.filter(t => t.sec[e] === s.id).reduce((a, t) => a + t[e], 0);
    ss === s.max ? ok(`${e}.${s.id} = ${ss}`) : err(`${e}.${s.id} sums to ${ss}, expected ${s.max}`);
  }
  for (const t of G.topics) if (t[e] && !t.sec[e]) err(`${t.id} has ${e} marks but no section`);
}
for (const t of G.topics) for (const p of t.pre) if (!G.topicMap[p]) err(`${t.id} prerequisite ${p} missing`);

console.log('Scheduler');
const S = G.blank();
G.applyPrefs(S);
for (const place of ['metro', 'desk', 'free']) {
  for (const m of [2, 10, 40]) {
    const s = G.build(S, place, m);
    if (!s.queue.length) err(`${place}/${m}: empty session for a new user`);
    if (place === 'metro' && s.queue.some(it => !G.itemFits(it, 'metro'))) err('metro session contains a pen-and-paper item');
    if (s.est > m * 1.6 + 2) err(`${place}/${m}: estimated ${s.est.toFixed(1)} min — overfilled`);
  }
}
const first = G.build(S, 'desk', 15);
ok(`new user, desk 15 min → ${first.topics.map(id => G.topicMap[id].name).join(', ')} (${first.queue.length} cards)`);
ok(`new user, metro 10 min → ${G.build(S, 'metro', 10).topics.map(id => G.topicMap[id].name).join(', ')}`);

// Simulate 30 days of mixed use, 70% right answers, and check the engine keeps serving and projection moves.
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const realDayNum = G.dayNum;
let offset = 0;
G.dayNum = (d) => realDayNum(d) + offset;
const places = ['metro', 'desk', 'desk', 'free'];
for (let day = 0; day < 30; day++, offset++) {
  for (let k = 0; k < 2; k++) {
    const place = places[Math.floor(rnd() * places.length)];
    const s = G.build(S, place, [5, 10, 20][Math.floor(rnd() * 3)]);
    if (!s.queue.length) { err(`day ${day}: empty ${place} session`); continue; }
    if (s.topics.length) S.frontier[place] = s.topics[s.topics.length - 1];
    for (const it of s.queue) {
      if (it.type === 'learn') G.markSeen(S, it);
      else if (G.gradable(it)) G.grade(S, it, rnd() < 0.7);
      G.logTime(S, it.topic, G.cost(it));
    }
  }
}
const p = G.project(S);
const rs = G.recentSplit(S);
ok(`after 30 simulated days: PSI ${p.psi.total.toFixed(1)}/300 · CDS ${p.cds.total.toFixed(1)}/300 · split PSI ${(rs.psi * 100).toFixed(0)}%`);
if (p.psi.total <= 5 || p.cds.total <= 5) err('projection barely moved after 30 days of practice');
if (Math.abs(rs.psi - 0.55) > 0.15) err(`effort split drifted to ${(rs.psi * 100).toFixed(0)}% PSI (target 55%)`);
const due = G.due(S, 'desk').length;
ok(`${due} reviews due on day 30`);

console.log('Mocks');
for (const e of ['psi', 'cds']) {
  const m = G.buildMock(S, e, 25, null, rnd);
  m.length === 25 ? ok(`${e} mock: 25 questions`) : err(`${e} mock has ${m.length} questions`);
  if (new Set(m.map(x => x.id)).size !== m.length) err(`${e} mock repeats a question`);
  if (e === 'psi' && m.some(x => G.topicMap[x.topic].sec.psi === 'W')) err('PSI mock contains Paper 2 (descriptive) items');
}
const sc = G.scoreMock('psi', [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 3 }], [0, 0, 'E', null]);
sc.score === 0.5 ? ok('PSI scoring: +1 −0.25 wrong, E = 0, blank −0.25') : err(`PSI scoring wrong: ${sc.score}`);
const sc2 = G.scoreMock('cds', [{ a: 0 }, { a: 1 }, { a: 2 }], [0, 0, null]);
Math.abs(sc2.score - 0.67) < 0.01 ? ok('CDS scoring: +1 −1/3, blank free') : err(`CDS scoring wrong: ${sc2.score}`);

console.log(fail ? `\n${fail} problem(s)` : '\nAll checks passed');
process.exit(fail ? 1 : 0);
