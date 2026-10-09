import Link from "next/link";
import { caseStudies, performanceSystem, resultsIntro } from "@/content/results";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, ScaleMark } from "@/components/icons";
import { SystemLoop } from "@/components/results/PerformanceSystem";

/** Home: headline numbers from the four case studies, linking to /results. */
export function ResultsTeaser() {
  return (
    <section id="results" className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-coal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-10%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.2),transparent_62%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{resultsIntro.eyebrow}</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight text-bone uppercase sm:text-6xl">
                {resultsIntro.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm font-medium text-bone/55 sm:text-base">{resultsIntro.body}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/12 bg-ink/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="flex items-center gap-3 font-display text-xs font-black tracking-[0.16em] text-bone sm:text-sm">
              <ScaleMark className="size-7 shrink-0" />
              {performanceSystem.name.toUpperCase()}
            </p>
            <SystemLoop compact />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.07}>
              <Link
                href={`/results#case-${c.id}`}
                className="group flex h-full flex-col rounded-2xl border border-white/12 bg-iron p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-pop"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[0.65rem] font-black tracking-[0.18em] text-bone/45">CASE {c.id}</span>
                  <span className="grid size-8 place-items-center rounded-full border border-white/20 text-bone transition-colors group-hover:border-red group-hover:bg-red group-hover:text-white">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <p className="mt-6 font-display text-xl font-black tracking-tight text-bone/35 line-through decoration-red/70 decoration-2">
                  {c.from}
                </p>
                <p className="font-display text-5xl leading-none font-black tracking-tight text-red-bright">{c.to}</p>
                <p className="mt-2 font-display text-[0.65rem] font-black tracking-[0.16em] text-bone">{c.metric}</p>
                <p className="mt-4 text-sm font-medium text-bone/60">{c.summary}</p>
                <span className="mt-auto pt-5 font-display text-[0.65rem] font-black tracking-[0.14em] text-red-bright">
                  READ THE CASE STUDY <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/results"
              className="group inline-flex items-center gap-2 rounded-full bg-red px-7 py-3.5 font-display text-xs font-black tracking-[0.14em] text-white shadow-pop-deep transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-red-bright sm:text-sm"
            >
              SEE THE FULL CASE STUDIES
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
