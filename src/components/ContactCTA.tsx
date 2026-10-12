import Link from "next/link";
import { cta, site, whatsappLink } from "@/content/site";
import { Reveal } from "./Reveal";
import { MailIcon, PhoneIcon, ScaleMark, WhatsAppIcon } from "./icons";
import { StartProjectButton } from "./wizard/StartProjectButton";

/** Bright closing section (white, black and red) that appears at the bottom of most pages. */
export function ContactCTA() {
  const contacts = [
    { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, Icon: PhoneIcon },
    { label: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
    { label: "WHATSAPP", href: whatsappLink(`Hi ${site.name}! I'd like a free account audit.`), Icon: WhatsAppIcon },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-ink/10 bg-white text-ink">
      {/* faint dots that fade towards the edges, plus two soft red glows */}
      <div
        aria-hidden="true"
        className="dot-grid-ink pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -left-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.16),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-56 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(227,18,28,0.12),transparent_65%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <Reveal>
          <span className="mx-auto grid size-16 animate-float place-items-center rounded-2xl bg-ink shadow-pop">
            <ScaleMark className="size-10" />
          </span>
          <p className="mt-7 font-display text-xs font-black tracking-[0.24em] text-red">{cta.contactEyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-5xl font-display text-[clamp(2.1rem,6.2vw,5.2rem)] leading-[0.98] font-black tracking-tight text-balance uppercase">
            {cta.contactTitleTop}
            <span className="block text-red">{cta.contactTitleBottom}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-ink/65 sm:text-lg">{cta.contactBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <StartProjectButton
              source="contact-audit"
              preset={{ service: "Free account audit" }}
              className="rounded-full bg-red px-8 py-4 font-display text-sm font-bold text-white shadow-pop-ink transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-red-bright sm:text-base"
            >
              {cta.auditButton}
            </StartProjectButton>
            <Link
              href="/results"
              className="rounded-full border-2 border-ink px-8 py-4 font-display text-sm font-bold transition-colors hover:bg-ink hover:text-white sm:text-base"
            >
              SEE RESULTS
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {contacts.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={/^(mailto|tel):/.test(href) ? undefined : "_blank"}
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-display text-xs font-bold tracking-wide text-ink/70 transition-colors hover:text-red"
              >
                <Icon className="size-5" />
                {label.toUpperCase()}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
