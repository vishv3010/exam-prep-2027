/**
 * Gujarat Police PSI Question Bank Registry & Validator
 * Aggregates questions across subject datasets and validates schema completeness.
 */
(function(root) {
  'use strict';

  var QuestionBank = {
    questions: [],
    questionMap: {},

    /**
     * Validates and registers an array of question objects into the trusted bank
     */
    register: function(items) {
      if (!Array.isArray(items)) return;
      var self = this;
      items.forEach(function(item) {
        if (self.validate(item)) {
          if (!self.questionMap[item.id]) {
            self.questions.push(item);
            self.questionMap[item.id] = item;
          }
        } else {
          console.warn('[PSI QuestionBank] Question failed schema validation and was skipped:', item ? item.id : 'unknown');
        }
      });
    },

    /**
     * Strict schema validator ensuring bilingual completeness and verified source attribution
     */
    validate: function(q) {
      if (!q || typeof q !== 'object') return false;
      if (!q.id || typeof q.id !== 'string') return false;
      if (!q.subject || !q.topic) return false;
      if (!q.question_gu || !q.question_en) return false;
      if (!Array.isArray(q.options_gu) || !Array.isArray(q.options_en)) return false;
      if (q.options_gu.length < 4 || q.options_en.length < 4) return false;
      if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options_gu.length) return false;
      if (!q.explanation_gu || !q.explanation_en) return false;
      if (!q.sourceType) return false;

      // Ensure valid sourceType
      var validSources = ['PYQ_OFFICIAL', 'PYQ_REPRODUCED', 'REFERENCE', 'AI_GENERATED'];
      if (validSources.indexOf(q.sourceType) === -1) return false;

      return true;
    },

    getAll: function() {
      return this.questions;
    },

    getById: function(id) {
      return this.questionMap[id] || null;
    },

    filterBySubject: function(subject) {
      return this.questions.filter(function(q) { return q.subject === subject; });
    },

    filterByTopic: function(subject, topic) {
      return this.questions.filter(function(q) { return q.subject === subject && q.topic === topic; });
    },

    filterBySourceType: function(type) {
      return this.questions.filter(function(q) { return q.sourceType === type; });
    },

    flushPending: function() {
      if (root.__PENDING_PYQ_DATA) {
        this.register(root.__PENDING_PYQ_DATA);
        delete root.__PENDING_PYQ_DATA;
      }
      if (root.__PENDING_GUJARAT_GK_DATA) {
        this.register(root.__PENDING_GUJARAT_GK_DATA);
        delete root.__PENDING_GUJARAT_GK_DATA;
      }
      if (root.__PENDING_LAW_DATA) {
        this.register(root.__PENDING_LAW_DATA);
        delete root.__PENDING_LAW_DATA;
      }
      if (root.__PENDING_AI_PRACTICE_DATA) {
        this.register(root.__PENDING_AI_PRACTICE_DATA);
        delete root.__PENDING_AI_PRACTICE_DATA;
      }
    }
  };

  QuestionBank.flushPending();
  root.PSI_QUESTION_BANK = QuestionBank;
})(typeof window !== 'undefined' ? window : this);
