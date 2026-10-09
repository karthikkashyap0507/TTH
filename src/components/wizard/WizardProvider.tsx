"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ProjectWizard } from "./ProjectWizard";

/** Optional answers to fill in before the wizard opens (e.g. "Free account audit"). */
export type WizardPreset = { service?: string };

type WizardContextValue = {
  open: (source?: string, preset?: WizardPreset) => void;
  close: () => void;
  isOpen: boolean;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("site");
  const [preset, setPreset] = useState<WizardPreset | undefined>();

  const open = useCallback((from?: string, presetAnswers?: WizardPreset) => {
    setSource(from ?? "site");
    setPreset(presetAnswers);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <WizardContext.Provider value={value}>
      {children}
      <ProjectWizard open={isOpen} onClose={close} source={source} preset={preset} />
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>");
  return ctx;
}
