# Realistic portion limits for the OB meal planner (353 foods)

Research memo, 2026-09-24. Machine-readable version: `portions.json` (one entry per food id in `app/data/foods.js`). Nothing in the app was changed.

## What the numbers mean

| Field | Meaning | Where it comes from |
|---|---|---|
| `racc_g` | The FDA/USDA **reference amount customarily consumed per eating occasion**, converted to this food's basis (cooked, dry, raw, as-eaten) with its own household-measure grams. | 21 CFR 101.12(b) Table 2 (FDA); 9 CFR 317.312 (meat) and 381.412 (poultry) (FSIS); FDA 2018 product-list guidance for which category a food sits in. |
| `typical_meal_g` | The ordinary portion an adult serves at one sitting. | Median amount per eating occasion among adult users (mean of the men/women 20-39 and 40-59 medians), USDA ARS NFS Report 96-5 (CSFII 1994-96). If no survey table exists: the RACC. |
| `max_meal_g` | The most a large but normal eater puts on the plate in one sitting. | Main foods, fruit and vegetables: the larger of the men 20-39 90th percentile and the all-ages 95th percentile (cells the report flags as unreliable are skipped). Fats, oils, condiments, sauces, cheese, sweets and snacks: the all-ages 90th percentile (a normal pour). Produce max is never below its RACC. |
| `max_day_g` | Daily ceiling, only where one matters (fats, oils, cheese, nut butters, nuts, avocado, condiments, sweeteners, Brazil nuts). | All-ages 90th percentile of the per-DAY tables in NFS 96-5 Set 2, or a stated safety limit. |
| `min_as_star_g` | Smallest amount for a dish to read as "X" when X is the named main ingredient (proteins), or the structural minimum for a carrier (2 slices for a sandwich). | RACC for entrees (85 g cooked) and FSIS Food Standards and Labeling Policy Book definitions. |
| `method` | `survey-direct` (the food has its own survey table), `survey-proxy` (closest surveyed food, rescaled by RACC), `derived-*` (no survey data: RACC x class multiplier), `label`, `judgment`, `safety-override`, `recipe-*`. | |
| `app_ceiling_now_g` | What the app allows today (`servingCeiling`, default 2,000 kcal omnivore profile, carbMult 1). For comparison only, not a source. | read-only run of app.js in Node |

**Derived values (no survey table).** max = RACC x the median of (survey max / RACC) across the surveyed foods of the same class in NFS 96-5: main dishes 2.4 (n=29), fruit/vegetables 1.8 (n=12), fats/condiments/sauces 1.8 (n=12), sweets/snacks 2.6 (n=11). typical = RACC.

**Why 1994-96 survey data.** It is the most recent US publication that gives per-eating-occasion percentiles (not just means) for individual foods. Portion size per eating occasion in US adults rose from 1977 to 1994-98 and then dropped slightly by 2003-06 (Duffey & Popkin 2011, PLoS Med, https://doi.org/10.1371/journal.pmed.1001050), so these percentiles do not understate current portions. The FDA RACCs were themselves updated with NHANES 2003-2008 data. FNDDS portion weights were checked and are **not** usable as intake bounds: its own documentation says the "Quantity not specified" weights "do not necessarily represent the amount reported by most respondents" (FNDDS 5.0 documentation).

## Key limits (the foods the planner over-serves most)

| Food (basis) | RACC | Typical | Max per meal | Max per day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|
| White rice, cooked (cooked) | 140 | 138 | **335** |  |  | 280 | ARS 1.018 direct |
| Pasta, cooked (cooked) | 140 | 148 | **420** |  |  | 280 | ARS 1.019 direct |
| Potato, baked (cooked) | 110 | 118 | **236** |  |  | 280 | ARS 1.038 direct |
| Sweet potato, baked (cooked) | 110 | 118 | **236** |  |  | 280 | ARS 1.038 proxy |
| Oats, dry (dry) | 40 | 49 | **88** |  |  | 100 | ARS 1.014 direct |
| Oats, cooked (cooked) | 234 | 264 | **473** |  |  | 280 | ARS 1.014 direct |
| Olive oil (cooking oils) (as-eaten) | 14 | 8.9 | **20** | 42 |  | 15 | ARS 1.102 proxy |
| Sesame oil (as-eaten) | 14 | 4.5 | **14** | 42 |  | 15 | judgment |
| Peanut butter (as-eaten) | 32 | 23 | **47** | 49 |  | 32 | ARS 1.075 direct |
| Tahini (as-eaten) | 30 | 22 | **44** | 46 |  | 32 | ARS 1.075 proxy |
| Cheddar (all sliced/shredded cheese) (as-eaten) | 30 | 26 | **57** | 77 |  | 80 | ARS 1.057 direct |
| Avocado (raw) | 50 | 50 | **90** | 136 |  | 150 | RACC x1.8 |
| Sriracha (as-eaten) | 6.5 | 7.5 | **21** | 21 |  | 60 | ARS 1.092 proxy |
| Hot sauce (Frank's) (as-eaten) | 5 | 5.8 | **16** | 16 |  | 60 | ARS 1.092 proxy |
| Soy sauce (as-eaten) | 16 | 6 | **26** | 29 |  | 60 | ARS 1.094 direct |
| Mayonnaise (as-eaten) | 15 | 11 | **22** | 30 |  | 15 | ARS 1.104 direct |
| Salsa (as-eaten) | 36 | 36 | **65** |  |  | 60 | RACC x1.8 |
| Honey (as-eaten) | 21 | 16 | **38** | 39 |  | 25 | ARS 1.111 proxy |
| Maple syrup (as-eaten) | 40 | 40 | **59** | 60 |  | 25 | ARS 1.107 direct + override |
| Cottage cheese (as-eaten) | 110 | 110 | **225** |  | 110 | 250 | ARS 2.048 direct |
| Greek yogurt (as-eaten) | 170 | 149 | **341** |  | 170 | 350 | ARS 1.049 proxy |
| Seitan (dry vital wheat gluten) (dry) | 29 | 29 | **70** |  | 29 | 285 | RACC x2.4 |
| Tofu, firm (raw) | 85 | 85 | **204** |  | 85 | 285 | RACC x2.4 |
| Salmon (all finfish) (cooked) | 85 | 95 | **259** |  | 85 | 285 | ARS 1.068 direct |
| Chicken breast, cooked (cooked) | 85 | 92 | **206** |  | 85 | 285 | ARS 1.070 direct |
| Eggs, whole (raw) | 50 | 100 | **150** |  | 100 | 200 | ARS 1.073 direct + override |
| Lentils/beans, cooked (cooked) | 90 | 109 | **345** |  | 90 | 230 | ARS 1.041 direct |
| Almonds (all nuts) (as-eaten) | 30 | 22 | **44** | 46 |  | 45 | ARS 1.075 proxy |

The planner examples that started this: 60 g sriracha (max 21 g), 30 g sesame oil (max 14 g), 377 g rice (max 335 g), 250 g cottage cheese as an oat mix-in (max 225 g as a bowl, 110 g as a mix-in), 134 g dry oats (max 88 g). The "30 g seitan" is a data problem, not a portion problem: see Data issues.

## Minimums: when a food is the star of the dish

**Proteins named in the dish title.** Floor = one reference amount: 85 g cooked for meat, poultry, fish, shellfish, game and meat substitutes (21 CFR 101.12 "Entrees without sauce: 85 g cooked"; 9 CFR 317.312 and 381.412 "Entrees without sauce... 85 g"). Raw chicken breast: 114 g (FSIS ready-to-cook). Tofu/tempeh 85 g. Seitan 29 g dry gluten (= 85 g prepared). TVP 25 g dry. Whole eggs 100 g (2 large; egg-mixture RACC 110 g). Egg whites 110 g. Beans/lentils 90 g. Cottage cheese 110 g. Greek yogurt/skyr 170 g. Canned fish 85 g, canned chicken 55 g, sausage 55 g, bacon 15 g (2 slices). Protein powder: 1 scoop.

**The star also has to be a big enough SHARE of the plate.** An absolute floor alone lets 87 g of seitan sit under 377 g of rice. USDA FSIS already defines how much of the named protein a dish must contain to carry the name (Food Standards and Labeling Policy Book, 2005; https://www.fsis.usda.gov/guidelines/2005-0003). Use these as the minimum share of the finished plate weight (cooked grams):

| Dish shape | Minimum named-protein share | FSIS entry |
|---|---|---|
| Protein + one vegetable, or protein + sauce/gravy ("Seitan & Broccoli", "Salmon with dill sauce") | 50% | ENTREE, category 2 |
| Protein + vegetable + gravy | 30% (protein + gravy >= 50%) | ENTREE, category 3 |
| Complete plate: protein + starch + vegetable ("dinner" type) | 25% | ENTREE, category 4 (meal-type products) |
| Closed sandwich / burger | 35% cooked meat, bread <= 50% | SANDWICH - CLOSED |
| Open-faced sandwich or toast | 50% cooked meat | SANDWICH - OPEN |
| Meat salad (tuna/chicken/ham salad) | 35% meat (poultry salad 25%) | SALADS; POULTRY STANDARDS |
| Stir-fry over rice (pepper-steak type) | 30% cooked beef | CHINESE PEPPER STEAK |
| Protein with rice (rice-forward bowl) | 15% | POULTRY STANDARDS "Poultry with Rice" |
| Fried rice with protein | 10% | FRIED RICE WITH MEAT |
| Burrito / fajita wrap | 15% meat, 10% poultry | BURRITOS; FAJITAS |

These are the legal minimums for a commercial product to use the name, so they are floors, not targets. A coach plate usually sits well above them.

**Carriers (structural minimums).** A closed sandwich is "two slices of bread or the top and bottom sections of a sliced bun" (FSIS SANDWICH - CLOSED); open-faced is one slice. So: sandwich = 2 slices (white 50 g, whole wheat/rye 64 g, Dave's 84 g, Ezekiel 68 g, keto 56 g); bagel or English-muffin sandwich = 1 whole bagel (99 g) / muffin (57 g); pita pocket = 1 pita; wrap or burrito = 1 tortilla (FSIS BURRITOS: "a flour tortilla... rolled"); tacos = 2 corn tortillas (48 g, about the 55 g tortilla RACC); stuffed arepa = 1 arepa; rice-cake or crispbread stack = 2 pieces (about the 15 g RACC). These are in `min_as_star_g` for those foods.

## Where sources disagree, and every derived or judgment value

- **Chicken and fish "typical" is lower than coaching plates.** Survey adult median: chicken 92 g, finfish 95 g, ground meat 58 g (ground beef includes tacos and sauces). Coaching plates of 4-6 oz (113-170 g) sit between the median and the max (chicken 206 g, fish 259 g, steak 353 g). Nothing is wrong with 150 g of chicken; it is inside the range.
- **Ground meat max (158 g) is lower than whole cuts (206-353 g)** because the ground-beef table is dominated by mixed dishes. Applied to all ground meats (beef, bison, venison, lamb, pork, chicken, turkey).
- **Maple syrup / sugar-free syrup: max set to the survey MEDIAN (59 g, ~3 tbsp), not the p90 (136 g).** The p90 is syrup poured over pancakes and waffles. Judgment call, flagged. The app currently caps sweeteners at 25 g, which is tighter than any survey number (honey/jam p90 is 38 g).
- **Honey** has no per-occasion table; jelly/jam (same 1 tbsp RACC category) is the proxy. The ARS honey-per-day table (2.092) is dominated by trace honey in breads and cereals, so jam's daily p90 (39 g) is used for max_day.
- **Cottage cheese** has only a per-DAY table; a single sitting cannot exceed the day, so the day distribution bounds it (225 g). Typical is set to the RACC (110 g). As a mix-in (oats, pancakes) use the RACC as the cap.
- **Berries and grapes** have only per-DAY tables. They bound the per-sitting max at 154 g (berries) and 196 g (grapes, cherries). The generic fruit derivation (RACC x 1.8 = 252 g) would allow more; the survey says berries are rarely eaten past ~1 cup a day. Melon, pineapple, mango, watermelon, dates and raisins are derived (x1.8).
- **Leafy greens:** survey max 110 g raw (about 3.5 cups spinach). The app serves leafy greens at 60 g by default (ceiling 96 g) after Dylan's "6 cups of spinach" call; that is tighter than the survey but not in conflict with it.
- **Beans:** survey max 345 g cooked (2 cups) for men 20-39; the app caps legumes at 230 g. Keep the app's tighter cap for a bean SIDE; 345 g is realistic only for a bean-based main (chili, burrito bowl).
- **Eggs:** fried-egg p90 = 2.8 eggs and scrambled p90 = 2.5 eggs, rounded to 3 whole eggs (150 g raw). Hard-boiled p90/p95 = 2 eggs (100 g). App allows 4 eggs.
- **Egg whites, tofu, tempeh, seitan, TVP, falafel, shellfish:** no survey tables. Shellfish use the finfish table (259 g); the others are derived (RACC x 2.4 = about 204 g prepared).
- **Oils:** there is no per-occasion oil table (oil is mostly cooked into food). Butter reported separately (same 1 tbsp RACC) is the per-occasion proxy: typical ~9 g, max ~20-21 g (1.5 tbsp). Daily cap 42 g = ARS total vegetable oil per day, all-ages p90. **Sesame and flaxseed oil are judgment:** they are finishing/seasoning oils (FDA lists sesame under "seasoning oils"), so max = the 1 tbsp reference amount itself, typical 1 tsp.
- **Hot sauces, sriracha, harissa, gochujang, miso, chipotle in adobo:** the only surveyed minor condiment is prepared mustard (p90 16 g, 3.2x its 1 tsp RACC). Rescaled per food, max comes out at about 1 tbsp for each.
- **Nuts and seeds:** no per-occasion nut table. Peanut butter (the surveyed nut product) rescaled to the 30 g nut RACC gives max 44 g (~1.5 oz). Cross-checks agree: FDA's nut health claim amount is 1.5 oz/day, and NHANES 2005-10 tree-nut consumers average 44.3 g/day (O'Neil 2015). Daily cap 46 g.
- **Avocado:** derived max 90 g (~2/3 fruit) per meal, 136 g (1 fruit) per day. NHANES 2001-08 avocado eaters average 70 g/day (Fulgoni 2013). App cap 150 g.
- **Dark chocolate:** proxy is all chocolate candy (candy bars; max 79 g), not dark chocolate specifically. The app cap (60 g) is tighter than the survey; the 30 g RACC is the conservative option.
- **Cereals:** corn flakes and oat rings (40 g RACC class) give typical 1.05x and max 2.29x the RACC. Applied to bran cereals (40 g) and dense cereals/granola (60 g). For cereals over 20% fibre, keep the app's fibre-based dose (it is tighter and correct).
- **Marinara, BBQ, salsa, pico, tzatziki, hummus, cream cheese, Parmesan, ricotta, olives, nutritional yeast, psyllium, cocoa, matcha, cinnamon, garlic:** no survey tables, derived (RACC x 1.8 or x 2.6).
- **Protein powder:** RACC for supplements is the label amount per occasion. Of 4,993 US protein-powder labels in FoodData Central (local branded DB), median serving 34 g, p90 63 g, and 879 of 2,360 scoop-denominated servings are "2 scoops": max 2 scoops. Dylan's app rule (45 g for dairy-eaters, 90 g vegan/ovo) is tighter; keep it.
- **Brazil nuts:** safety override, 1 nut (5 g) per day. 1 nut = ~96 ug selenium (SR 1,917 ug/100 g); NIH ODS adult UL is 400 ug/day and the app already enforces 1 nut on EFSA's lower 2023 UL.
- **Recipes:** typical = the recipe's own serving; max from the dish category (pudding/mousse RACC 1/2 cup x 2.6, ice cream table, cake table, cottage-cheese table, soup table).

## Data issues found along the way

- **Seitan is dry vital wheat gluten.** foods.js `168147` "Seitan / wheat gluten" has 370 kcal and 75 g protein per 100 g, which is the dry flour. 30 g of it makes about 87 g of seitan (one reference amount), so the "30 g seitan" dinner was a labeling problem. Re-base it to prepared seitan (e.g. Sweet Earth Traditional Seitan, FDC 2658596: 153 kcal, 25.9 g protein per 100 g, label serving 85 g) or rename it "Vital wheat gluten (dry)" and show the prepared weight.
- **Two recipe servings are 1.3-1.4 kg.** "Mango egg-white smoothie" (1,374 g, 874 kcal) and the high-protein version (1,289 g) are 2.2-2.3x the smoothie max (RACC 240 mL x 2.4 = 600 g). Split each into 3 servings.
- **Sourdough "1 slice" = 139 g.** SR Legacy 172675 (French/Vienna incl. sourdough) lists one slice at 139 g, and the app uses it as the bread unit, so one "slice" of sourdough is ~378 kcal. Use grams or a 30-35 g sandwich slice.
- **Bagels top out at half a bagel.** The 92 g bread-type cap is snapped to half-bagel units (49.5 g), and markVessels only forces 2 units for bread/rye slices and taco tortillas, so a bagel sandwich cannot get its whole bagel (99 g). (The app's existing sandwich = 2 slices and tacos = 2 tortillas rules match the FSIS-based minimums here.)
- **Coffee is capped at 60 g** because it sits in "Condiments & Misc" and inherits the 60 g condiment cap (calorie-free, cosmetic only).
- **377 g of rice is only reachable through the high-carb multiplier.** The cooked-grain cap is 280 g x carbMult (up to 1.9x = 532 g). The sourced cooked-rice max is 335 g (men 20-39 p90). A high-carb athlete needs more meals or a second starch, not a bigger single portion.
- **The 60 g catch-all condiment cap** is 3-4x the survey max for sriracha/hot sauce (16-21 g) and soy sauce (26 g), and it is what allowed the 60 g sriracha frittata.
- **Dill pickles are capped at 9 g** because "Pickles, dill" matches the fresh-herb regex in PRODUCE_GRAMS (`dill` sits next to basil and parsley) and gets the 6 g herb serving. One spear is 35 g; the survey max is 65 g (1 medium pickle).
- **Snap peas are sized as starchy peas** (80 g serve, 128 g ceiling) because "Snap peas" matches the `peas,` rule meant for green peas; snap peas are a 52 kcal/100 g pod vegetable (survey-proxy max 275 g).

## All foods by category

Grams are in the stated basis (cooked weight for meat, fish, grains, pasta and legumes unless the name says dry or raw). "Source" is shorthand; the full citation with section and URL is in each entry's `source` field in portions.json.

### Protein (39)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Bacon, cooked | cooked | 15 | 18 | 34 | 36 | 15 | 285 | ARS 1.064 direct |
| Beef sirloin, lean, grilled | cooked | 85 | 134 | 353 |  | 85 | 285 | ARS 1.059 direct |
| Beef tenderloin, lean, roasted | cooked | 85 | 134 | 353 |  | 85 | 285 | ARS 1.059 direct |
| Beef, ground 93/7, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 direct |
| Beef, ground 97/3, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 direct |
| Beef, top round, lean, cooked | cooked | 85 | 134 | 353 |  | 85 | 285 | ARS 1.059 direct |
| Bison, ground, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Breakfast sausage patty, turkey & pork | cooked | 55 | 34 | 108 |  | 55 | 285 | ARS 1.065 proxy |
| Chicken breast, canned, drained | as-eaten | 55 | 56 | 161 |  | 55 | 285 | ARS 1.067 proxy |
| Chicken breast, cooked | cooked | 85 | 92 | 206 |  | 85 | 285 | ARS 1.070 direct |
| Chicken breast, raw | raw | 114 | 127 | 284 |  | 114 | 285 | ARS 1.070 direct |
| Chicken drumstick, cooked | cooked | 85 | 92 | 206 |  | 85 | 285 | ARS 1.070 direct |
| Chicken leg quarters, roasted (meat only) | cooked | 85 | 92 | 206 |  | 85 | 285 | ARS 1.070 direct |
| Chicken thigh, cooked | cooked | 85 | 92 | 206 |  | 85 | 285 | ARS 1.070 direct |
| Chicken, ground, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Duck, lean, cooked | cooked | 85 | 82 | 203 |  | 85 | 285 | ARS 1.069 proxy |
| Edamame, cooked | cooked | 85 | 90 | 170 |  | 85 | 285 | ARS 1.033 proxy |
| Falafel | cooked | 85 | 85 | 204 |  | 85 | 285 | RACC x2.4 |
| Ground chicken breast, 98% lean, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Ham, extra lean | as-eaten | 85 | 40 | 167 |  | 85 | 285 | ARS 1.062 direct |
| Lamb loin chop, lean, cooked | cooked | 85 | 77 | 213 |  | 85 | 285 | ARS 1.063 proxy |
| Lamb, ground, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Pea & rice protein powder | dry | 32 | 32 | 64 |  | 32 | 45 | label (1-2 scoops) |
| Pea protein isolate, powder | dry | 33 | 33 | 66 |  | 33 | 45 | label (1-2 scoops) |
| Pork chop, lean, cooked | cooked | 85 | 77 | 213 |  | 85 | 285 | ARS 1.063 direct |
| Pork tenderloin, lean, roasted | cooked | 85 | 77 | 213 |  | 85 | 285 | ARS 1.063 direct |
| Pork, ground, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Ribeye steak, cooked | cooked | 85 | 134 | 353 |  | 85 | 285 | ARS 1.059 direct |
| Seitan / wheat gluten | dry | 29 | 29 | 70 |  | 29 | 285 | RACC x2.4 |
| Soy protein isolate, powder | dry | 30 | 30 | 60 |  | 30 | 45 | label (1-2 scoops) |
| TVP (textured soy protein), dry | dry | 25 | 25 | 60 |  | 25 | 285 | RACC x2.4 |
| Tempeh | as-eaten | 85 | 85 | 204 |  | 85 | 285 | RACC x2.4 |
| Tofu, firm | raw | 85 | 85 | 204 |  | 85 | 285 | RACC x2.4 |
| Tofu, silken | as-eaten | 85 | 85 | 204 |  | 85 | 285 | RACC x2.4 |
| Turkey breast, roasted | cooked | 85 | 82 | 203 |  | 85 | 285 | ARS 1.069 proxy |
| Turkey thigh, roasted | cooked | 85 | 82 | 203 |  | 85 | 285 | ARS 1.069 proxy |
| Turkey, ground 93/7, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Venison, ground, cooked | cooked | 85 | 58 | 158 |  | 85 | 285 | ARS 1.061 proxy |
| Whey protein powder | dry | 34 | 34 | 68 |  | 34 | 45 | label (1-2 scoops) |

### Seafood (25)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Cod, Atlantic, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Crab, Alaska king, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Flounder/sole, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Haddock, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Halibut, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Lobster, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Mackerel, Atlantic, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Mackerel, jack, canned, drained | as-eaten | 85 | 56 | 161 |  | 85 | 285 | ARS 1.067 proxy |
| Mussels, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Octopus, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Oysters, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Pollock, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Salmon, Atlantic farmed, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Salmon, Atlantic wild, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Salmon, pink, canned | as-eaten | 85 | 56 | 161 |  | 85 | 285 | ARS 1.067 proxy |
| Salmon, sockeye, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Sardines, canned in oil | as-eaten | 85 | 56 | 161 |  | 85 | 285 | ARS 1.067 proxy |
| Scallops, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Shrimp, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 proxy |
| Snapper, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Tilapia, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Trout, rainbow, farmed, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |
| Tuna, light, canned in oil, drained | as-eaten | 85 | 56 | 161 |  | 85 | 170 | ARS 1.067 direct |
| Tuna, light, canned in water | as-eaten | 85 | 56 | 161 |  | 85 | 170 | ARS 1.067 direct |
| Tuna, yellowfin, cooked | cooked | 85 | 95 | 259 |  | 85 | 285 | ARS 1.068 direct |

### Eggs & Dairy (28)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Butter, salted | as-eaten | 14 | 9.2 | 21 | 21 |  | 15 | ARS 1.102 direct |
| Cheddar cheese | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Cheese, reduced-fat cheddar | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Cottage cheese, 2% lowfat | as-eaten | 110 | 110 | 225 |  | 110 | 250 | ARS 2.048 direct |
| Cottage cheese, nonfat | as-eaten | 110 | 110 | 225 |  | 110 | 250 | ARS 2.048 direct |
| Cream cheese | as-eaten | 30 | 30 | 54 |  |  | 80 | RACC x1.8 |
| Egg white, raw | raw | 50 | 110 | 264 |  | 110 | 200 | RACC x2.4 |
| Egg, whole, cooked | as-eaten | 50 | 50 | 100 |  | 100 | 200 | ARS 1.072 direct + override |
| Egg, whole, raw | raw | 50 | 100 | 150 |  | 100 | 200 | ARS 1.073 direct + override |
| Feta cheese | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Goat cheese, soft | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Greek yogurt, plain, nonfat | as-eaten | 170 | 149 | 341 |  | 170 | 350 | ARS 1.049 proxy |
| Greek yogurt, plain, whole | as-eaten | 170 | 149 | 341 |  | 170 | 350 | ARS 1.049 proxy |
| Kefir, plain low-fat | as-eaten | 243 | 213 | 488 |  |  | 350 | ARS 1.049 proxy |
| Micellar casein, powder | dry | 33 | 33 | 66 |  |  | 45 | label (1-2 scoops) |
| Milk, 2% reduced fat | as-eaten | 244 | 204 | 549 |  |  | 350 | ARS 1.053 direct |
| Milk, nonfat / skim | as-eaten | 247 | 240 | 490 |  |  | 350 | ARS 1.055 direct |
| Milk, whole | as-eaten | 244 | 195 | 481 |  |  | 350 | ARS 1.051 direct |
| Mozzarella, fat-free | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Mozzarella, part skim | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Nonfat dry milk powder | dry | 24 | 21 | 48 |  |  | 350 | ARS 1.049 proxy |
| Parmesan cheese, shredded | as-eaten | 5 | 5 | 9 |  |  | 30 | RACC x1.8 |
| Parmesan, grated | as-eaten | 5 | 5 | 9 |  |  | 30 | RACC x1.8 |
| Provolone cheese | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Ricotta cheese, part skim | as-eaten | 55 | 55 | 99 |  |  | 200 | RACC x1.8 |
| Skyr, plain nonfat | as-eaten | 170 | 149 | 341 |  | 170 | 350 | ARS 1.049 proxy |
| Swiss cheese | as-eaten | 30 | 26 | 57 | 77 |  | 80 | ARS 1.057 direct |
| Yogurt, plain, low fat | as-eaten | 170 | 149 | 341 |  |  | 350 | ARS 1.049 proxy |

### Grains & Starches (55)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| All-Bran Bran Buds cereal | as-eaten | 40 | 42 | 92 |  |  | 42 | ARS ? proxy |
| All-Bran cereal | as-eaten | 40 | 42 | 92 |  |  | 55 | ARS ? proxy |
| Arepa (cornmeal bread) | as-eaten | 55 | 55 | 146 |  | 98 | 147 | ARS 1.005 proxy |
| Arnold Keto bread | as-eaten | 50 | 51 | 104 |  | 56 | 56 | ARS 1.002 proxy |
| Bagel, plain | as-eaten | 110 | 118 | 244 |  | 99 | 49.5 | ARS 1.003 proxy |
| Barley, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |
| Bran cereal, high-fiber (Fiber One) | as-eaten | 40 | 42 | 92 |  |  | 36 | ARS ? proxy |
| Brown rice, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 direct |
| Buckwheat groats, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |
| Bulgur, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |
| Carbe Diem high-protein pasta | dry | 55 | 63 | 178 |  |  | 37 | ARS 1.019 direct |
| Catalina Crunch cereal (high-protein) | as-eaten | 60 | 63 | 137 |  |  | 64 | ARS ? proxy |
| Chickpea pasta, cooked | cooked | 140 | 148 | 420 |  |  | 280 | ARS 1.019 proxy |
| Corn tortilla | as-eaten | 55 | 55 | 146 |  | 48 | 72 | ARS 1.005 direct |
| Couscous, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |
| Dave's Killer Bread Powerseed | as-eaten | 50 | 51 | 104 |  | 84 | 84 | ARS 1.002 proxy |
| Edamame pasta, cooked | cooked | 140 | 148 | 420 |  |  | 280 | ARS 1.019 proxy |
| English muffin | as-eaten | 55 | 59 | 122 |  | 57 | 85.5 | ARS 1.003 proxy |
| Ezekiel 4:9 sprouted whole grain bread | as-eaten | 50 | 51 | 104 |  | 68 | 68 | ARS 1.002 proxy |
| Fiber One Clusters cereal | as-eaten | 60 | 63 | 137 |  |  | 100 | ARS ? proxy |
| Flour tortilla | as-eaten | 55 | 55 | 146 |  | 49 | 49 | ARS 1.005 direct |
| Granola | as-eaten | 60 | 63 | 137 |  |  | 100 | ARS ? proxy |
| Granola, high-protein | as-eaten | 60 | 63 | 137 |  |  | 100 | ARS ? proxy |
| Granola, low-fat | as-eaten | 60 | 63 | 137 |  |  | 100 | ARS ? proxy |
| Grape-Nuts cereal | as-eaten | 60 | 63 | 137 |  |  | 100 | ARS ? proxy |
| Grits, cooked | cooked | 257 | 238 | 484 |  |  | 280 | ARS 1.013 direct |
| Kashi GO cereal (protein & fiber) | as-eaten | 60 | 63 | 137 |  |  | 100 | ARS ? proxy |
| La Banderita Carb Counter soft taco tortilla | as-eaten | 55 | 55 | 146 |  | 42 | 84 | ARS 1.005 proxy |
| Millet, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |
| Mission Carb Balance tortilla, burrito (large) | as-eaten | 55 | 55 | 146 |  | 70 | 70 | ARS 1.005 proxy |
| Mission Carb Balance tortilla, soft taco | as-eaten | 55 | 55 | 146 |  | 42 | 84 | ARS 1.005 proxy |
| Mission Carb Balance tortilla, whole wheat | as-eaten | 55 | 55 | 146 |  | 43 | 86 | ARS 1.005 proxy |
| Oat bran, dry (Bob's Red Mill) | dry | 40 | 49 | 88 |  |  | 100 | ARS 1.014 proxy |
| Oats, cooked (in water) | cooked | 234 | 264 | 473 |  |  | 280 | ARS 1.014 direct |
| Oats, dry (raw) | dry | 40 | 49 | 88 |  |  | 100 | ARS 1.014 direct |
| Ole Xtreme Wellness high fiber tortilla | as-eaten | 55 | 55 | 146 |  | 45 | 90 | ARS 1.005 proxy |
| Pasta, cooked | cooked | 140 | 148 | 420 |  |  | 280 | ARS 1.019 direct |
| Pita bread | as-eaten | 50 | 48 | 104 |  | 60 | 90 | ARS 1.001 proxy |
| Popcorn, air-popped | as-eaten | 30 | 35 | 87 |  |  | 100 | ARS 1.091 direct |
| Potato, baked, flesh | cooked | 110 | 118 | 236 |  |  | 280 | ARS 1.038 direct |
| Quinoa, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |
| Rice cake, brown rice | as-eaten | 15 | 23 | 47 |  | 18 | 40 | ARS 1.008 proxy |
| Rye bread | as-eaten | 50 | 51 | 104 |  | 64 | 64 | ARS 1.002 proxy |
| Shirataki noodles (konjac) | cooked | 140 | 148 | 420 |  |  | 280 | ARS 1.019 proxy |
| SmartBran cereal, high-fiber | as-eaten | 40 | 42 | 92 |  |  | 38 | ARS ? proxy |
| Sourdough / French bread | as-eaten | 50 | 48 | 104 |  | 50 | 69.5 | ARS 1.001 direct |
| Sweet potato, baked | cooked | 110 | 118 | 236 |  |  | 280 | ARS 1.038 proxy |
| Thomas' Light Multi-Grain English muffin | as-eaten | 55 | 59 | 122 |  | 57 | 85.5 | ARS 1.003 proxy |
| Wasa Light Rye crispbread crackers | as-eaten | 15 | 23 | 47 |  | 18 | 40 | ARS 1.008 proxy |
| Wheat bran, crude | as-eaten | 15 | 15 | 36 |  |  | 42 | RACC x2.4 |
| White bread | as-eaten | 50 | 48 | 104 |  | 50 | 60 | ARS 1.001 direct |
| White rice, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 direct |
| Whole wheat bread | as-eaten | 50 | 51 | 104 |  | 64 | 64 | ARS 1.002 direct |
| Whole wheat pasta, cooked | cooked | 140 | 148 | 420 |  |  | 280 | ARS 1.019 direct |
| Wild rice, cooked | cooked | 140 | 138 | 335 |  |  | 280 | ARS 1.018 proxy |

### Legumes (14)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Black beans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Black-eyed peas, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Chickpeas, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Green peas, cooked | cooked | 85 | 90 | 170 |  |  | 230 | ARS 1.033 direct |
| Hummus | as-eaten | 30 | 30 | 54 |  |  | 230 | RACC x1.8 |
| Kidney beans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Lentils, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Lima beans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Navy beans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Pinto beans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| Refried beans, canned | as-eaten | 130 | 148 | 385 |  |  | 230 | ARS 1.042 proxy |
| Soybeans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 proxy |
| Split peas, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |
| White beans, cooked | cooked | 90 | 109 | 345 |  | 90 | 230 | ARS 1.041 direct |

### Nuts & Seeds (19)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Almond butter | as-eaten | 32 | 23 | 47 | 49 |  | 32 | ARS 1.075 proxy |
| Almonds | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Brazil nuts | as-eaten | 30 | 5 | 5 | 5 |  | 5 | selenium UL |
| Cashews, raw | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Chia seeds | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Flaxseed | as-eaten | 15 | 11 | 22 | 23 |  | 45 | ARS 1.075 proxy |
| Hazelnuts | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Hemp seeds | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Macadamia nuts | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| PBfit powdered peanut butter | dry | 16 | 12 | 24 |  |  | 45 | ARS 1.075 proxy |
| Peanut butter, smooth | as-eaten | 32 | 23 | 47 | 49 |  | 32 | ARS 1.075 direct |
| Peanuts, dry-roasted | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Pecans | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Pine nuts | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Pistachios, raw | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Pumpkin seeds | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Sunflower seeds | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |
| Tahini (sesame butter) | as-eaten | 30 | 22 | 44 | 46 |  | 32 | ARS 1.075 proxy |
| Walnuts | as-eaten | 30 | 22 | 44 | 46 |  | 45 | ARS 1.075 proxy |

### Fats & Oils (7)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Avocado oil | as-eaten | 14 | 9.2 | 21 | 42 |  | 15 | ARS 1.102 proxy |
| Canola oil | as-eaten | 14 | 9.2 | 21 | 42 |  | 15 | ARS 1.102 proxy |
| Coconut oil | as-eaten | 14 | 9 | 20 | 42 |  | 15 | ARS 1.102 proxy |
| Flaxseed oil | as-eaten | 14 | 4.5 | 14 | 42 |  | 15 | judgment |
| Mayonnaise | as-eaten | 15 | 11 | 22 | 30 |  | 15 | ARS 1.104 direct |
| Olive oil | as-eaten | 14 | 8.9 | 20 | 42 |  | 15 | ARS 1.102 proxy |
| Sesame oil | as-eaten | 14 | 4.5 | 14 | 42 |  | 15 | judgment |

### Condiments & Misc (42)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Almond milk, unsweetened | as-eaten | 262 | 230 | 526 |  |  | 320 | ARS 1.049 proxy |
| BBQ sauce | as-eaten | 34 | 34 | 61 |  |  | 60 | RACC x1.8 |
| Bone broth, chicken | as-eaten | 245 | 372 | 749 |  |  | 320 | ARS 1.088 proxy |
| Chicken broth, low-sodium | as-eaten | 245 | 372 | 749 |  |  | 320 | ARS 1.088 proxy |
| Chimichurri sauce | as-eaten | 30 | 31 | 62 | 66 |  | 30 | ARS 1.103 proxy |
| Chipotle in adobo | as-eaten | 5 | 5.8 | 16 |  |  | 25 | ARS 1.092 proxy |
| Cinnamon, ground | as-eaten | 0.7 | 0.7 | 1.2 |  |  | 15 | RACC x1.8 |
| Cocoa powder, unsweetened | dry | 5.4 | 5.4 | 14 |  |  | 22 | RACC x2.6 |
| Coconut aminos | as-eaten | 15 | 6 | 26 | 29 |  | 60 | ARS 1.094 proxy |
| Coffee, brewed | as-eaten | 355 | 370 | 1066 |  |  | 60 | ARS 1.076 direct |
| Dark chocolate 70-85% | as-eaten | 30 | 38 | 79 |  |  | 60 | ARS 1.109 proxy |
| Dijon mustard | as-eaten | 5 | 5.8 | 16 | 16 |  | 60 | ARS 1.092 proxy |
| Enchilada sauce, red | as-eaten | 60 | 61 | 157 |  |  | 60 | ARS 1.106 proxy |
| Gochujang (Korean chili paste) | as-eaten | 6 | 6.9 | 19 |  |  | 25 | ARS 1.092 proxy |
| Greek yogurt ranch dressing | as-eaten | 30 | 31 | 62 | 66 |  | 60 | ARS 1.103 proxy |
| Harissa paste | as-eaten | 5 | 5.8 | 16 |  |  | 25 | ARS 1.092 proxy |
| Honey | as-eaten | 21 | 16 | 38 | 39 |  | 25 | ARS 1.111 proxy |
| Hot sauce, cayenne (Frank's-style) | as-eaten | 5 | 5.8 | 16 | 16 |  | 60 | ARS 1.092 proxy |
| Ketchup | as-eaten | 17 | 14 | 37 | 45 |  | 60 | ARS 1.093 direct |
| Light peanut sauce (PB powder) | as-eaten | 30 | 30 | 54 |  |  | 60 | RACC x1.8 |
| Maple syrup | as-eaten | 40 | 40 | 59 | 60 |  | 25 | ARS 1.107 direct + override |
| Marinara sauce | as-eaten | 125 | 125 | 225 |  |  | 320 | ARS 1.030 proxy + override |
| Matcha green tea powder | dry | 2 | 2 | 3.6 |  |  | 21 | ARS 1.092 proxy + override |
| Mayonnaise, light | as-eaten | 15 | 11 | 22 | 30 |  | 30 | ARS 1.104 proxy |
| Miso paste | as-eaten | 6 | 6.9 | 19 |  |  | 25 | ARS 1.092 proxy |
| Nutritional yeast | as-eaten | 10 | 10 | 18 |  |  | 60 | RACC x1.8 |
| Olives, ripe | as-eaten | 15 | 15 | 27 |  |  | 60 | RACC x1.8 |
| Pico de gallo | as-eaten | 30 | 30 | 54 |  |  | 60 | RACC x1.8 |
| Ponzu sauce | as-eaten | 18 | 7.2 | 31 | 35 |  | 60 | ARS 1.094 proxy |
| Psyllium husk | dry | 5 | 5 | 9 |  |  | 11 | RACC x1.8 |
| Salsa | as-eaten | 36 | 36 | 65 |  |  | 60 | RACC x1.8 |
| Salsa verde (tomatillo) | as-eaten | 30 | 30 | 54 |  |  | 60 | RACC x1.8 |
| Soy sauce | as-eaten | 16 | 6 | 26 | 29 |  | 60 | ARS 1.094 direct |
| Spicy brown mustard | as-eaten | 5 | 5.8 | 16 | 16 |  | 60 | ARS 1.092 direct |
| Sriracha / hot sauce | as-eaten | 6.5 | 7.5 | 21 | 21 |  | 60 | ARS 1.092 proxy |
| Sugar-free chocolate syrup | as-eaten | 36 | 36 | 94 |  |  | 12 | RACC x2.6 |
| Sugar-free fruit jam | as-eaten | 16 | 12 | 29 | 30 |  | 60 | ARS 1.111 proxy |
| Sugar-free instant pudding mix, dry | dry | 8 | 8 | 21 |  |  | 60 | RACC x2.6 |
| Sugar-free maple syrup | as-eaten | 40 | 40 | 59 | 60 |  | 11 | ARS 1.107 direct + override |
| Teriyaki sauce, sugar-free | as-eaten | 18 | 7.2 | 31 | 35 |  | 60 | ARS 1.094 proxy |
| Tzatziki (Greek yogurt sauce) | as-eaten | 30 | 30 | 54 |  |  | 60 | RACC x1.8 |
| Yellow mustard | as-eaten | 5 | 5.8 | 16 | 16 |  | 60 | ARS 1.092 direct |

### Fruits (24)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Apple, raw, with skin | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 direct |
| Apricots, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Avocado, raw | raw | 50 | 50 | 90 | 136 |  | 150 | RACC x1.8 |
| Banana, raw | raw | 140 | 116 | 140 |  |  | 192 | ARS 1.048 direct |
| Blackberries, raw | raw | 140 | 140 | 154 |  |  | 192 | ARS 2.043 proxy |
| Blueberries, raw | raw | 140 | 140 | 154 |  |  | 192 | ARS 2.043 proxy |
| Cantaloupe, raw | raw | 140 | 140 | 252 |  |  | 192 | RACC x1.8 |
| Cherries, sweet, raw | raw | 140 | 140 | 196 |  |  | 192 | ARS 2.044 proxy |
| Figs, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Grapefruit, raw | raw | 140 | 123 | 253 |  |  | 192 | ARS 1.043 proxy |
| Grapes, raw | raw | 140 | 140 | 196 |  |  | 192 | ARS 2.044 direct |
| Kiwifruit, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Mango, raw | raw | 140 | 140 | 252 |  |  | 192 | RACC x1.8 |
| Medjool dates | as-eaten | 40 | 40 | 72 |  |  | 192 | RACC x1.8 |
| Orange, raw | raw | 140 | 123 | 253 |  |  | 192 | ARS 1.043 direct |
| Peach, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Pear, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Pineapple, raw | raw | 140 | 140 | 252 |  |  | 192 | RACC x1.8 |
| Plums, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Pomegranate, raw | raw | 140 | 132 | 212 |  |  | 192 | ARS 1.045 proxy |
| Raisins | as-eaten | 40 | 40 | 72 |  |  | 192 | RACC x1.8 |
| Raspberries, raw | raw | 140 | 140 | 154 |  |  | 192 | ARS 2.043 proxy |
| Strawberries, raw | raw | 140 | 140 | 154 |  |  | 192 | ARS 2.043 direct |
| Watermelon, raw | raw | 280 | 280 | 504 |  |  | 192 | RACC x1.8 |

### Vegetables (47)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Artichoke, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Arugula, raw | raw | 85 | 31 | 110 |  |  | 96 | ARS 1.024 proxy |
| Asparagus, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Beets, cooked | cooked | 85 | 63 | 156 |  |  | 296 | ARS 1.027 proxy |
| Bell pepper, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Bell pepper, red, raw | raw | 85 | 43 | 123 |  |  | 296 | ARS 1.029 proxy |
| Bok choy, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Broccoli, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 direct |
| Broccoli, raw | raw | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Brussels sprouts, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Butternut squash, baked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Cabbage, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Cabbage, raw | raw | 85 | 87 | 183 |  |  | 296 | ARS 1.032 proxy |
| Carrots, cooked | cooked | 85 | 63 | 156 |  |  | 296 | ARS 1.027 direct |
| Carrots, raw | raw | 85 | 26 | 100 |  |  | 296 | ARS 1.028 direct |
| Cauliflower, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Celery, raw | raw | 85 | 40 | 85 |  |  | 296 | ARS 2.021 proxy |
| Collard greens, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Cucumber, raw | raw | 85 | 29 | 200 |  |  | 296 | ARS 1.023 direct |
| Daikon radish, raw | raw | 85 | 26 | 100 |  |  | 296 | ARS 1.028 proxy |
| Eggplant, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Garlic, raw | raw | 4 | 4 | 7.2 |  |  | 9 | RACC x1.8 |
| Green beans, cooked | cooked | 85 | 88 | 202 |  |  | 144 | ARS 1.031 direct |
| Iceberg lettuce, raw | raw | 85 | 31 | 110 |  |  | 96 | ARS 1.024 direct |
| Jicama, raw | raw | 85 | 26 | 100 |  |  | 296 | ARS 1.028 proxy |
| Kale, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Kimchi | as-eaten | 30 | 30 | 65 |  |  | 80 | ARS 1.095 proxy |
| Leeks, cooked | cooked | 85 | 17 | 85 |  |  | 296 | ARS 1.035 proxy |
| Mushrooms, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Okra, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Onion, raw | raw | 85 | 17 | 85 |  |  | 112 | ARS 1.035 direct |
| Pickles, dill | as-eaten | 30 | 14 | 65 |  |  | 9 | ARS 1.095 direct |
| Pumpkin, canned | as-eaten | 130 | 130 | 234 |  |  | 296 | RACC x1.8 |
| Radish, raw | raw | 85 | 26 | 100 |  |  | 296 | ARS 1.028 proxy |
| Riced cauliflower, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Romaine lettuce | raw | 85 | 31 | 110 |  |  | 96 | ARS 1.024 direct |
| Sauerkraut (raw, live cultures) | as-eaten | 30 | 30 | 65 |  |  | 80 | ARS 1.095 proxy |
| Seaweed snack, roasted | as-eaten | 5 | 5 | 13 |  |  | 296 | RACC x2.6 |
| Snap peas, cooked | cooked | 85 | 107 | 275 |  |  | 128 | ARS 1.026 proxy |
| Spaghetti squash, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Spinach, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Spinach, raw | raw | 85 | 31 | 110 |  |  | 96 | ARS 1.024 proxy |
| Sweet corn, cooked | cooked | 85 | 94 | 228 |  |  | 128 | ARS 1.034 direct |
| Swiss chard, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |
| Tomato, raw | raw | 85 | 43 | 123 |  |  | 296 | ARS 1.029 direct |
| Vegan kimchi | as-eaten | 30 | 30 | 65 |  |  | 80 | ARS 1.095 proxy |
| Zucchini, cooked | cooked | 85 | 107 | 275 |  |  | 296 | ARS 1.026 proxy |

### Sweet Treats & Snacks (53)

| Food | Basis | RACC | Typical | Max/meal | Max/day | Min as star | App today | Source |
|---|---|---|---|---|---|---|---|---|
| Apple & almond butter | as-eaten | 140 | 166 | 212 |  |  | 320 | ARS 1.045 proxy |
| Apple Pie Protein Nachos | as-eaten | 140 | 165 | 212 |  |  | 320 | ARS 1.045 proxy |
| Apple nachos | as-eaten | 140 | 178 | 212 |  |  | 320 | ARS 1.045 proxy |
| Banana protein nice cream | as-eaten | 88 | 190 | 266 |  |  | 320 | ARS 1.058 proxy |
| Berry protein fluff | as-eaten | 125 | 170 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Cheesy nutritional yeast popcorn | as-eaten | 30 | 26 | 87 |  |  | 320 | ARS 1.091 proxy |
| Chocolate PB protein yogurt | as-eaten | 170 | 198 | 341 |  |  | 320 | ARS 1.049 proxy |
| Chocolate PBfit fudge pops | as-eaten | 88 | 163 | 266 |  |  | 320 | ARS 1.058 proxy |
| Chocolate chia protein pudding | as-eaten | 125 | 228 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Chocolate protein mug cake | as-eaten | 80 | 167 | 181 |  |  | 320 | ARS 1.010 proxy |
| Chocolate silken tofu mousse | as-eaten | 125 | 192 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Cookies & cream protein ice cream | as-eaten | 88 | 203 | 266 |  |  | 320 | ARS 1.058 proxy |
| Cottage Cheese Tiramisu Cups | as-eaten | 125 | 174 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Cottage cheese & berries | as-eaten | 110 | 220 | 225 |  |  | 320 | ARS 2.048 proxy |
| Cottage cheese cheesecake bowl | as-eaten | 110 | 217 | 225 |  |  | 320 | ARS 2.048 proxy |
| Cottage cheese cheesecake pudding cup | as-eaten | 125 | 198 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Cottage cheese ice cream (choc-PB) | as-eaten | 88 | 239 | 266 |  |  | 320 | ARS 1.058 proxy |
| Cottage cheese ranch veggie dip | as-eaten | 110 | 220 | 225 |  |  | 320 | ARS 2.048 proxy |
| Dark chocolate chips, no sugar added | as-eaten | 15 | 19 | 40 |  |  | 75 | ARS 1.109 proxy |
| Dilly tuna cucumber rounds | as-eaten | 100 | 200 | 240 |  |  | 320 | recipe; max RACC x2.4 |
| Dubai-Style Pistachio Tahini Crunch Bars | as-eaten | 40 | 75 | 90 |  |  | 320 | ARS 1.010 proxy |
| Fiber One 70 Calorie brownie, chocolate fudge | as-eaten | 40 | 37 | 90 |  |  | 57 | ARS 1.010 proxy |
| Flourless protein brownie | as-eaten | 40 | 44 | 90 |  |  | 320 | ARS 1.010 proxy |
| Frozen Greek Yogurt Berry Clusters | as-eaten | 88 | 89 | 266 |  |  | 320 | ARS 1.058 proxy |
| Greek yogurt berry bark | as-eaten | 88 | 260 | 266 |  |  | 320 | ARS 1.058 proxy |
| Greek yogurt cookie dough | as-eaten | 170 | 196 | 341 |  |  | 320 | ARS 1.049 proxy |
| High-protein banana pudding | as-eaten | 125 | 238 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| High-protein chia pudding | as-eaten | 125 | 227 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Kimchi egg-white scramble cup | as-eaten | 110 | 160 | 264 |  |  | 320 | recipe; max RACC x2.4 |
| Lemon cheesecake protein mousse | as-eaten | 125 | 171 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Mango egg-white smoothie | as-eaten | 250 | 1374 | 600 |  |  | 320 | recipe; max RACC x2.4 |
| Mango egg-white smoothie, high-protein | as-eaten | 250 | 1289 | 600 |  |  | 320 | recipe; max RACC x2.4 |
| Matcha Protein Panna Cotta | as-eaten | 125 | 179 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Miso tofu greens broth | as-eaten | 245 | 142 | 749 |  |  | 320 | ARS 1.088 proxy |
| No-Bake Banana Pudding Protein Jars | as-eaten | 125 | 206 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| No-bake protein balls | as-eaten | 40 | 25 | 90 |  |  | 320 | ARS 1.010 proxy |
| PBfit banana rice cake stacks | as-eaten | 85 | 80 | 221 |  |  | 40 | recipe; max RACC x2.6 |
| Pickle & seaweed crunch plate | as-eaten | 30 | 70 | 70 |  |  | 320 | ARS 1.095 proxy |
| Protein Croffle Bites with Strawberry Cottage-Cheese Cream | as-eaten | 85 | 104 | 122 |  |  | 320 | ARS 1.012 proxy |
| Protein hot cocoa | as-eaten | 240 | 231 | 482 |  |  | 320 | ARS 1.049 proxy |
| Pumpkin Tahini Protein Blondie Bites | as-eaten | 40 | 58 | 90 |  |  | 320 | ARS 1.010 proxy |
| Pumpkin pie protein whip | as-eaten | 125 | 198 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Pumpkin spice protein fluff | as-eaten | 125 | 191 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Salted Date-Caramel Protein Stuffed Dates | as-eaten | 40 | 47 | 105 |  |  | 320 | ARS 1.109 proxy |
| Sesame chili edamame | as-eaten | 85 | 120 | 170 |  |  | 320 | ARS 1.033 proxy |
| Strawberry cheesecake protein jar | as-eaten | 110 | 187 | 225 |  |  | 320 | ARS 2.048 proxy |
| Strawberry sugar-free jello parfait | as-eaten | 125 | 257 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Sugar-free gelatin, prepared | as-eaten | 117 | 117 | 304 |  |  | 320 | RACC x2.6 |
| Tiramisu ricotta cream cups | as-eaten | 125 | 125 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Tomato white bean soup | as-eaten | 245 | 240 | 749 |  |  | 320 | ARS 1.088 proxy |
| Triple-berry cottage cheese bark | as-eaten | 88 | 235 | 266 |  |  | 320 | ARS 1.058 proxy |
| Vanilla berry protein chia pudding | as-eaten | 125 | 217 | 325 |  |  | 320 | recipe; max RACC x2.6 |
| Whipped Ricotta & Roasted Cherry Protein Toast | as-eaten | 140 | 148 | 336 |  |  | 320 | recipe; max RACC x2.4 |

## Sources

- FDA, 21 CFR 101.12(b) Table 2, Reference Amounts Customarily Consumed per Eating Occasion: General Food Supply. eCFR, current as of 2026-09-22. https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/subpart-A/section-101.12
- FSIS, 9 CFR 317.312(b) Table 2 (meat) and 9 CFR 381.412(b) Table 2 (poultry), reference amounts. https://www.ecfr.gov/current/title-9/chapter-III/subchapter-A/part-317/subpart-B/section-317.312 and https://www.ecfr.gov/current/title-9/chapter-III/subchapter-A/part-381/subpart-Y/section-381.412
- FDA, Guidance for Industry: Reference Amounts Customarily Consumed: List of Products for Each Product Category (March 2018). https://www.fda.gov/media/102587/download
- Smiciklas-Wright H, Mitchell DC, Mickle SJ, Cook AJ, Goldman JD. Foods Commonly Eaten in the United States: Quantities Consumed Per Eating Occasion and in a Day, 1994-96. USDA NFS Report No. 96-5, 2002. Table Set 1 (per eating occasion) and Set 2 (per day). https://www.ars.usda.gov/ARSUserFiles/80400530/pdf/portion.pdf
- USDA FSIS, Food Standards and Labeling Policy Book (2005): ENTREE, SANDWICH - CLOSED/OPEN, SALADS, POULTRY STANDARDS, CHINESE PEPPER STEAK, FRIED RICE WITH MEAT, BURRITOS, FAJITAS. https://www.fsis.usda.gov/guidelines/2005-0003 (text read from the copy hosted at https://meatsci.osu.edu/sites/meatsci/files/imce/Labeling_Policy_Book_082005_0.pdf because fsis.usda.gov returned 403)
- USDA FNDDS 5.0 documentation, "Amounts" section (QNS weights are not representative intakes). https://www.ars.usda.gov/ARSUserFiles/80400530/pdf/fndds/fndds5_doc.pdf
- Duffey KJ, Popkin BM. Energy density, portion size, and eating occasions: contributions to increased energy intake in the United States, 1977-2006. PLoS Med 2011;8:e1001050. https://doi.org/10.1371/journal.pmed.1001050
- Fulgoni VL et al. Avocado consumption... NHANES 2001-2008. Nutr J 2013;12:1 (mean 70.1 g/day among consumers). https://doi.org/10.1186/1475-2891-12-1
- O'Neil CE et al. Tree nut consumption... NHANES 2005-2010. Nutrients 2015;7:595-607 (mean usual intake 44.3 g/day among consumers). https://doi.org/10.3390/nu7010595
- FDA qualified health claim for nuts and heart disease (1.5 oz/day). https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/qualified-health-claims-letters-enforcement-discretion
- NIH Office of Dietary Supplements, Selenium fact sheet (UL 400 ug/day adults; 68-91 ug per Brazil nut). https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/ (page returned 403 to the fetcher; values taken from the search-result extract of that page).
- 21 CFR 101.81 (psyllium health claim: 7 g/day soluble fibre from psyllium husk). https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/subpart-E/section-101.81
- USDA FoodData Central Branded Foods (2025-04-24 release; local copy /Volumes/T7/fdc-branded/branded.db): protein-powder label servings; Sweet Earth Traditional Seitan (FDC 2658596).
- USDA SR Legacy cooked/dry and cooked/raw ratios as stored in ob-meal-planner app/data/yields.js (rice 0.356, pasta 0.423, oats 0.187, chicken breast raw 1.379).
- Literature search: Consensus (1 query) and PubMed (2 queries) were used to look for newer per-occasion percentile data; they did not turn up a newer US source with per-occasion percentiles for individual foods. Zheng et al. 2016 (Sci Rep, Australia, medians only, tables not in the PMC text) was reviewed and not used.
