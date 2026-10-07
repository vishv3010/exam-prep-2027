/**
 * PSI Paper 2 — descriptive, handwritten, human-marked (100 marks).
 * Learn the frames + formal phrases in the app, then WRITE ON PAPER with the timer.
 * Tasks are self-scored against a rubric; the score feeds the projection.
 */
(function (root) {
  'use strict';
  var G = root.GOAL, L = G.L, F = G.F, T = G.T;

  var ESSAY_RUBRIC = [
    'Within 320–380 words',
    'Introduction (પ્રસ્તાવના) opens with a fact, quote or question',
    '3 or more body paragraphs, each with a sub-heading',
    'Covers the government / police / citizen role',
    'At least one specific fact, number or example',
    'Formal Gujarati throughout — no English or spoken words',
    'Forward-looking conclusion (ઉપસંહાર)',
    'Neat handwriting, margins, finished inside 35 minutes'
  ];
  var LETTER_RUBRIC = [
    'Correct layout: sender, date, પ્રતિ, recipient designation',
    'One-line વિષય (subject) that says exactly what you want',
    'Respectful salutation and closing (આપનો વિશ્વાસુ)',
    'Body in 3 short paragraphs: purpose · details · request',
    'Specific details (place, date, numbers)',
    'Formal register, 150–200 words, finished inside 15 minutes'
  ];
  var REPORT_RUBRIC = [
    'Title, place, date and reporter line',
    'Answers who, what, when, where, how',
    'Past tense, neutral — no personal opinion',
    'Action taken / present status',
    'Recommendation or closing line',
    '150–200 words, finished inside 15 minutes'
  ];
  var PRECIS_RUBRIC = [
    'About one-third of the original length',
    'Every main idea kept; examples dropped',
    'Own words — no copied sentences',
    'A short, fitting title (શીર્ષક / Title)',
    'Grammatically clean, finished inside 15 minutes'
  ];
  var TRANSLATE_RUBRIC = [
    'Meaning complete — nothing added or dropped',
    'Tense matches the original',
    'Natural English, not word-for-word',
    'No spelling or article errors'
  ];

  function essay(title, en, heads) {
    return T('essay', title, { title: 'Gujarati essay · 350 words', en: en, heads: heads, min: 35, rubric: ESSAY_RUBRIC, marks: 30 });
  }

  G.add('w_essay', [
    L('The 350-word essay frame (30 marks)', '1. **પ્રસ્તાવના** (introduction) — 40–50 words. Open with a fact, a quote or a question.\n2. **3–4 body paragraphs with sub-headings** — 70–80 words each: present situation · causes · challenges · solutions.\n3. **Role of government, police and citizens** — a police paper rewards the administration angle.\n4. **ઉપસંહાર** (conclusion) — about 40 words, hopeful and forward-looking.\nTime: 35 minutes → plan 5, write 27, check 3.'),
    L('What examiners actually reward', '- Visible structure: headings, paragraphs, margins\n- Formal (શિષ્ટ) Gujarati — no English word where a Gujarati one exists, no spoken forms like "છે ને", "બહુ"\n- One or two specific facts or numbers — they make an essay look prepared\n- Neat, readable handwriting with no overwriting\n- Staying close to the word limit\nYou already speak Gujarati. These 30 marks are about format and register, not talent — the cheapest marks in the whole PSI exam.'),
    F('"In today’s times…"', 'આજના સમયમાં… / વર્તમાન યુગમાં…'),
    F('"It is noteworthy that…"', 'નોંધનીય છે કે…'),
    F('"On the other hand…"', 'બીજી તરફ…'),
    F('"Therefore / as a result"', 'આથી / પરિણામે'),
    F('"For example"', 'ઉદાહરણ તરીકે'),
    F('"In conclusion, it can be said that…"', 'અંતમાં કહી શકાય કે… / ઉપસંહારરૂપે…'),
    F('"It is the duty of every citizen to…"', 'દરેક નાગરિકની ફરજ છે કે…'),
    F('"The government has taken many steps"', 'સરકારે અનેક પગલાં લીધાં છે.'),
    F('"Public awareness is the only solution"', 'જનજાગૃતિ એ જ ઉકેલ છે.'),
    F('challenge', 'પડકાર'), F('solution / remedy', 'ઉકેલ / ઉપાય'), F('development', 'વિકાસ'),
    F('law and order', 'કાયદો અને વ્યવસ્થા'), F('responsibility', 'જવાબદારી'), F('safety / security', 'સલામતી / સુરક્ષા'),
    F('awareness', 'જાગૃતિ'), F('the youth', 'યુવાવર્ગ / યુવાનો'), F('society', 'સમાજ'), F('environment', 'પર્યાવરણ'),
    essay('સાયબર ગુના: યુવાનો સામેનો નવો પડકાર', 'Cyber crime: a new challenge for youth',
      ['પ્રસ્તાવના', 'સાયબર ગુનાના પ્રકાર (ઓનલાઇન છેતરપિંડી, ફિશિંગ, સોશિયલ મીડિયા)', 'યુવાનો કેમ નિશાન બને છે', 'સરકાર અને પોલીસનાં પગલાં — હેલ્પલાઇન 1930, cybercrime.gov.in', 'નાગરિકની સાવચેતી', 'ઉપસંહાર']),
    essay('નશામુક્ત ગુજરાત: સમાજ અને પોલીસની ભૂમિકા', 'A drug-free Gujarat: role of society and police',
      ['પ્રસ્તાવના', 'નશાની સમસ્યાનું સ્વરૂપ', 'કુટુંબ અને સમાજ પર અસર', 'પોલીસની કાર્યવાહી અને જાગૃતિ અભિયાન', 'યુવાનોને રમતગમત તરફ વાળવા', 'ઉપસંહાર']),
    essay('માર્ગ સલામતી: નિયમપાલન એ જ સુરક્ષા', 'Road safety: following rules is safety',
      ['પ્રસ્તાવના — અકસ્માતના આંકડા', 'અકસ્માતનાં કારણો', 'હેલ્મેટ, સીટબેલ્ટ, ઝડપ મર્યાદા', 'ટ્રાફિક પોલીસ અને ટેકનોલોજી (CCTV, e-challan)', 'નાગરિકની જવાબદારી', 'ઉપસંહાર']),
    essay('મહિલા સુરક્ષા અને સશક્તિકરણ', 'Women’s safety and empowerment',
      ['પ્રસ્તાવના', 'વર્તમાન પરિસ્થિતિ', 'કાયદાકીય જોગવાઈઓ અને હેલ્પલાઇન (181 અભયમ્)', 'શિક્ષણ અને આર્થિક સ્વાવલંબન', 'સમાજની માનસિકતામાં પરિવર્તન', 'ઉપસંહાર']),
    essay('સોશિયલ મીડિયા: વરદાન કે અભિશાપ?', 'Social media: boon or curse?',
      ['પ્રસ્તાવના', 'ફાયદા — માહિતી, સંપર્ક, વ્યવસાય', 'ગેરફાયદા — અફવા, વ્યસન, ગોપનીયતા', 'ફેક ન્યૂઝ અને કાયદો-વ્યવસ્થા', 'સંતુલિત ઉપયોગ', 'ઉપસંહાર']),
    essay('ગુજરાતનો દરિયાકિનારો: તક અને પડકાર', 'Gujarat’s coastline: opportunity and challenge',
      ['પ્રસ્તાવના — દેશનો સૌથી લાંબો દરિયાકિનારો', 'બંદરો અને વેપાર (કંડલા, મુંદ્રા, પીપાવાવ)', 'માછીમારી અને પ્રવાસન', 'દરિયાઈ સુરક્ષા અને દાણચોરી', 'પર્યાવરણ — ચેરનાં જંગલો, ખારાશ', 'ઉપસંહાર']),
    essay('જળ સંરક્ષણ: સમયની માંગ', 'Water conservation: need of the hour',
      ['પ્રસ્તાવના', 'પાણીની અછતનાં કારણો', 'પરંપરાગત જળસંગ્રહ — વાવ, તળાવ, ચેકડેમ', 'સરકારી યોજનાઓ (સુજલામ્ સુફલામ્, સૌની યોજના)', 'નાગરિક શું કરી શકે', 'ઉપસંહાર']),
    essay('આપત્તિ વ્યવસ્થાપન: ગુજરાતનો અનુભવ', 'Disaster management: Gujarat’s experience',
      ['પ્રસ્તાવના — 2001નો કચ્છ ભૂકંપ', 'ગુજરાત પર આવતી આપત્તિઓ (ભૂકંપ, વાવાઝોડું, પૂર)', 'GSDMA અને પૂર્વ-તૈયારી', 'પોલીસ અને બચાવ દળની ભૂમિકા', 'જનભાગીદારી', 'ઉપસંહાર']),
    essay('યુવાનો અને રમતગમત', 'Youth and sports',
      ['પ્રસ્તાવના', 'રમતગમતથી શારીરિક અને માનસિક લાભ', 'શિસ્ત અને ટીમભાવના', 'ખેલ મહાકુંભ અને સરકારી પ્રોત્સાહન', 'વ્યસન અને મોબાઇલથી દૂર', 'ઉપસંહાર']),
    essay('ડિજિટલ ઇન્ડિયા અને ગ્રામીણ વિકાસ', 'Digital India and rural development',
      ['પ્રસ્તાવના', 'ડિજિટલ સેવાઓ — UPI, ઇ-ગ્રામ, ઓનલાઇન અરજી', 'ખેડૂતો અને શિક્ષણ માટે લાભ', 'પડકારો — ડિજિટલ સાક્ષરતા, સાયબર છેતરપિંડી', 'આગળનો માર્ગ', 'ઉપસંહાર'])
  ]);

  function letter(prompt, en, kind) {
    var isReport = kind === 'report';
    return T(kind, prompt, { title: isReport ? 'Gujarati report · 150–200 words' : 'Gujarati formal letter · 150–200 words', en: en, min: 15, rubric: isReport ? REPORT_RUBRIC : LETTER_RUBRIC, marks: 10 });
  }

  G.add('w_letter', [
    L('Formal letter frame (ઔપચારિક પત્ર / અરજી)', 'Top right: sender’s address and date.\nThen:\n- **પ્રતિ,** recipient’s designation and office address\n- **વિષય:** one line — what you want\n- **સંદર્ભ:** only if replying to something\n- **માનનીય સાહેબ,**\n- Body in 3 short paragraphs: purpose · details · request\n- **આપનો વિશ્વાસુ,** name and signature'),
    L('Report frame (અહેવાલ)', '- Title in the centre\n- Place, date, "reporter" line\n- What happened: who, what, when, where, how — past tense, neutral\n- Action taken / present status\n- One closing line or recommendation\nNo personal opinion, no "I felt". 150–200 words.'),
    F('Subject line', 'વિષય:'), F('Respected Sir,', 'માનનીય સાહેબ,'), F('Yours faithfully,', 'આપનો વિશ્વાસુ,'),
    F('Reference', 'સંદર્ભ:'), F('To (recipient)', 'પ્રતિ,'), F('application', 'અરજી'), F('report', 'અહેવાલ'),
    F('"I request you to take necessary action"', 'આપને જરૂરી કાર્યવાહી કરવા વિનંતી છે.'),
    F('"I wish to draw your attention to…"', 'હું આપનું ધ્યાન … તરફ દોરવા માગું છું.'),
    letter('શાળા પાસે ટ્રાફિકની સમસ્યા અંગે પોલીસ કમિશનરને પત્ર લખો.', 'Letter to the Police Commissioner about traffic near a school', 'letter'),
    letter('ગામમાં પીવાના પાણીની અછત અંગે કલેક્ટરને અરજી લખો.', 'Application to the Collector about drinking-water shortage in the village', 'letter'),
    letter('તમારા વિસ્તારમાં બંધ સ્ટ્રીટલાઇટ અને મહિલા સલામતી અંગે મ્યુનિસિપલ કમિશનરને પત્ર લખો.', 'Letter to the Municipal Commissioner about broken streetlights and women’s safety', 'letter'),
    letter('હાઇવે પર થયેલા માર્ગ અકસ્માતનો અહેવાલ લખો.', 'Report on a road accident on the highway', 'report'),
    letter('ગામમાં યોજાયેલા સ્વચ્છતા અભિયાનનો અહેવાલ લખો.', 'Report on a cleanliness drive held in the village', 'report'),
    letter('પોલીસ વિભાગ દ્વારા યોજાયેલા રક્તદાન કેમ્પનો અહેવાલ લખો.', 'Report on a blood-donation camp organised by the police', 'report')
  ]);

  var GP1 = 'શિસ્ત એ સફળતાની ચાવી છે. જે વ્યક્તિ પોતાના સમયનું યોગ્ય આયોજન કરે છે, તે ઓછા સમયમાં વધુ કાર્ય કરી શકે છે. વિદ્યાર્થી હોય કે કર્મચારી, ખેલાડી હોય કે સૈનિક — દરેકના જીવનમાં શિસ્તનું આગવું મહત્વ છે. શિસ્ત વિનાની પ્રતિભા ઘણી વાર વેડફાઈ જાય છે, જ્યારે સામાન્ય ક્ષમતા ધરાવતી વ્યક્તિ પણ નિયમિત મહેનતથી ઊંચું સ્થાન મેળવે છે. શિસ્ત બહારથી લાદવામાં આવે ત્યારે બોજ લાગે છે, પરંતુ જ્યારે તે આદત બની જાય છે ત્યારે જીવન સરળ બને છે. તેથી નાની નાની બાબતોમાં નિયમિતતા કેળવવી એ જ મોટી સફળતાનો માર્ગ છે.';
  var GP2 = 'ગુજરાતના અનેક વિસ્તારોમાં વરસાદ અનિયમિત અને ઓછો પડે છે. જૂના સમયમાં લોકો વાવ, કૂવા અને તળાવ દ્વારા વરસાદી પાણીનો સંગ્રહ કરતા હતા. સમય જતાં નળ દ્વારા પાણી મળવા લાગ્યું અને આ પરંપરાગત વ્યવસ્થાઓ ઉપેક્ષિત બની. બોરવેલ વધુ ઊંડા થતા ગયા અને ભૂગર્ભ જળનું સ્તર નીચે ઊતરતું ગયું. આજે ઘણાં ગામો ચેકડેમ બાંધીને અને જૂના તળાવો ઊંડા કરીને ફરી જળસંગ્રહ તરફ વળ્યાં છે. પાણી બચાવવું એ માત્ર સરકારની નહીં, પરંતુ દરેક નાગરિકની જવાબદારી છે.';

  G.add('w_precis', [
    L('Gujarati précis (સંક્ષેપ) — the method', '1. Read twice. Underline the one main idea of each sentence group.\n2. Write about **one-third** of the original length.\n3. Use your own words — do not copy sentences.\n4. Drop examples, lists and repetition.\n5. Add a short title (**શીર્ષક**).\nComprehension (ગદ્યાર્થગ્રહણ): answer in full sentences, using the passage only.'),
    F('précis / summary', 'સંક્ષેપ'), F('title', 'શીર્ષક'), F('comprehension (prose)', 'ગદ્યાર્થગ્રહણ'), F('main idea', 'મુખ્ય વિચાર / કેન્દ્રવર્તી વિચાર'),
    T('precis_gu', 'નીચેના ફકરાનો આશરે ત્રીજા ભાગમાં સંક્ષેપ કરો અને યોગ્ય શીર્ષક આપો.', { title: 'Gujarati précis', passage: GP1, min: 15, rubric: PRECIS_RUBRIC, marks: 10 }),
    T('precis_gu', 'નીચેના ફકરાનો સંક્ષેપ કરો અને શીર્ષક આપો.', { title: 'Gujarati précis', passage: GP2, min: 15, rubric: PRECIS_RUBRIC, marks: 10 })
  ]);

  var EP1 = 'Many young people believe that success comes from a single big decision — choosing the right college, the right job or the right city. In reality, most success is built from small decisions repeated every day: waking up on time, finishing the task in front of you, and keeping promises made to yourself. These choices look too small to matter on any single day. Over a year, however, they decide whether a person moves forward or stays where they are. Big decisions open doors, but daily habits decide whether you walk through them.';

  G.add('e_writing', [
    L('English précis', '- One-third of the original length, in your own words.\n- Third person, one consistent tense.\n- No examples, no quotes, no opinion of your own.\n- Give it a title.\nCount words of the original first, divide by 3 — that is your target.'),
    L('Translation, Gujarati → English', 'Translate the meaning, not word by word. Keep the original tense. Use formal English — "do not", not "don’t". Check articles (a / an / the) and subject–verb agreement last; most marks are lost there.'),
    F('પોલીસે ગુનેગારની ધરપકડ કરી.', 'The police arrested the criminal.'),
    F('કાયદો સૌ માટે સમાન છે.', 'The law is equal for all.'),
    F('નાગરિકોએ ટ્રાફિકના નિયમોનું પાલન કરવું જોઈએ.', 'Citizens should follow traffic rules.'),
    F('સાયબર ગુનાઓ ઝડપથી વધી રહ્યા છે.', 'Cyber crimes are increasing rapidly.'),
    F('ગ્રામ પંચાયત ગામનો વહીવટ સંભાળે છે.', 'The village panchayat manages the administration of the village.'),
    F('સ્ત્રીઓની સલામતી સમાજની જવાબદારી છે.', 'The safety of women is the responsibility of society.'),
    F('વરસાદને કારણે રસ્તાઓ બંધ થઈ ગયા.', 'The roads were closed because of the rain.'),
    F('ફરિયાદ નોંધાવવી દરેક નાગરિકનો અધિકાર છે.', 'Filing a complaint is the right of every citizen.'),
    F('તેણે સમયસર કામ પૂરું કર્યું.', 'He completed the work on time.'),
    F('અમે આવતી કાલે મીટિંગમાં હાજર રહીશું.', 'We will attend the meeting tomorrow.'),
    T('precis_en', 'Write a précis of the passage in about one-third of its length and give it a title.', { title: 'English précis', passage: EP1, min: 15, rubric: PRECIS_RUBRIC, marks: 10 }),
    T('translate', 'Translate the passage into English.', { title: 'Gujarati → English translation', passage: GP2, min: 15, rubric: TRANSLATE_RUBRIC, marks: 10 })
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
