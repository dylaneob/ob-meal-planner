#!/bin/zsh
# Release regression: the template lint, the invariant harness (40 configs x 12 batches = 480 days), then the three checks
# in tools/checks (calories over 400 days, step amounts vs the food list, dish titles vs the food list).
# Since 2026-11-04 (the Mac mini, 18 cores) it builds the 480 test days once, spread over OB_REGRESS_JOBS processes
# (default 12; tools/checks/prebuild_days.js), then runs the five checks at the same time, each reading those days instead
# of building them again (tools/checks/daycache.js). Same checks, same counts: about 30 seconds instead of 6 minutes
# (11-12 on the old Air). OB_REGRESS_SERIAL=1 runs the old way (no day cache, one check after another), for comparison.
# Usage: tools/regress.sh                         (from any folder)
#        APPDIR=<copy of app/> tools/regress.sh    (every step runs on that copy, e.g. a snapshot from before a change)
#        OB_REGRESS_KEEP=<folder> tools/regress.sh (also saves each check's full output there)
# Prints one line per check: "ok" or "FAIL", then the check's own summary. FAIL means the step exited non-zero, printed no
# summary, or its count is not 0 (lint errors, harness failures, days outside 0.3% of calories or not built out of 400,
# step amounts that disagree with the list, titles naming a food the list does not have). A failing step's full output is
# printed under its line, and the script exits 1.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="${APPDIR:-$ROOT/app}"
CHECKS="$ROOT/tools/checks"
JOBS="${OB_REGRESS_JOBS:-12}"
TMP="$(mktemp -d -t obregress)"
trap 'rm -rf "$TMP"' EXIT
failed=0
SECONDS=0

first() { printf '%s\n' "$1" | grep -E -m1 -- "$2"; }     # first line of $1 that matches $2
num()   { printf '%s\n' "$1" | sed -nE "s/.*$2.*/\1/p"; } # the number that $2 captures in $1
report() {  # report LABEL EXIT_STATUS SUMMARY BAD_COUNT FULL_OUTPUT
  if [[ $2 -eq 0 && -n $3 && $4 == 0 ]]; then
    printf '%-14s ok    %s\n' "$1" "$3"
  else
    printf '%-14s FAIL  %s\n' "$1" "${3:-no summary line (exit $2)}"
    printf '%s\n' "$5" | sed 's/^/    /'
    failed=1
  fi
}
step() {    # step NAME COMMAND...: full output to $TMP/NAME.out, exit status to $TMP/NAME.st
  local name=$1; shift
  "$@" > "$TMP/$name.out" 2>&1; echo $? > "$TMP/$name.st"
}

if [[ -n $OB_REGRESS_SERIAL ]]; then
  mode="serial"
  step lint    node "$APP/lint-templates.js"
  step harness node "$APP/harness-node.js" 40 12
  step cal4    node "$CHECKS/cal4.js"
  step steps   node "$CHECKS/stepamounts.js"
  step titles  node "$CHECKS/titlecheck.js"
else
  mode="$JOBS processes"
  # 1) the test days (batches 1-12 x 40 configs; the checks use batches 1-12, 1-10, 1-6 and 1-6), each built once
  mkdir "$TMP/days"
  pids=()
  for (( k = 0; k < JOBS; k++ )); do
    node "$CHECKS/prebuild_days.js" 12 $k $JOBS "$TMP/days/days-$k.json" > "$TMP/days/log-$k" 2>&1 &
    pids+=($!)
  done
  for (( k = 0; k < JOBS; k++ )); do
    # a share that fails leaves its days out of the cache; the checks then build those days themselves (slower, same result)
    wait ${pids[k+1]} || { echo "day cache: share $k failed, the checks build its days themselves"; sed 's/^/    /' "$TMP/days/log-$k" | head -8; }
  done
  export OB_DAYCACHE="$TMP/days" OB_DAYCACHE_JS="$CHECKS/daycache.js"
  # 2) the five checks at the same time
  step lint    node "$APP/lint-templates.js" &
  step harness node "$APP/harness-node.js" 40 12 &
  step cal4    node "$CHECKS/cal4.js" &
  step steps   node "$CHECKS/stepamounts.js" &
  step titles  node "$CHECKS/titlecheck.js" &
  wait
fi
[[ -n $OB_REGRESS_KEEP ]] && mkdir -p "$OB_REGRESS_KEEP" && cp "$TMP"/*.out "$OB_REGRESS_KEEP"/
res() { out=$(<"$TMP/$1.out"); st=$(<"$TMP/$1.st"); }

res lint
line=$(first "$out" '^TEMPLATE LINT:')
report "template lint" $st "$line" "$(num "$line" ' ([0-9]+) errors')" "$out"

# the harness prints the lint headline, then one JSON object
res harness
line=$(printf '%s\n' "$out" | node -e 'const s=require("fs").readFileSync(0,"utf8"), j=JSON.parse(s.slice(s.indexOf("\n{")+1));
  console.log(`ran ${j.ran} | dayFails ${j.dayFails} | totalFailures ${j.totalFailures}`)' 2>/dev/null)
report "harness" $st "$line" "$(num "$line" 'totalFailures ([0-9]+)')" "$out"

# cal4 skips a day the builder could not build, so fewer than 400 days is a failure too
res cal4
line=$(first "$out" '^days [0-9]+ [|]')
days=$(num "$line" 'days ([0-9]+) [|]'); outside=$(num "$line" 'calories: ([0-9]+)')
report "cal4" $st "$line" "$(( ${outside:-1} + 400 - ${days:-0} ))" "$out"

res steps
line=$(first "$out" 'amount disagrees with the list:')
report "step amounts" $st "$line" "$(num "$line" 'disagrees with the list: ([0-9]+)')" "$out"

res titles
line=$(first "$out" 'title names a food the list does not have:')
report "titles" $st "$line" "$(num "$line" 'does not have: ([0-9]+)')" "$out"

printf 'regress: %ss (%s)\n' $SECONDS "$mode"
exit $failed
