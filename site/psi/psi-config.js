/**
 * Gujarat Police PSI Exam Configuration
 * All exam rules, scoring mechanics, syllabus taxonomy, and session parameters
 * are defined centrally here so they can be updated in ONE place when the
 * official notification drops.
 */
(function(root) {
  'use strict';

  var PSI_EXAM_CONFIG = {
    examName: "Gujarat Police PSI",
    targetYear: "2027 (Expected)",
    isOfficial2027Confirmed: false, // Flag clearly identifying unconfirmed status until official notification drops
    officialPortal: "https://gprb.gujarat.gov.in",

    // Paper Structure & Scoring Rules
    scoring: {
      positiveMark: 1.0,
      negativeMark: 0.25,
      blankPenalty: 0.25,      // Gujarat PSC/PRB deducts 0.25 for unattempted blank answers
      optionEPenalty: 0.0,     // Marking Option E ("Not Attempted") carries 0 deduction
      useOptionE: true,        // Historical Gujarat PRB practice; configurable
      clampAtZero: false,      // Do NOT clamp negative scores unless explicitly configured
      sectionalCutoffPercent: 40 // Each paper/part must be cleared independently
    },

    // Metro 40 Default Parameters
    metro40: {
      durationMinutes: 40,
      targetQuestions: 40,     // Flexible target, learning quality over strict count
      structure: [
        { label: "Due Revision", minMinutes: 0, maxMinutes: 5, weight: 0.25 },
        { label: "Adaptive MCQs", minMinutes: 5, maxMinutes: 30, weight: 0.50 },
        { label: "Repeated Mistakes", minMinutes: 30, maxMinutes: 37, weight: 0.15 },
        { label: "Active Recall", minMinutes: 37, maxMinutes: 40, weight: 0.10 }
      ]
    },

    // Spaced Repetition (Leitner 5-Box) Intervals in Days
    srs: {
      boxIntervalsDays: [1, 3, 7, 14, 30],
      unsurePenaltyFactor: 0.5,
      maxLapsesBeforeCritical: 2
    },

    // Taxonomy of Subjects and Topics (mapped to gujarat-gk.md & psi.md)
    taxonomy: {
      gujarat_gk: {
        name_en: "Gujarat General Knowledge",
        name_gu: "ગુજરાત સામાન્ય જ્ઞાન",
        topics: {
          geography: { name_en: "Geography & Borders", name_gu: "ભૂગોળ અને સરહદો" },
          history: { name_en: "History & Freedom Movement", name_gu: "ઇતિહાસ અને મુક્તિ સંગ્રામ" },
          culture: { name_en: "Culture, Literature & Heritage", name_gu: "સંસ્કૃતિ, સાહિત્ય અને વારસો" },
          economy: { name_en: "Economy & Ports", name_gu: "અર્થતંત્ર અને બંદરો" },
          admin_police: { name_en: "Administration & Police Setup", name_gu: "વહીવટ અને પોલીસ માળખું" }
        }
      },
      law_constitution: {
        name_en: "Constitution & Criminal Law",
        name_gu: "બંધારણ અને કાયદો",
        topics: {
          constitution: { name_en: "Indian Constitution", name_gu: "ભારતનું બંધારણ" },
          bns: { name_en: "Bharatiya Nyaya Sanhita (BNS)", name_gu: "ભારતીય ન્યાય સંહિતા (BNS)" },
          bnss: { name_en: "Bharatiya Nagarik Suraksha Sanhita (BNSS)", name_gu: "ભારતીય નાગરિક સુરક્ષા સંહિતા (BNSS)" },
          bsa: { name_en: "Bharatiya Sakshya Adhiniyam (BSA)", name_gu: "ભારતીય સાક્ષ્ય અધિનિયમ (BSA)" },
          police_act: { name_en: "Gujarat Police Act & Powers", name_gu: "ગુજરાત પોલીસ અધિનિયમ અને સત્તાઓ" }
        }
      },
      general_studies: {
        name_en: "General Studies & Science",
        name_gu: "સામાન્ય અભ્યાસ અને વિજ્ઞાન",
        topics: {
          science: { name_en: "General Science (Class 10)", name_gu: "સામાન્ય વિજ્ઞાન" },
          history_india: { name_en: "Indian History", name_gu: "ભારતનો ઇતિહાસ" },
          geography_india: { name_en: "Indian Geography", name_gu: "ભારતની ભૂગોળ" },
          psych_socio: { name_en: "Psychology & Sociology", name_gu: "મનોવિજ્ઞાન અને સમાજશાસ્ત્ર" }
        }
      },
      reasoning: {
        name_en: "General Mental Ability",
        name_gu: "બૌદ્ધિક ક્ષમતા (રિઝનિંગ)",
        topics: {
          analytical: { name_en: "Analytical & Series", name_gu: "વિશ્લેષણાત્મક અને શ્રેણી" },
          logic: { name_en: "Coding, Relations & Direction", name_gu: "કોડિંગ, સંબંધો અને દિશા" }
        }
      },
      current_affairs: {
        name_en: "Current Affairs",
        name_gu: "વર્તમાન પ્રવાહો",
        topics: {
          gujarat_affairs: { name_en: "Gujarat Initiatives", name_gu: "ગુજરાત પહેલ અને યોજનાઓ" },
          national_affairs: { name_en: "National & Defence Events", name_gu: "રાષ્ટ્રીય અને સંરક્ષણ ઘટનાઓ" }
        }
      }
    },

    // Beginner-First Foundation Structure (Scalable 7-module structure)
    // Note: Structural placeholders pending official 2027 GPRB notification confirmation.
    foundationModules: [
      { id: "mod_01", code: "01", title_en: "Constitution basics", title_gu: "ભારતીય બંધારણ પાયાના કોન્સેપ્ટ", subject: "law_constitution", topic: "constitution", lessonId: "lesson_const_fr", estMinutes: 20, isPlaceholder: false },
      { id: "mod_02", code: "02", title_en: "Gujarat Geography basics", title_gu: "ગુજરાત ભૂગોળ પાયાના કોન્સેપ્ટ", subject: "gujarat_gk", topic: "geography", lessonId: "lesson_geo_coastline", estMinutes: 15, isPlaceholder: false },
      { id: "mod_03", code: "03", title_en: "Gujarat History basics", title_gu: "ગુજરાત ઇતિહાસ પાયાના કોન્સેપ્ટ", subject: "gujarat_gk", topic: "history", lessonId: "lesson_hist_ivc", estMinutes: 20, isPlaceholder: false },
      { id: "mod_04", code: "04", title_en: "Criminal Law basics (BNS)", title_gu: "ફોજદારી કાયદો પાયાના કોન્સેપ્ટ (BNS)", subject: "law_constitution", topic: "bns", lessonId: "lesson_law_bns", estMinutes: 20, isPlaceholder: false },
      { id: "mod_05", code: "05", title_en: "General Science basics", title_gu: "સામાન્ય વિજ્ઞાન પાયાના કોન્સેપ્ટ", subject: "general_studies", topic: "science", lessonId: null, estMinutes: 20, isPlaceholder: true },
      { id: "mod_06", code: "06", title_en: "Reasoning basics", title_gu: "બૌદ્ધિક ક્ષમતા / રિઝનિંગ પાયાના કોન્સેપ્ટ", subject: "reasoning", topic: "analytical", lessonId: null, estMinutes: 25, isPlaceholder: true },
      { id: "mod_07", code: "07", title_en: "Current Affairs system", title_gu: "વર્તમાન પ્રવાહો પદ્ધતિ", subject: "current_affairs", topic: "gujarat_affairs", lessonId: null, estMinutes: 15, isPlaceholder: true }
    ],

    beginnerPath: [
      { id: "step_1", subject: "gujarat_gk", topic: "geography", lessonId: "lesson_geo_coastline", estMinutes: 15 },
      { id: "step_2", subject: "law_constitution", topic: "constitution", lessonId: "lesson_const_fr", estMinutes: 20 },
      { id: "step_3", subject: "law_constitution", topic: "bns", lessonId: "lesson_law_bns", estMinutes: 20 },
      { id: "step_4", subject: "gujarat_gk", topic: "history", lessonId: "lesson_hist_ivc", estMinutes: 20 },
      { id: "step_5", subject: "gujarat_gk", topic: "admin_police", lessonId: "lesson_adm_hierarchy", estMinutes: 15 }
    ],

    // Topic Mastery Thresholds
    mastery: {
      minAttempts: 3,         // Must attempt at least 3 questions in topic
      minAccuracyPercent: 75, // 75%+ accuracy to achieve MASTERED
      practiceQuestionsPerLesson: 5
    },

    // Diagnostic Test Parameters
    diagnostic: {
      questionCount: 10,
      subjects: ["gujarat_gk", "law_constitution", "general_studies", "reasoning"]
    },

    // Daily Study Mission Targets
    dailyMission: {
      targetTopics: 1,
      targetQuestions: 15,
      targetMistakesReviewed: 3,
      targetSrsReviews: 5,
      estTotalMinutes: 45
    }
  };

  root.PSI_EXAM_CONFIG = PSI_EXAM_CONFIG;
})(typeof window !== 'undefined' ? window : this);
