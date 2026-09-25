/* ==========================================================================
   THE TECH HOUSE — site content
   --------------------------------------------------------------------------
   Almost everything you see on the website is edited from this one file.
   Anything marked  ✏️ REPLACE  is placeholder content: swap it for TTH's
   real details before going live.
   ========================================================================== */

export type Tone = "ink" | "orange" | "yellow" | "paper" | "cream";

/* --------------------------------------------------------------------------
   Brand + contact
   -------------------------------------------------------------------------- */
export const site = {
  name: "The Tech House",
  shortName: "TTH",
  wordmark: "THE TECH HOUSE",
  // Used for SEO/Open Graph. Set NEXT_PUBLIC_SITE_URL in .env.local when you have a domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "The Tech House — Brands, Websites & AI Automation",
  description:
    "The Tech House (TTH) is a design, web and AI automation studio. We build brand identities, lightning-fast websites and AI agents that help businesses sell more.",
  ogDescription: "Brands. Websites. AI agents. All built in-house.",
  keywords: [
    "brand identity",
    "logo design",
    "website design",
    "e-commerce website",
    "AI automation",
    "WhatsApp chatbot",
    "web development studio India",
    "The Tech House",
  ],
  replyTime: "24 hrs",
  // ✏️ REPLACE — real contact details
  email: "hello@thetechhouse.example",
  whatsapp: "910000000000", // country code + number, digits only (used for wa.me links)
  location: "India",
  socials: {
    instagram: { label: "@thetechhouse", href: "https://www.instagram.com/" },
    linkedin: { label: "The Tech House", href: "https://www.linkedin.com/" },
  },
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */
export const nav = [
  { label: "SERVICES", href: "/#services" },
  { label: "WORK", href: "/work" },
  { label: "WHY US", href: "/why-us" },
  { label: "ABOUT", href: "/about" },
  { label: "CAREERS", href: "/careers" },
];

export const footerNav = [...nav, { label: "CONTACT", href: "/#contact" }];

/* --------------------------------------------------------------------------
   Home — hero
   -------------------------------------------------------------------------- */
export const hero = {
  lead: "WE BUILD",
  // The outlined line cycles through these words
  rotating: ["BRANDS", "WEBSITES", "AI AGENTS", "STORES", "WEB APPS"],
  tail: "all in-house.",
  body: "Brand identity, websites and AI automation from one studio — so your logo, your store and your chatbot finally speak the same language.",
  badge: "BUILT IN-HOUSE ✦ SHIPPED FAST ✦ ",
  hint: "PRO TIP — GRAB A STICKER AND THROW IT",
  stickers: [
    { label: "BRANDS", tone: "yellow" as Tone, rotate: -12, className: "left-[3%] top-[14%] md:left-[4%] md:top-[22%]" },
    { label: "WEBSITES", tone: "orange" as Tone, rotate: 10, className: "right-[3%] top-[14%] md:right-[5%] md:top-[19%]" },
    {
      label: "AI AGENTS",
      tone: "ink" as Tone,
      rotate: -8,
      className: "right-[5%] bottom-[5%] md:right-[7%] md:bottom-auto md:top-[47%]",
    },
  ],
};

export const marqueeItems = [
  "BRAND IDENTITY",
  "WEBSITES",
  "ONLINE STORES",
  "AI AGENTS",
  "WHATSAPP AUTOMATION",
  "WEB APPS",
  "SEO & SPEED",
];

/* --------------------------------------------------------------------------
   Services (home, scratch-card section)
   -------------------------------------------------------------------------- */
export const servicesIntro = {
  eyebrow: "ONE ROOF. THREE FLOORS.",
  title: "What we build",
};

export const services: {
  no: string;
  title: string;
  line: string;
  items: string[];
  tone: Tone;
}[] = [
  {
    no: "01",
    title: "BRAND IDENTITY",
    line: "Look like the leader of your niche.",
    items: ["LOGO SYSTEMS", "BRAND GUIDELINES", "PACKAGING & SOCIAL KITS"],
    tone: "yellow",
  },
  {
    no: "02",
    title: "WEBSITES & STORES",
    line: "Loads in a blink. Sells while you sleep.",
    items: ["SHOPIFY & CUSTOM STORES", "LANDING PAGES", "WEB APPS & PORTALS"],
    tone: "paper",
  },
  {
    no: "03",
    title: "AI AGENTS",
    line: "Hand the repetitive work to robots.",
    items: ["WHATSAPP & DM AGENTS", "LEAD CAPTURE & FOLLOW-UP", "CRM & SHEET AUTOMATIONS"],
    tone: "ink",
  },
];

/* --------------------------------------------------------------------------
   Work / portfolio
   ✏️ REPLACE — these are SAMPLE projects so the layout has something to show.
   Swap them for TTH's real client work before launch.
   - url:     live link (leave empty for "Want one like this?" instead)
   - image:   optional cover image in /public/work/...
   - video:   optional screen recording (mp4/webm) for the browser preview
   - palette: colours used by the auto-generated preview if you have no media
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
  tone: Tone;
  palette: { bg: string; fg: string; accent: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "saffron-and-sage",
    name: "Saffron & Sage",
    category: "WEBSITE",
    blurb: "Restaurant site with table booking and a WhatsApp menu bot.",
    domain: "saffronandsage.example",
    tone: "orange",
    palette: { bg: "#fff4e6", fg: "#3b1d0e", accent: "#e8590c" },
    featured: true,
  },
  {
    slug: "kiln-studio",
    name: "Kiln Studio",
    category: "E-COMMERCE",
    blurb: "Handmade ceramics store with a lookbook-first homepage.",
    domain: "kilnstudio.example",
    tone: "paper",
    palette: { bg: "#f3ede4", fg: "#2d2a26", accent: "#b5651d" },
    featured: true,
  },
  {
    slug: "northpeak-treks",
    name: "NorthPeak Treks",
    category: "WEBSITE",
    blurb: "Trek booking site with live batch availability.",
    domain: "northpeak.example",
    tone: "ink",
    palette: { bg: "#0f1d1a", fg: "#e9f5ef", accent: "#3ddc97" },
    featured: true,
  },
  {
    slug: "mira-jewels",
    name: "Mira Jewels",
    category: "E-COMMERCE",
    blurb: "Jewellery store with reels-to-product shopping.",
    domain: "mirajewels.example",
    tone: "yellow",
    palette: { bg: "#fbf6ee", fg: "#2b2118", accent: "#c9a227" },
    featured: true,
  },
  {
    slug: "lumen-dental",
    name: "Lumen Dental",
    category: "AI AUTOMATION",
    blurb: "Clinic site plus an AI receptionist that books appointments.",
    domain: "lumendental.example",
    tone: "paper",
    palette: { bg: "#eef6ff", fg: "#0b2545", accent: "#2f80ed" },
  },
  {
    slug: "orbit-fitness",
    name: "Orbit Fitness",
    category: "BRANDING",
    blurb: "Full identity for a boutique gym — logo, kit and signage.",
    domain: "orbitfitness.example",
    tone: "orange",
    palette: { bg: "#111111", fg: "#f5f5f5", accent: "#ff4d00" },
  },
  {
    slug: "byte-bakery",
    name: "Byte Bakery",
    category: "LANDING PAGE",
    blurb: "One-page launch site for a cloud bakery. Sold out day one.",
    domain: "bytebakery.example",
    tone: "yellow",
    palette: { bg: "#fff8f0", fg: "#4a2c2a", accent: "#ff7eb6" },
  },
  {
    slug: "ferro-motors",
    name: "Ferro Motors",
    category: "WEB APP",
    blurb: "Dealer dashboard for leads, test drives and follow-ups.",
    domain: "ferromotors.example",
    tone: "ink",
    palette: { bg: "#f4f5f7", fg: "#16181d", accent: "#6c5ce7" },
  },
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
    tone: "ink",
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
    tone: "orange",
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
    tone: "yellow",
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
    tone: "orange",
    messages: [
      { from: "client", text: "Orders are coming from Google now, not just Insta", time: "6:30 pm" },
      { from: "client", text: "And the checkout is so smooth. Thank you team TTH!", time: "6:31 pm" },
    ],
  },
  {
    client: "Client Name",
    initials: "CN",
    business: "SERVICE BUSINESS",
    website: "clientwebsite.com",
    platform: "LINKEDIN",
    tone: "ink",
    messages: [
      { from: "client", text: "Delivered two days before the deadline. Didn't even have to follow up once.", time: "11:20 am" },
      { from: "client", text: "Recommending you to everyone in my network.", time: "11:21 am" },
    ],
  },
];

/* --------------------------------------------------------------------------
   Stats band (counts up when it scrolls into view)
   ✏️ REPLACE — use your real numbers
   -------------------------------------------------------------------------- */
export const stats = [
  { value: 40, suffix: "+", label: "BRANDS LAUNCHED" },
  { value: 75, suffix: "+", label: "PROJECTS SHIPPED" },
  { value: 24, suffix: "H", label: "REPLY TIME" },
];

/* --------------------------------------------------------------------------
   Process
   -------------------------------------------------------------------------- */
export const processIntro = {
  eyebrow: "THE HOUSE RULES",
  title: "Three steps. Zero chaos.",
};

export const processSteps = [
  {
    title: "TALK",
    body: "Share your goal on a quick call or a voice note. We come back with a clear plan and a fixed price.",
  },
  {
    title: "BUILD",
    body: "We design, code and plug in the AI — and you see progress every few days, not just at the end.",
  },
  {
    title: "GROW",
    body: "We launch, hand you the keys and stay on call for tweaks, fixes and your next big idea.",
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
    role: "FOUNDER — STRATEGY & GROWTH",
    tone: "yellow",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facts: [
      "HAS NEVER MISSED A LAUNCH DATE. NOT ONCE.",
      "REPLIES FASTER THAN YOUR FOOD DELIVERY.",
      "CAN TURN A VOICE NOTE INTO A FULL PROJECT PLAN.",
    ],
  },
  {
    name: "CO-FOUNDER NAME",
    initials: "CN",
    role: "CO-FOUNDER — DESIGN & ENGINEERING",
    tone: "orange",
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
   About page
   -------------------------------------------------------------------------- */
export const about = {
  eyebrow: "ABOUT US",
  titleTop: "Everything under",
  titleBottom: "one roof.",
  body: "The Tech House is a design, development and AI studio. We started it because small businesses kept juggling a logo designer, a website freelancer and a chatbot vendor who never spoke to each other. Here, one team builds all three — so everything looks, works and talks like the same brand.",
  pills: ["INDIA-BASED", "CLIENTS WORLDWIDE", "SHIPS EVERY WEEK"],
  teamEyebrow: "THE HOUSEMATES",
  teamTitle: "Meet the team",
  teamBody: "A small crew that designs, codes and automates — and actually picks up the phone.",
  factsLabel: "THINGS YOU SHOULD KNOW",
};

/* --------------------------------------------------------------------------
   Shared CTA copy
   -------------------------------------------------------------------------- */
export const cta = {
  contactTitleTop: "Got a big idea?",
  contactTitleBottom: "Bring it home.",
  contactBody:
    "Send one message. Within a day you'll have a plan, a timeline and a price — no jargon, no pressure.",
  rowEyebrow: "THE NEXT CHAT ON THIS ROW COULD BE YOURS",
  button: "GET YOUR WEBSITE",
  sticker: "REPLY WITHIN A DAY",
  note: "Takes a minute. Three quick taps — no calls, no endless forms.",
};
