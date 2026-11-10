// Shared food-word dictionary: one place the app and the template linter agree on what counts as a FOOD when
// they read prose (a dish title, a cooking step). Each entry: word/phrase as written in prose -> regex that
// matches the FOOD NAMES it refers to (names are compared with commas stripped, case-insensitive).
// Seasonings, aromatics and liquids are deliberately absent: a step that says "garlic" or "a splash of broth"
// is not a contradiction of the list, it is cooking.
window.OB_FOOD_NOUNS = [
  // proteins
  ["chicken thigh","chicken thigh"], ["leg quarters","leg quarter"], ["leg quarter","leg quarter"], ["chicken breast","chicken breast"], ["ground chicken","ground chicken|chicken ground"], ["chicken","chicken"],
  ["ground beef","beef ground"], ["sirloin","sirloin"], ["top round","top round"], ["steak","sirloin|steak|tenderloin|round|ribeye|flank"], ["beef","beef|sirloin|ribeye"],
  ["turkey","turkey"], ["pork","pork"], ["lamb","lamb"], ["bison","bison"], ["sausage","sausage"],
  ["salmon","salmon"], ["tuna","tuna"], ["cod","\\bcod\\b"], ["tilapia","tilapia"], ["shrimp","shrimp"], ["mackerel","mackerel"], ["trout","trout"], ["fish","salmon|tuna|cod|tilapia|mackerel|trout|halibut|snapper|flounder|fish"],
  ["egg whites","egg white"], ["egg white","egg white"], ["eggs","\\begg\\b"], ["egg","\\begg\\b"],
  ["tofu","tofu"], ["tempeh","tempeh"], ["seitan","seitan"], ["edamame","edamame"], ["tvp","tvp"],
  ["greek yogurt","greek yogurt"], ["yogurt","yogurt|skyr"], ["skyr","skyr"], ["cottage cheese","cottage cheese"], ["kefir","kefir"],
  ["feta","feta"], ["mozzarella","mozzarella"], ["cheddar","cheddar"], ["parmesan","parmesan"], ["ricotta","ricotta"], ["cheese","cheese|feta|mozzarella|cheddar|parmesan|ricotta"],
  ["whey","whey"], ["protein powder","protein powder|whey|isolate"],
  // carbs
  ["quinoa","quinoa"], ["brown rice","brown rice"], ["jasmine rice","white rice"], ["white rice","white rice"], ["wild rice","wild rice"], ["rice","\\brice\\b|riced"],
  ["pasta","pasta|spaghetti|penne|ziti"], ["noodles","noodle|pasta|shirataki|soba"], ["spaghetti","pasta|spaghetti"],
  ["sweet potato","sweet potato"], ["sweet potatoes","sweet potato"], ["potatoes","potato"], ["potato","potato"],
  ["oats","oats"], ["oatmeal","oats"], ["granola","granola"], ["bulgur","bulgur"], ["couscous","couscous"], ["barley","barley"], ["farro","farro"], ["buckwheat","buckwheat"], ["grits","grits"],
  ["tortillas","tortilla"], ["tortilla","tortilla"], ["pita","pita"], ["banana bread","oats|banana"], ["bread","bread|sourdough"], ["toast","bread|sourdough"], ["bagel","bagel"], ["english muffin","english muffin"], ["arepa","arepa"],
  ["butter beans","butter beans|lima|white beans"], ["black beans","black beans"], ["pinto beans","pinto"], ["kidney beans","kidney beans"], ["white beans","white beans|cannellini|navy"], ["chickpeas","chickpea"], ["lentils","lentil"], ["beans","beans|chickpea|lentil|edamame|soybean"],
  ["rice cakes","rice cake"], ["popcorn","popcorn"], ["dates","dates"], ["honey","honey"], ["maple syrup","maple syrup"],
  // produce
  ["zucchini","zucchini"], ["mushrooms","mushroom"], ["mushroom","mushroom"], ["tomatoes","tomato"], ["tomato","tomato"], ["bell pepper","bell pepper"], ["peppers","bell pepper|pepper, "], ["spinach","spinach"], ["kale","kale"],
  ["broccoli","broccoli"], ["cauliflower","cauliflower"], ["asparagus","asparagus"], ["green beans","green beans"], ["brussels","brussels"], ["cabbage","cabbage"], ["bok choy","bok choy"], ["carrots","carrot"], ["carrot","carrot"],
  ["cucumber","cucumber"], ["celery","celery"], ["romaine","romaine|lettuce"], ["lettuce","lettuce|romaine"], ["arugula","arugula"], ["corn","sweet corn|corn|arepa"], ["squash","squash"], ["eggplant","eggplant"], ["peas","peas"], ["avocado","avocado"],
  ["banana","banana"], ["bananas","banana"], ["apple","apple"], ["apples","apple"], ["berries","berr"], ["blueberries","blueberr"], ["strawberries","strawberr"], ["raspberries","raspberr"], ["mango","mango"], ["peach","peach"], ["pineapple","pineapple"], ["grapes","grape"], ["orange","orange"], ["watermelon","watermelon"], ["cantaloupe","cantaloupe"], ["raisins","raisin"],
  // fats / nuts
  ["peanut butter","peanut butter|pbfit"], ["almond butter","almond butter"], ["almonds","almond"], ["walnuts","walnut"], ["cashews","cashew"], ["pistachios","pistachio"], ["pecans","pecan"], ["chia","chia"], ["hemp","hemp"], ["pumpkin seeds","pumpkin seed"], ["brazil nuts","brazil nut"], ["nuts","almond|walnut|cashew|pistachio|pecan|peanut|pine nut|brazil nut"],
  ["butter","\\bbutter( salted|,|$)"], ["olives","olives"], ["hummus","hummus"], ["salsa","salsa"], ["marinara","marinara"], ["pesto","pesto"], ["tzatziki","tzatziki"], ["mayo","mayonnaise"], ["mayonnaise","mayonnaise"],
];
// words that appear in prose as FLAVOR, never as a contradiction of the list
window.OB_FREE_WORDS = /\b(garlic|ginger|onion|onions|shallot|scallion|scallions|chives|herbs?|basil|cilantro|parsley|dill|mint|rosemary|thyme|oregano|lemon|lime|vinegar|soy sauce|tamari|broth|stock|water|milk|almond milk|oil|salt|pepper|spices?|chili flakes?|hot sauce|sriracha|mustard|honey|maple|vanilla|cinnamon)\b/i;

// ---------------------------------------------------------------------------------------------------------
// PROSE GUARDS. A recipe step can name a food without the meal containing it, and be completely correct:
//   "sear in avocado oil"                      -> a FAT, not the fruit
//   "toast the walnuts in a dry pan"           -> the VERB
//   "skip butter here, it would scorch"        -> advice about what NOT to use
//   "your vegetable (broccoli or zucchini, whichever your plan lists)" -> already defers to the list
//   "served over quinoa instead of the usual rice"                     -> says the rice is absent
// Scanning raw prose for food words flagged 168 of 387 templates, and nearly all of it was this. Neutralise
// these spans BEFORE matching, so what survives is a genuine contradiction worth showing a client.
// One place both readers build a prose-word regex. Entries are stored however they read most naturally
// ("white beans", "olives", "tortilla"), so a plural entry must still match a singular mention: "White Bean
// Stew" was slipping past the title check because the pattern demanded "white beanss?".
window.OB_NOUN_WORD_RE = function(w, flags){
  const esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stem = /s$/.test(esc) ? esc.slice(0, -1) : esc;
  return new RegExp("\\b" + stem + "(s|es)?\\b", flags || "");
};
window.OB_PROSE_CLEAN = function(text){
  let s = " " + String(text || "") + " ";
  // 1. named oils are fats, not the food they are pressed from
  s = s.replace(/\b(avocado|coconut|olive|sesame|canola|peanut|grapeseed|sunflower|safflower|walnut|almond|flaxseed?|chili)[-\s]?oil\b/gi, " cookingoil ");
  s = s.replace(/\b(rice|apple cider|red wine|white wine|balsamic|sherry)[-\s]?vinegar\b/gi, " vinegar ");
  // fish sauce / oyster sauce / worcestershire are seasonings measured in teaspoons, not the animal
  s = s.replace(/\b(fish|oyster|soy|hoisin|worcestershire)[-\s]sauce\b/gi, " seasoning ");
  // buffalo/BBQ/teriyaki sauce name their style, not a missing ingredient
  s = s.replace(/\b(buffalo|bbq|barbecue|teriyaki|enchilada|pizza|taco|curry)[-\s]sauce\b/gi, " sauce ");
  // 2. "toast" is a VERB far more often than a food in recipe prose ("toast the walnuts", "so the spices
  //    toast", "the crust toasts"). Detect the NOUN instead: it is only the food when an article, a
  //    preposition or a bread word sits in front of it. Everything else becomes the verb.
  s = s.replace(/\btoast(ed|ing|s)?\b/gi, function(m, suf, off, str){
    var before = str.slice(Math.max(0, off-26), off).toLowerCase();
    return (!suf && /\b(on|with|of|the|your|some|grain|wheat|sourdough|slices? of|piece of)\s+$/.test(before)) ? m : " brown ";
  });
  // similes and "-free" compounds name a food precisely because it is ABSENT
  s = s.replace(/\b[a-z]+-like\b/gi, " ");
  s = s.replace(/\b[a-z-]+-free\b/gi, " ");
  // 3. clauses that say a food is NOT used. Cut from the negator to the end of the clause.
  s = s.replace(/\b(skip|avoid|no|not|never|instead of|rather than|in place of|stands in for|swap to|swap in|other than|without)\b[^.;)]*/gi, " ");
  s = s.replace(/[^.;]*\bwould (scorch|burn|smoke|turn bitter)[^.;]*/gi, " ");
  // 4. the recipe already defers to the client's own list
  s = s.replace(/\([^)]*whichever your plan lists[^)]*\)/gi, " ");
  s = s.replace(/[^.;]*\bwhichever your plan lists[^.;]*/gi, " ");
  s = s.replace(/[^.;]*\bif your (fat|protein|carb|produce|vegetable|plan|budget)[^.;]*/gi, " ");
  s = s.replace(/\byour (vegetable|produce|protein|carb|fat) \([^)]*\)/gi, " ");
  // 5. a recipe that covers EACH possible vegetable in turn is correct, not contradictory:
  //    "if it's zucchini, saute; if spinach, wilt"  /  "zucchini should release their water, pepper should go soft"
  s = s.replace(/[^.;]*\bif (it'?s|it is|yours? (is|are)|you have|you eat|you do|using)\b[^.;]*/gi, " ");
  s = s.replace(/\bfor [a-z][a-z\- ]{2,18}?, (slice|saute|sauté|wilt|cook|roast|steam|chop|shred|grate|dice)\b[^.;]*/gi, " ");
  s = s.replace(/\b[a-z][a-z\- ]{2,18}? (should|will|turns?|wilts?|browns?|softens?|shrinks?) [a-z][^.;,]*/gi, " ");
  // 6. tomato paste / sauce / base and ketchup are condiments, not the fruit
  s = s.replace(/\btomato[-\s](paste|sauce|base|puree|passata)\b/gi, " condiment ");
  // 7. explicitly optional garnishes: a spoon of salsa is a flavour note, not a missing ingredient
  s = s.replace(/\b(a spoon(ful)? of|a dollop of|a squeeze of|a pinch of|a few |a little )\b[^.;,]*/gi, " ");
  s = s.replace(/[^.;]*\b(free flavor boost|if you like|if you prefer|optional)\b[^.;]*/gi, " ");
  s = s.replace(/\b(pair|serve|serves) (it )?(with|alongside)\b[^.;]*/gi, " ");   // serving suggestion, not an ingredient
  // 8. substitution suggestions describe what the dish COULD be, not what this one is
  s = s.replace(/\b(works? (great )?with|also works with|you can use|feel free to use|try it with|good with|same (goes )?for)\b[^.;]*/gi, " ");
  // 9. a parenthetical carrying a condition is an aside about an alternative, not this meal's ingredient
  // A parenthetical in this corpus is almost always an aside: an alternative, a condition, a cut grade, a
  //   temperature. Strip them all rather than chasing each shape.
  s = s.replace(/\([^)]*\)/g, " ");
  // "everything bagel seasoning" is a spice blend, not a bagel
  s = s.replace(/\beverything[-\s]bagel\b/gi, " seasoning ");
  // kitchen tools and verbs that borrow a food's name
  s = s.replace(/\bpotato[-\s]masher\b/gi, " masher ");
  // peppercorn pepper is a seasoning; only "bell pepper" is the vegetable
  s = s.replace(/\b(black|white|red|cayenne|chili|chile|lemon|crushed red|ground|cracked)[-\s]pepper(corns?|s)?\b/gi, " seasoning ");
  s = s.replace(/\bpepper[-\s](flakes|corns?)\b/gi, " seasoning ");
  s = s.replace(/\bfish out\b/gi, " remove ");
  // similes and texture comparisons describe the RESULT, they are not ingredients
  s = s.replace(/\blike an? [^.;,]*/gi, " ");
  s = s.replace(/\b(the thickness of|the texture of|a fresh change from|a change from|reminiscent of|in place of)\b[^.;,]*/gi, " ");
  // "a plant-based take on tuna salad", "a swap for hummus", "preferred over rice", "stripped of salt pork"
  s = s.replace(/\b(a .{0,24}take on|swap for|substitute for|stand[-\s]in for|preferred over|stripped of|inspired by)\b[^.;,]*/gi, " ");
  // hyphenated flavour descriptors: "scrambled-egg flavor", "sausage-and-peppers flavor", "tomato-soffritto"
  s = s.replace(/\b[a-z]+(-[a-z]+)+\s+(flavou?r|note|vibe|style|base|sauce)\b/gi, " ");
  // fruit juices and ciders are liquids for a marinade, not the fruit
  s = s.replace(/\b(orange|apple|lemon|lime|pineapple|grape)[-\s](juice|cider|zest)\b/gi, " juice ");
  s = s.replace(/\btomato[-\s](passata|soffritto)\b/gi, " condiment ");
  // canned tomato, like broth and spices, is a pantry base measured by the can, not a portioned ingredient
  s = s.replace(/\b(crushed|canned|diced|fire-roasted|stewed)\s+tomato(es)?\b/gi, " condiment ");
  s = s.replace(/\btomato\s+(puree|sauce)\b/gi, " condiment ");
  // "chicken broth", "beef stock" are liquids; broth is already a free word, the animal in front of it is not
  s = s.replace(/\b(chicken|beef|vegetable|turkey|fish)[-\s](broth|stock)\b/gi, " broth ");
  // comparisons: "the depth of beef", "looks like eggs"
  s = s.replace(/\bthe (depth|richness|taste|look) of\b[^.;,]*/gi, " ");
  s = s.replace(/\blooks? like\b[^.;,]*/gi, " ");
  // a whole sentence carrying a condition is about an alternative, not this meal
  s = s.replace(/[^.;]*\bif (you|your|it|they|yours|dairy|there)\b[^.;]*/gi, " ");
  s = s.replace(/[^.;]*\bif (you eat|dairy is welcome|it is welcome)\b[^.;]*/gi, " ");
  s = s.replace(/[^.;]*\b(would make it|play(s)? nicely|blends in|add(s)? a plant point|for more brine)\b[^.;]*/gi, " ");
  return s;
};
