/**
 * Gujarat-only — PSI Part B. History & culture, geography & economy,
 * public administration & police. Gujarati terms included where the paper uses them.
 * Correct option first; the UI shuffles.
 */
(function (root) {
  'use strict';
  var G = root.GOAL, L = G.L, Q = G.Q, F = G.F;

  G.add('p_guj_hist', [
    L('Ancient Gujarat', '- Harappan sites: **Lothal** (dockyard, Bhogavo river, Ahmedabad dist.), **Dholavira** (Khadir bet, Kutch — UNESCO 2021), Rangpur, Surkotada.\n- Mauryan: **Ashoka’s rock edicts at Girnar**, Junagadh. **Sudarshan lake** was built under Chandragupta Maurya (governor Pushyagupta) and repaired by **Rudradaman** — his Junagadh inscription (~150 CE) is the first long Sanskrit inscription.\n- **Maitraka** dynasty — capital **Valabhi**, famous for Valabhi university.'),
    F('Who repaired the Sudarshan lake (Junagadh inscription)?', 'Rudradaman I'), F('Capital of the Maitrakas', 'Valabhi (વલભી)'), F('Ashoka’s edicts in Gujarat', 'Girnar, Junagadh'),
    Q('The Junagadh rock inscription of Rudradaman mentions the repair of:', ['Sudarshan lake', 'Rani ki Vav', 'Sahasralinga lake', 'Kankaria lake'], 'The first long inscription in Sanskrit.'),
    Q('Valabhi was the capital of which dynasty?', ['Maitraka', 'Solanki', 'Vaghela', 'Chavda'], 'Maitrakas ruled from Valabhi (Saurashtra).'),
    L('Solankis to the Sultanate', '- **Solanki (Chaulukya)** dynasty — capital **Anhilwad Patan**; founder **Mularaja** (942 CE).\n- **Rani ki Vav**, Patan — built by **Queen Udayamati** in memory of Bhimdev I; UNESCO site **2014**; on the ₹100 note.\n- **Modhera Sun Temple** — built under **Bhimdev I** (1026–27).\n- **Siddhraj Jaysinh** — Sahasralinga lake; patron of the Jain scholar **Hemchandracharya**.\n- **Vaghela** — last Hindu dynasty; **Karna Vaghela** lost to Alauddin Khilji’s army (1299).\n- **Ahmed Shah I** founded **Ahmedabad in 1411** on the Sabarmati. **Mahmud Begada** — Champaner. **Champaner–Pavagadh** — UNESCO 2004.\n- **Akbar** conquered Gujarat in 1572–73; Buland Darwaza (Fatehpur Sikri) marks it.'),
    F('Rani ki Vav was built by', 'Queen Udayamati (Solanki), Patan'), F('Rani ki Vav — UNESCO year', '2014'),
    F('Modhera Sun Temple — built under', 'Bhimdev I (Solanki), 1026–27'), F('Founder of Ahmedabad', 'Ahmed Shah I, 1411'),
    F('Last Hindu ruler of Gujarat (Vaghela)', 'Karna Vaghela'), F('Champaner–Pavagadh — UNESCO year', '2004'),
    Q('Rani ki Vav is located in:', ['Patan', 'Modhera', 'Ahmedabad', 'Junagadh'], 'Stepwell on the Saraswati river, Patan.'),
    Q('Ahmedabad was founded by Ahmed Shah I in:', ['1411', '1311', '1511', '1573'], 'On the banks of the Sabarmati.'),
    Q('Hemchandracharya was patronised by:', ['Siddhraj Jaysinh', 'Mahmud Begada', 'Ahmed Shah', 'Mularaja'], 'Solanki king; also Kumarapala later.'),
    Q('The capital of the Solanki dynasty was:', ['Anhilwad Patan', 'Valabhi', 'Champaner', 'Junagadh'], 'Founded by Vanraj Chavda; Solankis ruled from there.'),
    L('British era and freedom struggle in Gujarat', '- First English factory in India at **Surat, 1613**.\n- Gandhi’s first ashram: **Kochrab, 1915**; then **Sabarmati Ashram, 1917**.\n- **Gujarat Vidyapith** founded by Gandhi, **1920**.\n- **Kheda 1918**, **Bardoli 1928** (Sardar Patel), **Dandi 1930**, **Dharasana** salt satyagraha (Sarojini Naidu).\n- **Mahagujarat Andolan (1956–60)** led by **Indulal Yagnik** ("Indu Chacha") → Gujarat formed **1 May 1960**.'),
    F('First English factory in India', 'Surat, 1613'), F('Gandhi’s first ashram in India', 'Kochrab, Ahmedabad (1915)'),
    F('Gujarat Vidyapith founded', '1920, by Mahatma Gandhi'), F('Leader of the Mahagujarat movement', 'Indulal Yagnik'),
    Q('The Mahagujarat movement was led by:', ['Indulal Yagnik', 'Sardar Patel', 'Morarji Desai', 'Ravishankar Maharaj'], 'Indu Chacha.'),
    Q('Gandhi’s first ashram in India was at:', ['Kochrab', 'Sabarmati', 'Wardha', 'Dandi'], 'Kochrab, 1915; moved to Sabarmati in 1917.'),
    L('Literature — names the paper loves', '- **Narsinh Mehta** — "Adi Kavi" of Gujarati; "Vaishnav jan to"\n- **Premanand** — akhyan · **Akho** — chhappa · **Dayaram** — garbi\n- **Narmad** — "Jay Jay Garavi Gujarat"; father of modern Gujarati prose\n- **Govardhanram Tripathi** — Saraswatichandra\n- **Zaverchand Meghani** — "Rashtriya Shayar" (title given by Gandhi)\n- **K. M. Munshi** — founded Bharatiya Vidya Bhavan; Somnath rebuilding\n- Jnanpith winners: **Umashankar Joshi (1967)**, **Pannalal Patel (1985)**, **Rajendra Shah (2001)**, **Raghuveer Chaudhari (2015)**\n- **Mumbai Samachar** (1822) — oldest Gujarati newspaper, one of the oldest in Asia still running.'),
    F('"Adi Kavi" of Gujarati', 'Narsinh Mehta'), F('"Jay Jay Garavi Gujarat"', 'Narmad'), F('"Rashtriya Shayar"', 'Zaverchand Meghani'),
    F('First Gujarati Jnanpith winner', 'Umashankar Joshi (1967)'), F('"Manvi ni Bhavai"', 'Pannalal Patel (Jnanpith 1985)'), F('Saraswatichandra', 'Govardhanram Tripathi'),
    F('Akho is known for', 'chhappa'), F('Premanand is known for', 'akhyan'), F('Dayaram is known for', 'garbi'),
    Q('Who wrote "Vaishnav jan to tene kahiye"?', ['Narsinh Mehta', 'Narmad', 'Dayaram', 'Premanand'], 'Gandhi’s favourite bhajan.'),
    Q('Who was the first Gujarati writer to win the Jnanpith Award?', ['Umashankar Joshi', 'Pannalal Patel', 'Rajendra Shah', 'K. M. Munshi'], '1967 for "Nishith".'),
    Q('The title "Rashtriya Shayar" was given to:', ['Zaverchand Meghani', 'Narmad', 'Kavi Kant', 'Kalapi'], 'Given by Gandhi.'),
    L('Culture, temples, fairs, crafts', '- **Garba** — UNESCO Intangible Cultural Heritage, **2023**.\n- **Somnath** — first of the 12 jyotirlingas; rebuilt after 1947 at Sardar Patel’s initiative, inaugurated by President Rajendra Prasad (1951).\n- **Dwarka** (Dwarkadhish) · **Ambaji** (Shakti peeth, Banaskantha) · **Palitana** (Shatrunjaya hills, Jain temples, Bhavnagar) · Shamlaji.\n- Fairs: **Tarnetar** (Surendranagar) · **Bhavnath** (Junagadh, Mahashivratri) · **Vautha** (Ahmedabad dist.) · Rann Utsav (Kutch) · Uttarayan kite festival, 14 Jan.\n- Crafts: **Patola** — Patan (double ikat) · **Bandhani** — Kutch / Jamnagar · **Rogan art** — Nirona, Kutch.\n- Ahmedabad — India’s **first UNESCO World Heritage City (2017)**.'),
    F('Garba — UNESCO intangible heritage year', '2023'), F('Patola (double ikat) silk', 'Patan'), F('Rogan art', 'Nirona village, Kutch'),
    F('Tarnetar fair', 'Surendranagar (Trinetreshwar temple)'), F('India’s first World Heritage City', 'Ahmedabad (2017)'), F('Palitana Jain temples are on', 'Shatrunjaya hills, Bhavnagar district'),
    Q('Patola sarees are traditionally made in:', ['Patan', 'Surat', 'Jamnagar', 'Bhuj'], 'Double-ikat weaving.'),
    Q('The Tarnetar fair is held in which district?', ['Surendranagar', 'Junagadh', 'Kutch', 'Amreli'], 'Near the Trinetreshwar temple.'),
    Q('India’s first UNESCO World Heritage City is:', ['Ahmedabad', 'Jaipur', 'Varanasi', 'Delhi'], 'Inscribed in 2017.')
  ]);

  G.add('p_guj_geo', [
    L('Gujarat on the map', '- Formed **1 May 1960**. Neighbours: Rajasthan (N/NE), Madhya Pradesh (E), Maharashtra (S), the UT of Dadra & Nagar Haveli and Daman & Diu, and **Pakistan (Sindh)** across Kutch. Arabian Sea to the west.\n- **Longest coastline of any state** — traditionally ~**1,600 km**; a 2024 re-measurement put it at ~2,340 km. Exam answer is usually 1,600 km; read the options.\n- Gulfs: **Gulf of Kutch** and **Gulf of Khambhat**.\n- **Kutch** — the largest district in India by area.\n- Highest point: **Girnar** (Gorakhnath peak, ~1,100 m), Junagadh.\n- The Tropic of Cancer passes through **north Gujarat**.'),
    F('Gujarat formed on', '1 May 1960'), F('Largest district of Gujarat (and India)', 'Kutch'), F('Highest peak of Gujarat', 'Girnar — Gorakhnath peak'),
    F('Gujarat’s coastline (traditional exam figure)', '~1,600 km — longest of any state'), F('Two gulfs of Gujarat', 'Gulf of Kutch and Gulf of Khambhat'),
    Q('The highest peak of Gujarat is in:', ['Girnar', 'Saputara', 'Pavagadh', 'Taranga'], 'Gorakhnath peak, Junagadh.'),
    Q('Which country shares a border with Gujarat?', ['Pakistan', 'Nepal', 'Bangladesh', 'China'], 'Along Kutch (Sindh).'),
    L('Rivers and dams', '- **Narmada** — enters from MP, meets the sea in the **Gulf of Khambhat near Bharuch**. **Sardar Sarovar Dam** at Kevadia (Ekta Nagar).\n- **Tapi** — Surat; **Ukai dam**. Kakrapar weir.\n- **Mahi** — crosses the **Tropic of Cancer twice**; joins the Gulf of Khambhat.\n- **Sabarmati** — rises in the Aravallis (Rajasthan); Ahmedabad and Gandhinagar on its banks.\n- **Banas, Saraswati, Rupen** — end in the **Little Rann** (inland drainage).\n- **Bhadar** — longest river of Saurashtra; Saurashtra rivers flow **radially**.'),
    F('River that crosses the Tropic of Cancer twice', 'Mahi'), F('Longest river of Saurashtra', 'Bhadar'), F('Ukai dam is on', 'Tapi'),
    F('Rivers ending in the Little Rann', 'Banas, Saraswati, Rupen'),
    Q('Which river crosses the Tropic of Cancer twice?', ['Mahi', 'Narmada', 'Tapi', 'Sabarmati'], 'It loops through MP, Rajasthan and Gujarat.'),
    Q('The longest river of Saurashtra is:', ['Bhadar', 'Shetrunji', 'Machhu', 'Ozat'], 'Bhadar.'),
    Q('Ukai dam is built on the river:', ['Tapi', 'Narmada', 'Mahi', 'Sabarmati'], 'Tapi district / Surat.'),
    L('Parks and sanctuaries', '- **Gir** — only home of the **Asiatic lion** (Junagadh, Gir Somnath, Amreli). The 2025 count reported **891** lions.\n- **Velavadar** — blackbuck national park (Bhavnagar).\n- **Marine National Park**, Gulf of Kutch (Jamnagar) — India’s first marine national park.\n- **Vansda** national park — Navsari.\n- **Little Rann** — Wild Ass (ઘુડખર) sanctuary. **Great Rann** — white salt desert, "Flamingo City".\n- **Nalsarovar** — bird sanctuary, Ramsar site.'),
    F('Velavadar national park is famous for', 'blackbuck'), F('Little Rann of Kutch sanctuary is for', 'Indian wild ass (ઘુડખર)'),
    F('India’s first marine national park', 'Gulf of Kutch, Jamnagar'), F('Gujarat state animal', 'Asiatic lion'), F('Gujarat state bird', 'Greater flamingo'),
    Q('The Wild Ass Sanctuary is in the:', ['Little Rann of Kutch', 'Great Rann of Kutch', 'Gir forest', 'Velavadar'], 'Ghudkhar (Indian wild ass).'),
    Q('Velavadar National Park is known for:', ['blackbuck', 'Asiatic lion', 'flamingo', 'wild ass'], 'Bhavnagar district.'),
    L('Economy and ports', '- **Deendayal Port (Kandla)** — Gujarat’s major (central) port; Asia’s first Export Processing Zone, 1965.\n- **Mundra** — India’s largest private port. Others: Pipavav, Hazira, Dahej.\n- **Alang** (Bhavnagar) — one of the world’s largest ship-breaking yards.\n- **Surat** — diamond cutting and polishing hub; also textiles.\n- **Jamnagar** — Reliance refinery, the world’s largest refining complex.\n- **Amul** — Anand, 1946 (Tribhuvandas Patel, Verghese Kurien).\n- **GIFT City**, Gandhinagar — India’s first International Financial Services Centre (IFSC).\n- Gujarat produces the largest share of India’s **salt**.'),
    F('Asia’s first Export Processing Zone', 'Kandla, 1965'), F('Ship-breaking yard', 'Alang, Bhavnagar'),
    F('India’s first IFSC', 'GIFT City, Gandhinagar'), F('Diamond-polishing hub', 'Surat'), F('Amul is headquartered at', 'Anand'),
    Q('Alang is famous for:', ['ship-breaking', 'diamond polishing', 'salt pans', 'oil refining'], 'Bhavnagar district.'),
    Q('India’s largest private port is:', ['Mundra', 'Kandla', 'Hazira', 'Pipavav'], 'Kutch.'),
    Q('GIFT City is located near:', ['Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'], 'India’s first IFSC.')
  ]);

  G.add('p_admin', [
    L('Gujarat — government basics', '- First Chief Minister: **Dr Jivraj Mehta**. First Governor: **Mehdi Nawaz Jung**.\n- Capital moved from Ahmedabad to **Gandhinagar** in **1970**.\n- **Vidhan Sabha: 182 seats** (unicameral — no Vidhan Parishad).\n- Lok Sabha seats: **26**. Rajya Sabha seats: **11**.\n- **Gujarat High Court**, Ahmedabad — from 1 May 1960.\n- Districts: **33** for years; **Vav-Tharad** (from Banaskantha) was announced as the 34th in 2025 — check the current count before the exam.'),
    F('First CM of Gujarat', 'Dr Jivraj Mehta'), F('First Governor of Gujarat', 'Mehdi Nawaz Jung'), F('Seats in the Gujarat Vidhan Sabha', '182'),
    F('Gujarat Lok Sabha seats', '26'), F('Gujarat Rajya Sabha seats', '11'), F('2nd CM of Gujarat (three-tier panchayat committee)', 'Balwantrai Mehta'),
    Q('How many seats does the Gujarat Legislative Assembly have?', ['182', '188', '175', '160'], 'Unicameral, 182 seats.'),
    Q('The first Chief Minister of Gujarat was:', ['Dr Jivraj Mehta', 'Balwantrai Mehta', 'Hitendra Desai', 'Morarji Desai'], '1960–63.'),
    L('District and village administration', '- **District**: Collector (revenue, law and order, elections) · **DDO** (District Development Officer) heads the district panchayat administration · **SP** heads district police.\n- **Taluka**: **Mamlatdar** (revenue) · **TDO** (Taluka Development Officer).\n- **Village**: **Sarpanch** (elected head) · **Talati-cum-mantri** (revenue records, panchayat secretary).\n- Panchayat tiers: Gram → Taluka → Jilla panchayat.\n- **GPSC** — Art 315. **State Election Commission** — Art 243K. **Gujarat Lokayukta** — anti-corruption ombudsman.'),
    F('Head of taluka revenue administration', 'Mamlatdar (મામલતદાર)'), F('Village revenue official', 'Talati-cum-mantri (તલાટી-કમ-મંત્રી)'),
    F('Head of district panchayat administration', 'DDO — District Development Officer'), F('State Election Commission — Article', '243K'),
    Q('The head of revenue administration at the taluka level is the:', ['Mamlatdar', 'Collector', 'DDO', 'Sarpanch'], 'Collector is district level.'),
    Q('Who keeps the village land records in Gujarat?', ['Talati-cum-mantri', 'Sarpanch', 'Mamlatdar', 'Police Patel'], 'Talati maintains 7/12 and 8-A records.'),
    L('Police — structure you will be part of', 'Ranks top to bottom:\n**DGP → ADGP → IGP → DIG → SP / DCP → DySP / ACP → PI → PSI → ASI → Head Constable → Constable (Lokrakshak)**\n- Big cities (Ahmedabad, Surat, Vadodara, Rajkot…) use the **Police Commissionerate** system.\n- Gujarat Police motto: **"Seva, Suraksha, Shanti"**.\n- **Gujarat Police Act, 1951** governs the force.\n- Training: Gujarat Police Academy, **Karai** (Gandhinagar). **Rashtriya Raksha University** and **National Forensic Sciences University** — both Gandhinagar.'),
    F('Rank just above PSI', 'PI — Police Inspector'), F('Rank just below PSI', 'ASI — Assistant Sub-Inspector'), F('Gujarat Police motto', 'Seva, Suraksha, Shanti'),
    F('Gujarat Police Academy', 'Karai, Gandhinagar'), F('Act governing Gujarat Police', 'Gujarat Police Act, 1951'),
    Q('Which rank is directly above Police Sub-Inspector?', ['Police Inspector', 'Deputy SP', 'Assistant Sub-Inspector', 'Head Constable'], 'PSI → PI → DySP.'),
    Q('The Gujarat Police Academy is located at:', ['Karai', 'Vadodara', 'Junagadh', 'Rajkot'], 'Near Gandhinagar.'),
    L('New criminal laws (from 1 July 2024)', '- **Bharatiya Nyaya Sanhita (BNS)** replaced the **IPC (1860)** — offences and punishments.\n- **Bharatiya Nagarik Suraksha Sanhita (BNSS)** replaced the **CrPC (1973)** — procedure: FIR, arrest, bail, trial.\n- **Bharatiya Sakshya Adhiniyam (BSA)** replaced the **Indian Evidence Act (1872)**.\n- **Zero FIR** — an FIR can be lodged at any police station, regardless of where the crime happened; e-FIR is allowed.\n- **Cognizable** offence (પોલીસ અધિકારનો ગુનો) — police can arrest without a warrant. Non-cognizable — needs a magistrate’s order.'),
    F('BNS replaced', 'Indian Penal Code, 1860'), F('BNSS replaced', 'Code of Criminal Procedure, 1973'), F('BSA replaced', 'Indian Evidence Act, 1872'),
    F('New criminal laws in force from', '1 July 2024'), F('Zero FIR', 'FIR at any police station regardless of jurisdiction'),
    F('Cognizable offence', 'police may arrest without a warrant — પોલીસ અધિકારનો ગુનો'),
    Q('The Bharatiya Sakshya Adhiniyam replaced the:', ['Indian Evidence Act', 'Indian Penal Code', 'CrPC', 'Police Act'], 'Evidence law.'),
    Q('In a cognizable offence, the police:', ['can arrest without a warrant', 'need a magistrate’s order to investigate', 'cannot register an FIR', 'must wait 24 hours'], 'That is the defining feature.'),
    L('Citizen-facing laws', '- **RTI Act 2005** — reply within **30 days**; **48 hours** if life or liberty is involved.\n- **Lokpal and Lokayuktas Act 2013**.\n- Helplines: **112** (single emergency) · **1930** (cyber fraud) · **181** (Abhayam, women, Gujarat) · **1098** (children).'),
    F('RTI reply deadline', '30 days (48 hours for life/liberty)'), F('Cyber fraud helpline', '1930'), F('Gujarat women’s helpline (Abhayam)', '181'), F('Child helpline', '1098'),
    Q('Under the RTI Act, information concerning life or liberty must be supplied within:', ['48 hours', '30 days', '7 days', '24 hours'], 'Normal limit is 30 days.')
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
