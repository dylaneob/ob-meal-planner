// Accepts or rejects a rewritten batch recipe (prepMethod) for the OB Meal Planner.
// Usage: node tools/checks/validate_recipe.js <rewrites.json>     ({ "<template id or title>": "<prepMethod>", ... })
// The writing spec is tools/checks/RECIPE-SPEC.md; three passing examples are in tools/checks/recipe-gold.json.
// Mirrors app/lint-templates.js (prose-foreign: foods named that the template never offers; banned prose; em dashes)
// and adds the structure every batch recipe must have. Exit 1 if any recipe fails.
"use strict";
const path = require("path"), fs = require("fs");
global.window = global;
const APP = path.resolve(process.env.APPDIR || path.join(__dirname, "..", "..", "app"));
["data/foods.js", "data/templates.js", "data/foodnouns.js"].forEach(f => require(path.join(APP, f)));
const F = window.OB_FOODS, T = window.OB_MEAL_TEMPLATES, NOUNS = window.OB_FOOD_NOUNS, FREE = window.OB_FREE_WORDS;
const norm = n => n.replace(/,/g, "");
const opts = s => (s || "").split("|").map(x => x.trim()).filter(Boolean);
const slotText = t => ["protein", "carb", "fat", "produce"].map(k => t[k] || "").join("|") + "|" + (t.extras || []).map(e => e[0]).join("|");
const NOUNS_BY_LEN = [...NOUNS].sort((a, b) => b[0].length - a[0].length);
const nounsIn = text => { let low = " " + String(text).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ") + " "; const out = [];
  NOUNS_BY_LEN.forEach(([w]) => { const re = new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b", "g"); if (re.test(low)) { out.push(w); low = low.replace(re, " "); } });
  return [...new Set(out)]; };
const nounRe = w => new RegExp((NOUNS.find(([x]) => x === w) || [])[1] || w, "i");
const offered = (t, w) => { const re = nounRe(w); return opts(slotText(t)).some(o => re.test(o.replace(/\\/g, ""))); };
const resolves = o => { try { const re = new RegExp(o, "i"); return F.filter(f => re.test(norm(f.name))); } catch (e) { return []; } };
const COOKED_SLOT = /\b(cooked|baked|grilled|roasted|boiled|broiled|steamed)\b/i;
const COOK_VERB = /\b(cook|bake|roast|sear|grill|simmer|boil|poach|brown|saute|sauté|air-?fry|steam|braise|stir-?fry|fry|scramble|crisp|char|griddle|toast)\w*\b/i;
const split = s => String(s).split(/\n+/).map(x => x.trim()).filter(Boolean);
const BANNED = [["em/en dash", /[—–]/], ["template hedge", /whichever your plan lists/i], ["mushroom", /mushroom/i], ["'not X, it is Y'", /\b(is not|isn't|are not|aren't) [^.,;]{1,40}[,;] (it|that|this)('s| is)\b/i],
  ["filler", /\bwhole game\b|\bon purpose\b|\bthe single biggest\b|\bgame.changer\b|\belevate\b/i], ["'free' claim", /\bfree\b(?! of)/i], ["nutrition number", /\b\d+\s*(g|grams?)\s+(of\s+)?protein\b|\bcalories?\b/i],
  ["single-serving block", /SINGLE SERVING/i], ["header caps", /\b[A-Z]{5,}\b(?!F\b)/]];

function check(t, text) {
  const probs = [];
  const steps = split(text);
  if (steps.length < 8) probs.push(`only ${steps.length} newline-separated steps (need 8 to 14)`);
  if (steps.length > 14) probs.push(`${steps.length} steps (need 8 to 14)`);
  if (!steps.every((s, i) => new RegExp("^" + (i + 1) + "\\. ").test(s))) probs.push("steps must be numbered '1. ', '2. ' in order, one per line");
  if (!/^1\. Equipment:/i.test(steps[0] || "")) probs.push("step 1 must start 'Equipment:'");
  if (text.length < 850) probs.push(`too short (${text.length} chars, need 850 to 2200)`);
  if (text.length > 2200) probs.push(`too long (${text.length} chars, need 850 to 2200)`);
  BANNED.forEach(([k, re]) => { const m = text.match(re); if (m) probs.push(`${k}: "${m[0]}"`); });
  // foods named that the template never offers (lint's prose-foreign)
  const foreign = nounsIn(window.OB_PROSE_CLEAN(text)).filter(w => !FREE.test(w) && !offered(t, w));
  if (foreign.length) probs.push("names foods the recipe never offers: " + foreign.join(", "));
  // every cooked-form protein/grain/legume option that leads a slot must be cooked by a step: heat/time/doneness
  ["protein", "carb"].forEach(k => opts(t[k]).forEach(o => { if (!COOKED_SLOT.test(o)) return; const foods = resolves(norm(o)); if (!foods.length) return;
    const f = foods[0]; if (!/^(Protein|Seafood|Grains & Starches|Legumes)$/.test(f.cat)) return;
    const MOD = /^(ground|breast|thigh|thighs|drumstick|leg|quarters|lean|loin|chop|cooked|baked|flesh|white|brown|wild|whole|wheat|sweet|black|green|navy|pinto|kidney|lima|split|atlantic|farmed|sockeye|rainbow|king|alaska|yellowfin|top|round|steak|groats|only|meat|peas|pink|canned|in|water|light)$/i;
    const words = norm(f.name).split(",")[0].toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !MOD.test(w)).map(w => w.replace(/s$/, ""));
    const role = k === "protein" ? "protein" : "(grain|carb|starch)";
    const re = new RegExp("\\b(?:" + words.concat(["your " + role]).join("|") + ")", "i");
    const hit = steps.some(s => re.test(s) && COOK_VERB.test(s) && !/reheat/i.test(s));
    if (!hit) probs.push(`no step cooks the ${k} option "${o}" (name it or say 'your ${k === "protein" ? "protein" : "grain"}' in a step with a cooking verb)`); }));
  if (!/\b\d+\s*(to\s*\d+\s*)?minutes?\b/i.test(text)) probs.push("no cooking times");
  const meat = /chicken|turkey|beef|pork|lamb|bison|venison|duck|salmon|cod|tilapia|trout|halibut|haddock|pollock|snapper|flounder|mackerel|tuna|shrimp|scallop|\begg\b/i.test(slotText(t));
  if (meat && !/\b(145|160|165)\s*F\b/.test(text)) probs.push("meat, poultry, fish or egg offered but no FSIS temperature (145F / 160F / 165F)");
  if (!/\bcool\b/i.test(text)) probs.push("no cooling step");
  if (!/\bcontainers?\b|\bjars?\b/i.test(text)) probs.push("no dividing into containers or jars");
  if (!/\bfridge\b|refrigerat/i.test(text)) probs.push("no storage step");
  if (!/\breheat|\beat (it|them) cold\b|no reheating|\bcold\b/i.test(text)) probs.push("no reheat (or eat-cold) step");
  if (!/\b(so|because|which|that way|otherwise)\b/i.test(text)) probs.push("no 'why' anywhere (OB asked for the reason on steps that change the result)");
  return probs;
}

function main() {
  const file = process.argv[2]; if (!file) { console.log("usage: node validate_recipe.js <rewrites.json>"); process.exit(2); }
  const R = JSON.parse(fs.readFileSync(file, "utf8"));
  let bad = 0, n = 0;
  for (const [key, text] of Object.entries(R)) {
    const t = T.find(x => x.id === key || x.title === key); n++;
    if (!t) { console.log(`FAIL ${key}: no such template`); bad++; continue; }
    const probs = check(t, String(text));
    if (probs.length) { bad++; console.log(`FAIL ${t.title}`); probs.forEach(p => console.log("   - " + p)); }
  }
  console.log(`validated ${n} recipes | ${n - bad} pass | ${bad} fail`);
  process.exit(bad ? 1 : 0);
}
if (require.main === module) main();
module.exports = { check };
