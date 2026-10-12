import { processIntro, processSteps } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-white text-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-red">{processIntro.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight uppercase sm:text-6xl">{processIntro.title}</h2>
        </Reveal>

        <ol className="relative mt-12 grid gap-5 md:grid-cols-3">
          {/* dashed connector on desktop */}
          <span
            aria-hidden="true"
            className="absolute top-[3.1rem] right-[16%] left-[16%] hidden border-t-2 border-dashed border-red/35 md:block"
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="relative">
              <div className="group flex h-full gap-5 rounded-3xl border border-ink/10 bg-white p-7 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-pop">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-red font-display text-xl font-black text-white shadow-[0_6px_18px_rgba(227,18,28,0.35)] transition-transform duration-500 group-hover:rotate-[360deg]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-black tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-ink/60">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
