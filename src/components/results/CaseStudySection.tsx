import type { CaseStudy } from "@/content/results";
import { Reveal } from "@/components/Reveal";
import { Spark } from "@/components/icons";
import { cx } from "@/lib/tones";
import { ZoomImage } from "./ZoomImage";

function Block({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 font-display text-xs font-black tracking-[0.2em] text-red-bright">
        <Spark className="size-3" />
        {title}
      </h3>
      <div className="mt-3 space-y-3">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 32)} className="text-[15px] leading-[1.75] font-medium text-bone/75 sm:text-base">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

/** One full case study: story on the left, numbers + Ads Manager proof on the right. */
export function CaseStudySection({ study: c, index }: { study: CaseStudy; index: number }) {
  return (
    <section id={`case-${c.id}`} className={cx("scroll-mt-20 border-t border-white/10", index % 2 ? "bg-coal" : "bg-ink")}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-black tracking-[0.2em] text-bone/45">
                CASE STUDY <span className="text-red-bright">{c.id}</span> · {c.label}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[1.02] font-black tracking-tight text-bone uppercase sm:text-5xl">{c.title}</h2>
            </div>
            <div className="rounded-2xl border border-ink bg-red px-5 py-4 text-white shadow-pop-bone">
              <p className="font-display text-[0.6rem] font-black tracking-[0.18em] text-ink">{c.metric}</p>
              <p className="mt-1 flex items-baseline gap-2 font-display font-black tracking-tight">
                <span className="text-2xl text-white/70 line-through decoration-ink/60 decoration-2">{c.from}</span>
                <span className="text-xl text-ink">→</span>
                <span className="text-4xl sm:text-5xl">{c.to}</span>
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Reveal>
            <div className="space-y-8">
              <Block title="THE PROBLEM" paragraphs={c.problem} />
              {c.quote && (
                <blockquote className="border-l-4 border-red pl-4 font-display text-lg leading-snug font-black tracking-tight text-bone sm:text-2xl">
                  “{c.quote}”
                </blockquote>
              )}
              <Block title={index === 0 ? "THEN WE TOOK OVER" : "OUR APPROACH"} paragraphs={c.approach} />
              {c.focus && (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {c.focus.map((f) => (
                    <li key={f.title} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <p className="font-display text-xs font-black tracking-[0.12em] text-bone uppercase">{f.title}</p>
                      <p className="mt-0.5 text-sm font-medium text-bone/55">{f.body}</p>
                    </li>
                  ))}
                </ul>
              )}
              <Block title="THE RESULT" paragraphs={c.result} />
              {c.shift && (
                <div className="overflow-hidden rounded-2xl border border-white/12">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-bone/55">
                    <span className="font-display text-[0.65rem] font-black tracking-[0.16em] text-bone/40">BEFORE</span>
                    <span className="line-through decoration-red/60">{c.shift.before}</span>
                  </p>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-red/10 px-4 py-3 text-sm font-bold text-bone">
                    <span className="font-display text-[0.65rem] font-black tracking-[0.16em] text-red-bright">AFTER</span>
                    {c.shift.after}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5">
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {c.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={cx(
                      "rounded-2xl border p-4",
                      i === 0 ? "col-span-2 border-red bg-red/10 sm:col-span-1" : "border-white/12 bg-iron",
                    )}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd className={cx("font-display text-2xl font-black tracking-tight sm:text-[1.7rem]", i === 0 ? "text-red-bright" : "text-bone")}>
                      {s.value}
                    </dd>
                    <dd className="mt-1 font-display text-[0.58rem] leading-tight font-black tracking-[0.14em] text-bone/45">{s.label}</dd>
                  </div>
                ))}
              </dl>
              {c.screenshots.map((img) => (
                <ZoomImage key={img.src} image={img} />
              ))}
              <p className="text-xs font-medium text-bone/40">Screenshots from Meta Ads Manager · client names blurred · click to zoom.</p>
            </div>
          </Reveal>
        </div>

        {c.comparison && (
          <Reveal>
            <div className="mx-auto mt-12 max-w-4xl">
              <p className="mb-3 text-center font-display text-xs font-black tracking-[0.2em] text-bone/45">BEFORE VS AFTER</p>
              <ZoomImage image={c.comparison} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
