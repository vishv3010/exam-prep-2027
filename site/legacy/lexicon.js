/**
 * GOAL OS Academic Repertoire: Gujarat Administrative & Legal Lexicon
 * High-yield terminology trainer for Gujarat PSI Paper 2 (Gujarati & English) & Paper 1 Part B.
 */
(function(root) {
  'use strict';

  var LEXICON_QUESTIONS = [
    {
      id: "lex_adm_01",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati administrative term for 'Cognizable Offence'?",
      question_gu: "ગુજરાતી વહીવટી અને કાયદાકીય પારિભાષિક શબ્દાવલીમાં 'Cognizable Offence' નો અધિકૃત અર્થ શું થાય છે?",
      options_en: [
        "Police Adhikar Baahar No Gunho",
        "Police Adhikar No Gunho",
        "Jaamin Paatra Gunho",
        "Gaher-Kaydesar Gunho",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "પોલીસ અધિકાર બહારનો ગુનો (Non-Cognizable)",
        "પોલીસ અધિકારનો ગુનો (Cognizable)",
        "જામીનપાત્ર ગુનો (Bailable)",
        "ગેરકાયદેસર ગુનો",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1, // પોલીસ અધિકારનો ગુનો
      explanation_en: "Under criminal procedure (BNSS / CrPC), a 'Cognizable Offence' is officially translated as 'પોલીસ અધિકારનો ગુનો' — an offence in which a police officer may arrest without a warrant.",
      explanation_gu: "ફોજદારી કાર્યરીતિમાં 'Cognizable Offence' એટલે 'પોલીસ અધિકારનો ગુનો' — જેમાં પોલીસ અધિકારી વોરંટ વગર આરોપીની ધરપકડ કરી શકે છે."
    },
    {
      id: "lex_adm_02",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati legal term for 'Anticipatory Bail'?",
      question_gu: "'Anticipatory Bail' માટે કાયદાકીય વહીવટમાં કયો યોગ્ય ગુજરાતી શબ્દ વપરાય છે?",
      options_en: [
        "Niyamit Jaamin",
        "Antarim Jaamin",
        "Aagotara Jaamin",
        "Bin-Jaaminpaatra",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "નિયમિત જામીન (Regular Bail)",
        "અંતરીમ જામીન (Interim Bail)",
        "આગોતરા જામીન (Anticipatory Bail)",
        "બિન-જામીનપાત્ર (Non-Bailable)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2, // આગોતરા જામીન
      explanation_en: "Under Section 438 of CrPC / BNSS, bail sought in anticipation of arrest for a non-bailable offence is officially termed 'આગોતરા જામીન' (Anticipatory Bail).",
      explanation_gu: "ધરપકડ થવાની શક્યતા કે આશંકા હોય ત્યારે અગાઉથી મેળવવામાં આવતા જામીનને 'આગોતરા જામીન' (Anticipatory Bail) કહેવાય છે."
    },
    {
      id: "lex_adm_03",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati administrative term for 'Affidavit'?",
      question_gu: "'Affidavit' માટે અધિકૃત ગુજરાતી વહીવટી શબ્દ કયો છે?",
      options_en: [
        "Sogandnaamu",
        "Aropnaamu",
        "Panchnaamu",
        "Mukhtarnaamu",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "સોગંદનામું (Affidavit)",
        "આરોપનામું (Charge Sheet)",
        "પંચનામું (Inquest/Panchnama)",
        "મુખત્યારનામું (Power of Attorney)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // સોગંદનામું
      explanation_en: "'Affidavit' is a formal written statement sworn before an authorized magistrate or notary, officially termed 'સોગંદનામું' in Gujarati.",
      explanation_gu: "સોગંદ પર લેખિતમાં કરાતા એકરાર કે નિવેદનને ગુજરાતી વહીવટમાં 'સોગંદનામું' (Affidavit) કહેવાય છે."
    },
    {
      id: "lex_adm_04",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati administrative term for an official government 'Notification'?",
      question_gu: "સરકારી વહીવટમાં સત્તાવાર 'Notification' માટે કયો ગુજરાતી પારિભાષિક શબ્દ વપરાય છે?",
      options_en: [
        "Paripatra",
        "Jaahernaamu",
        "Hukumnaamu",
        "Vathukam",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "પરિપત્ર (Circular)",
        "જાહેરનામું (Notification)",
        "હુકમનામું (Decree)",
        "વટહુકમ (Ordinance)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1, // જાહેરનામું
      explanation_en: "Official government orders published in the gazette for public notification are termed 'જાહેરનામું' (Notification). A circular is 'પરિપત્ર'.",
      explanation_gu: "સરકાર દ્વારા ગેઝેટમાં પ્રસિદ્ધ કરવામાં આવતા સત્તાવાર આદેશ કે સૂચનાને 'જાહેરનામું' (Notification) કહે છે."
    },
    {
      id: "lex_adm_05",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati term for 'Power of Attorney'?",
      question_gu: "'Power of Attorney' માટે અધિકૃત ગુજરાતી વહીવટી શબ્દ કયો છે?",
      options_en: [
        "Mukhtarnaamu",
        "Vasiyatnaamu",
        "Kaboolatnaamu",
        "Chhootnaamu",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "મુખત્યારનામું (Power of Attorney)",
        "વસિયતનામું (Will)",
        "કબૂલાતનામું (Confession)",
        "છૂટનામું (Release Deed)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // મુખત્યારનામું
      explanation_en: "A legal authorization enabling a designated person to act on behalf of another in legal/financial matters is officially termed 'મુખત્યારનામું' (Power of Attorney).",
      explanation_gu: "પોતાના વતી કાયદાકીય કે વહીવટી કાર્યવાહી કરવાની સત્તા આપતા દસ્તાવેજને 'મુખત્યારનામું' (Power of Attorney) કહેવાય છે."
    },
    {
      id: "lex_adm_06",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "In judicial and police proceedings, what is the Gujarati equivalent of 'Show Cause Notice'?",
      question_gu: "ન્યાયિક અને વહીવટી પ્રક્રિયામાં 'Show Cause Notice' માટે કયો પારિભાષિક શબ્દ વપરાય છે?",
      options_en: [
        "Karan Darshak Notice",
        "Chetevani Notice",
        "Haajari Notice",
        "Muddati Notice",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "કારણ દર્શક નોટિસ (Show Cause Notice)",
        "ચેતવણી નોટિસ (Warning Notice)",
        "હાજરી નોટિસ (Summons)",
        "મુદ્દતી નોટિસ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // કારણ દર્શક નોટિસ
      explanation_en: "A notice requiring a party to explain or justify why disciplinary or legal action should not be taken is termed 'કારણ દર્શક નોટિસ' (Show Cause Notice).",
      explanation_gu: "કોઈ પગલાં શા માટે ન લેવા તે અંગે ખુલાસો માંગતી નોટિસને 'કારણ દર્શક નોટિસ' (Show Cause Notice) કહેવામાં આવે છે."
    },
    {
      id: "lex_adm_07",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati term for 'Ordinance' promulgated by the Governor or President?",
      question_gu: "રાજ્યપાલ કે રાષ્ટ્રપતિ દ્વારા બહાર પાડવામાં આવતા 'Ordinance' માટે કયો બંધારણીય/વહીવટી શબ્દ વપરાય છે?",
      options_en: [
        "Vathukam",
        "Jahernaamu",
        "Paripatra",
        "Dharo",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "વટહુકમ (Ordinance)",
        "જાહેરનામું (Notification)",
        "પરિપત્ર (Circular)",
        "ધારો / કાયદો (Act)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // વટહુકમ
      explanation_en: "An executive law promulgated under Article 123 (President) or Article 213 (Governor) when legislature is not in session is termed 'વટહુકમ' (Ordinance).",
      explanation_gu: "જ્યારે વિધાનસભા કે સંસદ સત્રમાં ન હોય ત્યારે અનુચ્છેદ ૧૨૩ કે ૨૧૩ હેઠળ જારી કરાતા કાયદાકીય આદેશને 'વટહુકમ' (Ordinance) કહે છે."
    },
    {
      id: "lex_adm_08",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati administrative term for 'Indemnity Bond'?",
      question_gu: "વહીવટી અને નાણાકીય સંદર્ભમાં 'Indemnity Bond' માટે કયો અધિકૃત શબ્દ વપરાય છે?",
      options_en: [
        "Kshatipoorti Bandhpatra",
        "Jaaminpatra",
        "Mulaakatpatra",
        "Samjhootipatra",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ક્ષતિપૂર્તિ બંધપત્ર / નુકસાન ભરપાઈ બોન્ડ",
        "જામીનપત્ર (Bail Bond)",
        "મુલાકાતપત્ર",
        "સમજૂતીપત્ર (MoU)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // ક્ષતિપૂર્તિ બંધપત્ર
      explanation_en: "A legal undertaking promising to compensate for potential loss or damage is officially termed 'ક્ષતિપૂર્તિ બંધપત્ર' (Indemnity Bond).",
      explanation_gu: "ભવિષ્યમાં થનાર સંભવિત નુકસાનની ભરપાઈ કરવાની બાંયધરી આપતા દસ્તાવેજને 'ક્ષતિપૂર્તિ બંધપત્ર' (Indemnity Bond) કહેવાય છે."
    },
    {
      id: "lex_adm_09",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati administrative term for 'Gazette'?",
      question_gu: "સરકારી મુખપત્ર 'Gazette' માટે કયો ગુજરાતી પારિભાષિક શબ્દ વપરાય છે?",
      options_en: [
        "Rajpatra",
        "Samacharpatra",
        "Masikpatra",
        "Sandeshpatra",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "રાજપત્ર (Gazette)",
        "સમાચારપત્ર (Newspaper)",
        "માસિકપત્ર (Monthly Journal)",
        "સંદેશપત્ર (Newsletter)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // રાજપત્ર
      explanation_en: "The official public record and legal journal published by the government is termed 'રાજપત્ર' (The Official Gazette).",
      explanation_gu: "સરકારના અધિકૃત સત્તાવાર પ્રકાશનને ગુજરાતીમાં 'રાજપત્ર' (Gazette) કહેવામાં આવે છે."
    },
    {
      id: "lex_adm_10",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati legal term for 'Inquest Report' prepared by a police officer examining a deceased body?",
      question_gu: "શંકાસ્પદ મૃત્યુના કિસ્સામાં પોલીસ દ્વારા તૈયાર કરવામાં આવતા 'Inquest Report' માટે કયો ગુજરાતી શબ્દ વપરાય છે?",
      options_en: [
        "Inquest Panchnaamu / Maranottar Tapas Panchnaamu",
        "Post-Mortem Report",
        "Fariyaadnamu",
        "Aropnamu",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ઈન્ક્વેસ્ટ પંચનામું / મરણોત્તર તપાસ પંચનામું",
        "પોસ્ટમોર્ટમ રિપોર્ટ (તબીબી તપાસ)",
        "ફરિયાદનામું (FIR)",
        "આરોપનામું (Charge Sheet)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Under Section 174 of CrPC / 194 of BNSS, the on-site inquiry into the apparent cause of death conducted with witnesses is officially termed 'ઈન્ક્વેસ્ટ પંચનામું' (Inquest Panchnama).",
      explanation_gu: "અકસ્માત કે શંકાસ્પદ સંજોગોમાં થયેલા મૃત્યુના કારણની પંચો સમક્ષ સ્થળ પર થતી પ્રાથમિક તપાસને 'મરણોત્તર તપાસ પંચનામું' અથવા 'ઈન્ક્વેસ્ટ પંચનામું' કહેવાય છે."
    },
    {
      id: "lex_adm_11",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati administrative term for 'Circular'?",
      question_gu: "'Circular' માટે સરકારી કચેરીઓમાં કયો ગુજરાતી શબ્દ વપરાય છે?",
      options_en: [
        "Paripatra",
        "Jahernaamu",
        "Suchanapatra",
        "Aadeshpatra",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "પરિપત્ર (Circular)",
        "જાહેરનામું (Notification)",
        "સૂચનાપત્ર (Notice)",
        "આદેશપત્ર (Order)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // પરિપત્ર
      explanation_en: "A general communication sent to multiple subordinates or offices for guidance or adherence is termed 'પરિપત્ર' (Circular).",
      explanation_gu: "બધા કર્મચારીઓ કે તાબાની કચેરીઓને સામાન્ય માહિતી કે માર્ગદર્શન માટે મોકલાતા પત્રને 'પરિપત્ર' (Circular) કહેવાય છે."
    },
    {
      id: "lex_adm_12",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati administrative term for 'Discrepancy' in accounts or records?",
      question_gu: "હિસાબો કે દસ્તાવેજી વિગતોમાં જોવા મળતી 'Discrepancy' માટે કયો શુદ્ધ ગુજરાતી શબ્દ વપરાય છે?",
      options_en: [
        "Visangatta",
        "Bhool",
        "Kapatt",
        "Ulaath-Paalath",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "વિસંગતતા (Discrepancy)",
        "સામાન્ય ભૂલ (Error)",
        "કપટ (Fraud)",
        "ઉથલપાથલ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // વિસંગતતા
      explanation_en: "In official auditing and investigation reports, an inconsistency or difference between two related statements is termed 'વિસંગતતા' (Discrepancy).",
      explanation_gu: "ઓડિટ કે તપાસમાં બે સરકારી હિસાબો કે નિવેદનો મેળ ન ખાતાં હોય તેવા તફાવતને 'વિસંગતતા' (Discrepancy) કહે છે."
    },
    {
      id: "lex_adm_13",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati administrative term for 'Remand' in judicial custody / police custody?",
      question_gu: "ફોજદારી અદાલત દ્વારા આરોપીને વધુ તપાસ માટે પોલીસ હવાલે સોંપવાની કાર્યવાહી 'Remand' માટે કયો શબ્દ વપરાય છે?",
      options_en: [
        "Police Hawaalo / Remand",
        "Jaamin Mukti",
        "Kaid Shiksha",
        "Nirdosh Mukti",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "પોલીસ હવાલો / રિમાન્ડ (Police Remand)",
        "જામીન મુક્તિ (Bail Release)",
        "કેદની સજા (Imprisonment)",
        "નિર્દોષ મુક્તિ (Acquittal)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Re-committing an arrested person back into police custody for custodial interrogation is termed 'પોલીસ હવાલો' or officially 'રિમાન્ડ' (Remand).",
      explanation_gu: "ધરપકડ કરાયેલ વ્યક્તિને મેજિસ્ટ્રેટ સમક્ષ રજૂ કર્યા બાદ ગુનાની વધુ તપાસ અર્થે પોલીસ કસ્ટડીમાં સોંપવાની મંજૂરીને 'પોલીસ હવાલો' અથવા 'રિમાન્ડ' કહે છે."
    },
    {
      id: "lex_adm_14",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the official Gujarati term for 'Sub-Divisional Magistrate' (SDM)?",
      question_gu: "'Sub-Divisional Magistrate' (SDM) હોદ્દા માટે કયો ગુજરાતી વહીવટી હોદ્દો વપરાય છે?",
      options_en: [
        "Vibhagiya Magistrate / Nayab Collector",
        "Mamlatdar",
        "Taluka Vikas Adhikari (TDO)",
        "Jilla Magistrate",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "વિભાગીય મેજિસ્ટ્રેટ / નાયબ કલેક્ટર (SDM)",
        "મામલતદાર (Executive Magistrate)",
        "તાલુકા વિકાસ અધિકારી (TDO)",
        "જિલ્લા મેજિસ્ટ્રેટ (DM / Collector)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "The Sub-Divisional Magistrate (SDM) heading a revenue subdivision with executive magisterial powers is designated as 'નાયબ કલેક્ટર અને વિભાગીય મેજિસ્ટ્રેટ'.",
      explanation_gu: "મહેસૂલી સબ-ડિવિઝન અને કાર્યપાલક મેજિસ્ટ્રેટની સત્તા ધરાવતા અધિકારીને 'વિભાગીય મેજિસ્ટ્રેટ' અથવા 'નાયબ કલેક્ટર' કહે છે."
    },
    {
      id: "lex_adm_15",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      question_en: "What is the Gujarati administrative term for 'Standing Order'?",
      question_gu: "પોલીસ અને સરકારી વહીવટમાં લાંબા ગાળા સુધી અમલી રહેતા 'Standing Order' માટે કયો શબ્દ વપરાય છે?",
      options_en: [
        "Sthayi Aadesh",
        "Tatkalik Aadesh",
        "Kayam Aadesh",
        "Mukhya Suchana",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "સ્થાયી આદેશ (Standing Order)",
        "તાત્કાલિક આદેશ (Urgent Order)",
        "કાયમી આદેશ",
        "મુખ્ય સૂચના",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // સ્થાયી આદેશ
      explanation_en: "Permanent operating instructions issued by department heads (such as DGP) governing procedural routine are termed 'સ્થાયી આદેશ' (Standing Orders).",
      explanation_gu: "ખાતાના વડા દ્વારા નિયમિત કાર્યપદ્ધતિ માટે જારી કરવામાં આવતી કાયમી સૂચનાઓને 'સ્થાયી આદેશ' (Standing Order) કહેવામાં આવે છે."
    }
  ];

  if (root.GoalQuestionBank && typeof root.GoalQuestionBank.register === 'function') {
    root.GoalQuestionBank.register(LEXICON_QUESTIONS);
  } else {
    root.__PENDING_LEXICON_DATA = LEXICON_QUESTIONS;
  }

  root.PSI_LEXICON_QUESTIONS = LEXICON_QUESTIONS;
})(typeof window !== 'undefined' ? window : this);
