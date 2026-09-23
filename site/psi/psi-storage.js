/**
 * GOAL OS Unified Storage Architecture (Version 3)
 * Combines in-memory instant synchronous access with:
 * - IndexedDB persistence ('GoalOS_DB') for durable long-term storage
 * - localStorage write-through mirroring for zero-latency fallback
 * - Unified state bridging CDS habit data ('cds2027.v1') and PSI trainer state ('psi_trainer.v1')
 * - Automatic migration from legacy schemas
 * - Export, import, and session crash-recovery
 */
(function(root) {
  'use strict';

  var STORAGE_KEY = 'goal_os.v3';
  var LEGACY_PSI_KEY = 'psi_trainer.v1';
  var LEGACY_CDS_KEY = 'cds2027.v1';
  var CURRENT_VERSION = 3;
  var DB_NAME = 'GoalOS_DB';
  var DB_VERSION = 1;

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate();
  }

  var defaultState = {
    version: CURRENT_VERSION,
    preferences: {
      language: 'gu',         // 'gu' or 'en'
      defaultMode: 'metro',   // 'metro' | 'desk' | 'diagnostic'
      ttsEnabled: false,
      useOptionE: true,
      activeExamFocus: '50_50' // '50_50' | 'cds_focus' | 'psi_focus'
    },
    userProfile: {
      candidateName: 'Vishv',
      education: 'B.Tech Computer Engineering',
      level: 'foundation',
      targetExams: ['CDS_IMA', 'GUJARAT_ARMED_PSI'],
      dailyDeskTargetMin: 120,
      dailyMetroTargetMin: 60,
      runningBaselineKm: 5.0,
      runningBaselineMin: 30.0,
      onboardingComplete: false
    },
    stats: {
      attempted: 0,
      correct: 0,
      wrong: 0,
      optionE: 0,
      blank: 0,
      sessionsCompleted: 0
    },
    cards: {},                // questionId -> SM-2 card { repetition, ef, intervalDays, due, lapses, history }
    mistakes: {},             // questionId -> { count, type, lastWrong }
    marked: [],               // array of bookmarked questionIds
    history: [],              // completed session summaries
    learnedLessons: {},       // lessonId -> { completedAt, score, status }
    topicProgress: {},        // subject::topic -> { status, level, accuracy, updatedAt }
    dailyMission: {
      date: '',
      deskMinutesDone: 0,
      metroMinutesDone: 0,
      topicsLearned: 0,
      questionsDone: 0,
      mistakesReviewed: 0,
      srsDone: 0
    },
    cdsHabitData: {
      days: {},               // YYYY-MM-DD -> true
      mocks: [],              // array of mock score records
      runs: []                // array of run logs
    },
    diagnosticResult: null,   // baseline test record
    savedWords: [],           // array of { word, simple_gu, en, example, timestamp }
    reports: [],              // question reports
    activeSession: null,      // interruption recovery state
    updatedAt: 0
  };

  function GoalStorage() {
    this.db = null;
    this.state = this.loadInitial();
    this.initIndexedDB();
  }

  /**
   * Initializes IndexedDB in background without blocking synchronous startup
   */
  GoalStorage.prototype.initIndexedDB = function() {
    var self = this;
    if (typeof window === 'undefined' || !window.indexedDB) return;

    try {
      var request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function(event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains('app_state')) {
          db.createObjectStore('app_state', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('srs_cards')) {
          db.createObjectStore('srs_cards', { keyPath: 'questionId' });
        }
        if (!db.objectStoreNames.contains('daily_logs')) {
          db.createObjectStore('daily_logs', { keyPath: 'date' });
        }
      };

      request.onsuccess = function(event) {
        self.db = event.target.result;
        // Sync current state to IndexedDB
        self.persistToIndexedDB();
      };

      request.onerror = function(event) {
        console.warn('[GoalStorage] IndexedDB open error, falling back to localStorage:', event);
      };
    } catch (e) {
      console.warn('[GoalStorage] IndexedDB unavailable:', e);
    }
  };

  /**
   * Persists state snapshot to IndexedDB asynchronously
   */
  GoalStorage.prototype.persistToIndexedDB = function() {
    if (!this.db) return;
    try {
      var tx = this.db.transaction(['app_state', 'srs_cards'], 'readwrite');
      var stateStore = tx.objectStore('app_state');
      stateStore.put({ id: 'current_state', state: this.state, updatedAt: Date.now() });

      var cardStore = tx.objectStore('srs_cards');
      var cards = this.state.cards;
      Object.keys(cards).forEach(function(qId) {
        var card = cards[qId];
        card.questionId = qId;
        cardStore.put(card);
      });
    } catch (e) {
      console.warn('[GoalStorage] IndexedDB write failed:', e);
    }
  };

  /**
   * Loads initial state synchronously from localStorage with automatic migration
   */
  GoalStorage.prototype.loadInitial = function() {
    try {
      // 1. Try unified v3 key
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return this.migrate(parsed);
        }
      }

      // 2. Fall back to legacy PSI key and merge legacy CDS key
      var legacyPsi = null;
      var rawPsi = localStorage.getItem(LEGACY_PSI_KEY);
      if (rawPsi) {
        try { legacyPsi = JSON.parse(rawPsi); } catch (e) {}
      }

      var legacyCds = null;
      var rawCds = localStorage.getItem(LEGACY_CDS_KEY);
      if (rawCds) {
        try { legacyCds = JSON.parse(rawCds); } catch (e) {}
      }

      var merged = Object.assign({}, defaultState);
      if (legacyPsi && typeof legacyPsi === 'object') {
        merged = this.migrate(legacyPsi);
      }
      if (legacyCds && typeof legacyCds === 'object') {
        merged.cdsHabitData.days = Object.assign({}, merged.cdsHabitData.days, legacyCds.days || {});
        merged.cdsHabitData.mocks = Array.isArray(legacyCds.mocks) ? legacyCds.mocks : merged.cdsHabitData.mocks;
        merged.cdsHabitData.runs = Array.isArray(legacyCds.runs) ? legacyCds.runs : merged.cdsHabitData.runs;
      }

      return merged;
    } catch (e) {
      console.warn('[GoalStorage] Failed to load state, initializing default:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  };

  GoalStorage.prototype.migrate = function(data) {
    if (!data || typeof data !== 'object') data = {};
    var state = Object.assign({}, defaultState);

    // Preferences
    if (data.preferences && typeof data.preferences === 'object') {
      state.preferences = Object.assign({}, defaultState.preferences, data.preferences);
    }
    // Profile
    if (data.userProfile && typeof data.userProfile === 'object') {
      state.userProfile = Object.assign({}, defaultState.userProfile, data.userProfile);
    }
    // Stats
    if (data.stats && typeof data.stats === 'object') {
      state.stats = {
        attempted: Number(data.stats.attempted) || 0,
        correct: Number(data.stats.correct) || 0,
        wrong: Number(data.stats.wrong) || 0,
        optionE: Number(data.stats.optionE) || 0,
        blank: Number(data.stats.blank) || 0,
        sessionsCompleted: Number(data.stats.sessionsCompleted) || 0
      };
    }
    // Cards (Migrate legacy Leitner to SM-2 format)
    state.cards = {};
    if (data.cards && typeof data.cards === 'object') {
      Object.keys(data.cards).forEach(function(qId) {
        var c = data.cards[qId];
        if (c && typeof c === 'object') {
          state.cards[qId] = {
            repetition: typeof c.repetition === 'number' ? c.repetition : (c.box ? Math.max(0, c.box - 1) : 0),
            ef: typeof c.ef === 'number' ? c.ef : 2.5,
            intervalDays: typeof c.intervalDays === 'number' ? c.intervalDays : (c.box ? Math.pow(2, c.box - 1) : 1),
            lapses: Number(c.lapses) || 0,
            attempts: Number(c.attempts) || 0,
            correct: Number(c.correct) || 0,
            wrong: Number(c.wrong) || 0,
            box: Number(c.box) || 1,
            due: Number(c.due) || Date.now(),
            lastSeen: Number(c.lastSeen) || Date.now(),
            history: Array.isArray(c.history) ? c.history : []
          };
        }
      });
    }

    // Mistakes
    state.mistakes = (data.mistakes && typeof data.mistakes === 'object') ? data.mistakes : {};
    // Marked questions
    state.marked = Array.isArray(data.marked) ? data.marked.filter(function(x) { return typeof x === 'string'; }) : [];
    // History
    state.history = Array.isArray(data.history) ? data.history.filter(function(h) { return h && typeof h === 'object'; }) : [];
    // Lessons
    state.learnedLessons = (data.learnedLessons && typeof data.learnedLessons === 'object') ? data.learnedLessons : {};
    // Topic progress
    state.topicProgress = (data.topicProgress && typeof data.topicProgress === 'object') ? data.topicProgress : {};
    // Saved vocabulary
    state.savedWords = Array.isArray(data.savedWords) ? data.savedWords : [];
    // Reports
    state.reports = Array.isArray(data.reports) ? data.reports : [];
    // Active session
    state.activeSession = (data.activeSession && typeof data.activeSession === 'object') ? data.activeSession : null;
    // CDS habit data
    state.cdsHabitData = (data.cdsHabitData && typeof data.cdsHabitData === 'object') ? data.cdsHabitData : { days: {}, mocks: [], runs: [] };
    // Diagnostic result
    state.diagnosticResult = (data.diagnosticResult && typeof data.diagnosticResult === 'object') ? data.diagnosticResult : null;

    // Daily Mission
    state.dailyMission = Object.assign({}, defaultState.dailyMission, (data.dailyMission && typeof data.dailyMission === 'object') ? data.dailyMission : {});
    var today = todayStr();
    if (state.dailyMission.date !== today) {
      state.dailyMission = {
        date: today,
        deskMinutesDone: 0,
        metroMinutesDone: 0,
        topicsLearned: 0,
        questionsDone: 0,
        mistakesReviewed: 0,
        srsDone: 0
      };
    }

    state.version = CURRENT_VERSION;
    return state;
  };

  /**
   * Synchronous save to in-memory + localStorage, then async to IndexedDB
   */
  GoalStorage.prototype.save = function() {
    this.state.updatedAt = Date.now();
    try {
      var serialized = JSON.stringify(this.state);
      localStorage.setItem(STORAGE_KEY, serialized);
      // Keep legacy keys in sync for backward compatibility
      localStorage.setItem(LEGACY_PSI_KEY, serialized);
      if (this.state.cdsHabitData) {
        localStorage.setItem(LEGACY_CDS_KEY, JSON.stringify(this.state.cdsHabitData));
      }
    } catch (e) {
      console.warn('[GoalStorage] localStorage quota error:', e);
    }
    this.persistToIndexedDB();
    return true;
  };

  // Preference accessors
  GoalStorage.prototype.getPreferences = function() { return this.state.preferences; };
  GoalStorage.prototype.setPreference = function(key, val) {
    this.state.preferences[key] = val;
    this.save();
  };

  // Profile accessors
  GoalStorage.prototype.getUserProfile = function() { return this.state.userProfile; };
  GoalStorage.prototype.saveUserProfile = function(prof) {
    this.state.userProfile = Object.assign(this.state.userProfile, prof);
    this.save();
  };

  // Diagnostic result accessors
  GoalStorage.prototype.getDiagnosticResult = function() {
    return this.state.diagnosticResult || null;
  };
  GoalStorage.prototype.saveDiagnosticResult = function(diagObj) {
    this.state.diagnosticResult = diagObj;
    this.save();
  };

  // SRS card operations
  GoalStorage.prototype.getCard = function(qId) { return this.state.cards[qId] || null; };
  GoalStorage.prototype.saveCard = function(qId, cardObj) {
    this.state.cards[qId] = cardObj;
    this.save();
  };

  // Marked / Bookmark operations
  GoalStorage.prototype.isMarked = function(qId) { return this.state.marked.indexOf(qId) !== -1; };
  GoalStorage.prototype.toggleMark = function(qId) {
    var idx = this.state.marked.indexOf(qId);
    if (idx === -1) this.state.marked.push(qId);
    else this.state.marked.splice(idx, 1);
    this.save();
    return this.isMarked(qId);
  };

  // Mistake & Error classification operations
  GoalStorage.prototype.getMistake = function(qId) { return this.state.mistakes[qId] || null; };
  GoalStorage.prototype.recordMistake = function(qId, errorType) {
    var existing = this.state.mistakes[qId] || { count: 0, type: 'unclassified' };
    existing.count += 1;
    existing.type = errorType || existing.type || 'unclassified';
    existing.lastWrong = Date.now();
    this.state.mistakes[qId] = existing;
    this.save();
  };
  GoalStorage.prototype.updateMistakeType = function(qId, errorType) {
    if (this.state.mistakes[qId]) {
      this.state.mistakes[qId].type = errorType;
      this.save();
    }
  };

  // Lesson progress
  GoalStorage.prototype.recordLessonComplete = function(lessonId, score) {
    this.state.learnedLessons[lessonId] = {
      completedAt: Date.now(),
      score: score || 0,
      status: 'completed'
    };
    this.incrementDailyMission('topicsLearned', 1);
    this.save();
  };
  GoalStorage.prototype.isLessonCompleted = function(lessonId) {
    return !!(this.state.learnedLessons && this.state.learnedLessons[lessonId]);
  };

  // Topic mastery tracking
  GoalStorage.prototype.getTopicProgress = function(subject, topic) {
    var key = subject + '::' + topic;
    return this.state.topicProgress[key] || { status: 'UNSEEN', level: 1, accuracy: 0 };
  };
  GoalStorage.prototype.updateTopicProgress = function(subject, topic, status, level, accuracy) {
    var key = subject + '::' + topic;
    this.state.topicProgress[key] = {
      status: status,
      level: level || 1,
      accuracy: typeof accuracy === 'number' ? accuracy : 0,
      updatedAt: Date.now()
    };
    this.save();
  };

  // Daily mission tracking
  GoalStorage.prototype.getDailyMission = function() {
    var today = todayStr();
    if (this.state.dailyMission.date !== today) {
      this.state.dailyMission = {
        date: today,
        deskMinutesDone: 0,
        metroMinutesDone: 0,
        topicsLearned: 0,
        questionsDone: 0,
        mistakesReviewed: 0,
        srsDone: 0
      };
      this.save();
    }
    return this.state.dailyMission;
  };
  GoalStorage.prototype.incrementDailyMission = function(field, by) {
    this.getDailyMission();
    if (typeof this.state.dailyMission[field] !== 'undefined') {
      this.state.dailyMission[field] += (by || 1);
      this.save();
    }
  };

  // CDS Habit tracker integration
  GoalStorage.prototype.getCDSHabits = function() { return this.state.cdsHabitData; };
  GoalStorage.prototype.toggleCDSHabitDay = function(dateKey) {
    if (!this.state.cdsHabitData) this.state.cdsHabitData = { days: {}, mocks: [], runs: [] };
    if (this.state.cdsHabitData.days[dateKey]) {
      delete this.state.cdsHabitData.days[dateKey];
    } else {
      this.state.cdsHabitData.days[dateKey] = true;
    }
    this.save();
    return !!this.state.cdsHabitData.days[dateKey];
  };

  // Session & interruption recovery
  GoalStorage.prototype.getActiveSession = function() { return this.state.activeSession; };
  GoalStorage.prototype.saveActiveSession = function(sess) {
    this.state.activeSession = sess;
    this.save();
  };
  GoalStorage.prototype.clearActiveSession = function() {
    this.state.activeSession = null;
    this.save();
  };
  GoalStorage.prototype.recordSessionComplete = function(summary) {
    this.state.history.unshift(summary);
    if (this.state.history.length > 50) this.state.history.pop();
    this.state.stats.sessionsCompleted += 1;
    this.state.stats.attempted += summary.attempted || 0;
    this.state.stats.correct += summary.correct || 0;
    this.state.stats.wrong += summary.wrong || 0;
    this.state.stats.optionE += summary.optionE || 0;
    this.state.stats.blank = (this.state.stats.blank || 0) + (summary.blank || 0);
    this.state.activeSession = null;

    this.incrementDailyMission('questionsDone', summary.attempted || 0);
    this.save();
  };

  // Vocabulary & report operations
  GoalStorage.prototype.saveVocabWord = function(wordObj) {
    var exists = this.state.savedWords.some(function(w) { return w.word === wordObj.word; });
    if (!exists) {
      wordObj.timestamp = Date.now();
      this.state.savedWords.unshift(wordObj);
      this.save();
    }
  };
  GoalStorage.prototype.reportQuestion = function(qId, reason) {
    this.state.reports.push({ qId: qId, reason: reason, timestamp: Date.now() });
    this.save();
  };

  // Export & Import
  GoalStorage.prototype.exportBackup = function() {
    return JSON.stringify(this.state, null, 2);
  };
  GoalStorage.prototype.importBackup = function(jsonString) {
    try {
      var data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') throw new Error('Invalid JSON format');
      this.state = this.migrate(data);
      this.save();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Expose singleton instances
  var storageInstance = new GoalStorage();
  root.GoalStorage = storageInstance;
  root.PSIStorage = storageInstance; // Legacy alias for zero-breakage backwards compatibility
})(typeof window !== 'undefined' ? window : this);
