# GOAL — Gujarat PSI + CDS, 55 / 45

**Open:** `site/index.html` (live: https://vishv3010.github.io/exam-prep-2027/) · works offline · add it to your home screen.

## How to use it

The app tracks **your** study; the learning happens in your books and your notebook.

1. **Study from a book, make notes on paper.**
2. **Today → Log study**: topic, what you did (study + notes / revision / past paper / current affairs), minutes. 10 seconds. It keeps your streak and your weekly total honest.
3. **Syllabus**: when a topic's notes are complete, set it to **Notes made**. The app schedules revisions after **3, 7, 21 and 45 days**; they appear under **Today → Revise today**. Tap *Done* when you've revised.
4. **Today → Next to learn** shows the unfinished topics paying the most marks per hour (weighted PSI 55 / CDS 45).
5. **Progress → Scores**: enter every real mock and past paper. That chart, not any app estimate, tells you where you stand.
6. **Practice**: quick quiz for metro rides, mini mocks that drill the marking rules, Paper 2 writing tasks, and a **mistake log** — one line per question you got wrong, read before every mock.

## Why this beats the old app

The old app was a planner built for a 5:30 am routine you don't live. This one is built for the life you actually have — job, startup, football, content, scattered gaps.

1. **It ranks by marks per hour.** Every topic carries its real weight in both exams (out of 300 each), and the app serves the topic paying the most marks per hour of your effort, weighted 55% PSI / 45% CDS. Change the split in **Me → Settings**.
2. **Half of PSI Paper 1 is Reasoning + Quant (100 / 200 marks).** The old app barely covered it. Quant is also all of CDS Maths, so every maths minute pays twice.
3. **Places do different jobs.** Facts go to the metro, maths to the desk, writing to home. The time you already lose in transit becomes GK time.
4. **Spaced repetition on everything.** What you miss comes back tomorrow; what you know comes back in 3, 7, 16, 35 days.
5. **A projected score you can't fool.** The Now tab shows estimated marks out of 300 for each exam, with section minimums (PSI 40% in each part of Paper 1). It is deliberately conservative: it counts the time you've actually spent per topic, not just questions answered.
6. **Rules drilled, not just facts.** PSI mocks have Option E and charge −0.25 for a blank. CDS mocks charge −⅓ for a wrong answer and nothing for a skip. You'll make those calls by habit.
7. **Paper 2 is cheap marks for you.** Gujarati writing is ~60–70 marks, and you already speak Gujarati. What's tested is format and formal register. The app gives frames, formal phrases, 20 timed tasks and a self-check rubric. Write on paper.

## The weekly minimum (from the Now tab)

- One **mini mock** (25 min, Test tab) — weekends are good for it
- One **Paper 2 writing task** on paper
- One **5 km time trial** — PET is 25:00; aim for 23:00. Football builds the engine.
- Current affairs: 10–15 min of a newspaper, logged under **Me → Outside study**

## Dates

| When | What |
|---|---|
| **2–22 Dec 2026** | CDS I 2027 form at upsc.gov.in. Apply in week 1. Tick **all four** (IMA, INA, AFA, OTA) — your B.E. opens INA and AFA. |
| 11 Apr 2027 | CDS I 2027 written |
| 19 Sep 2027 | CDS II 2027 — your strongest CDS shot, with ~a year of build behind it |
| 1st of every month | Check gprb.gujarat.gov.in and ojas.gujarat.gov.in for the PSI notification. No date is announced; when it drops it's a 60–90 day sprint, and the app's Map shows where to push. |

Exam patterns used (verify against each notification):
PSI — Paper 1 MCQ 200 (Part A: Reasoning & DI 50 + Quant 50; Part B: Constitution & public admin 25, history/geography/heritage 25, current affairs & GK 25, environment/science/economy 25; 40% in each part), Paper 2 descriptive 100 (Gujarati + English), PET 5 km in 25 min.
CDS — English 100, GK 100, Elementary Maths 100 (OTA: no maths); −⅓ per wrong answer.

## Your data

Progress is saved on your phone only. **Me → Backup → Export** once a week; Import on a new phone.

## For development

```
python3 -m http.server 8080      # then open http://localhost:8080/site/
node scripts/check.js            # content integrity, marks budget, 30-day scheduler simulation, mock scoring
```

- `site/core.js` — engine: topics, spaced repetition, session builder, projection, mocks
- `site/content/topics.js` — the syllabus as a marks budget (edit weights here)
- `site/content/*.js` — lessons, questions, flashcards, writing tasks. Write the **correct option first**; the UI shuffles.
- `site/legacy/` — 130 bilingual questions from v1, mapped in by `content/legacy.js`
- `archive/v1/` — the old app and planning docs

When you add a content file, add it to `site/index.html` and `site/sw.js` (and bump `CACHE_NAME`).
