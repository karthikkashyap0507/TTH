"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respects the visitor's "reduce motion" OS setting everywhere: movement and
 * layout animations become instant, fades still play. Doing it here (instead of
 * per component) keeps server and client HTML identical during hydration.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
