// The client's-eye gate for batch recipes (2026-10-06, the step-by-step rewrite of all 164): every batch template rendered through planSteps for EVERY option of every
// slot (one option swapped at a time against the first option of the others), cooked at 3 when the recipe makes more.
// Flags what a client would trip on. Usage: node tools/checks/recipe_scan.js [rewrites.json ...] [--only] [--full]
// (no files = the library as it is; --only scans just the recipes in the files; --full prints every finding). ~4 minutes.
// --method scans the everyday recipes instead (the `method` of every template without a batch recipe, cooked for one, no
// meal prep), the same way: added 2026-10-06 for the step-by-step rewrite of the 367 everyday recipes.
"use strict";
require("./loader.js");
const T = window.__obTest, fs = require("fs");
const ARGS = process.argv.slice(2), ONLY = ARGS.includes("--only"), FULL = ARGS.includes("--full"), METHOD = ARGS.includes("--method");
const R = {}; ARGS.filter(a => !a.startsWith("--")).forEach(f => Object.assign(R, JSON.parse(fs.readFileSync(f, "utf8"))));
const norm = n => n.replace(/,/g, "");
const first = re => { try { return T.FOODS.find(f => new RegExp(re, "i").test(norm(f.name))); } catch (e) { return null; } };
const P = Object.assign({}, T.defaultProfile(), { tCal: 1800, tPro: 140, tCarb: 170, tFat: 60, meals: 4 }, METHOD ? { prep: false } : { prep: true, prepCook: "3day" });
const MEAL_NAME = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack" };
const isFat = f => f.cat === "Fats & Oils" || /^butter|^ghee/i.test(f.name);
const OILAMT = /\b(\d+(?:\.\d+)?|\d+\/\d+|½|¼|¾|⅓|a|one|two)\s*(tbsp|tablespoons?|tsp|teaspoons?)\s+(?:of\s+)?(?:the\s+|your\s+)?(?:extra[- ]virgin\s+)?(?:olive\s+|avocado\s+|sesame\s+|toasted sesame\s+|canola\s+|vegetable\s+|coconut\s+|neutral\s+|cooking\s+)?(oil|butter|ghee)\b/i;
const CHECKS = [
  ["leftover condition", s => /\bif (it is|it's) (the|a|an|from|canned|cooked|raw)\b|\bif your (protein|grain|carb|starch|fat|vegetables?|veg|produce|greens|fruit|beans|cheese|nut butter) (is|are)\b|\bif you (are using|chose|have the)\b|\bwhichever\b/i.test(s)],
  ["role word left in", s => /\byour (protein|grain|carb|starch|fat|vegetables?|veg|veggies|produce|greens|fruit|beans|cheese|nut butter)\b/i.test(s)],
  ["fragment step", s => s.split(/\n/).some(l => /^\d+\.\s*(because|so |which|and |or |then |toasting is|this |it )/i.test(l) || /^\d+\.\s*$/.test(l) || /^\d+\.\s*[a-z]/.test(l))],
  // the scan cooks 3 (or the recipe's own count when it makes 3), so "a third" is the right share; any other share is stale
  ["per-container fraction", s => /\b(a quarter|a fifth|a sixth|one quarter|one fifth|1\/4|1\/5) of (the|your)\b[^.]*\b(each|per) (container|jar|bowl|box)|\b(each|every) (container|jar|bowl|box)[^.]*\b(a quarter|a fifth|a sixth|one quarter|one fifth|1\/4|1\/5) of\b/i.test(s)],
  // two branches for one food both printed: "If it is the Atlantic salmon ..." and "If it is the sockeye salmon ..." on a plate
  // with one salmon read "For the salmon, ... For the salmon, ..." (2026-10-06)
  ["both branches printed", s => /\bFor the ([a-z ]+?), [^\n]*\bFor the \1, /.test(s)],
  ["broken sentence", s => /\s[,.;:]\s*[,.;:]|\(\s*\)|\bthe the\b|\ba a\b|\b1 (days|months|containers|servings|jars|cups|hours|minutes)\b/i.test(s)],
];
const out = {}; let renders = 0;
const bump = (k, ex) => { (out[k] = out[k] || []).push(ex); };
const LIB = T.TEMPLATES.filter(t => METHOD ? !t.prepMethod && t.method : t.prepMethod);
for (const t of LIB) {
  const key = Object.keys(R).find(k => k === t.id || k === t.title);
  if (ONLY && !key) continue;
  const text = key ? R[key] : METHOD ? t.method : t.prepMethod;
  const base = {}; ["protein", "carb", "fat", "produce"].forEach(k => { const o = (t[k] || "").split("|")[0]; const f = o && first(o); if (f) base[k] = f; });
  const extras = (t.extras || []).map(([re, g]) => { const f = first(String(re).replace(/\\/g, "")); return f ? { id: f.id, grams: g } : null; }).filter(Boolean);
  const variants = [];
  ["protein", "carb", "fat", "produce"].forEach(slot => (t[slot] || "").split("|").forEach(opt => { const f = first(opt); if (f) variants.push({ slot, f }); }));
  if (!variants.length) variants.push({ slot: null, f: null });
  for (const v of variants) {
    const pick = Object.assign({}, base); if (v.slot) pick[v.slot] = v.f;
    const items = Object.values(pick).map(f => ({ id: f.id, grams: 100 })).concat(extras);
    // mirror the planner's addCookingFat: a recipe whose text cooks with oil (spray aside) and whose list has no cooking fat
    // gets 5 g of counted oil when it is drafted
    // (and, like the planner since 2026-10-06, a sentence for an option this plate does not have never counts)
    const names = items.map(i => { const f = T.FOOD_BY_ID[i.id]; return f ? norm(f.name).toLowerCase() : ""; }).join(" | ");
    const offPlate = sn => { const m = sn.match(/^\s*(?:\d{1,2}[.)]\s*)?if (?:your [a-z ]+? (?:is|are|includes?)|it is|it's|they are) (?:the |a |an )?([a-z][a-z -]*?)\s*,/i);
      if (!m || !/\b(?:oil|butter|ghee)\b/i.test(m[1])) return false; const w = m[1].toLowerCase().split(/[\s-]+/).filter(x => x.length > 2);
      return w.length > 0 && !w.some(x => names.includes(x.replace(/(?:es|s)$/, ""))); };
    const oilTxt = [METHOD ? "" : t.method, text].join(" ").split(/(?<=[.!?])\s+/).filter(sn => !offPlate(sn)).join(" ").replace(/\b(?:cooking|oil|avocado[- ]oil|olive[- ]oil)\s+spray\b|\bspray\s+oil\b|\bmist\b[^.]*/gi, " ");
    if (/\b(oil|butter)\b/i.test(oilTxt) && !items.some(i => { const f = T.FOOD_BY_ID[i.id]; return f && isFat(f); })) { const o = T.FOODS.find(f => f.name === "Olive oil"); if (o) items.push({ id: o.id, grams: 5 }); }
    const meal = METHOD ? { name: MEAL_NAME[t.slot] || "Lunch", dish: t.title, items, cook: { method: text } }
      : { name: "Lunch", dish: t.title, items, cook: { prepMethod: text, makes: t.makes } };
    const n = METHOD ? 1 : t.makes > 3 ? 3 : t.makes;
    T.withProfile(P, () => {
      const s = T.planSteps(text, meal, n); renders++;
      const tag = `${t.title.slice(0, 44)} [${v.slot || "-"}=${v.f ? v.f.name.split(",")[0] : "-"}]`;
      for (const [k, fn] of CHECKS) if (fn(s)) { const line = s.split(/\n/).find(l => fn(l)) || ""; bump(k, `${tag} :: ${line.slice(0, 150)}`); }
      // the words the planner lets sit between a count and its noun ("5 pint jars", "5 small zip bags", "between 5 of the dip
      // cups", "10 dip cups (two per serving)"), so a count it misses is caught here (2026-10-16)
      const MOD = "(?:of\\s+(?:the|your)\\s+)?(?:(?:equal|even|small|large|tiny|single-serve|single-serving|lidded|glass|meal|meal-prep|pint|half-pint|quart|wide-mouth|mason|zip|zip-top|freezer|shallow|foil|8 to 12 oz|16 oz)\\s+){0,3}";
      const NOUN = "(containers?|jars?|servings?|portions?|bowls?|bags?|tubs?|boxes|squares|(?:small|tiny|sauce|dip|lidded) cups)\\b";
      if (!METHOD && t.makes !== n && (new RegExp("(?<![\\d/.])" + t.makes + "\\s+" + MOD + NOUN, "i").test(s)
          || new RegExp("(?<![\\d/.])" + 2 * t.makes + "\\s+" + MOD + NOUN + "[^.;\\n]{0,40}?\\((?:two|2) per", "i").test(s))) bump("stale container count", tag);
      // the day freezing starts follows the fridge days: "fridge 3 days ... not eaten by day 4"
      { const sd = /\bfridge (\d+) days?\b[^.\n]*?\bnot (?:eaten|eat|reach) (?:by day|within) (\d+)/i.exec(s); if (!METHOD && sd && sd[1] !== sd[2]) bump("storage day mismatch", tag); }
      const mm = T.stepsMismatch(meal, meal.cook); if (mm.length) bump("names foods not on the list", `${tag} :: ${mm.join(", ")}`);
      const fats = items.map(i => T.FOOD_BY_ID[i.id]).filter(f => f && isFat(f));
      if (!fats.length && OILAMT.test(s)) bump("uncounted oil or butter", `${tag} :: ${(s.match(OILAMT) || [])[0]}`);
      const before = T.fitSteps(T.planText(text, meal), meal, n), cnt = x => String(x).split(/\n/).filter(l => /^\s*\d+\.\s/.test(l)).length;
      if (cnt(s) > cnt(before)) { const extra = s.split(/\n/).filter(l => !String(before).includes(l.replace(/^\s*\d+\.\s*/, "").slice(0, 60)))[0] || ""; bump("cook step had to be inserted", `${tag} :: ${extra.slice(0, 120)}`); }
    });
  }
}
console.log(`renders: ${renders} (${ONLY ? "the rewritten" : "all " + LIB.length} ${METHOD ? "everyday" : "batch"} recipes x their slot options)`);
const keys = Object.keys(out).sort((a, b) => out[b].length - out[a].length);
if (!keys.length) console.log("no issues");
keys.forEach(k => { console.log(`\n${k}: ${out[k].length}`); [...new Set(out[k])].slice(0, FULL ? 999 : 8).forEach(x => console.log("   " + x)); });
