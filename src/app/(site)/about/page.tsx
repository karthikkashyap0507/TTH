import type { Metadata } from "next";
import Link from "next/link";
import { about, team } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { ContactCTA } from "@/components/ContactCTA";
import { ArrowRight, ArrowUpRight, InstagramIcon, LinkedInIcon, Spark } from "@/components/icons";
import { cx, toneClass } from "@/lib/tones";

export const metadata: Metadata = {
  title: "About",
  description: about.body,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="dot-grid px-4 pt-32 pb-14 sm:px-6 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{about.eyebrow}</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.92] font-black tracking-tight uppercase">
              {about.titleTop}
              <span className="block text-orange">{about.titleBottom}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed font-medium sm:text-lg">{about.body}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {about.pills.map((p, i) => (
                <span
                  key={p}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-display text-xs font-black tracking-wide",
                    i === 0 ? "bg-yellow" : i === 1 ? "bg-paper" : "bg-ink text-cream",
                  )}
                >
                  <Spark className={cx("size-3", i === 2 ? "text-yellow" : "text-orange")} />
                  {p}
                </span>
              ))}
            </div>
            <Link
              href="/careers"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-xs font-bold text-cream transition-colors hover:bg-orange"
            >
              JOIN THE TEAM
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Marquee />
      <Stats />

      <section id="team" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{about.teamEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-black tracking-tight uppercase sm:text-5xl">{about.teamTitle}</h2>
          <p className="mt-3 max-w-md text-sm font-medium text-ink/60 sm:text-base">{about.teamBody}</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-[7px_7px_0_0_#141414] transition-transform duration-300 hover:-translate-y-1">
                <div className={cx("relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink", toneClass[m.tone])}>
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
                      <div className="absolute inset-0 opacity-30 dot-grid" />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="font-display text-8xl font-black tracking-tighter opacity-30 transition-transform duration-700 group-hover:scale-110 sm:text-9xl">
                          {m.initials}
                        </span>
                      </div>
                    </>
                  )}
                  <span className="absolute bottom-3 left-3 -rotate-2 rounded-full border-2 border-ink bg-cream px-3 py-1 font-display text-[0.6rem] font-black tracking-wide text-ink">
                    {m.role}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-black tracking-tight sm:text-[1.7rem]">{m.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.instagram && <SocialPill href={m.instagram} label="INSTAGRAM" Icon={InstagramIcon} />}
                    {m.linkedin && <SocialPill href={m.linkedin} label="LINKEDIN" Icon={LinkedInIcon} />}
                  </div>
                  <p className="mt-5 font-display text-[0.65rem] font-bold tracking-[0.2em] text-orange">{about.factsLabel}</p>
                  <ul className="mt-2 flex flex-col gap-2 border-t-2 border-ink/10 pt-3">
                    {m.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-display text-xs leading-relaxed font-bold tracking-wide">
                        <Spark className="mt-0.5 size-3 shrink-0 text-orange" />
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
      className="group/pill inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-3 py-1.5 font-display text-[0.65rem] font-black tracking-wide transition-colors hover:bg-yellow"
    >
      <Icon className="size-4 shrink-0" />
      {label}
      <ArrowUpRight className="size-3 transition-transform group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5" />
    </a>
  );
}
