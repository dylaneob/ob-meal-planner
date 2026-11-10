// The client's own words against the plan (2026-10-14). A review called yuca "a potato-like starch she avoids" and it came
// off a client's lists; her onboarding answers name "anything yucca or cassava" among her favourite starches.
// Each client's answers live in client-files/<slug>.answers.md (outside app/, never served), with a header of regular
// expressions: avoid (a food name matching one fails the check, unless an allow pattern matches it too), allow, loves
// (listed present or missing, for the coach). Every food on the plan is checked: the days, the trades, the plug-and-play
// and build-your-own-lunch lists.
// Usage: node tools/checks/client_facts.js <record.json> <answers.md>     (exit 1 if a food they avoid is on the plan)
"use strict";
const fs = require("fs"), path = require("path");
const T = require(path.join(__dirname, "loader.js"));
const [recFile, ansFile] = process.argv.slice(2);
if(!recFile || !ansFile){ console.error("usage: node tools/checks/client_facts.js <record.json> <answers.md>"); process.exit(2); }
const rec = JSON.parse(fs.readFileSync(recFile, "utf8")), txt = fs.readFileSync(ansFile, "utf8");
const head = (/^---\n([\s\S]*?)\n---/.exec(txt) || [,""])[1];
// a list that is missing or unreadable stops the check: an empty avoid list passes everything (a client's and a client's
// first files were written without the brackets and passed vacuously, 2026-10-14). "avoid: []" is an empty list on purpose.
const raw = key => { const m = new RegExp(`^${key}:\\s*\\[(.*)\\]\\s*$`, "m").exec(head); return m ? m[1] : null; };
const list = key => { const r = raw(key); if(r === null){ console.error(`${path.basename(ansFile)}: no readable "${key}: [...]" line in the header`); process.exit(2); }
  return r.split(/,\s+/).map(s => s.trim()).filter(Boolean).map(s => new RegExp(s, "i")); };
const avoid = list("avoid"), allow = list("allow"), loves = list("loves");
// "only": a food allowed in some meals only, as "pattern=>meal pattern" (a client: eggs at breakfast only)
const only = (raw("only") || "").split(/,\s+/).filter(Boolean).map(s => { const [f, m] = s.split("=>"); return { f:new RegExp(f.trim(), "i"), m:new RegExp((m||"").trim(), "i"), src:s.trim() }; });   // optional
const where = new Map();                                     // food name -> where it appears
const note = (id, w) => { const f = T.FOOD_BY_ID[id]; if(!f) return; const n = f.name.toLowerCase(); (where.get(n) || where.set(n, new Set()).get(n)).add(w); };
// where a food sits names the day, the meal and the dish, so "only" can name either (eggs=>breakfast, rice=>poke|sushi)
(rec.week||[]).forEach(d => (d.meals||[]).forEach(m => (m.items||[]).forEach(it => note(it.id, `${d.name} ${m.name}: ${m.dish||""}`))));
const P = rec.profile || {};
(P.trades||[]).forEach(t => (t.items||[]).forEach(it => note(it.id, `${t.head||t.name} (trade)`)));
[P.buildMeals, P.buildLunch].filter(Boolean).forEach(bm => (bm.blocks || [{ title:"Build your own lunch", groups:bm.groups }]).forEach(b =>
  (b.groups||[]).forEach(g => (g.items||[]).forEach(it => note(it.id, `${b.title} list`)))));
const hits = [];
where.forEach((w, n) => { const a = avoid.find(re => re.test(n)); if(a && !allow.some(re => re.test(n))) hits.push(`${n}: matches "${a.source}" (on ${[...w].slice(0,3).join(", ")}${w.size > 3 ? " and more" : ""})`); });
where.forEach((w, n) => only.forEach(o => { if(!o.f.test(n)) return; const bad = [...w].filter(x => !o.m.test(x));
  if(bad.length) hits.push(`${n}: only in ${o.m.source}, but on ${bad.slice(0,3).join(", ")}${bad.length > 3 ? " and more" : ""}`); }));
const names = [...where.keys()];
const present = loves.filter(re => names.some(n => re.test(n))).map(re => re.source), missing = loves.filter(re => !names.some(n => re.test(n))).map(re => re.source);
if(hits.length){ console.log("FOODS THE CLIENT SAID THEY AVOID:"); hits.forEach(h => console.log("   " + h)); }
if(missing.length) console.log(`loved, not on the plan: ${missing.join(", ")}`);
console.log(`${names.length} foods checked against ${path.basename(ansFile)}: ${hits.length} the client avoids; ${present.length} of ${loves.length} loved foods on the plan`);
process.exit(hits.length ? 1 : 0);
