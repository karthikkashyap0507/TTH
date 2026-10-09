import type { Metadata } from "next";
import { about, team } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { ContactCTA } from "@/components/ContactCTA";
import { ArrowUpRight, InstagramIcon, LinkedInIcon, ScaleMark, Spark } from "@/components/icons";
import { cx, toneClass } from "@/lib/tones";

export const metadata: Metadata = {
  title: "About",
  description: about.body,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="dot-grid relative overflow-hidden px-4 pt-32 pb-14 sm:px-6 sm:pt-40 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 right-[-12%] size-[46rem] animate-glow rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.26),transparent_62%)] blur-2xl" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{about.eyebrow}</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.92] font-black tracking-tight uppercase">
              {about.titleTop}
              <span className="block text-red-bright">{about.titleBottom}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed font-medium text-bone/75 sm:text-lg">{about.body}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed font-medium text-bone/60">{about.bodyMore}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {about.pills.map((p, i) => (
                <span
                  key={p}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 font-display text-xs font-black tracking-wide",
                    i === 0 ? "border-red bg-red text-white" : i === 1 ? "border-bone bg-bone text-ink" : "border-white/25 text-bone",
                  )}
                >
                  <Spark className={cx("size-3", i === 0 ? "text-white" : "text-red-bright")} />
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />
      <Stats />

      <section id="founder" className="scroll-mt-20 border-b border-white/10 bg-coal">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{about.founderEyebrow}</p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tight text-bone uppercase sm:text-5xl">{about.founderTitle}</h2>
          </Reveal>
          <Reveal>
            <figure className="relative mt-10 rounded-3xl border border-white/12 bg-iron p-6 pt-12 shadow-pop sm:p-10 sm:pt-14">
              <span aria-hidden="true" className="absolute -top-7 left-6 font-display text-[6.5rem] leading-none font-black text-red sm:left-10">“</span>
              <blockquote className="space-y-4 text-base leading-[1.8] font-medium text-bone/80 sm:text-lg">
                {about.founderMessage.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                <ScaleMark className="size-9" />
                <span className="font-display text-xs font-black tracking-[0.18em] text-bone">{about.founderSignature}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{about.teamEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-black tracking-tight uppercase sm:text-5xl">{about.teamTitle}</h2>
          <p className="mt-3 max-w-md text-sm font-medium text-bone/55 sm:text-base">{about.teamBody}</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-iron text-bone shadow-pop transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-pop-lg">
                <div className={cx("relative aspect-[4/5] w-full overflow-hidden border-b border-white/10", toneClass[m.tone])}>
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-70 dot-grid-ink" />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="font-display text-8xl font-black tracking-tighter opacity-30 transition-transform duration-700 group-hover:scale-110 sm:text-9xl">
                          {m.initials}
                        </span>
                      </div>
                    </>
                  )}
                  <span className="absolute bottom-3 left-3 -rotate-2 rounded-full bg-ink px-3 py-1 font-display text-[0.6rem] font-black tracking-wide text-bone ring-1 ring-white/20">
                    {m.role}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-black tracking-tight sm:text-[1.7rem]">{m.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.instagram && <SocialPill href={m.instagram} label="INSTAGRAM" Icon={InstagramIcon} />}
                    {m.linkedin && <SocialPill href={m.linkedin} label="LINKEDIN" Icon={LinkedInIcon} />}
                  </div>
                  <p className="mt-5 font-display text-[0.65rem] font-bold tracking-[0.2em] text-red-bright">{about.factsLabel}</p>
                  <ul className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                    {m.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-display text-xs leading-relaxed font-bold tracking-wide">
                        <Spark className="mt-0.5 size-3 shrink-0 text-red-bright" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

function SocialPill({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/pill inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-display text-[0.65rem] font-black tracking-wide text-bone transition-colors hover:border-red hover:bg-red hover:text-white"
    >
      <Icon className="size-4 shrink-0" />
      {label}
      <ArrowUpRight className="size-3 transition-transform group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5" />
    </a>
  );
}
