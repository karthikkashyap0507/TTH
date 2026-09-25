import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { HouseMark } from "@/components/icons";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="dot-grid grid min-h-[80svh] place-items-center px-4 pt-28 pb-20 text-center">
        <div>
          <span className="mx-auto grid size-16 animate-float place-items-center rounded-2xl border-2 border-ink bg-orange text-cream shadow-[5px_5px_0_0_#141414]">
            <HouseMark className="size-9" />
          </span>
          <p className="mt-8 font-display text-sm font-bold tracking-[0.2em] text-orange">ERROR 404</p>
          <h1 className="mt-2 font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.92] font-black tracking-tight uppercase">
            Nobody lives
            <span className="block text-outline">at this address.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base font-medium text-ink/65">
            The page you&apos;re looking for moved out, or never moved in. Let&apos;s get you back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold text-cream shadow-[5px_5px_0_0_#ff4d00] transition-transform hover:-translate-y-0.5"
            >
              TAKE ME HOME
            </Link>
            <Link href="/work" className="rounded-full border-2 border-ink bg-paper px-7 py-3.5 font-display text-sm font-bold transition-colors hover:bg-yellow">
              SEE OUR WORK
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
