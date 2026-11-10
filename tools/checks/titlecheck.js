// Does every dish title name only foods on its list? Builds batches 1-N x 40 configs (N = first argument, default 6) and
// prints "meals N | title names a food the list does not have: N (N%)", then the most-missed words and up to 20 examples.
// Usage: node tools/checks/titlecheck.js [N]   (APPDIR / APPJS: see loader.js)
require("./loader.js"); const T=window.__obTest; const F=T.FOOD_BY_ID;
const norm=f=>f.name.toLowerCase().replace(/,/g,"");
const ALIAS={toast:/bread|english muffin|bagel/, wrap:/tortilla|wrap/, wraps:/tortilla|wrap/, taco:/tortilla|taco shell/, tacos:/tortilla|taco shell/, burrito:/tortilla/, burritos:/tortilla/, sandwich:/bread|roll|bun|pita|bagel|english muffin|tortilla/, sandwiches:/bread|roll|bun|pita|bagel|english muffin/, quesadilla:/tortilla/};
const hit=(n,w)=>new RegExp("\\b"+w+"(s|es)?\\b").test(n) || new RegExp("\\b"+w.replace(/(es|s)$/,"")+"(s|es)?\\b").test(n);
const GENERIC=new Set(["protein","with","high","white","green","red","black","sweet","power","soft","savory","crispy","smoky","golden","spicy","style","bowl","bowls","cups","cup","jar","jars","bites","bake","trays","tray","boxes","box","plate","salad","soup","batch","big","meal","prep","and","the","over","on","in"]);
let meals=0, bad=0; const eg=[], words={};
const N=+process.argv[2]||6;
for(let b=1;b<=N;b++) for(let i=0;i<40;i++){ const {P,seed}=window.__obMakeConfig(b,i); T.withProfile(P,()=>{ const pool=T.allowedFoods(P); (T.buildOneDay(P,seed)||[]).forEach(m=>{
  const t=T.TEMPLATES.find(x=>x.title===m.dish); if(!t) return; meals++;
  const tt=T.tplBuildable ? null : null;
  // the title the client reads (a two-food choice resolved, "over Rice" on cauliflower rice renamed), not the library's
  const shown = T.dishTitle ? T.dishTitle(m) : (t.title||"");
  const tw=shown.toLowerCase().replace(/cauliflower rice/g, "cauliflower").replace(/[^a-z\s]/g," ").split(/\s+/).filter(w=>w.length>=3);
  const offered=[t.protein,t.carb,t.fat,t.produce].filter(Boolean).join("|").toLowerCase()+"|"+(t.extras||[]).map(e=>e[0]).join("|").toLowerCase();
  const list=m.items.map(it=>F[it.id]).filter(Boolean).map(norm);
  const missing=[];
  tw.forEach(w=>{ if(GENERIC.has(w)) return;
    if(ALIAS[w]){ if(!list.some(n=>ALIAS[w].test(n)) && /bread|tortilla|pita|bagel|muffin|wrap|bun|roll/.test(offered)) missing.push(w); return; }
    // a food word: some food in the pool is named by it AND the recipe offers it
    const foods=pool.filter(f=>hit(norm(f),w)); if(!foods.length) return;
    if(!new RegExp("\\b"+w).test(offered)) return;
    if(!list.some(n=>hit(n,w))) missing.push(w);
  });
  if(missing.length){ bad++; missing.forEach(w=>words[w]=(words[w]||0)+1); if(eg.length<20) eg.push(`${m.name}: ${m.dish} :: missing ${missing.join(",")} | list: ${m.items.map(it=>F[it.id]&&F[it.id].name.split(",")[0]).join("; ")}`); }
}); }); }
console.log(`meals ${meals} | title names a food the list does not have: ${bad} (${(100*bad/meals).toFixed(1)}%)`);
console.log(Object.entries(words).sort((a,b)=>b[1]-a[1]).slice(0,25).map(([k,v])=>k+" "+v).join(" | "));
eg.forEach(x=>console.log("  "+x));
