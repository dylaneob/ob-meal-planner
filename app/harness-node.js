// Headless test harness — runs the invariant suite (tests.js) against app.js in Node with a DOM shim.
// Usage: node app/harness-node.js [nConfigs] [batches]     (from the repo root)
// Deterministic: same seeds -> same configs -> same results. Exits 1 if any invariant fails.
"use strict";
const path = require("path");

// ---- absorber: a stub that survives any DOM-ish access pattern without throwing ----
function makeAbsorber(){
  const fn = function(){ return absorber; };
  const absorber = new Proxy(fn, {
    get(t, k){
      if (k === Symbol.toPrimitive) return () => "";
      if (k === "toString") return () => "";
      if (k === "valueOf") return () => "";
      if (k === "length") return 0;
      if (k === "checked") return false;
      if (k === "value") return "";
      if (k === "textContent" || k === "innerHTML" || k === "className") return "";
      if (k === "classList") return { add(){}, remove(){}, toggle(){}, contains(){ return false; } };
      if (k === "style") return new Proxy({}, { get(){ return () => {}; }, set(){ return true; } });
      if (k === "children" || k === "childNodes") return [];
      return absorber;
    },
    set(){ return true; },
    apply(){ return absorber; },
    has(){ return true; },
  });
  return absorber;
}
const absorber = makeAbsorber();

global.window = global;
global.performance = global.performance || { now: () => Date.now() };
global.localStorage = { _s:{}, getItem(k){ return this._s[k] ?? null; }, setItem(k,v){ this._s[k]=String(v); }, removeItem(k){ delete this._s[k]; } };
try { Object.defineProperty(global, "navigator", { value: { clipboard: { writeText: async () => {} } }, configurable: true }); } catch(e){ /* modern Node has a real navigator getter — fine */ }
global.alert = () => {}; global.confirm = () => true; global.prompt = () => null;
global.addEventListener = global.addEventListener || (() => {});
global.removeEventListener = global.removeEventListener || (() => {});
global.requestAnimationFrame = global.requestAnimationFrame || (cb => setTimeout(cb, 0));
global.matchMedia = global.matchMedia || (() => ({ matches:false, addEventListener(){}, addListener(){} }));
global.FileReader = global.FileReader || function(){ this.readAsText = () => {}; };
global.Blob = global.Blob || function(){}; global.URL = global.URL || { createObjectURL(){ return ""; }, revokeObjectURL(){} };
global.document = {
  readyState: "complete",
  getElementById(){ return absorber; },
  querySelector(){ return absorber; },
  querySelectorAll(){ return []; },
  createElement(){ return absorber; },
  addEventListener(){}, removeEventListener(){},
  body: absorber, documentElement: absorber, head: absorber,
};

// load data + app in index.html order
["data/foods.js","data/dri.js","data/templates.js","data/gut.js","data/supplements.js","data/sauces.js","data/foodnouns.js","data/yields.js","data/portions.js","data/availability.js","js/app.js","tests.js"]
  .forEach(f => { try { require(path.join(__dirname, f)); } catch(e){ console.error("LOAD FAIL", f, e.message); process.exit(2); } });

if (typeof window.__obRunTests !== "function"){ console.error("__obRunTests missing — __obTest export or tests.js broken"); process.exit(2); }
// tools/regress.sh sets OB_DAYCACHE and OB_DAYCACHE_JS: the test days come from its prebuild (tools/checks/daycache.js)
if (process.env.OB_DAYCACHE && process.env.OB_DAYCACHE_JS) require(process.env.OB_DAYCACHE_JS)(window.__obTest);

// the template LINTER runs first: bad data fails the build before a single day is generated
const lint = require("child_process").spawnSync(process.execPath, [path.join(__dirname,"lint-templates.js")], {encoding:"utf8"});
process.stdout.write(lint.stdout.split("\n")[0]+"\n");
if(lint.status !== 0){ console.error(lint.stdout); console.error("TEMPLATE LINT FAILED"); process.exit(1); }
const nConfigs = +(process.argv[2] || 40);
const batches  = +(process.argv[3] || 5);
let ran = 0, dayFails = 0; const failures = [];
const t0 = Date.now();
for (let b = 1; b <= batches; b++){
  const r = window.__obRunTests(b, nConfigs);
  ran += r.ran; dayFails += r.dayFails; failures.push(...r.failures);
  if(b===1) global.__stepMismatches = r.stepMismatches;
  global.__plate = r.plate;
}
const drift = window.__obTreatDriftTest(1).concat(window.__obTreatDriftTest(2));
failures.push(...drift);

// summarize by invariant
const byInv = {};
failures.forEach(f => { (byInv[f.inv] = byInv[f.inv] || []).push(f); });
const sm = global.__stepMismatches || [];
console.log(JSON.stringify({
  ran, dayFails, totalFailures: failures.length, ms: Date.now() - t0,
  stepsVsListMismatches: { mealsInBatch1: sm.length, sample: sm.slice(0,6) },
  plateSense: global.__plate || {},
  byInvariant: Object.fromEntries(Object.entries(byInv).map(([k, v]) => [k, v.length])),
  samples: Object.fromEntries(Object.entries(byInv).map(([k, v]) => [k, v.slice(0, 4).map(x => x.cfg + " :: " + x.detail)])),
}, null, 1));
process.exit(failures.length ? 1 : 0);
