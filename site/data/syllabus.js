/**
 * GOAL OS — Syllabus roadmap
 * Single source for the Syllabus tab: exam patterns, rules, and every topic with
 * its importance, study stage (what to complete first) and links into the
 * question bank (`match` = "subject::topic" keys used by data/psi/*).
 *
 * priority: 'high' | 'med' | 'low'   — relative weight in past papers (verify with your own PYQ analysis)
 * stage:    1..4                      — study order; finish stage 1 before stage 2, etc.
 * exams:    ['CDS'] | ['PSI'] | both
 */
(function(root) {
  'use strict';

  var STAGES = [
    { n: 1, en: 'Stage 1 · Foundations', gu: 'સ્ટેજ ૧ · પાયો', when: 'Oct, weeks 1–2',
      why: 'Highest-yield, shared by both exams, and everything else builds on these.' },
    { n: 2, en: 'Stage 2 · Core coverage', gu: 'સ્ટેજ ૨ · મુખ્ય વિષયો', when: 'Oct week 3 – Nov',
      why: 'First full pass of GK, remaining arithmetic and PSI law.' },
    { n: 3, en: 'Stage 3 · CDS depth', gu: 'સ્ટેજ ૩ · CDS ઊંડાણ', when: 'Nov – Dec',
      why: 'Algebra, geometry, trig and defence — CDS-heavy, done before mocks start.' },
    { n: 4, en: 'Stage 4 · PSI specials & polish', gu: 'સ્ટેજ ૪ · PSI ખાસ વિષયો', when: 'Dec onward',
      why: 'PSI-only areas and writing practice, then revision via mocks.' }
  ];

  var EXAMS = [
    {
      id: 'CDS', name: 'CDS I 2027 (UPSC)', date: '2027-04-11',
      pattern: [
        ['English', '120 Qs', '100 marks', '2 hrs'],
        ['General Knowledge', '120 Qs', '100 marks', '2 hrs'],
        ['Elementary Maths', '100 Qs', '100 marks', '2 hrs (not for OTA)']
      ],
      rules: [
        'Negative marking: 1/3 mark per wrong answer. Skipping is free.',
        'Guess only when you can eliminate two options.',
        'Maths is class-10 level — your cheapest 100 marks as an engineer.',
        'Apply for all four entries (IMA, INA, AFA, OTA) on one form. Notification ~2 Dec.'
      ]
    },
    {
      id: 'PSI', name: 'Gujarat PSI (GPRB)', date: null,
      pattern: [
        ['Paper 1 — General Studies', 'MCQ', '200 marks', ''],
        ['Paper 2 — Gujarati & English', 'Descriptive', '100 marks', 'handwritten'],
        ['PET (male)', '5000 m', 'qualifying', '≤ 25:00']
      ],
      rules: [
        'Option E ("Not Attempted") costs 0. A blank row costs 0.25 — never leave one empty.',
        'Wrong answer: −0.25.',
        '40% minimum in EACH part of Paper 1 — no weak section can be skipped.',
        'Paper 2 is written by hand and human-marked — practise writing, not just MCQs.',
        'Verify everything against the actual GPRB notification when it drops.'
      ]
    }
  ];

  var SUBJECTS = [
    {
      id: 'maths', en: 'Elementary Mathematics', gu: 'ગણિત', exams: ['CDS', 'PSI'],
      topics: [
        { id: 'm_number', name: 'Number system, HCF/LCM, divisibility', priority: 'high', stage: 1,
          tip: 'Divisibility rules and remainders appear every paper.', match: ['mathematics::number_system'] },
        { id: 'm_percent', name: 'Percentages', priority: 'high', stage: 1,
          tip: 'Base for profit/loss, interest and DI — do this first.', match: ['mathematics::percentages', 'mathematics::percentages_profit_loss'] },
        { id: 'm_ratio', name: 'Ratio, proportion, averages, mixtures', priority: 'high', stage: 1,
          tip: '', match: ['mathematics::ratio_proportion', 'mathematics::averages'] },
        { id: 'm_profit', name: 'Profit & loss, discount', priority: 'high', stage: 2,
          tip: '', match: ['mathematics::percentages_profit_loss'] },
        { id: 'm_interest', name: 'Simple & compound interest', priority: 'med', stage: 2,
          tip: '', match: ['mathematics::interest'] },
        { id: 'm_work', name: 'Time & work', priority: 'high', stage: 2,
          tip: 'Use the LCM-of-days method.', match: ['mathematics::time_and_work'] },
        { id: 'm_tsd', name: 'Time, speed & distance (trains, boats)', priority: 'high', stage: 2,
          tip: '', match: ['mathematics::speed_time_distance'] },
        { id: 'm_algebra', name: 'Algebra — factorisation, polynomials, linear & quadratic equations', priority: 'high', stage: 3,
          tip: 'Large share of CDS maths.', match: ['mathematics::algebra'] },
        { id: 'm_geometry', name: 'Geometry — lines, triangles, quadrilaterals, circles', priority: 'high', stage: 3,
          tip: 'Learn the theorems with diagrams, then drill.', match: ['mathematics::geometry', 'mathematics::circles_geometry', 'mathematics::geometry_mensuration'] },
        { id: 'm_trig', name: 'Trigonometry — ratios, identities, heights & distances', priority: 'high', stage: 3,
          tip: 'Memorise standard angle values cold.', match: ['mathematics::trigonometry'] },
        { id: 'm_mensuration', name: 'Mensuration — 2-D areas, 3-D volumes', priority: 'med', stage: 3,
          tip: 'One formula sheet, revised weekly.', match: ['mathematics::mensuration', 'mathematics::geometry_mensuration'] },
        { id: 'm_stats', name: 'Statistics — mean, median, mode, graphs', priority: 'low', stage: 3,
          tip: 'Small, easy marks — do it in one sitting.', match: ['mathematics::statistics'] }
      ]
    },
    {
      id: 'english', en: 'English', gu: 'અંગ્રેજી', exams: ['CDS', 'PSI'],
      topics: [
        { id: 'e_grammar', name: 'Grammar spine — tenses, articles, subject-verb agreement', priority: 'high', stage: 1,
          tip: 'Everything in error-spotting comes from these rules.', match: ['english::tenses', 'english::articles', 'english::subject_verb_agreement'] },
        { id: 'e_vocab', name: 'Vocabulary — 15 words/day (running, never "done")', priority: 'high', stage: 1,
          tip: 'Start today; it compounds.', match: ['english::vocabulary_synonyms', 'english::vocabulary_antonyms', 'english::idioms_and_vocabulary'] },
        { id: 'e_errors', name: 'Spotting errors & sentence improvement', priority: 'high', stage: 2,
          tip: '', match: ['english::spotting_errors', 'english::dangling_modifiers', 'english::question_tags'] },
        { id: 'e_prep', name: 'Prepositions, conjunctions, phrasal verbs', priority: 'med', stage: 2,
          tip: '', match: ['english::prepositions', 'english::prepositions_phrasal_verbs', 'english::phrasal_verbs', 'english::conjunctions'] },
        { id: 'e_rc', name: 'Reading comprehension — speed + accuracy', priority: 'high', stage: 2,
          tip: 'One passage a day, timed.', match: [] },
        { id: 'e_order', name: 'Sentence / word ordering', priority: 'med', stage: 3,
          tip: '', match: ['english::sentence_structure_conditionals', 'english::sentence_structure_inversion'] },
        { id: 'e_idioms', name: 'Idioms, phrases, one-word substitution', priority: 'med', stage: 3,
          tip: '', match: ['english::idioms_and_phrases', 'english::one_word_substitution'] },
        { id: 'e_voice', name: 'Voice & narration', priority: 'low', stage: 3,
          tip: 'More useful for PSI Paper 2 than CDS.', match: ['english::voice_transformation', 'english::direct_indirect_speech'] }
      ]
    },
    {
      id: 'gk', en: 'General Knowledge', gu: 'સામાન્ય જ્ઞાન', exams: ['CDS', 'PSI'],
      topics: [
        { id: 'g_polity', name: 'Polity — Constitution, Parliament, judiciary, federalism', priority: 'high', stage: 1,
          tip: 'Shared by CDS and PSI — highest overlap of any GK area.', match: ['law_constitution::constitution', 'law_constitution::fundamental_rights_writs', 'law_constitution::constitutional_amendments'] },
        { id: 'g_modern', name: 'Modern history & freedom struggle', priority: 'high', stage: 2,
          tip: 'Most-asked history segment.', match: ['general_studies::modern_indian_history'] },
        { id: 'g_ancient', name: 'Ancient & medieval history', priority: 'med', stage: 2,
          tip: '', match: [] },
        { id: 'g_geo', name: 'Geography — physical, Indian, world, maps', priority: 'high', stage: 2,
          tip: 'Keep an atlas open while studying.', match: ['general_studies::physical_geography'] },
        { id: 'g_physics', name: 'Physics (class 10 level)', priority: 'high', stage: 2,
          tip: '', match: ['general_studies::general_science_physics', 'general_studies::physics_mechanics', 'general_studies::physics_gravitation', 'general_studies::physics_optics', 'general_studies::physics_electricity', 'general_studies::physics_sound', 'general_studies::physics_atmospheric_refraction', 'general_studies::science'] },
        { id: 'g_chem', name: 'Chemistry (class 10 level)', priority: 'med', stage: 2,
          tip: '', match: ['general_studies::chemistry_acids_bases', 'general_studies::chemistry_metals', 'general_studies::chemistry_reactions', 'general_studies::chemistry_carbon'] },
        { id: 'g_bio', name: 'Biology (class 10 level)', priority: 'high', stage: 2,
          tip: 'Diseases, vitamins and human body systems recur.', match: ['general_studies::general_science_biology', 'general_studies::biology_tissues', 'general_studies::biology_life_processes', 'general_studies::biology_circulatory', 'general_studies::biology_endocrine', 'general_studies::biology_diseases'] },
        { id: 'g_economy', name: 'Economy — basics, budget, banking, schemes', priority: 'med', stage: 3,
          tip: '', match: [] },
        { id: 'g_defence', name: 'Defence — ranks, commands, equipment, exercises', priority: 'high', stage: 3,
          tip: 'CDS-specific and high-yield.', exams: ['CDS'], match: [] },
        { id: 'g_current', name: 'Current affairs (daily, capped at 30 min)', priority: 'med', stage: 1,
          tip: 'Running habit — never "done". Do not let it eat study time.', match: [] }
      ]
    },
    {
      id: 'gujarat', en: 'Gujarat GK', gu: 'ગુજરાત GK', exams: ['PSI'],
      topics: [
        { id: 'gj_geo', name: 'Gujarat geography — districts, rivers, coast, ports', priority: 'high', stage: 1,
          tip: 'Foundation lesson available in the app.', lesson: 'lesson_geo_coastline', match: ['gujarat_gk::geography', 'gujarat_gk::gujarat_geography_rivers'] },
        { id: 'gj_hist', name: 'Gujarat history — IVC sites, Solanki era, freedom movement', priority: 'high', stage: 2,
          tip: '', lesson: 'lesson_hist_ivc', match: ['gujarat_gk::history', 'gujarat_gk::gujarat_history_architecture'] },
        { id: 'gj_culture', name: 'Culture — fairs, dance, art, literature', priority: 'med', stage: 2,
          tip: '', match: ['gujarat_gk::culture'] },
        { id: 'gj_admin', name: 'Administration, Panchayati Raj, police hierarchy', priority: 'high', stage: 2,
          tip: '', lesson: 'lesson_adm_hierarchy', match: ['gujarat_gk::admin_police', 'gujarat_gk::police_administration_structure', 'gujarat_gk::panchayati_raj_gujarat'] },
        { id: 'gj_economy', name: 'Gujarat economy & institutions', priority: 'med', stage: 3,
          tip: '', match: ['gujarat_gk::economy'] }
      ]
    },
    {
      id: 'law', en: 'Law & Legal Matters', gu: 'કાયદો', exams: ['PSI'],
      topics: [
        { id: 'l_bns', name: 'BNS 2023 (replaces IPC) — essentials', priority: 'high', stage: 2,
          tip: 'Learn new section numbers, not old IPC ones.', lesson: 'lesson_law_bns', match: ['law_constitution::bns'] },
        { id: 'l_bnss', name: 'BNSS (replaces CrPC) — arrest, FIR, bail', priority: 'high', stage: 2,
          tip: '', match: ['law_constitution::bnss'] },
        { id: 'l_bsa', name: 'BSA (replaces Evidence Act)', priority: 'med', stage: 3,
          tip: '', match: ['law_constitution::bsa'] },
        { id: 'l_police', name: 'Gujarat Police Act & police powers', priority: 'med', stage: 3,
          tip: '', match: ['law_constitution::police_act'] }
      ]
    },
    {
      id: 'gujarati', en: 'Gujarati (formal)', gu: 'ગુજરાતી', exams: ['PSI'],
      topics: [
        { id: 'gu_vocab', name: 'Administrative vocabulary (daily)', priority: 'high', stage: 1,
          tip: 'Use the Lexicon flashcards in office gaps.', match: ['gujarat_gk::administrative_lexicon'] },
        { id: 'gu_grammar', name: 'Gujarati grammar — sandhi, samas, alankar, joDni', priority: 'high', stage: 3,
          tip: '', match: [] },
        { id: 'gu_writing', name: 'Descriptive writing — essay, letter, report (1 per week)', priority: 'high', stage: 4,
          tip: 'Paper 2 is handwritten. Only writing trains it.', match: [] }
      ]
    },
    {
      id: 'psi_extra', en: 'Reasoning, Psychology & Sociology', gu: 'રિઝનિંગ અને મનોવિજ્ઞાન', exams: ['PSI'],
      topics: [
        { id: 'r_verbal', name: 'Reasoning — series, coding, direction, syllogism', priority: 'med', stage: 4,
          tip: 'Also needed for SSC CGL and SSB OIR.', match: ['reasoning::number_series', 'reasoning::coding_decoding', 'reasoning::direction_sense', 'reasoning::syllogisms', 'reasoning::analytical'] },
        { id: 'p_psych', name: 'Psychology & Sociology basics', priority: 'med', stage: 4,
          tip: 'Unusual on a police paper but genuinely tested. Do not skip.', match: ['general_studies::psych_socio'] }
      ]
    }
  ];

  // Topics inherit the subject's exam tags unless they set their own
  SUBJECTS.forEach(function(s) {
    s.topics.forEach(function(t) { if (!t.exams) t.exams = s.exams; });
  });

  root.GOAL_SYLLABUS = { stages: STAGES, exams: EXAMS, subjects: SUBJECTS };
})(typeof window !== 'undefined' ? window : this);
