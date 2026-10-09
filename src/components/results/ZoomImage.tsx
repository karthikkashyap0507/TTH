"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ResultImage } from "@/content/results";
import { Close } from "@/components/icons";
import { cx } from "@/lib/tones";
import { useScrollLock } from "@/lib/useScrollLock";

const labelStyle: Record<NonNullable<ResultImage["label"]>, string> = {
  BEFORE: "bg-ink text-bone ring-1 ring-white/25",
  AFTER: "bg-red text-white",
  "ACCOUNT SNAPSHOT": "bg-bone text-ink",
};

/** A screenshot that opens full-size in a lightbox when clicked. */
export function ZoomImage({ image, className }: { image: ResultImage; className?: string }) {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${image.alt}`}
        className={cx(
          "group relative block w-full overflow-hidden rounded-xl border border-white/12 bg-white text-left transition-[border-color,box-shadow] duration-300 hover:border-red hover:shadow-pop",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
        />
        {image.label && (
          <span className={cx("absolute top-2 left-2 rounded-full px-2.5 py-0.5 font-display text-[0.6rem] font-black tracking-[0.14em]", labelStyle[image.label])}>
            {image.label}
          </span>
        )}
        <span className="absolute right-2 bottom-2 rounded-full bg-ink/85 px-2.5 py-1 font-display text-[0.55rem] font-black tracking-[0.14em] text-bone opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          CLICK TO ZOOM
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] grid place-items-center bg-black/90 p-3 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={image.alt}
          >
            <motion.figure
              className="relative max-w-[96vw]"
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="block h-auto max-h-[84svh] w-auto max-w-full rounded-xl border border-white/15 bg-white"
              />
              <figcaption className="mt-3 text-center text-xs font-medium text-bone/60">{image.alt}</figcaption>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full border border-white/20 bg-ink text-bone transition-colors hover:border-red hover:bg-red hover:text-white"
              >
                <Close className="size-4" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
