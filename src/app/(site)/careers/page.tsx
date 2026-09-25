import type { Metadata } from "next";
import Link from "next/link";
import { careersIntro, hiringSteps, roles } from "@/content/careers";
import { Reveal } from "@/components/Reveal";
import { Plus } from "@/components/icons";
import { cx } from "@/lib/tones";

export const metadata: Metadata = {
  title: "Careers",
  description: `${roles.length} open roles at The Tech House — fully remote across India.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <section className="dot-grid border-b-2 border-ink pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{careersIntro.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.92] font-black tracking-tight uppercase sm:text-7xl">
              {careersIntro.titleTop}
              <br />
              <span className="text-outline">{careersIntro.titleBottom}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed font-medium text-ink/65 sm:text-lg">
              <span className="font-black text-ink">{roles.length} open roles</span>, all of them{" "}
              <span className="font-black text-ink">{careersIntro.remoteNote}</span>. {careersIntro.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#roles"
                className="rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold text-cream shadow-[5px_5px_0_0_#ff4d00] transition-transform hover:-translate-y-0.5"
              >
                SEE OPEN ROLES
              </a>
              <Link
                href="/status"
                className="rounded-full border-2 border-ink bg-cream px-7 py-3.5 font-display text-sm font-bold transition-colors hover:bg-yellow"
              >
                CHECK APPLICATION STATUS
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="roles" className="scroll-mt-20 bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {roles.map((r, i) => {
              const dark = r.featured;
              return (
                <Reveal key={r.slug} delay={(i % 2) * 0.08}>
                  <Link
                    href={`/careers/${r.slug}`}
                    className={cx(
                      "group flex h-full flex-col rounded-3xl border-2 border-ink p-6 shadow-[5px_5px_0_0_#141414] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#141414] sm:p-8",
                      dark ? "bg-ink text-cream" : "bg-paper",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border-2 border-ink bg-yellow px-3 py-1 font-display text-[0.6rem] font-black tracking-wide text-ink">
                          {r.tag}
                        </span>
                        {r.featured && (
                          <span className="rounded-full border-2 border-cream/30 bg-orange px-3 py-1 font-display text-[0.6rem] font-black tracking-wide text-cream">
                            ★ HIRING FAST
                          </span>
                        )}
                      </div>
                      <Plus className={cx("size-5 transition-transform duration-500 group-hover:rotate-90", dark ? "text-yellow" : "text-orange")} />
                    </div>
                    <h2 className="mt-5 font-display text-3xl leading-tight font-black tracking-tight uppercase sm:text-4xl">{r.title}</h2>
                    <p className={cx("mt-1 font-display text-xs font-bold tracking-wide", dark ? "text-yellow" : "text-orange")}>{r.comp}</p>
                    <p className={cx("mt-3 flex-1 text-sm leading-relaxed font-medium sm:text-base", dark ? "text-cream/80" : "text-ink/65")}>
                      {r.summary}
                    </p>
                    <div className={cx("mt-6 flex flex-wrap items-center gap-2 border-t-2 pt-4", dark ? "border-cream/20" : "border-ink/10")}>
                      <span className={cx("text-xs font-bold", dark ? "text-cream/70" : "text-ink/50")}>
                        {r.location} · {r.type}
                      </span>
                      <span className={cx("ml-auto font-display text-[0.7rem] font-black tracking-wide", dark ? "text-yellow" : "text-orange")}>
                        APPLY <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-14">
              <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">HOW HIRING WORKS</p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {hiringSteps.map((s, i) => (
                  <li key={s.title} className="rounded-2xl border-2 border-ink bg-paper p-5">
                    <span className="font-display text-3xl font-black text-orange">0{i + 1}</span>
                    <p className="mt-2 font-display text-base font-black tracking-tight">{s.title}</p>
                    <p className="mt-1 text-sm font-medium text-ink/60">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 rounded-3xl border-2 border-ink bg-ink p-7 text-cream sm:p-10">
              <h2 className="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">{careersIntro.beforeTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed font-medium text-cream/70 sm:text-base">{careersIntro.beforeBody}</p>
              <Link
                href="/status"
                className="mt-6 inline-flex rounded-full border-2 border-cream px-6 py-3 font-display text-xs font-bold tracking-wide transition-colors hover:bg-cream hover:text-ink"
              >
                ALREADY APPLIED? CHECK YOUR STATUS →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
