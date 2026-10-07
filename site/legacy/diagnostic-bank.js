/**
 * GOAL OS Diagnostic Question Bank (25 Calibrated Assessment Questions)
 * Evaluates candidates across 5 core competencies:
 * Section 1: Quantitative Aptitude & Arithmetic (5 Qs - CDS Maths & PSI Part A)
 * Section 2: Reasoning & Mental Ability (4 Qs - PSI Part A & CDS OIR)
 * Section 3: English Language & Grammar (5 Qs - CDS Paper 1 & PSI Paper 2)
 * Section 4: General Knowledge & Constitution (6 Qs - CDS GK & PSI Part B)
 * Section 5: Gujarat GK & Administrative Awareness (5 Qs - PSI Part B & Paper 2)
 */
(function(root) {
  'use strict';

  var DIAGNOSTIC_QUESTIONS = [
    // -------------------------------------------------------------
    // SECTION 1: Quantitative Aptitude & Arithmetic (5 Questions)
    // -------------------------------------------------------------
    {
      id: "diag_math_01",
      subject: "mathematics",
      topic: "number_system",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 1,
      diagnosticSectionName: "Quantitative Aptitude & Arithmetic",
      question_en: "If the 7-digit number 543247x is completely divisible by 9, then what is the value of the digit x?",
      question_gu: "જો ૭ અંકની સંખ્યા 543247x એ 9 વડે સંપૂર્ણપણે વિભાજ્ય હોય, તો અંક x ની કિંમત શું થશે?",
      options_en: [
        "0",
        "2",
        "3",
        "6",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "0",
        "2",
        "3",
        "6",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "Divisibility rule of 9 states that the sum of all digits must be divisible by 9. Sum = 5 + 4 + 3 + 2 + 4 + 7 + x = 25 + x. The nearest multiple of 9 greater than or equal to 25 is 27. Therefore, 25 + x = 27 => x = 2.",
      explanation_gu: "૯ ની ચાવી મુજબ, સંખ્યાના તમામ અંકોનો સરવાળો ૯ વડે નિઃશેષ ભાગી શકાય તેવો હોવો જોઈએ. સરવાળો = ૫ + ૪ + ૩ + ૨ + ૪ + ૭ + x = ૨૫ + x. ૨૫ પછી ૯ નો ગુણક ૨૭ આવે. તેથી ૨૫ + x = ૨૭ => x = ૨."
    },
    {
      id: "diag_math_02",
      subject: "mathematics",
      topic: "percentages_profit_loss",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 1,
      diagnosticSectionName: "Quantitative Aptitude & Arithmetic",
      question_en: "A merchant marks his goods 40% above the cost price and gives a discount of 20% on the marked price. What is his net profit percentage?",
      question_gu: "એક વેપારી પોતાની વસ્તુઓની મૂળ કિંમત કરતાં ૪૦% વધુ છાપેલી કિંમત નક્કી કરે છે અને છાપેલી કિંમત પર ૨૦% વળતર આપે છે. તો તેનો ચોખ્ખો નફો કેટલા ટકા થશે?",
      options_en: [
        "12%",
        "15%",
        "18%",
        "20%",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૧૨%",
        "૧૫%",
        "૧૮%",
        "૨૦%",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Let Cost Price (CP) = 100. Marked Price (MP) = 100 + 40 = 140. Selling Price (SP) = 140 - (20% of 140) = 140 - 28 = 112. Net profit = 112 - 100 = 12%.",
      explanation_gu: "ધારો કે મૂળ કિંમત (CP) = ₹૧૦૦. છાપેલી કિંમત (MP) = ₹૧૪૦. વેચાણ કિંમત (SP) = ૧૪૦ ના ૮૦% = ૧૪૦ - ૨૮ = ₹૧૧૨. ચોખ્ખો નફો = ૧૧૨ - ૧૦૦ = ૧૨%."
    },
    {
      id: "diag_math_03",
      subject: "mathematics",
      topic: "ratio_proportion",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 1,
      diagnosticSectionName: "Quantitative Aptitude & Arithmetic",
      question_en: "In a 60-litre mixture, the ratio of milk to water is 2 : 1. How much water must be added to make the ratio of milk to water 1 : 2?",
      question_gu: "૬૦ લિટરના મિશ્રણમાં દૂધ અને પાણીનો ગુણોત્તર ૨ : ૧ છે. દૂધ અને પાણીનો ગુણોત્તર ૧ : ૨ કરવા માટે તેમાં કેટલું પાણી ઉમેરવું પડશે?",
      options_en: [
        "40 litres",
        "50 litres",
        "60 litres",
        "80 litres",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૪૦ લિટર",
        "૫૦ લિટર",
        "૬૦ લિટર",
        "૮૦ લિટર",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "Initial mixture: Milk = 60 * (2/3) = 40 litres, Water = 60 * (1/3) = 20 litres. To make the ratio 1:2, Milk / (Water + W) = 40 / (20 + W) = 1/2 => 20 + W = 80 => W = 60 litres.",
      explanation_gu: "શરૂઆતી મિશ્રણમાં: દૂધ = ૬૦ * (૨/૩) = ૪૦ લિટર, પાણી = ૬૦ * (૧/૩) = ૨૦ લિટર. નવો ગુણોત્તર ૧:૨ કરવા: દૂધ/(પાણી + W) = ૪૦/(૨૦ + W) = ૧/૨ => ૨૦ + W = ૮૦ => W = ૬૦ લિટર ઉમેરવું પડે."
    },
    {
      id: "diag_math_04",
      subject: "mathematics",
      topic: "time_and_work",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 1,
      diagnosticSectionName: "Quantitative Aptitude & Arithmetic",
      question_en: "A can complete a piece of work in 12 days and B can complete it in 18 days. If they work together for 4 days and then A leaves, in how many more days will B finish the remaining work?",
      question_gu: "A એક કામ ૧૨ દિવસમાં અને B તે જ કામ ૧૮ દિવસમાં પૂરું કરી શકે છે. જો તેઓ ૪ દિવસ સાથે કામ કરે અને પછી A કામ છોડી દે, તો બાકીનું કામ B એકલો કેટલા દિવસમાં પૂરું કરશે?",
      options_en: [
        "6 days",
        "8 days",
        "10 days",
        "12 days",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૬ દિવસ",
        "૮ દિવસ",
        "૧૦ દિવસ",
        "૧૨ દિવસ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "Total work = LCM(12, 18) = 36 units. Rate of A = 3 units/day, Rate of B = 2 units/day. Combined rate = 5 units/day. In 4 days, work completed = 4 * 5 = 20 units. Remaining work = 36 - 20 = 16 units. Days required by B alone = 16 / 2 = 8 days.",
      explanation_gu: "કુલ કાર્ય = લ.સા.અ(૧૨, ૧૮) = ૩૬ એકમ. A ની દૈનિક ક્ષમતા = ૩ એકમ, B ની ક્ષમતા = ૨ એકમ. સંયુક્ત ક્ષમતા = ૫ એકમ/દિવસ. ૪ દિવસમાં થયેલ કાર્ય = ૪ * ૫ = ૨૦ એકમ. બાકી રહેલ કાર્ય = ૩૬ - ૨૦ = ૧૬ એકમ. B દ્વારા લાગતો સમય = ૧૬ / ૨ = ૮ દિવસ."
    },
    {
      id: "diag_math_05",
      subject: "mathematics",
      topic: "geometry_mensuration",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 1,
      diagnosticSectionName: "Quantitative Aptitude & Arithmetic",
      question_en: "If the perimeter of a semi-circular grassy plot is 72 metres, what is its radius? (Use pi = 22/7)",
      question_gu: "જો એક અર્ધવર્તુળાકાર બગીચાની પરિમિતિ ૭૨ મીટર હોય, તો તેની ત્રિજ્યા કેટલી થશે? (pi = ૨૨/૭ લો)",
      options_en: [
        "14 metres",
        "21 metres",
        "28 metres",
        "35 metres",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૧૪ મીટર",
        "૨૧ મીટર",
        "૨૮ મીટર",
        "૩૫ મીટર",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Perimeter of a semi-circle = pi*r + 2r = r(pi + 2) = r(22/7 + 2) = r(36/7). Given perimeter = 72 m => r * (36/7) = 72 => r = 72 * (7/36) = 14 metres.",
      explanation_gu: "અર્ધવર્તુળની પરિમિતિ = pi*r + 2r = r(pi + ૨) = r(૨૨/૭ + ૨) = r(૩૬/૭). પરિમિતિ = ૭૨ મીટર આપેલ છે => r * (૩૬/૭) = ૭૨ => r = ૭૨ * (૭/૩૬) = ૧૪ મીટર."
    },

    // -------------------------------------------------------------
    // SECTION 2: Reasoning & Mental Ability (4 Questions)
    // -------------------------------------------------------------
    {
      id: "diag_reas_01",
      subject: "reasoning",
      topic: "coding_decoding",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 2,
      diagnosticSectionName: "Reasoning & Mental Ability",
      question_en: "In a certain code language, if 'LIGHT' is coded as 'NKIJV', how will 'SPARK' be coded in that same language?",
      question_gu: "એક ચોક્કસ સાંકેતિક ભાષામાં જો 'LIGHT' ને 'NKIJV' લખવામાં આવે, તો તે જ ભાષામાં 'SPARK' ને કેવી રીતે લખાશે?",
      options_en: [
        "URCTM",
        "UQCTM",
        "VRCTM",
        "URBSM",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "URCTM",
        "UQCTM",
        "VRCTM",
        "URBSM",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Every letter is shifted forward by 2 positions (+2 in alphabetical order): L(+2)=N, I(+2)=K, G(+2)=I, H(+2)=J, T(+2)=V. Similarly for 'SPARK': S(+2)=U, P(+2)=R, A(+2)=C, R(+2)=T, K(+2)=M -> 'URCTM'.",
      explanation_gu: "દરેક મૂળાક્ષરમાં ૨ સ્થાનનો વધારો (+૨) કરવામાં આવ્યો છે: L(+૨)=N, I(+૨)=K, G(+૨)=I, H(+૨)=J, T(+૨)=V. તે જ રીતે 'SPARK' માટે: S(+૨)=U, P(+૨)=R, A(+૨)=C, R(+૨)=T, K(+૨)=M -> 'URCTM'."
    },
    {
      id: "diag_reas_02",
      subject: "reasoning",
      topic: "number_series",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 2,
      diagnosticSectionName: "Reasoning & Mental Ability",
      question_en: "Find the missing number in the following sequence: 4, 11, 30, 67, 128, ?",
      question_gu: "નીચે આપેલી શ્રેણીમાં ખૂટતી સંખ્યા શોધો: 4, 11, 30, 67, 128, ?",
      options_en: [
        "219",
        "222",
        "216",
        "225",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૨૧૯",
        "૨૨૨",
        "૨૧૬",
        "૨૨૫",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "The pattern follows n^3 + 3 for n = 1, 2, 3, 4, 5, 6: 1^3+3=4, 2^3+3=11, 3^3+3=30, 4^3+3=67, 5^3+3=128. For n = 6: 6^3 + 3 = 216 + 3 = 219.",
      explanation_gu: "આ શ્રેણીનો નિયમ n^3 + 3 છે: ૧^૩+૩=૪, ૨^૩+૩=૧૧, ૩^૩+૩=૩૦, ૪^૩+૩=૬૭, ૫^૩+૩=૧૨૮. હવે આગામી પદ માટે n=૬ લેતાં: ૬^૩ + ૩ = ૨૧૬ + ૩ = ૨૧૯."
    },
    {
      id: "diag_reas_03",
      subject: "reasoning",
      topic: "direction_sense",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 2,
      diagnosticSectionName: "Reasoning & Mental Ability",
      question_en: "A police patrol car drives 12 km North, turns right and drives 9 km, then turns right again and drives 12 km. How far and in which direction is the car from its starting point?",
      question_gu: "પોલીસ પેટ્રોલિંગ ગાડી ૧૨ કિમી ઉત્તર દિશામાં જાય છે, જમણે વળીને ૯ કિમી જાય છે, અને ફરી જમણે વળીને ૧૨ કિમી આગળ વધે છે. હવે ગાડી તેના શરૂઆતના સ્થળથી કેટલી દૂર અને કઈ દિશામાં છે?",
      options_en: [
        "9 km East",
        "9 km West",
        "15 km North-East",
        "12 km South",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૯ કિમી પૂર્વ",
        "૯ કિમી પશ્ચિમ",
        "૧૫ કિમી ઉત્તર-પૂર્વ",
        "૧૨ કિમી દક્ષિણ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Driving 12 km North followed later by 12 km South cancels vertical displacement. The horizontal displacement is 9 km to the right (East). Hence, the car is 9 km East of the starting point.",
      explanation_gu: "ઉત્તરમાં ૧૨ કિમી અને ત્યારબાદ જમણે વળી ફરી જમણે ૧૨ કિમી (દક્ષિણ) જવાથી ઉત્તર-દક્ષિણ વિસ્થાપન શૂન્ય થઈ જાય છે. ગાડી ફક્ત ૯ કિમી પૂર્વ તરફ ગઈ છે. તેથી શરૂઆતના સ્થળથી ૯ કિમી પૂર્વમાં છે."
    },
    {
      id: "diag_reas_04",
      subject: "reasoning",
      topic: "syllogisms",
      difficulty: "hard",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 2,
      diagnosticSectionName: "Reasoning & Mental Ability",
      question_en: "Read the statements and decide which conclusion logically follows:\nStatements:\n1. All officers are graduates.\n2. Some graduates are authors.\nConclusions:\nI. Some authors are graduates.\nII. All officers are authors.",
      question_gu: "વિધાનો વાંચો અને કયું તારણ તાર્કિક રીતે યોગ્ય છે તે નક્કી કરો:\nવિધાનો:\n૧. બધા અધિકારીઓ સ્નાતક છે.\n૨. કેટલાક સ્નાતકો લેખકો છે.\nતારણો:\nI. કેટલાક લેખકો સ્નાતક છે.\nII. બધા અધિકારીઓ લેખક છે.",
      options_en: [
        "Only Conclusion I follows",
        "Only Conclusion II follows",
        "Both Conclusions I and II follow",
        "Neither Conclusion follows",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "માત્ર તારણ I સાચું છે",
        "માત્ર તારણ II સાચું છે",
        "બંને તારણો I અને II સાચાં છે",
        "એકપણ તારણ સાચું નથી",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "Conclusion I is the direct, logically valid conversion of Statement 2 ('Some graduates are authors' implies 'Some authors are graduates'). There is no distributed middle term to connect officers directly with authors, so Conclusion II does not follow.",
      explanation_gu: "વિધાન ૨ ('કેટલાક સ્નાતકો લેખકો છે') નું કન્વર્ઝન 'કેટલાક લેખકો સ્નાતક છે' હંમેશાં સાચું છે. વિધાન ૧ અને ૨ જોડાઈને બધા અધિકારી લેખક છે તેવું સાબિત થતું નથી. તેથી ફક્ત તારણ I સાચું છે."
    },

    // -------------------------------------------------------------
    // SECTION 3: English Language & Grammar (5 Questions)
    // -------------------------------------------------------------
    {
      id: "diag_eng_01",
      subject: "english",
      topic: "spotting_errors",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 3,
      diagnosticSectionName: "English Language & Grammar",
      question_en: "Identify the part of the sentence which contains a grammatical error:\nNeither of the two candidates (A) / who appeared for the physical endurance test (B) / were able to qualify. (C) / No error (D)",
      question_gu: "નીચેના વાક્યમાંથી વ્યાકરણની ભૂલ ધરાવતો ભાગ ઓળખો:\nNeither of the two candidates (A) / who appeared for the physical endurance test (B) / were able to qualify. (C) / No error (D)",
      options_en: [
        "Part (A)",
        "Part (B)",
        "Part (C)",
        "Part (D) - No error",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ભાગ (A)",
        "ભાગ (B)",
        "ભાગ (C)",
        "ભાગ (D) - કોઈ ભૂલ નથી",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "'Neither' when used as a distributive pronoun takes a singular verb. Therefore, 'were able to qualify' in Part (C) is erroneous and must be corrected to 'was able to qualify'.",
      explanation_gu: "અંગ્રેજી વ્યાકરણના નિયમ મુજબ 'Neither of' પછી નામ ભલે બહુવચન આવે, પરંતુ ક્રિયાપદ હંમેશાં એકવચન (Singular Verb) વપરાય છે. તેથી 'were' ની જગ્યાએ 'was' હોવું જોઈએ (ભાગ C માં ભૂલ છે)."
    },
    {
      id: "diag_eng_02",
      subject: "english",
      topic: "prepositions_phrasal_verbs",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 3,
      diagnosticSectionName: "English Language & Grammar",
      question_en: "Fill in the blank with the appropriate preposition:\nThe Superintendent of Police assured the delegation that the department would look _______ their grievances immediately.",
      question_gu: "યોગ્ય Preposition પસંદ કરીને ખાલી જગ્યા પૂરો:\nThe Superintendent of Police assured the delegation that the department would look _______ their grievances immediately.",
      options_en: [
        "into",
        "after",
        "through",
        "down upon",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "into",
        "after",
        "through",
        "down upon",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "The phrasal verb 'look into' means to investigate or examine a grievance/matter. 'Look after' means to take care of; 'look down upon' means to regard with contempt.",
      explanation_gu: "Phrasal Verb 'look into' નો અર્થ ફરિયાદ કે બાબતની 'તપાસ કરવી / નિરીક્ષણ કરવું' થાય છે. વહીવટી સંદર્ભમાં 'look into their grievances' યોગ્ય પ્રયોગ છે."
    },
    {
      id: "diag_eng_03",
      subject: "english",
      topic: "sentence_structure_conditionals",
      difficulty: "hard",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 3,
      diagnosticSectionName: "English Language & Grammar",
      question_en: "Choose the correct clause to complete the sentence grammatically:\nIf the armed patrol had reached the spot ten minutes earlier, _______.",
      question_gu: "વાક્યને વ્યાકરણની દ્રષ્ટિએ સાચું બનાવવા યોગ્ય વિકલ્પ પસંદ કરો:\nIf the armed patrol had reached the spot ten minutes earlier, _______.",
      options_en: [
        "they would capture the suspects",
        "they will have captured the suspects",
        "they would have captured the suspects",
        "they had captured the suspects",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "they would capture the suspects",
        "they will have captured the suspects",
        "they would have captured the suspects",
        "they had captured the suspects",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "This sentence represents a Third Conditional (unfulfilled past condition). The standard grammatical formula is: If + Subject + had + V3, Subject + would have + V3.",
      explanation_gu: "આ વાક્ય 'Third Conditional' (ભૂતકાળની અવાસ્તવિક શરત) નું છે. નિયમ: If + had + V3 ની સાથે પરિણામ દર્શાવતા મુખ્ય વાક્યમાં 'would have + V3' ('they would have captured') વપરાય છે."
    },
    {
      id: "diag_eng_04",
      subject: "english",
      topic: "idioms_and_vocabulary",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 3,
      diagnosticSectionName: "English Language & Grammar",
      question_en: "Select the most accurate meaning of the idiom: 'To burn the candle at both ends'",
      question_gu: "રૂઢિપ્રયોગ (Idiom) નો સાચો અર્થ પસંદ કરો: 'To burn the candle at both ends'",
      options_en: [
        "To waste money on unnecessary luxuries",
        "To work excessively hard from early morning until late at night",
        "To be in a state of extreme financial ruin",
        "To create enmity with two opposing factions",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "બિનજરૂરી વસ્તુઓ પાછળ નાણાં વેડફવા",
        "વહેલી સવારથી મોડી રાત સુધી અતિશય સખત પરિશ્રમ કરવો",
        "અત્યંત ગરીબી કે નાદારીમાં આવી જવું",
        "બે વિરોધી પક્ષો સાથે દુશ્મનાવટ કરવી",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "'To burn the candle at both ends' means to exhaust oneself by doing too much work, especially staying up late and rising very early to work.",
      explanation_gu: "આ રૂઢિપ્રયોગનો અર્થ શરીર કે ઊંઘની પરવા કર્યા વિના મોડી રાત અને વહેલી સવારે સતત અતિશય સખત મહેનત કરવી થાય છે."
    },
    {
      id: "diag_eng_05",
      subject: "english",
      topic: "voice_transformation",
      difficulty: "medium",
      sourceType: "SIMULATED",
      exams: ["CDS", "PSI"],
      diagnosticSection: 3,
      diagnosticSectionName: "English Language & Grammar",
      question_en: "Choose the correct passive voice form of the sentence:\n'The government has notified the new service rules for armed sub-inspectors.'",
      question_gu: "નીચેના વાક્યનું સાચું કર્મણી (Passive Voice) રૂપ પસંદ કરો:\n'The government has notified the new service rules for armed sub-inspectors.'",
      options_en: [
        "The new service rules for armed sub-inspectors were notified by the government.",
        "The new service rules for armed sub-inspectors had been notified by the government.",
        "The new service rules for armed sub-inspectors have been notified by the government.",
        "The new service rules for armed sub-inspectors are being notified by the government.",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "The new service rules for armed sub-inspectors were notified by the government.",
        "The new service rules for armed sub-inspectors had been notified by the government.",
        "The new service rules for armed sub-inspectors have been notified by the government.",
        "The new service rules for armed sub-inspectors are being notified by the government.",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "In the Present Perfect tense, active voice (has/have + V3) becomes passive as (has/have + been + V3). Because 'new service rules' is plural, 'have been notified' is the correct passive form.",
      explanation_gu: "પૂર્ણ વર્તમાનકાળમાં (Present Perfect) કર્તરી વાક્ય 'has + V3' હોય ત્યારે કર્મ બહુવચન ('rules') હોવાથી કર્મણી રચનામાં 'have been + V3' ('have been notified') બને છે."
    },

    // -------------------------------------------------------------
    // SECTION 4: General Knowledge & Constitution (6 Questions)
    // -------------------------------------------------------------
    {
      id: "diag_gk_01",
      subject: "law_constitution",
      topic: "fundamental_rights_writs",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      diagnosticSection: 4,
      diagnosticSectionName: "General Knowledge & Constitution",
      question_en: "Which Constitutional Writ literally translates to 'We Command' and is issued by the Supreme Court or High Court to compel a public official to perform a mandatory statutory duty?",
      question_gu: "કઈ બંધારણીય રિટનો શાબ્દિક અર્થ 'અમે આદેશ આપીએ છીએ' થાય છે અને જાહેર અધિકારીને તેની કાનૂની ફરજ બજાવવા માટે સર્વોચ્ચ કે વડી અદાલત દ્વારા બહાર પાડવામાં આવે છે?",
      options_en: [
        "Habeas Corpus",
        "Mandamus",
        "Certiorari",
        "Quo-Warranto",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "બંદી પ્રત્યક્ષીકરણ (Habeas Corpus)",
        "પરમાદેશ (Mandamus)",
        "ઉત્પ્રેક્ષણ (Certiorari)",
        "અધિકાર પૃચ્છા (Quo-Warranto)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "'Mandamus' is a Latin command meaning 'We Command'. Issued under Article 32 (Supreme Court) or Article 226 (High Court), it directs a public entity or officer to perform an official act that they have unlawfully neglected or refused to perform.",
      explanation_gu: "મેન્ડેમસ (Mandamus) નો શાબ્દિક અર્થ 'અમે આદેશ આપીએ છીએ' થાય છે. જાહેર અધિકારી જ્યારે પોતાની કાયદેસરની ફરજ બજાવવામાં નિષ્ફળ રહે કે ઇનકાર કરે, ત્યારે અનુચ્છેદ ૩૨ કે ૨૨૬ હેઠળ પરમાદેશ જારી કરાય છે."
    },
    {
      id: "diag_gk_02",
      subject: "law_constitution",
      topic: "constitutional_amendments",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      diagnosticSection: 4,
      diagnosticSectionName: "General Knowledge & Constitution",
      question_en: "Under which Constitutional Amendment Act was the voting age for Lok Sabha and Legislative Assembly elections reduced from 21 years to 18 years?",
      question_gu: "કયા બંધારણીય સુધારા અધિનિયમ દ્વારા લોકસભા અને રાજ્ય વિધાનસભાઓમાં મત આપવાની વયમર્યાદા ૨૧ વર્ષથી ઘટાડીને ૧૮ વર્ષ કરવામાં આવી હતી?",
      options_en: [
        "42nd Constitutional Amendment Act, 1976",
        "44th Constitutional Amendment Act, 1978",
        "61st Constitutional Amendment Act, 1988",
        "73rd Constitutional Amendment Act, 1992",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૪૨મો બંધારણીય સુધારો, ૧૯૭૬",
        "૪૪મો બંધારણીય સુધારો, ૧૯૭૮",
        "૬૧મો બંધારણીય સુધારો, ૧૯૮૮",
        "૭૩મો બંધારણીય સુધારો, ૧૯૯૨",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "The 61st Constitutional Amendment Act, 1988 amended Article 326 of the Constitution of India, lowering the minimum voting age from 21 years to 18 years. It came into force on 28 March 1989.",
      explanation_gu: "૬૧મા બંધારણીય સુધારા અધિનિયમ, ૧૯૮૮ દ્વારા ભારતીય બંધારણના અનુચ્છેદ ૩૨૬ માં સુધારો કરીને મત આપવાની વયમર્યાદા ૨૧ વર્ષથી ઘટાડીને ૧૮ વર્ષ કરવામાં આવી હતી."
    },
    {
      id: "diag_gk_03",
      subject: "general_studies",
      topic: "modern_indian_history",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      diagnosticSection: 4,
      diagnosticSectionName: "General Knowledge & Constitution",
      question_en: "At which historic session of the Indian National Congress was the resolution of 'Poorna Swaraj' (Complete Independence) passed under the presidency of Jawaharlal Nehru?",
      question_gu: "જવાહરલાલ નેહરુના અધ્યક્ષપદે યોજાયેલા ભારતીય રાષ્ટ્રીય કોંગ્રેસના કયા ઐતિહાસિક અધિવેશનમાં 'પૂર્ણ સ્વરાજ'નો ઠરાવ પસાર કરવામાં આવ્યો હતો?",
      options_en: [
        "Calcutta Session, 1928",
        "Lahore Session, 1929",
        "Karachi Session, 1931",
        "Faizpur Session, 1937",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "કોલકાતા અધિવેશન, ૧૯૨૮",
        "લાહોર અધિવેશન, ૧૯૨૯",
        "કરાંચી અધિવેશન, ૧૯૩૧",
        "ફૈઝપુર અધિવેશન, ૧૯૩૭",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "In December 1929, the Indian National Congress held its historic session in Lahore under Jawaharlal Nehru's presidency, adopting the 'Poorna Swaraj' declaration and resolving that 26 January 1930 be celebrated as Independence Day.",
      explanation_gu: "ડિસેમ્બર ૧૯૨૯ માં જવાહરલાલ નેહરુની અધ્યક્ષતામાં લાહોરમાં રાવી નદીના તટે યોજાયેલા ઐતિહાસિક અધિવેશનમાં પૂર્ણ સ્વરાજનો ઠરાવ પસાર થયો અને ૨૬ જાન્યુઆરી ૧૯૩૦ ને પ્રથમ સ્વતંત્રતા દિવસ તરીકે ઉજવવાનો નિર્ણય લેવાયો હતો."
    },
    {
      id: "diag_gk_04",
      subject: "general_studies",
      topic: "physical_geography",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      diagnosticSection: 4,
      diagnosticSectionName: "General Knowledge & Constitution",
      question_en: "The Tropic of Cancer (23.5 degrees North latitude) passes through how many Indian States?",
      question_gu: "કર્કવૃત્ત (૨૩.૫ અંશ ઉત્તર અક્ષાંશ) ભારતના કેટલા રાજ્યોમાંથી પસાર થાય છે?",
      options_en: [
        "6 states",
        "7 states",
        "8 states",
        "9 states",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "૬ રાજ્યો",
        "૭ રાજ્યો",
        "૮ રાજ્યો",
        "૯ રાજ્યો",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.",
      explanation_gu: "કર્કવૃત્ત ભારતના ૮ રાજ્યોમાંથી પસાર થાય છે: ગુજરાત, રાજસ્થાન, મધ્યપ્રદેશ, છત્તીસગઢ, ઝારખંડ, પશ્ચિમ બંગાળ, ત્રિપુરા અને મિઝોરમ."
    },
    {
      id: "diag_gk_05",
      subject: "general_studies",
      topic: "general_science_physics",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      diagnosticSection: 4,
      diagnosticSectionName: "General Knowledge & Constitution",
      question_en: "The sparkling of diamonds and the transmission of light signals through optical fibers are primarily based on which optical phenomenon?",
      question_gu: "હીરાનું ઝગમગવું (ચમકવું) અને ઓપ્ટિકલ ફાઈબરમાં પ્રકાશ સિગ્નલોનું વહન મુખ્યત્વે કઈ પ્રકાશીય ઘટના પર આધારિત છે?",
      options_en: [
        "Diffraction of light",
        "Total Internal Reflection",
        "Atmospheric Refraction",
        "Polarization of light",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "પ્રકાશનું વિવર્તન (Diffraction)",
        "પૂર્ણ આંતરિક પરાવર્તન (Total Internal Reflection)",
        "વાતાવરણીય વક્રીભવન (Refraction)",
        "પ્રકાશનું ધ્રુવીભવન (Polarization)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "Total Internal Reflection (TIR) occurs when light traveling through a denser medium hits the boundary at an angle of incidence greater than the critical angle, reflecting 100% back into the denser medium. Both diamond brilliance and optical fiber data transmission operate on TIR.",
      explanation_gu: "જ્યારે પ્રકાશ ઘટ્ટ માધ્યમમાંથી પાતળા માધ્યમમાં ક્રાંતિકોણ કરતાં મોટા ખૂણે આપાત થાય, ત્યારે તેનું સંપૂર્ણ પરાવર્તન થાય છે જેને 'પૂર્ણ આંતરિક પરાવર્તન' કહેવાય છે. હીરાની ચમક અને ઓપ્ટિકલ ફાઈબરમાં ડેટા વહન આ જ સિદ્ધાંત પર કાર્ય કરે છે."
    },
    {
      id: "diag_gk_06",
      subject: "general_studies",
      topic: "general_science_biology",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      diagnosticSection: 4,
      diagnosticSectionName: "General Knowledge & Constitution",
      question_en: "Which cellular organelle is designated as the 'powerhouse of the cell' because it synthesizes cellular energy in the form of ATP molecules?",
      question_gu: "કઈ કોષીય અંગિકાને 'કોષનું શક્તિઘર' (Powerhouse of the cell) કહેવામાં આવે છે, કારણ કે તે ATP ના સ્વરૂપમાં ઊર્જાનું ઉત્પાદન કરે છે?",
      options_en: [
        "Golgi apparatus",
        "Ribosome",
        "Mitochondria",
        "Lysosome",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ગોલ્ગીકાય",
        "રીબોઝોમ",
        "કણાભસૂત્ર (Mitochondria)",
        "લાઈસોઝોમ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 2,
      explanation_en: "Mitochondria are known as the powerhouses of the cell because they generate most of the chemical energy required by the cell in the form of ATP (Adenosine Triphosphate) via aerobic cellular respiration.",
      explanation_gu: "કણાભસૂત્ર (Mitochondria) ને કોષનું શક્તિઘર કહેવાય છે કારણ કે તે કોષીય શ્વસન દ્વારા રાસાયણિક ઊર્જાનું નિર્માણ ATP (એડેનોસાઈન ટ્રાયફોસ્ફેટ) ના સ્વરૂપમાં કરે છે."
    },

    // -------------------------------------------------------------
    // SECTION 5: Gujarat GK & Administrative Awareness (5 Questions)
    // -------------------------------------------------------------
    {
      id: "diag_guj_01",
      subject: "gujarat_gk",
      topic: "panchayati_raj_gujarat",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      diagnosticSection: 5,
      diagnosticSectionName: "Gujarat GK & Administrative Awareness",
      question_en: "On the recommendations of which committee was the three-tier Panchayati Raj system established in Gujarat under the Gujarat Panchayats Act, 1961?",
      question_gu: "ગુજરાતમાં ગુજરાત પંચાયત અધિનિયમ, ૧૯૬૧ હેઠળ કઈ સમિતિની ભલામણોના આધારે ત્રિ-સ્તરીય પંચાયતી રાજની સ્થાપના કરવામાં આવી હતી?",
      options_en: [
        "Balwantrai Mehta Committee",
        "Rasiklal Parikh Committee",
        "Jivraj Mehta Committee",
        "Darbari Commission",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "બળવંતરાય મહેતા સમિતિ",
        "રસિકલાલ પરીખ સમિતિ",
        "જીવરાજ મહેતા સમિતિ",
        "દરબારી પંચ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "Following the national Balwantrai Mehta recommendations, Gujarat appointed the Rasiklal Parikh Committee in July 1960. Based on its report, the Gujarat Panchayats Act, 1961 was passed, introducing the 3-tier structure across Gujarat on 1 April 1963.",
      explanation_gu: "કેન્દ્રીય સ્તરે બળવંતરાય મહેતા સમિતિ બાદ ગુજરાત સરકારે ૧૯૬૦ માં રસિકલાલ પરીખના વડપણ હેઠળ સમિતિ રચી હતી. તેના અહેવાલના આધારે ૧૯૬૧ નો ધારો પસાર થયો અને ૧ એપ્રિલ ૧૯૬૩ થી ગુજરાતમાં ત્રિ-સ્તરીય પંચાયતી રાજ શરૂ થયું."
    },
    {
      id: "diag_guj_02",
      subject: "gujarat_gk",
      topic: "gujarat_geography_rivers",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      diagnosticSection: 5,
      diagnosticSectionName: "Gujarat GK & Administrative Awareness",
      question_en: "At which location does the Narmada River, known as the 'Lifeline of Gujarat', enter the territory of Gujarat state?",
      question_gu: "ગુજરાતની 'જીવાદોરી' ગણાતી નર્મદા નદી ગુજરાત રાજ્યની સરહદમાં કયા સ્થળેથી પ્રવેશે છે?",
      options_en: [
        "Hafeshwar (Chhota Udepur)",
        "Mokhari (Narmada)",
        "Ankleshwar (Bharuch)",
        "Kevadia (Narmada)",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "હાફેશ્વર (છોટાઉદેપુર)",
        "મોખડી (નર્મદા)",
        "અંકલેશ્વર (ભરૂચ)",
        "કેવડિયા (નર્મદા)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "The Narmada River enters Gujarat near Hafeshwar village in Kawant taluka of Chhota Udepur district, flowing past the Sardar Sarovar Dam and into the Gulf of Khambhat near Bharuch.",
      explanation_gu: "નર્મદા નદી છોટાઉદેપુર જિલ્લાના ક્વાંટ તાલુકાના હાફેશ્વર ગામ પાસેથી ગુજરાત રાજ્યની સરહદમાં પ્રવેશ કરે છે અને આગળ વધીને ભરૂચ નજીક ખંભાતના અખાતને મળે છે."
    },
    {
      id: "diag_guj_03",
      subject: "gujarat_gk",
      topic: "gujarat_history_architecture",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      diagnosticSection: 5,
      diagnosticSectionName: "Gujarat GK & Administrative Awareness",
      question_en: "The world-famous 'Rani ki Vav' stepwell at Patan, a UNESCO World Heritage Site, was built during the Solanki dynasty by which Queen in memory of her husband?",
      question_gu: "યુનેસ્કો (UNESCO) વર્લ્ડ હેરિટેજ સાઈટમાં સ્થાન પામેલી પાટણની વિશ્વપ્રસિદ્ધ 'રાણકી વાવ' સોલંકી વંશના કયા રાણીએ પોતાના પતિની યાદમાં બંધાવી હતી?",
      options_en: [
        "Queen Mayannalladevi (Minaldevi)",
        "Queen Udayamati",
        "Queen Naikidevi",
        "Queen Anupamadevi",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "રાણી મયણલ્લદેવી (મીનળદેવી)",
        "રાણી ઉદયમતી",
        "રાણી નાયકીદેવી",
        "રાણી અનુપમાદેવી",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "Rani ki Vav in Patan was built in the 11th century by Queen Udayamati as a memorial to her husband King Bhimdev I of the Solanki (Chaulukya) dynasty. It was declared a UNESCO World Heritage Site in 2014.",
      explanation_gu: "પાટણની રાણકી વાવ ૧૧મી સદીમાં સોલંકી વંશના શાસક ભીમદેવ પહેલાના સ્મરણાર્થે તેમના પત્ની રાણી ઉદયમતી દ્વારા બંધાવવામાં આવી હતી. વર્ષ ૨૦૧૪ માં યુનેસ્કો દ્વારા તેને વર્લ્ડ હેરિટેજ સાઈટનો દરજ્જો આપવામાં આવ્યો."
    },
    {
      id: "diag_guj_04",
      subject: "gujarat_gk",
      topic: "administrative_lexicon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      diagnosticSection: 5,
      diagnosticSectionName: "Gujarat GK & Administrative Awareness",
      question_en: "In legal and police administration in Gujarat, what is the official Gujarati administrative term for 'Charge Sheet'?",
      question_gu: "ગુજરાતમાં કાયદાકીય અને પોલીસ વહીવટમાં 'Charge Sheet' માટે કયો અધિકૃત ગુજરાતી વહીવટી પારિભાષિક શબ્દ વપરાય છે?",
      options_en: [
        "Fariyaadnamu (ફરિયાદનામું)",
        "Aropnamu (આરોપનામું)",
        "Panchnamu (પંચનામું)",
        "Hukumnamu (હુકમનામું)",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ફરિયાદનામું",
        "આરોપનામું",
        "પંચનામું",
        "હુકમનામું",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "In police investigations and judicial procedure under BNSS/CrPC, the formal final police report submitted to the magistrate containing charges against the accused is officially termed 'આરોપનામું' (Aropnamu) in Gujarati administrative lexicon.",
      explanation_gu: "પોલીસ તપાસ પૂર્ણ થયા બાદ ગુનાની વિગતો અને પુરાવાઓ સાથે મેજિસ્ટ્રેટ સમક્ષ રજૂ કરાતી ચાર્જશીટ (Charge Sheet) માટે ગુજરાત વહીવટી પારિભાષિક શબ્દાવલીમાં 'આરોપનામું' શબ્દ વપરાય છે."
    },
    {
      id: "diag_guj_05",
      subject: "gujarat_gk",
      topic: "police_administration_structure",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["PSI"],
      diagnosticSection: 5,
      diagnosticSectionName: "Gujarat GK & Administrative Awareness",
      question_en: "Who holds the highest rank and executive command in the police hierarchy of Gujarat State?",
      question_gu: "ગુજરાત રાજ્યના પોલીસ વહીવટી માળખામાં સર્વોચ્ચ હોદ્દો અને વહીવટી વડપણ કોણ ધરાવે છે?",
      options_en: [
        "Additional Director General of Police (ADGP)",
        "Director General and Inspector General of Police (DGP & IGP)",
        "Inspector General of Police (IGP)",
        "Commissioner of Police (CP)",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "અધિક પોલીસ મહાનિર્દેશક (ADGP)",
        "પોલીસ મહાનિર્દેશક અને મુખ્ય પોલીસ અધિકારી (DGP & IGP)",
        "પોલીસ મહાનિરીક્ષક (IGP)",
        "પોલીસ કમિશનર (CP)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "The Director General and Inspector General of Police (DGP & IGP), operating from Police Bhavan Gandhinagar, is the highest-ranking IPS officer leading the police force of Gujarat State.",
      explanation_gu: "ગાંધીનગર પોલીસ ભવન ખાતેથી સમગ્ર રાજ્યના પોલીસ તંત્રનું સંચાલન કરતા 'પોલીસ મહાનિર્દેશક અને મુખ્ય પોલીસ અધિકારી' (DGP & IGP) ગુજરાત રાજ્ય પોલીસ દળમાં સર્વોચ્ચ હોદ્દો ધરાવે છે."
    }
  ];

  // Expose to Question Bank registry
  if (root.GoalQuestionBank && typeof root.GoalQuestionBank.register === 'function') {
    root.GoalQuestionBank.register(DIAGNOSTIC_QUESTIONS);
  } else {
    root.__PENDING_DIAGNOSTIC_DATA = DIAGNOSTIC_QUESTIONS;
  }

  root.PSI_DIAGNOSTIC_QUESTIONS = DIAGNOSTIC_QUESTIONS;
})(typeof window !== 'undefined' ? window : this);
