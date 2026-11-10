// OB Meal Planner — deterministic invariant test suite (dev-only; loaded on demand, never in index.html).
// Uses window.__obTest (function-level API) instead of DOM scraping, so results are exact and repeatable.
// Run: window.__obRunTests(batchSeed, nConfigs) -> { ran, dayFails, failures:[...], ms }
(function(){
const T = window.__obTest;
function lcg(seed){ let s = seed>>>0 || 1; return ()=> (s = (s*1664525 + 1013904223)>>>0) / 4294967296; }

function makeConfig(r){
  const diets = ["omnivore","pescatarian","vegetarian","vegan","ovo"];
  const modes = ["none","none","simple","volume","glp1","budget","gut","prep"]; // "none" weighted 2x
  const P = Object.assign({}, T.defaultProfile());
  P.diet = diets[Math.floor(r()*diets.length)];
  const mode = modes[Math.floor(r()*modes.length)];
  if(mode!=="none") P[mode] = true;
  const cal = Math.round((1400 + r()*1600)/50)*50;                       // 1400-3000
  const pro = Math.round(cal*(0.20 + r()*0.14)/4/5)*5;                   // 20-34% of cal
  const fat = Math.round(cal*(0.20 + r()*0.13)/9/5)*5;                   // 20-33% of cal
  const carb = Math.max(40, Math.round((cal - pro*4 - fat*9)/4/5)*5);
  P.tCal=cal; P.tPro=pro; P.tCarb=carb; P.tFat=fat;
  if(r()<0.18) P.glutenfree=true;
  if(r()<0.12) P.halal=true;
  P.meals = [3,4,4,5][Math.floor(r()*4)];
  // meal-prep cook schedule, picked from values already drawn so the random stream (and every other config) is unchanged
  if(mode==="prep") P.prepCook = ["weekly","twice","3day","4day"][(cal/50 + P.meals) % 4];
  P._mode = mode;
  return P;
}

const LEAFY=/\b(spinach|arugula|lettuce|romaine|kale|chard|watercress|spring mix|mixed greens)\b/i;
// aromatics/herbs sized as seasoning. NOT pickles (a "Pickles, dill" 30g side is legitimate, the word "dill"
// is just in its name) and not scallion-in-a-name dishes.
const HERB=/\b(garlic|ginger|basil|cilantro|parsley|dill|mint|rosemary|thyme|sage|chives|scallion|shallot)\b/i;
const HERB_OK=/pickle|relish|sauce|dressing|kimchi|pesto|hummus|salsa/i;
const EGGDISH=/migas|scramble|omelet|omelette|frittata|huevos|benedict|quiche|\begg\b|egg-white/i;

const stepMismatches=[];
// ---- PLATE SENSE: the macros can be perfect and the plate still wrong. Tracked as METRICS, not failures:
// a genuinely high-carb, low-protein target produces a grain-forward bowl and that is the honest answer.
const plate={starchDwarfsProtein:0, doubleStarch:0, legumeOutweighsStar:0, dipOverVegetable:0, titleMissingFood:0,
             noAcid:0, noSalt:0, noAroma:0, mains:0, examples:[],
             // the 2026-09-24 self-audit classes (what a coach flags on sight)
             titledProteinToken:0, overSourcedMax:0, vesselShort:0, orDishBoth:0, overSourcedDayMax:0, auditExamples:[]};
const PORT = window.OB_PORTIONS || {};
const auditEx = s => { if(plate.auditExamples.length<8) plate.auditExamples.push(s); };
const P_ACID=/lemon|lime|vinegar|salsa|marinara|tomato|pickle|kimchi|yogurt|kefir|mustard|hot sauce|sriracha|buffalo|tzatziki|citrus|orange|pineapple|berr|tamarind|verde|ponzu|gochujang|bbq|teriyaki|wine|chimichurri|harissa|adobo|mojo|jerk|curry|tikka|balsamic|apple|worcester/i;
const P_SALT=/salt|soy|tamari|cheese|parmesan|feta|miso|olives|broth|salsa|hot sauce|sriracha|buffalo|ranch|hummus|bacon|ham|pickle|anchov|sausage|fish sauce|bbq|teriyaki|ponzu|gochujang|adobo|jerk|harissa|tzatziki|mustard|worcester|capers|kimchi|marinara|pesto/i;
const P_AROMA=/garlic|onion|ginger|scallion|shallot|basil|cilantro|herb|curry|cumin|chili|chile|paprika|pepper|spice|pesto|harissa|gochujang|sriracha|leek|cayenne|buffalo|jerk|adobo|oregano|thyme|rosemary|dill|mint|turmeric|coriander|fennel|bay|cinnamon|tikka|masala|lemongrass|mojo|ranch|salsa|pico|tomatillo|verde/i;
const P_DIPPY=/hummus|yogurt|dip|dressing|tzatziki|guacamole|cottage cheese|salsa|tahini|sour cream/i;
const P_STARCH=f=>f.cat==="Grains & Starches"||/potato|sweet corn|\bcorn\b|plantain/i.test(f.name);
function checkPlate(m){
  const items=(m.items||[]).map(it=>({it,f:T.FOOD_BY_ID[it.id]})).filter(x=>x.f);
  if(!items.length) return;
  const kc=x=>(x.f.kcal||0)*x.it.grams/100;
  const main=/lunch|dinner/i.test(m.name||"");
  const text=items.map(x=>x.f.name).join(" ")+" "+(m.dish||"")+" "+((m.cook&&m.cook.season)||"");
  const pr=T.dishProtein(m);
  if(main){
    plate.mains++;
    if(!P_ACID.test(text)) plate.noAcid++;
    if(!P_SALT.test(text)) plate.noSalt++;
    if(!P_AROMA.test(text)) plate.noAroma++;
    if(pr){
      const st=items.filter(x=>P_STARCH(x.f)&&!x.f.recipe&&x.it!==pr.it).sort((a,b)=>kc(b)-kc(a))[0];
      if(st && kc(st)>=2.5*kc(pr) && pr.it.grams<115){ plate.starchDwarfsProtein++;
        if(plate.examples.length<5) plate.examples.push(`${(m.dish||m.name).slice(0,42)}: ${st.f.name.split(",")[0]} ${Math.round(st.it.grams)}g vs ${pr.f.name.split(",")[0]} ${Math.round(pr.it.grams)}g`); }
      if(/chicken|beef|turkey|pork|salmon|shrimp|fish|egg/i.test(m.dish||"") && !/bean|lentil|chickpea/i.test(pr.f.name)){
        const leg=items.filter(x=>/bean|lentil|chickpea/i.test(x.f.name)&&x.it!==pr.it).reduce((a,x)=>a+x.it.grams,0);
        if(leg>pr.it.grams*1.3) plate.legumeOutweighsStar++;
      }
    }
  }
  if(items.filter(x=>P_STARCH(x.f)&&kc(x)>110).length>1) plate.doubleStarch++;
  const title=m.dish||"";
  if(main){ (title.toLowerCase().match(/chicken|salmon|beef|steak|turkey|pork|shrimp|cod|tuna|tofu|tempeh|trout|tilapia|halibut/g)||[]).forEach(w=>{
    const x=items.find(y=>y.f.name.toLowerCase().includes(w) && (y.f.cat==="Protein"||y.f.cat==="Seafood"));
    if(x && x.it.grams<56 && !/salad|dip|cups?\b|bites|jerky/i.test(title)){ plate.titledProteinToken++; auditEx(`token ${w}: ${title.slice(0,40)} ${Math.round(x.it.grams)}g`); } }); }
  items.forEach(x=>{ const pr=!x.f.recipe && PORT[x.f.id]; if(pr && pr.max && x.it.grams>pr.max*1.02 && !x.it.manual){ plate.overSourcedMax++; auditEx(`over max: ${x.f.name.split(",")[0]} ${Math.round(x.it.grams)}g > ${pr.max}`); } });
  const bread=items.find(x=>/\bbread\b|\brye\b/i.test(x.f.name)&&x.f.cat==="Grains & Starches"), tort=items.find(x=>/tortilla/i.test(x.f.name));
  const unitsOf=x=>{ const u=T.unitGrams(x.f); return u>0 ? x.it.grams/u : 2; };
  if(bread && /sandwich|\bsub\b|panini|\bmelt\b|\bclub\b/i.test(title) && !/open-?faced|toast/i.test(title) && unitsOf(bread)<1.8){ plate.vesselShort++; auditEx(`sandwich ${title.slice(0,40)}: ${unitsOf(bread).toFixed(1)} slice`); }
  if(tort && /\btacos\b/i.test(title) && unitsOf(tort)<1.8){ plate.vesselShort++; auditEx(`tacos ${title.slice(0,40)}: ${unitsOf(tort).toFixed(1)} tortilla`); }
  const orm=title.match(/\b(\w+) or (\w+)\b/i);
  if(orm && items.some(x=>new RegExp(orm[1],"i").test(x.f.name)) && items.some(x=>new RegExp(orm[2],"i").test(x.f.name))){ plate.orDishBoth++; auditEx(`both: ${title.slice(0,40)}`); }
  if(/dip|cup|stick|crudit|platter/i.test(m.dish||"")){
    const dip=items.filter(x=>P_DIPPY.test(x.f.name)).reduce((a,x)=>a+x.it.grams,0);
    const veh=items.filter(x=>x.f.cat==="Vegetables"&&/raw/i.test(x.f.name)).reduce((a,x)=>a+x.it.grams,0);
    if(dip>0&&veh>0&&dip>veh*1.8) plate.dipOverVegetable++;
  }
  [["berr",/berr/i],["banana",/banana/i],["avocado",/avocado/i],["mango",/mango/i],["quinoa",/quinoa/i],
   ["sweet potato",/sweet potato/i],["spinach",/spinach/i],["broccoli",/broccoli/i],["kale",/kale/i]].forEach(([w,re])=>{
    if(new RegExp("\\b"+w,"i").test(m.dish||"") && !items.some(x=>re.test(x.f.name))) plate.titleMissingFood++;
  });
}
function checkDay(P, meals, fails, tag){
  const add=(inv,detail)=>fails.push({cfg:tag, inv, detail});
  { const tally={}; (meals||[]).forEach(m=>(m.items||[]).forEach(it=>{ tally[it.id]=(tally[it.id]||0)+it.grams; }));
    Object.entries(tally).forEach(([id,g])=>{ const f=T.FOOD_BY_ID[id], pr=f && !f.recipe && PORT[id]; if(pr && pr.day && g>pr.day*1.02){ plate.overSourcedDayMax++; auditEx(`day max: ${f.name.split(",")[0]} ${Math.round(g)}g > ${pr.day}`); } }); }
  if(!meals || !meals.length){ add("build","no meals built"); return; }
  if(meals.length !== P.meals) add("meal-count", meals.length+" vs "+P.meals);
  // raw egg (white or whole) in a meal that is never heated: overnight oats, chia pudding, jars, smoothies
  meals.forEach(m=>{ if(!T.mealEatenCold(m)) return;
    (m.items||[]).forEach(it=>{ const f=T.FOOD_BY_ID[it.id];
      if(f && /^egg/i.test(f.name) && /raw/i.test(f.name) && !/powder|dried/i.test(f.name)) add("raw-egg-cold-meal", (m.dish||m.name)+" :: "+f.name+" "+Math.round(it.grams)+"g"); }); });
  const tot = T.mealsTotals(meals, false);
  const calGap = tot.kcal - P.tCal;
  if(Math.abs(calGap) > 100) add("calories>100", Math.round(calGap)+" (got "+Math.round(tot.kcal)+" want "+P.tCal+")");
  const pPct = tot.protein_g/P.tPro*100;
  // Plant diets on a HIGH-CARB target legitimately overshoot protein: the carbs themselves (beans, grains,
  // seitan-adjacent wheat foods) carry protein, so a 365g-carb vegan/ovo day cannot stay at 118%. Documented
  // limitation, not a defect — allow 135% there, hold everyone else to 118%.
  const plantHiCarb = (P.diet==="vegan"||P.diet==="ovo"||P.diet==="vegetarian") && (P.tCarb*4/P.tCal) > 0.45;
  if(pPct < 82 || pPct > (plantHiCarb ? 135 : 118)) add("protein", Math.round(pPct)+"% ("+Math.round(tot.protein_g)+"/"+P.tPro+")");
  const fiberFloor = Math.max(30, 14*P.tCal/1000);
  if(tot.fiber_g < fiberFloor*0.72) add("fiber-low", Math.round(tot.fiber_g)+" vs floor "+Math.round(fiberFloor));
  meals.forEach(m=>{
    const seen = {};
    let bkProt = 0, eggG = 0, beanG = 0;
    (m.items||[]).forEach(it=>{
      const f = T.FOOD_BY_ID[it.id];
      if(!f){ add("bad-food-id", m.name+": "+it.id); return; }
      if(!isFinite(it.grams) || it.grams < 1) add("bad-grams", f.name+" = "+it.grams);
      if(seen[it.id]) add("dup-food", m.name+": "+f.name+" twice");
      seen[it.id]=1;
      const cap = T.maxServeG(f);
      if(it.grams > cap + 2) add("over-cap", f.name+" "+Math.round(it.grams)+"g > cap "+cap);
      // a volume food is allowed in a dish NAMED for it ("Lettuce Cups", "Radish Rye Toast"): tplPool in app.js, 2026-09-30
      const volumeTitled = T.exclusion(f, P)==="volume-only" && (String(m.dish||"").toLowerCase().match(/[a-z]{3,}/g)||[])
        .some(w=>new RegExp("\\b"+w+"(?:s|es)?\\b").test(f.name.toLowerCase().replace(/,/g,"")));
      if(T.exclusion(f, P) && !volumeTitled) add("exclusion-leak", P.diet+(P.halal?"+halal":"")+(P.glutenfree?"+gf":"")+": "+f.name+" ("+T.exclusion(f,P)+")");
      if(/mushroom/i.test(f.name)) add("mushroom", m.name+": "+f.name);
      if((f.cat==="Protein"||f.cat==="Seafood") && /\braw\b/i.test(f.name)) add("raw-meat-autodraft", f.name);
      // lessons from real client plans, encoded so they cannot come back quietly
      if(/\bhoney\b|maple syrup|agave|\bjam\b|syrup/i.test(f.name) && !/sugar-free/i.test(f.name) && it.grams > 27) add("sweetener-portion", f.name+" "+it.grams+"g");
      if(/^Egg, whole/i.test(f.name) && it.grams % 50 !== 0) add("fractional-egg", f.name+" "+it.grams+"g");
      if(/tortilla|\bbread\b|^Pita bread/i.test(f.name) && !f.recipe && !it.manual){ const u=T.unitGrams(f); const step=u<=50?u:u/2; if(u>0 && Math.abs(it.grams/step - Math.round(it.grams/step))>0.02) add("fractional-unit", f.name+" "+it.grams+"g (step "+Math.round(step)+"g)"); }
      if(it.titled && !it.fixed && it.grams < T.leverFloor(it)-2) add("titled-food-token", f.name+" "+Math.round(it.grams)+"g in a dish named for it");
      if(LEAFY.test(f.name) && !/cooked/i.test(f.name) && it.grams > 95) add("leafy-portion", f.name+" "+it.grams+"g");
      if(/\bonion\b/i.test(f.name) && /raw/i.test(f.name) && it.grams > 95) add("onion-portion", f.name+" "+it.grams+"g");
      if(HERB.test(f.name) && !HERB_OK.test(f.name) && it.grams > 12) add("herb-portion", f.name+" "+it.grams+"g");
      if(/avocado/i.test(f.name) && f.cat!=="Fats & Oils" && it.grams > 160) add("avocado-portion", f.name+" "+it.grams+"g");
      if(f.cat==="Condiments & Misc" && !/broth|stock|milk|marinara/i.test(f.name) && it.grams > 65) add("condiment-portion", f.name+" "+it.grams+"g");
      // absurdity backstop: no single non-recipe food should dominate a day's calories
      if(!f.recipe && (f.kcal||0)*it.grams/100 > 800) add("single-food-kcal", f.name+" "+it.grams+"g = "+Math.round(f.kcal*it.grams/100)+" kcal");
      // the solver must honor each lever's own minimum serving (a "Thai Basil Beef" once served 30g of beef).
      // Test the CONTRACT (leverFloor) rather than a guessed gram threshold: 54g of seitan is 40g of protein.
      if(!it.fixed && !f.recipe && f.cat!=="Vegetables" && it.grams < T.leverFloor(it) - 2)
        add("below-lever-floor", f.name+" "+Math.round(it.grams)+"g < floor "+T.leverFloor(it));
      if((f.cat==="Vegetables"||f.cat==="Fruits") && it.grams > T.PRODUCE_GRAMS(f)*1.6 && !/potato|corn|peas|riced cauliflower|shirataki/i.test(f.name)) add("produce-over-serving", f.name+" "+it.grams+"g >> "+T.PRODUCE_GRAMS(f));
      if(/breakfast/i.test(m.name||"")) bkProt += f.protein_g*it.grams/100;
      if(/\begg/i.test(f.name) && !/eggplant/i.test(f.name)) eggG += it.grams;
      if(/\bbean|chickpea|lentil/i.test(f.name)) beanG += it.grams;
    });
    if((m.items||[]).length > 9) add("too-many-items", m.name+": "+m.items.length);
    if(/breakfast/i.test(m.name||"") && bkProt < 23.5) add("breakfast-floor", Math.round(bkProt)+"g protein");
    if(m.shakeNote && !(m.items||[]).some(it=>T.isProteinPowder(T.FOOD_BY_ID[it.id]))) add("stale-shake-note", m.name);
    if(m.dish && m.cook){ const mm=T.stepsMismatch(m, m.cook); if(mm.length) stepMismatches.push(m.dish.slice(0,40)+": "+mm.join(", ")); }
    checkPlate(m);
    if(EGGDISH.test(m.dish||"") && P.diet!=="vegan" && beanG > eggG && eggG > 0)
      add("beans>eggs-in-egg-dish", (m.dish||"").slice(0,36)+" egg "+Math.round(eggG)+" bean "+Math.round(beanG));
    if(P.simple && m.dish){
      const tpl = T.TEMPLATES.find(t=>t.title===m.dish);
      if(tpl && !tpl.simple) add("simple-leak", m.dish.slice(0,40));
    }
  });
}

window.__obMakeConfig = function(batchSeed, idx){ const r=lcg(batchSeed*2654435761); let P=null; for(let i=0;i<=idx;i++) P=makeConfig(r); return {P, seed:1000+batchSeed*97+idx*13}; };
window.__obRunTests = function(batchSeed, nConfigs){
  const t0 = performance.now();
  const r = lcg(batchSeed*2654435761);
  const fails = [];
  let ran = 0, dayFails = 0;
  for(let i=0;i<nConfigs;i++){
    const P = makeConfig(r);
    const tag = "#"+batchSeed+"."+i+" "+P.diet+"/"+P._mode+" "+P.tCal+"/"+P.tPro+"/"+P.tCarb+"/"+P.tFat+(P.glutenfree?" gf":"")+(P.halal?" halal":"");
    let meals = null;
    try { meals = T.withProfile(P, ()=>T.buildOneDay(P, 1000+batchSeed*97+i*13)); }
    catch(e){ fails.push({cfg:tag, inv:"exception", detail:String(e).slice(0,140)}); continue; }
    const before = fails.length;
    // CRITICAL: check INSIDE the profile context — maxServeG/PRODUCE_GRAMS read state.profile, so checking
    // outside it evaluates caps against the wrong profile (vegan powder cap read 45 instead of 90 = false fails).
    T.withProfile(P, ()=>checkDay(P, meals, fails, tag));
    if(fails.length > before) dayFails++;
    ran++;
  }
  return { ran, dayFails, failures:fails, ms: Math.round(performance.now()-t0), stepMismatches: stepMismatches.splice(0), plate: Object.assign({}, plate) };
};

// Manual-edit drift test: build a day, bolt on a dense treat (recipe food), run fitDayToTargets, calories must recover.
// WEEK-LEVEL test. __obRunTests builds single days; the app builds WEEKS, and meal-prep mode takes a
// completely different route through generatePlan (K rotated menus sharing one used-food memory) that a
// single-day harness never touches. This runs the real week paths and checks every day of every week.
// A prep week has to be one the client can actually cook: every day a cook covers eats the SAME menu (it is one
// batch), a fresh-cook day carries no batch recipe, and no container outlives its fridge life unless it can be
// frozen for that day. The last one is the food-safety promise of the 3-day and 4-day batch modes.
function checkPrepWeek(P, week, fails, tag){
  const S = T.prepSchedule(P); if(!S) return;
  const sig = meals => JSON.stringify((meals||[]).map(m=>[m.dish||"", (m.items||[]).map(it=>[it.id, Math.round(it.grams)])]));
  S.cooks.forEach(c=>{
    const first = week[c.days[0]];
    c.days.forEach(di=>{ if(sig(week[di])!==sig(first)) fails.push({cfg:tag, inv:"prep-batch-differs", detail:"day "+di+" vs cook day "+c.day}); });
    (first||[]).forEach(m=>{
      if(c.fresh){ if(!m.fresh || (m.cook && m.cook.prepMethod)) fails.push({cfg:tag, inv:"prep-fresh-day-batched", detail:m.dish||m.name}); return; }
      if(!(m.items||[]).length) return;
      const st = T.mealStorage(m);
      if(T.prepOverFridge(c.days.length, st.fridgeDays) > 0 && !st.freezeOk)
        fails.push({cfg:tag, inv:"prep-outlives-fridge", detail:(m.dish||m.name)+" keeps "+st.fridgeDays+"d, batch "+c.days.length+"d, no freeze"});
    });
  });
}
window.__obRunWeeks = function(batchSeed, nConfigs){
  const r = lcg(batchSeed*2654435761);
  const fails = []; let weeks = 0, badWeeks = 0, days = 0;
  for(let i=0;i<nConfigs;i++){
    const P = makeConfig(r);
    const tag = "#"+batchSeed+"."+i+" "+P.diet+"/"+P._mode+" "+P.tCal+"/"+P.tPro+"/"+P.tCarb+"/"+P.tFat;
    const before = fails.length;
    try{
      T.withProfile(P, ()=>{
        const week = [];
        if(P.prep){
          T.buildPrepWeek(P, 5000+batchSeed*97+i*13).forEach(m=>week.push(m));
          checkPrepWeek(P, week, fails, tag);
        } else {
          for(let di=0; di<7; di++) week.push(T.buildOneDay(P, 5000+batchSeed*97+i*13 + di*101) || []);
        }
        week.forEach((meals, di)=>{ days++; if(!meals || !meals.length){ fails.push({cfg:tag, inv:"empty-day", detail:"day "+di}); return; }
          checkDay(P, meals, fails, tag+" d"+di); });
      });
    }catch(e){ fails.push({cfg:tag, inv:"exception", detail:String(e).slice(0,140)}); }
    weeks++; if(fails.length > before) badWeeks++;
  }
  const byInv={}; fails.forEach(f=>{ byInv[f.inv]=(byInv[f.inv]||0)+1; });
  return { weeks, badWeeks, days, failures:fails.length, byInvariant:byInv,
           samples:fails.slice(0,14).map(f=>f.inv+" :: "+f.cfg+" :: "+f.detail) };
};
window.__obTreatDriftTest = function(seed){
  const r = lcg(seed*40503);
  const out = [];
  for(let i=0;i<6;i++){
    const P = makeConfig(r); P.simple=false; P.prep=false;
    const treat = T.FOODS.find(f=>f.recipe && /brownie|pudding|nice cream|bites|bars|jars/i.test(f.name)) || T.FOODS.find(f=>f.recipe);
    try{
      T.withProfile(P, ()=>{
        const meals = T.buildOneDay(P, 7000+i*31);
        if(!meals){ out.push({cfg:P.diet, inv:"build", detail:"none"}); return; }
        meals.push({ name:"Sweet treat", dish:treat.name, items:[{id:treat.id, grams:treat.serving_g||100, fixed:true}] });
        T.state.meals = meals; T.state.dayIdx = 0;
        T.fitDayToTargets();
        const gap = T.mealsTotals(T.state.meals,false).kcal - P.tCal;
        if(Math.abs(gap) > 100) out.push({cfg:P.diet+" "+P.tCal+" +"+treat.name.slice(0,20), inv:"treat-drift>100", detail:Math.round(gap)+""});
      });
    }catch(e){ out.push({cfg:P.diet, inv:"exception", detail:String(e).slice(0,120)}); }
  }
  return out;
};
})();
