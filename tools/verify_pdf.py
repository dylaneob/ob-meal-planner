#!/usr/bin/env python3
"""Check a rendered client PDF against the food database, and for blue.

Usage: python3 tools/verify_pdf.py <plan.pdf>        (render_pdf.sh runs it on every render)

What it checks, from the PDF itself (pdftotext), not from the plan data that made it:
  * every food row: calories, protein, carbs and fat recomputed from foods.js for the printed grams (1 unit tolerance)
  * every meal Total, and every day header against the sum of that day's meals
  * every pick-one option's own Total (options never count toward the day)
  * a grams-only plan (profile gramsOnly: Food and Amount columns, no meal Totals, day line "N calories, Ng protein"):
    every row's grams read and the day's calories and protein recomputed from foods.js against that line
  * a plan with no totals at all (profile noTotals): each weekday heading starts a day, every row's grams are read, and the
    day's recomputed calories and protein are reported (nothing printed to check them against)
  * every page rendered at 40 dpi, with no blue-dominant pixels (OB's client PDFs carry no blue)
Exits 1 on any mismatch, on any blue, or when no rows could be read at all (a layout change broke the parser).
Built from the checks run by hand on a client, a client and a client's plans (2026-09-30 to 2026-10-05).
"""
import glob, json, os, re, struct, subprocess, sys, tempfile, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
FOODS = os.path.join(HERE, "..", "app", "data", "foods.js")

def load_foods():
    src = open(FOODS, encoding="utf-8").read()
    return {f["name"]: f for f in json.loads(src[src.index("["): src.rindex("]") + 1])}

ROW = re.compile(r"^\s*(\S.*?\S)\s{2,}(.*?\(([\d.]+)g\))\s+(\d+)\s+(\d+)g\s+(\d+)g\s+(\d+)g\s*$")
# a row whose amount wrapped onto the lines around it ("2 cups spaghetti not / packed (248g)")
WRAPPED = re.compile(r"^\s*(\S.*?\S)\s{2,}(\d+)\s+(\d+)g\s+(\d+)g\s+(\d+)g\s*$")
TOTAL = re.compile(r"^\s*Total\s+([\d,]+)\s+(\d+)g\s+(\d+)g\s+(\d+)g\s*$")
READY = re.compile(r"^\s*(\S.*?), (.*?\(([\d.]+)g\)): (\d+) cal, (\d+)g protein, (\d+)g carbs, (\d+)g fat\.")
DAY = re.compile(r"^\s*(?:Each day: )?([\d,]+) calories(?: planned)?, (\d+)g protein, (\d+)g carbs, (\d+)g fat")
OPTION = re.compile(r"^\s*OPTION \d+\s+(.*)$")
# grams-only plans (a client, 2026-10-08): a row is "Food   amount (Ng)" and the day line has no carbs or fat
GROW = re.compile(r"^\s*(\S.*?\S)\s{2,}(\S.*?\(([\d.]+)g\)|([\d.]+)g)\s*$")   # "about 4 large (125g)" or a metric "120g"
DAYG = re.compile(r"^\s*(?:Each day: )?([\d,]+) calories(?: planned)?, (\d+)g protein\s*$")
DAYNAME = re.compile(r"^\s*(SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY)\s*$")
# the Trades page (profile trades): each "LUNCH TRADE Dish" is its own option, never part of a day
TRADES = re.compile(r"^\s*TRADES\s*$")
TRADE = re.compile(r"^\s*([A-Z][A-Z -]*?) TRADE\s+(.*)$")

def check_rows(txt, by):
    problems, n = [], 0
    meal, days, cur, picks, inpick = [0, 0, 0, 0], [], None, [], False
    lines = txt.split("\n")
    macros = lambda f, g: [f["kcal"] * g / 100, f["protein_g"] * g / 100, f["carb_g"] * g / 100, f["fat_g"] * g / 100]
    off = lambda exp, got: any(abs(round(e) - x) > 1 for e, x in zip(exp, got))
    for i, line in enumerate(lines):
        if re.search(r"YOUR (WEEKLY )?GROCERY LIST", line, re.I): break
        o = OPTION.match(line)
        if o:
            inpick = True; picks.append({"name": o.group(1).strip(), "sum": None}); meal = [0, 0, 0, 0]; continue
        if TRADES.match(line):
            cur = None; continue
        tr = TRADE.match(line)
        if tr:
            inpick = True; picks.append({"name": tr.group(1).title() + " trade: " + tr.group(2).strip(), "sum": None}); meal = [0, 0, 0, 0]; continue
        dn = DAYNAME.match(line)
        if dn:   # a weekday heading opens a day; the totals line under it, when there is one, fills its header
            inpick = False
            cur = {"hdr": None, "sum": [0, 0, 0, 0], "name": dn.group(1)}
            days.append(cur); continue
        fresh = cur is not None and cur["hdr"] is None and cur["sum"] == [0, 0, 0, 0]
        d = DAY.search(line)
        if d:
            inpick = False
            hdr = [int(d.group(1).replace(",", "")), int(d.group(2)), int(d.group(3)), int(d.group(4))]
            if fresh: cur["hdr"] = hdr
            else: cur = {"hdr": hdr, "sum": [0, 0, 0, 0]}; days.append(cur)
            continue
        dg = DAYG.match(line)
        if dg:
            inpick = False
            hdr = [int(dg.group(1).replace(",", "")), int(dg.group(2))]
            if fresh: cur["hdr"] = hdr
            else: cur = {"hdr": hdr, "sum": [0, 0, 0, 0]}; days.append(cur)
            continue
        g = GROW.match(line)
        if g and g.group(1) in by and (inpick or (cur is not None and (cur["hdr"] is None or len(cur["hdr"]) == 2))):
            n += 1; exp = macros(by[g.group(1)], float(g.group(3) or g.group(4)))
            if inpick: picks[-1]["sum"] = [a + b for a, b in zip(picks[-1]["sum"] or [0, 0, 0, 0], exp)]
            elif cur is not None: cur["sum"] = [a + b for a, b in zip(cur["sum"], exp)]
            continue
        m = ROW.match(line)
        name = grams = got = None
        if m and m.group(1) in by:
            name, grams, got = m.group(1), float(m.group(3)), [int(m.group(k)) for k in (4, 5, 6, 7)]
        else:
            w = WRAPPED.match(line)
            if w and w.group(1) in by:
                gm = re.search(r"\(([\d.]+)g\)", " ".join(lines[max(0, i - 1):i + 2]))
                if gm: name, grams, got = w.group(1), float(gm.group(1)), [int(w.group(k)) for k in (2, 3, 4, 5)]
        if name:
            n += 1; exp = macros(by[name], grams)
            if off(exp, got): problems.append(f"row {name} {grams:g}g printed {got}, foods.js gives {[round(e, 1) for e in exp]}")
            meal = [a + b for a, b in zip(meal, exp)]
            continue
        r = READY.match(line)
        rname = r and next((line.strip()[:k] for k in [mm.start() for mm in re.finditer(", ", line.strip())]
                            if line.strip()[:k] in by), None)   # a name with its own comma ("Premier Protein shake, ready-to-drink", 2026-10-31)
        if r and rname:
            n += 1; exp = macros(by[rname], float(r.group(3))); got = [int(r.group(k)) for k in (4, 5, 6, 7)]
            if off(exp, got): problems.append(f"one-line item {rname} printed {got}, foods.js gives {[round(e, 1) for e in exp]}")
            if cur: cur["sum"] = [a + b for a, b in zip(cur["sum"], exp)]
            continue
        t = TOTAL.match(line)
        if t:
            got = [int(t.group(1).replace(",", "")), int(t.group(2)), int(t.group(3)), int(t.group(4))]
            if off(meal, got): problems.append(f"meal Total printed {got}, its rows add to {[round(e, 1) for e in meal]}")
            if inpick: picks[-1]["sum"] = meal
            elif cur: cur["sum"] = [a + b for a, b in zip(cur["sum"], meal)]
            meal = [0, 0, 0, 0]
    for d in days:
        if d["hdr"] is None: continue      # no totals printed (noTotals plan): reported by main()
        if off(d["sum"], d["hdr"]): problems.append(f"day header {d['hdr']}, its meals add to {[round(e, 1) for e in d['sum']]}")
    return n, days, picks, problems

def png_blue_pixels(path):
    data = open(path, "rb").read(); i = 8; idat = b""; w = h = ct = None
    while i < len(data):
        ln = struct.unpack(">I", data[i:i + 4])[0]; typ = data[i + 4:i + 8]; ch = data[i + 8:i + 8 + ln]; i += 12 + ln
        if typ == b"IHDR": w, h, _bd, ct = struct.unpack(">IIBB", ch[:10])
        elif typ == b"IDAT": idat += ch
        elif typ == b"IEND": break
    bpp = {2: 3, 6: 4, 0: 1}.get(ct, 3)
    if bpp < 3: return 0
    raw = zlib.decompress(idat); stride = w * bpp; prev = bytearray(stride); p = 0; blue = 0
    for _ in range(h):
        flt = raw[p]; p += 1; line = bytearray(raw[p:p + stride]); p += stride
        for x in range(stride):
            a = line[x - bpp] if x >= bpp else 0; b = prev[x]; c = prev[x - bpp] if x >= bpp else 0
            if flt == 1: line[x] = (line[x] + a) & 255
            elif flt == 2: line[x] = (line[x] + b) & 255
            elif flt == 3: line[x] = (line[x] + ((a + b) >> 1)) & 255
            elif flt == 4:
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else (b if pb <= pc else c))) & 255
        for x in range(0, stride, bpp):
            if line[x + 2] > line[x] + 40 and line[x + 2] > line[x + 1] + 20: blue += 1
        prev = line
    return blue

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    pdf = sys.argv[1]
    if not os.path.isfile(pdf): print(f"PDF check: no such file {pdf}"); sys.exit(2)
    with tempfile.TemporaryDirectory() as tmp:
        txt_path = os.path.join(tmp, "plan.txt")
        subprocess.run(["pdftotext", "-layout", pdf, txt_path], check=True)
        n, days, picks, problems = check_rows(open(txt_path, encoding="utf-8").read(), load_foods())
        subprocess.run(["pdftoppm", "-r", "40", "-png", pdf, os.path.join(tmp, "pg")], check=True)
        pages = sorted(glob.glob(os.path.join(tmp, "pg-*.png")))
        blue = {os.path.basename(pg): png_blue_pixels(pg) for pg in pages}
    blue_pages = {k: v for k, v in blue.items() if v}
    if n == 0: problems.append("no food rows could be read: the PDF layout changed and this check needs updating")
    if blue_pages: problems.append(f"blue pixels on {len(blue_pages)} page(s): {blue_pages}")
    print(f"PDF check: {n} food rows, {len(days)} day headers, {len(picks)} pick options, {len(pages)} pages, "
          f"{sum(blue.values())} blue pixels | {'clean' if not problems else str(len(problems)) + ' problem(s)'}")
    bare = [d for d in days if d["hdr"] is None]
    if bare and len(bare) == len(days):
        print("  no totals printed; recomputed from the rows: " + ", ".join(f"{d.get('name','?')[:3].title()} {round(d['sum'][0])} cal / {round(d['sum'][1])}g protein" for d in bare))
    for p in picks:
        s = p["sum"] or []
        print(f"  option {p['name']}: {round(s[0]) if s else '?'} cal, {round(s[1]) if s else '?'}g protein")
    for p in problems[:20]: print("  PROBLEM:", p)
    sys.exit(1 if problems else 0)

if __name__ == "__main__":
    main()
