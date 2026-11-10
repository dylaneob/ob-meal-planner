#!/usr/bin/env python3
"""
OB Meal Planner, food database builder.

Reads the raw USDA FoodData Central "SR Legacy" CSV export and produces:
  app/data/foods.js   -> window.OB_FOODS  (curated foods, per-100g nutrients + portions)
  app/data/dri.js     -> window.OB_DRI    (daily reference targets, male/female)
  data-build/build_report.csv -> for human review of which USDA food got matched

Why this exists: the whole point of the tool is REAL numbers. Every food below is
matched to an actual USDA record. Nothing is invented. Run `python3 build_foods.py`
to regenerate after editing the WHITELIST.
"""

import csv, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw", "FoodData_Central_sr_legacy_food_csv_2018-04")
APP_DATA = os.path.normpath(os.path.join(HERE, "..", "app", "data"))
os.makedirs(APP_DATA, exist_ok=True)
csv.field_size_limit(min(sys.maxsize, 2**31 - 1))

# ---------------------------------------------------------------------------
# 1. Nutrient map:  our_key -> (primary USDA nutrient_id, [fallback ids], unit)
#    Units are the USDA storage unit; the app + DRI targets use these same units.
# ---------------------------------------------------------------------------
NUTRIENTS = {
    "kcal":        (1008, [2048, 2047], "kcal"),
    "protein_g":   (1003, [], "g"),
    "fat_g":       (1004, [], "g"),
    "carb_g":      (1005, [], "g"),
    "fiber_g":     (1079, [2033], "g"),
    "sugar_g":     (2000, [1063], "g"),
    "satfat_g":    (1258, [], "g"),
    "mufa_g":      (1292, [], "g"),
    "pufa_g":      (1293, [], "g"),
    "transfat_g":  (1257, [], "g"),
    "cholesterol_mg": (1253, [], "mg"),
    # minerals
    "calcium_mg":   (1087, [], "mg"),
    "iron_mg":      (1089, [], "mg"),
    "magnesium_mg": (1090, [], "mg"),
    "phosphorus_mg":(1091, [], "mg"),
    "potassium_mg": (1092, [], "mg"),
    "sodium_mg":    (1093, [], "mg"),
    "zinc_mg":      (1095, [], "mg"),
    "copper_mg":    (1098, [], "mg"),
    "manganese_mg": (1101, [], "mg"),
    "selenium_ug":  (1103, [], "ug"),
    "iodine_ug":    (1100, [], "ug"),
    # vitamins
    "vit_a_ug":     (1106, [], "ug"),   # RAE
    "vit_c_mg":     (1162, [], "mg"),
    "vit_e_mg":     (1109, [], "mg"),
    "vit_d_ug":     (1114, [], "ug"),   # IU handled separately below
    "vit_k_ug":     (1185, [], "ug"),
    "thiamin_mg":   (1165, [], "mg"),
    "riboflavin_mg":(1166, [], "mg"),
    "niacin_mg":    (1167, [], "mg"),
    "pantothenic_mg":(1170, [], "mg"),
    "vit_b6_mg":    (1175, [], "mg"),
    "folate_ug":    (1177, [1190], "ug"),
    "vit_b12_ug":   (1178, [], "ug"),
    "choline_mg":   (1180, [], "mg"),
    # essential amino acids (g per 100g, from USDA) — power the day-level amino-acid breakdown + protein-
    # quality scoring (Dylan: don't build a day on low-quality proteins). NOT counted as micronutrient coverage.
    "histidine_g":    (1221, [], "g"),
    "isoleucine_g":   (1212, [], "g"),
    "leucine_g":      (1213, [], "g"),
    "lysine_g":       (1214, [], "g"),
    "methionine_g":   (1215, [], "g"),
    "cystine_g":      (1216, [], "g"),   # + methionine = sulfur AA (SAA) scoring
    "phenylalanine_g":(1217, [], "g"),
    "tyrosine_g":     (1218, [], "g"),   # + phenylalanine = aromatic AA (AAA) scoring
    "threonine_g":    (1211, [], "g"),
    "tryptophan_g":   (1210, [], "g"),
    "valine_g":       (1219, [], "g"),
}
# amino-acid keys are protein-QUALITY data, not micronutrient coverage — excluded from the data_quality %.
AA_KEYS = {"histidine_g","isoleucine_g","leucine_g","lysine_g","methionine_g","cystine_g",
           "phenylalanine_g","tyrosine_g","threonine_g","tryptophan_g","valine_g"}
# fatty-acid component ids used to derive omega-3 / omega-6 (grams per 100g)
FA = {
    "ala": (1404, 1270),   # 18:3 n-3 ALA  (fallback: 18:3 undifferentiated)
    "la":  (1316, 1269),   # 18:2 n-6 LA   (fallback: 18:2 undifferentiated)
    "aa":  (1406, 1271),   # 20:4 n-6 AA   (fallback: 20:4 undifferentiated)
    "epa": (1278, None),   # 20:5 n-3
    "dha": (1272, None),   # 22:6 n-3
    "dpa": (1280, None),   # 22:5 n-3
    "gla": (1321, None),   # 18:3 n-6
    "sda": (1276, None),   # 18:4 n-3 (stearidonic), minor
    "oleic": (1268, 1315), # 18:1 = oleic acid (omega-9 MUFA); fallback 18:1 c
}
VIT_D_IU = 1110  # convert IU -> ug with *0.025 when 1114 is missing

# All nutrient ids we care to read while streaming the big file.
WANTED_IDS = set()
for prim, fbs, _ in NUTRIENTS.values():
    WANTED_IDS.add(prim); WANTED_IDS.update(fbs)
for prim, fb in FA.values():
    WANTED_IDS.add(prim)
    if fb: WANTED_IDS.add(fb)
WANTED_IDS.add(VIT_D_IU)
WANTED_IDS = {str(i) for i in WANTED_IDS}

# ---------------------------------------------------------------------------
# 2. Curated whitelist. Each entry:
#      name      display name (coach-facing)
#      cat       our UI category
#      q         required keywords (ALL must appear in the USDA description, lowercased)
#      not       excluded keywords (skip match if ANY present)        [optional]
#      prefer    keyword that, if present, is preferred                [optional]
#      fdc       pin an exact USDA fdc_id, overrides search            [optional]
#    Matching picks the SHORTEST description that satisfies q/not, preferring `prefer`.
# ---------------------------------------------------------------------------
WHITELIST = [
    # ---- Protein (meat / poultry / plant) ----
    {"name":"Chicken breast, cooked","cat":"Protein","q":["chicken","breast","meat only","roasted"],"not":["skin","fried","stewing","canned","with"],"drop_portions":["1 unit (yield from 1 lb ready-to-cook chicken)"]},
    # RAW weight for clients who pre-portion raw (a client's 7oz freezer bags). SR Legacy 171077. The auto-drafter
    # never picks raw meat (allowedFoods skips it), plans stay on cooked weights; a coach adds this by hand.
    # Cross-check vs the cooked entry: 198g raw x 22.5/31.02 protein = 144g roasted, and 238 kcal either way.
    {"name":"Chicken breast, raw","cat":"Protein","q":["chicken","breast","skinless","boneless","meat only","raw"],"not":["added solution","turkey","quail","duck","pheasant"]},
    {"name":"Chicken thigh, cooked","cat":"Protein","q":["chicken","thigh","meat only","roasted"],"not":["skin","fried"]},
    {"name":"Chicken, ground, cooked","cat":"Protein","q":["chicken","ground","crumbles","cooked"]},
    {"name":"Turkey breast, roasted","cat":"Protein","q":["turkey","breast","meat only","roasted"],"not":["skin","prepackaged","sliced"]},
    # lean ground meat only, never below 93/7 (Dylan rule). 85/15 & 90/10 beef removed.
    # form set explicitly: SR's "pan-broiled crumbles" is cooked, but the keyword sniff above misses "pan-broiled"
    {"name":"Turkey, ground 93/7, cooked","cat":"Protein","form":"cooked","fdc":"172851","q":["turkey","ground","93%"]},
    # 2026-10-08 (a client, Cancun): she weighs ground meat raw, before cooking (SR 172850, 93% lean raw)
    {"name":"Turkey, ground 93/7, raw","cat":"Protein","form":"raw","fdc":"172850","q":["turkey","ground","93%","raw"]},
    {"name":"Beef, ground 93/7, cooked","cat":"Protein","q":["beef","ground","93%","crumbles","cooked"]},
    {"name":"Beef sirloin, lean, grilled","cat":"Protein","q":["beef","top sirloin","separable lean only","grilled"]},
    {"name":"Ribeye steak, cooked","cat":"Protein","q":["rib eye","separable lean and fat","all grades","broiled"],"not":["raw","roast"],"drop_portions":["1 steak (yield from 295 g raw meat)"]},
    {"name":"Breakfast sausage patty, turkey & pork","cat":"Protein","q":["sausage","turkey and pork","patty","cooked"],"drop_portions":["1 oz cooked, yield"]},
    {"name":"Beef tenderloin, lean, roasted","cat":"Protein","q":["beef","tenderloin","separable lean only","roasted"]},
    {"name":"Beef, top round, lean, cooked","cat":"Protein","q":["beef","round","top round","separable lean only","roasted"]},
    {"name":"Pork tenderloin, lean, roasted","cat":"Protein","q":["pork","tenderloin","separable lean only","roasted"],"drop_portions":["1 piece, cooked, excluding refuse (yield from 1 "]},
    {"name":"Pork, ground, cooked","cat":"Protein","q":["pork","ground","cooked"]},
    {"name":"Pork chop, lean, cooked","cat":"Protein","q":["pork","loin","center","chops","separable lean only","cooked"]},
    {"name":"Bacon, cooked","cat":"Protein","q":["pork","bacon","cooked"],"not":["canadian","turkey","meatless"]},
    {"name":"Ham, extra lean","cat":"Protein","q":["ham"],"fdc":173881},
    {"name":"Bison, ground, cooked","cat":"Protein","q":["bison","ground","cooked"]},
    {"name":"Lamb, ground, cooked","cat":"Protein","q":["lamb","ground","cooked","broiled"],"drop_portions":["1 unit, cooked (yield from 1 lb raw meat)"]},
    {"name":"Venison, ground, cooked","cat":"Protein","q":["game meat","deer","ground","cooked"]},
    # "Tofu, firm" moved to MANUAL_FOODS (2026-09-24): re-based from SR 172475 (144 kcal, a pressed density) to the
    # label of the tofu clients actually buy. It keeps name + id "172475" so templates and saved plans resolve.
    {"name":"Tempeh","cat":"Protein","q":["tempeh"],"not":["cooked"]},
    {"name":"Edamame, cooked","cat":"Protein","form":"cooked","q":["edamame","frozen","prepared"]},   # SR "frozen, prepared" = cooked
    # SR Legacy 168147 "Vital wheat gluten" is the DRY FLOUR (370 kcal, 75g protein /100g). It used to be named
    # "Seitan / wheat gluten" and got the Protein fallback portions (3 oz / 4 oz), so plans served "Seitan 30g" while
    # counting flour: a client weighing 30g of store-bought seitan logs about a third of that protein. Renamed so no
    # "Seitan" regex can pick it; prepared seitan is its own manual entry below. SR has no portion rows for it, so
    # the measures are label-declared: 1/4 cup = 30g (Bob's Red Mill, bobsredmill.com + USDA FDC Branded 824272),
    # 1 tbsp = 9g (King Arthur, USDA FDC Branded 2395735; Hodgson Mill's 4 tsp = 12g agrees). Values stay SR.
    {"name":"Vital wheat gluten (dry flour)","cat":"Protein","form":"dry","q":["vital wheat gluten"],
     "portions":[{"label":"1/4 cup","grams":30},{"label":"1 tbsp","grams":9}]},

    # ---- Seafood (omega-3) ----
    {"name":"Salmon, Atlantic farmed, cooked","cat":"Seafood","q":["salmon","atlantic","farmed","cooked","dry heat"]},
    {"name":"Salmon, Atlantic wild, cooked","cat":"Seafood","q":["salmon","atlantic","wild","cooked","dry heat"]},
    {"name":"Salmon, sockeye, cooked","cat":"Seafood","q":["salmon","sockeye","cooked","dry heat"]},
    {"name":"Salmon, pink, canned","cat":"Seafood","q":["salmon","pink","canned"],"not":["smoked"]},
    {"name":"Tuna, light, canned in water","cat":"Seafood","q":["tuna","light","canned in water","drained"]},
    {"name":"Tuna, yellowfin, cooked","cat":"Seafood","q":["tuna","yellowfin","cooked","dry heat"]},
    {"name":"Sardines, canned in oil","cat":"Seafood","q":["sardine","canned in oil","drained"]},
    {"name":"Mackerel, Atlantic, cooked","cat":"Seafood","q":["mackerel","atlantic","cooked","dry heat"]},
    {"name":"Shrimp, cooked","cat":"Seafood","q":["shrimp","cooked"],"not":["breaded","imitation","canned"]},
    {"name":"Cod, Atlantic, cooked","cat":"Seafood","q":["cod","atlantic","cooked","dry heat"]},
    {"name":"Tilapia, cooked","cat":"Seafood","q":["tilapia","cooked","dry heat"]},
    {"name":"Trout, rainbow, farmed, cooked","cat":"Seafood","q":["trout","rainbow","farmed","cooked","dry heat"]},
    {"name":"Halibut, cooked","cat":"Seafood","q":["halibut","atlantic","pacific","cooked","dry heat"]},
    {"name":"Scallops, cooked","cat":"Seafood","q":["mollusks","scallop","cooked"],"not":["breaded","imitation","squash"]},
    {"name":"Oysters, cooked","cat":"Seafood","q":["oyster","eastern","cooked","moist heat"],"not":["canned","breaded"]},
    {"name":"Crab, Alaska king, cooked","cat":"Seafood","q":["crab","alaska king","cooked","moist heat"]},
    {"name":"Mussels, cooked","cat":"Seafood","q":["mussel","blue","cooked","moist heat"]},

    # ---- Eggs & Dairy ----
    {"name":"Egg, whole, cooked","cat":"Eggs & Dairy","q":["egg","whole","cooked","hard-boiled"]},
    {"name":"Egg, whole, raw","cat":"Eggs & Dairy","q":["egg","whole","raw","fresh"]},
    {"name":"Egg white, raw","cat":"Eggs & Dairy","q":["egg","white","raw","fresh"]},
    # SR Legacy has only "1 container" (170 g) for this food, so plans printed "1¾ containers" and "¼ container". A cup:
    # USDA FoodData Central Branded Foods (2025-04 release, local copy on T7, read 2026-09-24), nonfat plain Greek
    # yogurt labels: 155 say "3/4 cup" = 170 g and 79 say "1 cup" = 227 g (Chobani, Stonyfield and store brands).
    {"name":"Greek yogurt, plain, nonfat","cat":"Eggs & Dairy","q":["yogurt","greek","plain","nonfat"],"fdc":170894,
     "add_portions":[{"label":"1 cup","grams":227}]},
    {"name":"Greek yogurt, plain, whole","cat":"Eggs & Dairy","q":["yogurt","greek","plain","whole milk"]},
    {"name":"Yogurt, plain, low fat","cat":"Eggs & Dairy","q":["yogurt","plain","low fat"]},
    {"name":"Cottage cheese, 2% lowfat","cat":"Eggs & Dairy","q":["cheese","cottage","lowfat","2%"],"not":["no sodium"]},
    {"name":"Cottage cheese, nonfat","cat":"Eggs & Dairy","q":["cheese","cottage","nonfat","uncreamed"]},
    {"name":"Milk, nonfat / skim","cat":"Eggs & Dairy","q":["milk","nonfat","fluid"],"not":["chocolate","dry","evaporated"]},
    {"name":"Milk, 2% reduced fat","cat":"Eggs & Dairy","q":["milk","reduced fat","2%","fluid"],"not":["chocolate"]},
    {"name":"Milk, whole","cat":"Eggs & Dairy","q":["milk","whole","3.25%"],"not":["chocolate"]},
    {"name":"Cheddar cheese","cat":"Eggs & Dairy","q":["cheese","cheddar"],"fdc":173414},
    {"name":"Mozzarella, part skim","cat":"Eggs & Dairy","q":["cheese","mozzarella","part-skim"],"not":["low-moisture, part-skim"]},
    {"name":"Parmesan, grated","cat":"Eggs & Dairy","q":["cheese","parmesan","grated"],"not":["reduced fat"]},
    {"name":"Feta cheese","cat":"Eggs & Dairy","q":["cheese","feta"]},
    {"name":"Butter, salted","cat":"Eggs & Dairy","q":["butter","salted"],"not":["whipped","light","unsalted"]},
    {"name":"Cream cheese","cat":"Eggs & Dairy","q":["cheese","cream"],"not":["fat free","low fat"]},

    # ---- Grains & Starches ----
    {"name":"Oats, dry (raw)","cat":"Grains & Starches","q":["oats","regular and quick","dry"],"not":["cooked","instant"]},
    {"name":"Oats, cooked (in water)","cat":"Grains & Starches","q":["oats"],"fdc":173905},
    {"name":"White rice, cooked","cat":"Grains & Starches","q":["rice","white","long-grain","regular","cooked"],"not":["instant","parboiled"]},
    {"name":"Brown rice, cooked","cat":"Grains & Starches","q":["rice","brown","long-grain","cooked"]},
    {"name":"Quinoa, cooked","cat":"Grains & Starches","q":["quinoa","cooked"]},
    {"name":"Pasta, cooked","cat":"Grains & Starches","q":["pasta","cooked","enriched"],"not":["whole","spinach","corn","protein","gluten","homemade","egg","vegetable"]},
    {"name":"Whole wheat pasta, cooked","cat":"Grains & Starches","q":["pasta","whole-wheat","cooked"]},
    {"name":"Whole wheat bread","cat":"Grains & Starches","q":["bread","whole-wheat","commercially"],"not":["toasted"]},
    {"name":"White bread","cat":"Grains & Starches","q":["bread","white","commercially"],"not":["toasted"]},
    {"name":"Flour tortilla","cat":"Grains & Starches","q":["tortillas","flour"],"not":["whole"]},
    {"name":"Corn tortilla","cat":"Grains & Starches","q":["tortillas","corn"],"not":["fried"]},
    # a client (Sep 2026) named these; USDA SR Legacy carries all four. Sourdough has no standalone SR record,
    # but USDA's "Bread, french or vienna" entry explicitly INCLUDES sourdough, so that is the honest match.
    # SR's only "slice" row for this bread is 139g (a slice off a large round loaf), so a sourdough sandwich
    # printed 278g of bread. Sandwich-loaf slice = 43g: median of 20 single-slice labels in USDA FoodData
    # Central branded data, 2026-09-24 (e.g. Walmart 45g, Whole Foods 40g, Flowers 43g, Safeway 40g).
    {"name":"Sourdough / French bread","cat":"Grains & Starches","q":["bread","french","vienna","includes sourdough"],"not":["toasted","whole wheat"],
     "portions":[{"label":"1 slice (sandwich loaf)","grams":43},{"label":"1 oz","grams":28.4}]},
    {"name":"Grits, cooked","cat":"Grains & Starches","q":["grits","white","cooked with water","without salt"],"not":["instant","yellow"]},
    # Arepa: Dylan's client names it a staple. USDA SR Legacy 168070 "Restaurant, Latino, arepa
    # (unleavened cornmeal bread)" 219 kcal / 5.5P / 37.1C / 2.6 fib / 5.4F per 100g (Atwater ratio 0.98).
    {"name":"Arepa (cornmeal bread)","cat":"Grains & Starches","q":["arepa"]},
    {"name":"Potato, baked, flesh","cat":"Grains & Starches","q":["potatoes","baked","flesh"],"not":["skin"]},
    {"name":"Sweet potato, baked","cat":"Grains & Starches","q":["sweet potato","cooked","baked","in skin"],"not":["without skin"]},
    # 2026-10-08, Mexico staples (Cancun client): yuca weighed raw and peeled (SR 169985); cream of rice is what her
    # Elev8 Creamy Rice pre-workout cereal is (SR 173900, dry)
    {"name":"Cassava (yuca), raw","cat":"Grains & Starches","form":"raw","fdc":"169985","q":["cassava","raw"]},
    {"name":"Cream of rice, dry","cat":"Grains & Starches","form":"dry","fdc":"173900","q":["cream of rice","dry"],
     "drop_portions":["0.25 cup (1 NLEA serving)"],"add_portions":[{"label":"1 cup","grams":180},{"label":"1 tbsp","grams":11}]},   # SR: 1/4 cup = 45 g
    # 2026-10-08 (a client): one weighing rule for a perfectionist, "weigh everything before cooking", so the
    # raw and dry forms her plan cooks; hand-only in the planner (client builds, never drafted)
    {"name":"Sweet potato, raw","cat":"Grains & Starches","form":"raw","fdc":"168482","q":["sweet potato","raw","unprepared"]},
    {"name":"Whole wheat pasta, dry","cat":"Grains & Starches","form":"dry","fdc":"169738","q":["pasta","whole-wheat","dry"]},
    {"name":"Bagel, plain","cat":"Grains & Starches","q":["bagels","plain"],"not":["toasted"]},
    {"name":"Couscous, cooked","cat":"Grains & Starches","q":["couscous","cooked"],"drop_portions":["1 cup, dry, yields","1 oz, dry, yields"]},
    {"name":"Rice cake, brown rice","cat":"Grains & Starches","q":["rice cakes","brown rice","plain"]},
    {"name":"English muffin","cat":"Grains & Starches","q":["english muffins","plain"],"not":["toasted"]},
    {"name":"Barley, cooked","cat":"Grains & Starches","q":["barley","pearled","cooked"]},
    {"name":"Popcorn, air-popped","cat":"Grains & Starches","q":["popcorn","air-popped"]},

    # ---- Legumes ----
    {"name":"Black beans, cooked","cat":"Legumes","q":["beans","black","mature seeds","cooked","boiled"],"not":["canned"]},
    {"name":"Chickpeas, cooked","cat":"Legumes","q":["chickpeas","mature seeds","cooked"],"not":["canned"]},
    {"name":"Lentils, cooked","cat":"Legumes","q":["lentils","mature seeds","cooked","boiled"],"not":["sprouted"]},
    {"name":"Kidney beans, cooked","cat":"Legumes","q":["beans","kidney","red","mature seeds","cooked"],"not":["canned"]},
    {"name":"Pinto beans, cooked","cat":"Legumes","q":["beans","pinto","mature seeds","cooked"],"not":["canned"]},
    {"name":"Navy beans, cooked","cat":"Legumes","q":["beans","navy","mature seeds","cooked"],"not":["canned"]},
    {"name":"Soybeans, cooked","cat":"Legumes","q":["soybeans","mature seeds","cooked"],"not":["green","sprouted"]},
    {"name":"Green peas, cooked","cat":"Legumes","q":["peas","green","cooked","boiled"],"not":["canned","split"]},
    {"name":"Hummus","cat":"Legumes","q":["hummus","commercial"]},
    {"name":"Refried beans, canned","cat":"Legumes","q":["refried beans","canned","traditional"]},

    # ---- Vegetables ----
    {"name":"Broccoli, cooked","cat":"Vegetables","q":["broccoli","cooked","boiled"],"not":["chinese","raab","leaves"]},
    {"name":"Broccoli, raw","cat":"Vegetables","q":["broccoli","raw"]},
    # FROZEN broccoli, weighed straight from the bag (SR Legacy 169968). Plans that say "air-fry it from frozen,
    # weigh it frozen" need the frozen record: "Broccoli, cooked" is FRESH broccoli boiled (35 vs 26 kcal/100g).
    {"name":"Broccoli florets, frozen","cat":"Vegetables","q":["broccoli","frozen","chopped","unprepared"],"fdc":169968},
    {"name":"Spinach, raw","cat":"Vegetables","q":["spinach","raw"]},
    {"name":"Spinach, cooked","cat":"Vegetables","q":["spinach","cooked","boiled"],"not":["canned"]},
    {"name":"Kale, cooked","cat":"Vegetables","q":["kale","cooked","boiled"]},
    {"name":"Asparagus, cooked","cat":"Vegetables","q":["asparagus","cooked","boiled"]},
    {"name":"Green beans, cooked","cat":"Vegetables","q":["beans","snap","green","cooked","boiled"],"not":["canned"]},
    {"name":"Carrots, cooked","cat":"Vegetables","q":["carrots","cooked","boiled","drained"],"not":["canned","frozen","raw"]},
    {"name":"Bell pepper, cooked","cat":"Vegetables","q":["peppers","sweet","red","cooked","boiled"],"not":["canned","frozen","sauce","green","hot"]},
    {"name":"Brussels sprouts, cooked","cat":"Vegetables","q":["brussels sprouts","cooked","boiled"]},
    {"name":"Cauliflower, cooked","cat":"Vegetables","q":["cauliflower","cooked","boiled"]},
    # 2026-10-09 (a client): riced cauliflower under her turkey bowl, weighed raw like the rest of her plan
    # (she avoids RAW cauliflower; the step cooks it); hand-only in the planner
    {"name":"Cauliflower, raw","cat":"Vegetables","form":"raw","fdc":"169986","q":["cauliflower","raw"],
     "drop_portions":["1 cup chopped (1/2\" pieces)"],"add_portions":[{"label":"1 cup chopped","grams":107}]},   # same SR weight, no size note
    {"name":"Carrots, raw","cat":"Vegetables","q":["carrots","raw"]},
    {"name":"Bell pepper, red, raw","cat":"Vegetables","q":["peppers","sweet","red","raw"]},
    {"name":"Cucumber, raw","cat":"Vegetables","q":["cucumber","with peel","raw"]},
    {"name":"Tomato, raw","cat":"Vegetables","q":["tomatoes","red","ripe","raw","year round"]},
    {"name":"Zucchini, cooked","cat":"Vegetables","q":["squash","summer","zucchini","cooked","boiled"]},
    # 2026-10-08, Mexico staples: nopales and chayote cooked (SR 169388, 170403), jicama raw (SR 170073)
    {"name":"Nopales, cooked","cat":"Vegetables","form":"cooked","fdc":"169388","q":["nopales","cooked","without salt"]},
    {"name":"Chayote, cooked","cat":"Vegetables","form":"cooked","fdc":"170403","q":["chayote","cooked","without salt"]},
    {"name":"Jicama, raw","cat":"Vegetables","fdc":"170073","q":["yambean","jicama","raw"]},
    {"name":"Zucchini, raw","cat":"Vegetables","form":"raw","fdc":"169291","q":["squash","summer","zucchini","raw"]},   # 2026-10-08, see sweet potato, raw
    {"name":"Mushrooms, cooked","cat":"Vegetables","q":["mushrooms","white","cooked","boiled"]},
    {"name":"Onion, raw","cat":"Vegetables","q":["onions","raw"],"not":["spring","welsh","young"]},
    {"name":"Romaine lettuce","cat":"Vegetables","q":["lettuce","cos or romaine","raw"]},
    {"name":"Cabbage, cooked","cat":"Vegetables","q":["cabbage","cooked","boiled"],"not":["red","savoy","chinese"]},
    {"name":"Sweet corn, cooked","cat":"Vegetables","q":["corn","sweet","yellow","cooked","boiled"],"not":["canned"]},
    {"name":"Beets, cooked","cat":"Vegetables","q":["beets","cooked","boiled"],"not":["canned","greens"]},
    {"name":"Butternut squash, baked","cat":"Vegetables","q":["squash","winter","butternut","cooked","baked"]},
    {"name":"Eggplant, cooked","cat":"Vegetables","q":["eggplant","cooked","boiled"]},
    {"name":"Celery, raw","cat":"Vegetables","q":["celery","raw"]},

    # ---- Fruits ----
    {"name":"Banana, raw","cat":"Fruits","q":["bananas","raw"]},
    {"name":"Apple, raw, with skin","cat":"Fruits","q":["apples","raw","with skin"]},
    {"name":"Blueberries, raw","cat":"Fruits","q":["blueberries","raw"],"not":["wild"]},
    {"name":"Strawberries, raw","cat":"Fruits","q":["strawberries","raw"]},
    {"name":"Raspberries, raw","cat":"Fruits","q":["raspberries","raw"]},
    {"name":"Orange, raw","cat":"Fruits","q":["oranges","raw","all commercial"]},
    {"name":"Grapes, raw","cat":"Fruits","q":["grapes","red or green","raw"]},
    # melon-ball measures are not how anyone portions a side of watermelon: 130 g printed "¾ cup, balls" (a client, 2026-10-03)
    {"name":"Watermelon, raw","cat":"Fruits","q":["watermelon","raw"],"drop_portions":["1 cup, balls","10 watermelon balls"]},
    {"name":"Pineapple, raw","cat":"Fruits","q":["pineapple","raw"]},
    {"name":"Mango, raw","cat":"Fruits","q":["mangos","raw"]},
    {"name":"Avocado, raw","cat":"Fruits","q":["avocados","raw","california"]},
    {"name":"Kiwifruit, raw","cat":"Fruits","q":["kiwifruit","green","raw"]},
    {"name":"Papaya, raw","cat":"Fruits","fdc":"169926","q":["papayas","raw"],"drop_portions":["1 fruit, small"]},   # 2026-10-08, Mexico staple; USDA's "small" fruit is a Hawaiian solo, a Mexican maradol weighs kilos
    {"name":"Pear, raw","cat":"Fruits","q":["pears","raw"]},
    {"name":"Peach, raw","cat":"Fruits","q":["peaches","raw"]},
    {"name":"Grapefruit, raw","cat":"Fruits","q":["grapefruit","raw","pink and red"]},
    {"name":"Cherries, sweet, raw","cat":"Fruits","q":["cherries","sweet","raw"],"drop_portions":["1 cup, with pits, yields"]},
    {"name":"Raisins","cat":"Fruits","q":["raisins","seedless"],"not":["golden"]},

    # ---- Nuts & Seeds ----
    {"name":"Almonds","cat":"Nuts & Seeds","q":["nuts","almonds"],"not":["roasted","oil","salt","blanched","butter","milk","honey"]},
    {"name":"Walnuts","cat":"Nuts & Seeds","q":["nuts","walnuts","english"],"drop_portions":["1 cup, in shell, edible yield (7 nuts)"]},
    # Brazil nuts: the richest food source of selenium by a distance (SR Legacy 170569). Added 2026-09-23 for
    # thyroid support, since the library had no selenium-dense food at all. DOSE IS A SAFETY ISSUE, NOT A
    # PREFERENCE: one nut can meet the daily requirement and a 30g handful can exceed the EFSA upper limit of
    # 255 ug/day (Lima 2019; EFSA 2023). app.js caps it at two nuts per serving in servingCeiling.
    {"name":"Brazil nuts","cat":"Nuts & Seeds","q":["nuts","brazilnuts","dried","unblanched"]},
    {"name":"Peanut butter, smooth","cat":"Nuts & Seeds","q":["peanut butter","smooth"],"not":["reduced fat","low sodium"]},
    {"name":"Peanuts, dry-roasted","cat":"Nuts & Seeds","q":["peanuts","all types","dry","roasted","without salt"]},
    {"name":"Almond butter","cat":"Nuts & Seeds","q":["almond butter","plain"],"not":["honey"]},
    {"name":"Cashews, raw","cat":"Nuts & Seeds","q":["nuts","cashew","raw"]},
    {"name":"Pistachios, raw","cat":"Nuts & Seeds","q":["nuts","pistachio","raw"]},
    # SR Legacy has only "1 oz" for chia, so plans printed "¼ oz (10g)". USDA FoodData Central Branded Foods (2025-04,
    # local copy on T7, read 2026-09-24): the most common chia label is "1 Tbsp" = 12 g (64 labels, Navitas, Chosen Foods).
    {"name":"Chia seeds","cat":"Nuts & Seeds","q":["seeds","chia"],
     "add_portions":[{"label":"1 tbsp","grams":12}]},
    {"name":"Flaxseed","cat":"Nuts & Seeds","q":["seeds","flaxseed"]},
    {"name":"Pumpkin seeds","cat":"Nuts & Seeds","q":["seeds","pumpkin","kernels"],"not":["roasted","salt"]},
    {"name":"Sunflower seeds","cat":"Nuts & Seeds","q":["seeds","sunflower seed kernels","dried"],"drop_portions":["1 cup, with hulls, edible yield"]},
    {"name":"Hemp seeds","cat":"Nuts & Seeds","q":["seeds","hemp seed","hulled"]},
    {"name":"Pecans","cat":"Nuts & Seeds","q":["nuts","pecans"],"not":["oil","salt"]},
    {"name":"Macadamia nuts","cat":"Nuts & Seeds","q":["nuts","macadamia","raw"]},
    {"name":"Tahini (sesame butter)","cat":"Nuts & Seeds","q":["seeds","sesame butter","tahini"]},
    {"name":"Pine nuts","cat":"Nuts & Seeds","q":["nuts","pine nuts","dried"]},
    {"name":"Hazelnuts","cat":"Nuts & Seeds","q":["nuts","hazelnuts","filberts"],"not":["roasted","blanched"]},

    # ---- VARIETY BATCH (v31), more options for every diet, esp. vegetarian/vegan ----
    {"name":"Chicken drumstick, cooked","cat":"Protein","q":["chicken","drumstick","meat only","roasted"],"not":["skin","fried"]},
    {"name":"Turkey thigh, roasted","cat":"Protein","q":["turkey","thigh","meat only","roasted"],"not":["skin"]},
    {"name":"Duck, lean, cooked","cat":"Protein","q":["duck","domesticated","meat only","roasted"],"not":["skin"],"drop_portions":["1 unit (yield from 1 lb ready-to-cook duck)"]},
    {"name":"Lamb loin chop, lean, cooked","cat":"Protein","q":["lamb","loin","separable lean only","cooked","broiled"],"drop_portions":["1 chop, excluding refuse (yield from 1 raw chop,"]},
    {"name":"Falafel","cat":"Protein","q":["falafel"]},
    {"name":"Haddock, cooked","cat":"Seafood","q":["fish","haddock","cooked","dry heat"]},
    {"name":"Pollock, cooked","cat":"Seafood","q":["fish","pollock","atlantic","cooked","dry heat"]},
    {"name":"Snapper, cooked","cat":"Seafood","q":["fish","snapper","mixed species","cooked","dry heat"]},
    {"name":"Split peas, cooked","cat":"Legumes","q":["peas","split","mature seeds","cooked","boiled"],"not":["canned"]},
    {"name":"White beans, cooked","cat":"Legumes","q":["beans","white","mature seeds","cooked","boiled"],"not":["canned"]},
    {"name":"Lima beans, cooked","cat":"Legumes","q":["lima beans","large","mature seeds","cooked","boiled"],"not":["canned"]},
    {"name":"Black-eyed peas, cooked","cat":"Legumes","q":["cowpeas","common","mature seeds","cooked","boiled"],"not":["canned","leafy"]},
    {"name":"Bulgur, cooked","cat":"Grains & Starches","q":["bulgur","cooked"]},
    {"name":"Wild rice, cooked","cat":"Grains & Starches","q":["wild rice","cooked"]},
    {"name":"Buckwheat groats, cooked","cat":"Grains & Starches","q":["buckwheat groats","roasted","cooked"]},
    {"name":"Millet, cooked","cat":"Grains & Starches","q":["millet","cooked"]},
    {"name":"Pita bread","cat":"Grains & Starches","q":["bread","pita","white"]},
    {"name":"Rye bread","cat":"Grains & Starches","q":["bread","rye"],"not":["pumpernickel","toasted"]},
    {"name":"Bok choy, cooked","cat":"Vegetables","q":["cabbage","chinese","pak-choi","cooked","boiled"]},
    {"name":"Snap peas, cooked","cat":"Vegetables","q":["peas","edible-podded","cooked","boiled"],"not":["canned"]},
    {"name":"Artichoke, cooked","cat":"Vegetables","q":["artichokes","globe or french","cooked","boiled"],"not":["marinated"]},
    {"name":"Collard greens, cooked","cat":"Vegetables","q":["collards","cooked","boiled"],"not":["canned"]},
    {"name":"Swiss chard, cooked","cat":"Vegetables","q":["chard","swiss","cooked","boiled"]},
    {"name":"Arugula, raw","cat":"Vegetables","q":["arugula","raw"]},
    {"name":"Okra, cooked","cat":"Vegetables","q":["okra","cooked","boiled"],"not":["canned"]},
    {"name":"Leeks, cooked","cat":"Vegetables","q":["leeks","bulb and lower leaf","cooked","boiled"]},
    {"name":"Spaghetti squash, cooked","cat":"Vegetables","q":["squash","winter","spaghetti","cooked","boiled"]},
    {"name":"Cantaloupe, raw","cat":"Fruits","q":["melons","cantaloupe","raw"]},
    {"name":"Blackberries, raw","cat":"Fruits","q":["blackberries","raw"]},
    {"name":"Plums, raw","cat":"Fruits","q":["plums","raw"]},
    {"name":"Apricots, raw","cat":"Fruits","q":["apricots","raw"]},
    {"name":"Pomegranate, raw","cat":"Fruits","q":["pomegranate","raw"]},
    {"name":"Figs, raw","cat":"Fruits","q":["figs","raw"]},
    {"name":"Ricotta cheese, part skim","cat":"Eggs & Dairy","q":["cheese","ricotta","part skim"]},
    {"name":"Swiss cheese","cat":"Eggs & Dairy","q":["cheese","swiss"],"not":["low fat","low sodium"]},
    {"name":"Goat cheese, soft","cat":"Eggs & Dairy","q":["cheese","goat","soft type"]},
    {"name":"Provolone cheese","cat":"Eggs & Dairy","q":["cheese","provolone"],"not":["reduced fat"]},
    {"name":"Olives, ripe","cat":"Condiments & Misc","q":["olives","ripe","canned"]},

    # ---- Fats & Oils ----
    {"name":"Olive oil","cat":"Fats & Oils","q":["oil","olive","salad or cooking"]},
    {"name":"Avocado oil","cat":"Fats & Oils","q":["oil","avocado"]},
    {"name":"Coconut oil","cat":"Fats & Oils","q":["oil","coconut"]},
    {"name":"Canola oil","cat":"Fats & Oils","q":["oil","canola"]},
    {"name":"Flaxseed oil","cat":"Fats & Oils","q":["oil","flaxseed","cold pressed"]},
    {"name":"Sesame oil","cat":"Fats & Oils","q":["oil","sesame","salad or cooking"]},   # was a phantom in some templates; now a real food
    {"name":"Mayonnaise","cat":"Fats & Oils","q":["dressing","mayonnaise","regular"],"not":["low","light","fat free","fat-free","imitation","type","reduced"]},

    # ---- Condiments & Misc ----
    {"name":"Honey","cat":"Condiments & Misc","q":["honey"]},
    {"name":"Maple syrup","cat":"Condiments & Misc","q":["syrups","maple"]},
    {"name":"Sugar, granulated","cat":"Condiments & Misc","fdc":"169655","q":["sugars","granulated"]},   # 2026-10-30: cane sugar in a client's coffee (a client, 2 tsp a cappuccino)
    {"name":"Tomato paste","cat":"Condiments & Misc","fdc":"170459","q":["tomato products","canned","paste","without salt"]},   # 2026-11-02: her chili's steps used it, her ingredient list did not (a client: "always forget to get stock, tomato paste, and the chipotle things")
    {"name":"Soy sauce","cat":"Condiments & Misc","q":["soy sauce","made from soy and wheat"]},
    {"name":"Yellow mustard","cat":"Condiments & Misc","q":["mustard","prepared","yellow"]},
    {"name":"Ketchup","cat":"Condiments & Misc","q":["catsup"]},
    {"name":"Salsa","cat":"Condiments & Misc","q":["salsa","ready-to-serve"]},
    {"name":"Sriracha / hot sauce","cat":"Condiments & Misc","q":["sauce","hot chile","sriracha"]},
    {"name":"Marinara sauce","cat":"Condiments & Misc","q":["sauce","spaghetti/marinara","ready-to-serve"]},
    {"name":"Dark chocolate 70-85%","cat":"Condiments & Misc","q":["chocolate","dark","70-85%"]},
    {"name":"Coffee, brewed","cat":"Condiments & Misc","q":["coffee","brewed","prepared with tap water"],"not":["espresso","decaffeinated"]},
    {"name":"Almond milk, unsweetened","cat":"Condiments & Misc","q":["almond milk","unsweetened"]},
    {"name":"Cocoa powder, unsweetened","cat":"Condiments & Misc","q":["cocoa","dry powder","unsweetened"]},
    # Whey is defined in MANUAL_FOODS below with real EKKOVISION label macros (Dylan: use Ekkovision/Ryse,
    # not generic USDA whey which was only 58% protein with an absurd "3-scoop" serving).
    # PEDRO CAMACHO, 2026-10-02: his eating-out favourites (pizza, pasta, sushi, steak with baked French fries, burgers),
    # made at home and sized to his numbers for Saturday dinner. Pinned SR Legacy records. RAW weights where the raw food
    # is what gets portioned: patties and meatballs are shaped from raw beef, fries are cut from a raw potato, sushi salmon
    # is eaten raw. The app never auto-drafts any of these (isRawMeat, isHandOnly); a coach adds them by hand. (His pizza's
    # pepperoni is the turkey kind, in MANUAL_FOODS: regular pepperoni is 46% fat and left room for 3 slices on two pizzas.)
    # Lean ground beef stays at 93/7 or leaner (Dylan rule above).
    {"name":"Beef, ground 93/7, raw","cat":"Protein","form":"raw","fdc":173110,"q":["beef","ground","93%"]},
    # a braise is portioned from the raw weight: shredded into its sauce it cannot be weighed, and braised round keeps less
    # water than the roasted entry the cooked weight comes from (reviewer, 2026-10-03). Raw twin of "Beef, top round, lean,
    # cooked" (171770): the same roast, lean only, trimmed to 0", all grades.
    {"name":"Beef, top round, raw","cat":"Protein","form":"raw","fdc":171760,"q":["beef","top round","raw"]},
    {"name":"Salmon, Atlantic farmed, raw","cat":"Seafood","form":"raw","fdc":175167,"q":["salmon","atlantic","farmed","raw"]},
    # 2026-10-09 (a client, Cancun): shrimp and white fish for her build-your-own lunch list, weighed raw like
    # the rest of her plan (the database only had them cooked). Raw seafood is never auto-drafted (isRawMeat).
    {"name":"Shrimp, raw","cat":"Seafood","form":"raw","fdc":175179,"q":["shrimp","raw"]},
    {"name":"Tilapia, raw","cat":"Seafood","form":"raw","fdc":175176,"q":["tilapia","raw"]},
    # a fries potato is cut from whole potatoes: SR's own small/medium/large weights, relabelled so a row reads "¾ large
    # potato" (its labels carry inch sizes, which lose the whole-piece reading, so 290 g printed "2 cups, diced")
    {"name":"Potato, raw","cat":"Grains & Starches","form":"raw","fdc":170026,"q":["potatoes","flesh and skin","raw"],
     "drop_portions":["0.5 cup, diced",'1 Potato large (3" to 4-1/4" dia)','1 Potato medium (2-1/4" to 3-1/4" dia)','1 Potato small (1-3/4" to 2-1/2" dia)'],
     "add_portions":[{"label":"1 small potato","grams":170},{"label":"1 medium potato","grams":213},{"label":"1 large potato","grams":369}]},
    {"name":"Hamburger bun","cat":"Grains & Starches","fdc":172796,"q":["rolls","hamburger"],"drop_portions":["1 oz","1 roll 1 serving"],
     "add_portions":[{"label":"1 bun","grams":44}]},   # SR's own "1 roll 1 serving = 44 g", relabelled
    # 2026-10-10 (a client): a whole-wheat bun, 3.4 g of fibre a bun against the white bun's 0.8. Her burger night
    # (and the next day's lunch) could not reach 35 g of fibre on a white bun. SR's "1 roll = 56 g", relabelled.
    {"name":"Whole wheat hamburger bun","cat":"Grains & Starches","fdc":174090,"q":["rolls","hamburger","whole wheat"],
     "drop_portions":["1 roll"],"add_portions":[{"label":"1 bun","grams":56}]},
    # mini naans make 3 personal pizzas; the piece weight is Stonefire Original Mini Naan's label, 1 naan = 50 g (USDA
    # Branded 2585004, 2023, read 2026-10-02: 150 kcal, 5 P, 24 C, 3.5 F, the same food per gram as SR's naan)
    {"name":"Naan","cat":"Grains & Starches","fdc":171845,"q":["naan"],"add_portions":[{"label":"1 mini naan","grams":50}]},
]

# ---------------------------------------------------------------------------
# 2b. Recipes, high-protein, lower-calorie desserts & snacks, built from the
#     USDA ingredients above so their macros/micros are REAL (summed, not guessed).
#     Inspired by widely-reviewed recipes (Greek-yogurt desserts, chia pudding, etc.).
# ---------------------------------------------------------------------------
RECIPES = [
  # Client-staple smoothie (a client, Sep 2026): his exact build, then a dialed version that lifts protein and
  # frees carb budget for his rice/tortilla meals. Both are summed from USDA ingredients, nothing estimated.
  {"name":"Mango egg-white smoothie", "kind":"snack",
   "steps":["Add the almond milk to the blender FIRST so the blades have liquid to catch. This is the whole trick to a frozen smoothie blending without stalling.","Add the egg whites and Greek yogurt next, then the pitted dates, and the frozen mango last so its weight pushes everything down.","Blend 60 to 90 seconds until completely smooth. If it stalls, add almond milk a splash at a time, never more than a splash, or you will thin it out.","Use PASTEURIZED carton egg whites, not whites cracked from shell eggs. Carton whites are heat-treated and safe to drink without cooking.","Drink it cold. If you want it thicker, freeze the yogurt in an ice cube tray the night before and blend those in instead of loose yogurt."],
   "ing":[("Mango, raw",420),("Egg white, raw",454),("Greek yogurt, plain, nonfat",170),("Medjool dates",90),("Almond milk, unsweetened",240)]},
  {"name":"Mango egg-white smoothie, high-protein", "kind":"snack",
   "steps":["Same build as the standard version: almond milk first, then egg whites and Greek yogurt, then the dates, frozen mango last.","Add the whey LAST and blend on low for the final 15 seconds. Whipping whey at high speed the whole time foams it up and makes the smoothie airy instead of thick.","Blend 60 to 90 seconds total until smooth.","Use PASTEURIZED carton egg whites, not whites cracked from shell eggs.","The dates are cut roughly in half here and the whey carries the sweetness, so it tastes about the same but leaves you more carbs for rice and tortillas later in the day."],
   "ing":[("Mango, raw",350),("Egg white, raw",454),("Greek yogurt, plain, nonfat",170),("Medjool dates",45),("Whey protein powder",30),("Almond milk, unsweetened",240)]},

  # ---- original 8 (now step-by-step) ----
  {"name":"Chocolate PB protein yogurt", "kind":"sweet treat",
   "steps":["Add the Greek yogurt, peanut butter, cocoa and honey to a bowl.","Stir hard for 30 seconds until smooth and pudding-like.","Eat as-is, or chill 10 minutes for a thicker set."],
   "ing":[("Greek yogurt, plain, nonfat",170),("Peanut butter, smooth",16),("Cocoa powder, unsweetened",5),("Honey",7)]},
  {"name":"Greek yogurt berry bark", "kind":"sweet treat",
   "steps":["Fold the berries through the yogurt.","Spread thin (about 1cm) on a parchment-lined tray.","Scatter the chopped dark chocolate over the top.","Freeze 2-3 hours until solid, then break into shards. Keep frozen."],
   "ing":[("Greek yogurt, plain, nonfat",170),("Blueberries, raw",40),("Strawberries, raw",40),("Dark chocolate 70-85%",10)]},
  # renamed 2026-09-24: it was "High-protein chia pudding" with 5 g of protein. Maple instead of honey makes it the
  # vegan / dairy-free chia pudding. The id stays, so saved plans that hold it keep it.
  {"name":"Blueberry maple chia pudding", "kind":"sweet treat", "id":"recipe_high-protein_chia_pudding",
   "steps":["Whisk the chia, almond milk and maple syrup together well.","Wait 5 minutes, then whisk again to break up any clumps.","Cover and chill 4 hours or overnight.","Stir and top with the blueberries before eating."],
   "ing":[("Chia seeds",25),("Almond milk, unsweetened",150),("Blueberries, raw",45),("Maple syrup",7)]},
  {"name":"Berry protein fluff", "kind":"sweet treat",
   "steps":["Use frozen raspberries for the best texture.","Add the raspberries, protein powder and almond milk to a blender.","Blend, scraping down, then whip 3-4 minutes until light and fluffy.","Eat right away while airy."],
   "ing":[("Whey protein powder",30),("Raspberries, raw",80),("Almond milk, unsweetened",60)]},
  {"name":"Cottage cheese cheesecake bowl", "kind":"sweet treat",
   "steps":["Blend the cottage cheese on high until completely smooth (no curds).","Spoon into a bowl and drizzle with the honey.","Top with sliced strawberries."],
   "ing":[("Cottage cheese, 2% lowfat",150),("Strawberries, raw",60),("Honey",7)]},
  {"name":"Greek yogurt cookie dough", "kind":"sweet treat",
   "steps":["Blitz the oats into a rough flour.","Mix the yogurt, almond butter, oat flour and honey into a thick dough.","Fold in the chopped dark chocolate.","Chill 15 minutes and eat with a spoon."],
   "ing":[("Greek yogurt, plain, nonfat",150),("Almond butter",16),("Oats, dry (raw)",15),("Dark chocolate 70-85%",10),("Honey",5)]},
  {"name":"Apple & almond butter", "kind":"snack",
   "steps":["Slice the apple into thin rounds or wedges.","Serve with the almond butter for dipping (a dash of cinnamon is nice)."],
   "ing":[("Apple, raw, with skin",150),("Almond butter",16)]},
  {"name":"Cottage cheese & berries", "kind":"snack",
   "steps":["Spoon the cottage cheese into a bowl.","Top with the blueberries (a drizzle of honey optional)."],
   "ing":[("Cottage cheese, 2% lowfat",150),("Blueberries, raw",70)]},

  # ---- new (Pinterest-popular high-protein desserts; macros computed from USDA) ----
  {"name":"Cottage cheese ice cream (choc-PB)", "kind":"sweet treat",
   "steps":["Add cottage cheese, protein powder, peanut butter, cocoa and honey to a blender.","Blend on high until completely smooth, scraping down once.","Pour into a freezer-safe tub and smooth the top.","Freeze 3-4 hours (or ~1.5h for soft-serve). Sit 5-10 min before scooping."],
   "ing":[("Cottage cheese, 2% lowfat",200),("Whey protein powder",15),("Peanut butter, smooth",12),("Cocoa powder, unsweetened",4),("Honey",8)]},
  {"name":"Chocolate protein mug cake", "kind":"sweet treat",
   "steps":["Blitz the oats into a flour.","Mix oat flour, protein powder, cocoa, egg white, almond milk and honey in a mug until smooth.","Microwave 60-80 seconds until just set (don't overcook or it dries out).","Cool 1 minute; top with a few berries if you like."],
   "ing":[("Whey protein powder",28),("Oats, dry (raw)",15),("Cocoa powder, unsweetened",6),("Egg white, raw",30),("Almond milk, unsweetened",80),("Honey",8)]},
  # renamed 2026-09-24: 6 g of protein per serving did not earn "protein" in the name; same id
  {"name":"No-bake peanut butter oat balls", "id":"recipe_no-bake_protein_balls", "kind":"snack", "makes":5,
   "steps":["Stir the oats, protein powder and flaxseed together.","Mix in the peanut butter and honey until a sticky dough forms (add a splash of milk if dry).","Fold in the chopped dark chocolate.","Roll into ~5 balls and chill 20 minutes. Keep refrigerated.","One serving = 1 ball."],
   "ing":[("Oats, dry (raw)",40),("Peanut butter, smooth",32),("Whey protein powder",20),("Honey",15),("Flaxseed",8),("Dark chocolate 70-85%",10)]},
  {"name":"Banana protein nice cream", "kind":"sweet treat",
   "steps":["Freeze sliced banana ahead (at least 2 hours).","Add frozen banana, protein powder, almond milk and peanut butter to a blender.","Blend, scraping down, until thick and creamy like soft-serve.","Eat right away, or freeze 30 min for a firmer scoop."],
   "ing":[("Banana, raw",120),("Whey protein powder",20),("Almond milk, unsweetened",40),("Peanut butter, smooth",10)]},
  {"name":"Flourless banana brownie", "kind":"sweet treat", "makes":4, "id":"recipe_flourless_protein_brownie",
   "steps":["Heat oven to 350°F (175°C) and line a small tin.","Blend banana, cocoa, almond butter, protein powder and honey into a smooth batter.","Fold in the chopped chocolate and spread in the tin.","Bake 12-15 min until just set (still fudgy in the middle). Cool, then cut into 4.","One serving = 1 brownie."],
   "ing":[("Banana, raw",100),("Cocoa powder, unsweetened",12),("Almond butter",24),("Whey protein powder",20),("Honey",10),("Dark chocolate 70-85%",8)]},
  {"name":"High-protein banana pudding", "kind":"sweet treat",
   "steps":["Blend the cottage cheese, half the banana and the maple syrup until silky smooth.","Slice the remaining banana.","Layer the pudding with banana slices in a jar.","Chill 20 minutes before eating."],
   "ing":[("Cottage cheese, 2% lowfat",150),("Banana, raw",80),("Maple syrup",8)]},
  {"name":"Apple nachos", "kind":"snack",
   "steps":["Slice the apple into thin rounds and fan out on a plate.","Warm the peanut butter 15 seconds so it drizzles, then drizzle over the apple.","Sprinkle with the chopped dark chocolate (and cinnamon if you have it).","Eat straight away."],
   "ing":[("Apple, raw, with skin",150),("Peanut butter, smooth",20),("Dark chocolate 70-85%",8)]},
  {"name":"Chocolate chia protein pudding", "kind":"sweet treat",
   "steps":["Whisk the chia, protein powder, cocoa, honey and almond milk together well.","Wait 5 minutes, then whisk again to break up clumps.","Cover and chill 4 hours or overnight.","Stir and top with berries."],
   "ing":[("Chia seeds",20),("Whey protein powder",15),("Cocoa powder, unsweetened",5),("Almond milk, unsweetened",140),("Honey",8),("Blueberries, raw",40)]},
  # ---- v42: high-protein LOW-CALORIE desserts (researched + vetted) ----
  # renamed 2026-09-24 from "Cookies & cream": there are no cookies in it, the dark chocolate goes in as chips
  {"name":"Chocolate chip protein ice cream", "kind":"sweet treat", "id":"recipe_cookies_and_cream_protein_ice_cream",
   "steps":["Add the cottage cheese, whey protein, and almond milk to a blender.","Blend on high 1-2 minutes until completely smooth with no curds.","Chop the dark chocolate into small bits and stir them in by hand.","Pour into a small container and freeze 2-3 hours, stirring once after the first hour for a softer scoop.","Let it sit out 5 minutes before scooping."],
   "ing":[("Cottage cheese, nonfat",150),("Whey protein powder",15),("Almond milk, unsweetened",30),("Dark chocolate 70-85%",8)]},
  {"name":"Chocolate PBfit fudge pops", "kind":"sweet treat",
   "steps":["Whisk the almond milk, whey protein, PBfit, cocoa, and honey in a bowl until smooth with no lumps.","Pour into popsicle molds (or small cups with a stick).","Freeze at least 4 hours or overnight until solid.","Run the mold under warm water for a few seconds to release."],
   "ing":[("Almond milk, unsweetened",120),("Whey protein powder",20),("PBfit powdered peanut butter",12),("Cocoa powder, unsweetened",6),("Honey",5)]},
  # 2026-09-24: silken tofu is specialty-shelf in the availability audit; firm tofu is in every store. Renamed from
  # "Chocolate silken tofu mousse", same id.
  # 2026-10-14: "really watery" (a client, the only client with it). 60 g of almond milk and 14 g of maple syrup to
  # 150 g of unpressed water-packed tofu is about a third liquid, and nothing in it set: cocoa powder does not firm in the
  # fridge. Now the tofu is pressed, the milk is one tablespoon (16 g: USDA's cup of almond milk is 262 g, so 15 g printed
  # as "2¾ tsp"), and ½ oz (14 g) of melted dark chocolate sets it as it chills (cocoa butter is solid at fridge
  # temperature), with vanilla and salt for a rounder chocolate taste; the maple drops to 10 g. A batch is 200 g; half is
  # 100 g: 147 cal, 9.5 g protein, 7.7 g fat (was 117 g: 114 cal, 9 g, 5 g). Still vegan with a dairy-free bar.
  {"name":"Chocolate tofu mousse", "kind":"sweet treat", "id":"recipe_chocolate_silken_tofu_mousse",
   "steps":["Weigh the tofu from the block (firm or extra-firm, not silken), wrap it in paper towels and press it under a heavy pan for 10 minutes, then pat it dry: wet tofu makes a watery mousse.","Break the chocolate into small pieces and melt it with the almond milk in the microwave in 15-second bursts, stirring each time, until smooth.","Right away, blend the tofu, the warm chocolate, the cocoa, the maple syrup, ½ tsp vanilla and a pinch of salt in a food processor or a strong blender for 2-3 minutes, scraping down the sides, until smooth and pudding-thick. If the tofu will not pull into the blade, add almond milk a teaspoon at a time.","Spoon it into cups and chill at least 1 hour, until set. It keeps 3 days covered in the fridge; stir it before you eat it. (Vegan with a dairy-free chocolate.)"],
   "ing":[("Tofu, firm",150),("Cocoa powder, unsweetened",10),("Maple syrup",10),("Almond milk, unsweetened",16),("Dark chocolate 70-85%",14)]},
  # ---- 2026-09-24: vegan / dairy-free treats. Vegan and ovo clients had ONE treat (and it needed a specialty
  # ingredient), a dairy-allergic client had one. Everyday ingredients only; no honey, no dairy, no whey. ----
  {"name":"Peanut Butter Chocolate Protein Chia Pudding", "kind":"sweet treat",
   "steps":["Whisk the protein powder, cocoa, and PBfit into the almond milk until there are no lumps.","Whisk in the chia seeds and maple syrup.","Wait 5 minutes, whisk again to break up any clumps, then cover and chill 4 hours or overnight.","Stir before eating. (Vegan.)"],
   "ing":[("Chia seeds",20),("Almond milk, unsweetened",150),("Pea & rice protein powder",20),("Cocoa powder, unsweetened",5),("PBfit powdered peanut butter",10),("Maple syrup",8)]},
  {"name":"Peanut Butter Banana Soft-Serve", "kind":"sweet treat",
   "steps":["Slice a ripe banana and freeze it for at least 4 hours.","Blend the frozen banana with the almond milk, pulsing and scraping down, until it turns creamy like soft-serve.","Add the protein powder and PBfit and blend 20 seconds more.","Eat right away, or freeze 30 minutes for a firmer scoop. (Vegan.)"],
   "ing":[("Banana, raw",120),("Almond milk, unsweetened",40),("Pea & rice protein powder",15),("PBfit powdered peanut butter",12)]},
  {"name":"Baked Cinnamon Apple with Oat Crumble", "kind":"sweet treat",
   "steps":["Heat the oven or air fryer to 375F.","Core the apple, cut it into thick slices, toss with half the cinnamon, and lay the slices in a small baking dish.","Rub the oats, almond butter, maple syrup, and the rest of the cinnamon together into a crumbly mix and scatter it over the apple.","Bake 20 to 25 minutes (air fryer 12 to 15) until the apple is soft and the top is golden. (Vegan.)"],
   "ing":[("Apple, raw, with skin",180),("Oats, dry (raw)",15),("Almond butter",6),("Maple syrup",8),("Cinnamon, ground",2)]},
  {"name":"Dark Chocolate Strawberries", "kind":"sweet treat",
   "steps":["Melt the dark chocolate in the microwave in 20-second bursts, stirring between each.","Dip each strawberry halfway and set it on parchment.","Chill 10 minutes until the chocolate sets. (Vegan.)"],
   "ing":[("Strawberries, raw",150),("Dark chocolate 70-85%",20)]},
  {"name":"Triple-berry cottage cheese bark", "kind":"sweet treat",
   "steps":["Blend the cottage cheese smooth with the honey.","Spread it about 1cm thick on a parchment-lined tray.","Press the blueberries, strawberries, and raspberries into the top.","Freeze 2-3 hours until solid, then break into shards. Keep frozen."],
   "ing":[("Cottage cheese, nonfat",150),("Blueberries, raw",30),("Strawberries, raw",30),("Raspberries, raw",20),("Honey",5)]},
  {"name":"Pumpkin spice protein fluff", "kind":"sweet treat",
   "steps":["Add the canned pumpkin, whey protein, almond milk, and maple to a bowl.","Whip hard with a hand mixer or vigorous whisk for 2-3 minutes until light and fluffy.","Add a pinch of cinnamon and nutmeg if you have them.","Chill 15 minutes and eat cold."],
   "ing":[("Pumpkin, canned",120),("Whey protein powder",25),("Almond milk, unsweetened",40),("Maple syrup",6)]},
  {"name":"Lemon cheesecake protein mousse", "kind":"sweet treat",
   "steps":["Blend the cottage cheese, whey, and honey completely smooth.","Stir in a squeeze of fresh lemon juice and a little grated lemon zest.","Spoon into a cup and chill 20 minutes to firm up."],
   "ing":[("Cottage cheese, nonfat",150),("Whey protein powder",15),("Honey",6)]},
  {"name":"Tiramisu ricotta cream cups", "kind":"sweet treat",
   "steps":["Stir the ricotta, whey, and honey until smooth and creamy.","Swirl the cold strong coffee through it.","Spoon into a cup and dust the top with the cocoa through a small sieve.","Chill 20 minutes."],
   "ing":[("Ricotta cheese, part skim",100),("Whey protein powder",15),("Coffee, brewed",30),("Cocoa powder, unsweetened",4),("Honey",6)]},
  {"name":"Vanilla berry protein chia pudding", "kind":"sweet treat",
   "steps":["Whisk the chia, almond milk, vanilla whey, and honey together well.","Wait 5 minutes, then whisk again to break up any clumps.","Cover and chill 4 hours or overnight.","Top with sliced strawberries before eating."],
   "ing":[("Chia seeds",20),("Almond milk, unsweetened",140),("Whey protein powder",12),("Strawberries, raw",40),("Honey",5)]},
  {"name":"Strawberry cheesecake protein jar", "kind":"sweet treat",
   "steps":["Blend the cottage cheese, whey, and honey until smooth and thick.","Dice the strawberries.","Layer the cream and strawberries in a small jar.","Chill 15 minutes."],
   "ing":[("Cottage cheese, 2% lowfat",120),("Strawberries, raw",50),("Whey protein powder",12),("Honey",5)]},
  {"name":"Pumpkin pie protein whip", "kind":"sweet treat",
   "steps":["Stir the canned pumpkin, Greek yogurt, whey, and maple together until smooth.","Add cinnamon, ginger, and a pinch of nutmeg if you have them.","Whip 1 minute until airy and chill before eating."],
   "ing":[("Pumpkin, canned",100),("Greek yogurt, plain, nonfat",80),("Whey protein powder",12),("Maple syrup",6)]},
  # ---- v42: filling LOW-CALORIE snacks (high volume/protein/fiber) ----
  {"name":"Cheesy nutritional yeast popcorn", "kind":"snack",
   "steps":["Air-pop the popcorn, or use plain pre-popped.","Mist it lightly with a little spray oil so the topping sticks.","Sprinkle the nutritional yeast and a little salt over the top and toss.","Eat right away while warm and crunchy."],
   "ing":[("Popcorn, air-popped",20),("Nutritional yeast",6)]},
  {"name":"Sesame chili edamame", "kind":"snack",
   "steps":["Steam or microwave the edamame in their pods until hot, 2-3 minutes.","Toss with a splash of tamari (gluten-free soy sauce), a few drops of toasted sesame oil, and a pinch of chili flakes.","Sprinkle with sesame seeds and eat by squeezing the beans from the pods."],
   "ing":[("Edamame, cooked",120)]},
  {"name":"Cottage cheese ranch veggie dip", "kind":"snack",
   "steps":["Blend the cottage cheese smooth.","Stir in garlic powder, onion powder, dried dill, salt, and pepper to make a quick ranch.","Slice the cucumber into sticks and dip."],
   "ing":[("Cottage cheese, nonfat",120),("Cucumber, raw",100)]},
  {"name":"Pickle & seaweed crunch plate", "kind":"snack",
   "steps":["Slice the dill pickles into spears or chips.","Arrange them with the roasted seaweed snack sheets.","Eat together for a salty, crunchy, very low-calorie plate."],
   "ing":[("Pickles, dill",65),("Seaweed snack, roasted",5)]},
  {"name":"Dilly tuna cucumber rounds", "kind":"snack",
   "steps":["Drain the tuna well and flake it in a bowl.","Mix in the Greek yogurt, a squeeze of lemon, chopped dill, salt, and pepper.","Slice the cucumber into thick rounds.","Spoon a little tuna salad onto each cucumber round."],
   "ing":[("Tuna, light, canned in water",80),("Greek yogurt, plain, nonfat",20),("Cucumber, raw",100)]},
  {"name":"Strawberry sugar-free jello parfait", "kind":"snack",
   "steps":["Have the sugar-free gelatin already set in the fridge, then cut it into cubes.","Layer the Greek yogurt, jello cubes, and sliced strawberries in a glass.","Eat cold."],
   "ing":[("Sugar-free gelatin, prepared",117),("Greek yogurt, plain, nonfat",100),("Strawberries, raw",40)]},
  {"name":"Protein hot cocoa", "kind":"snack",
   "steps":["Warm the almond milk in a mug or small pot until steaming (don't boil).","Whisk the cocoa and honey into a little of the warm milk first to make a paste.","Let it cool slightly, then whisk in the whey protein off the heat so it doesn't clump.","Sip warm."],
   "ing":[("Almond milk, unsweetened",200),("Whey protein powder",20),("Cocoa powder, unsweetened",6),("Honey",5)]},
  {"name":"Cottage cheese cheesecake pudding cup", "kind":"snack",
   "steps":["Blend the cottage cheese and almond milk completely smooth.","Add the dry sugar-free pudding mix and blend again until thick.","Chill 10-15 minutes to set into a thick pudding."],
   "ing":[("Cottage cheese, nonfat",150),("Almond milk, unsweetened",40),("Sugar-free instant pudding mix, dry",8)]},
  {"name":"Miso tofu greens broth", "kind":"snack",
   "steps":["Heat about 1.5 cups of water or low-sodium broth in a small pot until hot but not boiling.","Cube the firm tofu and add it with the spinach; simmer gently 2-3 minutes.","Take the pot OFF the heat, then whisk the miso paste into a little of the broth and stir it back in (never boil miso).","Add grated ginger and sliced green onion and sip."],
   "ing":[("Tofu, firm",80),("Spinach, cooked",50),("Miso paste",12)]},
  {"name":"Kimchi egg-white scramble cup", "kind":"snack",
   "steps":["Chop the kimchi roughly.","Heat a nonstick pan over medium with a tiny mist of oil.","Add the kimchi and warm 1 minute, then pour in the egg whites.","Stir gently 2-3 minutes until just set and fluffy.","Top with sliced green onion."],
   "ing":[("Egg white, raw",120),("Kimchi",40)]},
  {"name":"Tomato white bean soup", "kind":"snack",
   "steps":["Warm a little water or low-sodium broth in a pot.","Add the chopped tomato and cook 5 minutes until saucy.","Add the white beans and spinach and simmer 5 minutes.","Season with garlic, basil, salt, and pepper. For a creamy body, mash some of the beans against the pot."],
   "ing":[("White beans, cooked",80),("Tomato, raw",120),("Spinach, cooked",40)]},
  {"name":"PBfit banana rice cake stacks", "kind":"snack",
   "steps":["Mix the PBfit with a little water until it's a spreadable peanut butter.","Spread it over the rice cakes.","Slice the banana and lay it on top.","Add a pinch of cinnamon and eat right away so the rice cakes stay crisp."],
   "ing":[("Rice cake, brown rice",18),("PBfit powdered peanut butter",12),("Banana, raw",50)]},
  {"name":"Matcha Protein Panna Cotta", "kind":"sweet treat", "makes":2,
   "steps":["Prepare the sugar-free gelatin per its package but use only HALF the water it calls for, so it sets firm. You need about 60 g of the still-liquid prepared gelatin for this recipe. Keep it warm and liquid (do not let it set yet).","In a small saucepan, gently warm the skim milk over low heat until it is hot but not boiling (you will see steam, about 150°F).","Whisk the matcha powder into 1 tablespoon of the warm milk first, in a separate cup, until it forms a smooth paste with no lumps. Then whisk that paste back into the rest of the warm milk. (Mixing matcha into a little liquid first prevents clumps.)","Take the milk off the heat. Whisk in the honey, then the still-liquid prepared gelatin, until fully combined.","Let the mixture cool for 5 minutes so it is warm but not hot. Then whisk in the whey protein powder and the Greek yogurt until completely smooth. (Adding protein and yogurt off direct heat keeps it from getting grainy.)","Pour the mixture into 2 small cups, ramekins, or glasses.","Refrigerate for at least 4 hours, or until fully set and wobbly when you nudge the cup.","Before serving, chop the pistachios and sprinkle them on top for crunch and color."],
   "ing":[("Milk, nonfat / skim",150),("Greek yogurt, plain, nonfat",100),("Whey protein powder",25),("Sugar-free gelatin, prepared",60),("Honey",10),("Matcha green tea powder",3),("Pistachios, raw",10)]},
  {"name":"Apple Pie Protein Nachos", "kind":"sweet treat", "makes":2,
   "steps":["Preheat the oven to 325°F (160°C) and line a baking sheet with parchment paper.","Core the apple and slice it as thin as you can into rounds or thin wedges (thin slices crisp up better). Lay them in a single layer on the parchment, not overlapping.","Sprinkle the apple slices with half of the cinnamon. Bake for 20-30 minutes, flipping once halfway, until the edges are dry and lightly crisp. Watch closely near the end so they do not burn. Let them cool; they crisp more as they cool.","Make the date caramel: pit the dates, soak them in hot water for 10 minutes, then drain. Blend the soaked dates with 2-3 tablespoons of water and 5 g of the whey protein powder until you get a smooth, pourable caramel. Add water a little at a time to reach a drizzle consistency.","Make the cinnamon yogurt dip: stir together the Greek yogurt, the remaining whey protein powder, and the rest of the cinnamon until smooth and thick.","Pile the cooled apple crisps on a plate like nachos. Dollop or drizzle the cinnamon yogurt dip over them.","Drizzle the date caramel over the top.","Roughly chop the walnuts and scatter them over everything. Serve right away so the apple chips stay crisp."],
   "ing":[("Apple, raw, with skin",150),("Greek yogurt, plain, nonfat",120),("Whey protein powder",20),("Medjool dates",24),("Walnuts",14),("Cinnamon, ground",2)]},
  {"name":"Dubai-Style Pistachio Tahini Crunch Bars", "kind":"sweet treat", "makes":4,
   "steps":["Pit the Medjool dates and put them in a small bowl. Cover with hot (not boiling) water and let them soak for 10 minutes so they soften. This makes them easy to mash.","Drain the dates. Add the soaked dates and the dry oats to a food processor (or chop finely by hand and mash hard with a fork). Blend until it forms a sticky, slightly crumbly dough.","Line a small loaf pan or food container (about 5x5 inches) with parchment paper. Press the date-oat dough firmly and evenly into the bottom with the back of a spoon to make a flat base. Put it in the freezer while you make the filling.","Finely chop 25 g of the pistachios (save 15 g for the top). In a bowl, stir together the chopped pistachios, whey protein powder, tahini, and almond milk. Add the almond milk a splash at a time and stir until you get a thick, spreadable green paste. If it is too stiff, add 1 more teaspoon of almond milk; if too loose, add a pinch more protein powder.","Take the base out of the freezer. Spread the pistachio-tahini filling evenly over the base with a spoon or small spatula. Smooth the top.","Melt the dark chocolate: break it into small pieces, microwave in 20-second bursts, stirring between each, until just melted (about 40-60 seconds total). Do not overheat.","Drizzle or spread the melted chocolate over the filling. Immediately sprinkle the remaining 15 g chopped pistachios on top so they stick.","Freeze for 30 minutes (or refrigerate 2 hours) until firm. Lift out by the parchment and cut into 4 bars. Store in the fridge."],
   "ing":[("Medjool dates",90),("Oats, dry (raw)",40),("Whey protein powder",30),("Pistachios, raw",40),("Tahini (sesame butter)",30),("Almond milk, unsweetened",40),("Dark chocolate 70-85%",30)]},
  {"name":"Cottage Cheese Tiramisu Cups", "kind":"sweet treat", "makes":2,
   "steps":["Brew a small amount of strong coffee and let it cool to room temperature. You need about 60 g (roughly 1/4 cup). Pour it into a shallow bowl.","Make the cream: add the cottage cheese, Greek yogurt, whey protein powder, and honey to a blender or a tall cup if using an immersion blender. Blend for 30-60 seconds until completely smooth with no lumps. The cottage cheese curds must fully disappear so it tastes like mascarpone cream.","Break the rice cakes into rough bite-size pieces. These act as the ladyfingers.","Quickly dip the rice cake pieces into the cooled coffee, one at a time, for just 1-2 seconds each. Do not soak them long or they go mushy. Lay a layer of dipped pieces in the bottom of a small glass or jar.","Spoon about half of the cream over the coffee-dipped rice cakes and smooth it flat.","Add a second layer of coffee-dipped rice cake pieces, then top with the rest of the cream and smooth the surface.","Cover and refrigerate at least 2 hours (or overnight). This lets the rice cakes soften into a cake-like layer.","Just before serving, dust the top evenly with the cocoa powder using a small sieve or by tapping it through your fingers."],
   "ing":[("Cottage cheese, 2% lowfat",150),("Greek yogurt, plain, nonfat",80),("Whey protein powder",25),("Honey",10),("Coffee, brewed",60),("Rice cake, brown rice",18),("Cocoa powder, unsweetened",4)]},
  {"name":"Frozen Greek Yogurt Berry Clusters", "kind":"sweet treat", "makes":4,
   "steps":["Line a baking sheet or flat plate (one that fits in your freezer) with parchment paper.","In a bowl, stir together the Greek yogurt, whey protein powder, and honey until thick and smooth. It should be like a stiff mousse; if it is too thick to stir, add 1 teaspoon of water.","Gently fold in the whole blueberries and raspberries with a spatula. Fold slowly so the raspberries stay mostly intact and do not turn everything pink.","Using a spoon, drop rounded heaps (about 2 tablespoons each) onto the parchment, spacing them apart. You should get roughly 8-10 clusters. Each heap should have visible berries poking out.","Freeze for at least 3 hours, until the clusters are solid all the way through.","Melt the dark chocolate in the microwave in 20-second bursts, stirring between each, until just melted (about 30-40 seconds).","Take the frozen clusters out and quickly drizzle the melted chocolate over them with a spoon. The chocolate sets almost instantly on the cold clusters.","Peel the clusters off the parchment and store them in a freezer bag or container in the freezer. Let them sit out 2-3 minutes before eating so they are not rock-hard."],
   "ing":[("Greek yogurt, plain, nonfat",200),("Whey protein powder",20),("Blueberries, raw",60),("Raspberries, raw",50),("Honey",10),("Dark chocolate 70-85%",15)]},
  {"name":"Pumpkin Tahini Protein Blondie Bites", "kind":"sweet treat", "makes":6,
   "steps":["Preheat the oven to 350°F (175°C). Line a small muffin tin (or use silicone muffin cups) with about 6 liners, or lightly grease them.","Drain and rinse the cooked chickpeas well, then pat them dry with a paper towel. Dry chickpeas blend smoother.","Add the chickpeas, canned pumpkin, dry oats, whey protein powder, maple syrup, and the egg to a food processor or blender. Blend for 1-2 minutes, stopping to scrape the sides, until the batter is completely smooth with no chunks of chickpea.","Spoon the batter evenly into the 6 muffin cups, filling each about three-quarters full.","Warm the tahini for 5-10 seconds in the microwave so it is runny. Drop a small teaspoon of tahini onto the top of each blondie bite, then drag a toothpick through it to make a pretty swirl.","Bake for 18-22 minutes, until the tops are set and a toothpick inserted in the center comes out mostly clean (a little moist is good for fudgy bites).","Let them cool in the tin for 10 minutes (they firm up as they cool), then sprinkle a tiny pinch of flaky salt on top if you have it.","Store in the fridge for up to 4 days. Eat cold or warm slightly."],
   "ing":[("Chickpeas, cooked",120),("Pumpkin, canned",80),("Oats, dry (raw)",30),("Whey protein powder",25),("Maple syrup",25),("Tahini (sesame butter)",20),("Egg, whole, raw",50)]},
  {"name":"Protein Croffle Bites with Strawberry Cottage-Cheese Cream", "kind":"sweet treat", "makes":3,
   "steps":["Plug in and preheat a waffle iron (a mini one works great). Lightly grease it with a tiny bit of oil or cooking spray.","Make the batter: add the dry oats, whole egg, egg white, and whey protein powder to a blender. Blend for about 30 seconds until you have a smooth, pourable batter. If it is very thick, add 1 tablespoon of water.","Pour the batter into the hot waffle iron (do not overfill). Close it and cook for 3-5 minutes, until the croffle bite is golden and firm and lifts away cleanly. Cook in batches if your iron is small.","While the croffles cook, make the cream: add the cottage cheese and honey to a blender or tall cup and blend until completely smooth (30-60 seconds), so it whips up like a frosting.","Dice the fresh strawberries small. Fold most of them into the cottage-cheese cream, saving a few for the top.","Let the croffle bites cool for 2 minutes so they crisp up slightly.","Spread or dollop the strawberry cream over the croffle bites and scatter the reserved diced strawberries on top. Eat right away while the croffle is crisp."],
   "ing":[("Oats, dry (raw)",40),("Egg, whole, raw",50),("Egg white, raw",30),("Whey protein powder",25),("Cottage cheese, 2% lowfat",100),("Strawberries, raw",60),("Honey",8)]},
  {"name":"Salted Date-Caramel Stuffed Dates", "kind":"sweet treat", "makes":4, "id":"recipe_salted_date-caramel_protein_stuffed_dates",
   "steps":["Slice each Medjool date down one side (do not cut all the way through) and remove the pit. You are making a little pocket. Use about 4 dates.","Make the protein caramel: in a small bowl, stir together the PBfit powder, whey protein powder, and almond milk. Add the almond milk slowly and stir until you get a thick, smooth, scoopable caramel. If it is too dry, add a few more drops of almond milk.","Spoon or pipe the caramel into the pocket of each date, filling it generously. Press one or two roasted peanuts into the caramel of each date for crunch.","Gently close the date around the filling. Place the stuffed dates on a parchment-lined plate and freeze for 15 minutes so they firm up (this makes dipping easier).","Melt the dark chocolate in the microwave in 20-second bursts, stirring between each, until just melted (about 30-40 seconds).","Dip the bottom half of each chilled stuffed date into the melted chocolate, or drizzle the chocolate over the top. Set them back on the parchment.","Sprinkle a tiny pinch of flaky salt on the chocolate while it is still wet.","Refrigerate for 10 minutes until the chocolate is set. Store in the fridge."],
   "ing":[("Medjool dates",96),("PBfit powdered peanut butter",20),("Whey protein powder",12),("Almond milk, unsweetened",25),("Peanuts, dry-roasted",16),("Dark chocolate 70-85%",20)]},
  {"name":"Whipped Ricotta & Roasted Cherry Protein Toast", "kind":"sweet treat", "makes":2,
   "steps":["Pit the cherries and cut them in half. Put them in a small pan with the honey over medium heat.","Cook the cherries, stirring now and then, for 6-8 minutes until they soften and release a thick, syrupy juice. Then take them off the heat and let them cool slightly while you make the ricotta.","Make the whipped ricotta: add the ricotta and whey protein powder to a bowl. Whisk hard with a fork or use a small blender for 30 seconds until light, fluffy, and smooth. If it is stiff, add 1-2 teaspoons of water.","Toast the whole wheat bread (2 slices) until golden and crisp.","Spread the whipped ricotta thickly and evenly over the warm toast.","Spoon the roasted cherries and their syrup over the ricotta.","Chop the pistachios and sprinkle them on top for crunch. Eat right away while the toast is still crisp and the cherries are warm."],
   "ing":[("Whole wheat bread",56),("Ricotta cheese, part skim",100),("Whey protein powder",15),("Cherries, sweet, raw",100),("Honey",12),("Pistachios, raw",12)]},
  {"name":"No-Bake Banana Pudding Protein Jars", "kind":"sweet treat", "makes":2,
   "steps":["In a medium bowl, whisk together the skim milk and the dry sugar-free vanilla pudding mix for about 1 minute, until it starts to thicken.","Add the Greek yogurt and whey protein powder to the same bowl. Whisk until completely smooth and thick, like a creamy custard. Let it sit for 5 minutes to thicken fully.","Slice the banana into thin coins.","Crush the rice cakes into small pieces with your hands (these stand in for vanilla wafers). Keep them chunky for crunch.","Assemble in a glass jar or cup: spoon a layer of the protein custard on the bottom, then a layer of banana slices, then a sprinkle of crushed rice cake. Repeat the layers until everything is used, finishing with custard on top.","Top with a few banana slices and a little crushed rice cake.","Chill in the fridge for at least 1 hour so the rice cake softens slightly into a cake-like layer. Eat within a day so the banana stays fresh."],
   "ing":[("Greek yogurt, plain, nonfat",170),("Milk, nonfat / skim",100),("Sugar-free instant pudding mix, dry",15),("Whey protein powder",20),("Banana, raw",90),("Rice cake, brown rice",18)]},
]

# ---------------------------------------------------------------------------
# 2c. Popular brand EXAMPLES for shopping (packaged foods only). These are shopping
#     hints, macros stay USDA. Plain produce/meat get none (you buy them generic).
#     AUDITED 2026-09-23: clients buy the named brand and scan its barcode, so a brand stays here only if its
#     current label is within ~5% of this food's USDA kcal/100g (or differs only by FDA label rounding).
#     Removed as >5% off, each confirmed by USDA FDC Branded AND Open Food Facts (or the maker's own label):
#     Almond Breeze/Silk unsweetened (30 kcal/cup = 12.5/100 vs 15), Navitas cacao (417 vs 228), Lindt 85%
#     (567 vs 598), Ghirardelli 72% (531), Heinz ketchup (118 vs 101), Primal Kitchen ketchup (67), Rao's
#     (80 vs 50) + Victoria (62) marinara, Good Culture (2% only, 80-87 vs 72 nonfat), Fage 0% / Chobani nonfat
#     (53 vs 59) + Oikos Triple Zero (80), Stonyfield Greek whole (82-88 vs 97) + lowfat plain (47-53 vs 63),
#     Fairlife fat-free (33 vs 35), Polly-O (250 vs 295) + Galbani (267) part-skim mozzarella, Thomas' plain
#     bagel (284 vs 264), Tumaro's (low-carb wrap), Banza (chickpea, not wheat pasta), Bionaturae whole wheat
#     (316-368 vs 348 dry), SkinnyPop (536, oil-popped), Wonder (246 vs 267), Ezekiel (235; has its own entry)
#     + Nature's Own 100% WW (214-231 vs 252), Cedar's (263) + Ithaca hummus, Rosarita/Old El Paso/Amy's
#     refried (75-123 vs 90), Barney Butter (562 vs 614), Navitas hemp (600 vs 553), House Foods / Nasoya
#     firm tofu (82-94 vs 144; "Tofu, firm" itself was re-based to Nasoya on 2026-09-24), Applegate ham
#     (109 vs 141), Wild Planet (106) + Chicken of the Sea pink salmon,
#     King Oscar (271) + Wild Planet (224) sardines, Bumble Bee (89-97) + Wild Planet (99-106) light tuna.
# ---------------------------------------------------------------------------
BRANDS = {
  "Whey protein powder":"Optimum Nutrition Gold Standard, Dymatize ISO100, Premier Protein, Ghost",
  "Greek yogurt, plain, whole":"Fage 5%, Chobani Whole Milk",
  "Yogurt, plain, low fat":"Chobani, Dannon",
  "Cottage cheese, 2% lowfat":"Good Culture, Daisy, Breakstone's",
  "Cottage cheese, nonfat":"Friendship",
  "Milk, nonfat / skim":"Horizon Organic, store brand",
  "Milk, 2% reduced fat":"Fairlife, Horizon Organic, store brand",
  "Milk, whole":"Fairlife, Horizon Organic, store brand",
  "Almond milk, unsweetened":"Califia",
  "Oats, dry (raw)":"Quaker, Bob's Red Mill",
  "Oats, cooked (in water)":"Quaker, Bob's Red Mill",
  "Peanut butter, smooth":"Jif, Skippy, Smucker's Natural",
  "Almond butter":"Justin's, MaraNatha",
  "Whole wheat bread":"Dave's Killer Bread",
  "White bread":"Nature's Own, Sara Lee",
  "Pasta, cooked":"Barilla, De Cecco",
  "Whole wheat pasta, cooked":"Barilla",
  "Flour tortilla":"Mission, La Banderita",
  "Corn tortilla":"Mission, La Banderita",
  "Bagel, plain":"Dave's Killer Bread",
  "English muffin":"Thomas', Bays",
  "Rice cake, brown rice":"Quaker, Lundberg",
  "Popcorn, air-popped":"plain popcorn kernels, popped without oil (most bagged popcorn is popped in oil)",
  "Dark chocolate 70-85%":"Hu",
  "Cocoa powder, unsweetened":"Hershey's, Ghirardelli",
  "Maple syrup":"any 100% pure maple",
  "Honey":"any raw honey",
  "Hummus":"Sabra",
  "Salsa":"Tostitos, Pace, Mrs. Renfro's",
  "Sriracha / hot sauce":"Huy Fong (rooster), Yellowbird",
  "Marinara sauce":"Prego",
  "Mayonnaise":"Hellmann's, Duke's, Primal Kitchen",
  "Yellow mustard":"French's, Heinz",
  "Soy sauce":"Kikkoman, San-J (gluten-free)",
  "Cheddar cheese":"Tillamook, Cabot, Kraft",
  "Mozzarella, part skim":"store brand",
  "Parmesan, grated":"BelGioioso, Kraft, store brand",
  "Feta cheese":"Athenos, Président",
  "Cream cheese":"Philadelphia, store brand",
  "Butter, salted":"Kerrygold, Land O'Lakes, Challenge",
  "Tuna, light, canned in water":"StarKist",
  "Salmon, pink, canned":"Bumble Bee",
  "Sardines, canned in oil":"Season",
  "Tempeh":"Lightlife, Tofurky, SoyBoy",
  "Edamame, cooked":"Seapoint Farms, store-brand frozen shelled",
  "Chia seeds":"Bob's Red Mill, Navitas, Nutiva",
  "Flaxseed":"Bob's Red Mill, Spectrum",
  "Hemp seeds":"Manitoba Harvest",
  "Olive oil":"California Olive Ranch, Bertolli, Pompeian",
  "Avocado oil":"Chosen Foods, Primal Kitchen",
  "Coconut oil":"Nutiva, Spectrum",
  "Coffee, brewed":"any brewed coffee",
  "Black beans, cooked":"Bush's, Goya, Eden (or dried)",
  "Chickpeas, cooked":"Bush's, Goya, Eden (or dried)",
  "Ham, extra lean":"Boar's Head",
  "Bacon, cooked":"any (Applegate for nitrate-free)",
}

# ---------------------------------------------------------------------------
# 3. Load food + category tables
# ---------------------------------------------------------------------------
def load_csv(name):
    with open(os.path.join(RAW, name), newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

cat_map = {r["id"]: r["description"] for r in load_csv("food_category.csv")}
foods_raw = load_csv("food.csv")  # fdc_id, data_type, description, food_category_id
FOODS_INDEX = [(r["fdc_id"], r["description"], r["food_category_id"]) for r in foods_raw]

def find_match(entry):
    if entry.get("fdc"):
        for fdc, desc, catid in FOODS_INDEX:
            if fdc == str(entry["fdc"]):
                return fdc, desc
        return None
    q = [k.lower() for k in entry["q"]]
    notk = [k.lower() for k in entry.get("not", [])]
    prefer = (entry.get("prefer") or "").lower()
    cands = []
    for fdc, desc, catid in FOODS_INDEX:
        d = desc.lower()
        if all(k in d for k in q) and not any(n in d for n in notk):
            cands.append((fdc, desc))
    if not cands:
        return None
    def saltrank(desc):                       # prefer "without salt" over "with salt" where both exist
        d = desc.lower()
        if "without salt" in d or "no salt" in d or "unsalted" in d: return 0
        if "with salt" in d: return 2
        return 1
    cands.sort(key=lambda it: (0 if prefer and prefer in it[1].lower() else 1, saltrank(it[1]), len(it[1])))
    return cands[0]

selected = {}        # fdc_id -> entry (+ chosen desc)
unmatched = []
for entry in WHITELIST:
    m = find_match(entry)
    if not m:
        unmatched.append(entry["name"]); continue
    fdc, desc = m
    if fdc in selected:   # avoid two whitelist rows resolving to same food
        unmatched.append(entry["name"] + " (dup of %s)" % selected[fdc]["name"]); continue
    e = dict(entry); e["_fdc"] = fdc; e["_desc"] = desc
    selected[fdc] = e

# ---------------------------------------------------------------------------
# 4. Stream nutrient values for selected foods only
# ---------------------------------------------------------------------------
nutr = {fdc: {} for fdc in selected}   # fdc -> {nutrient_id: amount}
with open(os.path.join(RAW, "food_nutrient.csv"), newline="", encoding="utf-8") as f:
    rdr = csv.reader(f)
    header = next(rdr)
    i_fdc, i_nut, i_amt = header.index("fdc_id"), header.index("nutrient_id"), header.index("amount")
    for row in rdr:
        fdc = row[i_fdc]
        if fdc in nutr and row[i_nut] in WANTED_IDS:
            try:
                nutr[fdc][row[i_nut]] = float(row[i_amt])
            except ValueError:
                pass

# ---------------------------------------------------------------------------
# 5. Portions (household measures) for selected foods
# ---------------------------------------------------------------------------
unit_map = {r["id"]: r["name"] for r in load_csv("measure_unit.csv")}
portions = {fdc: [] for fdc in selected}
for r in load_csv("food_portion.csv"):
    fdc = r["fdc_id"]
    if fdc not in portions:
        continue
    try:
        grams = float(r["gram_weight"])
    except (ValueError, KeyError):
        continue
    if grams <= 0:
        continue
    amount = r.get("amount") or ""
    unit = unit_map.get(r.get("measure_unit_id"), "")
    modifier = (r.get("modifier") or "").strip()
    if unit in ("undetermined", ""):
        unit = modifier or (r.get("portion_description") or "").strip() or "serving"
        modifier = ""                       # modifier became the unit; don't repeat it
    if modifier and modifier.lower() == unit.lower():
        modifier = ""                       # avoid "oz oz"
    try:
        amt_num = float(amount) if amount else 1.0
    except ValueError:
        amt_num = 1.0
    amt_disp = (str(int(amt_num)) if amt_num == int(amt_num) else str(amt_num))
    label = " ".join(x for x in [amt_disp, unit, modifier] if x).strip()
    portions[fdc].append({"label": label[:48], "grams": round(grams, 1)})

# ---------------------------------------------------------------------------
# 6. Build output food objects
# ---------------------------------------------------------------------------
def val(d, nid, fallbacks=()):
    if str(nid) in d:
        return d[str(nid)]
    for fb in fallbacks:
        if fb is not None and str(fb) in d:
            return d[str(fb)]
    return None

def fa(d, key):
    prim, fb = FA[key]
    v = val(d, prim)
    if (v is None or v == 0) and fb is not None:
        v = val(d, fb)
    return v or 0.0

# Sensible household portions by category, used when USDA has no portion record for a food.
PORTION_FALLBACK = {
  "Eggs & Dairy":          [{"label":"1 cup","grams":245},{"label":"1/2 cup","grams":123}],
  "Protein":               [{"label":"3 oz","grams":85},{"label":"4 oz","grams":113}],
  "Seafood":               [{"label":"3 oz","grams":85},{"label":"1 fillet","grams":113}],
  "Grains & Starches":     [{"label":"1/2 cup cooked","grams":100},{"label":"1 oz","grams":28}],
  "Legumes":               [{"label":"1/2 cup cooked","grams":90},{"label":"1 cup cooked","grams":180}],
  "Vegetables":            [{"label":"1 cup","grams":90},{"label":"1/2 cup","grams":45}],
  "Fruits":                [{"label":"1 cup","grams":150},{"label":"1 medium","grams":120}],
  "Nuts & Seeds":          [{"label":"1 oz","grams":28},{"label":"1 tbsp","grams":16}],
  "Fats & Oils":           [{"label":"1 tbsp","grams":14},{"label":"1 tsp","grams":4.5}],
  "Condiments & Misc":     [{"label":"1 tbsp","grams":15}],
  "Sweet Treats & Snacks": [{"label":"1 serving","grams":40}],
}

out_foods = []
report = []
for fdc, e in selected.items():
    d = nutr[fdc]
    dl = e["_desc"].lower()
    if any(k in dl for k in ["cooked","boiled","roasted","grilled","braised","baked","steamed","cooked with water","pan-browned"]):
        form = "cooked"
    elif "canned" in dl: form = "canned"
    elif (" dry" in dl or dl.endswith("dry")) and "curd" not in dl: form = "dry"  # "dry curd" cheese ≠ weigh-uncooked
    elif "raw" in dl: form = "raw"
    else: form = ""
    if "form" in e: form = e["form"]       # explicit override (the USDA description does not always say "dry")
    food = {"id": fdc, "name": e["name"], "cat": e["cat"], "usda": e["_desc"], "form": form}
    if e["name"] in BRANDS: food["brands"] = BRANDS[e["name"]]
    present = 0; tracked = 0
    for key, (prim, fbs, unit) in NUTRIENTS.items():
        v = val(d, prim, fbs)
        if key == "vit_d_ug" and (v is None):
            iu = val(d, VIT_D_IU)
            if iu is not None:
                v = round(iu * 0.025, 3)
        food[key] = round(v, 4) if isinstance(v, float) else (v or 0)
        if key not in ("kcal","protein_g","fat_g","carb_g") and key not in AA_KEYS:  # macros + amino acids excluded from micro completeness
            tracked += 1
            if v not in (None, 0):
                present += 1
    # derive omega-3 / omega-6
    ala, epa, dha, dpa, sda = fa(d,"ala"), fa(d,"epa"), fa(d,"dha"), fa(d,"dpa"), fa(d,"sda")
    la, aa, gla = fa(d,"la"), fa(d,"aa"), fa(d,"gla")
    omega3 = ala + epa + dha + dpa + sda
    omega6 = la + aa + gla
    food["omega3_g"] = round(omega3, 4)
    food["omega6_g"] = round(omega6, 4)
    food["epa_dha_mg"] = round((epa + dha) * 1000, 1)
    food["ala_g"] = round(ala, 4)
    food["omega9_g"] = round(fa(d, "oleic"), 4)   # oleic acid (non-essential MUFA), context only
    food["data_quality"] = round(present / tracked, 2) if tracked else 0
    # portions: dedupe by label, drop absurd whole-item footguns, cap to a sensible set,
    # and fall back to a category default if USDA had no usable portion for this food.
    seen = set(); plist = []
    for p in portions[fdc]:
        if p["label"] in seen:
            continue
        seen.add(p["label"]); plist.append(p)
    plist = [p for p in plist if p["grams"] <= 1200]   # drop "1 whole melon/breast/head", useless + footgun for portioning
    plist = plist[:5]
    # drop named USDA "yield" rows that print as a misleading household measure: their grams are the COOKED or
    # EDIBLE weight but the label names the dry / raw / in-shell amount ("¼ cup, dry, yields (132g)" of couscous
    # reads as 132g of dry couscous). Applied after the cap so no other row shifts in. A label that is not found
    # is reported, never silently skipped. Kept on purpose (2026-09-24 scan): raspberries "1 pint as purchased,
    # yields" and the frozen asparagus / snap peas "1 package (10 oz) yields", where the unit named is the thing
    # the client actually buys and measures.
    if e.get("drop_portions"):
        _drop = set(e["drop_portions"])
        _missing = _drop - {p["label"] for p in plist}
        if _missing:
            print("  ! drop_portions not found for %s: %s" % (e["name"], sorted(_missing)))
        plist = [p for p in plist if p["label"] not in _drop]
    # a household measure USDA does not carry, with its source on the row, goes after the USDA ones
    if e.get("add_portions"):
        _have = {p["label"] for p in plist}
        plist += [dict(x) for x in e["add_portions"] if x["label"] not in _have]
    # explicit household measures on the whitelist row win. SR Legacy has NO portion rows for some foods (vital
    # wheat gluten), and the category fallback then hands a dry flour the "3 oz / 4 oz" of cooked meat.
    if e.get("portions"):
        plist = [dict(x) for x in e["portions"]]
    if not plist:
        plist = [dict(x) for x in PORTION_FALLBACK.get(food["cat"], [{"label": "100 g", "grams": 100}])]
    food["portions"] = plist
    out_foods.append(food)
    report.append({"name": e["name"], "cat": e["cat"], "fdc": fdc, "usda_desc": e["_desc"],
                   "kcal": food["kcal"], "protein_g": food["protein_g"], "carb_g": food["carb_g"],
                   "fat_g": food["fat_g"], "omega3_g": food["omega3_g"], "epa_dha_mg": food["epa_dha_mg"],
                   "data_quality": food["data_quality"], "n_portions": len(plist)})

out_foods.sort(key=lambda x: (x["cat"], x["name"]))

# ---------------------------------------------------------------------------
# 6b. Recipe foods are built BELOW (after MANUAL_FOODS are appended) so recipes
#     can reference manual ingredients like PBfit / silken tofu / miso / kimchi.
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# 6b-2. Manual BRANDED foods (manufacturer label, not in USDA SR). High-fiber
#       functional foods clients use. Values are PER-100g (converted from the
#       per-serving label); a real serving portion is attached. Micros that the
#       brand doesn't publish are left at 0 (low data_quality, honest). "wheat"
#       is in the description so the gluten allergen filter catches them.
# ---------------------------------------------------------------------------
MANUAL_FOODS = [
  # NAME says "dry" (2026-09-24 sweep): these are the DRY label values (56g = 110 kcal), yet 196 kcal/100g looks
  # like a cooked-pasta density and every other pasta here is "cooked", so a client could weigh it cooked (~2.3x
  # the weight) and log a third of what the plan counts. Explicit id keeps saved plans and ids unchanged; the
  # "Carbe Diem high-protein pasta" / "Carbe Diem" template regexes still match.
  # RENAMED 2026-10-06 (a client audit) to "high-fiber": the box says "High Fiber" (24 g fiber, 8 g protein per 2 oz, ordinary
  # pasta protein), and the PDF tells clients to search their tracking app by the plan's wording. Same id; the template
  # options now say "Carbe Diem high-fiber pasta".
  {"name":"Carbe Diem high-fiber pasta, dry","id":"brand_carbe_diem_high_protein_pasta","cat":"Grains & Starches","form":"dry","brands":"Carbe Diem",
   "usda":"Carbe Diem high-fiber wheat pasta (manufacturer label; 56g/2oz dry serving)",
   "per100":{"kcal":196,"protein_g":14.3,"fat_g":0.9,"carb_g":71.4,"fiber_g":42.9,"sugar_g":0,"satfat_g":0,"sodium_mg":134,"iron_mg":1.25},
   "portions":[{"label":"1 serving (2 oz dry)","grams":56}]},
  {"name":"Mission Carb Balance tortilla, soft taco","cat":"Grains & Starches","form":"","brands":"Mission Carb Balance",
   "usda":"Mission Carb Balance soft taco wheat flour tortilla (manufacturer label; 42g each)",
   "per100":{"kcal":167,"protein_g":14.3,"fat_g":4.8,"carb_g":45.2,"fiber_g":35.7,"sugar_g":0,"satfat_g":1.2,"sodium_mg":762},
   "portions":[{"label":"1 tortilla","grams":42}]},
  {"name":"Mission Carb Balance tortilla, burrito (large)","cat":"Grains & Starches","form":"","brands":"Mission Carb Balance",
   "usda":"Mission Carb Balance burrito wheat flour tortilla (manufacturer label; 70g each = 110 kcal, 10p, 6f, 32c, 28 fiber)",
   "per100":{"kcal":157,"protein_g":14.3,"fat_g":8.6,"carb_g":45.7,"fiber_g":40.0,"sugar_g":0,"satfat_g":1.4,"sodium_mg":486},
   "portions":[{"label":"1 tortilla (large)","grams":70}]},
  # Re-verified 2026-09-23 against the CURRENT Mission label (missionfoods.com product page nutrition image,
  # "cb-soft-taco-whole-wheat-tortillas-nf-23"): 1 tortilla (43g) = 60 kcal, 5P, 3.5F, 1.5 sat fat, 330mg sodium,
  # 20C, 18 fiber, 0 sugar. Calories/protein/carbs/fibre were already right; fat (was 2g/tortilla), sat fat (0.4g)
  # and sodium (210mg) were from an older label and are corrected. The USDA branded rows that read 149-161 kcal /
  # 32-36g fibre per 100g are OTHER Mission products (28g fajita, 47g street-taco pair, 71g burrito), not this one.
  {"name":"Mission Carb Balance tortilla, whole wheat","cat":"Grains & Starches","form":"","brands":"Mission Carb Balance",
   "usda":"Mission Carb Balance whole wheat soft taco tortilla (label 1 tortilla = 43g: 60 kcal, 5P, 3.5F, 20C, 18 fiber, 330mg sodium; verified missionfoods.com label 2026-09)",
   "per100":{"kcal":140,"protein_g":11.6,"fat_g":8.1,"carb_g":46.5,"fiber_g":41.9,"sugar_g":0,"satfat_g":3.5,"sodium_mg":767.4,"calcium_mg":162.8,"iron_mg":1.16,"potassium_mg":69.8},
   "portions":[{"label":"1 tortilla","grams":43}]},
  # Psyllium husk: a near-zero-net-carb FIBER TOOL (USDA FDC 2417873, ~70g soluble fiber/100g). On an extreme
  # cut (e.g. 1500 kcal / 200g protein), 30g+ fiber cannot come from beans (too carb-dense) — a tablespoon of
  # psyllium adds ~3.5g fiber for ~1g net carb. cat "Condiments & Misc" so it never anchors a meal; boostFiber
  # adds it. kcal is the fiber-aware Atwater value (4*net + 2*fiber = 180), which also matches psyllium's true
  # physiological ~1.8 kcal/g (the 350 "calories" on the tub is the gross combustion value, not metabolizable).
  # STORE CHECK 2026-09-24 (values deliberately NOT changed, pending a product decision). The psyllium clients can
  # buy everywhere is NOT plain husk: Metamucil Sugar-Free (Orange Smooth or Unflavored Smooth; metamucil.com panel
  # + NIH DSLD 303994) and its Walmart copy Equate Daily Fiber Sugar-Free are psyllium + maltodextrin (+ aspartame
  # in the flavored ones): 11.6g = 30 kcal, 10-11C, 6 fiber = ~259 kcal, 86-95C, 51.7 fiber per 100g. Plain husk
  # on the same shelves: Konsyl Daily Psyllium Fiber (Walmart/Target; konsyl.com panel + OFF 610858001014) 6g =
  # 20 kcal, 5C, 5 fiber = 333 / 83.3 / 83.3; NOW Psyllium Husk Powder (OFF 733739059758 + DSLD 50965) 9g = 30
  # kcal, 8C, 7 fiber = 333 / 88.9 / 77.8. This entry's carb/fiber are NOW Whole Psyllium Husks (10g = 2 level tbsp
  # = 35 kcal, 8C, 7 fiber, 10mg Na). Its "1 tbsp = 5g" row is whole husks; "1 tsp = 3g" is powder (whole husks
  # are ~1.7g per tsp; powder is ~9g per tbsp).
  {"name":"Psyllium husk","cat":"Condiments & Misc","form":"",
   "usda":"Psyllium husk, whole (USDA FDC 2417873). Fiber supplement, ~70g soluble fiber/100g; metabolizable kcal is low (fiber-aware).",
   "per100":{"kcal":180,"protein_g":0,"fat_g":0,"carb_g":80,"fiber_g":70,"sugar_g":0,"satfat_g":0,"sodium_mg":35,"potassium_mg":200},
   "portions":[{"label":"1 tbsp","grams":5},{"label":"1 tsp","grams":3}]},
  # --- EXTREME-CUT enablers (researched + USDA/label-verified 2026-06-20). Ultra-lean, high protein-per-
  # calorie proteins that let a plan hit aggressive macros like 1500 kcal / 200g protein. Soy protein isolate
  # is THE vegan tool: ~22g protein per 100 kcal on the retail label (highest protein-per-calorie food that exists) — without an
  # isolate a vegan literally cannot reach 200g protein at 1500 kcal. ---
  # Switched 2026-09-23 from USDA SR (335 kcal, 88.3P) to the NOW Sports Soy Protein Isolate label (USDA FDC Branded
  # 2378495 + Open Food Facts 733739021526 agree): 24g = 90 kcal, 20P, 0.5F, 0C, 170mg Na, Ca 193mg, Fe 3mg ->
  # 375 kcal/100g. Every retail isolate label sits ~370-400 (Bob's Red Mill 368-400, so it is no longer named);
  # the SR value matched none. Mg/P/Zn/Cu/Mn/folate kept from USDA SR 174276 (not on the label).
  {"name":"Soy protein isolate, powder","cat":"Protein","form":"","brands":"NOW Sports",
   "usda":"Soy protein isolate. NOW Sports Soy Protein Isolate label (24g: 90 kcal, 20P, 0.5F, 0C; verified USDA FDC 2378495 + Open Food Facts, 2026-09); micros from USDA FDC 174276. Near-zero carb/fat; the leanest plant protein per calorie.",
   "per100":{"kcal":375,"protein_g":83.3,"fat_g":2.1,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":0,"sodium_mg":708.3,"calcium_mg":804.2,"iron_mg":12.5,"potassium_mg":58.3,"magnesium_mg":39,"phosphorus_mg":776,"zinc_mg":4.0,"copper_mg":1.6,"manganese_mg":1.5,"folate_ug":180},
   "portions":[{"label":"1 scoop (30g)","grams":30}]},
  # PREPARED SEITAN, as sold and eaten (replaces the flour that used to be served under the seitan name). Upton's
  # Naturals Traditional Seitan, current US label (uptonsnaturals.com, 2026-09): 2 oz (57g) = 90 kcal, 18P, 0.5F,
  # 0 sat, 5C, <1g fiber (stored 0.5g, the bottom of FDA's "<1g" band, as Open Food Facts records it), 0 sugar,
  # 440mg Na, Ca 40mg, Fe 1.4mg, K 60mg. Open Food Facts 705105357713 (2026-08) and USDA FDC Branded 1492993 agree.
  # Brands disagree by more than 10% (Sweet Earth Traditional 153 kcal/100g, WestSoy 141, Blackbird 118, Wegmans
  # 106, Franklin Farms 95), so the entry names only Upton's. The NAME keeps " / wheat gluten" on purpose: 4 of the
  # 8 seitan templates still say "Seitan / wheat gluten" and 4 say "Seitan"; this name satisfies both, so none of
  # them goes unresolved after the flour was renamed. Explicit id keeps the slash out of the id.
  {"name":"Seitan / wheat gluten, prepared (ready-to-eat)","id":"brand_seitan_prepared_ready_to_eat","cat":"Protein","form":"cooked","brands":"Upton's Naturals Traditional Seitan",
   "usda":"Seitan, ready-to-eat wheat gluten. Upton's Naturals Traditional Seitan (label 2 oz = 57g: 90 kcal, 18P, 0.5F, 5C, <1 fiber, 0 sugar, 440mg sodium; verified uptonsnaturals.com + Open Food Facts 705105357713 + USDA FDC 1492993, 2026-09). Water, vital wheat gluten, soy sauce (soybeans, wheat), whole wheat flour. Contains wheat, soy.",
   "per100":{"kcal":157.9,"protein_g":31.6,"fat_g":0.9,"carb_g":8.8,"fiber_g":0.9,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":771.9,"calcium_mg":70.2,"iron_mg":2.46,"potassium_mg":105.3},
   "portions":[{"label":"3 oz","grams":85},{"label":"4 oz","grams":113},{"label":"2 oz (label serving)","grams":57}]},
  {"name":"Pea protein isolate, powder","cat":"Protein","form":"","brands":"NOW Sports, Naked Pea, Anthony's",
   "usda":"Pea protein isolate, pure single-source (manufacturer label; ~80g protein/100g). Soy-free vegan isolate. Distinct from the pea+rice blend.",
   "per100":{"kcal":375,"protein_g":80,"fat_g":7,"carb_g":7,"fiber_g":6,"sugar_g":0,"satfat_g":0.8,"sodium_mg":1100,"iron_mg":12,"potassium_mg":40},
   "portions":[{"label":"1 scoop (33g)","grams":33}]},
  {"name":"Micellar casein, powder","cat":"Eggs & Dairy","form":"","brands":"Optimum Nutrition, NOW, Naked Casein",
   "usda":"Micellar casein (manufacturer label; ~82g protein/100g, slow-digesting). High-satiety evening protein on a cut.",
   "per100":{"kcal":357,"protein_g":82,"fat_g":1.5,"carb_g":7,"fiber_g":0,"sugar_g":4,"satfat_g":1,"sodium_mg":600,"calcium_mg":1400,"phosphorus_mg":800,"magnesium_mg":25,"zinc_mg":3.0,"riboflavin_mg":0.5,"vit_b12_ug":1.5,"selenium_ug":30},
   "portions":[{"label":"1 scoop (33g)","grams":33}]},
  {"name":"Skyr, plain nonfat","cat":"Eggs & Dairy","form":"","brands":"Siggi's",
   "usda":"Skyr, plain nonfat Icelandic strained yogurt (manufacturer label). ~11g protein/100g, near-zero fat; leanest strained dairy.",
   "per100":{"kcal":63,"protein_g":11,"fat_g":0.2,"carb_g":4,"fiber_g":0,"sugar_g":3.5,"satfat_g":0.1,"sodium_mg":52,"calcium_mg":150,"potassium_mg":160},
   "portions":[{"label":"1 cup (170g)","grams":170},{"label":"1 container (150g)","grams":150}]},
  # Re-based 2026-09-24. The old cooked values (150 kcal, 28P, 3.5F) claimed a "manufacturer label" but trace to
  # none: ground chicken breast is labelled RAW, no USDA branded record matches them raw or cooked, and neither
  # named brand fits (Just Bare has no ground breast in FDC; Isernio's is regular ground chicken). Now: PERDUE Fresh
  # Ground Chicken Breast (national brand, sold as 98% lean / 2% fat like this entry's name), raw label 4 oz (112g)
  # = 120 kcal, 25P, 2F, 0.5 sat,
  # 0C, 80mg chol, 75mg Na, K 451mg (perdue.com; USDA FDC Branded 2631696 and Open Food Facts 072745063282 agree),
  # converted to cooked with the USDA yield x1.335 (SR "Chicken, ground, raw" 17.44P -> "crumbles, cooked,
  # pan-browned" 23.28P, the same factor app/data/yields.js uses). Perdue's own label agrees: "4 oz (112g) raw /
  # 3 oz (84g) cooked" is x1.333. Other micros and amino acids: USDA SR 171477 chicken breast, roasted, scaled by
  # protein (29.8 / 31.02); its fatty-acid split scaled by fat. Label Ca/Fe are left to SR because the sources
  # disagree (perdue.com old-format panel 6% / 2% DV, FDC 5.6mg / 0mg, Open Food Facts 0 / 0.9mg).
  {"name":"Ground chicken breast, 98% lean, cooked","cat":"Protein","form":"cooked","brands":"Perdue Fresh Ground Chicken Breast (98% lean)",
   "usda":"Ground chicken breast 98/2, cooked. Perdue Fresh Ground Chicken Breast raw label (4 oz = 112g raw: 120 kcal, 25P, 2F, 0.5 sat, 75mg sodium; verified perdue.com + USDA FDC 2631696 + Open Food Facts, 2026-09) converted to cooked with the USDA yield x1.335 (label: 112g raw = 84g cooked). Other micros from USDA SR 171477 chicken breast, roasted, scaled by protein.",
   "per100":{"kcal":143.0,"protein_g":29.8,"fat_g":2.4,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":0.6,"transfat_g":0,"cholesterol_mg":95.4,
             "sodium_mg":89.4,"potassium_mg":537.6,"calcium_mg":14.4,"iron_mg":0.999,"vit_d_ug":0.096,
             "magnesium_mg":27.9,"phosphorus_mg":219,"zinc_mg":0.961,"copper_mg":0.047,"manganese_mg":0.016,"selenium_ug":26.5,
             "vit_a_ug":5.76,"vit_e_mg":0.259,"vit_k_ug":0.288,"thiamin_mg":0.067,"riboflavin_mg":0.11,"niacin_mg":13.2,"pantothenic_mg":0.927,
             "vit_b6_mg":0.576,"folate_ug":3.84,"vit_b12_ug":0.327,"choline_mg":81.9,
             "mufa_g":0.834,"pufa_g":0.518,"omega3_g":0.047,"ala_g":0.02,"omega6_g":0.437,"omega9_g":0.699,"epa_dha_mg":20.2,
             "histidine_g":0.9251,"isoleucine_g":1.5736,"leucine_g":2.2364,"lysine_g":2.5314,"methionine_g":0.8252,"cystine_g":0.3814,
             "phenylalanine_g":1.1826,"tyrosine_g":1.0058,"threonine_g":1.2585,"tryptophan_g":0.3478,"valine_g":1.4785},
   "portions":[{"label":"4 oz cooked","grams":112}]},
  {"name":"Flounder/sole, cooked","cat":"Seafood","form":"cooked",
   "usda":"Flatfish (flounder & sole species), cooked, dry heat (USDA FDC 174197). Very lean white fish.",
   "per100":{"kcal":86,"protein_g":17.8,"fat_g":1.16,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":0.27,"sodium_mg":363,"potassium_mg":292,"selenium_ug":36.5,"vit_b12_ug":2.1},
   "portions":[{"label":"1 fillet (~127g)","grams":127},{"label":"4 oz","grams":113}]},
  {"name":"Lobster, cooked","cat":"Seafood","form":"cooked",
   "usda":"Lobster, northern, cooked, moist heat (USDA FDC 174209). Very lean shellfish.",
   "per100":{"kcal":89,"protein_g":19,"fat_g":0.86,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":0.2,"sodium_mg":486,"potassium_mg":230,"zinc_mg":3.5,"selenium_ug":42},
   "portions":[{"label":"1 cup","grams":145},{"label":"4 oz","grams":113}]},
  {"name":"Octopus, cooked","cat":"Seafood","form":"cooked",
   "usda":"Octopus, common, cooked, moist heat (USDA FDC 174249). Lean, very high protein.",
   "per100":{"kcal":164,"protein_g":29.82,"fat_g":2.08,"carb_g":4.4,"fiber_g":0,"sugar_g":0,"satfat_g":0.46,"sodium_mg":460,"potassium_mg":630,"iron_mg":9.5,"vit_b12_ug":36},
   "portions":[{"label":"4 oz","grams":113}]},
  # Switched 2026-09-23 from the generic USDA SR row (216 kcal/100g) to the BOB'S RED MILL LABEL, because the entry
  # names Bob's and clients scan Bob's barcode: 216 vs the label's 333-346 kcal/100g is a 55-60% gap. Current label
  # (bobsredmill.com): 1/4 cup = 13g = 45 kcal, 2P, 0F, 9C, 5 fiber, 0 sugar, 0 sodium, Ca 11mg, Fe 2mg, K 156mg.
  # Second sources (USDA FDC Branded 2632580/2673427, Open Food Facts 039978113214) carry the prior 15g = 50 kcal
  # label, i.e. 333 kcal/100g, within 4% of the current one. Magnesium kept from USDA SR 169722 (not on the label).
  # Name kept as "Wheat bran, crude" so the food id (saved plans) and the fibre-boost /wheat bran/ match don't move.
  # Description carries no dairy words: "yogurt" here made the dairy screen exclude wheat bran for dairy-free clients.
  {"name":"Wheat bran, crude","cat":"Grains & Starches","form":"","brands":"Bob's Red Mill",
   "usda":"Bob's Red Mill Wheat Bran (label 1/4 cup = 13g: 45 kcal, 2P, 0F, 9C, 5 fiber, 0 sugar, 0mg sodium; verified bobsredmill.com 2026-09, prior 15g = 50 kcal label in USDA FDC 2632580 + Open Food Facts). Magnesium from USDA SR 169722. A low-fat fiber tool to stir into oats or a bowl.",
   "per100":{"kcal":346.2,"protein_g":15.4,"fat_g":0.0,"carb_g":69.2,"fiber_g":38.5,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":0.0,"calcium_mg":84.6,"potassium_mg":1200.0,"magnesium_mg":611,"iron_mg":15.4},
   "portions":[{"label":"1/4 cup","grams":13},{"label":"2 tbsp","grams":6.5}]},
  # --- gut-health foods (prebiotic + fermented/live-culture). Approx label/USDA per-100g. ---
  {"name":"Garlic, raw","cat":"Vegetables","form":"raw","usda":"Garlic, raw (prebiotic allium, inulin/FOS)",
   "per100":{"kcal":149,"protein_g":6.4,"fat_g":0.5,"carb_g":33.1,"fiber_g":2.1,"sugar_g":1.0,"satfat_g":0.09,"sodium_mg":17,"calcium_mg":181,"iron_mg":1.7,"potassium_mg":401,"magnesium_mg":25,"vit_c_mg":31.2,"vit_b6_mg":1.235,"manganese_mg":1.672},
   "portions":[{"label":"1 clove","grams":3},{"label":"1 tbsp minced","grams":8}]},
  # Switched 2026-09-23 to the LIFEWAY Lowfat Plain Unsweetened label (the brand named here; USDA FDC Branded 2418096
  # + Open Food Facts 017077102322 agree): 1 cup (240 mL) = 110 kcal, 10P, 2F, 1.5 sat, 9C, 9 sugar, 125mg Na, Ca 390mg,
  # K 380mg. Per 100g uses this entry's own 1 cup = 243g. NOTE the label itself is generous: 4/4/9 on its macros is
  # 94 kcal, 16 over the declared 110; stored as declared because that is what a client scanning it logs.
  # Phosphorus/Mg/Zn/B2/B12/A/D kept from the prior generic values (not on the label).
  {"name":"Kefir, plain low-fat","cat":"Eggs & Dairy","form":"","brands":"Lifeway",
   "usda":"Kefir, plain low-fat cultured milk (live probiotic cultures). Lifeway Lowfat Plain Unsweetened label (1 cup = 110 kcal, 10P, 2F, 9C; verified USDA FDC 2418096 + Open Food Facts, 2026-09)",
   "per100":{"kcal":45.3,"protein_g":4.1,"fat_g":0.8,"carb_g":3.7,"fiber_g":0,"sugar_g":3.7,"satfat_g":0.6,"sodium_mg":51.4,"calcium_mg":160.5,"potassium_mg":156.4,"phosphorus_mg":100,"magnesium_mg":12,"zinc_mg":0.5,"riboflavin_mg":0.17,"vit_b12_ug":0.4,"vit_a_ug":20,"vit_d_ug":1.0},
   "portions":[{"label":"1 cup","grams":243},{"label":"1/2 cup","grams":122}]},
  {"name":"Sauerkraut (raw, live cultures)","cat":"Vegetables","form":"",
   "usda":"Sauerkraut, fermented raw/refrigerated (live cultures)",
   "per100":{"kcal":19,"protein_g":0.9,"fat_g":0.1,"carb_g":4.3,"fiber_g":2.9,"sugar_g":1.8,"satfat_g":0,"sodium_mg":661,"calcium_mg":30,"iron_mg":1.5,"potassium_mg":170,"vit_c_mg":15},
   "portions":[{"label":"2 tbsp","grams":30},{"label":"1/4 cup","grams":36}]},
  {"name":"Kimchi","cat":"Vegetables","form":"",
   "usda":"Kimchi, fermented (live cultures)",
   "per100":{"kcal":15,"protein_g":1.1,"fat_g":0.5,"carb_g":2.4,"fiber_g":1.6,"sugar_g":1.0,"satfat_g":0,"sodium_mg":498,"calcium_mg":33,"iron_mg":2.5,"potassium_mg":151,"vit_c_mg":18},
   "portions":[{"label":"2 tbsp","grams":30},{"label":"1/4 cup","grams":42}]},
  # Vegan kimchi, plant-, kosher- & halal-safe; macros ~ traditional kimchi.
  # NOTE: keep the description free of words like "shrimp"/"fish", the keyword screens match on
  # substrings, so a negation ("no shrimp") would falsely flag it as shellfish/non-kosher.
  {"name":"Vegan kimchi","cat":"Vegetables","form":"",
   "usda":"Kimchi, vegan / plant-based (no animal ingredients; live cultures)",
   "per100":{"kcal":15,"protein_g":1.1,"fat_g":0.5,"carb_g":2.6,"fiber_g":1.6,"sugar_g":1.1,"satfat_g":0,"sodium_mg":480,"calcium_mg":33,"iron_mg":2.5,"potassium_mg":151,"vit_c_mg":18},
   "portions":[{"label":"2 tbsp","grams":30},{"label":"1/4 cup","grams":42}]},
  {"name":"Miso paste","cat":"Condiments & Misc","form":"",
   "usda":"Miso, fermented soybean paste (live cultures)",
   "per100":{"kcal":199,"protein_g":12.8,"fat_g":6.0,"carb_g":26.5,"fiber_g":5.4,"sugar_g":6.2,"satfat_g":1.0,"sodium_mg":3728,"calcium_mg":57,"iron_mg":2.5,"potassium_mg":210},
   "portions":[{"label":"1 tbsp","grams":18}]},
  # --- high-protein / low-cal recipe ingredients (label or USDA per-100g) ---
  {"name":"PBfit powdered peanut butter","cat":"Nuts & Seeds","form":"","brands":"PBfit, PB2",
   "usda":"Powdered peanut butter (PBfit / PB2 style, ~87% defatted; manufacturer label)",
   "per100":{"kcal":440,"protein_g":50.0,"fat_g":15.6,"carb_g":31.2,"fiber_g":12.5,"sugar_g":12.5,"satfat_g":3.1,"sodium_mg":562,"potassium_mg":700,"magnesium_mg":160,"iron_mg":3.8},
   "portions":[{"label":"2 tbsp","grams":16},{"label":"1 tbsp","grams":8}]},
  # FIRM TOFU, re-based 2026-09-24 to what clients buy and scan. The old USDA SR row 172475 ("Tofu, raw, firm,
  # prepared with calcium sulfate": 144 kcal, 17.3P, 8.7F, 683mg Ca per 100g) is a pressed density; US water-packed
  # firm / extra-firm tofu is 82-114 kcal/100g (House Foods 82, Nasoya Firm 94, Nasoya Extra Firm 106), so a client
  # weighing store tofu logged about a quarter less than the plan counted. Now the label of Nasoya ("America's #1
  # tofu brand", nasoya.com) ORGANIC EXTRA FIRM, the variant Nasoya leads with and the one meal-prep recipes (pressed,
  # baked, stir-fried) call for: 3 oz (85g) = 90 kcal, 9P, 4.5F, 0.5 sat, 2.5 poly, 1 mono, 3C, 1 fiber, 1 sugar,
  # 5mg Na, 0 chol (nasoya.com label image; USDA FDC Branded 1487112/1195071 agree). Ca 118 / Fe 1.69 / K 82 per
  # 100g are FDC's amounts for the label's 10% / 8% / 2% DV. Label-silent nutrients come from SR 172475 SCALED:
  # minerals, vitamins and amino acids by the protein ratio (10.6 / 17.27 = 0.614, protein tracks the soybean
  # solids that carry them); omega-3/6 by the label's PUFA ratio, oleic by its MUFA ratio. Nasoya Organic Firm
  # (94 kcal, 9.4P) is 11% lighter. Same name + id "172475" as the old USDA row, so 56 template slots and saved
  # plans still resolve; "0.25 block" (a USDA block) is replaced by Nasoya's own 3 oz serving and 14 oz package.
  {"name":"Tofu, firm","id":"172475","cat":"Protein","form":"raw","brands":"Nasoya Organic Extra Firm",
   "usda":"Tofu, firm / extra firm, water-packed. Nasoya Organic Extra Firm Tofu (label 3 oz = 85g: 90 kcal, 9P, 4.5F, 0.5 sat, 3C, 1 fiber, 1 sugar, 5mg sodium; verified nasoya.com label + USDA FDC 1487112, 2026-09). Other micros and amino acids scaled from USDA SR 172475 by protein. Water, organic soybeans, calcium sulfate, magnesium chloride.",
   "per100":{"kcal":105.9,"protein_g":10.6,"fat_g":5.3,"carb_g":3.5,"fiber_g":1.2,"sugar_g":1.2,"satfat_g":0.6,"mufa_g":1.2,"pufa_g":2.9,"transfat_g":0,"cholesterol_mg":0,
             "sodium_mg":5.9,"calcium_mg":118,"iron_mg":1.69,"potassium_mg":82,"vit_d_ug":0,
             "magnesium_mg":35.6,"phosphorus_mg":116.6,"zinc_mg":0.964,"copper_mg":0.232,"manganese_mg":0.725,"selenium_ug":10.7,"vit_c_mg":0.123,
             "thiamin_mg":0.097,"riboflavin_mg":0.063,"niacin_mg":0.234,"pantothenic_mg":0.082,"vit_b6_mg":0.056,"folate_ug":17.8,
             "omega3_g":0.343,"ala_g":0.343,"omega6_g":2.557,"omega9_g":1.185,"epa_dha_mg":0,
             "histidine_g":0.2645,"isoleucine_g":0.5211,"leucine_g":0.8544,"lysine_g":0.542,"methionine_g":0.1295,"cystine_g":0.035,
             "phenylalanine_g":0.5125,"tyrosine_g":0.4303,"threonine_g":0.4818,"tryptophan_g":0.1442,"valine_g":0.534},
   "portions":[{"label":"3 oz","grams":85},{"label":"0.5 cup","grams":126},{"label":"1 package (14 oz)","grams":397}]},
  # Silken checked 2026-09-24 and left as is: 52 kcal/100g sits within ~10% of the silken labels (Nasoya Silken 47,
  # Mori-Nu Silken Soft 53, Firm 59), so it does not have the firm-tofu density problem.
  {"name":"Tofu, silken","cat":"Protein","form":"",
   "usda":"Tofu, silken / soft (USDA)",
   "per100":{"kcal":52,"protein_g":4.8,"fat_g":2.7,"carb_g":2.0,"fiber_g":0.2,"sugar_g":1.0,"satfat_g":0.4,"sodium_mg":4,"calcium_mg":32,"iron_mg":1.1,"potassium_mg":150,"magnesium_mg":27},
   "portions":[{"label":"1/2 cup","grams":124},{"label":"3 oz","grams":85}]},
  {"name":"Pumpkin, canned","cat":"Vegetables","form":"canned",
   "usda":"Pumpkin, canned, without salt (USDA)",
   "per100":{"kcal":34,"protein_g":1.1,"fat_g":0.28,"carb_g":8.1,"fiber_g":2.9,"sugar_g":3.3,"satfat_g":0.15,"sodium_mg":5,"potassium_mg":206,"calcium_mg":26,"iron_mg":1.4,"vit_a_ug":778,"vit_c_mg":4.2},
   "portions":[{"label":"1/2 cup","grams":123},{"label":"1 cup","grams":245}]},
  {"name":"Pickles, dill","cat":"Vegetables","form":"",
   "usda":"Pickles, cucumber, dill (USDA)",
   "per100":{"kcal":12,"protein_g":0.5,"fat_g":0.2,"carb_g":2.6,"fiber_g":1.0,"sugar_g":1.3,"satfat_g":0,"sodium_mg":1208,"potassium_mg":75,"vit_k_ug":47},
   "portions":[{"label":"1 spear","grams":35},{"label":"1 medium","grams":65}]},
  {"name":"Nutritional yeast","cat":"Condiments & Misc","form":"",
   "usda":"Nutritional yeast, fortified flakes (manufacturer label)",
   "per100":{"kcal":345,"protein_g":45.0,"fat_g":5.0,"carb_g":36.0,"fiber_g":21.0,"sugar_g":0,"satfat_g":0.8,"sodium_mg":150,"potassium_mg":2000,"iron_mg":5,"zinc_mg":25,"vit_b6_mg":17,"thiamin_mg":40,"riboflavin_mg":38,"niacin_mg":250,"folate_ug":2400,"vit_b12_ug":480},
   "portions":[{"label":"2 tbsp","grams":10},{"label":"1 tbsp","grams":5}]},
  {"name":"Seaweed snack, roasted","cat":"Vegetables","form":"",
   "usda":"Roasted seaweed snack, oil-roasted nori (typical gimMe/SeaSnax label; ~1g protein, ~70mg sodium per 5g pack). Eaten in tiny amounts; per-100g is a label estimate.",
   "per100":{"kcal":520,"protein_g":26.0,"fat_g":36.0,"carb_g":30.0,"fiber_g":5.0,"sugar_g":0,"satfat_g":4.0,"sodium_mg":1400,"potassium_mg":1600,"iron_mg":18,"calcium_mg":150,"vit_a_ug":520,"vit_c_mg":35},
   "portions":[{"label":"1 pack (5g)","grams":5},{"label":"2 packs","grams":10}]},
  # PEDRO CAMACHO, 2026-10-02: plain sushi nori for his Saturday sushi rolls (the roasted seaweed SNACK above is oiled and
  # salted, 520 kcal/100 g). USDA Branded Food records read 2026-10-02 (api.nal.usda.gov, "sushi nori"): every label gives
  # 1 sheet (2.1 to 2.8 g) = 1 g protein, 1 g carbs, 1 g fiber, 0 g fat, but the calories split between 5 and 10 a sheet.
  # East West Tea Co. Toasted Sushi Nori (1862744) and Great Eastern Sun Organic Pacific Sushi Nori (2488997) state 5 kcal
  # per 2.5 g sheet, the figure that matches their own protein and fibre (the 10-kcal labels audit 1.67x over their macros),
  # so East West's label is used: per 100 g 200 kcal, 40 P, 40 C, 40 fibre, 0 F, 120 mg sodium. A meal uses 2 to 4 sheets.
  {"name":"Nori sheets","cat":"Vegetables","form":"","brands":"any plain sushi nori (not the oiled snack packs)",
   "usda":"Sushi nori, plain roasted seaweed sheets (label 1 sheet = 2.5 g: 5 kcal, 1P, 0F, 1C, 1 fiber; USDA Branded 1862744 and 2488997, read 2026-10-02)",
   "per100":{"kcal":200,"protein_g":40.0,"fat_g":0,"carb_g":40.0,"fiber_g":40.0,"sugar_g":0,"satfat_g":0,"sodium_mg":120},
   "portions":[{"label":"1 sheet","grams":2.5}]},
  # PEDRO CAMACHO, 2026-10-02: turkey pepperoni for his Saturday naan pizzas. Hormel Turkey Pepperoni, USDA Branded Food
  # record 2595836 (published 2023-07-13, read 2026-10-02 via api.nal.usda.gov): 17 slices (30 g) = 70 kcal, 9 g protein,
  # 0 g carbs, 4 g fat (1.5 sat), 570 mg sodium; per 100 g 233 kcal, 30 P, 0 C, 13.3 F, 5.0 sat, 1900 mg Na. Store brands
  # match it (Great Value 1888551: 16 slices, 28 g = 70 kcal, 9 P, 4 F). Hand-added only (isHandOnly).
  {"name":"Turkey pepperoni","cat":"Protein","form":"","brands":"Hormel Turkey Pepperoni, Great Value",
   "usda":"Hormel Turkey Pepperoni (label 17 slices = 30 g: 70 kcal, 9P, 4F, 0C, 570 mg sodium; USDA Branded 2595836, read 2026-10-02)",
   "per100":{"kcal":233,"protein_g":30.0,"fat_g":13.3,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":5.0,"sodium_mg":1900},
   "portions":[{"label":"1 slice","grams":1.8},{"label":"17 slices","grams":30}]},
  # PEDRO CAMACHO, 2026-10-05: ramen noodles for his Saturday ramen bowl. Lotus Foods Millet & Brown Rice Ramen noodle cakes,
  # USDA Branded Food record 2395211 (published 2022-12-22, read 2026-10-05 via api.nal.usda.gov): 1/2 cake (35 g) = 120 kcal,
  # 4 g protein, 23 g carbs, 1.5 g fat (0 sat), 2 g fibre, 0 mg sodium; per 100 g 343 kcal, 11.4 P, 65.7 C, 4.29 F, 5.7 fibre.
  # Ingredients: organic brown rice flour, organic millet flour (not fried, unlike instant ramen blocks, and no seasoning
  # packet). Weighed DRY: 1 cake = 70 g. Hand-added only (isHandOnly).
  {"name":"Ramen noodles, dry","cat":"Grains & Starches","form":"dry","brands":"Lotus Foods Millet & Brown Rice Ramen (plain noodle cakes, not instant ramen)",
   "usda":"Lotus Foods Millet & Brown Rice Ramen noodle cakes (label 1/2 cake = 35 g: 120 kcal, 4P, 1.5F, 23C, 2 fiber, 0 mg sodium; USDA Branded 2395211, read 2026-10-05)",
   "per100":{"kcal":343,"protein_g":11.4,"fat_g":4.29,"carb_g":65.7,"fiber_g":5.7,"sugar_g":0,"satfat_g":0,"sodium_mg":0,"potassium_mg":483,"iron_mg":2.86,"calcium_mg":74},
   "portions":[{"label":"1 cake","grams":70}]},
  {"name":"Sugar-free gelatin, prepared","cat":"Sweet Treats & Snacks","form":"",
   "usda":"Sugar-free gelatin dessert (Jell-O style), prepared with water (label)",
   "per100":{"kcal":8,"protein_g":1.7,"fat_g":0,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":0,"sodium_mg":42},
   "portions":[{"label":"1/2 cup","grams":117},{"label":"1 cup","grams":234}]},
  {"name":"Sugar-free instant pudding mix, dry","cat":"Condiments & Misc","form":"dry",
   "usda":"Sugar-free fat-free instant pudding mix, dry powder (label)",
   "per100":{"kcal":286,"protein_g":0,"fat_g":0,"carb_g":71,"fiber_g":0,"sugar_g":0,"satfat_g":0,"sodium_mg":3857},
   "portions":[{"label":"1 serving dry","grams":8}]},
  # --- low-cal flavor condiments (used as fixed meal "extras") ---
  {"name":"Cheese, reduced-fat cheddar","cat":"Eggs & Dairy","form":"","brands":"Tillamook",
   "usda":"Cheese, cheddar, reduced fat (2% milk; label)",
   "per100":{"kcal":282,"protein_g":24.0,"fat_g":18.0,"carb_g":6.0,"fiber_g":0,"sugar_g":1.0,"satfat_g":11.0,"sodium_mg":700,"calcium_mg":700,"phosphorus_mg":540,"zinc_mg":3.5,"selenium_ug":14,"riboflavin_mg":0.35,"vit_b12_ug":0.9,"vit_a_ug":240},
   "portions":[{"label":"1 slice","grams":20},{"label":"1 oz","grams":28}]},
  {"name":"Mayonnaise, light","cat":"Condiments & Misc","form":"","brands":"Hellmann's Light",
   "usda":"Mayonnaise, light / reduced-fat (label)",
   "per100":{"kcal":233,"protein_g":0.5,"fat_g":23.3,"carb_g":6.7,"fiber_g":0,"sugar_g":0,"satfat_g":3.5,"sodium_mg":733},
   "portions":[{"label":"1 tbsp","grams":15}]},
  {"name":"BBQ sauce","cat":"Condiments & Misc","form":"",
   "usda":"Barbecue sauce (USDA)",
   "per100":{"kcal":172,"protein_g":0.6,"fat_g":0.6,"carb_g":40.8,"fiber_g":0.9,"sugar_g":33.2,"satfat_g":0.1,"sodium_mg":1027,"potassium_mg":230},
   "portions":[{"label":"1 tbsp","grams":17},{"label":"2 tbsp","grams":34}]},
  # --- researched flavor condiments (low-cal / sugar-free / cuisine-correct). Sugar-free items use
  #     NET (digestible) carbs so the calorie audit reconciles (erythritol/allofiber are ~non-caloric). ---
  # Audited 2026-09-23 against the raw SR Legacy CSVs. USDA carries FIVE parmesan rows and they are not
  # interchangeable: grated (the shaker can, cut with cellulose) is 420 kcal / 28.42 P / 13.91 C, while
  # shredded is 415 / 37.86 / 3.41. This entry's numbers were the SHREDDED row but its provenance said
  # "grated", so an audit against the grated row read the protein as 34% high and the carbs as 71% low.
  # The numbers were right and the label was wrong. Named and sourced correctly now, and snapped to the
  # exact SR Legacy values (fdc_id 173431) so it reconciles to the row it actually claims.
  {"name":"Parmesan cheese, shredded","cat":"Eggs & Dairy","form":"","brands":"BelGioioso",
   "usda":"Cheese, parmesan, shredded",
   "per100":{"kcal":415,"protein_g":37.86,"fat_g":27.34,"carb_g":3.41,"fiber_g":0,"sugar_g":0.9,"satfat_g":17.37,"sodium_mg":1696,"calcium_mg":1100,"phosphorus_mg":730,"zinc_mg":3.8,"selenium_ug":22,"riboflavin_mg":0.39,"vit_b12_ug":1.2,"vit_a_ug":200,"magnesium_mg":44,"iron_mg":0.9},
   "portions":[{"label":"1 tbsp","grams":5},{"label":"1 oz","grams":28}]},
  {"name":"Tzatziki (Greek yogurt sauce)","cat":"Condiments & Misc","form":"","brands":"Trader Joe's",
   "usda":"Tzatziki, Greek yogurt-cucumber-garlic sauce (label), Greek/Mediterranean",
   "per100":{"kcal":107,"protein_g":4,"fat_g":7.5,"carb_g":5,"fiber_g":0,"sugar_g":3.5,"satfat_g":3.0,"sodium_mg":320,"calcium_mg":80},
   "portions":[{"label":"2 tbsp","grams":30}]},
  {"name":"Greek yogurt ranch dressing","cat":"Condiments & Misc","form":"","brands":"Bolthouse Farms",
   "usda":"Greek-yogurt ranch dressing (label), lighter ranch, also a sour-cream/mayo substitute",
   "per100":{"kcal":167,"protein_g":3.3,"fat_g":13.3,"carb_g":10,"fiber_g":0,"sugar_g":6.7,"satfat_g":2.0,"sodium_mg":867},
   "portions":[{"label":"2 tbsp","grams":30}]},
  {"name":"Teriyaki sauce, sugar-free","cat":"Condiments & Misc","form":"","brands":"G Hughes",
   "usda":"Sugar-free teriyaki sauce (G Hughes label), Asian glaze, no added sugar",
   "per100":{"kcal":33,"protein_g":0,"fat_g":0,"carb_g":7,"fiber_g":0,"sugar_g":0,"satfat_g":0,"sodium_mg":1600},
   "portions":[{"label":"1 tbsp","grams":18}]},
  {"name":"Coconut aminos","cat":"Condiments & Misc","form":"","brands":"Bragg, Coconut Secret",
   "usda":"Coconut aminos (soy-free soy-sauce alternative; label)",
   "per100":{"kcal":100,"protein_g":0,"fat_g":0,"carb_g":20,"fiber_g":0,"sugar_g":20,"satfat_g":0,"sodium_mg":1800},
   "portions":[{"label":"1 tbsp","grams":15}]},
  {"name":"Dijon mustard","cat":"Condiments & Misc","form":"","brands":"Grey Poupon",
   "usda":"Dijon mustard (label)",
   "per100":{"kcal":66,"protein_g":4,"fat_g":4,"carb_g":6,"fiber_g":4,"sugar_g":2,"satfat_g":0.3,"sodium_mg":2400},
   "portions":[{"label":"1 tsp","grams":5},{"label":"1 tbsp","grams":15}]},
  {"name":"Spicy brown mustard","cat":"Condiments & Misc","form":"","brands":"Gulden's, French's",
   "usda":"Spicy brown mustard (label)",
   "per100":{"kcal":70,"protein_g":4,"fat_g":4,"carb_g":6,"fiber_g":4,"sugar_g":1,"satfat_g":0.3,"sodium_mg":1300},
   "portions":[{"label":"1 tsp","grams":5}]},
  {"name":"Salsa verde (tomatillo)","cat":"Condiments & Misc","form":"","brands":"Herdez, La Costena",
   "usda":"Salsa verde, tomatillo-based (label), Mexican green salsa",
   "per100":{"kcal":32,"protein_g":0,"fat_g":0,"carb_g":6.5,"fiber_g":0,"sugar_g":3.2,"satfat_g":0,"sodium_mg":742},
   "portions":[{"label":"2 tbsp","grams":30}]},
  {"name":"Pico de gallo","cat":"Condiments & Misc","form":"","brands":"fresh / store-made",
   "usda":"Pico de gallo, fresh tomato-onion-cilantro salsa (label), Mexican",
   "per100":{"kcal":25,"protein_g":1.0,"fat_g":0.2,"carb_g":5.0,"fiber_g":1.5,"sugar_g":3.0,"satfat_g":0,"sodium_mg":200},
   "portions":[{"label":"2 tbsp","grams":30}]},
  {"name":"Hot sauce, cayenne (Frank's-style)","cat":"Condiments & Misc","form":"","brands":"Frank's RedHot, Texas Pete",
   "usda":"Cayenne pepper hot sauce, vinegar-based (label), buffalo/Louisiana style, near-zero calorie",
   "per100":{"kcal":11,"protein_g":0.5,"fat_g":0.37,"carb_g":1.75,"fiber_g":0.3,"sugar_g":0.9,"satfat_g":0,"sodium_mg":2643},
   "portions":[{"label":"1 tsp","grams":5},{"label":"1 tbsp","grams":15}]},
  {"name":"Sugar-free maple syrup","cat":"Condiments & Misc","form":"","brands":"ChocZero, Lakanto",
   "usda":"Sugar-free maple syrup, monkfruit/fiber sweetened (label; NET carbs shown)",
   "per100":{"kcal":160,"protein_g":0,"fat_g":0,"carb_g":75,"fiber_g":70,"sugar_g":0,"satfat_g":0,"sodium_mg":25},
   "portions":[{"label":"1 tbsp","grams":20},{"label":"2 tbsp","grams":40}]},
  {"name":"Sugar-free chocolate syrup","cat":"Condiments & Misc","form":"","brands":"ChocZero",
   "usda":"Sugar-free chocolate syrup (label; NET carbs shown)",
   "per100":{"kcal":176,"protein_g":0,"fat_g":0,"carb_g":71,"fiber_g":67,"sugar_g":0,"satfat_g":0,"sodium_mg":24},
   "portions":[{"label":"1 tbsp","grams":18}]},
  {"name":"Sugar-free fruit jam","cat":"Condiments & Misc","form":"","brands":"Smucker's Sugar Free",
   "usda":"No-sugar-added fruit preserves (label; NET carbs shown)",
   "per100":{"kcal":60,"protein_g":0,"fat_g":0,"carb_g":25,"fiber_g":20,"sugar_g":5,"satfat_g":0,"sodium_mg":0},
   "portions":[{"label":"1 tbsp","grams":16}]},
  {"name":"Dark chocolate chips, no sugar added","cat":"Sweet Treats & Snacks","form":"","brands":"Lily's",
   "usda":"No-sugar-added dark chocolate chips, stevia/erythritol sweetened (label; NET carbs)",
   "per100":{"kcal":357,"protein_g":7.1,"fat_g":32.1,"carb_g":28.5,"fiber_g":21.4,"sugar_g":0,"satfat_g":21.4,"sodium_mg":0},
   "portions":[{"label":"1 tbsp","grams":15},{"label":"1 oz","grams":28}]},
  {"name":"Cinnamon, ground","cat":"Condiments & Misc","form":"","usda":"Spices, cinnamon, ground (USDA)",
   "per100":{"kcal":247,"protein_g":4.0,"fat_g":1.2,"carb_g":81.0,"fiber_g":53.0,"sugar_g":2.2,"satfat_g":0.3,"sodium_mg":10,"calcium_mg":1002,"iron_mg":8.3,"manganese_mg":17},
   "portions":[{"label":"1 tsp","grams":2.6}]},
  {"name":"Matcha green tea powder","cat":"Condiments & Misc","form":"","usda":"Matcha, culinary green tea powder (label; used in tiny amounts)",
   "per100":{"kcal":347,"protein_g":27.4,"fat_g":6.5,"carb_g":44.7,"fiber_g":38,"sugar_g":0,"satfat_g":0,"sodium_mg":6,"potassium_mg":2700,"calcium_mg":420,"iron_mg":17,"magnesium_mg":230,"vit_c_mg":60,"vit_a_ug":290},
   "portions":[{"label":"1 tsp","grams":2}]},
  {"name":"Medjool dates","cat":"Fruits","form":"","brands":"",
   "usda":"Dates, medjool (USDA), whole-food sweetener for no-bake desserts",
   "per100":{"kcal":277,"protein_g":1.8,"fat_g":0.2,"carb_g":75.0,"fiber_g":6.7,"sugar_g":66.0,"satfat_g":0,"sodium_mg":1,"potassium_mg":696,"magnesium_mg":54,"calcium_mg":64,"iron_mg":0.9,"copper_mg":0.36,"manganese_mg":0.3,"vit_b6_mg":0.25,"phosphorus_mg":62,"folate_ug":15},
   "portions":[{"label":"1 date","grams":24},{"label":"2 dates","grams":48}]},
  {"name":"Gochujang (Korean chili paste)","cat":"Condiments & Misc","form":"","brands":"Chung Jung One, Annie Chun's",
   "per100":{"kcal":200,"protein_g":5,"fat_g":0,"carb_g":45,"fiber_g":5,"sugar_g":15,"satfat_g":0,"sodium_mg":2400},
   "portions":[{"label":"1 tbsp","grams":18}]},
  {"name":"Chipotle in adobo","cat":"Condiments & Misc","form":"","brands":"San Marcos",
   "per100":{"kcal":67,"protein_g":1.5,"fat_g":1,"carb_g":13.3,"fiber_g":3.5,"sugar_g":6.7,"satfat_g":0.2,"sodium_mg":800},
   "portions":[{"label":"1 tbsp","grams":15}]},
  {"name":"Enchilada sauce, red","cat":"Condiments & Misc","form":"","brands":"Las Palmas",
   "per100":{"kcal":25,"protein_g":1.7,"fat_g":0.8,"carb_g":5,"fiber_g":1.7,"sugar_g":3.3,"satfat_g":0.1,"sodium_mg":617},
   "portions":[{"label":"1/4 cup","grams":60}]},
  {"name":"Ponzu sauce","cat":"Condiments & Misc","form":"","brands":"Kikkoman, Marukan",
   "per100":{"kcal":67,"protein_g":3,"fat_g":0,"carb_g":13,"fiber_g":0,"sugar_g":7,"satfat_g":0,"sodium_mg":3200},
   "portions":[{"label":"1 tbsp","grams":18}]},
  {"name":"Harissa paste","cat":"Condiments & Misc","form":"","brands":"Mina",
   "per100":{"kcal":67,"protein_g":0,"fat_g":3.3,"carb_g":6.7,"fiber_g":0,"sugar_g":0,"satfat_g":0.3,"sodium_mg":533},
   "portions":[{"label":"1 tbsp","grams":15}]},
  {"name":"Chimichurri sauce","cat":"Condiments & Misc","form":"","brands":"fresh / store-made",
   "per100":{"kcal":366,"protein_g":1.5,"fat_g":37,"carb_g":3.3,"fiber_g":1.5,"sugar_g":1,"satfat_g":5.5,"sodium_mg":800},
   "portions":[{"label":"1 tbsp","grams":15}]},
  {"name":"Light peanut sauce (PB powder)","cat":"Condiments & Misc","form":"","brands":"homemade (PB2-based)",
   "per100":{"kcal":145,"protein_g":9,"fat_g":4,"carb_g":14,"fiber_g":3,"sugar_g":6,"satfat_g":1.0,"sodium_mg":520},
   "portions":[{"label":"2 tbsp","grams":30}]},

  # --- SATIETY / VOLUME-EATING foods (high water + fiber, very low energy density). Let the builder
  #     bulk a plate so the client stays full on a deficit. Powered up by Volume Eating mode. ---
  {"name":"Shirataki noodles (konjac)","cat":"Grains & Starches","form":"","brands":"konjac",
   "usda":"Glucomannan konjac 'miracle' noodle (manufacturer label; ~200g drained bag)",
   "per100":{"kcal":10,"protein_g":0.2,"fat_g":0,"carb_g":3.0,"fiber_g":3.0,"sugar_g":0,"satfat_g":0,"sodium_mg":10,"calcium_mg":25},
   "portions":[{"label":"1 bag (drained)","grams":200},{"label":"1 cup","grams":113}]},
  {"name":"Riced cauliflower, cooked","cat":"Vegetables","form":"cooked","brands":"",
   "usda":"Cauliflower riced and cooked (a dedicated white-rice swap, ~25 kcal vs ~205/cup rice)",
   "per100":{"kcal":25,"protein_g":1.9,"fat_g":0.5,"carb_g":5.0,"fiber_g":2.3,"sugar_g":2.0,"satfat_g":0.1,"sodium_mg":30,"potassium_mg":300,"vit_c_mg":40},
   "portions":[{"label":"1 cup","grams":155},{"label":"1 serving","grams":200}]},
  {"name":"Chicken broth, low-sodium","cat":"Condiments & Misc","form":"","brands":"",
   "usda":"Low-sodium chicken broth (soup-first volume lever; ~4 kcal per cup)",
   "per100":{"kcal":4,"protein_g":0.9,"fat_g":0.1,"carb_g":0.4,"fiber_g":0,"sugar_g":0,"satfat_g":0,"sodium_mg":95,"potassium_mg":40},
   "portions":[{"label":"1 cup","grams":240}]},
  {"name":"Bone broth, chicken","cat":"Condiments & Misc","form":"","brands":"",
   "usda":"Chicken bone broth (~8-10g protein per cup of mostly warm water; appetite-blunting sipper)",
   "per100":{"kcal":17,"protein_g":4.0,"fat_g":0.2,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":0.1,"sodium_mg":120,"calcium_mg":10},
   "portions":[{"label":"1 cup","grams":240}]},
  {"name":"Daikon radish, raw","cat":"Vegetables","form":"raw","brands":"",
   "usda":"Daikon (white radish), raw, ~94% water, shredded into slaws/bowls or noodle ribbons",
   "per100":{"kcal":18,"protein_g":0.6,"fat_g":0.1,"carb_g":4.0,"fiber_g":1.6,"sugar_g":2.5,"satfat_g":0,"sodium_mg":21,"potassium_mg":227,"vit_c_mg":22},
   "portions":[{"label":"1 cup, sliced","grams":116}]},
  {"name":"Radish, raw","cat":"Vegetables","form":"raw","brands":"",
   "usda":"Red radish, raw, ~95% water, crunchy chip/cracker replacement and bowl topper",
   "per100":{"kcal":16,"protein_g":0.7,"fat_g":0.1,"carb_g":3.4,"fiber_g":1.6,"sugar_g":1.9,"satfat_g":0,"sodium_mg":39,"potassium_mg":233,"vit_c_mg":14.8},
   "portions":[{"label":"1 cup, sliced","grams":116}]},
  {"name":"Jicama, raw","cat":"Vegetables","form":"raw","brands":"",
   "usda":"Jicama, raw, ~90% water with high 4.9g fiber/100g, crisp sticks for dips or slaw base",
   "per100":{"kcal":38,"protein_g":0.7,"fat_g":0.1,"carb_g":9.0,"fiber_g":4.9,"sugar_g":1.8,"satfat_g":0,"sodium_mg":4,"potassium_mg":150,"vit_c_mg":20.2},
   "portions":[{"label":"1 cup, sliced","grams":120}]},
  {"name":"Cabbage, raw","cat":"Vegetables","form":"raw","brands":"",
   "usda":"Green cabbage, raw (slaw/taco volume; cheap, crunchy, ~25 kcal/100g)",
   "per100":{"kcal":25,"protein_g":1.3,"fat_g":0.1,"carb_g":5.8,"fiber_g":2.5,"sugar_g":3.2,"satfat_g":0,"sodium_mg":18,"potassium_mg":170,"vit_c_mg":36.6,"vit_k_ug":76},
   "portions":[{"label":"1 cup, shredded","grams":70},{"label":"1 cup, chopped","grams":89}]},
  {"name":"Iceberg lettuce, raw","cat":"Vegetables","form":"raw","brands":"",
   "usda":"Iceberg lettuce, raw (lettuce-wrap / bulk-the-bowl green; ~14 kcal/100g)",
   "per100":{"kcal":14,"protein_g":0.9,"fat_g":0.1,"carb_g":3.0,"fiber_g":1.2,"sugar_g":2.0,"satfat_g":0,"sodium_mg":10,"potassium_mg":141,"vit_k_ug":24},
   "portions":[{"label":"1 cup, shredded","grams":57},{"label":"1 cup, chopped","grams":72}]},

  # --- BUDGET / protein-per-dollar foods. Gated behind Budget mode in app.js (BUDGET_FOODS) so canned
  #     chicken etc. never leak into a normal plan; Budget mode adds them and biases selection. ---
  {"name":"Chicken leg quarters, roasted (meat only)","cat":"Protein","form":"cooked","brands":"",
   "usda":"Chicken leg quarter, roasted, meat only (cheapest animal protein per dollar)",
   "per100":{"kcal":184,"protein_g":24.0,"fat_g":9.2,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":2.5,"sodium_mg":90,"potassium_mg":230,"iron_mg":1.1,"zinc_mg":2.4},
   "portions":[{"label":"1 leg quarter (meat only)","grams":140},{"label":"3 oz","grams":85}]},
  {"name":"Mackerel, jack, canned, drained","cat":"Seafood","form":"canned","brands":"",
   "usda":"Jack mackerel, canned, drained (cheap omega-3 fish; ~1.3g EPA+DHA/100g)",
   "per100":{"kcal":156,"protein_g":23.2,"fat_g":6.3,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":1.8,"sodium_mg":379,"calcium_mg":241,"omega3_g":1.5,"epa_dha_mg":1300,"vit_b12_ug":5.4,"selenium_ug":44,"phosphorus_mg":240,"vit_d_ug":9,"zinc_mg":1.1,"niacin_mg":6,"magnesium_mg":27},
   "portions":[{"label":"3 oz","grams":85},{"label":"1/2 cup","grams":80}]},
  {"name":"Chicken breast, canned, drained","cat":"Protein","form":"canned","brands":"",
   "usda":"Canned chicken breast, drained (shelf-stable, cheap lean protein)",
   "per100":{"kcal":162,"protein_g":28.0,"fat_g":6.0,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":1.7,"sodium_mg":400,"potassium_mg":150},
   "portions":[{"label":"3 oz","grams":85},{"label":"1 can","grams":142}]},
  {"name":"Nonfat dry milk powder","cat":"Eggs & Dairy","form":"","brands":"",
   "usda":"Nonfat dry milk powder (cheap protein top-up; 36g protein/100g, shelf-stable)",
   "per100":{"kcal":362,"protein_g":36.2,"fat_g":0.8,"carb_g":52.0,"fiber_g":0,"sugar_g":52.0,"satfat_g":0.5,"sodium_mg":535,"calcium_mg":1257,"potassium_mg":1794,"phosphorus_mg":985,"magnesium_mg":110,"zinc_mg":4.1,"riboflavin_mg":1.8,"vit_b12_ug":4.0,"vit_a_ug":350,"vit_d_ug":6.2,"thiamin_mg":0.35,"vit_b6_mg":0.3,"folate_ug":50,"selenium_ug":27,"choline_mg":89},
   "portions":[{"label":"1/4 cup","grams":30},{"label":"2 tbsp","grams":15}]},
  {"name":"TVP (textured soy protein), dry","cat":"Protein","form":"dry","brands":"",
   "usda":"Textured soy protein (TVP), dry (cheapest high-protein high-fiber plant protein; rehydrate 1:1)",
   "per100":{"kcal":366,"protein_g":51.1,"fat_g":1.2,"carb_g":32.9,"fiber_g":17.5,"sugar_g":11.0,"satfat_g":0.2,"sodium_mg":3,"iron_mg":6.0,"potassium_mg":1500,"phosphorus_mg":700,"magnesium_mg":290,"zinc_mg":5.0,"copper_mg":2.9,"folate_ug":305,"calcium_mg":350},
   "portions":[{"label":"1/4 cup dry","grams":25},{"label":"2 tbsp dry","grams":12}]},
  {"name":"Tuna, light, canned in oil, drained","cat":"Seafood","form":"canned","brands":"",
   "usda":"Light tuna, canned in oil, drained (budget protein; more fat than water-packed)",
   "per100":{"kcal":186,"protein_g":26.5,"fat_g":8.2,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":1.5,"sodium_mg":354,"omega3_g":0.4,"epa_dha_mg":280},
   "portions":[{"label":"3 oz","grams":85},{"label":"1 can","grams":142}]},

  # --- VEGAN protein powder: lets a plant-based client actually hit a high protein target (DB previously
  #     only had whey). Pea+rice blend = complete amino profile. ---
  # Re-based 2026-09-24 (store-availability audit: clients could not find the old specialty blend, 379 kcal /
  # 63.1P per 100g on a 32g scoop, "Momentous / generic") to ORGAIN ORGANIC PROTEIN PLANT BASED, VANILLA BEAN.
  # Orgain is the #1 plant protein powder brand in the US (orgain.com, Circana 52 weeks to 2025-03-23) and this
  # tub is on the shelf at Walmart (1.02 lb "1K+ bought since yesterday", 2.03 lb) and Target (16.32 oz "14k+
  # bought in last month"); Natural Unsweetened did not show in either store's search, so Vanilla Bean is the base.
  # Current label (orgain.com nutrition panel v12 2024-03-11, UPC 851770003254 2.03 lb; v8 2024-03-28 for the
  # 1.02 lb, UPC 851770003926), 2 scoops = 46g: 150 kcal, 21P, 3.5F, 0.5 sat, 15C, 4 fiber, <1g sugar (stored
  # 0.5g, the bottom of FDA's "<1g" band), 390mg Na, Ca 60mg, Fe 6.5mg, K 100mg, no cholesterol or vitamin D.
  # Open Food Facts 851770003254 (container photo, 2026-09-10) and 851770003926 (2026-08-25) match every line.
  # USDA FDC Branded 2640562 (2023-08, same UPC) is the pre-2024 formula: same 150 kcal / 21P / 15C per 46g, but
  # 4F, 1 fiber, 270mg Na. Plausibility: 4P+4(C-fib)+9F = 159.5, 4P+4C+9F = 175.5; the label's 150 is 9.5 under
  # the low bound, inside the +/-10 band. 1 scoop = 23g = 10.5g protein. Other Orgain tubs are DIFFERENT labels:
  # Natural Unsweetened 36g = 140 kcal / 21P (389 kcal, 58.3P per 100g), and the Protein + Superfoods tub (the
  # Orgain plant tub Costco lists) is 51g = 160 kcal / 21P (USDA FDC 2640587, 2023). The usda text avoids the
  # words "bean", "brown rice" and "chia" (gut-mode favour list) so the re-base does not change gut scoring.
  {"name":"Pea & rice protein powder","cat":"Protein","form":"","brands":"Orgain Organic Protein Plant Based, Vanilla Bean",
   "usda":"Vegan pea + rice protein powder. Orgain Organic Protein Plant Based, vanilla flavor (label 2 scoops = 46g: 150 kcal, 21P, 3.5F, 15C, 4 fiber, <1g sugar, 390mg sodium; verified orgain.com label + Open Food Facts 851770003254, 2026-09)",
   "per100":{"kcal":326.1,"protein_g":45.7,"fat_g":7.6,"carb_g":32.6,"fiber_g":8.7,"sugar_g":1.1,"satfat_g":1.1,"sodium_mg":847.8,"calcium_mg":130.4,"iron_mg":14.13,"potassium_mg":217.4},
   "portions":[{"label":"1 scoop","grams":23},{"label":"2 scoops","grams":46}]},
  # WHEY — real EKKOVISION Whey label (verified 2026-06): 34g scoop = 130kcal / 26P / 3C / 1F. Per-100g
  # = 382kcal / 76.5P / 8.8C / 2.9F (much higher protein density than the old generic 58% USDA whey, so
  # FEWER grams hit the target — combined with the 45g app cap, ~1.3 scoops max, never "3 scoops in oats").
  # AA from the standard whey profile (% of protein): Leu 10.5 (verified), Lys 9.5, Ile 6.0, Val 5.7,
  # Thr 6.8, Met 2.1, Cys 2.4, Phe 3.0, Tyr 3.4, Trp 2.0, His 1.8 — complete, DIAAS ~1.09, highest leucine.
  # BRAND ORDER 2026-09-24 (store-availability audit): Ekkovision is an online brand, so Optimum Nutrition Gold
  # Standard 100% Whey (Walmart, Target, Costco, GNC) is listed first. Its current label is within 5% of these
  # values, so the values stay: Double Rich Chocolate 31g (about 1 scoop) = 120 kcal, 24P, 1.5F, 1 sat, 3C, <1
  # fiber, 1 sugar, 55mg chol, 130mg Na (optimumnutrition.com nutrition panel, 2026-09; Open Food Facts
  # 748927028614 + 748927028713 agree) = 387 kcal / 77.4P per 100g, +1.3% kcal and +1.2% protein vs 382 / 76.5.
  # Vanilla Ice Cream (the flavor Costco sells) is also 31g = 120 kcal / 24P (USDA FDC Branded 2508555, OFF
  # 748927028706). Older 30.4g-scoop panels (USDA 2311349, OFF 748927028669) = 395 / 79.0, still within 3.4%.
  {"name":"Whey protein powder","cat":"Protein","form":"","brands":"Optimum Nutrition Gold Standard, Ekkovision, Ryse Loaded",
   "usda":"Ekkovision Whey Protein (whey isolate + concentrate); per-100g from the brand label, 34g scoop",
   "per100":{"kcal":382,"protein_g":76.5,"fat_g":2.9,"carb_g":8.8,"fiber_g":0.5,"sugar_g":5.9,"satfat_g":1.5,
             "sodium_mg":372,"calcium_mg":698,"potassium_mg":872,"phosphorus_mg":581,"zinc_mg":8.72,"cholesterol_mg":12,
             "leucine_g":8.03,"lysine_g":7.27,"isoleucine_g":4.59,"valine_g":4.36,"threonine_g":5.20,"methionine_g":1.61,"cystine_g":1.84,"phenylalanine_g":2.30,"tyrosine_g":2.60,"tryptophan_g":1.53,"histidine_g":1.38},
   "portions":[{"label":"1 scoop","grams":34},{"label":"2 scoops","grams":68}]},
  # GRANOLA — Dylan: raw oats are not "crunchy"; offer real granola for crunch on yogurt/cottage bowls.
  # Generic granola = USDA FNDDS "Cereal, granola" (FDC 2708461). Low-fat = Kellogg's (FDC 751956). High-
  # protein = Magic Spoon PB (brand label; the lean, high-protein crunch option). All verified 2026-06.
  {"name":"Granola","cat":"Grains & Starches","form":"","brands":"Bear Naked, Nature Valley, Quaker, store brand",
   "usda":"Cereal, granola (USDA FDC 2708461)","per100":{"kcal":420,"protein_g":9.82,"fat_g":13.0,"carb_g":67.4,"fiber_g":7.4,"sugar_g":22.2,"satfat_g":1.34,"sodium_mg":161,"iron_mg":3.4,"potassium_mg":330,"magnesium_mg":90},
   "portions":[{"label":"1/4 cup","grams":30},{"label":"1/2 cup","grams":61}]},
  {"name":"Granola, low-fat","cat":"Grains & Starches","form":"","brands":"Kellogg's Low Fat Granola",
   "usda":"Kellogg's Low Fat Granola without raisins (USDA FDC 751956)","per100":{"kcal":389,"protein_g":8.7,"fat_g":5.7,"carb_g":80.9,"fiber_g":7.0,"sugar_g":28.3,"satfat_g":1.4,"sodium_mg":257},
   "portions":[{"label":"1/2 cup","grams":52}]},
  {"name":"Granola, high-protein","cat":"Grains & Starches","form":"","brands":"Magic Spoon, Purely Elizabeth Protein, Nature's Path Protein",
   "usda":"High-protein granola (Magic Spoon PB label; the lean high-protein crunch option)","per100":{"kcal":450,"protein_g":23.3,"fat_g":25.0,"carb_g":31.7,"fiber_g":11.7,"sugar_g":3.3,"satfat_g":3.5,"sodium_mg":230,"calcium_mg":80},
   "portions":[{"label":"1/3 cup","grams":30},{"label":"2/3 cup","grams":60}]},
  # BEAN PASTAS — per-100g COOKED. Bean pasta absorbs water like semolina pasta: a 2.36x dry->cooked weight
  # gain (USDA cooked enriched spaghetti is 371->157 kcal/100g = 2.36x; both brands state "2 oz dry -> ~1 cup
  # cooked"). VERIFIED 2026-06-20 (recipal/fatsecret labels + Banza cooking page + USDA semolina benchmark).
  # PRIOR BUG: chickpea pasta was diluted ~4x, landing at 85 kcal/100g — half of real cooked pasta and
  # physically impossible (pasta maxes ~2.6x). Both bean pastas now use the same 2.36x for consistency.
  # Banza dry (current 56g label): 190 kcal/11P/35C/5fib/3F/20mg Na -> 56g dry ≈ 132g cooked.
# form is lowercase "cooked" (2026-09-24): the app's COOKED badge and "Weighed COOKED" note only match lowercase,
# so the old "COOKED" on these two pastas and on 97/3 beef showed neither.
  {"name":"Chickpea pasta, cooked","cat":"Grains & Starches","form":"cooked","brands":"Banza",
   "usda":"Banza chickpea pasta, cooked (dry label 56g=190kcal/11P/35C/5fib/3F; 2.36x cooked yield, 56g dry -> ~132g cooked)","per100":{"kcal":144,"protein_g":8.3,"fat_g":2.3,"carb_g":26.5,"fiber_g":3.8,"sugar_g":0.6,"satfat_g":0.3,"sodium_mg":15,"iron_mg":3.0,"potassium_mg":210,"folate_ug":40,"magnesium_mg":45,"phosphorus_mg":110,"zinc_mg":1.0,"copper_mg":0.25,"manganese_mg":0.7},
   "portions":[{"label":"1 cup cooked","grams":132}]},
  # Explore Cuisine edamame spaghetti dry (56g): 180 kcal/24P/20C/13fib/4F/~0 Na -> same 2.36x cooked.
  # A standout VEGAN high-protein + high-fiber pasta (18g protein, 10g fiber per 100g cooked).
  {"name":"Edamame pasta, cooked","cat":"Grains & Starches","form":"cooked","brands":"Explore Cuisine",
   "usda":"Explore Cuisine organic edamame spaghetti, cooked (dry label 56g=180kcal/24P/20C/13fib/4F; 2.36x cooked yield, 56g dry -> ~132g cooked)","per100":{"kcal":136,"protein_g":18.2,"fat_g":3.0,"carb_g":15.1,"fiber_g":9.8,"sugar_g":1.5,"satfat_g":0.4,"sodium_mg":5,"iron_mg":5.3,"potassium_mg":954,"calcium_mg":106,"magnesium_mg":106},
   "portions":[{"label":"1 cup cooked","grams":132}]},
  # (Shirataki already exists as "Shirataki noodles (konjac)" — no duplicate; it's demoted in the carb
  #  ranking so it isn't the default pasta, per Dylan. Verified House Foods tofu-shirataki = 226g pkg
  #  20kcal/2P/4fib if a tofu-shirataki SKU is ever needed.)
  # STUFFED-PEPPER staples (Dylan's gf nailed these): extra-lean 97/3 ground beef + nonfat mozzarella.
  # Verified vs USDA FoodData Central SR Legacy (workflow wrwlbbkfm).
  {"name":"Beef, ground 97/3, cooked","cat":"Protein","form":"cooked","brands":"97% lean ground beef",
   "usda":"Beef, ground, 97% lean / 3% fat, cooked (USDA SR Legacy)","per100":{"kcal":144,"protein_g":26.0,"fat_g":3.5,"carb_g":0,"fiber_g":0,"sugar_g":0,"satfat_g":1.5,"sodium_mg":69,"calcium_mg":7,"iron_mg":2.6,"zinc_mg":5.8,"vit_b12_ug":2.4},
   "portions":[{"label":"3 oz","grams":85},{"label":"4 oz","grams":113}]},
  # Switched 2026-09-23 from USDA SR (141 kcal) to the KRAFT Fat Free shredded mozzarella label, the fat-free
  # mozzarella clients actually find (USDA FDC Branded 2599712 + Open Food Facts 021000054473 agree): 1/4 cup = 28g =
  # 45 kcal, 9P, 0F, 2C, 0 sugar, 280mg Na, Ca 250mg -> 161 kcal/100g (+14% vs SR). Polly-O dropped (not verified).
  # P, Zn, Se, B2, B12, A, Mg kept from USDA SR (not on the label).
  {"name":"Mozzarella, fat-free","cat":"Eggs & Dairy","form":"","brands":"Kraft Fat Free shredded mozzarella",
   "usda":"Cheese, nonfat / fat-free mozzarella. Kraft Fat Free shredded mozzarella label (1/4 cup = 28g: 45 kcal, 9P, 0F, 2C; verified USDA FDC 2599712 + Open Food Facts, 2026-09); micros from USDA SR Legacy","per100":{"kcal":160.7,"protein_g":32.1,"fat_g":0,"carb_g":7.1,"fiber_g":0,"sugar_g":0,"satfat_g":0,"sodium_mg":1000,"calcium_mg":892.9,"cholesterol_mg":17.9,"phosphorus_mg":460,"zinc_mg":3.0,"selenium_ug":16,"riboflavin_mg":0.3,"vit_b12_ug":0.9,"vit_a_ug":130,"magnesium_mg":11},
   "portions":[{"label":"1/4 cup shredded","grams":28},{"label":"1 oz","grams":28}]},
  # HIGH-FIBER CRUNCH CEREALS — Dylan adds these to Greek yogurt/kefir for crunch + fiber (+ protein) when
  # not using granola. All verified labels (workflow wlhp2osre). Range: ultra-high-fiber low-protein
  # (Fiber One 45g fiber/100g) -> high-protein (Catalina Crunch 30g protein, Kashi GO 19P/19fib).
  {"name":"Bran cereal, high-fiber (Fiber One)","cat":"Grains & Starches","form":"","brands":"General Mills Fiber One Original Bran",
   "usda":"General Mills Fiber One Original Bran (label 40g serving, verified)","per100":{"kcal":225.0,"protein_g":7.5,"fat_g":2.5,"carb_g":82.5,"fiber_g":45.0,"sugar_g":1.2,"satfat_g":0,"sodium_mg":350},
   "portions":[{"label":"2/3 cup","grams":40},{"label":"2 tbsp (sprinkle)","grams":12}]},
  {"name":"All-Bran cereal","cat":"Grains & Starches","form":"","brands":"Kellogg's All-Bran Original",
   "usda":"Kellogg's All-Bran Original (label 41g serving, verified)","per100":{"kcal":292.7,"protein_g":12.2,"fat_g":2.4,"carb_g":85.4,"fiber_g":29.3,"sugar_g":22.0,"satfat_g":0,"sodium_mg":232},
   "portions":[{"label":"2/3 cup","grams":41},{"label":"2 tbsp (sprinkle)","grams":12}]},
  {"name":"Grape-Nuts cereal","cat":"Grains & Starches","form":"","brands":"Post Grape-Nuts The Original",
   "usda":"Post Grape-Nuts The Original (label 58g serving, verified)","per100":{"kcal":344.8,"protein_g":10.3,"fat_g":1.7,"carb_g":81.0,"fiber_g":12.1,"sugar_g":8.6,"satfat_g":0,"sodium_mg":483},
   "portions":[{"label":"1/2 cup","grams":58},{"label":"2 tbsp (sprinkle)","grams":12}]},
  {"name":"SmartBran cereal, high-fiber","cat":"Grains & Starches","form":"","brands":"Nature's Path Organic SmartBran",
   "usda":"Nature's Path Organic SmartBran psyllium + oat bran (label 40g serving, verified)","per100":{"kcal":275.0,"protein_g":10.0,"fat_g":2.5,"carb_g":80.0,"fiber_g":42.5,"sugar_g":20.0,"satfat_g":0,"sodium_mg":425},
   "portions":[{"label":"3/4 cup","grams":40},{"label":"2 tbsp (sprinkle)","grams":12}]},
  {"name":"Kashi GO cereal (protein & fiber)","cat":"Grains & Starches","form":"","brands":"Kashi GO Original Protein & Fiber",
   "usda":"Kashi GO Original Protein & Fiber (label 63g serving, verified)","per100":{"kcal":317.5,"protein_g":19.0,"fat_g":3.2,"carb_g":71.4,"fiber_g":19.0,"sugar_g":14.3,"satfat_g":0,"sodium_mg":214},
   "portions":[{"label":"1 1/4 cups","grams":63},{"label":"2 tbsp (sprinkle)","grams":12}]},
  # Re-verified 2026-09-23: Catalina reformulated. Current Cinnamon Toast label (USDA FDC Branded 2640459 + Open Food
  # Facts 850017468078 agree): 36g = 110 kcal, 11P, 5F, 0.5 sat, 14C, 9 fiber, 0 sugar, 110mg Na. The old entry
  # (150 kcal, 6g fiber per 36g) was 36% high on calories.
  {"name":"Catalina Crunch cereal (high-protein)","cat":"Grains & Starches","form":"","brands":"Catalina Crunch (keto, zero sugar)",
   "usda":"Catalina Crunch Cinnamon Toast keto cereal (label 36g serving: 110 kcal, 11P, 5F, 14C, 9 fiber; verified USDA FDC 2640459 + Open Food Facts, 2026-09)","per100":{"kcal":305.6,"protein_g":30.6,"fat_g":13.9,"carb_g":38.9,"fiber_g":25.0,"sugar_g":0.0,"satfat_g":1.4,"sodium_mg":305.6,"calcium_mg":138.9,"iron_mg":4.44,"potassium_mg":83.3},
   "portions":[{"label":"1/2 cup","grams":36},{"label":"2 tbsp (sprinkle)","grams":12}]},
  # CONVENIENCE STAPLES for a client's rebuild (2026-09-24 call: protein-first on yogurt, Premier Protein shakes
  # and bars; powder causes him constipation; frozen veg packs in the air fryer; Bitchin' Sauce on eggs). Label
  # values per serving, converted to per 100 g.
  # Premier Protein Chocolate, 11 fl oz: premierprotein.com panel read 2026-09-24: 160 kcal, 3F, 1 sat, 15mg chol,
  # 230mg Na, 320mg K, 4C, 2 fiber, 1 sugar, 30P, 650mg Ca. 11 fl oz = 325 mL at ~1.05 g/mL = 340 g. Atwater
  # 4*30+4*4+9*3 = 163 vs 160. No USDA branded record exists for it. Name avoids "protein powder" on purpose:
  # this is a ready-to-drink bottle, not a scoop.
  # 2026-10-06 (a client audit): the shake is fortified with 24 vitamins and minerals and only Na, K and Ca had been
  # entered, so his plan printed vitamin A at 66% and offered "a swap or a supplement". premierprotein.com "11 oz
  # Nutrition Facts" panel, read 2026-10-06 (same calories, macros, Na, K and Ca as above): chol 15mg, vit D 6mcg,
  # iron 2.7mg, vit A 230mcg, vit C 23mg, vit E 3.8mg, vit K 30mcg, thiamin 0.24mg, riboflavin 0.26mg, niacin 3.2mg,
  # B6 0.34mg, folate 80mcg DFE, B12 0.48mcg, pantothenic acid 1mg, phosphorus 550mg, iodine 23mcg, magnesium 85mg,
  # zinc 2.8mg, selenium 8mcg, copper 0.23mg, manganese 0.35mg (biotin, chromium, molybdenum are not tracked).
  # Per 100 g = per shake / 3.4. Retailer listings (ShopRite, H-E-B) still show an older panel (vit C 50%, niacin 4mg).
  {"name":"Premier Protein shake, ready-to-drink","cat":"Eggs & Dairy","form":"","brands":"Premier Protein (11 fl oz bottle)",
   "usda":"Premier Protein Chocolate ready-to-drink shake, milk protein concentrate and calcium caseinate (label 1 shake = 11 fl oz: 160 kcal, 30P, 3F, 4C, 2 fiber, 1 sugar, 230mg sodium; premierprotein.com 2026-09)",
   "per100":{"kcal":47.1,"protein_g":8.82,"fat_g":0.88,"carb_g":1.18,"fiber_g":0.59,"sugar_g":0.29,"satfat_g":0.29,"sodium_mg":67.6,"potassium_mg":94.1,"calcium_mg":191.2,
             "cholesterol_mg":4.412,"vit_d_ug":1.765,"iron_mg":0.7941,"vit_a_ug":67.65,"vit_c_mg":6.765,"vit_e_mg":1.118,"vit_k_ug":8.824,"thiamin_mg":0.07059,"riboflavin_mg":0.07647,"niacin_mg":0.9412,"vit_b6_mg":0.1,"folate_ug":23.53,"vit_b12_ug":0.1412,"pantothenic_mg":0.2941,"phosphorus_mg":161.8,"iodine_ug":6.765,"magnesium_mg":25,"zinc_mg":0.8235,"selenium_ug":2.353,"copper_mg":0.06765,"manganese_mg":0.1029},
   "portions":[{"label":"1 shake (11 fl oz)","grams":340}]},
  # YULIYA GELIS, 2026-10-01 call: OB approved "Chobani 30g protein yogurt" as her breakfast and Fairlife shakes as a
  # daily protein source. Chobani's 30 g product is the 14 fl oz Greek yogurt DRINK (its spoonable cups stop at 20 g,
  # foodnavigator.com 2024-10-29). Vanilla Ice Cream panel (myfooddiary.com, matching the Target/H-E-B listings, read
  # 2026-10-01), 1 bottle: 220 kcal, 4F, 2.5 sat, 25mg chol, 250mg Na, 17C, 0.5 fiber, 11 sugar (0 added), 30P, 350mg Ca,
  # 0.3mg Fe, 550mg K, 0 vit D. 14 fl oz = 414 mL at ~1.05 g/mL = 435 g. Atwater 224 vs 220.
  {"name":"Chobani 30g protein Greek yogurt drink","cat":"Eggs & Dairy","form":"","brands":"Chobani 30G, Vanilla Ice Cream",
   "usda":"Chobani 30G Protein lowfat Greek yogurt drink, Vanilla Ice Cream (label 1 bottle = 14 fl oz: 220 kcal, 30P, 4F, 17C, 0.5 fiber, 11 sugar, 0 added; 2026-10)",
   "per100":{"kcal":50.6,"protein_g":6.9,"fat_g":0.92,"carb_g":3.91,"fiber_g":0.11,"sugar_g":2.53,"satfat_g":0.57,"sodium_mg":57.5,"potassium_mg":126.4,"calcium_mg":80.5,"iron_mg":0.07,"vit_d_ug":0},
   "portions":[{"label":"1 bottle (14 fl oz)","grams":435}]},
  # fairlife Nutrition Plan Chocolate, fairlife.com panel read 2026-10-01, 1 bottle (340 mL): 150 kcal, 2.5F, 1.5 sat,
  # 25mg chol, 230mg Na, 4C, 1 fiber, 2 sugar (0 added), 30P, vit D 5mcg, Ca 730mg, Fe 1.9mg, K 460mg, vit A 200mcg,
  # B12 1.4mcg, P 510mg, iodine 100mcg, Mg 50mg, Zn 6mg, Se 20mcg. 340 mL at ~1.05 g/mL = 357 g. Atwater 157 vs 150.
  # Named "shake", not "protein powder", so the planner never treats it as a scoop.
  {"name":"fairlife Nutrition Plan shake","cat":"Eggs & Dairy","form":"","brands":"fairlife Nutrition Plan, Chocolate or Vanilla",
   "usda":"fairlife Nutrition Plan Chocolate ready-to-drink shake, ultra-filtered milk (label 1 bottle = 11.5 fl oz: 150 kcal, 30P, 2.5F, 4C, 1 fiber, 2 sugar; fairlife.com 2026-10)",
   "per100":{"kcal":42.0,"protein_g":8.4,"fat_g":0.7,"carb_g":1.12,"fiber_g":0.28,"sugar_g":0.56,"satfat_g":0.42,"sodium_mg":64.4,"potassium_mg":128.9,"calcium_mg":204.5,"iron_mg":0.53,"vit_d_ug":1.4,"vit_a_ug":56.0,"vit_b12_ug":0.39,"phosphorus_mg":142.9,"iodine_ug":28.0,"magnesium_mg":14.0,"zinc_mg":1.68,"selenium_ug":5.6},
   "portions":[{"label":"1 bottle (11.5 fl oz)","grams":357}]},
  # SARAH RICCI, 2026-10-02 call: Yasso bars are her sweet treat at night. Mint Chocolate Chip, USDA Branded Food record
  # (UPC 851035003234, via myfooddata.com, read 2026-10-02), 1 bar = 65 g: 100 kcal, 2F, 1.5 sat, 5mg chol, 45mg Na, 16C,
  # 0 fiber, 13 sugar (9 added), 5P, 150mg Ca, 0.6mg Fe, 160mg K, 16mcg vit A. Atwater 102 vs 100.
  {"name":"Yasso frozen Greek yogurt bar","cat":"Eggs & Dairy","form":"","brands":"Yasso, Mint Chocolate Chip",
   "usda":"Yasso Mint Chocolate Chip frozen Greek yogurt bar (label 1 bar = 65 g: 100 kcal, 5P, 2F, 16C, 0 fiber, 13 sugar; USDA Branded 2026-10)",
   "per100":{"kcal":153.8,"protein_g":7.69,"fat_g":3.08,"carb_g":24.6,"fiber_g":0,"sugar_g":20.0,"satfat_g":2.31,"sodium_mg":69.1,"potassium_mg":246.0,"calcium_mg":231.1,"iron_mg":0.92,"vit_a_ug":25.1},
   "portions":[{"label":"1 bar (65g)","grams":65}]},
  # SARAH RICCI, 2026-10-06 call: plain Greek yogurt swapped for Chobani vanilla (OB: "much more palatable"). OB picked the
  # regular Vanilla Nonfat cup. USDA FDC Branded 2652627 (Chobani, UPC 818290012791, label 2023-07; read 2026-10-06 from the
  # 2025-04 branded CSV on the T7): 1 container = 150 g: 110 kcal, 0F, 0 sat, 5mg chol, 55mg Na, 15C, 0 fiber, 14 sugar
  # (9 added), 12P, 100mg Ca, 140mg K, 0 iron, 0 vit D. Ingredients: cultured nonfat milk, cane sugar, water, natural
  # flavors, fruit pectin, guar gum, locust bean gum, vanilla extract, lemon juice concentrate. Atwater 108 vs 110.
  # Not the same as plain nonfat (59 kcal, 10.2P, 3.6C per 100 g): 24% more calories, 22% less protein, 9 g more sugar a cup.
  # Hand-only in the planner (isHandOnly): a coach adds it; the auto-drafter never puts a sweetened yogurt in a dish.
  {"name":"Chobani vanilla Greek yogurt, nonfat","cat":"Eggs & Dairy","form":"","brands":"Chobani Vanilla Nonfat Greek Yogurt",
   "usda":"Chobani Vanilla Nonfat Greek Yogurt (label 1 container = 150 g: 110 kcal, 12P, 0F, 15C, 0 fiber, 14 sugar incl. 9 added; USDA FDC Branded 2652627, 2026-10)",
   "per100":{"kcal":73.0,"protein_g":8.0,"fat_g":0,"carb_g":10.0,"fiber_g":0,"sugar_g":9.33,"satfat_g":0,"sodium_mg":37.0,"potassium_mg":93.0,"calcium_mg":67.0,"iron_mg":0,"vit_d_ug":0},
   "portions":[{"label":"1 container (5.3 oz)","grams":150}]},
  # DAVID Gold protein bar: retailer panel (thefeed.com, Red Velvet, 2026-09-24) 1 bar: 150 kcal, 2F, 2 sat, 10mg
  # chol, 100mg Na, 12C (1 fiber, 0 sugar, 7g allulose), 28P; davidprotein.com states 150 kcal / 28P across Gold
  # flavours; bar weight 62 g (highproteinsnackspro.com). Label kcal sits under 4-4-9 (178) because allulose and the
  # EPG fat carry few calories; the label number is what a tracking app shows. Contains milk protein, whey, egg
  # white and COLLAGEN (animal-derived: fine for a client who already eats these bars, not strictly vegetarian).
  {"name":"DAVID protein bar","cat":"Sweet Treats & Snacks","form":"","brands":"DAVID (Gold)",
   "usda":"DAVID Gold protein bar (label per bar ~62g: 150 kcal, 28P, 2F, 12C incl. 7g allulose, 1 fiber, 100mg sodium); milk protein isolate, whey, egg white, collagen; thefeed.com panel + davidprotein.com, 2026-09",
   "per100":{"kcal":241.9,"protein_g":45.16,"fat_g":3.23,"carb_g":19.35,"fiber_g":1.61,"sugar_g":0,"satfat_g":3.23,"sodium_mg":161.3},
   "portions":[{"label":"1 bar","grams":62}]},
  # Bitchin' Sauce Original (almond-based dip): 2 tbsp = 28 g: 90 kcal, 9F, 1 sat, 0 chol, 140mg Na, 2C, <1 fiber,
  # 2P (USDA FDC branded 718828 via myfooddata/nutritionvalue, 2026-09-24). Atwater 97 vs 90 (label rounding).
  {"name":"Bitchin' Sauce, Original","cat":"Condiments & Misc","form":"","brands":"Bitchin' Sauce",
   "usda":"Bitchin' Sauce Original almond dip (label 2 tbsp = 28g: 90 kcal, 9F, 2C, 2P, 140mg sodium; USDA FDC 718828, 2026-09); contains tree nuts (almond)",
   "per100":{"kcal":321.4,"protein_g":7.14,"fat_g":32.14,"carb_g":7.14,"fiber_g":1.79,"sugar_g":0,"satfat_g":3.57,"sodium_mg":500},
   "portions":[{"label":"2 tbsp","grams":28},{"label":"1 tbsp","grams":14}]},
  # Frozen Normandy-style blend (broccoli, cauliflower, carrots). Costco does not publish the Kirkland panel online
  # (trackers list ~40 kcal a cup), so these are the median of four USDA FDC branded Normandy blends: 2504688
  # (Walmart Daily Chef), 2433147 (Member's Mark), 2435565 (Flav-R-Pac), 2071783 (H-E-B): 31-35 kcal, 1.0-1.3P,
  # 6.0-6.3C, 2.0-2.5 fiber per 100 g. Weigh it frozen, straight from the bag.
  {"name":"Normandy vegetable blend, frozen","cat":"Vegetables","form":"","brands":"Kirkland Signature Normandy-Style (Costco)",
   "usda":"Frozen Normandy-style vegetable blend: broccoli, cauliflower, carrots (median of USDA FDC branded Normandy blends 2504688, 2433147, 2435565, 2071783; weigh frozen)",
   "per100":{"kcal":32,"protein_g":1.25,"fat_g":0,"carb_g":6.2,"fiber_g":2.5,"sugar_g":2.0,"satfat_g":0,"sodium_mg":30},
   "portions":[{"label":"1 cup","grams":100},{"label":"3/4 cup","grams":81}]},
  # HIGH-FIBRE BRANDS, batch 2 (Dylan: "add Fiber One cereal as well and high fiber brands"). Every value is the
  # CURRENT US label, read 2026-09-23 from the manufacturer (site text, SmartLabel, or the label image the
  # manufacturer publishes), cross-checked against USDA FDC Branded and/or Open Food Facts; per-100g = label /
  # serving g x 100. Clients log these by brand in MFP/Cronometer, so the label wins over any generic value.
  # Names are chosen so no existing template slot regex picks them up by accident (no "white bread", "rye bread",
  # "pita bread", "flour tortilla", "pasta cooked"); allergen words (wheat, soy, whey, egg, honey) sit in the
  # description because the screens match name + description. Micros not on the label stay 0.
  # NAME deliberately omits "Honey": 14 templates carry a ["Honey", g] drizzle extra whose regex /Honey/i would
  # otherwise pick this cereal as the "honey" half the time. "Honey Clusters" stays in the description (search +
  # the vegan honey screen read it) and in brands (printed on the grocery list).
  {"name":"Fiber One Clusters cereal","cat":"Grains & Starches","form":"","brands":"General Mills Fiber One Honey Clusters",
   "usda":"General Mills Fiber One Honey Clusters (label 1 cup = 54g serving: 170 kcal, 4P, 2F, 45C, 10 fiber, 9 sugar, 200mg sodium; verified fiberone.com + USDA FDC 2724732, 2026-09). Whole grain wheat, wheat bran, honey; may contain almond.",
   "per100":{"kcal":314.8,"protein_g":7.4,"fat_g":3.7,"carb_g":83.3,"fiber_g":18.5,"sugar_g":16.7,"satfat_g":0.0,"sodium_mg":370.4,"calcium_mg":240.7,"iron_mg":30.0,"potassium_mg":444.4},
   "portions":[{"label":"1 cup","grams":54},{"label":"1/4 cup (sprinkle)","grams":13.5}]},
  {"name":"All-Bran Bran Buds cereal","cat":"Grains & Starches","form":"","brands":"Kellogg's All-Bran Bran Buds",
   "usda":"Kellogg's All-Bran Bran Buds (label 1/2 cup = 45g serving: 120 kcal, 4P, 1.5F, 36C, 17 fiber, 12 added sugar, 290mg sodium; verified WK Kellogg SmartLabel 2026-09-21 + USDA FDC 2595873). Wheat bran + psyllium seed husk.",
   "per100":{"kcal":266.7,"protein_g":8.9,"fat_g":3.3,"carb_g":80.0,"fiber_g":37.8,"sugar_g":26.7,"satfat_g":0.0,"sodium_mg":644.4,"calcium_mg":44.4,"iron_mg":13.1,"potassium_mg":777.8,"folate_ug":100.0},
   "portions":[{"label":"1/2 cup","grams":45},{"label":"2 tbsp (sprinkle)","grams":11}]},
  {"name":"Oat bran, dry (Bob's Red Mill)","cat":"Grains & Starches","form":"dry","brands":"Bob's Red Mill Oat Bran",
   "usda":"Bob's Red Mill Oat Bran hot cereal, dry (label 1/3 cup = 40g serving: 150 kcal, 7P, 3F, 26C, 7 fiber, 1 sugar, 0mg sodium; verified bobsredmill.com + USDA FDC 2671850, 2026-09).",
   "per100":{"kcal":375.0,"protein_g":17.5,"fat_g":7.5,"carb_g":65.0,"fiber_g":17.5,"sugar_g":2.5,"satfat_g":2.5,"sodium_mg":0.0,"calcium_mg":50.0,"iron_mg":5.0,"potassium_mg":502.5},
   "portions":[{"label":"1/3 cup dry","grams":40},{"label":"2 tbsp (sprinkle)","grams":15}]},
  {"name":"Ezekiel 4:9 sprouted whole grain bread","cat":"Grains & Starches","form":"","brands":"Food For Life Ezekiel 4:9",
   "usda":"Food For Life Ezekiel 4:9 Sprouted Whole Grain Bread (label 1 slice = 34g serving: 80 kcal, 4P, 0.5F, 15C, 3 fiber, 0 sugar, 75mg sodium; verified foodforlife.com label image + USDA FDC 2676901, 2026-09). Sprouted wheat, barley, millet, lentils, soybeans, spelt, wheat gluten.",
   "per100":{"kcal":235.3,"protein_g":11.8,"fat_g":1.5,"carb_g":44.1,"fiber_g":8.8,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":220.6,"calcium_mg":26.5,"iron_mg":2.94,"potassium_mg":232.4,"thiamin_mg":0.29,"niacin_mg":5.88,"vit_b6_mg":0.29,"folate_ug":29.4,"phosphorus_mg":208.8,"magnesium_mg":76.5,"zinc_mg":2.94,"selenium_ug":38.2,"manganese_mg":2.35},
   "portions":[{"label":"1 slice","grams":34}]},
  {"name":"Dave's Killer Bread Powerseed","cat":"Grains & Starches","form":"","brands":"Dave's Killer Bread Powerseed",
   "usda":"Dave's Killer Bread Powerseed organic wheat bread (label 1 slice = 42g serving: 90 kcal, 5P, 2F, 18C, 4 fiber, 1 sugar, 130mg sodium; verified daveskillerbread.com nutrition panel 04-2024 + Open Food Facts 013764027282, 2026-09).",
   "per100":{"kcal":214.3,"protein_g":11.9,"fat_g":4.8,"carb_g":42.9,"fiber_g":9.5,"sugar_g":2.4,"satfat_g":0.0,"sodium_mg":309.5,"calcium_mg":95.2,"iron_mg":2.38,"potassium_mg":261.9},
   "portions":[{"label":"1 slice","grams":42}]},
  {"name":"Arnold Keto bread","cat":"Grains & Starches","form":"","brands":"Arnold Keto (Superior Keto) Bread",
   "usda":"Arnold Keto Bread, wheat (label 1 slice = 28g serving: 40 kcal, 5P, 1.5F, 10C, 9 fiber, 0 sugar, 150mg sodium; verified Arnold/Bimbo SmartLabel 2026-03-09 + Open Food Facts 073410957561, 2026-09). Contains wheat, soy.",
   "per100":{"kcal":142.9,"protein_g":17.9,"fat_g":5.4,"carb_g":35.7,"fiber_g":32.1,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":535.7,"calcium_mg":125.0,"iron_mg":1.43,"potassium_mg":142.9},
   "portions":[{"label":"1 slice","grams":28}]},
  # Thomas' label reads "<1g" total sugars; stored as 0.5g/muffin (the bottom of FDA's "<1g" band).
  {"name":"Thomas' Light Multi-Grain English muffin","cat":"Grains & Starches","form":"","brands":"Thomas' Light Multi-Grain",
   "usda":"Thomas' Light Multi-Grain English Muffins (label 1 muffin = 57g serving: 100 kcal, 4P, 1F, 26C, 8 fiber, <1 sugar, 170mg sodium; verified Thomas'/Bimbo SmartLabel 2024-10-11 + USDA FDC 2596972, 2026-09). Contains wheat, whey, soy.",
   "per100":{"kcal":175.4,"protein_g":7.0,"fat_g":1.8,"carb_g":45.6,"fiber_g":14.0,"sugar_g":0.9,"satfat_g":0.0,"sodium_mg":298.2,"calcium_mg":175.4,"iron_mg":1.75,"potassium_mg":87.7},
   "portions":[{"label":"1 muffin","grams":57}]},
  {"name":"Ole Xtreme Wellness high fiber tortilla","cat":"Grains & Starches","form":"","brands":"Ole Xtreme Wellness High Fiber",
   "usda":"Ole Mexican Foods Xtreme Wellness High Fiber soft taco wheat tortilla, 8 inch (label 1 tortilla = 45g serving: 60 kcal, 4P, 1.5F, 16C, 12 fiber, 0 sugar, 320mg sodium; verified olemex.com label image + product page, 2026-09).",
   "per100":{"kcal":133.3,"protein_g":8.9,"fat_g":3.3,"carb_g":35.6,"fiber_g":26.7,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":711.1,"calcium_mg":137.8,"iron_mg":2.22,"potassium_mg":44.4},
   "portions":[{"label":"1 tortilla","grams":45}]},
  {"name":"La Banderita Carb Counter soft taco tortilla","cat":"Grains & Starches","form":"","brands":"La Banderita Carb Counter (2g net carbs)",
   "usda":"La Banderita Carb Counter 2g Net Carbs soft taco wheat tortilla, 8 inch (label 1 tortilla = 42g serving: 60 kcal, 3P, 1.5F, 15C, 12 fiber, 0 sugar, 300mg sodium; verified olemex.com label image + Open Food Facts 027331001414, 2026-09).",
   "per100":{"kcal":142.9,"protein_g":7.1,"fat_g":3.6,"carb_g":35.7,"fiber_g":28.6,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":714.3,"calcium_mg":142.9,"potassium_mg":26.2},
   "portions":[{"label":"1 tortilla","grams":42}]},
  {"name":"Wasa Light Rye crispbread crackers","cat":"Grains & Starches","form":"","brands":"Wasa Light Rye",
   "usda":"Wasa Light Rye crispbread (label 2 slices = 18g serving: 60 kcal, 2P, 0F, 15C, 4 fiber, 0 sugar, 70mg sodium; verified wasa.com + Open Food Facts 033617322616, 2026-09). Whole grain rye flour, salt; may contain wheat, milk, sesame.",
   "per100":{"kcal":333.3,"protein_g":11.1,"fat_g":0.0,"carb_g":83.3,"fiber_g":22.2,"sugar_g":0.0,"satfat_g":0.0,"sodium_mg":388.9,"calcium_mg":50.0,"iron_mg":5.56,"potassium_mg":483.3},
   "portions":[{"label":"2 slices","grams":18},{"label":"1 slice","grams":9}]},
  # A 70-calorie treat, not a meal food: most of its fibre is chicory root (inulin), and it carries allulose and
  # sorbitol, which is why the label calories sit a little under 4/4/9. Snack category, so it never fills a slot.
  {"name":"Fiber One 70 Calorie brownie, chocolate fudge","cat":"Sweet Treats & Snacks","form":"","brands":"General Mills Fiber One 70 Calorie Brownies",
   "usda":"General Mills Fiber One 70 Calorie Chocolate Fudge Brownie (label 1 brownie = 25g serving: 70 kcal, 2P, 3F, 17C, 7 fiber, 2 sugar, 85mg sodium; verified fiberone.com + USDA FDC 2725389, 2026-09). Contains wheat, egg, soy, whey (milk).",
   "per100":{"kcal":280.0,"protein_g":8.0,"fat_g":12.0,"carb_g":68.0,"fiber_g":28.0,"sugar_g":8.0,"satfat_g":4.0,"sodium_mg":340.0,"iron_mg":8.8},
   "portions":[{"label":"1 brownie","grams":25}]},
]
def finalize_manual(m):
    # an explicit "id" wins, so a name that must carry punctuation (e.g. " / ") can still get a clean, stable id
    fid = m.get("id") or ("brand_" + m["name"].lower().replace(" ","_").replace(",","").replace("(","").replace(")","").replace("-","_"))
    food = {"id": fid, "name": m["name"], "cat": m["cat"], "usda": m.get("usda","Manufacturer label"), "form": m.get("form","")}
    if "brands" in m: food["brands"] = m["brands"]
    p = m["per100"]
    for key in NUTRIENTS:
        food[key] = p.get(key, 0)
    for key in ("omega3_g","omega6_g","epa_dha_mg","ala_g","omega9_g"):
        food[key] = p.get(key, 0)
    tracked = present = 0
    for key in NUTRIENTS:
        if key in ("kcal","protein_g","fat_g","carb_g"): continue
        tracked += 1
        if food.get(key): present += 1
    food["data_quality"] = round(present / tracked, 2) if tracked else 0
    food["portions"] = m.get("portions", [])
    return food
out_foods += [finalize_manual(m) for m in MANUAL_FOODS]

# ---------------------------------------------------------------------------
# 6a2. AMINO-ACID BACKFILL. Some USDA records (Greek yogurt, seitan, shrimp, etc.) and most branded
# MANUAL_FOODS ship without the essential-amino-acid panel, so they came through with 0 AA. That would
# break the day-level amino-acid breakdown + protein-quality score. Backfill any protein food still
# missing AA from a standard composition profile (EAA as a FRACTION of protein, from published food-
# composition tables) so the AA math is realistic, not guessed-per-food. Real USDA AA is never overwritten.
# Profiles capture WHY quality differs: wheat gluten is lysine-poor (low tier); soy/dairy/egg/meat balanced.
AA_PROFILE = {  # grams of AA per gram of protein
    # NOT GUESSED — these 7 are MEDIANS computed from real USDA SR Legacy records that carry the amino-acid
    # panel (this build's own raw data): meat n=2170, grain n=303, fish n=263, dairy n=218, legume n=146,
    # egg n=52, soy n=40. (See data-build script that wrote /tmp/usda_aa_profiles.json.)
    "dairy":  {"leucine":.091,"lysine":.073,"isoleucine":.048,"valine":.060,"threonine":.037,"methionine":.024,"cystine":.010,"phenylalanine":.050,"tyrosine":.042,"tryptophan":.013,"histidine":.027},
    "egg":    {"leucine":.086,"lysine":.068,"isoleucine":.050,"valine":.058,"threonine":.044,"methionine":.025,"cystine":.022,"phenylalanine":.052,"tyrosine":.040,"tryptophan":.013,"histidine":.025},
    "meat":   {"leucine":.080,"lysine":.085,"isoleucine":.045,"valine":.050,"threonine":.044,"methionine":.026,"cystine":.011,"phenylalanine":.040,"tyrosine":.034,"tryptophan":.011,"histidine":.032},
    "fish":   {"leucine":.081,"lysine":.092,"isoleucine":.046,"valine":.051,"threonine":.044,"methionine":.030,"cystine":.011,"phenylalanine":.039,"tyrosine":.034,"tryptophan":.011,"histidine":.029},
    "soy":    {"leucine":.074,"lysine":.060,"isoleucine":.045,"valine":.047,"threonine":.040,"methionine":.012,"cystine":.012,"phenylalanine":.048,"tyrosine":.036,"tryptophan":.013,"histidine":.025},
    "legume": {"leucine":.079,"lysine":.069,"isoleucine":.044,"valine":.052,"threonine":.038,"methionine":.013,"cystine":.011,"phenylalanine":.054,"tyrosine":.028,"tryptophan":.012,"histidine":.028},
    "grain":  {"leucine":.073,"lysine":.031,"isoleucine":.038,"valine":.048,"threonine":.032,"methionine":.018,"cystine":.020,"phenylalanine":.049,"tyrosine":.030,"tryptophan":.012,"histidine":.024},
    # USDA SR Legacy carries NO amino-acid panel for whey or vital wheat gluten, so these two use documented
    # composition from the literature: whey = standard whey-isolate profile (leucine 10.5% verified); gluten =
    # vital wheat gluten (severely lysine-limited at ~1.7%, the reason seitan scores low quality).
    "whey":   {"leucine":.105,"lysine":.095,"isoleucine":.055,"valine":.054,"threonine":.065,"methionine":.022,"cystine":.024,"phenylalanine":.030,"tyrosine":.032,"tryptophan":.020,"histidine":.017},
    "gluten": {"leucine":.068,"lysine":.017,"isoleucine":.037,"valine":.040,"threonine":.025,"methionine":.015,"cystine":.020,"phenylalanine":.053,"tyrosine":.033,"tryptophan":.010,"histidine":.020},
}
def aa_profile_for(f):
    n = f["name"].lower(); c = f.get("cat","")
    # nutritional yeast (45g protein/100g) & seaweed/nori carry real protein but ship no USDA AA panel — they
    # were contributing ZERO amino acids to the day-level breakdown (audit finding 2026-06-20). Yeast & sea
    # vegetables are reasonably complete proteins, so map them to the soy profile rather than leave them at 0.
    if "nutritional yeast" in n or "seaweed" in n or "nori" in n or "spirulina" in n: return "soy"
    if "whey" in n or ("protein powder" in n and "pea" not in n and "rice" not in n): return "whey"
    if "soy protein isolate" in n: return "soy"
    if "pea protein isolate" in n: return "legume"
    if "casein" in n: return "dairy"
    if "pea & rice" in n or "pea and rice" in n: return "soy"   # blend ~ soy-like completeness
    if "seitan" in n or "wheat gluten" in n: return "gluten"
    if "tofu" in n or "tempeh" in n or "edamame" in n or "soy" in n or "tvp" in n: return "soy"
    if c == "Eggs & Dairy": return "egg" if ("egg" in n and "eggplant" not in n) else "dairy"
    if c == "Seafood": return "fish"
    if c == "Legumes" or "bean" in n or "lentil" in n or "chickpea" in n or "hummus" in n or "pea" in n: return "legume"
    if c == "Meat & Poultry" or any(k in n for k in ("chicken","beef","turkey","pork","lamb","duck","ham","bison","venison")): return "meat"
    if c == "Grains & Starches" or "granola" in n or "oat" in n or "bread" in n or "rice" in n or "pasta" in n: return "grain"
    return None
AA_FIELDS = ["leucine","lysine","isoleucine","valine","threonine","methionine","cystine","phenylalanine","tyrosine","tryptophan","histidine"]
for f in out_foods:
    if f.get("protein_g",0) >= 3 and not f.get("leucine_g",0):
        prof = aa_profile_for(f)
        if prof:
            pr = AA_PROFILE[prof]; P = f["protein_g"]
            for a in AA_FIELDS: f[a+"_g"] = round(P*pr[a], 4)

# 6b (moved). Build recipe foods by summing their ingredients, now that BOTH
# USDA foods and MANUAL_FOODS are in out_foods, recipes can reference either.
SUM_FIELDS = list(NUTRIENTS.keys()) + ["omega3_g","omega6_g","epa_dha_mg","ala_g","omega9_g"]
food_by_name = {f["name"]: f for f in out_foods}
recipe_out = []
for rc in RECIPES:
    tot = {k:0.0 for k in SUM_FIELDS}; grams = 0.0; ings = []; missing = False
    for nm, g in rc["ing"]:
        f = food_by_name.get(nm)
        if not f:
            print("  ! recipe '%s' missing ingredient: %s" % (rc["name"], nm)); missing = True; break
        grams += g; ings.append({"name": nm, "g": g})
        for k in SUM_FIELDS:
            tot[k] += (f.get(k,0) or 0) / 100.0 * g
    if missing or grams <= 0:
        continue
    makes = rc.get("makes", 1)
    batch_g = round(grams)
    serving_g = max(5, round(grams / makes))   # one serving = batch ÷ pieces
    rf = {"id": rc.get("id") or "recipe_"+rc["name"].lower().replace(" ","_").replace("&","and"),
          # usda lists the real ingredient names so the runtime diet screens (which match on
          # name+usda text) correctly exclude recipes containing whey/tuna/gelatin/etc.
          "name": rc["name"], "cat": "Sweet Treats & Snacks", "usda": "Recipe: " + ", ".join(i["name"] for i in ings),
          "form": "recipe", "recipe": True, "kind": rc["kind"], "steps": rc.get("steps", []),
          "ingredients": ings, "serving_g": serving_g, "batch_g": batch_g, "makes": makes}
    for k in SUM_FIELDS:
        rf[k] = round(tot[k] / grams * 100.0, 4)   # per-100g of the finished recipe
    rf["data_quality"] = round(sum(food_by_name[i["name"]]["data_quality"] for i in ings)/len(ings), 2)
    rf["portions"] = ([{"label":"1 serving","grams":serving_g},{"label":"whole batch","grams":batch_g}]
                      if makes>1 else [{"label":"1 serving","grams":serving_g},{"label":"1/2 serving","grams":max(5,round(serving_g/2))}])
    recipe_out.append(rf)
    report.append({"name":rc["name"],"cat":"Recipe","fdc":"-","usda_desc":"+".join(i["name"] for i in ings),
                   "kcal":rf["kcal"],"protein_g":rf["protein_g"],"carb_g":rf["carb_g"],"fat_g":rf["fat_g"],
                   "omega3_g":rf["omega3_g"],"epa_dha_mg":rf["epa_dha_mg"],"data_quality":rf["data_quality"],
                   "n_portions":round(grams)})
out_foods += recipe_out

out_foods.sort(key=lambda x: (x["cat"], x["name"]))

# ---------------------------------------------------------------------------
# 6c. ACCURACY AUDIT, runs every build. Flags any food whose calories don't
#     reconcile with its macros (catches kJ/kcal mixups, bad matches, etc.).
# ---------------------------------------------------------------------------
audit_flags = []
for f in out_foods:
    # fiber yields ~2 kcal/g, not 4, so subtract it out for a fair estimate
    fib = f.get("fiber_g", 0) or 0
    atw = 4*f["protein_g"] + 4*max(0, f["carb_g"]-fib) + 2*fib + 9*f["fat_g"]
    kc = f["kcal"]
    if kc <= 0 and atw > 5:
        audit_flags.append((f["name"], "0 kcal but macros=%.0f" % atw))
    elif atw > 10 and (kc/atw > 1.35 or kc/atw < 0.55):
        audit_flags.append((f["name"], "kcal=%.0f vs est=%.0f (ratio %.2f)" % (kc, atw, kc/atw)))

# ---------------------------------------------------------------------------
# 7. DRI / reference targets (adult 19-50). RDA where it exists, else AI.
#    Sodium is an UPPER limit. EPA+DHA is a general-health target (no formal RDA).
# ---------------------------------------------------------------------------
DRI = {
  "meta": {
    "source": "US/Canada Dietary Reference Intakes (RDA, or AI where no RDA). Adults 19-50.",
    "notes": "sodium = upper limit (CDRR 2300mg); omega-3 EPA+DHA target = 2000mg/day MINIMUM and total omega-3 = 2g MINIMUM (OB preference, above the ~250-500mg general-health floor, most clients will need fatty fish or a fish-oil supplement to hit it). FIBER target = max(30g, 14g/1000kcal) and is treated as a MINIMUM to meet or exceed: the Reynolds et al. 2019 Lancet dose-response meta-analysis found full benefit (15-30% lower all-cause/CV mortality, 16-24% less CHD/stroke/T2D/colorectal cancer) at 25-35g+/day."
  },
  "male": {
    "fiber_g":"calc","sodium_mg":2300,
    "calcium_mg":1000,"iron_mg":8,"magnesium_mg":400,"phosphorus_mg":700,"potassium_mg":3400,
    "zinc_mg":11,"copper_mg":0.9,"manganese_mg":2.3,"selenium_ug":55,"iodine_ug":150,
    "vit_a_ug":900,"vit_c_mg":90,"vit_d_ug":15,"vit_e_mg":15,"vit_k_ug":120,
    "thiamin_mg":1.2,"riboflavin_mg":1.3,"niacin_mg":16,"pantothenic_mg":5,"vit_b6_mg":1.3,
    "folate_ug":400,"vit_b12_ug":2.4,"choline_mg":550,
    "omega3_g":2.0,"omega6_g":17,"epa_dha_mg":2000
  },
  "female": {
    "fiber_g":"calc","sodium_mg":2300,
    "calcium_mg":1000,"iron_mg":18,"magnesium_mg":310,"phosphorus_mg":700,"potassium_mg":2600,
    "zinc_mg":8,"copper_mg":0.9,"manganese_mg":1.8,"selenium_ug":55,"iodine_ug":150,
    "vit_a_ug":700,"vit_c_mg":75,"vit_d_ug":15,"vit_e_mg":15,"vit_k_ug":90,
    "thiamin_mg":1.1,"riboflavin_mg":1.1,"niacin_mg":14,"pantothenic_mg":5,"vit_b6_mg":1.3,
    "folate_ug":400,"vit_b12_ug":2.4,"choline_mg":425,
    "omega3_g":2.0,"omega6_g":12,"epa_dha_mg":2000
  }
}

# nutrient display metadata (label, unit, group), drives the UI score panel
NUTRIENT_META = [
  ["protein_g","Protein","g","macro"],["carb_g","Carbs","g","macro"],["fat_g","Fat","g","macro"],
  ["fiber_g","Fiber","g","macro"],["sodium_mg","Sodium","mg","limit"],
  ["omega3_g","Omega-3 (total)","g","fat"],["omega6_g","Omega-6 (total)","g","fat"],
  ["epa_dha_mg","EPA+DHA","mg","fat"],
  ["vit_a_ug","Vitamin A","µg","vitamin"],["vit_c_mg","Vitamin C","mg","vitamin"],
  ["vit_d_ug","Vitamin D","µg","vitamin"],["vit_e_mg","Vitamin E","mg","vitamin"],
  ["vit_k_ug","Vitamin K","µg","vitamin"],["thiamin_mg","Thiamin (B1)","mg","vitamin"],
  ["riboflavin_mg","Riboflavin (B2)","mg","vitamin"],["niacin_mg","Niacin (B3)","mg","vitamin"],
  ["pantothenic_mg","Pantothenic (B5)","mg","vitamin"],["vit_b6_mg","Vitamin B6","mg","vitamin"],
  ["folate_ug","Folate","µg","vitamin"],["vit_b12_ug","Vitamin B12","µg","vitamin"],
  ["choline_mg","Choline","mg","vitamin"],
  ["calcium_mg","Calcium","mg","mineral"],["iron_mg","Iron","mg","mineral"],
  ["magnesium_mg","Magnesium","mg","mineral"],["phosphorus_mg","Phosphorus","mg","mineral"],
  ["potassium_mg","Potassium","mg","mineral"],["zinc_mg","Zinc","mg","mineral"],
  ["copper_mg","Copper","mg","mineral"],["manganese_mg","Manganese","mg","mineral"],
  ["selenium_ug","Selenium","µg","mineral"],
  # NOTE: iodine intentionally omitted from the scored panel, USDA SR Legacy lacks
  # reliable iodine values for most foods, so it would always read ~0% and mislead.
]

# Common supplements a coach can toggle on. Each ADDS its amounts to the day's
# totals so the score reflects what the client actually takes. Doses are typical.
# FISH OIL is OB's standard, 2 g EPA+DHA a day (the DRI notes below: "EPA+DHA target = 2000mg/day MINIMUM ... OB
# preference"; he told a client "2g EPA+DHA daily" on her 2026-10-01 call). On 10-01 morning this was cut to the
# 1,100 mg in 2 softgels of plain Ultimate Omega, which overrode his number; reverted the same day. The fix for the real
# problem (a dose the named product did not give) is the product: Nordic Naturals Ultimate Omega 2X, 2 softgels = EPA
# 1,125 mg + DHA 875 mg = 2,000 mg (2,150 mg total omega-3; Supplement Facts, read 2026-10-01). FDA: up to 2 g a day from
# supplements, 3 g from all sources (NIH ODS); a salmon day can pass 3 g in total, which is OB's call.
# IRON is Thorne Iron Bisglycinate, 25 mg a capsule (thorne.com, read 2026-10-01), not 18 mg, and it carries the guide's
# own condition ("only if labs/needs indicate"), which the client PDF used to drop.
SUPPLEMENTS = [
  {"key":"fishoil","label":"Fish oil (Omega-3)","dose":"about 2,000 mg EPA+DHA a day","add":{"epa_dha_mg":2000,"omega3_g":2.15}},
  {"key":"vitd","label":"Vitamin D3","dose":"2000 IU","add":{"vit_d_ug":50}},
  # Multivitamin = EKKOVISION Multivitamin (B0DQPDBDMM), the recommended brand. Amounts are its VERIFIED
  # per-serving label (3 caps): mega-dosed on vitamins (C 500mg, D3 125mcg, E 150mg, K 700mcg, B6 15mg,
  # B12 250mcg, folate 600mcg) + zinc/selenium/manganese/chromium. It is IRON-FREE and intentionally omits
  # B2, B3, B5, copper, magnesium, calcium (those stay food-covered + the targeted toggles below).
  # "brand" names the product these amounts belong to. The app labels, doses and COUNTS a multi only as the brand
  # the client is actually told to buy (suppBrands): vegan/ovo clients, and the halal/kosher gelatin swap, are
  # recommended Ritual Essential, so its own labels live in "variants". A recommended brand with no verified
  # label here is shown generically and counts nothing, never another product's numbers.
  # RITUAL ESSENTIAL 18+, VERIFIED from the manufacturer's Supplement Facts panels (ritual.com, read 2026-09-24).
  # Serving = 2 vegan capsules. The men's and women's formulas differ, so the variant is chosen by the client's sex.
  #   Men 18+  (ritual.com/collections/multivitamins-nutrients/products/essential-multivitamin-for-men):
  #     vitamin A 180 mcg RAE (retinyl palmitate), D3 50 mcg / 2000 IU (lichen), E 6.7 mg, folate 200 mcg DFE
  #     (5-MTHF), B12 8 mcg, magnesium 30 mg, zinc 2.4 mg, omega-3 DHA 330 mg (microalgae), boron 0.7 mg, K2 90 mcg.
  #   Women 18+ (ritual.com/collections/multivitamins-nutrients/products/essential-for-women-multivitamin):
  #     D3 50 mcg / 2000 IU, E 6.7 mg, folate 1000 mcg DFE (5-MTHF), B12 8 mcg, iron 8 mg (ferrous bisglycinate),
  #     magnesium 30 mg, omega-3 DHA 330 mg, boron 0.7 mg, K2 90 mcg. No vitamin A, no zinc.
  #   Boron is not tracked. Folate counts in mcg DFE as labelled (food folate here is USDA total folate, the same
  #   number for unfortified food). K2 counts toward vitamin K the way Ekkovision's K does.
  {"key":"multi","label":"Multivitamin (Ekkovision)","dose":"3 caps","brand":"Ekkovision","add":{"vit_a_ug":1500,"vit_c_mg":500,"vit_d_ug":125,"vit_e_mg":150,"vit_k_ug":700,"thiamin_mg":6,"vit_b6_mg":15,"folate_ug":600,"vit_b12_ug":250,"zinc_mg":30,"selenium_ug":100,"manganese_mg":6},
   "variants":[{"brand":"Ritual","dose":"2 caps",
     "male":{"label":"Multivitamin (Ritual Essential for Men 18+)","product":"Essential for Men 18+",
             "add":{"vit_a_ug":180,"vit_d_ug":50,"vit_e_mg":6.7,"folate_ug":200,"vit_b12_ug":8,"magnesium_mg":30,"zinc_mg":2.4,"epa_dha_mg":330,"omega3_g":0.33,"vit_k_ug":90}},
     "female":{"label":"Multivitamin (Ritual Essential for Women 18+)","product":"Essential for Women 18+",
             "add":{"vit_d_ug":50,"vit_e_mg":6.7,"folate_ug":1000,"vit_b12_ug":8,"iron_mg":8,"magnesium_mg":30,"epa_dha_mg":330,"omega3_g":0.33,"vit_k_ug":90}}},
     # THORNE BASIC NUTRIENTS 2/DAY, VERIFIED from thorne.com (products/dp/basic-nutrients-2-day, read 2026-09-24),
     # 2 hypromellose capsules: A 1500 mcg (450 beta-carotene + 1050 palmitate), C 250 mg, D3 50 mcg, E 16.5 mg
     # (d-alpha succinate; the 24 mg gamma tocopherol is not vitamin E), K1 200 + K2 200 mcg, B1 50 mg, B2 12 mg,
     # niacinamide 80 mg, B5 45 mg, B6 20 mg, folate 667 mcg DFE, B12 600 mcg, calcium 52 mg, magnesium 20 mg,
     # zinc 15 mg, selenium 200 mcg, copper 0.75 mg, manganese 3 mg (+ biotin, boron, chromium, iodine 75 mcg,
     # lutein: not tracked). Its 80 mg of niacinamide is over the 35 mg UL for supplemental niacin, which the FNB
     # applies to nicotinamide too (NIH ODS niacin fact sheet), so the app never picks it; it is here so that is
     # a verified decision, not a missing label.
     {"brand":"Thorne","dose":"2 caps",
      "male":{"label":"Multivitamin (Thorne Basic Nutrients 2/Day)","product":"Basic Nutrients 2/Day",
              "add":{"vit_a_ug":1500,"vit_c_mg":250,"vit_d_ug":50,"vit_e_mg":16.5,"vit_k_ug":400,"thiamin_mg":50,"riboflavin_mg":12,"niacin_mg":80,"pantothenic_mg":45,"vit_b6_mg":20,"folate_ug":667,"vit_b12_ug":600,"calcium_mg":52,"magnesium_mg":20,"zinc_mg":15,"selenium_ug":200,"copper_mg":0.75,"manganese_mg":3}}},
     # NATURE MADE MULTI FOR HIM / FOR HER tablets, VERIFIED from the Supplement Facts panels on naturemade.com
     # (products/nature-made-mens-multi-tablets and nature-made-womens-multi-tablets, label images read 2026-09-24;
     # every amount cross-checked against its printed %DV). 1 tablet. The tablets contain GELATIN, so they only go
     # to clients with no gelatin rule (the guide marks the brand not vegan).
     #   Him: A 750 mcg, C 180 mg, D3 25 mcg (1000 IU), E 22.5 mg, K 80 mcg, B1 1.5 mg, B2 1.7 mg, niacinamide 20 mg,
     #        B6 4 mg, folate 665 mcg DFE (400 folic acid), B12 18 mcg, B5 10 mg, calcium 160 mg, magnesium 100 mg,
     #        zinc 11 mg, selenium 55 mcg, copper 0.9 mg, manganese 2.3 mg; no iron.
     #   Her: same except B6 2 mg, folate 1000 mcg DFE (600 folic acid), B12 6 mcg, calcium 250 mg, iron 18 mg.
     {"brand":"Nature Made","dose":"1 tablet",
      "male":{"label":"Multivitamin (Nature Made Multi For Him)","product":"Multi For Him",
              "add":{"vit_a_ug":750,"vit_c_mg":180,"vit_d_ug":25,"vit_e_mg":22.5,"vit_k_ug":80,"thiamin_mg":1.5,"riboflavin_mg":1.7,"niacin_mg":20,"vit_b6_mg":4,"folate_ug":665,"vit_b12_ug":18,"pantothenic_mg":10,"calcium_mg":160,"magnesium_mg":100,"zinc_mg":11,"selenium_ug":55,"copper_mg":0.9,"manganese_mg":2.3}},
      "female":{"label":"Multivitamin (Nature Made Multi For Her)","product":"Multi For Her",
              "add":{"vit_a_ug":750,"vit_c_mg":180,"vit_d_ug":25,"vit_e_mg":22.5,"vit_k_ug":80,"thiamin_mg":1.5,"riboflavin_mg":1.7,"niacin_mg":20,"vit_b6_mg":2,"folate_ug":1000,"vit_b12_ug":6,"pantothenic_mg":10,"calcium_mg":250,"iron_mg":18,"magnesium_mg":100,"zinc_mg":11,"selenium_ug":55,"copper_mg":0.9,"manganese_mg":2.3}}}]},
  {"key":"magnesium","label":"Magnesium","dose":"200mg","add":{"magnesium_mg":200}},
  {"key":"calcium","label":"Calcium","dose":"500mg","add":{"calcium_mg":500}},
  {"key":"iron","label":"Iron","dose":"25 mg a day","when":"Only if a blood test shows your iron is low. Ask your doctor before you start.","add":{"iron_mg":25}},
  {"key":"b12","label":"Vitamin B12","dose":"500µg","add":{"vit_b12_ug":500}},
  {"key":"creatine","label":"Creatine","dose":"5g","add":{}},
  {"key":"protein_whey","label":"Whey protein","dose":"1 scoop ≈ 25g protein","diet":"animal","add":{"protein_g":25,"carb_g":2}},
  {"key":"protein_plant","label":"Plant protein","dose":"1 scoop ≈ 24g protein","diet":"plant","add":{"protein_g":24,"carb_g":4}},
]

# ---------------------------------------------------------------------------
# 8. Write outputs
# ---------------------------------------------------------------------------
with open(os.path.join(APP_DATA, "foods.js"), "w", encoding="utf-8") as f:
    f.write("// Auto-generated by data-build/build_foods.py from USDA FoodData Central (SR Legacy).\n")
    f.write("// Per-100g values. Do not edit by hand; re-run the builder.\n")
    f.write("window.OB_FOODS = ")
    json.dump(out_foods, f, ensure_ascii=False, separators=(",", ":"))
    f.write(";\n")

with open(os.path.join(APP_DATA, "dri.js"), "w", encoding="utf-8") as f:
    f.write("// Daily reference targets (DRI) + nutrient display metadata.\n")
    f.write("window.OB_DRI = ");      json.dump(DRI, f, ensure_ascii=False); f.write(";\n")
    f.write("window.OB_NUTRIENT_META = "); json.dump(NUTRIENT_META, f, ensure_ascii=False); f.write(";\n")
    f.write("window.OB_SUPPLEMENTS = "); json.dump(SUPPLEMENTS, f, ensure_ascii=False); f.write(";\n")

with open(os.path.join(HERE, "build_report.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(report[0].keys()))
    w.writeheader(); w.writerows(report)

print("Foods: %d (%d USDA + %d recipes)" % (len(out_foods), len(out_foods)-len(recipe_out), len(recipe_out)))
print("foods.js bytes:", os.path.getsize(os.path.join(APP_DATA, "foods.js")))
print("\nACCURACY AUDIT (calories vs macros): %s" % ("ALL %d FOODS PASS ✓" % len(out_foods) if not audit_flags else "%d FLAGGED:" % len(audit_flags)))
for nm, why in audit_flags:
    print("   ⚠ %s, %s" % (nm, why))
# 6d. RECIPE NAME AUDIT (2026-09-24): a treat or snack whose name promises protein delivers it per serving.
# "High-protein chia pudding" had 5 g and three "protein" treats had 6-7 g before this check existed.
name_flags = []
for f in out_foods:
    if not f.get("recipe"): continue
    s_ = (f.get("serving_g") or 150) / 100.0; p_ = f["protein_g"] * s_; kc_ = (f["kcal"] * s_) or 1; share_ = p_ * 4 / kc_
    n_ = f["name"].lower()
    if "high-protein" in n_ and p_ < 15: name_flags.append((f["name"], "'high-protein' with %.0f g protein per serving" % p_))
    elif "protein" in n_ and p_ < 10 and share_ < 0.25: name_flags.append((f["name"], "'protein' with %.0f g protein (%.0f%% of calories)" % (p_, share_ * 100)))
print("RECIPE NAME AUDIT: %s" % ("ALL %d RECIPE NAMES HONEST ✓" % sum(1 for f in out_foods if f.get("recipe")) if not name_flags else "%d FLAGGED:" % len(name_flags)))
for nm, why in name_flags:
    print("   ⚠ %s, %s" % (nm, why))
if unmatched:
    print("\nUNMATCHED (%d), fix keywords or pin fdc:" % len(unmatched))
    for u in unmatched:
        print("   -", u)
