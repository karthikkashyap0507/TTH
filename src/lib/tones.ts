import type { Tone } from "@/content/site";

/** Background + text colour pairs for each brand tone. */
export const toneClass: Record<Tone, string> = {
  red: "bg-red text-white",
  ink: "bg-ink text-bone",
  bone: "bg-bone text-ink",
  iron: "bg-iron text-bone",
};

/** Accent colour that reads well on top of each tone. */
export const toneAccent: Record<Tone, string> = {
  red: "text-ink",
  ink: "text-red-bright",
  bone: "text-red",
  iron: "text-red-bright",
};

/** Border that stays visible on top of each tone. */
export const toneBorder: Record<Tone, string> = {
  red: "border-ink",
  ink: "border-white/20",
  bone: "border-ink",
  iron: "border-white/12",
};

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
