import Link from "next/link";
import { projects } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import { ProjectCover } from "@/components/work/ProjectVisuals";

export function WorkPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const list = featured.length ? featured : projects.slice(0, 4);

  return (
    <section id="work" className="scroll-mt-20 border-b border-ink/10 bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-red">FRESH FROM THE HOUSE</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight uppercase sm:text-6xl">Work we&apos;re proud of.</h2>
            </div>
            <p className="max-w-xs text-sm font-medium text-ink/60">Brands we&apos;ve designed, built and automated. Tap a card to see it live.</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:gap-6">
          {list.map((p, i) => {
            const external = !!p.url;
            return (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={p.url || "/work"}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group block overflow-hidden rounded-xl border border-ink/10 bg-white shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-pop-lg sm:rounded-3xl"
                >
                  <div className="relative">
                    <ProjectCover project={p} className="aspect-[16/9]" />
                    <span className="absolute top-2 right-2 rounded-full bg-ink/85 px-2 py-0.5 font-display text-[0.5rem] font-bold tracking-[0.1em] text-white backdrop-blur sm:top-4 sm:right-4 sm:px-3 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.14em]">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-ink/10 px-3 py-3 sm:px-6 sm:py-5">
                    <h3 className="truncate font-display text-sm font-black tracking-tight uppercase sm:text-xl lg:text-2xl">{p.name}</h3>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors group-hover:border-red group-hover:bg-red group-hover:text-white sm:size-10">
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xs font-black tracking-[0.14em] text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-red"
            >
              SEE ALL {projects.length} PROJECTS
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
