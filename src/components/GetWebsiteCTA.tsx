"use client";

import { motion } from "motion/react";
import { cta } from "@/content/site";
import { Plus } from "./icons";
import { useWizard } from "./wizard/WizardProvider";

/** Big red "get your website" button with a tilted sticker. */
export function GetWebsiteCTA({ eyebrow = cta.rowEyebrow, source = "cta" }: { eyebrow?: string; source?: string }) {
  const { open } = useWizard();
  return (
    <div className="text-center">
      <p className="font-display text-xs font-black tracking-[0.22em] text-bone/40">{eyebrow}</p>
      <div className="relative mt-8 inline-block">
        <motion.button
          type="button"
          onClick={() => open(source)}
          whileHover={{ y: -3 }}
          whileTap={{ y: 1, scale: 0.98 }}
          className="group relative inline-flex items-center gap-3 rounded-full border-2 border-ink bg-red px-7 py-4 font-display text-base font-black tracking-tight text-white shadow-pop-bone transition-colors hover:bg-red-bright sm:px-9 sm:py-5 sm:text-xl"
        >
          <Plus className="size-5 text-white transition-transform duration-300 group-hover:rotate-90 sm:size-6" />
          {cta.button}
        </motion.button>
        <motion.span
          className="absolute -top-4 -right-4 rounded-full border-2 border-ink bg-bone px-2.5 py-1 font-display text-[0.55rem] font-black tracking-wide whitespace-nowrap text-ink sm:-top-4 sm:-right-9 sm:text-[0.65rem]"
          initial={{ rotate: 8 }}
          animate={{ rotate: [8, 2, 8], y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {cta.sticker}
        </motion.span>
      </div>
      <p className="mt-4 text-sm font-medium text-bone/50">{cta.note}</p>
    </div>
  );
}
