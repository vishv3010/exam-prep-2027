/**
 * GOAL — core engine.
 *
 * Everything here is plain data + pure-ish functions so it runs in the browser
 * and in node (scripts/check.js) without a DOM.
 *
 *   topic()   registers a syllabus topic with its estimated marks in each exam
 *   add()     appends content items (learn / mcq / flash / task) to a topic
 *   build()   turns (place, minutes) into an ordered session queue
 *   grade()   updates spaced-repetition state after an answer
 *   project() estimates exam score from mastery, topic by topic
 */
(function (root) {
  'use strict';

  var G = root.GOAL = root.GOAL || {};

  // ---------------------------------------------------------------- exams
  // Marks are out of 300 for both exams so a mark is worth the same everywhere.
  // PSI: Paper 1 (200 MCQ) + Paper 2 (100 descriptive). CDS (IMA/INA/AFA): Eng + GK + Maths.
  G.EXAMS = {
    psi: {
      name: 'Gujarat PSI', total: 300, target: 180,
      sections: [
        { id: 'A', name: 'Paper 1 · Part A (Reasoning + Quant)', max: 100, min: 40 },
        { id: 'B', name: 'Paper 1 · Part B (GS)', max: 100, min: 40 },
        { id: 'W', name: 'Paper 2 · Gujarati + English writing', max: 100, min: 0 }
      ],
      rules: '+1 right · −0.25 wrong · −0.25 for a BLANK row · Option E ("Not attempted") = 0'
    },
    cds: {
      name: 'CDS (IMA/INA/AFA)', total: 300, target: 135,
      sections: [
        { id: 'E', name: 'English', max: 100, min: 20 },
        { id: 'G', name: 'General Knowledge', max: 100, min: 20 },
        { id: 'M', name: 'Elementary Maths', max: 100, min: 20 }
      ],
      rules: '+1 right · −1/3 wrong · blank = 0 (skipping is free)'
    }
  };

  G.DATES = [
    { id: 'cds_apply_open', date: '2026-12-02', label: 'CDS I 2027 form opens (upsc.gov.in)' },
    { id: 'cds_apply_close', date: '2026-12-22', label: 'CDS I 2027 form closes — apply in week 1, all 4 entries' },
    { id: 'cds1', date: '2027-04-11', label: 'CDS I 2027 written' },
    { id: 'cds2', date: '2027-09-19', label: 'CDS II 2027 written (second shot)' }
  ];

  // Leitner intervals in days, index = box.
  var INTERVAL = [0, 1, 3, 7, 16, 35, 90];
  var STRENGTH = [0, 0.45, 0.6, 0.75, 0.88, 0.95, 1];

  G.topics = [];
  G.topicMap = {};
  G.itemMap = {};
  G.split = { psi: 0.55, cds: 0.45 };

  // ---------------------------------------------------------------- helpers
  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h.toString(36);
  }
  G.hash = hash;

  G.dayNum = function (d) {
    d = d || new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  };
  G.dayKey = function (n) {
    var d = new Date(n * 86400000);
    return d.toISOString().slice(0, 10);
  };
  G.daysUntil = function (iso) {
    var p = iso.split('-');
    return G.dayNum(new Date(+p[0], +p[1] - 1, +p[2])) - G.dayNum();
  };

  // ---------------------------------------------------------------- registry
  /**
   * t = { id, name, group, psi, cds, sec:{psi:'A',cds:'M'}, hrs, metro, pre:[ids], note }
   * psi / cds = estimated marks (out of 300) this topic is worth in each exam.
   * hrs = rough hours for a beginner to reach "can score most of these marks".
   */
  G.topic = function (t) {
    t.psi = t.psi || 0;
    t.cds = t.cds || 0;
    t.pre = t.pre || [];
    t.sec = t.sec || {};
    t.seq = [];
    t.psiFrac = (t.psi + t.cds) ? t.psi / (t.psi + t.cds) : 0.5;
    G.topics.push(t);
    G.topicMap[t.id] = t;
    return t;
  };

  // Paper 2 is only evaluated if you clear 40% in both parts of Paper 1, so its marks are
  // worth less until then — writing never outranks the MCQ base.
  G.weight = function (t) {
    var psi = t.sec.psi === 'W' ? t.psi * 0.6 : t.psi;
    return (G.split.psi * psi + G.split.cds * t.cds);
  };
  G.roi = function (t) {
    return G.weight(t) / Math.max(t.hrs || 1, 0.5);
  };

  function textOf(it) {
    return it.type + '|' + (it.q || it.front || it.title || it.prompt || '');
  }

  /** Append items to a topic, in study order. Correct option is always written first. */
  G.add = function (topicId, list) {
    var t = G.topicMap[topicId];
    if (!t) throw new Error('Unknown topic ' + topicId);
    list.forEach(function (it) {
      it.topic = topicId;
      if (!it.id) it.id = topicId + ':' + hash(textOf(it));
      if (G.itemMap[it.id]) { it.id += '~' + t.seq.length; }
      if (it.type === 'mcq' && it.a == null) it.a = 0;
      t.seq.push(it);
      G.itemMap[it.id] = it;
    });
  };

  // Item constructors used by content files.
  G.L = function (title, body, ex) { return { type: 'learn', title: title, body: body, ex: ex || '' }; };
  G.Q = function (q, o, why, opt) {
    var it = { type: 'mcq', q: q, o: o, why: why || '' };
    if (opt) for (var k in opt) it[k] = opt[k];
    return it;
  };
  G.F = function (front, back, opt) {
    var it = { type: 'flash', front: front, back: back };
    if (opt) for (var k in opt) it[k] = opt[k];
    return it;
  };
  G.T = function (kind, prompt, opt) {
    var it = { type: 'task', kind: kind, prompt: prompt, min: 20 };
    if (opt) for (var k in opt) it[k] = opt[k];
    return it;
  };

  G.gradable = function (it) { return it.type === 'mcq' || it.type === 'flash'; };

  // ---------------------------------------------------------------- state
  G.blank = function () {
    return {
      v: 2,
      items: {},       // id -> { b: box, d: due day, n: seen, c: right, w: wrong, l: last day }
      seen: {},        // learn-card id -> day first seen
      days: {},        // 'YYYY-MM-DD' -> { m, psi, cds, n }
      frontier: {},    // place -> topic id
      tmin: {},        // topic id -> minutes spent
      pin: null,       // topic id the user chose on the Map
      tasks: [],       // { id, day, min, score, max }
      mocks: [],       // { exam, day, score, max, right, wrong, blank, secs }
      runs: [],        // { day, km, min }
      outside: [],     // { day, kind, min }
      prefs: { place: 'desk', mins: 10, weekly: 300, floor: 5, split: 55 }
    };
  };

  G.migrate = function (s) {
    var b = G.blank();
    if (!s || typeof s !== 'object') return b;
    for (var k in b) if (s[k] == null) s[k] = b[k];
    for (var p in b.prefs) if (s.prefs[p] == null) s.prefs[p] = b.prefs[p];
    return s;
  };

  G.applyPrefs = function (S) {
    var p = Math.min(80, Math.max(20, +S.prefs.split || 55)) / 100;
    G.split = { psi: p, cds: 1 - p };
  };

  // ---------------------------------------------------------------- mastery
  G.strength = function (S, it) {
    var st = S.items[it.id];
    if (!st || !st.n) return 0;
    var s = STRENGTH[Math.min(st.b, STRENGTH.length - 1)];
    // Overdue memories fade a little until reviewed.
    var late = G.dayNum() - st.d;
    if (late > 0) s *= Math.max(0.6, 1 - late / (INTERVAL[st.b] * 4 + 8));
    return s;
  };

  /** 0..1 — how much of this topic's marks you would take if the exam were today. */
  G.mastery = function (S, t) {
    var g = t.seq.filter(G.gradable);
    var tasks = t.seq.filter(function (x) { return x.type === 'task'; });
    if (!g.length && !tasks.length) return 0;
    var m = 0;
    if (g.length) {
      var sum = 0;
      g.forEach(function (it) { sum += G.strength(S, it); });
      m = sum / g.length;
    }
    if (tasks.length) {
      // Writing: quality of your last few self-scored tasks, ramped by practice volume.
      var done = S.tasks.filter(function (x) { return x.topic === t.id; }).slice(-5);
      var tm = 0;
      if (done.length) {
        var q = done.reduce(function (a, x) { return a + x.score / x.max; }, 0) / done.length;
        tm = q * Math.min(1, done.length / 4);
      }
      m = g.length ? 0.35 * m + 0.65 * tm : tm;
    }
    if (t.fromLog) {
      // Current affairs: credit logged reading over the last 60 days (10 h ≈ 60% of these marks).
      var since = G.dayNum() - 60, mins = 0;
      S.outside.forEach(function (o) { if (o.kind === t.fromLog && o.day >= since) mins += o.min; });
      m = 0.1 * m + 0.9 * Math.min(0.6, mins / 1000);
    }
    return m;
  };

  /**
   * Readiness = memory strength, held back by time actually spent on the topic (knowing 15
   * app questions is not the same as owning a topic) and by a transfer factor for unseen
   * exam-style questions. This is what the projection uses — deliberately conservative.
   */
  G.readiness = function (S, t) {
    var m = G.mastery(S, t);
    if (!m) return 0;
    if (t.fromLog) return m;
    var spent = (S.tmin && S.tmin[t.id]) || 0;
    var ramp = Math.min(1, 0.3 + 0.7 * spent / ((t.hrs || 3) * 60));
    return m * ramp * 0.85;
  };

  G.coverage = function (S, t) {
    var all = t.seq.length;
    if (!all) return 0;
    var seen = 0;
    t.seq.forEach(function (it) {
      if (it.type === 'learn' ? S.seen[it.id] : it.type === 'task'
        ? S.tasks.some(function (x) { return x.id === it.id; })
        : (S.items[it.id] && S.items[it.id].n)) seen++;
    });
    return seen / all;
  };

  G.project = function (S) {
    var out = { psi: { total: 0, sec: {} }, cds: { total: 0, sec: {} } };
    G.topics.forEach(function (t) {
      var m = G.readiness(S, t);
      ['psi', 'cds'].forEach(function (e) {
        if (!t[e]) return;
        var v = t[e] * m;
        out[e].total += v;
        var sid = t.sec[e];
        out[e].sec[sid] = (out[e].sec[sid] || 0) + v;
      });
    });
    return out;
  };

  // ---------------------------------------------------------------- places
  // metro: standing, one hand, no pen.  desk: office, quiet, maybe paper.  free: home, pen + paper.
  G.PLACES = {
    metro: { name: 'Metro', hint: 'Standing · one hand · no pen' },
    desk: { name: 'Desk', hint: 'Office · quiet · short gaps' },
    free: { name: 'Free', hint: 'Home / weekend · pen + paper' }
  };

  G.itemFits = function (it, place) {
    var t = G.topicMap[it.topic];
    if (it.type === 'task') return false; // tasks are added explicitly, never mixed in
    if (place !== 'metro') return true;
    if (it.type === 'flash' || it.type === 'learn') return true;
    return !!(t.metro || it.mental);
  };

  G.topicFits = function (t, place) {
    return place === 'metro' ? !!t.metro : true;
  };

  G.cost = function (it) {
    if (it.type === 'learn') return 0.8 + ((it.body || '').length + (it.ex || '').length) / 700;
    if (it.type === 'flash') return 0.3;
    if (it.type === 'task') return it.min;
    var t = G.topicMap[it.topic];
    return (it.pen || (!t.metro && !it.mental)) ? 1.4 : 0.6;
  };

  function isSeen(S, it) {
    if (it.type === 'learn') return !!S.seen[it.id];
    if (it.type === 'task') return S.tasks.some(function (x) { return x.id === it.id; });
    return !!(S.items[it.id] && S.items[it.id].n);
  }

  function unseenFor(S, t, place) {
    return t.seq.filter(function (it) { return !isSeen(S, it) && G.itemFits(it, place); });
  }

  function prereqOk(S, t) {
    return t.pre.every(function (p) {
      var pt = G.topicMap[p];
      return !pt || G.coverage(S, pt) >= 0.6 || G.mastery(S, pt) >= 0.35;
    });
  }

  /** Effort split over the last 7 days: fraction of minutes that counted toward PSI. */
  G.recentSplit = function (S) {
    var today = G.dayNum(), psi = 0, cds = 0;
    for (var i = 0; i < 7; i++) {
      var d = S.days[G.dayKey(today - i)];
      if (d) { psi += d.psi || 0; cds += d.cds || 0; }
    }
    var tot = psi + cds;
    return { psi: tot ? psi / tot : null, minutes: tot };
  };

  /** Rank topics for a place: marks-per-hour, nudged toward the 55/45 split, gated by prerequisites. */
  G.rank = function (S, place) {
    var rs = G.recentSplit(S);
    var deficit = rs.psi == null ? 0 : Math.max(-0.2, Math.min(0.2, G.split.psi - rs.psi));
    return G.topics
      .filter(function (t) { return G.topicFits(t, place) && prereqOk(S, t) && unseenFor(S, t, place).length; })
      .map(function (t) {
        var score = G.roi(t) * (1 + deficit * 5 * (t.psiFrac - 0.5) * 2);
        // Use each place for what it is best at: facts in the metro, maths/reasoning at a desk.
        if (place !== 'metro' && t.metro) score *= 0.75;
        return { t: t, score: score };
      })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (x) { return x.t; });
  };

  G.pickTopic = function (S, place, skip) {
    skip = skip || {};
    var pin = S.pin && G.topicMap[S.pin];
    if (pin && !skip[pin.id] && G.topicFits(pin, place) && unseenFor(S, pin, place).length) return pin;
    var cur = S.frontier[place] && G.topicMap[S.frontier[place]];
    if (cur && !skip[cur.id] && unseenFor(S, cur, place).length) return cur;
    var r = G.rank(S, place).filter(function (t) { return !skip[t.id]; });
    return r[0] || null;
  };

  G.due = function (S, place) {
    var today = G.dayNum();
    var out = [];
    for (var id in S.items) {
      var st = S.items[id], it = G.itemMap[id];
      if (!it || !st.n || st.d > today || !G.itemFits(it, place)) continue;
      out.push(it);
    }
    return out.sort(function (a, b) {
      var sa = S.items[a.id], sb = S.items[b.id];
      return (sa.d - sb.d) || (sa.b - sb.b);
    });
  };

  /**
   * Build a session. Reviews first (quick wins + retention), then new material from the
   * frontier topic in authored order, with reviews sprinkled in so it never feels like a wall.
   */
  G.build = function (S, place, minutes, opts) {
    opts = opts || {};
    var budget = minutes;
    var reviews = [], fresh = [], used = 0, topicsUsed = [];
    var due = G.due(S, place);
    // A growing review pile gets a bigger share, so it never snowballs.
    var share = due.length > 60 ? 0.75 : due.length > 25 ? 0.55 : 0.4;
    var reviewCap = minutes <= 3 ? budget : budget * share;

    while (due.length && used < reviewCap) {
      var r = due.shift();
      reviews.push(r);
      used += G.cost(r);
    }

    var skip = {};
    var guard = 0;
    while (used < budget && guard++ < 12) {
      var t = opts.topic ? G.topicMap[opts.topic] : G.pickTopic(S, place, skip);
      if (!t) break;
      var list = unseenFor(S, t, place);
      if (minutes <= 3) list = list.filter(function (x) { return x.type !== 'learn' || G.cost(x) < 1.3; });
      if (!list.length) { skip[t.id] = 1; if (opts.topic) break; continue; }
      topicsUsed.push(t.id);
      for (var i = 0; i < list.length && used < budget; i++) {
        fresh.push(list[i]);
        used += G.cost(list[i]);
      }
      skip[t.id] = 1;
      if (opts.topic) break;
    }

    // Nothing new fits (e.g. metro with everything seen): top up with more reviews, then weakest items.
    while (due.length && used < budget) { var r2 = due.shift(); reviews.push(r2); used += G.cost(r2); }
    if (used < budget * 0.5) {
      var weak = [];
      for (var id in S.items) {
        var it = G.itemMap[id];
        if (it && S.items[id].n && G.itemFits(it, place) && reviews.indexOf(it) < 0) weak.push(it);
      }
      weak.sort(function (a, b) { return G.strength(S, a) - G.strength(S, b); });
      while (weak.length && used < budget) { var w = weak.shift(); reviews.push(w); used += G.cost(w); }
    }

    // Interleave: 2 warm-up reviews, then 3 new : 1 review.
    var q = reviews.splice(0, 2);
    var n = 0;
    fresh.forEach(function (it) {
      q.push(it);
      if (++n % 3 === 0 && reviews.length) q.push(reviews.shift());
    });
    q = q.concat(reviews);

    if (opts.task) { q.push(opts.task); used += opts.task.min; }

    return { place: place, minutes: minutes, queue: q, est: used, topics: topicsUsed, nReview: q.filter(function (x) { return isSeen(S, x); }).length };
  };

  /** Writing task suggestion: one per week, the least-practised kind first. */
  G.nextTask = function (S, maxMin) {
    var all = [];
    G.topics.forEach(function (t) { t.seq.forEach(function (it) { if (it.type === 'task' && it.min <= maxMin) all.push(it); }); });
    if (!all.length) return null;
    var count = {};
    S.tasks.forEach(function (x) { count[x.topic] = (count[x.topic] || 0) + 1; });
    all.sort(function (a, b) {
      var da = S.tasks.some(function (x) { return x.id === a.id; }) ? 1 : 0;
      var db = S.tasks.some(function (x) { return x.id === b.id; }) ? 1 : 0;
      return (da - db) || ((count[a.topic] || 0) - (count[b.topic] || 0)) || (G.weight(G.topicMap[b.topic]) - G.weight(G.topicMap[a.topic]));
    });
    return all[0];
  };

  // ---------------------------------------------------------------- grading
  /** ok: true / false. Returns the new box. */
  G.grade = function (S, it, ok) {
    var today = G.dayNum();
    var st = S.items[it.id] || { b: 0, d: today, n: 0, c: 0, w: 0 };
    var isNew = !st.n;
    if (ok) st.b = isNew ? 2 : Math.min(st.b + 1, INTERVAL.length - 1);
    else st.b = 1;
    st.d = today + INTERVAL[st.b];
    st.n++;
    st[ok ? 'c' : 'w']++;
    st.l = today;
    S.items[it.id] = st;
    return st.b;
  };

  G.markSeen = function (S, it) {
    if (!S.seen[it.id]) S.seen[it.id] = G.dayNum();
  };

  /** Credit study minutes to today, split by how much the topic counts for each exam. */
  G.logTime = function (S, topicId, minutes) {
    if (!(minutes > 0)) return;
    var t = G.topicMap[topicId];
    var k = G.dayKey(G.dayNum());
    var d = S.days[k] || (S.days[k] = { m: 0, psi: 0, cds: 0, n: 0 });
    var f = t ? t.psiFrac : 0.5;
    if (t) { S.tmin = S.tmin || {}; S.tmin[t.id] = (S.tmin[t.id] || 0) + minutes; }
    d.m += minutes;
    d.psi += minutes * f;
    d.cds += minutes * (1 - f);
  };

  G.countCard = function (S) {
    var k = G.dayKey(G.dayNum());
    var d = S.days[k] || (S.days[k] = { m: 0, psi: 0, cds: 0, n: 0 });
    d.n++;
  };

  // ---------------------------------------------------------------- streak & week
  G.dayMinutes = function (S, n) {
    var d = S.days[G.dayKey(n)];
    var m = d ? d.m : 0;
    S.outside.forEach(function (o) { if (o.day === n) m += o.min; });
    return m;
  };

  /** "Miss a day, never miss two": one empty day is forgiven, two in a row break it. */
  G.streak = function (S) {
    var today = G.dayNum(), floor = S.prefs.floor, n = 0, gap = 0;
    var start = G.dayMinutes(S, today) >= floor ? today : today - 1;
    for (var d = start; d > today - 400; d--) {
      if (G.dayMinutes(S, d) >= floor) { n++; gap = 0; }
      else if (++gap >= 2) break;
    }
    return n;
  };

  G.weekStart = function () {
    var d = new Date();
    var dow = (d.getDay() + 6) % 7; // Monday = 0
    return G.dayNum() - dow;
  };

  G.weekMinutes = function (S) {
    var s = G.weekStart(), m = 0;
    for (var d = s; d <= G.dayNum(); d++) m += G.dayMinutes(S, d);
    return m;
  };

  G.weekHas = function (list, pred) {
    var s = G.weekStart();
    return list.some(function (x) { return x.day >= s && (!pred || pred(x)); });
  };

  // ---------------------------------------------------------------- mocks
  /**
   * exam: 'psi' | 'cds'; part: optional section id. Picks MCQs weighted by marks so the mix
   * looks like the real paper, preferring topics you have started (a mock of pure unknowns
   * just measures zero).
   */
  G.buildMock = function (S, exam, n, part, rnd) {
    rnd = rnd || Math.random;
    var pool = [];
    G.topics.forEach(function (t) {
      if (!t[exam]) return;
      if (part && t.sec[exam] !== part) return;
      if (exam === 'psi' && t.sec.psi === 'W') return; // Paper 2 is descriptive — not in the MCQ paper
      var mcqs = t.seq.filter(function (x) { return x.type === 'mcq'; });
      if (!mcqs.length) return;
      var started = G.coverage(S, t) > 0 ? 1 : 0.35;
      pool.push({ t: t, items: mcqs.slice(), w: t[exam] * started });
    });
    var out = [];
    while (out.length < n && pool.length) {
      var tot = pool.reduce(function (a, p) { return a + p.w; }, 0);
      var r = rnd() * tot, pick = pool[0];
      for (var i = 0; i < pool.length; i++) { r -= pool[i].w; if (r <= 0) { pick = pool[i]; break; } }
      var j = Math.floor(rnd() * pick.items.length);
      out.push(pick.items.splice(j, 1)[0]);
      if (!pick.items.length) pool.splice(pool.indexOf(pick), 1);
    }
    return out;
  };

  /** answers[i]: option index (in item order), 'E' (PSI not attempted), or null (blank). */
  G.scoreMock = function (exam, items, answers) {
    var right = 0, wrong = 0, blank = 0, e = 0;
    items.forEach(function (it, i) {
      var a = answers[i];
      if (a === 'E') e++;
      else if (a == null) blank++;
      else if (a === it.a) right++;
      else wrong++;
    });
    var score = exam === 'psi'
      ? right - 0.25 * wrong - 0.25 * blank
      : right - wrong / 3;
    return { right: right, wrong: wrong, blank: blank, e: e, score: Math.round(score * 100) / 100, max: items.length };
  };

  if (typeof module !== 'undefined') module.exports = G;
})(typeof window !== 'undefined' ? window : globalThis);
