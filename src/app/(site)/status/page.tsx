import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { StatusLookup } from "@/components/careers/StatusLookup";

export const metadata: Metadata = {
  title: "Application Status",
  description: "Check the status of your job application at The Tech House.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/status" },
};

export default async function StatusPage({ searchParams }: { searchParams: Promise<{ id?: string | string[] }> }) {
  const { id } = await searchParams;
  const initialId = (Array.isArray(id) ? id[0] : id)?.slice(0, 20).toUpperCase() ?? "";

  return (
    <section className="dot-grid min-h-[80svh] pt-28 pb-20 sm:pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">CAREERS</p>
          <h1 className="mt-2 font-display text-4xl leading-[0.95] font-black tracking-tight uppercase sm:text-6xl">
            Application <span className="text-outline">status</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm font-medium text-ink/60 sm:text-base">
            Pop in your application ID and the email you applied with. No login, no waiting on hold.
          </p>
        </Reveal>
        <div className="mt-9">
          <StatusLookup initialId={initialId} />
        </div>
        <p className="mt-8 text-center text-sm font-medium text-ink/55">
          Haven&apos;t applied yet?{" "}
          <Link href="/careers#roles" className="font-bold text-orange underline-offset-4 hover:underline">
            See open roles →
          </Link>
        </p>
      </div>
    </section>
  );
}
