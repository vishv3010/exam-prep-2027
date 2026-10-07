/**
 * Pulls the ~130 bilingual questions from the v1 app (site/legacy/*.js) into the new topics.
 * They keep their Gujarati text (toggle on the card) and source tag (official PYQ etc.).
 * Load this AFTER the legacy files and all topic content.
 */
(function (root) {
  'use strict';
  var G = root.GOAL;

  var MAP = {
    'mathematics::number_system': 'm_number', 'mathematics::percentages': 'm_percent',
    'mathematics::percentages_profit_loss': 'm_pl', 'mathematics::ratio_proportion': 'm_ratio',
    'mathematics::averages': 'm_avg', 'mathematics::interest': 'm_interest',
    'mathematics::time_and_work': 'm_tw', 'mathematics::speed_time_distance': 'm_tsd',
    'mathematics::algebra': 'm_algebra', 'mathematics::geometry': 'm_geometry',
    'mathematics::circles_geometry': 'm_geometry', 'mathematics::geometry_mensuration': 'm_mensuration',
    'mathematics::mensuration': 'm_mensuration', 'mathematics::trigonometry': 'm_trig',
    'mathematics::statistics': 'm_stats',
    'reasoning::coding_decoding': 'r_coding', 'reasoning::direction_sense': 'r_direction',
    'reasoning::number_series': 'r_series', 'reasoning::syllogisms': 'r_logic', 'reasoning::analytical': 'r_order',
    'english::vocabulary_synonyms': 'e_vocab', 'english::vocabulary_antonyms': 'e_vocab',
    'english::idioms_and_vocabulary': 'e_idioms', 'english::idioms_and_phrases': 'e_idioms',
    'english::one_word_substitution': 'e_idioms', 'english::phrasal_verbs': 'e_idioms',
    'general_studies::general_science_physics': 'g_physics', 'general_studies::general_science_biology': 'g_bio',
    'general_studies::science': 'g_bio', 'general_studies::modern_indian_history': 'g_hist_modern',
    'general_studies::physical_geography': 'g_geo', 'general_studies::psych_socio': 'g_static',
    'gujarat_gk::geography': 'p_guj_geo', 'gujarat_gk::gujarat_geography_rivers': 'p_guj_geo', 'gujarat_gk::economy': 'p_guj_geo',
    'gujarat_gk::history': 'p_guj_hist', 'gujarat_gk::gujarat_history_architecture': 'p_guj_hist', 'gujarat_gk::culture': 'p_guj_hist',
    'gujarat_gk::admin_police': 'p_admin', 'gujarat_gk::police_administration_structure': 'p_admin',
    'gujarat_gk::panchayati_raj_gujarat': 'p_admin', 'gujarat_gk::administrative_lexicon': 'p_admin',
    'law_constitution::constitution': 'g_polity', 'law_constitution::fundamental_rights_writs': 'g_polity',
    'law_constitution::constitutional_amendments': 'g_polity',
    'law_constitution::bns': 'p_admin', 'law_constitution::bnss': 'p_admin', 'law_constitution::bsa': 'p_admin',
    'law_constitution::police_act': 'p_admin'
  };

  function topicFor(q) {
    var key = q.subject + '::' + q.topic;
    if (MAP[key]) return MAP[key];
    if (q.subject === 'english') return 'e_grammar';
    if (q.subject === 'general_studies') {
      if (/^physics/.test(q.topic)) return 'g_physics';
      if (/^chemistry/.test(q.topic)) return 'g_chem';
      if (/^biology/.test(q.topic)) return 'g_bio';
    }
    return null;
  }

  var SOURCES = ['__PENDING_PYQ_DATA', '__PENDING_GUJARAT_GK_DATA', '__PENDING_LAW_DATA', '__PENDING_AI_PRACTICE_DATA',
    '__PENDING_DIAGNOSTIC_DATA', '__PENDING_MATH_DATA', '__PENDING_ENGLISH_DATA', '__PENDING_SCIENCE_DATA', '__PENDING_LEXICON_DATA'];
  var seen = {}, added = 0, skipped = 0;
  var positional = /\b(all|none|both|neither)\b.*\b(above|these|of them)\b/i;

  SOURCES.forEach(function (name) {
    var list = root[name];
    if (!Array.isArray(list)) return;
    var byTopic = {};
    list.forEach(function (q) {
      if (!q || seen[q.id]) return;
      seen[q.id] = 1;
      var tid = topicFor(q);
      var en = (q.options_en || []).slice(0, 4);
      if (!tid || !G.topicMap[tid] || en.length !== 4 || !(q.answer >= 0 && q.answer < 4)) { skipped++; return; }
      var gu = (q.options_gu || []).slice(0, 4);
      var it = {
        type: 'mcq', id: 'v1:' + q.id,
        q: q.question_en, o: en, a: q.answer, why: q.explanation_en || '',
        gu: q.question_gu ? { q: q.question_gu, o: gu.length === 4 ? gu : null, why: q.explanation_gu || '' } : null,
        src: q.sourceType === 'PYQ_OFFICIAL' ? 'PSI PYQ ' + (q.sourceYear || '') : null,
        fixed: en.some(function (o) { return positional.test(o); })
      };
      if (/mathematics|reasoning/.test(q.subject)) it.pen = 1;
      (byTopic[tid] = byTopic[tid] || []).push(it);
      added++;
    });
    for (var tid in byTopic) G.add(tid, byTopic[tid]);
  });

  G.legacyCount = added;
  G.legacySkipped = skipped;
})(typeof window !== 'undefined' ? window : globalThis);
