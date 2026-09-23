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
   * Builds Calibrated Diagnostic Assessment session covering all 5 core syllabus domains:
   * Section 1: Quantitative Aptitude & Arithmetic (5 Qs)
   * Section 2: Reasoning & Mental Ability (4 Qs)
   * Section 3: English Language & Grammar (5 Qs)
   * Section 4: General Knowledge & Constitution (6 Qs)
   * Section 5: Gujarat GK & Administrative Awareness (5 Qs)
   */
  QuestionEngine.prototype.buildDiagnosticSession = function() {
    var all = this.bank.getAll();
    var diagQs = all.filter(function(q) {
      return typeof q.diagnosticSection === 'number';
    });

    if (diagQs.length > 0) {
      // Sort strictly by section (1 to 5), then by id
      diagQs.sort(function(a, b) {
        if (a.diagnosticSection !== b.diagnosticSection) {
          return a.diagnosticSection - b.diagnosticSection;
        }
        return a.id.localeCompare(b.id);
      });
      return diagQs.map(function(q) { return q.id; });
    }

    // Fallback if tagged diagnostic questions are absent
    var subjects = (this.config.diagnostic && this.config.diagnostic.subjects) || ["mathematics", "reasoning", "english", "law_constitution", "gujarat_gk"];
    var selectedIds = [];
    var seenMap = {};

    for (var i = 0; i < subjects.length; i++) {
      var subj = subjects[i];
      var pool = shuffle(this.bank.filterBySubject(subj));
      var count = 0;
      for (var j = 0; j < pool.length && count < 5; j++) {
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
      questionStartTime: Date.now(),
      totalDurationSec: (mode === 'metro40' ? (this.config.metro40.durationMinutes * 60) : 0),
      timeRemainingSec: (mode === 'metro40' ? (this.config.metro40.durationMinutes * 60) : 0),
      status: 'active'
    };

    this.currentSession = session;
    this.persistActiveSession();
    return session;
  };

  QuestionEngine.prototype.recordAnswer = function(qId, selectedOptionIndex, confidence, errorType, timeSpentSec) {
    if (!this.currentSession) return null;

    var question = this.bank.getById(qId);
    if (!question) return null;

    var isBlank = (selectedOptionIndex === null || selectedOptionIndex === undefined || selectedOptionIndex < 0);
    var isOptionE = (!isBlank && selectedOptionIndex === 4);
    var isCorrect = (!isBlank && !isOptionE && selectedOptionIndex === question.answer);

    var now = Date.now();
    var elapsed = this.currentSession.questionStartTime ? Math.max(1, Math.round((now - this.currentSession.questionStartTime) / 1000)) : 0;
    var finalTimeSpent = (typeof timeSpentSec === 'number' && timeSpentSec > 0) ? timeSpentSec : elapsed;

    var answerRecord = {
      qId: qId,
      selectedIndex: isBlank ? null : selectedOptionIndex,
      isBlank: isBlank,
      isCorrect: isCorrect,
      isOptionE: isOptionE,
      confidence: confidence || (isCorrect ? 'confident' : 'unsure'),
      errorType: errorType || (isCorrect ? null : 'unclassified'),
      timeSpentSec: finalTimeSpent,
      timestamp: now
    };

    this.currentSession.answers[qId] = answerRecord;
    this.currentSession.questionStartTime = now;

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

    // If this was a diagnostic session, compute comprehensive diagnostic assessment report
    if (session.mode === 'diagnostic') {
      var diagReport = this.evaluateDiagnosticReport(session, summary);
      summary.diagnosticReport = diagReport;
      this.storage.saveDiagnosticResult(diagReport);
    }

    this.storage.recordSessionComplete(summary);
    this.currentSession = null;
    return summary;
  };

  /**
   * Evaluates comprehensive multi-domain diagnostic assessment report:
   * 1. CURRENT LEVEL (per domain and overall)
   * 2. CRITICAL WEAKNESSES
   * 3. HIGH-RETURN TOPICS
   * 4. UNKNOWN AREAS
   * 5. IMMEDIATE 7-DAY TRAINING PLAN
   * 6. ESTIMATED STARTING PREPAREDNESS SCORE (0-100)
   */
  QuestionEngine.prototype.evaluateDiagnosticReport = function(session, summary) {
    var self = this;
    var sectionDefs = [
      { id: 1, name: "Quantitative Aptitude & Arithmetic", nameGu: "ગણિત અને અંકગણિત", relevance: "CDS Elementary Maths & PSI Paper 1 Part A" },
      { id: 2, name: "Reasoning & Mental Ability", nameGu: "તાર્કિક કસોટી અને માનસિક ક્ષમતા", relevance: "PSI Paper 1 Part A & CDS OIR" },
      { id: 3, name: "English Language & Grammar", nameGu: "અંગ્રેજી ભાષા અને વ્યાકરણ", relevance: "CDS English Paper 1 & PSI Paper 2" },
      { id: 4, name: "General Knowledge & Constitution", nameGu: "સામાન્ય જ્ઞાન અને ભારતીય બંધારણ", relevance: "CDS General Knowledge & PSI Paper 1 Part B" },
      { id: 5, name: "Gujarat GK & Administrative Awareness", nameGu: "ગુજરાત સામાન્ય જ્ઞાન અને વહીવટી પારિભાષિક જ્ઞાન", relevance: "PSI Paper 1 Part B & Paper 2 Gujarati" }
    ];

    function uniqueArr(arr) {
      var seen = {};
      var out = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] && !seen[arr[i]]) {
          seen[arr[i]] = true;
          out.push(arr[i]);
        }
      }
      return out;
    }

    var sectionStats = sectionDefs.map(function(def) {
      return {
        sectionIndex: def.id,
        name: def.name,
        nameGu: def.nameGu,
        relevance: def.relevance,
        total: 0,
        attempted: 0,
        correct: 0,
        wrong: 0,
        optionE: 0,
        blank: 0,
        timeSpentSec: 0,
        topics: {},
        wrongTopics: []
      };
    });

    var errorCounts = {
      KNOWLEDGE_GAP: 0,
      CALCULATION_SLIP: 0,
      MISREAD: 0,
      TIME_PRESSURE: 0,
      GUESSING: 0,
      UNCLASSIFIED: 0
    };

    var unknownTopics = [];

    // Analyze each question in diagnostic session
    for (var i = 0; i < session.questionIds.length; i++) {
      var qId = session.questionIds[i];
      var q = self.bank.getById(qId);
      if (!q) continue;

      var secIdx = (typeof q.diagnosticSection === 'number' && q.diagnosticSection >= 1 && q.diagnosticSection <= 5)
        ? (q.diagnosticSection - 1)
        : Math.min(4, Math.floor(i / 5));

      var sec = sectionStats[secIdx];
      sec.total++;

      var ans = session.answers[qId];
      var time = (ans && ans.timeSpentSec) || 0;
      sec.timeSpentSec += time;

      var cleanTopic = (q.topic || 'general').replace(/_/g, ' ');
      if (!sec.topics[cleanTopic]) sec.topics[cleanTopic] = { total: 0, correct: 0, wrong: 0 };
      sec.topics[cleanTopic].total++;

      if (!ans || ans.isBlank || ans.selectedIndex === null || ans.selectedIndex === undefined || ans.selectedIndex < 0) {
        sec.blank++;
        unknownTopics.push(cleanTopic);
      } else if (ans.isOptionE || ans.selectedIndex === 4) {
        sec.optionE++;
        unknownTopics.push(cleanTopic);
      } else if (ans.isCorrect) {
        sec.correct++;
        sec.attempted++;
        sec.topics[cleanTopic].correct++;
      } else {
        sec.wrong++;
        sec.attempted++;
        sec.topics[cleanTopic].wrong++;
        sec.wrongTopics.push(cleanTopic);

        var err = (ans.errorType || 'UNCLASSIFIED').toUpperCase();
        if (err.indexOf('GAP') !== -1) errorCounts.KNOWLEDGE_GAP++;
        else if (err.indexOf('SLIP') !== -1 || err.indexOf('CALC') !== -1) errorCounts.CALCULATION_SLIP++;
        else if (err.indexOf('MISREAD') !== -1) errorCounts.MISREAD++;
        else if (err.indexOf('TIME') !== -1) errorCounts.TIME_PRESSURE++;
        else if (err.indexOf('GUESS') !== -1) errorCounts.GUESSING++;
        else errorCounts.UNCLASSIFIED++;

        if (err.indexOf('GAP') !== -1 || err.indexOf('GUESS') !== -1) {
          unknownTopics.push(cleanTopic);
        }
      }
    }

    // Process section metrics
    sectionStats.forEach(function(sec) {
      sec.accuracy = sec.attempted > 0 ? Math.round((sec.correct / sec.attempted) * 100) : 0;
      sec.score = Math.round(((sec.correct * 1.0) - (sec.wrong * 0.25)) * 100) / 100;
      sec.avgTimeSec = sec.total > 0 ? Math.round(sec.timeSpentSec / sec.total) : 0;
      sec.wrongTopics = uniqueArr(sec.wrongTopics);

      if (sec.accuracy >= 75) {
        sec.level = 'Exam Ready';
        sec.levelGu = 'પરીક્ષા માટે તૈયાર';
        sec.badgeClass = 'mastered';
      } else if (sec.accuracy >= 45) {
        sec.level = 'Developing';
        sec.levelGu = 'વિકાસશીલ';
        sec.badgeClass = 'practicing';
      } else {
        sec.level = 'Foundation';
        sec.levelGu = 'પાયાનું સ્તર (Foundation)';
        sec.badgeClass = 'foundation';
      }
    });

    // Overall metrics
    var totalAttempted = summary.attempted || 0;
    var totalCorrect = summary.correct || 0;
    var totalWrong = summary.wrong || 0;
    var totalQs = session.questionIds.length || 25;
    var rawScore = (totalCorrect * 1.0) - (totalWrong * 0.25);
    var netScore = Math.max(0, Math.round(rawScore * 100) / 100);
    var overallPreparednessScore = Math.min(100, Math.max(0, Math.round((netScore / totalQs) * 100)));

    var overallLevel = 'Foundation';
    var overallLevelGu = 'પાયાનું સ્તર (Foundation)';
    if (overallPreparednessScore >= 75) {
      overallLevel = 'Exam Ready';
      overallLevelGu = 'પરીક્ષા માટે તૈયાર';
    } else if (overallPreparednessScore >= 45) {
      overallLevel = 'Developing';
      overallLevelGu = 'વિકાસશીલ';
    }

    // Critical Weaknesses Identification
    var sortedSections = sectionStats.slice().sort(function(a, b) {
      return a.accuracy - b.accuracy;
    });

    var criticalWeaknesses = [];
    sortedSections.forEach(function(sec) {
      if (sec.accuracy < 50 || sec.wrong >= sec.correct) {
        var advice = '';
        if (sec.sectionIndex === 1) {
          advice = "Core arithmetic calculation speed and percentage/ratio foundations require immediate daily problem-solving drills before moving to higher CDS algebra.";
        } else if (sec.sectionIndex === 2) {
          advice = "Logical deduction rules and sequential pattern recognition (number series & syllogisms) need active daily drills to eliminate guessing.";
        } else if (sec.sectionIndex === 3) {
          advice = "Subject-verb agreement and conditional clauses need systematic revision; read grammar rules with active sentence correction exercises.";
        } else if (sec.sectionIndex === 4) {
          advice = "Constitutional articles (Articles 12-51A, Writs & Amendments) and NCERT Class 9-10 science concepts require disciplined daily active recall.";
        } else if (sec.sectionIndex === 5) {
          advice = "Gujarat administrative vocabulary (e.g. Aropnamu) and Panchayati Raj Act chronology must be committed to memory via flashcards.";
        }
        criticalWeaknesses.push({
          sectionName: sec.name,
          accuracy: sec.accuracy,
          wrongCount: sec.wrong,
          weakTopics: sec.wrongTopics,
          advice: advice
        });
      }
    });

    if (criticalWeaknesses.length === 0 && sortedSections.length > 0) {
      criticalWeaknesses.push({
        sectionName: sortedSections[0].name,
        accuracy: sortedSections[0].accuracy,
        wrongCount: sortedSections[0].wrong,
        weakTopics: sortedSections[0].wrongTopics,
        advice: "This was your lowest scoring domain. Strengthening this will yield the fastest jump in total score."
      });
    }

    // High Return Topics (Synergistic between CDS & Gujarat PSI)
    var highReturnTopics = [
      {
        topic: "Indian Constitution: Fundamental Rights & Writs (Articles 12-35)",
        synergy: "Carries 25-30% of PSI Paper 1 Part B and 15-20% of CDS General Knowledge paper."
      },
      {
        topic: "Commercial Arithmetic: Percentages, Ratio, and Time-Work",
        synergy: "Core scoring foundation for both CDS Elementary Maths (100 marks) and PSI Part A (100 marks)."
      },
      {
        topic: "English Grammar: Subject-Verb Agreement, Prepositions & Conditionals",
        synergy: "Directly determines 40+ marks in CDS English and the 30-mark English section of PSI Paper 2."
      },
      {
        topic: "General Science (NCERT Class 9-10 Physics & Biology)",
        synergy: "High-accuracy factual domain appearing consistently across CDS GK and state recruitment papers."
      },
      {
        topic: "Gujarat Administrative Lexicon & Panchayati Raj Chronology",
        synergy: "Non-negotiable scoring zone for Gujarat PSI Paper 2 Gujarati and Paper 1 Part B."
      }
    ];

    // Unknown Areas
    var cleanUnknowns = uniqueArr(unknownTopics).slice(0, 6);

    // Immediate 7-Day Training Plan
    var primaryWeak = sortedSections[0] || { name: 'Elementary Mathematics', weakTopics: ['Arithmetic'] };
    var secondaryWeak = sortedSections[1] || sortedSections[0] || { name: 'Indian Constitution', weakTopics: ['Writs'] };

    var primaryTopicName = (primaryWeak.weakTopics && primaryWeak.weakTopics.length > 0) ? primaryWeak.weakTopics[0] : primaryWeak.name;
    var secondaryTopicName = (secondaryWeak.weakTopics && secondaryWeak.weakTopics.length > 0) ? secondaryWeak.weakTopics[0] : secondaryWeak.name;

    var sevenDayPlan = [
      {
        day: 1,
        title: "Day 1: Foundation Triage - " + primaryWeak.name,
        focus: primaryWeak.name,
        tasks: [
          "Study foundational rules / theory for " + primaryTopicName + " (45 min)",
          "Solve 15 targeted practice MCQs with untimed review (45 min)",
          "Active recall reflection: log every mistake in error notebook (30 min)"
        ]
      },
      {
        day: 2,
        title: "Day 2: Formula & Speed Drill - " + primaryWeak.name,
        focus: primaryWeak.name,
        tasks: [
          "Formula / grammar rule active flashcards during Metro commute (30 min)",
          "Timed 12-question drill with strict Option E penalty discipline (35 min)",
          "Review step-by-step solutions for missed questions (35 min)"
        ]
      },
      {
        day: 3,
        title: "Day 3: Secondary Domain Attack - " + secondaryWeak.name,
        focus: secondaryWeak.name,
        tasks: [
          "Targeted concept notes reading for " + secondaryTopicName + " (45 min)",
          "Solve 10 practice MCQs + error categorization (45 min)",
          "Evening Metro commute review on smartphone (30 min)"
        ]
      },
      {
        day: 4,
        title: "Day 4: High-Yield Dual Synergy - Constitution & Lexicon",
        focus: "Indian Constitution & Administrative Terms",
        tasks: [
          "Deep dive: Articles 12-32 (Writs & Fundamental Rights) (45 min)",
          "Gujarat Administrative Terms flashcards (English <-> Gujarati) (30 min)",
          "Quick 10-question mixed drill (30 min)"
        ]
      },
      {
        day: 5,
        title: "Day 5: Spaced Repetition (SRS) Review Sprint",
        focus: "All Due Spaced Repetition Cards",
        tasks: [
          "Clear 100% of pending SM-2 SRS due cards in the app (40 min)",
          "Re-solve all previous mistakes logged under KNOWLEDGE_GAP (40 min)",
          "Formulate personal mnemonics for troublesome concepts (30 min)"
        ]
      },
      {
        day: 6,
        title: "Day 6: Timed Exam Speed Simulation",
        focus: "Speed & Accuracy under Clock",
        tasks: [
          "Run a timed 25-question mixed sprint under real exam conditions (40 min)",
          "Audit time per question: ensure <60 sec for GK, <90 sec for Quant (20 min)",
          "Physical training: 5 km tempo run aiming for steady sub-28 min pace (45 min)"
        ]
      },
      {
        day: 7,
        title: "Day 7: Weekly Audit & Checkpoint Retake",
        focus: "Progress Verification",
        tasks: [
          "Retake Diagnostic Assessment to measure score gain against baseline (40 min)",
          "Review overall preparedness index trajectory (20 min)",
          "Schedule next week's micro-sprint blocks based on new data (30 min)"
        ]
      }
    ];

    return {
      completedAt: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      totalQuestions: totalQs,
      attempted: totalAttempted,
      correct: totalCorrect,
      wrong: totalWrong,
      optionE: summary.optionE || 0,
      blank: summary.blank || 0,
      netScore: netScore,
      overallPreparednessScore: overallPreparednessScore,
      overallLevel: overallLevel,
      overallLevelGu: overallLevelGu,
      durationSec: summary.durationSec || 0,
      sections: sectionStats,
      criticalWeaknesses: criticalWeaknesses,
      highReturnTopics: highReturnTopics,
      unknownAreas: cleanUnknowns,
      sevenDayPlan: sevenDayPlan,
      errorMatrix: errorCounts
    };
  };

  root.PSIQuestionEngine = QuestionEngine;
})(typeof window !== 'undefined' ? window : this);
