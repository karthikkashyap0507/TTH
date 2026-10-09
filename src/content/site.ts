/* ==========================================================================
   THE SCALE HOUSE — site content
   --------------------------------------------------------------------------
   Almost everything you see on the website is edited from this one file.
   Content comes from The Scale House company profile (2026). Anything marked
   ✏️ REPLACE  is still placeholder content: swap it before going live.
   ========================================================================== */

/** Surface colours used by cards, stickers and banners. */
export type Tone = "red" | "ink" | "bone" | "iron";

/**
 * The site's public address, for SEO / sitemap / share cards.
 * Uses NEXT_PUBLIC_SITE_URL when it's set to a real URL, otherwise the
 * domain Vercel provides at build time, otherwise localhost. Blank or
 * malformed values are skipped instead of crashing the build.
 */
function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).origin;
    } catch {
      /* not a valid URL — try the next one */
    }
  }
  return "http://localhost:3000";
}

/* --------------------------------------------------------------------------
   Brand + contact  (from the 2026 company profile)
   -------------------------------------------------------------------------- */
/** The Scale House tagline (picked by the founders). */
export const tagline = "The performance partner behind your favorite fashion brands.";

export const site = {
  name: "The Scale House",
  shortName: "TSH",
  wordmark: "THE SCALE HOUSE",
  // Used for SEO/Open Graph. Set NEXT_PUBLIC_SITE_URL when you have a custom domain.
  url: resolveSiteUrl(),
  title: "The Scale House — The performance partner behind your favorite fashion brands",
  description:
    "The Scale House is the performance partner behind your favorite fashion brands — scaling D2C revenue with high-performance Meta ads, and building the websites, apps, custom software, CRM, ERP and automations they grow on.",
  ogDescription: tagline,
  keywords: [
    "performance marketing agency",
    "Meta ads agency India",
    "D2C fashion brand marketing",
    "apparel brand ads",
    "ROAS optimisation",
    "Shopify website development",
    "app development",
    "custom software development",
    "CRM development",
    "ERP software",
    "business automation",
    "The Scale House",
  ],
  replyTime: "24 hrs",
  email: "support@thescalehouse.in",
  phone: "+91 63775 69624",
  whatsapp: "916377569624", // country code + number, digits only (used for wa.me links)
  location: "Delhi, India",
  // ✏️ REPLACE — add your real Instagram / LinkedIn profile links
  socials: {
    instagram: { label: "@thescalehouse", href: "https://www.instagram.com/" },
    linkedin: { label: "The Scale House", href: "https://www.linkedin.com/" },
  },
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */
export const nav = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/#services" },
  { label: "RESULTS", href: "/results" },
  { label: "WORK", href: "/work" },
  { label: "WHY US", href: "/why-us" },
  { label: "ABOUT", href: "/about" },
];

export const footerNav = [...nav, { label: "CONTACT", href: "/#contact" }];

/* --------------------------------------------------------------------------
   Home — hero
   -------------------------------------------------------------------------- */
export const hero = {
  eyebrow: tagline,
  lead: "WE BUILD",
  // The outlined line cycles through these words: "WE BUILD ___ THAT SCALE."
  rotating: ["CAMPAIGNS", "BRANDS", "WEBSITES", "APPS", "STORES", "SYSTEMS"],
  tail: "that scale.",
  body: "We help e-commerce brands scale revenue through high-performance ads — then build the websites, apps, CRMs and automations that keep up as you grow.",
  badge: "PERFORMANCE ✦ CREATIVE ✦ TECH ✦ ",
  hint: "PRO TIP — GRAB A STICKER AND THROW IT",
  stickers: [
    { label: "META ADS", tone: "bone" as Tone, rotate: -12, className: "left-[3%] top-[14%] md:left-[4%] md:top-[22%]" },
    { label: "WEBSITES & APPS", tone: "red" as Tone, rotate: 10, className: "right-[3%] top-[14%] md:right-[5%] md:top-[19%]" },
    {
      label: "CRM · ERP · AI",
      tone: "ink" as Tone,
      rotate: -8,
      className: "right-[5%] bottom-[5%] md:right-[7%] md:bottom-auto md:top-[47%]",
    },
  ],
};

export const marqueeItems = [
  "PERFORMANCE MARKETING",
  "META ADS",
  "CREATIVE PRODUCTION",
  "WEB DEVELOPMENT",
  "APP DEVELOPMENT",
  "CUSTOM SOFTWARE",
  "CRM & ERP",
  "AI AUTOMATION",
  "BRAND STRATEGY",
];

/* --------------------------------------------------------------------------
   Services (home, scratch-card section)
   Icons live in /public/services/ (cut from the brand icon sheet).
   -------------------------------------------------------------------------- */
export const servicesIntro = {
  eyebrow: "ONE ROOF. SIX FLOORS.",
  title: "What we do",
  body: "Ads that scale, creatives that convert, and the tech your brand runs on — under one roof, with one team accountable for growth.",
};

export const services: {
  no: string;
  title: string;
  line: string;
  items: string[];
  icon: string;
  tone: Tone;
}[] = [
  {
    no: "01",
    title: "PERFORMANCE MARKETING",
    line: "Meta ads run on our Ecom Performance System — built for strong, stable ROAS.",
    items: ["META ADS STRATEGY & MEDIA BUYING", "ACCOUNT AUDITS & RESTRUCTURING", "BUDGET & BID OPTIMISATION"],
    icon: "/services/performance.png",
    tone: "red",
  },
  {
    no: "02",
    title: "CREATIVE PRODUCTION",
    line: "Scroll-stopping ad creatives with angles and hooks, tested until they win.",
    items: ["STATIC & VIDEO AD CREATIVES", "HOOKS, ANGLES & MESSAGING", "STRUCTURED CREATIVE TESTING"],
    icon: "/services/creative.png",
    tone: "iron",
  },
  {
    no: "03",
    title: "WEB & APP DEVELOPMENT",
    line: "Fast, mobile-first stores, apps and software built for conversion.",
    items: ["SHOPIFY & CUSTOM-CODED WEBSITES", "iOS & ANDROID APPS", "CUSTOM SOFTWARE & DASHBOARDS"],
    icon: "/services/web.png",
    tone: "iron",
  },
  {
    no: "04",
    title: "AI AUTOMATION, CRM & ERP",
    line: "Systems that run your operations while you focus on scaling.",
    items: ["CRM SETUP & CUSTOM CRMS", "ERP, INVENTORY & ORDER SYSTEMS", "AI AGENTS & CUSTOM AUTOMATIONS"],
    icon: "/services/automation.png",
    tone: "iron",
  },
  {
    no: "05",
    title: "BRAND STRATEGY & GROWTH",
    line: "A consistent identity that builds trust and stands out in a crowded market.",
    items: ["NAMING, TAGLINES & MESSAGING", "LOGO, TYPE & COLOUR SYSTEMS", "PACKAGING DESIGN"],
    icon: "/services/brand.png",
    tone: "iron",
  },
  {
    no: "06",
    title: "CONSULTING & SUPPORT",
    line: "A partner on call — you'll never be just another account number.",
    items: ["FREE ACCOUNT AUDITS", "STRATEGY SESSIONS", "ONGOING SUPPORT & REPORTING"],
    icon: "/services/consulting.png",
    tone: "iron",
  },
];

/* --------------------------------------------------------------------------
   Work / portfolio — real client websites
   - url:     live link (leave empty to show "Want one like this?" instead)
   - image:   a tall homepage screenshot in /public/work/ — it scrolls on hover
   - video:   optional screen recording (mp4/webm) for the browser preview
   - palette: colours for the monogram banner on /work (banner = accent,
              letters = bg) and the fallback preview when there's no image
   To add a project: drop a screenshot in /public/work/ and copy an entry.
   -------------------------------------------------------------------------- */
export type Project = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  domain?: string;
  url?: string;
  image?: string;
  video?: string;
  palette: { bg: string; fg: string; accent: string };
  monogram?: string; // letters on the /work banner (defaults to initials)
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bahaara",
    name: "Bahaara",
    category: "WOMENSWEAR",
    blurb: "Online store for a designer label — western and ethnic collections, from co-ords to lehengas.",
    domain: "bahaaraofficial.com",
    url: "https://www.bahaaraofficial.com/",
    image: "/work/bahaara.jpg",
    palette: { bg: "#f5f2ed", fg: "#111111", accent: "#e3121c" },
    featured: true,
  },
  {
    slug: "vandann",
    name: "Vandann",
    category: "WOMENSWEAR",
    blurb: "Made-to-measure fashion store from Jaipur — free custom fit in sizes XS to 10XL.",
    domain: "vandann.com",
    url: "https://vandann.com/",
    image: "/work/vandann.jpg",
    palette: { bg: "#f5f2ed", fg: "#141414", accent: "#1c1c1c" },
    featured: true,
  },
  {
    slug: "ctrl-plus-p",
    name: "Ctrl+P",
    monogram: "C+P",
    category: "STREETWEAR",
    blurb: "Streetwear store from Jaipur for oversized tees, denim and hoodies with bold prints.",
    domain: "ctrlplusp.in",
    url: "https://ctrlplusp.in/",
    image: "/work/ctrl-plus-p.jpg",
    palette: { bg: "#e3121c", fg: "#f5f2ed", accent: "#f5f2ed" },
    featured: true,
  },
  {
    slug: "ungrave",
    name: "Ungrave",
    category: "STREETWEAR",
    blurb: "Art-led streetwear store for graphic tees and hoodies, shipping across India.",
    domain: "ungrave.in",
    url: "https://ungrave.in/",
    image: "/work/ungrave.jpg",
    palette: { bg: "#ffffff", fg: "#0d0d0d", accent: "#9b0c14" },
    featured: true,
  },
];

/* --------------------------------------------------------------------------
   Clients — one slim line of names sliding left → right (home + work pages).
   Add / remove names here. (Optional later: drop logo files in /public/clients/.)
   -------------------------------------------------------------------------- */
export const clientsIntro = {
  eyebrow: "OUR CLIENTS",
  countLabel: "FASHION BRANDS",
};

export const clients = [
  "Idamstore",
  "Bahaara",
  "Ryve",
  "Ungrave",
  "Woxon",
  "Ctrl+P",
  "Vandann",
  "Shop Xaya",
  "Zivaan",
  "The Meme House",
  "Shivsamgi",
  "HarRoz",
  "Perini",
  "Abees",
  "Peggy",
  "Tsukie",
  "Off Grid",
  "Lykos Clothing",
];

/* --------------------------------------------------------------------------
   Testimonials — "straight from the chats"
   ✏️ REPLACE — placeholders. Use REAL client messages (with permission).
   Either type out the messages, or set `screenshot` to an image in /public/reviews/.
   -------------------------------------------------------------------------- */
export type Testimonial = {
  client: string;
  initials: string;
  business: string;
  website?: string;
  platform: "WHATSAPP" | "INSTAGRAM" | "LINKEDIN" | "EMAIL";
  tone: Tone;
  screenshot?: string;
  messages: { from: "client" | "us"; text: string; time: string }[];
};

export const testimonials: Testimonial[] = [
  {
    client: "Client Name",
    initials: "CN",
    business: "JEWELLERY BRAND",
    website: "clientwebsite.com",
    platform: "WHATSAPP",
    tone: "red",
    messages: [
      { from: "client", text: "Just saw the new site on my phone 😍", time: "9:41 pm" },
      { from: "client", text: "It looks like a big brand now. Already got 3 enquiries from Instagram!", time: "9:42 pm" },
      { from: "us", text: "That's what we like to hear 🙌", time: "9:45 pm" },
    ],
  },
  {
    client: "Client Name",
    initials: "CN",
    business: "D2C FOOD BRAND",
    website: "clientwebsite.com",
    platform: "INSTAGRAM",
    tone: "bone",
    messages: [
      { from: "client", text: "The WhatsApp bot replied to 40 customers last night while we were asleep", time: "8:02 am" },
      { from: "client", text: "Best money we've spent this year honestly", time: "8:03 am" },
    ],
  },
  {
    client: "Client Name",
    initials: "CN",
    business: "FITNESS COACH",
    platform: "WHATSAPP",
    tone: "ink",
    messages: [
      { from: "client", text: "Logo is perfect. My clients keep asking who designed it", time: "1:15 pm" },
      { from: "us", text: "Tell them it's built in-house 😉", time: "1:16 pm" },
      { from: "client", text: "Haha done. Let's start the website next week", time: "1:18 pm" },
    ],
  },
  {
    client: "Client Name",
    initials: "CN",
    business: "HOME DECOR STORE",
    website: "clientwebsite.com",
    platform: "WHATSAPP",
    tone: "red",
    messages: [
      { from: "client", text: "Orders are coming from Google now, not just Insta", time: "6:30 pm" },
      { from: "client", text: "And the checkout is so smooth. Thank you team TSH!", time: "6:31 pm" },
    ],
  },
  {
    client: "Client Name",
    initials: "CN",
    business: "SERVICE BUSINESS",
    website: "clientwebsite.com",
    platform: "LINKEDIN",
    tone: "bone",
    messages: [
      { from: "client", text: "Delivered two days before the deadline. Didn't even have to follow up once.", time: "11:20 am" },
      { from: "client", text: "Recommending you to everyone in my network.", time: "11:21 am" },
    ],
  },
];

/* --------------------------------------------------------------------------
   Stats band (counts up when it scrolls into view) — from the company profile
   -------------------------------------------------------------------------- */
export type Stat = { value: number; decimals?: number; prefix?: string; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 25, suffix: "+", label: "SPECIALISTS ON THE TEAM" },
  { value: 11.83, decimals: 2, suffix: "X", label: "PEAK BLENDED ROAS DELIVERED" },
  { value: 1.5, decimals: 1, prefix: "₹", suffix: " CR+", label: "PEAK MONTHLY CLIENT REVENUE" },
];

/* --------------------------------------------------------------------------
   Process
   -------------------------------------------------------------------------- */
export const processIntro = {
  eyebrow: "HOW WE WORK",
  title: "From audit to scale.",
};

export const processSteps = [
  {
    title: "FREE AUDIT",
    body: "Ad account, website or workflow — we find exactly where your current setup is leaving performance and money on the table.",
  },
  {
    title: "STRATEGY SESSION",
    body: "A tailored walkthrough of how our system applies to your brand: what to fix, what to build and what it will take.",
  },
  {
    title: "ONBOARD & SCALE",
    body: "We onboard you into the Ecom Performance System and start testing. Results typically show within 30 to 40 days.",
  },
];

/* --------------------------------------------------------------------------
   Team
   ✏️ REPLACE — names, roles, photos (/public/team/...), socials and facts
   -------------------------------------------------------------------------- */
export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  photo?: string;
  tone: Tone;
  instagram?: string;
  linkedin?: string;
  facts: string[];
};

export const team: TeamMember[] = [
  {
    name: "FOUNDER NAME",
    initials: "FN",
    role: "FOUNDER — PERFORMANCE & GROWTH",
    tone: "red",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facts: [
      "HAS NEVER MISSED A LAUNCH DATE. NOT ONCE.",
      "REPLIES FASTER THAN YOUR FOOD DELIVERY.",
      "CAN TURN A VOICE NOTE INTO A FULL PROJECT PLAN.",
    ],
  },
  {
    name: "TEAM MEMBER NAME",
    initials: "TM",
    role: "HEAD OF TECH — WEB, APPS & AUTOMATION",
    tone: "bone",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facts: [
      "THINKS IN FIGMA, DREAMS IN TYPESCRIPT.",
      "BELIEVES EVERY BUTTON HAS TO EARN ITS PLACE.",
      "HAS A PLAYLIST FOR EVERY KIND OF BUG.",
    ],
  },
];

/* --------------------------------------------------------------------------
   About page — from the company profile
   -------------------------------------------------------------------------- */
export const about = {
  eyebrow: "ABOUT US",
  titleTop: "Everything under",
  titleBottom: "one roof.",
  body: "The Scale House is a performance marketing agency built for clothing and apparel brands. Founded in Delhi, we've grown into a team of 25+ professionals — in-house and remote — united by one focus: helping D2C fashion brands scale profitably. Alongside the ads, our tech team builds the websites, apps, custom software, CRMs, ERPs and automations growing brands run on.",
  bodyMore:
    "We don't run generic ad campaigns. We run our proprietary Ecom Performance System — from creative strategy to campaign optimisation, every part of the process is designed around one outcome: strong, sustainable ROAS. Our team has delivered blended ROAS in the range of 5.4x–11.83x for D2C clothing brands across India, and helped clients hit peak monthly revenues of over ₹1.5 Cr.",
  pills: ["DELHI, INDIA", "25+ SPECIALISTS", "IN-HOUSE + REMOTE", "D2C FASHION & APPAREL"],
  founderEyebrow: "FOUNDER'S MESSAGE",
  founderTitle: "Why we started",
  // From the company profile (founding dates left out — see README)
  founderMessage: [
    "When The Scale House started, the goal was simple: help clothing and apparel brands stop guessing with their ad spend and start scaling with a system that actually works.",
    "Having spent years deep in the weeds of Meta Ads, testing creatives and scaling D2C brands across India's ethnic wear and fashion space, I saw the same problem repeat itself again and again — brands spending heavily on ads with no structured way to identify what was actually driving returns. That gap is what got me started. No big office, no big team — just a conviction that Meta Ads for fashion brands needed a specialist's eye, not a copy-paste strategy borrowed from selling gadgets or supplements.",
    "What we didn't expect was how fast that conviction would resonate. Today we're a 25+ strong team. But honestly, the growth isn't what I'm proudest of. I'm proudest that we've never diluted the focus — every client we work with is a clothing or apparel brand, because that's where our team's instincts are sharpest.",
    "If you're a fashion brand owner reading this, my promise to you is simple: you won't be another account number to us. You'll be working with a team that eats, sleeps and breathes apparel performance marketing.",
  ],
  founderSignature: "— FOUNDER, THE SCALE HOUSE",
  teamEyebrow: "THE HOUSEMATES",
  teamTitle: "Meet the team",
  teamBody: "A 25+ strong crew of media buyers, creatives, designers and engineers — and people who actually pick up the phone.",
  factsLabel: "THINGS YOU SHOULD KNOW",
};

/* --------------------------------------------------------------------------
   Shared CTA copy — closing lines from the company profile
   -------------------------------------------------------------------------- */
export const cta = {
  contactEyebrow: "LET'S WORK TOGETHER",
  contactTitleTop: "Your brand has the product.",
  contactTitleBottom: "We have the system to scale it.",
  contactBody:
    "It starts with a free account audit to find exactly where your current setup is leaving performance on the table, followed by a strategy session tailored to your brand. Results typically show within 30 to 40 days.",
  auditButton: "GET A FREE AUDIT",
  rowEyebrow: "THE NEXT CHAT ON THIS ROW COULD BE YOURS",
  button: "GET YOUR WEBSITE",
  sticker: "REPLY WITHIN A DAY",
  note: "Takes a minute. Three quick taps — no calls, no endless forms.",
};
