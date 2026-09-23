/**
 * GOAL OS Unified Question Bank Registry & Validator
 * Supports multi-exam tagging (CDS, Gujarat PSI), bilingual validation,
 * subject/topic filtering, and source integrity checks.
 */
(function(root) {
  'use strict';

  var VALID_SOURCES = ['PYQ_OFFICIAL', 'PYQ_REPRODUCED', 'REFERENCE', 'SIMULATED', 'AI_GENERATED', 'AI_GENERATED_VERIFIED'];

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
          // Normalize exams tag if missing
          if (!Array.isArray(item.exams) || item.exams.length === 0) {
            item.exams = self.inferExams(item);
          }
          if (!self.questionMap[item.id]) {
            self.questions.push(item);
            self.questionMap[item.id] = item;
          }
        } else {
          console.warn('[Goal QuestionBank] Question failed schema validation and was skipped:', item ? item.id : 'unknown');
        }
      });
    },

    /**
     * Infers applicable exams based on subject taxonomy
     */
    inferExams: function(q) {
      if (q.subject === 'gujarat_gk') return ['PSI'];
      if (q.subject === 'law_constitution') {
        // Core constitution is high overlap; specific state law is PSI only
        if (q.topic === 'constitution') return ['CDS', 'PSI'];
        return ['PSI'];
      }
      if (q.subject === 'general_studies' || q.subject === 'science') return ['CDS', 'PSI'];
      if (q.subject === 'mathematics' || q.subject === 'quant') return ['CDS', 'PSI'];
      if (q.subject === 'reasoning') return ['CDS', 'PSI']; // CDS SSB OIR + PSI Paper 1 Part A
      if (q.subject === 'english') return ['CDS', 'PSI'];
      return ['PSI'];
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
      if (!q.sourceType || VALID_SOURCES.indexOf(q.sourceType) === -1) return false;

      return true;
    },

    getAll: function() {
      return this.questions;
    },

    getById: function(id) {
      return this.questionMap[id] || null;
    },

    filterByExam: function(examCode) {
      if (!examCode || examCode === 'ALL') return this.questions;
      return this.questions.filter(function(q) {
        return Array.isArray(q.exams) && q.exams.indexOf(examCode) !== -1;
      });
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
      if (root.__PENDING_DIAGNOSTIC_DATA) {
        this.register(root.__PENDING_DIAGNOSTIC_DATA);
        delete root.__PENDING_DIAGNOSTIC_DATA;
      }
      if (root.__PENDING_MATH_DATA) {
        this.register(root.__PENDING_MATH_DATA);
        delete root.__PENDING_MATH_DATA;
      }
      if (root.__PENDING_ENGLISH_DATA) {
        this.register(root.__PENDING_ENGLISH_DATA);
        delete root.__PENDING_ENGLISH_DATA;
      }
      if (root.__PENDING_SCIENCE_DATA) {
        this.register(root.__PENDING_SCIENCE_DATA);
        delete root.__PENDING_SCIENCE_DATA;
      }
      if (root.__PENDING_LEXICON_DATA) {
        this.register(root.__PENDING_LEXICON_DATA);
        delete root.__PENDING_LEXICON_DATA;
      }
    }
  };

  QuestionBank.flushPending();
  root.GoalQuestionBank = QuestionBank;
  root.PSI_QUESTION_BANK = QuestionBank; // Legacy alias
})(typeof window !== 'undefined' ? window : this);
