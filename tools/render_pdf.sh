#!/bin/zsh
# Render one saved client's plan to PDF, headless, without touching any browser's saved clients.
# Usage: tools/render_pdf.sh "<client key>" <record.json> <slug> <out.pdf>
# Prints the page count, a copy check, a full PDF check (tools/verify_pdf.py) and a step check (tools/checks/step_diff.js:
# hand-written recipes print as written); exits 1 if the PDF or the step check fails. Then the client-eye review.
# Needs the planner served on :8765 (the Claude app preview "ob-meal-planner", or: python3 tools/serve.py 8765), or on the
# port in OB_PORT (OB_PORT=8766 tools/render_pdf.sh ...) when 8765 is taken: on 2026-10-05 another tool's server held
# 127.0.0.1:8765 and every render printed its one-word page.
# The render page ADDS its one client to a throwaway headless profile; never open app/_render-*.html in the browser
# where you keep your clients.
set -e
DIR="${0:A:h}"
python3 "$DIR/mkrender.py" "$1" "$2" "$3"
# 2026-11-04: each render gets its own empty Chrome profile, deleted afterwards, so renders running at the same time
# (tools/plans_changed.js) cannot see each other's saved clients. The render page seeds its one client into it.
# (A blank 1-page PDF, "0 food rows", when several render at once meant the server dropped connections: tools/serve.py.)
PROFILE="$(mktemp -d -t obrender)"; trap 'rm -rf "$PROFILE"' EXIT
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --user-data-dir="$PROFILE" --no-first-run --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=15000 --print-to-pdf="$4" "http://localhost:${OB_PORT:-8765}/_render-$3.html" 2>/dev/null
pdfinfo "$4" | grep Pages
# copy check: the phrases removed from client PDFs on 2026-09-24 must not come back
T="$(mktemp -t obcopy).txt"; pdftotext -layout "$4" "$T" 2>/dev/null || true
HITS=$(python3 - "$T" <<'PY'
import re, sys
t = re.sub(r"\s+", " ", open(sys.argv[1]).read())
bad = [("em/en dash", r"[—–]"), ("template hedge", r"whichever your plan lists"), ("planner jargon", r"\bslots?\b|if (that|this) is your (carb|protein|pick|fat)"),
       ("'not X, it is Y'", r"\b(is not|isn't|are not|aren't) [^.,;]{1,40}[,;] (it|that|this)('s| is)\b"), ("filler", r"\bwhole game\b|\bon purpose\b|\bthe single biggest\b")]
out = []
for name, rx in bad:
    for m in re.finditer(rx, t, re.I):
        out.append("%s: ...%s..." % (name, t[max(0, m.start()-40):m.end()+40]))
print("\n".join(out[:12]))
PY
)
if [ -n "$HITS" ]; then echo "COPY CHECK: phrases to fix"; echo "$HITS"; else echo "copy check: clean"; fi
rm -f "$T"
# numbers and colour: every food row, meal total, day header and swap option recomputed from foods.js, and no blue
python3 "$DIR/verify_pdf.py" "$4" || { echo "PDF CHECK FAILED: do not send this PDF"; exit 1; }
# hand-written recipe steps (cook.verbatim) must print as written: no food swapped, no clause dropped, nothing appended
# (2026-10-09: a client's "top with the kiwi" had printed "top with the medjool dates"); and every printed
# step, library ones too, must read as whole sentences (2026-10-14: a client's "If you want it sweeter.")
STEP_OUT=$(node "$DIR/checks/step_diff.js" "$2" 2>&1) && STEP_OK=1 || STEP_OK=0
echo "step check: $(echo "$STEP_OUT" | tail -1)"
[ "$STEP_OK" = 1 ] || { echo "$STEP_OUT" | head -40; echo "STEP CHECK FAILED: a hand-written recipe changed or a step reads broken; do not send this PDF"; exit 1; }
# the client's own words (client-files/<slug>.answers.md, 2026-10-14): no food they said they avoid is on the plan
ANS="$DIR/../client-files/$3.answers.md"
[ -f "$ANS" ] || ANS="$DIR/../client-files/${3%%-*}.answers.md"   # a second plan for the same client (yuliya-quick -> yuliya)
if [ -f "$ANS" ]; then
  FACT_OUT=$(node "$DIR/checks/client_facts.js" "$2" "$ANS" 2>&1) && FACT_OK=1 || FACT_OK=0
  echo "client check: $(echo "$FACT_OUT" | tail -1)"
  [ "$FACT_OK" = 1 ] || { echo "$FACT_OUT" | head -30; echo "CLIENT CHECK FAILED: a food the client said they avoid is on the plan; do not send this PDF"; exit 1; }
else
  echo "client check: no client-files/$3.answers.md (add the client's own answers to check the foods against them)"
fi
echo "next, before it goes to OB: the client-eye review in tools/review/CLIENT-EYE-REVIEW.md"
