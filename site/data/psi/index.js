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
            self.normalizeOptions(item);
            self.questions.push(item);
            self.questionMap[item.id] = item;
          }
        } else {
          console.warn('[Goal QuestionBank] Question failed schema validation and was skipped:', item ? item.id : 'unknown');
        }
      });
    },

    /**
     * Canonicalises the Option E label and, for non-official questions,
     * deterministically shuffles A-D (seeded by question id) so the correct
     * answer is not biased toward particular positions. Stable across
     * sessions, so SRS history and mistake logs stay consistent.
     */
    normalizeOptions: function(q) {
      var E_EN = '(E) Not Attempted';
      var E_GU = '(E) પ્રયાસ કરેલ નથી';
      var gu = q.options_gu.slice(0, 4);
      var en = q.options_en.slice(0, 4);
      var positional = /\b(all|none|both|neither)\b[^.]*\b(above|these)\b|\b(option|choice)\s*\(?[A-D]\b/i;
      var hasPositional = en.some(function(o) { return positional.test(o); }) ||
        positional.test(q.explanation_en || '');
      var official = q.sourceType === 'PYQ_OFFICIAL' || q.sourceType === 'PYQ_REPRODUCED';

      if (!official && !hasPositional && q.answer < 4) {
        // seeded Fisher-Yates over indices [0..3]
        var h = 2166136261;
        for (var i = 0; i < q.id.length; i++) { h ^= q.id.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
        var order = [0, 1, 2, 3];
        for (var j = 3; j > 0; j--) {
          h = (Math.imul(h, 1103515245) + 12345) >>> 0;
          var k = (h >>> 8) % (j + 1);
          var t = order[j]; order[j] = order[k]; order[k] = t;
        }
        q.answer = order.indexOf(q.answer);
        gu = order.map(function(ix) { return gu[ix]; });
        en = order.map(function(ix) { return en[ix]; });
      }
      q.options_gu = gu.concat([E_GU]);
      q.options_en = en.concat([E_EN]);
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
