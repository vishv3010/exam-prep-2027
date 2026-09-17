/**
 * Gujarat Police PSI Question Engine
 * Builds balanced practice sessions (Metro 40, Due Revision, PYQs, Mistakes, Quick Practice,
 * Beginner Lesson Practice, and Diagnostic Test) with interruption recovery.
 */
(function(root) {
  'use strict';

  function QuestionEngine(bank, storage, srs, config) {
    this.bank = bank;
    this.storage = storage;
    this.srs = srs;
    this.config = config || root.PSI_EXAM_CONFIG;
    this.currentSession = null;
  }

  /**
   * Shuffle array in-place (Fisher-Yates)
   */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  /**
   * Builds question list for Metro 40 or Metro Practice
   * Balances: Due reviews (25%), Repeated mistakes (20%), Weak topics (25%), New/Unseen (30%)
   * Scalably handles small banks without duplication.
   */
  QuestionEngine.prototype.buildMetro40Session = function(requestedCount) {
    var all = this.bank.getAll();
    if (!all.length) return [];

    var defaultTarget = (this.config.metro40 && this.config.metro40.targetQuestions) || 40;
    var targetCount = requestedCount || defaultTarget;
    // Cap targetCount at bank size to cleanly handle small prototype banks without duplication
    targetCount = Math.min(targetCount, all.length);

    var selectedIds = [];
    var seenMap = {};

    function addQuestions(pool, maxCount) {
      var shuffled = shuffle(pool);
      for (var i = 0; i < shuffled.length && selectedIds.length < targetCount; i++) {
        var q = shuffled[i];
        if (!seenMap[q.id]) {
          seenMap[q.id] = true;
          selectedIds.push(q.id);
          maxCount--;
          if (maxCount <= 0) break;
        }
      }
    }

    // 1. Due Revision (approx 25%)
    var duePool = this.srs.filterDue(all, this.storage);
    addQuestions(duePool, Math.round(targetCount * 0.25));

    // 2. Repeated Mistakes (approx 20%)
    var mistakePool = this.srs.filterRepeatedMistakes(all, this.storage);
    addQuestions(mistakePool, Math.round(targetCount * 0.20));

    // 3. Weak Topics (approx 25%)
    var weakAnalysis = this.srs.evaluateWeakAreas(all, this.storage);
    if (weakAnalysis.weakestSubject) {
      var weakPool = this.bank.filterBySubject(weakAnalysis.weakestSubject.subject);
      addQuestions(weakPool, Math.round(targetCount * 0.25));
    }

    // 4. Fill remaining with Unseen or mixed questions
    var unseenPool = this.srs.filterUnseen(all, this.storage);
    addQuestions(unseenPool, targetCount - selectedIds.length);

    // If still short, fill from entire bank without duplicating
    if (selectedIds.length < targetCount) {
      addQuestions(all, targetCount - selectedIds.length);
    }

    return selectedIds;
  };

  /**
   * Builds Diagnostic Test question list covering major syllabus domains
   */
  QuestionEngine.prototype.buildDiagnosticSession = function() {
    var subjects = (this.config.diagnostic && this.config.diagnostic.subjects) || ["gujarat_gk", "law_constitution", "general_studies", "reasoning"];
    var selectedIds = [];
    var seenMap = {};

    for (var i = 0; i < subjects.length; i++) {
      var subj = subjects[i];
      var pool = shuffle(this.bank.filterBySubject(subj));
      var count = 0;
      for (var j = 0; j < pool.length && count < 3; j++) {
        var q = pool[j];
        if (!seenMap[q.id]) {
          seenMap[q.id] = true;
          selectedIds.push(q.id);
          count++;
        }
      }
    }
    return selectedIds;
  };

  /**
   * Builds targeted 5-question test for a specific lesson
   */
  QuestionEngine.prototype.buildLessonPracticeSession = function(lessonId) {
    var lesson = root.PSI_LESSON_BANK ? root.PSI_LESSON_BANK.getById(lessonId) : null;
    var selectedIds = [];

    if (lesson && Array.isArray(lesson.practiceQuestionIds)) {
      lesson.practiceQuestionIds.forEach(function(qid) {
        if (selectedIds.indexOf(qid) === -1) selectedIds.push(qid);
      });
    }

    // If fewer than target, supplement with topic questions
    var targetCount = (this.config.mastery && this.config.mastery.practiceQuestionsPerLesson) || 5;
    if (lesson && selectedIds.length < targetCount) {
      var topicPool = shuffle(this.bank.filterByTopic(lesson.subject, lesson.topic));
      for (var i = 0; i < topicPool.length && selectedIds.length < targetCount; i++) {
        if (selectedIds.indexOf(topicPool[i].id) === -1) {
          selectedIds.push(topicPool[i].id);
        }
      }
    }

    return selectedIds;
  };

  /**
   * Evaluates topic mastery level (NOT STARTED -> FOUNDATION -> PRACTICING -> MASTERED)
   */
  QuestionEngine.prototype.getTopicMastery = function(subject, topic) {
    var questions = this.bank.filterByTopic(subject, topic);
    var attempts = 0;
    var correct = 0;
    var self = this;

    questions.forEach(function(q) {
      var card = self.storage.getCard(q.id);
      if (card) {
        attempts += card.attempts;
        correct += card.correct;
      }
    });

    var accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
    var minAttempts = (this.config.mastery && this.config.mastery.minAttempts) || 3;
    var minAcc = (this.config.mastery && this.config.mastery.minAccuracyPercent) || 75;

    // Check if any lesson in this topic was read
    var lessons = root.PSI_LESSON_BANK ? root.PSI_LESSON_BANK.filterByTopic(subject, topic) : [];
    var anyLessonDone = lessons.some(function(l) { return self.storage.isLessonCompleted(l.id); });

    var status = 'NOT STARTED';
    var level = 0;
    var progressPercent = 0;

    if (attempts >= minAttempts && accuracy >= minAcc) {
      status = 'MASTERED';
      level = 3;
      progressPercent = 100;
    } else if (attempts > 0) {
      status = 'PRACTICING';
      level = 2;
      progressPercent = Math.min(85, Math.round((accuracy * 0.6) + ((attempts / minAttempts) * 30)));
    } else if (anyLessonDone) {
      status = 'FOUNDATION';
      level = 1;
      progressPercent = 35;
    }

    return {
      status: status,
      level: level,
      attempts: attempts,
      correct: correct,
      accuracy: accuracy,
      progressPercent: progressPercent,
      totalQuestions: questions.length
    };
  };

  /**
   * Builds a session based on mode and options
   */
  QuestionEngine.prototype.createSession = function(mode, options) {
    options = options || {};
    var all = this.bank.getAll();
    var qIds = [];

    if (mode === 'metro40') {
      qIds = this.buildMetro40Session();
    } else if (mode === 'diagnostic') {
      qIds = this.buildDiagnosticSession();
    } else if (mode === 'lesson_practice') {
      qIds = this.buildLessonPracticeSession(options.lessonId);
    } else if (mode === 'pyq') {
      var pyqs = this.bank.filterBySourceType('PYQ_OFFICIAL').concat(this.bank.filterBySourceType('PYQ_REPRODUCED'));
      if (options.subject) {
        pyqs = pyqs.filter(function(q) { return q.subject === options.subject; });
      }
      qIds = shuffle(pyqs).slice(0, options.count || 20).map(function(q) { return q.id; });
    } else if (mode === 'revision') {
      var due = this.srs.filterDue(all, this.storage);
      if (options.markedOnly) {
        due = this.srs.filterMarked(all, this.storage);
      }
      qIds = shuffle(due).slice(0, options.count || 25).map(function(q) { return q.id; });
    } else if (mode === 'mistakes') {
      var mistakes = this.srs.filterRecentMistakes(all, this.storage);
      if (options.errorType) {
        mistakes = mistakes.filter(function(q) {
          var m = this.storage.getMistake(q.id);
          return m && m.type === options.errorType;
        }.bind(this));
      }
      qIds = shuffle(mistakes).slice(0, options.count || 20).map(function(q) { return q.id; });
    } else {
      // Default quick practice
      var pool = all;
      if (options.subject) {
        pool = this.bank.filterBySubject(options.subject);
      }
      qIds = shuffle(pool).slice(0, options.count || 15).map(function(q) { return q.id; });
    }

    var session = {
      id: 'sess_' + Date.now(),
      mode: mode,
      options: options,
      questionIds: qIds,
      currentIndex: 0,
      answers: {},        // qId -> { selectedIndex, isCorrect, isOptionE, confidence, errorType, timeSpentSec }
      startTime: Date.now(),
      totalDurationSec: (mode === 'metro40' ? (this.config.metro40.durationMinutes * 60) : 0),
      timeRemainingSec: (mode === 'metro40' ? (this.config.metro40.durationMinutes * 60) : 0),
      status: 'active'
    };

    this.currentSession = session;
    this.persistActiveSession();
    return session;
  };

  QuestionEngine.prototype.recordAnswer = function(qId, selectedOptionIndex, confidence, errorType) {
    if (!this.currentSession) return null;

    var question = this.bank.getById(qId);
    if (!question) return null;

    var isBlank = (selectedOptionIndex === null || selectedOptionIndex === undefined || selectedOptionIndex < 0);
    var isOptionE = (!isBlank && selectedOptionIndex === 4);
    var isCorrect = (!isBlank && !isOptionE && selectedOptionIndex === question.answer);

    var answerRecord = {
      qId: qId,
      selectedIndex: isBlank ? null : selectedOptionIndex,
      isBlank: isBlank,
      isCorrect: isCorrect,
      isOptionE: isOptionE,
      confidence: confidence || 'confident',
      errorType: errorType || null,
      timestamp: Date.now()
    };

    this.currentSession.answers[qId] = answerRecord;

    // Update SRS Card and Mistake Register only for attempted answers (not Blank, not Option E)
    if (!isBlank && !isOptionE) {
      var existingCard = this.storage.getCard(qId);
      var updatedCard = this.srs.processAttempt(existingCard, isCorrect, confidence);
      this.storage.saveCard(qId, updatedCard);

      if (!isCorrect) {
        this.storage.recordMistake(qId, errorType || 'unclassified');
      }
    }

    this.persistActiveSession();
    return answerRecord;
  };

  QuestionEngine.prototype.persistActiveSession = function() {
    if (this.currentSession && this.currentSession.status === 'active') {
      this.storage.saveActiveSession(this.currentSession);
    }
  };

  QuestionEngine.prototype.getResumableSession = function() {
    var active = this.storage.getActiveSession();
    if (active && active.status === 'active' && active.questionIds && active.questionIds.length > 0) {
      this.currentSession = active;
      return active;
    }
    return null;
  };

  /**
   * Central scoring calculator implementing the active configuration.
   * Score = correct * positiveMark - wrong * negativeMark - blank * blankPenalty - optionE * optionEPenalty
   * Does NOT clamp negative scores unless scoring.clampAtZero is explicitly true.
   */
  QuestionEngine.calculateScore = function(breakdown, scoringConfig) {
    var scoring = scoringConfig || (root.PSI_EXAM_CONFIG && root.PSI_EXAM_CONFIG.scoring) || {};
    var pos = (typeof scoring.positiveMark === 'number') ? scoring.positiveMark : 1.0;
    var neg = (typeof scoring.negativeMark === 'number') ? scoring.negativeMark : 0.25;
    var blk = (typeof scoring.blankPenalty === 'number') ? scoring.blankPenalty : 0.0;
    var optE = (typeof scoring.optionEPenalty === 'number') ? scoring.optionEPenalty : 0.0;

    var correct = (breakdown && breakdown.correct) || 0;
    var wrong = (breakdown && breakdown.wrong) || 0;
    var blank = (breakdown && breakdown.blank) || 0;
    var optionE = (breakdown && breakdown.optionE) || 0;

    var rawScore = (correct * pos) - (wrong * neg) - (blank * blk) - (optionE * optE);
    var score = Math.round(rawScore * 100) / 100;
    if (score === 0) score = 0; // Avoid -0 in JS

    if (scoring.clampAtZero) {
      score = Math.max(0, score);
    }
    return score;
  };

  QuestionEngine.prototype.calculateScore = function(breakdown, scoringConfig) {
    return QuestionEngine.calculateScore(breakdown, scoringConfig || this.config.scoring);
  };

  QuestionEngine.prototype.finishSession = function() {
    if (!this.currentSession) return null;

    var session = this.currentSession;
    session.status = 'completed';
    session.endTime = Date.now();

    var attempted = 0;
    var correct = 0;
    var wrong = 0;
    var optionE = 0;
    var blank = 0;

    var scoring = this.config.scoring;

    // Check all questions in the session
    for (var i = 0; i < session.questionIds.length; i++) {
      var qId = session.questionIds[i];
      var ans = session.answers[qId];
      if (!ans || ans.isBlank || ans.selectedIndex === null || ans.selectedIndex === undefined || ans.selectedIndex < 0) {
        blank++;
      } else if (ans.isOptionE || ans.selectedIndex === 4) {
        optionE++;
      } else if (ans.isCorrect) {
        correct++;
        attempted++;
      } else {
        wrong++;
        attempted++;
      }
    }

    var breakdown = {
      totalQuestions: session.questionIds.length,
      attempted: attempted,
      correct: correct,
      wrong: wrong,
      optionE: optionE,
      blank: blank
    };

    var score = QuestionEngine.calculateScore(breakdown, scoring);

    var summary = {
      id: session.id,
      date: new Date(session.startTime).toISOString().slice(0, 10),
      mode: session.mode,
      options: session.options || {},
      totalQuestions: session.questionIds.length,
      attempted: attempted,
      correct: correct,
      wrong: wrong,
      optionE: optionE,
      blank: blank,
      score: score,
      durationSec: Math.round((session.endTime - session.startTime) / 1000)
    };

    // If this was a lesson practice session, record lesson completion score
    if (session.mode === 'lesson_practice' && session.options && session.options.lessonId) {
      this.storage.recordLessonComplete(session.options.lessonId, score);
    }

    this.storage.recordSessionComplete(summary);
    this.currentSession = null;
    return summary;
  };

  root.PSIQuestionEngine = QuestionEngine;
})(typeof window !== 'undefined' ? window : this);
