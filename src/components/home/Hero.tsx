"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { hero, type Tone } from "@/content/site";
import { ScaleMark } from "@/components/icons";
import { useWizard } from "@/components/wizard/WizardProvider";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { cx, toneClass } from "@/lib/tones";

const stickerStyle: Record<Tone, { base: string; lifted: string }> = {
  bone: { base: "border-ink shadow-pop", lifted: "shadow-[10px_10px_0_0_var(--color-red)]" },
  red: { base: "border-ink shadow-pop-bone", lifted: "shadow-[10px_10px_0_0_var(--color-bone)]" },
  ink: { base: "border-white/35 shadow-pop", lifted: "shadow-[10px_10px_0_0_var(--color-red)]" },
  iron: { base: "border-white/25 shadow-pop", lifted: "shadow-[10px_10px_0_0_var(--color-red)]" },
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { open } = useWizard();
  const reduce = usePrefersReducedMotion();

  return (
    <section
      id="top"
      ref={sectionRef}
      className="dot-grid relative flex min-h-[78svh] flex-col justify-center overflow-hidden bg-ink pt-40 pb-14 sm:pt-32 md:min-h-svh md:pt-28 md:pb-20"
    >
      {/* soft red glow behind the headline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] right-[-10%] size-[60vw] max-w-[820px] animate-glow rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.32),transparent_62%)] blur-2xl" />
        <div className="absolute bottom-[-30%] left-[-15%] size-[50vw] max-w-[700px] animate-glow rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.18),transparent_65%)] blur-2xl [animation-delay:-3s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      {hero.stickers.map((s, i) => (
        <Sticker key={s.label} {...s} delay={1 + i * 0.16} bounds={sectionRef} />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.p
          className="mb-4 inline-flex max-w-full items-start gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-1.5 font-display text-[0.6rem] leading-relaxed font-bold tracking-[0.16em] text-bone/85 uppercase backdrop-blur sm:mb-6 sm:items-center sm:rounded-full sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
        >
          <span className="relative mt-[0.3rem] flex size-2 shrink-0 sm:mt-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-red" />
          </span>
          <span>{hero.eyebrow.replace(/\.$/, "")}</span>
        </motion.p>
        <h1 className="font-display text-[clamp(2.3rem,11.2vw,8.4rem)] leading-[0.98] font-black tracking-tight whitespace-nowrap text-bone uppercase">
          <span className="sr-only">
            {hero.lead} {hero.rotating.join(", ")} — {hero.tail}
          </span>
          <span aria-hidden="true">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: "115%", rotate: 4 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
              >
                {hero.lead}
              </motion.span>
            </span>
            <RotatingWord words={hero.rotating} reduce={reduce} />
            <motion.span
              className="block text-red-bright"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.45 }}
            >
              {hero.tail}
            </motion.span>
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
          >
            <p className="text-base leading-relaxed font-medium text-bone/70 sm:text-lg">{hero.body}</p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <button
                type="button"
                onClick={() => open("hero")}
                className="rounded-full bg-red px-6 py-3.5 font-display text-sm font-bold text-white shadow-pop-deep transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-red-bright active:translate-y-0 sm:px-8 sm:py-4 sm:text-base"
              >
                START A PROJECT
              </button>
              <Link
                href="/results"
                className="rounded-full border-2 border-white/25 px-6 py-3.5 font-display text-sm font-bold text-bone transition-colors hover:border-white/60 hover:bg-white/5 sm:px-8 sm:py-4 sm:text-base"
              >
                SEE RESULTS
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hidden shrink-0 sm:block"
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.85 }}
          >
            <SpinningBadge text={hero.badge} />
          </motion.div>
        </div>

        <motion.p
          className="mt-8 font-display text-[0.6rem] font-bold tracking-[0.2em] text-bone/40 sm:mt-12 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {hero.hint}
        </motion.p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Rotating outlined word — letters roll up one after another
   -------------------------------------------------------------------------- */
const letter: Variants = {
  enter: { y: "110%" },
  center: (i: number) => ({ y: "0%", transition: { duration: 0.55, ease, delay: i * 0.03 } }),
  exit: (i: number) => ({ y: "-110%", transition: { duration: 0.32, ease: [0.55, 0, 1, 0.45], delay: i * 0.018 } }),
};

function RotatingWord({ words, reduce }: { words: string[]; reduce: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      interval = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    }, 2600);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [words.length, reduce]);

  const word = words[index];

  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: "115%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.22 }}
      >
        <span className="relative block h-[1em] leading-none text-outline">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={word} className="absolute inset-0 flex" initial="enter" animate="center" exit="exit">
              {word.split("").map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span className="inline-block" custom={i} variants={letter}>
                    {ch === " " ? " " : ch}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   Draggable, throwable stickers that drop in from the top
   -------------------------------------------------------------------------- */
function Sticker({
  label,
  tone,
  rotate,
  className,
  delay,
  bounds,
}: {
  label: string;
  tone: Tone;
  rotate: number;
  className: string;
  delay: number;
  bounds: RefObject<HTMLElement | null>;
}) {
  const [lifted, setLifted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const vx = useVelocity(x);
  // Stickers lean into the direction they're thrown
  const lean = useSpring(useTransform(vx, [-2200, 0, 2200], [-28, 0, 28], { clamp: true }), {
    stiffness: 260,
    damping: 18,
  });

  return (
    <motion.div
      className={cx("absolute", lifted ? "z-40" : "z-20", className)}
      initial={{ y: -640, rotate: rotate * 3.5, opacity: 0 }}
      animate={{ y: 0, rotate, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 95,
        damping: 9,
        mass: 0.9,
        delay,
        opacity: { duration: 0.15, delay },
      }}
    >
      <motion.div
        drag
        dragConstraints={bounds}
        dragElastic={0.18}
        dragTransition={{ power: 0.35, timeConstant: 260, bounceStiffness: 520, bounceDamping: 16 }}
        onDragStart={() => setLifted(true)}
        onDragEnd={() => setLifted(false)}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.12 }}
        whileTap={{ scale: 1.08 }}
        style={{ x, y, rotate: lean, WebkitTouchCallout: "none" }}
        className="cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <div
          className={cx(
            "flex items-center rounded-full border-2 px-4 py-2 font-display text-sm font-black tracking-tight whitespace-nowrap transition-shadow sm:px-6 sm:py-3 sm:text-lg",
            stickerStyle[tone].base,
            lifted && stickerStyle[tone].lifted,
            toneClass[tone],
          )}
        >
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   Circular spinning badge
   -------------------------------------------------------------------------- */
function SpinningBadge({ text }: { text: string }) {
  return (
    <div className="relative grid size-32 place-items-center lg:size-36">
      <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="tsh-badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text className="fill-bone font-display text-[11px] font-bold">
          {/* 2πr ≈ 289 — stretch the text so it wraps the circle exactly once */}
          <textPath href="#tsh-badge-circle" textLength="287" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="grid size-16 place-items-center rounded-full border border-white/15 bg-ink shadow-[0_0_36px_rgba(227,18,28,0.45)]">
        <ScaleMark className="size-9" />
      </span>
    </div>
  );
}
