"use client";

import type { ReactNode } from "react";
import { useWizard } from "./WizardProvider";

/** Any button that should open the "start a project" wizard. */
export function StartProjectButton({
  children = "START A PROJECT",
  className,
  source,
}: {
  children?: ReactNode;
  className?: string;
  source?: string;
}) {
  const { open } = useWizard();
  return (
    <button type="button" onClick={() => open(source)} className={className}>
      {children}
    </button>
  );
}
