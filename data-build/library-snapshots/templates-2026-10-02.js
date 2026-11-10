/* OB Meal Planner , coherent meal templates.
   Auto-generated + adversarially vetted (would-a-real-person-eat-this?) and validated against the
   USDA food inventory. Each names protein/carb/fat/produce by regex (matched vs food names with
   commas stripped); portions are solved + hill-climbed to hit macros. Cooking method + smoke-point-
   matched oil + optional seasoning included. Diets pruned to those actually buildable. */
window.OB_MEAL_TEMPLATES = [
 {
  "id": "spinach-feta-scramble-toast",
  "title": "Spinach & Feta Scramble with Whole-Grain Toast",
  "slot": "breakfast",
  "protein": "egg white",
  "carb": "whole wheat bread|Whole wheat bread",
  "fat": "olive oil",
  "produce": "spinach",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Beat your eggs (whole eggs or egg whites, whichever your plan lists) in a bowl with a small pinch of salt; set aside. 2. Set a nonstick pan over medium heat and add the olive oil. 3. Add the spinach and stir for about 1-2 minutes, just until it wilts down and turns bright green. 4. If you're using eggs: lower the heat to medium-low and pour them in. Let them sit for about 20 seconds, then gently push them around with a spatula, folding slowly. Cook 2-3 minutes until they look just set but still soft and a little glossy, pull them off the heat before they look dry. 5. Take the pan off the heat and crumble the feta over the top while everything is still warm, so it softens and stays creamy instead of melting flat. 6. Toast your bread (whole wheat or whole grain) until golden and serve it alongside.",
  "oil": "Use olive oil. You are cooking gently over medium / medium-low heat, which stays under olive oil's ~375F smoke point, so it won't smoke or turn bitter, and its mild grassy flavor fits this Greek-style dish. Butter works too, but it browns past ~350F, so keep the heat low if you use it.",
  "season": "Optional: fresh dill (the classic pairing with spinach and feta), cracked black pepper, and a little garlic. A pinch of dried oregano or mint leans it Greek; go easy on salt since feta is salty.",
  "note": "A Greek-style soft scramble with wilted spinach and creamy feta, served with toast on the side.",
  "eggBase": 2,
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
  "id": "egg-potato-pepper-breakfast-bowl",
  "title": "Egg, Potato & Pepper Breakfast Bowl",
  "slot": "breakfast",
  "protein": "egg white",
  "carb": "potato baked",
  "fat": "olive oil",
  "produce": "bell pepper red",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. Cut the cooked potato into small bite-size cubes and slice the red bell pepper into thin strips. 2. Beat your eggs (whole eggs or egg whites, whichever your plan lists) in a bowl with a pinch of salt; set aside. 3. Heat the olive oil in a nonstick pan over medium heat. Add the potato cubes in a single layer and let them sit mostly undisturbed, stirring only every couple minutes, for 6-8 minutes until golden and crisp on the edges. 4. Add the bell pepper strips for the last 3 minutes and stir now and then until they soften and brighten. 5. Push the potato and pepper to one side of the pan, lower the heat to medium-low, and pour the eggs into the empty side. Let them set for 20 seconds, then gently fold for 2-3 minutes until just set and still soft. 6. Stir everything together and tip it into a bowl.",
  "oil": "Use olive oil. Medium-heat crisping and soft eggs both stay under its ~375F smoke point, so it cooks clean without burning. If you want a harder, faster crisp over medium-high heat, swap to refined avocado oil (~520F), which handles higher heat without smoking, but don't push olive oil past medium or it turns bitter.",
  "season": "Optional: smoked paprika, garlic powder, salt and pepper, and a dash of hot sauce at the end. A little smoked paprika makes the potatoes taste like you tried way harder than you did.",
  "note": "A diner-style breakfast bowl with crisped potato, sauteed red pepper, and soft scrambled eggs.",
  "eggBase": 2,
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
  "id": "veggie-omelet-mushroom-pepper",
  "title": "Garden Veggie Omelet with Cheddar",
  "slot": "breakfast",
  "protein": "egg white",
  "carb": "whole wheat bread|Whole wheat bread",
  "fat": "butter salted|Olive oil",
  "produce": "bell pepper red",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Slice your vegetable (zucchini or red bell pepper, whichever your plan lists) thin. Beat your eggs (whole eggs or egg whites) in a bowl with a pinch of salt; set aside. 2. Melt about half the butter in a nonstick pan over medium heat. Add the vegetable and saute 3-4 minutes, stirring now and then, until softened (zucchini should release their water and turn golden; pepper should go limp and bright). Scoop the vegetable out onto a plate. 3. Lower the heat to medium-low and melt the rest of the butter to coat the pan. Pour in the eggs and tilt the pan so they spread evenly. Let them set undisturbed for 2-3 minutes, until the top is just barely wet. 4. If you're adding cheddar, scatter the shredded cheddar over one half now (if you eat dairy); add the cooked vegetable on top of the cheese. 5. Fold the empty half over the filling with your spatula, cook another 30-60 seconds to melt, then slide onto the plate. 6. Toast your bread (whole wheat or whole grain) and serve alongside.",
  "oil": "Use salted butter over medium-low heat. Butter's milk solids brown past ~350F, so gentle heat keeps it from burning while giving the omelet a rich, clean flavor and an easy fold. Don't crank the heat or it will brown and taste scorched.",
  "season": "Optional: salt, pepper, and a little chopped chive or parsley. A few drops of hot sauce on top is welcome but never required.",
  "note": "A folded butter omelet with sauteed veggies and melty cheddar (if you eat dairy), with toast on the side.",
  "eggBase": 2,
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Cheddar cheese",
    20
   ]
  ]
 },
 {
 "id": "southwest-egg-black-bean-bowl",
 "title": "Southwest Black Bean Breakfast Bowl",
 "slot": "breakfast",
 "protein": "egg whole|egg white|black beans",
 "carb": "sweet potato baked|black beans",
 "fat": "Avocado raw",
 "produce": "bell pepper red|tomato raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Cube the baked sweet potato (if it's your carb) and dice your produce, the red bell pepper and tomato. 2. Lightly coat a nonstick pan with a quick mist of spray oil and set over medium heat. Add the sweet potato and/or black beans plus the diced red pepper and warm them, stirring, for 4-5 minutes until heated through and the pepper softens. 3. If you eat eggs, soft-scramble your eggs (whole eggs or egg whites) in a separate pan over medium heat for 2-3 minutes, folding gently until just set. For a fully vegan bowl, skip the eggs and use the black beans as your protein instead. 4. Pile the warm sweet potato, beans, and pepper into a bowl, add the eggs if using, then top with sliced avocado and the fresh diced tomato.",
 "oil": "Use a quick mist of spray oil (canola or avocado based) just to keep things from sticking at medium heat, both are neutral and handle this heat fine. The real fat here is the raw avocado on top, which does the flavor work, so you don't need to spend extra grams sauteing. Keep the avocado raw and cold; never cook it.",
 "season": "Optional: cumin, smoked paprika, garlic powder, and a squeeze of salsa or hot sauce. A spoonful of salsa at the end turns this from healthy into actually-crave-it.",
 "note": "A Tex-Mex bowl of sweet potato, black beans, avocado, and tomato, with scrambled eggs if you eat them, or skip them for a fully vegan bowl.",
 "extras": [
  [
   "Salsa",
   30
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large nonstick pan, a sheet pan, a knife, and 5 containers plus 5 small tubs.\n2. Cube the sweet potato and roast at 425F for 25 minutes until the edges colour, or dice the cooked potato.\n3. Dice the red pepper. Keep the tomato raw and separate, it waters down everything it sits against.\n4. Mist the pan, add the sweet potato, black beans and pepper, and cook 6 to 8 minutes over medium until hot and a little browned.\n5. Cool uncovered 20 minutes before the lids go on.\n6. Portion the hash into containers, tomato and salsa into tubs.\n7. If eggs are your protein, soft-scramble them in a separate pan 2 to 3 minutes and pull them while still slightly wet so they do not go rubbery on reheating. Cool them and pack them on top of the hash.\n8. Storage: fridge 4 days, 3 if the container has eggs. The hash freezes 2 months; scrambled eggs do not, so scramble them fresh for a frozen portion.\n9. Reheat: microwave 2 minutes, or a hot pan for 4 if you want the edges crisp again. Add the tomato cold.",
 "makes": 5
},
 {
  "id": "pb-banana-overnight-oats",
  "title": "Peanut Butter Banana Overnight Oats",
  "slot": "breakfast",
  "protein": "Whey protein powder|Greek yogurt plain nonfat",
  "carb": "Oats dry \\(raw\\)",
  "fat": "PBfit powdered peanut butter|Peanut butter smooth|Olive oil",
  "produce": "Banana raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking. The night before, add the dry oats to a jar or container. 2. Stir in your protein (a scoop of whey protein powder, or fold in the Greek yogurt, whichever your plan lists) along with a splash of milk or almond milk. Add the liquid a little at a time and stir until it looks like a loose, soupy pudding (it will thicken overnight). 3. Put the lid on and refrigerate at least 4 hours, ideally overnight. 4. In the morning, swirl in the peanut butter and slice the banana on top. 5. Eat it cold, or microwave 60-90 seconds if you'd rather have it warm.",
  "oil": "No cooking oil needed, this is a no-cook soak, so there's no pan and no smoke point to worry about. The peanut butter is the finishing fat, stirred in at the end for richness.",
  "season": "Optional: a pinch of cinnamon and a dash of vanilla in the soak, plus a tiny pinch of salt to make the peanut butter pop. All basically zero calories, all upside.",
  "note": "Make-ahead creamy peanut butter and banana overnight oats with a protein boost, grab and go.",
  "prefFat": "PBfit powdered peanut butter"
 },
 {
  "id": "greek-yogurt-berry-parfait",
  "title": "Greek Yogurt & Berry Granola Parfait",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat|Greek yogurt plain whole",
  "carb": "Granola high-protein|Oats dry \\(raw\\)",
  "fat": "Almond butter|Olive oil",
  "produce": "Blueberries raw|Strawberries raw|Raspberries raw",
  "prefProtein": "Greek yogurt plain nonfat",
  "prefProduce": "Blueberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Mostly no-cook. For a granola-style crunch, toast the dry oats in a dry nonstick pan over medium heat for 3-5 minutes, shaking the pan often, until golden and nutty. Tip them onto a plate to cool (or skip the toasting and use them raw if you're rushed). 2. In a glass or jar, layer: a spoonful of your Greek yogurt (plain nonfat or plain whole, whichever your plan lists) on the bottom, then a layer of your berries (blueberries, strawberries, or raspberries), then a sprinkle of the oats. 3. Repeat the layers until the glass is full. 4. Finish with a swirl of almond butter on top. Add the oats just before eating so they stay crunchy.",
  "oil": "No oil. The oats are dry-toasted in a nonstick pan with no fat, and the almond butter is the finishing fat. If anything sticks while toasting, a tiny mist of spray oil is plenty.",
  "season": "Optional: a little vanilla stirred into the yogurt and a pinch of cinnamon on the oats. A small grate of lemon zest over the berries is a nice touch if you have it.",
  "note": "A layered Greek yogurt parfait with toasted-oat granola, fresh berries, and an almond butter swirl."
 },
 {
  "id": "warm-apple-cinnamon-oatmeal",
  "title": "Warm Apple-Cinnamon Oatmeal with Walnuts",
  "slot": "breakfast",
  "protein": "Whey protein powder|Greek yogurt plain nonfat",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Walnuts",
  "produce": "Apple raw with skin",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Add the dry oats to a small pot with about twice their volume of almond milk or water. 2. Bring to a gentle simmer over medium heat and cook 5-7 minutes, stirring often, until creamy and thickened. 3. Take the pot off the heat. Stir in your protein (a scoop of whey protein powder, or the Greek yogurt for a tangier bowl, whichever your plan lists) once it's off the burner, so it blends smooth instead of clumping. 4. Dice the apple (leave the skin on) and fold it in. 5. Top with the chopped walnuts and serve warm.",
  "oil": "No cooking oil needed. The oats simmer in liquid rather than frying, and the walnuts are the finishing fat sprinkled on at the end.",
  "season": "Optional: cinnamon is the star here, plus a pinch of nutmeg and a splash of vanilla. A tiny pinch of salt makes the whole bowl taste sweeter without adding sugar.",
  "note": "A cozy stovetop oatmeal with diced apple, warm cinnamon, and crunchy walnuts."
 },
 {
  "id": "cottage-cheese-berry-bowl",
  "title": "Cottage Cheese Berry Bowl with Oats & Hemp",
  "slot": "breakfast",
  "protein": "Cottage cheese 2%|Cottage cheese nonfat",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Hemp seeds",
  "produce": "Strawberries raw|Blueberries raw|Raspberries raw",
  "prefProtein": "Cottage cheese 2%",
  "prefProduce": "Strawberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking. Spoon your cottage cheese (2% or nonfat, whichever your plan lists) into a bowl. 2. Top with your berries (strawberries, blueberries, or raspberries), slicing the strawberries if you're using them. 3. Sprinkle the toasted oats over the top for crunch, or, for a nuttier bite, toast them first in a dry pan over medium heat for 3-4 minutes, shaking often, then cool. 4. Finish with a scatter of hemp seeds. Stir it all together or eat it in layers.",
  "oil": "No oil. This is a fully no-cook bowl; the hemp seeds are the finishing fat, sprinkled on at the end for a little crunch and healthy fats.",
  "season": "Optional: a dash of vanilla and a little cinnamon over the cottage cheese to smooth out the tang. A few torn mint leaves over the berries is a fresh upgrade if you have them.",
  "note": "A high-protein cottage cheese bowl with berries, oats, and hemp seeds, trendy and no-cook."
 },
 {
  "id": "cottage-cheese-berry-chia-bowl",
  "title": "Cottage Cheese & Berry Chia Bowl",
  "slot": "breakfast",
  "protein": "Cottage cheese 2%|Cottage cheese nonfat",
  "fat": "Chia seeds",
  "produce": "Blueberries raw|Strawberries raw|Raspberries raw",
  "prefProtein": "Cottage cheese 2%",
  "prefProduce": "Blueberries raw|Strawberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking. Spoon your cottage cheese (2% or nonfat, whichever your plan lists) into a bowl. 2. Top with your berries (blueberries, strawberries, or raspberries), slicing the strawberries if using. 3. Sprinkle the chia seeds evenly over the top, and add a thin thread of honey if you like a touch of sweetness. 4. Eat right away for a softer chia, or stir everything together and chill 10-15 minutes so the chia plumps up and thickens the bowl.",
  "oil": "No cooking oil. The chia seeds are the finishing fat, and they also thicken the bowl into a light pudding when given a few minutes to sit.",
  "season": "Optional: a drizzle of honey, a pinch of cinnamon, or a splash of vanilla. A little lemon zest makes the berries pop, but the bowl is plenty good plain.",
  "note": "A 5-minute no-cook protein bowl: creamy cottage cheese, fresh berries, and chia for body and crunch."
 },
 {
  "id": "pb-banana-protein-smoothie",
  "title": "Peanut Butter Banana Protein Smoothie",
  "slot": "breakfast",
  "protein": "Whey protein powder",
  "carb": "Oats dry \\(raw\\)",
  "fat": "PBfit powdered peanut butter|Peanut butter smooth|Olive oil",
  "produce": "Banana raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking, just blend. Pour the milk or almond milk into the blender first (liquid on the bottom helps everything blend smoothly). 2. Add the banana, a scoop of whey protein powder, the peanut butter, and a small scoop of dry oats. 3. Blend 30-45 seconds until completely smooth. 4. Drop in a few ice cubes and blend again for a thicker, frostier shake. Pour and drink right away.",
  "oil": "No cooking oil. The peanut butter is the finishing fat, blended straight in for richness and staying power.",
  "season": "Optional: a pinch of cinnamon, or a teaspoon of cocoa powder for a chocolate-PB spin. Using a frozen banana gives you milkshake texture with no ice needed.",
  "note": "A blend-and-go shake with whey, banana, peanut butter, and oats for a creamy, filling breakfast.",
  "prefFat": "PBfit powdered peanut butter"
 },
 {
  "id": "pb-banana-protein-overnight-oats",
  "title": "Peanut Butter Banana Protein Overnight Oats",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat|Cottage cheese 2%|Whey protein powder",
  "carb": "Oats dry \\(raw\\)",
  "fat": "PBfit powdered peanut butter|Peanut butter smooth|Olive oil",
  "produce": "Banana raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking. In a jar, stir together the dry oats, a scoop of whey protein powder, the milk, and the peanut butter. Add the milk a splash at a time and stir well so the protein powder mixes in fully without clumping, the mix should look like a loose pudding. 2. Slice the banana on top. 3. Put the lid on and chill overnight, or at least 4 hours. 4. In the morning, give it a stir and eat it cold.",
  "oil": "No cooking oil. The peanut butter is the finishing fat, stirred into the base for creaminess and slow-digesting fats.",
  "season": "Optional: a pinch of cinnamon, a few chia seeds for extra body, or a thin thread of maple syrup. Make two jars at once so tomorrow-you is already sorted.",
  "note": "Stir-and-chill overnight oats with oats, whey, milk, peanut butter, and banana, ready when you wake up.",
  "prefFat": "PBfit powdered peanut butter"
 },
 {
  "id": "berry-cheesecake-protein-smoothie",
  "title": "Berry Cheesecake Protein Smoothie",
  "slot": "breakfast",
  "protein": "Whey protein powder|Greek yogurt plain nonfat",
  "fat": "Almond butter|Olive oil",
  "produce": "Strawberries raw|Blueberries raw|Raspberries raw",
  "prefFat": "Almonds",
  "prefProduce": "Strawberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking, just blend. Pour the almond milk into the blender first. 2. Add your protein (Greek yogurt and/or a scoop of whey protein powder, whichever your plan lists), then the berries (strawberries, blueberries, or raspberries), and a small handful of your nuts (almonds or cashews, whichever your plan lists). 3. Blend 45-60 seconds until completely smooth, give it the extra seconds so the nuts break down fully and don't leave grit. 4. Add a few ice cubes and blend again for a thicker pour. Drink right away.",
  "oil": "No cooking oil. The nuts (almonds or cashews) are the finishing fat, blended in for richness and a faint nutty, cheesecake-like body alongside the yogurt.",
  "season": "Optional: a splash of vanilla and a pinch of lemon zest to sell the cheesecake vibe. Frozen berries make it thicker and frostier if you skip the ice.",
  "note": "A creamy blended shake of whey, Greek yogurt, and berries that tastes like strawberry cheesecake."
 },
 {
  "id": "mediterranean-chicken-couscous-bowl",
  "title": "Mediterranean Chicken & Couscous Bowl",
  "slot": "lunch",
  "protein": "chicken breast cooked|Chicken leg quarters roasted",
  "carb": "couscous cooked",
  "fat": "olive oil|feta cheese",
  "produce": "cucumber raw|tomato raw|onion raw",
  "prefFat": "olive oil",
  "prefProduce": "cucumber raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Pat the chicken breast dry and season it with salt and pepper. 2. Set a skillet over medium heat with a little of the olive oil. Cook the chicken about 7-8 minutes per side, until golden outside and cooked through to 165F in the thickest part (no pink in the middle). Move it to a board, rest 5 minutes, then slice. 3. Meanwhile, fluff the cooked couscous with a fork so it's light and not clumped. 4. Dice your produce, the cucumber and tomato, and finely chop a little of the raw onion. 5. Build the bowl: couscous on the bottom, sliced chicken on top, then the cucumber, tomato, and onion around it. 6. If your fat is feta cheese, crumble it over the top now (if you eat dairy). Finish with a drizzle of olive oil and a squeeze of fresh lemon.",
  "oil": "Use olive oil. You're cooking the chicken over honest medium heat, which stays under its ~375F smoke point, and the same oil doubles as the raw finishing drizzle that carries the grassy Mediterranean flavor. Keep the pan at medium, not screaming hot, if you want a harder sear, cook in refined avocado or canola oil and still finish with the olive oil raw.",
  "season": "Optional: oregano, garlic powder, salt and pepper, and a squeeze of fresh lemon at the end. A pinch of dried mint is very Greek if you're feeling fancy, but the bowl is happy without it.",
  "note": "A Greek-style bowl of seared chicken over fluffy couscous with cucumber, tomato, onion, and an olive oil drizzle.",
  "extras": [
   [
    "Feta cheese",
    20
   ],
   [
    "Olives ripe",
    15
   ]
  ]
 },
 {
  "id": "chicken-teriyaki-rice-bowl",
  "title": "Chicken Teriyaki Rice Bowl",
  "slot": "lunch",
  "protein": "chicken breast cooked|chicken thigh cooked|Chicken leg quarters roasted",
  "carb": "white rice cooked|brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "canola oil|avocado oil",
  "produce": "broccoli cooked",
  "prefProtein": "chicken breast cooked",
  "prefFat": "canola oil",
  "diets": [
   "omnivore"
  ],
  "method": "1. Pat your protein (chicken breast or chicken thigh, whichever your plan lists) dry and cut it into bite-size pieces. Season lightly with salt and pepper. 2. Heat a wok or large skillet over high heat until very hot, add the oil, and swirl to coat. 3. Add the chicken in a single layer and let it sit undisturbed 2 minutes to brown, then stir and cook 3-4 more minutes until the pieces are golden on the outside and no longer pink in the center (cut one open to check; juices should run clear). 4. Push the chicken to one side of the pan. Add the broccoli florets with a splash of water, cover or stir quickly, and steam-saute 3-4 minutes until bright green and crisp-tender (a fork should just pierce a stem). 5. Pour tamari (gluten-free soy sauce) over everything, add a teaspoon of honey if you want it sweet like gluten-free teriyaki, and toss 1 minute until it bubbles and glazes the chicken in a glossy coat. 6. Spoon over your hot grain (white rice or brown rice, whichever your plan lists) and serve.",
  "oil": "Canola oil. Its high smoke point (~400F) and neutral taste handle a ripping-hot wok without burning or fighting the soy-honey glaze. If your pan runs very hot, avocado oil (~520F) gives even more headroom for a hard sear. Skip butter or EVOO here, they smoke and turn bitter at this heat.",
  "season": "Salt and pepper on the chicken. Optional aromatics: a little fresh ginger and garlic added with the chicken, a teaspoon of honey for that gluten-free teriyaki gloss, and a few drops of sriracha for heat. Finish with sesame seeds and sliced green onion on top.",
  "note": "Takeout-style gluten-free teriyaki: glazed chicken and crisp-tender broccoli over rice with a soy-honey finish.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Teriyaki sauce sugar-free",
    8
   ]
  ]
 },
 {
 "id": "crispy-tofu-quinoa-power-bowl",
 "title": "Crispy Tofu & Quinoa Power Bowl",
 "slot": "lunch",
 "protein": "tofu firm|TVP",
 "carb": "quinoa cooked",
 "fat": "avocado oil|olive oil",
 "produce": "broccoli cooked|broccoli raw|bell pepper red raw",
 "prefFat": "avocado oil",
 "prefProduce": "broccoli",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Drain the tofu (firm) and press it 10-15 minutes between paper towels under a heavy pan or plate to squeeze out water, this is what makes it crisp instead of soggy. 2. Cube the pressed tofu, toss with a little oil and (optionally) a spoon of cornstarch for extra crunch, and spread on a parchment-lined sheet pan. 3. Roast at 425F for 25-30 minutes, flipping once halfway, until the cubes are golden and crisp on the edges. 4. Prepare your vegetable (broccoli or red bell pepper, whichever your plan lists): if it is the cooked broccoli, roast florets on the same pan for the last 20 minutes; if it is raw broccoli or raw red bell pepper, simply chop it and add it fresh to the bowl. 5. Build the bowl over cooked quinoa, pile on the crispy tofu and your vegetable, and finish with a drizzle of sriracha mixed with a splash of tamari (gluten-free soy sauce).",
 "oil": "Avocado oil for the 425F roast. Its very high smoke point (~520F) is exactly right for high-heat roasting that crisps the tofu without the oil breaking down or turning bitter. Olive oil can sub but keep the oven at or under 400F if you use it, since EVOO smokes around 375F.",
 "season": "Garlic powder, smoked paprika, and a pinch of salt on the tofu before roasting. Add as much sriracha as you like in the drizzle. A squeeze of lime at the end brightens the whole bowl.",
 "note": "A fully plant-based bowl: oven-crisped tofu over quinoa with roasted or fresh veg and a soy-sriracha drizzle.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 1, "prepMethod": "1. Equipment: a sheet pan, parchment, a saucepan, paper towels, and 5 containers plus 5 small tubs.\n2. Press the tofu 15 minutes under something heavy, then cube it.\n3. Toss the cubes with a little oil and a spoon of cornstarch. The starch is what gives you a shell that survives the fridge.\n4. Roast at 425F for 25 to 30 minutes, flipping once, until deep golden. Roasting beats pan-searing for a batch, it dries the surface more evenly.\n5. Cook the quinoa and spread it on a tray to cool.\n6. Portion quinoa first, tofu on top. Dressing goes in tubs.\n7. Storage: fridge 4 days.\n8. Reheat: hot oven or air fryer at 400F for 5 minutes to bring back the crust, then dress.",
 "makes": 5
},
 {
  "id": "korean-beef-pepper-rice-bowl",
  "title": "Korean Beef & Pepper Rice Bowl",
  "slot": "lunch",
  "protein": "beef ground 93/7|beef ground 93/7",
  "carb": "white rice cooked|brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "canola oil|avocado oil",
  "produce": "bell pepper red raw|onion raw",
  "prefProtein": "beef ground 93/7",
  "prefFat": "canola oil",
  "prefProduce": "bell pepper red raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Heat a skillet over high heat with a thin film of oil until shimmering. 2. Add your protein (lean ground beef 93/7 or 93/7, whichever your plan lists) and cook about 5 minutes, breaking it into small crumbles, until browned with no pink left. 3. Add your vegetable (sliced red bell pepper and a little raw onion, whichever your plan lists) and cook 2-3 minutes until just softened but still with a little bite. 4. Stir in tamari (gluten-free soy sauce), a teaspoon of honey, and sriracha to taste, then simmer 2 minutes until the liquid thickens and glazes the beef. 5. Spoon the beef and vegetables over your hot grain (white rice or brown rice, whichever your plan lists) and serve.",
  "oil": "Canola oil for the high-heat brown. Lean beef renders little fat of its own, so a thin film of a neutral high-smoke-point oil (~400F) gives crisp browned edges without smoking. Avocado oil (~520F) is an even higher-heat option if your pan runs hot.",
  "season": "Optional aromatics: garlic and fresh ginger with the beef, a little honey for the Korean sweet-savory balance, and sriracha or gluten-free gochujang for heat. Finish with sesame seeds and sliced green onion. Go easy on the tamari (gluten-free soy sauce), it concentrates as it reduces.",
  "note": "A Korean-style bowl: lean ground beef and pepper in a sweet-savory soy-sriracha glaze over rice.",
  "extras": [
   [
    "Gochujang",
    15
   ],
   [
    "Kimchi",
    30
   ]
  ]
 },
 {
  "id": "chicken-quinoa-power-salad",
  "title": "Grilled Chicken & Quinoa Power Salad",
  "slot": "lunch",
  "protein": "chicken breast cooked|Chicken leg quarters roasted",
  "carb": "quinoa cooked",
  "fat": "olive oil",
  "produce": "romaine lettuce|spinach raw|tomato raw|cucumber raw|bell pepper red raw",
  "prefProduce": "romaine lettuce",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cook the quinoa per package (about 15 minutes), then spread it out to cool. 2. Pat the chicken (breast) dry and season with salt, pepper, garlic powder, and oregano. 3. Heat a pan over medium-high, add a little cooking oil, and sear the chicken 4-5 minutes per side until golden and cooked through (165F inside, or juices run clear). Rest 5 minutes, then slice. 4. Chop your produce (romaine, spinach, tomato, cucumber, or red bell pepper, whichever your plan lists) and put it in a large bowl as the base. 5. Add the cooled quinoa and sliced chicken on top. 6. Whisk extra-virgin olive oil with fresh lemon juice, salt, and pepper, pour over the salad just before eating, and toss.",
  "oil": "Extra-virgin olive oil, used raw as the dressing, smoke point does not matter here, so you get its best fruity, peppery flavor. For the chicken itself, sear in a neutral high-heat oil like avocado oil so the medium-high pan does not scorch the EVOO; save the EVOO for the drizzle.",
  "season": "Garlic powder, oregano, salt, and pepper on the chicken. A big squeeze of lemon over the whole bowl. A little Dijon-style mustard whisked into the dressing rounds it out.",
  "note": "A filling protein-and-grain salad: seared chicken and fluffy quinoa over fresh greens with a lemon-olive oil dressing.",
  "extras": [
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
  "id": "tuna-chickpea-mediterranean-salad",
  "title": "Mediterranean Tuna & Chickpea Salad",
  "slot": "lunch",
  "protein": "Tuna light canned in water|Mackerel jack canned",
  "carb": "Chickpeas",
  "fat": "olive oil",
  "produce": "tomato raw|cucumber raw|onion raw|romaine lettuce",
  "prefProduce": "tomato raw",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. No cooking required. Drain the tuna (light canned in water) and drain and rinse the chickpeas. 2. Chop your produce (tomato, cucumber, onion, or romaine, whichever your plan lists). If it is the raw onion, slice it thin and soak it in cold water for 5 minutes first to mellow its sharp bite, then drain. 3. In a large bowl, combine the tuna, chickpeas, and your produce. 4. Drizzle with extra-virgin olive oil and fresh lemon juice (or a splash of red wine vinegar), season with salt and pepper, and toss gently. 5. Serve right away, or chill 10 minutes to let the flavors blend.",
  "oil": "Extra-virgin olive oil, used raw as the dressing. No heat is involved, so its lower smoke point does not matter and its peppery flavor shines. Red wine vinegar or lemon juice balances it.",
  "season": "Oregano, salt, and pepper, plus a squeeze of lemon. A pinch of red pepper flakes if you like a little heat. Soaking the raw onion (if your plan lists it) keeps its flavor bright, not harsh.",
  "note": "A no-cook, protein-packed Mediterranean salad: canned tuna and chickpeas with fresh veg and a lemon-olive oil dressing.",
  "extras": [
   [
    "Feta cheese",
    20
   ],
   [
    "Olives ripe",
    15
   ]
  ]
 },
 {
  "id": "salmon-quinoa-spinach-salad",
  "title": "Lemon-Dill Salmon & Quinoa Spinach Salad",
  "slot": "lunch",
  "protein": "Salmon Atlantic farmed|Salmon Atlantic wild|Salmon sockeye|Mackerel jack canned|Salmon pink canned",
  "carb": "quinoa cooked",
  "fat": "olive oil",
  "produce": "spinach raw|tomato raw|cucumber raw",
  "prefProtein": "Salmon Atlantic farmed",
  "prefProduce": "spinach raw",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Cook the quinoa per package (about 15 minutes) and let it cool slightly. 2. Pat your protein (Atlantic farmed, Atlantic wild, or sockeye salmon, whichever your plan lists) dry and season with salt, pepper, and dill. 3. Heat a pan over medium, add a little cooking oil, and lay the salmon skin-side down. Sear 4-5 minutes without moving it, then flip and cook 2-3 minutes more until it flakes easily with a fork. 4. Chop your produce (spinach, tomato, or cucumber, whichever your plan lists) and arrange it in a bowl as the base. 5. Add the warm quinoa, then flake the salmon over the top. 6. Drizzle with extra-virgin olive oil and fresh lemon juice and serve.",
  "oil": "Olive oil at medium heat to pan-sear the salmon, keep the pan under EVOO's ~375F smoke point so it does not burn, plus a raw drizzle to finish. For crispier skin and a harder sear, swap in avocado oil (~520F) for cooking and keep the EVOO as the finishing drizzle.",
  "season": "Fresh or dried dill, salt, and pepper, with a generous squeeze of lemon. A dollop of plain Greek yogurt stirred with lemon and dill makes a creamy drizzle if you want one.",
  "note": "A nourishing salad of seared salmon and quinoa over fresh greens with a bright lemon-dill olive oil dressing.",
  "extras": [
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
  "id": "steak-barley-spinach-salad",
  "title": "Seared Sirloin & Barley Spinach Salad",
  "slot": "lunch",
  "protein": "Beef sirloin lean grilled",
  "carb": "Barley cooked",
  "fat": "Avocado oil",
  "produce": "spinach raw|tomato raw|onion raw",
  "prefProduce": "spinach raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cook the barley per package (40-45 minutes) ahead of time and let it cool. 2. Pat the sirloin (lean) dry and season well with salt, coarse pepper, and a little garlic powder. 3. Heat a pan over high until very hot, add the oil, and sear the steak hard 3-4 minutes per side for a medium-rare center. 4. Rest the steak 5 minutes (this keeps it juicy), then slice it thin against the grain. 5. If your produce includes the cooked zucchini, saute them in the same pan 3-4 minutes until browned; chop the other produce (spinach, tomato, or onion, whichever your plan lists) raw. 6. Pile the produce, cooled barley, and sliced steak in a bowl. 7. Whisk extra-virgin olive oil with lemon juice or a splash of balsamic, season, and dress.",
  "oil": "Sear the steak in avocado oil for its very high smoke point (~520F), which builds a hard crust without smoking out the kitchen. EVOO (~375F) would scorch and turn bitter at sear heat, so keep it off the pan and instead whisk a little raw EVOO into the lemon dressing for finishing flavor only.",
  "season": "Salt, coarse pepper, and a little garlic powder on the steak; a touch of Dijon-style mustard in the dressing. Resting the steak before slicing keeps it juicy.",
  "note": "A hearty steakhouse-style salad: seared sirloin and chewy barley over greens with a lemon-olive oil dressing.",
  "extras": [
   [
    "Goat cheese soft",
    20
   ]
  ]
 },
 {
  "id": "turkey-avocado-club-wrap",
  "title": "Turkey & Avocado Club Wrap",
  "slot": "lunch",
  "protein": "turkey breast",
  "carb": "flour tortilla|Mission Carb Balance",
  "fat": "Avocado raw",
  "produce": "romaine lettuce|tomato raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Warm your wrap (flour tortilla or Mission Carb Balance, whichever your plan lists) for 15-20 seconds in a dry skillet or microwave so it folds without cracking. 2. If your turkey breast is pre-cooked deli-style, skip ahead; if it is raw, pan-sear thin slices 3-4 minutes per side over medium until cooked through (165F inside). 3. Slice the avocado. 4. Lay the turkey down the center of the wrap, then add the avocado and your produce (romaine and tomato). 5. Fold in the sides, roll the wrap up tight, and slice in half on the diagonal.",
  "oil": "None for the build, the avocado is the fat here, so no added oil is needed. If you pan-cook raw turkey, a quick spritz of avocado-oil spray handles medium-high heat while keeping added calories near zero.",
  "season": "Salt, pepper, and a little garlic powder on the turkey; a squeeze of lemon or lime on the avocado so it stays green and bright. A few dashes of hot sauce if you like a kick.",
  "note": "Classic deli-style turkey club rolled into a wrap: lean turkey, creamy avocado, crisp lettuce and tomato.",
  "extras": [
   [
    "Mayonnaise light",
    12
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ],
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "chicken-hummus-veggie-sandwich",
  "title": "Chicken & Hummus Veggie Sandwich",
  "slot": "lunch",
  "protein": "chicken breast|Chicken leg quarters roasted",
  "carb": "whole wheat bread",
  "fat": "hummus",
  "produce": "cucumber raw|bell pepper red raw|spinach raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Build cold, no cooking needed for assembly. Toast the whole wheat bread if you like it firm. 2. If your chicken breast is pre-cooked, slice it; if it is raw, pan-sear it 5-6 minutes per side over medium until cooked through (165F inside), rest 5 minutes, then slice. 3. Spread hummus generously on both slices of bread, it is both the spread and the fat. 4. Layer on the sliced chicken and your produce (cucumber, red bell pepper, and spinach). 5. Close the sandwich, press gently, and cut in half.",
  "oil": "None for the sandwich build, hummus is the spread and the fat. If you cook raw chicken, use olive oil over medium heat (its ~375F smoke point suits a gentle sear) or an avocado-oil spray to keep it lean.",
  "season": "Cracked pepper, a pinch of smoked paprika or za'atar on the hummus, and a squeeze of lemon. Salt to taste, the hummus already brings plenty of flavor.",
  "note": "A bright Mediterranean-leaning sandwich: lean chicken over creamy hummus with crunchy cucumber, pepper, and spinach.",
  "extras": [
   [
    "Provolone cheese",
    20
   ],
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "beef-street-tacos",
  "title": "Ground Beef Street Tacos",
  "slot": "lunch",
  "protein": "beef ground 93/7",
  "carb": "corn tortilla|Mission Carb Balance",
  "fat": "cheddar cheese",
  "produce": "onion raw|tomato raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Heat a skillet over medium-high. Add the ground beef (93/7) and cook 6-8 minutes, breaking it into small crumbles, until no pink remains. Tip off any excess fat. 2. Warm your tortillas (corn tortilla or Mission Carb Balance, whichever your plan lists) 20-30 seconds per side directly over a gas burner or in a dry pan until pliable and lightly charred at the edges. 3. Chop your produce (onion and tomato). 4. Fill each tortilla with the beef, then the onion and tomato, and finish with a little shredded cheddar cheese (if you eat dairy). 5. Serve with lime wedges.",
  "oil": "No added oil. 93/7 beef renders enough of its own fat to brown in a dry pan, and the cheddar (if you eat dairy) adds the finishing fat. If your pan sticks, a quick mist of avocado-oil spray handles the high heat without adding real calories.",
  "season": "Cumin, chili powder, garlic powder, and salt stirred into the beef, with a squeeze of lime at the end. A spoon of salsa or a few drops of hot sauce takes these to taco-truck level.",
  "note": "Simple taqueria-style tacos: seasoned ground beef on warm tortillas with onion, tomato, and a little cheese.",
  "extras": [
   [
    "Salsa",
    30
   ]
  ]
 },
 {
 "id": "black-bean-avocado-tacos",
 "title": "Black Bean & Avocado Tacos",
 "slot": "lunch",
 "protein": "black beans",
 "carb": "corn tortilla|Mission Carb Balance",
 "fat": "Avocado raw",
 "produce": "bell pepper red raw|onion raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Warm the black beans in a small pan over medium 3-4 minutes, mashing them lightly with a fork so they hold together in the taco (add a splash of water if they look dry). 2. Char your tortillas (corn tortilla or Mission Carb Balance, whichever your plan lists) 20-30 seconds per side over a gas burner or in a dry skillet until pliable and lightly blistered. 3. Slice the avocado and chop your produce (red bell pepper and onion). 4. Fill each tortilla with the warm beans, then the avocado, bell pepper, and onion. 5. Spoon salsa over the top and serve.",
 "oil": "No added oil, avocado is the fat, and the beans warm in a dry or lightly water-loosened pan. A mist of avocado-oil spray is fine on the tortillas if you want extra char without spending fat grams.",
 "season": "Cumin, smoked paprika, and a pinch of salt in the beans, with lime juice over everything. Cilantro and hot sauce if you have them.",
 "note": "Hearty plant-based tacos: mashed black beans and creamy avocado on charred tortillas with pepper, onion, and salsa.",
 "extras": [
  [
   "Salsa",
   30
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a small pan, a fork, 5 containers plus a bag for the tortillas.\n2. Warm the black beans over medium 3 to 4 minutes, mashing about half so they hold on a tortilla. Add a splash of water if they tighten.\n3. Season them properly while hot: cumin, salt, lime.\n4. Do not assemble. Tacos built in advance are soggy by morning.\n5. Portion the bean filling into containers. Anything raw your plan lists goes in its own tub.\n6. Storage: fridge 4 days for the beans, 3 for the cut vegetables. Tortillas stay in the pantry.\n7. Reheat: microwave the beans 90 seconds. Char the tortillas in a dry pan 20 seconds a side and build. Avocado sliced fresh.",
 "makes": 5
},
 {
  "id": "chicken-burrito-bowl",
  "title": "Chipotle-Style Chicken Burrito Bowl",
  "slot": "lunch",
  "protein": "chicken breast cooked|chicken thigh cooked|Chicken leg quarters roasted",
  "carb": "brown rice cooked|white rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "bell pepper red raw|tomato raw",
  "prefProtein": "chicken breast cooked",
  "prefProduce": "bell pepper red raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Pat your protein (chicken breast or chicken thigh, whichever your plan lists) dry, cut into strips, and season with cumin, chili powder, smoked paprika, garlic powder, salt, and pepper. 2. Heat a pan over high until very hot and add the oil. Sear the chicken strips 4-5 minutes per side until charred at the edges and cooked through (165F inside). 3. Add your produce (sliced red bell pepper and tomato, whichever your plan lists) for the last 3 minutes so the pepper blisters and the tomato softens. 4. Warm your grain (brown rice or white rice, whichever your plan lists) and spoon it into a bowl. 5. Top with the chicken and produce, then finish with salsa and sliced avocado.",
  "oil": "Avocado oil. You want a hard, high-heat sear to get that charred fajita edge, so use avocado oil (~520F smoke point), which shrugs off the heat instead of smoking and turning bitter. EVOO or butter would scorch at this temperature.",
  "season": "Cumin, chili powder, smoked paprika, garlic powder, salt, and pepper on the chicken. A squeeze of lime and torn cilantro at the end make it taste like the takeout version.",
  "note": "Classic copycat burrito bowl: seared chicken and peppers over rice with salsa and avocado.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
  "id": "beef-black-bean-fajita-bowl",
  "title": "Beef & Black Bean Fajita Bowl",
  "slot": "lunch",
  "protein": "beef ground 93/7|beef ground 93/7|beef sirloin lean grilled",
  "carb": "black beans",
  "fat": "Avocado raw",
  "produce": "bell pepper red raw|onion raw",
  "prefProtein": "beef ground 93/7",
  "prefProduce": "bell pepper red raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Heat a pan over high until very hot and add the oil. 2. Add your protein (ground beef 93/7, ground beef 93/7, or lean grilled sirloin, whichever your plan lists). For ground beef, cook 6-7 minutes, breaking it up, until browned; for sirloin, sear 3-4 minutes per side, then rest 5 minutes and slice thin against the grain. 3. Push the protein aside and char your produce (sliced red bell pepper and onion) in the same pan 3-4 minutes until blistered but still a little crisp. 4. Warm the black beans in a small pot or the microwave and spoon them into a bowl as the base. 5. Pile on the beef and peppers, then finish with salsa and sliced avocado.",
  "oil": "Canola oil. Browning beef and charring peppers is high-heat work, and canola (~400F) is neutral and handles the heat without overpowering the beefy, smoky flavor. Lean beef renders little fat, so a teaspoon of oil keeps it from sticking; avocado oil works for even more heat headroom.",
  "season": "Cumin, chili powder, oregano, garlic powder, salt, and pepper on the beef and peppers. A dash of hot sauce and a lime wedge at the table finish it.",
  "note": "A fajita bowl over black beans with seared beef, charred peppers and onion, salsa, and avocado.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
 "id": "sweet-potato-black-bean-vegan-bowl",
 "title": "Sweet Potato & Black Bean Burrito Bowl",
 "slot": "lunch",
 "protein": "black beans",
 "carb": "sweet potato baked|brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado raw",
 "produce": "bell pepper red raw|sweet corn cooked",
 "prefProduce": "bell pepper red raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Cook your rice (brown rice) ahead of time, or warm leftover rice with a splash of water so it's hot and fluffy. 2. Open and drain the black beans. Put them in a small pot with a couple tablespoons of water and warm over medium-low heat for about 5 minutes, stirring now and then, until heated through. Mash a few against the side of the pot if you like a creamier texture. 3. Prep your vegetable (red bell pepper or sweet corn, whichever your plan lists). If it's bell pepper, slice it into thin strips; toss with a little oil and a pinch of salt and roast on a sheet pan at 425F for 18-22 minutes, flipping halfway, until the edges char and soften. If it's already-cooked sweet corn, just warm it in a small pan or the microwave for a minute or two. 4. Cut the avocado in half, remove the pit, scoop out the flesh, and slice it. 5. Build the bowl: rice on the bottom, then the warm black beans, then your vegetable. Top with sliced avocado and a spoonful of salsa.",
 "oil": "Use avocado oil if you're roasting the bell pepper. High-heat roasting at 425F caramelizes the pepper, and refined avocado oil (smoke point ~520F) easily handles that oven heat, while extra-virgin olive oil (~375F) would smoke and turn bitter. The avocado in the bowl is the raw, creamy fat topping, it is not cooked.",
 "season": "Optional: chili powder, cumin, smoked paprika, garlic powder, and salt on the pepper before roasting. Finish the bowl with a squeeze of fresh lime and a little chopped cilantro to brighten everything up.",
 "note": "Hearty plant-based bowl: warm black beans and your roasted vegetable over rice, topped with salsa and creamy avocado.",
 "extras": [
  [
   "Salsa",
   30
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a sheet pan, a small pot, a saucepan, and 5 containers plus 5 small tubs.\n2. Cube the sweet potato and roast at 425F for 25 minutes.\n3. Cook the rice and spread it on a tray to cool.\n4. Warm the black beans with cumin and salt 5 minutes, mashing a few against the side of the pot so they thicken.\n5. Keep every raw component out of the container: your raw vegetables and the salsa go in tubs.\n6. Portion: rice, sweet potato and beans layered in the container.\n7. Storage: fridge 4 days for the container, 3 for the cut raw vegetables.\n8. Reheat: microwave 2 minutes, then top with the cold vegetables and salsa. Avocado sliced fresh.",
 "makes": 5
},
 {
  "id": "tofu-fajita-bowl",
  "title": "Crispy Tofu Fajita Bowl",
  "slot": "lunch",
  "protein": "tofu firm|TVP",
  "carb": "white rice cooked|brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "bell pepper red raw|onion raw",
  "prefProduce": "bell pepper red raw",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Cook or reheat your rice (white or brown rice, whichever your plan lists) so it's hot and ready. 2. Press the firm tofu: wrap the block in a clean towel or paper towels, set something heavy on top, and let it drain for about 10 minutes. This squeezes out water so the tofu can crisp instead of steam. 3. Cut the pressed tofu into bite-sized cubes and toss with a pinch of salt. 4. Heat oil in a large pan over medium-high until it shimmers. Add the tofu in a single layer and sear for 8-10 minutes total, turning the cubes so every side turns golden and crisp. Don't crowd the pan. 5. Slice your vegetable (red bell pepper or onion, whichever your plan lists) into thin strips. Add it to the pan for the last 4 minutes and let it char a little while it softens. 6. Cut the avocado in half, remove the pit, scoop out the flesh, and slice it. 7. Build: rice on the bottom, crispy tofu and the charred vegetable on top, then a spoonful of salsa and the sliced avocado.",
  "oil": "Use avocado oil. Getting tofu genuinely crispy needs steady high heat, and refined avocado oil (smoke point ~520F) crisps the outside without smoking; olive oil would scorch before the tofu browns. The avocado on top is the raw, creamy fat, not cooked.",
  "season": "Optional: toss the tofu cubes with chili powder, cumin, smoked paprika, garlic powder, and a pinch of salt before searing. A squeeze of fresh lime at the end ties it all together.",
  "note": "Vegan fajita bowl: pan-crisped tofu with your charred vegetable over rice, finished with salsa and creamy avocado.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "steakhouse-sirloin-potato-asparagus",
  "title": "Steakhouse Sirloin, Baked Potato & Asparagus",
  "slot": "dinner",
  "protein": "Beef sirloin lean grilled",
  "carb": "Potato baked flesh",
  "fat": "Butter salted|Avocado oil",
  "produce": "Asparagus cooked",
  "prefCarb": "Potato baked flesh",
  "prefFat": "Butter salted",
  "prefProduce": "Asparagus cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Pierce the potato a few times with a fork and bake it at 400F for about 50 minutes, until a knife slides into the center easily. 2. While the potato bakes, take the sirloin out of the fridge and pat it completely dry with paper towels (dry meat browns far better). Season both sides. 3. Snap the woody ends off the asparagus, toss the spears with a little oil and salt, and roast on a sheet pan at 425F for 12-15 minutes until tender with browned tips. 4. Get a cast-iron or other heavy pan very hot over high heat, then add avocado oil. Lay the steak in and sear without moving it for 3-4 minutes per side for medium (it should have a deep brown crust). 5. Move the steak to a plate and let it rest 5 minutes so the juices settle, then slice against the grain. 6. To serve, split the baked potato open and add a small pat of butter, and lay a pat of butter on the hot steak to melt.",
  "oil": "Sear in avocado oil (smoke point ~520F) so the pan can run screaming hot without the oil burning or turning bitter. Finish with a small pat of salted butter (~350F, browns fast) added off the heat for that steakhouse richness, it's a finish, not a cooking fat.",
  "season": "Optional: salt, coarse black pepper, and garlic powder on the steak. A pinch of flaky salt and a squeeze of lemon on the asparagus never hurt anybody.",
  "note": "The classic steakhouse plate: a seared sirloin, a fluffy baked potato with butter, and roasted asparagus.",
  "extras": [
   [
    "BBQ sauce",
    17
   ]
  ],
  "simple": true
 },
 {
  "id": "roasted-chicken-thigh-rice-broccoli",
  "title": "Roasted Chicken Thigh, Rice & Broccoli",
  "slot": "dinner",
  "protein": "Chicken thigh cooked|Chicken leg quarters roasted",
  "carb": "Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Olive oil",
  "produce": "Broccoli cooked",
  "prefProtein": "Chicken thigh cooked",
  "prefFat": "Avocado oil",
  "prefProduce": "Broccoli cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cook or reheat your brown rice so it's hot and fluffy when everything else is done. 2. Pat the chicken thighs dry with paper towels, then toss them with a little avocado oil and your seasoning. 3. Set them skin-side up on a sheet pan and roast at 425F for 25-30 minutes, until the skin is crisp, the meat reaches 165F on a thermometer, and the juices run clear. 4. Cut the broccoli into bite-sized florets, toss with a little oil and salt, and spread on the same pan (or a second one). Roast at 425F for about 18 minutes, until the edges char and the stems are tender-crisp. 5. Serve the thighs over the warm brown rice with the broccoli alongside, and spoon any pan juices over the top.",
  "oil": "Roast in avocado oil (smoke point ~520F) so it won't smoke or go bitter at 425F. A finishing drizzle of olive oil (a medium-heat oil, fine used raw) over the rice or broccoli is optional for extra flavor.",
  "season": "Optional: garlic powder, smoked paprika, fresh or dried thyme, salt, and black pepper on the thighs, with a squeeze of lemon at the end. Chili flakes on the broccoli for heat.",
  "note": "Juicy roasted chicken thighs over brown rice with charred broccoli.",
  "extras": [
   [
    "BBQ sauce",
    17
   ]
  ],
  "simple": true
 },
 {
  "id": "seared-pork-chop-sweet-potato-green-beans",
  "title": "Seared Pork Chop, Sweet Potato & Green Beans",
  "slot": "dinner",
  "protein": "Pork chop lean",
  "carb": "Sweet potato baked",
  "fat": "Olive oil|Canola oil",
  "produce": "Green beans cooked",
  "prefCarb": "Sweet potato baked",
  "prefFat": "Olive oil",
  "prefProduce": "Green beans cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Pierce the sweet potato a few times and bake it at 400F for about 45 minutes, until soft all the way through. 2. Pat the pork chop completely dry with paper towels and season both sides (dry meat sears better). 3. Heat canola oil in a pan over medium-high until it shimmers. Lay the chop in and sear 4-5 minutes per side, until browned and the center reaches 145F on a thermometer. 4. Move the chop to a plate and rest it 5 minutes so the juices settle. 5. Trim the green beans, then steam or saute them for 5-7 minutes until bright green and tender-crisp. 6. Finish the green beans with a drizzle of olive oil, and serve everything together.",
  "oil": "Sear the chop in canola oil (smoke point ~400-450F), a neutral high-heat oil that handles the hot pan. Finish the green beans with a raw drizzle of extra-virgin olive oil (~375F, a medium-heat oil) added off the burner for flavor.",
  "season": "Optional: salt, pepper, and a little garlic powder or rosemary on the pork. A pinch of cinnamon on the sweet potato is a quiet flex.",
  "note": "A seared lean pork chop with a soft baked sweet potato and crisp green beans.",
  "extras": [
   [
    "Yellow mustard",
    10
   ]
  ],
  "simple": true
 },
 {
  "id": "ground-beef-smash-potato-brussels",
  "title": "Beef & Roasted Brussels with a Baked Potato",
  "slot": "dinner",
  "protein": "Beef ground 93/7|Beef ground 93/7",
  "carb": "Potato baked flesh",
  "fat": "Avocado oil|Butter salted",
  "produce": "Brussels sprouts cooked",
  "prefProtein": "Beef ground 93/7",
  "prefCarb": "Potato baked flesh",
  "prefFat": "Avocado oil",
  "prefProduce": "Brussels sprouts cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Pierce the potato a few times with a fork and bake it at 400F for about 50 minutes, until a knife slides in easily. 2. Trim and halve the Brussels sprouts, toss them with avocado oil and a pinch of salt, and roast cut-side down on a sheet pan at 425F for about 22 minutes, until deeply browned and crisp. 3. Heat a dry pan over medium-high (no oil needed, lean beef renders its own fat). Add the ground beef and cook 6-8 minutes, breaking it into crumbles with a spoon and seasoning as it goes, until no pink remains. Spoon off excess fat if you like. 4. Split the baked potato open and add a small pat of butter. Serve the beef and Brussels sprouts alongside.",
  "oil": "Roast the Brussels in avocado oil (smoke point ~520F) so they char and crisp at 425F without the oil burning. The lean beef browns in its own rendered fat, so add no oil to the pan. A small pat of salted butter on the potato (~350F, browns fast) is a finishing touch, not a cooking fat.",
  "season": "Optional: salt, pepper, garlic powder, and onion powder in the beef. A splash of balsamic or a little grated parmesan (if you eat dairy) on the Brussels takes them over the top.",
  "note": "Savory browned lean beef with caramelized Brussels sprouts and a fluffy baked potato.",
  "extras": [
   [
    "Ketchup|BBQ sauce",
    15
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ],
  "simple": true
 },
 {
  "id": "lean-chicken-breast-rice-asparagus",
  "title": "Pan-Seared Chicken Breast, Rice & Asparagus",
  "slot": "dinner",
  "protein": "Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Olive oil",
  "produce": "Asparagus cooked",
  "prefProtein": "Chicken breast cooked",
  "prefFat": "Avocado oil",
  "prefProduce": "Asparagus cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cook or reheat your rice (brown or white, whichever your plan lists) so it's hot when the chicken is done. 2. Lay the chicken breast between two sheets of plastic wrap and pound it to an even thickness with a heavy pan or mallet, so it cooks evenly. Pat it dry and season both sides. 3. Heat avocado oil in a pan over medium-high until it shimmers. Add the chicken and sear 5-6 minutes per side, until golden and the center reaches 165F on a thermometer. 4. Move it to a plate, rest 5 minutes, then slice. 5. Snap the woody ends off the asparagus. Either roast it at 425F for 12-15 minutes, or saute it in a little olive oil over medium heat for 5-7 minutes, until tender with a slight bite. 6. Serve the sliced chicken over the warm rice with the asparagus alongside.",
  "oil": "Use avocado oil (smoke point ~520F) for the hard sear so the chicken gets a golden crust without smoking. For the asparagus you can use olive oil (~375F), since a saute or a roast that stays near 400F keeps it in its safe range.",
  "season": "Optional: garlic powder, fresh thyme or rosemary, lemon zest, salt, and black pepper on the chicken, with a squeeze of lemon over the whole plate at the end.",
  "note": "A lean pan-seared chicken breast over white rice with bright roasted asparagus.",
  "extras": [
   [
    "Sriracha / hot sauce|Yellow mustard",
    8
   ]
  ],
  "simple": true
 },
 {
  "id": "lemon-salmon-rice-asparagus",
  "title": "Lemon Herb Salmon with Rice & Asparagus",
  "slot": "dinner",
  "protein": "Salmon Atlantic farmed|Salmon Atlantic wild|Salmon sockeye|Mackerel jack canned|Salmon pink canned",
  "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Asparagus cooked",
  "prefProtein": "Salmon Atlantic wild|Salmon sockeye",
  "prefFat": "Olive oil",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Cook or reheat your rice (brown or white rice, whichever your plan lists) so it's hot when the fish is done. 2. Pat the salmon dry with paper towels and season the flesh side. 3. Snap the woody ends off the asparagus; roast it at 400F for 10-12 minutes, or pan-saute it alongside the fish. 4. Heat avocado oil in a pan over medium-high until it shimmers. Lay the salmon in skin-side down and sear 4-5 minutes without moving it, until the skin is crisp. 5. Flip and cook 2-3 minutes more, until the fish flakes easily and reaches 125-130F at the center. 6. Plate the salmon over the rice with the asparagus, then finish with a drizzle of olive oil and a big squeeze of fresh lemon.",
  "oil": "Sear in avocado oil (smoke point ~520F) so the skin crisps hard without burning, then finish with a raw drizzle of extra-virgin olive oil for flavor. Don't sear in EVOO (it smokes around 375F and turns bitter).",
  "season": "Optional: garlic powder, dill, salt, pepper, and lemon zest. The fish is already rich in omega-3, so a squeeze of lemon at the end is all the help it needs.",
  "note": "Classic omega-3 salmon dinner: a seared fillet over rice with roasted asparagus and lemon.",
  "simple": true
 },
 {
 "id": "baked-cod-potato-green-beans",
 "title": "Baked Cod with Potato & Green Beans",
 "slot": "dinner",
 "protein": "Cod|Halibut|Tilapia|Mackerel jack canned",
 "carb": "Potato baked flesh|Sweet potato baked",
 "fat": "Olive oil",
 "produce": "Green beans cooked",
 "prefProtein": "Cod",
 "prefCarb": "Potato baked flesh",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Pierce your potato (white potato or sweet potato, whichever your plan lists) a few times with a fork and bake it at 400F for 45-50 minutes (or microwave it) until tender all the way through. 2. Pat the fish (cod, halibut, or tilapia, whichever your plan lists) dry, then rub it with a little olive oil, salt, and pepper. Set it on a sheet pan. 3. Trim the green beans, toss them with a little olive oil and salt, and spread them on the same pan around the fish. 4. Bake at 400F for 12-15 minutes, until the fish flakes easily with a fork and reaches 145F at the center, and the green beans are tender with a little char. 5. Squeeze fresh lemon over the fish and serve everything together.",
 "oil": "Olive oil is perfect here: in a moderate 400F oven, coating the food, it stays at or just under its ~375-405F smoke point, and its flavor suits delicate white fish. There's no ripping-hot sear, so there's no need for a higher-heat oil like avocado.",
 "season": "Optional: smoked paprika, garlic powder, parsley, salt, and pepper. White fish is a blank canvas, so don't be shy with the lemon at the end.",
 "note": "Lean white-fish dinner: oven-baked fish with a baked potato and roasted green beans.",
 "extras": [
  [
   "Pickles dill",
   30
  ]
 ],
 "simple": true,
 "batchQ": 1, "prepMethod": "1. Equipment: two sheet pans, parchment, a fork, a meat thermometer, and 4 containers. Heat the oven to 400F.\n2. Scrub your potatoes, pierce each a few times with a fork, and bake them directly on a rack for 45 to 50 minutes until a knife slides in with no resistance.\n3. While they bake, trim the green beans and toss them with a little olive oil and salt on a lined sheet pan.\n4. Pat the fish dry and season with olive oil, salt and pepper. Cooked fish holds about 3 days, so bake only the first 2 portions now. Freeze the other raw fillets today, since raw fish keeps only 1 to 2 days in the fridge, and thaw them in the fridge the night before a second quick bake mid-week.\n5. Roast the fish and green beans together for 12 to 15 minutes, until the fish flakes with a fork and reads 145F at the thickest point.\n6. Cool everything on the pan for 10 minutes before it goes in containers. Sealing hot fish steams it soft.\n7. Portion: one potato, one piece of fish, a quarter of the green beans per container. Add a lemon wedge to each.\n8. Storage: fridge 3 days for the cooked fish, 4 for the potatoes and beans. Do not freeze cooked cod, it turns watery.\n9. Reheat: oven or air fryer at 325F for 6 to 8 minutes. The microwave works but gives you a firmer piece of fish.",
 "makes": 4
},
 {
  "id": "garlic-butter-shrimp-quinoa-broccoli",
  "title": "Garlic Butter Shrimp & Quinoa Bowl",
  "slot": "dinner",
  "protein": "Shrimp",
  "carb": "Quinoa cooked",
  "fat": "Butter salted|Olive oil",
  "produce": "Broccoli cooked|Broccoli raw",
  "prefFat": "Butter salted",
  "prefProduce": "Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Cook or reheat the quinoa so it's hot and fluffy when the shrimp is done. 2. Prep your broccoli (cooked or raw, whichever your plan lists). Cut it into bite-sized florets, then steam or roast it for 6-8 minutes, until bright green and tender-crisp. 3. Pat the shrimp dry with paper towels so they sear instead of steam. 4. Melt a little butter in a pan over medium heat. Add minced garlic and stir for about 30 seconds (just until fragrant, don't let it brown), then add the shrimp. 5. Cook the shrimp 2-3 minutes per side, until they turn pink and opaque and curl into a loose C shape. Don't overcook them or they'll go rubbery. 6. Spoon the shrimp and garlic butter over the warm quinoa, add the broccoli, and finish with a squeeze of lemon.",
  "oil": "Use a small amount of salted butter over medium heat for that garlic-butter flavor; butter burns past ~350F, so keep the heat moderate and add the garlic late so it doesn't scorch. Olive oil works if you'd rather skip the dairy.",
  "season": "Optional: minced garlic, red pepper flakes, parsley, salt, and pepper. A squeeze of lemon at the end ties the whole bowl together.",
  "note": "Quick garlic-butter shrimp over fluffy quinoa with tender-crisp broccoli.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
 "id": "roasted-trout-sweet-potato-brussels",
 "title": "Roasted Trout with Sweet Potato & Brussels",
 "slot": "dinner",
 "protein": "Trout rainbow farmed|Mackerel Atlantic|Salmon sockeye|Mackerel jack canned|Salmon pink canned",
 "carb": "Sweet potato baked|Quinoa cooked",
 "fat": "Avocado oil|Olive oil",
 "produce": "Brussels sprouts cooked",
 "prefProtein": "Trout rainbow farmed",
 "prefCarb": "Sweet potato baked",
 "prefFat": "Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Prep your carb (baked sweet potato or quinoa, whichever your plan lists): pierce and bake the sweet potato at 400F for about 45 minutes until soft, or cook/reheat the quinoa until fluffy. 2. Trim and halve the Brussels sprouts, toss them with avocado oil and a pinch of salt, and roast cut-side down on a sheet pan at 425F for 18-20 minutes, until charred and crisp. 3. Pat the fish (rainbow trout, Atlantic mackerel, or sockeye salmon, whichever your plan lists) dry and season it. Add it to the sheet pan for the last 10-12 minutes, until it flakes easily and reaches 125-130F at the center. 4. Plate everything and finish with a drizzle of olive oil and a squeeze of fresh lemon.",
 "oil": "Roast the Brussels in avocado oil (smoke point ~520F), since they crisp best at 425F, which is above olive oil's ~375F smoke point. Finish the plate with a raw drizzle of olive oil for flavor. This fish is rich in delicate omega-3 fats, so keep the cooking gentle and never deep-fry it.",
 "season": "Optional: garlic powder, smoked paprika, and a little black pepper. The crispy Brussels and a squeeze of lemon do the heavy lifting here.",
 "note": "Omega-3 trout (or mackerel/salmon) roasted with crispy Brussels sprouts and a baked sweet potato.",
 "simple": true,
 "batchQ": 1, "prepMethod": "1. Equipment: two sheet pans, parchment, a knife, a meat thermometer, and 4 containers. Heat the oven to 425F.\n2. Pierce the sweet potatoes and bake 45 minutes, or cook the quinoa if it is quinoa on your list.\n3. Trim and halve the Brussels sprouts, toss with avocado oil and salt, and roast cut side down for 18 to 20 minutes until the cut faces are dark.\n4. Pat the trout dry and season. Bake 2 portions now. Freeze the rest raw today, since raw fish keeps only 1 to 2 days in the fridge, and thaw it in the fridge the night before a second cook in 3 days.\n5. Add the trout to the pan for the last 10 to 12 minutes, until it flakes and reads 145F.\n6. Cool 10 minutes on the pan, then portion: one sweet potato or a scoop of quinoa, one fillet, a quarter of the sprouts.\n7. Storage: fridge 3 days for cooked trout, 4 for the vegetables. Raw fillets wait in the freezer, not the fridge.\n8. Reheat: 325F oven for 7 minutes. Squeeze fresh lemon after reheating, not before.",
 "makes": 4
},
 {
  "id": "chicken-broccoli-stirfry-rice-bowl",
  "title": "Chicken & Broccoli Stir-Fry Rice Bowl",
  "slot": "dinner",
  "protein": "chicken breast|chicken thigh|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "avocado oil|canola oil",
  "produce": "broccoli|bell pepper",
  "prefProtein": "chicken breast",
  "prefProduce": "broccoli",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cook or reheat your rice (white or brown rice, whichever your plan lists) so it's hot and ready to serve. 2. Slice your chicken (breast or thigh, whichever your plan lists) into thin, even strips so it cooks fast. 3. Cut your vegetable (broccoli, bell pepper, or zucchini, whichever your plan lists) into bite-sized pieces. 4. Get a wok or large skillet very hot over high heat, then add the oil. Add the chicken and stir-fry 3-4 minutes, until it picks up color and is nearly cooked through. 5. Add the vegetable and stir-fry hard for 4-5 minutes, keeping everything moving so it stays crisp-tender. 6. Add a splash of tamari (gluten-free soy sauce) and a little sriracha and toss for another minute to glaze. The chicken should be cooked through (165F at the thickest piece). 7. Spoon it all over the hot rice.",
  "oil": "Use avocado or canola oil. Stir-frying runs well past 400F, so you need a high-smoke-point oil: avocado (~520F) and canola (~400-450F) both hold up and stay neutral. Olive oil would scorch and turn bitter at this heat. For a finishing touch you can add a few drops of toasted sesame oil at the very end (off the heat) for aroma.",
  "season": "Optional: garlic powder, fresh grated ginger, a clove of minced garlic, sesame seeds, and sliced green onion. The tamari (gluten-free soy sauce) and sriracha do most of the heavy lifting, so go easy and taste as you go.",
  "note": "Classic takeout-style chicken and your vegetable over rice, glazed with tamari (gluten-free soy sauce) and a hit of sriracha.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Soy sauce",
    8
   ]
  ]
 },
 {
  "id": "beef-pepper-stirfry-rice-bowl",
  "title": "Pepper Beef Stir-Fry over Rice",
  "slot": "dinner",
  "protein": "beef sirloin|beef top round",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "avocado oil|canola oil",
  "produce": "bell pepper|onion|broccoli",
  "prefProtein": "beef sirloin",
  "prefProduce": "bell pepper",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cook or reheat your rice (white or brown rice, whichever your plan lists) so it's hot and ready. 2. Slice your beef (sirloin or top round, whichever your plan lists) as thinly as you can against the grain, which keeps it tender. 3. Cut your vegetable (bell pepper, onion, broccoli, or zucchini, whichever your plan lists) into bite-sized pieces. 4. Heat the oil in a wok over high heat until it just starts to smoke. Lay the beef in a single layer and sear 1-2 minutes per side, until browned, then scoop it out onto a plate. 5. Add the vegetable to the hot wok and stir-fry 3-4 minutes, keeping it moving so it stays crisp-tender. 6. Return the beef, add a splash of tamari (gluten-free soy sauce) and a swipe of sriracha, and toss for a minute to glaze. 7. Spoon it all over the hot rice.",
  "oil": "Use avocado or canola oil. A proper beef sear needs the pan near-smoking, which would torch lower-smoke-point oils. Avocado (~520F) or canola (~400-450F) take that heat cleanly and stay neutral; skip olive oil here. A few drops of toasted sesame oil added off the heat at the end are optional, for aroma.",
  "season": "Optional: black pepper (it is pepper beef, after all), grated ginger, minced garlic, and a pinch of five-spice. Salt is mostly covered by the tamari (gluten-free soy sauce), so taste before adding more.",
  "note": "Thin-sliced seared beef with your vegetable in a tamari (gluten-free soy sauce) and sriracha glaze over rice.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Soy sauce",
    8
   ]
  ]
 },
 {
  "id": "shrimp-cabbage-stirfry-rice-bowl",
  "title": "Sriracha Shrimp Stir-Fry Bowl",
  "slot": "dinner",
  "protein": "shrimp",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "avocado oil|canola oil",
  "produce": "cabbage|bell pepper|broccoli",
  "prefProtein": "shrimp",
  "prefProduce": "cabbage",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Pat the shrimp very dry with paper towels (wet shrimp steam instead of sear). Season lightly with salt and pepper. 2. Set a wok or large skillet over high heat for about 1 minute until it's good and hot, then add the oil and swirl to coat. 3. Add the shrimp in a single layer and stir-fry just 2-3 minutes, until they turn pink and opaque and curl into a loose C shape. Don't overcook them or they go rubbery. Scoop them onto a plate. 4. Add your vegetable (cabbage, bell pepper, broccoli, or zucchini, whichever your plan lists) to the same hot pan. Stir-fry 3-5 minutes, until crisp-tender: cabbage and peppers should soften but still have crunch, broccoli should turn bright green, zucchini should brown and shrink. 5. Return the shrimp to the pan, then add tamari (gluten-free soy sauce) and sriracha to taste. Toss everything together for 1 minute so it's coated and hot. 6. Spoon over your rice (white or brown) and serve right away.",
  "oil": "Use avocado oil or canola oil. High-heat wok cooking blows right past extra-virgin olive oil's ~375F smoke point, where it would burn and turn bitter. Avocado oil (~520F) and canola oil (~400F) are neutral and stay smoke-free while the pan is screaming hot, so the shrimp and veg sear instead of steam.",
  "season": "Optional aromatics: grated fresh ginger and minced garlic added with the vegetable, plus a little lime zest. Garnish with a sprinkle of sesame seeds or sliced green onion. The sriracha brings the heat, so add it to your own tolerance.",
  "note": "Quick-seared shrimp and crisp-tender veg in a tamari-sriracha sauce over rice."
 },
 {
 "id": "tofu-tempeh-veggie-stirfry-rice-bowl",
 "title": "Crispy Tofu Veggie Stir-Fry Bowl",
 "slot": "dinner",
 "protein": "tofu|tempeh|edamame cooked|TVP",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "avocado oil|canola oil",
 "produce": "broccoli|bell pepper|cabbage",
 "prefProtein": "tofu",
 "prefProduce": "broccoli",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. If using tofu, press it 10-15 minutes to squeeze out water, then cut into bite-size cubes. If using tempeh, cut into cubes (steaming it 8 minutes first mellows any bitterness). If using edamame, just have the shelled beans ready. 2. Set a wok or large skillet over high heat about 1 minute, add the oil, and swirl to coat. 3. Add your protein (tofu, tempeh, or edamame). For tofu and tempeh, sear undisturbed 2-3 minutes per side until golden and crisp; for edamame, stir-fry 2 minutes until hot and blistered. Scoop onto a plate. 4. Add your vegetable (broccoli, bell pepper, cabbage, or zucchini, whichever your plan lists) to the hot pan. Stir-fry hard 4-5 minutes until crisp-tender: broccoli turns bright green, peppers and cabbage soften but stay crunchy, zucchini brown and shrink. 5. Return the protein, then glaze with tamari (gluten-free soy sauce) and sriracha to taste. Toss 1 minute until everything is coated and hot. 6. Pile over hot rice (white or brown) and serve.",
 "oil": "Use avocado oil or canola oil. Getting tofu or tempeh genuinely crispy needs a hot pan, well above extra-virgin olive oil's ~375F smoke point. Avocado oil (~520F) or canola oil (~400F) are neutral and crisp the edges without smoking or turning bitter, so nothing tastes scorched.",
 "season": "Optional aromatics: grated ginger and minced garlic with the vegetable, and a tiny splash of rice vinegar at the end. Garnish with sesame seeds or sliced green onion. The tamari (gluten-free soy sauce) and sriracha carry the flavor, so let them lead.",
 "note": "Pan-crisped plant protein with stir-fried veg in a tamari-sriracha glaze over rice. Fully plant-based.",
 "batchQ": 2, "prepMethod": "1. Equipment: a wok or large skillet, a sheet pan, a saucepan, paper towels, and 5 containers.\n2. Press the tofu 15 minutes under something heavy. Dry tofu crisps, wet tofu steams. If you are using tempeh, steam the cubes 8 minutes first to take the bitterness out.\n3. Cook the rice and spread it on a tray to cool. Sealing warm rice makes it gluey.\n4. Get the wok properly hot before the oil goes in, then sear the protein in two batches so it browns instead of stewing. 2 to 3 minutes a side.\n5. Stir-fry the vegetables 3 to 4 minutes until crisp-tender. Pull them while they still have bite, they soften again on reheating.\n6. Cool everything uncovered for 20 minutes before it goes in containers.\n7. Portion: rice on the bottom, protein and vegetables on top. Keep the sauce in small tubs and add it at serving so the tofu stays crisp.\n8. Storage: fridge 4 days. Tofu and tempeh both hold the full chunk, which is more than most animal proteins manage.\n9. Reheat: a hot dry pan for 3 minutes brings the crisp back. The microwave works but the tofu goes soft.",
 "makes": 5
},
 {
  "id": "beef-marinara-pasta",
  "title": "Beef Marinara Pasta",
  "slot": "dinner",
  "protein": "Beef ground 93/7|Beef ground 93/7",
  "carb": "Pasta cooked|Carbe Diem|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Parmesan grated|Olive oil",
  "produce": "Zucchini cooked",
  "prefProtein": "Beef ground 93/7",
  "prefFat": "Parmesan grated",
  "prefProduce": "Mushrooms cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Put your cooked pasta (regular pasta or Carbe Diem) on to heat or keep warm. 2. Set a skillet over medium-high heat. Add the ground beef (93/7 or 93/7) and cook 6-8 minutes, breaking it into crumbles with a spoon, until no pink remains and it's lightly browned. Tip out any pooled grease. 3. Add the cooked zucchini and cook 3-4 minutes until heated through and any liquid cooks off. 4. Pour in marinara, lower the heat, and simmer gently 8-10 minutes so the flavors marry; stir now and then. 5. Toss the sauce with the hot pasta until coated. 6. Finish each bowl with grated parmesan (if you eat dairy) and, if you chose olive oil as your fat instead, a small drizzle of extra-virgin olive oil off the heat.",
  "oil": "Your fat is either grated parmesan or olive oil. The lean beef renders its own fat for browning, so you need almost no added oil. If olive oil is your fat, use extra-virgin olive oil as a raw finishing drizzle off the heat, a gentle simmer never reaches its ~375F smoke point, and its fruity flavor is perfect raw over a red sauce.",
  "season": "Optional: garlic powder, dried oregano, a pinch of red pepper flakes, salt, and black pepper. Tear fresh basil over the top if you have it, never hurts a red sauce.",
  "note": "Classic weeknight meat-sauce pasta: lean beef and zucchini simmered in marinara, finished with parmesan or a drizzle of olive oil.",
  "extras": [
   [
    "Mozzarella part skim",
    15
   ],
   [
    "Marinara sauce",
    60
   ]
  ]
 },
 {
  "id": "turkey-zucchini-marinara-ww-pasta",
  "title": "Turkey & Zucchini Marinara over Whole-Wheat Pasta",
  "slot": "dinner",
  "protein": "Turkey ground|Chicken ground|Chicken leg quarters roasted",
  "carb": "Whole wheat pasta cooked|Carbe Diem|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Parmesan grated|Olive oil",
  "produce": "Zucchini cooked",
  "prefProtein": "Turkey ground",
  "prefFat": "Parmesan grated",
  "prefProduce": "Zucchini raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Put your cooked carb (whole-wheat pasta or Carbe Diem) on to heat or keep warm. 2. Set a skillet over medium-high heat with a little olive oil. Add the ground protein (turkey or chicken) and cook 6-8 minutes, breaking it into crumbles, until no pink remains. 3. Add the cooked zucchini and cook 3-4 minutes until heated through and just tender. 4. Stir in marinara, lower the heat, and simmer 8 minutes so it thickens slightly and the flavors come together. 5. Toss with the hot pasta until well coated. 6. Shower each bowl with grated parmesan (if you eat dairy).",
  "oil": "Use a small amount of olive oil to start. Lean ground turkey or chicken renders very little fat of its own, so this bit of oil earns its keep. Keep the flame at medium-high, not blazing, so a regular olive oil stays under its smoke point and doesn't smoke; refined or light olive oil (~465F) gives you the most headroom for browning.",
  "season": "Optional: Italian seasoning, garlic powder, onion powder, salt, and black pepper. Add a pinch of red pepper flakes if you like a little heat.",
  "note": "Lighter, veg-packed meat-sauce pasta: lean ground turkey or chicken and zucchini in marinara over whole-wheat pasta with parmesan.",
  "extras": [
   [
    "Marinara sauce",
    40
   ],
   [
    "Mozzarella part skim",
    15
   ]
  ]
 },
 {
 "id": "chicken-spinach-pomodoro-pasta",
 "title": "Chicken & Spinach Pomodoro Pasta",
 "slot": "dinner",
 "protein": "Chicken breast cooked|Chicken thigh cooked|Chicken leg quarters roasted",
 "carb": "Pasta cooked|Carbe Diem|Shirataki noodles|Chickpea pasta cooked",
 "fat": "Parmesan grated|Olive oil",
 "produce": "Spinach cooked",
 "prefProtein": "Chicken breast cooked",
 "prefFat": "Parmesan grated",
 "prefProduce": "Spinach cooked",
 "diets": [
  "omnivore"
 ],
 "method": "1. Put your cooked carb (pasta or Carbe Diem) on to heat or keep warm. 2. Cut the cooked chicken (breast or thigh) into bite-size pieces. 3. Set a skillet over medium heat with a touch of olive oil. Add the marinara and the chicken and simmer gently 5 minutes, stirring now and then, until everything is hot through. 4. Stir in the cooked spinach and let it warm and wilt fully into the sauce, 1-2 minutes. 5. Toss the sauce with the hot pasta until coated. 6. Finish each bowl with grated parmesan (if you eat dairy).",
 "oil": "Use just a touch of olive oil over medium heat to bloom the sauce, well within olive oil's ~375F range, and no hard searing is needed since the chicken is already cooked. Extra-virgin olive oil works nicely here because its flavor stays intact at this gentle heat.",
 "season": "Optional: minced or powdered garlic, dried basil, oregano, salt, and pepper. A squeeze of lemon over the spinach brightens the whole bowl.",
 "note": "A comfort pasta: tender chicken and wilted spinach in marinara over pasta with parmesan.",
 "extras": [
  [
   "Marinara sauce",
   40
  ],
  [
   "Mozzarella part skim",
   15
  ]
 ]
},
 {
 "id": "garlicky-spinach-whole-wheat-pasta",
 "title": "Garlicky Spinach Whole-Wheat Pasta",
 "slot": "dinner",
 "protein": "Edamame cooked|Soybeans cooked",
 "carb": "Whole wheat pasta cooked|Carbe Diem|Shirataki noodles|Chickpea pasta cooked",
 "fat": "Olive oil|Parmesan grated",
 "produce": "Spinach cooked",
 "prefProtein": "Edamame cooked",
 "prefFat": "Olive oil",
 "prefProduce": "Mushrooms cooked",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Cook your carb (whole-wheat pasta or Carbe Diem) and, before draining, scoop out about half a cup of the starchy cooking water and set it aside. 2. Set a skillet over medium-high heat with olive oil. Add the cooked spinach and saute 2-3 minutes until any liquid has cooked off. 3. Add your protein (edamame or soybeans) and cook 2 minutes to heat through. 4. Add the cooked spinach and let it warm and wilt into the pan, 1-2 minutes. 5. Add the hot pasta plus a splash of the reserved pasta water and toss; the starchy water loosens everything into a light sauce. 6. Finish with grated parmesan (if you eat dairy) or, if olive oil is your fat, a final drizzle of extra-virgin olive oil off the heat.",
 "oil": "Your fat is olive oil or grated parmesan. If olive oil is your fat, save a little to drizzle raw off the heat, that fruity finish ties the bowl together.",
 "season": "Optional: lots of minced garlic added with the spinach, a pinch of red pepper flakes, salt, and black pepper, plus a squeeze of lemon at the end. spinach loves black pepper, so be generous.",
 "note": "Lighter veg-forward pasta: garlicky edamame and wilted spinach tossed with whole-wheat pasta and parmesan.",
 "extras": [
  [
   "Marinara sauce",
   40
  ]
 ]
},
 {
 "id": "tempeh-teriyaki-stir-fry-brown-rice-broccoli",
 "title": "Tempeh Teriyaki Stir-Fry Bowl",
 "slot": "dinner",
 "protein": "tempeh|TVP",
 "carb": "brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "avocado oil",
 "produce": "broccoli cooked|broccoli raw|bell pepper red raw",
 "prefProduce": "broccoli",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Cut the tempeh into cubes and steam or simmer it 8-10 minutes first to mellow its bitterness, then pat dry. 2. Set a wok or large skillet over high heat about 1 minute, add the oil, and swirl to coat. 3. Add the tempeh and stir-fry 5-6 minutes until the edges are golden and crisp. 4. Add your vegetable (broccoli or red bell pepper, whichever your plan lists) and stir-fry 4-5 minutes until crisp-tender: broccoli turns bright green, peppers soften but keep a little crunch. 5. In the last minute, glaze with tamari (gluten-free soy sauce), plus a touch of maple syrup if you like a sweeter gluten-free teriyaki style, and toss to coat. 6. Serve over the brown rice.",
 "oil": "Use avocado oil (~520F). A stir-fry runs screaming hot, and avocado oil's high smoke point and neutral taste mean it won't smoke or turn bitter at wok temperature, so the tempeh and veg sear cleanly.",
 "season": "Optional aromatics: grated garlic and fresh ginger added with the vegetable, and a pinch of red pepper flakes. Garnish with sesame seeds and, if you like it loud, a drizzle of sriracha.",
 "note": "Hearty vegan, gluten-free teriyaki-style stir-fry: golden-seared tempeh and crisp veg over brown rice.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a wok or large skillet, a saucepan, a steamer or pot, and 5 containers.\n2. Cut the tempeh into cubes and steam or simmer 8 to 10 minutes, then pat dry. This takes the bitter edge off.\n3. Cook the rice and spread it on a tray to cool.\n4. Heat the wok, add the oil, and stir-fry the tempeh in two batches 5 to 6 minutes until the edges are dark and crisp.\n5. Add the vegetables and stir-fry 4 to 5 minutes until crisp-tender.\n6. Glaze with tamari in the last minute, off the heat. Cook the glaze into it and it turns sticky in the fridge.\n7. Cool uncovered 20 minutes, then portion rice first, tempeh and vegetables on top.\n8. Storage: fridge 4 days. Freezes 2 months.\n9. Reheat: hot dry pan 3 minutes, or microwave 90 seconds.",
 "makes": 5
},
 {
 "id": "crispy-tofu-burrito-bowl-black-beans-rice",
 "title": "Crispy Tofu Burrito Bowl",
 "slot": "dinner",
 "protein": "tofu firm|black beans|TVP",
 "carb": "brown rice cooked|white rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "avocado oil",
 "produce": "bell pepper red raw|onion raw|romaine lettuce|tomato raw",
 "prefProtein": "tofu firm",
 "prefProduce": "bell pepper red raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. If using firm tofu, press it about 10 minutes, then cut into cubes. If using black beans as your protein, just warm them (see step 3). 2. Set a skillet over medium-high heat with the oil. Add the tofu and sear 8-10 minutes, turning so every side gets crispy and golden. 3. Meanwhile, warm the black beans (the second protein option, or as a side) in a small pot with a little cumin and salt, 3-4 minutes. 4. Cook your rice (brown or white) or have it warm. 5. Prep your vegetable (red bell pepper, onion, romaine lettuce, or tomato, whichever your plan lists): slice the pepper or onion thin, shred the romaine, or dice the tomato. 6. Build the bowl over rice with the crispy tofu (and/or beans), your vegetable, and a spoonful of salsa.",
 "oil": "Use avocado oil (~520F). Getting tofu genuinely crispy needs high, steady heat; avocado oil's very high smoke point and neutral taste take that heat without smoking, where extra-virgin olive oil would burn and turn bitter.",
 "season": "Optional: cumin, smoked paprika, garlic powder, and chili powder on the tofu, salt, and a squeeze of lime over the top. Pile on salsa and hot sauce to taste.",
 "note": "Tex-Mex bowl with crispy seared tofu (or black beans), fresh veg, and salsa over rice.",
 "extras": [
  [
   "Salsa",
   30
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large skillet, a small pot, a saucepan, paper towels, and 5 containers plus 5 small tubs.\n2. Press the tofu 10 minutes, then cube it.\n3. Cook the rice and spread it on a tray to cool.\n4. Sear the tofu 8 to 10 minutes in two batches, turning so every side crisps.\n5. Warm the black beans in a pot with cumin and salt, 3 to 4 minutes.\n6. Dice the peppers, onion and tomato. Keep all the raw vegetables in their own tubs, not in the container, or they weep into the rice.\n7. Portion: rice, tofu and beans in the container. Raw vegetables and salsa in the tubs.\n8. Storage: fridge 4 days for the container, 3 for the cut raw vegetables.\n9. Reheat: microwave the container 2 minutes, then add the cold vegetables on top. Slice avocado fresh.",
 "makes": 5
},
 {
 "id": "lentil-rice-spinach-power-bowl",
 "title": "Lentil & Rice Power Bowl with Wilted Spinach",
 "slot": "dinner",
 "protein": "lentils",
 "carb": "brown rice cooked|quinoa cooked|Riced cauliflower cooked",
 "fat": "olive oil",
 "produce": "spinach cooked|spinach raw|carrots raw|onion raw",
 "prefProduce": "spinach",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Cook or warm your carb (brown rice or quinoa) and keep it hot. 2. Set a skillet over medium heat with the olive oil. Add your vegetable (spinach, carrots, or onion, whichever your plan lists). For carrots or onion, dice and saute 5-6 minutes until soft; for spinach, hold it for step 4. 3. Add the lentils and warm through 3-4 minutes with a pinch of cumin and salt. 4. If your vegetable is spinach, stir in a few big handfuls now and let it wilt 1-2 minutes; if you used carrot or onion, it's already in the pan. 5. Spoon the lentils and veg over your rice or quinoa.",
 "oil": "Use olive oil (~375F). This is a gentle medium-heat saute, never a hard sear, so olive oil stays well under its smoke point and its flavor shines. Extra-virgin olive oil is a fine choice at this low heat.",
 "season": "Optional: cumin, coriander, smoked paprika, minced garlic, and a bay leaf while the lentils warm, plus a squeeze of lemon at the end. Lemon and lentils are old friends. Salt to taste; lentils and rice both need it to taste seasoned rather than plain.",
 "note": "Warm, earthy lentil-and-rice (or quinoa) bowl with your choice of veg, simple comfort food, fully plant-based.",
 "extras": [
  [
   "Hummus",
   30
  ]
 ],
 "batchQ": 3, "prepMethod": "1. Equipment: a large skillet, a saucepan, and 5 containers.\n2. Cook the rice or quinoa and spread it on a tray to cool.\n3. Dice the carrots and onion. Heat the olive oil and cook them 5 to 6 minutes until soft.\n4. Add the lentils with cumin and salt and warm through 3 to 4 minutes.\n5. Stir the spinach in at the very end and let it wilt 1 to 2 minutes. Salt it properly now, lentils taste of nothing underseasoned.\n6. Cool uncovered 20 minutes, then portion the grain first and the lentils over it.\n7. Storage: fridge 4 days. Lentils are one of the few proteins that genuinely improve on day two. Freezes 3 months.\n8. Reheat: microwave 2 minutes with a splash of water, or a covered pan over low heat. Finish with lemon.",
 "makes": 5
},
 {
 "id": "mediterranean-chickpea-couscous-roasted-veg",
 "title": "Mediterranean Chickpea & Couscous Bowl",
 "slot": "dinner",
 "protein": "chickpeas",
 "carb": "couscous cooked",
 "fat": "olive oil",
 "produce": "zucchini cooked|eggplant cooked|bell pepper red raw|tomato raw",
 "prefProduce": "zucchini cooked|bell pepper red raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Heat the oven to 400F. 2. On a sheet pan, toss the chickpeas and your vegetable (zucchini, eggplant, red bell pepper, or tomato, whichever your plan lists) with olive oil, salt, and pepper. Cut zucchini, eggplant, and pepper into bite-size pieces; halve or quarter tomatoes. 3. Roast 22-25 minutes, flipping once halfway, until the chickpeas crisp slightly and the vegetable caramelizes at the edges (juicy tomatoes will collapse and concentrate). 4. Fluff the cooked couscous with a fork. 5. Pile the roasted chickpeas and veg over the couscous. 6. Finish with a drizzle of olive oil and a good squeeze of lemon.",
 "oil": "Use olive oil. Roasting at 400F sits right at the top of extra-virgin olive oil's comfort zone, and its fruity flavor is exactly what you want in a Mediterranean bowl. Keep the oven at 400F (not higher) so it doesn't scorch, and save a little raw for the finishing drizzle.",
 "season": "Optional: dried oregano, garlic powder, smoked paprika, salt, pepper, and a good squeeze of lemon at the end. A little crumbled feta is nice (if you eat dairy); skip it to keep the bowl vegan.",
 "note": "Roasted chickpeas and veg over fluffy couscous, bright, herby, Mediterranean-style.",
 "extras": [
  [
   "Olives ripe",
   15
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: two sheet pans, parchment, a bowl, and 5 containers. Heat the oven to 400F.\n2. Drain and rinse the chickpeas and dry them well on a towel. Wet chickpeas will not crisp.\n3. Cut the zucchini, eggplant and pepper into bite-size pieces, or halve the tomatoes.\n4. Toss the chickpeas and vegetables with olive oil, salt and pepper and spread them over two pans. Crowding one pan steams everything.\n5. Roast 22 to 25 minutes, flipping once, until the chickpeas crisp at the edges and the vegetables colour.\n6. Cook the couscous, fluff it with a fork, and spread it on a tray to cool.\n7. Portion couscous first, roasted chickpeas and vegetables over it. Keep the lemon and any topping separate.\n8. Storage: fridge 4 days. Do not freeze, the couscous turns to paste.\n9. Reheat: microwave 2 minutes, or eat it cold as a grain salad, which is how it is best on day three. Add the lemon and toppings after.",
 "makes": 5
},
 {
 "id": "edamame-sweet-potato-avocado-bowl",
 "title": "Edamame, Sweet Potato & Avocado Bowl",
 "slot": "dinner",
 "protein": "edamame cooked|black beans",
 "carb": "sweet potato baked|quinoa cooked",
 "fat": "Avocado raw",
 "produce": "kale cooked|spinach raw|carrots raw|cabbage cooked",
 "prefProtein": "edamame cooked",
 "prefCarb": "sweet potato baked",
 "prefProduce": "kale cooked|spinach raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Heat the oven to 425F. Cube your carb if it's sweet potato and roast 25-30 minutes, flipping once, until caramelized and fork-tender; if your carb is quinoa, just cook or warm it. 2. Steam or boil your protein: shelled edamame for about 5 minutes, or simply warm the black beans with a pinch of salt. 3. Prep your vegetable (kale, spinach, carrots, or cabbage, whichever your plan lists). If it's kale, massage it with a few drops of oil and a pinch of salt so it softens; cooked cabbage just needs warming; raw spinach or carrots can go in as-is (shred the carrots). 4. Build the bowl with the sweet potato or quinoa, the warm edamame or beans, and your vegetable. 5. Slice the avocado and lay it over the top.",
 "oil": "Your fat is raw avocado, sliced over the top, so it's never heated, that keeps its creamy texture and good fats intact. If you want to mist the sweet potato before roasting at 425F, use a spray of avocado or canola oil, since both have high smoke points (~520F and ~400F) that handle that heat; don't use the avocado fruit for roasting.",
 "season": "Optional: a sprinkle of tamari (gluten-free soy sauce) or sriracha on the edamame, smoked paprika and salt on the sweet potato, and a squeeze of lime over the avocado. Add sesame seeds if you're feeling fancy.",
 "note": "Bright, filling buddha-style bowl: sweet roasted potato (or quinoa), protein-packed edamame or beans, and creamy avocado.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a sheet pan, parchment, a pot, and 5 containers. Heat the oven to 425F.\n2. Cube the sweet potato and roast 25 to 30 minutes, flipping once, until the edges caramelise.\n3. Boil the shelled edamame 5 minutes, or warm the black beans with a pinch of salt.\n4. If your vegetable is kale, massage it with a few drops of oil and a pinch of salt until it softens and darkens. Shred carrots or cabbage raw.\n5. Cool the sweet potato completely before portioning. Warm sweet potato sweats and makes everything soggy.\n6. Portion: sweet potato, edamame and greens layered in the container. Leave the avocado out.\n7. Storage: fridge 4 days.\n8. Reheat: microwave 2 minutes, or eat cold. Slice the avocado fresh at serving, it browns overnight.",
 "makes": 5
},
 {
  "id": "greek-yogurt-berry-bowl",
  "title": "Greek Yogurt & Mixed Berry Bowl",
  "slot": "snack",
  "protein": "Greek yogurt plain nonfat|Greek yogurt plain whole",
  "fat": "Almonds|Chia seeds",
  "produce": "Blueberries raw|Strawberries raw|Raspberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking needed. Spoon the Greek yogurt (nonfat or whole) into a bowl. 2. Rinse your berries (blueberries, strawberries, or raspberries, whichever your plan lists) and pat dry; slice strawberries if using. Pile them on top of the yogurt. 3. Scatter your fat over the top: a small handful of almonds (roughly chop them for easier eating) or a sprinkle of chia seeds, for crunch and staying power. 4. Stir it all together, or eat it in layers, your call.",
  "oil": "No cooking oil is used. The fat here is whole nuts or seeds (almonds or chia) added raw straight onto the bowl for crunch and lasting fullness, no pan, no heat.",
  "season": "Optional: a tiny drizzle of honey or a dusting of cinnamon if you want it sweeter; a drop of vanilla extract works too. It's also great kept plain, letting the berries do the talking.",
  "note": "Creamy high-protein Greek yogurt with fresh berries and a little nut or seed crunch. The classic no-cook protein snack."
 },
 {
  "id": "apple-peanut-butter-slices",
  "title": "Apple Slices with Peanut Butter",
  "slot": "snack",
  "protein": "PBfit powdered peanut butter|Greek yogurt plain nonfat",
  "fat": "Peanut butter smooth",
  "produce": "Apple raw with skin",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. No cooking needed. Wash the apple, leaving the skin on for fiber. 2. Core it and cut into wedges or thin slices. 3. Scoop the smooth peanut butter into a small dish for dipping, or spread a little onto each slice. 4. Dip and eat. If the peanut butter is stiff, stir it well first so it spreads easily.",
  "oil": "No cooking oil. Smooth peanut butter is both the protein and the fat here, used raw straight from the jar as a dip or spread.",
  "season": "Optional: a light sprinkle of cinnamon over the apple, or a few flakes of sea salt on the peanut butter. A dusting of cocoa powder makes it taste dessert-like for almost no extra calories.",
  "note": "Crisp apple wedges with creamy peanut butter, the all-time-classic sweet-and-savory no-cook snack."
 },
 {
 "id": "cottage-cheese-cucumber-tomato",
 "title": "Savory Cottage Cheese Bowl (Cucumber, Tomato & Everything Seasoning)",
 "slot": "snack",
 "protein": "Cottage cheese 2%|Cottage cheese nonfat",
 "fat": "Avocado raw",
 "produce": "Cucumber raw|Tomato raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Spoon the cottage cheese into a wide shallow bowl and spread it out. 2. Pile the diced cucumber and tomato on top. 3. Scatter the diced avocado over the bowl. 4. Squeeze fresh lemon over everything for brightness against the creamy cottage cheese and avocado. 5. Shower generously with everything bagel seasoning and cracked black pepper. Taste before adding salt: the everything seasoning and cottage cheese are already salty. 6. Finish with the chopped fresh herbs and eat right away while the veg is cold and crisp.",
 "season": "Everything bagel seasoning (generous), cracked black pepper, and flaky sea salt to finish - add salt last and sparingly since cottage cheese + everything seasoning are already salty. Optional punch-up paths instead of or alongside everything seasoning: a spoon of chili crisp, or a sprinkle of za'atar.",
 "note": "Cottage cheese + avocado + everything seasoning is a popular high-protein savory bowl; the avocado (not drizzled oil) provides the healthy fat and a creamy body that pairs with cool cucumber and juicy tomato. Use BOTH cucumber and tomato for the cool-crisp-plus-juicy contrast; lemon brightens it. No-cook, ~20g+ protein from 3/4 cup cottage cheese."
},
 {
  "id": "hummus-veggie-dippers",
  "title": "Greek Yogurt Hummus Dip with Bell Pepper & Carrot Dippers",
  "slot": "snack",
  "protein": "Greek yogurt plain nonfat|Cottage cheese 2% lowfat",
  "fat": "Hummus|Olive oil",
  "produce": "Bell pepper red raw|Carrots raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. No cooking needed. 2. Rinse your vegetables (bell pepper and carrots, whichever your plan lists) under cool water. 3. Slice them into long, sturdy sticks about the width of your finger so they're easy to dip. 4. Scoop the hummus into a small bowl. 5. Optional: drizzle a thin thread of olive oil over the hummus to finish. 6. Dip the veggie sticks into the hummus and enjoy.",
  "oil": "Olive oil as an optional raw finishing drizzle on the hummus, no cooking at all. The chickpeas and tahini in hummus already carry plenty of fat, so this is purely a flavor touch.",
  "season": "Optional: a dusting of smoked paprika or cumin over the hummus, or a squeeze of lemon. It's still great left plain.",
  "note": "Creamy hummus with crunchy fresh veggie dippers. The easy plant-based no-cook savory snack.",
  "extras": [
   [
    "Hummus",
    40
   ]
  ]
 },
 {
  "id": "banana-almond-butter",
  "title": "Banana, Almond Butter & Greek Yogurt Snack",
  "slot": "snack",
  "protein": "Greek yogurt plain nonfat|Cottage cheese 2% lowfat",
  "fat": "Almond butter",
  "produce": "Banana raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. No cooking needed. 2. Peel the banana. 3. Either slice it into coins about a quarter-inch thick, or split it lengthwise down the middle, your choice. 4. Spread or drizzle the almond butter over the banana. 5. Eat as-is; no need to stir anything together.",
  "oil": "No cooking oil. The almond butter is both the protein and the finishing fat, used raw straight from the jar.",
  "season": "Optional: a sprinkle of cinnamon, a few chia seeds, or a tiny dusting of cocoa powder for a dessert feel. A little flaky salt on the almond butter is a quiet upgrade.",
  "note": "Sweet banana with rich almond butter. A satisfying no-cook snack that eats like a treat."
 },
 {
 "id": "tofu-veggie-scramble-toast",
 "title": "Tofu Veggie Scramble with Toast",
 "slot": "breakfast",
 "protein": "Tofu firm|TVP",
 "carb": "Whole wheat bread|Potato baked",
 "fat": "Avocado raw|Olive oil",
 "produce": "Spinach cooked|Bell pepper red",
 "prefProduce": "Spinach cooked",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Crumble the firm tofu into small, egg-like pieces with your hands, then press it between paper towels to pat it dry (drier tofu browns better). 2. Heat a teaspoon of oil in a nonstick pan over medium-high heat. 3. Add the tofu and cook 5-7 minutes, stirring now and then, until the edges turn golden. 4. Stir in your vegetable (cooked spinach, red bell pepper, or zucchini, whichever your plan lists) for the last 2 minutes, leafy greens just need to wilt; peppers or zucchini should soften and brown slightly. 5. Meanwhile, prepare your carb: toast the whole wheat bread until golden, or warm and slice the baked potato. 6. Plate the scramble with the toast or potato alongside.",
 "oil": "A teaspoon of avocado oil (smoke point ~520F) or olive oil works here. Use avocado for a faster, browner crisp at medium-high heat; if you use olive oil, keep the heat to medium (its ~375F smoke point) so it doesn't burn. A mist of spray oil keeps it lighter if you'd rather spend the fat on the avocado.",
 "season": "Optional: turmeric plus a pinch of black salt (kala namak) make it taste eggy, along with garlic powder, onion powder, salt and pepper. Turmeric is what gives it that classic scramble color, optional, but it's the move.",
 "note": "A savory plant-based scramble: golden crumbled tofu with cooked vegetable and a side of toast or potato.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large nonstick pan, paper towels, and 5 containers. Toast the bread fresh each morning, not now.\n2. Crumble the tofu into small pieces with your hands and press it dry between paper towels. Dry tofu browns, wet tofu steams.\n3. Heat the oil over medium-high and cook the tofu 5 to 7 minutes, stirring, until it stops releasing water and starts to colour.\n4. Add the turmeric, black salt and your seasonings now so they toast into the tofu rather than sitting on top.\n5. Stir in your vegetable for the last 2 minutes. Leafy greens only need to wilt.\n6. Cool uncovered 20 minutes, then portion. Bread stays in the bag.\n7. Storage: fridge 4 days. Do not freeze, the tofu goes spongy.\n8. Reheat: microwave 90 seconds or a hot pan for 3. Toast the bread while it reheats.",
 "makes": 5
},
 {
 "id": "tempeh-sweet-potato-hash",
 "title": "Tempeh & Sweet Potato Breakfast Hash",
 "slot": "breakfast",
 "protein": "Tempeh|TVP",
 "carb": "Sweet potato baked|Potato baked",
 "fat": "Avocado raw|Olive oil",
 "produce": "Bell pepper red|Kale cooked|Spinach cooked",
 "prefProduce": "Bell pepper red",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Cut the tempeh and your cooked carb (baked sweet potato or baked potato, whichever your plan lists) into small, even cubes about half an inch. 2. Heat a teaspoon of oil in a pan over medium-high heat. 3. Add the tempeh and potato cubes in a single layer and cook 6-8 minutes, tossing every couple of minutes, until browned and crisp at the edges. 4. Toss in your vegetable (red bell pepper, cooked kale, or cooked spinach, whichever your plan lists) for the last 3 minutes, peppers should soften, greens should wilt. 5. Slide onto a plate and top with sliced avocado.",
 "oil": "Avocado or canola oil for the higher-heat crisp (both sit around 400-520F and won't smoke). If you only have olive oil, keep the heat at medium. The avocado on top is your finishing fat, so a light pan coat is plenty.",
 "season": "Optional: smoked paprika, cumin, garlic powder, salt and pepper, and a dash of hot sauce. A small maple drizzle plays surprisingly well against the smoky tempeh if you like sweet-savory.",
 "note": "A hearty savory hash: crisped tempeh and potato with cooked vegetable, topped with avocado.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large skillet or two sheet pans, a knife, and 5 containers.\n2. Cut the tempeh and the cooked potato into even half-inch cubes. Even cubes brown at the same rate.\n3. Heat the oil over medium-high and lay the tempeh and potato in a single layer. Leave them alone 4 minutes before stirring, that is where the crust comes from.\n4. Cook 10 to 12 minutes total, turning a few times, until the edges are dark.\n5. Season while it is still hot.\n6. Cool uncovered 20 minutes, then portion.\n7. Storage: fridge 4 days. Tempeh holds better than almost anything else on the list.\n8. Reheat: a hot dry pan for 4 minutes gets the crust back. The microwave makes it soft but works.",
 "makes": 5
},
 {
 "id": "teriyaki-seitan-rice-bowl",
 "title": "Teriyaki Seitan & Rice Bowl",
 "slot": "dinner",
 "protein": "Seitan",
 "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado raw|Olive oil",
 "produce": "Broccoli cooked|Bell pepper red|Cabbage cooked",
 "prefProduce": "Broccoli cooked",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Slice the seitan into thin strips. 2. Heat a teaspoon of oil in a pan over high heat until it shimmers. 3. Add the seitan and sear 4-5 minutes, turning once or twice, until browned and a little crisp at the edges. 4. Toss in your vegetable (cooked broccoli, red bell pepper, or cooked cabbage, whichever your plan lists) for the last 3 minutes so it stays crisp-tender. 5. Near the end, pour in a splash of tamari (gluten-free soy sauce) or gluten-free teriyaki and toss to glaze everything. 6. Warm your rice (brown or white, whichever your plan lists) and spoon the seitan and vegetable over the top.",
 "oil": "Use avocado oil (~520F) or canola (~450F), searing seitan wants high heat so it browns instead of steams. Keep olive oil for medium heat only. A quick mist of spray oil also works, since the tamari (gluten-free soy sauce) carries the flavor.",
 "season": "Optional: tamari (gluten-free soy sauce) or gluten-free teriyaki, fresh garlic and ginger, a drizzle of sriracha, and a sprinkle of sesame seeds or green onion. A little honey or maple in the glaze makes it taste like takeout (use maple to keep it vegan).",
 "note": "A high-protein plant bowl: seared seitan glazed with gluten-free teriyaki over rice with crisp-tender vegetable.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large skillet, a saucepan, and 5 containers plus 5 small tubs.\n2. Cook the rice and spread it on a tray to cool.\n3. Slice the seitan into thin strips.\n4. Get the pan properly hot, then sear the seitan in two batches 4 to 5 minutes until browned and crisp at the edges.\n5. Add the vegetables for the last 3 minutes so they stay crisp-tender.\n6. Keep the tamari glaze in tubs rather than tossing it through now. Glazed seitan goes soft and salty in the fridge.\n7. Portion: rice, then seitan and vegetables.\n8. Storage: fridge 4 days. Seitan is the most prep-friendly protein in the whole plan.\n9. Reheat: hot dry pan 3 minutes, then add the glaze.",
 "makes": 5
},
 {
  "id": "seitan-pepper-stir-fry",
  "title": "Seitan & Pepper Stir-Fry",
  "slot": "dinner",
  "protein": "Seitan",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil|Peanuts",
  "produce": "Bell pepper red|Cabbage cooked|Broccoli cooked",
  "prefProduce": "Bell pepper red",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Slice the seitan into thin strips and have everything ready by the stove, stir-frying moves fast. 2. Heat a teaspoon of oil in a wok or wide pan over high heat until it's ripping hot and just shimmering. 3. Add the seitan and stir-fry 3-4 minutes, tossing constantly, until browned. 4. Add your vegetable (red bell pepper, cooked cabbage, or cooked broccoli, whichever your plan lists) and toss another 2-3 minutes so it stays crisp and bright. 5. Hit it with a splash of tamari (gluten-free soy sauce) and a squeeze of sriracha and toss once more. 6. Serve over warm rice (white or brown, whichever your plan lists).",
  "oil": "High-heat stir-fry calls for avocado oil (~520F) or canola (~450F). Do NOT use olive or flax here, they smoke and turn bitter at stir-fry heat. A teaspoon is plenty since the pan is hot and fast. (Peanuts are a topping, not the cooking oil, see the season line.)",
  "season": "Optional: tamari (gluten-free soy sauce), sriracha, garlic, ginger, a pinch of red pepper flakes, sesame seeds. Crushed peanuts on top add crunch and a restaurant-bowl feel.",
  "note": "A fast, fiery plant stir-fry: seitan and vegetable in a tamari-sriracha glaze over rice.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
 "id": "seitan-quinoa-power-bowl",
 "title": "Seitan & Quinoa Power Bowl",
 "slot": "lunch",
 "protein": "Seitan",
 "carb": "Quinoa cooked|Brown rice cooked|Riced cauliflower cooked",
 "fat": "Avocado raw|Olive oil",
 "produce": "Kale cooked|Spinach cooked|Broccoli cooked",
 "prefCarb": "Quinoa cooked",
 "prefProduce": "Kale cooked",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Slice the seitan into strips. 2. Heat a teaspoon of avocado oil in a pan over medium-high heat and sear the seitan 4-5 minutes, turning once, until golden. 3. Warm your cooked carb (quinoa or brown rice, whichever your plan lists). 4. If your plan lists cooked kale, put it in a bowl with a small drizzle of olive oil and a squeeze of lemon and massage it with your hands for about a minute until it softens and darkens; if your plan lists cooked spinach or cooked broccoli, simply warm it. 5. Build the bowl: grain on the bottom, then the vegetable, then the seitan, and finish with sliced avocado on top.",
 "oil": "Sear the seitan in avocado oil (high smoke point) for a good crust, then drizzle extra-virgin olive oil raw (no heat) over the greens and bowl as the finishing fat, exactly the job EVOO does best.",
 "season": "Optional: lemon juice, garlic, cumin or smoked paprika, salt and pepper, and a spoonful of hummus or a tahini-style drizzle. A squeeze of lemon over the whole bowl wakes everything up.",
 "note": "A hearty grain bowl: seared seitan over quinoa or rice and cooked greens, topped with avocado.",
 "extras": [
  [
   "Hummus",
   30
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large skillet, a saucepan, and 5 containers.\n2. Cook the quinoa and spread it on a tray to cool.\n3. Slice the seitan into strips.\n4. Get the pan hot, then sear the seitan in two batches 4 to 5 minutes until golden. One crowded pan gives you grey seitan.\n5. Warm or steam your vegetable until just tender and cool it quickly.\n6. Portion quinoa first, then seitan and vegetables.\n7. Storage: fridge 4 days.\n8. Reheat: hot dry pan 3 minutes, or microwave 2 minutes.",
 "makes": 5
},
 {
  "id": "kefir-berry-protein-smoothie",
  "title": "Kefir Berry Protein Smoothie",
  "slot": "breakfast",
  "protein": "Kefir plain|Greek yogurt plain nonfat|Whey protein",
  "prefProtein": "Kefir plain",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Chia seeds|Flaxseed|Almond butter",
  "prefFat": "Chia seeds",
  "produce": "Blueberries raw|Strawberries raw|Raspberries raw|Banana raw",
  "prefProduce": "Blueberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. No cooking needed. 2. Add your protein to the blender (plain kefir; or nonfat plain Greek yogurt with a splash of milk to loosen it; or a scoop of whey protein with water or milk, whichever your plan lists). 3. Add the dry oats, your berries (blueberries, strawberries, raspberries, or banana, whichever your plan lists), and your fat (chia seeds, flaxseed, or almond butter, whichever your plan lists). 4. Blend 30-60 seconds until completely smooth. 5. Pour and drink. Overnight-oats option: instead of blending, stir everything together in a jar and chill at least 4 hours.",
  "oil": "No cooking oil, your seeds or nut butter (chia, flaxseed, or almond butter) are the finishing fat and add fiber. If you used kefir, it also brings live cultures.",
  "season": "Optional: a little vanilla, cinnamon, and a pinch of salt. A handful of spinach blends in invisibly and adds a plant point for your gut.",
  "note": "A creamy protein smoothie: your protein blended with berries, oats, and seeds or nut butter, thick and filling in one glass."
 },
 {
 "id": "miso-glazed-salmon-rice-bowl",
 "title": "Miso-Glazed Salmon Rice Bowl",
 "slot": "dinner",
 "protein": "Salmon|Mackerel jack canned|Salmon pink canned",
 "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado raw|Olive oil",
 "produce": "Broccoli cooked|Asparagus cooked|Kale cooked|Bell pepper red",
 "prefProduce": "Broccoli cooked",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Whisk a teaspoon of certified gluten-free miso paste with a small splash of water until smooth, then brush it over the salmon. 2. Cook the salmon one of two ways: roast at 400F for 10-12 minutes, or sear in a hot pan with a little avocado oil for 8-10 minutes, until it flakes easily with a fork and is opaque in the center. 3. Steam or warm your vegetable (cooked broccoli, asparagus, kale, or red bell pepper, whichever your plan lists) until tender-crisp. 4. Warm your rice (brown or white, whichever your plan lists). 5. Build the bowl: rice on the bottom, salmon and vegetable on top, then finish with sliced avocado.",
 "oil": "Sear in avocado oil (high smoke point) or roast in the oven. The salmon brings its own omega-3 fats and the avocado finishes the bowl, so you barely need added oil.",
 "season": "Optional: the certified gluten-free miso glaze (fermented = gut-friendly), plus ginger, garlic, a drizzle of tamari (gluten-free soy sauce), and a sprinkle of sesame seeds. A squeeze of lime at the end is great.",
 "note": "An omega-3-rich gut bowl: certified gluten-free miso-glazed salmon over rice with vegetable and avocado.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 1, "prepMethod": "1. Equipment: a sheet pan, parchment, a small bowl, a saucepan, and 4 containers. Heat the oven to 400F.\n2. Cook the rice and spread it on a tray to cool quickly. Warm rice sealed in a container goes gluey.\n3. Whisk the miso paste with a splash of water until smooth and brush it over the salmon.\n4. Roast the salmon 10 to 12 minutes until it flakes and is just opaque in the middle. Cook all 4 portions, salmon holds better than white fish.\n5. Steam your vegetable until tender-crisp and cool it under cold water so it keeps its color.\n6. Portion: rice on the bottom, salmon and vegetable on top. Keep the avocado out.\n7. Storage: fridge 3 days. If your plan says to freeze a container, freeze it on the cook day and move it to the fridge the night before.\n8. Reheat: microwave 90 seconds, or 325F oven for 8 minutes. Slice the avocado fresh at serving.",
 "makes": 4
},
 {
  "id": "kimchi-fried-rice-bowl",
  "title": "Kimchi Fried Rice Bowl",
  "slot": "dinner",
  "protein": "Chicken breast|Chicken thigh|Egg whole|Tofu firm|Chicken leg quarters roasted|TVP",
  "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Kimchi",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Prep your protein (cut chicken breast or chicken thigh into bite-sized pieces; or beat the egg; or crumble the firm tofu, whichever your plan lists). 2. Heat a teaspoon of oil in a pan over high heat. 3. Cook the protein until done: chicken 5-7 minutes until no longer pink inside, tofu 5-6 minutes until golden, egg scrambled 1-2 minutes; then push it to one side of the pan. 4. Add your cooked rice (brown or white, whichever your plan lists) to the empty side and press it flat, letting it crisp undisturbed for 3-4 minutes. 5. Roughly chop the kimchi, then fold it in along with a splash of its juice and toss everything together 2-3 minutes until fragrant. 6. If you eat eggs, top with a fried or soft egg.",
  "oil": "High-heat stir-fry calls for avocado or canola oil (not olive or flax, which smoke at this heat). A little goes a long way once the pan is hot.",
  "season": "Optional: the kimchi is the star (fermented and gut-loving), plus garlic, a dash of tamari (gluten-free soy sauce) and sriracha, and a sprinkle of sesame seeds and green onion.",
  "note": "A punchy fermented-rice bowl: crisped rice and protein folded with live-culture kimchi.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "shakshuka-eggs-tomato-pepper",
  "title": "Shakshuka, Eggs Poached in Spiced Tomato & Pepper",
  "slot": "breakfast",
  "protein": "egg white",
  "carb": "pita bread|whole wheat bread",
  "fat": "olive oil",
  "produce": "tomato|bell pepper red|onion",
  "prefProduce": "tomato",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. Dice the onion and red bell pepper. 2. Heat a tablespoon of olive oil in a wide pan over medium heat and saute the onion and pepper 5-6 minutes until soft, adding minced garlic for the last minute. 3. Stir in the chopped tomato (or a splash of marinara) and simmer 8-10 minutes, stirring now and then, until thick and jammy. 4. Make little wells in the sauce with the back of a spoon and crack your eggs straight into them (use whole eggs, egg whites, or both, whichever your plan lists). 5. Cover the pan and poach over medium-low heat 5-8 minutes, until the whites are set but the yolks stay runny (cook a little longer if using whites only). 6. Take the pan off the heat. If you eat dairy and your plan lists feta, crumble it over the top. 7. Warm your carb (pita or whole wheat bread, whichever your plan lists) and serve alongside for scooping.",
  "oil": "Olive oil at medium heat (~375F smoke point) is exactly right, you're sweating vegetables and building a sauce, never searing, so the oil stays well under its smoke point and lends its fruity flavor to the base.",
  "season": "Optional: cumin, sweet paprika, and a pinch of cayenne are the classic North African trio; finish with chopped parsley or cilantro. Salt the sauce, then go easy once the feta lands, it brings its own.",
  "note": "The North African / Middle Eastern brunch classic: eggs gently poached in a cumin-and-paprika tomato sauce, scooped up with warm bread. Add feta if you eat dairy, or skip it for an ovo-friendly version.",
  "eggBase": 2,
  "extras": [
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
  "id": "smoked-salmon-cream-cheese-bagel",
  "title": "Smoked-Salmon-Style Bagel with Cream Cheese & Cucumber",
  "slot": "breakfast",
  "protein": "salmon|cream cheese|Mackerel jack canned|Salmon pink canned",
  "carb": "bagel plain|rye bread",
  "fat": "cream cheese",
  "produce": "cucumber|onion|tomato",
  "prefProtein": "salmon",
  "prefProduce": "cucumber",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. No real cooking. 2. Slice and toast your carb (plain bagel or rye bread, whichever your plan lists) until golden. 3. Spread a generous layer of cream cheese on each cut side. 4. Flake the salmon over the top. 5. Wash and thinly slice your vegetable (cucumber, onion, or tomato, whichever your plan lists) and pile it on, if using onion, a few thin rings go a long way. 6. Eat it open-faced, or close it into a sandwich.",
  "oil": "No cooking oil needed, the cream cheese is the finishing fat and does all the richness work, so spend your fat grams there rather than on a pan. A squeeze of lemon brightens the whole thing.",
  "season": "Optional: capers, fresh dill, cracked black pepper, and a squeeze of lemon are the deli-counter move. Chopped ripe olives play nicely if you want more brine.",
  "note": "A lox-and-schmear deli bagel done with flaked salmon: toasted bagel, cream cheese, and fresh vegetable. Five minutes, no stove, eats like a weekend.",
  "extras": [
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "egg-black-bean-cheddar-breakfast-burrito",
  "title": "Egg, Black Bean & Cheddar Breakfast Burrito",
  "slot": "breakfast",
  "protein": "egg whole|egg white|black beans|cheddar cheese",
  "carb": "flour tortilla|Mission Carb Balance tortilla",
  "fat": "cheddar cheese|Avocado raw",
  "produce": "bell pepper red|onion|tomato",
  "prefCarb": "Mission Carb Balance tortilla",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Set out your protein. If it's whole eggs or egg whites, crack 2-3 into a bowl and beat with a fork until even-colored; if it's black beans or cheddar cheese as the protein, just have them ready. 2) Heat a nonstick pan over medium with a light mist of spray oil. Add your vegetable (red bell pepper, onion, or tomato, whichever your plan lists), diced small, and cook 3-4 minutes until softened (tomato just needs 1-2 minutes to break down). 3) Add the black beans and warm them through for 3-4 minutes, gently mashing about a third of them with the back of a spoon so the filling holds together. 4) If you're using eggs, push the veg to one side, lower the heat to medium-low, pour in the beaten egg, and softly stir for 2-3 minutes until just set but still glossy, don't overcook. 5) Fold in the cheddar cheese (if you eat dairy) and stir 30 seconds off the heat until it melts into the filling. 6) Warm your tortilla (flour or Mission Carb Balance, whichever your plan lists) for about 15 seconds in a dry pan or microwave so it folds without cracking. If there is no tortilla on your list, skip this step and serve the filling as a bowl. 7) Pile the filling down the center, add sliced avocado here if avocado is your fat, fold in the sides, and roll it tight from the bottom. 8) For a crisp shell, set the burrito seam-side down in a dry or very lightly oiled pan over medium-high and sear 1-2 minutes per side until golden. Slice in half and serve.",
  "oil": "Use a light spray oil for the filling. For the optional crisped shell, use a thin film of avocado oil, its high ~520F smoke point handles the medium-high griddle sear without smoking or turning bitter. Skip EVOO or butter for that sear; they'd scorch at that heat. If avocado is on your list, keep it raw inside the burrito rather than frying it.",
  "season": "Optional: cumin, chili powder, and garlic powder stirred into the beans, plus salt and pepper to taste. Salsa folded in or served alongside, and hot sauce at the table for anyone who wants it.",
  "note": "A handheld breakfast burrito: saucy black beans, soft veg, and your protein rolled in a tortilla and griddled crisp.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "black beans",
    40
   ]
  ]
 },
 {
  "id": "savory-miso-scallion-oats-soft-egg",
  "title": "Savory Miso & Scallion Oats with a Soft Egg",
  "slot": "breakfast",
  "protein": "egg white",
  "carb": "oats cooked|oats dry \\(raw\\)",
  "fat": "olive oil|butter salted",
  "produce": "spinach|bok choy",
  "prefProduce": "mushrooms",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1) Make the oats. If your plan lists dry (raw) oats, simmer them in water (not milk) over medium heat for 4-5 minutes, stirring, until creamy and porridge-like; if it lists already-cooked oats, just warm them through with a splash of water until loose. 2) Off the heat, whisk in a small spoonful of certified gluten-free miso paste, keeping it off direct heat keeps the flavor savory and alive. Set the oats aside, covered, to stay warm. 3) Cook your vegetable (zucchini, spinach, or bok choy, whichever your plan lists). Heat a little olive oil in a pan over medium. For zucchini, slice and saute 4-5 minutes until browned; for spinach, wilt 1-2 minutes; for bok choy, slice and saute 3-4 minutes until the stems are just tender. 4) Cook the egg. In the same pan (wipe it first), fry your egg, whole eggs for a runny yolk (cook 2-3 minutes, lid on at the end for a set white), or beat and softly scramble egg whites for 1-2 minutes. 5) Spoon the savory oats into a bowl, top with the cooked vegetable, then slide the egg on top so a runny yolk can spill into the porridge.",
  "oil": "Olive oil at medium heat (~375F) browns the vegetable cleanly and suits this savory bowl; a small pat of salted butter (keep the heat under ~350F) is a richer swap if butter is on your list.",
  "season": "Optional: a few drops of tamari (gluten-free soy sauce), a little sriracha, sliced scallion, and a finishing drizzle of toasted sesame oil, congee energy. Hold off on extra salt at first; the certified gluten-free miso and tamari already bring plenty.",
  "note": "Savory oats stirred with certified gluten-free miso, topped with a cooked vegetable and a soft egg, like a quick congee.",
  "eggBase": 2,
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "baked-tofu-zucchini-mediterranean-frittata",
  "title": "Baked Tofu, Zucchini & Tomato Frittata (Vegan)",
  "slot": "breakfast",
  "protein": "Tofu firm|TVP",
  "carb": "potato baked|whole wheat bread",
  "fat": "olive oil",
  "produce": "zucchini|tomato|spinach|onion",
  "prefProduce": "zucchini",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Heat the oven to 375F. 2) Make the tofu base: drain the firm tofu, blend it smooth with a splash of water (and the seasonings below) until it pours like a loose, thick batter, no lumps. 3) In an oven-safe skillet, warm olive oil over medium heat. Add your vegetables (zucchini, tomato, spinach, and onion, use whichever your plan lists, sliced or chopped) and saute 5-6 minutes until softened; spinach only needs 1-2 minutes to wilt, and if tomato is your produce, halve it and set it aside to scatter on top in the next step. 4) Pour the blended tofu evenly over the vegetables in the skillet, then scatter any reserved halved tomato on top. 5) Bake 20-25 minutes until the top is set (doesn't jiggle when you nudge the pan) and the edges are golden. 6) Let it rest 3-5 minutes so it firms up, then slice into wedges. 7) Serve with your carb (baked potato, crisped, or whole wheat toast, whichever your plan lists).",
  "oil": "Olive oil (~375F) is ideal double-duty here: it sits right at its comfort zone for both the medium-heat stovetop saute and the 375F bake, and it adds Mediterranean flavor. Refined avocado oil works too if you want more headroom, but at this temperature olive oil is the better-tasting choice.",
  "season": "Optional: blend turmeric and a pinch of black salt (kala namak) into the tofu for an eggy color and flavor, plus garlic powder, oregano, and black pepper. Crumble feta over the wedges if you eat dairy.",
  "note": "A sliceable eggless frittata, blended firm tofu baked firm around Mediterranean vegetables, cut into wedges for meal prep.",
  "extras": [
   [
    "Tzatziki",
    30
   ]
  ]
 },
 {
  "id": "ricotta-fig-honey-toast",
  "title": "Whipped Ricotta Toast with Figs, Honey & Pistachios",
  "slot": "breakfast",
  "protein": "Ricotta cheese part skim",
  "carb": "Rye bread|Whole wheat bread",
  "fat": "Pistachios",
  "produce": "Figs raw|Pear raw",
  "prefProtein": "Ricotta cheese part skim",
  "prefCarb": "Rye bread",
  "prefProduce": "Figs raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Toast your bread (rye or whole wheat, whichever your plan lists) until crisp and golden. 2) While it toasts, put the part-skim ricotta in a small bowl and whip it with a fork or small whisk for about 30 seconds until it's light, fluffy, and spreadable. 3) Spread the whipped ricotta thickly over the warm toast. 4) Slice your fruit (fresh figs or pear, whichever your plan lists) thin and fan it over the ricotta. 5) Drizzle with honey and scatter chopped pistachios on top. 6) Eat right away, while the toast is still warm and the ricotta is cool.",
  "oil": "No cooking oil. Nothing is fried, the bread is dry-toasted and the pistachios are the finishing fat, sprinkled on raw for crunch and a buttery, green richness against the sweet fruit.",
  "season": "Optional: flaky salt and cracked black pepper over the honey (the move that makes it pop), plus a grate of orange or lemon zest and a few torn mint leaves.",
  "note": "An Italian-style sweet toast: cool whipped ricotta on crisp toast with sweet fruit, honey, and crunchy pistachios.",
  "extras": [
   [
    "Honey",
    10
   ]
  ]
 },
 {
  "id": "swiss-bircher-muesli-apple-raisin",
  "title": "Swiss Bircher Muesli with Grated Apple & Raisins",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat|Greek yogurt plain whole|Kefir plain low-fat",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Walnuts|Hazelnuts",
  "produce": "Apple raw with skin|Raisins",
  "prefProtein": "Greek yogurt plain nonfat",
  "prefFat": "Walnuts",
  "prefProduce": "Apple raw with skin",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cooking. The night before, put the dry (raw) oats in a bowl or jar. 2) Add a splash of almond milk and a spoonful of your protein (nonfat or whole Greek yogurt, or low-fat kefir, whichever your plan lists). Stir until the oats are fully coated and the mix is loose. 3) Grate your fruit (apple with skin, or raisins, whichever your plan lists) straight into the bowl; if it's apple, grate the whole thing skin and all; if it's raisins, just stir in a small handful. 4) Stir again, cover, and refrigerate overnight so the oats soften and the apple goes mellow. 5) In the morning, stir, and loosen with a little more almond milk if it's too thick. 6) Top with chopped nuts (walnuts or hazelnuts, whichever your plan lists).",
  "oil": "No cooking oil. This is the original no-cook overnight cereal; the nuts are the finishing fat, raw on top, adding a toasty crunch against the soft soaked oats.",
  "season": "Optional: cinnamon and a tiny splash of vanilla in the soak, plus a squeeze of lemon over grated apple so it stays bright. A thread of honey only if you want it sweeter.",
  "note": "The original Swiss Bircher muesli: oats soaked overnight with yogurt and fruit, finished with chopped nuts."
 },
 {
  "id": "mango-coconut-chia-pudding-kiwi",
  "title": "Tropical Mango Chia Pudding with Kiwi",
  "slot": "breakfast",
  "protein": "Whey protein powder|Greek yogurt plain nonfat",
  "fat": "Chia seeds|Coconut oil",
  "produce": "Mango raw|Kiwifruit raw",
  "prefProduce": "Mango raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cooking. In a jar or bowl, whisk the chia seeds into unsweetened almond milk along with a scoop of your protein (whey protein powder, or fold in nonfat Greek yogurt, whichever your plan lists) until there are no clumps. 2) Wait 5 minutes, then whisk again, this second whisk keeps the seeds suspended evenly instead of sinking and clumping at the bottom. 3) Cover and refrigerate at least 3 hours, or overnight, until it sets into a thick, spoonable pudding. 4) In the morning, give it a stir. 5) Top with your fruit (diced fresh mango or sliced kiwi, whichever your plan lists).",
  "oil": "No cooking oil. The chia seeds are both the fat and the setting agent, they soak up the milk and gel the pudding, so there's no pan and no heat at all.",
  "season": "Optional: a splash of vanilla and a pinch of lime zest in the base for a tropical lift, and a scatter of unsweetened shredded coconut on top if you have it.",
  "note": "A make-ahead chia pudding set overnight, crowned with fresh tropical fruit. Swap whey for Greek yogurt."
 },
 {
  "id": "peach-cobbler-baked-oats",
  "title": "Peach Cobbler Baked Oats with Pecans",
  "slot": "breakfast",
  "protein": "Whey protein powder|Cottage cheese 2%",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Pecans",
  "produce": "Peach raw",
  "prefProduce": "Peach raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Heat the oven to 350F and lightly mist a small ramekin with spray oil. 2) In a blender, combine the dry (raw) oats, a scoop of your protein (whey protein powder, or 2% cottage cheese for extra creaminess, whichever your plan lists), a splash of almond milk (or one egg if you eat eggs, for lift), and a little baking powder. Blend into a loose, pourable batter. 3) Dice your fresh peach. Fold most of it into the batter. 4) Pour the batter into the ramekin, then press the remaining peach and the chopped pecans onto the top. 5) Bake 22-28 minutes, until the top is set and golden and a toothpick poked into the center comes out clean. 6) Cool a few minutes before eating, it firms up as it rests.",
  "oil": "Just a light mist of spray oil to coat the ramekin so the baked oats release cleanly. The pecans are the real finishing fat, baked on top where they toast and turn buttery, nothing is fried.",
  "season": "Optional: cinnamon and a little nutmeg in the batter plus a splash of vanilla to nail the cobbler flavor, with a thread of maple syrup over the top out of the oven. A pinch of salt makes the peach taste sweeter.",
  "note": "A warm single-serve baked oats that eats like peach cobbler: tender peach baked into a fluffy protein-oat base with toasted pecans."
 },
 {
  "id": "cherry-kefir-smoothie-bowl-pomegranate",
  "title": "Cherry-Vanilla Kefir Smoothie Bowl with Pomegranate",
  "slot": "breakfast",
  "protein": "Kefir plain low-fat|Whey protein powder|Greek yogurt plain whole",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Pumpkin seeds",
  "produce": "Cherries sweet raw|Pomegranate raw",
  "prefProtein": "Kefir plain low-fat",
  "prefProduce": "Cherries sweet raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cooking, just blend. Add your liquid base and protein to the blender first, low-fat kefir, whey protein powder, or whole Greek yogurt (whichever your plan lists); if it's whey, add a little unsweetened almond milk so it blends. 2) Add your fruit (pitted sweet cherries or pomegranate, whichever your plan lists; frozen cherries make it thicker), plus a small spoon of the dry (raw) oats for body. 3) Blend 30-45 seconds into a thick, spoonable smoothie, keep it thicker than a drink so it holds the toppings. 4) Pour into a bowl. 5) Top with a little extra fresh fruit and a scatter of pumpkin seeds.",
  "oil": "No cooking oil. Pumpkin seeds are the finishing fat, sprinkled on for a green, crunchy contrast to the creamy base; nothing is heated, so there's no smoke point in play.",
  "season": "Optional: a splash of vanilla and a tiny pinch of cinnamon in the blend. The fizzy tang of kefir does the rest, a thread of honey only if your fruit is tart.",
  "note": "A thick smoothie bowl built on gut-friendly kefir and fruit, finished with a crunchy pumpkin-seed topping."
 },
 {
  "id": "tofu-migas-black-bean-tacos",
  "title": "Migas Breakfast Tacos with Black Beans & Salsa",
  "slot": "breakfast",
  "protein": "Egg whole|Egg white|Tofu firm|Black beans",
  "carb": "Mission Carb Balance tortilla|corn tortilla",
  "fat": "Avocado raw|Avocado oil",
  "produce": "Bell pepper red|Onion raw|Tomato raw",
  "prefProduce": "Bell pepper red",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Make the migas base. Tear or cut 1 to 2 corn or Carb Balance tortillas into small strips. Heat a little avocado oil in a nonstick pan over medium-high and fry the strips 2 to 3 minutes, stirring, until lightly crisp. 2) Add your vegetable (diced red bell pepper, onion, or tomato, whichever your plan lists) and cook 2 to 3 minutes to soften. 3) Add your protein. For eggs, pour in beaten whole eggs or egg whites and gently scramble them with the crispy tortilla strips 2 to 3 minutes until just set. For tofu, crumble firm tofu in first and crisp it 5 to 6 minutes before the veg. For black beans, just warm them through 2 to 3 minutes. 4) Fold in the black beans if your plan also lists them and warm 1 to 2 minutes. 5) Spoon the migas into warm tortillas, top with sliced avocado (if avocado is your fat, keep it raw on top) and a big spoon of salsa.",
  "oil": "Refined avocado oil (~520F) is the pick because the tofu wants high heat to brown rather than steam, and avocado oil holds that heat clean. If avocado is on your list, slice it raw on top as the real finishing fat and just lightly coat the pan; a mist of spray oil also works if the fat budget is tight.",
  "season": "turmeric only if using tofu (for color), plus cumin, smoked paprika, garlic powder, and chopped cilantro. A squeeze of lime over the top right before folding wakes it all up.",
  "note": "Tex-Mex breakfast migas: eggs scrambled with crispy tortilla strips, peppers, and black beans in warm tortillas with avocado and salsa. Vegan version swaps in crumbled tofu.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Black beans cooked",
    40
   ]
  ],
  "prefProtein": "Egg whole|Egg white|Tofu firm"
 },
 {
 "id": "almond-butter-mango-stovetop-oats",
 "title": "Creamy Almond Butter Oats with Mango & Coconut",
 "slot": "breakfast",
 "protein": "Pea & rice protein powder|Whey protein powder|Greek yogurt plain whole|Almond butter|Hemp seeds",
 "carb": "Oats cooked|Oats dry \\(raw\\)",
 "fat": "Almond butter|Coconut oil|Olive oil",
 "produce": "Mango raw|Peach raw|Banana raw",
 "prefProduce": "Mango raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) Cook the oats. If your plan lists dry (raw) oats, simmer them in unsweetened almond milk over medium-low heat for 4-6 minutes, stirring, until creamy and thick; if it lists already-cooked oats, just warm them through with a splash of almond milk. 2) Pull the pan off the heat and stir in your protein/fat: melt in the almond butter until it disappears into the porridge, or whisk in whey protein powder, or fold in whole Greek yogurt, or stir in hemp seeds, whichever your plan lists.  3) Top with your fruit (diced fresh mango, sliced peach, or sliced banana, whichever your plan lists). 4) Finish with a drizzle of maple syrup.",
 "oil": "No cooking oil needed, when almond butter is your fat, it's the finishing fat and goes in off the heat, so there's no pan to worry about. If coconut oil is on your list, melt about a quarter-teaspoon into the hot oats for a faint toasted-coconut note (it stays well under its ~350F limit since the oats are already off direct heat).",
 "season": "Optional: a pinch of cinnamon and a splash of vanilla in the oats, plus a tiny pinch of salt to make the nut butter pop. A few flakes of unsweetened shredded coconut or a squeeze of lime over the fruit leans it tropical.",
 "note": "Warm stovetop oats made creamy with almond milk, topped with fresh fruit and a maple drizzle, tropical and grab-a-spoon cozy.",
 "batchQ": 3, "prepMethod": "1. Equipment: a saucepan, 5 jars or containers, and a spoon.\n2. Simmer the oats in the almond milk 4 to 6 minutes over medium-low until thick and creamy, stirring so they do not catch.\n3. Take them off the heat and stir the almond butter through while the oats are hot. It melts in properly now and seizes if you add it cold.\n4. Cool the oats completely before the lids go on.\n5. Portion into jars. Keep the mango and coconut in their own tubs so the fruit does not bleed into the oats overnight.\n6. Storage: fridge 4 days. Oats thicken as they sit.\n7. Reheat: microwave 90 seconds with a splash of milk and stir, or eat them cold like overnight oats. Add the mango and coconut at serving.",
 "makes": 5
},
 {
  "id": "chocolate-raspberry-chia-overnight-oats",
  "title": "Chocolate-Raspberry Chia Overnight Oats",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat|Cottage cheese nonfat|Whey protein powder",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Almond butter|Chia seeds",
  "produce": "Raspberries raw|Strawberries raw|Blueberries raw",
  "prefProduce": "Raspberries raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) No cooking. The night before, in a jar stir together the dry (raw) oats, the chia seeds, unsweetened cocoa powder, and a splash of maple syrup into unsweetened almond milk until there are no cocoa lumps, it should look like a loose pudding. (Hemp seeds can go in here too.) 2) Cover and refrigerate at least 6 hours or overnight so the chia and oats swell and set thick. 3) In the morning, stir to loosen. 4) Swirl in a spoon of your fat (almond butter or extra chia seeds, whichever your plan lists). 5) Pile your fresh fruit on top (raspberries, strawberries, or blueberries, whichever your plan lists). Eat cold straight from the jar.",
  "oil": "No oil at all, this is a no-cook overnight soak. The chia seeds (and almond butter, if that's your fat) carry the fat, and nothing touches a pan, so there's no smoke point in play.",
  "season": "Optional: a splash of vanilla and a tiny pinch of salt sharpen the chocolate, and a few shavings of dark chocolate on top make it feel like dessert. Cinnamon plays nicely with the cocoa for a little warmth.",
  "note": "Make-ahead chocolate chia overnight oats with cocoa and almond milk, set thick overnight and topped with fresh berries.",
  "extras": [
   [
    "Sugar-free chocolate syrup",
    8
   ]
  ]
 },
 {
  "id": "southwest-sweet-potato-black-bean-hash",
  "title": "Southwest Sweet Potato & Black Bean Breakfast Hash",
  "slot": "breakfast",
  "protein": "Black beans|Pinto beans",
  "carb": "Sweet potato baked|Black beans",
  "fat": "Avocado raw|Avocado oil",
  "produce": "Bell pepper red|Onion raw|Kale cooked",
  "prefProduce": "Bell pepper red",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cube the baked sweet potato (if sweet potato is your carb). Heat a little avocado oil in a pan over medium-high and crisp the cubes 6-8 minutes, turning, until browned at the edges. 2) Add your vegetable (red bell pepper, onion, or cooked kale, whichever your plan lists), diced or chopped, and cook 3 minutes to soften (kale just needs 1-2 minutes to warm and wilt). 3) Fold in your beans (black beans or pinto beans, whichever your plan lists; these may be your protein, your carb, or both) and warm them through 3-4 minutes, pressing them flat now and then so they get a little crusty on the bottom. 4) Spoon into a bowl. 5) Top with sliced avocado (if avocado is your fat, keep it raw on top) and a spoon of salsa.",
  "oil": "Refined avocado oil (~520F) handles the high heat the sweet potato needs to caramelize without smoking; canola (~400F) is a fine swap. Keep olive oil to medium only, it turns bitter on a hard sear. If avocado is on your list, slice it raw on top as the finishing fat and just lightly coat the pan.",
  "season": "Optional: cumin, smoked paprika, chili powder, garlic powder, salt, and pepper, with a dash of hot sauce or salsa at the end. A squeeze of lime and chopped cilantro over the top makes the crispy-sweet-smoky thing really land.",
  "note": "A hearty plant-protein hash: caramelized sweet potato and crisped beans with peppers and onion, topped with avocado and salsa.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Avocado raw",
    40
   ]
  ]
 },
 {
  "id": "falafel-hummus-pita-bowl",
  "title": "Falafel & Hummus Mezze Bowl with Warm Pita",
  "slot": "lunch",
  "protein": "falafel",
  "carb": "pita bread|couscous cooked",
  "fat": "hummus|tahini|Olive oil",
  "produce": "cucumber raw|tomato raw|romaine lettuce|onion raw",
  "prefProtein": "falafel",
  "prefCarb": "pita bread",
  "prefFat": "hummus",
  "prefProduce": "cucumber raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Crisp the falafel. Heat a thin film of avocado oil in a skillet over medium-high and fry the falafel 2-3 minutes per side until the crust is deep golden and shattery (or bake at 400F for 15 minutes, flipping once). 2) Warm your carb. If it's pita, heat it 20-30 seconds in a dry pan or 10 seconds in the microwave so it stays soft and foldable; if it's cooked couscous, just warm it through and fluff with a fork. 3) Prep the produce: dice your cucumber, tomato, and onion and tear the romaine lettuce, use whichever your plan lists (cucumber, tomato, romaine lettuce, or onion), keeping raw onion thinly sliced and light. 4) Build the bowl. Spread your fat across the base if it's hummus (a smear under everything); if your fat is tahini, save it for the drizzle. Add the warm falafel, then pile on the prepped produce. 5) Tear the warm pita into the bowl or serve it on the side for scooping (or spoon the couscous in as the base). 6) Finish with a drizzle of tahini loosened with lemon juice and a little water (if tahini is your fat).",
  "oil": "Refined avocado oil (~520F smoke point) for crisping the falafel so it gets a hard golden crust without the oil smoking. The flavor fats here, hummus on the base or a tahini drizzle on top, whichever your plan lists, are raw and never see heat. Skip olive oil for the pan-fry; it would scorch before the falafel browns.",
  "season": "Optional: a squeeze of lemon over everything, plus sumac, za'atar, or a pinch of cumin on the falafel. Chopped fresh parsley or mint makes it taste like a real mezze spread. Salt lightly, the hummus and falafel already carry some.",
  "note": "A Levantine mezze bowl: crispy falafel over a hummus or tahini base with fresh chopped produce and warm pita.",
  "extras": [
   [
    "Tzatziki",
    30
   ]
  ]
 },
 {
  "id": "greek-oregano-chicken-couscous",
  "title": "Greek Oregano Chicken with Lemon Couscous & Feta",
  "slot": "lunch",
  "protein": "chicken breast cooked|chicken thigh cooked|Chicken leg quarters roasted",
  "carb": "couscous cooked",
  "fat": "feta cheese|olive oil",
  "produce": "tomato raw|cucumber raw|onion raw|spinach raw",
  "prefProtein": "chicken breast cooked",
  "prefFat": "feta cheese",
  "prefProduce": "tomato raw",
  "diets": [
   "omnivore"
  ],
  "method": "1) Marinate the protein: put your chicken (breast or thigh, whichever your plan lists) in a bowl with a squeeze of lemon juice, a teaspoon of olive oil, a big pinch of dried oregano, salt, pepper, and a little grated garlic. Let it sit 10-15 min while you prep everything else. 2) Sear it: heat a skillet over medium heat, add a thin film of olive oil, and lay the chicken in. Cook about 6-7 min per side. It's done when the thickest part is no longer pink and reads 165F on a thermometer. Move it to a plate, let it rest 5 min, then slice. 3) Dress the couscous: fluff the cooked couscous with a fork, then stir in some lemon zest, a splash of lemon juice, and a thread of olive oil so every grain is glossy and bright. 4) Prep your vegetable (tomato, cucumber, onion, or spinach, whichever your plan lists): dice the tomato or cucumber into small pieces; slice onion paper-thin; if it's spinach, just rinse and use raw as a bed or fold it in. 5) Build the plate: spoon the lemony couscous down first, lay the sliced chicken on top, scatter your vegetable around, then crumble the feta (if you eat dairy) generously over everything.",
  "oil": "Olive oil (about 375F smoke point) is right here because the chicken only sears at honest medium heat, which stays under that point so the oil won't smoke, and the same oil does double duty raw, dressing the couscous and finishing the plate, where its grassy, peppery flavor really shines. The feta is the second fat, adding salty creaminess with no heat at all. If you want a harder, darker char on the chicken, sear in avocado oil (520F) instead and keep the olive oil just for the couscous and the finish.",
  "season": "Optional: dried oregano (the signature), garlic, black pepper, lemon, and a splash of red wine vinegar in the marinade. A pinch of dried mint and fresh dill lean it more Greek; go easy on salt with the feta.",
  "note": "A bright Greek-taverna plate: lemon-oregano chicken over lemon-dressed couscous with a fresh vegetable and crumbled feta.",
  "extras": [
   [
    "Olives ripe",
    15
   ]
  ]
 },
 {
  "id": "salmon-bulgur-tabbouleh",
  "title": "Seared Salmon over Lemon-Herb Bulgur Tabbouleh",
  "slot": "lunch",
  "protein": "salmon atlantic farmed cooked|salmon atlantic wild cooked|salmon sockeye cooked|Mackerel jack canned|Salmon pink canned",
  "carb": "bulgur cooked",
  "fat": "avocado oil|Olive oil",
  "produce": "tomato raw|cucumber raw|onion raw",
  "prefProtein": "salmon atlantic wild cooked",
  "prefProduce": "tomato raw",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Make the tabbouleh first so the flavors mingle: in a bowl, combine the cooked, cooled bulgur with your vegetable (tomato, cucumber, or onion, whichever your plan lists), finely diced, plus as much chopped fresh parsley and mint as you like. Dress with plenty of lemon juice and a glug of olive oil, then toss. 2) Prep the salmon: pat the fillet (Atlantic farmed, Atlantic wild, or sockeye, whichever your plan lists) completely dry with a paper towel, dry skin is what gets crispy, and season both sides with salt and pepper. 3) Sear it: heat a skillet over medium-high with a thin film of avocado oil until it shimmers. Lay the salmon skin-side down and press gently for a few seconds so it stays flat. Cook 4-5 min until the skin is crisp and releases easily, then flip and cook 2-3 min more. It's done when it flakes with light pressure and the center reads 125-130F. 4) Plate it: mound the tabbouleh on the plate, lay the salmon on top, and finish with a squeeze of lemon and a drizzle of olive oil.",
  "oil": "Avocado oil (about 520F smoke point) is the cooking fat because crisping salmon skin needs a hot pan, olive oil (375F, medium-heat only) would smoke and turn bitter before the skin sets. Then use olive oil unheated to dress the bulgur and finish the plate, where its fruity flavor carries the raw salad without ever being scorched.",
  "season": "The soul of tabbouleh is loads of fresh parsley and mint, so be generous. Add lemon, black pepper, a little garlic in the dressing, and a pinch of cumin or allspice on the salmon. Optional garnish: extra lemon wedges. Salt to taste right at the end.",
  "note": "A Levantine plate: omega-3-rich seared salmon over a herb-heavy bulgur tabbouleh, all lifted with lemon and olive oil. Pescatarian-friendly."
 },
 {
  "id": "chickpea-feta-village-salad",
  "title": "Chickpea & Feta Village Salad with Olives",
  "slot": "lunch",
  "protein": "chickpeas|feta cheese",
  "carb": "chickpeas|pita bread",
  "fat": "feta cheese|olive oil|olives ripe",
  "produce": "tomato raw|cucumber raw|onion raw|bell pepper red raw",
  "prefProtein": "chickpeas",
  "prefCarb": "chickpeas",
  "prefFat": "feta cheese",
  "prefProduce": "tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cooking needed. Drain and rinse the chickpeas (they serve as both your protein and your carb here) and tip them into a big bowl. 2) Prep the vegetables, your produce (tomato, cucumber, onion, or red bell pepper, whichever your plan lists): cut tomato and cucumber into big rustic chunks, slice bell pepper into strips, and cut onion into thin half-moons. If you're using onion and want it milder, soak the slices in cold water for 5 min first, then drain. 3) Add the fat: scatter in the ripe olives. 4) Dress it: pour over a generous glug of extra-virgin olive oil and a splash of red wine vinegar or lemon juice, then toss everything gently. 5) Finish Greek-village style: break the feta into rough chunks (not fine crumbs) and lay them over the top so each forkful gets a piece. 6) If your plan lists pita as the carb instead of chickpeas, warm it and tear it for scooping; if it's chickpeas, you're done.",
  "oil": "Extra-virgin olive oil (about 375F smoke point) is used entirely raw as the dressing, so its lower smoke point doesn't matter at all, what matters is its peppery, grassy flavor, which is the whole personality of this salad. The feta and ripe olives bring the rest of the fat plus a salty, briny edge. There's no pan and no heat anywhere in this one.",
  "season": "Dried oregano crumbled between your fingers over the top is the classic move, with black pepper and a little lemon. Optional: a pinch of red pepper flakes for gentle warmth. The feta and olives are already salty, so taste before adding any salt.",
  "note": "A no-cook Greek village-style salad: chickpeas for staying power, big fresh vegetables, ripe olives, and slabs of feta in an olive oil dressing. Vegetarian (contains feta), not vegan.",
  "extras": [
   [
    "Tzatziki",
    30
   ]
  ]
 },
 {
  "id": "lentil-tahini-grain-bowl",
  "title": "Lentil & Roasted Veg Grain Bowl with Tahini-Lemon Sauce",
  "slot": "lunch",
  "protein": "lentils|chickpeas",
  "carb": "quinoa cooked|bulgur cooked|couscous cooked",
  "fat": "tahini|Olive oil",
  "produce": "eggplant cooked|zucchini cooked|bell pepper red raw|tomato raw",
  "prefProtein": "lentils",
  "prefCarb": "quinoa cooked",
  "prefFat": "tahini",
  "prefProduce": "eggplant cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Roast the vegetables: cut your produce (eggplant, zucchini, or red bell pepper, whichever your plan lists; if it's tomato, halve it) into bite-size pieces, toss with a little avocado oil, salt, and pepper, and spread on a baking sheet. Roast at 425F for 22-25 min, turning once halfway, until the edges caramelize and eggplant goes silky (peppers and tomato will need slightly less). 2) Warm the protein: heat the cooked lentils (or chickpeas, whichever your plan lists) through in a small pot or the microwave. 3) Make the sauce: whisk the tahini with lemon juice, a grated clove of garlic, a pinch of salt, and cold water a tablespoon at a time until it's creamy and pourable. 4) Build the bowl: spoon the warm grain (quinoa, bulgur, or couscous, whichever your plan lists) into the bowl, top with the lentils and roasted vegetables, then drizzle the tahini-lemon sauce heavily over everything.",
  "oil": "Avocado oil (about 520F smoke point) handles the 425F roast so the vegetables char and caramelize without the oil breaking down or turning bitter, olive oil would smoke at that temperature. The real flavor fat is the tahini sauce spooned over at the end; because it never touches heat, its nutty sesame richness stays full and fresh.",
  "season": "Cumin and smoked paprika on the roasting vegetables, plus garlic and lemon in the sauce. Optional garnish: chopped parsley and a pinch of sumac brighten the whole bowl. Salt the lentils and vegetables to taste.",
  "note": "A hearty plant-based Levantine grain bowl: protein-rich beans and caramelized roasted vegetables over a grain, tied together with a creamy tahini-lemon sauce. Vegan as written.",
  "extras": [
   [
    "Hummus",
    30
   ]
  ]
 },
 {
  "id": "white-bean-tomato-goat-cheese-pita",
  "title": "Stewed White Beans & Tomato over Pita",
  "slot": "lunch",
  "protein": "white beans cooked|chickpeas",
  "carb": "pita bread|couscous cooked",
  "fat": "goat cheese soft|olive oil",
  "produce": "tomato raw|spinach raw|onion raw",
  "prefProtein": "white beans cooked",
  "prefCarb": "pita bread",
  "prefFat": "goat cheese soft",
  "prefProduce": "tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Build the base: warm a glug of olive oil in a skillet over medium heat, then add the diced onion and minced garlic (whichever of these your plan lists from the produce) and cook 3-4 min until soft and fragrant. 2) Make the sauce: add chopped tomato (if that's your produce) and cook 6-8 min, stirring, until it breaks down into a loose sauce. (If your produce is spinach rather than tomato, add a splash of water here to make a light sauce, then the spinach goes in next.) 3) Stew the beans: stir in the drained white beans (or chickpeas, whichever your plan lists) and, if using, a handful of spinach. Simmer 5 min until the beans turn creamy and any spinach wilts. 4) Warm the carb: heat the pita (or warm the cooked couscous, whichever your plan lists). 5) Serve: spoon the stewed beans over or alongside the warm pita/couscous, drizzle with olive oil, and finish with torn dollops of soft goat cheese if you eat dairy, which melt slightly into the warm beans.",
  "oil": "Olive oil (about 375F smoke point) is ideal because the whole base cooks at gentle medium heat, well under its smoke point, and the same oil finishes the dish as a raw drizzle for grassy flavor. If you eat dairy, the soft goat cheese is the second fat, it melts into the warm beans for tang and creaminess with no extra cooking.",
  "season": "Oregano, black pepper, a pinch of chili flakes, and a squeeze of lemon at the end. A bay leaf simmered in and removed deepens it. Optional garnish: torn fresh basil or parsley. Salt to taste (goat cheese, if used, adds some), garlic",
  "note": "A cozy Mediterranean bean dish: white beans stewed with tomato and aromatics, served over warm pita with an olive oil finish (add melty soft goat cheese if you eat dairy)."
 },
 {
  "id": "baja-fish-tacos-cod-corn-tortilla",
  "title": "Baja Cod Street Tacos with Cabbage Slaw",
  "slot": "dinner",
  "protein": "cod|tilapia|pollock|haddock|Mackerel jack canned",
  "carb": "Mission Carb Balance tortilla|corn tortilla",
  "fat": "Avocado raw|Mayonnaise light",
  "produce": "cabbage|tomato|onion",
  "prefProtein": "cod",
  "prefProduce": "cabbage",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Prep the fish: pat your white fish (cod, tilapia, pollock, or haddock, whichever your plan lists) completely dry and season both sides with salt and the spices below. 2) Cook it: heat a thin film of avocado oil in a skillet over medium-high until it shimmers, then sear the fish 3-4 min per side until it flakes easily and the edges crisp. (Or roast at 425F for 10-12 min.) 3) Char the tortillas: hold each corn tortilla over a gas flame with tongs, or lay it in a dry hot pan, 20-30 sec a side until it puffs and blisters. 4) Make the slaw: toss shredded cabbage with a spoon of light mayonnaise (if that's your fat) and a squeeze of lime for a quick crema slaw; if your fat is avocado instead, just slice it for the top. 5) Prep the rest of your produce (tomato or onion, if that's what your plan lists): dice small. 6) Assemble: flake the fish into two warm tortillas, pile on the cabbage slaw, then your tomato/onion and a spoon of salsa.",
  "oil": "Avocado oil (about 520F smoke point) for the sear, fish needs a genuinely hot pan to crisp instead of steam, and avocado oil holds that heat cleanly where olive oil would scorch. If your plan's fat is light mayonnaise, that's the cool crema for the slaw, not a cooking oil; if it's avocado, that goes on raw at the end.",
  "season": "Cumin, chili powder, smoked paprika, and garlic powder on the fish; a squeeze of lime and a pinch of salt over the slaw. Optional garnish: chopped cilantro and a dash of hot sauce.",
  "note": "Light, fresh Baja-style fish tacos: crispy-edged white fish on charred corn tortillas with a creamy cabbage slaw and salsa.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "pork-carnitas-burrito-bowl-pinto",
  "title": "Pork Carnitas Burrito Bowl with Pinto Beans",
  "slot": "dinner",
  "protein": "pork tenderloin|pork chop|pork ground",
  "carb": "brown rice cooked|white rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "onion|bell pepper red|tomato|Pinto beans cooked",
  "prefProtein": "pork tenderloin",
  "prefProduce": "onion",
  "diets": [
   "omnivore"
  ],
  "method": "1) Prep the pork: cut your pork (tenderloin or chop, whichever your plan lists; if it's ground pork, just break it up) into bite-size chunks and pat dry. Season with the spices below. 2) Sear hard: get a skillet ripping hot, add a teaspoon of avocado oil, and cook the pork 6-8 min, turning, until deeply browned with crispy carnitas-style edges. 3) Char the vegetable: if your produce is onion, add it sliced for the last 3 min to soften and char alongside the pork; if it's red bell pepper or tomato, prep that here instead (slice peppers, dice tomato). 4) Warm the beans and carb: heat the pinto beans in a pot with a splash of water and a pinch of cumin until creamy (pinto beans are part of this bowl no matter what), and warm your rice (brown or white, whichever your plan lists). 5) Build the bowl: rice and creamy pinto beans on the bottom, then the crispy pork and charred vegetable, then a spoon of salsa and sliced avocado on top.",
  "oil": "Avocado oil (about 520F smoke point), real carnitas texture comes from a hard, high-heat sear, and avocado oil takes that heat without smoking. Lean pork renders almost no fat of its own, so a teaspoon keeps it from sticking and helps a crisp crust form. The avocado fruit on top is the cool, creamy finishing fat.",
  "season": "Cumin, oregano, smoked paprika, garlic powder, and salt, with a squeeze of orange or lime to brighten, the classic carnitas move. Optional garnish: cilantro and hot sauce at the table.",
  "note": "Crispy-edged pork carnitas over rice with creamy pinto beans, charred onion, salsa, and avocado.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
  "id": "shrimp-street-tacos-corn-tortilla",
  "title": "Garlicky Shrimp Street Tacos with Corn Tortillas",
  "slot": "dinner",
  "protein": "shrimp",
  "carb": "Mission Carb Balance tortilla|corn tortilla",
  "fat": "Avocado raw",
  "produce": "cabbage|bell pepper red|onion",
  "prefProtein": "shrimp",
  "prefProduce": "cabbage",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Prep the shrimp: pat them bone-dry with paper towels so they sear instead of steam, then season with the spices below. 2) Sear fast: get a skillet screaming hot, add a teaspoon of avocado oil, and cook the shrimp 2-3 min total, turning once, just until they're pink, opaque, and curled with a little char, pull them the moment they're done so they don't turn rubbery. 3) Char the tortillas: hold each corn tortilla over a flame or lay it in a dry hot pan until it blisters. 4) Prep the produce (cabbage, red bell pepper, or onion, whichever your plan lists): shred the cabbage, slice the pepper thin, slice the onion thin. 5) Assemble: pile shrimp into two warm tortillas, top with the crunchy vegetable, a spoon of salsa, and sliced avocado.",
  "oil": "Avocado oil (about 520F smoke point), shrimp want a fast, very hot sear to char without overcooking, and avocado oil reaches that temperature cleanly where olive oil would smoke before the pan is even hot enough. The avocado fruit on top is the cool finishing fat.",
  "season": "Garlic powder, chili powder, smoked paprika, a pinch of cumin, and salt on the shrimp; a squeeze of lime at the end. Optional garnish: cilantro and a dash of sriracha.",
  "note": "Quick, vibrant shrimp street tacos: fast-seared garlicky shrimp on charred corn tortillas with a crunchy vegetable and avocado.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "chicken-enchilada-bowl-refried-beans-cheddar",
  "title": "Chicken Enchilada Bowl with Refried Beans & Melted Cheddar",
  "slot": "dinner",
  "protein": "chicken breast|chicken thigh|chicken ground|Chicken leg quarters roasted",
  "carb": "refried beans|brown rice cooked|white rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "cheddar cheese",
  "produce": "bell pepper red|onion|tomato",
  "prefProtein": "chicken breast",
  "prefCarb": "refried beans",
  "prefProduce": "bell pepper red",
  "diets": [
   "omnivore"
  ],
  "method": "1) Cook the chicken: season your chicken (breast, thigh, or ground, whichever your plan lists) and sear in a hot pan with a teaspoon of avocado oil, 4-5 min per side for breast or thigh (or until ground chicken is no longer pink), until cooked through (165F). 2) Make it saucy: shred or chop the chicken and toss it with salsa to create a quick enchilada-style sauce. 3) Char the vegetable: in the same pan, cook your produce (red bell pepper, onion, or tomato, whichever your plan lists; slice peppers and onion, dice tomato) until soft and lightly charred. 4) Warm the carb: heat the refried beans in a pot with a splash of water until loose and creamy; if your carb is rice, warm that too. 5) Build the bowl: rice and/or refried beans on the bottom, saucy enchilada chicken and the vegetable on top, then shower with shredded cheddar and let it melt from the heat.",
  "oil": "Cheddar is the fat in this dish, melted over the top for that enchilada richness. For cooking, sear the chicken in just a spray or teaspoon of avocado oil (about 520F smoke point) so it browns at high heat without smoking, the cheese does the flavor work, so the cooking oil stays neutral and minimal.",
  "season": "Cumin, chili powder, smoked paprika, oregano, garlic powder, and salt. Extra salsa stands in as your enchilada sauce. Optional garnish: cilantro and a squeeze of lime to cut the richness.",
  "note": "Saucy enchilada-style bowl: salsa-tossed chicken over rice and creamy refried beans, blanketed in melted cheddar.",
  "extras": [
   [
    "Salsa",
    30
   ]
  ]
 },
 {
 "id": "white-bean-sweet-potato-vegan-tacos-corn",
 "title": "Roasted Sweet Potato & White Bean Tacos",
 "slot": "dinner",
 "protein": "white beans|pinto beans|black beans",
 "carb": "Mission Carb Balance tortilla|corn tortilla",
 "fat": "Avocado raw",
 "produce": "sweet potato|cabbage|onion",
 "prefProtein": "white beans",
 "prefProduce": "sweet potato",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) Roast the sweet potato: peel and cube your sweet potato (if that's your produce), toss with a little avocado oil, salt, and the spices below, and roast at 425F for 20-25 min, tossing halfway, until caramelized and tender. (If your produce is cabbage or onion instead, prep it raw, shred cabbage, slice onion thin.) 2) Make the beans creamy: warm your beans (white, pinto, or black, whichever your plan lists) in a pot, mashing about half of them so they go creamy and hold together on the tortilla. 3) Char the tortillas: hold each corn tortilla over a flame or lay it in a dry hot pan until it blisters. 4) Assemble: smear mashed beans on each tortilla, then add the roasted sweet potato, shredded cabbage and/or onion, a spoon of salsa, and sliced avocado on top.",
 "oil": "Avocado oil (about 520F smoke point) for roasting the sweet potato, 425F oven heat caramelizes the cubes, and avocado oil holds up where olive oil would smoke. The avocado fruit on top is the cool, creamy finishing fat, added raw.",
 "season": "Chili powder, cumin, smoked paprika, garlic powder, and salt on the sweet potato; a squeeze of lime over the beans. Optional garnish: cilantro and hot sauce. Use vegan-friendly salsa to keep it fully plant-based.",
 "note": "Hearty vegan tacos: caramelized sweet potato and creamy mashed beans on charred corn tortillas with cabbage and avocado.",
 "extras": [
  [
   "Salsa",
   30
  ],
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a sheet pan, parchment, a pot, a potato masher or fork, and 5 containers plus a bag for the tortillas.\n2. Peel and cube the sweet potato, toss with avocado oil, salt and the spices, and roast at 425F for 20 to 25 minutes, tossing halfway.\n3. Warm the beans in a pot and mash about half of them so they hold together on a tortilla.\n4. Shred the cabbage and slice the onion. Keep them raw in their own tub.\n5. Do not build the tacos now. Assembled tacos go soggy within a day.\n6. Portion: sweet potato and beans in the container, cabbage and onion in a tub, tortillas in their bag.\n7. Storage: fridge 4 days for the filling, 3 for the cut cabbage. Tortillas keep in the pantry.\n8. Reheat: microwave the filling 90 seconds. Char the tortillas over a flame or in a dry pan for 20 seconds a side, then build.",
 "makes": 5
},
 {
  "id": "garlic-ginger-shrimp-bok-choy-rice",
  "title": "Garlic-Ginger Shrimp & Baby Bok Choy over Jasmine Rice",
  "slot": "dinner",
  "protein": "Shrimp",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Bok choy|Carrots|Snap peas",
  "prefFat": "Avocado oil",
  "prefProduce": "Bok choy",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Prep the shrimp: pat them bone-dry so they sear instead of steam, then season with salt. 2) Prep the vegetable (bok choy, carrots, or snap peas, whichever your plan lists): split baby bok choy lengthwise; cut carrots into thin coins or matchsticks; trim snap peas. 3) Sear the shrimp: get a wok or wide skillet ripping hot, add the avocado oil (or canola), and lay the shrimp in a single layer, about 1 min per side, just until pink and opaque, then scoop them out (overcooked shrimp go rubbery). 4) Stir-fry the vegetable: add it to the hot pan (bok choy cut-side down first) and stir-fry hard 3-4 min so it stays crisp-tender, bok choy stems stay crunchy and leaves wilt. 5) Glaze and finish: return the shrimp, splash in tamari (gluten-free soy sauce) and a little water, and toss 30 sec to coat. Spoon over hot rice (white or brown, whichever your plan lists).",
  "oil": "Avocado oil (about 520F smoke point) for the screaming-hot wok, shrimp and the vegetable both want a fast, high-heat sear and avocado oil holds up without smoking; canola (450F) is the neutral budget alternative. Skip olive and flax here, since they scorch and turn bitter at stir-fry heat.",
  "season": "A mountain of garlic and fresh ginger, this dish lives on them, plus a few drops of sriracha and a squeeze of lime at the end. Optional garnish: toasted sesame seeds and sliced scallion. For an authentic finish, a few drops of toasted sesame oil off the heat.",
  "note": "Fast high-heat wok dinner: snappy garlic-ginger shrimp and crisp-tender vegetable over rice.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Soy sauce",
    8
   ]
  ]
 },
 {
 "id": "tofu-kimchi-bibimbap-rice-bowl",
 "title": "Crispy Tofu & Kimchi Bibimbap-Style Bowl",
 "slot": "dinner",
 "protein": "Tofu firm|TVP",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado oil|Canola oil",
 "produce": "Vegan kimchi|Spinach|Carrots",
 "prefFat": "Avocado oil",
 "prefProduce": "Vegan kimchi",
 "diets": [
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) Press and cube the tofu: wrap the firm tofu in paper towels or a clean cloth and press 10-15 min under something heavy to squeeze out water (this is what lets it crisp), then cut into cubes. 2) Crisp the tofu: heat a teaspoon of avocado oil (or canola) in a skillet until hot, add the tofu, and sear 2-3 min per side until the edges are golden and crisp. Scoop it out. 3) Cook the vegetables, your produce (kimchi, spinach, carrots, or zucchini, whichever your plan lists): if it's zucchini, saute them in the same pan until browned; if spinach, wilt it quickly; if carrots, shred and stir-fry briefly so they soften but keep a little bite; if kimchi, use it straight from the jar (no cooking). 4) Build it bibimbap-style: spoon warm rice (white or brown, whichever your plan lists) into the bowl and arrange the crispy tofu and your vegetable in neat sections on top, then mix it all together at the table.",
 "oil": "Avocado oil (about 520F smoke point) or canola (450F) for the high-heat sear that builds the tofu's golden crust, a teaspoon is plenty once the pan is hot. Olive and flax aren't built for this heat and would smoke or turn bitter.",
 "season": "Garlic and fresh ginger, a swipe of gluten-free gochujang or sriracha stirred into the rice, and a drizzle of tamari (gluten-free soy sauce). Optional garnish: sesame seeds, sliced scallion, and a few drops of toasted sesame oil off the heat. If kimchi is your produce, use a vegan-style one (no fish sauce or salted shrimp) to keep the bowl fully plant-based.",
 "note": "A colorful plant-based bibimbap: crispy seared tofu and a sauteed or fresh vegetable over rice, mixed together at the table.",
 "extras": [
  [
   "Gochujang",
   15
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large skillet, a saucepan, paper towels, and 5 containers plus 5 small tubs.\n2. Press the tofu 15 minutes under something heavy, then cube it.\n3. Cook the rice and spread it on a tray to cool.\n4. Sear the tofu in two batches 2 to 3 minutes a side until the edges are golden.\n5. Cook your vegetables separately rather than together, the way a bibimbap is built: spinach wilted and carrots shredded and briefly sautéed.\n6. Keep the kimchi in its own tub. Packed against warm rice it keeps fermenting and turns everything sour.\n7. Portion: rice on the bottom, tofu and each vegetable in its own section on top.\n8. Storage: fridge 4 days. Kimchi keeps for weeks on its own.\n9. Reheat: microwave 2 minutes, then add the cold kimchi and the gochujang.",
 "makes": 5
},
 {
  "id": "peanut-tahini-noodle-bowl-chicken",
  "title": "Sesame Peanut Noodle Bowl with Chicken",
  "slot": "dinner",
  "protein": "Chicken breast|Chicken thigh|Chicken leg quarters roasted",
  "carb": "Whole wheat pasta cooked|Carbe Diem high-protein pasta|Pasta cooked|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Peanut butter|Tahini|Olive oil",
  "produce": "Cucumber|Carrots|Bell pepper red|Cabbage",
  "prefCarb": "Carbe Diem high-protein pasta",
  "prefFat": "Peanut butter",
  "prefProduce": "Cucumber",
  "diets": [
   "omnivore"
  ],
  "method": "1) Cook the noodles: boil your pasta (whole wheat, Carbe Diem high-protein, or regular, whichever your plan lists) per the package, drain, and rinse under cool water so it doesn't clump in the sauce. 2) Cook the chicken: slice your chicken (breast or thigh, whichever your plan lists), season, and sear in a hot pan with a quick spritz of spray oil or a few drops of avocado oil for 5-6 min until cooked through (165F). 3) Make the sauce: whisk your fat, peanut butter or tahini (whichever your plan lists), with tamari (gluten-free soy sauce), a splash of warm water, and a little sriracha until pourable and glossy. 4) Prep the vegetable (cucumber, carrots, red bell pepper, or cabbage, whichever your plan lists): ribbon the cucumber with a peeler, shred the carrots or cabbage, slice the pepper thin. 5) Toss: combine the noodles, chicken, and vegetable with the sauce until everything is coated. Serve warm or chilled, both are great.",
  "oil": "No cooking oil is needed for the sauce, the peanut butter or tahini IS the fat, whisked cold into a creamy, no-heat dressing so its nutty flavor stays full. For the chicken, a quick spritz of spray oil or a few drops of avocado oil (about 520F smoke point) handles the high-heat sear without smoking.",
  "season": "Garlic, fresh ginger, lime juice, a touch of honey to balance the sauce, and sriracha for heat. A little rice vinegar brightens the whole bowl. Optional garnish: sesame seeds, cilantro, and sliced scallion.",
  "note": "Creamy warm-or-cold sesame peanut noodles with seared chicken and crisp raw vegetable; the nut-butter sauce never sees heat, so the fat stays the finishing lever.",
  "extras": [
   [
    "Light peanut sauce",
    30
   ]
  ]
 },
 {
  "id": "miso-butter-scallops-snap-peas",
  "title": "Miso-Butter Seared Scallops with Snap Peas",
  "slot": "dinner",
  "protein": "Scallops",
  "carb": "White rice cooked|Brown rice cooked|Wild rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Butter salted|Avocado oil",
  "produce": "Snap peas|Asparagus|Bok choy",
  "prefFat": "Butter salted",
  "prefProduce": "Snap peas",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Cook your grain first (white, brown, or wild rice, whichever your plan lists) and keep it warm. 2) Pat the scallops very dry with paper towels and season them lightly with salt and pepper, dry scallops are the secret to a golden crust. 3) Set a skillet over medium-high heat and add a thin film of avocado oil; let it get shimmery-hot. 4) Lay the scallops in flat-side down, not touching, and sear undisturbed 1.5-2 minutes until a deep brown crust forms, then flip and sear the other side 1-1.5 minutes. They should feel just firm, like the tip of your nose. Move them to a plate. 5) Turn the heat down to medium-low. Add the butter and a small spoon of certified gluten-free miso paste and whisk as it melts into a glossy, smooth pan sauce, about 1 minute, keep the heat low so it never scorches. 6) Toss your vegetable (snap peas, asparagus, or bok choy, whichever your plan lists) into the same pan and cook 2-4 minutes, stirring, until bright green and crisp-tender (asparagus and bok choy stems may need the extra minute). 7) Spoon the certified gluten-free miso butter over the scallops and serve everything over the rice.",
  "oil": "Sear in avocado oil (smoke point ~520F), scallops need a hard, dry, high-heat sear to build that crust, and butter alone (browns ~300F) would burn black before the scallops colored. The salted butter goes in OFF the high heat, at medium-low, so the certified gluten-free miso butter melts into a silky sauce instead of scorching. If your plan lists avocado oil as the fat, just sear in that and finish with a small pat of butter or a drizzle of the pan juices.",
  "season": "Optional: the certified gluten-free miso (fermented, gut-friendly) brings the savory depth; add garlic, a squeeze of lemon, and a sprinkle of sliced green onion or sesame seeds at the end. Go easy on extra salt, certified gluten-free miso and scallops are both already salty.",
  "note": "Restaurant-style seared scallops finished in a nutty certified gluten-free miso-butter pan sauce with a quick green vegetable, over rice. The butter is added off-heat so it never burns.",
  "extras": [
   [
    "Miso paste",
    8
   ]
  ]
 },
 {
  "id": "cashew-chicken-stir-fry-rice",
  "title": "Cashew Chicken Stir-Fry over Rice",
  "slot": "dinner",
  "protein": "Chicken breast|Chicken thigh|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Cashews|Avocado oil",
  "produce": "Bell pepper red|Snap peas|Onion|Broccoli",
  "prefFat": "Cashews",
  "prefProduce": "Bell pepper red",
  "diets": [
   "omnivore"
  ],
  "method": "1) Cook your rice first (white or brown, whichever your plan lists) and keep it warm. 2) Cut the chicken (breast or thigh, whichever your plan lists) into bite-size pieces and pat them dry; dry meat browns instead of steaming. 3) If your fat is cashews, toast them first in a dry wok or skillet over medium heat 2-3 minutes until golden and fragrant, then set aside, this deepens their flavor. 4) Set a wok or large skillet over high heat with a little avocado oil until it shimmers. Add the chicken in one layer and sear 5-6 minutes, stirring now and then, until browned and cooked through (no pink inside, 165F). Push it to one side. 5) Add your vegetable (red bell pepper, snap peas, onion, or broccoli, whichever your plan lists) and stir-fry hard 3-4 minutes so it stays crisp-tender and bright; broccoli likes a splash of water and a quick cover to steam through. 6) Pour in a splash of tamari (gluten-free soy sauce) mixed with a touch of honey and toss everything 1 minute to glaze. 7) Fold in the toasted cashews right at the end so they stay crunchy, then pile it all over the hot rice.",
  "oil": "A little avocado oil (smoke point ~520F) for the ripping-hot wok sear, high, neutral, and built for stir-frying without smoking. If your fat is cashews, those are the real richness here: toast them dry first and add them last so they don't go soft. Skip lower-heat oils like olive or butter; they'd burn at this heat.",
  "season": "Optional: garlic, fresh ginger, a little honey for that sweet-savory takeout glaze, a few drops of sriracha, and sliced green onion on top. Toasting the cashews first makes a big flavor difference.",
  "note": "Takeout-style cashew chicken: seared chicken and crisp vegetables in a sweet-savory tamari (gluten-free soy sauce) glaze, finished with buttery toasted cashews over rice.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "sesame-ginger-beef-broccoli-wild-rice",
  "title": "Sesame-Ginger Beef & Broccoli over Wild Rice",
  "slot": "dinner",
  "protein": "Beef sirloin lean|Beef top round lean|Beef tenderloin lean",
  "carb": "Wild rice cooked|Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Broccoli|Carrots",
  "prefFat": "Avocado oil",
  "prefProduce": "Broccoli",
  "diets": [
   "omnivore"
  ],
  "method": "1) Cook your grain first (wild, brown, or white rice, whichever your plan lists) and keep it warm. 2) Slice the lean beef (sirloin, top round, or tenderloin, whichever your plan lists) as thin as you can ACROSS the grain (against the lines in the meat), thin slices cook in seconds and stay tender. Pat them dry. 3) Set a wok or skillet over high heat until just smoking and add the oil. Lay the beef in a single layer and sear about 1 minute per side until browned, then pull it out so it doesn't overcook. 4) Add your vegetable (broccoli, carrots, or zucchini, whichever your plan lists) with a splash of water; cover and steam-saute 3-4 minutes until bright and crisp-tender (zucchini won't need the water, just saute until browned). 5) Return the beef, pour in tamari (gluten-free soy sauce) with a touch of honey and grated ginger, and toss 1 minute until everything is glossy and glazed. 6) Spoon over the nutty wild rice.",
  "oil": "Avocado oil (smoke point ~520F) for the hard, fast sear, lean beef needs high heat to brown without overcooking, and avocado oil has the headroom. Canola (~400F) is the neutral budget swap and still fine for a quick stir-fry. Olive and flax can't take this heat and would turn bitter.",
  "season": "Optional: lots of fresh ginger and garlic, a little honey for a glossy sesame-ginger glaze, a few drops of sriracha, and toasted sesame seeds plus sliced green onion on top. A few drops of toasted sesame oil stirred in at the very end is the classic Asian finish if you have it.",
  "note": "A leaner beef & broccoli: thin-seared lean beef and a crisp-tender vegetable in a sesame-ginger tamari (gluten-free soy sauce) glaze over chewy, nutty wild rice.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Soy sauce",
    8
   ]
  ]
 },
 {
  "id": "chana-masala-rice",
  "title": "Chana Masala over Basmati Rice",
  "slot": "dinner",
  "protein": "Chickpeas cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Coconut oil|Avocado oil",
  "produce": "Tomato raw|Onion raw",
  "prefProtein": "Chickpeas cooked",
  "prefFat": "Coconut oil",
  "prefProduce": "Tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your rice first (white or brown, whichever your plan lists; basmati-style white is traditional) and keep it warm. 2) Heat the coconut oil in a pan over medium heat. Add finely diced onion and cook 6-8 minutes, stirring often, until deep golden brown, this color is the backbone of the whole dish, so don't rush it. 3) Stir in grated garlic and cook 30 seconds until fragrant, then add a big spoonful of chopped tomato and cook 4-5 minutes until it breaks down into a jammy paste and you see the oil start to separate at the edges. 4) Add the cooked chickpeas with a splash of water. Mash a handful of them against the side of the pan with a spoon, this thickens the gravy naturally. 5) Simmer 10-12 minutes, stirring now and then and adding a little water if it gets too thick, until the sauce is thick and clings to the chickpeas. 6) Serve over the hot rice.",
  "oil": "Coconut oil (refined, smoke point ~350F) over medium heat suits this slow onion-and-tomato base and adds an authentic richness. Avocado oil (~520F) is a clean neutral swap if you want zero coconut flavor. Either way there's no hard sear here, so medium heat is all you need, keep it moderate so nothing scorches.",
  "season": "Salt the onion base as it softens. Cumin, coriander, turmeric, garam masala, a pinch of chili, and fresh ginger bloomed in with the garlic. A squeeze of lemon and chopped cilantro at the end is the classic bright finish and well worth it. If you eat dairy, a spoon of yogurt on top cools the spice.",
  "note": "A North-Indian chickpea curry in a jammy onion-tomato gravy over rice. Naturally vegan and built entirely from pantry staples.",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    30
   ]
  ]
 },
 {
  "id": "dal-tadka-rice",
  "title": "Dal Tadka, Buttery Spiced Split Peas with Rice",
  "slot": "dinner",
  "protein": "Split peas cooked|Lentils cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Butter salted|Coconut oil|Olive oil",
  "produce": "Tomato raw|Onion raw",
  "prefProtein": "Split peas cooked",
  "prefFat": "Butter salted",
  "prefProduce": "Tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your rice first (white or brown, whichever your plan lists) and keep it warm. 2) Put the cooked legumes (split peas or lentils, whichever your plan lists) in a pot with a little water, a pinch of turmeric, and a spoonful of diced tomato. Simmer over medium-low heat 8-10 minutes, whisking and mashing, until it turns soft and souplike; add water a splash at a time to keep it loose. 3) Now make the tadka (the flavored-fat topping): melt the salted butter in a small pan over medium-low heat. Add a pinch of cumin seeds plus thinly sliced garlic and onion and fry gently 2-3 minutes until fragrant and golden, watch it closely so it never burns. 4) Pour the sizzling butter tadka straight over the dal and stir it through. 5) Spoon over the rice. For a vegan version, use coconut oil in place of the butter for the tadka, that makes the whole dish vegan.",
  "oil": "Salted butter over medium-low heat (browns ~300F, burns fast) is the traditional tadka fat and carries the toasted-cumin flavor, keep the heat gentle so the milk solids turn golden without scorching. Coconut oil (~350F) is the vegan swap and handles the same low heat just fine. Neither is a high-heat oil, so never crank the burner here.",
  "season": "Optional: cumin seeds, turmeric, a little garam masala, fresh ginger, and a pinch of chili. A squeeze of lemon and chopped cilantro at the end lifts the whole bowl.",
  "note": "Comforting yellow dal finished with a fragrant butter-and-cumin tempering, over rice. Vegetarian as written; swap the butter for coconut oil to make it vegan.",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    30
   ]
  ]
 },
 {
 "id": "mixed-veg-coconut-curry-chickpea-rice",
 "title": "Mixed Vegetable & Chickpea Coconut Curry",
 "slot": "dinner",
 "protein": "Chickpeas cooked",
 "carb": "White rice cooked|Brown rice cooked|Pita bread|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Coconut oil|Avocado oil",
 "produce": "Cauliflower cooked|Green peas cooked|Carrots raw",
 "prefProtein": "Chickpeas cooked",
 "prefFat": "Coconut oil",
 "prefProduce": "Cauliflower cooked",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) If your carb is rice (white or brown, whichever your plan lists), cook it first and keep it warm; if it's pita, warm the bread at the end to scoop with. 2) Warm the coconut oil in a deep pan over medium heat. Add a little diced onion and cook 5-6 minutes until soft (optional, as an aromatic base), then stir in garlic, ginger, and the dry spices and toast 30-60 seconds until fragrant. 3) Add your vegetable (cauliflower, green peas, or carrots, whichever your plan lists) along with a spoonful of tomato and a splash of water. Cover and simmer 8-10 minutes until the vegetable is just tender (carrots and cauliflower take the full time; peas only need a few minutes). 4) Stir in the chickpeas and simmer 5 more minutes so everything melds and the sauce thickens slightly. 5) Serve over the rice, or scoop it up with the warm pita standing in for naan.",
 "oil": "Coconut oil (refined, smoke point ~350F) over medium heat is perfect here, it blooms the spices and gives that warm coconut-curry backbone. Avocado oil (~520F) is the neutral swap if you'd rather skip the coconut note. There's no hard sear, so medium heat is all you need.",
 "season": "Optional: curry powder or garam masala, turmeric, cumin, coriander, and a pinch of chili. Finish with cilantro and a squeeze of lemon; a little grated ginger stirred in at the end keeps it lively. Salt to taste; coconut milk needs more salt than you expect.",
 "note": "A cozy one-pot vegetable-and-chickpea coconut curry, over rice or scooped with pita-as-naan. Fully plant-based and loaded with vegetables.",
 "extras": [
  [
   "Greek yogurt plain nonfat",
   30
  ]
 ]
},
 {
 "id": "chicken-tikka-style-rice",
 "title": "Yogurt-Marinated Chicken Tikka with Rice",
 "slot": "dinner",
 "protein": "Chicken breast cooked|Chicken thigh cooked|Chicken leg quarters roasted",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado oil",
 "produce": "Onion raw|Bell pepper red raw",
 "prefProtein": "Chicken breast cooked",
 "prefFat": "Avocado oil",
 "prefProduce": "Onion raw",
 "diets": [
  "omnivore"
 ],
 "method": "1) Cook your rice first (white or brown, whichever your plan lists) and keep it warm. 2) Cube the cooked chicken's raw equivalent, that is, cut your chicken (breast or thigh, whichever your plan lists) into bite-size cubes. Marinate at least 30 minutes (or overnight in the fridge) in plain Greek yogurt with garlic, ginger, and tikka spices, the yogurt's acidity tenderizes the meat and helps it char. 3) Heat your broiler, grill, or a heavy pan to very hot with a little avocado oil. Thread the chicken on skewers or just scatter it on a tray. 4) Cook 3-4 minutes per side until the edges blacken in spots and the chicken is cooked through (no pink, 165F inside). 5) Char your vegetable (onion or red bell pepper, whichever your plan lists) in thick wedges right alongside until softened and spotted black. 6) Serve the chicken and charred vegetable over the hot rice, scraping any juices on top.",
 "oil": "Avocado oil (smoke point ~520F) is the right call for the hard, blistering char that defines tikka, it takes broiler or screaming-pan heat without smoking, where olive oil (~375F) would scorch and turn bitter. The Greek yogurt in the marinade is the tenderizer, not a cooking fat.",
 "season": "Optional: garam masala, cumin, coriander, turmeric, and smoked paprika (for color) plus garlic and ginger in the marinade. A squeeze of lemon and chopped cilantro at the end is the classic finish. Salt the marinade properly, about 3/4 tsp per pound, or the spices read dull.",
 "note": "Smoky yogurt-marinated chicken tikka with a charred vegetable over rice, the marinade does the tenderizing and the high heat does the rest.",
 "extras": [
  [
   "Greek yogurt plain nonfat",
   30
  ]
 ]
},
 {
  "id": "palak-paneer-style-ricotta-rice",
  "title": "Palak \"Paneer\", Creamy Spinach with Ricotta",
  "slot": "dinner",
  "protein": "Ricotta cheese part skim|Cottage cheese 2%",
  "carb": "White rice cooked|Brown rice cooked|Pita bread|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Butter salted|Coconut oil|Olive oil",
  "produce": "Spinach cooked|Tomato raw",
  "prefProtein": "Ricotta cheese part skim",
  "prefFat": "Butter salted",
  "prefProduce": "Spinach cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) If your carb is rice (white or brown, whichever your plan lists), cook it first and keep it warm; if it's pita, warm the bread at the end to scoop with. 2) Melt the butter in a pan over medium heat. Add garlic, ginger, a spoonful of chopped tomato, and the dry spices and cook 3-4 minutes until fragrant and the tomato softens (a little diced onion sweated in first is a nice optional aromatic base). 3) Pile in the cooked spinach and stir 3-4 minutes until fully wilted and silky, then roughly chop or lightly mash it into a coarse green sauce; add a splash of water or milk to loosen. 4) Take the pan off the heat and gently fold in spoonfuls of your cheese (ricotta or cottage cheese, whichever your plan lists) so it stays in soft creamy curds standing in for paneer cubes, adding it off the heat keeps it from going grainy. 5) Serve over the rice or scoop with the warm pita.",
  "oil": "Salted butter over medium heat (browns ~300F) gives this its rich restaurant flavor, keep the heat moderate so it never smokes. Coconut oil (~350F) is a fine swap if you prefer. Either way the cheese (ricotta or cottage cheese) is the protein and creaminess, not a cooking fat, and goes in off the heat.",
  "season": "Optional: garam masala, cumin, coriander, turmeric, and a pinch of chili. A little grated ginger and a squeeze of lemon at the end cut the richness; a swirl of yogurt on top is a nice touch.",
  "note": "A lighter palak paneer using soft cheese curds in place of paneer, folded into a spiced creamy spinach sauce over rice. Vegetarian (contains dairy).",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    30
   ]
  ]
 },
 {
  "id": "chicken-pesto-pine-nut-ww-pasta",
  "title": "Basil-Pesto Chicken over Whole-Wheat Pasta",
  "slot": "dinner",
  "protein": "Chicken breast|Chicken thigh|Chicken leg quarters roasted",
  "carb": "Whole wheat pasta cooked|Carbe Diem high-protein pasta|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Pine nuts|Olive oil|Parmesan grated",
  "produce": "Spinach|Tomato",
  "diets": [
   "omnivore"
  ],
  "method": "1) Make a quick pesto: in a food processor (or by finely chopping with a knife and stirring in a bowl), blend a big handful of fresh basil with the pine nuts, a clove of garlic, the grated parmesan (if you eat dairy), and the olive oil until you get a loose, spoonable sauce. 2) Cook your pasta (whole-wheat or Carbe Diem high-protein pasta, whichever your plan lists) to al dente, just tender with a little bite. Scoop out a splash of the starchy cooking water before draining. 3) Off the heat, toss the hot pasta with the pesto plus a little of that reserved water so it coats every strand. 4) Slice the cooked chicken (breast or thigh, whichever your plan lists) and fold it through, along with a handful of your produce (fresh spinach wilts in the residual heat; halved cherry tomatoes just warm through, whichever your plan lists). 5) Serve warm.",
  "oil": "Olive oil here is used RAW, it's the body of the pesto, never heated, so it stays well under its ~375F smoke point and keeps that grassy, peppery flavor (using extra-virgin is ideal for a no-cook sauce). The pine nuts bring the other half of the fat and the classic pesto richness; toast them dry in a pan 2-3 minutes first for deeper, nuttier flavor.",
  "season": "Optional: lots of fresh basil, a clove of garlic, a squeeze of lemon, salt, and cracked pepper. A little extra parmesan on top (if you eat dairy) never hurts. If the pesto tastes flat, it almost always wants more salt or more lemon.",
  "note": "A real pesto pasta, fresh basil, pine nuts, garlic and olive oil blended into a sauce, tossed with pasta, sliced chicken, and your produce. Goes well beyond a jarred sauce.",
  "extras": [
   [
    "Parmesan cheese shredded",
    12
   ]
  ]
 },
 {
  "id": "caprese-balsamic-chicken-pasta",
  "title": "Caprese Pasta with Tomato, Mozzarella & Basil",
  "slot": "dinner",
  "protein": "Chicken breast cooked|Mozzarella part skim|Chicken leg quarters roasted",
  "carb": "Whole wheat pasta cooked|Pasta cooked|Carbe Diem high-protein pasta|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Mozzarella part skim|Avocado oil|Olive oil",
  "produce": "Tomato raw|Spinach",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) If your protein is chicken, sear the cooked chicken's raw cut, that is, cook your chicken breast in a little avocado oil over medium-high heat about 5-6 minutes per side until cooked through (165F inside), then rest and slice. (If your protein is mozzarella instead, skip this step, you'll tear it in raw at the end.) 2) Warm your tomato produce (cherry/raw tomato or spinach, whichever your plan lists): for tomato, halve and cook in the pan over medium heat 2-3 minutes until they start to burst and go saucy, stirring in a splash of balsamic to glaze; for spinach, just wilt it in the warm pan 1-2 minutes. 3) Cook your pasta (whole-wheat, regular, or Carbe Diem high-protein, whichever your plan lists) to al dente. 4) Tear the fresh mozzarella over the hot drained pasta so it softens and gets stringy. 5) Toss everything together, pasta, the blistered tomato (or wilted spinach), the sliced chicken if using, with a handful of fresh basil. 6) Finish with a drizzle of olive oil.",
  "oil": "If you sear chicken, use avocado oil (smoke point ~520F) over medium-high, it handles the hard sear olive oil can't, since olive tops out around 375F (medium only). The part-skim mozzarella is the second fat, melting into the warm pasta for that classic caprese pull. Finish with a raw olive-oil drizzle for flavor, that's where olive oil shines.",
  "season": "Optional: fresh basil (essential), a clove of garlic, a glug of balsamic to glaze the tomatoes, salt, pepper, and a pinch of dried oregano. The tomato-mozzarella-basil trio carries it, don't overthink the rest.",
  "note": "A bright, no-marinara caprese pasta: balsamic-glazed tomato (or wilted spinach), torn fresh mozzarella, and basil, add seared chicken if you eat meat.",
  "extras": [
   [
    "Parmesan cheese shredded",
    12
   ]
  ]
 },
 {
  "id": "vegetarian-baked-ziti-ricotta-white-bean",
  "title": "Baked Ziti with Ricotta & White Beans",
  "slot": "dinner",
  "protein": "Ricotta cheese part skim|White beans cooked|Mozzarella part skim",
  "carb": "Whole wheat pasta cooked|Pasta cooked|Carbe Diem high-protein pasta|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Ricotta cheese part skim|Mozzarella part skim|Parmesan grated",
  "produce": "Spinach|Zucchini cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Heat the oven to 400F. 2) Cook your pasta (whole-wheat, regular, or Carbe Diem high-protein, whichever your plan lists) to just SHY of al dente, about 2 minutes under the box time, since it finishes in the oven. Drain. 3) Stir your produce into warm marinara so it softens: chopped spinach wilts in 1-2 minutes, or diced zucchini softens in a few (whichever your plan lists). 4) If white beans are part of your plan's protein, stir them into the sauce now too. 5) In a bowl, loosen the ricotta (if you eat dairy) with a few spoonfuls of the sauce, a pinch of salt, and some grated parmesan (if you eat dairy). 6) Fold the pasta and sauce together in a baking dish, dollop the ricotta mixture through it in pockets, then scatter torn mozzarella (if you eat dairy) over the top. 7) Bake 18-22 minutes until bubbling and the cheese is golden and blistered. Rest 5 minutes before serving.",
  "oil": "No added cooking oil needed, the fat comes from the dairy (if you eat dairy): creamy ricotta dolloped through, melty mozzarella on top, and a little parmesan for salt and bite. At 400F the cheeses brown nicely without anything smoking. If you want a touch more richness, a thin drizzle of olive oil over the top before baking is plenty.",
  "season": "Optional: garlic, dried oregano and basil, a pinch of red pepper flakes, salt and pepper, and fresh basil torn over the top after baking. Season the ricotta itself, bland ricotta is the #1 way a baked ziti falls flat.",
  "note": "A proper baked ziti: pasta in marinara (with white beans if your plan lists them), dolloped with seasoned ricotta and baked under blistered mozzarella. Meatless and hearty.",
  "extras": [
   [
    "Marinara sauce",
    40
   ]
  ]
 },
 {
  "id": "vegan-pasta-primavera-chickpea",
  "title": "Spring Pasta Primavera with Chickpeas",
  "slot": "dinner",
  "protein": "Chickpeas cooked|White beans cooked|Tofu firm|TVP",
  "carb": "Whole wheat pasta cooked|Carbe Diem high-protein pasta|Pasta cooked|Shirataki noodles|Chickpea pasta cooked",
  "fat": "Olive oil|Pine nuts",
  "produce": "Asparagus cooked|Zucchini cooked|Snap peas cooked|Bell pepper red raw|Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your pasta (whole-wheat, Carbe Diem high-protein, or regular, whichever your plan lists) to al dente and save a mugful of the starchy cooking water before draining. 2) Meanwhile, heat the olive oil in a wide skillet over medium heat. Add your vegetable (asparagus, zucchini, snap peas, red bell pepper, or broccoli, whichever your plan lists) and saute 5-7 minutes so it stays bright and crisp-tender, never mushy (firmer veg like broccoli likes a splash of water and a quick cover to steam through). 3) Add your protein to warm through, chickpeas or white beans just need 2 minutes; cubed firm tofu can be browned a little first (whichever your plan lists), plus a clove of minced garlic for the last minute. 4) Toss the hot pasta into the pan with a good splash of the pasta water and a little more olive oil; stir until it forms a light, glossy sauce that clings to everything. 5) Finish with the toasted pine nuts (if pine nuts are your fat) and a squeeze of lemon.",
  "oil": "Olive oil at medium heat (smoke point ~375F) is exactly right for sauteing tender spring vegetables, gentle enough to keep them green and sweet, with flavor that suits the dish. Don't crank the heat hunting for char; primavera is about freshness. A second raw drizzle plus the pasta water makes the sauce. If your fat is pine nuts, toast them dry and add at the end for richness and crunch.",
  "season": "Optional: garlic, lemon zest and juice, fresh basil or parsley, salt, cracked pepper, and a pinch of red pepper flakes. Vegan as written; a shower of parmesan would make it vegetarian if dairy is welcome.",
  "note": "A genuinely vegan primavera: crisp-tender spring vegetables and beans or tofu tossed with pasta in a light olive-oil-and-pasta-water sauce, brightened with lemon and pine nuts.",
  "extras": [
   [
    "Marinara sauce",
    40
   ]
  ]
 },
 {
 "id": "white-bean-barley-risotto-orzotto",
 "title": "White-Bean Barley Risotto (Orzotto)",
 "slot": "dinner",
 "protein": "White beans cooked|Navy beans cooked|Chickpeas cooked",
 "carb": "Barley cooked",
 "fat": "Olive oil|Parmesan grated",
 "produce": "Spinach|Kale cooked",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) This is orzotto, risotto made with barley instead of rice; your cooked barley is the grain. 2) Saute your vegetable in olive oil over medium-high heat: your greens want 2-3 minutes, just until wilted; chopped kale or spinach just needs to wilt at the end (whichever your plan lists). Add a clove of garlic and a little diced onion (optional aromatic) while the zucchini brown. 3) Stir in the cooked barley and your protein (white beans, navy beans, or chickpeas, whichever your plan lists). 4) Add warm vegetable broth one ladle at a time, stirring, letting each addition soak in before the next, about 6-8 minutes, until the barley turns creamy and loose. 5) If your produce is spinach or kale, wilt it in now for the last 1-2 minutes. 6) Off the heat, beat in the grated parmesan (if you eat dairy) and a final drizzle of olive oil so it goes glossy and rich. Serve loose, not stiff.",
 "oil": "The parmesan beaten in at the end (if you eat dairy) is the second fat and gives that creamy, cheesy risotto finish without any cream.",
 "season": "Optional: garlic, thyme, a splash of white wine deglazed into the zucchini, black pepper, and a little lemon at the end to cut the richness. Salt in stages as you add broth, barley drinks up seasoning.",
 "note": "An Italian orzotto: chewy barley cooked risotto-style with wilted greens and beans, finished with parmesan and olive oil. A creamy, meatless grain-bowl dinner.",
 "extras": [
  [
   "Parmesan cheese shredded",
   12
  ]
 ]
},
 {
  "id": "roast-turkey-wild-rice-butternut",
  "title": "Herb Roast Turkey Breast with Wild Rice & Maple Butternut Squash",
  "slot": "dinner",
  "protein": "turkey breast",
  "carb": "wild rice|Riced cauliflower cooked|Quinoa cooked",
  "fat": "olive oil",
  "produce": "butternut squash|green beans cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1) Take the turkey breast out of the fridge about 15 minutes before cooking and pat it dry with paper towels (dry skin browns better). Heat the oven to 375F. 2) Rub the turkey breast all over with a thin coat of olive oil, then press on your seasonings (see season line). 3) Set it in a small roasting pan and roast at 375F for about 20-25 minutes per pound, until a thermometer pushed into the thickest part reads 165F. If you don't have a thermometer, cut into the center; the meat should be white all the way through with clear, not pink, juices. 4) Move the turkey to a board and let it rest 5-10 minutes (this keeps it juicy), then slice it across the grain (against the lines in the meat) into thin slices. 5) Meanwhile, peel the butternut squash and cut it into roughly 1-inch cubes. Toss the cubes with a little olive oil and a pinch of salt, spread them in a single layer on a sheet pan (don't crowd them, or they steam instead of browning), and roast at 400F for 25-30 minutes, flipping once halfway. In the last 5 minutes, drizzle on a little maple syrup so the edges caramelize; they're done when fork-tender and browned at the corners. 6) Warm the wild rice (cook per package if not already cooked; it's done when the grains split open and are chewy-tender). 7) To plate: spoon wild rice down first, fan the sliced turkey over it, add the maple squash, and pour any turkey pan juices over the top.",
  "oil": "Use olive oil. Both the turkey (375F) and the squash (400F) roast right around olive oil's ~375F smoke point, and its savory flavor suits this cozy autumn plate. Keep the oven at or below 400F so the oil never gets hot enough to smoke or turn bitter; if you want to roast hotter, switch to refined avocado oil instead.",
  "season": "Optional rub for the turkey: salt, pepper, rubbed sage, thyme, and a little garlic powder. On the squash, a pinch of cinnamon or nutmeg leans into the sweet-savory autumn flavor. A few torn fresh herbs over the top at the end are a nice finish.",
  "note": "A scaled-down Thanksgiving plate any night of the week: herb-roasted turkey breast, nutty wild rice, and sweet-savory maple butternut squash.",
  "extras": [
   [
    "Maple syrup",
    8
   ]
  ],
  "simple": true
 },
 {
  "id": "maple-mustard-pork-tenderloin-sweet-potato-brussels",
  "title": "Maple-Mustard Pork Tenderloin with Sweet Potato & Roasted Brussels",
  "slot": "dinner",
  "protein": "pork tenderloin",
  "carb": "sweet potato",
  "fat": "avocado oil",
  "produce": "brussels sprouts",
  "diets": [
   "omnivore"
  ],
  "method": "1) Heat the oven to 400F. Pat the pork tenderloin completely dry with paper towels (wet meat won't brown) and season it all over. 2) Make the glaze: stir together mustard and maple syrup (see season line). 3) Heat a thin film of avocado oil in an oven-safe skillet over medium-high until it shimmers. Lay the pork in and sear undisturbed for 2-3 minutes per side, turning to brown all sides, until you have a deep golden crust all around (about 8-10 minutes total). 4) Brush the seared pork generously with the maple-mustard glaze, then slide the whole skillet into the 400F oven for 12-15 minutes, until a thermometer in the thickest part reads 145F. No thermometer? Cut into the center; it should be just barely pink and the juices run clear. 5) Move the pork to a board and rest 5 minutes before slicing into medallions (resting keeps it juicy). 6) While the pork roasts, trim and halve the Brussels sprouts, toss with a little avocado oil and salt, and spread cut-side down on a sheet pan. Roast at 400F for 20-25 minutes, until the cut sides are deeply browned and the edges are crisp. 7) Scrub the sweet potato, poke it a few times with a fork, and bake at 400F for 45-55 minutes until a knife slides in easily (start it before the pork so it's ready in time), then split it open. 8) Plate the sliced pork, a pile of roasted Brussels, and the split baked sweet potato.",
  "oil": "Use avocado oil. The hard stovetop sear needs a near-smoking pan, and refined avocado oil's ~520F smoke point handles that without burning, then carries through the 400F roast of the Brussels too. Olive oil or butter would scorch on a real sear, so avocado is the right pick here.",
  "season": "Optional glaze: yellow or Dijon mustard stirred with maple syrup and a little minced garlic. Season the pork with salt, pepper, and a pinch of smoked paprika. Finish the Brussels with cracked black pepper and a squeeze of lemon to balance their richness.",
  "note": "A sweet-and-tangy American supper: seared maple-mustard pork tenderloin with caramelized Brussels sprouts and a soft baked sweet potato.",
  "extras": [
   [
    "Yellow mustard",
    10
   ],
   [
    "Maple syrup",
    8
   ]
  ],
  "simple": true
 },
 {
 "id": "classic-meatloaf-baked-potato-green-beans",
 "title": "Classic Glazed Meatloaf with Baked Potato & Green Beans",
 "slot": "dinner",
 "protein": "Beef ground 93/7",
 "carb": "Potato baked flesh",
 "fat": "olive oil",
 "produce": "green beans",
 "diets": [
  "omnivore"
 ],
 "method": "1) Heat the oven to 375F. 2) In a big bowl, mix your ground beef (90, 93, or 85 percent lean, whichever your plan lists) with an egg, a little breadcrumb (or use a gluten-free crumb if needed), and your seasonings. If you like, soften a little finely diced onion in a pan with a touch of olive oil over medium heat for 4-5 minutes first, then mix it in for sweetness. Mix with your hands just until combined; over-mixing makes it dense. 3) Pat the mixture into a loaf shape on a lined sheet pan or in a loaf pan. 4) Bake at 375F for about 30 minutes, then brush the ketchup glaze over the top and bake another 15 minutes, until a thermometer in the center reads 160F and the glaze is sticky and set (about 40-45 minutes total). 5) Let the meatloaf rest 5-10 minutes before slicing so it holds together. 6) Bake the potato right alongside: scrub it, poke it with a fork a few times, and bake at 375-400F for 45-60 minutes until a knife slides in with no resistance, then split it open. 7) For the green beans, trim the ends, toss with a little olive oil and salt, and roast on a sheet pan at 400F for 12-15 minutes until bright green and crisp-tender with a few browned spots (or steam them 4-5 minutes if you prefer). 8) Plate a slice or two of meatloaf with the split baked potato and the green beans.",
 "oil": "Use olive oil. Everything here lives at a gentle medium heat or a 375-400F oven, comfortably around olive oil's ~375F smoke point, and there's no hard sear to worry about. Keep the bean roast at 400F or below so the oil stays clean.",
 "season": "Optional in the meat mix: garlic powder, onion powder, a splash of tamari (gluten-free soy sauce) for savory depth, salt, and pepper. The glaze is just ketchup with a touch of yellow mustard. Finish the green beans with cracked pepper and, if you like, a squeeze of lemon.",
 "note": "The all-American comfort plate: a glazed beef meatloaf with a fluffy baked potato and roasted green beans on the side.",
 "extras": [
  [
   "Ketchup",
   15
  ],
  [
   "Egg, whole, cooked",
   50
  ]
 ]
},
 {
 "id": "stuffed-bell-peppers-turkey-rice",
 "title": "Cheese-Topped Stuffed Peppers with Rice",
 "slot": "dinner",
 "protein": "turkey ground",
 "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "olive oil",
 "produce": "bell pepper",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1) Heat the oven to 375F. 2) Prep your vegetable: this dish stuffs bell peppers, so slice the tops off the bell peppers and scoop out the seeds and white ribs. (If your plan lists tomato or onion instead as the produce, dice it small to fold into the filling, and stuff the mixture into pre-halved bell peppers or simply bake it as a casserole.) 3) Heat a little olive oil in a pan over medium-high. If your protein is ground turkey, add it now and cook 6-8 minutes, breaking it up, until no pink remains. If your protein is mozzarella, skip the browning and just warm a spoon of oil with your aromatics so the filling isn't dry. 4) Stir your grain (brown or white rice, whichever your plan lists, cooked) into the pan along with a little chopped tomato if you have it, season, and simmer 5 minutes so the flavors come together. 5) Pack the filling into the hollowed peppers and set them upright in a baking dish. 6) Top with shredded mozzarella (if you eat dairy; this is also the dish's fat if mozzarella is your fat pick). 7) Bake at 375F for 25-30 minutes, until the peppers are fork-tender and the cheese is melted, bubbling, and golden in spots. Let them sit 5 minutes before serving so the filling settles.",
 "oil": "Use olive oil for the saute. Medium-high browning and a 375F bake both sit right around its ~375F smoke point, so it won't smoke, and a small amount is all you need since the melted mozzarella adds the rest of the richness. (With the mozzarella carrying most of the fat, a teaspoon of oil is enough to keep the pan from sticking.)",
 "season": "Optional in the filling: garlic, dried oregano, basil, a pinch of red pepper flakes, salt, and pepper. A little grated parmesan over the mozzarella crisps up nicely if you eat dairy. Fresh basil over the top at the end keeps it bright.",
 "note": "Classic stuffed peppers: savory marinara rice (with ground turkey, or kept meatless) packed into sweet bell peppers and baked under melted mozzarella.",
 "extras": [
  [
   "Marinara sauce",
   40
  ],
  [
   "Mozzarella part skim",
   20
  ],
  [
   "Mozzarella fat-free",
   35
  ]
 ]
},
 {
 "id": "pot-roast-bowl-beef-barley-carrots",
 "title": "Pot-Roast Bowl with Tender Beef, Barley, Carrots & Onion",
 "slot": "dinner",
 "protein": "beef top round",
 "carb": "barley|potato baked",
 "fat": "avocado oil",
 "produce": "carrots|onion",
 "diets": [
  "omnivore"
 ],
 "method": "1) Heat the oven to 325F. Pat the beef top round completely dry and season it well (dry meat browns properly). 2) Heat a thin film of avocado oil in a heavy oven-safe pot over medium-high until it shimmers. Sear the beef 2-3 minutes per side until deeply browned all over; this color is where the flavor comes from. Move the beef to a plate. 3) Prep the vegetable your plan lists. Peel and chunk the carrots and slice the onion thick. Add it to the pot and let it brown for 3-4 minutes, scraping up the browned bits stuck to the bottom. 4) Return the beef, pour in a splash of broth (enough to come about a third of the way up the meat), bring to a simmer, then cover with a tight lid. 5) Braise in the 325F oven for 2.5-3 hours, until the beef pulls apart easily with a fork. 6) Shred the beef into the savory pan juices and stir the vegetable back through. 7) Serve your carb (barley or baked potato, whichever your plan lists). For barley, warm it (it's done when the grains are plump and chewy-tender) and spoon the shredded beef, vegetable, and braising liquid over the top so the grain soaks it up. For a baked potato, scrub it, poke it, bake at 400F for 45-60 minutes until a knife slides in easily, split it open, and pile the saucy beef on top.",
 "oil": "Use avocado oil. The hard initial sear that gives a braise its deep color needs a near-smoking pan, and refined avocado oil's ~520F smoke point takes that heat without burning; olive oil would smoke. Once the lid goes on, the low 325F braise does the rest with no smoking risk.",
 "season": "Optional in the braise: garlic, a bay leaf, thyme, a splash of tamari (gluten-free soy sauce) for savory depth, salt, and pepper. Low and slow is the whole secret, so give it the full time; the meat tells you it's done when it shreds with no resistance.",
 "note": "A Sunday pot-roast in a bowl: slow-braised shredded beef with carrots and onion over tender barley (or a baked potato), all napped in the braising juices.",
 "extras": [
  [
   "Yellow mustard",
   10
  ]
 ]
},
 {
  "id": "chickpea-bulgur-tabbouleh-bowl",
  "title": "Loaded Chickpea Tabbouleh with Bulgur & Lemon",
  "slot": "lunch",
  "protein": "chickpeas",
  "carb": "bulgur cooked",
  "fat": "olive oil",
  "produce": "tomato|cucumber|onion",
  "prefProduce": "tomato|cucumber",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) This is a no-cook bowl as long as your bulgur is already cooked and cooled. If it isn't, cook the bulgur per the package, then spread it on a plate to cool to room temperature (warm bulgur wilts the salad). 2) Drain and rinse the chickpeas. 3) Prep your vegetable: tomato or cucumber, whichever your plan lists (a little diced onion too if that's your pick). Cut it into small, even dice so every bite gets some. 4) In a big bowl, combine the cooled bulgur, the chickpeas, and your diced vegetable. 5) Dress with olive oil and a generous amount of fresh lemon juice, then season and toss well. 6) Let it sit 5-10 minutes so the bulgur drinks up the dressing and the flavors meld. Taste and add more lemon or salt if it needs brightening. 7) Serve cold or at room temperature.",
  "oil": "Use extra-virgin olive oil, raw, as the dressing. There's no heat at all here, so smoke point doesn't matter; what matters is EVOO's grassy, peppery taste. Reach for a good bottle and let the lemon do the rest of the lifting.",
  "season": "Optional: lots of chopped fresh parsley and mint (the soul of real tabbouleh), a little minced garlic, a pinch of ground cumin or allspice, salt, and plenty of cracked pepper. Be heavy-handed with the lemon; tabbouleh should taste bright and almost tart.",
  "note": "A protein-boosted take on classic tabbouleh: lemony bulgur with tomato or cucumber and chickpeas. No-cook, refreshing, and built for a make-ahead lunch.",
  "extras": [
   [
    "Hummus",
    30
   ]
  ]
 },
 {
  "id": "falafel-pita-tahini-bowl",
  "title": "Falafel Pita Bowl with Lemon-Tahini Drizzle",
  "slot": "lunch",
  "protein": "falafel",
  "carb": "pita bread",
  "fat": "tahini|Olive oil",
  "produce": "cucumber|tomato|romaine lettuce|onion",
  "prefProduce": "cucumber|tomato",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Heat the falafel: spread it on a tray and warm in a 375F oven for 8-10 minutes until heated through and golden at the edges, or crisp it in a dry (or lightly oil-sprayed) pan over medium heat, turning, until browned on a few sides. 2) Warm the pita (30 seconds in the oven or a quick toast), then tear it into bite-size pieces and lay them across the base of your bowl. 3) Prep your vegetable: cucumber or tomato, whichever your plan lists (and shredded romaine and a little thin-sliced onion if those are your picks). Chop it and pile it over the pita. 4) Nestle the warm falafel on top. 5) Make the sauce: spoon the tahini into a small bowl and whisk in fresh lemon juice and a splash of water, a little at a time, until it's smooth and pourable (it will seize and thicken first, then loosen, keep adding water). 6) Drizzle the lemon-tahini over the whole bowl and serve right away while the falafel is crisp.",
  "oil": "Tahini is both the fat and the sauce here, so no cooking oil is needed; just whisk it with lemon juice, a little water, and garlic into a pourable lemon-tahini dressing. If you pan-crisp the falafel rather than oven-warming it, a quick shot of spray oil over medium heat is plenty and keeps the fat budget tight.",
  "season": "Optional: garlic and lemon stirred into the tahini, plus a sprinkle of sumac, cumin, or a pinch of chili over the bowl. Fresh parsley and a few sliced pickles or olives make it taste like a proper falafel-shop bowl.",
  "note": "A deconstructed falafel pita: warm falafel and torn pita over crisp salad veg, finished with a classic lemon-tahini drizzle.",
  "extras": [
   [
    "Hummus",
    30
   ]
  ]
 },
 {
  "id": "chickpea-shawarma-quinoa-bowl",
  "title": "Chickpea Shawarma Bowl with Tahini Sauce",
  "slot": "lunch",
  "protein": "chickpeas|greek yogurt",
  "carb": "quinoa cooked",
  "fat": "tahini|Olive oil",
  "produce": "bell pepper red|onion|tomato|cucumber",
  "prefProtein": "chickpeas",
  "prefProduce": "bell pepper red|onion",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Heat the oven to 425F. 2) Drain and rinse the chickpeas and pat them dry (dry chickpeas crisp; wet ones steam). 3) Prep your vegetable: red bell pepper or onion, whichever your plan lists (and tomato or cucumber if those are your picks, for those, dice and reserve them raw for the end rather than roasting). Slice the pepper and onion into strips. 4) Toss the chickpeas and the pepper/onion with the shawarma spice blend (see season line) and a light spray of avocado oil, and spread in a single layer on a sheet pan. 5) Roast at 425F for 20-25 minutes, shaking the pan once halfway, until the chickpeas are crisp and the onion edges char. 6) Warm your grain (quinoa, cooked; it's done when the little spiral germ pops out and it's fluffy) and spoon it into the bowl. 7) Top with the roasted chickpeas and vegetables. 8) Make the sauce: whisk the tahini with lemon juice and a little water until creamy and pourable. If greek yogurt is your protein pick (or you just want it richer and eat dairy), stir a spoonful into the sauce. 9) Drizzle the tahini sauce over the top, then scatter any reserved raw tomato or cucumber for freshness.",
  "oil": "Tahini is the finishing fat, thinned with lemon and water into a cool shawarma-style sauce (stir in a spoon of greek yogurt for extra creaminess if you eat dairy). For the roast itself, a light spray of refined avocado oil handles the 425F heat cleanly without smoking thanks to its ~520F smoke point; or skip it and let the tahini carry all the fat if you're trimming calories.",
  "season": "Optional shawarma blend: cumin, coriander, smoked paprika, turmeric, garlic, and a pinch of cinnamon, with salt and pepper. Stir lemon and a little garlic into the tahini sauce. Fully plant-based as written; add greek yogurt to the sauce if you eat dairy.",
  "note": "Crispy spiced chickpeas roasted shawarma-style with peppers and onion over quinoa, cooled with a lemony tahini sauce.",
  "extras": [
   [
    "Hummus",
    30
   ]
  ]
 },
 {
 "id": "bulgur-roasted-veg-feta-bowl",
 "title": "Roasted Veg & Chickpea Bulgur Bowl with Tahini-Lemon",
 "slot": "lunch",
 "protein": "Chickpeas cooked|Chicken breast cooked",
 "carb": "bulgur cooked",
 "fat": "Feta cheese|Tahini \\(sesame butter\\)|Olive oil",
 "produce": "eggplant|zucchini|bell pepper red|tomato",
 "prefProduce": "eggplant|zucchini",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) Heat the oven to 400F. 2) Prep your vegetable: eggplant or zucchini, whichever your plan lists (and red bell pepper or tomato if those are your picks). Cut it into roughly 1-inch cubes (or strips for pepper). 3) Toss the vegetable with olive oil and a pinch of salt and spread it in a single layer on a sheet pan, leaving space so it browns instead of steaming. 4) Roast at 400F for 25-30 minutes, flipping once, until deeply caramelized and soft. 5) If chickpeas are your protein pick, drain, rinse, and pat them dry, then add them to the pan for the last 12 minutes so they crisp up. 6) Warm your grain (bulgur, cooked; done when plump and chewy-tender) and spoon it into the bowl. 7) Pile the roasted vegetable (and chickpeas) over the bulgur and finish with a generous squeeze of lemon. 8) If feta is your protein pick and you eat dairy, crumble it over the hot bowl now so it softens slightly.",
 "oil": "Use olive oil. At 400F the roast sits right at the top of olive oil's ~375F range, and its flavor is exactly right for a Levantine grain bowl, so keep the oven at 400F and no higher to avoid scorching. A raw drizzle plus lemon at the end ties it together; stir in a little tahini if you want it richer.",
 "season": "Optional: oregano, cumin, sumac, garlic, salt, and pepper, with plenty of lemon and a tahini drizzle at the end. Fresh parsley or mint adds real grain-bowl texture. Crumble feta on top if you eat dairy.",
 "note": "Caramelized roasted veg over nutty bulgur with crisp chickpeas, brightened with tahini and lemon (add melty feta if you eat dairy).",
 "extras": [
  [
   "Hummus",
   30
  ]
 ]
},
 {
 "id": "snapper-veracruz-rice-peppers",
 "title": "Snapper a la Veracruzana over Rice",
 "slot": "dinner",
 "protein": "Snapper|Tilapia|Cod|Mackerel jack canned",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Olive oil",
 "produce": "Tomato|Bell pepper red|Onion",
 "prefProtein": "Snapper",
 "prefProduce": "Tomato",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1) Build the Veracruz sauce first. Warm a little olive oil in a wide skillet over medium heat. 2) Prep your vegetable: tomato, red bell pepper, or onion, whichever your plan lists. Slice the pepper or onion thin, or chop the tomato. Soften it in the oil for 4-5 minutes until limp; add a little minced garlic for the last minute. 3) If your vegetable isn't tomato, stir in a small can or a couple of chopped fresh tomatoes now anyway as the sauce base (tomato is the body of any Veracruz sauce), along with a handful of pitted green olives. Simmer 8-10 minutes until it thickens into a loose sauce. 4) Season your fish (snapper, tilapia, or cod, whichever your plan lists) and nestle the fillets down into the sauce, spooning a little sauce over the top. 5) Cover and gently poach over medium-low for 8-10 minutes (a few minutes longer for thick fillets), until the fish flakes easily with a fork and a thermometer reads 140F. 6) Warm your grain (white or brown rice, whichever your plan lists). 7) Spoon rice into bowls, lay the fish on top, blanket it with the sauce, and finish with a squeeze of lime.",
 "oil": "Use olive oil. The whole dish lives at a gentle medium simmer, well under olive oil's ~375F smoke point, and its flavor suits the Spanish-Mexican tomato base. There's no hard sear, so you don't need a higher-smoke-point oil here.",
 "season": "Optional: garlic, dried oregano, a bay leaf, a few capers if you have them, and a pinch of chili flakes for the traditional gentle heat. The olives carry a lot of salt, so taste the sauce before adding more.",
 "note": "A coastal Mexican classic: mild white fish gently poached in a tomato, pepper, and olive sauce, served over rice.",
 "extras": [
  [
   "Olives, ripe",
   25
  ]
 ]
},
 {
  "id": "cod-papillote-leek-couscous",
  "title": "Lemon Cod en Papillote with Couscous",
  "slot": "dinner",
  "protein": "Cod|Haddock|Pollock|Mackerel jack canned",
  "carb": "Couscous cooked",
  "fat": "Olive oil|Butter salted",
  "produce": "Zucchini|Leeks|Tomato",
  "prefProtein": "Cod",
  "prefFat": "Olive oil",
  "prefProduce": "Zucchini",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Heat the oven to 400F and tear off a large square of parchment paper for each fillet. 2) Pat your fish dry (cod, haddock, or pollock, whichever your plan lists) and set one fillet in the middle of each parchment square. 3) Prep your vegetable: zucchini, leeks, or tomato, whichever your plan lists. Slice zucchini into thin ribbons, leeks into thin half-moons (rinse leeks well, grit hides between the layers), or tomato into thin rounds. Pile the vegetable over and around the fish. 4) Add the fat: drizzle with olive oil, or dot with a little salted butter, whichever your plan lists. Season, then lay a couple of lemon slices on top. 5) Fold the parchment over the fish and crimp the edges tightly all the way around to make a sealed packet (the trapped steam is what cooks it). 6) Set the packets on a sheet pan and bake at 400F for 15-18 minutes; the packet will puff up. The fish is done when it flakes easily and reads 140F (open one carefully, the steam is hot). 7) Warm your grain (couscous, cooked; fluff it with a fork). 8) Spoon couscous into bowls, then open each packet right over the couscous so all the lemony juices soak in, and slide the fish and vegetables on top.",
  "oil": "Olive oil is the default and is perfect for a 400F parchment packet: the food steams in its own moisture, so the oil never gets near its ~375F smoke point, and its flavor enriches the broth. A small pat of salted butter (the other listed fat) is a lovely richer swap and stays safe here since the gentle steam keeps it well below its ~350F browning point.",
  "season": "Optional: garlic, fresh dill or thyme, salt, pepper, and lots of lemon. Steaming in parchment keeps everything delicate, so let the herbs and lemon lead.",
  "note": "A clean, restaurant-style parchment-baked white fish: fish and vegetables steamed together with lemon, served over couscous.",
  "extras": []
 },
 {
 "id": "seared-scallops-lemon-herb-barley",
 "title": "Seared Scallops over Lemon-Herb Barley",
 "slot": "dinner",
 "protein": "Scallops",
 "carb": "Barley cooked",
 "fat": "Avocado oil|Butter salted",
 "produce": "Asparagus|Spinach",
 "prefFat": "Avocado oil",
 "prefProduce": "Asparagus",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1) Pat the scallops bone-dry with paper towels and season them, this is the single biggest secret to a golden crust, since wet scallops steam instead of searing. If there's a small tough side-tab on any scallop, peel it off. 2) Prep your vegetable: asparagus or spinach, whichever your plan lists. Snap the woody ends off asparagus, or just rinse the spinach. 3) Get a skillet very hot with a thin film of avocado oil until it just starts to shimmer and ripple. Lay the scallops in, not touching, and sear undisturbed 1.5-2 minutes per side until deeply golden, then pull them out immediately so they stay tender (overcooked scallops turn rubbery). 4) Lower the heat to medium and melt a knob of salted butter in the same pan. If your vegetable is spinach, add it now and stir until just wilted, about 1 minute. 5) Stir in the cooked barley (done when plump and chewy-tender), a little grated parmesan, and a squeeze of lemon, and warm it through until creamy and risotto-like. 6) If your vegetable is asparagus, roast it at 400F for 10-12 minutes or saute it in a little oil until crisp-tender and bright green. 7) Spoon the lemony barley into bowls, set the seared scallops on top, and add the asparagus alongside.",
 "oil": "Sear the scallops in avocado oil. A real crust needs a near-smoking pan, and refined avocado oil's ~520F smoke point takes that heat without burning, whereas olive oil or butter would scorch. Then drop the heat to medium and fold in a knob of salted butter (the other listed fat) for flavor in the barley, butter browns past ~350F, so keep that step gentle.",
 "season": "Optional: garlic, black pepper, lemon zest, and fresh parsley. Scallops are naturally sweet and delicate, so keep the seasoning simple and don't overcook them.",
 "note": "A date-night plate: crisp-seared scallops over creamy lemon-herb barley with asparagus or wilted spinach.",
 "extras": [
  [
   "Hot sauce cayenne",
   5
  ]
 ]
},
 {
  "id": "mussels-mariniere-garlic-leek-bread",
  "title": "Garlic & Leek Mussels with Toasted Bread",
  "slot": "dinner",
  "protein": "Mussels",
  "carb": "Whole wheat bread|White bread|Rye bread",
  "fat": "Butter salted|Olive oil",
  "produce": "Leeks|Onion|Tomato",
  "prefProtein": "Mussels",
  "prefCarb": "Whole wheat bread",
  "prefProduce": "Leeks",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Clean the mussels: scrub the shells under cold water and pull off any stringy 'beards.' Tap any mussel that's open against the counter; if it doesn't slowly close, throw it out (open ones that won't close are dead). 2) Prep your vegetable: leeks, onion, or tomato, whichever your plan lists. Slice leeks into thin half-moons and rinse well (grit hides in the layers), slice onion thin, or chop tomato. 3) In a wide pot over medium heat, melt salted butter (or warm olive oil, whichever your plan lists) and gently soften the vegetable for 4-5 minutes until limp; add plenty of minced garlic for the last minute. 4) Pour in a splash of broth or water (a little white wine too, if you cook with it) and bring to a simmer. 5) Tip in the mussels, cover with a lid, and steam 5-7 minutes, until the shells have opened. Discard any mussel that stays firmly shut after cooking. 6) Toast thick slices of your bread (whole wheat, white, or rye, whichever your plan lists) so they're sturdy enough to mop up the broth. 7) Pile the mussels into bowls, ladle the leeky broth over them, and serve with the toast for dipping.",
  "oil": "Butter over medium heat builds the classic mariniere flavor in the broth; keep the heat moderate, since butter browns past ~350F. Olive oil (the other listed fat) works just as well if you'd rather skip the dairy. Either way the heat stays gentle, so a high-smoke-point oil isn't needed here.",
  "season": "Optional: lots of garlic, fresh parsley, a bay leaf, cracked pepper, and a squeeze of lemon. The mussels release their own briny liquor as they open, so go easy on added salt and taste the broth before adjusting.",
  "note": "A French bistro classic: mussels steamed open in a garlicky leek-and-butter broth, with toasted bread for dipping.",
  "extras": [
   [
    "Hot sauce cayenne",
    5
   ]
  ]
 },
 {
  "id": "blackened-tilapia-tacos-slaw",
  "title": "Blackened Tilapia Tacos with Cabbage Slaw",
  "slot": "dinner",
  "protein": "Tilapia|Snapper|Pollock|Mackerel jack canned",
  "carb": "Corn tortilla|Mission Carb Balance tortilla",
  "fat": "Avocado oil|Avocado raw",
  "produce": "Cabbage|Tomato|Onion",
  "prefProtein": "Tilapia",
  "prefCarb": "Corn tortilla",
  "prefFat": "Avocado oil",
  "prefProduce": "Cabbage",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Pat your fish (tilapia, snapper, or pollock, whichever your plan lists) dry with paper towels so the spices stick. Coat the fillets all over with a thin film of avocado oil, then rub on a blackening spice mix (see season line) and press it in. 2) Heat a heavy skillet (cast iron is best) over high heat for 2-3 minutes until it is very hot, a drop of water should sizzle and skip. 3) Lay the fillets in and sear 2-3 minutes per side. Do not move them; you want a dark, almost-black spice crust. The fish is done when it flakes easily with a fork and reaches 140-145F inside. 4) Move the fish to a plate and break it into big chunks with a fork. 5) Make the slaw: in a bowl, toss your shredded vegetable (cabbage, tomato, or onion, whichever your plan lists; shred the cabbage thin, dice the tomato, or thin-slice the onion) with a squeeze of lime and a pinch of salt. 6) Warm your tortilla (corn tortilla or Mission Carb Balance tortilla): hold it over a flame with tongs or set it in a dry hot pan for 20-30 seconds per side until soft and lightly charred. 7) Build each taco: a little slaw, a few chunks of blackened fish, and, if your plan lists avocado as the fat, a few slices of avocado on top. Finish with a squeeze of lime.",
  "oil": "Cook in avocado oil (smoke point ~520F). Blackening needs a screaming-hot pan, and avocado oil takes that heat without smoking or turning the spices bitter. Skip olive oil or butter here, they would scorch. If your plan lists avocado (not the oil) as the fat, slice it on at the end as a cool, creamy finish instead.",
  "season": "Blackening rub (optional but classic): smoked paprika, cumin, garlic powder, onion powder, dried oregano, salt, black pepper, and a little cayenne for heat. A big squeeze of fresh lime over the finished tacos ties it all together. Fresh cilantro on top if you have it.",
  "note": "Fast, fresh fish tacos, spice-blackened fish on warm tortillas with a crunchy lime slaw.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
  "id": "loaded-cobb-potato-salad",
  "title": "Loaded Chicken Cobb with Baby Potatoes",
  "slot": "lunch",
  "protein": "chicken breast cooked|egg whole cooked|bacon cooked|Chicken leg quarters roasted",
  "carb": "potato baked",
  "fat": "Avocado raw",
  "produce": "romaine lettuce|tomato raw|onion raw",
  "prefProtein": "chicken breast cooked",
  "prefProduce": "romaine lettuce",
  "diets": [
   "omnivore"
  ],
  "method": "1) Cook your protein (chicken breast, whole egg, or bacon, whichever your plan lists). For chicken: season it, then pan-sear over medium-high heat 5-6 minutes per side until it reaches 165F inside; rest 5 minutes and slice. For egg: place in boiling water and cook 7-8 minutes for jammy yolks (or 9-10 for firm), then cool under cold water, peel, and halve. For bacon: lay in a cold pan, cook over medium heat 4-5 minutes per side until crisp, drain on paper towel, and crumble. 2) Cook the baby potatoes: halve them, drop into salted boiling water, and boil 12-15 minutes until a fork slides in easily; drain and let cool a few minutes. 3) Prep the salad base: chop the romaine lettuce and spread it on a platter or in a wide bowl. 4) Dice the tomato and thinly slice a little raw onion. 5) If your plan lists avocado, slice or cube it. 6) Build it cobb-style in tidy rows over the romaine: your cooked protein, the potatoes, tomato, onion, and avocado. 7) Whisk a quick dressing of olive oil with a squeeze of lemon (or red-wine vinegar), salt, and pepper, and drizzle it over just before eating.",
  "oil": "If you are searing chicken, use a thin coat of avocado oil (smoke point ~520F), it handles a hard sear without breaking down; a quick mist of avocado-oil spray works on a tight fat budget. Reserve extra-virgin olive oil (smoke point ~375F) for the dressing only, used raw and unheated, its smoke point doesn't matter and you want its fruity, peppery flavor. Do not sear in olive oil; it would smoke. (Egg and bacon don't need added oil.)",
  "season": "Optional: salt, cracked black pepper, and a little garlic powder on the chicken. A squeeze of lemon over the avocado keeps it green. A small spoon of Dijon-style yellow mustard whisked into the dressing makes it taste like a steakhouse cobb.",
  "note": "A composed cobb salad in tidy rows over romaine with baby potatoes and a lemon-olive oil dressing.",
  "extras": [
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
  "id": "tuna-nicoise-potato-green-bean-salad",
  "title": "Tuna Nicoise with Potato, Green Beans & Olives",
  "slot": "lunch",
  "protein": "Tuna light canned in water|Tuna yellowfin cooked|Egg whole cooked|Mackerel jack canned",
  "carb": "potato baked",
  "fat": "olive oil|Olives ripe",
  "produce": "green beans cooked|tomato raw|romaine lettuce|onion raw",
  "prefProtein": "Tuna light canned in water",
  "prefFat": "olive oil",
  "prefProduce": "green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) Cook the baby potatoes: halve them, drop into salted boiling water, and boil 12-15 minutes until fork-tender. 2) Prep your vegetable (green beans, tomato, romaine lettuce, or onion, whichever your plan lists): if it's green beans, drop them into the same pot for the last 3 minutes to blanch until bright green and crisp-tender, then drain everything and cool. If it's tomato, halve or wedge it; romaine, chop it; onion, slice it thin. 3) Prep your protein (canned light tuna, cooked yellowfin tuna, or whole egg, whichever your plan lists): drain the canned tuna and flake it; slice cooked tuna; or for egg, boil 7-8 minutes for jammy yolks, cool under cold water, peel, and quarter. 4) Compose Nicoise-style on a platter (over chopped romaine if that's your produce): arrange the warm potatoes, your prepared vegetable, and your protein in separate tidy piles. 5) If your plan lists ripe olives as the fat, scatter a few over the top. 6) Whisk olive oil with lemon juice, salt, and pepper (and a touch of Dijon-style mustard) and spoon the vinaigrette over the whole platter just before serving.",
  "oil": "Extra-virgin olive oil (smoke point ~375F) used raw as the vinaigrette, this is the heart of a Nicoise, and since nothing is seared, its lower smoke point doesn't matter and you get all the fruity, peppery flavor. If your plan lists ripe olives as the fat instead, they add their own savory richness, so the dressing just needs a small drizzle. No high-heat oil is needed anywhere in this dish.",
  "season": "Optional: Dijon-style mustard whisked into the dressing, plus salt, pepper, capers if you have them, and fresh or dried thyme. A big squeeze of lemon does most of the seasoning work.",
  "note": "The classic French composed salad, protein, baby potatoes, and a lemon-Dijon olive oil vinaigrette.",
  "extras": [
   [
    "Yellow mustard",
    10
   ]
  ]
 },
 {
  "id": "greek-chickpea-bulgur-salad",
  "title": "Greek Chickpea & Bulgur Salad",
  "slot": "lunch",
  "protein": "Chickpeas cooked",
  "carb": "Bulgur cooked|Couscous cooked|Quinoa cooked",
  "fat": "olive oil",
  "produce": "cucumber raw|tomato raw|onion raw|romaine lettuce",
  "prefCarb": "Bulgur cooked",
  "prefProduce": "cucumber raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your grain (bulgur, couscous, or quinoa, whichever your plan lists): for bulgur or couscous, pour boiling water over it, cover, and let sit 12-15 minutes, then fluff with a fork; for quinoa, simmer in water about 15 minutes until the little curls pop out, then fluff. Let the grain cool to room temperature so the salad stays light. 2) Drain and rinse the chickpeas in a colander. 3) Prep your vegetable (cucumber, tomato, onion, or romaine lettuce, whichever your plan lists): dice the cucumber or tomato, thinly slice the onion (soak slices in cold water 5 minutes first to mellow the bite), or chop the romaine. 4) In a big bowl, combine the cooled grain, chickpeas, and your prepared vegetable. 5) Dress with a generous pour of olive oil and a big squeeze of lemon, plus salt and pepper, and toss well. 6) Let it sit 10 minutes before serving so the grain drinks up the dressing.",
  "oil": "Extra-virgin olive oil (smoke point ~375F) used raw as the dressing, there's no heat at all, so the smoke point is irrelevant and you want its grassy, peppery flavor. Lemon juice or red-wine vinegar brightens it.",
  "season": "Optional: dried oregano (essential for the Greek vibe), garlic, salt and pepper, a pinch of dried mint, and chopped parsley. Crumble feta over the top if you eat dairy, it's the classic finish; skip it to keep the bowl vegan.",
  "note": "A bright, make-ahead Mediterranean grain salad in a lemon-oregano olive oil dressing; feta optional.",
  "extras": [
   [
    "Feta cheese",
    20
   ],
   [
    "Olives ripe",
    15
   ]
  ]
 },
 {
  "id": "falafel-bulgur-tahini-bowl",
  "title": "Falafel & Bulgur Bowl with Lemon Tahini",
  "slot": "lunch",
  "protein": "Falafel|Chickpeas cooked",
  "carb": "Bulgur cooked|Couscous cooked|Quinoa cooked",
  "fat": "Tahini|Olive oil",
  "produce": "cucumber raw|tomato raw|spinach raw|arugula raw|onion raw",
  "prefProtein": "Falafel",
  "prefCarb": "Bulgur cooked",
  "prefProduce": "cucumber raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your grain (bulgur, couscous, or quinoa, whichever your plan lists): for bulgur or couscous, steep in boiling water 12-15 minutes, then fluff; for quinoa, simmer about 15 minutes until tender, then fluff. Let it cool slightly. 2) Cook your protein (falafel or chickpeas, whichever your plan lists). For falafel: pan-fry in a lightly oiled skillet over medium heat 2-3 minutes per side, or bake/air-fry at 400F for 12-15 minutes, until the outsides are crunchy and the insides are hot. For chickpeas: drain, rinse, pat dry, and either use as-is or crisp them in a hot lightly oiled pan 5-6 minutes, shaking often. 3) Prep your vegetable (cucumber, tomato, spinach, arugula, or onion, whichever your plan lists): dice the cucumber or tomato, use the spinach or arugula raw as a base, or thinly slice the onion. 4) Make the tahini sauce: stir the tahini with a squeeze of lemon, a splash of water, a pinch of salt, and a grated garlic clove until it's smooth and pourable (it seizes first, then loosens, keep adding water a teaspoon at a time). 5) Build the bowl: greens or grain on the bottom, then the warm grain, your protein, and your prepared vegetable. 6) Drizzle the lemon-garlic tahini generously over the top.",
  "oil": "Tahini is the finishing fat and the whole flavor engine here, thinned with lemon and water into a creamy sauce, no cooking oil required. If you pan-crisp the falafel or chickpeas rather than bake them, a thin film of avocado oil (smoke point ~520F) handles medium-high heat without burning; honest medium-heat olive oil is fine too.",
  "season": "Optional: cumin, coriander, smoked paprika, and plenty of lemon in the tahini sauce, with chopped parsley or mint on top. A pinch of sumac or za'atar makes it taste straight off a mezze table.",
  "note": "A Middle Eastern mezze bowl under a pourable lemon-garlic tahini sauce; naturally vegan.",
  "extras": [
   [
    "Hummus",
    30
   ],
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "lentil-beet-goat-cheese-walnut-salad",
  "title": "French Lentil, Beet & Walnut Salad",
  "slot": "lunch",
  "protein": "Lentils cooked|Goat cheese soft",
  "carb": "Lentils cooked",
  "fat": "Goat cheese soft|Walnuts|olive oil",
  "produce": "arugula raw|beets cooked|onion raw",
  "prefProtein": "Lentils cooked",
  "prefFat": "Goat cheese soft",
  "prefProduce": "arugula raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) If you're using pre-cooked lentils, warm them gently or use at room temperature; if cooking from dry, simmer French-style green lentils about 20-25 minutes until just tender but still holding their shape, then drain. 2) Dice the cooked beets into bite-size pieces. 3) Toast the walnuts: put them in a dry pan over medium heat and toast 2-3 minutes, shaking often, until they smell nutty, watch closely so they don't burn. 4) Pile a generous bed of arugula on each plate. 5) Spoon the lentils over the arugula, then scatter the beets, a little thinly-sliced raw onion, and the toasted walnuts on top. 6) If your plan lists soft goat cheese and you eat dairy, crumble it over. 7) Whisk olive oil with a squeeze of lemon (or a splash of balsamic), salt, and pepper, and drizzle over just before serving.",
  "oil": "Extra-virgin olive oil (smoke point ~375F) whisked raw into the vinaigrette, no heat, so its lower smoke point doesn't matter and the fruity flavor shines against the earthy beets and lentils. The walnuts are dry-toasted with no oil, and a little soft goat cheese adds creaminess if you eat dairy. Nothing needs a hot pan here.",
  "season": "Optional: a little Dijon-style mustard and a splash of balsamic in the dressing, plus salt, cracked pepper, and fresh thyme or parsley. A pinch of lemon or orange zest over the beets lifts everything.",
  "note": "A French bistro salad, earthy lentils and sweet beets over arugula with toasted walnuts (goat cheese optional if you eat dairy).",
  "extras": []
 },
 {
  "id": "hearty-lentil-vegetable-soup",
  "title": "Hearty Lentil & Vegetable Soup",
  "slot": "dinner",
  "protein": "lentils",
  "carb": "lentils",
  "fat": "olive oil",
  "produce": "carrots|celery|onion|tomato|spinach|kale",
  "prefProduce": "carrots|celery|onion",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice your vegetables (carrots, celery, onion, tomato, spinach, and kale, use whichever your plan lists; dice the carrot, celery, onion, and tomato small, and chop the leafy greens). 2) Heat olive oil in a pot over medium heat and add the diced carrot, celery, and onion (the classic 'mirepoix' base). Sweat 6-8 minutes, stirring now and then, until soft and fragrant. 3) Stir in garlic (and a spoon of tomato paste or your chopped tomato if you have it) and cook 1 minute. 4) Add the rinsed lentils and enough water or vegetable broth to cover everything by a couple inches. Bring to a boil, then drop to a gentle simmer for 25-30 minutes, until the lentils are tender and the soup has thickened. 5) If your plan lists spinach or kale, stir big handfuls in during the last 3-4 minutes to wilt. 6) Finish with a squeeze of lemon, salt, pepper, and a small drizzle of raw olive oil over each bowl.",
  "oil": "Olive oil (smoke point ~375F) is perfect here, this is a gentle medium-heat sweat of the vegetables, never a hard sear, so the oil stays well under its smoke point and its flavor builds the base. Drizzle a little extra raw over each bowl to finish.",
  "season": "Optional: garlic, cumin, smoked paprika, a bay leaf, and a sprig of thyme while it simmers, plus salt, pepper, and a squeeze of lemon at the end. Lemon and lentils are old friends, it wakes the whole pot up.",
  "note": "A cozy, brothy lentil-and-vegetable soup. Fully plant-based, freezer-friendly, and cheap.",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ]
  ]
 },
 {
  "id": "tuscan-white-bean-kale-soup",
  "title": "Tuscan White Bean & Kale Soup",
  "slot": "dinner",
  "protein": "white beans|navy beans|White beans cooked",
  "carb": "white beans|navy beans",
  "fat": "Parmesan grated|olive oil",
  "produce": "kale|carrots|celery|onion|tomato",
  "prefFat": "Parmesan grated",
  "prefProduce": "kale",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice your vegetables (kale, carrots, celery, onion, and tomato, use whichever your plan lists; dice the carrot, celery, onion, and tomato, and ribbon the kale by stripping leaves off the stems and slicing thin). 2) Heat olive oil in a pot over medium heat and sweat the diced carrot, celery, and onion 6-8 minutes until soft. 3) Add garlic and the chopped tomato and cook 2 minutes. 4) Tip in your beans (white beans, navy beans, or cannellini, whichever your plan lists) with broth or water and a sprig of rosemary. Simmer 15 minutes. For a velvety body, mash a ladleful of the beans against the side of the pot and stir it back in. 5) Add the ribboned kale and simmer 8-10 minutes more until silky. 6) Off the heat, drizzle each bowl with raw olive oil. If your plan lists grated parmesan and you eat dairy, shower it on top.",
  "oil": "Olive oil (smoke point ~375F) to sweat the vegetables over gentle medium heat, then a generous raw olive oil drizzle to finish each bowl. If your plan lists parmesan and you eat dairy, grated parmesan stirred into the hot soup is the classic Tuscan finish, drop in a parmesan rind while it simmers if you have one.",
  "season": "Optional: rosemary and thyme (the signature Tuscan herbs), garlic, a bay leaf, a pinch of red pepper flakes, salt, and pepper. A parmesan rind simmered in the broth is the quiet secret that makes it taste like it cooked all day.",
  "note": "A ribollita-style white bean and kale soup, creamy from mashed beans, herby with rosemary (add parmesan if you eat dairy).",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ]
  ]
 },
 {
  "id": "three-bean-chili-bowl",
  "title": "Smoky Three-Bean Chili",
  "slot": "dinner",
  "protein": "kidney beans|black beans|pinto beans|beef ground 93/7|beef ground 93/7",
  "carb": "kidney beans|black beans|pinto beans|Mission Carb Balance tortilla|corn tortilla",
  "fat": "Avocado raw|cheddar cheese",
  "produce": "bell pepper red|onion|tomato|sweet corn",
  "prefProtein": "kidney beans|black beans|pinto beans",
  "prefFat": "avocado",
  "prefProduce": "bell pepper red|onion|tomato",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice your vegetables (red bell pepper, onion, tomato, and sweet corn, use whichever your plan lists; dice the pepper, onion, and tomato, and cut the corn off the cob or measure out kernels). 2) Cook your protein. If it's beans (kidney, black, or pinto, whichever your plan lists), set them aside drained and rinsed. If it's ground beef (93/7), brown it first in the pot over medium-high heat 5-6 minutes, breaking it up. 3) Add the diced onion and bell pepper (with a little spray oil if you're going meatless, or straight into the rendered beef fat) and cook over medium-high 5 minutes until soft. 4) Stir in garlic, cumin, chili powder, and smoked paprika and toast 30 seconds until fragrant. 5) Add your beans, the chopped tomato, the sweet corn, and a splash of water or broth. Simmer 20-25 minutes, stirring now and then, until thick and stew-like. Mash a few beans against the pot to thicken. 6) Serve topped with your fat: sliced avocado, or a little shredded cheddar if your plan lists it. If your plan lists corn tortillas as the carb, char them and serve alongside for scooping.",
  "oil": "Use spray oil for the saute so your fat budget goes to the creamy avocado (or shredded cheddar) on top, which is the real finishing fat here. If you're using ground beef, it renders enough of its own fat to cook the vegetables in, no added oil needed.",
  "season": "Optional and encouraged: cumin, chili powder, smoked paprika, oregano, a pinch of cinnamon for depth, garlic, salt, and a big squeeze of lime at the end. Cilantro and hot sauce if you've got them. A spoon of salsa stirred in is a free flavor boost.",
  "note": "A thick, smoky three-bean chili, keep it plant-based with avocado, or anchor it with lean ground beef.",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ]
  ]
 },
 {
  "id": "chicken-wild-rice-soup",
  "title": "Chicken & Wild Rice Soup",
  "slot": "dinner",
  "protein": "chicken breast|chicken thigh|Chicken leg quarters roasted",
  "carb": "wild rice cooked|brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "butter salted|olive oil",
  "produce": "carrots|celery|onion",
  "prefProtein": "chicken breast",
  "prefFat": "butter salted",
  "prefProduce": "carrots|celery|onion",
  "diets": [
   "omnivore"
  ],
  "method": "1) Dice your vegetables (carrots, celery, onion, and zucchini, use whichever your plan lists; dice the carrot, celery, and onion, and slice the zucchini). 2) Melt a little butter in a pot over medium heat and sweat the vegetables 7-8 minutes until soft. 3) Add garlic and a sprinkle of thyme and stir 30 seconds. 4) Pour in chicken broth and bring to a gentle simmer. 5) Cook your protein (chicken breast or chicken thigh, whichever your plan lists): dice it raw and poach it in the simmering broth 12-15 minutes until cooked through and no longer pink inside (or fold in already-cooked shredded chicken and just heat through). 6) Stir in the cooked rice (wild or brown, whichever your plan lists) and warm 3-4 minutes. 7) Finish with a splash of milk for a creamier broth (optional), a squeeze of lemon, salt, and pepper.",
  "oil": "A small pat of salted butter over medium heat gives the soup its cozy, rich backbone. Butter's milk solids brown past ~350F, but this is a low-and-slow sweat, not a sear, so it never gets near that point. Olive oil works if you want to skip the dairy.",
  "season": "Optional: thyme, a bay leaf, garlic, a little poultry seasoning or sage, salt, and pepper, with parsley at the end. A squeeze of lemon and a crack of black pepper keep the creamy broth from feeling heavy.",
  "note": "A comforting, brothy chicken and wild rice soup with mirepoix, the classic cold-weather bowl.",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ]
  ]
 },
 {
  "id": "smoky-split-pea-ham-soup",
  "title": "Smoky Split Pea Soup",
  "slot": "dinner",
  "protein": "split peas|ham extra lean",
  "carb": "split peas",
  "fat": "olive oil",
  "produce": "carrots|celery|onion",
  "prefProtein": "split peas|ham extra lean",
  "prefProduce": "carrots|celery|onion",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice your vegetables (carrots, celery, and onion, use whichever your plan lists). 2) Heat olive oil in a pot over medium heat and sweat the diced vegetables 6-8 minutes until soft. 3) Add garlic and a sprinkle of smoked paprika and stir 30 seconds. 4) Add your protein and the split peas. If your plan lists split peas alone, rinse and add them; if it lists extra-lean ham and you eat meat, dice it and add it now alongside the peas. 5) Pour in broth or water to cover by a few inches, add a bay leaf, and bring to a boil. 6) Drop to a simmer, partially cover, and cook 45-60 minutes, stirring now and then, until the peas break down into a thick, creamy soup. Add water if it gets too thick. 7) Fish out the bay leaf and finish with black pepper and a squeeze of lemon.",
  "oil": "Olive oil (smoke point ~375F) for the medium-heat sweat that builds the base, a gentle saute, well under its smoke point. The smokiness comes from the smoked paprika (and ham, if you use it), not from searing, so a light pour is all you need.",
  "season": "Optional: smoked paprika (key to the smoky flavor without meat), a bay leaf, thyme, garlic, black pepper, and a squeeze of lemon or splash of vinegar at the end. If you add lean ham it brings plenty of salt, so taste before adding more.",
  "note": "Old-school split pea soup simmered until the peas melt into a thick, smoky bowl. Vegan as built; add lean ham if you eat meat.",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ]
  ]
 },
 {
  "id": "thai-peanut-tofu-rice-bowl",
  "title": "Thai Peanut Tofu Bowl over Jasmine Rice",
  "slot": "dinner",
  "protein": "Tofu firm|TVP",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Peanut butter smooth|Olive oil",
  "produce": "Snap peas cooked|Bell pepper red raw|Carrots raw|Cabbage cooked",
  "prefProtein": "Tofu firm",
  "prefFat": "Peanut butter smooth",
  "prefProduce": "Snap peas cooked",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook the rice (white or brown, whichever your plan lists) and keep it warm. 2) Press the tofu 10 minutes between paper towels under something heavy to squeeze out water, then cut into cubes. 3) Heat a thin coat of oil in a pan over high heat and sear the tofu 8-10 minutes, turning every couple minutes, until golden and crisp on all sides; set aside. 4) In the same hot pan, stir-fry your vegetable (snap peas, red bell pepper, carrots, or cabbage, whichever your plan lists; slice the pepper, trim the snap peas, shred the carrot, or slice the cabbage) for 3-4 minutes so it stays crisp-tender. 5) Make the sauce: whisk the peanut butter with tamari (gluten-free soy sauce), a little sriracha, a splash of water, and a squeeze of lime until pourable. 6) Return the tofu to the pan, pour the peanut sauce over, and toss 1 minute to coat. 7) Spoon everything over the warm rice.",
  "oil": "Sear the tofu in avocado oil (smoke point ~520F) so it crisps hard at high heat without smoking; canola (~450F) works too. The peanut butter is the real flavor fat here, whisked raw into the sauce off the heat, so keep the pan fat to a light coat. Don't sear in olive oil (~375F), it would scorch before the tofu browns.",
  "season": "Optional: lime juice, tamari (gluten-free soy sauce), sriracha, fresh garlic and ginger, and a pinch of red pepper flakes. Crushed peanuts and torn cilantro on top sell the Thai street-food vibe. A thread of maple in the sauce balances the heat if you like it sweeter.",
  "note": "A satay-style Thai bowl, crispy seared tofu and crisp veg in a creamy peanut-lime sauce over rice. Fully plant-based.",
  "extras": [
   [
    "Light peanut sauce",
    30
   ]
  ]
 },
 {
  "id": "chickpea-coconut-curry-rice",
  "title": "Coconut Chickpea Curry over Rice",
  "slot": "dinner",
  "protein": "Chickpeas cooked",
  "carb": "Brown rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Coconut oil|Olive oil",
  "produce": "Spinach cooked|Tomato raw|Cauliflower cooked|Onion raw",
  "prefProtein": "Chickpeas cooked",
  "prefProduce": "Spinach cooked|Tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook the rice (brown or white, whichever your plan lists) and keep it warm. 2) Drain and rinse the chickpeas. 3) Prep your vegetable (spinach, tomato, cauliflower, or onion, whichever your plan lists; dice the onion or tomato, cut cauliflower into small florets, or have the spinach ready to wilt). 4) Melt a little coconut oil in a pot over medium heat and saute the onion (or your prepped vegetable base) 4-5 minutes until soft. 5) Bloom the spices: stir in curry powder, cumin, turmeric, and a little garam masala and cook 30 seconds until fragrant. 6) Add the diced tomato and cook 3-4 minutes until it breaks down into a sauce. 7) Stir in the chickpeas with a splash of almond milk to loosen, and simmer 8-10 minutes so the flavors marry. 8) If your plan lists spinach or cauliflower, fold it in near the end, spinach to wilt for 1-2 minutes, or steamed cauliflower to warm through. 9) Spoon over the warm rice.",
  "oil": "Coconut oil over medium heat is the move here, it sits comfortably under its ~350F refined smoke point on a gentle saute, and its flavor is exactly right for a coconut curry. Don't crank the heat; this is a slow simmer, not a sear, so the oil never needs to run hot.",
  "season": "Optional: curry powder, cumin, turmeric, garam masala, fresh garlic and ginger, and a pinch of salt. A squeeze of lime and torn cilantro at the end brighten it; a dash of sriracha if you want heat. Almond milk stands in for coconut milk to keep it creamy.",
  "note": "A cozy chana-masala-style curry, chickpeas simmered with tomato and warm spices in a creamy coconut base over rice. Fully plant-based.",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    30
   ]
  ]
 },
 {
  "id": "korean-gochujang-tempeh-rice-bowl",
  "title": "Korean Gochujang Tempeh Bowl",
  "slot": "dinner",
  "protein": "Tempeh|TVP",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Cashews",
  "produce": "Bok choy|Cabbage|Carrots|Cucumber",
  "prefProtein": "Tempeh",
  "prefFat": "Avocado oil",
  "prefProduce": "Bok choy cooked",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cut the tempeh into bite-size cubes. Steam or simmer the cubes in water for 8-10 minutes first to take away the slightly bitter edge, then pat them dry. 2) Heat a thin film of oil in a pan over high heat. Add the tempeh in a single layer and sear 5-6 minutes, turning the cubes so the outsides go deep golden and a little crisp. 3) While that cooks, whisk a Korean-style glaze in a small bowl: a few tablespoons of tamari (gluten-free soy sauce), a squeeze of sriracha (or gluten-free gochujang if you have it), a little maple syrup, and grated garlic and ginger. 4) Pour the glaze over the seared tempeh and cook 1-2 minutes more, stirring, until it thickens and sticks to the cubes. 5) Push the tempeh to one side (or scoop it out) and quick-cook your vegetable in the same hot pan: stir-fry the produce (bok choy, cabbage, carrots, or cucumber, whichever your plan lists) for 2-3 minutes until just tender; if your pick is cucumber, leave it raw and add it cold at the end for crunch instead. 6) Cook your rice (white or brown) per the package, then pile the rice into a bowl, top with the glazed tempeh and the vegetable, and serve.",
  "oil": "Sear in avocado oil (smoke point ~520F): it is neutral and handles the high heat that gives the tempeh crispy, caramelized edges without smoking or turning bitter. If your plan lists cashews as the fat instead, scatter a small handful of chopped cashews over the finished bowl as the finishing fat for crunch and use just a quick mist of avocado oil to sear. Skip butter or olive oil here, they would burn before the tempeh browns.",
  "season": "tamari (gluten-free soy sauce), sriracha (or gluten-free gochujang), a touch of maple, garlic, and ginger build the glaze. Finish with toasted sesame seeds and sliced green onion on top. A spoon of kimchi on the side is very Korean and gut-friendly. Use maple, not honey, to keep it vegan.",
  "note": "A sweet-and-spicy Korean-style bowl: sticky glazed tempeh with a quick-cooked vegetable and fresh crunch over rice. Fully plant-based.",
  "extras": [
   [
    "Kimchi",
    30
   ],
   [
    "Gochujang",
    15
   ]
  ]
 },
 {
  "id": "bbq-tofu-sweet-potato-plate",
  "title": "BBQ Tofu with Baked Sweet Potato & Slaw",
  "slot": "dinner",
  "protein": "Tofu firm|TVP",
  "carb": "Sweet potato baked",
  "fat": "Avocado oil|Avocado raw",
  "produce": "Cabbage cooked|Carrots raw|Sweet corn cooked",
  "prefProtein": "Tofu firm",
  "prefCarb": "Sweet potato baked",
  "prefFat": "Avocado oil",
  "prefProduce": "Cabbage cooked",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Drain the tofu and press it 10-15 minutes between paper towels with a weight on top to squeeze out water (this helps it crisp). Slice it into thick planks. 2) Toss or brush the planks lightly with oil and roast on a lined tray at 425F for 25-30 minutes, flipping once halfway, until firm, chewy, and golden at the edges. 3) Bake the sweet potato whole at 400F (about 45-55 minutes) until a knife slides in easily and it is soft inside; you can roast it alongside the tofu. 4) Stir together a quick barbecue glaze: ketchup, a little maple syrup, yellow mustard, and a splash of tamari (gluten-free soy sauce). Brush it onto the tofu for the LAST 8 minutes of roasting so the sugars lacquer the surface without burning. 5) Make a fast slaw: toss your vegetable (cabbage, carrots, or sweet corn, whichever your plan lists) with a squeeze of lime and a pinch of salt; if your pick is cabbage or corn, steam or saute it 3-4 minutes first, then dress it; raw carrots can be shredded and used as-is. 6) Plate the BBQ tofu with the split-open sweet potato and the slaw alongside.",
  "oil": "Coat the tofu in avocado oil (smoke point ~520F) for the 425F roast: it crisps the edges cleanly at high heat, where olive oil or butter would smoke and turn bitter. If your plan lists raw avocado as the fat instead, use just a light mist of avocado oil on the tofu and lay sliced avocado on the plate as the finishing fat. Brush the sweet, sugary BBQ glaze on only at the end so it caramelizes instead of scorching.",
  "season": "Build the glaze from ketchup, maple, mustard, and tamari (gluten-free soy sauce), plus smoked paprika, garlic powder, onion powder, and a pinch of cayenne for smoky barbecue depth. A little apple cider vinegar in the slaw cuts the richness.",
  "note": "A plant-based cookout plate: chewy roasted tofu lacquered in homemade BBQ glaze with a fluffy baked sweet potato and crunchy slaw. Fully vegan.",
  "extras": [
   [
    "BBQ sauce",
    17
   ],
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "smoky-tempeh-tacos",
  "title": "Smoky Tempeh Tacos with Avocado",
  "slot": "dinner",
  "protein": "Tempeh|TVP",
  "carb": "Corn tortilla|Mission Carb Balance",
  "fat": "Avocado raw",
  "produce": "Cabbage cooked|Onion raw|Tomato raw|Bell pepper red raw",
  "prefProtein": "Tempeh",
  "prefCarb": "Corn tortilla",
  "prefFat": "Avocado raw",
  "prefProduce": "Cabbage cooked|Onion raw",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Crumble the tempeh into small pieces by hand. Steam the crumbles 5 minutes to mellow them, then pat dry. 2) Heat a teaspoon of oil in a pan over medium-high heat. Add the tempeh crumbles and brown 6-8 minutes, breaking them up with a spoon into a taco-meat texture and tossing with cumin, chili powder, smoked paprika, garlic powder, and a splash of tamari (gluten-free soy sauce), until the bits crisp at the edges. 3) Warm your tortillas (corn tortilla, or Mission Carb Balance, whichever your plan lists): char each one 20-30 seconds per side over a gas burner or in a dry pan until pliable and lightly spotted. 4) Prep the fresh toppings: dice the tomato, slice the bell pepper, thinly slice the onion (soak raw onion in cold water 5 minutes first to mellow its bite), and shred the cabbage; if your cabbage pick is cooked, saute it 2-3 minutes to soften. 5) Slice the avocado. 6) Fill each tortilla with the smoky tempeh, then layer on your produce (cabbage, onion, tomato, or red bell pepper, whichever your plan lists) and the avocado. Squeeze lime over the top and serve.",
  "oil": "Brown the crumbled tempeh in a teaspoon of avocado oil (smoke point ~520F): it handles medium-high heat without smoking, where butter or olive oil would burn. A mist of spray oil works too, since the raw avocado on top is carrying most of the fat, save your fat grams for that creamy avocado rather than the pan.",
  "season": "Cumin, chili powder, smoked paprika, garlic powder, and a splash of tamari (gluten-free soy sauce) give a meaty, taco-truck depth. Finish with lime juice, cilantro, and a spoon of salsa or hot sauce.",
  "note": "Plant-based street tacos: smoky chili-cumin tempeh crumbles on charred tortillas with avocado and fresh toppings. Fully vegan.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cheese reduced-fat cheddar",
    20
   ]
  ]
 },
 {
  "id": "miso-glazed-tofu-eggplant-donburi",
  "title": "Miso-Glazed Tofu & Eggplant Donburi",
  "slot": "dinner",
  "protein": "Tofu firm|TVP",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Tahini",
  "produce": "Eggplant cooked|Bok choy cooked|Cabbage cooked",
  "prefProtein": "Tofu firm",
  "prefFat": "Avocado oil",
  "prefProduce": "Eggplant cooked",
  "diets": [
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Drain and press the tofu 10 minutes, then cut it into bite-size cubes. Cut your vegetable too: cube the eggplant, or chop the bok choy or cabbage (whichever your plan lists). 2) Heat a thin film of oil in a pan over medium-high heat. Add the tofu and the eggplant and sear 8-10 minutes, turning, until the tofu is golden on several sides and the eggplant is soft, browned, and caramelized; bok choy or cabbage only need 2-3 minutes, so add those later. 3) Whisk a dengaku-style glaze in a small bowl: certified gluten-free miso paste, a little maple syrup, a splash of tamari (gluten-free soy sauce), and a splash of water until smooth. 4) Lower the heat to medium, pour the glaze over the pan, and toss everything 1-2 minutes until it clings and turns glossy, keep it moving so the certified gluten-free miso does not scorch. 5) Cook your rice (white or brown) per the package. 6) Spoon the rice into a bowl donburi-style, top with the glazed tofu and vegetable, and finish with a drizzle of tahini if your plan lists tahini as the fat, for extra nutty richness.",
  "oil": "Sear in avocado oil (smoke point ~520F): it takes the medium-high heat that collapses and caramelizes the eggplant and crisps the tofu without smoking. Drop the heat to medium before the certified gluten-free miso glaze goes in, because certified gluten-free miso burns fast. If your plan's fat is tahini, thread a little raw tahini over the finished bowl, it adds richness with no cooking.",
  "season": "White or yellow certified gluten-free miso paste is the star (fermented and gut-friendly), with maple, tamari (gluten-free soy sauce), and grated ginger and garlic. Top with toasted sesame seeds and sliced green onion. Use maple instead of honey to keep it vegan.",
  "note": "A Japanese-style donburi: certified gluten-free miso-caramelized tofu and a silky vegetable over rice. Savory, umami-rich, and fully plant-based.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ],
   [
    "Miso paste",
    8
   ]
  ]
 },
 {
  "id": "cuban-black-bean-quinoa-corn-bowl",
  "title": "Cuban Black Bean & Quinoa Bowl with Charred Corn",
  "slot": "dinner",
  "protein": "black beans",
  "carb": "quinoa cooked|brown rice cooked|Riced cauliflower cooked",
  "fat": "Avocado raw",
  "produce": "bell pepper red raw|sweet corn cooked|onion raw|tomato raw",
  "prefProtein": "black beans",
  "prefCarb": "quinoa cooked",
  "prefProduce": "bell pepper red raw|sweet corn cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice the onion and red bell pepper. Heat a teaspoon of oil in a pan over medium heat and saute the onion and pepper 5-6 minutes until soft and fragrant. 2) Stir in the black beans along with cumin, dried oregano, and a splash of water. Simmer 5-7 minutes, mashing a few beans against the side of the pan so the mixture goes saucy and thick. 3) In a separate dry-hot pan, char the sweet corn 2-3 minutes, stirring, until it picks up dark spots. 4) Cook your grain (quinoa or brown rice, whichever your plan lists) per the package and spoon it warm into a bowl. 5) Top with the saucy black beans and the charred corn, then add diced fresh tomato and sliced raw avocado. 6) Finish with a big squeeze of lime.",
  "oil": "For the medium-heat saute use a teaspoon of light/refined olive oil (smoke point ~465F) or a quick mist of spray oil, the heat is gentle, so a neutral all-purpose oil is plenty. The avocado, sliced on top off the heat, is the real finishing fat, so its creamy texture stays intact (never cook it).",
  "season": "Cumin, dried oregano, smoked paprika, and a bay leaf in the beans, plus a big squeeze of lime at the end. Chopped cilantro and a little hot sauce push it toward the real thing.",
  "note": "Cuban-style black beans simmered with cumin and oregano over your grain, with smoky charred corn and creamy avocado.",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "split-pea-dal-rice-spinach-bowl",
  "title": "Golden Split-Pea Dal over Rice with Wilted Spinach",
  "slot": "dinner",
  "protein": "split peas",
  "carb": "brown rice cooked|white rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "coconut oil|Olive oil",
  "produce": "spinach cooked|tomato raw|onion raw|carrots raw",
  "prefProtein": "split peas",
  "prefProduce": "spinach cooked|tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Put the cooked split peas in a pot with a little water, diced tomato, turmeric, and cumin. Simmer 8-10 minutes, mashing some of the peas against the side of the pot so it thickens into a loose, soupy dal. 2) Make the tarka (tempering): in a small pan, warm a teaspoon of coconut oil over medium heat and bloom minced garlic and diced onion 2-3 minutes until fragrant and lightly golden. 3) Stir that bloomed garlic-onion oil into the dal. 4) Add the spinach (and the shredded carrots, if your plan lists carrots) and stir until the spinach wilts, about 1-2 minutes. 5) Cook your rice (brown or white) per the package. 6) Spoon the rice into a bowl and ladle the dal over the top.",
  "oil": "Coconut oil over medium heat (smoke point ~350F) is the traditional fat for the tarka and carries the bloomed spices beautifully without smoking at this gentle heat. Keep it at medium, this is a spice bloom, not a hard sear, so the lower smoke point is fine.",
  "season": "Salt it properly as it simmers, because dal needs more than you expect before it tastes of anything. Turmeric, cumin, coriander, fresh ginger and garlic, a pinch of garam masala, and a squeeze of lemon to finish. A pinch of chili or fresh cilantro at the end never hurts.",
  "note": "An Indian-style tarka dal, split peas simmered with tomato and spices, finished with a coconut-oil tempering, over rice with wilted spinach.",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    30
   ]
  ]
 },
 {
  "id": "tuscan-white-bean-barley-kale-bowl",
  "title": "Tuscan White Bean & Barley Bowl with Garlicky Kale",
  "slot": "dinner",
  "protein": "white beans|navy beans",
  "carb": "barley cooked",
  "fat": "olive oil",
  "produce": "kale cooked|tomato raw|onion raw|carrots raw",
  "prefProtein": "white beans",
  "prefCarb": "barley cooked",
  "prefProduce": "kale cooked|tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice the onion and carrot and mince the garlic. Heat a tablespoon of olive oil in a pan over medium heat and soften the onion, carrot, and garlic 5-6 minutes until fragrant and translucent. 2) Add your beans (white beans or navy beans, whichever your plan lists) and the diced tomato with a pinch of rosemary. Simmer 6-8 minutes, smashing a few beans against the pan so the mixture turns creamy. 3) Stir the chopped kale in for the last 3-4 minutes so it wilts down. 4) Cook the barley per the package. 5) Fold the warm barley into the beans, or spoon the beans over a bed of barley in the bowl. 6) Finish with a thread of raw olive oil over the top.",
  "oil": "Extra-virgin olive oil (smoke point ~375F) is the heart of Tuscan cooking, use it for the medium-heat soffritto and again raw as a finishing drizzle. Both jobs sit comfortably under its smoke point. Keep the pan at medium and never push it to a hard sear, or the oil turns bitter.",
  "season": "Rosemary, sage, garlic, a bay leaf, salt, and pepper, with a squeeze of lemon or splash of red wine vinegar at the end. A little chili flake and torn parsley round it out, ribollita-style.",
  "note": "A Tuscan ribollita-style bowl, creamy beans and garlicky kale over chewy barley, all built on olive oil.",
  "extras": [
   [
    "Olives ripe",
    15
   ],
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
  "id": "sesame-edamame-buckwheat-bok-choy-bowl",
  "title": "Sesame Edamame & Buckwheat Noodle-Style Bowl",
  "slot": "dinner",
  "protein": "edamame cooked|soybeans",
  "carb": "buckwheat groats cooked|brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "tahini|Olive oil",
  "produce": "bok choy|snap peas|carrots raw|cabbage cooked",
  "prefProtein": "edamame",
  "prefCarb": "buckwheat groats cooked",
  "prefProduce": "bok choy|snap peas",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Prep your vegetables: trim the bok choy and snap peas, shred the carrots, and chop the cabbage (use whichever your plan lists). 2) Heat a teaspoon of avocado oil in a wide pan or wok over high heat. Stir-fry your produce (bok choy, snap peas, carrots, or cabbage, whichever your plan lists) for 3-4 minutes so it stays crisp-tender, then toss in your protein (shelled edamame or soybeans) just to warm through, about 1 minute. 3) Make the sesame sauce off the heat: whisk tahini with tamari (gluten-free soy sauce), a splash of water, and a little rice vinegar until pourable. 4) Cook your grain (buckwheat groats or brown rice) per the package. 5) Add the warm grain to the pan with the vegetables and edamame. 6) Pour the tahini sauce over everything and toss to coat, soba-style.",
  "oil": "Two fats, two jobs. Stir-fry in avocado oil (smoke point ~520F) because the pan runs hot and olive oil or butter would smoke. If your plan's fat is tahini instead, whisk it raw into the finishing sauce (do not heat it, it is a dressing) and use just a light mist of avocado oil to stir-fry.",
  "season": "tamari (gluten-free soy sauce), rice vinegar, fresh ginger and garlic, and a drizzle of sriracha. Top with sesame seeds and sliced green onion. A few drops of maple in the sauce balance it if you like it sweeter.",
  "note": "A Japanese soba-style bowl using buckwheat groats, with edamame, crisp greens, and a creamy sesame-tahini sauce. Fully plant-based.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "three-bean-chili-rice-bowl",
  "title": "Smoky Three-Bean Chili Bowl over Rice",
  "slot": "dinner",
  "protein": "kidney beans|pinto beans|black beans",
  "carb": "brown rice cooked|white rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "bell pepper red raw|tomato raw|onion raw|sweet corn cooked",
  "prefProtein": "kidney beans|pinto beans|black beans",
  "prefProduce": "bell pepper red raw|tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Dice the onion and red bell pepper. Heat a teaspoon of oil in a pot over medium heat and saute them 5-6 minutes until soft. 2) Add your beans (kidney, pinto, or black beans, whichever your plan lists) with the diced tomato, chili powder, cumin, and smoked paprika. 3) Simmer 12-15 minutes, smashing some of the beans against the pot so the chili thickens and goes rich. 4) Char the sweet corn in a separate dry-hot pan 2-3 minutes until lightly blackened, or stir it in raw for the last few minutes. 5) Cook your rice (brown or white) per the package and spoon it warm into a bowl. 6) Ladle the chili over the rice and top with sliced raw avocado and the corn.",
  "oil": "Build the base in a teaspoon of light/refined olive oil (smoke point ~465F) or a mist of spray oil, the cooking is low and slow, so a neutral all-purpose oil is all you need and no high-smoke searing oil is required. The avocado, sliced on top off the heat, is the cooling finishing fat against the warm chili (never cook it).",
  "season": "Chili powder, cumin, smoked paprika, oregano, a pinch of cocoa for depth, and a squeeze of lime. Hot sauce, chopped onion, and cilantro on top make it a proper chili bowl.",
  "note": "A hearty three-bean chili, your beans simmered smoky and thick, over rice with cooling avocado.",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ]
  ]
 },
 {
  "id": "mezze-falafel-hummus-bulgur-bowl",
  "title": "Mezze Falafel Bowl with Hummus & Herbed Bulgur",
  "slot": "dinner",
  "protein": "falafel|chickpeas",
  "carb": "bulgur cooked|couscous cooked",
  "fat": "tahini|hummus|Olive oil",
  "produce": "cucumber raw|tomato raw|onion raw|bell pepper red raw",
  "prefProtein": "falafel",
  "prefCarb": "bulgur cooked",
  "prefProduce": "cucumber raw|tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your protein: warm or crisp the falafel in a 400F oven for 10-12 minutes until golden, or pan-crisp it in a little olive oil over medium heat; if your plan lists chickpeas, roast them at 400F for 15-20 minutes with cumin and a pinch of salt until they firm up. 2) Cook your grain (bulgur or couscous) per the package, then toss it warm with chopped parsley, a squeeze of lemon, and a pinch of salt, tabbouleh-style. 3) Make a quick chopped salad: dice the cucumber and tomato and toss with a little lemon; thinly slice the onion and red bell pepper if those are your plan's produce picks. 4) Thin some tahini with lemon juice and water into a pourable sauce. 5) Build the bowl: herbed grain on the bottom, then the falafel (or chickpeas), the chopped salad, and a generous scoop of hummus. 6) Drizzle the lemony tahini over the top.",
  "oil": "Tahini (and the scoop of hummus) is the raw finishing fat here, thinned with lemon and water into a sauce, no heat needed. If you pan-crisp the falafel instead of baking, use a little extra-virgin olive oil at medium heat (smoke point ~375F); baking or roasting at 400F needs no extra oil.",
  "season": "Lots of fresh parsley and mint, garlic, cumin, sumac, lemon, and a pinch of chili. A spoon of harissa or a few olives makes it feel like a proper mezze spread.",
  "note": "A Middle Eastern mezze bowl, crisp falafel (or roasted chickpeas) over herbed grain with a chopped salad, hummus, and a lemony tahini drizzle. Fully plant-based."
 },
 {
  "id": "spinach-feta-frittata-potato-lunch",
  "title": "Spinach & Feta Frittata with Crispy Potatoes",
  "slot": "lunch",
  "protein": "egg whole|egg white|feta cheese",
  "carb": "potato baked",
  "fat": "olive oil",
  "produce": "spinach",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Dice the baked potato into small cubes. Heat olive oil in an oven-safe skillet over medium heat and crisp the potato 6-8 minutes, stirring now and then, until golden. 2) Add the spinach and stir 1-2 minutes until it wilts down. 3) Beat your eggs (whole egg or egg white, whichever your plan lists) with a pinch of salt and pepper, pour them evenly over the potato and spinach, and let them set undisturbed over medium-low heat 3-4 minutes until the edges firm up. 4) If your plan lists feta as the protein, crumble it over the top now (if you eat dairy); otherwise the eggs are your protein. 5) Slide the whole skillet under a broiler, or into a 400F oven, for 4-5 minutes until the center is just set and the edges puff. 6) Slice into wedges like a savory pie and serve.",
  "oil": "Olive oil (smoke point ~375F) handles the medium-heat potato crisp and the gentle egg set without smoking; keep it at medium so the eggs stay custardy. If you want a harder potato crisp first, start in avocado oil (smoke point ~520F) over medium-high heat, then drop to gentle heat for the eggs. Avoid a hot butter sear here, its milk solids would brown before the eggs set.",
  "season": "Garlic powder, cracked pepper, a pinch of dried oregano or fresh dill, and a little salt, go easy, since the feta (if you use it) is salty. Red pepper flakes if you like a kick.",
  "note": "An Italian-style baked frittata with an optional Greek feta finish, served over crispy diced potatoes. The broiler-set eggs make it feel like a real cafe lunch.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "ricotta-spinach-baked-pasta-lunch",
  "title": "Baked Ricotta & Spinach Pasta",
  "slot": "lunch",
  "protein": "ricotta cheese|parmesan",
  "carb": "whole wheat pasta|carbe diem high-protein pasta|pasta cooked|Shirataki noodles|Chickpea pasta cooked",
  "fat": "olive oil",
  "produce": "spinach",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Cook your pasta (whole wheat, Carbe Diem high-protein, or plain pasta, whichever your plan lists) per the package until just al dente, then drain; if your plan's carb is marinara sauce, simply warm it in the pan. 2) Warm a little olive oil with minced garlic in a pan over medium heat for about 30 seconds, then add the spinach and wilt it 2 minutes. 3) Stir the cooked pasta and the marinara through the spinach to coat. 4) Fold in most of your ricotta (if you eat dairy) in big creamy dollops so it stays in pillowy pockets rather than melting flat. 5) Tip everything into a baking dish, dot the remaining ricotta on top, and shower with grated parmesan (if you eat dairy). 6) Bake at 400F for 10-12 minutes until bubbling and lightly golden, then serve hot.",
  "oil": "Olive oil at medium heat (smoke point ~375F) is right for blooming the garlic and wilting the greens, and the 400F oven is fine for this short bake since the dish is moist and the cheese protects the surface. Keep the skillet at a gentle saute, not a hard sear, so the oil does not turn bitter.",
  "season": "Garlic, dried oregano or basil, black pepper, a pinch of nutmeg in the ricotta (classic with spinach), and red pepper flakes. Salt lightly, the parmesan and marinara already bring savor.",
  "note": "A lazy baked-ziti riff that leans on ricotta and parmesan for protein and richness, with warm pockets of ricotta against marinara and wilted spinach.",
  "extras": [
   [
    "Marinara sauce",
    40
   ]
  ]
 },
 {
  "id": "caprese-bulgur-mozzarella-bowl-lunch",
  "title": "Caprese Bulgur Bowl with Fresh Mozzarella",
  "slot": "lunch",
  "protein": "mozzarella part skim|parmesan grated",
  "carb": "bulgur|barley|couscous",
  "fat": "olive oil",
  "produce": "tomato",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No real cooking, this is mostly assembly. Cook your grain (bulgur, barley, or couscous, whichever your plan lists) per the package, then let it cool to room temperature. 2) Pile the cooled grain into a bowl as the base. 3) Top with your cheese (if you eat dairy): tear part-skim mozzarella into pieces, or shave grated parmesan over the top, depending on your plan's pick. 4) Add the halved ripe tomatoes. 5) Finish with a generous drizzle of good olive oil, torn fresh basil, and a little grated parmesan (if you eat dairy). 6) Toss gently right before eating so the olive oil and tomato juices form a light dressing.",
  "oil": "Use extra-virgin olive oil raw as a finishing drizzle (no heat), this is exactly where it shines: the flavor carries the dish and there is no smoke-point concern since nothing is cooked. A splash of balsamic-style vinegar rounds it out if you have it.",
  "season": "Flaky salt, cracked pepper, fresh or dried basil and oregano, and a squeeze of lemon or splash of balsamic. Salt the tomatoes first.",
  "note": "A caprese salad stretched into a full grain-bowl lunch over nutty bulgur (or barley/couscous). Cold, fresh, and zero-cook, a great desk or summer lunch with protein from the cheese.",
  "extras": [
   [
    "Parmesan cheese shredded",
    12
   ]
  ]
 },
 {
  "id": "greek-feta-chickpea-couscous-bowl-lunch",
  "title": "Mediterranean Chickpea & Olive Couscous Bowl",
  "slot": "lunch",
  "protein": "Chickpeas cooked|Chicken breast cooked",
  "carb": "couscous|bulgur|quinoa",
  "fat": "Feta cheese|Olive oil",
  "produce": "cucumber|tomato",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your grain (couscous, bulgur, or quinoa, whichever your plan lists) per its package: couscous just needs a 5-minute soak in hot water off the heat, bulgur about 12-15 minutes, and quinoa about 15 minutes simmered then fluffed with a fork. Set it aside to cool slightly. 2) If your plan lists chickpeas as the protein, drain and rinse them and pat them very dry with a towel (dry beans crisp; wet beans steam). Heat 1 tablespoon of avocado oil in a skillet over medium-high until it shimmers, add the chickpeas in one layer, and cook 5-6 minutes, shaking the pan now and then, until they blister and turn golden. Season with salt and pepper and set aside. 3) Dice the cucumber and tomato into bite-size pieces. 4) Build the bowl: spoon the grain into a bowl, then top with the cucumber, tomato, a small handful of pitted olives, and the crispy chickpeas. 5) If your plan lists feta as the protein and you eat dairy, crumble it over the top. 6) Finish with a raw drizzle of olive oil and a squeeze of lemon, then toss lightly so everything is coated.",
  "oil": "Use refined avocado oil (smoke point ~520F) to crisp the chickpeas, because medium-high heat would scorch olive oil (~375F) and turn it bitter. Save the olive oil for the raw finishing drizzle at the end, un-heated, its grassy, peppery flavor is what gives the bowl its Greek character.",
  "season": "Optional: dried oregano (the signature Greek note), garlic powder, a squeeze of lemon, and black pepper. Go easy on added salt, the olives, and the feta if you're using it, already bring plenty.",
  "note": "A Greek mezze in a bowl: cool cucumber and tomato, briny olives, and crispy chickpeas over your grain, with salty feta if you eat dairy.",
  "extras": [
   [
    "Olives ripe",
    15
   ]
  ]
 },
 {
  "id": "seared-provolone-quinoa-roasted-veg-bowl-lunch",
  "title": "Seared Tofu & Roasted Veg Grain Bowl",
  "slot": "lunch",
  "protein": "tofu firm|chickpeas|TVP",
  "carb": "quinoa|barley|couscous",
  "fat": "olive oil",
  "produce": "zucchini|eggplant|bell pepper red",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Heat the oven to 425F. Slice your vegetable (zucchini, eggplant, or red bell pepper, whichever your plan lists) into bite-size pieces, toss with 1 tablespoon of avocado oil and a pinch of salt, spread on a baking sheet in a single layer, and roast 18-20 minutes until the edges caramelize and brown. 2) Meanwhile, cook your grain (quinoa, barley, or couscous, whichever your plan lists) per its package: quinoa about 15 minutes simmered then fluffed, barley about 25-30 minutes, couscous a 5-minute soak in hot water off the heat. 3) Prep your protein. If it's firm tofu: press it (wrap in a towel under something heavy for 10 minutes), cut into thick slabs, pat very dry, then sear in a nonstick pan with a little avocado oil over medium-high heat 3-4 minutes per side until golden and crisp. If it's chickpeas: drain, rinse, pat dry, and warm them through in the pan for 3-4 minutes (or crisp them in a little avocado oil). 4) Build the bowl: spoon in the grain, add the roasted vegetable, and lay the seared tofu or warm chickpeas on top. Season with pepper and a squeeze of lemon.",
  "oil": "Use refined avocado oil (smoke point ~520F) for both the 425F roast and the medium-high tofu sear, both temperatures exceed olive oil's ~375F limit, so olive oil would smoke and turn bitter here. Avocado oil is neutral and built for high heat.",
  "season": "Optional: garlic powder, smoked paprika or dried thyme on the vegetable, cracked black pepper, and a squeeze of lemon over the finished bowl. Salt the vegetable before it goes in the oven.",
  "note": "A warm grain bowl: caramelized roasted vegetable and seared tofu (or warm chickpeas) over your grain, with serious texture contrast.",
  "extras": [
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
  "id": "greek-yogurt-chickpea-curry-rice-lunch",
  "title": "Creamy Chickpea Curry over Rice",
  "slot": "lunch",
  "protein": "Chickpeas cooked|Greek yogurt plain nonfat",
  "carb": "Brown rice cooked|White rice cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "olive oil",
  "produce": "spinach|tomato",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Cook your rice (brown rice, white rice, or basmati, whichever your plan lists) per its package and keep it warm; brown rice takes about 40 minutes, white and basmati about 15-18 minutes. 2) Heat 1 tablespoon of olive oil in a skillet over medium heat. Add a little diced onion and minced garlic (optional aromatics) and cook 4-5 minutes until soft and translucent, stirring so they don't brown. 3) Stir in your curry spices and a spoonful of diced tomato and cook 1 minute until fragrant. 4) Add the chickpeas (drained and rinsed) plus a splash of water, and simmer 5 minutes so the flavors come together. 5) Fold in the spinach a handful at a time and stir just until it wilts, about 1 minute. 6) For a creamy finish, take the pan OFF the heat first, then stir in a spoonful of Greek yogurt if your plan lists it as the protein and you eat dairy (off-heat keeps it from curdling), or a splash of coconut milk, which can go in over low heat instead. 7) Spoon the curry over the warm rice.",
  "oil": "Use olive oil at medium heat (~375F smoke point), it's perfect for gently sweating the onion and garlic and blooming the spices without scorching them. If you finish with Greek yogurt, pull the pan off the burner first so it doesn't split; coconut milk is more forgiving and can be stirred in over low heat.",
  "season": "Optional: curry powder or garam masala, cumin, turmeric, grated garlic and ginger, a pinch of salt, and a squeeze of lemon at the end. Stir the spoon of Greek yogurt (or coconut milk) in off the heat so it turns creamy.",
  "note": "A creamy weeknight chickpea-and-spinach curry over rice, made silky off-heat with Greek yogurt if you eat dairy, or coconut milk if not.",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    30
   ]
  ]
 },
 {
  "id": "falafel-pita-tahini-wrap",
  "title": "Falafel Pita with Tahini & Cucumber-Tomato Salad",
  "slot": "lunch",
  "protein": "Falafel",
  "carb": "Pita bread",
  "fat": "Tahini|Olive oil",
  "produce": "cucumber raw|tomato raw|onion raw|romaine lettuce",
  "prefProduce": "cucumber raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) Warm the falafel through. If you're crisping pre-made falafel, set a skillet to medium, mist with a little avocado-oil spray, and crisp them 2-3 minutes per side until the shells are crunchy and the centers are hot, or bake at 375F for 10-12 minutes. 2) Warm the pita bread 15-20 seconds in a dry skillet or microwave so it folds without tearing, then split it open into a pocket. 3) Loosen the tahini in a small bowl with a squeeze of lemon and a splash of water, stirring until it pours like a dressing, then drizzle some inside the pita. 4) Prep your produce (cucumber, tomato, onion, or romaine lettuce, whichever your plan lists): dice the cucumber or tomato, thinly slice the onion, or shred the romaine. 5) Stuff the pita with the falafel and your produce. 6) Drizzle more tahini over the top, then fold it shut and eat right away while warm.",
  "oil": "No real cooking oil is needed, the tahini is the dish's fat and its whole personality, drizzled raw so its toasty sesame flavor stays intact (heating tahini just makes it bitter). If you're crisping pre-made falafel, a quick mist of refined avocado-oil spray (~520F) handles the medium-heat pan with almost no added calories.",
  "season": "Optional: a squeeze of lemon stirred into the tahini is basically mandatory, plus a pinch of cumin and garlic powder, and some chopped parsley. A few dashes of hot sauce or a spoon of harissa if you want it to bite back.",
  "note": "A street-food falafel pita: crisp falafel and fresh produce in warm pita bread, draped in lemony tahini. Fully plant-based."
 },
 {
  "id": "smashed-chickpea-salad-sandwich",
  "title": "Smashed Chickpea Salad Sandwich",
  "slot": "lunch",
  "protein": "Chickpeas",
  "carb": "whole wheat bread|rye bread",
  "fat": "Tahini|Mayonnaise light|Olive oil",
  "produce": "celery raw|onion raw|romaine lettuce|tomato raw",
  "prefCarb": "whole wheat bread",
  "prefFat": "Tahini",
  "prefProduce": "celery raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1) No cooking. Drain and rinse the chickpeas and tip them into a bowl. Smash with a fork or potato masher until about half are broken down and the mix holds together like a chunky tuna salad. 2) Loosen the tahini in a small dish with a little lemon juice and water until it's pourable, then fold it into the chickpeas as the creamy binder (light mayonnaise works too if your plan lists it, that keeps it vegetarian rather than vegan). 3) Finely dice your produce (celery, onion, romaine lettuce, or tomato, whichever your plan lists) and fold the crunchy bits (celery or onion) into the smash; save sliced tomato or romaine to layer in. 4) Toast your bread (whole wheat or rye, whichever your plan lists) if you want more structure. 5) Pile the chickpea smash on one slice, layer on any romaine or tomato, and close it up. Cut on the diagonal.",
  "oil": "No cooking oil, this is fully no-cook. The tahini is the binder and the fat, stirred in raw so its sesame flavor carries the sandwich (light mayonnaise works too if you'd rather, and keeps it vegetarian). Loosen the tahini with lemon and water so it coats the chickpeas instead of clumping.",
  "season": "Optional: lemon juice, a little Dijon-style yellow mustard, salt, pepper, and a pinch of smoked paprika or dill. A few capers or some chopped pickle add a briny tang that makes it taste like a real deli salad.",
  "note": "A plant-based take on tuna salad: chickpeas smashed with creamy tahini and crunchy produce on whole-grain bread. No cook, meal-prep friendly.",
  "extras": [
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "classic-tuna-salad-rye",
  "title": "Classic Tuna Salad on Toasted Rye",
  "slot": "lunch",
  "protein": "Tuna light canned in water|Tuna yellowfin|Mackerel jack canned",
  "carb": "rye bread|whole wheat bread",
  "fat": "Mayonnaise light",
  "produce": "celery raw|onion raw|romaine lettuce|tomato raw",
  "prefProtein": "Tuna light canned in water",
  "prefCarb": "rye bread",
  "prefProduce": "celery raw",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1) No cooking. Drain your tuna (light canned in water or yellowfin, whichever your plan lists) very well and flake it into a bowl. 2) Fold in light mayonnaise a spoonful at a time until it's just creamy, don't drown it. 3) Finely dice your produce (celery, onion, romaine lettuce, or tomato, whichever your plan lists) and stir the crunchy bits (celery or onion) into the tuna; keep sliced tomato or romaine to layer in. 4) Toast your bread (rye or whole wheat, whichever your plan lists) so it doesn't go soggy. 5) Mound the tuna salad on one slice, add any romaine and tomato, and top with the second slice. Slice in half.",
  "oil": "No cooking oil, this is a cold deli build. Light mayonnaise is the fat and the binder that turns flaked tuna into a salad. Use just enough to coat so the sandwich stays light rather than greasy; a squeeze of lemon thins it and brightens it without adding fat.",
  "season": "Optional: lemon juice, a teaspoon of Dijon-style yellow mustard, salt, pepper, and a little dill or fresh parsley. Chopped pickle or a few capers add the classic briny pop, and a dash of hot sauce livens it up.",
  "note": "The diner-classic tuna salad: canned or fresh tuna bound in mayo with crunchy produce on toasted bread. Quick, high-protein, pescatarian.",
  "extras": [
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "deli-egg-salad-sandwich",
  "title": "Deli-Style Egg Salad Sandwich",
  "slot": "lunch",
  "protein": "Egg whole cooked|Egg white raw",
  "carb": "whole wheat bread|rye bread",
  "fat": "Mayonnaise light",
  "produce": "celery raw|onion raw|romaine lettuce",
  "prefProtein": "Egg whole cooked",
  "prefCarb": "whole wheat bread",
  "prefProduce": "celery raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1) If your plan lists whole cooked eggs, hard-boil them: cover with water, bring to a boil, then cover the pot and pull it off the heat for 10-12 minutes; transfer to an ice-water bath, then peel. (If your plan lists egg whites, gently cook them in a nonstick pan or use pre-cooked whites.) 2) Chop the eggs and fold with light mayonnaise until creamy. 3) Finely dice your produce (celery, onion, or romaine lettuce, whichever your plan lists) and fold the crunchy bits (celery or onion) into the salad; save romaine to layer in. 4) Toast your bread (whole wheat or rye, whichever your plan lists) if you like it firm. 5) Spread the egg salad thick on one slice, add any romaine, and close it up. Halve and serve.",
  "oil": "No cooking oil, the eggs are boiled in water and the salad is built cold. Light mayonnaise is the binder and the fat that makes egg salad creamy. For a leaner, tangier version, swap part of the mayo for plain Greek yogurt and a little yellow mustard (if you eat dairy).",
  "season": "Optional: yellow mustard, salt, pepper, a pinch of paprika, and chopped chives or dill. A dash of hot sauce or a little pickle relish gives it the classic deli-counter zing.",
  "note": "The lunchbox classic: creamy chopped egg salad with crunchy produce on toasted bread. Vegetarian and ovo-friendly, ready in minutes.",
  "extras": [
   [
    "Pickles dill",
    30
   ]
  ]
 },
 {
  "id": "caprese-mozzarella-tomato-pressed",
  "title": "Caprese-Style Mozzarella & Tomato Pressed Sandwich",
  "slot": "lunch",
  "protein": "Mozzarella part skim",
  "carb": "rye bread|whole wheat bread|Pita bread",
  "fat": "olive oil",
  "produce": "tomato raw|arugula raw|spinach raw",
  "prefCarb": "rye bread",
  "prefProduce": "tomato raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) Lay slices of part-skim mozzarella on your bread (rye, whole wheat, or pita, whichever your plan lists). 2) Add your produce (tomato, arugula, or spinach, whichever your plan lists): thick slices of tomato, or a handful of arugula or spinach. A few chopped pitted olives inside are a nice Italian touch. 3) Drizzle a little olive oil over the inside, then close the sandwich. 4) Press it in a dry skillet or panini pan over medium heat, weighted with a second pan set on top, 2-3 minutes per side, until the bread crisps and the mozzarella turns soft and melty. 5) Slice on the diagonal and finish with a final thread of olive oil.",
  "oil": "Olive oil at medium heat (~375F smoke point) is exactly right: it crisps the bread in the press without smoking, and a raw finishing drizzle carries the fruity, grassy flavor. Keep the pan at medium so the oil never scorches and the cheese melts before the crust burns.",
  "season": "Optional: cracked black pepper, a pinch of dried oregano or Italian herbs, and a splash of balsamic vinegar inside for that sweet-tangy caprese edge. Flaky salt on the tomato wakes it up.",
  "note": "An Italian deli caprese, pressed warm: melty mozzarella, fresh produce, and olive oil on crisped bread. Vegetarian.",
  "extras": []
 },
 {
  "id": "whipped-ricotta-honey-walnut-fig",
  "title": "Whipped Ricotta with Honey, Walnuts & Figs",
  "slot": "snack",
  "protein": "Ricotta cheese",
  "fat": "Walnuts|Ricotta cheese",
  "produce": "Figs|Pear|Grapes",
  "prefProtein": "Ricotta cheese",
  "prefFat": "Walnuts",
  "prefProduce": "Figs",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cook. Whisk or briskly stir the ricotta with a fork until it loosens and goes creamy, about 30 seconds, then spoon it into a bowl. 2) Prep your fruit (figs, pear, or grapes, whichever your plan lists): quarter fresh figs, slice a pear, or halve grapes, and scatter over the ricotta. 3) Thread honey across the top. 4) Finish with a handful of roughly chopped walnuts for crunch.",
  "oil": "No cooking oil. The walnuts are the finishing fat, scattered raw for crunch, with the ricotta adding its own soft creaminess. No pan, no heat anywhere.",
  "season": "Optional: a grind of black pepper plays surprisingly well against the honey, plus a little lemon zest or a torn mint leaf. A pinch of cinnamon leans it more toward dessert. The honey already brings the sweetness, so go light.",
  "note": "An Italian-trattoria sweet snack: creamy whipped ricotta with honey, fresh fruit, and walnuts. Feels like dessert, eats like protein.",
  "extras": [
   [
    "Honey",
    8
   ]
  ]
 },
 {
  "id": "greek-olive-feta-cucumber-meze",
  "title": "Greek Meze Plate with Greek Yogurt Dip, Olives, Feta & Cucumber",
  "slot": "snack",
  "protein": "Greek yogurt plain nonfat|Cottage cheese 2% lowfat",
  "fat": "Olives ripe|Feta cheese|Olive oil",
  "produce": "Cucumber|Tomato|Bell pepper red",
  "prefFat": "Olives ripe",
  "prefProduce": "Cucumber",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cook. Cube the feta and pile it into a small bowl with a handful of ripe olives. 2) Prep your produce (cucumber, tomato, or red bell pepper, whichever your plan lists): cut thick coins of cucumber, halve a few cherry tomatoes, or cut strips of red bell pepper, and add them to the bowl. 3) Drizzle a little olive oil over the feta and crack black pepper on top. 4) Eat with a fork or as finger food.",
  "oil": "Olive oil as a raw finishing drizzle only, no heat. It is there for its grassy flavor, and the olives and feta carry most of the fat themselves, the drizzle is just the flavor bow on top.",
  "season": "Optional: dried oregano is the classic move, plus a squeeze of lemon and cracked pepper. A pinch of red pepper flakes if you like heat. The feta brings the salt, so don't add more.",
  "note": "A savory Greek meze plate: briny olives, salty feta, and fresh produce with an olive oil drizzle. Crunchy, refreshing, and totally no-cook.",
  "extras": [
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
 "id": "sea-salt-edamame-pods",
 "title": "Steamed Sea-Salt Edamame",
 "slot": "snack",
 "protein": "Edamame cooked",
 "fat": "Tahini \\(sesame butter\\)|Olive oil",
 "prefFat": "Tahini",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1) Steam or microwave the edamame: drop the pods into simmering water or a steamer basket for a few minutes until hot and bright green, or microwave from frozen for 2-3 minutes. 2) Drain well and tip into a bowl. 3) While still hot, toss with a tiny drizzle of tahini (or a few drops of sesame oil) and a generous pinch of flaky salt so it clings to the pods. 4) Pop the beans out of the pods as you snack, or eat shelled beans by the spoonful.",
 "oil": "Tahini as a tiny finishing toss off the heat, no frying. A few drops give a nutty, izakaya-style sesame coating; the edamame are steamed in water, never fried, so there's no smoke point to worry about. A few drops of sesame oil work the same way as a finisher.",
 "season": "Optional: flaky sea salt is non-negotiable here, plus a shake of togarashi or chili flakes, a squeeze of lime, or a few drops of tamari (gluten-free soy sauce). A sprinkle of sesame seeds is a nice touch if you have them.",
 "note": "The izakaya classic: hot steamed edamame tossed with sea salt and a whisper of sesame. High-protein, fully plant-based, and addictive to pop from the pod.",
 "extras": [
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "batchQ": 3, "prepMethod": "1. Equipment: a pot or steamer basket, a colander, and 5 containers.\n2. Steam the pods from frozen 4 to 5 minutes until hot and bright green.\n3. Drain them well and spread them on a tray to cool. Pods sealed warm go slimy.\n4. Toss with a tiny drizzle of sesame oil and flaky salt while still warm so it sticks.\n5. Portion into containers.\n6. Storage: fridge 4 days.\n7. Reheat: eat cold, or microwave 45 seconds. These are one of the few snacks that are genuinely as good cold.",
 "makes": 5
},
 {
  "id": "kefir-berry-hemp-smoothie-bowl",
  "title": "Kefir Berry Bowl with Hemp",
  "slot": "snack",
  "protein": "Kefir|Greek yogurt plain nonfat",
  "fat": "Hemp seeds|Walnuts|Chia seeds",
  "produce": "Blueberries|Strawberries|Raspberries|Blackberries",
  "prefProtein": "Kefir",
  "prefFat": "Hemp seeds",
  "prefProduce": "Blueberries",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1) No cook. Pour the kefir into a bowl, it's a drinkable, pourable yogurt, so it stays loose and spoonable. (If your plan lists plain nonfat Greek yogurt instead, stir in a splash of water or milk to loosen it to a spoonable consistency.) 2) Prep your berries (blueberries, strawberries, raspberries, or blackberries, whichever your plan lists): rinse them, slice strawberries if using, and pile them on top. 3) Scatter a spoonful of your seeds/nuts (hemp seeds, walnuts, or chia seeds, whichever your plan lists) over everything for a soft, nutty crunch. 4) Stir to a smoothie-bowl consistency or eat in layers. If using chia, let it sit 5 minutes to thicken.",
  "oil": "No cooking oil. The hemp seeds (or walnuts or chia) are the finishing fat, sprinkled on raw for a tender crunch. No pan, no heat anywhere in this one.",
  "season": "Optional: a thread of honey or a splash of vanilla if you want it sweeter, plus a pinch of cinnamon. A little lemon zest makes the berries pop. The kefir's gentle tang means it barely needs anything.",
  "note": "A probiotic-forward sweet snack: tangy kefir (or Greek yogurt) under a heap of fresh berries and seeds. Gut-friendly, high-protein, and ready in two minutes."
 },
 {
 "id": "tahini-veggie-pita-dippers",
 "title": "Lemon-Tahini Dip with Veggies & Pita",
 "slot": "snack",
 "protein": "Chickpeas cooked",
 "carb": "Pita bread",
 "fat": "Tahini|Olive oil",
 "produce": "Carrots|Cucumber|Bell pepper red|Celery",
 "prefProtein": "Tahini",
 "prefProduce": "Carrots",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "This is a no-cook snack, so there is no stove or oven needed. 1) Make the tahini sauce: scoop the tahini into a bowl and add the juice of half a lemon plus a pinch of salt. Whisk it together. It will look thick, clumpy, and pasty at first, this is normal, do not panic. 2) Now add cold water one tablespoon at a time, whisking hard after each splash. After 2 to 4 tablespoons it will suddenly turn smooth, pale, and creamy, about the thickness of a pourable salad dressing or thin yogurt. If it gets too runny, whisk in a little more tahini; if too thick, add a few more drops of water. 3) Handle your protein. If your plan lists tahini as the protein, the sauce above IS the dip, you are done with this part. If your plan lists chickpeas, drain and rinse a can of chickpeas, pat them dry, and either stir them whole into the sauce as a chunky dip or mash them roughly with a fork into the sauce for a hummus-like spread; taste and add salt. 4) Prep your vegetable (carrots, cucumber, red bell pepper, or celery, whichever your plan lists). Rinse it. For carrots, peel and cut into finger-length sticks. For cucumber, cut into sticks or thick coins. For red bell pepper, cut out the stem and seeds and slice into flat strips. For celery, trim the ends and cut stalks into sticks. 5) Prep the pita bread: cut or tear each round into wedges like a pizza. For a warm, soft pita, microwave 15 seconds; for a crisp dipper, toast it in a dry pan or toaster for about 1 minute until lightly golden. 6) Spread the dip in a shallow bowl, arrange the veggie sticks and pita wedges around it, and dip away.",
 "oil": "No added oil and no heat. The tahini (ground sesame seed butter) is the fat in this dish, and it is used raw as the dip itself. Whisking it with lemon juice and cold water is what turns the thick paste into a silky, pourable sauce, you do not need any cooking oil at all.",
 "season": "Lemon is essential, do not skip it. For real Middle-Eastern tahini-sauce flavor, whisk in 1 small crushed garlic clove and a pinch of ground cumin, then salt to taste. Finish with a dusting of paprika and a little chopped fresh parsley on top if you have it.",
 "note": "A Middle-Eastern dip plate: silky lemon-tahini sauce with crunchy raw veggies and warm pita. Savory, plant-based, and a fresh change from hummus.",
 "extras": [
  [
   "Tahini",
   20
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl, a whisk, and 5 small tubs plus 5 containers.\n2. Whisk the tahini with lemon juice and a pinch of salt. It will seize into a thick paste first. Keep going.\n3. Add cold water a tablespoon at a time, whisking. After 2 to 4 tablespoons it turns smooth and pale.\n4. Stop when it pours like a thick dressing. It firms up overnight, so leave it looser than you want.\n5. If your plan lists chickpeas, drain and rinse them and stir them into the sauce whole, or mash them roughly into it for a thicker dip.\n6. Portion the sauce into tubs.\n7. Cut the vegetables into sturdy sticks and pack them separately. Pita stays in the bag.\n8. Storage: fridge 5 days for the sauce, 3 for the cut vegetables.\n9. Reheat: none. Loosen the sauce with a splash of water and stir before eating.",
 "makes": 5
},
 {
  "title": "Vietnamese Lemongrass Chicken Rice Bowl (Com Ga Nuong)",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Cucumber raw|Carrots raw|Romaine lettuce",
  "prefProduce": "Cucumber raw",
  "cuisine": "Vietnamese",
  "extras": [
   [
    "Soy sauce",
    12
   ],
   [
    "Honey",
    10
   ]
  ],
  "season": "fresh lemongrass, garlic, fish sauce, lime juice, honey, black pepper, fresh cilantro or mint, sliced fresh chili",
  "note": "Build a classic com tam style plate: caramelized lemongrass chicken over rice with a crunchy raw veg pile and bright nuoc cham. Lean thigh keeps it juicy, breast keeps it leaner.",
  "method": "1. Mince the fresh lemongrass and garlic very fine. In a bowl, stir them with the tamari (gluten-free soy sauce), a spoon of the honey, a splash of fish sauce, and plenty of cracked black pepper to make a marinade. 2. Cut the chicken thigh into bite size strips, add it to the marinade, and let it sit for at least 15 minutes so the lemongrass soaks in. 3. Heat the avocado oil in a wide pan over medium high heat until it shimmers, since avocado oil takes high heat well. 4. Lay the chicken in one layer and sear it without moving it for 2 to 3 minutes, then flip and cook the other side until the edges are deep golden and a little caramelized, about 6 to 8 minutes total. 5. While the chicken cooks, make the nuoc cham dipping sauce: in a small bowl stir together the lime juice, fish sauce, the rest of the honey, a little water, a pinch of minced garlic, and sliced fresh chili to taste. 6. Thinly slice the cucumber and shred the carrots into a quick fresh pile. 7. Spoon the warm white rice into a bowl, lay the seared lemongrass chicken on top, and pile the cucumber, carrot, and torn romaine alongside. 8. Drizzle the nuoc cham over everything and finish with torn fresh cilantro or mint. Serve right away while the chicken is hot.",
  "oil": "Avocado oil"
 },
 {
 "title": "Vietnamese Caramel-Braised Cod (Ca Kho To)",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Cod Atlantic cooked|Tilapia cooked|Haddock cooked|Mackerel jack canned",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado oil|Canola oil",
 "produce": "Onion raw|Green beans cooked|Bok choy cooked",
 "prefProduce": "Onion raw",
 "cuisine": "Vietnamese",
 "extras": [
  [
   "Coconut aminos",
   18
  ],
  [
   "Honey",
   9
  ]
 ],
 "season": "Optional: a dark caramel sauce (sugar cooked to deep amber, the heart of ca kho), fish sauce, garlic, fresh ginger, plenty of cracked black pepper, fresh chili, and sliced scallion. A squeeze of lime to finish.",
 "note": "Ca kho to is sticky, savory-sweet caramel fish braised in a clay pot. Honey plus coconut aminos build the dark caramel glaze without refined sugar, and the fish stays flaky.",
 "method": "1. Pat the cod fillets dry and cut them into large chunks so they hold together while braising. 2. In a wide pan or pot, warm the avocado oil over medium heat and stir in the minced garlic and grated fresh ginger until they smell fragrant, about 1 minute. 3. Add the honey and let it bubble for about 1 minute to start a light caramel, watching closely so it does not burn. 4. Pour in the coconut aminos and a splash of fish sauce along with a few spoons of water, then add lots of cracked black pepper and stir into a glossy sauce. 5. Slip the cod chunks into the sauce, spoon the sauce over the top, then turn the heat to low, cover, and gently braise for 8 to 10 minutes, basting once or twice, until the fish is just flaky. 6. Slice the onion and add it in the last few minutes so it softens but keeps a little bite. 7. Meanwhile steam or boil the green beans until just tender and bright. 8. Spoon the warm white rice into a bowl, lay the caramel cod and its sticky sauce on top, and set the green beans alongside. 9. Finish with sliced green onion, fresh chili to taste, and a squeeze of lime. Serve hot so the glaze stays sticky.",
 "oil": "Avocado oil",
 "batchQ": 2, "prepMethod": "1. Equipment: a wide heavy pot with a lid, a knife, and 5 containers.\n2. Cook the rice and spread it on a tray to cool.\n3. Warm the avocado oil over medium heat and stir in the minced garlic and grated ginger for a minute.\n4. Add the honey and let it bubble about a minute into a light caramel. Watch it, it goes from amber to burnt fast.\n5. Pour in the coconut aminos, a splash of fish sauce, a few spoons of water and plenty of cracked black pepper. Stir to a glossy sauce.\n6. This sauce is the part that batches. Make the full amount now, cool it, and refrigerate it separately.\n7. Cut the cod into large chunks. Braise 2 portions now: slip them into half the sauce, cover, and cook gently 8 to 10 minutes until just flaky.\n8. Slice the onion and add it for the last few minutes. Steam the green beans until bright and just tender.\n9. Portion the rice, beans and braised cod into containers. Keep the remaining sauce in the fridge. Freeze the raw cod today, since raw fish keeps only 1 to 2 days in the fridge, and thaw it in the fridge the night before a second braise in 3 days, which takes 10 minutes.\n10. Storage: fridge 3 days for braised fish, 5 days for the sauce alone. Rice keeps 4.\n11. Reheat: gently in a covered pan over low heat with a spoon of water, or microwave at 70 percent power. Finish with lime and sliced green onion.",
 "makes": 5
},
 {
  "title": "Thai Basil Beef over Jasmine Rice (Pad Krapow)",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef ground 93/7 cooked|Turkey ground 93/7 cooked|Chicken ground cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Green beans cooked|Bell pepper red raw|Onion raw",
  "prefProduce": "Green beans cooked",
  "cuisine": "Thai",
  "extras": [
   [
    "Soy sauce",
    12
   ],
   [
    "Coconut aminos",
    10
   ]
  ],
  "season": "garlic, fresh chili, fish sauce, fresh Thai basil, lime, white pepper",
  "note": "Pad krapow is Thailand's go-to street stir-fry: punchy garlic and chili, salty-savory sauce, and a big handful of holy basil tossed in at the end. Lean ground beef makes it high protein.",
  "method": "1. Smash and mince a generous amount of garlic and chop the fresh chili to the heat you like. 2. Heat the avocado oil in a wok or wide pan over high heat until it just starts to shimmer, since this stir-fry moves fast. 3. Add the garlic and chili and stir for about 20 seconds until fragrant but not browned. 4. Add the lean ground beef and break it apart, stir-frying over high heat until it is cooked through and the moisture has cooked off, about 5 minutes. 5. Pour in the tamari (gluten-free soy sauce), a splash of fish sauce, and the oyster-style savory sauce from the coconut aminos, then toss so every bit of beef is coated and glossy. 6. Slice the red bell pepper and cut the cooked green beans into short pieces, add them in, and stir-fry 1 to 2 minutes so they stay crisp. 7. Turn off the heat and fold in a big handful of fresh Thai basil, stirring just until the leaves wilt. 8. Spoon the hot jasmine rice into a bowl and pile the basil beef over the top. 9. Finish with white pepper and a squeeze of lime, and serve immediately while everything is hot and fragrant.",
  "oil": "Avocado oil"
 },
 {
 "title": "Thai Tom Yum Shrimp & Rice Bowl",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Shrimp cooked|Cod Atlantic cooked|Tilapia cooked|Mackerel jack canned",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado oil|Canola oil",
 "produce": "Tomato raw|Onion raw",
 "prefProduce": "Mushrooms cooked",
 "cuisine": "Thai",
 "extras": [
  [
   "Sriracha / hot sauce",
   14
  ]
 ],
 "season": "lemongrass, fresh ginger or galangal, garlic, lime juice, fish sauce, fresh chili, cilantro, kaffir lime if available",
 "note": "Tom yum goong is the hot-and-sour shrimp soup of Thailand, bright with lime and lemongrass and warm with chili. Served brothy over rice so it eats like a comforting high-protein bowl, no peanut anywhere.",
 "method": "1. Bruise a stalk of fresh lemongrass and slice the fresh ginger into coins so they release their aroma. 2. Heat the avocado oil in a pot over medium heat and stir in the minced garlic, lemongrass, and ginger for about 1 minute until fragrant. 3. Pour in about two cups of water, the sriracha, and a splash of fish sauce, then bring it to a gentle simmer to build the hot-and-sour broth. 4. Quarter the tomato and slice the onion, then add them to the broth and simmer 4 to 5 minutes until softened. 5. Add the cooked shrimp and warm them through for 1 to 2 minutes, being careful not to overcook them. 6. Turn off the heat and stir in plenty of fresh lime juice to taste, since tom yum should taste sharp and sour. 7. Add fresh chili for more heat if you like it spicy. 8. Spoon the warm white rice into a wide bowl and ladle the brothy tom yum shrimp and vegetables over the top. 9. Finish with a big handful of torn fresh cilantro and one more squeeze of lime. Serve steaming hot.",
 "oil": "Avocado oil",
 "batchQ": 2, "prepMethod": "1. Equipment: a large pot, a knife, and 5 containers plus 5 small tubs for the broth.\n2. Cook the rice and spread it on a tray to cool.\n3. Bruise the lemongrass and slice the ginger into coins.\n4. Heat the avocado oil in the pot and stir in the garlic, lemongrass and ginger for a minute.\n5. Add about 8 cups of water, the sriracha and a splash of fish sauce. Simmer 10 minutes to build the broth, then lift out the lemongrass.\n6. Quarter the tomatoes, slice the onion, and simmer them in the broth 4 to 5 minutes until softened.\n7. Take the pot off the heat and stir in plenty of lime juice. Tom yum should taste sharp.\n8. Do not cook the shrimp into the broth for storage. Portion the broth and vegetables into tubs, and keep the cooked shrimp in the containers separately.\n9. Portion: rice and shrimp in the container, broth in its own tub.\n10. Storage: fridge 4 days for the broth, 3 for the shrimp. If your plan says to freeze a container, freeze its shrimp on the cook day and move it to the fridge the night before. The broth also freezes well for 2 months.\n11. Reheat: bring the broth to a simmer, pour it over the shrimp and rice, and let it stand a minute. Finish with cilantro and one more squeeze of lime.",
 "makes": 5
},
 {
  "title": "Filipino Chicken Adobo Rice Plate",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken drumstick cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Onion raw|Green beans cooked|Bok choy cooked",
  "prefProduce": "Onion raw",
  "cuisine": "Filipino",
  "extras": [
   [
    "Soy sauce",
    16
   ],
   [
    "Honey",
    6
   ]
  ],
  "season": "Optional: soy sauce (or tamari) and white vinegar in equal measure (the adobo backbone), lots of garlic, a bay leaf, whole black peppercorns, and sliced scallion. Fish sauce is optional depth.",
  "note": "Adobo is the Filipino national dish: chicken braised low and slow in tamari (gluten-free soy sauce), vinegar, garlic, bay, and peppercorns until the sauce turns deep and glossy. Honey rounds the tang without making it sweet.",
  "method": "1. Mince a big pile of garlic, since adobo is built on garlic. 2. Warm the avocado oil in a pot over medium heat and brown the chicken thighs on both sides, about 4 minutes total, then set them aside. 3. Add the minced garlic and sliced onion to the same pot and cook 2 minutes until soft and fragrant. 4. Pour in the tamari (gluten-free soy sauce), an equal splash of white vinegar, a little water, the bay leaf, and a spoon of whole black peppercorns, then stir in the honey. 5. Return the chicken to the pot, bring the sauce to a simmer, then turn the heat to low and let it gently braise uncovered for 20 to 25 minutes, turning the chicken once, until the sauce reduces and glazes the meat. 6. Important Filipino tip: do not stir the vinegar in the first few minutes of its addition, just let it boil off its sharp edge before stirring. 7. Meanwhile steam or boil the green beans or bok choy until just tender. 8. Spoon the hot white rice onto a plate, lay the adobo chicken over it, and ladle plenty of the dark glossy sauce on top. 9. Set the greens alongside and finish with sliced green onion. Serve hot with extra sauce for the rice.",
  "oil": "Avocado oil"
 },
 {
  "title": "Filipino Pork Giniling (Picadillo) over Rice",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Pork ground cooked|Beef ground 93/7 cooked|Turkey ground 93/7 cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Potato baked flesh|Carrots raw|Green peas cooked",
  "prefProduce": "Potato baked flesh",
  "cuisine": "Filipino",
  "extras": [
   [
    "Soy sauce",
    12
   ],
   [
    "Ketchup",
    20
   ]
  ],
  "season": "garlic, onion, fish sauce, bay leaf, black pepper, fresh tomato or tomato paste, sliced green onion",
  "note": "Giniling is the everyday Filipino ground-meat stew, simmered with potato, carrot, and peas in a savory tomato-tamari (gluten-free soy sauce) base. Lean ground and an egg-fried-rice-free plain rice keep it macro friendly.",
  "method": "1. Dice the potato and carrots into small cubes so they cook quickly and evenly. 2. Heat the avocado oil in a wide pan over medium heat, then add minced garlic and diced onion and cook 2 to 3 minutes until soft and fragrant. 3. Add the lean ground pork, break it apart, and brown it well over medium high heat until no longer pink, about 6 minutes. 4. Stir in the tamari (gluten-free soy sauce), a splash of fish sauce, the ketchup for a savory tomato base, a bay leaf, and plenty of black pepper. 5. Add the diced potato and carrots along with a splash of water, then cover and simmer over low heat for 10 to 12 minutes until the potato is fork tender. 6. Stir in the cooked green peas in the last 2 minutes just to warm them through and keep them bright. 7. Taste and adjust with a little more fish sauce for savory depth or black pepper for warmth. 8. Spoon the hot white rice onto a plate and ladle the pork giniling and its sauce generously over the top. 9. Finish with sliced green onion and serve hot, family style.",
  "oil": "Avocado oil"
 },
 {
  "title": "Korean Gochujang Chicken & Cabbage Rice Bowl (Dak Galbi-Style)",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Cabbage cooked|Onion raw|Carrots raw",
  "prefProduce": "Cabbage cooked",
  "cuisine": "Korean",
  "extras": [
   [
    "Gochujang",
    22
   ],
   [
    "Soy sauce",
    10
   ],
   [
    "Honey",
    8
   ],
   [
    "Garlic raw",
    6
   ]
  ],
  "season": "gluten-free gochujang, tamari (gluten-free soy sauce), honey, garlic, black pepper",
  "note": "Dak galbi is a Korean stir-fry of gluten-free gochujang-marinated chicken and cabbage. Lean chicken keeps protein high while the cabbage and onion bulk the bowl for very few calories.",
  "method": "1. Cut the chicken into bite-size chunks. 2. In a bowl, stir the gluten-free gochujang with the tamari (gluten-free soy sauce), honey, and grated raw garlic to make a thick red marinade. 3. Toss the chicken in the marinade and let it sit for 10 minutes. 4. Heat the oil in a wide pan over medium-high heat. 5. Add the chicken and cook for 4 minutes, stirring, until the edges char a little. 6. Add the sliced onion, the shredded cabbage, and the thin-sliced carrots. 7. Stir-fry for 5 more minutes until the cabbage wilts and the chicken is cooked all the way through. 8. Warm the rice and spoon it into a bowl. 9. Pile the spicy chicken and vegetables on top and scrape all the pan sauce over them. 10. Finish with a pinch of black pepper and a small drizzle of sriracha if you want it hotter.",
  "oil": "Avocado oil"
 },
 {
  "title": "Bulgogi-Style Sirloin & Kimchi Rice Bowl",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef sirloin lean grilled|Beef top round lean cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Canola oil",
  "produce": "Onion raw|Carrots raw|Bell pepper red raw",
  "prefProduce": "Onion raw",
  "cuisine": "Korean",
  "extras": [
   [
    "Soy sauce",
    14
   ],
   [
    "Honey",
    9
   ],
   [
    "Garlic raw",
    6
   ],
   [
    "Coconut aminos",
    8
   ],
   [
    "Kimchi",
    50
   ]
  ],
  "season": "Optional: tamari, a little honey or grated Asian pear (the bulgogi tenderizer and sweetness), garlic, ginger, toasted sesame seeds, and sliced scallion. A few drops of toasted sesame oil off the heat.",
  "note": "Bulgogi is Korea's classic sweet-savory marinated beef. Lean sirloin and a side of tangy kimchi deliver big flavor and protein with minimal added fat.",
  "method": "1. Slice the beef as thin as you can across the grain. 2. In a bowl, mix the tamari (gluten-free soy sauce), honey, grated raw garlic, and a small splash of coconut aminos to make the bulgogi marinade. 3. Add the beef and stir so every piece is coated, then rest it for 10 minutes. 4. Cut the onion into thin half-moons and slice the carrots and red bell pepper into thin strips. 5. Heat the oil in a wide pan over high heat until it shimmers. 6. Lay the beef out in one layer and sear it for 1 to 2 minutes per side, working in batches so it browns instead of steams. 7. Add the onion, carrots, and pepper and stir-fry for 3 more minutes until just tender. 8. Warm the rice and spoon it into a bowl. 9. Top with the beef and vegetables and pour over any pan juices. 10. Add a scoop of cold kimchi on the side and a pinch of black pepper.",
  "oil": "Avocado oil"
 },
 {
  "title": "Oyakodon, Japanese Chicken & Egg Rice Bowl",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Egg whole raw|Egg whole cooked",
  "produce": "Onion raw",
  "prefProduce": "Onion raw",
  "cuisine": "Japanese",
  "extras": [
   [
    "Soy sauce",
    14
   ],
   [
    "Coconut aminos",
    10
   ],
   [
    "Honey",
    6
   ]
  ],
  "season": "Dashi (the soul of oyakodon), tamari, mirin or a little honey, and sliced scallion over the top. A few slices of pickled ginger on the side cut through the sweetness. A shake of shichimi togarashi at the table.",
  "note": "Oyakodon means parent-and-child bowl, named for the chicken and egg together. It is naturally lean and high in protein when built on chicken breast or thigh.",
  "method": "1. Cut the chicken into bite-size pieces and slice the onion into thin half-moons. 2. In a small bowl, beat the eggs just enough to break the yolks. 3. In a shallow pan, stir the tamari (gluten-free soy sauce), the coconut aminos, and a small spoon of honey with a splash of water to make a light broth. 4. Bring the broth to a gentle simmer over medium heat. 5. Add the onion and let it soften for 2 minutes. 6. Add the chicken and simmer for 5 to 6 minutes until cooked through. 7. Pour the beaten eggs evenly over the top and do not stir. 8. Cover the pan and cook for about 1 minute, until the egg is just set but still soft. 9. Warm the rice and put it in a bowl. 10. Slide the chicken, onion, and silky egg on top and spoon a little of the broth over the rice.",
  "oil": "Canola oil"
 },
 {
  "title": "Ponzu Shrimp & Edamame Rice Bowl (Poke-Style)",
  "slot": "lunch",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Shrimp cooked|Tuna yellowfin cooked|Salmon sockeye cooked|Mackerel jack canned|Salmon pink canned",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "Cucumber raw|Carrots raw|Edamame cooked",
  "prefProduce": "Cucumber raw",
  "cuisine": "Japanese",
  "extras": [
   [
    "Ponzu sauce",
    22
   ],
   [
    "Soy sauce",
    6
   ],
   [
    "Garlic raw",
    3
   ]
  ],
  "season": "Optional: ponzu, tamari, fresh ginger, toasted sesame seeds, sliced scallion, and a few drops of toasted sesame oil. A pinch of togarashi or sriracha for heat.",
  "note": "A Japanese-Hawaiian poke-style bowl built on citrusy ponzu instead of heavy mayo. Lean seafood plus edamame stacks protein while avocado keeps fats clean and modest.",
  "method": "1. If the shrimp are warm, chill them in the fridge while you prep the vegetables. 2. Thinly slice the cucumber into half-moons and cut the carrots into thin matchsticks. 3. Warm the rice, then let it cool until it is just barely warm and spread it in the bottom of a bowl. 4. In a small bowl, stir the ponzu sauce with a little tamari (gluten-free soy sauce) and a pinch of grated raw garlic to make the dressing. 5. Toss the cooked shrimp in half of the dressing. 6. Arrange the shrimp, cucumber, carrots, and warm edamame in neat sections over the rice. 7. Slice the avocado and lay it on top. 8. Spoon the rest of the ponzu dressing over the whole bowl. 9. Add a few sliced pieces of kimchi on the side for tang. 10. Eat right away while everything is cool and fresh.",
  "oil": "Avocado oil"
 },
 {
  "title": "Lighter Pork & Snap Pea Stir-Fry over Rice (Moo Shu-Style)",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Pork tenderloin lean roasted|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Egg whole raw|Egg whole cooked",
  "produce": "Cabbage cooked|Snap peas cooked|Carrots raw",
  "prefProduce": "Cabbage cooked",
  "cuisine": "Chinese",
  "extras": [
   [
    "Soy sauce",
    14
   ],
   [
    "Coconut aminos",
    8
   ],
   [
    "Garlic raw",
    5
   ]
  ],
  "season": "Fresh ginger and garlic, tamari, a splash of rice vinegar, and a gluten-free hoisin-style sauce (the moo shu signature), with a few drops of toasted sesame oil. Sliced scallion on top.",
  "note": "A lighter take on moo shu pork, served over rice instead of fried pancakes. Lean pork tenderloin and egg give two protein sources while the cabbage and snap peas keep it low-calorie.",
  "method": "1. Slice the pork into thin strips and shred the cabbage and carrots. 2. Beat the eggs in a small bowl. 3. Heat half the oil in a wide pan over medium-high heat. 4. Pour in the eggs and let them set into a thin sheet, then break them up and scoop them onto a plate. 5. Add the rest of the oil and turn the heat to high. 6. Add the pork strips and stir-fry for 3 minutes until they lose their pink color. 7. Add the cabbage, carrots, and snap peas and stir-fry for 4 minutes until just tender but still crisp. 8. Stir in the tamari (gluten-free soy sauce), the coconut aminos, and a pinch of grated raw garlic and toss for 1 minute. 9. Return the eggs to the pan and fold everything together. 10. Warm the rice, spoon it into a bowl, and pile the pork and vegetables on top.",
  "oil": "Canola oil"
 },
 {
 "title": "Steamed Cod with Ginger-Scallion Soy over Rice",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Cod Atlantic cooked|Haddock cooked|Tilapia cooked|Mackerel jack canned",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado oil|Canola oil",
 "produce": "Bok choy cooked|Leeks cooked|Onion raw",
 "prefProduce": "Bok choy cooked",
 "cuisine": "Chinese",
 "extras": [
  [
   "Soy sauce",
   14
  ],
  [
   "Coconut aminos",
   8
  ],
  [
   "Garlic raw",
   4
  ]
 ],
 "season": "Optional: a generous pile of fresh ginger and scallion (the whole dish), garlic, tamari, and a spoon of hot oil poured over at the end. A few drops of toasted sesame oil to finish. A splash of rice vinegar or a squeeze of lime at the table to lift the soy.",
 "note": "Cantonese steamed fish with a hot-oil-over-scallions finish, one of the leanest restaurant dishes there is. Mild white fish makes it nearly pure protein over rice and greens.",
 "method": "1. Pat the cod dry and set it on a heatproof plate. 2. Thinly slice the leek and onion into long fine shreds and scatter half over the fish. 3. Set the plate in a steamer over simmering water, cover, and steam for 8 to 10 minutes until the fish flakes easily. 4. While the fish steams, blanch the bok choy in the simmering water for 2 minutes, then lift it out. 5. In a small bowl, mix the tamari (gluten-free soy sauce), the coconut aminos, and a pinch of grated raw garlic. 6. Carefully pour off any thin liquid from the steamed fish plate. 7. Pile the rest of the fresh leek and onion shreds over the hot fish. 8. Heat the oil in a small pan until it just starts to shimmer, then pour it sizzling over the leeks so they crackle. 9. Spoon the tamari mixture around the fish. 10. Warm the rice, set it in a bowl with the bok choy, and lay the fish and all its sauce on top.",
 "oil": "Avocado oil"
},
 {
  "title": "Turkish Menemen with Feta and Warm Pita",
  "slot": "breakfast",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "protein": "Egg whole cooked|Egg whole raw",
  "carb": "Pita bread|Whole wheat bread",
  "fat": "Feta cheese",
  "produce": "Tomato raw|Bell pepper red raw",
  "season": "Optional: onion, Turkish pepper paste (biber salcasi) or a pinch of Aleppo pepper, paprika, dried oregano, salt, and black pepper. Finish with fresh parsley; go easy on salt with the feta.",
  "note": "Classic Turkish breakfast. Keep the yolks runny so they mix into the tomato and pepper base. Eat it family-style straight from the pan.",
  "method": "1. Finely chop 1 small onion and 1 red bell pepper. Dice the fresh tomato into small pieces. 2. Heat the olive oil in a nonstick pan over medium heat. 3. Add the onion and pepper and cook for about 6 minutes, stirring often, until soft. 4. Stir in the diced tomato, a big pinch of salt, black pepper, and a teaspoon of paprika. Let it bubble gently for 8 to 10 minutes until it turns into a thick sauce. 5. Crumble the feta over the top and let it warm for 1 minute. 6. Crack the eggs straight into the pan over the sauce. Do not stir hard. Gently nudge them so the whites mix in but the yolks stay soft. Cook for 3 to 4 minutes until just set. 7. Sprinkle with dried oregano and a little more pepper. 8. Warm the pita in a dry pan or toaster, tear into pieces, and scoop up the eggs and sauce straight from the pan.",
  "oil": "Olive oil"
 },
 {
  "title": "Turkish Adana-Style Kofte over Bulgur Pilaf",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Lamb ground cooked|Beef ground 93/7 cooked|Turkey ground 93/7 cooked",
  "carb": "Bulgur cooked|White rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Onion raw|Tomato raw",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    60
   ]
  ],
  "season": "onion, paprika, cumin, cayenne, sumac, parsley, salt, black pepper",
  "note": "Adana kebab is normally grilled on skewers. The grated onion keeps the meat juicy. The sumac-onion salad cuts the richness and is not optional for the real flavor.",
  "method": "1. Grate or very finely chop half an onion and squeeze out the extra water with your hands. 2. In a bowl, mix the ground meat with the squeezed onion, a teaspoon of paprika, half a teaspoon of cumin, a pinch of cayenne, salt, and black pepper. Knead for 2 minutes so it gets sticky and holds together. 3. Wet your hands and press the meat into 3 or 4 long flat ovals, like fat fingers. 4. Heat the olive oil in a pan over medium-high heat. Cook the kofte for about 4 minutes per side until browned and cooked through. 5. While they cook, warm the bulgur and fluff it with a fork. 6. Thinly slice the rest of the onion, toss it with a big pinch of sumac and chopped parsley to make a quick sumac-onion salad. 7. Cut the fresh tomato into wedges. 8. Plate the bulgur, lay the kofte on top, and pile the sumac onion and tomato on the side. 9. Add a spoon of plain Greek yogurt if you like a cool side.",
  "oil": "Olive oil"
 },
 {
  "title": "Persian Joojeh Kabab with Saffron Rice",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Tomato raw|Onion raw",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    50
   ]
  ],
  "season": "Optional: saffron bloomed in warm water, grated onion, lemon juice, and a yogurt marinade (the joojeh secret for tender, bright chicken), with salt and black pepper. A little turmeric is traditional too.",
  "note": "Joojeh kabab is the saffron-lemon chicken kebab found at every Persian table. The yogurt in the marinade tenderizes the chicken. Charred tomato is the traditional partner.",
  "method": "1. Cut the raw chicken into large chunks if it is not already cooked. In a bowl, mix the chicken with the olive oil, a few spoons of plain Greek yogurt, grated onion, the juice of half a lemon, salt, and pepper. Crush a small pinch of saffron and stir it into a tablespoon of warm water, then add that too. Let it sit for at least 20 minutes. 2. Heat a grill pan or skillet over medium-high heat. Cook the chicken for about 5 minutes per side until charred at the edges and cooked through. 3. Cut the whole tomato in half and char the cut sides in the same hot pan for 3 minutes, since grilled tomato always rides along with this kebab. 4. Warm the rice and fluff it. Stir the rest of the saffron water through the rice so it turns golden. 5. Plate the saffron rice, lay the chicken and grilled tomato on top. 6. Squeeze the other half of the lemon over everything and dust with a little more salt.",
  "oil": "Olive oil"
 },
 {
 "title": "Levantine Lamb and White Bean Stew (Fasolia) over Rice",
 "slot": "dinner",
 "diets": [
  "omnivore"
 ],
 "protein": "Lamb loin chop lean cooked|Beef top round lean cooked",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Olive oil",
 "produce": "Tomato raw|Onion raw",
 "season": "onion, garlic, tomato paste, allspice, cumin, parsley, lemon juice, salt, black pepper",
 "note": "Fasolia is the cozy Levantine bean stew, warm with allspice and tomato. White beans and lean lamb make it filling and very high protein. Always served over plain rice.",
 "method": "1. Cut the lamb into bite-size cubes. Finely chop the onion and mince 2 cloves of garlic. 2. Heat the olive oil in a pot over medium-high heat. Brown the lamb cubes on all sides, about 5 minutes, then scoop them out. 3. Lower the heat to medium. Add the onion and cook for 5 minutes until soft, then add the garlic and cook 1 more minute. 4. Stir in 2 spoons of tomato paste, a teaspoon of allspice, half a teaspoon of cumin, salt, and pepper. Add the chopped fresh tomato and let it break down for 3 minutes. 5. Return the lamb to the pot. Add the cooked white beans and about a cup of water. Cover and simmer gently for 15 minutes so the flavors come together. 6. Stir in a handful of chopped parsley at the end. 7. Warm the rice and fluff it. 8. Spoon the stew over the rice and finish with a squeeze of lemon.",
 "oil": "Olive oil",
 "extras": [
  [
   "White beans cooked",
   110
  ]
 ]
},
 {
 "title": "Persian Baked Trout with Herbed Rice and Pomegranate Walnuts",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Trout rainbow farmed cooked|Salmon sockeye cooked|Cod Atlantic cooked|Mackerel jack canned|Salmon pink canned",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Walnuts",
 "produce": "Tomato raw|Onion raw",
 "extras": [
  [
   "Pomegranate raw",
   50
  ]
 ],
 "season": "turmeric, lemon juice, parsley, dill, cilantro, salt, black pepper",
 "note": "Inspired by Persian baked fish with sabzi (herb) rice, often eaten around Nowruz. Walnuts and pomegranate add the signature sweet-sour Persian finish.",
 "method": "1. Heat the oven to 400 degrees. Pat the trout dry and set it on a lined tray. 2. Rub the fish with the olive oil, salt, pepper, half a teaspoon of turmeric, and the juice of half a lemon. 3. Bake for about 12 to 15 minutes until the fish flakes easily with a fork. 4. While it bakes, warm the rice. Stir in a big handful of chopped parsley, dill, and cilantro so it becomes green herbed rice, the classic Persian sabzi rice. 5. Roughly chop the walnuts and toast them in a dry pan for 2 minutes until they smell nutty. 6. Cut the fresh tomato into wedges for the side. 7. Plate the herbed rice, lay the trout on top. 8. Scatter the toasted walnuts and a spoonful of fresh pomegranate seeds over everything for the sweet-tart crunch. 9. Finish with the rest of the lemon squeezed over the fish.",
 "oil": "Olive oil",
 "batchQ": 1, "prepMethod": "1. Equipment: a lined tray, a saucepan, a dry pan, a knife, and 4 containers. Heat the oven to 400F.\n2. Cook the rice and spread it on a tray to cool.\n3. Chop a big bunch of parsley, dill and cilantro and fold them through the cooled rice.\n4. Pat the trout dry and rub with olive oil, salt, pepper, half a teaspoon of turmeric and lemon juice.\n5. Bake 2 portions now for 12 to 15 minutes until they flake. Freeze the other fillets raw today, since raw fish keeps only 1 to 2 days in the fridge, and thaw them in the fridge the night before a second bake mid-week.\n6. Toast the walnuts in a dry pan 2 minutes and chop them. Store them in a small tub, not in the container, or they soften.\n7. Cut the tomatoes into wedges and keep them separate as well.\n8. Portion: herbed rice on the bottom, trout on top.\n9. Storage: fridge 3 days for cooked trout, 4 for the rice. Walnuts keep 2 weeks at room temperature.\n10. Reheat: 325F oven for 7 minutes. Scatter the walnuts, pomegranate and tomato after reheating, with a squeeze of lemon.",
 "makes": 4
},
 {
  "title": "Levantine Muhammara-Spiced Chicken Bulgur Bowl",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken thigh cooked|Turkey breast roasted|Chicken leg quarters roasted",
  "carb": "Bulgur cooked|Couscous cooked",
  "fat": "Walnuts",
  "produce": "Bell pepper red raw|Tomato raw",
  "extras": [
   [
    "Pomegranate raw",
    40
   ]
  ],
  "season": "paprika, cumin, cayenne, lemon juice, parsley, salt, black pepper",
  "note": "Muhammara is the Syrian roasted red pepper and walnut dip. Turned into a bowl with lean chicken and bulgur it stays high protein while keeping the smoky, sweet-tart pepper flavor.",
  "method": "1. Roast the red bell pepper. Lay it under the broiler or in a hot dry pan, turning until the skin blackens, about 8 minutes. Let it steam in a covered bowl for 5 minutes, then peel off the skin and chop it. 2. Make the muhammara base. Mash the roasted pepper with the chopped walnuts, a teaspoon of pomegranate molasses or a little lemon juice, half a teaspoon of cumin, a pinch of cayenne, salt, and a teaspoon of the olive oil until it is a thick rough paste. 3. Slice the cooked chicken into strips and warm it through in a pan with a pinch of paprika. 4. Warm the bulgur and fluff it with a fork, then stir in chopped parsley. 5. Build the bowl. Spoon the bulgur in first, lay the chicken on top, and add a big dollop of the red pepper muhammara on the side. 6. Cut the fresh tomato into pieces and add them in. 7. Scatter a few extra walnut pieces and a spoon of pomegranate seeds over the top.",
  "oil": "Olive oil"
 },
 {
  "title": "Doro-Style Berbere Chicken with Collard Greens & Rice",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken thigh cooked|Chicken drumstick cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Collard greens cooked|Kale cooked|Spinach cooked",
  "prefProduce": "Collard greens cooked",
  "cuisine": "Ethiopian/East-African",
  "extras": [
   [
    "Harissa paste",
    22
   ],
   [
    "Onion raw",
    60
   ],
   [
    "Garlic raw",
    6
   ]
  ],
  "season": "berbere spice, garlic, ginger, ground cardamom, a pinch of fenugreek, salt, black pepper",
  "note": "Harissa stands in for berbere; for a more authentic flavor add a pinch each of ground fenugreek and ground clove with the ginger in step 1.",
  "method": "1. Pat the chicken dry and cut it into large bite-size pieces. Sprinkle it all over with salt, black pepper, ground ginger, and a small pinch of ground cardamom. 2. Peel and finely chop the onion. Peel and mince the garlic. 3. Heat the avocado oil in a deep pan over medium heat. Add the chopped onion and cook slowly for about 8 minutes, stirring often, until it is very soft and deep golden. This slow-cooked onion is the heart of the dish. 4. Stir in the minced garlic and the harissa paste, which stands in for berbere here. Cook for 1 minute so the spice loses its raw smell. Add a splash of water to make a thick, glossy sauce. 5. Add the chicken pieces and turn them to coat in the red sauce. Pour in just enough water to come halfway up the chicken, then cover and simmer gently for 18 to 22 minutes, until the chicken is cooked through and tender. 6. While the chicken stews, rinse and chop the collard greens. In a separate pan over medium heat, cook the collards with a splash of water and a pinch of salt until wilted and tender, about 6 minutes, then squeeze out extra water. 7. Cook the rice according to its package directions and fluff it with a fork. 8. Taste the chicken sauce and add more salt if needed. Spoon the rice onto the plate, pile the collard greens beside it, and top with the berbere chicken and its sauce.",
  "oil": "Avocado oil"
 },
 {
  "title": "Misir Wot, Ethiopian Spiced Red Lentils over Rice",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "Lentils cooked|Split peas cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Collard greens cooked|Kale cooked|Tomato raw",
  "prefProduce": "Collard greens cooked",
  "cuisine": "Ethiopian/East-African",
  "extras": [
   [
    "Harissa paste",
    20
   ],
   [
    "Onion raw",
    70
   ],
   [
    "Garlic raw",
    6
   ],
   [
    "Tomato raw",
    60
   ]
  ],
  "season": "berbere spice, garlic, ginger, ground cumin, ground cardamom, salt",
  "note": "Naturally vegan and fiber-rich. For deeper flavor stir in a pinch of ground cardamom and a tiny pinch of ground clove with the ginger in step 3.",
  "method": "1. Peel and finely chop the onion. Peel and mince the garlic. Finely dice the tomato. 2. Heat the olive oil in a pot over medium heat. Add the chopped onion and cook for about 8 minutes, stirring often, until soft and golden brown. A well-cooked onion base is what gives this stew its rich body. 3. Stir in the minced garlic, a pinch of ground ginger, and the harissa paste, which stands in for the spiced berbere. Cook for 1 minute, stirring, until fragrant. 4. Add the diced tomato and cook for 3 to 4 minutes, until it breaks down into the sauce. 5. Stir in the cooked lentils along with a cup of water and a good pinch of salt. Simmer gently for 12 to 15 minutes, stirring now and then, until the lentils are very soft and the stew is thick. Add a splash more water if it gets too dry. 6. While the lentils simmer, rinse and chop the collard greens. Cook them in a separate pan with a splash of water and a pinch of salt until tender, about 6 minutes, then drain. 7. Cook the rice according to its package directions and fluff with a fork. 8. Taste the lentil stew and adjust the salt. Spoon the rice onto the plate, add the collard greens, and ladle the spiced red lentils over the top.",
  "oil": "Olive oil"
 },
 {
  "title": "Moroccan Harissa Chicken with Chickpea Couscous",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken thigh cooked|Chicken leg quarters roasted",
  "carb": "Couscous cooked|Bulgur cooked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Carrots raw|Zucchini cooked|Bell pepper red raw",
  "prefProduce": "Carrots raw",
  "cuisine": "Moroccan/North-African",
  "extras": [
   [
    "Harissa paste",
    20
   ],
   [
    "Chickpeas cooked",
    70
   ],
   [
    "Onion raw",
    50
   ],
   [
    "Garlic raw",
    5
   ]
  ],
  "season": "harissa, ground cumin, coriander, smoked paprika, garlic, a little cinnamon, salt, fresh cilantro",
  "note": "Harissa carries the North African heat; add a squeeze of lemon and chopped parsley at the end if you have them on hand.",
  "method": "1. Pat the chicken dry and cut it into bite-size pieces. Season it with salt, black pepper, ground cumin, ground coriander, and a pinch of cinnamon. 2. Peel and chop the onion. Peel and mince the garlic. Peel and slice the carrots into thin coins. 3. Heat the olive oil in a large pan over medium-high heat. Add the chicken and cook for 5 to 6 minutes, turning, until lightly browned, then move it to a plate. 4. Lower the heat to medium and add the chopped onion and sliced carrots to the same pan. Cook for 6 minutes, stirring, until they begin to soften. Stir in the garlic and the harissa paste and cook for 1 minute until fragrant. 5. Return the chicken to the pan and add the chickpeas. Pour in a splash of water to make a light sauce, then cover and simmer for 8 to 10 minutes, until the chicken is cooked through and the carrots are tender. 6. While that simmers, prepare the couscous: pour the couscous into a bowl, add an equal amount of boiling water and a pinch of salt, cover, and let it sit for 5 minutes. Fluff it with a fork. 7. Taste the chicken and chickpeas and adjust the salt. Pile the couscous onto the plate and spoon the harissa chicken, carrots, and chickpeas over the top with all the sauce.",
  "oil": "Olive oil"
 },
 {
  "title": "Chermoula-Spiced Salmon with Chickpeas & Olives",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Salmon sockeye cooked|Salmon Atlantic wild cooked|Trout rainbow farmed cooked|Mackerel jack canned|Salmon pink canned",
  "carb": "Couscous cooked|Bulgur cooked|Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Tomato raw|Bell pepper red raw|Zucchini cooked",
  "prefProduce": "Tomato raw",
  "cuisine": "Moroccan/North-African",
  "extras": [
   [
    "Chickpeas cooked",
    70
   ],
   [
    "Garlic raw",
    6
   ],
   [
    "Harissa paste",
    10
   ],
   [
    "Olives ripe",
    15
   ]
  ],
  "season": "garlic, ground cumin, sweet paprika, fresh cilantro and parsley, lemon, a little harissa, salt",
  "note": "Chermoula is a classic Moroccan herb-and-spice sauce; finish with a squeeze of lemon for brightness if available.",
  "method": "1. Pat the salmon dry. In a small bowl make a quick chermoula by stirring together half of the olive oil, the minced garlic, ground cumin, sweet paprika, the harissa paste, and a pinch of salt. If you have fresh cilantro or parsley, chop a handful and stir it in too. 2. Rub about two-thirds of the chermoula all over the salmon and let it sit for 10 minutes while you prep the rest. 3. Dice the tomato. Slice the olives. Peel and mince the garlic. 4. Cook the couscous: place it in a bowl, pour over an equal amount of boiling water with a pinch of salt, cover, and rest 5 minutes, then fluff with a fork. 5. Heat the remaining olive oil in a nonstick pan over medium heat. Lay the salmon in skin-side down if it has skin and cook for about 4 minutes per side, until just cooked through and flaky. Move it to a plate. 6. In the same pan add the diced tomato, sliced olives, and chickpeas. Cook for 3 to 4 minutes, until the tomato softens into a light sauce, then stir in the rest of the chermoula and warm through. 7. Spoon the couscous onto the plate, top with the tomato-and-chickpea mixture, and set the chermoula salmon on top.",
  "oil": "Olive oil"
 },
 {
  "title": "Jamaican Jerk Chicken with Rice & Peas",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken drumstick cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil|Olive oil",
  "produce": "Bell pepper red raw|Carrots raw|Cabbage cooked",
  "prefProduce": "Bell pepper red raw",
  "cuisine": "Caribbean/Jamaican",
  "extras": [
   [
    "Kidney beans cooked",
    80
   ],
   [
    "Sriracha / hot sauce",
    12
   ],
   [
    "Onion raw",
    40
   ],
   [
    "Garlic raw",
    6
   ]
  ],
  "season": "allspice, dried thyme, ground ginger, cinnamon, nutmeg, garlic, scallion, scotch bonnet or cayenne, salt, black pepper",
  "note": "Sriracha plus allspice and thyme builds the jerk flavor; traditional rice and peas uses coconut milk, so a tablespoon of light coconut would deepen it if you have it.",
  "method": "1. Pat the chicken dry. Make a quick jerk rub by mixing the sriracha with ground allspice, dried thyme, ground ginger, a pinch of cinnamon, a pinch of ground nutmeg, salt, and black pepper. The sriracha stands in for the fiery Scotch bonnet. 2. Peel and grate or finely mince the garlic and a little of the onion, then stir them into the rub. Rub this paste all over the chicken and let it marinate for at least 15 minutes while you start the rice. 3. To make the rice and peas, peel and finely chop the rest of the onion. Heat the avocado oil in a pot over medium heat and cook the onion for 3 minutes until soft. Add the kidney beans, the uncooked rice, a pinch of dried thyme, and salt, then pour in the water the rice package calls for. Bring to a simmer, cover, and cook on low until the rice is tender and the water is absorbed, about 15 to 18 minutes. 4. While the rice cooks, heat a grill pan or skillet over medium-high heat. Lay the marinated chicken down and cook for about 5 to 7 minutes per side, until charred at the edges and cooked through. 5. Slice the red bell pepper into strips and serve raw alongside or quickly char them in the chicken pan for the last 2 minutes. 6. Fluff the rice and peas with a fork. Plate the rice and peas, add the peppers, and set the jerk chicken on top.",
  "oil": "Avocado oil"
 },
 {
 "title": "Trinidad-Style Curry Shrimp with Sweet Potato & Callaloo",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Shrimp cooked|Cod Atlantic cooked|Tilapia cooked|Mackerel jack canned",
 "carb": "Sweet potato baked|White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado oil|Coconut oil",
 "produce": "Collard greens cooked|Spinach cooked|Kale cooked",
 "prefProduce": "Collard greens cooked",
 "cuisine": "Caribbean/Jamaican",
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Tomato raw",
   60
  ],
  [
   "Hot sauce cayenne",
   8
  ]
 ],
 "season": "Optional: Trinidadian curry powder bloomed in oil until fragrant (the 'chunkay' step), ground cumin (geera), turmeric, garlic, thyme, scallion, culantro or cilantro, and a little scotch bonnet. Lime to finish.",
 "note": "Collard greens stand in for callaloo; a splash of light coconut milk stirred in at the end makes it richer and more authentic if you have it.",
 "method": "1. Peel and finely chop the onion. Peel and mince the garlic. Dice the tomato. Rinse and roughly chop the collard greens, which stand in for callaloo here. 2. Peel the sweet potato and cut it into bite-size cubes. 3. Heat the coconut oil in a deep pan over medium heat. Add the chopped onion and cook for 4 minutes until soft. Stir in the garlic, curry powder, ground cumin, ground turmeric, and a pinch of ground thyme. Cook this spice-and-onion base for 2 minutes, adding a splash of water so the spices toast without burning. This step, called burning the curry, is what gives the dish its deep color. 4. Add the diced tomato and the sweet potato cubes, stir to coat, then pour in enough water to nearly cover. Cover and simmer for 10 to 12 minutes, until the sweet potato is just tender. 5. Stir in the chopped collard greens and the cayenne hot sauce and cook for another 4 minutes, until the greens are wilted and tender. 6. Add the shrimp and stir them into the curry. Simmer gently for 3 to 4 minutes, just until the shrimp are pink and cooked through. Do not overcook them. 7. Taste and adjust the salt. Serve the curry shrimp in a bowl on its own, or spoon it over rice if you chose rice as your starch.",
 "oil": "Coconut oil",
 "batchQ": 2, "prepMethod": "1. Equipment: a deep pan with a lid, a knife, and 5 containers.\n2. Finely chop the onion, mince the garlic, dice the tomatoes and roughly chop the collard greens.\n3. Peel the sweet potatoes and cut them into bite-size cubes, or cook the rice if it is rice on your list.\n4. Heat the coconut oil over medium and cook the onion 4 minutes until soft.\n5. Stir in the garlic, curry powder, cumin, turmeric and a pinch of thyme. Cook 2 minutes with a splash of water so the spices darken without catching. This step is what gives the curry its color.\n6. Add the tomatoes and sweet potato, pour in enough water to nearly cover, then cover and simmer 10 to 12 minutes until the potato is just tender.\n7. Stir in the collards and the hot sauce and cook 4 minutes more until wilted.\n8. Add the shrimp and simmer 3 to 4 minutes, just until pink. Take the pan off the heat straight away.\n9. Cool the curry uncovered for 20 minutes before portioning.\n10. Storage: fridge 3 days. It freezes well for 2 months, so if your plan says to freeze a container, do it on the cook day and move it to the fridge the night before.\n11. Reheat: covered pan over low heat, or microwave at 70 percent power. Shrimp toughen on a hard reheat.",
 "makes": 5
},
 {
  "title": "Peruvian Lomo Saltado over Rice",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef sirloin lean grilled|Beef top round lean cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Avocado oil",
  "produce": "Onion raw|Tomato raw|Bell pepper red raw",
  "prefProduce": "Onion raw",
  "cuisine": "Peruvian",
  "extras": [
   [
    "Soy sauce",
    15
   ]
  ],
  "season": "salt, black pepper, ground cumin, dried oregano, garlic",
  "note": "Lomo saltado is Peru's most famous chifa dish, where Chinese stir-fry meets Andean ingredients. The tamari (gluten-free soy sauce) is traditional, not a shortcut. Keep the heat high and the cooking fast so the beef sears and the onion stays crunchy.",
  "method": "1. Pat the beef dry and slice it into thin strips about the width of your finger. 2. Sprinkle the beef with salt, black pepper, and a little ground cumin, then toss to coat. 3. Cut the onion into thick strips, cut the tomato into wedges, and cut the bell pepper into strips. 4. Heat a large pan or wok over high heat until it is very hot, then add the avocado oil. 5. Add the beef in one layer and let it sear without stirring for about 1 minute, then stir and cook 1 more minute until browned. Move the beef to a plate. 6. Add the onion and bell pepper to the same hot pan and stir-fry for 2 minutes so they stay a little crisp. 7. Add minced garlic and the tomato wedges and cook 1 minute more. 8. Return the beef to the pan, splash in the tamari (gluten-free soy sauce), and add a pinch of dried oregano. Toss everything together for 30 seconds. 9. Spoon the hot rice onto a plate and pile the saltado on top. 10. Drizzle any pan juices over the rice and serve right away.",
  "oil": "Avocado oil"
 },
 {
  "title": "Peruvian Pollo a la Brasa with Rice & Salsa Criolla",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Onion raw|Tomato raw|Bell pepper red raw",
  "prefProduce": "Onion raw",
  "cuisine": "Peruvian",
  "extras": [
   [
    "Hot sauce cayenne",
    10
   ],
   [
    "Salsa",
    30
   ]
  ],
  "season": "salt, black pepper, ground cumin, smoked paprika, garlic, dried oregano, lime",
  "note": "Pollo a la brasa is Peru's beloved roast chicken. The cumin, paprika, and garlic rub plus the fresh lime-soaked salsa criolla on top are what make it taste authentic. A little hot sauce stands in for the classic aji drizzle.",
  "method": "1. In a bowl, stir together the olive oil, minced garlic, ground cumin, smoked paprika, dried oregano, salt, and black pepper to make a thick rub. 2. Coat the chicken all over with the rub and let it sit while you heat the oven to 425 degrees. 3. Place the chicken on a foil-lined tray and roast for about 25 to 30 minutes until the outside is deep golden and the juices run clear. 4. While the chicken roasts, make salsa criolla. Slice the onion as thin as you can and rinse it under cold water to soften the bite. 5. Cut the tomato and bell pepper into thin strips. 6. Toss the onion, tomato, and pepper with a squeeze of fresh lime, a pinch of salt, and a little black pepper. Let it sit so the flavors blend. 7. Warm the rice and spoon it onto the plate. 8. Set the roasted chicken next to the rice. 9. Pile the bright salsa criolla over the chicken. 10. Add an extra squeeze of lime over everything just before eating.",
  "oil": "Olive oil"
 },
 {
 "title": "Brazilian Moqueca, Coconut Fish Stew over Rice",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Cod Atlantic cooked|Tilapia cooked|Halibut cooked|Mackerel jack canned",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Coconut oil|Olive oil",
 "produce": "Onion raw|Tomato raw|Bell pepper red raw",
 "prefProduce": "Bell pepper red raw",
 "cuisine": "Brazilian",
 "extras": [
  [
   "Coconut aminos",
   15
  ]
 ],
 "season": "salt, black pepper, ground cumin, smoked paprika, garlic, lime",
 "note": "Moqueca is a coastal Bahian stew built on layers of fish, peppers, tomato, and coconut. The coconut oil and coconut aminos bring the signature richness without heavy cream. Simmer gently so the fish stays in big tender pieces.",
 "method": "1. Cut the fish into large chunks, season with salt, black pepper, and a squeeze of lime, and let it rest while you prep the vegetables. 2. Slice the onion, tomato, and bell pepper into thin rounds. 3. Heat the coconut oil in a wide pot over medium heat. 4. Add the onion and bell pepper and cook for about 4 minutes until they soften. 5. Stir in minced garlic, ground cumin, and smoked paprika and cook 1 minute until fragrant. 6. Lay half of the tomato slices over the vegetables, then nestle the fish chunks on top. 7. Cover the fish with the rest of the tomato slices. 8. Pour in the coconut aminos and a splash of water, then cover the pot and simmer gently for about 8 to 10 minutes until the fish is opaque and flakes easily. Do not stir hard, just shake the pot so the fish stays whole. 9. Finish with another squeeze of lime over the top. 10. Spoon the rice into bowls and ladle the moqueca and its broth over the rice.",
 "oil": "Coconut oil",
 "batchQ": 2, "prepMethod": "1. Equipment: a wide pot with a lid, a knife, and 5 containers.\n2. Cook the rice and spread it on a tray to cool.\n3. Cut the fish into large chunks, season with salt, pepper and lime, and keep it in the fridge.\n4. Slice the onion, tomatoes and bell peppers into thin rounds.\n5. Heat the coconut oil in the pot and cook the onion and pepper 4 minutes until soft. Stir in the garlic, cumin and smoked paprika for a minute.\n6. Build the base: half the tomato slices over the vegetables, then the rest of the tomato on top. Pour in the coconut aminos and a splash of water.\n7. Simmer the base 10 minutes and cool it. This is the part that keeps, and it is better on day two.\n8. Cook the fish in two rounds. Nestle half the chunks into half the base, cover, and simmer 8 to 10 minutes without stirring hard. Shake the pot instead so the fish stays whole.\n9. Portion the rice and the cooked moqueca. Refrigerate the rest of the base. Freeze the rest of the raw fish today, since raw fish keeps only 1 to 2 days in the fridge, and thaw it in the fridge the night before a second 10-minute cook mid-week.\n10. Storage: fridge 3 days cooked, 4 days for the base on its own.\n11. Reheat: covered pan over low heat. Finish with lime.",
 "makes": 5
},
 {
  "title": "Cuban Ropa Vieja with Black Beans & Rice",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef top round lean cooked|Beef sirloin lean grilled",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Onion raw|Bell pepper red raw|Tomato raw",
  "prefProduce": "Bell pepper red raw",
  "cuisine": "Cuban",
  "extras": [
   [
    "Marinara sauce",
    40
   ],
   [
    "Black beans cooked",
    40
   ]
  ],
  "season": "salt, black pepper, ground cumin, smoked paprika, dried oregano, garlic, bay leaf",
  "note": "Ropa vieja means old clothes, a nod to the shredded beef simmered soft in a tomato, pepper, and onion sofrito. Served the classic Cuban way with black beans and white rice. Shred the beef finely so it drinks up the sauce.",
  "method": "1. Cook the beef until very tender, then use two forks to shred it into long thin strands. 2. Slice the onion and bell pepper into thin strips and chop the tomato. 3. Heat the olive oil in a large pan over medium heat. 4. Add the onion and bell pepper and cook for about 5 minutes until soft and sweet. 5. Stir in minced garlic, ground cumin, smoked paprika, and dried oregano and cook 1 minute. 6. Add the chopped tomato and the marinara sauce, drop in a bay leaf, and stir well. 7. Add the shredded beef and toss so every strand is coated in the sauce. 8. Lower the heat and let it simmer for about 10 minutes so the flavors soak in, adding a splash of water if it gets dry. Remove the bay leaf. 9. Warm the black beans in a small pot with a pinch of cumin and salt. 10. Plate the rice, spoon the black beans alongside, and pile the ropa vieja over the top.",
  "oil": "Olive oil"
 },
 {
 "title": "Tex-Mex Carne Asada Plate with Charred Peppers",
 "slot": "dinner",
 "diets": [
  "omnivore"
 ],
 "protein": "Beef sirloin lean grilled|Beef top round lean cooked",
 "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
 "fat": "Avocado raw",
 "produce": "Bell pepper cooked|Onion raw",
 "prefProduce": "Bell pepper red raw",
 "cuisine": "Tex-Mex",
 "extras": [
  [
   "Pico de gallo",
   50
  ]
 ],
 "season": "salt, black pepper, ground cumin, chili powder, garlic, lime, cilantro",
 "note": "Carne asada is the Tex-Mex grill staple, thin-sliced charred beef with smoky peppers, avocado, and pico. Slicing against the grain is the trick that keeps lean sirloin tender. Lime and cilantro at the end keep it bright.",
 "method": "1. Rub the beef with minced garlic, ground cumin, chili powder, salt, black pepper, and a squeeze of lime, then let it sit while the pan heats. 2. Cut the bell pepper and onion into thick strips. 3. Heat a grill pan or heavy skillet over high heat and add the avocado oil. 4. Lay the beef in the hot pan and sear for about 2 to 3 minutes per side for a good char, then move it to a board to rest. 5. In the same pan, char the bell pepper and onion strips for 3 to 4 minutes until they get smoky edges. 6. Slice the rested beef thinly against the grain so it stays tender. 7. Toss the pico de gallo with a little of the cooked onion for a quick relish. 8. Warm the rice and spoon it onto the plate. 9. Fan the sliced carne asada and the charred peppers over the rice. 10. Top with sliced avocado, a spoonful of pico de gallo, fresh cilantro, and a final squeeze of lime.",
 "oil": "Avocado oil"
},
 {
  "title": "Tex-Mex Chili con Carne & Cheese Bowl",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef ground 93/7 cooked|Turkey ground 93/7 cooked",
  "carb": "White rice cooked|Brown rice cooked|Riced cauliflower cooked|Quinoa cooked",
  "fat": "Cheddar cheese|Cheese reduced-fat cheddar",
  "produce": "Onion raw|Bell pepper red raw|Tomato raw",
  "prefProduce": "Onion raw",
  "cuisine": "Tex-Mex",
  "extras": [
   [
    "Pinto beans cooked",
    90
   ],
   [
    "Salsa",
    30
   ]
  ],
  "season": "salt, black pepper, ground cumin, chili powder, smoked paprika, garlic, dried oregano",
  "note": "This is Tex-Mex chili con carne, thick and spice-forward, ladled over rice and finished with melty cheddar. The pinto beans and double dose of cumin and chili powder give it that bowl-of-red comfort. Let the cheese melt before digging in.",
  "method": "1. Finely chop the onion and bell pepper and chop the tomato. 2. Heat the avocado oil in a deep pan over medium-high heat. 3. Add the ground beef and break it apart with a spoon, cooking until it is browned all over, about 5 minutes. 4. Push the meat to one side and add the onion and bell pepper, cooking 3 minutes until soft. 5. Stir in minced garlic, ground cumin, chili powder, smoked paprika, and dried oregano and cook 1 minute until it smells toasty. 6. Add the chopped tomato and the pinto beans, then pour in a splash of water to loosen it. 7. Lower the heat and simmer for about 10 minutes, stirring now and then, until it thickens into a hearty chili. Season with salt and black pepper. 8. Warm the rice and spoon it into a bowl. 9. Ladle the chili over the rice. 10. Top with shredded cheddar and a spoonful of salsa, then let the cheese melt for a minute before eating.",
  "oil": "Avocado oil"
 },
 {
  "title": "Gambas al Ajillo over Garlicky White Beans",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Shrimp cooked",
  "carb": "White beans cooked",
  "fat": "Olive oil",
  "produce": "Bell pepper red raw|Spinach cooked",
  "prefProduce": "Spinach cooked",
  "cuisine": "Spanish/tapas",
  "extras": [
   [
    "Pita bread",
    40
   ]
  ],
  "season": "garlic, smoked paprika, red pepper flakes, salt, black pepper, dried parsley, lemon juice if you have it",
  "note": "A tapas-bar classic turned into a full plate. The shrimp and white beans both bring protein, and the smoked paprika garlic oil carries the flavor, so measure the oil.",
  "method": "1. Pat the shrimp very dry with a paper towel so they sear instead of steam. Sprinkle them with salt, black pepper, and a pinch of smoked paprika. 2. Drain and rinse the white beans. Wash the spinach. 3. Mince 3 to 4 cloves of garlic. 4. Heat the olive oil in a wide skillet over medium heat. Add the garlic and a pinch of red pepper flakes and cook for about 45 seconds, just until the garlic smells sweet and turns pale gold. Do not let it brown or it will taste bitter. 5. Turn the heat up to medium high and add the shrimp in one flat layer. Cook for about 1 and a half minutes per side, until they curl and turn pink. Scoop the shrimp out onto a plate. 6. To the same pan add the white beans and the spinach. Stir for 2 to 3 minutes until the beans are hot and the spinach wilts down. Season with salt, black pepper, and another pinch of smoked paprika. 7. Slide the shrimp back into the pan and toss everything together for 30 seconds so the garlic oil coats it all. Squeeze over a little lemon juice if you have it, and finish with dried parsley. 8. Spoon it into a bowl and serve with the warm pita for scooping up the garlic oil.",
  "oil": "Olive oil"
 },
 {
  "title": "Spanish Chorizo-Spiced Pork with Patatas & Peppers",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Pork tenderloin lean roasted|Pork chop lean cooked",
  "carb": "Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Bell pepper red raw|Onion raw",
  "prefProduce": "Bell pepper red raw",
  "cuisine": "Spanish/tapas",
  "season": "Optional: smoked paprika (pimenton, the chorizo backbone), garlic, ground cumin, dried oregano, a pinch of cayenne, salt, and black pepper, with a splash of sherry or red wine vinegar to finish.",
  "note": "This hits the smoky, garlicky chorizo-and-patatas flavor of a Spanish tapas plate using lean pork and a spice rub instead of fatty sausage, so the protein stays high and the fat stays controlled.",
  "method": "1. Cut the potato into small half-inch cubes so they cook fast. Slice the red bell pepper into strips and slice the onion. 2. In a small bowl stir together smoked paprika, a little ground cumin, dried oregano, minced garlic, salt, and black pepper. This is your fake-chorizo spice rub. 3. Cut the pork into bite-size pieces and toss it with about half of the spice mix. 4. Heat the olive oil in a large skillet over medium high heat. Add the potato cubes, season with salt, and cook for about 8 to 10 minutes, stirring now and then, until they are golden and tender. Push them to one side of the pan. 5. Add the bell pepper and onion to the open space and cook for 4 to 5 minutes until they soften and pick up some color. Stir in the rest of the spice mix. 6. Add the pork and cook for 3 to 4 minutes, stirring, just until it is hot through and browned at the edges. 7. Splash in a little sherry or red wine vinegar if you have it and scrape the brown bits off the bottom of the pan. Taste and add salt. 8. Pile it all on a plate and serve hot.",
  "oil": "Olive oil"
 },
 {
  "title": "Greek Lamb Chop with Lemon Potatoes & Village Salad",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Lamb loin chop lean cooked|Beef sirloin lean grilled",
  "carb": "Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Cucumber raw|Tomato raw",
  "prefProduce": "Tomato raw",
  "cuisine": "Greek/Med",
  "extras": [
   [
    "Feta cheese",
    20
   ],
   [
    "Olives ripe",
    15
   ]
  ],
  "season": "garlic, dried oregano, salt, black pepper, lemon juice, red wine vinegar if you have it",
  "note": "A taverna plate. The lemon-oregano potatoes and chunky feta salad do the heavy flavor lifting, so the lean lamb chop can stay a sensible portion while the meal still tastes rich.",
  "method": "1. Cut the potato into small wedges. Toss the wedges with a little of the olive oil, salt, black pepper, dried oregano, minced garlic, and a good squeeze of lemon juice. 2. Roast or pan-cook the potato wedges over medium heat until golden and tender, about 12 to 15 minutes, turning once. These are your Greek lemon potatoes. 3. While the potatoes cook, season the lamb chop on both sides with salt, black pepper, dried oregano, and a little minced garlic. 4. Heat a dry skillet over medium high heat with just a thin film of olive oil. Sear the lamb for about 3 to 4 minutes per side for medium, then let it rest on a plate for 5 minutes. 5. Make the village salad. Chop the tomato into chunks and slice the cucumber into thick half-moons. Put them in a bowl with the olives. 6. Dress the salad with a little olive oil, a splash of red wine vinegar or lemon juice, salt, and dried oregano. Crumble the feta over the top. Do not toss too hard so the feta stays in chunks. 7. Plate the lamb chop next to the lemon potatoes and pile the village salad alongside. Finish the whole plate with one more squeeze of lemon.",
  "oil": "Olive oil"
 },
 {
 "title": "Greek Baked Cod with Tomato & White Beans",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Cod Atlantic cooked|Halibut cooked|Mackerel jack canned",
 "carb": "White beans cooked",
 "fat": "Olive oil",
 "produce": "Tomato raw|Onion raw",
 "prefProduce": "Tomato raw",
 "cuisine": "Greek/Med",
 "extras": [
  [
   "Feta cheese",
   20
  ],
  [
   "Pita bread",
   40
  ]
 ],
 "season": "garlic, dried oregano, dried dill, salt, black pepper, lemon juice, red pepper flakes",
 "note": "This is psari plaki, Greek baked fish in tomato. Lean cod plus white beans stacks the protein, and the feta and oregano tomato sauce keep it tasting like a long Sunday lunch.",
 "method": "1. Heat the oven to 400 degrees, or set a skillet over medium heat if you would rather do this on the stove. 2. Dice the tomato and thinly slice the onion. Mince 2 cloves of garlic. Drain and rinse the white beans. 3. Heat the olive oil in an oven-safe skillet over medium heat. Add the onion and a pinch of salt and cook for 4 to 5 minutes until soft. Add the garlic and a pinch of red pepper flakes and cook 30 seconds more. 4. Stir in the diced tomato and dried oregano. Let it simmer for about 5 minutes until it turns into a loose, chunky sauce. Stir in the white beans and a squeeze of lemon juice, then season with salt and black pepper. 5. Pat the cod dry, season both sides with salt, black pepper, and dried dill, and nestle the fillet down into the tomato and bean sauce. Spoon a little of the sauce over the top of the fish. 6. Crumble the feta over everything. Slide the skillet into the oven for about 12 to 15 minutes, until the cod flakes easily with a fork. On the stove, just cover the pan and cook gently for 8 to 10 minutes instead. 7. Finish with one more squeeze of lemon. Serve with the warm pita to mop up the sauce.",
 "oil": "Olive oil",
 "batchQ": 2, "prepMethod": "1. Equipment: an oven-safe skillet, a knife, and 4 containers. Heat the oven to 400F.\n2. Dice the tomatoes, thinly slice the onion, mince the garlic, and drain and rinse the white beans.\n3. Heat the olive oil and cook the onion with a pinch of salt 4 to 5 minutes until soft. Add the garlic and red pepper flakes for 30 seconds.\n4. Stir in the tomato and oregano and simmer about 5 minutes into a loose chunky sauce. Add the beans and a squeeze of lemon, then season.\n5. Make the full amount of the tomato and bean base now. It keeps better than the fish does.\n6. Pat the cod dry, season with salt, pepper and dried dill, and nestle 2 fillets into half the sauce. Crumble the feta over and bake 12 to 15 minutes until the fish flakes.\n7. Cool 15 minutes, then portion. Refrigerate the remaining base. Freeze the raw cod today, since raw fish keeps only 1 to 2 days in the fridge, and thaw it in the fridge the night before a second bake in 3 days.\n8. Storage: fridge 3 days for the baked fish, 4 days for the bean base alone.\n9. Reheat: 325F oven for 8 minutes, covered. Squeeze lemon over after reheating.",
 "makes": 4
},
 {
  "title": "Loaded BBQ Chicken & Baked Potato Plate",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken thigh cooked|Chicken breast cooked|Chicken leg quarters roasted",
  "carb": "Potato baked flesh",
  "fat": "Cheese reduced-fat cheddar",
  "produce": "Broccoli cooked|Green beans cooked",
  "prefProduce": "Broccoli cooked",
  "cuisine": "American comfort",
  "extras": [
   [
    "BBQ sauce",
    30
   ],
   [
    "Greek yogurt plain nonfat",
    40
   ]
  ],
  "season": "Optional: smoked paprika, garlic powder, onion powder, chili powder, a pinch of brown sugar, salt, and black pepper as a rub, then glaze with BBQ sauce in the last few minutes. Cayenne for heat.",
  "note": "A steakhouse-style loaded baked potato made the lean way. The Greek yogurt stands in for sour cream and the reduced-fat cheddar keeps the gooey factor, so it eats like a treat while the protein stays high.",
  "method": "1. Scrub the potato, poke it a few times with a fork, and bake it at 425 degrees for about 45 minutes until soft, or microwave it for 8 to 10 minutes if you are short on time. 2. While the potato cooks, season the chicken thigh all over with smoked paprika, garlic powder, onion powder, chili powder, salt, and black pepper. 3. Heat the avocado oil in a skillet over medium high heat. Avocado oil takes high heat well, so it is right for getting a good sear. Cook the chicken for about 5 to 6 minutes per side until cooked through and browned. 4. Brush the BBQ sauce over the chicken in the last minute of cooking so it gets sticky but does not burn. Move the chicken to a board and chop or slice it. 5. Steam or boil the broccoli until just tender, about 4 minutes, then season it with salt and black pepper. 6. Split the baked potato open and fluff the inside with a fork. Season it with salt and pepper. 7. Pile the BBQ chicken on top of the potato. Add a spoon of the plain Greek yogurt where you would normally use sour cream, then scatter the shredded reduced-fat cheddar over the hot chicken so it melts. 8. Set the broccoli on the side and serve right away.",
  "oil": "Avocado oil"
 },
 {
 "title": "Turkey Salisbury Steak with Onion Gravy & Mash",
 "slot": "dinner",
 "diets": [
  "omnivore"
 ],
 "protein": "Turkey ground 93/7 cooked|Beef ground 93/7 cooked",
 "carb": "Potato baked flesh",
 "fat": "Butter salted|Olive oil",
 "produce": "Green beans cooked",
 "prefProduce": "Mushrooms cooked",
 "cuisine": "American comfort",
 "extras": [
  [
   "Milk nonfat / skim",
   40
  ],
  [
   "Dijon mustard",
   8
  ]
 ],
 "season": "garlic powder, onion powder, gluten-free Worcestershire or tamari (gluten-free soy sauce), dried thyme, salt, black pepper, beef or chicken broth",
 "note": "Old-school diner comfort food rebuilt for fat loss. Lean ground turkey and a butter-light onion gravy carry the savory hit, and the potato is mashed with skim milk so it stays creamy without the heavy cream.",
 "method": "1. Boil or microwave the potato until very soft, about 12 to 15 minutes if cut into chunks. Drain it and mash it with the skim milk, a small pat of the salted butter, salt, and black pepper until smooth. Keep it warm. 2. In a bowl mix the ground turkey with garlic powder, onion powder, a splash of gluten-free Worcestershire or tamari (gluten-free soy sauce), salt, and black pepper. Shape it into one or two oval patties about three-quarters of an inch thick. 3. Heat the avocado oil in a skillet over medium high heat and sear the patties for about 4 minutes per side until browned and cooked through. Move them to a plate. 4. Slice your vegetable. To the same hot pan add the rest of the salted butter and your vegetable. Cook for about 5 minutes until they release their water and turn golden brown. 5. Stir in dried thyme, a little more gluten-free Worcestershire or tamari, and the Dijon mustard. Pour in a splash of broth and let it bubble for 2 to 3 minutes into a glossy gravy. Scrape up the brown bits from the bottom of the pan, that is where the flavor lives. 6. Slide the patties back into the gravy and spoon it over them. Simmer 1 minute so they soak it up. 7. Steam the green beans until just tender, about 4 minutes, and season with salt. 8. Plate the mash, set the Salisbury steak and onion gravy on top, and add the green beans on the side.",
 "oil": "Avocado oil"
},
 {
 "id": "vegan-berry-protein-smoothie",
 "title": "Vegan Berry Protein Smoothie",
 "slot": "breakfast",
 "diets": [
  "vegan",
  "ovo",
  "vegetarian"
 ],
 "protein": "Pea & rice protein powder",
 "carb": "Oats dry \\(raw\\)",
 "fat": "PBfit powdered peanut butter|Peanut butter smooth|Almond butter",
 "produce": "Blueberries raw|Strawberries raw",
 "prefFat": "PBfit powdered peanut butter",
 "oil": "No cooking oil. The nut butter is the finishing fat, blended straight in for richness and staying power.",
 "season": "Optional: a pinch of cinnamon, a teaspoon of cocoa powder, or a handful of spinach you will not taste. Frozen berries make it thick like a milkshake with no ice needed.",
 "note": "A dairy-free blend-and-go shake. Pea and rice protein is a complete protein, so this hits a real protein number without any whey.",
 "method": "1. No cooking, just blend. Pour about 1 to 1.5 cups of unsweetened almond, soy, or oat milk into the blender first so everything blends smoothly. 2. Add the berries, one scoop of the pea and rice protein powder, the nut butter, and a small scoop of dry oats. 3. Blend 30 to 45 seconds until completely smooth, scraping down the sides once. 4. Add a few ice cubes and blend again for a thicker, frostier shake. Pour and drink right away so it stays fresh."
},
 {
  "id": "vegan-pb-overnight-oats",
  "title": "Vegan Peanut Butter Banana Overnight Oats",
  "slot": "breakfast",
  "diets": [
   "vegan",
   "ovo",
   "vegetarian"
  ],
  "protein": "Pea & rice protein powder",
  "carb": "Oats dry \\(raw\\)",
  "fat": "PBfit powdered peanut butter|Peanut butter smooth|Almond butter",
  "produce": "Banana raw",
  "prefFat": "PBfit powdered peanut butter",
  "oil": "No cooking oil. The peanut butter is the finishing fat, stirred into the base for creaminess and slow-digesting fats.",
  "season": "Optional: a pinch of cinnamon, a few berries, or a thin thread of maple syrup. Make two jars at once so tomorrow is already handled.",
  "note": "Dairy-free stir-and-chill overnight oats with oats, pea and rice protein, plant milk, peanut butter, and banana, ready when you wake up.",
  "method": "1. No cooking. In a jar, stir together the dry oats, one scoop of pea and rice protein powder, and the peanut butter. 2. Add about 3/4 cup of unsweetened almond, soy, or oat milk a splash at a time, stirring well so the powder mixes in fully without clumping. The mix should look like a loose pudding; add a little more milk if it is too thick. 3. Slice the banana on top. 4. Put the lid on and chill overnight, or at least 4 hours. 5. In the morning, give it a stir and eat it cold."
 },
 {
  "id": "vegan-tofu-scramble-power-bowl",
  "title": "High-Protein Tofu Scramble & Black Bean Power Bowl",
  "slot": "breakfast",
  "diets": [
   "vegan",
   "ovo",
   "vegetarian"
  ],
  "protein": "Tofu firm|Tempeh",
  "carb": "Potato baked|Sweet potato baked|Oats dry \\(raw\\)",
  "fat": "Avocado raw|Olive oil",
  "produce": "Bell pepper red raw|Spinach raw",
  "prefProduce": "Bell pepper red raw",
  "extras": [
   [
    "Black beans cooked",
    40
   ],
   [
    "Salsa verde \\(tomatillo\\)",
    30
   ],
   [
    "Sriracha / hot sauce",
    8
   ]
  ],
  "oil": "Heat a teaspoon of olive oil in a nonstick pan over medium heat to keep the tofu from sticking and to crisp the edges.",
  "season": "Optional: turmeric plus a pinch of black salt (kala namak) makes it taste eggy, with garlic powder, onion powder, cumin, salt, and pepper. Nutritional yeast adds a savory, cheesy note.",
  "note": "A savory vegan breakfast that actually hits protein: crumbled tofu plus black beans plus a potato base. The turmeric and black salt give it a real scrambled-egg flavor.",
  "method": "1. Press the firm tofu 10 to 15 minutes between paper towels with a weight on top to squeeze out water, then crumble it into small egg-like pieces with your hands. 2. Heat a teaspoon of olive oil in a nonstick pan over medium heat. Add the tofu and cook 5 to 7 minutes, stirring now and then, until the edges turn golden and any water has cooked off. 3. Stir in turmeric, a pinch of black salt, garlic powder, and cumin to taste so the tofu turns yellow and savory. 4. Add your vegetable (diced red bell pepper, zucchini, or a big handful of spinach) and the warmed black beans for the last 2 to 3 minutes, until the peppers soften or the spinach wilts. 5. Plate over the baked potato or sweet potato, then top with salsa and a little hot sauce. Tofu and tempeh are pre-cooked, so you are cooking for texture and to heat through, roughly 165F if reheating."
 },
 {
  "title": "Cajun Shrimp & Cauliflower-Rice Power Bowl",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Shrimp cooked",
  "carb": "Riced cauliflower cooked|Quinoa cooked|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Bell pepper red raw|Onion raw|Tomato raw|Spinach raw",
  "extras": [
   [
    "Pico de gallo",
    40
   ],
   [
    "Hot sauce cayenne",
    15
   ]
  ],
  "season": "Optional: Cajun seasoning, smoked paprika, garlic, onion, thyme, cayenne, and black pepper. Bell pepper and onion cooked in (the holy trinity) make it taste authentically Louisiana; fresh parsley to finish.",
  "note": "Very high protein, very low fat. Shrimp is one of the leanest proteins available and the riced cauliflower base keeps carbs and calories down while letting you eat a big, filling bowl.",
  "method": "1. Pat about 6 oz cooked or thawed shrimp dry and toss with 1 tsp Cajun seasoning and a pinch of cayenne. 2. Heat 1 tsp olive oil in a large pan over medium-high heat, about 1 minute. 3. Add 1 diced red bell pepper and 1/2 sliced onion and cook for 4 to 5 minutes until softened and lightly charred. 4. Add the shrimp and cook for 2 to 3 minutes just until hot and pink. 5. Stir in a handful of raw spinach and 1 chopped tomato and cook 1 minute until the spinach wilts. 6. Serve over warm riced cauliflower. 7. Finish with chopped parsley and a squeeze of fresh lime if you have one. Total cook time is about 10 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Lemon-Pepper Cod & Smashed Potato Plate",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Cod Atlantic cooked|Haddock cooked|Pollock cooked|Tilapia cooked",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Asparagus cooked|Green beans cooked|Broccoli cooked",
  "extras": [
   [
    "Dijon mustard",
    12
   ]
  ],
  "season": "Optional: fresh-cracked black pepper and real lemon zest (better than the jarred blend), garlic powder, dried dill, and sea salt, with a squeeze of lemon at the end.",
  "note": "White fish like cod is almost pure protein with barely any fat, making this one of the leanest dinners possible. A smashed baked potato and roasted asparagus round it into a real plate, not sad diet food.",
  "method": "1. Pat a 6 to 7 oz cod fillet dry and season both sides with lemon-pepper, garlic powder, and a pinch of salt. 2. Heat 1 tsp olive oil in a nonstick pan over medium-high heat, about 1 minute. 3. Lay the cod in the pan and cook 3 to 4 minutes per side until it flakes easily with a fork. 4. While the fish cooks, microwave or roast 1 baked potato, then lightly smash the flesh with a fork and sprinkle with dill and salt. 5. Steam or roast a handful of asparagus for 4 to 5 minutes until bright green and tender-crisp. 6. Plate the fish, potato, and asparagus and finish everything with a generous squeeze of fresh lemon. Total cook time is about 12 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Buffalo Chicken & Crisp Romaine Crunch Bowl",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Turkey breast roasted",
  "carb": "Quinoa cooked|Potato baked flesh",
  "fat": "Greek yogurt ranch dressing",
  "produce": "Romaine lettuce|Celery raw|Carrots raw|Cucumber raw",
  "extras": [
   [
    "Hot sauce cayenne",
    45
   ],
   [
    "Greek yogurt ranch dressing",
    30
   ]
  ],
  "season": "Optional: garlic powder, onion powder, and smoked paprika on the chicken, then toss in buffalo-style hot sauce (cayenne pepper sauce with a little butter or olive oil). Black pepper, and a cooling dill-yogurt or ranch-style drizzle.",
  "note": "Lean chicken breast tossed in cayenne hot sauce delivers big flavor with almost zero added fat. A yogurt-based ranch keeps it creamy and high-protein instead of greasy.",
  "method": "1. Dice about 6 oz cooked chicken breast and toss it in a bowl with 2 to 3 tbsp cayenne hot sauce, garlic powder, and a pinch of paprika. 2. Warm the chicken in a pan over medium heat for 2 to 3 minutes, or microwave 60 seconds, until hot and well coated. 3. Chop 2 cups romaine, 1 stalk celery, a handful of carrots, and some cucumber and add to a large bowl. 4. Spoon a scoop of cooked quinoa over the greens for staying power. 5. Top with the buffalo chicken. 6. Drizzle with Greek yogurt ranch and toss everything together. Total prep and cook time is about 8 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Savory Cottage Cheese & Egg-White Breakfast Bowl",
  "slot": "breakfast",
  "diets": [
   "omnivore",
   "vegetarian"
  ],
  "protein": "Egg white raw|Cottage cheese nonfat",
  "carb": "Whole wheat bread|Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Spinach raw|Tomato raw|Bell pepper red raw",
  "extras": [
   [
    "Hot sauce cayenne",
    15
   ]
  ],
  "season": "Everything bagel seasoning, black pepper, garlic powder, chives",
  "note": "Two of the leanest proteins on earth, egg whites and nonfat cottage cheese, stacked in one savory bowl for a huge protein hit with almost no fat. Far more filling than it sounds.",
  "method": "1. Spray a nonstick pan with a little olive oil and heat over medium, about 1 minute. 2. Add a handful of raw spinach, a few sliced zucchini, and a small handful of diced red bell pepper and cook 2 to 3 minutes until softened. 3. Pour in about 3/4 cup egg whites and gently scramble for 2 to 3 minutes until just set. 4. Spoon 1/2 cup nonfat cottage cheese into a bowl as the creamy base. 5. Top with the warm egg-white scramble and a handful of chopped fresh tomato. 6. Sprinkle everything bagel seasoning, chives, and black pepper over the top. 7. Serve with a slice of toasted whole wheat bread on the side. Total cook time is about 8 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Greek Tuna & Bulgur Lemon Bowl",
  "slot": "lunch",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Tuna light canned in water|Chicken breast canned drained",
  "carb": "Bulgur cooked|Quinoa cooked",
  "fat": "Olive oil|Feta cheese",
  "produce": "Cucumber raw|Tomato raw|Onion raw|Romaine lettuce",
  "extras": [
   [
    "Tzatziki",
    40
   ],
   [
    "Olives ripe",
    15
   ]
  ],
  "season": "Dried oregano, garlic powder, black pepper, fresh lemon, fresh dill",
  "note": "Water-packed light tuna is an ultra-lean, ultra-cheap protein. Tossed Greek-style with lemon, herbs, and crunchy cucumber and tomato over bulgur, it eats like a fresh deli salad rather than diet food.",
  "method": "1. Drain a can of water-packed light tuna well and flake it into a bowl. 2. Add about 3/4 cup cooked bulgur for a nutty, chewy base. 3. Dice 1/2 cucumber, 1 tomato, and a little red onion and add to the bowl. 4. Drizzle with 1 tsp olive oil and a big squeeze of fresh lemon. 5. Season with oregano, garlic powder, black pepper, and chopped fresh dill. 6. Toss everything together and serve over a bed of chopped romaine. 7. Sprinkle a small amount of feta on top if using. No cooking required beyond having the bulgur ready, about 5 minutes to assemble.",
  "oil": "Olive oil"
 },
 {
  "title": "Chicken Teriyaki Soba Noodle Bowl",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Turkey breast roasted",
  "carb": "Buckwheat groats cooked|Whole wheat pasta cooked|Chickpea pasta cooked",
  "fat": "Avocado oil",
  "produce": "Snap peas cooked|Broccoli cooked|Carrots raw|Bok choy cooked",
  "extras": [
   [
    "Teriyaki sauce sugar-free",
    40
   ],
   [
    "Soy sauce",
    8
   ]
  ],
  "season": "Optional: tamari (gluten-free if needed), mirin or a little honey, fresh ginger and garlic, and a sprinkle of toasted sesame seeds and sliced scallion. A few drops of toasted sesame oil off the heat is the classic Japanese finish.",
  "note": "A lighter take on Japanese soba. Buckwheat groats stand in for soba noodles, tossed with lean chicken and crisp veg in a sugar-free gluten-free teriyaki glaze.",
  "method": "1. Cook the buckwheat groats according to the package, usually about 12 to 15 minutes, then drain and set aside. 2. While the buckwheat cooks, slice the chicken breast into thin strips. 3. Heat the avocado oil in a large pan over medium-high heat. Add the chicken and cook for about 6 to 8 minutes until cooked through and lightly browned. 4. Add the snap peas, sliced carrots, and broccoli to the pan and stir-fry for 3 to 4 minutes until bright and just tender. 5. Pour in the sugar-free gluten-free teriyaki sauce and toss everything for 1 minute so the chicken and veg get coated. 6. Add the cooked buckwheat to the pan and toss together for 1 more minute to warm through. 7. Top with sliced scallion and a sprinkle of sesame if you like, then serve warm.",
  "oil": "Avocado oil"
 },
 {
  "title": "Sweet Potato Chana Masala with Whole-Wheat Naan",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "Chickpeas cooked",
  "carb": "Sweet potato baked|Quinoa cooked|Mission Carb Balance tortilla whole wheat",
  "fat": "Avocado oil|Olive oil",
  "produce": "Tomato raw|Onion raw|Spinach raw|Bell pepper red raw",
  "season": "Optional: garam masala, ground cumin, coriander, turmeric, fresh ginger and garlic, and a pinch of amchur (dried mango) or a squeeze of lemon at the end. Finish with chopped cilantro.",
  "note": "A hearty, tasty Indian chana with chickpeas and sweet potato in a warm spiced tomato sauce. Carb Balance tortilla stands in for naan, and there is no rice in sight.",
  "method": "1. Peel and dice the sweet potato into small cubes so it cooks quickly. 2. Heat the avocado oil in a deep pan over medium heat. Add the chopped onion and cook for 4 to 5 minutes until soft. 3. Add minced garlic and your ground spices, cumin, coriander, turmeric, and a pinch of cayenne, and stir for 30 seconds until fragrant. 4. Add the chopped tomato and cook for 3 to 4 minutes until it breaks down into a sauce. 5. Stir in the diced sweet potato and the cooked chickpeas with a splash of water, cover, and simmer for about 12 to 15 minutes until the sweet potato is fork-tender. 6. Stir in the spinach and let it wilt for 1 to 2 minutes. Season with salt and a squeeze of lemon. 7. Warm the whole-wheat Carb Balance tortilla in a dry pan for about 30 seconds per side and serve alongside the chana to scoop.",
  "oil": "Avocado oil"
 },
 {
  "title": "Tex-Mex Chicken Fajita Carb Balance Wraps",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Turkey breast roasted|Beef sirloin lean grilled",
  "carb": "Mission Carb Balance tortilla soft taco|Mission Carb Balance tortilla whole wheat|Corn tortilla",
  "fat": "Avocado oil|Avocado raw",
  "produce": "Bell pepper red raw|Onion raw|Tomato raw|Romaine lettuce",
  "extras": [
   [
    "Pico de gallo",
    40
   ],
   [
    "Salsa",
    30
   ]
  ],
  "season": "chili powder, ground cumin, smoked paprika, garlic powder, salt, black pepper, and a squeeze of lime; fresh cilantro on top",
  "note": "Sizzling Tex-Mex chicken fajitas with peppers and onions, wrapped in a high-fiber Carb Balance tortilla. Lean and loaded with flavor.",
  "method": "1. Slice the chicken breast, bell pepper, and onion into thin strips. 2. In a bowl, toss the chicken with chili powder, cumin, smoked paprika, garlic powder, salt, and a squeeze of lime. 3. Heat the avocado oil in a large skillet over medium-high heat. Add the chicken and cook for about 6 to 8 minutes until cooked through, then move it to a plate. 4. Add the peppers and onions to the same pan and cook for 4 to 5 minutes until they start to char at the edges but stay a little crisp. 5. Return the chicken to the pan and toss everything together for 1 minute. 6. Warm the Carb Balance tortillas in a dry pan for about 20 to 30 seconds per side. 7. Fill each tortilla with the fajita mixture, top with pico de gallo and a little diced avocado, and serve right away.",
  "oil": "Avocado oil"
 },
 {
  "title": "Greek Pork Souvlaki Bowl with Lemon Bulgur & Tzatziki",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Pork tenderloin lean roasted|Chicken breast cooked",
  "carb": "Bulgur cooked|Quinoa cooked|Potato baked flesh",
  "fat": "Olive oil|Feta cheese",
  "produce": "Cucumber raw|Tomato raw|Onion raw|Romaine lettuce",
  "extras": [
   [
    "Tzatziki",
    60
   ],
   [
    "Feta cheese",
    20
   ]
  ],
  "season": "dried oregano, garlic, lemon, black pepper, salt, fresh dill or mint",
  "note": "Lean pork tenderloin marinated in lemon, garlic, and oregano like classic Greek souvlaki, served over lemony bulgur with cool tzatziki and a crunchy salad.",
  "method": "1. Cut the pork tenderloin into bite-size cubes. 2. In a bowl, toss the pork with olive oil, lemon juice, minced garlic, dried oregano, salt, and pepper. Let it sit for at least 10 minutes while you prep everything else. 3. Cook the bulgur according to the package, usually about 12 minutes, then fluff it and stir in a little lemon juice and chopped parsley. 4. Heat a grill pan or skillet over medium-high heat. Add the pork cubes and cook for about 6 to 8 minutes, turning, until browned on the outside and cooked through. 5. Chop the cucumber, tomato, and onion into a quick salad and season with salt and a splash of olive oil. 6. Spoon the lemon bulgur into a bowl, top with the pork, the chopped salad, and a sprinkle of feta. 7. Finish with a generous dollop of tzatziki and serve.",
  "oil": "Olive oil"
 },
 {
  "title": "Cuban Mojo Shrimp with Black Beans & Sweet Potato",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "protein": "Shrimp cooked|Tilapia cooked|Chicken breast cooked",
  "carb": "Sweet potato baked|Black beans cooked|Quinoa cooked",
  "fat": "Olive oil|Avocado raw",
  "produce": "Onion raw|Bell pepper red raw|Tomato raw|Romaine lettuce",
  "extras": [
   [
    "Salsa",
    30
   ]
  ],
  "season": "Optional: lots of garlic, ground cumin, dried oregano, and plenty of sour orange or lime juice (the mojo backbone), plus black pepper and a little cilantro to finish.",
  "note": "Bright Cuban-style mojo shrimp in a garlicky citrus marinade, served Latin-style with cumin black beans and roasted sweet potato instead of rice.",
  "method": "1. Peel and cube the sweet potato, toss with a little olive oil and salt, and roast at the oven's roasting heat for about 20 to 25 minutes until tender, turning once. 2. While it roasts, make the mojo by mixing olive oil, lots of minced garlic, orange juice, lime juice, cumin, and oregano in a bowl. Add the shrimp and let them marinate for about 10 minutes. 3. Heat a skillet over medium heat. Add the chopped onion and bell pepper and cook for 4 to 5 minutes until soft. 4. Stir in the cooked black beans with a pinch of cumin and a splash of water, and simmer for 5 minutes so they get saucy. 5. Heat a separate pan over medium-high heat and cook the shrimp for about 2 to 3 minutes per side until pink and just opaque. Do not overcook them. 6. Build the bowl with the black beans, roasted sweet potato, and mojo shrimp on top. 7. Finish with diced tomato, a squeeze of lime, and a few slices of avocado, then serve.",
  "oil": "Olive oil"
 },
 {
 "title": "Cajun Red Beans & Andouille-Style Chicken over Grain",
 "slot": "dinner",
 "diets": [
  "omnivore"
 ],
 "protein": "Chicken breast cooked|Chicken thigh cooked|Turkey ground 93/7 cooked",
 "carb": "Barley cooked|Quinoa cooked|Brown rice cooked",
 "fat": "Olive oil|Avocado oil",
 "produce": "Kidney beans cooked|Pinto beans cooked",
 "extras": [
  [
   "Hot sauce cayenne",
   10
  ],
  [
   "Chicken broth low-sodium",
   60
  ],
  [
   "Onion, raw",
   60
  ],
  [
   "Celery, raw",
   40
  ],
  [
   "Bell pepper, red, raw",
   50
  ]
 ],
 "season": "Optional: Cajun seasoning, smoked paprika, garlic, onion and celery (the holy trinity), thyme, a bay leaf, cayenne, and black pepper. A few dashes of hot sauce at the table.",
 "note": "Creamy Louisiana-style red beans simmered with smoky spiced chicken, the holy trinity of onion, celery and pepper, and a hit of cayenne, ladled over a chewy whole grain. High in fiber from kidney beans, lean and filling.",
 "method": "1. Heat 1 tsp olive oil in a pot over medium for about 1 minute. 2. Add diced onion, celery and red bell pepper and cook 5 minutes until soft. 3. Stir in minced garlic, smoked paprika, dried thyme, a pinch of cayenne and black pepper and cook 30 seconds. 4. Add the cooked kidney beans with a splash of low-sodium chicken broth, then gently mash about a third of the beans against the pot to make it creamy. 5. Simmer 10 minutes, stirring now and then, until thick. 6. Slice the cooked chicken, season it with the same Cajun spices, and stir it in to warm through for 2 minutes. 7. Spoon over the warm cooked grain and finish with a few dashes of hot sauce. Total time about 20 minutes.",
 "oil": "Olive oil"
},
 {
  "title": "Tuscan White Bean & Chicken Skillet with Wilted Spinach",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken thigh cooked",
  "carb": "White beans cooked|Navy beans cooked",
  "fat": "Olive oil",
  "produce": "Spinach raw|Spinach cooked|Tomato raw",
  "extras": [
   [
    "Parmesan cheese shredded",
    10
   ],
   [
    "Chicken broth low-sodium",
    60
   ]
  ],
  "season": "Optional: rosemary and sage (the Tuscan signatures), garlic, a bay leaf, red pepper flakes, salt, and black pepper, with a squeeze of lemon at the end. A parmesan rind simmered in adds depth if you eat dairy.",
  "note": "A rustic Italian one-pan skillet of creamy white beans, juicy garlic-rosemary chicken, blistered tomatoes and wilted spinach. The beans carry big fiber while keeping it light and savory.",
  "method": "1. Heat 1 tsp olive oil in a large skillet over medium for 1 minute. 2. Add minced garlic and a little chopped fresh rosemary and cook 30 seconds until fragrant. 3. Add halved tomatoes and cook 3 minutes until they start to burst. 4. Stir in the cooked white beans with a splash of low-sodium chicken broth and simmer 5 minutes, lightly mashing a few beans to thicken. 5. Add the sliced cooked chicken and warm through for 2 minutes. 6. Fold in the spinach a handful at a time and cook 1 to 2 minutes until just wilted. 7. Season with black pepper and a squeeze of lemon, then finish with grated parmesan. Total time about 15 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Caribbean Black Bean & Sweet Potato Bowl with Lime Slaw",
  "slot": "lunch",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "Black beans cooked|Pinto beans cooked",
  "carb": "Sweet potato baked|Brown rice cooked|Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "Cabbage raw|Bell pepper red raw|Tomato raw",
  "extras": [
   [
    "Salsa",
    30
   ]
  ],
  "season": "Optional: ground allspice, thyme, garlic, a little scotch bonnet or cayenne, ground cumin, and plenty of lime over the slaw. Fresh cilantro on top.",
  "note": "A bright plant-based bowl of warm-spiced black beans over a roasted sweet potato base, topped with a crunchy lime-cabbage slaw and creamy avocado. Loaded with fiber and naturally vegan.",
  "method": "1. Toss cubed sweet potato with 1 tsp olive oil, a pinch of cumin, allspice and black pepper, then roast at a hot oven for about 25 minutes until tender, flipping once. 2. While it roasts, warm the cooked black beans in a small pot with a splash of water, minced garlic, a pinch of cumin and thyme for 5 minutes, lightly mashing a few to thicken. 3. Make the slaw by tossing shredded cabbage and sliced red bell pepper with fresh lime juice and a pinch of salt, then let it sit 5 minutes to soften. 4. Pile the roasted sweet potato into the bowl as the base, then spoon the warm beans over the top. 5. Top with the lime slaw, diced tomato and sliced avocado. 6. Finish with a spoon of salsa. Total time about 30 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Moroccan Chickpea & Lentil Harira-Style Stew",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "Chickpeas cooked|Lentils cooked",
  "carb": "Bulgur cooked|Quinoa cooked|Whole wheat pasta cooked|Chickpea pasta cooked",
  "fat": "Olive oil",
  "produce": "Tomato raw|Carrots raw|Spinach raw",
  "extras": [
   [
    "Harissa paste",
    10
   ]
  ],
  "season": "Optional: ground cumin, coriander, turmeric, ginger, cinnamon, a pinch of saffron, and black pepper, finished with lots of fresh cilantro and parsley and a squeeze of lemon.",
  "note": "A warming North African stew of chickpeas and lentils in a fragrant tomato broth spiced with cumin, cinnamon, ginger and turmeric, finished with greens and a squeeze of lemon. Double-legume fiber and deeply satisfying.",
  "method": "1. Heat 1 tsp olive oil in a pot over medium for 1 minute. 2. Add diced onion and carrot and cook 5 minutes until softened. 3. Stir in minced garlic, ground cumin, ground ginger, turmeric and a small pinch of cinnamon and cook 30 seconds until fragrant. 4. Add chopped tomato and cook 3 minutes until it breaks down. 5. Pour in about 2 cups water, then add the cooked lentils and chickpeas and bring to a gentle simmer. 6. Simmer 12 to 15 minutes so the flavors meld, mashing a few chickpeas to thicken the broth. 7. Stir in the cooked bulgur and a handful of spinach and cook 2 minutes until wilted. 8. Finish with fresh lemon juice, chopped cilantro and black pepper. Total time about 30 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Smoky Turkey & Pinto Bean Sweet Potato Chili",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey ground 93/7 cooked|Beef ground 93/7 cooked|Chicken ground cooked",
  "carb": "Pinto beans cooked|Black beans cooked",
  "fat": "Avocado raw",
  "produce": "Sweet potato baked|Tomato raw|Bell pepper red raw",
  "extras": [
   [
    "Chipotle in adobo",
    15
   ],
   [
    "Salsa",
    30
   ]
  ],
  "season": "chili powder, ground cumin, smoked paprika, garlic, onion powder, oregano, salt",
  "note": "A thick, smoky chili of lean ground turkey, pinto and black beans, tender sweet potato and peppers in a cumin-chipotle tomato base. Bean-forward for fiber, hearty enough for a cold night.",
  "method": "1. Heat 1 tsp olive oil in a large pot over medium for 1 minute. 2. Add diced onion and red bell pepper and cook 4 minutes until softened. 3. Add the cooked ground turkey, breaking it up, and stir in chili powder, ground cumin, smoked paprika and a little minced chipotle, cooking 1 minute until fragrant. 4. Add diced tomato and a splash of low-sodium broth and bring to a simmer. 5. Stir in the cooked pinto beans, black beans and cubed sweet potato. 6. Cover and simmer 15 to 20 minutes, stirring occasionally, until the sweet potato is tender and the chili has thickened. 7. Season with black pepper and finish each bowl with diced avocado and a spoon of salsa. Total time about 30 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Buffalo Chicken Crunch Wrap",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken breast canned drained|Turkey breast roasted",
  "carb": "Mission Carb Balance tortilla whole wheat|Mission Carb Balance tortilla burrito|Whole wheat bread",
  "fat": "Greek yogurt ranch dressing|Mayonnaise light",
  "produce": "Romaine lettuce|Celery raw|Carrots raw",
  "extras": [
   [
    "Hot sauce cayenne",
    20
   ]
  ],
  "season": "Optional: garlic powder, onion powder, smoked paprika, and black pepper on the chicken, then toss it in buffalo-style hot sauce. A little dill or ranch-style seasoning in the dressing pulls it together.",
  "note": "Spicy shredded buffalo chicken with cool ranch, crisp romaine, and crunchy celery rolled in a high-fiber Carb Balance tortilla. Tastes like game-day food, built for fat loss.",
  "method": "1. Dice or shred about 4 oz cooked chicken breast and add it to a bowl. 2. Toss the chicken with hot sauce (Frank's-style) until coated, about 1 to 2 tablespoons. 3. Warm the Carb Balance tortilla in a dry pan for about 30 seconds per side until soft. 4. Spread the Greek yogurt ranch dressing down the center of the tortilla. 5. Pile on chopped romaine, thin-sliced celery, and shredded carrots. 6. Add the buffalo chicken on top of the veggies. 7. Fold in the sides, then roll the wrap up tightly from the bottom. 8. Slice in half on a diagonal and serve. Total time is about 10 minutes.",
  "oil": "Avocado oil"
 },
 {
  "title": "Dilly Tuna Crunch Salad on Whole-Grain Toast",
  "slot": "lunch",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "protein": "Tuna light canned in water|Salmon pink canned",
  "carb": "Whole wheat bread|Rye bread|Pita bread",
  "fat": "Mayonnaise light",
  "produce": "Celery raw|Onion raw|Cucumber raw",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    40
   ],
   [
    "Dijon mustard",
    8
   ],
   [
    "Pickles dill",
    25
   ]
  ],
  "season": "Optional: fresh or dried dill, lemon juice, black pepper, and a few capers. Salt lightly.",
  "note": "A classic deli tuna salad lightened up with Greek yogurt and light mayo, loaded with crunchy celery and dill pickle, piled on toasted whole-grain bread.",
  "method": "1. Drain the canned tuna well and flake it into a bowl with a fork. 2. Finely chop the celery, onion, and a dill pickle. 3. Stir the chopped veggies into the tuna. 4. Add the light mayo, a spoonful of nonfat Greek yogurt, and the Dijon mustard, then mix until creamy. 5. Season with black pepper and a pinch of salt to taste. 6. Toast the whole wheat bread until golden, about 2 to 3 minutes. 7. Pile the tuna salad onto the toast and top with thin cucumber slices. 8. Serve open-faced or as a closed sandwich. Total time is about 8 minutes.",
  "oil": "Avocado oil"
 },
 {
  "title": "Greek Chicken Tzatziki Pita with Crunchy Salad",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Turkey breast roasted|Pork tenderloin lean roasted",
  "carb": "Pita bread|Mission Carb Balance tortilla whole wheat|Whole wheat bread",
  "fat": "Feta cheese|Olives ripe",
  "produce": "Cucumber raw|Tomato raw|Romaine lettuce|Onion raw",
  "extras": [
   [
    "Tzatziki",
    45
   ]
  ],
  "season": "Optional: dried oregano, garlic, lemon, and black pepper on the chicken; fresh dill, garlic and lemon stirred into the tzatziki. A pinch of dried mint leans it more Greek.",
  "note": "Warm pita stuffed with sliced lemon-herb chicken, cool tzatziki, juicy tomato, crunchy cucumber, and a little feta. A gyro-style lunch that stays lean.",
  "method": "1. Slice about 4 oz cooked chicken breast into thin strips. 2. Dice the cucumber and tomato and thinly slice the onion. 3. Warm the pita in a dry pan for about 30 seconds per side until soft and pliable. 4. Spread tzatziki sauce inside the pita pocket or down the center. 5. Layer in chopped romaine, then the chicken strips. 6. Add the cucumber, tomato, and onion. 7. Crumble feta over the top. 8. Fold and serve right away while the pita is warm. Total time is about 10 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Curried Chickpea Salad Wrap",
  "slot": "lunch",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "protein": "Chickpeas cooked|Tofu firm|Edamame cooked",
  "carb": "Mission Carb Balance tortilla whole wheat|Whole wheat bread|Pita bread",
  "fat": "Tahini|Hummus",
  "produce": "Celery raw|Carrots raw|Onion raw|Spinach raw",
  "extras": [
   [
    "Tahini",
    20
   ],
   [
    "Dijon mustard",
    8
   ],
   [
    "Raisins",
    15
   ]
  ],
  "season": "Optional: curry powder and a pinch of garam masala, plus turmeric for color, lemon juice, a little grated ginger, and chopped cilantro. A few raisins or chopped apple add the classic coronation-curry sweet note.",
  "note": "Mashed chickpeas in a curry-spiced creamy tahini dressing with crunchy celery and carrot, wrapped in a high-fiber tortilla. A plant-based take on chicken salad.",
  "method": "1. Add the cooked chickpeas to a bowl and mash about half of them with a fork, leaving some whole for texture. 2. Finely chop the celery, carrot, and onion and stir them in. 3. Add the tahini, a spoonful of Dijon mustard, and a pinch of curry powder, salt, and pepper. 4. Mix until everything is creamy and well coated, adding a splash of water if too thick. 5. Warm the Carb Balance tortilla in a dry pan for about 30 seconds per side. 6. Lay a bed of fresh spinach down the center of the tortilla. 7. Spoon the curried chickpea salad over the spinach. 8. Fold in the sides and roll up tightly, then slice in half. Total time is about 12 minutes.",
  "oil": "Avocado oil"
 },
 {
  "title": "Cobb-Style Egg-White & Turkey Chopped Salad",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey breast roasted|Chicken breast cooked",
  "carb": "Chickpeas cooked|Black beans cooked|White beans cooked",
  "fat": "Avocado raw|Feta cheese",
  "produce": "Romaine lettuce|Tomato raw|Cucumber raw|Onion raw",
  "extras": [
   [
    "Egg white raw",
    100
   ],
   [
    "Greek yogurt ranch dressing",
    40
   ]
  ],
  "season": "Optional: black pepper, garlic powder, and a little smoked paprika on the turkey; a Dijon-style mustard and red wine vinegar dressing. Fresh chives and a squeeze of lemon over the avocado.",
  "note": "A big chopped cobb salad with diced turkey, scrambled egg whites, creamy avocado, tomato, and chickpeas for staying power. Tossed in a tangy yogurt-ranch dressing.",
  "method": "1. Cook the egg whites in a nonstick pan over medium heat until set, about 3 minutes, then chop them once cooled. 2. Dice the turkey breast, tomato, cucumber, and avocado into bite-size pieces. 3. Chop the romaine and add it to a large bowl as the base. 4. Arrange the turkey, egg whites, chickpeas, tomato, cucumber, and avocado over the lettuce in rows. 5. Sprinkle crumbled feta and thin-sliced onion over the top. 6. Drizzle with the Greek yogurt ranch dressing. 7. Toss everything together right before eating so the greens stay crisp. 8. Serve in a wide bowl. Total time is about 12 minutes.",
  "oil": "Olive oil"
 },
 {
  "title": "Sheet-Pan Italian Turkey Meatballs with Marinara & Roasted Zucchini",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey ground 93/7 cooked|Beef ground 93/7 cooked|Chicken ground cooked",
  "carb": "Potato baked flesh|Whole wheat pasta cooked|Quinoa cooked|Chickpea pasta cooked",
  "fat": "Olive oil|Parmesan cheese shredded",
  "produce": "Zucchini cooked|Bell pepper red raw|Onion raw",
  "prefProduce": "Zucchini cooked",
  "extras": [
   [
    "Marinara sauce",
    80
   ],
   [
    "Garlic raw",
    6
   ]
  ],
  "season": "Optional: garlic, dried oregano and basil, fennel seed (the classic Italian-sausage note), a pinch of red pepper flakes, salt, and black pepper. Fresh basil torn over the top after baking.",
  "note": "Cozy Italian comfort on one pan. Juicy turkey meatballs roast right alongside the veggies, then get a quick spoon of marinara so everything stays lean but tastes like a Sunday dinner.",
  "method": "1. Heat oven to 425 F and line a sheet pan with parchment, about 5 minutes of prep. 2. In a bowl, mix the ground turkey with a little grated Parmesan, minced garlic, salt, pepper, and dried Italian herbs. Roll into 1-inch meatballs. 3. Slice the zucchini, red bell pepper, and onion into chunks. Toss them with the olive oil and a pinch of salt. 4. Spread the meatballs on one side of the pan and the veggies on the other. 5. Roast for about 18 to 20 minutes, flipping the meatballs once halfway, until the meatballs are cooked through and the veggies are tender and lightly browned. 6. Warm the marinara and spoon it over the meatballs. Serve over your cooked potato, pasta, or quinoa.",
  "oil": "Olive oil"
 },
 {
  "title": "Sheet-Pan BBQ Chicken with Roasted Sweet Potato & Broccoli",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken thigh cooked|Pork tenderloin lean roasted",
  "carb": "Sweet potato baked|Potato baked flesh|Quinoa cooked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Broccoli cooked|Bell pepper red raw|Onion raw",
  "prefProduce": "Broccoli cooked",
  "extras": [
   [
    "BBQ sauce",
    35
   ]
  ],
  "season": "Optional: smoked paprika, garlic powder, onion powder, chili powder, and black pepper as a dry rub, then brush with BBQ sauce in the last few minutes. A pinch of cayenne for heat.",
  "note": "Smoky BBQ chicken, caramelized sweet potato, and charred broccoli all off one pan. The sauce goes on at the end so it glazes without burning, keeping it lean and weeknight-easy.",
  "method": "1. Heat oven to 425 F and line a sheet pan, about 5 minutes. 2. Cut the sweet potato into 3/4-inch cubes and the broccoli into florets. Toss both with the olive oil, salt, and pepper. 3. Pat the chicken dry and season with smoked paprika, garlic powder, salt, and pepper. 4. Spread the chicken and veggies on the pan in a single layer. 5. Roast for about 20 to 25 minutes, tossing the veggies once, until the sweet potato is tender and the chicken is cooked through. 6. In the last 5 minutes, brush the BBQ sauce over the chicken and return to the oven so it gets sticky and glazed. Serve hot.",
  "oil": "Olive oil",
  "simple": true
 },
 {
 "title": "Cheesy Beef-Stuffed Bell Peppers with Cauliflower Rice",
 "slot": "dinner",
 "diets": [
  "omnivore"
 ],
 "protein": "Beef ground 93/7 cooked|Turkey ground 93/7 cooked|Chicken ground cooked",
 "carb": "Quinoa cooked|Brown rice cooked|Riced cauliflower cooked",
 "fat": "Cheese reduced-fat cheddar|Olive oil",
 "produce": "Bell pepper red raw",
 "prefProduce": "Bell pepper red raw",
 "extras": [
  [
   "Salsa",
   40
  ]
 ],
 "season": "Optional: garlic powder, onion powder, dried oregano, smoked paprika, salt, and black pepper in the beef. A pinch of red pepper flakes and fresh parsley over the melted cheese.",
 "note": "Classic stuffed peppers made lean with 93/7 beef and quinoa. A little melted reduced-fat cheddar on top makes them feel like comfort food without wrecking the macros.",
 "method": "1. Heat oven to 400 F, about 5 minutes. 2. Slice the tops off the bell peppers and scrape out the seeds. Stand them upright in a baking dish. 3. In a skillet over medium heat, warm the olive oil and cook the diced onion for 3 to 4 minutes, then add the ground beef and brown it for about 6 minutes. 4. Stir in the cooked grain, the salsa, salt, pepper, and a little chili powder and cumin. 5. Spoon the filling into the peppers and top each with shredded reduced-fat cheddar. 6. Cover with foil and bake about 25 minutes, then uncover for 5 more minutes until the peppers are tender and the cheese is melted. Serve with cauliflower rice on the side.",
 "oil": "Olive oil"
},
 {
  "title": "Lean Shepherd's-Style Turkey Skillet with Mashed Potato Topping",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey ground 93/7 cooked|Beef ground 93/7 cooked|Lamb ground cooked",
  "carb": "Potato baked flesh|Sweet potato baked|Cauliflower cooked",
  "fat": "Butter salted|Olive oil",
  "produce": "Carrots raw|Green peas cooked|Onion raw",
  "prefProduce": "Carrots raw",
  "extras": [
   [
    "Marinara sauce",
    40
   ],
   [
    "Butter salted",
    7
   ]
  ],
  "season": "Optional: thyme, rosemary, a bay leaf, garlic, onion, a splash of gluten-free Worcestershire or tamari for savory depth, salt, and black pepper. A little tomato paste deepens the gravy.",
  "note": "A lightened-up shepherd's pie. Savory turkey and veggies under a fluffy mashed potato top, baked until golden. Pure comfort food that still fits a fat-loss plan.",
  "method": "1. Heat oven to 400 F, about 5 minutes. 2. Mash the cooked potato with a small pat of salted butter, a splash of milk, salt, and pepper until smooth. Set aside. 3. In an oven-safe skillet, warm the olive oil over medium heat and cook the diced onion and carrots for about 5 minutes until softened. 4. Add the ground turkey and brown for about 6 to 7 minutes, then stir in the green peas, a spoon of marinara, Worcestershire or tamari (gluten-free soy sauce), salt, and pepper. 5. Spread the mashed potato evenly over the meat mixture. 6. Bake for about 20 minutes until heated through and the top is lightly golden. Let it rest 5 minutes before serving.",
  "oil": "Olive oil"
 },
 {
  "title": "Lean Cheeseburger Bowl with Roasted Potato Wedges",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef ground 93/7 cooked|Turkey ground 93/7 cooked|Bison ground cooked",
  "carb": "Potato baked flesh|Sweet potato baked|Quinoa cooked",
  "fat": "Cheese reduced-fat cheddar|Olive oil",
  "produce": "Iceberg lettuce raw|Tomato raw|Onion raw",
  "prefProduce": "Tomato raw",
  "extras": [
   [
    "Mayonnaise light",
    15
   ],
   [
    "Ketchup",
    15
   ],
   [
    "Yellow mustard",
    8
   ],
   [
    "Pickles dill",
    20
   ]
  ],
  "season": "garlic powder, onion powder, smoked paprika, black pepper, salt, a little mustard and chopped pickle",
  "note": "All the flavor of a cheeseburger in a bowl with crispy roasted potato wedges. Seasoned lean beef, melty cheddar, crunchy lettuce and tomato, finished with a quick burger sauce.",
  "method": "1. Heat oven to 425 F and line a sheet pan, about 5 minutes. 2. Cut the potato into wedges, toss with the olive oil, salt, pepper, and a little paprika, and spread on the pan. Roast about 25 minutes, flipping once, until crisp and golden. 3. While the wedges roast, cook the ground beef in a skillet over medium-high heat for about 6 to 7 minutes, seasoning with salt, pepper, garlic powder, and onion powder. 4. Make a quick sauce by stirring together the light mayo, ketchup, mustard, and chopped dill pickle. 5. Build each bowl with the shredded lettuce, diced tomato and onion, seasoned beef, and a sprinkle of reduced-fat cheddar. 6. Add the potato wedges on the side and drizzle the burger sauce over the top. Serve right away.",
  "oil": "Olive oil"
 },
 {
  "title": "Denver Egg-White Scramble with Crispy Potatoes",
  "slot": "breakfast",
  "diets": [
   "omnivore"
  ],
  "protein": "Egg white raw|Egg whole cooked",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Cheese reduced-fat cheddar|Cheddar cheese",
  "produce": "Bell pepper red raw|Onion raw",
  "prefProduce": "Bell pepper red raw",
  "cuisine": "American",
  "extras": [
   [
    "Ham extra lean",
    40
   ],
   [
    "Hot sauce cayenne",
    10
   ]
  ],
  "season": "black pepper, garlic powder, smoked paprika, salt, fresh chives or scallion",
  "note": "A diner-style Denver scramble built on egg whites with diced ham, peppers and onion for big protein and low fat. Crispy potato cubes round it out.",
  "method": "1. Dice 1 small potato into small cubes. Heat 1 tsp avocado oil in a nonstick pan over medium-high heat and add the potatoes. Cook about 10 to 12 minutes, stirring now and then, until golden and tender.\n2. Push the potatoes to one side. Add the diced red bell pepper and onion to the open space and cook about 3 minutes until soft.\n3. Add the chopped extra-lean ham and warm it for 1 minute.\n4. Pour in the egg whites. Stir gently and cook about 2 to 3 minutes until just set.\n5. Sprinkle the reduced-fat cheddar on top, let it melt for 1 minute, then plate. Add a little hot sauce if you like.",
  "oil": "Avocado oil or olive oil"
 },
 {
  "title": "Smoky Sweet Potato & Turkey Breakfast Hash",
  "slot": "breakfast",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey ground 93/7 cooked|Chicken ground cooked",
  "carb": "Sweet potato baked|Potato baked flesh",
  "fat": "Egg whole cooked|Cheese reduced-fat cheddar",
  "produce": "Bell pepper red raw|Onion raw|Spinach raw|Kale cooked",
  "prefProduce": "Bell pepper red raw",
  "cuisine": "American",
  "extras": [
   [
    "Salsa",
    40
   ]
  ],
  "season": "Optional: smoked paprika (the smoky backbone), cumin, garlic powder, onion powder, salt, and black pepper, with a dash of hot sauce at the end. Fresh chives or scallion on top.",
  "note": "A hearty one-pan hash with lean ground turkey, smoky paprika sweet potato and peppers, finished with a whole egg on top for richness without much added fat.",
  "method": "1. Peel and dice 1 sweet potato into small cubes. Heat 1 tsp olive oil in a large nonstick pan over medium-high heat, add the sweet potato, and cook about 8 to 10 minutes until it starts to soften and brown.\n2. Add the diced onion and red bell pepper and cook 3 minutes until soft.\n3. Push the veggies aside and add the lean ground turkey. Break it up and cook about 5 to 6 minutes until browned and cooked through. Season with smoked paprika, garlic, salt and pepper.\n4. Stir in a handful of raw spinach and let it wilt for 1 minute.\n5. Make a small well, crack in one egg, cover the pan, and cook about 3 minutes until the white is set. Serve hot.",
  "oil": "Olive oil or avocado oil"
 },
 {
  "title": "Green Chile Egg-White & Black Bean Breakfast Burrito",
  "slot": "breakfast",
  "diets": [
   "omnivore"
  ],
  "protein": "Egg white raw|Egg whole cooked",
  "carb": "Mission Carb Balance tortilla burrito|Mission Carb Balance tortilla whole wheat",
  "fat": "Cheese reduced-fat cheddar|Cheddar cheese",
  "produce": "Bell pepper red raw|Onion raw|Spinach raw",
  "prefProduce": "Bell pepper red raw",
  "cuisine": "Mexican",
  "extras": [
   [
    "Black beans cooked",
    40
   ],
   [
    "Salsa verde",
    30
   ]
  ],
  "season": "ground cumin, garlic powder, smoked paprika, green chile, salt, fresh cilantro",
  "note": "A high-fiber Carb Balance tortilla wrapped around fluffy egg whites, black beans and melty cheese with tangy salsa verde. Big protein, easy grab-and-go.",
  "method": "1. Warm the black beans in a small pan or microwave for about 1 minute. Mash lightly and set aside.\n2. Heat 1 tsp avocado oil in a nonstick pan over medium heat. Add the diced bell pepper and onion and cook about 3 minutes until soft.\n3. Pour in the egg whites and scramble gently for 2 to 3 minutes until just set. Stir in a handful of spinach to wilt.\n4. Warm the Carb Balance tortilla in a dry pan for about 20 seconds per side so it folds easily.\n5. Lay the beans, egg whites and reduced-fat cheddar down the middle of the tortilla, spoon on salsa verde, then fold in the sides and roll up tightly. Toast the seam-side down for 1 minute to seal.",
  "oil": "Avocado oil or olive oil"
 },
 {
  "title": "Mediterranean Cottage Cheese Breakfast Bowl",
  "slot": "breakfast",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "protein": "Cottage cheese nonfat|Cottage cheese 2% lowfat",
  "carb": "Whole wheat bread|Pita bread",
  "fat": "Olives ripe|Feta cheese",
  "produce": "Tomato raw|Cucumber raw|Bell pepper red raw",
  "prefProduce": "Cucumber raw",
  "cuisine": "Mediterranean",
  "extras": [
   [
    "Olives ripe",
    15
   ],
   [
    "Feta cheese",
    15
   ]
  ],
  "season": "black pepper, dried oregano, lemon, fresh dill, a drizzle of olive oil",
  "note": "A savory protein-packed cottage cheese bowl in the style of a Greek salad, topped with cucumber, tomato, olives and a little feta, with toasted whole-wheat bread to scoop.",
  "method": "1. Spoon the cottage cheese into a shallow bowl and spread it out.\n2. Dice the cucumber, tomato and red bell pepper into small pieces and scatter them over the top.\n3. Add a few sliced ripe olives and a small crumble of feta.\n4. Drizzle with 1 tsp olive oil and season with oregano, black pepper and a pinch of salt.\n5. Toast a slice of whole-wheat bread for about 2 minutes, cut into strips, and serve alongside for scooping.",
  "oil": "Olive oil"
 },
 {
 "title": "Garden Veggie Egg-White Frittata Cups",
 "slot": "breakfast",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "protein": "Egg white raw|Egg whole cooked",
 "carb": "Potato baked flesh|Whole wheat bread",
 "fat": "Cheese reduced-fat cheddar|Feta cheese",
 "produce": "Spinach raw|Bell pepper red raw|Onion raw",
 "prefProduce": "Spinach raw",
 "cuisine": "American",
 "extras": [
  [
   "Salsa",
   30
  ]
 ],
 "season": "black pepper, garlic powder, dried Italian herbs, salt, fresh chives",
 "note": "Make-ahead baked egg-white frittata cups loaded with spinach and peppers. High protein, low fat, and perfect for meal prep through the week.",
 "method": "1. Heat the oven to 375 F and lightly brush a muffin tin with 1 tsp olive oil.\n2. Finely dice your vegetables. Chop the spinach.\n3. In a bowl, whisk the egg whites with a pinch of salt, pepper and garlic powder, then stir in all the vegetables and the shredded reduced-fat cheddar.\n4. Pour the mixture evenly into the muffin cups, filling each about three-quarters full.\n5. Bake about 18 to 20 minutes until the centers are set and the tops are lightly golden. Let cool 5 minutes, then lift out. Serve with toast or a baked potato on the side.",
 "oil": "Olive oil or avocado oil"
},
 {
  "title": "Classic Three-Bean Picnic Salad with Turkey",
  "slot": "lunch",
  "diets": [
   "omnivore"
  ],
  "protein": "Kidney beans cooked|Chickpeas cooked",
  "carb": "Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Green peas cooked|Celery raw",
  "extras": [
   [
    "Kidney beans cooked",
    90
   ],
   [
    "Chickpeas cooked",
    80
   ],
   [
    "Quinoa cooked",
    80
   ],
   [
    "Green peas cooked",
    60
   ],
   [
    "Turkey breast roasted",
    70
   ],
   [
    "Celery raw",
    40
   ],
   [
    "Onion raw",
    20
   ],
   [
    "Olive oil",
    8
   ],
   [
    "Honey",
    6
   ]
  ],
  "season": "red wine vinegar, Dijon, garlic, black pepper, salt, fresh parsley",
  "note": "American deli classic with a sweet-tangy apple cider marinade the beans soak up overnight. Soft kidney beans and chickpeas against snappy green peas and crunchy celery, with diced turkey breast for a protein bump. Make 4+ hours ahead so every bite is punchy.",
  "method": "1. Drain and rinse the kidney beans and chickpeas, then pat dry (about 2 min). 2. In a big bowl whisk the olive oil, apple cider vinegar, a little honey, salt and pepper into a quick marinade (about 2 min). 3. Add the kidney beans, chickpeas, cooked green peas, diced celery, diced red onion and chopped turkey breast to the bowl (about 3 min). 4. Toss everything until the beans are coated, then fold in the cooked quinoa (about 1 min). 5. Cover and chill at least 4 hours, ideally overnight, so the beans drink up the dressing. 6. Stir again, scatter chopped parsley on top and serve cold.",
  "oil": "Olive oil"
 },
 {
  "title": "Cilantro-Lime Black Bean & Corn Salad with Shrimp",
  "slot": "dinner",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "protein": "Black beans cooked",
  "carb": "Quinoa cooked",
  "fat": "Avocado raw",
  "produce": "Sweet corn cooked|Bell pepper red raw",
  "extras": [
   [
    "Black beans cooked",
    40
   ],
   [
    "Quinoa cooked",
    80
   ],
   [
    "Shrimp cooked",
    90
   ],
   [
    "Sweet corn cooked",
    70
   ],
   [
    "Bell pepper red raw",
    40
   ],
   [
    "Avocado raw",
    40
   ],
   [
    "Onion raw",
    20
   ],
   [
    "Olive oil",
    7
   ]
  ],
  "season": "lime, ground cumin, garlic, fresh cilantro, a pinch of chili, salt",
  "note": "Sweet pops of corn against earthy black beans, lifted by a cumin-lime dressing. Cooked shrimp turns it into a taco-bowl dinner and avocado added last makes it feel rich. Cumin and lime are the flavor engine here.",
  "method": "1. Drain and rinse the black beans and pat them dry (about 2 min). 2. In a bowl whisk fresh lime juice, olive oil, ground cumin, chili powder, a touch of honey and salt (about 2 min). 3. Add the black beans, cooked sweet corn, diced red bell pepper, red onion and minced jalapeno (about 3 min). 4. Fold in the cooked quinoa and the cooked shrimp, then toss to coat (about 2 min). 5. Dice the avocado and gently fold it in right before serving so it stays green (about 1 min). 6. Top with chopped cilantro and serve cold.",
  "oil": "Olive oil"
 },
 {
  "title": "Cowboy Caviar Bowl with Ground Turkey",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Black beans cooked|Black-eyed peas cooked",
  "carb": "Sweet potato baked",
  "fat": "Avocado raw",
  "produce": "Bell pepper red raw|Sweet corn cooked",
  "extras": [
   [
    "Black beans cooked",
    40
   ],
   [
    "Black-eyed peas cooked",
    80
   ],
   [
    "Turkey ground 93/7 cooked",
    80
   ],
   [
    "Sweet potato baked",
    90
   ],
   [
    "Sweet corn cooked",
    60
   ],
   [
    "Bell pepper red raw",
    40
   ],
   [
    "Avocado raw",
    35
   ],
   [
    "Onion raw",
    20
   ],
   [
    "Olive oil",
    7
   ]
  ],
  "season": "lime, ground cumin, garlic, fresh cilantro, a little hot sauce, salt",
  "note": "The original dense bean salad: black beans plus black-eyed peas, corn and tons of crunchy diced veg in a tangy lime vinaigrette. The black-eyed peas add a nutty Southern edge. Lean ground turkey and roasted sweet potato make it a loaded bowl that gets better as it sits.",
  "method": "1. Brown the ground turkey in a pan with a little cumin and salt until cooked through, then let it cool (about 8 min). 2. Drain and rinse the black beans and black-eyed peas (about 2 min). 3. In a big bowl whisk olive oil, lime juice, red wine vinegar, honey, minced garlic and cumin (about 2 min). 4. Add the beans, black-eyed peas, sweet corn, diced bell pepper, red onion and jalapeno, then toss (about 3 min). 5. Fold in the cubed baked sweet potato and the cooled turkey (about 2 min). 6. Chill at least 2 hours, then fold in diced avocado and chopped cilantro and serve.",
  "oil": "Olive oil"
 },
 {
  "title": "Balela Chickpea & Black Bean Salad with Sumac",
  "slot": "lunch",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore"
  ],
  "protein": "Chickpeas cooked|Black beans cooked",
  "carb": "Bulgur cooked",
  "fat": "Olive oil",
  "produce": "Tomato raw|Onion raw",
  "extras": [
   [
    "Chickpeas cooked",
    110
   ],
   [
    "Black beans cooked",
    40
   ],
   [
    "Bulgur cooked",
    90
   ],
   [
    "Tomato raw",
    70
   ],
   [
    "Onion raw",
    25
   ],
   [
    "Olive oil",
    9
   ]
  ],
  "season": "sumac, lemon, garlic, ground cumin, fresh parsley and mint, olive oil, salt",
  "note": "A lemony, sumac-spiked Trader Joe's-style marinated salad. The beans soak in garlicky lemon dressing while you chop, and heavy parsley and mint make it taste alive. Sumac adds a tart citrusy funk and the flavor only improves over a few days.",
  "method": "1. Drain and rinse the chickpeas and black beans, then pat dry (about 2 min). 2. In a bowl whisk olive oil, fresh lemon juice, minced garlic, sumac, salt and a pinch of red pepper (about 2 min). 3. Add the chickpeas and black beans and let them marinate while you chop (about 10 min). 4. Dice the tomato and red onion and chop a big handful of parsley and mint (about 4 min). 5. Fold the tomato, onion, herbs and cooked bulgur into the beans (about 2 min). 6. Serve right away or chill an hour for deeper flavor.",
  "oil": "Olive oil"
 },
 {
  "title": "Tonno e Fagioli, Tuscan White Bean & Tuna Salad",
  "slot": "lunch",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "protein": "White beans cooked|Tuna light canned in water",
  "carb": "Whole wheat bread",
  "fat": "Olive oil",
  "produce": "Onion raw|Tomato raw",
  "extras": [
   [
    "White beans cooked",
    120
   ],
   [
    "Tuna light canned in water",
    80
   ],
   [
    "Whole wheat bread",
    40
   ],
   [
    "Onion raw",
    25
   ],
   [
    "Tomato raw",
    50
   ],
   [
    "Olive oil",
    9
   ]
  ],
  "season": "lemon, garlic, red wine vinegar, fresh parsley, black pepper, olive oil, salt",
  "note": "A minimalist Italian antipasto classic and one of the highest-protein cold bean salads here. Creamy cannellini-style white beans, flaky light tuna, sharp raw red onion, lemon and good olive oil. The tuna seasons the beans as it sits. Served with crusty whole-grain bread.",
  "method": "1. Drain and rinse the white beans, then add them to a bowl (about 2 min). 2. Thinly slice the red onion and soak the slices in cold water for a few minutes to mellow the bite, then drain (about 4 min). 3. Drain the canned tuna and flake it over the beans (about 1 min). 4. Add the onion, halved cherry tomatoes and chopped parsley, then dress with olive oil, lemon juice, salt and pepper (about 2 min). 5. Toss gently so the beans stay whole and let it sit 10 minutes for the flavors to settle (about 10 min). 6. Serve with toasted whole wheat bread on the side.",
  "oil": "Olive oil"
 },
 {
  "title": "Brothy Tuscan White Beans with Greens over Bulgur",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "White beans cooked",
  "carb": "Bulgur cooked",
  "fat": "Olive oil",
  "produce": "Kale cooked",
  "extras": [
   [
    "Onion raw",
    60
   ],
   [
    "Garlic raw",
    9
   ],
   [
    "Miso paste",
    15
   ]
  ],
  "season": "Optional: rosemary, sage, garlic, a bay leaf, red pepper flakes, salt, and black pepper, with a squeeze of lemon or splash of red wine vinegar at the end. A parmesan rind in the broth if you eat dairy.",
  "note": "One-pot brothy beans where the beans are the dish, not a side. White beans are the leanest high-protein white bean in the DB, so a big garlicky-herb bowl stays filling and low-fat with macro room to spare. Wilted kale adds volume and micronutrients for almost no calories. Spoon over bulgur to soak up the savory broth.",
  "method": "1. Warm the olive oil in a pot over medium heat, then add chopped onion and cook about 4 minutes until soft. 2. Stir in minced garlic, chopped rosemary, and thyme and cook about 1 minute until fragrant. 3. Add the cooked white beans plus water and a spoonful of certified gluten-free miso paste stirred in, then simmer about 10 minutes so the broth turns savory and slightly thickened. 4. Lightly mash about a quarter of the beans against the side of the pot to make it creamy, then stir in the cooked kale and warm 2 minutes. 5. Ladle the brothy beans and greens over warm bulgur and serve.",
  "oil": "Olive oil"
 },
 {
  "title": "Gigantes Plaki, Greek Baked Butter Beans in Tomato",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "protein": "Lima beans cooked",
  "carb": "Pita bread",
  "fat": "Olive oil",
  "produce": "Tomato raw",
  "extras": [
   [
    "Onion raw",
    70
   ],
   [
    "Carrots raw",
    50
   ],
   [
    "Garlic raw",
    9
   ],
   [
    "Feta cheese",
    30
   ]
  ],
  "season": "Optional: dried oregano, garlic, a bay leaf, a pinch of cinnamon (classic in Greek tomato sauces), dried dill, salt, and black pepper. Fresh parsley and a squeeze of lemon to finish.",
  "note": "A classic Greek ladera main where big creamy lima beans bake low and slow in a sweet-savory tomato sauce with onion, carrot, and herbs until almost custardy. Lima beans are the closest DB match to traditional gigantes. A modest crumble of feta turns it into a higher-protein plate while keeping it authentic and lean. Warm pita scoops up the sauce.",
  "method": "1. Heat the olive oil in an oven-safe pan over medium heat and cook chopped onion and grated carrot about 6 minutes until soft. 2. Add minced garlic and cook about 1 minute, then stir in the chopped fresh tomato and let it break down about 5 minutes into a sauce. 3. Fold in the cooked lima beans, parsley, dill, and oregano with a splash of water, then season. 4. Move the pan to the oven and bake about 35 minutes until the sauce is jammy and the beans are tender, stirring once halfway. 5. Crumble feta over the top, rest 5 minutes, and serve with warm pita. The app adds the oven temperature.",
  "oil": "Olive oil"
 },
 {
  "title": "Ful Medames, Egyptian Stewed Chickpeas with Egg",
  "slot": "breakfast",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "protein": "Chickpeas cooked",
  "carb": "Pita bread",
  "fat": "Olive oil",
  "produce": "Tomato raw",
  "extras": [
   [
    "Onion raw",
    40
   ],
   [
    "Garlic raw",
    9
   ],
   [
    "Egg whole cooked",
    50
   ]
  ],
  "season": "Salt, ground cumin (essential to ful), garlic, lemon juice, and a pinch of chili, finished with chopped parsley and a drizzle of olive oil. Some people add a little tahini stirred in.",
  "note": "Warm beans simmered then partly mashed so the dish is half-creamy and half-whole, brightened with cumin and garlic. This protein-and-fiber-dense bowl is gut-filling and cheap. The classic topping of chopped tomato, onion, and parsley adds freshness, and a sliced hard-boiled egg makes it a complete high-protein breakfast scooped up with pita.",
  "method": "1. Warm the olive oil in a pan over medium heat, add minced garlic and ground cumin, and cook about 1 minute until fragrant. 2. Add the cooked chickpeas with a splash of water and simmer about 5 minutes. 3. Mash about half the chickpeas with a fork so the dish is part creamy and part whole, then season to taste. 4. Top with the chopped tomato, onion, and parsley and lay the sliced cooked egg over the top. 5. Serve warm with pita for scooping.",
  "oil": "Olive oil"
 },
 {
 "title": "Rajma, Punjabi Kidney Bean Curry over Quinoa",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "protein": "Kidney beans cooked",
 "carb": "Quinoa cooked",
 "fat": "Olive oil",
 "produce": "Tomato raw",
 "extras": [
  [
   "Onion raw",
   80
  ],
  [
   "Garlic raw",
   9
  ],
  [
   "Tomato raw",
   100
  ],
  [
   "Cinnamon ground",
   1
  ]
 ],
 "season": "Optional: garam masala, ground cumin, coriander, turmeric, a pinch of amchur, fresh ginger and garlic, and a bay leaf. Finish with chopped cilantro and a squeeze of lemon. Salt to taste at the end, and a squeeze of lemon to brighten the beans.",
 "note": "Kidney beans simmered until soft in a deeply spiced onion-tomato-ginger-garlic gravy. Bean-forward by design and far more flavor-dense than plain dal, with the richness coming from spice rather than fat since kidney beans are very lean. Served over quinoa instead of the usual rice, it stays high-satiety and high-fiber as a beloved complete meal.",
 "method": "1. Heat the olive oil in a pot over medium heat and cook chopped onion about 6 minutes until golden. 2. Stir in minced garlic and grated ginger about 1 minute, then add cumin, ground coriander, garam masala, and a pinch of Kashmiri chili and toast 30 seconds. 3. Add the chopped tomato and cook about 6 minutes until it breaks into a thick masala. 4. Add the cooked kidney beans with a cup of water, then simmer about 15 minutes, mashing a few beans to thicken the gravy. 5. Spoon over warm quinoa and serve.",
 "oil": "Olive oil"
},
 {
 "title": "High-Protein Lentil Bolognese over Whole-Wheat Pasta",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "protein": "Lentils cooked",
 "carb": "Whole wheat pasta cooked|Chickpea pasta cooked",
 "fat": "Olive oil",
 "produce": "Zucchini cooked",
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Carrots raw",
   40
  ],
  [
   "Garlic raw",
   9
  ],
  [
   "Marinara sauce",
   120
  ],
  [
   "Celery, raw",
   40
  ]
 ],
 "season": "Optional: garlic, onion, dried oregano and basil, a bay leaf, a pinch of nutmeg, red pepper flakes, salt, and black pepper. A splash of red wine or balsamic deepens it; fresh basil over the top.",
 "note": "Lentils replace ground meat in a slow-simmered tomato-soffritto sauce, with zucchini and tomato paste giving the savory umami depth that reads as meaty. Lentils are one of the leanest, highest-fiber legumes in the DB, so a generous serving over whole-wheat pasta stays low-fat and high-fiber while eating hearty and rich.",
 "method": "1. Warm the olive oil in a pan over medium heat and cook finely chopped onion, carrot, and celery about 7 minutes until soft. 2. Add minced garlic and the cooked zucchini and cook about 4 minutes until the zucchini release and reabsorb their liquid. 3. Stir in tomato paste and oregano and cook about 2 minutes to deepen the flavor. 4. Add the marinara and cooked lentils with a splash of water, then simmer about 12 minutes until thick, finishing with a teaspoon of red wine vinegar. 5. Toss with the whole-wheat pasta and serve.",
 "oil": "Olive oil"
},
 {
  "title": "Doenjang Soybean & Tofu Stew with Sweet Potato",
  "slot": "dinner",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "Soybeans cooked",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Zucchini cooked",
  "extras": [
   [
    "Miso paste",
    30
   ],
   [
    "Tofu firm",
    100
   ],
   [
    "Onion raw",
    50
   ]
  ],
  "season": "Optional: doenjang (fermented soybean paste, the star), garlic, a little gluten-free gochugaru or gochujang for heat, ginger, and sliced scallion. A few drops of toasted sesame oil off the heat.",
  "note": "Soybeans show up twice, as whole cooked soybeans for chew and as the fermented soybean paste that gives the broth its deep umami, plus tofu for silkiness. Soybeans are by far the highest-protein legume in the DB, making this the most protein-dense fully-plant dish here. The brothy, spicy, savory base is intensely satisfying for the calories, with zucchini and zucchini adding volume and baked sweet potato rounding it out.",
  "method": "1. Heat the olive oil in a pot over medium heat and cook chopped onion and minced garlic about 3 minutes. 2. Whisk the certified gluten-free miso paste into about three cups of water until smooth, then pour into the pot and bring to a gentle simmer. 3. Add the cooked soybeans, cooked zucchini, and cooked zucchini and simmer about 8 minutes. 4. Add the cubed firm tofu and a pinch of gochugaru, then simmer 4 more minutes until everything is hot and the broth tastes deep and savory. 5. Top with sliced green onion and serve with the baked sweet potato on the side.",
  "oil": "Olive oil"
 },
 {
  "title": "Tuscan Tuna & White Bean Salad with Bulgur",
  "slot": "lunch",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "protein": "Tuna light canned in water|White beans cooked",
  "carb": "Bulgur cooked",
  "fat": "Olive oil",
  "produce": "Tomato raw|Onion raw|Arugula raw",
  "extras": [
   [
    "White beans cooked",
    150
   ],
   [
    "Tomato raw",
    80
   ],
   [
    "Onion raw",
    30
   ],
   [
    "Arugula raw",
    25
   ]
  ],
  "season": "lemon, garlic, red onion, fresh parsley, black pepper, olive oil, salt",
  "note": "The classic Tuscan tonno e fagioli given a fat-loss makeover: flaked tuna and silky white beans tossed with tomato and red onion, dressed in lemon and good olive oil, served over nutty bulgur instead of bread.",
  "method": "1. Cook 1 cup bulgur in water until tender, about 12 minutes, then drain and cool slightly. 2. Drain the canned tuna and flake it into a bowl with the cooked white beans. 3. Add diced tomato, thinly sliced red onion and a handful of arugula. 4. Whisk the olive oil with fresh lemon juice, minced garlic, salt and pepper, then pour over the salad and toss gently so the beans stay whole. 5. Spoon the tuna and bean salad over the warm bulgur and finish with a little more lemon.",
  "oil": "Olive oil"
 },
 {
  "title": "Lowcountry Shrimp & Lima Bean Succotash with Sweet Potato",
  "slot": "dinner",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "protein": "Shrimp cooked|Lima beans cooked",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Sweet corn cooked|Tomato raw|Onion raw",
  "extras": [
   [
    "Lima beans cooked",
    150
   ],
   [
    "Sweet corn cooked",
    80
   ],
   [
    "Tomato raw",
    70
   ],
   [
    "Onion raw",
    40
   ]
  ],
  "season": "smoked paprika, garlic, thyme, black pepper, a little cayenne, salt, fresh basil",
  "note": "A leaned-up Lowcountry succotash: buttery lima beans simmered with sweet corn and tomato, topped with quick-seared shrimp and served alongside a baked sweet potato. Smoked paprika stands in for the salt pork.",
  "method": "1. Bake a sweet potato until tender, about 45 minutes, or microwave 8 to 10 minutes. 2. Heat half the olive oil in a skillet and cook the shrimp until just pink, about 3 minutes, then set aside. 3. In the same pan add the rest of the oil and soften chopped onion for 4 minutes, then stir in smoked paprika and a little thyme. 4. Add the cooked lima beans, sweet corn and diced tomato with a splash of water and simmer 6 minutes until saucy. 5. Return the shrimp to the pan to warm, then serve the succotash next to the split baked sweet potato with a squeeze of lemon.",
  "oil": "Olive oil"
 },
 {
  "title": "Smoky Turkey & Navy Bean Skillet over Whole-Wheat Toast",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey breast roasted|Navy beans cooked",
  "carb": "Whole wheat bread",
  "fat": "Olive oil",
  "produce": "Onion raw|Carrots raw|Tomato raw",
  "extras": [
   [
    "Navy beans cooked",
    150
   ],
   [
    "Onion raw",
    50
   ],
   [
    "Carrots raw",
    50
   ],
   [
    "Tomato raw",
    70
   ]
  ],
  "season": "smoked paprika, garlic, thyme, bay leaf, black pepper, salt",
  "note": "A homestyle white-bean skillet inspired by Boston baked beans, but stripped of molasses and salt pork. Ultra-creamy navy beans and lean roasted turkey are simmered with smoked paprika and dry mustard, then piled onto toasted whole-wheat bread.",
  "method": "1. Heat the olive oil in a skillet and soften chopped onion and diced carrot for 6 minutes. 2. Stir in smoked paprika, a pinch of dry mustard, a bay leaf and black pepper, then cook 1 minute. 3. Add the cooked navy beans, diced tomato and a splash of water, then simmer 10 minutes, mashing some beans to thicken the sauce. 4. Fold in the chopped roasted turkey breast and warm through for 2 minutes. 5. Toast the whole-wheat bread and spoon the smoky beans and turkey over the top.",
  "oil": "Olive oil"
 },
 {
 "title": "Smoky Pinto Bean Dip with Pita & Peppers",
 "slot": "snack",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "protein": "Pinto beans cooked",
 "carb": "Pita bread",
 "fat": "Olive oil",
 "produce": "Bell pepper red raw",
 "extras": [
  [
   "Pinto beans cooked",
   130
  ],
  [
   "Bell pepper red raw",
   80
  ]
 ],
 "season": "Optional: smoked paprika and a little chipotle (the smoky backbone), cumin, garlic, onion powder, salt, and a squeeze of lime. Chopped cilantro on top.",
 "note": "Pinto beans are the softest-cooking common bean, so they mash into a smooth refried-style dip without any added fat beyond a drizzle of olive oil. Smoked chile, cumin and lime give it Northern-Mexico warmth for dunking pita and crunchy pepper strips.",
 "method": "1. Warm the cooked pinto beans in a small pan with a splash of water for 3 minutes. 2. Mash the beans with a fork or potato masher until mostly smooth. 3. Stir in the olive oil, minced garlic, ground cumin, a pinch of smoked chile and a squeeze of lime, adding a little water until creamy. 4. Cut the pita into wedges and slice the red bell pepper into strips. 5. Scrape the warm dip into a bowl and serve with the pita and pepper dippers.",
 "oil": "Olive oil",
 "batchQ": 3, "prepMethod": "1. Equipment: a small pan, a masher or fork, and 5 small tubs plus 5 containers.\n2. Warm the pinto beans with a splash of water 3 minutes, then mash until mostly smooth.\n3. Stir in the olive oil, garlic, cumin, smoked chile and lime, loosening with water until it scoops.\n4. Taste it now. A bean dip needs more salt and more acid than you expect.\n5. Cool completely, then portion the dip into tubs.\n6. Slice the peppers into sturdy sticks and pack them separately. Pita stays in the bag.\n7. Storage: fridge 5 days for the dip, 3 for the cut peppers.\n8. Reheat: eat it cold or at room temperature. Warm the pita 20 seconds in a dry pan.",
 "makes": 5
},
 {
  "title": "Lemon-Rosemary White Bean Mash with Veggies & Pita",
  "slot": "snack",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "protein": "White beans cooked",
  "carb": "Pita bread",
  "fat": "Olive oil",
  "produce": "Cucumber raw|Carrots raw",
  "extras": [
   [
    "White beans cooked",
    130
   ],
   [
    "Cucumber raw",
    70
   ],
   [
    "Carrots raw",
    60
   ]
  ],
  "season": "Optional: fresh rosemary and lemon (the headliners), garlic, black pepper, and salt, with a little olive oil whipped in for creaminess. A pinch of red pepper flakes if you want warmth.",
  "note": "A silky Tuscan-style white bean puree built on the signature garlic, rosemary, olive oil and lemon combination. It works as a lighter, higher-protein swap for hummus, scooped up with pita and fresh cucumber and carrot.",
  "method": "1. Warm the cooked white beans in a small pan with a splash of water for 3 minutes to loosen them. 2. Blend or mash the beans with the olive oil, minced garlic, finely chopped rosemary, lemon juice, salt and pepper until smooth. 3. Loosen with a little water if needed until it is dip-able. 4. Cut the pita into wedges and slice the cucumber and carrot into sticks. 5. Spoon the mash into a bowl, drizzle with a touch more lemon, and serve with the pita and veggies.",
  "oil": "Olive oil"
 },
 {
  "id": "black-eyed-pea-collard-greens-breakfast-bowl-with-eg",
  "title": "Black-Eyed Pea & Collard Greens Breakfast Bowl with Egg",
  "slot": "breakfast",
  "protein": "Black-eyed peas cooked|Egg whole cooked|Egg white raw",
  "diets": [
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Warm the olive oil in a skillet over medium heat. 2. Add the onion and garlic and cook until soft, about 3 minutes. 3. Stir in the cooked black-eyed peas and cooked collard greens and let them heat through, about 4 minutes. 4. Push everything to one side and scramble the whole egg plus egg whites in the open space until just set. 5. Fold it all together, then pile into a bowl. 6. Top with chopped raw tomato and finish with hot sauce or a spoon of salsa.",
  "season": "Garlic, hot sauce or salsa",
  "note": "Southern-style hoppin-John energy at breakfast. Black-eyed peas and collards do the fiber heavy lifting; eggs round out the protein.",
  "carb": "Black-eyed peas cooked",
  "fat": "Olive oil",
  "produce": "Collard greens cooked|Onion raw|Tomato raw",
  "extras": [
   [
    "Hot sauce cayenne \\(Frank's-style\\)",
    10
   ]
  ]
 },
 {
  "id": "savory-cottage-cheese-edamame-power-oats-with-soft-e",
  "title": "Savory Cottage Cheese & Edamame Power Oats with Soft Egg",
  "slot": "breakfast",
  "protein": "Cottage cheese 2% lowfat|Egg whole cooked|Edamame cooked",
  "diets": [
   "vegetarian",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Cook the oats in water until creamy, about 5 minutes. 2. Stir the cooked spinach, garlic, and nutritional yeast straight into the hot oats. 3. Fold in the cottage cheese so the oats go savory and creamy. 4. Top with the cooked edamame and a soft or fried whole egg. 5. Scatter chopped raw tomato over the top and finish with a few dashes of hot sauce.",
  "season": "Nutritional yeast, garlic or hot sauce",
  "note": "Rides the viral savory-oatmeal-with-cottage-cheese trend but layers in edamame for a real fiber bump.",
  "carb": "Oats cooked \\(in water\\)",
  "fat": "Olive oil",
  "produce": "Spinach cooked|Tomato raw",
  "extras": [
   [
    "Nutritional yeast",
    8
   ]
  ]
 },
 {
  "id": "apple-pie-cottage-cheese-chia-protein-oats-with-waln",
  "title": "Apple-Pie Cottage Cheese & Chia Protein Oats with Walnuts",
  "slot": "breakfast",
  "protein": "Cottage cheese nonfat|Whey protein powder|Pea & rice protein powder",
  "diets": [
   "vegetarian",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Stir the dry oats, chia seeds, and cinnamon into a jar. 2. Blend the cottage cheese with your protein powder and a splash of water until smooth, then pour it over the oats. 3. Fold in chopped raw apple with the skin on. 4. Refrigerate overnight so the chia and oats soak up the liquid. 5. In the morning top with chopped walnuts and a drizzle of sugar-free maple syrup. For a fully vegan jar use the pea and rice protein powder and skip the cottage cheese, leaning on extra protein powder and walnuts.",
  "season": "Cinnamon or sugar-free maple syrup",
  "note": "Apple skin plus chia and oats stacks the fiber; chooses whey or pea-rice protein so it flexes vegan.",
  "carb": "Oats cooked \\(in water\\)|Oats dry \\(raw\\)",
  "fat": "Walnuts|Chia seeds",
  "produce": "Apple raw with skin",
  "extras": [
   [
    "Chia seeds",
    12
   ],
   [
    "Cinnamon ground",
    3
   ]
  ]
 },
 {
 "id": "tofu-black-bean-migas-scramble-with-avocado",
 "title": "Tofu & Black Bean Migas Scramble with Avocado",
 "slot": "breakfast",
 "protein": "Tofu firm|Black beans cooked",
 "diets": [
  "vegan",
  "vegetarian",
  "ovo",
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Heat the avocado oil in a skillet and saute the onion and red bell pepper until soft. 2. Crumble in the firm tofu and cook until it dries out a little, about 5 minutes. 3. Stir in the cooked black beans, nutritional yeast, and a pinch of cumin. 4. Tear the corn tortilla into pieces and fold them in so they soften in the scramble. 5. Plate it up, top with sliced avocado and chopped tomato, and spoon salsa over the top.",
 "season": "Salsa, nutritional yeast or cumin",
 "note": "A plant-based take on Tex-Mex migas. Tortilla pieces plus beans give it heft and fiber without any egg.",
 "carb": "Corn tortilla|Black beans cooked",
 "fat": "Avocado raw|Avocado oil",
 "produce": "Bell pepper red raw|Onion raw|Tomato raw",
 "extras": [
  [
   "Nutritional yeast",
   8
  ],
  [
   "Salsa",
   40
  ]
 ]
},
 {
  "id": "moroccan-harira-chickpea-lentil-soup-with-lemon",
  "title": "Moroccan Harira Chickpea & Lentil Soup with Lemon",
  "slot": "lunch",
  "protein": "Chickpeas cooked|Lentils cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Warm the olive oil in a pot and soften the onion, carrots, and celery for 5 minutes. 2. Stir in the garlic, a pinch of cinnamon, and a spoon of harissa paste. 3. Add chopped tomato and let it break down, about 4 minutes. 4. Pour in the cooked chickpeas and cooked lentils with enough water or broth to make it soupy. 5. Simmer 15 minutes so the flavors marry. 6. Finish with a big squeeze of lemon right before serving.",
  "season": "Garlic, cinnamon or harissa paste",
  "note": "Classic Ramadan-table Moroccan soup. Double-legume base makes the fiber soar; harissa carries the heat.",
  "carb": "Chickpeas cooked|Lentils cooked",
  "fat": "Olive oil",
  "produce": "Tomato raw|Onion raw|Carrots raw|Celery raw",
  "extras": [
   [
    "Harissa paste",
    15
   ]
  ]
 },
 {
  "id": "buffalo-chickpea-edamame-crunch-salad-with-ranch",
  "title": "Buffalo Chickpea & Edamame Crunch Salad with Ranch",
  "slot": "lunch",
  "protein": "Chickpeas cooked|Edamame cooked|Greek yogurt plain nonfat",
  "diets": [
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian",
   "vegan"
  ],
  "method": "1. Toss the cooked chickpeas with the cayenne hot sauce so they go buffalo-style. 2. Pile the chopped romaine, shredded cabbage, carrots, and celery into a big bowl. 3. Add the cooked edamame and the buffalo chickpeas on top. 4. Dollop on the Greek yogurt ranch dressing and toss to coat. 5. Finish with sliced avocado. For a vegan bowl, swap the yogurt ranch for a tahini-hot-sauce drizzle and keep everything else.",
  "season": "Hot sauce or Greek yogurt ranch dressing",
  "note": "Hits the buffalo-everything craving without chicken. Chickpeas plus edamame is the protein-fiber engine.",
  "carb": "Chickpeas cooked",
  "fat": "Avocado raw",
  "produce": "Romaine lettuce|Carrots raw|Celery raw|Cabbage raw",
  "extras": [
   [
    "Hot sauce cayenne \\(Frank's-style\\)",
    20
   ]
  ]
 },
 {
  "id": "tvp-sloppy-joe-bowl-over-quinoa-with-corn",
  "title": "TVP Sloppy Joe Bowl over Quinoa with Corn",
  "slot": "lunch",
  "protein": "TVP \\(textured soy protein\\) dry|Black beans cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Rehydrate the dry TVP in hot water or broth for 5 minutes, then drain. 2. Heat avocado oil and saute the onion, red bell pepper, and garlic until soft. 3. Add the rehydrated TVP and cook a couple minutes to brown. 4. Stir in chopped tomato, ketchup, and BBQ sauce to make it saucy and sloppy. 5. Fold in the cooked black beans and sweet corn to heat through. 6. Spoon the whole mixture over a bed of cooked quinoa.",
  "season": "Ketchup, BBQ sauce or garlic",
  "note": "Nostalgic sloppy-joe flavor, plant-powered. TVP is a protein bomb; beans, corn, and quinoa stack the fiber.",
  "carb": "Quinoa cooked|Sweet corn cooked",
  "fat": "Avocado oil",
  "produce": "Bell pepper red raw|Onion raw|Tomato raw",
  "extras": [
   [
    "BBQ sauce",
    20
   ]
  ]
 },
 {
  "id": "smoked-salmon-white-bean-arugula-lemon-bowl",
  "title": "Smoked Salmon, White Bean & Arugula Lemon Bowl",
  "slot": "lunch",
  "protein": "Salmon pink canned|White beans cooked",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "method": "1. Whisk the olive oil, Dijon mustard, a little lemon, and minced garlic into a quick dressing. 2. Toss the cooked white beans in half the dressing so they soak up flavor. 3. Lay the arugula in a bowl and top with the dressed white beans. 4. Flake the canned pink salmon over the top. 5. Add chopped tomato, cucumber, and thin-sliced onion. 6. Finish with sliced avocado and the rest of the dressing.",
  "season": "Dijon mustard or garlic",
  "note": "No-cook pantry lunch. Canned salmon plus white beans is a cheap protein-fiber one-two; arugula keeps it bright.",
  "carb": "White beans cooked",
  "fat": "Olive oil|Avocado raw",
  "produce": "Arugula raw|Tomato raw|Cucumber raw|Onion raw",
  "extras": [
   [
    "Olive oil",
    10
   ]
  ]
 },
 {
  "id": "chicken-avocado-black-bean-cottage-cheese-wrap",
  "title": "Chicken, Avocado & Black Bean Cottage Cheese Wrap",
  "slot": "lunch",
  "protein": "Chicken breast cooked|Egg white raw",
  "diets": [
   "omnivore"
  ],
  "method": "1. Blend the cottage cheese with the egg whites until smooth and pour into a parchment-lined skillet to make the viral cottage cheese wrap, baking or cooking until set, then let it cool. 2. Spread mashed avocado across the wrap. 3. Layer on the cooked chicken breast, cooked black beans, raw spinach, tomato, and onion. 4. Spoon salsa and a little hot sauce over the filling. 5. Roll it up tight and slice in half.",
  "season": "Salsa or hot sauce",
  "note": "Builds the TikTok cottage-cheese wrap into a real meal. Wrap plus chicken plus beans pushes protein well past 40g.",
  "carb": "Mission Carb Balance tortilla burrito \\(large\\)|Flour tortilla|Mission Carb Balance tortilla whole wheat",
  "fat": "Avocado raw",
  "produce": "Spinach raw|Tomato raw|Onion raw",
  "extras": [
   [
    "Salsa",
    30
   ],
   [
    "Cottage cheese 2% lowfat",
    60
   ],
   [
    "Black beans cooked",
    80
   ]
  ]
 },
 {
  "id": "gigante-bean-tuna-greek-salad-with-feta",
  "title": "Gigante Bean & Tuna Greek Salad with Feta",
  "slot": "lunch",
  "protein": "Tuna light canned in water|White beans cooked|Feta cheese",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "method": "1. Drain the canned tuna and add it to a bowl with the cooked white beans. 2. Whisk olive oil, Dijon mustard, lemon, and garlic into a dressing and pour it over. 3. Add chopped cucumber, tomato, onion, and red bell pepper. 4. Toss in the ripe olives and crumble the feta over the top. 5. Stir gently so the beans stay whole, then let it sit 5 minutes for the flavors to come together.",
  "season": "Dijon mustard or garlic",
  "note": "A protein-loaded riff on Greek gigantes-and-village-salad. White beans deliver the fiber; tuna and feta stack protein.",
  "carb": "White beans cooked",
  "fat": "Olive oil|Olives ripe",
  "produce": "Cucumber raw|Tomato raw|Onion raw|Bell pepper red raw",
  "extras": [
   [
    "Feta cheese",
    20
   ]
  ]
 },
 {
  "id": "korean-doenjang-tofu-soybean-stew-over-rice",
  "title": "Korean Doenjang Tofu & Soybean Stew over Rice",
  "slot": "dinner",
  "protein": "Tofu firm|Soybeans cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. In a pot, soften the onion, garlic, zucchini, and zucchini in a little sesame oil. 2. Add water and whisk in the miso paste and gochujang to build a savory, spicy broth. 3. Cube the firm tofu and add it with the cooked soybeans. 4. Simmer 10 minutes so the tofu soaks up the broth. 5. Stir in the cooked spinach at the end. 6. Ladle the stew over a bowl of cooked brown rice.",
  "season": "Miso paste, gochujang or garlic",
  "note": "A lighter doenjang-jjigae using miso plus gochujang. Tofu and soybeans together are a soy double-protein with real fiber.",
  "carb": "Brown rice cooked",
  "fat": "Sesame oil",
  "produce": "Zucchini cooked|Onion raw|Spinach cooked",
  "extras": [
   [
    "Miso paste",
    20
   ],
   [
    "Gochujang \\(Korean chili paste\\)",
    15
   ]
  ]
 },
 {
  "id": "jamaican-curry-chickpea-kidney-bean-stew-over-rice",
  "title": "Jamaican Curry Chickpea & Kidney Bean Stew over Rice",
  "slot": "dinner",
  "protein": "Chickpeas cooked|Kidney beans cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Melt the coconut oil in a pot and bloom your curry spice with the onion, garlic, and red bell pepper. 2. Add cubed baked sweet potato and chopped tomato and stir to coat. 3. Pour in the cooked chickpeas and cooked kidney beans with enough water to make a stew. 4. Simmer 15 minutes until the sweet potato is tender and the sauce thickens. 5. Stir in the cooked spinach and a dash of hot sauce. 6. Serve over cooked brown rice.",
  "season": "Garlic, harissa paste or hot sauce",
  "note": "Island-style curry with a serious fiber count from two beans plus sweet potato. Naturally vegan and crowd-pleasing.",
  "carb": "Brown rice cooked|Sweet potato baked",
  "fat": "Coconut oil",
  "produce": "Onion raw|Bell pepper red raw|Tomato raw|Spinach cooked",
  "extras": [
   [
    "Coconut oil",
    10
   ]
  ]
 },
 {
  "id": "seitan-gyro-bowl-with-bulgur-white-beans-tzatziki",
  "title": "Seitan Gyro Bowl with Bulgur, White Beans & Tzatziki",
  "slot": "dinner",
  "protein": "Seitan / wheat gluten|White beans cooked",
  "diets": [
   "vegetarian",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Slice the seitan and sear it in olive oil with garlic until browned and crisp at the edges. 2. Spoon the cooked bulgur into a bowl as the base. 3. Add the cooked white beans alongside the seared seitan. 4. Pile on chopped tomato, cucumber, onion, and shredded romaine. 5. Scatter ripe olives over the top. 6. Finish with a generous spoon of tzatziki.",
  "season": "Tzatziki or garlic",
  "note": "Vegetarian gyro-night swap. Seitan is the protein workhorse; white beans plus bulgur carry the fiber.",
  "carb": "Bulgur cooked|White beans cooked",
  "fat": "Olive oil|Olives ripe",
  "produce": "Tomato raw|Cucumber raw|Onion raw|Romaine lettuce",
  "extras": [
   [
    "Tzatziki \\(Greek yogurt sauce\\)",
    60
   ]
  ]
 },
 {
  "id": "ethiopian-style-split-pea-collard-greens-over-rice",
  "title": "Ethiopian-Style Split Pea & Collard Greens over Rice",
  "slot": "dinner",
  "protein": "Split peas cooked|Lentils cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Saute the onion and garlic in olive oil until deeply soft and golden, about 8 minutes, to mimic the slow-cooked Ethiopian base. 2. Stir in a spoon of harissa and a pinch of cumin. 3. Add the cooked split peas and cooked lentils with a little water to make a thick, stewy kik alicha. 4. Simmer 10 minutes. 5. In a separate pan, warm the cooked collard greens with garlic. 6. Plate the split-pea stew and greens side by side over cooked brown rice.",
  "season": "Harissa paste, garlic or cumin",
  "note": "Inspired by the kik-alicha-plus-gomen Ethiopian plate. Split peas plus lentils is one of the highest-fiber combos in the app.",
  "carb": "Brown rice cooked|Split peas cooked",
  "fat": "Olive oil",
  "produce": "Collard greens cooked|Onion raw|Tomato raw",
  "extras": [
   [
    "Harissa paste",
    15
   ]
  ]
 },
 {
 "id": "tempeh-larb-lettuce-cups-with-edamame-rice",
 "title": "Tempeh Larb Lettuce Cups with Edamame & Rice",
 "slot": "dinner",
 "protein": "Tempeh|Edamame cooked",
 "diets": [
  "vegan",
  "vegetarian",
  "ovo",
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Crumble the tempeh and brown it in sesame oil until crisp. 2. Add garlic, soy sauce, a squeeze of lime, and sriracha to make the larb dressing, tossing the tempeh to coat. 3. Fold in the cooked edamame and thin-sliced onion. 4. Spoon the warm larb into crisp iceberg lettuce cups. 5. Top with shredded carrot, cucumber, and chopped roasted peanuts. 6. Serve a scoop of cooked brown rice on the side.",
 "season": "Soy sauce, sriracha or garlic",
 "note": "Thai-Isan larb made vegan with crumbled tempeh. Edamame and peanuts add fiber and crunch.",
 "carb": "Brown rice cooked",
 "fat": "Sesame oil|Peanuts dry-roasted",
 "produce": "Iceberg lettuce raw",
 "extras": [
  [
   "Peanuts dry-roasted",
   15
  ],
  [
   "Carrots, raw",
   40
  ],
  [
   "Cucumber, raw",
   40
  ]
 ]
},
 {
  "id": "cajun-blackened-shrimp-red-bean-dirty-rice-bowl",
  "title": "Cajun Blackened Shrimp & Red Bean Dirty Rice Bowl",
  "slot": "dinner",
  "protein": "Shrimp cooked|Kidney beans cooked",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "method": "1. Toss the cooked shrimp with a little olive oil and Cajun-style seasoning, leaning on the cayenne hot sauce and harissa. 2. In a skillet, saute the holy-trinity of onion, celery, and red bell pepper with garlic. 3. Stir in the cooked kidney beans and cooked brown rice to make a quick dirty rice. 4. Warm the blackened shrimp through at the end. 5. Pile the dirty rice into a bowl and top with the shrimp. 6. Finish with extra hot sauce to taste.",
  "season": "Garlic, hot sauce or harissa paste",
  "note": "Louisiana red-beans-and-rice flavor with shrimp on top. Kidney beans carry the fiber while shrimp keeps it lean.",
  "carb": "Brown rice cooked|Kidney beans cooked",
  "fat": "Olive oil",
  "produce": "Bell pepper red raw|Onion raw|Celery raw",
  "extras": [
   [
    "Hot sauce cayenne \\(Frank's-style\\)",
    15
   ]
  ]
 },
 {
  "id": "turkey-lentil-stuffed-sweet-potato-with-cheddar",
  "title": "Turkey & Lentil Stuffed Sweet Potato with Cheddar",
  "slot": "dinner",
  "protein": "Turkey ground 93/7 cooked|Lentils cooked|Cheese reduced-fat cheddar",
  "diets": [
   "omnivore"
  ],
  "method": "1. Bake the sweet potato until soft, then split it open. 2. Brown the ground turkey with onion, garlic, and red bell pepper. 3. Stir in the cooked lentils, a pinch of cumin, and salsa to make a chili-style filling. 4. Pile the turkey-lentil mix into the split sweet potato. 5. Top with the reduced-fat cheddar so it melts. 6. Finish with sliced avocado and chopped tomato.",
  "season": "Salsa, garlic or cumin",
  "note": "A loaded-sweet-potato dinner that stretches the meat with lentils for cost and fiber. Big, comforting, macro-smart.",
  "carb": "Sweet potato baked",
  "fat": "Avocado raw",
  "produce": "Onion raw|Bell pepper red raw|Tomato raw",
  "extras": [
   [
    "Salsa",
    30
   ]
  ]
 },
 {
  "id": "miso-glazed-cod-with-edamame-soba-style-buckwheat",
  "title": "Miso-Glazed Cod with Edamame & Soba-Style Buckwheat",
  "slot": "dinner",
  "protein": "Cod Atlantic cooked|Edamame cooked",
  "diets": [
   "pescatarian",
   "omnivore"
  ],
  "method": "1. Whisk the miso paste with a splash of ponzu and a little water into a glaze. 2. Brush it over the cooked cod and warm it under a broiler or in a pan so the glaze caramelizes. 3. Toss the cooked buckwheat groats with sesame oil, garlic, and a little ponzu to mimic a soba bowl. 4. Warm the cooked bok choy and shredded carrots alongside. 5. Plate the buckwheat, top with the miso cod, and pile on the cooked edamame. 6. Spoon any extra glaze over the top.",
  "season": "Miso paste, ponzu sauce or garlic",
  "note": "Japanese miso-cod over nutty buckwheat. Edamame plus buckwheat groats deliver fiber that white soba would not.",
  "carb": "Buckwheat groats cooked",
  "fat": "Sesame oil",
  "produce": "Bok choy cooked|Carrots raw|Onion raw",
  "extras": [
   [
    "Miso paste",
    20
   ]
  ]
 },
 {
  "id": "chana-saag-spiced-chickpeas-spinach-over-quinoa",
  "title": "Chana Saag, Spiced Chickpeas & Spinach over Quinoa",
  "slot": "dinner",
  "protein": "Chickpeas cooked|Tofu firm",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Melt the coconut oil and saute the onion, garlic, and a pinch of cumin until fragrant. 2. Add chopped tomato and cook it down into a quick masala. 3. Stir in the cooked chickpeas and cubed firm tofu to soak up the sauce. 4. Fold in a big pile of cooked spinach so it turns into a saag. 5. Simmer 8 minutes and add harissa for warmth. 6. Serve over cooked quinoa.",
  "season": "Garlic, cumin or harissa paste",
  "note": "A chana-saag mashup with tofu added for extra protein. Quinoa and chickpeas keep the fiber high; fully vegan.",
  "carb": "Quinoa cooked|Chickpeas cooked",
  "fat": "Coconut oil",
  "produce": "Spinach cooked|Onion raw|Tomato raw",
  "extras": [
   [
    "Coconut oil",
    10
   ]
  ]
 },
 {
  "id": "crispy-parmesan-roasted-chickpeas-with-greek-yogurt-",
  "title": "Crispy Parmesan Roasted Chickpeas with Greek Yogurt Dip",
  "slot": "snack",
  "protein": "Chickpeas cooked",
  "diets": [
   "vegetarian",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Pat the cooked chickpeas very dry, toss with olive oil, and roast at 400F until crisp, about 20 minutes. 2. In the last few minutes, toss the chickpeas with the grated parmesan so it melts into a crust. 3. Stir the Greek yogurt with a little ranch seasoning to make a thick dip. 4. Cut the carrots and cucumber into sticks. 5. Serve the crispy parmesan chickpeas alongside the veggies and the yogurt-ranch dip for scooping.",
  "season": "Greek yogurt ranch dressing or garlic",
  "note": "Mediterranean-Dish-style crispy chickpea crisps with a protein dip. Crunchy, savory, and travels well.",
  "carb": "Chickpeas cooked",
  "fat": "Olive oil",
  "produce": "Carrots raw|Cucumber raw",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    80
   ],
   [
    "Parmesan cheese shredded",
    15
   ]
  ]
 },
 {
  "id": "edamame-white-bean-smash-snack-on-rye",
  "title": "Edamame & White Bean Smash Snack on Rye",
  "slot": "snack",
  "protein": "Edamame cooked|White beans cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Mash the cooked white beans and cooked edamame together with olive oil, garlic, and a squeeze of lemon until chunky-smooth. 2. Toast the rye bread. 3. Spread the green bean smash thick across the toast. 4. Top with sliced tomato and a little raw onion. 5. Sprinkle hemp seeds over the top and finish with a dash of hot sauce.",
  "season": "Garlic, hot sauce or lemon",
  "note": "A protein-and-fiber spin on smashed-pea toast. Edamame plus white beans plus hemp makes a snack that eats like a meal.",
  "carb": "Rye bread|White beans cooked",
  "fat": "Olive oil|Hemp seeds",
  "produce": "Tomato raw|Onion raw",
  "extras": [
   [
    "Hemp seeds",
    10
   ]
  ]
 },
 {
 "id": "cottage-cheese-pumpkin-seed-berry-protein-bowl",
 "title": "Cottage Cheese, Pumpkin Seed & Berry Protein Bowl",
 "slot": "snack",
 "protein": "Cottage cheese 2% lowfat",
 "diets": [
  "vegetarian",
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Spoon the cottage cheese into a bowl. 2. Pile on the raspberries and blueberries. 3. Scatter the pumpkin seeds and chia seeds over the top. 4. Dust with cinnamon and add a small drizzle of sugar-free maple syrup. 5. Stir once or eat in layers.",
 "season": "Cinnamon or sugar-free maple syrup",
 "note": "The dietitian-favorite cottage-cheese-plus-seeds-plus-berries bowl, dialed up so the seeds push fiber to double digits.",
 "carb": "Raspberries raw|Blueberries raw",
 "fat": "Pumpkin seeds|Chia seeds",
 "produce": "Raspberries raw|Blueberries raw",
 "extras": [
  [
   "Chia seeds",
   10
  ],
  [
   "Pumpkin seeds",
   15
  ]
 ]
},
 {
  "id": "greek-yogurt-high-fiber-cereal-berry-bowl",
  "title": "Greek Yogurt Bowl with High-Fiber Cereal & Berries",
  "slot": "breakfast",
  "diets": [
   "vegetarian",
   "omnivore",
   "pescatarian"
  ],
  "protein": "Greek yogurt plain nonfat|Cottage cheese nonfat|Kefir plain low-fat",
  "carb": "Bran cereal high-fiber \\(Fiber One\\)|Grape-Nuts cereal|Kashi GO cereal \\(protein & fiber\\)|All-Bran cereal|Granola high-protein",
  "fat": "Almonds|Walnuts|Pumpkin seeds",
  "produce": "Blueberries raw|Strawberries raw|Raspberries raw",
  "method": "1. Spoon your protein base (nonfat Greek yogurt, cottage cheese, or kefir, whichever your plan lists) into a bowl. 2. Rinse your berries and pile them on top. 3. Right before eating, sprinkle your high-fiber cereal (Fiber One, All-Bran, Grape-Nuts, Kashi GO, or a high-protein granola) over the top so it stays crunchy. 4. Add a small scatter of nuts or seeds for healthy fat. 5. Eat right away while the cereal is still crisp.",
  "season": "Optional: a little cinnamon or vanilla and a few fresh berries. A thread of honey if you want it sweeter, but the berries usually carry it.",
  "note": "A high-protein, high-fiber breakfast bowl. The cereal adds crunch and a big fiber boost without granola's added sugar, and the yogurt or kefir keeps it gut-friendly."
 },
 {
  "title": "Steak & Baked Potato with Green Beans",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef sirloin lean grilled|Beef tenderloin lean roasted|Beef top round lean cooked",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Green beans cooked|Asparagus cooked|Broccoli cooked",
  "method": "1. Pat the steak dry and season both sides with salt and pepper. 2. Bake the potato at 400 F for 45 to 60 minutes, or microwave it 6 to 8 minutes, until a fork slides in easily. 3. Heat a pan over medium-high with a little oil, then sear the steak about 4 minutes per side, until it reads 145 F in the thickest part. 4. Let the steak rest 5 minutes, then slice. 5. Steam or boil the green beans (or asparagus or broccoli, whichever your plan lists) until bright and just tender, about 4 to 5 minutes. 6. Plate it all together.",
  "season": "Salt, pepper, and garlic powder on the steak. A squeeze of lemon over the green beans. Chives on the potato if you like.",
  "note": "A simple steak and potato plate. Nothing fancy, just a lean cut, a starchy potato, and a green vegetable.",
  "id": "steak-baked-potato-with-green-beans",
  "simple": true
 },
 {
  "title": "Grilled Chicken, Quinoa & Roasted Potatoes",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked|Chicken thigh cooked",
  "carb": "Quinoa cooked|Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Broccoli cooked|Green beans cooked|Asparagus cooked",
  "extras": [
   [
    "Edamame cooked",
    80
   ]
  ],
  "method": "1. Season the chicken with salt, pepper, and garlic powder. 2. Cook your carb: simmer the quinoa until fluffy, or roast or microwave the potato until tender. 3. Grill or pan-cook the chicken over medium heat about 5 to 6 minutes per side until cooked through. 4. Steam the broccoli (or green beans or asparagus) until just tender. 5. Warm the shelled edamame as an easy side. 6. Plate the chicken, carb, and veg with the edamame on the side.",
  "season": "Garlic powder, onion powder, paprika, salt, and pepper on the chicken. A squeeze of lemon at the end.",
  "note": "Chicken, a simple grain or potato, a green vegetable, and edamame on the side. Easy to batch-cook.",
  "id": "grilled-chicken-quinoa-roasted-potatoes",
  "simple": true
 },
 {
  "title": "Baked Chicken Breast, Sweet Potato & Asparagus",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Chicken breast cooked",
  "carb": "Sweet potato baked|Potato baked flesh",
  "fat": "Olive oil|Avocado oil",
  "produce": "Asparagus cooked|Green beans cooked|Broccoli cooked",
  "method": "1. Heat the oven to 400 F. 2. Rub the chicken with a little oil, salt, pepper, and garlic powder. 3. Cut the sweet potato into 1-inch cubes and roast it beside the chicken until the chicken reads 165 F, about 22 to 28 minutes depending on thickness. 4. Toss the asparagus with a little oil and roast the last 12 minutes. 5. Slice and serve.",
  "season": "Garlic powder, paprika, salt, and pepper. Cinnamon on the sweet potato is a nice touch.",
  "note": "A clean, hands-off bake. One pan, lean protein, a starchy vegetable, and a green.",
  "id": "baked-chicken-breast-sweet-potato-asparagus",
  "simple": true
 },
 {
  "title": "Ground Beef & Potato Skillet",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef ground 93|Turkey ground 93",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Broccoli cooked|Green beans cooked|Spinach cooked",
  "method": "1. Dice the cooked potato into cubes. 2. Brown the ground beef (or ground turkey) in a pan over medium-high, breaking it up, until no pink remains, then drain any extra grease. 3. Add the potato cubes and a little oil and cook a few minutes until they crisp at the edges. 4. Stir in the broccoli (or green beans or spinach) and cook until tender. 5. Season and serve from the skillet.",
  "season": "Garlic powder, onion powder, smoked paprika, salt, and pepper. A dash of hot sauce if you like heat.",
  "note": "A one-pan skillet. Lean ground meat, potato, and a vegetable, all browned together.",
  "id": "ground-beef-potato-skillet"
 },
 {
  "title": "Pork Chop, Potato & Green Beans",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Pork chop lean cooked|Pork tenderloin lean roasted",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Green beans cooked|Asparagus cooked|Broccoli cooked",
  "method": "1. Pat the pork dry and season with salt, pepper, and garlic powder. 2. Bake or microwave the potato until tender. 3. Sear the pork in a hot oiled pan about 3 to 4 minutes per side until cooked through, then rest 3 minutes. 4. Steam the green beans until just tender. 5. Plate together.",
  "season": "Garlic powder, dried rosemary or thyme, salt, and pepper. A little apple sauce on the side is a classic pairing.",
  "note": "A simple pork chop dinner with a potato and a green vegetable.",
  "id": "pork-chop-potato-green-beans",
  "simple": true
 },
 {
  "title": "Sirloin, Quinoa & Broccoli with Edamame",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef sirloin lean grilled|Beef top round lean cooked",
  "carb": "Quinoa cooked|Potato baked flesh",
  "fat": "Olive oil|Avocado oil",
  "produce": "Broccoli cooked|Green beans cooked|Asparagus cooked",
  "extras": [
   [
    "Edamame cooked",
    80
   ]
  ],
  "method": "1. Season the sirloin with salt and pepper. 2. Simmer the quinoa until fluffy, or bake the potato. 3. Sear the sirloin in a hot oiled pan about 4 minutes per side, until it reads 145 F in the thickest part, then rest and slice. 4. Steam the broccoli until just tender. 5. Warm the edamame as a side. 6. Plate together.",
  "season": "Salt, pepper, garlic powder, and a little soy sauce or steak seasoning. A squeeze of lemon over the broccoli lifts the whole plate.",
  "note": "Lean beef, quinoa, a green vegetable, and edamame for an extra protein and fiber boost.",
  "id": "sirloin-quinoa-broccoli-with-edamame",
  "simple": true
 },
 {
 "title": "Baked Cod, Quinoa & Green Beans",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Cod Atlantic cooked",
 "carb": "Quinoa cooked|Potato baked flesh",
 "fat": "Olive oil|Avocado oil",
 "produce": "Green beans cooked|Asparagus cooked|Broccoli cooked",
 "method": "1. Heat the oven to 400 F. 2. Pat the cod dry, rub with a little oil, salt, pepper, and garlic powder, and squeeze lemon over it. 3. Bake until it flakes easily with a fork, about 12 to 15 minutes. 4. Meanwhile simmer the quinoa until fluffy. 5. Steam the green beans until just tender. 6. Plate with a lemon wedge.",
 "season": "Garlic powder, paprika, dill or parsley, salt, pepper, and plenty of lemon.",
 "note": "A light, lean white-fish dinner. Mild flavor, quick to bake, easy on the stomach.",
 "id": "baked-cod-quinoa-green-beans",
 "simple": true,
 "batchQ": 1, "prepMethod": "1. Equipment: a sheet pan, parchment, a saucepan, and 4 containers. Heat the oven to 400F.\n2. Simmer the quinoa until the grains open and the water is gone, then fluff it and spread it on a tray to cool.\n3. Pat the cod dry, rub with oil, salt, pepper and garlic powder, and squeeze lemon over it.\n4. Bake 2 portions for 12 to 15 minutes until they flake. Freeze the other fillets raw today, since raw fish keeps only 1 to 2 days in the fridge, and thaw them in the fridge the night before a second bake mid-week.\n5. Steam the green beans until just tender and cool them under cold water.\n6. Portion: quinoa, fish, green beans, and a lemon wedge in each container.\n7. Storage: fridge 3 days for the cooked cod, 4 for the quinoa and beans.\n8. Reheat: 325F oven for 6 to 8 minutes.",
 "makes": 4
},
 {
  "title": "Turkey Breast, Sweet Potato & Broccoli",
  "slot": "dinner",
  "diets": [
   "omnivore"
  ],
  "protein": "Turkey breast roasted|Chicken breast cooked",
  "carb": "Sweet potato baked|Potato baked flesh|Quinoa cooked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Broccoli cooked|Green beans cooked|Asparagus cooked",
  "method": "1. Season the turkey breast with salt, pepper, and garlic powder. 2. Bake the sweet potato until soft. 3. Cook the turkey over medium heat until cooked through, then slice. 4. Steam the broccoli until just tender. 5. Plate together.",
  "season": "Garlic powder, poultry seasoning or sage, salt, and pepper.",
  "note": "A lean turkey plate with a starchy vegetable and a green. Great for meal prep.",
  "id": "turkey-breast-sweet-potato-broccoli",
  "simple": true
 },
 {
 "title": "Roasted Salmon or Cod, Potato & Asparagus",
 "slot": "dinner",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "protein": "Salmon sockeye cooked|Cod Atlantic cooked|Salmon pink canned",
 "carb": "Potato baked flesh|Sweet potato baked|Quinoa cooked",
 "fat": "Olive oil|Avocado oil",
 "produce": "Asparagus cooked|Green beans cooked|Broccoli cooked",
 "method": "1. Heat the oven to 400 F and bake the potato 45 to 60 minutes, or microwave it 6 to 8 minutes, until a fork slides in easily. 2. Pat the fish dry and rub it with a little oil, salt, pepper, and lemon. 3. Roast the fish with the asparagus beside it until the fish flakes easily and reads 145 F, about 10 to 14 minutes for salmon or 12 to 15 for cod. 4. Plate with a lemon wedge.",
 "season": "Salt, pepper, garlic powder, dill, and lemon.",
 "note": "A simple roasted-fish plate. Salmon brings omega-3s; cod is the leaner, cheaper swap.",
 "id": "roasted-salmon-or-cod-potato-asparagus",
 "simple": true,
 "batchQ": 1, "prepMethod": "1. Equipment: two sheet pans, parchment, a meat thermometer, and 4 containers. Heat the oven to 400F.\n2. Pierce the potatoes and bake 45 to 50 minutes until tender, or cook the quinoa.\n3. Pat the fish dry and rub with oil, salt, pepper and lemon.\n4. Salmon holds 3 to 4 days cooked, so all 4 portions can go in now. If you chose cod, bake 2 and freeze 2 raw today, since raw fish keeps only 1 to 2 days in the fridge; thaw them in the fridge the night before you bake them.\n5. Roast the fish 10 to 14 minutes for salmon or 12 to 15 for cod. Roast the asparagus alongside for the last 12 minutes.\n6. Cool 10 minutes on the pan before portioning.\n7. Storage: fridge 3 days. Freeze the day-4 portion on the cook day and move it to the fridge the night before.\n8. Reheat: 325F oven for 7 minutes, or eat the salmon cold over greens.",
 "makes": 4
},
 {
  "title": "Scrambled Eggs with Potatoes & Spinach",
  "slot": "breakfast",
  "diets": [
   "omnivore",
   "vegetarian",
   "ovo",
   "pescatarian"
  ],
  "protein": "Egg whole cooked|Egg white raw",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Spinach cooked|Spinach raw|Broccoli cooked",
  "method": "1. Dice the cooked potato into small cubes. 2. Heat a little oil in a pan and crisp the potato cubes a few minutes. 3. Add a handful of spinach and let it wilt. 4. Pour in the beaten eggs (or egg whites, whichever your plan lists) and gently scramble until just set. 5. Season and serve.",
  "season": "Salt, pepper, garlic powder, and a little hot sauce or everything-bagel seasoning.",
  "note": "A simple savory breakfast. Eggs, potato, and a green, all in one pan.",
  "id": "scrambled-eggs-with-potatoes-spinach"
 },
 {
  "title": "Steak & Eggs with Potatoes",
  "slot": "breakfast",
  "diets": [
   "omnivore"
  ],
  "protein": "Beef sirloin lean grilled|Beef top round lean cooked",
  "carb": "Potato baked flesh|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Spinach cooked|Broccoli cooked|Asparagus cooked",
  "extras": [
   [
    "Egg whole cooked",
    100
   ]
  ],
  "method": "1. Dice and crisp the cooked potato in a little oil. 2. Season the steak with salt and pepper and sear in a hot pan about 4 minutes per side, until it reads 145 F in the thickest part, then rest and slice. 3. Fry or scramble the eggs in the same pan. 4. Wilt the spinach alongside. 5. Plate the steak, eggs, and potato together.",
  "season": "Salt, pepper, and garlic powder. Hot sauce on the eggs if you like.",
  "note": "The classic steak and eggs, with a potato and a green. A hearty, high-protein start.",
  "id": "steak-eggs-with-potatoes"
 },
 {
 "title": "Crispy Tofu, Roasted Potatoes & Green Beans",
 "slot": "dinner",
 "diets": [
  "vegan",
  "vegetarian",
  "ovo",
  "omnivore",
  "pescatarian"
 ],
 "protein": "Tofu firm",
 "carb": "Potato baked flesh|Sweet potato baked|Quinoa cooked",
 "fat": "Olive oil|Avocado oil",
 "produce": "Green beans cooked|Broccoli cooked|Asparagus cooked",
 "extras": [
  [
   "Edamame cooked",
   80
  ]
 ],
 "method": "1. Press the tofu dry and cut into cubes. 2. Toss with a little oil, salt, pepper, and garlic powder, then bake or pan-fry until golden and crisp on the edges. 3. Roast or bake the potato until tender. 4. Steam the green beans until just tender. 5. Warm the edamame as a side. 6. Plate together.",
 "season": "Garlic powder, onion powder, smoked paprika, salt, and pepper. A splash of soy sauce on the tofu. A squeeze of lemon over everything at the end; the acid is what stops roasted tofu and potatoes tasting flat.",
 "note": "A simple plant plate: crispy tofu, a roasted starch, a green, and edamame for extra protein.",
 "id": "crispy-tofu-roasted-potatoes-green-beans",
 "simple": true
},
 {
  "title": "Tofu, Quinoa & Edamame Bowl",
  "slot": "lunch",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "omnivore",
   "pescatarian"
  ],
  "protein": "Tofu firm|Edamame cooked",
  "carb": "Quinoa cooked|Sweet potato baked",
  "fat": "Olive oil|Avocado oil",
  "produce": "Broccoli cooked|Spinach cooked|Carrots raw",
  "extras": [
   [
    "Edamame cooked",
    80
   ]
  ],
  "method": "1. Press and cube the tofu, then pan-fry or bake with a little oil and salt until golden. 2. Simmer the quinoa until fluffy. 3. Steam the broccoli until just tender. 4. Pile the quinoa, tofu, broccoli, and edamame into a bowl. 5. Season and serve warm or cold.",
  "season": "Soy sauce or tamari, garlic powder, ginger, a splash of rice vinegar or a squeeze of lime, and a little sesame or chili if you like.",
  "note": "A simple high-protein, high-fiber plant bowl. Tofu and edamame for protein, quinoa for the base.",
  "id": "tofu-quinoa-edamame-bowl"
 },
 {
  "id": "turkey-burger-with-baked-sweet-potato-side-salad",
  "title": "Turkey Burger with Baked Sweet Potato & Side Salad",
  "slot": "dinner",
  "protein": "Turkey ground 93/7 cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Mix the ground turkey with salt, pepper, garlic powder, onion powder and a little paprika, then form into a patty and cook in a hot pan about 4 to 5 minutes per side until cooked through. 2. While it cooks, bake the sweet potato until soft, then split it open. 3. Lay the cooked turkey patty over the romaine lettuce with sliced tomato and onion. 4. Top the patty with sliced avocado and the optional cheddar cheese. 5. Serve alongside the baked sweet potato and the Romaine, tomato and onion side salad.",
  "season": "Salt, pepper, garlic powder, onion powder, paprika",
  "note": "Classic burger feel without the bun. Add the cheddar only if it fits your fat target.",
  "carb": "Sweet potato baked",
  "fat": "Avocado raw",
  "produce": "Romaine lettuce|Tomato raw|Onion raw",
  "extras": [
   [
    "Cheddar cheese",
    20
   ]
  ]
 },
 {
  "id": "honey-garlic-chicken-with-broccoli-quinoa",
  "title": "Honey-Garlic Chicken with Broccoli & Quinoa",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cut the chicken breast into bite-size pieces, season with salt and pepper, and cook in olive oil until browned and done. 2. Stir together a quick sauce of honey, soy sauce and minced garlic, then pour over the chicken and let it coat for 1 to 2 minutes. 3. Steam or microwave the broccoli until tender. 4. Serve the honey-garlic chicken and broccoli over the cooked quinoa. 5. Add a scoop of edamame on the side for extra protein.",
  "season": "Salt, pepper, soy sauce, honey, garlic, and a splash of rice vinegar to balance the honey",
  "note": "Sweet, sticky and easy. Use just enough honey to glaze without overdoing the sugar.",
  "carb": "Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Broccoli cooked",
  "extras": [
   [
    "Edamame cooked",
    60
   ]
  ],
  "simple": true
 },
 {
 "id": "tuna-noodle-skillet-with-peas-parmesan",
 "title": "Tuna Noodle Skillet with Peas & Parmesan",
 "slot": "dinner",
 "protein": "Tuna light canned in water",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Cook the whole wheat pasta until tender and drain. 2. In a pan, soften a little chopped onion, then stir in the drained canned tuna and the green peas. 3. Season with salt, pepper, garlic powder and a squeeze of lemon. 4. Fold in the cooked pasta and the Greek yogurt for a light creamy sauce, then warm through. 5. Top with the Parmesan cheese before serving.",
 "season": "Salt, pepper, garlic powder, lemon",
 "note": "A lighter tuna noodle casserole. Greek yogurt stands in for the heavy cream sauce.",
 "carb": "Whole wheat pasta cooked",
 "fat": "Parmesan cheese shredded",
 "produce": "Green peas cooked|Onion raw",
 "extras": [
  [
   "Greek yogurt plain nonfat",
   60
  ]
 ],
 "batchQ": 2, "prepMethod": "1. Equipment: a large pot, a wide pan, and 4 containers.\n2. Boil the pasta until just short of tender. It softens again when you reheat it, so pull it a minute early.\n3. Drain and rinse the pasta under cold water, then toss it with a teaspoon of oil so it does not clump.\n4. Soften the chopped onion in the pan, then stir in the drained tuna and the peas.\n5. Season with salt, pepper, garlic powder and a squeeze of lemon.\n6. Fold the pasta and the Greek yogurt through off the heat. Yogurt splits if you boil it.\n7. Portion into containers and top each with the grated Parmesan.\n8. Storage: fridge 4 days. Canned tuna keeps better than fresh fish, so this one covers a full chunk. Do not freeze, the yogurt separates.\n9. Reheat: microwave 90 seconds with a splash of water, stirring halfway.",
 "makes": 4
},
 {
  "id": "simple-chicken-caesar-plate-with-whole-wheat-crouton",
  "title": "Simple Chicken Caesar Plate with Whole-Wheat Croutons",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Season the chicken breast with salt, pepper and garlic powder, cook until done, then slice. 2. Cube the whole wheat bread, toss with a little salt and bake or pan-toast until crisp for croutons. 3. Chop the romaine lettuce and tomato into a bowl. 4. Add the sliced chicken, the croutons and the Parmesan cheese. 5. Toss with the Greek yogurt ranch dressing and a squeeze of lemon.",
  "season": "Salt, pepper, garlic powder, lemon",
  "note": "A no-fuss Caesar-style salad. The yogurt dressing keeps it lighter than classic Caesar.",
  "carb": "Whole wheat bread",
  "fat": "Parmesan cheese shredded",
  "produce": "Romaine lettuce|Tomato raw",
  "extras": [
   [
    "Greek yogurt ranch dressing",
    30
   ]
  ]
 },
 {
  "id": "egg-fried-cauliflower-rice-with-edamame",
  "title": "Egg Fried Cauliflower Rice with Edamame",
  "slot": "dinner",
  "protein": "Egg whole cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Heat the sesame oil in a pan and soften chopped onion, diced carrots and minced garlic. 2. Add the riced cauliflower and the green peas and stir-fry until heated through. 3. Push everything to one side, scramble the eggs in the empty space, then mix it in. 4. Season with soy sauce, salt and pepper. 5. Stir in the edamame at the end and serve.",
  "season": "Salt, pepper, soy sauce, garlic, and a splash of rice vinegar",
  "note": "A fried-rice swap using cauliflower. Add a second egg or more edamame to hit your protein target.",
  "carb": "Riced cauliflower cooked",
  "fat": "Sesame oil",
  "produce": "Carrots raw|Green peas cooked|Onion raw",
  "extras": [
   [
    "Edamame cooked",
    80
   ]
  ]
 },
 {
  "id": "turkey-meatballs-with-marinara-over-spaghetti-squash",
  "title": "Turkey Meatballs with Marinara over Spaghetti Squash",
  "slot": "dinner",
  "protein": "Turkey ground 93/7 cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Mix the ground turkey with salt, pepper, garlic powder and Italian herbs, roll into meatballs and bake or pan-cook until done. 2. Warm the marinara sauce and simmer the meatballs in it for a few minutes. 3. Roast the spaghetti squash, then scrape into strands with a fork. 4. Stir sliced zucchini and a little onion into the sauce to soften. 5. Spoon the meatballs and marinara over the squash strands and top with Parmesan cheese.",
  "season": "Salt, pepper, garlic powder, Italian herbs",
  "note": "Comfort-food meatballs over squash instead of pasta to keep carbs lower.",
  "carb": "Spaghetti squash cooked",
  "fat": "Parmesan cheese shredded",
  "produce": "Zucchini cooked|Onion raw",
  "extras": [
   [
    "Marinara sauce",
    100
   ]
  ]
 },
 {
  "id": "sloppy-joe-bowl-over-baked-potato",
  "title": "Sloppy Joe Bowl over Baked Potato",
  "slot": "dinner",
  "protein": "Beef ground 93/7 cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Brown the ground beef in a pan, then add chopped onion and diced red bell pepper and cook until soft. 2. Season with salt, pepper, garlic powder and paprika, then stir in the ketchup and a little BBQ sauce for a sloppy-joe sauce. 3. Bake the potato until soft and split it open. 4. Spoon the saucy beef over the baked potato. 5. Top with the cheddar cheese and let it melt.",
  "season": "Salt, pepper, garlic powder, paprika",
  "note": "All the sloppy-joe flavor served over a baked potato instead of a bun.",
  "carb": "Potato baked flesh",
  "fat": "Cheddar cheese",
  "produce": "Bell pepper red raw|Onion raw",
  "extras": [
   [
    "Ketchup",
    20
   ],
   [
    "BBQ sauce",
    15
   ]
  ]
 },
 {
  "id": "sheet-pan-sausage-style-chicken-with-peppers-onions-",
  "title": "Sheet-Pan Sausage-Style Chicken with Peppers, Onions & Potatoes",
  "slot": "dinner",
  "protein": "Chicken ground cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Season the ground chicken with salt, pepper, garlic powder, paprika and Italian herbs and form into small sausage-style crumbles. 2. Cut the potato, red bell pepper and onion into chunks and spread on a sheet pan. 3. Drizzle with olive oil and season with salt and pepper. 4. Roast until the potatoes are tender and the edges are golden, adding the chicken to cook through. 5. Toss together on the pan and serve.",
  "season": "Salt, pepper, garlic powder, paprika, Italian herbs, and a splash of red wine vinegar over the peppers at the end",
  "note": "One-pan dinner with sausage-and-peppers flavor using lean ground chicken.",
  "carb": "Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Bell pepper red raw|Onion raw"
 },
 {
  "id": "garlic-butter-shrimp-with-roasted-potatoes-asparagus",
  "title": "Garlic Butter Shrimp with Roasted Potatoes & Asparagus",
  "slot": "dinner",
  "protein": "Shrimp cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Cut the potato into chunks and roast with salt and pepper until tender and crisp. 2. Roast or steam the asparagus alongside. 3. Melt the butter in a pan and add minced garlic, cooking until fragrant. 4. Add the shrimp and toss 2 to 3 minutes until pink and cooked, finishing with a squeeze of lemon. 5. Plate the garlic-butter shrimp with the roasted potato and asparagus.",
  "season": "Salt, pepper, garlic, lemon",
  "note": "Restaurant-style garlic butter shrimp made simple. Keep the butter measured for your fat target.",
  "carb": "Potato baked flesh",
  "fat": "Butter salted",
  "produce": "Asparagus cooked",
  "simple": true
 },
 {
  "id": "bbq-chicken-stuffed-sweet-potato-with-slaw",
  "title": "BBQ Chicken Stuffed Sweet Potato with Slaw",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Bake the sweet potato until soft and split it open. 2. Shred or chop the cooked chicken breast and toss with BBQ sauce to coat. 3. Pile the BBQ chicken into the baked sweet potato. 4. Make a quick slaw by mixing shredded cabbage and carrots with the Greek yogurt ranch dressing. 5. Top the stuffed sweet potato with the slaw and serve.",
  "season": "Salt, pepper, BBQ sauce",
  "note": "Smoky-sweet and satisfying. The yogurt-ranch slaw adds crunch without heavy mayo.",
  "carb": "Sweet potato baked",
  "fat": "Greek yogurt ranch dressing",
  "produce": "Cabbage raw|Carrots raw",
  "extras": [
   [
    "BBQ sauce",
    30
   ]
  ]
 },
 {
  "id": "salmon-patties-with-smashed-potatoes-green-beans",
  "title": "Salmon Patties with Smashed Potatoes & Green Beans",
  "slot": "dinner",
  "protein": "Salmon pink canned",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Mix the canned salmon with a little chopped onion, the raw eggs, salt, pepper and garlic powder, then form into patties. 2. Pan-fry the patties in olive oil 3 to 4 minutes per side until golden. 3. Smash the cooked potato lightly and crisp it in the pan or oven with a touch of oil and salt. 4. Steam the green beans until just tender. 5. Plate the salmon patties with the smashed potato and green beans, finishing with a squeeze of lemon.",
  "season": "Salt, pepper, garlic powder, lemon",
  "note": "A budget-friendly classic from canned salmon. One egg binds the patties together.",
  "carb": "Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Green beans cooked|Onion raw",
  "extras": [
   [
    "Egg whole raw",
    25
   ]
  ]
 },
 {
  "id": "pork-chop-with-apple-roasted-brussels-sprouts",
  "title": "Pork Chop with Apple & Roasted Brussels Sprouts",
  "slot": "dinner",
  "protein": "Pork chop lean cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Season the pork chop with salt, pepper and garlic powder and sear in olive oil a few minutes per side until cooked through. 2. Halve the Brussels sprouts, toss with a little oil and salt, and roast until crispy. 3. Bake the sweet potato until soft. 4. In the last minute, add sliced apple with a pinch of cinnamon to the pan with the pork to warm and lightly caramelize. 5. Plate the pork chop with the apple, roasted Brussels sprouts and baked sweet potato.",
  "season": "Salt, pepper, garlic powder, cinnamon",
  "note": "Pork and apple is a classic fall pairing. The cinnamon-apple adds sweetness without sugar.",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Brussels sprouts cooked|Apple raw with skin",
  "simple": true
 },
 {
  "id": "crispy-tofu-teriyaki-with-broccoli-quinoa",
  "title": "Crispy Tofu Teriyaki with Broccoli & Quinoa",
  "slot": "dinner",
  "protein": "Tofu firm",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Press and cube the firm tofu, then pan-fry in sesame oil until crispy on all sides. 2. Pour the sugar-free teriyaki sauce over the tofu and let it glaze for 1 to 2 minutes. 3. Steam the broccoli and sliced carrots until tender. 4. Serve the teriyaki tofu and veg over the cooked quinoa. 5. Add a scoop of edamame for extra plant protein.",
  "season": "Salt, pepper, garlic, teriyaki",
  "note": "A simple plant-based teriyaki bowl. Pressing the tofu well is the key to crispiness.",
  "carb": "Quinoa cooked",
  "fat": "Sesame oil",
  "produce": "Broccoli cooked|Carrots raw",
  "extras": [
   [
    "Teriyaki sauce sugar-free",
    30
   ],
   [
    "Edamame cooked",
    60
   ]
  ]
 },
 {
  "id": "black-bean-sweet-potato-quesadilla-with-salsa",
  "title": "Black Bean & Sweet Potato Quesadilla with Salsa",
  "slot": "dinner",
  "protein": "Black beans cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. Mash the black beans lightly and season with salt, pepper, garlic powder and paprika. 2. Soften diced red bell pepper and onion in a pan, then stir in mashed sweet potato. 3. Spread the bean and veg mix on one half of the whole wheat tortilla and sprinkle with cheddar cheese. 4. Fold the tortilla over and toast in a dry pan until crisp and the cheese melts. 5. Slice and serve with salsa for dipping.",
  "season": "Salt, pepper, garlic powder, paprika",
  "note": "A hearty meatless quesadilla. The mashed sweet potato makes it filling and a little sweet.",
  "carb": "Mission Carb Balance tortilla whole wheat",
  "fat": "Cheddar cheese",
  "produce": "Bell pepper red raw|Onion raw",
  "extras": [
   [
    "Salsa",
    40
   ],
   [
    "Sweet potato baked",
    80
   ]
  ]
 },
 {
  "id": "lemon-pepper-chicken-with-couscous-zucchini",
  "title": "Lemon-Pepper Chicken with Couscous & Zucchini",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Season the chicken breast generously with salt, pepper, garlic powder and lemon, then cook in olive oil until done and slice. 2. Prepare the couscous and fluff with a fork. 3. Saute the sliced zucchini until just tender. 4. Toss the couscous with chopped tomato and a squeeze of lemon. 5. Plate the chicken over the couscous with the zucchini and top with a little crumbled feta cheese.",
  "season": "Salt, pepper, garlic powder, lemon",
  "note": "Bright, lemony and fast. Couscous cooks in five minutes for an easy weeknight base.",
  "carb": "Couscous cooked",
  "fat": "Olive oil",
  "produce": "Zucchini cooked|Tomato raw",
  "extras": [
   [
    "Feta cheese",
    20
   ]
  ],
  "simple": true
 },
 {
  "id": "chickpea-veggie-coconut-free-curry-over-quinoa",
  "title": "Chickpea & Veggie Coconut-Free Curry over Quinoa",
  "slot": "dinner",
  "protein": "Chickpeas cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Soften chopped onion and minced garlic in olive oil. 2. Add the chickpeas, chopped tomato and a little marinara sauce, then season with salt, pepper and paprika and simmer until saucy. 3. Stir in the spinach until wilted. 4. Spoon the chickpea stew over the cooked quinoa. 5. Adjust salt and pepper and serve warm.",
  "season": "Salt, pepper, garlic, paprika",
  "note": "A simple tomato-based chickpea stew, no coconut milk needed. Filling and high in fiber.",
  "carb": "Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Spinach cooked|Tomato raw|Onion raw",
  "extras": [
   [
    "Marinara sauce",
    80
   ]
  ]
 },
 {
  "id": "steak-tips-with-loaded-baked-potato-broccoli",
  "title": "Steak Tips with Loaded Baked Potato & Broccoli",
  "slot": "dinner",
  "protein": "Beef sirloin lean grilled",
  "diets": [
   "omnivore"
  ],
  "method": "1. Cut the beef sirloin into bite-size tips, season with salt, pepper and garlic powder, and sear in a hot pan to your liking. 2. Bake the potato until soft and split it open. 3. Top the baked potato with cheddar cheese, a dollop of Greek yogurt and a sprinkle of crumbled bacon and chopped onion. 4. Steam the broccoli until tender. 5. Plate the steak tips with the loaded baked potato and broccoli.",
  "season": "Salt, pepper, garlic powder",
  "note": "A steakhouse-style plate. Greek yogurt stands in for sour cream and a little bacon goes a long way.",
  "carb": "Potato baked flesh",
  "fat": "Cheddar cheese",
  "produce": "Broccoli cooked|Onion raw",
  "extras": [
   [
    "Greek yogurt plain nonfat",
    40
   ],
   [
    "Bacon cooked",
    8
   ]
  ]
 },
 {
  "id": "turkey-cheddar-avocado-whole-wheat-sandwich",
  "title": "Turkey, Cheddar & Avocado Whole-Wheat Sandwich",
  "slot": "lunch",
  "protein": "Turkey breast roasted",
  "diets": [
   "omnivore"
  ],
  "method": "1. Lay out two slices of whole wheat bread and spread a thin layer of Dijon on one. 2. Layer on the turkey breast, then the sliced cheddar cheese and avocado. 3. Add the romaine lettuce and sliced tomato, then season with salt and pepper. 4. Top with the second slice, press gently, and cut in half.",
  "season": "Salt, pepper, Dijon mustard",
  "note": "A real deli-style sandwich. Swap the cheddar for extra avocado to lighten it.",
  "carb": "Whole wheat bread",
  "fat": "Avocado raw|Cheddar cheese",
  "produce": "Romaine lettuce|Tomato raw",
  "extras": [
   [
    "Carrots raw",
    80
   ]
  ]
 },
 {
  "id": "classic-tuna-salad-wrap-with-crunchy-veg",
  "title": "Classic Tuna Salad Wrap with Crunchy Veg",
  "slot": "lunch",
  "protein": "Tuna light canned in water",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Drain the canned tuna well and flake it into a bowl. 2. Stir in the light mayonnaise, a squeeze of lemon and the diced celery, then season with salt and pepper. 3. Lay the tuna salad down the center of the tortilla and top with torn romaine lettuce. 4. Fold in the sides and roll tight, then slice in half.",
  "season": "Salt, pepper, lemon",
  "note": "Make the tuna salad ahead and it keeps 2 to 3 days in the fridge.",
  "carb": "Mission Carb Balance tortilla whole wheat|Flour tortilla",
  "fat": "Mayonnaise light",
  "produce": "Celery raw|Romaine lettuce",
  "extras": [
   [
    "Apple raw with skin",
    150
   ]
  ]
 },
 {
  "id": "peanut-butter-banana-sandwich-on-whole-wheat",
  "title": "Peanut Butter & Banana Sandwich on Whole Wheat",
  "slot": "breakfast",
  "protein": "PBfit powdered peanut butter|Greek yogurt plain nonfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Toast two slices of whole wheat bread if you like it warm. 2. Spread the peanut butter evenly across both slices. 3. Slice the banana into coins and lay them over one slice, then dust with cinnamon. 4. Close the sandwich, press gently, and cut in half.",
  "season": "Cinnamon",
  "note": "Naturally vegan. Drizzle a little honey if you want it sweeter (drops the vegan tag).",
  "carb": "Whole wheat bread",
  "fat": "Peanut butter smooth",
  "produce": "Banana raw"
 },
 {
 "id": "chicken-salad-lettuce-cup-sandwich",
 "title": "Chicken Salad Lettuce-Cup Sandwich",
 "slot": "lunch",
 "protein": "Chicken breast canned drained|Chicken breast cooked",
 "diets": [
  "omnivore"
 ],
 "method": "1. Flake the chicken breast (canned or cooked) into a bowl. 2. Mix in the light mayonnaise, diced celery and halved grapes, then season with salt, pepper and a pinch of garlic powder. 3. Toast the whole wheat bread and pile the chicken salad on top, or stuff it into pita. 4. Add Romaine if you have it and serve.",
 "season": "Salt, pepper, garlic powder. A squeeze of lemon and a teaspoon of Dijon in the dressing to cut the richness.",
 "note": "Grapes add a sweet crunch. Skip them for a plain savory version.",
 "carb": "Whole wheat bread|Pita bread",
 "fat": "Mayonnaise light",
 "produce": "Romaine lettuce|Celery raw|Grapes raw",
 "extras": [
  [
   "Cucumber raw",
   80
  ]
 ]
},
 {
  "id": "egg-cheese-english-muffin-sandwich",
  "title": "Egg & Cheese English Muffin Sandwich",
  "slot": "breakfast",
  "protein": "Egg whole cooked|Egg whole raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Toast the English muffin and split it open. 2. Fry or scramble the eggs in a small pan and season with salt and pepper. 3. Lay a slice of cheddar cheese on the hot egg so it melts. 4. Stack the egg and cheese on the muffin, add the spinach and tomato, and close it up.",
  "season": "Salt, pepper",
  "note": "A homemade breakfast sandwich beats the drive-thru on protein and cost.",
  "carb": "English muffin",
  "fat": "Cheddar cheese",
  "produce": "Spinach raw|Tomato raw",
  "extras": [
   [
    "Orange raw",
    130
   ]
  ]
 },
 {
  "id": "cinnamon-roll-protein-overnight-oats",
  "title": "Cinnamon Roll Protein Overnight Oats",
  "slot": "breakfast",
  "protein": "Whey protein powder|Greek yogurt plain nonfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. In a jar, stir together the oats, a scoop of whey protein powder, a spoon of Greek yogurt and milk until combined. 2. Mix in the chia seeds, cinnamon and a drizzle of maple syrup. 3. Cover and refrigerate overnight. 4. In the morning, top with sliced banana and chopped walnuts.",
  "season": "Cinnamon, maple syrup",
  "note": "Tastes like a cinnamon roll. Use a plant protein and skip the yogurt to make it vegan.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Walnuts|Chia seeds",
  "produce": "Banana raw"
 },
 {
  "id": "vanilla-berry-protein-oatmeal",
  "title": "Vanilla Berry Protein Oatmeal",
  "slot": "breakfast",
  "protein": "Whey protein powder",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. Cook the oats on the stove or microwave until creamy. 2. Off the heat, stir in a scoop of whey protein powder and a dash of cinnamon so it stays smooth. 3. Spoon into a bowl and swirl in the almond butter. 4. Top with the blueberries and sliced strawberries and a sprinkle of hemp seeds.",
  "season": "Cinnamon, vanilla",
  "note": "Stir the protein in off the heat so it does not clump.",
  "carb": "Oats cooked \\(in water\\)",
  "fat": "Almond butter|Hemp seeds",
  "produce": "Blueberries raw|Strawberries raw"
 },
 {
  "id": "savory-cottage-cheese-avocado-toast",
  "title": "Savory Cottage Cheese & Avocado Toast",
  "slot": "breakfast",
  "protein": "Cottage cheese 2% lowfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Toast the whole wheat bread until crisp. 2. Spread the cottage cheese over each slice. 3. Mash the avocado on top and season with salt, pepper and a pinch of garlic powder. 4. Finish with sliced tomato and cucumber and an extra crack of pepper.",
  "season": "Salt, pepper, garlic powder",
  "note": "High protein and ready in 5 minutes. Crusty rye works great too.",
  "carb": "Whole wheat bread|Rye bread",
  "fat": "Avocado raw",
  "produce": "Tomato raw|Cucumber raw"
 },
 {
  "id": "cottage-cheese-bowl-with-peach-almonds",
  "title": "Cottage Cheese Bowl with Peach & Almonds",
  "slot": "snack",
  "protein": "Cottage cheese 2% lowfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "1. Spoon the cottage cheese into a bowl. 2. Add sliced peach and blueberries on top. 3. Sprinkle with chopped almonds and a dash of cinnamon. 4. Drizzle a little honey if you want it sweeter.",
  "season": "Cinnamon, honey",
  "note": "A fast high-protein snack. Swap in any fruit you have on hand.",
  "carb": "Peach raw",
  "fat": "Almonds",
  "produce": "Peach raw|Blueberries raw"
 },
 {
  "id": "hummus-veggie-pita-pocket",
  "title": "Hummus & Veggie Pita Pocket",
  "slot": "lunch",
  "protein": "Chickpeas cooked|Greek yogurt plain nonfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Warm the pita bread for a few seconds and cut it in half to open the pockets. 2. Spread the hummus generously inside each pocket. 3. Stuff with sliced cucumber and red bell pepper. 4. Squeeze in a little lemon and season with salt and pepper.",
  "season": "Salt, pepper, lemon",
  "note": "Naturally vegan and packable. Add extra chickpeas inside for more protein.",
  "carb": "Pita bread",
  "fat": "Hummus|Olive oil",
  "produce": "Cucumber raw|Bell pepper red raw",
  "extras": [
   [
    "Carrots raw",
    80
   ]
  ]
 },
 {
  "id": "hard-boiled-eggs-with-fruit-almonds",
  "title": "Hard-Boiled Eggs with Fruit & Almonds",
  "slot": "snack",
  "protein": "Egg whole cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. Peel the eggs (hard-boiled) and halve them. 2. Season the eggs with a little salt and pepper. 3. Plate them alongside a handful of grapes. 4. Add a small handful of almonds on the side.",
  "season": "Salt, pepper",
  "note": "A balanced grab-and-go snack. Boil eggs in batches to keep on hand.",
  "carb": "Grapes raw|Apple raw with skin",
  "fat": "Almonds",
  "produce": "Grapes raw"
 },
 {
  "id": "sesame-edamame-cucumber-snack-bowl",
  "title": "Sesame Edamame & Cucumber Snack Bowl",
  "slot": "snack",
  "protein": "Edamame cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "1. Warm or thaw the edamame (shelled) and add it to a bowl. 2. Toss in the sliced cucumber. 3. Drizzle with a little sesame oil and a splash of soy sauce. 4. Sprinkle with sesame seeds and a pinch of salt, then toss to coat.",
  "season": "Soy sauce, rice vinegar, sesame, grated garlic or ginger, a pinch of chili flakes, and salt",
  "note": "Naturally vegan and very high protein for a snack. Add a dash of sriracha for heat.",
  "carb": "Edamame cooked",
  "fat": "Sesame oil",
  "produce": "Cucumber raw"
 },
 {
 "id": "big-batch-beef-sweet-potato-taco-skillet-bowls",
 "title": "Big-Batch Beef & Sweet Potato Taco Skillet Bowls",
 "slot": "dinner",
 "protein": "Beef ground 93/7 cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Reheat one container in the microwave for about 2 minutes with a splash of water, stir, then top with the avocado and a spoon of salsa. Eat it as a bowl.",
 "batchQ": 3, "prepMethod": "1. Equipment: one large deep skillet or pot, a cutting board, a knife, a wooden spoon, a colander, and 5 meal-prep containers. 2. Toast the spice blend first to bloom it: in a small dry skillet over medium heat, warm 2 tsp chili powder, 2 tsp ground cumin, 1 tsp smoked paprika, 1 tsp dried oregano, and 1/2 tsp ground coriander for about 60 seconds, just until fragrant, then tip into a bowl. Toasting wakes up the volatile oils in the spices so they taste deeper, not dusty. 3. Peel your sweet potatoes and dice into even 1/2-inch cubes (even size means even cooking). Dice your onion and red bell peppers into 1/2-inch pieces. 4. Heat the skillet over medium-high with 1 Tbsp olive oil. Add the onion and pepper and cook 5 minutes, stirring, until softened and the onion edges turn translucent. 5. Push the vegetables to one side and add your ground beef to the bare metal. Let it sit undisturbed 2 minutes so it browns (that crust is Maillard flavor), then break it up and cook 6 to 8 minutes more until no pink remains and a thermometer reads 160F. Salt the beef with 1 tsp salt as it cooks. 6. Drain your black beans, then stir them in along with the sweet potato cubes, the toasted spice blend, 1 more tsp salt, and 1/2 cup water. Cover and simmer 12 to 15 minutes, stirring once, until a fork slides easily into the sweet potato. 7. If you are using rice as the base, cook your brown rice per package directions while the skillet simmers. 8. Finishing touch: off the heat, stir in the juice of 1 lime and a small handful of chopped fresh cilantro to brighten everything. 9. Divide the rice (or skip it) and the beef mixture evenly into the 5 containers. Top each with your shredded cheddar. 10. Cool 20 minutes on the counter, then refrigerate up to 4 days, or freeze up to 2 months. 11. Reheat from the fridge in the microwave for 2 minutes with a splash of water; from frozen, microwave 4 to 5 minutes, stirring halfway. Add fresh avocado and a spoon of salsa or pico only after reheating so they stay cool and creamy.",
 "makes": 5,
 "season": "Salsa or pico de gallo",
 "note": "Honest omnivore only (beef + cheddar). Sweet potato base preferred over white rice; rice listed as alt carb.",
 "carb": "Sweet potato baked|Brown rice cooked",
 "fat": "Cheddar cheese|Avocado raw",
 "produce": "Bell pepper red raw|Onion raw|Black beans cooked",
 "extras": [
  [
   "Avocado raw",
   50
  ],
  [
   "Salsa",
   40
  ]
 ]
},
 {
 "id": "slow-cooker-style-salsa-verde-shredded-chicken-quinoa-",
 "title": "Slow-Cooker-Style Salsa Verde Shredded Chicken Quinoa Bowls",
 "slot": "dinner",
 "protein": "Chicken breast cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Microwave one container 2 minutes with a splash of water, stir, then add fresh avocado and a spoon of pico after heating.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot with a lid (or slow cooker), 2 forks, a cutting board, a knife, a fine strainer, and 5 containers. 2. Salt early for juicier meat: rub your chicken breasts all over with 1 tsp salt and let them sit while you set up (salt has time to penetrate and helps the meat hold moisture). 3. Add the chicken to the pot with 1.5 cups jarred salsa verde, 1 tsp ground cumin, 1 tsp garlic powder, and 1/2 tsp dried oregano. 4. Stovetop method: bring to a gentle simmer, cover, and cook on low heat 22 to 28 minutes, flipping once, until a thermometer in the thickest piece reads 165F and the meat shreds easily. Slow cooker method: cook on LOW 4 hours. 5. Lift the chicken onto the cutting board, let it rest 5 minutes (resting lets the juices redistribute instead of running out), then shred with 2 forks and stir it back into the pan juices so it soaks them up. 6. Rinse your quinoa in the strainer (rinsing removes bitter saponins), then cook per package directions. Dice your red bell pepper. 7. Into each of the 5 containers, divide the quinoa, then the shredded chicken with its sauce, your drained black beans, your corn, and the diced pepper evenly. Top each with your shredded cheddar. 8. Finishing touch: squeeze fresh lime over each bowl and add chopped cilantro after reheating. 9. Cool 20 minutes, then refrigerate up to 4 days or freeze up to 3 months. 10. Reheat from fridge: microwave 2 minutes with a splash of water. From frozen: 4 to 5 minutes, stirring halfway. Add your avocado and a spoon of pico after heating so they stay fresh.",
 "makes": 5,
 "season": "Salsa verde or pico de gallo. Garlic, cumin and fresh cilantro; finish with lime.",
 "note": "Omnivore only (chicken + cheddar). Quinoa base preferred over rice.",
 "carb": "Quinoa cooked",
 "fat": "Avocado raw|Cheddar cheese",
 "produce": "Black beans cooked|Sweet corn cooked|Bell pepper red raw",
 "extras": [
  [
   "Avocado raw",
   50
  ],
  [
   "Sweet corn cooked",
   60
  ],
  [
   "Salsa verde \\(tomatillo\\)",
   40
  ]
 ]
},
 {
 "id": "big-batch-turkey-lentil-pumpkin-chili",
 "title": "Big-Batch Turkey & Lentil Pumpkin Chili",
 "slot": "dinner",
 "protein": "Turkey ground 93/7 cooked|Lentils cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Microwave one container 2 to 3 minutes, stir, then top with avocado and a little shredded cheddar after heating.",
 "batchQ": 3, "prepMethod": "1. Equipment: one large pot (at least 6 quarts), a cutting board, a knife, a wooden spoon, a colander, and 5 containers. 2. Dice your onion and red bell peppers into 1/2-inch pieces and mince 3 garlic cloves. 3. Bloom the dry spices: in the dry pot over medium heat, toast 2 tsp chili powder, 2 tsp ground cumin, 1 tsp smoked paprika, and 1 tsp dried oregano for 45 seconds until fragrant, then scrape into a bowl (this deepens the chili flavor). 4. Add 1 Tbsp olive oil to the pot over medium-high, add the onion, pepper, and garlic, and cook 5 minutes until softened. 5. Push the vegetables aside and add your ground turkey to the bare pot. Let it sit 2 minutes to brown, then break it up and cook 6 to 8 minutes until no pink remains and a thermometer reads 165F. Salt with 1 tsp salt. 6. Stir in your drained kidney beans, your cooked lentils, 1 can (15 oz) pumpkin puree, 1 can (28 oz) crushed tomatoes, the toasted spice blend, and 1 to 2 tsp minced chipotle in adobo. 7. Bring to a simmer, then lower the heat and cook uncovered 20 to 25 minutes, stirring occasionally, until thick enough that a spoon dragged across the bottom leaves a brief trail. 8. Finishing touch: stir in the juice of 1 lime and 1 Tbsp brown sugar or a drizzle of maple to balance the acidity and round out the heat. 9. If using rice, cook your brown rice to spoon underneath. Divide the chili evenly into the 5 containers (over rice if using). 10. Cool 30 minutes, then refrigerate up to 4 days or freeze up to 3 months. Chili freezes especially well. 11. Reheat from fridge: microwave 2 to 3 minutes, stirring once. From frozen: 5 to 6 minutes, stirring twice. Add your avocado and cheddar after heating.",
 "makes": 5,
 "season": "Salsa or chipotle in adobo",
 "note": "Omnivore (ground turkey). Pumpkin adds body and fiber. Lentils + beans stretch the batch.",
 "carb": "Lentils cooked|Brown rice cooked",
 "fat": "Avocado raw|Cheddar cheese",
 "produce": "Kidney beans cooked|Bell pepper red raw|Onion raw|Pumpkin canned",
 "extras": [
  [
   "Avocado raw",
   50
  ],
  [
   "Cheddar cheese",
   20
  ]
 ]
},
 {
 "id": "sheet-pan-harissa-chicken-thighs-with-chickpeas-sweet-",
 "title": "Sheet-Pan Harissa Chicken Thighs with Chickpeas & Sweet Potato",
 "slot": "dinner",
 "protein": "Chicken thigh cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Reheat in an air fryer or 400F oven 6 to 8 minutes to re-crisp, or microwave 2 minutes if you do not mind it soft. Crumble feta on after heating.",
 "batchQ": 2, "prepMethod": "1. Equipment: 2 large rimmed sheet pans, parchment paper, a cutting board, a knife, a large bowl, paper towels, and 4 containers. Heat the oven to 425F (high heat caramelizes the sugars in sweet potato and crisps the chickpeas). 2. Peel your sweet potatoes and cut into 3/4-inch cubes. Cut your red bell peppers and onion into 1-inch chunks. Drain your chickpeas and pat them very dry with paper towels (dry chickpeas crisp, wet ones steam). 3. In the bowl, toss all the vegetables and chickpeas with 2 Tbsp olive oil, 1 Tbsp harissa paste, 1 tsp ground cumin, 1/2 tsp ground coriander, and 1/2 tsp salt. Spread across both parchment-lined pans in a single layer so nothing is crowded (crowded food steams instead of roasting). 4. Pat your chicken thighs dry on both sides, then rub with 1 more Tbsp harissa, 1 Tbsp olive oil, 1/2 tsp salt, and 1/2 tsp smoked paprika. Drying the surface is what lets them sear and brown. Nestle them among the vegetables. 5. Roast 25 to 30 minutes until the sweet potato is fork-tender, the chickpea edges turn deep golden, and a thermometer in the thickest thigh reads 165F. Let the chicken rest 5 minutes before packing. 6. Finishing touch: squeeze fresh lemon over everything and scatter chopped fresh parsley or mint. 7. Divide the chicken and vegetables evenly into the 4 containers. 8. Cool 20 minutes, then refrigerate up to 4 days. These also freeze up to 2 months, though the chickpeas soften. 9. Reheat in an air fryer or 400F oven 6 to 8 minutes to keep the edges crisp, or microwave 2 minutes if you do not mind softer texture. Crumble your feta over the top after heating.",
 "makes": 4,
 "season": "Harissa paste or Lemon",
 "note": "Omnivore (chicken thigh + feta).  Two pans avoid crowding so veg roasts instead of steams.",
 "carb": "Sweet potato baked",
 "fat": "Olive oil|Feta cheese",
 "produce": "Chickpeas cooked|Bell pepper red raw|Onion raw",
 "extras": [
  [
   "Feta cheese",
   20
  ],
  [
   "Olive oil",
   5
  ]
 ]
},
 {
 "id": "korean-gochujang-tempeh-roasted-veg-quinoa-trays",
 "title": "Korean Gochujang Tempeh & Roasted Veg Quinoa Trays",
 "slot": "dinner",
 "protein": "Tempeh",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "Microwave one container 2 minutes, stir, and sprinkle pumpkin seeds on after heating for crunch.",
 "batchQ": 2, "prepMethod": "1. Equipment: a large sheet pan, parchment paper, a cutting board, a knife, a small bowl, a pot for quinoa, a fine strainer, and 4 containers. Heat the oven to 425F. 2. Optional but worth it: steam your tempeh cubes over simmering water for 8 minutes first, then pat dry. Steaming removes tempeh's slight bitterness and helps it soak up the glaze. Cut your tempeh into 1/2-inch cubes. 3. Cut your broccoli into bite-size florets, your red bell peppers into 1-inch strips, and your onion into wedges. 4. Make the glaze: whisk 2 Tbsp gochujang, 2 Tbsp soy sauce, 1 Tbsp sesame oil, 1 Tbsp maple syrup, 1 Tbsp rice vinegar, and 1 tsp grated fresh ginger in the small bowl. 5. On the parchment-lined pan, toss the tempeh and vegetables with half the glaze and spread in a single layer with space between pieces so they roast and char rather than steam. 6. Roast 22 to 26 minutes, tossing once at the halfway mark, until the broccoli edges char slightly and the tempeh is firm and browned. 7. Meanwhile rinse your quinoa in the strainer and cook per package directions; steam or microwave your edamame. 8. Divide the quinoa, edamame, and roasted tempeh and veg evenly into the 4 containers. Drizzle the remaining glaze over each. 9. Finishing touch: after reheating, sprinkle your pumpkin seeds and a few drops of sesame oil over the top, plus sliced scallion if you have it. 10. Cool 20 minutes, then refrigerate up to 4 days or freeze up to 2 months. 11. Reheat from fridge: microwave 2 minutes. From frozen: 4 minutes, stirring halfway.",
 "makes": 4,
 "season": "Gochujang or soy sauce",
 "note": "Fully vegan (tempeh, all plant). Honest across all 5 diet tags.",
 "carb": "Quinoa cooked",
 "fat": "Sesame oil|Pumpkin seeds",
 "produce": "Broccoli cooked|Bell pepper red raw|Edamame cooked|Onion raw",
 "extras": [
  [
   "Pumpkin seeds",
   15
  ],
  [
   "Edamame cooked",
   50
  ]
 ]
},
 {
 "id": "big-batch-tuna-white-bean-mediterranean-meal-prep-bowl",
 "title": "Big-Batch Tuna & White Bean Mediterranean Meal-Prep Bowls",
 "slot": "dinner",
 "protein": "Tuna light canned in water|White beans cooked",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "No reheating needed, eat cold. If you prefer it warm, microwave the grain and beans 90 seconds, then add the tuna and vegetables cold.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pot for the grain, a fine strainer, a large bowl, a cutting board, a knife, a small jar, and 5 containers. This is a no-cook-protein assembly bowl that keeps well because nothing is dressed with leafy greens. 2. Rinse your bulgur or quinoa in the strainer, cook per package directions, then spread it on a plate to cool quickly (cooling stops it from going gummy in the container). 3. Dice your cucumber, tomatoes, red bell peppers, and onion into 1/2-inch pieces. 4. Drain your canned tuna and white beans well, then flake the tuna with a fork. 5. Make the dressing in the jar: shake 1/4 cup olive oil, the juice of 2 lemons, 1 Tbsp Dijon, 1 minced garlic clove, 1 tsp dried oregano, 1/2 tsp salt, and a few grinds of pepper until it emulsifies and turns cloudy. 6. Into each of the 5 containers, add the grain, then divide the tuna, white beans, diced pepper and onion, and your ripe olives evenly. Put the diced cucumber and tomato in a small separate tub; they make everything they touch watery by day three. 7. Pour the dressing into a tiny separate container for each and add it when you eat. Crumble your feta on top. 8. Finishing touch: a handful of chopped fresh parsley or dill stirred through brightens the whole bowl. 9. Storage: refrigerate up to 4 days. Do not freeze, the cucumber and tomato turn watery. 10. Reheat: eat cold straight from the fridge, or warm just the grain and beans for 90 seconds and add the tuna and veg cold.",
 "makes": 5,
 "season": "Lemon or Dijon mustard. Garlic, fresh parsley or oregano, and plenty of black pepper.",
 "note": "Omnivore + pescatarian (canned tuna). No-cook protein, batches and stores great because it is built dry with sturdy veg.",
 "carb": "Bulgur cooked|Quinoa cooked",
 "fat": "Olive oil|Olives ripe|Feta cheese",
 "produce": "Cucumber raw|Tomato raw|Bell pepper red raw|Onion raw",
 "extras": [
  [
   "Feta cheese",
   20
  ],
  [
   "Olives ripe",
   20
  ]
 ]
},
 {
 "id": "big-batch-lentil-shepherd-style-bake-with-sweet-potato",
 "title": "Big-Batch Lentil Shepherd-Style Bake with Sweet Potato Mash",
 "slot": "dinner",
 "protein": "Lentils cooked",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "Microwave one container 2 to 3 minutes, or reheat in a 375F oven 12 minutes to firm the top back up.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large skillet, a pot, a potato masher, a 9x13 baking dish, a cutting board, a knife, and 5 containers. Heat the oven to 400F. 2. Peel your sweet potatoes, cut into 1-inch chunks, and boil in well-salted water 15 to 18 minutes until a fork slides in easily. Drain, then mash with 1 Tbsp olive oil, 1/2 tsp salt, and a pinch of nutmeg until smooth. 3. While they boil, dice your onion and carrots small. Heat the skillet over medium-high with 1 Tbsp olive oil, add the onion, carrot, and 3 minced garlic cloves, and cook 4 minutes. Add your vegetables and cook 6 to 8 minutes more without stirring much, until their liquid cooks off and they brown (browning them builds the savory, meaty depth this dish relies on). 4. Stir in your cooked lentils, your green peas, 1/2 cup tomato passata or crushed tomato, 1 Tbsp soy sauce (for savory depth), 1 Tbsp tomato paste, 1 tsp dried thyme, 1 tsp smoked paprika, and 1/2 tsp salt. Simmer 5 minutes until thickened. 5. Spread the lentil mixture in the baking dish, then spread the sweet potato mash over the top in an even layer and rough up the surface with a fork (the peaks crisp up). Bake 18 to 20 minutes until the top is set and lightly golden at the edges. 6. Finishing touch: scatter chopped fresh parsley over the top before serving. 7. Cool 20 minutes, then cut into 5 portions and pack into containers. 8. Refrigerate up to 4 days or freeze up to 3 months. 9. Reheat from fridge: microwave 2 to 3 minutes, or 375F oven 12 minutes to re-firm the top. From frozen: microwave 5 to 6 minutes. Sprinkle your pumpkin seeds on after heating for crunch.",
 "makes": 5,
 "season": "Tomato or garlic. Salt and black pepper through the lentils, and a splash of vinegar or Worcestershire for savoury depth.",
 "note": "Fully vegan (lentils, zucchini, sweet potato; soy sauce). Honest across all 5 tags.",
 "carb": "Sweet potato baked",
 "fat": "Olive oil|Pumpkin seeds",
 "produce": "Carrots raw|Green peas cooked|Onion raw",
 "extras": [
  [
   "Pumpkin seeds",
   15
  ],
  [
   "Green peas cooked",
   50
  ]
 ]
},
 {
 "id": "buffalo-chicken-sweet-potato-meal-prep-bowls",
 "title": "Buffalo Chicken & Sweet Potato Meal-Prep Bowls",
 "slot": "dinner",
 "protein": "Chicken breast cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Microwave one container 2 minutes with a splash of water, stir, then drizzle ranch and add fresh celery and carrot sticks after heating.",
 "batchQ": 2, "prepMethod": "1. Equipment: 2 sheet pans, parchment paper, a cutting board, a knife, a large bowl, paper towels, and 5 containers. Heat the oven to 425F. 2. Peel your sweet potatoes and dice into 3/4-inch cubes. Cut your broccoli into florets. Toss both with 1 Tbsp olive oil, 1/2 tsp salt, and 1/2 tsp garlic powder, then spread on the pans in a single layer (do not crowd them or they steam instead of caramelizing). 3. Pat your chicken breast dry and cut into 1-inch pieces (dry surface browns better). Toss with 1 Tbsp olive oil, 1/2 tsp salt, and 1/2 tsp smoked paprika, and spread on its own pan or an open corner. 4. Roast 20 to 24 minutes until the sweet potato edges caramelize and a fork slides through easily, and a thermometer in the chicken reads 165F. Let the chicken rest 5 minutes. 5. Make the buffalo sauce: in the bowl, whisk 1/3 cup cayenne hot sauce, 1 Tbsp melted butter, 1 tsp honey, and 1/2 tsp garlic powder (the butter and honey mellow the vinegar bite and make it cling). Add the hot roasted chicken and toss to coat. 6. Divide the sweet potato, broccoli, and buffalo chicken into the 5 containers. Top each with a little of your shredded cheddar. 7. Cool 20 minutes, then refrigerate up to 4 days or freeze the chicken-and-potato portion up to 2 months. 8. Reheat from fridge: microwave 2 minutes with a splash of water, or air-fry at 380F for 5 minutes to re-crisp the potato. From frozen: 4 to 5 minutes, stirring halfway. After heating, drizzle Greek-yogurt ranch and add raw celery and carrot sticks for cool crunch.",
 "makes": 5,
 "season": "Hot sauce or Greek yogurt ranch dressing",
 "note": "Omnivore (chicken + cheddar). Sweet potato base.",
 "carb": "Sweet potato baked",
 "fat": "Cheddar cheese|Avocado raw",
 "produce": "Broccoli cooked|Carrots raw|Celery raw",
 "extras": [
  [
   "Greek yogurt ranch dressing",
   30
  ],
  [
   "Avocado raw",
   40
  ]
 ]
},
 {
 "id": "big-batch-black-bean-sweet-potato-enchilada-bake-veget",
 "title": "Big-Batch Black Bean & Sweet Potato Enchilada Bake (Vegetarian)",
 "slot": "dinner",
 "protein": "Black beans cooked",
 "diets": [
  "omnivore",
  "vegetarian"
 ],
 "method": "Microwave one container 2 to 3 minutes, or reheat in a 375F oven 12 minutes for a firmer texture. Add fresh avocado and salsa after heating.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large skillet, a 9x13 baking dish, a cutting board, a knife, a spoon, a colander, and 5 containers. Heat the oven to 400F. 2. Peel your sweet potatoes and dice into 1/2-inch cubes. Dice your onion and red bell peppers. 3. Bloom the spices: heat the skillet over medium-high with 1 Tbsp olive oil, add 2 tsp ground cumin, 1 tsp chili powder, and 1 tsp smoked paprika and stir 30 seconds until fragrant. 4. Add the onion, pepper, and sweet potato with 1/4 cup water, cover, and cook 10 to 12 minutes until the sweet potato is fork-tender. 5. Stir in your drained black beans, your corn, 1 tsp salt, and the juice of 1 lime. 6. Spread 1/2 cup red enchilada sauce in the baking dish. Tear your corn tortillas into pieces and layer half on the bottom. Spoon over half the filling, then a layer of sauce. Repeat with the remaining tortillas, filling, and the rest of a 15 oz can of sauce. Top with your shredded cheddar. 7. Bake 22 to 25 minutes until the cheese melts and the edges bubble. 8. Cool 25 minutes, cut into 5 portions, and pack into containers. 9. Finishing touch: after reheating, add fresh avocado, a spoon of salsa, and chopped cilantro. 10. Refrigerate up to 4 days or freeze up to 3 months. 11. Reheat from fridge: microwave 2 to 3 minutes, or 375F oven 12 minutes for a crisper top. From frozen: microwave 5 to 6 minutes, rotating once.",
 "makes": 5,
 "season": "Red enchilada sauce or salsa",
 "note": "Vegetarian (contains cheddar, so NOT vegan or ovo per the dairy rule). Omnivore-friendly too.",
 "carb": "Sweet potato baked|Corn tortilla",
 "fat": "Cheddar cheese|Avocado raw",
 "produce": "Bell pepper red raw|Onion raw|Sweet corn cooked",
 "extras": [
  [
   "Avocado raw",
   50
  ],
  [
   "Salsa",
   40
  ]
 ]
},
 {
 "id": "teriyaki-chicken-thigh-pineapple-brown-rice-trays",
 "title": "Teriyaki Chicken Thigh & Pineapple Brown Rice Trays",
 "slot": "dinner",
 "protein": "Chicken thigh cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Microwave one container 2 to 3 minutes with a splash of water, stir, then scatter cashews on after heating for crunch.",
 "batchQ": 2, "prepMethod": "1. Equipment: a large sheet pan, parchment paper, a cutting board, a knife, a bowl, a pot for rice, paper towels, and 5 containers. Heat the oven to 425F. 2. Pat your chicken thighs dry and cut into 1-inch pieces (drying the surface is what lets the glaze caramelize instead of steam). Toss in the bowl with 1/3 cup sugar-free teriyaki, 1 Tbsp sesame oil, 1 Tbsp rice vinegar, 3 minced garlic cloves, and 1 tsp grated fresh ginger. Let it marinate while you prep the veg. 3. Cut your broccoli into florets, your red bell peppers into strips, and your pineapple into 3/4-inch chunks (the pineapple sugars caramelize beautifully at this heat). 4. Spread the chicken on one half of the pan and the broccoli, peppers, and pineapple on the other, leaving space between everything so it roasts rather than steams. Roast 22 to 26 minutes, tossing once, until the broccoli edges char and a thermometer in the thickest chicken reads 165F. 5. In the last 5 minutes, add your snap peas to the pan so they stay crisp and bright green. Let the chicken rest 5 minutes. 6. Cook your brown rice per package directions. 7. Divide the rice, chicken, and roasted veg and pineapple into the 5 containers. Drizzle 1 more Tbsp teriyaki over each. 8. Finishing touch: scatter your raw cashews and a pinch of sesame seeds or sliced scallion on after reheating so the cashews stay crunchy. 9. Cool 20 minutes, then refrigerate up to 4 days or freeze up to 2 months. 10. Reheat from fridge: microwave 2 to 3 minutes with a splash of water. From frozen: 4 to 5 minutes, stirring halfway.",
 "makes": 5,
 "season": "Sugar-free teriyaki sauce or garlic",
 "note": "Omnivore only (chicken thigh). Brown rice over white. Pineapple holds up roasted.",
 "carb": "Brown rice cooked",
 "fat": "Sesame oil|Cashews raw",
 "produce": "Broccoli cooked|Bell pepper red raw|Pineapple raw|Snap peas cooked",
 "extras": [
  [
   "Cashews raw",
   15
  ],
  [
   "Snap peas cooked",
   40
  ]
 ]
},
 {
 "id": "cilantro-lime-chicken-quinoa-burrito-bowls-batch",
 "title": "Cilantro-Lime Chicken & Quinoa Burrito Bowls (Batch)",
 "slot": "lunch",
 "protein": "Chicken breast cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Pile quinoa in a bowl. Top with one portion of the chicken, black beans, and corn. Add the diced pepper and shredded romaine. Spoon salsa or pico over the top and add the sliced avocado just before eating.",
 "batchQ": 2, "prepMethod": "1. Equipment: 1 large sheet pan, parchment paper, 1 medium pot with lid, a fine strainer, a cutting board, a knife, a meat thermometer, paper towels, and 5 containers. Heat the oven to 425F. 2. Cook the quinoa: rinse your quinoa in the strainer (this removes the bitter saponin coating), add to the pot with water at a 1 to 2 ratio and a pinch of salt, bring to a boil, then cover and simmer 15 minutes until the water is gone and you see little curls. Turn off the heat and let it steam covered 5 minutes, then fluff with a fork. 3. While that cooks, pat your chicken breast very dry and cut into 1-inch pieces (dry chicken browns; wet chicken steams). Toss on the lined sheet pan with 1 Tbsp olive oil, 1 tsp salt, 1 tsp ground cumin, 1 tsp garlic powder, 1/2 tsp smoked paprika, and the juice of 1 lime. Spread in a single layer so the pieces do not touch. 4. Roast 18 to 22 minutes until the edges brown and a thermometer in the thickest piece reads 165F. Let the chicken rest 5 minutes so the juices stay in. 5. Drain and rinse your black beans and your corn (or use thawed frozen corn). Dice your red bell pepper and shred your romaine. 6. Finishing touch: toss the cooled quinoa with the juice of 1 more lime, a small handful of chopped cilantro, and a pinch of salt so every bite is bright. 7. Divide the cilantro-lime quinoa into the 5 containers, then top each with an equal share of chicken, beans, corn, and pepper. Keep the romaine in a separate small bag so it stays crisp, and slice your avocado fresh each day. 8. Storage: refrigerate the chicken-and-quinoa containers up to 4 days. Freeze any portions you will not eat by day 4 for up to 2 months. 9. Reheat: microwave one container (without romaine and avocado) for 2 minutes, stir, then heat 30 to 60 seconds more until hot; add a splash of water first if the quinoa looks dry. Top with romaine, avocado, and salsa after heating.",
 "makes": 5,
 "season": "Salsa or pico de gallo or garlic or chipotle in adobo or olive oil",
 "note": "Build-friendly burrito bowl; keep romaine and avocado separate and add fresh.",
 "carb": "Quinoa cooked",
 "fat": "Avocado raw|Cheddar cheese",
 "produce": "Black beans cooked|Sweet corn cooked|Bell pepper red raw|Romaine lettuce",
 "extras": [
  [
   "Black beans cooked",
   40
  ],
  [
   "Sweet corn cooked",
   60
  ],
  [
   "Avocado raw",
   50
  ],
  [
   "Salsa",
   40
  ]
 ]
},
 {
  "id": "mason-jar-greek-chickpea-feta-shake-salads",
  "title": "Mason-Jar Greek Chickpea & Feta Shake Salads",
  "slot": "lunch",
  "protein": "Chickpeas cooked|Feta cheese",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "This is eaten straight from the jar. When ready, shake the sealed jar hard for 10 seconds so the dressing coats everything, then either eat from the jar or dump into a bowl. The greens at the top stay dry and crisp until you shake.",
  "batchQ": 2, "prepMethod": "1. Equipment: 5 wide-mouth quart mason jars with lids, a small pot, a fine strainer, a cutting board, a knife, and a small jar or cup for the dressing. 2. Cook the quinoa first: rinse your quinoa in the strainer, add to the pot with water at a 1 to 2 ratio and a pinch of salt, boil, then cover and simmer 15 minutes until fluffy. Spread it on a plate to cool fully (cooling keeps it from steaming the greens and going gummy). 3. Make the dressing: in the small cup, whisk 6 Tbsp olive oil, 4 Tbsp lemon juice, 1 tsp Dijon mustard, 1 minced garlic clove, 1 tsp dried oregano, 1/2 tsp salt, and a few grinds of pepper until it turns cloudy and emulsified. 4. Drain and rinse your chickpeas. Dice your cucumbers, tomatoes, red bell pepper, and red onion into bite-size pieces. Chop your romaine and crumble your feta. 5. Build each jar BOTTOM to TOP in this exact order so nothing gets soggy: first 2 to 3 Tbsp dressing, then chickpeas, then the cooled quinoa, then cucumber, tomato, pepper, and onion, then your olives, then the feta, and finally pack the chopped romaine on top so it sits above the dressing and stays dry and crisp. 6. Seal the lids tightly. 7. Storage: refrigerate upright up to 4 days. Do not freeze, the cucumber and tomato turn mushy. 8. To eat: keep cold until lunch, then shake the closed jar hard for about 10 seconds so the dressing coats everything, and eat from the jar or pour into a bowl. No reheating, these are meant to be eaten cold.",
  "makes": 5,
  "season": "Lemon or Dijon mustard or garlic or olive oil",
  "note": "Omnivore, pescatarian, vegetarian. Contains feta (dairy) so NOT ovo or vegan per the dairy rule. Layered dry so it keeps 5 days; dressing on the bottom, greens on top. Eaten cold by shaking.",
  "carb": "Quinoa cooked",
  "fat": "Olive oil|Feta cheese|Olives ripe",
  "produce": "Cucumber raw|Tomato raw|Bell pepper red raw|Romaine lettuce|Onion raw",
  "extras": [
   [
    "Olives ripe",
    30
   ],
   [
    "Quinoa cooked",
    90
   ]
  ]
 },
 {
  "id": "smoky-black-bean-sweet-potato-vegan-meal-prep-bowls",
  "title": "Smoky Black Bean & Sweet Potato Vegan Meal-Prep Bowls",
  "slot": "lunch",
  "protein": "Black beans cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "Spoon quinoa into a bowl, add a portion of the roasted sweet potato and peppers, then the seasoned black beans and corn. Stir a handful of spinach through while it is warm so it wilts. Top with avocado and pumpkin seeds and a squeeze of lime.",
  "batchQ": 2, "prepMethod": "1. Equipment: 2 large sheet pans, parchment paper, 1 medium pot, a fine strainer, a skillet, a cutting board, a knife, and 5 containers. Heat the oven to 425F (this temperature caramelizes the sweet potato sugars for that deep roasted flavor). 2. Peel and dice your sweet potatoes into 1/2-inch cubes. Cut your red bell peppers and onion into 1/2-inch pieces. Spread the sweet potato on one pan and the peppers and onion on the other, each tossed with 1 Tbsp olive oil, 1/2 tsp salt, and 1 tsp ground cumin. Keep them in a single uncrowded layer so they roast and brown rather than steam. 3. Roast both pans 25 to 30 minutes, stirring once halfway, until the sweet potato is fork-tender and the edges caramelize. 4. Meanwhile cook the quinoa: rinse your quinoa in the strainer, add to the pot with water at a 1 to 2 ratio and a pinch of salt, boil, then cover and simmer 15 minutes until fluffy. 5. Make the smoky beans: drain and rinse your black beans. In the skillet over medium heat, warm 1 Tbsp olive oil, add 1 minced garlic clove, 1 to 2 tsp chopped chipotle in adobo, 1 tsp ground cumin, and 1/2 tsp smoked paprika and cook 1 minute until fragrant (blooming the chipotle and spices in oil spreads their flavor evenly). Add the beans and your corn and warm through 3 to 4 minutes. 6. Finishing touch: stir the juice of 1 lime into the beans off the heat. 7. Divide the quinoa into the 5 containers, then top each with an equal share of roasted sweet potato, peppers, and the bean-corn mix. Tuck a small handful of your raw spinach into each (it wilts pleasantly when reheated). Keep your avocado and pumpkin seeds separate and add fresh. 8. Storage: refrigerate up to 4 days; freeze extra portions up to 2 months (avocado and seeds are always added fresh, never frozen). 9. Reheat: microwave one container 2 to 3 minutes with a splash of water, stirring halfway. Top with fresh avocado, pumpkin seeds, and a squeeze of lime after heating.",
  "makes": 5,
  "season": "Chipotle in adobo or Cumin (ground) or garlic or olive oil or Lime",
  "note": "Fully vegan; spinach wilts on reheat, avocado and seeds added fresh.",
  "carb": "Sweet potato baked|Quinoa cooked",
  "fat": "Avocado raw|Pumpkin seeds",
  "produce": "Bell pepper red raw|Onion raw|Sweet corn cooked|Spinach raw",
  "extras": [
   [
    "Sweet corn cooked",
    60
   ],
   [
    "Pumpkin seeds",
    15
   ],
   [
    "Avocado raw",
    50
   ]
  ]
 },
 {
 "id": "big-batch-lentil-veg-tahini-grain-bowls",
 "title": "Big-Batch Lentil, Veg & Tahini Grain Bowls",
 "slot": "lunch",
 "protein": "Lentils cooked",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "Scoop bulgur into a bowl, add a portion of lentils and the roasted vegetables, and stir in a handful of spinach while warm. Drizzle the lemon-tahini sauce over the top.",
 "batchQ": 2, "prepMethod": "1. Equipment: 1 large sheet pan, parchment paper, 1 medium pot, a small bowl for sauce, a cutting board, a knife, and 5 containers. Heat the oven to 425F. 2. Cook the bulgur: add your bulgur to the pot with water at a 1 to 2 ratio and 1/2 tsp salt, boil, then cover and simmer 12 to 15 minutes until the water is absorbed and the grains are tender. Fluff with a fork. 3. If you are cooking lentils from dry, simmer them in plenty of water 20 to 25 minutes until tender but not mushy, then drain. If using canned, drain and rinse them. 4. Cut your carrots, zucchini, red bell peppers, and onion into 1/2-inch pieces. Spread on the lined sheet pan in a single uncrowded layer (crowding makes them steam and stay pale), toss with 2 Tbsp olive oil, 1 tsp ground cumin, 1 tsp ground coriander, and 1 tsp salt, and roast 22 to 25 minutes, stirring once, until the edges brown and the carrots are fork-tender. 5. Make the lemon-tahini sauce: whisk 1/3 cup tahini with the juice of 1 lemon, 1 minced garlic clove, 1/2 tsp ground cumin, 1/2 tsp salt, and 4 to 6 Tbsp warm water, adding the water a spoon at a time. It will seize and look grainy first, then loosen into a smooth, pourable dressing (this is normal). 6. Divide the bulgur into the 5 containers, top each with an equal share of lentils and roasted vegetables, and tuck a small handful of your spinach on top. 7. Store the tahini sauce in a separate small jar. Finishing touch: a sprinkle of fresh parsley and a pinch of smoked paprika or sumac over the sauce. 8. Storage: refrigerate the bowls up to 4 days and the sauce up to 5; freeze extra bowls (without sauce) up to 2 months. 9. Reheat: microwave one bowl 2 minutes with a splash of water until hot and the spinach wilts, then drizzle the tahini sauce over after heating so it does not break.",
 "makes": 5,
 "season": "Tahini or Lemon or garlic or Cumin (ground) or olive oil. Salt to taste as the lentils warm; undersalted lentils taste like nothing.",
 "note": "Vegan and fiber-rich; sauce kept separate to drizzle after reheating.",
 "carb": "Bulgur cooked",
 "fat": "Tahini \\(sesame butter\\)|Olive oil",
 "produce": "Carrots raw|Zucchini cooked|Bell pepper red raw|Spinach raw|Onion raw",
 "extras": [
  [
   "Spinach raw",
   30
  ],
  [
   "Olive oil",
   5
  ]
 ]
},
 {
  "id": "deli-turkey-cheddar-protein-boxes-no-cook",
  "title": "Deli Turkey & Cheddar Protein Boxes (No-Cook)",
  "slot": "lunch",
  "protein": "Turkey breast roasted|Egg whole cooked|Cheddar cheese",
  "diets": [
   "omnivore"
  ],
  "method": "Open the box and eat. Stack the turkey and cheddar with a little Dijon, alongside the hard-boiled egg, cut veggies, grapes, and almonds. Add a slice of whole wheat bread if you want it as a sandwich.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 small pot for the eggs, a cutting board, a knife, a slotted spoon, a bowl of ice water, and 4 divided meal-prep boxes (bento-style with sections works best). 2. Hard-boil the eggs the foolproof way: bring the pot of water to a gentle boil first, then lower your eggs in with a slotted spoon and cook at a steady simmer 11 minutes (starting in already-hot water makes them far easier to peel and sets the yolks fully without a green ring). Move them straight into the ice water for 5 minutes, then peel. 3. Slice or fold your roasted deli turkey breast into 4 equal portions. Cut your cheddar into sticks or slices in 4 portions. 4. Wash and cut your carrots and cucumbers into sticks and your red bell peppers into strips. Rinse your grapes. 5. Make a quick honey-Dijon dip: stir 4 Tbsp Dijon mustard with 1 tsp honey and 1 tsp water until smooth, and spoon into 4 tiny lidded cups (the honey rounds out the mustard sharpness). 6. Into each box, put one portion of turkey, one portion of cheddar, 1 to 2 hard-boiled eggs, a handful each of carrot, cucumber, and pepper, a small handful of grapes, a small handful of your almonds, and a cup of the honey-Dijon dip. Add a slice of whole wheat bread on the side if you want a sandwich. 7. Storage: refrigerate up to 4 days. Do not freeze, the cut vegetables and grapes turn watery. 8. To eat: no reheating, these are eaten cold straight from the box. If you packed bread, build the sandwich just before eating so it does not go soggy.",
  "makes": 4,
  "season": "Dijon mustard",
  "note": "Zero-cook deli box; eaten cold, keeps 4 days.",
  "carb": "Whole wheat bread",
  "fat": "Cheddar cheese|Almonds|Egg whole cooked",
  "produce": "Carrots raw|Cucumber raw|Bell pepper red raw|Grapes raw",
  "extras": [
   [
    "Almonds",
    20
   ],
   [
    "Grapes raw",
    80
   ]
  ]
 },
 {
  "id": "curried-tuna-chickpea-mason-jar-salads",
  "title": "Curried Tuna & Chickpea Mason-Jar Salads",
  "slot": "lunch",
  "protein": "Tuna light canned in water|Chickpeas cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "Shake the sealed jar for 10 seconds so the curry-yogurt dressing coats the tuna, chickpeas, and veg, then tip the romaine in and eat from the jar or pile onto toasted whole wheat bread as an open sandwich.",
  "batchQ": 2, "prepMethod": "1. Equipment: 4 wide-mouth quart mason jars with lids, a mixing bowl, a small dry skillet, a cutting board, a knife, and a spoon. 2. Bloom the curry powder for a deeper, rounder flavor: in the dry skillet over medium heat, toast 2 tsp curry powder for about 45 seconds until fragrant, then tip it into the mixing bowl to cool (raw curry powder tastes dusty; toasted tastes warm and nutty). 3. Make the base: to the bowl with the curry add your drained canned tuna, your drained and rinsed chickpeas, 1/2 cup nonfat Greek yogurt, 2 Tbsp light mayonnaise, 1 tsp Dijon mustard, the juice of 1 lemon, 1/2 tsp salt, and a pinch of black pepper. Mash lightly so it holds together but still has texture. 4. Finely dice your celery, carrots, and red onion and stir them in for crunch. Finishing touch: a small handful of chopped cilantro or a spoon of mango chutney if you like it sweet. 5. Build each jar bottom to top so the greens stay dry: spoon an equal share of the curried tuna-chickpea salad into the bottom of each jar, then add a small handful of your spinach, and finally pack your chopped romaine on top. 6. Seal the lids tightly. 7. Storage: refrigerate upright up to 4 days. Do not freeze, the yogurt-mayo dressing splits and the celery goes limp. 8. To eat: keep cold until lunch, shake the closed jar for about 10 seconds, then eat from the jar or scoop onto a slice of toasted whole wheat bread. Eaten cold, no reheating.",
  "makes": 4,
  "season": "Greek yogurt or Dijon mustard or Lemon",
  "note": "Pescatarian-friendly; eaten cold. Dense protein salad on the bottom keeps greens crisp.",
  "carb": "Whole wheat bread",
  "fat": "Mayonnaise light|Olive oil",
  "produce": "Celery raw|Carrots raw|Onion raw|Spinach raw|Romaine lettuce",
  "extras": [
   [
    "Chickpeas cooked",
    80
   ],
   [
    "Greek yogurt plain nonfat",
    40
   ]
  ]
 },
 {
 "id": "sheet-pan-buffalo-chicken-potato-meal-prep-bowls",
 "title": "Sheet-Pan Buffalo Chicken & Potato Meal-Prep Bowls",
 "slot": "lunch",
 "protein": "Chicken breast cooked",
 "diets": [
  "omnivore"
 ],
 "method": "Add a portion of the buffalo chicken, roasted potatoes, and broccoli to a bowl. Top with a handful of chopped romaine, carrot, and celery for crunch, and drizzle the Greek yogurt ranch over the top.",
 "batchQ": 2, "prepMethod": "1. Equipment: 2 large sheet pans, parchment paper, a cutting board, a knife, a meat thermometer, a large bowl, paper towels, and 5 containers. Heat the oven to 425F. 2. Pat your chicken breast dry and cut into 1-inch pieces (a dry surface is what gives you browning instead of steaming). Cut your potatoes into 3/4-inch cubes, skin on. Cut your broccoli into florets. 3. Put the chicken on one pan and the potatoes on the other, toss each with 1 Tbsp olive oil, 1/2 tsp salt, and 1/2 tsp garlic powder, and spread in a single uncrowded layer. Add the broccoli to any open space on the potato pan. 4. Roast both pans 22 to 25 minutes, stirring once, until the potatoes are golden and fork-tender, the broccoli edges char, and a thermometer in the thickest chicken reads 165F. Let the chicken rest 5 minutes. 5. Make the buffalo sauce: in the large bowl, whisk 1/3 cup cayenne hot sauce, 1 Tbsp melted butter, 1 tsp honey, and 1 minced garlic clove (the butter and honey tame the vinegar bite and help it cling). Add the rested chicken and toss to coat. 6. Divide the potatoes and broccoli into the 5 containers, then top each with an equal share of the buffalo chicken. Sprinkle a little of your cheddar over the chicken. 7. Keep the chopped romaine, carrot, celery, and Greek yogurt ranch in separate small containers to add fresh. 8. Storage: refrigerate the cooked bowls up to 4 days; freeze extra portions up to 2 months. 9. Reheat: microwave one container 2 to 3 minutes until hot, or air-fry at 380F for 6 minutes to re-crisp the potatoes. Top with the fresh romaine, carrot, celery, and a drizzle of Greek yogurt ranch after heating.",
 "makes": 5,
 "season": "Hot sauce or garlic or olive oil",
 "note": "Spicy batch chicken; crunchy salad and ranch added fresh after reheating.",
 "carb": "Potato baked flesh",
 "fat": "Greek yogurt ranch dressing|Cheddar cheese",
 "produce": "Broccoli cooked|Carrots raw|Celery raw|Romaine lettuce",
 "extras": [
  [
   "Greek yogurt ranch dressing",
   30
  ],
  [
   "Carrots raw",
   40
  ],
  [
   "Butter, salted",
   8
  ]
 ]
},
 {
  "id": "korean-gochujang-tofu-edamame-quinoa-jars",
  "title": "Korean Gochujang Tofu & Edamame Quinoa Jars",
  "slot": "lunch",
  "protein": "Tofu firm|Edamame cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "Shake the sealed jar for 10 seconds so the gochujang sauce coats the tofu, quinoa, and veg, then eat from the jar or tip into a bowl over the shredded cabbage and spinach.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 sheet pan, parchment paper, 1 medium pot, a fine strainer, a small jar for sauce, a cutting board, a knife, paper towels, and 5 wide-mouth quart mason jars with lids. Heat the oven to 425F. 2. Press the tofu: wrap your firm tofu blocks in paper towels and set a heavy pan on top for 15 minutes to squeeze out water (the drier the tofu, the crispier it roasts), then cut into 3/4-inch cubes. 3. Toss the tofu cubes with 1 Tbsp sesame oil, 1 Tbsp cornstarch, and a pinch of salt (the cornstarch gives a crisp shell). Spread on the lined pan in a single layer with space between cubes and roast 25 to 30 minutes, flipping once, until golden and firm on the outside. 4. Cook the quinoa: rinse your quinoa in the strainer, add to the pot with water at a 1 to 2 ratio and a pinch of salt, boil, then cover and simmer 15 minutes until fluffy. Spread on a plate to cool. 5. Make the sauce: in the small jar, whisk 3 Tbsp gochujang, 3 Tbsp soy sauce, 1 Tbsp sesame oil, 1 Tbsp rice vinegar, 1 tsp honey or maple, 1 minced garlic clove, 1 tsp grated fresh ginger, the juice of 1 lime, and 2 Tbsp water until smooth. 6. Cook or thaw your edamame. Cut your carrots, cucumbers, and red bell peppers into thin sticks and shred your cabbage. 7. Build each jar bottom to top so greens stay dry: 2 to 3 Tbsp sauce, then tofu, then cooled quinoa, then edamame, then carrot, cucumber, and pepper, and finally pack the shredded cabbage and your spinach on top. 8. Seal tightly. Finishing touch: a sprinkle of sesame seeds and your sesame chili edamame topping or sliced scallion when you eat. 9. Storage: refrigerate upright up to 4 days. Do not freeze, the cucumber and cabbage go limp. 10. To eat: shake the closed jar hard for about 10 seconds, then eat from the jar or pour into a bowl. Eaten cold; if you prefer it warm, tip everything except the cabbage and cucumber into a bowl, microwave 90 seconds, then stir the raw veg back in.",
  "makes": 5,
  "season": "Gochujang or soy sauce or sesame oil or garlic or Lime",
  "note": "Vegan; roasted tofu holds up all week, sauce at the bottom of the jar.",
  "carb": "Quinoa cooked",
  "fat": "Sesame oil|Sesame chili edamame",
  "produce": "Carrots raw|Cucumber raw|Bell pepper red raw|Spinach raw|Cabbage raw",
  "extras": [
   [
    "Edamame cooked",
    80
   ],
   [
    "Sesame oil",
    5
   ]
  ]
 },
 {
  "id": "big-batch-turkey-three-bean-chili-freezer-friendly",
  "title": "Big-Batch Turkey & Three-Bean Chili (Freezer-Friendly)",
  "slot": "lunch",
  "protein": "Turkey ground 93/7 cooked|Kidney beans cooked|Black beans cooked",
  "diets": [
   "omnivore"
  ],
  "method": "Ladle a portion of chili into a bowl and heat through. Top with a little shredded cheddar and a few cubes of avocado just before eating.",
  "batchQ": 3, "prepMethod": "1. Equipment: 1 large heavy pot or Dutch oven, a cutting board, a knife, a can opener, a wooden spoon, a colander, and 5 containers. 2. Dice your onion and red bell peppers and mince 3 garlic cloves. Peel and dice your sweet potato into 1/2-inch cubes. 3. Brown the turkey for flavor: heat 1 Tbsp olive oil in the pot over medium-high, add your ground turkey, and let it sit undisturbed 2 minutes so a brown crust forms, then break it up and cook 5 to 6 minutes more until no pink remains, a thermometer reads 165F, and the bottom of the pot has browned bits (that fond is pure flavor). Salt with 1 tsp salt. 4. Add the onion, pepper, garlic, and sweet potato and cook 5 minutes until softened, scraping up the browned bits. Stir in 2 Tbsp tomato paste, 1 Tbsp ground cumin, 2 tsp chili powder, 1 tsp smoked paprika, 1 tsp dried oregano, and 1 to 2 chopped chipotles in adobo, and cook 1 minute to bloom the spices in the oil. 5. Add one 28 oz can crushed tomatoes, your drained kidney, black, and pinto beans, and 1.5 cups water or low-sodium broth. 6. Bring to a boil, then lower to a simmer and cook uncovered 25 to 30 minutes, stirring now and then, until the sweet potato is fork-tender and the chili thickens. 7. Finishing touch: off the heat, stir in the juice of 1 lime and a handful of chopped fresh cilantro to lift the deep, smoky flavor. 8. Ladle the chili evenly into the 5 containers and let it cool before sealing. 9. Storage: refrigerate up to 4 days; this freezes very well, so freeze extra portions up to 3 months. 10. Reheat: microwave one container 3 to 4 minutes, stirring halfway, until steaming, or warm in a small pot with a splash of water. From frozen, microwave 5 to 6 minutes, stirring twice, or thaw overnight in the fridge first. Top with your cheddar and avocado after heating.",
  "makes": 5,
  "season": "Chipotle in adobo or Cumin (ground) or marinara sauce or garlic",
  "note": "Classic freezer chili; toppings added fresh after reheating.",
  "carb": "Pinto beans cooked|Sweet potato baked",
  "fat": "Cheddar cheese|Avocado raw",
  "produce": "Onion raw|Bell pepper red raw|Tomato raw|Garlic raw",
  "extras": [
   [
    "Cheddar cheese",
    20
   ],
   [
    "Avocado raw",
    40
   ]
  ]
 },
 {
  "id": "mediterranean-white-bean-tuna-deli-boxes",
  "title": "Mediterranean White Bean & Tuna Deli Boxes",
  "slot": "lunch",
  "protein": "Tuna light canned in water|White beans cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "Open the box and eat cold. Toss the white bean and tuna salad with the lemon dressing, scoop it over the arugula, and dip the pita wedges or eat alongside.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 mixing bowl, a cutting board, a sharp knife, a fine-mesh strainer, a small lidded jar for dressing, and 4 divided meal-prep boxes.\n2. Make the lemon-Dijon dressing: in the jar combine 5 Tbsp olive oil, the juice of 1 lemon (about 3 Tbsp), 1 tsp Dijon mustard, 1 small clove garlic finely grated, 1/2 tsp salt, 1/4 tsp black pepper, and 1/2 tsp dried oregano. Seal and shake hard for 20 seconds until it looks creamy and emulsified. Tasting note: it should be bright and a little sharp; that acidity is what wakes up the beans.\n3. Drain your tuna well and press it gently in the strainer so the boxes do not turn watery. Drain and rinse your white beans until the foam stops, then shake them dry.\n4. In the bowl combine your tuna, your white beans, and 1/4 of a red onion finely diced. Add half the dressing and fold gently with a spatula so the beans stay whole and creamy, not mashed. Let this sit 5 minutes so the beans drink up the dressing.\n5. Prep the vegetables: cut your cucumber into 1/2-inch half-moons, your tomato into wedges, and your red bell pepper into thin strips. Keep the tomato in its own corner so its juice does not soak everything.\n6. Portion into the 4 boxes: an equal share of the tuna-bean salad in the largest section, then the cucumber, tomato, pepper, and a handful of arugula in the others. Add a small spoon of olives and a sprinkle of crumbled feta over the salad. Pack 1 wedged pita per box on the side so it stays soft, and a tiny cup of the remaining dressing.\n7. Storage: refrigerate up to 4 days. Do not freeze; cucumber, tomato, and feta go watery and mushy when thawed.\n8. To eat (no reheating, served cold): drizzle the reserved dressing over the vegetables, pile the tuna-bean salad onto the arugula, finish with a squeeze of fresh lemon if you have it, and use the pita to scoop. Warm the pita 15 seconds in the microwave if you like it soft.",
  "makes": 4,
  "season": "Lemon or olive oil or Dijon mustard or garlic",
  "note": "Pescatarian deli box, eaten cold; keeps 4 days. Pita warmed briefly if desired.",
  "carb": "Pita bread|Quinoa cooked",
  "fat": "Olive oil|Feta cheese|Olives ripe",
  "produce": "Cucumber raw|Tomato raw|Bell pepper red raw|Arugula raw|Onion raw",
  "extras": [
   [
    "Feta cheese",
    30
   ],
   [
    "Olives ripe",
    25
   ]
  ]
 },
 {
  "id": "western-egg-muffin-cups-with-turkey-pepper-cheddar",
  "title": "Western Egg Muffin Cups with Turkey, Pepper & Cheddar",
  "slot": "breakfast",
  "protein": "Egg whole raw|Egg white raw|Turkey ground 93/7 cooked|Cheddar cheese",
  "diets": [
   "omnivore"
  ],
  "method": "Reheat 2 muffin cups in the microwave for about 45 to 60 seconds until hot in the center. Eat with a piece of fruit or a side of fruit.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 standard 12-cup nonstick muffin tin, nonstick spray or 12 silicone liners, 1 skillet, 1 large bowl, a whisk, and 4 meal-prep containers.\n2. Preheat the oven to 350F and grease every cup of the muffin tin generously, getting into the corners so the eggs release cleanly.\n3. Dice 1 red bell pepper into 1/4-inch pieces, finely chop 1/2 a small onion, and roughly chop 2 large handfuls of spinach.\n4. Set the skillet over medium heat and let it get hot for a minute. Add your ground turkey and cook 6 to 8 minutes, breaking it into small crumbles, until no pink remains and a thermometer reads 165F. Push the turkey to one side, add the pepper and onion to the bare pan, and let them sit 2 minutes to pick up a little color before stirring; add the spinach for the last 30 seconds just to wilt. Spread on a plate to cool 5 minutes so it does not start cooking the eggs.\n5. In the large bowl whisk your whole eggs and egg whites with 3/4 tsp salt, 1/2 tsp black pepper, 1/2 tsp garlic powder, and 1/2 tsp smoked paprika for a full 30 seconds until the color is uniform; whisking hard now makes the bake fluffy, not dense.\n6. Stir the cooled turkey and veg into the eggs. Ladle evenly into all 12 cups, filling each about 3/4 full, and top each with a pinch of shredded cheddar.\n7. Bake at 350F for 20 to 24 minutes, until the tops are puffed and a toothpick in the center comes out clean and the eggs no longer jiggle.\n8. Cool 5 minutes, run a thin knife around each cup, and lift them out. Cooling lets them set so they pop out whole.\n9. Portion 3 muffins per container into the 4 containers.\n10. Storage: fridge up to 4 days, or freeze in a zip bag up to 2 months.\n11. Reheat: microwave 2 to 3 from the fridge for 45 to 60 seconds, or from frozen 75 to 90 seconds, until hot in the middle. Finish with a dash of hot sauce or a spoon of salsa to keep them craveable.",
  "makes": 4,
  "season": "Salt, black pepper, garlic powder, paprika",
  "note": "High-protein grab-and-go. Swap potato side in or out to hit macros.",
  "carb": "Potato baked flesh",
  "fat": "Cheddar cheese",
  "produce": "Bell pepper red raw|Onion raw|Spinach raw",
  "extras": [
   [
    "Cheddar cheese",
    56
   ],
   [
    "Onion raw",
    60
   ]
  ]
 },
 {
 "id": "veggie-egg-white-bites-with-spinach",
 "title": "Veggie Egg-White Bites with Spinach",
 "slot": "breakfast",
 "protein": "Egg white raw|Egg whole cooked|Cottage cheese 2% lowfat",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "Microwave 3 bites for about 45 seconds until hot. Pair with fruit or whole grain toast.",
 "batchQ": 2, "prepMethod": "1. Equipment: 1 standard 12-cup muffin tin, 12 silicone liners or nonstick spray, 1 blender, 1 skillet, and 4 meal-prep containers.\n2. Preheat the oven to 325F (low and slow keeps egg whites tender, not rubbery) and grease or line all 12 cups.\n3. Dice your vegetables small and chop 2 handfuls of spinach.\n4. Heat the skillet over medium-high. Add the vegetables in a single layer with a pinch of salt and let them sit undisturbed 3 minutes so they brown and release their water before you stir; crowding makes them steam and go gray. Add the pepper and onion and cook 2 minutes, then the spinach for 30 seconds to wilt. Set aside.\n5. In the blender combine your egg whites, your cottage cheese, 3/4 tsp salt, 1/4 tsp black pepper, 1/2 tsp garlic powder, and 1/4 tsp onion powder. Blend 20 seconds until smooth and frothy; the cottage cheese is what makes these custardy instead of spongy.\n6. Spoon a heaping tablespoon of cooked veg into each cup, pour the egg-white mixture over to fill each 3/4 full, and top with a little shredded cheddar.\n7. Bake at 325F for 22 to 26 minutes, until the centers are set, slightly puffed, and no longer jiggle when you gently shake the pan.\n8. Cool 5 minutes, run a knife around each, and pop the bites out.\n9. Portion 3 bites per container into the 4 containers.\n10. Storage: fridge up to 4 days or freeze up to 2 months.\n11. Reheat: microwave 3 bites for 45 to 60 seconds from the fridge or about 90 seconds from frozen until hot in the center. A few cracks of black pepper and a dot of hot sauce on top right before eating make them pop.",
 "makes": 4,
 "season": "Salt, black pepper, garlic powder",
 "note": "Lower-fat, very high-protein bites. Vegetarian and pescatarian friendly (contains dairy, so not ovo or vegan).",
 "carb": "Potato baked flesh",
 "fat": "Cheddar cheese",
 "produce": "Spinach raw|Bell pepper red raw|Onion raw",
 "extras": [
  [
   "Cottage cheese 2% lowfat",
   120
  ],
  [
   "Cheddar cheese",
   40
  ]
 ]
},
 {
 "id": "sheet-pan-potato-pepper-egg-breakfast-bake",
 "title": "Sheet-Pan Potato, Pepper & Egg Breakfast Bake",
 "slot": "breakfast",
 "protein": "Egg whole raw|Egg white raw|Cheddar cheese",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "Cut one square and microwave 60 to 75 seconds until hot, or reheat in an air fryer at 350F for 4 minutes for crisp edges.",
 "batchQ": 2, "prepMethod": "1. Equipment: 1 rimmed sheet pan or 9x13 baking dish, parchment paper, 1 large bowl, a whisk, and 5 containers.\n2. Preheat the oven to 425F (high heat is what caramelizes potatoes instead of steaming them) and line the pan with parchment.\n3. Cut your potatoes into 1/2-inch cubes, dice 1 red bell pepper and chop 1/2 onion.\n4. Toss the potatoes and onion with 1 Tbsp olive oil, 1/2 tsp salt, 1/2 tsp smoked paprika, and 1/4 tsp black pepper. Spread in a single layer with space between the cubes so they roast and brown; pile them up and they will steam. Roast 18 minutes.\n5. Add the peppers to the pan and roast 7 more minutes, until the potato edges are golden and a fork slides through easily.\n6. While the veg roasts, whisk your whole eggs and egg whites with 1/2 tsp salt, 1/4 tsp black pepper, and 1/2 tsp garlic powder for 30 seconds until uniform.\n7. Lower the oven to 375F. Scatter 2 handfuls chopped spinach over the roasted veg, pour the egg mixture evenly across the whole pan, and sprinkle shredded cheddar on top.\n8. Bake 16 to 20 minutes, until the eggs are fully set, puffed, and no longer jiggle in the center.\n9. Cool 10 minutes, then cut into 5 equal squares and place one per container.\n10. Storage: fridge up to 4 days, or freeze up to 2 months wrapped tightly.\n11. Reheat: microwave one square 60 to 75 seconds with a splash of water, or air-fry at 350F for 4 minutes to bring back crisp potato edges. Top with a few dashes of hot sauce.",
 "makes": 5,
 "season": "Salt, black pepper, paprika, garlic powder",
 "note": "Hearty one-pan bake. Cheese makes it not vegan or ovo; pescatarian and vegetarian safe.",
 "carb": "Potato baked flesh",
 "fat": "Olive oil|Cheddar cheese",
 "produce": "Bell pepper red raw|Onion raw|Spinach raw",
 "extras": [
  [
   "Olive oil",
   14
  ],
  [
   "Cheddar cheese",
   56
  ]
 ]
},
 {
  "id": "freezer-breakfast-burritos-with-turkey-egg-black-bean",
  "title": "Freezer Breakfast Burritos with Turkey, Egg & Black Bean",
  "slot": "breakfast",
  "protein": "Egg whole raw|Egg white raw|Turkey ground 93/7 cooked|Black beans cooked|Cheddar cheese",
  "diets": [
   "omnivore"
  ],
  "method": "Unwrap, wrap loosely in a paper towel, and microwave 90 seconds to 2 minutes from frozen until steaming. Top with salsa.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 large skillet, 1 bowl, foil or parchment squares, and a freezer zip bag.\n2. Dice 1 red bell pepper and 1/2 onion into small pieces.\n3. Heat 1 tsp avocado oil in the skillet over medium-high. Add your ground turkey and cook 6 to 8 minutes, breaking it up, until no pink remains and a thermometer reads 165F. Sprinkle in 1 tsp cumin, 1 tsp chili powder, 1/2 tsp salt, and 1/2 tsp garlic powder and stir 30 seconds so the spices toast in the fat and bloom; this is what gives the filling depth instead of tasting raw and dusty.\n4. Add the pepper and onion, cook 3 minutes until softened, then stir in your black beans and 2 handfuls spinach until the spinach wilts. Scrape into a bowl.\n5. Wipe the skillet, whisk your whole eggs and egg whites until uniform, pour into the pan over medium-low, and gently push them around 3 to 4 minutes until just set and no longer wet. Pulling them off slightly soft keeps them from going rubbery after reheating. Fold into the turkey-bean mix and let everything cool to warm; filling hot burritos makes them soggy.\n6. Warm your tortillas briefly so they fold without cracking.\n7. Lay a tortilla flat, add a line of filling, sprinkle with shredded cheddar, fold in the sides, and roll tightly. Repeat.\n8. Wrap each burrito snugly in foil or parchment.\n9. Storage: fridge up to 4 days, or freeze in a labeled zip bag up to 2 months.\n10. Reheat from frozen: unwrap, wrap loosely in a paper towel, microwave 90 seconds to 2 minutes, flipping halfway, until steaming throughout; from the fridge, 60 to 75 seconds. For crisp edges, finish 2 minutes in a dry skillet or air fryer.\n11. Serve with salsa and a squeeze of lime.",
  "makes": 5,
  "season": "Cumin, chili powder, salt, garlic powder",
  "note": "Classic make-ahead burritos. Freezes exceptionally well.",
  "carb": "Mission Carb Balance tortilla burrito \\(large\\)",
  "fat": "Cheddar cheese|Avocado oil",
  "produce": "Bell pepper red raw|Onion raw|Spinach raw",
  "extras": [
   [
    "Salsa",
    60
   ],
   [
    "Cheddar cheese",
    84
   ],
   [
    "Black beans cooked",
    40
   ]
  ]
 },
 {
  "id": "vegan-tofu-black-bean-freezer-breakfast-burritos",
  "title": "Vegan Tofu & Black Bean Freezer Breakfast Burritos",
  "slot": "breakfast",
  "protein": "Tofu firm|Black beans cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "Unwrap, wrap loosely in a paper towel, microwave 90 seconds to 2 minutes from frozen until steaming. Top with salsa.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 large skillet, a clean kitchen towel, foil or parchment squares, and a freezer zip bag.\n2. Drain your firm tofu, wrap it in the towel, and press firmly for 1 minute to squeeze out water; dry tofu browns and firms up instead of stewing. Crumble it into pea-size pieces.\n3. Cut your sweet potato into 1/2-inch cubes and dice 1 red bell pepper and 1/2 onion.\n4. Heat 1 Tbsp avocado oil over medium. Add the sweet potato, cover, and cook 8 minutes, stirring occasionally, until a fork slides through easily.\n5. Add the pepper and onion and cook 3 minutes until softened.\n6. Push the veg aside, add the crumbled tofu to the bare pan, and cook 5 minutes, stirring now and then, until it firms up and any liquid cooks off.\n7. Sprinkle in 1 tsp turmeric, 1 tsp cumin, 1 tsp chili powder, 2 Tbsp nutritional yeast, 3/4 tsp salt, and 1/4 tsp black pepper and stir 30 seconds so the spices toast and bloom into the oil. Add your black beans and 2 handfuls spinach and cook 2 minutes until the spinach wilts and everything is hot. Taste and add a pinch more salt if it is flat. Let it cool to warm.\n8. Warm your tortillas so they fold without cracking, add a line of filling to each, fold in the sides, and roll tightly.\n9. Wrap each burrito snugly in foil or parchment.\n10. Storage: fridge up to 4 days or freeze in a labeled zip bag up to 2 months.\n11. Reheat from frozen wrapped loosely in a paper towel, microwave 90 seconds to 2 minutes flipping halfway until steaming, or 60 to 75 seconds from the fridge. Crisp 2 minutes in a dry skillet if you like. Top with salsa and fresh diced avocado, and a squeeze of lime.",
  "makes": 5,
  "season": "Turmeric, cumin, chili powder, nutritional yeast, salt",
  "note": "Fully plant-based, freezer-stable. Nutritional yeast gives a savory eggy flavor.",
  "carb": "Mission Carb Balance tortilla burrito \\(large\\)|Sweet potato baked",
  "fat": "Avocado oil|Avocado raw",
  "produce": "Bell pepper red raw|Onion raw|Spinach raw",
  "extras": [
   [
    "Nutritional yeast",
    16
   ],
   [
    "Salsa",
    60
   ],
   [
    "Black beans cooked",
    40
   ]
  ]
 },
 {
  "id": "peanut-butter-protein-pancake-batch-with-banana",
  "title": "Peanut Butter Protein Pancake Batch with Banana",
  "slot": "breakfast",
  "protein": "Egg whole raw|Whey protein powder|Cottage cheese 2% lowfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Microwave 3 pancakes 30 to 40 seconds, or toast them for crisp edges. Top with peanut butter, berries, and a drizzle of maple syrup.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 blender, 1 nonstick skillet or griddle, a spatula, a cooling rack, parchment paper, and 5 containers.\n2. In the blender combine your oats, your whey protein, your cottage cheese, your eggs, your banana, 1 tsp baking powder, 1 tsp vanilla, 1 tsp cinnamon, a pinch of salt, and about 1/2 cup water. Blend 30 seconds until smooth and pourable, then let it rest 3 minutes; this lets the oats hydrate and the baking powder start working so the pancakes are fluffy, not flat.\n3. Heat the nonstick skillet over medium and lightly grease it. Medium, not high, keeps protein pancakes from scorching before the inside cooks.\n4. Pour scant 1/4-cup pools of batter. Cook 2 to 3 minutes, until bubbles form across the surface and the edges look dry, then flip and cook 1 to 2 minutes more, until golden and the center springs back when pressed.\n5. Repeat, stacking finished pancakes on the rack (not on top of each other) so steam escapes and they do not turn soggy.\n6. Cool completely before packing for the same reason.\n7. Portion an equal share of pancakes into each of the 5 containers, separating layers with small parchment squares so they do not stick.\n8. Storage: fridge up to 4 days, or freeze flat in a zip bag with parchment between them up to 2 months.\n9. Reheat: microwave 3 to 4 pancakes 30 to 40 seconds, pop them in a toaster for crisp edges, or warm from frozen in a 350F oven for 5 minutes.\n10. Top with a spoon of warm peanut butter, fresh banana or blueberries, and a small drizzle of maple syrup.",
  "makes": 5,
  "season": "Cinnamon, baking powder, vanilla",
  "note": "Blender batter, no measuring flour. Freeze flat to keep them fluffy. Contains cottage cheese and whey (dairy), so not ovo or vegan.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Peanut butter smooth",
  "produce": "Banana raw|Blueberries raw",
  "extras": [
   [
    "Peanut butter smooth",
    32
   ],
   [
    "Maple syrup",
    30
   ]
  ]
 },
 {
  "id": "maple-cinnamon-baked-protein-oatmeal-squares-with-waln",
  "title": "Maple-Cinnamon Baked Protein Oatmeal Squares with Walnuts",
  "slot": "breakfast",
  "protein": "Egg whole raw|Whey protein powder|Milk 2% reduced fat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Microwave one square 45 to 60 seconds with a splash of milk, or eat cold. Top with extra berries.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 8x8 or 9x9 baking dish, parchment paper, 2 bowls, a whisk, and 5 containers.\n2. Preheat the oven to 350F and line the dish with parchment, leaving overhang on two sides so you can lift the slab out later.\n3. In one bowl stir together your oats, your whey protein, 1 1/2 tsp baking powder, 1 1/2 tsp cinnamon, 1/4 tsp nutmeg, and 1/4 tsp salt. Mixing the dry seasonings evenly means no bland or bitter bites.\n4. In the second bowl whisk your eggs, your milk, 1 mashed banana, 3 Tbsp maple syrup, and 1 tsp vanilla until smooth.\n5. Pour the wet into the dry and stir just until evenly moistened, then fold in your chopped walnuts and your blueberries. Do not overmix.\n6. Pour into the lined dish, spread level, and scatter a few extra walnuts and berries on top.\n7. Bake at 350F for 30 to 35 minutes, until the top is golden and set and a knife in the center comes out clean with no wet batter.\n8. Cool fully in the dish for 20 minutes, then lift out by the parchment and cut into 5 equal squares. Cooling lets it firm up so the squares hold together.\n9. Place one square per container.\n10. Storage: fridge up to 4 days or freeze up to 2 months.\n11. Reheat: microwave one square 45 to 60 seconds with a splash of milk, or eat cold. Top with extra berries, a spoon of Greek yogurt, or a thin drizzle of maple syrup.",
  "makes": 5,
  "season": "Cinnamon, baking powder, vanilla, salt",
  "note": "Cuts into clean squares; sturdy and meal-prep friendly. Contains whey and milk (dairy), so not ovo or vegan.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Walnuts",
  "produce": "Banana raw|Blueberries raw",
  "extras": [
   [
    "Maple syrup",
    40
   ],
   [
    "Walnuts",
    56
   ]
  ]
 },
 {
  "id": "triple-flavor-overnight-protein-oats-trio-pb-berry-moc",
  "title": "Triple-Flavor Overnight Protein Oats Trio (PB, Berry, Mocha)",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat|Whey protein powder|Milk 2% reduced fat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Grab a jar, stir, and eat cold straight from the fridge. Add a splash of milk if too thick.",
  "batchQ": 3, "prepMethod": "1. Equipment: 5 pint mason jars or lidded containers, measuring cups, and a spoon.\n2. Into each of the 5 jars add the base: your portion of oats, your portion of chia seeds, your portion of whey protein, your portion of Greek yogurt, your portion of milk, and a tiny pinch of salt (salt makes oats taste like more than just wet cereal). Stir each jar hard right after adding the protein so it dissolves with no dry clumps; clumps form if you wait.\n3. Stir your portion of peanut butter into every jar. For 2 jars (banana): add 1/2 tsp cinnamon, and a few slices of banana when you eat it; sliced banana browns in the jar.\n4. For 2 jars (berry): stir in 1/2 tsp vanilla. Add a handful of blueberries and chopped strawberries when you eat it so they stay firm.\n5. For the last jar (mocha): stir in 1 Tbsp cocoa powder, 1 tsp instant coffee if you have it, and an extra splash of milk since cocoa thickens. A pinch of cinnamon here deepens the chocolate.\n6. Stir each jar well one more time and seal the lids.\n7. Refrigerate at least 6 hours or overnight so the oats and chia soften and thicken.\n8. Storage: sealed in the fridge up to 3 days.\n9. To eat: add the fruit and enjoy cold straight from the jar. If it is too thick, stir in a splash of milk.\n10. Do not freeze; the yogurt and oats turn grainy when thawed.",
  "makes": 5,
  "season": "Cinnamon, vanilla, cocoa powder",
  "note": "Three flavors from one base (2 PB-banana, 2 berry, 1 mocha = 5 jars); no cooking. Contains yogurt, whey, and milk (dairy), so not ovo or vegan. Build dry-ish and they keep all week.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Chia seeds|Peanut butter smooth",
  "produce": "Banana raw|Blueberries raw|Strawberries raw",
  "extras": [
   [
    "Chia seeds",
    30
   ],
   [
    "Peanut butter smooth",
    32
   ]
  ]
 },
 {
  "id": "vanilla-chia-pudding-jars-with-berries-almond",
  "title": "Vanilla Chia Pudding Jars with Berries & Almond",
  "slot": "breakfast",
  "protein": "Pea & rice protein powder|Greek yogurt plain nonfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "Grab a jar and eat cold. Stir before eating and top with fresh berries and chopped almonds.",
  "batchQ": 3, "prepMethod": "1. Equipment: 1 large bowl, a whisk, 5 half-pint mason jars with lids, and a spoon.\n2. In the bowl whisk your chia seeds, your pea-and-rice protein, 2 1/2 cups unsweetened almond milk, 2 tsp vanilla, 1/2 tsp cinnamon, a tiny pinch of salt, and 2 Tbsp maple syrup until there are no protein clumps.\n3. Let the mixture sit 5 minutes, then whisk again hard to break up the clumps that form as the chia starts to gel. This second whisk is the single most important step; it is what prevents a lumpy pudding.\n4. Divide evenly among the 5 jars, filling each about 2/3 full, and seal the lids.\n5. Refrigerate at least 4 hours or overnight, shaking each jar once after the first 30 minutes so the seeds suspend evenly instead of sinking to the bottom.\n6. The pudding is ready when it is thick and spoonable like loose pudding.\n7. Storage: sealed in the fridge up to 5 days.\n8. To serve, top with fresh blueberries, sliced strawberries or raspberries, and a sprinkle of chopped almonds for crunch.\n9. Keep the almonds and berries separate until serving so they stay crisp and fresh.\n10. Eat cold; do not freeze, as thawed chia pudding turns watery.\n11. The optional Greek yogurt is only for an omnivore swap; the vegan base of pea-rice protein and almond milk has no dairy. A small drizzle of maple syrup on top is a nice finish if you like it sweeter.",
  "makes": 5,
  "season": "Vanilla, cinnamon, maple syrup",
  "note": "Vegan as written with pea-rice protein and almond milk; the Greek-yogurt swirl is an optional omnivore swap kept out of the base.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Chia seeds|Almonds",
  "produce": "Blueberries raw|Strawberries raw|Raspberries raw",
  "extras": [
   [
    "Almonds",
    56
   ],
   [
    "Maple syrup",
    40
   ]
  ]
 },
 {
 "id": "high-protein-cottage-cheese-breakfast-jars-with-berrie",
 "title": "High-Protein Cottage Cheese Breakfast Jars with Berries & Granola",
 "slot": "breakfast",
 "protein": "Cottage cheese 2% lowfat|Greek yogurt plain nonfat",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "Grab a jar and eat cold. Stir the cottage cheese layer, then top with the granola packed on the side so it stays crunchy.",
 "batchQ": 2, "prepMethod": "1. Equipment: 5 pint mason jars with lids, a bowl, a spoon, and 5 tiny zip bags or condiment cups for the granola.\n2. In the bowl stir together your cottage cheese, your Greek yogurt, 2 tsp vanilla, 1 tsp cinnamon, 2 Tbsp honey, a tiny pinch of salt, and 3 Tbsp chia seeds until evenly mixed. The salt and vanilla turn plain cottage cheese into something that tastes like cheesecake.\n3. Let it sit 5 minutes so the chia begins to thicken the mixture, then stir once more.\n4. Divide the cottage cheese mixture evenly among the 5 jars.\n5. Keep the blueberries and sliced strawberries in a small separate tub per jar; cut fruit weeps into the cottage cheese by day two.\n6. Do NOT add the granola to the jars; instead portion your granola into a separate small zip bag or lidded cup per jar so it stays crunchy. Granola sitting in liquid goes soft within hours.\n7. Seal the jars and store in the fridge up to 4 days; keep the granola bags at room temperature.\n8. To eat, tip the fruit and granola on top, add fresh banana slices if you like, and enjoy cold.\n9. Do not freeze, as cottage cheese turns grainy and watery when thawed.\n10. If a jar releases a little liquid, just stir it back in before topping. A thin extra drizzle of honey on top is a nice finish.",
 "makes": 5,
 "season": "Vanilla, cinnamon, honey",
 "note": "Very high protein. Contains dairy and honey, so not ovo or vegan. Granola packed separately is the trick to avoid sogginess.",
 "carb": "Granola high-protein|Oats dry \\(raw\\)",
 "fat": "Chia seeds|Almonds",
 "produce": "Blueberries raw|Strawberries raw",
 "extras": [
  [
   "Granola high-protein",
   120
  ],
  [
   "Honey",
   42
  ]
 ]
},
 {
  "id": "pumpkin-pie-baked-oatmeal-cups-with-pecans",
  "title": "Pumpkin Pie Baked Oatmeal Cups with Pecans",
  "slot": "breakfast",
  "protein": "Egg whole raw|Whey protein powder|Milk 2% reduced fat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Microwave 2 cups 40 to 50 seconds, or eat cold. Top with a little Greek yogurt or maple syrup.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 standard 12-cup muffin tin, 12 silicone liners or nonstick spray, 2 bowls, and 4 containers.\n2. Preheat the oven to 350F and line or grease all 12 cups.\n3. In one bowl stir together your oats, your whey protein, 1 1/2 tsp baking powder, 2 tsp pumpkin pie spice, 1 tsp cinnamon, and 1/4 tsp salt. Spreading the spices through the dry mix evenly is what gives every cup that warm pumpkin-pie flavor.\n4. In the second bowl whisk your eggs, your canned pumpkin, your milk, 3 Tbsp maple syrup, 1 mashed banana, and 1 tsp vanilla until smooth.\n5. Pour the wet into the dry and stir until fully moistened, then fold in your chopped pecans.\n6. Spoon the batter evenly into all 12 cups, filling each nearly to the top, and press a few extra pecan pieces on top.\n7. Bake at 350F for 24 to 28 minutes, until the tops are firm, spring back when lightly pressed, and a toothpick comes out clean.\n8. Cool 10 minutes in the pan, then lift the cups out so they firm up and release cleanly.\n9. Portion 3 cups per container into the 4 containers.\n10. Storage: fridge up to 4 days or freeze up to 2 months.\n11. Reheat: microwave 2 to 3 cups 40 to 50 seconds from the fridge or about 75 seconds from frozen, or eat cold. Top with a spoon of Greek yogurt or a drizzle of maple syrup.",
  "makes": 4,
  "season": "Pumpkin pie spice, cinnamon, baking powder, vanilla, maple syrup",
  "note": "Portable baked-oatmeal cups; pumpkin keeps them moist for days. Contains egg, whey, and milk; egg and dairy mean not vegan, and dairy means not ovo.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Pecans",
  "produce": "Pumpkin canned|Banana raw",
  "extras": [
   [
    "Pecans",
    56
   ],
   [
    "Maple syrup",
    40
   ]
  ]
 },
 {
  "id": "peanut-butter-chocolate-chip-no-bake-protein-balls",
  "title": "Peanut Butter Chocolate Chip No-Bake Protein Balls",
  "slot": "snack",
  "protein": "Whey protein powder|Pea & rice protein powder|PBfit powdered peanut butter",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Grab 2 to 3 balls (one portion) from the fridge and eat cold. No reheating needed. If they feel too firm straight from the fridge, let them sit on the counter 5 minutes to soften.",
  "batchQ": 3, "prepMethod": "1. Equipment: 1 large mixing bowl, measuring cups and spoons, a spoon or spatula, an airtight container, and clean hands.\n2. Add to the bowl: your oats, your peanut butter, your protein powder (whey or pea-rice), your powdered peanut butter (PBfit), 3 Tbsp honey, 2 Tbsp chia seeds, your dark chocolate chips, 1/2 tsp ground cinnamon, and a pinch of salt. The salt and cinnamon are small but they make the peanut butter and chocolate taste fuller.\n3. Stir hard until everything sticks together into one thick dough. If it is too dry to clump, add water 1 Tbsp at a time (up to 3) until it holds when pressed. If it is too sticky to roll, add 2 more Tbsp of dry oats.\n4. With clean damp hands (so the dough does not stick), scoop a heaping tablespoon and roll into a ball about 1 inch wide. Repeat with the rest of the dough.\n5. Place the balls in the airtight container in a single layer. Chill in the fridge at least 30 minutes so they firm up before eating.\n6. Portion an equal number of balls per serving across your servings; if your container is large you can store them all together.\n7. Storage: fridge up to 7 days. To freeze, lay the balls on a plate, freeze 1 hour until solid, then move to a freezer bag for up to 2 months.\n8. To eat from frozen, move a few balls to the fridge the night before, or leave on the counter 15 minutes until soft. They are a no-cook, eat-cold snack.",
  "makes": 5,
  "season": "Cinnamon",
  "note": "No-bake (no cook step). As written with whey and honey it is omnivore/pescatarian/vegetarian only; whey is dairy so it is not ovo, and whey plus honey mean it is not vegan.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Peanut butter smooth",
  "extras": [
   [
    "Honey",
    15
   ],
   [
    "Chia seeds",
    10
   ],
   [
    "Dark chocolate chips no sugar added",
    10
   ]
  ]
 },
 {
 "id": "crunchy-veggie-cups-with-hummus",
 "title": "Crunchy Veggie Cups with Hummus & Herbed Yogurt Dip",
 "slot": "snack",
 "protein": "Greek yogurt plain nonfat",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "Grab one veggie set and both dip cups. Peel the lids off and dip the sticks straight in, hummus for one bite and the herbed yogurt for the next. Eat cold, no reheating.",
 "batchQ": 2, "prepMethod": "1. Equipment: cutting board, sharp knife, vegetable peeler, 10 small lidded dip cups (about 2 oz) plus 5 medium meal-prep containers, a small bowl, and paper towels.\n2. Wash all the vegetables and peel your carrots. Cut your carrots into sticks about 3 inches long and 1/2 inch thick. Cutting them into even sticks keeps them crisp and easy to dip.\n3. Halve your red bell peppers, remove the seeds and white ribs, and slice into strips about 1/2 inch wide.\n4. Cut your cucumber into sticks about 3 inches long and 1/2 inch thick.\n5. Cut your celery into sticks about 3 inches long.\n6. Spoon an equal share of your hummus into each of the 5 dip cups. For extra flavor, drizzle 1/2 tsp olive oil over each, dust with a pinch of smoked paprika, and add a tiny squeeze of lemon; this little finish makes plain hummus taste like a restaurant dip.\n7. In a small bowl, stir your Greek yogurt with a squeeze of lemon, a pinch of garlic powder, salt and black pepper until smooth, then divide it between the other 5 dip cups. This is the protein of the snack, so weigh the yogurt rather than eyeballing it.\n8. Pack each meal-prep container with a mix of the veggie sticks, dividing evenly into the 5 containers, and tuck one hummus cup and one yogurt cup beside the veggies. Lay a folded half paper towel under the veggies to absorb moisture and keep them crisp.\n9. Storage: fridge up to 5 days. Do not freeze; the raw vegetables go limp and watery.\n10. To eat: enjoy cold straight from the fridge, no cooking or reheating. If any veggies soften, a 10-minute soak in ice water re-crisps them.",
 "makes": 5,
 "season": "Lemon, garlic powder, salt and black pepper in the yogurt dip; smoked paprika over the hummus.",
 "note": "A no-cook snack built on two dips: the herbed yogurt carries the protein and the hummus carries the fat, so the veggie sticks stay the crunchy part and the macros still land.",
 "carb": "Carrots raw",
 "fat": "Hummus|Olive oil",
 "produce": "Carrots raw|Bell pepper red raw|Cucumber raw|Celery raw"
},
 {
  "id": "strawberry-cheesecake-cottage-cheese-jars-with-granola",
  "title": "Strawberry Cheesecake Cottage Cheese Jars with Granola",
  "slot": "snack",
  "protein": "Cottage cheese 2% lowfat",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Grab one jar. Eat the cottage cheese and strawberries cold, then stir in or sprinkle the granola packet on top just before eating so it stays crunchy.",
  "batchQ": 2, "prepMethod": "1. Equipment: 5 small mason jars or lidded jars (8 to 12 oz), 5 tiny separate cups or zip bags for the granola, cutting board, knife, and a spoon.\n2. Wash and hull your strawberries, then slice them into quarters.\n3. To each jar add, in this order: your portion of cottage cheese, 2 tsp honey drizzled on top, 2 tsp chia seeds, a small splash of vanilla, and a tiny pinch of salt. The vanilla, honey, and salt are what turn cottage cheese into a cheesecake-tasting jar.\n4. Do NOT add the granola yet. Put your portion of granola into a separate small cup or zip bag for each jar (5 total) so it stays crunchy; granola sitting in the jar goes soft fast. Do the same with the sliced strawberries, one small tub per jar, so they do not weep into the cottage cheese.\n5. Lightly stir each jar once to mix the chia, honey, and vanilla into the cottage cheese, then snap on the lids.\n6. This makes 5 jars, one serving each, plus 5 granola packets.\n7. Storage: keep the jars in the fridge up to 4 days. The chia thickens the mix into a creamier, cheesecake-like texture by day 1. Do not freeze; cottage cheese turns grainy when thawed.\n8. To eat: open a jar, add the strawberries, sprinkle one granola packet over the top, and enjoy cold, no cooking or reheating.",
  "makes": 5,
  "season": "",
  "note": "Contains dairy and honey, so not vegan or ovo. Great high-protein vegetarian and pescatarian snack.",
  "carb": "Granola high-protein",
  "fat": "Granola high-protein",
  "produce": "Strawberries raw",
  "extras": [
   [
    "Honey",
    10
   ],
   [
    "Chia seeds",
    10
   ]
  ]
 },
 {
  "id": "crispy-salt-and-vinegar-roasted-chickpeas",
  "title": "Crispy Salt and Vinegar Roasted Chickpeas",
  "slot": "snack",
  "protein": "Chickpeas cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "Grab one container of roasted chickpeas and eat at room temperature, cold, or quickly re-crisped. No cooking needed once they are roasted.",
  "batchQ": 2, "prepMethod": "1. Equipment: 1 rimmed sheet pan, parchment paper, a clean kitchen towel, a mixing bowl, and 5 small airtight containers or snack jars.\n2. Heat the oven to 400F and line the sheet pan with parchment.\n3. Drain and rinse your chickpeas, then spread them on the towel. Pat very dry and roll them around for a full minute; the drier they are, the crispier they get. Rub off any loose skins, which are what keep chickpeas from crisping.\n4. Put the chickpeas in the bowl, add 2 Tbsp olive oil and 1 tsp salt, and toss until evenly coated. Spread in a single layer with space between them; crowd the pan and they steam instead of crisping.\n5. Roast at 400F for 30 to 40 minutes, shaking the pan every 10 minutes, until they are deep golden and rattle dry and crunchy when you shake the pan. If any are still soft inside, give them 5 more minutes.\n6. As soon as they come out, toss the hot chickpeas with 1 Tbsp vinegar, an extra pinch of salt, and 1/4 tsp onion powder for true salt-and-vinegar flavor, then let the vinegar steam off for 2 minutes so they stay crunchy.\n7. Cool completely on the pan, about 20 minutes; they crisp up more as they cool. Divide evenly into the 5 containers.\n8. Storage: keep at room temperature with the lid slightly cracked (a fully sealed lid traps steam and softens them) for up to 4 days. Do not refrigerate; the moisture makes them chewy. Store them this way only if every one is dry and crunchy all the way through; if any are still soft in the middle, keep that batch in the fridge and re-crisp before eating.\n9. If they lose crunch, spread on a pan and re-crisp in a 350F oven or air fryer for 5 minutes, then cool. They are a crunchy, no-reheat snack.",
  "makes": 5,
  "season": "",
  "note": "Plant-based and vegan. Chickpeas are both the protein and the carb here.",
  "carb": "Chickpeas cooked",
  "fat": "Olive oil"
 },
 {
  "id": "banana-bread-protein-muffins",
  "title": "Banana Bread Protein Muffins",
  "slot": "snack",
  "protein": "Whey protein powder|Egg whole raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian"
  ],
  "method": "Grab 2 muffins (one portion) and eat at room temperature, or warm one in the microwave for 12 to 15 seconds for a fresh-baked feel.",
  "batchQ": 2, "prepMethod": "1. Equipment: blender or large bowl with a fork, a 12-cup muffin tin, paper liners or nonstick spray, a measuring cup, a cooling rack, and an airtight container.\n2. Heat the oven to 350F and line 10 cups of the muffin tin with paper liners or grease them well.\n3. Peel your very ripe bananas (lots of brown spots means more natural sweetness) and mash them smooth with a fork, or drop them in the blender.\n4. Add your eggs, your oats, your whey protein, your peanut butter, 1 1/2 Tbsp honey, 1 tsp ground cinnamon, 1/4 tsp nutmeg, 1/2 tsp baking soda, and a pinch of salt. Blend or stir until you have a smooth, pourable batter. The salt and warm spices are what give these real banana-bread flavor. Fold in your chopped walnuts by hand.\n5. Divide the batter evenly among the 10 lined cups, filling each about 3/4 full.\n6. Bake at 350F for 18 to 22 minutes, until the tops spring back when lightly pressed and a toothpick in the center comes out clean with no wet batter.\n7. Cool in the tin 5 minutes, then move to the rack to cool completely, about 15 more minutes; protein muffins turn gummy if packed warm.\n8. Portion an equal number of muffins per serving across your servings and store in the airtight container.\n9. Storage: fridge up to 5 days. To freeze, wrap muffins individually and freeze up to 2 months.\n10. Reheat: microwave a fridge muffin 12 to 15 seconds, or a frozen one 30 to 40 seconds, until just warm. A thin smear of peanut butter on a warm muffin is a great finish.",
  "makes": 5,
  "season": "Cinnamon",
  "note": "Contains egg, whey (dairy), and honey. Omnivore, pescatarian, and vegetarian are fine; dairy means not ovo, and dairy plus egg plus honey mean not vegan. Add a splash of milk if the batter is too thick to pour.",
  "carb": "Oats dry \\(raw\\)",
  "fat": "Walnuts|Peanut butter smooth",
  "produce": "Banana raw",
  "extras": [
   [
    "Cinnamon ground",
    3
   ],
   [
    "Honey",
    20
   ]
  ]
 },
 {
  "id": "spicy-sesame-soy-edamame-snack-cups",
  "title": "Spicy Sesame Soy Edamame Snack Cups",
  "slot": "snack",
  "protein": "Edamame cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo",
   "vegan"
  ],
  "method": "Grab one cup and eat cold straight from the fridge, or microwave 30 to 45 seconds for warm edamame. Pop the beans out of the pods with your teeth if using pods, or eat shelled beans by the spoonful.",
  "batchQ": 3, "prepMethod": "1. Equipment: 1 large pot, a colander, a mixing bowl, a spoon, and 5 small lidded containers.\n2. Bring a large pot of water to a rolling boil and salt it generously (about 1 Tbsp); salting the water seasons the edamame from the inside. Add your edamame (shelled, or in the pod if you like to eat them that way).\n3. Boil 4 to 5 minutes, until the beans are bright green and tender with a slight bite. Drain in the colander and rinse briefly under cold water to stop the cooking and lock in the color.\n4. Shake off excess water, then tip the edamame into the bowl.\n5. Add 1 Tbsp sesame oil, 1 Tbsp soy sauce, 1 1/2 tsp sriracha, 1/2 tsp rice vinegar, and 1 tsp sesame seeds. Toss until every bean is glossy and coated. The splash of vinegar brightens the soy and sesame so it tastes like a restaurant snack.\n6. Divide evenly into the 5 containers and snap on the lids.\n7. Storage: fridge up to 4 days. To freeze, portion into freezer bags and freeze up to 2 months.\n8. To eat: enjoy cold, or microwave a cup 30 to 45 seconds (60 to 90 seconds from frozen) until warmed through. A splash of water before microwaving keeps them from drying out. Finish with extra sesame seeds or a pinch of chili flakes.",
  "makes": 5,
  "season": "Toss the hot edamame with soy sauce or tamari, a splash of rice vinegar, grated garlic, a pinch of chili flakes or a little sriracha, and a sprinkle of sesame seeds.",
  "note": "Plant-based and vegan. Edamame is both the protein and the carb. Leave out the sriracha for a kid-friendly mild version.",
  "carb": "Edamame cooked",
  "fat": "Sesame oil",
  "extras": [
   [
    "Soy sauce",
    15
   ],
   [
    "Sriracha / hot sauce",
    8
   ]
  ]
 },
 {
 "id": "italian-beef-mozzarella-stuffed-peppers",
 "title": "Italian Beef & Mozzarella Stuffed Peppers",
 "slot": "dinner",
 "protein": "Beef ground 97/3 cooked",
 "diets": [
  "omnivore"
 ],
 "method": "1. Heat the oven to 400F. Slice the top off the bell pepper, pull out the seeds and ribs, and stand it cut-side up in a small baking dish. 2. Brown the ground beef in a skillet over medium-high, breaking it up, until no pink remains; season with garlic, oregano, basil, salt and pepper. 3. Stir the cooked rice and the marinara into the beef. 4. Pack the filling into the pepper and mound it up. 5. Top with the shredded mozzarella. 6. Cover with foil and bake about 25 minutes, then uncover and bake 10 to 15 more until the pepper is tender and the cheese is melted and golden. Finish with the grated parmesan and fresh basil.",
 "batchQ": 3, "prepMethod": "BATCH METHOD (makes 4 to 5 servings). Equipment: 9x13 baking dish, large heavy skillet or cast iron, sheet pan, foil, paper towels.\n\n1) PREP THE VESSELS. Heat the oven to 400F. Slice the tops off your red bell peppers and pull out the seeds and white ribs. Stand them in the baking dish; if one tips, shave a thin sliver off the bottom so it sits flat (do not cut through). Rub the outsides with a little olive oil and a pinch of salt. Roast the empty peppers 15 minutes while you build the filling. This pre-roast gives you tender, sweet peppers instead of raw-crunchy or watery ones.\n\n2) SWEAT THE AROMATICS. Dice your onion small (1/4 inch). Warm 1 Tbsp olive oil in the skillet over medium heat, add the onion with a pinch of salt, and cook 4 to 5 minutes until soft and golden at the edges. Push to one side.\n\n3) BROWN THE BEEF HARD. Pat your ground beef dry with a paper towel first (surface moisture is the enemy of browning). Add it to the hot skillet and press it into a flat layer. Let it sit undisturbed 3 to 4 minutes to build a deep brown crust, then break it up. Do not crowd or stir constantly or it steams gray instead of searing. As it cooks, season the batch with 2 tsp Italian seasoning, 1.5 tsp garlic powder, 1 tsp onion powder, 1 tsp salt, 1/2 tsp black pepper, and 1/4 tsp red pepper flakes. Salting early seasons all the way through. Cook until no pink remains and a thermometer reads 160F, about 6 to 7 minutes total.\n\n4) BUILD THE FILLING. Stir in your cooked white rice. Pour in 3/4 cup marinara for moisture and tang, plus 2 Tbsp grated Parmesan. Simmer 2 minutes so it binds. Taste and adjust salt. Off heat, fold in half of your fat-free mozzarella so it melts into the filling.\n\n5) STUFF AND BAKE. Spoon the filling into your roasted peppers, mounding it. Top each with the remaining fat-free mozzarella. Cover the dish with foil and bake at 400F for 20 minutes, then uncover and bake 10 more minutes until the cheese is melted and the pepper edges char slightly. Fat-free mozzarella melts softer than full-fat, so the uncovered blast helps it set and brown.\n\n6) FINISH. Rest 5 minutes (filling firms up and holds its shape). Finish with a squeeze of fresh lemon or a little chopped fresh basil and a last dusting of Parmesan. Bright acid lifts the whole dish.\n\nDIVIDE & STORE: One to two stuffed peppers per container. Fridge up to 4 days in airtight containers. Freeze up to 2 months (wrap each pepper, then bag); thaw overnight in the fridge. REHEAT: oven or air fryer at 350F for 8 to 12 minutes to re-melt the cheese and keep the pepper from going mushy, or microwave 2 to 3 minutes with a splash of water and a loose cover. Also good cold the next day.\n\nSINGLE SERVING: Halve one pepper, fill with about 1/2 cup browned seasoned beef mixed with 1/4 cup cooked rice, a spoon of marinara, and a pinch of the seasoning blend above; top with mozzarella and bake at 400F for 18 to 20 minutes.",
 "makes": 4,
 "season": "Year-round; peppers are best and cheapest late summer through early fall.",
 "note": "The girlfriend's amazing version, built for batch prep: extra-lean 97/3 beef and fat-free mozzarella keep it lean while marinara, Parmesan, and a pre-roast on the peppers keep it crave-worthy. Naturally gluten-free.",
 "carb": "White rice cooked",
 "fat": "Olive oil",
 "produce": "Bell pepper cooked",
 "extras": [
  [
   "Mozzarella fat-free",
   40
  ],
  [
   "Marinara sauce",
   40
  ],
  [
   "Parmesan cheese shredded",
   10
  ]
 ]
},
 {
 "id": "southwest-black-bean-cheddar-stuffed-peppers",
 "title": "Southwest Black Bean & Cheddar Stuffed Peppers",
 "slot": "dinner",
 "protein": "Black beans cooked",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Heat the oven to 400F. Slice the top off the bell pepper, remove the seeds and ribs, and stand it cut-side up in a baking dish. 2. In a bowl, mix the black beans, cooked rice, and diced onion with cumin, chili powder, garlic, smoked paprika, and salt. 3. Pack the filling into the pepper. 4. Top with the shredded cheddar. 5. Cover with foil and bake about 25 minutes, then uncover and bake 10 to 15 more until the pepper is tender and the cheese melts. Finish with cilantro, a squeeze of lime, and salsa or pico if you like.",
 "batchQ": 3, "prepMethod": "BATCH METHOD (makes 4 to 5 servings). Equipment: 9x13 baking dish, large skillet, small dry pan for toasting spices, sheet pan, foil.\n\n1) PREP THE VESSELS. Heat the oven to 400F. Cut the tops off your red bell peppers, remove seeds and ribs, and stand them in the baking dish (shave a flat spot on any wobbler without piercing it). Rub outsides with a little olive oil and a pinch of salt. Roast empty 15 minutes for tender, sweet peppers.\n\n2) BLOOM THE SPICES. In a small dry pan over medium heat, toast 2 tsp cumin, 2 tsp smoked paprika, 1 tsp chili powder, and 1/2 tsp dried oregano for 30 to 60 seconds until fragrant. Toasting wakes up the oils and is the single biggest flavor upgrade here. Tip into a bowl.\n\n3) SAUTE AND CARAMELIZE. Dice your onion small. Warm 1 Tbsp olive oil in the skillet over medium-high, add the onion with a pinch of salt, and cook 5 to 6 minutes until soft with browned edges (caramelization adds sweetness). Add 2 minced garlic cloves for the last 30 seconds.\n\n4) BUILD THE FILLING. Pat your black beans dry, then add them to the skillet along with the bloomed spices, 1 tsp salt, and 1/2 tsp black pepper; cook 2 minutes, lightly mashing about a quarter of the beans so the filling binds. Stir your cooked brown rice in with the salsa. Simmer 3 minutes until thick, not soupy (excess liquid makes peppers weep). Off heat, fold in half of your reduced-fat cheddar.\n\n5) STUFF AND BAKE. Mound the filling into your roasted peppers. Top with the remaining reduced-fat cheddar. Cover with foil, bake at 400F for 20 minutes, uncover, and bake 10 more until the cheese melts and bubbles and the edges char.\n\n6) FINISH. Rest 5 minutes. Finish with fresh lime juice, chopped cilantro, and a spoon of pico de gallo or Greek-yogurt crema. The lime and herbs make it taste fresh, not heavy.\n\nDIVIDE & STORE: One to two peppers per container. Fridge up to 4 days. Freeze up to 3 months; thaw overnight in the fridge. REHEAT: oven or air fryer at 350F for 8 to 12 minutes to re-melt the cheese, or microwave 2 to 3 minutes with a splash of water under a loose cover. Great cold as a grain-bowl topping.\n\nSINGLE SERVING: Halve one pepper, fill with about 1/2 cup black beans mashed lightly with 1/4 cup cooked brown rice, a spoon of salsa, and a pinch of the toasted spice blend; top with cheddar and bake at 400F for 18 to 20 minutes.",
 "makes": 4,
 "season": "Year-round; best with peak-season red peppers in late summer.",
 "note": "Meatless but loaded with protein and fiber from black beans plus melty reduced-fat cheddar. Toasted spices and a bright lime-cilantro finish make it crave-worthy. Vegetarian and gluten-free.",
 "carb": "Brown rice cooked",
 "fat": "Olive oil",
 "produce": "Bell pepper cooked",
 "extras": [
  [
   "Cheese reduced-fat cheddar",
   35
  ],
  [
   "Onion raw",
   30
  ],
  [
   "Salsa",
   50
  ]
 ]
},
 {
  "id": "garlic-herb-chicken-with-rice-broccoli",
  "title": "Garlic-Herb Chicken with Rice & Broccoli",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Per 1 lb chicken: 3/4 tsp kosher salt, 1/2 tsp black pepper, 1 tsp garlic powder, 1 tsp dried Italian herbs (or 1/2 tsp each oregano + thyme), plus 2 cloves fresh minced garlic and 1 Tbsp olive oil rubbed in. Finish off-heat with a squeeze of fresh lemon and chopped parsley. Toss broccoli in 1 tsp olive oil, a pinch of salt, and a little garlic powder before roasting.",
  "method": "Pat chicken VERY dry (dry surface browns instead of steaming). Rub with oil, then salt, pepper, garlic powder, herbs, and fresh garlic. Sear in a hot pan 5-6 min per side to 165F; don't move it the first 4 min so a crust forms. Rest 5 min before slicing. Roast broccoli at 425F for 18-20 min until edges char. Steam the rice.",
  "note": "Garlic powder coats the whole surface for even browning while fresh garlic adds a brighter punch. Dried herbs bloom in the hot oil, and the final lemon adds acid to cut richness. Charred broccoli edges bring a roasted, slightly sweet bitterness against the savory chicken.",
  "simple": true
 },
 {
  "id": "lemon-pepper-chicken-with-quinoa-asparagus",
  "title": "Lemon-Pepper Chicken with Quinoa & Asparagus",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "carb": "Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Asparagus cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Per 1 lb chicken: 1 tsp kosher salt, 1.5 tsp coarse-cracked black pepper, zest of 1 lemon, 1 tsp garlic powder, 1 Tbsp olive oil. After cooking, squeeze the juice of half that lemon over the top. Roughly 1 part salt : 1.5 parts cracked pepper : zest of a whole lemon. Drizzle asparagus with olive oil, salt, and a little lemon zest.",
  "method": "Pat chicken dry. Zest the lemon onto the chicken, then rub in salt, cracked pepper, garlic powder, and oil. Sear in a hot pan 5-6 min per side to 165F. Squeeze fresh lemon juice over at the end (zest before for aroma, juice after to stay bright). Rest 5 min. Roast asparagus at 425F for 10-12 min. Cook quinoa in broth instead of water.",
  "note": "Lemon zest carries fragrant oils without the harsh sourness of juice, so it survives the pan; juice goes on after to stay fresh. Coarse cracked pepper gives a warm, citrusy bite that's the classic partner to lemon. Asparagus and lemon are a natural spring pairing, and broth fixes quinoa's usual blandness.",
  "simple": true
 },
 {
  "id": "smoky-paprika-chicken-with-sweet-potato-green-beans",
  "title": "Smoky Paprika Chicken with Sweet Potato & Green Beans",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Per 1 lb chicken: 1 tsp smoked paprika, 3/4 tsp kosher salt, 1/2 tsp black pepper, 3/4 tsp garlic powder, 1/2 tsp onion powder, 1/4 tsp cumin, and a pinch of cayenne (optional). 1 Tbsp olive oil to bind. Toss the sweet potato cubes in the same blend plus a little oil for a matched flavor across the plate.",
  "method": "Pat chicken dry, rub with oil then the spice blend (oil first helps spices stick and bloom). Sear 5-6 min per side to 165F, or roast at 425F for 20-22 min. Rest 5 min. Cube sweet potato, toss with the same spices and oil, roast at 425F for 25-30 min; don't crowd the pan or they steam. Saute green beans in 1 tsp oil with salt and a little garlic 6-8 min until blistered.",
  "note": "Smoked paprika delivers a deep, woodsy char-without-a-grill flavor; cumin and onion powder add savory backbone, and cayenne wakes it up. The natural sugar in roasted sweet potato balances the smoky-salty rub, and using one blend on both protein and starch ties the plate together.",
  "simple": true
 },
 {
  "id": "honey-garlic-glazed-chicken-with-rice-green-beans",
  "title": "Honey-Garlic Glazed Chicken with Rice & Green Beans",
  "slot": "dinner",
  "protein": "Chicken breast cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Season chicken first: per 1 lb, 1/2 tsp salt, 1/4 tsp pepper, 1/2 tsp garlic powder. Glaze: 2 Tbsp honey, 1 Tbsp low-sodium soy sauce, 2 cloves minced garlic, 1 tsp rice vinegar (or lemon juice), pinch of red pepper flakes. Roughly 2 parts honey : 1 part soy : a splash of acid. Simmer 1-2 min until syrupy, then toss the cooked chicken in it.",
  "method": "Pat chicken dry, season, sear 5-6 min per side to 165F, then remove. In the same pan add honey, soy, garlic, vinegar, and flakes; simmer 1-2 min until it coats a spoon (don't walk away, honey burns fast). Return chicken and turn to glaze. Rest briefly. Steam rice and spoon the pooled glaze over it. Saute green beans in 1 tsp oil with salt until blistered.",
  "note": "The leanest way to a sweet-savory glazed chicken: honey for shine, soy for deep salt and umami, garlic for aroma, vinegar so it isn't cloying. Reducing in the same pan picks up the browned fond. Red pepper flakes add gentle heat that keeps the sweetness in check.",
  "simple": true
 },
 {
  "id": "garlic-herb-turkey-rice-skillet-with-broccoli",
  "title": "Garlic-Herb Turkey & Rice Skillet with Broccoli",
  "slot": "dinner",
  "protein": "Turkey ground 93/7 cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Per 1 lb ground turkey: 1 tsp kosher salt, 1/2 tsp black pepper, 1.5 tsp garlic powder, 1 tsp onion powder, 1 tsp dried Italian herbs, and 2 cloves fresh garlic. Finish with a squeeze of lemon and fresh parsley. Lean turkey is bland, so salt it like you mean it.",
  "method": "Get the pan HOT with 1 tsp oil before adding the turkey so it browns instead of steams. Break it up, then leave it undisturbed 2-3 min to build brown bits before stirring. Add salt, pepper, garlic and onion powder, herbs, and fresh garlic once it's mostly cooked. Finish with lemon and parsley off heat. Serve over rice with roasted broccoli (425F, 18-20 min).",
  "note": "Lean ground turkey is a blank canvas, so doubled-up garlic and onion powder plus salt build the savory base it lacks. Browning it undisturbed creates the Maillard crust that makes ground meat taste rich rather than gray. Lemon and parsley at the end lift the whole thing so it tastes fresh, not heavy.",
  "simple": true
 },
 {
  "id": "smoky-paprika-turkey-patties-with-sweet-potato-green-b",
  "title": "Smoky Paprika Turkey Patties with Sweet Potato & Green Beans",
  "slot": "dinner",
  "protein": "Turkey ground 93/7 cooked",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Per 1 lb ground turkey, mixed in: 1 tsp smoked paprika, 1 tsp kosher salt, 3/4 tsp garlic powder, 3/4 tsp onion powder, 1/2 tsp cumin, 1/4 tsp black pepper, pinch cayenne. Mix gently; overmixing makes patties dense and rubbery. Season the sweet potato cubes with the same blend.",
  "method": "Mix the spices into the turkey just until combined, form 4 patties about 3/4 inch thick, and press a small dimple in the center so they cook flat. Sear in a hot pan with 1 tsp oil, 4-5 min per side to 165F; don't press down (that squeezes out the juices). Roast sweet potato cubes with the matching blend at 425F for 25-30 min. Blister green beans in a hot pan with salt.",
  "note": "Mixing the smoky blend INTO the turkey seasons it all the way through, not just the surface, which lean meat badly needs. The dimple keeps the patty from bulging so it browns evenly. Smoked paprika plus cumin gives grilled-burger depth, and the sweet roasted potato is the natural counterweight to the smoky-salty patty.",
  "simple": true
 },
 {
  "id": "honey-garlic-ground-chicken-rice-bowl-with-broccoli",
  "title": "Honey-Garlic Ground Chicken Rice Bowl with Broccoli",
  "slot": "dinner",
  "protein": "Ground chicken breast 98% lean cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "ovo"
  ],
  "season": "Season the meat as it cooks: per 1 lb, 3/4 tsp salt, 1/2 tsp pepper, 1 tsp garlic powder, 1 tsp onion powder. Sauce: 2 Tbsp honey, 1 Tbsp low-sodium soy sauce, 2 cloves minced garlic, 1 tsp grated fresh ginger, 1 tsp rice vinegar, pinch red pepper flakes. Roughly 2 parts honey : 1 part soy, brightened with ginger and vinegar.",
  "method": "Brown ground chicken in a hot pan with 1 tsp oil, leaving it undisturbed 2-3 min first for color, then season. Push the meat aside, add garlic and ginger for 30 sec until fragrant, then pour in honey, soy, vinegar, and flakes. Simmer 1-2 min until glossy and toss to coat. Serve over rice with broccoli (roasted 425F 18-20 min, or steamed and tossed in a spoonful of the sauce).",
  "note": "Ground chicken takes glaze well thanks to all its surface area. Honey and soy give the classic sweet-salty base, fresh ginger and garlic add aromatic heat, and the vinegar keeps it from being one-note sweet. Browning the meat first builds savory depth so the sauce clings instead of just coating bland mince.",
  "simple": true
 },
 {
  "id": "steakhouse-garlic-butter-sirloin-with-baked-potato-asp",
  "title": "Steakhouse Garlic-Butter Sirloin with Baked Potato & Asparagus",
  "slot": "dinner",
  "protein": "Beef sirloin lean grilled",
  "carb": "Potato baked flesh",
  "fat": "Butter salted|Olive oil",
  "produce": "Asparagus cooked",
  "diets": [
   "omnivore"
  ],
  "season": "Steakhouse SPG sear plus a garlic-butter baste. Per steak: 3/4 tsp kosher salt and 1/2 tsp coarse-ground black pepper pressed into a fully dry surface 40 min ahead (or right before if rushed). In the last 90 seconds of searing add 1 Tbsp butter, 1 smashed garlic clove, and a thyme sprig, tilt the pan and spoon the foaming butter over the steak 8 to 10 times. Salt the asparagus and toss it in a little of that garlic butter; top the split baked potato with the leftover pan butter instead of plain butter. A squeeze of lemon over the asparagus right before serving.",
  "method": "Pat the steak bone dry with paper towels (biggest lever for a brown crust). Salt and pepper both sides. Heat the pan until a drop of water skitters and evaporates instantly, add a thin film of high-smoke-point oil, lay the steak down away from you, and do not move it for 3 minutes so a crust forms. Flip, add butter/garlic/thyme, baste 90 sec. Pull at 130 to 133F for medium-rare and REST 5 to 8 min before slicing against the grain. Potato: fork-poke, rub with oil and salt, bake 400F about 55 min. Asparagus: roast 400F 10 to 12 min, or sear in the steak pan after the steak rests.",
  "note": "Salt + a dry surface + real heat builds the browned crust a good steak needs. Pepper adds aromatic bite, and basting garlic-thyme butter at the end perfumes the meat without burning the garlic (which happens if you add it at the start). Resting keeps the juices in the steak instead of on the plate, and the same garlic butter ties the potato and asparagus together so nothing tastes like an afterthought.",
  "simple": true
 },
 {
  "id": "montreal-rubbed-top-round-steak-with-rice-green-beans",
  "title": "Montreal-Rubbed Top-Round Steak with Rice & Green Beans",
  "slot": "dinner",
  "protein": "Beef top round lean cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore"
  ],
  "season": "A scratch Montreal steak rub: 1 Tbsp coarse black pepper, 1 Tbsp kosher salt, 2 tsp granulated garlic, 1 tsp dill seed (lightly crushed), 1 tsp ground coriander, and 1/2 tsp red pepper flakes. Mix a batch and store it; use about 1 to 1.5 tsp per steak, pressed on 20 to 30 min before cooking. Toss the green beans with a little olive oil, salt, and a pinch of the same rub so the plate reads as one dish, then a squeeze of lemon over them to finish.",
  "method": "Coat the dry steak on both sides with the rub and let it sit 20 min so the salt seasons inward. Sear in a hot pan with a film of oil, 2.5 to 3 min per side (top-round is lean and slightly chewy, so do not overshoot). Pull at 130F, rest 5 to 7 min, and always slice top-round thin and against the grain to keep it tender. Rice: simmer 1 part rice to 1.75 parts salted water, lid on, 15 min, then rest 5 min off heat and fluff. Green beans: blanch or steam 4 min, then toss in a hot dry pan with oil and a pinch of rub for a little char.",
  "note": "Coriander and dill seed give Montreal seasoning a warm, faintly citrusy backbone that plain salt-and-pepper lacks, while the coarse grind and red pepper add texture and a low hum of heat. On a lean, mild cut like top-round it does a lot of flavor work cheaply. Slicing thin against the grain is the trick that makes an inexpensive cut eat tender, and carrying a pinch of rub onto the green beans unifies the plate.",
  "simple": true
 },
 {
  "id": "garlic-butter-sirloin-with-mashed-potatoes-brussels-sp",
  "title": "Garlic-Butter Sirloin with Mashed Potatoes & Brussels Sprouts",
  "slot": "dinner",
  "protein": "Beef sirloin lean grilled",
  "carb": "Potato baked flesh",
  "fat": "Butter salted|Olive oil",
  "produce": "Brussels sprouts cooked",
  "diets": [
   "omnivore"
  ],
  "season": "Steakhouse SPG sear with a garlic-butter finish. Per steak: 3/4 tsp kosher salt and 1/2 tsp coarse black pepper pressed into a dry surface. In the last 90 seconds of searing add 1 Tbsp butter and 1 smashed garlic clove, tilt the pan, and spoon the foaming butter over the steak. Mash: warm milk, 1 Tbsp butter, and salt to taste. Toss the halved Brussels with olive oil and salt before roasting, and give them a splash of balsamic as they come out.",
  "method": "Pat the steak dry, salt and pepper both sides. Sear in a screaming-hot oiled pan 3 min per side without moving it, then add butter and garlic and baste 90 sec. Pull at 130 to 133F and REST 5 to 8 min, then slice against the grain. Mash: boil peeled potatoes until fork-tender, drain well, and mash with warm milk, butter, and salt. Brussels: halve and roast cut-side down at 400F 20 to 25 min until the edges are crispy.",
  "note": "A hard sear plus a quick garlic-butter baste gives you steakhouse flavor without a fussy pan sauce. Roasting the sprouts cut-side down caramelizes them so they go sweet and nutty instead of sulfurous, and their crispy, slightly bitter edges cut the richness of buttery mash and seared steak so the plate stays balanced. Resting keeps the steak juicy.",
  "simple": true
 },
 {
  "id": "garlic-herb-crusted-pork-tenderloin-with-roasted-potat",
  "title": "Garlic-Herb Crusted Pork Tenderloin with Roasted Potatoes & Green Beans",
  "slot": "dinner",
  "protein": "Pork tenderloin lean roasted",
  "carb": "Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore"
  ],
  "season": "A garlic-herb-Dijon crust: rub the tenderloin with 1 tsp Dijon mustard as glue, then press on a mix of 3/4 tsp kosher salt, 1/2 tsp black pepper, 1 tsp granulated garlic, 1 tsp dried thyme (or rosemary), and 1/2 tsp smoked paprika. The Dijon adds tang and helps the herbs adhere and brown. Toss the potatoes and green beans with olive oil, salt, and a little of the same garlic-herb blend.",
  "method": "Pat the tenderloin dry and trim the silverskin. Smear with Dijon, then coat in the spice mix. Sear on all sides in a hot oven-safe pan for color (about 6 min total, turning), then transfer the pan to a 425F oven and roast to 140 to 142F internal, about 12 to 15 min. REST 5 to 10 min (it carries to a safe 145F and stays juicy and faintly pink, which is correct). Slice into medallions. Potatoes: halve baby potatoes, roast 425F 25 to 30 min. Green beans: add to the potato tray for the last 12 min or steam separately.",
  "note": "Pork tenderloin is extremely lean and mild, so it needs both a flavor crust and careful cooking. Dijon gives acidity and a savory edge while gluing the herb crust on; garlic, thyme, and smoked paprika give a warm, lightly smoky exterior that browns beautifully. The sear plus a moderate oven builds a crust without drying the inside, and pulling at 140F then resting to 145F is the modern, safe, juicy way to cook pork.",
  "simple": true
 },
 {
  "id": "seasoned-lean-beef-patties-with-rice-green-beans",
  "title": "Seasoned Lean Beef Patties with Rice & Green Beans",
  "slot": "dinner",
  "protein": "Beef ground 93/7 cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore"
  ],
  "season": "A steakhouse-style burger seasoning that makes lean beef taste rich: per 1 lb of 93/7, mix in 1 tsp kosher salt, 1/2 tsp black pepper, 3/4 tsp garlic powder, 3/4 tsp onion powder, and 1 tsp Worcestershire sauce. Salt the OUTSIDE just before cooking; the Worcestershire and aromatics go inside the mix. Toss the green beans with a splash of soy or Worcestershire, garlic, and a little oil.",
  "method": "Mix the seasonings into the beef gently with your hands; do NOT overwork it or the patties turn dense and rubbery. Form patties and press a thumb dimple in the center so they cook flat instead of doming. Salt the outside, then sear in a hot pan 3 to 4 min per side. Because 93/7 is lean, a hot pan and not flipping too early give you a real crust to make up for the lower fat. Rest 3 min. Rice: 1 part rice to 1.75 parts salted water, 15 min, rest, fluff. Green beans: steam 4 min then toss in a hot pan with garlic and a splash of soy or Worcestershire for char.",
  "note": "Lean ground beef lacks the fat that carries flavor, so Worcestershire (loaded with glutamate and umami) plus garlic and onion powder builds the savory depth back in, and salting the outside late gives a crusty, well-browned exterior. The thumb dimple and a gentle mix keep the patties tender. A splash of soy or Worcestershire on the green beans carries the same savory note across the plate so a budget protein eats like a complete, satisfying meal.",
  "simple": true
 },
 {
  "id": "lemon-dill-salmon-with-rice-asparagus",
  "title": "Lemon-Dill Salmon with Rice & Asparagus",
  "slot": "dinner",
  "protein": "Salmon sockeye cooked|Salmon Atlantic farmed cooked",
  "carb": "White rice cooked",
  "fat": "Butter salted|Olive oil",
  "produce": "Asparagus cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Per 6 oz fillet: 3/4 tsp kosher salt, 1/4 tsp black pepper on the flesh before cooking. Finish OFF the heat with 1 Tbsp lemon juice, 1 tsp lemon zest, 1 Tbsp chopped fresh dill, and 1 tsp melted butter or olive oil. Toss the asparagus with 1 tsp oil, a pinch of salt, and a squeeze of the same lemon.",
  "method": "Pat the salmon very dry (dry surface = crust, wet = steam). Season the flesh. Heat 1 tsp oil in a nonstick pan over medium-high until it shimmers. Lay the salmon flesh-side down and sear 3-4 min undisturbed until a brown crust releases on its own, then flip and cook 2-3 min more. Off the heat, spoon over the lemon juice, zest, dill, and butter. Roast the asparagus at 425F for 10-12 min, or pan-sear it alongside.",
  "note": "Salmon is rich and fatty, so it needs acid and an herb to keep each bite from going heavy. Lemon cuts the fat, dill is the one herb basically made for salmon (clean, grassy, slightly anise), and a touch of butter carries both across the fish. Adding the lemon and dill OFF the heat keeps them bright instead of cooking them dull.",
  "simple": true
 },
 {
  "id": "honey-soy-glazed-salmon-with-rice-broccoli",
  "title": "Honey-Soy Glazed Salmon with Rice & Broccoli",
  "slot": "dinner",
  "protein": "Salmon sockeye cooked|Salmon Atlantic farmed cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Glaze per 6 oz fillet: 1 Tbsp low-sodium soy sauce, 2 tsp honey, 1/2 tsp grated garlic, 1/2 tsp grated ginger, 1/4 tsp rice vinegar. Season the fish first with only a light pinch of salt (the soy brings plenty). Steam or roast the broccoli and hit it with a pinch of salt and a few drops of the glaze.",
  "method": "Pat the salmon dry and salt it lightly. Stir the glaze together in a small bowl. Sear the salmon flesh-side down in 1 tsp oil over medium-high 3 min, then flip. Pour the glaze into the pan; it bubbles and thickens in 60-90 seconds. Spoon it over the fish until glossy and just sticky, then pull it off so the honey does not scorch. Roast the broccoli at 425F 15-18 min until the edges char.",
  "note": "This is the salt-sweet-savory triangle that makes teriyaki-style fish addictive, but with four pantry items instead of a bottled sauce. Soy gives salt and umami, honey gives a caramelized lacquer and char, garlic and ginger give aromatic lift. Reducing it in the pan for under two minutes concentrates it into a glaze without making a project of it.",
  "simple": true
 },
 {
  "id": "cajun-blackened-salmon-with-rice-green-beans",
  "title": "Cajun Blackened Salmon with Rice & Green Beans",
  "slot": "dinner",
  "protein": "Salmon sockeye cooked|Salmon Atlantic farmed cooked",
  "carb": "White rice cooked",
  "fat": "Butter salted|Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Blackening rub per 6 oz fillet (or batch it): 1 tsp smoked paprika, 1/2 tsp garlic powder, 1/2 tsp onion powder, 1/2 tsp dried thyme, 1/2 tsp dried oregano, 1/2 tsp kosher salt, 1/4 tsp black pepper, 1/8 to 1/4 tsp cayenne to taste. Coat the whole surface. Finish the cooked fish with a lemon wedge.",
  "method": "Mix the rub. Pat the salmon dry, brush the top with a little melted butter or oil so the spices grab, then press the rub on in an even coat. Heat a cast-iron or heavy pan over medium-high until quite hot. Cook spice-side down first, 3-4 min, until the crust is deep brick-brown (not black-burnt), then flip and finish 2-3 min. Squeeze lemon over at the table. Saute the green beans with a pinch of salt and a little garlic.",
  "note": "Blackening is the original way to make lean fish exciting: the spice crust toasts in the hot pan and turns nutty and smoky, the cayenne brings warmth, and the paprika-thyme-oregano base is the classic Louisiana backbone. The lemon squeeze at the end is non-negotiable because the acid resets your palate against the heat and richness.",
  "simple": true
 },
 {
  "id": "garlic-butter-cod-with-mashed-potato-green-beans",
  "title": "Garlic-Butter Cod with Mashed Potato & Green Beans",
  "slot": "dinner",
  "protein": "Cod Atlantic cooked",
  "carb": "Potato baked flesh",
  "fat": "Butter salted|Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Per 6 oz fillet: 1/2 tsp salt, 1/4 tsp pepper, 1/4 tsp garlic powder on the fish. Pan sauce spooned over after cooking: 1 Tbsp butter, 1 clove garlic minced, 1 tsp lemon juice, 1 tsp chopped parsley. Toss the green beans with salt and a little of the garlic butter.",
  "method": "Pat the cod very dry (white fish is watery and will steam if wet). Dust with the salt, pepper, and garlic powder. Sear in 1 tsp oil over medium-high 3-4 min per side until golden and it flakes. Lower the heat, add the butter and minced garlic, swirl 30-45 sec until fragrant but not browned, stir in the lemon and parsley, and spoon it over the fish. Boil the potatoes and mash with a splash of milk, butter, and salt.",
  "note": "Cod is mild and lean, so a quick garlic-butter pan sauce does the heavy lifting: butter adds the richness the fish lacks, fresh garlic gives savory depth, and lemon and parsley keep it from tasting flat. Cooking the garlic gently in butter for under a minute keeps it sweet and nutty instead of bitter and burnt.",
  "simple": true
 },
 {
 "id": "lemon-pepper-tilapia-with-quinoa-asparagus",
 "title": "Lemon-Pepper Tilapia with Quinoa & Asparagus",
 "slot": "lunch",
 "protein": "Tilapia cooked",
 "carb": "Quinoa cooked",
 "fat": "Olive oil",
 "produce": "Asparagus cooked",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "season": "Per 6 oz fillet: 1/2 tsp salt, 1/2 tsp coarse black pepper, 1/2 tsp lemon zest, 1/4 tsp garlic powder rubbed on before cooking. Finish with a fresh squeeze of lemon and a drizzle of olive oil. Cook the quinoa in broth, then stir in a pinch of salt and a little lemon zest.",
 "method": "Pat the tilapia dry. Mix the salt, coarse pepper, lemon zest, and garlic powder and press it onto both sides. Sear in 1 tsp oil over medium-high 2-3 min per side; it is thin and cooks fast, so pull it the moment it flakes. Squeeze fresh lemon over at the end. Roast or pan-sear the asparagus with salt. Cook the quinoa in broth instead of water for built-in flavor.",
 "note": "Lemon-pepper is the classic move for thin, mild white fish because the bright citrus and the bite of coarse black pepper give an otherwise plain fillet two strong, clean notes. Using real lemon zest (not just bottled seasoning) plus a fresh squeeze at the end gives both the perfumed oil from the peel and the fresh acid from the juice.",
 "simple": true
},
 {
  "id": "garlic-butter-shrimp-with-rice-broccoli",
  "title": "Garlic-Butter Shrimp with Rice & Broccoli",
  "slot": "dinner",
  "protein": "Shrimp cooked",
  "carb": "White rice cooked",
  "fat": "Butter salted|Olive oil",
  "produce": "Broccoli cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Per 6 oz shrimp: 1/2 tsp salt, 1/4 tsp pepper, 1/4 tsp garlic powder tossed on raw. In the pan: 1 Tbsp butter, 2 cloves fresh garlic minced, a pinch of red pepper flakes, finished off the heat with 1 tsp lemon juice and 1 Tbsp chopped parsley. Toss the broccoli in a spoonful of the garlic butter.",
  "method": "Pat the shrimp dry and toss with the salt, pepper, and garlic powder. Get the pan hot, add 1 tsp oil, and lay the shrimp in a single layer (do not crowd or they steam). Cook 1-2 min per side until just pink and curled into a loose C, not a tight O (a tight O means overcooked). Lower the heat, add the butter, fresh garlic, and pepper flakes, swirl 30 sec, kill the heat, and stir in the lemon and parsley. Steam the broccoli alongside.",
  "note": "This is shrimp scampi logic without the pasta or wine: butter and a lot of fresh garlic, brightened with lemon and parsley, with a whisper of chili heat. Shrimp are sweet and lean and cook in about three minutes total, so finishing the fresh garlic in butter off the heat keeps it aromatic instead of acrid, and the lemon keeps the butter from feeling heavy.",
  "simple": true
 },
 {
  "id": "cajun-shrimp-with-rice-bok-choy",
  "title": "Cajun Shrimp with Rice & Bok Choy",
  "slot": "dinner",
  "protein": "Shrimp cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Bok choy cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Cajun toss per 6 oz shrimp: 1/2 tsp smoked paprika, 1/2 tsp garlic powder, 1/4 tsp onion powder, 1/4 tsp dried thyme, 1/4 tsp dried oregano, 1/2 tsp salt, 1/8 tsp cayenne. Finish with a squeeze of lemon. The bok choy gets a pinch of salt and a few drops of lemon or a splash of soy.",
  "method": "Pat the shrimp dry and toss thoroughly with the Cajun blend until evenly coated. Heat a heavy pan over medium-high with 1 tsp oil. Add the shrimp in one layer, do not crowd, and cook 1-2 min per side until pink and the spices smell toasted. Squeeze lemon over at the end. For the bok choy, halve it and sear cut-side down in a hot pan 2-3 min, then add a splash of water to steam it through; season with salt or a little soy.",
  "note": "Shrimp take a Cajun spice coat beautifully because there is so much surface area for the rub to toast against. The smoked paprika and thyme-oregano base give smoky, earthy depth, the cayenne brings heat, and the shrimp's natural sweetness balances the spice. A lemon squeeze cuts the richness and keeps the heat lively rather than dull.",
  "simple": true
 },
 {
  "id": "honey-soy-shrimp-with-rice-bok-choy",
  "title": "Honey-Soy Shrimp with Rice & Bok Choy",
  "slot": "lunch",
  "protein": "Shrimp cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Bok choy cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Glaze per 6 oz shrimp: 1 Tbsp low-sodium soy sauce, 2 tsp honey, 1/2 tsp grated garlic, 1/2 tsp grated ginger, 1/4 tsp rice vinegar. Salt the shrimp only lightly before cooking. Finish the bok choy with a few drops of the glaze and a pinch of toasted sesame seeds if on hand.",
  "method": "Pat the shrimp dry and salt lightly. Whisk the glaze in a small bowl. Sear the shrimp in 1 tsp oil over medium-high in a single layer, about 1 min per side. Push them to the side, pour in the glaze, let it bubble 30-60 sec until syrupy, then toss the shrimp to coat and pull off the heat immediately (honey scorches fast). Sear the halved bok choy cut-side down, splash with water to steam, and drizzle a little glaze over.",
  "note": "The salt-sweet-savory glaze clings to the shrimp and turns glossy and slightly sticky, hitting the same satisfaction as takeout with four real ingredients. Ginger and garlic give aromatic punch, the splash of vinegar keeps the honey from being cloying, and the bok choy's mild crunch is the perfect neutral foil for the sweet-savory sauce.",
  "simple": true
 },
 {
  "id": "soft-buttery-scrambled-eggs-with-spinach-and-breakfast",
  "title": "Soft Buttery Scrambled Eggs with Spinach and Breakfast Potatoes",
  "slot": "breakfast",
  "protein": "Egg white raw",
  "carb": "Potato baked flesh",
  "fat": "Butter salted|Olive oil",
  "produce": "Spinach cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "season": "Salt the beaten eggs about 15 minutes before cooking for more tender curds. Potatoes: toss diced potato with 2 tsp oil, 1/2 tsp salt, 1/4 tsp garlic powder, 1/4 tsp smoked paprika before crisping. Hot sauce at the table.",
  "method": "Potatoes: parboil diced potato 6-7 min, drain, and dry well, then crisp in a hot pan with the oil and spices, undisturbed, until golden (do not stir too often). Eggs: beat eggs and whites loosely, melt butter in a nonstick pan over LOW heat, pour in eggs, and stir slowly and constantly with a spatula, pulling from the edges. Fold in the spinach in the last 30 seconds so it just wilts. Pull the eggs off the heat while still slightly glossy and underdone; they finish on the plate. Season at the end.",
  "note": "Low heat plus butter gives custardy, restaurant-grade curds instead of dry rubber, and the egg whites add protein with almost no extra fat. Salting late keeps the texture silky. The spinach wilts into the eggs for an easy veg, and the smoked-paprika potatoes bring salt, char, and crunch as a savory counterpoint to the soft eggs.",
  "simple": true,
  "eggBase": 1
 },
 {
  "id": "veggie-egg-scramble-with-sweet-potato-hash",
  "title": "Veggie Egg Scramble with Sweet Potato Hash",
  "slot": "breakfast",
  "protein": "Egg white raw",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Zucchini cooked",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "season": "Hash: 2 tsp olive oil, 1/2 tsp salt, 1/2 tsp smoked paprika, 1/4 tsp garlic powder, pinch of cayenne. Eggs: a little garlic powder cooked with the zucchini, plus a pinch of salt and pepper added after they set. Finish with a squeeze of lime or a few dashes of hot sauce to wake everything up.",
  "method": "Hash: dice sweet potato small (1/2 inch so it cooks fast), toss with oil and spices, and roast at 425F for 20-22 min or pan-crisp until the edges caramelize. Scramble: saute diced zucchini in 1 tsp oil over medium until it loses its water and lightly browns (this is the key; watery zucchini makes bland eggs), then lower the heat, add the beaten eggs and whites, and stir gently until just set. Salt at the end.",
  "note": "Browning the zucchini first concentrates its flavor instead of steaming it bland. Smoked paprika plus a little cayenne gives the sweet potato a savory-sweet-smoky edge, and the lime or hot sauce at the end adds the acid and heat that keep an egg plate from tasting flat.",
  "simple": true,
  "eggBase": 1
 },
 {
  "id": "garlic-herb-turkey-breast-with-rice-and-green-beans",
  "title": "Garlic-Herb Turkey Breast with Rice and Green Beans",
  "slot": "dinner",
  "protein": "Turkey breast roasted",
  "carb": "Brown rice cooked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Dry-brine the turkey 45-60 min before cooking (or up to overnight, uncovered in the fridge) with 3/4 tsp kosher salt per pound. Just before cooking, rub with 1 tbsp olive oil, 1/2 tsp garlic powder, 1/2 tsp onion powder, 1/2 tsp dried thyme (or poultry seasoning), and black pepper. Finish the rested turkey with a squeeze of lemon. Green beans: oil, salt, garlic, and a squeeze of lemon.",
  "method": "Dry-brine first (this is what keeps lean turkey juicy), then pat the surface dry so it browns. Sear the breast in an oven-safe pan over medium-high to get color, then roast at 375F to an internal temp of 160F and pull it (carryover takes it to 165F). Rest 8-10 min before slicing against the grain (non-negotiable, or the juice runs out). Green beans: roast or saute hot in oil with salt and garlic until blistered, then finish with lemon.",
  "note": "Turkey breast is extremely lean, so it punishes overcooking and under-seasoning. The salt-ahead dry brine seasons it deep and holds moisture, the oil carries the garlic and thyme onto the lean meat, pulling at 160F prevents dryness, and lemon at the end adds the acid that makes lean poultry taste bright instead of dull.",
  "simple": true
 },
 {
  "id": "smoky-turkey-burgers-with-roasted-potatoes-and-asparag",
  "title": "Smoky Turkey Burgers with Roasted Potatoes and Asparagus",
  "slot": "dinner",
  "protein": "Turkey ground 93/7 cooked",
  "carb": "Potato baked flesh",
  "fat": "Olive oil",
  "produce": "Asparagus cooked",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "season": "Per pound: 1 tsp salt, 3/4 tsp black pepper, 1 tsp smoked paprika, 1 tsp garlic powder, 1/2 tsp onion powder, and 1/2 tsp Worcestershire sauce mixed in for umami. Potatoes: oil, salt, garlic powder, paprika. Asparagus: oil, salt, lemon.",
  "method": "Mix the seasonings in gently and form patties slightly wider than you want (they shrink), pressing a thumb dimple in the center so they cook flat instead of doming. Sear over medium-high in a lightly oiled pan, flip once, and cook to 165F internal. Don't press the patties (that squeezes out the juice). Potatoes: roast at 425F until crisp. Asparagus: roast 10-12 min and finish with lemon.",
  "note": "Smoked paprika plus Worcestershire is the trick that gives a lean turkey burger the depth of beef, while salt and garlic do the heavy lifting; the center dimple and not-pressing keep it from drying out. Crispy paprika potatoes and lemony asparagus round it into a satisfying classic plate.",
  "simple": true
 },
 {
  "id": "crispy-garlic-tofu-with-rice-broccoli",
  "title": "Crispy Garlic Tofu with Rice & Broccoli",
  "slot": "dinner",
  "protein": "Tofu firm",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Broccoli cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Coat: toss pressed tofu cubes in 1 tbsp soy sauce (salts the inside), then dust with 2 tbsp cornstarch + 1/2 tsp garlic powder + 1/4 tsp black pepper. Finishing glaze (swirl in the hot pan 30 sec at the end): 1 tbsp soy sauce + 1 tsp rice vinegar + 1/2 tsp maple syrup + 1 grated garlic clove. That's salt + acid + a touch of sweet + raw garlic bloomed in the pan.",
  "method": "Press tofu 15-20 min under a heavy pan, then cube. Toss with soy sauce, then the cornstarch mix. Heat 2 tbsp oil in a nonstick pan over medium-high until shimmering. Add tofu in one layer and DON'T crowd or stir for 3-4 min so a crust forms, then flip and brown all sides (~10 min total). Add the glaze and toss 30 sec. Steam broccoli 4-5 min. Serve over rice.",
  "note": "Pressing dries the surface so it fries crisp instead of steaming; cornstarch builds a shatter shell. Soy sauce seasons the bland interior, and the finishing glaze layers salt, acid, and a little sweet with raw garlic for punch.",
  "simple": true
 },
 {
  "id": "sweet-smoky-tofu-with-sweet-potato-green-beans",
  "title": "Sweet & Smoky Tofu with Sweet Potato & Green Beans",
  "slot": "dinner",
  "protein": "Tofu firm",
  "carb": "Sweet potato baked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Dry rub for the tofu: 1 tbsp cornstarch + 1 tsp smoked paprika + 1/2 tsp garlic powder + 1/2 tsp cumin + 1/2 tsp salt + a pinch of brown sugar. Smoked paprika carries it, giving a bacon-like savoriness with no sauce. Finish the whole plate with a squeeze of lime.",
  "method": "Press and cube tofu. Toss with 1 tbsp oil, then the rub. Spread on parchment with cubed sweet potato (tossed in oil + salt) and roast at 425F for 25-30 min, flipping once, until edges brown. Add oiled, salted green beans to the sheet for the last 12 min. Squeeze lime over everything.",
  "note": "Smoked paprika + cumin + a whisper of brown sugar reads like a barbecue rub. High-heat roasting caramelizes the sweet potato and crisps the tofu edges, and the lime cuts the richness and wakes up the smoke.",
  "simple": true
 },
 {
  "id": "soy-glazed-tempeh-with-quinoa-bok-choy",
  "title": "Soy-Glazed Tempeh with Quinoa & Bok Choy",
  "slot": "dinner",
  "protein": "Tempeh",
  "carb": "Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Bok choy cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Marinade/glaze: 2 tbsp soy sauce + 1 tbsp rice vinegar + 1 tsp maple syrup + 1 grated garlic clove + 1/2 tsp grated ginger + a pinch of black pepper. Marinate the steamed tempeh 15 min, sear, then reduce the leftover marinade in the pan to a sticky glaze.",
  "method": "Slice tempeh 1/4-inch thick and steam 10 min (removes its natural bitterness so it soaks up flavor). Pat dry and marinate 15 min. Sear in 1 tbsp oil over medium-high 2-3 min per side until deep golden, not crowding. Pour in the rest of the marinade and let it bubble down to a glaze that coats the slices. Cook quinoa in salted water; sear halved bok choy cut-side down 3 min.",
  "note": "Steaming first strips the bitterness and opens the tempeh to the salty-sweet marinade. Searing builds a caramelized crust, reducing the marinade concentrates the soy-garlic-ginger into a glossy glaze, and the vinegar keeps the sweetness in check.",
  "simple": true
 },
 {
  "id": "blackened-tempeh-with-rice-asparagus",
  "title": "Blackened Tempeh with Rice & Asparagus",
  "slot": "lunch",
  "protein": "Tempeh",
  "carb": "Brown rice cooked",
  "fat": "Olive oil",
  "produce": "Asparagus cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Cajun rub: 1 tsp smoked paprika + 1/2 tsp garlic powder + 1/2 tsp onion powder + 1/2 tsp dried thyme + 1/2 tsp salt + 1/4 tsp black pepper + 1/4 tsp cayenne (to taste). Brush steamed tempeh with oil, press the rub on both sides, sear hard. Finish with a squeeze of lemon.",
  "method": "Slice tempeh 1/4-inch thick and steam 10 min to de-bitter. Pat dry, brush with oil, and coat both sides with the rub. Sear in 1 tbsp oil in a heavy or cast-iron pan over medium-high 2-3 min per side until the spices darken and char slightly. Roast asparagus at 425F with oil and salt 10-12 min. Serve over brown rice with lemon over everything.",
  "note": "A paprika-thyme-cayenne rub chars into a spice crust that delivers smoke, heat, and herb in one bite with no sauce. Steaming keeps the tempeh under the crust tender, and lemon balances the heat and char.",
  "simple": true
 },
 {
  "id": "cumin-garlic-lentils-with-rice-roasted-carrots",
  "title": "Cumin-Garlic Lentils with Rice & Roasted Carrots",
  "slot": "lunch",
  "protein": "Lentils cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Carrots cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Build it in stages: saute 1/2 diced onion + 2 minced garlic cloves, bloom 1 tsp cumin + 1/2 tsp smoked paprika in the oil 30 sec, then add the lentils and 3/4 tsp salt as they simmer. Off heat, stir in 1 tbsp lemon juice + chopped parsley. The bloomed cumin and the finishing lemon are what make plain lentils crave-able.",
  "method": "Rinse 1 cup lentils. Saute onion in 1 tbsp oil until soft, add garlic and the spices, stir 30 sec until fragrant. Add lentils + 2.5 cups water, simmer, salt, and cook 20-25 min until tender, not mushy. Drain any excess and stir in lemon and parsley. Roast carrot sticks at 425F with oil, salt, and a pinch of cumin for 20 min. Serve over rice.",
  "note": "Blooming cumin and paprika in hot oil releases their fat-soluble aroma before the lentils go in; salting during the simmer seasons from the inside; and the lemon at the end brightens the earthy lentils so the whole dish pops.",
  "simple": true
 },
 {
  "id": "smoky-black-beans-with-rice-peppers",
  "title": "Smoky Black Beans with Rice & Peppers",
  "slot": "lunch",
  "protein": "Black beans cooked",
  "carb": "White rice cooked",
  "fat": "Olive oil",
  "produce": "Bell pepper red raw",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Saute 1/2 diced onion + 2 garlic cloves, bloom 1 tsp cumin + 1 tsp smoked paprika + 1/2 tsp oregano, then add drained beans (with a splash of their liquid) + 1/2 tsp salt. Simmer, mash a few beans for body, and finish with lime juice + cilantro.",
  "method": "Saute onion in 1 tbsp oil until soft, add garlic and spices, stir 30 sec. Add a can of drained, rinsed black beans + 1/4 cup water + salt. Simmer 8-10 min, mashing about a third of the beans against the pot to make it creamy. Stir in the juice of half a lime and cilantro. Roast sliced bell peppers at 425F with oil and salt 18-20 min until edges char. Serve over rice.",
  "note": "Mashing some of the beans gives a creamy, sauce-like body with no actual sauce; cumin and smoked paprika bloomed in oil add smoky depth; and lime and cilantro keep it fresh against the earthy beans.",
  "simple": true
 },
 {
  "id": "crispy-roasted-chickpeas-with-quinoa-brussels-sprouts",
  "title": "Crispy Roasted Chickpeas with Quinoa & Brussels Sprouts",
  "slot": "lunch",
  "protein": "Chickpeas cooked",
  "carb": "Quinoa cooked",
  "fat": "Olive oil",
  "produce": "Brussels sprouts cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Toss dried chickpeas in oil, then a rub of 1 tsp smoked paprika + 1/2 tsp garlic powder + 1/2 tsp cumin + 1/2 tsp salt + 1/4 tsp black pepper. Hit them with a final pinch of salt while hot, and squeeze lemon over the finished plate.",
  "method": "Drain, rinse, and THOROUGHLY pat dry a can of chickpeas (dry = crispy). Toss with 1 tbsp oil, then the rub. Spread on parchment, don't crowd, and roast at 425F for 25-30 min, shaking the pan halfway, until crunchy. Roast halved Brussels sprouts cut-side down with oil and salt at 425F for 22-25 min until caramelized. Serve over quinoa with lemon.",
  "note": "Drying the chickpeas is the whole game; it lets them roast into crunchy savory nuggets instead of steaming soft. The paprika-cumin rub crisps onto the surface, the Brussels caramelize cut-side down, and lemon cuts the richness of both.",
  "simple": true
 },
 {
  "id": "garlic-soy-edamame-with-rice-green-beans",
  "title": "Garlic-Soy Edamame with Rice & Green Beans",
  "slot": "lunch",
  "protein": "Edamame cooked",
  "carb": "Brown rice cooked",
  "fat": "Olive oil",
  "produce": "Green beans cooked",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Saute shelled edamame in 1 tbsp oil with 2 minced garlic cloves until the garlic is golden, then toss off-heat with 1 tbsp soy sauce + 1 tsp rice vinegar + a pinch of red pepper flakes + a few drops of sesame oil. The garlic-soy-sesame trio makes plain edamame genuinely savory.",
  "method": "Cook brown rice. Heat 1 tbsp oil over medium-high, add thawed shelled edamame + a pinch of salt, and saute 4-5 min until they blister. Add the garlic and cook 1 min until fragrant, not burnt. Off heat, toss with soy sauce, rice vinegar, pepper flakes, and sesame oil. Saute or steam green beans alongside. Serve over rice.",
  "note": "Edamame has a buttery, nutty base, so it just needs salt and aroma: searing blisters the skins for char, golden garlic adds depth, and the soy-vinegar-sesame finish layers salt, acid, and toasty fragrance. Adding the sesame oil off-heat keeps it aromatic.",
  "simple": true
 },
 {
  "title": "Greek Yogurt with Berries & Granola",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat",
  "carb": "Granola high-protein|Granola",
  "produce": "Blueberries raw|Strawberries raw",
  "fat": "Almonds|Walnuts",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "season": "A little cinnamon and a drizzle of honey if you want it sweeter. The granola and nuts add the crunch; keep it to a small handful so it stays a topping, not the base.",
  "method": "Spoon the Greek yogurt into a bowl. Top with the berries, a sprinkle of granola, and a few chopped nuts. Dust with cinnamon. Eat right away so the granola stays crisp.",
  "note": "Nonfat Greek yogurt is a 17-20g protein base; berries add fiber and brightness, granola and nuts add crunch and healthy fat.",
  "simple": true,
  "id": "greek-yogurt-with-berries-granola"
 },
 {
  "title": "Protein Oatmeal with Banana & Peanut Butter",
  "slot": "breakfast",
  "protein": "Greek yogurt plain nonfat",
  "carb": "Oats dry \\(raw\\)",
  "produce": "Banana raw",
  "fat": "Peanut butter smooth|PBfit powdered peanut butter",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "season": "A pinch of salt in the oats (it makes them taste like more than water), cinnamon, and a little vanilla. Stir the Greek yogurt in OFF the heat so it stays creamy and adds protein without scrambling.",
  "method": "Cook the oats in water with a pinch of salt until creamy, about 5 minutes. Off the heat, stir in the Greek yogurt and cinnamon. Top with sliced banana and a spoon of peanut butter. The PB melts into the warm oats.",
  "note": "Salt and cinnamon fix bland oats; stirring Greek yogurt in off-heat boosts protein and keeps it creamy. Banana and peanut butter is the classic comforting combo.",
  "simple": true,
  "id": "protein-oatmeal-with-banana-peanut-butter"
 },
 {
  "title": "Tofu Scramble with Potatoes & Spinach",
  "slot": "breakfast",
  "protein": "Tofu firm",
  "carb": "Potato baked flesh",
  "produce": "Spinach cooked",
  "fat": "Olive oil",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian"
  ],
  "season": "Per block of tofu: 1/2 tsp turmeric (for color), 1/2 tsp garlic powder, 1/2 tsp onion powder, 3/4 tsp salt, black pepper, and 1 tsp nutritional yeast for a savory, eggy depth. A squeeze of hot sauce at the end.",
  "method": "Crumble the firm tofu and pat it dry so it crisps instead of steaming. Saute diced potato in 1 tsp oil until golden. Add the tofu and spices, cook until the tofu is golden and dry-edged, 6-8 min. Fold in the spinach to wilt. Finish with hot sauce.",
  "note": "Turmeric makes it look like eggs; nutritional yeast and garlic/onion powder give the savory, eggy flavor tofu lacks. Patting dry is what lets it brown.",
  "simple": true,
  "id": "tofu-scramble-with-potatoes-spinach"
 },
 {
  "title": "Greek Yogurt & Berries",
  "slot": "snack",
  "protein": "Greek yogurt plain nonfat",
  "produce": "Blueberries raw|Strawberries raw",
  "fat": "Almonds",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "season": "A little cinnamon or a few chopped almonds for crunch. Honey only if you need it sweeter.",
  "method": "Stir the berries into the Greek yogurt and top with a few chopped almonds.",
  "note": "High-protein, low-effort. Nonfat Greek yogurt plus berries is the cleanest fat-loss snack there is.",
  "simple": true,
  "id": "greek-yogurt-berries"
 },
 {
  "title": "Cottage Cheese with Fruit",
  "slot": "snack",
  "protein": "Cottage cheese nonfat|Cottage cheese 2% lowfat",
  "produce": "Peach raw|Pineapple raw|Blueberries raw",
  "fat": "Walnuts",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "season": "Black pepper if you go savory, cinnamon if you go sweet. A few walnuts for crunch.",
  "method": "Spoon the cottage cheese into a bowl and top with the fruit and a few chopped walnuts.",
  "note": "Cottage cheese is slow-digesting casein protein, great for satiety between meals.",
  "simple": true,
  "id": "cottage-cheese-with-fruit"
 },
 {
  "title": "Apple with Peanut Butter",
  "slot": "snack",
  "protein": "PBfit powdered peanut butter",
  "produce": "Apple raw",
  "fat": "Peanut butter smooth",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "vegan",
   "ovo"
  ],
  "season": "A pinch of cinnamon over the apple slices. That is it.",
  "method": "Slice the apple and serve with the peanut butter for dipping. Dust with cinnamon.",
  "note": "Fiber plus fat plus a little protein; the classic crunchy-creamy snack that actually holds you over.",
  "simple": true,
  "id": "apple-with-peanut-butter"
 },
 {
  "title": "Edamame with Sea Salt",
  "slot": "snack",
  "protein": "Edamame cooked",
  "fat": "Olive oil",
  "diets": [
   "vegan",
   "vegetarian",
   "ovo",
   "pescatarian",
   "omnivore"
  ],
  "season": "Flaky sea salt while hot, and a pinch of garlic powder or chili flakes if you want. Steamed edamame barely needs anything.",
  "method": "Steam or microwave the edamame until hot, then toss with flaky salt. Eat warm.",
  "note": "A complete plant protein you can eat by the handful, ~11g protein per half cup.",
  "simple": true,
  "id": "edamame-with-sea-salt"
 },
 {
  "id": "salmon-avocado-poke-rice-bowl",
  "title": "Salmon & Avocado Poke Rice Bowl",
  "slot": "lunch",
  "protein": "Salmon Atlantic farmed cooked|Salmon sockeye cooked|Tuna yellowfin cooked",
  "carb": "White rice cooked",
  "fat": "Avocado raw",
  "produce": "Cucumber raw|Carrots raw|Bell pepper red raw",
  "diets": [
   "omnivore",
   "pescatarian"
  ],
  "method": "1. Cook your rice and spread it in a wide bowl so it cools to just-warm; poke rice should never be piping hot under the fish. 2. Season the salmon with salt and sear it 2 to 3 minutes per side in a hot dry nonstick pan, or bake at 400F for 8 to 10 minutes, until it flakes but the center is still deep pink. Let it rest 2 minutes, then break it into big chunks with a fork. 3. While it rests, slice the cucumber into thin half-moons and cut the carrot and pepper into matchsticks. 4. Lay the fish and vegetables over the rice in separate piles rather than mixing, so every bite is a different combination. 5. Fan the avocado over the top and crumble the roasted seaweed on last so it stays crisp.",
  "oil": "No cooking oil needed. A nonstick pan gets a good sear on salmon using the fat already in the fish, and the avocado is your real fat here. If you want the sesame flavor, drizzle a scant teaspoon of toasted sesame oil at the END, off the heat, where you will actually taste it.",
  "season": "A spoon of rice vinegar over the rice, sriracha to taste, sliced scallion on top, and a squeeze of lime just before you eat.",
  "note": "Scratches the sushi craving on a weeknight with none of the rolling: seasoned rice, seared salmon, crunchy vegetables and avocado.",
  "extras": [
   [
    "Seaweed snack roasted",
    5
   ],
   [
    "Soy sauce",
    12
   ]
  ]
 },
 {
  "id": "spicy-beef-ramen-noodle-bowl",
  "title": "Spicy Beef Ramen-Style Noodle Bowl",
  "slot": "dinner",
  "protein": "Beef sirloin lean grilled|Beef top round lean cooked|Chicken breast cooked",
  "carb": "Shirataki noodles|Whole wheat pasta cooked",
  "fat": "Sesame oil",
  "produce": "Bok choy cooked|Spinach cooked|Carrots cooked",
  "diets": [
   "omnivore"
  ],
  "method": "1. Bring the broth to a bare simmer with smashed garlic and a coin of ginger; keep it just under a boil the whole time so it stays clear. 2. Salt and pepper the sirloin and sear it hard, 2 to 3 minutes per side for medium-rare, then rest it 5 minutes on the board before slicing it thin ACROSS the grain. Slicing it early or with the grain is what makes ramen beef chewy. 3. Drop the bok choy into the broth for the last 2 minutes so it stays bright green. 4. Rinse the shirataki well and dry-fry it in a hot pan 2 minutes to drive off water, which is the whole trick to a good texture; if your plan lists pasta instead, cook it just to al dente. 5. Build the bowl noodles first, then broth, then the vegetables, and lay the sliced beef on last so it stays pink.",
  "oil": "Sear the beef in a dry, properly preheated pan; a lean sirloin browns fine on its own. Save the sesame oil for a few drops floating on the finished broth, which is where that toasted aroma actually lands.",
  "season": "Build the broth with soy sauce, a spoon of gochujang or sriracha, garlic and ginger, then a splash of rice vinegar at the end to lift it. Top with scallion and chili crisp. Ramen broth should taste slightly too salty on its own, because the noodles and vegetables mute it.",
  "note": "Weeknight ramen built for macros: a real broth, thin-sliced seared beef, and a soft egg, with the noodle doing the least work.",
  "extras": [
   [
    "Chicken broth low-sodium",
    300
   ],
   [
    "Egg whole cooked",
    50
   ],
   [
    "Sriracha",
    10
   ]
  ]
 },
 {
  "id": "arepa-eggs-avocado",
  "title": "Arepa with Eggs & Avocado",
  "slot": "breakfast",
  "protein": "Egg whole cooked|Egg white raw",
  "carb": "Arepa",
  "fat": "Avocado raw",
  "produce": "Tomato raw|Bell pepper red raw",
  "diets": [
   "omnivore",
   "pescatarian",
   "vegetarian",
   "ovo"
  ],
  "method": "1. If you are cooking arepas from masarepa, mix the flour with warm salted water, let the dough rest 5 minutes so it hydrates, then pat into discs about 1cm thick. Cook them in a dry or barely greased pan 5 to 6 minutes per side until a crust forms and they sound hollow when tapped. 2. Scramble the eggs over LOW heat, stirring constantly and pulling them off while they still look slightly underdone; they finish on the plate. 3. Split the hot arepa most of the way through and stuff it with the eggs. 4. Add sliced avocado and chopped tomato inside the pocket, not on the side, so every bite gets some. 5. Eat it immediately while the crust is still crisp.",
  "oil": "Arepas crisp beautifully in a dry nonstick pan or with the lightest mist of oil. Keep the fat budget for the avocado, which is doing the real work here.",
  "season": "Salt the dough itself, not just the filling, or the arepa tastes flat no matter what you stuff it with. Salt and pepper the eggs, then hot sauce or a spoon of salsa on top. A crumble of salty white cheese inside is traditional if your fat budget has room.",
  "note": "The Colombian and Venezuelan breakfast staple, built to hit protein: a crisp corn arepa stuffed with soft eggs and avocado.",
  "extras": [
   [
    "Salsa",
    30
   ]
  ]
 },
{
 "id": "tzatziki-cucumber-cups",
 "title": "Cucumber Cups with Garlic-Dill Yogurt",
 "slot": "snack",
 "protein": "Greek yogurt plain nonfat|Skyr plain nonfat",
 "produce": "Cucumber raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Garlic raw",
   4
  ]
 ],
 "method": "1. Grate a third of the cucumber and squeeze it hard in a clean towel to get the water out. 2. Stir the grated cucumber and grated garlic into the yogurt. 3. Slice the rest of the cucumber into thick rounds and scoop out a little of the centre with a teaspoon. 4. Spoon the garlic yogurt into the cucumber cups and drizzle with the olive oil.",
 "season": "Salt the yogurt properly, then lemon juice, fresh dill or mint, and cracked black pepper. Squeezing the grated cucumber is what stops it going watery.",
 "note": "A Greek dip turned into a crunchy, high-protein, high-water snack."
},
{
 "id": "kefir-chia-pudding-berries",
 "title": "Kefir Chia Pudding with Berries",
 "slot": "snack",
 "protein": "Kefir plain",
 "carb": "Blueberries raw|Raspberries raw|Strawberries raw",
 "fat": "Chia seeds",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Whey protein powder",
   15
  ]
 ],
 "method": "1. Whisk the chia seeds and protein powder into the kefir until there are no lumps. 2. Wait 5 minutes and whisk again hard, which is what stops it setting in clumps. 3. Cover and chill at least 3 hours or overnight. 4. Top with the berries to serve.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl, a whisk, and 5 jars with lids.\n2. Whisk the chia and protein powder into the kefir with a pinch of salt.\n3. Rest 5 minutes, then whisk again hard to break up the clumps.\n4. Divide between 5 jars. Add the berries when you eat it so they stay firm.\n5. Storage: fridge 4 days.\n6. Reheat: eat cold.",
 "makes": 5,
 "season": "A pinch of salt, cinnamon, and a little lemon zest. Vanilla if you have it.",
 "note": "A fermented, high-fibre pudding. Chia plus kefir is soluble fibre and live cultures in one jar."
},
{
 "id": "greek-yogurt-apple-cinnamon-walnut",
 "title": "Greek Yogurt with Apple, Cinnamon & Walnuts",
 "slot": "snack",
 "protein": "Greek yogurt plain nonfat|Skyr plain nonfat",
 "carb": "Apple raw with skin|Pear raw",
 "fat": "Walnuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "simple": true,
 "method": "1. Dice the apple, skin on. 2. Spoon the yogurt into a bowl and pile the apple on top. 3. Break the walnuts over the top and dust with cinnamon.",
 "season": "Cinnamon and a pinch of salt. Leaving the skin on the apple keeps the fibre.",
 "note": "Apple pie flavours for about a third of the calories, with walnuts for plant omega-3."
},
{
 "id": "cottage-cheese-kimchi-bowl",
 "title": "Cottage Cheese & Kimchi Bowl",
 "slot": "snack",
 "protein": "Cottage cheese 2%|Cottage cheese nonfat",
 "produce": "Kimchi|Cucumber raw",
 "fat": "Sesame oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Kimchi",
   60
  ]
 ],
 "method": "1. Spoon the cottage cheese into a bowl. 2. Top with the kimchi and a little of its juice. 3. Add the cucumber and scatter the sesame seeds over the top.",
 "season": "The kimchi brings the salt, heat and acid on its own. A few drops of soy sauce and some chili flakes if you want more.",
 "note": "Two fermented foods in one bowl. Sounds odd, tastes like a creamy, spicy Korean side dish."
},
{
 "id": "whipped-cottage-cheese-rye-cucumber",
 "title": "Whipped Cottage Cheese & Cucumber on Rye Crispbread",
 "slot": "snack",
 "protein": "Cottage cheese 2%|Cottage cheese nonfat",
 "carb": "Wasa Light Rye crispbread crackers|Rye bread|Rice cake brown rice",
 "produce": "Cucumber raw|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Blend the cottage cheese for 30 seconds until completely smooth, like cream cheese. 2. Toast the rye. 3. Spread it thickly with the whipped cottage cheese. 4. Top with sliced cucumber and a drizzle of the olive oil.",
 "season": "Salt, cracked black pepper, and dill. Everything bagel seasoning works here too. Blend the cottage cheese smooth so it spreads.",
 "note": "Rye is one of the cereal fibres with the best evidence for keeping you full."
},
{
 "id": "skyr-berries-brazil-nut",
 "title": "Skyr with Berries & One Brazil Nut",
 "slot": "snack",
 "protein": "Skyr plain nonfat|Greek yogurt plain nonfat",
 "carb": "Raspberries raw|Blueberries raw|Strawberries raw",
 "fat": "Brazil nuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "simple": true,
 "method": "1. Spoon the skyr into a bowl. 2. Top with the berries. 3. Chop the Brazil nut finely and scatter it over the top.",
 "season": "Cinnamon and a pinch of salt. One Brazil nut covers the day's selenium, which your thyroid uses to make its active hormone. Do not have more than one a day.",
 "note": "One Brazil nut a day is the simplest selenium fix there is. More than that is not better."
},
{
 "id": "kimchi-deviled-eggs",
 "title": "Kimchi Deviled Eggs",
 "slot": "snack",
 "protein": "Egg whole cooked",
 "fat": "Mayonnaise light",
 "produce": "Kimchi",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Kimchi",
   40
  ],
  [
   "Dijon mustard",
   5
  ]
 ],
 "method": "1. Halve the boiled eggs and tip the yolks into a bowl. 2. Mash the yolks with the mayonnaise and mustard until smooth. 3. Finely chop the kimchi and stir half of it through. 4. Spoon the filling back into the whites and top with the rest of the kimchi.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pot, a bowl, a fork, and 5 containers.\n2. Boil the eggs 10 minutes, then straight into ice water for 5. Peel.\n3. Halve them, mash the yolks with the mayonnaise, mustard and half the chopped kimchi.\n4. Fill the whites and top with the rest of the kimchi.\n5. Storage: fridge 3 days. Keep them covered or the tops dry out.",
 "makes": 5,
 "season": "The kimchi does the salt and the acid. A pinch of smoked paprika or gochugaru on top.",
 "note": "Deviled eggs with a fermented kick. Kimchi replaces the relish and adds live cultures."
},
{
 "id": "egg-sauerkraut-rye-bites",
 "title": "Egg & Sauerkraut Rye Bites",
 "slot": "snack",
 "protein": "Egg whole cooked",
 "carb": "Rye bread",
 "produce": "Sauerkraut",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Dijon mustard",
   5
  ]
 ],
 "method": "1. Toast the rye and cut it into quarters. 2. Spread a thin layer of mustard on each piece. 3. Top with sliced boiled egg and a forkful of sauerkraut. 4. Drizzle with a few drops of olive oil.",
 "season": "The sauerkraut and mustard carry the salt and the tang. Cracked black pepper and a few caraway seeds if you have them.",
 "note": "A German-style open sandwich: rye, egg and live-culture sauerkraut."
},
{
 "id": "everything-eggs-cherry-tomatoes",
 "title": "Everything-Spiced Boiled Eggs with Tomatoes",
 "slot": "snack",
 "protein": "Egg whole cooked",
 "produce": "Tomato raw|Cucumber raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "simple": true,
 "method": "1. Halve the boiled eggs. 2. Halve the tomatoes. 3. Arrange on a plate, drizzle with olive oil and shower with the seasoning.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pot and 5 containers.\n2. Boil the eggs 10 minutes and chill them in ice water.\n3. Peel and pack them whole with the tomatoes.\n4. Season just before eating so the salt does not pull water out of the tomatoes.\n5. Storage: fridge 5 days peeled.",
 "makes": 5,
 "season": "Everything bagel seasoning, flaky salt and black pepper. Salt the tomatoes too.",
 "note": "The simplest high-protein snack there is, and it keeps all week."
},
{
 "id": "spinach-pepper-egg-muffin-cups",
 "title": "Spinach & Pepper Egg Muffin Cups",
 "slot": "snack",
 "protein": "Egg white raw",
 "produce": "Spinach raw|Bell pepper red raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Onion raw",
   30
  ],
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Heat the oven to 350F and oil a muffin tin. 2. Chop the spinach, pepper and onion small and divide between the cups. 3. Beat the egg whites with the whole egg, salt and pepper, and pour over the vegetables. 4. Bake 18 to 20 minutes until set in the middle.",
 "batchQ": 2, "prepMethod": "1. Equipment: a 12-cup muffin tin, a bowl, a whisk, and a container.\n2. Heat the oven to 350F and brush the tin with the olive oil.\n3. Divide the chopped vegetables between the cups.\n4. Beat the egg whites with the whole egg, salt and pepper, and pour over.\n5. Bake 18 to 20 minutes until the centres are set.\n6. Cool on a rack before packing, or they sweat and go soggy.\n7. Storage: fridge 4 days, freezer 2 months.\n8. Reheat: microwave 30 to 45 seconds.",
 "makes": 6,
 "season": "Salt and pepper in the eggs, plus smoked paprika or a pinch of chili flakes. Hot sauce on top when you eat them.",
 "note": "Mostly egg whites with one whole egg for the flavour of the yolk. All-white muffins go rubbery; this keeps them tender and lean."
},
{
 "id": "sardine-lemon-rye-toasts",
 "title": "Sardine & Lemon Rye Toasts",
 "slot": "snack",
 "protein": "Sardines canned in oil",
 "carb": "Rye bread",
 "produce": "Tomato raw|Cucumber raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Toast the rye. 2. Mash the sardines lightly with a fork, bones and all (they are soft and full of calcium). 3. Spread over the toast and top with sliced tomato.",
 "season": "A generous squeeze of lemon is essential, plus cracked black pepper and a pinch of chili flakes. Fresh parsley if you have it.",
 "note": "Sardines are one of the richest sources of omega-3 there is, and the soft bones are real calcium."
},
{
 "id": "salmon-dill-cucumber-rounds",
 "title": "Salmon & Dill Cucumber Rounds",
 "slot": "snack",
 "protein": "Salmon pink canned",
 "produce": "Cucumber raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   40
  ]
 ],
 "method": "1. Drain the salmon and flake it into a bowl. 2. Stir in the yogurt until it holds together. 3. Slice the cucumber into thick rounds. 4. Spoon the salmon onto each round.",
 "season": "Salt, lemon juice, fresh dill and black pepper. A few capers on top if you have them.",
 "note": "Canned salmon is one of the cheapest omega-3 foods in the store."
},
{
 "id": "tuna-white-bean-lettuce-cups",
 "title": "Tuna & White Bean Lettuce Cups",
 "slot": "snack",
 "protein": "Tuna light canned in water",
 "carb": "White beans cooked",
 "produce": "Romaine lettuce|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Drain the tuna and beans. 2. Toss them together with the olive oil and chopped tomato. 3. Spoon into lettuce leaves.",
 "season": "Salt, a good squeeze of lemon, black pepper, and a little red onion or parsley if you have it. This is the Tuscan combination and it needs the lemon.",
 "note": "A classic Italian pairing. Tuna plus beans is protein plus fibre, which is the fullness combination."
},
{
 "id": "mackerel-pate-rye",
 "title": "Mackerel Pate on Rye",
 "slot": "snack",
 "protein": "Mackerel jack canned|Mackerel Atlantic cooked",
 "carb": "Rye bread",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   40
  ]
 ],
 "method": "1. Flake the mackerel into a bowl, removing any large bones. 2. Mash it with the yogurt until spreadable. 3. Toast the rye and spread the pate on thickly.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl, a fork, and a lidded container.\n2. Mash the mackerel with the yogurt, lemon juice, salt and pepper.\n3. Pack it in a sealed container.\n4. Toast the rye fresh when you eat it.\n5. Storage: fridge 3 days.",
 "makes": 4,
 "season": "Plenty of lemon juice, salt, black pepper, and a pinch of horseradish or mustard if you like heat. Dill on top.",
 "note": "Mackerel is the single richest common source of omega-3. One portion covers most of a week's target."
},
{
 "id": "spicy-tuna-cucumber-boats",
 "title": "Spicy Tuna Cucumber Boats",
 "slot": "snack",
 "protein": "Tuna light canned in water",
 "produce": "Cucumber raw",
 "fat": "Mayonnaise light",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Sriracha / hot sauce",
   10
  ],
  [
   "Soy sauce",
   5
  ]
 ],
 "method": "1. Drain the tuna well. 2. Mix it with the mayonnaise, sriracha and soy sauce. 3. Halve the cucumber lengthways and scoop out the seeds with a teaspoon. 4. Fill the cucumber halves with the tuna.",
 "season": "The sriracha and soy do most of it. A squeeze of lime, sesame seeds and sliced scallion on top.",
 "note": "Spicy tuna roll flavour without the rice, and almost all protein and water."
},
{
 "id": "edamame-hummus-veg",
 "title": "Whipped Edamame Dip with Crunchy Vegetables",
 "slot": "snack",
 "protein": "Edamame cooked",
 "produce": "Carrots raw|Celery raw|Bell pepper red raw|Cucumber raw",
 "fat": "Tahini \\(sesame butter\\)",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Garlic raw",
   4
  ]
 ],
 "method": "1. Blend the edamame with the tahini, garlic and a splash of water until smooth. 2. Cut the vegetables into sticks. 3. Serve the dip with the sticks.",
 "batchQ": 3, "prepMethod": "1. Equipment: a food processor, a knife, and 5 small containers.\n2. Blend the edamame, tahini, garlic, lemon juice, salt and 2 to 3 Tbsp water until smooth.\n3. Cut the vegetables into sticks.\n4. Divide the dip between 5 pots with the sticks alongside.\n5. Storage: fridge 5 days.",
 "makes": 5,
 "season": "Salt, plenty of lemon juice, cumin, and a drizzle of olive oil and a pinch of paprika on top.",
 "note": "Edamame instead of chickpeas gives this dip about twice the protein of the usual version."
},
{
 "id": "tofu-kimchi-bites",
 "title": "Crispy Tofu & Kimchi Bites",
 "slot": "snack",
 "protein": "Tofu firm",
 "produce": "Vegan kimchi|Kimchi",
 "fat": "Sesame oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Vegan kimchi",
   50
  ],
  [
   "Soy sauce",
   5
  ]
 ],
 "method": "1. Press the tofu for 10 minutes and cut it into cubes. 2. Fry in the oil over medium-high heat until golden on two sides. 3. Splash in the soy sauce and toss. 4. Serve topped with chopped kimchi.",
 "season": "The kimchi brings salt, heat and acid. Sesame seeds and sliced scallion on top.",
 "note": "Tofu for protein, kimchi for live cultures. A Korean bar snack, made light."
},
{
 "id": "pea-protein-chia-pudding",
 "title": "Plant Protein Chia Pudding with Berries",
 "slot": "snack",
 "protein": "Pea & rice protein powder",
 "carb": "Blueberries raw|Raspberries raw|Strawberries raw",
 "fat": "Chia seeds",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Almond milk unsweetened",
   200
  ]
 ],
 "method": "1. Whisk the protein powder into the almond milk until smooth. 2. Whisk in the chia seeds. 3. Wait 5 minutes and whisk again hard. 4. Chill at least 3 hours. 5. Top with berries.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl, a whisk, and 5 jars.\n2. Whisk the protein powder and a pinch of salt into the almond milk, then the chia.\n3. Rest 5 minutes, whisk hard again.\n4. Divide between jars. Add the berries when you eat it so they stay firm.\n5. Storage: fridge 4 days.\n6. Reheat: eat cold.",
 "makes": 5,
 "season": "A pinch of salt, cinnamon, and a little lemon zest. The salt matters more than the sweetener.",
 "note": "A fully plant-based, high-protein, high-fibre pudding."
},
{
 "id": "apple-skyr-dip-brazil-nut",
 "title": "Apple Slices with Cinnamon Skyr Dip & a Brazil Nut",
 "slot": "snack",
 "protein": "Skyr plain nonfat|Greek yogurt plain nonfat",
 "carb": "Apple raw with skin|Pear raw",
 "fat": "Brazil nuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "simple": true,
 "method": "1. Slice the apple. 2. Stir cinnamon into the skyr for a dip. 3. Eat the apple slices dipped in the skyr, with the Brazil nut on the side.",
 "season": "Cinnamon and a pinch of salt in the skyr. One Brazil nut only: it covers your selenium for the day.",
 "note": "Crunchy, sweet, creamy, and it quietly covers your selenium."
},
{
 "id": "pear-cottage-cheese-brazil-nut",
 "title": "Pear & Cottage Cheese with a Brazil Nut",
 "slot": "snack",
 "protein": "Cottage cheese 2%|Cottage cheese nonfat",
 "carb": "Pear raw|Peach raw",
 "fat": "Brazil nuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "simple": true,
 "method": "1. Slice the pear. 2. Spoon the cottage cheese into a bowl and fan the pear over it. 3. Chop the Brazil nut and scatter it over the top.",
 "season": "Black pepper and a pinch of flaky salt. Pear and pepper is a classic pairing. One Brazil nut a day is the ceiling.",
 "note": "A cheese-plate combination made high-protein."
},
{
 "id": "cucumber-tomato-egg-salad-cup",
 "title": "Cucumber, Tomato & Egg Salad Cup",
 "slot": "snack",
 "protein": "Egg whole cooked",
 "produce": "Cucumber raw|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Onion raw",
   20
  ]
 ],
 "method": "1. Chop the boiled eggs, cucumber, tomato and onion into bite-size pieces. 2. Toss with the olive oil. 3. Season and eat straight away.",
 "season": "Salt, black pepper, and a splash of red wine vinegar or lemon juice. Oregano or dill.",
 "note": "Mostly water and protein by weight, which is exactly the combination that fills you up."
},
{
 "id": "turkey-pickle-rollups",
 "title": "Turkey & Pickle Roll-Ups",
 "slot": "snack",
 "protein": "Turkey breast roasted|Chicken breast cooked",
 "produce": "Pickles dill|Cucumber raw",
 "fat": "Avocado raw|Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Yellow mustard",
   8
  ]
 ],
 "simple": true,
 "method": "1. Lay out the turkey slices. 2. Spread each with a little mustard. 3. Roll each slice around a pickle spear. 4. Serve with sliced avocado on the side.",
 "season": "The pickle and mustard do all the salt and acid. Black pepper.",
 "note": "About as close to pure protein as a snack gets, with the crunch of a pickle."
},
{
 "id": "chicken-greek-salad-cup",
 "title": "Chicken Greek Salad Cup",
 "slot": "snack",
 "protein": "Chicken breast cooked|Chicken breast canned",
 "produce": "Cucumber raw|Tomato raw",
 "fat": "Olive oil|Olives ripe",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Feta cheese",
   15
  ],
  [
   "Onion raw",
   15
  ]
 ],
 "method": "1. Dice the chicken, cucumber, tomato and onion. 2. Toss with the olive oil. 3. Crumble the feta over the top.",
 "batchQ": 2, "prepMethod": "1. Equipment: a knife, a bowl, and 5 containers.\n2. Dice everything and divide between the containers, keeping the tomato and cucumber in their own corner so their juice does not soak the chicken.\n3. Crumble the feta on top.\n4. Pack the oil and vinegar dressing separately and dress it just before eating.\n5. Storage: fridge 4 days.\n6. Reheat: eat cold.",
 "makes": 5,
 "season": "Salt, dried oregano, red wine vinegar and black pepper.",
 "note": "A Greek salad with enough protein to count as a meal."
},
{
 "id": "miso-edamame",
 "title": "Miso-Glazed Edamame",
 "slot": "snack",
 "protein": "Edamame cooked",
 "fat": "Sesame oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Miso paste",
   10
  ]
 ],
 "simple": true,
 "method": "1. Steam or microwave the edamame until hot. 2. Stir the miso paste with the sesame oil and a teaspoon of hot water into a loose glaze. 3. Toss the edamame in the glaze.",
 "season": "The miso is salty and savoury on its own. A squeeze of lime, a pinch of chili flakes and sesame seeds.",
 "note": "Miso is fermented soybean, so this is protein plus live cultures in one bowl."
},
{
 "id": "hummus-radish-rye-pumpkin-seeds",
 "title": "Hummus, Egg & Radish Rye Toast",
 "slot": "snack",
 "protein": "Egg whole cooked",
 "carb": "Rye bread",
 "produce": "Radish raw|Cucumber raw",
 "fat": "Hummus",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "method": "1. Toast the rye. 2. Spread it with the hummus. 3. Top with sliced boiled egg and thinly sliced radish.",
 "season": "Flaky salt, a squeeze of lemon, and a pinch of paprika or za'atar.",
 "note": "The egg carries the protein here. Hummus is mostly fat by calories, so it is the spread, not the protein."
},
{
 "id": "kefir-cocoa-protein-shake",
 "title": "Chocolate Kefir Protein Shake",
 "slot": "snack",
 "protein": "Whey protein powder",
 "carb": "Banana raw",
 "fat": "Peanut butter smooth|Almond butter",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Cocoa powder unsweetened",
   8
  ],
  [
   "Kefir plain low-fat",
   200
  ]
 ],
 "simple": true,
 "method": "1. Put the kefir, protein powder, banana, cocoa and nut butter in a blender. 2. Blend with a handful of ice until thick and smooth.",
 "season": "A pinch of salt makes chocolate taste like chocolate. Cinnamon or a little instant coffee to deepen it.",
 "note": "A chocolate milkshake that is actually fermented and high-protein."
},
{
 "id": "potato-leek-chicken-soup",
 "title": "Potato, Leek & Chicken Soup",
 "slot": "lunch",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "Potato baked flesh",
 "produce": "Leeks cooked|Celery raw",
 "fat": "Olive oil|Butter salted",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   400
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Soften the sliced leeks and celery in the oil with a pinch of salt for 8 minutes without browning. 2. Add the garlic, the diced potato and the broth and simmer 15 minutes until the potato is soft. 3. Blend half the soup and stir it back in so it is creamy but still chunky. 4. Stir in the shredded chicken and warm through.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a knife, a stick blender, and 5 containers.\n2. Soften the leeks and celery in the oil with a pinch of salt, 8 minutes, no colour.\n3. Add the garlic, potato and broth. Simmer 15 minutes until the potato breaks when pressed.\n4. Blend half of it, leave the rest chunky, then stir in the shredded chicken.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt it properly, then white pepper, fresh thyme, and a squeeze of lemon right at the end. Chives on top.",
 "note": "Potato and leek is the classic, and potatoes are the single most filling food ever measured in the satiety index."
},
{
 "id": "salmon-potato-chowder",
 "title": "Salmon & Potato Chowder",
 "slot": "dinner",
 "protein": "Salmon Atlantic farmed cooked|Salmon pink canned",
 "carb": "Potato baked flesh",
 "produce": "Leeks cooked|Celery raw|Sweet corn cooked",
 "fat": "Butter salted|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   350
  ],
  [
   "Greek yogurt plain nonfat",
   60
  ]
 ],
 "method": "1. Soften the leeks and celery in the butter for 6 minutes. 2. Add the diced potato and broth and simmer 12 minutes until tender. 3. Add the corn and the salmon in large chunks and simmer 4 minutes until the fish just flakes. 4. Off the heat, stir in the yogurt so it does not split.",
 "batchQ": 2, "prepMethod": "1. Equipment: a large pot, a knife, and 5 containers.\n2. Soften the leeks and celery in the butter, 6 minutes.\n3. Add the potato and broth, simmer 12 minutes.\n4. Add the corn and salmon, simmer 4 minutes until the fish just flakes. Take it off the heat before stirring in the yogurt.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 3 days. To freeze a portion, set it aside before the yogurt goes in and freeze it up to 1 month; stir yogurt in after reheating.\n7. Reheat: Reheat gently and do not let it boil, or the yogurt splits and the salmon toughens.",
 "makes": 5,
 "season": "Salt, black pepper, a bay leaf in the simmer, and plenty of fresh dill and lemon juice at the end.",
 "note": "A creamy chowder with a full portion of omega-3 in every bowl. Yogurt replaces the cream."
},
{
 "id": "lemon-chicken-rice-avgolemono",
 "title": "Greek Lemon Chicken & Rice Soup (Avgolemono)",
 "slot": "lunch",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Carrots cooked|Celery raw|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   450
  ],
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Simmer the broth with the carrots and celery for 10 minutes. 2. Add the rice and shredded chicken. 3. Whisk the egg with the lemon juice, then slowly whisk in a ladle of the hot broth. 4. Pour it back into the pot off the heat and stir until the soup turns silky. Do not let it boil again. 5. Stir in the spinach to wilt.",
 "batchQ": 2, "prepMethod": "1. Equipment: a large pot, a bowl, a whisk, and 5 containers.\n2. Simmer the broth with the carrots and celery, 10 minutes.\n3. Add the rice and shredded chicken.\n4. Whisk the eggs with the lemon juice, temper with a ladle of hot broth, then stir into the pot off the heat.\n5. Stir in the spinach.\n6. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n7. Storage: fridge 4 days, freezer 2 months.\n8. Reheat: Reheat gently below a boil or the egg scrambles.",
 "makes": 5,
 "season": "Plenty of lemon is the whole dish, plus salt, black pepper and fresh dill. Taste it at the end: it should be bright and sharp.",
 "note": "The Greek chicken soup. Egg and lemon make it creamy with no cream at all."
},
{
 "id": "chicken-tortilla-soup",
 "title": "Chicken Tortilla Soup",
 "slot": "dinner",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "Black beans cooked|Pinto beans cooked",
 "produce": "Tomato raw|Sweet corn cooked|Bell pepper cooked",
 "fat": "Avocado raw",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   400
  ],
  [
   "Onion raw",
   60
  ],
  [
   "Corn tortilla",
   24
  ],
  [
   "Salsa",
   40
  ]
 ],
 "method": "1. Soften the onion and pepper in a little broth for 5 minutes. 2. Add the tomato, beans, corn, salsa and the rest of the broth and simmer 15 minutes. 3. Stir in the shredded chicken. 4. Cut the tortilla into strips and crisp them in a dry pan. 5. Serve topped with the avocado and the tortilla strips.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a knife, a dry pan, and 5 containers.\n2. Soften the onion and pepper, 5 minutes.\n3. Add the tomato, beans, corn, salsa and broth, simmer 15 minutes.\n4. Stir in the shredded chicken.\n5. Crisp the tortilla strips in a dry pan and keep them in a separate bag so they stay crunchy.\n6. Add the avocado fresh when you eat it, never in the container.\n7. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n8. Storage: fridge 4 days, freezer 3 months.\n9. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Cumin, chili powder, smoked paprika, oregano, salt, and lots of lime juice at the end. Cilantro on top.",
 "note": "Everything good about tacos in a bowl, with the beans doing the fibre work."
},
{
 "id": "ginger-chicken-congee",
 "title": "Ginger Chicken Congee",
 "slot": "breakfast",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "White rice cooked",
 "produce": "Spinach raw|Bok choy cooked",
 "fat": "Sesame oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   500
  ],
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Simmer the cooked rice in the broth, stirring often, for 20 to 25 minutes until it breaks down into a thick porridge. 2. Stir in the shredded chicken and the greens. 3. Crack in the egg and stir until it sets in ribbons. 4. Finish with the sesame oil.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a wooden spoon, and 5 containers.\n2. Simmer the rice in the broth, stirring often, 20 to 25 minutes until it breaks down.\n3. Stir in the chicken and greens, then the beaten eggs until they set in ribbons.\n4. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n5. Storage: fridge 4 days, freezer 3 months.\n6. Reheat: It thickens a lot in the fridge. Loosen it with water or broth while reheating.",
 "makes": 5,
 "season": "A lot of fresh ginger in the simmer, salt, white pepper, soy sauce, and sliced scallion and a drizzle of chili oil on top.",
 "note": "The Chinese breakfast rice porridge. Mostly water by weight, which is why it holds you until lunch."
},
{
 "id": "beef-barley-vegetable-soup",
 "title": "Beef, Barley & Vegetable Soup",
 "slot": "dinner",
 "protein": "Beef top round lean cooked|Beef ground 93/7 cooked",
 "carb": "Barley cooked",
 "produce": "Carrots cooked|Celery raw|Cabbage cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   450
  ],
  [
   "Onion raw",
   60
  ],
  [
   "Tomato raw",
   80
  ]
 ],
 "method": "1. Brown the beef in the oil in batches. 2. Add the onion, carrots and celery and cook 5 minutes. 3. Add the tomato, broth and barley and simmer 25 minutes. 4. Stir in the cabbage for the last 8 minutes.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large heavy pot, a knife, and 5 containers.\n2. Brown the beef in batches so it sears rather than steams.\n3. Add the onion, carrots and celery, 5 minutes.\n4. Add the tomato, broth and barley, simmer 25 minutes.\n5. Add the cabbage for the last 8 minutes.\n6. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n7. Storage: fridge 4 days, freezer 3 months.\n8. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, black pepper, thyme, a bay leaf, and a splash of Worcestershire or red wine vinegar at the end to brighten it.",
 "note": "Barley is one of the cereal fibres with the best evidence for keeping you full."
},
{
 "id": "turkey-vegetable-white-bean-soup",
 "title": "Turkey, White Bean & Kale Soup",
 "slot": "lunch",
 "protein": "Turkey ground 93/7 cooked|Turkey breast roasted",
 "carb": "White beans cooked|Navy beans cooked",
 "produce": "Kale cooked|Carrots cooked|Celery raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   450
  ],
  [
   "Onion raw",
   50
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Tomato raw",
   60
  ]
 ],
 "method": "1. Brown the turkey in the oil and break it up. 2. Add the onion, carrots, celery and garlic and cook 5 minutes. 3. Add the tomato, beans and broth and simmer 15 minutes. 4. Stir in the kale for the last 5 minutes.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a knife, and 5 containers.\n2. Brown the turkey, breaking it up.\n3. Add the aromatics, 5 minutes.\n4. Add the tomato, beans and broth, simmer 15 minutes.\n5. Stir in the kale for the last 5 minutes.\n6. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n7. Storage: fridge 4 days, freezer 3 months.\n8. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, black pepper, rosemary, a pinch of chili flakes, and a squeeze of lemon and grated parmesan to finish if you eat dairy.",
 "note": "Lean protein, beans and greens in one pot. Freezes perfectly."
},
{
 "id": "cod-tomato-white-bean-stew",
 "title": "Cod, Tomato & White Bean Stew",
 "slot": "dinner",
 "protein": "Cod Atlantic cooked|Haddock cooked|Pollock cooked",
 "carb": "White beans cooked|Potato baked flesh",
 "produce": "Tomato raw|Spinach raw|Bell pepper cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Chicken broth low-sodium",
   250
  ]
 ],
 "method": "1. Soften the onion, pepper and garlic in the oil for 6 minutes. 2. Add the tomato, beans and broth and simmer 12 minutes. 3. Nestle the fish in the stew, cover, and cook 6 to 8 minutes until it flakes. 4. Stir in the spinach.",
 "batchQ": 3, "prepMethod": "1. Equipment: a wide pan with a lid, a knife, and 4 containers.\n2. Soften the onion, pepper and garlic, 6 minutes.\n3. Add the tomato, beans and broth, simmer 12 minutes.\n4. SPLIT COOK: fish keeps 3 days cooked, so cook it fresh on the day, 6 to 8 minutes in a portion of the base. Freeze the raw fish in portions today, since raw fish keeps only 1 to 2 days in the fridge, and thaw one in the fridge the night before. The base alone keeps 4 days and freezes.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days for the base, freezer 2 months (base only).\n7. Reheat: Bring a portion of the base to a simmer, add the fish and cook 6 to 8 minutes.",
 "makes": 4,
 "season": "Salt, smoked paprika, a pinch of saffron or chili flakes if you have them, and lemon juice and parsley at the end.",
 "note": "A Spanish-style fish stew. White fish is almost pure protein, so the beans bring the fibre."
},
{
 "id": "thai-coconut-free-fish-soup",
 "title": "Thai Hot & Sour Fish Soup",
 "slot": "dinner",
 "protein": "Tilapia cooked|Cod Atlantic cooked|Pollock cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Tomato raw|Bok choy cooked|Bell pepper cooked",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   450
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Simmer the broth with the garlic and aromatics for 10 minutes. 2. Add the tomato and pepper and simmer 3 minutes. 3. Add the fish in chunks and poach 4 to 5 minutes. 4. Stir in the greens and season hard with lime and fish sauce. 5. Serve over the rice.",
 "season": "This soup lives on the balance: lots of lime juice, fish sauce or salt, fresh ginger, lemongrass if you have it, and chili. Taste it and push it until it is sour, salty and hot all at once. Cilantro on top.",
 "note": "Tom yum style, with no coconut milk, so it stays light."
},
{
 "id": "miso-tofu-greens-soup",
 "title": "Miso Soup with Tofu, Greens & Rice",
 "slot": "lunch",
 "protein": "Tofu firm|Tofu silken",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Spinach raw|Bok choy cooked|Seaweed snack roasted",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Miso paste",
   25
  ],
  [
   "Edamame cooked",
   60
  ]
 ],
 "method": "1. Heat water to a bare simmer. 2. Add the tofu cubes, edamame and greens and warm 3 minutes. 3. Take it off the heat, whisk the miso with a ladle of the hot water, and stir it back in. 4. Serve over the rice with a few drops of sesame oil and crumbled seaweed.",
 "season": "The miso is the salt. Never boil it once it is in or you kill the live cultures and flatten the flavour. Sliced scallion and a little soy sauce.",
 "note": "Miso is fermented soybean with live cultures, and tofu plus edamame makes this a proper protein bowl."
},
{
 "id": "black-bean-soup-lime",
 "title": "Cuban Black Bean Soup",
 "slot": "lunch",
 "protein": "Black beans cooked",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Bell pepper cooked|Tomato raw|Onion raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   8
  ],
  [
   "Salsa",
   40
  ]
 ],
 "method": "1. Soften the onion, pepper and garlic in the oil for 8 minutes. 2. Add the beans, tomato and a little water and simmer 15 minutes. 3. Blend about a third of it so it is thick, then stir it back in. 4. Serve over rice.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a stick blender, and 5 containers.\n2. Soften the onion, pepper and garlic, 8 minutes.\n3. Add the beans, tomato and water, simmer 15 minutes.\n4. Blend a third of it, stir it back in.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Cumin, oregano, a bay leaf, salt, and a good splash of vinegar or lime juice at the end. Onion and cilantro on top.",
 "note": "Black beans are one of the highest-fibre foods there is. The vinegar at the end is the classic finish."
},
{
 "id": "tvp-red-chili",
 "title": "High-Protein Plant Chili",
 "slot": "dinner",
 "protein": "TVP \\(textured soy protein\\) dry",
 "carb": "Kidney beans cooked|Black beans cooked|Pinto beans cooked",
 "produce": "Tomato raw|Bell pepper cooked|Onion raw",
 "fat": "Olive oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   70
  ],
  [
   "Garlic raw",
   8
  ],
  [
   "Tomato raw",
   150
  ]
 ],
 "method": "1. Soften the onion, pepper and garlic in the oil for 6 minutes. 2. Add the spices and cook 1 minute. 3. Add the tomato, beans, the dry TVP and enough water to cover, and simmer 20 minutes until the TVP is tender and it has thickened.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Soften the onion, pepper and garlic, 6 minutes.\n3. Bloom the spices 1 minute.\n4. Add the tomato, beans, dry TVP and water to cover. Simmer 20 minutes, stirring, until thick.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 4 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Chili powder, cumin, smoked paprika, oregano, salt, a square of dark chocolate or a pinch of cocoa for depth, and lime juice at the end.",
 "note": "TVP is soy with most of the fat removed. It gives a plant chili the texture of ground meat and about twice the protein of beans alone."
},
{
 "id": "red-lentil-tomato-soup",
 "title": "Red Lentil & Tomato Soup",
 "slot": "lunch",
 "protein": "Lentils cooked",
 "carb": "Lentils cooked",
 "produce": "Carrots cooked|Tomato raw|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Tomato raw",
   120
  ]
 ],
 "method": "1. Soften the onion, carrot and garlic in the oil for 6 minutes. 2. Add the spices, then the tomato, lentils and water. 3. Simmer 15 minutes. 4. Blend until smooth, then stir in the spinach.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a stick blender, and 5 containers.\n2. Soften the onion, carrot and garlic, 6 minutes.\n3. Add the spices, tomato, lentils and water, simmer 15 minutes.\n4. Blend smooth, then stir in the spinach.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Cumin, smoked paprika, salt, and lemon juice to finish. A spoon of yogurt on top if you eat dairy.",
 "note": "Smooth, filling, and done in 25 minutes."
},
{
 "id": "egg-drop-tofu-soup",
 "title": "Egg Drop Soup with Tofu & Spinach",
 "slot": "snack",
 "protein": "Egg white raw",
 "produce": "Spinach raw|Bok choy cooked",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   350
  ],
  [
   "Tofu firm",
   60
  ],
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Bring the broth to a simmer with the tofu cubes. 2. Stir the soup in one direction to make a slow whirlpool. 3. Beat the egg whites with the whole egg and pour them in slowly in a thin stream so they set in ribbons. 4. Stir in the spinach and finish with sesame oil.",
 "season": "Salt, white pepper, a little soy sauce, and grated ginger. Sliced scallion on top.",
 "note": "Mostly egg whites with one whole egg for colour and richness, so it is almost pure protein and water. Ready in 5 minutes."
},
{
 "id": "chicken-vegetable-soup-classic",
 "title": "Classic Chicken & Vegetable Soup",
 "slot": "lunch",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "Potato baked flesh|Brown rice cooked",
 "produce": "Carrots cooked|Celery raw|Green beans cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   500
  ],
  [
   "Onion raw",
   60
  ]
 ],
 "method": "1. Soften the onion, carrots and celery in the oil for 6 minutes. 2. Add the broth and diced potato and simmer 15 minutes. 3. Add the green beans and shredded chicken for the last 5 minutes.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Soften the onion, carrots and celery, 6 minutes.\n3. Add the broth and potato, simmer 15 minutes.\n4. Add the green beans and chicken for the last 5 minutes.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, black pepper, thyme, a bay leaf, and a squeeze of lemon and a handful of parsley at the end. The lemon is what stops it tasting flat.",
 "note": "The one everyone knows. Mostly water, full of protein, and it freezes for months."
},
{
 "id": "butternut-squash-lentil-soup",
 "title": "Butternut Squash & Lentil Soup",
 "slot": "lunch",
 "protein": "Lentils cooked",
 "carb": "Butternut squash baked",
 "produce": "Carrots cooked|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Soften the onion and garlic in the oil. 2. Add the squash, carrots, lentils and water and simmer 15 minutes. 3. Blend until smooth.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a stick blender, and 5 containers.\n2. Soften the onion and garlic.\n3. Add the squash, carrots, lentils and water, simmer 15 minutes.\n4. Blend smooth.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, cumin, a pinch of cinnamon or nutmeg, chili flakes, and lemon juice to finish. Toasted pumpkin seeds on top.",
 "note": "Squash makes it creamy with no cream, and the lentils make it a meal."
},
{
 "id": "shrimp-sausage-free-gumbo",
 "title": "Chicken & Okra Gumbo-Style Stew",
 "slot": "dinner",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Okra cooked|Bell pepper cooked|Celery raw",
 "fat": "Olive oil|Avocado oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   400
  ],
  [
   "Onion raw",
   70
  ],
  [
   "Tomato raw",
   100
  ]
 ],
 "method": "1. Cook the onion, pepper and celery (the holy trinity) in the oil for 8 minutes. 2. Add the Cajun spices and cook 1 minute. 3. Add the tomato, okra and broth and simmer 20 minutes. 4. Stir in the chicken and serve over rice.",
 "batchQ": 3, "prepMethod": "1. Equipment: a heavy pot and 5 containers.\n2. Cook the onion, pepper and celery, 8 minutes.\n3. Bloom the Cajun spices, 1 minute.\n4. Add the tomato, okra and broth, simmer 20 minutes. The okra thickens it naturally.\n5. Stir in the chicken. Pack the rice separately so it does not go soggy.\n6. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n7. Storage: fridge 4 days, freezer 3 months.\n8. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Cajun seasoning, thyme, a bay leaf, cayenne, salt, and hot sauce at the table. Okra thickens it without a butter-and-flour roux.",
 "note": "Gumbo flavours without the roux, so most of the fat is gone."
},
{
 "id": "split-pea-ham-free-soup-smoked",
 "title": "Smoky Split Pea & Turkey Soup",
 "slot": "lunch",
 "protein": "Turkey breast roasted|Turkey ground 93/7 cooked",
 "carb": "Split peas cooked",
 "produce": "Carrots cooked|Celery raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Chicken broth low-sodium",
   400
  ]
 ],
 "method": "1. Soften the onion, carrot and celery in the oil. 2. Add the split peas and broth and simmer 20 minutes until thick. 3. Stir in the diced turkey.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Soften the onion, carrot and celery.\n3. Add the split peas and broth, simmer 20 minutes.\n4. Stir in the turkey.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Smoked paprika does the work ham used to do. Salt, black pepper, thyme, and a splash of vinegar at the end.",
 "note": "Split pea soup with lean turkey in place of ham, and the smoke from paprika."
},
{
 "id": "mediterranean-chickpea-spinach-stew",
 "title": "Chickpea, Spinach & Tomato Stew with Egg",
 "slot": "breakfast",
 "protein": "Egg whole raw",
 "carb": "Chickpeas cooked",
 "produce": "Spinach raw|Tomato raw|Bell pepper cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Onion raw",
   50
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Soften the onion, pepper and garlic in the oil. 2. Add the tomato and chickpeas and simmer 8 minutes. 3. Stir in the spinach. 4. Make wells and crack in the eggs, cover, and cook 5 to 7 minutes until the whites set.",
 "season": "Cumin, smoked paprika, salt, a pinch of chili, and a squeeze of lemon. Parsley on top.",
 "note": "Shakshuka's cousin, with chickpeas for fibre."
},
{
 "id": "pumpkin-white-bean-soup",
 "title": "Pumpkin & White Bean Soup",
 "slot": "lunch",
 "protein": "White beans cooked|Navy beans cooked",
 "carb": "Pumpkin canned",
 "produce": "Carrots cooked|Kale cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   50
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Soften the onion and garlic in the oil. 2. Add the pumpkin, beans, carrots and water and simmer 12 minutes. 3. Blend half of it and stir it back. 4. Stir in the kale.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot, a stick blender, and 5 containers.\n2. Soften the onion and garlic.\n3. Add the pumpkin, beans, carrots and water, simmer 12 minutes.\n4. Blend half, stir it back, then add the kale.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, sage, a pinch of nutmeg, black pepper, and a splash of apple cider vinegar at the end.",
 "note": "Canned pumpkin is one of the cheapest, easiest sources of vitamin A there is."
},
{
 "id": "beef-cabbage-roll-soup",
 "title": "Unstuffed Cabbage Roll Soup",
 "slot": "dinner",
 "protein": "Beef ground 93/7 cooked|Turkey ground 93/7 cooked",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Cabbage cooked|Tomato raw|Carrots cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Chicken broth low-sodium",
   350
  ]
 ],
 "method": "1. Brown the meat with the onion and garlic. 2. Add the cabbage, carrots, tomato and broth and simmer 20 minutes. 3. Stir in the rice.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Brown the meat with the onion and garlic.\n3. Add the cabbage, carrots, tomato and broth, simmer 20 minutes.\n4. Stir in the rice.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, paprika, a bay leaf, and a real splash of vinegar and a pinch of sugar or sweetener at the end for the sweet-sour taste of cabbage rolls.",
 "note": "All the flavour of cabbage rolls with none of the rolling."
},
{
 "id": "sardine-tomato-pasta-soup",
 "title": "Tomato & White Bean Soup with Sardines",
 "slot": "lunch",
 "protein": "Sardines canned in oil",
 "carb": "White beans cooked|Chickpeas cooked",
 "produce": "Tomato raw|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Garlic raw",
   6
  ],
  [
   "Onion raw",
   40
  ]
 ],
 "method": "1. Soften the onion and garlic in the oil. 2. Add the tomato and beans with a little water and simmer 10 minutes. 3. Stir in the spinach. 4. Break the sardines over the top to warm through.",
 "season": "Salt, chili flakes, lemon zest and juice, and parsley. The lemon is essential with sardines.",
 "note": "Sardines are one of the richest omega-3 sources there is, and they turn a pantry soup into a real meal."
},
{
 "id": "vegan-lentil-mushroom-free-stew",
 "title": "French Lentil & Root Vegetable Stew",
 "slot": "dinner",
 "protein": "Lentils cooked",
 "carb": "Potato baked flesh|Sweet potato baked",
 "produce": "Carrots cooked|Celery raw|Kale cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Tomato raw",
   60
  ]
 ],
 "method": "1. Soften the onion, carrot, celery and garlic in the oil. 2. Add the tomato, potato, lentils and water and simmer 20 minutes. 3. Stir in the kale.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Soften the onion, carrot, celery and garlic.\n3. Add the tomato, potato, lentils and water, simmer 20 minutes.\n4. Stir in the kale.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Salt, thyme, a bay leaf, black pepper, and a spoon of Dijon mustard and a splash of red wine vinegar at the end.",
 "note": "A rustic French stew. Potatoes and lentils together make it about as filling as food gets."
},
{
 "id": "chicken-lime-rice-soup-mexican",
 "title": "Mexican Chicken, Lime & Rice Soup",
 "slot": "lunch",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Zucchini cooked|Carrots cooked|Tomato raw",
 "fat": "Avocado raw",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Chicken broth low-sodium",
   450
  ],
  [
   "Onion raw",
   50
  ]
 ],
 "method": "1. Simmer the broth with the onion, carrot and zucchini for 10 minutes. 2. Add the rice and shredded chicken. 3. Serve with the avocado and a lot of lime.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Simmer the broth with the onion, carrot and zucchini, 10 minutes.\n3. Add the rice and chicken.\n4. Add the avocado and lime fresh when you eat it.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Reheat gently on the stove or 2 to 3 minutes in the microwave, stirring halfway, with a splash of water if it has thickened.",
 "makes": 5,
 "season": "Cumin, oregano, salt, and a whole lime squeezed into each bowl. Cilantro and a little jalapeno on top.",
 "note": "Caldo de pollo style. Light, bright, and a proper portion of protein."
},
{
 "id": "grilled-mackerel-warm-potato-salad",
 "title": "Grilled Mackerel with Warm Potato & Green Bean Salad",
 "slot": "dinner",
 "protein": "Mackerel Atlantic cooked|Mackerel jack canned",
 "carb": "Potato baked flesh",
 "produce": "Green beans cooked|Arugula raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Dijon mustard",
   8
  ],
  [
   "Onion raw",
   25
  ]
 ],
 "method": "1. Boil the potatoes until tender, adding the green beans for the last 4 minutes. 2. Drain and toss while warm with the mustard, oil, sliced onion and a splash of vinegar. 3. Grill or pan-fry the mackerel skin-side down until the skin crisps, about 4 minutes, then 1 minute on the flesh. 4. Serve the fish over the potatoes and arugula.",
 "batchQ": 1, "prepMethod": "1. Equipment: a pot, a pan, a bowl, and 4 containers.\n2. Boil the potatoes, add the beans for the last 4 minutes, and dress them warm with mustard, oil, onion and vinegar.\n3. Cook the mackerel skin-side down until crisp.\n4. Pack the salad and fish together.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold, or warm gently for 60 to 90 seconds. Fish goes dry fast, so do not overheat it.",
 "makes": 4,
 "season": "Salt, black pepper, and a sharp mustard vinaigrette with plenty of vinegar or lemon. Mackerel is rich and needs the acid to cut through it.",
 "note": "Mackerel is the richest common source of omega-3, and one portion covers most of a week's target."
},
{
 "id": "mackerel-teriyaki-rice-bowl",
 "title": "Mackerel Teriyaki Rice Bowl",
 "slot": "dinner",
 "protein": "Mackerel Atlantic cooked",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Bok choy cooked|Broccoli cooked|Cucumber raw",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Teriyaki sauce sugar-free",
   25
  ],
  [
   "Kimchi",
   40
  ]
 ],
 "method": "1. Sear the mackerel skin-side down until crisp. 2. Brush with the teriyaki sauce in the last minute so it glazes without burning. 3. Serve over rice with the greens, sliced cucumber and kimchi.",
 "season": "Grated ginger, rice vinegar on the cucumber, sesame seeds, and sliced scallion. The kimchi does the rest.",
 "note": "Saba teriyaki, the Japanese lunch-set classic, with kimchi for live cultures."
},
{
 "id": "mackerel-lentil-salad",
 "title": "Mackerel & Lentil Salad with Mustard Dressing",
 "slot": "lunch",
 "protein": "Mackerel jack canned|Mackerel Atlantic cooked",
 "carb": "Lentils cooked",
 "produce": "Arugula raw|Tomato raw|Cucumber raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Dijon mustard",
   8
  ],
  [
   "Onion raw",
   20
  ]
 ],
 "method": "1. Whisk the mustard, oil and vinegar into a dressing. 2. Toss the lentils, arugula, tomato, cucumber and sliced onion with most of it. 3. Flake the mackerel over the top and drizzle with the rest.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl, a whisk, and 4 containers.\n2. Make the mustard dressing and pack it in small separate pots.\n3. Divide the lentils, tomato, cucumber and onion between the containers and flake the mackerel on top.\n4. Keep the arugula separate and add it when you eat, or it wilts.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold.",
 "makes": 4,
 "season": "Salt, black pepper, a sharp red wine vinegar and mustard dressing, and parsley.",
 "note": "A French bistro salad. Lentils and mackerel together are fibre and omega-3 in one bowl."
},
{
 "id": "sardine-pasta-lemon-chili",
 "title": "Sardine, Lemon & Chili Pasta",
 "slot": "dinner",
 "protein": "Sardines canned in oil",
 "carb": "Whole wheat pasta cooked|Pasta cooked",
 "produce": "Spinach raw|Tomato raw|Arugula raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Garlic raw",
   8
  ]
 ],
 "method": "1. Cook the pasta and save a cup of the water. 2. Warm the garlic and chili flakes gently in the oil for 2 minutes. 3. Add the sardines and break them up. 4. Toss in the pasta, the greens and a splash of pasta water until glossy.",
 "season": "Salt the pasta water well, then lots of lemon zest and juice, chili flakes, black pepper and parsley. Toasted breadcrumbs on top are the Sicilian way.",
 "note": "A Sicilian pantry dinner. Sardines melt into the sauce and bring a full day's omega-3."
},
{
 "id": "sardines-tomato-rye-open-sandwich",
 "title": "Sardines on Rye with Tomato & Onion",
 "slot": "lunch",
 "protein": "Sardines canned in oil",
 "carb": "Rye bread",
 "produce": "Tomato raw|Cucumber raw|Arugula raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Onion raw",
   20
  ]
 ],
 "simple": true,
 "method": "1. Toast the rye. 2. Top with thick tomato slices and a pinch of salt. 3. Lay the sardines over and scatter with the sliced onion. 4. Serve with the greens on the side.",
 "season": "Salt the tomatoes, then lemon juice, black pepper and a few chili flakes over the sardines.",
 "note": "A Scandinavian-style open sandwich that takes four minutes."
},
{
 "id": "sardine-potato-salad",
 "title": "Sardine & Potato Salad with Dill",
 "slot": "lunch",
 "protein": "Sardines canned in oil",
 "carb": "Potato baked flesh",
 "produce": "Cucumber raw|Green beans cooked|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   40
  ],
  [
   "Pickles dill",
   30
  ]
 ],
 "method": "1. Boil the potatoes until tender and cool slightly. 2. Stir the yogurt with lemon juice and chopped pickle into a dressing. 3. Toss the potatoes, cucumber and beans in the dressing. 4. Break the sardines over the top.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pot, a bowl, and 4 containers.\n2. Boil and cool the potatoes. Cooled potatoes carry resistant starch.\n3. Mix the yogurt, lemon and chopped pickle, and toss the potatoes and beans through it. Keep the cucumber in a small separate tub and add it when you eat; it waters down the dressing.\n4. Pack with the sardines on top.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold.",
 "makes": 4,
 "season": "Salt, black pepper, fresh dill and lemon juice. The pickle brings the tang.",
 "note": "Cooked-then-cooled potato has resistant starch, which feeds your gut bacteria."
},
{
 "id": "sardine-kimchi-fried-rice",
 "title": "Sardine Kimchi Fried Rice",
 "slot": "dinner",
 "protein": "Sardines canned in oil",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Kimchi|Spinach raw|Bok choy cooked",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Kimchi",
   60
  ],
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Fry the chopped kimchi in the oil for 2 minutes. 2. Add the cold rice and press it into the pan until it crisps. 3. Break in the sardines and the greens. 4. Push to one side, scramble the egg, and toss it all together.",
 "season": "A little soy sauce, gochugaru or chili flakes, and sesame seeds and scallion on top. The kimchi carries most of the flavour.",
 "note": "Fried rice made with day-old rice, kimchi for live cultures, and sardines for omega-3."
},
{
 "id": "salmon-lentils-lemon",
 "title": "Salmon over Lemony Lentils with Greens",
 "slot": "dinner",
 "protein": "Salmon Atlantic farmed cooked|Salmon Atlantic wild cooked|Salmon sockeye cooked",
 "carb": "Lentils cooked",
 "produce": "Spinach raw|Kale cooked|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Onion raw",
   30
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Soften the onion and garlic in half the oil, add the lentils and tomato and warm through. 2. Stir in the greens to wilt. 3. Sear the salmon skin-side down until crisp, about 5 minutes, then 2 minutes on the flesh. 4. Serve over the lentils.",
 "batchQ": 1, "prepMethod": "1. Equipment: a pot, a pan, and 4 containers.\n2. Make the lentils and greens and divide them between containers.\n3. Sear the salmon and lay it on top.\n4. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n5. Reheat: Eat cold, or warm gently for 60 to 90 seconds. Fish goes dry fast, so do not overheat it.",
 "makes": 4,
 "season": "Salt, black pepper, lots of lemon zest and juice, a spoon of Dijon in the lentils, and parsley.",
 "note": "A French classic. Salmon for omega-3, lentils for fibre and more protein."
},
{
 "id": "sheet-pan-salmon-sweet-potato-broccoli",
 "title": "Sheet-Pan Salmon with Sweet Potato & Broccoli",
 "slot": "dinner",
 "protein": "Salmon Atlantic farmed cooked|Salmon Atlantic wild cooked",
 "carb": "Sweet potato baked",
 "produce": "Broccoli cooked|Brussels sprouts cooked",
 "fat": "Olive oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Heat the oven to 425F. 2. Roast the cubed sweet potato with half the oil for 15 minutes. 3. Add the broccoli and the salmon to the tray, brush with the rest of the oil and seasoning, and roast 10 to 12 minutes until the salmon just flakes.",
 "batchQ": 1, "prepMethod": "1. Equipment: a large sheet pan and 4 containers.\n2. Roast the sweet potato 15 minutes at 425F.\n3. Add the broccoli and salmon, roast 10 to 12 minutes.\n4. Divide between containers once cooled.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold, or warm gently for 60 to 90 seconds. Fish goes dry fast, so do not overheat it.",
 "makes": 4,
 "season": "Salt, garlic powder, smoked paprika, and a squeeze of lemon over everything as it comes out.",
 "note": "One tray, one cleanup, and a full portion of omega-3."
},
{
 "id": "salmon-kimchi-rice-bowl",
 "title": "Salmon & Kimchi Rice Bowl",
 "slot": "lunch",
 "protein": "Salmon Atlantic farmed cooked|Salmon pink canned",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Cucumber raw|Spinach raw|Edamame cooked",
 "fat": "Avocado raw|Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Kimchi",
   60
  ],
  [
   "Soy sauce",
   5
  ]
 ],
 "method": "1. Warm the rice. 2. Top with the flaked salmon, sliced cucumber, greens and kimchi. 3. Finish with the avocado and a few drops of soy sauce.",
 "batchQ": 1, "prepMethod": "1. Equipment: a saucepan, a tray, a knife, and 4 containers.\n2. Cook the rice and spread it on a tray to cool. Pack the rice and salmon together, and the cucumber and greens in a separate section so they stay cold and crisp.\n3. Keep the kimchi in a small separate pot so it does not soak everything.\n4. Add the avocado fresh when you eat it.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Warm the rice and salmon gently, then add the cold toppings.",
 "makes": 4,
 "season": "Rice vinegar on the cucumber, sesame seeds, sliced scallion, and a drizzle of sriracha.",
 "note": "Omega-3 and live cultures in the same bowl."
},
{
 "id": "salmon-barley-bowl-dill-yogurt",
 "title": "Salmon & Barley Bowl with Dill Yogurt",
 "slot": "lunch",
 "protein": "Salmon Atlantic farmed cooked|Salmon Atlantic wild cooked",
 "carb": "Barley cooked",
 "produce": "Cucumber raw|Tomato raw|Arugula raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   50
  ]
 ],
 "method": "1. Toss the cooked barley with a little oil and lemon. 2. Stir dill and lemon into the yogurt. 3. Top the barley with the salmon, cucumber, tomato and greens, and spoon the dill yogurt over.",
 "batchQ": 1, "prepMethod": "1. Equipment: a pot, a bowl, and 4 containers.\n2. Cook and cool the barley, and dress it with oil and lemon.\n3. Pack with the salmon, and put the cucumber and tomato in a separate section so you can warm the salmon and barley on their own.\n4. Keep the dill yogurt and the greens separate until you eat.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold, or warm the salmon and barley gently.",
 "makes": 4,
 "season": "Salt, lemon, fresh dill and black pepper. The yogurt sauce is the Scandinavian touch.",
 "note": "Barley is one of the most filling grains there is, and it holds up for days in the fridge."
},
{
 "id": "salmon-coconut-free-curry",
 "title": "Salmon & Spinach Tomato Curry",
 "slot": "dinner",
 "protein": "Salmon Atlantic farmed cooked|Salmon Atlantic wild cooked",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Spinach raw|Tomato raw|Bell pepper cooked",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Greek yogurt plain nonfat",
   40
  ]
 ],
 "method": "1. Soften the onion, pepper and garlic in the oil for 6 minutes. 2. Add the curry spices and cook 1 minute. 3. Add the tomato and simmer 10 minutes. 4. Add the salmon in chunks and poach 5 minutes. 5. Stir in the spinach and, off the heat, the yogurt. Serve over rice.",
 "batchQ": 3, "prepMethod": "1. Equipment: a wide pan and 4 containers.\n2. Make the curry base: onion, pepper, garlic, spices, tomato, 15 minutes.\n3. SPLIT COOK: poach the salmon in a portion of the base on the day you eat it. Freeze the raw salmon in portions today, since raw fish keeps only 1 to 2 days in the fridge, and thaw one in the fridge the night before. The base alone keeps 4 days and freezes.\n4. Keep the yogurt out of the base. It goes in off the heat at serving so it does not split.\n5. Storage: fridge 4 days for the base, freezer 2 months (base only).\n6. Reheat: Bring a portion of the base to a simmer, poach the salmon 5 minutes, then stir in the yogurt off the heat.",
 "makes": 4,
 "season": "Garam masala, cumin, turmeric, chili, fresh ginger, salt, and lemon juice and cilantro at the end.",
 "note": "A tomato-based fish curry that stays light because yogurt replaces the coconut milk."
},
{
 "id": "pan-trout-dill-potatoes",
 "title": "Pan-Fried Trout with Dill Potatoes & Asparagus",
 "slot": "dinner",
 "protein": "Trout rainbow farmed cooked",
 "carb": "Potato baked flesh",
 "produce": "Asparagus cooked|Green beans cooked",
 "fat": "Butter salted|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "method": "1. Boil the potatoes until tender. 2. Steam or pan-roast the asparagus. 3. Pan-fry the trout skin-side down in the butter until crisp, 3 minutes, then 1 minute on the flesh. 4. Toss the potatoes in the pan butter with dill.",
 "batchQ": 1, "prepMethod": "1. Equipment: a pot, a pan, and 4 containers.\n2. Boil the potatoes and toss them with dill and a little butter.\n3. Cook the asparagus.\n4. Pan-fry the trout and pack it on top.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold, or warm gently for 60 to 90 seconds. Fish goes dry fast, so do not overheat it.",
 "makes": 4,
 "season": "Salt, black pepper, lots of fresh dill, and a squeeze of lemon over the fish.",
 "note": "Trout is one of the mildest oily fish and still carries a lot of omega-3."
},
{
 "id": "trout-lentil-beet-salad",
 "title": "Trout, Lentil & Beet Salad",
 "slot": "lunch",
 "protein": "Trout rainbow farmed cooked|Salmon pink canned",
 "carb": "Lentils cooked",
 "produce": "Beets cooked|Arugula raw",
 "fat": "Olive oil|Walnuts",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Dijon mustard",
   6
  ]
 ],
 "method": "1. Whisk the mustard, oil and vinegar. 2. Toss the lentils and beets in half the dressing. 3. Flake the trout over the arugula and lentils and drizzle with the rest.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl, a whisk, and 4 containers.\n2. Dress the lentils and beets.\n3. Pack them with the flaked trout.\n4. Keep the arugula and extra dressing separate.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Eat cold.",
 "makes": 4,
 "season": "Salt, black pepper, red wine vinegar and mustard dressing. Horseradish is a classic with trout and beets if you have it.",
 "note": "Earthy beets, peppery greens and rich trout. A bistro salad that holds its own as a lunch."
},
{
 "id": "almond-crusted-trout-green-beans",
 "title": "Almond-Crusted Trout with Green Beans & Rice",
 "slot": "dinner",
 "protein": "Trout rainbow farmed cooked",
 "carb": "Brown rice cooked|Quinoa cooked",
 "produce": "Green beans cooked|Broccoli cooked",
 "fat": "Almonds",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Dijon mustard",
   6
  ]
 ],
 "method": "1. Heat the oven to 400F. 2. Brush the trout with the mustard and press the finely chopped almonds on top. 3. Bake 10 to 12 minutes until the crust is golden and the fish flakes. 4. Serve with the rice and green beans.",
 "season": "Salt, black pepper, lemon zest in the almonds, and a squeeze of lemon over everything.",
 "note": "The mustard holds the almond crust on and seasons the fish at the same time."
},
{
 "id": "mackerel-sweet-potato-greens",
 "title": "Spiced Mackerel with Sweet Potato & Greens",
 "slot": "dinner",
 "protein": "Mackerel Atlantic cooked",
 "carb": "Sweet potato baked",
 "produce": "Kale cooked|Collard greens cooked|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Roast the sweet potato wedges at 425F for 25 minutes. 2. Saute the greens with garlic until wilted. 3. Rub the mackerel with the spices and pan-fry skin-side down until crisp. 4. Serve together.",
 "season": "Smoked paprika, cumin and salt on the fish, a pinch of chili in the greens, and a big squeeze of lime over the mackerel.",
 "note": "Sweet potato and rich mackerel is a Caribbean-style pairing. The lime is essential."
},
{
 "id": "salmon-patties-free-cakes-herb",
 "title": "Salmon & Sweet Potato Cakes with Yogurt Sauce",
 "slot": "dinner",
 "protein": "Salmon pink canned",
 "carb": "Sweet potato baked",
 "produce": "Spinach raw|Green beans cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Egg whole raw",
   50
  ],
  [
   "Greek yogurt plain nonfat",
   40
  ],
  [
   "Onion raw",
   25
  ]
 ],
 "method": "1. Mash the sweet potato and mix in the drained salmon, the egg and finely chopped onion. 2. Shape into 4 cakes and chill 10 minutes so they hold. 3. Pan-fry in the oil 3 to 4 minutes a side until golden. 4. Serve with the yogurt and greens.",
 "batchQ": 1, "prepMethod": "1. Equipment: a bowl, a pan, and 4 containers.\n2. Mix the mashed sweet potato, salmon, egg and onion, shape the cakes, and chill 10 minutes.\n3. Pan-fry until golden on both sides.\n4. Pack with the greens, and the yogurt sauce in a separate pot.\n5. Storage: fridge 3 days. It does not keep longer than that, so cook twice a week.\n6. Reheat: Reheat in a dry pan or air fryer to keep them crisp. The microwave makes them soft.",
 "makes": 4,
 "season": "Salt, black pepper, lemon zest and dill in the mix. Lemon, dill and garlic stirred into the yogurt.",
 "note": "Canned salmon cakes, bound with sweet potato instead of breadcrumbs."
},
{
 "id": "salmon-miso-greens-soba-free",
 "title": "Miso-Glazed Salmon with Greens & Brown Rice",
 "slot": "lunch",
 "protein": "Salmon Atlantic farmed cooked|Salmon sockeye cooked",
 "carb": "Brown rice cooked",
 "produce": "Bok choy cooked|Broccoli cooked|Spinach raw",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Miso paste",
   15
  ],
  [
   "Honey",
   6
  ]
 ],
 "method": "1. Stir the miso with the honey and a little water into a glaze. 2. Brush it over the salmon and grill or broil 8 to 10 minutes until caramelised. 3. Stir-fry the greens in the sesame oil. 4. Serve over the rice.",
 "season": "Rice vinegar and grated ginger with the greens, sesame seeds and scallion on top.",
 "note": "Miso glaze adds fermented depth, and the salmon brings the omega-3."
},
{
 "id": "sardine-white-bean-arugula-salad",
 "title": "Sardine, Chickpea & Arugula Salad",
 "slot": "lunch",
 "protein": "Sardines canned in oil",
 "carb": "Chickpeas cooked|White beans cooked",
 "produce": "Arugula raw|Tomato raw|Cucumber raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Onion raw",
   20
  ]
 ],
 "simple": true,
 "method": "1. Toss the chickpeas, tomato, cucumber and sliced onion with the oil and lemon. 2. Pile onto the arugula. 3. Lay the sardines on top.",
 "season": "Salt, black pepper, lemon juice, and a pinch of chili flakes and cumin.",
 "note": "No-cook, four minutes, and one of the most nutrient-dense lunches in the library."
},
{
 "id": "mackerel-rye-cucumber-lunch-plate",
 "title": "Smoked-Style Mackerel Plate with Rye & Pickled Cucumber",
 "slot": "lunch",
 "protein": "Mackerel jack canned|Mackerel Atlantic cooked",
 "carb": "Rye bread",
 "produce": "Cucumber raw|Beets cooked|Radish raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   40
  ]
 ],
 "method": "1. Slice the cucumber thin and toss it with vinegar, salt and a pinch of sugar or sweetener for a quick pickle. 2. Toast the rye. 3. Serve the mackerel with the rye, pickled cucumber, beets and yogurt.",
 "season": "Smoked paprika on the fish, salt, black pepper, dill, and lemon.",
 "note": "A Nordic lunch plate. Rye, oily fish and pickles is a very old, very good combination."
},
{
 "id": "rye-eggs-sauerkraut-breakfast",
 "title": "Rye Toast with Soft Eggs & Sauerkraut",
 "slot": "breakfast",
 "protein": "Egg whole raw|Egg white raw",
 "carb": "Rye bread",
 "produce": "Sauerkraut|Spinach raw",
 "fat": "Butter salted|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Dijon mustard",
   5
  ]
 ],
 "method": "1. Toast the rye and spread it thinly with mustard. 2. Soft-scramble the eggs in the butter over low heat, pulling them off while still glossy. 3. Pile the eggs on the toast and top with a forkful of sauerkraut and the greens.",
 "season": "Salt the eggs before they go in, black pepper, chives, and caraway seeds over the sauerkraut. The kraut brings the tang.",
 "note": "Rye, eggs and live-culture sauerkraut: a German farmhouse breakfast that keeps you full until lunch."
},
{
 "id": "nordic-salmon-egg-rye-plate",
 "title": "Nordic Salmon, Egg & Rye Breakfast Plate",
 "slot": "breakfast",
 "protein": "Salmon pink canned|Salmon Atlantic farmed cooked",
 "carb": "Rye bread",
 "produce": "Cucumber raw|Tomato raw|Radish raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Egg whole cooked",
   50
  ],
  [
   "Skyr plain nonfat",
   40
  ]
 ],
 "method": "1. Toast the rye. 2. Spread it with the skyr. 3. Top with the salmon, sliced boiled egg, cucumber and radish.",
 "season": "Salt, black pepper, fresh dill, and a squeeze of lemon over the salmon. Capers if you have them.",
 "note": "How much of Scandinavia eats breakfast: rye, fish, egg and a cultured dairy spread. Omega-3 before 9am."
},
{
 "id": "sardines-egg-rye-breakfast",
 "title": "Sardines & Egg on Rye with Tomato",
 "slot": "breakfast",
 "protein": "Sardines canned in oil",
 "carb": "Rye bread",
 "produce": "Tomato raw|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Egg whole cooked",
   50
  ]
 ],
 "simple": true,
 "method": "1. Toast the rye. 2. Top with sliced tomato and a pinch of salt. 3. Lay the sardines on, then the sliced boiled egg.",
 "season": "Salt the tomato, then lemon juice, black pepper and a pinch of chili flakes.",
 "note": "Sardines at breakfast is normal in Portugal and Spain, and it is the most omega-3 you can eat before work."
},
{
 "id": "barley-apple-kefir-porridge",
 "title": "Barley Porridge with Apple, Cinnamon & Kefir",
 "slot": "breakfast",
 "protein": "Kefir plain|Skyr plain nonfat",
 "carb": "Barley cooked",
 "produce": "Apple raw with skin|Pear raw",
 "fat": "Walnuts|Pecans",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Whey protein powder",
   20
  ]
 ],
 "method": "1. Warm the cooked barley with a splash of water and the grated apple for 4 minutes. 2. Off the heat, stir in the protein powder. 3. Pour the kefir over the top and scatter with the walnuts.",
 "batchQ": 3, "prepMethod": "1. Equipment: a pot, a grater, and 5 containers.\n2. Cook a batch of barley, then simmer it with grated apple and cinnamon for 5 minutes.\n3. Cool, then stir in the protein powder and divide between containers.\n4. Pour the kefir and add the walnuts only when you eat it, so the kefir stays tangy and the nuts stay crisp.\n5. Storage: fridge 4 days.\n6. Reheat: Warm the barley 60 to 90 seconds, then add the kefir cold.",
 "makes": 5,
 "season": "Cinnamon, a pinch of salt, and a little nutmeg. The kefir's tang is what balances the apple.",
 "note": "Barley is chewier than most porridge grains and one of the most filling measured. Kefir brings the live cultures."
},
{
 "id": "buckwheat-porridge-berries-skyr",
 "title": "Buckwheat Porridge with Berries & Skyr",
 "slot": "breakfast",
 "protein": "Skyr plain nonfat|Greek yogurt plain nonfat",
 "carb": "Buckwheat groats cooked",
 "produce": "Blueberries raw|Raspberries raw|Strawberries raw",
 "fat": "Pumpkin seeds|Almonds",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Cook the buckwheat if you have none ready: simmer 1 part groats in 2 parts lightly salted water, covered, for about 15 minutes until tender. Cooked buckwheat keeps 4 days in the fridge, so make a few days' worth. 2. Warm a portion with a splash of water. 3. Top with the skyr and berries. 4. Scatter the pumpkin seeds over.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pot and 5 containers.\n2. Simmer the buckwheat groats until just tender, about 12 minutes, and drain.\n3. Divide between containers.\n4. Add the skyr, berries and seeds when you eat it.\n5. Storage: fridge 4 days.\n6. Reheat: Warm the buckwheat 60 seconds, then add the cold toppings.",
 "makes": 5,
 "season": "A pinch of salt in the cooking water, cinnamon, and a little lemon zest over the berries.",
 "note": "An Eastern European breakfast grain. Buckwheat is not wheat at all, so it is naturally gluten-free."
},
{
 "id": "kefir-oats-brazil-nut",
 "title": "Kefir Overnight Oats with Berries & a Brazil Nut",
 "slot": "breakfast",
 "protein": "Kefir plain|Whey protein powder",
 "carb": "Oats dry",
 "produce": "Blueberries raw|Raspberries raw",
 "fat": "Brazil nuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Chia seeds",
   10
  ]
 ],
 "method": "1. Stir the oats and chia into the kefir. 2. Cover and refrigerate overnight. 3. In the morning, top with berries and the chopped Brazil nut.",
 "season": "A pinch of salt and cinnamon in the oats. One Brazil nut covers the day's selenium, so do not add more.",
 "note": "Oats for the fibre, kefir for live cultures, and one Brazil nut for your thyroid's selenium."
},
{
 "id": "nordic-skyr-rye-crumb-bowl",
 "title": "Skyr Bowl with Toasted Rye Crumbs & Berries",
 "slot": "breakfast",
 "protein": "Skyr plain nonfat|Greek yogurt plain nonfat",
 "carb": "Rye bread",
 "produce": "Blueberries raw|Raspberries raw|Strawberries raw",
 "fat": "Walnuts|Almonds",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Tear the rye into crumbs and toast them in a dry pan until crisp, about 4 minutes. 2. Spoon the skyr into a bowl. 3. Top with the berries, the rye crumbs and chopped nuts.",
 "season": "Cinnamon on the crumbs, a pinch of salt, and a little honey only if your plan has room. Toasted rye crumbs are the Danish trick.",
 "note": "Danish rye crumbs instead of granola: more fibre, a lot less sugar."
},
{
 "id": "cottage-cheese-protein-pancakes",
 "title": "Cottage Cheese Protein Pancakes with Berries",
 "slot": "breakfast",
 "protein": "Cottage cheese 2%|Cottage cheese nonfat",
 "carb": "Oats dry",
 "produce": "Blueberries raw|Strawberries raw|Raspberries raw",
 "fat": "Butter salted|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Egg whole raw",
   100
  ]
 ],
 "method": "1. Blend the cottage cheese, eggs and oats until smooth. 2. Let the batter rest 5 minutes to thicken. 3. Cook small pancakes in a little butter over medium heat, 2 minutes a side. 4. Serve with the berries.",
 "batchQ": 2, "prepMethod": "1. Equipment: a blender, a pan, and 5 containers.\n2. Blend the cottage cheese, eggs and oats. Rest 5 minutes.\n3. Cook small pancakes, 2 minutes a side, and cool them on a rack.\n4. Stack with parchment between them.\n5. Storage: fridge 4 days, freezer 2 months.\n6. Reheat: Toaster or dry pan, 1 to 2 minutes, to keep them crisp.",
 "makes": 5,
 "season": "A pinch of salt and cinnamon in the batter, vanilla if you have it. Berries on top, and a little maple syrup only if there is room.",
 "note": "Blended cottage cheese makes pancakes fluffy and puts the protein into the batter itself."
},
{
 "id": "potato-egg-rosti",
 "title": "Crispy Potato Rosti with Fried Eggs",
 "slot": "breakfast",
 "protein": "Egg whole raw",
 "carb": "Potato baked flesh",
 "produce": "Spinach raw|Tomato raw",
 "fat": "Olive oil|Butter salted",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Onion raw",
   25
  ]
 ],
 "method": "1. Grate the cold cooked potato and the onion and squeeze out any moisture. 2. Press into a hot oiled pan in a flat cake and cook without moving it 5 minutes until deeply golden, then flip. 3. Fry the eggs alongside. 4. Serve with the wilted spinach.",
 "season": "Salt the potato well, black pepper, and a pinch of smoked paprika. Hot sauce or a squeeze of lemon over the greens.",
 "note": "Swiss rosti. Using cooked, cooled potato is what makes it crisp, and cooled potato carries resistant starch."
},
{
 "id": "turkish-eggs-cilbir",
 "title": "Turkish Eggs on Garlic Yogurt (Cilbir)",
 "slot": "breakfast",
 "protein": "Egg whole raw",
 "carb": "Rye bread|Pita bread",
 "produce": "Spinach raw|Tomato raw",
 "fat": "Butter salted|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   100
  ],
  [
   "Garlic raw",
   4
  ]
 ],
 "method": "1. Stir the grated garlic and a pinch of salt into the yogurt and spread it across a plate. 2. Poach the eggs 3 minutes so the yolks stay runny. 3. Set the eggs on the yogurt. 4. Warm the butter with the chili flakes until it foams and spoon it over the top. 5. Serve with the bread for dipping.",
 "season": "Salt in the yogurt, Aleppo pepper or chili flakes in the butter, fresh dill, and a squeeze of lemon.",
 "note": "Poached eggs on cool garlic yogurt with chili butter. The yogurt makes it a high-protein plate."
},
{
 "id": "salmon-spinach-egg-bites",
 "title": "Salmon & Spinach Egg Bites",
 "slot": "breakfast",
 "protein": "Egg white raw",
 "produce": "Spinach raw|Bell pepper red raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Salmon pink canned",
   60
  ],
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Heat the oven to 350F and oil a muffin tin. 2. Divide the flaked salmon and chopped spinach and pepper between the cups. 3. Beat the egg whites with the whole egg, salt and pepper, and pour over. 4. Bake 18 to 20 minutes until set.",
 "batchQ": 2, "prepMethod": "1. Equipment: a muffin tin, a bowl, and a container.\n2. Divide the salmon, spinach and pepper between the oiled cups.\n3. Beat the egg whites with the whole egg and seasoning, and pour over.\n4. Bake 18 to 20 minutes at 350F, then cool on a rack so they do not sweat.\n5. Storage: fridge 4 days, freezer 2 months.\n6. Reheat: Microwave 30 to 45 seconds.",
 "makes": 6,
 "season": "Salt, black pepper, dill, and lemon zest in the eggs. Hot sauce when you eat them.",
 "note": "Grab-and-go egg bites with omega-3 built in."
},
{
 "id": "middle-eastern-breakfast-lentils-egg",
 "title": "Spiced Breakfast Lentils with a Fried Egg",
 "slot": "breakfast",
 "protein": "Egg whole raw",
 "carb": "Lentils cooked",
 "produce": "Tomato raw|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Onion raw",
   40
  ],
  [
   "Garlic raw",
   4
  ],
  [
   "Greek yogurt plain nonfat",
   40
  ]
 ],
 "method": "1. Soften the onion and garlic in the oil. 2. Add the cumin, then the lentils and tomato, and warm through for 5 minutes. 3. Stir in the spinach. 4. Fry the egg and set it on top with a spoon of yogurt.",
 "season": "Cumin, smoked paprika, salt, a pinch of chili, and a big squeeze of lemon. Parsley on top.",
 "note": "Lentils at breakfast is normal across the Middle East, and fibre this early carries you a long way."
},
{
 "id": "spanish-tortilla-potato-egg",
 "title": "Spanish Potato Omelette",
 "slot": "breakfast",
 "protein": "Egg whole raw|Egg white raw",
 "carb": "Potato baked flesh",
 "produce": "Onion raw|Bell pepper red raw|Spinach raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "method": "1. Soften the sliced onion and diced cooked potato in the oil over low heat for 10 minutes. 2. Beat the eggs with salt and fold in the potato. 3. Pour back into the pan and cook on low 8 minutes until almost set. 4. Flip onto a plate and slide back in for 2 minutes. 5. Serve warm or at room temperature with the greens.",
 "batchQ": 2, "prepMethod": "1. Equipment: a nonstick pan, a bowl, a plate, and 4 containers.\n2. Soften the onion and potato slowly in the oil, 10 minutes.\n3. Fold into the beaten eggs, return to the pan, cook low 8 minutes, flip, 2 minutes more.\n4. Cool and cut into wedges.\n5. Storage: fridge 4 days.\n6. Reheat: Eat at room temperature, which is how it is served in Spain, or microwave 45 seconds.",
 "makes": 4,
 "season": "Salt it properly. That is most of the flavour. A little smoked paprika, and a squeeze of lemon on the greens.",
 "note": "Spain's everyday potato omelette. Potatoes and eggs, about the two most filling foods there are."
},
{
 "id": "mackerel-egg-potato-breakfast",
 "title": "Mackerel, Egg & Crispy Potato Breakfast Plate",
 "slot": "breakfast",
 "protein": "Mackerel jack canned|Mackerel Atlantic cooked",
 "carb": "Potato baked flesh",
 "produce": "Spinach raw|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Egg whole raw",
   50
  ]
 ],
 "method": "1. Crisp the diced cooked potato in the oil for 8 minutes. 2. Push it aside and fry the egg. 3. Warm the mackerel in the pan for the last minute. 4. Serve with the greens.",
 "season": "Salt, black pepper, smoked paprika on the potatoes, and a big squeeze of lemon over the mackerel.",
 "note": "A proper cooked breakfast with a week's worth of omega-3 in one portion."
},
{
 "id": "tofu-kimchi-breakfast-rice",
 "title": "Tofu & Kimchi Breakfast Rice Bowl",
 "slot": "breakfast",
 "protein": "Tofu firm",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Kimchi|Vegan kimchi|Spinach raw",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Vegan kimchi",
   50
  ],
  [
   "Soy sauce",
   5
  ]
 ],
 "method": "1. Crumble the tofu into the hot oil and cook 5 minutes until golden. 2. Add the chopped kimchi and soy sauce and cook 2 minutes. 3. Serve over the rice with the wilted greens.",
 "season": "Gochugaru or chili flakes, sesame seeds, and sliced scallion. The kimchi does the salt and the sour.",
 "note": "A Korean-style breakfast bowl: plant protein and fermented vegetables to start the day."
},
{
 "id": "savory-oats-egg-greens-parmesan",
 "title": "Savory Parmesan Oats with a Jammy Egg",
 "slot": "breakfast",
 "protein": "Egg whole raw",
 "carb": "Oats dry",
 "produce": "Spinach raw|Kale cooked|Tomato raw",
 "fat": "Parmesan cheese shredded|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Cook the oats in salted water like a risotto, stirring, for 5 minutes. 2. Stir in the greens to wilt and the parmesan until creamy. 3. Boil the egg for 6.5 minutes and halve it. 4. Serve the egg on the oats.",
 "season": "Salt the water, lots of black pepper, a squeeze of lemon, and chili flakes. It tastes like a quick risotto.",
 "note": "Oats do not have to be sweet. Cooked savoury, they are closer to risotto than porridge."
},
{
 "id": "tempeh-sweet-potato-breakfast-bowl-greens",
 "title": "Smoky Tempeh, Sweet Potato & Kale Breakfast Bowl",
 "slot": "breakfast",
 "protein": "Tempeh",
 "carb": "Sweet potato baked",
 "produce": "Kale cooked|Spinach raw",
 "fat": "Avocado raw|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Soy sauce",
   5
  ]
 ],
 "method": "1. Crumble the tempeh and fry it in a little oil with the soy sauce and smoked paprika until crisp. 2. Warm the sweet potato. 3. Wilt the kale. 4. Serve together topped with sliced avocado.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pan, a baking tray, and 5 containers.\n2. Roast the cubed sweet potato at 425F for 25 minutes.\n3. Fry the crumbled tempeh with soy sauce and smoked paprika until crisp.\n4. Wilt the kale and divide everything between containers. Add the avocado fresh when you eat it.\n5. Storage: fridge 4 days.\n6. Reheat: Microwave 60 to 90 seconds, stirring halfway.",
 "makes": 5,
 "season": "Smoked paprika, a little maple syrup with the soy for a bacon-like glaze, salt, and hot sauce.",
 "note": "Tempeh is fermented soybean, so it is protein and a fermented food in one."
},
{
 "id": "greek-yogurt-rye-granola-free-bowl",
 "title": "Greek Yogurt with Pear, Walnuts & Toasted Oats",
 "slot": "breakfast",
 "protein": "Greek yogurt plain nonfat|Skyr plain nonfat",
 "carb": "Oats dry",
 "produce": "Pear raw|Apple raw with skin",
 "fat": "Walnuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Toast the oats in a dry pan until golden and nutty, about 3 minutes. 2. Spoon the yogurt into a bowl. 3. Top with the sliced pear, the toasted oats and the walnuts.",
 "season": "Cinnamon, a pinch of salt, and ground ginger with the pear. A drizzle of honey only if your plan allows.",
 "note": "Toasting plain oats gives you a crunchy topping with no added sugar or oil."
},
{
 "id": "egg-white-veggie-rye-melt",
 "title": "Egg White & Veggie Melt on Rye",
 "slot": "breakfast",
 "protein": "Egg white raw",
 "carb": "Rye bread",
 "produce": "Spinach raw|Tomato raw|Bell pepper red raw",
 "fat": "Mozzarella part skim|Cheddar cheese",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "method": "1. Scramble the egg whites with the chopped pepper and spinach. 2. Toast the rye. 3. Pile the eggs on the toast, lay the cheese over, and broil 1 minute until melted. 4. Top with tomato.",
 "season": "Salt, black pepper, garlic powder, and hot sauce or a spoon of salsa on top.",
 "note": "A diner melt rebuilt around egg whites, so it is almost all protein."
},
{
 "id": "chia-kefir-mango-parfait",
 "title": "Kefir, Mango & Chia Breakfast Parfait",
 "slot": "breakfast",
 "protein": "Skyr plain nonfat|Greek yogurt plain nonfat",
 "carb": "Mango raw|Kiwifruit raw",
 "fat": "Chia seeds",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Kefir plain low-fat",
   120
  ]
 ],
 "method": "1. Stir the chia into the kefir and leave it 10 minutes to thicken. 2. Layer the chia kefir, the skyr and the mango in a glass.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl and 5 jars.\n2. Stir the chia into the kefir, rest 10 minutes, stir again.\n3. Layer with the skyr in jars. Keep the cut fruit in a small separate tub and add it when you eat; it weeps into the jar.\n4. Storage: fridge 4 days.\n5. Reheat: Eat cold.",
 "makes": 5,
 "season": "A pinch of salt, lime zest over the mango, and a little cardamom or cinnamon.",
 "note": "Two fermented dairies, soluble fibre from the chia, and fruit. Tastes like a mango lassi."
},
{
 "id": "tvp-bolognese-wholewheat",
 "title": "TVP Bolognese with Whole Wheat Pasta",
 "slot": "dinner",
 "protein": "TVP \\(textured soy protein\\) dry",
 "carb": "Whole wheat pasta cooked|Pasta cooked",
 "produce": "Carrots cooked|Celery raw|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   8
  ],
  [
   "Tomato raw",
   180
  ]
 ],
 "method": "1. Soften the onion, carrot, celery and garlic in the oil for 10 minutes. 2. Add the tomato and the dry TVP with enough water to cover. 3. Simmer 20 minutes until thick. 4. Toss with the pasta.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pot and 5 containers.\n2. Soften the onion, carrot, celery and garlic slowly, 10 minutes. This is where the flavour comes from.\n3. Add the tomato, dry TVP and water to cover, simmer 20 minutes.\n4. Cook the pasta a minute short of tender, drain, toss it with a little oil and spread it out to cool. Pack the sauce and pasta separately so the pasta does not go soft.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months for the sauce. Cooked pasta goes mushy in the freezer, so cook it fresh for a frozen portion.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Salt, oregano, a bay leaf, chili flakes, and a splash of red wine vinegar at the end. Nutritional yeast on top tastes like parmesan.",
 "note": "TVP takes on the texture of ground meat and has about twice the protein of lentils."
},
{
 "id": "mapo-tofu-tvp",
 "title": "Mapo Tofu over Rice",
 "slot": "dinner",
 "protein": "Tofu firm|Tofu silken",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bok choy cooked|Spinach raw",
 "fat": "Sesame oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "TVP \\(textured soy protein\\) dry",
   20
  ],
  [
   "Garlic raw",
   6
  ],
  [
   "Gochujang \\(Korean chili paste\\)",
   15
  ],
  [
   "Soy sauce",
   8
  ]
 ],
 "method": "1. Soak the TVP in hot water for 5 minutes and squeeze it out. 2. Fry it in the oil with the garlic and chili paste until fragrant. 3. Add a splash of water and the soy sauce, then the tofu cubes, and simmer gently 5 minutes without stirring hard. 4. Serve over rice with the greens.",
 "season": "Sichuan peppercorn if you have it, chili flakes, grated ginger, and sliced scallion. It should be salty, spicy and numbing.",
 "note": "Sichuan mapo tofu, with TVP in place of pork so it stays fully plant-based and higher in protein."
},
{
 "id": "kung-pao-tofu-peanuts",
 "title": "Kung Pao Tofu with Peanuts",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bell pepper cooked|Zucchini cooked|Broccoli cooked",
 "fat": "Peanuts dry-roasted",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Soy sauce",
   10
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Press and cube the tofu and fry it until golden. 2. Stir-fry the peppers and zucchini with the garlic and dried chili for 3 minutes. 3. Add the tofu, soy sauce and a splash of vinegar. 4. Toss in the peanuts and serve over rice.",
 "season": "Black vinegar or rice vinegar, a little honey or sweetener, dried chili, grated ginger and scallion. Sweet, sour, salty and hot.",
 "note": "The takeout classic, lighter, with the peanuts as the only real fat in the dish."
},
{
 "id": "tofu-tikka-masala",
 "title": "Tofu Tikka Masala over Rice",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Tomato raw|Spinach raw|Bell pepper cooked",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   8
  ],
  [
   "Tomato raw",
   150
  ]
 ],
 "method": "1. Rub the tofu cubes with the spices and roast at 425F for 20 minutes until the edges char. 2. Soften the onion and garlic in the oil, add the spices, then the tomato, and simmer 12 minutes. 3. Blend the sauce smooth. 4. Stir in the tofu and spinach.",
 "batchQ": 3, "prepMethod": "1. Equipment: a sheet pan, a pot, a stick blender, and 5 containers.\n2. Roast the spiced tofu at 425F, 20 minutes.\n3. Make the sauce: onion, garlic, spices, tomato, 12 minutes, then blend.\n4. Stir in the tofu and spinach. Cook the rice, spread it on a tray to cool, and pack it separately.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Garam masala, cumin, smoked paprika, turmeric, fresh ginger, salt, and lemon juice. A spoon of cashew butter blended in makes it creamy without dairy.",
 "note": "Roasting the tofu first gives it the charred tikka edges."
},
{
 "id": "palak-tofu",
 "title": "Palak Tofu, Spinach Curry with Crispy Tofu",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "White rice cooked|Brown rice cooked|Quinoa cooked",
 "produce": "Spinach cooked|Spinach raw|Tomato raw",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   8
  ]
 ],
 "method": "1. Pan-fry the tofu cubes until golden and set aside. 2. Soften the onion and garlic with the spices. 3. Add the spinach and tomato, cook until collapsed, then blend smooth. 4. Stir the tofu back in.",
 "batchQ": 3, "prepMethod": "1. Equipment: a pan, a blender, and 5 containers.\n2. Fry the tofu until golden.\n3. Cook the onion, garlic, spices, spinach and tomato, then blend smooth.\n4. Fold the tofu back in. Cook the rice or quinoa and spread it on a tray to cool.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Cumin seeds, garam masala, green chili, fresh ginger, salt, and a big squeeze of lemon at the end.",
 "note": "Saag paneer made with tofu. Almost a full bag of spinach in every portion."
},
{
 "id": "tofu-shawarma-bowl-tahini",
 "title": "Tofu Shawarma Bowl with Tahini Sauce",
 "slot": "lunch",
 "protein": "Tofu firm",
 "carb": "Brown rice cooked|Bulgur cooked|Quinoa cooked",
 "produce": "Cucumber raw|Tomato raw|Cabbage raw",
 "fat": "Tahini \\(sesame butter\\)",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   30
  ],
  [
   "Pickles dill",
   30
  ]
 ],
 "method": "1. Slice the tofu thin, toss with the shawarma spices and a little oil, and roast at 425F for 20 minutes until crisp at the edges. 2. Thin the tahini with lemon juice and water into a pourable sauce. 3. Build bowls with the grain, tofu, chopped salad and pickles, and pour the tahini over.",
 "batchQ": 2, "prepMethod": "1. Equipment: a sheet pan, a bowl, and 5 containers.\n2. Roast the spiced tofu at 425F, 20 minutes.\n3. Chop the cucumber, tomato and cabbage.\n4. Cook the grain and spread it on a tray to cool. Pack the grain and tofu together, the salad and pickles separately, and the tahini sauce in a small pot.\n5. Get the containers in the fridge within 2 hours of cooking.\n6. Storage: fridge 4 days, freezer 3 months for the grain and tofu only.\n7. Reheat: Warm the tofu and grain, add the cold salad and sauce after.",
 "makes": 5,
 "season": "Shawarma spice: cumin, coriander, smoked paprika, turmeric, cinnamon, garlic. Salt, and plenty of lemon in the tahini.",
 "note": "All the flavour of a shawarma plate. The pickles and lemon are what make it taste right."
},
{
 "id": "seitan-gyro-pita-tahini",
 "title": "Seitan Gyro-Style Pita with Tahini",
 "slot": "lunch",
 "protein": "Seitan / wheat gluten",
 "carb": "Pita bread",
 "produce": "Tomato raw|Cucumber raw|Onion raw",
 "fat": "Tahini \\(sesame butter\\)",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Slice the seitan thin and sear it in a hot dry pan with the spices until crisp at the edges. 2. Warm the pita. 3. Fill with the seitan, tomato, cucumber and onion, and drizzle with lemony tahini.",
 "season": "Oregano, garlic, smoked paprika, cumin, salt, and lemon in the tahini. A few pickled onions or chili if you have them.",
 "note": "Seitan is wheat protein, and it chars and crisps like gyro meat. Contains gluten."
},
{
 "id": "tempeh-reuben-rye",
 "title": "Tempeh Reuben on Rye with Sauerkraut",
 "slot": "lunch",
 "protein": "Tempeh",
 "carb": "Rye bread",
 "produce": "Sauerkraut|Cucumber raw",
 "fat": "Avocado raw|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Dijon mustard",
   8
  ],
  [
   "Sauerkraut",
   60
  ],
  [
   "Soy sauce",
   5
  ]
 ],
 "method": "1. Slice the tempeh thin and pan-fry it with the soy sauce and smoked paprika until crisp. 2. Toast the rye. 3. Spread with mustard, layer the tempeh and sauerkraut, and add the avocado. 4. Press it in the pan 1 minute.",
 "season": "Smoked paprika and a little maple on the tempeh, caraway on the kraut, black pepper. The mustard and sauerkraut do the rest.",
 "note": "Tempeh and sauerkraut are both fermented, so this sandwich is two fermented foods at once."
},
{
 "id": "tvp-taco-meat-black-beans",
 "title": "Chili-Lime TVP & Black Bean Rice Bowl",
 "slot": "dinner",
 "protein": "TVP \\(textured soy protein\\) dry",
 "carb": "Black beans cooked|Brown rice cooked",
 "produce": "Tomato raw|Cabbage raw|Bell pepper cooked",
 "fat": "Avocado raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Salsa",
   50
  ],
  [
   "Onion raw",
   40
  ]
 ],
 "method": "1. Soak the TVP in hot water with the taco spices for 5 minutes. 2. Fry it with the onion until browned and slightly crisp. 3. Warm the beans. 4. Serve over rice with the shredded cabbage, tomato, salsa and avocado.",
 "batchQ": 3, "prepMethod": "1. Equipment: a pan and 5 containers.\n2. Soak the TVP in hot water with the spices, 5 minutes.\n3. Fry with the onion until browned.\n4. Cook the rice and spread it on a tray to cool. Pack the TVP with the beans and rice. Add the salsa, cabbage and avocado fresh.\n5. Get the containers in the fridge within 2 hours of cooking.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Warm the TVP, beans and rice, then add the cold toppings.",
 "makes": 5,
 "season": "Chili powder, cumin, oregano, smoked paprika, garlic, salt, and lime juice. Cilantro on top.",
 "note": "TVP makes a taco meat that is almost indistinguishable from the real thing, at a fraction of the fat."
},
{
 "id": "lemongrass-tofu-banh-mi-bowl",
 "title": "Lemongrass Tofu Banh Mi Bowl",
 "slot": "lunch",
 "protein": "Tofu firm",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Carrots raw|Cucumber raw|Daikon radish raw",
 "fat": "Avocado oil|Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Soy sauce",
   8
  ],
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "method": "1. Marinate the tofu in soy sauce, garlic and lemongrass for 10 minutes, then pan-fry until caramelised. 2. Quick-pickle the carrot and radish in vinegar with a pinch of salt and sweetener for 10 minutes. 3. Build bowls with the rice, tofu, pickles and cucumber, and drizzle with sriracha.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pan, a jar, and 5 containers.\n2. Pickle the julienned carrot and radish in vinegar, salt and a little sweetener. They keep a week.\n3. Marinate and fry the tofu.\n4. Cook the rice and spread it on a tray to cool. Pack the rice and tofu with the pickles in a separate section.\n5. Get the containers in the fridge within 2 hours of cooking.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Warm the rice and tofu, add the pickles cold.",
 "makes": 5,
 "season": "Lemongrass, garlic, soy sauce, rice vinegar for the pickles, sriracha, and lots of cilantro and mint.",
 "note": "The Vietnamese sandwich as a bowl. The quick pickles make it."
},
{
 "id": "thai-basil-tofu-stir-fry",
 "title": "Thai Basil Tofu Stir-Fry (Pad Kra Pao)",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bell pepper cooked|Green beans cooked|Onion raw",
 "fat": "Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Soy sauce",
   10
  ],
  [
   "Garlic raw",
   8
  ]
 ],
 "method": "1. Crumble the tofu and fry it in the oil until golden and a little crisp. 2. Add the garlic and chili and cook 30 seconds. 3. Add the green beans and peppers and stir-fry 3 minutes. 4. Add the soy sauce and a big handful of basil, toss, and serve over rice.",
 "season": "Lots of garlic and bird's eye chili, soy sauce, a pinch of sugar or sweetener, and fresh Thai basil at the very end. A squeeze of lime.",
 "note": "The Thai street-food classic, made with crumbled tofu instead of ground pork."
},
{
 "id": "seitan-chicken-style-salad-rye",
 "title": "Seitan Curry Salad on Rye",
 "slot": "lunch",
 "protein": "Seitan / wheat gluten",
 "carb": "Rye bread",
 "produce": "Celery raw|Apple raw with skin|Spinach raw",
 "fat": "Tahini \\(sesame butter\\)|Hummus",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "method": "1. Chop the seitan small. 2. Stir it with the tahini, curry powder, lemon juice and a little water until creamy. 3. Fold in the diced celery and apple. 4. Pile onto rye with the greens.",
 "batchQ": 2, "prepMethod": "1. Equipment: a bowl and 5 containers.\n2. Chop the seitan and mix it with the tahini, curry powder, lemon and water.\n3. Fold in the celery and apple.\n4. Toast the rye fresh when you eat it.\n5. Cool within 2 hours, then portion.\n6. Storage: fridge 4 days.\n7. Reheat: Eat cold.",
 "makes": 5,
 "season": "Curry powder, salt, black pepper, lemon juice, and a pinch of chili. The apple brings the sweet crunch.",
 "note": "A coronation-style salad, dairy-free, with seitan carrying the protein. Contains gluten."
},
{
 "id": "edamame-tofu-buddha-bowl-miso",
 "title": "Edamame & Tofu Buddha Bowl with Miso Dressing",
 "slot": "lunch",
 "protein": "Tofu firm|Edamame cooked",
 "carb": "Brown rice cooked|Quinoa cooked",
 "produce": "Carrots raw|Cabbage raw|Cucumber raw",
 "fat": "Tahini \\(sesame butter\\)|Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Edamame cooked",
   60
  ],
  [
   "Miso paste",
   12
  ]
 ],
 "method": "1. Bake or pan-fry the tofu until golden. 2. Whisk the miso, tahini, rice vinegar and a little water into a dressing. 3. Build bowls with the grain, tofu, edamame and raw vegetables, and pour the dressing over.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pan, a bowl, and 5 containers.\n2. Cook the tofu. Cook the grain and spread it on a tray to cool.\n3. Whisk the miso-tahini dressing and pack it in small pots.\n4. Pack the grain, tofu and edamame together, and the shredded vegetables in a separate section.\n5. Get the containers in the fridge within 2 hours of cooking.\n6. Storage: fridge 4 days. The grain, tofu and edamame freeze 3 months; the raw vegetables do not.\n7. Reheat: Eat cold, or warm the tofu and grain and add the rest after.",
 "makes": 5,
 "season": "Miso, tahini, rice vinegar, grated ginger and a little maple in the dressing. Sesame seeds and scallion on top.",
 "note": "Two soy proteins and a fermented miso dressing in one bowl."
},
{
 "id": "tvp-black-bean-enchilada-skillet",
 "title": "TVP & Black Bean Enchilada Skillet",
 "slot": "dinner",
 "protein": "TVP \\(textured soy protein\\) dry",
 "carb": "Black beans cooked|Corn tortilla",
 "produce": "Bell pepper cooked|Zucchini cooked|Tomato raw",
 "fat": "Avocado raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Enchilada sauce red",
   80
  ],
  [
   "Onion raw",
   40
  ],
  [
   "Corn tortilla",
   48
  ]
 ],
 "method": "1. Soak the TVP in hot water for 5 minutes. 2. Soften the onion, pepper and zucchini. 3. Add the TVP, beans and enchilada sauce and simmer 5 minutes. 4. Tear the tortillas in and simmer until they soften into the sauce. 5. Top with the avocado.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large skillet and 5 containers.\n2. Soak the TVP.\n3. Soften the vegetables, add the TVP, beans and sauce, simmer 5 minutes.\n4. Tear in the tortillas and simmer until soft. Add the avocado fresh.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Cumin, oregano, chili powder, salt, and lime juice and cilantro to finish.",
 "note": "All the flavour of enchiladas in one pan, with none of the rolling."
},
{
 "id": "smoky-tempeh-white-bean-cassoulet",
 "title": "Smoky Tempeh & White Bean Cassoulet",
 "slot": "dinner",
 "protein": "Tempeh",
 "carb": "White beans cooked|Navy beans cooked",
 "produce": "Carrots cooked|Celery raw|Kale cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   60
  ],
  [
   "Garlic raw",
   8
  ],
  [
   "Tomato raw",
   100
  ]
 ],
 "method": "1. Crumble the tempeh and brown it in the oil with smoked paprika. 2. Add the onion, carrot, celery and garlic and cook 6 minutes. 3. Add the tomato, beans and a little water and simmer 20 minutes. 4. Stir in the kale.",
 "batchQ": 3, "prepMethod": "1. Equipment: a heavy pot and 5 containers.\n2. Brown the crumbled tempeh with smoked paprika.\n3. Add the aromatics, 6 minutes.\n4. Add the tomato, beans and water, simmer 20 minutes, then the kale.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Smoked paprika, thyme, a bay leaf, salt, black pepper, and a splash of red wine vinegar at the end.",
 "note": "A French bean stew made plant-based, with smoky tempeh for depth. Fermented, smoky and very filling."
},
{
 "id": "greek-lemon-tofu-potatoes",
 "title": "Greek Lemon-Oregano Tofu with Potatoes & Green Beans",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Potato baked flesh",
 "produce": "Green beans cooked|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Garlic raw",
   8
  ]
 ],
 "method": "1. Toss the potato wedges with half the oil, lemon, oregano and garlic and roast at 425F for 25 minutes. 2. Add the tofu cubes and green beans and roast 15 minutes more. 3. Finish with more lemon.",
 "batchQ": 2, "prepMethod": "1. Equipment: a large sheet pan and 5 containers.\n2. Roast the lemon-oregano potatoes 25 minutes at 425F.\n3. Add the tofu and green beans, roast 15 minutes.\n4. Squeeze fresh lemon over as it comes out.\n5. Cool within 2 hours, then portion.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Lots of lemon juice and zest, dried oregano, garlic, salt and black pepper. Greek lemon potatoes are the star.",
 "note": "Greek lemon potatoes, the kind you get at a taverna, with tofu roasted in the same juices."
},
{
 "id": "harissa-tofu-chickpea-traybake",
 "title": "Harissa Tofu & Chickpea Traybake",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Chickpeas cooked",
 "produce": "Bell pepper cooked|Zucchini cooked|Onion raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Harissa paste",
   25
  ]
 ],
 "method": "1. Toss the tofu, chickpeas, peppers, zucchini and onion with the harissa and oil. 2. Roast at 425F for 25 minutes, turning once, until charred at the edges.",
 "batchQ": 2, "prepMethod": "1. Equipment: a large sheet pan and 5 containers.\n2. Toss everything with the harissa and oil.\n3. Roast 25 minutes at 425F, turning once.\n4. Divide between containers.\n5. Cool within 2 hours, then portion.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Harissa does most of it. Salt, cumin, and lemon juice and parsley over the top. A spoon of tahini if you like.",
 "note": "One tray, two plant proteins, and a lot of flavour for very little work."
},
{
 "id": "jerk-tofu-rice-and-peas",
 "title": "Jerk Tofu with Rice & Peas",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Kidney beans cooked|Brown rice cooked|White rice cooked",
 "produce": "Cabbage cooked|Carrots cooked|Bell pepper cooked",
 "fat": "Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Onion raw",
   40
  ],
  [
   "Garlic raw",
   6
  ]
 ],
 "method": "1. Rub the tofu slabs with the jerk seasoning and roast or grill until charred. 2. Simmer the rice and kidney beans with thyme and a little onion. 3. Steam the cabbage, carrot and pepper. 4. Serve together.",
 "batchQ": 2, "prepMethod": "1. Equipment: a sheet pan, a pot, and 5 containers.\n2. Roast the jerk tofu at 425F, 25 minutes.\n3. Cook the rice and kidney beans with thyme and onion.\n4. Steam the cabbage, carrot and pepper and divide everything up.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Jerk: allspice, thyme, scotch bonnet or cayenne, garlic, soy sauce, lime and a little sweetener. Lime wedges to serve.",
 "note": "Caribbean rice and peas, which is actually rice and kidney beans, with smoky, spicy jerk tofu."
},
{
 "id": "seitan-broccoli-takeout",
 "title": "Seitan & Broccoli (Takeout-Style)",
 "slot": "dinner",
 "protein": "Seitan / wheat gluten",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Broccoli cooked|Bok choy cooked",
 "fat": "Sesame oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Soy sauce",
   12
  ],
  [
   "Garlic raw",
   8
  ]
 ],
 "method": "1. Slice the seitan thin and sear it in a very hot pan until browned. 2. Steam the broccoli 3 minutes. 3. Toss both with the garlic, soy sauce and a slurry of water and cornstarch until glossy. 4. Serve over rice.",
 "season": "Garlic, fresh ginger, soy sauce, a little rice vinegar and sweetener, and sesame seeds. The sauce should coat, not pool.",
 "note": "The takeout classic made plant-based. Seared seitan gives it a real chew. Contains gluten."
},
{
 "id": "moroccan-tofu-chickpea-couscous",
 "title": "Moroccan Spiced Tofu with Chickpeas & Couscous",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Couscous cooked|Quinoa cooked",
 "produce": "Carrots cooked|Zucchini cooked|Tomato raw",
 "fat": "Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Chickpeas cooked",
   60
  ],
  [
   "Apricots raw",
   40
  ],
  [
   "Onion raw",
   40
  ]
 ],
 "method": "1. Brown the tofu cubes in the oil with the spices. 2. Add the onion, carrot and zucchini and cook 5 minutes. 3. Add the tomato, chickpeas, chopped apricot and a splash of water and simmer 12 minutes. 4. Serve over the couscous.",
 "batchQ": 3, "prepMethod": "1. Equipment: a large pan, a bowl, and 5 containers.\n2. Brown the spiced tofu.\n3. Add the vegetables, then the tomato, chickpeas, apricot and water, simmer 12 minutes.\n4. Pack with the couscous.\n5. Portion into containers straight away and get them in the fridge within 2 hours. A full pot cools too slowly.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Microwave 2 minutes, stirring halfway, or warm in a pan with a splash of water.",
 "makes": 5,
 "season": "Ras el hanout or cumin, cinnamon, ginger and paprika, salt, and lemon and fresh mint or cilantro to finish.",
 "note": "Tagine flavours: warm spice, sweet apricot and a squeeze of lemon."
},
{
 "id": "crispy-tofu-nuggets-sweet-potato-fries",
 "title": "Crispy Tofu Nuggets with Sweet Potato Fries",
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Sweet potato baked",
 "produce": "Broccoli cooked|Green beans cooked",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Yellow mustard",
   10
  ]
 ],
 "method": "1. Cut the sweet potato into fries and the pressed tofu into nuggets. 2. Toss both with the oil, smoked paprika, garlic powder and salt. 3. Roast at 425F for 25 to 30 minutes, turning once, until crisp. 4. Serve with the broccoli and mustard for dipping.",
 "batchQ": 1, "prepMethod": "1. Equipment: two sheet pans and 5 containers.\n2. Toss the fries and nuggets with oil and seasoning.\n3. Roast 25 to 30 minutes at 425F, turning once.\n4. Cool on the tray before packing so they stay crisp.\n5. Cool within 2 hours, then portion.\n6. Storage: fridge 4 days, freezer 3 months.\n7. Reheat: Air fryer or oven 5 minutes to re-crisp. The microwave makes them soft.",
 "makes": 5,
 "season": "Smoked paprika, garlic powder, onion powder, salt, and a mustard or hot sauce dip.",
 "note": "Kid-friendly, and the air fryer brings them back to crisp in minutes."
},
{
 "id": "miso-tempeh-brown-rice-kimchi",
 "title": "Miso-Glazed Tempeh with Brown Rice & Kimchi",
 "slot": "lunch",
 "protein": "Tempeh",
 "carb": "Brown rice cooked",
 "produce": "Vegan kimchi|Spinach raw|Cucumber raw",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Miso paste",
   15
  ],
  [
   "Vegan kimchi",
   60
  ]
 ],
 "method": "1. Slice the tempeh and steam it 5 minutes to soften any bitterness. 2. Brush with a glaze of miso, a little maple and water. 3. Pan-fry until caramelised. 4. Serve over the rice with the kimchi and greens.",
 "batchQ": 2, "prepMethod": "1. Equipment: a pan with a lid, and 5 containers.\n2. Steam the tempeh 5 minutes, then glaze and pan-fry until caramelised.\n3. Cook the rice and spread it on a tray to cool. Pack the tempeh with the rice, the greens in a separate section, and the kimchi in a separate pot.\n4. Get the containers in the fridge within 2 hours of cooking.\n5. Storage: fridge 4 days, freezer 3 months for the tempeh and rice only.\n6. Reheat: Warm the tempeh and rice, add the kimchi cold.",
 "makes": 5,
 "season": "Miso, a little maple, rice vinegar on the cucumber, sesame seeds and scallion.",
 "note": "Three fermented foods in one bowl: tempeh, miso and kimchi."
},
{
 "id": "vegan-overnight-oats-brazil-nut",
 "title": "Vegan Protein Overnight Oats with Berries & a Brazil Nut",
 "slot": "breakfast",
 "protein": "Pea & rice protein powder",
 "carb": "Oats dry",
 "produce": "Blueberries raw|Raspberries raw|Strawberries raw",
 "fat": "Brazil nuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Almond milk unsweetened",
   200
  ],
  [
   "Chia seeds",
   10
  ]
 ],
 "method": "1. Whisk the protein powder into the almond milk until smooth. 2. Stir in the oats and chia. 3. Cover and refrigerate overnight. 4. In the morning, top with berries and the chopped Brazil nut.",
 "batchQ": 3, "prepMethod": "1. Equipment: a bowl, a whisk, and 5 jars.\n2. Whisk the protein powder and a pinch of salt into the almond milk, then stir in the oats and chia.\n3. Divide between jars.\n4. Add the berries and the Brazil nut when you eat it.\n5. Storage: fridge 3 days.\n6. Reheat: eat cold, or warm 60 seconds.",
 "makes": 5,
 "season": "A pinch of salt, cinnamon, and a little vanilla. One Brazil nut only: it covers the day's selenium, which plant-based diets most often run short on.",
 "note": "Plant-based diets are the most likely to run low on selenium. One Brazil nut a day fixes that, and more is not better."
},
{
 "id": "lean-butter-chicken-basmati-prep",
 "title": "Lean Butter Chicken", "batchQ": 3,
 "slot": "dinner",
 "protein": "Chicken thigh cooked|Chicken breast cooked",
 "prefProtein": "Chicken thigh",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Cauliflower cooked|Spinach cooked|Green beans cooked",
 "fat": "Butter salted|Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   70
  ],
  [
   "Tomato raw",
   150
  ],
  [
   "Onion raw",
   50
  ]
 ],
 "method": "1. Toss the chicken in half the yogurt with garam masala, turmeric, chili powder, garlic and salt. 2. Brown it in a hot pan and set it aside. 3. Melt the butter, soften the onion 6 minutes, add ginger and the spices for 30 seconds, then the tomato, and simmer 12 minutes. 4. Blend the sauce smooth, return the chicken and simmer 8 minutes until cooked through. 5. Off the heat, stir in the rest of the yogurt. Serve over the rice with your vegetable.",
 "prepMethod": "1. Equipment: a large deep pan, a blender or stick blender, a pot for rice, a sheet tray, and 4 containers.\n2. Marinate the chicken in half the yogurt with garam masala, turmeric, chili powder, garlic and salt for at least 30 minutes, or overnight. The yogurt and spices are what keep the chicken tasting fresh when you reheat it.\n3. Brown the chicken in batches and set it aside. It finishes cooking in the sauce.\n4. Melt the butter, soften the onion 6 minutes, add the ginger and spices for 30 seconds, then the tomato. Simmer 12 minutes and blend smooth.\n5. Return the chicken and simmer 8 to 10 minutes until it reads 165F. Take the pan off the heat before stirring in the rest of the yogurt, so it does not split.\n6. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk. Cook your vegetable while it chills.\n7. Let the curry cool uncovered 15 minutes, then pack curry, rice and vegetable into 4 containers and refrigerate.\n8. Keep the cilantro and lemon separate and add them after reheating.\n9. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it. Stir the sauce well once it is hot.\n10. Reheat: microwave covered with a splash of water, 2 to 3 minutes, stirring halfway, until steaming hot all the way through.",
 "makes": 4,
 "season": "Garam masala, cumin, smoked paprika, turmeric, a little chili powder, fresh ginger and salt. A squeeze of lemon and fresh cilantro after reheating.",
 "note": "Butter chicken made lean: yogurt in place of cream and about a teaspoon of butter a portion. Thigh meat braised in a spiced tomato sauce is one of the best things you can reheat."
},
{
 "id": "white-chicken-chili-salsa-verde-prep",
 "title": "White Chicken Chili", "batchQ": 3,
 "slot": "lunch",
 "protein": "Chicken breast cooked|Chicken thigh cooked",
 "carb": "White beans cooked|Navy beans cooked",
 "produce": "Zucchini cooked|Bell pepper cooked|Sweet corn cooked",
 "fat": "Avocado raw|Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Salsa verde \\(tomatillo\\)",
   70
  ],
  [
   "Onion raw",
   50
  ],
  [
   "Greek yogurt plain nonfat",
   40
  ]
 ],
 "method": "1. Poach the chicken in the broth 15 minutes, then shred it. 2. Soften the onion and garlic in a little oil 5 minutes, then add the cumin and oregano. 3. Add the salsa verde, the broth, the beans and your vegetable and simmer 15 minutes. 4. Mash a ladle of beans against the pot to thicken it and stir the chicken back in. 5. Top with the yogurt and avocado.",
 "prepMethod": "1. Equipment: a large pot, two forks, and 4 shallow containers.\n2. Poach the chicken in the broth with a pinch of salt, 15 to 18 minutes, until it reads 165F. Lift it out, shred it, and keep the broth.\n3. Soften the onion and garlic in a little olive oil 5 minutes, then add the cumin and oregano for 30 seconds.\n4. Add the salsa verde, the poaching broth, the beans and your vegetable (zucchini, peppers or corn). Simmer 15 minutes and mash a ladle of beans against the pot so it turns thick and creamy.\n5. Stir the chicken back in. Stored in the chili it stays moist and does not pick up the stale taste plain chicken gets.\n6. Cool uncovered 15 minutes, portion into shallow containers so it chills fast, and refrigerate.\n7. Keep the yogurt, avocado, lime and cilantro separate and add them after reheating.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it.\n9. Reheat: microwave covered 2 to 3 minutes, stirring halfway, until steaming hot. Add a splash of water if it has thickened.",
 "makes": 4,
 "season": "Cumin, oregano, a pinch of chili flakes, salt, and plenty of lime juice and cilantro at the end.",
 "note": "Lighter and brighter than red chili. The tomatillo salsa does most of the work and the mashed beans make it creamy."
},
{
 "id": "egg-roll-bowl-ground-turkey-prep",
 "title": "Turkey Egg Roll in a Bowl", "batchQ": 2,
 "slot": "lunch",
 "protein": "Turkey ground 93/7 cooked|Ground chicken breast 98% lean cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Cabbage cooked|Carrots cooked|Bok choy cooked",
 "fat": "Sesame oil|Avocado oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Egg whole raw",
   50
  ],
  [
   "Soy sauce",
   12
  ],
  [
   "Sriracha / hot sauce",
   8
  ]
 ],
 "method": "1. Brown the turkey in a hot pan, breaking it up. 2. Add the garlic, ginger and onion for 1 minute. 3. Add the cabbage and carrots and stir-fry 4 minutes until just tender. 4. Push it aside, scramble the egg in the gap and fold it through. 5. Season with the soy sauce and sesame oil and serve over the rice with sriracha.",
 "prepMethod": "1. Equipment: a large skillet or wok, a pot for rice, a sheet tray, and 4 containers.\n2. Brown the turkey hard in the hot pan so it gets a crust, then add the garlic, ginger and onion for 1 minute.\n3. Add the cabbage and carrots and stir-fry only 3 to 4 minutes. Leave some crunch, because they soften more when reheated.\n4. Scramble the egg in the pan, fold it through, and season with the soy sauce, a splash of rice vinegar and the sesame oil. The salty ginger sauce is what keeps the turkey tasting fresh on day 3.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n6. Cool the stir-fry uncovered 10 minutes, then pack it over the rice and refrigerate.\n7. Keep the sriracha and sliced scallion separate and add them after reheating.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it.\n9. Reheat: microwave covered with a splash of water, 2 minutes, stir, then 1 more minute until steaming hot throughout.",
 "makes": 4,
 "season": "Fresh ginger, garlic, soy sauce, rice vinegar, a few drops of sesame oil, and sriracha and scallion on top.",
 "note": "Everything inside an egg roll with no wrapper and no fryer. Cabbage keeps its bite for days, which most greens do not."
},
{
 "id": "beef-barbacoa-burrito-bowls-prep",
 "title": "Beef Barbacoa Burrito Bowls", "batchQ": 3,
 "slot": "dinner",
 "protein": "Beef top round lean cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bell pepper cooked|Cabbage raw|Sweet corn cooked",
 "fat": "Avocado raw",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Black beans cooked",
   60
  ],
  [
   "^Salsa$",
   40
  ]
 ],
 "method": "1. Blend the chipotle, garlic, onion, cumin, oregano, a pinch of cloves, a splash of vinegar and the broth into a sauce. 2. Cover the beef chunks with the sauce and braise low 2 1/2 to 3 hours until it falls apart. 3. Shred it into the sauce. 4. Serve over the rice with lime and cilantro, the black beans, your vegetable, salsa and avocado.",
 "prepMethod": "1. Equipment: a Dutch oven, slow cooker or pressure cooker, a blender, a pot for rice, a sheet tray, and 4 containers.\n2. Blend the chipotle, garlic, onion, cumin, oregano, a pinch of ground cloves, a splash of cider vinegar and the broth.\n3. Cut the beef into large chunks, salt it, cover it with the sauce and braise at 300F for 2 1/2 to 3 hours (slow cooker 8 hours on low, pressure cooker 60 minutes) until it shreds with a fork.\n4. Shred the beef and stir it back into the braising liquid. Lean round dries out on its own, but stored in its sauce it stays juicy.\n5. Cook the rice and stir in lime zest and chopped cilantro. Spread it thin on a sheet tray and get it into the fridge within 1 hour.\n6. Warm the black beans and cook the peppers or corn. Cool the beef uncovered 15 minutes, then pack beef, rice, beans and vegetable into 4 containers.\n7. Keep the salsa, avocado and lime wedges separate and add them after reheating.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it. The beef in its liquid also freezes well on its own.\n9. Reheat: microwave covered with a splash of water, 2 to 3 minutes, stirring halfway, until steaming hot.",
 "makes": 4,
 "season": "Chipotle, cumin, oregano, a pinch of ground cloves, cider vinegar and salt. Lime zest, lime juice and cilantro in the rice.",
 "note": "Slow-braised, shredded barbacoa made with lean round. Beef braised in its own sauce reheats better than almost anything, because it was cooked slowly in liquid to begin with."
},
{
 "id": "sticky-orange-chicken-broccoli-prep",
 "title": "Sticky Orange Chicken", "batchQ": 2,
 "slot": "dinner",
 "protein": "Chicken thigh cooked|Chicken breast cooked",
 "prefProtein": "Chicken thigh",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Broccoli cooked|Snap peas cooked|Bell pepper cooked",
 "fat": "Sesame oil|Avocado oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Orange raw",
   60
  ],
  [
   "Soy sauce",
   12
  ]
 ],
 "method": "1. Cut the chicken into bite-size pieces, toss with a little cornstarch and salt, and sear in a hot pan until golden and cooked through. 2. Simmer the juice and zest of the orange with the soy sauce, honey, garlic, ginger and a splash of vinegar until syrupy. 3. Toss the chicken in the glaze. 4. Serve over the rice with the steamed broccoli.",
 "prepMethod": "1. Equipment: a large nonstick skillet, a small pot, a pot for rice, a sheet tray, and 4 containers.\n2. Toss the chicken pieces with a spoon of cornstarch, salt and pepper, and sear in batches until golden and 165F inside.\n3. Simmer the orange juice and zest, soy sauce, honey, garlic, ginger and a splash of rice vinegar 4 to 5 minutes until it coats a spoon.\n4. Toss the chicken in the glaze while both are hot. The glaze coats every piece, which stops it drying out and tasting stale when reheated.\n5. Steam the broccoli 3 minutes only, then spread it out to cool so it stays green and firm.\n6. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n7. Cool the chicken uncovered 10 minutes, pack it with the rice and broccoli, and refrigerate.\n8. Keep the sesame seeds and scallion separate for the top.\n9. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it.\n10. Reheat: microwave covered with a splash of water, 2 to 3 minutes, until steaming hot. For crisp edges, warm the chicken 4 minutes in the air fryer.",
 "makes": 4,
 "season": "Orange zest and juice, soy sauce, fresh ginger, garlic, rice vinegar and a pinch of chili flakes. Sesame seeds and scallion on top.",
 "note": "The takeout favorite made with seared thigh and a real orange glaze, at a fraction of the fat and sugar of the deep-fried version."
},
{
 "id": "pork-chile-verde-rice-pinto-prep",
 "title": "Pork Chile Verde with Pinto Beans", "batchQ": 3,
 "slot": "dinner",
 "protein": "Pork tenderloin lean roasted|Pork chop lean cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bell pepper cooked|Zucchini cooked",
 "fat": "Avocado raw|Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Salsa verde \\(tomatillo\\)",
   90
  ],
  [
   "Pinto beans cooked",
   60
  ],
  [
   "Onion raw",
   50
  ]
 ],
 "method": "1. Cut the pork into 1-inch cubes, season with cumin, oregano and salt, and brown in a hot pan. 2. Add the onion, garlic and your vegetable for 3 minutes. 3. Add the salsa verde and broth and simmer gently, covered, 20 to 25 minutes until the pork is tender. 4. Serve over the rice with the pinto beans, avocado and lime.",
 "prepMethod": "1. Equipment: a Dutch oven or deep pan with a lid, a pot for rice, a sheet tray, and 4 containers.\n2. Cube the pork, season it with cumin, oregano and salt, and brown it hard in batches in a little olive oil.\n3. Add the onion, garlic and your vegetable for 3 minutes, then the salsa verde and broth.\n4. Simmer covered on low 20 to 25 minutes, just until the pork is tender. Tenderloin is lean, so it wants a gentle simmer, not hours, and the tangy tomatillo sauce keeps it moist on reheat.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk. Warm the pinto beans.\n6. Cool the stew uncovered 15 minutes, then pack stew, rice and beans into 4 containers.\n7. Keep the avocado, lime and cilantro separate and add them after reheating.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it.\n9. Reheat: microwave covered 2 to 3 minutes, stirring halfway, until steaming hot. A splash of water loosens the sauce.",
 "makes": 4,
 "season": "Cumin, oregano, a jalapeno if you like heat, salt, and lime juice and cilantro at the end.",
 "note": "Mexican green chili made with lean pork tenderloin. The tomatillo sauce is sharp and bright, and the pork sits in it all week."
},
{
 "id": "sheet-pan-chicken-shawarma-garlic-yogurt-prep",
 "title": "Sheet-Pan Chicken Shawarma with Garlic Yogurt", "batchQ": 2,
 "slot": "lunch",
 "protein": "Chicken thigh cooked|Chicken breast cooked",
 "prefProtein": "Chicken thigh",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Cauliflower cooked|Bell pepper cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   70
  ],
  [
   "Cucumber raw",
   60
  ],
  [
   "Tomato raw",
   50
  ]
 ],
 "method": "1. Toss the chicken with lemon juice, garlic, a little oil and the shawarma spices. 2. Roast it on a sheet pan at 425F with your vegetable for 22 to 25 minutes until charred at the edges. 3. Stir the yogurt with grated garlic, lemon and salt. 4. Slice the chicken and serve over the rice with the cucumber, tomato and garlic yogurt.",
 "prepMethod": "1. Equipment: a large sheet pan, parchment, a pot for rice, a second tray, a bowl, and 4 containers plus 4 small tubs.\n2. Marinate the chicken in lemon juice, garlic, a little oil, cumin, coriander, paprika, turmeric, a pinch of cinnamon and salt for at least 1 hour or overnight. Spices like these slow the stale taste reheated chicken gets.\n3. Roast the chicken and your vegetable at 425F, 22 to 25 minutes, until the edges char and the chicken reads 165F. Rest it 5 minutes, then slice.\n4. Cook the rice, spread it thin on the second tray, and get it into the fridge within 1 hour.\n5. Stir the yogurt with grated garlic, lemon and salt and spoon it into the small tubs.\n6. Cool the chicken uncovered 10 minutes, then pack chicken, vegetable and rice into the containers.\n7. Keep the cucumber and tomato raw and in their own tub so they do not go watery, and add them cold.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. The chicken and rice freeze 3 months; the garlic yogurt keeps 4 days in the fridge but does not freeze.\n9. Reheat: microwave the chicken and rice covered with a splash of water, 2 minutes, until steaming hot. Add the garlic yogurt and salad cold.",
 "makes": 4,
 "season": "Cumin, coriander, smoked paprika, turmeric, a pinch of cinnamon, garlic, lemon and salt. Chili flakes and parsley on top.",
 "note": "Street-cart shawarma from a sheet pan. Spiced, roasted thigh meat is the chicken that holds up best in the fridge."
},
{
 "id": "chicken-parmesan-pasta-bake-prep",
 "title": "Chicken Parmesan Pasta Bake", "batchQ": 3,
 "slot": "dinner",
 "protein": "Chicken breast cooked",
 "carb": "Whole wheat pasta cooked|^Pasta cooked",
 "produce": "Spinach cooked|Zucchini cooked|Broccoli cooked",
 "fat": "Mozzarella part skim",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Marinara sauce",
   150
  ],
  [
   "Parmesan cheese shredded",
   8
  ]
 ],
 "method": "1. Season the chicken with garlic, oregano and basil, coat the top with the parmesan and bake at 425F for 18 to 20 minutes until cooked through. 2. Cook the pasta and toss it with the marinara and your vegetable. 3. Put the pasta in a baking dish, slice the chicken over it, scatter the mozzarella on top and bake 10 minutes until bubbling.",
 "prepMethod": "1. Equipment: a sheet pan, a pot, an 8x11 or 9x13 baking dish, and 4 containers.\n2. Season the chicken breasts with garlic, oregano, basil and salt, press the parmesan onto the tops, and bake at 425F for 18 to 20 minutes until 165F. Rest 5 minutes and slice.\n3. Cook the pasta 2 minutes short of done. It finishes in the oven and keeps softening in the fridge.\n4. Toss the pasta with the marinara and your vegetable (spinach, zucchini or broccoli). The tomato sauce is what keeps the chicken moist and tasting fresh on day 3.\n5. Spread it in the dish, lay the sliced chicken on top, scatter the mozzarella, and bake 10 minutes until bubbling.\n6. Cool uncovered 15 minutes, cut 4 portions, and have them in the fridge within 1 hour.\n7. Keep fresh basil and chili flakes for serving.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it.\n9. Reheat: microwave covered 2 to 3 minutes until steaming hot in the center, or 15 minutes at 350F under foil.",
 "makes": 4,
 "season": "Garlic, dried oregano, basil, chili flakes, black pepper and salt. Fresh basil on top.",
 "note": "Chicken parm without the frying: parmesan-crusted breast baked over pasta in marinara. A pasta bake in tomato sauce is one of the few chicken dishes that tastes as good reheated."
},
{
 "id": "chicken-cacciatore-peppers-potatoes-prep",
 "title": "Chicken Cacciatore", "batchQ": 3,
 "slot": "dinner",
 "protein": "Chicken thigh cooked|Chicken breast cooked",
 "prefProtein": "Chicken thigh",
 "carb": "Potato baked flesh",
 "produce": "Bell pepper cooked|Zucchini cooked",
 "fat": "Olive oil",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Tomato raw",
   150
  ],
  [
   "Onion raw",
   50
  ]
 ],
 "method": "1. Brown the chicken in the oil and set it aside. 2. Soften the onion, peppers and garlic 5 minutes. 3. Add the tomato, rosemary, oregano, a splash of vinegar and the chicken, cover and simmer 25 minutes. 4. Roast the potatoes and serve them with the chicken and sauce.",
 "prepMethod": "1. Equipment: a large Dutch oven or deep pan with a lid, a sheet pan, and 4 containers.\n2. Salt the chicken and brown it well, then set it aside.\n3. Soften the onion, peppers and garlic 5 minutes, then add the tomato, rosemary, oregano, a bay leaf and a splash of red wine vinegar.\n4. Return the chicken, cover and simmer 25 minutes until it reads 165F and is tender. Rosemary and oregano are two of the best-studied herbs for keeping cooked chicken from tasting stale, and here they cook right in the sauce with it.\n5. Meanwhile cut the potatoes into chunks, toss with a little oil and salt, and roast at 425F for 30 minutes.\n6. Cool everything uncovered 15 minutes, pack chicken, sauce and potatoes, and refrigerate.\n7. Keep the fresh parsley separate and add it after reheating.\n8. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. The chicken and sauce freeze 3 months; potatoes go slightly grainy frozen, so roast a fresh one for any portion you freeze.\n9. Reheat: microwave covered 2 to 3 minutes, stirring halfway, until steaming hot, or warm in a covered pan.",
 "makes": 4,
 "season": "Rosemary, oregano, a bay leaf, chili flakes, red wine vinegar, salt and black pepper. Fresh parsley and a few sliced olives at the end.",
 "note": "Italian hunter-style braised chicken with peppers and tomato. A braise is built for leftovers because the meat sits in its sauce the whole time."
},
{
 "id": "cold-sesame-salmon-noodle-salad-prep",
 "title": "Cold Sesame Salmon Noodle Salad", "batchQ": 1,
 "slot": "lunch",
 "protein": "Salmon pink canned|Salmon Atlantic farmed cooked",
 "carb": "Whole wheat pasta cooked|^Pasta cooked",
 "produce": "Cabbage raw|Cucumber raw|Carrots raw|Snap peas cooked",
 "fat": "Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Edamame cooked",
   50
  ],
  [
   "Soy sauce",
   12
  ]
 ],
 "method": "1. Cook the noodles (whole-wheat spaghetti or any pasta), rinse them under cold water and toss with a few drops of sesame oil. 2. Whisk the soy sauce, rice vinegar, grated ginger, garlic and the rest of the sesame oil into a dressing. 3. Toss the noodles with your vegetable and the edamame. 4. Flake the salmon on top and pour over the dressing.",
 "prepMethod": "1. Equipment: a pot, a colander, a small jar for the dressing, and 3 containers.\n2. Cook the noodles (whole-wheat spaghetti is closest to soba) 1 minute short of done, rinse under cold water, drain well and toss with a few drops of sesame oil so they do not clump. Get them into the fridge within 1 hour.\n3. Shred the cabbage or carrots, or slice the cucumber or snap peas, whichever is your vegetable, and thaw the edamame.\n4. If you use fresh salmon, bake it on cook day at 400F for 12 to 14 minutes and chill it straight away. Canned salmon needs no cooking at all.\n5. Shake the soy sauce, rice vinegar, grated ginger, garlic and sesame oil in the jar.\n6. Pack noodles, vegetable and edamame in 3 containers with the salmon flaked on top, and keep the dressing in its jar.\n7. This salad is cold on purpose. Reheating is what brings out the stale, fishy smell in leftover fish, so eating it cold avoids most of it.\n8. Storage: fridge 3 days. Fish loses quality faster than any other protein, so this is a 3-day batch only. Do not freeze; the vegetables go limp.\n9. Reheat: none. Eat it cold, and dress and toss it just before eating.",
 "makes": 3,
 "season": "Rice vinegar, soy sauce, fresh ginger, garlic, chili flakes, and sesame seeds and scallion on top.",
 "note": "A cold noodle salad that lets you eat fish on day 3 without the reheated-fish smell. Canned salmon brings the omega-3 for less money."
},
{
 "id": "lemon-dill-tuna-pasta-salad-peas-prep",
 "title": "Lemon-Dill Tuna Pasta Salad with Peas", "batchQ": 2,
 "slot": "lunch",
 "protein": "Tuna light canned in water",
 "carb": "Whole wheat pasta cooked|^Pasta cooked|Chickpea pasta cooked",
 "produce": "Green peas cooked|Cucumber raw|Bell pepper red raw",
 "fat": "Mayonnaise light|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   50
  ],
  [
   "Pickles dill",
   20
  ],
  [
   "Celery raw",
   30
  ]
 ],
 "method": "1. Cook the pasta, rinse it under cold water and drain well. 2. Stir the yogurt, the mayonnaise or olive oil, mustard, lemon juice, dill and chopped pickle into a dressing. 3. Toss the pasta with the peas, celery, onion and dressing. 4. Fold in the tuna just before eating.",
 "prepMethod": "1. Equipment: a pot, a colander, a large bowl, and 4 containers.\n2. Cook the pasta, rinse it under cold water, drain it well and spread it out so it cools fast. Get it into the fridge within 1 hour.\n3. Mix the yogurt, the mayonnaise or olive oil, mustard, lemon juice, dill, chopped pickle and a pinch of salt. Toss the pasta, peas, celery and onion through it and pack 4 containers.\n4. Keep the tuna in a sealed tub or the unopened can and fold it in on the day you eat each portion. The dressed pasta keeps longer than opened tuna does.\n5. Add an extra squeeze of lemon and fresh dill at serving. The pasta soaks up dressing overnight, so it needs a little lift.\n6. Storage: fridge 4 days for the dressed pasta. Opened tuna keeps 3 days in a sealed tub, so open a fresh can for the 4th portion. Does not freeze.\n7. Reheat: none. Eat it cold.",
 "makes": 4,
 "season": "Lemon juice and zest, fresh dill, black pepper, salt, and a pinch of celery salt or chili flakes.",
 "note": "A deli pasta salad with more tuna and less mayo. Yogurt carries most of the creaminess, and keeping the tuna apart until the day means the fish is never 4 days old."
},
{
 "id": "creole-shrimp-jambalaya-prep",
 "title": "Creole Shrimp Jambalaya", "batchQ": 2,
 "slot": "dinner",
 "protein": "Shrimp cooked",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bell pepper cooked|Okra cooked|Zucchini cooked",
 "fat": "Olive oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Tomato raw",
   120
  ],
  [
   "Onion raw",
   50
  ],
  [
   "Celery raw",
   40
  ]
 ],
 "method": "1. Soften the onion, pepper and celery in the oil 6 minutes with the garlic and Cajun seasoning. 2. Add the tomato and a splash of water and simmer 5 minutes. 3. Stir in the cooked rice. 4. Add the shrimp and cook 3 minutes until just pink. 5. Finish with hot sauce and scallion.",
 "prepMethod": "1. Equipment: a large deep pan, a pot for rice, a sheet tray, and 3 containers.\n2. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n3. Soften the onion, pepper, celery and garlic with the Cajun spices 6 minutes, add the tomato and simmer 5 minutes into a thick base. Salt it a little light and season again at the end.\n4. Honest advice on the shrimp: reheated shrimp turns tough and loses its sweetness. Best is to cook 1 portion now, keep the rest raw in the freezer, and cook each one into its portion of base, 3 minutes in a pan, on the day.\n5. If you cook all the shrimp now, stir them in for 2 minutes only, just until pink, cool uncovered 10 minutes, and eat them by day 3.\n6. Pack the base and rice in 3 containers. Keep the scallion and hot sauce for serving.\n7. Storage: fridge 3 days. The base alone keeps 4 days and freezes 3 months. Cooked shrimp: 3 days.\n8. Reheat: microwave the base covered with a splash of water until steaming hot, then either cook fresh shrimp into it for 3 minutes in a pan, or add the cooked shrimp for the last 30 seconds only.",
 "makes": 3,
 "season": "Cajun seasoning (paprika, garlic, onion, thyme, oregano, cayenne), a bay leaf, hot sauce and sliced scallion.",
 "note": "New Orleans rice with shrimp and the holy trinity of onion, pepper and celery. Shrimp is almost pure protein, so this is one of the leanest dinners in the plan."
},
{
 "id": "chipotle-tofu-tinga-bowls-prep",
 "title": "Chipotle Tofu Tinga Bowls with Rice & Black Beans", "batchQ": 3,
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Bell pepper cooked|Sweet corn cooked|Cabbage raw",
 "fat": "Avocado raw|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Black beans cooked",
   60
  ],
  [
   "^Salsa$",
   40
  ],
  [
   "Tomato raw",
   60
  ]
 ],
 "method": "1. Press the tofu, crumble it and brown it well in a hot pan. 2. Blend the chipotle, tomato, onion, garlic, cumin, oregano and a splash of vinegar. 3. Add the sauce to the tofu and simmer 10 minutes until thick. 4. Serve over the rice with the black beans, your vegetable, salsa and avocado.",
 "prepMethod": "1. Equipment: a large skillet, a blender, a pot for rice, a sheet tray, and 4 containers.\n2. Press the tofu 15 minutes, crumble it into small pieces and brown it hard in the hot pan, 8 to 10 minutes. Browning first is what gives it a meaty chew.\n3. Blend the chipotle, tomato, onion, garlic, cumin, oregano, a splash of vinegar and a little water. Pour it over the tofu and simmer 10 minutes until the sauce clings.\n4. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk. Warm the black beans and cook your vegetable (peppers or corn).\n5. Cool the tofu uncovered 10 minutes, then pack tofu, rice, beans and vegetable in 4 containers.\n6. Keep the salsa, avocado, lime and cilantro separate and add them after reheating.\n7. Storage: fridge 4 days, freezer 3 months.\n8. Reheat: microwave covered with a splash of water, 2 to 3 minutes, stirring halfway, until steaming hot.",
 "makes": 4,
 "season": "Chipotle in adobo, cumin, oregano, smoked paprika, cider vinegar and salt. Lime and cilantro at the end.",
 "note": "Tinga is the smoky chipotle, tomato and onion braise from Puebla, made here with crumbled tofu. Tofu keeps soaking up the sauce as it sits, so it holds its flavor all 4 days."
},
{
 "id": "sweet-sour-tofu-pineapple-peppers-prep",
 "title": "Sweet & Sour Tofu with Pineapple & Peppers", "batchQ": 2,
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Bell pepper cooked|Broccoli cooked|Snap peas cooked",
 "fat": "Avocado oil|Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Pineapple raw",
   80
  ],
  [
   "Edamame cooked",
   40
  ],
  [
   "Ketchup",
   15
  ]
 ],
 "method": "1. Press and cube the tofu, toss with a little cornstarch and bake at 425F for 25 minutes until crisp. 2. Stir-fry the peppers, pineapple and edamame 3 minutes. 3. Add a sauce of the ketchup, soy sauce, rice vinegar, garlic and a splash of pineapple juice and simmer until glossy. 4. Toss in the tofu and serve over the rice.",
 "prepMethod": "1. Equipment: a sheet pan, parchment, a large skillet, a pot for rice, a second tray, and 4 containers.\n2. Press the tofu 15 minutes, cube it, toss with a spoon of cornstarch and a pinch of salt, and bake at 425F for 25 minutes, turning once, until golden and crisp.\n3. Stir-fry the peppers (or broccoli or snap peas), pineapple and edamame in a little avocado oil 3 minutes. Keep the vegetables crisp, because they soften on reheating.\n4. Simmer the ketchup, soy sauce, rice vinegar, garlic and a splash of water 2 minutes until glossy and toss the vegetables through it.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n6. Pack rice and saucy vegetables, and set the tofu on top, not stirred into the sauce, so it stays firm. Let everything cool 10 minutes before the lids go on.\n7. Storage: fridge 4 days, freezer 3 months. Frozen tofu turns chewier, which a lot of people prefer.\n8. Reheat: microwave covered 2 minutes until steaming hot, or crisp the tofu 4 minutes in the air fryer and stir it into the hot sauce.",
 "makes": 4,
 "season": "Rice vinegar, ketchup, soy sauce, garlic, fresh ginger, and chili flakes if you like heat. Sesame seeds and scallion on top.",
 "note": "The takeout classic, baked instead of battered and fried. Pineapple and vinegar keep it bright right to the last container."
},
{
 "id": "smoky-red-beans-rice-tempeh-prep",
 "title": "Smoky Red Beans & Rice with Tempeh", "batchQ": 3,
 "slot": "dinner",
 "protein": "Tempeh",
 "carb": "Brown rice cooked|White rice cooked",
 "produce": "Bell pepper cooked|Collard greens cooked|Kale cooked",
 "fat": "Olive oil|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Kidney beans cooked",
   90
  ],
  [
   "Celery raw",
   40
  ],
  [
   "Hot sauce cayenne",
   8
  ]
 ],
 "method": "1. Crumble the tempeh and brown it in the oil with smoked paprika, thyme and a pinch of cayenne. 2. Add the onion, pepper, celery and garlic and cook 6 minutes. 3. Add the kidney beans, a bay leaf and water to cover and simmer 20 minutes, mashing some of the beans to thicken it. 4. Serve over the rice with hot sauce.",
 "prepMethod": "1. Equipment: a large heavy pot, a pot for rice, a sheet tray, and 4 containers.\n2. Crumble the tempeh and brown it well with the smoked paprika, thyme, oregano and cayenne. This is where the smoky flavor comes from, so let it catch and crisp.\n3. Add the onion, pepper, celery and garlic for 6 minutes, then the kidney beans, a bay leaf and water to cover. Simmer 20 minutes and mash a ladle of beans against the pot so it turns creamy.\n4. Stir in the greens (collards or kale) for the last 5 minutes if they are your vegetable.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n6. Cool the beans uncovered 15 minutes and pack them with the rice. Red beans thicken in the fridge, so loosen them with water when you reheat.\n7. Keep the hot sauce and scallion for serving.\n8. Storage: fridge 4 days, freezer 3 months.\n9. Reheat: microwave covered with a splash of water, 2 to 3 minutes, stirring halfway, until steaming hot.",
 "makes": 4,
 "season": "Smoked paprika, thyme, oregano, cayenne, a bay leaf, garlic and salt. Hot sauce and a splash of vinegar at the table.",
 "note": "Louisiana Monday red beans, with smoky browned tempeh in place of the sausage. Beans and rice is a dish made for cooking once and eating for days."
},
{
 "id": "west-african-peanut-stew-tofu-sweet-potato-prep",
 "title": "West African Peanut Stew with Tofu & Sweet Potato", "batchQ": 3,
 "slot": "dinner",
 "protein": "Tofu firm",
 "carb": "Sweet potato baked|Brown rice cooked",
 "produce": "Collard greens cooked|Kale cooked|Spinach cooked",
 "fat": "Peanut butter smooth|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "PBfit powdered peanut butter",
   15
  ],
  [
   "Chickpeas cooked",
   60
  ],
  [
   "Tomato raw",
   120
  ]
 ],
 "method": "1. Soften the onion and garlic with ginger, cumin and coriander. 2. Add the tomato and simmer 5 minutes. 3. Whisk in the peanut butter and powdered peanut butter with water to make a smooth sauce. 4. Add the sweet potato, chickpeas and cubed tofu and simmer 20 minutes. 5. Stir in the greens until wilted.",
 "prepMethod": "1. Equipment: a large pot, a whisk, and 4 shallow containers.\n2. Soften the onion, garlic and fresh ginger 5 minutes, then add the cumin, coriander and a pinch of cayenne for 30 seconds.\n3. Add the tomato, simmer 5 minutes, then whisk in the peanut butter, the powdered peanut butter and enough water for a pourable sauce. The powder gives full peanut flavor for a fraction of the fat.\n4. Add the cubed sweet potato, the chickpeas and the tofu and simmer 20 minutes until the sweet potato is tender. Stir in the greens (collards, kale or spinach) for the last 5 minutes.\n5. Cool uncovered 15 minutes, portion into shallow containers so it chills fast, and refrigerate.\n6. Keep the lime, cilantro and a few chopped peanuts for serving.\n7. Storage: fridge 4 days, freezer 3 months. It thickens as it sits.\n8. Reheat: microwave covered with a splash of water, 2 to 3 minutes, stirring halfway, until steaming hot.",
 "makes": 4,
 "season": "Fresh ginger, cumin, coriander, cayenne, salt, and lime juice and cilantro at the end.",
 "note": "A plant-based take on groundnut stew. Stews like this are made for batch cooking, because the sauce keeps everything in it moist."
},
{
 "id": "vegan-keema-matar-peas-basmati-prep",
 "title": "Vegan Keema Matar with Peas & Basmati Rice", "batchQ": 3,
 "slot": "dinner",
 "protein": "Tofu firm|TVP \\(textured soy protein\\) dry",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Cauliflower cooked|Spinach cooked|Green beans cooked",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Green peas cooked",
   70
  ],
  [
   "Tomato raw",
   120
  ],
  [
   "Onion raw",
   60
  ]
 ],
 "method": "1. Crumble your protein (firm tofu or soaked TVP, whichever your plan lists) and brown it in a hot pan. 2. Brown the onion slowly in the oil, add garlic, ginger and the spices, then the tomato, and cook 8 minutes into a thick masala. 3. Add the mince and peas with a splash of water and simmer 10 minutes. 4. Serve over the rice with your vegetable.",
 "prepMethod": "1. Equipment: a large skillet, a bowl, a pot for rice, a sheet tray, and 4 containers.\n2. Press the tofu 15 minutes and crumble it fine, then brown it in a hot pan until dry and golden, 8 to 10 minutes. (On a budget plan with TVP, soak it in hot water 5 minutes and squeeze it out instead.)\n3. Brown the onion slowly, 10 minutes, then add the garlic, fresh ginger, cumin, coriander, turmeric and garam masala for 30 seconds, then the tomato. Cook 8 minutes until thick and the oil starts to separate. This base is where all the flavor comes from, so do not rush it.\n4. Add the browned mince and peas with a splash of water and simmer 10 minutes. Cook your vegetable alongside.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n6. Cool the keema uncovered 10 minutes and pack it with the rice and vegetable.\n7. Keep the cilantro, lemon and any fresh chili for serving.\n8. Storage: fridge 4 days, freezer 3 months.\n9. Reheat: microwave covered with a splash of water, 2 to 3 minutes, stirring halfway, until steaming hot.",
 "makes": 4,
 "season": "Cumin, coriander, turmeric, garam masala, fresh ginger, green chili and salt. Lemon juice and cilantro at the end.",
 "note": "Keema matar is spiced mince and peas, one of the great Indian leftovers. Crumbled tofu browned hard takes on the texture of mince and soaks up the masala."
},
{
 "id": "egg-curry-anda-masala-rice-prep",
 "title": "Egg Curry (Anda Masala) with Rice", "batchQ": 3,
 "slot": "dinner",
 "protein": "Egg white raw",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Spinach cooked|Cauliflower cooked",
 "fat": "Avocado oil|Olive oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Egg whole cooked",
   100
  ],
  [
   "Tomato raw",
   150
  ],
  [
   "Green peas cooked",
   60
  ]
 ],
 "method": "1. Hard-boil the eggs 10 minutes, cool and peel them, and cut a few shallow slits in each. Boil extra eggs for the whites your plan lists and set their yolks aside. 2. Brown the onion slowly in the oil, add garlic, ginger and the spices, then the tomato, and cook until thick. 3. Add a splash of water, the peas and the eggs and simmer 5 minutes so the sauce gets into the cuts. 4. Serve over the rice with your vegetable.",
 "prepMethod": "1. Equipment: a pot, a bowl of ice water, a large deep pan, a pot for rice, a sheet tray, and 3 containers.\n2. Boil the eggs 10 minutes, then straight into ice water. Your plan lists whole eggs plus extra egg white: boil enough eggs for both, peel them, and lift out the extra yolks, which is how the curry stays lean. Cut 3 or 4 shallow slits in the whole eggs and halve the whites so the sauce soaks in. If you buy egg whites in a carton, cook them in a covered, oiled bowl in the microwave 2 to 3 minutes until set and cut them into chunks.\n3. Brown the onion slowly 10 minutes, add the garlic, ginger, turmeric, chili powder, coriander and garam masala for 30 seconds, then the tomato. Cook 8 minutes until thick.\n4. Add a splash of water, the peas and the eggs and simmer 5 minutes, spooning sauce over them.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk. Cook your vegetable.\n6. Cool the curry uncovered 10 minutes, then pack eggs and sauce with the rice and vegetable.\n7. Keep the cilantro and lemon for serving.\n8. Storage: fridge 3 days. This is a 3-day batch. Do not freeze it: frozen egg white turns rubbery and weeps water.\n9. Reheat: halve the eggs first (a whole egg can burst in the microwave), then microwave covered 2 minutes, stirring halfway, until steaming hot.",
 "makes": 3,
 "season": "Turmeric, chili powder, coriander, garam masala, fresh ginger and salt. Lemon juice and cilantro at the end.",
 "note": "Hard-boiled eggs simmered in a spiced tomato masala, a home-cooking staple across India and Pakistan. The eggs are fully cooked before they go in, so they reheat without turning rubbery."
},
{
 "id": "chinese-tomato-egg-scramble-rice-prep",
 "title": "Chinese Tomato & Egg Scramble over Rice", "batchQ": 1,
 "slot": "lunch",
 "protein": "Egg white raw",
 "carb": "White rice cooked|Brown rice cooked",
 "produce": "Tomato raw",
 "fat": "Avocado oil|Sesame oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo"
 ],
 "extras": [
  [
   "Egg whole raw",
   100
  ],
  [
   "Soy sauce",
   6
  ]
 ],
 "method": "1. Beat the eggs and egg whites with a pinch of salt and soft-scramble them in hot oil until just set, then tip them out. 2. Stir-fry the garlic and scallion, add the tomato wedges with a pinch of sugar and cook until they collapse into a sauce. 3. Add the soy sauce and a splash of water, return the eggs and fold together. 4. Serve over the rice.",
 "prepMethod": "1. Equipment: a wok or large skillet, a bowl, a pot for rice, a sheet tray, and 3 containers.\n2. Beat the eggs and whites with a pinch of salt and scramble them in hot oil, pulling them off while still a little wet. They finish cooking when you reheat, which keeps them soft.\n3. Stir-fry the garlic, add the tomato wedges with a pinch of sugar, and cook 4 to 5 minutes until they break down into a juicy sauce. Season with the soy sauce.\n4. Fold the eggs back in. The tomato sauce is what keeps them moist in the fridge.\n5. Cook the rice, spread it thin on a sheet tray, and get it into the fridge within 1 hour. Rice left to cool slowly is the classic food-poisoning risk.\n6. Cool 10 minutes uncovered, then pack it over the rice. Keep the scallion for serving.\n7. Storage: fridge 3 days. This is a 3-day batch and does not freeze: cooked egg turns rubbery and watery in the freezer.\n8. Reheat: microwave covered 90 seconds, stir, then 30 seconds more until steaming hot.",
 "makes": 3,
 "season": "Garlic, a pinch of sugar, soy sauce, white pepper and salt. Plenty of sliced scallion and a few drops of sesame oil on top.",
 "note": "One of the most-loved home dishes in China: sweet-sour tomato and soft egg over rice, ready in 15 minutes."
},
{
 "id": "spinach-lentil-cottage-cheese-lasagna-prep",
 "title": "Spinach, Lentil & Cottage Cheese Lasagna", "batchQ": 3,
 "slot": "dinner",
 "protein": "Cottage cheese 2% lowfat|Cottage cheese nonfat",
 "carb": "Whole wheat pasta cooked|^Pasta cooked",
 "produce": "Zucchini cooked",
 "fat": "Mozzarella part skim|Parmesan cheese shredded",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Lentils cooked",
   70
  ],
  [
   "Marinara sauce",
   130
  ],
  [
   "Spinach cooked",
   60
  ]
 ],
 "method": "1. Stir the lentils into the marinara. 2. Mix the cottage cheese with the wilted spinach, garlic, basil and black pepper. 3. Layer sauce, noodles, the sliced zucchini and the cottage cheese filling, repeat, and finish with sauce and the mozzarella. 4. Cover with foil and bake at 375F for 30 minutes, then uncovered 15 minutes until bubbling.",
 "prepMethod": "1. Equipment: an 8x8 or 9x9 baking dish, foil, a bowl, and 4 containers.\n2. Stir the cooked lentils into the marinara and simmer 5 minutes.\n3. Squeeze the wilted spinach dry, then mix it with the cottage cheese, garlic, basil, black pepper and a pinch of salt. Squeezing the spinach is what stops a watery lasagna.\n4. Slice the zucchini thin. Layer sauce, whole-wheat lasagna noodles (no-boil ones work), zucchini and the cottage cheese filling, repeat, and end with sauce and the mozzarella.\n5. Bake covered at 375F for 30 minutes, then uncovered 15 minutes until it bubbles at the edges.\n6. Rest 20 minutes so it sets and cuts cleanly, then cut 4 portions. Cool uncovered 20 more minutes before the lids go on, and have it in the fridge within 2 hours.\n7. Storage: fridge 4 days, freezer 3 months. Lasagna freezes very well.\n8. Reheat: microwave covered 2 to 3 minutes until steaming hot in the center, or 20 minutes at 350F under foil. Fresh basil on top.",
 "makes": 4,
 "season": "Garlic, dried oregano, basil, chili flakes, black pepper and salt. Fresh basil and a little grated parmesan on top.",
 "note": "Cottage cheese stands in for ricotta, with more protein per calorie and less fat, and lentils in the sauce make it feel meaty."
},
{
 "id": "high-protein-broccoli-mac-cheese-prep",
 "title": "High-Protein Broccoli Mac & Cheese", "batchQ": 2,
 "slot": "dinner",
 "protein": "Cottage cheese 2% lowfat|Cottage cheese nonfat",
 "carb": "Whole wheat pasta cooked|^Pasta cooked|Chickpea pasta cooked",
 "produce": "Broccoli cooked",
 "fat": "Cheese reduced-fat cheddar|Cheddar cheese",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Milk nonfat / skim",
   60
  ],
  [
   "Dijon mustard",
   4
  ]
 ],
 "method": "1. Cook the pasta and add the broccoli for the last 3 minutes. 2. Blend the cottage cheese, milk, mustard, garlic powder and smoked paprika until smooth. 3. Warm the sauce gently with the cheddar until melted, without boiling. 4. Toss with the pasta and broccoli.",
 "prepMethod": "1. Equipment: a large pot, a blender, a sheet tray, and 4 containers.\n2. Cook the pasta 1 minute short of done and add the broccoli for the last 3 minutes. Drain, keeping a cup of the cooking water.\n3. Blend the cottage cheese, milk, mustard, garlic powder, smoked paprika and a pinch of salt until completely smooth.\n4. Warm it in the empty pot over low heat and stir in the cheddar until melted. Keep it below a simmer or it turns grainy.\n5. Toss in the pasta and broccoli and loosen with the cooking water. Make it saucier than you want to eat it, because the pasta drinks the sauce overnight.\n6. Spread it on the tray to cool 10 minutes, pack 4 containers, and have them in the fridge within 1 hour.\n7. Storage: fridge 4 days. It can be frozen for 1 month, but cheese sauces go a little grainy after thawing, so the fridge is better.\n8. Reheat: add a splash of milk or water, cover, and microwave 2 minutes, stirring halfway, until steaming hot.",
 "makes": 4,
 "season": "Dijon, smoked paprika, garlic powder, black pepper and salt. Hot sauce or chives on top.",
 "note": "Blended cottage cheese makes a smooth cheese sauce with far more protein and far less fat than the boxed kind."
},
{
 "id": "carrot-cake-protein-overnight-oats-prep",
 "title": "Carrot Cake Protein Overnight Oats", "batchQ": 3,
 "slot": "breakfast",
 "protein": "Greek yogurt plain nonfat|Skyr plain nonfat",
 "carb": "Oats dry \\(raw\\)",
 "produce": "Pineapple raw",
 "fat": "Walnuts|Pecans",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Carrots raw",
   50
  ],
  [
   "Milk nonfat / skim",
   100
  ]
 ],
 "method": "1. Stir the oats, grated carrot, cinnamon, nutmeg and a pinch of salt into the milk and the yogurt or skyr. 2. Cover and refrigerate overnight. 3. Top with the pineapple and the walnuts or pecans in the morning.",
 "prepMethod": "1. Equipment: a large bowl, a box grater, and 4 jars with lids.\n2. Finely grate the carrot. Mix the oats, carrot, cinnamon, nutmeg, vanilla and a pinch of salt into the milk and the yogurt or skyr.\n3. Divide between 4 jars and refrigerate. The oats soften and thicken overnight.\n4. Keep the walnuts or pecans in a separate bag and the pineapple in its own tub, and add both in the morning so the nuts stay crunchy.\n5. Storage: fridge 3 days after you make them. Do not freeze.\n6. Reheat: eat cold, or warm 60 to 90 seconds, stirring halfway.",
 "makes": 4,
 "season": "Cinnamon, nutmeg, vanilla, a pinch of salt, a few raisins, and a little maple syrup if you like it sweeter.",
 "note": "Carrot cake flavors in a breakfast jar, with Greek yogurt carrying the protein."
},
{
 "id": "vegan-black-forest-overnight-oats-prep",
 "title": "Vegan Black Forest Cherry & Cocoa Overnight Oats", "batchQ": 3,
 "slot": "breakfast",
 "protein": "Pea & rice protein powder|Pea protein isolate powder",
 "carb": "Oats dry \\(raw\\)",
 "produce": "Cherries sweet raw",
 "fat": "Almonds|Chia seeds",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Almond milk unsweetened",
   220
  ],
  [
   "Cocoa powder unsweetened",
   8
  ],
  [
   "Chia seeds",
   10
  ]
 ],
 "method": "1. Whisk the protein powder and cocoa into the almond milk until smooth. 2. Stir in the oats, chia and a pinch of salt. 3. Fold in the cherries, cover and refrigerate overnight. 4. Top with the chopped almonds.",
 "prepMethod": "1. Equipment: a bowl, a whisk, and 4 jars with lids.\n2. Whisk the protein powder, cocoa, vanilla and a pinch of salt into the almond milk until there are no lumps.\n3. Stir in the oats and chia, then fold in the cherries. Frozen pitted cherries work and thaw into the jar overnight.\n4. Divide between 4 jars and refrigerate at least 4 hours.\n5. Keep the almonds separate and add them when you eat it.\n6. Storage: fridge 3 days after you make them. Do not freeze.\n7. Reheat: eat cold, or warm 60 to 90 seconds and stir. Add a splash of almond milk if it has thickened.",
 "makes": 4,
 "season": "Cocoa, vanilla, a pinch of salt and a pinch of cinnamon. A few dark chocolate shavings on top if you have them.",
 "note": "Chocolate and cherry, the cake flavors, in a jar with a full serving of plant protein."
},
{
 "id": "lemon-blueberry-baked-protein-oats-prep",
 "title": "Lemon Blueberry Baked Protein Oats", "batchQ": 3,
 "slot": "breakfast",
 "protein": "Greek yogurt plain nonfat|Skyr plain nonfat",
 "carb": "Oats dry \\(raw\\)",
 "produce": "Blueberries raw",
 "fat": "Almonds|Walnuts",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Egg whole raw",
   50
  ],
  [
   "Egg white raw",
   60
  ],
  [
   "Milk nonfat / skim",
   60
  ]
 ],
 "method": "1. Whisk the egg, egg whites, yogurt or skyr, milk, maple syrup, lemon zest, vanilla, baking powder and a pinch of salt. 2. Stir in the oats and fold in the blueberries. 3. Pour into a baking dish, scatter over the chopped almonds or walnuts and bake at 350F for 30 to 35 minutes until set. 4. Cool and cut into squares.",
 "prepMethod": "1. Equipment: an 8x8 baking dish, parchment, a large bowl, and 4 containers.\n2. Heat the oven to 350F and line the dish.\n3. Whisk the egg, egg whites, yogurt or skyr, milk, maple syrup, lemon zest, vanilla, 1 tsp baking powder and a pinch of salt. Stir in the oats and rest 10 minutes so they soak up the liquid.\n4. Fold in the blueberries (straight from frozen is fine), spread it in the dish and scatter the chopped almonds or walnuts over.\n5. Bake 30 to 35 minutes until the middle is set and springs back.\n6. Cool in the dish 20 minutes, cut 4 squares, and let them cool fully uncovered before packing so they do not go soggy.\n7. Storage: fridge 4 days, freezer 3 months wrapped one by one.\n8. Reheat: microwave 45 to 60 seconds, or eat cold. From frozen, 90 seconds. A spoon of yogurt and a squeeze of lemon on top.",
 "makes": 4,
 "season": "Lemon zest, vanilla, a pinch of salt and cinnamon. A drizzle of maple syrup if you want it sweeter.",
 "note": "Blueberry muffin flavors in a baked oat square. It sets firm enough to eat cold from the container or warm."
},
{
 "id": "roasted-red-pepper-cottage-cheese-egg-bites-prep",
 "title": "Roasted Red Pepper & Cottage Cheese Egg Bites", "batchQ": 2,
 "slot": "breakfast",
 "protein": "Egg white raw|Egg whole raw",
 "carb": "Whole wheat bread|Rye bread|English muffin",
 "produce": "Strawberries raw|Blueberries raw|Orange raw",
 "fat": "Feta cheese|Mozzarella part skim",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Cottage cheese 2% lowfat",
   80
  ],
  [
   "Egg whole raw",
   50
  ],
  [
   "Bell pepper cooked",
   60
  ]
 ],
 "method": "1. Blend the egg, egg whites and cottage cheese with salt and pepper until smooth. 2. Divide the chopped roasted pepper between muffin cups and pour the egg mix over. 3. Top with the cheese and bake in a water bath at 300F for 25 to 30 minutes until just set. 4. Serve with the toast and the strawberries, blueberries or orange.",
 "prepMethod": "1. Equipment: a 12-cup silicone muffin tray (or a greased metal one), a blender, a roasting tin for a water bath, and 3 containers.\n2. Heat the oven to 300F. Blend the egg, egg whites, cottage cheese, salt and pepper 30 seconds until completely smooth. Blending is what gives the velvety texture.\n3. Chop the roasted peppers and divide them between the cups. Pour the egg mix over and top with the cheese.\n4. Set the tray in the tin, pour hot water around it 1 inch deep, and bake 25 to 30 minutes until the centers are just set. Low heat and steam keep them tender.\n5. Cool 10 minutes, pop them out, and let them cool fully on a rack before packing.\n6. Keep the bread and the fruit (strawberries, blueberries or an orange) separate, and toast the bread fresh.\n7. Storage: fridge 3 days. This is a 3-day recipe: egg bites can be frozen, but the egg white turns rubbery and weeps water when thawed.\n8. Reheat: microwave 45 to 60 seconds until hot in the center.",
 "makes": 3,
 "season": "Salt, black pepper, a pinch of smoked paprika, and hot sauce or chives on top.",
 "note": "The coffee-shop egg bites, made at home for a fraction of the price. Blending in cottage cheese is what makes them smooth."
},
{
 "id": "savory-grits-bowls-sage-chicken-spinach-prep",
 "title": "Savory Grits Breakfast Bowls with Sage Chicken & Spinach", "batchQ": 2,
 "slot": "breakfast",
 "protein": "Ground chicken breast 98% lean cooked|Turkey ground 93/7 cooked",
 "carb": "Grits cooked",
 "produce": "Bell pepper cooked|Tomato raw",
 "fat": "Olive oil|Butter salted",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Spinach cooked",
   40
  ],
  [
   "Cheese reduced-fat cheddar",
   15
  ],
  [
   "Hot sauce cayenne",
   8
  ]
 ],
 "method": "1. Brown the ground chicken with sage, fennel seed, black pepper, garlic and a pinch of chili flakes. 2. Cook the grits in water with a pinch of salt and stir in the cheddar. 3. Wilt the spinach and cook the peppers. 4. Spoon the grits into a bowl, top with the chicken, spinach and peppers, and finish with hot sauce.",
 "prepMethod": "1. Equipment: a pot, a large skillet, a sheet tray, and 4 containers.\n2. Brown the ground chicken in a little olive oil with dried sage, crushed fennel seed, black pepper, garlic, a pinch of chili flakes and salt, breaking it up. Sage, fennel and pepper are the breakfast-sausage flavor, and the herbs help it taste fresh on day 3.\n3. Cook the grits in water with a pinch of salt, whisking, until thick. Stir in the cheddar (and the butter, if your plan lists it), then spread them on the tray so they cool fast, and get them into the fridge within 1 hour.\n4. Wilt the spinach in the same pan, then cook the peppers (or keep a tomato whole to slice fresh).\n5. Cool the chicken uncovered 10 minutes, then pack grits, chicken, spinach and peppers into 4 containers.\n6. Keep the hot sauce and any fresh tomato separate for serving.\n7. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Freezes 3 months if you want to stretch it. Grits set firm in the fridge, which is normal.\n8. Reheat: add 2 tablespoons of water, cover, microwave 90 seconds, whisk the grits smooth, then 30 to 60 seconds more until steaming hot.",
 "makes": 4,
 "season": "Dried sage, fennel seed, black pepper, garlic, chili flakes and salt. Hot sauce and sliced scallion on top.",
 "note": "A Southern breakfast bowl: cheesy grits under lean chicken seasoned like a breakfast sausage. Grits reheat smooth with a splash of water, so it tastes freshly made on day 3."
},
{
 "id": "vegan-tofu-chorizo-potato-breakfast-bowls-prep",
 "title": "Vegan Tofu Chorizo & Potato Breakfast Bowls", "batchQ": 2,
 "slot": "breakfast",
 "protein": "Tofu firm",
 "carb": "Potato baked flesh|Sweet potato baked",
 "produce": "Bell pepper cooked|Spinach cooked|Kale cooked",
 "fat": "Avocado raw|Avocado oil",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian",
  "ovo",
  "vegan"
 ],
 "extras": [
  [
   "Black beans cooked",
   50
  ],
  [
   "^Salsa$",
   40
  ],
  [
   "Onion raw",
   30
  ]
 ],
 "method": "1. Crumble the tofu and cook it in a hot pan with smoked paprika, chipotle powder, cumin, oregano, garlic and a splash of vinegar until browned and crumbly. 2. Roast the diced potato at 425F for 25 minutes until crisp. 3. Warm the beans and your vegetable. 4. Pile it all in a bowl and top with salsa and avocado.",
 "prepMethod": "1. Equipment: a sheet pan, a large skillet, and 4 containers.\n2. Dice the potatoes, toss with a little oil, salt and smoked paprika, and roast at 425F for 25 minutes until the edges are crisp.\n3. Crumble the pressed tofu into the hot pan and cook 10 minutes until dry and browned, then add smoked paprika, chipotle powder, cumin, oregano, garlic and a splash of cider vinegar. The vinegar and spice mix is the chorizo flavor, and it keeps the tofu tasting bold on day 4.\n4. Cook the onion and your vegetable (peppers, spinach or kale), then warm the black beans.\n5. Cool everything uncovered on the tray 10 minutes, then pack potatoes, tofu, beans and vegetable into 4 containers.\n6. Keep the salsa and avocado separate and add them after reheating.\n7. Storage: fridge 4 days, freezer 2 months. The potatoes soften a little once frozen.\n8. Reheat: microwave 2 minutes until steaming hot, or 5 minutes in the air fryer to crisp the potatoes again.",
 "makes": 4,
 "season": "Smoked paprika, chipotle powder, cumin, oregano, garlic, cider vinegar and salt. Lime and cilantro on top.",
 "note": "Chorizo flavor from spices and vinegar, on crumbled tofu with crispy potatoes. Savory, filling, and fully plant-based."
},
{
 "id": "buffalo-chicken-yogurt-dip-celery-prep",
 "title": "Buffalo Chicken Yogurt Dip with Celery", "batchQ": 3,
 "slot": "snack",
 "protein": "Chicken breast cooked",
 "produce": "Celery raw|Carrots raw|Cucumber raw",
 "diets": [
  "omnivore"
 ],
 "extras": [
  [
   "Greek yogurt plain nonfat",
   60
  ],
  [
   "Hot sauce cayenne",
   15
  ],
  [
   "Cheese reduced-fat cheddar",
   10
  ]
 ],
 "method": "1. Shred the cooked chicken. 2. Stir it into the yogurt with the hot sauce, garlic powder, a little of the cheddar and a squeeze of lemon. 3. Top with the rest of the cheddar and eat it with the celery sticks.",
 "prepMethod": "1. Equipment: a pot, two forks, a bowl, and 4 small containers.\n2. Poach the chicken breasts in salted water 15 to 18 minutes until 165F, cool them 10 minutes, and shred.\n3. Stir the chicken into the yogurt with the hot sauce, garlic powder, chives and the cheddar. The vinegar in the hot sauce keeps it tasting sharp all week.\n4. Pack the dip and cut the celery into sticks in its own container, so the celery stays crisp.\n5. Storage: fridge 3 days after cooking, so a batch cooked Sunday is good through Wednesday. Do not freeze the finished dip; plain shredded chicken freezes 3 months if you want to stretch it.\n6. Reheat: none. Eat it cold, or warm the dip 45 seconds if you like it hot.",
 "makes": 4,
 "season": "Cayenne pepper hot sauce, garlic powder, chives, a squeeze of lemon, and black pepper.",
 "note": "Game-day buffalo dip made with Greek yogurt in place of cream cheese and ranch, so it is mostly protein."
},
{
 "id": "chocolate-greek-yogurt-protein-pudding-prep",
 "title": "Chocolate Greek Yogurt Protein Pudding with Raspberries", "batchQ": 3,
 "slot": "snack",
 "protein": "Greek yogurt plain nonfat|Skyr plain nonfat",
 "produce": "Raspberries raw|Strawberries raw",
 "diets": [
  "omnivore",
  "pescatarian",
  "vegetarian"
 ],
 "extras": [
  [
   "Cocoa powder unsweetened",
   6
  ],
  [
   "Micellar casein powder",
   10
  ]
 ],
 "method": "1. Whisk the cocoa, casein, vanilla, a pinch of salt and sweetener to taste into the yogurt until smooth and thick. 2. Spoon it into a cup and top with the raspberries.",
 "prepMethod": "1. Equipment: a bowl, a whisk, and 4 small jars or tubs with lids.\n2. Whisk the cocoa, casein powder, vanilla, a pinch of salt and sweetener to taste into the yogurt until smooth. The casein thickens it into a real pudding texture in the fridge.\n3. Divide it between the jars. Keep the raspberries in their own tub so they do not bleed into the pudding.\n4. Storage: fridge 4 days. Do not freeze.\n5. Reheat: none. Eat it cold.",
 "makes": 4,
 "season": "Cocoa, vanilla, a pinch of salt, and a little maple syrup or sweetener to taste. A pinch of instant espresso makes it taste more chocolatey.",
 "note": "Tastes like chocolate mousse and is mostly protein. Casein is the slow-digesting milk protein, which makes this a good evening snack."
},
{
 "id": "smoky-seitan-jerky-bites-veggie-sticks-prep",
 "title": "Smoky Seitan Jerky Bites with Veggie Sticks", "batchQ": 3,
 "slot": "snack",
 "protein": "Seitan",
 "produce": "Carrots raw|Cucumber raw|Bell pepper red raw|Snap peas cooked",
 "diets": [
  "vegan",
  "ovo"
 ],
 "extras": [
  [
   "Soy sauce",
   8
  ]
 ],
 "method": "1. Slice the seitan thin. 2. Toss it with the soy sauce, smoked paprika, garlic powder, black pepper and a few drops of liquid smoke. 3. Bake on a rack at 275F for 35 to 45 minutes, turning once, until dry and chewy. 4. Eat with the veggie sticks.",
 "prepMethod": "1. Equipment: a sheet pan with a wire rack, parchment, a bowl, and 4 small containers.\n2. Slice the seitan as thin as you can. Toss it with the soy sauce, smoked paprika, garlic powder, black pepper, a pinch of sugar and a few drops of liquid smoke, and marinate 20 minutes.\n3. Lay the slices on the rack and bake at 275F for 35 to 45 minutes, turning once, until dry to the touch and chewy.\n4. Cool completely on the rack before packing, or trapped steam makes them soft.\n5. Cut the veggie sticks and pack them alongside.\n6. Storage: fridge 4 days. A folded paper towel in the container soaks up moisture and keeps the chew.\n7. Reheat: none. Eat cold or at room temperature.",
 "makes": 4,
 "season": "Smoked paprika, garlic powder, black pepper, soy sauce, liquid smoke, and chili flakes for heat.",
 "note": "Seitan is wheat protein, one of the leanest plant proteins there is, and baked low it turns chewy like jerky. It contains gluten."
},
{
 "id": "mexican-shrimp-cocktail-cups-prep",
 "title": "Mexican Shrimp Cocktail Cups", "batchQ": 2,
 "slot": "snack",
 "protein": "Shrimp cooked",
 "produce": "Cucumber raw|Tomato raw",
 "diets": [
  "omnivore",
  "pescatarian"
 ],
 "extras": [
  [
   "Pico de gallo",
   40
  ],
  [
   "Hot sauce cayenne",
   8
  ]
 ],
 "method": "1. Chop the cooked shrimp. 2. Stir it with a spoon of ketchup, lime juice, hot sauce and a splash of cold water into a loose cocktail sauce. 3. Fold in the diced cucumber and the pico de gallo. 4. Eat it cold with a spoon.",
 "prepMethod": "1. Equipment: a pot, a bowl of ice water, a bowl, and 4 small jars with lids.\n2. Poach the shrimp in simmering salted water with a bay leaf and a squeeze of lime, 2 to 3 minutes until just pink, then straight into ice water. Bags of frozen cooked shrimp work too; thaw them in the fridge.\n3. Stir a spoon of ketchup per portion with lime juice, hot sauce and a splash of cold water into a loose sauce and toss the chopped shrimp through it. Sitting in the tangy sauce keeps the shrimp sweet and moist.\n4. Pack the shrimp and sauce in the jars. Keep the diced cucumber, pico de gallo and cilantro in their own tub and add them when you eat it, so they stay crisp.\n5. Storage: cooked shrimp is safe 3 days after cooking but best within 2, so for the last portion freeze plain cooked shrimp on cook day and thaw it in the fridge the night before.\n6. Reheat: none. Eat it cold.",
 "makes": 4,
 "season": "Lime juice, hot sauce, a pinch of salt, cilantro, and a little chopped jalapeno if you like heat.",
 "note": "The Mexican beach snack: cold shrimp in a tangy tomato-lime sauce. Shrimp is almost pure protein, so this is about as lean as a snack gets."
}
];
