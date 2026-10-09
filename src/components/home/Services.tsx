import { services, servicesIntro } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { cx, toneClass } from "@/lib/tones";
import { ScratchCard } from "./ScratchCard";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-red-bright">{servicesIntro.eyebrow}</p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tight text-bone uppercase sm:text-6xl">{servicesIntro.title}</h2>
          </div>
          <p className="max-w-sm text-sm font-medium text-bone/55 sm:text-base">{servicesIntro.body}</p>
        </div>
      </Reveal>

      <div className="relative -mx-4 mt-9 sm:-mx-6 md:mx-0">
        <ScratchCard className="absolute top-0 right-4 bottom-3 left-4 sm:right-6 sm:left-6 md:inset-0" />

        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:px-6 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {services.map((s) => {
            const featured = s.tone === "red";
            return (
              <div key={s.no} className="w-[82%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <article
                  className={cx(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 sm:p-7",
                    featured ? "border-ink shadow-pop-bone" : "border-white/12 hover:border-red hover:shadow-pop",
                    toneClass[s.tone],
                  )}
                >
                  {/* soft glow behind the icon */}
                  <div
                    aria-hidden="true"
                    className={cx(
                      "pointer-events-none absolute -top-16 -right-16 size-48 rounded-full blur-2xl transition-opacity duration-500",
                      featured ? "bg-white/15" : "bg-red/15 opacity-0 group-hover:opacity-100",
                    )}
                  />
                  <div className="relative flex items-start justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.icon}
                      alt=""
                      width={256}
                      height={256}
                      loading="lazy"
                      className={cx(
                        "size-16 object-contain transition-transform duration-500 group-hover:scale-110 sm:size-[4.5rem]",
                        featured && "brightness-0 invert",
                      )}
                    />
                    <span className={cx("font-display text-3xl font-black", featured ? "text-ink" : "text-white/15")}>{s.no}</span>
                  </div>
                  <h3 className="relative mt-5 font-display text-xl leading-tight font-black tracking-tight sm:text-2xl">{s.title}</h3>
                  <p className={cx("relative mt-1.5 text-sm font-medium sm:text-base", featured ? "text-white/85" : "text-bone/65")}>{s.line}</p>
                  <ul className={cx("relative mt-5 flex flex-col gap-2 border-t pt-4", featured ? "border-white/25" : "border-white/10")}>
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                        <span className={cx("size-1.5 shrink-0 rounded-full", featured ? "bg-ink" : "bg-red")} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
