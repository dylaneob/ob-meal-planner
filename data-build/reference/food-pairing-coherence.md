# Food-pairing coherence reference (researched 2026-06)

**Purpose.** Stop the auto-drafter from generating an *incoherent plate*. The macro
math can be perfect and the plate still read "wrong" to a human (eggs + sweet potato,
sriracha on dal, marinara + soy sauce). This file is the **culinary-coherence layer**:
per PROTEIN and per CUISINE, what carbs / vegetables / sauces / acids / herbs PAIR, and
which combinations to AVOID.

All foods named here exist in `app/data/foods.js`, so this is directly actionable.

---

## How to think about coherence (the 4 rules behind every call below)

Pairings succeed for two reasons and fail for the inverse (see Sources: ICE, Trilogy):

1. **Shared aromatic compounds** — tomato + basil (both carry eugenol), rosemary + lemon.
   Foods that share volatiles read as "belonging together." This is the *food-pairing
   hypothesis* behind The Flavor Matrix.
2. **Taste-axis balance** — the 5 tastes (sweet / sour / salty / bitter / umami) plus fat
   and heat should *balance*, not pile up. Two strong sweet elements, or two competing
   acids, clash.
3. **One flavor principle per plate (Rozin).** Every cuisine has a *signature seasoning
   combination* ("flavor principle") that acts as a center of gravity pulling a plate
   together. **Don't cross two flavor principles on one plate** — soy/sesame (Korean) +
   oregano/lemon (Greek) is the single most common incoherence the drafter can produce.
4. **Sweetness placement.** A *savory* main wants a *neutral-starch* carb. Swapping in a
   sweet carb (sweet potato vs baked potato; raisins vs none) only works when the cuisine
   *invites* sweetness (American BBQ, some Indian, Middle-Eastern tagine). Default to the
   neutral starch.

### The Rozin "flavor principle" of each cuisine (the center of gravity)
| Cuisine | Signature seasoning combination (flavor principle) |
|---|---|
| Mexican | chili + tomato + lime + cumin + cilantro (+ onion, garlic) |
| Italian | tomato + garlic + basil/oregano + olive oil (+ parmesan) |
| Mediterranean/Greek | olive oil + lemon + oregano + garlic (+ feta, yogurt, dill, mint) |
| Indian | onion + garlic + ginger + cumin + coriander + turmeric + garam masala |
| Thai | fish sauce + lime + chili + garlic (+ lemongrass, Thai basil, cilantro) |
| Japanese | soy sauce + mirin/sugar + dashi (+ ginger, sesame, rice vinegar) |
| Korean | soy + sesame + garlic + chili (gochujang) (+ ginger, scallion) |
| American/BBQ | smoke + sweet (brown sugar/molasses) + vinegar/mustard + paprika + black pepper |
| Middle-Eastern | cumin + coriander + garlic + lemon + tahini + sumac/za'atar (+ mint, parsley) |

---

## PART A — Pairing by PROTEIN
For each protein: the carbs / veg / acid / herbs that pair, and the specific clashes.

### Chicken (breast, thigh, ground, drumstick, canned)
- **Carbs:** rice (white/brown/wild), tortillas (any), pasta, couscous, quinoa, potato,
  bread, pita. The universal protein — takes any starch.
- **Veg:** broccoli, bell pepper, onion, zucchini, spinach, green beans, mushrooms,
  asparagus, cauliflower, carrots — all work.
- **Acid:** lemon (default), lime (for Mexican/Thai), vinegar (American). 
- **Herbs:** thyme, rosemary, oregano, parsley, cilantro (cuisine-dependent), basil.
- **Sauces:** essentially any in the list, *matched to cuisine*.
- **AVOID:** nothing intrinsic — chicken's only failure mode is **cuisine-crossing the
  seasoning** (teriyaki chicken + a side of marinara veg). Keep one flavor principle.

### Beef (sirloin, tenderloin, ground 93/7, top round, bison/venison)
- **Carbs:** potato (the classic), rice, pasta, tortillas (Mexican), bread/bun (American).
- **Veg:** mushrooms (umami match), onion, bell pepper, broccoli, green beans, asparagus,
  Brussels sprouts. Mushroom + beef is a shared-glutamate umami win.
- **Acid:** red-wine/balsamic notes, lime (Mexican), a *little* — beef wants less brightness
  than fish.
- **Herbs:** black pepper, rosemary, thyme, cumin (Mexican), garlic.
- **Sauces:** chimichurri, BBQ, salsa, gochujang/Korean, teriyaki.
- **AVOID:** **delicate herb-forward sauces** (dill, tzatziki, ponzu) read as too light
  under beef's heaviness; **fruit-sweet pairings** (mango, apple) clash unless deliberately
  Korean/BBQ-sweet. Don't put beef with light white-fish sauces.

### Pork (chop, tenderloin, ground, ham, bacon)
- **Carbs:** rice, potato, tortillas, bread. Pork is the one savory main where a **touch of
  sweet/fruit is correct** (apple, pineapple).
- **Veg:** cabbage, sauerkraut/kimchi, Brussels sprouts, green beans, onion, fennel notes,
  collard greens.
- **Acid:** apple-cider/vinegar (American/Carolina), lime (Mexican carnitas), rice vinegar
  (Korean/Japanese).
- **Herbs:** sage, thyme, rosemary, fennel, caraway, paprika.
- **Sauces:** BBQ (mustard-based esp.), salsa verde, gochujang, hoisin/teriyaki.
- **PAIRS (sweet OK):** apple, pineapple, maple — pork *invites* the sweet note that beef
  rejects.
- **AVOID:** heavy cheese sauces; minty/Greek tzatziki on American-style pork reads odd
  (mint is for lamb).

### Turkey (breast, thigh, ground 93/7)
- **Carbs:** like chicken — rice, potato, bread, couscous, quinoa, tortillas.
- **Veg:** green beans, Brussels, spinach, mushrooms, carrots, sweet corn.
- **Acid:** lemon, a little cranberry-style tart-sweet is the one *sanctioned* sweet note.
- **Herbs:** sage, thyme, marjoram, rosemary (poultry seasoning), parsley.
- **Sauces:** lean gravy notes, salsa, pesto-light, BBQ.
- **AVOID:** turkey is lean and mild — **strong fermented Asian pastes (gochujang, miso)
  can bully it** unless ground and cooked into the dish. Treat closer to chicken than beef.

### Salmon (fillet) + Mackerel (fatty fish)
- **Carbs:** rice (esp. for Japanese/teriyaki), quinoa, couscous, potato, soba-style.
- **Veg:** asparagus (classic), broccoli, spinach, bok choy, green beans, snap peas.
- **Acid:** lemon (default), lime, **ponzu/rice vinegar** (Japanese) — salmon *loves* bright
  acid because it's fatty.
- **Herbs:** dill (the canonical match), parsley, chives; cilantro for Asian prep.
- **Sauces:** teriyaki, miso glaze, ponzu, soy, tzatziki (Med), pesto.
- **PAIRS:** salmon is fatty enough to take **bold** sauces (soy/teriyaki/gochujang) AND
  delicate ones (dill/lemon).
- **AVOID:** heavy red tomato sauces (marinara) fight salmon's richness; cheese on salmon
  is generally off (except a little feta, Med-style).

### White fish (cod, haddock, halibut, pollock, tilapia)
- **Carbs:** rice, potato, couscous, light pasta, bread/pita.
- **Veg:** keep light — spinach, zucchini, green beans, asparagus, tomato, fennel notes.
- **Acid:** **lemon is mandatory-feeling**; lime for tacos; capers/olive notes (Med).
- **Herbs:** parsley, dill, chives, a little tarragon. Keep it delicate.
- **Sauces:** salsa verde / pico (fish tacos), tzatziki, lemon-herb, light teriyaki.
- **AVOID:** **anything heavy or sweet** — BBQ sauce, gochujang, teriyaki-heavy, dark
  molasses notes overpower a flaky white fish. This is the most over-poweredable protein;
  default light.

### Shrimp + crab + mussels + oysters (shellfish)
- **Carbs:** rice (essential for Thai/Cajun), pasta (scampi/Italian), tortillas (tacos),
  grits-style.
- **Veg:** garlic-forward greens, bell pepper, snap peas, bok choy, tomato, zucchini.
- **Acid:** lime (Thai/Mexican), lemon (Italian/scampi).
- **Herbs:** garlic (heavy), parsley, cilantro (Thai/Mexican), Thai basil, Old Bay/Cajun.
- **Sauces:** light peanut (Thai), sweet chili, salsa, scampi/garlic-lemon, pico.
- **AVOID:** **cheese on seafood is the textbook Italian taboo** (no parmesan on seafood
  pasta in the tradition) — flag if the drafter adds cheese to a shrimp/seafood plate.
  Heavy cream/BBQ also clash.

### Eggs (whole, white)
- **Carbs:** **regular potato / hash (NOT sweet potato), bread/toast, bagel, English
  muffin, corn or flour tortilla** (huevos / breakfast tacos), white/brown rice (Asian
  fried-rice or Japanese tamago-over-rice).
- **Veg:** spinach, mushrooms, onion, bell pepper, tomato, zucchini, asparagus.
- **Acid:** minimal — a little hot sauce, salsa, or pico; lemon only in tiny amounts.
- **Herbs:** chives, dill, parsley, basil, tarragon, paprika, everything-bagel.
- **Sauces:** salsa, pico, hot sauce, a little cheese, light béchamel.
- **AVOID — THE KEY ONE:** **sweet potato with eggs reads worse than regular potato.** Eggs
  are savory/sulfurous; the regular potato is a neutral canvas, the sweet potato fights the
  egg with caramel-sweetness. Default eggs → **baked potato (flesh) / regular hash, never
  sweet potato.** Also avoid pairing eggs with overtly sweet fruit on the same savory plate
  (banana, mango next to a savory omelet). Sweet-fruit + eggs only works as a *separate*
  sweet breakfast component (yogurt + berries), not on the egg plate itself.

### Tofu (firm, silken) + Tempeh + Edamame + Seitan + TVP
- **Carbs:** rice (all), rice noodles/shirataki, soba-style, quinoa.
- **Veg:** bok choy, broccoli, snap peas, mushrooms, bell pepper, spinach, cabbage.
- **Acid:** rice vinegar, lime (Thai), ponzu.
- **Herbs:** ginger, scallion, sesame, cilantro, Thai basil, garlic.
- **Sauces:** soy, teriyaki, miso, gochujang, light peanut, sweet chili, ponzu.
- **PAIRS:** tofu/tempeh are **blank canvases that need an assertive sauce** — lean into
  the Asian flavor principles (this is their cultural home). Tempeh also takes BBQ/smoky
  American well (it's nutty enough).
- **AVOID:** under-seasoning (a plain tofu + plain veg + no sauce plate is *coherent but
  boring* — always give it a sauce). Tomato-marinara on plain tofu is weak unless it's a
  deliberate Italian "tofu ricotta" move.

### Greek yogurt (plain, as a savory component / sauce base)
- **Savory pairings:** the base of **tzatziki** (Greek), **raita** (Indian), and a cooling
  foil to spicy Mexican/Middle-Eastern. Pairs with cucumber, dill, mint, garlic, lemon.
- **Cuisines:** Greek/Med, Indian, Middle-Eastern — its three natural homes.
- **AVOID:** Greek yogurt as a *savory sauce* on East-Asian plates (Japanese/Korean/Thai)
  reads wrong — those cuisines don't use dairy. Keep yogurt to Med / Indian / Middle-East
  on the savory side. (As a *sweet* breakfast/snack with berries + honey it's universal.)

---

## PART B — Pairing by CUISINE
For each cuisine: best proteins, carbs, veg, acid, herbs, sauces — and the cross-cuisine
clashes to avoid. Stay inside one block per plate.

### Mexican  — *chili + tomato + lime + cumin + cilantro*
- **Proteins:** chicken, beef, pork (carnitas), shrimp, eggs (huevos), black/pinto/refried
  beans, tofu (sofritas-style).
- **Carbs:** corn tortilla, flour tortilla, Mission Carb-Balance tortillas, white/brown
  rice, black/pinto beans.
- **Veg:** tomato, onion, bell pepper, romaine/iceberg, avocado, corn, jalapeño-style heat.
- **Acid:** **lime** (never lemon — lime is the Mexican acid).
- **Herbs/spice:** cilantro, cumin, chili powder, smoked paprika, oregano (Mexican).
- **Sauces:** salsa, salsa verde, pico de gallo, chipotle in adobo, enchilada sauce, a
  little cheese, avocado/guac.
- **AVOID:** soy sauce, teriyaki, ponzu, gochujang, hoisin (Asian), basil/oregano-Italian
  marinara, tzatziki, curry spices. **Lemon instead of lime** is a subtle but real tell.

### Italian — *tomato + garlic + basil/oregano + olive oil + parmesan*
- **Proteins:** chicken, beef (bolognese/meatball), turkey (lean ragù), pork (sausage-
  style), shrimp (scampi — *no cheese*), white fish (acqua pazza), tofu-ricotta.
- **Carbs:** pasta (any), whole-wheat/high-protein pasta, bread, polenta-style.
- **Veg:** tomato, zucchini, eggplant, mushrooms, spinach, broccoli, bell pepper, onion.
- **Acid:** balsamic, lemon (for fish/chicken piccata), red-wine notes.
- **Herbs:** basil, oregano, parsley, rosemary, garlic.
- **Sauces:** marinara/pomodoro, light pesto, a little parmesan as a finisher.
- **AVOID:** soy/teriyaki/Asian anything, lime + cilantro (that's Mexican), cumin,
  **parmesan on seafood** (Italian taboo — flag cheese + shrimp/fish), curry.

### Mediterranean / Greek — *olive oil + lemon + oregano + garlic + feta/yogurt*
- **Proteins:** chicken, lamb, white fish, salmon, shrimp, chickpeas, eggs, Greek yogurt,
  feta, falafel.
- **Carbs:** pita, couscous, bulgur, rice, potato, quinoa, chickpeas/white beans.
- **Veg:** cucumber, tomato, onion, bell pepper, spinach, eggplant, romaine, olives.
- **Acid:** **lemon** (the Greek acid), red-wine vinegar.
- **Herbs:** oregano, dill, mint, parsley, garlic.
- **Sauces:** tzatziki, lemon-oregano (ladolemono), hummus, a little feta, olives.
- **AVOID:** soy/teriyaki/gochujang, lime+cilantro (Mexican), heavy curry, BBQ, sweet
  glazes. Mint pairs with lamb here — don't mint your beef.

### Indian — *onion + garlic + ginger + cumin + coriander + turmeric + garam masala*
- **Proteins:** chicken (tikka/curry), lamb, shrimp, paneer-style (cottage cheese/feta),
  lentils/dal, chickpeas (chana), tofu (paneer sub), Greek yogurt (raita/marinade).
- **Carbs:** basmati/white/brown rice, naan→pita/flatbread sub, lentils, chickpeas.
- **Veg:** onion, tomato, spinach (saag), cauliflower (aloo gobi), peas, green beans, okra.
- **Acid:** lemon, lime, tamarind notes, **yogurt** (raita) as the cooling foil.
- **Herbs/spice:** cumin, coriander, turmeric, garam masala, ginger, garlic, cilantro,
  cardamom.
- **Sauces:** raita / plain Greek yogurt, mango chutney (sweet finish), curry/tikka spice.
- **AVOID — THE KEY ONE:** **sriracha / Frank's / gochujang / soy / teriyaki on dal or
  curry.** Indian heat comes from its *own* chili + spice base; a Thai/Korean/American hot
  sauce is the wrong heat profile and breaks the flavor principle. Also avoid basil-oregano
  Italian herbs and lime-cilantro-*only* (Mexican) seasoning on Indian plates.

### Thai — *fish sauce + lime + chili + garlic + lemongrass + Thai basil + cilantro*
- **Proteins:** chicken, shrimp, pork, white fish, tofu, beef (salad/stir-fry).
- **Carbs:** jasmine/white rice, rice noodles, shirataki.
- **Veg:** bell pepper, snap peas, bok choy, carrots, broccoli, onion, cabbage.
- **Acid:** **lime** + fish-sauce tang; rice vinegar.
- **Herbs:** cilantro, Thai basil, mint, lemongrass, ginger/galangal, garlic.
- **Sauces:** light peanut, sweet chili, nuoc cham, curry (coconut), fish-sauce dressings.
- **AVOID:** soy-heavy/teriyaki *as the lead* (that's Japanese/Korean — Thai leads with
  fish sauce + lime), tomato-marinara, cheese, BBQ, tzatziki, Western herbs (rosemary,
  thyme, oregano).

### Japanese — *soy + mirin/sugar + dashi + ginger + sesame + rice vinegar*
- **Proteins:** salmon, white fish, chicken (teriyaki/katsu), beef (teriyaki), tofu, eggs
  (tamago), shrimp, edamame.
- **Carbs:** white/brown/sushi rice, soba→shirataki/whole-wheat noodle sub.
- **Veg:** bok choy, broccoli, snap peas, mushrooms, spinach, cabbage, edamame, seaweed.
- **Acid:** **ponzu**, rice vinegar.
- **Herbs/aromatics:** ginger, scallion, sesame, shiso/nori. (No Western herbs.)
- **Sauces:** soy/tamari, teriyaki, miso glaze, ponzu.
- **AVOID:** cumin, oregano, basil, lime+cilantro (Mexican), tomato-marinara, BBQ, dairy/
  cheese/yogurt sauces, gochujang-as-lead (that's Korean — related but distinct). Keep
  sweetness to the gentle mirin level; don't pile sugar on.

### Korean — *soy + sesame + garlic + chili (gochujang) + ginger + scallion*
- **Proteins:** beef (bulgogi), pork (bossam/spicy), chicken, tofu, eggs, shrimp.
- **Carbs:** white/brown rice, rice noodles, glass-noodle→shirataki sub.
- **Veg:** **kimchi** (signature), cabbage, spinach, bean sprouts, mushrooms, scallion,
  cucumber, bok choy, daikon.
- **Acid:** rice vinegar; kimchi tang.
- **Herbs/aromatics:** garlic (heavy), ginger, sesame, scallion.
- **Sauces:** gochujang, ssamjang, soy-sesame, sugar-free Korean BBQ.
- **AVOID:** Western herbs (rosemary/oregano/basil), lime+cilantro (Mexican), tomato-
  marinara, dairy/cheese, tzatziki. Korean *is* sweet-heat-savory — that's in-bounds; the
  clash is mixing in a *different* cuisine's seasoning.

### American / BBQ — *smoke + sweet (brown sugar/molasses) + vinegar/mustard + paprika + black pepper*
- **Proteins:** beef (burger/brisket), pork (pulled/ribs), chicken (BBQ/buffalo), turkey,
  bacon/ham, eggs (breakfast).
- **Carbs:** potato (baked/mashed/fries), bun/bread, corn, rice, sweet potato (**OK here**
  — American BBQ sanctions the sweet starch), beans.
- **Veg:** corn, green beans, Brussels, broccoli, coleslaw cabbage, onion, bell pepper.
- **Acid:** **cider/white vinegar** (Carolina), mustard tang, pickle.
- **Herbs/spice:** paprika, black pepper, garlic/onion powder, mustard, a little brown
  sugar. 
- **Sauces:** BBQ (sweet KC / vinegar Carolina / mustard SC), buffalo/Frank's, ranch,
  mustard, ketchup.
- **PAIRS (sweet OK):** this is the cuisine where **sweet potato, corn, brown-sugar glaze,
  and fruit-sweet (apple-slaw) are coherent** — the smoke/sweet axis invites it.
- **AVOID:** soy/teriyaki/ponzu/miso, curry spices, lime+cilantro-*lead* (that's Mexican),
  oregano-feta Greek. BBQ is heavy — don't drown delicate white fish in it.

### Middle-Eastern — *cumin + coriander + garlic + lemon + tahini + sumac/za'atar + mint*
- **Proteins:** lamb, chicken (shawarma), chickpeas (falafel/hummus), beef (kofta), white
  fish, Greek yogurt, eggs (shakshuka).
- **Carbs:** pita, couscous, bulgur, rice, chickpeas, lentils, white beans.
- **Veg:** tomato, cucumber, onion, eggplant (baba ganoush), bell pepper, parsley-heavy
  salads, spinach.
- **Acid:** **lemon**, sumac (tart), pomegranate notes.
- **Herbs/spice:** cumin, coriander, parsley, mint, garlic, za'atar, cinnamon (savory
  tagine), harissa heat.
- **Sauces:** hummus, tahini-lemon, tzatziki-style yogurt, harissa, zhug.
- **PAIRS (sweet OK, sparingly):** dried fruit (raisins/dates) in a tagine, pomegranate —
  the one savory tradition that sanctions a little dried-fruit sweetness.
- **AVOID:** soy/teriyaki/Asian anything, basil-marinara Italian, lime+cilantro-lead
  (Mexican), BBQ. Cumin+coriander overlaps with Mexican — the *acid+herb* (lemon+mint+
  parsley+tahini vs lime+cilantro) is what keeps them distinct; don't blur them.

---

## PART C — The master "do-not-generate" clash list (quick reference for the drafter)

1. **Sweet potato + eggs** → use baked/regular potato instead (sweet fights egg's savory).
2. **Sriracha / Frank's / soy / teriyaki / gochujang on Indian dal or curry** → use raita,
   yogurt, or the dish's own chili. Wrong heat profile.
3. **Cheese / parmesan on seafood pasta or shrimp** → Italian taboo; omit cheese.
4. **Two flavor principles on one plate** (teriyaki main + marinara veg; tzatziki + soy;
   gochujang + oregano) → pick ONE cuisine per meal.
5. **Lemon where the cuisine wants lime** (Mexican/Thai) or **lime where it wants lemon**
   (Greek/Med/Italian) → match the acid to the cuisine.
6. **Dairy/yogurt/cheese sauce on East-Asian plates** (Japanese/Korean/Thai) → those
   cuisines are dairy-free; use soy/ponzu/sesame instead.
7. **Heavy/sweet sauce (BBQ, teriyaki-heavy, gochujang) on delicate white fish** → white
   fish wants lemon-herb-light; reserve heavy glazes for salmon/chicken/beef/pork.
8. **Sweet fruit (mango, banana) on a savory egg/meat plate** → keep sweet fruit to the
   yogurt/oats/snack side, not the savory main.
9. **Western herbs (rosemary, thyme, oregano, basil) on Asian plates** → use ginger,
   sesame, scallion, cilantro, Thai basil instead.
10. **Mint on beef / American pork** → mint belongs with lamb and Med/Middle-Eastern; not
    a default savory herb elsewhere.

**Sanctioned sweet-carb / sweet-fruit exceptions** (where sweet IS coherent): American/BBQ
(sweet potato, corn, brown-sugar glaze), pork generally (apple, pineapple, maple),
Middle-Eastern tagine (dates/raisins), Indian (mango chutney finish), turkey (cranberry-
style tart-sweet). Everywhere else, default to the neutral starch and keep fruit on the
sweet side of the plate.

---

## Sources
- Elisabeth Rozin, *The Flavor-Principle Cookbook / Ethnic Cuisine* — the "flavor principle"
  framework (a cuisine = its signature seasoning combination acting as a center of gravity).
  Summarized via Restaurant Business Online, "Understanding flavor principles," and the
  archived text (archive.org/details/flavorprinciplec00rozi).
- Karen Page & Andrew Dornenburg, *The Flavor Bible* — per-ingredient affinity lists (the
  standard chef reference for what pairs with what).
- James Briscione & Brooke Parkhurst, *The Flavor Matrix* — the food-pairing-hypothesis
  (shared aromatic compounds) science behind why pairings work.
- Institute of Culinary Education, "Why do Flavors Pair Well?" (ice.edu) — shared compounds
  + the 5 tastes balance model.
- Trilogy Flavors, "The Science of Flavor Pairing" — shared aromatics (tomato+basil eugenol,
  rosemary+lemon), complementary vs contrasting balance.
- EasyHealthyFoods, "What Foods Do Not Go Together," and Tasting Table / Mama Loves To Eat —
  documented clash patterns (sweet/savory mismatch, temperature, **cross-cuisine errors**).
- Cuisine-specific staple/seasoning references: Serious-Eats-style and regional guides cited
  in research — Hot Thai Kitchen & Hungry in Thailand (Thai pantry: fish sauce/lime/chili/
  lemongrass/Thai basil); Swasthi's Recipes & MasterClass (Indian spice combinations &
  regional dals); Savory Spice & Greek Islands Taverna (Greek: olive oil/lemon/oregano/feta);
  MasterClass Lebanese & Middle-Eastern spice guides (cumin/coriander/sumac/za'atar/tahini);
  Wikipedia *Ssamjang* + Korean BBQ guides (soy/sesame/garlic/gochujang); Memphis/Carolina
  BBQ rub & sauce guides (smoke/sweet/vinegar/mustard/paprika).
