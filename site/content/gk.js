/**
 * General Studies — PSI Part B + CDS GK. Mostly metro-friendly facts.
 * Correct option first; the UI shuffles.
 */
(function (root) {
  'use strict';
  var G = root.GOAL, L = G.L, Q = G.Q, F = G.F;

  // ───────────────────────────────────────────── Polity (PSI 18 · CDS 12)
  G.add('g_polity', [
    L('The Constitution — key dates', '- Constituent Assembly first met **9 Dec 1946**. President: **Dr Rajendra Prasad**.\n- Drafting Committee chairman: **Dr B. R. Ambedkar**.\n- Adopted **26 Nov 1949** (now Constitution Day / Samvidhan Divas).\n- Came into force **26 Jan 1950** (Republic Day).\n- Took 2 years, 11 months, 18 days.\n- Originally 395 articles, 22 parts, 8 schedules. Today **12 schedules**.'),
    F('Constitution adopted on', '26 November 1949'), F('Constitution came into force on', '26 January 1950'),
    F('Chairman of the Drafting Committee', 'Dr B. R. Ambedkar'), F('President of the Constituent Assembly', 'Dr Rajendra Prasad'),
    Q('The Constitution of India came into force on:', ['26 January 1950', '26 November 1949', '15 August 1947', '9 December 1946'], 'Adopted 26 Nov 1949; in force 26 Jan 1950.'),
    L('The Preamble', '"We, the people of India… a **Sovereign Socialist Secular Democratic Republic**", securing Justice, Liberty, Equality and Fraternity.\n- "Socialist", "Secular" and "Integrity" were added by the **42nd Amendment (1976)** — the "mini-constitution".\n- The Preamble is part of the Constitution (Kesavananda Bharati, 1973) but is not enforceable in court.'),
    Q('Which words were added to the Preamble by the 42nd Amendment?', ['Socialist, Secular, Integrity', 'Sovereign, Democratic', 'Justice, Liberty', 'Republic, Fraternity'], '42nd Amendment, 1976.'),
    F('Amendment that added "Socialist" and "Secular"', '42nd Amendment, 1976'),
    L('Borrowed features', '- **UK**: parliamentary system, rule of law, single citizenship, writs\n- **USA**: Fundamental Rights, judicial review, impeachment of the President\n- **Ireland**: Directive Principles (DPSP)\n- **Canada**: federation with a strong centre\n- **Australia**: Concurrent List\n- **USSR**: Fundamental Duties\n- **Germany (Weimar)**: suspension of rights during Emergency\n- **South Africa**: amendment procedure'),
    Q('The idea of Directive Principles of State Policy was borrowed from:', ['Ireland', 'USA', 'UK', 'Canada'], 'DPSP — Irish Constitution.'),
    F('Fundamental Rights borrowed from', 'the USA'), F('Fundamental Duties borrowed from', 'the USSR'), F('Concurrent List borrowed from', 'Australia'),
    L('Fundamental Rights — Part III (Art 12–35)', 'Six groups:\n- Equality — Art **14–18** (14: equality before law; 17: abolition of untouchability)\n- Freedom — Art **19–22** (19: six freedoms; **21: life and personal liberty**; 21A: free education 6–14 yrs)\n- Against exploitation — Art 23–24 (24: no child labour under 14 in factories)\n- Religion — Art 25–28\n- Cultural & educational — Art 29–30\n- **Constitutional remedies — Art 32** (Ambedkar: "heart and soul of the Constitution")\nRight to Property was removed as a FR by the **44th Amendment (1978)**; it is now a legal right under Art 300A.'),
    F('Article 14', 'Equality before law'), F('Article 17', 'Abolition of untouchability'), F('Article 21', 'Protection of life and personal liberty'),
    F('Article 21A', 'Free and compulsory education, age 6–14 (86th Amendment, 2002)'), F('Article 32', 'Right to constitutional remedies — "heart and soul"'),
    F('Right to Property is now under', 'Article 300A (legal right, after 44th Amendment 1978)'),
    Q('Which Article did Dr Ambedkar call the "heart and soul" of the Constitution?', ['Article 32', 'Article 21', 'Article 14', 'Article 19'], 'Right to constitutional remedies.'),
    Q('Untouchability is abolished by:', ['Article 17', 'Article 14', 'Article 21', 'Article 25'], 'Article 17.'),
    Q('Right to education for children aged 6–14 is in:', ['Article 21A', 'Article 45', 'Article 19', 'Article 51A'], 'Inserted by the 86th Amendment, 2002.'),
    L('Writs — five Latin words', '- **Habeas corpus** — "produce the body": against illegal detention\n- **Mandamus** — "we command": orders an official to do a public duty\n- **Prohibition** — stops a lower court acting beyond its jurisdiction\n- **Certiorari** — quashes an order already passed by a lower court\n- **Quo warranto** — "by what authority": challenges a person holding a public office illegally\nSupreme Court issues writs under **Art 32**, High Courts under **Art 226** (wider).'),
    F('Habeas corpus', '"produce the body" — against illegal detention'), F('Mandamus', '"we command" — orders an official to perform a duty'),
    F('Quo warranto', '"by what authority" — challenges illegal holding of public office'), F('High Courts issue writs under', 'Article 226'),
    Q('Which writ protects a person from illegal detention?', ['Habeas corpus', 'Mandamus', 'Certiorari', 'Quo warranto'], '"Produce the body."'),
    Q('Which writ asks a person "by what authority" they hold a public office?', ['Quo warranto', 'Prohibition', 'Mandamus', 'Habeas corpus'], 'Literal meaning of quo warranto.'),
    L('DPSP and Fundamental Duties', '**DPSP — Part IV (Art 36–51)**, not enforceable in court:\n- Art 40: organise village panchayats\n- Art 44: Uniform Civil Code\n- Art 48A: protect environment, forests, wildlife\n- Art 50: separate judiciary from executive\n**Fundamental Duties — Part IVA, Art 51A**: added by the **42nd Amendment (1976)** on the Swaran Singh Committee’s advice. Now **11** duties (11th added by the 86th Amendment, 2002).'),
    F('Article 40', 'DPSP — organisation of village panchayats'), F('Article 44', 'DPSP — Uniform Civil Code'), F('Article 51A', 'Fundamental Duties (11)'),
    Q('Fundamental Duties were added on the recommendation of:', ['Swaran Singh Committee', 'Balwantrai Mehta Committee', 'Sarkaria Commission', 'Kothari Commission'], '42nd Amendment, 1976.'),
    Q('Uniform Civil Code is mentioned in:', ['Article 44', 'Article 40', 'Article 48', 'Article 51'], 'A Directive Principle.'),
    L('President, Vice-President, PM', '- **President** — Art 52. Elected by elected MPs + elected MLAs (states, Delhi, Puducherry). Term 5 years, minimum age 35. Impeachment: Art 61.\n- **Vice-President** — Art 63. Ex-officio Chairman of the Rajya Sabha. Elected by members of both Houses.\n- **Prime Minister** — appointed by the President (Art 75). Council of Ministers is collectively responsible to the **Lok Sabha**. Size capped at 15% of Lok Sabha (91st Amendment, 2003).'),
    F('Minimum age to become President', '35 years'), F('Ex-officio Chairman of the Rajya Sabha', 'the Vice-President'),
    F('Council of Ministers is collectively responsible to', 'the Lok Sabha (Art 75(3))'),
    Q('The Vice-President of India is the ex-officio Chairman of:', ['Rajya Sabha', 'Lok Sabha', 'NITI Aayog', 'Planning Commission'], 'Art 64.'),
    Q('Who elects the President of India?', ['Elected MPs and elected MLAs', 'All MPs only', 'The people directly', 'Lok Sabha only'], 'Electoral college of elected members of Parliament and state/UT assemblies.'),
    L('Parliament', '- Parliament = President + Lok Sabha + Rajya Sabha (Art 79).\n- **Lok Sabha**: max 550 members; 543 elected now. Term 5 years. Minimum age 25. Presided by the Speaker.\n- **Rajya Sabha**: max 250 (238 elected + **12 nominated**). Permanent house — one-third retire every 2 years; member term 6 years. Minimum age 30.\n- **Money Bill** (Art 110) can be introduced only in the Lok Sabha; the Speaker certifies it.\n- **Joint sitting** (Art 108) is presided over by the Speaker.'),
    F('Nominated members in Rajya Sabha', '12'), F('Term of a Rajya Sabha member', '6 years'), F('Who certifies a Money Bill?', 'the Speaker of the Lok Sabha'),
    Q('A Money Bill can be introduced only in:', ['Lok Sabha', 'Rajya Sabha', 'either House', 'a joint sitting'], 'Art 110 / 109.'),
    Q('Who presides over a joint sitting of Parliament?', ['Speaker of Lok Sabha', 'President', 'Vice-President', 'Prime Minister'], 'Art 108 joint sitting — the Speaker presides.'),
    Q('Minimum age to be a member of the Rajya Sabha:', ['30 years', '25 years', '35 years', '21 years'], 'Lok Sabha 25, Rajya Sabha 30.'),
    L('Emergency and amendments', '- **Art 352** National Emergency (war / external aggression / armed rebellion)\n- **Art 356** President’s Rule in a state\n- **Art 360** Financial Emergency — never used\n- **Art 368** amendment of the Constitution. **Kesavananda Bharati (1973)**: Parliament cannot change the **basic structure**.\n- **61st Amendment (1988)**: voting age 21 → **18**.\n- **52nd Amendment (1985)**: anti-defection law, **10th Schedule**.'),
    F('Article 356', 'President’s Rule in a state'), F('Article 360', 'Financial Emergency (never imposed)'), F('Article 368', 'Amendment of the Constitution'),
    F('Basic structure doctrine — case', 'Kesavananda Bharati v. State of Kerala, 1973'), F('Voting age lowered to 18 by', '61st Amendment, 1988'), F('Anti-defection law', '10th Schedule (52nd Amendment, 1985)'),
    Q('Which Amendment reduced the voting age from 21 to 18?', ['61st', '42nd', '44th', '73rd'], '61st Amendment Act, 1988.'),
    Q('The basic structure doctrine was laid down in:', ['Kesavananda Bharati case', 'Golaknath case', 'Minerva Mills case', 'Maneka Gandhi case'], '1973, 13-judge bench.'),
    L('Local government', '- **73rd Amendment (1992)** — Panchayati Raj: Part IX, **11th Schedule (29 subjects)**, three tiers.\n- **74th Amendment (1992)** — Municipalities: Part IXA, **12th Schedule (18 subjects)**.\n- Three-tier panchayat system was recommended by the **Balwantrai Mehta Committee (1957)**. Balwantrai Mehta was later the 2nd Chief Minister of Gujarat.\n- First panchayati raj: Nagaur, Rajasthan, 2 Oct 1959.'),
    F('73rd Amendment', 'Panchayati Raj — Part IX, 11th Schedule, 29 subjects'), F('74th Amendment', 'Municipalities — Part IXA, 12th Schedule, 18 subjects'),
    Q('Three-tier Panchayati Raj was recommended by:', ['Balwantrai Mehta Committee', 'Ashok Mehta Committee', 'Swaran Singh Committee', 'L. M. Singhvi Committee'], '1957.'),
    L('Constitutional bodies — the Article list', '- Election Commission — **Art 324**\n- CAG — **Art 148**\n- Attorney General — **Art 76** (Advocate General of a state — Art 165)\n- UPSC — **Art 315**\n- Finance Commission — **Art 280**\n- GST Council — **Art 279A** (101st Amendment, 2016)\n- Supreme Court — Art 124 (judges retire at 65; High Court judges at 62)\n- Governor — Art 153, appointed by the President'),
    F('Article 324', 'Election Commission'), F('Article 148', 'Comptroller and Auditor General (CAG)'), F('Article 280', 'Finance Commission'),
    F('Article 315', 'Public Service Commissions (UPSC / state PSCs)'), F('Retirement age — Supreme Court judge', '65'), F('Retirement age — High Court judge', '62'),
    Q('The Election Commission is provided for in:', ['Article 324', 'Article 148', 'Article 280', 'Article 315'], 'Art 324.'),
    Q('The 8th Schedule lists:', ['22 official languages', 'Union, State and Concurrent lists', 'anti-defection rules', 'forms of oaths'], '7th = the three lists; 10th = anti-defection; 3rd = oaths.'),
    F('7th Schedule', 'Union, State and Concurrent Lists'), F('8th Schedule', '22 languages')
  ]);

  // ───────────────────────────────────────────── Modern India (PSI 5 · CDS 10)
  G.add('g_hist_modern', [
    L('1857 to 1905', '- **1857** revolt began at **Meerut, 10 May 1857**.\n- **Indian National Congress** founded **1885** by A. O. Hume; first session in Bombay, president W. C. Bonnerjee.\n- **Partition of Bengal 1905** by Lord Curzon → Swadeshi movement.\n- **Muslim League** founded 1906 at Dhaka.\n- **Surat split 1907** — Congress divided into Moderates and Extremists (at Surat, Gujarat).'),
    F('1857 revolt began at', 'Meerut, 10 May 1857'), F('INC founded', '1885, by A. O. Hume; first president W. C. Bonnerjee'),
    F('Congress split (Moderates vs Extremists)', 'Surat, 1907'), F('Partition of Bengal', '1905, Lord Curzon'),
    Q('The Indian National Congress was founded in:', ['1885', '1857', '1905', '1906'], 'Bombay session, 28 Dec 1885.'),
    Q('The Congress split into Moderates and Extremists at the session held in:', ['Surat', 'Lahore', 'Calcutta', 'Lucknow'], 'Surat, 1907.'),
    L('Gandhi’s early movements', '- Returned from South Africa **9 Jan 1915** (now Pravasi Bharatiya Divas).\n- **Champaran 1917** (Bihar, indigo) — first satyagraha in India.\n- **Ahmedabad mill strike 1918** — first hunger strike.\n- **Kheda 1918** (Gujarat) — peasants vs revenue; Sardar Patel joined.\n- **Jallianwala Bagh, 13 April 1919** — against the Rowlatt Act; General Dyer.\n- **Non-Cooperation 1920–22** — withdrawn after **Chauri Chaura** (Feb 1922).'),
    F('First satyagraha in India', 'Champaran, 1917 (indigo farmers)'), F('Jallianwala Bagh massacre', '13 April 1919, Amritsar'),
    F('Non-Cooperation withdrawn after', 'Chauri Chaura incident, 1922'), F('Kheda Satyagraha', '1918, Gujarat'),
    Q('Gandhi’s first satyagraha in India was at:', ['Champaran', 'Kheda', 'Bardoli', 'Dandi'], '1917, Bihar.'),
    Q('Non-Cooperation Movement was called off because of:', ['Chauri Chaura', 'Jallianwala Bagh', 'Simon Commission', 'Rowlatt Act'], 'Violence at Chauri Chaura, Feb 1922.'),
    L('1928 to 1947', '- **Bardoli Satyagraha 1928** led by Vallabhbhai Patel → women gave him the title **"Sardar"**.\n- **Lahore session 1929** (president Nehru) — **Purna Swaraj**; 26 Jan 1930 celebrated as Independence Day.\n- **Dandi March: 12 March – 6 April 1930**, Sabarmati Ashram to Dandi (Navsari), ~390 km, 78 companions → Civil Disobedience.\n- Gandhi–Irwin Pact 1931; Poona Pact 1932 (Gandhi–Ambedkar).\n- **Quit India, 8 Aug 1942**, Bombay — "Do or Die".\n- Subhas Chandra Bose — **Azad Hind Fauj (INA)**; Azad Hind government at Singapore, 1943.\n- Mountbatten Plan 3 June 1947 → Independence **15 Aug 1947**.'),
    F('Who gave Vallabhbhai Patel the title "Sardar"?', 'women of Bardoli, after the 1928 satyagraha'), F('Dandi March dates', '12 March – 6 April 1930'),
    F('Purna Swaraj resolution', 'Lahore session, 1929 (Nehru presiding)'), F('Quit India launched', '8 August 1942, Bombay — "Do or Die"'),
    Q('The Dandi March began from:', ['Sabarmati Ashram', 'Kochrab Ashram', 'Wardha', 'Porbandar'], '12 March 1930.'),
    Q('"Do or Die" was the slogan of:', ['Quit India Movement', 'Non-Cooperation Movement', 'Civil Disobedience', 'Swadeshi Movement'], '8 Aug 1942.'),
    Q('Vallabhbhai Patel got the title "Sardar" after the:', ['Bardoli Satyagraha', 'Kheda Satyagraha', 'Dandi March', 'Quit India Movement'], 'Bardoli, 1928.'),
    L('Integration of India', '- **Sardar Patel** with V. P. Menon integrated ~560 princely states.\n- **Junagadh** — plebiscite, Feb 1948. **Hyderabad** — Operation Polo, Sept 1948.\n- Patel is the "Iron Man of India". **Statue of Unity**, 182 m, Ekta Nagar (Kevadia), inaugurated 31 Oct 2018. **31 Oct = National Unity Day**.\n- Gandhi was born **2 Oct 1869, Porbandar**.'),
    F('Statue of Unity height', '182 m — Ekta Nagar (Kevadia), Narmada district'), F('National Unity Day', '31 October (Sardar Patel’s birthday)'),
    Q('Hyderabad was integrated into India through:', ['Operation Polo', 'Operation Vijay', 'a plebiscite', 'Operation Blue Star'], 'September 1948. Junagadh had a plebiscite.'),
    Q('Height of the Statue of Unity:', ['182 m', '152 m', '200 m', '240 m'], '182 m — the number of seats in the Gujarat assembly, a handy hook.')
  ]);

  // ───────────────────────────────────────────── Ancient & medieval (PSI 3 · CDS 8)
  G.add('g_hist_ancient', [
    L('Indus Valley Civilisation', '- Harappa discovered 1921 (Dayaram Sahni); Mohenjo-daro 1922 (R. D. Banerji).\n- Gujarat sites: **Lothal** (dockyard, Ahmedabad district), **Dholavira** (Kutch — UNESCO site 2021), Rangpur, Surkotada.\n- Planned cities, grid streets, drainage, Great Bath at Mohenjo-daro.'),
    F('IVC dockyard site in Gujarat', 'Lothal'), F('IVC UNESCO World Heritage site in Kutch', 'Dholavira (2021)'), F('Great Bath', 'Mohenjo-daro'),
    Q('The dockyard of the Indus Valley Civilisation was found at:', ['Lothal', 'Harappa', 'Kalibangan', 'Dholavira'], 'Lothal, Gujarat.'),
    L('Religions and the Mauryas', '- **Buddha**: born Lumbini, enlightenment Bodh Gaya, first sermon **Sarnath**, death Kushinagar.\n- **Mahavira**: 24th Jain tirthankara; Rishabhanatha was the first.\n- **Chandragupta Maurya** founded the Maurya empire; Chanakya wrote the **Arthashastra**.\n- **Ashoka** turned to Buddhism after the **Kalinga war (~261 BCE)**. His rock edicts are at **Girnar (Junagadh)**.'),
    F('Buddha’s first sermon', 'Sarnath'), F('24th Jain tirthankara', 'Mahavira'), F('Author of Arthashastra', 'Kautilya (Chanakya)'),
    Q('Ashoka embraced Buddhism after the war of:', ['Kalinga', 'Panipat', 'Plassey', 'Takshashila'], 'About 261 BCE.'),
    Q('Buddha gave his first sermon at:', ['Sarnath', 'Bodh Gaya', 'Lumbini', 'Kushinagar'], 'Dhammachakrapravartana at Sarnath.'),
    L('Guptas to the Mughals', '- **Gupta** age = "golden age": Samudragupta ("Napoleon of India"), Chandragupta II (Vikramaditya), Kalidasa, Aryabhata.\n- **Delhi Sultanate** from **1206** (Qutb-ud-din Aibak). Alauddin Khilji — market reforms. Muhammad bin Tughlaq — token currency, capital to Daulatabad.\n- **Vijayanagara** founded 1336 by Harihara and Bukka; Krishnadevaraya.\n- **Mughals**: Babur won the **First Battle of Panipat, 1526**. Akbar — Second Panipat 1556. Aurangzeb was born at **Dahod, Gujarat**. **Third Panipat 1761**: Marathas vs Ahmad Shah Abdali.\n- Shivaji’s coronation: Raigad, 1674.'),
    F('First Battle of Panipat', '1526 — Babur defeated Ibrahim Lodi'), F('Third Battle of Panipat', '1761 — Marathas vs Ahmad Shah Abdali'),
    F('"Napoleon of India"', 'Samudragupta'), F('Mughal emperor born at Dahod, Gujarat', 'Aurangzeb'), F('Vijayanagara empire founded', '1336, by Harihara and Bukka'),
    Q('The First Battle of Panipat (1526) was fought between Babur and:', ['Ibrahim Lodi', 'Hemu', 'Rana Sanga', 'Sher Shah'], 'It founded the Mughal empire.'),
    Q('Token currency was introduced by:', ['Muhammad bin Tughlaq', 'Alauddin Khilji', 'Akbar', 'Sher Shah Suri'], 'Bronze/copper tokens, 14th century.'),
    Q('Which Gupta ruler is called the "Napoleon of India"?', ['Samudragupta', 'Chandragupta I', 'Skandagupta', 'Kumaragupta'], 'From the Allahabad pillar inscription of his conquests.')
  ]);

  // ───────────────────────────────────────────── Geography (PSI 4 · CDS 14)
  G.add('g_geo', [
    L('India — the basics', '- Area ≈ 3.287 million km², **7th largest** country; ~2.4% of world land.\n- **Tropic of Cancer** passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.\n- Standard meridian **82.5° E** (near Mirzapur, UP) → IST = GMT + 5:30.\n- Southernmost point: **Indira Point** (Great Nicobar).\n- Palk Strait separates India and Sri Lanka.'),
    F('India’s standard meridian', '82.5° E (IST = GMT + 5:30)'), F('Southernmost point of India', 'Indira Point, Great Nicobar'), F('Strait between India and Sri Lanka', 'Palk Strait'),
    Q('The Tropic of Cancer does NOT pass through:', ['Odisha', 'Gujarat', 'Jharkhand', 'Mizoram'], 'It passes through 8 states; Odisha is not one of them.'),
    Q('Indian Standard Time is based on the longitude:', ['82.5° E', '80° E', '88.5° E', '75° E'], 'Passes near Mirzapur.'),
    L('Rivers', '- **Ganga** — longest river in India.\n- **Godavari** — longest peninsular river, "Dakshin Ganga".\n- West-flowing rivers: **Narmada, Tapi, Mahi, Sabarmati** — Narmada and Tapi flow through rift valleys and form **estuaries, not deltas**.\n- East-flowing peninsular rivers (Mahanadi, Godavari, Krishna, Kaveri) form deltas.\n- Tehri — highest dam; Hirakud (Mahanadi) — one of the longest dams; Sardar Sarovar on the Narmada.'),
    F('Longest peninsular river', 'Godavari ("Dakshin Ganga")'), F('Rivers forming estuaries instead of deltas', 'Narmada and Tapi (west-flowing, rift valleys)'),
    Q('Which river flows westward into the Arabian Sea?', ['Narmada', 'Godavari', 'Krishna', 'Mahanadi'], 'Narmada flows west through a rift valley.'),
    Q('Sardar Sarovar Dam is built on:', ['Narmada', 'Tapi', 'Mahi', 'Sabarmati'], 'At Kevadia (Ekta Nagar), Gujarat.'),
    L('Climate and soils', '- The south-west monsoon reaches Kerala around **1 June**.\n- **Mawsynram / Cherrapunji** (Meghalaya) — the wettest places. **Thar** — the driest.\n- **Black (regur) soil** — Deccan, Maharashtra, Gujarat — best for **cotton**; holds moisture.\n- **Alluvial** — most widespread, Indo-Gangetic plain.\n- **Laterite** — heavy rain leaches it; good for cashew, tea.'),
    F('Best soil for cotton', 'Black (regur) soil'), F('Most widespread soil in India', 'Alluvial soil'),
    Q('Black soil is best suited for:', ['cotton', 'rice', 'tea', 'wheat'], 'Also called black cotton soil.'),
    L('The world', '- Largest ocean: **Pacific**. Longest river: **Nile**. Largest hot desert: **Sahara**.\n- Highest peak: **Mount Everest, 8,849 m**.\n- Atmosphere layers: **troposphere** (weather) → **stratosphere** (ozone layer) → mesosphere → thermosphere (ionosphere, radio waves).\n- International Date Line ≈ 180° longitude.\n- Strait of Gibraltar joins the Mediterranean and the Atlantic; Strait of Malacca links the Indian Ocean and the Pacific (South China Sea).'),
    F('Layer of the atmosphere with the ozone layer', 'Stratosphere'), F('Layer where weather happens', 'Troposphere'), F('Height of Mount Everest', '8,849 m'),
    Q('The ozone layer lies in the:', ['stratosphere', 'troposphere', 'mesosphere', 'thermosphere'], 'About 15–35 km up.'),
    Q('The largest ocean is the:', ['Pacific', 'Atlantic', 'Indian', 'Arctic'], 'Covers about a third of Earth’s surface.')
  ]);

  // ───────────────────────────────────────────── Science
  G.add('g_physics', [
    L('Units you must know', 'Force — **newton** · Work/energy — **joule** · Power — **watt** · Pressure — **pascal** · Current — **ampere** · Resistance — **ohm** · Frequency — **hertz** · Charge — **coulomb**.'),
    F('SI unit of power', 'watt'), F('SI unit of pressure', 'pascal'), F('SI unit of resistance', 'ohm'), F('SI unit of frequency', 'hertz'),
    Q('The SI unit of force is:', ['newton', 'joule', 'watt', 'pascal'], '1 N = 1 kg·m/s².'),
    L('Light and sound', '- Light ≈ **3 × 10⁸ m/s**. Sound needs a medium; it is **fastest in solids** and cannot travel in a vacuum (~343 m/s in air).\n- Human hearing: **20 Hz – 20 kHz**. Above 20 kHz = ultrasound (bats, SONAR).\n- Sky is blue → **scattering** of light. Stars twinkle → **atmospheric refraction**. Rainbow → refraction + dispersion + internal reflection.\n- Optical fibre works by **total internal reflection**.\n- **Myopia** (short sight) → concave lens. **Hypermetropia** (long sight) → convex lens.'),
    F('Why is the sky blue?', 'scattering of sunlight'), F('Why do stars twinkle?', 'atmospheric refraction'),
    F('Optical fibres work on', 'total internal reflection'), F('Lens to correct myopia', 'concave (diverging) lens'),
    Q('Sound travels fastest in:', ['solids', 'liquids', 'gases', 'vacuum'], 'Particles are closest together in solids.'),
    Q('Myopia is corrected using a:', ['concave lens', 'convex lens', 'cylindrical lens', 'bifocal lens'], 'Short sight — the image forms in front of the retina.'),
    L('Force, electricity, heat', '- Newton’s 3rd law (action–reaction) explains **rocket propulsion**.\n- Ohm’s law: **V = IR**. A fuse uses a wire of low melting point.\n- Indian household supply: about **230 V, 50 Hz AC**.\n- Motor: electrical → mechanical. Generator: mechanical → electrical (Faraday’s electromagnetic induction).\n- g ≈ 9.8 m/s²; on the Moon you weigh about **1/6**.\n- −40° is the same on Celsius and Fahrenheit. Water is densest at **4 °C**.'),
    F('Ohm’s law', 'V = I × R'), F('Electric generator works on', 'electromagnetic induction (Faraday)'), F('Temperature equal in °C and °F', '−40'),
    Q('An electric motor converts:', ['electrical energy into mechanical energy', 'mechanical into electrical', 'heat into electrical', 'chemical into electrical'], 'A generator does the reverse.'),
    Q('Rocket propulsion is based on Newton’s:', ['third law', 'first law', 'second law', 'law of gravitation'], 'Action and reaction.')
  ]);

  G.add('g_chem', [
    L('Acids, bases, pH', 'pH < 7 acid · 7 neutral · > 7 base.\n- Lemon — **citric** acid · vinegar — **acetic** · curd — **lactic** · ant sting — **formic** · tamarind — **tartaric** · stomach — **hydrochloric**.'),
    F('Acid in vinegar', 'acetic acid'), F('Acid in curd', 'lactic acid'), F('Acid in ant sting', 'formic (methanoic) acid'), F('Acid in the stomach', 'hydrochloric acid (HCl)'),
    Q('Which acid is present in lemon?', ['citric acid', 'acetic acid', 'lactic acid', 'formic acid'], 'Citrus fruits → citric acid.'),
    L('Everyday chemicals', '- Baking soda — **NaHCO₃** (sodium bicarbonate)\n- Washing soda — **Na₂CO₃·10H₂O**\n- Bleaching powder — **CaOCl₂**\n- Plaster of Paris — **CaSO₄·½H₂O**\n- Common salt — **NaCl**\n- LPG — mainly **butane** (+ propane). CNG and biogas — mainly **methane**.'),
    F('Baking soda', 'NaHCO₃ (sodium hydrogen carbonate)'), F('Plaster of Paris', 'CaSO₄·½H₂O'), F('Main gas in CNG', 'methane'), F('Main gas in LPG', 'butane'),
    Q('The chemical formula of baking soda is:', ['NaHCO₃', 'Na₂CO₃', 'NaCl', 'CaOCl₂'], 'Sodium hydrogen carbonate.'),
    L('Elements and materials', '- Air: **nitrogen ~78%**, oxygen ~21%.\n- Most abundant element in Earth’s crust: **oxygen**; most abundant metal: **aluminium**.\n- Liquid metal: **mercury**. Liquid non-metal: **bromine**.\n- Diamond and graphite are both carbon; **graphite conducts electricity**; diamond is the hardest natural substance.\n- **Galvanisation** = coating iron with zinc to stop rusting. Rusting needs oxygen + water.'),
    F('Most abundant gas in air', 'nitrogen (~78%)'), F('Most abundant metal in Earth’s crust', 'aluminium'), F('Galvanisation coats iron with', 'zinc'),
    Q('Which non-metal is liquid at room temperature?', ['bromine', 'mercury', 'iodine', 'chlorine'], 'Mercury is the liquid metal.'),
    Q('Which form of carbon conducts electricity?', ['graphite', 'diamond', 'charcoal', 'coal'], 'Free electrons between layers.')
  ]);

  G.add('g_bio', [
    L('Cells and blood', '- **Mitochondria** — powerhouse of the cell. **Ribosomes** — make proteins. Nucleus — control centre.\n- RBC carry oxygen (haemoglobin). WBC fight infection. Platelets clot blood.\n- Universal donor **O negative**; universal recipient **AB positive**.\n- Adult human: **206 bones**. Largest organ: skin. Largest gland: **liver**. Smallest bone: **stapes** (ear).'),
    F('Powerhouse of the cell', 'mitochondria'), F('Universal blood donor', 'O negative'), F('Universal recipient', 'AB positive'),
    F('Bones in an adult human', '206'), F('Largest gland', 'liver'), F('Smallest bone', 'stapes (in the ear)'),
    Q('The largest gland in the human body is the:', ['liver', 'pancreas', 'thyroid', 'pituitary'], 'Liver.'),
    L('Vitamins and diseases', '- Vitamin **A** — night blindness · **B1** — beriberi · **C** — scurvy · **D** — rickets · **K** — needed for blood clotting.\n- **Bacterial**: TB, cholera, typhoid, tetanus.\n- **Viral**: polio, measles, rabies, dengue, AIDS, COVID-19.\n- **Malaria** — Plasmodium (protozoan), spread by the female **Anopheles** mosquito. **Dengue** — virus, spread by **Aedes**.\n- Insulin is made by the **pancreas**. Iodine deficiency → **goitre** (thyroid).'),
    F('Vitamin C deficiency', 'scurvy'), F('Vitamin D deficiency', 'rickets'), F('Vitamin A deficiency', 'night blindness'),
    F('Malaria is spread by', 'female Anopheles mosquito (Plasmodium parasite)'), F('Dengue is spread by', 'Aedes mosquito (virus)'),
    Q('Scurvy is caused by deficiency of:', ['Vitamin C', 'Vitamin A', 'Vitamin D', 'Vitamin K'], 'Bleeding gums.'),
    Q('Which disease is caused by a virus?', ['Polio', 'Tuberculosis', 'Cholera', 'Typhoid'], 'TB, cholera and typhoid are bacterial.'),
    Q('Insulin is secreted by the:', ['pancreas', 'liver', 'thyroid', 'kidney'], 'Islets of Langerhans.'),
    L('Plants and discoveries', '- **Photosynthesis**: CO₂ + water + sunlight → glucose + O₂, using chlorophyll.\n- **Penicillin** — Alexander Fleming (1928).\n- First vaccine (smallpox) — **Edward Jenner**.\n- Blood circulation — William Harvey.'),
    F('Discovered penicillin', 'Alexander Fleming'), F('Smallpox vaccine', 'Edward Jenner'),
    Q('Gas released during photosynthesis:', ['oxygen', 'carbon dioxide', 'nitrogen', 'hydrogen'], 'Plants take in CO₂ and release O₂.')
  ]);

  // ───────────────────────────────────────────── Economy (PSI 7 · CDS 6)
  G.add('g_econ', [
    L('RBI and money', '- **RBI** set up **1 April 1935**, nationalised 1949, HQ Mumbai.\n- **Repo rate** = rate at which RBI lends to banks. Raising it fights inflation.\n- Inflation target: **CPI 4% ± 2%** (Monetary Policy Committee).\n- 14 major banks nationalised in **1969**.\n- **UPI** — run by NPCI, launched 2016.'),
    F('RBI established', '1 April 1935'), F('Repo rate', 'rate at which RBI lends to commercial banks'), F('RBI inflation target', 'CPI 4% (± 2%)'),
    Q('The rate at which RBI lends short-term money to banks is the:', ['repo rate', 'reverse repo rate', 'bank rate', 'CRR'], 'Repo = repurchase agreement.'),
    L('Planning, tax, budget', '- **NITI Aayog** replaced the Planning Commission on **1 Jan 2015**; the PM is chairperson.\n- **GST** launched **1 July 2017** (101st Amendment).\n- The Union Budget is the "Annual Financial Statement" — **Art 112**.\n- Direct tax: income tax. Indirect tax: GST.\n- Services (tertiary sector) contribute the largest share of India’s GDP.'),
    F('NITI Aayog formed', '1 January 2015 (replaced Planning Commission)'), F('GST launched', '1 July 2017'), F('Budget = "Annual Financial Statement"', 'Article 112'),
    Q('GST was introduced in India on:', ['1 July 2017', '1 April 2017', '1 January 2016', '8 November 2016'], '101st Constitutional Amendment.'),
    Q('Which sector contributes most to India’s GDP?', ['services', 'agriculture', 'manufacturing', 'mining'], 'Tertiary sector.'),
    L('Revolutions and schemes', '- **Green Revolution** — M. S. Swaminathan (wheat, rice).\n- **White Revolution / Operation Flood** — **Verghese Kurien**, Amul, **Anand (Gujarat)**. National Milk Day = 26 Nov.\n- **MGNREGA (2005)** — 100 days of guaranteed wage work for rural households.\n- **PM Jan Dhan Yojana (2014)** — bank accounts for all.'),
    F('Father of the White Revolution', 'Verghese Kurien (Amul, Anand)'), F('MGNREGA guarantees', '100 days of wage employment a year'),
    Q('Operation Flood is associated with:', ['milk production', 'flood control', 'irrigation', 'fisheries'], 'White Revolution, Verghese Kurien.')
  ]);

  G.add('g_env', [
    L('Climate and the ozone', '- Ozone is destroyed by **CFCs** → **Montreal Protocol (1987)**.\n- Greenhouse gases: CO₂, methane, nitrous oxide, water vapour.\n- **Kyoto Protocol 1997**; **Paris Agreement 2015** (keep warming well below 2 °C).'),
    F('Treaty to protect the ozone layer', 'Montreal Protocol, 1987'), F('Paris climate agreement', '2015'),
    Q('The Montreal Protocol deals with:', ['ozone-depleting substances', 'wetlands', 'biodiversity', 'nuclear weapons'], 'CFCs etc.'),
    L('Wildlife and law', '- India has **4 biodiversity hotspots**: Himalaya, Western Ghats–Sri Lanka, Indo-Burma, Sundaland (Nicobar).\n- **Project Tiger 1973**; Project Elephant 1992. **Asiatic lions — only in Gir**, Gujarat.\n- Wildlife (Protection) Act **1972**; Environment (Protection) Act **1986** (after the Bhopal gas tragedy, 1984).\n- **National Green Tribunal** — 2010.\n- **Ramsar Convention (1971)** — wetlands. Gujarat Ramsar sites include **Nalsarovar, Thol, Wadhvana, Khijadiya**.\n- **Chipko movement** (1973, Uttarakhand) — hugging trees. **Narmada Bachao Andolan** — Medha Patkar.'),
    F('Only home of the Asiatic lion', 'Gir forest, Gujarat'), F('Project Tiger launched', '1973'), F('Ramsar Convention is about', 'wetlands (1971)'),
    F('Environment (Protection) Act', '1986, after the Bhopal gas tragedy'), F('Chipko movement', '1973, Uttarakhand — hugging trees'),
    Q('Which of these is a Ramsar site in Gujarat?', ['Nalsarovar', 'Chilika', 'Sambhar', 'Loktak'], 'Chilika (Odisha), Sambhar (Rajasthan), Loktak (Manipur).'),
    Q('The Chipko movement was about:', ['protecting trees', 'dam construction', 'water rights', 'tribal land'], 'Villagers hugged trees to stop felling.'),
    L('Ecology basics', '- Food chain: producers (plants) → herbivores → carnivores.\n- Only about **10%** of energy passes to the next level (Lindeman’s 10% law).\n- Decomposers (bacteria, fungi) return nutrients to soil.'),
    F('Energy passed to the next trophic level', 'about 10%')
  ]);

  G.add('g_tech', [
    L('Space', '- **ISRO** founded **1969**, HQ Bengaluru. Father of the space programme: **Vikram Sarabhai** (from Ahmedabad; PRL and SAC are in Ahmedabad).\n- First satellite **Aryabhata, 1975**.\n- **Chandrayaan-1 (2008)** found water on the Moon.\n- **Mangalyaan (2013)** reached Mars orbit in 2014 — first try.\n- **Chandrayaan-3** landed near the lunar south pole on **23 Aug 2023** → National Space Day.\n- **Aditya-L1 (2023)** — solar observatory at the L1 point.\n- **Gaganyaan** — India’s human spaceflight programme.'),
    F('Father of the Indian space programme', 'Vikram Sarabhai'), F('India’s first satellite', 'Aryabhata, 1975'), F('Chandrayaan-3 landing date', '23 August 2023 (National Space Day)'),
    Q('India’s first satellite was:', ['Aryabhata', 'Bhaskara', 'Rohini', 'INSAT-1A'], 'Launched 1975 on a Soviet rocket.'),
    Q('Aditya-L1 is a mission to study the:', ['Sun', 'Moon', 'Mars', 'Venus'], 'Placed at Lagrange point L1.'),
    L('Defence tech and nuclear', '- **DRDO** — 1958. **APJ Abdul Kalam** — "Missile Man".\n- **Agni** — ballistic; **BrahMos** — supersonic cruise (with Russia); **Akash** — surface-to-air; **Nag** — anti-tank.\n- Nuclear tests at **Pokhran**: 1974 ("Smiling Buddha") and 1998 ("Operation Shakti").\n- **Kakrapar** atomic power station is in Gujarat (Tapi district).'),
    F('BrahMos is a', 'supersonic cruise missile (India–Russia)'), F('Pokhran nuclear tests', '1974 and 1998'),
    Q('Which missile is a supersonic cruise missile?', ['BrahMos', 'Agni', 'Prithvi', 'Nag'], 'Named after the Brahmaputra and Moskva rivers.')
  ]);

  G.add('g_defence', [
    L('Academies (CDS entries)', '- **IMA** — Dehradun (1932)\n- **INA** — Ezhimala, Kerala\n- **AFA** — Dundigal, Hyderabad\n- **OTA** — Chennai (also Gaya)\n- NDA — Khadakwasla, Pune\nYour B.E. makes you eligible for **INA and AFA**, not just IMA/OTA — shallower pools.'),
    F('Indian Military Academy', 'Dehradun'), F('Indian Naval Academy', 'Ezhimala, Kerala'), F('Air Force Academy', 'Dundigal, Hyderabad'), F('Officers Training Academy', 'Chennai (and Gaya)'),
    Q('The Indian Naval Academy is at:', ['Ezhimala', 'Visakhapatnam', 'Kochi', 'Goa'], 'Kerala.'),
    L('Ranks, days, firsts', '- Army ranks: Lieutenant → Captain → Major → Lt Colonel → Colonel → Brigadier → Major General → Lt General → General.\n- First Field Marshal: **Sam Manekshaw** (1973); also K. M. Cariappa. Marshal of the Air Force: **Arjan Singh**.\n- First Chief of Defence Staff: **Gen Bipin Rawat** (1 Jan 2020).\n- **Army Day 15 Jan** · **Air Force Day 8 Oct** · **Navy Day 4 Dec** · **Kargil Vijay Diwas 26 July** · **Armed Forces Flag Day 7 Dec**.'),
    F('Army Day', '15 January'), F('Navy Day', '4 December'), F('Air Force Day', '8 October'), F('Kargil Vijay Diwas', '26 July'),
    F('First Field Marshal of India', 'Sam Manekshaw'), F('First Chief of Defence Staff', 'Gen Bipin Rawat (2020)'),
    Q('Navy Day is celebrated on 4 December to mark:', ['Operation Trident, 1971', 'the founding of INA', 'Kargil victory', 'INS Vikrant’s launch'], 'Attack on Karachi harbour in 1971.'),
    Q('Who was India’s first Chief of Defence Staff?', ['Gen Bipin Rawat', 'Gen M. M. Naravane', 'Gen Anil Chauhan', 'Field Marshal Manekshaw'], 'Took office 1 Jan 2020.'),
    L('Gallantry awards and exercises', '- Wartime: **Param Vir Chakra** (highest) → Maha Vir Chakra → Vir Chakra. First PVC: **Major Somnath Sharma** (1947).\n- Peacetime: **Ashoka Chakra** (highest) → Kirti Chakra → Shaurya Chakra.\n- Exercises: **Yudh Abhyas** (USA, army) · **Malabar** (naval: India, USA, Japan, Australia) · **Varuna** (France, navy) · **Garuda** (France, air force) · **Indra** (Russia) · **Mitra Shakti** (Sri Lanka) · **Surya Kiran** (Nepal).\n- **INS Vikrant** — first indigenous aircraft carrier, commissioned Sept 2022.'),
    F('Highest wartime gallantry award', 'Param Vir Chakra'), F('Highest peacetime gallantry award', 'Ashoka Chakra'),
    F('Exercise Yudh Abhyas', 'India–USA (army)'), F('Exercise Varuna', 'India–France (navy)'), F('Exercise Malabar', 'India, USA, Japan, Australia (navy)'),
    Q('The first Param Vir Chakra was awarded to:', ['Major Somnath Sharma', 'Captain Vikram Batra', 'Abdul Hamid', 'Sam Manekshaw'], '1947, Kashmir.'),
    Q('INS Vikrant is:', ['India’s first indigenous aircraft carrier', 'a submarine', 'a missile', 'a frigate from Russia'], 'Commissioned 2022.')
  ]);

  G.add('g_static', [
    L('National symbols', '- Animal: **tiger** · Bird: **peacock** · Flower: **lotus** · Tree: **banyan** · Aquatic animal: **Ganges river dolphin** · Heritage animal: **elephant**\n- Anthem **Jana Gana Mana** (Tagore; 52 seconds; adopted 24 Jan 1950). Song **Vande Mataram** (Bankim Chandra, from Anandamath).\n- Emblem from the **Lion Capital of Sarnath**; motto **Satyameva Jayate** (Mundaka Upanishad).\n- Flag ratio **3 : 2**, Ashoka Chakra with **24 spokes**; designed by Pingali Venkayya.'),
    F('National aquatic animal', 'Ganges river dolphin'), F('Duration of the national anthem', '52 seconds'), F('"Satyameva Jayate" is from', 'Mundaka Upanishad'), F('Spokes in the Ashoka Chakra', '24'),
    Q('The national motto "Satyameva Jayate" is taken from:', ['Mundaka Upanishad', 'Rigveda', 'Bhagavad Gita', 'Arthashastra'], 'Mundaka Upanishad.'),
    L('Firsts', '- First President: **Rajendra Prasad** · First PM: **Jawaharlal Nehru**\n- First woman PM: **Indira Gandhi** · First woman President: **Pratibha Patil**\n- First Indian Nobel: **Rabindranath Tagore, 1913** (Gitanjali)\n- First Governor-General of free India: Lord Mountbatten. First Indian Governor-General: **C. Rajagopalachari**.'),
    F('First Indian Governor-General', 'C. Rajagopalachari'), F('First Indian Nobel laureate', 'Rabindranath Tagore, 1913'), F('First woman President of India', 'Pratibha Patil'),
    Q('The first Indian Governor-General of India was:', ['C. Rajagopalachari', 'Lord Mountbatten', 'Rajendra Prasad', 'Sardar Patel'], 'Mountbatten was the first Governor-General of free India; Rajaji the first Indian.'),
    L('Organisations', '- UN — founded **24 Oct 1945**, HQ **New York** · WHO — **Geneva** · UNESCO — **Paris** · IMF and World Bank — **Washington DC** · WTO — Geneva (1995) · ICJ — **The Hague** · SAARC — Kathmandu (1985) · ASEAN — Jakarta.'),
    F('HQ of UNESCO', 'Paris'), F('HQ of WHO', 'Geneva'), F('International Court of Justice sits at', 'The Hague'), F('UN Day', '24 October'),
    Q('The headquarters of the International Court of Justice is in:', ['The Hague', 'Geneva', 'New York', 'Paris'], 'Netherlands.'),
    L('Sports', '- Players per side: cricket / football / hockey **11** · kabaddi **7** · volleyball **6** · basketball **5**.\n- **Durand Cup** — football, oldest in Asia. **Santosh Trophy** — national football championship. **Ranji Trophy** — cricket.\n- **National Sports Day — 29 Aug** (Major Dhyan Chand). Khel Ratna is now the Major Dhyan Chand Khel Ratna (2021).'),
    F('Durand Cup', 'football (oldest tournament in Asia)'), F('Santosh Trophy', 'national football championship'), F('National Sports Day', '29 August — Major Dhyan Chand'),
    Q('The Santosh Trophy is associated with:', ['football', 'cricket', 'hockey', 'kabaddi'], 'National football championship for states.'),
    L('Important days', '- 12 Jan National Youth Day (Vivekananda) · 25 Jan National Voters’ Day · 28 Feb National Science Day (Raman effect)\n- 1 May Gujarat Day · 5 June World Environment Day · 21 June International Yoga Day\n- 5 Sept Teachers’ Day (Radhakrishnan) · 2 Oct Gandhi Jayanti / International Day of Non-Violence\n- **21 Oct Police Commemoration Day** (Hot Springs, Ladakh, 1959) · 31 Oct National Unity Day · 14 Nov Children’s Day · 26 Nov Constitution Day'),
    F('Police Commemoration Day', '21 October (Hot Springs, 1959)'), F('National Science Day', '28 February (Raman effect)'),
    F('Gujarat Day', '1 May'), F('Constitution Day', '26 November'), F('National Youth Day', '12 January (Swami Vivekananda)'),
    Q('Police Commemoration Day is observed on:', ['21 October', '31 October', '26 November', '15 January'], 'Remembers the CRPF men killed at Hot Springs in 1959.'),
    L('Books', '- The Discovery of India — Nehru · My Experiments with Truth (originally Gujarati **સત્યના પ્રયોગો**) — Gandhi\n- Wings of Fire — APJ Abdul Kalam · Gitanjali — Tagore · Anandamath — Bankim Chandra\n- Saraswatichandra — Govardhanram Tripathi (Gujarati)'),
    F('"Satya na Prayogo" (My Experiments with Truth)', 'Mahatma Gandhi — written in Gujarati'), F('"Wings of Fire"', 'APJ Abdul Kalam'),
    Q('"Anandamath", which contains Vande Mataram, was written by:', ['Bankim Chandra Chattopadhyay', 'Rabindranath Tagore', 'Sarojini Naidu', 'Aurobindo Ghosh'], '1882 novel.')
  ]);

  G.add('g_current', [
    L('Current affairs is a system, not a topic', 'Facts change every month, so no app can hold them for you. What works:\n- **Daily, 10–15 min**: one newspaper (Gujarati is fine — Gujarat Samachar / Divya Bhaskar) or one CA app/video. Good for the metro.\n- **Monthly**: one compilation PDF, revised twice.\n- Cover the **last 12–15 months** before the exam date.\nLog it under **Me → Outside study → Current affairs** — it counts toward your streak and your projection.'),
    L('What actually gets asked', '- Government schemes (central + Gujarat)\n- Appointments (new chiefs, governors, heads of bodies)\n- Awards (Padma, Nobel, Bharat Ratna, sports awards)\n- Sports results and venues\n- Defence exercises and new equipment\n- Summits and the host country/city\n- Reports and indices (who publishes, India’s rank)\n- **Gujarat-specific**: state schemes, events, new districts, budgets\nKeep one notebook page per category; write one line per fact.'),
    F('How many months of current affairs to cover?', 'the last 12–15 months before the exam'),
    F('Daily current-affairs budget', '10–15 minutes — log it so it counts')
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
