import type { Tone } from "@/content/site";

/** Background + text colour pairs for each brand tone. */
export const toneClass: Record<Tone, string> = {
  ink: "bg-ink text-cream",
  orange: "bg-orange text-cream",
  yellow: "bg-yellow text-ink",
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
};

/** Accent colour that reads well on top of each tone. */
export const toneAccent: Record<Tone, string> = {
  ink: "text-yellow",
  orange: "text-yellow",
  yellow: "text-orange",
  paper: "text-orange",
  cream: "text-orange",
};

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
