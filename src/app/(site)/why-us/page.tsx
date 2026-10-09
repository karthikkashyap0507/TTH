import type { Metadata } from "next";
import Link from "next/link";
import { whyUs, whyUsHero, whyUsReasons, whyUsSections, type ArticleBlock } from "@/content/why-us";
import { Reveal } from "@/components/Reveal";
import { GetWebsiteCTA } from "@/components/GetWebsiteCTA";
import { ArticleFigure } from "@/components/why-us/Figures";
import { Spark } from "@/components/icons";

export const metadata: Metadata = {
  title: "Why Us",
  description: whyUsHero.body,
  alternates: { canonical: "/why-us" },
};

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[15px] leading-[1.7] font-medium text-bone/75 sm:text-base">{block.text}</p>;
    case "callout":
      return (
        <p className="rounded-r-xl border-l-4 border-red bg-white/[0.04] py-3.5 pr-4 pl-4 text-[15px] leading-relaxed font-bold text-bone sm:text-base">
          {block.text}
        </p>
      );
    case "punch":
      return (
        <p className="rounded-xl bg-red px-4 py-3.5 font-display text-[15px] leading-snug font-black tracking-tight text-white shadow-[4px_4px_0_0_rgba(255,255,255,0.14)] sm:text-lg">
          {block.text}
        </p>
      );
    case "figure":
      return (
        <figure className="m-0">
          <div className="overflow-hidden rounded-xl border border-white/12">
            {block.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={block.image} alt={block.alt ?? block.caption} className="w-full object-cover object-top" loading="lazy" />
            ) : (
              <ArticleFigure kind={block.kind} />
            )}
          </div>
          <figcaption className="mt-2.5 text-xs leading-relaxed font-medium text-bone/45">{block.caption}</figcaption>
        </figure>
      );
  }
}

export default function WhyUsPage() {
  return (
    <>
      <section className="dot-grid relative overflow-hidden border-b border-white/10 pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 right-[-12%] size-[46rem] animate-glow rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.26),transparent_62%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{whyUsHero.eyebrow}</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,7.5vw,6rem)] leading-[0.94] font-black tracking-tight text-bone uppercase">
              {whyUsHero.titleTop}
              <span className="block text-red-bright">{whyUsHero.titleBottom}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed font-medium text-bone/65 sm:text-lg">{whyUsHero.body}</p>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsReasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 0.06}>
                <div className="group h-full rounded-2xl border border-white/12 bg-iron p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-pop">
                  <div className="flex items-center justify-between">
                    <Spark className="size-5 text-red-bright transition-transform duration-500 group-hover:rotate-90" />
                    <span className="font-display text-2xl font-black text-white/15">0{i + 1}</span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-black tracking-tight text-bone uppercase">{r.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed font-medium text-bone/60">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="dot-grid">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <div className="rounded-3xl border border-white/12 bg-iron p-6 shadow-pop sm:p-10">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-red-bright sm:text-sm">{whyUs.eyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,4.5vw,2.6rem)] leading-[1.05] font-black tracking-tight uppercase">
                {whyUs.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed font-medium text-bone/70 sm:text-lg">{whyUs.intro}</p>
              <p className="mt-5 font-display text-[0.6rem] font-black tracking-[0.18em] text-bone/40">{whyUs.meta}</p>

              {whyUsSections.map((section, i) => (
                <section key={section.title} className="mt-12 border-t border-white/10 pt-10">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-red font-display text-xs font-black text-white">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg leading-tight font-black tracking-tight uppercase sm:text-[1.35rem]">
                      {section.title}
                    </h3>
                  </div>
                  <div className="mt-5 space-y-4">
                    {section.blocks.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-14 max-w-3xl">
              <GetWebsiteCTA eyebrow={whyUs.closingEyebrow} source="why-us" />
              <div className="mt-5 flex flex-wrap justify-center gap-3 text-center">
                <Link
                  href="/results"
                  className="inline-block rounded-full border-2 border-white/20 px-6 py-3 font-display text-xs font-bold tracking-wide text-bone transition-colors hover:border-red hover:bg-red hover:text-white"
                >
                  SEE RESULTS
                </Link>
                <Link
                  href="/work"
                  className="inline-block rounded-full border-2 border-white/20 px-6 py-3 font-display text-xs font-bold tracking-wide text-bone transition-colors hover:border-red hover:bg-red hover:text-white"
                >
                  SEE OUR WORK
                </Link>
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </>
  );
}
