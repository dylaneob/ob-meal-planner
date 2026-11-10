// Template linter: catches the recurring "the dish lies" classes at the DATA layer, before a plan is ever built.
// Usage: node app/lint-templates.js [--fail-on-warn]     Exit 1 on any ERROR.
// Classes (each one was found the hard way in a real client plan):
//   unresolved     a slot option matches no food (the food silently vanishes)
//   fat-as-protein the protein slot leads with a fat/spread (a snack once used peanut butter as its protein lever)
//   vessel         title says wrap/taco/sandwich/toast/pita/pizza but no bread/tortilla can fill the carb slot
//   baked-grain    pancakes/muffins/oat cups/bars must keep a grain in the carb slot and never a fruit ("3 pancakes" of banana+egg)
//   egg-dish       migas/scramble/frittata/omelet must offer egg as the protein
//   form           "roasted/grilled/charred/mashed X" but X is only offered raw (roasted carrots served raw)
//   title-noun     a food named in the title that no slot or extra can deliver (edamame nowhere in the meal)
//   banned-prose   mushrooms anywhere in the copy (hard exclusion)
//   em-dash        em/en dashes in client-facing copy (house rule: no AI tells)
//   form-leak      a protein/fat/produce option that also matches a pasta or noodle (edamame snack served as pasta)
//   prose-foreign  METRIC: foods named in the steps that the template never offers in any slot/extra
//   batch-shape    a meal-prep (prepMethod) recipe missing what a beginner needs: 8+ numbered steps, one per line, opening
//                  with the equipment; cooling, dividing, storing and reheating (or eating cold); and the USDA FSIS safe
//                  temperature when it offers meat, fish or egg. All 164 were rewritten to this on 2026-10-06.
"use strict";
const path=require("path");
global.window=global;
require(path.join(__dirname,"data/foods.js")); require(path.join(__dirname,"data/templates.js")); require(path.join(__dirname,"data/foodnouns.js"));
const F=window.OB_FOODS, T=window.OB_MEAL_TEMPLATES, NOUNS=window.OB_FOOD_NOUNS, FREE=window.OB_FREE_WORDS;
const norm=n=>n.replace(/,/g,"");
const foodNames=F.map(f=>norm(f.name));
const byName={}; F.forEach(f=>byName[norm(f.name).toLowerCase()]=f);
const opts=s=>(s||"").split("|").map(x=>x.trim()).filter(Boolean);
const resolves=o=>{ try{ const re=new RegExp(o,"i"); return F.filter(f=>re.test(norm(f.name))); }catch(e){ return []; } };
const slotText=t=>["protein","carb","fat","produce"].map(k=>t[k]||"").join("|")+"|"+(t.extras||[]).map(e=>e[0]).join("|");
// the `oil` field is fat-choice advice and names alternatives on purpose ("use avocado oil, skip butter"),
// so it is scanned for banned words and dashes but NOT for foods the meal is missing.
const prose=t=>[t.method,t.oil,t.season,t.note,t.prepMethod].filter(Boolean).join(" ");
// `season` is the optional-seasoning line, a list of flavour options ("Salsa or Chipotle in adobo"), which is
// advice in the same way `oil` is. Only the actual STEPS and the dish description are scanned for a food the
// meal cannot deliver.
const proseFoods=t=>window.OB_PROSE_CLEAN([t.method,t.note,t.prepMethod].filter(Boolean).join(" "));
const NOUNS_BY_LEN=[...NOUNS].sort((a,b)=>b[0].length-a[0].length);
// `flex` also matches a plural entry against a singular mention. It is right for a TITLE ("White Bean Stew"
// must match the "white beans" entry) and wrong for prose, where it turns "salt and pepper" into bell peppers.
const nounsIn=(text, flex)=>{ let low=" "+String(text).toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ")+" "; const out=[];
  NOUNS_BY_LEN.forEach(([w])=>{ const re = flex ? window.OB_NOUN_WORD_RE(w,"g")
    : new RegExp("\\b"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"s?\\b","g");
    if(re.test(low)){ out.push(w); low=low.replace(re," "); } });
  return [...new Set(out)]; };
const nounRe=w=>new RegExp((NOUNS.find(([x])=>x===w)||[])[1]||w,"i");
const offered=(t,w)=>{ const re=nounRe(w); return opts(slotText(t)).some(o=>re.test(o.replace(/\\/g,""))) ; };

const VESSEL=/\b(wrap|taco|tacos|burrito|sandwich|toast|pita|quesadilla|bagel|english muffin|flatbread|pizza)\b/i;
const VESSEL_FOOD=/tortilla|bread|pita|bagel|english muffin|naan|arepa|wrap/i;
const BAKED=/\b(pancake|pancakes|waffle|waffles|muffin|muffins|oatmeal cups|oat cups|bars|cookie|cookies|brownie|brownies|baked oats|baked oatmeal|granola)\b/i;
const GRAIN_FOOD=/oats|flour|granola|rice cake|bread|english muffin|bagel|pancake mix|kodiak/i;
const FRUIT_FOOD=/banana|apple|berr|mango|peach|pineapple|grape|pumpkin|raisin|dates/i;
const EGGDISH=/\b(migas|scramble|scrambled|omelet|omelette|frittata|huevos|benedict|shakshuka|quiche|egg bites|egg muffin)\b/i;
const FORM=/\b(roasted|grilled|charred|mashed|sauteed|sautéed|caramelized|stuffed|braised|blistered)\s+([a-z][a-z\- ]{2,20}?)\b/gi;
const FAT_CATS=new Set(["Fats & Oils","Nuts & Seeds","Condiments & Misc"]);

const errors=[], warns=[], metrics={proseForeign:[]};
T.forEach(t=>{
  const tag=t.title.slice(0,58);
  // unresolved
  ["protein","carb","fat","produce"].forEach(k=>opts(t[k]).forEach(o=>{ if(!resolves(o).length) errors.push(`[unresolved] ${tag} :: ${k} "${o}"`); }));
  (t.extras||[]).forEach(e=>{ if(!resolves(String(e[0]).replace(/,/g,"")).length) errors.push(`[unresolved] ${tag} :: extra "${e[0]}"`); });
  // form-leak: a non-carb slot option that also matches a pasta or noodle ("Edamame" matched "Edamame pasta", so a
  // steamed-edamame snack was served 435g of pasta). Say "Edamame cooked", or name the pasta on purpose.
  ["protein","fat","produce"].forEach(k=>opts(t[k]).forEach(o=>{
    const leak = resolves(o).find(f=>/pasta|noodle/i.test(f.name) && !/pasta|noodle|soba|udon|ramen/i.test(o));
    if(leak) errors.push(`[form-leak] ${tag} :: ${k} "${o}" also matches "${leak.name}"`); }));
  // fat-as-protein (first option is what usually wins)
  // judged by what the food IS, not its shelf category: a protein lever must get >=35% of its calories from protein
  const p0=opts(t.protein)[0]; if(p0){ const f=resolves(p0)[0];
    if(f && (f.kcal||0)>0){ const pShare=(f.protein_g||0)*4/f.kcal, fShare=(f.fat_g||0)*9/f.kcal;
      if(pShare < 0.15 || fShare > 0.65) errors.push(`[fat-as-protein] ${tag} :: protein leads with "${f.name}" (${Math.round(pShare*100)}% protein, ${Math.round(fShare*100)}% fat by calories)`); } }
  // vessel
  if(VESSEL.test(t.title) && !/\b(bowl|bowls|skillet|salad)\b/i.test(t.title) && t.slot!=="snack"){ const carbOk=opts(t.carb).some(o=>VESSEL_FOOD.test(o)) || (t.extras||[]).some(e=>VESSEL_FOOD.test(String(e[0])));
    if(!carbOk) errors.push(`[vessel] ${tag} :: carb "${t.carb||""}" has no bread/tortilla/pita`); }
  // baked-grain
  if(BAKED.test(t.title) && !/egg muffin|egg bites|banana bread/i.test(t.title)){ const co=opts(t.carb);
    if(!co.some(o=>GRAIN_FOOD.test(o))) errors.push(`[baked-grain] ${tag} :: carb "${t.carb||""}" has no grain`);
    if(co.some(o=>FRUIT_FOOD.test(o))) errors.push(`[baked-grain] ${tag} :: fruit "${co.filter(o=>FRUIT_FOOD.test(o)).join("|")}" can replace the grain in the carb slot`); }
  // egg-dish
  if(EGGDISH.test(t.title) && !/tofu|vegan|chickpea/i.test(t.title) && !opts(t.protein).some(o=>/egg/i.test(o)) && !(t.extras||[]).some(e=>/egg/i.test(String(e[0])))) errors.push(`[egg-dish] ${tag} :: protein "${t.protein}" offers no egg`);
  // form
  let m; const ftitle=t.title; FORM.lastIndex=0;
  while((m=FORM.exec(ftitle))){ const noun=m[2].toLowerCase().replace(/\s+(with|and|over|on|in)\b.*$/,"").trim();
    const entry=NOUNS.find(([w])=>noun.startsWith(w)||noun===w); if(!entry) continue;
    const re=new RegExp(entry[1],"i"); const all=opts(slotText(t)).filter(o=>re.test(o.replace(/\\/g,"")));
    if(all.length && all.every(o=>/\braw\b/i.test(o))) warns.push(`[form] ${tag} :: "${m[0]}" but only raw offered (${all.join("|")})`); }
  // title-noun
  // "-style" is a flavor description, "rice & peas" means beans, "pesto" as a rub is seasoning
  const titleForNouns=t.title.replace(/\b[a-z]+-style\b/gi," ").replace(/rice (&|and) peas/i," rice ").replace(/-pesto\b/i," ").replace(/\blemon[-\s]pepper\b/gi," ");
  nounsIn(titleForNouns, true).forEach(w=>{ if(FREE.test(w)) return; if(!offered(t,w)) warns.push(`[title-noun] ${tag} :: "${w}" in title, not in any slot/extra`); });
  // banned prose + em-dash
  if(/mushroom/i.test(prose(t)+t.title)) errors.push(`[banned-prose] ${tag} :: mushroom in copy`);
  // author notes about the CORPUS ("distinct from existing X entries") are not client copy
  if(/\bdistinct from\b|\bexisting\b[^.]*\bentries\b|\bnote to self\b|\bTODO\b/i.test(prose(t)))
    errors.push(`[internal-note] ${tag} :: author note in client-facing copy`);
  // the planner's own words are not client copy: "it is a cooked slot", "from the carb slot", "if that is your carb"
  // (8 recipes had them, found 2026-09-24)
  if(/\bslots?\b|if (that|this) is your (carb|protein|pick|fat|veg)|if that's your \w+ slot|whatever your plan lists/i.test(prose(t)))
    errors.push(`[planner-jargon] ${tag} :: planner wording in client-facing copy`);
  if(/[—–]/.test(prose(t)+t.title)) warns.push(`[em-dash] ${tag}`);
  if(t.prepMethod){
    const pm=String(t.prepMethod), steps=pm.split(/\n+/).map(x=>x.trim()).filter(Boolean), miss=[];
    if(steps.length<8 || !steps.every((x,i)=>x.startsWith((i+1)+". "))) miss.push(`${steps.length} lines, need 8+ numbered steps one per line`);
    if(!/^1\. Equipment:/.test(steps[0]||"")) miss.push("step 1 is not the equipment");
    [["cooling",/\bcool/i],["dividing",/\bcontainers?\b|\bjars?\b/i],["storage",/\bfridge\b|refrigerat/i],["reheat or eat cold",/\breheat|\bto eat\b|\bcold\b/i]]
      .forEach(([k,re])=>{ if(!re.test(pm)) miss.push("no "+k); });
    if(/chicken|turkey|beef|pork|lamb|bison|venison|duck|salmon|cod|tilapia|trout|halibut|haddock|pollock|snapper|flounder|mackerel|tuna|shrimp|scallop|\begg\b/i.test(slotText(t)) && !/\b(145|160|165)\s*F\b/.test(pm))
      miss.push("no FSIS safe temperature");
    if(miss.length) warns.push(`[batch-shape] ${tag} :: ${miss.join("; ")}`);
  }
  // prose-foreign metric
  const foreign=nounsIn(proseFoods(t)).filter(w=>!FREE.test(w) && !offered(t,w) && !nounsIn(t.title).includes(w));
  if(foreign.length) metrics.proseForeign.push({title:tag, foreign});
});
const failOnWarn=process.argv.includes("--fail-on-warn");
console.log(`TEMPLATE LINT: ${T.length} templates | ${errors.length} errors | ${warns.length} warnings | ${metrics.proseForeign.length} templates whose steps name foods they never offer`);
errors.forEach(e=>console.log("  ERROR "+e)); warns.forEach(w=>console.log("  warn  "+w));
if(process.argv.includes("--prose")) metrics.proseForeign.forEach(x=>console.log("  prose "+x.title+" :: "+x.foreign.join(", ")));
if(process.argv.includes("--prose-freq")){
  const c={}; metrics.proseForeign.forEach(x=>x.foreign.forEach(w=>c[w]=(c[w]||0)+1));
  Object.entries(c).sort((a,b)=>b[1]-a[1]).forEach(([w,n])=>console.log(`  ${String(n).padStart(3)}  ${w}`));
}
process.exit(errors.length || (failOnWarn && warns.length) ? 1 : 0);
