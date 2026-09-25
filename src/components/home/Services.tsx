import { services, servicesIntro } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Spark } from "@/components/icons";
import { cx, toneClass } from "@/lib/tones";
import { ScratchCard } from "./ScratchCard";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{servicesIntro.eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl font-black tracking-tight uppercase sm:text-6xl">{servicesIntro.title}</h2>
      </Reveal>

      <div className="relative -mx-4 mt-9 sm:-mx-6 md:mx-0">
        <ScratchCard className="absolute top-0 right-4 bottom-3 left-4 sm:right-6 sm:left-6 md:inset-0" />

        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:px-6 md:grid md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {services.map((s) => (
            <div key={s.no} className="w-[80%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <article
                className={cx(
                  "flex h-full flex-col rounded-2xl border-2 border-ink p-5 shadow-[5px_5px_0_0_#141414] transition-transform duration-300 hover:-translate-y-1 sm:p-7",
                  toneClass[s.tone],
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-black text-orange">{s.no}</span>
                  <Spark className={cx("size-6", s.tone === "ink" ? "text-yellow" : "text-ink")} />
                </div>
                <h3 className="mt-4 font-display text-xl font-black tracking-tight sm:text-2xl">{s.title}</h3>
                <p className="mt-1 text-sm font-medium opacity-80 sm:text-base">{s.line}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t-2 border-current/20 pt-4">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                      <span className="size-1.5 shrink-0 rounded-full bg-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
