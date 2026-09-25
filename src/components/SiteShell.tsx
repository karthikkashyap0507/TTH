import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WizardProvider } from "./wizard/WizardProvider";

/** Navbar + footer + the global "start a project" wizard. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <WizardProvider>
      <a
        href="#content"
        className="sr-only z-[200] rounded-full bg-ink px-5 py-3 font-display text-sm font-bold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </WizardProvider>
  );
}
