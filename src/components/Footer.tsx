import Link from "next/link";
import { footerNav, site, whatsappLink } from "@/content/site";
import { Logo } from "./Logo";
import { InstagramIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./icons";

const socials = [
  { label: site.socials.instagram.label, href: site.socials.instagram.href, Icon: InstagramIcon },
  { label: site.socials.linkedin.label, href: site.socials.linkedin.href, Icon: LinkedInIcon },
  { label: "WHATSAPP US", href: whatsappLink(`Hi ${site.name}! 👋`), Icon: WhatsAppIcon },
  { label: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-orange/30 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xl">
            <Logo inverted />
            <p className="mt-4 text-sm font-medium text-cream/55">
              Brands, websites and AI agents — designed, built and automated under one roof.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-xs font-bold tracking-[0.14em] text-cream/70 transition-colors hover:text-orange"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-display text-[0.6rem] font-black tracking-[0.18em] text-orange">SAY HELLO</p>
            <div className="mt-3 flex flex-col gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-2.5 font-display text-xs font-bold tracking-wide text-cream/70 transition-colors hover:text-cream"
                >
                  <span className="grid size-7 place-items-center rounded-md bg-cream/10 transition-colors group-hover:bg-cream/20">
                    <Icon className="size-4" />
                  </span>
                  {label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-5 text-center font-display text-[0.65rem] font-bold tracking-[0.2em] text-cream/40">
        © {new Date().getFullYear()} {site.wordmark} — EVERYTHING BUILT IN-HOUSE
      </div>
    </footer>
  );
}
