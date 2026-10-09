/* ==========================================================================
   Why Us — a short, practical article.
   Blocks render in order. `figure.kind` picks a built-in illustration
   (or set `figure.image` to a screenshot in /public/why-us/).
   ========================================================================== */

export type FigureKind = "speed" | "chat" | "trust" | "mobile" | "analytics";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "callout"; text: string }
  | { type: "punch"; text: string }
  | { type: "figure"; kind: FigureKind; caption: string; image?: string; alt?: string };

export type ArticleSection = { title: string; blocks: ArticleBlock[] };

/* Top of the page — why brands choose us (from the company profile) */
export const whyUsHero = {
  eyebrow: "WHY US",
  titleTop: "You won't be another",
  titleBottom: "account number.",
  body: "We're performance specialists for fashion and apparel D2C brands — with an in-house tech team that builds the websites, apps, CRMs and automations your growth runs on.",
};

export const whyUsReasons = [
  {
    title: "Apparel specialists",
    body: "Our team eats, sleeps and breathes apparel performance marketing. Every instinct is tuned for D2C fashion — not borrowed from selling gadgets or supplements.",
  },
  {
    title: "A system, not a playbook",
    body: "Our proprietary Ecom Performance System replaces guesswork with structured creative testing, account architecture and budget discipline.",
  },
  {
    title: "Proof in the dashboard",
    body: "Blended ROAS of 5.4x–11.83x for D2C clothing brands across India, and peak monthly client revenues of over ₹1.5 Cr.",
  },
  {
    title: "Data over vanity metrics",
    body: "Budget moves toward whatever the numbers prove, week over week — and weak spend gets cut before it adds up.",
  },
  {
    title: "Results in 30–40 days",
    body: "It starts with a free account audit and a tailored strategy session. Results typically show within 30 to 40 days of implementation.",
  },
  {
    title: "Ads and tech under one roof",
    body: "The team running your ads can also build your store, app, custom software, CRM or ERP — no hand-offs between five different vendors.",
  },
];

/* The article below the reasons */
export const whyUs = {
  eyebrow: "FROM OUR BUILD TEAM",
  title: "Pretty websites are easy. We build ones that pay for themselves.",
  intro:
    "Ads bring the traffic; the website decides whether it buys. Here are five things we fix on almost every store we touch — none of them need a bigger ad budget, just better building.",
  meta: "THE SCALE HOUSE TEAM · 5 MIN READ",
  closingEyebrow: "SOUND FAMILIAR?",
};

export const whyUsSections: ArticleSection[] = [
  {
    title: "Every extra second costs you buyers",
    blocks: [
      {
        type: "p",
        text: "Visitors decide in a few seconds whether to stay. A heavy theme, uncompressed photos and a dozen plugins turn your homepage into a waiting room — and people don't wait.",
      },
      {
        type: "callout",
        text: "We build lean: optimised images, only the code each page needs, and hosting close to your customers. The goal is a page that's usable in about two seconds on an ordinary phone.",
      },
      {
        type: "figure",
        kind: "speed",
        caption: "Illustration — how load time changes after a rebuild on a typical mid-range phone.",
      },
    ],
  },
  {
    title: "Your DMs are a sales team that sleeps at night",
    blocks: [
      {
        type: "p",
        text: "Customers message at 11 PM asking about price, size and delivery. By the time you reply in the morning, they've already bought somewhere else.",
      },
      { type: "punch", text: "An agent that answers in five seconds wins the sales you're losing overnight." },
      {
        type: "p",
        text: "We train it on your catalogue, prices and policies, and it hands the chat to a human the moment a conversation needs one.",
      },
      {
        type: "figure",
        kind: "chat",
        caption: "Illustration — an AI agent handling a late-night enquiry on WhatsApp.",
      },
    ],
  },
  {
    title: "Proof belongs next to the price",
    blocks: [
      {
        type: "p",
        text: "Buyers hesitate right at the button. That's exactly where reviews, a delivery date and a clear return policy should sit — not buried in the footer where nobody looks.",
      },
      {
        type: "callout",
        text: "Put a star rating, one real customer photo and “Delivered by Thursday” within a thumb's reach of “Add to cart”.",
      },
      {
        type: "figure",
        kind: "trust",
        caption: "Illustration — trust signals placed right beside the buy button.",
      },
    ],
  },
  {
    title: "Design for thumbs, not monitors",
    blocks: [
      {
        type: "p",
        text: "Most of your visitors are on a phone, often using one hand. Tiny links, hover-only menus and pop-ups that won't close quietly kill orders.",
      },
      {
        type: "callout",
        text: "We design every page mobile-first: big tap targets, a buy button that follows you down the page, and a checkout with as few steps as possible.",
      },
      {
        type: "figure",
        kind: "mobile",
        caption: "Illustration — a sticky buy bar that's always one tap away.",
      },
    ],
  },
  {
    title: "Bonus — know which page actually sells",
    blocks: [
      {
        type: "p",
        text: "If you don't measure it, you're guessing. We set up analytics and conversion tracking on day one, so you can see which page, product and campaign really brings in the money.",
      },
      {
        type: "figure",
        kind: "analytics",
        caption: "Illustration — a simple weekly view of where your sales come from.",
      },
    ],
  },
];
