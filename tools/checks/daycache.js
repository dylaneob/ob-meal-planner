// Day cache for tools/regress.sh (2026-11-04, the Mac mini). The harness, cal4, step amounts and titles all rebuild the same
// test days (__obMakeConfig batch b, config i, seed 1000+b*97+i*13): 1,360 builds for 480 different days, one after another,
// was 6 minutes on the mini and 11-12 on the old Air. regress.sh now builds each day once, spread over the cores
// (prebuild_days.js), and each check reads the days back here instead of building them again.
//
// Off unless OB_DAYCACHE names a folder of prebuild files, so running any check on its own behaves exactly as before.
// A day that is not in the cache (another config, a build that threw in the prebuild) is built as usual.
// Each read hands back a fresh copy, so a check that edits a day cannot change what the next check sees.
"use strict";
const fs = require("fs"), path = require("path");
const dayKey = (P, seed) => seed + "|" + JSON.stringify(P);
module.exports = function install(T){
  const dir = process.env.OB_DAYCACHE;
  if(!dir || !T || typeof T.buildOneDay !== "function") return 0;
  const cache = new Map();
  fs.readdirSync(dir).filter(f => /^days-.*\.json$/.test(f)).forEach(f => {
    const part = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    Object.entries(part).forEach(([k, v]) => cache.set(k, v));
  });
  const build = T.buildOneDay;
  T.buildOneDay = function(P, seed){
    const hit = cache.get(dayKey(P, seed));
    return hit === undefined ? build.apply(this, arguments) : JSON.parse(hit);
  };
  return cache.size;
};
module.exports.dayKey = dayKey;
