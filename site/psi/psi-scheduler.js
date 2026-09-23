/**
 * GOAL OS Adaptive Training Scheduler & Dynamic Rebalancing Engine
 * Strictly aligns with Candidate Profile:
 * - 5-Day Workweek: Mon-Fri (2 hours desk study + 60 min metro commute)
 * - Weekends: Sat-Sun (3-4 hours study + football / creative buffer)
 * - Target 1: UPSC CDS I 2027 (IMA) - 11 April 2027
 * - Target 2: Gujarat Armed PSI (GPRB)
 * - Dynamic Rebalancing based on Diagnostic Assessment & SM-2 SRS Error States
 */
(function(root) {
  'use strict';

  function GoalScheduler(storage, bank, srs, engine) {
    this.storage = storage || root.GoalStorage || root.PSIStorage;
    this.bank = bank || root.GoalQuestionBank || root.PSI_QUESTION_BANK;
    this.srs = srs || root.PSISRS;
    this.engine = engine;
  }

  var CDS_TARGET_DATE = new Date('2027-04-11T00:00:00Z');

  /**
   * Evaluates the candidate's primary weakness domain based on diagnostic data
   */
  GoalScheduler.prototype.getDiagnosedWeakness = function() {
    var diag = this.storage ? this.storage.getDiagnosticResult() : null;
    if (!diag) return null;

    if (Array.isArray(diag.criticalWeaknesses) && diag.criticalWeaknesses.length > 0) {
      return diag.criticalWeaknesses[0];
    }

    if (Array.isArray(diag.sections)) {
      var sorted = diag.sections.slice().sort(function(a, b) {
        return a.accuracy - b.accuracy;
      });
      return {
        sectionName: sorted[0].name,
        accuracy: sorted[0].accuracy,
        advice: sorted[0].advice || ''
      };
    }
    return null;
  };

  /**
   * Generates dynamic, evidence-based daily plan for any calendar date
   */
  GoalScheduler.prototype.generateDailyPlan = function(targetDate) {
    var d = targetDate ? new Date(targetDate) : new Date();
    var dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
    var isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    var now = new Date();
    var daysToCds = Math.max(0, Math.round((CDS_TARGET_DATE - now) / (1000 * 60 * 60 * 24)));

    var diag = this.storage ? this.storage.getDiagnosticResult() : null;
    var primaryWeakness = this.getDiagnosedWeakness();

    var all = this.bank ? this.bank.getAll() : [];
    var dueCards = (this.srs && this.storage) ? this.srs.filterDue(all, this.storage) : [];
    var repeatedMistakes = (this.srs && this.storage) ? this.srs.filterRepeatedMistakes(all, this.storage) : [];

    var plan = {
      date: d.toISOString().slice(0, 10),
      dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek],
      isWeekend: isWeekend,
      daysToCds: daysToCds,
      blocks: [],
      coachingDirective: {
        what: '',
        why: '',
        durationMins: 0,
        actionId: '',
        actionLabel: ''
      }
    };

    if (!isWeekend) {
      // =========================================================================
      // WEEKDAY SCHEDULE (Mon - Fri: 2 hours desk study + 60 min metro transit)
      // =========================================================================
      var morningTitle = 'Morning Deep Block: High-Cognition Topic Drill';
      var morningDetail = 'Solve targeted concept problems while mental energy is at its highest.';
      var morningAction = 'practice';
      var morningSubject = 'mathematics';
      var morningReason = 'Foundational practice required for exam speed.';

      if (!diag) {
        morningTitle = 'Baseline Diagnostic Assessment (25 Questions)';
        morningDetail = 'Calibrate your preparation level across Quant, Reasoning, English, Constitution & Gujarat GK.';
        morningAction = 'diagnostic';
        morningReason = 'System requires baseline measurement before assigning custom study syllabus.';
      } else if (primaryWeakness) {
        var wName = primaryWeakness.sectionName.toLowerCase();
        if (wName.indexOf('quant') !== -1 || wName.indexOf('math') !== -1) {
          morningTitle = 'Maths Deep Block: Commercial Arithmetic & Number System';
          morningDetail = 'Focus: Percentages, Ratio, and Divisibility problem-solving routines.';
          morningAction = 'practice';
          morningSubject = 'mathematics';
          morningReason = 'Diagnosed weak in Quantitative Aptitude (' + primaryWeakness.accuracy + '% accuracy). Arithmetic mastery is required for CDS Elementary Maths & PSI Part A.';
        } else if (wName.indexOf('english') !== -1) {
          morningTitle = 'English Syntax Deep Block: Spotting Errors & Subject-Verb Rules';
          morningDetail = 'Focus: Subject-verb agreement, conditional clauses, and tense sequences.';
          morningAction = 'practice';
          morningSubject = 'english';
          morningReason = 'Diagnosed weak in English (' + primaryWeakness.accuracy + '% accuracy). Grammar precision directly impacts 40+ marks in CDS & PSI Paper 2.';
        } else if (wName.indexOf('constitution') !== -1 || wName.indexOf('general') !== -1) {
          morningTitle = 'Constitution Deep Block: Fundamental Rights & Writs (Articles 12-35)';
          morningDetail = 'Focus: Article 32 Writs, Supreme Court/High Court jurisdiction, and landmark amendments.';
          morningAction = 'practice';
          morningSubject = 'law_constitution';
          morningReason = 'Constitution carries mandatory 40% independent cutoff in PSI Paper 1 and 20% in CDS GK.';
        } else {
          morningTitle = 'Core Foundation Block: ' + primaryWeakness.sectionName;
          morningDetail = primaryWeakness.advice || 'Systematic problem solving and rule review.';
          morningAction = 'practice';
          morningReason = 'Targeting your lowest accuracy diagnostic domain.';
        }
      }

      // 1. Morning Desk Block (5:30 AM - 6:45 AM, 75 min)
      plan.blocks.push({
        id: 'block_morning',
        slot: 'Deep · 5:30am – 6:45am',
        title: morningTitle,
        durationMins: 75,
        type: 'desk',
        description: morningDetail,
        why: morningReason,
        actionId: morningAction,
        subject: morningSubject,
        badge: 'High Cognitive Load'
      });

      // 2. Metro Transit Block (8:30 AM / 6:30 PM, 45 min)
      var metroTitle = 'Metro Transit Mode: Active Recall & Flashcards';
      var metroDesc = 'One-handed, standing commute practice. Zero typing or writing required.';
      var metroAction = 'metro40';
      var metroReason = 'Leverage commute time with low-friction retrieval drills.';

      if (dueCards.length > 0) {
        metroTitle = 'Metro Transit Mode: Clear ' + dueCards.length + ' SRS Due Cards';
        metroDesc = 'Review scheduled spaced repetition cards to halt memory decay.';
        metroAction = 'revision';
        metroReason = dueCards.length + ' cards are due for SM-2 spaced review today.';
      } else {
        metroTitle = 'Metro Transit Mode: Gujarat Administrative Lexicon Drill';
        metroDesc = 'English <-> Gujarati administrative terminology sprint (e.g. Aropnamu, Inquest, SDM).';
        metroAction = 'metro40';
        metroReason = 'High-frequency bilingual lexicon for Gujarat PSI Paper 2 and Paper 1 Part B.';
      }

      plan.blocks.push({
        id: 'block_metro',
        slot: 'Commute · 8:30am / 6:30pm',
        title: metroTitle,
        durationMins: 45,
        type: 'transit',
        description: metroDesc,
        why: metroReason,
        actionId: metroAction,
        badge: 'One-Handed Mobile'
      });

      // 3. Evening Desk Block (10:00 PM – 10:45 PM, 45 min)
      var eveTitle = 'Evening Desk Block: Mistake Journaling & Settling';
      var eveDesc = 'Review today’s missed questions and verify step-by-step logic before sleep.';
      var eveAction = 'mistakes';
      var eveReason = 'Active mistake reflection converts temporary failures into permanent memory traces.';

      if (repeatedMistakes.length > 0) {
        eveTitle = 'Evening Desk Block: Fix ' + repeatedMistakes.length + ' Repeated Mistakes';
        eveDesc = 'Attack questions where you made 2+ errors until logic is understood.';
        eveAction = 'mistakes';
        eveReason = 'Preventing persistent error habits is higher ROI than learning new topics.';
      }

      plan.blocks.push({
        id: 'block_evening',
        slot: 'Light · 10:00pm – 10:45pm',
        title: eveTitle,
        durationMins: 45,
        type: 'desk',
        description: eveDesc,
        why: eveReason,
        actionId: eveAction,
        badge: 'Consolidation'
      });

    } else {
      // =========================================================================
      // WEEKEND SCHEDULE (Sat - Sun: 3-4 hours study + football / creative work)
      // =========================================================================
      var isSunday = (dayOfWeek === 0);

      if (isSunday) {
        // Sunday: Full-length simulation / Comprehensive audit
        plan.blocks.push({
          id: 'block_sun_mock',
          slot: 'Sunday Morning · 9:00am – 11:00am',
          title: 'Full Written Paper Simulation / 50-Q Timed Sprint',
          durationMins: 120,
          type: 'mock',
          description: 'Exam conditions: strict negative marking, Option E discipline, and no pauses.',
          why: 'Builds psychological endurance and calibrated pacing under clock constraints.',
          actionId: 'metro40',
          badge: 'Exam Simulation'
        });

        plan.blocks.push({
          id: 'block_sun_audit',
          slot: 'Sunday Afternoon · 4:00pm – 5:15pm',
          title: 'Weekly Progress Audit & Error Root-Cause Analysis',
          durationMins: 75,
          type: 'audit',
          description: 'Categorize all week’s mistakes into Knowledge Gap, Calculation Slip, or Misread.',
          why: 'Weekly error taxonomy review guarantees next week’s study blocks target real weaknesses.',
          actionId: 'diagnostic',
          badge: 'Audit & Calibration'
        });

        plan.blocks.push({
          id: 'block_sun_sport',
          slot: 'Sunday Evening · Active Rest',
          title: 'Physical & Creative Buffer: Football & Content Session',
          durationMins: 90,
          type: 'physical',
          description: 'Football match, video recording/upload, startup work, mental decompression.',
          why: 'Recovery and physical fitness are mandatory for SSB endurance and mental longevity.',
          actionId: 'physical',
          badge: 'SSB Fitness & Life'
        });
      } else {
        // Saturday: Deep Sectional Mastery + Physical 5 km Run
        plan.blocks.push({
          id: 'block_sat_sectional',
          slot: 'Saturday Morning · 8:30am – 10:30am',
          title: 'Sectional Mastery Sprint: ' + (primaryWeakness ? primaryWeakness.sectionName : 'Elementary Maths & Constitution'),
          durationMins: 120,
          type: 'desk',
          description: 'Solve 30-40 targeted questions from verified standard reference datasets with untimed deep analysis.',
          why: 'Weekends allow uninterrupted deep problem-solving without workday mental fatigue.',
          actionId: 'practice',
          badge: 'Deep Problem Solving'
        });

        plan.blocks.push({
          id: 'block_sat_run',
          slot: 'Saturday Late Afternoon · 5:00pm – 6:00pm',
          title: 'Physical Endurance: 5 km Run (Gujarat PSI PET Baseline)',
          durationMins: 60,
          type: 'physical',
          description: '5000 metres steady-state tempo run. Target is progressing towards comfortably sub-25:00.',
          why: 'Gujarat Armed PSI requires 5 km in 25:00 (qualifying). Aerobic endurance builds SSB physical stamina.',
          actionId: 'physical',
          badge: 'PET 5 km Run'
        });

        plan.blocks.push({
          id: 'block_sat_srs',
          slot: 'Saturday Night · 9:30pm – 10:30pm',
          title: 'Spaced Repetition Sprint: 100% Zero-Inbox SRS Clear',
          durationMins: 60,
          type: 'desk',
          description: 'Clear all pending cards in SM-2 queue and review weekly bookmarked questions.',
          why: 'Ensures zero card backlog enters Sunday’s audit.',
          actionId: 'revision',
          badge: 'SRS Zero Inbox'
        });
      }
    }

    // Determine immediate next coaching directive ("WHAT SHOULD I DO NOW?")
    var currentHour = now.getHours();
    var activeBlock = plan.blocks[0];

    if (!isWeekend) {
      if (currentHour >= 5 && currentHour < 8) {
        activeBlock = plan.blocks[0]; // Morning deep block
      } else if ((currentHour >= 8 && currentHour < 10) || (currentHour >= 17 && currentHour < 20)) {
        activeBlock = plan.blocks[1]; // Metro commute block
      } else if (currentHour >= 20 || currentHour < 2) {
        activeBlock = plan.blocks[2]; // Evening desk block
      } else {
        activeBlock = plan.blocks[0]; // Daytime standby: next morning block
      }
    } else {
      if (currentHour < 12) {
        activeBlock = plan.blocks[0];
      } else if (currentHour < 18) {
        activeBlock = plan.blocks[1];
      } else {
        activeBlock = plan.blocks[2];
      }
    }

    plan.coachingDirective = {
      what: activeBlock.title,
      why: activeBlock.why,
      durationMins: activeBlock.durationMins,
      actionId: activeBlock.actionId,
      subject: activeBlock.subject || null,
      slot: activeBlock.slot
    };

    return plan;
  };

  /**
   * Renders the dynamic Adaptive Today Card into the main dashboard container
   */
  GoalScheduler.prototype.renderTodayCard = function(containerEl) {
    if (!containerEl) return;

    var plan = this.generateDailyPlan();
    var dir = plan.coachingDirective;
    var tk = plan.date;

    var dk = false;
    if (this.storage && this.storage.state && this.storage.state.cdsHabitData && this.storage.state.cdsHabitData.days) {
      dk = !!this.storage.state.cdsHabitData.days[tk];
    }

    function esc(s) {
      if (!s) return '';
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var html = '<div class="today">' +
      '<div class="today-top">' +
        '<div>' +
          '<h2>Today\'s Training Plan</h2>' +
          '<div style="font-size:12px;color:var(--ink-faint);margin-top:2px;">' +
            'Adaptive Coach &middot; ' + plan.dayName + ' &middot; ' + plan.daysToCds + ' days to CDS I 2027 (IMA)' +
          '</div>' +
        '</div>' +
        '<span class="today-date">' + tk + '</span>' +
      '</div>' +

      // Coaching Directive Card: WHAT / WHY / HOW LONG
      '<div style="background:var(--accent-soft);border:1px solid var(--accent-border);border-left:4px solid var(--accent);border-radius:var(--radius);padding:14px 18px;margin-top:4px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">' +
          '<span class="eyebrow" style="margin-bottom:0;color:var(--accent);background:var(--surface);">WHAT TO DO NOW</span>' +
          '<span style="font-family:var(--f-mono);font-size:12px;font-weight:700;color:var(--accent);">' + esc(dir.slot) + ' (' + dir.durationMins + ' min)</span>' +
        '</div>' +
        '<div style="font-size:16px;font-weight:700;color:var(--ink);margin-top:6px;">' + esc(dir.what) + '</div>' +
        '<div style="font-size:13px;color:var(--ink-soft);margin-top:4px;line-height:1.5;"><strong>Why: </strong>' + esc(dir.why) + '</div>' +
        '<div style="margin-top:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">' +
          '<button class="btn" id="sched-action-btn" data-action="' + esc(dir.actionId) + '" data-subject="' + esc(dir.subject || '') + '" style="font-size:13px;padding:8px 16px;">' +
            'START THIS BLOCK &rarr;' +
          '</button>' +
          '<button class="btn' + (dk ? ' ghost' : '') + '" id="sched-mark-today-btn" style="font-size:13px;padding:8px 16px;">' +
            (dk ? '✓ Day completed (undo)' : 'Mark today complete') +
          '</button>' +
        '</div>' +
      '</div>' +

      // All Scheduled Blocks for Today
      '<div class="blocks" style="margin-top:14px;">';

    plan.blocks.forEach(function(b) {
      var isSpecial = (b.type === 'transit');
      html += '<div class="block' + (isSpecial ? ' psi' : '') + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span class="t">' + esc(b.slot) + '</span>' +
          '<span style="font-family:var(--f-mono);font-size:10.5px;color:var(--ink-faint);background:var(--surface);padding:1px 6px;border-radius:4px;">' + esc(b.badge) + '</span>' +
        '</div>' +
        '<strong style="font-size:14px;color:var(--ink);line-height:1.35;margin-top:2px;">' + esc(b.title) + '</strong>' +
        '<span class="c" style="font-size:12.5px;color:var(--ink-soft);line-height:1.45;">' + esc(b.description) + '</span>' +
      '</div>';
    });

    html += '</div></div>';
    containerEl.innerHTML = html;

    // Bind event handlers
    if (typeof document !== 'undefined') {
      var self = this;
      var actBtn = document.getElementById('sched-action-btn');
      if (actBtn) {
        actBtn.onclick = function() {
          var action = actBtn.getAttribute('data-action');
          var subj = actBtn.getAttribute('data-subject');

          if (root.PSI_APP && root.PSI_APP.showPsiView) {
            window.location.hash = 'psi-trainer';
            root.PSI_APP.showPsiView();

            if (action === 'diagnostic') {
              root.PSI_APP.ui.startSession('diagnostic');
            } else if (action === 'revision') {
              root.PSI_APP.ui.startSession('revision', { count: 20 });
            } else if (action === 'mistakes') {
              root.PSI_APP.ui.startSession('mistakes', { count: 15 });
            } else if (action === 'metro40') {
              root.PSI_APP.ui.startSession('metro40');
            } else if (subj) {
              root.PSI_APP.ui.startSession('practice', { subject: subj, count: 15 });
            } else {
              root.PSI_APP.ui.startSession('practice', { count: 15 });
            }
          }
        };
      }

      var markBtn = document.getElementById('sched-mark-today-btn');
      if (markBtn) {
        markBtn.onclick = function() {
          if (self.storage && typeof self.storage.toggleCDSHabitDay === 'function') {
            self.storage.toggleCDSHabitDay(tk);
            self.renderTodayCard(containerEl);
            // Sync with old dashboard state if present
            if (typeof root.touch === 'function') root.touch();
          }
        };
      }
    }
  };

  root.GoalScheduler = GoalScheduler;
})(typeof window !== 'undefined' ? window : this);
