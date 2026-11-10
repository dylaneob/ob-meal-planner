// Did the planner change what a hand-built plan's recipe steps say? (2026-10-09) And does any printed step read broken?
// (2026-10-14)
// The step engine (planSteps -> fitSteps / stepSwaps / ensureCookSteps) rewrites recipe text against each meal's list. That
// is right for the shared library, where the solver swaps foods, and silently wrong for a client's hand-written steps:
// on a client's plan "top with the raspberries and the kiwi" printed "...and the medjool dates", "add the
// spicy mayo" was deleted, and "Have the banana (101g) on the side" was appended. A builder marks its hand-written steps
// cook.verbatim (the engine then prints them as written); this runs every one through the planner and reports each word
// added or removed, any line the print adds for a listed food the steps never mention, and the "Yours has no ..., so skip
// that part of the recipe" line the print adds when the steps name a food the meal does not have.
// 2026-10-14 (a client): his builder's steps were not marked verbatim, so nothing here looked at them, and the print
// shipped "If you want it sweeter. Have it after dinner." (the engine drops a clause that names a food the meal lacks:
// "... blend in monk fruit sweetener to taste, as in your yogurt") and "Yours has no potatoes, so skip that part of the
// recipe" under a dessert whose steps said "while the potatoes air-fry". So EVERY printed step, library or hand-written,
// now also goes through a sentence check (a clause left standing alone, a doubled word, empty brackets, a stray comma),
// and a hand-built plan with steps not marked verbatim is reported (mark them, or they are rewritten as library text).
// Usage: node tools/checks/step_diff.js app/_clients/<client>.json [more.json ...]   (exit 1 on any finding)
"use strict";
const path = require("path"), fs = require("fs");
const T = require(path.join(__dirname, "loader.js"));
const files = process.argv.slice(2);
if(!files.length){ console.error("usage: node tools/checks/step_diff.js app/_clients/<client>.json ..."); process.exit(2); }
const words = s => String(s||"").toLowerCase().replace(/<[^>]+>/g, " ").replace(/\b\d{1,2}[.)]\s/g, " ")
  .match(/[a-z0-9½¼¾⅓⅔°'-]+/g) || [];
const bag = a => a.reduce((m, w) => (m.set(w, (m.get(w)||0) + 1), m), new Map());
const minus = (a, b) => { const out = []; for(const [w, n] of a){ const k = n - (b.get(w)||0); for(let i=0;i<k;i++) out.push(w); } return out; };
// a sentence a reader would stop at: a subordinate clause standing alone ("If you want it sweeter."), a doubled word,
// empty brackets, punctuation run together, a step that is only a number
const sentences = s => String(s||"").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").split(/(?<=[.!?])\s+|\s*\b\d{1,2}\.\s+/).map(x => x.trim()).filter(Boolean);
const SENTENCE_CHECKS = [
  ["clause left standing alone", x => /^(if|when|once|unless|while|until|as soon as|so that)\b[^,;:]*[.!?]$/i.test(x)],
  ["doubled word", x => /\b(the|a|an|and|or|with|of|to|in|on|it)\s+\1\b/i.test(x)],
  ["empty brackets or run-together punctuation", x => /\(\s*\)|\s[,.;:]\s*[,.;:]|,\s*\.|\(\s*[,.;:]/.test(x)],
];
const sentenceFindings = text => { const out = [];
  sentences(text).forEach(x => SENTENCE_CHECKS.forEach(([label, test]) => { if(test(x)) out.push(`${label}: "${x}"`); }));
  return out; };
let findings = 0, library = 0, hand = 0, unmarked = 0;
for(const file of files){
  const rec = JSON.parse(fs.readFileSync(file, "utf8")), seen = new Set();
  const meals = [];
  (rec.week||[]).forEach(d => (d.meals||[]).forEach(m => meals.push([d.name, m])));
  ((rec.profile||{}).trades||[]).forEach(t => meals.push(["Trades", { name: t.name, dish: t.dish, cook: t.cook, items: t.items }]));
  // a plan is hand-built when its builder marks steps verbatim; one that marks only some is mixing hand-written text with
  // library text, and its unmarked steps are rewritten without a word here (a client's were, until 2026-10-14)
  const anyVerbatim = meals.some(([, m]) => m.cook && m.cook.verbatim);
  const report = (day, m, notes) => { if(!notes.length) return; findings++;
    console.log(`${path.basename(file)} | ${day} | ${m.name}: ${m.dish}`); notes.forEach(n => console.log("   " + n)); };
  T.withProfile(rec.profile, () => meals.forEach(([day, m]) => {
    if(!m.cook) return;
    const key = m.dish + "|" + JSON.stringify(m.cook) + "|" + JSON.stringify(m.items); if(seen.has(key)) return; seen.add(key);
    const notes = [];
    const printed = ["method", "prepMethod"].map(k => m.cook[k] ? T.planSteps(m.cook[k], m) : "").filter(Boolean);
    const mismatch = T.stepsMismatch(m, m.cook);
    const extra = T.listExtrasLine(m, m.cook);   // the print adds this for a listed food the steps never mention
    if(m.cook.verbatim){
      hand++;
      ["method", "prepMethod"].forEach(k => {
        const src = m.cook[k]; if(!src) return;
        const out = T.planSteps(src, m), a = bag(words(src)), b = bag(words(out));
        const added = minus(b, a), removed = minus(a, b);
        if(removed.length) notes.push(`${k} removed: ${removed.join(" ")}`);
        if(added.length) notes.push(`${k} added:   ${added.join(" ")}`);
      });
      if(extra) notes.push(`appended: ${extra}`);
      if(mismatch.length) notes.push(`appended: Yours has no ${mismatch.join(", ")}, so skip that part of the recipe.`);
    } else {
      library++;
      // a builder that uses a library recipe ON PURPOSE beside its hand-written ones marks it cook.library (a client,
      // 2026-10-16: six library recipes he loves, two written out for his batch); an unmarked one is still reported
      if(anyVerbatim && !m.cook.library){ unmarked++; notes.push("hand-built plan, but these steps are not marked verbatim: the planner rewrites them as library text (mark them cook.library if that is on purpose)"); }
    }
    // every printed step, hand-written or library, read as a sentence
    printed.concat(mismatch.length ? [`Yours has no ${mismatch.join(", ")}, so skip that part of the recipe.`] : [], extra ? [extra] : [])
      .forEach(t => sentenceFindings(t).forEach(f => notes.push(f)));
    report(day, m, notes);
  }));
}
console.log(`${hand} hand-written recipe(s) checked word for word, ${library} library recipe(s) adapted by design and read as sentences; ${findings} with findings` + (unmarked ? ` (${unmarked} unmarked in a hand-built plan)` : ""));
process.exit(findings ? 1 : 0);
