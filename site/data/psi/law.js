/**
 * Criminal Law & Indian Constitution Reference Dataset
 * Features updated Bharatiya Nyaya Sanhita (BNS, 2023) and Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023)
 */
(function(root) {
  'use strict';

  var lawData = [
    {
      id: "law_bns_01",
      subject: "law_constitution",
      topic: "bns",
      question_gu: "૧ જુલાઈ ૨૦૨૪ થી લાગુ થયેલ 'ભારતીય ન્યાય સંહિતા' (BNS) એ અગાઉના કયા મુખ્ય ફોજદારી અધિનિયમનું સ્થાન લીધું છે?",
      question_en: "Which earlier penal code was replaced by the 'Bharatiya Nyaya Sanhita' (BNS), effective 1 July 2024?",
      options_gu: [
        "ભારતીય દંડ સંહિતા (Indian Penal Code - IPC), ૧૮૬૦",
        "ભારતીય પુરાવા અધિનિયમ, ૧૮૭૨",
        "ફોજદારી કાર્યરીતિ સંહિતા (CrPC), ૧૯૭૩",
        "પોલીસ અધિનિયમ, ૧૮૬૧",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Indian Penal Code (IPC), 1860",
        "Indian Evidence Act, 1872",
        "Code of Criminal Procedure (CrPC), 1973",
        "Police Act, 1861",
        "(E) Not Attempted"
      ],
      answer: 0,
      explanation_gu: "ભારતીય ન્યાય સંહિતા, ૨૦૨૩ (BNS) એ ભારતીય દંડ સંહિતા (IPC ૧૮૬૦) નું સ્થાન લીધું છે. તે ૧ જુલાઈ ૨૦૨૪ થી સમગ્ર ભારતમાં અમલમાં આવી છે.",
      explanation_en: "The Bharatiya Nyaya Sanhita (BNS, 2023) replaced the 1860 Indian Penal Code (IPC), entering into full force on 1 July 2024.",
      sourceType: "REFERENCE",
      sourceName: "New Criminal Laws 2024",
      sourceYear: 2024,
      sourceReference: "BNS Overview",
      verified: true,
      verifiedAt: "2026-08-26",
      difficulty: "easy",
      tags: ["law","bns","ipc_transition"],
      glossary: [
        {"term":"ફોજદારી","simple_gu":"ગુના અને સજા સંબંધી કાયદો","en":"Criminal / Penal"},
        {"term":"સંહિતા","simple_gu":"નિયમો કે કાયદાઓનો સંગ્રહ","en":"Code / Sanhita"}
      ]
    },
    {
      id: "law_bnss_01",
      subject: "law_constitution",
      topic: "bnss",
      question_gu: "ભારતીય નાગરિક સુરક્ષા સંહિતા (BNSS) મુજબ કોઈપણ વ્યક્તિની ધરપકડ (Arrest) કરતી વખતે પોલીસ અધિકારીએ શું સુનિશ્ચિત કરવું ફરજિયાત છે?",
      question_en: "Under the Bharatiya Nagarik Suraksha Sanhita (BNSS), what is mandatory for a police officer during the arrest of an individual?",
      options_gu: [
        "માત્ર મૌખિક જાણ કરવી",
        "પોતાના નામના સ્પષ્ટ બેજ ધારણ કરવા અને ધરપકડનું કારણ તેમજ જામીનપાત્રતા અંગે જાણ કરવી",
        "કોઈપણ સાક્ષી વિના સીધા લોકઅપમાં પૂરી દેવા",
        "૨૪ કલાક પછી જ કારણ આપવું",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Only inform verbally without record",
        "Wear accurate identification/name tag and inform the grounds of arrest and entitlement to bail",
        "Directly detain in lockup without witness memo",
        "Disclose grounds only after 24 hours",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "BNSS ની કલમો અને બંધારણના અનુચ્છેદ ૨૨(૧) મુજબ ધરપકડ કરાયેલ વ્યક્તિને ધરપકડના કારણો તાત્કાલિક જણાવવા અને વકીલની સલાહ મેળવવાનો અધિકાર છે.",
      explanation_en: "Under BNSS provisions and Article 22(1) of the Constitution, arrested individuals must be informed promptly of grounds of arrest and their right to legal counsel and bail.",
      sourceType: "REFERENCE",
      sourceName: "Police Procedures & BNSS",
      sourceYear: 2024,
      sourceReference: "Arrest Protocols",
      verified: true,
      verifiedAt: "2026-08-26",
      difficulty: "medium",
      tags: ["law","bnss","arrest"],
      glossary: [
        {"term":"જામીનપાત્ર","simple_gu":"જેમાં જામીન મળી શકે તેવો ગુનો","en":"Bailable"},
        {"term":"ધરપકડ","simple_gu":"પોલીસ દ્વારા કસ્ટડીમાં લેવું","en":"Arrest"}
      ]
    },
    {
      id: "law_bsa_01",
      subject: "law_constitution",
      topic: "bsa",
      question_gu: "'ભારતીય સાક્ષ્ય અધિનિયમ' (BSA) માં ઇલેક્ટ્રોનિક અને ડિજિટલ રેકોર્ડ્સ (Digital Records) ને કયા પુરાવા તરીકે માન્યતા આપવામાં આવી છે?",
      question_en: "Under the Bharatiya Sakshya Adhiniyam (BSA), how are electronic and digital records legally classified in evidence?",
      options_gu: [
        "તે પુરાવા તરીકે અમાન્ય છે",
        "માત્ર વિદેશી કેસોમાં જ માન્ય છે",
        "માત્ર મૌખિક પુરાવા તરીકે ગણાય",
        "તેને પ્રાથમિક પુરાવા (Primary Evidence) તરીકે સમાન કાનૂની દરજ્જો આપેલ છે",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Inadmissible in court",
        "Admissible only in foreign jurisdictions",
        "Treated only as hearsay oral evidence",
        "Accorded legal parity as Primary Evidence when verified",
        "(E) Not Attempted"
      ],
      answer: 3,
      explanation_gu: "BSA ૨૦૨૩ માં ડિજિટલ અને ઇલેક્ટ્રોનિક રેકોર્ડ્સને કાગળના દસ્તાવેજોની સમકક્ષ પ્રાથમિક દસ્તાવેજી પુરાવા તરીકે મજબૂત કાનૂની માન્યતા અપાઈ છે.",
      explanation_en: "The Bharatiya Sakshya Adhiniyam explicitly accords legal parity to electronic/digital records as primary documentary evidence.",
      sourceType: "REFERENCE",
      sourceName: "Bharatiya Sakshya Adhiniyam Guide",
      sourceYear: 2024,
      sourceReference: "Electronic Evidence",
      verified: true,
      verifiedAt: "2026-08-26",
      difficulty: "medium",
      tags: ["law","bsa","digital_evidence"],
      glossary: [
        {"term":"પુરાવો","simple_gu":"સાબિતી / અદાલતી સાક્ષ્ય","en":"Evidence"},
        {"term":"પ્રાથમિક પુરાવો","simple_gu":"અસલ દસ્તાવેજ કે મૂળ રેકોર્ડ","en":"Primary Evidence"}
      ]
    },
    {
      id: "law_const_01",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "ભારતીય બંધારણમાં કયા સુધારા દ્વારા 'મૂળભૂત ફરજો' (Fundamental Duties) નો સમાવેશ કરવામાં આવ્યો હતો?",
      question_en: "By which Constitutional Amendment were 'Fundamental Duties' incorporated into the Indian Constitution?",
      options_gu: [
        "૪૨મો બંધારણીય સુધારો, ૧૯૭૬",
        "૪૪મો બંધારણીય સુધારો, ૧૯૭૮",
        "૭૩મો બંધારણીય સુધારો, ૧૯૯૨",
        "૮૬મો બંધારણીય સુધારો, ૨૦૦૨",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "42nd Constitutional Amendment, 1976",
        "44th Constitutional Amendment, 1978",
        "73rd Constitutional Amendment, 1992",
        "86th Constitutional Amendment, 2002",
        "(E) Not Attempted"
      ],
      answer: 0,
      explanation_gu: "સ્વર્ણસિંહ સમિતિની ભલામણો પર ૪૨મા બંધારણીય સુધારા (૧૯૭૬) દ્વારા ભાગ IV-A અને અનુચ્છેદ ૫૧-A ઉમેરી મૂળભૂત ફરજો સામેલ કરાઈ હતી.",
      explanation_en: "Based on Swaran Singh Committee recommendations, the 42nd Amendment (1976) introduced Part IV-A and Article 51-A comprising Fundamental Duties.",
      sourceType: "REFERENCE",
      sourceName: "Indian Polity Standard Reference",
      sourceYear: 2024,
      sourceReference: "Part IV-A Fundamental Duties",
      verified: true,
      verifiedAt: "2026-08-26",
      difficulty: "easy",
      tags: ["constitution","fundamental_duties","amendment42"],
      glossary: [
        {"term":"સુધારો","simple_gu":"બંધારણમાં કરેલો કાનૂની ફેરફાર","en":"Constitutional Amendment"}
      ]
    },
    {
      id: "law_const_02",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "રાષ્ટ્રપતિ શાસન (President's Rule) લાદવા માટે ભારતીય બંધારણનો કયો અનુચ્છેદ વપરાય છે?",
      question_en: "Which Article of the Indian Constitution is invoked to impose President's Rule in a State?",
      options_gu: [
        "અનુચ્છેદ ૩૫૨",
        "અનુચ્છેદ ૩૬૦",
        "અનુચ્છેદ ૩૫૬",
        "અનુચ્છેદ ૩૭૦",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Article 352",
        "Article 360",
        "Article 356",
        "Article 370",
        "(E) Not Attempted"
      ],
      answer: 2,
      explanation_gu: "અનુચ્છેદ ૩૫૬ મુજબ રાજ્યમાં બંધારણીય તંત્ર નિષ્ફળ જાય ત્યારે રાષ્ટ્રપતિ શાસન લાદી શકાય છે. અનુચ્છેદ ૩૫૨ રાષ્ટ્રીય કટોકટી અને ૩૬૦ નાણાકીય કટોકટી માટે છે.",
      explanation_en: "Article 356 provides for President's Rule upon breakdown of constitutional machinery in a State. Article 352 covers National Emergency and Article 360 covers Financial Emergency.",
      sourceType: "REFERENCE",
      sourceName: "Indian Polity Standard Reference",
      sourceYear: 2024,
      sourceReference: "Emergency Provisions",
      verified: true,
      verifiedAt: "2026-08-26",
      difficulty: "easy",
      tags: ["constitution","emergency","article356"],
      glossary: [
        {"term":"કટોકટી","simple_gu":"ગંભીર કટોકટીભરી સ્થિતિ","en":"Emergency"}
      ]
    },
    {
      id: "law_pol_01",
      subject: "law_constitution",
      topic: "police_act",
      question_gu: "પોલીસ તપાસમાં 'FIR' (First Information Report) ફોજદારી પ્રક્રિયામાં કયા પ્રકારના ગુનાઓ માટે ફરજિયાત નોંધવામાં આવે છે?",
      question_en: "In police procedure, an FIR (First Information Report) must be mandatorily registered for which class of offences?",
      options_gu: [
        "બિન-પોલીસ અધિકારવાળા (Non-Cognizable) ગુનાઓ",
        "પોલીસ અધિકારવાળા (Cognizable) ગુનાઓ",
        "માત્ર જામીનપાત્ર દીવાની બાબતો",
        "માત્ર ટ્રાફિક ચલણ બાબતો",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Non-Cognizable offences",
        "Cognizable offences",
        "Civil property disputes",
        "Minor traffic violations only",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "પોલીસ અધિકારવાળા ગુના (Cognizable offences) ની માહિતી મળતાં પોલીસ અધિકારીએ તાત્કાલિક એફઆઈઆર નોંધવી કાયદાકીય રીતે ફરજિયાત છે (લલિતા કુમારી ચુકાદો).",
      explanation_en: "For cognizable offences (offences where police may arrest without warrant), recording an FIR is legally mandatory under procedural law.",
      sourceType: "REFERENCE",
      sourceName: "Criminal Procedure & Police Protocols",
      sourceYear: 2024,
      sourceReference: "FIR Registration Guidelines",
      verified: true,
      verifiedAt: "2026-08-26",
      difficulty: "medium",
      tags: ["police_act","fir","cognizable"],
      glossary: [
        {"term":"પોલીસ અધિકારવાળો ગુનો","simple_gu":"વોરંટ વગર ધરપકડ થઈ શકે તેવો ગંભીર ગુનો","en":"Cognizable offence"}
      ]
    }
  ];

  root.__PENDING_LAW_DATA = lawData;
})(typeof window !== 'undefined' ? window : this);
