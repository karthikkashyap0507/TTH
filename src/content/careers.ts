/* ==========================================================================
   Careers — open roles + application statuses
   Add / remove roles here; each one gets its own page at /careers/<slug>.
   ========================================================================== */

export type Role = {
  slug: string;
  title: string;
  tag: string;
  featured?: boolean;
  comp: string;
  type: string;
  location: string;
  experience: string;
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  bonus: string[];
  skills: string[];
};

export const careersIntro = {
  eyebrow: "WE'RE HIRING",
  titleTop: "Build the house",
  titleBottom: "with us.",
  remoteNote: "fully remote",
  body: "Work from anywhere in India on real client projects from week one. No endless interviews, no busywork.",
  beforeTitle: "Before you apply",
  beforeBody:
    "Every application needs a 60-second intro video and links to real work you've done. Applications with working links get a proper review from the founders — every single one.",
};

export const hiringSteps = [
  { title: "APPLY", body: "Five-minute form, one short video, links to your work." },
  { title: "MINI TASK", body: "A small, real-world task so we can see how you think." },
  { title: "CALL", body: "A relaxed chat with the founders about the role and you." },
  { title: "OFFER", body: "If it clicks, you get an offer within a week. Welcome home." },
];

export const perks = [
  "Remote-first, flexible hours",
  "Real client work, not tickets in a void",
  "Learn design, code and AI side by side",
  "Direct access to the founders",
];

export const experienceLevels = ["FRESHER", "UNDER 1 YEAR", "1–3 YEARS", "3+ YEARS"];
export const availabilityOptions = ["IMMEDIATELY", "IN 2 WEEKS", "IN A MONTH"];

export const roles: Role[] = [
  {
    slug: "sales-partnerships",
    title: "Sales & Partnerships",
    tag: "SALES",
    featured: true,
    comp: "Fixed pay + uncapped commission",
    type: "Full-time",
    location: "Remote · India",
    experience: "1+ year",
    summary:
      "Find businesses that deserve a better online presence, start the conversation and close the deal with us.",
    about:
      "You'll be the first voice many of our clients hear. You'll find great-fit businesses, understand what's holding them back online and walk them into a proposal they're excited to sign.",
    responsibilities: [
      "Build a pipeline through calls, DMs, LinkedIn and referrals",
      "Run discovery calls and turn problems into clear proposals",
      "Negotiate, close and hand over smoothly to the build team",
      "Keep the CRM honest and your follow-ups on time",
    ],
    requirements: [
      "At least a year of B2B or agency sales, or a record of closing anything",
      "Comfortable talking to founders and shop owners alike",
      "Organised enough to never let a warm lead go cold",
    ],
    bonus: ["You speak two or more Indian languages", "You've sold websites, marketing or SaaS before"],
    skills: [
      "Cold calling",
      "LinkedIn outreach",
      "Instagram DMs",
      "Discovery calls",
      "Negotiation",
      "Proposal writing",
      "CRM tools",
      "Hindi",
      "English",
      "Kannada",
      "Tamil",
      "Telugu",
    ],
  },
  {
    slug: "ai-automation-engineer",
    title: "AI Automation Engineer",
    tag: "ENGINEERING",
    featured: true,
    comp: "Competitive salary + project bonus",
    type: "Full-time",
    location: "Remote · India",
    experience: "1–3 years",
    summary:
      "Build the WhatsApp agents, lead bots and workflows that do our clients' busywork while they sleep.",
    about:
      "You'll design and ship AI agents that talk to real customers, plus the automations that move data between forms, sheets, CRMs and inboxes. Reliability matters more than demos here.",
    responsibilities: [
      "Build chat agents on WhatsApp, Instagram and the web",
      "Connect LLM APIs to client data: catalogues, FAQs, policies",
      "Automate workflows with code, n8n or Make — whatever fits",
      "Monitor conversations and keep improving answer quality",
    ],
    requirements: [
      "Solid JavaScript/TypeScript or Python",
      "You've shipped at least one LLM-powered project people used",
      "You understand webhooks, APIs and how to debug them",
    ],
    bonus: ["Experience with the WhatsApp Business / Cloud API", "Retrieval (RAG) and evaluation experience"],
    skills: [
      "Python",
      "Node.js",
      "TypeScript",
      "LLM APIs",
      "Prompt design",
      "RAG / vector DBs",
      "WhatsApp Cloud API",
      "n8n",
      "Make / Zapier",
      "Webhooks",
      "Google Sheets API",
    ],
  },
  {
    slug: "full-stack-developer",
    title: "Full-Stack Developer",
    tag: "ENGINEERING",
    comp: "Competitive salary",
    type: "Full-time",
    location: "Remote · India",
    experience: "1–3 years",
    summary: "Turn designs into fast, animated, conversion-focused websites, stores and dashboards.",
    about:
      "You'll build client websites, e-commerce stores and internal tools end to end — from the first component to the last Lighthouse score. You care how things feel, not just whether they work.",
    responsibilities: [
      "Build marketing sites and stores with Next.js or Shopify",
      "Create admin dashboards and client portals",
      "Add motion and micro-interactions that feel premium",
      "Own performance, SEO basics and accessibility",
    ],
    requirements: [
      "Strong React + TypeScript with at least two live projects",
      "Comfortable with a database and a REST or server-actions API",
      "An eye for spacing, type and detail",
    ],
    bonus: ["Shopify Liquid / Hydrogen experience", "Motion or Framer Motion experience"],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Shopify",
      "Motion / animation",
      "SEO",
    ],
  },
  {
    slug: "brand-designer",
    title: "Brand Designer",
    tag: "DESIGN",
    comp: "Competitive salary",
    type: "Full-time or freelance",
    location: "Remote · India",
    experience: "1+ year",
    summary: "Create logos, brand systems and social creatives that make small businesses look big.",
    about:
      "You'll take a brand from a messy mood board to a clean, confident identity — logo, colours, type, packaging and social templates that clients actually keep using.",
    responsibilities: [
      "Design logos and full identity systems",
      "Build brand guidelines and social media kits",
      "Design packaging, carousels and launch creatives",
      "Work with developers so the website matches the brand",
    ],
    requirements: [
      "A portfolio with real identity work (student projects count if they're good)",
      "Strong typography and layout fundamentals",
      "Fluent in Figma and Illustrator",
    ],
    bonus: ["Motion graphics or 3D basics", "Experience with packaging or print"],
    skills: [
      "Logo design",
      "Brand systems",
      "Typography",
      "Figma",
      "Illustrator",
      "Photoshop",
      "Packaging",
      "Social creatives",
      "Motion graphics",
      "Illustration",
    ],
  },
];

export const getRole = (slug: string) => roles.find((r) => r.slug === slug);

/* --------------------------------------------------------------------------
   Application statuses (shown on /status, set from /admin)
   -------------------------------------------------------------------------- */
export const applicationStatuses = [
  {
    key: "received",
    label: "Application received",
    body: "We've got it. Every application with working links gets a real review from the founders.",
  },
  {
    key: "reviewing",
    label: "In review",
    body: "The team is going through your work right now. Hang tight.",
  },
  {
    key: "task",
    label: "Mini task sent",
    body: "Check your email and WhatsApp — a short task is waiting for you.",
  },
  {
    key: "interview",
    label: "Call with the founders",
    body: "You're through to a call. We'll share a time slot with you directly.",
  },
  {
    key: "offer",
    label: "Offer — welcome home!",
    body: "We'd love to have you in the house. Check your inbox for the offer.",
  },
  {
    key: "closed",
    label: "Not this time",
    body: "We've decided not to move forward right now. Keep building — you're welcome to re-apply in three months.",
  },
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number]["key"];
export const statusKeys = applicationStatuses.map((s) => s.key) as ApplicationStatus[];
export const getStatus = (key: string) => applicationStatuses.find((s) => s.key === key) ?? applicationStatuses[0];
