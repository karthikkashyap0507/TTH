import type { Metadata } from "next";
import Link from "next/link";
import { whyUs, whyUsSections, type ArticleBlock } from "@/content/why-us";
import { Reveal } from "@/components/Reveal";
import { GetWebsiteCTA } from "@/components/GetWebsiteCTA";
import { ArticleFigure } from "@/components/why-us/Figures";

export const metadata: Metadata = {
  title: "Why Us",
  description: whyUs.intro,
  alternates: { canonical: "/why-us" },
};

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[15px] leading-[1.7] font-medium text-ink/75 sm:text-base">{block.text}</p>;
    case "callout":
      return (
        <p className="rounded-r-xl border-l-4 border-orange bg-cream py-3.5 pr-4 pl-4 text-[15px] leading-relaxed font-bold sm:text-base">
          {block.text}
        </p>
      );
    case "punch":
      return (
        <p className="rounded-xl border-2 border-ink bg-yellow px-4 py-3.5 font-display text-[15px] leading-snug font-black tracking-tight shadow-[4px_4px_0_0_#141414] sm:text-lg">
          {block.text}
        </p>
      );
    case "figure":
      return (
        <figure className="m-0">
          <div className="overflow-hidden rounded-xl border-2 border-ink">
            {block.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={block.image} alt={block.alt ?? block.caption} className="w-full object-cover object-top" loading="lazy" />
            ) : (
              <ArticleFigure kind={block.kind} />
            )}
          </div>
          <figcaption className="mt-2.5 text-xs leading-relaxed font-medium text-ink/50">{block.caption}</figcaption>
        </figure>
      );
  }
}

export default function WhyUsPage() {
  return (
    <div className="dot-grid">
      <article className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
        <Reveal>
          <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_0_#141414] sm:p-10">
            <p className="font-display text-xs font-bold tracking-[0.2em] text-orange sm:text-sm">{whyUs.eyebrow}</p>
            <h1 className="mt-3 font-display text-[clamp(1.7rem,4.5vw,2.6rem)] leading-[1.05] font-black tracking-tight uppercase">
              {whyUs.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed font-medium text-ink/70 sm:text-lg">{whyUs.intro}</p>
            <p className="mt-5 font-display text-[0.6rem] font-black tracking-[0.18em] text-ink/40">{whyUs.meta}</p>

            {whyUsSections.map((section, i) => (
              <section key={section.title} className="mt-12 border-t border-ink/10 pt-10">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink font-display text-xs font-black text-cream">
                    {i + 1}
                  </span>
                  <h2 className="font-display text-lg leading-tight font-black tracking-tight uppercase sm:text-[1.35rem]">
                    {section.title}
                  </h2>
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
            <div className="mt-5 text-center">
              <Link
                href="/work"
                className="inline-block rounded-full border-2 border-ink bg-cream px-6 py-3 font-display text-xs font-bold tracking-wide transition-colors hover:bg-yellow"
              >
                SEE OUR WORK
              </Link>
            </div>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
