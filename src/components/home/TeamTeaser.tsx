import Link from "next/link";
import { about, igHandle, team } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ArrowUpRight, InstagramIcon, LinkedInIcon } from "@/components/icons";

/** Home: the founder, with their Instagram and a link to the founder's message. */
export function TeamTeaser() {
  return (
    <section className="border-t border-white/10 bg-coal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{about.teamEyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-black tracking-tight text-bone uppercase sm:text-5xl">{about.teamTitle}</h2>
        </Reveal>

        <div className="mt-8 grid gap-4">
          {team.map((m) => (
            <Reveal key={m.name}>
              <article className="flex flex-col gap-5 rounded-3xl border border-white/12 bg-iron p-5 transition-[border-color,box-shadow] duration-300 hover:border-red hover:shadow-pop sm:p-7 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-red font-display text-xl font-black text-white sm:size-16 sm:text-2xl">
                    {m.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl leading-tight font-black tracking-tight text-bone uppercase sm:text-3xl">{m.name}</h3>
                    <p className="mt-1 font-display text-[0.6rem] font-bold tracking-[0.14em] text-bone/50 sm:text-xs">{m.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.instagram && (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 font-display text-xs font-bold text-bone transition-colors hover:border-red hover:bg-red hover:text-white"
                    >
                      <InstagramIcon className="size-4 shrink-0" />
                      <span className="sr-only">Instagram: </span>
                      {igHandle(m.instagram).toUpperCase()}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 font-display text-xs font-bold text-bone transition-colors hover:border-red hover:bg-red hover:text-white"
                    >
                      <LinkedInIcon className="size-4 shrink-0" />
                      LINKEDIN
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  <Link
                    href="/about#founder"
                    className="group inline-flex items-center gap-2 rounded-full bg-red px-4 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-red-bright"
                  >
                    FOUNDER&apos;S MESSAGE
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
