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
    },
    {
      id: "law_const_03",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "ભારતીય બંધારણની કઈ કલમ (Article) હેઠળ નાગરિકોને 'જીવન અને વ્યક્તિગત સ્વાતંત્ર્યનું રક્ષણ' (Right to Life and Personal Liberty) મળેલ છે?",
      question_en: "Under which Article of the Indian Constitution are citizens guaranteed the 'Protection of Life and Personal Liberty'?",
      options_gu: [
        "કલમ ૧૪ (Article 14)",
        "કલમ ૧૯ (Article 19)",
        "કલમ ૨૧ (Article 21)",
        "કલમ ૨૪ (Article 24)",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Article 14",
        "Article 19",
        "Article 21",
        "Article 24",
        "(E) Not Attempted"
      ],
      answer: 2,
      explanation_gu: "કલમ ૨૧ મુજબ કાયદા દ્વારા સ્થાપિત પ્રક્રિયા સિવાય કોઈપણ વ્યક્તિને તેના જીવન કે વ્યક્તિગત સ્વાતંત્ર્યથી વંચિત કરી શકાશે નહીં. મેનકા ગાંધી કેસ (૧૯૭૮) પછી આ કલમનો વ્યાપ અત્યંત વિસ્તૃત બન્યો છે.",
      explanation_en: "Article 21 guarantees that no person shall be deprived of his life or personal liberty except according to procedure established by law. The Maneka Gandhi case (1978) expanded it to mean just, fair, and reasonable procedure.",
      sourceType: "REFERENCE",
      sourceName: "Constitution of India Part III",
      sourceYear: 2024,
      sourceReference: "Article 21 & Supreme Court Precedents",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "easy",
      tags: ["constitution","fundamental_rights","article_21"],
      glossary: [
        {"term":"વ્યક્તિગત સ્વાતંત્ર્ય","simple_gu":"પોતાની ઇચ્છા મુજબ સ્વતંત્ર જીવવાનો અધિકાર","en":"Personal Liberty"}
      ]
    },
    {
      id: "law_const_04",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "ગેરકાયદેસર અટકાયત કે કેદ કરવામાં આવેલ વ્યક્તિને અદાલત સમક્ષ રૂબરૂ હાજર કરવાનો આદેશ આપતી કઈ બંધારણીય રિટ (Writ) છે?",
      question_en: "Which constitutional writ directs that an illegally detained or imprisoned person be produced physically before the court?",
      options_gu: [
        "પરમાદેશ (Mandamus)",
        "બંદી પ્રત્યક્ષીકરણ (Habeas Corpus)",
        "અધિકાર પૃચ્છા (Quo Warranto)",
        "પ્રતિષેધ (Prohibition)",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Mandamus",
        "Habeas Corpus",
        "Quo Warranto",
        "Prohibition",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "'હેબિયસ કોર્પસ' (Habeas Corpus) નો અર્થ થાય છે 'શરીરને હાજર કરો'. જ્યારે કોઈ વ્યક્તિની ગેરકાયદે ધરપકડ થઈ હોય ત્યારે સુપ્રીમ કોર્ટ (કલમ ૩૨) અથવા હાઈકોર્ટ (કલમ ૨૨૬) દ્વારા આ રિટ બહાર પાડવામાં આવે છે.",
      explanation_en: "'Habeas Corpus' literally translates to 'You may have the body'. It provides instantaneous remedy against illegal confinement or detention by the state or private individuals.",
      sourceType: "REFERENCE",
      sourceName: "Constitution of India Part III",
      sourceYear: 2024,
      sourceReference: "Article 32 & 226 Writs",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "medium",
      tags: ["constitution","writs","habeas_corpus","article_32"],
      glossary: [
        {"term":"બંદી પ્રત્યક્ષીકરણ","simple_gu":"અટકાયતીને કોર્ટ સમક્ષ હાજર કરવાનો હુકમ","en":"Habeas Corpus"}
      ]
    },
    {
      id: "law_const_05",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો (DPSP) ની કઈ કલમ હેઠળ 'ગ્રામ પંચાયતોની રચના' કરવાની જોગવાઈ છે?",
      question_en: "Under which Article of the Directive Principles of State Policy (DPSP) is the 'Organization of Village Panchayats' provided?",
      options_gu: [
        "કલમ ૩૯ (Article 39)",
        "કલમ ૪૦ (Article 40)",
        "કલમ ૪૪ (Article 44)",
        "કલમ ૫૦ (Article 50)",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Article 39",
        "Article 40",
        "Article 44",
        "Article 50",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "કલમ ૪૦ મુજબ રાજ્ય ગ્રામ પંચાયતોનું ગઠન કરવા માટે જરૂરી પગલાં લેશે અને તેમને સ્વરાજ્યના એકમો તરીકે કાર્ય કરવા સત્તા આપશે (ગાંધીવાદી વિચારધારા). કલમ ૪૪ સમાન નાગરિક સંહિતા (UCC) માટે છે.",
      explanation_en: "Article 40 directs the State to organise village panchayats and endow them with such powers as may be necessary to enable them to function as units of self-government (Gandhian principle). Article 44 pertains to Uniform Civil Code.",
      sourceType: "REFERENCE",
      sourceName: "Constitution of India Part IV",
      sourceYear: 2024,
      sourceReference: "Directive Principles Article 40",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "easy",
      tags: ["constitution","dpsp","panchayati_raj","article_40"],
      glossary: [
        {"term":"માર્ગદર્શક સિદ્ધાંતો","simple_gu":"શાસન માટે રાજ્યને દિશાસૂચક બંધારણીય નીતિઓ","en":"Directive Principles"}
      ]
    },
    {
      id: "law_const_06",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "ભારતીય બંધારણમાં કઈ કલમ હેઠળ રાજ્યમાં રાષ્ટ્રપતિ શાસન (બંધારણીય કટોકટી - President's Rule) લાદવામાં આવે છે?",
      question_en: "Under which Article of the Indian Constitution is President's Rule (Constitutional Emergency in a State) imposed?",
      options_gu: [
        "કલમ ૩૫૨ (Article 352)",
        "કલમ ૩૫૬ (Article 356)",
        "કલમ ૩૬૦ (Article 360)",
        "કલમ ૩૬૮ (Article 368)",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Article 352",
        "Article 356",
        "Article 360",
        "Article 368",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "કલમ ૩૫૬ મુજબ જો રાજ્યનું શાસન બંધારણીય જોગવાઈ મુજબ ન ચાલતું હોય ત્યારે રાજ્યપાલના અહેવાલ પર રાષ્ટ્રપતિ શાસન લાદવામાં આવે છે. કલમ ૩૫૨ રાષ્ટ્રીય કટોકટી અને કલમ ૩૬૦ નાણાકીય કટોકટી માટે છે.",
      explanation_en: "Article 356 provides for President's Rule in case of failure of constitutional machinery in States. Article 352 deals with National Emergency and Article 360 deals with Financial Emergency.",
      sourceType: "REFERENCE",
      sourceName: "Constitution of India Part XVIII",
      sourceYear: 2024,
      sourceReference: "Emergency Provisions",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "easy",
      tags: ["constitution","emergency","presidents_rule","article_356"],
      glossary: [
        {"term":"રાષ્ટ્રપતિ શાસન","simple_gu":"રાજ્યમાં ચૂંટાયેલી સરકાર બરતરફ કરી કેન્દ્રનું નિયંત્રણ","en":"President's Rule"}
      ]
    },
    {
      id: "law_const_07",
      subject: "law_constitution",
      topic: "constitution",
      question_gu: "૭૩મા બંધારણીય સુધારા ૧૯૯૨ દ્વારા બંધારણમાં કયું નવું પરિશિષ્ટ (Schedule) અને ભાગ ઉમેરવામાં આવ્યો?",
      question_en: "Which new Schedule and Part were added to the Constitution by the 73rd Constitutional Amendment Act, 1992?",
      options_gu: [
        "ભાગ IX અને ૧૧મું પરિશિષ્ટ (Part IX & 11th Schedule)",
        "ભાગ IX-A અને ૧૨મું પરિશિષ્ટ (Part IX-A & 12th Schedule)",
        "ભાગ VIII અને ૧૦મું પરિશિષ્ટ (Part VIII & 10th Schedule)",
        "ભાગ X અને ૧૩મું પરિશિષ્ટ (Part X & 13th Schedule)",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Part IX and 11th Schedule (29 functional subjects)",
        "Part IX-A and 12th Schedule",
        "Part VIII and 10th Schedule",
        "Part X and 13th Schedule",
        "(E) Not Attempted"
      ],
      answer: 0,
      explanation_gu: "૭૩મા સુધારાથી પંચાયતી રાજને બંધારણીય દરજ્જો આપી ભાગ IX (કલમ ૨૪૩ થી ૨૪૩-O) અને ૧૧મું પરિશિષ્ટ (૨૯ વિષયો) ઉમેરાયા. ૭૪મા સુધારાથી નગરપાલિકાઓ માટે ભાગ IX-A અને ૧૨મું પરિશિષ્ટ ઉમેરાયું.",
      explanation_en: "The 73rd Amendment Act 1992 inserted Part IX (Articles 243 to 243-O) and the 11th Schedule containing 29 subjects for Panchayats. The 74th Amendment inserted Part IX-A and the 12th Schedule for Municipalities.",
      sourceType: "REFERENCE",
      sourceName: "73rd Constitutional Amendment Act",
      sourceYear: 2024,
      sourceReference: "Panchayati Raj Constitutional Framework",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "medium",
      tags: ["constitution","panchayati_raj","73rd_amendment","schedule_11"],
      glossary: [
        {"term":"પરિશિષ્ટ","simple_gu":"બંધારણના અંતે વિષયવાર જોડેલી સત્તાવાર યાદી","en":"Schedule"}
      ]
    },
    {
      id: "law_bns_02",
      subject: "law_constitution",
      topic: "bns",
      question_gu: "ભારતીય ન્યાય સંહિતા (BNS, 2023) હેઠળ 'ખાનગી બચાવનો અધિકાર' (Right of Private Defence) કઈ કલમો વચ્ચે આપવામાં આવ્યો છે?",
      question_en: "Under the Bharatiya Nyaya Sanhita (BNS, 2023), which sections encompass the 'Right of Private Defence'?",
      options_gu: [
        "કલમ ૧૪ થી ૨૨",
        "કલમ ૩૪ થી ૪૪",
        "કલમ ૧૦૧ થી ૧૧૦",
        "કલમ ૧૯૦ થી ૨૦૦",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Sections 14 to 22",
        "Sections 34 to 44",
        "Sections 101 to 110",
        "Sections 190 to 200",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "નવી ભારતીય ન્યાય સંહિતા (BNS) ની કલમ ૩૪ થી ૪૪ સુધી ખાનગી બચાવના અધિકારની જોગવાઈ છે (અગાઉ IPC કલમ ૯૬ થી ૧૦૬ માં હતી). કલમ ૩૪ મુજબ ખાનગી બચાવમાં કરાયેલું કોઈ પણ કૃત્ય ગુનો નથી.",
      explanation_en: "Sections 34 to 44 of the BNS 2023 provide for the Right of Private Defence of body and property (corresponding to Sections 96 to 106 of the erstwhile IPC). Section 34 establishes that nothing done in private defence is an offence.",
      sourceType: "REFERENCE",
      sourceName: "Bharatiya Nyaya Sanhita 2023",
      sourceYear: 2024,
      sourceReference: "BNS Chapter III - General Exceptions",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "medium",
      tags: ["bns","private_defence","police_law"],
      glossary: [
        {"term":"ખાનગી બચાવ","simple_gu":"પોતાના કે અન્યના શરીર કે મિલકતના રક્ષણ માટે કાયદેસર પ્રતિકાર","en":"Private Defence"}
      ]
    },
    {
      id: "law_bnss_02",
      subject: "law_constitution",
      topic: "bnss",
      question_gu: "ભારતીય નાગરિક સુરક્ષા સંહિતા (BNSS) ની કલમ ૩૫ મુજબ ૭ વર્ષથી ઓછી કેદની સજા ધરાવતા ગુનાઓમાં ધરપકડ અંગે શું જોગવાઈ છે?",
      question_en: "Under Section 35 of the BNSS 2023, what is the protocol regarding arrest in offences punishable with imprisonment of less than 7 years?",
      options_gu: [
        "કોઈપણ તપાસ વિના તત્કાલ ધરપકડ કરવી",
        "ડીએસપી (DySP) કક્ષાના અધિકારીની પૂર્વ મંજૂરી મેળવવી અને સામાન્ય રીતે હાજરીની નોટિસ પાઠવવી",
        "માત્ર આરોપી કહે ત્યારે જ ધરપકડ કરવી",
        "કોઈપણ કેસ ન નોંધવો",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Immediate arrest without preliminary inquiry",
        "Prior permission of an officer not below DySP rank and issuance of notice of appearance",
        "Arrest only on confession",
        "Do not register the case",
        "(E) Not Attempted"
      ],
      answer: 1,
      explanation_gu: "BNSS કલમ ૩૫(૧)(b) હેઠળ ૭ વર્ષ સુધીની સજાવાળા ગુનાઓમાં બિનજરૂરી ધરપકડ રોકવા DySP કક્ષાના અધિકારીની પૂર્વ મંજૂરી અને આરોપી સહકાર આપે ત્યાં સુધી નોટિસ આપી પૂછપરછ કરવાની જોગવાઈ છે (અરનેશ કુમાર માર્ગદર્શિકાનું સંહિતાકરણ).",
      explanation_en: "Section 35 of BNSS checks arbitrary arrests by mandating prior approval of an officer not below Deputy Superintendent of Police (DySP) rank for offences punishable with up to 7 years, codifying the Arnesh Kumar guidelines.",
      sourceType: "REFERENCE",
      sourceName: "Bharatiya Nagarik Suraksha Sanhita 2023",
      sourceYear: 2024,
      sourceReference: "BNSS Section 35 - Arrest Safeguards",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "hard",
      tags: ["bnss","arrest","police_powers","section_35"],
      glossary: [
        {"term":"પૂર્વ મંજૂરી","simple_gu":"પગલું ભરતા પહેલા ઉચ્ચ અધિકારીની કાયદેસર પરવાનગી","en":"Prior Approval"}
      ]
    },
    {
      id: "law_bnss_03",
      subject: "law_constitution",
      topic: "bnss",
      question_gu: "કોઈપણ પોલીસ સ્ટેશનમાં ઘટના સ્થળના અધિકારક્ષેત્ર (Jurisdiction) ની ચિંતા કર્યા વિના નોંધવામાં આવતી FIR ને કયા નામે ઓળખવામાં આવે છે?",
      question_en: "An FIR registered at any police station irrespective of territorial jurisdiction is legally termed as what?",
      options_gu: [
        "ઝીરો એફઆઈઆર (Zero FIR)",
        "સ્પેશિયલ સમન્સ (Special Summons)",
        "ડમી ફરિયાદ (Dummy Complaint)",
        "કામચલાઉ ચાર્જશીટ (Provisional Chargesheet)",
        "(E) પ્રયાસ કરેલ નથી"
      ],
      options_en: [
        "Zero FIR (codified in BNSS Section 173)",
        "Special Summons",
        "Dummy Complaint",
        "Provisional Chargesheet",
        "(E) Not Attempted"
      ],
      answer: 0,
      explanation_gu: "'ઝીરો એફઆઈઆર' (Zero FIR) એટલે ઘટના ગમે ત્યાં બની હોય તો પણ નજીકના પોલીસ સ્ટેશને તુરંત નોંધાયેલી FIR (નંબર શૂન્ય અપાય છે). ત્યાર બાદ તેને સંબંધિત કાર્યક્ષેત્ર ધરાવતા પોલીસ સ્ટેશનને તપાસ માટે તબદીલ કરવામાં આવે છે (BNSS કલમ ૧૭૩).",
      explanation_en: "A Zero FIR can be lodged at any police station irrespective of territorial jurisdiction. It is given serial number 0 and transferred immediately to the competent jurisdictional police station (statutorily recognized in BNSS Section 173).",
      sourceType: "REFERENCE",
      sourceName: "BNSS 2023 Section 173",
      sourceYear: 2024,
      sourceReference: "FIR & Electronic Registration",
      verified: true,
      verifiedAt: "2026-09-23",
      difficulty: "easy",
      tags: ["bnss","fir","zero_fir","jurisdiction"],
      glossary: [
        {"term":"ઝીરો એફઆઈઆર","simple_gu":"અધિકારક્ષેત્ર બહાર બનેલા ગુનાની પણ પ્રથમ નોંધણી","en":"Zero FIR"}
      ]
    }
  ];

  root.__PENDING_LAW_DATA = lawData;
})(typeof window !== 'undefined' ? window : this);
