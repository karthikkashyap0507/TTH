/* ==========================================================================
   "Start a project" wizard — three quick questions.
   ========================================================================== */

export const wizard = {
  steps: [
    {
      key: "service",
      title: "What do you need?",
      hint: "Pick the closest one — we'll fine-tune it together.",
      options: [
        { value: "Performance marketing", sub: "Meta ads that scale profitably" },
        { value: "Website or app", sub: "Shopify, custom sites, iOS & Android" },
        { value: "Custom software", sub: "CRM, ERP, dashboards & automations" },
        { value: "Branding & creatives", sub: "Identity, ad creatives, packaging" },
        { value: "Free account audit", sub: "Find where your ads leak money" },
        { value: "The whole house", sub: "Ads + tech + brand, end to end" },
      ],
    },
    {
      key: "budget",
      title: "What's the budget?",
      hint: "A rough monthly or project budget helps us suggest the right plan.",
      options: [
        { value: "Under ₹25k", sub: "Starter" },
        { value: "₹25k – ₹75k", sub: "Most popular" },
        { value: "₹75k – ₹2L", sub: "Growth" },
        { value: "₹2L+", sub: "Scale" },
        { value: "Not sure yet", sub: "Help me decide" },
      ],
    },
  ],
  contactTitle: "Where do we reach you?",
  contactHint: "We reply on WhatsApp within a day — usually much sooner.",
  successTitle: "You're in!",
  successBody: "We've got your brief. Expect a WhatsApp message from us within 24 hours with next steps.",
};
