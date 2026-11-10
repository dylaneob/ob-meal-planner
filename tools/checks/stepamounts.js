// Do the amounts written in the recipe steps and seasoning lines match the food list? Builds 240 days (batches 1-6 x 40 configs) and prints
// "meals N | steps with an amount for a listed food: N | amount disagrees with the list: N (N%)", then up to 25 examples.
// Usage: node tools/checks/stepamounts.js   (APPDIR / APPJS: see loader.js)
require("./loader.js"); const T=window.__obTest; const F=T.FOOD_BY_ID;
const NUM="(\\d+\\s?[½¼¾⅓⅔]|\\d+ \\d+\\/\\d+|\\d+(?:\\.\\d+)?|\\d+\\/\\d+|½|¼|¾|⅓|⅔|one|two|three|four|a|half a|half)";
const UNIT="(tablespoons?|tbsp|teaspoons?|tsp|cups?|oz|ounces?|grams?|g|slices?|scoops?|large|whole)";
const FR={"½":0.5,"¼":0.25,"¾":0.75,"⅓":1/3,"⅔":2/3};
// mixed numbers ("1½ tsp", "2 1/2 cups"): the planner prints these since 2026-10-03, and reading only the "½" made 20 false mismatches
const numVal=s=>{ s=s.toLowerCase().trim(); let m;
  if((m=s.match(/^(\d+)\s?([½¼¾⅓⅔])$/))) return +m[1]+FR[m[2]];
  if((m=s.match(/^(\d+) (\d+)\/(\d+)$/))) return +m[1]+m[2]/m[3];
  if(/\//.test(s)){const [a,b]=s.split("/");return +a/+b;}
  return ({...FR,one:1,two:2,three:3,four:4,a:1,"half a":0.5,half:0.5})[s] ?? +s; };
const unitG=(u,f,q)=>{ u=u.toLowerCase().replace(/s$/,"");
  const oil=(f.cat==="Fats & Oils"||/^butter/i.test(f.name));
  if(/^(tablespoon|tbsp)$/.test(u)){ if(oil) return 13.5*q; const p=(f.portions||[]).find(x=>/tbsp|tablespoon/i.test(x.label)); return p? p.grams/(parseFloat(p.label)||1)*q : null; }
  if(/^(teaspoon|tsp)$/.test(u)){ if(oil) return 4.5*q; const p=(f.portions||[]).find(x=>/tbsp|tablespoon/i.test(x.label)); return p? p.grams/(parseFloat(p.label)||1)/3*q : null; }
  if(u==="cup"){ const p=(f.portions||[]).find(x=>/cup/i.test(x.label)); return p? p.grams/(parseFloat(p.label)||1)*q : null; }
  if(u==="oz"||u==="ounce") return 28.35*q;
  if(u==="gram"||u==="g") return q;
  if(u==="slice"){ const p=(f.portions||[]).find(x=>/slice/i.test(x.label)); return p? p.grams/(parseFloat(p.label)||1)*q : null; }
  if(u==="scoop"){ const p=(f.portions||[]).find(x=>/scoop/i.test(x.label)); return p? p.grams/(parseFloat(p.label)||1)*q : (/protein powder|whey|casein/i.test(f.name)?31*q:null); }
  return null; };
let meals=0, withQty=0, bad=0; const eg=[]; const kinds={};
for(let b=1;b<=6;b++) for(let i=0;i<40;i++){ const {P,seed}=window.__obMakeConfig(b,i); T.withProfile(P,()=>{ (T.buildOneDay(P,seed)||[]).forEach(m=>{
  if(!m.cook) return; meals++;
  // the seasoning line prints on the card too: "add 1 Tbsp butter" beside a list of 2 tsp went unchecked until 2026-10-29
  const txt=[T.planSteps(m.cook.method||"", m), P.prep?T.planSteps(m.cook.prepMethod||"", m):"", T.planText(T.seasonText(m.cook, m)||"", m)].join(" ");
  const items=(m.items||[]).map(it=>({it,f:F[it.id]})).filter(x=>x.f&&!x.f.recipe);
  let mealBad=false, mealQty=false;
  items.forEach(({it,f})=>{
    const base=f.name.split(",")[0].replace(/\s*\(.*\)/,"").trim().toLowerCase();
    const words=[base, base.split(" ").slice(-1)[0]].filter((w,i,a)=>w.length>2 && a.indexOf(w)===i);
    for(const w of words){
      const re=new RegExp("(?<![\\w½¼¾⅓⅔/.])"+NUM+"\\s+"+UNIT+"\\s+(?:of\\s+)?(?:the\\s+|your\\s+)?((?:[a-z-]+\\s+){0,2}?)"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"s?\\b(?!\\s+(?:vinegar|flour|wine|milk|syrup|paste|powder|sauce|juice|water|noodles?|cakes?|starch|crackers?))","gi");
      let mm; while((mm=re.exec(txt))){
        // matched by its last word only ("pepper", "syrup"): a different kind in front is a different food. "¼ tsp black
        // pepper" is not the bell pepper and "1 tsp maple syrup" is not the chocolate syrup (2026-10-06)
        const pre=(mm[3]||"").trim().split(/\s+/).pop();
        if(w!==base && pre && !/^(cooked|raw|fresh|chopped|diced|sliced|large|small|medium|whole|plain|lean|extra)$/.test(pre) && !f.name.toLowerCase().includes(pre)) continue;
        // "Per 6 oz shrimp: 1/2 tsp salt" is a spice ratio in a seasoning line, not the amount to eat (2026-10-29)
        if(/\bper\s*$/i.test(txt.slice(Math.max(0,mm.index-5), mm.index))) continue;
        const q=numVal(mm[1]); const g=unitG(mm[2],f,q); if(g==null) continue; mealQty=true;
        const r=g/it.grams; const partial=/rest|remaining|remainder|half of|the other|leftover/i.test(txt);
        if(r>1.33 || (r<0.75 && !partial)){ mealBad=true; const k=(f.cat==="Fats & Oils"||/^butter/i.test(f.name))?"fat":f.cat; kinds[k]=(kinds[k]||0)+1; if(eg.length<25) eg.push(`${m.dish} :: "${mm[0]}" = ${g.toFixed(0)}g vs list ${it.grams}g (${f.name})`); }
      }
      if(mealQty) break;
    }
  });
  if(mealQty) withQty++; if(mealBad) bad++;
}); }); }
console.log(`meals ${meals} | steps with an amount for a listed food: ${withQty} | amount disagrees with the list: ${bad} (${(100*bad/meals).toFixed(1)}%)`, JSON.stringify(kinds));
eg.forEach(x=>console.log("  "+x));
