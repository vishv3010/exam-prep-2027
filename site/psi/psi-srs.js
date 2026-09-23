/**
 * GOAL OS SuperMemo SM-2 Spaced Repetition System (SRS) & Adaptive Memory Engine
 * Implements authentic SuperMemo SM-2 algorithm:
 * - Easiness Factor (EF) initialized to 2.5 (min 1.3)
 * - Intervals: I(1) = 1 day, I(2) = 6 days, I(n) = I(n-1) * EF
 * - Quality Rating scale: 0 to 5
 * - Error classification (GAP, MISREAD, SLIP, TIME_PRESSURE, GUESS)
 * - Backward-compatible with legacy Leitner cards (box 1-5)
 */
(function(root) {
  'use strict';

  var MS_PER_DAY = 86400000;
  var MIN_EF = 1.3;
  var DEFAULT_EF = 2.5;

  var GoalSRS = {
    /**
     * Map attempt parameters to SM-2 Quality score (0-5)
     */
    calculateQuality: function(isCorrect, confidence, errorType, timeSeconds, expectedSeconds) {
      if (!isCorrect) {
        if (errorType === 'misread' || errorType === 'slip') return 2; // Near miss
        if (errorType === 'gap') return 1;                            // Conceptual blackout
        return 1;
      }

      // Answer was correct
      if (confidence === 'unsure') return 3; // Correct with difficulty/guessing
      if (expectedSeconds && timeSeconds && timeSeconds > (expectedSeconds * 1.5)) {
        return 4; // Correct but sluggish
      }
      return 5; // Fast, confident, correct
    },

    /**
     * Processes an attempt using true SuperMemo SM-2 algorithm
     */
    processAttempt: function(existingCard, isCorrect, confidence, errorType, timeSeconds, expectedSeconds) {
      var now = Date.now();
      var q = typeof confidence === 'number' 
        ? confidence 
        : this.calculateQuality(isCorrect, confidence, errorType, timeSeconds, expectedSeconds);

      // Normalize existing card or initialize new SM-2 card
      var card = existingCard ? Object.assign({}, existingCard) : {
        repetition: 0,
        ef: DEFAULT_EF,
        intervalDays: 0,
        lapses: 0,
        attempts: 0,
        correct: 0,
        wrong: 0,
        box: 1, // legacy support
        due: now,
        lastSeen: now,
        history: []
      };

      // Ensure proper defaults if card was migrated from legacy Leitner
      if (typeof card.ef !== 'number' || isNaN(card.ef)) card.ef = DEFAULT_EF;
      if (typeof card.repetition !== 'number') card.repetition = card.box ? Math.max(0, card.box - 1) : 0;
      if (typeof card.intervalDays !== 'number') card.intervalDays = 1;
      if (!Array.isArray(card.history)) card.history = [];

      card.attempts += 1;
      card.lastSeen = now;

      // Update Easiness Factor (EF):
      // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
      var newEf = card.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
      card.ef = Math.max(MIN_EF, Math.round(newEf * 100) / 100);

      if (q >= 3) {
        // Successful recall (SM-2 progression)
        card.correct += 1;
        if (card.repetition === 0) {
          card.intervalDays = 1;
        } else if (card.repetition === 1) {
          card.intervalDays = 6;
        } else {
          card.intervalDays = Math.round(card.intervalDays * card.ef);
        }
        card.repetition += 1;
        card.due = now + (card.intervalDays * MS_PER_DAY);
      } else {
        // Failed recall (Reset cycle, record lapse)
        card.wrong += 1;
        card.lapses += 1;
        card.repetition = 0;
        card.intervalDays = 1;
        card.due = now + MS_PER_DAY; // Due tomorrow
      }

      // Maintain legacy box index (1 to 5) for backward compatibility
      if (card.intervalDays <= 1) card.box = 1;
      else if (card.intervalDays <= 3) card.box = 2;
      else if (card.intervalDays <= 7) card.box = 3;
      else if (card.intervalDays <= 16) card.box = 4;
      else card.box = 5;

      // Append compact history log (keep last 10 entries)
      card.history.push({
        t: now,
        q: q,
        sec: timeSeconds || null,
        err: !isCorrect ? (errorType || 'unclassified') : null
      });
      if (card.history.length > 10) {
        card.history.shift();
      }

      return card;
    },

    isDue: function(card) {
      if (!card) return true; // Unseen cards are eligible
      return Date.now() >= (card.due || 0);
    },

    filterDue: function(questions, storage) {
      var self = this;
      return questions.filter(function(q) {
        var card = storage.getCard(q.id);
        return card && self.isDue(card);
      });
    },

    filterUnseen: function(questions, storage) {
      return questions.filter(function(q) {
        return !storage.getCard(q.id);
      });
    },

    filterRepeatedMistakes: function(questions, storage) {
      return questions.filter(function(q) {
        var m = storage.getMistake(q.id);
        return m && m.count >= 2;
      });
    },

    filterRecentMistakes: function(questions, storage) {
      return questions.filter(function(q) {
        var m = storage.getMistake(q.id);
        return m && m.count >= 1;
      });
    },

    filterMarked: function(questions, storage) {
      return questions.filter(function(q) {
        return storage.isMarked(q.id);
      });
    },

    /**
     * Evaluates accuracy and identifies weakest subject/topic
     */
    evaluateWeakAreas: function(questions, storage) {
      var subjectStats = {};
      var topicStats = {};

      questions.forEach(function(q) {
        var card = storage.getCard(q.id);
        if (!card || card.attempts === 0) return;

        // Subject aggregation
        if (!subjectStats[q.subject]) {
          subjectStats[q.subject] = { attempted: 0, correct: 0, wrong: 0, lapses: 0 };
        }
        subjectStats[q.subject].attempted += card.attempts;
        subjectStats[q.subject].correct += card.correct;
        subjectStats[q.subject].wrong += card.wrong;
        subjectStats[q.subject].lapses += (card.lapses || 0);

        // Topic aggregation
        var tKey = q.subject + '::' + q.topic;
        if (!topicStats[tKey]) {
          topicStats[tKey] = { subject: q.subject, topic: q.topic, attempted: 0, correct: 0, wrong: 0, lapses: 0 };
        }
        topicStats[tKey].attempted += card.attempts;
        topicStats[tKey].correct += card.correct;
        topicStats[tKey].wrong += card.wrong;
        topicStats[tKey].lapses += (card.lapses || 0);
      });

      var weakestSubject = null;
      var minSubjAcc = 101;
      Object.keys(subjectStats).forEach(function(s) {
        var st = subjectStats[s];
        st.accuracy = Math.round((st.correct / st.attempted) * 100);
        if (st.attempted >= 3 && st.accuracy < minSubjAcc) {
          minSubjAcc = st.accuracy;
          weakestSubject = { subject: s, accuracy: st.accuracy, attempted: st.attempted };
        }
      });

      var weakestTopic = null;
      var minTopicAcc = 101;
      Object.keys(topicStats).forEach(function(t) {
        var tt = topicStats[t];
        tt.accuracy = Math.round((tt.correct / tt.attempted) * 100);
        if (tt.attempted >= 2 && tt.accuracy < minTopicAcc) {
          minTopicAcc = tt.accuracy;
          weakestTopic = tt;
        }
      });

      return {
        subjectStats: subjectStats,
        topicStats: topicStats,
        weakestSubject: weakestSubject,
        weakestTopic: weakestTopic
      };
    }
  };

  // Expose as both GoalSRS and legacy PSISRS alias
  root.GoalSRS = GoalSRS;
  root.PSISRS = GoalSRS;
})(typeof window !== 'undefined' ? window : this);
