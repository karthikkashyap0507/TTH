"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { useWizard } from "./wizard/WizardProvider";
import { ArrowUpRight } from "./icons";
import { cx } from "@/lib/tones";
import { useScrollLock } from "@/lib/useScrollLock";

export function Header() {
  const pathname = usePathname();
  const { open } = useWizard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollLock(menuOpen);

  // Close the mobile menu whenever the route changes
  useEffect(() => setMenuOpen(false), [pathname]);

  // Firm up the bar once the page has scrolled a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300",
        scrolled || menuOpen ? "border-white/10 bg-ink/85" : "border-transparent bg-ink/40",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "relative font-display text-sm font-bold tracking-wide transition-colors hover:text-white",
                isActive(item.href) ? "text-white" : "text-bone/65",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-red" />
              )}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => open("navbar")}
            className="beam-cta rounded-full bg-red px-5 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-red-bright"
          >
            START A PROJECT
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg border border-white/20 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className={cx("h-0.5 w-full bg-bone transition-transform duration-300", menuOpen && "translate-y-2 rotate-45")} />
            <span className={cx("h-0.5 w-full bg-bone transition-opacity duration-200", menuOpen && "opacity-0")} />
            <span className={cx("h-0.5 w-full bg-bone transition-transform duration-300", menuOpen && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="dot-grid absolute inset-x-0 top-full h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex min-h-full flex-col px-4 pt-6 pb-10">
              <ul className="flex flex-col">
                {[...nav, { label: "CONTACT", href: "/#contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cx(
                        "flex items-center justify-between py-4 font-display text-3xl font-black tracking-tight",
                        isActive(item.href) ? "text-red-bright" : "text-bone",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight className="size-6 opacity-40" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setMenuOpen(false);
                  open("mobile-menu");
                }}
                className="mt-8 w-full rounded-full bg-red px-6 py-4 font-display text-base font-bold text-white shadow-pop-deep"
              >
                START A PROJECT
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
