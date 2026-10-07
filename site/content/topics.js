/**
 * The syllabus as a marks budget. Every topic says roughly how many of the 300 marks
 * it is worth in each exam, and how many beginner hours it takes to collect most of them.
 * The scheduler ranks by (0.55·PSI + 0.45·CDS) / hours — marks per hour of your life.
 *
 * Mark estimates come from the official patterns:
 *   PSI  Paper 1 Part A: Reasoning & DI 50 + Quant 50 · Part B: 4 × 25 · Paper 2: 100 (Guj ~60–70, Eng ~30–40)
 *   CDS  English 100 · GK 100 · Elementary Maths 100
 * and are split across topics by past-paper frequency. They are estimates; re-check each
 * notification (gprb.gujarat.gov.in, ojas.gujarat.gov.in, upsc.gov.in).
 *
 * metro: true = can be studied standing with one hand (facts, words, short MCQs).
 */
(function (root) {
  'use strict';
  var T = root.GOAL.topic;

  // ── Quant / Elementary Maths ── PSI Part A (50) · CDS Maths (100)
  T({ id: 'm_simplify', group: 'Maths', name: 'Simplification, BODMAS, squares & roots', psi: 6, cds: 4, sec: { psi: 'A', cds: 'M' }, hrs: 3 });
  T({ id: 'm_percent', group: 'Maths', name: 'Percentages', psi: 5, cds: 5, sec: { psi: 'A', cds: 'M' }, hrs: 3 });
  T({ id: 'm_number', group: 'Maths', name: 'Number system, divisibility, HCF & LCM', psi: 5, cds: 9, sec: { psi: 'A', cds: 'M' }, hrs: 4 });
  T({ id: 'm_ratio', group: 'Maths', name: 'Ratio, proportion, partnership, mixtures', psi: 5, cds: 5, sec: { psi: 'A', cds: 'M' }, hrs: 3, pre: ['m_percent'] });
  T({ id: 'm_avg', group: 'Maths', name: 'Averages & ages', psi: 4, cds: 3, sec: { psi: 'A', cds: 'M' }, hrs: 2 });
  T({ id: 'm_pl', group: 'Maths', name: 'Profit, loss & discount', psi: 5, cds: 4, sec: { psi: 'A', cds: 'M' }, hrs: 3, pre: ['m_percent'] });
  T({ id: 'm_interest', group: 'Maths', name: 'Simple & compound interest', psi: 4, cds: 4, sec: { psi: 'A', cds: 'M' }, hrs: 3, pre: ['m_percent'] });
  T({ id: 'm_tw', group: 'Maths', name: 'Time & work, pipes', psi: 4, cds: 4, sec: { psi: 'A', cds: 'M' }, hrs: 3, pre: ['m_ratio'] });
  T({ id: 'm_tsd', group: 'Maths', name: 'Speed, distance, trains & boats', psi: 5, cds: 5, sec: { psi: 'A', cds: 'M' }, hrs: 4, pre: ['m_ratio'] });
  T({ id: 'm_algebra', group: 'Maths', name: 'Algebra — identities, equations, polynomials', psi: 3, cds: 17, sec: { psi: 'A', cds: 'M' }, hrs: 10, pre: ['m_simplify'] });
  T({ id: 'm_geometry', group: 'Maths', name: 'Geometry — lines, triangles, circles', psi: 2, cds: 12, sec: { psi: 'A', cds: 'M' }, hrs: 10 });
  T({ id: 'm_mensuration', group: 'Maths', name: 'Mensuration — area & volume', psi: 2, cds: 10, sec: { psi: 'A', cds: 'M' }, hrs: 6, pre: ['m_geometry'] });
  T({ id: 'm_trig', group: 'Maths', name: 'Trigonometry, heights & distances', psi: 0, cds: 12, sec: { cds: 'M' }, hrs: 8, pre: ['m_geometry'] });
  T({ id: 'm_stats', group: 'Maths', name: 'Statistics — mean, median, mode', psi: 0, cds: 6, sec: { cds: 'M' }, hrs: 3, pre: ['m_avg'] });

  // ── Reasoning & DI ── PSI Part A (50)
  T({ id: 'r_series', group: 'Reasoning', name: 'Series, analogy, odd one out', psi: 10, sec: { psi: 'A' }, hrs: 3 });
  T({ id: 'r_coding', group: 'Reasoning', name: 'Coding–decoding', psi: 5, sec: { psi: 'A' }, hrs: 2 });
  T({ id: 'r_blood', group: 'Reasoning', name: 'Blood relations', psi: 4, sec: { psi: 'A' }, hrs: 2 });
  T({ id: 'r_direction', group: 'Reasoning', name: 'Directions & distance', psi: 4, sec: { psi: 'A' }, hrs: 1.5 });
  T({ id: 'r_order', group: 'Reasoning', name: 'Ranking, seating & puzzles', psi: 8, sec: { psi: 'A' }, hrs: 5 });
  T({ id: 'r_logic', group: 'Reasoning', name: 'Syllogism & statements', psi: 7, sec: { psi: 'A' }, hrs: 3 });
  T({ id: 'r_calendar', group: 'Reasoning', name: 'Calendar & clocks', psi: 4, sec: { psi: 'A' }, hrs: 3 });
  T({ id: 'r_di', group: 'Reasoning', name: 'Data interpretation — tables & charts', psi: 8, sec: { psi: 'A' }, hrs: 4, pre: ['m_percent'] });

  // ── English ── CDS English (100) · PSI Paper 2 English (~35)
  T({ id: 'e_grammar', group: 'English', name: 'Grammar & error spotting', psi: 5, cds: 30, sec: { psi: 'W', cds: 'E' }, hrs: 10, metro: true });
  T({ id: 'e_vocab', group: 'English', name: 'Vocabulary — synonyms & antonyms', psi: 0, cds: 20, sec: { cds: 'E' }, hrs: 8, metro: true });
  T({ id: 'e_idioms', group: 'English', name: 'Idioms & one-word substitution', psi: 0, cds: 10, sec: { cds: 'E' }, hrs: 4, metro: true });
  T({ id: 'e_reading', group: 'English', name: 'Reading comprehension & ordering', psi: 10, cds: 40, sec: { psi: 'W', cds: 'E' }, hrs: 15 });
  T({ id: 'e_writing', group: 'Writing', name: 'English précis & Gujarati→English translation', psi: 20, sec: { psi: 'W' }, hrs: 5 });

  // ── Gujarati writing ── PSI Paper 2 (~65)
  T({ id: 'w_essay', group: 'Writing', name: 'Gujarati essay (350 words)', psi: 30, sec: { psi: 'W' }, hrs: 8 });
  T({ id: 'w_letter', group: 'Writing', name: 'Gujarati letter & report writing', psi: 20, sec: { psi: 'W' }, hrs: 5 });
  T({ id: 'w_precis', group: 'Writing', name: 'Gujarati précis & comprehension', psi: 15, sec: { psi: 'W' }, hrs: 4 });

  // ── General Studies ── PSI Part B (100) · CDS GK (100)
  T({ id: 'g_polity', group: 'GS', name: 'Constitution & polity', psi: 18, cds: 12, sec: { psi: 'B', cds: 'G' }, hrs: 8, metro: true });
  T({ id: 'p_admin', group: 'Gujarat', name: 'Public administration, Gujarat govt & police', psi: 7, sec: { psi: 'B' }, hrs: 3, metro: true, pre: ['g_polity'] });
  T({ id: 'g_hist_modern', group: 'GS', name: 'Modern India & freedom struggle', psi: 5, cds: 10, sec: { psi: 'B', cds: 'G' }, hrs: 6, metro: true });
  T({ id: 'g_hist_ancient', group: 'GS', name: 'Ancient & medieval India', psi: 3, cds: 8, sec: { psi: 'B', cds: 'G' }, hrs: 6, metro: true });
  T({ id: 'g_geo', group: 'GS', name: 'Geography — India & world', psi: 4, cds: 14, sec: { psi: 'B', cds: 'G' }, hrs: 7, metro: true });
  T({ id: 'p_guj_hist', group: 'Gujarat', name: 'Gujarat history & cultural heritage', psi: 10, sec: { psi: 'B' }, hrs: 5, metro: true });
  T({ id: 'p_guj_geo', group: 'Gujarat', name: 'Gujarat geography & economy', psi: 3, sec: { psi: 'B' }, hrs: 3, metro: true });
  T({ id: 'g_physics', group: 'GS', name: 'Physics basics', psi: 3, cds: 8, sec: { psi: 'B', cds: 'G' }, hrs: 4, metro: true });
  T({ id: 'g_chem', group: 'GS', name: 'Chemistry basics', psi: 3, cds: 6, sec: { psi: 'B', cds: 'G' }, hrs: 3, metro: true });
  T({ id: 'g_bio', group: 'GS', name: 'Biology & health', psi: 4, cds: 8, sec: { psi: 'B', cds: 'G' }, hrs: 4, metro: true });
  T({ id: 'g_econ', group: 'GS', name: 'Economy basics', psi: 7, cds: 6, sec: { psi: 'B', cds: 'G' }, hrs: 4, metro: true });
  T({ id: 'g_env', group: 'GS', name: 'Environment & ecology', psi: 5, cds: 4, sec: { psi: 'B', cds: 'G' }, hrs: 3, metro: true });
  T({ id: 'g_tech', group: 'GS', name: 'Science & technology, space', psi: 3, cds: 2, sec: { psi: 'B', cds: 'G' }, hrs: 2, metro: true });
  T({ id: 'g_defence', group: 'GS', name: 'Defence GK', psi: 0, cds: 6, sec: { cds: 'G' }, hrs: 3, metro: true });
  T({ id: 'g_static', group: 'GS', name: 'Static GK — firsts, bodies, sports, days', psi: 8, cds: 6, sec: { psi: 'B', cds: 'G' }, hrs: 4, metro: true });
  T({ id: 'g_current', group: 'GS', name: 'Current affairs (system, not facts)', psi: 17, cds: 10, sec: { psi: 'B', cds: 'G' }, hrs: 30, metro: true, fromLog: 'ca',
    note: 'Facts here go stale. The app teaches the method; log your daily 10–15 min reading under Me → Outside study.' });
})(typeof window !== 'undefined' ? window : globalThis);
