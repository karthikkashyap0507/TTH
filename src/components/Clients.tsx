"use client";

import { useState, type CSSProperties } from "react";
import { clients, clientsIntro } from "@/content/site";
import { PauseIcon, PlayIcon, Spark } from "./icons";
import { cx } from "@/lib/tones";

/* Alternating type treatments so plain names read like a strip of logos */
const nameStyle = ["text-ink", "text-red", "text-outline-ink-thin"];

const edgeFade: CSSProperties = {
  maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
};

/**
 * "Our clients" — one slim line of client names sliding left → right.
 * Pauses on hover, and has a pause button for anyone who wants it still.
 */
export function Clients() {
  const [paused, setPaused] = useState(false);

  const toggle = (
    <button
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-label={paused ? "Play the client names" : "Pause the client names"}
      className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-red hover:bg-red hover:text-white"
    >
      {paused ? <PlayIcon className="size-3.5" /> : <PauseIcon className="size-3.5" />}
    </button>
  );

  return (
    <section id="clients" aria-label="Our clients" className="scroll-mt-20 border-y border-ink/10 bg-white text-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:gap-8 md:py-7">
        <div className="flex shrink-0 items-center justify-between gap-4 md:border-r md:border-ink/10 md:pr-8">
          <p className="font-display text-[0.65rem] leading-relaxed font-black tracking-[0.2em] sm:text-xs">
            <span className="text-red">{clientsIntro.eyebrow}</span>
            <span className="text-ink/45 md:block">
              <span className="md:hidden"> · </span>
              {clients.length} {clientsIntro.countLabel}
            </span>
          </p>
          <span className="md:hidden">{toggle}</span>
        </div>

        <ul className="sr-only">
          {clients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <div aria-hidden="true" className="min-w-0 flex-1 overflow-hidden" style={edgeFade}>
          <div
            className="flex w-max animate-slide-right items-center hover:[animation-play-state:paused]"
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {[...clients, ...clients].map((name, i) => (
              <span key={`${name}-${i}`} className="flex items-center">
                <span
                  className={cx(
                    "px-6 font-display text-xl font-black tracking-tight whitespace-nowrap uppercase sm:px-8 sm:text-2xl",
                    nameStyle[i % nameStyle.length],
                  )}
                >
                  {name}
                </span>
                <Spark className="size-3 shrink-0 text-red/60" />
              </span>
            ))}
          </div>
        </div>

        <span className="hidden md:block">{toggle}</span>
      </div>
    </section>
  );
}
