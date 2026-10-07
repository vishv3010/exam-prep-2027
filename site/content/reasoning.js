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
    L('Analogy and odd one out', '**Analogy** (A : B :: C : ?) — say the relation in words first: "worker : workplace", "country : capital", "n : n³".\n**Odd one out** — find what three of them share (prime, category, square); the fourth breaks it.'),
    Q('Doctor : Hospital :: Teacher : ?', ['School', 'Student', 'Book', 'Chalk'], 'Person : place of work.', M),
    Q('3 : 27 :: 4 : ?', ['64', '16', '48', '81'], 'n : n³.', M),
    Q('Odd one out: 3, 5, 9, 11, 13', ['9', '5', '11', '13'], 'All the others are prime.', M),
    Q('Odd one out: Mango, Apple, Potato, Banana', ['Potato', 'Mango', 'Apple', 'Banana'], 'Potato is a vegetable; the rest are fruits.', M),
    Q('Odd one out: 121, 144, 169, 180', ['180', '121', '144', '169'], 'The others are perfect squares.', M)
  ]);

  G.add('r_coding', [
    L('Coding — find the shift', 'Write the letter positions of the word and its code under each other. Look for a fixed shift (+1, −2), a growing shift (+1, +2, +3…), opposite letters (A↔Z) or reversed order.', 'If COLD = DPME (each letter +1), then WARM = **XBSN**'),
    Q('If COLD is coded DPME, how is WARM coded?', ['XBSN', 'XBSM', 'VZQL', 'XCSN'], 'Each letter +1.', M),
    Q('If DELHI is coded EFMIJ, how is MUMBAI coded?', ['NVNCBJ', 'NVNBCJ', 'LTLAZH', 'NVNCBI'], 'Each letter +1: M→N, U→V, M→N, B→C, A→B, I→J.', M),
    Q('If FRIEND is coded HUMJTK, how is CANDLE coded?', ['EDRIRL', 'DCQHQK', 'ESJFME', 'EDRJRL'], 'Shifts grow +2, +3, +4, +5, +6, +7: C→E, A→D, N→R, D→I, L→R, E→L.', P),
    Q('ROSE = 6821, CHAIR = 73456, PREACH = 961473. SEARCH = ?', ['214673', '214763', '216473', '241673'], 'Each letter has a fixed digit: S 2, E 1, A 4, R 6, C 7, H 3.', P),
    Q('If A = 1, B = 2 … Z = 26, then CAT = ?', ['24', '23', '26', '22'], 'C 3 + A 1 + T 20 = 24.', M),
    Q('"sky is blue" = "ta na pa" and "blue is good" = "na ta ka". The code for "good"?', ['ka', 'ta', 'na', 'pa'], '"is blue" is the common pair "ta na"; "good" is the leftover "ka".', M),
    F('Opposite letter of G', 'T (27 − 7 = 20)'),
    F('Position of M', '13 — M and N are the middle pair')
  ]);

  G.add('r_blood', [
    L('Blood relations — draw, don’t think', 'Draw a small family tree: **+ male, − female, = married, a vertical line from parent to child**.\n- Father’s or mother’s brother = uncle; their sister = aunt\n- Brother’s or sister’s son = nephew; daughter = niece\n- "My mother’s only son" said by a man = himself (classic trap)'),
    Q('Pointing to a man, Riya says, "He is the son of my mother’s only son." The man is Riya’s:', ['Nephew', 'Brother', 'Son', 'Cousin'], 'Her mother’s only son is Riya’s brother. His son is her nephew.', M),
    Q('A is B’s brother. C is A’s mother. D is C’s father. B is D’s:', ['Grandchild', 'Son', 'Grandfather', 'Nephew'], 'D → C → A and B. B is D’s grandchild (gender not given).', M),
    Q('A man points to a girl: "Her mother is the only daughter of my mother." He is the girl’s:', ['Maternal uncle', 'Father', 'Brother', 'Grandfather'], 'The only daughter of his mother is his sister, so he is the girl’s mama.', M),
    Q('X is Y’s husband. Y is Z’s sister. Z is W’s son. X is W’s:', ['Son-in-law', 'Son', 'Brother', 'Father'], 'Y is W’s daughter; her husband is W’s son-in-law.', M),
    Q('P is Q’s brother and Q is R’s sister. P is R’s:', ['Brother', 'Sister', 'Father', 'Cousin'], 'P is male and a sibling of Q, and so of R.', M),
    F('Father’s sister', 'Aunt — ફોઈ (phoi)'), F('Mother’s brother', 'Maternal uncle — મામા (mama)'), F('Sister’s husband', 'Brother-in-law — બનેવી (banevi)')
  ]);

  G.add('r_direction', [
    L('Directions', 'Draw N up and E right. A right turn = 90° clockwise, a left turn = 90° anticlockwise.\n**Shadows:** the morning sun is in the east, so shadows fall WEST. In the evening shadows fall EAST.\nShortest distance = Pythagoras on the net north–south and east–west movement.'),
    Q('A man walks 3 km north, then 4 km east. Distance from the start?', ['5 km', '7 km', '1 km', '6 km'], '3-4-5 triangle.', M),
    Q('Facing north, you turn right, right again, then left. Which way do you face?', ['East', 'West', 'South', 'North'], 'N → E → S → (left from S) E.', M),
    Q('In the morning, a man’s shadow falls to his right. Which way is he facing?', ['South', 'North', 'East', 'West'], 'Morning shadows point west. West on your right means you face south.', M),
    Q('Ravi walks 10 m south, turns left and walks 5 m, turns left and walks 10 m. Where is he now from the start?', ['5 m east', '5 m west', '10 m north', '15 m east'], 'South, then left = east 5 m, then left = north 10 m. He is level with the start, 5 m east.', M),
    Q('A walks 6 km east, 8 km north, then 6 km west. Position from the start?', ['8 km north', '10 km north-east', '14 km north', '6 km west'], 'East and west cancel out.', M),
    F('Morning shadows fall towards', 'the West'),
    F('Facing north, turn 135° clockwise → you face', 'South-east')
  ]);

  G.add('r_order', [
    L('Ranking', 'Total = rank from top + rank from bottom − 1.\nRanked 7th from the top and 12th from the bottom → **18** students.\nPosition from the other end = total − position + 1.'),
    Q('Raj is 7th from the top and 12th from the bottom of his class. Number of students?', ['18', '19', '20', '17'], '7 + 12 − 1 = 18.', M),
    Q('In a row of 40 people, A is 15th from the left. Position from the right?', ['26th', '25th', '24th', '27th'], '40 − 15 + 1 = 26.', M),
    L('Seating — the method', '1. Draw the seats first (a line or a circle).\n2. Place the **definite** clues first ("A sits at an end", "B is third from the left").\n3. Then the relative clues ("C is to the right of D").\n4. In a circle facing the centre, your right is anticlockwise — draw it, don’t imagine it.'),
    Q('Five friends sit in a row. B is right of A, C is left of A, D is right of B, E is right of D. Who is in the middle?', ['B', 'A', 'C', 'D'], 'Left to right: C, A, B, D, E. Middle = B.', M),
    Q('A is taller than B. C is shorter than B. D is taller than A. Who is the shortest?', ['C', 'B', 'A', 'D'], 'D > A > B > C.', M),
    Q('P, Q, R, S and T sit around a round table. P is between Q and T. R is next to Q. Who is R’s other neighbour?', ['S', 'P', 'T', 'Q'], 'Going round: T, P, Q, R, and S fills the last seat between R and T.', P)
  ]);

  G.add('r_logic', [
    L('Syllogism — draw circles', 'Use Venn circles. A conclusion follows only if it is true in **every** possible drawing.\n- All A are B → A circle inside B\n- Some A are B → circles overlap\n- No A is B → circles apart'),
    Q('All dogs are animals. All animals are living things. Conclusion: All dogs are living things.', ['Follows', 'Does not follow', 'Follows only for some dogs', 'Cannot be decided'], 'Dog circle inside animal circle inside living circle.', M),
    Q('Some pens are books. All books are bags. Which follows?', ['Some pens are bags', 'All pens are bags', 'No pen is a bag', 'All bags are pens'], 'The pens that are books sit inside the bag circle.', M),
    Q('No cat is a dog. All dogs are pets. Which definitely follows?', ['Some pets are not cats', 'No cat is a pet', 'All pets are dogs', 'Some cats are pets'], 'The dogs are pets but not cats, so some pets are not cats.', M),
    Q('All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly.', ['Does not follow', 'Follows', 'All roses fade quickly', 'No rose fades'], 'The fast-fading flowers may lie outside the rose circle.', M),
    L('Statements, assumptions, conclusions', 'An **assumption** is what the speaker takes for granted. A **conclusion** must follow from the statement alone — no outside knowledge.\nOptions with extreme words ("only", "always", "all", "never") are usually wrong.'),
    Q('Statement: "Use our toothpaste for whiter teeth." Implicit assumption?', ['People want whiter teeth', 'All other toothpastes are harmful', 'Teeth are naturally white', 'People never brush'], 'An advert assumes the audience wants the benefit it offers.', M)
  ]);

  G.add('r_calendar', [
    L('Odd days — the whole calendar in one idea', 'Odd days = days left over after full weeks.\n- Ordinary year = 1 odd day; leap year = 2.\n- 100 years = 5 odd days, 200 = 3, 300 = 1, 400 = 0.\n- Leap year: divisible by 4; century years only if divisible by 400 (2000 yes, 1900 no).\nIf 1 Jan is Monday in an ordinary year, the next 1 Jan is Tuesday.'),
    Q('Is 1900 a leap year?', ['No', 'Yes', 'Only in the Indian calendar', 'Cannot say'], 'A century year must be divisible by 400.', M),
    Q('15 August 2026 is a Saturday. What day is 15 August 2027?', ['Sunday', 'Monday', 'Saturday', 'Friday'], 'There is no 29 February between them, so 365 days = 1 odd day.', M),
    Q('Today is Monday. What day is it after 61 days?', ['Saturday', 'Sunday', 'Friday', 'Tuesday'], '61 = 8 weeks + 5 days → Monday + 5 = Saturday.', M),
    L('Clocks', 'Angle between the hands = |30H − 5.5M| degrees (if it is over 180, use 360 minus it).\nThe hands overlap 22 times a day, are opposite 22 times, and at right angles 44 times.'),
    Q('Angle between the hands at 3:30?', ['75°', '90°', '60°', '105°'], '|30 × 3 − 5.5 × 30| = |90 − 165| = 75.', M),
    Q('Angle between the hands at 9:00?', ['90°', '270°', '45°', '180°'], '|270 − 0| = 270 → 360 − 270 = 90.', M),
    Q('How many times do the hour and minute hands coincide in a day?', ['22', '24', '12', '11'], 'Once every 65 5/11 minutes → 22 times in 24 hours.', M),
    F('Angle between clock hands', '|30H − 5.5M|'), F('Odd days in a leap year', '2'), F('Odd days in 400 years', '0')
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
