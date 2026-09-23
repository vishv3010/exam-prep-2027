/**
 * GOAL OS Academic Repertoire: English Language & Syntax
 * High-yield syllabus coverage for UPSC CDS English Paper 1 & Gujarat PSI Paper 2 (English).
 */
(function(root) {
  'use strict';

  var ENGLISH_QUESTIONS = [
    {
      id: "eng_sva_01",
      subject: "english",
      topic: "subject_verb_agreement",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Spot the error in the following sentence:\nThe police commissioner, along with his security staff, (A) / were present at the crime scene (B) / to monitor the situation. (C) / No error (D)",
      question_gu: "નીચેના વાક્યમાંથી વ્યાકરણની ભૂલ ધરાવતો ભાગ શોધો:\nThe police commissioner, along with his security staff, (A) / were present at the crime scene (B) / to monitor the situation. (C) / No error (D)",
      options_en: ["Part (A)", "Part (B)", "Part (C)", "Part (D) - No error", "Option E: Not Attempted"],
      options_gu: ["ભાગ (A)", "ભાગ (B)", "ભાગ (C)", "ભાગ (D) - કોઈ ભૂલ નથી", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // Part B
      explanation_en: "When two subjects are joined by 'along with', 'together with', or 'as well as', the verb agrees with the primary subject. Here, 'The police commissioner' is singular, so 'were present' in Part (B) must be 'was present'.",
      explanation_gu: "જ્યારે બે કર્તા 'along with', 'together with' કે 'as well as' થી જોડાયેલા હોય ત્યારે ક્રિયાપદ પ્રથમ કર્તા અનુસાર આવે છે. અહીં મુખ્ય કર્તા 'The police commissioner' એકવચન હોવાથી 'were' ના બદલે 'was' આવે (ભાગ B માં ભૂલ છે)."
    },
    {
      id: "eng_prep_01",
      subject: "english",
      topic: "prepositions",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Fill in the blank with the appropriate preposition:\nAll candidates must strictly abide _______ the instructions issued in the examination hall ticket.",
      question_gu: "યોગ્ય Preposition પસંદ કરીને ખાલી જગ્યા પૂરો:\nAll candidates must strictly abide _______ the instructions issued in the examination hall ticket.",
      options_en: ["with", "to", "by", "in", "Option E: Not Attempted"],
      options_gu: ["with", "to", "by", "in", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // by
      explanation_en: "The verb 'abide' always takes the fixed preposition 'by' when it means to conform to or accept a rule/instruction ('abide by the rules').",
      explanation_gu: "નિયમ કે આદેશનું પાલન કરવાના અર્થમાં 'abide' સાથે હંમેશાં ચોક્કસ Preposition 'by' ('abide by') વપરાય છે."
    },
    {
      id: "eng_inversion_01",
      subject: "english",
      topic: "sentence_structure_inversion",
      difficulty: "hard",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Choose the grammatically correct sentence involving negative adverb inversion:",
      question_gu: "નકારાત્મક ક્રિયાવિશેષણના Inversion (ઉલટા ક્રમ) ધરાવતું વ્યાકરણની દ્રષ્ટિએ સાચું વાક્ય પસંદ કરો:",
      options_en: [
        "Scarcely had the bell rung when the examination commenced.",
        "Scarcely the bell had rung than the examination commenced.",
        "Scarcely did the bell rang when the examination commenced.",
        "Scarcely had the bell rung than the examination commenced.",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "Scarcely had the bell rung when the examination commenced.",
        "Scarcely the bell had rung than the examination commenced.",
        "Scarcely did the bell rang when the examination commenced.",
        "Scarcely had the bell rung than the examination commenced.",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Negative adverbs like 'Scarcely' and 'Hardly' are followed by subject-auxiliary inversion (had + subject + V3) and are paired strictly with the conjunction 'when', not 'than'.",
      explanation_gu: "'Scarcely' કે 'Hardly' થી વાક્ય શરૂ થાય ત્યારે Inversion નિયમ મુજબ સહાયક ક્રિયાપદ કર્તાની પહેલાં આવે છે (had + subject + V3) અને જોડાણ હંમેશાં 'when' થી થાય છે ('than' થી નહિ)."
    },
    {
      id: "eng_conj_01",
      subject: "english",
      topic: "conjunctions",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Spot the error in the sentence:\nHe not only lost his ticket (A) / but also his wallet containing (B) / all official credentials. (C) / No error (D)",
      question_gu: "વાક્યમાં વ્યાકરણની ભૂલ શોધો:\nHe not only lost his ticket (A) / but also his wallet containing (B) / all official credentials. (C) / No error (D)",
      options_en: ["Part (A)", "Part (B)", "Part (C)", "Part (D) - No error", "Option E: Not Attempted"],
      options_gu: ["ભાગ (A)", "ભાગ (B)", "ભાગ (C)", "ભાગ (D) - કોઈ ભૂલ નથી", "E. ઉત્તર આપેલ નથી"],
      answer: 0, // Part A
      explanation_en: "Correlative conjunctions require parallel grammatical structures. Since 'but also' introduces a noun phrase ('his wallet'), 'not only' must introduce 'his ticket'. The correct word order is: 'He lost not only his ticket but also his wallet...'. Error is in Part (A).",
      explanation_gu: "'Not only... but also' માં સમાન પદ-રચના (Parallelism) હોવી જોઈએ. 'but also' પછી નામ ('his wallet') હોવાથી 'not only' પણ 'his ticket' ની આગળ આવવું જોઈએ: 'He lost not only his ticket but also his wallet'. ભાગ (A) માં ભૂલ છે."
    },
    {
      id: "eng_tense_01",
      subject: "english",
      topic: "tenses",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Fill in the blank with the correct tense form:\nInspector Patel _______ in the Armed Police Department for over ten years before he was promoted to Sub-Divisional Officer.",
      question_gu: "ક્રિયાપદનું યોગ્ય કાળ-રૂપ પસંદ કરીને ખાલી જગ્યા પૂરો:\nInspector Patel _______ in the Armed Police Department for over ten years before he was promoted to Sub-Divisional Officer.",
      options_en: [
        "has been serving",
        "had been serving",
        "was serving",
        "is serving",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "has been serving",
        "had been serving",
        "was serving",
        "is serving",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1, // had been serving
      explanation_en: "Past Perfect Continuous ('had been serving') is used to describe an action that had been going on for a period of time before another action occurred in the past ('was promoted').",
      explanation_gu: "ભૂતકાળમાં કોઈ ચોક્કસ ઘટના ('was promoted') ઘટી તે પહેલાં લાંબા સમયથી ચાલુ રહેલી ક્રિયા દર્શાવવા માટે ચાલુ પૂર્ણ ભૂતકાળ (Past Perfect Continuous: 'had been serving') વપરાય છે."
    },
    {
      id: "eng_idiom_01",
      subject: "english",
      topic: "idioms_and_phrases",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "What is the meaning of the idiom: 'A white elephant'?",
      question_gu: "રૂઢિપ્રયોગ (Idiom) 'A white elephant' નો સાચો અર્થ શું થાય?",
      options_en: [
        "A rare and precious possession",
        "An extremely costly possession that is burdensome and useless",
        "An auspicious symbol of state power",
        "A peaceful resolution to a conflict",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "અતિ કિંમતી અને દુર્લભ વસ્તુ",
        "ખૂબ ખર્ચાળ પરંતુ બોજારૂપ અને બિનઉપયોગી સંપત્તિ",
        "રાજ્યસત્તાનું શુભ પ્રતીક",
        "વિવાદનો શાંતિપૂર્ણ ઉકેલ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "'A white elephant' refers to a possession that is extremely expensive to maintain but yields little or no practical utility or profit.",
      explanation_gu: "'White elephant' એટલે એવી વસ્તુ કે મિલકત જેની જાળવણી પાછળ ખૂબ જ ખર્ચ થતો હોય પરંતુ તેનો કોઈ વ્યવહારિક ઉપયોગ કે લાભ ન હોય (ખર્ચાળ બોજ)."
    },
    {
      id: "eng_voice_01",
      subject: "english",
      topic: "voice_transformation",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Convert the following sentence into Active Voice:\n'The security protocol was breached by unidentified intruders during midnight.'",
      question_gu: "નીચેના કર્મણી વાક્યનું સાચું કર્તરી (Active Voice) રૂપ પસંદ કરો:\n'The security protocol was breached by unidentified intruders during midnight.'",
      options_en: [
        "Unidentified intruders breached the security protocol during midnight.",
        "Unidentified intruders were breaching the security protocol during midnight.",
        "Unidentified intruders had breached the security protocol during midnight.",
        "Unidentified intruders have breached the security protocol during midnight.",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "Unidentified intruders breached the security protocol during midnight.",
        "Unidentified intruders were breaching the security protocol during midnight.",
        "Unidentified intruders had breached the security protocol during midnight.",
        "Unidentified intruders have breached the security protocol during midnight.",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Passive 'was breached' is Simple Past tense (was/were + V3). Its active counterpart is simply Subject + V2 ('breached').",
      explanation_gu: "સાદા ભૂતકાળના કર્મણી વાક્ય 'was breached' નું કર્તરી રૂપ કર્તા + V2 ('breached') થાય છે."
    },
    {
      id: "eng_narration_01",
      subject: "english",
      topic: "direct_indirect_speech",
      difficulty: "hard",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Choose the correct indirect narration for:\nThe Commander said to the platoon, 'Do not break formation under any circumstances!'",
      question_gu: "નીચેના વાક્યનું સાચું પરોક્ષ કથન (Indirect Speech) પસંદ કરો:\nThe Commander said to the platoon, 'Do not break formation under any circumstances!'",
      options_en: [
        "The Commander told the platoon that they do not break formation under any circumstances.",
        "The Commander commanded the platoon not to break formation under any circumstances.",
        "The Commander requested the platoon to not break formation under any circumstances.",
        "The Commander warned the platoon that not to break formation under any circumstances.",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "The Commander told the platoon that they do not break formation under any circumstances.",
        "The Commander commanded the platoon not to break formation under any circumstances.",
        "The Commander requested the platoon to not break formation under any circumstances.",
        "The Commander warned the platoon that not to break formation under any circumstances.",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "In imperative military commands, reporting verb becomes 'commanded' or 'ordered', and negative imperative 'Do not + V1' becomes 'not to + V1'.",
      explanation_gu: "આજ્ઞાર્થ વાક્યમાં સૈન્ય સંદર્ભ હોવાથી reporting verb 'commanded' બને છે અને 'Do not break' નું જોડાણ 'not to break' થી થાય છે."
    },
    {
      id: "eng_vocab_01",
      subject: "english",
      topic: "vocabulary_synonyms",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Select the word that is most nearly SYNONYMOUS with: 'METICULOUS'",
      question_gu: "'METICULOUS' શબ્દનો સૌથી નજીકનો સમાનાર્થી (Synonym) શબ્દ પસંદ કરો:",
      options_en: ["Careless", "Thorough and precise", "Indifferent", "Hasty", "Option E: Not Attempted"],
      options_gu: ["બેદરકાર", "સૂક્ષ્મ અને અત્યંત ચોક્કસ (Thorough)", "ઉદાસીન", "ઉતાવળિયું", "E. ઉત્તર આપેલ નથી"],
      answer: 1,
      explanation_en: "'Meticulous' means showing great attention to detail, very careful, thorough, and precise.",
      explanation_gu: "'Meticulous' નો અર્થ દરેક નાની બાબતનું ધ્યાન રાખનાર, અત્યંત ચીવટવાળું અને ચોક્કસ (Thorough and precise) થાય છે."
    },
    {
      id: "eng_vocab_02",
      subject: "english",
      topic: "vocabulary_antonyms",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Select the word that is OPPOSITE (Antonym) in meaning to: 'EPHEMERAL'",
      question_gu: "'EPHEMERAL' શબ્દનો વિરોધી (Antonym) શબ્દ પસંદ કરો:",
      options_en: ["Transient", "Fleeting", "Permanent", "Momentary", "Option E: Not Attempted"],
      options_gu: ["ક્ષણભંગુર (Transient)", "અલ્પજીવી (Fleeting)", "શાશ્વત / કાયમી (Permanent)", "ક્ષણિક (Momentary)", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Permanent
      explanation_en: "'Ephemeral' means lasting for a very short time (transient, fleeting). Its opposite is 'Permanent' or 'Eternal'.",
      explanation_gu: "'Ephemeral' એટલે ક્ષણભંગુર કે અલ્પજીવી. તેનો વિરોધી શબ્દ 'Permanent' (કાયમી / દીર્ઘકાલીન) થાય છે."
    },
    {
      id: "eng_ow_01",
      subject: "english",
      topic: "one_word_substitution",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Give one word for: 'A state of disorder due to absence or non-recognition of authority or other controlling systems'",
      question_gu: "શબ્દસમૂહ માટે એક શબ્દ આપો: 'સત્તા કે શાસન વ્યવસ્થાના અભાવને કારણે સર્જાયેલી અરાજકતા કે અવ્યવસ્થા'",
      options_en: ["Autocracy", "Monarchy", "Anarchy", "Oligarchy", "Option E: Not Attempted"],
      options_gu: ["આપખુદશાહી (Autocracy)", "રાજાશાહી (Monarchy)", "અરાજકતા (Anarchy)", "અલ્પજનસત્તા (Oligarchy)", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Anarchy
      explanation_en: "'Anarchy' is a state of lawlessness or disorder resulting from the total absence of governmental authority.",
      explanation_gu: "કોઈપણ કાયદો, શાસન કે વહીવટી તંત્ર ન હોવાથી સર્જાતી સંપૂર્ણ અવ્યવસ્થાને 'Anarchy' (અરાજકતા) કહેવામાં આવે છે."
    },
    {
      id: "eng_tag_01",
      subject: "english",
      topic: "question_tags",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Complete the sentence with the appropriate question tag:\n'The patrol team rarely makes errors during surveillance, _______?'",
      question_gu: "યોગ્ય Question Tag પસંદ કરીને વાક્ય પૂર્ણ કરો:\n'The patrol team rarely makes errors during surveillance, _______?'",
      options_en: ["doesn't it", "does it", "don't they", "do they", "Option E: Not Attempted"],
      options_gu: ["doesn't it", "does it", "don't they", "do they", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // does it
      explanation_en: "'Rarely' gives the sentence a negative meaning, which requires a positive question tag. Since 'The patrol team' acts as a singular collective body with third-person singular present verb 'makes', the correct tag is 'does it?'.",
      explanation_gu: "'Rarely' નકારાત્મક અર્થ આપે છે, જેથી Question Tag હકારાત્મક હોવો જોઈએ. સામૂહિક સંજ્ઞા એકવચન તરીકે વપરાયેલ હોવાથી 'does it?' સાચો વિકલ્પ બને છે."
    },
    {
      id: "eng_article_01",
      subject: "english",
      topic: "articles",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Fill in the blank with the correct article:\nHe is _______ honourable officer who was awarded the President's Police Medal for gallantry.",
      question_gu: "યોગ્ય આર્ટિકલ પસંદ કરીને ખાલી જગ્યા પૂરો:\nHe is _______ honourable officer who was awarded the President's Police Medal for gallantry.",
      options_en: ["a", "an", "the", "No article needed", "Option E: Not Attempted"],
      options_gu: ["a", "an", "the", "કોઈ આર્ટિકલ જરૂરી નથી", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // an
      explanation_en: "'Honourable' begins with a silent 'h' and has a vowel sound (/ˈɒn.ər.ə.bəl/), hence it takes the indefinite article 'an'.",
      explanation_gu: "'Honourable' શબ્દનો પ્રથમ અક્ષર 'h' સાયલન્ટ છે અને તેનો ઉચ્ચાર સ્વર 'ઓ' થી થતો હોવાથી 'an' આર્ટિકલ વપરાય છે."
    },
    {
      id: "eng_participle_01",
      subject: "english",
      topic: "dangling_modifiers",
      difficulty: "hard",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Identify the grammatically correct sentence that avoids a dangling participle modifier:",
      question_gu: "Dangling Participle (અસ્પષ્ટ કર્તાદોષ) વગરનું વ્યાકરણની દ્રષ્ટિએ સાચું વાક્ય પસંદ કરો:",
      options_en: [
        "Walking towards the police station, my mobile phone slipped from my pocket.",
        "Walking towards the police station, I dropped my mobile phone from my pocket.",
        "While walking towards the police station, the phone was dropped by me.",
        "Having walked towards the police station, a mobile phone dropped.",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "Walking towards the police station, my mobile phone slipped from my pocket.",
        "Walking towards the police station, I dropped my mobile phone from my pocket.",
        "While walking towards the police station, the phone was dropped by me.",
        "Having walked towards the police station, a mobile phone dropped.",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "In Option 1, the participle 'Walking' modifies 'my mobile phone' (suggesting the phone was walking). In Option 2, the person walking ('I') is the immediate subject of the main clause, making it grammatically correct.",
      explanation_gu: "પ્રથમ વાક્યમાં 'Walking' નો કર્તા ફોન બની જાય છે (જે અશક્ય છે). બીજા વાક્યમાં ચાલનાર વ્યક્તિ 'I' મુખ્ય વાક્યનો કર્તા બને છે, જેથી વાક્ય દોષરહિત બને છે."
    },
    {
      id: "eng_phrasal_01",
      subject: "english",
      topic: "phrasal_verbs",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Choose the correct meaning of the phrasal verb: 'To call off'",
      question_gu: "Phrasal Verb 'To call off' નો સાચો અર્થ પસંદ કરો:",
      options_en: ["To postpone", "To cancel", "To summon formally", "To investigate", "Option E: Not Attempted"],
      options_gu: ["પાછળ ઠેલવવું (Postpone)", "રદ કરવું (Cancel)", "બોલાવવું (Summon)", "તપાસ કરવી (Investigate)", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // To cancel
      explanation_en: "'To call off' means to cancel an event, meeting, or strike. ('To put off' means to postpone).",
      explanation_gu: "'Call off' એટલે કોઈ આયોજિત કાર્યક્રમ, હડતાળ કે મિટિંગ 'રદ કરવી' (Cancel). (જ્યારે 'Put off' એટલે મુલતવી રાખવું)."
    }
  ];

  if (root.GoalQuestionBank && typeof root.GoalQuestionBank.register === 'function') {
    root.GoalQuestionBank.register(ENGLISH_QUESTIONS);
  } else {
    root.__PENDING_ENGLISH_DATA = ENGLISH_QUESTIONS;
  }

  root.PSI_ENGLISH_QUESTIONS = ENGLISH_QUESTIONS;
})(typeof window !== 'undefined' ? window : this);
