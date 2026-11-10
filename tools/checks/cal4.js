// Calorie and macro accuracy: builds 400 days (batches 1-10 x 40 configs) and prints
// "days 400 | outside 0.3% calories: N | worst N% | mean error P/C/F", then a plate-shape line (3+ fruits, small mains).
// Usage: node tools/checks/cal4.js   (APPDIR / APPJS: see loader.js)
require("./loader.js"); const T=window.__obTest;
let n=0, out=0, worst=0; const err={p:[],c:[],f:[]}; let fruit3=0, mains=0, smallMain=0;
const F=T.FOOD_BY_ID;
for(let b=1;b<=10;b++) for(let i=0;i<40;i++){ const {P,seed}=window.__obMakeConfig(b,i);
  const day=T.withProfile(P,()=>T.buildOneDay(P,seed)); if(!day||!day.length) continue; n++;
  const t=T.mealsTotals(day,false), pct=Math.abs(t.kcal-P.tCal)/P.tCal; worst=Math.max(worst,pct); if(pct>0.003) out++;
  err.p.push(Math.abs(t.protein_g-P.tPro)/P.tPro); err.c.push(Math.abs(t.carb_g-P.tCarb)/P.tCarb); err.f.push(Math.abs(t.fat_g-P.tFat)/P.tFat);
  day.forEach(m=>{ if(m.items.filter(it=>F[it.id]&&F[it.id].cat==="Fruits").length>=3) fruit3++;
    if(/lunch|dinner/i.test(m.name)){ mains++; const star=m.items.map(it=>({it,f:F[it.id]})).filter(x=>x.f&&(x.f.cat==="Protein"||x.f.cat==="Seafood")&&!T.isProteinPowder(x.f)).sort((a,b)=>b.it.grams*b.f.protein_g-a.it.grams*a.f.protein_g)[0]; if(star && star.it.grams<75) smallMain++; } }); }
const mean=a=>(100*a.reduce((x,y)=>x+y,0)/a.length).toFixed(1)+"%";
console.log(`days ${n} | outside 0.3% calories: ${out} | worst ${(worst*100).toFixed(2)}% | mean error P ${mean(err.p)} C ${mean(err.c)} F ${mean(err.f)}`);
console.log(`meals with 3+ fruits: ${fruit3} | lunch/dinner mains with the main meat or fish under 75g: ${smallMain} of ${mains}`);
