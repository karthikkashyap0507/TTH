import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { careersIntro, getRole, hiringSteps, perks, roles } from "@/content/careers";
import { Reveal } from "@/components/Reveal";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { ArrowLeft, Spark } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return {};
  return {
    title: `${role.title} — Careers`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
  };
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const lists = [
    { title: "What you'll do", items: role.responsibilities },
    { title: "You'll fit right in if", items: role.requirements },
    { title: "Bonus points", items: role.bonus },
  ];

  return (
    <>
      <section className="dot-grid border-b-2 border-ink pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <Link
              href="/careers#roles"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-4 py-2 font-display text-[0.65rem] font-black tracking-[0.12em] transition-colors hover:bg-yellow"
            >
              <ArrowLeft className="size-3.5" /> ALL ROLES
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border-2 border-ink bg-yellow px-3 py-1 font-display text-[0.6rem] font-black tracking-wide">{role.tag}</span>
              {role.featured && (
                <span className="rounded-full border-2 border-ink bg-orange px-3 py-1 font-display text-[0.6rem] font-black tracking-wide text-cream">
                  ★ HIRING FAST
                </span>
              )}
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.92] font-black tracking-tight uppercase">{role.title}</h1>
            <p className="mt-3 font-display text-sm font-bold tracking-wide text-orange sm:text-base">{role.comp}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed font-medium text-ink/70 sm:text-lg">{role.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[role.location, role.type, `Experience: ${role.experience}`].map((m) => (
                <span key={m} className="rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 text-xs font-bold">
                  {m}
                </span>
              ))}
            </div>
            <a
              href="#apply"
              className="mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold text-cream shadow-[5px_5px_0_0_#ff4d00] transition-transform hover:-translate-y-0.5"
            >
              APPLY NOW
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border-2 border-ink bg-paper p-6 sm:p-8">
                <h2 className="font-display text-xl font-black tracking-tight uppercase sm:text-2xl">About the role</h2>
                <p className="mt-3 text-[15px] leading-[1.7] font-medium text-ink/75 sm:text-base">{role.about}</p>
              </div>
            </Reveal>
            {lists.map((l) => (
              <Reveal key={l.title}>
                <div className="rounded-3xl border-2 border-ink bg-paper p-6 sm:p-8">
                  <h2 className="font-display text-xl font-black tracking-tight uppercase sm:text-2xl">{l.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {l.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed font-medium text-ink/80 sm:text-base">
                        <Spark className="mt-1.5 size-3.5 shrink-0 text-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="rounded-3xl border-2 border-ink bg-ink p-6 text-cream shadow-[6px_6px_0_0_#ff4d00]">
                <p className="font-display text-[0.65rem] font-black tracking-[0.18em] text-yellow">HOW HIRING WORKS</p>
                <ol className="mt-4 space-y-4">
                  {hiringSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-orange font-display text-xs font-black">{i + 1}</span>
                      <div>
                        <p className="font-display text-sm font-black tracking-tight">{s.title}</p>
                        <p className="text-xs font-medium text-cream/65">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-t border-cream/15 pt-5 font-display text-[0.65rem] font-black tracking-[0.18em] text-yellow">PERKS</p>
                <ul className="mt-3 space-y-2">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm font-medium text-cream/80">
                      <Spark className="mt-1 size-3 shrink-0 text-orange" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section id="apply" className="dot-grid scroll-mt-20 border-t-2 border-ink py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">APPLY</p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tight uppercase sm:text-5xl">Your application</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium text-ink/60 sm:text-base">{careersIntro.beforeBody}</p>
          </Reveal>
          <div className="mt-8">
            <ApplicationForm role={role.slug} roleTitle={role.title} skills={role.skills} />
          </div>
        </div>
      </section>
    </>
  );
}
