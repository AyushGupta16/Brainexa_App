# Course Content Cleanup — Class 9 & 10 Science Only

The homepage, Hero, Footer, About, FAQ, and `/courses` page already say "Class 9 & 10 Science." The mismatch lives entirely in `src/lib/mockData.ts`, which still defines NEET, JEE, and Class 11 Foundation courses (plus their subjects, chapters, topics, teacher assignments, enrollments, and tests). Those leak into `/courses`, course detail pages, the test series, and the student/teacher/admin dashboards.

This plan rewrites only the mock data arrays (and one small price-label tweak in the courses page). No routes, no dashboard logic, no auth, no referral relationships, no UI redesign.

## Scope

Files touched:

- `src/lib/mockData.ts` — replace `courses`, `teacherAssignments`, `enrollments`, `referralCommissions`, `tests`. Update one description string.
- `src/routes/courses.index.tsx` — show a "Free" pill instead of `₹0` with a fake `₹999` strikethrough on demo cards. No layout/color/component changes.

Files NOT touched (verified via `rg`):

- All routes/routing, all dashboards (`student.*`, `teacher.*`, `admin.*`), `auth.tsx`, `login.tsx`, root layout, navbar, footer
- `referrals`, `referralRates`, `users`, `withdrawals`, `doubts` arrays — unchanged
- All exported helpers and types stay byte-identical: `Role`, `User`, `Question`, `Test`, `Doubt`, `Topic`, `Chapter`, `Subject`, `Course`, `TeacherAssignment`, `Enrollment`, `Referral`, `ReferralCommission`, `WithdrawalRequest`, `getCourse`, `getSubject`, `getChapter`, `getTopic`, `getDoubtsForTopic`, `getTestsForRef`, `getTeacherSubjects`, `getTeacherEarnings`, `getStudentReferralStats`, `getStudentEnrollments`

## New course content

Display order on `/courses` (matches your spec):

1. Class 10 Science — Premium · ₹299 (`c-class10-premium`)
2. Class 10 Science — Demo · Free (`c-class10-demo`)
3. Class 9 Science — Premium · ₹299 (`c-class9-premium`)
4. Class 9 Science — Demo · Free (`c-class9-demo`)

Hierarchy (Course → Subject → Chapter → Topic, fully clickable):

```text
Class 10 Science — Premium (₹299)
  Science (s-c10-sci)
    Chemical Reactions and Equations
      - Types of Chemical Reactions
      - Balancing Chemical Equations
    Acids, Bases and Salts
      - pH Scale & Indicators
      - Common Salt & Bleaching Powder
    Light — Reflection and Refraction
      - Spherical Mirrors
      - Refraction Through Lenses
    Life Processes
      - Nutrition in Plants & Animals
      - Respiration & Transportation

Class 10 Science — Demo (Free)
  Science (s-c10-sci-demo)
    Demo Chapter — Class 10 Science
      - Introduction to Class 10 Science
      - Sample Topic: Light Reflection

Class 9 Science — Premium (₹299)
  Science (s-c9-sci)
    Matter in Our Surroundings
      - States of Matter
      - Evaporation & Latent Heat
    Atoms and Molecules
      - Laws of Chemical Combination
      - Atomic Mass & Mole Concept
    Motion
      - Distance, Displacement & Speed
      - Equations of Motion
    The Fundamental Unit of Life
      - Cell Structure
      - Cell Organelles

Class 9 Science — Demo (Free)
  Science (s-c9-sci-demo)
    Demo Chapter — Class 9 Science
      - Introduction to Class 9 Science
      - Sample Topic: Matter Around Us
```

Topics use IDs `t-1` through `t-20`. Existing YouTube video IDs in the file are reused so embeds keep working.

## Dependent mock records (kept consistent)

Every cross-reference is rewired so no helper returns `undefined`:

- `**teacherAssignments**` (subject IDs all exist):
  - Teacher 1 → `s-c10-sci` (40%), `s-c9-sci` (40%)
  - Teacher 2 → `s-c10-sci-demo` (30%), `s-c9-sci-demo` (30%)
- `**enrollments**` (course IDs all exist; amounts match new prices):
  - `e-1` → student1 / `c-class10-premium` / 299
  - `e-2` → student2 / `c-class10-premium` / 299
  - `e-3` → student3 / `c-class9-premium` / 299
  - `e-4` → student2 / `c-class9-demo` / 0
- `**referralCommissions**` — recompute `amount` from new enrollment prices using existing `referralRates` (7% / 3% / 2.5%). Referral rules unchanged. Statuses preserved.
- `**tests**` — keep same IDs (`test-t1`, `test-ch1`, `test-sphy`, `test-t4`) so any in-flight links resolve, but repoint:
  - `test-t1` → topic `t-1` (Types of Chemical Reactions)
  - `test-ch1` → chapter `ch-c10-sci-3` (Light — Reflection and Refraction)
  - `test-sphy` → subject `s-c10-sci` (Class 10 Science)
  - `test-t4` → topic `t-11` (States of Matter — Class 9)
- `**doubts**` — already reference `t-1`, which still exists. No changes needed.

## Positioning copy cleanup

Remove every JEE / NEET / IIT / Class 11 / Foundation / aspirant / "engineering entrance" / "medical entrance" reference from `mockData.ts`. The only matches outside mockData are unrelated (e.g. an Instagram handle containing `sanjeev`) and are left alone.

Final search to verify post-edit:

```bash
rg -ni "jee|neet|iit|class 11|foundation|aspirant|engineering entrance|medical entrance" src/
```

should return zero matches in source code (excluding the Instagram URL, which doesn't contain any of these substrings).

## /courses page polish

In `src/routes/courses.index.tsx`, the price block currently always shows `₹{c.price}` with a `₹999` strikethrough when `price > 0`. With demos at `₹0`, change it to:

- `price === 0` → render a green "Free" pill (reuse the existing emerald token used elsewhere for free badges)
- `price > 0` → unchanged: `₹299` with `₹999` strikethrough

The "Featured" highlight stays on the first card, which is now Class 10 Premium. No other styling changes.

## Verification checklist

- `/courses` shows 4 cards in the requested order
- `/courses/c-class10-premium`, `/courses/c-class10-demo`, `/courses/c-class9-premium`, `/courses/c-class9-demo` all render subjects → chapters → topics
- `/subjects/s-c10-sci`, `/chapters/ch-c10-sci-3`, `/topics/t-1` all resolve (helpers find their records)
- `/tests` lists 4 tests; `/tests/test-t1` through `/tests/test-t4` all open
- Student dashboard shows enrollments and referral earnings (recomputed against ₹299)
- Teacher dashboard shows assigned subjects + earnings (recomputed)
- Admin dashboards (courses, teachers, referrals, withdrawals) render without errors
- `rg -ni "jee|neet|iit|class 11|foundation|aspirant" src/` returns no source-code hits  


Proceed with the plan.

One correction:

For premium courses, show only ₹299 with a “Limited Offer” or “Best Value” badge.

Do not show ₹999 strikethrough unless the client has approved that original price.

Everything else in the plan is approved.