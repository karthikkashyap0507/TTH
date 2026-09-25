import Link from "next/link";
import { cta } from "@/content/site";
import { Reveal } from "./Reveal";
import { HouseMark } from "./icons";
import { StartProjectButton } from "./wizard/StartProjectButton";

/** Dark closing section that appears at the bottom of most pages. */
export function ContactCTA() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t-2 border-ink bg-ink text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#faf3e5 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <Reveal>
          <span className="mx-auto grid size-14 animate-float place-items-center rounded-2xl bg-orange text-cream">
            <HouseMark className="size-8" />
          </span>
          <h2 className="mt-7 font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] font-black tracking-tight uppercase">
            {cta.contactTitleTop}
            <span className="block text-orange">{cta.contactTitleBottom}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-medium text-cream/70 sm:text-lg">{cta.contactBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <StartProjectButton
              source="contact"
              className="rounded-full bg-orange px-8 py-4 font-display text-sm font-bold text-cream shadow-[5px_5px_0_0_#ffc72e] transition-transform hover:-translate-y-0.5 sm:text-base"
            />
            <Link
              href="/work"
              className="rounded-full border-2 border-cream px-8 py-4 font-display text-sm font-bold transition-colors hover:bg-cream hover:text-ink sm:text-base"
            >
              SEE OUR WORK
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
