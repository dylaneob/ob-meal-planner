// Every pantry item a client's steps call for reaches the grocery list (2026-10-06: the "Also for the recipes" line named
// 10 to 12 of the 20 to 25 items the step-by-step recipes use). Builds three meal-prep weeks and 40 everyday days, reads
// the printed steps, and checks each pantry word is either a weighed food on that plan or on the grocery line.
// Usage: node tools/checks/pantry_check.js        Prints "plans N | pantry items called for X | missing from the list Y".
"use strict";
const T = require("./loader.js");
const PANTRY = ["soy sauce","tamari","fish sauce","worcestershire","gochujang","miso","chipotle","tomato paste","baking powder","baking soda",
  "cornflour","cornstarch","cocoa","instant coffee","bay lea","thyme","rosemary","sage","cayenne","turmeric","curry powder","garam masala","sumac",
  "cardamom","allspice","pumpkin pie spice","everything bagel","sesame seeds","sriracha","hot sauce","mustard","maple","red wine vinegar",
  "balsamic","lemongrass","jalapeno","capers","smoked paprika","onion powder","garlic powder","chili powder","chili flakes","italian seasoning",
  "liquid smoke","vanilla","cinnamon","nutmeg","coriander","oregano","dill","basil","mint","parsley","cilantro","scallion","lime","lemon",
  "honey","broth","ketchup","cumin","ginger","garlic","rice vinegar","cider vinegar"];
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const plans = [];
[[{sex:"female",tCal:1800,tPro:140,tCarb:170,tFat:60,meals:4,diet:"omnivore",prep:true,prepCook:"3day"},7001],
 [{sex:"male",tCal:2400,tPro:190,tCarb:240,tFat:75,meals:3,diet:"omnivore",prep:true,prepCook:"weekly"},7101],
 [{sex:"female",tCal:1600,tPro:120,tCarb:150,tFat:55,meals:4,diet:"vegetarian",prep:true,prepCook:"twice"},7201]].forEach(([p,seed])=>{
  const P = Object.assign({}, T.defaultProfile(), p);
  T.withProfile(P, ()=>{ const wk = T.buildPrepWeek(P, seed); plans.push({ P, week: DAYS.map((name,di)=>({ name, meals: wk[di], prepBatch: wk.batchKeys[di] })) }); });
});
for(let i=0;i<40;i++){ const {P,seed} = window.__obMakeConfig(3, i); P.prep = false;
  T.withProfile(P, ()=>{ const d = T.buildOneDay(P, seed); if(d && d.length) plans.push({ P, week: [{ name:"Sunday", meals:d }] }); }); }
let called = 0, missing = 0; const ex = {};
for(const pl of plans){
  T.withProfile(pl.P, ()=>{
    T.state.profile = pl.P;
    T.state.week.forEach((d,di)=>{ const w = pl.week[di]; d.meals = w ? w.meals : []; d.prepBatch = w ? w.prepBatch : undefined; });
    const days = T.state.week.filter(d=>d.meals && d.meals.length);
    const steps = days.flatMap(d=>d.meals.map(m=>{ const c = m.cook||{};
      return [T.planSteps(c.method, m), pl.P.prep ? T.planSteps(c.prepMethod, m, T.prepBatchCount(m.dish, m)) : ""].filter(Boolean).join(" "); })).join(" ").toLowerCase();
    const listed = days.flatMap(d=>d.meals.flatMap(m=>(m.items||[]).map(it=>{ const f = T.FOOD_BY_ID[it.id]; return f ? f.name.toLowerCase() : ""; }))).join(" | ");
    const got = (()=>{ const r = T.recipeExtras(days); return r.need.concat(r.optional).join(" | ").toLowerCase(); })();
    PANTRY.forEach(w=>{
      if(!new RegExp("\\b"+w).test(steps)) return;
      if(w==="cumin" && /cumin seeds/.test(steps) && !/\bcumin\b(?! seeds)/.test(steps)) return;
      called++;
      const key = w==="cornflour" ? "cornstarch" : w.replace(/ lea$/, " leaves");   // the list says "cornstarch", the US word
      if(listed.includes(w) || got.includes(w) || got.includes(key)) return;
      missing++; ex[w] = (ex[w]||0) + 1;
    });
  });
}
console.log(`plans ${plans.length} | pantry items called for ${called} | missing from the list ${missing}`);
Object.entries(ex).sort((a,b)=>b[1]-a[1]).slice(0,15).forEach(([w,n])=>console.log(`  ${w}: missing on ${n} plan${n>1?"s":""}`));
process.exit(missing ? 1 : 0);
