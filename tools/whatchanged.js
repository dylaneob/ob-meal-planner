// What changed between two versions of a client's plan (2026-10-14). The same comparison the planner's History window
// shows: every change for the coach, grouped across days, and a short message for the client to paste.
// Usage: node tools/whatchanged.js <older record.json> <newer record.json>
"use strict";
const fs = require("fs"), path = require("path");
const T = require(path.join(__dirname, "checks", "loader.js"));
const [a, b] = process.argv.slice(2);
if(!a || !b){ console.error("usage: node tools/whatchanged.js <older.json> <newer.json>"); process.exit(2); }
const A = JSON.parse(fs.readFileSync(a, "utf8")), B = JSON.parse(fs.readFileSync(b, "utf8"));
let d; T.withProfile(B.profile, () => { d = T.planDiff(A, B); });
console.log("FOR THE COACH:"); d.coach.forEach(x => console.log("  " + x));
if(!d.coach.length) console.log("  no changes");
console.log("\nFOR THE CLIENT:\n  " + d.client);
