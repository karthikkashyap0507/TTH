import type { Metadata } from "next";
import { caseStudies, resultsIntro } from "@/content/results";
import { Reveal } from "@/components/Reveal";
import { PerformanceSystem } from "@/components/results/PerformanceSystem";
import { CaseStudySection } from "@/components/results/CaseStudySection";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Results & Case Studies",
  description:
    "Four D2C fashion brands, straight from Meta Ads Manager: 0.3X → 5.71X ROAS, 2.08X → 6.45X, 1.84X → 5.40X in 40 days, and a ₹3L dead account scaled to ₹13.64L+.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <section className="dot-grid relative overflow-hidden border-b border-white/10 pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 right-[-12%] size-[48rem] animate-glow rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.28),transparent_62%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">RESULTS</p>
            <h1 className="mt-3 font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.92] font-black tracking-tight text-bone uppercase">
              {resultsIntro.pageTitleTop} <span className="block text-outline">{resultsIntro.pageTitleBottom}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed font-medium text-bone/65 sm:text-lg">{resultsIntro.pageBody}</p>
          </Reveal>

          <Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {resultsIntro.summary.map((s, i) => (
                <div key={s.label} className={i === 0 ? "rounded-2xl border border-ink bg-red p-5 text-white shadow-pop-bone" : "rounded-2xl border border-white/12 bg-iron p-5"}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-black tracking-tight sm:text-4xl">{s.value}</dd>
                  <dd className={i === 0 ? "mt-1 font-display text-[0.6rem] font-black tracking-[0.16em] text-ink" : "mt-1 font-display text-[0.6rem] font-black tracking-[0.16em] text-bone/45"}>
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <nav aria-label="Case studies" className="mt-8 flex flex-wrap gap-2">
              {caseStudies.map((c) => (
                <a
                  key={c.id}
                  href={`#case-${c.id}`}
                  className="rounded-full border border-white/15 px-4 py-2 font-display text-[0.65rem] font-black tracking-[0.12em] text-bone/80 transition-colors hover:border-red hover:bg-red hover:text-white"
                >
                  CASE {c.id} · {c.from} → {c.to}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <PerformanceSystem />

      {caseStudies.map((c, i) => (
        <CaseStudySection key={c.id} study={c} index={i} />
      ))}

      <ContactCTA />
    </>
  );
}
