// Builds one share of the regression test days for the day cache (see daycache.js). regress.sh runs several of these at once.
// Usage: OB_DAYCACHE= node tools/checks/prebuild_days.js <batches> <share k> <of n> <out.json>
//   builds batches 1..<batches> x 40 configs, keeping every n-th day starting at k (so slow and fast batches spread evenly),
//   and writes {"<seed>|<profile JSON>": "<day JSON>"}. A build that throws is left out, so the check builds it itself and
//   reports the error exactly as before. APPDIR / APPJS work as in loader.js.
"use strict";
delete process.env.OB_DAYCACHE;               // build for real, never from an older cache
const fs = require("fs");
const T = require("./loader.js");
const { dayKey } = require("./daycache.js");
const [batches, k, n, out] = [+process.argv[2], +process.argv[3], +process.argv[4], process.argv[5]];
if(!(batches > 0) || !(n > 0) || !(k >= 0 && k < n) || !out){ console.error("usage: prebuild_days.js <batches> <k> <n> <out.json>"); process.exit(2); }
const days = {}; let idx = 0, built = 0, threw = 0;
for(let b = 1; b <= batches; b++) for(let i = 0; i < 40; i++, idx++){
  if(idx % n !== k) continue;
  const { P, seed } = window.__obMakeConfig(b, i);
  try { days[dayKey(P, seed)] = JSON.stringify(T.withProfile(P, () => T.buildOneDay(P, seed))); built++; }
  catch(e){ threw++; }
}
fs.writeFileSync(out, JSON.stringify(days));
console.log(`share ${k}/${n}: ${built} days${threw ? `, ${threw} threw (left to the checks)` : ""}`);
