/* ============================================================
   OB Meal Planner, application logic
   All nutrient values are real USDA FoodData Central (per 100g),
   loaded from data/foods.js. Targets from data/dri.js.
   ============================================================ */
(function () {
"use strict";

const FOODS = (window.OB_FOODS || []).slice();
const DRI   = window.OB_DRI;
const META  = window.OB_NUTRIENT_META;           // [key,label,unit,group]
const FOOD_BY_ID = {}; FOODS.forEach(f => FOOD_BY_ID[f.id] = f);

const METAMAP = {}; META.forEach(m => METAMAP[m[0]] = {label:m[1], unit:m[2], group:m[3]});
const MICRO_KEYS = META.filter(m => m[3]==="vitamin" || m[3]==="mineral").map(m => m[0]);
const VIT_KEYS   = META.filter(m => m[3]==="vitamin").map(m => m[0]);
const MIN_KEYS   = META.filter(m => m[3]==="mineral").map(m => m[0]);

const $  = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* -------------------- allergen + diet rules -------------------- */
const ALLERGENS = [
  {key:"dairy",     label:"Dairy",       kw:["milk","cheese","yogurt","butter","cream","whey"]},
  {key:"egg",       label:"Egg",         kw:["egg"]},
  {key:"fish",      label:"Fish",        kw:["fish","salmon","tuna","cod","tilapia","trout","halibut","mackerel","sardine"]},
  // Cephalopods and gastropods are shellfish too. "Octopus, cooked" was sailing straight past a shellfish
  // allergy because the list only named the obvious crustaceans and bivalves.
  {key:"shellfish", label:"Shellfish",   kw:["shrimp","prawn","crab","crayfish","crawfish","langoustine","scallop",
    "oyster","mussel","cockle","whelk","crustacean","mollusk","mollusc","lobster","clam","octopus","squid",
    "calamari","cuttlefish","abalone","escargot","krill"]},
  {key:"treenut",   label:"Tree nuts",   kw:["almond","walnut","cashew","pistachio","pecan","macadamia","hazelnut"]},
  {key:"peanut",    label:"Peanut",      kw:["peanut"]},
  {key:"soy",       label:"Soy",         kw:["soy","tofu","tempeh","edamame"]},
  {key:"gluten",    label:"Gluten/Wheat",kw:["wheat","bread","pasta","barley","couscous","gluten","bagel","english muffin","seitan","rye","bulgur","flour tortilla","malt","spelt","farro","semolina","durum","orzo","graham","panko","breadcrumb","cracker","pretzel"]},
  {key:"pork",      label:"Pork",        kw:["pork","bacon","ham"]},
];
const MEAT_KW = ["beef","chicken","turkey","duck","pork","lamb","bison","venison","ham","bacon","game meat","gelatin"];  // gelatin = animal collagen → not vegetarian/pescatarian
// fish + shellfish by NAME, lets recipe foods (whose usda lists their ingredients) be caught even
// though their category is "Sweet Treats & Snacks", not "Seafood".
const SEAFOOD_KW = ["tuna","salmon","cod","tilapia","halibut","haddock","trout","sardine","mackerel","anchovy","pollock","snapper","shrimp","crab","lobster","scallop","oyster","mussel","clam","crawfish","squid","octopus","calamari","catfish","swordfish","eel"];
// Halal hard-excludes: pork in all forms + alcohol. (Other meats just need halal sourcing,
// which the coach handles, the tool can't verify slaughter method.)
// Gelatin: ordinary gelatin (Jell-O and the like) is made from pork or beef hide and is neither halal nor kosher
// unless certified, which the planner cannot know from a grocery list. It was reaching halal and kosher clients
// through a panna cotta treat.
const HARAM_KW = ["pork","bacon","ham","lard","prosciutto","pepperoni","pancetta","chorizo","gelatin",
                  "alcohol","wine","beer","rum","liquor","vodka","whiskey","sherry","brandy","mirin"];
// Kosher hard-excludes: pork, shellfish, and non-kosher fish (no fins+scales). Allowed meats
// still need kosher sourcing, and meat+dairy must not mix in a meal, both handled separately.
const NONKOSHER_KW = ["pork","bacon","ham","prosciutto","pepperoni","pancetta","lard","rabbit","gelatin",
                      "shrimp","crab","lobster","scallop","oyster","mussel","clam","crawfish","crayfish",
                      "crustacean","mollusk","squid","octopus","calamari","catfish","swordfish","shark","eel"];
// Traditional kimchi has salted shrimp / fish sauce → not kosher & not veg/vegan. A "vegan kimchi"
// (no fish sauce/shrimp) is safe for everyone, so the kimchi rule below exempts the vegan/plant variant.
const isTradKimchi = t => /kimchi/.test(t) && !/vegan|plant/.test(t);

// name + USDA description only, deliberately NOT the category, so a love like
// "eggs" doesn't match every food in the "Eggs & Dairy" category.
const foodText = f => (f.name + " " + f.usda).toLowerCase();
// word-boundary-BEFORE match: catches "ham"/"scallops"/"soybeans" but NOT "crumbles"→rum or "peel"→eel.
// (boundary only before the keyword, so plurals/compounds like scallop->scallops still match.)
const kwHit = (t, list) => list.some(k => new RegExp("\\b"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i").test(t));

// egg detection: literal "egg" (but not "eggplant"), plus mayonnaise (regular mayo is egg-based,
// and its USDA name "salad dressing, mayonnaise" has no "egg" token to catch otherwise).
const hasEgg = t => (t.includes("egg") || t.includes("mayonnaise")) && !t.includes("eggplant");
// "almond milk", "peanut butter", "butternut squash" etc. contain dairy substrings but are NOT dairy.
const PLANT_QUALIFIER = /almond|peanut|cashew|soy|coconut|oat milk|rice milk|hemp|sunflower|pistachio|walnut|pecan|macadamia|seed butter|nut butter|sesame|tahini/;
// Explicit dairy words (cheese/yogurt/whey/casein/kefir) ALWAYS count, even alongside a plant
// qualifier (e.g. a recipe with both "cottage cheese" and "almond milk"). Only the ambiguous
// words (milk/butter/cream, which appear in "almond milk"/"peanut butter") are plant-gated.
const STRONG_DAIRY = /\b(cheese|yogurt|whey|casein|kefir)\b/;
const isDairyText = t => STRONG_DAIRY.test(t) || (!PLANT_QUALIFIER.test(t) && /milk|\bbutter\b|cream/.test(t));
function animalFlags(f){
  const t = foodText(f);
  return {
    meat:    kwHit(t, MEAT_KW),
    seafood: f.cat === "Seafood" || isTradKimchi(t) || kwHit(t, SEAFOOD_KW),   // traditional kimchi + fish/shellfish by name (recipes) → not veg/vegan, OK for pescatarian

    dairy:   isDairyText(t),
    egg:     hasEgg(t),
    honey:   t.includes("honey")
  };
}
function dietExcluded(f, diet){
  const a = animalFlags(f);
  if (diet === "pescatarian") return a.meat;
  if (diet === "vegetarian")  return a.meat || a.seafood;
  if (diet === "ovo")         return a.meat || a.seafood || a.dairy || a.honey;  // eggs allowed
  if (diet === "vegan")       return a.meat || a.seafood || a.dairy || a.egg || a.honey;
  return false;
}
const isHaram      = f => kwHit(foodText(f), HARAM_KW);
const isNonKosher  = f => { const t = foodText(f); return kwHit(t, NONKOSHER_KW) || isTradKimchi(t); };
const isMeatFood   = f => animalFlags(f).meat;     // land animal / poultry (kosher: not with dairy)
const isDairyFood  = f => animalFlags(f).dairy;
// budget / protein-per-dollar foods: kept OUT of normal plans (canned chicken in a pesto pasta is
// grim) and only allowed — and then favored — when Budget mode is on.
const BUDGET_FOODS = new Set([
  "Chicken leg quarters, roasted (meat only)",
  "Mackerel, jack, canned, drained",
  "Chicken breast, canned, drained",
  "Nonfat dry milk powder",
  "TVP (textured soy protein), dry",
  "Tuna, light, canned in oil, drained",
]);
// pure volume-swap foods: ultra-low-density bases (shirataki for pasta, riced cauliflower for rice) and
// broth/water-rich fillers. Out of normal plans (they'd beat real food on satiety); in only for Volume mode.
const VOLUME_FOODS = new Set([
  "Shirataki noodles (konjac)",
  "Riced cauliflower, cooked",
  "Chicken broth, low-sodium",
  "Bone broth, chicken",
  "Daikon radish, raw",
  "Radish, raw",
  "Jicama, raw",
  "Iceberg lettuce, raw",
]);
// processed meat-substitutes (fake meat). Omnivores eat real animal protein; these only show for an
// omnivore if the client actually loves them. NOTE: this is NOT legumes — beans/lentils/chickpeas are
// real high-fiber food and stay in omnivore plans (they help hit the fiber goal).
const MEAT_SUB = /\btofu\b|tempeh|seitan|\btvp\b|textured (?:soy|vegetable) protein|meatless|plant.?based (?:meat|chicken|beef|burger|sausage)|veggie burger|soy curl/i;
function exclusion(f, P){
  const t = foodText(f);
  if (!P.budget && BUDGET_FOODS.has(f.name)) return "budget-only";
  if (!P.volume && VOLUME_FOODS.has(f.name)) return "volume-only";
  if (P.diet === "omnivore" && MEAT_SUB.test(t) && !isLiked(f, P)) return "use animal protein";
  for (const a of ALLERGENS){
    const hit = a.key === "egg"   ? hasEgg(t)
              : a.key === "dairy" ? isDairyText(t)
              : kwHit(t, a.kw);
    if (P.allergens[a.key] && hit) return a.label;
  }
  for (const c of P.cantHave) if (c && t.includes(c)) return "can’t have";
  if (P.halal  && isHaram(f))     return "not halal";
  if (P.kosher && isNonKosher(f)) return "not kosher";
  if (P.glutenfree && isGlutenFood(f)) return "gluten-free";
  if (dietExcluded(f, P.diet)) return P.diet;
  return null;
}
const isLiked    = (f,P) => P.likes.some(d => d && foodText(f).includes(d));
const isDisliked = (f,P) => P.dislikes.some(d => d && foodText(f).includes(d));
// Plans are built on COOKED weights. Raw meat/seafood entries exist only for coaches whose clients pre-portion raw
// (e.g. 7oz freezer bags) and are added by hand, so the auto-drafter must never pick them: 8 templates' "chicken
// breast" patterns would otherwise match "Chicken breast, raw" and serve raw grams as if cooked.
const isRawMeat = f => (f.cat==="Protein" || f.cat==="Seafood") && /\braw\b/i.test(f.name);
// A baking INGREDIENT is not a plate food: vital wheat gluten is the dry flour seitan is made from (75g protein
// per 100g). It sat in the database named "Seitan", so plans served "30g seitan" that was really 30g of flour.
// Prepared seitan is its own food now; the flour stays searchable for a coach but is never auto-drafted.
const isIngredientOnly = f => /vital wheat gluten|\(dry flour\)/i.test(f.name);
// WHERE A CLIENT CAN BUY IT (data/availability.js: every food classed everywhere / most / specialty from live
// shelf checks and retailer pages, 2026-09-24). Clients reported they could not find seitan anywhere, and it was
// on 57% of vegan, vegetarian and ovo days in the plans they received (as flour, see above), carrying about a
// quarter of the day's protein. The audit then found the same pattern wider: over half of vegan protein came from
// soy and pea isolates, tempeh and similar foods that the Walmart and Aldi it checked did not stock. A plan built
// on food the client cannot buy is not a plan, so a SPECIALTY food is only drafted when the coach says the client
// can buy specialty foods, or the client lists that food as one they love.
const AVAIL = window.OB_AVAIL || {};
const tierOf = f => (f && AVAIL[f.id] && AVAIL[f.id].t) || (/seitan/i.test((f&&f.name)||"") ? "specialty" : "everywhere");
const HARD_TO_FIND = /seitan/i;   // kept for the title rule when availability data is missing
// A loved food unlocks a specialty item only by its DISTINCTIVE name: "seitan" unlocks seitan, but "salmon"
// must not unlock wild Atlantic salmon (not sold in US stores) when farmed salmon is on every shelf.
const headName = f => String(f.name||"").split(/[,(/]/)[0].trim().toLowerCase();
const DISTINCT_HEAD = (()=>{ const everyday = new Set(FOODS.filter(f=>tierOf(f)!=="specialty").map(headName));
  return new Set(FOODS.filter(f=>tierOf(f)==="specialty").map(headName).filter(h=>h && !everyday.has(h))); })();
// the loved word must be the food's name ("seitan", "hemp seeds" or "hemp", "tvp"), not a word it shares with an
// everyday food: loving peas does not mean buying pea protein isolate
const LIKE_KEY_STOP = new Set(["pea","soy","vital","edamame","all-bran"]);
const optedIn = (P, f) => !!(P && P.specialtyOK) || (DISTINCT_HEAD.has(headName(f)) && (P && P.likes || []).some(d => {
  const like = String(d||"").toLowerCase(), head = headName(f), key = head.split(" ")[0];
  return like && (like.includes(head) || (key.length >= 4 && !LIKE_KEY_STOP.has(key) && like.includes(key)));
}));
// Foods added for one client's hand-built favourites (a client's Saturday burger, fries, pizza and sushi, 2026-10-02)
// that the auto-drafter must never pick: a raw potato's grams are raw, turkey pepperoni is a pizza topping (at 30 g protein
// per 100 g the protein top-up would reach for it), and a burger bun, naan or a nori sheet would otherwise turn up as the
// "carb side" next to an unrelated dinner. A coach adds them by hand.
// a client's Chobani vanilla yogurt (2026-10-06) too: a sweetened yogurt must never become a savoury bowl's protein.
const isHandOnly = f => /^(potato, raw|turkey pepperoni|hamburger bun|naan|nori sheets|ramen noodles, dry|chobani vanilla greek yogurt, nonfat|sweet potato, raw|zucchini, raw|whole wheat pasta, dry|cauliflower, raw|whole wheat hamburger bun)$/i.test(String(f.name||""));
const allowedFoods = P => FOODS.filter(f => !exclusion(f, P) && !isRawMeat(f) && !isIngredientOnly(f) && !isHandOnly(f) && (tierOf(f)!=="specialty" || optedIn(P, f)));
// ONE protein powder per plan. A recipe's own powder (the pea-and-rice chia pudding) next to the whey the protein top-up
// uses put two tubs on an omnivore's grocery list for about 65g of powder a week: 6 of 24 drafts in the UI test
// (2026-09-24). The plan's powder is the one the top-up picks: whey for anyone who eats dairy, otherwise the densest
// plant powder the client can have. Only the auto-draft works from this pool; a coach can still add any powder by hand.
function planPowder(P){
  const all = allowedFoods(P).filter(f => isProteinPowder(f) && !f.recipe);
  return all.find(f=>/whey/i.test(f.name)) || all.sort((a,b)=>(b.protein_g||0)-(a.protein_g||0))[0] || null;
}
const draftFoods = P => { const pw = planPowder(P); return allowedFoods(P).filter(f => f.recipe || !isProteinPowder(f) || !pw || f.id===pw.id); };
// A dish TITLE must not name a food this client cannot have. Read the title with the same food-noun dictionary
// the template linter uses (data/foodnouns.js): every food noun in it must be deliverable from this client's own
// pool. That one rule covers specialty foods ("Seitan & Broccoli" when seitan is off), allergies and diets.
// Title nouns are read once per title; which nouns a pool can deliver is worked out once per profile.
const _titleNouns = new Map(), _poolNouns = new WeakMap();
const NOUN_LIST = (window.OB_FOOD_NOUNS || []).slice().sort((a,b)=>b[0].length-a[0].length)
  .map(([w,re])=>({ w, find: window.OB_NOUN_WORD_RE ? window.OB_NOUN_WORD_RE(w,"g") : new RegExp("\\b"+w+"s?\\b","g"), re: new RegExp(re,"i") }));
function titleNounIdx(title){
  if(_titleNouns.has(title)) return _titleNouns.get(title);
  let low = " "+String(title||"").toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ")+" ";
  const idx = [];
  NOUN_LIST.forEach((n,i)=>{ n.find.lastIndex = 0; if(n.find.test(low)){ idx.push(i); n.find.lastIndex = 0; low = low.replace(n.find," "); } });
  _titleNouns.set(title, idx); return idx;
}
function poolCanDeliver(P, i){
  let m = _poolNouns.get(P);
  if(!m){ m = new Map(); _poolNouns.set(P, m); }
  if(!m.has(i)){ const pool = m.pool || (m.pool = allowedFoods(P)); m.set(i, pool.some(f=>NOUN_LIST[i].re.test(normName(f)))); }
  return m.get(i);
}

/* -------------------- food role (for auto-draft) -------------------- */
function role(f){
  if (f.cat === "Vegetables") return "veg";
  const p=f.protein_g, c=f.carb_g, fat=f.fat_g;
  const pkc=p*4, ckc=c*4;
  if (fat>=28) return "fat";
  if (p>=8 && pkc>=ckc) return "protein";
  if (c>=12 && ckc>=pkc) return "carb";
  if (p>=6) return "protein";
  return "carb";
}

/* -------------------- state (7-day week) -------------------- */
const WEEK_DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// ROTATING SHIFTS: a client whose days off move cannot "cook Sunday and Wednesday" (a client, 2026-09-30). The cook
// schedules already count in days from the first cook (day 0), so for that client the week is numbered instead of named:
// Day 1 is the day off before a run of shifts, and every cook day, batch, freezer note and grocery run counts from it.
const numberedDays = P => ((P || (typeof state!=="undefined" && state.profile) || {}).dayNames === "numbered");
const dayLabel = (di, P) => numberedDays(P) ? `Day ${di+1}` : WEEK_DAYS[di];
const dayWords = (text, P) => (!text || !numberedDays(P)) ? text
  : String(text).replace(/\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/g, d => `Day ${WEEK_DAYS.indexOf(d)+1}`)
      .replace(/\b(cooked|made|prepped|prepared|frozen|eaten) (Day \d)\b/g, "$1 on $2").replace(/\b(Day \d) night\b/g, "the night of $1");
const dayNameOf = d => { const i = (state.week||[]).indexOf(d); return i >= 0 ? dayLabel(i) : (d && d.name) || ""; };
// The meal-prep sub-options: "how often you cook" shows whenever prep is on; "meals to rotate" only applies to the
// one-Sunday-cook rotation (a cook schedule sets its own menus, one per cook day).
function syncPrepWraps(){
  const on = !!($("pPrep") && $("pPrep").checked), cook = ($("pPrepCook")||{}).value || "weekly";
  if($("prepCookWrap")) $("prepCookWrap").style.display = on ? "" : "none";
  if($("prepDaysWrap")) $("prepDaysWrap").style.display = on ? "" : "none";
  if($("prepVarietyWrap")) $("prepVarietyWrap").style.display = (on && cook==="weekly") ? "" : "none";
}
const newWeek = () => WEEK_DAYS.map(n => ({ name:n, meals:[] }));
let state = { profile: defaultProfile(), dayIdx:0, week:[], meals: [] };
state.week = newWeek();
state.meals = state.week[0].meals;
// state.meals is always the CURRENT day's array; keep the week slot pointing at the same ref
function setMeals(arr){ state.meals = arr; if(state.week[state.dayIdx]) state.week[state.dayIdx].meals = arr; }
function switchDay(i){
  i = Math.max(0, Math.min(state.week.length-1, i));
  if (i === state.dayIdx) return;
  state.dayIdx = i; state.meals = state.week[i].meals;
  undoBuf = null; updateUndoBtn(); render();
}
function copyDayToWeek(ok){
  if(!state.meals.length){ uiAlert("This day is empty."); return; }
  if(ok!==true){ uiConfirm(`Copy ${state.week[state.dayIdx].name}'s meals to all 7 days? This overwrites the other days.`, ()=>copyDayToWeek(true), null, "Copy to week"); return; }
  const src = JSON.stringify(state.meals);
  state.week.forEach((d,i)=>{ if(i!==state.dayIdx) d.meals = JSON.parse(src); });
  flash($("copyDayBtn"), "Copied to week ✓");
  renderDayTabs();
}
const weekHasMeals = () => state.week.some(d => d.meals.length);
function defaultProfile(){
  return { name:"", sex:"female", meals:4, tCal:1800, tPro:150, tCarb:160, tFat:55,
           diet:"omnivore", halal:false, kosher:false, glutenfree:false, gut:false, glp1:false,
           volume:false, budget:false, simple:false, specialtyOK:false,
           banking:false, bankIntensity:"moderate",
           allergens:{}, cantHave:[], dislikes:[], likes:[],
           supplements:{}, suppNotes:"", screen:{}, attest:false, note:"" };
}
const SUPPLEMENTS = window.OB_SUPPLEMENTS || [];
// a client build can hold a supplement until her blood work checks it: labs.pending ["vitd"] reads "Only if a blood test
// shows your vitamin D is low", the way the iron line always does (a client, 2026-10-22: her panel had no vitamin D)
const GATE_NOUN = { vitd:"vitamin D", iron:"iron", b12:"vitamin B12", calcium:"calcium", magnesium:"magnesium" };
const suppWhen = (s, P) => s.when || ((((P || {}).labs || {}).pending || []).indexOf(s.key) >= 0
  ? `Only if a blood test shows your ${GATE_NOUN[s.key] || String(s.label).toLowerCase()} is low.` : "");

// Intake health screen, hard-stop conditions that put a client OUTSIDE general-wellness
// coaching scope (→ route to physician/RD). GLP-1 is the highest-risk flag.
const SCREEN_FLAGS = [
  {key:"diabetes", label:"Diabetes (Type 1 or 2)"},
  {key:"kidney",   label:"Kidney / liver disease"},
  {key:"cardio",   label:"Heart / cardiovascular disease"},
  {key:"ed",       label:"Eating disorder (current or history)"},
  {key:"celiac",   label:"Celiac disease / diagnosed gluten disorder"},
  {key:"pregnant", label:"Pregnant / breastfeeding"},
  {key:"glp1",     label:"On GLP-1 / weight-loss medication"},
  {key:"rx",       label:"Other Rx affecting nutrition"},
  {key:"minor",    label:"Under 18"},
];
const DISCLAIMER = "General wellness nutrition guidance, recommendations only. This is not medical advice or medical nutrition therapy, and is not a substitute for care from a physician or registered dietitian. Consult your physician before changing your diet, especially if you have a medical condition or take medication.";

/* -------------------- form <-> profile -------------------- */
const tags = s => (s||"").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
function readForm(){
  const P = {
    name:$("pName").value.trim(), sex:$("pSex").value, meals:+$("pMeals").value, goal:(($("pGoal")||{}).value)||"loss",
    tCal:+$("tCal").value, tPro:+$("tPro").value, tCarb:+$("tCarb").value, tFat:+$("tFat").value,
    diet:$("pDiet").value, halal:$("pHalal").checked, kosher:$("pKosher").checked,
    glutenfree:$("pGlutenFree").checked, gut:$("pGut").checked, glp1:$("pGlp1").checked,
    volume:$("pVolume").checked, budget:$("pBudget").checked, simple:($("pSimple")||{}).checked||false,
    noOven:($("pNoOven")||{}).checked||false, airFryer:($("pAirFryer")||{}).checked||false,
    noGrill:($("pNoGrill")||{}).checked||false, noSlow:($("pNoSlow")||{}).checked||false,
    specialtyOK:($("pSpecialty")||{}).checked||false,
    prep:$("pPrep").checked, prepVariety:+($("pPrepVariety")||{}).value || 3, prepCook:(($("pPrepCook")||{}).value)||"weekly", dayNames:(($("pDayNames")||{}).value)||"week",
    banking:$("pBanking").checked, bankIntensity:$("pBankIntensity").value,
    allergens:Object.assign({}, state.profile.allergens),
    cantHave:tags($("pCantHave").value), dislikes:tags($("pDislikes").value), likes:tags($("pLikes").value),
    supplements:Object.assign({}, state.profile.supplements), suppNotes:$("pSuppNotes").value.trim(),
    screen:Object.assign({}, state.profile.screen), attest:$("pAttest").checked, note:$("pNote").value.trim(),
    // kept so the fibre section can print a water target in ounces instead of a rule to apply by hand
    weightLb: +(($("cWeight")||{}).value) || state.profile.weightLb || 0,
    // fibre the client already eats (g a day, from check-ins; set by a client build): the fibre ramp note checks it
    fiberNow: +state.profile.fiberNow || 0,
    // print options (a client, Cancun, 2026-10-08): grams and day totals only on the PDF, kg and litres, no
    // US brand suggestions, Mexican shelf names on the grocery list
    gramsOnly: ($("pPdfNumbers") ? $("pPdfNumbers").value !== "all" : !!state.profile.gramsOnly),
    // and no calories or macros at all, not even a day line (OB for a client, 2026-10-08: "dont let her see calories
    // and macros to start because she is so perfectionist")
    noTotals: ($("pPdfNumbers") ? $("pPdfNumbers").value === "none" : !!state.profile.noTotals),
    metric: ($("pMetric") ? $("pMetric").checked : !!state.profile.metric),
    // plug-and-play pages: on for every client unless the coach unticks it (OB, 2026-10-14)
    plugAndPlay: ($("pPlug") ? $("pPlug").checked : state.profile.plugAndPlay !== false),
    noBrands: ($("pCountry") ? $("pCountry").value === "MX" : !!state.profile.noBrands),
    country: ($("pCountry") ? $("pCountry").value : (state.profile.country || "")),
    firstName: state.profile.firstName || "",     // a compound first name a client build sets ("a client")
    alreadyTakes: (state.profile.alreadyTakes || []).slice(),  // nutrient keys she covers with her own supplements
    lowNotes: Object.assign({}, state.profile.lowNotes || {}),   // nutrient key -> what the plan does about it
    // her blood work, set by a client build: {date, results:{iron:"normal"|"low", vitd:...}} (a client, 2026-10-22)
    labs: state.profile.labs ? JSON.parse(JSON.stringify(state.profile.labs)) : undefined,
    // print-only extras a client build sets (a client, 2026-10-08): weighed trades for whole meals, and the short
    // "when plans change" rules
    trades: (state.profile.trades || []).slice(), tradesNote: state.profile.tradesNote || "", rules: (state.profile.rules || []).slice(), howTo: (state.profile.howTo || []).slice(), coachName: state.profile.coachName || "", hungerNote: state.profile.hungerNote || "",
      buildLunch: state.profile.buildLunch ? JSON.parse(JSON.stringify(state.profile.buildLunch)) : null,
      buildMeals: state.profile.buildMeals ? JSON.parse(JSON.stringify(state.profile.buildMeals)) : null,
      swapLine: state.profile.swapLine || "",   // a plan's own swap rule (a client's quick plan swaps whole meals, 2026-10-14)
      howToLead: state.profile.howToLead || "",   // a plan's own first how-to line (a client, fat over carbs, 2026-10-22)
      pnpNoScale: state.profile.pnpNoScale || "",   // a plan's own no-scale / eating-out line on the plug-and-play page (2026-10-30)
      prepBrief: !!state.profile.prepBrief,   // an experienced cook: the playbook keeps the run sheet and the safety core only (2026-10-30)
      age: state.profile.age || undefined,   // the client's age: 51 and over gets the 51-70 reference intakes (2026-10-30)
      mild: !!state.profile.mild,   // finds mild heat too hot: no hot rubs on the PDF (2026-10-30)
      planTitle: state.profile.planTitle || "",   // a plan's own cover title, when one client gets two plans to pick from (2026-10-31)
      closeLead: state.profile.closeLead || "",   // a plan's own closing advice in place of "Hit the protein, keep the rest close" (a client, carbs are her miss, 2026-11-04)
      travel: state.profile.travel ? JSON.parse(JSON.stringify(state.profile.travel)) : null,   // a builder's travel page (2026-10-14)
      travelPage: ($("pTravel") ? $("pTravel").checked : !!state.profile.travelPage)
  };
  return P;
}
function writeForm(P){
  $("pName").value=P.name||""; $("pSex").value=P.sex; $("pMeals").value=P.meals; if($("pGoal")) $("pGoal").value=P.goal||"loss";
  if($("cWeight") && P.weightLb) $("cWeight").value=P.weightLb;
  $("tCal").value=P.tCal; $("tPro").value=P.tPro; $("tCarb").value=P.tCarb; $("tFat").value=P.tFat;
  $("pDiet").value=P.diet; $("pHalal").checked=!!P.halal; $("pKosher").checked=!!P.kosher;
  $("pGlutenFree").checked=!!P.glutenfree; $("pGut").checked=!!P.gut; $("pGlp1").checked=!!P.glp1;
  $("pVolume").checked=!!P.volume; $("pBudget").checked=!!P.budget; if($("pSimple")) $("pSimple").checked=!!P.simple; if($("pSpecialty")) $("pSpecialty").checked=!!P.specialtyOK;
  [["pNoOven","noOven"],["pAirFryer","airFryer"],["pNoGrill","noGrill"],["pNoSlow","noSlow"]].forEach(([id,k])=>{ if($(id)) $(id).checked=!!P[k]; });
  if($("pPdfNumbers")) $("pPdfNumbers").value = P.noTotals ? "none" : P.gramsOnly ? "day" : "all"; if($("pMetric")) $("pMetric").checked=!!P.metric; if($("pPlug")) $("pPlug").checked = P.plugAndPlay !== false; if($("pTravel")) $("pTravel").checked = !!P.travelPage;
  if($("pCountry")) $("pCountry").value=P.country||"";
  $("pPrep").checked=!!P.prep; if($("pPrepVariety")) $("pPrepVariety").value=P.prepVariety||3; if($("pPrepCook")) $("pPrepCook").value=P.prepCook||"weekly"; if($("pDayNames")) $("pDayNames").value=P.dayNames||"week";
  syncPrepWraps();
  $("pBanking").checked=!!P.banking; $("pBankIntensity").value=P.bankIntensity||"moderate";
  $("pCantHave").value=(P.cantHave||[]).join(", ");
  $("pDislikes").value=(P.dislikes||[]).join(", ");
  $("pLikes").value=(P.likes||[]).join(", ");
  $("pSuppNotes").value=P.suppNotes||"";
  $("pAttest").checked=!!P.attest;
  $("pNote").value=P.note||"";
  state.profile.allergens = Object.assign({}, P.allergens||{});
  state.profile.supplements = Object.assign({}, P.supplements||{});
  state.profile.screen = Object.assign({}, P.screen||{});
  renderAllergenChips(); renderSupplementChips(); renderScreenChips(); updateScreenBanner();
}

/* -------------------- diet overlays + calorie banking + calculator -------------------- */
// kept IN SYNC with the gluten ALLERGEN kw above. Celiac-grade: catches wheat-derived grains whose
// names lack "wheat" (bulgur/spelt/farro/semolina/durum/orzo) + malt (barley) + crumb/cracker forms.
const GLUTEN_KW = ["wheat","bread","pasta","barley","couscous","gluten","bagel","english muffin","seitan","rye","bulgur","flour tortilla","malt","spelt","farro","semolina","durum","orzo","graham","panko","breadcrumb","cracker","pretzel"];
const isGlutenFood = f => kwHit(foodText(f), GLUTEN_KW);

const BANK = { mild:0.96, moderate:0.92, aggressive:0.87 };   // weekday calorie multiplier
function bankFactors(intensity){
  const wd = BANK[intensity] || BANK.moderate;
  const we = (7 - 5*wd)/2;                                    // Sun + Sat carry the "banked" calories
  return [we, wd, wd, wd, wd, wd, we];                        // Sun, Mon..Fri, Sat, averages to 1.0
}
function dayTargets(P, di){
  const base = { tCal:+P.tCal, tPro:+P.tPro, tCarb:+P.tCarb, tFat:+P.tFat };
  if(!P.banking) return base;
  const f = bankFactors(P.bankIntensity)[di] || 1;
  const cal = Math.round(base.tCal * f);
  const pro = base.tPro;                                      // protein stays constant every day (protect muscle)
  const remCal = Math.max(0, cal - pro*4);
  const baseRem = Math.max(1, base.tCarb*4 + base.tFat*9);
  const sc = remCal / baseRem;                               // carbs + fat absorb the weekday/weekend swing
  return { tCal:cal, tPro:pro, tCarb:Math.round(base.tCarb*sc), tFat:Math.round(base.tFat*sc) };
}
function curTargets(){ return dayTargets(state.profile, state.dayIdx); }   // current day's effective targets

// Mifflin-St Jeor TDEE → suggested targets, fills the macro inputs
function calcTargets(){
  const lb=+$("cWeight").value, inch=+$("cHeight").value, age=+$("cAge").value||35;
  if(!lb || !inch){ $("calcHint").textContent="Enter weight and height first."; return; }
  const kg=lb/2.2046, cm=inch*2.54;
  const bmr = 10*kg + 6.25*cm - 5*age + (state.profile.sex==="male"?5:-161);
  const tdee = bmr * (+$("cActivity").value);
  const cal = Math.round(tdee * (+$("cGoal").value) / 10) * 10;
  const pro = Math.round(lb * 0.9);                          // ~0.9 g/lb protects muscle in a deficit and covers a gain phase
  const fat = Math.round(cal*0.25/9);                       // 25% of calories from fat
  const carb = Math.max(0, Math.round((cal - pro*4 - fat*9)/4));
  $("tCal").value=cal; $("tPro").value=pro; $("tCarb").value=carb; $("tFat").value=fat;
  const gm = +$("cGoal").value; if($("pGoal")) $("pGoal").value = gm > 1 ? "gain" : gm < 1 ? "loss" : "maintain";
  state.profile.goal = $("pGoal") ? $("pGoal").value : state.profile.goal;
  state.profile.tCal=cal; state.profile.tPro=pro; state.profile.tCarb=carb; state.profile.tFat=fat;
  state.profile.weightLb=lb;
  $("calcHint").innerHTML=`Maintenance ≈ <b>${Math.round(tdee)}</b> cal/day → target <b>${cal}</b> cal · <b>${pro}g</b> protein · ${carb}g carb · ${fat}g fat.`;
  if(state.meals.length) renderScore();
}

/* -------------------- linear solver for the draft -------------------- */
function solve3(A, b){
  const det = m => m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
                 - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
                 + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
  const D = det(A); if (Math.abs(D) < 1e-9) return null;
  const col = i => A.map((r,ri) => r.map((v,ci) => ci===i ? b[ri] : v));
  return [det(col(0))/D, det(col(1))/D, det(col(2))/D];
}
function greedy(pf, cf, ff, bP, bC, bF){
  const gp = pf.protein_g>0 ? bP/(pf.protein_g/100) : 0;
  const gc = cf.carb_g>0    ? Math.max(0,(bC - pf.carb_g/100*gp))/(cf.carb_g/100) : 0;
  const gf = ff.fat_g>0     ? Math.max(0,(bF - pf.fat_g/100*gp - cf.fat_g/100*gc))/(ff.fat_g/100) : 0;
  return [gp, gc, gf];
}
const MEAL_NAMES = {
  3:["Breakfast","Lunch","Dinner"],
  4:["Breakfast","Lunch","Snack","Dinner"],
  5:["Breakfast","Snack","Lunch","Snack","Dinner"],
  6:["Breakfast","Snack","Lunch","Snack","Dinner","Evening snack"]
};

/* ---- seeded variety: each draft/re-roll shuffles within the high-quality head of each
       pool, so coaches get a fresh-but-still-good plan on every click ---- */
let seedCounter = 7;
function mulberry32(a){a|=0;return function(){a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function seededShuffleTop(arr,n,seed){
  const cut=Math.min(n,arr.length), head=arr.slice(0,cut), tail=arr.slice(cut), rnd=mulberry32(seed);
  for(let i=head.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1)); const t=head[i];head[i]=head[j];head[j]=t;}
  return head.concat(tail);
}
const capG = g => Math.min(500, Math.max(0, Math.round(g/5)*5));
// realistic single-serving CEILING per food, so the solver can't make "5 tortillas", "2½ cups of
// quinoa", or "3 large sweet potatoes" just to hit a carb target. Grams, cooked where relevant.
// A cap that is not a whole number of slices or tortillas makes the calorie fit and the whole-unit rounding fight
// each other (bread grown to 94g, snapped back to 2 slices = 64g, 80 kcal gone). Unit foods get unit-aligned caps.
// PORTION LIMITS from published intake data (data/portions.js, generated from data-build/reference/portions.json):
// the most a large but normal eater plates in one sitting (USDA ARS intake percentiles per eating occasion,
// anchored to FDA's reference amounts). They only ever TIGHTEN the rules below, never loosen them, and a
// finished recipe is one set serving so it is exempt. A drink is not a condiment: coffee was capped at 60g.
const PORTIONS = window.OB_PORTIONS || {};
function maxServeG(f){
  let c = maxServeGRaw(f);
  const p = !f.recipe && PORTIONS[f.id];
  if(p && p.max > 0) c = /^coffee|\btea, brewed/i.test(f.name) ? p.max : Math.min(c, p.max);
  // a bottled shake or drink is served as one bottle: a 14 fl oz Chobani protein drink (435 g) sat over the 350 g cap,
  // and the planner would have clipped it to most of a bottle (a client, 2026-10-01)
  // A can is one serving only when it is a drink: "1 can" of salmon is 454 g, two to three servings, and this rule had
  // raised canned salmon's 161 g sourced limit to the whole can (auto-drafts served 262-285 g, 2026-10-05).
  const pack = f.brands && (f.portions||[]).find(p => /^1 (shake|bottle|pouch)\b/i.test(p.label)
    || (/^1 can\b/i.test(p.label) && !/\bcanned\b/i.test(f.name) && /drink|shake|soda|seltzer|sparkling|milk|kefir|juice|coffee|kombucha|energy/i.test(f.name)));
  if(pack) c = Math.max(c, pack.grams);
  const u = unitGrams(f);
  // a piece food always allows one whole piece: a bagel was capped at half a bagel by the two-tortilla rule
  if(u > 0){ c = Math.max(c, u); const step = u <= 50 ? u : u/2; c = Math.max(step, Math.floor(c/step)*step); }
  return c;
}
function maxServeGRaw(f){
  const n=(f.name||"").toLowerCase(), c=f.cat;
  // HIGH-CARB plans (e.g. a 2700cal / 353g-carb athlete) need bigger STARCH portions, or the carb foods hit
  // their caps, total carb falls ~85g short, and calories come in low. Scale the carb-food ceilings up with
  // the carb share of calories: normal plans (~36%) → 1x (unchanged); high-carb (~52%) → ~1.3x; capped at 1.7x
  // so portions stay realistic (~2.5 cups rice). Only affects the carb levers.
  const cP=state.profile;
  const carbMult = (cP&&+cP.tCal>0) ? Math.max(1, Math.min(1.9, ((+cP.tCarb*4)/(+cP.tCal))/0.38)) : 1;
  // Dylan: NEVER dump 3 scoops of whey in a bowl — powder is a topper, not the base for DAIRY-EATING diets
  // (cap ~1.5 scoops / 45g, so whole food carries the protein). BUT for vegan/ovo, plant protein powder
  // (pea+rice) is a PRIMARY protein source, so allow more (~2.8 scoops / 90g) or they can't hit protein.
  if(POWDER_RE.test(n)){
    const d = state.profile && state.profile.diet;
    return (d==="vegan"||d==="ovo") ? 90 : 45;
  }
  // One tablespoon of oil per plate (FDA's reference amount for oils is 1 tbsp). It was 2 tbsp, and the macro fit
  // used oil as its favourite place to park calories: 30g of sesame oil in one stir-fry.
  if(c==="Fats & Oils")  return 15;
  // SPREADS that the macro fit uses as a dish's fat lever: sized as a spread, not a serving of fat. Mayo reached
  // 60g (4 tbsp) in one egg salad sandwich and tahini 45g in a grain bowl.
  if(!f.recipe){                                                          // a finished recipe is one set serving
    if(/^mayonnaise/.test(n)) return 30;                                  // 2 tbsp
    if(/^(tahini|peanut butter|almond butter|cashew butter|sunflower seed butter)/.test(n)) return 32;   // 2 tbsp
    if(/^(miso|gochujang|harissa|chipotle in adobo)|curry paste/.test(n)) return 25;
    if(/^(pesto|chimichurri)/.test(n)) return 30;
  }
  if(c==="Nuts & Seeds") return 45;                 // ~1.5 oz nuts/seeds/nut butter
  // a naan is one 90 g flatbread, so the 2-piece rule below (built on 45 g tortillas) allowed one; two make two personal
  // pizzas (a client's Saturday pizza, 2026-10-02). Naan is hand-added only, never auto-drafted (isHandOnly).
  if(/^naan\b/.test(n)) return 180;
  // a ramen noodle cake is one bowl's noodles (70 g dry, label), and two make his big Saturday bowl (a client,
  // 2026-10-05). The dry-grain cap below (100 g) would split a cake. Hand-added only (isHandOnly).
  if(/^ramen noodles\b/.test(n)) return 140;
  if(/tortilla|bagel|english muffin|pita|\bbun\b|\broll\b|naan|\bwrap\b/.test(n)) return 92;  // ~2 pieces
  // an AREPA is one thick corn disc (~100-150g), not 2 slices of sandwich bread — its name contains "bread"
  // so it would otherwise inherit the 84g loaf cap and get served as a sliver.
  if(/arepa/.test(n)) return Math.round(150*carbMult);
  if(/\bbread\b/.test(n)) return Math.round(84*carbMult);                // ~2 slices (more on a high-carb plan)
  if(/rice cake|cracker|pretzel|chip\b/.test(n)) return 40;
  // The 280g grain ceiling assumes a COOKED grain (~120 kcal/100g). A DRY grain is ~3x denser, so the same
  // ceiling served 296g of dry oats = ~1,120 kcal in one breakfast. Cap energy-dense grains by realistic dry
  // serving instead (~1 cup dry oats = 90g).
  if(c==="Grains & Starches" && (f.kcal||0) >= 250) return Math.round(100*carbMult);
  if(c==="Grains & Starches") return Math.round(280*carbMult);           // ~1½ cup cooked grain / ~1½ medium potato
  if(c==="Legumes")      return 230;                                     // ~1¼ cup beans — NOT scaled (beans are protein-heavy; big portions look wrong, esp. at breakfast)
  // AVOCADO is a fat lever, so the solver grows it — but 282g is two whole avocados. 1 medium = ~150g flesh.
  if(/avocado/.test(n) && c!=="Fats & Oils") return (state.profile && state.profile.glp1) ? 100 : 150;
  if(c==="Fruits")       return Math.round(220*carbMult);                // ~1½ cup / 1 large fruit
  if(c==="Protein"||c==="Seafood") return 285;      // ~10 oz cooked protein
  // BUTTER / GHEE is a finishing fat measured in teaspoons, not a dairy serving. It inherited the 350g
  // Eggs & Dairy ceiling, and the solver parked 30g (2 tbsp, 24g fat) on a steak dinner.
  if(/\bbutter\b|\bghee\b/.test(n) && !/peanut|almond|cashew|sunflower|nut butter|sesame|apple butter/.test(n)) return 15;
  // sweeteners are a drizzle, not a carb source: the solver parked 42g (3 tbsp) of honey in a breakfast jar
  if(/\bhoney\b|maple syrup|agave|\bjam\b|jelly|syrup/.test(n) && !/sugar-free/.test(n)) return 25;
  if(c==="Eggs & Dairy"){
    // CHEESE is eaten in small amounts — never 2½ cups of shredded mozzarella as a "protein" (Dylan caught a
    // 276g mozzarella stuffed-pepper). Cap hard/shredded cheese ~80g (~2.8 oz), grated parm ~30g; cottage
    // cheese & ricotta are spooned by the cup so they stay generous. Eggs/milk/yogurt keep their sizes.
    if(/\bcottage cheese\b/.test(n)) return 250;
    if(/ricotta/.test(n)) return 200;
    if(/parmesan|parmigiano|pecorino|romano|grated/.test(n)) return 30;
    if(/cheese|mozzarella|cheddar|\bfeta\b|swiss|provolone|gouda|brie|\bgoat\b|gruyere|monterey|colby|paneer|halloumi/.test(n)) return 80;
    return /\begg\b/.test(n)&&!/eggplant/.test(n) ? 200 : 350;  // 4 eggs / ~1½ cup dairy
  }
  // CONDIMENTS are eaten by the spoon, not the cup — the solver was serving 73g (5 tbsp) of light mayo as a
  // fat lever. Cap them at ~4 tbsp. Broths/stocks/milks are genuinely cup-scale, so they keep the big ceiling.
  if(c==="Condiments & Misc" && !/broth|stock|\bmilk\b|water|juice|puree|sauce, marinara|marinara/.test(n)) return 60;
  return 320;
}
const clampServe = (f,g) => Math.min(maxServeG(f), Math.max(0, Math.round(g/5)*5));

// A LEAN target = fat is a low share of calories (e.g. 2000 cal / 200g protein with only ~40g fat, a 10:1
// cal:protein cut). These are hard because the FIXED fat in a meal — cooking oil, cheese/nut extras, and the
// fat that rides along with the protein floor — can overshoot a tight fat budget even after the macro solver
// zeroes the adjustable fat slot. When the target is lean we use spray-level cooking oil, drop high-fat
// extras, and bias every protein pick to the leanest cut (egg whites / breast / 97-3 beef / white fish /
// nonfat dairy) so the unavoidable protein-floor fat stays small and the low fat target is actually reachable.
function leanFatTarget(P){
  const cal=+(P&&P.tCal)||0, fat=+(P&&P.tFat)||0;
  if(!(cal>0 && fat>0)) return false;
  // Plant diets carry far more inherent fat (tofu/tempeh/nuts/seeds), so even a MODERATE fat target is
  // already "lean" for them and forces the leaner-plant-protein bias (seitan/TVP/pea protein/edamame over
  // tofu/nuts). Animal/pescatarian diets have genuinely lean cuts (breast/egg whites/white fish/nonfat
  // dairy), so only a low fat share counts as lean for them.
  const plant = P.diet==="vegan" || P.diet==="vegetarian" || P.diet==="ovo";
  // EXTREME high-protein targets squeeze fat the same way a low-fat target does (200g protein at 1500 kcal
  // leaves little room, and the fat riding the protein floor overshoots a 45g budget). So a very-high-protein
  // day (>40% of calories from protein — well above a normal 30-35% cut) counts as "lean fat" up to a moderate
  // 30% share too. The 0.40 gate keeps NORMAL plans (e.g. 1800/150/55 = 33%) on the standard 0.23 threshold.
  const hiProt = (+P.tPro*4)/cal > 0.40;
  return (fat*9/cal) < ((plant||hiProt) ? 0.30 : 0.23);
}
const leanProtScore = f => (f && f.protein_g>0) ? -(f.fat_g/f.protein_g) : -99;  // higher = leaner cut

// A TIGHT-CARB target = carbs are a low share of calories (e.g. 1500 cal / 200g protein / 45g fat leaves only
// ~74g carb = 20% of calories — an aggressive cut / contest-prep macro). These overshoot carbs because the
// builder loads high-carb produce (onion/tomato/carrot/fruit) at 185g and floors a grain in every meal. When
// the target is tight on carbs we pick LOW-NET-CARB volume veg (broccoli/asparagus/leafy greens/cauliflower),
// shrink high-carb produce + fruit, drop the per-meal grain floor, and hit the fiber floor from low-net-carb
// veg + psyllium/bran instead of carb-heavy beans.
function tightCarbTarget(P){
  const cal=+(P&&P.tCal)||0, carb=+(P&&P.tCarb)||0;
  if(!(cal>0 && carb>0)) return false;
  return (carb*4/cal) < 0.25;
}
// net carb per 100g (total carb minus fiber) — the real carb cost of a produce/food on a tight-carb day.
const netCarb = f => f ? Math.max(0, (f.carb_g||0)-(f.fiber_g||0)) : 0;
// a low-net-carb vegetable: leafy greens, crucifers, and other ≤5g-net-carb/100g veg that add fiber + volume
// without spending the tiny carb budget (excludes starchy/sugary veg: potato/corn/peas/carrot/beet/squash/onion).
function isLowCarbVeg(f){
  if(!f || f.cat!=="Vegetables") return false;
  if(/potato|corn|\bpeas\b|carrot|beet|parsnip|squash|plantain|yam|cassava|sweet potato/i.test(f.name)) return false;
  return netCarb(f) <= 5;
}

function buildPools(P, seed){
  const pool = draftFoods(P);
  if (pool.length < 3) return null;
  // float loved foods up / disliked down, keeping the staple ordering otherwise (stable sort)
  const rank = arr => arr.sort((a,b) =>
    ((isDisliked(a,P)?1:0)-(isDisliked(b,P)?1:0)) ||
    ((isLiked(a,P)?0:1)-(isLiked(b,P)?0:1)) );
  // Only real staples seed the draft, condiments/sauces never lead a meal.
  const PROT_CATS=["Protein","Seafood","Eggs & Dairy"];
  const CARB_PRI={"Grains & Starches":0,"Legumes":1,"Fruits":2};
  let proteins = pool.filter(f => PROT_CATS.includes(f.cat) && f.protein_g>=8 && role(f)==="protein")
                     .sort((a,b)=>(b.protein_g/Math.max(b.kcal,1))-(a.protein_g/Math.max(a.kcal,1))); // leanest (most protein/cal) first
  let carbs    = pool.filter(f => f.cat in CARB_PRI && f.carb_g>=8)
                     .sort((a,b)=> (CARB_PRI[a.cat]-CARB_PRI[b.cat]) || (b.fiber_g-a.fiber_g)); // fiber-forward
  let fats     = pool.filter(f => (f.cat==="Nuts & Seeds"||f.cat==="Fats & Oils") && f.fat_g>=20)
                     .sort((a,b)=> ((a.cat==="Nuts & Seeds"?0:1)-(b.cat==="Nuts & Seeds"?0:1))); // whole-food fats first
  let vegs     = pool.filter(f => f.cat==="Vegetables");
  // fallbacks if a diet/allergy wipes out a whole role
  if (!proteins.length) proteins = pool.slice().sort((a,b)=>b.protein_g-a.protein_g).slice(0,4);
  if (!carbs.length)    carbs    = pool.slice().sort((a,b)=>b.carb_g-a.carb_g).slice(0,4);
  if (!fats.length)     fats     = pool.slice().sort((a,b)=>b.fat_g-a.fat_g).slice(0,4);
  // variety shuffle within the quality head, then loves/dislikes float (stable sort keeps the shuffle)
  proteins=seededShuffleTop(proteins,8,seed+1); carbs=seededShuffleTop(carbs,10,seed+2);
  fats=seededShuffleTop(fats,8,seed+3);         vegs=seededShuffleTop(vegs,99,seed+4);
  rank(proteins); rank(carbs); rank(fats); rank(vegs);
  return {proteins,carbs,fats,vegs};
}

function buildMealItems(pf, cf, ff, veg, per, produceGrams){
  const items=[]; let bP=per.P, bC=per.C, bF=per.F;
  const tight = tightCarbTarget(state.profile);    // tight-carb cut → don't force a grain into every meal
  if (veg){                                        // veg/fruit in EVERY meal → fiber + micros run high
    const g = produceGrams || 150;
    items.push({id:veg.id, grams:g, fixed:true});  // produce is a fixed side, not a macro lever
    bP-=veg.protein_g/100*g; bC-=veg.carb_g/100*g; bF-=veg.fat_g/100*g;
  }
  const A=[[pf.protein_g/100,cf.protein_g/100,ff.protein_g/100],
           [pf.carb_g/100,   cf.carb_g/100,   ff.carb_g/100],
           [pf.fat_g/100,    cf.fat_g/100,    ff.fat_g/100]];
  let x = solve3(A,[bP,bC,bF]);
  if (!x || x.some(v=>!isFinite(v) || v<0)) x = greedy(pf,cf,ff,bP,bC,bF);
  const rows=[];
  // protein floor = a real serving: ~70g meat/fish, 2 WHOLE EGGS (100g) when egg is the protein (never 1
  // egg next to 3 slices of bread), ~1 scoop (28g) for powder (which otherwise floored at 70g, more than oats).
  // floor must never exceed the food's own ceiling — else a cheese protein (cap 80g, grated parm 30g) gets
  // force-floored to 70/90g, re-introducing the "276g cheese as protein" bug the cheese cap was added to stop.
  // Floor must also respect THIS MEAL's protein allocation: a flat 70g floor of a DENSE protein (seitan is
  // 75g protein/100g) x 5 meals drove a 145g-target day to 263g protein. Cap the floor so one meal's protein
  // food can't deliver much more than ~1.4x its share, but never fall below a 30g serving.
  const allocCap = (pf.protein_g>0 && per && per.P>0) ? Math.max(30, (per.P*1.4)/(pf.protein_g/100)) : Infinity;
  const protFloor = Math.min(maxServeG(pf), allocCap, isProteinPowder(pf) ? 28 : (/^Egg, whole/i.test(pf.name) ? 100 : 70));
  if (clampServe(pf,x[0])>0)   rows.push({id:pf.id, grams:Math.max(protFloor, clampServe(pf,x[0]))});
  if (clampServe(cf,x[1])>=20) rows.push({id:cf.id, grams:clampServe(cf,x[1])});                // carb, ceiling (no "5 tortillas")
  if (clampServe(ff,x[2])>=10) rows.push({id:ff.id, grams:clampServe(ff,x[2])});                // fat, no "5g of almonds"
  rows.forEach(r => { if(!items.find(it=>it.id===r.id)) items.push(r); });
  // guarantee the chosen protein food is present (even if the solver zeroed it), check the
  // actual food, not a category, so plant proteins (tofu/legumes) aren't added a 2nd time
  if (!items.some(it=>it.id===pf.id))
    items.push({id:pf.id, grams:Math.min(maxServeG(pf), Math.max(isProteinPowder(pf)?28:(/^Egg, whole/i.test(pf.name)?100:90), clampServe(pf,x[0])))});
  // guarantee the chosen CARB too — otherwise a carb the solver shaved under 20g vanishes, which is how
  // "overnight oats" ended up with no oats (the high-protein PBfit fat covered the macros). Floor it.
  // EXCEPT on a tight-carb cut: there the carb budget is so small that forcing a 35g grain into all 4 meals
  // is exactly what overshoots carbs — let grain-light meals (lean protein + volume veg) stand as-is.
  if (cf && !items.some(it=>it.id===cf.id) && !tight)
    items.push({id:cf.id, grams:Math.max(35, clampServe(cf,x[1]))});
  return items;
}

// meal-appropriateness, keeps fish fillets / dry grains out of breakfast etc.
const BK_PROTEIN_OK = f => /egg|yogurt|cottage|whey|bacon|\bham\b|tofu|tempeh/i.test(f.name);
const BK_CARB_OK    = f => f.cat==="Fruits" || /oat|bread|bagel|english muffin|potato|banana/i.test(f.name);
const slotWeight = name => { const n=name.toLowerCase();
  return n.includes("dinner")?1.4 : n.includes("lunch")?1.2 : n.includes("breakfast")?1.0 : n.includes("snack")?0.55 : 1; };
// simple 2-item snack (protein + a fruit/carb) instead of a full 4-component plate
function buildSnackItems(pf, cf, per){
  const items=[];
  const pg = pf.protein_g>0 ? capG(per.P/(pf.protein_g/100)) : 100;
  if (pg>0) items.push({id:pf.id, grams:pg});
  const remC = per.C - pf.carb_g/100*pg;
  const cg = cf.carb_g>0 ? capG(remC/(cf.carb_g/100)) : 0;
  if (cg>=20) items.push({id:cf.id, grams:cg});
  if (!items.length) items.push({id:pf.id, grams:100});
  return items;
}
/* ---- coherent meal templates: curated food COMBINATIONS so drafted meals read like
       real meals (e.g. "Greek yogurt & berry bowl") instead of macro-correct nonsense
       (e.g. onion + yogurt + oats). A template names the protein/carb/fat/produce by
       regex against the inventory; portions are still solved + refined to hit macros. ---- */
function compileTemplate(t){
  const re = s => { if(!s) return null; try { return new RegExp(s,"i"); } catch(e){ return null; } };
  // extras = small FIXED flavor/condiment items added to the meal (counted in macros, not scaled):
  // [["Yellow mustard",10],["Pickles, dill",30],["Cheddar cheese|Swiss cheese",20]]
  // strip commas from the extra's food string so it matches normName (which also strips commas):
  // e.g. "Olives, ripe" -> /Olives ripe/i matches the food "Olives, ripe".
  const reExtra = (t.extras||[]).map(e => ({ re: re((Array.isArray(e)?e[0]:e.food||"").replace(/,/g,"")), g:(Array.isArray(e)?e[1]:e.g)||15 })).filter(x=>x.re);
  // TITLE words: the food-ish words a dish is named after, used so the builder serves what the title PROMISES
  // (a "Salmon" bowl gets salmon, not its mackerel fallback; a "Pepper" stir-fry gets bell pepper, not onion).
  // Structural words are dropped; words common to every candidate (cooked/baked) don't change the ranking.
  const TITLE_STOP = new Set(["the","and","for","with","over","your","style","bowl","bowls","plate","plates",
    "salad","salads","jar","jars","cups","wrap","wraps","batch","sheet","mason","freezer","meal","prep","high",
    "protein","lean","easy","classic","simple","quick","crispy","creamy","savory","loaded","fresh","crunch","crunchy"]);
  const titleWords = (t.title||"").toLowerCase().replace(/[^a-z\s]/g," ").split(/\s+/)
    .filter(w => w.length>=3 && !TITLE_STOP.has(w));
  // 82 templates were written without an id. Every id-keyed check (used.tpl for variety, the batch keep-days
  // cache) then saw them all as ONE template: using any of them marked every other one as a repeat. The title
  // is unique across the library (the append script enforces it), so it makes a stable id.
  const id = t.id || ("t-" + String(t.title||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""));
  return Object.assign({}, t, { id,
    reP:re(t.protein), reC:re(t.carb), reF:re(t.fat), reProd:re(t.produce),
    rePP:re(t.prefProtein), rePC:re(t.prefCarb), rePF:re(t.prefFat), rePProd:re(t.prefProduce),
    reExtra, titleWords });
}
// add whole-egg base (anchored, so eggs read as "2 large" not "30g") + condiment/flavor extras.
// All FIXED (not macro levers) and screened through the diet/allergy pool.
function addExtras(t, items, pool, P, seed){
  if(t.eggBase){
    const we = pool.find(f=>/^Egg, whole/i.test(f.name));
    if(we && !items.some(it=>it.id===we.id)) items.push({id:we.id, grams:Math.max(1,t.eggBase)*50, fixed:true});
  }
  const lean = leanFatTarget(P);
  const tw = t.titleWords || [];
  (t.reExtra||[]).forEach(ex=>{
    const hits = reHits(ex.re, pool);
    if(!hits.length) return;
    const f = hits[(seed||0)%hits.length];
    // On a lean target, drop a high-fat condiment/cheese/nut extra — UNLESS the dish is NAMED after it. An
    // omelet "...with Cheddar" or a "Spinach & Feta" scramble must keep its cheese even on a lean/plant day,
    // or the title and directions promise a food that never lands on the plate (Dylan's #1 recurring gripe).
    const named = tw.some(w => normName(f).toLowerCase().indexOf(w) >= 0);
    if(lean && !named && (f.fat_g*ex.g/100) > 3.5) return;
    // never above the food's cap; produce also respects the realistic PRODUCE serving (a template extra was
    // serving 100g of raw onion, which the 320g Vegetables cap happily allowed).
    const exCap = (f.cat==="Vegetables"||f.cat==="Fruits") ? Math.min(maxServeG(f), PRODUCE_GRAMS(f)) : maxServeG(f);
    // extras were sized for a ~550 kcal meal; on an 1800 kcal 5-meal day (360/meal) fixed granola, chickpeas and
    // honey ate the whole budget and the solver crushed every protein to its floor
    const perMeal = (+P.tCal||0)/Math.max(+P.meals||4,1);
    const scale = perMeal>0 ? Math.min(1, Math.max(0.5, perMeal/550)) : 1;
    const g = (f.cat==="Vegetables") ? ex.g : Math.round(ex.g*scale/5)*5 || ex.g;
    if(!items.some(it=>it.id===f.id)) items.push({id:f.id, grams:Math.min(Math.max(5,g), exCap), fixed:true});
  });
  // cooking-oil base: if the method COOKS with oil but the resolved fat is a non-oil (nuts/avocado/
  // cheese), the dish has no oil to actually cook in. Add ~1 tsp of an appropriate oil so the
  // directions are real (you can't stir-fry in "peanuts").
  const m = (t.method||"") + " " + (t.oil||"");
  // a real-oil cooking action: an oil-cooking verb, OR an explicit brush/teaspoon/film/heat OF oil
  const oilMethod = /\b(sear|stir.?fry|saut|pan.?fry|fry the|brown the|crisp|wok|skillet)\b/i.test(m)
                 || /\b(brush|teaspoon|tablespoon|film|drizzle|coat|heat)\b[^.]{0,30}\boil\b/i.test(m);
  // a genuinely no-cook build (raw/blended/assembled cold) for the WHOLE dish, not one side component
  const pureRaw = /\b(no.?cook|no real cooking|just blend|smoothie|overnight oats?|no cooking needed|assemble it cold|served? cold|build cold)\b/i.test(m)
               && !/\b(sear|saut|fry|roast|bake|grill|simmer|boil|steam|poach|skillet|wok|oven)\b/i.test(m);
  // a dish that cooks in zero-cal SPRAY oil only (no brushed/poured oil) — the fat lives elsewhere, skip
  const spraysOnly = /spray oil|quick mist|cooking spray|mist of/i.test(m) && !/\b(brush|teaspoon|tablespoon|pour|film|drizzle|coat)\b[^.]{0,30}\boil\b/i.test(m);
  if(oilMethod && !pureRaw && !spraysOnly){
    const hasOil = items.some(it=>{ const f=FOOD_BY_ID[it.id]; return f && (f.cat==="Fats & Oils" || /\bbutter\b/i.test(f.name)); });
    if(!hasOil){
      const hot = /sear|stir.?fry|wok|crisp|520F|450F|high.?heat|ripping/i.test(m);
      const oil = pool.find(f=>f.name===(hot?"Avocado oil":"Olive oil")) || pool.find(f=>f.cat==="Fats & Oils" && !/flax/i.test(f.name));
      if(oil) items.push({id:oil.id, grams: lean?2:5, fixed:true});   // ~1 tsp cooking oil (spray/light brush on lean targets), tracked in macros
    }
  }
}
const TEMPLATES = (window.OB_MEAL_TEMPLATES || []).map(compileTemplate).filter(t=>t.reP && t.slot);
function tplSlot(name){ const n=(name||"").toLowerCase();
  return /breakfast/.test(n) ? "breakfast"
       : /snack|evening/.test(n) ? "snack"
       : /lunch/.test(n) ? "lunch"
       : /dinner|dessert|treat/.test(n) ? "dinner" : "lunch"; }
// match against the food name with commas stripped, so "Oats dry \(raw\)" hits "Oats, dry (raw)"
const normName = f => f.name.replace(/,/g,"");
// how a person says the food out loud: "Potato, baked, flesh" -> "potato", "Oats, dry (raw)" -> "oats"
const plainName = f => f.name.split(",")[0].replace(/\s*\(.*\)/,"").trim().toLowerCase();
// match a TITLE word against a (lowercased) food name on WORD BOUNDARIES, not raw substring — else short words
// false-match ("pea" hit "Peanut butter"/"Peaches", "red" hit "shredded"). 3-letter words require a WHOLE word
// (\bpea\b, never peanut); longer words use a leading boundary so plurals still match ("bean" -> "beans").
const _twReCache = {};
// A title names some foods by what they become: "with Toast" is bread, "Wraps" and "Tacos" are tortillas. Without this the
// "Tofu Veggie Scramble with Toast" carb slot chose the baked potato it also offers, and the toast never arrived.
const TITLE_ALIAS = { toast:/\bbread\b|english muffin|bagel|crispbread/, toasts:/\bbread\b|english muffin|bagel|crispbread/,
  wrap:/tortilla/, wraps:/tortilla/, taco:/tortilla/, tacos:/tortilla/, burrito:/tortilla/, burritos:/tortilla/,
  quesadilla:/tortilla/, quesadillas:/tortilla/, sandwich:/\bbread\b|\broll\b|\bbun\b|pita|bagel|english muffin/,
  sandwiches:/\bbread\b|\broll\b|\bbun\b|pita|bagel|english muffin/, crispbread:/crispbread/ };
const titleWordNames = (lcName, w) => titleWordHit(lcName, w) || !!(TITLE_ALIAS[w] && TITLE_ALIAS[w].test(lcName));
function titleWordHit(lcName, w){
  let re = _twReCache[w];
  if(!re){ re = _twReCache[w] = new RegExp('\\b'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+(w.length<=3?'\\b':'')); }
  return re.test(lcName);
}
const reHits = (re, pool) => re ? pool.filter(f=>re.test(normName(f))) : [];
function tplBuildable(t, pool, slotType){
  if(!reHits(t.reP, pool).length) return false;                    // protein must resolve
  if(slotType!=="snack"){                                          // meals need a carb + fat too
    if(t.reC && !reHits(t.reC,pool).length) return false;
    if(t.reF && !reHits(t.reF,pool).length) return false;
  }
  return true;
}
// low-fiber, low-satiety starches to DROP whenever a better carb fills the slot. Per the Holt Satiety
// Index, brown rice (132) scores even below white rice (138) and barely above white bread — so ALL rice
// (and couscous/regular pasta) is demoted, not just white. Potato/quinoa/oats/beans/whole-grain win.
const isRefinedCarb = f => /\brice\b|white bread|\bbagel\b|couscous/i.test(f.name)
  ? !/cauliflower|rice cake/i.test(f.name)
  : /\bpasta\b/i.test(f.name) && !/carbe diem|whole.?wheat|whole.?grain/i.test(f.name);
// protein-per-dollar ranking for Budget mode (US grocery, June 2026): leg quarters/canned fish/TVP/dry
// milk top-tier, then beans/lentils, eggs, cheap bulk carbs; premium cuts (salmon/shrimp/sirloin) demoted.
function budgetScore(f){
  if(!f) return 0;
  const n=(f.name||"").toLowerCase();
  if(BUDGET_FOODS.has(f.name)) return 10;
  if(/lentil|split pea|pinto|black bean|navy bean|kidney bean|chickpea|\bbean/.test(n)) return 8;
  if(/egg white|egg whole|\begg/.test(n)) return 6;
  if(/cottage cheese|dry milk|\bmilk\b|\btofu|tempeh/.test(n)) return 5;
  if(/\boat|brown rice|\bpotato|cabbage|carrot|banana|onion/.test(n)) return 4;   // cheap bulk
  if(/salmon|shrimp|scallop|sirloin|steak|tenderloin|halibut|cod|tilapia|trout/.test(n)) return -4; // premium → demote
  return 0;
}
function pickTplFood(re, prefRe, pool, P, seed, avoid, slot, titleWords){
  let cands = reHits(re, pool);
  if(!cands.length) return null;
  // never silently filter out a food the DISH IS NAMED AFTER (a "White Rice" bowl keeps its rice, a "Tomato"
  // dish keeps its tomato even on a tight-carb day) — title-named foods are protected from all the drops below.
  const titleNamed = f => titleWords && titleWords.length && titleWords.some(w=>normName(f).toLowerCase().indexOf(w)>=0);
  // Dylan rule: never white/brown rice/bagel/white bread/couscous when a fiber carb can fill the slot.
  // DROP refined carbs FIRST (before the prefCarb filter) — otherwise a template's prefCarb:"Brown rice"
  // narrows the pool to rice and the drop sees no alternative left. Order matters: drop, THEN prefer.
  // Not for a client building muscle: white rice, a bagel or couscous is how a gainer gets 350g of carbs down.
  const gain = P.goal==="gain";
  if(!gain && cands.some(f=>!isRefinedCarb(f))) cands = cands.filter(f=>!isRefinedCarb(f) || isLiked(f,P) || titleNamed(f));
  // A slot names an INGREDIENT. "Tahini" also matches a pistachio-tahini dessert bar and "Edamame" matched edamame
  // pasta, and a chickpea sandwich was served the dessert bar as its tahini. Finished recipes and sweet treats
  // only fill a slot when the dish is named for them or nothing else matches.
  // The dish must name the WHOLE recipe, not one of its words: "Tofu" in a stir-fry's title kept a chocolate tofu mousse
  // as the stir-fry's tofu (310 g of it, 2026-10-06).
  const titleNamesAll = f => !!(titleWords && titleWords.length) && normName(f).toLowerCase().replace(/[^a-z\s]/g," ").split(/\s+/)
    .filter(w=>w.length>2).every(w=>titleWords.includes(w) || titleWords.includes(w+"s") || titleWords.includes(w.replace(/s$/,"")));
  if(cands.some(f=>!f.recipe && f.cat!=="Sweet Treats & Snacks"))
    cands = cands.filter(f=>(!f.recipe && f.cat!=="Sweet Treats & Snacks") || titleNamesAll(f));
  // A condiment sharing a vegetable's word fills a PRODUCE slot only when the dish is named for it or nothing else matches:
  // once "Tomato paste" joined the library (2026-11-02), a shakshuka's "tomato" slot served 60 g of paste beside steps
  // that say 1 tbsp.
  if(slot==="produce" && cands.some(f=>f.cat!=="Condiments & Misc"))
    cands = cands.filter(f=>f.cat!=="Condiments & Misc" || titleNamesAll(f));
  // TIGHT-CARB target: in the produce slot, drop higher-carb veg (onion/tomato/pepper) when a low-net-carb veg
  // (broccoli/leafy greens/cauliflower) can fill it — keeps the cut's tiny carb budget for the grain + protein.
  if(tightCarbTarget(P) && cands.some(f=>isLowCarbVeg(f)))
    cands = cands.filter(f=>isLowCarbVeg(f) || f.cat!=="Vegetables" || isLiked(f,P) || titleNamed(f));
  // PROTEIN slot: for DAIRY-EATING diets, if a whole-food protein is available, DROP protein powder from
  // the rotation (the top-4 seed rotation otherwise picked whey ~half the time) — powder is a last-resort
  // top-up, not a meal's base. EXCEPTION: vegan/ovo, where plant protein powder is a PRIMARY protein and
  // dropping it makes the protein target unreachable (regressed vegan from 91% to 72%). Keep it for them.
  if(slot==="protein" && !(P.diet==="vegan"||P.diet==="ovo") && cands.some(f=>!isProteinPowder(f)))
    cands = cands.filter(f=>!isProteinPowder(f) || isLiked(f,P) || titleNamed(f));
  if(prefRe){ const pc=cands.filter(f=>prefRe.test(normName(f))); if(pc.length) cands=pc; }
  // EGG DISH: migas/frittata/scramble/omelet/"egg ..." dishes must serve EGGS as the protein for egg-eaters —
  // don't let a CO-NAMED bean/cheese/turkey win the protein slot and leave the dish with just a 1-egg base
  // (Dylan: "6x more beans than eggs in a breakfast taco"). The co-named food still appears as a side via
  // addTitleNamedSides. For vegans (eggs excluded) this no-ops and tofu/beans stay.
  if(slot==="protein" && titleWords && titleWords.some(w=>/^(egg|migas|frittata|scramble|omelet|omelette|huevos|benedict|shakshuka|quiche|deviled)$/.test(w))){
    const eggs = cands.filter(f=>/\begg/i.test(f.name) && !exclusion(f,P) && !isDisliked(f,P));
    if(eggs.length) cands = eggs;
  }
  // TITLE coherence: a dish names specific foods, so SERVE those, not a fallback (a "Salmon" bowl gives salmon,
  // not its mackerel alt; "Pepper" stir-fry gives bell pepper, not onion; "Sweet Potato" beats plain potato).
  // Score each candidate by how many of the title's food-words are in its name; keep the top scorers. Never
  // force a DISLIKED food, and only narrow when the title actually names something in this slot (max>0).
  if(titleWords && titleWords.length && cands.length>1){
    const tScore = f => { const n=normName(f).toLowerCase(); return titleWords.reduce((s,w)=>s+(titleWordNames(n,w)?1:0),0); };
    const scored = cands.map(f=>[f,tScore(f)]);
    const max = Math.max.apply(null, scored.map(x=>x[1]));
    if(max>0){
      const top = scored.filter(x=>x[1]===max).map(x=>x[0]);
      const liked = top.filter(f=>!isDisliked(f,P));
      cands = liked.length ? liked : top;
    }
  }
  cands = cands.slice().sort((a,b)=>
    ((isDisliked(a,P)?1:0)-(isDisliked(b,P)?1:0)) ||
    ((isLiked(a,P)?0:1)-(isLiked(b,P)?0:1)) ||
    // LEAN target (low fat budget): pick the leanest protein (lowest fat per gram protein) and, for the fat
    // slot, the lowest-fat option — so a tight fat target (e.g. 2000cal/200P/40F) is actually reachable.
    (slot==="protein" && leanFatTarget(P) ? (leanProtScore(b)-leanProtScore(a)) : 0) ||
    // TIGHT-CARB: among produce, prefer the lowest-net-carb veg (most fiber + volume per gram of carb spent).
    (tightCarbTarget(P) && a.cat==="Vegetables" ? (netCarb(a)-netCarb(b)) : 0) ||
    (slot==="fat"     && leanFatTarget(P) ? ((a.fat_g||0)-(b.fat_g||0))           : 0) ||
    (P.budget ? (budgetScore(b)-budgetScore(a)) : 0) ||  // budget: highest protein-per-dollar first
    (P.volume ? (satietyScore(b)-satietyScore(a)) : 0) || // volume: most filling / lowest density first
    // CARB slot leads with SATIETY (fiber + fullness-per-calorie), not raw fiber: potato is the most
    // filling carb (Holt #1) even though its fiber ties brown rice. So potato/sweet potato/oats/quinoa/
    // Carbe Diem/Carb Balance/beans all beat rice (the day-level fiber backstop still tops up the floor).
    // Building muscle turns that round: the carb that fills you least per calorie (rice, pasta, a bagel) comes first.
    (slot==="carb" ? (gain ? (fibrePerKcal(a)-fibrePerKcal(b)) : (satietyScore(b)-satietyScore(a))) : 0) ||
    // FAT slot leads with quality: low saturated fat + high omega-3 (walnuts/flax/chia over butter/coconut).
    // (a gainer's fat comes from nuts, nut butter or oil before chia and flax, which carry 5-7g of fibre per 100 cal)
    (slot==="fat" ? ((gain ? Math.round(fibrePerKcal(a)/3)-Math.round(fibrePerKcal(b)/3) : 0) || (fatQuality(b)-fatQuality(a))) : 0) ||
    // PROTEIN slot: prefer a complete WHOLE-FOOD animal/egg/dairy base over plant-main and (hard) over powder
    // for omnivores/pescatarians — quality + don't lean on whey; then, among FISH, prefer cheap low-mercury
    // high-omega (canned light tuna / pink salmon / sardines / jack mackerel) over expensive fresh salmon.
    (slot==="protein" ? (proteinPickScore(b,P)-proteinPickScore(a,P)) : 0) ||
    (slot==="protein" ? (fishPref(b)-fishPref(a)) : 0) ||
    // kimchi: traditional (fish sauce) is the normal pick for omnivores/pescatarians; vegan kimchi only when
    // a plant diet excludes the traditional one. Dylan: "kimchi is fine, just why vegan on a normal diet."
    ((P.diet!=="vegan"&&P.diet!=="vegetarian"&&P.diet!=="ovo"&&/kimchi/i.test(a.name+b.name)) ?
      ((/vegan|plant/i.test(a.name)?1:0)-(/vegan|plant/i.test(b.name)?1:0)) : 0) ||
    (gain ? 0 : ((isRefinedCarb(a)?1:0)-(isRefinedCarb(b)?1:0))) ||  // fiber carbs (brown rice/quinoa/sweet potato) beat white rice/white bread unless the client likes them
    (P.gut ? (gutFoodScore(b)-gutFoodScore(a)) : 0) ||   // gut mode: favor fermented/prebiotic/diverse plants
    (satietyScore(b)-satietyScore(a)) );          // more-filling foods float up (Holt satiety index)
  // everyday foods first: when a recipe allows several options, the one every supermarket stocks wins the tie
  const tierRank = f => isLiked(f,P) ? 0 : (({ most:1, specialty:2 })[tierOf(f)] || 0);   // a food the client loves is never pushed down
  cands = cands.slice().sort((a,b)=>tierRank(a)-tierRank(b));
  const fresh = avoid ? cands.filter(f=>!avoid.has(f.id)) : cands;
  const use = (fresh && fresh.length) ? fresh : cands;
  // a gainer's carb comes from the two least filling options, not the top four: with four, brown rice, quinoa and potato
  // came round as often as white rice and the fibre crept back up
  const top = use.slice(0, Math.min((P.goal==="gain" && slot==="carb") ? 2 : 4, use.length));
  return top[seed % top.length];
}
const PRODUCE_GRAMS = f => {                                        // GLP-1/small-appetite → much less volume
  const glp1 = state.profile && state.profile.glp1;
  const volume = state.profile && state.profile.volume;            // volume eating → bigger, more filling plates
  const tight = tightCarbTarget(state.profile);                    // tight-carb cut → trim the carb-costly produce
  if(f && /kimchi|sauerkraut/i.test(f.name)) return 50;            // salty ferments → small portion (sodium)
  // FLAVORINGS are never a vegetable serving — garlic/ginger/fresh herbs get a seasoning-sized amount, not 185g
  // (a template once put "Garlic, raw" in the produce slot and the app served 185g = ~60 cloves).
  if(f && /\b(garlic|ginger|basil|cilantro|parsley|dill|mint|rosemary|thyme|sage|chives|scallion|shallot)\b/i.test(f.name) && !/pickle/i.test(f.name)) return 6;
  // ONION is an aromatic, not a 185g side — nobody eats a cup of raw onion. Cap it to ~half a medium onion.
  // (Audit caught "Onion, raw 185g" on an adobo plate where the onion is cooked into the dish.)
  if(f && /\bonion\b/i.test(f.name) && !/green onion/i.test(f.name)) return glp1 ? 40 : (volume ? 90 : 70);
  // BEANS are not a salad. A legume landing in the produce slot was getting the full 185g vegetable serving,
  // which is 44g of carbs and 220 kcal: a "Cilantro-Lime CHICKEN Bowl" arrived with 185g of black beans next
  // to 113g of chicken. Size a legume side like a side, and let the dish's own protein stay the star.
  // Edamame is filed under Protein, so it slipped past this rule and a salmon bowl carried 185g of it (22g of
  // protein that nothing could trim) as its "vegetable".
  if(f && (f.cat==="Legumes" || /\b(beans|lentils|chickpeas|black-eyed peas|split peas|edamame|soybeans)\b/i.test(f.name)))
    return glp1 ? 60 : (volume ? 110 : 90);
  // sweet corn and peas are starches in a vegetable's coat: 185g of corn is 39g of carbs sitting next to
  // whatever grain the meal already has. Size them as a side, not as a salad.
  if(f && /\bcorn\b|green peas|\bpeas,/i.test(f.name) && !/popcorn|cornmeal/i.test(f.name))
    return glp1 ? 55 : (volume ? 100 : 80);
  // tight-carb: fruit is mostly sugar → halve it (or cut to a small portion) so it doesn't eat the carb budget.
  if(f && f.cat==="Fruits") return tight ? 60 : (glp1 ? 80 : (volume ? 150 : 120));
  // Dylan: "6 cups of spinach in what world." LIGHT leafy greens (~30g/cup) blow up in volume at the standard
  // 185g (= 6 cups raw spinach). Size them by realistic volume. Use NOT-cooked (not a "raw" name check) so
  // "Romaine lettuce" (no "raw" in its name) is caught too — the audit found it served at 185g (~4 cups).
  if(f && /\b(spinach|arugula|lettuce|romaine|kale|chard|watercress|spring mix|mixed greens|mesclun|spring greens|baby greens)\b/i.test(f.name) && !/cooked/i.test(f.name))
    return glp1 ? 30 : (volume ? 90 : 60);
  // tight-carb: low-net-carb veg (broccoli/asparagus/cauliflower/green beans) stays GENEROUS — it is the volume +
  // fiber engine of a cut for almost no carb; but a higher-carb veg (onion/tomato/pepper) gets trimmed so it
  // doesn't quietly add 15-20g carb at 185g.
  if(tight) return isLowCarbVeg(f) ? (glp1 ? 120 : 200) : (glp1 ? 60 : 90);
  return glp1 ? 90 : (volume ? 260 : 185);                         // generous non-starchy veg = volume/fullness for ~no calories
};
// satiety score (Holt 1995 Satiety Index + volumetrics): more protein/fiber/water-volume & lower
// energy density = more filling. Floats high-satiety foods up in selection (potato > white rice, etc).
function satietyScore(f){
  if(!f) return 0;
  const ed=(f.kcal||0)/100;                                  // energy density (cal/g), lower is more filling
  let s=(f.protein_g||0)*0.6 + (f.fiber_g||0)*1.3 - ed*7;
  if(f.cat==="Vegetables"||f.cat==="Fruits") s+=6;           // high water volume
  const n=(f.name||"").toLowerCase();
  if(/sweet potato/.test(n)) s+=14;                          // check sweet potato FIRST (\bpotato matches it too)
  else if(/\bpotato/.test(n)) s+=20;                         // boiled white potato = #1 on the satiety index
  if(/\boat/.test(n)) s+=10;
  if(/bean|lentil|chickpea|edamame|\bpea/.test(n)) s+=8;
  if(/carbe diem|carb balance/.test(n)) s+=14;               // very high fiber
  if(/quinoa|barley|whole wheat|whole grain|\bbulgur/.test(n)) s+=5;
  // ALL rice is low-fiber AND low-satiety — brown rice (1.6g fiber) is barely above white (0.4g), so it
  // gets no "healthy" pass. Dylan: stop defaulting to rice; potato/quinoa/oats/beans are more filling.
  if(/\brice\b/.test(n) && !/cauliflower/.test(n)) s-=8;
  if(/white bread|bagel|couscous|\bpasta\b/.test(n) && !/carbe diem|whole wheat|whole grain|chickpea/.test(n)) s-=6;
  // Dylan: don't lead pasta dishes with shirataki ("noodle stuff a lot of people don't like") — its near-zero
  // calories otherwise top the satiety ranking. Demote it hard so Carbe Diem / chickpea / real pasta win;
  // it stays available as a manual low-cal swap.
  if(/shirataki|konjac/.test(n)) s-=30;
  return s;
}
// fat-slot QUALITY = mostly LOW SATURATED FAT, plus a bonus ONLY for real marine omega-3 (EPA+DHA).
// Dylan rule: ALA from chia/flax/walnuts/canola is NOT a usable omega-3 source (~10% converts to
// EPA/DHA), so it earns NO omega credit here — those fats win only by being low in saturated fat.
// Real omega-3 comes from fatty fish (a protein, not a fat slot); the fat slot just shouldn't be butter/coconut.
function fatQuality(f){
  if(!f) return 0;
  let s = -(f.satfat_g||0) + (f.epa_dha_mg||0)/100;
  // Dylan: hemp/chia/flax are poor-quality omega sources (ALA barely converts to EPA/DHA), so keep them
  // OUT of the default fat rotation — avocado / olive oil / nuts get picked instead. Still allowed in
  // dishes that name them, just not auto-preferred as a generic fat.
  if(/\b(chia|hemp|flax|flaxseed|linseed)\b/i.test(f.name||"")) s -= 3;
  return s;
}
// fish preference (protein slot): real EPA+DHA omega-3 + affordability + low mercury. Dylan: salmon is
// EXPENSIVE (use canned pink salmon / light tuna / sardines / Atlantic-jack mackerel instead, all cheap +
// low-mercury "Best Choices"); fresh salmon is a treat, not a daily default. 0 for non-fish (no reorder).
const FISH_RE = /salmon|tuna|sardine|mackerel|trout|\bcod\b|tilapia|pollock|shrimp|mussel|herring|anchovy|halibut|haddock|snapper|crab|scallop|oyster|\bfish\b/i;
function fishPref(f){
  const n=(f.name||"").toLowerCase();
  if(!FISH_RE.test(n)) return 0;
  let s = (f.epa_dha_mg||0)/300;                                    // real marine omega-3 value
  if(/canned/.test(n) && /salmon|tuna|sardine|mackerel/.test(n)) s += 4;   // cheap, shelf-stable, low-mercury
  if(/sardine|anchovy/.test(n)) s += 2;                            // cheapest omega per dollar
  if(/salmon/.test(n) && /atlantic|sockeye|farmed|wild/.test(n) && !/canned/.test(n)) s -= 3;  // expensive fresh salmon
  if(/albacore|yellowfin|\bahi\b|bigeye/.test(n)) s -= 5;          // higher mercury (light/skipjack only for the default)
  return s;
}
// Dylan rule: don't build a day on low-quality proteins, and lean on protein POWDER as little as possible.
// For an omnivore/pescatarian, MOST meals should center on a complete animal/egg/dairy/fish protein
// (higher DIAAS, complete amino-acid profile, more leucine, better absorbed); plant proteins are still
// allowed but should not be the DEFAULT base for every meal. Powder is a topper/backstop, never a meal's base.
// every powdered protein concentrate/isolate — whey/casein/blend AND the soy/pea isolates + dried egg white
// added for extreme cuts. Matched as ONE regex so the cap, the "powder is a topper not a base" rule, and the
// boostProtein backstop all treat them consistently (a soy isolate is a powder, not a whole-food base).
const POWDER_RE = /protein powder|protein isolate|\bwhey\b|casein/i;
function isProteinPowder(f){ return POWDER_RE.test(f && f.name || ""); }
function proteinPickScore(f, P){
  if(!f) return 0;
  let s = 0;
  const plantPowderDiet = P && (P.diet==="vegan" || P.diet==="ovo");
  if(isProteinPowder(f)) s -= plantPowderDiet ? 2 : 12;             // whole food beats powder for dairy-eaters; for vegan/ovo plant powder is a primary protein (only mildly demoted)
  if(P && (P.diet==="omnivore" || P.diet==="pescatarian")){
    const a = animalFlags(f), n=(f.name||"").toLowerCase();
    if((a.meat || a.seafood || /\begg\b/.test(n)) && !isProteinPowder(f)) s += 6;   // complete animal base
    else if(a.dairy && !isProteinPowder(f)) s += 4;                  // dairy is also complete
    else if(!isProteinPowder(f)) s -= 3;                             // plant protein as the MAIN → demote (still allowed)
  }
  return s;
}
// does a template's protein slot resolve to a complete ANIMAL protein (for biasing omnivore days animal-first)?
function tplProteinAnimal(t, pool){
  const hits = reHits(t.reP, pool);
  if(!hits.length) return false;
  return hits.some(f=>{ const a=animalFlags(f); return (a.meat||a.seafood||a.dairy||/\begg\b/i.test(f.name)) && !isProteinPowder(f); });
}
// realistic single-serving size for a snack ingredient (by what it actually is)
function snackPortion(f){
  if(!f) return 40;
  if(f.cat==="Nuts & Seeds") return 16;          // ~1 tbsp nut butter / small handful
  if(f.cat==="Fats & Oils")  return 10;
  if(/hummus/i.test(f.name))  return 60;
  if(f.cat==="Fruits")        return PRODUCE_GRAMS(f);
  if(f.cat==="Vegetables")    return Math.min(100, PRODUCE_GRAMS(f));   // respects the aromatic/leafy caps (raw onion was served 100g)
  return 50;
}
// snack = a main + a fruit/veg (+ small fat), all at realistic portions. Only a REAL protein
// (by role, so almond butter / hummus don't count) gets scaled toward the protein target.
function buildSnackFromTemplate(pf, produce, ff, per){
  const items=[];
  if(pf && role(pf)==="protein"){
    let g = pf.protein_g>0 ? Math.round((per.P/(pf.protein_g/100))/5)*5 : 150;
    // clamp to the food's own ceiling — a 60g snack floor otherwise blew past small caps (PBfit powdered
    // peanut butter caps at 45g; it was being served 60g). Same class as the buildMealItems floor bug.
    g = Math.min(maxServeG(pf), Math.max(60, Math.min(250, g)));
    items.push({id:pf.id, grams:g});             // lever, day-refine may nudge it
  } else if(pf){
    items.push({id:pf.id, grams:snackPortion(pf), fixed:true});   // spread/fat main → fixed
  }
  if(produce && !items.find(it=>it.id===produce.id))
    items.push({id:produce.id, grams:snackPortion(produce), fixed:true});
  if(ff && !items.find(it=>it.id===ff.id))
    items.push({id:ff.id, grams:snackPortion(ff), fixed:true});
  if(!items.length && pf) items.push({id:pf.id, grams:100});
  return items;
}
// TITLE coherence, part 2 — DUAL-NAMED slots. A dish titled "Edamame & White Bean Smash" names TWO foods
// that fall in the SAME slot; the builder can only pick one as the macro-lever, so the OTHER vanished from the
// plate while the directions still called for it (Dylan: "the food is never what the name/directions say").
// After the picks, for each slot, add any OTHER option that covers a TITLE word the picked food does NOT (a
// genuinely distinct named ingredient, not just a salmon→salmon variant) as a small FIXED side — so every
// ingredient the title and the directions promise is actually on the plate.
function addTitleNamedSides(t, items, pool, P, picks){
  const tw = t.titleWords; if(!tw || !tw.length) return;
  const wordsOf = f => { const n=normName(f).toLowerCase(); return tw.filter(w=>titleWordNames(n,w)); };
  // "Roasted Salmon OR Cod" names alternatives, not two ingredients: once salmon is on the plate, cod is not a
  // missing title word. It was being added as a 50g side, so the plate carried both fish (8 days in 480).
  const altGroups = ((t.title||"").toLowerCase().match(/\b[a-z]+ or [a-z]+\b/g) || []).map(p=>p.split(" or "));
  [[t.reP,picks.pf],[t.reC,picks.cf],[t.reProd,picks.veg],[t.reF,picks.ff]].forEach(([re,picked])=>{
    if(!re || !picked) return;
    const pickedWords = new Set(wordsOf(picked));
    // The protein and the carb are guaranteed a place on the plate; the FAT is not, so a fat the macro solver
    // shaved under 10g is dropped outright. That is how "Arepa with Eggs & Avocado" arrived with no avocado.
    // A food the dish is NAMED for always gets a serving.
    if(pickedWords.size && items.length < 9 && !items.some(it=>it.id===picked.id)){
      const g = picked.cat==="Vegetables"?60 : picked.cat==="Grains & Starches"?100 : picked.cat==="Legumes"?80
              : picked.cat==="Nuts & Seeds"?15 : picked.cat==="Fats & Oils"?10
              : (picked.cat==="Eggs & Dairy"&&/cheese/i.test(picked.name))?30 : 50;
      items.push({id:picked.id, grams:Math.min(maxServeG(picked), g), titled:true});
    }
    const others = reHits(re, pool).filter(f=>f.id!==picked.id && !exclusion(f,P) && !isDisliked(f,P));
    // Up to two named sides per slot, each for a title word nothing on the plate covers yet: "Cottage Cheese & Edamame
    // Power Oats with Soft Egg" names three proteins, and one side per slot served the egg and dropped the edamame.
    const coveredWords = new Set(pickedWords);
    let added = 0;
    for(const f of others){
      const covered = w => coveredWords.has(w) || altGroups.some(g=>g.indexOf(w)>=0 && g.some(x=>coveredWords.has(x)));
      const novel = wordsOf(f).some(w=>!covered(w));   // covers a title word not yet on the plate
      if(novel && items.length < 9 && !items.some(it=>it.id===f.id)){
        const g = f.cat==="Vegetables"?60 : f.cat==="Grains & Starches"?100 : f.cat==="Legumes"?80 : f.cat==="Nuts & Seeds"?15 : f.cat==="Fats & Oils"?5
                : (f.cat==="Eggs & Dairy"&&/cheese/i.test(f.name))?30 : 50;
        items.push({id:f.id, grams:g, fixed:true});
        wordsOf(f).forEach(w=>coveredWords.add(w));
        if(++added >= 2) break;
      }
    }
  });
}
// How many pieces of bread or tortilla the dish's NAME promises. Open-faced and toast dishes are one slice.
// A DIP stays a dip. On a veggie-cup, crudite or dip plate the yogurt, hummus or tzatziki is capped at about twice
// the raw vegetables it is scooped with, and never past 120 g: a "Herbed Yogurt" dip grew to 341 g of Greek yogurt
// beside 100 g of carrots, 35 g of protein in a snack, and that day landed 19% over its protein number. The harness
// has counted this ("dip over vegetable", 18 of 480 days) without anything enforcing it.
const DIP_FOOD = /hummus|yogurt|\bdip\b|dressing|tzatziki|guacamole|cottage cheese|tahini|sour cream/i;
function markDips(t, items){
  const title = (t && t.title) || "";
  if(!/\bdips?\b|veggie cups?|crudit|platter|\bsticks\b/i.test(title)) return;
  const veg = items.reduce((a,it)=>{ const f=FOOD_BY_ID[it.id]; return a + ((f && f.cat==="Vegetables" && /raw/i.test(f.name)) ? it.grams : 0); }, 0);
  const lim = Math.max(40, Math.min(120, Math.round(veg*1.8/5)*5));
  items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(!f || !DIP_FOOD.test(f.name) || f.cat==="Vegetables") return;
    // and at least about 3 tablespoons, or the fit shrinks the dip to a smear (15 g once the 341 g was capped)
    it.capG = Math.min(it.capG||Infinity, lim); it.floorG = Math.min(lim, 50);
    if(it.grams > it.capG) it.grams = it.capG; if(it.grams < it.floorG) it.grams = it.floorG; });
}
function markVessels(t, items, pool){
  const title = (t && t.title) || "";
  const sandwich = /sandwich|\bsub\b|panini|\bmelt\b|\bclub\b|hoagie/i.test(title) && !/open-?faced|toast/i.test(title);
  const tacos = /\btacos\b/i.test(title);
  if(!sandwich && !tacos) return;
  items.forEach(it=>{
    let f = FOOD_BY_ID[it.id]; if(!f) return;
    if(sandwich && /\bbread\b|\brye\b/i.test(f.name) && f.cat==="Grains & Starches") it.minUnits = 2;
    if(tacos && /tortilla/i.test(f.name)){
      // tacos are made with taco-size tortillas, not half of a large burrito wrap
      if(/burrito|large/i.test(f.name)){
        const small = pool.find(x=>/tortilla/i.test(x.name) && /soft taco|corn tortilla|street/i.test(x.name) && x.name.split(",")[0]===f.name.split(",")[0])
                   || pool.find(x=>/tortilla/i.test(x.name) && /soft taco|corn tortilla|street/i.test(x.name));
        if(small){ it.id = small.id; f = small; }
      }
      it.minUnits = 2;
    }
    if(it.minUnits){ const u=unitGrams(f); if(u>0 && it.grams < it.minUnits*u) it.grams = Math.min(Math.max(maxServeG(f), it.minUnits*u), it.minUnits*u); }
  });
}
// The client's kitchen. A recipe that needs an oven, a grill or a slow cooker the client does not have is no recipe at
// all for them (a client with an air fryer, pots and pans cannot "roast at 425F on a sheet pan"). Read from the recipe's
// own steps and batch recipe. An oven recipe that also gives an air-fryer way stays for a client with an air fryer.
const KITCHEN_OVEN = /\b(oven|bake|bakes|baking|broil\w*|sheet[- ]pan|preheat\w*)\b|\bbaked\s+(?:at|for|until|in)\b|\broast(?:ing|s)?\b(?!\s+(?:peanuts|almonds|cashews|red peppers?|garlic))|\b(?:325|350|375|400|425|450|475)\s?°?\s?F\b/i;
const KITCHEN_AIR = /\bair[- ]?fr(?:y|yer|ied|ying)\b/i;
const KITCHEN_GRILL = /\b(grill|grills|grilled|grilling|skewers?|kebabs?)\b(?!\s+pan)/i;
const KITCHEN_SLOW = /\b(slow[- ]cooker|crock[- ]?pot|instant pot|pressure cooker)\b/i;
function tplKitchenOK(t, P){
  if(!P || !(P.noOven || P.noGrill || P.noSlow)) return true;
  const txt = [t.method, t.prepMethod, t.note].filter(Boolean).join(" ");
  if(P.noOven && KITCHEN_OVEN.test(txt) && !(P.airFryer && KITCHEN_AIR.test(txt))) return false;
  if(P.noGrill && KITCHEN_GRILL.test(txt)) return false;
  if(P.noSlow && KITCHEN_SLOW.test(txt)) return false;
  return true;
}
// A recipe that cooks in oil or butter has that fat on the list. On 296 of 1,926 test meals (15%) the steps said to sear
// in oil or melt butter while the list carried none, so the client ate calories the plan never counted (2026-09-30).
// A teaspoon of the recipe's own fat (the one its steps name, else its oil note, else olive oil) goes on the list,
// fixed, and the day is fitted around it. A mist of cooking spray is not a fat to count.
const COOK_FAT_TEXT = /\b(?:(?:extra[- ]virgin\s+)?(?:olive|avocado|canola|vegetable|coconut|toasted sesame|sesame|cooking|neutral)\s+)?oil\b(?!\s*spray)|(?<!(?:peanut|almond|nut|cashew|sunflower|apple|cocoa|seed)\s)\bbutter\b(?!\s*beans)|\bghee\b/i;
const COOK_FAT_FOOD = [[/avocado/i,"Avocado oil"],[/canola|vegetable|neutral/i,"Canola oil"],[/coconut/i,"Coconut oil"],[/sesame/i,"Sesame oil"],[/butter|ghee/i,"Butter, salted"],[/olive/i,"Olive oil"]];
const isCookFat = f => !!f && ((f.cat==="Fats & Oils" && /\boil\b/i.test(f.name)) || /^butter\b|^ghee\b/i.test(f.name));
function addCookingFat(t, items, pool){
  if(items.some(it=>isCookFat(FOOD_BY_ID[it.id]))) return;
  // a sentence for another FAT option ("If it is the olive oil, drizzle it over the fillings") is not this plate's cooking:
  // a hummus pita got 5 g of counted oil from it and a 3000-cal day could no longer land its calories (2026-10-06)
  const names = items.map(it=>{ const f=FOOD_BY_ID[it.id]; return f ? normName(f).toLowerCase() : ""; }).join(" | ");
  const offPlate = sn => { const m = sn.match(/^\s*(?:\d{1,2}[.)]\s*)?if (?:your [a-z ]+? (?:is|are|includes?)|it is|it's|they are) (?:the |a |an )?([a-z][a-z -]*?)\s*,/i);
    // only a sentence whose option IS a fat ("the olive oil", "the butter"): oil that cooks another option ("If it is the
    // onion, cook it with a little oil") stays counted, or the fit refills the fat with protein foods (a 122% day)
    if(!m || !/\b(?:oil|butter|ghee)\b/i.test(m[1])) return false; const w = m[1].toLowerCase().split(/[\s-]+/).filter(x=>x.length>2);
    return w.length>0 && !w.some(x=>names.includes(x.replace(/(?:es|s)$/,""))); };
  const txt = [t.method, t.prepMethod].filter(Boolean).join(" ").split(/(?<=[.!?])\s+/).filter(sn=>!offPlate(sn)).join(" ")
    .replace(/\b(?:cooking|oil|avocado[- ]oil|olive[- ]oil)\s+spray\b|\bspray\s+oil\b|\bmist\b[^.]*/gi, " ");
  const hit = txt.match(COOK_FAT_TEXT); if(!hit) return;
  const pick = src => (COOK_FAT_FOOD.find(([re])=>re.test(src))||[])[1];
  const want = pick(hit[0]) || pick(String(t.oil||"")) || "Olive oil";
  const f = pool.find(x=>x.name===want) || pool.find(x=>x.name==="Olive oil");
  if(f) items.push({ id:f.id, grams:5, fixed:true, cookFat:true });
}
// A volume food (iceberg, radish, jicama, shirataki) stays out of normal plans so it cannot win a slot on fullness alone.
// A dish NAMED for one is different: "Tempeh Larb Lettuce Cups" arrived with no lettuce and "Hummus, Egg & Radish Rye
// Toast" with no radish (2026-09-30), because the only lettuce and radish those recipes offer are volume foods.
function tplPool(t, pool, P){
  const tw = t.titleWords; if(!tw || !tw.length || P.volume) return pool;
  const Pv = Object.assign({}, P, { volume:true });
  const slots = [t.reP, t.reC, t.reProd, t.reF].filter(Boolean);
  const extra = FOODS.filter(f => VOLUME_FOODS.has(f.name) && !exclusion(f, Pv) && !isDisliked(f, P)
    && slots.some(re => re.test(normName(f))) && tw.some(w => new RegExp("\\b"+w+"(?:s|es)?\\b").test(normName(f).toLowerCase())));
  // (whole words: "over Rice" matched "riced cauliflower" and swapped the rice out)
  return extra.length ? pool.concat(extra.filter(f => !pool.includes(f))) : pool;
}
function buildFromTemplate(t, per, pool, P, seed, used, slotType){
  pool = tplPool(t, pool, P);
  const tw = t.titleWords;
  const pf = pickTplFood(t.reP, t.rePP, pool, P, seed, used.prot, "protein", tw); if(!pf) return null;
  const veg = t.reProd ? pickTplFood(t.reProd, t.rePProd, pool, P, seed+5, used.prod, "produce", tw) : null;
  // A breakfast with no starch in it (a chia bowl, a berry smoothie, egg bites) builds the way a snack does. The
  // starch path below returns null without a carb, so all four such breakfasts in the library were never served.
  if(slotType==="snack" || !t.reC){
    const produce = veg || (t.reC ? pickTplFood(t.reC, t.rePC, pool, P, seed+1, null, "carb", tw) : null);
    const ff = t.reF ? pickTplFood(t.reF, t.rePF, pool, P, seed+2, null, "fat", tw) : null;
    const items = buildSnackFromTemplate(pf, produce, ff, per);
    // A snack takes produce OR a starch, never both, so a banana muffin lost its oats and was served as egg,
    // banana and honey. A baked snack (muffins, bars, oat cups, cookies) keeps its grain: it is the batter.
    if(BAKED_DISH.test(t.title||"") && t.reC && produce && veg){
      const cf = pickTplFood(t.reC, t.rePC, pool, P, seed+1, null, "carb", tw);
      if(cf && !items.some(it=>it.id===cf.id)) items.push({ id:cf.id, grams:35 });
    }
    // The starch the dish is NAMED for comes along even when the snack took a vegetable: "Sardine & Lemon Rye Toasts" and
    // "Whipped Cottage Cheese & Cucumber on Rye Crispbread" arrived without the rye (2026-09-30). One slice a toast.
    let cfNamed = null;
    if(veg && t.reC && tw && tw.length){
      // (from what is not on the plate yet: "White Bean Smash on Rye" offers white beans as its starch too, and the beans
      // outscored the rye on title words while already being the protein)
      const c = pickTplFood(t.reC, t.rePC, pool.filter(f=>!items.some(it=>it.id===f.id)), P, seed+1, null, "carb", tw);
      if(c && tw.some(w=>titleWordNames(normName(c).toLowerCase(), w))){
        const u = unitGrams(c), n = /toasts\b|\bslices\b|crispbreads\b|crackers\b/i.test(t.title||"") ? 2 : 1;
        items.push({ id:c.id, grams: u > 0 ? Math.round(u*n) : 40, titled:true });
        cfNamed = c;
      }
    }
    addExtras(t, items, pool, P, seed);
    addCookingFat(t, items, pool);
    addTitleNamedSides(t, items, pool, P, {pf, cf:cfNamed, veg:produce, ff});
    markVessels(t, items, pool); markDips(t, items);
    if(tw && tw.length) items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f && tw.some(w=>titleWordHit(normName(f).toLowerCase(), w))) it.titled=true; });
    used.prot.add(pf.id); if(produce) used.prod.add(produce.id);
    return { items };
  }
  const cf = pickTplFood(t.reC, t.rePC, pool, P, seed+1, used.carb, "carb", tw); if(!cf) return null;
  const ff = pickTplFood(t.reF, t.rePF, pool, P, seed+2, used.fat, "fat", tw); if(!ff) return null;
  // (Tried scaling this produce serving by the meal's slot weight to even meal sizes out. It moved the shape
  // metric 0.2% and broke 20 days on the fiber floor, because produce is where the fiber comes from. Left alone.)
  const items = buildMealItems(pf, cf, ff, veg, per, PRODUCE_GRAMS(veg));
  // The meat or fish a lunch or dinner is built on keeps at least 3 oz cooked (85 g). On a plan where protein is a
  // small share of calories the fit spread the day's protein evenly and squeezed the main: a "Top-Round Steak with
  // Rice" dinner arrived with 2 oz of steak beside 2 cups of rice (2,433 cal / 128 g protein, 2026-09-30). The fit
  // can still trim the snack's yogurt or the breakfast oats instead.
  if((slotType==="lunch" || slotType==="dinner") && (+P.tPro||0)/Math.max(+P.meals||4,1) >= 26 && (pf.cat==="Protein" || pf.cat==="Seafood") && !isProteinPowder(pf)
     && /chicken|beef|steak|sirloin|round|pork|turkey|lamb|bison|venison|duck|salmon|tuna|cod|tilapia|shrimp|trout|mackerel|halibut|snapper|flounder|scallop|mussel|sardine/i.test(pf.name)){
    const it = items.find(x=>x.id===pf.id);
    if(it){ it.floorG = Math.max(it.floorG||0, Math.min(85, maxServeG(pf))); if(it.grams < it.floorG) it.grams = it.floorG; }
  }
  addExtras(t, items, pool, P, seed);     // whole-egg base + condiments/flavor (fixed, diet-screened)
  addCookingFat(t, items, pool);
  addTitleNamedSides(t, items, pool, P, {pf, cf, veg, ff});   // dual-named slots: ensure BOTH named foods appear
  markVessels(t, items, pool); markDips(t, items);
  if(tw && tw.length) items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f && tw.some(w=>titleWordHit(normName(f).toLowerCase(), w))) it.titled=true; });
  used.prot.add(pf.id); used.carb.add(cf.id); used.fat.add(ff.id); if(veg) used.prod.add(veg.id);
  return { items };
}
// fallback when no template fits this client/slot, the old independent-pool pick
function fallbackMeal(P, pools, name, slotType, per, i, usedProt){
  if(!pools) return { name, items:[] };
  const isBk=slotType==="breakfast", isSnack=slotType==="snack";
  let protPool=pools.proteins, carbPool=pools.carbs;
  if(isBk||isSnack){
    const bp=pools.proteins.filter(BK_PROTEIN_OK); if(bp.length) protPool=bp;
    const bc=pools.carbs.filter(BK_CARB_OK);       if(bc.length) carbPool=bc;
  }
  const pick=(arr,idx,avoid)=>{ if(!arr.length) return null;
    for(let k=0;k<arr.length;k++){const f=arr[(idx+k)%arr.length]; if(!avoid.has(f.id)) return f;} return arr[idx%arr.length]; };
  const pf = pick(protPool, i, usedProt) || pools.proteins[i%pools.proteins.length];
  if(pf) usedProt.add(pf.id);
  const cf=carbPool[i%carbPool.length], ff=pools.fats[i%pools.fats.length];
  const veg=pools.vegs.length?pools.vegs[i%pools.vegs.length]:null;
  const items = isSnack ? buildSnackItems(pf,cf,per) : buildMealItems(pf,cf,ff,veg,per);
  return { name, items };
}
// A template whose TITLE names a food the client can't have misrepresents the dish: "Tofu Migas" served
// to an omnivore (who can't have tofu) silently falls back to black beans, leaving a tofu-titled, tofu-less,
// egg-less mess with tofu still in the directions. Don't offer meat-sub-TITLED dishes to omnivores (the
// food-pool exclusion alone wasn't enough — the template still got picked). Loved-tofu omnivores still get them.
function titleHonest(t, P){
  const title = (t.title||"").toLowerCase();
  if(/\btofu\b|tempeh|seitan/i.test(title)){
    if(P.diet==="omnivore" && !(P.likes||[]).some(d=>/tofu|tempeh|seitan/i.test(d))) return false;
  }
  // every food the title names must be one this client can actually be served
  if(titleNounIdx(t.title).some(i=>!poolCanDeliver(P, i))) return false;
  // A title that NAMES a food this client cannot have becomes a lie the moment the slot falls back to
  // something else: excluding tuna still served a client a "Dilly Tuna Crunch Salad" made of canned salmon.
  for(const c of (P.cantHave||[])) if(c && title.includes(c)) return false;
  for(const d of (P.dislikes||[])) if(d && title.includes(d)) return false;
  for(const a of ALLERGENS) if(P.allergens && P.allergens[a.key] && kwHit(title, a.kw)) return false;
  return true;
}
// A dish FAMILY is its distinctive title words. used.tpl only catches the same template twice; it cannot see
// that "Sheet-Pan Buffalo Chicken & Potato Bowls" and "Buffalo Chicken & Sweet Potato Bowls" are the same
// dinner twice, or that two different cottage-cheese-jar templates are one breakfast eaten at both ends of the
// day. In meal-prep mode the client eats each menu 3 days running, so a repeat inside a day is 6 identical
// meals in a row. Soft sort, never a filter, so a tight day still builds.
const TITLE_STOP = new Set(["with","and","the","for","your","style","bowl","bowls","plate","plates","meal","prep",
  "sheet","pan","high","protein","easy","quick","simple","classic","homemade","cooker","slow","one","two","made",
  "cup","cups","jar","jars","wrap","wraps","salad","skillet","bake","baked","roasted","grilled","crispy","crunchy"]);
function titleSig(title){
  return new Set(String(title||"").toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/[\s-]+/)
    .filter(w=>w.length>2 && !TITLE_STOP.has(w)));
}
// Protein FAMILIES, for "is this the same protein again": tuna, trout and cod are three foods but one family, and so
// are egg whites and whole eggs. OB, reviewing a plan with an egg plate at breakfast, lunch and dinner: "he also has
// eggs in every single meal, like holy shit". Measured before this: one family at 3+ meals on 24% of drafted days
// (powder side shakes on vegan/ovo days, three fish dishes for pescatarians, three egg dishes for ovo).
const PROT_FAMILY = [["eggs",/^Egg(,| white)/i],["chicken",/chicken/i],["beef",/beef|steak|sirloin|bison/i],["turkey",/turkey/i],
  ["pork",/pork|\bham\b|bacon|sausage/i],["fish",/salmon|tuna|\bcod\b|tilapia|shrimp|mahi|halibut|trout|sardine|mackerel|scallop|crab|lobster|haddock|snapper|pollock|\bfish\b/i],
  ["tofu",/tofu/i],["tempeh",/tempeh/i],["yogurt",/greek yogurt|skyr/i],["cottage cheese",/cottage cheese/i],
  ["powder",/protein powder|whey|casein|pea & rice|protein isolate/i],["legumes",/(?<!green )beans?\b|lentil|chickpea|edamame/i],["seitan",/seitan/i]];
function protFamily(f){
  if(!f || f.cat==="Condiments & Misc") return null;
  for(const [n,re] of PROT_FAMILY) if(re.test(f.name)) return n;
  return null;
}
// the families a built meal actually serves: a food counts when it carries a real share (20%+) of the meal's protein
function mealProtFamilies(m){
  const its = (m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})).filter(x=>x.f);
  const mp = its.reduce((a,x)=>a+(x.f.protein_g||0)*x.it.grams/100, 0);
  const out = new Set();
  its.forEach(x=>{ const fam = protFamily(x.f); if(fam && (x.f.protein_g||0)*x.it.grams/100 >= 0.2*mp) out.add(fam); });
  return out;
}
function famRepeat(title, fams){
  const w = titleSig(title); let worst = 0;
  (fams||[]).forEach(prev=>{ let n=0; w.forEach(x=>{ if(prev.has(x)) n++; }); if(n>worst) worst=n; });
  return worst >= 2 ? 1 : 0;      // 2+ shared distinctive words = the same dish wearing a different hat
}
// `carry` lets the caller share the used-food memory ACROSS days. In meal-prep mode the K menus were each
// built with a fresh memory, so the same protein could lead a meal in every menu (a client ended up with 2kg
// of cottage cheese a week). Passing one carry object makes the second menu reach for something else. It is a
// soft preference: pickTplFood falls back to the full candidate list when avoidance empties it.
// WHAT KIND OF DISH a meal is, from its title and steps, so a pass that ADDS a food can add one that belongs
// there. Every adder used to pick a meal by slot alone: kimchi landed on an egg salad sandwich, chickpeas on
// shrimp teriyaki, a tortilla on apple and peanut butter, granola on shrimp cocktail (515 foods in 480 days
// that the recipe never offered).
const CTX_RE = {
  asian: /teriyaki|\bsoy\b|sesame|stir.?fry|\bmiso|kimchi|korean|gochujang|bibimbap|\bthai\b|pad kra|lemongrass|banh mi|\bpoke\b|sushi|ramen|soba|udon|fried rice|ginger|hoisin|orange chicken|sweet & sour|kung pao|mapo|takeout|congee|bulgogi|katsu|egg roll|edamame|bok choy|ponzu|tamari|chinese|japanese|vietnamese|dak galbi|larb/i,
  mexican: /taco|burrito|enchilada|fajita|quesadilla|salsa|chipotle|southwest|tex.?mex|\bchili\b|mexican|cilantro.?lime|barbacoa|carnitas|tinga|\bverde\b|pozole|migas|huevos|black bean|pinto|tortilla|nacho|baja/i,
  med: /greek|mediterranean|shawarma|gyro|falafel|tahini|hummus|tzatziki|\bfeta\b|oregano|souvlaki|moroccan|harissa|tagine|shakshuka|za.?atar|lebanese|turkish|persian|meze|tabbouleh|lentil|chickpea/i,
  indian: /curry|masala|tikka|\bdal\b|dahl|chana|korma|keema|tandoori|biryani|saag|palak|vindaloo|indian|anda|matar/i,
  italian: /pasta|marinara|pesto|tuscan|italian|parmesan|caprese|risotto|minestrone|bolognese|cacciatore|lasagna|\bziti\b|piccata|white bean|cannellini/i,
  deli: /sandwich|\bdeli\b|burger|\bbbq\b|reuben|\brye\b|\bhash\b|potato|meatloaf|pork|sausage|brat|pierogi|\bclub\b|melt/i,
  eggs: /\begg|omelet|frittata|scramble|shakshuka|quiche|migas|huevos/i,
  sweet: /\boats?\b|oatmeal|yogurt|parfait|smoothie|shake|pancake|waffle|muffin|\bchia\b|pudding|granola|berr|banana|apple|\bpear\b|peach|peanut butter|\bpb\b|protein bar|brownie|blondie|cookie|cheesecake|cinnamon|vanilla|chocolate|cocoa|matcha|cereal|overnight|jam|honey|mango|cherry|pumpkin spice/i,
};
// A plate holds at most 9 foods (the harness invariant); every pass that ADDS a food checks this first.
const MEAL_MAX_ITEMS = 9;
const roomFor = m => !!m && (m.items||[]).length < MEAL_MAX_ITEMS;
function dishContext(m){
  const t = (m && m.dish) || "", c = (m && m.cook) || {};
  const text = t + " " + (c.method||"").slice(0,160);
  const tags = new Set();
  Object.keys(CTX_RE).forEach(k=>{ if(CTX_RE[k].test(k==="sweet" ? t : text)) tags.add(k); });
  // sweet is judged on the title only: "a pinch of cinnamon" in a chili's steps does not make it a dessert
  if(tags.has("sweet") && (tags.has("eggs") || /savory|miso|scallion|curry|chili/i.test(t))) tags.delete("sweet");
  return tags;
}
// Does this STARCH or FRUIT belong beside this meal? (the calorie filler and the macro fit both add sides)
const SNACK_STARCH = /popcorn|cracker|rice cake|pretzel|\bchips?\b|crispbread/i;
const DRIED_FRUIT = /raisin|\bdates?\b|dried|prune|dried apricot/i;
function carbSideFits(m, f){
  const tg = dishContext(m), n = f.name, bk = /breakfast/i.test(m.name), snack = /snack/i.test(m.name);
  const items = (m.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(Boolean);
  // Two fruits a meal at most. The calorie filler prefers a food the day does not have yet, so on a high-carb day it
  // kept reaching for a NEW fruit and stacking it on the snack: edamame with a pear, an apple, blueberries and
  // cherries (a 2,433-cal, 328 g-carb plan, 2026-09-30). A third fruit is a fruit salad, not a side.
  if(f.cat==="Fruits" && items.filter(x=>x.cat==="Fruits").length >= 2) return false;
  const hasVessel = items.some(x=>/\bbread\b|tortilla|pita|bagel|english muffin|\bbun\b|\bwrap\b|naan|arepa|\brye\b/i.test(x.name)) || /sandwich|wrap|taco|toast|burrito|pita/i.test(m.dish||"");
  const hasStarch = items.some(x=>x.cat==="Grains & Starches" || /potato/i.test(x.name));
  const starchSide = f.cat!=="Fruits";
  // one starch per plate: a second grain on a quinoa bowl or a potato beside a sandwich is two dinners, not a side
  if(starchSide && (hasVessel || (hasStarch && !tg.has("sweet")))) return false;
  // a "honey-garlic" or "sweet chili" glaze does not make a chicken-and-rice lunch a sweet dish: sweet sides (fruit,
  // granola, a bagel) are for sweet breakfasts and snacks, not a savoury lunch or dinner (2026-09-30)
  if(tg.has("sweet") && !/lunch|dinner/i.test(m.name||"")) return f.cat==="Fruits" || /\boats\b|granola|cereal|rice cake|english muffin|\bbread\b|bagel/i.test(n);
  // dried fruit reads as a dessert topping, and popcorn, crackers or rice cakes are snack food, not a dinner side
  if(DRIED_FRUIT.test(n)) return false;
  if(SNACK_STARCH.test(n)) return snack;
  if(/granola|cereal|\boats\b|oatmeal/i.test(n)) return false;
  if(bk || tg.has("eggs")) return /potato|\bbread\b|english muffin|bagel|tortilla/i.test(n) || f.cat==="Fruits";
  if(snack) return /cracker|rice cake|pita|\bbread\b|pretzel/i.test(n) || f.cat==="Fruits";
  if(/tortilla/i.test(n)) return tg.has("mexican");
  if(/pita|naan/i.test(n)) return tg.has("med") || tg.has("indian");
  if(/pasta|noodle|spaghetti/i.test(n)) return tg.has("italian") || tg.has("asian");
  if(/\bbread\b|bagel|english muffin|\broll\b/i.test(n)) return /soup|stew|chili|salad/i.test(m.dish||"") || tg.has("deli");
  return f.cat!=="Fruits";           // rice, quinoa, potato, couscous, barley beside a savoury main
}
// Does this FAT food belong on this meal? Nuts and seeds top oats, yogurt, salads, bowls and stir-fries;
// avocado goes with Mexican food, eggs, toast, sandwiches and salads; olives with Mediterranean and Italian food.
function fatSideFits(m, f){
  const tg = dishContext(m), n = f.name, d = (m.dish||"");
  if(/avocado/i.test(n)) return !tg.has("sweet") && (tg.has("mexican") || tg.has("eggs") || tg.has("deli") || /salad|toast|bowl|poke|sushi/i.test(d));
  if(/olives/i.test(n)) return tg.has("med") || tg.has("italian");
  if(/almonds|walnuts|pecans|pistachio|chia|hemp|flax|pumpkin seeds|sunflower seeds/i.test(n)) return tg.has("sweet") || /snack/i.test(m.name) || /salad|bowl/i.test(d);
  if(/peanuts|cashews|sesame seeds/i.test(n)) return tg.has("asian") || tg.has("sweet") || /snack/i.test(m.name) || /salad/i.test(d);
  return false;
}
// When a macro runs over and NOTHING on the plate has room to take the calories back (the starch at its serving
// limit, a tablespoon of oil, the nuts at their cap), a coach adds a side: a piece of fruit, a handful of nuts,
// some avocado. The side must suit the meal, starts small, and is a normal lever from then on. One per call.
function addBalancingSide(meals, P, key){
  const t = mealsTotals(meals, false);
  const fatRoom = (+P.tFat||0) && t.fat_g < 0.97*(+P.tFat);
  const pool = allowedFoods(P).filter(f=>!f.recipe && !isDisliked(f,P) && !isProteinPowder(f));
  const dayG = id => meals.reduce((a,m)=>a+(m.items||[]).filter(it=>it.id===id).reduce((b,it)=>b+it.grams,0), 0);
  const fatFoods = pool.filter(f=>/^(almonds|walnuts|pecans|pistachio|cashews|peanuts|pumpkin seeds|sunflower seeds|avocado, raw|olives)/i.test(f.name) && (f.protein_g||0) < 22);
  const carbFoods = pool.filter(f=>(f.cat==="Fruits" || f.cat==="Grains & Starches" || /potato/i.test(f.name)) && (f.protein_g||0) <= 12 && (f.carb_g||0) >= 12 && (f.fat_g||0) <= 8);
  if(P.goal==="gain") carbFoods.sort((a,b)=>fibrePerKcal(a)-fibrePerKcal(b));
  // protein over: prefer the macro that is also UNDER target; fat over: only a carb side helps
  const order = key==="protein_g" && fatRoom ? [fatFoods, carbFoods] : [carbFoods];
  const byLight = meals.slice().sort((a,b)=> mealsTotals([a],false).kcal - mealsTotals([b],false).kcal);
  for(const foods of order){
    for(const m of byLight){
      if(!roomFor(m) || (m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && f.recipe; })) continue;
      const f = foods.find(x=>!m.items.some(it=>it.id===x.id) && dayG(x.id)===0 && (fatFoods.indexOf(x)>=0 ? fatSideFits(m,x) : carbSideFits(m,x)));
      if(f){ const g = Math.max(leverFloor({ id:f.id, inSnack:/snack/i.test(m.name||"") }), /avocado/i.test(f.name) ? 50 : f.cat==="Nuts & Seeds" ? 15 : f.cat==="Fruits" ? 80 : 60);
        // The side PAYS FOR ITSELF on the way in: the over-target macro's densest food gives up the same
        // calories, so adding it never moves the day total. Without this, a 1400-cal day that was already at
        // every floor came out 97 cal over, because nothing was left to shrink.
        const sideKcal = (f.kcal||0)*g/100;
        const bk = meals.find(mm=>/breakfast/i.test(mm.name||""));
        const bkP = () => bk ? bk.items.reduce((a,it)=>{ const ff=FOOD_BY_ID[it.id]; return a + (ff ? (ff.protein_g||0)*it.grams/100 : 0); }, 0) : Infinity;
        const payers = meals.flatMap(mm=>(mm.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id], m:mm})))
          .filter(x=>x.f && !x.f.recipe && !x.it.fixed && !x.it.manual && (x.f.kcal||0) > 0 && (x.f[key]||0) >= MACRO_FIT[key].dense)
          .sort((a,b)=>((b.f[key]||0)/b.f.kcal) - ((a.f[key]||0)/a.f.kcal));
        for(const pay of payers){
          const room = (pay.it.grams - leverFloor(pay.it)) * (pay.f.kcal/100);
          if(room < sideKcal) continue;
          const o = pay.it.grams, bk0 = bkP();
          pay.it.grams = Math.round(pay.it.grams - sideKcal/(pay.f.kcal/100));
          if(bkP() < Math.min(25, bk0) - 0.01){ pay.it.grams = o; continue; }   // never at breakfast's protein floor
          m.items.push({ id:f.id, grams:g, side:true, inSnack:/snack/i.test(m.name||"") });
          return true;
        }
        return false;
      }
    }
  }
  return false;
}
const cloneCarry = c => { const o = {}; Object.keys(c).forEach(k=>{ const v=c[k]; o[k] = v instanceof Set ? new Set(v) : Array.isArray(v) ? v.slice() : v; }); return o; };
function buildOneDay(P, seed, forceDense, carry){
  const pool = draftFoods(P);
  if (pool.length < 3) return null;
  const pools = buildPools(P, seed);                                // kept as fallback
  const n = P.meals;
  const names = MEAL_NAMES[n] || Array.from({length:n},(_,i)=>"Meal "+(i+1));
  const w = names.map(slotWeight), wsum = w.reduce((a,b)=>a+b,0) || 1;
  // Dylan rule: BREAKFAST should be lean + high-protein (>=25g) + high-fiber to blunt hunger and cravings
  // early in the day. We do this at the ALLOCATION level — breakfast gets a bigger PROTEIN slice and a
  // smaller FAT slice — so day macro totals stay exact while breakfast skews lean-and-high-protein. The
  // other meals automatically absorb the difference. A hard 25g floor backstops it (ensureBreakfastFloor).
  const isBkName = nm => /breakfast/i.test(nm);
  // SNACKS get the same lean treatment, for the same reason. A snack's whole job is to bridge the hunger
  // between meals, and in the Holt satiety index fat content was NEGATIVELY associated with fullness
  // (r = -0.43) while protein and water were positive. With the default share, a lean-protein snack had its
  // fat slot sized up to match a main meal's fat share: turkey roll-ups came out 62% fat, all of it from the
  // avocado on the side. Days stay exact because lunch and dinner absorb the difference, and those carry
  // cooking fat naturally anyway.
  const isSnackName = nm => /snack/i.test(nm);
  // The protein tilt toward breakfast and snacks suits a high-protein cut. On a low-protein plan (20-25% of
  // calories) it put 200g of skyr in a snack while breakfast's fixed floor and ordinary grains already covered
  // most of the day, and every harness miss left was protein OVER on exactly those plans. So the tilt scales
  // with the plan's protein share: full at 28% of calories and up, none at 20%.
  const pShare = (+P.tPro*4)/Math.max(+P.tCal,1), tilt = Math.max(0, Math.min(1, (pShare-0.20)/0.08));
  const pw = names.map((nm,i)=> isBkName(nm) ? w[i]*(1+0.4*tilt) : isSnackName(nm) ? w[i]*(1+0.3*tilt) : w[i]), pwsum = pw.reduce((a,b)=>a+b,0) || 1;
  const fw = names.map((nm,i)=> isBkName(nm) ? w[i]*0.7 : isSnackName(nm) ? w[i]*0.6 : w[i]), fwsum = fw.reduce((a,b)=>a+b,0) || 1;
  const used = carry || { prot:new Set(), carb:new Set(), fat:new Set(), prod:new Set(), tpl:new Set(), fam:[] };
  const pfam = {};                        // protein family -> how many of TODAY's meals it leads (never carried)
  const carry0 = (carry && !forceDense) ? cloneCarry(carry) : null;   // what the earlier menus used, before today
  // demanding protein target (high % of calories) → lean on protein-dense templates
  // 0.28 was too high a bar: 1650cal/115g protein is 27.9% and missed it, so the day got protein-poor
  // templates (chia pudding + lentil bowls) and landed at 60% of target. 0.24 catches real fat-loss macros.
  const demandHi = (+P.tPro*4)/Math.max(+P.tCal,1) > 0.24;
  const protScore = t => { const f=reHits(t.reP,pool)[0]; return f ? f.protein_g/Math.max(f.kcal,1) : 0; };
  // Dylan: for omnivores/pescatarians MOST meals should center on a complete animal/egg/dairy/fish protein
  // (quality). Restrict each MAIN meal to animal-protein templates, EXCEPT one plant-friendly main per day
  // (so the bean/tofu dishes he wanted still appear) plus snacks. Vegetarian/vegan diets are unaffected.
  const animalDiet = P.diet==="omnivore" || P.diet==="pescatarian";
  const mainIdxs = names.map((nm,i)=> tplSlot(nm)!=="snack" ? i : -1).filter(i=>i>=0);
  const plantMainIdx = mainIdxs.length ? mainIdxs[seed % mainIdxs.length] : -1;
  // building muscle: one breakfast or snack a day leans toward a smoothie or shake, and which one moves with the seed
  // ("Greek Chickpea & Feta Shake Salads" are jar salads you shake, not a shake)
  const sideIdxs = names.map((nm,i)=> tplSlot(nm)!=="lunch" && tplSlot(nm)!=="dinner" ? i : -1).filter(i=>i>=0);
  const shakeIdx = sideIdxs.length ? sideIdxs[(seed>>1) % sideIdxs.length] : -1;
  const meals = [];
  for (let i=0;i<n;i++){
    const slotType = tplSlot(names[i]);
    const per = { P:+P.tPro*pw[i]/pwsum, C:+P.tCarb*w[i]/wsum, F:+P.tFat*fw[i]/fwsum };
    // SIMPLE MODE: a simple plate works equally for lunch or dinner, so treat the two slots as interchangeable
    // (gives omnivore lunches the full set of simple dinners, and vegan dinners the simple plant lunches).
    const slotMatch = t => t.slot===slotType
      || (P.simple && t.simple && ((slotType==="lunch"&&t.slot==="dinner")||(slotType==="dinner"&&t.slot==="lunch")));
    let cands = TEMPLATES.filter(t=>slotMatch(t) && t.diets && t.diets.indexOf(P.diet)>=0 && titleHonest(t,P) && tplKitchenOK(t,P) && tplBuildable(t,pool,slotType));
    // SIMPLE MODE: restrict to straightforward classic plates (one lean protein + one basic starch + one
    // simple veg, no exotic cuisines or multi-component bowls). Hard filter when simple templates exist for
    // this slot/diet; falls back to the full set only if none do, so the day still builds.
    if(P.simple){ const s=cands.filter(t=>t.simple); if(s.length) cands=s; }
    if(demandHi){
      const dense = cands.filter(t=>protScore(t) >= 0.10);   // tofu/tempeh/seitan/whey/meat/fish/dairy
      if(dense.length >= 2) cands = dense;                   // keep variety; only restrict if there's a choice
    }
    // breakfast specifically: prefer lean, protein-dense dishes (egg whites / Greek yogurt / cottage
    // cheese / protein oats) so the front-loaded protein lands on a lean base; keep >=3 for variety.
    if(slotType==="breakfast"){ const lean=cands.filter(t=>protScore(t)>=0.10); if(lean.length>=3) cands=lean; }
    // a dish whose protein family already leads two of today's meals sinks below anything that brings another
    // protein (all of its protein options repeat, or it is built on eggs and eggs are at two). Weighted 5 so it
    // outranks a dish-family plus a same-food repeat (2+2): at 3 a third fish or egg dish still won those ties.
    // Soft: a day with nothing else still builds.
    const tplFams = t => { const fams = new Set(reHits(t.reP, pool).map(protFamily).filter(Boolean)); return fams; };
    const pfamRepeat = t => { const fams = tplFams(t);
      if(t.eggBase && (pfam.eggs||0) >= 2) return 1;
      return (fams.size && [...fams].every(f => (pfam[f]||0) >= 2)) ? 1 : 0; };
    // ...and a SECOND meal on the same protein is the next thing to avoid. In the 24-draft UI test (2026-09-24) 12 of
    // 24 drafts had one protein leading two meals, 11 of them Greek yogurt at breakfast and again at the snack
    // (yogurt overnight oats, then the chocolate yogurt pudding). Weighted 2, like a same-food repeat: a dish that
    // brings a new protein wins the tie, and a day with nothing else still builds.
    const pfamSecond = t => { const fams = tplFams(t);
      if(t.eggBase && (pfam.eggs||0) >= 1) return 1;
      return (fams.size && [...fams].every(f => (pfam[f]||0) >= 1)) ? 1 : 0; };
    // animal-base bias (omnivore/pescatarian): every main meal but the day's one plant slot leans animal. Not onto a
    // third serving of the same animal protein, though: when every animal dish would repeat a family that already
    // leads two meals (a pescatarian's third fish of the day), the bias steps aside and the family rule picks.
    if(animalDiet && slotType!=="snack" && i!==plantMainIdx){
      const animalCands = cands.filter(t=>tplProteinAnimal(t,pool));
      if(animalCands.length>=2 && animalCands.some(t=>!pfamRepeat(t))) cands = animalCands;
    }
    // meal-prep mode: prefer dishes that have an idiot-proof BATCH recipe (they store/reheat well). A fresh-cook
    // day (Saturday in 3-day batches) is not a batch, so it keeps the whole library.
    if(P.prep && !P.prepFresh){ const pc=cands.filter(t=>t.prepMethod); if(pc.length>=2) cands=pc; }
    // A batch eaten over N days: drop dishes whose last container would outlast their fridge life AND cannot be
    // frozen for that day (egg dishes in a 4-day batch). Hard only while at least two candidates remain.
    if(P.prep && P.prepBatchDays > 1){
      const ok = cands.filter(t=>{ const k=tplKeep(t,pool); return prepOverFridge(P.prepBatchDays, k.fridge) <= 0 || k.freeze; });
      if(ok.length >= 2) cands = ok;
    }
    // On a forced-dense retry, RESTRICT to protein-dense templates but keep them SHUFFLED, so a
    // high-protein client still gets VARIETY (any of ~15 dense breakfasts) instead of always the
    // single densest dish (the egg/potato bowl). This was the "same breakfast for everyone" bug.
    // a LEAN variant (the day hit protein but ran over on fat): the dishes whose protein carries the least fat per gram of
    // protein. Dense variants pick tofu and tempeh on a vegan day and add fat (45 of 51 fat misses were OVER, 2026-10-06)
    if(forceDense==="lean"){ const fpp = t => { const f=reHits(t.reP,pool)[0]; return f && f.protein_g>0 ? f.fat_g/f.protein_g : 9; };
      const srt = cands.slice().sort((a,b)=>fpp(a)-fpp(b)); const keep = srt.slice(0, Math.max(3, Math.ceil(srt.length*2/3)));
      if(keep.length>=3) cands = keep; }
    else if(forceDense){ const d=cands.filter(t=>protScore(t)>=0.12); if(d.length>=3) cands=d; }
    const leanT = leanFatTarget(P), tightC = tightCarbTarget(P);
    const tplProtFat = t => { const f=reHits(t.reP,pool)[0]; return (f&&f.protein_g>0)?(f.fat_g/f.protein_g):9; };
    // a template's carb cost = its carb-slot food's carb density + (animal diets only) a penalty when the
    // PROTEIN itself is a carb-heavy legume — so an omnivore/pescatarian cut floats grain-light animal dishes
    // up over bean-bowls. NOT for plant diets: beans/lentils/TVP ARE the vegan/vegetarian protein, so
    // penalizing them starves protein (it crashed vegan to 43%). Soft sort: nothing removed.
    const animalD = P.diet==="omnivore" || P.diet==="pescatarian";
    const tplCarb = t => { const c=reHits(t.reC,pool)[0], p=reHits(t.reP,pool)[0];
      return (c?(c.carb_g||0):0) + (animalD && p && /bean|lentil|chickpea|\bpea\b|edamame/i.test(p.name) ? 40 : 0); };
    // A template whose protein slot has ONE option that is already on today's plate will serve it again:
    // pickTplFood falls back to the used food when nothing else resolves. That is how a day ends up with
    // chicken breast leading both lunch and dinner. Sink those candidates below templates that bring
    // something new. Soft, like the rest of this sort, so a tight day still builds.
    const protRepeat = t => {
      const opts = reHits(t.reP, pool);
      if(!opts.length) return 0;
      return opts.every(f=>used.prot.has(f.id)) ? 1 : 0;
    };
    // Carb cost and fat cost as ONE secondary score rather than two lexicographic keys. As separate keys the
    // fat term only ran when two templates tied exactly on carb cost, so on a tight-carb day it never ran at
    // all. Measured neutral on its own, but it stops the fat term being silently dead.
    //
    // (Also tried adding each template's FIXED extras fat to this score, on the theory that 20g of feta or
    // cheddar is fat no fitting pass can spend. 295 of the 387 templates carry extras, so it looked like the
    // obvious lever. It made fat WORSE, 4.4% to 4.6% mean and 14.5% to 15.3% at p90. The reading is that a
    // template with fat extras gives the fitting pass something it can cut, where a template whose fat all
    // rides on its protein does not, and the pass needs that room in both directions. Not used.)
    // In a batch, a dish that needs its last container frozen ranks below one that simply keeps, and a dish that
    // tastes worse reheated on day 3 or 4 (plain breast, plain fish, crisp coatings) ranks below a braise, curry,
    // chili or sauced dish. Both are soft: they reorder, never remove.
    const batchCost = t => (P.prep && P.prepBatchDays > 1) ? tplBatchCost(t, pool, P.prepBatchDays) : 0;
    const tplCost = t => (tightC ? tplCarb(t)/40 : 0) + (leanT ? tplProtFat(t)*Math.max(per.P,1)/20 : 0) + batchCost(t) + protBudgetCost(t) + gainCost(t) + noStarchCost(t);
    // A breakfast with no starch (egg bites, a chia bowl, a berry smoothie) cannot carry a breakfast's share of a high-carb
    // day, and the carbs it leaves go to the other meals: on a 1,850-cal, 225g-carb pescatarian day the salmon egg bites
    // sent a chickpea pasta dinner to 358g and the day to 119% of its protein. It sinks by how much starch the slot needs.
    const noStarchCost = t => (!t.reC && slotType!=="snack") ? Math.max(0, per.C - 25)/25 : 0;
    // BUILDING MUSCLE: the hard part of a 2,400 to 3,500-calorie plan is finishing it. A dish whose carb is beans, bran
    // or a high-fibre tortilla fills the client up long before the calories are in, so it sinks below rice, pasta and
    // potato dishes; a bean-led main sinks for an omnivore; and one smoothie or shake a day floats up at breakfast or
    // a snack, because a drink is the easiest 500 calories there is. Soft, like the rest of this sort.
    // Banded, not continuous: a continuous score gives every template its own rank and the seeded shuffle never gets
    // a tie to break, which served the same Kefir Berry smoothie on 21 of 29 test days.
    const gainCost = t => {
      if(P.goal!=="gain") return 0;
      const cs = reHits(t.reC, pool), p = reHits(t.reP, pool)[0];
      const fpk = cs.length ? Math.min(...cs.map(fibrePerKcal)) : 0;       // rice 0.3, potato 2.4, beans 6.6, bran 23
      let k = fpk >= 7 ? 2 : fpk >= 3 ? 1 : fpk >= 1.5 ? 0.5 : 0;       // (no starch at all: noStarchCost, below)
      if(animalD && p && /bean|lentil|chickpea|\bpea\b/i.test(p.name)) k += 1;
      if(i===shakeIdx && SHAKE_TITLE.test(t.title) && !meals.some(m=>SHAKE_TITLE.test(m.dish||""))) k -= 1;
      return k; };
    const tplRepW = P.prep ? 5 : 1;
    // PROTEIN BUDGET: the least protein a dish can be served with (its named protein at a realistic portion,
    // plus its egg base and fixed extras). A whey-shake snack or a 3-oz-of-fish dinner on a 95g-a-day plan is
    // over the meal's share before anything else is on the plate, and every protein miss left in the harness
    // was on a plan like that. Dishes that cannot fit the meal's share sink; nothing is removed.
    const protBudgetCost = t => {
      if(!(per.P > 0)) return 0;
      const f = reHits(t.reP, pool)[0]; if(!f) return 0;
      const pd = (f.protein_g||0)/100;
      const minG = isProteinPowder(f) ? 25 : (f.cat==="Protein"||f.cat==="Seafood") ? Math.min(85, Math.max(56, per.P*0.75/Math.max(pd,0.01))) : /egg/i.test(f.name) ? 100 : 60;
      let minP = pd*minG + (t.eggBase ? t.eggBase*6.3 : 0);
      (t.reExtra||[]).forEach(x=>{ const e = pool.find(ff=>x.re.test(normName(ff))); if(e) minP += (e.protein_g||0)*x.g/100; });
      return Math.max(0, (minP - per.P*1.25)/per.P) * 2;
    };
    cands = seededShuffleTop(cands, cands.length, seed + i*13 + 1)
      // fresh (unused) first; then on a LEAN target, softly float lean templates up (breast/egg whites/white
      // fish/97-3/nonfat dairy over salmon/thigh/80-20, and light extras over cheese) WITHOUT removing the
      // dense fatty ones, so the protein-density retry can still reach a high protein target. Variety still
      // survives the shuffle, because freshness stays the dominant key.
      // In meal prep the menus are shared across days, so the SAME dish on two menus is eaten for a whole week
      // (Sunday's batch and Wednesday's). That outranks a different dish on a protein already used.
      .sort((a,b)=> ((pfamRepeat(a)*5 + pfamSecond(a)*2 + famRepeat(a.title,used.fam)*2 + protRepeat(a)*2 + (used.tpl.has(a.id)?tplRepW:0)) - (pfamRepeat(b)*5 + pfamSecond(b)*2 + famRepeat(b.title,used.fam)*2 + protRepeat(b)*2 + (used.tpl.has(b.id)?tplRepW:0)))
                 || (tplCost(a)-tplCost(b)));
    let built=null, chosen=null;
    for(const t of cands){
      const r = buildFromTemplate(t, per, pool, P, seed + i*7, used, slotType);
      if(r && r.items && r.items.length){ built=r; chosen=t; break; }
    }

    if(built){
      used.tpl.add(chosen.id); (used.fam || (used.fam=[])).push(titleSig(chosen.title));
      meals.push({ name:names[i], dish:chosen.title,
        cook:{ method:chosen.method, oil:chosen.oil, season:chosen.season, note:chosen.note, prepMethod:chosen.prepMethod, makes:chosen.makes },
        items:built.items });
    } else {
      meals.push(fallbackMeal(P, pools, names[i], slotType, per, i, used.prot));
    }
    mealProtFamilies(meals[meals.length-1]).forEach(fam => { pfam[fam] = (pfam[fam]||0) + 1; });
  }
  meals.forEach(m=>{ if(/snack/i.test(m.name||"")) (m.items||[]).forEach(it=>{ it.inSnack = true; }); });
  // gut-health mode: add a small fermented side (sauerkraut/kimchi) to a savory meal, the
  // research's single strongest lever (live cultures raise diversity), and it adds a plant point.
  if(P.gut){
    // `pool` is already diet/kosher-filtered: traditional kimchi is excluded for plant/kosher
    // clients and vegan kimchi is kept, so matching kimchi|sauerkraut here is always safe.
    // A ferment has to BELONG on the plate. It went on the first lunch or dinner whatever it was (kimchi on
    // an egg salad sandwich, sauerkraut on lentil soup), and "any food with kimchi in its name" included a
    // finished kimchi egg-white cup, which was then served beside shrimp teriyaki. Now: skip it when the day
    // already has a fermented food (yogurt, kefir, skyr, tempeh, miso all count; Wastyk 2020's high-ferment
    // diet was built from exactly those), put kimchi on an Asian-style or egg dish and sauerkraut on a deli,
    // rye, potato or pork dish, and add nothing if no meal fits.
    const FERMENTED = /yogurt|kefir|skyr|tempeh|\bmiso|kimchi|sauerkraut|kombucha/i;
    const hasFerment = meals.some(m=>(m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && FERMENTED.test(f.name); }));
    if(!hasFerment){
      const plain = pool.filter(f=>!f.recipe && /^(vegan )?kimchi\b|^sauerkraut/i.test(f.name));
      const fits = (m, f) => { const tg = dishContext(m); if(tg.has("sweet")) return false;
        return /kimchi/i.test(f.name) ? (tg.has("asian") || (tg.has("eggs") && !tg.has("mexican") && !tg.has("med")))
                                      : ((tg.has("deli") || tg.has("eggs")) && !["mexican","asian","indian","italian","med"].some(k=>tg.has(k))); };
      const mains = meals.filter(m=>/dinner|lunch|breakfast/i.test(m.name));
      let placed = false;
      for(const f of plain.slice().sort((a,b)=>((seed+a.id.length)%2)-((seed+b.id.length)%2))){
        const target = mains.find(m=>fits(m,f) && roomFor(m) && !m.items.some(it=>it.id===f.id));
        if(target){ target.items.push({id:f.id, grams:30, fixed:true}); placed = true; break; }
      }
    }
  }
  refineMeals(meals, P);          // first macro polish (the exact fit comes later, in settleDay)
  boostFiber(meals, P);           // then guarantee the day clears the fiber floor (Dylan's #1 gripe)
  // demanding-target retry: a SINGLE same-seed retry is deterministic, so a bad draw stayed bad — protein
  // landed 67% on some pescatarian 2000/220 seeds, and the leanest targets overshot fat (148%) when the one
  // chosen day happened to be fatty. Instead, when a demanding day misses on protein (too low) OR fat (too
  // high), build several forced-dense SEED variants and pick the best: among days that HIT protein from whole
  // food, take the one with the lowest overall macro error (this is what pulls fat back down to target);
  // only if none reach protein do we keep the highest-protein day. Reaching protein from whole food keeps us
  // off the powder backstop (capped to avoid "more powder than oats"). Only the missing days pay for this.
  // fat-over days get lean variants whatever their protein share (most fat misses were not "demanding" days, 2026-10-06)
  const fatOver0 = (+P.tFat||0) && mealsTotals(meals,false).fat_g > 1.12*(+P.tFat);
  if((demandHi || fatOver0) && !forceDense){
    const tgtP = 0.96*(+P.tPro), fatCeil = (+P.tFat||0) ? 1.12*(+P.tFat) : Infinity;
    const t0 = mealsTotals(meals, false);
    // Trigger only on PROTEIN-short or FAT-over. NOT carb-over: at high fiber, total carb is legitimately
    // higher than the 4-4-9 remainder target (fiber is ~2 cal/g, not 4), so chasing the carb number with
    // full rebuilds is both wrong and slow — the tight-carb food selection handles carbs without rebuilding.
    if(t0.protein_g < tgtP || t0.fat_g > fatCeil){
      // Judge the first draft FINISHED, as the variants are (each variant is settled inside its own build). Judged raw,
      // it lost to variants that settled worse: fat >15% off went 10% -> 8% of 480 days and carbs >10% off 16% -> 13%
      // when it was settled first, and the days that settle on target skip the variant builds (2026-10-06).
      const draft0 = JSON.parse(JSON.stringify(meals)); boostProtein(draft0, P); fixProteinShortfall(draft0, P);
      const settled0 = settleDay(draft0, P), s0 = mealsTotals(settled0, false);
      let best=settled0, bestP=s0.protein_g, bestHit=(s0.protein_g>=tgtP), bestErr=macroErrOf(settled0,P), bestCarry=null;
      if(bestHit && s0.fat_g <= fatCeil && s0.protein_g <= 1.10*(+P.tPro)) return settled0;
      for(let k=0;k<3;k++){
        // In meal prep the variants must see what the OTHER menus already use; without the carry they re-picked
        // Sunday's dishes for Wednesday's menu and the same dinner ran all week.
        const vc = carry0 ? cloneCarry(carry0) : undefined;
        // over on fat with protein met: lean variants; otherwise (protein short) dense ones
        const c=buildOneDay(P, seed+997+k*131, (t0.protein_g >= tgtP && t0.fat_g > fatCeil) ? "lean" : true, vc); if(!c) continue;
        const t=mealsTotals(c,false), hit=(t.protein_g>=tgtP), err=macroErrOf(c,P);
        // a lean variant must also keep protein within 10% of target: lean proteins overshoot it (2026-10-06)
        const pOk = t.protein_g <= 1.10*(+P.tPro);
        const better = bestHit ? (hit && pOk && err<bestErr)       // both hit protein → take the leaner (lowest macro error)
                               : (hit || t.protein_g>bestP); // not hitting yet → any protein-hit, else more protein
        if(better){ best=c; bestP=t.protein_g; bestHit=hit; bestErr=err; bestCarry=vc; }
        if(bestHit && mealsTotals(best,false).fat_g <= fatCeil) break;  // protein hit + fat in range → good enough, stop early
      }
      if(carry && bestCarry) Object.keys(bestCarry).forEach(key=>{ carry[key] = bestCarry[key]; });   // the winner's picks are what later menus must avoid
      // the first draft was settled above and each variant inside its own build; a winning variant goes through the
      // backstops and the settle once more (idempotent when already met), as it always has
      if(best===settled0) return settled0;
      boostProtein(best, P); fixProteinShortfall(best, P);
      return settleDay(best, P);
    }
  }
  boostProtein(meals, P);         // last resort: if STILL short (e.g. high-protein vegan), add a protein-powder scoop
  fixProteinShortfall(meals, P);  // trade carbs->protein when the calorie ceiling blocked boostProtein (prep mode)
  return settleDay(meals, P);
}
// The closing sequence, in ONE place. It used to be written out twice, here and again in the forced-dense
// retry above, and the two copies drifted: the retry still ran the old fat-only pass and re-ran balancePlate
// on the way out, so a day that took the retry path got a different and worse settle than one that did not.
// Anything added to the pipeline has to be added to the pipeline, not to one of two transcriptions of it.
function settleDay(meals, P){
  ensureBreakfastFloor(meals, P); // Dylan rule: breakfast must clear 25g protein (hard floor)
  sanitizeMeals(meals, P);
  capDayRepeats(meals, P);        // cap one-food domination and the fibre ceiling BEFORE the fit absorbs it
  fitCalories(meals, P);          // Dylan rule: ACTUAL calories within ~100 of target, every day
  // The floor is checked BEFORE the calorie fit, so a day that was fine at 26g could come back at 23g. It is
  // a hard rule, so assert it again afterwards and re-settle calories with the topped-up items pinned.
  ensureBreakfastFloor(meals, P);
  fitCalories(meals, P);
  balanceMealSizes(meals, P);     // even the meals out; the day total is already right and stays right
  balanceProteinAcrossMeals(meals, P);
  balancePlate(meals, P);         // settle the SHAPE of each plate before fitting the numbers to it
  // and where the day's protein is spent elsewhere, trade it to the lopsided plate. A trade only reshapes a plate, so it
  // must never cost the day its macros: on a 75 g protein day the fit re-spent the cut rice on beans and yogurt and landed
  // protein at 138% (2 of 480 harness days, 2026-10-05). Keep the untraded day and use it when it fits clearly better.
  const untraded = meals.map(m=>(m.items||[]).map(it=>Object.assign({}, it)));
  const traded = tradePlateBalance(meals, P);
  fitMacros(meals, P);            // then the numbers: protein, fat and calories, each fixing what the last moved
  if(traded){
    const err = macroErrOfTotals(mealsTotals(meals,false), P), kept = meals.map(m=>m.items);
    meals.forEach((m,k)=>{ m.items = untraded[k]; });
    fitMacros(meals, P);
    if(macroErrOfTotals(mealsTotals(meals,false), P) > err - TRADE_MACRO_COST) meals.forEach((m,k)=>{ m.items = kept[k]; });
  }
  // (Tried re-running capFiber HERE, after the macro fit, because the fit reaches for legumes and grains and
  // grows back what the ceiling trimmed. It bought almost nothing: worst day 156g to 140g, median unchanged
  // at 48g, days over 70g unchanged at 13%, and it cost 3 calorie misses plus a protein miss per 480 days.
  // The reason is that capFiber stops when every high-fibre item is already at its floor, and on a 2900-cal
  // high-carb plant day the beans, lentils, sweet potato, quinoa and peas deliver 100g+ of fibre at their
  // MINIMUM portions. The ceiling is not reachable by trimming portions; it is a food-SELECTION problem.
  // Not used. See the audit doc: the ramp note is the honest mitigation until selection is fixed.)
  const out = sanitizeMeals(meals, P, {skipPlate:true});   // clamps and whole-unit snapping only
  settleCaloriesExact(out, P);    // LAST: the snap just moved grams, so land the calorie total after it
  return out;
}
// Hard backstop for the breakfast rule. The front-loaded allocation already gives breakfast ~30% of the
// day's protein (>=25g for any realistic fat-loss target), but for very low total-protein clients or a
// stubborn template it can fall short. Top it up with a lean protein the client can have, added/grown as
// a FIXED item so the macro solver rebalances the REST of the day down instead of undoing the floor.
// A meal that is never heated: overnight oats, chia pudding, parfaits and jars, smoothies and shakes, or any dish
// whose steps have no heat in them. Raw egg (white or whole) must never be added to one.
// "No-Bake" too: the protein balls' equipment line names a sheet pan to chill them on, and "pan" read as heat, so the cook-day
// run sheet sent them to "the stove" (a client, 2026-10-16)
const COLD_DISH = /overnight|chia pudding|parfait|smoothie|shake|yogurt (bowl|jar|cup)|jars?\b|no-cook|no-bake|bircher|muesli/i;
// ("on your cook day" is when, not how: a cottage-cheese jar made on the cook day is still never heated)
const HEAT_STEP = /\b(pan|skillet|bake[ds]?|oven|microwave|cook(?!\s+days?\b)|scramble[ds]?|fr(y|ied)|grill|boil|toast|heat|simmer|roast|air.?fry|griddle|waffle|poach|steam|saute|sear)/i;
function mealEatenCold(meal){
  if(!meal) return false;
  if(COLD_DISH.test(meal.dish||"")) return true;
  const c = meal.cook || {};
  return !!(c.method || c.prepMethod) && !HEAT_STEP.test((c.method||"")+" "+(c.prepMethod||""));
}
function ensureBreakfastFloor(meals, P){
  const bk = meals.find(m=>/breakfast/i.test(m.name));
  if(!bk || !bk.items || !bk.items.length) return;
  const bkProt = () => bk.items.reduce((s,it)=>{const f=FOOD_BY_ID[it.id]; return s+(f?f.protein_g*it.grams/100:0);},0);
  if(bkProt() >= 24.5) return;
  // grow/add only WHOLE-FOOD lean proteins that read normal at breakfast — liquid egg whites, Greek yogurt,
  // cottage cheese, skyr, kefir, tofu. NEVER a raw protein powder/isolate: nobody eats a spoon of dried egg
  // white powder on scrambled eggs (Dylan flagged exactly this). Powders belong in a labeled shake (boostProtein).
  const leanRe = /egg white|greek yogurt|cottage cheese|\bskyr\b|\bkefir\b|^tofu/i;
  const topUp = () => {
    let lever = bk.items.filter(it=>{const f=FOOD_BY_ID[it.id]; return f && leanRe.test(f.name) && !isProteinPowder(f);})
                        .sort((a,b)=>(FOOD_BY_ID[b.id].protein_g||0)-(FOOD_BY_ID[a.id].protein_g||0))[0];
    if(lever){
      lever.fixed = true;
      for(let i=0;i<24 && bkProt()<25; i++) lever.grams = Math.min(maxServeG(FOOD_BY_ID[lever.id]), lever.grams+10);
    }
    // Growing ONE lean food often can't reach 25g on its own — liquid egg whites cap at 200g = only ~22g protein,
    // so the floor silently failed (audit found breakfasts at 17g). Add lean whole foods until the floor is met.
    // Liquid egg white only goes into a breakfast that gets COOKED. Overnight oats, chia pudding, yogurt jars and
    // smoothies are eaten cold, and the floor was stirring raw egg white into them (found auditing the prep modes).
    // A protein family that already leads two of the day's OTHER meals goes last: egg whites were added to a breakfast
    // on days with an egg salad lunch and an egg snack, which made it three egg meals.
    const others = {}; meals.forEach(m=>{ if(m!==bk) mealProtFamilies(m).forEach(f=>{ others[f]=(others[f]||0)+1; }); });
    const ADDS = [/egg white, raw/i, /greek yogurt, plain, nonfat/i, /cottage cheese, nonfat/i, /^Skyr/i, /^Tofu/i]
      .map(re => ({re, f: allowedFoods(P).find(f=>re.test(f.name) && !isDisliked(f,P))}))   // only food the client can buy
      .sort((a,b) => ((others[protFamily(a.f)]||0) >= 2 ? 1 : 0) - ((others[protFamily(b.f)]||0) >= 2 ? 1 : 0));
    const coldBk = mealEatenCold(bk);
    for(const {re, f: add} of ADDS){
      if(bkProt() >= 25) break;
      if(coldBk && re.source.indexOf("egg white") >= 0) continue;
      if(!add || bk.items.some(it=>it.id===add.id)) continue;
      bk.items.push({id:add.id, grams:30, fixed:true});
      const it = bk.items[bk.items.length-1];
      for(let i=0;i<24 && bkProt()<25; i++) it.grams = Math.min(maxServeG(add), it.grams+15);
    }
    if(bkProt() < 25){   // still short: grow whatever protein breakfast already has, up to its cap
      const any = bk.items.filter(it=>{const f=FOOD_BY_ID[it.id]; return f && (f.protein_g||0)>=8;})
                          .sort((a,b)=>(FOOD_BY_ID[b.id].protein_g||0)-(FOOD_BY_ID[a.id].protein_g||0))[0];
      if(any){ any.fixed=true; for(let i=0;i<24 && bkProt()<25; i++) any.grams = Math.min(maxServeG(FOOD_BY_ID[any.id]), any.grams+10); }
    }
  };
  topUp();
  refineMeals(meals, P);
  // the polish can trim breakfast's unpinned foods and undo part of the top-up (a bean breakfast bowl lost a fifth of
  // its beans and landed at 22.8 g, 2026-10-06), so top up once more; every caller runs a calorie or macro fit next. Not
  // on a day already 10% over its protein: on a 1400/75 day every protein sat at its smallest portion and the extra egg
  // white took the day to 119%.
  if(bkProt() < 24.5 && mealsTotals(meals, false).protein_g < 1.10*(+P.tPro || Infinity)) topUp();
}
// protein backstop: when whole foods can't reach the target (classic high-protein vegan, or after a treat
// eats the budget), add a protein-powder scoop. Two fixes Dylan caught: (1) use WHEY for dairy-eating
// clients, a VEGAN pea+rice blend only when whey is excluded; (2) powder belongs in a SHAKE / sweet-oats /
// yogurt meal — never stirred into savory food (miso oats, egg scramble). If the day has no sweet home for
// it, attach it as a clearly-labeled SIDE SHAKE (m.shakeNote) so the directions actually tell you what to do.
// CALORIE backstop — Dylan: "calories should be within 100 at all times." The macro solver minimizes macro
// ERROR but never enforces the calorie TOTAL: real food runs ~4% under the 4-4-9 estimate, capped macros (e.g.
// a high-carb plan hitting the grain ceiling) leave calories short, and per-day variance drifts ±100-300. After
// the macro work, nudge the flexible levers — carb-dense first (least protein/fat disruption) — up or down to
// bring ACTUAL calories within ~80 of target. Re-checks after every move so it stops on target, never overshoots.
function fitCalories(meals, P){
  const tgt = +P.tCal || 0; if(!tgt || !meals || !meals.length) return;
  // GROW only CARB foods (grains/starches/legumes/fruit) — never proteins/fats, or filling calories would
  // overshoot protein/fat. (The 290g-beans-in-a-breakfast-taco bug was a separate cause — beans being the
  // egg dish's PROTEIN lever — fixed by the egg-dish anchor; a bean is fine to grow in a real bean dish.)
  const growCat = f => f && (f.cat==="Grains & Starches" || f.cat==="Legumes" || f.cat==="Fruits");
  let addedFillers = 0, lastGap = null, cutProteinNow = false;
  for(let pass=0; pass<16; pass++){
    const gap0 = tgt - mealsTotals(meals,false).kcal;
    if(Math.abs(gap0) <= 80) return;
    // a pass that only nudged 5g of oil is a stall, not progress: every real lever is capped or macro-blocked
    const stalled = lastGap!==null && Math.abs(lastGap - gap0) < 15;
    lastGap = gap0;
    const growing = gap0 > 0;
    const levers = [];
    // The 25g breakfast floor is a HARD rule, but the fit was allowed to shrink any protein once the DAY ran
    // over 105% of its protein target, and it happily shaved the very yogurt holding breakfast up (23g against
    // a 25g floor). Track which items belong to breakfast so the shrink can stop at the floor.
    const bkMeal = meals.find(m=>/breakfast/i.test(m.name||""));
    const bkItems = new Set(bkMeal ? bkMeal.items : []);
    const bkProtein = () => bkMeal ? bkMeal.items.reduce((s,x)=>{ const ff=FOOD_BY_ID[x.id];
      return s + (ff ? (ff.protein_g||0)*x.grams/100 : 0); }, 0) : Infinity;
    meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id];
      if(!f || f.recipe || f.cat==="Vegetables" || (f.kcal||0)<=10 || it.fixed) return;
      levers.push(it); }));   // any non-veg lever is adjustable; carbs are just PREFERRED first (sort below)
    if(!levers.length) return;
    // Meal SHAPE: the fit was free to take every calorie out of one meal and put it in another, which is how a
    // day ends up with a 900-calorie lunch next to a 350-calorie snack while the totals stay perfect. Each meal
    // has a slot share it was built to; prefer levers in the meals that have drifted furthest the WRONG way.
    const shareTgt = new Map();
    {
      const ws = meals.map(m=>slotWeight(m.name||"")), sum = ws.reduce((x,y)=>x+y,0) || 1;
      meals.forEach((m,i)=>shareTgt.set(m, tgt*ws[i]/sum));
    }
    const mealOf = new Map();
    meals.forEach(m=>(m.items||[]).forEach(it=>mealOf.set(it, m)));
    const drift = it => { const m=mealOf.get(it); if(!m) return 0;
      return mealsTotals([m],false).kcal - (shareTgt.get(m)||0); };   // >0 this meal is already too big
    levers.sort((a,b)=>{ const fa=FOOD_BY_ID[a.id], fb=FOOD_BY_ID[b.id];
      // growing: fill the meals that are under their share first. shrinking: take from the bloated ones first.
      const da=drift(a), db=drift(b);
      return (growing ? (da-db) : (db-da))
          || (growCat(fb)?1:0)-(growCat(fa)?1:0) || (fb.kcal||0)-(fa.kcal||0); });
    let moved=false;
    for(const it of levers){
      const t = mealsTotals(meals,false);
      const gap = tgt - t.kcal;
      if(Math.abs(gap) <= 80) return;
      const f=FOOD_BY_ID[it.id], cap=itemCap(it, f), fl=leverFloor(it), ed=(f.kcal||0)/100;
      if(ed<=0) continue;
      if(gap>0 && it.grams<cap){
        // GROWING: never fill calories by blowing a macro ceiling. Checking "is protein already over?" BEFORE
        // the move is not enough — one step can add 135g of seitan (+101g protein) in a single jump, which is
        // how a 145g-protein target became 263g. Clamp the STEP itself by the remaining macro headroom.
        // Only clamp on a macro this food is a MEANINGFUL source of — otherwise a trace (quinoa has 1.9g
        // fat/100g) zeroes the step whenever that macro is a hair over, blocking every lever and starving
        // the day of calories.
        const headroom = (tgtMac, cur, per100, minPer100) => (!tgtMac || !per100 || per100 < minPer100) ? Infinity
          : Math.max(0, (tgtMac - cur) / (per100/100));
        // (Tried clamping the step by the food's DAY total here so one grain could not reach 500g across two
        // meals. It did not stop it, because balanceMealSizes grows carbs afterwards too, and it cost a
        // breakfast-floor miss. 500g of quinoa over two meals is two large servings, not the 650g-of-potato
        // class of problem capDayRepeats exists for. Left alone.)
        const stepCap = Math.min(
          cap - it.grams,
          headroom(1.10*(+P.tPro||0), t.protein_g, f.protein_g, 10),
          headroom(1.15*(+P.tFat||0), t.fat_g,     f.fat_g,      8),
          headroom(1.28*(+P.tCarb||0), t.carb_g,   f.carb_g,    15)   // carbs flex most: better a carb-heavy day than an absurd protein
        );
        if(stepCap < 5) continue;                       // no headroom in this food — try the next lever
        const grown = quantizeG(it, f, it.grams + Math.min(stepCap, Math.max(5, Math.round(gap/ed))));
        if(grown === it.grams) continue;                // a piece food that rounded back to its own size
        it.grams = grown; moved=true;
      }
      else if(gap<0 && it.grams>fl){
        // SHRINKING: protein is what the client is paying for; it only gives way when it is itself over target
        // or nothing else is left (see the extras pass below). A calorie overshoot used to shrink cottage cheese
        // to 30g and leave a 13g-protein breakfast while 50g of fixed granola sat untouched.
        const isProt = role(f)==="protein" && !isProteinPowder(f);
        if(isProt && !(t.protein_g > 1.05*(+P.tPro||0)) && !cutProteinNow) continue;
        let cut = Math.min(it.grams-fl, Math.max(5, Math.round(-gap/ed)));
        // never take breakfast under its protein floor, whatever the day's protein is doing
        if(bkItems.has(it) && (f.protein_g||0) > 0){
          const spare = (bkProtein() - 25) / ((f.protein_g||0)/100);
          if(spare <= 0) continue;
          cut = Math.min(cut, Math.floor(spare));
          if(cut < 5) continue;
        }
        const shrunk = quantizeG(it, f, it.grams - cut, fl);
        if(shrunk === it.grams) continue;
        it.grams = shrunk; moved=true; }
    }
    if(!moved && gap0 < -80){
      // OVER target with every free carb/fat lever at its floor: the recipe's fixed extras give way next (down to
      // half their size, biggest calorie contributors first). Only if that is not enough does protein shrink.
      const extras = [];
      meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id];
        if(f && it.fixed && !f.recipe && !it.manual && f.cat!=="Vegetables" && (f.kcal||0)>10) extras.push(it); }));
      extras.sort((a,b)=>(FOOD_BY_ID[b.id].kcal*b.grams)-(FOOD_BY_ID[a.id].kcal*a.grams));
      let cut=false;
      for(const it of extras){
        const gap = tgt - mealsTotals(meals,false).kcal; if(gap >= -80) break;
        const f=FOOD_BY_ID[it.id], ed=(f.kcal||0)/100; if(ed<=0) continue;
        if(it._orig===undefined) it._orig=it.grams;
        const floorG=Math.max(5, Math.round(it._orig*0.5));
        let next=Math.max(floorG, it.grams - Math.max(5, Math.round(-gap/ed)));
        // the breakfast protein floor holds here too: this loop halved a breakfast's pinned tofu (166g to 84g,
        // 25.6g of protein down to 17g) because only the free-lever loop above checked it
        if(bkItems.has(it) && (f.protein_g||0) > 0){
          const spare = (bkProtein() - 25) / ((f.protein_g||0)/100);
          if(spare <= 0) continue;
          next = Math.max(next, Math.ceil(it.grams - spare));
        }
        if(next<it.grams){ it.grams=next; cut=true; }
      }
      if(cut) continue;
      if(!cutProteinNow){ cutProteinNow = true; continue; }   // last resort: let protein levers shrink on the next pass
      return;
    }
    if(!moved || (stalled && gap0 > 100)){
      // Every lever is capped or macro-blocked but the day is still short. What a coach actually does here is
      // ADD another starch serving, not double a portion past realism. Add one allowed low-protein starch to
      // the lightest meal (max 2 per day) and keep going.
      if(gap0 <= 100 || addedFillers >= 6) return;
      const base = f => (f.cat==="Grains & Starches" || f.cat==="Fruits") && (f.carb_g||0) >= 15 &&
                        (f.protein_g||0) <= 12 && !f.recipe && !isDisliked(f,P);
      // Prefer a food the day does not already have. But on a restricted pool (an ovo or prep client has far
      // fewer templates and foods to draw on) "something new" can simply not exist, and then the day just
      // misses its calories. Dosing the bran cereals by fibre took away a big calorie carrier and turned 4
      // such days into misses, all of them UNDER target on ovo/prep. A second serving of a rice the client is
      // already eating, in a different meal, is a normal plate and better than a plan 145 calories short.
      let pool = allowedFoods(P).filter(f => base(f) && !meals.some(m=>m.items.some(it=>it.id===f.id)));
      if(!pool.length) pool = allowedFoods(P).filter(base);
      if(!pool.length) return;
      // A filler is a SIDE. Vessels (tortillas, bread, bagels) are not sides, and satiety score alone kept
      // picking the high-fibre Carb Balance tortilla and bran cereal, which then landed in a sandwich that
      // already had bread: three starches on one plate.
      const VESSEL_F=/tortilla|\bbread\b|bagel|english muffin|pita|\bbun\b|naan|cereal/i;
      // a big gap needs a dense side (rice, oats, potato); a small one is better filled by something filling
      // Choose WHERE it goes first: a meal that has no starch yet, falling back to the lightest.
      const dense = gap0 > 250;
      const hasStarch = m => (m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id];
        return f && (f.cat==="Grains & Starches"||/potato/i.test(f.name)) && (f.kcal||0)*it.grams/100 > 100; });
      const byLight = meals.slice().sort((a,b)=> mealsTotals([a],false).kcal - mealsTotals([b],false).kcal);
      // The side has to BELONG with the meal. By slot alone this put a carb-balance tortilla beside apple and
      // peanut butter, granola on shrimp cocktail cups, a potato in a yogurt parfait and a pear on a frittata.
      const sideFits = carbSideFits;
      let host = null, fitPool = [];
      for(const m of byLight.filter(m=>!hasStarch(m)).concat(byLight.filter(m=>hasStarch(m)))){
        if(!roomFor(m)) continue;
        const fp = pool.filter(f=>sideFits(m, f) && !(hasStarch(m) && VESSEL_F.test(f.name)));
        if(fp.length){ host = m; fitPool = fp; break; }
      }
      // Nothing fits anywhere: calories still come first, so fall back to the lightest meal as before.
      if(!host){ host = byLight.find(m=>!hasStarch(m) && roomFor(m)) || byLight.find(roomFor); fitPool = pool; }
      if(!host) return;
      // the last resort still keeps fruit off a savoury main: apple and blueberries landed beside honey-garlic
      // chicken and rice (2026-09-30) when no side "fit" anywhere
      if(fitPool === pool){ const nf = pool.filter(f=>f.cat!=="Fruits" || carbSideFits(host, f)); if(nf.length) fitPool = nf; }
      // THEN pick what: a tortilla or a slice of bread is fine in a meal with no starch, and absurd in a
      // sandwich that already has bread. So only shun vessels when the host is already carrying a starch.
      const shunVessels = hasStarch(host);
      // Building muscle always wants the side that is easiest to eat: least fibre per calorie, then the densest.
      const gainSide = P.goal==="gain";
      fitPool.sort((a,b)=> (shunVessels ? (VESSEL_F.test(a.name)?1:0)-(VESSEL_F.test(b.name)?1:0) : 0)
                     || (gainSide ? (fibrePerKcal(a)-fibrePerKcal(b)) || ((b.kcal||0)-(a.kcal||0))
                                  : dense ? (b.kcal||0)-(a.kcal||0) : satietyScore(b)-satietyScore(a)));
      const add = fitPool[0];
      const want = Math.round(Math.min(maxServeG(add), Math.max(40, gap0/((add.kcal||100)/100)))/5)*5;
      host.items.push({ id:add.id, grams:want });
      addedFillers++;
    }
  }
}
// Protein RECOVERY trade. boostProtein can stall when the day is already at its calorie ceiling (classic in
// meal-prep mode, where the small repeatable menu set is carb-heavy: the audit found days at 60-79% of the
// protein target). Fix it by TRADING, not adding: grow the meal's real protein food while shrinking that
// meal's biggest carb, so calories stay roughly flat and protein climbs. Respects caps and floors.
function fixProteinShortfall(meals, P){
  const tgt = +P.tPro||0; if(!tgt || !meals) return;
  const protOf = () => mealsTotals(meals,false).protein_g;
  let addedProt = 0;
  for(let pass=0; pass<14 && protOf() < 0.95*tgt; pass++){
    let moved = false;
    for(const m of meals){
      if(protOf() >= 0.95*tgt) break;
      const items = (m.items||[]).filter(it=>{const f=FOOD_BY_ID[it.id]; return f && !f.recipe && !it.fixed;});
      // pick a REAL protein food, ranked by protein-per-CALORIE. Ranking by protein-per-100g grabbed oats
      // (13g/100g but 379 kcal) over nonfat Greek yogurt (10g/100g, 59 kcal), so the "trade" grew carbs.
      let pIt = items.filter(it=>{const f=FOOD_BY_ID[it.id];
                        return !isProteinPowder(f) && (role(f)==="protein" || (f.protein_g||0)>=18); })
                     .sort((a,b)=>{const fa=FOOD_BY_ID[a.id], fb=FOOD_BY_ID[b.id];
                        return (fb.protein_g/Math.max(fb.kcal,1))-(fa.protein_g/Math.max(fa.kcal,1)); })[0];
      if(!pIt && addedProt < 2 && roomFor(m)){
        // no real protein food in this meal (common in prep mode's carb-heavy repeat menus) — add the leanest
        // allowed whole-food protein so the trade has something to grow.
        const cand = allowedFoods(P).filter(f=>!f.recipe && !isProteinPowder(f) && (f.protein_g||0)>=18 &&
                       role(f)==="protein" && !isDisliked(f,P) && !m.items.some(x=>x.id===f.id))
                     .sort((a,b)=>(b.protein_g/Math.max(b.kcal,1))-(a.protein_g/Math.max(a.kcal,1)))[0];
        if(cand){ m.items.push({id:cand.id, grams:60}); addedProt++;
                  pIt = m.items[m.items.length-1]; }
      }
      if(!pIt) continue;
      const pf = FOOD_BY_ID[pIt.id], pCap = maxServeG(pf);
      if(pIt.grams >= pCap) continue;
      const step = Math.min(25, pCap - pIt.grams);
      if(step < 5) continue;
      pIt.grams += step; moved = true;
      // pay for it by shrinking this meal's biggest carb (keeps calories ~flat)
      const addedCal = (pf.kcal||0)*step/100;
      const cIt = items.filter(it=>{const f=FOOD_BY_ID[it.id]; return (f.carb_g||0)>=15;})
                       .sort((a,b)=>b.grams-a.grams)[0];
      if(cIt){ const cf=FOOD_BY_ID[cIt.id], fl=leverFloor(cIt), ed=(cf.kcal||0)/100;
        if(ed>0) cIt.grams = Math.max(fl, cIt.grams - Math.round(addedCal/ed)); }
    }
    if(!moved) return;
  }
}
function boostProtein(meals, P){
  const tgtP = +P.tPro||0; if(!tgtP) return;
  if(mealsTotals(meals, false).protein_g >= 0.97*tgtP) return;
  // pick the protein powder: whey for dairy-eaters; otherwise (vegan) the leanest, most protein-DENSE isolate
  // available — soy protein isolate (88g protein/100g) now wins over the pea+rice blend (63g), which is what
  // lets a vegan reach an extreme protein target the powder backstop previously couldn't close.
  // from the client's own pool, so a specialty isolate is never the default (vegans get the everyday plant blend)
  const allPowder = allowedFoods(P).filter(f => isProteinPowder(f));
  const pw = allPowder.find(f=>/whey/i.test(f.name)) || allPowder.sort((a,b)=>(b.protein_g||0)-(a.protein_g||0))[0];
  if(!pw) return;
  // a whey scoop's natural home is a SHAKE / smoothie / parfait / yogurt / pudding — NOT an oats bowl
  // (Dylan: don't end up with more powder than oats). Oats meals carry their protein from the whole-food
  // base (Greek yogurt / cottage cheese); if the day still needs protein, it goes to a labeled side shake.
  const sweetRe  = /smoothie|shake|parfait|\byogurt\b|pudding|protein fluff/i;
  const savoryRe = /savory|miso|scallion|scramble|frittata|omelet|burrito|hash|taco|stir.?fry|\begg\b|veggie|skillet|curry|chili|soup|stew/i;
  const calCeil = (+P.tCal||0) ? 1.04*(+P.tCal) : Infinity;
  for(let i=0;i<6;i++){
    const tot = mealsTotals(meals, false);
    if(tot.protein_g >= 0.97*tgtP || tot.kcal >= calCeil) return;
    const nonRec = mm => !mm.items.some(it=>{const f=FOOD_BY_ID[it.id]; return f&&f.recipe;});
    // a meal can still take powder only if its powder isn't already at the cap — otherwise the loop spins on
    // one maxed meal and the top-up stalls (this is how protein got stuck at ~one scoop short of target).
    const canTake = mm => { const h=mm.items.find(it=>it.id===pw.id); return !h || h.grams < maxServeG(pw); };
    // Powder goes where powder already is before it starts a new meal: spread one scoop at a time it ended up in a
    // shake at breakfast, a side shake at lunch and another at dinner (powder at every main meal on 15 of 480 test
    // days). A new meal gets powder only while fewer than two meals carry it, or when the day is still well short.
    const withPowder = meals.filter(mm=>mm.items.some(it=>isProteinPowder(FOOD_BY_ID[it.id]))).length;
    const newOK = withPowder < 2 || tot.protein_g < 0.90*tgtP;
    // 1) a meal that already has this powder and can take more
    let m = meals.find(mm=>mm.items.some(it=>it.id===pw.id) && canTake(mm));
    // 2) else a real shake/sweet-oats/yogurt meal, the natural home (its own directions already cover a scoop)
    if(!m && newOK) m = meals.find(mm=>{const d=mm.name+" "+(mm.dish||""); return sweetRe.test(d) && !savoryRe.test(d) && nonRec(mm) && canTake(mm);});
    // 3) else the lightest meal that can, as a SIDE SHAKE
    let asShake = false;
    if(!m){ if(!newOK) return; m = meals.find(mm=>nonRec(mm) && canTake(mm) && roomFor(mm)) || meals.find(mm=>canTake(mm) && roomFor(mm)) || meals.find(canTake) || meals[0]; asShake = true; }
    if(!m) return;
    const have = m.items.find(it=>it.id===pw.id);
    // RESPECT the powder cap (maxServeG = 45g ~ 1.3 scoops). Dylan: never end up with more protein powder
    // than oats. This is a last-resort top-up, not the meal's protein base.
    if(have) have.grams = Math.min(maxServeG(pw), have.grams + 14);
    else m.items.push({id:pw.id, grams:34, fixed:true});    // ~1 scoop (Ekkovision 34g)
    if(asShake){
      const g = (m.items.find(it=>it.id===pw.id)||{}).grams || 34;
      const scoops = Math.max(1, Math.round(g/34));
      m.shakeNote = `Have a protein shake alongside this meal: blend ${scoops} scoop${scoops>1?'s':''} of ${pw.name.toLowerCase()} with water or your milk of choice (or shake in a bottle). It is counted in the macros above.`;
    }
    refineMeals(meals, P);
  }
}
// The seven days of a MEAL-PREP week. 3-DAY and 4-DAY BATCHES (and twice-a-week) run on a cook schedule: one
// menu per cook, eaten on the days that cook covers. Each menu is built knowing how many days its batch has to
// last, so a 4-day batch gets dishes that keep or freeze, and a fresh-cook day gets the whole library with no
// batch recipe. Without a schedule (one Sunday cook) K menus rotate across the week. Every day is a deep copy,
// so editing one day never edits another. Shared with the test harness so the tests run this exact code.
function buildPrepWeek(P, seedBase){
  const S = prepSchedule(P);
  const carry = { prot:new Set(), carb:new Set(), fat:new Set(), prod:new Set(), tpl:new Set(), fam:[] };
  const copy = m => JSON.parse(JSON.stringify(m));
  if(S){
    const menus = S.cooks.map((c,k)=>{
      const Pk = Object.assign({}, P, { prepBatchDays:c.days.length, prepFresh:!!c.fresh });
      const m = buildOneDay(Pk, seedBase + k*101, false, carry) || [];
      if(c.fresh) m.forEach(x=>{ x.fresh = true; if(x.cook){ delete x.cook.prepMethod; delete x.cook.makes; } });
      return m;
    });
    // a day no cook covers is not in the plan (the one 3-day batch); every other schedule covers all seven
    const out = WEEK_DAYS.map((_, di) => { const k = S.cooks.findIndex(c=>c.days.indexOf(di)>=0); return k<0 ? [] : copy(menus[k]); });
    out.batchKeys = WEEK_DAYS.map((_, di) => { const k = S.cooks.findIndex(c=>c.days.indexOf(di)>=0); return k<0 ? undefined : (S.cooks[k]||{}).fresh ? "fresh"+di : "cook"+k; });
    return out;
  }
  const K = Math.max(2, Math.min(4, P.prepVariety||3));
  const menus = [];
  for(let k=0;k<K;k++) menus.push(buildOneDay(P, seedBase + k*101, false, carry) || []);
  const out = WEEK_DAYS.map((_, di) => copy(menus[di % K]));
  out.batchKeys = WEEK_DAYS.map((_, di) => "menu" + (di % K));
  return out;
}
// The days that eat the same batch as day `di` (itself included). A batch is cooked once, so an edit to one of its
// days (re-roll, re-draft, portion change, undo) is an edit to all of them; otherwise Monday stops matching the
// containers cooked on Sunday.
function prepBatchDaysOf(di){
  const k = (state.week[di]||{}).prepBatch;
  if(!k || !(state.profile && state.profile.prep)) return [di];
  return state.week.map((d,i)=>d.prepBatch===k ? i : -1).filter(i=>i>=0);
}
function syncPrepBatch(){
  const di = state.dayIdx, sibs = prepBatchDaysOf(di);
  if(sibs.length < 2) return;
  const src = JSON.stringify(state.meals);
  sibs.forEach(i=>{ if(i!==di) state.week[i].meals = JSON.parse(src); });
}
function generatePlan(ok){
  const P = readForm(); state.profile = P;
  if (!buildPools(P, 1)){ uiAlert("Too many exclusions, not enough foods left to build a plan. Loosen the allergies / diet."); return; }
  if (weekHasMeals() && ok!==true){ uiConfirm("Replace the whole week with a fresh auto-draft? (Use the 🎲 on a meal or ‘re-draft day’ to keep the rest.)", ()=>generatePlan(true), null, "Replace week"); return; }
  if(P.prep){
    // MEAL-PREP mode: build a SMALL set of distinct daily menus (K) and ROTATE them across the 7 days, so
    // the client batch-cooks K menus on Sunday and eats each 2-3x. Banking is ignored (same meals each day).
    // TWICE-A-WEEK cooking (Sunday + Wednesday): cooked food keeps ~3-4 days, so one Sunday cook for the whole
    // week pushes Saturday's meals past safe fridge life. Two menus run in chunks instead of alternating daily:
    // Sunday's batch covers Sun-Tue, Wednesday's covers Wed-Sat (Saturday's containers go in the freezer).
    const weekMeals = buildPrepWeek(P, seedCounter += 37);
    state.week.forEach((d, di) => { d.meals = weekMeals[di]; d.prepBatch = weekMeals.batchKeys[di]; });
  } else {
    // build a full, VARIED week, each day a different seed so the client isn't eating the same thing daily
    // (with calorie banking on, each day is built to its own weekday/weekend-adjusted target)
    state.week.forEach((d, di) => {
      delete d.prepBatch;
      const Pd = P.banking ? Object.assign({}, P, dayTargets(P, di)) : P;
      // buildMealItems/PRODUCE_GRAMS read state.profile for the tight-carb/glp1/volume verdict, so point it at
      // THIS banked day during construction (else food selection uses the banked target but sizing uses the base).
      const saved = state.profile; state.profile = Pd;
      d.meals = buildOneDay(Pd, (seedCounter+=37) + di*101) || [];
      state.profile = saved;
    });
  }
  state.dayIdx = 0; state.meals = state.week[0].meals;
  autoEnableEssentialSupps();   // count the diet-essential supplements the tool prescribes (B12/D/omega/...) in the score
  undoBuf = null; updateUndoBtn(); markDirty();
  render();
}
// Dylan's call: COUNT the supplements the tool prescribes for genuine gaps toward the score — a vegan plan
// is DELIVERED with its essential supplements (B12, vitamin D, algae omega-3, etc.), so the score should
// reflect the full protocol (food + required supplements), not food alone. Auto-enable the gap-flagged
// MICRO supplements (severity >= 1) only; never protein (that comes from food) or creatine (optional/no micros).
const AUTO_SUPP_KEYS = new Set(["fishoil","vitd","b12","calcium","iron","magnesium","multi"]);
function autoEnableEssentialSupps(){
  const P = state.profile; if(!P || !state.meals.length) return;
  P.supplements = P.supplements || {};
  AUTO_SUPP_KEYS.forEach(k=>{ delete P.supplements[k]; });          // re-prescribe fresh from the current plan's gaps
  detectGaps().forEach(g=>{ if(g.sev>=1 && AUTO_SUPP_KEYS.has(g.key)) P.supplements[g.key]=true; });
  if(typeof renderSupplementChips==="function" && $("suppChips")) renderSupplementChips();   // light up the prescribed chips in the form
}

// Re-roll a single meal: new foods for THAT meal only, then re-fit the day.
// On a treat/snack meal it cycles to the next recipe instead.
function rerollMeal(mi){
  const P = readForm(); state.profile = P;
  const m = state.meals[mi]; if(!m) return;
  snapshotMeals();
  const recIt = m.items.find(it=>{const f=FOOD_BY_ID[it.id]; return f && f.recipe;});
  if (recIt){
    const f=FOOD_BY_ID[recIt.id], recs=recipesByKind(f.kind);
    if (recs.length>1){
      const cur=recs.findIndex(r=>r.id===f.id);
      const nxt=recs[(cur+1)%recs.length];
      recIt.id=nxt.id; recIt.grams=nxt.serving_g||150;
    }
    fitDayToTargets(); syncPrepBatch(); render(); return;
  }
  m._roll = (m._roll||0)+1;
  const n = Math.max(state.meals.length,1);
  const cur = curTargets();                                   // honor calorie banking for the current day
  const per = { P:+cur.tPro/n, C:+cur.tCarb/n, F:+cur.tFat/n };
  const slotType = tplSlot(m.name);
  const pool = draftFoods(P);
  const seed = (seedCounter+=29) + m._roll*17;
  // try a FRESH coherent template for this slot (different from the current dish)
  const rerollSlot = t => t.slot===slotType
    || (P.simple && t.simple && ((slotType==="lunch"&&t.slot==="dinner")||(slotType==="dinner"&&t.slot==="lunch")));
  let cands = TEMPLATES.filter(t=>rerollSlot(t) && t.title!==m.dish && t.diets && t.diets.indexOf(P.diet)>=0 && titleHonest(t,P) && tplKitchenOK(t,P) && tplBuildable(t,pool,slotType));
  if(P.simple){ const s=cands.filter(t=>t.simple); if(s.length) cands=s; }   // re-roll stays within simple plates
  // meal prep: the new dish must have a batch recipe and last the batch it joins (a fresh-cook day is exempt)
  const batchN = P.prep && !m.fresh ? prepBatchDaysOf(state.dayIdx).length : 0;
  if(batchN){
    const pc = cands.filter(t=>t.prepMethod); if(pc.length) cands = pc;
    if(batchN > 1){ const ok = cands.filter(t=>{ const k=tplKeep(t,pool); return prepOverFridge(batchN, k.fridge) <= 0 || k.freeze; }); if(ok.length) cands = ok; }
  }
  cands = seededShuffleTop(cands, cands.length, seed);
  const used = { prot:new Set(), carb:new Set(), fat:new Set(), prod:new Set() };
  for(const t of cands){
    const r = buildFromTemplate(t, per, pool, P, seed, used, slotType);
    if(r && r.items && r.items.length){
      m.items = r.items; m.dish = t.title; delete m.shakeNote;
      m.cook = { method:t.method, oil:t.oil, season:t.season, note:t.note };
      if(batchN) Object.assign(m.cook, { prepMethod:t.prepMethod, makes:t.makes });
      fitDayToTargets(); syncPrepBatch(); render(); return;
    }
  }
  // fallback: old independent-pool re-roll
  const pools = buildPools(P, seed);
  if (!pools) return;
  const idx = mi + m._roll;
  const pf=pools.proteins[idx%pools.proteins.length], cf=pools.carbs[idx%pools.carbs.length], ff=pools.fats[idx%pools.fats.length];
  const veg=pools.vegs.length ? pools.vegs[idx%pools.vegs.length] : null;
  m.items = buildMealItems(pf,cf,ff,veg,per);
  m.dish = null; m.cook = null;
  fitDayToTargets(); syncPrepBatch();
  render();
}

/* -------------------- fit the whole day to targets -------------------- */
const clampG = (f, g, fl) => Math.min(maxServeG(f), Math.max(fl||5, Math.round(g/5)*5));   // food-aware ceiling + floor
// Rescales the staple (non-recipe) protein/carb/fat foods so the day still hits the macro
// targets after a treat/snack is added or after edits. Recipes (the treat) and vegetables
// are kept FIXED, so the treat stays one serving and fiber/micros are preserved.
function fitDayToTargets(){
  const P=state.profile, T=curTargets(), Pt=+T.tPro, Ct=+T.tCarb, Ft=+T.tFat, calT=+T.tCal;
  if(!state.meals.length) return;
  const groups={protein:[],carb:[],fat:[]};
  let fixP=0,fixC=0,fixF=0,fixCal=0;
  state.meals.forEach((m,mi)=>m.items.forEach((it,ii)=>{
    const f=FOOD_BY_ID[it.id]; if(!f) return; const r=it.grams/100;
    const rl = (it.fixed || f.recipe) ? "fixed" : role(f);
    if(rl==="protein"||rl==="carb"||rl==="fat") groups[rl].push({mi,ii});
    else { fixP+=f.protein_g*r; fixC+=f.carb_g*r; fixF+=f.fat_g*r; fixCal+=f.kcal*r; }   // recipes/veg/fruit/condiments fixed
  }));
  const tot=arr=>arr.reduce((a,{mi,ii})=>{const f=FOOD_BY_ID[state.meals[mi].items[ii].id],r=state.meals[mi].items[ii].grams/100;
    a.P+=f.protein_g*r;a.C+=f.carb_g*r;a.F+=f.fat_g*r;a.cal+=f.kcal*r;return a;},{P:0,C:0,F:0,cal:0});
  const gP=tot(groups.protein), gC=tot(groups.carb), gF=tot(groups.fat);
  const A=[[gP.P,gC.P,gF.P],[gP.C,gC.C,gF.C],[gP.F,gC.F,gF.F]];
  const x=solve3(A,[Pt-fixP, Ct-fixC, Ft-fixF]);
  const ok = x && x.every(v=>isFinite(v)&&v>=0.15&&v<=6) && groups.protein.length && groups.carb.length && groups.fat.length;
  if(ok){
    const sc={protein:x[0],carb:x[1],fat:x[2]};
    ["protein","carb","fat"].forEach(rl=>groups[rl].forEach(({mi,ii})=>{
      const _it=state.meals[mi].items[ii];
      _it.grams = clampG(FOOD_BY_ID[_it.id], _it.grams*sc[rl], leverFloor(_it)); }));
  } else {            // fallback: one calorie-proportional scale across all staple p/c/f foods
    const all=[...groups.protein,...groups.carb,...groups.fat], stapleCal=gP.cal+gC.cal+gF.cal;
    let factor=stapleCal>0?(calT-fixCal)/stapleCal:1; factor=Math.max(0.15,Math.min(6,factor));
    all.forEach(({mi,ii})=>{ const _it=state.meals[mi].items[ii]; _it.grams=clampG(FOOD_BY_ID[_it.id], _it.grams*factor, leverFloor(_it)); });
  }
  // calorie reconciliation, nudge staples so REAL food calories land on the calorie target
  // (real USDA calories run a few % below the 4/4/9 macro math). Clamped so macros stay close.
  const stapleIdx=[...groups.protein,...groups.carb,...groups.fat];
  let stapleCalNow=0; stapleIdx.forEach(({mi,ii})=>{const f=FOOD_BY_ID[state.meals[mi].items[ii].id];stapleCalNow+=f.kcal*state.meals[mi].items[ii].grams/100;});
  if(stapleCalNow>0){
    let corr=(calT-fixCal)/stapleCalNow; corr=Math.max(0.9,Math.min(1.1,corr));
    stapleIdx.forEach(({mi,ii})=>{ const _it=state.meals[mi].items[ii]; _it.grams=clampG(FOOD_BY_ID[_it.id], _it.grams*corr, leverFloor(_it)); });
  }
  refineMeals(state.meals, Object.assign({}, P, T));     // final precision pass (honors banked targets)
  if(P.glp1) state.meals.forEach(m=>m.items.forEach(it=>{   // small-appetite: cap manually-added/swapped produce too
    const f=FOOD_BY_ID[it.id]; if(f && !f.recipe && (f.cat==="Vegetables"||f.cat==="Fruits")){ const g=PRODUCE_GRAMS(f); if(it.grams>g) it.grams=g; } }));
  // whole eggs come in WHOLE units (1 egg = 50g) — never "3.6 eggs". Round to the nearest egg, min 1.
  state.meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f && /^Egg, whole/i.test(f.name)){ it.grams=Math.max(50, Math.round(it.grams/50)*50); } }));
  // Dylan rule: calories within 100 ALWAYS — including after manual edits/treats/re-rolls. The ±10% clamp
  // above can leave a bigger gap (e.g. a dense treat added to a small day); fitCalories closes it.
  sanitizeMeals(state.meals, P);
  fitCalories(state.meals, Object.assign({}, P, T));
  sanitizeMeals(state.meals, P);
  // ...and then land the total, exactly as the auto-draft does. Without this the tool was exact only until
  // the coach touched it: measured over 200 manual edits, a re-roll or a portion change left the day a mean
  // of 28.7 calories out with only 19% of days inside 5, which is the same miss the auto-draft had before
  // this pass existed. The cause is identical too, the whole-unit snap in the sanitize call directly above.
  // This is the path a coach actually uses, so it has to hold to the same standard.
  settleCaloriesExact(state.meals, Object.assign({}, P, T));
  // A coach-added treat on a small day can leave nothing to shrink: every portion already at its realistic
  // minimum (a 249-cal nice cream on a 1450-cal, 5-meal day landed 121 over). A coach would cut the snacks
  // back, so do that: scale whole snack meals down (never below half, never the treat), then settle again.
  if(shrinkSnacksToFit(state.meals, Object.assign({}, P, T))) settleCaloriesExact(state.meals, Object.assign({}, P, T));
}

/* -------------------- precision refinement (move macros toward target) -------------------- */
// Greedy 1g hill-climb on the staple (non-recipe, non-veg) foods to minimize protein/carb/fat
// error. Recipes (treats) and vegetables stay fixed, so fiber/micros and the treat are preserved.
function macroErrOf(meals, P){
  let pr=0,cb=0,ft=0;
  meals.forEach(m=>m.items.forEach(it=>{const f=FOOD_BY_ID[it.id]; if(!f) return; const r=it.grams/100;
    pr+=f.protein_g*r; cb+=f.carb_g*r; ft+=f.fat_g*r;}));
  const e=(x,t)=> t>0 ? Math.abs(x-t)/t : 0;
  return e(pr,+P.tPro) + e(cb,+P.tCarb) + e(ft,+P.tFat);   // sum of the 3 relative errors
}
// realistic minimum for a staple so the refiner can't shave a food to an absurd sliver
// (e.g. 5g of rice). Only bites when the solve is straining (e.g. high-protein vegan);
// in the easy case the solver wants far more than the floor, so accuracy is unaffected.
// Every path that writes grams (solver, backstops, extras, re-rolls, manual edits) used to police itself, and
// every new path forgot something: 296g of dry oats, 282g of avocado, 73g of mayo, 42g of honey, 30g of beef in
// a beef dish. This is now the single place a meal is made sane before anyone sees it. It runs after every
// build and every re-fit. Coach-typed grams (it.manual) are respected on the ceiling side only.
const WHOLE_UNITS = [
  [/^Egg, whole/i, 50], [/tortilla/i, null], [/\bbread\b|sourdough/i, null], [/^Pita bread/i, null], [/english muffin/i, null], [/^Bagel/i, null],
];
function unitGrams(f){
  for(const [re, g] of WHOLE_UNITS){ if(!re.test(f.name)) continue; if(g) return g;
    const per=(f.portions||[]).find(p=>/tortilla|slice|muffin|pita|bagel|piece/i.test(p.label)); if(per) return per.grams/(parseFloat(per.label)||1); }
  return 0;
}
function sanitizeMeals(meals, P, opts){
  if(!meals) return meals;
  meals.forEach(m=>{
    if(!m || !Array.isArray(m.items)) return;
    const seen={}; const out=[];
    m.items.forEach(it=>{
      const f=FOOD_BY_ID[it.id]; if(!f) return;                              // dead id: drop, never render "undefined"
      if(!isFinite(it.grams) || it.grams<=0) it.grams=leverFloor(it);
      if(seen[it.id]){ seen[it.id].grams += it.grams; return; }               // same food twice in one meal: merge
      seen[it.id]=it; out.push(it);
    });
    m.items=out;
    m.items.forEach(it=>{
      const f=FOOD_BY_ID[it.id];
      if(f.recipe) return;                                                    // recipes are one serving by design
      const cap = itemCap(it, f);
      if(it.grams>cap) it.grams=cap;
      if(!it.fixed && !it.manual && f.cat!=="Vegetables" && it.grams<leverFloor(it)) it.grams=leverFloor(it);
      it.grams=Math.round(it.grams);
    });
    // An egg dish is an egg dish. Beans belong in migas, but once they outgrow the eggs it is a bean dish
    // with eggs in it. Pinned as a per-item ceiling rather than policed in one pass, because itemCap is what
    // every growth path reads: enforcing it anywhere else just moves which pass breaks it.
    // Two exceptions, both learned the hard way. A dish NAMED for the bean ("Black-Eyed Pea & Collard Greens
    // Breakfast") is a bean dish that happens to have eggs in it, and capping its star at the egg weight cut
    // it to 87g against its own 100g floor. And the cap never goes under the item's floor either way.
    if(/migas|scramble|omelet|omelette|frittata|huevos|benedict|quiche|\begg\b/i.test(m.dish||"")){
      const eggG = m.items.reduce((a,it)=>{ const f=FOOD_BY_ID[it.id];
        return a + (f && /^Egg/i.test(f.name) ? it.grams : 0); }, 0);
      const beans = eggG > 0 ? m.items.filter(it=>(FOOD_BY_ID[it.id]||{}).cat==="Legumes") : [];
      if(beans.length){
        // A dish NAMED for the bean ("Black-Eyed Pea & Collard Greens Breakfast") is a bean dish with eggs
        // in it, and its bean has a 100g floor. When that floor is above the egg weight, grow the EGGS to
        // meet it rather than starve the star: 87g to 100g of egg is two eggs, which is what the plate wants.
        const beanFloor = beans.reduce((a,it)=>Math.max(a, leverFloor(it)), 0);
        if(beanFloor > eggG){
          const eIt = m.items.find(it=>/^Egg/i.test((FOOD_BY_ID[it.id]||{}).name||""));
          const eF  = eIt && FOOD_BY_ID[eIt.id];
          if(eF) eIt.grams = Math.min(itemCap(eIt, eF), quantizeG(eIt, eF, beanFloor, leverFloor(eIt)));
        }
        const lim = m.items.reduce((a,it)=>{ const f=FOOD_BY_ID[it.id];
          return a + (f && /^Egg/i.test(f.name) ? it.grams : 0); }, 0);
        beans.forEach(it=>{ it.capG = Math.min(it.capG||Infinity, Math.max(lim, leverFloor(it)));
                            if(it.grams>it.capG) it.grams=it.capG; });
      }
    }
    // the stored side-shake note is only true while the powder is actually in the list
    if(m.shakeNote && !m.items.some(it=>isProteinPowder(FOOD_BY_ID[it.id]))) delete m.shakeNote;
  });
  snapWholeUnits(meals, P);
  // balancePlate GROWS the dish protein, so running it on the way out undid the macro fit that had just
  // finished: sanitize was still putting 0.3pp back on the calorie miss and 0.3pp on protein. Plate shape is
  // settled BEFORE the macros are fitted now, and the closing sanitize is clamps and snapping only.
  if(!(opts && opts.skipPlate)) balancePlate(meals, P);
  return meals;
}
// Whole eggs, tortillas and slices snap to whole pieces; big pieces (pita, bagel, arepa, muffin) snap to
// halves, or a 98g arepa would ping-pong between 1 and 2 pieces around the calorie fit.
//
// The snap used to round every item on its own with Math.round, which is the right answer for that ONE item
// and the wrong answer for the day: sanitizeMeals is the LAST thing buildOneDay runs, so half a dozen
// independent roundings landed on the day's calorie total after every fitting pass had finished with it.
// Measured over 434 days, that alone moved the calorie miss from 1.44% to 2.23% and put 14% more days
// outside the 2% band. So each piece still snaps to a whole piece, but where it can go either way it goes
// the way that leaves the DAY closer to its calorie target. Biggest pieces first, since they have the most
// say. With no calorie target to aim at, this is plain Math.round as before.
function snapWholeUnits(meals, P){
  const tgt = +(P && P.tCal) || 0;
  const units = [];
  meals.forEach(m=>(m.items||[]).forEach(it=>{
    const f=FOOD_BY_ID[it.id]; if(!f || f.recipe || it.manual) return;
    const u=unitGrams(f); if(!(u>0)) return;
    units.push({ it, f, step: u<=50 ? u : u/2, cap: itemCap(it, f) });
  }));
  if(!units.length) return;
  units.sort((a,b)=>(b.step*(b.f.kcal||0)) - (a.step*(a.f.kcal||0)));
  units.forEach(x=>{
    const maxN = Math.max(1, Math.floor(x.cap / x.step));
    if(!tgt){ x.it.grams = quantizeG(x.it, x.f, Math.min(x.cap, x.it.grams), leverFloor(x.it)); return; }
    const rest = mealsTotals(meals, false).kcal - (x.f.kcal||0)*x.it.grams/100;   // the day without this item
    const minN = Math.max(1, Math.ceil((leverFloor(x.it)-0.001)/x.step));
    const lo = Math.max(minN, Math.min(maxN, Math.floor(x.it.grams/x.step)));
    const hi = Math.max(1, Math.min(maxN, lo+1));
    let bestN = lo, bestErr = Infinity;
    [lo, hi].forEach(n=>{
      const err = Math.abs(rest + (x.f.kcal||0)*(n*x.step)/100 - tgt);
      if(err < bestErr){ bestErr = err; bestN = n; }
    });
    x.it.grams = Math.round(bestN * x.step);
  });
}
/* --------- PLATE SENSE: the macros can be perfect and the plate still wrong ----------------------------
   A high-carb target pins the grain at its cap and leaves the dish's own protein near its floor, so a
   "Sriracha Shrimp Stir-Fry" arrives as 220g of quinoa with 52g of shrimp in it. Measured across 900 built
   meals: 15% of main meals had a starch carrying 2x the calories of their protein, and in 96% of those the
   protein still had room to grow. So grow the protein rather than just shaving the grain: sanitizeMeals runs
   before the calorie fit, which then takes the calories back out of the starch where they belong.          */
// capDayRepeats pins a per-item ceiling so a food it trimmed cannot simply be grown back. Every path that
// GROWS an item has to honour it, or the cap leaks: quinoa was capped at 470g and arrived at 530g because
// balanceMealSizes grew it afterwards using maxServeG.
const DAY_FOOD_MAX = 470;   // grams of any one non-vegetable food across a whole day
const TUNA_CAN_G = 170;     // about one can drained; see servingCeiling
const BRAZIL_NUT_G = 5;     // one nut. A selenium dose; see servingCeiling for why this is a hard limit.
// ONE definition of how big a serving may get, so growth paths cannot exceed what sanitizeMeals will then
// claw back. itemCap used to read only maxServeG, while sanitize also applied the produce and isolated-fibre
// ceilings: a vegetable grown to maxServeG was cut back on the way out, which moved calories AFTER the last
// fit. Measured: sanitize was taking the day's calorie miss from 1.44% to 2.23%.
function servingCeiling(f){
  let cap = (f.cat==="Vegetables"||f.cat==="Fruits") ? Math.min(maxServeG(f), Math.floor(PRODUCE_GRAMS(f)*1.6))
                                                     : maxServeG(f);   // floor, not round: rounding up crosses the produce limit itself
  // Sugar-free syrups and psyllium are 70% isolated fibre. A 30g pour is 21g of chicory root in one sitting,
  // which no one should take on purpose. Dose them by the fibre they deliver, not by the spoon.
  const fpg = f.fiber_g||0;
  if(f.cat==="Condiments & Misc" && fpg >= 25) cap = Math.min(cap, Math.round(800/fpg));
  // The same trap one aisle over: bran cereals are 42-45% fibre by weight and they are Grains & Starches, so
  // the condiment rule never touched them. One day served 173g of Fiber One, which is six servings and 78g
  // of fibre from one bowl, against OB's own Fiber Guide range of 30-50g a DAY and its rule of adding no
  // more than 5g a week.
  //
  // The distinction matters, and the first version of this got it wrong. Things eaten BY THE BOWL run away,
  // because nothing about a bowl says where to stop; things that come in PIECES do not. Measured, 12 of the
  // 21 over-cap servings were two carb-balance tortillas, which is just a normal taco plate, and capping
  // them cost 4 calorie misses per 480 days for no gain. So a piece food gets two whole pieces, and only a
  // food with no natural unit is dosed by the fibre it delivers.
  // And a bowl is not a piece. Two tortillas is a taco plate; two bowls of bran cereal is 45g of fibre from
  // breakfast alone, because nothing about pouring says where to stop. Cereal gets one serving.
  // BRAZIL NUTS are a selenium dose, not a snack portion. USDA puts them at 1,917 ug selenium per 100g, so
  // ONE 5g nut is ~96 ug against a 55 ug requirement and an EFSA upper limit of 255 ug/day (EFSA 2023).
  // Worse, selenium varies up to 8-fold nut to nut (Lima 2019), so a single high nut can approach the limit
  // on its own and "a small handful" is a real overdose. One nut, once a day, and that is a hard ceiling.
  if(/brazil nut/i.test(f.name)) return Math.min(cap, BRAZIL_NUT_G);
  // CANNED TUNA, about one can. Measured: all 8 days that crossed the US selenium upper limit (400 ug) were
  // driven by 160-285g of canned tuna in one day (285g alone is 229 ug), and a prep plan repeats that day
  // three or four times a week. Mercury points the same way: canned tuna varies widely by brand, and safe
  // weekly intakes for adults run from under 60g to about 500g depending on the can (Aguilar-Miranda 2024,
  // Trujillo-Cruz 2026). One can per serving keeps both in check.
  if(/tuna.*canned/i.test(f.name)) cap = Math.min(cap, TUNA_CAN_G);
  else if(fpg >= 20){
    // A cereal has no real piece: these foods carry no unit_g, so unitGrams falls back to 100, which is a
    // number rather than a serving (a Fiber One serving is 30g). Treat a bowl food as unit-less and dose it
    // by the fibre it delivers; only a genuine countable piece gets the two-piece allowance.
    const u = /cereal|\bbran\b/i.test(f.name) ? 0 : unitGrams(f);
    cap = Math.min(cap, u > 0 ? u*2 : Math.round(1600/fpg));
  }
  return cap;
}
// A pinned ceiling can end up BELOW the item's own floor, because capDayRepeats pins capG from the grams an
// item had at the time and addTitleNamedSides can mark it title-named afterwards, which raises its floor.
// Black-eyed peas in a dish named for them were pinned at 87g against a 100g floor, and whichever rule ran
// last won. A cap under the item's own floor is incoherent, so the floor wins, still inside the hard ceiling.
const itemCap = (it, f) => {
  const ceil = servingCeiling(f);
  return Math.max(Math.min(ceil, (it && it.capG) || Infinity), Math.min(ceil, leverFloor(it)));
};
// Foods that come in pieces only ever exist in whole pieces, so a fitting pass that sets an egg to 78g is
// really setting it to 100g: sanitizeMeals snaps it on the way out, AFTER the fit has finished. Every pass
// that moves grams quantises here instead, which makes the snap a no-op and stops it undoing the fit.
function quantizeG(it, f, g, minG){
  const u = (!it || !it.manual) && f && !f.recipe ? unitGrams(f) : 0;
  if(!(u > 0)) return Math.round(Math.max(g, minG||0));
  const step = u <= 50 ? u : u/2;
  let n = Math.round(g/step);
  // a floor rounds UP to the next whole piece, never down past it: rounding an item to one piece when its
  // floor needed two put 2 days below their lever floor and shrank 2 title-named foods to a token.
  if(minG > 0) n = Math.max(n, Math.ceil((minG - 0.001)/step));
  return Math.round(Math.max(step, n*step));
}
const STARCHY = f => f.cat==="Grains & Starches" || f.cat==="Legumes" || /potato|sweet corn|\bcorn\b|plantain/i.test(f.name);
function dishProtein(m){
  const t = m.dish ? TEMPLATES.find(x=>x.title===m.dish) : null;
  const items = (m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})).filter(x=>x.f && !x.f.recipe);
  if(t && t.protein){
    const opts = String(t.protein).split("|");
    const hit = items.find(x=>opts.some(o=>{ try{ return new RegExp(o,"i").test(normName(x.f)); }catch(e){ return false; } }));
    if(hit) return hit;
  }
  return items.filter(x=>x.f.cat==="Protein"||x.f.cat==="Seafood"||(x.f.cat==="Eggs & Dairy"&&(x.f.protein_g||0)>=9))
              .sort((a,b)=>(b.f.kcal*b.it.grams)-(a.f.kcal*a.it.grams))[0] || null;
}
function balancePlate(meals, P){
  if(!meals || !meals.length || !P) return;
  // Only spend protein the DAY can afford. On a genuinely high-carb, low-protein target (2650 cal on 140g
  // protein and 345g carbs) a grain-forward bowl is the honest answer, and forcing the ratio there would
  // just miss the client's macros. Fix the plates the headroom pays for and leave the rest.
  const target=+P.tPro||0; if(!target) return;
  let headroom = 1.06*target - mealsTotals(meals, false).protein_g;
  if(headroom <= 2) return;
  meals.forEach(m=>{
    if(headroom <= 2) return;
    if(!/lunch|dinner/i.test(m.name||"")) return;               // breakfasts and snacks are not plates
    const items=(m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})).filter(x=>x.f);
    const pr=dishProtein(m); if(!pr || pr.it.fixed || pr.it.manual) return;
    const st=items.filter(x=>STARCHY(x.f) && !x.f.recipe && x.it!==pr.it).sort((a,b)=>(b.f.kcal*b.it.grams)-(a.f.kcal*a.it.grams))[0];
    if(!st) return;
    const kc=x=>(x.f.kcal||0)*x.it.grams/100;
    if(kc(st) <= 2.0*kc(pr)) return;
    const per=(pr.f.kcal||0)/100, pg=(pr.f.protein_g||0)/100;
    if(per<=0 || pg<=0) return;
    const byPlate  = Math.round((kc(st)/2.0)/per/5)*5;           // grams that make the plate read right
    const byBudget = pr.it.grams + Math.floor(headroom/pg/5)*5;  // grams the day's protein target can afford
    let next = Math.min(itemCap(pr.it, pr.f), byPlate, byBudget);
    // eggs come in eggs. Snap DOWN to a whole unit so the growth cannot overshoot the protein budget.
    const u=unitGrams(pr.f);
    if(u>0){ const step = u<=50 ? u : u/2; next = Math.floor(next/step)*step; }
    if(next > pr.it.grams){ headroom -= (next-pr.it.grams)*pg; pr.it.grams = next; }
  });
  meals.forEach(m=>balanceDip(m));
}
// PLATE TRADE between meals. balancePlate only spends protein the day can afford, so on a high-carb, lower-protein
// target a main could still read 335 g of rice beside 65 g of shrimp while another meal carried 78 g of protein (57 of 960
// harness mains, 2026-10-05). The day's totals were right; that plate was not. Trade, gram-for-gram on protein and on
// carbs: protein out of a meal that has plenty into the lopsided main's named protein, and that main's extra starch into
// a starch or fruit in another meal. Calories barely move (protein and carbs are both ~4 kcal/g); fitMacros lands the rest.
// How much day macro error (the sum of protein, fat and carb misses, as fractions) a better plate may cost before the
// untraded day is used instead. settleDay runs both fits and compares.
const TRADE_MACRO_COST = 0.06;
function tradePlateBalance(meals, P){
  if(!meals || meals.length < 2 || !P) return false;
  let moved = false;
  const kc = x => (x.f.kcal||0)*x.it.grams/100;
  const itemsOf = m => (m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})).filter(x=>x.f && !x.f.recipe);
  const free = x => !x.it.fixed && !x.it.manual;
  const mealP = m => itemsOf(m).reduce((a,x)=>a+(x.f.protein_g||0)*x.it.grams/100, 0);
  const plateOf = m => { if(!/lunch|dinner/i.test(m.name||"")) return null;
    const pr = dishProtein(m); if(!pr || !free(pr) || (pr.f.protein_g||0) <= 0) return null;
    const st = itemsOf(m).filter(x=>STARCHY(x.f) && x.it!==pr.it).sort((a,b)=>kc(b)-kc(a))[0];
    return st ? { pr, st } : null; };
  const lopsided = pl => pl && kc(pl.st) > 2.5*kc(pl.pr) && pl.pr.it.grams < 115;
  meals.forEach(L=>{
    const pl = plateOf(L); if(!lopsided(pl) || !free(pl.st)) return;
    const pg = pl.pr.f.protein_g/100, cg = (pl.st.f.carb_g||0)/100, stK = (pl.st.f.kcal||0)/100;
    if(pg<=0 || cg<=0 || stK<=0) return;
    for(const D of meals){ if(D===L) continue;
      // the donor protein: a real protein food above its floor, never a powder; a breakfast keeps its 27 g
      const bk = /breakfast/i.test(D.name||"");
      const src = itemsOf(D).filter(x=>free(x) && !isProteinPowder(x.f) && (x.f.protein_g||0) >= 12 && x.it.grams > leverFloor(x.it)+10)
        .sort((a,b)=>(b.f.protein_g*b.it.grams)-(a.f.protein_g*a.it.grams))[0];
      if(!src) continue;
      // the starch receiver: in the donor meal first (it loses protein, so its plate takes the starch), else elsewhere
      const recvIn = m => itemsOf(m).filter(x=>free(x) && x.f.cat!=="Vegetables" && (STARCHY(x.f) || x.f.cat==="Fruits")
        && (x.f.carb_g||0) >= 15 && (x.f.kcal||0) > 40 && x.it.grams < itemCap(x.it, x.f)-5).sort((a,b)=>kc(b)-kc(a))[0];
      const recv = recvIn(D) || meals.filter(m=>m!==L && m!==D).map(recvIn).filter(Boolean)[0];
      if(!recv) continue;
      const sp = src.f.protein_g/100, rc = (recv.f.carb_g||0)/100;
      // grow the named protein toward 115 g (and never past its cap), as far as the donor can give above its floor
      let x = Math.min(115, itemCap(pl.pr.it, pl.pr.f)) - pl.pr.it.grams;
      const giveP = (src.it.grams - leverFloor(src.it) - 5)*sp - (bk ? Math.max(0, 27 - (mealP(D) - (src.it.grams - leverFloor(src.it) - 5)*sp)) : 0);
      x = Math.min(x, Math.floor(Math.max(0, giveP)/pg));
      const u = unitGrams(pl.pr.f); if(u>0){ const step=u<=50?u:u/2; x = Math.floor(x/step)*step; }
      if(x < 10) continue;
      // shrink the starch until the plate reads right (2.2x), as far as its floor and the receiver's room allow
      const prK = (pl.pr.f.kcal||0)*(pl.pr.it.grams + x)/100;
      let sCut = Math.ceil((kc(pl.st) - 2.2*prK)/stK);
      sCut = Math.min(sCut, pl.st.it.grams - leverFloor(pl.st.it), Math.floor((itemCap(recv.it, recv.f) - recv.it.grams)*rc/cg));
      if(sCut < 10) continue;
      const before = { a:pl.pr.it.grams, b:src.it.grams, c:pl.st.it.grams, d:recv.it.grams };
      pl.pr.it.grams += x;
      src.it.grams = Math.round(src.it.grams - x*pg/sp);
      pl.st.it.grams = Math.round(pl.st.it.grams - sCut);
      recv.it.grams = Math.round(recv.it.grams + sCut*cg/rc);
      // undo if the donor's own plate is now the lopsided one, or a breakfast fell under its floor
      const dpl = plateOf(D);
      if((dpl && lopsided(dpl)) || (bk && mealP(D) < 27)){ pl.pr.it.grams=before.a; src.it.grams=before.b; pl.st.it.grams=before.c; recv.it.grams=before.d; continue; }
      pl.st.it.capG = Math.max(pl.st.it.grams, Math.floor(2.4*kc(pl.pr)/stK));   // the fit that runs next cannot regrow it
      moved = true;
      break;
    }
    // Still lopsided: on a low-protein day no meal has protein to spare (each carried ~26 g), so move only the STARCH,
    // to a starch or fruit in another meal with room, carbs gram-for-gram. Protein and fat do not move at all.
    if(!lopsided(pl)) return;
    let cut = Math.min(Math.ceil((kc(pl.st) - 2.4*kc(pl.pr))/stK), pl.st.it.grams - leverFloor(pl.st.it));
    if(cut < 10) return;
    const others = meals.filter(m=>m!==L).sort((a,b)=>(/lunch|dinner/i.test(a.name||"")?1:0) - (/lunch|dinner/i.test(b.name||"")?1:0));
    for(const D of others){ if(cut < 10) break;
      const recv = itemsOf(D).filter(x=>free(x) && x.f.cat!=="Vegetables" && (STARCHY(x.f) || x.f.cat==="Fruits")
        && (x.f.carb_g||0) >= 15 && (x.f.kcal||0) > 40 && x.it.grams < itemCap(x.it, x.f)-5).sort((a,b)=>kc(b)-kc(a))[0];
      if(!recv) continue;
      const rc = (recv.f.carb_g||0)/100; if(rc<=0) continue;
      const take = Math.min(cut, Math.floor((itemCap(recv.it, recv.f) - recv.it.grams)*rc/cg));
      if(take < 10) continue;
      const before = { c:pl.st.it.grams, d:recv.it.grams };
      pl.st.it.grams = Math.round(pl.st.it.grams - take);
      recv.it.grams = Math.round(recv.it.grams + take*cg/rc);
      const dpl = plateOf(D);
      if(dpl && lopsided(dpl)){ pl.st.it.grams=before.c; recv.it.grams=before.d; continue; }   // never make another plate lopsided
      cut -= take; moved = true;
      pl.st.it.capG = Math.max(pl.st.it.grams, Math.floor(2.4*kc(pl.pr)/stK));
    }
    // No other meal had room yet (the fruit and grain sides the calorie fit adds come later): cut the starch anyway and
    // pin it, and the fit that runs next lands those carbs on another meal. Never more than 40% of the starch in one go.
    if(cut >= 10 && lopsided(pl)){
      const c2 = Math.min(cut, Math.floor(pl.st.it.grams*0.4));
      if(c2 >= 10){ pl.st.it.grams = Math.round(pl.st.it.grams - c2); pl.st.it.capG = Math.max(pl.st.it.grams, Math.floor(2.4*kc(pl.pr)/stK)); moved = true; }
    }
  });
  return moved;
}
// A "veggie cup with dip" that arrives as 350g of yogurt next to 100g of celery is a tub of yogurt with a
// garnish. The dip is carrying the meal's protein so it cannot shrink, but raw vegetables cost almost nothing,
// so grow the thing you are dipping until the plate reads right.
const DIPPY = /hummus|yogurt|dip|dressing|tzatziki|guacamole|cottage cheese|salsa|tahini|sour cream/i;
// Meal SHAPE, and this one has to be its own pass: fitCalories returns the moment the DAY's total is right,
// so a day that is bang on 2400 never gets its meals evened out. That is how a plan ends up 450/900/370/680
// when the shares say 578/694/318/810. Moves calories BETWEEN meals with carb levers, which keeps protein and
// fat where they are, and is calorie-neutral by construction so the day total does not move.
function balanceMealSizes(meals, P){
  if(!meals || meals.length < 2 || !P) return;
  const ws = meals.map(m=>slotWeight(m.name||"")), wsum = ws.reduce((a,b)=>a+b,0) || 1;
  const total = mealsTotals(meals, false).kcal;
  const want = m => total * slotWeight(m.name||"") / wsum;
  const kcalOf = m => mealsTotals([m], false).kcal;
  const carbLever = (m, grow) => (m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]}))
    .filter(x=>x.f && !x.f.recipe && !x.it.fixed && !x.it.manual && x.f.cat!=="Vegetables"
              && (x.f.carb_g||0) >= 15 && (x.f.kcal||0) > 40
              && (grow ? x.it.grams < itemCap(x.it, x.f) : x.it.grams > leverFloor(x.it)))
    .sort((a,b)=> b.it.grams - a.it.grams)[0];
  for(let pass=0; pass<6; pass++){
    const over  = meals.slice().sort((a,b)=>(kcalOf(b)-want(b))-(kcalOf(a)-want(a)))[0];
    const under = meals.slice().sort((a,b)=>(kcalOf(a)-want(a))-(kcalOf(b)-want(b)))[0];
    if(!over || !under || over===under) return;
    const excess = kcalOf(over) - want(over), deficit = want(under) - kcalOf(under);
    if(excess < 60 || deficit < 60) return;                 // close enough to leave alone
    const src = carbLever(over, false), dst = carbLever(under, true);
    if(!src || !dst) return;
    const srcPer = (src.f.kcal||0)/100, dstPer = (dst.f.kcal||0)/100;
    if(srcPer<=0 || dstPer<=0) return;
    const move = Math.min(excess, deficit,
      (src.it.grams - leverFloor(src.it)) * srcPer,
      (itemCap(dst.it, dst.f) - dst.it.grams) * dstPer);
    if(move < 50) return;
    const srcG = Math.round(src.it.grams - move/srcPer), dstG = Math.round(dst.it.grams + move/dstPer);
    // carb levers still carry protein (oats are 13g/100g), so this pass can breach the breakfast floor or
    // push the day's protein out of range. Try the move, keep it only if both still hold.
    const bk = meals.find(m=>/breakfast/i.test(m.name||""));
    const bkProt = () => bk ? bk.items.reduce((a,x)=>{ const f=FOOD_BY_ID[x.id];
      return a + (f ? (f.protein_g||0)*x.grams/100 : 0); }, 0) : Infinity;
    const oldSrc = src.it.grams, oldDst = dst.it.grams, pBefore = mealsTotals(meals,false).protein_g;
    src.it.grams = srcG; dst.it.grams = dstG;
    const pAfter = mealsTotals(meals,false).protein_g, tP = +P.tPro||0;
    const brokeBk   = bk && bkProt() < 25 && bkProt() < pBefore;
    const brokeProt = tP && (pAfter < 0.9*tP || pAfter > 1.15*tP) && Math.abs(pAfter-tP) > Math.abs(pBefore-tP);
    if(brokeBk || brokeProt){ src.it.grams = oldSrc; dst.it.grams = oldDst; return; }
  }
}
// No single meal should carry half the day's protein. A 100g-protein lunch on a 205g target is not harmful,
// but it reads as a plan that stopped caring once the daily total was right, and it leaves the other meals
// thin. Move the excess to the leanest meal using its own protein lever. Protein-neutral across the day.
function balanceProteinAcrossMeals(meals, P){
  if(!meals || meals.length < 3 || !P) return;
  const dayP = () => mealsTotals(meals, false).protein_g;
  const mealP = m => (m.items||[]).reduce((a,it)=>{ const f=FOOD_BY_ID[it.id];
    return a + (f ? (f.protein_g||0)*it.grams/100 : 0); }, 0);
  const CEIL = 0.40;                                    // share of the day's protein one meal may carry
  for(let pass=0; pass<4; pass++){
    const total = dayP(); if(total <= 0) return;
    const hi = meals.slice().sort((a,b)=>mealP(b)-mealP(a))[0];
    const lo = meals.slice().sort((a,b)=>mealP(a)-mealP(b))[0];
    if(!hi || !lo || hi===lo) return;
    if(mealP(hi) <= CEIL*total) return;
    const src = (hi.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]}))
      .filter(x=>x.f && !x.f.recipe && !x.it.fixed && !x.it.manual && (x.f.protein_g||0) >= 12
                && x.it.grams > leverFloor(x.it)).sort((a,b)=>(b.f.protein_g*b.it.grams)-(a.f.protein_g*a.it.grams))[0];
    const dst = (lo.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]}))
      .filter(x=>x.f && !x.f.recipe && !x.it.fixed && !x.it.manual && (x.f.protein_g||0) >= 12
                && x.it.grams < itemCap(x.it, x.f)).sort((a,b)=>(b.f.protein_g||0)-(a.f.protein_g||0))[0];
    if(!src || !dst) return;
    const sp=(src.f.protein_g||0)/100, dp=(dst.f.protein_g||0)/100;
    if(sp<=0 || dp<=0) return;
    const moveP = Math.min(mealP(hi) - CEIL*total,
                           (src.it.grams - leverFloor(src.it)) * sp,
                           (itemCap(dst.it, dst.f) - dst.it.grams) * dp);
    if(moveP < 6) return;                               // not worth shuffling for a few grams
    const before = Math.abs(mealsTotals(meals,false).kcal - (+P.tCal||0));
    const oS=src.it.grams, oD=dst.it.grams;
    src.it.grams = Math.round(src.it.grams - moveP/sp);
    dst.it.grams = Math.round(dst.it.grams + moveP/dp);
    // swapping between two different proteins moves calories too; back out if the day drifts
    if(Math.abs(mealsTotals(meals,false).kcal - (+P.tCal||0)) > before + 60){ src.it.grams=oS; dst.it.grams=oD; return; }
  }
}
// Two things a client sees immediately that no macro check catches: the same food turning up all day (617g of
// Greek yogurt, 652g of potato), and fibre running at nearly twice the target. The fibre rule only ever had a
// FLOOR, so a day built from beans, high-fibre tortillas and bran had nothing stopping it at 62g.
function capDayRepeats(meals, P){
  if(!meals || !meals.length || !P) return;
  // This runs BEFORE the calorie fit, and pins a per-item ceiling (it.capG) as it trims. The fit then puts
  // those calories somewhere else on its own, and cannot simply grow the capped food back.
  // grams of any one non-vegetable food across a day; tighter where published intake data gives a daily
  // maximum (oils 42g, cheese 77g, avocado 136g, nut butter 49g, mayonnaise 30g, hot sauce 21g). Oils and
  // condiments used to be skipped here entirely, so two meals could each carry a full serving of the same fat.
  const dayMaxOf = f => { const p = !f.recipe && PORTIONS[f.id]; return (p && p.day) ? Math.min(DAY_FOOD_MAX, p.day) : DAY_FOOD_MAX; };
  const tally = new Map();
  meals.forEach(m=>(m.items||[]).forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(!f) return;
    if(f.cat==="Vegetables"||f.recipe) return;
    if((f.cat==="Fats & Oils"||f.cat==="Condiments & Misc") && !(PORTIONS[f.id] && PORTIONS[f.id].day)) return;
    if(!tally.has(f.id)) tally.set(f.id, []);
    tally.get(f.id).push(it); }));
  tally.forEach(items=>{
    const f=FOOD_BY_ID[items[0].id];
    const DAY_MAX = dayMaxOf(f), sourced = DAY_MAX < DAY_FOOD_MAX;
    let total=items.reduce((a,x)=>a+x.grams,0);
    // A per-serving cap is not a per-day cap: two meals holding one Brazil nut each is two nuts. Keep the first
    // serving and REMOVE the rest from their meals. Zeroing them is not enough, because sanitizeMeals resets
    // any zero-gram item to its floor, which would put the second nut straight back.
    if(f && /brazil nut/i.test(f.name) && items.length > 1){
      const extra = new Set(items.slice(1));
      meals.forEach(m=>{ if(m.items) m.items = m.items.filter(it=>!extra.has(it)); });
      items[0].grams = Math.min(items[0].grams, BRAZIL_NUT_G); items[0].capG = BRAZIL_NUT_G;
      return;
    }
    if(total<=DAY_MAX) return;
    // trim the smallest servings first so the meal really built on it keeps its portion
    // a sourced daily limit also trims the recipe's own fixed amounts (a second meal's feta or avocado)
    items.slice().sort((a,b)=>a.grams-b.grams).forEach(it=>{
      if(total<=DAY_MAX || (it.fixed && !sourced) || it.manual) return;
      const fl=leverFloor(it), cut=Math.min(it.grams-fl, total-DAY_MAX);
      if(cut<=0) return;
      it.grams=Math.round(it.grams-cut); total-=cut;
    });
    // Pin EVERY serving of this food, not just the ones trimmed. Capping one and leaving the other free is
    // how 530g of quinoa survived a 470g cap: the fit simply grew the uncapped serving back to its own ceiling.
    items.forEach(it=>{ if(!it.fixed && !it.manual) it.capG = Math.min(it.capG||Infinity, it.grams); });
  });
  capFiber(meals, P);
  // (Tried pinning EVERY high-fibre lever here so the fit could not grow a different bean back up. The loop
  // already leaves the day at or under the ceiling, so that condition fired on almost every day, removed most
  // of the fit's growth options, and cost 7 calorie misses per 480. The per-item caps above are enough.)
}
// FAT is the least accurate target in the whole planner: mean error 10.4% against 1.5% for calories, and one
// day in ten lands 24% off. The reason is structural. fitCalories fits CALORIES, balanceMealSizes fits meal
// SHAPE, and nothing ever fits fat: a day whose calories are perfect but whose fat is 12g high has no pass
// that will notice. Fat is also the smallest target, so the same absolute miss is a far bigger percentage.
// This trades fat against carbs at constant calories, which is the one swap that does not disturb protein.
// The three fitting passes each fix one number and disturb the other two, so no single ORDER of them wins:
// running protein-then-fat-then-calories beat calories-last on protein and lost on fat, and vice versa.
// Run the cycle a few times instead and keep the best day it produced. Calories carry double weight because
// "actual calories within 100 of target, every day" is the one hard rule.
function fitMacros(meals, P){
  const tC=+P.tCal||0, tP=+P.tPro||0, tCa=+P.tCarb||0, tF=+P.tFat||0;
  const e = (a,b) => b ? Math.abs(a-b)/b : 0;
  // "actual calories within 100 of target, every day" is a RULE, not one term among four. Scoring calories
  // as a weighted term let the loop buy macro accuracy with calorie accuracy and pushed the calorie miss
  // from 1.6% to 2.1%. A day outside the band is disqualified instead, and ranked by how far outside it is.
  const CAL_HARD = tC ? Math.min(100, tC*0.02) : Infinity;
  const score = () => { const t=mealsTotals(meals,false);
    const calOff = Math.abs(t.kcal - tC);
    const macro = e(t.protein_g,tP) + e(t.carb_g,tCa) + e(t.fat_g,tF);
    return (calOff > CAL_HARD ? 10 + calOff/Math.max(tC,1) : 0) + macro; };
  const snap = () => meals.flatMap(m=>(m.items||[]).map(it=>it.grams));
  const restore = g => { let i=0; meals.forEach(m=>(m.items||[]).forEach(it=>{ it.grams=g[i++]; })); };
  let best = snap(), bestS = score();
  for(let i=0;i<3;i++){
    // drive whichever macro is furthest off first. A fixed protein-then-fat order meant the second pass spent
    // its moves undoing the first one's on every day where fat was the bigger miss.
    const t0 = mealsTotals(meals,false);
    [["protein_g",tP],["fat_g",tF],["carb_g",tCa]].filter(x=>x[1]>0)
      .sort((a,b)=>Math.abs(t0[b[0]]-b[1])/b[1] - Math.abs(t0[a[0]]-a[1])/a[1])
      .forEach(([k])=>balanceMacro(meals, P, k));
    fitCalories(meals, P);
    const now = snap();
    // fitCalories can ADD a filler item, which would make a saved snapshot the wrong shape to write back.
    // If the day changed shape, the older snapshots are void: start again from here.
    if(now.length !== best.length){ best = now; bestS = score(); continue; }
    const sc = score();
    if(sc < bestS - 1e-9){ bestS = sc; best = now; }
  }
  if(snap().length === best.length) restore(best);
  fitCalories(meals, P);          // last word to the hard rule
}
// FITTING PROTEIN AND FAT. Measured over 400 days, nothing in the pipeline ever fit either one: fitCalories
// fits calories, balanceProteinAcrossMeals only moves protein BETWEEN meals, and ensureBreakfastFloor and
// balancePlate only ever push protein up. So protein ran more than 2% OVER on 250 days and under on only 27,
// worst exactly where the client asked for the LEAST protein (7.5% off at a 0-25%-of-calories target against
// 3.5% at 30-35%), and fat ran 10.4% off. Calories being right did not help: protein was still 5.6% off on
// calorie-perfect days, because a food's real calories run about 80 below its own 4-4-9 arithmetic and that
// surplus has to land on some macro.
//
// Both fixes are the same move, so this is one function: trade the macro against other calories at constant
// calories. Two measurements shaped it. First, a destination does not have to be a grain, it only has to
// carry LESS of the macro per calorie than the food being cut; insisting on a lean grain gave up 106 times
// out of 400 for want of a destination. Second, giving up on the first refusal wasted the levers that were
// there: 91% of over-fat days could still reach their target with every lever at its floor. So this walks
// candidate pairs instead of taking one shot.
const MACRO_FIT = {
  protein_g: { dense:12, pinKeep:0.70, orig:"_proOrig",  minFloor:null },
  fat_g:     { dense:8,  pinKeep:0.50, orig:"_fatOrig",  minFloor:5   },
  carb_g:    { dense:20, pinKeep:0.60, orig:"_carbOrig", minFloor:null }
};
// The whole day's macro error, as one number. Each macro used to be guarded on its own: a fat swap was
// refused if it cost more than 3g of protein, however much fat it saved. Measured over 400 days that refused
// 1,726 fat swaps and 1,535 protein swaps and left 92% of the over-fat days over fat with the levers to fix
// them still sitting unused. Trading one macro against another is the entire point of the pass, so the trade
// is judged on the day rather than on the macro being driven.
function macroErrOfTotals(t, P){
  const e=(a,b)=>b?Math.abs(a-b)/b:0;
  return e(t.protein_g,+P.tPro||0) + e(t.fat_g,+P.tFat||0) + e(t.carb_g,+P.tCarb||0);
}
// Which foods may absorb or release calories when a macro is being traded. A destination has to be dense
// enough that the swap is a portion rather than a pile (raw onion is 40 kcal per 100g: absorbing 150 calories
// would take most of a pound of it) and has to be something the dish is built on rather than seasoning.
const AROMATIC = /\b(onion|garlic|ginger|shallot|scallion|leek|basil|cilantro|parsley|dill|mint|rosemary|thyme|sage|chives)\b/i;
function canCarryCalories(f){
  if(!f || f.recipe || (f.kcal||0) < 60) return false;
  if(f.cat==="Vegetables") return false;                    // sized by PRODUCE_GRAMS for plate reasons, not macro maths
  // A condiment is flavour, measured by the spoon. Sriracha is almost all carbohydrate, so on any day running
  // over on protein or fat it was the "best" place to park calories, and it grew from 8g to 60g (a quarter cup
  // of hot sauce on a frittata) on 43% of days. Mayonnaise, honey, miso and tahini-style sauces the same way.
  if(f.cat==="Condiments & Misc") return false;
  if(AROMATIC.test(f.name) && !/pickle|relish|sauce|dressing|kimchi|pesto|hummus|salsa/i.test(f.name)) return false;
  return true;   // the net-rate test below already refuses anything carrying as much of the macro as the source
}
// Plate shape is a CONSTRAINT, not just a pre-pass. balancePlate settles each plate before the macros are
// fitted, and the fit then shrinks the dish protein to reach the protein number. Measured over 960 main
// meals, that took "a starch carrying 2.5x the protein's calories" from 90 to 158. Macro-correct nonsense is
// still nonsense: a client looking at 220g of quinoa next to 52g of shrimp does not care that the day adds up.
function plateBreaks(meals){
  let n=0;
  (meals||[]).forEach(m=>{
    const items=(m.items||[]).map(it=>({it,f:FOOD_BY_ID[it.id]})).filter(x=>x.f);
    if(!items.length) return;
    const kc=x=>(x.f.kcal||0)*x.it.grams/100;
    // a dip that outweighs the thing you are dipping is a tub of hummus with a garnish
    if(/dip|cup|stick|crudit|platter/i.test(m.dish||"")){
      const dip=items.filter(x=>DIPPY.test(x.f.name)).reduce((a,x)=>a+x.it.grams,0);
      const veh=items.filter(x=>x.f.cat==="Vegetables" && /raw/i.test(x.f.name)).reduce((a,x)=>a+x.it.grams,0);
      if(dip>0 && veh>0 && dip > veh*1.8) n++;
    }
    if(!/lunch|dinner/i.test(m.name||"")) return;
    const pr=dishProtein(m); if(!pr) return;
    const st=items.filter(x=>STARCHY(x.f) && !x.f.recipe && x.it!==pr.it).sort((a,b)=>kc(b)-kc(a))[0];
    if(st && kc(st) >= 2.5*kc(pr) && pr.it.grams < 115) n++;
    // a dish named for the chicken should not be mostly beans
    if(/chicken|beef|turkey|pork|salmon|shrimp|fish|egg/i.test(m.dish||"") && !/bean|lentil|chickpea/i.test(pr.f.name)){
      const leg=items.filter(x=>/bean|lentil|chickpea/i.test(x.f.name) && x.it!==pr.it).reduce((a,x)=>a+x.it.grams,0);
      if(leg > pr.it.grams*1.3) n++;
    }
  });
  return n;
}
// The fibre ceiling, as its own pass so it can run BOTH before the calorie fit and again after the macro
// passes. It used to live inside capDayRepeats only, which runs first, and the macro fit then grew the fibre
// straight back: legumes and whole grains are the ideal destination for a fat or protein swap (low fat and
// low protein per calorie), so the pass that fixes fat reaches for exactly the foods the ceiling had trimmed.
// Measured, the worst day still ran 156g of fibre against a 77g ceiling.
//
// A floor with no ceiling is how a 34g target lands at 62g, which is not a better plan, it is a bad week for
// a gut that is not used to it. Measured: a TIGHT ceiling (1.35-1.55x target) costs 5 to 9 calorie misses per
// 480 days, because the high-fibre foods are also what carries the calories on a high-carb day. So this only
// catches the genuinely extreme days, which is where a client actually feels it.
function capFiber(meals, P){
  if(!meals || !meals.length || !P) return;
  // a gainer's ceiling is 45g: past that the food itself is the obstacle (the gain carb picks keep them under it)
  const ceil = P.goal==="gain" ? 45 : Math.max(55, Math.round(fiberTargetG(P)*1.9));
  for(let pass=0; pass<14; pass++){
    const fib = mealsTotals(meals,false).fiber_g;
    if(fib <= ceil) break;
    let worst=null;
    meals.forEach(m=>(m.items||[]).forEach(it=>{ const f=FOOD_BY_ID[it.id];
      if(!f || f.recipe || it.manual || (f.fiber_g||0) < 6) return;
      const contrib=(f.fiber_g||0)*it.grams/100;
      // A FIXED item is normally left alone, but 30g of sugar-free syrup delivers 21g of isolated chicory
      // fibre: a third of the day's total from a condiment, which is a stomach ache rather than a high-fibre
      // plan. Any single item handing over 8g of fibre is fair game whether it is fixed or not.
      if(it.fixed && contrib < 8) return;
      if(it.grams <= leverFloor(it)) return;
      if(!worst || contrib>worst.c) worst={it, f, c:contrib}; }));
    if(!worst) break;
    const need=fib-ceil, per=(worst.f.fiber_g||0)/100;
    const next=Math.max(leverFloor(worst.it), quantizeG(worst.it, worst.f, worst.it.grams - need/per, leverFloor(worst.it)));
    if(next>=worst.it.grams) break;
    worst.it.grams=next; worst.it.capG=next;
  }
}
// THE FINAL CALORIE TRIM, and it runs after everything else including the whole-unit snap.
//
// Calories are the point of the tool. Dylan's rule has always been "within 100, every day", but measured
// over 400 days the planner sat at a mean of 28 cal off, median 22, p90 67, worst 161, with only 20% of days
// inside 5 calories. The cause is ordering, not capability: the LAST thing that moves grams is the whole
// unit snap inside sanitizeMeals, which can move a day by 30 or 40 calories when it rounds an egg or a
// tortilla, and nothing looked at the total afterwards.
//
// So this runs last, and it only touches foods that do NOT come in whole units. That is the whole trick:
// the snap has already happened and can never need to run again, so nothing can undo this. A gram of rice
// is about 1.3 calories, so where the day has a grain or a dairy lever it can land on the target almost
// exactly; where the only lever left is oil at 9 cal/g the resolution is 9 calories, still far better than 28.
// Close a small calorie SHORTFALL with one side that belongs on its meal: fruit or oats with a sweet meal, a
// grain or potato beside a savoury main, nuts on oats or yogurt when fat is still under. Sized to the gap.
function addCalorieSide(meals, P, gap){
  const t = mealsTotals(meals, false), fatRoom = (+P.tFat||0) && t.fat_g < 0.97*(+P.tFat);
  const pool = allowedFoods(P).filter(f=>!f.recipe && !isDisliked(f,P) && !isProteinPowder(f) && (f.kcal||0) >= 40);
  const inDay = id => meals.some(m=>(m.items||[]).some(it=>it.id===id));
  const carbs = pool.filter(f=>(f.cat==="Fruits" || f.cat==="Grains & Starches" || /potato/i.test(f.name)) && (f.protein_g||0) <= 12 && (f.fat_g||0) <= 8);
  if(P.goal==="gain") carbs.sort((a,b)=>fibrePerKcal(a)-fibrePerKcal(b));
  const fats = pool.filter(f=>/^(almonds|walnuts|pecans|pistachio|cashews|peanuts|pumpkin seeds|avocado, raw)/i.test(f.name));
  const byLight = meals.slice().sort((a,b)=> mealsTotals([a],false).kcal - mealsTotals([b],false).kcal);
  for(const foods of (fatRoom ? [fats, carbs] : [carbs, fats])){
    for(const m of byLight){
      if(!roomFor(m) || (m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && f.recipe; })) continue;
      const f = foods.find(x=>!inDay(x.id) && (fats.indexOf(x)>=0 ? fatSideFits(m,x) : carbSideFits(m,x)));
      if(!f) continue;
      const probe = { id:f.id, inSnack:/snack/i.test(m.name||"") };
      const g = Math.min(maxServeG(f), Math.max(leverFloor(probe), Math.round(gap/((f.kcal||100)/100))));
      m.items.push(Object.assign(probe, { grams:g, side:true }));
      return true;
    }
  }
  return false;
}
function shrinkSnacksToFit(meals, P){
  const tgt = +P.tCal||0; if(!tgt) return false;
  let over = mealsTotals(meals,false).kcal - tgt;
  if(over <= Math.max(2, tgt*0.003)) return false;
  const isTreat = m => (m.items||[]).length && m.items.every(it=>{ const f=FOOD_BY_ID[it.id]; return f && f.recipe; });
  const snacks = meals.filter(m=>/snack/i.test(m.name||"") && !isTreat(m))
                      .sort((a,b)=>mealsTotals([b],false).kcal - mealsTotals([a],false).kcal);
  let changed = false;
  for(const m of snacks){
    if(over <= 0) break;
    const kc = mealsTotals([m],false).kcal; if(kc <= 0) continue;
    const factor = Math.max(0.5, 1 - over/kc);
    // never below a food's own minimum, and pieces stay whole (1.3 eggs is not a portion)
    (m.items||[]).forEach(it=>{ if(it.manual) return; const f=FOOD_BY_ID[it.id]; if(!f) return;
      const u = unitGrams(f), fl = Math.min(leverFloor(it), it.grams);
      let g = Math.max(fl, Math.round(it.grams*factor));
      if(u > 0){ const step = u <= 50 ? u : u/2; g = Math.max(step, Math.round(g/step)*step); if(g < fl) g = Math.ceil(fl/step)*step; g = Math.min(g, it.grams); }
      it.grams = g; });
    changed = true;
    over = mealsTotals(meals,false).kcal - tgt;
  }
  return changed;
}
function settleCaloriesExact(meals, P){
  const tgt = +P.tCal||0; if(!tgt || !meals || !meals.length) return;
  const TOL = 2;
  const bk = meals.find(m=>/breakfast/i.test(m.name||""));
  const bkProtein = () => bk ? (bk.items||[]).reduce((a,x)=>{ const f=FOOD_BY_ID[x.id];
    return a + (f ? (f.protein_g||0)*x.grams/100 : 0); }, 0) : Infinity;
  // The floor is a floor, not a trap. Taking it as an absolute test meant that on any day whose breakfast
  // already sat a hair under 25g, EVERY move was reverted on the spot, including moves at dinner that never
  // touched breakfast. That alone was most of the days missing 0.3%: one of them had 944 calories of headroom
  // sitting in its seitan and spent none of it. What matters is not making breakfast worse than it already is.
  const bk0 = bkProtein();
  const bkFloor = Math.min(25, bk0);
  const pool = free => meals.flatMap(m=>(m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})))
    .filter(x=>x.f && !x.f.recipe && !x.it.manual && (x.f.kcal||0) >= 15
              && !(unitGrams(x.f) > 0)                 // never a piece food: the snap would fight it
              && (free ? !x.it.fixed : !!x.it.fixed));
  // A lever that would breach the breakfast floor is skipped, not a reason to stop: the scorer keeps
  // choosing the biggest protein in the day, which is often the one holding breakfast up, and giving up on
  // it abandoned days that had a perfectly good grain lever sitting one place down the list.
  // A fixed item may give or take 15% of what it was when this pass STARTED. Measuring the 15% from its
  // current grams on every pass compounded over 24 passes: a breakfast's fixed tofu went 204g to 85g (1.15^24
  // is 28x the other way, which is how 8g of hot sauce became 60g elsewhere).
  const orig0 = new Map();
  meals.forEach(m=>(m.items||[]).forEach(it=>{ if(it.fixed) orig0.set(it, it.grams); }));
  const run = (floorG) => {
  const blocked = new Set();
  for(let pass=0; pass<24; pass++){
    const gap = tgt - mealsTotals(meals, false).kcal;
    if(Math.abs(gap) <= TOL) return;
    // Free levers AND pinned ones in the same pile, scored together. Falling back to pinned items only when
    // there were ZERO free levers was wrong: a day is usually short because every free lever is already at
    // its CAP, or long because they are all at their FLOOR, and in both cases free levers still exist, they
    // just cannot move the way this day needs. All 14 days that missed 0.3% had between 5 and 11 free levers.
    const cands = pool(true).concat(pool(false)).filter(x=>!blocked.has(x.it));
    const moves = [];
    cands.forEach(x=>{
      const per = (x.f.kcal||0)/100;
      const g0 = orig0.has(x.it) ? orig0.get(x.it) : x.it.grams;
      const hi = x.it.fixed ? Math.min(itemCap(x.it, x.f), Math.round(g0*1.15)) : itemCap(x.it, x.f);
      // The lower bound may never pass the upper. Sweeteners fall through leverFloor to a generic 30g while
      // maple syrup's ceiling is 25g, so max(30, min(25, x)) returned 30 and this pass PUT the syrup over its
      // cap. It is the same floor-over-ceiling conflict itemCap already guards against, inside this function.
      const lo = Math.min(hi, x.it.fixed ? Math.max(leverFloor(x.it), Math.round(g0*0.85)) : leverFloor(x.it));
      const g  = Math.round(Math.max(lo, Math.min(hi, x.it.grams + gap/per)));
      if(g === x.it.grams) return;
      moves.push({ x, g, resid: Math.abs(gap - (g - x.it.grams)*per) });
    });
    if(!moves.length) return;
    // With the floor lifted, a move that keeps breakfast at it still goes first while one gets the day closer: a 1450-cal
    // day cut its egg whites 74 g to 54 g for 10 calories (breakfast 25 g to 23 g) with a zucchini trim on the table.
    if(floorG < bkFloor){
      const keep = moves.filter(m=>{ const o0 = m.x.it.grams; m.x.it.grams = m.g; const ok = bkProtein() >= bkFloor - 0.01; m.x.it.grams = o0; return ok; });
      if(keep.some(m=>m.resid < Math.abs(gap) - 0.5)) moves.splice(0, moves.length, ...keep);
    }
    // Two stages, because landing the calories and keeping the macros are not the same job. First take every
    // lever that lands the calories about as well as the best one does, since several usually tie; then among
    // those pick the one that leaves the DAY's macros closest to target. Ranking by the food's own protein
    // and fat instead cost 0.7pp of protein accuracy and 0.8pp of fat, for no calorie benefit at all.
    const bestResid = moves.reduce((a,m)=>Math.min(a, m.resid), Infinity);
    if(bestResid >= Math.abs(gap) - 0.5) return;                 // nothing left that gets us closer
    let best = null;
    moves.filter(m=>m.resid <= bestResid + 1.5).forEach(m=>{
      const o0 = m.x.it.grams; m.x.it.grams = m.g;
      const cost = macroErrOfTotals(mealsTotals(meals, false), P) + (m.x.it.fixed ? 0.02 : 0);
      m.x.it.grams = o0;
      if(!best || cost < best.cost) best = Object.assign({ cost }, m);
    });
    if(!best) return;
    const o = best.x.it.grams;
    best.x.it.grams = best.g;
    if(floorG > 0 && bkProtein() < floorG - 0.01){
      // take the part of the cut the floor allows, not none of it (a 6-calorie gap stayed open for want of 11 g of egg white)
      best.x.it.grams = o;
      const pf = (best.x.f.protein_g||0)/100;
      if(best.g < o && pf > 0 && bk && (bk.items||[]).includes(best.x.it)){ const g2 = Math.ceil(o - (bkProtein() - floorG)/pf); if(g2 < o) best.x.it.grams = g2; }
      blocked.add(best.x.it); continue;
    }
  }
  };
  run(bkFloor);
  // Every portion at its published limit and the day still SHORT (a 2850-cal day, rice at its 335g cap, 43 cal
  // under), or at every minimum and still OVER: a coach adds a small side or trims the snacks. Do the same, then
  // settle again. Both are rare and both beat a day outside 0.3%.
  const gapNow = () => tgt - mealsTotals(meals, false).kcal;
  if(Math.abs(gapNow()) > Math.max(TOL, tgt*0.003)){
    if(gapNow() > 0 ? addCalorieSide(meals, P, gapNow()) : shrinkSnacksToFit(meals, P)) run(bkFloor);
  }
  // CALORIES WIN. On a very small day (1450 cal over 5 meals) every lever outside breakfast can sit at its floor
  // while the only room left is in breakfast, and the 25g breakfast floor then refused every move: one such day
  // landed 85 cal over. The floor is a strong preference; the calorie target is the deliverable. Only when the
  // day would otherwise miss 0.3% does this pass let breakfast protein dip below 25g to land the calories.
  // It gives the breakfast up in two steps: first no lower than 23.5 g, which landed a 1450-cal day that had cut its egg
  // whites to 23 g for 10 calories (2026-10-06), and all of it only when the day still misses.
  const miss = () => Math.abs(tgt - mealsTotals(meals, false).kcal) > Math.max(TOL, tgt*0.003);
  if(miss()) run(Math.min(bkFloor, 23.5));
  if(miss()) run(0);
}
function balanceMacro(meals, P, key){
  if(!meals || !meals.length || !P) return;
  const cfg  = MACRO_FIT[key];
  const tgt  = key==="fat_g" ? (+P.tFat||0) : key==="carb_g" ? (+P.tCarb||0) : (+P.tPro||0);
  const oKey = key==="fat_g" ? "protein_g"  : "fat_g";      // only steers the destination sort
  const oTgt = key==="fat_g" ? (+P.tPro||0) : (+P.tFat||0);
  const tC   = +P.tCal||0;
  if(!tgt) return;
  const tol = Math.max(2.5, tgt*0.02);
  const tP0 = +P.tPro||0;
  const all = () => meals.flatMap(m=>(m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})))
                         .filter(x=>x.f && !x.f.recipe && !x.it.manual && (x.f.kcal||0) > 0);
  const perK = (x,k) => (x.f[k]||0)/(x.f.kcal||0);
  // A pinned item may still give way, but only part of the way. On a plant diet at a low fat target the fat
  // is otherwise LOCKED: of 56 days landing 20%+ over, 23 had no adjustable fat at all, because nuts, seeds,
  // tahini and avocado arrive as fixed extras and plant proteins ARE fats. A protein keeps more of itself
  // than a drizzle of oil does, because it is the load-bearing part of the dish.
  const floorOf = x => {
    if(!x.it.fixed) return leverFloor(x.it);
    if(x.it[cfg.orig]===undefined) x.it[cfg.orig] = x.it.grams;
    const hard = cfg.minFloor===null ? leverFloor(x.it) : cfg.minFloor;
    return Math.max(hard, Math.round(x.it[cfg.orig]*cfg.pinKeep));
  };
  const bkProtein = () => {
    const bk = meals.find(m=>/breakfast/i.test(m.name||"")); if(!bk) return Infinity;
    return (bk.items||[]).reduce((a,x)=>{ const f=FOOD_BY_ID[x.id]; return a + (f ? (f.protein_g||0)*x.grams/100 : 0); }, 0);
  };
  // measured ONCE, on entry. Recomputing the allowance each pass let it ratchet: a day that drifted to 3%
  // off then had a 3% allowance for every later swap, so calories never came back. That alone cost 0.5pp.
  const kcalBand = tC ? Math.max(Math.abs(mealsTotals(meals,false).kcal - tC), tC*0.012) : Infinity;
  let addedSide = 0;                                  // one side per call (two measured no better: 5 misses either way)
  for(let pass=0; pass<14; pass++){
    const t = mealsTotals(meals, false);
    const gap = t[key] - tgt;                          // >0 means too much of it
    if(Math.abs(gap) <= tol) return;
    const plate0 = plateBreaks(meals);
    const over = gap > 0;
    const otherOver = oTgt ? (t[oKey] > oTgt) : false;
    // SOURCE: a food dense in this macro with room to move the way we need. Unpinned before pinned, an
    // add-on before the food the dish is named for, densest first so the swap stays small.
    const srcs = all()
      .filter(x=>(x.f[key]||0) >= cfg.dense && (over ? x.it.grams > floorOf(x) : x.it.grams < itemCap(x.it, x.f)))
      .sort((a,b)=>(a.it.fixed?1:0)-(b.it.fixed?1:0) || (a.it.titled?1:0)-(b.it.titled?1:0) || perK(b,key)-perK(a,key))
      .slice(0, 6);
    // DESTINATION: carries the calories with as little of this macro as possible. When the OTHER macro is
    // already over target it is penalised too, so fixing one does not simply hand the overshoot to the other.
    // It must be a food the plate is actually built around. Letting ANY item with a low macro-per-calorie
    // take the calories put 112g of raw onion on 19 days: an aromatic has the lowest protein per calorie in
    // the day and is the last thing that should absorb 150 calories. Vegetables are sized by PRODUCE_GRAMS
    // for plate reasons, not by macro arithmetic, so they are not destinations at all.
    // A FIXED item is the recipe's own amount (an egg base, a spoon of feta, a fibre side), not a lever, so it
    // never absorbs calories either.
    const dsts = all()
      .filter(x=>canCarryCalories(x.f) && !x.it.fixed)
      .filter(x=>over ? (x.it.grams < itemCap(x.it, x.f)) : (x.it.grams > leverFloor(x.it)))
      .sort((a,b)=>(perK(a,key) + (otherOver?perK(a,oKey):0)) - (perK(b,key) + (otherOver?perK(b,oKey):0)))
      .slice(0, 5);
    let moved = false;
    outer:
    for(const src of srcs){
      for(const dst of dsts){
        if(dst.it === src.it) continue;
        const mPer=(src.f[key]||0)/100, sKcal=(src.f.kcal||0)/100, dKcal=(dst.f.kcal||0)/100;
        // net rate: what a gram of the swap actually buys once the destination brings its own share back
        const net = mPer - ((dst.f[key]||0)/100)*(sKcal/dKcal);
        if(net <= 0.02) continue;
        // bound the move at BOTH ends: the source's floor or cap, and how many calories the destination can
        // actually absorb. Ignoring the destination's capacity left days short on calories when the
        // replacement hit its own cap partway through the swap.
        const srcRoom  = over ? (src.it.grams - floorOf(src)) : (itemCap(src.it, src.f) - src.it.grams);
        const dstRoomG = over ? (itemCap(dst.it, dst.f) - dst.it.grams) : (dst.it.grams - leverFloor(dst.it));
        const moveG = Math.min(Math.abs(gap)/net, srcRoom, dstRoomG*dKcal/sKcal);
        if(moveG < 3) continue;
        const before = { err:macroErrOfTotals(t, P), kcal:Math.abs(t.kcal-tC) };
        const oS=src.it.grams, oD=dst.it.grams;
        src.it.grams = quantizeG(src.it, src.f, over ? src.it.grams-moveG : src.it.grams+moveG, floorOf(src));
        const kcalDelta = (oS - src.it.grams) * sKcal;   // put the calories back so the day total does not move
        dst.it.grams = quantizeG(dst.it, dst.f,
          Math.min(itemCap(dst.it, dst.f), dst.it.grams + kcalDelta/dKcal), leverFloor(dst.it));
        const after = mealsTotals(meals, false);
        const better = macroErrOfTotals(after, P) < before.err - 1e-4;
        // Judging the trade on the whole day lets protein be sold to buy carb and fat accuracy, and five days
        // went outside the plan's own protein band doing it. Protein is what the client is paying for, so it
        // is a bound rather than one term among three: a move may not push it out of band, and on a day that
        // is already out of band it has to help.
        const proBefore = Math.abs(t.protein_g - tP0), proAfter = Math.abs(after.protein_g - tP0);
        const outOfBand = tP0 ? (after.protein_g < 0.88*tP0 || after.protein_g > 1.12*tP0) : false;
        const proRefused = outOfBand && proAfter >= proBefore;
        // an absolute band, not a per-swap allowance: ten swaps each drifting "only" 15 kcal move the day 150.
        const worseKcal = tC ? Math.abs(after.kcal-tC) > kcalBand : false;
        // nut butter, eggs and full-fat dairy hold breakfast up as well as carrying fat. The 25g breakfast
        // floor is a hard rule, so a swap that breaches it is refused however much it helps the macros.
        if(src.it.grams===oS && dst.it.grams===oD) continue;   // quantised back to where it started
        if(!better || worseKcal || proRefused || plateBreaks(meals) > plate0 || bkProtein() < 25){ src.it.grams=oS; dst.it.grams=oD; continue; }
        moved = true; break outer;
      }
    }
    if(!moved){
      // Every existing food was capped, fixed or useless as a destination. Add one fitting side and try again.
      if(over && addedSide < 1 && (key==="protein_g" || key==="fat_g") && Math.abs(gap) > tgt*0.04){
        if(addBalancingSide(meals, P, key)){ addedSide++; continue; }
      }
      return;
    }
  }
}
function balanceProtein(meals, P){ balanceMacro(meals, P, "protein_g"); }
function balanceCarb(meals, P){ balanceMacro(meals, P, "carb_g"); }
function balanceFat(meals, P){ balanceMacro(meals, P, "fat_g"); }
function balanceDip(m){
  if(!m || !/dip|cup|stick|crudit|platter/i.test(m.dish||"")) return;
  const items=(m.items||[]).map(it=>({it, f:FOOD_BY_ID[it.id]})).filter(x=>x.f);
  const dip=items.filter(x=>DIPPY.test(x.f.name)).reduce((a,x)=>a+x.it.grams,0);
  const veh=items.filter(x=>x.f.cat==="Vegetables" && /raw/i.test(x.f.name));
  if(!dip || !veh.length) return;
  const have=veh.reduce((a,x)=>a+x.it.grams,0);
  if(dip <= have*1.8) return;
  const want=dip/1.8, share=(want-have)/veh.length;
  veh.forEach(x=>{ x.it.grams = Math.min(itemCap(x.it, x.f), Math.round(x.it.grams + share)); });
}

// A floor above the food's own ceiling is a contradiction the solver cannot satisfy (mayonnaise: floor 30g,
// sourced ceiling 22g), so every floor is clamped to the ceiling.
function leverFloor(it){
  const f=FOOD_BY_ID[it.id]; if(!f) return 5;
  let fl = leverFloorRaw(it, f);
  // A SNACK can be small: one egg, half a cup of yogurt, a spoon of nut butter. Main-meal minimums on every
  // snack left a 1400-cal, five-meal day unable to land its calories with everything at its floor.
  if(it.inSnack && !it.minUnits){
    const u = unitGrams(f);
    fl = u > 0 ? Math.max(u <= 50 ? u : u/2, Math.round(fl*0.5)) : Math.max(5, Math.round(fl*0.5));
    if(/^Egg, whole/i.test(f.name)) fl = Math.min(fl, 50);
  }
  return Math.min(fl, Math.max(5, maxServeG(f)));
}
function leverFloorRaw(it, f){
  if(it.floorG) return it.floorG;                 // a per-item floor set by the dish (markDips)
  // A VESSEL the dish is built on has a minimum number of pieces: a sandwich is two slices, tacos are at least
  // two tortillas (markVessels sets this from the title). 35 days in 480 served a one-slice "sandwich" or half
  // a burrito tortilla as "tacos".
  if(it.minUnits){ const u=unitGrams(f); if(u>0) return it.minUnits*u; }
  // a food the dish is NAMED for gets a real serving, not a token: "Quinoa Burrito Bowl" served 35g of quinoa
  if(it.titled){
    const cap=maxServeG(f);
    // the yogurt, skyr, cottage cheese or kefir a dish is named for is the dish: "Skyr with Berries & One Brazil
    // Nut" arrived as 3 tbsp of skyr under a cup of granola (2026-09-30). About two thirds of a cup.
    if(f.cat==="Eggs & Dairy" && /yogurt|skyr|cottage cheese|kefir/i.test(f.name)) return Math.min(cap, 150);
    if(/tortilla|pita|\bbread\b|bagel|english muffin|naan|arepa/i.test(f.name)) return Math.min(cap, unitGrams(f)||48);  // one whole piece (a corn tortilla IS 24g; a flat 30 floor is unreachable)
    if(f.cat==="Grains & Starches"||f.cat==="Legumes") return Math.min(cap, /oats|granola|rice cake/i.test(f.name) ? 40 : 100);
  }
  // THE PROTEIN A DISH IS NAMED FOR is a real portion, not a garnish: 42% of days served a titled protein
  // under 75g (tilapia 45g beside 203g of quinoa, "Seitan & Broccoli" with 30g of seitan). 3 oz (85g) cooked
  // is FDA's reference amount for meat and fish and the customary serving; tofu gets 100g. On a low-protein
  // plan the floor eases toward 2 oz (56g) so the day can still land on its protein number. Concentrates (a
  // flour, a powder) are excluded: 85g of vital wheat gluten would be 64g of protein.
  if(it.titled && (f.cat==="Protein"||f.cat==="Seafood") && !isProteinPowder(f) && (f.protein_g||0) > 0 && (f.protein_g||0) <= 40){
    const Pp=state.profile, nMeals=Math.max(+(Pp&&Pp.meals)||4,1), share=(+(Pp&&Pp.tPro)||0)/nMeals;
    const pr = PORTIONS[f.id];
    const hi = (pr && pr.star) || 85, lo = Math.round(hi*0.66);
    // eases further on a low-protein plan (under 25% of calories), where every fixed protein already counts
    const pS = (+(Pp&&Pp.tPro)||0)*4/Math.max(+(Pp&&Pp.tCal)||1,1);
    const byShare = share > 0 ? Math.round(share*(pS < 0.25 ? 0.75 : 0.9)/((f.protein_g||1)/100)/5)*5 : hi;
    return Math.min(maxServeG(f), Math.max(lo, Math.min(hi, byShare)));
  }
  // a BINDER or dressing the dish is made with gets at least a tablespoon: egg salad was bound with 5g of light mayo
  // and a shawarma bowl's tahini sauce was 10g (35 of 1,926 drafted meals had a sauce under 12g)
  if(/mayonnaise|tahini|pesto|hummus|ranch|dressing|vinaigrette|tzatziki|aioli/i.test(f.name)) return Math.min(maxServeG(f), 15);
  if(f.cat==="Fats & Oils") return 5;            // a splash of oil is legitimately small
  if(f.cat==="Condiments & Misc") return 5;      // a spoon of mustard or sauce
  if(/\bbutter\b|\bghee\b/i.test(f.name) && !/peanut|almond|cashew|sunflower|nut butter|sesame/i.test(f.name)) return 5;
  if(/brazil nut/i.test(f.name)) return BRAZIL_NUT_G;   // one nut; the 10g nut floor would force two
  if(f.cat==="Nuts & Seeds") return 10;
  // discrete breads round to whole units (1 slice = 32g, 1 small pita = 30g), so a flat 35g floor is
  // unreachable for them by 3g. Floor them at one unit instead.
  if(/\bbread\b|tortilla|pita|bagel|english muffin|\bbun\b|naan/i.test(f.name)){ const u=unitGrams(f); return u>0 ? Math.min(u,30) : 30; }
  if(f.cat==="Grains & Starches"||f.cat==="Legumes"||f.cat==="Fruits") return 35;  // a real carb portion
  // EGGS: an egg salad sandwich with ONE egg is not an egg salad sandwich. buildMealItems already floors a
  // whole egg at 100g (2 eggs); leverFloor did not, so the calorie fit shrank it back to 30g, which the
  // whole-unit snap then rounded down to a single egg. Match the two floors.
  if(/^Egg, whole/i.test(f.name)) return Math.min(maxServeG(f), 100);
  // MEAT / FISH: don't shrink the star of the dish to a garnish (a "Thai Basil Beef" was served 30g of beef).
  // The floor SCALES with the client's per-meal protein allowance: enough grams to carry ~half that meal's
  // protein share, capped at a 3oz-ish serving. A flat 85g floor overshot protein on low-protein targets.
  if((f.cat==="Protein"||f.cat==="Seafood") && !isProteinPowder(f) && (f.protein_g||0)>0){
    const Pp=state.profile, nMeals=Math.max(+(Pp&&Pp.meals)||4,1), share=(+(Pp&&Pp.tPro)||0)/nMeals;
    if(share>0) return Math.max(30, Math.min(85, Math.round(share*0.5/(f.protein_g/100)/5)*5));
    return 60;
  }
  return 30;                                      // everything else (dairy, powders, misc)
}
function refineMeals(meals, P){
  const levers=[];
  meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f && !f.recipe && f.cat!=="Vegetables" && !it.fixed) levers.push(it); }));
  if(!levers.length) return;
  levers.forEach(it=>{ const fl=leverFloor(it); if(it.grams<fl) it.grams=fl; });   // start from realistic portions
  const deltas=[-8,-4,-2,-1,1,2,4,8];
  let cur=macroErrOf(meals,P), pass=0;
  while(pass++ < 30 && cur > 0.006){          // 0.006 across 3 macros ≈ 99.8% avg accuracy
    let improved=false;
    for(const it of levers){
      const fl=leverFloor(it);
      const g0=it.grams; let best=g0, bestErr=cur;
      for(const d of deltas){ const ng=g0+d; if(ng<fl||ng>maxServeG(FOOD_BY_ID[it.id])) continue; it.grams=ng;
        const e=macroErrOf(meals,P); if(e<bestErr-1e-7){ bestErr=e; best=ng; } }
      it.grams=best; if(best!==g0){ cur=bestErr; improved=true; }
    }
    if(!improved) break;
  }
  levers.forEach(it=>{ const fl=leverFloor(it); it.grams=Math.max(fl, Math.round(it.grams)); });   // clean 1g values, floored
  // whole eggs come in WHOLE units (1 egg = 50g) — never "3.6 eggs". Round to whole eggs but stay within
  // [leverFloor, maxServeG]: round UP if rounding-to-nearest would drop below the protein floor (so a 2-egg
  // floor never collapses to 1), and never exceed the cap (4 eggs).
  meals.forEach(mm=>mm.items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f && /^Egg, whole/i.test(f.name)){
    const cap=maxServeG(f), fl=leverFloor(it); let g=Math.round(it.grams/50)*50;
    if(g<fl) g=Math.ceil(fl/50)*50; if(g>cap) g=Math.floor(cap/50)*50; it.grams=Math.max(50, g); } }));
  // discrete carbs come in countable units — never "3.25 slices of bread", and never round UP past the cap
  // (that's how 2 slices became 3). Round to whole units, then if over maxServeG drop to the largest unit that fits.
  meals.forEach(mm=>mm.items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; const step=discreteUnitG(f); if(step>0){
    const cap=maxServeG(f); let g=Math.round(it.grams/step)*step; if(g>cap) g=Math.floor(cap/step)*step; it.grams=Math.max(step, g); } }));
}
// per-unit grams for a countable carb (1 slice / 1 tortilla / 1 cake); half-step for bagel/muffin/pita.
function discreteUnitG(f){
  if(!f || f.cat!=="Grains & Starches") return 0;
  const n=f.name.toLowerCase();
  const whole = /bread|tortilla|rice cake|\bbun\b|\broll\b|waffle|pancake/.test(n);
  const half  = /bagel|english muffin|\bpita\b/.test(n);
  if(!whole && !half) return 0;
  const p=(f.portions||[]).find(x=>/\b(slice|tortilla|cake|bun|roll|bagel|muffin|pita|waffle|pancake|each|piece)\b/i.test(x.label));
  if(!p) return 0;
  const per = p.grams/(parseLeadQty(p.label)||1);
  return per>0 ? (half ? per/2 : per) : 0;
}
// Dylan's #1 recurring complaint: plans land UNDER the fiber floor. The macro solver only chases
// protein/carb/fat, so fiber is whatever falls out — and rice/couscous days come in ~70%. This is the
// backstop: if the day is under its fiber target, add a high-fiber legume side (chickpeas first, Dylan's
// pick: "shit load of fiber, good volume add") to a savory meal as a FIXED side, then re-refine so the
// starchy carb shrinks to hold the macros. Loops a few times until the floor is met.
// Building muscle runs 2,500 to 3,500 calories, and 14g per 1,000 turns that into 35 to 50g of fibre: enough bulk to
// stop a gainer finishing the food, which is the one thing that plan cannot afford. Their floor stops at 35g, still
// inside the 25-35g band Reynolds 2019 ties to lower mortality.
const fiberTargetG = P => { const g = Math.max(30, Math.round(14*(+P.tCal||2000)/1000)); return P && P.goal==="gain" ? Math.min(35, g) : g; };
// grams of fibre per 100 calories: what makes a carb filling, and what a gainer wants least of
const fibrePerKcal = f => (f.fiber_g||0) / Math.max((f.kcal||0)/100, 0.1);
const SHAKE_TITLE = /smoothie|shake(?!\s*salad)/i;
/* --------- FIBRE QUALITY, not just fibre grams -----------------------------------------------------------
   OB's own Fibre Guide makes three points the planner reported nothing about: the four types do different
   jobs, plant VARIETY is what the American Gut Project actually measured, and a sudden jump in fibre is what
   causes the bloating people blame on the food. Total grams was the only number on the plan.               */
// One plant, however many forms it comes in. Bread, pita, pasta, couscous and a flour tortilla are all wheat, and
// counting them as five plants told a client their variety was better than it was. The same seed or vegetable
// counts once in any form (white and brown rice, oats and granola, peanut butter and peanuts, pickles and cucumber,
// edamame and tofu). Varieties people buy as different foods still count apart (black and kidney beans, iceberg and
// romaine, green beans and snap peas), and a multi-grain bread counts as its main grain only, so the count errs low.
// Branded foods were mapped from their USDA ingredient lists (FDC branded food CSV 2025-04, read 2026-09-30):
// Carb Balance, Carbe Diem, All-Bran, Grape-Nuts and Kashi GO all contain wheat; PBfit is peanut flour; Catalina
// Crunch is pea protein with potato, corn and chicory fibre, so it is not counted as a plant at all.
// [food name, the plant (a list for a blend, null = not counted), what to call this form of it]
const PLANT_OF = [
  [/^normandy vegetable blend/i, ["broccoli","cauliflower","carrots"], "frozen blend"],
  [/^cream of rice/i, "rice", "cream of rice"], [/^corn tortilla/i, "corn", "tortilla"], [/^arepa/i, "corn", "arepa"], [/^grits/i, "corn", "grits"],
  [/^popcorn/i, "corn", "popcorn"], [/^sweet corn/i, "corn", "sweet corn"],
  [/\brye\b/i, "rye", ""],
  [/^chickpea pasta/i, "chickpeas", "pasta"], [/^hummus/i, "chickpeas", "hummus"], [/^falafel/i, "chickpeas", "falafel"],
  [/^edamame pasta/i, "soy", "edamame pasta"], [/^edamame/i, "soy", "edamame"], [/^soybeans/i, "soy", "soybeans"],
  [/^tofu/i, "soy", "tofu"], [/^tempeh/i, "soy", "tempeh"], [/^tvp\b/i, "soy", "TVP"],
  [/pbfit|powdered peanut/i, "peanuts", "powdered peanut butter"], [/^peanut butter/i, "peanuts", "peanut butter"],
  [/^almond butter/i, "almonds", "almond butter"], [/^tahini/i, "sesame", "tahini"],
  [/^granola, high-protein/i, null, ""],   // the brands differ on whether there is any oat in it
  [/^catalina crunch/i, null, ""],
  [/^oat bran|^smartbran/i, "oats", "oat bran"], [/^granola/i, "oats", "granola"], [/^oats\b/i, "oats", "oats"],
  [/^wild rice/i, "wild rice", ""], [/^rice cake/i, "rice", "rice cakes"], [/^(white|brown) rice/i, "rice", ""],
  [/^buckwheat/i, "buckwheat", ""], [/^shirataki/i, "konjac", "shirataki noodles"], [/^seaweed/i, "seaweed", ""], [/^nori/i, "seaweed", "nori"],
  [/^hamburger bun/i, "wheat", "burger bun"], [/^naan\b/i, "wheat", "naan"],
  [/bread|pita|pasta|couscous|tortilla|bagel|english muffin|bulgur|seitan|wheat|bran|cereal/i, "wheat", ""],
  [/^refried beans/i, "pinto beans", "refried beans"], [/^(green|split) peas/i, "peas", ""],
  [/^raisins/i, "grapes", "raisins"], [/dates\b/i, "dates", ""], [/^pickles/i, "cucumber", "pickles"],
  [/^sauerkraut/i, "cabbage", "sauerkraut"], [/kimchi/i, "napa cabbage", "kimchi"],
  [/cauliflower/i, "cauliflower", ""], [/^broccoli/i, "broccoli", ""],
];
// plant foods filed under Protein or Condiments: soy and wheat proteins, falafel, olives (powders and isolates are not)
const PLANT_EXTRA = /^(tofu|tempeh|tvp\b|edamame|seitan|vital wheat gluten|falafel|olives)/i;
const GRAIN_FORMS = ["tortilla","pita","couscous","bagel","english muffin","pasta","crispbread","cereal","bread","bulgur","bran","seitan","gluten"];
function plantOf(f){
  const hit = PLANT_OF.find(([re]) => re.test(f.name));
  const plants = hit ? hit[1] : plainName(f);
  if(!plants) return null;
  let form = hit && hit[2] ? hit[2] : "";
  if(!form && hit && /^(wheat|rye)$/.test(hit[1])){ const w = GRAIN_FORMS.find(x => new RegExp("\\b"+x).test(f.name.toLowerCase())); form = w==="gluten" ? "wheat gluten" : w==="english muffin" ? "English muffin" : (w || ""); }
  return { plants: [].concat(plants), form: form || plainName(f) };
}
function plantVariety(week){
  const cats = window.OB_PLANT_CATS || [];
  const seen = new Map();
  (week||[]).forEach(d=>(d.meals||[]).forEach(m=>(m.items||[]).forEach(it=>{
    const f=FOOD_BY_ID[it.id]; if(!f || f.recipe) return;
    if(!cats.includes(f.cat) && !PLANT_EXTRA.test(f.name)) return;
    const p = plantOf(f); if(!p) return;
    p.plants.forEach(k => { if(!seen.has(k)) seen.set(k, new Set()); seen.get(k).add(p.form); });
  })));
  // "wheat (pita, couscous)": name a form only when the plant's own name is not already in it
  const label = k => { const stem = k.split(" ")[0].replace(/e?s$/,"");
    const forms = [...seen.get(k)].filter(x => !new RegExp("\\b"+stem).test(x));
    return forms.length ? `${k} (${forms.join(", ")})` : k; };
  const keys = [...seen.keys()].sort();
  return { count: seen.size, plants: keys.map(label), target: window.OB_PLANT_TARGET || 30 };
}
function fiberTypeCoverage(meals){
  const types = window.OB_FIBER_TYPES || [];
  // ranked by the fibre each food carries over the week: in plan order, a client's insoluble line named the 9 g rice
  // cake and cut the 60 g of spinach (2026-10-08)
  const fib = new Map();
  (meals||[]).forEach(m=>(m.items||[]).forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f) fib.set(f, (fib.get(f)||0) + (f.fiber_g||0)*(+it.grams||0)/100); }));
  const foods = [...fib.keys()].sort((a,b)=>fib.get(b)-fib.get(a));
  const hit = (t, f) => t.re.test(normName(f)) && !(t.not && t.not.test(normName(f)));
  return types.map(t=>{
    // "covered by your apple, avocado and almonds": the plate's own foods, so the line is about her plan, not fibre in general
    const sources = [...new Set(foods.filter(f=>hit(t, f)).map(f=>lowerFoodName(plainName(f))))].slice(0, 4);
    return { label:t.label, what:t.what, covered: foods.some(f=>hit(t, f)), sources,
             claim: (t.claim && t.claimRe && foods.some(f=>t.claimRe.test(normName(f)))) ? t.claim : "" };
  });
}
// A plan that lands at 45g for someone eating the typical 16g is an 6-week ramp delivered on day one.
function fiberRampNote(fiberG, P){
  const R = window.OB_FIBER_REFERENCE; if(!R) return "";
  // a client already eating this much (P.fiberNow, g a day, from their check-ins) has no jump to walk into: a client
  // ran 70-80g a day on Fiber One, and the note would have told him to build up from 16g (2026-09-30)
  if(P && +P.fiberNow > 0 && fiberG <= +P.fiberNow + R.rampPerWeek*2) return "";
  const jump = Math.round(fiberG - R.typicalIntake);
  if(jump < R.rampPerWeek*2) return "";
  const weeks = Math.ceil(jump / R.rampPerWeek);
  return `This plan runs about ${Math.round(fiberG)}g of fibre a day. A typical intake is around ${R.typicalIntake}g, and the usual advice is to add no more than about ${R.rampPerWeek}g a week. If you eat a lot less fibre than this now, tell me and I will set up your first ${weeks} weeks to build up to it.${window.OB_FIBER_WATER ? "" : " Drink more water as you go."}`;
}
// Two passes. The legume pass is the cheap, filling fiber add, but it spends carbs, so on a day that is
// already at its carb ceiling it has no room and used to give up with the day 10g short. Low-net-carb veg and
// psyllium cost almost no carbs, so retry on that source list before accepting a miss.
function boostFiber(meals, P){
  boostFiberPass(meals, P, tightCarbTarget(P));
  if(!tightCarbTarget(P) && mealsTotals(meals,false).fiber_g < fiberTargetG(P) - 0.4) boostFiberPass(meals, P, true);
}
function boostFiberPass(meals, P, tight){
  const tgt = fiberTargetG(P);
  // NON-tight day: a high-fiber legume side (chickpeas first) is the cheap, filling fiber add.
  // TIGHT-carb cut: beans/grains spend the tiny carb budget, so draw fiber from LOW-NET-CARB sources instead —
  // psyllium husk / bran (almost pure fiber) first, then the highest fiber-per-net-carb non-starchy veg
  // (Brussels / broccoli / artichoke / leafy greens). This is how a 30g-fiber floor is met at ~74g carb.
  const legumes = tight
    ? allowedFoods(P).filter(f => ( /psyllium|wheat bran|oat bran/i.test(f.name)
          // a ferment or pickle is a condiment, not a fibre side (sauerkraut landed on a tuna wrap with gut mode off)
          || (f.cat==="Vegetables" && (f.fiber_g||0)>=2 && netCarb(f)<=5 && !/sauerkraut|kimchi|pickle/i.test(f.name)) ))
        .sort((a,b)=> (/(psyllium|bran)/i.test(b.name)?1:0)-(/(psyllium|bran)/i.test(a.name)?1:0)
                   || (b.fiber_g/Math.max(netCarb(b),0.3)) - (a.fiber_g/Math.max(netCarb(a),0.3)))
    : allowedFoods(P).filter(f => /^(chickpeas|black beans|pinto beans|kidney beans|navy beans|white beans|lentils|split peas|edamame), /i.test(f.name))
        .sort((a,b)=> (/chickpea/i.test(a.name)?0:1)-(/chickpea/i.test(b.name)?0:1) || (b.fiber_g||0)-(a.fiber_g||0));
  if(!legumes.length) return;
  // a legume is ~calorie-neutral here: refineMeals shifts those calories off the starchy carb, so each
  // gram added is mostly a fiber gain. Size each add to the remaining gap and loop until the floor is met.
  // PROTEIN-SAFE: legumes are carb-heavy, so on a protein-tight day (e.g. high-protein vegan) an add can
  // force refine to shrink the dense protein. Snapshot grams before each add and revert if protein regresses.
  const proteinG = () => mealsTotals(meals, false).protein_g;
  const carbG    = () => mealsTotals(meals, false).carb_g;
  const protFloor = Math.min(proteinG(), 0.97*(+P.tPro||0));
  const carbCeil  = (+P.tCarb||0) ? 1.08*(+P.tCarb) : Infinity;   // legumes are carb-heavy: never blow carbs
  // On a TIGHT-carb cut the fiber goal IS the priority and low-net-carb veg/psyllium is ~2 cal/g of fiber, so
  // guard by CALORIES — but RELATIVE to where this day already sits, not the target. Extreme-protein builds
  // legitimately land a touch over the calorie target (fiber raises total carb), so an absolute target-based
  // ceiling sat right at the build's calorie level and reverted every psyllium add (fiber stalled at 21g).
  // A relative ceiling lets the genuinely low-cal fiber adds through while still blocking a runaway.
  const startKcal = mealsTotals(meals, false).kcal;
  // cap how much the fiber boost may add (tight): ~50 kcal of psyllium covers ~14g fiber, enough to top a
  // ~16-20g base up to 30g without inflating the day. Past that, accept fiber a touch under rather than
  // pushing calories well over the cut target — the explicit calorie/protein targets win the tie.
  const calCeil   = tight ? (startKcal + 50) : ((+P.tCal||0) ? 1.06*(+P.tCal) : Infinity);
  const addedIds = new Set();                                     // only OUR added sides — never pin a template legume
  // A pairing whose add had to be undone is not retried, but the pass moves on to the next one instead of
  // giving up: a vegetarian day stopped at 20g of fibre because its first vegetable side cost protein.
  const tried = new Set();
  for(let attempt=0; attempt<8; attempt++){
    const cur = mealsTotals(meals, false).fiber_g;
    if(cur >= tgt - 0.4) return;
    // don't bolt a bean side onto an EGG dish (a frittata ended up with more chickpeas than eggs) — eggs are
    // the dish; beans belong on a bowl/plate, not folded into an omelet.
    const savory = meals.filter(m=>/dinner|lunch/i.test(m.name)
      && !/migas|scramble|omelet|omelette|frittata|huevos|benedict|quiche/i.test(m.dish||"")
      // a spoon of chickpeas does not belong in a poke bowl, a sandwich or a pasta plate either
      && !/poke|sushi|sandwich|\btoast\b|\bwrap\b|pasta|noodle|burger|pizza/i.test(m.dish||"")
      && !m.items.some(it=>{const f=FOOD_BY_ID[it.id];return f&&f.recipe;}));
    // Pair the fibre source with a meal it BELONGS in, or add nothing. Chickpeas went on 87 of 480 days,
    // onto shrimp teriyaki and seitan stir-fries, and psyllium into a shrimp rice bowl. The bean follows the
    // cuisine (edamame with Asian dishes, black or pinto beans with Mexican, chickpeas or lentils with
    // Mediterranean and Indian, white beans with Italian or a soup or salad); psyllium and bran go into a
    // sweet breakfast or snack (oats, yogurt, a smoothie); a vegetable goes beside any savoury main.
    const LEG_FOR = [["asian",/^edamame/i],["mexican",/^(black beans|pinto beans|kidney beans)/i],["indian",/^(chickpeas|lentils|split peas)/i],
                     ["med",/^(chickpeas|lentils|white beans)/i],["italian",/^(white beans|navy beans|chickpeas)/i]];
    // Beans carry protein. On a day already at its protein number a bean side pushes it over (168g of edamame
    // put a shrimp dinner 20g over), so then only a vegetable or psyllium may add the fibre.
    const proteinFull = proteinG() >= 0.98*(+P.tPro||Infinity);
    const fitFood = (m, f) => {
      const tg = dishContext(m);
      if(proteinFull && f.cat!=="Vegetables" && !/psyllium|bran/i.test(f.name)) return false;
      if(/psyllium|bran/i.test(f.name)) return tg.has("sweet");
      if(f.cat==="Vegetables") return !tg.has("sweet") && /dinner|lunch/i.test(m.name);
      if(tg.has("sweet") || tg.has("eggs")) return false;
      for(const [tag,re] of LEG_FOR) if(tg.has(tag)) return re.test(f.name);
      return /soup|stew|salad|bowl/i.test(m.dish||"") && /^(white beans|chickpeas|lentils)/i.test(f.name);
    };
    const hosts = tight ? meals.filter(m=>!m.items.some(it=>{const f=FOOD_BY_ID[it.id];return f&&f.recipe;})) : savory;
    let main = null, leg = null;
    // ONE added vegetable side per meal: when the first one reached its size the loop used to reach for the next
    // vegetable on the SAME plate (a client's Greek chicken lunch got 150g of kale and 150g of collards, neither in the
    // recipe). And the side matches the plate's temperature: a cold wrap, salad or open sandwich gets a raw side,
    // a hot plate a cooked one (cooked kale sat beside a tuna salad wrap).
    const otherVeg = (m, x) => x.cat==="Vegetables" && m.items.some(it=>{ const g=FOOD_BY_ID[it.id]; return addedIds.has(it.id) && it.id!==x.id && g && g.cat==="Vegetables"; });
    for(let k=0; k<hosts.length && !leg; k++){
      const m = hosts[(attempt+k) % hosts.length];
      const fits = legumes.filter(x=>fitFood(m, x) && !tried.has(meals.indexOf(m)+"|"+x.id) && !otherVeg(m, x)
        && (roomFor(m) || m.items.some(it=>it.id===x.id && addedIds.has(it.id))));
      const cold = mealEatenCold(m);
      const tempOk = x => x.cat!=="Vegetables" || (cold ? /\braw\b/i.test(x.name) : !/\braw\b/i.test(x.name));
      const f = fits.find(tempOk) || fits.find(x=>x.cat!=="Vegetables");
      if(f){ main = m; leg = f; }
    }
    // Nothing fits as FOOD: psyllium is normally taken stirred into water anyway, so on the tight pass it goes
    // with the lightest meal as a labelled drink (like the protein shake line) rather than into a dish.
    let asDrink = false;
    if((!main || !leg) && tight){
      const psy = legumes.find(f=>/psyllium/i.test(f.name) && !tried.has("drink|"+f.id));
      const host = meals.filter(m=>roomFor(m) && !m.items.some(it=>{const f=FOOD_BY_ID[it.id];return f&&f.recipe;}))
                        .sort((a,b)=> mealsTotals([a],false).kcal - mealsTotals([b],false).kcal)[0];
      if(psy && host){ main = host; leg = psy; asDrink = true; }
    }
    if(!main || !leg) return;                 // nothing fits anywhere: leave fibre to the food choices, not a bolt-on
    const snapshot = meals.map(m=>m.items.map(it=>({id:it.id,grams:it.grams,fixed:it.fixed})));
    const perG = (leg.fiber_g||7)/100;
    // size against BOTH the fiber gap and remaining headroom. tight-carb veg is low-cal → allow generous grams
    // (the calorie guard below catches true overshoot); non-tight legumes are sized to the carb headroom.
    const carbRoom = tight ? 400 : (carbCeil===Infinity ? 150 : Math.max(0, carbCeil - carbG()));
    const byCarb = (leg.carb_g||25)>0 ? Math.round(carbRoom/(leg.carb_g/100)) : 150;
    const need = Math.round((tgt-cur)/perG);
    // DENSE fiber sources (psyllium husk / bran, ~30g+ fiber/100g) are potent: dose them in teaspoons (5-20g),
    // never a 40g+ "side". Veg/legume sides dose 40-200g. Cap the per-meal bump the same way.
    const dense = (leg.fiber_g||0) >= 25;
    // a bean side is a side: about half a cup to two-thirds (the published typical serving is ~90g). A RAW leafy
    // side is a side salad: 90g is about 3 cups of spinach (the harness flags a leafy portion past 95g)
    const leafyRaw = /\b(spinach|arugula|lettuce|romaine|kale|chard|watercress|spring mix|mixed greens|mesclun|spring greens|baby greens)\b/i.test(leg.name) && !/cooked/i.test(leg.name);
    const sideMax = leafyRaw ? 90 : (leg.cat==="Vegetables") ? 150 : 100;
    const addG = dense ? Math.min(20, Math.max(5, need)) : Math.min(sideMax, byCarb, Math.max(40, need));
    if(addG < (dense?4:25)){ return; }                            // no room to add without blowing carbs → stop
    // bump a side WE already added — search ALL meals, not just the current `main`, or a rotating main scatters
    // duplicate legume/psyllium sides across meals instead of growing the first (over-adds fiber/carbs).
    let have=null;
    meals.forEach(mm=>{ const h=mm.items.find(it=>addedIds.has(it.id)&&it.id===leg.id); if(h) have=h; });
    if(have){
      const lim = dense?30:Math.min(sideMax, maxServeG(leg));
      // a side already at its size limit cannot give more: count the pairing as used and move on, or the loop
      // re-picks the same full side eight times and the day stops short (20g of fibre, kale stuck at 200g)
      if((have.grams||0) >= lim - 0.5){ tried.add(meals.indexOf(main)+"|"+leg.id); meals.forEach(mm=>mm.items.forEach(it=>{ if(it.id===leg.id && addedIds.has(it.id)) tried.add(meals.indexOf(mm)+"|"+leg.id); })); continue; }
      have.grams = Math.min(lim, (have.grams||0)+addG);
    }   // respect the food's cap (chickpeas hit 260 vs a 230 cap)
    else { main.items.push({id:leg.id, grams:addG, fixed:true}); addedIds.add(leg.id); }
    if(asDrink){ const g = (main.items.find(it=>it.id===leg.id)||{}).grams || addG;
      main.fiberNote = `Fibre: stir ${g}g (about ${Math.max(1, Math.round(g/5))} tsp) of psyllium husk into a full glass of water and drink it with this meal. It is counted in the macros above.`; }
    // DENSE fiber (psyllium/bran) is ~0-protein and near-calorie-neutral, and there is no starch left on a
    // tight-carb cut for a re-solve to shave anyway — so skip the rebalance (it only risked crashing protein
    // and cost time). A veg/legume side meaningfully displaces the starch, so it gets a PROTEIN-PROTECTED
    // refine: pin the protein foods so the re-solve shrinks the starch, never trades protein away.
    if(!dense){
      const pinned=[];
      meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id];
        if(f && !it.fixed && (f.cat==="Protein"||f.cat==="Seafood"||isProteinPowder(f)||(f.cat==="Eggs & Dairy"&&(f.protein_g||0)>=7))){ it.fixed=true; pinned.push(it); } }));
      refineMeals(meals, P);
      pinned.forEach(it=>{ delete it.fixed; });
    }
    // undo + stop if the add still cost protein, OR blew the carb ceiling (non-tight), OR the CALORIE ceiling
    // (tight; fiber is allowed to raise the carb number since it is mostly 2-cal/g fiber).
    const blew = tight ? (mealsTotals(meals,false).kcal > calCeil) : (carbG() > carbCeil);
    if(proteinG() < protFloor - 0.5 || blew){
      meals.forEach((m,mi)=>{ m.items = snapshot[mi].map(s=>({id:s.id,grams:s.grams,fixed:s.fixed})); });
      if(asDrink) delete main.fiberNote;
      tried.add(asDrink ? "drink|"+leg.id : meals.indexOf(main)+"|"+leg.id);
      continue;
    }
  }
}

/* -------------------- totals + scoring -------------------- */
// essential amino acids (g) — summed across the day for the amino-acid breakdown + protein-quality score
const AA_KEYS = ["leucine_g","lysine_g","isoleucine_g","valine_g","threonine_g","methionine_g",
                 "cystine_g","phenylalanine_g","tyrosine_g","tryptophan_g","histidine_g"];
const SUM_KEYS = ["kcal","protein_g","carb_g","fat_g","fiber_g","sugar_g","satfat_g","sodium_mg",
                  "omega3_g","omega6_g","omega9_g","epa_dha_mg","ala_g"].concat(MICRO_KEYS).concat(AA_KEYS);
function mealsTotals(meals, withSupp){
  const t={}; SUM_KEYS.forEach(k=>t[k]=0);
  meals.forEach(m=>m.items.forEach(it=>{
    const f=FOOD_BY_ID[it.id]; if(!f) return; const r=it.grams/100;
    SUM_KEYS.forEach(k=>{ if(typeof f[k]==="number") t[k]+=f[k]*r; });
  }));
  if(withSupp!==false) SUPPLEMENTS.forEach(s=>{      // supplements personalize the daily score
    if(state.profile.supplements && state.profile.supplements[s.key]){
      const add = suppFor(s, state.profile).add;       // the product the client is told to buy, not always the default
      for(const k in add){ if(k in t) t[k]+=add[k]; }
    }
  });
  return t;
}
function totals(){
  return mealsTotals(state.meals, true);
}
function mealMacros(m){
  const t={kcal:0,protein_g:0,carb_g:0,fat_g:0};
  m.items.forEach(it=>{const f=FOOD_BY_ID[it.id];if(!f)return;const r=it.grams/100;
    t.kcal+=f.kcal*r;t.protein_g+=f.protein_g*r;t.carb_g+=f.carb_g*r;t.fat_g+=f.fat_g*r;});
  return t;
}
// estimated leucine (% of protein by food type), ~2.5g/meal triggers maximal muscle-protein
// synthesis; plant proteins are leucine-poorer, so this flags low main meals (esp. on plant diets).
function leucineFactor(f){
  const n=(f.name+" "+(f.usda||"")).toLowerCase();
  if(/whey|protein powder/.test(n)) return 0.105;
  if(/egg|milk|yogurt|kefir|cheese|cottage|skyr|casein/.test(n)) return 0.095;
  if(f.cat==="Protein"||f.cat==="Seafood") return /seitan/.test(n) ? 0.075 : 0.085;
  if(/tofu|tempeh|edamame|soy/.test(n)) return 0.078;
  return 0.072;   // legumes, grains, nuts, veg
}
function mealLeucine(m){
  let leu=0; m.items.forEach(it=>{const f=FOOD_BY_ID[it.id]; if(!f) return; leu+=(f.protein_g*it.grams/100)*leucineFactor(f);});
  return leu;
}
// PROTEIN QUALITY (DIAAS tiers, per the verified research). HIGH = complete, DIAAS >= ~0.9: any animal meat/
// poultry/fish, eggs, dairy/cheese, whey, or soy. MEDIUM = a balanced pea+rice blend (complete when blended).
// LOW = single plant proteins (seitan/wheat gluten is lysine-limited; lone beans/lentils/chickpeas are SAA-
// limited). Used to enforce Dylan's rule: a day shouldn't be built on low-quality protein.
function proteinTier(f){
  if(!f || (f.protein_g||0) < 3) return null;
  const n=(f.name+" "+(f.usda||"")).toLowerCase(), a=animalFlags(f);
  if(/pea & rice|pea and rice/.test(n)) return "medium";
  if(/seitan|wheat gluten/.test(n)) return "low";
  if(/whey|casein/.test(n)) return "high";
  if(a.meat || a.seafood || a.dairy || (/\begg\b/.test(n) && !/eggplant/.test(n))) return "high";
  if(/tofu|tempeh|edamame|soybean|\bsoy\b|\btvp\b|textured (?:soy|vegetable)/.test(n)) return "high";  // soy is the complete plant protein
  if(f.cat==="Legumes" || f.cat==="Protein" || /bean|lentil|chickpea|hummus|falafel|\bpea\b/.test(n)) return "low";
  if(f.cat==="Grains & Starches" && (f.protein_g||0) >= 5) return "low";   // grain protein (granola/bread/oats) is low quality
  return null;
}
// FAO/WHO/UNU 2013 indispensable amino-acid scoring pattern (mg per g protein), >3y/adult — the basis for
// judging whether a DAY supplies enough of each essential amino acid. SAA = met+cys, AAA = phe+tyr.
const FAO_AA_PATTERN = { histidine:16, isoleucine:30, leucine:61, lysine:48, SAA:23, AAA:41, threonine:25, tryptophan:6.6, valine:40 };
const AA_LABEL = { histidine:"Histidine", isoleucine:"Isoleucine", leucine:"Leucine", lysine:"Lysine", SAA:"Methionine+Cysteine", AAA:"Phenylalanine+Tyrosine", threonine:"Threonine", tryptophan:"Tryptophan", valine:"Valine" };
// Whole-day amino-acid breakdown + protein-quality summary. Returns mg-per-g-protein for each indispensable
// amino acid vs the FAO pattern, the day's limiting amino acid, total leucine, and the % of protein from
// high-quality (complete, DIAAS>=0.9) sources. Dylan: "do an amino acid breakdown so we don't just get low-
// quality proteins, and most meals should have a meat/egg/animal base."
function aminoBreakdown(meals){
  const t = mealsTotals(meals, false);
  const P = t.protein_g || 0;
  if(P < 1) return null;
  // grams of each scored amino acid across the day (SAA = met+cys, AAA = phe+tyr)
  const g = {
    histidine: t.histidine_g||0, isoleucine: t.isoleucine_g||0, leucine: t.leucine_g||0, lysine: t.lysine_g||0,
    SAA: (t.methionine_g||0)+(t.cystine_g||0), AAA: (t.phenylalanine_g||0)+(t.tyrosine_g||0),
    threonine: t.threonine_g||0, tryptophan: t.tryptophan_g||0, valine: t.valine_g||0,
  };
  const rows = []; let limiting=null, limScore=Infinity;
  for(const k in FAO_AA_PATTERN){
    const perG = (g[k]*1000) / P;                 // mg amino acid per g protein
    const ratio = perG / FAO_AA_PATTERN[k];       // >=1 means it meets the pattern
    rows.push({ key:k, label:AA_LABEL[k], perG:Math.round(perG), target:FAO_AA_PATTERN[k], ratio });
    if(ratio < limScore){ limScore = ratio; limiting = k; }
  }
  // high-quality protein share (grams of protein from high-tier foods / total food protein)
  let highP=0, lowP=0;
  meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(!f) return; const tier=proteinTier(f); const pg=(f.protein_g||0)*it.grams/100;
    if(tier==="high") highP+=pg; else if(tier==="low") lowP+=pg; }));
  const highTierPct = P>0 ? Math.round(100*highP/P) : 0;
  return {
    rows, limiting, limitingLabel:AA_LABEL[limiting], allMet: limScore >= 1,
    leucineTotal: g.leucine, proteinG:P, highTierPct, lowTierG:Math.round(lowP),
  };
}
/* -------------------- inline food swaps (quick equal-role alternatives) -------------------- */
function swapSuggestions(it, P){
  const cur=FOOD_BY_ID[it.id]; if(!cur || cur.recipe) return [];
  const rl=role(cur);
  const key = rl==="protein"?"protein_g":rl==="carb"?"carb_g":rl==="fat"?"fat_g":"fiber_g";
  let pool=allowedFoods(P).filter(f=>!f.recipe && f.id!==cur.id && role(f)===rl && !/garlic|miso|sauerkraut|kimchi/i.test(f.name));   // skip flavorings/condiments as swaps
  pool.sort((a,b)=> Math.abs((a[key]||0)-(cur[key]||0)) - Math.abs((b[key]||0)-(cur[key]||0)));   // closest macro first
  pool=pool.slice(0,8).sort((a,b)=> ((isDisliked(a,P)?1:0)-(isDisliked(b,P)?1:0)) || ((isLiked(a,P)?0:1)-(isLiked(b,P)?0:1)));
  return pool.slice(0,3);
}
let _swapCloser=null;
function closeSwapMenu(){ const m=document.querySelector(".swap-menu"); if(m) m.remove(); if(_swapCloser){ document.removeEventListener("click",_swapCloser); _swapCloser=null; } }
function showSwapMenu(btn, mi, ii){
  closeSwapMenu();
  const it=state.meals[mi].items[ii], P=state.profile, cur=FOOD_BY_ID[it.id];
  const apply=id=>{ snapshotMeals(); state.meals[mi].items[ii].id=id; closeSwapMenu(); fitDayToTargets(); render(); };
  const sugs=swapSuggestions(it, P);
  const menu=document.createElement("div"); menu.className="swap-menu";
  menu.innerHTML = `<div class="sm-head">Swap “${esc(cur?cur.name:"")}” for an equal-${cur?role(cur):"role"} option</div>` +
    (sugs.length ? sugs.map(f=>`<button class="sm-opt" data-id="${f.id}"><b>${esc(f.name)}</b><span>${Math.round(f.protein_g)}P · ${Math.round(f.carb_g)}C · ${Math.round(f.fat_g)}F /100g</span></button>`).join("")
                 : `<div class="sm-none">No quick match, search instead.</div>`) +
    `<button class="sm-search">🔍 Search all foods…</button>`;
  document.body.appendChild(menu);
  const r=btn.getBoundingClientRect();
  menu.style.top=(r.bottom+window.scrollY+4)+"px";
  menu.style.left=Math.max(8, Math.min(r.right+window.scrollX-230, window.innerWidth-238))+"px";
  menu.querySelectorAll(".sm-opt").forEach(b=>b.addEventListener("click", e=>{ e.stopPropagation(); apply(b.dataset.id); }));
  menu.querySelector(".sm-search").addEventListener("click", e=>{ e.stopPropagation(); closeSwapMenu(); openPicker(f=>apply(f.id)); });
  _swapCloser=closeSwapMenu;
  setTimeout(()=>{ if(_swapCloser) document.addEventListener("click", _swapCloser, {once:true}); }, 0);
}
// Reference intakes change at 51 (NASEM DRIs): a woman's iron drops from 18 to 8 mg after menopause and her calcium rises
// to 1,200 mg; magnesium, vitamin B6 and omega-6 move a little for both sexes. dri.js holds the 19-50 values; a profile
// with an age of 51 or more gets the 51-70 ones (a client, 54, 2026-10-30: her iron read 83% of 18 mg).
const HOT_RUB = /cayenne|chil[ei]|chipotle|scotch bonnet|habanero|jalape|red pepper flake|hot sauce|harissa|gochu|\bheat\b/i;
const DRI_51_70 = { female:{ calcium_mg:1200, iron_mg:8, magnesium_mg:320, vit_b6_mg:1.5, omega6_g:11 },
                    male:{ magnesium_mg:420, vit_b6_mg:1.7, omega6_g:14 } };
const driOf = P => Object.assign({}, DRI[(P&&P.sex)||"female"] || {}, (P && +P.age >= 51 && DRI_51_70[P.sex]) || {});
const driAgeLabel = P => P && +P.age >= 51 ? "adults 51-70" : "adults 19-50";
function microTarget(key){
  // Fiber is a MINIMUM to meet/exceed: research-backed floor of 30g, scaling up
  // with calories (14g/1000kcal). OB coaching runs fiber high on purpose.
  if (key==="fiber_g") return Math.max(30, Math.round(14*(+curTargets().tCal)/1000));
  return driOf(state.profile)[key];
}
const clamp01 = x => Math.max(0, Math.min(1, x));
function macroAccuracy(t){
  // The prescription is protein/carb/fat. Calories are DERIVED from these and shown
  // separately, including them double-penalizes the inherent ~4% gap between the 4/4/9
  // estimate and real USDA Atwater calories, which isn't a planning error.
  const T=curTargets();
  const items=[["protein_g",+T.tPro],["carb_g",+T.tCarb],["fat_g",+T.tFat]];
  let s=0,n=0; items.forEach(([k,tg])=>{ if(tg>0){ s+=clamp01(1-Math.abs(t[k]-tg)/tg); n++; } });
  return n ? s/n : 0;               // 0..1
}
function microScore(t){
  let s=0,n=0;
  MICRO_KEYS.forEach(k=>{ const tg=microTarget(k); if(!tg) return; s+=clamp01(t[k]/tg); n++; });
  // Score EPA+DHA only, the marine omega-3 that matters. Total omega-3 is NOT scored because it's
  // ALA-inflated (chia/flax/hemp): ALA converts only ~5-10% to EPA/DHA, so crediting it would let a
  // chia-heavy plan look omega-3-replete when EPA+DHA is actually low. Total omega-3 stays as context.
  { const tg=microTarget("epa_dha_mg"); if(tg){ s+=clamp01(t.epa_dha_mg/tg); n++; } }
  return n ? s/n : 0;               // 0..1
}

/* -------------------- render -------------------- */
function renderDayTabs(){
  const wrap=$("dayTabs"); if(!wrap) return;
  wrap.innerHTML = state.week.map((d,i)=>{
    const cal = d.meals.length ? Math.round(mealsTotals(d.meals,false).kcal) : 0;
    return `<button class="day-tab ${i===state.dayIdx?"on":""} ${d.meals.length?"filled":""}" data-i="${i}">
      <b>${numberedDays() ? dayLabel(i) : d.name.slice(0,3)}</b><span>${cal?cal+" cal":"n/a"}</span></button>`;
  }).join("");
  wrap.querySelectorAll(".day-tab").forEach(b=>b.addEventListener("click",()=>switchDay(+b.dataset.i)));
  const cd=$("copyDayBtn"); if(cd) cd.style.display = state.meals.length ? "" : "none";
}
function render(){
  const has = state.meals.length>0;
  $("emptyPlan").style.display = has ? "none" : "block";
  renderDayTabs();
  renderMeals();
  renderScore();
}

function portionOptions(f, grams){
  let html = `<option value="">grams →</option>`;
  (f.portions||[]).forEach(p=>{
    html += `<option value="${p.grams}">${esc(p.label)} (${p.grams}g)</option>`;
  });
  return html;
}
function formBadge(f){
  const map={dry:"DRY",cooked:"COOKED",recipe:"RECIPE"};
  const t=map[f.form]; return t ? ` <span class="form-badge ${f.form}">${t}</span>` : "";
}
// A treat or snack is made at home from its ingredient list, so each ingredient reads in a kitchen measure the
// way plate items do ("Cocoa powder, unsweetened: 2 tbsp (10g)", "Tofu, firm: ⅓ package (14 oz) (150g)"),
// not grams alone.
function recipeIng(i){ const g = foodByName(i.name); return g ? `${esc(i.name)}: ${bestPortion(g, i.g)}` : `${esc(i.name)} (${i.g}g)`; }
// The recipe makes one BATCH (fixed ingredient amounts + steps); macros scale with grams eaten.
function recipeLine(f){
  if(!f.recipe) return "";
  const ings = (f.ingredients||[]).map(recipeIng).join(" · ");
  const makes = (f.makes>1) ? ` <span class="fr-makes">makes ${f.makes}</span>` : "";
  const steps = (f.steps&&f.steps.length) ? `<ol class="fr-steps">${f.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol>` : "";
  return `<div class="fr-recipe"><b>Recipe${makes}:</b> ${ings}</div>${steps}`;
}
function foodRow(mi, ii, it){
  const f=FOOD_BY_ID[it.id]; if(!f) return "";
  const r=it.grams/100;
  const mac=`${Math.round(f.kcal*r)} cal · P${Math.round(f.protein_g*r)} C${Math.round(f.carb_g*r)} F${Math.round(f.fat_g*r)}`;
  return `<div class="food-row" data-mi="${mi}" data-ii="${ii}">
    <div class="food-name"><b>${esc(f.name)}</b>${formBadge(f)}<span class="fr-portion">${esc(householdLabel(f, it.grams))}</span><span class="fr-macros">${mac}</span>${recipeLine(f)}</div>
    <input class="grams" type="number" min="0" step="5" value="${it.grams}" aria-label="Grams of ${esc(f.name)}">
    <select class="portion" aria-label="Portion preset for ${esc(f.name)}">${portionOptions(f, it.grams)}</select>
    <div class="fr-tools">
      <button class="info" title="Verify / details">ⓘ</button>
      <button class="swap" title="Swap food">⇄</button>
      <button class="del" title="Remove">✕</button>
    </div>
  </div>`;
}
// per-meal cooking guidance (method + smoke-point-matched oil + optional seasoning)
const cleanSeason = s => String(s||"").replace(/^\s*optional\s*:?\s*/i,"").trim();
// The library's seasoning lines named fat amounts the solved list contradicts: a client's steak said "add 1 Tbsp butter"
// and "Mash: warm milk, 1 Tbsp butter" beside a list of 2 tsp (2026-10-29). Those lines now say "the butter on your list"; a
// plan saved before the fix carries the old line, so it prints the library's current one. A hand-written line is left alone.
const SEASON_FAT_AMT = /\b(?:\d+(?:\.\d+)?|\d\/\d|a|one|two)\s*(?:tbsp|tablespoons?|tsp|teaspoons?)\s+(?:of\s+)?(?:melted\s+)?(?:butter|ghee|(?:(?:extra[- ]virgin\s+)?(?:olive|avocado|canola|coconut|vegetable)\s+)?oil)\b/i;
function seasonText(c, meal){
  const s = c && c.season; if(!s || !SEASON_FAT_AMT.test(s)) return s;
  const t = meal && meal.dish ? TEMPLATES.find(x=>x.title===meal.dish) : null;
  return t && t.season && t.season!==s && !SEASON_FAT_AMT.test(t.season) ? t.season : s;
}
// USDA/FDA safe-minimum internal temps keyed to the protein actually in the meal, so a beginner cook
// isn't guessing. Idiot-proof: tells you the number + a thermometer reminder.
function cookTemp(meal){
  if(!meal || !meal.items) return "";
  // last night's dinner, boxed: it was cooked to temperature then, and today it is reheated (USDA: leftovers to 165F)
  if(meal.cook && meal.cook.reheat) return "Reheat leftovers until steaming hot all the way through, <b>165&deg;F</b>. Use a food thermometer to be sure.";
  // canned fish and meat are cooked in the can: a tuna salad was told to cook its fish to 145F (2026-09-30). Broth and
  // stock come cooked too: a client's steak ramen was told to cook chicken to 165F for its chicken broth (2026-10-05)
  const n = meal.items.map(it=>(FOOD_BY_ID[it.id]||{}).name||"").filter(x=>!/\bcanned\b|\bbroth\b|\bstock\b|bouillon/i.test(x)).join(" | ").toLowerCase();
  const tips=[];
  if(/chicken|ground turkey|turkey ground|ground chicken/.test(n)) tips.push("chicken &amp; ground poultry to <b>165&deg;F</b>");
  else if(/turkey/.test(n)) tips.push("turkey to <b>165&deg;F</b>");
  // the database names it "Beef, ground 93/7", so "ground beef" alone never matched: no plan with ground beef printed
  // its 160F line (a client's taco skillet and burger, 2026-10-02)
  // the meat the dish has, not "beef/pork" on a beef burger (a client's client review, 2026-10-09)
  const gm = ["beef","pork","lamb","veal"].filter(k => new RegExp("ground "+k+"|"+k+", ground").test(n));
  if(gm.length) tips.push("ground " + (gm.length>1 ? gm.slice(0,-1).join(", ")+" and "+gm[gm.length-1] : gm[0]) + " to <b>160&deg;F</b>");
  if(/\bbeef\b|steak|sirloin|pork chop|pork tenderloin|\blamb\b|\bpork\b/.test(n) && !/ground/.test(n)) tips.push("steaks, chops &amp; pork to <b>145&deg;F</b>, then rest 3 min");
  // sushi's fish is eaten raw by design (its steps say to buy fish sold for eating raw), so it gets no cook-to-145F line
  const rawFish = /sushi|sashimi|crudo|tartare|ceviche/i.test(meal.dish||"");
  if(!rawFish && /salmon|tuna|\bcod\b|tilapia|trout|mackerel|halibut|haddock|pollock|snapper|sardine|\bfish\b|shrimp|scallop|mussel|crab/.test(n)) tips.push("fish &amp; seafood to <b>145&deg;F</b> (opaque and flakes easily)");
  // not in a drink: carton egg whites in a smoothie are pasteurized, and "cook eggs until set" contradicted the recipe
  if(/\begg/.test(n) && !/eggplant/.test(n) && !mealEatenCold(meal))
    tips.push(/egg white/.test(n) && !/egg, whole|whole egg|egg yolk|hard-boiled|scrambled|fried egg/.test(n)
      ? "egg whites until firm, and egg dishes to <b>160&deg;F</b>"     // a mug cake of whites has no yolk to firm up
      : "eggs until the yolks and whites are firm, and egg dishes to <b>160&deg;F</b>");
  if(!tips.length) return "";
  return "Cook " + tips.join("; ") + ". Use a food thermometer to be sure.";
}
const COOK_DISCLAIMER = "Cook times are a guide. Cook to safe internal temperatures with a thermometer; times vary by your equipment and cut.";
// Meal-prep / food-storage guidance is the real liability surface (fridge days, freezing, reheating). This
// frames the whole playbook as general recommendations, not a food-safety guarantee, so OB Health is not on
// the hook for food handled and stored in a client's own kitchen. Dylan: "make it so we aren't legally
// liable for the meal prep, say this is just recommendations."
const PREP_DISCLAIMER = "These meal-prep, storage, freezing, and reheating times are general recommendations only, not food-safety guarantees. Actual safe storage life depends on your refrigerator and freezer temperature, how fresh the ingredients were, and how the food is handled and cooled. Follow USDA and FDA food-safety guidance, keep your fridge at or below 40°F, cool food within 2 hours, and when in doubt, throw it out. You prepare, store, and reheat this food at your own discretion; OB Health and your coach are not responsible for food handled or stored in your home.";
// MEAL-PREP COOK SCHEDULES (day 0 = Sunday). Each cook covers a run of consecutive days: its menu is cooked once
// and eaten on exactly those days. "weekly" (one Sunday cook, menus rotating) has no entry here.
//   3-day batches: nothing is eaten more than 2 days after it was cooked, so no container needs the freezer, and
//   fish and egg dishes (the two that lose quality fastest in the fridge) stay on the menu. Seven days do not
//   split into threes, so Saturday is a single fresh-cook day; that is what keeps every batch inside 3 days.
//   4-day batches: two cooks, Sunday and Thursday. The oldest container is eaten 3 days after cooking. Meals are
//   picked so each one either keeps that long or freezes cleanly (no egg dishes in the 4-day batch).
// A `fresh` cook is not a batch: its meals are cooked and eaten the same day, from the whole recipe library.
const PREP_SCHEDULES = {
  twice: { cooks:[{day:0, days:[0,1,2]}, {day:3, days:[3,4,5,6]}],
    title:"Meal-prep playbook: cook Sunday and Wednesday",
    cookDays:"Sunday's cook covers Sunday to Tuesday, and Wednesday's covers Wednesday to Saturday. Any meal that will not keep until Saturday says so on its card: freeze that container on Wednesday and move it to the fridge Friday night." },
  "3day": { cooks:[{day:0, days:[0,1,2]}, {day:3, days:[3,4,5]}, {day:6, days:[6], fresh:true}],
    title:"Meal-prep playbook: 3-day batches (cook Sunday and Wednesday, Saturday fresh)",
    cookDays:"Sunday's cook covers Sunday to Tuesday, and Wednesday's covers Wednesday to Friday. Saturday you cook fresh, one day's meals, no batch. Nothing in this plan is eaten more than 2 days after it was cooked, so nothing needs the freezer and every container tastes close to the day you made it. This is the schedule where fish and egg dishes hold up best." },
  // ONE batch, a 3-day plan a client rotates in when her shifts call for it (a client's 3-meal and lighter plans,
  // 2026-10-06): one cook, Day 1 to Day 3, and no other days in the plan.
  batch3: { cooks:[{day:0, days:[0,1,2]}],
    title:"Meal-prep playbook: one 3-day batch",
    cookDays:"One cook covers this whole plan: cook on Day 1 and it feeds you Day 1 to Day 3. The last container is eaten 2 days after it was cooked, inside the USDA 3 to 4 day window for cooked food." },
  "4day": { cooks:[{day:0, days:[0,1,2,3]}, {day:4, days:[4,5,6]}],
    title:"Meal-prep playbook: 4-day batches (cook Sunday and Thursday)",
    cookDays:"Sunday's cook covers Sunday to Wednesday, and Thursday's covers Thursday to Saturday. Your oldest container is eaten 3 days after it was cooked, inside the USDA 3 to 4 day window for cooked leftovers. Any meal that should not sit that long says so on its card: freeze that one container on the cook day and move it to the fridge the night before." },
};
const prepSchedule = P => { P = P || state.profile; return (P && P.prep && PREP_SCHEDULES[P.prepCook]) || null; };
const prepTwice = () => !!prepSchedule();          // any multi-cook schedule (kept name: every caller means "not one Sunday cook")
const prepTitle = () => { const S = prepSchedule();
  if(numberedDays()) return S ? dayWords(S.title) : "Meal-prep playbook: cook on Day 1";
  return S ? S.title : "Sunday meal-prep playbook"; };
const prepCookDaysText = () => { const S = prepSchedule();
  if(S && S===PREP_SCHEDULES.batch3) return S.cookDays;
  if(numberedDays()) return "Day 1 is your first cook: make it the day off before a run of shifts and count the rest from there. "
    + (S ? dayWords(S.cookDays) : "Everything in this plan is cooked on Day 1 and eaten through Day 7.");
  if(S && S===PREP_SCHEDULES["3day"]){
    const has = re => (state.week||[]).some(d=>(d.meals||[]).some(m=>(m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && re(f); })));
    const fish = has(f=>f.cat==="Seafood"), eggs = has(f=>/^egg/i.test(f.name));
    const holds = fish && eggs ? "fish and egg dishes" : fish ? "fish" : eggs ? "egg dishes" : "";
    // a breakfast that comes out of the cook day's batch means cooking before breakfast; the evening before still keeps
    // every container inside USDA's 3 to 4 days (reviewer, 2026-10-03)
    return S.cookDays.replace(" This is the schedule where fish and egg dishes hold up best.", holds ? ` This is the schedule where ${holds} hold up best.` : "")
      + " If a cook-day morning is rushed, cook the evening before: the last container is then 3 days old, still inside the USDA 3 to 4 day window for cooked food.";
  }
  return S ? S.cookDays : ""; };
// Which cook a day belongs to, and which day a rendered meal sits on (cards and the PDF render the meal objects
// held in state.week, so identity finds it; the dish name is the fallback for a detached copy).
const prepCookOfDay = (S, di) => S ? S.cooks.find(c => c.days.indexOf(di) >= 0) || null : null;
function prepDayOfMeal(meal){
  const W = state.week || [];
  for(let di=0; di<W.length; di++) if((W[di].meals||[]).indexOf(meal) >= 0) return di;
  if(meal && meal.dish) for(let di=0; di<W.length; di++) if((W[di].meals||[]).some(m=>m.dish===meal.dish)) return di;
  return -1;
}
// MEAL-PREP storage by food type: FRIDGE DAYS AFTER THE COOK DAY (how USDA FoodKeeper and FSIS count them: cooked
// Sunday, "3 days" means eat by Wednesday), freezer months, and whether it freezes well. Each value is the low end
// of the FDA Refrigerator & Freezer Storage Chart (2018) / FoodKeeper / FSIS range, audited 2026-09-23. The most
// perishable stored food in a meal sets its limit; add-fresh garnishes do not count.
// Fish is the one flavour call: cooked fish is safe 3 to 4 days, but it is the worst meat for warmed-over flavour
// (lipid oxidation measurable after 3 days chilled, Tichivangana & Rhee 1985), so plans treat it as a 2-day food
// and freeze a day-3 container instead.
const STORAGE_MAP = {
  poultry:   {fridge:3, freezer:4, freeze:true,  label:"cooked chicken/turkey"},
  redmeat:   {fridge:3, freezer:2, freeze:true,  label:"cooked beef/pork"},
  groundmeat:{fridge:3, freezer:2, freeze:true,  label:"cooked ground meat"},
  fish:      {fridge:2, freezer:2, freeze:true,  label:"cooked fish/shrimp", note:"safe 3 to 4 days, best within 2"},
  fishsalad: {fridge:3, freezer:0, freeze:false, label:"canned-fish salad"},
  hbegg:     {fridge:7, freezer:0, freeze:false, label:"hard-boiled eggs"},
  eggdish:   {fridge:3, freezer:2, freeze:true,  label:"baked egg dish (bites, frittata, burritos)"},
  eggsoft:   {fridge:3, freezer:0, freeze:false, label:"deviled eggs/egg salad"},
  tofu:      {fridge:3, freezer:3, freeze:true,  label:"cooked tofu/tempeh/seitan"},
  grain:     {fridge:4, freezer:3, freeze:true,  label:"cooked grains"},
  pasta:     {fridge:3, freezer:1, freeze:true,  label:"cooked pasta"},
  beans:     {fridge:3, freezer:3, freeze:true,  label:"cooked beans/lentils"},
  potato:    {fridge:3, freezer:1, freeze:true,  label:"cooked potato"},
  rveg:      {fridge:3, freezer:1, freeze:true,  label:"cooked vegetables or fruit"},
  rawveg:    {fridge:3, freezer:0, freeze:false, label:"cut raw vegetables"},
  fruit:     {fridge:3, freezer:0, freeze:false, label:"cut fruit"},
  dairy:     {fridge:7, freezer:0, freeze:false, label:"yogurt/cottage cheese"},
  // overnight oats, chia pudding, yogurt-and-oat jars: 2 days (Ohio State 2024) to 3 (NC State) once mixed
  jar:       {fridge:3, freezer:0, freeze:false, label:"overnight oats/chia jars"},
  // Hard and shredded cheese and butter freeze well and outlast every cooked food they sit on, so a cheddar-topped
  // chili is still a freezer meal. Yogurt, milk, cottage cheese and cream cheese split or weep when frozen.
  cheese:    {fridge:21, freezer:3, freeze:true, label:"cheese/butter"},
  // Egg baked into a batter (pancakes, muffins, baked oats, bars) is a baked good, not an egg dish.
  baked:     {fridge:4, freezer:2, freeze:true,  label:"pancakes/muffins/baked oats"},
  dip:       {fridge:5, freezer:0, freeze:false, label:"hummus/dips"},
};
// In-depth, idiot-proof SUNDAY PREP PLAYBOOK (research-backed, FDA/USDA) — data lives in sauces.js so the
// big reference text stays out of app.js. Sections: equipment, containers, before_you_start, timeline,
// cooling, labeling, storage, reheating, keep_it_tasty, troubleshooting, freezing.
const PREP_GUIDE = window.OB_PREP_GUIDE || {};
// The reference appendix (storage chart, sauce and rub library) is generic copy, so it happily recommends a
// food the client is allergic to right after the intro promised it was excluded. Build one matcher from the
// client's HARD exclusions (allergens + can't-haves) and run the appendix through it.
function refBannedRe(P){
  const kw = [];
  ALLERGENS.forEach(a=>{ if(P && P.allergens && P.allergens[a.key]) kw.push(...a.kw); });
  (P && P.cantHave || []).forEach(x=>{ const t=String(x||"").trim(); if(t.length>2) kw.push(t); });
  if(!kw.length) return null;
  return new RegExp("\\b("+kw.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")e?s?\\b","i");
}
// drop the banned items out of a comma-separated "pairs with" list, keep the rest
function refStripList(text, re){
  if(!re || !text) return text||"";
  const kept = String(text).split(/,\s*/).filter(x=>!re.test(x));
  return kept.join(", ");
}
// The playbook fitted to the client's kitchen. The general one heats an oven to 425F and roasts on two sheet pans; a
// client with no oven (an air fryer, pots and pans) gets a stovetop and air-fryer version of the same cook, and no
// oven racks or parchment on the list (built for a client, 2026-09-30).
const PREP_TIMELINE_NO_OVEN = [
  {when:"0:00", step:"Fill the large pot with water, add a big pinch of salt, and set it on high heat for your rice or grains. Preheat the air fryer to 380F if yours needs it."},
  {when:"0:05", step:"Wash and chop the vegetables on the VEG board, and keep them away from the raw meat."},
  {when:"0:10", step:"On the RAW-MEAT board, trim and pat the chicken dry, then rub it with a little oil and the seasoning. Wash your hands and the meat board with hot soapy water right now."},
  {when:"0:12", step:"Cook the rice or grains by the package, lid on, with a timer set."},
  {when:"0:15", step:"Air-fry the chicken in one layer with space between the pieces, about 16 to 22 minutes, flipping halfway. Cook it in two rounds if it does not all fit."},
  {when:"0:15", step:"At the same time, heat the 12 inch skillet on medium-high for any ground beef or steak: break ground meat up and cook it until no pink remains and it reads 160F; sear steak and check it with the thermometer."},
  {when:"0:32", step:"Check the chicken with the thermometer in the thickest part: it must read 165F. If it is under, give it 3 to 5 more minutes and check again."},
  {when:"0:35", step:"Steam or saute the vegetables in the skillet 4 to 6 minutes, until just tender with a little bite left."},
  {when:"0:40", step:"Move everything into clean bowls to cool, spread out, not stacked, so the heat escapes fast. Rice and grains go in the fridge within 1 hour."},
  {when:"0:55", step:"Portion into containers by the Pack each container amounts on each meal card, lid them, label the date, and put them in the fridge."}
];
function prepGuideFor(P){
  const G0 = prepGuideKitchen(P);
  if(!numberedDays(P)) return G0;
  // a numbered week says "Day 4" everywhere, the guide's tips included ("pesto Monday, salsa Tuesday")
  const walk = v => typeof v==="string" ? dayWords(v, P) : Array.isArray(v) ? v.map(walk)
    : (v && typeof v==="object") ? Object.fromEntries(Object.entries(v).map(([k,x])=>[k, walk(x)])) : v;
  return walk(G0);
}
function prepGuideKitchen(P){
  const G = PREP_GUIDE || {};
  if(!P || !P.noOven) return G;
  const noOven = x => !/oven|sheet pan|parchment/i.test(String(x));
  const equipment = (G.equipment||[]).filter(noOven).concat(["A kitchen timer (your phone works)"])
    .concat(P.airFryer ? ["Your air fryer, for any recipe or swap that uses it"] : []);   // (it said "for the chicken, beef and vegetables" beside skillet recipes, a client, 2026-11-05)
  return Object.assign({}, G, { equipment, before_you_start:(G.before_you_start||[]).filter(noOven), timeline:PREP_TIMELINE_NO_OVEN });
}
function prepGuideHTML(){
  const G = prepGuideFor(state.profile);
  const sub = (t,inner) => inner ? `<div style="margin:.7em 0 .3em"><div style="font-weight:700;color:#2f6b34">${t}</div>${inner}</div>` : "";
  const ul = (arr,sty="") => (arr&&arr.length) ? `<ul style="margin:.2em 0;padding-left:20px${sty}">${arr.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>` : "";
  const box="background:#eef6ee;border:1px solid #cfe6cf;border-radius:10px;padding:12px 14px;margin:0 0 14px;font-size:13px;line-height:1.5;color:#234";
  const tdL="padding:3px 8px 3px 0;vertical-align:top", tdR="padding:3px 0;vertical-align:top";
  const timeline = (G.timeline&&G.timeline.length)
    ? `<table style="border-collapse:collapse;margin:.2em 0">${G.timeline.map(t=>`<tr><td style="${tdL};font-weight:700;color:#2f6b34;white-space:nowrap">${esc(t.when)}</td><td style="${tdR}">${esc(t.step)}</td></tr>`).join("")}</table>` : "";
  const banRef = refBannedRe(state.profile);
  const storage = (G.storage&&G.storage.length)
    ? `<table style="border-collapse:collapse;margin:.2em 0;font-size:12.5px"><tr style="color:#666"><td style="${tdL}"><b>Food</b></td><td style="${tdL}"><b>Fridge</b></td><td style="${tdL}"><b>Freezer</b></td><td style="${tdR}"><b>Tip</b></td></tr>${G.storage.filter(s=>!banRef||!banRef.test(s.food||"")).map(s=>`<tr><td style="${tdL}">${esc(s.food)}</td><td style="${tdL};white-space:nowrap">${esc(s.fridge||"")}</td><td style="${tdL};white-space:nowrap">${esc(s.freezer||"-")}</td><td style="${tdR}">${esc(s.tip||"")}</td></tr>`).join("")}</table>` : "";
  const reheat = (G.reheating&&G.reheating.length)
    ? `<ul style="margin:.2em 0;padding-left:20px">${G.reheating.map(r=>`<li><b>${esc(r.food)}:</b> ${esc(r.how)}</li>`).join("")}</ul>` : "";
  const trouble = (G.troubleshooting&&G.troubleshooting.length)
    ? `<ul style="margin:.2em 0;padding-left:20px">${G.troubleshooting.map(t=>`<li><b>${esc(t.problem)}:</b> ${esc(t.fix)}</li>`).join("")}</ul>` : "";
  const disc = `<div style="margin:8px 0;padding:8px 10px;background:#fff7e6;border:1px solid #f0d9a8;border-radius:8px;font-size:11.5px;color:#6b5310;line-height:1.45"><b>Please read, recommendations only:</b> ${esc(PREP_DISCLAIMER)}</div>`;
  return `<details class="prep-guide" style="${box}"><summary style="cursor:pointer;font-weight:700;color:#2f6b34;font-size:14px">${esc(prepTitle())} (open for the full step-by-step)</summary>
    <div style="margin-top:8px">
      ${disc}
      ${(prepTwice() || numberedDays())?`<p style="margin:.2em 0"><b>Your cook days:</b> ${esc(prepCookDaysText())}</p>`:""}
      ${sub("What you need", ul(G.equipment))}
      ${G.containers?sub("Containers", `<p style="margin:.2em 0">${esc(G.containers)}</p>`):""}
      ${sub("Before you start", ul(G.before_you_start))}
      ${sub(prepTwice() ? "Each cook day, step by step (overlap everything, ~90 min)" : numberedDays() ? "The cook-day timeline (overlap everything, ~90 min)" : "The Sunday timeline (overlap everything, ~90 min)", timeline)}
      ${sub("Cool it down safely (do not skip)", ul(G.cooling))}
      ${G.labeling?sub("Label every container", `<p style="margin:.2em 0">${esc(G.labeling)}</p>`):""}
      ${sub("How long each food keeps", storage)}
      ${sub("Reheating without ruining it", reheat)}
      ${sub("Keeping it tasty", ul(G.keep_it_tasty))}
      ${sub("Troubleshooting", trouble)}
      ${sub("Freezing & thawing right", ul(G.freezing))}
    </div></details>`;
}
// Researched flavor library (window.OB_SAUCES): dressings, sauces, marinades, dry rubs, finishers that make
// prepped food taste unreal. Grouped by category; each shows the batch recipe, fridge days, pairings, a
// macro note, and the flavor principle. Most are stored in a separate jar and added at serving.
const SAUCE_CATS = [["spice-blend","Dry spice blends & rubs"],["marinade","Marinades"],["vinaigrette","Vinaigrettes"],["creamy","Creamy Greek-yogurt dressings"],["asian","Asian sauces"],["latin","Latin & Southwest"],["mediterranean","Mediterranean & Middle-Eastern"],["finisher","Finishers & flavor boosters"]];
function sauceLibraryHTML(){
  const S = window.OB_SAUCES || []; if(!S.length) return "";
  const by = {}; S.forEach(s=>{ (by[s.category]=by[s.category]||[]).push(s); });
  const groups = SAUCE_CATS.filter(([k])=>by[k]).map(([k,label])=>{
    const items = by[k].map(s=>{
      const ings = (s.ingredients||[]).map(i=>`${esc(i.amount)} ${esc(i.item)}`).join(", ");
      const meta = [s.fridge_days?`keeps ${s.fridge_days}d`:"", s.calories_note?esc(s.calories_note):""].filter(Boolean).join(" · ");
      return `<div style="margin:.5em 0;padding:.4em .6em;background:#fff;border:1px solid #eee;border-radius:8px">
        <div><b>${esc(s.name)}</b>${meta?` <span style="color:#777;font-size:12px">${meta}</span>`:""}</div>
        <div style="font-size:12.5px">${ings}.${s.method?` ${esc(s.method)}`:""}</div>
        ${(()=>{ const bp=refBannedRe(state.profile), pw=refStripList(s.pairs_with, bp); return pw?`<div style="font-size:12.5px;color:#356"><b>Pairs:</b> ${esc(pw)}</div>`:""; })()}
        ${s.flavor_why?`<div style="font-size:12px;color:#666"><i>Why it works: ${esc(s.flavor_why)}</i></div>`:""}
        ${s.meal_prep_note?`<div style="font-size:12px;color:#666">${esc(s.meal_prep_note)}</div>`:""}</div>`;
    }).join("");
    return `<div style="margin:.6em 0"><div style="font-weight:700;color:#2f6b34;margin:.3em 0">${esc(label)}</div>${items}</div>`;
  }).join("");
  const box="background:#fbf4ea;border:1px solid #ecd9bd;border-radius:10px;padding:12px 14px;margin:0 0 14px;font-size:13px;line-height:1.5;color:#332";
  return `<details class="sauce-lib" style="${box}"><summary style="cursor:pointer;font-weight:700;color:#9a6a1c">Sauces, dressings &amp; seasonings (make it taste unreal): ${S.length} options</summary><div style="margin-top:8px">${groups}</div></details>`;
}
// ctx (from the dish): cold = never heated (so vegetables and fruit are raw, canned fish is a salad), boiled = the
// eggs are hard- or soft-boiled, deviled = deviled eggs or egg salad.
function foodStorageCat(f, ctx){
  if(!f) return null; const n=(f.name||"").toLowerCase(); const c=f.cat; ctx = ctx || {};
  if(isProteinPowder(f)) return null;                        // a scoop of powder is not a cooked food
  if(/\bbroth\b|\bstock\b|bouillon/.test(n)) return null;     // the dish around it sets the clock
  if(/\begg/.test(n) && !/eggplant/.test(n)){
    if(ctx.deviled) return "eggsoft";
    if(/hard.?boiled/.test(n) || ctx.boiled) return "hbegg";
    return "eggdish";
  }
  if(/tofu|tempeh|seitan|\btvp\b|textured (soy|vegetable)/.test(n)) return "tofu";
  if(/ground (beef|pork|chicken|turkey|lamb)|beef, ground|turkey, ground|chicken, ground|pork, ground/.test(n)) return "groundmeat";
  if(/chicken|turkey|duck/.test(n)) return "poultry";
  if(/beef|steak|sirloin|pork|lamb|bison|ham\b/.test(n)) return "redmeat";
  if(c==="Seafood" || /salmon|tuna|cod|tilapia|trout|shrimp|scallop|crab|sardine|mackerel|halibut|haddock|pollock|snapper|mussel|oyster/.test(n))
    return (ctx.cold && /canned|in water|in oil|sardine|smoked/.test(n)) ? "fishsalad" : "fish";
  if(c==="Vegetables") return /potato/.test(n) ? "potato" : ctx.cold ? "rawveg" : "rveg";
  if(c==="Fruits") return ctx.cold ? "fruit" : "rveg";       // fruit simmered or roasted into a dish keeps like cooked veg
  if(/pasta|noodle/.test(n)) return "pasta";
  if(/potato/.test(n)) return "potato";
  if(/hummus|bean dip|tzatziki|guacamole|baba ghan/.test(n)) return "dip";
  if(c==="Legumes" || /beans|lentil|chickpea|edamame|\bpeas\b/.test(n)) return "beans";
  if(c==="Grains & Starches" || /quinoa|\brice\b|\boats\b|barley|bulgur|couscous|granola|bread/.test(n)) return "grain";
  if(c==="Eggs & Dairy" && /cheese|butter|parmesan|feta|mozzarella|cheddar|ghee/.test(n) && !/cottage|cream cheese|ricotta|buttermilk/.test(n)) return "cheese";
  if(c==="Eggs & Dairy") return "dairy";
  return null;
}
// a Chobani cup or drink is bought ready to eat, a side, never part of the cook (a client's vanilla yogurt, 2026-10-06)
// chocolate chips are folded into the dough, not added at serving: the protein balls' card said "Add fresh at serving: Dark
// chocolate chips" beside its own "Fold in the dark chocolate chips last" (a client, 2026-10-16)
const PREP_SEPARATE = /chobani|avocado(?!\s*oil)|dressing|ranch|vinaigrette|salsa|guacamole|hot sauce|sriracha|lettuce, raw|spinach, raw|arugula|spring mix|romaine|nuts|almonds|walnuts|pecans|cashews|granola|croutons|(?<!chocolate )chips|crackers|berries|banana/i;
// raw spinach or kale chopped into egg cups, a frittata or a bake is cooked in it, not added fresh at serving
const EGG_BAKE = /egg muffin cups?|egg cups?|egg(?:[- ]white)? bites|frittata|egg bake|breakfast bake|quiche|strata|omelet/i;   // "Egg-White Bites" too (2026-10-06)
// What a batch recipe's own steps keep apart ("Keep the carrot, celery and ranch in separate small containers", "Keep the
// cabbage, salsa and avocado separate and add them after reheating") is added fresh at serving too: the pack line listed raw
// carrots, celery and cabbage under "Cook 3x" while the steps kept them out (a client, 2026-10-03). Each listed phrase
// is read by its last word ("chopped romaine" -> romaine); a cooking fat is never a garnish.
const stepKeptApart = text => { const out = [];
  String(text||"").replace(/keep (?:the |your )?([^.;:]+?) (?:in separate|separate)\b/gi, (m, list) => {
    list.split(/,|\band\b/).map(x=>x.trim().toLowerCase().split(/\s+/).pop()).filter(Boolean)
      .forEach(w => out.push(/ss$/.test(w) ? w : w.replace(/s$/, "")));
    return m; });
  return out; };
const keptApart = (f, kept) => !!(kept && kept.length && f.cat!=="Fats & Oils" && kept.some(w => w.length>=3 && f.name.toLowerCase().includes(w)));
// What the steps simmer into the pot is part of the dish: the tortilla soup's salsa goes in with the broth, and its card said
// "Add fresh at serving: Salsa" (a client, 2026-10-06). Sauces only; a topping named in a simmer sentence stays a topping.
const stepCookedIn = text => String(text||"").split(/(?<=[.!?;])\s+|\n/)
  .filter(x => /\b(simmer|boil|braise|into the pot|to the pot|in the pot)\b/i.test(x) && !/\b(keep|top|garnish|serving|when you eat|after reheating)\b/i.test(x))
  .join(" ").toLowerCase();
const cookedInPot = (f, cooked) => !!cooked && /salsa|hot sauce|sriracha/i.test(f.name) && cooked.includes(f.name.split(",")[0].toLowerCase().replace(/\s*\(.*\)/,"").trim());
const prepSeparate = (f, dish, kept, cooked) => !!(f && f.name && !cookedInPot(f, cooked) && ((PREP_SEPARATE.test(f.name) && !(/spinach|kale/i.test(f.name) && EGG_BAKE.test(dish||""))) || keptApart(f, kept)));
// Batters and bakes that carry egg as an ingredient ("Egg Muffin Cups" are egg bites, so they stay egg dishes).
const BAKED_DISH = /pancake|waffle|muffin(?!\s*cups?)|baked oat|oat cups?|\bbars?\b|loaf|banana bread|blondie|brownie|cookie/i;
// A yogurt or sour-cream sauce on a cooked protein is a sauce: it goes in its own tub and is added at serving,
// so it neither shortens the batch's fridge life nor stops the rest of the meal from freezing.
const SAUCE_DAIRY = /yogurt|sour cream|skyr|kefir|tzatziki/i;
const JAR_DISH = /overnight|chia|bircher|parfait|\bjars?\b|muesli/i;
const BOILED_EGG = /(hard|soft).?boil|boiled eggs?|boil (the |your )?eggs?|jammy/i;
// soft egg that does not freeze: deviled eggs, egg salad, and a soft scramble held in sauce (a scramble rolled
// into a burrito or wrap freezes fine, like the frozen ones sold in stores)
const DEVILED = /deviled|egg salad|scramble(?!.*(burrito|wrap))/i;
// The storage context of a dish, from its title and steps: raw vs cooked, how the eggs are cooked, jar or not.
function dishStorageCtx(dish, text, cold){
  const t = (dish||"") + " " + (text||"");
  return { dish:dish||"", kept:stepKeptApart(text), cookedIn:stepCookedIn(text), cold:!!cold, boiled:BOILED_EGG.test(t), deviled:DEVILED.test(dish||""), jar:!!cold && JAR_DISH.test(dish||""), baked:BAKED_DISH.test(dish||"") };
}
// a food name inside a sentence: lower case, but a brand or a place keeps its capital ("Chobani vanilla Greek yogurt", 2026-10-06)
const BRAND_CASE = {"carbe diem":"Carbe Diem", "dave's killer":"Dave's Killer", "bitchin'":"Bitchin'", "pbfit":"PBfit", "david":"DAVID", "premier":"Premier", "ezekiel":"Ezekiel"};
const lowerFoodName = n => String(n).toLowerCase().replace(/\b(greek|chobani|yasso|fairlife|italian|parmesan|dijon|cajun|mission|tillamook)\b/g, w => w.charAt(0).toUpperCase()+w.slice(1))
  .replace(/\bcarbe diem\b|\bdave's killer\b|\bbitchin'|\bpbfit\b|\bdavid\b|\bpremier\b|\bezekiel\b/g, w => BRAND_CASE[w] || w);
function storageOfFoods(foods, ctx){
  ctx = ctx || {};
  const cats = foods.map(f=>foodStorageCat(f, ctx));
  const cookedProt = cats.some(c=>/^(poultry|redmeat|groundmeat|fish|tofu)$/.test(c||""));
  let fridge=99, freezeAll=true, freezeMonths=99; const used=new Set(), sep=new Set();
  foods.forEach((f,i)=>{
    // add-fresh garnishes (avocado, banana, dressings, raw greens, nuts) are NOT part of the stored/frozen
    // batch: list them as "add fresh" and skip them in the fridge/freeze math so they don't drag it down.
    if(prepSeparate(f, ctx.dish, ctx.kept, ctx.cookedIn)){ sep.add(lowerFoodName(f.name.split(",")[0])); return; }
    let cat = cats[i]; if(!cat) return;
    if(/^egg/.test(cat) && cat!=="hbegg" && ctx.baked) cat = "baked";
    if(cat==="dairy" && cookedProt && SAUCE_DAIRY.test(f.name)){ sep.add(lowerFoodName(f.name.split(",")[0])); return; }
    const st=STORAGE_MAP[cat]; used.add(cat);
    fridge=Math.min(fridge,st.fridge); if(!st.freeze) freezeAll=false; if(st.freeze) freezeMonths=Math.min(freezeMonths,st.freezer);
  });
  if(ctx.jar){ const j=STORAGE_MAP.jar; used.add("jar"); fridge=Math.min(fridge,j.fridge); freezeAll=false; }
  return { fridgeDays: fridge===99 ? 3 : fridge, freezeOk:freezeAll, freezeMonths: freezeMonths===99 ? 2 : freezeMonths, separate:[...sep], cats:[...used],
           fishNote: used.has("fish") && fridge===STORAGE_MAP.fish.fridge };
}
function mealStorage(meal){
  const foods = (meal.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(Boolean);
  const c = meal.cook || {};
  return storageOfFoods(foods, dishStorageCtx(meal.dish, (c.method||"")+" "+(c.prepMethod||""), mealEatenCold(meal)));
}
// Containers of a batch that outlast the fridge life. `fridgeDays` is days AFTER the cook day (USDA's count), and
// the batch's last container is eaten (batchDays - 1) days after cooking: a 4-day batch cooked Sunday ends on
// Wednesday, 3 days later, inside the 3 to 4 day window for cooked leftovers.
const prepOverFridge = (batchDays, fridgeDays) => Math.max(0, (batchDays - 1) - fridgeDays);
// How long a TEMPLATE's batch keeps, before the solver has picked its foods: the protein it leads with (first
// option in this client's pool), its starch, an egg base and its fixed extras. Add-fresh garnishes do not count.
const _tplKeepCache = new Map();
function tplKeep(t, pool){
  const key = t.id + "|" + pool.length;
  if(_tplKeepCache.has(key)) return _tplKeepCache.get(key);
  const foods = [];
  [t.reP, t.reC, t.reProd, t.reF].forEach(re=>{ const f = reHits(re, pool)[0]; if(f) foods.push(f); });
  if(t.eggBase) foods.push({ name:"Egg, whole", cat:"Eggs & Dairy" });
  (t.reExtra||[]).forEach(x=>{ const f = pool.find(ff=>x.re.test(normName(ff))); if(f) foods.push(f); });
  const text = (t.method||"")+" "+(t.prepMethod||"");
  const cold = COLD_DISH.test(t.title||"") || (!!text.trim() && !HEAT_STEP.test(text));
  const st = storageOfFoods(foods, dishStorageCtx(t.title, text, cold));
  const out = { fridge: st.fridgeDays, freeze: st.freezeOk };
  _tplKeepCache.set(key, out);
  return out;
}
// Reheat quality over a multi-day batch, from the dish itself. Lipid oxidation in chill-stored cooked meat and
// fish ("warmed-over flavour") builds over 1 to 4 days and is worst in plain poultry and fish; a sauce, braise,
// marinade or antioxidant spices (garlic, onion, rosemary, paprika, turmeric, tomato) hold it back, and crisp
// coatings go soft unless re-crisped. Scored from the title and batch recipe: + for dishes that improve or hold,
// - for ones that are best on day 1. `t.batchQ` (0 to 3, set in the data) wins when present.
const BATCH_GOOD = /\b(stew|chili|curry|braise[d]?|tikka|masala|korma|dal|dahl|chana|tagine|bolognese|ragu|marinara|meatball|meatloaf|pulled|shredded|carnitas|barbacoa|enchilada|casserole|bake|soup|gumbo|jambalaya|teriyaki|adobo|picadillo|burrito bowl|taco (skillet|meat)|sloppy|overnight|chia pudding|egg roll in a bowl|stroganoff|goulash|shakshuka|lasagna|ziti|sauce[d]?|glazed|marinated|jerk|satay|peanut)\b/i;
const BATCH_WEAK = /\b(crispy|crusted|breaded|fried|nuggets|tempura|seared|poached|steamed|sushi|poke|ceviche|salad|toast|sandwich|wrap|pita|tacos?|avocado|fresh)\b/i;
function tplBatchCost(t, pool, batchDays){
  const k = tplKeep(t, pool);
  let cost = prepOverFridge(batchDays, k.fridge) > 0 ? 0.6 : 0;          // a container has to go in the freezer
  const q = (typeof t.batchQ === "number") ? t.batchQ
    : 1.5 + (BATCH_GOOD.test(t.title) ? 1 : 0) - (BATCH_WEAK.test(t.title) ? 1 : 0);
  cost += (3 - Math.max(0, Math.min(3, q))) * 0.25 * (batchDays >= 4 ? 1.5 : 1);
  return cost;
}
// Servings of this dish in the batch that THIS meal belongs to. With one Sunday cook that is the whole week;
// with a cook schedule it is only the days that cook covers (a dish on Sunday's and Wednesday's menus is two
// separate batches, not one batch of six).
function prepBatchCount(dish, meal){
  if(!dish) return 1;
  const S = prepSchedule(), W = state.week || [];
  if(S && meal){
    const c = prepCookOfDay(S, prepDayOfMeal(meal));
    if(c) return c.days.reduce((n,di)=>n + (((W[di]||{}).meals||[]).some(m=>m.dish===dish)?1:0), 0) || 1;
  }
  return W.reduce((n,d)=>n + ((d.meals||[]).some(m=>m.dish===dish)?1:0), 0) || 1;
}
// THE PREPPED MEAL = THE PLAN'S MEAL. Generate the exact per-container portions (and the batch total to
// cook) straight from THIS meal's macro-solved foods, so what you prep is what you eat. Dylan: "say the
// grams of each food to put in the container, and the prep should be the meals they actually prepped."
// A meal that is only a recipe food (a daily smoothie, a sweet treat) is made fresh, not batch-cooked. Without this
// guard the smoothie printed "Batch-cook 1 serving on its cook day (one a day for the next 1 days)".
// "Batch prep (makes 5 servings)" next to "Cook 4x" contradicts itself. When the template's recipe was written for a
// different count than this plan cooks, say so and point at the exact amounts.
const batchLabel = (meal, makes) => {
  if(!makes) return "";
  const n = prepBatchCount(meal && meal.dish, meal);
  // The food grams on the card are exact for n servings; the sauces and spices named in the steps are written for
  // `makes`. Say how to scale them, as a fraction a person can measure.
  if(n===makes) return ` (makes ${makes} servings)`;
  // the steps' counts and spice amounts are rewritten to n by fitBatchCounts and scaleUnlistedAmounts (2026-10-05)
  return ` (written for ${makes} servings, scaled here to ${n})`;
};
const isFreshRecipeMeal = m => !!m && !m.dish && (m.items||[]).length>0 && m.items.every(it=>{ const f=FOOD_BY_ID[it.id]; return f && f.recipe; });
// A packaged single-serve item (a Yasso bar, a bottled shake) is bought ready to eat: no container, no batch, no fridge
// line. In a client's prep plan the frozen Yasso bar read "Make 3x on Sunday ... keeps 7 days in the fridge" (2026-10-02).
const isReadyMeal = m => !!m && (m.items||[]).length>0 && m.items.every(it=>{ const f=FOOD_BY_ID[it.id];
  return f && f.brands && (f.portions||[]).some(p=>/^1 (bar|bottle|shake|can|pouch)\b/i.test(p.label)); });
// COOK-DAY RUN SHEET. The playbook's generic timeline (chicken, rice, vegetables) was suppressed for any plan with real
// batch recipes, which is every meal-prep plan, so the client got the recipes but no order to cook them in. This one is
// built from the plan's own batch dishes for each cook: the longest cook starts first, oven dishes next (hotter oven
// first), stovetop dishes while the oven is busy, no-cook jars last so they stay cold, then cooling and packing. The
// minutes and temperatures are read from each recipe's own steps, nothing is invented (OB, 2026-10-05).
function cookDayRunSheet(days){
  const S = prepSchedule(), W = state.week || [];
  const cooks = S ? S.cooks.filter(c=>!c.fresh) : [{ day:0, days:W.map((_,i)=>i), week:true }];
  // only the cooking sentences count: not "within 2 hours" (the fridge rule), cooling, resting, soaking or reheating, and not
  // an alternative in parentheses ("or roast it at 425F", "slow cooker 8 hours")
  // Read clause by clause (2026-10-16, a client's run sheet): a whole sentence was dropped for one word in it, so the
  // stuffed peppers' bake ("top with the rest of the mozzarella ... bake 20 minutes") and the egg roll's brown rice ("40 to 45
  // minutes", in a sentence that ends "chill in the fridge within 1 hour") went missing: 18 and 8 minutes printed for 30 and 45.
  // Only a parenthesis that is an alternative ("or roast it at 425F", a slow cooker) is left out; "(brown rice 40 to 45
  // minutes ...)" is the time itself. "From frozen, leave them on the counter 15 minutes" is not cooking either.
  const cookText = txt => String(txt).replace(/\((?:or\b|[^)]*\b(?:slow cooker|pressure cooker|instant pot)\b)[^)]*\)/gi, " ").split(/(?<=[.!?;,])\s+|\n|\s+then\s+/)
    .filter(x => !/\b(within|fridge|refrigerat\w*|freez\w*|frozen|cool\w*|rest(?!\s+of\b)\w*|chill\w*|stand|soak\w*|thaw\w*|reheat\w*|microwave|storage|overnight|marinat\w*|ice water)\b/i.test(x)).join(" ");
  const minutesOf = txt => { let max = 0;
    cookText(txt).replace(/(\d+(?:\.\d+)?)(?:\s*(?:to|-)\s*(\d+(?:\.\d+)?))?\s*(hours?|hrs?|minutes?|mins?)\b/gi, (m, a, b, u) => { const v = (+(b||a)) * (/^h/i.test(u) ? 60 : 1); if(v > max) max = v; return m; });
    return max; };
  // every oven temperature a recipe uses, in its own order: the egg-white bites roast their potatoes hot and bake at 325F, and
  // the sheet said the dish "wants 425F" and to run the oven hottest first, so the heat went down for the bites and back up
  // for the stuffed peppers at 400F (a client's Sunday, client-eye review, 2026-10-16)
  const tempsOf = txt => { const out = []; cookText(txt).replace(/\b([34]\d{2})\s*°?F\b/g, (m, t) => { if(!out.includes(+t)) out.push(+t); return m; }); return out; };
  const timeTxt = mins => !mins ? "" : mins >= 60 ? `${fmtQty(mins/60)} hour${mins >= 90 ? "s" : ""}` : `${mins} minutes`;
  const sections = cooks.map(c => {
    const seen = new Set(), items = [];
    c.days.forEach(di => ((W[di]||{}).meals||[]).forEach(m => {
      // a library dish with no batch recipe is still batch-cooked from its single-serving steps ("Cook 3x on Sunday"): a client
      // a client's two steak dinners were missing from both run sheets, which listed only the chicken and the jars (2026-10-29)
      const steps = m.cook && (m.cook.prepMethod || m.cook.method);
      if(!m.dish || !steps || m.fresh || seen.has(m.dish)) return; seen.add(m.dish);
      const n = prepBatchCount(m.dish, m), txt = planSteps(steps, m, n);
      const cold = mealEatenCold(m) || !HEAT_STEP.test(txt);
      const ct = cookText(txt);
      const slow = /slow cooker|pressure cooker|braise|dutch oven/i.test(ct);
      const oven = /\b(oven|roast|roasts|roasted|bake|bakes|baked|baking)\b/i.test(ct);
      const temps = oven ? tempsOf(txt) : [];
      // the oven's own minutes (the oven sentences only): the stove rice's 18 minutes is not how long the salmon roasts
      const ovenMins = oven ? minutesOf(cookText(txt).split(/(?<=[.;])\s+/).filter(x=>/\b(oven|roast|roasts|roasted|bake|bakes|baked|baking)\b/i.test(x)).join(" ")) : 0;
      items.push({ dish:dishTitle(m), n, mins:minutesOf(txt), ovenMins, temp:temps.length ? Math.max(...temps) : 0, temps, cold, slow, oven });
    }));
    if(!items.length) return "";
    const rank = x => x.cold ? 3 : x.slow ? 0 : x.oven ? 1 : 2;
    items.sort((a,b) => rank(a)-rank(b) || b.temp-a.temp || b.mins-a.mins);
    const ovens = items.filter(x=>x.oven && !x.slow && x.temp);
    let firstOven = true, firstStove = true, firstTemp = 0, firstOvenMins = 0, shared = 0;
    const anyOven = items.some(x=>x.oven || x.slow);
    // a shorter dish at the same heat goes in for the first one's last minutes, so both come out together: a client's salmon
    // and green beans (15 minutes) read "get it in at the same time" beside her sweet potatoes (30), 2026-11-04
    const sameHeat = x => firstOvenMins && x.ovenMins && x.ovenMins <= firstOvenMins - 5
      ? `It shares the heat with the first: put it in on the other rack when the first has about ${x.ovenMins} minutes left, so both come out together.`
      : "It shares the heat with the first: get it in at the same time, on the other rack.";
    const lines = items.map(x => {
      const t = timeTxt(x.mins), long = t ? ` Its longest step is ${t}.` : "";
      const serv = ` (${x.n} serving${x.n>1?"s":""})`;
      if(x.cold) return `<b>${esc(x.dish)}</b>${serv}: no cooking. Make it last, once the hot food is cooling, so it stays cold.`;
      if(x.slow) return `<b>${esc(x.dish)}</b>${serv}: start it first.${long} In a slow cooker or pressure cooker it leaves the oven and the stove free for the rest.`;
      // a dish that starts at the same heat as the first one goes in beside it: the racks are set for two pans (a client's
      // stuffed peppers beside the egg-white bites' potatoes, both 400F, read "as soon as the oven is free", 2026-10-16)
      if(x.oven){ const same = !firstOven && x.temps.length && x.temps[0] === firstTemp && !shared++;
        const line = `<b>${esc(x.dish)}</b>${serv}: the oven${x.temps.length?` at ${x.temps.map(t=>t+"F").join(", then ")}`:""}.${long} ${firstOven ? "Get it in first and prep the next dish while it cooks." : same ? sameHeat(x) : "Get it in as soon as the oven is free."}`;
        if(firstOven){ firstTemp = x.temps[0]; firstOvenMins = x.ovenMins; } firstOven = false; return line; }
      const when = anyOven ? "Do it while the oven is busy." : firstStove ? "Start it first." : "Start it once the first pot is on.";
      firstStove = false;
      return `<b>${esc(x.dish)}</b>${serv}: the stove.${long} ${when}`;
    });
    const head = c.week ? (numberedDays() ? "Day 1 cook, in order" : "Your cook day, in order") : `${dayLabel(c.day)} cook, in order`;
    // one order for the oven, hottest to coolest, when each dish's own temperatures only go down; otherwise the old line
    const allT = [...new Set(ovens.flatMap(x=>x.temps))].sort((a,b)=>b-a);
    const downOnly = ovens.every(x=>x.temps.every((t,i)=>!i || t < x.temps[i-1]));
    const ovenNote = allT.length < 2 ? "" : downOnly
      ? `<li>The oven is shared: run it hottest to coolest, ${allT.map(t=>`${t}F for ${joinNames(ovens.filter(x=>x.temps.includes(t)).map(x=>esc(x.dish)))}`).join(", then ")}.</li>`
      : `<li>The oven is shared: ${joinNames(ovens.filter((x,i,a)=>a.findIndex(y=>y.temp===x.temp)===i).map(x=>`${esc(x.dish)} wants ${x.temp}F`))}. Run the hottest first and drop the heat for the next.</li>`;
    return `<p style="margin:.4em 0 .1em"><b>${head}:</b></p><ol style="margin:.2em 0;padding-left:18px"><li>${items.length>2 ? `Read all ${items.length} recipes` : items.length===2 ? "Read both recipes" : "Read the recipe"} before you start, and set everything out: the pans, the containers, every ingredient.</li>${lines.map(l=>`<li>${l}</li>`).join("")}${ovenNote}<li>Cool everything with the lids off until it stops steaming, pack it, write the date on each container, and get it in the fridge within 2 hours (1 hour for rice and cooked grains).</li></ol>`;
  }).filter(Boolean).join("");
  return sections;
}
function prepPackHTML(meal){
  if(!meal || meal.fresh || !(meal.items||[]).length || isFreshRecipeMeal(meal) || isReadyMeal(meal)) return "";
  const batch = prepBatchCount(meal.dish, meal);
  const S = prepSchedule(), ck = S && prepCookOfDay(S, prepDayOfMeal(meal));
  const items = meal.items.map(it=>({f:FOOD_BY_ID[it.id], g:it.grams})).filter(x=>x.f && x.g>0);
  if(!items.length) return "";
  const shortName = f => f.name.split(",")[0].replace(/\s*\(.*\)/,"").trim();
  const kept = stepKeptApart(meal.cook && meal.cook.prepMethod), cookedIn = stepCookedIn(meal.cook && meal.cook.prepMethod);
  const fresh = items.filter(x=>prepSeparate(x.f, meal.dish, kept, cookedIn));
  const cooked = items.filter(x=>!prepSeparate(x.f, meal.dish, kept, cookedIn));
  const per = items.map(x=>`${esc(shortName(x.f))} <b>${bestPortion(x.f, x.g)}</b>`).join(", ");
  // the batch weights are COOKED weights for a cooked food, which a beginner weighs out raw and comes up short: say so, and
  // how much raw (or dry) to start with, from the same yields the grocery list uses (OB, 2026-10-05)
  const startWith = x => { const g = Math.round(x.g*batch), form = (x.f.name.match(/\b(cooked|baked|grilled|roasted|boiled|broiled|steamed)\b/i)||[])[1];
    if(!form) return "";
    const b = purchaseAmount(x.f, g); if(!b || !b.form || b.form==="cooked" || Math.abs(b.grams-g) < 5) return ` ${form.toLowerCase()}`;
    const r = Math.round(b.grams/5)*5, amt = r>=200 ? (Math.round(r/45.4)/10)+" lb ("+r+"g)" : r+"g";
    // beans and lentils are mostly bought canned: name both ways in
    if(x.f.cat==="Legumes" && b.form==="dry") return /kidney/i.test(x.f.name) ? ` ${form.toLowerCase()} (canned and drained)` : ` ${form.toLowerCase()} (canned and drained, or from about ${amt} dry)`;
    return ` ${form.toLowerCase()}, from about ${amt} ${b.form}`; };
  const batchTot = cooked.map(x=>`${esc(shortName(x.f))} ${bestPortion(x.f, Math.round(x.g*batch))}${startWith(x)}`).join("; ");
  let s = `<div><b>Pack each container (1 serving):</b> ${per}.</div>`;
  if(batch>1) s += `<div><b>${mealEatenCold(meal)?"Make":"Cook"} ${batch}x ${ck?`on ${dayLabel(ck.day)}`:prepTwice()?"on its cook day":"for the week"}:</b> ${batchTot}${fresh.length?`. Add fresh at serving: ${fresh.map(x=>esc(shortName(x.f))).join(", ")}`:""}.</div>`;
  return s;
}
function mealPrepNote(meal){
  if(!state.profile || !state.profile.prep || !meal || !(meal.items||[]).length || isFreshRecipeMeal(meal) || isReadyMeal(meal)) return "";
  // a coffee line (the client's own cappuccinos, counted) is made in the cup: no batch or storage note (a client, 2026-10-30)
  if(/^coffee$/i.test(meal.name||"")) return "";
  const S = prepSchedule(), di = prepDayOfMeal(meal), ck = S && prepCookOfDay(S, di);
  if(ck && ck.fresh)
    return `<b>${mealEatenCold(meal)?"Make":"Cook"} this fresh on ${dayLabel(di>=0?di:6)}</b>, no batch.`;
  // one meal made fresh every time inside a batch week (a daily smoothie), not a fresh-cook day
  if(meal.fresh) return `<b>${mealEatenCold(meal)?"Make":"Cook"} this fresh each time</b>, no batch.`;
  const batch=prepBatchCount(meal.dish, meal), st=mealStorage(meal), cold=mealEatenCold(meal);
  const over = prepOverFridge(batch, st.fridgeDays), verb = cold ? "Make" : "Batch-cook";
  // Days AFTER the day it is made, which is how the USDA numbers count. Fish says why its number is short.
  const keeps = `Keeps <b>${st.fridgeDays} day${st.fridgeDays>1?"s":""} after ${cold?"you make it":"cooking"}</b> in the fridge${st.fishNote?` (cooked fish is ${STORAGE_MAP.fish.note})`:""}`;
  let s;
  if(ck){
    const first = dayLabel(ck.days[0]), last = dayLabel(ck.days[ck.days.length-1]);
    s = `<b>${verb} ${batch} serving${batch>1?"s":""} on ${dayLabel(ck.day)}</b>${batch>1?` (one a day, ${first} to ${last})`:""}. ${keeps}`;
  } else {
    s = `<b>${verb} ${batch} serving${batch>1?"s":""}</b> on prep day (you eat this ${batch}x this week). ${keeps}`;
  }
  if(ck && over>0){
    const idx = Array.from({length:over}, (_,i)=>ck.days[st.fridgeDays+1+i]).filter(x=>x!=null);
    const names = idx.map(x=>dayLabel(x)).join(" and ");
    if(st.freezeOk) s+=`; on ${dayLabel(ck.day)}, put ${names}'s container${over>1?"s":""} straight in the freezer and move ${over>1?"them":"it"} to the fridge the night before`;
    else s+=`. It does not freeze well, so cook ${names}'s serving${over>1?"s":""} fresh that day instead of in the batch`;
  } else if(st.freezeOk && !ck) s+=`; freeze any portion you won't eat within ${st.fridgeDays} day${st.fridgeDays>1?"s":""} of cooking (good ~${st.freezeMonths} month${st.freezeMonths>1?"s":""}) and thaw it in the fridge overnight`;
  s+= cold ? ". Seal each one, keep it in the coldest part of the fridge, and label the date." : ". Cool it within 2 hours, store in airtight containers, and label the date.";
  if(st.separate.length) s+=` Add these FRESH each day, do not mix in ahead: ${st.separate.join(", ")}.`;
  return s;
}
// Culinary judgment (CULINARY-KNOWLEDGE.md §1): ACID is the #1 silent missing element in lean savory food
// ("if salt didn't fix it, it's acid"). If a savory lunch/dinner has no acid in its foods OR its seasoning,
// suggest a finishing acid — the cheapest, zero-calorie way to make lean food taste finished instead of flat.
const ACID_RE = /lemon|lime|vinegar|\bacid|citrus|balsamic|juice of|squeeze|pickl|yogurt|tzatziki|ponzu|salsa|pico|chimichurri|kimchi|sauerkraut|tomato|\borange\b|mustard|hot sauce|sriracha|capers|marinara|enchilada|bitchin/i;   // Bitchin' Sauce is made with lemon juice
function finishingTip(meal, c){
  if(!meal || !/lunch|dinner/i.test(meal.name||"")) return "";
  const txt = (((c&&c.season)||"")+" "+((c&&c.method)||"")+" "+((c&&c.note)||""));
  const foods = (meal.items||[]).map(it=>{const f=FOOD_BY_ID[it.id];return f?f.name:"";}).join(" ");
  if(ACID_RE.test(txt) || ACID_RE.test(foods)) return "";   // already has an acid — don't nag
  return "A squeeze of lemon or a splash of vinegar right before you eat.";
}
// The steps are the template's standard recipe; the list is what the solver actually picked. When the steps name
// a food that is neither in the list nor something the template could have offered ("saute the zucchini" on a
// spinach pasta), say so on the card, in plain words. Only substantive foods count; garlic, lemon and broth are
// cooking, not contradictions. Conditional phrasing ("whichever your plan lists") is covered by the offered-check.
const STEP_SKIP = /^(toast|butter|honey|maple syrup|salsa|hummus|pesto|tzatziki|marinara|mayo|mayonnaise|nuts|cheese|yogurt|beans|fish|steak|noodles|rice|dates)$/;
function stepsMismatch(meal, c){
  const NOUNS = window.OB_FOOD_NOUNS, FREE = window.OB_FREE_WORDS; if(!NOUNS || !meal || !c) return [];
  // prepMethod matters: in meal-prep mode the card LEADS with the batch recipe, so that is the text the
  // client actually reads. Leaving it out meant the line never fired on a prep plan.
  // `season` is the optional-seasoning line, not an instruction, so it is not a contradiction of the list.
  // PROSE_CLEAN neutralises the spans that name a food without calling for it (oils, verbs, negations,
  // "whichever your plan lists"), which is the difference between a useful note and noise on every card.
  const src = [planSteps(c.method, meal), planSteps(c.prepMethod, meal)].filter(Boolean).join(" ");
  const text = " "+(window.OB_PROSE_CLEAN ? window.OB_PROSE_CLEAN(src) : src).toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ")+" ";
  const t = meal.dish ? TEMPLATES.find(x=>x.title===meal.dish) : null;
  const offered = t ? ["protein","carb","fat","produce"].map(k=>t[k]||"").join("|")+"|"+(t.extras||[]).map(e=>e[0]).join("|") : "";
  const inList = (meal.items||[]).map(it=>{ const f=FOOD_BY_ID[it.id]; return f ? normName(f) : ""; }).join(" | ");
  let low = text; const out = [];
  [...NOUNS].sort((a,b)=>b[0].length-a[0].length).forEach(([w, re])=>{
    if(STEP_SKIP.test(w) || FREE.test(w)) return;
    const wre = new RegExp("\\b"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"s?\\b");
    if(!wre.test(low)) return;
    low = low.replace(new RegExp(wre.source,"g")," ");
    const fre = new RegExp(re,"i");
    if(fre.test(inList) || fre.test(offered.replace(/\\/g,""))) return;
    out.push(w);
  });
  // "tomatoes and tomato" read as two foods on a real card. Collapse plural/singular pairs.
  const seen = new Set(), keep = [];
  out.forEach(w=>{ const stem = w.replace(/ies$/,"y").replace(/es$/,"").replace(/s$/,"");
    if(seen.has(stem)) return; seen.add(stem); keep.push(w); });
  return keep;
}
// The mirror of stepsMismatch: a food is ON the list but the steps never mention it. This is what the macro
// solver adds (a potato next to the egg bites, quinoa in a stir-fry, oil on the edamame) and the recipe cannot
// know about. Name it and say what to do with it, rather than leaving the client to guess.
const EXTRA_WORD_SKIP = new Set(["cooked","baked","raw","lowfat","nonfat","plain","whole","flesh","large","small",
  "grated","fat","free","skim","dry","canned","drained","sliced","diced","ground","lean","light","reduced",
  "sodium","unsweetened","roasted","boiled","fresh","frozen","shredded","chopped","with","without","skin","and","the","for"]);
function wordInText(w, text){
  const esc2 = x => x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const stem = w.replace(/ies$/,"y").replace(/es$/,"").replace(/s$/,"");
  return new RegExp("\\b("+esc2(w)+"|"+esc2(stem)+")(s|es|ies)?\\b").test(text);
}
function listExtras(meal, c){
  if(!meal || !c) return [];
  const text = " "+[planSteps(c.method, meal), c.season, planSteps(c.prepMethod, meal), c.note].filter(Boolean).join(" ").toLowerCase()
    .replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ")+" ";
  const out = [];
  (meal.items||[]).forEach(it=>{
    const f = FOOD_BY_ID[it.id]; if(!f || f.recipe) return;
    // only foods that matter on the plate (a spoon of oil does), and any food carrying real protein or fibre: the breakfast
    // floor's 90 g of egg white is 47 calories and 10 g of protein, and it printed with no word on what to do with it
    const fibre = /psyllium|wheat bran|oat bran/i.test(f.name);
    if((f.kcal||0)*it.grams/100 < (f.cat==="Fats & Oils" ? 20 : 60) && (f.protein_g||0)*it.grams/100 < 8 && !fibre) return;
    if(fibre && meal.fiberNote) return;                                         // the fibre note already says how
    const words = normName(f).toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/)
      .filter(w=>w.length>2 && !EXTRA_WORD_SKIP.has(w));
    if(!words.length) return;
    if(words.some(w=>wordInText(w, text))) return;
    if(Object.entries(STEP_WORD_ALIAS).some(([w, re])=>re.test(f.name) && wordInText(w, text))) return;   // "the steak" is the sirloin
    out.push({f, g:it.grams});
  });
  return out;
}
function listExtrasLine(meal, c){
  const x = listExtras(meal, c); if(!x.length) return "";
  const drink = /smoothie|shake/i.test(meal.dish||"");
  const how = (f,n,g) => drink && f.cat!=="Fats & Oils" ? `blend in the ${n} (${g}g)`
    : /^egg/i.test(f.name) && /\braw\b/i.test(f.name) ? `scramble the ${/^egg white/i.test(f.name) ? "egg whites" : "eggs"} (${g}g) in a nonstick pan until set (160F) and have them alongside`
    : /psyllium/i.test(f.name) ? `stir the ${n} (${g}g) into a full glass of water and drink it with this meal`
    : /\bbran\b/i.test(f.name) ? `sprinkle the ${n} (${g}g) over the top`
    : f.cat==="Fats & Oils" ? `use the ${n} (${g}g) when you cook`
    : (f.cat==="Grains & Starches"||f.cat==="Legumes") ? `cook the ${n} (${g}g) plain and pack it alongside`
    : f.cat==="Fruits" ? `have the ${n} (${g}g) on the side`
    : f.cat==="Vegetables" ? `add the ${n} (${g}g) fresh at serving`
    : `have the ${n} (${g}g) alongside`;
  const parts = x.map(o=>how(o.f, plainName(o.f), Math.round(o.g)));
  const line = parts.join(", and ");
  return line.charAt(0).toUpperCase()+line.slice(1)+".";
}
function stepsMismatchLine(meal, c){
  const miss = stepsMismatch(meal, c); if(!miss.length) return "";
  const list = miss.length===1 ? miss[0] : miss.slice(0,-1).join(", ")+" and "+miss[miss.length-1];
  return `Yours has no ${list}, so skip that part of the recipe.`;
}
// The recipe library was written for every client at once, so its steps hedge: "(white or brown, whichever your plan
// lists)", "(breast or thigh, whichever your plan lists)", in 138 of 531 recipes. On a plan built for one person that
// reads like a template, and the list right above the steps already says which one, so the hedge goes. "(if you eat
// dairy)" goes only when this plate actually has a dairy food; otherwise it stays, because then it is the line that
// tells a dairy-free client to skip the cheddar in that step.
const LEGACY_STEP_FIXES = [
  [/\s*\(it is a cooked slot, so use florets\)/gi, " florets"],
  [/\s*\(from the carb slot, the protein slot, or both, whatever your plan lists\)/gi, ""],
  [/If your carb slot is black beans instead of a tortilla,/gi, "If there is no tortilla on your list,"],
  [/\s*\(If almond butter is the slot, it does double duty as fat too\.\)/gi, ""],
  [/ if that's your protein slot\./gi, "."],
  [/\s*\(if that is your pick\)/gi, ""],
  [/(cook the (?:quinoa|rice)) if that is your carb\./gi, "$1 if it is on your list."],
  [/ is your fat slot/gi, " is on your list"],
  [/\(If mozzarella is on your list, the cheese carries the fat and you only need a teaspoon of oil to keep the pan from sticking\.\)/gi, "(With the mozzarella carrying most of the fat, a teaspoon of oil is enough to keep the pan from sticking.)"],
];
// Recipe text written from the food database instead of a kitchen: "cook in Olive oil", "Prepare the Couscous", "stir in
// the drained Tuna, light, canned in water", and a seasoning line that printed as "Garlic, raw|Hot sauce, cayenne
// (Frank's-style)|Salsa". 47 recipes and 22 seasoning lines (2026-09-30). The recipe file was rewritten with this same
// function; running it here as well catches the text in plans saved before that, which carry their own copy.
const KITCHEN_NAME = [
  [/^egg, whole/i, "eggs"], [/^egg white/i, "egg whites"],
  [/^(turkey|beef|chicken|pork|bison|lamb|venison), ground/i, m => "ground "+m[1].toLowerCase()],
  [/^(tuna|salmon|mackerel|sardines), [^|]*(canned|in oil|in water)/i, m => "canned "+m[1].toLowerCase()],
  [/^bell pepper, red/i, "red bell pepper"], [/^enchilada sauce, red/i, "red enchilada sauce"],
  [/^tofu, (firm|silken)/i, m => m[1].toLowerCase()+" tofu"], [/^mayonnaise, light/i, "light mayonnaise"],
  [/^teriyaki sauce, sugar-free/i, "sugar-free teriyaki sauce"], [/^hot sauce, cayenne/i, "hot sauce"],
  [/^sriracha \/ hot sauce/i, "sriracha"], [/^mission carb balance tortilla, whole wheat/i, "whole wheat tortilla"],
];
function kitchenName(f){
  for(const [re, to] of KITCHEN_NAME){ const m = f.name.match(re); if(m) return typeof to==="function" ? to(m) : to; }
  return stepName(f);
}
// capitalised because they are names, so they stay that way mid-sentence
const KEEP_CAPS = /^(Greek|Dijon|Swiss|Parmesan|Normandy|English|Montreal|Cajun|Buffalo|Caesar|Italian|Mexican|Thai|Indian|Japanese|Korean|Chinese|French|Medjool|Brussels|Brazil|Kalamata)\b/;
let DB_PROSE = null;
function dbProse(){
  if(DB_PROSE) return DB_PROSE;
  // every database name with a comma or bracket, and its comma prefixes ("Egg, whole" is how "Egg, whole, cooked" was pasted)
  const full = new Map(), heads = new Map();
  FOODS.forEach(f => { if(f.recipe) return;
    const segs = f.name.split(", ");
    for(let k=segs.length; k>=2; k--){ const pre = segs.slice(0,k).join(", "); if(!full.has(pre)) full.set(pre, kitchenName(f)); }
    if(/\(/.test(f.name) && !full.has(f.name)) full.set(f.name, kitchenName(f));
    // and a food's own name capitalised in the middle of a sentence ("cook in Olive oil"); brands keep their capitals
    const h = f.name.split(",")[0].replace(/\s*\(.*\)/,"").trim();
    if(/^[A-Z][a-z][^A-Z]*$/.test(h) && !KEEP_CAPS.test(h) && !heads.has(h))
      heads.set(h, KITCHEN_NAME.some(([re]) => re.test(f.name)) ? kitchenName(f) : h.charAt(0).toLowerCase()+h.slice(1)); });
  const alt = keys => [...keys].sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
  DB_PROSE = { full, heads,
    fullRe: new RegExp("(?<![\\w-])(?:"+alt(full.keys())+")(?![\\w-]|\\s+(?:wheat|grain))", "g"),
    headRe: new RegExp("(?<=[a-z0-9,;)] )(?:"+alt(heads.keys())+")(?![\\w-])", "g") };
  return DB_PROSE;
}
// "Garlic, raw|Hot sauce, cayenne (Frank's-style)|Salsa" -> "Garlic, hot sauce or salsa"; database names inside a sentence
// become the words a cook would use, capitalised only where a sentence starts
function dbNamesToKitchen(text){
  if(!text || typeof FOODS==="undefined") return text;
  const D = dbProse(), one = x => D.full.get(x) || D.heads.get(x) || x;
  let s = String(text);
  if(s.indexOf("|") >= 0){
    const opts = s.split("|").map(x=>x.trim()).filter(Boolean).map(one).map(x => KEEP_CAPS.test(x) || !/^[A-Z][a-z]/.test(x) ? x : x.charAt(0).toLowerCase()+x.slice(1));
    s = opts.length > 1 ? opts.slice(0,-1).join(", ")+" or "+opts[opts.length-1] : (opts[0]||"");
    return s.charAt(0).toUpperCase()+s.slice(1);
  }
  s = s.replace(D.fullRe, (m, off, all) => { const to = D.full.get(m) || m;
    const start = off===0 || /(?:[.!?]|\d\.)\s+$/.test(all.slice(Math.max(0,off-6), off));
    return start ? to.charAt(0).toUpperCase()+to.slice(1) : to; });
  return s.replace(D.headRe, m => D.heads.get(m) || m);
}
// "Roasted Salmon or Cod, Potato & Asparagus" on a plate of sockeye named a fish she never buys, and its step said "10 to 14
// minutes for salmon or 12 to 15 for cod" (a client, 2026-10-01). A two-food choice keeps the one the list has.
function mealHasWord(meal, w){
  const names = (meal && meal.items || []).map(it=>{ const f=FOOD_BY_ID[it.id]; return f ? f.name.toLowerCase() : ""; }).join(" | ");
  return new RegExp("\\b"+String(w).toLowerCase().replace(/s$/,"")+"s?\\b").test(names);
}
function dishTitle(m){
  let t = String((m && m.dish) || "");
  // "Creamy Chickpea Curry over Rice" served on riced cauliflower says so
  if(/\bRice\b/.test(t) && !/cauliflower/i.test(t) && !mealHasWord(m, "rice") && (m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && /riced cauliflower/i.test(f.name); }))
    t = t.replace(/\bRice\b/, "Cauliflower Rice");
  if(!/\sor\s/i.test(t)) return t;
  return t.replace(/\b([A-Z][a-z]+) or ([A-Z][a-z]+)\b/g, (m0,a,b)=>{ const ha=mealHasWord(m,a), hb=mealHasWord(m,b);
    return ha && !hb ? a : hb && !ha ? b : m0; });
}
function planText(text, meal){
  if(!text) return text;
  let s = dbNamesToKitchen(String(text))
    .replace(/\b(\d+ to \d+)( minutes)? for ([a-z]+) or (\d+ to \d+)( minutes)? for ([a-z]+)\b/gi, (m0,t1,u1,a,t2,u2,b)=>{
      if(!meal) return m0; const ha=mealHasWord(meal,a), hb=mealHasWord(meal,b);
      return ha && !hb ? t1+" minutes" : hb && !ha ? t2+" minutes" : m0; }).replace(/\s*\([^()]*whichever your plan lists[^()]*\)/gi, "")
    // outside brackets it closes a list ("tomato or cucumber, whichever your plan lists"): the options can stay
    .replace(/,?\s*use whichever your plan lists/gi, "").replace(/,\s*whichever your plan lists/gi, "");
  // the planner's own words ("slot", "if that is your carb") leaked into 8 recipes; the recipe data is fixed, and
  // these catch the same lines in plans saved before the fix, which carry the old text
  for(const [re, to] of LEGACY_STEP_FIXES) s = s.replace(re, to);
  const hasDairy = meal && (meal.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && isDairyText(foodText(f)); });
  if(hasDairy) s = s.replace(/\s*\(if you eat dairy\)/gi, "");
  s = dayWords(s);                                   // "a batch cooked Sunday is good through Wednesday", for a numbered week
  return s.replace(/ {2,}/g, " ").replace(/ +([,.;:])/g, "$1");
}
// The recipe's "Oil" note is a paragraph on smoke points in 148 of the 243 recipes that have one ("Medium-high
// browning and a 375F bake both sit right around its ~375F smoke point, so it won't smoke..."). Explaining every
// step is the tell the de-AI pass named as the biggest one left. The client PDF says which oil to use; the coach
// screen keeps the full note.
function oilLine(text, meal){
  // the fat on the list is the one to use: the recipe's note offered "olive oil or avocado oil" on 246 of 1,926 test meals
  // and named an oil the list did not have on 146 (2026-09-30)
  if(meal){ const listed = (meal.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(isCookFat).map(f=>/^butter/i.test(f.name) ? "Butter" : f.name);
    return [...new Set(listed)].join(" and "); }
  const t = planText(text, meal); if(!t) return t;
  // an oil the note advises AGAINST is not an option ("instead of olive oil", "skip olive", "not butter")
  const pos = String(t).replace(/\b(skip|avoid|instead of|rather than|not|don't|do not|never|no)\b[^.;:]*?\b(oil|butter|ghee)\b/gi, " ");
  const oils = [], fam = o => o.toLowerCase().replace(/^extra[- ]virgin /, "");
  (pos.match(/\b(extra[- ]virgin olive|olive|avocado|canola|coconut|toasted sesame|sesame|peanut|vegetable|grapeseed|sunflower|spray) oil\b|\bcooking spray\b|(?<!(?:peanut|almond|cashew|nut|sunflower|seed|apple|cocoa|shea) )\bbutter\b|\bghee\b/gi) || [])
    .forEach(o => { if(!oils.some(x => fam(x)===fam(o))) oils.push(o); });
  // no oil named: a "no oil" recipe says so in two words, and a note about something else (the risotto's parmesan)
  // is not an oil line at all
  if(!oils.length) return "";                                       // "None needed" said nothing, so the line goes
  const list = oils.slice(0, 3).map((o,i) => i===0 ? o.charAt(0).toUpperCase()+o.slice(1).toLowerCase() : o.toLowerCase());
  return list.length === 1 ? list[0] : list.slice(0,-1).join(", ") + " or " + list[list.length-1];
}
// ---- Steps that match the list -------------------------------------------------------------------------------
// The recipe library was written once for every client, so its steps talk to all of them at once: "Pat your protein
// dry", "Prep your vegetable", "If your plan lists feta as the protein, crumble it over the top", "Dice the cucumber,
// tomato and red bell pepper" on a plate that has only cucumber. Across 1,926 test meals 23% used the planner's own
// words and 36% named a food the client was never given. fitSteps rewrites the steps against THIS meal's list when
// they are shown: a role word becomes the foods on the list, a condition about the list is settled (the step keeps
// its instruction without the "if", or goes), a food that is not on the list comes out of an ingredient run or an
// "or" choice, butter the list swapped for oil becomes that oil, and a clause or sentence goes only when every food
// it names is missing. The seasoning line is left alone: it is optional by design.
const STEP_NOUNS_EXTRA = [["soybeans","\\bsoybean"], ["seaweed","seaweed|nori"], ["sweet corn","sweet corn"], ["pollock","pollock"], ["haddock","haddock"], ["daikon","daikon"], ["hazelnuts","hazelnut"],   // 2026-10-06: conditionals on these printed "drain and rinse them" with no food named
  ["collard greens","collard"], ["greens","spinach|kale|arugula|romaine|lettuce|collard|chard|bok choy|greens"],
  ["leeks","leek"], ["radishes","radish"], ["beets","beet"], ["kimchi","kimchi"], ["sauerkraut","sauerkraut"], ["pickles","pickle"],
  ["nut butter","peanut butter|almond butter|cashew butter|pbfit"], ["sardines","sardine"], ["mussels","mussel"], ["scallops","scallop"],
  ["bacon","bacon"], ["paneer","paneer"], ["goat cheese","goat cheese"], ["halloumi","halloumi"], ["oat bran","oat bran"],
  ["sesame seeds","sesame seed"], ["pine nuts","pine nut"], ["red pepper","bell pepper"], ["green pepper","bell pepper"], ["yellow pepper","bell pepper"],
  ["red peppers","bell pepper"], ["snap peas","snap pea|sugar snap"], ["split peas","split pea"], ["navy beans","navy|white beans"],
  ["buckwheat groats","buckwheat"], ["brussels sprouts","brussels"], ["pears","pear"], ["figs","\\bfig"], ["cherries","cherr"], ["kiwi","kiwi"],
  ["plums","plum"], ["melon","melon|cantaloupe|honeydew"], ["pomegranate","pomegranate"], ["grapefruit","grapefruit"], ["pumpkin","pumpkin"],
  ["okra","okra"], ["artichoke","artichoke"], ["fennel","fennel"], ["chard","chard"], ["watercress","watercress"], ["parsnips","parsnip"],
  ["iceberg","lettuce|romaine"], ["rye","\\brye\\b|pumpernickel"], ["prunes","prune"], ["apricots","apricot"], ["nectarines","nectarine"]];
const STEP_FREE_WORDS = ["garlic","ginger","onions","red onion","white onion","yellow onion","shallots","scallions","green onions","chives","herbs",
  "basil","cilantro","parsley","dill","mint","rosemary","thyme","oregano","lemons","limes","salt","pepper","honey","maple syrup","salsa",
  "hot sauce","sriracha","cocoa","cinnamon","vanilla","spices",
  // a sprinkle to finish, like the honey and cocoa above: the steps keep it on every plan (it was stripped from each one, 2026-10-06)
  "sesame seeds"];
const STEP_KEEP_PLURAL = /^(peppers|greens|oats|grits|peas|dates|beans|nuts|brussels|chives|herbs|spices|pickles)$/;
const STEP_ROLE = "proteins?|produce|vegetables?|veg|veggies?|greens|fat|carbs?|grains?|starch|fruits?|beans|cheese|nut butter";
const STEP_MODWORD = "the|a|an|some|your|sliced|diced|chopped|minced|grated|shredded|fresh|raw|cooked|baked|roasted|steamed|frozen|canned|drained|rinsed|crumbled|toasted|thin|thinly|finely|roughly|halved|cherry|grape|red|green|yellow|baby|plain|light|reduced-fat|extra|leftover|warm|cold|crispy|crunchy|pickled|wilted|little|small|large|big|whole|ripe|flaked|shaved|mashed|smashed|hard-boiled|boiled|poached|scrambled|nonfat|lowfat|low-fat|greek|dill|salted|unsalted|few|seasoned|grilled|seared|marinated|spiced|glazed|charred|sauteed|sautéed|blanched|pan-seared|fried|air-fried|soft|creamy|hot|chilled|lean";
const STEP_MODPHRASE = "(?:(?:a|an|some)\\s+)?(?:(?:small|big|generous|little|good)\\s+)?(?:sprinkle|handful|drizzle|spoonful|spoon|scoop|pinch|dash|splash|dollop|bit|squeeze|couple|cup|slice|slices|piece|pieces|wedge|wedges)\\s+of";
const STEP_MOD = "(?:\\b(?:"+STEP_MODWORD+")\\b|"+STEP_MODPHRASE+")";
const STEP_MOD_RE = new RegExp("(?:"+STEP_MOD+"\\s+)+$", "i");
const STEP_SEP_RE = new RegExp("^(?:\\s*,\\s*|\\s+)(?:(?:and\\/or|and|or|&|plus)\\s+)?(?:"+STEP_MOD+"\\s+)*$", "i");
const STEP_VERB = "add|top|finish|sprinkle|scatter|garnish|serve|drizzle|stir|fold|toss|layer|pile|spoon|crumble|dice|slice|chop|cube|grate|mash|spread|save|warm|cook|roast|steam|simmer|saute|sauté|bake|place|arrange|season|squeeze|halve|quarter|cut|tear|shred|mix|whisk|blend|pour|heat|melt|wilt|char|grill|sear|brown|keep|set|pack|reheat|microwave|boil|fry|pan-fry|drain|rinse|peel|core|pit|scoop"
  // 2026-10-06: "..., sear it ..., then lay it over the dirty rice" was ONE clause, so a plate without rice lost the sear too
  + "|lay|transfer|return|flip|let|rest|cover|remove|divide|pat|broil|poach|scramble|beat|rub|marinate|bring|reduce|tuck|nestle|trim|soak|steep";
let STEP_NOUNS = null, TPL_BY_TITLE = null;
function stepForms(w){
  const f = [w];
  if(!STEP_KEEP_PLURAL.test(w)){
    if(/ies$/.test(w)) f.push(w.replace(/ies$/,"y"));
    else if(/oes$/.test(w) || /(ch|sh|x|ss)es$/.test(w)) f.push(w.replace(/es$/,""));
    else if(/[^s]s$/.test(w)) f.push(w.slice(0,-1));
    else if(!/s$/.test(w)){ f.push(w+"s"); if(/(o|ch|sh|x)$/.test(w)) f.push(w+"es"); }
  }
  return f;
}
function stepNouns(){
  if(STEP_NOUNS) return STEP_NOUNS;
  const seen = new Set(); STEP_NOUNS = [];
  const FREE = new Set(STEP_FREE_WORDS);                                 // exact words: "peppers" is a vegetable, "pepper" is seasoning
  const add = (w, re, free) => { if(seen.has(w)) return; seen.add(w); let rx; try{ rx = new RegExp(re,"i"); }catch(e){ return; }
    free = free || FREE.has(w);
    STEP_NOUNS.push({ w, re:rx, free, len:w.length, wre:new RegExp("\\b(?:"+stepForms(w).map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")\\b","gi") }); };
  [...(window.OB_FOOD_NOUNS||[]), ...STEP_NOUNS_EXTRA].forEach(([w,re])=>add(w, re, false));
  STEP_FREE_WORDS.forEach(w=>add(w, w.replace(/s$/,"").replace(/^(red|white|yellow) /,""), true));
  STEP_NOUNS.sort((a,b)=>b.len-a.len);
  return STEP_NOUNS;
}
const tplByTitle = title => { if(!TPL_BY_TITLE){ TPL_BY_TITLE = {}; TEMPLATES.forEach(t=>{ TPL_BY_TITLE[t.title]=t; }); } return TPL_BY_TITLE[title]; };
// how a food reads in a sentence: "chicken breast", "egg whites", "ground turkey", "Greek yogurt"
function stepName(f){
  const full = f.name.toLowerCase();
  let n = f.name.split(",")[0].replace(/\s*\(.*\)/,"").trim();
  if(/^egg white/i.test(n)) return "egg whites";
  if(/^egg$/i.test(n)) return "eggs";
  if(/^(turkey|beef|chicken|pork|bison|lamb|venison)$/i.test(n) && /\bground\b/.test(full)) n = "ground "+n;
  n = n.replace(/^(mission carb balance|pbfit|dave's killer|carbe diem|ezekiel 4:9)\s+/i, "");
  if(/english muffin/i.test(n)) return "English muffin";
  return properCase(n.toLowerCase());
}
const joinNames = (a, conj) => a.length<=1 ? (a[0]||"") : a.slice(0,-1).join(", ")+" "+(conj||"and")+" "+a[a.length-1];
function stepRoleFoods(meal, role){
  const t = tplByTitle(meal.dish);
  const fs = (meal.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(f=>f && !f.recipe);
  const by = re => re ? fs.filter(f=>re.test(normName(f))) : [];
  const cats = (...c) => fs.filter(f=>c.includes(f.cat));
  role = role.toLowerCase().replace(/s$/,"");
  let out = [];
  if(role==="protein") out = t && by(t.reP).length ? by(t.reP) : fs.filter(f=>f.cat==="Protein"||f.cat==="Seafood"||(f.cat==="Eggs & Dairy" && f.protein_g>=8));
  else if(/^(produce|vegetable|veg|veggie)$/.test(role)){
    const veg = cats("Vegetables").filter(f=>!/kimchi|sauerkraut|pickle/i.test(f.name) || (t && t.reProd && t.reProd.test(normName(f))));
    const own = t && t.reProd ? veg.filter(f=>t.reProd.test(normName(f))) : [];
    out = own.length ? own : veg.length ? veg : (role==="produce" ? cats("Fruits") : []); }
  else if(role==="green") out = fs.filter(f=>f.cat==="Vegetables" && /spinach|kale|arugula|romaine|lettuce|collard|chard|bok choy|greens/i.test(f.name));
  else if(role==="fat") out = t && by(t.reF).length ? by(t.reF) : cats("Fats & Oils","Nuts & Seeds");
  else if(/^(carb|grain|starch)$/.test(role)) out = t && by(t.reC).length ? by(t.reC) : cats("Grains & Starches");
  else if(role==="fruit") out = cats("Fruits");
  else if(role==="bean") out = cats("Legumes");
  else if(role==="cheese") out = fs.filter(f=>/cheese|feta|mozzarella|cheddar|parmesan|ricotta/i.test(f.name) && !/cottage/i.test(f.name));
  else if(role==="nut butter") out = fs.filter(f=>/peanut butter|almond butter|cashew butter|pbfit/i.test(f.name));
  const seen = new Set();
  return out.filter(f=>{ const n=stepName(f); if(seen.has(n)) return false; seen.add(n); return true; });
}
// the food words a sentence names, with where they sit. Oils, sauces, powders and the like name a food they are not
// ("avocado oil", "tomato paste"), and a negation names one the dish does NOT use: those spans are blanked first.
function stepNounHits(s){
  const blank = m => " ".repeat(m.length);
  let w = String(s).toLowerCase()
    .replace(/\b(extra[- ]virgin )?(olive|avocado|coconut|toasted sesame|sesame|canola|peanut|grapeseed|sunflower|vegetable|walnut|chili|flaxseed|flax|cooking|spray) oil\b/g, blank)
    .replace(/\b(fish|oyster|soy|hoisin|worcestershire|hot|buffalo|bbq|barbecue|teriyaki|enchilada|pizza|taco|curry|tomato|pasta|chili|sriracha|pesto|apple) (sauce|paste|puree)\b/g, blank)
    .replace(/\b[a-z]+ (broth|stock|vinegar|juice|zest|extract|seasoning|flakes)\b/g, blank)
    .replace(/\b(garlic|onion|chili|chilli|cocoa|curry|baking|mustard|ginger|paprika) powder\b/g, blank)
    .replace(/\b(?:(?:almond|soy|oat|cashew|coconut|rice|dairy|skim)(?:,\s*|,?\s+or\s+|\s+))+milks?\b/g, blank)
    .replace(/\b(black|white|cayenne|lemon) pepper\b|\bcrushed red pepper\b|\bpeppercorns?\b/g, blank)
    .replace(/\b[a-z]+-(like|free)\b/g, blank)
    .replace(/\b(skip|avoid|no|not|never|instead of|rather than|in place of|without|swap)\b[^.;,)]*/g, blank)
    .replace(/\btoast(ed|ing|s)?\b/g, (m, suf, off, str) => (!suf && /\b(on|with|of|the|your|some|grain|wheat|sourdough|rye|slices? of|piece of)\s+$/.test(str.slice(Math.max(0,off-26), off))) ? m : blank(m));
  const hits = [];
  stepNouns().forEach(n=>{ w = w.replace(n.wre, (m, off)=>{ hits.push({ w:n.w, re:n.re, free:n.free, start:off, end:off+m.length, txt:m }); return blank(m); }); });
  hits.sort((a,b)=>a.start-b.start);
  for(let i=hits.length-1;i>0;i--){ const a=hits[i-1], b=hits[i];
    if(/^[\s-]+$/.test(String(s).slice(a.end, b.start)) || a.end===b.start){ b.start = a.start; b.txt = String(s).slice(a.start, b.end); hits.splice(i-1,1); } }
  const low = String(s).toLowerCase();
  hits.forEach(h=>{ const t = low.slice(h.end).match(/^(?:\s+(?:seeds|hearts|groats|florets|leaves|fillets?|breasts?|thighs?|slices|strips|wedges|cubes|chunks|halves|sticks|coins|rounds|spears|kernels|pieces|chips)\b|, (?:red|green|yellow|raw|cooked|smooth|plain|nonfat|2% lowfat|lowfat|dry|canned)\b(?!\s+(?:and|or)\b))/);
    if(t && !hits.some(o=>o!==h && o.start>=h.end && o.start<h.end+t[0].length)) h.end += t[0].length; });
  return hits.sort((a,b)=>a.start-b.start);
}
// what a food can stand in for in a recipe step: rice for quinoa, trout for salmon, kale for spinach. Never across
// kinds: a step that toasts a slice of bread is not about a potato.
function stepKind(f){
  const n = f.name.toLowerCase();
  if(/avocado/.test(n)) return "avocado";
  if(/riced cauliflower|cauliflower rice/.test(n)) return "grain";
  if(f.cat==="Grains & Starches" || /potato|\byam\b/.test(n))
    return /potato|\byam\b/.test(n) ? "potato" : /bread|pita|tortilla|bagel|english muffin|\bwrap|\bbun\b|naan|arepa|rice cake|cracker|\brye\b/.test(n) ? "bread"
      : /\boat|granola|muesli|cereal|\bbran\b/.test(n) ? "oats" : "grain";
  if(f.cat==="Vegetables") return /spinach|kale|arugula|romaine|lettuce|collard|chard|bok choy|greens|watercress/.test(n) ? "leafy" : "veg";
  if(f.cat==="Fruits") return "fruit";
  if(f.cat==="Legumes") return /edamame|tofu|tempeh/.test(n) ? "plantprotein" : "legume";
  if(f.cat==="Nuts & Seeds") return /butter|pbfit/.test(n) ? "nutbutter" : "nut";
  if(f.cat==="Seafood") return "fish";
  if(f.cat==="Protein") return /tofu|tempeh|seitan|edamame/.test(n) ? "plantprotein" : /powder|whey|isolate/.test(n) ? "powder" : "meat";
  if(f.cat==="Eggs & Dairy") return /\begg/.test(n) ? "egg" : /yogurt|skyr|cottage|kefir/.test(n) ? "dairyprotein"
      : /cheese|feta|mozzarella|cheddar|parmesan|ricotta|halloumi|paneer/.test(n) ? "cheese" : "dairy";
  return "";
}
const STEP_NOUN_KIND = {};
// does this food answer to this recipe word by its own name ("rice" is white rice, not riced cauliflower or a rice cake)
// "steak" is the right word for a sirloin, a ribeye or a top round: the swap read "Pat the beef sirloin dry" three times
// in one recipe (2026-09-30)
const STEP_WORD_ALIAS = { steak:/sirloin|ribeye|tenderloin|top round|flank|strip|filet|steak/i,
  // "the kiwi" is the Kiwifruit on the list: without this it read as a stray and became another fruit (2026-10-09)
  kiwi:/kiwi/i };
function stepWordNames(h, f){
  if(!h.re.test(normName(f))) return false;
  const head = h.w.split(" ").pop().replace(/s$/,"");
  if(STEP_WORD_ALIAS[head] && STEP_WORD_ALIAS[head].test(f.name)) return true;
  const n = stepName(f).toLowerCase()+" | "+normName(f).toLowerCase();
  return stepForms(h.w.split(" ").pop()).some(w=>new RegExp("\\b"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(n));
}
function stepNounKind(h){
  if(h.w in STEP_NOUN_KIND) return STEP_NOUN_KIND[h.w];
  const cands = FOODS.filter(x=>!x.recipe && h.re.test(normName(x)));
  const head = h.w.split(" ").pop();
  const f = cands.find(x=>stepForms(head).some(w=>new RegExp("\\b"+w+"$","i").test(stepName(x)))) || cands.find(x=>stepWordNames(h, x)) || cands[0];
  return (STEP_NOUN_KIND[h.w] = f ? stepKind(f) : "");
}
// the solver swaps foods the recipe never names (quinoa where the steps say rice). When the steps name a food of the
// same kind that is NOT on the list and the list has one the steps never mention, the steps take the listed one. One
// listed food answers for its whole kind ("the ground beef" and later "the seasoned beef" both become the turkey). A
// vegetable only stands in where the step treats it the way the list has it: cooked kale is not the romaine a sandwich
// is layered with. Aromatics (garlic, onion, lemon) never stand in for anything.
const STEP_COOK_VERB = /\b(saut[eé]|cook|steam|roast|wilt|simmer|stir-fry|sear|grill|bake|boil|braise|blanch|fry|char|heat|warm|microwave)/i;
function stepSwaps(text, meal){
  const fs = (meal.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(f=>f && !f.recipe);
  const inList = " "+fs.map(f=>normName(f)).join(" | ")+" ";
  const all = stepNounHits(text), hits = all.filter(h=>!h.free && h.w!=="butter");
  // a brand list in brackets ("(Fiber One, All-Bran, or a high-protein granola)") is not an instruction
  const inParen = h => { const o = text.lastIndexOf("(", h.start), c = text.lastIndexOf(")", h.start); return o > c; };
  // a word the list only answers loosely ("rice" for riced cauliflower, "cheese" for feta) is a stray here too: the
  // listed food's own name is the better word, if the steps never use it
  // nor is a food a condition names ("If it is the carrots, cut them into matchsticks"): settleConds keeps or drops that
  // sentence, and a swap turned it into "If it is the seaweed snack" on a cucumber plate (2026-10-06)
  const inCond = h => /\bif (?:your [a-z ]+? (?:is|are|includes?)|it is|it's|they are|you have|you chose) (?:the |a |an )?(?:[a-z-]+ ){0,3}$/i.test(text.slice(Math.max(0, h.start-80), h.start));
  const strays = hits.filter(h=>!fs.some(f=>stepWordNames(h, f)) && !inParen(h) && !inCond(h));
  if(!strays.length) return text;
  const roleNamed = new Set();
  (String(text).match(new RegExp("\\byour ("+STEP_ROLE+")\\b|\\bthe (vegetables?)\\b", "gi"))||[])
    .forEach(m=>stepRoleFoods(meal, m.replace(/^(your|the)\s+/i,"")).forEach(f=>roleNamed.add(f.id)));
  const named = f => roleNamed.has(f.id) || all.some(h=>stepWordNames(h, f));
  const tp = tplByTitle(meal.dish);
  const freeFood = f => STEP_FREE_WORDS.some(w=>new RegExp("^"+w.replace(/s$/,"")+"s?\\b","i").test(f.name))
    && !(tp && tp.reProd && tp.reProd.test(normName(f)) && /^(onion|red onion|shallot|scallion|green onion|leek)/i.test(f.name));
  const extras = fs.filter(f=>!named(f) && !freeFood(f) && stepKind(f) && !/kimchi|sauerkraut|pickle/i.test(f.name));
  if(!extras.length) return text;
  const cookedVeg = f => /\b(cooked|boiled|steamed|roasted|frozen|canned)\b/i.test(f.name);
  const sentenceOf = h => { const a = text.lastIndexOf(".", h.start)+1, b = text.indexOf(".", h.end); return text.slice(a, b<0 ? text.length : b); };
  // the same recipe word always becomes the same listed food; a raw use (a slaw, a sandwich layer, dippers) needs a raw one
  const pick = {}, byWord = {};
  let out = text;
  strays.forEach(h=>{
    if(h.re.source in byWord) return;
    const k = stepNounKind(h); if(!k) return;
    const vegRole = k==="leafy" || k==="veg";
    const raw = vegRole && !STEP_COOK_VERB.test(sentenceOf(h)) && /\b(raw|layer|shred|crunch|fresh|salad|slaw|dippers?|sticks|sandwich|wrap)\b/i.test(sentenceOf(h));
    const slot = vegRole ? k+(raw?":r":"") : k;
    if(!(slot in pick)) pick[slot] = extras.find(f=>stepKind(f)===k && (!raw || !cookedVeg(f)) && !Object.values(pick).includes(f)) || null;
    byWord[h.re.source] = pick[slot];
  });
  strays.slice().reverse().forEach(h=>{
    const x = byWord[h.re.source]; if(!x) return;
    let nm = stepName(x); if(/^[A-Z]/.test(text.slice(h.start, h.end)) && !/^[A-Z]/.test(nm)) nm = nm.charAt(0).toUpperCase()+nm.slice(1);
    const opt = out.slice(h.end).match(/^\s*\((?:[a-z-]+(?:,\s*|,? or |,? and ))+[a-z-]+\)/i);
    const pre = h.w==="fish" ? (out.slice(0, h.start).match(/\b(white|firm|flaky|mild)\s+$/i)||[""])[0] : "";
    out = out.slice(0, h.start - pre.length) + nm + out.slice(h.end + (opt ? opt[0].length : 0));
  });
  return out;
}
function fitSteps(text, meal, servings){
  if(!text || !meal || !(meal.items||[]).length) return text;
  const fs = (meal.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(Boolean);
  const inList = " "+fs.map(f=>normName(f)).join(" | ")+" ";
  const onList = h => h.re.test(inList);
  text = stepSwaps(String(text), meal);
  const fullText = text;
  const keepable = h => h.free || onList(h);
  const soft = h => h.w==="butter";                                     // handled by the fat swap, never a reason to cut
  const foodOf = h => { const c = fs.filter(f=>h.re.test(normName(f))); const t = (h.txt||"").toLowerCase();
    return c.find(f=>{ const n = stepName(f).toLowerCase(); return t.includes(n) || n.includes(t); }) || c[0]; };
  const diet = (state.profile && state.profile.diet) || "";
  const dairyOn = fs.some(f=>isDairyText(foodText(f)));
  const cookFat = fs.find(isCookFat), cookFats = fs.filter(isCookFat);
  const ROLE_RE = new RegExp("\\byour ("+STEP_ROLE+")\\b(?!\\s+(?:powder|shake|bar|bars|scoop))|\\bthe (vegetables?)\\b(?! (?:broth|stock))", "gi");
  // a condition about the list: true when a food it names is on the list ("cooked broccoli" needs the cooked one)
  // the food a condition names; a seasoning word counts when it is one of this dish's own options ("If it is the onion")
  const offeredRaw = (()=>{ const t = tplByTitle(meal.dish); return t ? ["protein","carb","fat","produce"].map(k=>t[k]||"").join("|") : ""; })();
  const offeredTxt = offeredRaw.replace(/\\/g,"");
  const condHit = c => stepNounHits(c).filter(h=>!h.free)[0] || (offeredTxt ? stepNounHits(c).filter(h=>h.free && h.re.test(offeredTxt))[0] : null) || null;
  const condTrue = c => {
    // oils are blanked out of the noun scan (the steps' "olive oil" is cooking, not a food on the plate), so a condition about
    // one is answered here: "If your fat is the olive oil" holds only when that oil is on the list. Unanswered, the role swap
    // that runs next turned it into "If the walnuts is the olive oil" (2026-10-05)
    const oil = String(c).match(/\b(olive|avocado|coconut|sesame|canola|peanut|grapeseed|sunflower|vegetable|walnut|flaxseed)\s+oil\b/i);
    if(oil) return fs.some(f => /\boil\b/i.test(f.name) && new RegExp("\\b"+oil[1]+"\\b","i").test(f.name));
    const hs = stepNounHits(c).filter(h=>!h.free);
    if(!hs.length){
      // a seasoning word (onion, garlic) that is also one of this dish's own slot options names the client's pick: "If it
      // is the onion, ..." holds only when the onion is on the list. Elsewhere it stays an aside (Spanish omelette, 2026-10-06)
      const fh = offeredTxt ? stepNounHits(c).filter(h=>h.free && h.re.test(offeredTxt)) : [];
      if(fh.length) return fh.some(h=>fs.some(f=>h.re.test(normName(f))));
      // a food the dictionary does not know ("If it is the tahini"): match the dish's own options by their first word
      const lc = String(c).toLowerCase();
      const opts = offeredRaw.split("|").map(o=>o.trim()).filter(o => { const w = o.replace(/\\/g,"").toLowerCase().replace(/[^a-z ]/g," ").trim().split(/\s+/)[0];
        return w && w.length >= 4 && new RegExp("\\b"+w+"\\b").test(lc); });
      if(!opts.length) return null;
      return opts.some(o => { try { const re = new RegExp(o, "i"); return fs.some(f=>re.test(normName(f))); } catch(e){ return false; } });
    }
    // "the canned salmon" is its own option beside "the cooked salmon": the word in front decides which one the list has
    // (without "canned" here, a canned-salmon sentence stayed on a plan with cooked salmon, 2026-10-05)
    return hs.some(h=>{ const q = (c.toLowerCase().slice(Math.max(0,h.start-8), h.start).match(/\b(cooked|raw|canned)\s*$/)||[])[1];
      return fs.some(f=>h.re.test(normName(f)) && (!q || new RegExp("\\b"+q+"\\b","i").test(f.name))); });
  };
  const COND = "(?:if (?:your plan lists |your pick (?:is|are) |your (?:"+STEP_ROLE+") includes? (?:the )?|your (?:"+STEP_ROLE+")(?: pick)? (?:is|are) |(?:it'?s|it is) (?:the )?|you chose |you eat |you'?re adding |you are adding |using |you have |(?=[^,;:]*? (?:is|are) your (?:"+STEP_ROLE+")))|for (?:the )?)([^,;:()]+?)(?: (?:is|are) your (?:"+STEP_ROLE+")(?: pick)?| as your (?:"+STEP_ROLE+"))?(?: instead)?(?: and you eat dairy)?,\\s*";
  const fixPronoun = (act, cond) => { const h = condHit(cond); if(!h) return act;
    // "drain and rinse them" too: a pronoun after two or three verbs kept "them" and lost the food's name (2026-10-06)
    // and "it is done at 165F" as the subject prints "The chicken breast is done at 165F", not a bare "It is done"
    return act.replace(/^((?:gently |just |simply )?[a-z-]+(?:(?:,\s*| and | then )[a-z-]+){0,2}) (them|it)\b/i, (m, v) => `${v} the ${h.txt}`)
      .replace(/^(?:it|they)\b(?=\s+(?:is|are|was|should|will|needs?|reads?|takes?|cooks?)\b)/i, `the ${h.txt}`); };
  const cap = s => s.replace(/^(\s*)([a-z])/, (m,a,b)=>a+b.toUpperCase());
  const clean = s => s.replace(/\(\s*[.,;]?\s*\)/g,"").replace(/ {2,}/g," ").replace(/ +([,.;:])/g,"$1").replace(/([,;:])\1+/g,"$1").replace(/,\s*\./g,".").replace(/;\s*\./g,".").replace(/:\s*\./g,".").trim();
  function settleConds(s){
    // "(If your plan lists egg whites, gently cook them ... .)"
    s = s.replace(new RegExp("\\s*\\(\\s*"+COND+"([^()]*)\\)", "gi"), (m, cond, act) => {
      const v = condTrue(cond); if(v===null) return m; return v ? " "+cap(fixPronoun(act, cond)).replace(/\s*$/,"") : ""; });
    // "... : if it is the cooked broccoli, roast ...; if it is raw broccoli, chop ..." (one or more branches)
    const re = new RegExp("(^|[:;]\\s*)"+COND+"([^;]*?)(?=;|$)", "gi");
    const branches = []; s.replace(re, (m, lead, cond, act, off) => { branches.push({ m, lead, cond, act, off, v:condTrue(cond), fr:/^[:;\s]*for\b/i.test(m.slice(lead.length)) }); return m; });
    // "For a creamy finish, ..." is not a condition: a "for" branch counts only when it names a food
    for(let i=branches.length-1;i>=0;i--) if(branches[i].fr && branches[i].v===null) branches.splice(i,1);
    if(!branches.length) return s;
    if(branches.some(b=>b.v===null)) return s;
    const trueN = branches.filter(b=>b.v).length;
    if(!trueN && !branches[0].lead.trim() && branches[0].off===0) return null;   // the whole sentence is about foods this plate lacks
    let outS = s, shift = 0, carry = "";
    branches.forEach(b=>{
      const at = b.off + shift;
      const h = condHit(b.cond);
      // "Prepare the broccoli: if cooked, ...; if raw, ..." keeps its colon when the first branch goes
      const lead = carry && b.v ? carry : b.lead;
      if(!b.v && /:/.test(b.lead)) carry = b.lead; else if(b.v) carry = "";
      let rep;
      if(!b.v) rep = "";
      else {
        // an action that never names its food keeps the food in front: "If your fruit is the figs, trim the stems and slice
        // them" printed "Trim the stems and slice them" (55 everyday recipes, 2026-10-06); a role word names it later
        const a = fixPronoun(b.act, b.cond);
        const named = h && (new RegExp("\\byour (?:"+STEP_ROLE+")\\b", "i").test(a) || stepNounHits(a).some(x=>x.w===h.w || (!x.free && !h.free && foodOf(x) && foodOf(x)===foodOf(h))));
        rep = lead + (h && (trueN>1 || !named) ? `for the ${h.txt}, ` : "") + a;
      }
      if(/^\s*$/.test(b.lead) && rep) rep = cap(rep);
      outS = outS.slice(0, at) + rep + outS.slice(at + b.m.length); shift += rep.length - b.m.length;
    });
    outS = outS.replace(/;\s*(?=;|$)/g, "").replace(/^\s*;\s*/, "");
    if(/^\s*[A-Z(]/.test(s)) outS = cap(outS);
    const endP = (s.match(/[.!?]\)?\s*$/)||[""])[0].trim();
    if(endP && !/[.!?]\)?\s*$/.test(outS)) outS = outS.replace(/\s*$/, "") + endP;
    return outS;
  }
  function roles(s){
    s = s.replace(/\s+as (?:the |your )(?:protein|carb|fat|produce|vegetable)( instead)?\b/gi, "$1");
    // "the rest of your produce" is what the other steps have not used yet; nothing left means the step has no job
    s = s.replace(new RegExp("\\bthe rest of your ("+STEP_ROLE+")\\b(\\s*\\([^)]*\\))?", "gi"), (m, role) => {
      const rest = stepRoleFoods(meal, role).filter(f=>!stepNounHits(fullText).some(h=>stepWordNames(h, f)));
      return rest.length ? "the rest of the " + joinNames(rest.map(stepName)) : "\u0002";
    });
    if(s.includes("\u0002")) return null;
    s = s.replace(new RegExp("\\b(your (?:"+STEP_ROLE+"))(?:,\\s*(?:the\\s+)?[a-z ,]+?(?= and (?:the )?[a-z]+\\b(?! (?:it|them)\\b))(?: and (?:the )?[a-z]+)?(?=[.;]|$)|\\s*\\([^)]*\\))", "gi"), "$1");
    return s.replace(ROLE_RE, (m, r1, r2) => {
      const foods = stepRoleFoods(meal, r1||r2);
      if(!foods.length) return r1 ? "\u0003" : m;                        // nothing on the list plays that part: the words go (below)
      const names = foods.map(stepName);
      const fresh = names.filter(n=>!new RegExp("\\b"+n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(s));
      // "Your fat goes in last" opens a sentence: it prints "The avocado goes in last", not "the avocado"
      return (/^[A-Z]/.test(m) ? "The " : "the ") + joinNames(fresh.length ? fresh : names);
    }).replace(/, ([^,.;]+?),?\s+(?:and|or)\s+\u0003/g, " and $1")     // "the oats, your berries, and your fat" with no fat
      .replace(/,?\s+(?:and|or)\s+\u0003/g, "").replace(/\u0003,?\s*(?:and\s+)?/g, "");
  }
  // butter the solver swapped for oil: "melt the butter" becomes "heat the olive oil"
  function fatSwap(s){
    if(!cookFat) return s;
    const oil = stepName(cookFat);
    // one cooking oil on the list: an "extra-virgin olive oil" in the steps next to avocado oil on the list is the list's
    // oil (flavour oils like toasted sesame stay whatever they are)
    if(cookFats.length===1 && !/butter/i.test(cookFat.name)){
      const mine = cookFat.name.toLowerCase().replace(/ oil$/,"");
      s = s.replace(/\b(?:extra[- ]virgin\s+)?(olive|avocado|canola|vegetable|neutral)\s+oil\b/gi, (m, kind) =>
        kind.toLowerCase()===mine ? m : (/^[A-Z]/.test(m) ? oil.charAt(0).toUpperCase()+oil.slice(1) : oil));
    }
    // butter on the list stays butter, whichever fat is listed first ("melt the butter into the potato" beside olive oil
    // for the sear read "heat the olive oil into it", a client's plan, 2026-09-30)
    if(cookFats.some(f=>/butter/i.test(f.name))) return s;
    // a nut or seed butter is not the cooking fat ("peanut butter" printed as "peanut avocado oil", 2026-10-06)
    return s.replace(/\b(melt(?:s|ing)?\s+)?((?:about )?half (?:of )?the |the rest of the |a (?:knob|pat|tablespoon|teaspoon|tbsp|tsp) of |a little |the |some )?((?:salted |unsalted )?(?<!(?:peanut|almond|cashew|nut|seed|sunflower|sesame|pecan|hazelnut|walnut|pistachio|macadamia|coconut|cocoa|apple|soy)[\s-])butter)\b(?! beans)/gi, (m, verb, qty, b, off, str) => {
      if(/\b(in place of|instead of|rather than|not|no|skip|swap)\s+(?:the\s+)?$/i.test(str.slice(Math.max(0, off-20), off))) return m;
      const v = verb ? (verb[0]==="M" ? "Heat " : "heat ") : "";
      const q = !qty ? (verb ? "the " : "") : /^a (knob|pat|tablespoon|teaspoon|tbsp|tsp) of /i.test(qty) ? (verb ? "the " : "a little ") : qty;
      return v + q + oil;
    });
  }
  // ingredient runs lose the foods that are not on the list ("the onion, carrot, celery and garlic")
  function pruneRuns(s){
    const hs = stepNounHits(s); const groups = []; let g = [];
    hs.forEach(h=>{ const sep = g.length ? s.slice(g[g.length-1].end, h.start) : "";
      if(g.length && STEP_SEP_RE.test(sep) && /,|\b(and|or|plus)\b|&/.test(sep)) g.push(h); else { if(g.length>1) groups.push(g); g=[h]; } });
    if(g.length>1) groups.push(g);
    const split = [];
    groups.forEach(gr=>{ const seps = gr.slice(1).map((h,i)=>s.slice(gr[i].end, h.start));
      if(!seps.some(x=>/\bor\b/i.test(x)) || !seps.some(x=>/\band\b(?!\/)/i.test(x))){ split.push(gr); return; }
      let cur = [gr[0]]; seps.forEach((x,i)=>{ if(/\band\b(?!\/)/i.test(x)){ if(cur.length>1) split.push(cur); cur=[gr[i+1]]; } else cur.push(gr[i+1]); });
      if(cur.length>1) split.push(cur); });
    split.sort((a,b)=>a[0].start-b[0].start).reverse().forEach(gr=>{
      const seenF = new Set();
      const keepI = gr.map(h=>{ if(!keepable(h)) return false; const k = h.free ? "w:"+h.w : "f:"+((foodOf(h)||{}).id||h.w); if(seenF.has(k)) return false; seenF.add(k); return true; });
      if(!keepI.some(Boolean) || keepI.every(Boolean)) return;
      const mods = gr.map(h=>{ const pre = s.slice(0, h.start).match(STEP_MOD_RE); return pre ? h.start-pre[0].length : h.start; });
      const txt = gr.map((h,i)=>s.slice(mods[i], h.end).replace(/^(and\/or|and|or|plus|&)\s+/i,""));
      const conj = /\bor\b/i.test(s.slice(gr[gr.length-2].end, gr[gr.length-1].start)) ? "or" : "and";
      const parts = txt.filter((x,i)=>keepI[i]);
      const lead = (s.slice(mods[0], gr[0].start).match(new RegExp("^(?:(?:the|a|an|your|some)\\s+)?(?:"+STEP_MODPHRASE+"\\s+)?", "i"))||[""])[0];
      if(lead && !keepI[0] && !/^(the|a|an|your|some)\s/i.test(parts[0])) parts[0] = lead + parts[0];
      s = s.slice(0, mods[0]) + joinNames(parts, conj) + s.slice(gr[gr.length-1].end);
    });
    return s;
  }
  // a run of "or" choices keeps the ones this plate can follow ("quarter fresh figs, slice a pear, or halve grapes")
  function pruneChoices(s0){
    const par = []; const masked = s0.replace(/\([^()]*\)/g, m => { par.push(m); return "\u0001"+(par.length-1)+"\u0001"; });
    return choices(masked).replace(/\u0001(\d+)\u0001/g, (m,i)=>par[+i]);
  }
  function choices(s){
    const ci = s.lastIndexOf(":", s.search(/,?\s+or\s/i));
    if(ci > 0){ const head = s.slice(0, ci+1), rest = s.slice(ci+1); const lead = rest.match(/^\s*/)[0]; return head + lead + choices(rest.slice(lead.length)); }
    const endP = (s.match(/[.!?]\s*$/)||[""])[0]; if(endP) s = s.slice(0, s.length-endP.length);
    const segs = s.split(new RegExp("(,\\s+|\\s+(?=or\\s+(?:(?:just|simply|instead)\\s+)?(?:(?:"+STEP_VERB+")\\b|(?:a|an|the|some)\\s)))", "i"));   // keep the separators
    const pieces = []; for(let i=0;i<segs.length;i+=2) pieces.push({ txt:segs[i], sep:segs[i+1]||"" });
    const act = new RegExp("^or\\s+(?:(?:just|simply|instead)\\s+)?(?:(?:"+STEP_VERB+")\\b|(?:a|an|the|some)\\s)", "i");
    let lastOr = -1; pieces.forEach((p,i)=>{ if(act.test(p.txt)) lastOr = i; });
    if(lastOr < 1) return s + endP;
    const words = t => t.replace(/\([^)]*\)/g,"").split(/\s+/).filter(Boolean).length;
    let first = lastOr; while(first>0 && !/[:(]\s*$/.test(pieces[first-1].txt) && words(pieces[first-1].txt)<=16 && first>lastOr-3) first--;
    const run = pieces.slice(first, lastOr+1);
    const bad = run.map(p=>{ const hs = stepNounHits(p.txt).filter(h=>!h.free && !soft(h)); return hs.length>0 && !hs.some(onList); });
    if(!bad.some(Boolean) || bad.every(Boolean)) return s + endP;
    const kept = run.filter((p,i)=>!bad[i]).map(p=>p.txt.replace(/^or\s+/i,""));
    const rebuilt = kept.length===1 ? kept[0] : kept.slice(0,-1).join(", ")+", or "+kept[kept.length-1];
    const before = pieces.slice(0, first).map(p=>p.txt+p.sep).join(""), after = pieces.slice(lastOr+1).map(p=>p.txt+p.sep).join("");
    return before + rebuilt + (after ? run[run.length-1].sep + after : "") + endP;
  }
  function pruneParens(s){
    return s.replace(/\s*\(([^()]*)\)/g, (m, inner) => {
      const parts = inner.split(/;\s*/); if(parts.length < 2) return m;
      const keep = parts.filter(p=>{ const hs = stepNounHits(p).filter(h=>!h.free && !soft(h)); return !hs.length || hs.some(onList); });
      if(keep.length===parts.length) return m;
      return keep.length ? m.replace(inner, keep.join("; ")) : "";
    });
  }
  // clauses ("...; save romaine to layer in", "... and top with sliced tomato") go when every food they name is missing
  function pruneClauses(s0){
    const par = []; const s = s0.replace(/\([^()]*\)/g, m => { par.push(m); return "\u0001"+(par.length-1)+"\u0001"; });
    const unmask = x => x.replace(/\u0001(\d+)\u0001/g, (m,i)=>par[+i]);
    const parts = s.split(new RegExp("(;\\s+|,?\\s+(?:and|then|and then)\\s+(?=(?:"+STEP_VERB+")\\b)|,\\s+(?=(?:"+STEP_VERB+")\\b))", "i"));
    if(parts.length < 3) return s0;
    const cl = []; for(let i=0;i<parts.length;i+=2) cl.push({ txt:parts[i], sep:parts[i-1]||"" });
    const bad = cl.map(c=>{ const hs = stepNounHits(c.txt).filter(h=>!h.free && !soft(h)); return hs.length>0 && !stepNounHits(c.txt).some(onList); });
    if(!bad.some(Boolean) || bad.every(Boolean)) return s0;
    let outS = ""; let started = false;
    cl.forEach((c,i)=>{ if(bad[i]) return; outS += started ? c.sep + c.txt : cap(c.txt.replace(/^(?:and|then)\s+/i,"")); started = true; });
    const endP = (s.match(/[.!?]\s*$/)||[""])[0].trim();
    return unmask(/[.!?]\s*$/.test(outS) ? outS : outS.replace(/\s*$/, "") + endP);
  }
  const steps = String(text).split(/\n+/);
  const out = [];
  steps.forEach(step=>{
    const parts = step.split(/\s(?=(?<![\d\/])\d{1,2}[.)]\s)/);          // inline "1) ... 2) ..." is split so a dropped step renumbers
    parts.forEach(part=>{
      const num = (part.match(/^\s*(\d{1,2}[.)])\s+/)||[])[1] || "";
      const body = num ? part.replace(/^\s*\d{1,2}[.)]\s+/, "") : part;
      const kept = [];
      body.split(/(?<=[.!?])\s+(?=[A-Z(])/).forEach(s0=>{
        let s = s0;
        // an alternative version of the dish is for the client it names
        const alt = s.match(/^\(?\s*for (?:a|the) (?:fully )?(vegan|vegetarian|plant-based|dairy-free)\b/i);
        if(alt){ const k = alt[1].toLowerCase();
          const mine = k==="vegan"||k==="plant-based" ? diet==="vegan" : k==="vegetarian" ? /^(vegetarian|vegan|ovo)$/.test(diet) : !dairyOn;
          if(!mine) return; }
        s = s.replace(/\s*\((if (it'?s|it is|that'?s|that is) (your|what your plan lists)[^)]*|if your plan lists (it|them)[^)]*|if (it'?s|it is) your \w+)\)/gi, "")
             .replace(/;?\s*otherwise [^.;]*\byour (protein|carb|fat|produce|vegetable)\b[^.;]*/gi, "")
             .replace(/\s+if your plan lists (it|them)( as (the |your )?[a-z]+)?( and you eat dairy)?/gi, "")
             .replace(/\b(the|a) ([a-z]+) your plan lists\b/gi, "$1 $2 on your list");
        s = s.replace(new RegExp("\\s+if you chose [a-z ]+? as your (?:"+STEP_ROLE+")\\b", "gi"), "");
        s = settleConds(s); if(s===null) return;
        s = roles(s); if(s===null) return;
        s = fatSwap(s);
        // "Prep the leeks: leeks, onion, or tomato." The options after the colon are the recipe choosing for everyone.
        { const hs = stepNounHits(s), ci = s.indexOf(":");
          if(ci>0){ const tail = hs.filter(h=>h.start>ci);
            if(tail.length>=2 && !/[a-z]/i.test(s.slice(tail[tail.length-1].end).replace(/[.!?)]/g,"").replace(/\s/g,""))
              && new RegExp("^[\\s:]*(?:"+STEP_MOD+"\\s+)*$","i").test(s.slice(ci, tail[0].start))
              && tail.every((h,i)=> i===0 || STEP_SEP_RE.test(s.slice(tail[i-1].end, h.start))))
              s = s.slice(0, ci) + s.slice(tail[tail.length-1].end); } }
        s = pruneParens(s);
        s = pruneRuns(s);
        s = pruneChoices(s);
        s = pruneClauses(s);
        const hs = stepNounHits(s), hard = hs.filter(h=>!h.free && !soft(h));
        if(hard.length && !hs.some(onList)) return;                      // every food it names is missing
        s = clean(s); if(s && !/^[.,;:!?)]+$/.test(s)) kept.push(s);
      });
      if(kept.length) out.push({ num, body: kept.join(" ") });
    });
  });
  // keep the recipe whole if every step of it would go: a wrong detail beats no instructions at all
  if(!out.length) return fitAmounts(text, meal, servings);
  let n = 0;
  const lines = out.map(o=>o.num ? `${++n}${o.num.slice(-1)} ${o.body}` : o.body);
  return fitAmounts(lines.join(/\n/.test(String(text)) ? "\n" : " "), meal, servings);
}
function planSteps(text, meal, servings){
  // A client builder's hand-written recipe (cook.verbatim) prints as written: no food swaps, no clauses dropped, no steps
  // inserted. The engine is for the shared library, where the solver swaps foods; on a client's hand-built plan
  // it turned "top with the kiwi" into "top with the medjool dates" and deleted "add the spicy mayo" (2026-10-09). The
  // storage days still follow the planner's food-safety table. tools/checks/step_diff.js reports any change it makes.
  if(meal && meal.cook && meal.cook.verbatim) return text ? fitStorageDays(planText(text, meal), meal) : text;
  let out = fitSteps(planText(text, meal), meal, servings);
  if(!out || !meal || !(meal.items||[]).length) return out;
  // the recipe's own batch count and storage numbers follow THIS plan, and every cooked food on the list gets cooked
  out = fitBatchCounts(out, meal, servings);
  out = fitStorageDays(out, meal);
  return ensureCookSteps(out, meal);
}
// A recipe's amount for a food on the list has to BE the list's amount. The steps said "Heat 1 tbsp of oil" on meals whose
// list held 5g, because the macro fit sizes the oil: 105 of 955 test meals (11%) carried an amount like that, 98 of them
// oil (2026-09-30). Spoon amounts the steps give for a listed food are scaled so they add up to what the list holds, times
// the batch for a batch recipe. When the steps also use "the rest" of something, the named amounts come to half of it.
// Only cooking fat is scaled UP: two tablespoons of yogurt in a sauce on a plate with 170g of it is part of the yogurt.
const AMT_QTY = "(\\d+\\s+\\d\\/\\d|\\d+\\/\\d+|\\d+(?:\\.\\d+)?\\s*[½¼¾⅓⅔]?|[½¼¾⅓⅔]|half an?|an?|one|two|three)";
// the period after an abbreviation ("1 tbsp. oil") is part of the amount; a sentence's own full stop is not ("line or grease
// all 12 cups." printed "all 9 cups" with no full stop, 2026-10-06)
const AMT_UNIT = "(tablespoons?|tbsps?|teaspoons?|tsps?|cups?|oz|ounces?)\\b(?:\\.(?=\\s+[a-z]))?(?!\\s+each\\b)";
const AMT_NOT_FOOD = "(?!\\s+(?:vinegar|flour|wine|milk|syrup|paste|powder|sauce|juice|water|extract|seeds?|oil|butter|cakes?|noodles?|zest|starch)\\b)";
// the sentence of `str` that position `i` sits in (a step number like "2." or a decimal like "1.5" does not end one)
function sentenceAround(str, i){
  const head = str.slice(0, i), end = /[.!?;](?=\s)|\n/g; let st = 0, m;
  while((m = end.exec(head))) st = m.index + 1;
  const tail = str.slice(i).match(/^[^\n]*?(?:[.!?;](?=\s|$)|$)/m);
  return head.slice(st) + (tail ? tail[0] : "");
}
function amtValue(q){
  q = String(q).trim().toLowerCase();
  const U = {"½":0.5, "¼":0.25, "¾":0.75, "⅓":1/3, "⅔":2/3};
  if(/^half/.test(q)) return 0.5;
  if(/^(an?|one)$/.test(q)) return 1;
  if(q==="two") return 2; if(q==="three") return 3;
  let m = q.match(/^(\d+)\s+(\d)\/(\d)$/); if(m) return +m[1] + m[2]/m[3];
  m = q.match(/^(\d+)\/(\d+)$/); if(m) return m[1]/m[2];
  m = q.match(/^(\d+(?:\.\d+)?)?\s*([½¼¾⅓⅔])?$/); if(m && (m[1] || m[2])) return (+m[1]||0) + (m[2] ? U[m[2]] : 0);
  return NaN;
}
function tbspGrams(f){
  if(/^butter|^ghee/i.test(f.name)) return 14.2;
  if(f.cat==="Fats & Oils") return 13.5;
  const p = (f.portions||[]).find(x=>/\btbsp\b|tablespoon/i.test(x.label)); if(p) return p.grams/(parseLeadQty(p.label)||1);
  const q = (f.portions||[]).find(x=>/\btsp\b|teaspoon/i.test(x.label)); if(q) return 3*q.grams/(parseLeadQty(q.label)||1);
  return 0;
}
function fitAmounts(text, meal, servings){
  if(!text || !meal) return text;
  const n = Math.max(1, servings||1), listed = new Map();
  (meal.items||[]).forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(f && !f.recipe) listed.set(f, (listed.get(f)||0) + it.grams); });
  const fats = [...listed.keys()].filter(isCookFat);
  const rest = /\b(the rest|remaining|remainder|leftover)\b/i.test(text);
  let s = String(text);
  for(const [f, g] of listed){
    const tb = tbspGrams(f);
    const cupP = (f.portions||[]).find(x=>/^1 cup\b/i.test(x.label)), cupG = cupP ? cupP.grams : 0;
    // grams in one of each unit the steps might use for this food (0 = cannot tell, leave that amount alone)
    const per = u => /^(tab|tbsp)/i.test(u) ? tb : /^(tea|tsp)/i.test(u) ? tb/3 : /^cup/i.test(u) ? cupG : /^(oz|ounce)/i.test(u) ? 28.35 : 0;
    // what the steps call it: its own name, and plain "oil" or "butter" when it is the one cooking fat on the list
    const names = [stepName(f).toLowerCase()];
    if(isCookFat(f) && fats.length===1) names.push(/^butter|^ghee/i.test(f.name) ? "butter" : "oil");
    const nameRe = names.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
    const re = new RegExp("(?<![\\w/.])"+AMT_QTY+"\\s+"+AMT_UNIT+"(\\s+(?:of\\s+)?(?:the\\s+|your\\s+)?(?:(?!(?:and|or|with|plus|to|in|on|for|then|over|into)\\b)[a-z-]+\\s+){0,2}?(?:"+nameRe+")s?\\b"+AMT_NOT_FOOD+")", "gi");
    // a cooked weight on the list says nothing about "1 cup dry quinoa". Judge that by the amount's own sentence: the
    // whole text once kept "4 oz cooked chicken" on a plate with 75 g because another step warms the pita in a dry pan
    const rawAmt = (str, i) => /cooked/i.test(f.name) && /\b(dry|uncooked|raw)\b/i.test(sentenceAround(str, i));
    const hits = [...s.matchAll(re)].filter(m=>!rawAmt(s, m.index)).map(m=>({ q:amtValue(m[1]), g1:per(m[2]), spoon:/^(tab|tbsp|tea|tsp)/i.test(m[2]) }))
      .filter(h=>isFinite(h.q) && h.q>0 && h.g1>0);
    if(!hits.length) continue;
    const sum = hits.reduce((a,h)=>a + h.q*h.g1, 0);
    const want = g*n*(rest ? 0.5 : 1);
    const over = sum > want*1.33, under = sum < want*0.75;
    // Coming DOWN is always right: "6 oz of chicken" on a plate with 75g of it cannot be followed. Going UP only for the
    // cooking fat, or for the one cup or ounce amount of the plate's grain, beans or meat, which is never a partial use.
    const main = /^(Grains & Starches|Legumes|Protein|Seafood)$/.test(f.cat) && hits.length===1 && !hits[0].spoon;
    if(!over && !(under && !rest && ((isCookFat(f) && hits.every(h=>h.spoon)) || main))) continue;
    const k = want/sum;
    s = s.replace(re, (all, q, unit, tail, off, str) => {
      const v = amtValue(q), g1 = per(unit); if(!isFinite(v) || v<=0 || !g1 || rawAmt(str, off)) return all;
      const grams = v*g1*k, word = /^(tablespoon|teaspoon|ounce)/i.test(unit);
      if(/^(oz|ounce)/i.test(unit)){ const qty = fmtQty(grams/28.35); return qty+" "+(word ? "ounce"+(/^(1|½|¼|¾)$/.test(qty) ? "" : "s") : "oz")+tail; }
      if(/^cup/i.test(unit)){ const qty = fmtQty(grams/cupG, true); return qty+" cup"+(/^(1|½|¼|¾|⅓|⅔)$/.test(qty) ? "" : "s")+tail; }
      const big = grams >= tb*0.95, qty = fmtQty(big ? grams/tb : grams/(tb/3));
      const u = big ? (word ? "tablespoon" : "tbsp") : (word ? "teaspoon" : "tsp");
      return qty+" "+u+(word && !/^(1|½|¼|¾|⅓|⅔)$/.test(qty) ? "s" : "")+tail;
    });
  }
  return scaleUnlistedAmounts(s, meal, n, [...listed.keys()]);
}
// The sauce and spice amounts a batch recipe names are written for its own serving count (`makes`); the foods on the
// list are already exact for the batch being cooked. Scale the rest by the same ratio, so "1 tsp cumin" written for 5
// reads "½ tsp" when 3 are cooked, instead of a note telling the client to do the fraction (2026-10-05). An amount that
// belongs to a listed food was handled above and is left alone, and so is anything measured per container ("to each
// jar add 2 tsp honey", "1 tbsp each").
function scaleUnlistedAmounts(s, meal, n, listed){
  const makes = meal && meal.cook && +meal.cook.makes;
  if(!makes || !n || n===makes) return s;
  const k = n/makes;
  const names = listed.map(f=>stepName(f).toLowerCase()).concat(listed.some(isCookFat) ? ["oil","butter"] : []);
  const nameRe = names.length ? new RegExp("^\\s*(?:of\\s+)?(?:the\\s+|your\\s+)?(?:[a-z-]+\\s+){0,2}?(?:"+names.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")s?\\b", "i") : null;
  const re = new RegExp("(?<![\\w/.])"+AMT_QTY+"\\s+"+AMT_UNIT, "gi");
  return String(s).split("\n").map(line => line.split(/(?<=[.!?;])\s+/).map(sent => {
    if(/\b(each|per|every|apiece)\b/i.test(sent)) return sent;
    return sent.replace(re, (all, q, unit, off, str) => {
      const tail = str.slice(off + all.length, off + all.length + 60);
      if(nameRe && nameRe.test(tail)) return all;
      // "microwave a cup 30 seconds" is a container, not a measure: only numbers scale (it printed "microwave ⅔ cup")
      if(/^(an?|one|two|three|half an?)$/i.test(String(q).trim())) return all;
      const v = amtValue(q); if(!isFinite(v) || v<=0) return all;
      const word = /^(tablespoon|teaspoon|ounce)/i.test(unit);
      let x = v*k;
      if(/^cup/i.test(unit)){ const qty = fmtQty(x, true); return qty+" cup"+(/^(1|½|¼|¾|⅓|⅔)$/.test(qty) ? "" : "s"); }
      if(/^(oz|ounce)/i.test(unit)){ const qty = fmtQty(x); return qty+" "+(word ? "ounce"+(/^(1|½|¼|¾)$/.test(qty) ? "" : "s") : "oz"); }
      // spoons: keep the family, but 3 tsp reads as 1 tbsp and ½ tbsp as 1½ tsp
      let tsp = /^(tea|tsp)/i.test(unit) ? x : x*3;
      const big = tsp >= 2.95, qty = fmtQty(big ? tsp/3 : tsp);
      const u = big ? (word ? "tablespoon" : "tbsp") : (word ? "teaspoon" : "tsp");
      return qty+" "+u+(word && !/^(1|½|¼|¾|⅓|⅔)$/.test(qty) ? "s" : "");
    });
  }).join(" ")).join("\n");
}
// "1. Equipment: ... 2. Preheat ... 3. Slice ..." crammed into one paragraph reads like a data dump.
// Split it back into the numbered list it already is.
// The steps of a recipe as separate strings, numbering kept. The data is newline-separated, so split on that first.
// Falling back to "split before N." needs the (?<![\d/]) guard or it splits INSIDE "10." (matching the 0) and inside
// fractions like "1/2.". "1) 2) 3)" numbering counts too: 171 of the 531 cook-fresh recipes use it and printed as one
// paragraph (2026-10-05); a ")" step number only counts at the start or after a sentence end, so "(day 2) " is left alone.
function splitSteps(text){
  const t = String(text);
  let parts = t.split(/\n+/).map(x=>x.trim()).filter(Boolean);
  // each fallback only replaces the split before it when it finds MORE steps: a two-step "1. ... 2. ..." stays two steps
  // "hold it for step 4." refers to a step; it does not start one (Lentil & Rice Power Bowl printed an empty step)
  if(parts.length < 3){ const dot = t.split(/\s*(?=(?<![\d\/])(?<![Ss]tep\s)\d{1,2}\.\s)/).map(x=>x.trim()).filter(Boolean); if(dot.length > parts.length) parts = dot; }
  if(parts.length < 3){ const par = t.split(/\s*(?=(?:^|(?<=[.!?:]\s))\d{1,2}\)\s)/).map(x=>x.trim()).filter(Boolean); if(par.length > parts.length) parts = par; }
  return parts;
}
const stepsNumbered = parts => parts.length >= 3 && parts.filter(x=>/^\d{1,2}[.)]\s/.test(x)).length >= parts.length - 1;
const stripStepNo = x => x.replace(/^\d{1,2}[.)]\s*/,"");
// Unnumbered recipes (76 of the 531 cook-fresh methods) print one sentence per step when there are 3 or more; a sentence
// under 30 characters joins the one before it ("Serve." is not a step), and "e.g." or "approx." never ends one.
function sentenceSteps(text){
  const out = [];
  String(text).split(/(?<=[.!?])(?<!\b(?:e\.g|i\.e|approx|vs|etc)\.)\s+(?=[A-Z0-9])/).map(x=>x.trim()).filter(Boolean)
    .forEach(x => { if(out.length && x.length < 30) out[out.length-1] += " " + x; else out.push(x); });
  return out;
}
function stepList(text){
  if(!text) return "";
  let parts = splitSteps(text);
  const numbered = parts.length >= 2 && parts.every(x=>/^\d{1,2}[.)]\s/.test(x));
  // sentences become steps only in text that carries no step numbers at all ("1. Spoon... 2. Have..." printed an empty
  // first step when its numbers were read as sentence ends, a client's snack, 2026-10-06)
  if(parts.length < 3 && !numbered && !/(^|\s)\d{1,2}[.)]\s/.test(String(text))){ const ss = sentenceSteps(text); if(ss.length >= 3) parts = ss; }
  if(parts.length < 3 && !numbered) return esc(text);
  return `<ol class="steps">${parts.map(x=>`<li>${esc(stripStepNo(x))}</li>`).join("")}</ol>`;
}
// BATCH COUNTS. A recipe written for 5 says "5 containers" and "makes 5 jars" while the card says "you are cooking 3"
// (147 of 164 batch recipes name their own count, 2026-10-05). The count the client is cooking replaces it.
// a count that equals the recipe's own serving count is one per serving, whatever the noun: "cut it into 5 equal squares"
// stayed 5 on a breakfast bake cooked for 3 (a client, 2026-10-06)
const COUNT_NOUN = "(containers?|jars?|servings?|bowls?|portions?|boxes|packets?|bags?|tubs?|wraps?|burritos?|muffins?|bites|balls|bars|meals?|lunches|dinners|breakfasts|squares|wedges|slices|pieces|patties|fillets|(?:small|tiny|sauce|dip|lidded) cups)";
// the words that can sit between a count and its noun. One fixed word was allowed, so "5 pint jars with lids as your 4
// containers", "5 small zip bags", "5 foil squares", "4 shallow containers" and "between 5 of the dip cups" kept the
// recipe's own count (a client's jars and veggie cups cooked for 4, 2026-10-16; 41 lines across the library)
const COUNT_MOD = "(?:of\\s+(?:the|your)\\s+)?(?:(?:equal|even|small|large|tiny|single-serve|single-serving|lidded|glass|meal|meal-prep|pint|half-pint|quart|wide-mouth|mason|zip|zip-top|freezer|shallow|foil|8 to 12 oz|16 oz)\\s+){0,3}";
const NUM_WORD = { three:3, four:4, five:5, six:6, seven:7, eight:8 };
function fitBatchCounts(s, meal, servings){
  const n = Math.max(1, servings||1), makes = meal && meal.cook && +meal.cook.makes;
  if(!makes || n===makes) return s;
  const word = Object.keys(NUM_WORD).find(w=>NUM_WORD[w]===makes);
  const numRe = word ? `(?:${makes}|${word})` : String(makes);
  // "a quarter of the salad into each jar" is a count too: in a sentence about the containers, the share for `makes` becomes
  // the share for n (Curried Tuna jars cooked for 3, 2026-10-06)
  const FRAC = { 3:["a third","one third","1/3"], 4:["a quarter","one quarter","1/4"], 5:["a fifth","one fifth","1/5"], 6:["a sixth","one sixth","1/6"], 7:["a seventh"], 8:["an eighth"] };
  const share = FRAC[n] ? FRAC[n][0] : null;
  if(FRAC[makes] && share){
    const fracRe = new RegExp("\\b("+FRAC[makes].map(x=>x.replace("/","\\/")).join("|")+")(\\s+of\\b)", "gi");
    s = String(s).split("\n").map(line => line.split(/(?<=[.!?])\s+/).map(sent =>
      /\b(each|every|per)\b|\bcontainers?\b|\bjars?\b|\bboxes\b|\bbowls?\b/i.test(sent)
        ? sent.replace(fracRe, (m, f, of) => (/^[A-Z]/.test(f) ? share.charAt(0).toUpperCase()+share.slice(1) : share) + of) : sent).join(" ")).join("\n");
  }
  return String(s)
    .replace(new RegExp("(?<![\\d/.])"+numRe+"(\\s+"+COUNT_MOD+COUNT_NOUN+"\\b)", "gi"), (m, tail) => n + tail)
    // two per serving doubles with the batch: "10 small dip cups with lids (two per serving)" for 4 is 8
    .replace(new RegExp("(?<![\\d/.])"+(2*makes)+"(\\s+"+COUNT_MOD+COUNT_NOUN+"\\b[^.;\\n]{0,40}?\\((?:two|2) (?:per|for each|a) (?:serving|container|jar|box)\\))", "gi"), (m, tail) => (2*n) + tail)
    .replace(new RegExp("\\b(makes|yields|fills)\\s+"+numRe+"\\b(?!\\s*(?:to|-)\\s*\\d)", "gi"), (m, v) => v + " " + n)
    .replace(new RegExp("\\(\\s*"+numRe+"\\s+total\\s*\\)", "gi"), `(${n} total)`);
}
// STORAGE NUMBERS. The steps' "fridge 4 days" sat beside a Storage line computed from the plate's own foods that said
// 3 (163 of 164 batch recipes state their own number). The plan's number wins, in the steps too.
function fitStorageDays(s, meal){
  if(!meal || !(meal.items||[]).length) return s;
  const st = mealStorage(meal); if(!st || !st.fridgeDays) return s;
  const D = st.fridgeDays;
  // "1 day" and "1 month", never "1 months" (a soup's freezer line read "freezer 1 months", 2026-10-06)
  const unit = (n, w) => n===1 ? w.replace(/(day|month)s\b/i, "$1") : w.replace(/\b(day|month)\b/i, "$1s");
  let out = String(s)
    .replace(/(\b(?:fridge|refrigerat\w*)\b[^.;:\n]{0,40}?)(?<![\d/.])\d{1,2}(?:\s*(?:to|-)\s*\d{1,2})?(\s*days?\b)/gi, (m, a, b) => a + D + unit(D, b))
    .replace(/(?<![\d/.])\d{1,2}(?:\s*(?:to|-)\s*\d{1,2})?(\s*days?)(\s+(?:in\s+the\s+(?:fridge|refrigerator)|refrigerated|chilled))/gi, (m, b, c) => D + unit(D, b) + c)
    // and the day the freezing starts: "fridge 3 days ... freeze on the cook day any container not eaten by day 4" (a client
    // a client's taco bowls, 2026-10-16; 9 recipes). Said as days after cooking, as the card says it: a reader who counts the
    // cook day as day 1 read Saturday as day 4 (client-eye review)
    .replace(/\b(not (?:eaten|eat|reach))\s+by\s+day\s+\d{1,2}\b/gi, (m, a) => `${a} within ${D} day${D===1?"":"s"} of cooking`);
  if(st.freezeOk && st.freezeMonths)
    out = out.replace(/(\bfreez\w*\b[^.;:\n]{0,30}?)(?<![\d/.])\d{1,2}(?:\s*(?:to|-)\s*\d{1,2})?(\s*months?\b)/gi, (m, a, b) => a + st.freezeMonths + unit(st.freezeMonths, b));
  // The freeze-ahead clause is for a batch that outlives its fridge days. When the last container is eaten inside them
  // (Wednesday to Saturday is 3 days after cooking, and the dish keeps 3) it is dropped, so the card does not tell the client
  // to freeze what nothing needs (a client's taco bowls, client-eye review, 2026-10-16).
  const S = prepSchedule(), ck = S ? prepCookOfDay(S, prepDayOfMeal(meal)) : null;
  if(ck && Math.max(...ck.days) - ck.day <= D)
    out = out.replace(/;\s*freeze on the cook day any container not eaten within \d+ days? of cooking(?=[.;\n]|$)/gi, "")
      .replace(/(^|[.!?]\s+)Freeze on the cook day any container not eaten within \d+ days? of cooking\.[ \t]*/gim, "$1");
  return out;
}
// HOW TO COOK IT. 84 of 164 batch recipes list a cooked protein or grain their steps never cook ("Add the rice and
// chicken", 2026-10-05). When the steps never cook a listed cooked-form food, a step that does is put in front of the
// first step that uses it: heat, time and the doneness cue, and the FSIS safe temperature where there is one (poultry
// 165F, ground meats 160F, whole cuts and fish 145F). Written to the food's kitchen name; the amounts stay on the list.
const COOK_HOWTO = [
  [/\bground\b.*\b(chicken|turkey)\b|\b(chicken|turkey)\b.*\bground\b/i, "heat a large skillet over medium-high with a little oil, add the meat in one layer and leave it 2 minutes to brown before breaking it up. Cook 6 to 8 minutes more, stirring, until no pink is left and it reads 165F. Salt it as it cooks."],
  [/^chicken breast/i, "pat it dry and season it with salt and pepper. Sear it in a hot pan over medium-high with a little oil, 5 to 7 minutes a side (or roast it at 425F, 18 to 22 minutes), until it reads 165F in the thickest part. Rest it 5 minutes before slicing so the juices stay in the meat. The list weighs it cooked."],
  // the list's leg quarters are "roasted (meat only)": the client weighs the meat off the bone, skin left behind
  [/^chicken leg quarters/i, "season them with salt and pepper and roast them at 425F, 35 to 45 minutes, until they read 165F near the bone and the skin is browned. Rest them 5 minutes, then pull the meat off the bone. The list weighs the cooked meat only, without the skin or bone."],
  [/^chicken (thigh|drumstick|leg)/i, "season it with salt and pepper and roast it at 425F, 25 to 35 minutes, until it reads 165F at the bone and the skin is browned. Rest it 5 minutes. The list weighs it cooked."],
  [/^turkey (breast|thigh)/i, "season it and roast it at 375F, 45 to 60 minutes for a 2 lb piece, until it reads 165F in the thickest part. Rest it 10 minutes before slicing. The list weighs it cooked."],
  [/^duck/i, "score the skin, season it, and start it skin-side down in a cold pan over medium, 8 to 10 minutes, until the fat renders and the skin is crisp; turn it and cook until it reads 165F. Rest it 5 minutes and slice it."],
  [/\bground\b.*\b(beef|bison|lamb|pork|venison)\b|\b(beef|bison|lamb|pork|venison)\b.*\bground\b/i, "heat a large skillet over medium-high, add the meat in one layer and leave it 2 to 3 minutes to brown before breaking it up. Cook 5 to 7 minutes more, stirring, until no pink is left and it reads 160F. Salt it as it cooks and drain off any fat."],
  [/^(beef sirloin|ribeye|lamb loin chop|pork chop)/i, "pat it dry and season it with salt and pepper. Sear it in a very hot pan, 3 to 5 minutes a side, until it reads 145F in the thickest part, then rest it 3 to 5 minutes before slicing. The list weighs it cooked."],
  [/^beef tenderloin/i, "season it and sear it in a very hot pan on all sides, 6 to 8 minutes, then roast it at 425F, 15 to 20 minutes, until it reads 145F. Rest it 10 minutes before slicing. The list weighs it cooked."],
  [/^beef, top round/i, "season it and roast it at 325F, about 20 to 25 minutes per pound, until it reads 145F; rest it 10 minutes and slice it thin against the grain, which keeps a lean cut tender. The list weighs it cooked."],
  [/^pork tenderloin/i, "season it, sear it in a hot pan on all sides, 5 to 6 minutes, then roast it at 425F, 12 to 18 minutes, until it reads 145F. Rest it 5 minutes and slice it. The list weighs it cooked."],
  [/^bacon/i, "lay it in a cold skillet and cook it over medium, 8 to 10 minutes, turning once, until crisp. Drain it on paper towels."],
  [/^shrimp/i, "pat it dry and season it. Cook it in a hot pan over medium-high, 1 to 2 minutes a side, until pink, opaque and curled into a C (an O is overcooked); it reads 145F."],
  [/^scallops/i, "pat them very dry, season them, and sear them in a very hot pan, 2 minutes a side, until browned outside and just opaque inside (145F)."],
  [/^(mussels|oysters)/i, "scrub them, discard any that are open and stay open when tapped, and steam them covered in a little simmering liquid, 5 to 7 minutes, until the shells open. Throw away any that stay shut."],
  [/^(crab|lobster)/i, "it is usually sold already cooked: steam it 4 to 5 minutes to heat it through, or serve it cold.", "The"],
  [/^octopus/i, "simmer it gently in salted water, 45 to 60 minutes, until a knife slides in easily, then slice it and sear it 2 minutes a side in a hot pan."],
  [/^(cod|haddock|pollock|tilapia|halibut|snapper|flounder|trout|salmon|mackerel|tuna)/i, "pat it dry and season it. Roast it at 400F, 10 to 14 minutes (or pan-sear it 3 to 4 minutes a side), until it reads 145F and flakes easily with a fork. The list weighs it cooked."],
  [/^edamame/i, "boil it from frozen, 4 to 5 minutes (5 to 6 in the pod), drain it and salt it."],
  [/^white rice/i, "rinse it until the water runs clear, then put it in a pot with 1 1/2 cups of water per cup of rice and a pinch of salt. Bring it to a boil, cover, and simmer on the lowest heat 18 minutes. Rest it 5 minutes off the heat and fluff it. Weigh it cooked."],
  [/^brown rice/i, "rinse it, then simmer it covered in 2 cups of water per cup of rice with a pinch of salt, 40 to 45 minutes, until the water is absorbed and the grains are tender. Rest it 10 minutes off the heat and fluff it. Weigh it cooked."],
  [/^wild rice/i, "simmer it in 3 cups of water per cup of rice, 45 to 55 minutes, until the grains split and are tender; drain any extra water. Weigh it cooked."],
  [/^quinoa/i, "rinse it well (that washes off its bitter coating), then simmer it covered in 2 cups of water per cup of quinoa, 15 minutes, until the water is absorbed. Rest it 5 minutes and fluff it. Weigh it cooked."],
  [/^barley/i, "simmer it in 3 cups of water per cup of barley with a pinch of salt, 25 to 30 minutes, until tender but still chewy; drain it. Weigh it cooked."],
  [/^bulgur/i, "pour 1 1/2 cups of boiling water over each cup of bulgur, cover, and let it stand 15 to 20 minutes until tender; fluff it with a fork. Weigh it cooked."],
  [/^couscous/i, "pour 1 1/4 cups of boiling water over each cup of couscous, cover, and let it stand 5 minutes; fluff it with a fork. Weigh it cooked."],
  [/^millet/i, "toast it in the dry pot 2 minutes, then simmer it covered in 2 cups of water per cup of millet, 18 to 20 minutes. Rest it 10 minutes and fluff it. Weigh it cooked."],
  [/^buckwheat/i, "simmer it covered in 2 cups of water per cup of groats, 12 to 15 minutes, until tender; drain any extra water. Weigh it cooked."],
  [/^grits/i, "bring 4 cups of salted water per cup of grits to a boil, whisk the grits in, and simmer 15 to 20 minutes, stirring often, until thick and creamy."],
  [/^oats/i, "simmer rolled oats in 2 cups of water per cup of oats, 5 minutes, stirring (steel-cut take 25 to 30), until creamy. Weigh them cooked."],
  [/^(chickpea|edamame) pasta/i, "cook it in plenty of salted boiling water, 6 to 8 minutes, until just tender; it goes from done to mushy fast, so taste it early. Drain it. Weigh it cooked."],
  [/pasta/i, "cook it in plenty of salted boiling water until just tender with a little bite, 8 to 11 minutes (check the package). Drain it. Weigh it cooked."],
  [/^potato/i, "scrub it, prick it a few times, and bake it at 400F, 45 to 60 minutes, until a knife slides in with no resistance (or microwave it 5 to 8 minutes, turning once). The list weighs the cooked flesh."],
  [/^sweet potato/i, "scrub it, prick it a few times, and bake it at 400F, 45 to 55 minutes, until soft all the way through (or microwave it 5 to 8 minutes, turning once). Weigh it cooked."],
  [/^lentils/i, "rinse them (no soaking needed) and simmer them in 3 cups of water per cup of lentils, 18 to 25 minutes for brown or green and 12 to 15 for red, until tender; drain them. Weigh them cooked."],
  [/^split peas/i, "rinse them and simmer them in 3 cups of water per cup of peas, 25 to 40 minutes, until soft. Weigh them cooked."],
  [/^green peas/i, "cook them from frozen, 3 to 4 minutes in boiling water or the microwave, and drain them."],
  [/^kidney beans/i, "canned ones need only draining and rinsing. From dry, soak them overnight, boil them hard for 10 minutes (raw kidney beans carry a toxin that a hard boil destroys), then simmer 60 to 90 minutes until tender.", "The"],
  [/^(black|navy|pinto|white|lima) beans|^black-eyed peas|^chickpeas|^soybeans/i, "canned ones need only draining and rinsing (that washes off most of the added salt). From dry, soak them overnight, then simmer 60 to 90 minutes until tender.", "The"],
];
// beans and chickpeas come canned on the grocery list: a step that drains, rinses, warms or stirs them in has handled them
const READY_LEGUME = /^(black|navy|pinto|white|lima|kidney) beans|^black-eyed peas|^chickpeas|^soybeans/i;
const COOK_CATS = /^(Protein|Seafood|Grains & Starches|Legumes)$/;
const COOK_FORM = /\b(cooked|baked|grilled|roasted|boiled|broiled|steamed)\b/i;
const COOK_VERB_RE = /\b(cook|cooks|bake|bakes|roast|roasts|sear|sears|grill|grills|simmer|simmers|boil|boils|poach|poaches|brown|browns|saute|sautes|sauté|sautés|air-?fry|air-?fries|steam|steams|braise|braises|stir-?fry|stir-?fries|fry|fries|pan-?fry|scramble|scrambles|crisp|crisps|char|chars|griddle|griddles|slow cook|pressure cook|steep|steeps|boiling water)\b(?!\s+(?:days?|date))/i;   // bulgur and couscous steep in boiling water
// words in a kitchen name that are not the food itself ("chicken breast" is found as "chicken", "white rice" as "rice")
const COOK_MOD = /^(ground|breast|thigh|thighs|drumstick|leg|quarters|lean|loin|chop|cooked|baked|flesh|white|brown|wild|whole|wheat|sweet|black|green|navy|pinto|kidney|lima|split|atlantic|farmed|sockeye|rainbow|king|alaska|yellowfin|top|round|steak|groats|only|meat)$/i;
function cookHowTo(f){
  const n = f.name.toLowerCase().replace(/,/g, "");
  const hit = COOK_HOWTO.find(([re]) => re.test(n));
  return hit ? { text: hit[1], lead: hit[2] || "Cook the" } : null;
}
function ensureCookSteps(text, meal){
  const foods = (meal.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(f=>f && !f.recipe && COOK_CATS.test(f.cat) && COOK_FORM.test(f.name) && !isProteinPowder(f));
  if(!foods.length) return text;
  const parts = splitSteps(text);
  const numbered = stepsNumbered(parts);
  const units = parts.length >= 3 ? parts.slice() : [String(text)];
  const low = units.map(u=>u.toLowerCase());
  const esc_ = w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const inserts = [];   // [index, step text]
  foods.forEach(f=>{
    const how = cookHowTo(f); if(!how) return;
    const kn = stepName(f).toLowerCase(), ready = READY_LEGUME.test(f.name);
    const words = [kn].concat(kn.split(/\s+/).filter(w=>w.length>=4 && !COOK_MOD.test(w)));
    const re = new RegExp("(?<!\\b(?:cooked|pre-cooked|precooked|leftover|canned|drained|rotisserie|deli|store-bought|ready-cooked)\\s)\\b(?:"+words.map(esc_).join("|")+")(?:s|es)?\\b", "i");
    const mentions = low.map((u,i)=>re.test(u) ? i : -1).filter(i=>i>=0);
    // a microwave that runs minutes is cooking too ("microwave it for 5 to 8 minutes, until soft"); a 1-minute warm-up is not.
    // a client's potato lunch and edamame dinner each got a second, oven or stovetop, cook step above their own (2026-10-06)
    const cookVerb = u => COOK_VERB_RE.test(u) || /\bmicrowave\b[^.]*?\b(?:[3-9]|1\d|20)\s*(?:to\s*\d+\s*)?minutes?\b|\bmicrowave\b[^.]*\buntil (?:soft|tender|cooked)/i.test(u);
    const cooks = mentions.some(i => (cookVerb(low[i]) && !/^\s*(?:\d{1,2}[.)]\s*)?reheat/i.test(low[i])) || (i+1 < low.length && cookVerb(low[i+1]) && !/\breheat/i.test(low[i+1])));
    if(cooks || (ready && mentions.length)) return;
    // bought cooked (rotisserie, deli, canned) is not a gap
    const anyRe = new RegExp("\\b(?:"+words.map(esc_).join("|")+")(?:s|es)?\\b", "i");
    if(low.some(u => anyRe.test(u) && /rotisserie|deli|store-bought|ready-cooked|canned|from a can/i.test(u))) return;
    const first = low.findIndex(u => anyRe.test(u));
    const at = first >= 0 ? first : (units.length > 1 && /^\s*(?:\d{1,2}[.)]\s*)?equipment\b/i.test(low[0]) ? 1 : 0);
    inserts.push([at, `${how.lead} ${stepName(f).toLowerCase()}: ${how.text}`]);
  });
  if(!inserts.length) return text;
  if(units.length === 1 && parts.length < 3){
    const lead = inserts.map(x=>x[1]).join(" ");
    return lead + " " + String(text);
  }
  const out = units.slice();
  inserts.sort((a,b)=>b[0]-a[0]).forEach(([at, step]) => out.splice(at, 0, step));
  const sep = /\n/.test(String(text)) ? "\n" : " ";
  return numbered ? out.map((u,i)=>`${i+1}. ${stripStepNo(u)}`).join(sep) : out.join(sep);
}
function cookBlock(c, meal){
  c = c || {};
  const shake = meal && meal.shakeNote && (meal.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && isProteinPowder(f); });
  const fibreDrink = meal && meal.fiberNote && (meal.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && /psyllium/i.test(f.name); }) ? meal.fiberNote : "";
  const prep = mealPrepNote(meal);
  const inPrep = state.profile && state.profile.prep;
  const batch = inPrep && c.prepMethod;       // in meal-prep mode, lead with the idiot-proof BATCH recipe
  const pack = inPrep ? prepPackHTML(meal) : "";   // exact per-container portions from THIS meal's foods
  if(!c.method && !c.oil && !c.season && !shake && !prep && !fibreDrink) return "";
  const seas = cleanSeason(planText(seasonText(c, meal), meal));
  const temp = cookTemp(meal);
  const finish = finishingTip(meal, c);
  return `<div class="meal-cook">
    ${batch
      ? `<div class="mc-line"><span><b>Batch recipe${batchLabel(meal, c.makes)}:</b> ${stepList(planSteps(c.prepMethod, meal, prepBatchCount(meal.dish, meal)))}</span></div>`
      : (c.method?`<div class="mc-line"><span><b>Cook:</b> ${stepList(planSteps(c.method, meal))}</span></div>`:"")}
    ${c.oil&&!batch?`<div class="mc-line"><span><b>Oil:</b> ${esc(c.oil)}</span></div>`:""}
    ${pack?`<div class="mc-line"><span>${pack}</span></div>`:""}
    ${shake?`<div class="mc-line"><span>${esc(meal.shakeNote)}</span></div>`:""}
    ${fibreDrink?`<div class="mc-line"><span>${esc(fibreDrink)}</span></div>`:""}
    ${prep?`<div class="mc-line"><span><b>Storage:</b> ${prep}</span></div>`:""}
    ${temp?`<div class="mc-line"><span><b>Safe temp:</b> ${temp}</span></div>`:""}
    ${(()=>{ const mm=stepsMismatchLine(meal, c); return mm?`<div class="mc-line"><span>${esc(mm)}</span></div>`:""; })()}
    ${(()=>{ const le=listExtrasLine(meal, c); return le?`<div class="mc-line"><span>${esc(le)}</span></div>`:""; })()}
    ${seas?`<div class="mc-line mc-opt"><span><b>Seasoning:</b> ${esc(seas)}</span></div>`:""}
    ${finish?`<div class="mc-line mc-opt"><span><b>To finish:</b> ${esc(finish)}</span></div>`:""}
    <div class="mc-line mc-opt mc-disc"><span>${COOK_DISCLAIMER}</span></div>
  </div>`;
}
function renderMeals(){
  const wrap=$("meals");
  const prepG = state.profile.prep ? (prepGuideHTML() + sauceLibraryHTML()) : "";
  const strip = prepG + (flaggedScreens().length ? `<div class="scope-banner plan-scope">${scopeBannerHTML()}</div>` : "");
  wrap.innerHTML = strip + state.meals.map((m,mi)=>{
    const mm=mealMacros(m);
    const rows=m.items.map((it,ii)=>foodRow(mi,ii,it)).join("");
    let warn="";
    if (state.profile.kosher){
      const fs=m.items.map(it=>FOOD_BY_ID[it.id]).filter(Boolean);
      if (fs.some(isMeatFood) && fs.some(isDairyFood))
        warn=`<div class="meal-warn">⚠ Kosher: this meal mixes meat &amp; dairy, keep them in separate meals.</div>`;
    }
    // leucine flag on main meals (not snacks/treats) below the ~2.5g muscle-building threshold
    if (!/snack|treat|dessert/i.test(m.name)){
      const leu=mealLeucine(m);
      if (leu>0 && leu<2.5) warn+=`<div class="meal-leu">💪 ~${leu.toFixed(1)}g leucine (est.), under the ~2.5g muscle-building threshold; nudge the protein up.</div>`;
    }
    return `<div class="meal" data-mi="${mi}">
      <div class="meal-head">
        <input class="meal-name" value="${esc(m.name)}" aria-label="Meal name">
        ${m.dish?`<span class="meal-dish">${esc(m.dish)}</span>`:""}
        <span class="meal-macros">${Math.round(mm.kcal)} cal · P${Math.round(mm.protein_g)} C${Math.round(mm.carb_g)} F${Math.round(mm.fat_g)}</span>
        <button class="meal-roll" title="Re-roll this meal, new foods, day re-fits to targets">🎲</button>
        <button class="meal-del" title="Delete meal">🗑</button>
      </div>
      ${warn}
      ${m.open?`<div class="meal-cook"><div class="mc-line"><span><b>Open meal:</b> about ${+m.open.kcal||0} cal, at least ${+m.open.protein||0}g protein, eaten out. Not in the day's totals.</span></div></div>`:""}
      ${(m.picks||[]).length?`<div class="meal-cook"><div class="mc-line"><span><b>Pick-one card:</b> ${m.picks.length} other option${m.picks.length>1?"s":""} printed under this meal, each built to its calories and protein: ${m.picks.map(p=>esc(p.dish||"")).join(", ")}.${m.pickOut?" It ends with an eating-out line.":""} The day's totals count the meal above.</span></div></div>`:""}
      ${rows}
      ${cookBlock(m.cook, m)}
      <div class="add-food"><button class="addfood">+ Add food</button></div>
    </div>`;
  }).join("");

  // wire events
  wrap.querySelectorAll(".meal").forEach(mealEl=>{
    const mi=+mealEl.dataset.mi;
    mealEl.querySelector(".meal-name").addEventListener("input", e=>{ state.meals[mi].name=e.target.value; markDirty(); });
    mealEl.querySelector(".meal-del").addEventListener("click", ()=>{ snapshotMeals(); state.meals.splice(mi,1); render(); });
    mealEl.querySelector(".meal-roll").addEventListener("click", ()=>rerollMeal(mi));
    mealEl.querySelector(".addfood").addEventListener("click", ()=>{
      openPicker(f=>{ const g=(f.portions&&f.portions[0])?f.portions[0].grams:100;
        snapshotMeals(); state.meals[mi].items.push({id:f.id, grams:g}); render(); });
    });
    mealEl.querySelectorAll(".food-row").forEach(rowEl=>{
      const ii=+rowEl.dataset.ii;
      const gramsEl=rowEl.querySelector(".grams");
      const portEl=rowEl.querySelector(".portion");
      gramsEl.addEventListener("input", e=>{
        state.meals[mi].items[ii].grams = +e.target.value||0; state.meals[mi].items[ii].manual = true;
        liveUpdateRow(rowEl, mi, ii); portEl.value=""; markDirty();
      });
      gramsEl.addEventListener("blur", e=>{                       // floor a cleared/0 field so foods don't silently vanish
        if((+e.target.value||0) < 5){ state.meals[mi].items[ii].grams=5; e.target.value=5; liveUpdateRow(rowEl, mi, ii); }
      });
      portEl.addEventListener("change", e=>{
        if(!e.target.value) return;
        const g=+e.target.value; state.meals[mi].items[ii].grams=g;
        gramsEl.value=g; liveUpdateRow(rowEl, mi, ii); markDirty();
      });
      rowEl.querySelector(".del").addEventListener("click", ()=>{ snapshotMeals(); state.meals[mi].items.splice(ii,1); render(); });
      rowEl.querySelector(".info").addEventListener("click", ()=>openInfo(FOOD_BY_ID[state.meals[mi].items[ii].id], state.meals[mi].items[ii].grams));
      rowEl.querySelector(".swap").addEventListener("click", e=>{ e.stopPropagation(); showSwapMenu(e.currentTarget, mi, ii); });   // quick equal-role swaps, then re-fit
    });
  });
  // subtitle
  const t=totals();
  $("planSubtitle").textContent = state.meals.length ? `· ${Math.round(t.kcal)} cal / day` : "";
}
function liveUpdateRow(rowEl, mi, ii){
  const it=state.meals[mi].items[ii], f=FOOD_BY_ID[it.id], r=it.grams/100;
  rowEl.querySelector(".fr-macros").textContent =
    `${Math.round(f.kcal*r)} cal · P${Math.round(f.protein_g*r)} C${Math.round(f.carb_g*r)} F${Math.round(f.fat_g*r)}`;
  const mealEl=rowEl.closest(".meal"); const mm=mealMacros(state.meals[mi]);
  mealEl.querySelector(".meal-macros").textContent =
    `${Math.round(mm.kcal)} cal · P${Math.round(mm.protein_g)} C${Math.round(mm.carb_g)} F${Math.round(mm.fat_g)}`;
  renderScore();
}

/* ---- scorecard ---- */
function bar(label, intake, target, unit, kind){
  let pct = target>0 ? intake/target*100 : 0;
  let cls="", note="";
  if (kind==="limit"){
    cls = intake<=target ? "" : "over";
    note = `${fmt(intake)} / ${fmt(target)}${unit} limit`;
  } else if (kind==="min"){
    cls = pct>=100 ? "" : (pct>=70 ? "mid" : "low");
    note = `${fmt(intake)} / ${fmt(target)}${unit} min · ${Math.round(pct)}%`;
  } else if (kind==="cal"){
    cls = pct>=90 ? "" : (pct>=78 ? "mid" : "low");   // real food runs ~4% under the 4/4/9 estimate; ≥90% is on-target
    note = `${fmt(intake)} / ${fmt(target)}${unit} · ${Math.round(pct)}%`;
  } else {
    cls = pct>=95 ? "" : (pct>=50 ? "mid" : "low");
    note = `${fmt(intake)} / ${fmt(target)}${unit} · ${Math.round(pct)}%`;
  }
  const w = Math.min(100, Math.max(2, kind==="limit" ? pct : pct));
  return `<div class="bar"><div class="bl"><b>${label}</b><span class="v">${note}</span></div>
    <div class="track"><div class="fill ${cls}" style="width:${Math.min(100,w)}%"></div></div></div>`;
}
const fmt = n => n>=100 ? Math.round(n) : (n>=10 ? Math.round(n*10)/10 : Math.round(n*100)/100);

/* -------------------- gut-health mode (30 plants/wk, ferments, prebiotics) -------------------- */
const GUT = window.OB_GUT || {favor:[],limit:[],tips:[],citations:[]};
const FERMENT_RE = /kefir|sauerkraut|kimchi|miso|natto|yogurt|tempeh|skyr/i;
const PLANT_CATS = ["Vegetables","Fruits","Legumes","Grains & Starches","Nuts & Seeds"];
function gutFoodScore(f){
  const n=(f.name+" "+(f.usda||"")).toLowerCase();
  let s=0;
  if(GUT.favor.some(k=>n.includes(k))) s+=10;
  if(GUT.limit.some(k=>n.includes(k))) s-=10;
  if(FERMENT_RE.test(n)) s+=6;
  return s;
}
function weekPlantNames(){
  const set=new Set();
  state.week.forEach(d=>d.meals.forEach(m=>m.items.forEach(it=>{
    const f=FOOD_BY_ID[it.id]; if(!f) return;
    if(PLANT_CATS.includes(f.cat)) set.add(f.name);
    if(f.recipe) (f.ingredients||[]).forEach(ing=>{ const gf=foodByName(ing.name); if(gf && PLANT_CATS.includes(gf.cat)) set.add(gf.name); });
  })));
  return set;
}
function gutScore(){
  const plants = weekPlantNames().size;
  const plantPts = Math.min(60, plants/30*60);
  let ferments=0, favorHits=0, limitHits=0;
  state.week.forEach(d=>d.meals.forEach(m=>m.items.forEach(it=>{ const f=FOOD_BY_ID[it.id]; if(!f) return;
    const n=(f.name+" "+(f.usda||"")).toLowerCase();
    if(FERMENT_RE.test(n)) ferments++;
    if(GUT.favor.some(k=>n.includes(k))) favorHits++;
    if(GUT.limit.some(k=>n.includes(k))) limitHits++; })));
  const fermPts = Math.min(25, ferments*3);
  const favorPts = Math.min(15, favorHits*0.4);
  const sc = (plantPts + fermPts + favorPts) * Math.max(0.55, 1 - limitHits*0.03);
  return { score: Math.round(Math.min(100, sc)), plants, ferments };
}
function renderGutCard(){
  const el=$("gutCard"); if(!el) return;
  if(!state.profile.gut || !state.meals.length){ el.innerHTML=""; el.classList.remove("on"); return; }
  el.classList.add("on");
  const g=gutScore();
  const tier = g.plants>=30?"ok":g.plants>=20?"good":g.plants>=10?"mid":"low";
  el.innerHTML = `<div class="gut-head">🦠 Gut health <span class="gut-score">${g.score}/100</span></div>
    <div class="gut-plants ${tier}"><b>${g.plants}</b> / 30 plants this week <span class="gut-bar"><i style="width:${Math.min(100,g.plants/30*100)}%"></i></span></div>
    <div class="gut-sub">${g.ferments} fermented serving${g.ferments===1?"":"s"} · ${g.plants>=30?"diversity target hit 🎉":"rotate beans, grains, fruit &amp; greens to add variety"}</div>`;
}
function renderScore(){
  const t=totals(), P=state.profile;
  const hasPlan = state.meals.length>0;
  $("planSubtitle").textContent = hasPlan ? `· ${Math.round(t.kcal)} cal / day` : "";  // keep headline total live on every edit

  // macro bars (T = current day's targets, honors calorie banking)
  const T=curTargets(), calT=T.tCal;
  let mb = "";
  if(hasPlan && calT>0 && (+T.tPro*4) > calT){
    mb += `<div class="bank-note" style="color:var(--red);background:#fbe6e3;border-color:#f0c0bb">⚠ Protein alone is ${Math.round(+T.tPro*4)} cal, over the ${calT} cal target. Lower protein or raise calories; this day can't be hit.</div>`; }
  else if(hasPlan && +T.tPro>0 && t.protein_g < 0.88*(+T.tPro)){   // protein unreachable from the allowed foods (e.g. vegan + soy/gluten/nut allergies)
    mb += `<div class="bank-note" style="color:#8a6d1a;background:#fbf3dd;border-color:#f0e2b8">⚠ Only ~${Math.round(t.protein_g)}g of the ${Math.round(+T.tPro)}g protein target is reachable from the allowed foods, loosen a restriction or add a protein supplement.</div>`; }
  if(P.banking && hasPlan){ const dn=WEEK_DAYS[state.dayIdx]||"";
    const warn = P.glp1 ? ` <b style="color:var(--red)">⚠ pairs poorly with small-appetite mode, bigger weekend targets may be hard to eat.</b>` : "";
    mb += `<div class="bank-note">🏦 Calorie banking on, ${esc(dn)} target ${calT} cal (weekly average ${P.tCal}).${warn}</div>`; }
  mb += bar("Calories", t.kcal, calT, "", "cal");
  mb += bar("Protein",  t.protein_g, T.tPro, "g", "macro");
  mb += bar("Carbs",    t.carb_g, T.tCarb, "g", "macro");
  mb += bar("Fat",      t.fat_g, T.tFat, "g", "macro");
  mb += bar("Fiber ⭐", t.fiber_g, microTarget("fiber_g"), "g", "min");
  mb += bar("Sodium",   t.sodium_mg, microTarget("sodium_mg"), "mg", "limit");
  mb += bar("Sat fat",  t.satfat_g, Math.max(15, Math.round(0.10*calT/9)), "g", "limit");   // AHA ~<10% of calories
  mb += `<div class="bar"><div class="bl"><b>Sugar</b><span class="v">${Math.round(t.sugar_g)}g total · mostly fruit &amp; dairy</span></div><div class="track"><div class="fill" style="width:${Math.min(100,t.sugar_g/0.6)}%"></div></div></div>`;
  $("macroBars").innerHTML = mb;

  // omega
  const o3=t.omega3_g, o6=t.omega6_g, ed=t.epa_dha_mg;
  const o3t=microTarget("omega3_g"), edt=microTarget("epa_dha_mg");
  const ratio = o3>0 ? o6/o3 : 0;
  const ratioCls = ratio===0 ? "" : (ratio<=4 ? "ok" : (ratio<=10 ? "mid":"low"));
  const o3cls = o3>=o3t?"":"low", edcls = ed>=edt?"":"low";
  $("omegaPanel").innerHTML =
    `<div class="ocard"><div class="ov ${o3cls}">${fmt(o3)}g</div><div class="ol">Omega-3 total <span class="pct">/ ${fmt(o3t)}g min</span></div></div>
     <div class="ocard"><div class="ov">${fmt(o6)}g</div><div class="ol">Omega-6 total</div></div>
     <div class="ocard"><div class="ov ${edcls}">${Math.round(ed)}mg</div><div class="ol">EPA+DHA <span class="pct">/ ${Math.round(edt)}mg min</span></div></div>
     <div class="ocard"><div class="ov">${fmt(t.omega9_g)}g</div><div class="ol">Omega-9 (oleic) <span class="pct">non-essential</span></div></div>
     <div class="ocard full"><div class="ov">${ratio?fmt(ratio)+":1":"n/a"}</div><div class="ol">Omega 6:3 ratio <span class="pct">${ratio?(ratio<=4?"ideal":ratio<=10?"ok":"high"):""}</span></div></div>`;

  // protein quality + amino-acid breakdown (Dylan: don't build a day on low-quality protein)
  const aa = hasPlan ? aminoBreakdown(state.meals) : null;
  if(aa){
    const qbadge=$("aaQualityBadge");
    if(qbadge){ qbadge.textContent = aa.highTierPct+"% complete";
      qbadge.className = "badge" + (aa.highTierPct>=60 && aa.allMet ? "" : aa.highTierPct>=45 ? " warn" : " bad"); }
    const aaRow = r => {
      const pct = Math.min(150, Math.round(r.ratio*100));
      const cls = r.ratio>=1 ? "ok" : (r.ratio>=0.9 ? "mid" : "low");
      return `<div class="bar"><div class="bl"><b>${esc(r.label)}</b><span class="v">${r.perG} <span class="pct">/ ${r.target} mg per g protein</span></span></div>
        <div class="track"><div class="fill ${cls}" style="width:${Math.min(100,pct)}%"></div></div></div>`;
    };
    const lowNote = aa.lowTierG>0 ? ` ${aa.lowTierG}g from low-quality (seitan / lone beans / grains).` : "";
    const verdict = aa.allMet
      ? `<b style="color:var(--green)">Complete day.</b> Every essential amino acid meets the FAO/WHO adult pattern.`
      : `<b style="color:#8a6d1a">Limiting amino acid: ${esc(aa.limitingLabel)}.</b> Add a complete animal/egg/dairy/soy protein to lift it.`;
    $("aminoPanel").innerHTML =
      `<div class="bank-note" style="${aa.highTierPct>=60&&aa.allMet?'background:#e8f5e9;border-color:#c3e6c8;color:#2f6b34':'background:#fbf3dd;border-color:#f0e2b8;color:#8a6d1a'}">`+
      `${verdict}<br><b>${aa.highTierPct}%</b> of protein is high-quality / complete (animal, egg, dairy, fish, whey, soy).${lowNote} `+
      `Leucine ${aa.leucineTotal.toFixed(1)}g across the day (~2.5-3g per main meal triggers muscle growth).</div>`+
      `<div class="bars">${aa.rows.map(aaRow).join("")}</div>`;
  } else if($("aminoPanel")){ $("aminoPanel").innerHTML=""; const qb=$("aaQualityBadge"); if(qb){qb.textContent="n/a"; qb.className="badge";} }

  // micro bars (vitamins then minerals)
  const microRow = k => bar(METAMAP[k].label, t[k], microTarget(k), METAMAP[k].unit, "macro");
  $("microBars").innerHTML =
    `<div class="picker-cat" style="padding-left:0">Vitamins</div>` + VIT_KEYS.map(microRow).join("") +
    `<div class="picker-cat" style="padding-left:0">Minerals</div>` + MIN_KEYS.map(microRow).join("");

  // headline scores
  const macroAcc = macroAccuracy(t), micro = microScore(t);
  const overall = Math.round((0.55*macroAcc + 0.45*micro)*100);
  const macroPct = Math.round(macroAcc*100), microPct = Math.round(micro*100);
  if (hasPlan){
    $("overallScore").textContent = overall;
    $("overallRing").style.setProperty("--p", overall);
    badge($("macroAcc"), macroPct);
    badge($("microScore"), microPct);
  } else {
    $("overallScore").textContent="n/a"; $("overallRing").style.setProperty("--p",0);
    $("macroAcc").textContent="n/a"; $("microScore").textContent="n/a";
    $("macroAcc").className="badge"; $("microScore").className="badge";
  }
  const activeSupp = SUPPLEMENTS.filter(s=>state.profile.supplements && state.profile.supplements[s.key]).map(s=>suppLabel(s, state.profile));
  $("scoreFootnote").innerHTML =
    (activeSupp.length ? `<b>Supplements added to totals:</b> ${activeSupp.map(esc).join(", ")}.<br>` : "") +
    `Plan score = 55% macro accuracy + 45% micronutrient coverage. <b>Macro accuracy = how closely protein, carbs &amp; fat hit target.</b> Calories are exact (within 0.3%). Real food carries fewer calories than protein×4 + carbs×4 + fat×9 says (mostly because fibre is about 2 calories a gram, not 4), roughly 60 calories a day on a typical plan. With calories held exact, that difference has to land somewhere, so carbs usually read 3 to 5% over their number and protein and fat 1 to 2% over. That is arithmetic in the targets, not a mistake in the plan, and it is also what the client's tracking app will show. Micro coverage = average % of each vitamin/mineral target met (capped at 100%), plus <b>EPA+DHA</b>, the marine omega-3 that matters. Fiber ⭐ is a minimum (≥30g), exceeding it is good. Targets: ${state.profile.sex} RDA/AI, adult 19-50. Sodium, omega-6, omega-9 and <b>total omega-3 are context, not scored</b>, total omega-3 is mostly ALA (chia/flax/hemp), which converts only ~5-10% to EPA/DHA, so only EPA+DHA counts. Iodine isn’t tracked (USDA lacks it).`;
  renderSuppSuggest();
  renderGutCard();
}
function badge(el, pct){
  el.textContent = pct+"%";
  el.className = "badge" + (pct>=85 ? "" : pct>=65 ? " warn" : " bad");
}

/* -------------------- food picker -------------------- */
let pickerCb=null;
const PICKER_FILTERS=[
  {key:"all", label:"All",            fn:()=>true},
  {key:"hp",  label:"💪 High protein", fn:f=>f.protein_g>=15},
  {key:"lc",  label:"🔥 Low cal",      fn:f=>f.kcal<=120},
  {key:"hf",  label:"🌾 High fiber",   fn:f=>f.fiber_g>=5},
  {key:"o3",  label:"🐟 Omega-3",      fn:f=>(f.epa_dha_mg>=200)||(f.omega3_g>=1)},
  {key:"rec", label:"🍰 Recipes",      fn:f=>!!f.recipe},
];
let pickerFilter="all";
function renderPickerFilters(){
  $("pickerFilters").innerHTML = PICKER_FILTERS.map(x=>
    `<span class="chip ${pickerFilter===x.key?"on":""}" data-k="${x.key}">${x.label}</span>`).join("");
  $("pickerFilters").querySelectorAll(".chip").forEach(c=>c.addEventListener("click", ()=>{
    pickerFilter=c.dataset.k; renderPickerFilters(); renderPicker($("pickerSearch").value);
  }));
}
function openPicker(cb){
  pickerCb=cb; pickerFilter="all"; $("pickerBackdrop").classList.remove("hidden");
  $("pickerSearch").value=""; renderPickerFilters(); renderPicker(""); setTimeout(()=>$("pickerSearch").focus(),30);
}
function closePicker(){ $("pickerBackdrop").classList.add("hidden"); pickerCb=null; }
function renderPicker(q){
  const P=state.profile; q=q.toLowerCase().trim();
  const flt=(PICKER_FILTERS.find(x=>x.key===pickerFilter)||PICKER_FILTERS[0]).fn;
  const cats={};
  FOODS.forEach(f=>{
    if(q && !foodText(f).includes(q)) return;
    if(!flt(f)) return;
    (cats[f.cat]=cats[f.cat]||[]).push(f);
  });
  let html="";
  Object.keys(cats).sort().forEach(cat=>{
    html+=`<div class="picker-cat">${esc(cat)}</div>`;
    cats[cat].sort((a,b)=>a.name.localeCompare(b.name)).forEach(f=>{
      const ex=exclusion(f,P);
      const like=isLiked(f,P)?` ♥`:"";
      html+=`<div class="picker-item ${ex?"excluded":""}" data-id="${f.id}">
        <span>${esc(f.name)}${formBadge(f)}${like}${ex?`<span class="pi-flag">${esc(ex)}</span>`:""}</span>
        <span class="pi-macros">${Math.round(f.kcal)}cal · P${Math.round(f.protein_g)} C${Math.round(f.carb_g)} F${Math.round(f.fat_g)} /100g</span>
      </div>`;
    });
  });
  if(!html) html=`<div class="picker-cat">No matches.</div>`;
  $("pickerList").innerHTML=html;
  $("pickerList").querySelectorAll(".picker-item").forEach(el=>{
    el.addEventListener("click", ()=>{ const f=FOOD_BY_ID[el.dataset.id]; if(pickerCb) pickerCb(f); closePicker(); });
  });
}

/* -------------------- per-food verify popover -------------------- */
function openInfo(f, grams){
  if(!f) return;
  const r=(grams||100)/100, fib=f.fiber_g||0;
  const est=4*f.protein_g + 4*Math.max(0,f.carb_g-fib) + 2*fib + 9*f.fat_g;   // fiber-aware
  const ratio=est>0 ? f.kcal/est : 1, ok = ratio>=0.7 && ratio<=1.2;
  const src = f.recipe
    ? `Recipe, built from real USDA ingredients: ${f.ingredients.map(i=>esc(i.name)+" "+i.g+"g").join(", ")}`
    : `USDA FoodData Central: ${esc(f.usda)}`;
  const formLine =
      f.form==="dry"    ? "⚖️ <b>Weighed DRY / uncooked.</b> If the client weighs it cooked, use the cooked version instead, the numbers are very different."
    : f.form==="cooked" ? "⚖️ <b>Weighed COOKED.</b> These numbers are for the food after cooking."
    : f.form==="canned" ? "Canned, check the sodium line."
    : f.form==="recipe" ? (f.makes>1 ? `🍰 Makes ${f.makes} servings, the numbers below are for ONE serving.` : "🍰 Finished recipe, one serving.") : "";
  const stepsHtml = (f.recipe && f.steps && f.steps.length)
    ? `<div class="info-steps"><b>How to make it</b><ol>${f.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div>` : "";
  $("infoBody").innerHTML = `
    <h3 class="info-title">${esc(f.name)}${formBadge(f)}</h3>
    <p class="src">${src}</p>
    ${f.brands?`<p class="info-brands">Popular brands: ${esc(f.brands)}</p>`:""}
    ${formLine?`<p class="formline">${formLine}</p>`:""}
    ${stepsHtml}
    <table class="infotab">
      <tr><td>Per 100 g</td><td>${Math.round(f.kcal)} cal · P${fmt(f.protein_g)} C${fmt(f.carb_g)} F${fmt(f.fat_g)} · fiber ${fmt(f.fiber_g)}g</td></tr>
      <tr><td>This serving (${grams||100} g)</td><td>${Math.round(f.kcal*r)} cal · P${Math.round(f.protein_g*r)} C${Math.round(f.carb_g*r)} F${Math.round(f.fat_g*r)} · fiber ${fmt(f.fiber_g*r)}g</td></tr>
    </table>
    <div class="xcheck ${ok?"ok":"warn"}">${ok?"✓":"⚠"} Calorie check: ${Math.round(f.kcal)} kcal vs ${Math.round(est)} computed from macros (per 100g), ${ok?"consistent":"review this food"}.</div>
    <p class="omegaline">Omega-3 ${fmt(f.omega3_g)}g · Omega-6 ${fmt(f.omega6_g)}g · EPA+DHA ${Math.round(f.epa_dha_mg)}mg (per 100g)</p>`;
  $("infoBackdrop").classList.remove("hidden");
}
function closeInfo(){ $("infoBackdrop").classList.add("hidden"); }

/* -------------------- weekly grocery modal -------------------- */
function openGrocery(){
  if(!weekHasMeals()){ uiAlert("Build at least one day first."); return; }
  const secs=weeklyGrocery(), days=state.week.filter(d=>d.meals.length).length;
  const supps=supplementOrderList();
  const suppSec = supps.length ? `<div class="g-sec g-supp"><h4>Supplements <span class="g-online">· order online (Amazon)</span></h4>${
    supps.map(s=>`<label class="g-item"><input type="checkbox"><span>${esc(s.label)}${s.brand?`<span class="g-brands">${esc(s.brand.name)}, ${esc(s.brand.product)}${s.brand.certified?" · ✓ 3rd-party tested":""} · <a href="${amazonProductUrl(s.brand)}" target="_blank" rel="noopener noreferrer">order ↗</a>`:""}</span></span><em>${esc(s.dose||"")}</em></label>`).join("")
  }${amazonDisclosure()}</div>` : "";
  const secHtml = ss => ss.map(sec=>`<div class="g-sec"><h4>${esc(sec.cat)}</h4>${sec.items.map(it=>
      `<label class="g-item"><input type="checkbox"><span>${esc(it.name)}${it.brands?`<span class="g-brands">e.g. ${esc(it.brands)}</span>`:""}${it.swap?`<span class="g-brands">Not in every store: ${esc(it.swap)}</span>`:""}</span><em>${esc(it.amount)}</em></label>`).join("")}</div>`).join("");
  const byCook = groceryByCook();
  $("groceryBody").innerHTML = byCook
    ? `<p class="g-sub">One list per cook day. Shop right before each cook so fish and fresh produce are at their best. Recipes are broken into their ingredients, amounts rounded for shopping.</p>` +
      byCook.map(c=>`<div class="g-cook"><h3 style="margin:.8em 0 .1em;font-size:15px">${esc(c.head)}</h3>${c.dishes.length?`<p class="g-sub" style="margin:0 0 .4em">${esc(c.dishes.join(", "))}</p>`:""}${secHtml(c.secs)}</div>`).join("") + suppSec
    : `<p class="g-sub">Everything for the week (${days} day${days!==1?"s":""}), recipes broken into their ingredients, amounts rounded for shopping.</p>` +
      secHtml(secs) + suppSec;
  $("groceryBackdrop").classList.remove("hidden");
}
function closeGrocery(){ $("groceryBackdrop").classList.add("hidden"); }

/* -------------------- allergen chips -------------------- */
function renderAllergenChips(){
  const wrap=$("allergenChips");
  wrap.innerHTML = ALLERGENS.map(a=>
    `<span class="chip ${state.profile.allergens[a.key]?"on":""}" data-k="${a.key}">${a.label}</span>`).join("");
  wrap.querySelectorAll(".chip").forEach(c=>c.addEventListener("click", ()=>{
    const k=c.dataset.k; state.profile.allergens[k]=!state.profile.allergens[k]; c.classList.toggle("on");
    markDirty(); if(state.meals.length) renderScore();
  }));
}
// show whey only for diets that allow it; show plant protein only for veg/vegan diets (else clutter)
function suppVisible(s, diet){
  const plant = diet==="vegan"||diet==="ovo";
  if(s.diet==="animal" && plant) return false;
  if(s.diet==="plant"  && !(plant || diet==="vegetarian")) return false;
  return true;
}
// Fish oil is not vegetarian. Meat-free diets see the algae form: the same EPA+DHA (fish get theirs from algae).
const MEATFREE_DIET = d => d==="vegan" || d==="ovo" || d==="vegetarian";
// A supplement with brand "variants" (the multi) is labelled, dosed and COUNTED as the product the client is actually
// told to buy. Which product that is:
//   1. only brands the client's diet allows (vegan/ovo/vegetarian and halal/kosher get the gelatin-free ones);
//   2. only brands with a verified label in the data, so the plan counts what they actually take;
//   3. only brands that keep every day of THIS plan under the adult upper limits (NIH ODS) together with the food.
//      OB, 2026-09-24: "you can give different brands". Ekkovision alone is 125mcg (5,000 IU) of D, over the 100mcg
//      limit before any food, and Thorne's 80mg of niacinamide is over the 35mg limit for supplemental niacin;
//   4. of those, the one that fills the most of this plan's micronutrient gaps (the reason a multi gets suggested),
//      the guide's order breaking ties.
// If nothing passes 3, the smallest overshoot wins and the coach-only upper-limit check says so. A diet-allowed brand
// with no verified label anywhere reads as a plain "Multivitamin" and counts nothing, rather than borrowing another
// product's numbers. (Before labels were per brand, vegans were told to buy Ritual while the plan printed
// "Ekkovision, 3 caps" and counted Ekkovision's 5,000 IU of D3 and 250mcg of B12.)
const SUPP_FOR_CACHE = new Map();
const sameBrand = (a,b) => String(a||"").trim().toLowerCase() === String(b||"").trim().toLowerCase();
function suppVariant(s, brandName, P){
  if(sameBrand(brandName, s.brand)) return s;
  const v = (s.variants||[]).find(x => sameBrand(x.brand, brandName));
  const sx = v && (v[P.sex==="female" ? "female" : "male"] || v.male || v.female);
  return sx ? Object.assign({}, s, {brand:v.brand, dose:v.dose, label:sx.label, product:sx.product, add:sx.add}) : null;
}
// the food side of the upper-limit check: every day of the plan in view, because the worst day has to fit. With no
// plan yet, the client's reference intakes stand in for a normal day of food.
function planFoodDays(P){
  const days = (state.week||[]).filter(d => d.meals && d.meals.length).map(d => mealsTotals(d.meals, false));
  if(days.length) return days;
  if(state.meals && state.meals.length) return [mealsTotals(state.meals, false)];
  return [driOf(P)];
}
function planFoodAvg(P){
  const days = planFoodDays(P), avg = {};
  SUM_KEYS.forEach(k => { avg[k] = days.reduce((a,t) => a + (t[k]||0), 0) / days.length; });
  return avg;
}
function planSig(){
  let h = 7; const mix = x => { const t = String(x); for(let i=0;i<t.length;i++) h = (h*31 + t.charCodeAt(i))|0; };
  const add = ms => (ms||[]).forEach(m => (m.items||[]).forEach(it => { mix(it.id); mix(Math.round(it.grams)); }));
  (state.week||[]).forEach(d => add(d.meals)); add(state.meals);
  return h;
}
// how far past an upper limit this supplement would take the worst day (0 = fits). A limit only counts when the
// supplement adds to it: food alone over a limit (oysters and zinc) is not the supplement's doing.
function ulOvershoot(add, days){
  let over = 0;
  days.forEach(t => { for(const k in UL_TOTAL){ const a = add[k]||0; if(a > 0){ const ul = UL_TOTAL[k][0], v = (t[k]||0) + a; if(v > ul) over = Math.max(over, (v-ul)/ul); } } });
  for(const k in UL_SUPP){ const a = add[k]||0, ul = UL_SUPP[k][0]; if(a > ul) over = Math.max(over, (a-ul)/ul); }
  return over;
}
function gapCover(add, days, P){
  const tg = driOf(P); let sum = 0;
  days.forEach(t => MICRO_KEYS.forEach(k => { const g = tg[k]; if(g > 0) sum += Math.min(1, ((t[k]||0) + (add[k]||0))/g); }));
  return sum / Math.max(1, days.length);
}
function suppFor(s, P){
  if(!s || !s.variants || !P) return s;
  const ck = [s.key, P.diet, !!P.halal, !!P.kosher, P.sex, planSig()].join("|");
  if(SUPP_FOR_CACHE.has(ck)) return SUPP_FOR_CACHE.get(ck);
  if(SUPP_FOR_CACHE.size > 300) SUPP_FOR_CACHE.clear();
  const gk = SUPP_GUIDE_KEY[s.key], allowed = suppBrandsAllowed(gk, P);
  const cands = allowed.map(b => suppVariant(s, b.name, P)).filter(Boolean);
  let r;
  if(cands.length){
    const days = planFoodDays(P);
    const scored = cands.map((c,i) => ({c, i, over: ulOvershoot(c.add||{}, days), cover: gapCover(c.add||{}, days, P)}));
    const fits = scored.filter(x => x.over === 0);
    const pool = fits.length ? fits : scored.slice().sort((a,b) => a.over - b.over).slice(0,1);
    pool.sort((a,b) => (b.cover - a.cover) || (a.i - b.i));
    r = pool[0].c;
  } else {
    const g = SUPP_GUIDE_BY_KEY[gk] || {}, b = allowed[0];
    r = Object.assign({}, s, {brand: b ? b.name : s.brand, label: g.label || "Multivitamin", dose: g.dose || "1 serving", add:{}});
  }
  SUPP_FOR_CACHE.set(ck, r); return r;
}
// the brand line names the exact product the counted amounts come from ("Essential for Men 18+", not "Women's/Men's")
function brandShown(b, s, P){
  const r = s && suppFor(s, P);
  return (b && r && r.product && String(r.brand||"").toLowerCase()===String(b.name||"").toLowerCase()) ? Object.assign({}, b, {product:r.product}) : b;
}
function suppLabel(s, P){ return (s.key==="fishoil" && MEATFREE_DIET(P && P.diet)) ? "Algae omega-3 (EPA+DHA)" : suppFor(s, P).label; }
function suppDose(s, P){ return (s.key==="fishoil" && MEATFREE_DIET(P && P.diet)) ? "about 2,000 mg EPA+DHA a day from algae oil" : suppFor(s, P).dose; }
function renderSupplementChips(){
  const wrap=$("suppChips"); const diet=state.profile.diet;
  wrap.innerHTML = SUPPLEMENTS.filter(s=>suppVisible(s,diet)).map(s=>
    `<span class="schip ${state.profile.supplements[s.key]?"on":""}" data-k="${s.key}" title="${esc(suppDose(s,state.profile))}">${esc(suppLabel(s,state.profile))}</span>`).join("");
  wrap.querySelectorAll(".schip").forEach(c=>c.addEventListener("click", ()=>{
    const k=c.dataset.k; state.profile.supplements[k]=!state.profile.supplements[k]; c.classList.toggle("on");
    markDirty(); if(state.meals.length) renderScore();
  }));
}

/* -------------------- supplement gap-fill recommendations + credible brands -------------------- */
const SUPP_GUIDE = window.OB_SUPPLEMENT_GUIDE || [];
const SUPP_GUIDE_BY_KEY = {}; SUPP_GUIDE.forEach(g=>SUPP_GUIDE_BY_KEY[g.key]=g);
const SUPP_BY_KEY = {}; SUPPLEMENTS.forEach(s=>SUPP_BY_KEY[s.key]=s);
// map a toggle key (OB_SUPPLEMENTS) -> brand-guide key (researched)
const SUPP_GUIDE_KEY = { fishoil:"omega3", vitd:"vitamin_d", b12:"vitamin_b12", iron:"iron",
  calcium:"calcium", magnesium:"magnesium", multi:"multivitamin", creatine:"creatine",
  protein_whey:"protein_whey", protein_plant:"protein_plant" };
// OB Health's Amazon Associates tag. HARDCODED for EVERY coach (Dylan: "all coaches should have it like
// that") — every supplement link earns OB the referral, no per-coach override that could divert it.
const DEFAULT_AMAZON_TAG = "yanaburlak-20";
const effectiveAmazonTag = () => DEFAULT_AMAZON_TAG;
const amazonUrl = q => { const tag=effectiveAmazonTag();
  return "https://www.amazon.com/s?k=" + encodeURIComponent(q) + (tag ? "&tag="+encodeURIComponent(tag) : ""); };
// a brand with a specific ASIN links straight to that product (higher convert); else a tagged search.
const amazonProductUrl = b => { const tag=effectiveAmazonTag();
  if(b && b.asin) return "https://www.amazon.com/dp/" + b.asin + (tag ? "?tag="+encodeURIComponent(tag) : "");
  return amazonUrl((b&&b.name?b.name:"") + " " + (b&&b.product?b.product:"")); };
const amazonDisclosure = () => effectiveAmazonTag()
  ? `<p class="amz-disc">As an Amazon Associate, OB Health may earn a commission from qualifying purchases, at no extra cost to you.</p>` : "";

// Detect what the plan can't cover with FOOD alone, so we only suggest filling real gaps (food-first).
function detectGaps(){
  if(!state.meals.length) return [];
  const P = state.profile;
  // food only, before any supplements, on the plan's AVERAGE day. A new draft opens on Sunday and this used to read
  // Sunday alone: one test client was prescribed iron on a week that averaged fine and missed vitamin D on a week
  // at 48%, and 19 of 40 test weeks got a different supplement list from their one day than from the week they eat.
  const food = planFoodAvg(P);
  const plant = P.diet==="vegan" || P.diet==="ovo";
  const veg = plant || P.diet==="vegetarian";
  const pct = (k)=>{ const tg=microTarget(k); return tg>0 ? food[k]/tg : 1; };
  const gaps = [];
  const edt = microTarget("epa_dha_mg");
  if(food.epa_dha_mg < 0.8*edt) gaps.push({key:"fishoil", sev: food.epa_dha_mg<0.3*edt?2:1,
    why: veg ? `EPA+DHA is only ${Math.round(food.epa_dha_mg)}mg vs the ${Math.round(edt)}mg goal. A meat-free diet has almost none, and algae oil supplies the same EPA and DHA fish oil does.`
             : `EPA+DHA is only ${Math.round(food.epa_dha_mg)}mg vs the ${Math.round(edt)}mg goal, very hard to hit without fatty fish.`});
  // protein powder, surface when food falls short, or as an easy option on plant diets. Never for a client who
  // has ruled powder out ("protein powder" in can't-have) or can't have the powder itself (whey is dairy).
  const protTgt = +curTargets().tPro;
  const protPct = (protTgt>0) ? food.protein_g/protTgt : 1;
  const powderFood = FOODS.find(f => plant ? /^Pea & rice protein powder/i.test(f.name) : /^Whey protein powder/i.test(f.name));
  const powderOut = powderFood && /can’t have|allerg|dairy|vegan|ovo|vegetarian|halal|kosher|gluten/i.test(exclusion(powderFood, P) || "");
  if(powderOut){ /* no powder suggestion */ }
  else if(protPct < 0.95){
    gaps.push({key: plant?"protein_plant":"protein_whey", sev: protPct<0.9?2:1,
      why:`Protein lands at ${Math.round(protPct*100)}% from food alone, a scoop closes the gap.`});
  } else if(plant){
    gaps.push({key:"protein_plant", sev:1,
      why:`Hitting protein on a ${P.diet} diet is much easier with a shake, optional, but most clients lean on one.`});
  } else {
    gaps.push({key:"protein_whey", sev:0,
      why:`Optional, a convenient, great-tasting way to top up protein on busy days.`});
  }
  // A multi already supplies some of what the single supplements would: the Ekkovision multi's 125mcg of D plus a
  // separate D3 put a client near 7,000 IU a day, past the 100mcg (4,000 IU) adult upper limit, and a women's multi
  // with 18mg of iron plus an 18mg iron tablet stacks the same way. So when a multi is in the plan (or about to be
  // suggested), D, calcium, iron and magnesium are judged on food PLUS that multi, read as the brand actually
  // recommended. B12 on a plant diet stays food-only: a dedicated B12 is the standard advice whatever the multi holds.
  // A multi is only SUGGESTED when the brand it would be keeps the plan under every upper limit; a coach can still
  // add one by hand, and the coach-only upper-limit check then says what it breaks.
  const lowCount = MICRO_KEYS.filter(k=>pct(k)<0.65).length;
  const mPick = SUPP_BY_KEY.multi ? suppFor(SUPP_BY_KEY.multi, P) : null;
  const suggestMulti = lowCount>=4 && !!mPick && ulOvershoot(mPick.add||{}, planFoodDays(P)) === 0;
  const multiIn = (P.supplements && P.supplements.multi) || suggestMulti;
  const mAdd = (multiIn && mPick) ? (mPick.add || {}) : {};
  const pctM = (k)=>{ const tg=microTarget(k); return tg>0 ? (food[k]+(mAdd[k]||0))/tg : 1; };
  const withMulti = k => (mAdd[k]||0) > 0 ? " with the multi" : "";
  // B12 is the exception and is judged on the plan's LOWEST day: the food route has to be daily (the Vegan Society's
  // is fortified foods two or three times a day for at least 3 mcg), so one fortified day cannot carry the week.
  const b12Low = Math.min(...planFoodDays(P).map(t => (t.vit_b12_ug||0) / (microTarget("vit_b12_ug")||2.4)));
  if(plant && b12Low < 0.85) gaps.push({key:"b12", sev:2,
    why:`B12 is near-zero in plant foods, supplementing is essential on a ${P.diet} diet.`});
  // her blood work outranks the food estimate: a lab result of "normal" means no capsule for that nutrient (a client's
  // Oct 21 panel had iron in range, so "take the iron only if it shows you are low" became "no iron"; 2026-10-22)
  const labOK = k => (((P.labs || {}).results || {})[k] === "normal");
  if(pctM("vit_d_ug") < 0.7 && !labOK("vitd")) gaps.push({key:"vitd", sev:1,
    why:`Vitamin D is ${Math.round(pctM("vit_d_ug")*100)}% of target${withMulti("vit_d_ug")}, food alone rarely covers it.`});
  if(pctM("calcium_mg") < 0.75 && veg) gaps.push({key:"calcium", sev:1,
    why:`Calcium is ${Math.round(pctM("calcium_mg")*100)}% of target${withMulti("calcium_mg")} on a dairy-light plan.`});
  if(pctM("iron_mg") < 0.8 && (P.sex==="female"||veg) && !labOK("iron")) gaps.push({key:"iron", sev:1,
    why:`Iron is ${Math.round(pctM("iron_mg")*100)}% of target${withMulti("iron_mg")}${veg?" (plant iron absorbs less)":""}, supplement if labs run low.`});
  if(pctM("magnesium_mg") < 0.7) gaps.push({key:"magnesium", sev:1,
    why:`Magnesium is ${Math.round(pctM("magnesium_mg")*100)}% of target${withMulti("magnesium_mg")}, a common shortfall.`});
  if(suggestMulti) gaps.push({key:"multi", sev:1, why:`${lowCount} micronutrients sit under 65%, a multivitamin is cheap insurance.`});
  gaps.push({key:"creatine", sev:0, why: P.goal==="gain"
    ? `Optional: adds to the strength and muscle you gain from training (vegans benefit most, low dietary creatine).`
    : `Optional: protects strength &amp; muscle in a deficit (vegans benefit most, low dietary creatine).`});
  return gaps.sort((a,b)=>b.sev-a.sev);
}
// Tolerable Upper Intake Levels, adults 19+ (NIH Office of Dietary Supplements / National Academies). Most are
// food plus supplements. Magnesium, vitamin E, folic acid and preformed vitamin A have supplement-only ULs, so
// those are checked against what the supplements add. Food alone over a UL (oysters and zinc) is not flagged.
const UL_TOTAL = { vit_d_ug:[100,"Vitamin D","mcg"], zinc_mg:[40,"Zinc","mg"], selenium_ug:[400,"Selenium","mcg"],
  vit_b6_mg:[100,"Vitamin B6","mg"], vit_c_mg:[2000,"Vitamin C","mg"], iron_mg:[45,"Iron","mg"],
  calcium_mg:[2500,"Calcium","mg"], manganese_mg:[11,"Manganese","mg"], copper_mg:[10,"Copper","mg"] };
// Niacin: the 35mg UL "appl[ies] only to supplemental niacin", and the FNB applies it to nicotinamide as well as
// nicotinic acid (NIH ODS niacin fact sheet, read 2026-09-24).
const UL_SUPP = { niacin_mg:[35,"Niacin from supplements","mg"], magnesium_mg:[350,"Magnesium from supplements","mg"], vit_e_mg:[1000,"Vitamin E from supplements","mg"],
  folate_ug:[1000,"Folic acid from supplements","mcg"], vit_a_ug:[3000,"Vitamin A from supplements","mcg"] };
function suppULWarnings(){
  if(!state.meals.length) return [];
  const P = state.profile, supp = {};
  SUPPLEMENTS.forEach(s=>{ if(P.supplements && P.supplements[s.key]){ const add = suppFor(s,P).add; for(const k in add) supp[k]=(supp[k]||0)+add[k]; } });
  // an upper limit is a daily ceiling, so it is checked on the plan's highest day, not the day the coach has open
  const all = {};
  planFoodDays(P).forEach(t => { for(const k in t) all[k] = Math.max(all[k]||0, (t[k]||0) + (supp[k]||0)); });
  const amt = (k,v,u)=> k==="vit_d_ug" ? `${Math.round(v)}${u} (${(Math.round(v*40/100)*100).toLocaleString()} IU)` : `${Math.round(v)}${u}`;
  const out = [];
  for(const k in UL_TOTAL){ const [ul,name,u]=UL_TOTAL[k];
    if((supp[k]||0)>0 && all[k]>ul) out.push(`${name} comes to about ${amt(k,all[k],u)} on the plan's highest day with the supplements, over the ${amt(k,ul,u)} adult upper limit.`); }
  for(const k in UL_SUPP){ const [ul,name,u]=UL_SUPP[k];
    if((supp[k]||0)>ul) out.push(`${name} is ${amt(k,supp[k],u)} a day, over the ${amt(k,ul,u)} adult upper limit.`); }
  return out;
}
// pick the best-fitting verified brands for a gap (prefer vegan products on plant diets)
const GELATIN_RISK = new Set(["omega3","vitamin_d","multivitamin","iron","calcium"]);   // softgels/caps that can use pork/bovine gelatin
function suppBrandsAllowed(guideKey, P){
  const g = SUPP_GUIDE_BY_KEY[guideKey]; if(!g || !g.brands || !g.brands.length) return [];
  // vegan/ovo need everything plant; halal/kosher/vegetarian only need the gelatin-risk softgels, capsules and
  // tablets swapped to plant, NOT powders (whey/creatine have no gelatin). For vegetarians that also turns fish oil
  // into algae oil and a gelatin tablet multi into a plant one.
  const preferVegan = P.diet==="vegan"||P.diet==="ovo" || ((P.halal||P.kosher||P.diet==="vegetarian") && GELATIN_RISK.has(guideKey));
  let bs = g.brands.slice();
  if(preferVegan){ const v=bs.filter(b=>b.vegan); if(v.length) bs=v; }
  return bs;
}
function suppBrands(guideKey, P, n){
  let bs = suppBrandsAllowed(guideKey, P);
  // a supplement with per-brand labels (the multi): the brand the plan counts goes first, and a brand whose verified
  // label would put this plan over an upper limit is not offered at all. Unverified brands stay as alternatives.
  const s = SUPPLEMENTS.find(x => x.variants && SUPP_GUIDE_KEY[x.key]===guideKey);
  if(s){
    const pick = suppFor(s, P), days = planFoodDays(P);
    bs = bs.filter(b => { const v = suppVariant(s, b.name, P); return !v || sameBrand(b.name, pick.brand) || ulOvershoot(v.add||{}, days) === 0; });
    bs.sort((a,b) => (sameBrand(b.name, pick.brand)?1:0) - (sameBrand(a.name, pick.brand)?1:0));
  }
  return bs.slice(0, n||2);
}
function suppBrandHTML(guideKey, P, s){
  return suppBrands(guideKey, P, 3).map(b0=>{ const b = brandShown(b0, s, P);
    const cert = b.certified ? `<span class="supp-cert" title="${esc(b.why||"")}">✓ 3rd-party tested</span>` : "";
    return `<a class="supp-brand" href="${amazonProductUrl(b)}" target="_blank" rel="noopener noreferrer">${esc(b.name)}, ${esc(b.product)}${cert}<span class="supp-az">order ↗</span></a>`;
  }).join("");
}
function renderSuppSuggest(){
  const wrap=$("suppSuggest"); if(!wrap) return;
  const gaps = state.meals.length ? detectGaps() : [];
  if(!gaps.length){ wrap.innerHTML=""; return; }
  const P=state.profile;
  const rows = gaps.map(gp=>{
    const s = SUPP_BY_KEY[gp.key]; if(!s || !suppVisible(s,P.diet)) return "";
    const on = !!(P.supplements && P.supplements[gp.key]);
    const gk = SUPP_GUIDE_KEY[gp.key], g = SUPP_GUIDE_BY_KEY[gk];
    const dose = s.variants ? suppDose(s,P) : ((g&&g.dose) || s.dose || "");
    const brands = suppBrandHTML(gk, P, s);
    return `<div class="supp-rec ${on?'on':''}">
      <div class="supp-rec-head">
        <button class="supp-add" data-k="${gp.key}">${on?'✓ added':'+ add'}</button>
        <b>${esc(suppLabel(s,P))}</b> <span class="supp-dose">${esc(dose)}</span>
      </div>
      <div class="supp-why">${gp.why}</div>
      ${brands?`<div class="supp-brands">${brands}</div>`:""}
    </div>`;
  }).join("");
  const halalNote = (P.halal||P.kosher) ? `<div class="supp-halal">Many fish-oil &amp; vitamin softgels use pork/bovine gelatin. We've shown the plant-based (gelatin-free) options, otherwise choose a ${P.halal?"halal":"kosher"}-certified version.</div>` : "";
  const ul = suppULWarnings();
  const ulNote = ul.length ? `<div class="supp-halal"><b>Upper-limit check (coach only):</b> ${ul.map(esc).join(" ")}</div>` : "";
  wrap.innerHTML = `<h3>Suggested supplements <span class="sub">· food first, these only fill what the plan can't</span></h3>${halalNote}${ulNote}${rows}${amazonDisclosure()}`;
  wrap.querySelectorAll(".supp-add").forEach(btn=>btn.addEventListener("click",()=>{
    const k=btn.dataset.k; P.supplements=P.supplements||{}; P.supplements[k]=!P.supplements[k];
    markDirty(); renderScore(); renderSupplementChips();
  }));
}
// toggled supplements with a recommended brand, for the grocery list ("order online")
function supplementOrderList(){
  const P=state.profile;
  return SUPPLEMENTS.filter(s=>P.supplements && P.supplements[s.key] && suppVisible(s,P.diet)).map(s=>{
    const b = brandShown(suppBrands(SUPP_GUIDE_KEY[s.key], P, 1)[0] || null, s, P);
    return { label:suppLabel(s,P), dose:suppDose(s,P), brand:b, when:suppWhen(s,P) };
  });
}

/* -------------------- health screen / scope flag -------------------- */
const flaggedScreens = () => SCREEN_FLAGS.filter(s => state.profile.screen && state.profile.screen[s.key]);
function renderScreenChips(){
  const wrap=$("screenChips");
  wrap.innerHTML = SCREEN_FLAGS.map(s=>
    `<span class="chip ${state.profile.screen[s.key]?"on":""}" data-k="${s.key}">${esc(s.label)}</span>`).join("");
  wrap.querySelectorAll(".chip").forEach(c=>c.addEventListener("click", ()=>{
    const k=c.dataset.k; state.profile.screen[k]=!state.profile.screen[k]; c.classList.toggle("on");
    markDirty(); updateScreenBanner(); if(state.meals.length) renderMeals();
  }));
}
function scopeBannerHTML(){
  const f=flaggedScreens(); if(!f.length) return "";
  const glp1 = state.profile.screen.glp1;
  return `⚠ <b>Scope check, route to a physician / registered dietitian.</b> Flagged: ${f.map(x=>esc(x.label)).join(", ")}. `
       + `This is outside general-wellness coaching scope; have it reviewed under clinical oversight before issuing an individualized plan.`
       + (glp1 ? ` <b>GLP-1 clients require RD/MD nutrition oversight.</b>` : "");
}
function updateScreenBanner(){
  const b=$("screenBanner"); const html=scopeBannerHTML();
  if(html){ b.innerHTML=html; b.classList.remove("hidden"); } else { b.classList.add("hidden"); b.innerHTML=""; }
}

/* -------------------- macro math hint -------------------- */
// Real food does not add up to 4-4-9: fiber inside the carb number counts about 2 kcal/g, not 4. The plan
// itself targets at least this much fiber, so the calorie a set of macros will really deliver is knowable in
// advance. (a client's plan was set to "2268 minus 100" with carbs cut 25g and still landed 60 high for this reason.)
function planFiberFloor(cal){ return Math.max(30, 14*(cal||0)/1000); }
function realKcalOf(pro, carb, fat, cal){ const f=planFiberFloor(cal); return pro*4 + (carb-f)*4 + f*2 + fat*9; }
function carbsForCalories(cal, pro, fat){ const f=planFiberFloor(cal); return Math.max(0, (cal - pro*4 - fat*9 + 2*f)/4); }
function updateMacroHint(){
  const pro=+$("tPro").value||0, carb=+$("tCarb").value||0, fat=+$("tFat").value||0, cal=+$("tCal").value||0;
  const real=realKcalOf(pro,carb,fat,cal); const diff=real-cal;
  let msg=`These macros deliver about ${Math.round(real)} cal from real food`;
  if(cal){
    if(Math.abs(diff)<=25) msg += ` · matches your ${cal} target ✓`;
    else msg += ` · ${diff>0?"+":""}${Math.round(diff)} vs your ${cal} target. Carbs at ${Math.round(carbsForCalories(cal,pro,fat))}g would land on it (protein and fat unchanged).`;
  }
  $("macroMathHint").textContent=msg;
}

/* -------------------- undo (one level, swap = undo/redo) -------------------- */
let undoBuf = null;
function snapshotMeals(){
  undoBuf = JSON.parse(JSON.stringify(state.meals));
  updateUndoBtn(); markDirty();
}
function undoMeals(){
  if (undoBuf === null) return;
  const cur = state.meals;
  setMeals(undoBuf);
  undoBuf = cur;            // swapping makes the button toggle undo/redo
  syncPrepBatch();
  render();
}
function updateUndoBtn(){ const b=$("undoBtn"); if(b) b.disabled = (undoBuf===null); }

/* -------------------- copy plan as text (for DMs / app chat) -------------------- */
function planAsText(){
  const P = readForm(); state.profile = P;
  const t = totals();
  const L = [];
  L.push(`${(P.name||"Meal plan").toUpperCase()}, OB Health`);
  L.push(`Daily: ${Math.round(t.kcal)} cal · P${Math.round(t.protein_g)} C${Math.round(t.carb_g)} F${Math.round(t.fat_g)} · fiber ${Math.round(t.fiber_g)}g`);
  L.push(`Targets: ${P.tCal} cal · P${P.tPro} C${P.tCarb} F${P.tFat}`);
  state.meals.forEach(m=>{
    const mm = mealMacros(m);
    L.push("");
    L.push(`${m.name.toUpperCase()}, ${Math.round(mm.kcal)} cal (P${Math.round(mm.protein_g)} C${Math.round(mm.carb_g)} F${Math.round(mm.fat_g)})`);
    m.items.forEach(it=>{
      const f = FOOD_BY_ID[it.id]; if(!f) return;
      L.push(`• ${f.name}, ${bestPortion(f, it.grams)}`);
      if (f.recipe){
        const ings = (f.ingredients||[]).map(i=>`${i.name} ${i.g}g`).join(", ");
        L.push(`   ↳ Recipe${f.makes>1?" (makes "+f.makes+")":""}: ${ings}`);
        (f.steps||[]).forEach((s,si)=>L.push(`      ${si+1}. ${s}`));
      }
    });
  });
  L.push("");
  L.push(`Omega-3 ${fmt(t.omega3_g)}g · EPA+DHA ${Math.round(t.epa_dha_mg)}mg`);
  L.push("General wellness recommendations only, not medical advice. Consult your physician.");
  return L.join("\n");
}
function copyText(s){
  if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(s);
  const ta=document.createElement("textarea"); ta.value=s; document.body.appendChild(ta);
  ta.select(); document.execCommand("copy"); ta.remove();
  return Promise.resolve();
}

/* -------------------- backup / import clients (JSON file) -------------------- */
function exportClients(){
  const store = loadStore();
  if (!Object.keys(store).length){ uiAlert("No saved clients to back up yet, hit Save first."); return; }
  const payload = { app:"ob-meal-planner", version:1, exported:new Date().toISOString(), clients:store };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ob-meal-planner-clients-" + new Date().toISOString().slice(0,10) + ".json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
  flash($("exportClientsBtn"), "Saved ✓");
}
function importClientsFile(file){
  const rd = new FileReader();
  rd.onload = () => {
    try{
      const data = JSON.parse(rd.result);
      const clients = (data && data.clients && typeof data.clients==="object") ? data.clients
                    : (data && typeof data==="object" && !Array.isArray(data) ? data : null);
      if (!clients) throw new Error("bad format");
      // accept only well-formed entries; sanitize so garbage never reaches the solver/render
      const valid = c => c && typeof c.profile==="object" && !Array.isArray(c.profile)
                      && (c.week===undefined || (Array.isArray(c.week) && c.week.every(d=>d && Array.isArray(d.meals))));
      const sanitize = c => {
        const p=c.profile; ["tCal","tPro","tCarb","tFat"].forEach(k=>{ const v=+p[k]; p[k]=isFinite(v)&&v>=0?v:0; });
        p.meals=Math.max(3,Math.min(6,+p.meals||4));
        return c;
      };
      const names = Object.keys(clients).filter(n => valid(clients[n]));
      const skipped = Object.keys(clients).length - names.length;
      if (!names.length) throw new Error("no valid clients");
      const store = loadStore();
      const dups = names.filter(n => store[n]);
      const msg = `Import ${names.length} client${names.length>1?"s":""}?` +
                  (dups.length ? ` ${dups.length} existing will be overwritten (${dups.join(", ")}).` : "") +
                  (skipped ? ` (${skipped} malformed entr${skipped>1?"ies":"y"} skipped.)` : "");
      uiConfirm(msg, ()=>{
        names.forEach(n => store[n] = sanitize(clients[n]));
        if(saveStore(store)){ refreshClientSelect($("clientSelect").value); flash($("importClientsBtn"), "Imported ✓"); }
      }, null, "Import");
    }catch(e){
      uiAlert("Couldn't read that file, it doesn't look like an OB Meal Planner backup.");
    }
  };
  rd.readAsText(file);
}

/* -------------------- generate remaining macros -------------------- */
// Calories = anchor; protein = always set. Fills whichever of carbs/fat are blank so the
// macros reconcile to the calorie target. If all are set, re-balances carbs (then fat).
function generateMacros(){
  const cal=+$("tCal").value||0, P=+$("tPro").value||0;
  let C=+$("tCarb").value||0, F=+$("tFat").value||0;
  if(cal<=0){ uiAlert("Set a calorie target first, it's the anchor the macros fill to."); $("tCal").focus(); return; }
  if(P<=0){ uiAlert("Enter protein first (protein is always set), then I'll fill the rest."); $("tPro").focus(); return; }
  const pCal=4*P;
  if(pCal>cal){ uiAlert("Protein alone is "+Math.round(pCal)+" cal, over the "+cal+" cal target. Lower protein or raise calories."); return; }
  const cBlank = C<=0, fBlank = F<=0, rem = cal-pCal;
  if(cBlank && fBlank){            // fill both: default ~25% of calories from fat, rest carbs
    const fatCal=Math.min(rem, 0.25*cal);
    F=fatCal/9; C=(rem-fatCal)/4;
  } else if(cBlank){               // fill carbs (fiber-aware, so the built plan lands on the calorie target)
    C=carbsForCalories(cal, P, F);
  } else if(fBlank){              // fill fat
    F=(cal-pCal-4*C)/9;
  } else {                        // all set → re-balance carbs (then fat) to hit calories, fiber-aware
    const newC=carbsForCalories(cal, P, F);
    if(newC>=0) C=newC; else { C=0; F=(cal-pCal)/9; }
  }
  $("tCarb").value=Math.max(0,Math.round(C));
  $("tFat").value=Math.max(0,Math.round(F));
  state.profile.tCarb=+$("tCarb").value; state.profile.tFat=+$("tFat").value;   // sync so the live score isn't stale
  updateMacroHint();
  if(state.meals.length) renderScore();
}

/* -------------------- unsaved-changes guard -------------------- */
let dirty=false;
function markDirty(){ syncPrepBatch(); if(!dirty){ dirty=true; updateSaveMarker(); } }
function clearDirty(){ if(dirty){ dirty=false; updateSaveMarker(); } }
function updateSaveMarker(){ const b=$("saveClientBtn"); if(b) b.textContent = dirty ? "Save •" : "Save"; }

/* -------------------- persistence -------------------- */
const LS="ob_meal_clients_v1";
const loadStore = () => { try{ return JSON.parse(localStorage.getItem(LS))||{}; }catch(e){ return {}; } };
// A second copy of every saved client (name -> last saved record), in its own key. The client list lives only in this
// browser's storage, and anything that writes the list wholesale wipes every client not in it: a render page used
// for testing did exactly that on 2026-09-24. The copy is updated on every save, a deliberate Delete removes the
// client from it too, and on load any client the copy has but the list lost is offered back (offerLostClients).
const LS_KEEP = "ob_meal_clients_v1_keep";
const loadKeep = () => { try{ return JSON.parse(localStorage.getItem(LS_KEEP))||{}; }catch(e){ return {}; } };
function saveKeep(o){ try{ localStorage.setItem(LS_KEEP, JSON.stringify(o)); }catch(e){ /* storage full: the Backup button still works */ } }
function saveStore(o){
  try{ localStorage.setItem(LS, JSON.stringify(o)); const k=loadKeep(); Object.keys(o).forEach(n=>{ k[n]=o[n]; }); saveKeep(k); return true; }
  catch(e){ uiAlert("Couldn't save, your browser storage is full or you're in private browsing. Use ⬇ Backup to download your clients now so you don't lose them."); return false; }
}
// ---- version history (2026-10-14). Every saved version of a client, newest first, in its own key. "History" lists them,
// "What changed" compares one with the version before it, "Open" loads it to export or save again. A plan changed
// outside the planner (a client builder's merge) is picked up as a version when the planner loads. Capped at 8 versions
// a client and about 1.5 million characters in all, oldest first, so the client list itself always has room: a full
// history never blocks a save.
const LS_HIST = "ob_meal_history_v1", HIST_PER = 8, HIST_CHARS = 1500000;
const loadHist = () => { try{ return JSON.parse(localStorage.getItem(LS_HIST))||{}; }catch(e){ return {}; } };
// the day on screen (dayIdx) is not part of a version
const recFp = r => { const s = JSON.stringify({ profile:(r||{}).profile, week:(r||{}).week }); let h = 5381;
  for(let i=0;i<s.length;i++) h = ((h<<5)+h+s.charCodeAt(i))>>>0; return h.toString(16).padStart(8,"0"); };
function saveHist(h){
  const biggest = () => Object.keys(h).filter(n => h[n].length > 1).sort((a,b) => h[b].length - h[a].length)[0];
  Object.keys(h).forEach(n => { h[n] = (h[n]||[]).slice(0, HIST_PER); });
  while(JSON.stringify(h).length > HIST_CHARS){ const n = biggest(); if(!n) break; h[n].pop(); }
  for(let tries = 0; tries < 30; tries++){
    try{ localStorage.setItem(LS_HIST, JSON.stringify(h)); return true; }
    catch(e){ const n = biggest(); if(!n) return false; h[n].pop(); }        // storage full: drop the oldest and retry
  }
  return false;
}
function pushHist(name, rec, note){
  if(!name || !rec || !rec.week) return;
  const h = loadHist(), list = h[name] || [], fp = recFp(rec);
  if(list[0] && list[0].fp === fp) return;                                    // the same version again
  list.unshift({ t:new Date().toISOString(), note:note||"saved", fp, rec:JSON.parse(JSON.stringify({ profile:rec.profile, week:rec.week, dayIdx:rec.dayIdx||0 })) });
  h[name] = list; saveHist(h);
}
// on load: a client with no history starts one, and one whose saved plan changed outside the planner gets a version
function catchUpHistory(){
  const store = loadStore(), h = loadHist();
  Object.keys(store).forEach(n => { const l = h[n] || [];
    if(!l.length) pushHist(n, store[n], "first kept");
    else if(l[0].fp !== recFp(store[n])) pushHist(n, store[n], "changed outside the planner"); });
}

// ---- what changed between two versions of a plan (2026-10-14: OB asked "what is the difference between these" about two
// of a client's PDFs, then "i just sent this, is that bad"). For the coach: every change, grouped across the days it
// happened on. For the client: a few plain sentences to paste. A client who sees no numbers (noTotals) gets none in it.
const DAY_WORDS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const andList = a => a.length <= 1 ? (a[0]||"") : a.slice(0,-1).join(", ") + " and " + a[a.length-1];
function planDiff(oldRec, newRec){
  const A = oldRec || {}, B = newRec || {}, PA = A.profile || {}, PB = B.profile || {};
  const coach = [], client = [];
  // targets
  const tg = [["tCal","Calories",""],["tPro","Protein","g"],["tCarb","Carbs","g"],["tFat","Fat","g"]]
    .filter(([k]) => Math.round(+PA[k]||0) !== Math.round(+PB[k]||0)).map(([k,l,u]) => `${l} ${Math.round(+PA[k]||0)}${u} -> ${Math.round(+PB[k]||0)}${u}`);
  if(tg.length) coach.push("Targets: " + tg.join("; "));
  // the week, meal by meal; the same change on several days prints once with its days
  const groups = new Map(), byMeal = new Map();
  const n = Math.max((A.week||[]).length, (B.week||[]).length);
  // "every day" means every day the plan has meals on (a client's 3-meal plan runs Sunday to Tuesday)
  const planDays = [...Array(n).keys()].filter(i => ((A.week||[])[i]||{meals:[]}).meals.length || ((B.week||[])[i]||{meals:[]}).meals.length).length;
  for(let i = 0; i < n; i++){
    const da = (A.week||[])[i] || { meals:[] }, db = (B.week||[])[i] || { meals:[] }, day = db.name || da.name || DAY_WORDS[i] || `Day ${i+1}`;
    const names = [...new Set([...(da.meals||[]).map(m => m.name), ...(db.meals||[]).map(m => m.name)])];
    names.forEach(mn => {
      const ma = (da.meals||[]).find(m => m.name===mn), mb = (db.meals||[]).find(m => m.name===mn);
      const add = (t, kind) => { const k = `${mn}|${t}`; if(!groups.has(k)) groups.set(k, { meal:mn, t, kind, days:[] }); groups.get(k).days.push(day); };
      if(!ma){ add(`new: ${mb.dish||mn}`, "dish"); return; }
      if(!mb){ add("removed", "dish"); return; }
      if((ma.dish||"") !== (mb.dish||"")) add(`${ma.dish||"(no name)"} -> ${mb.dish||"(no name)"}`, "dish");
      const ga = new Map((ma.items||[]).map(it => [it.id, it.grams])), gb = new Map((mb.items||[]).map(it => [it.id, it.grams]));
      gb.forEach((g, id) => { const f = FOOD_BY_ID[id], nm = f ? f.name : id;
        if(!ga.has(id)) add(`+ ${nm} ${Math.round(g)}g`, "food");
        else { const g0 = ga.get(id); if(Math.abs(g - g0) >= Math.max(2, g0*0.03)) add(`${nm} ${Math.round(g0)}g -> ${Math.round(g)}g`, "grams"); } });
      ga.forEach((g, id) => { if(!gb.has(id)){ const f = FOOD_BY_ID[id]; add(`- ${f ? f.name : id} ${Math.round(g)}g`, "food"); } });
      const words = c => ["method","prepMethod","season","note"].map(k => String((c||{})[k]||"")).join("|");
      if((ma.dish||"") === (mb.dish||"") && words(ma.cook) !== words(mb.cook)) add("steps changed", "steps");
    });
  }
  const dayList = d => d.length === planDays ? "every day" : andList(d);
  groups.forEach(g => { coach.push(`${dayList(g.days)}, ${g.meal}: ${g.t}`); (byMeal.get(g.meal) || byMeal.set(g.meal, []).get(g.meal)).push(g); });
  // the pages after the days
  const same = (a, b) => JSON.stringify(a||null) === JSON.stringify(b||null);
  const page = (label, a, b) => { if(!a && b) return `${label} added`; if(a && !b) return `${label} removed`; if(!same(a, b)) return `${label} changed`; return ""; };
  const extras = [page("Trades", (PA.trades||[]).length ? PA.trades : null, (PB.trades||[]).length ? PB.trades : null),
    page("Plug-and-play lists", PA.buildMeals, PB.buildMeals), page("'Build your own lunch' page", PA.buildLunch, PB.buildLunch), page("Travel page", PA.travel, PB.travel),
    page("'When plans change' card", (PA.rules||[]).length ? PA.rules : null, (PB.rules||[]).length ? PB.rules : null),
    page("'How to use it' lines", (PA.howTo||[]).length ? PA.howTo : null, (PB.howTo||[]).length ? PB.howTo : null),
    PA.note !== PB.note && (PA.note || PB.note) ? "The note at the top changed" : "",
    (PA.plugAndPlay !== false) !== (PB.plugAndPlay !== false) ? `Plug-and-play pages switched ${PB.plugAndPlay === false ? "off" : "on"}` : "",
    !!PA.travelPage !== !!PB.travelPage && !PB.travel ? `Travel-day page switched ${PB.travelPage ? "on" : "off"}` : ""].filter(Boolean);
  extras.forEach(x => coach.push(x));
  // the hand-made plug-and-play lists, food by food
  if(PA.buildMeals && PB.buildMeals && !same(PA.buildMeals, PB.buildMeals)){
    const ids = bm => new Map((bm.blocks||[]).flatMap(b => (b.groups||[]).flatMap(g => (g.items||[]).map(it => [`${b.title}|${it.id}`, it.grams]))));
    const a = ids(PA.buildMeals), b = ids(PB.buildMeals);
    b.forEach((g, k) => { const [bt, id] = k.split("|"), f = FOOD_BY_ID[id]; if(!a.has(k)) coach.push(`Plug-and-play ${bt}: + ${f ? f.name : id} ${g}g`); });
    a.forEach((g, k) => { const [bt, id] = k.split("|"), f = FOOD_BY_ID[id]; if(!b.has(k)) coach.push(`Plug-and-play ${bt}: - ${f ? f.name : id} ${g}g`); });
  }
  // the client's message: plain words, the few changes that matter to them, no numbers for a no-numbers client
  const noNum = !!PB.noTotals, num = x => Math.round(+x||0).toLocaleString("en-US");
  const tgPlain = [["tCal","calories",""],["tPro","protein","g"],["tCarb","carbs","g"],["tFat","fat","g"]]
    .filter(([k]) => Math.round(+PA[k]||0) !== Math.round(+PB[k]||0)).map(([k,l,u]) => `${l} ${num(PB[k])}${u} (was ${num(PA[k])}${u})`);
  if(tgPlain.length) client.push(noNum ? "Your portions are adjusted to your new targets." : `Your new targets: ${andList(tgPlain)}.`);
  const dishes = [...groups.values()].filter(g => g.kind==="dish" && g.t.includes("->")).map(g => g.t.split(" -> ")[1]);
  if(dishes.length) client.push(`New ${dishes.length===1 ? "dish" : "dishes"}: ${andList([...new Set(dishes)])}.`);
  // portions: one sentence per set of days ("On Sunday, Tuesday, Thursday and Saturday, lunch has 200g of cottage cheese
  // (was 190g) and no olive oil, and dessert has ..."), at most two sentences and six changes
  const nm = x => { const f = FOODS.find(y => y.name===x); return f ? plainName(f) : String(x).toLowerCase(); };
  const phrase = t => { const m = /^(.+) (\d+)g -> (\d+)g$/.exec(t), ad = /^\+ (.+) (\d+)g$/.exec(t), rm = /^- (.+) (\d+)g$/.exec(t);
    return m ? `${m[3]}g of ${nm(m[1])} (was ${m[2]}g)` : ad ? `${ad[2]}g of ${nm(ad[1])}, new` : rm ? `no ${nm(rm[1])}` : ""; };
  const sets = new Map();
  [...groups.values()].filter(g => g.kind==="grams" || g.kind==="food").forEach(g => {
    const key = g.days.join(","), set = sets.get(key) || sets.set(key, { days:g.days, meals:new Map() }).get(key);
    const p = phrase(g.t); if(p) (set.meals.get(g.meal) || set.meals.set(g.meal, []).get(g.meal)).push(p); });
  const total = [...sets.values()].reduce((a, x) => a + [...x.meals.values()].flat().length, 0);
  // clauses that carry their own "and" join with a comma before the last one
  const andListC = a => a.length <= 2 ? a.join(", and ") : a.slice(0,-1).join(", ") + ", and " + a[a.length-1];
  if(total > 6 || sets.size > 2) client.push("Several portions changed: your plan shows the new amounts.");
  else sets.forEach(x => { const when = x.days.length === planDays ? "Every day" : `On ${andList(x.days)}`;
    client.push(`${when}, ${andListC([...x.meals.entries()].map(([meal, ps]) => `${meal.toLowerCase()} has ${andList(ps)}`))}.`); });
  const steps = [...new Set([...groups.values()].filter(g => g.kind==="steps").map(g => g.meal.toLowerCase()))];
  if(steps.length) client.push(`The ${andList(steps)} ${steps.length===1 ? "has" : "have"} updated steps.`);
  const lunchGone = extras.includes("'Build your own lunch' page removed");
  const label = x => x.startsWith("Plug-and-play") ? (PA.buildMeals || (PA.plugAndPlay !== false && !PB.buildMeals) ? "your plug-and-play lists" : `plug-and-play lists for every meal${lunchGone ? " (in place of the 'Build your own lunch' page)" : ""}`)
    : x.startsWith("Travel page") ? `a travel page${PB.travel && /:\s*(.+)$/.test(PB.travel.title||"") ? " for " + /:\s*(.+)$/.exec(PB.travel.title)[1] : ""}`
    : x.startsWith("Trades") ? "your trades" : x.startsWith("'When plans change'") ? "the 'When plans change' tips"
    : x.startsWith("'How to use it'") ? "the 'How to use it' notes" : "";
  const added = extras.filter(x => / added$/.test(x)).map(label).filter(Boolean), updated = extras.filter(x => / changed$/.test(x)).map(label).filter(Boolean);
  if(added.length) client.push(`New at the back: ${andList(added)}.`);
  if(updated.length) client.push(`Updated: ${andList(updated)}.`);
  if(coach.length) client.push("Everything else is the same.");
  return { coach, client: coach.length ? `Your updated plan is in. ${client.join(" ")}` : "No changes.", changed: coach.length > 0 };
}

// ---- the History window (2026-10-14): the selected client's saved versions, newest first. "What changed" compares a
// version with the one before it (the coach's list and a message to paste for the client); "Open" loads it into the
// editor as unsaved changes, so it can be exported, or saved to make it the current version again.
function histWhen(iso){ try{ return new Date(iso).toLocaleString(undefined, { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"2-digit" }); }catch(e){ return iso; } }
function openHistory(){
  const name = $("clientSelect").value || (state.profile && state.profile.name) || "";
  const list = (loadHist()[name] || []);
  $("historyTitle").textContent = name ? `History: ${name}` : "History";
  $("historyDiff").classList.add("hidden"); $("historyDiff").innerHTML = "";
  if(!name){ $("historyList").innerHTML = `<div class="hist-row">Pick a saved client first.</div>`; }
  else if(!list.length){ $("historyList").innerHTML = `<div class="hist-row">No versions kept yet: one is kept every time you save.</div>`; }
  else $("historyList").innerHTML = list.map((v, i) => `<div class="hist-row${i===0 ? " current" : ""}"><div class="hist-when">${esc(histWhen(v.t))}${i===0 ? " (current)" : ""}<small>${esc(v.note||"saved")}</small></div>`
      + (i < list.length-1 ? `<button class="btn btn-ghost" data-hdiff="${i}">What changed</button>` : `<span style="color:#889;font-size:12px">first kept</span>`)
      + (i > 0 ? `<button class="btn btn-ghost" data-hopen="${i}">Open</button>` : "") + `</div>`).join("");
  $("historyList").querySelectorAll("[data-hdiff]").forEach(b => b.addEventListener("click", () => showHistDiff(name, +b.dataset.hdiff)));
  $("historyList").querySelectorAll("[data-hopen]").forEach(b => b.addEventListener("click", () => openHistVersion(name, +b.dataset.hopen)));
  $("historyBackdrop").classList.remove("hidden");
}
function closeHistory(){ $("historyBackdrop").classList.add("hidden"); }
function showHistDiff(name, i){
  const list = loadHist()[name] || [], newer = list[i], older = list[i+1]; if(!newer || !older) return;
  const d = planDiff(older.rec, newer.rec);
  const box = $("historyDiff");
  box.innerHTML = `<b>${esc(histWhen(older.t))} to ${esc(histWhen(newer.t))}</b>`
    + (d.coach.length ? `<ul>${d.coach.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>No changes.</p>`)
    + (d.changed ? `<div style="display:flex;align-items:center;gap:8px;margin:.2em 0 .3em"><b>Message for the client</b><button id="histCopy" class="btn btn-ghost">Copy</button></div><div class="hist-msg" id="histMsg">${esc(d.client)}</div>` : "");
  box.classList.remove("hidden");
  const c = $("histCopy"); if(c) c.addEventListener("click", () => {
    const txt = d.client, done = () => flash(c, "Copied ✓");
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => { selectText($("histMsg")); });
    else selectText($("histMsg")); });
}
function selectText(el){ try{ const r = document.createRange(); r.selectNodeContents(el); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }catch(e){} }
function openHistVersion(name, i, ok){
  const v = (loadHist()[name] || [])[i]; if(!v) return;
  if(dirty && weekHasMeals() && ok !== true){
    uiConfirm("You have unsaved changes that will be lost. Open this version anyway?", () => openHistVersion(name, i, true), null, "Open it"); return; }
  closeHistory();
  if($("clientSelect").value !== name){ $("clientSelect").value = name; }
  state.profile = Object.assign(defaultProfile(), v.rec.profile);
  state.week = weekFromSaved(v.rec); state.dayIdx = Math.min(v.rec.dayIdx||0, state.week.length-1); state.meals = state.week[state.dayIdx].meals;
  state.restoredFrom = histWhen(v.t);
  undoBuf = null; updateUndoBtn(); writeForm(state.profile); updateMacroHint(); render();
  markDirty();
  uiAlert(`Opened the version from ${histWhen(v.t)}. Export it as it is, or press Save to make it the current version (the one it replaces stays in History).`);
}

// ---- the Change calories window (2026-10-14): preview first (each day before and after, what changes, the client's
// message), then Apply puts it on screen as unsaved changes; Save keeps it, and the version before stays in History.
let _rt = null;
function openRetarget(){
  if(!weekHasMeals()){ uiAlert("Build or load a plan first."); return; }
  _rt = null; $("rtApply").disabled = true; $("rtOut").classList.add("hidden"); $("rtOut").innerHTML = "";
  $("retargetBackdrop").classList.remove("hidden");
}
function closeRetarget(){ $("retargetBackdrop").classList.add("hidden"); }
function previewRetarget(){
  const P = readForm(), r = retargetWeek(P, state.week, { delta:+$("rtDelta").value, from:$("rtFrom").value, lock:$("rtLock").checked });
  _rt = r;
  const d = planDiff({ profile:P, week:state.week }, { profile:r.profile, week:r.week });
  const out = $("rtOut");
  out.innerHTML = (r.days.length ? `<b>Each day</b><ul>${r.days.map(x => `<li>${esc(x.name)}: ${x.before.toLocaleString("en-US")} to ${x.after.toLocaleString("en-US")} calories</li>`).join("")}</ul>` : "")
    + (r.off.length ? `<p><b>Check:</b> ${esc(r.off.join("; "))}.</p>` : "")
    + (r.notes.length ? `<p><b>Note:</b> ${esc(r.notes.join(" "))}</p>` : "")
    + `<b>What changes</b>` + (d.coach.length ? `<ul>${d.coach.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>Nothing.</p>`)
    + (d.changed ? `<div style="display:flex;align-items:center;gap:8px;margin:.2em 0 .3em"><b>Message for the client</b><button id="rtCopy" class="btn btn-ghost">Copy</button></div><div class="hist-msg" id="rtMsg">${esc(d.client)}</div>` : "");
  out.classList.remove("hidden"); $("rtApply").disabled = !d.changed;
  const c = $("rtCopy"); if(c) c.addEventListener("click", () => { const txt = d.client, done = () => flash(c, "Copied ✓");
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => selectText($("rtMsg"))); else selectText($("rtMsg")); });
}
function applyRetarget(){
  const r = _rt; if(!r) return; _rt = null;
  state.week.forEach((d, i) => { if(r.week[i]) d.meals = r.week[i].meals; });
  state.meals = state.week[state.dayIdx].meals;
  ["tCal","tCarb","tFat"].forEach(k => { state.profile[k] = r.profile[k]; if($(k)) $(k).value = r.profile[k]; });
  closeRetarget(); updateMacroHint(); render(); markDirty();
  uiAlert(`Applied: ${(+r.profile.tCal).toLocaleString("en-US")} calories a day. Press Save to keep it (the version before stays in History).`);
}

/* -------------------- in-page dialogs --------------------
   The browser's native alert / confirm / prompt boxes are silently blocked in some embedded browsers: the
   Claude preview pane answers "no" in 1ms without ever showing the box. That made "Auto-draft a plan" quietly
   do nothing whenever a plan already existed, and killed Delete / Clear day / Copy day / Import / Duplicate
   the same way. Every dialog now renders inside the page, so it works in any browser. */
let _dlgYes=null, _dlgNo=null;
function uiDialog(msg, opts){
  opts=opts||{};
  const bd=$("dialogBackdrop"); if(!bd) return;
  const hasInput = opts.input!==undefined;
  $("dialogMsg").textContent = msg;
  $("dialogInput").classList.toggle("hidden", !hasInput);
  if(hasInput) $("dialogInput").value = opts.input;
  $("dialogCancel").classList.toggle("hidden", !opts.cancel);
  $("dialogOk").textContent = opts.okText || "OK";
  _dlgYes = opts.onYes || null; _dlgNo = opts.onNo || null;
  bd.classList.remove("hidden");
  setTimeout(()=>{ if(hasInput){ $("dialogInput").focus(); $("dialogInput").select(); } else $("dialogOk").focus(); }, 0);
}
function closeDialog(yes){
  const bd=$("dialogBackdrop"); if(!bd || bd.classList.contains("hidden")) return;
  bd.classList.add("hidden");
  const y=_dlgYes, n=_dlgNo, val=$("dialogInput").value;
  _dlgYes=_dlgNo=null;                       // cleared BEFORE the callback so it can open a follow-up dialog
  if(yes){ if(y) y(val); } else if(n) n();
}
function uiAlert(msg){ uiDialog(msg, {}); }
function uiConfirm(msg, onYes, onNo, okText){ uiDialog(msg, {cancel:true, onYes, onNo, okText}); }
function uiPrompt(msg, def, onOk){ uiDialog(msg, {cancel:true, input:def||"", onYes:onOk}); }
function refreshClientSelect(sel){
  const store=loadStore(); const names=Object.keys(store).sort();
  $("clientSelect").innerHTML = `<option value="">+ New client</option>` +
    names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join("");
  if(sel) $("clientSelect").value=sel;
}
function saveCurrent(ok){
  const P=readForm(); P.name=(P.name||"").trim(); state.profile=P;
  if(!P.name){ uiAlert("Give the client a name first (top of the left panel)."); $("pName").focus(); return; }
  const store=loadStore();
  if(store[P.name] && $("clientSelect").value!==P.name && ok!==true){
    uiConfirm(`A client named "${P.name}" already exists. Overwrite it?`, ()=>saveCurrent(true), null, "Overwrite"); return; }
  store[P.name]={ profile:P, week:state.week, dayIdx:state.dayIdx };
  if(saveStore(store)){ pushHist(P.name, store[P.name], state.restoredFrom ? `saved, from the ${state.restoredFrom} version` : "saved"); state.restoredFrom = "";
    refreshClientSelect(P.name); clearDirty(); flash($("saveClientBtn"),"Saved ✓"); }
}
function weekFromSaved(c){
  if (c.week && Array.isArray(c.week) && c.week.length) {           // new format
    const w = newWeek();
    c.week.forEach((d,i)=>{ if(w[i]) w[i].meals = d.meals||[]; });
    return w;
  }
  const w = newWeek();                                              // legacy single-day client → day 1
  if (c.meals && c.meals.length) w[0].meals = c.meals;
  return w;
}
// A saved plan keeps the recipe text it was drafted with. When that text is an OLD library version of the same dish
// (fingerprints in data/retired_prep.js), the current batch recipe replaces it, so re-exporting a client drafted before
// the 2026-10-06 rewrite prints the step-by-step directions. Hand-written recipes never match and are left alone.
function upgradeRecipeText(week){
  const R = window.OB_RETIRED_PREP || {}, M = window.OB_RETIRED_METHOD || {};   // M: everyday recipes, rewritten 2026-10-06
  const djb2 = s => { let h = 5381; for(let i=0;i<s.length;i++) h = ((h<<5)+h+s.charCodeAt(i))|0; return h; };
  let n = 0;
  (week||[]).forEach(d=>(d.meals||[]).forEach(m=>{
    const c = m && m.cook; if(!c || !m.dish) return;
    const t = tplByTitle(m.dish); if(!t) return;
    if(c.prepMethod && t.prepMethod && R[djb2(String(c.prepMethod))] === m.dish){ c.prepMethod = t.prepMethod; c.makes = t.makes; n++; }
    if(c.method && t.method && !t.prepMethod && c.method !== t.method && M[djb2(String(c.method))] === m.dish){ c.method = t.method; n++; }
  }));
  return n;
}
function loadClient(name, ok){
  if(dirty && weekHasMeals() && ok!==true){
    $("clientSelect").value = state.profile.name || "";      // hold the old selection until the coach decides
    uiConfirm("You have unsaved changes that will be lost. Continue without saving?",
      ()=>{ $("clientSelect").value = name; loadClient(name, true); }, null, "Discard changes");
    return;
  }
  if(!name){ state.profile=defaultProfile(); state.week=newWeek(); state.dayIdx=0; state.meals=state.week[0].meals;
             undoBuf=null; updateUndoBtn(); writeForm(state.profile); updateMacroHint(); clearDirty(); render(); return; }
  const store=loadStore(); const c=store[name]; if(!c) return;
  state.restoredFrom = "";                                  // a version opened from History belongs to that client only
  state.profile=Object.assign(defaultProfile(), c.profile);
  state.week=weekFromSaved(c);
  upgradeRecipeText(state.week);
  state.dayIdx=Math.min(c.dayIdx||0, state.week.length-1);
  state.meals=state.week[state.dayIdx].meals;
  undoBuf=null; updateUndoBtn();
  writeForm(state.profile); updateMacroHint(); clearDirty(); render();
}
function deleteClient(ok){
  const name=$("clientSelect").value; if(!name){ return; }
  if(ok!==true){ uiConfirm(`Delete client "${name}"? This can't be undone.`, ()=>deleteClient(true), null, "Delete"); return; }
  const store=loadStore(); delete store[name]; saveStore(store);
  const k=loadKeep(); delete k[name]; saveKeep(k);         // a deliberate delete is not a loss to offer back
  refreshClientSelect(""); loadClient("", true);
}
function offerLostClients(){
  const store = loadStore(), keep = loadKeep();
  // first run: start the copy from the live list, so clients saved before the copy existed are protected too
  if(!Object.keys(keep).length){ if(Object.keys(store).length) saveKeep(store); return; }
  const lost = Object.keys(keep).filter(n => !(n in store));
  if(!lost.length) return;
  const names = lost.slice(0,6).join(", ") + (lost.length>6 ? ` and ${lost.length-6} more` : "");
  uiConfirm(`${lost.length===1 ? "1 saved client is" : lost.length+" saved clients are"} missing from this browser's client list: ${names}. A copy was kept. Restore ${lost.length===1?"it":"them"}?`,
    ()=>{ const s2=loadStore(); lost.forEach(n=>{ if(!(n in s2)) s2[n]=keep[n]; }); if(saveStore(s2)) refreshClientSelect($("clientSelect").value); },
    null, "Restore");                                    // "Cancel" keeps the copy and asks again next time
}
function flash(btn,msg){ const o=btn.textContent; btn.textContent=msg; setTimeout(()=>btn.textContent=o,1200); }

// Likes are stored lowercase so they match food names. For display, put brand and proper names back the way
// they are written ("Premier Protein", "DAVID", "Greek"), taken from the foods' own brand lists.
const PROPER_WORDS = ["Normandy","Greek","Italian","Mexican","Thai","Indian","Japanese","Korean","Chinese","French","Cajun","Parmesan","Swiss","Dijon","Caesar","Buffalo"];
let PROPER_RE = null;
function properCase(s){
  if(!PROPER_RE){
    const names = new Set(PROPER_WORDS);
    FOODS.forEach(f => String(f.brands||"").split(/,\s*/).forEach(b => { b = b.replace(/\s*\(.*\)\s*$/,"").trim(); if(/[A-Z]/.test(b) && b.length>2) names.add(b); }));
    const list = [...names].sort((a,b)=>b.length-a.length);
    PROPER_RE = { list, re: new RegExp("\\b(" + list.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|") + ")(?![\\w'])", "gi") };
  }
  return String(s).replace(PROPER_RE.re, m => PROPER_RE.list.find(x => x.toLowerCase()===m.toLowerCase()) || m);
}

/* -------------------- weekly grocery list -------------------- */
const STORE_ORDER = ["Protein","Seafood","Eggs & Dairy","Vegetables","Fruits","Grains & Starches","Legumes","Nuts & Seeds","Fats & Oils","Condiments & Misc"];
const foodByName = name => FOODS.find(f => f.name === name);
// A plan's grams are COOKED grams, because that is what the client eats and what the macros are computed
// from. The grocery list was printing those same cooked grams as the amount to BUY, which is a different
// number for anything that absorbs or loses water. A week needing 910g of cooked brown rice was telling the
// client to buy 2 lb of rice when it takes about 300g dry, and a week needing 790g of cooked 97/3 beef was
// telling them 1.7 lb when it takes about 930g raw. One sends you home with three times the rice, the other
// leaves you short of beef on day five.
//
// OB_COOK_YIELD is generated from USDA SR Legacy by data-build/build_yields.py, never typed by hand.
// Anything it has no honest number for keeps its cooked weight and says so, which is no worse than before.
function purchaseAmount(f, cookedG){
  const y = f && window.OB_COOK_YIELD && window.OB_COOK_YIELD[f.name];
  if(!y) return { grams: cookedG, form: /cooked|baked, flesh|roasted|boiled/i.test((f&&f.name)||"") ? "cooked" : "" };
  return { grams: cookedG * y.factor, form: y.buy };
}
// Shopping in Mexico (profile country "MX", a client in Cancun, 2026-10-08): the grocery list keeps the
// English name (it matches the plan's rows) and adds the name on the shelf at Costco, Chedraui or Walmart.
const MX_SHELF = [[/^sweet potato/i,"camote"],[/^beef, ground/i,"carne molida de res magra, 93/7 o 95/5"],[/^turkey, ground/i,"pavo molido"],
  [/^chicken breast/i,"pechuga de pollo"],[/^salmon/i,"salmón"],[/^tuna, light, canned in water/i,"atún en agua"],[/^tuna/i,"atún"],[/^marinara/i,"salsa para pasta"],[/^egg white/i,"claras de huevo"],[/^egg, whole/i,"huevo"],
  [/^greek yogurt/i,"yogur griego"],[/^cottage cheese/i,"queso cottage"],[/^feta/i,"queso feta"],[/^goat cheese/i,"queso de cabra"],[/^almonds/i,"almendras"],
  [/^parmesan/i,"queso parmesano"],[/^mozzarella/i,"queso mozzarella"],[/^whey protein/i,"proteína whey"],[/^oats/i,"avena"],
  [/^chia/i,"chía"],[/^pumpkin seeds/i,"pepitas de calabaza"],[/^nori/i,"alga nori"],[/^corn tortilla/i,"tortillas de maíz"],[/^flour tortilla/i,"tortillas de harina"],[/^cream of rice/i,"crema de arroz"],
  [/^rice cake/i,"galletas de arroz"],[/^whole wheat pasta/i,"pasta integral"],[/^chickpea pasta/i,"pasta de garbanzo"],
  [/^sourdough/i,"pan de masa madre"],[/^whole wheat bread/i,"pan integral"],[/^shrimp, raw/i,"camarón crudo, pelado"],[/^tilapia, raw/i,"filete de tilapia o pescado blanco"],[/^blueberries/i,"moras azules o arándanos"],[/^raspberries/i,"frambuesas"],[/^strawberries/i,"fresas"],
  [/^banana/i,"plátano"],[/^kiwifruit/i,"kiwi"],[/^grapes/i,"uvas"],[/^medjool/i,"dátiles medjool"],[/^dark chocolate/i,"chocolate amargo"],[/^avocado,/i,"aguacate"],
  [/^olive oil/i,"aceite de oliva"],[/^peanut butter/i,"crema de cacahuate"],[/^almond butter/i,"crema de almendra"],
  [/^almond milk/i,"bebida de almendra sin azúcar, con calcio"],[/^matcha/i,"té matcha"],[/^salsa$/i,"salsa roja o verde de frasco"],[/^cocoa powder/i,"cacao en polvo sin azúcar"],[/^spinach/i,"espinaca"],[/^romaine/i,"lechuga romana"],
  [/^arugula/i,"arúgula"],[/^iceberg/i,"lechuga"],[/^cucumber/i,"pepino"],[/^tomato/i,"jitomate"],[/^onion/i,"cebolla"],
  [/^zucchini/i,"calabacita"],[/^jicama/i,"jícama"],[/^green beans/i,"ejotes"],[/^broccoli/i,"brócoli"],[/^riced cauliflower/i,"arroz de coliflor"],
  [/^cauliflower/i,"coliflor"],[/^mushrooms/i,"champiñones"],[/^carrots/i,"zanahoria"],[/^asparagus/i,"espárragos"],
  [/^shirataki/i,"fideos shirataki"],[/^honey/i,"miel"],[/^maple syrup/i,"jarabe de maple"],[/^coffee/i,"café"]];
// the pantry words in Mexican Spanish (a client, 2026-10-08)
const MX_PANTRY = {"limes":"limones","lemons":"limón amarillo","garlic powder":"ajo en polvo","ground cumin":"comino molido","chili powder":"chile en polvo",
  "ground cinnamon":"canela molida","cooking spray":"aceite en aerosol","baking powder":"polvo para hornear","hot sauce":"salsa picante",
  "salt and pepper":"sal y pimienta","smoked paprika":"paprika ahumada","vanilla extract":"extracto de vainilla","mustard":"mostaza",
  "dried oregano":"orégano seco","oregano":"orégano","chili flakes":"chile quebrado","Italian seasoning":"hierbas italianas","soy sauce":"salsa de soya","sesame seeds":"ajonjolí"};
// "Tajín (Tajín)" printed on her pantry line: a word that is the same in Spanish has no entry and prints once
const esMX = w => (state.profile && state.profile.country==="MX" && MX_PANTRY[w]) ? `${w} (${MX_PANTRY[w]})` : w;
function shelfNameMX(name){
  const hit = MX_SHELF.find(([re]) => re.test(name)); if(!hit) return name;
  return String(name) + " (" + hit[1] + ")";
}
// A client who asked for kg (a client, Cancun, 2026-10-08): "2.6 lb (1190g)" prints "1.19 kg", and the US
// pack sizes ("16 oz each", "half-gallon", "15 oz") drop out because her stores sell other sizes; counts stay.
const withCelsius = s => String(s).replace(/(\d{2,3})(?:°|&deg;)F/g, (m, f) => `${Math.round((+f-32)*5/9)}°C (${f}°F)`);
const kgStr = g => g >= 1000 ? (g/1000).toFixed(2).replace(/\.?0+$/, "") + " kg" : g + "g";
// and centimetres: papaya's USDA "cup 1" pieces" printed an inch mark on her plan ("1-1/2"" is 4 cm, to the half)
const cmLabel = s => String(s).replace(/(\d+-\d+\/\d+|\d+\/\d+|\d+)"/g, (m, x) => {
  const v = x.split("-").reduce((a, p) => a + (p.includes("/") ? p.split("/")[0]/p.split("/")[1] : +p), 0);
  return String(Math.round(v*2.54*2)/2) + " cm"; });
const metricAmount = s => String(s)
  .replace(/([\d.]+) lb \((\d+)g\)/g, (m, lb, g) => kgStr(+g))
  .replace(/\s*\((?:[\d.]+ (?:fl )?oz|1 lb)(?: each)?\)/g, "")
  .replace(/\bhalf-gallon (cartons?)/g, "$1")
  .replace(/\b(\d{4,})g\b/g, (m, g) => kgStr(+g));
function shoppingAmount(f, grams){
  const g0 = grams; grams = Math.round(grams/5)*5;
  if(!f) return grams + "g";
  let extra = "";
  const ps = f.portions || [];
  // counts round UP (you cannot buy 3.2 apples) but forgive only the 5g rounding above: 7 bars at 62g is 434g,
  // which rounds to 435g and must still read 7, not 8. Anything more would leave the client short.
  // (the allowance shrinks with the piece: two 5g seaweed packs read as "1 pack" when it was a flat 5g)
  const count = (per, loose) => Math.max(1, Math.ceil((g0 - (loose ? per*0.1 : Math.min(5, per*0.1)))/per));
  const pluralUnit = (u, n) => n===1 ? u
    : /^(large|medium|small)\s+[a-z]+$/i.test(u) ? u.replace(/([a-z]+)$/i, pluralWord)       // "2 small potatoes"
    : /^(large|medium|small|each)\b/i.test(u) ? u : u.replace(/^([a-z]+)/i, pluralWord);
  // liquid egg whites are bought by the CARTON (16 oz), not as "~97 large" eggs
  if(/^(liquid )?egg whites?\b/i.test(f.name) && grams <= 70){ const n = Math.max(1, Math.round(grams/33)); return `${grams}g · ~${n} egg${n>1?"s":""} (use the white${n>1?"s":""})`; }
  if(/^(liquid )?egg whites?\b/i.test(f.name)){ const n = count(454); return `${(grams/453.6).toFixed(1)} lb (${grams}g) · ~${n} carton${n>1?"s":""} (16 oz${n>1?" each":""})`; }
  // milk, plant milk, kefir and broth are bought by the carton: "1680g · ~1 half-gallon carton", not "3.7 lb" of almond milk
  const cupL = /^(almond|soy|oat|cashew|coconut) milk\b|^milk,|^kefir\b|\bbroth\b|\bstock\b/i.test(f.name) && ps.find(p => /^1 cup\b/i.test(p.label));
  // (a week needing a quart or less buys a 32 oz carton: a client's 240g of almond milk read "~1 half-gallon carton", 2026-10-06)
  if(cupL && state.profile && state.profile.metric) return `about ${(grams/1000).toFixed(1)} litres`;
  if(state.profile && state.profile.metric && /cheese|mozzarella|feta|parmesan|cheddar|queso/i.test(f.name)) return kgStr(grams);
  if(cupL){ const half = /milk/i.test(f.name) && grams > cupL.grams*4 + 5, n = count(cupL.grams * (half ? 8 : 4));
    return `${grams}g · ~${n} ` + (half ? `half-gallon carton${n>1?"s":""}` : /kefir/i.test(f.name) ? `bottle${n>1?"s":""} (32 oz${n>1?" each":""})` : `carton${n>1?"s":""} (32 oz${n>1?" each":""})`); }
  // packaged single-serve items with a printed size are bought by the count: "7 shakes (11 fl oz each)", not
  // "5.2 lb" of shake. Without a size (a chocolate bar) the weight stays and the count rides along.
  const pack = ps.find(p => /^1 (shake|bar|bottle|pack|package|pouch|container|can)\b/i.test(p.label) && (f.brands || /^1 pack\b/i.test(p.label)));
  const packSize = pack && (pack.label.match(/\(([^)]*)\)/)||[])[1];
  if(packSize){ const n = count(pack.grams);
    return `${n} ${pluralUnit(pack.label.replace(/^1 /,"").replace(/\s*\(.*\)/,""), n)} (${packSize} each)`; }
  // whole produce counts by a normal size ("~4 medium"), never the first size USDA happens to list ("~5 extra
  // small" bananas, "~6 stalk, large" broccoli). Berries, grapes and cherries are bought by weight.
  const PIECE_U = /\b(large|medium|small|each|egg|fillet|breast|slice|clove|wedge|banana|bun|tortilla|sheet|cake)\b/i;
  // a raw potato is produce at the store (it sits in Grains & Starches for the macros): counted in its least-waste size
  const produce = f.cat==="Fruits" || f.cat==="Vegetables" || /^potato, raw\b/i.test(f.name);
  // a pineapple, melon or cabbage is bought whole: "~1 pineapple", not "~4 slices" of one (2026-09-30)
  const whole = produce && ps.find(p => /^1 (fruit|melon|head|pineapple)\b/i.test(p.label) && p.grams >= 400);
  const avo = /^avocado\b/i.test(f.name) && ps.find(p => /^1 fruit\b/i.test(p.label));
  if(avo){ const c = count(avo.grams, true); return (grams>=200 ? (Math.round(grams/45.4)/10) + " lb (" + grams + "g)" : grams + "g") + " · ~" + c + " avocado" + (c>1 ? "s" : ""); }
  if(whole){ const c = count(whole.grams), noun = /^1 head\b/i.test(whole.label) ? "head" : f.name.split(",")[0].toLowerCase().replace(/s$/,"");
    return (grams>=200 ? (Math.round(grams/45.4)/10) + " lb (" + grams + "g)" : grams + "g") + " · ~" + c + " " + (c>1 ? pluralWord(noun) : noun); }
  // berries are bought by the clamshell: 6 oz for raspberries and blackberries, 1 lb for strawberries (or frozen)
  const berry = /^(raspberries|blackberries)\b/i.test(f.name) ? [170, "container (6 oz)"] : /^strawberries\b/i.test(f.name) ? [454, "container (1 lb)"] : null;
  if(berry && grams >= 100){ const c = count(berry[0], true);
    return (grams>=200 ? (Math.round(grams/45.4)/10) + " lb (" + grams + "g)" : grams + "g") + " · ~" + c + " " + (c>1 ? berry[1].replace(/^container/, "containers") : berry[1]) + ", or frozen"; }
  // whole produce counts in the size that wastes least: three lunches of "1 large" apple (636 g) read "about 4 medium"
  const sizes = produce ? ps.filter(p => /^1 (small|medium|large)\b/i.test(p.label) && !/extra/i.test(p.label)) : [];
  const bestSize = sizes.length > 1 ? sizes.map(p => ({ p, over: count(p.grams, true)*p.grams - grams }))
    .sort((a,b) => (a.over - b.over) || (/medium/i.test(b.p.label) - /medium/i.test(a.p.label)))[0].p : null;
  const unit = pack || ((f.cat==="Protein"||f.cat==="Seafood"||/berr|grape|cherr/i.test(f.name)) ? null
    : (bestSize || (produce && ps.find(p => /^1 medium\b/i.test(p.label))) || ps.find(p => PIECE_U.test(p.label) && !/extra|stalk/i.test(p.label))));
  if(unit){ const n = grams/unit.grams; if(n>=0.7){ const c = count(unit.grams, !pack);
    // "1 large whole (3" dia)" counts the food itself: "about 2 large tomatoes", not "2 large wholes" (2026-10-06)
    const ulab = unit.label.replace(/^[\d.]+\s*/,"").replace(/\s*\(.*$/,"").replace(/, regular$/i, "").replace(/\bwhole$/i, plainName(f).split(/[ ,]/)[0]);
    extra = " · ~" + c + " " + pluralUnit(ulab, c); } }
  if(grams>=200){ return (Math.round(grams/45.4)/10) + " lb (" + grams + "g)" + extra; }
  return grams + "g" + extra;
}
// Bought in a pack or a jar and eaten as sold: the vegetable rows below are for produce, and turned a seaweed snack into
// "Seaweed snack, fresh, enough for 10g cooked" (2026-09-30).
const VEG_AS_SOLD = /seaweed snack|pickles|kimchi|sauerkraut|canned/i;
// `days` (optional): shop for just these days, e.g. the days one cook day covers. Default is the whole week.
function weeklyGrocery(days){
  const tally = {};                                    // id (or "_name") -> grams across the week
  const add = (id,g)=>{ tally[id]=(tally[id]||0)+g; };
  (days || state.week).forEach(d=>(d.meals||[]).forEach(m=>(m.items||[]).forEach(it=>{
    const f=FOOD_BY_ID[it.id]; if(!f) return;
    if(f.recipe){
      const sc = (f.batch_g||f.serving_g) ? it.grams/(f.batch_g||f.serving_g) : 1;   // ingredients are BATCH amounts
      (f.ingredients||[]).forEach(ing=>{ const gf=foodByName(ing.name); add(gf?gf.id:"_"+ing.name, ing.g*sc); });
    } else add(it.id, it.grams);
  })));
  // One row per thing you BUY. Two foods can shop as the same item once cooked weights become purchase weights
  // (a cooked-egg dish and a raw-egg dish both shop as "Egg, whole, raw"), and those used to print as two rows.
  const rows = {};
  Object.keys(tally).forEach(id=>{
    const f=FOOD_BY_ID[id], cat=f?f.cat:"Condiments & Misc";
    let name=f?f.name:id.slice(1);
    const buy = purchaseAmount(f, tally[id]);
    // the row should name what you put in the trolley: "Brown rice, dry" not "Brown rice, cooked"
    if(buy.form==="dry" || buy.form==="raw")
      name = name.replace(/,?\s*(cooked|baked, flesh|baked|roasted|boiled|grilled|broiled)\b/i, ", " + buy.form)
                 .replace(/\s*\(in water\)/i, "");   // "Oats, dry (in water)" is not a thing you can buy
    // A vegetable is ONE row whatever colour or form the recipes named: "Bell pepper, raw" beside "Bell pepper, red,
    // raw", or "Carrots, raw" beside cooked carrots, are one thing in the trolley (2026-09-30). Raw grams and cooked
    // grams with no honest raw weight are kept apart on the row.
    if(cat==="Vegetables" && !(f && VEG_AS_SOLD.test(f.name))){
      const key = cat + "|" + name.split(",")[0].toLowerCase().replace(/\b(red|green|yellow|orange)\s+/g, "").trim();
      const r = rows[key] || (rows[key] = { f, cat, name, grams:0, cooked:0, form:"", veg:true, rawG:0, rawF:null, cookG:0 });
      const noYield = buy.form==="cooked" || (!buy.form && /\b(cooked|baked|roasted|boiled|steamed)\b/i.test(f?f.name:""));
      if(noYield) r.cookG += tally[id];
      else { r.rawG += buy.grams; if(!r.rawF || name.length > r.name.length){ r.rawF = f; r.name = name; } }
      return;
    }
    const key = cat + "|" + name.toLowerCase();
    const r = rows[key] || (rows[key] = { f, cat, name, grams:0, cooked:0, form:buy.form });
    r.grams += buy.grams; r.cooked += tally[id];
  });
  const groups={};
  Object.values(rows).forEach(({f, cat, name, grams, cooked, form, veg, rawG, rawF, cookG})=>{
    const lbG = g => { g = Math.round(g/5)*5; return g>=200 ? (Math.round(g/45.4)/10) + " lb (" + g + "g)" : g + "g"; };
    if(veg){
      // a vegetable the plan counts COOKED has no honest raw weight (USDA gives no yield for most of them), so the row
      // names what you buy and how much cooked it has to make: "Broccoli, cooked, 270g" read as a thing to buy
      const FROZEN_OK = /broccoli|green beans|spinach|kale|peas|corn|cauliflower|brussels|asparagus|carrot|collard|edamame|mixed veg/i;
      const base = (rawF||f).name.split(",")[0];
      const nm = cookG>0 ? base + (FROZEN_OK.test(base) ? ", fresh or frozen" : ", fresh") : name;
      const amt = cookG>0 && rawG>0 ? shoppingAmount(rawF, rawG).replace(/^([^·]*?)(\s*·|$)/, "$1 raw$2") + ", plus enough for " + lbG(cookG) + " cooked"
                : cookG>0 ? "enough for " + lbG(cookG) + " cooked"
                : shoppingAmount(rawF||f, rawG) + (/^sweet corn/i.test(base) ? ", or the same weight of frozen kernels" : "");
      (groups[cat]=groups[cat]||[]).push({name:nm, amount:amt, brands:((rawF||f)&&(rawF||f).brands)||"", swap:""});
      return;
    }
    let amount = shoppingAmount(f, grams);
    // the rice recipes measure by the cup ("1½ cups of water per cup of rice") and the list gave grams only (a client,
    // client-eye review, 2026-11-04). USDA raw rice: about 185g a cup long-grain white, 190g brown
    if(form==="dry" && /\brice\b/i.test(name) && !/cake|noodle|paper|flour|cereal/i.test(name) && grams >= 40){
      const cups = grams/(/brown/i.test(name) ? 190 : 185); amount += ` (about ${fmtQty(cups, true)} cup${cups > 1.1 ? "s" : ""})`; }
    // beans and lentils are usually bought in cans, and a dry weight is useless at the shelf. A 15 oz can
    // drains to about 255g of cooked beans (USDA: 439g gross, 255g drained), so give both.
    if(f && f.cat==="Legumes" && form==="dry"){
      const cans = cooked/255;
      if(/lentil|split pea/i.test(f.name)){
        if(cans >= 0.4){ const nc = cans<1.4 ? 1 : Math.round(cans); amount += " · or ~" + nc + " can" + (nc>1 ? "s (15 oz each)" : " (15 oz)"); }
      } else {
        // beans and chickpeas are bought canned: "Black beans, dry, 10g" beside Bush's and Goya read as a typo
        // (2026-09-30). The row leads with the drained amount and the can, and keeps the dry weight for cooking from dry.
        name = name.replace(/,\s*dry\b/i, ", canned");
        const n = Math.round(cans);
        // no dry weight for kidney beans: raw or undercooked red kidney beans make people sick (lectin, FDA Bad Bug Book:
        // soak, then boil 10 minutes or more), and the plan has no steps for cooking them from dry (a client, 2026-11-02)
        amount = (Math.round(cooked/5)*5) + "g drained · " + (cans < 0.75 ? "part of a 15 oz can" : "~" + Math.max(1,n) + " can" + (n>1 ? "s (15 oz each)" : " (15 oz)")) + (/kidney/i.test(f.name) ? "" : ", or " + amount + " dry");
      }
    }
    // the name already carries the word for most of these; do not say "cooked" twice on one row
    if(form==="cooked" && !/cooked|baked|roasted|boiled/i.test(name)) amount += " (cooked weight)";
    // a food not every store carries says what to buy instead (from the availability audit)
    const av = f && AVAIL[f.id];
    const swap = (av && av.t==="most" && av.s) ? av.s : "";
    (groups[cat]=groups[cat]||[]).push({name, amount, brands:(f&&f.brands)||"", swap});
  });
  return Object.keys(groups)
    .sort((a,b)=>((STORE_ORDER.indexOf(a)+1||99)-(STORE_ORDER.indexOf(b)+1||99)))
    .map(cat=>({cat, items:groups[cat].sort((a,b)=>a.name.localeCompare(b.name))}));
}
// On a cook schedule the client shops before each cook, so fish and fresh produce for Thursday's cook are not
// bought on Sunday and held four days. One list per cook day, headed with what that cook makes. null = one weekly list.
function groceryByCook(){
  const S = prepSchedule(); if(!S) return null;
  return S.cooks.map(c=>{
    const days = c.days.map(di=>state.week[di]).filter(d=>d && (d.meals||[]).length);
    if(!days.length) return null;
    const range = c.days.length>1 ? `${dayLabel(c.days[0])} to ${dayLabel(c.days[c.days.length-1])}` : dayLabel(c.days[0]);
    const head = c.fresh ? `${dayLabel(c.day)}: fresh cook, no batch` : `${dayLabel(c.day)}: cook ${days.length} serving${days.length>1?"s":""} of each, for ${range}`;
    const hits = pickMealsIn(days);
    const main = { head, dishes:(days[0].meals||[]).filter(m=>m.dish && !m.open && !(m.picks||[]).length).map(dishTitle), secs:weeklyGrocery(withoutPickMeals(days)), days };
    return [main].concat(hits.map(pickGroceryEntry));
  }).filter(Boolean).flat();
}
// A meal with a pick-one card shops on a list of its own: the burger's beef, cheddar and yogurt sat merged into Saturday's
// list, so a client who picked the sushi could not tell what to leave off (reviewer, 2026-10-03). Each option prints its own
// "to buy" line under its recipe.
const pickMealsIn = days => (days||[]).flatMap(d=>(d.meals||[]).filter(m=>(m.picks||[]).length).map(m=>({d, m})));
const withoutPickMeals = days => (days||[]).map(d=>Object.assign({}, d, { meals:(d.meals||[]).filter(m=>!(m.picks||[]).length) }));
const pickGroceryEntry = ({d, m}) => ({ head:`${dayNameOf(d)} ${String(m.name||"").toLowerCase()}: ${dishTitle(m)}`, dishes:[], pick:true,
  note:`This list buys the ${dishTitle(m).toLowerCase()}. Picking one of the other options? Skip this list and buy the one printed under that option instead.`,
  secs:weeklyGrocery([{ name:d.name, meals:[m] }]) });
// The grocery list is built from the weighed foods, so what the STEPS call for and no list weighs never reached it: the
// chili's garlic, cumin and oregano, the salmon's lemon (a client, 2026-10-01). `need` is read from the steps she will
// follow; `optional` from the seasoning lines ("plenty of lime juice and cilantro at the end"), printed apart because
// she can skip them. Only what the list does not already carry.
const RECIPE_EXTRAS = [[/\blemons?\b|lemon (?:juice|wedge|zest)/i,"lemons"],[/\blimes?\b|lime (?:juice|wedge)/i,"limes"],
  [/\bgarlic\b(?!\s+powder)/i,"garlic"],[/garlic powder/i,"garlic powder"],[/onion powder/i,"onion powder"],[/\bcumin\b/i,"ground cumin"],
  [/\boregano\b/i,"dried oregano"],[/smoked paprika/i,"smoked paprika"],[/(?<!smoked )\bpaprika\b/i,"paprika"],[/chili powder/i,"chili powder"],
  [/chili flakes|red pepper flakes/i,"chili flakes"],[/\bcinnamon\b/i,"ground cinnamon"],[/slap ya mama/i,"Slap Ya Mama"],[/taj[ií]n/i,"Tajín"],[/cajun seasoning|creole seasoning/i,"Cajun seasoning"],[/monk fruit/i,"monk fruit sweetener"],[/\bnutmeg\b/i,"nutmeg"],[/\bvanilla\b(?!\s+(?:greek\s+)?(?:yogurt|protein|whey|shake|almond|milk|ice cream))/i,"vanilla extract"],
  [/\bdill\b(?!\s+pickle)/i,"dill"],[/\bcilantro\b/i,"cilantro"],[/\bscallions?\b|green onions?/i,"scallions"],[/\bcoriander\b/i,"ground coriander"],[/nonstick spray|cooking spray|spray oil/i,"cooking spray"],[/\bparsley\b/i,"parsley"],[/\bbasil\b/i,"basil"],[/bay lea(?:f|ves)/i,"bay leaves"],
  [/italian seasoning/i,"Italian seasoning"],[/cider vinegar/i,"cider vinegar"],[/ground cloves/i,"ground cloves"],
  // a poke bowl's "pickled ginger and a little wasabi" printed as "ginger" (fresh root) and no wasabi (a client, 2026-10-14)
  [/pickled ginger|sushi ginger/i,"pickled ginger"],[/(?<!pickled\s)\bginger\b/i,"ginger"],[/\bwasabi\b/i,"wasabi"],[/rice vinegar/i,"rice vinegar"],[/\bbroth\b/i,"broth"],[/\bhoney\b/i,"honey"],
  // the pantry the 2026-10-06 recipes call for: the line knew 30 items and the steps use over 60, so a client shopping from
  // it came home without the soy sauce, chipotle or baking powder (10 to 12 of 20 to 25 items on the sample plans)
  [/soy sauce/i,"soy sauce"],[/\btamari\b/i,"tamari"],[/fish sauce/i,"fish sauce"],[/worcestershire/i,"Worcestershire sauce"],
  [/gochujang/i,"gochujang"],[/\bmiso\b/i,"miso paste"],[/chipotle/i,"chipotle in adobo"],[/tomato paste/i,"tomato paste"],
  [/baking powder/i,"baking powder"],[/baking soda/i,"baking soda"],[/cornflour|corn ?starch|potato starch/i,"cornstarch (or potato starch)"],
  [/\bcocoa\b/i,"cocoa powder"],[/instant coffee|espresso powder/i,"instant coffee"],[/\bthyme\b/i,"dried thyme"],[/\brosemary\b/i,"rosemary"],
  [/\bsage\b/i,"sage"],[/cayenne(?! pepper sauce)/i,"cayenne"],[/turmeric/i,"ground turmeric"],[/curry powder/i,"curry powder"],
  [/garam masala/i,"garam masala"],[/za.?atar/i,"za'atar"],[/\bsumac\b/i,"sumac"],[/cardamom/i,"ground cardamom"],[/allspice/i,"allspice"],
  [/pumpkin pie spice/i,"pumpkin pie spice"],[/everything bagel/i,"everything bagel seasoning"],[/sesame seeds?/i,"sesame seeds"],
  [/sriracha/i,"sriracha"],[/hot sauce/i,"hot sauce"],[/\bmustard\b(?!\s+seeds?)/i,"mustard"],[/mustard seeds?/i,"mustard seeds"],
  [/maple syrup|\bmaple\b/i,"maple syrup"],[/red wine vinegar/i,"red wine vinegar"],[/balsamic/i,"balsamic vinegar"],
  [/(?<!(?:rice|cider|wine|balsamic|white)\s)\bvinegar\b/i,"vinegar"],[/white vinegar/i,"white vinegar"],[/lemongrass/i,"lemongrass"],
  [/jalape(?:n|ñ)os?/i,"jalapeno"],[/\bcapers\b/i,"capers"],[/cumin seeds?/i,"cumin seeds"],[/fennel seeds?/i,"fennel seeds"],
  [/liquid smoke/i,"liquid smoke"],[/black salt|kala namak/i,"black salt (kala namak)"],[/\bmint\b/i,"mint"],[/ketchup/i,"ketchup"],
  [/nutritional yeast/i,"nutritional yeast"],[/\bsalt\b|\bpepper\b(?!s)/i,"salt and pepper"]];
function recipeExtras(days){
  const ds = days || state.week;
  // a library recipe on the list is shopped by its ingredients (the grocery list expands it), and its own steps call for
  // pantry items that no list weighs: the tofu mousse's vanilla never reached the shopping list (a client, 2026-10-14)
  const recipeFoods = [...new Set(ds.flatMap(d=>(d.meals||[]).flatMap(m=>(m.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(f=>f && f.recipe))))];
  const listed = ds.flatMap(d=>(d.meals||[]).flatMap(m=>(m.items||[]).map(it=>{ const f=FOOD_BY_ID[it.id]; return f ? f.name.toLowerCase() : ""; })))
    .concat(recipeFoods.flatMap(f=>(f.ingredients||[]).map(i=>String(i.name||"").toLowerCase())));
  const steps = ds.flatMap(d=>(d.meals||[]).map(m=>{ const c=m.cook||{};
    return [planSteps(c.method, m), state.profile && state.profile.prep ? planSteps(c.prepMethod, m) : ""].filter(Boolean).join(" "); })).join(" ")
    + " " + recipeFoods.map(f=>(f.steps||[]).join(" ")).join(" ");
  const season = ds.flatMap(d=>(d.meals||[]).map(m=>cleanSeason(planText(seasonText(m.cook, m), m)) || "")).join(" ");
  const pick = (text, skip) => { const out = [];
    RECIPE_EXTRAS.forEach(([re, label])=>{
      if(!re.test(text) || out.includes(label) || skip.includes(label)) return;
      const word = label.replace(/^(ground|dried)\s+/, "").replace(/s$/, "");      // "garlic powder", not "powder" (whey)
      if(label!=="salt and pepper" && listed.some(n=>n.includes(word))) return;     // already a weighed food on the list
      out.push(label);
    });
    return out; };
  const need = pick(steps, []);
  // a counted onion in the steps ("plus 1 onion and 3 garlic cloves for the base", "1 small onion (diced)") is on no list: the
  // weighed onions are only the ones the plates carry, and the pantry line had no onion at all, so a client cooking the chili
  // and the egg roll bowl came home one onion short each cook day (a client, 2026-10-16)
  // Counted per cook, not per day eaten: a batch recipe is cooked once for its whole run (the first count printed "7 onions" for
  // a chili eaten 3 days and an egg roll bowl eaten 4); an everyday recipe is cooked each day it is eaten.
  let onions = 0; const cooked = new Set(), S = prepSchedule();
  ds.forEach(d => (d.meals||[]).forEach(m => { const c = m.cook || {};
    const batch = !!(state.profile && state.profile.prep && c.prepMethod && !m.fresh);
    if(batch){ const ck = prepCookOfDay(S, prepDayOfMeal(m)), key = (m.dish||"") + "|" + (ck ? ck.day : "week"); if(cooked.has(key)) return; cooked.add(key); }
    String((batch ? planSteps(c.prepMethod, m) : planSteps(c.method, m)) || "").replace(/\b(\d+(?:\.\d+)?|½|one|an?|two|half an?)\s+(?:small |medium |large |yellow |red |white |sweet )?onions?\b(?!\s+powder)/gi,
      (x, q) => { const v = amtValue(q); if(v > 0) onions += v; return x; }); }));
  if(onions > 0){ const n = Math.ceil(onions); need.unshift(n === 1 ? "1 onion" : `${n} onions`); }
  return { need, optional: pick(season, need) };
}
// the printed line under the grocery list: what the steps call for, then what the seasoning lines suggest
function recipeExtrasLine(days){
  const ex = recipeExtras(days), out = [];
  const es = esMX;
  if(ex.need.length) out.push(`<b>Also for the recipes, not weighed:</b> ${esc(ex.need.map(es).join(", "))}.`);
  if(ex.optional.length) out.push(`<b>For the seasoning, if you like:</b> ${esc(ex.optional.map(es).join(", "))}.`);
  return out.length ? `<p class="pr-tight">${out.join(" ")}</p>` : "";
}
// The store-swap notes are written for the coach, with the numbers that justify them ("nonfat plain Greek yogurt (59 kcal,
// 10.2 g protein vs 63 kcal, 11 g per 100 g)"). The client gets the swap and any amount change, without the data dump.
const clientSwap = s => String(s||"")
  .replace(/:\s*[^:,]*\d[^,]*,\s*so about/i, ": use about")                              // "tempeh has 20.3 g ... vs 10.6, so about 2x"
  .replace(/:\s*(?=[^:]*\bkcal\b)[^]*$/i, "")                                            // a tail that is only a macro comparison
  .replace(/\(([^;)]*);[^)]*\d[^)]*\)/g, "($1)")                                          // "(use less; miso is ... 199 kcal/100 g)"
  .replace(/\s*\((?=[^)]*\d)(?=[^)]*(kcal|g protein|\/100 ?g|per 100 ?g|g fat|\bvs\b))[^)]*\)/gi, "")
  .replace(/\s*\(everywhere\)/gi, "").replace(/\s+([,;.:])/g, "$1").trim();
function groceryAsText(){
  const days = state.week.filter(d=>d.meals.length).length;
  let L = [`GROCERY LIST, week (${days} day${days!==1?"s":""}), OB Health Coaching`, ""];
  const put = secs => secs.forEach(sec=>{
    L.push(sec.cat.toUpperCase());
    sec.items.forEach(it=>L.push(`☐ ${it.name}, ${it.amount}${it.brands?`  (e.g. ${it.brands})`:""}${it.swap?`  [if you can't find it: ${clientSwap(it.swap)}]`:""}`));
    L.push("");
  });
  const byCook = groceryByCook();
  if(byCook) byCook.forEach(c=>{ L.push("=== " + c.head.toUpperCase() + " ==="); if(c.dishes.length) L.push(c.dishes.join(", ")); if(c.note) L.push(c.note); L.push(""); put(c.secs); });
  else { put(weeklyGrocery(withoutPickMeals(state.week)));
    pickMealsIn(state.week).map(pickGroceryEntry).forEach(c=>{ L.push("=== " + c.head.toUpperCase() + " ===", c.note, ""); put(c.secs); }); }
  const ex = recipeExtras();
  if(ex.need.length) L.push("ALSO FOR THE RECIPES (not weighed)", ex.need.join(", "));
  if(ex.optional.length) L.push("FOR THE SEASONING, IF YOU LIKE", ex.optional.join(", "));
  return L.join("\n");
}

// One water number per plan. "How to use it" said "around 2 to 3 litres" while the fibre section said 74 to 147 oz from OB's
// own rule (half an ounce to an ounce per pound), in the same PDF (2026-09-30). Both read this.
function waterRange(P){
  const W = window.OB_FIBER_WATER, lb = +(P && P.weightLb) || 0;
  if(!W || !lb) return (P && P.sex==="male") ? "around 3 to 4 litres" : "around 2 to 3 litres";
  const lo = Math.round(lb*W.ozPerLbMin), hi = Math.round(lb*W.ozPerLbMax);
  if(P.noTotals) return P.metric ? `about ${(Math.round((lo+hi)/2*0.0296*2)/2).toFixed(1)} litres` : `about ${Math.round((lo+hi)/2/10)*10} oz`;
  if(P.metric) return `${(lo*0.0296).toFixed(1)} to ${(hi*0.0296).toFixed(1)} litres`;
  return `${lo} to ${hi} oz (${(lo*0.0296).toFixed(1)} to ${(hi*0.0296).toFixed(1)} litres)`;
}
/* -------------------- personalization + research (client-facing) -------------------- */
// An OPEN meal ({open:{kcal, protein}}, no foods) is a slot the client fills herself: a client's Saturday dinner out
// (2026-10-02, OB: the earlier meals carry the protein and fibre so she has room for it). It prints a budget instead of
// a table, and a day that holds one is not a full day, so it stays out of the weekly averages and the vitamin table.
const hasOpenMeal = d => (d.meals||[]).some(m=>m.open);
function openMealLine(m){
  const o = m.open || {};
  // `fallback`: what to eat when the open night is a work night (a client works some Saturday nights, 2026-10-02)
  return `Eat out and enjoy it. Keep it to about ${o.kcal} calories with at least ${o.protein}g of protein: build it around steak, chicken or fish, add a vegetable, and have one starch. Log it like any other meal.${o.fallback ? " " + o.fallback : ""}`;
}
function avgDayTotals(withSupp){
  const filled = state.week.filter(d=>d.meals.length), full = filled.filter(d=>!hasOpenMeal(d));
  const days = full.length ? full : filled;
  if(!days.length) return withSupp===false ? mealsTotals(state.meals, false) : totals();
  const sum={}; SUM_KEYS.forEach(k=>sum[k]=0);
  days.forEach(d=>{ const t=mealsTotals(d.meals, withSupp!==false); SUM_KEYS.forEach(k=>sum[k]+=t[k]); });
  SUM_KEYS.forEach(k=>sum[k]/=days.length);
  return sum;
}
// Morton 2018 (PMID 28698222): no further gains past 1.62 g/kg/day. The line says the target "sits where it should", which
// holds near the plateau, not at 2.2 g/kg (a client, 2026-10-08): above 1.8 the Longland line carries it.
const mortonFits = P => { const kg = (+(P && P.weightLb)||0)/2.2046; if(!kg) return false; const r = (+P.tPro||0)/kg; return r >= 1.4 && r <= 1.8; };
const SCIENCE = [
  {notFor:"gain", h:"Protein keeps your muscle.", c:"Wycherley et al., <i>Am J Clin Nutr</i> 2012, 24 trials and 1,063 adults on reduced-calorie diets for about 12 weeks: the higher-protein diets lost <b>more fat and kept more lean mass</b> than standard-protein ones.", doi:"10.3945/ajcn.112.044321"},
  // Longland's 40 young men are not the evidence for a woman's plan (a 46-year-old client's review, 2026-10-09): men only
  {notFor:"gain", when:P=>P.sex!=="female", h:"Protein is set high.", c:"Longland et al., <i>Am J Clin Nutr</i> 2016, 40 young men in a 4-week calorie deficit with hard training: a higher-protein diet produced <b>more lean-mass gain and more fat loss</b> than lower protein.", doi:"10.3945/ajcn.115.119339"},
  {when:mortonFits, h:"No higher than it needs to be.", c:"Morton et al., <i>Br J Sports Med</i> 2018, meta-analysis of 49 trials; muscle gains plateau beyond <b>~1.6 g protein/kg/day</b>, so your target sits where it should.", doi:"10.1136/bjsports-2017-097608"},
  // Volume mode's evidence (PubMed 17556681, read 2026-10-09): the RF+FV group ate a greater weight of food (P = 0.025),
  // reported less hunger (P = 0.003) and lost 7.9 vs 6.4 kg in a year (completers). Prints for a volume-eating plan
  // (a client, "she has a big appetite", OB 2026-10-09).
  {when:P=>!!P.volume, h:"Volume keeps you full.", c:"Ello-Martin et al., <i>Am J Clin Nutr</i> 2007, a year-long trial in 97 women with obesity: those told to cut fat and add fruit and vegetables ate a <b>greater weight of food</b>, reported <b>less hunger</b> and lost more weight (7.9 vs 6.4 kg) than those told only to cut fat.", doi:"10.1093/ajcn/85.6.1465"},
  // a no-totals client (no numbers to chase, a client) reads the finding without the grams a day
  {h:"Fiber is set high.", c:P=>"Reynolds et al., <i>The Lancet</i> 2019, 185 studies and 58 trials: the people eating the most fiber had <b>15-30% lower</b> all-cause and heart-disease death than those eating the least" + (P.noTotals ? "." : ", and the biggest drop in risk came from <b>25 to 29 g a day</b> upward."), doi:"10.1016/S0140-6736(18)31809-9"},
  // Was "Hidayat 2017, marine omega-3 had measurable cardiovascular effects": that paper (PMID 29284786) measured resting
  // heart rate, a 2 bpm drop, so the line overstated it and the reference list mistitled it (a client audit,
  // 2026-10-01). Hu, Hu & Manson 2019 (PMID 31567003) is the outcome evidence, and it only prints with fish oil on the plan.
  // A meat-free plan lists ALGAE omega-3 (suppLabel), so its heading names that and says what the trials used (a client
  // a client's vegetarian plan read "Why fish oil is on the list." under "Algae omega-3 (EPA+DHA)", 2026-10-06).
  {when:P=>!!(P.supplements && P.supplements.fishoil), h:P=>MEATFREE_DIET(P.diet) ? "Why algae omega-3 is on the list." : "Why fish oil is on the list.", c:P=>"Hu et al., <i>J Am Heart Assoc</i> 2019, 13 randomized trials and 127,477 people: marine omega-3 supplements lowered the risk of <b>heart attack and of dying from heart disease by about 8%</b>."+(MEATFREE_DIET(P.diet) ? " The trials used fish-derived omega-3; algae oil supplies the same EPA and DHA." : ""), doi:"10.1161/JAHA.119.013543"},
];
// Formal reference list printed at the BOTTOM of every plan, dynamic to the modes used.
const REFS = [
  {tags:["always"], notFor:"gain", txt:"Wycherley TP, et al. Effects of energy-restricted high-protein, low-fat compared with standard-protein, low-fat diets: a meta-analysis of randomized controlled trials. Am J Clin Nutr. 2012;96(6):1281-1298.", doi:"10.3945/ajcn.112.044321"},
  {tags:["always"], notFor:"gain", notSex:"female", txt:"Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss: a randomized trial. Am J Clin Nutr. 2016;103(3):738-746.", doi:"10.3945/ajcn.115.119339"},
  {tags:["morton"], txt:"Morton RW, et al. Protein supplementation & resistance training: a meta-analysis. Br J Sports Med. 2018;52(6):376-384.", doi:"10.1136/bjsports-2017-097608"},
  {tags:["volume"], txt:"Ello-Martin JA, et al. Dietary energy density in the treatment of obesity: a year-long trial comparing 2 weight-loss diets. Am J Clin Nutr. 2007;85(6):1465-1477.", doi:"10.1093/ajcn/85.6.1465"},
  {tags:["always"], txt:"Reynolds A, et al. Carbohydrate quality and human health: a series of systematic reviews and meta-analyses. Lancet. 2019;393(10170):434-445.", doi:"10.1016/S0140-6736(18)31809-9"},
  {tags:["fishoil"], txt:"Hu Y, Hu FB, Manson JE. Marine omega-3 supplementation and cardiovascular disease: an updated meta-analysis of 13 randomized controlled trials involving 127 477 participants. J Am Heart Assoc. 2019;8(19):e013543.", doi:"10.1161/JAHA.119.013543"},
  // tagged "plants" too: the fibre page quotes it on every plan with the plant count (client review, 2026-10-10; PubMed
  // PMID 29795809, read 2026-10-10)
  {tags:["gut","plants"], txt:"McDonald D, et al. American Gut: an open platform for citizen-science microbiome research. mSystems. 2018;3(3):e00031-18.", doi:"10.1128/mSystems.00031-18"},
  {tags:["gut"], txt:"Wastyk HC, Sonnenburg ED, et al. Gut-microbiota-targeted diets modulate human immune status. Cell. 2021;184(16):4137-4153.", doi:"10.1016/j.cell.2021.06.019"},
  {tags:["gut"], txt:"Chassaing B, et al. Dietary emulsifiers impact the gut microbiota promoting colitis. Nature. 2015;519(7541):92-96.", doi:"10.1038/nature14232"},
  {tags:["banking"], txt:"Byrne NM, et al. Intermittent energy restriction improves weight-loss efficiency (MATADOR). Int J Obes. 2018;42(2):129-138.", doi:"10.1038/ijo.2017.206"},
];
function planReferences(P){
  return REFS.filter(r => r.notFor!==P.goal && r.notSex!==P.sex).filter(r => r.tags.includes("always") || (P.gut && r.tags.includes("gut")) || (P.banking && r.tags.includes("banking")) || (P.volume && r.tags.includes("volume")) || (!P.gramsOnly && r.tags.includes("plants"))
    || (P.supplements && P.supplements.fishoil && r.tags.includes("fishoil")) || (mortonFits(P) && r.tags.includes("morton")));
}

/* -------------------- export / print -------------------- */
// The client logs in their own app, so "the plan is exact" only helps if what they log reads the same.
// Measured across 400 days, 47.8% of an average day's calories come from COOKED-weight foods, and the three
// biggest single contributors (quinoa, white rice, whole eggs) are all cooked. Cooked quinoa is 120 kcal per
// 100g and dry quinoa is 368, so a client who picks the dry entry triples those calories without doing
// anything else wrong. Written guidance depends on them reading it. A number they can compare against their
// screen does not. This returns the client's own highest-calorie foods with the per-100g figure their app
// entry should show, and, where a cooked food has a raw or dry twin, the figure that means the wrong entry.
function loggingCheckRows(week, limit){
  const tally = {}; let all = 0;
  (week||[]).forEach(d=>(d.meals||[]).forEach(m=>(m.items||[]).forEach(it=>{
    const f = FOOD_BY_ID[it.id]; if(!f) return;
    all += (f.kcal||0)*it.grams/100;                 // the share is of every calorie in the plan
    if(f.recipe || (f.kcal||0) < 40) return;
    tally[f.id] = (tally[f.id]||0) + (f.kcal||0)*it.grams/100;
  })));
  const total = all || 1;
  return Object.keys(tally)
    .map(id=>({ f:FOOD_BY_ID[id], share: tally[id]/total }))
    .sort((a,b)=>b.share-a.share)
    .slice(0, limit||8)
    .map(({f, share})=>{
      const y = window.OB_COOK_YIELD && window.OB_COOK_YIELD[f.name];
      // the raw/dry twin's density: same food, same calories, different water. Only worth printing when the
      // two entries differ enough that a client could not mistake one for the other on sight.
      const wrong = (y && Math.abs(1 - y.factor) > 0.15) ? Math.round((f.kcal||0) / y.factor) : null;
      // a packaged item is logged by the bottle or bar, so show what ONE serving should read (a Premier shake at
      // "47 cal per 100g" is true and useless to someone scanning a bottle)
      const u = (f.portions||[])[0];
      const perServing = (f.brands && u && /^1 (shake|bar|bottle|pack|pouch|container|can)\b/i.test(u.label))
        ? { label: u.label.replace(/^1 /,""), kcal: Math.round((f.kcal||0)*u.grams/100) } : null;
      return { name: f.name, kcal: Math.round(f.kcal||0), wrong, wrongForm: y ? y.buy : "", share, perServing };
    });
}
// OB is US-based and so are his clients: the PDF printed "Fiber" in one place and "fibre", "litres" and "savoury" in others
const usSpelling = h => String(h).replace(/\b([Ff])ibre(s?)\b/g, "$1iber$2").replace(/\blitre(s?)\b/g, "liter$1")
  .replace(/\bsavoury\b/g, "savory").replace(/\b([Ff])lavour(s|ful|ed)?\b/g, "$1lavor$2").replace(/\bcolour(s?)\b/g, "color$1")
  .replace(/\bfavourite(s?)\b/g, "favorite$1").replace(/\bcentre\b/g, "center").replace(/\byoghurt\b/g, "yogurt")
  .replace(/\b([1-5]\d\d) ?F\b/g, "$1°F");
function buildPrint(ok){
  if(!weekHasMeals()){ uiAlert("Build at least one day first."); return; }
  const P=readForm(); state.profile=P;
  // soft scope gate: flagged health screens are outside general-wellness scope (coach can override)
  if(flaggedScreens().length && ok!==true){ uiConfirm("This client has a health flag that's outside general-wellness coaching scope (route to physician/RD). Export the plan anyway?", ()=>buildPrint(true), null, "Export anyway"); return; }
  const t=avgDayTotals();
  const dateStr = new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  // a plan can name its own coach (a client's comes from a client, 2026-10-10); otherwise the coach saved on this browser
  const coach = (P.coachName||"").trim() || (localStorage.getItem("ob_coach")||"").trim();
  const filledDays = state.week.filter(d=>d.meals.length);
  const nDays = filledDays.length;
  const aaPdf = aminoBreakdown([].concat(...filledDays.map(d=>d.meals)));   // week-level protein quality
  // the logging guide's examples come from this plan: it said "spinach, peppers, fruit, nuts, oats" to a client with no
  // spinach or oats, whose peppers were cooked (a client, 2026-10-01). Generic words only when the plan has too few.
  const logEx = (()=>{
    const kc = {}; filledDays.forEach(d=>d.meals.forEach(m=>(m.items||[]).forEach(it=>{ const f=FOOD_BY_ID[it.id];
      if(f && !f.recipe) kc[f.id] = (kc[f.id]||0) + (f.kcal||0)*it.grams/100; })));
    const byKcal = Object.keys(kc).sort((a,b)=>kc[b]-kc[a]).map(id=>FOOD_BY_ID[id]);
    const pick = (re, skip=[]) => [...new Set(byKcal.filter(f=>re.test(f.name)).map(plainName))].filter(x=>!skip.includes(x)).slice(0, 5);
    // a name already in the cooked list is not a raw example too: a client's plan read "beef" in both (top round
    // cooked, burger beef raw), 2026-10-02
    const cooked = pick(/\b(cooked|baked|grilled|roasted|boiled|broiled|steamed)\b/i), raw = pick(/\braw\b/i, cooked);
    const meat = byKcal.find(f=>(f.cat==="Protein"||f.cat==="Seafood") && /\bcooked\b/i.test(f.name) && !isProteinPowder(f));
    return { none: !cooked.length, cooked: cooked.length>=2 ? cooked.join(", ") : "chicken breast, rice, beans, pasta, potato",
             raw: raw.length>=2 ? raw.join(", ") : "spinach, peppers, fruit, nuts, oats",
             search: byKcal.some(f=>/^chicken breast, cooked/i.test(f.name)) ? "chicken breast" : meat ? plainName(meat) : "chicken breast" };
  })();

  // Consecutive days with IDENTICAL meals print once ("Sunday to Tuesday"). A cook-twice plan otherwise printed the
  // same two menus seven times: 36 pages with a half-empty page per day. Only truly identical, adjacent days merge.
  const daySig = d => JSON.stringify((d.meals||[]).map(m=>[m.name, m.dish||"", (m.items||[]).map(it=>[it.id, Math.round(it.grams)])]));
  const dayGroups = [];
  filledDays.forEach(d=>{
    const g = dayGroups[dayGroups.length-1], last = g && g.days[g.days.length-1];
    if(g && state.week.indexOf(d)===state.week.indexOf(last)+1 && g.sig===daySig(d)) g.days.push(d);
    else dayGroups.push({ sig:daySig(d), days:[d] });
  });
  // One meal's table and cooking notes. `o.head` replaces the meal name in the heading; `o.pick` marks an option on a
  // pick-one card, cooked fresh the day it is eaten, so it carries no container, batch or storage lines, and it lists the
  // seasonings its steps call for (they are not on the grocery list, which buys the meal as printed). The heading and the
  // table are one block that never splits across pages (.pr-keep); `o.lead` is printed at the top of that block.
  let thermoSaid = false;
  const tempLine = s => { let x = P.metric ? withCelsius(s) : s;
    if(/Use a food thermometer to be sure\./.test(x)){ if(thermoSaid) x = x.replace(/\s*Use a food thermometer to be sure\./, ""); thermoSaid = true; }
    return x; };
  const mealBlock = (m, o={}) => {
    const mm=mealMacros(m); let rows="";
    m.items.forEach(it=>{
      const f=FOOD_BY_ID[it.id]; if(!f) return; const r=it.grams/100;
      // it.amountLabel (a client builder's own words for the amount, 2026-10-22): a client's tofu is a twin pack of 212 g
      // blocks, and the standard measure printed "½ package (14 oz) (212g)" beside steps that say "one block"
      const amt = it.amountLabel ? `${esc(it.amountLabel)} (${Math.round(it.grams)}g)` : bestPortion(f,it.grams);
      rows+= P.gramsOnly ? `<tr><td>${esc(f.name)}</td><td class="a">${amt}</td></tr>`
        : `<tr><td>${esc(f.name)}</td><td class="a">${amt}</td><td class="n">${Math.round(f.kcal*r)}</td><td class="n">${Math.round(f.protein_g*r)}g</td><td class="n">${Math.round(f.carb_g*r)}g</td><td class="n">${Math.round(f.fat_g*r)}g</td></tr>`;
      if(f.recipe){
        // a meal made earlier in the week (cook.madeOn, the day it was made) points back to that day's recipe instead of
        // printing it again: a client's second-half mousse on Tuesday read like a second batch to make (2026-10-14)
        const made = m.cook && m.cook.madeOn;
        if(made) rows+=`<tr class="pr-recipe-row"><td colspan="${P.gramsOnly?2:6}"><b>Made on ${esc(made)}:</b> the recipe is on ${esc(made)}'s page.</td></tr>`;
        else {
          const ings=(f.ingredients||[]).map(recipeIng).join("; ");
          const steps=(f.steps||[]).length ? `<ol class="steps">${f.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>` : "";
          rows+=`<tr class="pr-recipe-row"><td colspan="${P.gramsOnly?2:6}"><b>Recipe${f.makes>1?" (makes "+f.makes+")":""}:</b> ${ings}${steps?`<div class="pr-steps">${steps}</div>`:""}</td></tr>`;
        }
      }
    });
    let cook="";
    const prepN = o.pick ? "" : mealPrepNote(m);
    const shakeN = m.shakeNote && (m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && isProteinPowder(f); }) ? m.shakeNote : "";
    const fibreN = m.fiberNote && (m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && /psyllium/i.test(f.name); }) ? m.fiberNote : "";
    const extraN = o.pick ? (()=>{ const ex = recipeExtras([{meals:[m]}]); return ex.need.length ? `Also for this one, not weighed: ${ex.need.map(esMX).join(", ")}.` : ""; })() : "";
    // the table is in eating weights (205 g of grilled sirloin), and buying that much raw leaves the swap ~17 g of protein
    // short (reviewer, 2026-10-03): the option's shopping list, in the weights you buy
    // in the client's own units and shelf names, like the weekly list (a metric trade printed "0.3 lb (150g), about 1 carton (16 oz)")
    const buyN = o.pick ? weeklyGrocery([{meals:[m]}]).flatMap(sec=>sec.items.map(it=>`${P.country==="MX" ? shelfNameMX(it.name) : it.name}, ${String(P.metric ? metricAmount(it.amount) : it.amount).replace(/ · ~/g, ", about ").replace(/ · /g, ", ")}`)).join("; ") : "";
    if((m.cook && (m.cook.method||m.cook.oil||m.cook.season)) || shakeN || prepN || fibreN){
      const seas=cleanSeason(planText(seasonText(m.cook, m), m));
      const temp=cookTemp(m);
      const ck=m.cook||{};
      const batch = !o.pick && P.prep && ck.prepMethod;
      // a batch dish already printed earlier in the week: point back to it and keep only how to eat this container
      // (once-a-week prep printed 9 dishes as 21 full recipes, 2026-10-06)
      const again = batch && o.batchRef;
      const pack = (P.prep && !o.pick && !again) ? prepPackHTML(m) : "";
      const reheatStep = again ? (splitSteps(planSteps(ck.prepMethod, m, prepBatchCount(m.dish, m))).map(stripStepNo).find(x=>/^(reheat|to eat)\b/i.test(x)) || "") : "";
      const cookLine = again ? `<div><b>From the ${esc(o.batchRef.cook)} batch:</b> the full recipe is under ${esc(o.batchRef.where)}.${reheatStep ? " "+esc(reheatStep) : ""}</div>`
                     : batch ? `<div><b>Batch recipe${batchLabel(m, ck.makes)}:</b> ${stepList(planSteps(ck.prepMethod, m, prepBatchCount(m.dish, m)))}</div>`
                             : (ck.method?`<div><b>How to make it:</b> ${stepList(planSteps(ck.method, m))}</div>`:"");
      const finishN = finishingTip(m, ck);
      const mmN = stepsMismatchLine(m, ck);
      const leN = listExtrasLine(m, ck);
      // every recipe's own list of what its steps call for and no row weighs (broth, tomato paste, chipotle, spices, an onion
      // counted in the steps): it reached only the grocery list's last line, so a client shopping meal by meal from the cards
      // missed it. a client, 2026-11-02: "I tend to look through the lines and always forget to get stock, tomato paste,
      // and the chipotle things ... It's in the directions but not ingredient list". A pick card keeps its own line below.
      const alsoEx = (!o.pick && !again) ? recipeExtras([{meals:[m]}]).need : [];
      const alsoN = alsoEx.length ? `<div><b>Also in this recipe, not weighed:</b> ${esc(alsoEx.map(esMX).join(", "))}.</div>` : "";
      cook=`<div class="pr-cook">${alsoN}${cookLine}${mmN&&!again?`<div>${esc(mmN)}</div>`:""}${leN&&!again?`<div>${esc(leN)}</div>`:""}${buyN?`<div><b>To buy for this one:</b> ${esc(buyN)}.</div>`:""}${extraN?`<div>${esc(extraN)}</div>`:""}${(()=>{ const o2 = (ck.oil && !batch) ? oilLine(ck.oil, m) : ""; return o2 ? `<div><b>Oil:</b> ${esc(o2)}</div>` : ""; })()}${pack?`<div>${pack}</div>`:""}${shakeN?`<div><b>Protein shake:</b> ${esc(m.shakeNote)}</div>`:""}${fibreN?`<div>${esc(fibreN)}</div>`:""}${prepN?`<div><b>Storage:</b> ${prepN}</div>`:""}${temp&&!again?`<div><b>Safe temp:</b> ${tempLine(temp)}</div>`:""}${seas?`<div><b>Seasoning:</b> ${esc(seas)}</div>`:""}${finishN?`<div><b>To finish:</b> ${esc(finishN)}</div>`:""}</div>`;
    }
    return `<div class="pr-meal${o.pick?" pr-pick":""}"><div class="pr-keep">${o.lead||""}<div class="pr-mealhead"><h4>${esc(o.head||m.name)}</h4>${m.dish?`<span class="pr-dish">${esc(dishTitle(m))}</span>`:""}</div>
        <table class="pr-tbl${P.gramsOnly?" pr-grams":""}"><thead><tr><th>Food</th><th class="a">Amount</th>${P.gramsOnly?"":`<th class="n">Cal</th><th class="n">Protein</th><th class="n">Carbs</th><th class="n">Fat</th>`}</tr></thead><tbody>${rows}
        ${P.gramsOnly?"":`<tr class="pr-tot"><td>Total</td><td class="a"></td><td class="n">${Math.round(mm.kcal)}</td><td class="n">${Math.round(mm.protein_g)}g</td><td class="n">${Math.round(mm.carb_g)}g</td><td class="n">${Math.round(mm.fat_g)}g</td></tr>`}</tbody></table></div>${cook}</div>`;
  };
  // A PICK-ONE CARD ({picks:[...]} on a meal): the meal as printed is the default and the one the day's totals and the
  // grocery list count; each pick is another dish built to the same calories and protein, so any one can be swapped in and
  // the day still lands. Built for a client's Saturday dinner (OB, 2026-10-02: his eating-out favourites, made at
  // home). The "same calories and protein" line prints only when every option is within 25 calories and 5 g of protein.
  const picksHTML = m => {
    const ps = (m.picks||[]).filter(p=>(p.items||[]).length); if(!ps.length) return "";
    const base = mealMacros(m);
    const same = ps.every(p=>{ const q=mealMacros(p); return Math.abs(q.kcal-base.kcal)<=25 && Math.abs(q.protein_g-base.protein_g)<=5; });
    const note = m.pickNote || P.noTotals && `Swap in any one of these instead. Each is weighed to fit your day the same way, so nothing else changes.` || `Swap in any one of these instead.${same?` Each has the same calories and protein as the ${dishTitle(m).toLowerCase()}, so your day still lands on your numbers.`:""} Shop for the one you pick and log it like any other meal.`;
    const intro = `<p class="pr-picknote"><b>${esc(m.pickTitle||"Rather have a different favorite?")}</b> ${esc(note)}</p>`;
    // the intro rides in the first option's heading block: alone at the foot of a page it read as a dangling line (a client, 2026-10-02)
    const blocks = ps.map((p,i)=>mealBlock(Object.assign({name:m.name, fresh:true}, p), {head:`Option ${i+2}`, pick:true, lead:i ? "" : intro}));
    // what to order when the favorite is eaten out rather than made at home: the coach's own words, set on the meal as
    // `pickOut`, printed after the last option (OB's upgrade for a client, 2026-10-05)
    const out = m.pickOut ? `<p class="pr-picknote pr-pickout"><b>${esc(m.pickOutTitle||"Eating out instead?")}</b> ${esc(m.pickOut)}</p>` : "";
    return `<div class="pr-picks">${blocks.join("")}${out}</div>`;
  };
  const batchSeen = new Map();       // dish + its cook -> where its batch recipe printed
  const dayHtml = dayGroups.map(g=>{ const day=g.days[0], merged=g.days.length>1;
    let meals="";
    day.meals.forEach(m=>{
      if(m.open){ meals+=`<div class="pr-meal pr-open"><div class="pr-mealhead"><h4>${esc(m.name)}</h4>${m.dish?`<span class="pr-dish">${esc(m.dish)}</span>`:""}</div><p class="pr-opennote">${esc(openMealLine(m))}</p></div>`; return; }
      // one packaged item (a Yasso bar, a bottled shake) is one line, not a one-row table with a Total that repeats it;
      // the table version spilled onto a page of its own in a client's plan (2026-10-02)
      if(isReadyMeal(m) && m.items.length===1){ const it=m.items[0], f=FOOD_BY_ID[it.id], r=it.grams/100;
        const how = m.cook && m.cook.method ? " " + stepList(planSteps(m.cook.method, m)) : "";
        meals+=`<div class="pr-meal pr-ready"><div class="pr-mealhead"><h4>${esc(m.name)}</h4>${m.dish?`<span class="pr-dish">${esc(dishTitle(m))}</span>`:""}</div><p class="pr-readyline">${esc(f.name)}, ${bestPortion(f,it.grams)}: ${Math.round(f.kcal*r)} cal, ${Math.round(f.protein_g*r)}g protein, ${Math.round(f.carb_g*r)}g carbs, ${Math.round(f.fat_g*r)}g fat.${how}</p></div>`;
        return; }
      let ref = null;
      if(P.prep && !m.fresh && m.dish && m.cook && m.cook.prepMethod){
        const S = prepSchedule(), di = state.week.indexOf(day), ck = S ? prepCookOfDay(S, di) : null;
        const key = m.dish + "|" + (ck ? ck.day : "week");
        if(batchSeen.has(key)) ref = batchSeen.get(key);
        else batchSeen.set(key, { where: `${merged ? dayNameOf(g.days[0])+" to "+dayNameOf(g.days[g.days.length-1]) : dayNameOf(day)}'s ${String(m.name||"meal").toLowerCase()}`, cook: dayLabel(ck ? ck.day : 0) });
      }
      meals += mealBlock(m, ref ? { batchRef: ref } : {}) + picksHTML(m);
    });
    const dt=mealsTotals(day.meals,true), open=day.meals.filter(m=>m.open);
    const openTail = open.length ? `, plus about ${open.reduce((a,m)=>a+(+m.open.kcal||0),0).toLocaleString("en-US")} for ${open.map(m=>(m.dish||m.name).toLowerCase()).join(" and ")}` : "";
    return `<div class="pr-day"><div class="pr-dayhead"><h3>${esc(merged ? dayNameOf(g.days[0])+" to "+dayNameOf(g.days[g.days.length-1]) : dayNameOf(day))}</h3>${P.noTotals ? "" : `<div class="pr-daysum">${merged?"Each day: ":""}${Math.round(dt.kcal).toLocaleString("en-US")} calories${open.length?" planned":""}, ${Math.round(dt.protein_g)}g protein${P.gramsOnly?"":`, ${Math.round(dt.carb_g)}g carbs, ${Math.round(dt.fat_g)}g fat`}${esc(openTail)}</div>`}</div>${meals}</div>`;
  }).join("");
  // TRADES (profile trades, set by a client build; a client, 2026-10-08): a few weighed alternatives to whole
  // meals, each built to the meal it replaces so the day still lands. Printed once after the days with their own shopping
  // line, and kept off the weekly grocery list because they are optional.
  const tradeList = (P.trades||[]).filter(t=>(t.items||[]).length);
  // A "build your own" meal (a client's onboarding call, 2026-10-09: "approved protein, carb, and fat lists for
  // days when following the plan exactly isn't feasible"). The builder weighs each option to stand in for the planned meal
  // and checks every combination; printed once, after the trades, in grams.
  const bl = P.buildLunch;
  const blName = id => { const f = FOOD_BY_ID[id]; return !f ? "" : P.country==="MX" ? shelfNameMX(f.name) : f.name; };
  // the hand measure reads first, under the intro: eating out, a plate cannot be weighed raw (client review, 2026-10-09)
  const buildLunchHtml = bl && (bl.groups||[]).length ? `<div class="pr-day pr-build"><div class="pr-dayhead"><h3>${esc(bl.title || "Build your own lunch")}</h3>${bl.intro ? `<div class="pr-daysum">${esc(bl.intro)}</div>` : ""}</div>`
    + (bl.noScale ? `<p class="pr-small pr-bnoscale"><b>${esc(bl.noScaleHead || "No scale?")}</b> ${esc(bl.noScale)}</p>` : "")
    + bl.groups.map(g=>`<div class="pr-bgroup"><h4>${esc(g.head)}</h4>${g.note ? `<p class="pr-small">${esc(g.note)}</p>` : ""}<ul class="pr-blist">${(g.items||[]).filter(it=>FOOD_BY_ID[it.id]).map(it=>`<li>${esc(blName(it.id))}: ${bestPortion(FOOD_BY_ID[it.id], it.grams)}</li>`).join("")}</ul></div>`).join("")
    + (bl.free ? `<div class="pr-bgroup"><h4>${esc(bl.freeHead || "Vegetables")}</h4><p class="pr-small">${esc(bl.free)}</p></div>` : "")
    + ((bl.examples||[]).length ? `<div class="pr-bgroup"><h4>${esc(bl.examplesHead || "Ideas")}</h4><ul class="pr-blist pr-bideas">${bl.examples.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>` : "")
    + `</div>` : "";
  // every meal's lists in one section (a client, 2026-10-14: "a plug in play for all meals as well on the side
  // like we did for lunch"): the shared hand measure first, then one block per meal, each kept whole on its page
  // a builder's hand-made lists win (a client); otherwise the planner builds them from the plan, unless the
  // coach switched them off for this client (on for everyone, OB 2026-10-14)
  const bm = P.buildMeals || (P.plugAndPlay === false ? null : autoBuildMeals(P, state.week));
  const bGroups = groups => (groups||[]).map(g=>`<div class="pr-bgroup"><h5>${esc(g.head)}</h5>${g.note ? `<p class="pr-small">${esc(g.note)}</p>` : ""}<ul class="pr-blist${g.oneCol ? " pr-b1col" : ""}">${(g.items||[]).filter(it=>FOOD_BY_ID[it.id]).map(it=>`<li>${esc(blName(it.id))}: ${bestPortion(FOOD_BY_ID[it.id], it.grams)}</li>`).join("")}</ul></div>`).join("");
  // travel days: a builder's own page (a client's Spain trip) or the general one the coach ticks (2026-10-14)
  const tv = P.travel || (P.travelPage ? autoTravel(P, state.week) : null);
  const travelHtml = tv && (tv.sections||[]).length ? `<div class="pr-day pr-build pr-travel"><div class="pr-dayhead"><h3>${esc(tv.title || "Travel days")}</h3>${tv.intro ? `<div class="pr-daysum">${esc(tv.intro)}</div>` : ""}</div>`
    + tv.sections.map(sec => `<div class="pr-bblock"><h4 class="pr-bmeal">${esc(sec.head)}</h4>${sec.text ? `<p class="pr-small">${esc(sec.text)}</p>` : ""}${(sec.lines||[]).length ? `<ul class="pr-blist pr-bideas">${sec.lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}${sec.after ? `<p class="pr-small">${esc(sec.after)}</p>` : ""}</div>`).join("")
    + (tv.source ? `<p class="pr-small pr-tsource">${esc(tv.source)}</p>` : "") + `</div>` : "";
  const buildMealsHtml = bm && (bm.blocks||[]).length ? `<div class="pr-day pr-build"><div class="pr-dayhead"><h3>${esc(bm.title || "Plug-and-play meals")}</h3>${bm.intro ? `<div class="pr-daysum">${esc(bm.intro)}</div>` : ""}</div>`
    + (bm.noScale ? `<p class="pr-small pr-bnoscale"><b>${esc(bm.noScaleHead || "No scale?")}</b> ${esc(bm.noScale)}</p>` : "")
    // more short paragraphs under it, each with a bold lead-in (a client, 2026-10-14: "Cooking it yourself?")
    + (bm.paras||[]).filter(x=>x && x.text).map(x=>`<p class="pr-small pr-bnoscale"><b>${esc(x.head||"")}</b> ${esc(x.text)}</p>`).join("")
    + bm.blocks.map(b=>`<div class="pr-bblock"><h4 class="pr-bmeal">${esc(b.title)}</h4>${b.note ? `<p class="pr-small">${esc(b.note)}</p>` : ""}`
        + bGroups(b.groups)
        + (b.free ? `<div class="pr-bgroup"><h5>${esc(b.freeHead || "Vegetables")}</h5><p class="pr-small">${esc(b.free)}</p></div>` : "")
        + ((b.examples||[]).length ? `<div class="pr-bgroup"><h5>${esc(b.examplesHead || "Ideas")}</h5><ul class="pr-blist pr-bideas">${b.examples.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>` : "")
        + `</div>`).join("")
    + `</div>` : "";
  const tradesHtml = tradeList.length ? `<div class="pr-day"><div class="pr-dayhead"><h3>Trades</h3><div class="pr-daysum">${esc(P.tradesNote || "Any day, you can swap one meal for its trade below. Each is weighed to fit your day the same way, so nothing else changes.")}</div></div>${tradeList.map(t=>mealBlock(t, {pick:true, head: t.head || (t.name+" trade")})).join("")}</div>` : "";

  const grocSecs = secs => secs.map(sec=>
    `<div class="pr-gsec"><h5>${esc(sec.cat)}</h5>${sec.items.map(it=>`<div class="pr-gitem">☐ ${esc(P.country==="MX" ? shelfNameMX(it.name) : it.name)}, ${esc(String(P.metric ? metricAmount(it.amount) : it.amount).replace(/ · ~/g, ", about ").replace(/ · /g, ", "))}${it.brands&&!P.noBrands?`<span class="pr-brands">e.g. ${esc(it.brands)}</span>`:""}${it.swap?`<span class="pr-brands">If you can't find it: ${esc(clientSwap(it.swap))}</span>`:""}</div>`).join("")}</div>`).join("");
  const prepS = prepSchedule(P), byCook = prepS ? groceryByCook() : null;
  const weeklyPicks = !byCook ? pickMealsIn(filledDays).map(pickGroceryEntry) : [];
  const groceryHtml = !byCook ? `<div class="pr-grocery">${grocSecs(weeklyGrocery(withoutPickMeals(state.week)))}</div>` + weeklyPicks.map(c=>
    `<div class="pr-cookday" style="margin:.4em 0 .8em"><h5 class="pr-cookhead">${esc(c.head)}</h5><p class="pr-small" style="margin:.1em 0 .4em">${esc(c.note)}</p><div class="pr-grocery">${grocSecs(c.secs)}</div></div>`).join("") : byCook.map(c=>
    `<div class="pr-cookday" style="margin:.4em 0 .8em"><h5 class="pr-cookhead">${esc(c.head)}</h5>${c.dishes.length?`<p class="pr-small" style="margin:.1em 0 .4em">${esc(c.dishes.join(", "))}</p>`:""}${c.note?`<p class="pr-small" style="margin:.1em 0 .4em">${esc(c.note)}</p>`:""}<div class="pr-grocery">${grocSecs(c.secs)}</div>${c.days ? recipeExtrasLine(c.days) : ""}</div>`).join("");
  // fish on a cook day is why the list is split by cook day; without it the reason is the produce
  const fishInPlan = filledDays.some(d=>(d.meals||[]).some(m=>(m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && f.cat==="Seafood"; })));

  // food alone: the table printed food plus supplements as "your average day", so a client, who rarely takes them,
  // read Vitamin D 399% and Iron 160% when her food gives 65% and 61% (2026-10-01)
  const tFood = avgDayTotals(false), pctOf = (tt,k) => Math.round(tt[k]/microTarget(k)*100);
  const micros = MICRO_KEYS.map(k=>`<div><span>${METAMAP[k].label}</span><span>${pctOf(tFood,k)}%</span></div>`).join("");
  const lows = MICRO_KEYS.map(k=>({key:k, label:METAMAP[k].label, pct:pctOf(tFood,k), withSupp:pctOf(t,k)})).filter(m=>m.pct<70).slice(0,6);
  const taking = new Set(P.alreadyTakes || []), lowTaken = lows.filter(l=>taking.has(l.key)).map(l=>l.label);
  const listAnd = a => a.length<2 ? a.join("") : a.slice(0,-1).join(", ")+" and "+a[a.length-1];
  const lowCovered = lows.filter(l=>!taking.has(l.key) && l.withSupp>=100).map(l=>l.label), lowOpen = lows.filter(l=>!taking.has(l.key) && l.withSupp<100).map(l=>l.label);
  const lowKey = label => (lows.find(l=>l.label===label)||{}).key;
  // a supplement that is test-gated (iron: "Only if a blood test shows your iron is low") covers the nutrient only then:
  // "The supplements below cover Iron" sat right above "take the iron only if it shows you are low" (a client, 2026-10-12)
  const gatedOnly = label => { const k = lowKey(label), on = SUPPLEMENTS.filter(s=>P.supplements && P.supplements[s.key] && (s.add||{})[k]);
    return on.length > 0 && on.every(s=>suppWhen(s,P)); };
  const lowCoveredNow = lowCovered.filter(l=>!gatedOnly(l)), lowCoveredIf = lowCovered.filter(gatedOnly);
  const supp = SUPPLEMENTS.filter(s=>P.supplements && P.supplements[s.key] && suppVisible(s,P.diet));
  const suppOrders = supplementOrderList();
  const suppHtml = (supp.length||P.suppNotes)?`<div class="pr-section"><h4>Supplements</h4>
    ${suppOrders.map(s=>`<div class="pr-supp">☐ <b>${esc(s.label)}</b> <span class="pr-supp-dose">${esc(s.dose||"")}</span>${s.brand?`<br><span class="pr-supp-brand">Recommended: ${esc(s.brand.name)}, ${esc(s.brand.product)}${s.brand.serving?` (${esc(s.brand.serving)})`:""}${s.brand.certified?", third-party tested":""}</span>`:""}${s.when?`<br><span class="pr-supp-brand">${esc(s.when)}</span>`:""}</div>`).join("")}
    ${P.suppNotes?`<p class="pr-supp-notes">${esc(P.suppNotes)}</p>`:""}
    ${(P.halal||P.kosher)?`<p class="pr-supp-foot">${P.halal?"Halal":"Kosher"}: many softgels use pork/bovine gelatin, choose ${P.halal?"halal":"kosher"}-certified or vegetarian-capsule (gelatin-free) versions. The plant-based picks above are gelatin-free.</p>`:""}
    ${/* krill oil sits beside fish oil on the omega-3 shelf, and krill is a crustacean (a client's review, 2026-10-16) */ (P.allergens && P.allergens.shellfish && supp.some(s=>s.key==="fishoil"))?`<p class="pr-supp-foot">Shellfish allergy: take fish oil, not krill oil. Krill is a shellfish, and krill oil is sold next to fish oil as omega-3.</p>`:""}
    <p class="pr-supp-foot">Brands shown are third-party-tested / established options as a starting point, not medical advice. Buy from a trusted retailer.</p></div>`:"";
  const flags = SCREEN_FLAGS.filter(s=>P.screen && P.screen[s.key]);
  const flagHtml = flags.length?`<p class="pr-flag">Health flags: ${flags.map(f=>esc(f.label)).join(", ")}. Outside general-wellness scope, reviewed under clinical oversight / refer to physician, RD. Not medical nutrition therapy.</p>`:"";
  const science = SCIENCE.filter(s=>s.notFor!==P.goal && (!s.when || s.when(P))).map(s=>`<div class="pr-sci"><b>${typeof s.h==="function"?s.h(P):s.h}</b> ${typeof s.c==="function"?s.c(P):s.c} <a href="https://doi.org/${s.doi}">doi.org/${s.doi}</a></div>`).join("");
  let gutHtml = "";
  if(P.gut){
    const g=gutScore();
    const tips=(GUT.tips||[]).map(t=>`<li>${esc(t)}</li>`).join("");
    gutHtml = `<div class="pr-break"></div><div class="pr-section"><h4>Your gut-health plan</h4><p class="pr-sub">${g.plants} different plants this week, against a target of 30.</p>
      <p style="font-size:11.5px;color:#333;margin:0 0 6px">Variety beats volume: a diverse mix of plants, fermented foods and prebiotic fibres is associated with a richer, more diverse microbiome. Your week hits <b>${g.plants} of 30</b> plant types and <b>${g.ferments}</b> fermented servings.</p>
      <ul class="pr-howto-list" style="margin:0;padding-left:18px;font-size:11px;line-height:1.5;color:#222">${tips}</ul></div>`;
  }
  const glp1Html = P.glp1 ? `<p class="pr-supp-foot">Small-appetite plan: meals are protein-dense and lower-volume. Prioritise protein first, sip fluids between (not during) meals, and eat slowly, stop at comfortably full. If on a GLP-1 medication, follow your prescriber's & dietitian's guidance.</p>` : "";
  const refsHtml = `<div class="pr-refs"><h4>References</h4>
    <ol>${planReferences(P).map(r=>`<li>${esc(r.txt)}${r.doi?` <a href="https://doi.org/${r.doi}">doi.org/${r.doi}</a>`:""}</li>`).join("")}</ol>
    <p class="pr-scifoot">Peer-reviewed sources via PubMed; full text at the DOI links. General-wellness guidance, not a substitute for medical or dietetic advice.</p></div>`;

  $("printArea").innerHTML = usSpelling(`<div class="pr-wrap${P.gramsOnly ? " pr-compact" : ""}">
    <div class="pr-head">
      <div class="pr-mark">OB Health</div>
      <h1 class="pr-title">${P.planTitle ? esc(P.planTitle) : P.name ? esc(P.firstName || P.name.trim().split(/\s+/)[0])+"'s meal plan" : "Your meal plan"}</h1>
      ${P.noTotals ? "" : `<div class="pr-kicker">${Math.round(t.kcal).toLocaleString("en-US")} calories a day</div>`}
      <div class="pr-meta">${P.name?esc(P.name)+". ":""}${nDays}-day plan, ${dateStr}${coach?". Coach: "+esc(coach):""}</div>
    </div>
    ${P.note?`<div class="pr-note">${esc(P.note)}${coach?`<div class="pr-sig">${esc(coach)}</div>`:""}</div>`:""}
    ${P.noTotals ? "" : `<div class="pr-pills">
      <span class="pill brown">${Math.round(t.kcal).toLocaleString("en-US")} cals</span><span class="pill brown">${Math.round(t.protein_g)}g protein</span>${P.gramsOnly?"":`<span class="pill">${Math.round(t.carb_g)}g carbs</span><span class="pill">${Math.round(t.fat_g)}g fat</span><span class="pill">${Math.round(t.fiber_g)}g fiber</span>`}
    </div>`}
    ${aaPdf&&!aaPdf.allMet?`<p class="pr-aanote">Most of your protein comes from complete sources. The one running lowest across the day is ${esc(aaPdf.limitingLabel.toLowerCase())}, which the swaps below cover.</p>`:""}
    <div class="pr-howto">
      <h4>How to use it</h4>
      ${/* P.howToLead (2026-10-22): a builder's own first line. a client's coach told her "Main issue is fat intake, not
           carbs", and the default line said "Carbs and fat have more give in them" */ P.howToLead ? `<p>${esc(P.howToLead)}</p>`
        : P.goal==="gain"
        ? `<p>Hit the protein and the calories every day. Eating short is what stalls a muscle-building plan.</p>
      <p>If a meal is hard to finish, drink part of it: milk, a smoothie or a shake goes down easier than more food.</p>`
        : P.noTotals ? `<p>Eat the plan as written. The protein in each meal is the part never to skip.</p>`
        : `<p>Hit the protein every day. Carbs and fat have more give in them.</p>`}
      <p>${esc(P.swapLine || (P.gramsOnly ? "Want to change a food? Message me and I will swap it for you, already weighed out." : "Swap freely as long as the grams match, protein for protein and carb for carb."))}</p>
      <p>Water: ${+P.weightLb ? waterRange(P)+" a day" : "half an ounce to a full ounce for every pound you weigh, every day"}, more when you train.</p>
      ${(P.howTo||[]).map(x=>`<p>${esc(x)}</p>`).join("")}
      ${!P.prep && dayGroups.some(g=>g.days.length>1) ? `<p>Leftovers go in the fridge within 2 hours of cooking and keep 3 to 4 days. Reheat them until steaming hot.</p>` : ""}
    </div>
    ${(P.rules||[]).length ? `<div class="pr-howto"><h4>When plans change</h4><ul style="margin:.2em 0;padding-left:18px">${P.rules.map(r=>`<li><b>${esc(r.t)}</b> ${esc(r.x)}</li>`).join("")}</ul></div>` : ""}
    <div class="pr-section" style="margin-top:6px">
      <h4>${P.gramsOnly ? "Weighing" : "Weighing and logging"}</h4>
      <p style="margin:.3em 0">${logEx.none ? "" : "Read the food name on each line. It tells you whether that weight is cooked or raw. "}${P.metric && P.gramsOnly ? "The grams are the amount; a count beside a few foods (1 egg, 2 tortillas) is there to help you picture it." : "The grams are the amount; the cups, pieces and slices beside them are there to help you picture it."}</p>
      ${logEx.none
        ? `<p style="margin:.3em 0"><b>Every weight is before cooking:</b> raw, or dry for oats and pasta. Weigh the part you eat: peeled, pitted or out of the shell, and canned fish drained.</p>`
        : `<ul style="margin:.2em 0;padding-left:18px">
        <li><b>Says cooked</b> (${esc(logEx.cooked)}): cook it first, then weigh. That is the number on the line.</li>
        <li><b>Says raw</b> (${esc(logEx.raw)}): weigh it before cooking, the part you eat (peeled, pitted or out of the shell).</li>
      </ul>`}
      ${P.gramsOnly?"":`<p style="margin:.3em 0"><b>If you track in an app, match the wording.</b> Search "${esc(logEx.search)} cooked", not "${esc(logEx.search)}". Grains and beans weigh two to three times as much once cooked${MEATFREE_DIET(P.diet) ? "" : ", and meat loses about a quarter"}, so the cooked and raw entries carry different numbers.</p>`}
      <p style="margin:.3em 0">${logEx.none ? "The shopping list uses the same weights, added up for the week." : "The shopping list is mostly in dry and raw weights, because that is how you <b>buy</b> food."} ${(()=>{
        // the example uses the rice on this plan: a client eats white rice (36g dry per 100g) and the line quoted brown (34g)
        const eats = n => (state.week||[]).some(d=>(d.meals||[]).some(m=>(m.items||[]).some(it=>{ const f=FOOD_BY_ID[it.id]; return f && f.name===n; })));
        // a plan with no rice gets no rice example (a client, who dislikes brown rice, read "34g of dry brown rice", 2026-10-06)
        const rice = ["White rice, cooked","Brown rice, cooked"].find(eats); if(!rice) return "";
        const y=window.OB_COOK_YIELD&&window.OB_COOK_YIELD[rice];
        return y ? `About ${Math.round(100*y.factor)}g of dry ${rice.split(" ")[0].toLowerCase()} rice becomes 100g cooked, which is why the two lists do not match.` : "";})()}</p>
      ${(()=>{
        // six rows when a personal note sits above the table: with eight, the last row and one sentence spilled onto an
        // otherwise empty second page (a client's plan, 2026-09-30)
        // and four under a long note: a client's five-line note pushed two rows onto an empty page 2 (2026-09-30)
        if(P.gramsOnly) return "";           // she follows the plan by weight and does not log in an app
        const note = String((state.profile && state.profile.note) || "");
        const rows = loggingCheckRows(state.week, !note ? 8 : note.length > 320 ? 4 : 6); if(!rows.length) return "";
        // "they carry most of your calories" was not true: a client's four were 24 to 38% of a day. Say the real share.
        const share = Math.round(100*rows.reduce((a,r)=>a+r.share, 0));
        return `<p style="margin:.6em 0 .2em"><b>Check these in your app once.</b> They are your ${["","","two","three","four","five","six","seven","eight"][rows.length]||rows.length} biggest calorie foods, ${share}% of the calories in this plan. Open the entry you picked and look at calories per 100g.</p>
        <table class="pr-grid">
          <tr><th>Food</th><th class="r">Should show per 100g</th><th>If it shows this, you picked the wrong one</th></tr>
          ${rows.map(r=>`<tr><td>${esc(r.name)}</td><td class="r"><b>${r.perServing ? `${r.perServing.kcal} cal per ${esc(r.perServing.label)}` : `${r.kcal} cal`}</b></td><td>${r.wrong ? `about ${r.wrong} cal is the ${r.wrongForm} entry` : ""}</td></tr>`).join("")}
        </table>`;
      })()}
    </div>
    ${P.prep ? dayHtml.replace('<div class="pr-day">', '<div class="pr-day"><p style="margin:0 0 .5em;font-size:12.5px">Each meal lists what goes in the container and how much to cook. Full prep notes and seasonings are at the back.</p>') : dayHtml}
    ${tradesHtml}
    ${buildLunchHtml}
    ${buildMealsHtml}
    ${travelHtml}
    <div class="pr-break"></div>
    <div class="pr-section"><h4>${prepS?"Your grocery lists, one per cook day":"Your weekly grocery list"}</h4>${prepS?`<p style="margin:.2em 0 .5em">Shop right before each cook, so ${fishInPlan?"fish and fresh produce are at their best on the day you cook them":"fresh produce is at its best on the day you cook it"}.</p>`:""}${groceryHtml}${byCook ? "" : recipeExtrasLine()}</div>
    ${P.prep?`<div class="pr-break"></div>`:""}
    ${P.prep?(function(){const G=prepGuideFor(P);
      const ul=a=>(a&&a.length)?`<ul style="margin:.2em 0;padding-left:18px">${a.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>`:"";
      const tl=(G.timeline||[]).map(t=>`<li><b>${esc(t.when)}</b> ${esc(t.step)}</li>`).join("");
      const banRef=refBannedRe(P);
      // The guide is written for every plan. The client's copy keeps the rows for foods her plan has: a client's listed
      // shrimp, tofu, pasta, hard-boiled eggs and frozen burritos, and a pasta tip ended "a splash of fresh olive oil" (2026-10-02).
      // A burrito BOWL keeps no frozen-burrito row: a client's barbacoa bowls brought it back (2026-10-02).
      const planTxt = filledDays.flatMap(d=>d.meals.flatMap(m=>[m.dish||""].concat((m.items||[]).map(it=>{ const f=FOOD_BY_ID[it.id]; return f?f.name:""; })))).join(" | ").toLowerCase();
      // ground meat first (its label names turkey too), and the roasts-and-steaks row only for a plan with a beef or pork cut:
      // a ground-turkey plan printed "Cooked beef / pork (roasts, steaks, chops)" (a client, 2026-10-06)
      const GUIDE_RULES = [[/ground meat/,/ground/],[/chicken|turkey|poultry/,/chicken|turkey/],
        [/beef|pork|steak|lean meat/,/\b(?:beef|pork)\b(?!, ground)|steak|tenderloin|sirloin|top round|chop/],[/\bfish\b/,/salmon|cod|tilapia|trout|halibut|mackerel|\bfish\b/],[/shrimp/,/shrimp/],[/hard-boiled/,/hard-boiled|boiled egg/],
        [/egg/,/\begg/],[/tofu/,/tofu/],[/\brice\b/,/\brice\b/],[/quinoa|grains/,/quinoa|buckwheat|farro|barley|bulgur|couscous/],
        [/pasta|noodle/,/pasta|noodle/],[/beans|lentils/,/bean|lentil|chickpea/],[/roasted veg|vegetables turn/,/broccoli|asparagus|cabbage|cauliflower|brussels|zucchini|green beans|carrots, cooked/],
        [/raw cut/,/raw/],[/cut fruit/,/berr|banana|apple|melon|mango|pineapple|grape|orange/],[/potato/,/potato/],[/soup|chili/,/soup|chili|stew/],
        [/overnight oats|chia pudding/,/overnight|chia pudding|\bjars?\b|^(?=[\s\S]*\boats\b)[\s\S]*chia seeds/],[/canned tuna|sardine|salmon salad/,/canned|tuna salad/],[/burrito/,/burrito(?!\s*bowls?)/]];
      // 2026-11-04 (a client, client-eye review): her oats are in pancakes and her grain is rice, and the table still printed
      // "Cooked quinoa / other grains" and "Overnight oats / chia pudding jars": rice has its own row, and the jar row now needs
      // a jar, an overnight or chia-pudding dish, or oats with chia seeds (a client's soaked oats)
      // the first rule that names the row decides (most specific first: "hard-boiled" before "egg")
      const guideKeep = label => { const l=String(label||"").toLowerCase(), rule=GUIDE_RULES.find(([lr])=>lr.test(l)); return !rule || rule[1].test(planTxt); };
      const st=(G.storage||[]).filter(s=>(!banRef||!banRef.test(s.food||"")) && guideKeep(s.food)).map(s=>`<tr><td>${esc(s.food)}</td><td style="white-space:nowrap">${esc(s.fridge||"")}</td><td style="white-space:nowrap">${esc(s.freezer||"-")}</td><td>${esc(s.tip||"")}</td></tr>`).join("");
      const rh=(G.reheating||[]).filter(r=>guideKeep(r.food)).map(r=>`<li><b>${esc(r.food)}:</b> ${esc(r.how)}</li>`).join("");
      const tb=(G.troubleshooting||[]).filter(t=>guideKeep(t.problem)).map(t=>`<li><b>${esc(t.problem)}:</b> ${esc(t.fix)}</li>`).join("");
      return `<div class="pr-section pr-prep"><h4>${esc(prepTitle())}</h4>${prepTwice()?`<p style="margin:.2em 0"><b>Your cook days:</b> ${esc(prepCookDaysText())}</p>`:""}
      <p class="pr-small" style="margin:.2em 0"><b>Recommendations only:</b> ${esc(PREP_DISCLAIMER)}</p>
      ${/* a batch recipe written for this client (cook.verbatim) gets the run sheet too: a client's skillet-cooked chicken
         thighs sat beside the generic "air-fry the chicken 16 to 22 minutes" timeline (client-eye review, 2026-11-05) */""}
      ${P.prepBrief ? "" : `<p style="margin:.2em 0"><b>What you need:</b></p>${ul(G.equipment)}`}${(()=>{
        // the generic list had no muffin tin or blender for a plan whose recipes need both (reviewer, 2026-10-03)
        const txt = filledDays.flatMap(d=>d.meals.map(m=>(m.cook&&m.cook.prepMethod)||"")).join(" ");
        const KIT = [[/muffin tin/i,"a 12-cup muffin tin"],[/\bblender\b/i,"a blender"],[/dutch oven|slow cooker|pressure cooker/i,"a Dutch oven, slow cooker or pressure cooker"],[/food processor/i,"a food processor"],[/air.?fr/i,"an air fryer if you have one"]];
        const kit = KIT.filter(([re])=>re.test(txt)).map(x=>x[1]);
        const joined = kit.some(k=>k.includes(",")) ? (kit.length<2 ? kit[0] : kit.slice(0,-1).join("; ")+"; and "+kit[kit.length-1]) : listAnd(kit);
        return kit.length ? `<p class="pr-small" style="margin:.1em 0 .3em">Your recipes also call for ${esc(joined)}.</p>` : ""; })()}
      ${G.containers && !P.prepBrief?`<p style="margin:.2em 0"><b>Containers:</b> ${esc(G.containers)}</p>`:""}
      ${P.prepBrief ? "" : `<p style="margin:.2em 0"><b>Before you start:</b></p>${ul(G.before_you_start)}`}
      ${filledDays.some(d=>d.meals.some(m=>m.cook && (m.cook.prepMethod || m.cook.verbatim) && !m.fresh)) ? cookDayRunSheet(filledDays) : `<p style="margin:.2em 0"><b>${prepTwice()?"Each cook day, step by step:":numberedDays()?"The cook-day timeline:":"The Sunday timeline:"}</b></p><ol style="margin:.2em 0;padding-left:18px">${tl}</ol>`}
      <p style="margin:.2em 0"><b>Cool it down safely:</b></p>${ul(G.cooling)}
      ${G.labeling && !P.prepBrief?`<p style="margin:.2em 0"><b>Label every container:</b> ${esc(G.labeling)}</p>`:""}
      <p style="margin:.2em 0"><b>How long each food keeps:</b></p><table class="pr-grid"><tr><th>Food</th><th>Fridge</th><th>Freezer</th><th>Tip</th></tr>${st}</table>
      <p style="margin:.2em 0"><b>Reheating:</b></p><ul style="margin:.2em 0;padding-left:18px">${rh}</ul>
      ${P.prepBrief ? "" : `<p style="margin:.2em 0"><b>Keeping it tasty:</b></p>${ul(G.keep_it_tasty)}
      <p style="margin:.2em 0"><b>Troubleshooting:</b></p><ul style="margin:.2em 0;padding-left:18px">${tb}</ul>`}
      ${(P.prepCook==="3day"||P.prepCook==="batch3") ? "" : `<p style="margin:.2em 0"><b>Freezing & thawing:</b></p>${ul(G.freezing)}`}</div>`;})():""}
    ${(()=>{
      // The client PDF printed all 91 library sauces with their ingredients: seven pages, most of them oil or yogurt
      // dressings whose calories the plan does not count (a client's plan ran to 27 pages, 2026-10-02). It now keeps
      // the dry rubs (about 5 calories a teaspoon) that pair with this plan's own proteins, six at most.
      if(!P.prep || !(window.OB_SAUCES||[]).length) return "";
      const prot = [...new Set(filledDays.flatMap(d=>d.meals.flatMap(m=>(m.items||[]).map(it=>FOOD_BY_ID[it.id]).filter(f=>f && (f.cat==="Protein"||f.cat==="Seafood"||/^egg/i.test(f.name))))
        .map(f=>(f.name.match(/chicken|turkey|beef|steak|salmon|pork|shrimp|cod|tuna|egg|tofu|tenderloin/i)||[""])[0].toLowerCase().replace("tenderloin","beef").replace("steak","beef"))))].filter(Boolean);
      const ban = refBannedRe(P);
      // dry blends only: zhoug is filed as a spice blend but is herbs in a quarter cup of olive oil that keeps 7 days,
      // and it printed under "about 5 calories a teaspoon" (a client, 2026-10-02)
      const rubs = (window.OB_SAUCES||[]).filter(x=>x.category==="spice-blend" && (+x.fridge_days||0) >= 30 && !(x.ingredients||[]).some(i=>/\boil\b|seed|sesame|\bnuts?\b|almond|peanut|walnut|pecan|cashew|pistachio/i.test(i.item||"")))
        .filter(x=>!ban || !(ban.test(x.name||"") || (x.ingredients||[]).some(i=>ban.test(i.item||""))))
        // a client who finds mild heat too hot gets no hot blends: every rub carried cayenne, and the jerk one "scotch bonnet
        // heat", on a plan for a client who wrote "kimchi is too hot" (a client, 2026-10-30)
        .filter(x=>!P.mild || !(HOT_RUB.test(x.name||"") || HOT_RUB.test(x.notes||x.note||"") || (x.ingredients||[]).some(i=>HOT_RUB.test(i.item||""))))
        .map(x=>({ x, hits: prot.filter(w=>new RegExp("\\b"+w, "i").test(x.pairs_with||"")).length })).filter(o=>o.hits>0)
        .sort((a,b)=>b.hits-a.hits).slice(0,6).map(o=>o.x);
      if(!rubs.length) return "";
      return `<div class="pr-section"><h4>Seasonings that add flavor, not calories</h4><p class="pr-small pr-tight">Dry rubs and blends for your proteins, about 5 calories a teaspoon. Change the rub and the same batch tastes new.</p>${
        rubs.map(x=>`<p style="margin:.3em 0"><b>${esc(x.name)}:</b> ${(x.ingredients||[]).map(i=>esc(i.amount)+" "+esc(i.item)).join(", ")}. Keeps ${esc(String(x.fridge_days))} days.</p>`).join("")}</div>`;
    })()}
    ${(()=>{
      // Fibre QUALITY, not just fibre grams. Total grams was the only fibre number on the plan, and OB's own
      // Fibre Guide says the four types do different jobs and that plant VARIETY is what the American Gut
      // Project measured. Both are computed from this plan, not asserted.
      const pv = plantVariety(state.week);
      // how many different menus this prep week actually rotates, for the measured range that matches it
      const prepMenus = Math.max(2, Math.min(4, new Set((state.week||[]).map(d=>d && d.prepBatch).filter(Boolean)).size || P.prepVariety || 3));
      const prepRange = (window.OB_PLANT_PREP_RANGE||{})[prepMenus] || { lo:16, hi:23 };
      const types = fiberTypeCoverage([].concat(...filledDays.map(d=>d.meals)));
      const ramp = P.noTotals ? "" : fiberRampNote(t.fiber_g, P);
      const missing = types.filter(x=>!x.covered);
      return `<div class="pr-section"><h4>Fibre and your gut</h4>
        ${P.gramsOnly ? "" : `<p style="margin:.3em 0"><b>${pv.count} different plants</b> in the weighed foods across the week, against a target of ${pv.target}.
        ${pv.count>=pv.target
          ? "That clears it. Variety is what feeds the widest range of gut bacteria: in the American Gut Project, people eating 30 or more distinct plants a week carried more of the bacteria that make short-chain fatty acids than people eating 10 or fewer."
          : P.prep
            ? `A plan with ${prepMenus} menus on repeat has fewer different plants than one with a different menu every day, because you are eating a handful of meals, not twenty-one. The 30-plant idea comes from the American Gut Project, where people eating 30 or more distinct plants a week carried more of the bacteria that make short-chain fatty acids than people eating 10 or fewer. You do not have to cook more to close the gap: the cheapest plants are the ones that need no cooking at all. Rotate the herbs and spices you season with, and now and then swap a fruit or vegetable for a different one at the same grams. Each one counts once and none of them costs you a cook day.`
            : `Getting to ${pv.target} is worth doing: in the American Gut Project, people eating 30 or more distinct plants a week carried more of the bacteria that make short-chain fatty acids than people eating 10 or fewer. Every different fruit, vegetable, bean, grain, nut, seed, herb and spice counts once, so the herbs and spices in your recipes already add to this count, and a different berry or vegetable at the same grams adds more.`}</p>
        <p class="pr-small pr-tight">${esc(pv.plants.map(properCase).join(", "))}</p>`}
        <p style="margin:.5em 0 .2em"><b>The four kinds of fibre, and whether your plan has them:</b></p>
        <ul style="margin:.2em 0;padding-left:18px;font-size:12.5px">
        ${types.map(x=>`<li><b>${x.label}:</b> ${x.covered ? (x.sources.length ? `covered by your ${esc(listAnd(x.sources))}` : "covered") : "not in this plan"}. ${esc(x.what)}${x.claim && !P.noTotals ? " "+esc(x.claim) : ""}</li>`).join("")}
        </ul>
        ${missing.length?`<p class="pr-small pr-tight">Easiest fix for ${missing.map(x=>x.label.toLowerCase()).join(" and ")}: onion, garlic, leek or asparagus in any savoury meal.</p>`:""}
        ${ramp?`<p class="pr-tight">${esc(ramp)}</p>`:""}
        ${P.prep?`<p style="margin:.3em 0;font-size:12.5px">One bonus of meal prep: cooking potato, rice or pasta and then chilling it turns some of the starch into resistant starch, which feeds your gut bacteria instead of being digested. Every container you cool overnight is doing that.</p>`:""}
        ${(()=>{
          // Fibre holds water. Put someone on 45g and say nothing about drinking and you have written the
          // plan they will blame for the bloating. OB's own guide gives the number, so print the number.
          const W = window.OB_FIBER_WATER; if(!W) return "";
          const amount = +P.weightLb ? `<b>${waterRange(P)} of water a day</b>`
            : `<b>half an ounce to a full ounce of water for every pound you weigh</b>, every day`;
          // the ramp note right above already says the fibre number; two paragraphs in a row opened "This plan runs 31g"
          return `<p class="pr-tight">
            <b>Drink to match it.</b> ${ramp || P.noTotals ? "Aim for" : `This plan runs ${Math.round(t.fiber_g)}g of fibre a day, so drink`} ${amount}. ${esc(W.why)}</p>`;
        })()}
        ${(()=>{
          // the dial is for a fat-loss phase ("tell me and we will add food"); a client building muscle, who is more
          // often struggling to eat enough (a client, 2026-09-30), does not get a line about sitting at a seven
          const H = window.OB_HUNGER_SCALE; if(!H || (P.goal && P.goal!=="loss")) return "";
          return `<p style="margin:.4em 0;font-size:12.5px"><b>How hungry you should expect to be.</b> ${esc(P.hungerNote || H.note)}</p>`;
        })()}
      </div>`;
    })()}
    <div class="pr-section"><div class="pr-microkeep"><h4>Micronutrient coverage</h4><p class="pr-sub">Your average day from food, as a percent of your target.</p>
      <div class="pr-micro">${micros}</div>
      ${lows.length?`<p class="pr-small" style="margin-top:8px"><b>Under 70% from food this week:</b> ${lows.map(l=>l.label+" ("+l.pct+"%)").join(", ")}.${lowTaken.length?` You already take ${listAnd(lowTaken)} as a supplement, so ${lowTaken.length>1?"those are":"that one is"} covered.`:""}${lowCoveredNow.length?` The supplements below cover ${listAnd(lowCoveredNow)}.`:""}${lowCoveredIf.length?` If your blood work shows your ${listAnd(lowCoveredIf.map(l=>l.charAt(0).toLowerCase()+l.slice(1)))} ${lowCoveredIf.length>1?"are":"is"} low, the supplement below covers ${lowCoveredIf.length>1?"them":"it"}.`:""}${lowOpen.filter(l=>!(P.lowNotes||{})[lowKey(l)]).length?` For ${listAnd(lowOpen.filter(l=>!(P.lowNotes||{})[lowKey(l)]))}, I may suggest a swap or a supplement.`:""}${lowOpen.filter(l=>(P.lowNotes||{})[lowKey(l)]).map(l=>" "+(P.lowNotes||{})[lowKey(l)]).join("")}</p>`:""}</div></div>
    ${suppHtml}
    <div class="pr-section"><h4>The science behind your plan</h4><div class="pr-sciwrap">${science}</div>
      <p class="pr-scifoot">Research summaries via PubMed; full studies at the DOI links above.</p></div>
    ${gutHtml}
    ${glp1Html}
    ${P.halal?`<p style="font-size:11px;color:#555;margin-top:8px">Halal, pork and alcohol excluded. Ensure all meat &amp; poultry is halal-sourced.</p>`:""}
    ${P.kosher?`<p style="font-size:11px;color:#555;margin-top:8px">Kosher, pork and shellfish excluded; keep meat &amp; dairy in separate meals; use kosher-sourced meat.</p>`:""}
    ${P.glutenfree?`<p style="font-size:11px;color:#555;margin-top:8px">Gluten-free, wheat, barley, rye and gluten grains excluded; seasonings use gluten-free versions (tamari, certified-GF miso). <b>For celiac disease:</b> use only certified gluten-free oats, condiments (tamari not regular soy sauce), and packaged goods, and avoid shared-surface cross-contamination. Celiac is a diagnosed condition, confirm the plan with the client's physician or registered dietitian.</p>`:""}
    ${flagHtml}
    <p class="pr-close">${P.name?esc(P.firstName || P.name.split(" ")[0])+", a":"A"}nything here you do not like, tell me and I will swap it. ${P.closeLead ? esc(P.closeLead)+", and check in wi" : P.noTotals ? "Follow the weights, and check in wi" : "Hit the protein, keep the rest close, and check in wi"}th me during the week.</p><div class="pr-sign">${coach?esc(coach):"OB"}</div>
    ${refsHtml}
    <p class="pr-disclaimer">${COOK_DISCLAIMER} ${esc(DISCLAIMER)}</p>
    ${P.attest?`<p class="pr-attest">Client attestation (apparently-healthy adult, not treating a medical condition, advised to consult physician): <b>Yes</b>.</p>`:""}
    <div class="pr-foot">Nutrition values: USDA FoodData Central and product labels. Vitamin and mineral targets: ${P.sex} reference intakes, ${driAgeLabel(P)}. General wellness recommendations only, not medical advice. <b>OB Health Coaching</b></div>
  </div>`);
  const appTitle = document.title;
  document.title = (P.name ? P.name+" meal plan" : "Meal plan") + " (" + dateStr + ")";
  window.addEventListener("afterprint", ()=>{ document.title = appTitle; }, {once:true});
  window.print();
}
// parse a leading quantity from a portion label ("3 oz" -> 3, "1/2 cup" -> 0.5, "50 berries" -> 50)
function parseLeadQty(s){
  const m = s.match(/^\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+)/);
  if(!m) return 1;
  const t = m[1].trim();
  if(t.includes("/")){ const parts=t.split(/\s+/); let v=0; parts.forEach(p=>{ if(p.includes("/")){const[a,b]=p.split("/").map(Number); v+=a/b;} else v+=Number(p); }); return v||1; }
  return Number(t)||1;
}
const PORT_FRAC = [[0.25,"¼"],[0.33,"⅓"],[0.5,"½"],[0.67,"⅔"],[0.75,"¾"]];
// format a unit count as a human amount: "2", "1½", "¾", "3", round fine for small, coarser for large
function fmtQty(n, thirds){
  // ¼ steps small, ½ steps large. CUPS may also land on ⅓ / ⅔ when closer: those are real measuring cups (80g of
  // almond milk is a ⅓ cup, not a ¼), but a third of an egg white or a shake is not a measure anyone uses.
  let r = n < 4 ? (thirds ? (()=>{ const w=Math.floor(n); return w + [0,0.25,1/3,0.5,2/3,0.75,1].reduce((a,x)=>Math.abs(n-w-x)<Math.abs(n-w-a)?x:a, 0); })()
                          : Math.round(n*4)/4)
                : Math.round(n*2)/2;
  if(r < 0.25) r = 0.25;
  const whole = Math.floor(r + 1e-9), frac = r - whole;
  let fs = "";
  if(frac > 0.08){ const best = PORT_FRAC.reduce((a,p)=> Math.abs(frac-p[0]) < Math.abs(frac-a[0]) ? p : a, [1,""]); fs = best[1]; }
  if(whole === 0) return fs || "¼";
  return fs ? whole + fs : String(whole);
}
// the household amount without the gram suffix, shown on each food row so the coach sees
// "4 large" / "¾ cup" instead of just a gram number (Dylan: eggs shouldn't read as grams).
function householdLabel(f, grams){
  if(!f || !(f.portions||[]).length) return "";
  return bestPortion(f, grams).replace(/\s*\(\d+\s*g\)\s*$/i, "");
}
const PLURAL_UNIT = /^(avocado|slice|cup|container|serving|scoop|shake|bar|bottle|can|packet|piece|tortilla|patty|link|clove|wedge|spear|fillet|breast|stalk|pouch|bag|pita|muffin|cake|potato|sheet|strip|leaf|head|bunch|package|stick|cube|square|cookie|cracker|biscuit|roll|bun|bagel|waffle|pancake|scallop)\b/i;
const pluralWord = w => ({leaf:"leaves", patty:"patties", potato:"potatoes", tomato:"tomatoes"})[w.toLowerCase()] || (/(ch|sh|x)$/i.test(w) ? w+"es" : w+"s");
function bestPortion(f, grams){
  const metric = !!(state.profile && state.profile.metric);   // a client asked for kg (2026-10-08)
  // and with grams only on her PDF, cups and spoons go: the same "1/3 cup" read 50 g one day and 60 g the next, and she
  // weighs everything anyway. A count stays where food comes counted, when it is whole or a half (client review, 2026-10-09)
  // (defined first: the egg-white rule below reads gOnly, and 230 g of whites hit it before its declaration, 2026-10-09)
  const gOnly = metric && !!(state.profile && state.profile.gramsOnly);
  // whole eggs always read as a count of large eggs, never "cup chopped" or grams
  if(/^Egg, whole/i.test(f.name)) return `${fmtQty(grams/50)} large (${grams}g)`;
  // tofu is bought and cut by the package: "½ package (14 oz)", not "¾ cup" of a block
  if(/^Tofu/i.test(f.name)){
    const pk = (f.portions||[]).find(p => /^1 package\b/i.test(p.label));
    if(pk && grams/pk.grams >= 0.2 && grams/pk.grams <= 3) return `${fmtQty(grams/pk.grams, true)} ${esc(pk.label.replace(/^1 /,""))} (${grams}g)`;   // thirds: 150 g is a third of a 14 oz block, not a half
  }
  // egg whites count as whites up to four ("3 large"); past that they read by the cup ("¾ cup"), the way a
  // carton pours and the way a bowl of separated whites is measured, not "5½ large"
  if(/^Egg white/i.test(f.name)){
    const cup = (f.portions||[]).find(p => /^1 cup\b/i.test(p.label)), one = (f.portions||[]).find(p => /^1 large\b/i.test(p.label));
    // to the nearest real measuring cup (thirds too): 150 g printed "½ cup", which is 122 g (a client, 2026-10-03)
    if(cup && one && grams > 4.5*one.grams && !gOnly){ const n = grams/cup.grams; return `${fmtQty(n, true)} cup${n > 1.1 ? "s" : ""} (${grams}g)`; }
    // and a count of whites is whole: 125 g printed "3¾ large" (a client, then a client, 2026-10-08)
    if(one && grams >= one.grams*0.75){ const n = Math.max(1, Math.round(grams/one.grams)); return `about ${n} large (${grams}g)`; }
  }
  // cooking oils + dairy butter read as tsp/tbsp (not "¼ tbsp" or "6 pat"); leave nut butters/avocado alone
  // (only the oils themselves: "Sardines, canned in oil" printed as "6 tbsp" of sardines). A grams-only plan weighs
  // its oil too: her lunch list printed "1¾ tsp (8g)" of olive oil on a plan with no spoons in it (2026-10-09)
  if(((/\boil\b/i.test(f.name) && f.cat==="Fats & Oils") || /^butter,/i.test(f.name)) && !gOnly){
    // the same USDA spoon weights the recipe steps use (oils 4.5 g a tsp, butter 4.7): with a flat 4.7 the row read
    // "2¼ tsp (11g)" of olive oil while the steps, rightly, said 2½. Three teaspoons or more reads as tablespoons.
    const TBSP = tbspGrams(f) || 14, TSP = TBSP/3;
    return Math.round(grams/TSP*4)/4 < 3 ? `${fmtQty(grams/TSP)} tsp (${grams}g)` : `${fmtQty(grams/TBSP)} tbsp (${grams}g)`;
  }
  // a BATCH of meat or fish (a pound or more) reads in pounds. Per-serving amounts still score below and land
  // on ounces; without this a 3-serving cook printed "¾ package" of chicken and "5½ fillet" of sirloin.
  if(metric && isProteinPowder(f)) return `${grams}g`;
  if(gOnly){
    const COUNTED = /^(large|medium|small|extra large|fruit|date|cake|tortilla|slice|sheet|egg|banana|kiwi)\b/i;
    const c = (f.portions||[]).map(p => ({ p, qty: parseLeadQty(p.label), unit: p.label.replace(/^\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+)\s*/, "").trim() }))
      // vegetables read in grams like the rest of the produce, and a slice is bread's count, not cheese's
      .filter(x => COUNTED.test(x.unit) && x.qty > 0 && f.cat!=="Vegetables" && (!/^slice/i.test(x.unit) || f.cat==="Grains & Starches"))
      .map(x => ({ x, n: grams / (x.p.grams / x.qty) }))
      .find(({n}) => (n >= 0.9 && Math.abs(n - Math.round(n)) < 0.1) || Math.abs(n - 0.5) < 0.05);
    if(!c) return `${grams}g`;
    const n = c.n, whole = Math.abs(n - 0.5) >= 0.05, q = whole ? String(Math.round(n)) : "½";
    const unit = c.x.unit.replace(/\s*\([^)]*\)\s*$/, "").replace(/,.*$/, "").replace(/^fruit$/i, /avocado/i.test(f.name) ? "avocado" : "fruit");
    return `${q} ${esc(whole && Math.round(n) > 1 && PLURAL_UNIT.test(unit) ? unit.replace(/^([a-z]+)/i, pluralWord) : unit)} (${grams}g)`;
  }
  if(grams>=454 && (f.cat==="Protein"||f.cat==="Seafood") && !/canned|\bcan\b/i.test(f.name) &&
     /chicken|beef|steak|sirloin|pork|turkey|lamb|bison|salmon|tuna|cod|tilapia|shrimp|fish|mackerel|trout|halibut|snapper|flounder|sausage/i.test(f.name))
    return metric ? kgStr(grams) : `${fmtQty(grams/453.6)} lb (${grams}g)`;
  // meat and fish read in ounces (see below), and an ounce is a weight, so it is valid for any of them even where
  // USDA lists no ounce measure: cooked chicken breast only had "1 cup, chopped" and printed "½ cup" of chicken,
  // and sardines printed "6 tbsp"
  const meatFish = (f.cat==="Protein" || f.cat==="Seafood") && !isProteinPowder(f)
    && /chicken|beef|steak|sirloin|pork|turkey|lamb|bison|venison|duck|salmon|tuna|\bcod\b|tilapia|shrimp|fish|mackerel|trout|halibut|snapper|sardine|crab|lobster|scallop|mussel|oyster|\bham\b|sausage/i.test(f.name);
  // "1 container" with no size (plain nonfat Greek yogurt's, 170 g) is a cup the client cannot check (5.3 oz cups are common), and
  // on a meal-prep card "2 containers" of yogurt sat beside the meal containers (a client's review, 2026-10-16): by the cup
  const ps = (f.portions || []).filter(p => !metric || !/\b(oz|lb|can)\b/i.test(p.label))
    .filter(p => !(/^1 containers?$/i.test(String(p.label).trim()) && (f.portions||[]).some(q => /^1 cup\b/i.test(q.label))))
    .concat(!metric && meatFish && !(f.portions||[]).some(p=>/\boz\b/i.test(p.label)) ? [{label:"1 oz", grams:28.35}] : []);
  if(!ps.length) return metric ? `${grams}g` : `${grams} g`;
  // strip the leading qty from the label so "3 oz" displays as "oz" and counts as 28.3 g/oz, not 85.
  const SMALL_ITEM = /berr|nut\b|kernel|chip|floret|seed|olive|grape|almond/i;       // units you'd never count 30 of
  const PIECE = /large|medium|small|egg|fillet|breast|slice|clove|wedge|banana|tortilla|patty|link|cake|spear|pat\b|each|piece|\bfruit\b|container|\bnaan\b/i;
  let best = null;
  ps.forEach(p => {
    // USDA's "1 serving 1/2 cup" is really a half cup: read it as one, so 132g of sauce prints "½ cup"
    const sv = /^1 serving,?\s+(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+)\s*(cup|tbsp|tsp|oz)\b(.*)$/i.exec(p.label);
    const label = sv ? `${sv[1]} ${sv[2]}${sv[3]}` : p.label;
    const qty = parseLeadQty(label);
    const unit = label.replace(/^\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+)\s*/, "").trim() || label;
    const per = p.grams / qty;                 // grams per ONE of this unit
    if(per <= 0) return;
    const n = grams / per;                      // how many units this serving is
    let pen = 0;
    if(n < 0.2) pen += 60;
    // (but meat reads in ounces right up to the pound: a 400 g cook of chicken thighs printed "3½ thigh without skin",
    // a client, 2026-11-05)
    // (canned fish stays in cans: "3 cans" of tuna is how it is bought)
    if(n > 14 && !/tortilla|slice/i.test(unit) && !(meatFish && !/canned|\bcan\b/i.test(f.name) && /^oz$/i.test(unit))) pen += 90;   // a batch of 16 tortillas is still "16 tortilla", not "13 oz"
    pen += Math.abs(n - Math.round(n*4)/4) * 2; // prefer counts that land near a clean ¼ step
    if(SMALL_ITEM.test(unit) && n > 6) pen += 70;        // "88 berries" -> avoid, prefer cups
    if(f.cat==="Nuts & Seeds" && /shell|yield|kernel/i.test(unit)) pen += 40;   // USDA "in shell, edible yield" labels are not how anyone measures nuts
    // prefer whole-piece units (eggs/slices/tortillas), but NOT a USDA size description that merely contains
    // "large"/"medium": "½ stalk, large (11"-12" long)" of broccoli beat "1 cup, chopped" on that bonus
    const piece = PIECE.test(unit) && !/stalk|"|\bdia\b/i.test(unit);
    if(piece) pen -= 8;
    // whole fruit that lands on a clean count reads as a count ("1 medium", "2 small"), not "1½ cup, sliced":
    // "sliced" also earns the piece bonus above, and USDA size notes (7" to 7-7/8" long) block it for bananas
    // and oranges. The size note is dropped from the printed unit; the grams already say how big.
    // Berries and grapes stay in cups, and "extra small/large" is not how a whole fruit is bought.
    const fruitSize = /fruit/i.test(f.cat||"") && /^(extra small|small|medium|large|extra large|fruit)\s*(\([^)]*\))?$/i.test(unit);
    if(fruitSize && /^(small|medium|large|fruit)\b/i.test(unit) && !/berr|grape|cherr/i.test(f.name) &&
       n>=0.9 && n<=3.1 && Math.abs(n-Math.round(n))<0.1) pen -= piece ? 6 : 14;
    // the printed unit loses what the grams already say ("wedge (1.33 oz)", "container (150g)", "cup (not packed)")
    // and a USDA avocado "fruit, without skin and seed" is an avocado
    const shown = (fruitSize ? unit.replace(/\s*\([^)]*\)\s*$/,"") : unit)
      .replace(/\s*\((?:[\d.\/ ]+\s*(?:fl oz|oz|g)|not packed|packed)\)/gi, "").replace(/^fruit, without skin and seed$/i, /avocado/i.test(f.name) ? "avocado" : "fruit").replace(/, chopped or sliced$/i, ", chopped").replace(/, regular$/i, "").replace(/\s+not packed$/i, "").trim()
      .replace(/^(cups?) (\d)/i, "$1, $2").replace(/^.*$/, x => metric ? cmLabel(x) : x);
    // cheese reads in ounces, not "¾ wedge" or "2¼ slices"; a container is a brand's size, so it only reads as a
    // count when it is a whole one ("1¾ containers" of yogurt is a cup and three quarters); a sweet potato past two
    // "small" ones reads as a medium or large one
    const cheese = /cheese|feta|mozzarella|cheddar|parmesan|goat|halloumi|paneer/i.test(f.name) && !/cottage|ricotta|cream cheese/i.test(f.name);
    if(cheese && /^oz$/i.test(unit)) pen -= 4;
    if(cheese && /slice/i.test(unit) && Math.abs(n-Math.round(n)) > 0.1) pen += 10;   // "2¼ slices" of mozzarella is 2 oz
    if(/NLEA/i.test(unit)) pen += 30;                                                   // a label term, not a measure
    if(/snack[- ]size/i.test(unit)) pen += 20;     // 60 g of rye read "8½ slices, snack-size" (USDA's 7 g slice), not 2 slices
    if(f.cat==="Nuts & Seeds" && /ground/i.test(unit)) pen += 5;                        // a snack's walnuts are pieces
    if(/wedge|cubic inch/i.test(unit)) pen += 6;
    if(/container/i.test(unit) && Math.abs(n-Math.round(n)) > 0.1) pen += 12;
    if(/^small\b/i.test(unit) && n > 2.25 && ps.some(x=>/\b(medium|large)\b/i.test(x.label))) pen += 8;
    // meat and fish read in OUNCES, the way people buy, weigh and pre-portion them. "¾ piece (198g)" hid a
    // client's 7oz raw chicken bag, and "2 fillet (218g)" of sirloin means nothing at the counter.
    if((f.cat==="Protein"||f.cat==="Seafood") && /\b(piece|fillet|breast|thigh|drumstick|leg quarter)\b/i.test(unit)) pen += 10;
    if(meatFish && /\b(cups?|tbsp|tsp)\b/i.test(unit)) pen += 6;   // nobody measures chicken or sardines by the spoon or cup
    if(meatFish && /^oz$/i.test(unit)) pen -= 2;                      // and ounces beat "½ duck"
    if(/packet/i.test(unit)) pen += 5;                   // "3¼ packet (0.5 oz)" of honey reads like a typo
    if(/\bcup\b/i.test(unit)) pen -= 3;                  // cups are friendly for grains/produce
    if(/\btbsp\b|\btsp\b/i.test(unit) && n > 4) pen += 30;  // don't say "11 tbsp of egg"
    // counted nouns go plural past one ("2 slices", "1½ cups"); sizes, fruit and spoon/ounce units do not
    // what the client reads has to be what they weigh. Anything under a quarter rounded UP to "¼", so 15 g of walnuts
    // printed "¼ cup" (29 g) and 8 g of yogurt "¼ container". Under a quarter cup reads in tablespoons, 16 to the
    // cup, and any other unit that cannot show the amount within a quarter of itself sinks.
    if(/^cups?\b/i.test(shown) && n < 0.23 && !(f.cat==="Vegetables" && /spinach|kale|arugula|lettuce|romaine|greens|chard|collard|cabbage/i.test(f.name))){
      // 0.88 of a tablespoon and up reads "1 tbsp": 15 g of almond milk (USDA's cup is 262 g) printed "2¾ tsp" (2026-10-14)
      const tb = n*16, c = { pen: Math.abs(tb - Math.round(tb*4)/4)*2 - 3, txt: tb < 0.88 ? `${fmtQty(tb*3)} tsp (${grams}g)` : `${fmtQty(tb)} tbsp (${grams}g)` };
      if(!best || c.pen < best.pen) best = c; return;
    }
    // an olive or an asparagus spear is counted whole: "13½ large" olives is 13 or 14, and the grams still say which
    const whole = /olive/i.test(f.name) || /^spears?\b/i.test(shown);
    const q = whole ? String(Math.max(1, Math.round(n))) : fmtQty(n, /^cups?\b/i.test(shown) || /^avocado$/i.test(shown));
    const qn = (()=>{ const m = /^(\d*)(.*)$/.exec(q); return (m[1] ? +m[1] : 0) + ((PORT_FRAC.find(x=>x[1]===m[2])||[0])[0]); })();
    if(!whole && Math.abs(qn - n) > 0.25*n) pen += 40;
    const one = q === "1" || /^\D+$/.test(q);                 // "1", "¾", "½": one or less reads singular ("½ spear")
    // a size before the noun pluralises the noun: "1½ small potatoes", not "1½ small potato" (a client's fries)
    const sized = /^(small|medium|large)\s+([a-z]+)$/i.exec(shown);
    const said = (n > 1 && !one && PLURAL_UNIT.test(shown)) ? shown.replace(/^([a-z]+)/i, pluralWord)
      : (n > 1 && !one && sized && PLURAL_UNIT.test(sized[2])) ? shown.replace(/([a-z]+)$/i, pluralWord)
      : one ? shown.replace(/^([a-z]+?)s\b/i, (m, w) => PLURAL_UNIT.test(w) ? w : m) : shown;
    // under a tablespoon reads in teaspoons: "2 tsp" of maple syrup, not "¾ tbsp"
    if(/^tbsp$/i.test(said) && n < 0.88) { if(!best || pen < best.pen) best = { pen, txt: `${fmtQty(n*3)} tsp (${grams}g)` }; return; }
    if(!best || pen < best.pen) best = { pen, txt: `${q} ${esc(said)} (${grams}g)` };
  });
  return best ? best.txt : `${grams} g`;
}

/* -------------------- plug-and-play lists for any client (2026-10-14) -------------------- */
// OB: plug-and-play pages for every client ("on for everyone"), built ONLY from foods already on the client's plan (so it
// can never offer a food they avoid or binge on: a client's nut rule lives in his notes, not in the filters), grams
// only. a client's were hand-built by her builder (profile.buildMeals), and a builder's lists always win.
// For each meal on the plan: one protein, one carb and one fat, each weighed from the food data to that meal's planned
// versions, and every combination checked against a band around them (a pick that throws one out is dropped). A food is
// offered in a meal it already appears in, or in one where it belongs (eggs and yogurt at breakfast, meat at lunch and
// dinner), so a rule like a client's "eggs at breakfast only" holds. A meal with fewer than two real choices in a list, or
// too big for one pick to stand in for (his 73 g of protein at breakfast), gets no list rather than a silly one.
const PNP_KIND = name => /pre[- ]?workout/i.test(name) ? "pre" : /dessert|sweet treat/i.test(name) ? "dessert" : /breakfast/i.test(name) ? "breakfast"
  : /lunch|dinner|supper/i.test(name) ? "main" : "snack";
function pnpFamily(f){
  const n = (f.name||"").toLowerCase();
  if(f.recipe) return "skip";                                                     // a finished recipe is not one pick
  if(isProteinPowder(f) || /protein (shake|bar|drink)|premier protein|david protein|quest bar|fairlife/.test(n)) return "powder";
  if(f.cat==="Condiments & Misc") return "skip";                                 // sauces, spices, drinks, sweeteners
  if(/pasta|noodle|spaghetti|macaroni/.test(n)) return "starch";                 // edamame or chickpea pasta is still pasta
  if(/popcorn|pretzel|chips|crackers?\b|rice crisps|rice cake/.test(n)) return "snackcarb";   // snack carbs (rice cakes too)
  if(/^egg/.test(n)) return "egg";
  if(/yogurt|skyr|cottage cheese|kefir|quark/.test(n)) return "dairy";
  if(f.cat==="Protein" || f.cat==="Seafood") return "meat";
  if(/tofu|tempeh|seitan|edamame/.test(n) || f.cat==="Legumes") return "plant";
  if(f.cat==="Fruits") return /avocado/.test(n) ? "fatsavory" : "fruit";
  if(f.cat==="Vegetables") return /snack|chips/.test(n) ? "skip" : /potato|yuca|cassava|plantain|\bcorn\b|winter squash|pumpkin, canned/.test(n) ? "starch" : "veg";
  if(f.cat==="Grains & Starches") return /\boats?\b|cereal|granola|cream of (rice|wheat)|pancake|waffle|muffin(?! english)/.test(n) && !/english muffin/.test(n) ? "grainbk"
    : /bread|bagel|tortilla|wrap|pita|english muffin|rice cake|\bbun\b|\broll\b/.test(n) ? "bread" : "starch";
  if(f.cat==="Nuts & Seeds") return "fatspread";
  if(f.cat==="Fats & Oils") return /butter/.test(n) && !/^butter/.test(n) ? "fatspread" : "fatcook";
  if(f.cat==="Eggs & Dairy") return /milk|cream\b|half and half/.test(n) ? "skip" : /cheese|feta|mozzarella|parmesan|cheddar|halloumi|paneer/.test(n) ? "fatsavory" : "dairy";
  if(f.cat==="Sweet Treats & Snacks") return /dark chocolate/.test(n) ? "sweet" : "skip";
  return "skip";
}
// what each kind of meal takes from the rest of the plan (a food already in that meal is always offered there); cooking
// oil stays with lunch and dinner (olive oil was offered beside Greek yogurt at breakfast)
const PNP_ALLOW = {
  breakfast: ["egg","dairy","powder","grainbk","bread","fruit","fatspread","fatsavory","veg"],
  snack:     ["dairy","powder","fruit","grainbk","fatspread","snackcarb"],   // no tortillas or buns with cottage cheese
  dessert:   ["dairy","powder","fruit","sweet","fatspread"],
  main:      ["meat","plant","bread","starch","fatcook","fatsavory","veg"],
  pre:       ["fruit","grainbk","bread","starch"],
};
const PNP_NO_OIL = new Set(["breakfast","snack","dessert","pre"]);
const pnpShare = (f, k) => f.kcal > 0 ? (k==="p" ? f.protein_g*4 : k==="f" ? f.fat_g*9 : f.carb_g*4) / f.kcal : 0;
const pnpIsProt = f => ["egg","dairy","powder","meat","plant"].includes(pnpFamily(f)) && f.protein_g >= 6 && pnpShare(f,"p") >= 0.35;
const pnpIsCarb = f => ["grainbk","bread","starch","fruit","snackcarb"].includes(pnpFamily(f)) || (pnpFamily(f)==="plant" && !pnpIsProt(f));
const pnpIsFat  = f => ["fatspread","fatcook","fatsavory","sweet"].includes(pnpFamily(f)) && pnpShare(f,"f") >= 0.5;
// one entry per food: "Turkey, ground 93/7, cooked" and "..., raw" are one food weighed two ways
const pnpBase = f => String(f.name).toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/,\s*(raw|cooked|baked|boiled|roasted|grilled|canned|drained|dry|frozen|flesh)\b.*$/, "").trim();
// a counted food is served whole: one bar or bottle, whole eggs, whole tortillas, buns, bagels, slices and rice cakes
function pnpUnit(f){
  if(/^egg, whole/i.test(f.name)) return { g:50, one:false };
  const pack = (f.portions||[]).find(p => /^1 (bar|shake|bottle|pouch)\b/i.test(p.label));
  if(pack) return { g:pack.grams, one:true };
  const piece = (f.portions||[]).find(p => /^1 (bun|bagel|english muffin|muffin|pita|roll|cake)\b/i.test(p.label));
  if(piece) return { g:piece.grams, one:false };
  const u = unitGrams(f); if(u) return { g:u, one:false };
  return null;
}
function pnpWeigh(f, target, key){
  const per = (f[key]||0)/100; if(!(per > 0) || !(target > 0)) return 0;
  let g = target/per; const u = pnpUnit(f);
  if(u){ const n = u.one ? 1 : Math.max(1, Math.round(g/u.g)); if(n*u.g < g*0.6 || n*u.g > g*1.6) return 0; g = n*u.g; }
  else g = g >= 25 ? Math.round(g/5)*5 : Math.round(g);
  return g >= 5 && g <= maxServeG(f) ? g : 0;
}
// a food carries a meal when it brings a real share of that meal's protein, carbs or fat in some version of it; a
// dollop of yogurt on a taco bowl is not a lunch protein (it was offered as 290 g of yogurt for a client's lunch)
function pnpCarriers(m){
  const t = mealMacros(m), out = new Set();
  (m.items||[]).forEach(it => { const f = FOOD_BY_ID[it.id]; if(!f) return; const r = it.grams/100;
    if(f.protein_g*r >= Math.max(8, 0.4*t.protein_g)) out.add(f.id+"|p");
    if(f.carb_g*r >= Math.max(10, 0.35*t.carb_g)) out.add(f.id+"|c");
    if(f.fat_g*r >= Math.max(4, 0.25*t.fat_g)) out.add(f.id+"|f");
    if(pnpFamily(f)==="veg") out.add(f.id+"|v"); });
  return out;
}
function autoBuildMeals(P, week){
  P = P || state.profile; week = week || state.week;
  const slots = new Map(), carries = new Map();     // food id -> Set of "role@meal name"
  (week||[]).forEach(d => (d.meals||[]).forEach(m => {
    if(!m || !m.name || !(m.items||[]).length) return;
    const s = slots.get(m.name) || { versions:[], sigs:new Set() };
    const sig = JSON.stringify(m.items.map(it => [it.id, Math.round(it.grams)]));
    if(!s.sigs.has(sig)){ s.sigs.add(sig); s.versions.push(m); }
    slots.set(m.name, s);
    pnpCarriers(m).forEach(k => { const [id, role] = k.split("|"); (carries.get(id) || carries.set(id, new Set()).get(id)).add(role+"@"+m.name); });
  }));
  const blocks = [];
  for(const [name, s] of slots){
    const kind = PNP_KIND(name), mm = s.versions.map(mealMacros), mean = a => a.reduce((x,y) => x+y, 0)/a.length;
    const K = mm.map(x => x.kcal), Pg = mm.map(x => x.protein_g);
    const Km = mean(K), Pm = mean(Pg), Cm = mean(mm.map(x => x.carb_g)), Fm = mean(mm.map(x => x.fat_g));
    const band = [Math.min(...K)*0.88, Math.max(...K)*1.12], pFloor = Math.min(...Pg)*0.8;
    // a food is offered for a role when it carries that role in this meal, or in another meal and its kind belongs here
    const offer = role => { const seen = new Map();
      [...carries.entries()].forEach(([id, set]) => { const f = FOOD_BY_ID[id]; if(!f || exclusion(f, P)) return;
        const fam = pnpFamily(f); if(fam==="skip" || (fam==="fatcook" && PNP_NO_OIL.has(kind))) return;
        const here = set.has(role+"@"+name), elsewhere = [...set].some(k => k.startsWith(role+"@"));
        if(!(here || (elsewhere && PNP_ALLOW[kind].includes(fam)))) return;
        const b = pnpBase(f), prev = seen.get(b);
        if(!prev || (here && !prev.here)) seen.set(b, { f, here }); });
      return [...seen.values()].map(x => x.f); };
    const item = x => ({ id:x.f.id, grams:x.g });
    let block = null, vegK = 0;
    if(Pm < 6 || kind==="pre"){
      // a carb-only meal (a pre-workout banana): any carb on the plan that fits it, weighed to its calories
      const carbs = offer("c").filter(pnpIsCarb).map(f => ({ f, g:pnpWeigh(f, Km, "kcal") })).filter(x => x.g)
        .filter(x => { const k = x.f.kcal*x.g/100; return k >= band[0] && k <= band[1]; });
      if(carbs.length >= 2) block = { title:name, note:"Any of these can stand in for it.", groups:[{ head:"Pick one", items:carbs.map(item) }] };
    } else {
      const pT = Pm*0.85;
      let prots = offer("p").filter(pnpIsProt).map(f => ({ f, g:pnpWeigh(f, pT, "protein_g"), own:pnpShare(f,"f") > 0.30 })).filter(x => x.g);
      // a breakfast whose proteins are all sweet (yogurt, a shake) is a sweet breakfast: no tortilla, toast, cheese,
      // avocado or vegetables beside the yogurt ("keep it all sweet or all savory" printed over lists where only sweet
      // could be built, a client); decided on the proteins that made the list, after weighing
      const savouryBk = kind==="breakfast" && prots.some(x => ["egg","meat","plant"].includes(pnpFamily(x.f)));
      const veg = (kind==="main" || savouryBk) ? offer("v") : [];
      vegK = veg.length ? 25 : 0;
      let fats = offer("f").filter(pnpIsFat);
      if(kind==="breakfast" && !savouryBk) fats = fats.filter(f => pnpFamily(f)!=="fatsavory");
      const fatK = Math.max(30, Fm*9 - 18), carbK = Math.max(40, Cm*4*0.9 - vegK) + (fats.length ? 0 : fatK);
      let carbs = offer("c").filter(pnpIsCarb).filter(f => kind!=="breakfast" || savouryBk || ["fruit","grainbk"].includes(pnpFamily(f)))
        .map(f => ({ f, g:pnpWeigh(f, carbK, "kcal") })).filter(x => x.g);
      fats = fats.map(f => ({ f, g:pnpWeigh(f, fatK, "kcal") })).filter(x => x.g);
      const tot = arr => arr.reduce((a,x) => ({ k:a.k + x.f.kcal*x.g/100, p:a.p + x.f.protein_g*x.g/100 }), { k:vegK, p:0 });
      const combos = () => { const out = [];
        prots.forEach(p => carbs.forEach(c => { if(!p.own && fats.length) fats.forEach(fa => out.push([p,c,fa])); else out.push([p,c]); }));
        return out; };
      // drop the pick behind the most combinations outside the band or under the protein floor, until none are
      for(let guard = 0; guard < 60; guard++){
        const bad = combos().filter(cb => { const t = tot(cb); return t.k < band[0] || t.k > band[1] || t.p < pFloor; });
        if(!bad.length) break;
        const count = new Map(); bad.forEach(cb => cb.forEach(x => count.set(x, (count.get(x)||0) + 1)));
        const worst = [...count.entries()].sort((a,b) => b[1]-a[1])[0][0];
        prots = prots.filter(x => x !== worst); carbs = carbs.filter(x => x !== worst); fats = fats.filter(x => x !== worst);
      }
      const lean = prots.filter(p => !p.own), own = prots.filter(p => p.own);
      if(!lean.length) fats = [];
      if(prots.length >= 2 && carbs.length >= 2 && combos().length){
        const allFruit = carbs.every(x => pnpFamily(x.f)==="fruit");
        const heads = kind==="dessert" ? { carb:"Sweet", fat:"Extra" } : kind==="snack" ? { carb: allFruit ? "Fruit" : "Carb or fruit", fat:"Extra" } : { carb:"Carb", fat:"Fat" };
        const groups = [];
        if(lean.length) groups.push({ head:"Protein", note: fats.length ? `With ${kind==="main"||kind==="breakfast" ? "a fat" : "an extra"} from the list below.` : "", items:lean.map(item) });
        if(own.length) groups.push(lean.length ? { head:"Or a protein with its own fat", note:"One of these instead, and nothing from the last list.", items:own.map(item) }
                                               : { head:"Protein", items:own.map(item) });
        groups.push({ head:heads.carb, items:carbs.map(item) });
        if(fats.length) groups.push({ head:heads.fat, note:"Only with a protein from the first list.", items:fats.map(item) });
        const parts = ["one protein", `one ${heads.carb.toLowerCase()}`].concat(fats.length ? [`one ${heads.fat.toLowerCase()}`] : []);
        let note = parts.join(", ").replace(/, ([^,]*)$/, veg.length ? ", $1" : " and $1").replace(/^o/, "O") + (veg.length ? ", and all the vegetables you want." : ".");
        if(savouryBk) note = "Keep it all sweet or all savory: " + note.charAt(0).toLowerCase() + note.slice(1);
        block = { title:name, note, groups };
        if(veg.length) Object.assign(block, { freeHead:"Vegetables", free:`As much as you like: ${[...new Set(veg.map(f => plainName(f)))].join(", ")}.` });
      }
    }
    if(block) blocks.push(block);
  }
  // two meals with the same lists, to the gram (a dinner whose second plate is tomorrow's lunch), print once
  const sigOf = b => JSON.stringify(b.groups.map(g => [g.head, g.items.map(it => [it.id, it.grams])]));
  const merged = [];
  blocks.forEach(b => { const twin = merged.find(x => sigOf(x)===sigOf(b));
    if(twin) twin.title = `${twin.title} or ${b.title.toLowerCase()}`; else merged.push(b); });
  if(!merged.length) return null;
  const trades = (P.trades||[]).length ? " It does not count as your trade." : "";
  return { auto:true, title:"Plug-and-play meals",
    intro:`Any time a planned meal does not work for you, build that meal from its lists below. Each weight is set so the meal stands in for the one on your plan and nothing else in your day changes, so the same food can weigh differently from one meal to the next.${trades} Weigh each food the way its line says (raw, cooked or dry). They are all foods already on your plan.`,
    noScaleHead:"No scale, or eating out?",
    // a builder's own line wins: for a client with a restriction history, "nothing fried, add no fat" read as a diet rule
    // beside her gentler eating-out page (a client, 2026-10-30)
    noScale:P.pnpNoScale || "Use your hand: a palm of protein, a cupped hand of carbs, a thumb of fat and at least a fist of vegetables. At a restaurant, order a grilled protein with a carb and vegetables, nothing fried, and add no fat: the oil it is cooked in is your fat. Or message me the menu and I will pick.",
    blocks:merged };
}

/* -------------------- travel days (2026-10-14) -------------------- */
// OB picked a travel page any client can get (the coach ticks "Travel-day page"), and a client needs hers
// before Spain (Oct 30 to Nov 13): a builder's own page (profile.travel) wins over this general one. The general page
// packs foods ALREADY on the plan that travel without a fridge, at the amounts the plan serves them, and gives the hand
// measure for hotel breakfasts, stops on the road and restaurants. No calories: grams and hands only.
function pnpTravels(f){
  const n = (f.name||"").toLowerCase(), fam = pnpFamily(f);
  if(fam==="powder") return true;                                              // bars, bottled shakes, and powder in a shaker
  if(/canned|pouch|jerky/.test(n) && (f.cat==="Protein" || f.cat==="Seafood")) return true;
  if(fam==="snackcarb") return true;                                             // rice cakes, crackers, popcorn
  if(fam==="fruit") return /^(apple|banana|orange|clementine|tangerine|mandarin|pear)/.test(n);
  if(fam==="fatspread") return /almond|cashew|walnut|pecan|pistachio|peanut/.test(n) && !/butter/.test(n);   // nuts; chia is a topping
  return false;
}
function autoTravel(P, week){
  P = P || state.profile; week = week || state.week;
  const served = new Map();                                                      // food id -> grams served on the plan
  (week||[]).forEach(d => (d.meals||[]).forEach(m => (m.items||[]).forEach(it => { const f = FOOD_BY_ID[it.id];
    if(f && pnpTravels(f) && !exclusion(f, P)) (served.get(f.id) || served.set(f.id, []).get(f.id)).push(it.grams); })));
  const pack = [...served.entries()].map(([id, gs]) => { const f = FOOD_BY_ID[id]; let g = gs.slice().sort((a,b) => a-b)[Math.floor(gs.length/2)];
    // fruit travels whole: "an orange", not "⅓ cup, sections" from a recipe
    const ps = f.portions||[], med = pnpFamily(f)==="fruit" && (ps.find(p => /^1 (medium|fruit)\b/i.test(p.label)) || ps.find(p => /^1 (small|large)\b/i.test(p.label)));
    if(med) g = Math.max(1, Math.round(g/med.grams))*med.grams;
    return `${f.name}: ${bestPortion(f, Math.round(g)).replace(/<[^>]+>/g, "")}`; });
  // the examples follow the diet: no tuna or chicken for a vegetarian, no eggs or yogurt for a vegan
  const diet = String(P.diet||"omnivore");
  const bkProt = diet==="vegan" ? "tofu, a plant protein yogurt or a protein shake" : diet==="ovo" ? "eggs or an omelet" : "eggs, an omelet or Greek yogurt";
  const bkFat = diet==="vegan" ? "avocado or a few nuts" : "avocado or a little cheese";
  const stopProt = diet==="vegan" ? "a plant protein bar or shake, edamame or a bean salad" : diet==="vegetarian" || diet==="ovo" ? "eggs, Greek yogurt, or a protein shake or bar"
    : diet==="pescatarian" ? "eggs, Greek yogurt, tuna or a protein box" : "eggs, Greek yogurt, a protein box, tuna or chicken";
  const lists = P.plugAndPlay !== false && !!(P.buildMeals || autoBuildMeals(P, week));
  const sections = [];
  if(pack.length) sections.push({ head:"Pack these", text:"Foods from your plan that travel without a fridge, at the amounts your plan serves them:", lines:pack });
  sections.push({ head:"Hotel breakfast", text:`A palm of protein (${bkProt}), a cupped hand of carbs (fruit, oatmeal or one slice of toast) and a thumb of fat (${bkFat}). Coffee black.` });
  sections.push({ head:"Airport and road stops", text:`Find the protein first: ${stopProt}. Add a piece of fruit, and walk past the pastries.` });
  sections.push({ head:"Restaurants", text:"Order your own plate first: a grilled protein, vegetables and one carb, nothing fried, with the sauce on the side. The oil it is cooked in is your fat. From shared starters, take the protein and the vegetables." });
  sections.push({ head:"Back home", text:"Your next meal goes back on the plan as written. There is nothing to make up for." });
  return { auto:true, title:"Travel days",
    intro:`Travel days run on the same plan. Eat the planned meal when you can${lists ? ", build it from your plug-and-play lists when you cannot," : ","} and use your hand when there is no scale: a palm of protein, a cupped hand of carbs, a thumb of fat and at least a fist of vegetables.`,
    sections };
}

// ---- change calories in one step (2026-10-14: "lower sarahs calories by 200 ... only pull from carbs ... she already went
// shopping" took a hand-built rebuild of her week). Same foods and the same protein: only the portions of the macro that
// absorbs the change move, in steps a person can weigh (whole tortillas, slices and buns stay whole). A portion shared by
// several days (the same breakfast every day, the A-day lunch) is one lever and moves on all of them together, so a
// repeated meal stays identical. "Already shopped" lets no portion grow. Nothing changes until the coach applies it.
const rtRole = (f, from) => { if(!f || f.recipe) return false; const fam = pnpFamily(f);
  if(from === "fat") return pnpShare(f,"f") >= 0.6 && ["fatspread","fatcook","fatsavory","sweet"].includes(fam);
  return pnpShare(f,"c") >= 0.5 && ["grainbk","bread","starch","fruit","snackcarb"].includes(fam); };
function retargetWeek(P, week, opts){
  const delta = Math.round(+opts.delta || 0), from = opts.from || "carbs", lock = !!opts.lock;
  const W = JSON.parse(JSON.stringify(week||[])), notes = [];
  const used = W.map((d, di) => ({ d, di, before:mealsTotals(d.meals||[], false).kcal })).filter(x => x.before > 0);
  if(!used.length) return { week:W, profile:Object.assign({}, P), days:[], off:[], notes:["The plan has no meals yet."] };
  const target = new Map(used.map(x => [x.di, x.before + delta]));
  // levers: the same food in the same meal at the same weight on several days moves as one
  const groups = new Map();
  used.forEach(({ d, di }) => (d.meals||[]).forEach(m => (m.items||[]).forEach(it => {
    const f = FOOD_BY_ID[it.id]; if(!f || it.fixed) return;
    const role = from==="both" ? (rtRole(f,"carbs") || rtRole(f,"fat")) : rtRole(f, from); if(!role) return;
    const k = `${m.name}|${it.id}|${Math.round(it.grams)}`;
    const g = groups.get(k) || groups.set(k, { f, g0:it.grams, items:[], days:new Set() }).get(k);
    g.items.push(it); g.days.add(di); })));
  const L = [...groups.values()];
  if(!L.length) return { week:W, profile:Object.assign({}, P), days:[], off:[], notes:[`No ${from==="both" ? "carb or fat" : from==="fat" ? "fat" : "carb"} portions on the plan to change.`] };
  const unit = f => { const u = pnpUnit(f); return u && !u.one ? u.g : null; };
  const setG = (x, g) => x.items.forEach(it => { it.grams = g; });
  const kcalDay = di => mealsTotals(W[di].meals||[], false).kcal;
  const floor = x => Math.max(unit(x.f) || 5, x.g0*0.15), ceil = x => Math.min(maxServeG(x.f), lock ? x.g0 : Infinity);
  // first pass: every lever by the same share of its calories, then rounded to what a person weighs
  const leverK = L.reduce((a, x) => a + x.f.kcal*x.g0/100*x.days.size, 0);
  const factor = Math.max(0.15, (leverK + delta*used.length)/Math.max(1, leverK));
  if(delta < 0 && factor === 0.15) notes.push("That is most of the plan's carbs or fat: check the portions before you save.");
  L.forEach(x => { const u = unit(x.f); let g = x.g0*factor;
    g = u ? Math.max(u, Math.round(g/u)*u) : (g >= 25 ? Math.round(g/5)*5 : Math.max(1, Math.round(g)));
    setG(x, Math.min(Math.max(g, floor(x)), ceil(x))); });
  // then land the days: the one step (5 g, 1 g, or a whole piece) that most lowers the miss across the week, repeatedly
  const miss = () => used.reduce((a, { di }) => { const e = target.get(di) - kcalDay(di); return a + e*e; }, 0);
  for(let i = 0; i < 400; i++){
    const m0 = miss(); let best = null, bestM = m0;
    L.forEach(x => { const u = unit(x.f) || (x.items[0].grams >= 25 ? 5 : 1); const g = x.items[0].grams;
      [g+u, g-u].forEach(g1 => { if(g1 < floor(x) - 1e-9 || g1 > ceil(x) + 1e-9) return; setG(x, g1); const m1 = miss(); if(m1 < bestM - 1e-9){ bestM = m1; best = { x, g1 }; } setG(x, g); }); });
    if(!best) break; setG(best.x, best.g1);
  }
  const P2 = Object.assign({}, P); P2.tCal = Math.round(+P.tCal + delta);
  if(from==="carbs") P2.tCarb = Math.round(+P.tCarb + delta/4);
  else if(from==="fat") P2.tFat = Math.round(+P.tFat + delta/9);
  else { const ck = +P.tCarb*4, fk = +P.tFat*9, t = Math.max(1, ck+fk); P2.tCarb = Math.round(+P.tCarb + delta*(ck/t)/4); P2.tFat = Math.round(+P.tFat + delta*(fk/t)/9); }
  const days = used.map(({ d, di, before }) => ({ name:d.name || DAY_WORDS[di], before:Math.round(before), after:Math.round(kcalDay(di)), target:Math.round(target.get(di)) }));
  const off = days.filter(x => Math.abs(x.after - x.target) > Math.max(15, x.target*0.01)).map(x => `${x.name} lands at ${x.after} (aim ${x.target})`);
  if(lock && delta > 0) notes.push("With 'already shopped' on, no portion can grow, so calories cannot go up: untick it to add food.");
  // the biggest meal of a day can change when every carb loses the same share (a client's breakfast must stay biggest)
  used.forEach(({ di }) => { const top = (meals) => (meals||[]).map(m => [m.name, mealMacros(m).kcal]).sort((a,b) => b[1]-a[1])[0];
    const t0 = top(week[di].meals), t1 = top(W[di].meals);
    if(t0 && t1 && t0[0] !== t1[0]) notes.push(`${W[di].name || DAY_WORDS[di]}: ${t1[0].toLowerCase()} is now bigger than ${t0[0].toLowerCase()}.`); });
  return { week:W, profile:P2, days, off, notes };
}

/* -------------------- dessert / snack meals -------------------- */
let _treatIdx=0, _snackIdx=0;
// recipes respect the client's diet/allergy/halal/kosher/gluten/can't-have screens too, a vegan
// must never be served a dairy/tuna/gelatin treat (recipe usda lists its ingredients so exclusion works).
// They respect the store rule as well: a recipe that needs a specialty ingredient is only offered to a client who
// opted in. Among the rest, the next one comes from the treats that fit a sensible budget (about 12% of the day's
// calories, 120 to 300) with the most protein per calorie, rotating through the best eight so a week still varies.
// It used to be plain rotation through all of them, so a 1,400-calorie client could get the 325-calorie ice cream
// while a 150-calorie option sat unused.
const recipesByKind = kind => {
  const P = state.profile;
  // "use animal protein" is the omnivore rule for main dishes; a tofu chocolate mousse is dessert, not a protein swap
  const ok = FOODS.filter(f => { const ex = f.recipe && f.kind===kind ? exclusion(f, P) : "no"; return f.recipe && f.kind===kind && (!ex || ex==="use animal protein"); })
    .filter(f => true
    && !(f.ingredients||[]).some(i => { const g = foodByName(i.name); return g && tierOf(g)==="specialty" && !optedIn(P, g); }));
  const per = f => (f.kcal||0)*(f.serving_g||150)/100;
  const budget = Math.max(120, Math.min(300, 0.12*(+P.tCal||2000)));
  const fits = ok.filter(f => per(f) <= budget*1.1);
  const pool = (fits.length >= 3 ? fits : ok).slice().sort((a,b) => (b.protein_g/(b.kcal||1)) - (a.protein_g/(a.kcal||1)));
  return pool.slice(0, Math.min(8, pool.length));
};
function addRecipeMeal(name, kind, idxRef){
  const recs = recipesByKind(kind);
  const items = [];
  if (recs.length){ const rc = recs[idxRef.i++ % recs.length]; items.push({id:rc.id, grams: rc.serving_g || 150}); }
  snapshotMeals();
  state.meals.push({ name, items });
  fitDayToTargets();          // rebalance staple meals so the day still hits its targets
  // a treat/snack eats into the calorie+fat budget, which can starve protein (esp. high-protein cuts).
  // run the same backstops as auto-draft so adding a treat doesn't tank protein/fiber.
  boostFiber(state.meals, state.profile);
  boostProtein(state.meals, state.profile);
  render();
  const last = $("meals").lastElementChild; if(last) last.scrollIntoView({block:"center"});
}
const _ti={i:0}, _si={i:0};
function addTreatMeal(){ addRecipeMeal($("pSex").value==="female" ? "Sweet treat" : "Dessert", "sweet treat", _ti); }
function addSnackMeal(){ addRecipeMeal("Snack", "snack", _si); }

// re-draft just the current day (keep the other 6)
function redraftDay(){
  const P=readForm(); state.profile=P;
  if(!buildPools(P,1)){ uiAlert("Too many exclusions, loosen the allergies / diet."); return; }
  snapshotMeals();
  let Pd = P.banking ? Object.assign({}, P, dayTargets(P, state.dayIdx)) : P;   // honor this day's banked target
  // meal prep: re-draft the whole batch this day belongs to, built for that batch's length (fresh day stays fresh)
  const fresh = /^fresh/.test((state.week[state.dayIdx]||{}).prepBatch||"");
  if(P.prep) Pd = Object.assign({}, Pd, { prepBatchDays: prepBatchDaysOf(state.dayIdx).length, prepFresh: fresh });
  const saved2 = state.profile; state.profile = Pd;   // sizing reads state.profile — match the banked day
  const day = buildOneDay(Pd, (seedCounter+=53)) || [];
  if(fresh) day.forEach(x=>{ x.fresh = true; if(x.cook){ delete x.cook.prepMethod; delete x.cook.makes; } });
  setMeals(day);
  state.profile = saved2;
  syncPrepBatch();
  render();
}
function clearDay(ok){
  if(!state.meals.length) return;
  if(ok!==true){ uiConfirm(`Clear ${state.week[state.dayIdx].name}'s meals?`, ()=>clearDay(true), null, "Clear day"); return; }
  snapshotMeals(); setMeals([]); render();
}
function duplicateClient(){
  const cur=$("clientSelect").value;
  const base=(readForm().name||cur||"Client").trim();
  uiPrompt("Name for the duplicate:", base+" (copy)", raw=>duplicateClientNamed((raw||"").trim()));
}
function duplicateClientNamed(name, ok){
  if(!name) return;
  const store=loadStore();
  if(store[name] && ok!==true){ uiConfirm(`"${name}" already exists. Overwrite it?`, ()=>duplicateClientNamed(name, true), null, "Overwrite"); return; }
  const P=readForm(); P.name=name; state.profile=P; $("pName").value=name;
  store[name]={ profile:P, week:state.week, dayIdx:state.dayIdx };
  if(saveStore(store)){ refreshClientSelect(name); clearDirty(); flash($("dupClientBtn"),"Duplicated ✓"); }
}
const TARGET_PRESETS = {
  "Female · fat loss · 1500": {tCal:1500,tPro:140,tCarb:120,tFat:50},
  "Female · fat loss · 1700": {tCal:1700,tPro:150,tCarb:150,tFat:55},
  "Female · maintain · 2000": {tCal:2000,tPro:150,tCarb:205,tFat:62},
  "Male · fat loss · 2000":   {tCal:2000,tPro:180,tCarb:170,tFat:60},
  "Male · fat loss · 2300":   {tCal:2300,tPro:190,tCarb:215,tFat:70},
  "Male · maintain · 2700":   {tCal:2700,tPro:200,tCarb:290,tFat:80},
  // building muscle: protein held near 0.8-1 g/lb, fat at 25% of calories, the rest carbs (4-4-9 adds up to the total)
  "Female · build muscle · 2200": {tCal:2200,tPro:140,tCarb:270,tFat:62},
  "Male · build muscle · 2800":   {tCal:2800,tPro:180,tCarb:345,tFat:78},
  "Male · build muscle · 3200":   {tCal:3200,tPro:190,tCarb:410,tFat:90},
};
function applyPreset(key){
  const p=TARGET_PRESETS[key]; if(!p) return;
  $("tCal").value=p.tCal; $("tPro").value=p.tPro; $("tCarb").value=p.tCarb; $("tFat").value=p.tFat;
  if(p.tCal>=2000 && $("pSex").value==="female" && /Male/.test(key)) {}   // (sex left to coach)
  // the preset names its goal, and the goal changes how the draft is built, so set it too
  if($("pGoal")) $("pGoal").value = /build muscle/.test(key) ? "gain" : /maintain/.test(key) ? "maintain" : "loss";
  updateMacroHint(); markDirty(); if(state.meals.length) renderScore();
  $("presetSel").value="";
}

/* -------------------- init -------------------- */
function init(){
  renderAllergenChips();
  renderSupplementChips();
  renderScreenChips();
  updateScreenBanner();
  $("appDisclaimer").textContent = DISCLAIMER;
  refreshClientSelect("");
  offerLostClients();
  catchUpHistory();                                   // versions changed outside the planner (2026-10-14)
  updateMacroHint();
  render();
  updateSaveMarker();
  // warn before losing unsaved work; mark dirty on profile edits (except the global coach name)
  window.addEventListener("beforeunload", e=>{ if(dirty && weekHasMeals()){ e.preventDefault(); e.returnValue=""; } });
  const prof=document.querySelector(".profile");
  if(prof) prof.addEventListener("input", e=>{ if(e.target.id!=="coachName") markDirty(); });
  // keyboard shortcuts: ⌘/Ctrl+S save · ⌘/Ctrl+Enter draft · ←/→ switch days
  document.addEventListener("keydown", e=>{
    const modalOpen = !$("pickerBackdrop").classList.contains("hidden") || !$("infoBackdrop").classList.contains("hidden") || !$("groceryBackdrop").classList.contains("hidden");
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="s"){ e.preventDefault(); saveCurrent(); return; }
    if((e.metaKey||e.ctrlKey) && e.key==="Enter"){ e.preventDefault(); generatePlan(); return; }
    if(modalOpen || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName||"")) return;
    if(e.key==="ArrowLeft"){ switchDay(state.dayIdx-1); }
    else if(e.key==="ArrowRight"){ switchDay(state.dayIdx+1); }
  });

  $("generateBtn").addEventListener("click", generatePlan);
  $("addMealBtn").addEventListener("click", ()=>{ state.meals.push({name:"Meal "+(state.meals.length+1), items:[]}); render(); });
  $("addSnackBtn").addEventListener("click", addSnackMeal);
  $("addTreatBtn").addEventListener("click", addTreatMeal);
  $("redraftDayBtn").addEventListener("click", redraftDay);
  $("clearDayBtn").addEventListener("click", clearDay);
  $("dupClientBtn").addEventListener("click", duplicateClient);
  $("presetSel").addEventListener("change", e=>applyPreset(e.target.value));
  $("fitBtn").addEventListener("click", ()=>{ if(state.meals.length){ snapshotMeals(); fitDayToTargets(); render(); } });
  $("undoBtn").addEventListener("click", undoMeals);
  $("copyBtn").addEventListener("click", ()=>{
    if(!state.meals.length){ uiAlert("Build a plan first."); return; }
    copyText(planAsText()).then(()=>flash($("copyBtn"),"Copied ✓"));
  });
  $("exportClientsBtn").addEventListener("click", exportClients);
  $("importClientsBtn").addEventListener("click", ()=>$("importFile").click());
  $("importFile").addEventListener("change", e=>{
    if(e.target.files && e.target.files[0]) importClientsFile(e.target.files[0]);
    e.target.value="";
  });
  $("pickerSearch").addEventListener("keydown", e=>{
    if(e.key!=="Enter") return;
    const first=$("pickerList").querySelector(".picker-item:not(.excluded)");
    if(first) first.click();
  });
  updateUndoBtn();
  $("exportBtn").addEventListener("click", buildPrint);
  $("saveClientBtn").addEventListener("click", saveCurrent);
  $("historyBtn").addEventListener("click", openHistory);
  $("retargetBtn").addEventListener("click", openRetarget);
  $("retargetClose").addEventListener("click", closeRetarget);
  $("rtPreview").addEventListener("click", previewRetarget);
  $("rtApply").addEventListener("click", applyRetarget);
  ["rtDelta","rtFrom","rtLock"].forEach(id => $(id).addEventListener("change", () => { _rt = null; $("rtApply").disabled = true; }));   // a changed setting needs a new preview
  $("historyClose").addEventListener("click", closeHistory);
  $("historyBackdrop").addEventListener("click", e => { if(e.target === $("historyBackdrop")) closeHistory(); });
  $("deleteClientBtn").addEventListener("click", deleteClient);
  $("clientSelect").addEventListener("change", e=>loadClient(e.target.value));
  ["tCal","tPro","tCarb","tFat"].forEach(id=>$(id).addEventListener("input", ()=>{ updateMacroHint(); if(state.meals.length) renderScore(); }));
  $("genMacrosBtn").addEventListener("click", generateMacros);
  $("calcBtn").addEventListener("click", calcTargets);
  // calorie banking: update the day's targets/score live when toggled
  $("pBanking").addEventListener("change", ()=>{ state.profile.banking=$("pBanking").checked; $("pBankIntensity").style.display=$("pBanking").checked?"":"none"; if(state.meals.length) renderScore(); });
  $("pBankIntensity").style.display=$("pBanking").checked?"":"none";   // hidden unless banking is on
  $("pPrep").addEventListener("change", syncPrepWraps);
  if($("pPrepCook")) $("pPrepCook").addEventListener("change", syncPrepWraps);
  syncPrepWraps();
  $("pBankIntensity").addEventListener("change", ()=>{ state.profile.bankIntensity=$("pBankIntensity").value; if(state.meals.length) renderScore(); });
  $("pSex").addEventListener("change", ()=>{ state.profile.sex=$("pSex").value; if(state.meals.length) renderScore(); });
  $("pAttest").addEventListener("change", ()=>{ state.profile.attest=$("pAttest").checked; });
  $("pNote").addEventListener("input", ()=>{ state.profile.note=$("pNote").value; });
  // coach name is a global setting (same coach, many clients)
  const coachInput=$("coachName"); coachInput.value=localStorage.getItem("ob_coach")||"";
  coachInput.addEventListener("input", ()=>localStorage.setItem("ob_coach", coachInput.value));
  const amzInput=$("amazonTag"); amzInput.value=DEFAULT_AMAZON_TAG;   // hardcoded OB affiliate tag, read-only
  // day-level + grocery controls
  $("groceryBtn").addEventListener("click", openGrocery);
  $("groceryClose").addEventListener("click", closeGrocery);
  $("groceryBackdrop").addEventListener("click", e=>{ if(e.target===$("groceryBackdrop")) closeGrocery(); });
  $("groceryCopyBtn").addEventListener("click", ()=>copyText(groceryAsText()).then(()=>flash($("groceryCopyBtn"),"Copied ✓")));
  $("copyDayBtn").addEventListener("click", copyDayToWeek);
  $("pickerClose").addEventListener("click", closePicker);
  $("pickerBackdrop").addEventListener("click", e=>{ if(e.target===$("pickerBackdrop")) closePicker(); });
  $("pickerSearch").addEventListener("input", e=>renderPicker(e.target.value));
  $("infoClose").addEventListener("click", closeInfo);
  $("infoBackdrop").addEventListener("click", e=>{ if(e.target===$("infoBackdrop")) closeInfo(); });
  $("dialogOk").addEventListener("click", ()=>closeDialog(true));
  $("dialogCancel").addEventListener("click", ()=>closeDialog(false));
  $("dialogBackdrop").addEventListener("click", e=>{ if(e.target===$("dialogBackdrop")) closeDialog(false); });
  document.addEventListener("keydown", e=>{
    if($("dialogBackdrop").classList.contains("hidden")) return;
    if(e.key==="Escape"){ e.preventDefault(); e.stopPropagation(); closeDialog(false); }
    else if(e.key==="Enter"){ e.preventDefault(); e.stopPropagation(); closeDialog(true); }
  }, true);
  document.addEventListener("keydown", e=>{ if(e.key!=="Escape") return;
    if(!$("pickerBackdrop").classList.contains("hidden")) closePicker();
    if(!$("infoBackdrop").classList.contains("hidden")) closeInfo();
    if(!$("groceryBackdrop").classList.contains("hidden")) closeGrocery();
  });
}
// Number inputs change value when the mouse WHEEL scrolls over them while focused — a coach scrolling the
// page past a focused Calories field silently rewrote the client's target (caught live: 2000 -> 20 -> 2400).
// Blur on wheel so scrolling never edits a number.
document.addEventListener("wheel", e => {
  const a = document.activeElement;
  if(a && a.tagName === "INPUT" && a.type === "number" && (a === e.target || a.contains(e.target))) a.blur();
}, { passive: true });
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init); else init();
// -------- deterministic TEST API (function-level, no DOM scraping). Read-only refs + a profile-scoped runner
// so an in-page test suite can mass-generate days and assert per-item invariants. Harmless in production. --------
window.__obTest = { autoBuildMeals, pnpFamily, autoTravel, planDiff, recFp, retargetWeek,
  FOODS, FOOD_BY_ID, TEMPLATES,
  bestPortion, shoppingAmount, properCase, planText, planSteps, seasonText, fitSteps, oilLine, listExtrasLine, tplKitchenOK, recipesByKind, mealProtFamilies, protFamily, suppULWarnings, detectGaps, suppFor, suppBrands, ulOvershoot, planFoodDays, suppLabel, suppDose, supplementOrderList, amazonProductUrl, buildPrepWeek, mealEatenCold, PREP_SCHEDULES, prepSchedule, prepOverFridge, mealStorage, foodStorageCat, tplKeep, tplBatchCost, mealPrepNote, prepPackHTML, prepBatchCount,
  buildOneDay, mealsTotals, maxServeG, PRODUCE_GRAMS, allowedFoods, exclusion, dayTargets, fitCalories,
  fitDayToTargets, refineMeals, leverFloor, isProteinPowder, role, animalFlags, defaultProfile, state,
  buildFromTemplate, tplBuildable, tplSlot, curTargets, render, boostFiber, boostProtein, fixProteinShortfall, rerollMeal,
  sanitizeMeals, balancePlate, balanceMealSizes, balanceProteinAcrossMeals, balanceFat, capDayRepeats, dishProtein,
  balanceProtein, balanceCarb, balanceMacro, fitMacros, settleDay, snapWholeUnits, itemCap, servingCeiling, quantizeG, carbsForCalories,
  leanFatTarget, tightCarbTarget, macroErrOfTotals, PRODUCE_GRAMS, unitGrams,
  weeklyGrocery, purchaseAmount, shoppingAmount, loggingCheckRows,
  plantVariety, plantOf, buildPrepWeek, dayLabel, dayWords, prepTitle, prepCookDaysText, mealPrepNote, groceryByCook, dbNamesToKitchen, kitchenName, fitAmounts, amtValue, fiberTypeCoverage, fiberRampNote, stepsMismatch, listExtras, dishTitle, recipeExtras, clientSwap, unitGrams, realKcalOf, carbsForCalories,
  // so a plan built by a script gets the same essential supplements the UI auto-prescribes
  detectGaps, autoEnableEssentialSupps,
  // run fn with state.profile temporarily set to P (maxServeG/PRODUCE_GRAMS read the global profile)
  withProfile(P, fn){ const s=state.profile; state.profile=P; try{ return fn(); } finally{ state.profile=s; } },
};
})();
