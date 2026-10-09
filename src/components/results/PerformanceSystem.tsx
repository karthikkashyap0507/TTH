import { performanceSystem } from "@/content/results";
import { Reveal } from "@/components/Reveal";
import { ScaleMark } from "@/components/icons";
import { cx } from "@/lib/tones";

/** The Test → Analyse → Optimize → Scale loop as a row of connected chips. */
export function SystemLoop({ compact = false }: { compact?: boolean }) {
  const steps = performanceSystem.loop;
  return (
    <ol className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Test, analyse, optimize, scale — repeat">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2 sm:gap-3">
          <span
            className={cx(
              "inline-flex items-center gap-2 rounded-full border font-display font-black tracking-[0.14em]",
              compact ? "px-3 py-1.5 text-[0.6rem] sm:text-[0.65rem]" : "px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm",
              i === steps.length - 1 ? "border-red bg-red text-white" : "border-white/15 bg-white/[0.04] text-bone",
            )}
          >
            <span className={i === steps.length - 1 ? "text-white/70" : "text-red-bright"}>0{i + 1}</span>
            {step}
          </span>
          <span aria-hidden="true" className="font-display font-black text-red-bright">
            {i < steps.length - 1 ? "→" : "↺"}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Full section: name, description, loop and the six pillars. */
export function PerformanceSystem() {
  return (
    <section id="system" className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-coal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.18),transparent_62%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <div>
            <div>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{performanceSystem.eyebrow}</p>
              <h2 className="mt-3 flex items-center gap-3 font-display text-3xl font-black tracking-tight text-bone uppercase sm:text-5xl">
                <ScaleMark className="size-10 shrink-0 sm:size-12" />
                {performanceSystem.name}
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium text-bone/65 sm:text-lg">{performanceSystem.body}</p>
            </div>
            <div className="mt-8">
              <SystemLoop />
            </div>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {performanceSystem.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl border border-white/12 bg-iron p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-pop">
                <span className="font-display text-3xl font-black text-white/15 transition-colors group-hover:text-red-bright">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-black tracking-tight text-bone uppercase">{p.title}</h3>
                <p className="mt-1.5 text-sm font-medium text-bone/60">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
