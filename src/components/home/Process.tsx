import { processIntro, processSteps } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{processIntro.eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-black tracking-tight uppercase sm:text-6xl">{processIntro.title}</h2>
      </Reveal>

      <ol className="relative mt-12 grid gap-5 md:grid-cols-3">
        {/* dashed connector on desktop */}
        <span
          aria-hidden="true"
          className="absolute top-[3.1rem] right-[16%] left-[16%] hidden border-t-2 border-dashed border-ink/25 md:block"
        />
        {processSteps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.1} className="relative">
            <div className="group flex h-full gap-5 rounded-3xl border-2 border-ink bg-paper p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#141414]">
              <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-orange font-display text-xl font-black text-cream transition-transform duration-500 group-hover:rotate-[360deg]">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-black tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed font-medium text-ink/70">{step.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
