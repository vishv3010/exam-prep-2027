/**
 * Gujarat Police PSI Preparation Engine - User Interface Controller
 * Provides an action-first home screen, progressive beginner foundation flow,
 * simplified 5-tab navigation (Home, Practice, Revision, PYQ, Progress),
 * genuinely sticky mobile quiz footer, safe timer lifecycle, and sanitized imports.
 */
(function(root) {
  'use strict';

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Synthesized Web Audio API sound generator (Zero external files, 100% offline)
  var soundFx = {
    ctx: null,
    muted: false,
    init: function() {
      if (!this.ctx && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
        try {
          var AudioCtx = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioCtx();
        } catch (e) {}
      }
    },
    playCorrect: function() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        var osc = this.ctx.createOscillator();
        var gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } catch (e) {}
    },
    playWrong: function() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        var osc = this.ctx.createOscillator();
        var gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(175, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.14);
      } catch (e) {}
    },
    playTap: function() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        var osc = this.ctx.createOscillator();
        var gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }
  };

  // Tactile Haptic Vibration Feedback for one-handed standing transit
  function triggerHaptic(type) {
    if (typeof navigator !== 'undefined' && navigator && typeof navigator.vibrate === 'function') {
      try {
        if (type === 'correct') {
          navigator.vibrate(20);
        } else if (type === 'wrong') {
          navigator.vibrate([35, 45, 35]);
        } else if (type === 'opt_e' || type === 'skip') {
          navigator.vibrate(12);
        } else {
          navigator.vibrate(8);
        }
      } catch (e) {}
    }
  }

  function PSIUI(container, engine, storage, bank, srs, config) {
    this.container = container;
    this.engine = engine;
    this.storage = storage;
    this.bank = bank;
    this.srs = srs;
    this.config = config || root.PSI_EXAM_CONFIG;

    this.currentTab = 'home'; // 'home' | 'practice' | 'revision' | 'pyq' | 'progress' | 'quiz' | 'learn' | 'summary' | 'diagnostic_summary' | 'lexicon_flashcards'
    this.currentLessonId = null;
    this.showReflection = false;
    this.lang = (this.storage.getPreferences && this.storage.getPreferences().language) || 'gu';
    this.timerInterval = null;
    this.wakeLock = null;
    this.soundEnabled = true;
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;

    this.init();
  }

  PSIUI.prototype.init = function() {
    this.render();
    this.bindGlobalEvents();
    this.setupLifecycleHooks();
  };

  PSIUI.prototype.setupLifecycleHooks = function() {
    var self = this;
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      // Pause timer and save session when tab is hidden or page unloaded
      window.addEventListener('beforeunload', function() {
        if (self.currentTab === 'quiz') {
          self.stopMetroTimer();
        }
      });
    }

    if (typeof document !== 'undefined' && typeof document.addEventListener === 'function' && 'visibilityState' in document) {
      document.addEventListener('visibilitychange', function() {
        if (document.hidden && self.currentTab === 'quiz') {
          self.stopMetroTimer();
        }
      });
    }
  };

  PSIUI.prototype.setLanguage = function(lang) {
    this.lang = lang;
    this.storage.setPreference('language', lang);
    if (this.currentTab === 'quiz') {
      // Re-render question stem and options without touching the timer or answer state
      this.renderQuizQuestion();
    } else {
      this.render();
    }
  };

  PSIUI.prototype.switchTab = function(tab, extraParam) {
    if (this.currentTab === 'quiz' && tab !== 'quiz') {
      this.stopMetroTimer();
    }
    this.currentTab = tab;
    if (tab === 'learn') {
      this.currentLessonId = extraParam || null;
      this.showReflection = false;
    }
    this.render();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  PSIUI.prototype.render = function() {
    if (!this.container) return;

    var headerHtml = this.renderHeader();
    var navHtml = this.renderNav();
    var bodyHtml = '';

    switch (this.currentTab) {
      case 'home':
        bodyHtml = this.renderHomeScreen();
        break;
      case 'practice':
        bodyHtml = this.renderPracticeScreen();
        break;
      case 'revision':
        bodyHtml = this.renderRevisionScreen();
        break;
      case 'pyq':
        bodyHtml = this.renderPYQScreen();
        break;
      case 'progress':
        bodyHtml = this.renderProgressScreen();
        break;
      case 'learn':
        bodyHtml = this.renderLessonView();
        break;
      case 'quiz':
        bodyHtml = '<div id="psi-quiz-mount"></div>';
        break;
      case 'summary':
        bodyHtml = this.renderSummaryScreen();
        break;
      case 'diagnostic_summary':
        bodyHtml = this.renderDiagnosticSummaryScreen();
        break;
      case 'lexicon_flashcards':
        bodyHtml = this.renderLexiconFlashcardScreen();
        break;
      default:
        bodyHtml = this.renderHomeScreen();
    }

    this.container.innerHTML = '<div class="psi-container">' + headerHtml + navHtml + bodyHtml + '</div>';

    if (this.currentTab === 'quiz') {
      this.mountQuiz();
    }
  };

  PSIUI.prototype.renderHeader = function() {
    var langToggle = '<div class="psi-lang-toggle" aria-label="Language selection">' +
      '<button class="psi-lang-btn' + (this.lang === 'gu' ? ' active' : '') + '" data-lang="gu">ગુજરાતી</button>' +
      '<button class="psi-lang-btn' + (this.lang === 'en' ? ' active' : '') + '" data-lang="en">English</button>' +
    '</div>';

    return '<div class="psi-header-bar">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
        '<button class="psi-back-dash-btn" id="psi-exit-to-dash" title="Return to CDS 2027 Dashboard">&larr; CDS 2027 Dashboard</button>' +
        '<span class="eyebrow" style="color:var(--accent);margin:0;font-size:11px;">Gujarat PSI 2027</span>' +
      '</div>' +
      langToggle +
    '</div>';
  };

  PSIUI.prototype.renderNav = function() {
    // Simplified 5-tab hierarchy: HOME, PRACTICE, REVISION, PYQ, PROGRESS
    var tabs = [
      { id: 'home', label: (this.lang === 'gu' ? 'મુખ્ય' : 'Home') },
      { id: 'practice', label: (this.lang === 'gu' ? 'પ્રેક્ટિસ' : 'Practice') },
      { id: 'revision', label: (this.lang === 'gu' ? 'રિવિઝન' : 'Revision') },
      { id: 'pyq', label: (this.lang === 'gu' ? 'PYQ' : 'PYQ') },
      { id: 'progress', label: (this.lang === 'gu' ? 'પ્રગતિ' : 'Progress') }
    ];

    var html = '<nav class="psi-nav" aria-label="PSI Module Navigation">';
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      var isActive = (this.currentTab === t.id) ||
        (t.id === 'practice' && this.currentTab === 'learn');
      html += '<button class="psi-nav-btn' + (isActive ? ' active' : '') + '" data-tab="' + t.id + '">' +
        t.label +
      '</button>';
    }
    html += '</nav>';
    return html;
  };

  /**
   * Action-First PSI Home Screen
   */
  PSIUI.prototype.renderHomeScreen = function() {
    var all = this.bank.getAll();
    var stats = this.storage.state.stats;
    var due = this.srs.filterDue(all, this.storage);
    var repeatedMistakes = this.srs.filterRepeatedMistakes(all, this.storage);
    var resumable = this.engine.getResumableSession();
    var mission = this.storage.getDailyMission();
    var foundationProgress = this.getFoundationProgress();

    // 1. Resumable session banner (Priority 0)
    var resumeHtml = '';
    if (resumable) {
      resumeHtml = '<div class="psi-resume-card">' +
        '<div class="psi-resume-info">' +
          '<h4>' + (this.lang === 'gu' ? 'અધૂરી સેશન ચાલુ રાખો' : 'Resume In-Progress Session') + '</h4>' +
          '<p>' + (this.lang === 'gu' ? 'પ્રશ્ન ' : 'Question ') + (resumable.currentIndex + 1) + ' / ' + resumable.questionIds.length +
            ' &middot; ' + (resumable.mode === 'metro40' ? 'Metro Drill' : escapeHtml(resumable.mode)) + '</p>' +
        '</div>' +
        '<button class="btn" id="psi-resume-btn">' + (this.lang === 'gu' ? 'શરૂ કરો &rarr;' : 'Resume &rarr;') + '</button>' +
      '</div>';
    }

    // Diagnostic baseline banner
    var diag = this.storage.getDiagnosticResult();
    var diagBannerHtml = '';
    if (diag) {
      var pScore = (typeof diag.overallPreparednessScore === 'number') ? diag.overallPreparednessScore : (diag.accuracy || 0);
      var bClass = pScore >= 75 ? 'mastered' : (pScore >= 45 ? 'practicing' : 'foundation');
      var bTitle = (this.lang === 'gu' && diag.overallLevelGu) ? diag.overallLevelGu : (diag.overallLevel || (pScore >= 75 ? 'Exam Ready' : (pScore >= 45 ? 'Developing' : 'Foundation')));
      diagBannerHtml = '<div class="psi-card" style="margin-bottom:14px;border-left:4px solid var(--accent);background:var(--surface);">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
          '<div>' +
            '<span class="eyebrow" style="color:var(--accent);background:var(--accent-soft);border-color:var(--accent-border);">DIAGNOSTIC BASELINE</span>' +
            '<div style="font-size:15px;font-weight:700;color:var(--ink);margin-top:2px;">' +
              (this.lang === 'gu' ? 'તૈયારી સ્કોર: ' : 'Preparedness Score: ') +
              '<span style="color:var(--accent);">' + pScore + ' / 100</span> &middot; ' +
              '<span class="psi-badge ' + bClass + '">' + escapeHtml(bTitle) + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;gap:8px;">' +
            '<button class="psi-pill-btn" data-tab="diagnostic_summary">' + (this.lang === 'gu' ? 'ઑડિટ રિપોર્ટ &rarr;' : 'View Audit &rarr;') + '</button>' +
            '<button class="psi-pill-btn" id="psi-check-level-btn">' + (this.lang === 'gu' ? 'રી-ટેસ્ટ' : 'Retake') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    } else {
      diagBannerHtml = '<div class="psi-card" style="margin-bottom:14px;border-left:4px solid var(--brass);background:var(--surface);">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">' +
          '<div>' +
            '<span class="eyebrow" style="color:var(--brass);border-color:var(--brass-border);background:var(--brass-soft);">RECOMMENDED FIRST STEP</span>' +
            '<div style="font-size:15px;font-weight:700;color:var(--ink);margin-top:2px;">' +
              (this.lang === 'gu' ? 'પ્રારંભિક ડાયગ્નોસ્ટિક એસેસમેન્ટ (૨૫ પ્રશ્નો)' : 'Baseline Diagnostic Assessment (25 Questions)') +
            '</div>' +
            '<div style="font-size:12.5px;color:var(--ink-soft);margin-top:2px;">' +
              (this.lang === 'gu' ? 'ગણિત, રીઝનિંગ, અંગ્રેજી, સામાન્ય જ્ઞાન અને ગુજરાત GK નું સચોટ કેલિબ્રેશન' : 'Calibrate your preparation baseline across Maths, Reasoning, English, Constitution & Gujarat GK') +
            '</div>' +
          '</div>' +
          '<button class="btn" id="psi-check-level-btn" style="padding:6px 14px;font-size:13px;white-space:nowrap;">' +
            (this.lang === 'gu' ? 'ટેસ્ટ શરૂ કરો &rarr;' : 'Start Test &rarr;') +
          '</button>' +
        '</div>' +
      '</div>';
    }

    // 2. Determine user profile state: Beginner vs Progressed
    var isBeginner = (stats.attempted === 0 && foundationProgress.completedCount === 0) ||
      (this.storage.getUserProfile().level === 'foundation' && stats.attempted < 10);

    var mainCardHtml = '';
    if (isBeginner) {
      // ---------------- COMPLETE BEGINNER EXPERIENCE ----------------
      var nextTopic = foundationProgress.nextModule || {
        code: '01',
        title_en: 'Constitution basics',
        title_gu: 'ભારતીય બંધારણ પાયાના કોન્સેપ્ટ',
        lessonId: 'lesson_const_fr'
      };
      var topicTitle = (this.lang === 'gu') ? nextTopic.title_gu : nextTopic.title_en;

      mainCardHtml = '<div class="psi-hero-card">' +
        '<span class="eyebrow" style="color:var(--accent);">PSI FOUNDATION &middot; STEP 1</span>' +
        '<h2>' + (this.lang === 'gu' ? 'તમે પાયાથી શરૂ કરી રહ્યા છો.' : "You're starting from zero.") + '</h2>' +
        '<p style="font-size:14.5px;color:var(--ink-soft);">' +
          (this.lang === 'gu'
            ? 'સૌપ્રથમ પાયાના વિષયો સમજો, ત્યારબાદ વિષયવાર પ્રશ્નોની પ્રેક્ટિસ કરો.'
            : 'Build core understanding through short lessons first, then practice topic MCQs.') +
        '</p>' +
        '<div class="psi-rec-card" style="margin-top:10px;">' +
          '<span class="eyebrow">' + (this.lang === 'gu' ? 'આજનો વિષય' : "Today's Focus") + '</span>' +
          '<span class="rec-title">' + nextTopic.code + ' ' + escapeHtml(topicTitle) + '</span>' +
          '<p style="font-size:12.5px;color:var(--ink-soft);margin:4px 0 0;">' +
            (this.lang === 'gu' ? 'અંદાજિત સમય: ~૨૦ મિનિટ' : 'Estimated time: ~20 mins') +
          '</p>' +
          '<button class="psi-btn-metro" id="psi-learn-topic-btn" data-lesson-id="' + (nextTopic.lessonId || 'lesson_const_fr') + '" style="margin-top:10px;">' +
            '<span>' + (this.lang === 'gu' ? 'આ વિષય શીખો &rarr;' : 'LEARN THIS TOPIC &rarr;') + '</span>' +
            '<span class="sub">' + nextTopic.code + ' ' + escapeHtml(topicTitle) + '</span>' +
          '</button>' +
        '</div>' +
        '<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">' +
          '<button class="btn ghost" id="psi-practice-foundation-mcqs-btn" style="flex:1;">' +
            (this.lang === 'gu' ? 'ટોપિક MCQs પ્રેક્ટિસ (૫-૧૦)' : 'Practice Topic MCQs') +
          '</button>' +
          '<button class="btn ghost" id="psi-check-level-btn" style="flex:1;">' +
            (this.lang === 'gu' ? 'ડાયગ્નોસ્ટિક ટેસ્ટ (૨૫ પ્રશ્નો)' : 'Diagnostic Assessment (25 Q)') +
          '</button>' +
        '</div>' +
        '<div class="psi-progress-subtext" style="margin-top:12px;font-family:var(--f-mono);font-size:12px;color:var(--ink-faint);">' +
          (this.lang === 'gu' ? 'ફાઉન્ડેશન પ્રગતિ: ' : 'Foundation Progress: ') +
          foundationProgress.completedCount + ' / ' + foundationProgress.totalCount + ' ' +
          (this.lang === 'gu' ? 'વિષયો પૂર્ણ' : 'topics covered') +
        '</div>' +
      '</div>';
    } else {
      // ---------------- ACTIVE / PREPARED LEARNER EXPERIENCE ----------------
      var recTitle = '';
      var recReason = '';
      var recActionId = '';
      var recActionLabel = '';

      if (due.length > 0) {
        recTitle = (this.lang === 'gu' ? 'રિવિઝન કાર્ડ્સ બાકી છે' : 'Due Revision Review');
        recReason = due.length + (this.lang === 'gu' ? ' કાર્ડ્સનું રિવિઝન કરવાનો સમય થયો છે.' : ' spaced repetition cards are due today.');
        recActionId = 'psi-due-btn';
        recActionLabel = (this.lang === 'gu' ? 'રિવિઝન શરૂ કરો (' + due.length + ') &rarr;' : 'START RECOMMENDED &rarr;');
      } else if (repeatedMistakes.length > 0) {
        recTitle = (this.lang === 'gu' ? 'વારંવાર થતી ભૂલો સુધારો' : 'Fix Repeated Mistakes');
        recReason = repeatedMistakes.length + (this.lang === 'gu' ? ' ભૂલો ૨ કે તેથી વધુ વાર પુનરાવર્તિત થઈ છે.' : ' questions have 2+ repeat mistakes.');
        recActionId = 'psi-drill-mistakes-btn';
        recActionLabel = (this.lang === 'gu' ? 'ભૂલો સુધારો &rarr;' : 'START RECOMMENDED &rarr;');
      } else if (foundationProgress.nextModule && foundationProgress.nextModule.lessonId) {
        var nMod = foundationProgress.nextModule;
        var nTitle = (this.lang === 'gu') ? nMod.title_gu : nMod.title_en;
        recTitle = nMod.code + ' ' + nTitle;
        recReason = (this.lang === 'gu' ? 'આગળનો ફાઉન્ડેશન કોન્સેપ્ટ સમજો.' : 'Next foundation lesson in syllabus queue.');
        recActionId = 'psi-learn-topic-btn';
        recActionLabel = (this.lang === 'gu' ? 'શીખવું ચાલુ રાખો &rarr;' : 'START RECOMMENDED &rarr;');
      } else {
        recTitle = (this.lang === 'gu' ? 'મેટ્રો પ્રેક્ટિસ સેશન' : 'Metro Transit Practice');
        recReason = (this.lang === 'gu' ? 'તમારો પાયો તૈયાર છે. સ્પીડ અને એક્યુરેસી વધારો.' : 'Foundation ready. Train transit speed and accuracy.');
        recActionId = 'psi-start-metro-btn';
        recActionLabel = (this.lang === 'gu' ? 'મેટ્રો પ્રેક્ટિસ શરૂ કરો &rarr;' : 'START RECOMMENDED &rarr;');
      }

      mainCardHtml = '<div class="psi-hero-card">' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;">' +
          '<span class="eyebrow" style="color:var(--accent);">' +
            (this.lang === 'gu' ? 'આજની ભલામણ' : "TODAY'S RECOMMENDATION") +
          '</span>' +
          '<span class="eyebrow" style="color:var(--brass);">' +
            (foundationProgress.completedCount >= 5 ? 'METRO READY' : 'PREPARING') +
          '</span>' +
        '</div>' +
        '<h2>' + escapeHtml(recTitle) + '</h2>' +
        '<p style="font-size:14px;color:var(--ink-soft);margin-top:2px;">' + escapeHtml(recReason) + '</p>' +
        '<button class="psi-btn-metro" id="' + recActionId + '" style="margin-top:12px;">' +
          '<span>' + recActionLabel + '</span>' +
          '<span class="sub">' + escapeHtml(recTitle) + '</span>' +
        '</button>' +
        '<div style="border-top:1px solid var(--line-soft);padding-top:12px;margin-top:14px;">' +
          '<button class="psi-btn-secondary" id="psi-start-metro-btn">' +
            '<span>' + (this.lang === 'gu' ? 'મેટ્રો પ્રેક્ટિસ (' + all.length + ' પ્રશ્નો ઉપલબ્ધ)' : 'METRO 40 DRILL (' + all.length + ' questions available)') + '</span>' +
            '<span>&rarr;</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }

    // Daily Mission Card
    var missionHtml = this.renderDailyMissionCard(mission);

    return resumeHtml + diagBannerHtml + mainCardHtml + missionHtml;
  };

  /**
   * Practice Screen: Scalable Foundation Modules & Metro Drills
   */
  PSIUI.prototype.renderPracticeScreen = function() {
    var self = this;
    var all = this.bank.getAll();
    var foundationModules = (this.config.foundationModules) || [];
    var lessonBank = root.PSI_LESSON_BANK;

    var modulesHtml = foundationModules.map(function(mod) {
      var mTitle = (self.lang === 'gu') ? mod.title_gu : mod.title_en;
      var hasLesson = Boolean(mod.lessonId && lessonBank && lessonBank.getById(mod.lessonId));
      var isCompleted = hasLesson && self.storage.isLessonCompleted(mod.lessonId);
      var mastery = self.engine.getTopicMastery(mod.subject, mod.topic);

      var badgeText = isCompleted ? 'COMPLETED' : (mod.isPlaceholder ? 'SCAFFOLD 2027' : mastery.status);
      var badgeCls = isCompleted ? 'psi-badge mastered' : (mod.isPlaceholder ? 'psi-badge' : ('psi-badge ' + mastery.status.toLowerCase().replace(/\s+/g, '-')));

      var actionBtn = '';
      if (hasLesson) {
        actionBtn = '<button class="psi-pill-btn" data-open-lesson="' + mod.lessonId + '">' +
          (isCompleted ? 'Review &rarr;' : 'Learn &rarr;') +
        '</button>';
      } else {
        actionBtn = '<button class="psi-pill-btn" data-drill-topic="' + mod.subject + '::' + mod.topic + '">' +
          'Practice &rarr;' +
        '</button>';
      }

      var hintText = mod.isPlaceholder
        ? '<span style="font-size:11px;color:var(--ink-faint);">Structural scaffold &middot; Official 2027 syllabus verification pending</span>'
        : ('<span style="font-size:11px;color:var(--ink-faint);">' + mastery.attempts + ' attempts &middot; ' + mastery.accuracy + '% accuracy</span>');

      return '<div class="psi-topic-row">' +
        '<div class="psi-topic-info">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">' +
            '<span class="psi-topic-title"><strong>' + mod.code + '</strong> ' + escapeHtml(mTitle) + '</span>' +
            '<span class="' + badgeCls + '">' + badgeText + '</span>' +
          '</div>' +
          hintText +
        '</div>' +
        actionBtn +
      '</div>';
    }).join('');

    return '<div class="psi-hero-card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<h3>' + (this.lang === 'gu' ? 'પાયાના વિષયો અને પ્રેક્ટિસ' : 'Foundation & Topic Practice') + '</h3>' +
      '</div>' +
      '<p class="hint">' +
        (this.lang === 'gu'
          ? 'દરેક વિષય સમજો અને પાંચ પ્રશ્નોથી સમજ ચકાસો.'
          : 'Work through the 7 foundation modules sequentially, then test recall.') +
      '</p>' +
      '<div class="psi-syllabus-group">' + modulesHtml + '</div>' +
      '<div style="border-top:1px solid var(--line-soft);padding-top:14px;margin-top:14px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span class="eyebrow" style="color:var(--accent);">' + (this.lang === 'gu' ? 'વહીવટી શબ્દાવલી &middot; ૧૫ શબ્દો' : 'ADMINISTRATIVE LEXICON &middot; 15 TERMS') + '</span>' +
          '<span class="psi-badge" style="background:var(--accent-soft);color:var(--accent);">PAPER 2 SYNERGY</span>' +
        '</div>' +
        '<h4 style="margin:4px 0 2px;font-size:15px;color:var(--ink);">' +
          (this.lang === 'gu' ? 'ગુજરાત વહીવટી અને કાયદાકીય પારિભાષિક શબ્દાવલી' : 'Gujarat Administrative & Legal Lexicon') +
        '</h4>' +
        '<p style="font-size:12.5px;color:var(--ink-soft);margin:0 0 10px;line-height:1.4;">' +
          (this.lang === 'gu'
            ? 'અધિકૃત દ્વિભાષી ભાષાંતરો (દા.ત. Cognizable Offence &rarr; પોલીસ અધિકારનો ગુનો, Charge sheet, Inquest, Remand).'
            : 'Master official bilingual translations (e.g. Cognizable Offence &rarr; પોલીસ અધિકારનો ગુનો, Charge sheet, Inquest, Remand).') +
        '</p>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
          '<button class="btn" id="psi-open-lexicon-flashcards-btn" style="flex:1;min-width:140px;font-size:13px;padding:8px 12px;">' +
            '🗂 ' + (this.lang === 'gu' ? 'ફ્લેશકાર્ડ્સ (યાદશક્તિ ચકાસો)' : 'Flashcards (Flip & Recall)') +
          '</button>' +
          '<button class="btn ghost" id="psi-start-lexicon-sprint-btn" style="flex:1;min-width:140px;font-size:13px;padding:8px 12px;">' +
            '⚡ ' + (this.lang === 'gu' ? '૧૫ પ્રશ્નો ક્વિઝ' : '15-Q MCQ Sprint') +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div style="border-top:1px solid var(--line-soft);padding-top:14px;margin-top:14px;">' +
        '<span class="eyebrow" style="color:var(--accent);">' + (this.lang === 'gu' ? 'મેટ્રો સેશન' : 'METRO TRANSIT DRILLS') + '</span>' +
        '<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">' +
          '<button class="psi-btn-metro" id="psi-start-metro-btn">' +
            '<span>' + (this.lang === 'gu' ? 'મેટ્રો પ્રેક્ટિસ શરૂ કરો' : 'START METRO PRACTICE') + '</span>' +
            '<span class="sub">' + all.length + ' ' + (this.lang === 'gu' ? 'પ્રશ્નો ઉપલબ્ધ &middot; ૪૦ મિનિટ' : 'questions available &middot; 40 min timer') + '</span>' +
          '</button>' +
          '<button class="btn ghost" id="psi-check-level-btn" style="text-align:center;">' +
            (this.lang === 'gu' ? 'લેવલ ડાયગ્નોસ્ટિક ટેસ્ટ (૨૫ પ્રશ્નો)' : 'Diagnostic Assessment (25 Questions)') +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  /**
   * Actionable Revision Screen (Due Today, Repeated Mistakes, Marked, Recently Wrong)
   */
  PSIUI.prototype.renderRevisionScreen = function() {
    var all = this.bank.getAll();
    var due = this.srs.filterDue(all, this.storage);
    var repeated = this.srs.filterRepeatedMistakes(all, this.storage);
    var marked = this.srs.filterMarked(all, this.storage);
    var recentMistakes = this.srs.filterRecentMistakes(all, this.storage);

    var isAllEmpty = (due.length === 0 && repeated.length === 0 && marked.length === 0 && recentMistakes.length === 0);

    if (isAllEmpty) {
      return '<div class="psi-hero-card">' +
        '<h3>' + (this.lang === 'gu' ? 'રિવિઝન અને ભૂલ સુધારણા' : 'Revision & Mistakes') + '</h3>' +
        '<div style="padding:24px 0;text-align:center;">' +
          '<p style="font-size:16px;font-weight:600;color:var(--good);">' +
            (this.lang === 'gu' ? '✓ અત્યારે કોઈ રિવિઝન બાકી નથી!' : '✓ Nothing is due yet. You are completely caught up!') +
          '</p>' +
          '<p class="hint" style="margin-top:4px;">' +
            (this.lang === 'gu' ? 'નવા પ્રશ્નો સોલ્વ કરો જેથી રિવિઝન કાર્ડ્સ ઉમેરાય.' : 'Solve new practice questions to populate your spaced repetition deck.') +
          '</p>' +
          '<div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;">' +
            '<button class="btn" data-tab="practice">' + (this.lang === 'gu' ? 'ફાઉન્ડેશન શરૂ કરો' : 'Start Foundation') + '</button>' +
            '<button class="btn ghost" id="psi-start-metro-btn">' + (this.lang === 'gu' ? 'નવા પ્રશ્નો પ્રેક્ટિસ કરો' : 'Practice Questions') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    return '<div class="psi-hero-card">' +
      '<h3>' + (this.lang === 'gu' ? 'રિવિઝન અને ભૂલ સુધારણા' : 'Spaced Repetition & Mistakes') + '</h3>' +
      '<p class="hint">' + (this.lang === 'gu' ? 'દરેક વિભાગ સીધો શરૂ કરી શકાય છે.' : 'Every section provides an immediate action. No dead ends.') + '</p>' +
      
      // 1. DUE TODAY
      '<div class="psi-rev-section">' +
        '<div class="psi-rev-head">' +
          '<div>' +
            '<strong>' + (this.lang === 'gu' ? '૧. આજે રિવિઝન બાકી' : '1. Due Today (Spaced Repetition)') + '</strong>' +
            '<span class="psi-rev-count">' + due.length + ' ' + (this.lang === 'gu' ? 'કાર્ડ્સ' : 'cards') + '</span>' +
          '</div>' +
          (due.length > 0
            ? '<button class="btn" id="psi-drill-due-btn">' + (this.lang === 'gu' ? 'રિવિઝન કરો (' + due.length + ')' : 'Review Now (' + due.length + ')') + '</button>'
            : '<span style="font-size:12px;color:var(--good);font-weight:600;">✓ Caught up</span>') +
        '</div>' +
      '</div>' +

      // 2. REPEATED MISTAKES
      '<div class="psi-rev-section">' +
        '<div class="psi-rev-head">' +
          '<div>' +
            '<strong>' + (this.lang === 'gu' ? '૨. વારંવાર થતી ભૂલો' : '2. Repeated Mistakes (2+ fails)') + '</strong>' +
            '<span class="psi-rev-count">' + repeated.length + ' ' + (this.lang === 'gu' ? 'પ્રશ્નો' : 'questions') + '</span>' +
          '</div>' +
          (repeated.length > 0
            ? '<button class="btn alert" id="psi-drill-mistakes-btn">' + (this.lang === 'gu' ? 'ભૂલો સુધારો (' + repeated.length + ')' : 'Drill Mistakes (' + repeated.length + ')') + '</button>'
            : '<span style="font-size:12px;color:var(--good);font-weight:600;">✓ No repeated leaks</span>') +
        '</div>' +
      '</div>' +

      // 3. MARKED QUESTIONS
      '<div class="psi-rev-section">' +
        '<div class="psi-rev-head">' +
          '<div>' +
            '<strong>' + (this.lang === 'gu' ? '૩. બુકમાર્ક કરેલા પ્રશ્નો' : '3. Marked Questions') + '</strong>' +
            '<span class="psi-rev-count">' + marked.length + ' ' + (this.lang === 'gu' ? 'પ્રશ્નો' : 'saved') + '</span>' +
          '</div>' +
          (marked.length > 0
            ? '<button class="btn ghost" id="psi-drill-marked-btn">' + (this.lang === 'gu' ? 'બુકમાર્ક તપાસો (' + marked.length + ')' : 'Review Marked (' + marked.length + ')') + '</button>'
            : '<span style="font-size:12px;color:var(--ink-faint);">None saved</span>') +
        '</div>' +
      '</div>' +

      // 4. RECENTLY WRONG
      '<div class="psi-rev-section">' +
        '<div class="psi-rev-head">' +
          '<div>' +
            '<strong>' + (this.lang === 'gu' ? '૪. તાજેતરમાં ખોટા પડેલા' : '4. Recently Wrong') + '</strong>' +
            '<span class="psi-rev-count">' + recentMistakes.length + ' ' + (this.lang === 'gu' ? 'પ્રશ્નો' : 'logged') + '</span>' +
          '</div>' +
          (recentMistakes.length > 0
            ? '<button class="btn ghost" id="psi-drill-recent-wrong-btn">' + (this.lang === 'gu' ? 'તાજા ખોટા સોલ્વ કરો' : 'Review Wrong') + '</button>'
            : '<span style="font-size:12px;color:var(--good);font-weight:600;">✓ Clean record</span>') +
        '</div>' +
      '</div>' +
    '</div>';
  };

  /**
   * PYQ Screen
   */
  PSIUI.prototype.renderPYQScreen = function() {
    var pyqs = this.bank.filterBySourceType('PYQ_OFFICIAL').concat(this.bank.filterBySourceType('PYQ_REPRODUCED'));

    return '<div class="psi-hero-card">' +
      '<span class="eyebrow" style="color:var(--accent);">GUJARAT POLICE RECRUITMENT BOARD</span>' +
      '<h3>' + (this.lang === 'gu' ? 'ગત વર્ષોના પ્રશ્નો (PYQ)' : 'Previous Year Questions (PYQ)') + '</h3>' +
      '<p class="hint">' +
        (this.lang === 'gu'
          ? 'GPRB PSI પરીક્ષા ૨૦૨૧-૨૨ પેપર-૧ ના પ્રમાણિત પ્રશ્નો.'
          : 'Verified previous questions from GPRB PSI Cadre examination 2021-2022 Paper 1.') +
      '</p>' +
      '<div class="psi-stats-row">' +
        '<div class="psi-stat-box"><span class="num">' + pyqs.length + '</span><span class="lbl">' + (this.lang === 'gu' ? 'પ્રમાણિત પ્રશ્નો' : 'Verified Items') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">2021</span><span class="lbl">' + (this.lang === 'gu' ? 'પરીક્ષા વર્ષ' : 'Exam Cycle') + '</span></div>' +
      '</div>' +
      '<button class="psi-btn-metro" id="psi-start-pyq-drill-btn" style="margin-top:14px;">' +
        '<span>' + (this.lang === 'gu' ? 'PYQ સેશન શરૂ કરો (' + pyqs.length + ' Q) &rarr;' : 'START PYQ DRILL (' + pyqs.length + ' Q) &rarr;') + '</span>' +
        '<span class="sub">GPRB PSI Prelims 2021</span>' +
      '</button>' +
    '</div>';
  };

  /**
   * Progress Screen: Minimal analytics and sanitized data management
   */
  PSIUI.prototype.renderProgressScreen = function() {
    var stats = this.storage.state.stats;
    var acc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
    var fProg = this.getFoundationProgress();
    var all = this.bank.getAll();
    var due = this.srs.filterDue(all, this.storage);
    var weakAreas = this.srs.evaluateWeakAreas(all, this.storage);

    var weakLabel = weakAreas.weakestTopic
      ? (weakAreas.weakestTopic.topic + ' (' + weakAreas.weakestTopic.accuracy + '%)')
      : 'None identified';

    return '<div class="psi-hero-card">' +
      '<h3>' + (this.lang === 'gu' ? 'તૈયારીની પ્રગતિ' : 'Preparation Progress') + '</h3>' +
      '<p class="hint">' + (this.lang === 'gu' ? 'સ્પષ્ટ અને વાસ્તવિક આંકડા.' : 'Focused study telemetry. No decorative vanity metrics.') + '</p>' +
      
      '<div class="psi-stats-row">' +
        '<div class="psi-stat-box"><span class="num">' + stats.attempted + '</span><span class="lbl">' + (this.lang === 'gu' ? 'પ્રશ્નો અટેમ્પ્ટ' : 'Questions Attempted') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">' + acc + '%</span><span class="lbl">' + (this.lang === 'gu' ? 'એક્યુરેસી' : 'Accuracy') + '</span></div>' +
      '</div>' +

      '<div class="psi-stats-row" style="margin-top:8px;">' +
        '<div class="psi-stat-box"><span class="num">' + fProg.completedCount + ' / ' + fProg.totalCount + '</span><span class="lbl">' + (this.lang === 'gu' ? 'ફાઉન્ડેશન પૂર્ણ' : 'Foundation Topics') + '</span></div>' +
        '<div class="psi-stat-box' + (due.length > 0 ? ' alert' : '') + '"><span class="num">' + due.length + '</span><span class="lbl">' + (this.lang === 'gu' ? 'રિવિઝન બાકી' : 'Revision Due') + '</span></div>' +
      '</div>' +

      '<div style="margin-top:14px;padding:12px;background:var(--ground);border:1px solid var(--line);border-radius:3px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;font-size:13px;">' +
          '<span style="font-weight:600;">' + (this.lang === 'gu' ? 'ધ્યાન આપવા જેવો વિષય:' : 'Topic Needing Work:') + '</span>' +
          '<span class="mono" style="color:var(--alert);font-weight:600;">' + escapeHtml(weakLabel) + '</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;font-size:13px;margin-top:6px;">' +
          '<span style="font-weight:600;">' + (this.lang === 'gu' ? 'Option E પસંદ કરેલ:' : 'Option E Marked:') + '</span>' +
          '<span class="mono">' + (stats.optionE || 0) + '</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;font-size:13px;margin-top:6px;">' +
          '<span style="font-weight:600;">' + (this.lang === 'gu' ? 'ખાલી (Blank) છોડેલ:' : 'Unattempted Blank:') + '</span>' +
          '<span class="mono">' + (stats.blank || 0) + '</span>' +
        '</div>' +
      '</div>' +

      // Dual-Target Preparation Balance (CDS IMA vs Gujarat PSI)
      '<div style="border-top:1px solid var(--line-soft);padding-top:14px;margin-top:14px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<h4 style="margin:0;font-size:15px;color:var(--ink);">' +
            (this.lang === 'gu' ? 'દ્વિ-લક્ષ્ય તૈયારી સંતુલન (૫૦/૫૦ વ્યૂહરચના)' : 'Dual-Target Synergy Balance (50/50 Strategy)') +
          '</h4>' +
        '</div>' +
        '<div style="margin-top:10px;display:flex;flex-direction:column;gap:8px;">' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;">' +
              '<span style="font-weight:600;color:var(--ink);">CDS I 2027 (IMA) &middot; Maths, English, Science</span>' +
              '<span class="mono" style="color:var(--accent);font-weight:700;">' + this.bank.filterByExam('CDS').length + ' Qs</span>' +
            '</div>' +
            '<div style="height:6px;background:var(--surface-2);border-radius:3px;overflow:hidden;">' +
              '<div style="width:' + Math.min(100, Math.round((this.bank.filterByExam('CDS').length / all.length) * 100)) + '%;height:100%;background:var(--accent);"></div>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;">' +
              '<span style="font-weight:600;color:var(--ink);">Gujarat Armed PSI &middot; Constitution, Gujarat GK, Lexicon</span>' +
              '<span class="mono" style="color:var(--brass);font-weight:700;">' + this.bank.filterByExam('PSI').length + ' Qs</span>' +
            '</div>' +
            '<div style="height:6px;background:var(--surface-2);border-radius:3px;overflow:hidden;">' +
              '<div style="width:' + Math.min(100, Math.round((this.bank.filterByExam('PSI').length / all.length) * 100)) + '%;height:100%;background:var(--brass);"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Physical Fitness (5 km PET Run Tracker)
      (function(self) {
        var cdsData = self.storage.getCDSHabits();
        var runs = (cdsData && Array.isArray(cdsData.runs)) ? cdsData.runs.slice().sort(function(a, b) { return a.d < b.d ? -1 : 1; }) : [];
        var latestRun = runs.length > 0 ? runs[runs.length - 1] : null;
        var latestSec = latestRun ? latestRun.v : 0;
        var isPetPass = latestSec > 0 && latestSec <= 1500;
        var petTag = latestRun
          ? (latestSec <= 1380
            ? '<span style="color:var(--good);font-weight:700;">Sub-23:00 (Comfortable Margin)</span>'
            : (isPetPass
              ? '<span style="color:var(--good);font-weight:700;">PET Qualifying Pass (&le; 25:00)</span>'
              : '<span style="color:var(--alert);font-weight:700;">Over 25:00 (Needs Aerobic Work)</span>'))
          : '<span style="color:var(--ink-faint);">No runs recorded yet</span>';

        return '<div style="border-top:1px solid var(--line-soft);padding-top:14px;margin-top:14px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<h4 style="margin:0;font-size:15px;color:var(--ink);">' +
              (self.lang === 'gu' ? 'શારીરિક દોડ (૫ કિમી PET ટ્રેકર)' : 'Physical Fitness (5 km PET Tracker)') +
            '</h4>' +
            '<span class="psi-badge" style="background:var(--brass-soft);color:var(--brass);border:1px solid var(--brass-border);">25:00 QUALIFYING</span>' +
          '</div>' +
          '<p class="hint" style="margin:4px 0 10px;">' +
            (self.lang === 'gu'
              ? 'ગુજરાત પોલીસ PSI PET ધોરણ: ૫૦૦૦ મીટર ૨૫:૦૦ મિનિટમાં. SSB માટે પણ જરૂરી.'
              : 'Gujarat Armed PSI PET Standard: 5000 m in 25:00 (5:00/km pace). Aerobic base builds SSB endurance.') +
          '</p>' +
          '<div style="padding:12px;background:var(--ground);border:1px solid var(--line);border-radius:var(--radius);">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">' +
              '<span style="font-weight:600;">' + (self.lang === 'gu' ? 'છેલ્લો ૫ કિમી સમય:' : 'Latest 5 km Trial:') + '</span>' +
              '<span class="mono" style="font-weight:700;font-size:15px;color:var(--ink);">' +
                (latestRun ? (Math.floor(latestSec / 60) + ':' + (latestSec % 60 < 10 ? '0' : '') + (latestSec % 60) + ' (' + latestRun.d + ')') : '--:--') +
              '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12.5px;margin-top:6px;">' +
              '<span style="color:var(--ink-soft);">' + (self.lang === 'gu' ? 'PET સ્ટેટસ:' : 'PET Status:') + '</span>' +
              petTag +
            '</div>' +
          '</div>' +
          '<div style="display:flex;gap:8px;margin-top:10px;align-items:center;">' +
            '<input type="text" id="psi-run-time-input" placeholder="mm:ss (e.g. 24:30)" style="flex:1;padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-family:var(--f-mono);font-size:13px;background:var(--surface);color:var(--ink);">' +
            '<button class="btn" id="psi-add-run-btn" style="padding:8px 14px;font-size:13px;white-space:nowrap;">' +
              (self.lang === 'gu' ? 'દોડ નોંધો' : 'Log 5 km Run') +
            '</button>' +
          '</div>' +
        '</div>';
      })(this) +

      '<div style="border-top:1px solid var(--line-soft);padding-top:14px;margin-top:14px;">' +
        '<h4>' + (this.lang === 'gu' ? 'ડેટા બેકઅપ અને ઇમ્પોર્ટ' : 'Data Management & Backup') + '</h4>' +
        '<p class="hint">' + (this.lang === 'gu' ? 'તમારો અભ્યાસ ડેટા સુરક્ષિત ડાઉનલોડ અથવા રિસ્ટોર કરો.' : 'Export or import your personal study progress as sanitized JSON.') + '</p>' +
        '<div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;">' +
          '<button class="btn ghost" id="psi-export-btn">' + (this.lang === 'gu' ? 'ડેટા એક્સપોર્ટ' : 'Export Progress') + '</button>' +
          '<button class="btn ghost" id="psi-import-btn">' + (this.lang === 'gu' ? 'ડેટા ઇમ્પોર્ટ' : 'Import Progress') + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  /**
   * Lesson View
   */
  PSIUI.prototype.renderLessonView = function() {
    var lessonBank = root.PSI_LESSON_BANK;
    var lesson = lessonBank ? lessonBank.getById(this.currentLessonId) : null;
    if (!lesson) {
      return '<div class="psi-hero-card"><p>Lesson not found.</p><button class="btn" data-tab="practice">Back to Practice</button></div>';
    }

    var title = (this.lang === 'gu') ? lesson.title_gu : lesson.title_en;
    var concept = (this.lang === 'gu') ? lesson.concept_gu : lesson.concept_en;
    var keyFacts = (this.lang === 'gu') ? lesson.key_facts_gu : lesson.key_facts_en;
    var remember = (this.lang === 'gu') ? lesson.remember_gu : lesson.remember_en;
    var examTrap = (this.lang === 'gu') ? lesson.exam_trap_gu : lesson.exam_trap_en;
    var quickCheck = (this.lang === 'gu') ? lesson.quick_check_gu : lesson.quick_check_en;
    var isDone = this.storage.isLessonCompleted(lesson.id);

    return '<div class="psi-lesson-card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<button class="psi-pill-btn" data-tab="practice">&larr; ' + (this.lang === 'gu' ? 'પ્રેક્ટિસ યાદી' : 'Practice List') + '</button>' +
        (isDone
          ? '<span class="psi-badge mastered">✓ ' + (this.lang === 'gu' ? 'પૂર્ણ થયેલ' : 'Completed') + '</span>'
          : '<span class="psi-badge foundation">Foundation</span>') +
      '</div>' +
      '<div class="psi-lesson-header" style="margin-top:10px;">' +
        '<h2>' + escapeHtml(title) + '</h2>' +
        '<div class="psi-lesson-meta">' +
          '<span>' + escapeHtml(lesson.subject) + ' &middot; ' + escapeHtml(lesson.topic) + '</span>' +
          '<span>Est: ' + lesson.estMinutes + ' mins</span>' +
        '</div>' +
      '</div>' +

      // CONCEPT
      '<div>' +
        '<span class="psi-section-title">Concept</span>' +
        '<div class="psi-concept-box">' + escapeHtml(concept) + '</div>' +
      '</div>' +

      // KEY FACTS
      '<div>' +
        '<span class="psi-section-title">Key Facts</span>' +
        '<ul class="psi-keyfacts-list">' +
          keyFacts.map(function(f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('') +
        '</ul>' +
      '</div>' +

      // REMEMBER
      '<div class="psi-remember-box">' +
        '<strong>★ Remember: </strong>' + escapeHtml(remember) +
      '</div>' +

      // EXAM TRAP
      '<div class="psi-examtrap-box">' +
        '<strong>⚠ Exam Trap: </strong>' + escapeHtml(examTrap) +
      '</div>' +

      // QUICK CHECK (Active recall toggle)
      '<div class="psi-quickcheck-box">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
          '<span style="font-weight:700;color:var(--ink);">🎯 Quick Reflection Check</span>' +
          '<button type="button" class="psi-pill-btn" id="psi-toggle-reflection" style="font-size:11px;padding:3px 8px;">' +
            (this.showReflection ? 'Hide Answer' : '👁️ Show Answer') +
          '</button>' +
        '</div>' +
        '<div id="psi-reflection-content" style="display:' + (this.showReflection ? 'block' : 'none') + ';line-height:1.5;">' +
          escapeHtml(quickCheck) +
        '</div>' +
        (!this.showReflection ? '<div id="psi-reflection-prompt" style="font-size:12.5px;color:var(--ink-faint);font-style:italic;">Can you recall the answer without peeking? Tap to check.</div>' : '') +
      '</div>' +

      // Transition to Practice
      '<div style="border-top:1px solid var(--line-soft);padding-top:14px;margin-top:10px;">' +
        '<button class="psi-btn-metro" id="psi-test-lesson-btn" data-lesson-id="' + lesson.id + '">' +
          '<span>' + (this.lang === 'gu' ? 'સમજ ચકાસો (૫ પ્રશ્નો) &rarr;' : 'TEST YOUR UNDERSTANDING (5 QUESTIONS) &rarr;') + '</span>' +
          '<span class="sub">' + (this.lang === 'gu' ? 'તરત જ પ્રશ્નો સોલ્વ કરો' : 'Solve topic practice questions') + '</span>' +
        '</button>' +
      '</div>' +
    '</div>';
  };

  /**
   * Question Screen UI & Quiz Lifecycle
   */
  PSIUI.prototype.startSession = function(mode, options) {
    this.engine.createSession(mode, options);
    this.currentTab = 'quiz';
    this.render();
  };

  PSIUI.prototype.mountQuiz = function() {
    var mount = document.getElementById('psi-quiz-mount');
    if (!mount) return;

    var session = this.engine.currentSession;
    if (!session || !session.questionIds || session.questionIds.length === 0) {
      mount.innerHTML = '<div class="psi-hero-card"><p>No questions found for this session.</p><button class="btn" data-tab="home">Back to Home</button></div>';
      return;
    }

    if (session.mode === 'metro40') {
      this.startMetroTimer();
      this.requestWakeLock();
    }

    this.renderQuizQuestion();
  };

  PSIUI.prototype.getSourceBadgeText = function(q) {
    if (q.sourceType === 'PYQ_OFFICIAL' || q.sourceType === 'PYQ_REPRODUCED') {
      return 'PYQ • ' + (q.sourceName || 'GPRB PSI') + (q.sourceYear ? (' • ' + q.sourceYear) : '');
    }
    if (q.sourceType === 'REFERENCE') {
      return 'REFERENCE • ' + (q.sourceName || 'Standard Textbook');
    }
    return 'AI PRACTICE';
  };

  PSIUI.prototype.renderQuizQuestion = function() {
    var mount = document.getElementById('psi-quiz-mount');
    if (!mount) return;

    var session = this.engine.currentSession;
    if (!session) return;

    var qId = session.questionIds[session.currentIndex];
    var q = this.bank.getById(qId);
    if (!q) return;

    var ans = session.answers[qId] || null;
    var isAnswered = (ans !== null && !ans.isBlank);
    var isMarked = this.storage.isMarked(qId);

    // Options rendering
    var opts = (this.lang === 'gu') ? q.options_gu : q.options_en;
    var optsHtml = '';
    var letters = ['A', 'B', 'C', 'D', 'E'];

    var scoringConfig = this.config.scoring || {};
    var useOptionE = (scoringConfig.useOptionE !== false);
    var optCount = useOptionE ? opts.length : Math.min(4, opts.length);

    for (var i = 0; i < optCount; i++) {
      var isOptE = (i === 4);
      var cls = 'psi-opt-btn';
      if (isOptE) cls += ' opt-e';

      if (isAnswered) {
        cls += ' disabled';
        if (i === q.answer) {
          cls += ' correct';
        } else if (ans.selectedIndex === i) {
          cls += ' wrong';
        }
      }

      var optLabel = opts[i];
      var optExtra = '';
      if (isOptE) {
        optExtra = ' <span class="psi-opt-badge-pill" style="font-size:10.5px;font-weight:700;color:var(--brass);background:var(--brass-soft);border:1px solid var(--brass-border);padding:2px 6px;border-radius:4px;margin-left:auto;">0 PENALTY</span>';
      }

      optsHtml += '<button class="' + cls + '" data-opt-idx="' + i + '">' +
        '<span class="opt-key">' + letters[i] + '</span>' +
        '<span style="flex:1;">' + escapeHtml(optLabel) + '</span>' +
        optExtra +
      '</button>';
    }

    // Feedback box & Error/Confidence triage (revealed after answer)
    var feedbackHtml = '';
    if (isAnswered) {
      var expText = (this.lang === 'gu') ? q.explanation_gu : q.explanation_en;
      var statusClass = ans.isOptionE ? 'opt-e' : (ans.isCorrect ? 'correct' : 'wrong');
      var statusMsg = ans.isOptionE
        ? (this.lang === 'gu' ? 'Option E પસંદ કર્યું (૦ પેનલ્ટી)' : 'Option E Selected (0 Penalty)')
        : (ans.isCorrect
          ? (this.lang === 'gu' ? '✓ સાચો જવાબ' : '✓ Correct Answer')
          : (this.lang === 'gu' ? '✗ ખોટો જવાબ' : '✗ Incorrect Answer'));

      var triageHtml = '';
      if (ans.isCorrect) {
        triageHtml = '<div class="psi-triage-row">' +
          '<span class="psi-triage-lbl">' + (this.lang === 'gu' ? 'વિશ્વાસ:' : 'Confidence:') + '</span>' +
          '<button class="psi-pill-btn' + (ans.confidence === 'confident' ? ' active' : '') + '" data-conf="confident">Confident</button>' +
          '<button class="psi-pill-btn' + (ans.confidence === 'unsure' ? ' active' : '') + '" data-conf="unsure">Unsure</button>' +
        '</div>';
      } else if (!ans.isOptionE) {
        triageHtml = '<div class="psi-triage-row" style="flex-wrap:wrap;gap:4px;">' +
          '<span class="psi-triage-lbl">' + (this.lang === 'gu' ? 'કારણ:' : 'Reason:') + '</span>' +
          '<button class="psi-pill-btn alert' + (ans.errorType === 'gap' ? ' active' : '') + '" data-err="gap">Gap (Didn\'t Know)</button>' +
          '<button class="psi-pill-btn alert' + (ans.errorType === 'slip' ? ' active' : '') + '" data-err="slip">Calculation Slip</button>' +
          '<button class="psi-pill-btn alert' + (ans.errorType === 'misread' ? ' active' : '') + '" data-err="misread">Misread</button>' +
          '<button class="psi-pill-btn alert' + (ans.errorType === 'time' ? ' active' : '') + '" data-err="time">Time Pressure</button>' +
          '<button class="psi-pill-btn alert' + (ans.errorType === 'guess' ? ' active' : '') + '" data-err="guess">Guessing</button>' +
        '</div>';
      }

      feedbackHtml = '<div class="psi-feedback-box ' + statusClass + '">' +
        '<strong>' + statusMsg + '</strong>' +
        '<div class="exp-text">' + escapeHtml(expText) + '</div>' +
        triageHtml +
      '</div>';
    }

    // Optional Gujarati glossary drawer
    var glossaryHtml = '';
    var hasGlossary = (q.glossary && q.glossary.length > 0);
    if (hasGlossary) {
      glossaryHtml = '<div id="psi-glossary-drawer" class="psi-glossary-box" style="display:none;margin-top:8px;">' +
        q.glossary.map(function(g) {
          return '<div><span class="term">' + escapeHtml(g.term) + '</span> &rarr; ' + escapeHtml(g.simple_gu) + ' (' + escapeHtml(g.en) + ')</div>';
        }).join('') +
      '</div>';
    }

    // Top metadata
    var isMetro = (session.mode === 'metro40' || session.mode === 'lexicon');
    var modeLabel = (session.mode === 'metro40')
      ? 'METRO 40'
      : (session.mode === 'lexicon'
        ? 'LEXICON SPRINT'
        : (session.mode === 'pyq'
          ? 'PYQ DRILL'
          : (session.mode === 'lesson_practice'
            ? 'LESSON PRACTICE'
            : (session.mode === 'diagnostic' ? 'DIAGNOSTIC ASSESSMENT' : 'PRACTICE'))));

    var timerDisplay = (session.mode === 'metro40')
      ? '<span class="psi-timer-badge" id="psi-timer-val">' + this.formatTime(session.timeRemainingSec || 2400) + '</span>'
      : '';

    var soundIcon = this.soundEnabled ? '🔊' : '🔇';
    var soundBtn = '<button class="psi-sound-toggle-btn" id="psi-sound-toggle-btn" title="Toggle audio cues" style="background:transparent;border:none;cursor:pointer;font-size:14px;padding:2px 4px;">' + soundIcon + '</button>';
    var offlineBadge = '<span class="psi-offline-pill" title="Local IndexedDB Active & Auto-Saved"><span class="psi-live-dot"></span> Offline Ready</span>';

    var diagSectionHtml = '';
    if (session.mode === 'diagnostic' && q.diagnosticSection) {
      diagSectionHtml = '<div style="background:var(--accent-soft);border:1px solid var(--accent-border);border-radius:6px;padding:6px 10px;margin:8px 0 10px;display:flex;justify-content:space-between;align-items:center;font-size:12px;">' +
        '<span style="font-weight:700;color:var(--accent);">SECTION ' + q.diagnosticSection + ' OF 5: ' + escapeHtml(q.diagnosticSectionName || '') + '</span>' +
        '<span style="font-family:var(--f-mono);font-size:11px;color:var(--ink-faint);">' + (q.exams ? q.exams.join(' & ') : 'CDS & PSI') + '</span>' +
      '</div>';
    }

    var sourceTagText = this.getSourceBadgeText(q);
    var questionText = (this.lang === 'gu') ? q.question_gu : q.question_en;
    var isLastQuestion = (session.currentIndex === session.questionIds.length - 1);

    mount.innerHTML = '<div class="psi-quiz-card' + (isMetro ? ' metro-mode-active' : '') + '">' +
      '<div class="psi-quiz-top">' +
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
          '<span class="psi-prog-label">' + modeLabel + ' &middot; Q ' + (session.currentIndex + 1) + '/' + session.questionIds.length + '</span>' +
          offlineBadge +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:6px;">' +
          timerDisplay +
          soundBtn +
        '</div>' +
      '</div>' +
      diagSectionHtml +
      '<span class="psi-source-tag">' + escapeHtml(sourceTagText) + '</span>' +
      '<div class="psi-question-text">' + escapeHtml(questionText) + '</div>' +
      glossaryHtml +
      '<div class="psi-options" id="psi-opts-list">' + optsHtml + '</div>' +
      feedbackHtml +
      // Genuinely Sticky Bottom Footer (accessible without scrolling on all screens)
      '<div class="psi-quiz-footer">' +
        '<div class="psi-action-left">' +
          '<button class="psi-icon-btn' + (isMarked ? ' marked' : '') + '" id="psi-mark-btn" title="Bookmark">' +
            (isMarked ? '★ Marked' : '☆ Mark') +
          '</button>' +
          (hasGlossary
            ? '<button class="psi-icon-btn" id="psi-glossary-btn" title="Explain Gujarati">📖</button>'
            : '') +
          '<button class="psi-icon-btn" id="psi-report-btn" title="Report issue">⚐</button>' +
        '</div>' +
        (isAnswered
          ? '<button class="psi-btn-next" id="psi-next-btn">' +
              (isLastQuestion ? (this.lang === 'gu' ? 'સેશન પૂર્ણ કરો &rarr;' : 'Finish Session &rarr;') : (this.lang === 'gu' ? 'આગળનો પ્રશ્ન &rarr;' : 'Next &rarr;')) +
            '</button>'
          : '<button class="psi-btn-skip" id="psi-skip-blank-btn">' +
              (this.lang === 'gu' ? 'ખાલી છોડો / Skip &rarr;' : 'Leave Blank / Skip &rarr;') +
            '</button>'
        ) +
      '</div>' +
    '</div>';
  };

  PSIUI.prototype.formatTime = function(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  };

  PSIUI.prototype.startMetroTimer = function() {
    this.stopMetroTimer(); // Prevent duplicate intervals
    var session = this.engine.currentSession;
    if (!session) return;

    var self = this;
    this.timerInterval = setInterval(function() {
      if (session.timeRemainingSec > 0) {
        session.timeRemainingSec--;
        var el = document.getElementById('psi-timer-val');
        if (el) {
          el.textContent = self.formatTime(session.timeRemainingSec);
          if (session.timeRemainingSec < 300) el.classList.add('warning');
        }
      } else {
        self.stopMetroTimer();
        self.finishQuizDueToTimeout();
      }
    }, 1000);
  };

  PSIUI.prototype.stopMetroTimer = function() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.engine && this.engine.currentSession) {
      this.engine.persistActiveSession();
    }
    this.releaseWakeLock();
  };

  PSIUI.prototype.finishQuizDueToTimeout = function() {
    alert(this.lang === 'gu' ? 'સમય પૂર્ણ થયો! સેશન સમાપ્ત થઈ રહ્યું છે.' : 'Time up! Metro 40 session completed.');
    var summary = this.engine.finishSession();
    this.switchTab('summary');
  };

  PSIUI.prototype.requestWakeLock = function() {
    var self = this;
    if (typeof navigator !== 'undefined' && navigator && 'wakeLock' in navigator && navigator.wakeLock && typeof navigator.wakeLock.request === 'function') {
      try {
        navigator.wakeLock.request('screen').then(function(sentinel) {
          self.wakeLock = sentinel;
        }).catch(function() {
          // Graceful fallback, no console errors
        });
      } catch (e) {
        // Graceful fallback
      }
    }
  };

  PSIUI.prototype.releaseWakeLock = function() {
    if (this.wakeLock && typeof this.wakeLock.release === 'function') {
      try {
        this.wakeLock.release().catch(function() {});
      } catch (e) {}
      this.wakeLock = null;
    }
  };

  PSIUI.prototype.speakCurrentQuestion = function() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    var session = this.engine.currentSession;
    if (!session) return;
    var q = this.bank.getById(session.questionIds[session.currentIndex]);
    if (!q) return;

    window.speechSynthesis.cancel();
    var text = (this.lang === 'gu') ? q.question_gu : q.question_en;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = (this.lang === 'gu') ? 'gu-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  PSIUI.prototype.getFoundationProgress = function() {
    var modules = this.config.foundationModules || [];
    var completed = 0;
    var nextMod = null;
    var self = this;

    for (var i = 0; i < modules.length; i++) {
      var m = modules[i];
      var isDone = m.lessonId ? self.storage.isLessonCompleted(m.lessonId) : false;
      if (isDone) {
        completed++;
      } else if (!nextMod && m.lessonId) {
        nextMod = m;
      }
    }

    if (!nextMod && modules.length > 0) {
      nextMod = modules[0];
    }

    return {
      completedCount: completed,
      totalCount: modules.length,
      nextModule: nextMod
    };
  };

  PSIUI.prototype.renderDailyMissionCard = function(mission) {
    var targets = (this.config.dailyMission) || { targetTopics: 1, targetQuestions: 15, targetMistakesReviewed: 3, targetSrsReviews: 5 };
    var t1 = mission.topicsLearned >= targets.targetTopics;
    var t2 = mission.questionsDone >= targets.targetQuestions;
    var t3 = mission.mistakesReviewed >= targets.targetMistakesReviewed;
    var t4 = mission.srsDone >= targets.targetSrsReviews;

    var doneCount = (t1 ? 1 : 0) + (t2 ? 1 : 0) + (t3 ? 1 : 0) + (t4 ? 1 : 0);

    return '<div class="psi-mission-card">' +
      '<div class="psi-mission-top">' +
        '<h4 style="margin:0;font-size:15px;color:var(--ink);">' +
          (this.lang === 'gu' ? 'આજનું મિશન' : "Today's PSI Mission") +
        '</h4>' +
        '<span class="eyebrow" style="color:var(--good);">' + doneCount + ' / 4 ' + (this.lang === 'gu' ? 'પૂર્ણ' : 'Completed') + '</span>' +
      '</div>' +
      '<div class="psi-mission-list">' +
        '<div class="psi-mission-item"><span class="psi-mission-check' + (t1 ? ' done' : '') + '">' + (t1 ? '✓' : '') + '</span><span>' +
          (this.lang === 'gu' ? '૧ ફાઉન્ડેશન વિષય સમજો (' : 'Learn 1 foundation topic (') + mission.topicsLearned + '/' + targets.targetTopics + ')</span></div>' +
        '<div class="psi-mission-item"><span class="psi-mission-check' + (t2 ? ' done' : '') + '">' + (t2 ? '✓' : '') + '</span><span>' +
          (this.lang === 'gu' ? '૧૫ પ્રશ્નો સોલ્વ કરો (' : 'Solve 15 questions (') + mission.questionsDone + '/' + targets.targetQuestions + ')</span></div>' +
        '<div class="psi-mission-item"><span class="psi-mission-check' + (t3 ? ' done' : '') + '">' + (t3 ? '✓' : '') + '</span><span>' +
          (this.lang === 'gu' ? '૩ ભૂલો તપાસો (' : 'Review 3 mistakes (') + mission.mistakesReviewed + '/' + targets.targetMistakesReviewed + ')</span></div>' +
        '<div class="psi-mission-item"><span class="psi-mission-check' + (t4 ? ' done' : '') + '">' + (t4 ? '✓' : '') + '</span><span>' +
          (this.lang === 'gu' ? '૫ રિવિઝન કાર્ડ્સ પૂર્ણ કરો (' : 'Complete 5 SRS due cards (') + mission.srsDone + '/' + targets.targetSrsReviews + ')</span></div>' +
      '</div>' +
    '</div>';
  };

  PSIUI.prototype.renderSummaryScreen = function() {
    var history = this.storage.state.history;
    var latest = history[0];
    if (!latest) return '<div class="psi-hero-card"><p>No session completed yet.</p><button class="btn" data-tab="home">Return to Home</button></div>';

    var scoreDisplay = (latest.score !== undefined) ? latest.score : 0;

    return '<div class="psi-summary-card">' +
      '<h3>' + (this.lang === 'gu' ? 'સેશન સમાપ્ત' : 'Session Completed') + '</h3>' +
      '<div class="psi-summary-grid">' +
        '<div class="psi-stat-box"><span class="num">' + latest.totalQuestions + '</span><span class="lbl">' + (this.lang === 'gu' ? 'કુલ પ્રશ્નો' : 'Total Questions') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">' + (latest.correct || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'સાચા (+૧)' : 'Correct') + '</span></div>' +
        '<div class="psi-stat-box alert"><span class="num">' + (latest.wrong || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'ખોટા (-૦.૨૫)' : 'Wrong (-0.25)') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">' + (latest.blank || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'Blank (-૦.૨૫)' : 'Blank (-0.25)') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">' + (latest.optionE || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'Option E (૦)' : 'Option E (0)') + '</span></div>' +
        '<div class="psi-stat-box' + (scoreDisplay < 0 ? ' alert' : '') + '"><span class="num">' + scoreDisplay + '</span><span class="lbl">' + (this.lang === 'gu' ? 'નેટ સ્કોર' : 'Net Score') + '</span></div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">' +
        '<button class="btn" data-tab="home">' + (this.lang === 'gu' ? 'મુખ્ય સ્ક્રીન પર પાછા &rarr;' : 'Return to Home &rarr;') + '</button>' +
        (latest.wrong > 0 ? '<button class="btn alert" data-tab="revision">' + (this.lang === 'gu' ? 'ભૂલો સુધારો' : 'Review Mistakes') + '</button>' : '') +
      '</div>' +
    '</div>';
  };

  PSIUI.prototype.renderDiagnosticSummaryScreen = function() {
    var diag = this.storage.getDiagnosticResult();
    if (!diag) {
      return '<div class="psi-hero-card">' +
        '<span class="eyebrow" style="color:var(--brass);">BASELINE REQUIRED</span>' +
        '<h2>' + (this.lang === 'gu' ? 'ડાયગ્નોસ્ટિક ટેસ્ટ પૂર્ણ થયેલ નથી' : 'No Diagnostic Completed Yet') + '</h2>' +
        '<p style="font-size:14px;color:var(--ink-soft);margin-top:6px;">' +
          (this.lang === 'gu' ? 'તમારો સાચો પ્રારંભિક લેવલ નક્કી કરવા માટે ૨૫ પ્રશ્નોનો કેલિબ્રેટેડ ટેસ્ટ આપો.' : 'Take the 25-question calibrated assessment to measure your baseline level across all 5 syllabus domains.') +
        '</p>' +
        '<button class="psi-btn-metro" id="psi-check-level-btn" style="margin-top:14px;">' +
          '<span>' + (this.lang === 'gu' ? 'ડાયગ્નોસ્ટિક ટેસ્ટ શરૂ કરો &rarr;' : 'START DIAGNOSTIC ASSESSMENT &rarr;') + '</span>' +
          '<span class="sub">25 Calibrated Questions &middot; Quant, Reasoning, English, GK, Gujarat</span>' +
        '</button>' +
      '</div>';
    }

    var prepScore = (typeof diag.overallPreparednessScore === 'number') ? diag.overallPreparednessScore : (diag.accuracy || 0);
    var levelColor = prepScore >= 75 ? 'var(--good)' : (prepScore >= 45 ? 'var(--accent)' : 'var(--brass)');
    var levelTitle = (this.lang === 'gu' && diag.overallLevelGu) ? diag.overallLevelGu : (diag.overallLevel || (prepScore >= 75 ? 'Exam Ready' : (prepScore >= 45 ? 'Developing' : 'Foundation')));
    var netScore = (typeof diag.netScore === 'number') ? diag.netScore : (diag.score || 0);
    var totalQs = diag.totalQuestions || diag.total || 25;

    // 1. Overall Hero Card with Preparedness Index (0-100)
    var html = '<div class="psi-summary-card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
        '<span class="eyebrow" style="color:var(--accent);background:var(--accent-soft);border-color:var(--accent-border);">DIAGNOSTIC AUDIT & READINESS REPORT</span>' +
        '<span class="psi-time-badge" style="font-family:var(--f-mono);font-size:12px;color:var(--ink-faint);">' + escapeHtml(diag.date || '') + '</span>' +
      '</div>' +
      '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-top:14px;flex-wrap:wrap;gap:12px;">' +
        '<div>' +
          '<h2 style="font-size:26px;font-weight:800;color:var(--ink);">' +
            (this.lang === 'gu' ? 'તૈયારી સ્કોર: ' : 'Preparedness Score: ') +
            '<span style="color:' + levelColor + ';">' + prepScore + ' / 100</span>' +
          '</h2>' +
          '<div style="margin-top:6px;display:flex;align-items:center;gap:10px;">' +
            '<span class="psi-badge ' + (prepScore >= 75 ? 'mastered' : (prepScore >= 45 ? 'practicing' : 'foundation')) + '" style="font-size:12px;padding:3px 10px;">' +
              escapeHtml(levelTitle) +
            '</span>' +
            '<span style="font-size:13px;color:var(--ink-soft);">' +
              (this.lang === 'gu' ? 'ચોખ્ખા ગુણ: ' : 'Net Marks: ') + netScore + ' / ' + totalQs +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:10px;">' +
          '<button class="btn" id="psi-check-level-btn" style="font-size:12.5px;padding:6px 14px;">Retake Test</button>' +
          '<button class="btn ghost" data-tab="home" style="font-size:12.5px;padding:6px 14px;">Home</button>' +
        '</div>' +
      '</div>' +

      // Quick Stats Bar
      '<div class="psi-summary-grid" style="margin-top:16px;">' +
        '<div class="psi-stat-box"><span class="num">' + (diag.correct || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'સાચા (+૧.૦)' : 'Correct (+1.0)') + '</span></div>' +
        '<div class="psi-stat-box alert"><span class="num">' + (diag.wrong || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'ખોટા (-૦.૨૫)' : 'Wrong (-0.25)') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">' + (diag.optionE || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'Option E (૦)' : 'Option E (0)') + '</span></div>' +
        '<div class="psi-stat-box"><span class="num">' + (diag.blank || 0) + '</span><span class="lbl">' + (this.lang === 'gu' ? 'છોડેલ (Blank)' : 'Blank') + '</span></div>' +
      '</div>' +
    '</div>';

    // 2. Section Performance Breakdown (Table/Cards)
    html += '<div class="psi-card" style="margin-top:16px;">' +
      '<h3 style="font-size:17px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:8px;">' +
        '<span>📊 1. Multi-Domain Level Breakdown</span>' +
      '</h3>' +
      '<p style="font-size:13px;color:var(--ink-soft);margin-bottom:14px;">' +
        (this.lang === 'gu' ? 'દરેક વિષય અનુસાર ઉમેદવારનું પાયાનું સ્તર અને સંબંધિત પરીક્ષા:' : 'Sectional performance mapped against CDS IMA & Gujarat Armed PSI requirements:') +
      '</p>' +
      '<div style="display:flex;flex-direction:column;gap:12px;">';

    if (Array.isArray(diag.sections)) {
      diag.sections.forEach(function(sec) {
        var secName = (this.lang === 'gu' && sec.nameGu) ? sec.nameGu : sec.name;
        var secBadgeClass = sec.accuracy >= 75 ? 'mastered' : (sec.accuracy >= 45 ? 'practicing' : 'foundation');
        var secBadgeText = (this.lang === 'gu' && sec.levelGu) ? sec.levelGu : sec.level;

        html += '<div style="background:var(--surface-2);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">' +
            '<div>' +
              '<span style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:var(--accent);text-transform:uppercase;">Section ' + sec.sectionIndex + '</span>' +
              '<h4 style="font-size:15px;font-weight:700;color:var(--ink);margin:2px 0;">' + escapeHtml(secName) + '</h4>' +
              '<span style="font-size:12px;color:var(--ink-faint);">' + escapeHtml(sec.relevance || '') + '</span>' +
            '</div>' +
            '<div style="text-align:right;">' +
              '<span class="psi-badge ' + secBadgeClass + '">' + escapeHtml(secBadgeText) + '</span>' +
              '<div style="font-family:var(--f-mono);font-size:13px;font-weight:700;color:var(--ink);margin-top:4px;">' +
                sec.correct + ' / ' + sec.total + ' (' + sec.accuracy + '%)' +
              '</div>' +
            '</div>' +
          '</div>' +
          // Accuracy mini progress bar
          '<div style="height:6px;background:var(--ground);border-radius:3px;overflow:hidden;margin:10px 0 8px;">' +
            '<div style="height:100%;width:' + sec.accuracy + '%;background:' + (sec.accuracy >= 75 ? 'var(--good)' : (sec.accuracy >= 45 ? 'var(--accent)' : 'var(--alert)')) + ';border-radius:3px;"></div>' +
          '</div>' +
          (sec.advice ? '<div style="font-size:12.5px;color:var(--ink-soft);line-height:1.45;background:var(--surface);padding:8px 10px;border-radius:6px;border-left:3px solid var(--accent);">' + escapeHtml(sec.advice) + '</div>' : '') +
        '</div>';
      }, this);
    }
    html += '</div></div>';

    // 3. Critical Weaknesses Card
    if (Array.isArray(diag.criticalWeaknesses) && diag.criticalWeaknesses.length > 0) {
      html += '<div class="psi-card alert-border" style="margin-top:16px;border-left:4px solid var(--alert);">' +
        '<h3 style="font-size:17px;font-weight:700;color:var(--alert);margin-bottom:8px;display:flex;align-items:center;gap:8px;">' +
          '<span>⚠️ 2. Critical Weaknesses & Remediation</span>' +
        '</h3>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">';

      diag.criticalWeaknesses.forEach(function(w) {
        html += '<div style="background:var(--surface-2);border:1px solid var(--line);border-radius:var(--radius);padding:12px 14px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<strong style="color:var(--ink);font-size:14.5px;">' + escapeHtml(w.sectionName) + '</strong>' +
            '<span class="mono" style="font-size:12.5px;color:var(--alert);font-weight:700;">' + w.accuracy + '% accuracy (' + w.wrongCount + ' wrong)</span>' +
          '</div>' +
          (w.weakTopics && w.weakTopics.length > 0 ? '<div style="font-size:12px;color:var(--ink-faint);margin:4px 0;">Weak topics: ' + escapeHtml(w.weakTopics.join(', ')) + '</div>' : '') +
          '<p style="font-size:13px;color:var(--ink-soft);margin-top:6px;line-height:1.45;">' + escapeHtml(w.advice) + '</p>' +
        '</div>';
      });
      html += '</div></div>';
    }

    // 4. High-Return Synergistic Topics Card
    if (Array.isArray(diag.highReturnTopics) && diag.highReturnTopics.length > 0) {
      html += '<div class="psi-card" style="margin-top:16px;border-left:4px solid var(--brass);">' +
        '<h3 style="font-size:17px;font-weight:700;color:var(--brass);margin-bottom:8px;display:flex;align-items:center;gap:8px;">' +
          '<span>🎯 3. High-Return Synergistic Topics (CDS IMA + Gujarat PSI)</span>' +
        '</h3>' +
        '<p style="font-size:13px;color:var(--ink-soft);margin-bottom:10px;">' +
          'Topics that yield simultaneous marks across both CDS IMA and Gujarat PSI papers with zero syllabus waste:' +
        '</p>' +
        '<div style="display:flex;flex-direction:column;gap:8px;">';

      diag.highReturnTopics.forEach(function(t) {
        html += '<div style="background:var(--surface-2);border:1px solid var(--line);border-radius:var(--radius);padding:10px 14px;">' +
          '<div style="font-weight:700;color:var(--ink);font-size:14px;">' + escapeHtml(t.topic) + '</div>' +
          '<div style="font-size:12.5px;color:var(--brass);margin-top:3px;">' + escapeHtml(t.synergy) + '</div>' +
        '</div>';
      });
      html += '</div></div>';
    }

    // 5. Unknown Areas Card (Option E / Blanks / Knowledge Gap)
    if (Array.isArray(diag.unknownAreas) && diag.unknownAreas.length > 0) {
      html += '<div class="psi-card" style="margin-top:16px;">' +
        '<h3 style="font-size:17px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:8px;">' +
          '<span>🔍 4. Unknown Areas (Option E / Blanks / Unseen Concepts)</span>' +
        '</h3>' +
        '<p style="font-size:13px;color:var(--ink-soft);margin-bottom:10px;">' +
          'Specific areas where questions were intentionally skipped or flagged as knowledge gaps:' +
        '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;">';

      diag.unknownAreas.forEach(function(topic) {
        html += '<span style="font-family:var(--f-mono);font-size:12px;background:var(--surface-2);border:1px solid var(--line);color:var(--ink);padding:5px 11px;border-radius:20px;">' +
          escapeHtml(topic) +
        '</span>';
      });
      html += '</div></div>';
    }

    // 6. Actionable 7-Day Training Plan
    if (Array.isArray(diag.sevenDayPlan) && diag.sevenDayPlan.length > 0) {
      html += '<div class="psi-card" style="margin-top:16px;border-left:4px solid var(--good);">' +
        '<h3 style="font-size:17px;font-weight:700;color:var(--good);margin-bottom:6px;display:flex;align-items:center;gap:8px;">' +
          '<span>🚀 5. Immediate 7-Day Action Plan</span>' +
        '</h3>' +
        '<p style="font-size:13px;color:var(--ink-soft);margin-bottom:14px;">' +
          'Generated dynamically to target your diagnosed weaknesses first, working within your 2-hour desk study + 60-min metro commute constraint:' +
        '</p>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">';

      diag.sevenDayPlan.forEach(function(p) {
        html += '<div style="background:var(--surface-2);border:1px solid var(--line);border-radius:var(--radius);padding:12px 14px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">' +
            '<strong style="color:var(--ink);font-size:14.5px;">' + escapeHtml(p.title) + '</strong>' +
            '<span class="mono" style="font-size:12px;color:var(--good);background:var(--good-soft);padding:2px 8px;border-radius:12px;">Focus: ' + escapeHtml(p.focus) + '</span>' +
          '</div>' +
          '<ul style="margin:8px 0 0 18px;padding:0;font-size:13px;color:var(--ink-soft);line-height:1.5;">' +
            p.tasks.map(function(t) { return '<li>' + escapeHtml(t) + '</li>'; }).join('') +
          '</ul>' +
        '</div>';
      });
      html += '</div></div>';
    }

    // Bottom action buttons
    html += '<div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">' +
      '<button class="psi-btn-metro" data-tab="practice" style="flex:1;">' +
        '<span>START DAY 1 TRAINING &rarr;</span>' +
        '<span class="sub">Open practice bank calibrated to weak topics</span>' +
      '</button>' +
      '<button class="btn ghost" id="psi-check-level-btn" style="flex:1;text-align:center;">Retake Diagnostic Assessment</button>' +
    '</div>';

    return html;
  };

  /**
   * Interactive Administrative Lexicon Flashcard Trainer (Phase 5)
   */
  PSIUI.prototype.renderLexiconFlashcardScreen = function() {
    var lexQuestions = this.bank.filterByTopic('gujarat_gk', 'administrative_lexicon');
    if (lexQuestions.length === 0) {
      lexQuestions = this.bank.getAll().filter(function(q) {
        return q.id && q.id.indexOf('lex_') === 0;
      });
    }

    if (this.flashcardIndex >= lexQuestions.length) {
      this.flashcardIndex = 0;
    }
    var cardCount = lexQuestions.length;
    var currentCard = lexQuestions[this.flashcardIndex];

    var enMatch = currentCard.question_en.match(/'([^']+)'/);
    var enTerm = enMatch ? enMatch[1] : currentCard.question_en;
    var guTerm = currentCard.options_gu[currentCard.answer];
    var isFlipped = !!this.flashcardFlipped;

    var srsCard = this.storage.getCard(currentCard.id);
    var srsStatus = srsCard ? ('Interval: ' + (srsCard.intervalDays || 1) + 'd · Reps: ' + (srsCard.repetitions || 0)) : 'New Term';

    var html = '<div class="psi-hero-card" style="max-width:560px;margin:0 auto;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<button class="psi-pill-btn" data-tab="practice">&larr; Practice Hub</button>' +
        '<span style="font-family:var(--f-mono);font-size:12px;font-weight:700;color:var(--accent);">' +
          'CARD ' + (this.flashcardIndex + 1) + ' / ' + cardCount +
        '</span>' +
        '<button class="psi-pill-btn" id="psi-lexicon-sprint-btn" title="Start 15-Q MCQ Sprint">MCQ Quiz &rarr;</button>' +
      '</div>' +

      // 3D Flip Card Container
      '<div class="psi-flashcard-stage" id="psi-flashcard-card" style="cursor:pointer;min-height:280px;user-select:none;">' +
        '<div class="psi-flashcard-inner' + (isFlipped ? ' is-flipped' : '') + '">' +
          // Front Side
          '<div class="psi-flashcard-face psi-flashcard-front">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
              '<span class="eyebrow" style="color:var(--accent);background:var(--accent-soft);">ADMINISTRATIVE & LEGAL LEXICON</span>' +
              '<span style="font-family:var(--f-mono);font-size:11px;color:var(--ink-faint);">' + srsStatus + '</span>' +
            '</div>' +
            '<div style="margin:auto 0;text-align:center;padding:24px 0;">' +
              '<div style="font-size:24px;font-weight:800;color:var(--ink);letter-spacing:-0.02em;">' + escapeHtml(enTerm) + '</div>' +
              '<div style="font-size:13px;color:var(--ink-soft);margin-top:8px;">English Administrative Term</div>' +
              '<div class="psi-flip-hint" style="margin-top:20px;font-size:12px;color:var(--accent);font-weight:600;">' +
                'Tap to flip card & reveal Gujarati translation ↺' +
              '</div>' +
            '</div>' +
          '</div>' +

          // Back Side
          '<div class="psi-flashcard-face psi-flashcard-back">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
              '<span class="eyebrow" style="color:var(--good);background:var(--good-soft);">OFFICIAL GUJARATI TRANSLATION</span>' +
              '<span style="font-family:var(--f-mono);font-size:11px;color:var(--ink-faint);">' + escapeHtml(enTerm) + '</span>' +
            '</div>' +
            '<div style="margin-top:14px;">' +
              '<div style="font-size:22px;font-weight:700;color:var(--good);">' + escapeHtml(guTerm) + '</div>' +
              '<div style="font-size:13px;color:var(--ink);line-height:1.5;margin-top:10px;background:var(--ground);padding:10px;border-radius:6px;border-left:3px solid var(--accent);">' +
                '<strong>કાયદાકીય સંદર્ભ / Legal Reference:</strong><br>' +
                escapeHtml(currentCard.explanation_gu) +
              '</div>' +
              '<div style="font-size:12px;color:var(--ink-soft);margin-top:8px;line-height:1.45;">' +
                escapeHtml(currentCard.explanation_en) +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // SM-2 Spaced Repetition Buttons & Navigation
      '<div style="margin-top:16px;display:flex;gap:10px;flex-direction:column;">' +
        '<div style="display:flex;gap:10px;">' +
          '<button class="btn ghost alert" id="psi-card-still-learning-btn" style="flex:1;padding:10px;font-size:13px;font-weight:600;">' +
            '✕ Still Learning (Review Soon)' +
          '</button>' +
          '<button class="btn" id="psi-card-mastered-btn" style="flex:1;padding:10px;font-size:13px;font-weight:600;background:var(--good);color:#fff;">' +
            '✓ Mastered (Recall Fast)' +
          '</button>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">' +
          '<button class="psi-pill-btn" id="psi-card-prev-btn"' + (this.flashcardIndex === 0 ? ' disabled style="opacity:0.4;"' : '') + '>&larr; Previous</button>' +
          '<button class="psi-pill-btn" id="psi-card-flip-btn">Flip Card ↺</button>' +
          '<button class="psi-pill-btn" id="psi-card-next-btn"' + (this.flashcardIndex === cardCount - 1 ? ' disabled style="opacity:0.4;"' : '') + '>Next &rarr;</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    return html;
  };

  /**
   * Global Event Delegation
   */
  PSIUI.prototype.bindGlobalEvents = function() {
    var self = this;
    if (!this.container || !this.container.addEventListener) return;

    this.container.addEventListener('click', function(e) {
      // 1. Exit to CDS Dashboard
      if (e.target.closest('#psi-exit-to-dash')) {
        self.stopMetroTimer();
        if (root.PSI_APP && root.PSI_APP.showDashboardView) {
          root.PSI_APP.showDashboardView();
        } else if (typeof window !== 'undefined') {
          window.location.hash = '#today';
        }
        return;
      }

      // 2. Navigation Tab Click
      var tabBtn = e.target.closest('[data-tab]');
      if (tabBtn) {
        var tab = tabBtn.getAttribute('data-tab');
        self.switchTab(tab);
        return;
      }

      // 3. Language Toggle Click
      var langBtn = e.target.closest('[data-lang]');
      if (langBtn) {
        var l = langBtn.getAttribute('data-lang');
        self.setLanguage(l);
        return;
      }

      // 4. Start/Continue Lesson
      var learnBtn = e.target.closest('#psi-learn-topic-btn');
      if (learnBtn) {
        var lId = learnBtn.getAttribute('data-lesson-id') || 'lesson_const_fr';
        self.switchTab('learn', lId);
        return;
      }

      var openLessonBtn = e.target.closest('[data-open-lesson]');
      if (openLessonBtn) {
        var openId = openLessonBtn.getAttribute('data-open-lesson');
        self.switchTab('learn', openId);
        return;
      }

      // 5. Drill specific topic from Practice screen
      var drillTopicBtn = e.target.closest('[data-drill-topic]');
      if (drillTopicBtn) {
        var st = drillTopicBtn.getAttribute('data-drill-topic').split('::');
        self.startSession('practice', { subject: st[0], topic: st[1], count: 10 });
        return;
      }

      // 6. Test Lesson Understanding
      var testLessonBtn = e.target.closest('#psi-test-lesson-btn');
      if (testLessonBtn) {
        var lessonId = testLessonBtn.getAttribute('data-lesson-id');
        self.startSession('lesson_practice', { lessonId: lessonId, count: 5 });
        return;
      }

      // 7. Toggle Reflection Answer in Lesson
      if (e.target.closest('#psi-toggle-reflection')) {
        self.showReflection = !self.showReflection;
        var reflContent = document.getElementById('psi-reflection-content');
        var reflPrompt = document.getElementById('psi-reflection-prompt');
        var reflBtn = document.getElementById('psi-toggle-reflection');
        if (reflContent) reflContent.style.display = self.showReflection ? 'block' : 'none';
        if (reflPrompt) reflPrompt.style.display = self.showReflection ? 'none' : 'block';
        if (reflBtn) reflBtn.textContent = self.showReflection ? 'Hide Answer' : '👁️ Show Answer';
        return;
      }

      // 8. Start Metro 40 Drill
      if (e.target.closest('#psi-start-metro-btn')) {
        self.startSession('metro40');
        return;
      }

      // 9. Check Level / Diagnostic Assessment
      if (e.target.closest('#psi-check-level-btn')) {
        self.startSession('diagnostic');
        return;
      }

      // 10. Resume Session
      if (e.target.closest('#psi-resume-btn')) {
        self.currentTab = 'quiz';
        self.render();
        return;
      }

      // 11. Due Cards Drill
      if (e.target.closest('#psi-due-btn') || e.target.closest('#psi-drill-due-btn')) {
        self.startSession('revision', { count: 20 });
        return;
      }

      // 12. Drill Mistakes
      if (e.target.closest('#psi-drill-mistakes-btn')) {
        self.startSession('mistakes', { count: 15 });
        return;
      }

      // 13. Drill Marked
      if (e.target.closest('#psi-drill-marked-btn')) {
        self.startSession('revision', { markedOnly: true, count: 15 });
        return;
      }

      // 14. Drill Recently Wrong
      if (e.target.closest('#psi-drill-recent-wrong-btn')) {
        self.startSession('mistakes', { count: 15 });
        return;
      }

      // 15. Start PYQ Drill
      if (e.target.closest('#psi-start-pyq-drill-btn')) {
        self.startSession('pyq', { count: 20 });
        return;
      }

      // 16. Practice Foundation MCQs (Beginner button)
      if (e.target.closest('#psi-practice-foundation-mcqs-btn')) {
        self.startSession('practice', { count: 10 });
        return;
      }

      // 17. Option Answer Click
      var optBtn = e.target.closest('[data-opt-idx]');
      if (optBtn && !optBtn.classList.contains('disabled')) {
        var optIdx = parseInt(optBtn.getAttribute('data-opt-idx'), 10);
        var sess = self.engine.currentSession;
        if (sess) {
          var qId = sess.questionIds[sess.currentIndex];
          var ansRec = self.engine.recordAnswer(qId, optIdx);
          if (ansRec) {
            if (ansRec.isOptionE) {
              triggerHaptic('opt_e');
              soundFx.playTap();
            } else if (ansRec.isCorrect) {
              triggerHaptic('correct');
              soundFx.playCorrect();
            } else {
              triggerHaptic('wrong');
              soundFx.playWrong();
            }
          }
          self.renderQuizQuestion();
        }
        return;
      }

      // Audio cues toggle
      if (e.target.closest('#psi-sound-toggle-btn')) {
        self.soundEnabled = !self.soundEnabled;
        soundFx.muted = !self.soundEnabled;
        self.renderQuizQuestion();
        return;
      }

      // Open Lexicon Flashcards
      if (e.target.closest('#psi-open-lexicon-flashcards-btn')) {
        self.switchTab('lexicon_flashcards');
        return;
      }

      // Start Lexicon MCQ Sprint
      if (e.target.closest('#psi-start-lexicon-sprint-btn') || e.target.closest('#psi-lexicon-sprint-btn')) {
        self.startSession('lexicon', { count: 15 });
        return;
      }

      // Flashcard Flip Click
      if (e.target.closest('#psi-flashcard-card') || e.target.closest('#psi-card-flip-btn')) {
        if (e.target.closest('button') && !e.target.closest('#psi-card-flip-btn')) {
          // ignore clicks on nested buttons
        } else {
          self.flashcardFlipped = !self.flashcardFlipped;
          soundFx.playTap();
          triggerHaptic('tap');
          var cardInner = document.querySelector('.psi-flashcard-inner');
          if (cardInner) {
            if (self.flashcardFlipped) cardInner.classList.add('is-flipped');
            else cardInner.classList.remove('is-flipped');
          } else {
            self.render();
          }
          return;
        }
      }

      // Flashcard Still Learning (hard/wrong)
      if (e.target.closest('#psi-card-still-learning-btn')) {
        var lexList = self.bank.filterByTopic('gujarat_gk', 'administrative_lexicon');
        if (self.flashcardIndex < lexList.length) {
          var cardId = lexList[self.flashcardIndex].id;
          var exCard = self.storage.getCard(cardId);
          var upCard = self.srs.processAttempt(exCard, false, 'unsure');
          self.storage.saveCard(cardId, upCard);
          self.storage.recordMistake(cardId, 'gap');
        }
        triggerHaptic('wrong');
        soundFx.playWrong();
        if (self.flashcardIndex < lexList.length - 1) {
          self.flashcardIndex++;
        } else {
          self.flashcardIndex = 0;
        }
        self.flashcardFlipped = false;
        self.render();
        return;
      }

      // Flashcard Mastered (easy/correct)
      if (e.target.closest('#psi-card-mastered-btn')) {
        var lexList2 = self.bank.filterByTopic('gujarat_gk', 'administrative_lexicon');
        if (self.flashcardIndex < lexList2.length) {
          var cardId2 = lexList2[self.flashcardIndex].id;
          var exCard2 = self.storage.getCard(cardId2);
          var upCard2 = self.srs.processAttempt(exCard2, true, 'confident');
          self.storage.saveCard(cardId2, upCard2);
        }
        triggerHaptic('correct');
        soundFx.playCorrect();
        if (self.flashcardIndex < lexList2.length - 1) {
          self.flashcardIndex++;
        } else {
          self.flashcardIndex = 0;
        }
        self.flashcardFlipped = false;
        self.render();
        return;
      }

      // Flashcard Next & Prev
      if (e.target.closest('#psi-card-next-btn')) {
        var lexList3 = self.bank.filterByTopic('gujarat_gk', 'administrative_lexicon');
        if (self.flashcardIndex < lexList3.length - 1) {
          self.flashcardIndex++;
          self.flashcardFlipped = false;
          soundFx.playTap();
          triggerHaptic('tap');
          self.render();
        }
        return;
      }
      if (e.target.closest('#psi-card-prev-btn')) {
        if (self.flashcardIndex > 0) {
          self.flashcardIndex--;
          self.flashcardFlipped = false;
          soundFx.playTap();
          triggerHaptic('tap');
          self.render();
        }
        return;
      }

      // 18. Skip / Leave Blank Click (explicit blank choice without selecting an option)
      if (e.target.closest('#psi-skip-blank-btn')) {
        var curSess = self.engine.currentSession;
        if (curSess) {
          var currQ = curSess.questionIds[curSess.currentIndex];
          // Record explicit blank
          self.engine.recordAnswer(currQ, null);
          triggerHaptic('skip');
          soundFx.playTap();
          if (curSess.currentIndex < curSess.questionIds.length - 1) {
            curSess.currentIndex++;
            self.engine.persistActiveSession();
            self.renderQuizQuestion();
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            self.stopMetroTimer();
            var summ = self.engine.finishSession();
            if (curSess.mode === 'diagnostic') {
              self.switchTab('diagnostic_summary');
            } else {
              self.switchTab('summary');
            }
          }
        }
        return;
      }

      // 19. Next Question Click
      if (e.target.closest('#psi-next-btn')) {
        var s = self.engine.currentSession;
        if (s) {
          if (s.currentIndex < s.questionIds.length - 1) {
            s.currentIndex++;
            self.engine.persistActiveSession();
            self.renderQuizQuestion();
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            self.stopMetroTimer();
            var summary = self.engine.finishSession();
            if (s.mode === 'diagnostic') {
              self.switchTab('diagnostic_summary');
            } else {
              self.switchTab('summary');
            }
          }
        }
        return;
      }

      // 20. Mark / Bookmark Question
      if (e.target.closest('#psi-mark-btn')) {
        var activeSess = self.engine.currentSession;
        if (activeSess) {
          var qid = activeSess.questionIds[activeSess.currentIndex];
          var isM = self.storage.toggleMark(qid);
          var mBtn = document.getElementById('psi-mark-btn');
          if (mBtn) {
            mBtn.className = 'psi-icon-btn' + (isM ? ' marked' : '');
            mBtn.textContent = isM ? '★ Marked' : '☆ Mark';
          }
        }
        return;
      }

      // 21. Toggle Gujarati Glossary Drawer
      if (e.target.closest('#psi-glossary-btn')) {
        var drawer = document.getElementById('psi-glossary-drawer');
        if (drawer) {
          drawer.style.display = (drawer.style.display === 'none') ? 'flex' : 'none';
        }
        return;
      }

      // 22. Report Question
      if (e.target.closest('#psi-report-btn')) {
        var repSess = self.engine.currentSession;
        if (repSess) {
          var repQ = repSess.questionIds[repSess.currentIndex];
          var reason = prompt('Briefly describe any issue with this question (typo, ambiguous translation, etc.):');
          if (reason) {
            self.storage.reportQuestion(repQ, escapeHtml(reason));
            alert('Thank you! Issue logged for review.');
          }
        }
        return;
      }

      // 23. Confidence Pill Click
      var confBtn = e.target.closest('[data-conf]');
      if (confBtn) {
        var conf = confBtn.getAttribute('data-conf');
        var cSess = self.engine.currentSession;
        if (cSess) {
          var curQId = cSess.questionIds[cSess.currentIndex];
          if (cSess.answers[curQId]) {
            cSess.answers[curQId].confidence = conf;
            var card = self.storage.getCard(curQId);
            self.storage.saveCard(curQId, self.srs.processAttempt(card, true, conf));
            self.renderQuizQuestion();
          }
        }
        return;
      }

      // 24. Error Type Pill Click
      var errBtn = e.target.closest('[data-err]');
      if (errBtn) {
        var errType = errBtn.getAttribute('data-err');
        var eSess = self.engine.currentSession;
        if (eSess) {
          var eQId = eSess.questionIds[eSess.currentIndex];
          if (eSess.answers[eQId]) {
            eSess.answers[eQId].errorType = errType;
            self.storage.updateMistakeType(eQId, errType);
            self.renderQuizQuestion();
          }
        }
        return;
      }

      // 25. Export / Import Data
      if (e.target.closest('#psi-export-btn')) {
        var blob = new Blob([self.storage.exportBackup()], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'psi-progress-' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      if (e.target.closest('#psi-import-btn')) {
        var jsonStr = prompt('Paste your exported JSON progress here:');
        if (jsonStr) {
          var res = self.storage.importBackup(jsonStr);
          if (res.success) {
            alert('Progress restored successfully!');
            self.render();
          } else {
            alert('Import failed: ' + escapeHtml(res.error));
          }
        }
        return;
      }

      // 26. Log 5 km Run Time
      if (e.target.closest('#psi-add-run-btn')) {
        var runInput = document.getElementById('psi-run-time-input');
        if (!runInput) return;
        var val = runInput.value.trim();
        var match = /^(\d{1,2}):(\d{2})$/.exec(val);
        if (!match) {
          alert('Please enter run time in mm:ss format (e.g. 24:30)');
          return;
        }
        var totalSec = (+match[1]) * 60 + (+match[2]);
        var todayKey = new Date().toISOString().slice(0, 10);
        if (!self.storage.state.cdsHabitData) {
          self.storage.state.cdsHabitData = { days: {}, mocks: [], runs: [] };
        }
        if (!Array.isArray(self.storage.state.cdsHabitData.runs)) {
          self.storage.state.cdsHabitData.runs = [];
        }
        self.storage.state.cdsHabitData.runs.push({ d: todayKey, v: totalSec });
        self.storage.save();
        if (typeof root.touch === 'function') root.touch();
        triggerHaptic('correct');
        soundFx.playCorrect();
        self.render();
        return;
      }
    });
  };

  root.PSIUI = PSIUI;
})(typeof window !== 'undefined' ? window : this);
