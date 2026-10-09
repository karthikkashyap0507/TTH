/* ==========================================================================
   Results — the Ecom Performance System + case studies
   Source: The Scale House company profile (2026). Screenshots live in
   /public/results/ (client names are blurred in Ads Manager).
   ========================================================================== */

export const resultsIntro = {
  eyebrow: "PROOF, NOT PROMISES",
  title: "Results straight from Ads Manager.",
  body: "Four D2C fashion brands. The same starting point — ROAS below what they deserved. The same fix — our proprietary Ecom Performance System.",
  pageTitleTop: "Proof in the",
  pageTitleBottom: "dashboard.",
  pageBody:
    "Every number on this page comes straight from Meta Ads Manager — real brands, real spend. Client names are hidden; the results aren't.",
  summary: [
    { value: "5.4X–11.83X", label: "BLENDED ROAS DELIVERED" },
    { value: "₹1.5 CR+", label: "PEAK MONTHLY CLIENT REVENUE" },
    { value: "30–40 DAYS", label: "TYPICAL TIME TO RESULTS" },
    { value: "25+", label: "SPECIALISTS ON THE TEAM" },
  ],
};

export const performanceSystem = {
  eyebrow: "OUR PROPRIETARY FRAMEWORK",
  name: "The Ecom Performance System",
  body: "A structured, repeatable approach to creative testing, account architecture and budget allocation that turns scattered ad spend into predictable, scalable growth.",
  loop: ["TEST", "ANALYSE", "OPTIMIZE", "SCALE"],
  pillars: [
    { title: "Creative strategy", body: "Testing different creative angles, hooks and messaging." },
    { title: "Campaign structure", body: "Building campaigns around actual business objectives." },
    { title: "Audience strategy", body: "Identifying and testing relevant customer segments." },
    { title: "Budget optimisation", body: "Moving budget toward campaigns showing stronger signals." },
    { title: "Continuous testing", body: "Testing creatives, audiences and structures instead of relying on assumptions." },
    { title: "Performance optimisation", body: "Making decisions based on data rather than vanity metrics." },
  ],
};

export type ResultImage = { src: string; width: number; height: number; alt: string; label?: "BEFORE" | "AFTER" | "ACCOUNT SNAPSHOT" };

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  /** Headline transformation used on cards */
  from: string;
  to: string;
  metric: string;
  summary: string;
  quote?: string;
  problem: string[];
  approach: string[];
  focus?: { title: string; body: string }[];
  result: string[];
  stats: { value: string; label: string }[];
  shift?: { before: string; after: string };
  screenshots: ResultImage[];
  comparison?: ResultImage;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    label: "D2C APPAREL BRAND",
    title: "₹3L spent with zero meaningful results. Then we took over.",
    from: "₹3L",
    to: "₹13.64L+",
    metric: "AD ACCOUNT SCALED",
    summary: "From no meaningful results to 3.57 Cr+ impressions across 48 campaigns.",
    problem: [
      "Before working with The Scale House, the brand had already invested about ₹3,00,000 into Meta advertising — and the campaigns weren't generating meaningful results for the business.",
      "The problem wasn't simply the amount being spent. The brand was spending without a performance system that could consistently identify what was working, what wasn't, and where the next rupee should go. ₹3L spent, ₹0 meaningful results: that was the starting point.",
    ],
    approach: ["Instead of simply increasing the budget, we rebuilt the approach around performance. We focused on:"],
    focus: [
      { title: "Creative strategy", body: "Testing different creative angles and messaging" },
      { title: "Campaign structure", body: "Building campaigns around actual business objectives" },
      { title: "Audience strategy", body: "Identifying and testing relevant customer segments" },
      { title: "Budget optimisation", body: "Moving budget toward campaigns showing stronger signals" },
      { title: "Continuous testing", body: "Testing creatives, audiences and campaign structures" },
      { title: "Performance optimisation", body: "Decisions based on data, not vanity metrics" },
    ],
    result: [
      "With a structured performance marketing approach in place, the account scaled to ₹13.64L+ in total ad spend across 48 campaigns.",
      "This was never just about taking a brand from ₹3L to ₹13.64L in ad spend. It was about changing the entire way the brand approached paid acquisition.",
    ],
    stats: [
      { value: "₹13.64L+", label: "TOTAL AD SPEND" },
      { value: "3.57 Cr+", label: "IMPRESSIONS" },
      { value: "1.46 Cr+", label: "REACH" },
      { value: "48", label: "CAMPAIGNS" },
      { value: "₹38.20", label: "AVERAGE CPM" },
    ],
    shift: { before: "Spend → No results → Uncertainty", after: "Test → Analyse → Optimize → Scale" },
    screenshots: [
      {
        src: "/results/cs1-account.jpg",
        width: 800,
        height: 263,
        alt: "Meta Ads Manager: 48 campaigns, ₹13.64L total spend, 3.57 Cr impressions",
        label: "ACCOUNT SNAPSHOT",
      },
    ],
  },
  {
    id: "02",
    label: "D2C FASHION BRAND",
    title: "From 0.3X ROAS to 5.71X average ROAS.",
    from: "0.3X",
    to: "5.71X",
    metric: "PURCHASE ROAS",
    summary: "A loss-making account turned profitable — ₹2.92 average CPC and 1,941 adds to cart.",
    problem: [
      "When the brand approached us, their Meta Ads account was struggling badly. The campaigns were generating traffic, but the economics simply weren't working.",
      "At 0.3X ROAS, every ₹1 spent on advertising generated only around ₹0.30 in attributed revenue. The brand wasn't just struggling to scale — the existing acquisition model was losing money.",
    ],
    approach: [
      "We went back to the fundamentals to identify the core reasons behind the poor performance. Campaigns were restructured around clearer objectives, multiple creative angles and hooks were introduced, and different audience segments were tested to learn what resonated.",
      "Budget was then reallocated toward the stronger campaigns and ad sets. Instead of treating the account as set-and-forget, we put a continuous testing and optimisation process in place to keep finding the next improvement.",
    ],
    result: [
      "The account went from an acquisition system running at 0.3X ROAS to a setup where the reported average purchase ROAS reached 5.71X.",
      "That's the difference between spending on ads and building a performance marketing system.",
    ],
    stats: [
      { value: "5.71X", label: "AVERAGE PURCHASE ROAS" },
      { value: "₹50,158", label: "TOTAL SPEND" },
      { value: "17,185", label: "LINK CLICKS" },
      { value: "₹2.92", label: "AVERAGE CPC" },
      { value: "1,941", label: "ADDS TO CART" },
    ],
    screenshots: [
      {
        src: "/results/cs2-account.jpg",
        width: 960,
        height: 240,
        alt: "Meta Ads Manager: ₹50,158 spent, 17,185 link clicks, 5.71 average purchase ROAS",
        label: "AFTER",
      },
    ],
  },
  {
    id: "03",
    label: "D2C APPAREL BRAND",
    title: "From a flat 2.08X to a blended 6.45X ROAS.",
    from: "2.08X",
    to: "6.45X",
    metric: "BLENDED ROAS",
    summary: "2,052 purchases, CTR up from 0.86% to 3.09%+, and one ad set at 29.16X.",
    quote: "Budget was flowing. Performance wasn't.",
    problem: [
      "The brand came to us stuck at 2.08X ROAS — well below what their product economics could support.",
      "Ad spend was scattered across too many ad sets without a clear performance hierarchy, bid strategies were inconsistent, and there was no system to double down on what worked while cutting what didn't. Some ad sets were quietly bleeding budget; others with real potential weren't getting the spend they deserved.",
    ],
    approach: [
      "Our first move was a ground-up audit of every active campaign. Rather than tweaking the existing setup, we rebuilt the account around performance tiers — separating consistent winners from underperformers.",
      "Creative testing came next, and within the second week we'd pinpointed the format and structure that clicked with this brand's audience. On the media-buying side, we matched bid strategy to each ad set's stage — cost-per-result for stability, highest-volume to push scale — and kept moving budget toward whatever the data proved, week over week.",
    ],
    result: [
      "Faster creative wins and sharper budget discipline compounded: the account went from a flat 2.08X to a blended 6.45X ROAS across 11 ad sets, with 2,052 purchases.",
    ],
    stats: [
      { value: "6.45X", label: "BLENDED ROAS" },
      { value: "2,052", label: "PURCHASES" },
      { value: "3.09%+", label: "CTR (FROM 0.86%)" },
      { value: "29.16X", label: "BEST AD SET ROAS" },
      { value: "1.22–1.43", label: "FREQUENCY — ROOM TO SCALE" },
    ],
    screenshots: [
      {
        src: "/results/cs3-before.jpg",
        width: 1600,
        height: 534,
        alt: "Before: 7 ad sets averaging 2.08 purchase ROAS and 0.84% CTR",
        label: "BEFORE",
      },
      {
        src: "/results/cs3-after.jpg",
        width: 1600,
        height: 535,
        alt: "After: 11 ad sets, 2,052 purchases, ₹26.34 CPM",
        label: "AFTER",
      },
    ],
    comparison: {
      src: "/results/cs3-before-after.jpg",
      width: 1536,
      height: 1024,
      alt: "Before and after: ROAS 2.08X to 6.45X, CTR 0.86% to 3.09%, 2,052 purchases, stable ROAS",
    },
  },
  {
    id: "04",
    label: "D2C FASHION BRAND",
    title: "From 1.84X to 5.40X ROAS in 40 days.",
    from: "1.84X",
    to: "5.40X",
    metric: "PURCHASE ROAS IN 40 DAYS",
    summary: "2.5 weeks of structured creative testing, then a top ad set at 6.79X.",
    quote: "The account had scale. It just wasn't converting it into efficiency.",
    problem: [
      "When this brand approached us, the account was averaging just 1.84X ROAS across multiple campaigns despite roughly ₹1.9L in ad spend.",
      "Link clicks were coming in, but conversions weren't following through — CTR hovered around 1.54%, and several ad sets were spending heavily (₹45K, ₹51K) without returns that justified the outlay.",
    ],
    approach: [
      "We started with a complete teardown of the account to separate wasted budget from real potential. Then came 2.5 weeks of structured creative testing before locking in the winning creative structure and format — long enough to rule out false positives instead of chasing early signals that fade.",
      "Once the format was locked, we rebuilt the account around it: spend consolidated into fewer, stronger ad sets, a shift to highest-volume bidding where the data supported it, and the ad sets that weren't earning their budget paused.",
    ],
    result: ["Within 40 days of full implementation, purchase ROAS climbed from 1.84X to 5.40X — nearly 3X the starting point — with one ad set alone reaching 6.79X."],
    stats: [
      { value: "5.40X", label: "PURCHASE ROAS" },
      { value: "6.79X", label: "TOP AD SET ROAS" },
      { value: "40", label: "DAYS TO FULL RESULTS" },
      { value: "2.5", label: "WEEKS OF CREATIVE TESTING" },
    ],
    screenshots: [
      {
        src: "/results/cs4-before.jpg",
        width: 1600,
        height: 535,
        alt: "Before: 8 ad sets, ₹1,90,880 spent, 1.54% CTR, 1.84 average purchase ROAS",
        label: "BEFORE",
      },
      {
        src: "/results/cs4-after.jpg",
        width: 1600,
        height: 535,
        alt: "After: 19 ad sets with purchase ROAS above 5X on the leading sets",
        label: "AFTER",
      },
    ],
    comparison: {
      src: "/results/cs4-before-after.jpg",
      width: 922,
      height: 615,
      alt: "Before and after: blended ROAS 1.84X to 5.40X, top ad set 6.79X, account consolidated, stable ROAS",
    },
  },
];
