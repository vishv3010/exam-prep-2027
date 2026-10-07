/**
 * Maths — PSI Quantitative Aptitude + CDS Elementary Mathematics.
 * Convention: the correct option is always written FIRST (the UI shuffles).
 * mental: solvable in your head (allowed in Metro). pen: needs paper.
 */
(function (root) {
  'use strict';
  var G = root.GOAL, L = G.L, Q = G.Q, F = G.F;
  var M = { mental: 1 }, P = { pen: 1 };

  G.add('m_simplify', [
    L('BODMAS — the order', 'Brackets → Orders (powers, roots) → Division and Multiplication (left to right) → Addition and Subtraction (left to right).\n**Trap:** ÷ and × have equal rank, so work left to right. 24 ÷ 4 × 2 = 6 × 2 = 12, not 3.', '18 − 6 ÷ 3 × 2 = 18 − 2 × 2 = 18 − 4 = **14**'),
    Q('24 ÷ 4 × 2 = ?', ['12', '3', '16', '6'], 'Left to right: 24 ÷ 4 = 6, then 6 × 2 = 12.', M),
    Q('18 − 6 ÷ 3 × 2 + 1 = ?', ['15', '9', '5', '13'], '6 ÷ 3 = 2, × 2 = 4. 18 − 4 + 1 = 15.', M),
    L('Squares to 30 = free marks', 'Memorise squares up to 30 and cubes up to 15. They turn 2-minute questions into 10-second ones.\n- 11²=121 · 12²=144 · 13²=169 · 14²=196 · 15²=225\n- 16²=256 · 17²=289 · 18²=324 · 19²=361 · 20²=400\n- 21²=441 · 22²=484 · 23²=529 · 24²=576 · 25²=625\n- 26²=676 · 27²=729 · 28²=784 · 29²=841 · 30²=900'),
    F('13²', '169'), F('17²', '289'), F('19²', '361'), F('23²', '529'), F('24²', '576'),
    F('27²', '729'), F('29²', '841'), F('√784', '28'), F('√1089', '33'),
    F('7³', '343'), F('9³', '729'), F('11³', '1331'), F('12³', '1728'), F('13³', '2197'), F('15³', '3375'),
    L('Square of a number ending in 5', 'Take the digits before the 5 (call it n). Answer = n × (n + 1), then write 25 after it.\n- 35² → 3 × 4 = 12 → **1225**\n- 85² → 8 × 9 = 72 → **7225**\n- 115² → 11 × 12 = 132 → **13225**'),
    Q('65² = ?', ['4225', '4125', '3625', '4325'], '6 × 7 = 42, then write 25 → 4225.', M),
    Q('105² = ?', ['11025', '10025', '11125', '10525'], '10 × 11 = 110, then 25 → 11025.', M),
    L('Multiply by 11, 5 and 25 fast', '- **×11** (2-digit ab): write a, (a + b), b. 43 × 11 → 4 | 7 | 3 = **473**. If a + b ≥ 10, carry: 78 × 11 → 7 | 15 | 8 → **858**.\n- **×5**: multiply by 10, then halve. 468 × 5 = 4680 ÷ 2 = **2340**.\n- **×25**: multiply by 100, then divide by 4. 36 × 25 = 3600 ÷ 4 = **900**.'),
    Q('78 × 11 = ?', ['858', '848', '788', '868'], '7 | 7+8=15 | 8 → carry the 1 → 858.', M),
    Q('64 × 25 = ?', ['1600', '1500', '1625', '1640'], '6400 ÷ 4 = 1600.', M),
    L('Fractions ↔ percent: learn once, use forever', '1/2 = 50% · 1/3 = 33.33% · 1/4 = 25% · 1/5 = 20% · 1/6 = 16.67% · 1/7 ≈ 14.29% · 1/8 = 12.5% · 1/9 ≈ 11.11% · 1/10 = 10% · 1/11 ≈ 9.09% · 1/12 ≈ 8.33% · 1/16 = 6.25% · 1/20 = 5%\nThese appear in percentages, profit–loss, interest and DI. This one table saves minutes in every paper.'),
    F('1/8 as %', '12.5%'), F('1/6 as %', '16.67%'), F('1/7 as %', '≈ 14.29%'), F('1/9 as %', '≈ 11.11%'),
    F('1/11 as %', '≈ 9.09%'), F('1/12 as %', '≈ 8.33%'), F('3/8 as %', '37.5%'), F('5/6 as %', '83.33%'),
    Q('(0.5 × 0.5 + 0.5) ÷ 0.25 = ?', ['3', '1.5', '2', '0.75'], '0.25 + 0.5 = 0.75, and 0.75 ÷ 0.25 = 3.', M),
    Q('√0.0081 = ?', ['0.09', '0.9', '0.009', '0.81'], '√81 = 9. 0.0081 has 4 decimal places, so the root has 2 → 0.09.', M),
    Q('Which is largest: 2/3, 3/5, 5/8, 7/11?', ['2/3', '3/5', '5/8', '7/11'], 'As decimals: 0.667, 0.6, 0.625, 0.636.'),
    Q('256^(1/4) × 27^(1/3) = ?', ['12', '16', '9', '24'], '256^(1/4) = 4 and 27^(1/3) = 3, so 4 × 3 = 12.', M),
    Q('1 / (√2 + 1) simplifies to?', ['√2 − 1', '√2 + 1', '1/√2', '2 − √2'], 'Multiply top and bottom by (√2 − 1). The denominator becomes 2 − 1 = 1.'),
    Q('999 × 999 = ?', ['998001', '999001', '998999', '990001'], '(1000 − 1)² = 1,000,000 − 2,000 + 1 = 998,001.', M)
  ]);

  G.add('m_percent', [
    L('Percent means "per 100"', 'x% of y = x × y ÷ 100.\n**Swap trick:** x% of y = y% of x. 8% of 50 = 50% of 8 = **4**.\nTo find 10%, move the decimal point one place left. 15% = 10% + 5% (5% is half of 10%).', '15% of 640 → 10% = 64, 5% = 32 → **96**'),
    Q('15% of 640 = ?', ['96', '86', '106', '92'], '10% = 64, 5% = 32, total 96.', M),
    Q('16% of 25 = ?', ['4', '2.5', '6.25', '5'], 'Swap: 25% of 16 = 4.', M),
    L('Increase and decrease by a percentage', 'Increase by r% → multiply by (1 + r/100). Decrease by r% → multiply by (1 − r/100).\n**Percent change = change ÷ ORIGINAL × 100.** Always divide by the old value.', 'Price 400 → 500 is 100 on 400 = **25% up**. Price 500 → 400 is 100 on 500 = **20% down**.'),
    Q('A price rises from ₹400 to ₹500. Percentage increase?', ['25%', '20%', '100%', '10%'], '100 ÷ 400 × 100 = 25%. Divide by the original.', M),
    Q('A salary of ₹30,000 is cut by 10%. New salary?', ['₹27,000', '₹29,000', '₹33,000', '₹20,000'], '30,000 × 0.9 = 27,000.', M),
    L('Two changes in a row: a + b + ab/100', 'Change a% then b% (write decreases as minus) = net **a + b + ab/100** %.\n- +20% then +10% → 20 + 10 + 2 = **+32%**\n- +10% then −10% → 10 − 10 − 1 = **−1%** (never zero!)\n- −20% then +25% → −20 + 25 − 5 = **0%**'),
    Q('A price is raised 10% and then reduced 10%. Net effect?', ['1% decrease', 'No change', '1% increase', '2% decrease'], '10 − 10 + (10 × −10)/100 = −1%.', M),
    Q('A population grows 20% and then 10%. Total growth?', ['32%', '30%', '22%', '35%'], '20 + 10 + 200/100 = 32%.', M),
    L('"A is what % more than B?"', 'In more/less questions, divide by the thing after "than".\nIf A is 25% more than B, then B is 25/125 = **20% less** than A.\nRule: if A is r% more than B, B is r/(100 + r) × 100 % less than A.'),
    Q('A earns 25% more than B. B earns how much less than A?', ['20%', '25%', '15%', '30%'], '25/125 × 100 = 20%.', M),
    Q('Sugar becomes 25% dearer. By what % must a family cut consumption to keep spending the same?', ['20%', '25%', '15%', '12.5%'], 'r/(100 + r) = 25/125 = 20%.', M),
    Q('A student needs 40% to pass. He scores 178 and fails by 22 marks. Maximum marks?', ['500', '450', '400', '550'], 'Pass mark = 178 + 22 = 200 = 40%, so 100% = 500.', M),
    Q('60% of a number is 42. The number is?', ['70', '72', '65', '84'], '42 ÷ 0.6 = 70.', M),
    Q('A’s salary is 40% of B’s, and B’s is 25% of C’s. A’s salary is what % of C’s?', ['10%', '15%', '65%', '12.5%'], '0.4 × 0.25 = 0.10 → 10%.', M),
    Q('In a two-candidate election, the winner gets 60% of valid votes and wins by 1,200. Total valid votes?', ['6,000', '5,000', '4,800', '7,200'], 'Margin = 60% − 40% = 20% = 1,200, so 100% = 6,000.', M),
    F('Net of +a% then +b%', 'a + b + ab/100'),
    F('A is r% more than B → B is ? less than A', 'r/(100 + r) × 100 %'),
    F('Percent change divides by…', 'the ORIGINAL (old) value')
  ]);

  G.add('m_number', [
    L('Divisibility rules — used in every paper', '- **2**: last digit even · **5**: ends in 0 or 5 · **10**: ends in 0\n- **3**: digit sum divisible by 3 · **9**: digit sum divisible by 9\n- **4**: last 2 digits divisible by 4 · **8**: last 3 digits divisible by 8\n- **6**: divisible by 2 AND 3 · **12**: by 3 AND 4\n- **11**: (sum of digits in odd places) − (sum in even places) = 0 or a multiple of 11'),
    Q('Which number is divisible by 9?', ['3,456', '4,567', '2,345', '7,891'], '3 + 4 + 5 + 6 = 18, which is divisible by 9.', M),
    Q('Which number is divisible by 11?', ['1,331', '1,234', '2,345', '4,563'], '1331: (1 + 3) − (3 + 1) = 0.', M),
    Q('Which number is divisible by 8?', ['17,128', '13,412', '22,212', '10,604'], 'Check the last three digits: 128 ÷ 8 = 16. 412, 212 and 604 are not multiples of 8.', M),
    Q('If 52x6 is divisible by 9, the digit x = ?', ['5', '4', '6', '3'], '5 + 2 + x + 6 = 13 + x must be 18, so x = 5.', M),
    L('HCF and LCM', '**HCF** = the biggest number that divides all of them. **LCM** = the smallest number they all divide into.\nFor two numbers: **HCF × LCM = product of the numbers**.\nWord clues: "largest size / greatest number that divides" → HCF. "Together again / least time / smallest number divisible by" → LCM.', '12 and 18: HCF = 6, LCM = 36. Check: 6 × 36 = 216 = 12 × 18 ✓'),
    Q('HCF of 36 and 48?', ['12', '6', '24', '144'], '36 = 2² × 3², 48 = 2⁴ × 3 → HCF = 2² × 3 = 12.', M),
    Q('LCM of 12, 15 and 20?', ['60', '120', '180', '240'], '12 = 2² × 3, 15 = 3 × 5, 20 = 2² × 5 → LCM = 2² × 3 × 5 = 60.', M),
    Q('Two numbers have HCF 8 and LCM 96. One is 32. The other?', ['24', '12', '48', '16'], 'Product = 8 × 96 = 768, and 768 ÷ 32 = 24.', M),
    Q('Three bells ring every 6, 8 and 12 minutes. They ring together at 9:00. When next together?', ['9:24', '9:48', '9:12', '10:00'], 'LCM(6, 8, 12) = 24 minutes.', M),
    Q('Greatest number that divides 43, 91 and 183 leaving the same remainder each time?', ['4', '8', '12', '6'], 'Use the differences: 48, 92, 140. HCF(48, 92, 140) = 4.', P),
    L('Unit digits of powers', 'Unit digits of powers repeat in cycles of 4. Find the power mod 4 (if the remainder is 0, use 4).\n- 2: 2, 4, 8, 6 · 3: 3, 9, 7, 1 · 7: 7, 9, 3, 1 · 8: 8, 4, 2, 6\n- 4: 4, 6 · 9: 9, 1 · 0, 1, 5, 6 always stay themselves', 'Unit digit of 7²³: 23 mod 4 = 3 → third in (7, 9, 3, 1) → **3**'),
    Q('Unit digit of 3⁶⁵?', ['3', '9', '7', '1'], '65 mod 4 = 1 → first in the cycle (3, 9, 7, 1) → 3.', M),
    Q('Unit digit of 2¹⁰⁰?', ['6', '2', '4', '8'], '100 mod 4 = 0 → last in the cycle (2, 4, 8, 6) → 6.', M),
    Q('Remainder when 2³¹ is divided by 5?', ['3', '1', '2', '4'], 'Unit digit of 2³¹: 31 mod 4 = 3 → 8. 8 ÷ 5 leaves 3.', M),
    L('Types of numbers', '- **Prime**: exactly 2 factors (2, 3, 5, 7, 11…). 2 is the only even prime. 1 is NOT prime.\n- **Co-prime**: HCF = 1 (e.g. 8 and 15).\n- There are **25** primes below 100.\n- Sum of first n natural numbers = n(n + 1)/2. Sum of first n odd numbers = n².\n- **Number of factors**: write N = aᵖ × bᵠ … → factors = (p + 1)(q + 1)…'),
    F('How many primes below 100?', '25'), F('Is 1 a prime number?', 'No — a prime has exactly two factors'),
    F('1 + 2 + … + n', 'n(n + 1)/2'), F('Sum of the first n odd numbers', 'n²'), F('HCF × LCM =', 'product of the two numbers'),
    Q('1 + 2 + 3 + … + 50 = ?', ['1275', '1250', '2550', '1225'], '50 × 51 ÷ 2 = 1275.', M),
    Q('Number of factors of 72?', ['12', '10', '8', '14'], '72 = 2³ × 3² → (3 + 1)(2 + 1) = 12.', M)
  ]);

  G.add('m_ratio', [
    L('Ratio basics', 'a : b means "for every a of the first there are b of the second". Total parts = a + b.\nTo split an amount in a : b, the first share is a/(a + b) of it.', '₹1,200 in 3 : 5 → 8 parts → one part = 150 → **₹450 and ₹750**'),
    Q('Divide ₹1,200 in the ratio 3 : 5. Smaller share?', ['₹450', '₹400', '₹750', '₹480'], '8 parts, one part = 150 → 3 × 150 = 450.', M),
    Q('A : B = 2 : 3 and B : C = 4 : 5. A : B : C = ?', ['8 : 12 : 15', '2 : 3 : 5', '8 : 12 : 5', '6 : 9 : 15'], 'Make B equal: multiply the first ratio by 4, the second by 3 → 8 : 12 and 12 : 15.', M),
    L('Proportion and the cross rule', 'a : b = c : d means a × d = b × c.\n- **Fourth proportional** to a, b, c = bc/a\n- **Mean proportional** of a and b = √(ab)\n- **Third proportional** to a, b = b²/a'),
    Q('Mean proportional between 4 and 16?', ['8', '10', '12', '6'], '√(4 × 16) = 8.', M),
    Q('Fourth proportional to 3, 6 and 9?', ['18', '12', '27', '15'], 'bc/a = 6 × 9 ÷ 3 = 18.', M),
    L('Partnership', 'Profit is shared in the ratio of **money × time** for each partner.', 'A puts ₹5,000 for 12 months, B puts ₹6,000 for 10 months → 60,000 : 60,000 = **1 : 1**'),
    Q('A invests ₹4,000 for 12 months, B ₹6,000 for 6 months. Profit ₹3,500. A’s share?', ['₹2,000', '₹1,500', '₹1,750', '₹2,100'], '48,000 : 36,000 = 4 : 3. A gets 4/7 × 3,500 = 2,000.', P),
    L('Mixtures — alligation in one picture', 'Mixing a cheap thing (value a) with a dear thing (value b) to get mean m:\n**cheap : dear = (b − m) : (m − a)**\nWrite the two prices on top, the mean in the middle, and cross-subtract.', 'Rice at ₹20 and ₹30 mixed to give ₹26 → (30 − 26) : (26 − 20) = **4 : 6 = 2 : 3**'),
    Q('Tea at ₹60/kg and ₹90/kg is mixed to get ₹70/kg tea. Ratio cheap : dear?', ['2 : 1', '1 : 2', '3 : 1', '1 : 1'], '(90 − 70) : (70 − 60) = 20 : 10 = 2 : 1.', M),
    Q('40 L of mixture has milk : water = 3 : 1. How much water must be added to make it 3 : 2?', ['10 L', '5 L', '8 L', '12 L'], 'Milk 30, water 10. For 3 : 2 water must be 20 → add 10 L.', M),
    Q('Two numbers are in ratio 3 : 4. Adding 5 to each makes the ratio 4 : 5. The numbers?', ['15 and 20', '12 and 16', '9 and 12', '18 and 24'], '(3x + 5)/(4x + 5) = 4/5 → 15x + 25 = 16x + 20 → x = 5.', P),
    F('Alligation: cheap : dear', '(dear − mean) : (mean − cheap)'),
    F('Mean proportional of a and b', '√(ab)'),
    F('Partnership profit ratio', 'money × time')
  ]);

  G.add('m_avg', [
    L('Average = total ÷ count', 'Most average questions are really "find the total".\n**Total = average × count.** Work with totals, never with averages directly.', 'Average of 5 numbers is 20. One is removed and the average becomes 18. Removed = 100 − 72 = **28**'),
    Q('Average of 5 numbers is 20. One is removed and the rest average 18. Removed number?', ['28', '20', '2', '38'], 'Total 100, remaining 4 × 18 = 72, removed 28.', M),
    Q('Average of the first 10 natural numbers?', ['5.5', '5', '6', '10'], 'Sum 55 ÷ 10.', M),
    Q('A batsman averages 40 after 10 innings. Runs needed in the 11th to make the average 42?', ['62', '52', '42', '60'], 'Needs 11 × 42 = 462; has 400 → 62.', M),
    L('Ages — set up with today', 'Let present ages be x and y. "n years ago" → subtract n from both. "After n years" → add n to both.\nThe **difference** between two people’s ages never changes.'),
    Q('A father is 30 years older than his son. In 5 years he will be 3 times as old as the son. Son’s present age?', ['10', '15', '12', '5'], 'F = S + 30. S + 35 = 3(S + 5) → S + 35 = 3S + 15 → S = 10.', P),
    Q('A class of 30 averages 15 years. Including the teacher the average is 16. Teacher’s age?', ['46', '31', '45', '40'], '31 × 16 = 496, 30 × 15 = 450 → 46.', M),
    Q('The average of 4 consecutive even numbers is 27. The largest?', ['30', '28', '32', '26'], 'The numbers are 24, 26, 28, 30.', M),
    F('Total from average', 'average × count'),
    F('What never changes in age problems?', 'the difference between two ages')
  ]);

  G.add('m_pl', [
    L('Profit and loss are on cost price', 'Profit % and loss % are calculated on **CP (cost price)**, never on SP.\nSP = CP × (1 + p/100) or CP × (1 − l/100).', 'CP 800, sold for 1,000 → profit 200 on 800 = **25%**'),
    Q('CP ₹800, SP ₹1,000. Profit %?', ['25%', '20%', '30%', '15%'], '200 ÷ 800 = 25%.', M),
    Q('Selling an article for ₹540 gives a 10% loss. Cost price?', ['₹600', '₹594', '₹590', '₹486'], 'SP = 0.9 × CP → CP = 540 ÷ 0.9 = 600.', M),
    L('Marked price and discount', 'Discount is on **MP (marked price)**. SP = MP × (1 − d/100).\nTwo discounts d1 then d2 → net = d1 + d2 − d1·d2/100.', 'Discounts of 20% and 10% → 20 + 10 − 2 = **28%** (not 30%)'),
    Q('Successive discounts of 20% and 10% equal a single discount of?', ['28%', '30%', '27%', '25%'], '20 + 10 − 200/100 = 28%.', M),
    Q('MP ₹1,500, discount 20%. SP?', ['₹1,200', '₹1,300', '₹1,180', '₹1,250'], '1,500 × 0.8 = 1,200.', M),
    Q('A shopkeeper marks goods 40% above CP and gives 25% discount. Profit %?', ['5%', '15%', '10%', '0%'], 'CP = 100 → MP 140 → SP = 140 × 0.75 = 105 → 5%.', M),
    Q('By selling 12 pens a man gains the selling price of 4 pens. Gain %?', ['50%', '33.33%', '25%', '40%'], 'SP(12) − CP(12) = SP(4) → CP(12) = SP(8) → gain 4 on 8 = 50%.', P),
    Q('A shopkeeper sells at cost price but uses a 900 g weight for 1 kg. Gain %?', ['11.11%', '10%', '9.09%', '12.5%'], 'He gains 100 g on every 900 g = 1/9 = 11.11%.', M),
    Q('Two items each sell for ₹990 — one at 10% profit, one at 10% loss. Overall?', ['1% loss', 'No profit, no loss', '1% gain', '2% loss'], 'Same SP with x% up and x% down always gives a loss of x²/100 % = 1%.', M),
    F('Profit % is calculated on…', 'Cost Price'),
    F('Discount % is calculated on…', 'Marked Price'),
    F('Same SP, x% gain on one and x% loss on the other →', 'loss of x²/100 %')
  ]);

  G.add('m_interest', [
    L('Simple interest', 'SI = P × R × T ÷ 100. The same interest every year.\nAmount A = P + SI.', '₹5,000 at 8% for 3 years → 5,000 × 8 × 3 ÷ 100 = **₹1,200**'),
    Q('SI on ₹5,000 at 8% p.a. for 3 years?', ['₹1,200', '₹1,000', '₹1,400', '₹1,250'], '5,000 × 8 × 3 ÷ 100.', M),
    Q('A sum doubles in 8 years at simple interest. Rate?', ['12.5%', '10%', '8%', '15%'], 'Interest equals P in 8 years → R = 100 ÷ 8 = 12.5%.', M),
    L('Compound interest', 'A = P(1 + R/100)ᵀ. Interest earns interest.\n**2-year shortcut:** CI − SI for 2 years = P × (R/100)².\nOver 2 years at R%, the effective CI rate = 2R + R²/100 % (same as two successive % changes).', '₹10,000 at 10% for 2 years → 10,000 × 1.21 = 12,100 → CI = **₹2,100**'),
    Q('CI on ₹10,000 at 10% p.a. for 2 years?', ['₹2,100', '₹2,000', '₹2,200', '₹1,100'], '10,000 × 1.1² = 12,100.', M),
    Q('Difference between CI and SI on ₹8,000 for 2 years at 5%?', ['₹20', '₹40', '₹10', '₹25'], 'P × (R/100)² = 8,000 × 0.0025 = 20.', M),
    Q('At what CI rate does ₹6,250 become ₹7,290 in 2 years?', ['8%', '9%', '7%', '10%'], '7,290 ÷ 6,250 = 1.1664 = 1.08².', P),
    Q('At CI a sum becomes ₹1,210 in 2 years and ₹1,331 in 3 years. Rate?', ['10%', '11%', '12%', '9%'], 'One year’s growth: 1,331 ÷ 1,210 = 1.1 → 10%.', M),
    F('CI − SI for 2 years', 'P × (R/100)²'),
    F('Simple interest formula', 'P × R × T ÷ 100'),
    F('Compound amount', 'P(1 + R/100)ᵀ')
  ]);

  G.add('m_tw', [
    L('Time and work — the LCM method', 'Skip fractions. Let total work = LCM of the days.\nA takes 10 days, B takes 15 → work = 30 units. A does 3/day, B 2/day → together 5/day → **6 days**.'),
    Q('A finishes a job in 10 days, B in 15 days. Together?', ['6 days', '12.5 days', '5 days', '8 days'], 'Work = 30 units; 3 + 2 = 5 per day → 6 days.', M),
    Q('A and B together take 12 days; A alone takes 20. B alone?', ['30 days', '8 days', '32 days', '24 days'], 'Work 60: A + B = 5/day, A = 3/day → B = 2/day → 30 days.', M),
    Q('12 men finish a job in 10 days. How many days for 15 men?', ['8', '12', '9', '7.5'], 'Men × days is constant: 120 ÷ 15 = 8.', M),
    L('Pipes and cisterns', 'Same as work, but an **outlet pipe does negative work**.\nFills in 6 h, empties in 9 h → tank = 18 units, +3 − 2 = 1 per hour → **18 hours**.'),
    Q('Pipe A fills a tank in 6 h; pipe B empties it in 9 h. With both open, time to fill?', ['18 hours', '15 hours', '3.6 hours', '12 hours'], 'Tank = 18 units: +3 − 2 = 1 per hour.', M),
    Q('A does a job in 20 days, B in 30. They work together for 6 days, then A leaves. B finishes the rest in?', ['15 days', '12 days', '10 days', '18 days'], 'Work 60: together 5/day × 6 = 30 done. B at 2/day does 30 in 15 days.', P),
    Q('A is twice as efficient as B. Together they finish in 14 days. A alone?', ['21 days', '28 days', '42 days', '20 days'], 'Efficiency 2 : 1, so work = 3 × 14 = 42 units. A at 2/day → 21 days.', P),
    F('M1 × D1 × H1 =', 'M2 × D2 × H2 (men × days × hours is constant for the same work)'),
    F('An outlet pipe counts as…', 'negative work')
  ]);

  G.add('m_tsd', [
    L('Speed = distance ÷ time', 'km/h → m/s: multiply by **5/18**. m/s → km/h: multiply by **18/5**.\n**Average speed** over equal distances at a and b = **2ab/(a + b)**, NOT (a + b)/2.', '60 km/h there, 40 km/h back → 2 × 60 × 40 ÷ 100 = **48 km/h**'),
    Q('72 km/h in m/s?', ['20', '25', '18', '15'], '72 × 5/18 = 20.', M),
    Q('A car goes at 60 km/h and returns the same way at 40 km/h. Average speed?', ['48 km/h', '50 km/h', '45 km/h', '52 km/h'], '2 × 60 × 40 ÷ 100 = 48.', M),
    L('Trains', 'Crossing a **pole or a man** → distance = train length.\nCrossing a **platform or bridge** → distance = train + platform.\nTwo trains: opposite directions → add speeds; same direction → subtract.'),
    Q('A 150 m train at 54 km/h passes a pole in?', ['10 s', '15 s', '9 s', '12 s'], '54 km/h = 15 m/s; 150 ÷ 15 = 10 s.', M),
    Q('A 200 m train at 72 km/h crosses a 300 m platform in?', ['25 s', '15 s', '20 s', '10 s'], '20 m/s over 500 m → 25 s.', M),
    Q('Trains of 100 m and 150 m run in opposite directions at 40 and 50 km/h. Time to cross each other?', ['10 s', '12 s', '8 s', '15 s'], 'Relative speed 90 km/h = 25 m/s; distance 250 m → 10 s.', P),
    L('Boats and streams', 'Downstream = boat + stream. Upstream = boat − stream.\nBoat = (down + up)/2. Stream = (down − up)/2.'),
    Q('A boat goes 12 km/h downstream and 8 km/h upstream. Speed of the stream?', ['2 km/h', '4 km/h', '10 km/h', '3 km/h'], '(12 − 8) ÷ 2 = 2.', M),
    Q('At 4 km/h a man is 10 min late; at 5 km/h he is 5 min early. Distance?', ['5 km', '6 km', '4 km', '10 km'], 'Time difference = 15 min = 1/4 h. d/4 − d/5 = 1/4 → d/20 = 1/4 → d = 5.', P),
    F('km/h → m/s', '× 5/18'),
    F('Average speed for equal distances at a and b', '2ab / (a + b)'),
    F('Train crossing a platform: distance =', 'train length + platform length'),
    F('Boat speed from down and up speeds', '(down + up) / 2')
  ]);

  G.add('m_algebra', [
    L('Identities that solve half of CDS algebra', '- (a + b)² = a² + 2ab + b²\n- (a − b)² = a² − 2ab + b²\n- a² − b² = (a + b)(a − b)\n- (a + b)³ = a³ + b³ + 3ab(a + b)\n- a³ + b³ = (a + b)(a² − ab + b²)\n- a³ − b³ = (a − b)(a² + ab + b²)\n- If a + b + c = 0, then **a³ + b³ + c³ = 3abc**'),
    F('(a + b)²', 'a² + 2ab + b²'), F('a³ + b³', '(a + b)(a² − ab + b²)'), F('a³ − b³', '(a − b)(a² + ab + b²)'),
    F('If a + b + c = 0, a³ + b³ + c³ =', '3abc'), F('x² + 1/x² in terms of (x + 1/x)', '(x + 1/x)² − 2'),
    Q('If x + 1/x = 4, then x² + 1/x² = ?', ['14', '16', '18', '12'], '(x + 1/x)² − 2 = 16 − 2 = 14.', M),
    Q('If a + b = 7 and ab = 12, then a² + b² = ?', ['25', '37', '49', '24'], '(a + b)² − 2ab = 49 − 24 = 25.', M),
    Q('101² − 99² = ?', ['400', '200', '2', '404'], '(101 + 99)(101 − 99) = 200 × 2 = 400.', M),
    Q('If a + b + c = 0, then (a³ + b³ + c³)/abc = ?', ['3', '0', '1', 'abc'], 'When a + b + c = 0, a³ + b³ + c³ = 3abc.', M),
    L('Quadratic equations', 'ax² + bx + c = 0. **Sum of roots = −b/a. Product = c/a.**\nDiscriminant D = b² − 4ac: D > 0 → two real roots, D = 0 → equal roots, D < 0 → no real roots.'),
    Q('Sum of the roots of 2x² − 8x + 6 = 0?', ['4', '−4', '3', '8'], 'Sum = −b/a = 8/2 = 4.', M),
    Q('For what k does x² − 6x + k = 0 have equal roots?', ['9', '6', '36', '3'], 'D = 36 − 4k = 0 → k = 9.', M),
    Q('Roots of x² − 5x + 6 = 0?', ['2 and 3', '−2 and −3', '1 and 6', '−1 and 6'], 'Factor: (x − 2)(x − 3).', M),
    L('Two linear equations', 'a1x + b1y = c1 and a2x + b2y = c2:\n- a1/a2 ≠ b1/b2 → exactly one solution\n- a1/a2 = b1/b2 ≠ c1/c2 → no solution (parallel lines)\n- all three ratios equal → infinitely many solutions'),
    Q('2x + 3y = 5 and 4x + 6y = 12 have:', ['No solution', 'One solution', 'Infinitely many solutions', 'Two solutions'], '2/4 = 3/6 ≠ 5/12 → parallel lines.', M),
    Q('If 3x − 2 = 2x + 5, then x = ?', ['7', '3', '5', '−7'], 'Subtract 2x from both sides and add 2: x = 7.', M),
    Q('Remainder when x³ − 2x² + 4x − 5 is divided by (x − 1)?', ['−2', '2', '0', '−1'], 'Remainder theorem: put x = 1 → 1 − 2 + 4 − 5 = −2.', M),
    F('Sum of roots of ax² + bx + c = 0', '−b/a'), F('Product of roots', 'c/a'),
    F('Remainder theorem: f(x) ÷ (x − a) leaves', 'f(a)')
  ]);

  G.add('m_geometry', [
    L('Lines and angles', '- Angles on a straight line add to 180°. Around a point, 360°.\n- Vertically opposite angles are equal.\n- Parallel lines cut by a transversal: alternate angles equal, corresponding angles equal, co-interior angles add to 180°.'),
    L('Triangles — the must-knows', '- Angles add to 180°. An exterior angle = sum of the two opposite interior angles.\n- Pythagoras: hypotenuse² = sum of the squares of the other two sides.\n- Triples: **3-4-5, 5-12-13, 8-15-17, 7-24-25** (and multiples like 6-8-10).\n- Any two sides together are longer than the third.\n- The centroid divides each median in **2 : 1**.'),
    F('Pythagorean triples', '3-4-5 · 5-12-13 · 8-15-17 · 7-24-25'),
    F('The centroid divides a median in ratio', '2 : 1 (from the vertex)'),
    F('Exterior angle of a triangle =', 'sum of the two opposite interior angles'),
    Q('Two angles of a triangle are 50° and 60°. The third?', ['70°', '80°', '60°', '90°'], '180 − 110 = 70.', M),
    Q('A right triangle has legs 9 and 12. Hypotenuse?', ['15', '13', '17', '21'], 'It is 3-4-5 × 3.', M),
    Q('Which can be the sides of a triangle?', ['5, 6, 10', '2, 3, 6', '1, 2, 3', '4, 4, 9'], 'Any two sides must add to more than the third: 5 + 6 > 10.', M),
    L('Polygons', 'Sum of interior angles of an n-sided polygon = **(n − 2) × 180°**.\nEach exterior angle of a regular polygon = **360°/n**. Exterior angles always add to 360°.'),
    Q('Each interior angle of a regular hexagon?', ['120°', '108°', '135°', '144°'], 'Exterior = 360/6 = 60 → interior = 120.', M),
    Q('Each exterior angle of a regular polygon is 30°. Number of sides?', ['12', '10', '8', '6'], '360 ÷ 30 = 12.', M),
    L('Circles', '- Angle at the centre = 2 × angle at the circumference on the same arc.\n- The angle in a semicircle is 90°.\n- Opposite angles of a cyclic quadrilateral add to 180°.\n- A tangent is perpendicular to the radius at the point of contact.\n- Two tangents from an outside point are equal in length.'),
    Q('An arc subtends 80° at the centre. Angle it subtends at the circumference?', ['40°', '80°', '160°', '20°'], 'Half the central angle.', M),
    Q('One angle of a cyclic quadrilateral is 70°. The opposite angle?', ['110°', '70°', '90°', '140°'], 'Opposite angles add to 180°.', M),
    Q('A point is 13 cm from the centre of a circle of radius 5 cm. Length of the tangent from it?', ['12 cm', '8 cm', '18 cm', '10 cm'], 'Tangent ⟂ radius, so √(13² − 5²) = 12.', M),
    F('Angle in a semicircle', '90°'),
    F('Cyclic quadrilateral: opposite angles', 'add to 180°'),
    F('Sum of interior angles of an n-gon', '(n − 2) × 180°')
  ]);

  G.add('m_mensuration', [
    L('Area formulas', '- Rectangle l × b · Square a² · Triangle ½ × base × height\n- Equilateral triangle **(√3/4)a²**\n- Circle πr², circumference 2πr\n- Trapezium ½ × (sum of parallel sides) × height\n- Rhombus ½ × d1 × d2\n- Heron: √(s(s − a)(s − b)(s − c)), where s = half the perimeter'),
    L('Volume and surface area', '- Cube a³, surface 6a²\n- Cuboid lbh, surface 2(lb + bh + hl)\n- Cylinder πr²h, curved surface 2πrh\n- Cone ⅓πr²h, curved surface πrl (l = slant height)\n- Sphere (4/3)πr³, surface 4πr²\n- Hemisphere (2/3)πr³, total surface 3πr²'),
    F('Area of an equilateral triangle', '(√3/4) a²'), F('Volume of a cone', '⅓ πr²h'), F('Volume of a sphere', '(4/3) πr³'),
    F('Curved surface of a cylinder', '2πrh'), F('Area of a rhombus', '½ × d1 × d2'), F('Surface area of a sphere', '4πr²'),
    Q('Area of a circle of radius 7 cm? (π = 22/7)', ['154 cm²', '44 cm²', '144 cm²', '49 cm²'], '22/7 × 49 = 154.', M),
    Q('Volume of a cube with edge 5 cm?', ['125 cm³', '25 cm³', '150 cm³', '100 cm³'], '5³ = 125.', M),
    Q('Area of a triangle with sides 13, 14 and 15?', ['84', '90', '96', '78'], 's = 21 → √(21 × 8 × 7 × 6) = √7056 = 84.', P),
    Q('If the radius of a circle is doubled, its area becomes?', ['4 times', '2 times', '8 times', 'unchanged'], 'Area ∝ r², and 2² = 4.', M),
    Q('Volume of a cylinder with radius 7 cm and height 10 cm? (π = 22/7)', ['1540 cm³', '440 cm³', '1440 cm³', '770 cm³'], '22/7 × 49 × 10 = 1540.', P),
    Q('The diagonal of a square is 10 cm. Its area?', ['50 cm²', '100 cm²', '25 cm²', '70 cm²'], 'Area = d²/2 = 100/2.', M),
    Q('A sphere of radius 3 cm is melted into a cylinder of radius 3 cm. Height of the cylinder?', ['4 cm', '3 cm', '6 cm', '2 cm'], '(4/3)π × 27 = π × 9 × h → h = 4.', P)
  ]);

  G.add('m_trig', [
    L('Ratios — SOH CAH TOA', 'sin = opposite/hypotenuse · cos = adjacent/hypotenuse · tan = opposite/adjacent.\ncosec = 1/sin, sec = 1/cos, cot = 1/tan.'),
    L('The table you must know cold', 'Angles 0°, 30°, 45°, 60°, 90°:\n- sin: 0, 1/2, 1/√2, √3/2, 1\n- cos: 1, √3/2, 1/√2, 1/2, 0\n- tan: 0, 1/√3, 1, √3, not defined\nTrick: sin runs √0/2, √1/2, √2/2, √3/2, √4/2. cos is the same list backwards.'),
    F('sin 30°', '1/2'), F('cos 60°', '1/2'), F('tan 60°', '√3'), F('sin 45°', '1/√2'), F('tan 30°', '1/√3'), F('cos 30°', '√3/2'),
    L('Identities', '- sin²θ + cos²θ = 1\n- 1 + tan²θ = sec²θ\n- 1 + cot²θ = cosec²θ\n- sin(90° − θ) = cos θ, tan(90° − θ) = cot θ'),
    F('1 + tan²θ =', 'sec²θ'), F('sin(90° − θ) =', 'cos θ'),
    Q('sin²30° + cos²30° = ?', ['1', '1/2', '3/4', '√3'], 'sin² + cos² = 1 for every angle.', M),
    Q('tan 45° + sin 30° = ?', ['3/2', '1', '2', '1/2'], '1 + 1/2.', M),
    Q('If sin θ = 3/5 and θ is acute, cos θ = ?', ['4/5', '3/4', '5/3', '5/4'], 'A 3-4-5 triangle: adjacent side 4.', M),
    Q('sec²θ − tan²θ = ?', ['1', '0', '2', 'sec θ'], 'From 1 + tan²θ = sec²θ.', M),
    Q('sin 20° ÷ cos 70° = ?', ['1', '0', 'sin 50°', '2'], 'cos 70° = sin(90° − 70°) = sin 20°.', M),
    L('Heights and distances', 'Draw the right triangle. The angle of elevation is measured up from the horizontal.\ntan(angle) = height ÷ horizontal distance.\nAt 45°, height = distance. At 30°, height = distance/√3. At 60°, height = distance × √3.'),
    Q('A tower’s shadow equals its height. The sun’s elevation?', ['45°', '30°', '60°', '90°'], 'tan θ = 1 → 45°.', M),
    Q('From 30 m away from a tower’s foot, the elevation of its top is 60°. Height?', ['30√3 m', '10√3 m', '30 m', '15 m'], 'h = 30 × tan 60° = 30√3.', M)
  ]);

  G.add('m_stats', [
    L('Mean, median, mode', '- **Mean** = sum ÷ count\n- **Median** = middle value after sorting (average of the two middle values if the count is even)\n- **Mode** = the most frequent value\n- Empirical relation: **Mode = 3 Median − 2 Mean**'),
    Q('Median of 3, 7, 1, 9, 5?', ['5', '7', '3', '4'], 'Sorted: 1, 3, 5, 7, 9 → the middle is 5.', M),
    Q('Median of 2, 4, 6, 8?', ['5', '4', '6', '4.5'], '(4 + 6) ÷ 2.', M),
    Q('Mode of 2, 3, 3, 5, 7, 3, 5?', ['3', '5', '2', '7'], '3 appears three times.', M),
    Q('Mean is 20 and median is 22. Approximate mode?', ['26', '24', '18', '21'], '3 × 22 − 2 × 20 = 26.', M),
    Q('If every value in a data set is increased by 5, the mean:', ['increases by 5', 'stays the same', 'becomes 5 times', 'decreases by 5'], 'Adding a constant shifts the mean by that constant.', M),
    F('Mode (empirical formula)', '3 Median − 2 Mean'),
    F('Median of an even number of values', 'average of the two middle values')
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
