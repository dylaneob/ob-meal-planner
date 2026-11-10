# Hard-to-buy foods in OB meal plans: how much the auto-drafter relies on them

Generated 2026-09-24T15:11:47.713Z by a read-only analysis; nothing under the app folder was changed.

App snapshots used. Reliance runs: 2026-09-24 09:47:32 EDT start (13:47:32Z), finished by 09:55 EDT, foods.js `bbbdb505e771493f2fd780a45fc3176c`, app.js `a051f3012b1f3c3246b6bcacad64cfda`, templates.js `050d94e884da493e4250b0c013f24bad`, tests.js `3959bb4bcab3b215966eaf31adb7cd07`. What-if runs: the same snapshot. Template check: 2026-09-24T15:10:21.237Z, foods.js `6be9d657aa494c4a93fe0b8ec1384b9f`, app.js `96ef66914cc767bd4e36471de2aa1cf0` (templates.js is identical to the reliance snapshot; foods.js and app.js had been edited since the reliance runs (food names unchanged)). The app was being edited by someone else during this work (foods.js 09:52, app.js 10:16, tests.js 10:16). A full re-run on the 10:17 snapshot was started and stopped: the machine was saturated (load average ~50) and the jobs were getting under 5% CPU.

## Method

- **Days:** the 480 harness configs (`window.__obMakeConfig(b,i)`, b = 1..12, i = 0..39) run once per diet with `P.diet` overridden, one day each via `T.withProfile(P, () => T.buildOneDay(P, seed))`. Script: `reliance.js`. No config has any "likes", so seitan stays opted out, as for a real client who has not asked for it. The harness mixes modes (plain, simple, volume, GLP-1, budget, gut, meal prep), gluten-free (about 18%) and halal (about 12%) the same way the test suite does.
- **% days:** share of the 480 days on which the food appears at least once. That counts the food on its own and as an ingredient inside a homemade recipe food; recipe ingredients are scaled by served grams / batch grams.
- **Protein share (days present):** the food's protein as a share of that day's total protein, averaged over the days it appears. **kcal share** is the same for calories. **Share of all protein** is the food's protein over the diet's whole 480-day protein total, which is the single number for how much the diet's protein rests on it.
- **Listed:** every `most` or `specialty` food that is on more than 5% of days OR carries more than 10% of protein on the days it appears. Sorted by % of days (how often a client on that diet is handed the item), then protein share. Tiers and evidence are in `availability.json`.
- **Templates:** `templates_check.js`. The pool is the app's own `allowedFoods()` for a default profile of that diet. A template counts as specialty-dependent when a required slot (protein, plus carb and fat for meals; for a snack the carb only when it has no usable produce or is a baked snack) resolves in that pool **only** to specialty foods, or when a food word in its **title** is served only by specialty foods among the template's own slot and extra hits. Slots are `|`-separated case-insensitive regexes matched against food names with commas stripped, the same way the app matches them. Titles with seitan are skipped because seitan is opt-in, and so are tofu/tempeh titles for omnivores, which the app never offers them.

## Availability tiers (all 354 foods)

everywhere 190, most 80, specialty 34, and 50 homemade recipe foods (28 with ordinary ingredients, 22 using at least one most/specialty ingredient). Evidence for each food is in `availability.json`: web research by nine research sub-agents, with every cited URL checked against the tool results it came from, plus 103 live store checks this agent ran in a browser on 2026-09-24 against one Walmart Supercenter (#2946, Davie FL 33317) and one ALDI (Cooper City FL 33314) (`browser_checks.json`). A single store in each chain is a sample, not a census, and South Florida stocks more Latin and Caribbean foods than the national average, which matters for arepas and bulgur.

## Top 15 reliance problems (all diets)

Ranked by how much of a diet's protein rests on the food: its share of all protein across that diet's 480 days, which is % of days times protein share. Each food is listed once, under the diet where it carries the most protein; other diets where it passes the threshold are named.

| # | Food | Tier | Diet | % days | Protein share (days present) | Share of all protein | Also in | Everywhere swap |
|---:|---|---|---|---:|---:|---:|---|---|
| 1 | Pea & rice protein powder | most | vegan | 69.0% | 22.6% | 15.6% | omnivore 3.5%, pescatarian 2.7%, vegetarian 2.7%, ovo 46.0% | Orgain or Equate plant protein powder (Walmart, Target, Kroger, Costco); recompute scoops from the label (the database blend is 63 g protein/100 g) |
| 2 | Soy protein isolate, powder | specialty | ovo | 51.7% | 24.1% | 14.4% | vegan 50.0% | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 83 g protein/100 g, so add a scoop or another protein |
| 3 | Tempeh | most | vegan | 37.7% | 19.1% | 7.6% | pescatarian 4.6%, vegetarian 19.8%, ovo 29.0% | firm tofu (everywhere): tempeh has 20.3 g protein/100 g vs tofu 10.6, so about 2x the grams (and 2x the fat) for the same protein, or tofu + edamame |
| 4 | Pea protein isolate, powder | specialty | vegan | 19.4% | 25.2% | 4.6% | omnivore 0.2%, vegetarian 0.4%, ovo 2.7% | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 80 g protein/100 g, so add a scoop or another protein |
| 5 | PBfit powdered peanut butter | most | vegan | 52.5% | 6.1% | 3.3% | omnivore 9.2%, pescatarian 9.6%, vegetarian 6.0%, ovo 8.8% | any powdered peanut butter (PB2, Great Value); regular peanut butter is not like-for-like (51 g fat/100 g vs 15.6) |
| 6 | Soybeans, cooked | specialty | vegan | 17.1% | 17.6% | 3.1% | vegetarian 0.4%, ovo 16.7% | frozen shelled edamame (everywhere): 11.9 g protein/100 g vs 18.2, so about 1.5x the grams |
| 7 | Cottage cheese, nonfat | most | vegetarian | 20.6% | 13.3% | 2.8% | omnivore 6.5%, pescatarian 10.6% | 1% or 2% lowfat cottage cheese (about +2 g fat per 100 g) |
| 8 | Skyr, plain nonfat | most | vegetarian | 13.3% | 17.7% | 2.4% | omnivore 15.2%, pescatarian 13.8% | nonfat plain Greek yogurt (59 kcal, 10.2 g protein vs 63 kcal, 11 g per 100 g) |
| 9 | Trout, rainbow, farmed, cooked | most | pescatarian | 7.7% | 19.6% | 1.6% | omnivore 3.8% | steelhead trout (same species) or salmon |
| 10 | Salmon, Atlantic wild, cooked | specialty | pescatarian | 5.0% | 23.9% | 1.3% | omnivore 3.3% | frozen wild sockeye salmon (everywhere): 156 kcal, 26.5 g protein, 5.6 g fat per 100 g vs 182/25.4/8.1; farmed Atlantic is fattier (206/22.1/12.4) |
| 11 | Buckwheat groats, cooked | specialty | vegan | 13.1% | 6.4% | 0.8% | ovo 7.7% | quinoa (4.4 g protein/100 g vs 3.4) or bulgur/brown rice |
| 12 | TVP (textured soy protein), dry | specialty | vegetarian | 4.8% | 15.5% | 0.8% | ovo 4.6%, vegan 5.0% | lentils, firm tofu or frozen edamame (all everywhere); TVP is 51 g protein/100 g dry, so portions change |
| 13 | Ground chicken breast, 98% lean, cooked | most | omnivore | 3.8% | 19.2% | 0.7% | - | 99% lean ground turkey breast, or regular lean ground chicken (more fat) |
| 14 | Tofu, silken | specialty | vegan | 9.4% | 6.3% | 0.6% | - | firm tofu blended smooth (for mousse, dressings, scrambles); for non-vegans, nonfat Greek yogurt in desserts |
| 15 | Bulgur, cooked | most | vegan | 10.2% | 6.1% | 0.6% | omnivore 5.2%, vegetarian 5.2% | quinoa or brown rice (less fiber than bulgur) |

**Frequent but low-protein items (on 10% or more of a diet's days, under 5% of protein).** These are easy swaps, but the client still has to find them:

- Miso paste (most): vegan 37.7%, ovo 27.9%. Swap: low-sodium soy sauce for the salty-umami role (use less; miso is a paste at 199 kcal/100 g)
- Tahini (sesame butter) (most): vegan 25.4%, ovo 12.9%. Swap: peanut butter or sunflower-seed butter (similar kcal and fat per 100 g)
- Psyllium husk (specialty): omnivore 25.2%, pescatarian 18.8%. Swap: sugar-free Metamucil or store-brand sugar-free psyllium fiber powder (in store at Walmart)
- Bok choy, cooked (most): pescatarian 22.5%, vegan 19.8%, omnivore 17.3%, ovo 13.1%. Swap: green cabbage, broccoli or spinach
- Cherries, sweet, raw (most): vegan 22.3%. Swap: frozen dark sweet cherries, or blueberries/strawberries
- Vegan kimchi (most): vegan 21.5%. Swap: sauerkraut (vegan) or leave it off
- Brazil nuts (most): vegan 16.9%, vegetarian 13.8%, omnivore 10.4%. Swap: one Brazil nut out of a can of mixed nuts, or omit it (the dishes use a single 5 g nut)
- Sauerkraut (raw, live cultures) (most): ovo 14.6%. Swap: shelf-stable jarred/canned sauerkraut (same macros, no live cultures)
- Collard greens, cooked (most): ovo 11.7%. Swap: kale (everywhere)
- Micellar casein, powder (specialty): vegetarian 10.8%. Swap: whey protein powder, or nonfat Greek yogurt / cottage cheese for a slow evening protein
- Gochujang (Korean chili paste) (most): vegan 10.8%, ovo 10.6%. Swap: sriracha with a little honey or sugar-free syrup

**Templates that cannot be built without a specialty food:** omnivore 21 of 458, pescatarian 22 of 358, vegetarian 14 of 265, ovo 9 of 174, vegan 8 of 148. A further omnivore 96, pescatarian 86, vegetarian 67, ovo 53, vegan 49 need a most-tier food. Per-diet lists are below.

## What if the hard-to-buy foods were made opt-in? (simulation, read-only)

Script: `whatif.js`. The same 480 days per diet, built again with the listed foods entered in the profile's "can't have" field. That is the app's own exclusion path, the one a coach would use for a client who cannot buy them. Pass rates use the harness's own tolerances: protein 82-118% of target (135% on high-carb plant days), calories within 100 kcal, and fiber at or above 72% of the floor. The exclusion list was 35 foods = the 34 final specialty foods plus Mussels, cooked (reclassified to everywhere after this run; mussels appear on at most 0.42% of days and never in vegetarian/ovo/vegan plans).

| Scenario | Diet | Foods excluded | Protein in tolerance: before -> after | Calories within 100: before -> after | Fiber floor met: before -> after | Median protein % of target: before -> after (p10 after) | Days not built |
|---|---|---:|---|---|---|---|---:|
| specialty foods removed | omnivore | 32 | 95.8% -> 96% | 100% -> 100% | 99.6% -> 99.8% | 102% -> 102% (100%) | 0 |
| specialty foods removed | pescatarian | 35 | 98.1% -> 98.3% | 100% -> 100% | 100% -> 99.8% | 102% -> 102% (100%) | 0 |
| specialty foods removed | vegetarian | 35 | 100% -> 100% | 100% -> 100% | 100% -> 100% | 102% -> 102% (100%) | 0 |
| specialty foods removed | ovo | 35 | 100% -> 100% | 100% -> 100% | 100% -> 100% | 101% -> 101% (98%) | 0 |
| specialty foods removed | vegan | 35 | 99% -> 99% | 100% -> 100% | 100% -> 100% | 101% -> 100% (98%) | 0 |

- vegetarian, specialty removed. The foods that took their place (extra days they appear): Ricotta cheese, part skim +26, Broccoli, cooked +21, Dijon mustard +20, Cottage cheese, nonfat +19, Cheese, reduced-fat cheddar +17, Milk, nonfat / skim +17, Blueberries, raw +15, Kale, cooked +15.
- ovo, specialty removed. The foods that took their place (extra days they appear): Pea & rice protein powder +178, Tofu, firm +89, Garlic, raw +40, Tempeh +34, White rice, cooked +32, Tomato, raw +30, Chickpeas, cooked +30, Green beans, cooked +28.
- vegan, specialty removed. The foods that took their place (extra days they appear): Tempeh +179, Pea & rice protein powder +136, Garlic, raw +58, PBfit powdered peanut butter +44, Oats, dry (raw) +42, Tomato, raw +32, White beans, cooked +31, Banana, raw +28.

## Omnivore (480 days built, 0 failed; avg 153.4 g protein / 2205 kcal per day)

| Food | Tier | % days | Protein share (days present) | kcal share (days present) | Share of all protein | Avg g/day when present | Main dishes | Everywhere swap |
|---|---|---:|---:|---:|---:|---:|---|---|
| Psyllium husk | specialty | 25.2% | 0.0% | 0.6% | 0.0% | 6.4 | 38x Honey-Soy Shrimp with Rice & Bok Choy; 10x Greek Yogurt with Berries & Granola | sugar-free Metamucil or store-brand sugar-free psyllium fiber powder (in store at Walmart) |
| Bok choy, cooked | most | 17.3% | 2.1% | 1.2% | 0.4% | 197.7 | 57x Honey-Soy Shrimp with Rice & Bok Choy; 10x Cajun Shrimp with Rice & Bok Choy | green cabbage, broccoli or spinach |
| Skyr, plain nonfat | most | 15.2% | 14.4% | 5.8% | 2.2% | 204.8 | 23x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut; 15x Skyr with Berries & One Brazil Nut | nonfat plain Greek yogurt (59 kcal, 10.2 g protein vs 63 kcal, 11 g per 100 g) |
| Brazil nuts | most | 10.4% | 0.5% | 1.6% | 0.1% | 5 | 23x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut; 15x Skyr with Berries & One Brazil Nut | one Brazil nut out of a can of mixed nuts, or omit it (the dishes use a single 5 g nut) |
| PBfit powdered peanut butter | most | 9.2% | 5.3% | 3.3% | 0.5% | 16.9 | 12x Protein Oatmeal with Banana & Peanut Butter; 9x Peanut Butter Banana Overnight Oats | any powdered peanut butter (PB2, Great Value); regular peanut butter is not like-for-like (51 g fat/100 g vs 15.6) |
| Collard greens, cooked | most | 7.7% | 3.1% | 2.6% | 0.2% | 155.9 | 9x Trinidad-Style Curry Shrimp with Sweet Potato & Callaloo; 6x Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg | kale (everywhere) |
| Bran cereal, high-fiber (Fiber One) | most | 7.5% | 2.1% | 4.1% | 0.2% | 43.2 | 5x Chocolate Kefir Protein Shake; 5x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut | store-brand bran flakes (much less fiber per gram) plus chia or flax |
| Kimchi | most | 7.5% (7 of them via a recipe) | 0.3% | 0.2% | 0.0% | 33.1 | 5x Cottage Cheese & Kimchi Bowl; 4x Cottage Cheese & Kimchi Bowl [recipe: Kimchi egg-white scramble cup] | sauerkraut (everywhere as a jar; live-culture kind is most) or leave it off |
| Cottage cheese, nonfat | most | 6.5% | 11.3% | 5.5% | 0.8% | 174.4 | 6x Cottage Cheese Protein Pancakes with Berries; 5x Cottage Cheese with Fruit | 1% or 2% lowfat cottage cheese (about +2 g fat per 100 g) |
| Cherries, sweet, raw | most | 5.8% | 0.8% | 2.9% | 0.1% | 119.3 | 4x Greek Yogurt with Apple, Cinnamon & Walnuts; 3x Pear & Cottage Cheese with a Brazil Nut | frozen dark sweet cherries, or blueberries/strawberries |
| Barley, cooked | most | 5.6% | 2.9% | 10.7% | 0.2% | 209.2 | 5x Beef, Barley & Vegetable Soup; 5x Salmon & Barley Bowl with Dill Yogurt | quinoa or brown rice |
| Wasa Light Rye crispbread crackers | most | 5.6% | 2.6% | 5.0% | 0.2% | 38.8 | 10x Tuna & White Bean Lettuce Cups; 4x Spicy Tuna Cucumber Boats | rice cakes (less fiber) or a slice of rye bread |
| Bulgur, cooked | most | 5.2% | 6.0% | 10.5% | 0.3% | 274.3 | 5x Tuscan Tuna & White Bean Salad with Bulgur; 5x Greek Tuna & Bulgur Lemon Bowl | quinoa or brown rice (less fiber than bulgur) |
| Coconut aminos | most | 5.2% | 0.0% | 0.6% | 0.0% | 12.8 | 9x Vietnamese Caramel-Braised Cod (Ca Kho To); 6x Brazilian Moqueca, Coconut Fish Stew over Rice | low-sodium soy sauce (unless the client avoids soy) |
| Trout, rainbow, farmed, cooked | most | 3.8% | 22.7% | 10.6% | 0.9% | 152.8 | 8x Trout, Lentil & Beet Salad; 6x Persian Baked Trout with Herbed Rice and Pomegranate Walnuts | steelhead trout (same species) or salmon |
| Ground chicken breast, 98% lean, cooked | most | 3.8% | 19.2% | 6.7% | 0.7% | 101.7 | 9x Savory Grits Breakfast Bowls with Sage Chicken & Spinach; 4x Chicken & Broccoli Stir-Fry Rice Bowl | 99% lean ground turkey breast, or regular lean ground chicken (more fat) |
| Pea & rice protein powder | most | 3.5% | 13.4% | 5.8% | 0.5% | 33.9 | 16x Plant Protein Chia Pudding with Berries; 1x Vegan Protein Overnight Oats with Berries & a Brazil Nut | Orgain or Equate plant protein powder (Walmart, Target, Kroger, Costco); recompute scoops from the label (the database blend is 63 g protein/100 g) |
| Salmon, Atlantic wild, cooked | specialty | 3.3% | 22.1% | 11.4% | 0.7% | 128.5 | 4x Salmon & Barley Bowl with Dill Yogurt; 3x Salmon & Spinach Tomato Curry | frozen wild sockeye salmon (everywhere): 156 kcal, 26.5 g protein, 5.6 g fat per 100 g vs 182/25.4/8.1; farmed Atlantic is fattier (206/22.1/12.4) |
| Lamb loin chop, lean, cooked | most | 1.0% | 27.6% | 14.3% | 0.3% | 143.4 | 4x Greek Lamb Chop with Lemon Potatoes & Village Salad; 1x Levantine Lamb and White Bean Stew (Fasolia) over Rice | lean pork loin chop or sirloin steak |
| Snapper, cooked | most | 1.0% | 27.3% | 10.2% | 0.4% | 196.4 | 5x Snapper a la Veracruzana over Rice | frozen cod or tilapia fillets |
| Mackerel, Atlantic, cooked | specialty | 0.8% | 23.9% | 15.4% | 0.2% | 135.8 | 2x Grilled Mackerel with Warm Potato & Green Bean Salad; 1x Smoked-Style Mackerel Plate with Rye & Pickled Cucumber | canned sardines (oily fish) or farmed salmon |
| Beef tenderloin, lean, roasted | most | 0.6% | 21.3% | 10.0% | 0.1% | 102.7 | 2x Steak & Baked Potato with Green Beans; 1x Sesame-Ginger Beef & Broccoli over Wild Rice | lean sirloin steak |
| Chickpea pasta, cooked | most | 0.6% | 17.3% | 20.9% | 0.1% | 375.3 | 3x Lemon-Dill Tuna Pasta Salad with Peas | whole wheat pasta (less protein and fiber) plus beans |
| Pollock, cooked | most | 0.4% | 21.8% | 6.9% | 0.1% | 150 | 2x Thai Hot & Sour Fish Soup | frozen cod or tilapia fillets (everywhere) |
| Halibut, cooked | most | 0.4% | 21.7% | 7.9% | 0.1% | 125 | 2x Brazilian Moqueca, Coconut Fish Stew over Rice | frozen cod fillets (closest macro match) |
| Beef, ground 97/3, cooked | specialty | 0.4% | 20.0% | 7.6% | 0.1% | 104 | 2x Italian Beef & Mozzarella Stuffed Peppers | 93/7 ground beef (+65 kcal, +6 g fat per 100 g) or 99% lean ground turkey |
| Kashi GO cereal (protein & fiber) | most | 0.2% | 19.7% | 18.7% | 0.0% | 100 | 1x Greek Yogurt Bowl with High-Fiber Cereal & Berries | bran flakes plus Greek yogurt or milk for the protein |
| Edamame pasta, cooked | specialty | 0.2% | 13.8% | 6.0% | 0.0% | 100 | 1x Spring Pasta Primavera with Chickpeas | whole wheat pasta plus frozen edamame |
| Pea protein isolate, powder | specialty | 0.2% | 12.9% | 4.1% | 0.0% | 30 | 1x Vegan Black Forest Cherry & Cocoa Overnight Oats | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 80 g protein/100 g, so add a scoop or another protein |

Listed specialty foods supply 1.0% of all omnivore protein; listed most-tier foods supply 8.2%.

**Templates that cannot be built without a specialty food (omnivore):** 21 of 458 offered.

| Template | Slot | Why (slot: only matching foods) | Times served in 480 days |
|---|---|---|---:|
| Buckwheat Porridge with Berries & Skyr | breakfast | carb: Buckwheat groats, cooked [specialty]; title:'buckwheat': Buckwheat groats, cooked [specialty] | 15 |
| Cottage Cheese Berry Bowl with Oats & Hemp | breakfast | fat: Hemp seeds [specialty]; title:'hemp': Hemp seeds [specialty] | 7 |
| Kefir Berry Bowl with Hemp | snack | title:'hemp': Hemp seeds [specialty] | 6 |
| Arepa with Eggs & Avocado | breakfast | carb: Arepa (cornmeal bread) [specialty]; title:'arepa': Arepa (cornmeal bread) [specialty] | 5 |
| Whipped Ricotta with Honey, Walnuts & Figs | snack | title:'figs': Figs, raw [specialty] | 3 |
| Grilled Mackerel with Warm Potato & Green Bean Salad | dinner | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 2 |
| Italian Beef & Mozzarella Stuffed Peppers | dinner | protein: Beef, ground 97/3, cooked [specialty]; title:'beef': Beef, ground 97/3, cooked [specialty]; title:'mozzarella': Mozzarella, fat-free [specialty] | 2 |
| Sesame Edamame & Buckwheat Noodle-Style Bowl | dinner | title:'buckwheat': Buckwheat groats, cooked [specialty] | 1 |
| Smoked-Style Mackerel Plate with Rye & Pickled Cucumber | lunch | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 1 |
| Spiced Mackerel with Sweet Potato & Greens | dinner | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 1 |
| Falafel & Bulgur Bowl with Lemon Tahini | lunch | title:'falafel': Falafel [specialty] | 0 |
| Falafel & Hummus Mezze Bowl with Warm Pita | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita Bowl with Lemon-Tahini Drizzle | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita with Tahini & Cucumber-Tomato Salad | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Mackerel & Lentil Salad with Mustard Dressing | lunch | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Mackerel Pate on Rye | snack | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Mackerel Teriyaki Rice Bowl | dinner | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Mackerel, Egg & Crispy Potato Breakfast Plate | breakfast | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Mezze Falafel Bowl with Hummus & Herbed Bulgur | dinner | title:'falafel': Falafel [specialty] | 0 |
| Miso-Glazed Cod with Edamame & Soba-Style Buckwheat | dinner | carb: Buckwheat groats, cooked [specialty]; title:'buckwheat': Buckwheat groats, cooked [specialty] | 0 |
| Whipped Ricotta Toast with Figs, Honey & Pistachios | breakfast | title:'figs': Figs, raw [specialty] | 0 |

<details><summary>96 more templates (omnivore) need a <code>most</code>-tier food (buildable only with an item a small-town store or Aldi often lacks)</summary>

- Honey-Soy Shrimp with Rice & Bok Choy (lunch; served 57x): title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Apple Slices with Cinnamon Skyr Dip & a Brazil Nut (snack; served 23x): title:'skyr': Skyr, plain nonfat [most]; title:'brazil': Brazil nuts [most]
- Plant Protein Chia Pudding with Berries (snack; served 16x): protein: Pea & rice protein powder [most]
- Skyr with Berries & One Brazil Nut (snack; served 15x): title:'skyr': Skyr, plain nonfat [most]; title:'brazil': Brazil nuts [most]
- Greek Tuna & Bulgur Lemon Bowl (lunch; served 11x): title:'bulgur': Bulgur, cooked [most]
- Pear & Cottage Cheese with a Brazil Nut (snack; served 11x): title:'brazil': Brazil nuts [most]
- Cajun Shrimp with Rice & Bok Choy (dinner; served 10x): title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Potato, Leek & Chicken Soup (lunch; served 10x): title:'leek': Leeks, cooked [most]
- Cottage Cheese & Kimchi Bowl (snack; served 9x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Cottage Cheese, Pumpkin Seed & Berry Protein Bowl (snack; served 9x): title:'pumpkin': Pumpkin seeds [most]
- Savory Grits Breakfast Bowls with Sage Chicken & Spinach (breakfast; served 9x): title:'chicken': Ground chicken breast, 98% lean, cooked [most]
- Trout, Lentil & Beet Salad (lunch; served 8x): title:'trout': Trout, rainbow, farmed, cooked [most]
- Chicken Teriyaki Rice Bowl (lunch; served 7x): title:'teriyaki': Teriyaki sauce, sugar-free [most]
- Green Chile Egg-White & Black Bean Breakfast Burrito (breakfast; served 7x): carb: Mission Carb Balance tortilla, burrito (large) [most], Mission Carb Balance tortilla, whole wheat [most]; title:'burrito': Mission Carb Balance tortilla, burrito (large) [most]
- Sardine, Chickpea & Arugula Salad (lunch; served 7x): title:'arugula': Arugula, raw [most]
- Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg (breakfast; served 6x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Greek Yogurt Bowl with High-Fiber Cereal & Berries (breakfast; served 6x): title:'fiber': Bran cereal, high-fiber (Fiber One) [most], Kashi GO cereal (protein & fiber) [most]; title:'cereal': All-Bran cereal [most], Bran cereal, high-fiber (Fiber One) [most], Grape-Nuts cereal [most], Kashi GO cereal (protein & fiber) [most]
- Herb Roast Turkey Breast with Wild Rice & Maple Butternut Squash (dinner; served 6x): title:'wild': Wild rice, cooked [most]; title:'rice': Wild rice, cooked [most]
- Korean Gochujang Chicken & Cabbage Rice Bowl (Dak Galbi-Style) (lunch; served 6x): title:'gochujang': Gochujang (Korean chili paste) [most]
- Lemon Cod en Papillote with Couscous (dinner; served 6x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Persian Baked Trout with Herbed Rice and Pomegranate Walnuts (dinner; served 6x): title:'trout': Trout, rainbow, farmed, cooked [most]; title:'pomegranate': Pomegranate, raw [most]
- Ponzu Shrimp & Edamame Rice Bowl (Poke-Style) (lunch; served 6x): title:'ponzu': Ponzu sauce [most]
- Rye Toast with Soft Eggs & Sauerkraut (breakfast; served 6x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Apple-Pie Cottage Cheese & Chia Protein Oats with Walnuts (breakfast; served 5x): title:'cottage': Cottage cheese, nonfat [most]; title:'cheese': Cottage cheese, nonfat [most]
- Beef, Barley & Vegetable Soup (dinner; served 5x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Buffalo Chicken & Crisp Romaine Crunch Bowl (lunch; served 5x): fat: Greek yogurt ranch dressing [most]
- Levantine Muhammara-Spiced Chicken Bulgur Bowl (lunch; served 5x): carb: Bulgur, cooked [most], Couscous, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Salmon & Barley Bowl with Dill Yogurt (lunch; served 5x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Savory Cottage Cheese & Egg-White Breakfast Bowl (breakfast; served 5x): title:'cottage': Cottage cheese, nonfat [most]; title:'cheese': Cottage cheese, nonfat [most]
- Snapper a la Veracruzana over Rice (dinner; served 5x): title:'snapper': Snapper, cooked [most]
- Tuscan Tuna & White Bean Salad with Bulgur (lunch; served 5x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Apple with Peanut Butter (snack; served 4x): protein: PBfit powdered peanut butter [most]
- Greek Lamb Chop with Lemon Potatoes & Village Salad (dinner; served 4x): title:'lamb': Lamb loin chop, lean, cooked [most]; title:'chop': Lamb loin chop, lean, cooked [most]
- Lemon-Pepper Chicken with Couscous & Zucchini (dinner; served 4x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Miso-Glazed Salmon with Greens & Brown Rice (lunch; served 4x): title:'miso': Miso paste [most]
- Sesame-Ginger Beef & Broccoli over Wild Rice (dinner; served 4x): title:'wild': Wild rice, cooked [most]
- Skyr Bowl with Toasted Rye Crumbs & Berries (breakfast; served 4x): title:'skyr': Skyr, plain nonfat [most]
- Greek Oregano Chicken with Lemon Couscous & Feta (lunch; served 3x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Kimchi Deviled Eggs (snack; served 3x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Miso-Butter Seared Scallops with Snap Peas (dinner; served 3x): title:'miso': Miso paste [most]
- Miso-Glazed Edamame (snack; served 3x): title:'miso': Miso paste [most]
- Moroccan Harissa Chicken with Chickpea Couscous (dinner; served 3x): carb: Bulgur, cooked [most], Couscous, cooked [most]; title:'harissa': Harissa paste [most]; title:'couscous': Couscous, cooked [most]
- Salmon & Kimchi Rice Bowl (lunch; served 3x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Brothy Tuscan White Beans with Greens over Bulgur (dinner; served 2x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Chicken & Okra Gumbo-Style Stew (dinner; served 2x): title:'okra': Okra, cooked [most]
- Chicken Teriyaki Soba Noodle Bowl (dinner; served 2x): title:'teriyaki': Teriyaki sauce, sugar-free [most]
- Chocolate-Raspberry Chia Overnight Oats (breakfast; served 2x): title:'chocolate': Sugar-free chocolate syrup [most]
- Garlic-Ginger Shrimp & Baby Bok Choy over Jasmine Rice (dinner; served 2x): title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Greek Chicken Tzatziki Pita with Crunchy Salad (lunch; served 2x): title:'tzatziki': Tzatziki (Greek yogurt sauce) [most]
- Lemon-Tahini Dip with Veggies & Pita (snack; served 2x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]
- Pan-Fried Trout with Dill Potatoes & Asparagus (dinner; served 2x): protein: Trout, rainbow, farmed, cooked [most]; title:'trout': Trout, rainbow, farmed, cooked [most]
- Pot-Roast Bowl with Tender Beef, Barley, Carrots & Onion (dinner; served 2x): title:'barley': Barley, cooked [most]
- Roasted Trout with Sweet Potato & Brussels (dinner; served 2x): title:'trout': Trout, rainbow, farmed, cooked [most]
- Seared Salmon over Lemon-Herb Bulgur Tabbouleh (lunch; served 2x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Seared Sirloin & Barley Spinach Salad (lunch; served 2x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Sesame Peanut Noodle Bowl with Chicken (dinner; served 2x): title:'sesame': Tahini (sesame butter) [most]
- Almond-Crusted Trout with Green Beans & Rice (dinner; served 1x): protein: Trout, rainbow, farmed, cooked [most]; title:'trout': Trout, rainbow, farmed, cooked [most]
- Bulgogi-Style Sirloin & Kimchi Rice Bowl (dinner; served 1x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Caprese Bulgur Bowl with Fresh Mozzarella (lunch; served 1x): carb: Barley, cooked [most], Bulgur, cooked [most], Couscous, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Chicken & Wild Rice Soup (dinner; served 1x): title:'wild': Wild rice, cooked [most]
- Greek Pork Souvlaki Bowl with Lemon Bulgur & Tzatziki (dinner; served 1x): title:'bulgur': Bulgur, cooked [most]; title:'tzatziki': Tzatziki (Greek yogurt sauce) [most]
- Honey-Garlic Ground Chicken Rice Bowl with Broccoli (dinner; served 1x): protein: Ground chicken breast, 98% lean, cooked [most]; title:'ground': Ground chicken breast, 98% lean, cooked [most]; title:'chicken': Ground chicken breast, 98% lean, cooked [most]
- Lentil & Roasted Veg Grain Bowl with Tahini-Lemon Sauce (lunch; served 1x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]
- Levantine Lamb and White Bean Stew (Fasolia) over Rice (dinner; served 1x): title:'lamb': Lamb loin chop, lean, cooked [most]
- Mediterranean Chicken & Couscous Bowl (lunch; served 1x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Peanut Butter Chocolate Chip No-Bake Protein Balls (snack; served 1x): title:'chocolate': Dark chocolate chips, no sugar added [most]; title:'chip': Dark chocolate chips, no sugar added [most]
- Sardine Kimchi Fried Rice (dinner; served 1x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Seared Scallops over Lemon-Herb Barley (dinner; served 1x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Smoked Salmon, White Bean & Arugula Lemon Bowl (lunch; served 1x): title:'arugula': Arugula, raw [most]
- Sweet Potato Chana Masala with Whole-Wheat Naan (dinner; served 1x): title:'wheat': Mission Carb Balance tortilla, whole wheat [most]
- Tex-Mex Chicken Fajita Carb Balance Wraps (dinner; served 1x): title:'carb': Mission Carb Balance tortilla, soft taco [most], Mission Carb Balance tortilla, whole wheat [most]; title:'balance': Mission Carb Balance tortilla, soft taco [most], Mission Carb Balance tortilla, whole wheat [most]
- Turkish Adana-Style Kofte over Bulgur Pilaf (dinner; served 1x): title:'bulgur': Bulgur, cooked [most]
- Vegan Black Forest Cherry & Cocoa Overnight Oats (breakfast; served 1x): protein: Pea & rice protein powder [most], Pea protein isolate, powder [specialty]
- Vegan Protein Overnight Oats with Berries & a Brazil Nut (breakfast; served 1x): protein: Pea & rice protein powder [most]; fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Balela Chickpea & Black Bean Salad with Sumac (lunch; served 0x): carb: Bulgur, cooked [most]
- Barley Porridge with Apple, Cinnamon & Kefir (breakfast; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- BBQ Chicken Stuffed Sweet Potato with Slaw (dinner; served 0x): fat: Greek yogurt ranch dressing [most]
- Big-Batch Lentil, Veg & Tahini Grain Bowls (lunch; served 0x): carb: Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Black Bean & Sweet Potato Quesadilla with Salsa (dinner; served 0x): carb: Mission Carb Balance tortilla, whole wheat [most]
- Cherry-Vanilla Kefir Smoothie Bowl with Pomegranate (breakfast; served 0x): fat: Pumpkin seeds [most]; title:'pomegranate': Pomegranate, raw [most]
- Chickpea Shawarma Bowl with Tahini Sauce (lunch; served 0x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]; title:'sauce': Tzatziki (Greek yogurt sauce) [most]
- Doro-Style Berbere Chicken with Collard Greens & Rice (dinner; served 0x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Egg & Sauerkraut Rye Bites (snack; served 0x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Egg, Black Bean & Cheddar Breakfast Burrito (breakfast; served 0x): title:'burrito': Mission Carb Balance tortilla, burrito (large) [most]
- Ethiopian-Style Split Pea & Collard Greens over Rice (dinner; served 0x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Freezer Breakfast Burritos with Turkey, Egg & Black Bean (breakfast; served 0x): carb: Mission Carb Balance tortilla, burrito (large) [most]
- Garlic & Leek Mussels with Toasted Bread (dinner; served 0x): title:'leek': Leeks, cooked [most]
- Greek Chickpea & Bulgur Salad (lunch; served 0x): title:'bulgur': Bulgur, cooked [most]
- Kefir Overnight Oats with Berries & a Brazil Nut (breakfast; served 0x): fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Kimchi Fried Rice Bowl (dinner; served 0x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Loaded Chickpea Tabbouleh with Bulgur & Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Mediterranean Chickpea & Couscous Bowl (dinner; served 0x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Mediterranean Chickpea & Olive Couscous Bowl (lunch; served 0x): title:'couscous': Couscous, cooked [most]
- Roasted Veg & Chickpea Bulgur Bowl with Tahini-Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Tuscan White Bean & Barley Bowl with Garlicky Kale (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- White-Bean Barley Risotto (Orzotto) (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]

</details>

## Pescatarian (480 days built, 0 failed; avg 152.5 g protein / 2205 kcal per day)

| Food | Tier | % days | Protein share (days present) | kcal share (days present) | Share of all protein | Avg g/day when present | Main dishes | Everywhere swap |
|---|---|---:|---:|---:|---:|---:|---|---|
| Bok choy, cooked | most | 22.5% | 2.1% | 1.1% | 0.4% | 189.5 | 76x Honey-Soy Shrimp with Rice & Bok Choy; 13x Cajun Shrimp with Rice & Bok Choy | green cabbage, broccoli or spinach |
| Psyllium husk | specialty | 18.8% | 0.0% | 0.5% | 0.0% | 6.2 | 14x Protein Oatmeal with Banana & Peanut Butter; 10x Honey-Soy Shrimp with Rice & Bok Choy | sugar-free Metamucil or store-brand sugar-free psyllium fiber powder (in store at Walmart) |
| Skyr, plain nonfat | most | 13.8% | 14.9% | 6.1% | 2.1% | 212.2 | 15x Skyr with Berries & One Brazil Nut; 15x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut | nonfat plain Greek yogurt (59 kcal, 10.2 g protein vs 63 kcal, 11 g per 100 g) |
| Cottage cheese, nonfat | most | 10.6% | 10.6% | 5.0% | 1.1% | 154.6 | 11x Cottage Cheese with Fruit; 9x Cottage Cheese Protein Pancakes with Berries | 1% or 2% lowfat cottage cheese (about +2 g fat per 100 g) |
| Kimchi | most | 9.8% (12 of them via a recipe) | 0.3% | 0.2% | 0.0% | 32.8 | 9x Cottage Cheese & Kimchi Bowl; 4x Salmon & Kimchi Rice Bowl | sauerkraut (everywhere as a jar; live-culture kind is most) or leave it off |
| PBfit powdered peanut butter | most | 9.6% | 5.6% | 3.6% | 0.6% | 18 | 10x Peanut Butter Banana Protein Overnight Oats; 9x Protein Oatmeal with Banana & Peanut Butter | any powdered peanut butter (PB2, Great Value); regular peanut butter is not like-for-like (51 g fat/100 g vs 15.6) |
| Brazil nuts | most | 9.0% | 0.5% | 1.6% | 0.0% | 5 | 15x Skyr with Berries & One Brazil Nut; 15x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut | one Brazil nut out of a can of mixed nuts, or omit it (the dishes use a single 5 g nut) |
| Collard greens, cooked | most | 8.1% | 3.1% | 2.6% | 0.2% | 157.9 | 14x Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg; 12x Trinidad-Style Curry Shrimp with Sweet Potato & Callaloo | kale (everywhere) |
| Trout, rainbow, farmed, cooked | most | 7.7% | 19.6% | 9.8% | 1.6% | 129.4 | 23x Trout, Lentil & Beet Salad; 6x Roasted Trout with Sweet Potato & Brussels | steelhead trout (same species) or salmon |
| Barley, cooked | most | 6.0% | 3.1% | 11.2% | 0.2% | 206.6 | 10x Seared Scallops over Lemon-Herb Barley; 8x Salmon & Barley Bowl with Dill Yogurt | quinoa or brown rice |
| Arugula, raw | most | 5.6% | 1.1% | 0.7% | 0.1% | 61.1 | 15x Sardine, Chickpea & Arugula Salad; 3x Salmon & Barley Bowl with Dill Yogurt | baby spinach or spring mix |
| Vegan kimchi | most | 5.4% | 0.4% | 0.4% | 0.0% | 51.5 | 8x Miso-Glazed Tempeh with Brown Rice & Kimchi; 5x Salmon & Kimchi Rice Bowl | sauerkraut (vegan) or leave it off |
| Arepa (cornmeal bread) | specialty | 5.2% | 3.2% | 8.1% | 0.2% | 84.3 | 9x Arepa with Eggs & Avocado; 3x Roasted Salmon or Cod, Potato & Asparagus | corn tortillas (everywhere) |
| Salmon, Atlantic wild, cooked | specialty | 5.0% | 23.9% | 12.2% | 1.3% | 155.5 | 7x Seared Salmon over Lemon-Herb Bulgur Tabbouleh; 5x Salmon & Barley Bowl with Dill Yogurt | frozen wild sockeye salmon (everywhere): 156 kcal, 26.5 g protein, 5.6 g fat per 100 g vs 182/25.4/8.1; farmed Atlantic is fattier (206/22.1/12.4) |
| Tempeh | most | 4.6% | 17.4% | 11.4% | 0.8% | 128 | 8x Miso-Glazed Tempeh with Brown Rice & Kimchi; 3x Smoky Tempeh & White Bean Cassoulet | firm tofu (everywhere): tempeh has 20.3 g protein/100 g vs tofu 10.6, so about 2x the grams (and 2x the fat) for the same protein, or tofu + edamame |
| Pea & rice protein powder | most | 2.7% | 13.6% | 5.9% | 0.4% | 34.5 | 13x Plant Protein Chia Pudding with Berries | Orgain or Equate plant protein powder (Walmart, Target, Kroger, Costco); recompute scoops from the label (the database blend is 63 g protein/100 g) |
| Chickpea pasta, cooked | most | 2.5% | 13.6% | 17.3% | 0.4% | 299.7 | 11x Lemon-Dill Tuna Pasta Salad with Peas; 1x Sardine, Lemon & Chili Pasta | whole wheat pasta (less protein and fiber) plus beans |
| Mackerel, Atlantic, cooked | specialty | 1.7% | 17.3% | 11.3% | 0.2% | 90.8 | 5x Mackerel & Lentil Salad with Mustard Dressing; 1x Grilled Mackerel with Warm Potato & Green Bean Salad | canned sardines (oily fish) or farmed salmon |
| Snapper, cooked | most | 1.3% | 24.7% | 8.0% | 0.3% | 148.5 | 6x Snapper a la Veracruzana over Rice | frozen cod or tilapia fillets |
| Pollock, cooked | most | 0.6% | 22.2% | 8.0% | 0.2% | 157.3 | 3x Thai Hot & Sour Fish Soup | frozen cod or tilapia fillets (everywhere) |
| Edamame pasta, cooked | specialty | 0.6% | 18.3% | 9.2% | 0.1% | 146.3 | 2x Sardine, Lemon & Chili Pasta; 1x Caprese Pasta with Tomato, Mozzarella & Basil | whole wheat pasta plus frozen edamame |
| Mackerel, jack, canned, drained | most | 0.4% | 20.8% | 8.7% | 0.1% | 118.5 | 2x Brazilian Moqueca, Coconut Fish Stew over Rice | canned pink salmon or sardines |
| Kashi GO cereal (protein & fiber) | most | 0.4% | 15.6% | 17.6% | 0.1% | 111.5 | 2x Greek Yogurt Bowl with High-Fiber Cereal & Berries | bran flakes plus Greek yogurt or milk for the protein |
| Halibut, cooked | most | 0.2% | 14.4% | 5.4% | 0.0% | 85 | 1x Brazilian Moqueca, Coconut Fish Stew over Rice | frozen cod fillets (closest macro match) |
| Falafel | specialty | 0.2% | 11.3% | 16.7% | 0.0% | 85 | 1x Falafel & Bulgur Bowl with Lemon Tahini | canned chickpeas, roasted or mashed with spices (or bake falafel from chickpeas) |

Listed specialty foods supply 1.8% of all pescatarian protein; listed most-tier foods supply 8.5%.

**Templates that cannot be built without a specialty food (pescatarian):** 22 of 358 offered.

| Template | Slot | Why (slot: only matching foods) | Times served in 480 days |
|---|---|---|---:|
| Buckwheat Porridge with Berries & Skyr | breakfast | carb: Buckwheat groats, cooked [specialty]; title:'buckwheat': Buckwheat groats, cooked [specialty] | 12 |
| Arepa with Eggs & Avocado | breakfast | carb: Arepa (cornmeal bread) [specialty]; title:'arepa': Arepa (cornmeal bread) [specialty] | 9 |
| Kefir Berry Bowl with Hemp | snack | title:'hemp': Hemp seeds [specialty] | 9 |
| Cottage Cheese Berry Bowl with Oats & Hemp | breakfast | fat: Hemp seeds [specialty]; title:'hemp': Hemp seeds [specialty] | 7 |
| Mackerel & Lentil Salad with Mustard Dressing | lunch | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 5 |
| Whipped Ricotta with Honey, Walnuts & Figs | snack | title:'figs': Figs, raw [specialty] | 3 |
| Miso-Glazed Cod with Edamame & Soba-Style Buckwheat | dinner | carb: Buckwheat groats, cooked [specialty]; title:'buckwheat': Buckwheat groats, cooked [specialty] | 2 |
| Sesame Edamame & Buckwheat Noodle-Style Bowl | dinner | title:'buckwheat': Buckwheat groats, cooked [specialty] | 2 |
| Falafel & Bulgur Bowl with Lemon Tahini | lunch | title:'falafel': Falafel [specialty] | 1 |
| Grilled Mackerel with Warm Potato & Green Bean Salad | dinner | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 1 |
| Mackerel Teriyaki Rice Bowl | dinner | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 1 |
| Smoked-Style Mackerel Plate with Rye & Pickled Cucumber | lunch | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 1 |
| Doenjang Soybean & Tofu Stew with Sweet Potato | dinner | protein: Soybeans, cooked [specialty]; title:'soybean': Soybeans, cooked [specialty] | 0 |
| Falafel & Hummus Mezze Bowl with Warm Pita | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita Bowl with Lemon-Tahini Drizzle | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita with Tahini & Cucumber-Tomato Salad | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Korean Doenjang Tofu & Soybean Stew over Rice | dinner | title:'soybean': Soybeans, cooked [specialty] | 0 |
| Mackerel Pate on Rye | snack | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Mackerel, Egg & Crispy Potato Breakfast Plate | breakfast | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Mezze Falafel Bowl with Hummus & Herbed Bulgur | dinner | title:'falafel': Falafel [specialty] | 0 |
| Spiced Mackerel with Sweet Potato & Greens | dinner | protein: Mackerel, Atlantic, cooked [specialty]; title:'mackerel': Mackerel, Atlantic, cooked [specialty] | 0 |
| Whipped Ricotta Toast with Figs, Honey & Pistachios | breakfast | title:'figs': Figs, raw [specialty] | 0 |

<details><summary>86 more templates (pescatarian) need a <code>most</code>-tier food (buildable only with an item a small-town store or Aldi often lacks)</summary>

- Honey-Soy Shrimp with Rice & Bok Choy (lunch; served 76x): title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Trout, Lentil & Beet Salad (lunch; served 23x): title:'trout': Trout, rainbow, farmed, cooked [most]
- Apple Slices with Cinnamon Skyr Dip & a Brazil Nut (snack; served 15x): title:'skyr': Skyr, plain nonfat [most]; title:'brazil': Brazil nuts [most]
- Sardine, Chickpea & Arugula Salad (lunch; served 15x): title:'arugula': Arugula, raw [most]
- Skyr with Berries & One Brazil Nut (snack; served 15x): title:'skyr': Skyr, plain nonfat [most]; title:'brazil': Brazil nuts [most]
- Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg (breakfast; served 14x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Cajun Shrimp with Rice & Bok Choy (dinner; served 13x): title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Pear & Cottage Cheese with a Brazil Nut (snack; served 13x): title:'brazil': Brazil nuts [most]
- Plant Protein Chia Pudding with Berries (snack; served 13x): protein: Pea & rice protein powder [most]
- Cottage Cheese & Kimchi Bowl (snack; served 12x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Salmon & Kimchi Rice Bowl (lunch; served 12x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Ponzu Shrimp & Edamame Rice Bowl (Poke-Style) (lunch; served 11x): title:'ponzu': Ponzu sauce [most]
- Seared Scallops over Lemon-Herb Barley (dinner; served 10x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Greek Tuna & Bulgur Lemon Bowl (lunch; served 9x): title:'bulgur': Bulgur, cooked [most]
- Lemon Cod en Papillote with Couscous (dinner; served 8x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Miso-Glazed Tempeh with Brown Rice & Kimchi (lunch; served 8x): protein: Tempeh [most]; title:'miso': Miso paste [most]; title:'tempeh': Tempeh [most]; title:'kimchi': Vegan kimchi [most]
- Salmon & Barley Bowl with Dill Yogurt (lunch; served 8x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Cottage Cheese, Pumpkin Seed & Berry Protein Bowl (snack; served 7x): title:'pumpkin': Pumpkin seeds [most]
- Greek Yogurt Bowl with High-Fiber Cereal & Berries (breakfast; served 7x): title:'fiber': Bran cereal, high-fiber (Fiber One) [most], Kashi GO cereal (protein & fiber) [most]; title:'cereal': All-Bran cereal [most], Bran cereal, high-fiber (Fiber One) [most], Grape-Nuts cereal [most], Kashi GO cereal (protein & fiber) [most]
- Miso-Butter Seared Scallops with Snap Peas (dinner; served 7x): title:'miso': Miso paste [most]
- Seared Salmon over Lemon-Herb Bulgur Tabbouleh (lunch; served 7x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Chocolate-Raspberry Chia Overnight Oats (breakfast; served 6x): title:'chocolate': Sugar-free chocolate syrup [most]
- Roasted Trout with Sweet Potato & Brussels (dinner; served 6x): title:'trout': Trout, rainbow, farmed, cooked [most]
- Snapper a la Veracruzana over Rice (dinner; served 6x): title:'snapper': Snapper, cooked [most]
- Crispy Tofu & Kimchi Bites (snack; served 4x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Rye Toast with Soft Eggs & Sauerkraut (breakfast; served 4x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Almond-Crusted Trout with Green Beans & Rice (dinner; served 3x): protein: Trout, rainbow, farmed, cooked [most]; title:'trout': Trout, rainbow, farmed, cooked [most]
- Apple with Peanut Butter (snack; served 3x): protein: PBfit powdered peanut butter [most]
- Caprese Bulgur Bowl with Fresh Mozzarella (lunch; served 3x): carb: Barley, cooked [most], Bulgur, cooked [most], Couscous, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Persian Baked Trout with Herbed Rice and Pomegranate Walnuts (dinner; served 3x): title:'trout': Trout, rainbow, farmed, cooked [most]; title:'pomegranate': Pomegranate, raw [most]
- Sardine Kimchi Fried Rice (dinner; served 3x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Skyr Bowl with Toasted Rye Crumbs & Berries (breakfast; served 3x): title:'skyr': Skyr, plain nonfat [most]
- Smoky Tempeh & White Bean Cassoulet (dinner; served 3x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tempeh & Sweet Potato Breakfast Hash (breakfast; served 3x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Blackened Tempeh with Rice & Asparagus (lunch; served 2x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Garlic & Leek Mussels with Toasted Bread (dinner; served 2x): title:'leek': Leeks, cooked [most]
- Garlic-Ginger Shrimp & Baby Bok Choy over Jasmine Rice (dinner; served 2x): title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Kimchi Deviled Eggs (snack; served 2x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Korean Gochujang Tempeh & Roasted Veg Quinoa Trays (dinner; served 2x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Lemon-Tahini Dip with Veggies & Pita (snack; served 2x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]
- Mediterranean Chickpea & Couscous Bowl (dinner; served 2x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Miso-Glazed Salmon with Greens & Brown Rice (lunch; served 2x): title:'miso': Miso paste [most]
- Pan-Fried Trout with Dill Potatoes & Asparagus (dinner; served 2x): protein: Trout, rainbow, farmed, cooked [most]; title:'trout': Trout, rainbow, farmed, cooked [most]
- Smoky Tempeh, Sweet Potato & Kale Breakfast Bowl (breakfast; served 2x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tofu & Kimchi Breakfast Rice Bowl (breakfast; served 2x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Apple-Pie Cottage Cheese & Chia Protein Oats with Walnuts (breakfast; served 1x): title:'cottage': Cottage cheese, nonfat [most]; title:'cheese': Cottage cheese, nonfat [most]
- Chickpea Shawarma Bowl with Tahini Sauce (lunch; served 1x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]; title:'sauce': Tzatziki (Greek yogurt sauce) [most]
- Crispy Tofu & Kimchi Bibimbap-Style Bowl (dinner; served 1x): title:'kimchi': Vegan kimchi [most]
- Egg & Sauerkraut Rye Bites (snack; served 1x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Greek Chickpea & Bulgur Salad (lunch; served 1x): title:'bulgur': Bulgur, cooked [most]
- Korean Gochujang Tempeh Bowl (dinner; served 1x): protein: Tempeh [most]; title:'gochujang': Gochujang (Korean chili paste) [most]; title:'tempeh': Tempeh [most]
- Miso-Glazed Edamame (snack; served 1x): title:'miso': Miso paste [most]
- Miso-Glazed Tofu & Eggplant Donburi (dinner; served 1x): title:'miso': Miso paste [most]
- Moroccan Spiced Tofu with Chickpeas & Couscous (dinner; served 1x): title:'couscous': Couscous, cooked [most]
- Smoked Salmon, White Bean & Arugula Lemon Bowl (lunch; served 1x): title:'arugula': Arugula, raw [most]
- Soy-Glazed Tempeh with Quinoa & Bok Choy (dinner; served 1x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Tofu Shawarma Bowl with Tahini Sauce (lunch; served 1x): fat: Tahini (sesame butter) [most]; title:'tahini': Tahini (sesame butter) [most]
- Tuscan Tuna & White Bean Salad with Bulgur (lunch; served 1x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Barley Porridge with Apple, Cinnamon & Kefir (breakfast; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Big-Batch Lentil, Veg & Tahini Grain Bowls (lunch; served 0x): carb: Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Black Bean & Sweet Potato Quesadilla with Salsa (dinner; served 0x): carb: Mission Carb Balance tortilla, whole wheat [most]
- Brothy Tuscan White Beans with Greens over Bulgur (dinner; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Cherry-Vanilla Kefir Smoothie Bowl with Pomegranate (breakfast; served 0x): fat: Pumpkin seeds [most]; title:'pomegranate': Pomegranate, raw [most]
- Crispy Tofu Teriyaki with Broccoli & Quinoa (dinner; served 0x): title:'teriyaki': Teriyaki sauce, sugar-free [most]
- Edamame & Tofu Buddha Bowl with Miso Dressing (lunch; served 0x): title:'miso': Miso paste [most]
- Egg, Black Bean & Cheddar Breakfast Burrito (breakfast; served 0x): title:'burrito': Mission Carb Balance tortilla, burrito (large) [most]
- Ethiopian-Style Split Pea & Collard Greens over Rice (dinner; served 0x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Harissa Tofu & Chickpea Traybake (dinner; served 0x): title:'harissa': Harissa paste [most]
- Kefir Overnight Oats with Berries & a Brazil Nut (breakfast; served 0x): fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Kimchi Fried Rice Bowl (dinner; served 0x): title:'kimchi': Kimchi egg-white scramble cup [most], Kimchi [most], Vegan kimchi [most]
- Lentil & Roasted Veg Grain Bowl with Tahini-Lemon Sauce (lunch; served 0x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]
- Loaded Chickpea Tabbouleh with Bulgur & Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Mediterranean Chickpea & Olive Couscous Bowl (lunch; served 0x): title:'couscous': Couscous, cooked [most]
- Miso Soup with Tofu, Greens & Rice (lunch; served 0x): title:'miso': Miso paste [most]
- Peanut Butter Chocolate Chip No-Bake Protein Balls (snack; served 0x): title:'chocolate': Dark chocolate chips, no sugar added [most]; title:'chip': Dark chocolate chips, no sugar added [most]
- Roasted Veg & Chickpea Bulgur Bowl with Tahini-Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Smoky Red Beans & Rice with Tempeh (dinner; served 0x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Smoky Tempeh Tacos with Avocado (dinner; served 0x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Sweet Potato Chana Masala with Whole-Wheat Naan (dinner; served 0x): title:'wheat': Mission Carb Balance tortilla, whole wheat [most]
- Tempeh Larb Lettuce Cups with Edamame & Rice (dinner; served 0x): title:'tempeh': Tempeh [most]
- Tempeh Reuben on Rye with Sauerkraut (lunch; served 0x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Tempeh Teriyaki Stir-Fry Bowl (dinner; served 0x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tuscan White Bean & Barley Bowl with Garlicky Kale (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Vegan Black Forest Cherry & Cocoa Overnight Oats (breakfast; served 0x): protein: Pea & rice protein powder [most], Pea protein isolate, powder [specialty]
- Vegan Protein Overnight Oats with Berries & a Brazil Nut (breakfast; served 0x): protein: Pea & rice protein powder [most]; fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- White-Bean Barley Risotto (Orzotto) (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]

</details>

## Vegetarian (480 days built, 0 failed; avg 152 g protein / 2205 kcal per day)

| Food | Tier | % days | Protein share (days present) | kcal share (days present) | Share of all protein | Avg g/day when present | Main dishes | Everywhere swap |
|---|---|---:|---:|---:|---:|---:|---|---|
| Cottage cheese, nonfat | most | 20.6% | 13.3% | 6.7% | 2.8% | 198.3 | 47x Spinach, Lentil & Cottage Cheese Lasagna; 37x High-Protein Broccoli Mac & Cheese | 1% or 2% lowfat cottage cheese (about +2 g fat per 100 g) |
| Tempeh | most | 19.8% | 17.3% | 11.8% | 3.5% | 131.7 | 32x Blackened Tempeh with Rice & Asparagus; 24x Soy-Glazed Tempeh with Quinoa & Bok Choy | firm tofu (everywhere): tempeh has 20.3 g protein/100 g vs tofu 10.6, so about 2x the grams (and 2x the fat) for the same protein, or tofu + edamame |
| Brazil nuts | most | 13.8% | 0.5% | 1.6% | 0.1% | 5 | 33x Skyr with Berries & One Brazil Nut; 24x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut | one Brazil nut out of a can of mixed nuts, or omit it (the dishes use a single 5 g nut) |
| Skyr, plain nonfat | most | 13.3% | 17.7% | 7.3% | 2.4% | 245.2 | 33x Skyr with Berries & One Brazil Nut; 24x Apple Slices with Cinnamon Skyr Dip & a Brazil Nut | nonfat plain Greek yogurt (59 kcal, 10.2 g protein vs 63 kcal, 11 g per 100 g) |
| Micellar casein, powder | specialty | 10.8% | 4.5% | 1.4% | 0.5% | 8.4 | 52x Chocolate Greek Yogurt Protein Pudding with Raspberries | whey protein powder, or nonfat Greek yogurt / cottage cheese for a slow evening protein |
| Collard greens, cooked | most | 9.0% | 3.6% | 2.9% | 0.3% | 178.9 | 23x Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg; 11x Ethiopian-Style Split Pea & Collard Greens over Rice | kale (everywhere) |
| Hemp seeds | specialty | 8.8% | 3.6% | 4.1% | 0.3% | 15 | 21x Edamame & White Bean Smash Snack on Rye; 17x Kefir Berry Bowl with Hemp | chia seeds or ground flax (far less protein: 16.5 vs 31.6 g/100 g) or pumpkin seeds |
| Bok choy, cooked | most | 7.1% | 1.9% | 1.0% | 0.1% | 184.4 | 24x Soy-Glazed Tempeh with Quinoa & Bok Choy; 6x Savory Miso & Scallion Oats with a Soft Egg | green cabbage, broccoli or spinach |
| PBfit powdered peanut butter | most | 6.0% | 5.8% | 3.4% | 0.3% | 15.6 | 20x Apple Slices with Peanut Butter; 3x Peanut Butter Banana Protein Overnight Oats | any powdered peanut butter (PB2, Great Value); regular peanut butter is not like-for-like (51 g fat/100 g vs 15.6) |
| Bran cereal, high-fiber (Fiber One) | most | 6.0% | 1.4% | 3.1% | 0.1% | 37.5 | 18x Chocolate Kefir Protein Shake; 3x Chocolate Greek Yogurt Protein Pudding with Raspberries | store-brand bran flakes (much less fiber per gram) plus chia or flax |
| Sauerkraut (raw, live cultures) | most | 6.0% | 0.3% | 0.4% | 0.0% | 39.1 | 10x Rye Toast with Soft Eggs & Sauerkraut; 3x Southwest Black Bean Breakfast Bowl | shelf-stable jarred/canned sauerkraut (same macros, no live cultures) |
| Miso paste | most | 5.8% (1 of them via a recipe) | 1.2% | 1.2% | 0.1% | 13.4 | 14x Brothy Tuscan White Beans with Greens over Bulgur; 7x Miso-Glazed Tempeh with Brown Rice & Kimchi | low-sodium soy sauce for the salty-umami role (use less; miso is a paste at 199 kcal/100 g) |
| Cherries, sweet, raw | most | 5.4% | 0.8% | 3.0% | 0.1% | 123.7 | 6x Chocolate Kefir Protein Shake; 3x Deli-Style Egg Salad Sandwich | frozen dark sweet cherries, or blueberries/strawberries |
| Bulgur, cooked | most | 5.2% | 5.9% | 9.6% | 0.3% | 269 | 14x Brothy Tuscan White Beans with Greens over Bulgur; 7x Tofu Shawarma Bowl with Tahini Sauce | quinoa or brown rice (less fiber than bulgur) |
| Tahini (sesame butter) | most | 5.2% (3 of them via a recipe) | 2.0% | 4.5% | 0.1% | 16.4 | 14x Tofu Shawarma Bowl with Tahini Sauce; 3x Whipped Edamame Dip with Crunchy Vegetables | peanut butter or sunflower-seed butter (similar kcal and fat per 100 g) |
| TVP (textured soy protein), dry | specialty | 4.8% | 15.5% | 8.1% | 0.8% | 49.2 | 7x TVP & Black Bean Enchilada Skillet; 5x High-Protein Plant Chili | lentils, firm tofu or frozen edamame (all everywhere); TVP is 51 g protein/100 g dry, so portions change |
| Pea & rice protein powder | most | 2.7% | 14.9% | 6.2% | 0.4% | 32.6 | 7x Plant Protein Chia Pudding with Berries; 5x Vegan Protein Overnight Oats with Berries & a Brazil Nut | Orgain or Equate plant protein powder (Walmart, Target, Kroger, Costco); recompute scoops from the label (the database blend is 63 g protein/100 g) |
| Falafel | specialty | 0.8% | 13.6% | 18.1% | 0.1% | 126 | 1x Falafel & Bulgur Bowl with Lemon Tahini; 1x Mezze Falafel Bowl with Hummus & Herbed Bulgur | canned chickpeas, roasted or mashed with spices (or bake falafel from chickpeas) |
| Pea protein isolate, powder | specialty | 0.4% | 19.3% | 6.4% | 0.1% | 40 | 2x Vegan Black Forest Cherry & Cocoa Overnight Oats | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 80 g protein/100 g, so add a scoop or another protein |
| Soybeans, cooked | specialty | 0.4% | 13.0% | 7.6% | 0.1% | 109 | 1x Korean Doenjang Tofu & Soybean Stew over Rice; 1x Doenjang Soybean & Tofu Stew with Sweet Potato | frozen shelled edamame (everywhere): 11.9 g protein/100 g vs 18.2, so about 1.5x the grams |

Listed specialty foods supply 1.8% of all vegetarian protein; listed most-tier foods supply 10.4%.

**Templates that cannot be built without a specialty food (vegetarian):** 14 of 265 offered.

| Template | Slot | Why (slot: only matching foods) | Times served in 480 days |
|---|---|---|---:|
| Kefir Berry Bowl with Hemp | snack | title:'hemp': Hemp seeds [specialty] | 17 |
| Arepa with Eggs & Avocado | breakfast | carb: Arepa (cornmeal bread) [specialty]; title:'arepa': Arepa (cornmeal bread) [specialty] | 7 |
| Cottage Cheese Berry Bowl with Oats & Hemp | breakfast | fat: Hemp seeds [specialty]; title:'hemp': Hemp seeds [specialty] | 4 |
| Sesame Edamame & Buckwheat Noodle-Style Bowl | dinner | title:'buckwheat': Buckwheat groats, cooked [specialty] | 2 |
| Whipped Ricotta with Honey, Walnuts & Figs | snack | title:'figs': Figs, raw [specialty] | 2 |
| Doenjang Soybean & Tofu Stew with Sweet Potato | dinner | protein: Soybeans, cooked [specialty]; title:'soybean': Soybeans, cooked [specialty] | 1 |
| Falafel & Bulgur Bowl with Lemon Tahini | lunch | title:'falafel': Falafel [specialty] | 1 |
| Falafel Pita Bowl with Lemon-Tahini Drizzle | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 1 |
| Falafel Pita with Tahini & Cucumber-Tomato Salad | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 1 |
| Korean Doenjang Tofu & Soybean Stew over Rice | dinner | title:'soybean': Soybeans, cooked [specialty] | 1 |
| Mezze Falafel Bowl with Hummus & Herbed Bulgur | dinner | title:'falafel': Falafel [specialty] | 1 |
| Buckwheat Porridge with Berries & Skyr | breakfast | carb: Buckwheat groats, cooked [specialty]; title:'buckwheat': Buckwheat groats, cooked [specialty] | 0 |
| Falafel & Hummus Mezze Bowl with Warm Pita | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Whipped Ricotta Toast with Figs, Honey & Pistachios | breakfast | title:'figs': Figs, raw [specialty] | 0 |

<details><summary>67 more templates (vegetarian) need a <code>most</code>-tier food (buildable only with an item a small-town store or Aldi often lacks)</summary>

- Skyr with Berries & One Brazil Nut (snack; served 33x): title:'skyr': Skyr, plain nonfat [most]; title:'brazil': Brazil nuts [most]
- Blackened Tempeh with Rice & Asparagus (lunch; served 32x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Apple Slices with Cinnamon Skyr Dip & a Brazil Nut (snack; served 24x): title:'skyr': Skyr, plain nonfat [most]; title:'brazil': Brazil nuts [most]
- Soy-Glazed Tempeh with Quinoa & Bok Choy (dinner; served 24x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg (breakfast; served 23x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Brothy Tuscan White Beans with Greens over Bulgur (dinner; served 14x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Tofu Shawarma Bowl with Tahini Sauce (lunch; served 14x): fat: Tahini (sesame butter) [most]; title:'tahini': Tahini (sesame butter) [most]
- Ethiopian-Style Split Pea & Collard Greens over Rice (dinner; served 11x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Rye Toast with Soft Eggs & Sauerkraut (breakfast; served 10x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Tempeh Teriyaki Stir-Fry Bowl (dinner; served 9x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Miso-Glazed Tempeh with Brown Rice & Kimchi (lunch; served 7x): protein: Tempeh [most]; title:'miso': Miso paste [most]; title:'tempeh': Tempeh [most]; title:'kimchi': Vegan kimchi [most]
- Plant Protein Chia Pudding with Berries (snack; served 7x): protein: Pea & rice protein powder [most]
- Cottage Cheese & Kimchi Bowl (snack; served 5x): title:'kimchi': Vegan kimchi [most]
- Crispy Tofu & Kimchi Bibimbap-Style Bowl (dinner; served 5x): title:'kimchi': Vegan kimchi [most]
- Korean Gochujang Tempeh & Roasted Veg Quinoa Trays (dinner; served 5x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Smoky Tempeh & White Bean Cassoulet (dinner; served 5x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Vegan Protein Overnight Oats with Berries & a Brazil Nut (breakfast; served 5x): protein: Pea & rice protein powder [most]; fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Pear & Cottage Cheese with a Brazil Nut (snack; served 4x): title:'brazil': Brazil nuts [most]
- Smoky Tempeh Tacos with Avocado (dinner; served 4x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Apple-Pie Cottage Cheese & Chia Protein Oats with Walnuts (breakfast; served 3x): title:'cottage': Cottage cheese, nonfat [most]; title:'cheese': Cottage cheese, nonfat [most]
- Smoky Red Beans & Rice with Tempeh (dinner; served 3x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Crispy Tofu Teriyaki with Broccoli & Quinoa (dinner; served 2x): title:'teriyaki': Teriyaki sauce, sugar-free [most]
- Egg & Sauerkraut Rye Bites (snack; served 2x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Greek Yogurt Bowl with High-Fiber Cereal & Berries (breakfast; served 2x): title:'fiber': Bran cereal, high-fiber (Fiber One) [most], Kashi GO cereal (protein & fiber) [most]; title:'cereal': All-Bran cereal [most], Bran cereal, high-fiber (Fiber One) [most], Grape-Nuts cereal [most], Kashi GO cereal (protein & fiber) [most]
- Harissa Tofu & Chickpea Traybake (dinner; served 2x): title:'harissa': Harissa paste [most]
- Korean Gochujang Tempeh Bowl (dinner; served 2x): protein: Tempeh [most]; title:'gochujang': Gochujang (Korean chili paste) [most]; title:'tempeh': Tempeh [most]
- Miso Soup with Tofu, Greens & Rice (lunch; served 2x): title:'miso': Miso paste [most]
- Miso-Glazed Tofu & Eggplant Donburi (dinner; served 2x): title:'miso': Miso paste [most]
- Savory Cottage Cheese & Egg-White Breakfast Bowl (breakfast; served 2x): title:'cottage': Cottage cheese, nonfat [most]; title:'cheese': Cottage cheese, nonfat [most]
- Tempeh & Sweet Potato Breakfast Hash (breakfast; served 2x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Vegan Black Forest Cherry & Cocoa Overnight Oats (breakfast; served 2x): protein: Pea & rice protein powder [most], Pea protein isolate, powder [specialty]
- Balela Chickpea & Black Bean Salad with Sumac (lunch; served 1x): carb: Bulgur, cooked [most]
- Chocolate-Raspberry Chia Overnight Oats (breakfast; served 1x): title:'chocolate': Sugar-free chocolate syrup [most]
- Cottage Cheese, Pumpkin Seed & Berry Protein Bowl (snack; served 1x): title:'pumpkin': Pumpkin seeds [most]
- Greek Chickpea & Bulgur Salad (lunch; served 1x): title:'bulgur': Bulgur, cooked [most]
- Kimchi Deviled Eggs (snack; served 1x): title:'kimchi': Vegan kimchi [most]
- Lemon-Tahini Dip with Veggies & Pita (snack; served 1x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]
- Mediterranean Chickpea & Couscous Bowl (dinner; served 1x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Smoky Tempeh, Sweet Potato & Kale Breakfast Bowl (breakfast; served 1x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tempeh Reuben on Rye with Sauerkraut (lunch; served 1x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Vegan Berry Protein Smoothie (breakfast; served 1x): protein: Pea & rice protein powder [most]
- Apple with Peanut Butter (snack; served 0x): protein: PBfit powdered peanut butter [most]
- Barley Porridge with Apple, Cinnamon & Kefir (breakfast; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Big-Batch Lentil, Veg & Tahini Grain Bowls (lunch; served 0x): carb: Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Black Bean & Sweet Potato Quesadilla with Salsa (dinner; served 0x): carb: Mission Carb Balance tortilla, whole wheat [most]
- Caprese Bulgur Bowl with Fresh Mozzarella (lunch; served 0x): carb: Barley, cooked [most], Bulgur, cooked [most], Couscous, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Cherry-Vanilla Kefir Smoothie Bowl with Pomegranate (breakfast; served 0x): fat: Pumpkin seeds [most]; title:'pomegranate': Pomegranate, raw [most]
- Chickpea Shawarma Bowl with Tahini Sauce (lunch; served 0x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]; title:'sauce': Tzatziki (Greek yogurt sauce) [most]
- Crispy Tofu & Kimchi Bites (snack; served 0x): title:'kimchi': Vegan kimchi [most]
- Edamame & Tofu Buddha Bowl with Miso Dressing (lunch; served 0x): title:'miso': Miso paste [most]
- Egg, Black Bean & Cheddar Breakfast Burrito (breakfast; served 0x): title:'burrito': Mission Carb Balance tortilla, burrito (large) [most]
- Kefir Overnight Oats with Berries & a Brazil Nut (breakfast; served 0x): fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Kimchi Fried Rice Bowl (dinner; served 0x): title:'kimchi': Vegan kimchi [most]
- Lentil & Roasted Veg Grain Bowl with Tahini-Lemon Sauce (lunch; served 0x): title:'tahini': Tahini (sesame butter) [most], Dubai-Style Pistachio Tahini Crunch Bars [most], Pumpkin Tahini Protein Blondie Bites [most]
- Loaded Chickpea Tabbouleh with Bulgur & Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Mediterranean Chickpea & Olive Couscous Bowl (lunch; served 0x): title:'couscous': Couscous, cooked [most]
- Miso-Glazed Edamame (snack; served 0x): title:'miso': Miso paste [most]
- Moroccan Spiced Tofu with Chickpeas & Couscous (dinner; served 0x): title:'couscous': Couscous, cooked [most]
- Peanut Butter Chocolate Chip No-Bake Protein Balls (snack; served 0x): title:'chocolate': Dark chocolate chips, no sugar added [most]; title:'chip': Dark chocolate chips, no sugar added [most]
- Roasted Veg & Chickpea Bulgur Bowl with Tahini-Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Skyr Bowl with Toasted Rye Crumbs & Berries (breakfast; served 0x): title:'skyr': Skyr, plain nonfat [most]
- Sweet Potato Chana Masala with Whole-Wheat Naan (dinner; served 0x): title:'wheat': Mission Carb Balance tortilla, whole wheat [most]
- Tempeh Larb Lettuce Cups with Edamame & Rice (dinner; served 0x): title:'tempeh': Tempeh [most]
- Tofu & Kimchi Breakfast Rice Bowl (breakfast; served 0x): title:'kimchi': Vegan kimchi [most]
- Tuscan White Bean & Barley Bowl with Garlicky Kale (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Vegan Peanut Butter Banana Overnight Oats (breakfast; served 0x): protein: Pea & rice protein powder [most]
- White-Bean Barley Risotto (Orzotto) (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]

</details>

## Ovo (480 days built, 0 failed; avg 150.7 g protein / 2205 kcal per day)

| Food | Tier | % days | Protein share (days present) | kcal share (days present) | Share of all protein | Avg g/day when present | Main dishes | Everywhere swap |
|---|---|---:|---:|---:|---:|---:|---|---|
| Soy protein isolate, powder | specialty | 51.7% | 24.1% | 7.8% | 14.4% | 50.4 | 67x Plant Protein Chia Pudding with Berries; 28x Soft Buttery Scrambled Eggs with Spinach and Breakfast Potatoes | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 83 g protein/100 g, so add a scoop or another protein |
| Pea & rice protein powder | most | 46.0% | 18.6% | 8.1% | 8.9% | 46.1 | 194x Plant Protein Chia Pudding with Berries; 17x Vegan Protein Overnight Oats with Berries & a Brazil Nut | Orgain or Equate plant protein powder (Walmart, Target, Kroger, Costco); recompute scoops from the label (the database blend is 63 g protein/100 g) |
| Tempeh | most | 29.0% | 17.5% | 11.9% | 5.3% | 134.8 | 34x Blackened Tempeh with Rice & Asparagus; 28x Soy-Glazed Tempeh with Quinoa & Bok Choy | firm tofu (everywhere): tempeh has 20.3 g protein/100 g vs tofu 10.6, so about 2x the grams (and 2x the fat) for the same protein, or tofu + edamame |
| Miso paste | most | 27.9% | 1.3% | 1.4% | 0.4% | 14.6 | 41x Doenjang Soybean & Tofu Stew with Sweet Potato; 39x Korean Doenjang Tofu & Soybean Stew over Rice | low-sodium soy sauce for the salty-umami role (use less; miso is a paste at 199 kcal/100 g) |
| Soybeans, cooked | specialty | 16.7% | 15.4% | 10.2% | 2.6% | 127.8 | 41x Doenjang Soybean & Tofu Stew with Sweet Potato; 39x Korean Doenjang Tofu & Soybean Stew over Rice | frozen shelled edamame (everywhere): 11.9 g protein/100 g vs 18.2, so about 1.5x the grams |
| Sauerkraut (raw, live cultures) | most | 14.6% | 0.3% | 0.4% | 0.0% | 40.2 | 27x Rye Toast with Soft Eggs & Sauerkraut; 7x Tempeh Reuben on Rye with Sauerkraut | shelf-stable jarred/canned sauerkraut (same macros, no live cultures) |
| Bok choy, cooked | most | 13.1% | 1.9% | 1.0% | 0.2% | 178 | 28x Soy-Glazed Tempeh with Quinoa & Bok Choy; 17x Sesame Edamame & Buckwheat Noodle-Style Bowl | green cabbage, broccoli or spinach |
| Tahini (sesame butter) | most | 12.9% | 2.0% | 4.5% | 0.3% | 16.6 | 35x Sesame Edamame & Buckwheat Noodle-Style Bowl; 14x Tofu Shawarma Bowl with Tahini Sauce | peanut butter or sunflower-seed butter (similar kcal and fat per 100 g) |
| Collard greens, cooked | most | 11.7% | 3.6% | 2.9% | 0.4% | 178.3 | 37x Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg; 7x Ethiopian-Style Split Pea & Collard Greens over Rice | kale (everywhere) |
| Gochujang (Korean chili paste) | most | 10.6% | 0.5% | 1.3% | 0.1% | 13.8 | 39x Korean Doenjang Tofu & Soybean Stew over Rice; 5x Korean Gochujang Tempeh Bowl | sriracha with a little honey or sugar-free syrup |
| PBfit powdered peanut butter | most | 8.8% | 5.3% | 3.4% | 0.5% | 18.3 | 24x Apple with Peanut Butter; 7x Vegan Peanut Butter Banana Overnight Oats | any powdered peanut butter (PB2, Great Value); regular peanut butter is not like-for-like (51 g fat/100 g vs 15.6) |
| Cherries, sweet, raw | most | 8.5% | 0.8% | 3.4% | 0.1% | 125.7 | 13x Vegan Black Forest Cherry & Cocoa Overnight Oats; 7x Plant Protein Chia Pudding with Berries | frozen dark sweet cherries, or blueberries/strawberries |
| Buckwheat groats, cooked | specialty | 7.7% | 5.8% | 11.3% | 0.5% | 270.2 | 35x Sesame Edamame & Buckwheat Noodle-Style Bowl; 1x Smoky Tempeh Tacos with Avocado | quinoa (4.4 g protein/100 g vs 3.4) or bulgur/brown rice |
| Vegan kimchi | most | 7.1% | 0.4% | 0.4% | 0.0% | 47.4 | 13x Miso-Glazed Tempeh with Brown Rice & Kimchi; 9x Crispy Tofu & Kimchi Bites | sauerkraut (vegan) or leave it off |
| Bran cereal, high-fiber (Fiber One) | most | 5.8% | 1.5% | 3.0% | 0.1% | 35.3 | 20x Plant Protein Chia Pudding with Berries; 7x Apple with Peanut Butter | store-brand bran flakes (much less fiber per gram) plus chia or flax |
| Mission Carb Balance tortilla, whole wheat | most | 5.6% | 4.5% | 3.6% | 0.3% | 60.5 | 6x Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg; 6x Spinach & Pepper Egg Muffin Cups | any store-brand high-fiber low-carb tortilla (e.g. Aldi L'oven Fresh Carb Control) |
| TVP (textured soy protein), dry | specialty | 4.6% | 15.8% | 7.8% | 0.8% | 48.1 | 7x TVP Bolognese with Whole Wheat Pasta; 5x High-Protein Plant Chili | lentils, firm tofu or frozen edamame (all everywhere); TVP is 51 g protein/100 g dry, so portions change |
| Pea protein isolate, powder | specialty | 2.7% | 24.6% | 8.4% | 0.6% | 41.8 | 13x Vegan Black Forest Cherry & Cocoa Overnight Oats | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 80 g protein/100 g, so add a scoop or another protein |
| Falafel | specialty | 0.6% | 14.9% | 19.2% | 0.1% | 117.3 | 2x Falafel & Bulgur Bowl with Lemon Tahini; 1x Falafel Pita Bowl with Lemon-Tahini Drizzle | canned chickpeas, roasted or mashed with spices (or bake falafel from chickpeas) |
| Chickpea pasta, cooked | most | 0.6% | 11.1% | 10.9% | 0.1% | 173 | 3x Moroccan Chickpea & Lentil Harira-Style Stew | whole wheat pasta (less protein and fiber) plus beans |
| Edamame pasta, cooked | specialty | 0.2% | 11.6% | 7.0% | 0.0% | 134 | 1x Miso Soup with Tofu, Greens & Rice | whole wheat pasta plus frozen edamame |

Listed specialty foods supply 18.9% of all ovo protein; listed most-tier foods supply 16.5%.

**Templates that cannot be built without a specialty food (ovo):** 9 of 174 offered.

| Template | Slot | Why (slot: only matching foods) | Times served in 480 days |
|---|---|---|---:|
| Doenjang Soybean & Tofu Stew with Sweet Potato | dinner | protein: Soybeans, cooked [specialty]; title:'soybean': Soybeans, cooked [specialty] | 41 |
| Korean Doenjang Tofu & Soybean Stew over Rice | dinner | title:'soybean': Soybeans, cooked [specialty] | 39 |
| Sesame Edamame & Buckwheat Noodle-Style Bowl | dinner | title:'buckwheat': Buckwheat groats, cooked [specialty] | 35 |
| Arepa with Eggs & Avocado | breakfast | carb: Arepa (cornmeal bread) [specialty]; title:'arepa': Arepa (cornmeal bread) [specialty] | 17 |
| Falafel & Bulgur Bowl with Lemon Tahini | lunch | title:'falafel': Falafel [specialty] | 2 |
| Falafel Pita Bowl with Lemon-Tahini Drizzle | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 1 |
| Falafel & Hummus Mezze Bowl with Warm Pita | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita with Tahini & Cucumber-Tomato Salad | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Mezze Falafel Bowl with Hummus & Herbed Bulgur | dinner | title:'falafel': Falafel [specialty] | 0 |

<details><summary>53 more templates (ovo) need a <code>most</code>-tier food (buildable only with an item a small-town store or Aldi often lacks)</summary>

- Plant Protein Chia Pudding with Berries (snack; served 194x): protein: Pea & rice protein powder [most]
- Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg (breakfast; served 37x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Blackened Tempeh with Rice & Asparagus (lunch; served 34x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Soy-Glazed Tempeh with Quinoa & Bok Choy (dinner; served 28x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Rye Toast with Soft Eggs & Sauerkraut (breakfast; served 27x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Apple with Peanut Butter (snack; served 24x): protein: PBfit powdered peanut butter [most]
- Vegan Protein Overnight Oats with Berries & a Brazil Nut (breakfast; served 17x): protein: Pea & rice protein powder [most]; fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Miso-Glazed Edamame (snack; served 15x): title:'miso': Miso paste [most]
- Tempeh Teriyaki Stir-Fry Bowl (dinner; served 14x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tofu Shawarma Bowl with Tahini Sauce (lunch; served 14x): fat: Tahini (sesame butter) [most]; title:'tahini': Tahini (sesame butter) [most]
- Miso-Glazed Tempeh with Brown Rice & Kimchi (lunch; served 13x): protein: Tempeh [most]; title:'miso': Miso paste [most]; title:'tempeh': Tempeh [most]; title:'kimchi': Vegan kimchi [most]
- Smoky Tempeh & White Bean Cassoulet (dinner; served 13x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Vegan Black Forest Cherry & Cocoa Overnight Oats (breakfast; served 13x): protein: Pea & rice protein powder [most], Pea protein isolate, powder [specialty]
- Brothy Tuscan White Beans with Greens over Bulgur (dinner; served 12x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Miso Soup with Tofu, Greens & Rice (lunch; served 11x): title:'miso': Miso paste [most]
- Crispy Tofu & Kimchi Bites (snack; served 9x): title:'kimchi': Vegan kimchi [most]
- Korean Gochujang Tempeh & Roasted Veg Quinoa Trays (dinner; served 8x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Smoky Red Beans & Rice with Tempeh (dinner; served 8x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Ethiopian-Style Split Pea & Collard Greens over Rice (dinner; served 7x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Tempeh Reuben on Rye with Sauerkraut (lunch; served 7x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Vanilla Chia Pudding Jars with Berries & Almond (breakfast; served 7x): protein: Pea & rice protein powder [most]
- Vegan Peanut Butter Banana Overnight Oats (breakfast; served 7x): protein: Pea & rice protein powder [most]
- Smoky Tempeh Tacos with Avocado (dinner; served 6x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Korean Gochujang Tempeh Bowl (dinner; served 5x): protein: Tempeh [most]; title:'gochujang': Gochujang (Korean chili paste) [most]; title:'tempeh': Tempeh [most]
- Miso-Glazed Tofu & Eggplant Donburi (dinner; served 5x): title:'miso': Miso paste [most]
- Apple Slices with Peanut Butter (snack; served 4x): protein: PBfit powdered peanut butter [most]
- Lemon-Tahini Dip with Veggies & Pita (snack; served 4x): title:'tahini': Tahini (sesame butter) [most]
- Vegan Berry Protein Smoothie (breakfast; served 4x): protein: Pea & rice protein powder [most]
- Crispy Tofu & Kimchi Bibimbap-Style Bowl (dinner; served 3x): title:'kimchi': Vegan kimchi [most]
- Harissa Tofu & Chickpea Traybake (dinner; served 3x): title:'harissa': Harissa paste [most]
- Lentil & Roasted Veg Grain Bowl with Tahini-Lemon Sauce (lunch; served 3x): title:'tahini': Tahini (sesame butter) [most]
- Egg & Sauerkraut Rye Bites (snack; served 2x): title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Kimchi Deviled Eggs (snack; served 2x): title:'kimchi': Vegan kimchi [most]
- Smoky Tempeh, Sweet Potato & Kale Breakfast Bowl (breakfast; served 2x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tempeh & Sweet Potato Breakfast Hash (breakfast; served 2x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Big-Batch Lentil, Veg & Tahini Grain Bowls (lunch; served 1x): carb: Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Chickpea Shawarma Bowl with Tahini Sauce (lunch; served 1x): title:'tahini': Tahini (sesame butter) [most]
- Edamame & Tofu Buddha Bowl with Miso Dressing (lunch; served 1x): title:'miso': Miso paste [most]
- Mediterranean Chickpea & Couscous Bowl (dinner; served 1x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Moroccan Spiced Tofu with Chickpeas & Couscous (dinner; served 1x): title:'couscous': Couscous, cooked [most]
- Peanut Butter & Banana Sandwich on Whole Wheat (breakfast; served 1x): protein: PBfit powdered peanut butter [most]
- Tofu & Kimchi Breakfast Rice Bowl (breakfast; served 1x): title:'kimchi': Vegan kimchi [most]
- Balela Chickpea & Black Bean Salad with Sumac (lunch; served 0x): carb: Bulgur, cooked [most]
- Crispy Tofu Teriyaki with Broccoli & Quinoa (dinner; served 0x): title:'teriyaki': Teriyaki sauce, sugar-free [most]
- Greek Chickpea & Bulgur Salad (lunch; served 0x): title:'bulgur': Bulgur, cooked [most]
- Kimchi Fried Rice Bowl (dinner; served 0x): title:'kimchi': Vegan kimchi [most]
- Loaded Chickpea Tabbouleh with Bulgur & Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Mediterranean Chickpea & Olive Couscous Bowl (lunch; served 0x): title:'couscous': Couscous, cooked [most]
- Roasted Veg & Chickpea Bulgur Bowl with Tahini-Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Sweet Potato Chana Masala with Whole-Wheat Naan (dinner; served 0x): title:'wheat': Mission Carb Balance tortilla, whole wheat [most]
- Tempeh Larb Lettuce Cups with Edamame & Rice (dinner; served 0x): title:'tempeh': Tempeh [most]
- Tuscan White Bean & Barley Bowl with Garlicky Kale (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- White-Bean Barley Risotto (Orzotto) (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]

</details>

## Vegan (480 days built, 0 failed; avg 148.8 g protein / 2204 kcal per day)

| Food | Tier | % days | Protein share (days present) | kcal share (days present) | Share of all protein | Avg g/day when present | Main dishes | Everywhere swap |
|---|---|---:|---:|---:|---:|---:|---|---|
| Pea & rice protein powder | most | 69.0% | 22.6% | 9.3% | 15.6% | 53.4 | 125x Plant Protein Chia Pudding with Berries; 81x Vegan Protein Overnight Oats with Berries & a Brazil Nut | Orgain or Equate plant protein powder (Walmart, Target, Kroger, Costco); recompute scoops from the label (the database blend is 63 g protein/100 g) |
| PBfit powdered peanut butter | most | 52.5% | 6.1% | 3.7% | 3.3% | 18.7 | 85x Apple with Peanut Butter; 70x Apple Slices with Peanut Butter | any powdered peanut butter (PB2, Great Value); regular peanut butter is not like-for-like (51 g fat/100 g vs 15.6) |
| Soy protein isolate, powder | specialty | 50.0% | 23.9% | 7.8% | 13.7% | 49.1 | 60x Tofu Scramble with Potatoes & Spinach; 52x Vegan Protein Overnight Oats with Berries & a Brazil Nut | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 83 g protein/100 g, so add a scoop or another protein |
| Tempeh | most | 37.7% | 19.1% | 12.7% | 7.6% | 147.3 | 34x Soy-Glazed Tempeh with Quinoa & Bok Choy; 34x Blackened Tempeh with Rice & Asparagus | firm tofu (everywhere): tempeh has 20.3 g protein/100 g vs tofu 10.6, so about 2x the grams (and 2x the fat) for the same protein, or tofu + edamame |
| Miso paste | most | 37.7% | 1.4% | 1.5% | 0.5% | 15.6 | 56x Miso Soup with Tofu, Greens & Rice; 44x Doenjang Soybean & Tofu Stew with Sweet Potato | low-sodium soy sauce for the salty-umami role (use less; miso is a paste at 199 kcal/100 g) |
| Tahini (sesame butter) | most | 25.4% | 2.2% | 4.9% | 0.5% | 18.3 | 60x Sesame Edamame & Buckwheat Noodle-Style Bowl; 40x Tofu Shawarma Bowl with Tahini Sauce | peanut butter or sunflower-seed butter (similar kcal and fat per 100 g) |
| Cherries, sweet, raw | most | 22.3% | 0.9% | 3.7% | 0.2% | 120 | 93x Vegan Black Forest Cherry & Cocoa Overnight Oats; 4x Apple with Peanut Butter | frozen dark sweet cherries, or blueberries/strawberries |
| Vegan kimchi | most | 21.5% | 0.4% | 0.4% | 0.1% | 52.3 | 57x Crispy Tofu & Kimchi Bites; 27x Miso-Glazed Tempeh with Brown Rice & Kimchi | sauerkraut (vegan) or leave it off |
| Bok choy, cooked | most | 19.8% | 1.9% | 1.0% | 0.4% | 187.1 | 34x Soy-Glazed Tempeh with Quinoa & Bok Choy; 30x Sesame Edamame & Buckwheat Noodle-Style Bowl | green cabbage, broccoli or spinach |
| Pea protein isolate, powder | specialty | 19.4% | 25.2% | 7.9% | 4.6% | 43.9 | 93x Vegan Black Forest Cherry & Cocoa Overnight Oats | an in-store plant blend (Orgain/Equate) or whey if not vegan; neither matches 80 g protein/100 g, so add a scoop or another protein |
| Soybeans, cooked | specialty | 17.1% | 17.6% | 11.8% | 3.1% | 149.8 | 44x Doenjang Soybean & Tofu Stew with Sweet Potato; 38x Korean Doenjang Tofu & Soybean Stew over Rice | frozen shelled edamame (everywhere): 11.9 g protein/100 g vs 18.2, so about 1.5x the grams |
| Brazil nuts | most | 16.9% | 0.5% | 1.5% | 0.1% | 5 | 81x Vegan Protein Overnight Oats with Berries & a Brazil Nut | one Brazil nut out of a can of mixed nuts, or omit it (the dishes use a single 5 g nut) |
| Buckwheat groats, cooked | specialty | 13.1% | 6.4% | 12.1% | 0.8% | 277.6 | 60x Sesame Edamame & Buckwheat Noodle-Style Bowl; 1x Ethiopian-Style Split Pea & Collard Greens over Rice | quinoa (4.4 g protein/100 g vs 3.4) or bulgur/brown rice |
| Gochujang (Korean chili paste) | most | 10.8% | 0.4% | 1.2% | 0.1% | 12.8 | 38x Korean Doenjang Tofu & Soybean Stew over Rice; 5x Korean Gochujang Tempeh Bowl | sriracha with a little honey or sugar-free syrup |
| Bulgur, cooked | most | 10.2% | 6.1% | 9.7% | 0.6% | 269.9 | 18x Big-Batch Lentil, Veg & Tahini Grain Bowls; 16x Tofu Shawarma Bowl with Tahini Sauce | quinoa or brown rice (less fiber than bulgur) |
| Tofu, silken | specialty | 9.4% | 6.3% | 4.8% | 0.6% | 192 | 41x Miso Soup with Tofu, Greens & Rice; 4x Mapo Tofu over Rice | firm tofu blended smooth (for mousse, dressings, scrambles); for non-vegans, nonfat Greek yogurt in desserts |
| Collard greens, cooked | most | 9.0% | 4.4% | 2.9% | 0.3% | 182.1 | 19x Ethiopian-Style Split Pea & Collard Greens over Rice; 18x Misir Wot, Ethiopian Spiced Red Lentils over Rice | kale (everywhere) |
| Harissa paste | most | 8.3% | 0.0% | 0.5% | 0.0% | 14.5 | 19x Ethiopian-Style Split Pea & Collard Greens over Rice; 18x Misir Wot, Ethiopian Spiced Red Lentils over Rice | sriracha or chili-garlic sauce plus a pinch of cumin |
| Hemp seeds | specialty | 5.2% | 4.6% | 4.3% | 0.2% | 15.7 | 25x Edamame & White Bean Smash Snack on Rye | chia seeds or ground flax (far less protein: 16.5 vs 31.6 g/100 g) or pumpkin seeds |
| TVP (textured soy protein), dry | specialty | 5.0% | 15.5% | 7.7% | 0.8% | 44.5 | 9x TVP & Black Bean Enchilada Skillet; 5x Chili-Lime TVP & Black Bean Rice Bowl | lentils, firm tofu or frozen edamame (all everywhere); TVP is 51 g protein/100 g dry, so portions change |
| Falafel | specialty | 0.4% | 15.0% | 20.3% | 0.1% | 134 | 1x Mezze Falafel Bowl with Hummus & Herbed Bulgur; 1x Falafel & Hummus Mezze Bowl with Warm Pita | canned chickpeas, roasted or mashed with spices (or bake falafel from chickpeas) |
| Mission Carb Balance tortilla, soft taco | most | 0.4% | 10.3% | 6.0% | 0.0% | 84 | 2x Roasted Sweet Potato & White Bean Tacos | any store-brand high-fiber low-carb tortilla (e.g. Aldi L'oven Fresh Carb Control) |
| Chickpea pasta, cooked | most | 0.2% | 14.7% | 14.1% | 0.0% | 240 | 1x Moroccan Chickpea & Lentil Harira-Style Stew | whole wheat pasta (less protein and fiber) plus beans |
| Edamame pasta, cooked | specialty | 0.2% | 10.5% | 4.8% | 0.0% | 93 | 1x Vanilla Chia Pudding Jars with Berries & Almond | whole wheat pasta plus frozen edamame |

Listed specialty foods supply 23.9% of all vegan protein; listed most-tier foods supply 29.2%.

**Templates that cannot be built without a specialty food (vegan):** 8 of 148 offered.

| Template | Slot | Why (slot: only matching foods) | Times served in 480 days |
|---|---|---|---:|
| Sesame Edamame & Buckwheat Noodle-Style Bowl | dinner | title:'buckwheat': Buckwheat groats, cooked [specialty] | 60 |
| Doenjang Soybean & Tofu Stew with Sweet Potato | dinner | protein: Soybeans, cooked [specialty]; title:'soybean': Soybeans, cooked [specialty] | 44 |
| Korean Doenjang Tofu & Soybean Stew over Rice | dinner | title:'soybean': Soybeans, cooked [specialty] | 38 |
| Falafel & Hummus Mezze Bowl with Warm Pita | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 1 |
| Mezze Falafel Bowl with Hummus & Herbed Bulgur | dinner | title:'falafel': Falafel [specialty] | 1 |
| Falafel & Bulgur Bowl with Lemon Tahini | lunch | title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita Bowl with Lemon-Tahini Drizzle | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |
| Falafel Pita with Tahini & Cucumber-Tomato Salad | lunch | protein: Falafel [specialty]; title:'falafel': Falafel [specialty] | 0 |

<details><summary>49 more templates (vegan) need a <code>most</code>-tier food (buildable only with an item a small-town store or Aldi often lacks)</summary>

- Plant Protein Chia Pudding with Berries (snack; served 125x): protein: Pea & rice protein powder [most]
- Vegan Black Forest Cherry & Cocoa Overnight Oats (breakfast; served 93x): protein: Pea & rice protein powder [most], Pea protein isolate, powder [specialty]
- Apple with Peanut Butter (snack; served 85x): protein: PBfit powdered peanut butter [most]
- Vegan Protein Overnight Oats with Berries & a Brazil Nut (breakfast; served 81x): protein: Pea & rice protein powder [most]; fat: Brazil nuts [most]; title:'brazil': Brazil nuts [most]
- Apple Slices with Peanut Butter (snack; served 70x): protein: PBfit powdered peanut butter [most]
- Vegan Peanut Butter Banana Overnight Oats (breakfast; served 69x): protein: Pea & rice protein powder [most]
- Crispy Tofu & Kimchi Bites (snack; served 57x): title:'kimchi': Vegan kimchi [most]
- Miso Soup with Tofu, Greens & Rice (lunch; served 56x): title:'miso': Miso paste [most]
- Vegan Berry Protein Smoothie (breakfast; served 51x): protein: Pea & rice protein powder [most]
- Vanilla Chia Pudding Jars with Berries & Almond (breakfast; served 48x): protein: Pea & rice protein powder [most]
- Tofu Shawarma Bowl with Tahini Sauce (lunch; served 40x): fat: Tahini (sesame butter) [most]; title:'tahini': Tahini (sesame butter) [most]
- Blackened Tempeh with Rice & Asparagus (lunch; served 34x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Soy-Glazed Tempeh with Quinoa & Bok Choy (dinner; served 34x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'bok': Bok choy, cooked [most]; title:'choy': Bok choy, cooked [most]
- Miso-Glazed Tempeh with Brown Rice & Kimchi (lunch; served 27x): protein: Tempeh [most]; title:'miso': Miso paste [most]; title:'tempeh': Tempeh [most]; title:'kimchi': Vegan kimchi [most]
- Miso-Glazed Edamame (snack; served 20x): title:'miso': Miso paste [most]
- Tempeh Teriyaki Stir-Fry Bowl (dinner; served 20x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Ethiopian-Style Split Pea & Collard Greens over Rice (dinner; served 19x): title:'collard': Collard greens, cooked [most]; title:'greens': Collard greens, cooked [most]
- Tempeh & Sweet Potato Breakfast Hash (breakfast; served 19x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Big-Batch Lentil, Veg & Tahini Grain Bowls (lunch; served 18x): carb: Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Brothy Tuscan White Beans with Greens over Bulgur (dinner; served 11x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Smoky Red Beans & Rice with Tempeh (dinner; served 11x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Smoky Tempeh & White Bean Cassoulet (dinner; served 11x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Tempeh Reuben on Rye with Sauerkraut (lunch; served 9x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]; title:'sauerkraut': Sauerkraut (raw, live cultures) [most]
- Smoky Tempeh Tacos with Avocado (dinner; served 8x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Korean Gochujang Tempeh & Roasted Veg Quinoa Trays (dinner; served 6x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Lemon-Tahini Dip with Veggies & Pita (snack; served 6x): title:'tahini': Tahini (sesame butter) [most]
- Smoky Tempeh, Sweet Potato & Kale Breakfast Bowl (breakfast; served 6x): protein: Tempeh [most]; title:'tempeh': Tempeh [most]
- Crispy Tofu & Kimchi Bibimbap-Style Bowl (dinner; served 5x): title:'kimchi': Vegan kimchi [most]
- Korean Gochujang Tempeh Bowl (dinner; served 5x): protein: Tempeh [most]; title:'gochujang': Gochujang (Korean chili paste) [most]; title:'tempeh': Tempeh [most]
- Kimchi Fried Rice Bowl (dinner; served 4x): title:'kimchi': Vegan kimchi [most]
- Miso-Glazed Tofu & Eggplant Donburi (dinner; served 4x): title:'miso': Miso paste [most]
- Balela Chickpea & Black Bean Salad with Sumac (lunch; served 2x): carb: Bulgur, cooked [most]
- Harissa Tofu & Chickpea Traybake (dinner; served 2x): title:'harissa': Harissa paste [most]
- Loaded Chickpea Tabbouleh with Bulgur & Lemon (lunch; served 2x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]
- Tofu & Kimchi Breakfast Rice Bowl (breakfast; served 2x): title:'kimchi': Vegan kimchi [most]
- Tuscan White Bean & Barley Bowl with Garlicky Kale (dinner; served 2x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]
- Chickpea Shawarma Bowl with Tahini Sauce (lunch; served 1x): title:'tahini': Tahini (sesame butter) [most]
- Edamame & Tofu Buddha Bowl with Miso Dressing (lunch; served 1x): title:'miso': Miso paste [most]
- Lentil & Roasted Veg Grain Bowl with Tahini-Lemon Sauce (lunch; served 1x): title:'tahini': Tahini (sesame butter) [most]
- Mediterranean Chickpea & Olive Couscous Bowl (lunch; served 1x): title:'couscous': Couscous, cooked [most]
- Moroccan Spiced Tofu with Chickpeas & Couscous (dinner; served 1x): title:'couscous': Couscous, cooked [most]
- Crispy Tofu Teriyaki with Broccoli & Quinoa (dinner; served 0x): title:'teriyaki': Teriyaki sauce, sugar-free [most]
- Greek Chickpea & Bulgur Salad (lunch; served 0x): title:'bulgur': Bulgur, cooked [most]
- Mediterranean Chickpea & Couscous Bowl (dinner; served 0x): carb: Couscous, cooked [most]; title:'couscous': Couscous, cooked [most]
- Peanut Butter & Banana Sandwich on Whole Wheat (breakfast; served 0x): protein: PBfit powdered peanut butter [most]
- Roasted Veg & Chickpea Bulgur Bowl with Tahini-Lemon (lunch; served 0x): carb: Bulgur, cooked [most]; title:'bulgur': Bulgur, cooked [most]; title:'tahini': Tahini (sesame butter) [most]
- Sweet Potato Chana Masala with Whole-Wheat Naan (dinner; served 0x): title:'wheat': Mission Carb Balance tortilla, whole wheat [most]
- Tempeh Larb Lettuce Cups with Edamame & Rice (dinner; served 0x): title:'tempeh': Tempeh [most]
- White-Bean Barley Risotto (Orzotto) (dinner; served 0x): carb: Barley, cooked [most]; title:'barley': Barley, cooked [most]

</details>
