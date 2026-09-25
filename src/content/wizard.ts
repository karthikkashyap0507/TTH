/* ==========================================================================
   "Start a project" wizard — three quick questions.
   ========================================================================== */

export const wizard = {
  steps: [
    {
      key: "service",
      title: "What are we building?",
      hint: "Pick the closest one — we'll fine-tune it together.",
      options: [
        { value: "Brand identity", sub: "Logo, colours, type, social kit" },
        { value: "Website or store", sub: "Landing page, e-commerce, web app" },
        { value: "AI automation", sub: "WhatsApp agent, lead bots, workflows" },
        { value: "The whole house", sub: "Brand + website + AI, end to end" },
      ],
    },
    {
      key: "budget",
      title: "What's the budget?",
      hint: "A rough range helps us suggest the right plan.",
      options: [
        { value: "Under ₹25k", sub: "Starter" },
        { value: "₹25k – ₹75k", sub: "Most popular" },
        { value: "₹75k – ₹2L", sub: "Growth" },
        { value: "₹2L+", sub: "Full build" },
        { value: "Not sure yet", sub: "Help me decide" },
      ],
    },
  ],
  contactTitle: "Where do we reach you?",
  contactHint: "We reply on WhatsApp within a day — usually much sooner.",
  successTitle: "You're in!",
  successBody: "We've got your brief. Expect a WhatsApp message from us within 24 hours with next steps.",
};
