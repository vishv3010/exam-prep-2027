/**
 * Gujarat Police PSI LocalStorage Layer (Version 2)
 * Completely isolates PSI state under key 'psi_trainer.v1'.
 * Supports beginner learning progression, lesson tracking, topic mastery,
 * daily mission tracking, and diagnostic assessments.
 * Backward-compatible with version 1 state.
 */
(function(root) {
  'use strict';

  var STORAGE_KEY = 'psi_trainer.v1';
  var CURRENT_VERSION = 2;

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate();
  }

  var defaultState = {
    version: CURRENT_VERSION,
    preferences: {
      language: 'gu',       // 'gu' or 'en'
      defaultMode: 'metro40',
      ttsEnabled: false,
      useOptionE: true
    },
    userProfile: {
      hasStudiedBefore: 'not_yet', // 'not_yet' | 'little' | 'yes'
      dailyStudyTimeMin: 60,       // 30 | 60 | 120 | 180
      level: 'foundation',         // 'foundation' | 'practice' | 'exam'
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
    cards: {},              // questionId -> SRS card state
    mistakes: {},           // questionId -> { type: 'gap'|'misread'|'slip'|'unclassified', count, lastWrong }
    marked: [],             // array of bookmarked questionIds
    history: [],            // list of completed session summaries
    learnedLessons: {},     // lessonId -> { completedAt, score, status }
    topicProgress: {},      // subject::topic -> { status: 'NOT STARTED'|'FOUNDATION'|'PRACTICING'|'MASTERED', level: 1..3 }
    dailyMission: {
      date: '',
      topicsLearned: 0,
      questionsDone: 0,
      mistakesReviewed: 0,
      srsDone: 0
    },
    diagnosticResult: null, // { completedAt, score, total, accuracy, subjectBreakdown, recommendedStep }
    savedWords: [],         // array of { word, simple_gu, en, example, timestamp }
    reports: [],            // array of { qId, reason, timestamp }
    activeSession: null,    // in-flight session state for interruption recovery
    updatedAt: 0
  };

  function PSIStorage() {
    this.state = this.load();
  }

  PSIStorage.prototype.load = function() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return this.migrate(parsed);
        }
      }
    } catch (e) {
      console.warn('[PSI Storage] Failed to load state:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  };

  PSIStorage.prototype.migrate = function(data) {
    if (!data || typeof data !== 'object') data = {};
    var state = Object.assign({}, defaultState);
    if (data.preferences && typeof data.preferences === 'object') {
      state.preferences = Object.assign({}, defaultState.preferences, data.preferences);
      if (['gu', 'en'].indexOf(state.preferences.language) === -1) state.preferences.language = 'gu';
    }
    if (data.userProfile && typeof data.userProfile === 'object') {
      state.userProfile = Object.assign({}, defaultState.userProfile, data.userProfile);
      if (['not_yet', 'little', 'yes'].indexOf(state.userProfile.hasStudiedBefore) === -1) state.userProfile.hasStudiedBefore = 'not_yet';
      if (typeof state.userProfile.dailyStudyTimeMin !== 'number') state.userProfile.dailyStudyTimeMin = 60;
      if (['foundation', 'practice', 'exam'].indexOf(state.userProfile.level) === -1) state.userProfile.level = 'foundation';
      state.userProfile.onboardingComplete = Boolean(state.userProfile.onboardingComplete);
    }
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
    state.dailyMission = Object.assign({}, defaultState.dailyMission, (data.dailyMission && typeof data.dailyMission === 'object') ? data.dailyMission : {});
    state.learnedLessons = (data.learnedLessons && typeof data.learnedLessons === 'object' && !Array.isArray(data.learnedLessons)) ? data.learnedLessons : {};
    state.topicProgress = (data.topicProgress && typeof data.topicProgress === 'object' && !Array.isArray(data.topicProgress)) ? data.topicProgress : {};
    state.diagnosticResult = (data.diagnosticResult && typeof data.diagnosticResult === 'object') ? data.diagnosticResult : null;
    state.cards = (data.cards && typeof data.cards === 'object' && !Array.isArray(data.cards)) ? data.cards : {};
    state.mistakes = (data.mistakes && typeof data.mistakes === 'object' && !Array.isArray(data.mistakes)) ? data.mistakes : {};
    state.marked = Array.isArray(data.marked) ? data.marked.filter(function(x) { return typeof x === 'string'; }) : [];
    state.history = Array.isArray(data.history) ? data.history.filter(function(h) { return h && typeof h === 'object'; }) : [];
    state.savedWords = Array.isArray(data.savedWords) ? data.savedWords.filter(function(w) { return w && typeof w === 'object'; }) : [];
    state.reports = Array.isArray(data.reports) ? data.reports.filter(function(r) { return r && typeof r === 'object'; }) : [];
    state.activeSession = (data.activeSession && typeof data.activeSession === 'object') ? data.activeSession : null;
    state.version = CURRENT_VERSION;

    // Reset daily mission if date changed
    var today = todayStr();
    if (state.dailyMission.date !== today) {
      state.dailyMission = {
        date: today,
        topicsLearned: 0,
        questionsDone: 0,
        mistakesReviewed: 0,
        srsDone: 0
      };
    }

    return state;
  };

  PSIStorage.prototype.save = function() {
    this.state.updatedAt = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      return true;
    } catch (e) {
      console.error('[PSI Storage] Quota exceeded or error saving:', e);
      return false;
    }
  };

  PSIStorage.prototype.getPreferences = function() {
    return this.state.preferences;
  };

  PSIStorage.prototype.setPreference = function(key, value) {
    this.state.preferences[key] = value;
    this.save();
  };

  PSIStorage.prototype.getUserProfile = function() {
    return this.state.userProfile;
  };

  PSIStorage.prototype.saveUserProfile = function(profile) {
    this.state.userProfile = Object.assign(this.state.userProfile, profile);
    this.save();
  };

  PSIStorage.prototype.getCard = function(qId) {
    return this.state.cards[qId] || null;
  };

  PSIStorage.prototype.saveCard = function(qId, cardObj) {
    this.state.cards[qId] = cardObj;
    this.save();
  };

  PSIStorage.prototype.isMarked = function(qId) {
    return this.state.marked.indexOf(qId) !== -1;
  };

  PSIStorage.prototype.toggleMark = function(qId) {
    var idx = this.state.marked.indexOf(qId);
    if (idx === -1) {
      this.state.marked.push(qId);
    } else {
      this.state.marked.splice(idx, 1);
    }
    this.save();
    return this.isMarked(qId);
  };

  PSIStorage.prototype.getMistake = function(qId) {
    return this.state.mistakes[qId] || null;
  };

  PSIStorage.prototype.recordMistake = function(qId, errorType) {
    var existing = this.state.mistakes[qId] || { count: 0, type: 'unclassified' };
    existing.count += 1;
    existing.type = errorType || existing.type || 'unclassified';
    existing.lastWrong = Date.now();
    this.state.mistakes[qId] = existing;
    this.save();
  };

  PSIStorage.prototype.updateMistakeType = function(qId, errorType) {
    if (this.state.mistakes[qId]) {
      this.state.mistakes[qId].type = errorType;
      this.save();
    }
  };

  PSIStorage.prototype.recordLessonComplete = function(lessonId, score) {
    this.state.learnedLessons[lessonId] = {
      completedAt: Date.now(),
      score: score || 0,
      status: 'completed'
    };
    this.incrementDailyMission('topicsLearned', 1);
    this.save();
  };

  PSIStorage.prototype.isLessonCompleted = function(lessonId) {
    return !!(this.state.learnedLessons && this.state.learnedLessons[lessonId]);
  };

  PSIStorage.prototype.getTopicProgress = function(subject, topic) {
    var key = subject + '::' + topic;
    return this.state.topicProgress[key] || {
      status: 'NOT STARTED',
      level: 1
    };
  };

  PSIStorage.prototype.updateTopicProgress = function(subject, topic, status, level) {
    var key = subject + '::' + topic;
    this.state.topicProgress[key] = {
      status: status,
      level: level || 1,
      updatedAt: Date.now()
    };
    this.save();
  };

  PSIStorage.prototype.getDailyMission = function() {
    var today = todayStr();
    if (this.state.dailyMission.date !== today) {
      this.state.dailyMission = {
        date: today,
        topicsLearned: 0,
        questionsDone: 0,
        mistakesReviewed: 0,
        srsDone: 0
      };
      this.save();
    }
    return this.state.dailyMission;
  };

  PSIStorage.prototype.incrementDailyMission = function(field, by) {
    this.getDailyMission(); // Ensures date check
    if (typeof this.state.dailyMission[field] !== 'undefined') {
      this.state.dailyMission[field] += (by || 1);
      this.save();
    }
  };

  PSIStorage.prototype.saveDiagnosticResult = function(result) {
    this.state.diagnosticResult = result;
    this.save();
  };

  PSIStorage.prototype.getDiagnosticResult = function() {
    return this.state.diagnosticResult;
  };

  PSIStorage.prototype.getActiveSession = function() {
    return this.state.activeSession;
  };

  PSIStorage.prototype.saveActiveSession = function(sessionData) {
    this.state.activeSession = sessionData;
    this.save();
  };

  PSIStorage.prototype.clearActiveSession = function() {
    this.state.activeSession = null;
    this.save();
  };

  PSIStorage.prototype.recordSessionComplete = function(summary) {
    this.state.history.unshift(summary);
    if (this.state.history.length > 50) {
      this.state.history.pop();
    }
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

  PSIStorage.prototype.saveVocabWord = function(wordObj) {
    var exists = this.state.savedWords.some(function(w) { return w.word === wordObj.word; });
    if (!exists) {
      wordObj.timestamp = Date.now();
      this.state.savedWords.unshift(wordObj);
      this.save();
    }
  };

  PSIStorage.prototype.reportQuestion = function(qId, reason) {
    this.state.reports.push({
      qId: qId,
      reason: reason,
      timestamp: Date.now()
    });
    this.save();
  };

  PSIStorage.prototype.exportBackup = function() {
    return JSON.stringify(this.state, null, 2);
  };

  PSIStorage.prototype.importBackup = function(jsonString) {
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

  root.PSIStorage = new PSIStorage();
})(typeof window !== 'undefined' ? window : this);
