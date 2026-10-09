"use client";

import type { ReactNode } from "react";
import { useWizard, type WizardPreset } from "./WizardProvider";

/** Any button that should open the "start a project" wizard. */
export function StartProjectButton({
  children = "START A PROJECT",
  className,
  source,
  preset,
}: {
  children?: ReactNode;
  className?: string;
  source?: string;
  preset?: WizardPreset;
}) {
  const { open } = useWizard();
  return (
    <button type="button" onClick={() => open(source, preset)} className={className}>
      {children}
    </button>
  );
}
