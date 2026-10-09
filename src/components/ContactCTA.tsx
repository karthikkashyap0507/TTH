import Link from "next/link";
import { cta, site, whatsappLink } from "@/content/site";
import { Reveal } from "./Reveal";
import { MailIcon, PhoneIcon, ScaleMark, WhatsAppIcon } from "./icons";
import { StartProjectButton } from "./wizard/StartProjectButton";

/** Full-red closing section that appears at the bottom of most pages. */
export function ContactCTA() {
  const contacts = [
    { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, Icon: PhoneIcon },
    { label: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
    { label: "WHATSAPP", href: whatsappLink(`Hi ${site.name}! I'd like a free account audit.`), Icon: WhatsAppIcon },
  ];

  return (
    <section id="contact" className="dot-grid-ink relative scroll-mt-20 overflow-hidden border-t-2 border-ink bg-red text-white">
      {/* depth: darker red falling off at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(90,4,9,0.55)_100%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <Reveal>
          <span className="mx-auto grid size-16 animate-float place-items-center rounded-2xl bg-ink shadow-pop-bone">
            <ScaleMark className="size-10" />
          </span>
          <p className="mt-7 font-display text-xs font-black tracking-[0.24em] text-ink/75">{cta.contactEyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-5xl font-display text-[clamp(2.1rem,6.2vw,5.2rem)] leading-[0.98] font-black tracking-tight uppercase">
            {cta.contactTitleTop}
            <span className="block text-ink">{cta.contactTitleBottom}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-white/90 sm:text-lg">{cta.contactBody}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <StartProjectButton
              source="contact-audit"
              preset={{ service: "Free account audit" }}
              className="rounded-full bg-ink px-8 py-4 font-display text-sm font-bold text-white shadow-pop-bone transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              {cta.auditButton}
            </StartProjectButton>
            <Link
              href="/results"
              className="rounded-full border-2 border-white px-8 py-4 font-display text-sm font-bold transition-colors hover:bg-white hover:text-red sm:text-base"
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
                className="group inline-flex items-center gap-2 font-display text-xs font-bold tracking-wide text-white/90 transition-colors hover:text-ink"
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
