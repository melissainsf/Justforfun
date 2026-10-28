// Fictional sample data. Every company, person and number here is made up.
// Generated with a seeded RNG so the dataset is stable between reloads;
// dates are relative to "today" so the renewals list is always populated.

(function () {
  let seed = 42;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const between = (min, max) => min + rand() * (max - min);

  const INDUSTRIES = {
    "Healthcare": ["Hospitals & Clinics", "Health Insurance", "Telehealth"],
    "Financial Services": ["Banking", "Insurance", "Wealth Management"],
    "Retail": ["E-commerce", "Grocery", "Apparel"],
    "Technology": ["SaaS", "Cybersecurity", "Hardware"],
    "Manufacturing": ["Automotive", "Industrial Equipment", "Consumer Goods"],
    "Education": ["Higher Ed", "K-12", "EdTech"],
  };

  const CSMS = ["Jordan Pike", "Avery Lindqvist", "Sam Okafor", "Riley Moreau", "Casey Tanaka", "Morgan Delacroix"];

  const PREFIX = ["Blue", "North", "Silver", "Bright", "Iron", "Summit", "Cedar", "Harbor", "Nova", "Granite",
    "Lumen", "Maple", "Orbit", "Pioneer", "Quartz", "Redwood", "Sable", "Tidal", "Vertex", "Willow"];
  const SUFFIX = ["Labs", "Health", "Systems", "Partners", "Group", "Dynamics", "Works", "Logistics", "Analytics", "Co"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

  const used = new Set();
  const customers = [];
  for (let i = 0; i < 120; i++) {
    let name;
    do { name = `${pick(PREFIX)} ${pick(SUFFIX)}`; } while (used.has(name));
    used.add(name);

    const industry = pick(Object.keys(INDUSTRIES));
    const vertical = pick(INDUSTRIES[industry]);
    const health = Math.round(between(25, 98));

    // ARR twelve months ago vs today. ~10% of customers are new this year
    // (no starting ARR), so they're excluded from the retention cohort.
    const isNew = rand() < 0.1;
    const startArr = isNew ? 0 : Math.round(between(15, 250)) * 1000;
    let currentArr;
    const roll = rand();
    if (isNew) currentArr = Math.round(between(15, 120)) * 1000;
    else if (health < 40 && roll < 0.45) currentArr = 0;                        // churned
    else if (roll < 0.06) currentArr = 0;                                        // churned
    else if (roll < 0.22) currentArr = Math.round(startArr * between(0.6, 0.95)); // contraction
    else if (roll < 0.55) currentArr = Math.round(startArr * between(1.05, 1.6)); // expansion
    else currentArr = startArr;                                                  // flat

    customers.push({
      name,
      industry,
      vertical,
      csm: pick(CSMS),
      health,
      startArr,
      currentArr,
      churned: currentArr === 0,
      renewalDate: addDays(today, Math.round(between(-20, 365))),
      lastContact: addDays(today, -Math.round(between(1, 75))),
    });
  }

  window.CS_DATA = { customers, today };
})();
