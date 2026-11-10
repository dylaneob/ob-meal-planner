// Which clients' plans would print differently today? (2026-11-04, the Mac mini: a render with all its checks takes ~3 s,
// so every client fits in about a minute.) For each plan in client-files/current-plans.json it re-renders the record(s)
// with today's planner through tools/render_pdf.sh (so every PDF check runs again too), then compares the text with the
// PDF the client has. Nothing is written outside a temp folder; no client file changes. Whether to re-send is OB's call.
// Usage: node tools/plans_changed.js                 every plan in the list
//        node tools/plans_changed.js arpan sarah     only plans whose client name contains one of these words
//        node tools/plans_changed.js --full qui      the whole text difference for those plans
// Needs the planner served (the "ob-meal-planner" preview on :8765, or :8766, or OB_PORT). OB_PLANS_JOBS renders at once (6).
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), http = require("http");
const { spawn, spawnSync } = require("child_process");
const ROOT = path.join(__dirname, ".."), FILES = path.join(ROOT, "client-files");
const ARCHIVE = "/Volumes/OB-ARCHIVE/OB-BUSINESS-FILES/meal-plans";
const args = process.argv.slice(2), full = args.includes("--full"), words = args.filter(a => a !== "--full").map(a => a.toLowerCase());
const plans = JSON.parse(fs.readFileSync(path.join(FILES, "current-plans.json"), "utf8")).plans
  .filter(p => !words.length || words.some(w => p.client.toLowerCase().includes(w)));
if(!plans.length){ console.error("no plan in client-files/current-plans.json matches " + words.join(", ")); process.exit(2); }
const JOBS = +process.env.OB_PLANS_JOBS || 6;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "obplans-"));

const serves = port => new Promise(res => {
  const r = http.get({ host: "localhost", port, path: "/index.html", timeout: 1500 }, s => { let b = ""; s.on("data", d => b += d); s.on("end", () => res(/OB Meal Planner/.test(b))); });
  r.on("error", () => res(false)); r.on("timeout", () => { r.destroy(); res(false); });
});
// the words a client reads, in order: compared word by word (diff), so a sentence that only wraps or groups differently on
// the page is no change; bare page-number lines are dropped and the cover's render date is masked
const text = pdf => spawnSync("pdftotext", [pdf, "-"], { encoding: "utf8", maxBuffer: 64 << 20 }).stdout
  .split("\n").filter(l => !/^\s*(page )?\d+( of \d+)?\s*$/i.test(l)).join(" ")
  .replace(/\b(\d+-day plan), [A-Z][a-z]+ \d{1,2}, \d{4}/g, "$1, <render date>").split(/\s+/).filter(Boolean);
const theirPdf = name => [path.join(FILES, name), path.join(ARCHIVE, name)].find(f => fs.existsSync(f));
const render = (port, r, out) => new Promise(res => {
  const p = spawn(path.join(__dirname, "render_pdf.sh"), [r.key, path.join(ROOT, "app", "_clients", r.record), r.slug, out], { env: { ...process.env, OB_PORT: String(port) } });
  let log = ""; p.stdout.on("data", d => log += d); p.stderr.on("data", d => log += d); p.on("close", st => res({ st, log }));
});

(async () => {
  const port = [process.env.OB_PORT, 8765, 8766].filter(Boolean);
  let use = null; for(const p of port) if(await serves(+p)){ use = +p; break; }
  if(!use){ console.error("the planner is not being served on " + port.join(" or ") + ": start the ob-meal-planner preview (or python3 tools/serve.py 8765)"); process.exit(2); }
  const t0 = Date.now(), rows = [];
  let next = 0;
  const worker = async () => { while(next < plans.length){ const p = plans[next++]; rows.push(await one(p)); } };
  async function one(p){
    const row = { client: p.client, pdf: p.pdf, problems: [] };
    const have = theirPdf(p.pdf);
    if(!have) row.problems.push("their PDF is not in client-files or on OB-ARCHIVE (is the drive connected?)");
    const now = [];
    for(const r of p.renders){
      const out = path.join(TMP, r.slug + ".pdf"), { st, log } = await render(use, r, out);
      const failed = log.split("\n").filter(l => /FAILED|COPY CHECK: phrases/.test(l));
      if(st !== 0 || failed.length){ const L = log.trim().split("\n"), at = L.findIndex(l => /FAILED|COPY CHECK/.test(l));
        row.problems.push(`${r.record}: ${failed.join("; ") || "render exited " + st}` + (at > 0 ? "\n      " + L.slice(Math.max(0, at - 4), at).join("\n      ") : "")); }
      if(fs.existsSync(out)) now.push(...text(out));
    }
    if(have && now.length){
      const fa = path.join(TMP, p.renders[0].slug + ".theirs.txt"), fb = path.join(TMP, p.renders[0].slug + ".now.txt");
      fs.writeFileSync(fa, text(have).join("\n") + "\n"); fs.writeFileSync(fb, now.join("\n") + "\n");
      // one change per diff hunk: the words that were there, and the words there now
      row.changes = [];
      spawnSync("diff", [fa, fb], { encoding: "utf8", maxBuffer: 64 << 20 }).stdout.split(/\n(?=\d)/).forEach(h => {
        if(!/^\d/.test(h)) return;
        const L = h.split("\n");
        row.changes.push({ was: L.filter(l => l.startsWith("< ")).map(l => l.slice(2)), now: L.filter(l => l.startsWith("> ")).map(l => l.slice(2)) });
      });
      // the PDF's text order inside a meal card can change when the card reflows, so the same words show up as gone in
      // one place and new in another: a change whose every word is balanced by the opposite change elsewhere only moved
      const bal = new Map(), add = (w, d) => bal.set(w, (bal.get(w) || 0) + d);
      row.changes.forEach(c => { c.now.forEach(w => add(w, 1)); c.was.forEach(w => add(w, -1)); });
      const total = row.changes.length;
      row.changes = row.changes.filter(c => c.now.some(w => bal.get(w) > 0) || c.was.some(w => bal.get(w) < 0))
        .map(c => ({ was: c.was.join(" "), now: c.now.join(" ") }));
      row.moved = total - row.changes.length;
    }
    return row;
  }
  await Promise.all(Array.from({ length: Math.min(JOBS, plans.length) }, worker));
  rows.sort((x, y) => plans.findIndex(p => p.client === x.client) - plans.findIndex(p => p.client === y.client));
  const cut = s => s.length > 110 ? s.slice(0, 107) + "..." : s;
  for(const r of rows){
    const moved = r.moved ? ` (plus ${r.moved} spot(s) where the same words only moved on the page)` : "";
    const diff = r.changes === undefined ? "not compared" : !r.changes.length ? "same as the PDF they have" + moved : `prints differently: ${r.changes.length} change(s)` + moved;
    console.log(`${r.client}  (${r.pdf})\n  ${diff}${r.problems.length ? "\n  CHECK: " + r.problems.join("\n  CHECK: ") : ""}`);
    const n = full ? Infinity : 4;
    (r.changes || []).slice(0, n).forEach(c => console.log(c.now && c.was ? `    now: ${full ? c.now : cut(c.now)}\n      was: ${full ? c.was : cut(c.was)}`
      : c.now ? `    new: ${full ? c.now : cut(c.now)}` : `    gone: ${full ? c.was : cut(c.was)}`));
    if(!full && r.changes && r.changes.length > n) console.log(`    ... (node tools/plans_changed.js --full "${r.client.split(" ")[0].toLowerCase()}" for all of it)`);
  }
  console.log(`\n${rows.length} plan(s) in ${Math.round((Date.now() - t0) / 1000)}s on :${use}`);
  fs.rmSync(TMP, { recursive: true, force: true });
  process.exit(rows.some(r => r.problems.length) ? 1 : 0);
})();
