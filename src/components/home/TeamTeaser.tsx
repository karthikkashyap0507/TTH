import Link from "next/link";
import { about, team } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, InstagramIcon, LinkedInIcon } from "@/components/icons";

export function TeamTeaser() {
  return (
    <section className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{about.teamEyebrow}</p>
              <h2 className="mt-2 font-display text-4xl font-black tracking-tight uppercase sm:text-5xl">Who&apos;s building it</h2>
            </div>
            <Link
              href="/about#team"
              className="group hidden items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-2.5 font-display text-xs font-bold transition-colors hover:bg-yellow sm:inline-flex"
            >
              MEET THE TEAM
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <article className="flex h-full flex-col justify-between gap-4 rounded-2xl border-2 border-ink bg-cream p-4 shadow-[4px_4px_0_0_#141414] transition-transform duration-300 hover:-translate-y-1 sm:gap-5 sm:rounded-3xl sm:p-6 sm:shadow-[7px_7px_0_0_#141414]">
                <div>
                  <h3 className="font-display text-base leading-tight font-black tracking-tight sm:text-2xl">{m.name}</h3>
                  <p className="mt-1 font-display text-[0.55rem] font-bold tracking-[0.12em] text-ink/50 sm:text-[0.7rem]">{m.role}</p>
                </div>
                <div className="flex gap-2">
                  {m.instagram && (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on Instagram`}
                      className="grid size-8 place-items-center rounded-md border-2 border-ink bg-paper transition-transform hover:-translate-y-0.5 sm:size-9"
                    >
                      <InstagramIcon className="size-4" />
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid size-8 place-items-center rounded-md border-2 border-ink bg-paper transition-transform hover:-translate-y-0.5 sm:size-9"
                    >
                      <LinkedInIcon className="size-4" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Link
          href="/about#team"
          className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-3 font-display text-xs font-bold transition-colors hover:bg-yellow sm:hidden"
        >
          MEET THE TEAM
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
