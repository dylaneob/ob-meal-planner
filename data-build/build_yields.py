#!/usr/bin/env python3
"""
Generate app/data/yields.js: how much of a food you BUY to end up with the cooked weight a plan calls for.

Why this exists. Every portion in a plan is a COOKED weight, because that is what the client eats and what
the macros are computed from. The grocery list was printing those same cooked grams as the amount to buy,
so a plan needing 910g of cooked brown rice told the client to buy 2 lb of rice when it needs about 300g dry,
and a plan needing 790g of cooked ground beef told them to buy 1.7 lb when it takes about 1 kg raw.

Method, and why it differs by food:
  * STARCHES AND LEGUMES absorb water and lose nothing else, so calories are conserved and the ratio of
    calorie densities is the mass ratio:        dry_g = cooked_g * (kcal_cooked / kcal_dry)
  * MEAT, POULTRY AND FISH lose water AND render fat, so calories are NOT conserved and the calorie ratio
    understates how much to buy. Protein is conserved, so protein density gives the true mass ratio:
                                                raw_g = cooked_g * (protein_cooked / protein_raw)
    Checked against a known case: chicken breast comes out at 1.38, i.e. a 72% cooked yield, which matches
    USDA's published yield for roasted boneless breast.

Every number comes from USDA SR Legacy (the same source foods.js is built from), read out of the local
srl.db. Nothing here is estimated by hand. Re-run after changing the food list; review the report it prints.
"""
import json, os, re, sqlite3, sys

DB   = "/Volumes/T7/fdc-branded/srl.db"
APP  = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app")
OUT  = os.path.join(APP, "data", "yields.js")

# cooked food in foods.js  ->  (SR Legacy description of the PURCHASE form, how it is bought)
# The purchase description is matched exactly-ish against SR Legacy; the report flags anything unmatched.
RAW_FOR = {
  # ---- Grains & starches: bought DRY, calorie-ratio method ----
  "Barley, cooked":              ("Barley, pearled, raw", "dry"),
  "Brown rice, cooked":          ("Rice, brown, long-grain, raw (Includes foods for USDA's Food Distribution Program)", "dry"),
  "Buckwheat groats, cooked":    ("Buckwheat groats, roasted, dry", "dry"),
  "Bulgur, cooked":              ("Bulgur, dry", "dry"),
  "Couscous, cooked":            ("Couscous, dry", "dry"),
  "Grits, cooked":               ("Cornmeal, degermed, enriched, yellow", "dry"),
  "Millet, cooked":              ("Millet, raw", "dry"),
  "Pasta, cooked":               ("Pasta, dry, enriched", "dry"),
  "Whole wheat pasta, cooked":   ("Pasta, whole-wheat, dry", "dry"),
  "Quinoa, cooked":              ("Quinoa, uncooked", "dry"),
  "White rice, cooked":          ("Rice, white, long-grain, regular, raw, enriched", "dry"),
  "Wild rice, cooked":           ("Wild rice, raw", "dry"),
  "Oats, cooked (in water)":     ("Cereals, oats, regular and quick, not fortified, dry", "dry"),
  "Potato, baked, flesh":        ("Potatoes, flesh and skin, raw", "raw"),
  # baked sweet potato printed at baked weight on a shopping list (2026-09-30); same method as the potato above
  "Sweet potato, baked":         ("Sweet potato, raw, unprepared (Includes foods for USDA's Food Distribution Program)", "raw"),
  # ---- Vegetables cooked from raw. Small factors, but the row should still say what to buy. ----
  "Bell pepper, cooked":         ("Peppers, sweet, red, raw", "raw"),
  "Sweet corn, cooked":          ("Corn, sweet, yellow, raw", "raw"),
  # ---- Legumes: bought DRY (or canned; the note in the app covers cans) ----
  "Black beans, cooked":         ("Beans, black, mature seeds, raw", "dry"),
  "Black-eyed peas, cooked":     ("Cowpeas, common (blackeyes, crowder, southern), mature seeds, raw", "dry"),
  "Chickpeas, cooked":           ("Chickpeas (garbanzo beans, bengal gram), mature seeds, raw", "dry"),
  "Kidney beans, cooked":        ("Beans, kidney, all types, mature seeds, raw", "dry"),
  "Lentils, cooked":             ("Lentils, raw", "dry"),
  "Lima beans, cooked":          ("Lima beans, large, mature seeds, raw", "dry"),
  "Navy beans, cooked":          ("Beans, navy, mature seeds, raw", "dry"),
  "Pinto beans, cooked":         ("Beans, pinto, mature seeds, raw", "dry"),
  "Split peas, cooked":          ("Peas, green, split, mature seeds, raw", "dry"),
  "White beans, cooked":         ("Beans, white, mature seeds, raw", "dry"),
  "Soybeans, cooked":            ("Soybeans, mature seeds, raw", "dry"),
  # ---- Protein: bought RAW, protein-ratio method ----
  "Chicken breast, cooked":      ("Chicken, broiler or fryers, breast, skinless, boneless, meat only, raw", "raw"),
  "Chicken thigh, cooked":       ("Chicken, broilers or fryers, dark meat, thigh, meat only, raw", "raw"),
  "Chicken drumstick, cooked":   ("Chicken, broilers or fryers, drumstick, meat only, raw", "raw"),   # unmatched in SR Legacy; falls through
  "Chicken, ground, cooked":     ("Chicken, ground, raw", "raw"),
  "Beef, ground 97/3, cooked":   ("Beef, ground, 97% lean meat / 3% fat, raw", "raw"),
  "Beef, ground 93/7, cooked":   ("Beef, ground, 93% lean meat / 7% fat, raw", "raw"),
  # added 2026-09-24: boneless or ground proteins that printed a COOKED weight on the grocery list. Bone-in cuts
  # (drumsticks, leg quarters, lamb chops, turkey thigh) are left out on purpose: the raw entries are meat only,
  # so they would understate what to buy by the weight of the bone. Ribeye is left out because its cooked entry
  # includes the fat and the raw one is lean only, which would skew the protein ratio.
  "Beef sirloin, lean, grilled": ('Beef, top sirloin, steak, separable lean only, trimmed to 1/8" fat, select, raw', "raw"),
  "Venison, ground, cooked":     ("Game meat, deer, ground, raw", "raw"),
  "Duck, lean, cooked":          ("Duck, domesticated, meat only, raw", "raw"),
  "Shrimp, cooked":              ("Crustaceans, shrimp, raw", "raw"),
  "Scallops, cooked":            ("Mollusks, scallop, mixed species, raw", "raw"),
  "Beef, top round, lean, cooked": ("Beef, round, top round, steak, separable lean only, trimmed to 1/8\" fat, all grades, raw", "raw"),
  "Beef tenderloin, lean, roasted": ("Beef, tenderloin, steak, separable lean only, trimmed to 1/8\" fat, all grades, raw", "raw"),
  "Turkey breast, roasted":      ("Turkey, whole, breast, meat only, raw", "raw"),
  "Turkey, ground 93/7, cooked": ("Turkey, ground, 93% lean, 7% fat, raw", "raw"),
  "Pork tenderloin, lean, roasted": ("Pork, fresh, loin, tenderloin, separable lean only, raw", "raw"),
  "Pork chop, lean, cooked":     ("Pork, fresh, loin, center loin (chops), bone-in, separable lean only, raw", "raw"),
  "Pork, ground, cooked":        ("Pork, ground, 96% lean / 4% fat, raw", "raw"),
  "Lamb, ground, cooked":        ("Lamb, ground, raw", "raw"),
  "Bison, ground, cooked":       ("Game meat , bison, ground, raw", "raw"),
  # ---- Seafood: bought RAW, protein-ratio method ----
  "Cod, Atlantic, cooked":       ("Fish, cod, Atlantic, raw", "raw"),
  "Haddock, cooked":             ("Fish, haddock, raw", "raw"),
  "Halibut, cooked":             ("Fish, halibut, Atlantic and Pacific, raw", "raw"),
  "Tilapia, cooked":             ("Fish, tilapia, raw", "raw"),
  "Salmon, Atlantic farmed, cooked": ("Fish, salmon, Atlantic, farmed, raw", "raw"),
  "Salmon, Atlantic wild, cooked":   ("Fish, salmon, Atlantic, wild, raw", "raw"),
  "Salmon, sockeye, cooked":     ("Fish, salmon, sockeye, raw", "raw"),
  "Trout, rainbow, farmed, cooked": ("Fish, trout, rainbow, farmed, raw", "raw"),
  "Tuna, yellowfin, cooked":     ("Fish, tuna, fresh, yellowfin, raw", "raw"),
  "Shrimp, cooked":              ("Crustaceans, shrimp, mixed species, raw", "raw"),
  "Scallops, cooked":            ("Mollusks, scallop, mixed species, raw", "raw"),
  "Pollock, cooked":             ("Fish, pollock, Alaska, raw", "raw"),
  "Flounder/sole, cooked":       ("Fish, flatfish (flounder and sole species), raw", "raw"),
  "Snapper, cooked":             ("Fish, snapper, mixed species, raw", "raw"),
  "Mackerel, Atlantic, cooked":  ("Fish, mackerel, Atlantic, raw", "raw"),
}

def nutrient(cur, fdc, nid):
    r = cur.execute("SELECT amt FROM nut WHERE fdc_id=? AND nid=?", (fdc, nid)).fetchone()
    return r[0] if r else None

def find(cur, desc):
    r = cur.execute("SELECT fdc_id, description FROM food WHERE description = ?", (desc,)).fetchone()
    if r: return r
    r = cur.execute("SELECT fdc_id, description FROM food WHERE description LIKE ? ORDER BY length(description) LIMIT 1",
                    (desc + "%",)).fetchone()
    return r

def main():
    if not os.path.exists(DB):
        sys.exit("SR Legacy db not found at " + DB + " (plug in T7)")
    foods = json.loads(os.popen(
        "cd %s && node -e \"global.window=global;require('./data/foods.js');"
        "const F=global.OB_FOODS||Object.values(global).find(v=>Array.isArray(v)&&v[0]&&v[0].fiber_g!==undefined);"
        "console.log(JSON.stringify(F.map(f=>({name:f.name,kcal:f.kcal,protein_g:f.protein_g,cat:f.cat,portions:f.portions||[]}))))\""
        % APP).read())
    by_name = {f["name"]: f for f in foods}

    out, report, missing = {}, [], []

    # FIRST PASS, and it needs no lookup at all: foods.js often already carries BOTH forms of the same food
    # ("Egg, whole, raw" next to "Egg, whole, cooked", "Broccoli, raw" next to "Broccoli, cooked"). When the
    # pair is already in the list the factor is right there, from the same USDA build, so use it and skip the
    # hand-written mapping. This is what covers eggs and the cooked vegetables.
    def base(n):
        n = re.sub(r",?\s*(cooked \(in water\)|cooked|raw|dry \(raw\)|dry|uncooked|baked, flesh|roasted|boiled)\b", "", n, flags=re.I)
        return re.sub(r"[\s,]+$", "", n).strip().lower()
    raw_by_base = {}
    for f in foods:
        if re.search(r"\b(raw|dry|uncooked)\b", f["name"], re.I):
            raw_by_base.setdefault(base(f["name"]), f)
    for f in foods:
        if not re.search(r"\b(cooked|roasted|boiled)\b", f["name"], re.I): continue
        # VEGETABLES ARE EXCLUDED FROM THIS, ON PURPOSE. The whole method rests on calories being conserved
        # and only water moving, and that is not true of a boiled vegetable: it leaches solids into the water
        # while it takes water on. Derived that way, cooked carrots came out at 0.854, which would tell a
        # client to buy LESS raw carrot than the cooked weight they need, and spinach came out at 1.000 when
        # a pan of spinach cooks down by about two thirds. Wrong in both directions. Vegetables keep their
        # "(cooked weight)" label unless they are mapped by hand below against a checked SR Legacy raw row.
        if f["cat"] == "Vegetables": continue
        sib = raw_by_base.get(base(f["name"]))
        if not sib or not sib.get("kcal"): continue
        if sib["name"] == f["name"]: continue      # "Peanuts, dry-roasted" matching itself
        # A food bought and eaten by the PIECE keeps its count: USDA weighs a large egg at 50g raw and 50g hard-boiled.
        # The calorie ratio (155/143) said 1.084 and turned four eggs into "~5 large" on the shopping list (2026-09-30).
        unit = lambda x: next((p["grams"] for p in x.get("portions", []) if re.match(r"^1 large\b", p.get("label",""), re.I)), None)
        if unit(f) and unit(sib):
            factor, basis = unit(sib) / unit(f), "unit weight (1 large)"
            out[f["name"]] = {"buy": "raw", "factor": round(factor, 3), "src": "USDA portion weights: 1 large = %sg raw, %sg cooked" % (unit(sib), unit(f))}
            report.append((f["name"], "raw", round(factor, 3), basis, "foods.js pair: " + sib["name"]))
            continue
        if f["cat"] in ("Protein", "Seafood"):
            if not sib.get("protein_g"): continue
            factor, basis = f["protein_g"] / sib["protein_g"], "protein"
        else:
            factor, basis = f["kcal"] / sib["kcal"], "kcal"
        lo, hi = (1.03, 1.60) if f["cat"] in ("Protein","Seafood","Eggs & Dairy") else (0.15, 1.60)
        if not (lo <= factor <= hi): continue
        buy = "dry" if re.search(r"\bdry\b", sib["name"], re.I) else "raw"
        out[f["name"]] = {"buy": buy, "factor": round(factor, 3), "src": "foods.js pair: " + sib["name"]}
        report.append((f["name"], buy, round(factor, 3), basis, "foods.js pair: " + sib["name"]))

    for cooked_name, (raw_desc, buy) in sorted(RAW_FOR.items()):
        if cooked_name in out: continue          # already solved from the pair in foods.js
        ck = by_name.get(cooked_name)
        if not ck:
            missing.append((cooked_name, "not in foods.js")); continue
        con = sqlite3.connect(DB); cur = con.cursor()
        hit = find(cur, raw_desc)
        if not hit:
            missing.append((cooked_name, "no SR Legacy match for " + raw_desc)); con.close(); continue
        fdc, desc = hit
        rk, rp = nutrient(cur, fdc, 1008), nutrient(cur, fdc, 1003)
        con.close()
        # SR Legacy carries water-added versions of shrimp, scallops and some pork. Their protein is diluted,
        # so the protein ratio reads as a yield far below anything real (raw shrimp "may contain additives to
        # retain moisture" gives 1.76, i.e. a 57% yield, against the 75-80% shrimp actually loses). Refuse
        # them rather than publish a number that is wrong in the direction of buying too much.
        if re.search(r"added solution|contain additives|retain moisture", desc, re.I):
            missing.append((cooked_name, "SR entry is water-added, not a true raw weight: " + desc)); continue
        if not rk:
            missing.append((cooked_name, "no kcal for " + desc)); continue
        # starches and legumes conserve calories (only water moves); meat and fish conserve PROTEIN but not
        # calories, because fat renders out, so the calorie ratio would understate how much to buy.
        if ck["cat"] in ("Protein", "Seafood"):
            if not rp or rp <= 0:
                missing.append((cooked_name, "no protein for " + desc)); continue
            factor, basis = ck["protein_g"] / rp, "protein"
        else:
            factor, basis = ck["kcal"] / rk, "kcal"
        # A physical sanity bound. Cooking cannot make food gain mass, and nothing loses more than about 40%
        # of its weight, so a raw-to-cooked factor outside 1.03-1.60 means the two SR rows are not the same
        # cut. A dry grain triples or quadruples, so its factor sits between 0.15 and 0.50.
        veg = ck["cat"] == "Vegetables"
        # a vegetable only moves water: boiled ones GAIN it, roasted ones lose it, so either side of 1 is real
        lo, hi = (0.70, 1.60) if (buy == "raw" and veg) else (1.03, 1.60) if buy == "raw" else (0.15, 0.50)
        if not (lo <= factor <= hi):
            missing.append((cooked_name, "factor %.3f outside the plausible %.2f-%.2f for a '%s' food: %s"
                                         % (factor, lo, hi, buy, desc))); continue
        out[cooked_name] = {"buy": buy, "factor": round(factor, 3), "src": desc}
        report.append((cooked_name, buy, round(factor, 3), basis, desc))

    with open(OUT, "w") as fh:
        fh.write("// GENERATED by data-build/build_yields.py from USDA SR Legacy. Do not hand-edit.\n")
        fh.write("// How much to BUY for the cooked weight a plan calls for. A plan's grams are always COOKED\n")
        fh.write("// grams, because that is what the client eats and what the macros are computed from.\n")
        fh.write("//   buy:\"dry\" -> multiply the cooked grams by factor to get the DRY weight to buy\n")
        fh.write("//   buy:\"raw\" -> multiply the cooked grams by factor to get the RAW weight to buy\n")
        fh.write("// Starches and legumes use the calorie ratio (cooking only adds water, calories are conserved).\n")
        fh.write("// Meat and fish use the PROTEIN ratio, because fat renders out and calories are not conserved.\n")
        fh.write("window.OB_COOK_YIELD = " + json.dumps(out, indent=1, sort_keys=True) + ";\n")

    print("wrote %s  (%d foods)" % (OUT, len(out)))
    print("\n%-34s %-4s %-7s %-8s %s" % ("COOKED FOOD", "BUY", "FACTOR", "BASIS", "USDA SOURCE"))
    for r in sorted(report, key=lambda x: (x[1], -x[2])):
        print("%-34s %-4s %-7.3f %-8s %s" % (r[0][:34], r[1], r[2], r[3], r[4][:58]))
    if missing:
        print("\nNOT MAPPED (grocery list falls back to the cooked weight, clearly labelled):")
        for m in missing: print("   %-34s %s" % (m[0][:34], m[1]))

main()
