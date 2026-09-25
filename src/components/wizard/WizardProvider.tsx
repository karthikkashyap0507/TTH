"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ProjectWizard } from "./ProjectWizard";

type WizardContextValue = {
  open: (source?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("site");

  const open = useCallback((from?: string) => {
    setSource(from ?? "site");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <WizardContext.Provider value={value}>
      {children}
      <ProjectWizard open={isOpen} onClose={close} source={source} />
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>");
  return ctx;
}
