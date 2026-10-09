import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { ScaleMark } from "@/components/icons";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="dot-grid relative grid min-h-[80svh] place-items-center overflow-hidden px-4 pt-28 pb-20 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.22),transparent_62%)] blur-2xl"
        />
        <div className="relative">
          <span className="mx-auto grid size-20 animate-float place-items-center rounded-2xl border border-white/15 bg-ink shadow-pop">
            <ScaleMark className="size-12" />
          </span>
          <p className="mt-8 font-display text-sm font-bold tracking-[0.2em] text-red-bright">ERROR 404</p>
          <h1 className="mt-2 font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.92] font-black tracking-tight text-bone uppercase">
            Nobody lives
            <span className="block text-outline">at this address.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base font-medium text-bone/60">
            The page you&apos;re looking for moved out, or never moved in. Let&apos;s get you back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-red px-7 py-3.5 font-display text-sm font-bold text-white shadow-pop-deep transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-red-bright"
            >
              TAKE ME HOME
            </Link>
            <Link
              href="/work"
              className="rounded-full border-2 border-white/25 px-7 py-3.5 font-display text-sm font-bold text-bone transition-colors hover:border-white/60 hover:bg-white/5"
            >
              SEE OUR WORK
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
