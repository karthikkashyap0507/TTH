"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Confetti } from "@/components/Confetti";
import { ScaleMark } from "@/components/icons";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STORAGE_KEY = "tsh-services-revealed";
const COLS = 28;
const ROWS = 12;
const REVEAL_AT = 0.42;

type Phase = "idle" | "scratching" | "revealed" | "gone";

/**
 * A canvas "scratch-off" layer that sits on top of its container.
 * Mouse: just move over it. Touch: swipe sideways. Keyboard: a hidden
 * "Reveal" button appears on focus.
 */
export function ScratchCard({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleared = useRef<Uint8Array>(new Uint8Array(COLS * ROWS));
  const clearedCount = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);
  const pressed = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const reduce = usePrefersReducedMotion();

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  // Skip the game if it was already scratched this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setPhaseBoth("gone");
    } catch {
      /* storage unavailable — play normally */
    }
  }, [setPhaseBoth]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintCover(ctx, rect.width, rect.height, canvas);
    cleared.current = new Uint8Array(COLS * ROWS);
    clearedCount.current = 0;
  }, []);

  const gone = phase === "gone";
  useEffect(() => {
    if (gone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    paint();
    // Repaint once the display font is ready (canvas text needs it loaded)
    document.fonts?.ready.then(() => phaseRef.current === "idle" && paint());
    const ro = new ResizeObserver(() => phaseRef.current === "idle" && paint());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [paint, gone]);

  const reveal = useCallback(() => {
    if (phaseRef.current === "revealed" || phaseRef.current === "gone") return;
    setPhaseBoth("revealed");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setPhaseBoth("gone"), 1600);
  }, [setPhaseBoth]);

  const scratchTo = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const brush = w < 560 ? 30 : 42;
      const from = last.current ?? { x, y };

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = brush * 2;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";

      // Mark every grid cell the brush passed over
      const dist = Math.hypot(x - from.x, y - from.y);
      const steps = Math.max(1, Math.ceil(dist / (brush / 2)));
      const cw = w / COLS;
      const chh = h / ROWS;
      for (let s = 0; s <= steps; s++) {
        const px = from.x + ((x - from.x) * s) / steps;
        const py = from.y + ((y - from.y) * s) / steps;
        const c0 = Math.max(0, Math.floor((px - brush) / cw));
        const c1 = Math.min(COLS - 1, Math.floor((px + brush) / cw));
        const r0 = Math.max(0, Math.floor((py - brush) / chh));
        const r1 = Math.min(ROWS - 1, Math.floor((py + brush) / chh));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const cx = (c + 0.5) * cw;
            const cy = (r + 0.5) * chh;
            if ((cx - px) ** 2 + (cy - py) ** 2 <= brush * brush) {
              const idx = r * COLS + c;
              if (!cleared.current[idx]) {
                cleared.current[idx] = 1;
                clearedCount.current++;
              }
            }
          }
        }
      }
      last.current = { x, y };

      if (clearedCount.current / (COLS * ROWS) >= REVEAL_AT) reveal();
    },
    [reveal],
  );

  const pointFrom = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pressed.current = true;
    const p = pointFrom(e);
    last.current = p;
    if (phaseRef.current === "idle") setPhaseBoth("scratching");
    scratchTo(p.x, p.y);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Mice scratch just by hovering; touch/pen need contact
    if (e.pointerType !== "mouse" && !pressed.current) return;
    const p = pointFrom(e);
    if (phaseRef.current === "idle") setPhaseBoth("scratching");
    scratchTo(p.x, p.y);
  };

  const endStroke = () => {
    pressed.current = false;
    last.current = null;
  };

  if (phase === "gone") return null;

  return (
    <div className={className}>
      <motion.div
        className="absolute inset-0 z-20 overflow-hidden rounded-2xl border border-white/15 shadow-pop"
        animate={phase === "revealed" ? { opacity: 0, scale: 1.04, filter: "blur(6px)" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: phase === "revealed" ? "none" : "auto" }}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full touch-pan-y select-none"
          aria-label="Scratch card — scratch or swipe to reveal our services"
          role="img"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
          onPointerLeave={endStroke}
        />
      </motion.div>

      {/* Animated coin that demonstrates the gesture until someone starts */}
      <AnimatePresence>
        {phase === "idle" && !reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
            exit={{ opacity: 0 }}
            aria-hidden="true"
          >
            <motion.span
              className="absolute top-[12%] left-[6%] grid size-11 place-items-center rounded-full border-2 border-ink bg-red text-white shadow-[3px_3px_0_0_var(--color-bone)] sm:top-[58%] sm:left-[7%] sm:size-12"
              animate={{ x: ["0%", "180%", "0%"], y: ["0%", "-45%", "0%"], rotate: [-18, 18, -18] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ScaleMark variant="mono" className="size-5" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "revealed" && !reduce && (
        <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center">
          <div className="relative">
            <Confetti count={44} spread={320} />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={reveal}
        className="sr-only z-50 rounded-full bg-red px-5 py-3 font-display text-sm font-bold text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Reveal all services
      </button>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Drawing the scratch surface
   -------------------------------------------------------------------------- */
function paintCover(ctx: CanvasRenderingContext2D, w: number, h: number, el: HTMLElement) {
  const display = getComputedStyle(el).getPropertyValue("--font-archivo").trim() || "Archivo, sans-serif";
  const small = w < 560;

  // Base
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, w, h);

  // Pattern of little houses + sparks
  const step = small ? 38 : 46;
  for (let row = 0, y = step / 2; y < h + step; row++, y += step) {
    for (let x = row % 2 ? step : step / 2; x < w + step; x += step) {
      if ((Math.round(x / step) + row) % 3 === 0) drawHouse(ctx, x, y, small ? 7 : 8, "rgba(227,18,28,0.38)");
      else drawSpark(ctx, x, y, small ? 3.2 : 4, "rgba(245,242,237,0.10)");
    }
  }

  // Soft vignette in the middle so the label pops
  const g = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * 0.55);
  g.addColorStop(0, "rgba(13,13,13,0.94)");
  g.addColorStop(1, "rgba(13,13,13,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Label
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ff3d46";
  ctx.font = `900 ${small ? 11 : 13}px ${display}`;
  ctx.fillText("✦  SIX FLOORS INSIDE  ✦", w / 2, h / 2 - (small ? 44 : 64));

  ctx.fillStyle = "#f5f2ed";
  const big = small ? Math.min(34, w / 9) : Math.min(64, w / 13);
  ctx.font = `900 ${big}px ${display}`;
  ctx.fillText("WHAT'S INSIDE", w / 2, h / 2 - big * 0.3);
  ctx.fillStyle = "#ff3d46";
  ctx.fillText("THE HOUSE?", w / 2, h / 2 + big * 0.72);

  // Pill
  const label = small ? "SWIPE TO SCRATCH" : "MOVE YOUR CURSOR TO SCRATCH";
  ctx.font = `800 ${small ? 11 : 13}px ${display}`;
  const tw = ctx.measureText(label).width + (small ? 28 : 36);
  const ph = small ? 28 : 34;
  const px = w / 2 - tw / 2;
  const py = h / 2 + big * 0.72 + (small ? 30 : 44);
  roundRect(ctx, px + 3, py + 3, tw, ph, ph / 2, "#e3121c");
  roundRect(ctx, px, py, tw, ph, ph / 2, "#f5f2ed");
  ctx.fillStyle = "#0a0a0a";
  ctx.fillText(label, w / 2, py + ph / 2 + 1);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawSpark(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.beginPath();
  ctx.moveTo(x, y - s * 2);
  ctx.quadraticCurveTo(x, y, x + s * 2, y);
  ctx.quadraticCurveTo(x, y, x, y + s * 2);
  ctx.quadraticCurveTo(x, y, x - s * 2, y);
  ctx.quadraticCurveTo(x, y, x, y - s * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/** A tiny silhouette of the TSH logo mark (same geometry as <ScaleMark>, centred on x/y). */
function drawHouse(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  const k = s / 50;
  const p = (px: number, py: number): [number, number] => [x + (px - 50) * k, y + (py - 50) * k];
  const shape = (pts: [number, number][]) => {
    ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? ctx.lineTo(...p(px, py)) : ctx.moveTo(...p(px, py))));
    ctx.closePath();
    ctx.fill();
  };
  ctx.fillStyle = color;
  shape([[50, 5.4], [95, 94.7], [77.7, 94.7], [41.2, 22.5]]);
  shape([[5, 94.7], [41.2, 22.5], [50, 39.8], [22.3, 94.7]]);
  shape([[37.5, 84.8], [62.5, 84.8], [62.5, 94.7], [37.5, 94.7]]);
}
