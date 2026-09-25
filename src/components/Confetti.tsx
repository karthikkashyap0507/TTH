"use client";

import { motion } from "motion/react";
import { useState } from "react";

const COLORS = ["#ff4d00", "#ffc72e", "#141414", "#fffcf5"];

type Piece = { x: number; y: number; r: number; w: number; h: number; c: string; d: number; round: boolean };

function makePieces(count: number, spread: number): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = spread * (0.45 + Math.random() * 0.55);
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - spread * 0.25,
      r: (Math.random() - 0.5) * 720,
      w: 6 + Math.random() * 7,
      h: 8 + Math.random() * 10,
      c: COLORS[i % COLORS.length],
      d: Math.random() * 0.12,
      round: Math.random() > 0.7,
    };
  });
}

/** One-shot burst of brand-coloured confetti from the centre of its parent. */
export function Confetti({ count = 36, spread = 220 }: { count?: number; spread?: number }) {
  const [pieces] = useState(() => makePieces(count, spread));
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-visible" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 left-1/2 border border-ink"
          style={{ width: p.w, height: p.h, background: p.c, borderRadius: p.round ? 999 : 2 }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 140], rotate: p.r, opacity: [1, 1, 0], scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: p.d, times: [0, 0.55, 1] }}
        />
      ))}
    </div>
  );
}
