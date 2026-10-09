import Link from "next/link";
import { footerNav, site, tagline, whatsappLink } from "@/content/site";
import { Logo } from "./Logo";
import { InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const socials = [
  { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, Icon: PhoneIcon },
  { label: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
  { label: "WHATSAPP US", href: whatsappLink(`Hi ${site.name}! 👋`), Icon: WhatsAppIcon },
  { label: site.socials.instagram.label, href: site.socials.instagram.href, Icon: InstagramIcon },
  { label: site.socials.linkedin.label, href: site.socials.linkedin.href, Icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-bone">
      {/* thin red rule along the top edge */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-red to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xl">
            <Logo />
            <p className="mt-4 font-display text-base font-black tracking-tight text-bone">{tagline}</p>
            <p className="mt-2 text-sm font-medium text-bone/55">
              Performance marketing, creatives and the tech D2C brands grow on — websites, apps, custom software, CRM, ERP and automation. Based in {site.location}.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-xs font-bold tracking-[0.14em] text-bone/65 transition-colors hover:text-red-bright"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-display text-[0.6rem] font-black tracking-[0.18em] text-red-bright">SAY HELLO</p>
            <div className="mt-3 flex flex-col gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={/^(mailto|tel):/.test(href) ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-2.5 font-display text-xs font-bold tracking-wide text-bone/65 transition-colors hover:text-white"
                >
                  <span className="grid size-7 place-items-center rounded-md bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-white/10">
                    <Icon className="size-4" />
                  </span>
                  {label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center font-display text-[0.65rem] font-bold tracking-[0.2em] text-bone/35">
        © {new Date().getFullYear()} {site.wordmark} — BUILT IN-HOUSE. BUILT TO SCALE.
      </div>
    </footer>
  );
}
