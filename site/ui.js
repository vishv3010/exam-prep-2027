/**
 * GOAL — interface. A study tracker (Today · Syllabus · Progress) plus practice
 * runners (quick quiz, mini mock, Paper 2 writing). State lives in localStorage; export it from Me.
 */
(function () {
  'use strict';
  var G = window.GOAL;
  var KEY = 'goal.v2';
  var ov = document.getElementById('overlay');
  var S = load();
  G.applyPrefs(S);

  function load() {
    try { return G.migrate(JSON.parse(localStorage.getItem(KEY))); } catch (e) { return G.blank(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Could not save — storage is full or blocked'); }
  }
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}

  // ------------------------------------------------------------- helpers
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
  function md(s) {
    var out = [], list = null;
    String(s || '').split('\n').forEach(function (line) {
      var m = line.match(/^\s*(?:- |(\d+)\. )(.*)$/);
      if (m) {
        var tag = m[1] ? 'ol' : 'ul';
        if (!list || list.tag !== tag) { if (list) out.push('</' + list.tag + '>'); list = { tag: tag }; out.push('<' + tag + '>'); }
        out.push('<li>' + inline(m[2]) + '</li>');
      } else {
        if (list) { out.push('</' + list.tag + '>'); list = null; }
        if (line.trim()) out.push('<p>' + inline(line) + '</p>');
      }
    });
    if (list) out.push('</' + list.tag + '>');
    return out.join('');
  }
  function fmtMin(m) {
    m = Math.round(m || 0);
    if (m < 60) return m + 'm';
    return Math.floor(m / 60) + 'h' + (m % 60 ? ' ' + (m % 60) + 'm' : '');
  }
  function clock(sec) {
    sec = Math.max(0, Math.round(sec));
    return Math.floor(sec / 60) + ':' + ('0' + (sec % 60)).slice(-2);
  }
  function r1(x) { return Math.round(x * 10) / 10; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function hasGu(s) { return /[઀-૿]/.test(s || ''); }
  function gu(s) { return hasGu(s) ? '<span class="gu">' + inline(s) + '</span>' : inline(s); }
  function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }

  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.className = 'show';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = ''; }, 2600);
  }

  var IC = {
    metro: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l2-4M15 21l-2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/></svg>',
    desk: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    free: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
    now: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3 5 13h6l-1 8 8-10h-6z"/></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    test: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/></svg>',
    me: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',
    flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };

  IC.today = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="1.5"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  IC.syllabus = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01" stroke-width="3"/></svg>';
  IC.practice = IC.test;
  IC.progress = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>';

  // ------------------------------------------------------------- shell
  var TABS = [['today', 'Today'], ['syllabus', 'Syllabus'], ['practice', 'Practice'], ['progress', 'Progress']];
  var lastTab = null;
  function tab() {
    var h = (location.hash || '#today').slice(1);
    return TABS.some(function (t) { return t[0] === h; }) ? h : 'today';
  }
  function renderTabs() {
    var cur = tab();
    document.getElementById('tabs').innerHTML = TABS.map(function (t) {
      return '<a href="#' + t[0] + '" class="' + (t[0] === cur ? 'on' : '') + '" aria-current="' + (t[0] === cur ? 'page' : 'false') + '">' + IC[t[0]] + '<span>' + t[1] + '</span></a>';
    }).join('');
  }
  function render() {
    renderTabs();
    var cur = tab();
    var v = { today: viewToday, syllabus: viewSyllabus, practice: viewPractice, progress: viewProgress }[cur];
    document.getElementById('app').innerHTML = v();
    if (cur !== lastTab) window.scrollTo(0, 0);
    lastTab = cur;
  }
  window.addEventListener('hashchange', function () {
    if (ov.classList.contains('sheet-mode')) { ov.className = ''; ov.innerHTML = ''; document.body.classList.remove('locked'); }
    render();
  });

  // ------------------------------------------------------------- shared bits
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function dayLabel(n) { var d = new Date(n * 86400000); return DOW[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MON[d.getUTCMonth()]; }
  function dayShort(n) { var d = new Date(n * 86400000); return d.getUTCDate() + ' ' + MON[d.getUTCMonth()]; }
  function rel(n) {
    var k = n - G.dayNum();
    return k === 0 ? 'today' : k === -1 ? 'yesterday' : k < 0 ? (-k) + 'd overdue' : k === 1 ? 'tomorrow' : 'in ' + k + 'd';
  }
  function marks(t) {
    return (t.psi ? '<i class="psi">PSI ' + t.psi + '</i>' : '') + (t.cds ? '<i class="cds">CDS ' + t.cds + '</i>' : '');
  }

  function head(title, sub) {
    var streak = G.streak(S);
    return '<header class="top"><div class="brand">' + title + '<span>' + sub + '</span></div>' +
      '<div class="pills"><span class="pill' + (streak ? ' lit' : '') + '" title="Day streak">' + IC.flame + '<b class="mono">' + streak + '</b></span>' +
      '<span class="pill mono" title="Days to CDS I 2027">CDS I · ' + G.daysUntil('2027-04-11') + 'd</span></div></header>';
  }

  function dateBanner() {
    var next = G.DATES.map(function (d) { return { d: d, n: G.daysUntil(d.date) }; })
      .filter(function (x) { return x.n >= 0; })
      .sort(function (a, b) { return a.n - b.n; })[0];
    var out = '';
    if (new Date().getDate() <= 3) out += '<div class="banner psi"><b>1st of the month:</b> check <a href="https://gprb.gujarat.gov.in" target="_blank" rel="noopener">gprb.gujarat.gov.in</a> and <a href="https://ojas.gujarat.gov.in" target="_blank" rel="noopener">ojas.gujarat.gov.in</a> for the PSI notification.</div>';
    if (next && next.n <= 120) out += '<div class="banner cds"><span class="mono">' + (next.n === 0 ? 'TODAY' : next.n + 'd') + '</span> ' + esc(next.d.label) + '</div>';
    return out;
  }

  var GROUPS = ['Maths', 'Reasoning', 'English', 'Writing', 'GS', 'Gujarat'];
  function topicSelect(sel) {
    return '<select name="topic" class="sel" aria-label="Topic"><option value="">Topic…</option>' + GROUPS.map(function (g) {
      return '<optgroup label="' + g + '">' + G.topics.filter(function (t) { return t.group === g; }).map(function (t) {
        return '<option value="' + t.id + '"' + (t.id === sel ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('') + '</optgroup>';
    }).join('') + '</select>';
  }

  // UI-only choices (not saved)
  var KINDS = { learn: 'Study + notes', revise: 'Revision', pyq: 'Past paper / practice', ca: 'Current affairs' };
  var ui = { kind: 'learn', min: 30, topic: '', filter: 'all' };
  function chipRow(group, list, cur, cls) {
    return '<div class="chips ' + (cls || 'sm') + '">' + list.map(function (x) {
      return '<button type="button" class="chip' + (String(x[0]) === String(cur) ? ' on' : '') + '" data-act="pickChip" data-g="' + group + '" data-v="' + x[0] + '">' + x[1] + '</button>';
    }).join('') + '</div>';
  }

  // ------------------------------------------------------------- TODAY
  function viewToday() {
    var today = G.dayNum();
    var due = G.dueRevisions(S);
    var next = G.nextToLearn(S, 3);
    var todays = S.log.filter(function (l) { return l.day === today; });
    var tmin = G.dayMinutes(S, today), week = G.weekMinutes(S);

    var howto = S.log.length ? '' :
      '<section class="card"><h2>How to use this</h2><ol class="steps-ol">' +
      '<li>Study from your book and <b>make notes on paper</b>.</li>' +
      '<li><b>Log it here</b> — topic, minutes. Keeps your streak and your week honest.</li>' +
      '<li>When a topic’s notes are complete, mark <b>Notes made</b> in Syllabus. The app then tells you when to revise it: after 3, 7, 21 and 45 days.</li>' +
      '<li>Sit real mocks and past papers; enter the scores in Progress.</li></ol></section>';

    return head(dayLabel(today), 'PSI ' + S.prefs.split + ' · CDS ' + (100 - S.prefs.split)) + dateBanner() + howto +
      '<section class="card"><h2>Log study</h2><form data-form="log" class="logf">' + topicSelect(ui.topic) +
      chipRow('kind', Object.keys(KINDS).map(function (k) { return [k, KINDS[k]]; }), ui.kind, 'sm kinds') +
      chipRow('min', [[15, '15'], [30, '30'], [45, '45'], [60, '60'], [90, '90'], [120, '120']], ui.min, 'mins') +
      '<input name="note" class="txt" placeholder="Note — book, chapter, pages (optional)" maxlength="140" autocomplete="off">' +
      '<button class="go" id="logBtn">Log ' + ui.min + ' min</button></form></section>' +

      '<section class="card"><h2>Revise today <small class="unit">' + due.length + ' due</small></h2>' +
      (due.length ? '<ul class="list">' + due.map(function (x) {
        var tr = G.track(S, x.t.id);
        return '<li><button class="lrow" data-act="topic" data-v="' + x.t.id + '"><b>' + esc(x.t.name) + '</b><small>' + G.STAGES[tr.stage] + ' · <span class="' + (x.due < today ? 'late' : '') + '">' + rel(x.due) + '</span>' + (tr.src ? ' · ' + esc(tr.src) : '') + '</small></button>' +
          '<button class="btn sm" data-act="revised" data-v="' + x.t.id + '">Done</button></li>';
      }).join('') + '</ul>'
        : '<p class="empty">Nothing due. Revisions show up here once you mark a topic’s notes as made.</p>') + '</section>' +

      '<section class="card"><h2>Next to learn</h2><ul class="list">' + next.map(function (t) {
        var st = G.track(S, t.id).stage;
        return '<li><button class="lrow" data-act="topic" data-v="' + t.id + '"><b>' + esc(t.name) + '</b><small class="tm">' + marks(t) + '<i>~' + t.hrs + ' h</i>' + (st === 1 ? '<i>in progress</i>' : '') + '</small></button></li>';
      }).join('') + '</ul><p class="fine">Most marks per hour among topics without finished notes.</p></section>' +

      '<section class="card"><h2>Today <small class="unit">' + fmtMin(tmin) + '</small></h2>' +
      (todays.length ? '<ul class="list">' + todays.map(logRow).join('') + '</ul>' : '<p class="empty">Nothing logged yet. 15 minutes counts.</p>') +
      '<div class="wk"><span>This week</span><span class="mono">' + fmtMin(week) + ' / ' + fmtMin(S.prefs.weekly) + '</span></div>' +
      '<div class="bar thin"><i style="width:' + Math.min(100, week / S.prefs.weekly * 100) + '%"></i></div>' +
      '<ul class="checks">' +
      check(G.weekHas(S.mocks) || G.weekHas(S.scores), 'One mock or past paper', 'Score it in Progress', 'progress') +
      check(G.weekHas(S.tasks), 'One Paper 2 writing task', 'Practice tab · pen + paper', 'practice') +
      check(G.weekHas(S.runs), 'One 5 km time trial', 'PET: 25:00 to qualify', 'progress') +
      '</ul></section>';
  }
  function logRow(l) {
    var t = G.topicMap[l.topic];
    return '<li><span class="lrow static"><b>' + esc(t ? t.name : l.topic) + '</b><small>' + KINDS[l.kind] + ' · ' + fmtMin(l.min) + (l.note ? ' · ' + esc(l.note) : '') + '</small></span>' +
      '<button class="icon sm" data-act="unlog" data-v="' + S.log.indexOf(l) + '" aria-label="Delete entry">' + IC.x + '</button></li>';
  }
  function check(done, title, sub, href) {
    return '<li class="' + (done ? 'done' : '') + '"><a href="#' + href + '"><span class="box">' + (done ? '✓' : '') + '</span><span><b>' + title + '</b><small>' + sub + '</small></span></a></li>';
  }

  // ------------------------------------------------------------- SYLLABUS
  var FILTERS = [['all', 'All'], ['psi', 'PSI'], ['cds', 'CDS'], ['due', 'Due'], ['todo', 'Not started']];
  function viewSyllabus() {
    var cov = G.syllabusCoverage(S), today = G.dayNum(), f = ui.filter;
    var keep = function (t) {
      var tr = G.track(S, t.id), d = G.dueDay(tr);
      return f === 'all' || (f === 'psi' && t.psi) || (f === 'cds' && t.cds) || (f === 'due' && d != null && d <= today) || (f === 'todo' && tr.stage === 0);
    };
    return head('Syllabus', 'your notes, topic by topic') +
      '<section class="card"><div class="covg">' + ['psi', 'cds'].map(function (e) {
        return '<div class="' + e + '"><span class="tag">' + e.toUpperCase() + '</span><div><span class="big">' + cov[e].notes + '</span><span class="of mono"> / 300</span></div>' +
          '<div class="bar"><i style="width:' + cov[e].notes / 3 + '%"></i></div><small class="mono">marks with notes · ' + cov[e].rev + ' revised</small></div>';
      }).join('') + '</div></section>' +
      chipRow('filter', FILTERS, f, 'sm filt') +
      GROUPS.map(function (g) {
        var ts = G.topics.filter(function (t) { return t.group === g && keep(t); });
        return ts.length ? '<section class="card grp"><h3>' + g + '</h3>' + ts.map(trow).join('') + '</section>' : '';
      }).join('') || '<p class="empty">No topics match.</p>';
  }
  function trow(t) {
    var tr = G.track(S, t.id), due = G.dueDay(tr), today = G.dayNum();
    return '<button class="trow" data-act="topic" data-v="' + t.id + '"><span class="tn">' + esc(t.name) + '</span>' +
      '<span class="tm">' + marks(t) + '<i class="st">' + G.STAGES[tr.stage] + '</i>' + (due != null ? '<i class="' + (due <= today ? 'late' : '') + '">revise ' + rel(due) + '</i>' : '') + '</span>' +
      '<span class="steps">' + [1, 2, 3, 4, 5].map(function (k) { return '<i' + (tr.stage >= k ? ' class="on"' : '') + '></i>'; }).join('') + '</span></button>';
  }

  function openTopic(id) {
    var t = G.topicMap[id], tr = G.track(S, id), due = G.dueDay(tr);
    var learn = t.seq.filter(function (x) { return x.type === 'learn'; });
    var nq = t.seq.filter(function (x) { return x.type === 'mcq' || x.type === 'flash'; }).length;
    var hist = S.log.filter(function (l) { return l.topic === id; }).slice(-8).reverse();
    var mis = S.mistakes.filter(function (m) { return m.topic === id && !m.done; });
    sheet('<div class="sheet-h"><h2>' + esc(t.name) + '</h2><button class="icon" data-act="close" aria-label="Close">' + IC.x + '</button></div>' +
      '<div class="tm big">' + marks(t) + '<i>~' + t.hrs + ' h to learn</i><i>' + fmtMin((S.tmin || {})[id]) + ' logged</i></div>' +
      (t.note ? '<p class="fine">' + esc(t.note) + '</p>' : '') +
      '<h3>Status</h3><div class="stages">' + G.STAGES.map(function (s, k) {
        return '<button class="stg' + (k === tr.stage ? ' on' : k < tr.stage ? ' past' : '') + '" data-act="stage" data-id="' + id + '" data-v="' + k + '">' + s + '</button>';
      }).join('') + '</div>' +
      (due != null ? '<p class="fine">Next revision <b>' + rel(due) + '</b> · ' + dayLabel(due) + '</p><button class="go" data-act="revised" data-v="' + id + '">I revised it today</button>'
        : '<p class="fine">Mark <b>Notes made</b> when your notes are complete. Revisions are then scheduled after 3, 7, 21 and 45 days.</p>') +
      '<h3>Source</h3><input class="txt" data-src="' + id + '" value="' + esc(tr.src || '') + '" placeholder="Book + chapters, e.g. Laxmikanth ch. 1–8" maxlength="80">' +
      (mis.length ? '<h3>Open mistakes</h3><ul class="list">' + mis.map(function (m) { return '<li><span class="lrow static">' + esc(m.text) + '</span></li>'; }).join('') + '</ul>' : '') +
      (hist.length ? '<h3>History</h3><ul class="list">' + hist.map(function (l) {
        return '<li><span class="lrow static"><b class="mono">' + dayShort(l.day) + '</b><small>' + KINDS[l.kind] + ' · ' + fmtMin(l.min) + (l.note ? ' · ' + esc(l.note) : '') + '</small></span></li>';
      }).join('') + '</ul>' : '') +
      (nq ? '<div class="btns"><button class="btn wide" data-act="studyTopic" data-v="' + id + '">Quick quiz on this topic · ' + nq + ' cards</button></div>' : '') +
      (learn.length ? '<h3>Quick reference</h3>' + learn.map(function (l) {
        return '<details><summary>' + esc(l.title) + '</summary><div class="md">' + md(l.body) + (l.ex ? '<div class="ex">' + md(l.ex) + '</div>' : '') + '</div></details>';
      }).join('') : ''));
  }

  // ------------------------------------------------------------- PRACTICE
  var mockPart = { psi: '', cds: '' };
  var QMINS = [5, 10, 15, 20, 30];
  function placeFor(t) { return t.metro ? S.prefs.place : 'desk'; }
  function planFor(place, mins) {
    var s = G.build(S, place, mins);
    s.minutes = mins;
    return s;
  }

  function viewPractice() {
    var place = S.prefs.place === 'metro' ? 'metro' : 'desk';
    var mins = QMINS.indexOf(S.prefs.mins) >= 0 ? S.prefs.mins : 10;
    var next = G.nextTask(S, 60);
    var tasks = [];
    G.topics.forEach(function (t) { t.seq.forEach(function (it) { if (it.type === 'task') tasks.push(it); }); });
    var parts = { psi: [['', 'Mixed'], ['A', 'Part A'], ['B', 'Part B']], cds: [['', 'Mixed'], ['E', 'English'], ['G', 'GK'], ['M', 'Maths']] };
    var open = S.mistakes.filter(function (m) { return !m.done; });

    return head('Practice', 'test what your notes taught you') +
      '<section class="card"><h2>Quick quiz</h2><p class="fine">Flashcards and questions with spaced repetition — for metro rides and short gaps.</p>' +
      '<div class="seg">' + [['metro', 'Metro · one hand'], ['desk', 'Desk · pen ok']].map(function (p) {
        return '<button class="' + (p[0] === place ? 'on' : '') + '" data-act="place" data-v="' + p[0] + '">' + IC[p[0]] + p[1] + '</button>';
      }).join('') + '</div>' +
      '<div class="chips mins">' + QMINS.map(function (m) { return '<button class="chip' + (m === mins ? ' on' : '') + '" data-act="mins" data-v="' + m + '">' + m + '</button>'; }).join('') + '</div>' +
      '<button class="go" data-act="start">Start ' + mins + ' min</button></section>' +

      '<section class="card"><h2>Mistake log <small class="unit">' + open.length + ' open</small></h2>' +
      '<p class="fine">One line per question you got wrong — the fact or the trap. Read these before every mock.</p>' +
      '<form data-form="mistake" class="logf">' + topicSelect('') +
      '<textarea name="text" class="txt" rows="2" placeholder="e.g. Art. 21A = right to education, not Art. 21" maxlength="240" required></textarea>' +
      '<button class="btn">Add mistake</button></form>' +
      (open.length ? '<ul class="list">' + open.slice().reverse().map(function (m) {
        var t = G.topicMap[m.topic];
        return '<li><span class="lrow static"><b>' + esc(m.text) + '</b><small>' + (t ? esc(t.name) + ' · ' : '') + dayShort(m.day) + '</small></span><button class="btn sm" data-act="mfix" data-v="' + S.mistakes.indexOf(m) + '">Fixed</button></li>';
      }).join('') + '</ul>' : '') + '</section>' +

      ['psi', 'cds'].map(function (e) {
        return '<section class="card mock ' + e + '"><div class="mock-h"><span class="tag">' + e.toUpperCase() + '</span><h3>Mini mock · 25 Q · 25 min</h3></div>' +
          '<p class="rule">' + esc(G.EXAMS[e].rules) + '</p>' +
          '<div class="chips sm">' + parts[e].map(function (p) {
            return '<button class="chip' + (mockPart[e] === p[0] ? ' on' : '') + '" data-act="mockPart" data-e="' + e + '" data-v="' + p[0] + '">' + p[1] + '</button>';
          }).join('') + '</div>' +
          '<button class="go" data-act="mock" data-v="' + e + '">Start ' + e.toUpperCase() + ' mock</button></section>';
      }).join('') +

      '<section class="card"><h2>Paper 2 writing</h2><p class="fine">Handwritten and human-marked — the only way to train it is to write. Frame, timer and a self-check list.</p>' +
      (next ? '<button class="go" data-act="task" data-v="' + next.id + '">Next: ' + esc(next.title) + ' · ' + next.min + ' min</button>' : '') +
      '<details><summary>All ' + tasks.length + ' tasks</summary><ul class="tasks">' + tasks.map(function (it) {
        var done = S.tasks.filter(function (x) { return x.id === it.id; });
        var l = done[done.length - 1];
        return '<li><button data-act="task" data-v="' + it.id + '"><span>' + gu(it.prompt) + '<small>' + esc(it.title) + (it.en ? ' — ' + esc(it.en) : '') + '</small></span><span class="mono">' + (l ? l.score + '/' + l.max : it.min + 'm') + '</span></button></li>';
      }).join('') + '</ul></details></section>';
  }

  // ------------------------------------------------------------- PROGRESS
  function viewProgress() {
    var today = G.dayNum(), days = [], max = 30;
    for (var i = 13; i >= 0; i--) { var m = G.dayMinutes(S, today - i); days.push({ n: today - i, m: m }); if (m > max) max = m; }
    var tot = 0; for (var k in S.days) tot += S.days[k].m;
    S.outside.forEach(function (o) { tot += o.min; });
    var grp = {}, gmax = 1;
    S.log.forEach(function (l) { if (l.day > today - 7) { var g = (G.topicMap[l.topic] || {}).group || 'Other'; grp[g] = (grp[g] || 0) + l.min; if (grp[g] > gmax) gmax = grp[g]; } });
    var runs = S.runs.slice().sort(function (a, b) { return a.min - b.min; });
    var best = runs[0], lastRuns = S.runs.slice(-4).reverse();
    var scores = S.scores.map(function (x) { return { exam: x.exam, day: x.day, label: x.label, score: x.score, max: x.max, real: 1 }; })
      .concat(S.mocks.map(function (x) { return { exam: x.exam, day: x.day, label: 'App mini mock' + (x.part ? ' · ' + x.part : ''), score: x.score, max: x.max }; }))
      .sort(function (a, b) { return a.day - b.day; });

    return head('Progress', fmtMin(tot) + ' studied in total') +
      '<section class="card"><h2>Last 14 days</h2><div class="chart">' + days.map(function (d) {
        return '<div class="col' + (d.m >= S.prefs.floor ? ' hit' : '') + (d.n === today ? ' today' : '') + '" title="' + G.dayKey(d.n) + ': ' + Math.round(d.m) + ' min"><i style="height:' + Math.max(2, d.m / max * 100) + '%"></i><span>' + DOW[new Date(d.n * 86400000).getUTCDay()][0] + '</span></div>';
      }).join('') + '</div>' +
      (Object.keys(grp).length ? '<h3>Last 7 days by subject</h3><ul class="hbars">' + GROUPS.concat(['Other']).filter(function (g) { return grp[g]; }).map(function (g) {
        return '<li><span>' + g + '</span><i style="width:' + grp[g] / gmax * 100 + '%"></i><b class="mono">' + fmtMin(grp[g]) + '</b></li>';
      }).join('') + '</ul>' : '') + '</section>' +

      '<section class="card"><h2>Scores</h2><p class="fine">Full mocks and past papers, on paper or online. The only honest measure — enter every one.</p>' +
      '<form data-form="score" class="scoref"><select name="exam" class="sel" aria-label="Exam"><option value="psi">PSI</option><option value="cds">CDS</option></select>' +
      '<input name="score" class="txt" inputmode="decimal" placeholder="Score" required aria-label="Score">' +
      '<input name="max" class="txt" inputmode="numeric" placeholder="Out of" value="200" required aria-label="Out of">' +
      '<input name="label" class="txt full" placeholder="Which paper — e.g. PSI 2021 PYQ, Testbook mock 4" maxlength="60">' +
      '<button class="btn full">Add score</button></form>' +
      ['psi', 'cds'].map(function (e) {
        var xs = scores.filter(function (x) { return x.exam === e; }).slice(-12);
        if (!xs.length) return '';
        var tgt = G.EXAMS[e].target / 3;
        return '<div class="spark ' + e + '"><div class="spark-h"><span class="tag">' + e.toUpperCase() + '</span><small class="mono">target ' + Math.round(tgt) + '%</small></div><div class="sb">' +
          '<b style="bottom:' + tgt + '%"></b>' + xs.map(function (x) {
            var pc = x.score / x.max * 100;
            return '<i class="' + (x.real ? 'real' : '') + '" style="height:' + Math.max(2, pc) + '%" title="' + esc(x.label) + ': ' + Math.round(pc) + '%"></i>';
          }).join('') + '</div></div>';
      }).join('') +
      (scores.length ? '<ul class="list">' + scores.slice(-8).reverse().map(function (x) {
        var idx = x.real ? S.scores.findIndex(function (s) { return s.day === x.day && s.label === x.label && s.score === x.score; }) : -1;
        return '<li><span class="lrow static"><b>' + esc(x.label || 'Mock') + '</b><small>' + x.exam.toUpperCase() + ' · ' + dayShort(x.day) + '</small></span><span class="mono sc">' + x.score + '/' + x.max + ' · ' + Math.round(x.score / x.max * 100) + '%</span>' +
          (idx >= 0 ? '<button class="icon sm" data-act="unscore" data-v="' + idx + '" aria-label="Delete score">' + IC.x + '</button>' : '') + '</li>';
      }).join('') + '</ul>' : '') + '</section>' +

      '<section class="card"><h2>5 km · PET</h2><p class="fine">Qualify: <b>25:00</b>. Aim for 23:00 so a bad day still passes.</p>' +
      '<form class="runf" data-form="run"><input name="t" inputmode="numeric" placeholder="mm:ss e.g. 24:30" pattern="\\d{1,2}:\\d{2}" required aria-label="5 km time"><button class="btn">Log run</button></form>' +
      (best ? '<p class="runbest">Best <b class="mono">' + clock(best.min * 60) + '</b>' + (best.min <= 25 ? ' <span class="okk">qualifies</span>' : ' <span class="low">' + clock((best.min - 25) * 60) + ' to cut</span>') + '</p>' : '') +
      (lastRuns.length ? '<ul class="hist">' + lastRuns.map(function (r) { return '<li><span class="mono">' + clock(r.min * 60) + '</span><span class="fine">' + dayShort(r.day) + '</span></li>'; }).join('') + '</ul>' : '') + '</section>' +

      '<section class="card"><h2>Settings</h2>' +
      slider('weekly', 'Weekly target', S.prefs.weekly, 60, 1500, 30, fmtMin(S.prefs.weekly)) +
      slider('floor', 'Daily minimum (keeps the streak)', S.prefs.floor, 5, 60, 5, S.prefs.floor + ' min') +
      slider('split', 'Focus split', S.prefs.split, 20, 80, 5, 'PSI ' + S.prefs.split + '% · CDS ' + (100 - S.prefs.split) + '%') +
      '</section>' +

      '<section class="card"><h2>Dates</h2><ul class="dates">' + G.DATES.map(function (d) {
        var n = G.daysUntil(d.date);
        return '<li class="' + (n < 0 ? 'past' : '') + '"><span class="mono">' + (n < 0 ? 'done' : n + 'd') + '</span><span>' + esc(d.label) + '<small>' + d.date + '</small></span></li>';
      }).join('') + '<li><span class="mono">?</span><span>Gujarat PSI notification — no date yet. Check GPRB / OJAS on the 1st of every month.</span></li></ul>' +
      '<p class="fine">PSI: ' + esc(G.EXAMS.psi.rules) + '. 40% needed in each part of Paper 1.</p>' +
      '<p class="fine">CDS: ' + esc(G.EXAMS.cds.rules) + '. Ages: IMA 19–24 · INA 19–22 · AFA 20–24 · OTA 19–25 — check the notice.</p></section>' +

      '<section class="card"><h2>Backup</h2><p class="fine">Everything lives on this phone only. Export once a week; import on a new phone.</p>' +
      '<div class="btns"><button class="btn" data-act="export">Export</button><label class="btn">Import<input type="file" accept="application/json" data-act="import" hidden></label><button class="btn danger" data-act="reset">Reset</button></div>' +
      (S.lastExport ? '<p class="fine">Last export ' + rel(S.lastExport) + '.</p>' : '<p class="fine">Never exported.</p>') + '</section>';
  }
  function slider(key, label, val, min, max, step, show) {
    return '<label class="slide"><span>' + label + '<b data-show="' + key + '">' + esc(show) + '</b></span><input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" data-pref="' + key + '"></label>';
  }

  // ------------------------------------------------------------- overlay
  function sheet(html) {
    ov.innerHTML = '<div class="scrim" data-act="close"></div><div class="sheet">' + html + '</div>';
    ov.className = 'open sheet-mode';
    document.body.classList.add('locked');
  }
  function full(html, cls) {
    ov.innerHTML = '<div class="runner ' + (cls || '') + '">' + html + '</div>';
    ov.className = 'open';
    document.body.classList.add('locked');
  }
  function closeOverlay() {
    stopTick();
    run = null;
    ov.className = '';
    ov.innerHTML = '';
    document.body.classList.remove('locked');
    render();
  }

  // ------------------------------------------------------------- session runner
  var run = null, tick = null;
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function startTick() {
    stopTick();
    tick = setInterval(function () {
      if (!run) return;
      var t = document.getElementById('rtime');
      var b = document.getElementById('rbar');
      if (run.kind === 'mock') {
        var left = (run.deadline - Date.now()) / 1000;
        if (t) t.textContent = clock(left);
        if (left <= 0) submitMock();
      } else if (run.kind === 'session') {
        var el = (Date.now() - run.start) / 1000;
        if (t) t.textContent = clock(Math.max(0, run.minutes * 60 - el));
        if (b) b.style.width = Math.min(100, el / (run.minutes * 60) * 100) + '%';
      }
      if (run.timer) {
        var rem = run.timer - Date.now();
        var tt = document.getElementById('ttime');
        if (tt) { tt.textContent = clock(rem / 1000); tt.classList.toggle('over', rem < 0); }
        if (rem < 0 && !run.buzzed) { run.buzzed = 1; buzz([200, 100, 200]); }
      }
    }, 1000);
  }

  function startSession(place, mins, opts) {
    opts = opts || {};
    var plan = opts.topic ? G.build(S, place, mins, { topic: opts.topic }) : planFor(place, mins);
    if (opts.task) plan = { queue: [opts.task], topics: [], minutes: opts.task.min };
    if (!plan.queue.length) { toast('Nothing to study here right now'); return; }
    if (plan.topics.length && !opts.topic) S.frontier[place] = plan.topics[plan.topics.length - 1];
    run = {
      kind: 'session', place: place, minutes: plan.minutes || mins, queue: plan.queue, i: 0,
      start: Date.now(), done: 0, right: 0, wrong: 0, requeued: {}, extended: 0
    };
    save();
    showCard();
    startTick();
  }

  function sessionTop() {
    return '<div class="rtop"><button class="icon" data-act="endSession" aria-label="End session">' + IC.x + '</button>' +
      '<div class="rbar"><i id="rbar"></i></div><span id="rtime" class="mono">' + clock(run.minutes * 60 - (Date.now() - run.start) / 1000) + '</span></div>';
  }

  function showCard() {
    var it = run.queue[run.i];
    if (!it) return finishSession();
    var t = G.topicMap[it.topic];
    run.shownAt = Date.now();
    run.state = 'ask';
    run.lang = run.lang || 'en';
    var label = { learn: 'Learn', mcq: 'Question', flash: 'Recall', task: 'Write' }[it.type];
    var head = '<div class="ctag"><span class="tdot ' + (t.psiFrac > 0.6 ? 'psi' : t.psiFrac < 0.4 ? 'cds' : 'both') + '"></span>' + esc(t.name) + '<span class="kind">' + label + '</span>' + (it.src ? '<span class="src">' + esc(it.src) + '</span>' : '') + '</div>';
    var body = '', actions = '';

    if (it.type === 'learn') {
      body = '<h2 class="ltitle">' + esc(it.title) + '</h2><div class="md">' + md(it.body) + '</div>' + (it.ex ? '<div class="ex">' + md(it.ex) + '</div>' : '');
      actions = '<button class="go" data-act="learned">Got it →</button>';
    } else if (it.type === 'flash') {
      body = '<div class="flash"><div class="front">' + gu(it.front) + '</div><div class="back" id="fback" hidden>' + gu(it.back) + '</div></div>';
      actions = '<button class="go" data-act="reveal" id="reveal">Show answer</button>' +
        '<div class="two" id="judge" hidden><button class="btn bad" data-act="flash" data-v="0">Didn’t know</button><button class="btn good" data-act="flash" data-v="1">Knew it</button></div>';
    } else if (it.type === 'mcq') {
      run.order = it.fixed ? [0, 1, 2, 3] : shuffle([0, 1, 2, 3]);
      body = mcqBody(it);
      actions = '<button class="btn ghost" data-act="dunno">Don’t know — show me</button>';
    } else if (it.type === 'task') {
      return showTask(it, 'brief');
    }
    full(sessionTop() + '<div class="rbody">' + head + body + '</div><div class="ract">' + actions + '</div>', run.place === 'metro' ? 'metro' : '');
  }

  function mcqBody(it) {
    var useGu = run.lang === 'gu' && it.gu;
    var q = useGu ? it.gu.q : it.q;
    var opts = useGu && it.gu.o ? it.gu.o : it.o;
    return (it.gu ? '<button class="lang" data-act="lang">' + (useGu ? 'English' : 'ગુજરાતી') + '</button>' : '') +
      (it.ctx ? '<blockquote class="ctx">' + gu(it.ctx) + '</blockquote>' : '') +
      '<p class="q">' + gu(q) + '</p><div class="opts">' +
      run.order.map(function (oi, k) {
        return '<button class="opt" data-act="pick" data-v="' + k + '"><span class="ol">' + 'ABCD'[k] + '</span><span>' + gu(opts[oi]) + '</span></button>';
      }).join('') + '</div><div id="why"></div>';
  }

  function answerMcq(k) {
    if (run.state !== 'ask') return;
    var it = run.queue[run.i];
    var ok = k != null && run.order[k] === it.a;
    run.state = 'shown';
    var btns = ov.querySelectorAll('.opt');
    for (var j = 0; j < btns.length; j++) {
      btns[j].disabled = true;
      if (run.order[j] === it.a) btns[j].classList.add('right');
      else if (j === k) btns[j].classList.add('wrong');
    }
    var why = run.lang === 'gu' && it.gu && it.gu.why ? it.gu.why : it.why;
    document.getElementById('why').innerHTML = '<div class="why ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? 'Right.' : k == null ? 'Here’s the answer.' : 'Not quite.') + '</b> ' + gu(why) + '</div>';
    ov.querySelector('.ract').innerHTML = '<button class="go" data-act="next">Next →</button>';
    if (!ok) buzz(25);
    grade(it, ok);
  }

  function grade(it, ok) {
    G.grade(S, it, ok);
    run[ok ? 'right' : 'wrong']++;
    if (!ok && !run.requeued[it.id]) {
      run.requeued[it.id] = 1;
      run.queue.splice(Math.min(run.queue.length, run.i + 4), 0, it);
    }
  }

  function advance() {
    var it = run.queue[run.i];
    var dt = Math.min((Date.now() - run.shownAt) / 60000, it && it.type === 'task' ? it.min * 1.5 : 3);
    if (it) { G.logTime(S, it.topic, dt); G.countCard(S); }
    run.done++;
    save();
    run.i++;
    var elapsed = (Date.now() - run.start) / 60000;
    if (run.i >= run.queue.length || elapsed >= run.minutes) return finishSession();
    showCard();
  }

  function finishSession() {
    stopTick();
    var mins = (Date.now() - run.start) / 60000;
    var streak = G.streak(S);
    var line = run.done === 0 ? 'Nothing done — that’s fine. Open it again when you have 2 minutes.'
      : streak >= 2 ? 'Streak ' + streak + ' days. Keep the chain.' : 'Day logged. Come back tomorrow, even for 5 minutes.';
    full('<div class="done">' +
      '<div class="done-k">Session done</div>' +
      '<div class="gain"><div><span class="mono">' + run.right + '/' + (run.right + run.wrong) + '</span><small>right</small></div><div><span class="mono">' + Math.max(1, Math.round(mins)) + 'm</span><small>practised</small></div></div>' +
      '<p class="mono stat">' + run.done + ' cards</p>' +
      '<p class="msg">' + esc(line) + '</p>' +
      (run.wrong ? '<p class="fine">Missed ones come back tomorrow — that’s how they stick.</p>' : '') +
      '<div class="btns col"><button class="go" data-act="more">5 more min</button><button class="btn" data-act="close">Done</button></div></div>');
    save();
  }

  function showTask(it, phase) {
    run.state = phase;
    var t = G.topicMap[it.topic];
    var head = '<div class="ctag"><span class="tdot psi"></span>' + esc(t.name) + '<span class="kind">Write</span></div>';
    var body = '', actions = '';
    if (phase === 'brief') {
      body = '<h2 class="ltitle">' + esc(it.title) + '</h2><p class="q">' + gu(it.prompt) + '</p>' + (it.en ? '<p class="fine">' + esc(it.en) + '</p>' : '') +
        (it.heads ? '<h3>Suggested headings</h3><ol class="heads">' + it.heads.map(function (h) { return '<li>' + gu(h) + '</li>'; }).join('') + '</ol>' : '') +
        (it.passage ? '<blockquote class="ctx">' + gu(it.passage) + '</blockquote>' : '') +
        '<h3>You’ll check yourself on</h3><ul class="rub">' + it.rubric.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>';
      actions = '<div class="two"><button class="btn" data-act="skipTask">Not now</button><button class="go" data-act="taskGo">Start ' + it.min + '-min timer</button></div>';
    } else if (phase === 'write') {
      body = '<div class="writing"><p class="fine">Write on paper. Phone face-down.</p><div class="tbig mono" id="ttime">' + clock(it.min * 60) + '</div><p class="q">' + gu(it.prompt) + '</p>' +
        (it.heads ? '<ol class="heads">' + it.heads.map(function (h) { return '<li>' + gu(h) + '</li>'; }).join('') + '</ol>' : '') +
        (it.passage ? '<blockquote class="ctx">' + gu(it.passage) + '</blockquote>' : '') + '</div>';
      actions = '<button class="go" data-act="taskDone">I’m done — check it</button>';
    } else {
      body = '<h2 class="ltitle">Check your page</h2><p class="fine">Tick only what is honestly true. This is your marker.</p><div class="rubric">' +
        it.rubric.map(function (r, i) { return '<label><input type="checkbox" data-rub="' + i + '"><span>' + esc(r) + '</span></label>'; }).join('') + '</div>';
      actions = '<button class="go" data-act="taskSave">Save score</button>';
    }
    var top = run.kind === 'session' ? sessionTop()
      : '<div class="rtop"><button class="icon" data-act="close" aria-label="Close">' + IC.x + '</button><span class="mtag psi">Paper 2</span><span></span></div>';
    full(top + '<div class="rbody">' + head + body + '</div><div class="ract">' + actions + '</div>');
  }

  // ------------------------------------------------------------- mock runner
  function startMock(exam) {
    var items = G.buildMock(S, exam, 25, mockPart[exam] || null);
    if (items.length < 5) { toast('Not enough questions for that part yet'); return; }
    run = {
      kind: 'mock', exam: exam, part: mockPart[exam] || '', items: items,
      orders: items.map(function (it) { return it.fixed ? [0, 1, 2, 3] : shuffle([0, 1, 2, 3]); }),
      answers: items.map(function () { return null; }), i: 0,
      start: Date.now(), deadline: Date.now() + items.length * 60000
    };
    showMockQ();
    startTick();
  }

  function showMockQ() {
    var it = run.items[run.i], a = run.answers[run.i], ord = run.orders[run.i];
    var psi = run.exam === 'psi';
    var pal = run.answers.map(function (x, k) {
      return '<button class="pd' + (k === run.i ? ' cur' : '') + (x === 'E' ? ' e' : x != null ? ' a' : '') + '" data-act="jump" data-v="' + k + '">' + (k + 1) + '</button>';
    }).join('');
    full('<div class="rtop"><button class="icon" data-act="quitMock" aria-label="Quit mock">' + IC.x + '</button><span class="mtag ' + run.exam + '">' + run.exam.toUpperCase() + ' mock · ' + (run.i + 1) + '/' + run.items.length + '</span><span id="rtime" class="mono">' + clock((run.deadline - Date.now()) / 1000) + '</span></div>' +
      '<div class="palette">' + pal + '</div>' +
      '<div class="rbody">' + (it.ctx ? '<blockquote class="ctx">' + gu(it.ctx) + '</blockquote>' : '') + '<p class="q">' + gu(it.q) + '</p><div class="opts">' +
      ord.map(function (oi, k) {
        return '<button class="opt' + (a === oi ? ' sel' : '') + '" data-act="mpick" data-v="' + oi + '"><span class="ol">' + 'ABCD'[k] + '</span><span>' + gu(it.o[oi]) + '</span></button>';
      }).join('') +
      (psi ? '<button class="opt eopt' + (a === 'E' ? ' sel' : '') + '" data-act="mpick" data-v="E"><span class="ol">E</span><span>Not attempted — costs 0</span></button>' : '') +
      '</div>' + (psi ? '<p class="fine">PSI: a blank row costs −0.25. If unsure, mark E.</p>' : '<p class="fine">CDS: skipping is free; a wrong answer costs −⅓. Guess only after eliminating two.</p>') + '</div>' +
      '<div class="ract"><div class="three"><button class="btn" data-act="mprev"' + (run.i ? '' : ' disabled') + '>←</button>' +
      '<button class="btn" data-act="mclear">Clear</button>' +
      (run.i < run.items.length - 1 ? '<button class="go" data-act="mnext">Next →</button>' : '<button class="go" data-act="msubmit">Submit</button>') + '</div></div>');
  }

  function submitMock() {
    if (!run || run.kind !== 'mock') return;
    stopTick();
    var res = G.scoreMock(run.exam, run.items, run.answers);
    var day = G.dayNum();
    var secs = {};
    run.items.forEach(function (it, i) {
      var t = G.topicMap[it.topic], sid = t.sec[run.exam];
      var s = secs[sid] || (secs[sid] = { n: 0, ok: 0 });
      s.n++;
      var a = run.answers[i];
      if (a === it.a) s.ok++;
      G.grade(S, it, a === it.a);
    });
    var mins = (Date.now() - run.start) / 60000;
    run.items.forEach(function (it) { G.logTime(S, it.topic, mins / run.items.length); });
    S.mocks.push({ exam: run.exam, part: run.part, day: day, score: res.score, max: res.max, right: res.right, wrong: res.wrong, blank: res.blank, e: res.e });
    save();
    var lesson = '';
    if (run.exam === 'psi' && res.blank) lesson = 'You left ' + res.blank + ' blank — that cost ' + (res.blank * 0.25) + ' marks. In PSI, mark E instead. Every row gets an answer.';
    else if (run.exam === 'cds' && res.wrong > res.right / 2) lesson = 'Wrong answers cost you ' + r1(res.wrong / 3) + ' marks. In CDS, skip unless you can eliminate two options.';
    else if (run.exam === 'psi' && res.wrong > res.right / 2) lesson = 'Many wrong answers at −0.25 each. Mark E when you have no idea.';

    full('<div class="rtop"><button class="icon" data-act="close" aria-label="Close">' + IC.x + '</button><span class="mtag ' + run.exam + '">' + run.exam.toUpperCase() + ' result</span><span></span></div>' +
      '<div class="rbody"><div class="mres"><span class="big mono">' + res.score + '</span><span class="of mono">/ ' + res.max + '</span><span class="pc">' + Math.round(res.score / res.max * 100) + '%</span></div>' +
      '<p class="mono stat">' + res.right + ' right · ' + res.wrong + ' wrong · ' + res.blank + ' blank' + (run.exam === 'psi' ? ' · ' + res.e + ' E' : '') + ' · ' + Math.round(mins) + ' min</p>' +
      (lesson ? '<div class="why no">' + esc(lesson) + '</div>' : '') +
      '<div class="secs">' + Object.keys(secs).map(function (k) {
        var s = secs[k], nm = (G.EXAMS[run.exam].sections.filter(function (x) { return x.id === k; })[0] || {}).name || k;
        var pc = Math.round(s.ok / s.n * 100);
        return '<span class="' + (pc < 40 ? 'low' : 'okk') + '">' + esc(nm) + ' ' + s.ok + '/' + s.n + '</span>';
      }).join('') + '</div>' +
      '<h3>Review</h3><ol class="review">' + run.items.map(function (it, i) {
        var a = run.answers[i], okk = a === it.a;
        var yours = a === 'E' ? 'E (not attempted)' : a == null ? 'blank' : it.o[a];
        return '<li class="' + (okk ? 'ok' : 'no') + '"><p>' + gu(it.q) + '</p><p class="fine">' + (okk ? '✓ ' : 'You: ' + gu(yours) + ' · ✓ ') + gu(it.o[it.a]) + '</p>' + (!okk && it.why ? '<p class="fine">' + gu(it.why) + '</p>' : '') + '</li>';
      }).join('') + '</ol></div>' +
      '<div class="ract"><button class="go" data-act="close">Done</button></div>');
    run = null;
  }

  // ------------------------------------------------------------- actions
  var A = {
    place: function (d) { S.prefs.place = d.v; save(); render(); },
    mins: function (d) { S.prefs.mins = +d.v; save(); render(); },
    start: function () { startSession(S.prefs.place === 'metro' ? 'metro' : 'desk', QMINS.indexOf(S.prefs.mins) >= 0 ? S.prefs.mins : 10); },
    pickChip: function (d, el) {
      ui[d.g] = d.g === 'min' ? +d.v : d.v;
      if (d.g === 'filter') return render();
      [].forEach.call(el.parentNode.children, function (c) { c.classList.toggle('on', c === el); });
      if (d.g === 'min') document.getElementById('logBtn').textContent = 'Log ' + d.v + ' min';
    },
    revised: function (d) {
      G.revise(S, d.v); save(); render();
      var due = G.dueDay(G.track(S, d.v));
      toast('Revised · next ' + rel(due));
      if (ov.classList.contains('sheet-mode')) openTopic(d.v);
    },
    stage: function (d) { G.setStage(S, d.id, +d.v); save(); render(); openTopic(d.id); },
    unlog: function (d) {
      var l = S.log[+d.v];
      if (!l || !confirm('Delete this entry?')) return;
      S.log.splice(+d.v, 1);
      var rec = S.days[G.dayKey(l.day)], t = G.topicMap[l.topic], f = t ? t.psiFrac : 0.5;
      if (rec) { rec.m = Math.max(0, rec.m - l.min); rec.psi = Math.max(0, rec.psi - l.min * f); rec.cds = Math.max(0, rec.cds - l.min * (1 - f)); }
      if (S.tmin[l.topic]) S.tmin[l.topic] = Math.max(0, S.tmin[l.topic] - l.min);
      save(); render();
    },
    mfix: function (d) { var m = S.mistakes[+d.v]; if (m) { m.done = G.dayNum(); save(); render(); toast('Marked fixed'); } },
    unscore: function (d) { if (confirm('Delete this score?')) { S.scores.splice(+d.v, 1); save(); render(); } },
    topic: function (d) { openTopic(d.v); },
    close: closeOverlay,
    studyTopic: function (d) { var t = G.topicMap[d.v]; startSession(placeFor(t), 15, { topic: d.v }); },
    learned: function () { G.markSeen(S, run.queue[run.i]); advance(); },
    reveal: function () {
      document.getElementById('fback').hidden = false;
      document.getElementById('reveal').hidden = true;
      document.getElementById('judge').hidden = false;
    },
    flash: function (d) { grade(run.queue[run.i], d.v === '1'); advance(); },
    pick: function (d) { answerMcq(+d.v); },
    dunno: function () { answerMcq(null); },
    next: advance,
    lang: function () {
      run.lang = run.lang === 'gu' ? 'en' : 'gu';
      var it = run.queue[run.i];
      var body = ov.querySelector('.rbody');
      var head = body.querySelector('.ctag').outerHTML;
      body.innerHTML = head + mcqBody(it);
    },
    endSession: function () { if (run.done) finishSession(); else closeOverlay(); },
    more: function () {
      var place = run.place;
      var add = G.build(S, place, 5);
      if (!add.queue.length) { toast('Nothing more fits here — nice.'); return; }
      run.queue = run.queue.slice(0, run.i).concat(add.queue);
      run.minutes = (Date.now() - run.start) / 60000 + 5;
      showCard();
      startTick();
    },
    task: function (d) {
      var it = G.itemMap[d.v];
      run = { kind: 'task', queue: [it], i: 0, start: Date.now(), shownAt: Date.now(), done: 0, right: 0, wrong: 0, requeued: {} };
      showTask(it, 'brief');
    },
    skipTask: function () {
      if (run.kind === 'session') { run.queue.splice(run.i, 1); if (run.i >= run.queue.length) finishSession(); else showCard(); }
      else closeOverlay();
    },
    taskGo: function () {
      var it = run.queue[run.i];
      run.timer = Date.now() + it.min * 60000;
      run.shownAt = Date.now();
      showTask(it, 'write');
      startTick();
    },
    taskDone: function () { showTask(run.queue[run.i], 'score'); },
    taskSave: function () {
      var it = run.queue[run.i];
      var n = ov.querySelectorAll('[data-rub]:checked').length;
      var min = Math.min((Date.now() - run.shownAt) / 60000, it.min * 1.5);
      S.tasks.push({ id: it.id, topic: it.topic, day: G.dayNum(), min: Math.round(min), score: n, max: it.rubric.length });
      run.timer = null;
      toast('Saved ' + n + '/' + it.rubric.length + ' · ≈ ' + r1(n / it.rubric.length * it.marks) + ' of ' + it.marks + ' marks');
      if (run.kind === 'session') advance();
      else { G.logTime(S, it.topic, min); save(); closeOverlay(); }
    },
    mockPart: function (d) { mockPart[d.e] = d.v; render(); },
    mock: function (d) { startMock(d.v); },
    mpick: function (d) { run.answers[run.i] = d.v === 'E' ? 'E' : +d.v; showMockQ(); },
    mclear: function () { run.answers[run.i] = null; showMockQ(); },
    mnext: function () { run.i++; showMockQ(); },
    mprev: function () { run.i--; showMockQ(); },
    jump: function (d) { run.i = +d.v; showMockQ(); },
    msubmit: function () {
      var blank = run.answers.filter(function (x) { return x == null; }).length;
      if (blank && !confirm(blank + ' question(s) blank.' + (run.exam === 'psi' ? ' In PSI each blank costs −0.25 — mark E instead?' : '') + '\n\nSubmit anyway?')) return;
      submitMock();
    },
    quitMock: function () { if (confirm('Quit this mock? Nothing will be saved.')) closeOverlay(); },
    export: function () {
      var blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'goal-backup-' + G.dayKey(G.dayNum()) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      S.lastExport = G.dayNum(); save(); render();
    },
    reset: function () {
      if (!confirm('Erase ALL progress on this device? Export first if you might want it.')) return;
      S = G.blank(); G.applyPrefs(S); save(); render(); toast('Reset');
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || el.tagName === 'INPUT') return;
    var fn = A[el.dataset.act];
    if (fn) { e.preventDefault(); fn(el.dataset, el); }
  });

  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset.act === 'import' && el.files && el.files[0]) {
      var r = new FileReader();
      r.onload = function () {
        try {
          var data = JSON.parse(r.result);
          if (!data || !data.items) throw new Error('not a GOAL backup');
          if (!confirm('Replace progress on this device with the backup?')) return;
          S = G.migrate(data); G.applyPrefs(S); save(); render(); toast('Backup restored');
        } catch (err) { toast('That file is not a GOAL backup'); }
      };
      r.readAsText(el.files[0]);
    }
    if (el.dataset.src) { G.trackW(S, el.dataset.src).src = el.value.trim(); save(); render(); return; }
    if (el.name === 'topic' && el.form && el.form.dataset.form === 'log') { ui.topic = el.value; return; }
    if (el.dataset.pref) { S.prefs[el.dataset.pref] = +el.value; G.applyPrefs(S); save(); render(); }
  });
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!el.dataset.pref) return;
    var k = el.dataset.pref, v = +el.value, show = document.querySelector('[data-show="' + k + '"]');
    if (show) show.textContent = k === 'weekly' ? fmtMin(v) : k === 'floor' ? v + ' min' : 'PSI ' + v + '% · CDS ' + (100 - v) + '%';
  });
  document.addEventListener('submit', function (e) {
    var f = e.target;
    e.preventDefault();
    if (f.dataset.form === 'log') {
      var topic = f.topic.value || (ui.kind === 'ca' ? 'g_current' : '');
      if (!topic) { toast('Pick a topic first'); return; }
      S.log.push({ day: G.dayNum(), topic: topic, kind: ui.kind, min: ui.min, note: f.note.value.trim() });
      G.logTime(S, topic, ui.min);
      var st = G.track(S, topic).stage;
      if (ui.kind === 'learn' && st === 0) G.setStage(S, topic, 1);
      if (ui.kind === 'revise' && st >= 2) G.revise(S, topic);
      ui.topic = topic;
      save(); render(); toast('Logged ' + fmtMin(ui.min) + ' · ' + G.topicMap[topic].name);
      return;
    }
    if (f.dataset.form === 'mistake') {
      var txt = f.text.value.trim();
      if (!txt) return;
      S.mistakes.push({ day: G.dayNum(), topic: f.topic.value, text: txt, done: 0 });
      save(); render(); toast('Added to mistake log');
      return;
    }
    if (f.dataset.form === 'score') {
      var sc = parseFloat(f.score.value), mx = parseFloat(f.max.value);
      if (!(mx > 0) || isNaN(sc) || sc > mx) { toast('Check the score and the total'); return; }
      S.scores.push({ day: G.dayNum(), exam: f.exam.value, label: f.label.value.trim() || (f.exam.value.toUpperCase() + ' mock'), score: sc, max: mx });
      save(); render(); toast('Score saved');
      return;
    }
    if (f.dataset.form !== 'run') return;
    var m = (f.t.value || '').match(/^(\d{1,2}):(\d{2})$/);
    if (!m || +m[2] > 59) { toast('Use mm:ss, e.g. 24:30'); return; }
    S.runs.push({ day: G.dayNum(), km: 5, min: +m[1] + m[2] / 60 });
    save(); render(); toast('Run logged');
  });

  // Keyboard: 1–4 pick, Enter/Space next — handy on the office laptop.
  document.addEventListener('keydown', function (e) {
    if (!run || e.target.tagName === 'INPUT' || e.metaKey || e.ctrlKey) return;
    var k = e.key;
    if (run.kind === 'session') {
      var it = run.queue[run.i];
      if (!it) return;
      if (it.type === 'mcq' && run.state === 'ask' && /^[1-4]$/.test(k)) { answerMcq(+k - 1); e.preventDefault(); }
      else if (k === 'Enter' || k === ' ') {
        var b = ov.querySelector('.ract .go:not([hidden])');
        if (b) { b.click(); e.preventDefault(); }
      }
    } else if (run.kind === 'mock') {
      if (/^[1-4]$/.test(k)) { run.answers[run.i] = run.orders[run.i][+k - 1]; showMockQ(); }
      else if (k === 'ArrowRight' && run.i < run.items.length - 1) { run.i++; showMockQ(); }
      else if (k === 'ArrowLeft' && run.i > 0) { run.i--; showMockQ(); }
    }
  });

  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' && ov.classList.contains('sheet-mode')) closeOverlay();
  });

  window.addEventListener('beforeunload', save);
  document.addEventListener('visibilitychange', function () { if (document.hidden) save(); });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  render();
})();
