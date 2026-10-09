"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function CountUp({ stat }: { stat: Stat }) {
  const { value: to, decimals = 0, prefix = "", suffix } = stat;
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <p ref={ref} className="font-display text-5xl leading-none font-black tracking-tight tabular-nums md:text-6xl">
      {prefix && <span className="text-red">{prefix}</span>}
      {value.toFixed(decimals)}
      <span className="text-red">{suffix}</span>
    </p>
  );
}

/** Off-white band of counting numbers with red accents. */
export function Stats() {
  return (
    <section className="dot-grid-ink border-y-2 border-ink bg-bone text-ink" aria-label="The Scale House in numbers">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y-2 divide-ink border-x-2 border-ink sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-8 text-center sm:px-6 sm:py-12">
            <CountUp stat={s} />
            <p className="mt-2 font-display text-[0.65rem] leading-tight font-bold tracking-[0.16em] text-ink/65 sm:text-xs sm:tracking-[0.18em]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
