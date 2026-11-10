# OB Meal Planner

A meal-planning tool for OB Health assistant coaches. A coach enters a client's
calorie + macro targets and food rules, the tool **auto-drafts a plan that hits the
targets**, the coach **edits it** with everything recomputing live, and it scores the
plan on **micronutrients and omega-3/6 balance**. Finished plans export to a clean
**client PDF**.

Every nutrition number is real **USDA FoodData Central** data — nothing is invented.

---

## What's in the box

```
ob-meal-planner/
├── app/                ← THE TOOL. This whole folder is the website. Host this.
│   ├── index.html
│   ├── styles.css
│   ├── js/app.js
│   └── data/
│       ├── foods.js    ← 168 items (160 real USDA foods + 8 recipes), per-100g
│       │                 macros + every micronutrient + omega-3/6 + dry/cooked form
│       └── dri.js      ← daily targets (RDA/AI), supplements, display config
├── data-build/         ← OPTIONAL. Tooling to regenerate/expand the food list.
│   ├── build_foods.py
│   └── raw/            ← the raw USDA download (not needed to run the tool)
└── README.md
```

The `app/` folder is **240 KB, self-contained, and needs no server, build step, login,
or internet.** That's the thing you send your team.

---

## Running it

### Quick (one coach, one computer)
Double-click `app/index.html`. It opens in your browser and works offline.
> Note: on `file://` the "Save client" feature uses local browser storage that can be
> shared across local files. For a team, host it (below) — then each person gets clean,
> private storage in their own browser.

### Host it for the whole team (recommended)
Pick whichever is easiest — all you upload is the **`app/` folder**:

1. **Netlify Drop (easiest, free, ~60 seconds):** go to <https://app.netlify.com/drop>
   and drag the `app` folder onto the page. You get a shareable URL instantly.
2. **Vercel / Cloudflare Pages / GitHub Pages:** point any of them at the `app` folder
   (it's plain static files — no framework, no build command).
3. **Your own web host:** upload the contents of `app/` to any folder that serves static
   files. Done.

To send it to a teammate to host: zip the `app` folder and send the zip.

---

## How a coach uses it

1. **Client & targets (left):** name, biological sex (sets the micronutrient targets),
   meals/day, and the daily **calorie + protein + carb + fat** targets. The hint under
   the macros tells you if the macros add up to the calorie target. Set calories + protein
   and hit **↻ Generate remaining macros** to auto-fill whatever you leave blank (carbs,
   fat, or both) so everything reconciles to the calorie target — or, if all are filled,
   it re-balances carbs to hit the number.
2. **Food rules:**
   - **Dietary pattern** — omnivore / pescatarian / vegetarian / vegan + eggs (ovo) / vegan.
   - **Halal** — a checkbox that works on top of any diet; excludes pork & alcohol (allowed
     meats just need halal sourcing, which the coach handles).
   - **Kosher** — a checkbox (any diet); excludes pork & shellfish/non-kosher fish, and shows
     a warning on any meal that mixes meat & dairy. Allowed meats need kosher sourcing.
   - **Allergies & can't-haves** — tap the allergen chips (hard exclude) and/or type
     extra can't-haves. These foods will never appear.
   - **Dislikes** — avoided when possible.
   - **Loves** — prioritized in the draft.
   - **Supplements** — toggle what the client takes (fish oil, vitamin D, multivitamin,
     magnesium, etc.) plus a free-text notes field. These are added to the daily totals
     so the score reflects what they actually get.
3. **Auto-draft a plan** — builds a plan that hits the macro targets from this client's
   allowed foods, leading with their loved foods. It uses lean proteins and puts a
   vegetable in every meal, so fiber and micros run high (the OB way). **Click it again
   for a different variation** — every draft shuffles within the best foods, so you can
   re-roll until the plan feels right (accuracy stays 95%+). The **🎲 on each meal**
   re-rolls just that meal (new foods, day re-fits); on a treat/snack it cycles to the
   next recipe. **↩ Undo** reverses the last auto-change (draft, re-roll, fit, treat) —
   click again to redo.
4. **Edit (center):** change grams, pick a household portion (1 cup, 3 oz…), swap a food,
   add/remove foods or whole meals. Use **+ Snack** and **+ Treat 🍰** to drop in a
   high-protein dessert/snack recipe (for women the treat is labelled "Sweet treat") — the
   recipe shows its **ingredients + how to make it**, and the rest of the day
   **auto-rebalances** so calories + macros still hit target (veg/fiber kept intact).
   **⤿ Fit to targets** re-runs that rebalance any time after manual edits.
   Tap the **ⓘ** on any food to verify its source and numbers. Everything recomputes live.
5. **Score (right):** macro accuracy, fiber (shown as a minimum to exceed), the
   micronutrient panel (% of each daily target), and the omega-3 / omega-6 / EPA+DHA panel.
6. **Full 7-day week** — day tabs (Sun–Sat) across the top; Auto-draft fills the whole
   week with **varied** days so the client isn't eating the same thing daily. Edit any day;
   **⎘ Copy day → week** repeats one day across all 7 for meal-preppers. **🛒 Groceries**
   gives a consolidated weekly shopping list (recipes broken into ingredients, grouped by
   store section, amounts in lb + household units) — copyable and on the PDF.
7. **Save** the client (top bar) to come back later. **Export client PDF** = a polished,
   client-facing **OB Health Coaching** document: a personalized "why this plan works for
   you" intro, your coach name + a personal note, all 7 days, the weekly grocery list,
   micronutrient coverage, and a **"Science behind your plan"** section citing the research
   (protein, fiber, omega-3/9) with PubMed DOI links. **📋 Copy day** gives a quick text
   version of one day for a DM. *(The client PDF says "OB Health Coaching," never "Meal
   Planner" — it's built to forward straight to the client.)*
7. **⬇ Backup / ⬆ Import** (top bar) — saved clients live in the browser, so download a
   backup file regularly and import it on a new machine or share it with another coach.
8. **Food picker extras** — quick filters (💪 High protein · 🔥 Low cal · 🌾 High fiber ·
   🐟 Omega-3 · 🍰 Recipes) and press **Enter** to grab the first match.

---

## How the score works (so you can explain it)

- **Plan score = 55% macro accuracy + 45% micronutrient coverage.**
- **Macro accuracy** = how close calories/protein/carbs/fat land to target.
- **Micronutrient coverage** = the average % of each vitamin, mineral, and omega-3
  target the plan meets (capped at 100% so megadosing one thing can't hide a gap).
- **Omega-3 is a minimum too:** total omega-3 **2 g/day** and **EPA+DHA 2,000 mg/day** (OB
  preference, above the ~250–500 mg general-health floor). EPA+DHA turns red when under —
  most clients need fatty fish or a fish-oil supplement to hit it.
- **Fiber ⭐ is a minimum to meet or exceed**, not a "hit-the-number" target. The floor is
  30 g and scales with calories (14 g / 1,000 kcal). This is grounded in the Reynolds et al.
  2019 *Lancet* dose-response meta-analysis: full benefit (15–30% lower all-cause/CV
  mortality; 16–24% less heart disease, stroke, type-2 diabetes, colorectal cancer) shows up
  at ~25–35 g/day. The auto-draft deliberately runs fiber high.
- **Targets** are the US/Canada Dietary Reference Intakes (RDA, or AI where no RDA
  exists) for an adult 19–50, split by the sex you pick. Sodium is shown as an upper limit;
  omega-6 is shown for context (the 6:3 ratio). Neither is "scored up."
- **Iodine is not tracked** — USDA doesn't have reliable iodine values for most foods, so
  scoring it would always read ~0% and mislead. Cover it via iodized salt, dairy, seafood.

This is a planning aid, not medical advice.

## Compliance & scope safeguards (built in)

To keep coaches in the lawful **general-wellness** lane (the tool is for apparently-healthy adults, not medical nutrition therapy), it includes:

- **Health screen** — an 8-condition intake check (diabetes, kidney/liver, cardiovascular, eating-disorder history, pregnancy, **GLP-1 / weight-loss medication**, other Rx, under-18).
- **Automatic scope flag** — if any condition is checked, a red **"outside general-wellness scope → route to a physician / registered dietitian"** banner appears in the profile, at the top of the plan, and on the client PDF. **GLP-1** is called out as requiring RD/MD oversight.
- **Client attestation** — a checkbox (apparently-healthy adult, not treating a condition, advised to consult their physician) that prints on the PDF.
- **Disclaimer** — "general wellness, recommendations only, not medical advice" on screen and stamped on every PDF.

These are guardrails, **not legal advice**. See `LEGAL-nutrition-coaching-compliance-memo.md` for the full analysis, and run your setup past a licensed health/dietetics attorney — especially the GLP-1 segment and clients in strict ("exclusive scope of practice") states.

## Accuracy & how it's checked

Getting the numbers right is the whole point, so there are three layers of protection:

1. **Real data, every value.** Macros and micros come straight from USDA FoodData Central.
   The build script prints a `build_report.csv` showing exactly which USDA record each food
   matched, so a human can eyeball it.
2. **Automatic calorie audit on every build.** `build_foods.py` cross-checks every food's
   calories against its macros (fiber-aware) and refuses to pass silently if anything is
   off — this catches kJ/kcal mixups, bad matches, or typos. All 168 items currently pass.
3. **Per-food verify in the app.** The **ⓘ** button on any food shows its USDA source,
   per-100g vs this-serving numbers, and a live calorie cross-check, so a coach can sanity-
   check any line in one click.

**Weighed dry vs cooked** is handled explicitly: foods carry a **DRY / COOKED** badge, the
verify popover warns when a food is weighed dry (e.g. oats), and both *Oats, dry (raw)* and
*Oats, cooked (in water)* exist so you can match however the client actually weighs it. Rice,
pasta, quinoa, beans, etc. are the **cooked** values (how they're normally weighed on a plate).

---

## Adding or changing foods (optional)

The food list is generated, so it's easy to expand. You need Python 3.

1. Open `data-build/build_foods.py` and edit the `WHITELIST` (each line is a food with
   search keywords; you can also pin an exact USDA `fdc` id).
2. Run it:
   ```
   cd data-build
   python3 build_foods.py
   ```
3. It rewrites `app/data/foods.js` and prints a `build_report.csv` so you can eyeball that
   each food matched the right USDA record. Re-host the `app/` folder.

If `data-build/raw/` is missing, re-download the USDA "SR Legacy" CSV set from
<https://fdc.nal.usda.gov/download-datasets.html> and unzip it there.

---

## Data source & honesty notes

- **Source:** USDA FoodData Central, SR Legacy (per-100g values). Omega-3 = ALA + EPA +
  DHA + DPA; omega-6 = LA + AA + GLA, using the n-3/n-6-specific fatty acids where USDA
  reports them and the undifferentiated value as a fallback.
- Foods vary in how complete their USDA micronutrient panel is (oils and a few branded
  items have sparse data). The numbers are real where present; missing values count as 0,
  which can slightly understate a nutrient.
- It's a draft + scoring aid for trained coaches. Always apply judgment.

## Shared copy notes
- Run it: open `app/index.html` in a browser (no install, no server needed), or `python3 tools/serve.py`.
- Client records, rendered plans and client files are not included. Saved clients live in your own browser's storage.
- The raw USDA data (`data-build/raw/`, 53 MB) is left out. To rebuild `foods.js`, download the "SR Legacy" CSVs from https://fdc.nal.usda.gov/download-datasets and unzip them into `data-build/raw/`.
