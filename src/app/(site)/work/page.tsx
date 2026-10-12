import type { Metadata } from "next";
import { projects } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { WorkGrid } from "@/components/work/WorkGrid";
import { GetWebsiteCTA } from "@/components/GetWebsiteCTA";
import { Clients } from "@/components/Clients";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Websites, online stores, brand identities and AI automations built by The Scale House.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="dot-grid relative overflow-hidden border-b border-white/10 pt-28 pb-8 sm:pt-36 sm:pb-12">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.22),transparent_62%)] blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="font-display text-xs font-bold tracking-[0.2em] text-red-bright sm:text-sm">OUR WORK</p>
            <h1 className="mt-2 font-display text-4xl leading-[0.95] font-black tracking-tight text-bone uppercase sm:text-6xl">
              Don&apos;t take our word. <span className="text-outline">Click around.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium text-bone/55 sm:text-base">
              Every card is a business we&apos;ve built for. Open the live sites and judge the work yourself.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-bone text-ink">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <WorkGrid projects={projects} />
          </div>
        </div>
      </section>

      <Clients />

      <section className="dot-grid py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <GetWebsiteCTA eyebrow="LIKED WHAT YOU SAW?" source="work-page" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
