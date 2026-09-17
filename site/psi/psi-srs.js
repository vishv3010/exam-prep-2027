/**
 * Gujarat Police PSI Spaced Repetition System (SRS) & Mistake Classifier
 * Implements a lightweight Leitner 5-box model and 3-category error diagnosis:
 * 1. GAP: Didn't know concept/fact
 * 2. MISREAD: Misread question stem/distractor
 * 3. SLIP: Careless calculation or process error
 */
(function(root) {
  'use strict';

  var MS_PER_DAY = 86400000;

  var PSISRS = {
    // Leitner intervals in days: [Box 1, Box 2, Box 3, Box 4, Box 5]
    intervals: [1, 3, 7, 14, 30],

    /**
     * Calculates updated card state after an attempt
     */
    processAttempt: function(existingCard, isCorrect, confidence) {
      var now = Date.now();
      var card = existingCard ? Object.assign({}, existingCard) : {
        box: 1,
        lapses: 0,
        attempts: 0,
        correct: 0,
        wrong: 0,
        due: now,
        lastSeen: now
      };

      card.attempts += 1;
      card.lastSeen = now;

      if (isCorrect) {
        card.correct += 1;
        if (confidence === 'unsure') {
          // Keep in current box or halve interval for unsure answers
          var currentDays = this.intervals[card.box - 1] || 1;
          card.due = now + Math.max(1, Math.round(currentDays * 0.5)) * MS_PER_DAY;
        } else {
          // Confident correct advances to next box
          card.box = Math.min(5, card.box + 1);
          var nextDays = this.intervals[card.box - 1] || 1;
          card.due = now + nextDays * MS_PER_DAY;
        }
      } else {
        // Incorrect reset to Box 1
        card.wrong += 1;
        card.lapses += 1;
        card.box = 1;
        card.due = now + this.intervals[0] * MS_PER_DAY;
      }

      return card;
    },

    isDue: function(card) {
      if (!card) return true; // Unseen questions are ready
      return Date.now() >= (card.due || 0);
    },

    filterDue: function(questions, storage) {
      var self = this;
      return questions.filter(function(q) {
        var card = storage.getCard(q.id);
        // Only return if it has been attempted before and is now due
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
          subjectStats[q.subject] = { attempted: 0, correct: 0, wrong: 0 };
        }
        subjectStats[q.subject].attempted += card.attempts;
        subjectStats[q.subject].correct += card.correct;
        subjectStats[q.subject].wrong += card.wrong;

        // Topic aggregation
        var tKey = q.subject + '::' + q.topic;
        if (!topicStats[tKey]) {
          topicStats[tKey] = { subject: q.subject, topic: q.topic, attempted: 0, correct: 0, wrong: 0 };
        }
        topicStats[tKey].attempted += card.attempts;
        topicStats[tKey].correct += card.correct;
        topicStats[tKey].wrong += card.wrong;
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

  root.PSISRS = PSISRS;
})(typeof window !== 'undefined' ? window : this);
