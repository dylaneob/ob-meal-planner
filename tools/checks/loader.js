// Loads the planner into Node for the checks in this folder: the data files, js/app.js and tests.js in the order
// app/harness-node.js uses, behind a DOM absorber, then exports window.__obTest.
// APPDIR=<folder> loads another copy of app/ (a snapshot from before a change); APPJS=<file> swaps in only app.js.
const path=require("path");
const APP=path.resolve(process.env.APPDIR||path.join(__dirname,"..","..","app"));
function makeAbsorber(){ const fn=function(){return ab;}; const ab=new Proxy(fn,{get(t,k){
  if(k===Symbol.toPrimitive)return()=>""; if(k==="toString"||k==="valueOf")return()=>""; if(k==="length")return 0;
  if(k==="checked")return false; if(k==="value"||k==="textContent"||k==="innerHTML"||k==="className")return "";
  if(k==="classList")return{add(){},remove(){},toggle(){},contains(){return false;}};
  if(k==="style")return new Proxy({},{get(){return()=>{};},set(){return true;}}); if(k==="children"||k==="childNodes")return[];
  return ab;},set(){return true;},apply(){return ab;},has(){return true;}}); return ab; }
const ab=makeAbsorber();
global.window=global; global.performance=global.performance||{now:()=>Date.now()};
global.localStorage={_s:{},getItem(k){return this._s[k]??null;},setItem(k,v){this._s[k]=String(v);},removeItem(k){delete this._s[k];}};
global.alert=()=>{}; global.confirm=()=>true; global.prompt=()=>null; global.addEventListener=()=>{}; global.removeEventListener=()=>{};
global.requestAnimationFrame=cb=>setTimeout(cb,0); global.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});
global.Blob=function(){}; global.URL={createObjectURL(){return "";},revokeObjectURL(){}};
global.document={readyState:"complete",getElementById:()=>ab,querySelector:()=>ab,querySelectorAll:()=>[],createElement:()=>ab,
  addEventListener(){},removeEventListener(){},body:ab,documentElement:ab,head:ab};
["data/foods.js","data/dri.js","data/templates.js","data/gut.js","data/supplements.js","data/sauces.js","data/foodnouns.js",
 "data/yields.js","data/portions.js","data/availability.js","js/app.js"].forEach(f=>require(f==="js/app.js"&&process.env.APPJS?path.resolve(process.env.APPJS):path.join(APP,f))); require(path.join(APP,"tests.js"));

const T=window.__obTest; module.exports=T;
// tools/regress.sh sets OB_DAYCACHE: the test days come from its prebuild instead of being built again (daycache.js)
if(process.env.OB_DAYCACHE) require("./daycache.js")(T);
