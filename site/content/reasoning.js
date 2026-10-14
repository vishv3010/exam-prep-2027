/**
 * Reasoning & Data Interpretation — PSI Paper 1 Part A (50 marks).
 * Correct option first; the UI shuffles.
 */
(function (root) {
  'use strict';
  var G = root.GOAL, L = G.L, Q = G.Q, F = G.F;
  var M = { mental: 1 }, P = { pen: 1 };

  G.add('r_series', [
    L('Number series — check in this order', '1. Differences (+2, +4, +6…)\n2. Ratios (×2, ×3…)\n3. Squares and cubes (n², n³, n² ± 1)\n4. Alternating patterns (two series mixed together)\n5. Primes\nWrite the differences under the numbers. Most series fall to step 1 or 2.'),
    Q('2, 6, 12, 20, 30, ?', ['42', '40', '36', '44'], 'Differences 4, 6, 8, 10, so next is +12 → 42.', M),
    Q('3, 6, 12, 24, ?', ['48', '36', '30', '42'], '×2 each time.', M),
    Q('1, 4, 9, 16, 25, ?', ['36', '30', '35', '49'], 'Squares of 1, 2, 3…', M),
    Q('2, 3, 5, 7, 11, ?', ['13', '12', '15', '14'], 'Prime numbers.', M),
    Q('5, 11, 23, 47, ?', ['95', '94', '96', '71'], '×2 + 1 each time.', M),
    Q('1, 8, 27, 64, ?', ['125', '100', '81', '216'], 'Cubes of 1, 2, 3, 4, 5.', M),
    Q('10, 9, 7, 4, ?', ['0', '1', '2', '−1'], 'Subtract 1, 2, 3, then 4.', M),
    Q('4, 7, 12, 19, 28, ?', ['39', '37', '38', '40'], 'Differences 3, 5, 7, 9, so next is +11 → 39.', M),
    L('Letter series — number the alphabet', 'A = 1 … Z = 26. Memorise **EJOTY = 5, 10, 15, 20, 25** and count from the nearest anchor.\nOpposite letter (A↔Z, B↔Y, M↔N): position = 27 − n.'),
    F('Position of P', '16'), F('Position of T', '20'), F('EJOTY', 'E 5 · J 10 · O 15 · T 20 · Y 25'),
    F('Opposite of D (A↔Z)', 'W (27 − 4 = 23)'), F('Position of K', '11'), F('Position of R', '18'),
    Q('A, C, F, J, O, ?', ['U', 'T', 'V', 'S'], 'Gaps +2, +3, +4, +5, +6 → O(15) + 6 = U(21).', M),
    Q('Z, X, V, T, ?', ['R', 'S', 'Q', 'P'], 'Back two letters each time.', M),
    Q('AZ, BY, CX, ?', ['DW', 'DV', 'EW', 'DX'], 'First letter moves forward, second moves backward.', M),
    Q('1, 1, 2, 3, 5, 8, 13, ?', ['21', '20', '19', '24'], 'Fibonacci sequence: each term is the sum of previous two. 8 + 13 = 21.', M),
    Q('0, 7, 26, 63, 124, ?', ['215', '216', '125', '214'], 'Pattern is n³ − 1: 1³−1=0, 2³−1=7, 3³−1=26, 4³−1=63, 5³−1=124, so next is 6³−1 = 216 − 1 = 215.', M),
    Q('2, 5, 10, 17, 26, ?', ['37', '35', '36', '38'], 'Pattern is n² + 1: 1²+1, 2²+1, 3²+1, 4²+1, 5²+1, next is 6²+1 = 37.', M),
    Q('B, D, G, K, P, ?', ['V', 'U', 'W', 'T'], 'Letter gaps: B(+2)→D(+3)→G(+4)→K(+5)→P(+6) = V (16 + 6 = 22 = V).', M),
    L('Analogy and odd one out', '**Analogy** (A : B :: C : ?) — say the relation in words first: "worker : workplace", "country : capital", "n : n³".\n**Odd one out** — find what three of them share (prime, category, square); the fourth breaks it.'),
    Q('Doctor : Hospital :: Teacher : ?', ['School', 'Student', 'Book', 'Chalk'], 'Person : place of work.', M),
    Q('3 : 27 :: 4 : ?', ['64', '16', '48', '81'], 'n : n³.', M),
    Q('Analogy: 11 : 121 :: 15 : ?', ['225', '215', '235', '195'], 'Rule n : n². 15² = 225.', M),
    Q('Odd one out: 3, 5, 9, 11, 13', ['9', '5', '11', '13'], 'All the others are prime.', M),
    Q('Odd one out: Mango, Apple, Potato, Banana', ['Potato', 'Mango', 'Apple', 'Banana'], 'Potato is a vegetable; the rest are fruits.', M),
    Q('Odd one out: 121, 144, 169, 180', ['180', '121', '144', '169'], 'The others are perfect squares.', M),
    Q('Odd one out: 64, 125, 216, 343', ['64', '125', '216', '343'], '64 is both a perfect square (8²) and cube (4³); the others are pure cubes.', M),
    Q('3, 8, 15, 24, 35, ?', ['48', '46', '50', '44'], 'Pattern is n² − 1: 2²−1=3, 3²−1=8, 4²−1=15, 5²−1=24, 6²−1=35, so 7²−1 = 48.', M),
    Q('2, 10, 30, 68, 130, ?', ['222', '216', '220', '224'], 'Pattern is n³ + n: 1³+1=2, 2³+2=10, 3³+3=30, 4³+4=68, 5³+5=130, so 6³+6 = 222.', M),
    Q('14, 28, 20, 40, 32, 64, ?', ['56', '54', '60', '48'], 'Alternating pattern: ×2, −8, ×2, −8, ×2, −8 → 64 − 8 = 56.', M)
  ]);

  G.add('r_coding', [
    L('Coding — find the shift', 'Write the letter positions of the word and its code under each other. Look for a fixed shift (+1, −2), a growing shift (+1, +2, +3…), opposite letters (A↔Z) or reversed order.', 'If COLD = DPME (each letter +1), then WARM = **XBSN**'),
    Q('If COLD is coded DPME, how is WARM coded?', ['XBSN', 'XBSM', 'VZQL', 'XCSN'], 'Each letter +1.', M),
    Q('If DELHI is coded EFMIJ, how is MUMBAI coded?', ['NVNCBJ', 'NVNBCJ', 'LTLAZH', 'NVNCBI'], 'Each letter +1: M→N, U→V, M→N, B→C, A→B, I→J.', M),
    Q('If FRIEND is coded HUMJTK, how is CANDLE coded?', ['EDRIRL', 'DCQHQK', 'ESJFME', 'EDRJRL'], 'Shifts grow +2, +3, +4, +5, +6, +7: C→E, A→D, N→R, D→I, L→R, E→L.', P),
    Q('ROSE = 6821, CHAIR = 73456, PREACH = 961473. SEARCH = ?', ['214673', '214763', '216473', '241673'], 'Each letter has a fixed digit: S 2, E 1, A 4, R 6, C 7, H 3.', P),
    Q('If A = 1, B = 2 … Z = 26, then CAT = ?', ['24', '23', '26', '22'], 'C 3 + A 1 + T 20 = 24.', M),
    Q('"sky is blue" = "ta na pa" and "blue is good" = "na ta ka". The code for "good"?', ['ka', 'ta', 'na', 'pa'], '"is blue" is the common pair "ta na"; "good" is the leftover "ka".', M),
    Q('If CAT is coded as XZG, how is DOG coded?', ['WLT', 'WLS', 'VLT', 'WKT'], 'Opposite letters (positions sum to 27): D(4)↔W(23), O(15)↔L(12), G(7)↔T(20).', M),
    Q('If BOOK is coded as 43, what is PEN coded as?', ['35', '32', '36', '40'], 'Sum of letter positions: P(16) + E(5) + N(14) = 35.', M),
    Q('If "water" is called "food", "food" is called "tree", and "tree" is called "sky", on what do fruits grow?', ['Sky', 'Tree', 'Food', 'Water'], 'Fruits grow on a "tree", and "tree" is called "sky".', M),
    Q('If MASTER is coded as SAMRET, what is CARROT coded as?', ['RACTOR', 'RACROT', 'RACORT', 'CARROT'], 'First 3 letters reversed (MAS→SAM), last 3 reversed (TER→RET). CAR→RAC, ROT→TOR → RACTOR.', M),
    Q('If KING is coded as PRMT, what is QUEEN coded as?', ['JFVMN', 'JEVMM', 'IFVMN', 'JFVNM'], 'Opposite pairs (sum 27): Q(17)↔J, U(21)↔F, E(5)↔V, E(5)↔V, N(14)↔M → JFVMN.', M),
    Q('If A = 26, SUN = 27, what is CAT coded as?', ['57', '58', '56', '54'], 'Opposite positions: C(24) + A(26) + T(7) = 57. (S:8, U:6, N:13 → 27).', M),
    Q('If "apple" is coded as 25, "banana" as 36, what is "grape" coded as?', ['25', '30', '20', '36'], 'Word length squared: apple has 5 letters → 5²=25. grape has 5 letters → 5²=25.', M),
    F('Opposite letter of G', 'T (27 − 7 = 20)'),
    F('Position of M', '13 — M and N are the middle pair')
  ]);

  G.add('r_blood', [
    L('Blood relations — draw, don’t think', 'Draw a small family tree: **+ male, − female, = married, a vertical line from parent to child**.\n- Father’s or mother’s brother = uncle; their sister = aunt\n- Brother’s or sister’s son = nephew; daughter = niece\n- "My mother’s only son" said by a man = himself (classic trap)'),
    Q('Pointing to a man, Riya says, "He is the son of my mother’s only son." The man is Riya’s:', ['Nephew', 'Brother', 'Son', 'Cousin'], 'Her mother’s only son is Riya’s brother. His son is her nephew.', M),
    Q('A is B’s brother. C is A’s mother. D is C’s father. B is D’s:', ['Grandchild', 'Son', 'Grandfather', 'Nephew'], 'D → C → A and B. B is D’s grandchild (gender not given).', M),
    Q('A man points to a girl: "Her mother is the only daughter of my mother." He is the girl’s:', ['Maternal uncle (મામા)', 'Father', 'Brother', 'Grandfather'], 'The only daughter of his mother is his sister, so he is the girl’s mama.', M),
    Q('Pointing to a photograph of a boy, Suresh said, "He is the only son of my mother." How is Suresh related to that boy?', ['Father', 'Uncle', 'Brother', 'Grandfather'], 'Said by a man, "the only son of my mother" is Suresh himself. So Suresh is the boy’s father.', M),
    Q('Introducing a man, a woman said, "His wife is the only daughter of my father." How is the man related to the woman?', ['Husband', 'Brother', 'Father-in-law', 'Maternal uncle'], 'The only daughter of the woman’s father is herself. His wife is herself → the man is her husband.', M),
    Q('A is the mother of B. B is the sister of C. D is the son of C. How is A related to D?', ['Maternal grandmother (નાની)', 'Mother', 'Aunt', 'Sister'], 'A is mother of C; D is son of C. Therefore, A is D’s maternal grandmother (Nani).', M),
    Q('X is Y’s husband. Y is Z’s sister. Z is W’s son. X is W’s:', ['Son-in-law', 'Son', 'Brother', 'Father'], 'Y is W’s daughter; her husband is W’s son-in-law.', M),
    Q('P is Q’s brother and Q is R’s sister. P is R’s:', ['Brother', 'Sister', 'Father', 'Cousin'], 'P is male and a sibling of Q, and so of R.', M),
    Q('Pointing to a photograph of a lady, Mahesh said, "She is the mother of my father’s only daughter." How is the lady related to Mahesh?', ['Mother', 'Aunt', 'Sister', 'Grandmother'], 'My father’s only daughter = Mahesh’s sister. Her mother = Mahesh’s mother.', M),
    Q('Pointing to a boy in a photograph, a girl says, "The father of this boy is the only son of my grandfather." How is the boy related to the girl?', ['Brother', 'Father', 'Uncle', 'Cousin'], 'The only son of her grandfather = her father. The boy’s father is her father → The boy is her brother.', M),
    Q('Pointing to a man, a woman said, "His mother is the only daughter of my father." How is the woman related to the man?', ['Mother', 'Sister', 'Aunt', 'Grandmother'], 'The only daughter of the woman’s father = the woman herself! So his mother is the woman → She is his Mother.', M),
    Q('A and B are brothers. C and D are sisters. A’s son is D’s brother. How is B related to C?', ['Uncle (કાકા)', 'Father', 'Brother', 'Grandfather'], 'A’s son is D’s brother, so A is father to C and D. B is A’s brother → B is Uncle (Paternal Uncle / Kaka) to C.', M),
    Q('Pointing to a gentleman, Deepak said, "His only brother is the father of my daughter’s father." How is the gentleman related to Deepak?', ['Uncle (કાકા)', 'Father', 'Grandfather', 'Brother'], 'My daughter’s father = Deepak himself. The gentleman’s only brother = Deepak’s father. Father’s brother = Uncle (કાકા).', M),
    Q('If P is the husband of Q, and R is the mother of S and Q, what is R to P?', ['Mother-in-law (સાસુ)', 'Mother', 'Aunt', 'Sister-in-law'], 'R is the mother of P’s wife Q → R is Mother-in-law (સાસુ) to P.', M),
    Q('K is brother of T. M is mother of K. W is brother of M. How is W related to T?', ['Maternal Uncle (મામા)', 'Paternal Uncle (કાકા)', 'Father', 'Brother'], 'K and T are siblings with mother M. M’s brother W = Maternal Uncle (મામા) to T.', M),
    Q('A woman introduces a man as the son of the brother of her mother. How is the man related to the woman?', ['Cousin (મામાનો દીકરો)', 'Nephew', 'Uncle', 'Brother'], 'Brother of her mother = Maternal Uncle (મામા). Uncle’s son = Maternal Cousin (મામાનો દીકરો).', M),
    Q('If "P + Q" means P is father of Q; "P × Q" means P is brother of Q. Which expression proves that C is the son of P?', ['P + C × D', 'P × C + D', 'C + P × D', 'P − C + D'], 'In P + C × D: P is father of C, and C is brother of D (male) → C is the son of P.', M),
    Q('If "P @ Q" means P is mother of Q; "P # Q" means P is father of Q. In A # B @ C, how is A related to C?', ['Maternal Grandfather (નાના)', 'Paternal Grandfather (દાદા)', 'Father', 'Uncle'], 'A is father of B; B is mother of C. Mother’s father = Maternal Grandfather (નાના).', M),
    Q('A is father of C and D is son of B. E is brother of A. If C is sister of D, how is B related to E?', ['Sister-in-law (ભાભી)', 'Sister', 'Wife', 'Mother'], 'C and D are siblings. A is father, so B is mother (A’s wife). E is A’s brother → B is E’s sister-in-law (ભાભી).', M),
    Q('A boy said, "The woman with me is my mother’s husband’s mother’s only son’s wife." How is the woman related to the boy?', ['Mother', 'Grandmother', 'Aunt', 'Sister'], 'Step by step: Mother’s husband = Father. Father’s mother = Dadi. Dadi’s only son = Father. Father’s wife = Mother!', M),
    Q('Amit said, "This girl is the wife of the grandson of my mother." How is Amit related to the girl?', ['Father-in-law (સસરા)', 'Husband', 'Father', 'Grandfather'], 'Grandson of Amit’s mother = Amit’s son. Wife of Amit’s son = Daughter-in-law (પુત્રવધૂ). So Amit is her Father-in-law (સસરા).', M),
    Q('A man said to a lady, "Your mother’s husband’s sister is my aunt (ફોઈ)." How is the lady related to the man?', ['Sister', 'Daughter', 'Mother', 'Aunt'], 'Lady’s mother’s husband = lady’s father. Her father’s sister = lady’s Foi. If she is also the man’s Foi, they are brother and sister.', M),
    Q('Pointing to Ketan, Sheela said, "His sister is my mother." How is Ketan related to Sheela?', ['Maternal Uncle (મામા)', 'Paternal Uncle (કાકા)', 'Brother', 'Father'], 'Ketan’s sister is Sheela’s mother. Mother’s brother = Maternal Uncle (મામા).', M),
    Q('Rahul’s mother is the only daughter of Monika’s father. How is Monika’s husband related to Rahul?', ['Father', 'Uncle', 'Grandfather', 'Brother'], 'Monika’s father’s only daughter = Monika herself. So Monika is Rahul’s mother, and her husband is Rahul’s Father.', M),
    Q('Pointing to a photograph, a woman says, "I have no sister or brother, but this boy’s mother is my mother’s daughter." Whose photograph is it?', ['Her son', 'Her nephew', 'Herself', 'Her brother'], 'Having no siblings, "my mother’s daughter" is the woman herself. "This boy’s mother is myself" → Photograph is of her son!', M),
    Q('A is B’s wife. C is A’s sister. D is C’s father. E is D’s son. How is E related to B?', ['Brother-in-law (સાળો)', 'Son-in-law', 'Brother', 'Uncle'], 'A, C, and E are children of D. E is brother of wife A → E is B’s brother-in-law (સાળો / Saalo).', M),
    Q('A is the son of P. P is the daughter of K. K is the husband of L. How is L related to A?', ['Maternal Grandmother (નાની)', 'Paternal Grandmother (દાદી)', 'Mother', 'Aunt'], 'K and L are parents of P (female). P’s son is A. Mother’s mother = Maternal Grandmother (નાની).', M),
    Q('In a family of two generations, B is A’s child, but B is not A’s son. What is B to A?', ['Daughter', 'Son', 'Niece', 'Cousin'], 'If B is A’s child and not a son, B must be A’s daughter. (Gender trap!).', M),
    Q('Introducing a man, a woman said, "He is the only son of the mother of my mother." How is the woman related to the man?', ['Niece (ભાણી)', 'Daughter', 'Sister', 'Aunt'], 'Mother of my mother = Nani (Maternal Grandmother). Nani’s only son = Mama (Maternal Uncle). The woman is his sister’s daughter = Niece (ભાણી / Bhani).', M),
    Q('Pointing to a man in a park, Naman said, "His son is my son’s uncle." How is the man related to Naman?', ['Father (or Father-in-law)', 'Uncle', 'Brother', 'Grandfather'], 'Naman’s son’s uncle = Naman’s brother (or brother-in-law). The man whose son is Naman’s brother must be Naman’s Father.', M),
    Q('A man points to a woman and says, "Her father is the only son of my father." How is the woman related to the man?', ['Daughter', 'Sister', 'Niece', 'Mother'], 'Only son of my father (said by a man) = himself! "Her father is myself" → The woman is his daughter.', M),
    Q('Pointing to a photograph of Vinod, Sneha said, "His sister’s father is the only son of my grandfather." How is Sneha related to Vinod?', ['Sister', 'Mother', 'Aunt', 'Cousin'], 'Only son of grandfather = father. Vinod’s sister’s father = Vinod’s father. If he is also Sneha’s father, Sneha is Vinod’s Sister.', M),
    Q('How is your father’s wife’s only brother’s sister related to you if she is not your mother?', ['Maternal Aunt (માસી)', 'Mother', 'Paternal Aunt (ફોઈ)', 'Sister'], 'Father’s wife = mother. Mother’s only brother = Mama. Mama’s sister who is NOT your mother = your Mother’s sister = Maternal Aunt (માસી).', M),
    F('Father’s sister', 'Aunt — ફોઈ (phoi)'),
    F('Mother’s brother', 'Maternal uncle — મામા (mama)'),
    F('Mother’s sister', 'Maternal aunt — માસી (masi)'),
    F('Father’s brother', 'Paternal uncle — કાકા (kaka)'),
    F('Sister’s husband', 'Brother-in-law — બનેવી / જીજાજી (banevi)'),
    F('Brother’s wife', 'Sister-in-law — ભાભી (bhabhi)'),
    F('Wife’s brother', 'Brother-in-law — સાળો (saalo)'),
    F('Husband’s younger brother', 'Brother-in-law — દિયર (diyar)'),
    F('Brother’s son', 'Nephew — ભત્રીજો (bhatrijo)'),
    F('Sister’s son', 'Nephew — ભાણો (bhano)'),
    F('Brother’s daughter', 'Niece — ભત્રીજી (bhatriji)'),
    F('Sister’s daughter', 'Niece — ભાણી (bhani)'),
    F('Son’s wife', 'Daughter-in-law — પુત્રવધૂ (putravadhu)'),
    F('Daughter’s husband', 'Son-in-law — જમાઈ (jamai)'),
    F('Mother’s father', 'Maternal grandfather — નાના (nana)'),
    F('Father’s father', 'Paternal grandfather — દાદા (dada)')
  ]);

  G.add('r_direction', [
    L('Directions', 'Draw N up and E right. A right turn = 90° clockwise, a left turn = 90° anticlockwise.\n**Shadows:** the morning sun is in the east, so shadows fall WEST. In the evening shadows fall EAST.\nShortest distance = Pythagoras on the net north–south and east–west movement.'),
    Q('A man walks 3 km north, then 4 km east. Distance from the start?', ['5 km', '7 km', '1 km', '6 km'], '3-4-5 triangle.', M),
    Q('Facing north, you turn right, right again, then left. Which way do you face?', ['East', 'West', 'South', 'North'], 'N → E → S → (left from S) E.', M),
    Q('In the morning, a man’s shadow falls to his right. Which way is he facing?', ['South', 'North', 'East', 'West'], 'Morning shadows point west. West on your right means you face south.', M),
    Q('At sunset, a man notices his shadow is falling to his right. Which direction is he facing?', ['North', 'South', 'East', 'West'], 'At sunset, sun is in the west, so shadow falls east. East to your right means you face North.', M),
    Q('A person starts facing South, turns 90° clockwise, then 180° anticlockwise. Which way is he facing?', ['East', 'West', 'North', 'South'], 'Facing South: 90° clockwise = West. Then 180° = East.', M),
    Q('A man walks 12 km West, then 5 km South. What is the shortest distance back to start?', ['13 km', '17 km', '7 km', '15 km'], '5-12-13 right triangle: √(12² + 5²) = √(144 + 25) = √169 = 13 km.', M),
    Q('Ravi walks 10 m south, turns left and walks 5 m, turns left and walks 10 m. Where is he now from the start?', ['5 m east', '5 m west', '10 m north', '15 m east'], 'South, then left = east 5 m, then left = north 10 m. He is level with the start, 5 m east.', M),
    Q('A walks 6 km east, 8 km north, then 6 km west. Position from the start?', ['8 km north', '10 km north-east', '14 km north', '6 km west'], 'East and west cancel out.', M),
    Q('A person faces North. He turns 45° clockwise, then 90° anticlockwise, and finally 135° clockwise. Which direction is he facing now?', ['East', 'North-East', 'South-East', 'West'], 'Clockwise = +45° + 135° = +180°. Anticlockwise = −90°. Net = +90° clockwise. North + 90° = East.', M),
    Q('One morning after sunrise, Suresh and Mahesh were standing face to face talking. Suresh noticed Mahesh’s shadow fell exactly to Suresh’s left. Which direction was Suresh facing?', ['North', 'South', 'East', 'West'], 'Morning sun is in East, so all shadows fall West. If the shadow fell to Suresh’s left, Suresh’s left is West. Left = West means Suresh is facing North.', M),
    Q('If South-East becomes North, North-East becomes West, and so on, what will West become?', ['South-East', 'North-East', 'South-West', 'North-West'], 'South-East to North is a 135° anticlockwise shift. Rotating West 135° anticlockwise gives South-East.', M),
    Q('At 12:00 solar noon on an ordinary day in Gujarat, where does a pole’s shadow point?', ['North (or shortest directly below)', 'South', 'East', 'West'], 'Gujarat is in the Northern hemisphere (tropic/subtropic). Sun at noon is to the south, casting shadows towards North.', M),
    F('Morning shadows fall towards', 'the West'),
    F('Facing north, turn 135° clockwise → you face', 'South-east'),
    F('Facing each other at sunrise: shadow on your left means', 'You are facing North'),
    F('Direction angle formula', 'Net angle = (Sum of Clockwise) − (Sum of Anticlockwise)')
  ]);

  G.add('r_order', [
    L('Ranking', 'Total = rank from top + rank from bottom − 1.\nRanked 7th from the top and 12th from the bottom → **18** students.\nPosition from the other end = total − position + 1.'),
    Q('Raj is 7th from the top and 12th from the bottom of his class. Number of students?', ['18', '19', '20', '17'], '7 + 12 − 1 = 18.', M),
    Q('In a row of 40 people, A is 15th from the left. Position from the right?', ['26th', '25th', '24th', '27th'], '40 − 15 + 1 = 26.', M),
    Q('In a row of 35 students, Ramesh is 11th from the right. What is his position from the left?', ['25th', '24th', '26th', '23rd'], 'Position from left = Total − Right + 1 = 35 − 11 + 1 = 25th.', M),
    Q('In a class, Priya ranks 6th from the top and 28th from the bottom. How many students in the class?', ['33', '34', '32', '35'], 'Total = Top + Bottom − 1 = 6 + 28 − 1 = 33.', M),
    Q('A is older than B, B is older than C, and D is older than A. Who is the second oldest?', ['A', 'D', 'B', 'C'], 'Order: D > A > B > C. The second oldest is A.', M),
    Q('In a row of boys, A is 10th from the left and B is 9th from the right. When they interchange positions, A becomes 15th from the left. How many boys are in the row?', ['23', '24', '22', '25'], 'When A sits in B’s former spot, that position is 15th from left and 9th from right. Total = 15 + 9 − 1 = 23.', M),
    Q('In a row of 30 students, Amit is 18th from the left and Sumit is 16th from the right. How many students are sitting between them?', ['2', '4', '6', '3'], 'Sum of positions = 18 + 16 = 34 > 30 (Overlapping case!). Overlap formula: (Left + Right) − Total − 2 = 34 − 30 − 2 = 2 students.', M),
    Q('In a line of 21 boys facing North, Manoj is 5th from the left and Ajay is 5th from the right. How many boys are between Manoj and Ajay?', ['11', '10', '12', '9'], 'Non-overlapping: Total − (Left + Right) = 21 − (5 + 5) = 21 − 10 = 11 boys.', M),
    L('Seating — the method', '1. Draw the seats first (a line or a circle).\n2. Place the **definite** clues first ("A sits at an end", "B is third from the left").\n3. Then the relative clues ("C is to the right of D").\n4. In a circle facing the centre, your right is anticlockwise — draw it, don’t imagine it.'),
    Q('Five friends sit in a row. B is right of A, C is left of A, D is right of B, E is right of D. Who is in the middle?', ['B', 'A', 'C', 'D'], 'Left to right: C, A, B, D, E. Middle = B.', M),
    Q('A is taller than B. C is shorter than B. D is taller than A. Who is the shortest?', ['C', 'B', 'A', 'D'], 'D > A > B > C.', M),
    Q('P, Q, R, S and T sit around a round table. P is between Q and T. R is next to Q. Who is R’s other neighbour?', ['S', 'P', 'T', 'Q'], 'Going round: T, P, Q, R, and S fills the last seat between R and T.', P),
    F('Interchanging positions in row', 'Total = (New rank of A) + (Old rank of B) − 1'),
    F('Overlapping row count between people', '(Left rank + Right rank) − Total − 2')
  ]);

  G.add('r_logic', [
    L('Syllogism — draw circles', 'Use Venn circles. A conclusion follows only if it is true in **every** possible drawing.\n- All A are B → A circle inside B\n- Some A are B → circles overlap\n- No A is B → circles apart'),
    Q('All dogs are animals. All animals are living things. Conclusion: All dogs are living things.', ['Follows', 'Does not follow', 'Follows only for some dogs', 'Cannot be decided'], 'Dog circle inside animal circle inside living circle.', M),
    Q('Some pens are books. All books are bags. Which follows?', ['Some pens are bags', 'All pens are bags', 'No pen is a bag', 'All bags are pens'], 'The pens that are books sit inside the bag circle.', M),
    Q('No cat is a dog. All dogs are pets. Which definitely follows?', ['Some pets are not cats', 'No cat is a pet', 'All pets are dogs', 'Some cats are pets'], 'The dogs are pets but not cats, so some pets are not cats.', M),
    Q('All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly.', ['Does not follow', 'Follows', 'All roses fade quickly', 'No rose fades'], 'The fast-fading flowers may lie outside the rose circle.', M),
    Q('Statements: All cups are plates. All plates are spoons. Conclusion: All cups are spoons.', ['Follows', 'Does not follow', 'Either follows', 'Cannot say'], 'Cup circle is completely inside plate, which is completely inside spoon. Follows.', M),
    Q('Statements: Some apples are red. No red is sweet. Conclusion: Some apples are not sweet.', ['Follows', 'Does not follow', 'All apples are sweet', 'Cannot say'], 'The apples that are red cannot be sweet. Therefore, those apples are not sweet. Follows.', M),
    Q('Statements: All birds have wings. A bat has wings. Conclusion: A bat is a bird.', ['Does not follow', 'Follows', 'True only for some bats', 'Cannot say'], 'Having wings does not mean lying inside the bird circle. Does not follow.', M),
    Q('Statements: All mangoes are golden. No golden things are cheap. Conclusions: 1. All mangoes are cheap. 2. Golden mangoes are not cheap.', ['Only 2 follows', 'Only 1 follows', 'Both follow', 'Neither follows'], 'All mangoes are golden, and no golden thing is cheap, so all mangoes are not cheap. Conclusion 2 is definitely true.', M),
    Q('Which Venn diagram best represents: "India, Gujarat, Ahmedabad"?', ['Three concentric circles (one inside another)', 'Two intersecting circles inside one big circle', 'Three mutually intersecting circles', 'Three completely separate circles'], 'Ahmedabad is entirely within Gujarat, and Gujarat is entirely within India → Three concentric circles.', M),
    Q('Which Venn diagram best represents: "Professors, Authors, Children"?', ['Two intersecting circles (Professors & Authors) and one separate circle (Children)', 'Three mutually intersecting circles', 'Three completely separate circles', 'One circle inside another with a third intersecting'], 'A professor can also be an author (intersection), but children cannot be professors or professional authors (disjoint/separate circle).', M),
    L('Statements, assumptions, conclusions', 'An **assumption** is what the speaker takes for granted. A **conclusion** must follow from the statement alone — no outside knowledge.\nOptions with extreme words ("only", "always", "all", "never") are usually wrong.'),
    Q('Statement: "Use our toothpaste for whiter teeth." Implicit assumption?', ['People want whiter teeth', 'All other toothpastes are harmful', 'Teeth are naturally white', 'People never brush'], 'An advert assumes the audience wants the benefit it offers.', M),
    F('Venn: Concentric circles represent', 'Complete containment / hierarchy (e.g. City inside State inside Country)'),
    F('Venn: Disjoint circles represent', 'Mutually exclusive categories with zero overlap')
  ]);

  G.add('r_calendar', [
    L('Odd days — the whole calendar in one idea', 'Odd days = days left over after full weeks.\n- Ordinary year = 1 odd day; leap year = 2.\n- 100 years = 5 odd days, 200 = 3, 300 = 1, 400 = 0.\n- Leap year: divisible by 4; century years only if divisible by 400 (2000 yes, 1900 no).\nIf 1 Jan is Monday in an ordinary year, the next 1 Jan is Tuesday.'),
    Q('Is 1900 a leap year?', ['No', 'Yes', 'Only in the Indian calendar', 'Cannot say'], 'A century year must be divisible by 400.', M),
    Q('15 August 2026 is a Saturday. What day is 15 August 2027?', ['Sunday', 'Monday', 'Saturday', 'Friday'], 'There is no 29 February between them, so 365 days = 1 odd day.', M),
    Q('Today is Monday. What day is it after 61 days?', ['Saturday', 'Sunday', 'Friday', 'Tuesday'], '61 = 8 weeks + 5 days → Monday + 5 = Saturday.', M),
    Q('If today is Friday, what day of the week was it 15 days ago?', ['Thursday', 'Friday', 'Saturday', 'Wednesday'], '15 days = 2 full weeks (14 days) + 1 day. 1 day before Friday is Thursday.', M),
    Q('Which year will have the same calendar as the year 2024?', ['2052', '2030', '2035', '2048'], '2024 is a leap year. A leap year calendar repeats every 28 years! 2024 + 28 = 2052.', M),
    Q('Which year will have the exact same calendar as 2025?', ['2031', '2030', '2036', '2032'], '2025 is (Leap year + 1). A year immediately following a leap year repeats after 6 years: 2025 + 6 = 2031.', M),
    L('Clocks', 'Angle between the hands = |30H − 5.5M| degrees (if it is over 180, use 360 minus it).\nThe hands overlap 22 times a day, are opposite 22 times, and at right angles 44 times.'),
    Q('Angle between the hands at 3:30?', ['75°', '90°', '60°', '105°'], '|30 × 3 − 5.5 × 30| = |90 − 165| = 75.', M),
    Q('Angle between the hands at 9:00?', ['90°', '270°', '45°', '180°'], '|270 − 0| = 270 → 360 − 270 = 90.', M),
    Q('What time is shown by the reflection of a clock in a mirror if the real clock shows 3:40?', ['8:20', '8:40', '9:20', '7:20'], 'Mirror trick: Subtract from 11:60. 11:60 − 3:40 = 8:20.', M),
    Q('What time does a mirror reflect when a clock shows 8:15?', ['3:45', '4:45', '3:15', '4:15'], 'Mirror trick: 11:60 − 8:15 = 3:45.', M),
    Q('A clock seen in water shows 4:40. What is the actual time?', ['1:50', '2:20', '8:20', '1:20'], 'Water image trick: Subtract from 18:30 (or 17:90 if minutes > 30). 17:90 − 4:40 = 13:50 → 1:50.', M),
    Q('How many times do the hour and minute hands coincide in a day?', ['22', '24', '12', '11'], 'Once every 65 5/11 minutes → 22 times in 24 hours.', M),
    Q('How many times do clock hands form a straight line (overlap or opposite) in 24 hours?', ['44', '22', '48', '24'], '22 overlaps + 22 opposite directions = 44 times.', M),
    Q('How many times in a 24-hour day are the hands of a clock at right angles (90°)?', ['44', '48', '24', '22'], 'In each 12-hour period, hands form 90° 22 times. In 24 hours: 22 × 2 = 44 times.', M),
    F('Angle between clock hands', '|30H − 5.5M|'),
    F('Odd days in a leap year', '2'),
    F('Odd days in 400 years', '0'),
    F('Clock water image formula', 'Subtract time from 18:30 (or 17:90 if minutes > 30)'),
    F('Calendar repetition for leap year', 'Repeats after 28 years'),
    F('Calendar repetition for (leap + 1) year', 'Repeats after 6 years'),
    F('Right angles between clock hands in 24h', '44 times')
  ]);

  G.add('r_di', [
    L('DI is percentages in disguise', 'Data interpretation = percentages + ratios + averages read off a table or chart.\n1. Read the title and units first.\n2. Approximate — options are usually far apart.\n3. "Percentage increase" divides by the OLD year.'),
    Q('Shop sales (₹ lakh) — 2021: 40, 2022: 50, 2023: 45, 2024: 60. % increase from 2021 to 2022?', ['25%', '20%', '10%', '50%'], '10 ÷ 40 = 25%.', M),
    Q('Sales 2021–2024: 40, 50, 45, 60 (₹ lakh). Average yearly sales?', ['48.75', '45', '50', '47.5'], 'Sum 195 ÷ 4 = 48.75.', M),
    Q('Sales 2021–2024: 40, 50, 45, 60. In which year did sales fall?', ['2023', '2022', '2024', 'No year'], '50 → 45 in 2023.', M),
    Q('Sales 2021–2024: 40, 50, 45, 60. 2024 sales are what % of 2021 sales?', ['150%', '50%', '120%', '140%'], '60 ÷ 40 = 1.5.', M),
    Q('In a pie chart, rent takes 90° of 360°. Monthly spending is ₹40,000. Rent?', ['₹10,000', '₹9,000', '₹12,000', '₹4,000'], '90/360 = 1/4.', M),
    Q('In a pie chart, an item is 15% of the total. Its central angle?', ['54°', '45°', '15°', '60°'], '15% of 360 = 54.', M),
    F('Pie chart: x% of total → angle', '3.6 × x degrees')
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
