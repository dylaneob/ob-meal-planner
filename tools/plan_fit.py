#!/usr/bin/env python3
# Exact portions for a hand-built week whose meals are shared between days (2026-10-10, a client: each dinner's
# second plate is the next day's lunch, and the prepped breakfasts, snacks and desserts repeat on alternate days).
# A coordinate search over shared dishes stalls a few grams of protein and ~10 calories off on some days: moving one
# dish moves two days. This solves it as an integer program (scipy milp): every portion moves in its own step (5 g,
# 2 g, whole pieces), every day must land inside the macro ranges, every meal inside its calorie band, and among the
# portions that do, it picks the ones closest to the recipe's starting weights.
# When no portions can meet everything, it says which ranges have to give, and by how much (an elastic re-solve).
#
# Usage: python3 tools/plan_fit.py spec.json result.json   (a builder writes the spec and reads the result; see
#        app/_clients/build-courtney.js). The result goes to a file: the solver library can print its own lines to stdout.
# Spec: {"days":[{"name","fixed":{k,p,c,f,fib},"meal_fixed":{meal: kcal}}],
#        "levers":[{"tag","per_g":{k,p,c,f,fib},"step","min","max","start","uses":[[day index, meal], ...]}],
#        "targets":{"k":[lo,hi],"p":[lo,hi],"f":[lo,hi],"fib":[lo,hi],"c_net":[lo,hi]},   (c_net = carbs - fibre/2)
#        "bands":{meal:[lo,hi]},
#        "pbands":{meal:[lo,hi]},   (optional: a meal's protein grams, with days[i].meal_fixed_p; a client, 2026-10-30)
#        "gbands":{meal:[lo,hi]}}   (optional: a meal's weight on the plate, with days[i].meal_fixed_g; a client,
#                                    2026-10-31: after her sleeve surgery a meal is 8 oz of food at most)
#        targets may also hold "c" (total carbs), for a client given all four numbers
# Result: {"ok":true,"grams":{tag: grams}} or {"ok":false,"give":[["Sunday protein", "short", 2.3], ...]}
import json, sys
try:
    import numpy as np
    from scipy.optimize import milp, LinearConstraint, Bounds
except ImportError as e:
    # 2026-11-04, the Mac mini: Homebrew has twice pointed python3 at a Python without OB's packages (3.15 on 11-03, then
    # macOS's own 3.9.6). Every builder then died with a Node stack trace around "No module named 'numpy'". Say what to do.
    v = "%d.%d" % sys.version_info[:2]
    fix = ("brew unlink python@%s; brew unlink python@3.14 && brew link python@3.14" % v if sys.executable.startswith("/opt/homebrew")
           else "ln -sf ../opt/python@3.14/bin/python3.14 /opt/homebrew/bin/python3   (Homebrew's python3 link is missing)")
    sys.exit("plan_fit: python3 is %s (Python %s), which has no %s. The planner needs Python 3.14 with numpy and scipy.\n"
             "Fix: %s\nThen python3 --version should print 3.14, and the build can run again." % (sys.executable, sys.version.split()[0], e.name, fix))

spec = json.load(open(sys.argv[1]))
def out(obj):
    if len(sys.argv) > 2: json.dump(obj, open(sys.argv[2], "w"))
    else: print(json.dumps(obj))
days, levers, T, bands, pbands = spec["days"], spec["levers"], spec["targets"], spec.get("bands", {}), spec.get("pbands", {})
gbands = spec.get("gbands", {})
n = len(levers)
keys = ["k", "p", "c", "f", "fib"]

def row(day_i, key, meal=None):
    """grams of each lever (as step counts) times its per-gram value, for one day (and one meal)"""
    v = np.zeros(n)
    for j, L in enumerate(levers):
        mult = sum(1 for d, m in L["uses"] if d == day_i and (meal is None or m == meal))
        if not mult: continue
        val = L["per_g"].get("g", 1.0) if key == "g" else L["per_g"]["c"] - L["per_g"]["fib"] / 2 if key == "c_net" else L["per_g"][key]
        v[j] = mult * val * L["step"]
    return v

C = []   # (label, vector over levers, lo, hi) with the fixed foods moved to the bounds
for i, d in enumerate(days):
    fx = d["fixed"]
    for key in keys + ["c_net"]:
        if key not in T: continue
        base = fx["c"] - fx["fib"] / 2 if key == "c_net" else fx[key]
        C.append((f'{d["name"]} {key}', row(i, key), T[key][0] - base, T[key][1] - base))
    for meal, (lo, hi) in bands.items():
        mf = d["meal_fixed"].get(meal)
        if mf is None: continue
        C.append((f'{d["name"]} {meal} kcal', row(i, "k", meal), lo - mf, hi - mf))
    for meal, (lo, hi) in pbands.items():
        mf = d.get("meal_fixed_p", {}).get(meal)
        if mf is None: continue
        C.append((f'{d["name"]} {meal} protein', row(i, "p", meal), lo - mf, hi - mf))
    for meal, (lo, hi) in gbands.items():
        mf = d.get("meal_fixed_g", {}).get(meal)
        if mf is None: continue
        C.append((f'{d["name"]} {meal} grams', row(i, "g", meal), lo - mf, hi - mf))

lb = np.array([np.ceil(L["min"] / L["step"] - 1e-9) for L in levers])
ub = np.array([np.floor(L["max"] / L["step"] + 1e-9) for L in levers])
start = np.array([L["start"] / L["step"] for L in levers])
w = np.array([L["step"] / max(20.0, L["start"]) for L in levers])   # a step's share of the starting weight

# variables: x (step counts, integer), then d (|x - start|, continuous)
A = np.zeros((len(C) + 2 * n, 2 * n)); lo = []; hi = []
for r, (_, v, a, b) in enumerate(C): A[r, :n] = v; lo.append(a); hi.append(b)
for j in range(n):   # d_j >= x_j - s_j  and  d_j >= s_j - x_j
    A[len(C) + 2 * j, j] = 1; A[len(C) + 2 * j, n + j] = -1; lo.append(-np.inf); hi.append(start[j])
    A[len(C) + 2 * j + 1, j] = -1; A[len(C) + 2 * j + 1, n + j] = -1; lo.append(-np.inf); hi.append(-start[j])
res = milp(c=np.concatenate([np.zeros(n), w]), constraints=[LinearConstraint(A, lo, hi)],
           integrality=np.concatenate([np.ones(n), np.zeros(n)]),
           bounds=Bounds(np.concatenate([lb, np.zeros(n)]), np.concatenate([ub, np.full(n, np.inf)])),
           options={"time_limit": 60})
if res.x is not None:
    x = np.round(res.x[:n])
    out({"ok": True, "grams": {L["tag"]: float(x[j] * L["step"]) for j, L in enumerate(levers)}})
    sys.exit(0)

# elastic: every range may bend at a high price; what bends is what cannot be met
m = len(C)
A2 = np.zeros((m, n + 2 * m))
for r, (_, v, a, b) in enumerate(C): A2[r, :n] = v; A2[r, n + r] = 1; A2[r, n + m + r] = -1
r2 = milp(c=np.concatenate([np.zeros(n), np.ones(2 * m)]), constraints=[LinearConstraint(A2, [c[2] for c in C], [c[3] for c in C])],
          integrality=np.concatenate([np.ones(n), np.zeros(2 * m)]),
          bounds=Bounds(np.concatenate([lb, np.zeros(2 * m)]), np.concatenate([ub, np.full(2 * m, np.inf)])),
          options={"time_limit": 60})
give, pinned = [], []
if r2.x is not None:
    s = r2.x[n:]
    for r, (label, *_rest) in enumerate(C):
        if s[r] > 1e-6: give.append([label, "short", round(float(s[r]), 1)])
        if s[m + r] > 1e-6: give.append([label, "over", round(float(s[m + r]), 1)])
    # the portions sitting on a limit in that best attempt: widening one of these is usually the fix
    xs = np.round(r2.x[:n])
    for j, L in enumerate(levers):
        if xs[j] <= lb[j]: pinned.append([L["tag"], "at its minimum", float(xs[j] * L["step"])])
        elif xs[j] >= ub[j]: pinned.append([L["tag"], "at its maximum", float(xs[j] * L["step"])])
out({"ok": False, "give": give, "pinned": pinned})
