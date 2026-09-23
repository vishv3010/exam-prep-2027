/**
 * GOAL OS Academic Repertoire: Elementary Mathematics & Quantitative Aptitude
 * High-yield syllabus coverage for UPSC CDS Elementary Maths & Gujarat PSI Paper 1 Part A.
 */
(function(root) {
  'use strict';

  var MATH_QUESTIONS = [
    {
      id: "math_num_01",
      subject: "mathematics",
      topic: "number_system",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Find the unit digit in the product: 7^95 - 3^58.",
      question_gu: "ગુણાકાર/બાદબાકીમાં એકમનો અંક શોધો: 7^95 - 3^58.",
      options_en: ["0", "4", "6", "7", "Option E: Not Attempted"],
      options_gu: ["0", "4", "6", "7", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 4
      explanation_en: "Cyclicity of 7 is 4 (7, 9, 3, 1). 95 mod 4 = 3, so unit digit of 7^95 is 7^3 = 343 -> 3. Cyclicity of 3 is 4 (3, 9, 7, 1). 58 mod 4 = 2, so unit digit of 3^58 is 3^2 = 9. Since unit digit 3 is smaller than 9, borrow 1 to make it (13 - 9) = 4.",
      explanation_gu: "૭ ની ચક્રીયતા ૪ છે (૭, ૯, ૩, ૧). ૯૫ ÷ ૪ કરતાં શેષ ૩ વધે, જેથી ૭^૯૫ નો એકમનો અંક ૩ છે. ૩ ની ચક્રીયતા ૪ છે (૩, ૯, ૭, ૧). ૫૮ ÷ ૪ કરતાં શેષ ૨ વધે, જેથી ૩^૫૮ નો એકમનો અંક ૯ છે. હવે ૩ માંથી ૯ ન જાય તેથી દસકો લેતાં (૧૩ - ૯) = ૪ મળે."
    },
    {
      id: "math_num_02",
      subject: "mathematics",
      topic: "number_system",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "The HCF and LCM of two numbers are 12 and 336 respectively. If one of the numbers is 84, what is the other number?",
      question_gu: "બે સંખ્યાઓનો ગુ.સા.અ. ૧૨ અને લ.સા.અ. ૩૩૬ છે. જો તેમાંની એક સંખ્યા ૮૪ હોય, તો બીજી સંખ્યા કઈ હશે?",
      options_en: ["36", "48", "54", "72", "Option E: Not Attempted"],
      options_gu: ["૩૬", "૪૮", "૫૪", "૭૨", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 48
      explanation_en: "Product of two numbers = HCF * LCM. Other number = (12 * 336) / 84 = 336 / 7 = 48.",
      explanation_gu: "બે સંખ્યાઓનો ગુણાકાર = ગુ.સા.અ. * લ.સા.અ. તેથી બીજી સંખ્યા = (૧૨ * ૩૩૬) / ૮૪ = ૩૩૬ / ૭ = ૪૮."
    },
    {
      id: "math_pct_01",
      subject: "mathematics",
      topic: "percentages",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "If the price of petrol increases by 25%, by what percentage must a car owner reduce his consumption so that the overall expenditure on petrol remains unchanged?",
      question_gu: "જો પેટ્રોલમાં ૨૫% નો ભાવવધારો થાય, તો વાહનચાલકે વપરાશમાં કેટલા ટકાનો ઘટાડો કરવો પડે જેથી ખર્ચ સમાન રહે?",
      options_en: ["16.67%", "20%", "25%", "33.33%", "Option E: Not Attempted"],
      options_gu: ["૧૬.૬૭%", "૨૦%", "૨૫%", "૩૩.૩૩%", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 20%
      explanation_en: "Reduction in consumption = [r / (100 + r)] * 100% = [25 / (100 + 25)] * 100% = (25 / 125) * 100% = 20%.",
      explanation_gu: "વપરાશમાં ઘટાડો = [r / (૧૦૦ + r)] * ૧૦૦% = [૨૫ / ૧૨૫] * ૧૦૦% = ૧/૫ * ૧૦૦% = ૨૦%."
    },
    {
      id: "math_pct_02",
      subject: "mathematics",
      topic: "percentages_profit_loss",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "A shopkeeper sells an article at a gain of 15%. Had he sold it for Rs. 108 more, he would have gained 20%. Find the cost price of the article.",
      question_gu: "એક વેપારી એક વસ્તુ ૧૫% નફા સાથે વેચે છે. જો તેણે તે વસ્તુ ₹૧૦૮ વધુ કિંમતે વેચી હોત, તો તેને ૨૦% નફો મળ્યો હોત. વસ્તુની મૂળ કિંમત શોધો.",
      options_en: ["Rs. 1,800", "Rs. 2,000", "Rs. 2,160", "Rs. 2,400", "Option E: Not Attempted"],
      options_gu: ["₹૧,૮૦૦", "₹૨,૦૦૦", "₹૨,૧૬૦", "₹૨,૪૦૦", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Rs. 2,160
      explanation_en: "Difference in percentage gain = 20% - 15% = 5%. 5% of Cost Price = Rs. 108 => CP = 108 * (100 / 5) = 108 * 20 = Rs. 2,160.",
      explanation_gu: "નફામાં ટકાવારીનો તફાવત = ૨૦% - ૧૫% = ૫%. મૂળ કિંમતના ૫% = ₹૧૦૮ => મૂળ કિંમત = ૧૦૮ * (૧૦૦ / ૫) = ૧૦૮ * ૨૦ = ₹૨,૧૬૦."
    },
    {
      id: "math_ratio_01",
      subject: "mathematics",
      topic: "ratio_proportion",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "If A : B = 3 : 4 and B : C = 8 : 9, then what is the compound ratio A : C?",
      question_gu: "જો A : B = ૩ : ૪ અને B : C = ૮ : ૯ હોય, તો A : C નો ગુણોત્તર કેટલો થશે?",
      options_en: ["1 : 2", "2 : 3", "3 : 2", "4 : 5", "Option E: Not Attempted"],
      options_gu: ["૧ : ૨", "૨ : ૩", "૩ : ૨", "૪ : ૫", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 2 : 3
      explanation_en: "A/C = (A/B) * (B/C) = (3/4) * (8/9) = 24 / 36 = 2 / 3. Thus, A : C = 2 : 3.",
      explanation_gu: "A/C = (A/B) * (B/C) = (૩/૪) * (૮/૯) = ૨૪ / ૩૬ = ૨ / ૩. તેથી A : C = ૨ : ૩."
    },
    {
      id: "math_si_ci_01",
      subject: "mathematics",
      topic: "interest",
      difficulty: "hard",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "The difference between the compound interest (compounded annually) and simple interest on a certain sum of money for 2 years at 10% per annum is Rs. 65. What is the principal sum?",
      question_gu: "કોઈ રકમ પર ૧૦% વાર્ષિક વ્યાજના દરે ૨ વર્ષ માટેના ચક્રવૃદ્ધિ વ્યાજ અને સાદા વ્યાજનો તફાવત ₹૬૫ છે. તો તે મુદ્દલ (Principal) રકમ કેટલી હશે?",
      options_en: ["Rs. 5,500", "Rs. 6,000", "Rs. 6,500", "Rs. 7,000", "Option E: Not Attempted"],
      options_gu: ["₹૫,૫૦૦", "₹૬,૦૦૦", "₹૬,૫૦૦", "₹૭,૦૦૦", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Rs. 6,500
      explanation_en: "For 2 years: Difference = P * (r / 100)^2. 65 = P * (10 / 100)^2 = P * (1 / 100) => P = 65 * 100 = Rs. 6,500.",
      explanation_gu: "૨ વર્ષ માટે સાદા અને ચક્રવૃદ્ધિ વ્યાજનો તફાવત = P * (r / ૧૦૦)^૨. ૬૫ = P * (૧૦ / ૧૦૦)^૨ = P * (૧ / ૧૦૦) => P = ૬૫ * ૧૦૦ = ₹૬,૫૦૦."
    },
    {
      id: "math_work_01",
      subject: "mathematics",
      topic: "time_and_work",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Pipe A can fill a tank in 10 hours, while Pipe B can empty the full tank in 15 hours. If both pipes are opened simultaneously into an empty tank, in how many hours will the tank be completely filled?",
      question_gu: "પાઈપ A એક ટાંકી ૧૦ કલાકમાં ભરી શકે છે, જ્યારે પાઈપ B ભરેલી ટાંકી ૧૫ કલાકમાં ખાલી કરી શકે છે. જો બંને પાઈપ એકસાથે ખાલી ટાંકીમાં ખોલવામાં આવે, તો ટાંકી કેટલા કલાકમાં ભરાશે?",
      options_en: ["20 hours", "25 hours", "30 hours", "35 hours", "Option E: Not Attempted"],
      options_gu: ["૨૦ કલાક", "૨૫ કલાક", "૩૦ કલાક", "૩૫ કલાક", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // 30 hours
      explanation_en: "Net rate per hour = (1/10) - (1/15) = (3 - 2) / 30 = 1/30 of the tank per hour. Total time required = 30 hours.",
      explanation_gu: "કલાક દીઠ ચોખ્ખું ભરણ = (૧/૧૦) - (૧/૧૫) = (૩ - ૨) / ૩૦ = ૧/૩૦ ભાગ/કલાક. તેથી આખી ટાંકી ભરાતાં ૩૦ કલાક લાગે."
    },
    {
      id: "math_speed_01",
      subject: "mathematics",
      topic: "speed_time_distance",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "A 180-metre-long train running at 54 km/h will cross a stationary electric pole in how many seconds?",
      question_gu: "૫૪ કિમી/કલાકની ઝડપે દોડતી ૧૮૦ મીટર લાંબી ટ્રેન એક સ્થિર વીજળીના થાંભલાને કેટલા સેકન્ડમાં પસાર કરશે?",
      options_en: ["10 seconds", "12 seconds", "15 seconds", "18 seconds", "Option E: Not Attempted"],
      options_gu: ["૧૦ સેકન્ડ", "૧૨ સેકન્ડ", "૧૫ સેકન્ડ", "૧૮ સેકન્ડ", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 12 seconds
      explanation_en: "Speed in m/s = 54 * (5 / 18) = 15 m/s. Time to cross a pole = Length of train / Speed = 180 / 15 = 12 seconds.",
      explanation_gu: "ટ્રેનની ઝડપ મીટર/સેકન્ડમાં = ૫૪ * (૫ / ૧૮) = ૧૫ મી/સે. થાંભલાને ઓળંગવાનો સમય = ટ્રેનની લંબાઈ / ઝડપ = ૧૮૦ / ૧૫ = ૧૨ સેકન્ડ."
    },
    {
      id: "math_avg_01",
      subject: "mathematics",
      topic: "averages",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "The average age of 24 students and their physical training instructor is 15 years. If the instructor's age is excluded, the average decreases by 1 year. What is the age of the instructor?",
      question_gu: "૨૪ વિદ્યાર્થીઓ અને તેમના શારીરિક તાલીમ શિક્ષકની સરેરાશ ઉંમર ૧૫ વર્ષ છે. જો શિક્ષકની ઉંમર બાકાત કરવામાં આવે તો સરેરાશ ૧ વર્ષ ઘટે છે. શિક્ષકની ઉંમર કેટલી હશે?",
      options_en: ["35 years", "39 years", "40 years", "45 years", "Option E: Not Attempted"],
      options_gu: ["૩૫ વર્ષ", "૩૯ વર્ષ", "૪૦ વર્ષ", "૪૫ વર્ષ", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 39 years
      explanation_en: "Total age of 25 persons = 25 * 15 = 375 years. Total age of 24 students = 24 * 14 = 336 years. Age of instructor = 375 - 336 = 39 years.",
      explanation_gu: "૨૫ વ્યક્તિઓની કુલ ઉંમર = ૨૫ * ૧૫ = ૩૭૫ વર્ષ. ૨૪ વિદ્યાર્થીઓની કુલ ઉંમર = ૨૪ * ૧૪ = ૩૩૬ વર્ષ. શિક્ષકની ઉંમર = ૩૭૫ - ૩૩૬ = ૩૯ વર્ષ."
    },
    {
      id: "math_alg_01",
      subject: "mathematics",
      topic: "algebra",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "If x + (1 / x) = 4, then what is the value of x^2 + (1 / x^2)?",
      question_gu: "જો x + (1 / x) = ૪ હોય, તો x^2 + (1 / x^2) ની કિંમત કેટલી થશે?",
      options_en: ["14", "16", "18", "20", "Option E: Not Attempted"],
      options_gu: ["૧૪", "૧૬", "૧૮", "૨૦", "E. ઉત્તર આપેલ નથી"],
      answer: 0, // 14
      explanation_en: "Squaring both sides: [x + (1/x)]^2 = 4^2 => x^2 + (1/x^2) + 2(x)(1/x) = 16 => x^2 + (1/x^2) = 16 - 2 = 14.",
      explanation_gu: "બંને બાજુ વર્ગ કરતાં: [x + (૧/x)]^૨ = ૪^૨ => x^૨ + (૧/x^૨) + ૨ = ૧૬ => x^૨ + (૧/x^૨) = ૧૬ - ૨ = ૧૪."
    },
    {
      id: "math_geo_01",
      subject: "mathematics",
      topic: "geometry",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "The angles of a triangle are in the ratio 2 : 3 : 5. What is the degree measure of the largest angle?",
      question_gu: "એક ત્રિકોણના ખૂણાઓનો ગુણોત્તર ૨ : ૩ : ૫ છે. તો સૌથી મોટા ખૂણાનું માપ કેટલા અંશ થશે?",
      options_en: ["60 degrees", "75 degrees", "90 degrees", "100 degrees", "Option E: Not Attempted"],
      options_gu: ["૬૦ અંશ", "૭૫ અંશ", "૯૦ અંશ", "૧૦૦ અંશ", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // 90 degrees
      explanation_en: "Sum of angles in a triangle is 180 degrees. Total parts = 2 + 3 + 5 = 10 parts. 1 part = 180 / 10 = 18 degrees. Largest angle = 5 * 18 = 90 degrees (a right-angled triangle).",
      explanation_gu: "ત્રિકોણના ત્રણેય ખૂણાઓનો સરવાળો ૧૮૦ અંશ થાય છે. કુલ ભાગ = ૨ + ૩ + ૫ = ૧૦ ભાગ. ૧ ભાગ = ૧૮૦ / ૧૦ = ૧૮ અંશ. સૌથી મોટો ખૂણો = ૫ * ૧૮ = ૯૦ અંશ."
    },
    {
      id: "math_geo_02",
      subject: "mathematics",
      topic: "circles_geometry",
      difficulty: "hard",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "In a circle with radius 10 cm, a chord is drawn at a distance of 6 cm from the centre. What is the length of this chord?",
      question_gu: "૧૦ સેમી ત્રિજ્યાવાળા વર્તુળમાં કેન્દ્રથી ૬ સેમી અંતરે એક જીવા (Chord) દોરવામાં આવેલ છે. આ જીવાની લંબાઈ કેટલી થશે?",
      options_en: ["8 cm", "12 cm", "16 cm", "18 cm", "Option E: Not Attempted"],
      options_gu: ["૮ સેમી", "૧૨ સેમી", "૧૬ સેમી", "૧૮ સેમી", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // 16 cm
      explanation_en: "The perpendicular from the centre bisects the chord. By Pythagoras theorem: (Half-chord)^2 = r^2 - d^2 = 10^2 - 6^2 = 100 - 36 = 64 => Half-chord = 8 cm. Full chord = 2 * 8 = 16 cm.",
      explanation_gu: "વર્તુળના કેન્દ્રમાંથી જીવા પર દોરેલો લંબ જીવાને દુભાગે છે. પાયથાગોરસ પ્રમેય મુજબ: (અડધી જીવા)^૨ = ૧૦^૨ - ૬^૨ = ૧૦૦ - ૩૬ = ૬૪ => અડધી જીવા = ૮ સેમી. તેથી સંપૂર્ણ જીવાની લંબાઈ = ૨ * ૮ = ૧૬ સેમી."
    },
    {
      id: "math_mens_01",
      subject: "mathematics",
      topic: "mensuration",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "What is the total surface area of a solid hemisphere of radius 7 cm? (Take pi = 22/7)",
      question_gu: "૭ સેમી ત્રિજ્યા ધરાવતા નક્કર અર્ધગોળાની કુલ સપાટીનું ક્ષેત્રફળ (Total Surface Area) કેટલું થશે? (pi = ૨૨/૭ લો)",
      options_en: ["308 sq cm", "462 sq cm", "616 sq cm", "770 sq cm", "Option E: Not Attempted"],
      options_gu: ["૩૦૮ ચો.સેમી", "૪૬૨ ચો.સેમી", "૬૧૬ ચો.સેમી", "૭૭૦ ચો.સેમી", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 462 sq cm
      explanation_en: "Total Surface Area of solid hemisphere = 3 * pi * r^2 = 3 * (22 / 7) * 7 * 7 = 3 * 22 * 7 = 462 sq cm.",
      explanation_gu: "નક્કર અર્ધગોળાની કુલ સપાટીનું ક્ષેત્રફળ = ૩ * pi * r^૨ = ૩ * (૨૨ / ૭) * ૭ * ૭ = ૪૬૨ ચો.સેમી."
    },
    {
      id: "math_trig_01",
      subject: "mathematics",
      topic: "trigonometry",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "An observer standing 30 metres away from the base of a vertical transmission tower observes that the angle of elevation of the top of the tower is 30 degrees. What is the height of the tower?",
      question_gu: "એક ઊભા ટ્રાન્સમિશન ટાવરના તળિયેથી ૩૦ મીટર દૂર ઊભેલો એક નિરીક્ષક ટાવરની ટોચનો ઉત્સેધકોણ ૩૦ અંશ માપે છે. તો ટાવરની ઊંચાઈ કેટલી હશે?",
      options_en: ["10 metres", "10*sqrt(3) metres", "15 metres", "30*sqrt(3) metres", "Option E: Not Attempted"],
      options_gu: ["૧૦ મીટર", "૧૦*sqrt(૩) મીટર", "૧૫ મીટર", "૩૦*sqrt(૩) મીટર", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 10*sqrt(3) metres
      explanation_en: "tan(30) = Height / Base => 1 / sqrt(3) = H / 30 => H = 30 / sqrt(3) = 10 * sqrt(3) metres (approx 17.32 m).",
      explanation_gu: "tan(૩૦) = ઊંચાઈ / પાયો => ૧ / sqrt(૩) = H / ૩૦ => H = ૩૦ / sqrt(૩) = ૧૦*sqrt(૩) મીટર."
    },
    {
      id: "math_stat_01",
      subject: "mathematics",
      topic: "statistics",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "For a moderately asymmetrical frequency distribution, if the Mean is 24 and the Median is 26, what is the empirical Mode?",
      question_gu: "મધ્યમ વિષમ આવૃત્તિ વિતરણ માટે જો મધ્યક ૨૪ અને મધ્યસ્થ ૨૬ હોય, તો પ્રયોગમૂલક બહુલક (Mode) કેટલો થશે?",
      options_en: ["28", "30", "32", "34", "Option E: Not Attempted"],
      options_gu: ["૨૮", "૩૦", "૩૨", "૩૪", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // 30
      explanation_en: "Empirical relationship: Mode = 3 * Median - 2 * Mean = 3(26) - 2(24) = 78 - 48 = 30.",
      explanation_gu: "બહુલક, મધ્યસ્થ અને મધ્યક વચ્ચેનો સંબંધ: બહુલક = ૩ * મધ્યસ્થ - ૨ * મધ્યક = ૩(૨૬) - ૨(૨૪) = ૭૮ - ૪૮ = ૩૦."
    }
  ];

  if (root.GoalQuestionBank && typeof root.GoalQuestionBank.register === 'function') {
    root.GoalQuestionBank.register(MATH_QUESTIONS);
  } else {
    root.__PENDING_MATH_DATA = MATH_QUESTIONS;
  }

  root.PSI_MATH_QUESTIONS = MATH_QUESTIONS;
})(typeof window !== 'undefined' ? window : this);
