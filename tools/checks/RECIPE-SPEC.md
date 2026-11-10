# Batch-recipe rewrite spec (OB Meal Planner, 2026-10-05)

You are rewriting the `prepMethod` field (the batch-cooking directions) of meal-prep recipes for a fat-loss coaching
client PDF. The coach (OB) asked for directions that "explain better how to make it" with "more step by step
directions": one action per step, and the reason on any step where the reason changes the result.

Input: a JSON array of recipes (`chunkN.json`). Each has `id`, `title`, `makes` (servings the recipe is written for),
`slot`, and the foods it can use: `protein`, `carb`, `fat`, `produce` (options separated by `|`, each a regex over
the food database name, e.g. "Chicken breast cooked|Chicken thigh cooked"), and `extras` (fixed add-ins with grams).
`method` is the single-serving version and `prepMethod` is the current batch version. Read all of them for intent.

Output: ONE JSON object file, `{ "<id>": "<new prepMethod>", ... }`, for every recipe in the chunk. Use the `id`
exactly (7 recipes have no id: use the `title` as the key). Change nothing else.

Validate before you finish: `node tools/checks/validate_recipe.js <your file>`
must print `... 0 fail`. Fix every FAIL it reports and run it again. The three gold examples it passes are in
`recipe-gold.json` next to this file: match their shape, length and tone.

## Shape (the validator enforces most of this)

- 8 to 14 steps, each on its own line, numbered `1. `, `2. `, ... in order. 850 to 2,200 characters in total (most land between 1,200 and 1,800).
- Step 1 always starts `Equipment:` and lists the pans, tools and the number of containers (write it as
  `{makes} containers`, e.g. "5 containers"; the planner rewrites that number when the client cooks a different batch).
- Then prep and cooking, one action per step, in the order a person would do them (long cooks first, so the oven or
  pot is busy while you chop). Say what to do while something cooks.
- Every protein, grain, pasta, potato or legume option that is a COOKED food gets cooked in a step: the heat (pan over
  medium-high, oven at 400F, simmer), the time as a range, and the doneness cue you can see or measure. Safe internal
  temperatures, from USDA FSIS, where they apply: chicken and turkey 165F; ground beef, pork or lamb 160F; whole cuts of
  beef, pork or lamb and all fish 145F; egg dishes 160F. Grains: say the water ratio and the minutes, and "Weigh it
  cooked" where the list weighs it cooked. Canned beans, chickpeas and canned fish: "drain and rinse", no cooking.
- Then: cool (lids off until it stops steaming; into the fridge within 2 hours, within 1 hour for rice and cooked
  grains), divide between the containers (say what goes in each and what is kept separate and why), a Storage step
  (`Storage: fridge N days, freezer N months.` or `Do not freeze` with the reason; use the honest number for the dish:
  cooked meat and grains 3 to 4 days, fish 2 to 3, cut raw vegetables 2 to 3, boiled eggs 5 to 7, overnight oats and
  chia 4 to 5), and a Reheat step (how, how long, what to add after reheating) or "To eat: cold" for no-cook dishes.
- The why, in a short clause, on the steps where it changes the result: "Rest it 5 minutes so the juices settle back
  into the meat", "lids off while cooling, or the steam turns everything soggy", "salt goes on at the table because it
  pulls water out of tomatoes". Not on every step. Never a lecture.

## Naming foods (this is what breaks recipes if you get it wrong)

- When a slot has ONE option, name the food in kitchen words: "the chicken breast", "the white rice", "the olive oil".
- When a slot has SEVERAL options, use the role word and let the planner substitute the client's food:
  `your protein`, `your grain` (or `your carb`), `your fat`, `your vegetables` (or `your produce`, `your greens`),
  `your fruit`, `your beans`, `your cheese`, `your nut butter`. The planner prints "the chicken thigh" in place of
  "your protein". Later in the recipe, "the meat", "the fish", "the greens" or "it/them" are fine.
- Where the options cook differently, cover them in the same step: "(white rice takes about 18 minutes in 1 1/2 cups
  of water per cup; brown rice 40 to 45 minutes in 2 cups per cup)" or two sentences that each name the option: "If it
  is the canned salmon, drain it well and flake it, and skip the oven. If it is the trout, roast it at 400F ... then cool
  it and flake it." The planner deletes the sentence for the option the client does not have, so EVERYTHING that
  applies only to one option (its cooking, its cooling, its why) must sit inside that one sentence. Never let a
  follow-up sentence depend on a conditional one. Name the option ("the canned salmon"), never just "canned".
- Name NOTHING else that is a food. The only ingredients you may add that are not in the recipe's slots or extras are
  these free words: garlic, ginger, onion, shallot, scallion, chives, herbs, basil, cilantro, parsley, dill, mint,
  rosemary, thyme, oregano, lemon, lime, vinegar, soy sauce, tamari, broth, stock, water, milk, almond milk, oil,
  salt, pepper, spices (cumin, paprika, chili powder, turmeric, curry powder, everything bagel seasoning, Italian
  seasoning are fine), chili flakes, hot sauce, sriracha, mustard, honey, maple, vanilla, cinnamon. No other
  vegetable, fruit, nut, cheese, sauce, grain or meat may appear, even as a suggestion. No mushrooms anywhere.
- Write amounts for the seasonings and liquids you add ("1 tsp cumin", "2 tbsp vinegar", "4 cups broth") for the
  recipe's `makes` servings. Do not write amounts for the slot foods or extras: the plan lists their exact grams.

## Voice (OB's house rules, enforced)

- Plain words, short sentences, written to "you". No em dashes or en dashes (use a comma or a full stop). No "not X,
  it's Y". No filler ("game changer", "elevate", "whole game", "on purpose"). No marketing. No "free".
- No ALL-CAPS headings inside steps, no "SINGLE SERVING" block, no "BATCH METHOD" header: the numbered steps only.
- No nutrition numbers (no calories, grams of protein, macros). Temperatures as `165F` (no degree sign).
- Food safety stays conservative: the 2-hour rule, the FSIS temperatures above, "when in doubt, throw it out" is fine.
- Keep the dish the recipe describes. Do not invent a different dish, a different cuisine or a new ingredient.

## Process

1. Read the chunk file. For each recipe, read `title`, `makes`, the slots, `extras`, `method`, `prepMethod`, `season`, `note`.
2. Write the new `prepMethod`. Reuse any good, specific technique already in the old one.
3. Save the JSON. Run the validator. Fix every failure (it names the problem). Repeat until `0 fail`.
4. Report: the output path, the validator's last line, and anything you had to leave out and why.

## After 2026-10-06 (what the first run taught)

- Low-calorie pantry ingredients the dish needs are allowed: gochujang, miso, cocoa powder, instant coffee or espresso
  powder, baking powder, baking soda, tomato paste, chipotle in adobo, fish sauce, worcestershire, bay leaf, nutmeg,
  pumpkin pie spice, allspice, cloves, cardamom, coriander, sumac, garam masala, za'atar, a sprinkle of sesame seeds,
  capers, jalapeno. Never drop an ingredient the title names. Write "cornflour (or potato starch)" for a starch crust.
- Cooking oil IS counted: when a recipe cooks with oil and the client's list has no cooking fat, the planner adds 5 g of
  oil to the meal (addCookingFat). So write "a little oil" for the pan; do not swap it for cooking spray, which removes
  that counted fat and shifts the day's macros (it pushed one harness day to 122% of its protein target).
- The planner settles "If it is the canned salmon / the cooked salmon / the tahini / the onion, ..." and "If your fat is
  the olive oil, ..." for each client. Put everything that belongs to one option inside that one sentence.
- Container shares ("a quarter of the salad into each jar") and counts are rewritten for the batch the client cooks.
