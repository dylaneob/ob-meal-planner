#!/usr/bin/env python3
# The most food a hand-built plan's macros allow (2026-10-09, a client: "she has a big appetite").
# An integer program over portion sizes (5 g steps, whole tortillas): every macro, per-meal calorie band, per-meal cap and
# A/B pairing is a hard constraint, and the objective is grams of food (almond milk counts half, powders nothing). When
# the spec cannot be met it says which constraint is impossible and by how much, instead of a bare "infeasible".
# What it taught on her plan: at 1,400 cal / 110 g protein / 45 g fat protein binds first (at their smallest portions her
# days already carried 106 g), so egg whites and yogurt have little room and the volume comes from vegetables and fruit.
#
# Usage:  python3 tools/volume_fit.py tools/volume_fit.example.json      (needs scipy; foods come from app/data/foods.js)
# Spec (see the example, her v3 menus):
#   targets: kcal [lo,hi], protein [lo,hi], fat [lo,hi], fibre_min, optional fibre_max, carb_minus_half_fibre [lo,hi]
#            (label carbs count fibre at 4 cal a gram, real calories at about 2: aim carbs at the remainder + fibre/2)
#   order:   meal names in print order; bands: {meal: [kcal lo, hi]}; pairs: [[meal, max kcal gap, max protein gap]]
#            (a trade stands in for the A and the B version of a meal); min_grams: [[day, meal, grams of food]]
#   menu:    {"S": shared meals, "A": {...}, "B": {...}}, each meal a list of [food name, min g, max g, optional step]
#            (min == max fixes a row; Corn tortilla steps by 24 g)
# Then put the portions into the builder and let it land the last calories; the builder's checks are the gate.
import json, subprocess, sys, os
import numpy as np
from scipy.optimize import milp, LinearConstraint, Bounds

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = json.load(open(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "tools", "volume_fit.example.json")))
names = sorted({it[0] for meals in spec["menu"].values() for items in meals.values() for it in items})
js = ("const T=require(%r); const out={}; for(const n of JSON.parse(process.argv[1])){ const f=T.FOODS.find(x=>x.name===n);"
      " if(!f){ console.error('missing food: '+n); process.exit(2); } out[n]={k:f.kcal/100,p:f.protein_g/100,f:f.fat_g/100,"
      "c:f.carb_g/100,fib:f.fiber_g/100,fe:(f.iron_mg||0)/100,cap:T.maxServeG(f)}; } console.log(JSON.stringify(out));"
      % os.path.join(ROOT, "tools", "checks", "loader.js"))
F = json.loads(subprocess.run(["node", "-e", js, json.dumps(names)], capture_output=True, text=True, check=True).stdout)

rows = []   # (day, meal, food, lo, hi, step); day "S" is shared by A and B
for day, meals in spec["menu"].items():
    for meal, items in meals.items():
        for it in items:
            food, lo, hi = it[0], it[1], it[2]
            step = it[3] if len(it) > 3 else (24 if food == "Corn tortilla" else 5)
            if lo == hi: step = lo
            if hi > F[food]["cap"] + 2: print(f"note: {day} {meal} {food} max {hi} g is over the planner's {F[food]['cap']:g} g cap")
            rows.append((day, meal, food, lo, hi, step))
n = len(rows); g = np.array([r[5] for r in rows], float)
solid = lambda f: not any(s in f for s in ("Almond milk", "powder"))

def vec(key, day=None, meal=None):
    v = np.zeros(n)
    for i, (d, m, f, lo, hi, st) in enumerate(rows):
        if day and d not in (day, "S"): continue
        if meal and m != meal: continue
        v[i] = F[f][key] * st
    return v

C, T = [], spec["targets"]   # (name, vector, lo, hi)
for day in ("A", "B"):
    C += [(f"{day} calories", vec("k", day), *T["kcal"]), (f"{day} protein", vec("p", day), *T["protein"]),
          (f"{day} fat", vec("f", day), *T["fat"]), (f"{day} fibre", vec("fib", day), T["fibre_min"], T.get("fibre_max", 1e6)),
          (f"{day} carbs - fibre/2", vec("c", day) - 0.5 * vec("fib", day), *T["carb_minus_half_fibre"])]
    for meal, (lo, hi) in spec.get("bands", {}).items():
        v = vec("k", day, meal)
        if v.any(): C.append((f"{day} {meal} calories", v, lo, hi))
for day, meal, mg in spec.get("min_grams", []):
    v = np.array([st if (m == meal and d in (day, "S") and solid(f)) else 0 for (d, m, f, lo, hi, st) in rows], float)
    C.append((f"{day} {meal} grams", v, mg, 1e7))
for meal, dk, dp in spec.get("pairs", []):
    for key, lim, lab in (("k", dk, "calories"), ("p", dp, "protein")):
        v = np.array([(1 if d == "A" else -1 if d == "B" else 0) * F[f][key] * st if m == meal else 0
                      for (d, m, f, lo, hi, st) in rows], float)
        C.append((f"A/B {meal} {lab}", v, -lim, lim))

w = np.array([0.5 if "Almond milk" in r[2] else 0 if "powder" in r[2] else 1 for r in rows], float) * g
lb = np.array([r[3] / r[5] for r in rows]); ub = np.array([r[4] / r[5] for r in rows])
res = milp(c=-w, constraints=[LinearConstraint(np.array([c[1] for c in C]), [c[2] for c in C], [c[3] for c in C])],
           integrality=np.ones(n), bounds=Bounds(lb, ub))
if res.x is None:
    # elastic version: every constraint may bend at a high price; what bends is what cannot be met
    m = len(C); A = np.zeros((m, n + 2 * m))
    for j, c in enumerate(C): A[j, :n] = c[1]; A[j, n + j] = 1; A[j, n + m + j] = -1
    r2 = milp(c=np.concatenate([-w, 1000 * np.ones(2 * m)]),
              constraints=[LinearConstraint(A, [c[2] for c in C], [c[3] for c in C])],
              integrality=np.concatenate([np.ones(n), np.zeros(2 * m)]),
              bounds=Bounds(np.concatenate([lb, np.zeros(2 * m)]), np.concatenate([ub, np.full(2 * m, np.inf)])))
    print("Cannot meet every constraint. The ones that have to give, and by how much:")
    s = r2.x[n:]
    for j, c in enumerate(C):
        if s[j] > 1e-6: print(f"   {c[0]}: {s[j]:.1f} short of its minimum")
        if s[m + j] > 1e-6: print(f"   {c[0]}: {s[m + j]:.1f} over its maximum")
    sys.exit(1)

x = np.round(res.x) * g
for day in ("A", "B"):
    tot = dict(k=0.0, p=0.0, f=0.0, c=0.0, fib=0.0, fe=0.0); grams = 0.0; out = []
    for meal in spec["order"]:
        mt = dict(k=0.0, p=0.0, f=0.0, c=0.0, fib=0.0); mg = 0.0; items = []
        for i, (d, mm, f, lo, hi, st) in enumerate(rows):
            if mm != meal or d not in (day, "S"): continue
            for k in mt: mt[k] += F[f][k] * x[i]
            tot["fe"] += F[f]["fe"] * x[i]
            if solid(f): mg += x[i]
            at = "*" if lo < hi and (abs(x[i] - lo) < 0.1 or abs(x[i] - hi) < 0.1) else ""
            items.append(f"{f.split(',')[0]} {x[i]:g}{at}")
        for k in mt: tot[k] += mt[k]
        grams += mg
        out.append(f"  {meal:10} {mt['k']:4.0f} cal P{mt['p']:.0f} F{mt['f']:.0f} C{mt['c']:.0f} fib{mt['fib']:.0f} | {mg:.0f} g | " + ", ".join(items))
    print(f"{day}: {tot['k']:.0f} cal P{tot['p']:.1f} F{tot['f']:.1f} C{tot['c']:.0f} fibre {tot['fib']:.0f} iron {tot['fe']:.1f} mg | FOOD {grams:.0f} g")
    print("\n".join(out))
print("(* = at its min or max: the constraint that set it)")
