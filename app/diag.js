// Ad-hoc diagnostic runner — reuses the harness DOM shim, then dumps one built day's items.
// Usage: node app/diag.js '{"diet":"ovo","tCal":2850,"tPro":145,"tCarb":365,"tFat":90,"halal":true,"meals":4}' [seed]
"use strict";
const path = require("path");
function makeAbsorber(){
  const fn = function(){ return absorber; };
  const absorber = new Proxy(fn, {
    get(t,k){
      if(k===Symbol.toPrimitive) return ()=>"";
      if(k==="toString"||k==="valueOf") return ()=>"";
      if(k==="length") return 0;
      if(k==="checked") return false;
      if(k==="value"||k==="textContent"||k==="innerHTML"||k==="className") return "";
      if(k==="classList") return {add(){},remove(){},toggle(){},contains(){return false;}};
      if(k==="style") return new Proxy({},{get(){return ()=>{};},set(){return true;}});
      if(k==="children"||k==="childNodes") return [];
      return absorber;
    }, set(){return true;}, apply(){return absorber;}, has(){return true;},
  });
  return absorber;
}
const absorber = makeAbsorber();
global.window = global;
global.performance = global.performance || { now: () => Date.now() };
global.localStorage = { _s:{}, getItem(k){return this._s[k]??null;}, setItem(k,v){this._s[k]=String(v);}, removeItem(k){delete this._s[k];} };
global.alert=()=>{}; global.confirm=()=>true; global.prompt=()=>null;
global.addEventListener=()=>{}; global.removeEventListener=()=>{};
global.requestAnimationFrame=cb=>setTimeout(cb,0);
global.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});
global.Blob=function(){}; global.URL={createObjectURL(){return "";},revokeObjectURL(){}};
global.document = { readyState:"complete", getElementById:()=>absorber, querySelector:()=>absorber,
  querySelectorAll:()=>[], createElement:()=>absorber, addEventListener(){}, removeEventListener(){},
  body:absorber, documentElement:absorber, head:absorber };
["data/foods.js","data/dri.js","data/templates.js","data/gut.js","data/supplements.js","data/sauces.js","js/app.js"]
  .forEach(f=>require(path.join(__dirname,f)));

const T = window.__obTest;
const over = JSON.parse(process.argv[2] || "{}");
const seed = +(process.argv[3] || 1521);
const P = Object.assign({}, T.defaultProfile(), over);
T.withProfile(P, () => {
  const meals = T.buildOneDay(P, seed);
  const tot = T.mealsTotals(meals, false);
  console.log(`TARGET cal ${P.tCal} P${P.tPro} C${P.tCarb} F${P.tFat} | diet ${P.diet} meals ${P.meals}`);
  console.log(`GOT    cal ${Math.round(tot.kcal)} P${Math.round(tot.protein_g)} C${Math.round(tot.carb_g)} F${Math.round(tot.fat_g)} fiber ${Math.round(tot.fiber_g)}`);
  meals.forEach(m => {
    console.log(`\n-- ${m.name}: ${m.dish || "(fallback)"}`);
    (m.items||[]).forEach(it => {
      const f = T.FOOD_BY_ID[it.id];
      const cap = T.maxServeG(f), pg = (f.cat==="Vegetables"||f.cat==="Fruits") ? T.PRODUCE_GRAMS(f) : null;
      console.log(`   ${f.name.slice(0,34).padEnd(34)} ${String(it.grams).padStart(4)}g  ${f.cat.slice(0,14).padEnd(14)} P${Math.round(f.protein_g*it.grams/100)} C${Math.round(f.carb_g*it.grams/100)} F${Math.round(f.fat_g*it.grams/100)}${it.fixed?" [fixed]":""} cap${cap}${pg?` prod${pg}`:""}`);
    });
  });
});

// replay an exact harness config:  node app/diag.js replay <batch> <idx>
