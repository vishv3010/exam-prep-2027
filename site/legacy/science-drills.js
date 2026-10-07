/**
 * GOAL OS Academic Repertoire: General Science (NCERT Class 9-10)
 * High-yield syllabus coverage for UPSC CDS General Knowledge & Gujarat PSI General Studies.
 */
(function(root) {
  'use strict';

  var SCIENCE_QUESTIONS = [
    {
      id: "sci_phy_01",
      subject: "general_studies",
      topic: "physics_mechanics",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "A passenger in a moving bus is thrown forward when the bus suddenly applies brakes. Which principle explains this phenomenon?",
      question_gu: "દોડતી બસમાં બેઠેલો મુસાફર જ્યારે બસ અચાનક બ્રેક મારે ત્યારે આગળ તરફ ધકેલાય છે. કયો સિદ્ધાંત આ ઘટનાને સમજાવે છે?",
      options_en: [
        "Inertia of motion (Newton's First Law)",
        "Newton's Second Law of Motion",
        "Newton's Third Law of Motion",
        "Law of Conservation of Momentum",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ગતિનું જડત્વ (ન્યૂટનનો ગતિનો પ્રથમ નિયમ)",
        "ન્યૂટનનો ગતિનો બીજો નિયમ",
        "ન્યૂટનનો ગતિનો ત્રીજો નિયમ",
        "વેગમાન સંરક્ષણનો નિયમ",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0,
      explanation_en: "According to Newton's First Law (Inertia of Motion), an object in motion tends to stay in motion with the same speed and in the same direction unless acted upon by an external force. When brakes are applied, the lower body stops with the bus, while the upper body continues moving forward.",
      explanation_gu: "ન્યૂટનના ગતિના પ્રથમ નિયમ (જડત્વનો નિયમ) અનુસાર, ગતિમાન પદાર્થ પોતાની ગતિ ચાલુ રાખવાનો પ્રયત્ન કરે છે. બ્રેક લાગતાં શરીરનો નીચેનો ભાગ સ્થિર થાય છે પરંતુ ઉપરનો ભાગ ગતિના જડત્વને કારણે આગળ નમે છે."
    },
    {
      id: "sci_phy_02",
      subject: "general_studies",
      topic: "physics_gravitation",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Where on the Earth's surface is the acceleration due to gravity (g) maximum?",
      question_gu: "પૃથ્વીની સપાટી પર ગુરુત્વપ્રવેગ (g) નું મૂલ્ય ક્યાં મહત્તમ હોય છે?",
      options_en: [
        "At the Equator",
        "At the Poles",
        "At the Tropic of Cancer",
        "At the Centre of the Earth",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "વિષુવવૃત્ત પર (Equator)",
        "ધ્રુવો પર (Poles)",
        "કર્કવૃત્ત પર",
        "પૃથ્વીના કેન્દ્ર પર",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1, // At the Poles
      explanation_en: "Acceleration due to gravity is g = GM / R^2. Because Earth is an oblate spheroid, the polar radius is about 21 km less than the equatorial radius. Smaller radius means 'g' is maximum at the poles and minimum at the equator. (At Earth's centre, g = 0).",
      explanation_gu: "g = GM / R^૨ સૂત્ર મુજબ ત્રિજ્યા ઘટતાં ગુરુત્વપ્રવેગ વધે છે. પૃથ્વી ધ્રુવો આગળ ચપટી હોવાથી ધ્રુવીય ત્રિજ્યા ઓછી છે, જેથી ધ્રુવો પર 'g' મહત્તમ અને વિષુવવૃત્ત પર લઘુત્તમ હોય છે."
    },
    {
      id: "sci_phy_03",
      subject: "general_studies",
      topic: "physics_optics",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "A convex lens has a focal length of +25 cm. What is its optical power in dioptres (D)?",
      question_gu: "એક બહિર્ગોળ લેન્સની કેન્દ્રલંબાઈ +૨૫ સેમી છે. તો તેની પ્રકાશીય ક્ષમતા (પાવર) ડાયોપ્ટર (D) માં કેટલી થશે?",
      options_en: ["+2.0 D", "+2.5 D", "+4.0 D", "+5.0 D", "Option E: Not Attempted"],
      options_gu: ["+૨.૦ D", "+૨.૫ D", "+૪.૦ D", "+૫.૦ D", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // +4.0 D
      explanation_en: "Power of a lens P = 1 / f (in metres). Here f = 25 cm = 0.25 m. P = 1 / 0.25 = +4.0 Dioptres.",
      explanation_gu: "લેન્સનો પાવર P = ૧ / f (મીટરમાં). f = ૨૫ સેમી = ૦.૨૫ મીટર. પાવર P = ૧ / ૦.૨૫ = +૪.૦ ડાયોપ્ટર (D)."
    },
    {
      id: "sci_phy_04",
      subject: "general_studies",
      topic: "physics_electricity",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Three resistors of 6 ohms each are connected in parallel. What is their equivalent resistance?",
      question_gu: "૬ ઓહ્મના ત્રણ અવરોધોને સમાંતર (Parallel) જોડવામાં આવે તો તેમનો સમતુલ્ય અવરોધ કેટલો થશે?",
      options_en: ["2 ohms", "3 ohms", "6 ohms", "18 ohms", "Option E: Not Attempted"],
      options_gu: ["૨ ઓહ્મ", "૩ ઓહ્મ", "૬ ઓહ્મ", "૧૮ ઓહ્મ", "E. ઉત્તર આપેલ નથી"],
      answer: 0, // 2 ohms
      explanation_en: "In parallel: 1 / R_eq = (1/6) + (1/6) + (1/6) = 3/6 = 1/2 => R_eq = 2 ohms.",
      explanation_gu: "સમાંતર જોડાણ માટે: ૧ / R = ૧/૬ + ૧/૬ + ૧/૬ = ૩/૬ = ૧/૨ => સમતુલ્ય અવરોધ R = ૨ ઓહ્મ."
    },
    {
      id: "sci_phy_05",
      subject: "general_studies",
      topic: "physics_sound",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "In which of the following media does sound travel at the highest speed?",
      question_gu: "નીચેના પૈકી કયા માધ્યમમાં અવાજ (ધ્વનિ) ની ગતિ સૌથી વધુ હોય છે?",
      options_en: ["Air", "Water", "Steel (Solid)", "Vacuum", "Option E: Not Attempted"],
      options_gu: ["હવા (Air)", "પાણી (Water)", "સ્ટીલ / ઘન પદાર્થ (Steel)", "શૂન્યાવકાશ (Vacuum)", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Steel
      explanation_en: "Sound is a mechanical longitudinal wave requiring a medium. It travels fastest in solids (Steel ~5960 m/s), slower in liquids (~1480 m/s in water), slowest in gases (~343 m/s in air), and cannot travel through a vacuum at all.",
      explanation_gu: "ધ્વનિ યાંત્રિક તરંગ હોવાથી માધ્યમ જરૂરી છે. ઘન પદાર્થોમાં અણુઓ અત્યંત નજીક હોવાથી ધ્વનિ સૌથી ઝડપથી ગતિ કરે છે (સ્ટીલમાં ~૫૯૬૦ મી/સે). શૂન્યાવકાશમાં અવાજ પ્રસરતો નથી."
    },
    {
      id: "sci_chem_01",
      subject: "general_studies",
      topic: "chemistry_acids_bases",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "What is the common chemical name and formula of 'Plaster of Paris'?",
      question_gu: "'પ્લાસ્ટર ઓફ પેરિસ' (POP) નું સામાન્ય રાસાયણિક નામ અને સૂત્ર કયું છે?",
      options_en: [
        "Calcium Sulphate Dihydrate (CaSO4.2H2O)",
        "Calcium Sulphate Hemihydrate (CaSO4.1/2H2O)",
        "Calcium Carbonate (CaCO3)",
        "Calcium Oxychloride (CaOCl2)",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "કેલ્શિયમ સલ્ફેટ ડાયહાઈડ્રેટ (CaSO4.2H2O)",
        "કેલ્શિયમ સલ્ફેટ હેમીહાઈડ્રેટ (CaSO4.1/2H2O)",
        "કેલ્શિયમ કાર્બોનેટ (CaCO3)",
        "કેલ્શિયમ ઓક્સીક્લોરાઇડ (CaOCl2)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1, // Hemihydrate
      explanation_en: "Plaster of Paris is Calcium Sulphate Hemihydrate (CaSO4.1/2H2O), produced by heating Gypsum (CaSO4.2H2O) to 373 K (100°C).",
      explanation_gu: "ચિરોડી (Gypsum - CaSO4.2H2O) ને ૩૭૩ K તાપમાને ગરમ કરતાં પ્લાસ્ટર ઓફ પેરિસ (કેલ્શિયમ સલ્ફેટ હેમીહાઈડ્રેટ - CaSO4.1/2H2O) બને છે."
    },
    {
      id: "sci_chem_02",
      subject: "general_studies",
      topic: "chemistry_metals",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Galvanization is a metallurgical method used to protect iron from rusting by coating it with a thin layer of which metal?",
      question_gu: "ગેલ્વેનાઇઝેશન પદ્ધતિમાં લોખંડને કાટ લાગતો અટકાવવા માટે તેના પર કઈ ધાતુનું પાતળું પડ ચડાવવામાં આવે છે?",
      options_en: ["Copper", "Tin", "Zinc", "Aluminium", "Option E: Not Attempted"],
      options_gu: ["તાંબુ (Copper)", "કલાઈ (Tin)", "ઝિંક / જસત (Zinc)", "એલ્યુમિનિયમ (Aluminium)", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Zinc
      explanation_en: "Galvanization coats steel or iron with a thin sacrificial protective layer of Zinc (Zn) to prevent corrosion.",
      explanation_gu: "લોખંડ કે સ્ટીલને વાતાવરણના ભેજ અને ઓક્સિજનથી બચાવી કાટ અટકાવવા તેના પર જસત (ઝિંક - Zn) નું અસ્તર ચડાવવાની પ્રક્રિયાને ગેલ્વેનાઇઝેશન કહે છે."
    },
    {
      id: "sci_chem_03",
      subject: "general_studies",
      topic: "chemistry_reactions",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "In the chemical reaction: CuO + H2 -> Cu + H2O, which substance undergoes reduction?",
      question_gu: "રાસાયણિક પ્રક્રિયા: CuO + H2 -> Cu + H2O માં કયા પદાર્થનું રિડક્શન (Reduction) થાય છે?",
      options_en: ["CuO (Copper Oxide)", "H2 (Hydrogen)", "Cu (Copper)", "H2O (Water)", "Option E: Not Attempted"],
      options_gu: ["CuO (કોપર ઓક્સાઇડ)", "H2 (હાઇડ્રોજન)", "Cu (તાંબુ)", "H2O (પાણી)", "E. ઉત્તર આપેલ નથી"],
      answer: 0, // CuO
      explanation_en: "Reduction is the loss of oxygen or gain of electrons. Here, CuO loses oxygen to become elemental Cu, so CuO is reduced. H2 gains oxygen and is oxidized.",
      explanation_gu: "ઓક્સિજન ગુમાવવાની પ્રક્રિયાને રિડક્શન કહેવાય છે. અહીં CuO ઓક્સિજન ગુમાવીને Cu બને છે, તેથી CuO નું રિડક્શન થાય છે (જ્યારે H2 નું ઓક્સિડેશન થાય છે)."
    },
    {
      id: "sci_chem_04",
      subject: "general_studies",
      topic: "chemistry_carbon",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Why is graphite a good conductor of electricity, unlike diamond, even though both are allotropes of pure carbon?",
      question_gu: "હીરો અને ગ્રેફાઇટ બંને શુદ્ધ કાર્બનના અપરૂપો હોવા છતાં, ગ્રેફાઇટ શા માટે વિદ્યુતનું સુવાહક છે?",
      options_en: [
        "Graphite contains metallic impurities",
        "Graphite has delocalized free electrons due to each carbon atom bonding with only three others",
        "Graphite forms a rigid three-dimensional tetrahedral lattice",
        "Graphite has a lower density than diamond",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "ગ્રેફાઇટમાં ધાતુની અશુદ્ધિઓ હોય છે",
        "ગ્રેફાઇટમાં દરેક કાર્બન અન્ય ૩ કાર્બન સાથે જોડાયેલ હોવાથી એક મુક્ત ઇલેક્ટ્રોન હાજર હોય છે",
        "ગ્રેફાઇટ ત્રિ-પરિમાણીય દ્રઢ ચતુષ્ફલકીય રચના ધરાવે છે",
        "ગ્રેફાઇટની ઘનતા હીરા કરતાં ઓછી હોય છે",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1,
      explanation_en: "In graphite, each carbon atom is covalently bonded to three other carbon atoms in hexagonal layers, leaving one free valence electron per atom that can move freely between layers, conducting electric current.",
      explanation_gu: "ગ્રેફાઇટના ષટ્કોણીય સ્તરોમાં દરેક કાર્બન પરમાણુ અન્ય ત્રણ કાર્બન સાથે જોડાયેલો હોય છે, જેથી ચોથો ઇલેક્ટ્રોન મુક્ત રહીને સ્તરો વચ્ચે વીજવહન કરી શકે છે."
    },
    {
      id: "sci_bio_01",
      subject: "general_studies",
      topic: "biology_tissues",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Which plant vascular tissue is primarily responsible for transporting water and dissolved mineral nutrients from roots upwards to the leaves?",
      question_gu: "વનસ્પતિમાં મૂળમાંથી શોષાયેલ પાણી અને દ્રાવ્ય ખનીજ ક્ષારોનું પાંદડાં સુધી ઊર્ધ્વગમન કરવા માટે કઈ વાહક પેશી જવાબદાર છે?",
      options_en: ["Phloem", "Xylem", "Parenchyma", "Collenchyma", "Option E: Not Attempted"],
      options_gu: ["અન્નવાહક પેશી (Phloem)", "જલવાહક પેશી (Xylem)", "મૃદુતક પેશી (Parenchyma)", "સ્થૂલકોણક પેશી (Collenchyma)", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // Xylem
      explanation_en: "Xylem transports water and minerals unidirectionally from roots to stems and leaves. Phloem transports photosynthetic products (food/sugars) bidirectionally.",
      explanation_gu: "જલવાહક પેશી (Xylem) મૂળથી પ્રકાંડ અને પર્ણો તરફ પાણી અને ક્ષારોનું એકદિશીય વહન કરે છે, જ્યારે અન્નવાહક પેશી (Phloem) ખોરાકનું વહન કરે છે."
    },
    {
      id: "sci_bio_02",
      subject: "general_studies",
      topic: "biology_life_processes",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "What is the primary structural and functional filtration unit of the human kidney?",
      question_gu: "માનવ મૂત્રપિંડ (Kidney) નો મૂળભૂત રચનાત્મક અને ક્રિયાત્મક ગાળણ એકમ કયો છે?",
      options_en: ["Neuron", "Nephron", "Alveolus", "Villi", "Option E: Not Attempted"],
      options_gu: ["ચેતાકોષ (Neuron)", "મૂત્રપિંડ નલિકા / નેફ્રોન (Nephron)", "વાયુકોષ્ઠ (Alveolus)", "રસાંકુરો (Villi)", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // Nephron
      explanation_en: "The nephron is the microscopic filtration unit of the kidney; each human kidney contains approximately 1 to 1.2 million nephrons that filter nitrogenous wastes from blood to form urine.",
      explanation_gu: "નેફ્રોન (મૂત્રપિંડ નલિકા) મૂત્રપિંડનો ગાળણ એકમ છે. દરેક મૂત્રપિંડમાં અંદાજે ૧૦ થી ૧૨ લાખ નેફ્રોન આવેલા હોય છે જે લોહીમાંથી યુરિયા જેવા ઉત્સર્ગ દ્રવ્યો ગાળી મૂત્ર નિર્માણ કરે છે."
    },
    {
      id: "sci_bio_03",
      subject: "general_studies",
      topic: "biology_circulatory",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Which blood vessels carry oxygenated blood from the lungs directly into the left atrium of the human heart?",
      question_gu: "ફેફસાંમાંથી ઓક્સિજનયુક્ત શુદ્ધ રક્તને સીધું માનવ હૃદયના ડાબા કર્ણકમાં લાવતી રક્તવાહિનીઓ કઈ છે?",
      options_en: ["Pulmonary Artery", "Pulmonary Veins", "Aorta", "Vena Cava", "Option E: Not Attempted"],
      options_gu: ["ફુપ્ફુસ ધમની (Pulmonary Artery)", "ફુપ્ફુસ શિરા (Pulmonary Veins)", "મહાધમની (Aorta)", "મહાશિરા (Vena Cava)", "E. ઉત્તર આપેલ નથી"],
      answer: 1, // Pulmonary Veins
      explanation_en: "Unlike normal veins that carry deoxygenated blood, the pulmonary veins are unique because they carry oxygen-rich blood from the lungs to the left atrium of the heart.",
      explanation_gu: "સામાન્ય શિરાઓ અશુદ્ધ રક્ત વહન કરે છે, પરંતુ ફુપ્ફુસ શિરાઓ (Pulmonary Veins) અપવાદરૂપે ફેફસાંમાંથી ઓક્સિજનયુક્ત શુદ્ધ રક્ત હૃદયના ડાબા કર્ણકમાં લાવે છે."
    },
    {
      id: "sci_bio_04",
      subject: "general_studies",
      topic: "biology_endocrine",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Which hormone, known as the 'Emergency Hormone' or 'Fight-or-Flight Hormone', is secreted by the adrenal glands during stress or danger?",
      question_gu: "કટોકટી કે ભયના સમયે એડ્રીનલ ગ્રંથિમાંથી કયો 'ઇમરજન્સી હોર્મોન' સ્ત્રવે છે જે શરીરને લડવા કે ભાગવા (Fight or Flight) માટે સજ્જ કરે છે?",
      options_en: ["Thyroxine", "Insulin", "Adrenaline", "Estrogen", "Option E: Not Attempted"],
      options_gu: ["થાઇરોક્સિન", "ઇન્સ્યુલિન", "એડ્રીનાલિન (Adrenaline)", "ઇસ્ટ્રોજન", "E. ઉત્તર આપેલ નથી"],
      answer: 2, // Adrenaline
      explanation_en: "Adrenaline (epinephrine) is secreted by the adrenal medulla during stress, increasing heart rate, blood pressure, and pupil dilation to prepare the body for immediate physical action.",
      explanation_gu: "એડ્રીનાલિન હોર્મોન ભય કે તણાવ વખતે હૃદયના ધબકારા અને રક્તપ્રવાહ વધારી શરીરને ત્વરિત પ્રતિક્રિયા માટે તૈયાર કરે છે."
    },
    {
      id: "sci_bio_05",
      subject: "general_studies",
      topic: "biology_diseases",
      difficulty: "medium",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "Tuberculosis (TB), a chronic infectious disease affecting primarily the lungs, is caused by which pathogen?",
      question_gu: "મુખ્યત્વે ફેફસાંને અસર કરતો ક્રોનિક ચેપી રોગ ક્ષય (ટીબી - Tuberculosis) કયા જીવાણુથી થાય છે?",
      options_en: [
        "A virus (Mycobacterium leprae)",
        "A bacterium (Mycobacterium tuberculosis)",
        "A protozoan (Plasmodium vivax)",
        "A fungus (Candida albicans)",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "વાયરસ (માયકોબેક્ટેરિયમ લેપ્રા)",
        "બેક્ટેરિયા / જીવાણુ (માયકોબેક્ટેરિયમ ટ્યુબરક્યુલોસિસ)",
        "પ્રજીવ (પ્લાઝમોડિયમ)",
        "ફૂગ (કેન્ડિડા)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 1, // Bacterium
      explanation_en: "Tuberculosis is caused by the acid-fast bacterium Mycobacterium tuberculosis, transmitted through airborne respiratory droplets from infected individuals.",
      explanation_gu: "ક્ષય (ટીબી) એ માયકોબેક્ટેરિયમ ટ્યુબરક્યુલોસિસ નામના બેક્ટેરિયા (જીવાણુ) દ્વારા ફેલાતો શ્વસનતંત્રનો ચેપી રોગ છે."
    },
    {
      id: "sci_phy_06",
      subject: "general_studies",
      topic: "physics_atmospheric_refraction",
      difficulty: "easy",
      sourceType: "REFERENCE",
      exams: ["CDS", "PSI"],
      question_en: "The apparent twinkling of stars at night and the phenomenon of advanced sunrise and delayed sunset are caused by which optical effect?",
      question_gu: "રાત્રે તારાઓનું ટમટમવું અને સૂર્યોદય સમય કરતાં ૨ મિનિટ વહેલો તેમજ સૂર્યાસ્ત ૨ મિનિટ મોડો દેખાવાની પ્રકાશીય ઘટના કયા કારણથી બને છે?",
      options_en: [
        "Atmospheric Refraction of light",
        "Total Internal Reflection",
        "Dispersion of light through rain droplets",
        "Scattering of light by colloidal particles",
        "Option E: Not Attempted"
      ],
      options_gu: [
        "પ્રકાશનું વાતાવરણીય વક્રીભવન (Atmospheric Refraction)",
        "પૂર્ણ આંતરિક પરાવર્તન (Total Internal Reflection)",
        "પ્રકાશનું વિભાજન (Dispersion)",
        "પ્રકાશનું પ્રકીર્ણન (Scattering)",
        "E. ઉત્તર આપેલ નથી"
      ],
      answer: 0, // Atmospheric Refraction
      explanation_en: "Atmospheric refraction occurs as light passes through layers of air with continuously varying optical densities and temperatures, bending the light rays continuously and causing apparent flickering of point light sources (stars) and early sunrise.",
      explanation_gu: "પૃથ્વીના વાતાવરણમાં વિવિધ સ્તરોમાં હવાની ઘનતા અને તાપમાન સતત બદલાતું રહે છે. તારાઓમાંથી આવતો પ્રકાશ આ સ્તરોમાંથી પસાર થતાં વારંવાર વક્રીભવન પામે છે, જેના કારણે તારાઓ ટમટમતા દેખાય છે અને સૂર્ય વાસ્તવિક સૂર્યોદય કરતાં ૨ મિનિટ વહેલો દેખાય છે."
    }
  ];

  if (root.GoalQuestionBank && typeof root.GoalQuestionBank.register === 'function') {
    root.GoalQuestionBank.register(SCIENCE_QUESTIONS);
  } else {
    root.__PENDING_SCIENCE_DATA = SCIENCE_QUESTIONS;
  }

  root.PSI_SCIENCE_QUESTIONS = SCIENCE_QUESTIONS;
})(typeof window !== 'undefined' ? window : this);
