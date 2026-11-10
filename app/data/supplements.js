/* OB Meal Planner — supplement gap-fill brand guide.
   Credible, third-party-tested / established brands to fill gaps the food plan can't close.
   certified=true means it carries a real third-party certification (NSF Certified for Sport,
   Informed Sport/Choice, IFOS 5-star for fish oil, USP, or Creapure for creatine). Not medical advice. */
window.OB_SUPPLEMENT_GUIDE = [
  {
    "key": "omega3", "label": "Omega-3 (EPA+DHA)",
    "form": "Triglyceride-form fish oil (algae oil for vegans)", "dose": "about 2 g EPA+DHA a day, OB's standard (FDA: up to 2 g a day from supplements, 3 g from all sources)",
    "certsToLookFor": ["IFOS 5-star", "third-party purity/freshness tested"],
    "veganNote": "Use an algae-based EPA/DHA oil for plant-based clients.",
    "brands": [
      {"name": "Nordic Naturals", "product": "Ultimate Omega 2X", "serving": "2 softgels = 2,000 mg EPA+DHA", "why": "IFOS 5-star certified, triglyceride form; the 2 g dose in 2 softgels (EPA 1,125 + DHA 875 mg, label read 2026-10-01)", "certified": true, "vegan": false},
      {"name": "Nordic Naturals", "product": "Ultimate Omega", "serving": "2 softgels = 1,100 mg EPA+DHA", "why": "IFOS 5-star certified, triglyceride form, tested for purity & freshness", "certified": true, "vegan": false},
      {"name": "Sports Research", "product": "Triple Strength Omega-3", "why": "IFOS-certified, triglyceride form, non-GMO", "certified": true, "vegan": false},
      {"name": "Nordic Naturals", "product": "Algae Omega (vegan)", "why": "Plant-based EPA+DHA from algae, third-party tested", "certified": true, "vegan": true}
    ]
  },
  {
    "key": "protein_whey", "label": "Whey protein",
    "form": "Whey isolate / blend", "dose": "1 scoop ≈ 25g protein",
    "certsToLookFor": ["NSF Certified for Sport", "Informed Choice/Sport"],
    "veganNote": "For vegans use a plant protein instead (see Plant protein).",
    "brands": [
      {"name": "Ryse", "product": "Loaded Protein", "why": "Coach pick for taste — rich, dessert-like flavors", "certified": false, "vegan": false, "taste": "top-tier taste"},
      {"name": "PEScience", "product": "Select Protein", "why": "Whey+casein blend, excellent flavor & mixability", "certified": false, "vegan": false, "taste": "top-tier taste"},
      {"name": "Ekkovision", "product": "Whey Protein", "why": "Transparency-focused brand, well-reviewed flavors", "certified": false, "vegan": false, "taste": "top-tier taste"},
      {"name": "Transparent Labs", "product": "Grass-Fed Whey Isolate", "why": "Informed Choice certified, no artificial sweeteners or fillers", "certified": true, "vegan": false},
      {"name": "Klean Athlete", "product": "Klean Isolate", "why": "NSF Certified for Sport — clean, unflavored", "certified": true, "vegan": false}
    ]
  },
  {
    "key": "protein_plant", "label": "Plant protein",
    "form": "Pea + rice blend (complete amino profile)", "dose": "1 scoop ≈ 24g protein",
    "certsToLookFor": ["Informed Choice", "third-party heavy-metal tested"],
    "veganNote": "Pea+rice blends give a complete amino profile.",
    "brands": [
      {"name": "Transparent Labs", "product": "Organic Vegan Protein", "why": "Informed Choice certified, pea+rice, no artificial junk", "certified": true, "vegan": true},
      {"name": "PEScience", "product": "Select Vegan Series", "why": "Pea+brown rice — best-tasting plant protein in its class", "certified": false, "vegan": true, "taste": "top-tier taste"},
      {"name": "Ritual", "product": "Plant-Based Protein", "why": "Third-party tested, traceable, pea-based", "certified": true, "vegan": true},
      {"name": "NAKED Nutrition", "product": "NAKED Pea", "why": "Single-ingredient pea isolate, independently tested for heavy metals", "certified": false, "vegan": true}
    ]
  },
  {
    "key": "vitamin_d", "label": "Vitamin D3",
    "form": "D3 (cholecalciferol), often with K2", "dose": "1000–2000 IU (or per labs)",
    "certsToLookFor": ["third-party tested"],
    "veganNote": "Use a lichen-derived (vegan) D3 for plant-based clients.",
    "brands": [
      {"name": "Nordic Naturals", "product": "Vitamin D3+K2 (2000 IU D3, 90 mcg K2)", "why": "One soft gel: 2000 IU D3 + 90 mcg K2 (MK-7), third-party tested with COAs (nordic.com, read 2026-09-30). Replaces Sports Research D3+K2, which is 5000 IU a soft gel, over the 4000 IU adult upper limit.", "certified": false, "vegan": false},
      {"name": "Nordic Naturals", "product": "Vitamin D3 1000 IU", "why": "Third-party tested, in olive oil for absorption", "certified": true, "vegan": false},
      {"name": "MaryRuth Organics", "product": "Vegan Vitamin D3 (lichen)", "why": "Plant-based D3 from lichen, third-party tested", "certified": false, "vegan": true}
    ]
  },
  {
    "key": "vitamin_b12", "label": "Vitamin B12",
    "form": "Methylcobalamin", "dose": "500–1000 mcg",
    "certsToLookFor": ["NSF / established GMP"],
    "veganNote": "Essential for vegans — plant foods contain virtually none.",
    "brands": [
      {"name": "Thorne", "product": "Vitamin B12", "why": "NSF Certified for Sport, methylcobalamin", "certified": true, "vegan": true},
      {"name": "Jarrow Formulas", "product": "Methyl B-12 1000mcg", "why": "Well-established, fast-melt lozenge", "certified": false, "vegan": true},
      {"name": "NOW Foods", "product": "Methyl B-12", "why": "GMP-tested, established, affordable", "certified": false, "vegan": true}
    ]
  },
  {
    "key": "iron", "label": "Iron",
    "form": "Iron bisglycinate (gentle)", "dose": "25 mg (1 Thorne capsule), only if labs show low iron",
    "certsToLookFor": ["NSF / chelated (Ferrochel)"],
    "veganNote": "Plant iron absorbs less; pair with vitamin C. Don't supplement iron without a reason.",
    "brands": [
      {"name": "Thorne", "product": "Iron Bisglycinate", "serving": "1 capsule = 25 mg", "why": "NSF Certified for Sport, gentle on the gut", "certified": true, "vegan": true},
      {"name": "NOW Foods", "product": "Iron 18mg (Ferrochel)", "why": "Bisglycinate, gentle, established", "certified": false, "vegan": true}
    ]
  },
  {
    "key": "calcium", "label": "Calcium",
    "form": "Calcium citrate (well-absorbed)", "dose": "500mg, split doses",
    "certsToLookFor": ["USP / established"],
    "veganNote": "For dairy-free/vegan clients short on calcium; pair with D3/K2.",
    "brands": [
      {"name": "NOW Foods", "product": "Calcium Citrate", "why": "Well-absorbed citrate form, GMP-tested", "certified": false, "vegan": true},
      {"name": "Citracal", "product": "Calcium + D3", "why": "Calcium citrate + D3, widely trusted", "certified": false, "vegan": false}
    ]
  },
  {
    "key": "magnesium", "label": "Magnesium",
    "form": "Magnesium glycinate (gentle, sleep)", "dose": "200–400mg",
    "certsToLookFor": ["NSF / chelated"],
    "veganNote": "Glycinate is gentle and supports sleep.",
    "brands": [
      {"name": "Thorne", "product": "Magnesium Bisglycinate", "why": "NSF Certified for Sport, gentle glycinate", "certified": true, "vegan": true},
      {"name": "NOW Foods", "product": "Magnesium Glycinate", "why": "Chelated, gentle, established", "certified": false, "vegan": true},
      {"name": "Doctor's Best", "product": "High Absorption Magnesium", "why": "Chelated (TRAACS), well-reviewed", "certified": false, "vegan": true}
    ]
  },
  {
    "key": "multivitamin", "label": "Multivitamin",
    "form": "Complete multi (micronutrient insurance)", "dose": "1 serving",
    "certsToLookFor": ["USP Verified", "NSF", "Informed"],
    "veganNote": "Ritual is vegan-friendly; check the label for B12 + D3.",
    "brands": [
      {"name": "Ekkovision", "product": "Multivitamin (with Selenium, 90 servings)", "why": "OB pick — comprehensive multi with selenium, transparency-focused brand", "certified": false, "vegan": false, "asin": "B0DQPDBDMM"},
      {"name": "Thorne", "product": "Basic Nutrients 2/Day", "why": "NSF Certified for Sport, clean active forms", "certified": true, "vegan": false},
      {"name": "Ritual", "product": "Essential (Women's/Men's)", "why": "Third-party tested, traceable, vegan-friendly", "certified": true, "vegan": true},
      {"name": "Nature Made", "product": "Multivitamin", "why": "USP Verified, affordable drugstore option", "certified": true, "vegan": false}
    ]
  },
  {
    "key": "creatine", "label": "Creatine",
    "form": "Creatine monohydrate (Creapure)", "dose": "3–5g/day",
    "certsToLookFor": ["Creapure", "NSF / Informed"],
    "veganNote": "Vegans benefit most — diet provides almost no creatine.",
    "brands": [
      {"name": "Thorne", "product": "Creatine", "why": "NSF Certified for Sport, Creapure monohydrate", "certified": true, "vegan": true},
      {"name": "Optimum Nutrition", "product": "Micronized Creatine", "why": "Creapure monohydrate, Informed Choice, trusted", "certified": true, "vegan": true},
      {"name": "Bulk Supplements", "product": "Creatine Monohydrate", "why": "Pure micronized monohydrate, lab-tested, budget", "certified": false, "vegan": true}
    ]
  }
];
