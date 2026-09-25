"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function CountUp({ to, suffix }: { to: number; suffix: string }) {
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
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <p ref={ref} className="font-display text-3xl leading-none font-black tracking-tight tabular-nums sm:text-5xl md:text-6xl">
      {value}
      {suffix}
    </p>
  );
}

/** Yellow band of counting numbers. */
export function Stats() {
  return (
    <section className="border-b-2 border-ink bg-yellow" aria-label="Studio numbers">
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x-2 divide-ink border-x-2 border-ink">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-8 text-center sm:px-6 sm:py-12">
            <CountUp to={s.value} suffix={s.suffix} />
            <p className="mt-2 font-display text-[0.55rem] leading-tight font-bold tracking-[0.14em] text-ink/70 sm:text-xs sm:tracking-[0.18em]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
