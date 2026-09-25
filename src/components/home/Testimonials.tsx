"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { GetWebsiteCTA } from "@/components/GetWebsiteCTA";
import { ArrowLeft, ArrowRight, Close, DoubleTick } from "@/components/icons";
import { cx, toneClass } from "@/lib/tones";
import { useScrollLock } from "@/lib/useScrollLock";

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [overflowing, setOverflowing] = useState(true);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setOverflowing(el.scrollWidth > el.clientWidth + 4);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    const el = scroller.current;
    const ro = new ResizeObserver(measure);
    if (el) ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const nudge = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  // Mouse drag-to-scroll (touch devices scroll natively)
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section className="overflow-hidden bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">NO FILTERS. NO EDITS.</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight uppercase sm:text-6xl">
                Straight from the chats.
              </h2>
            </div>
            <div className="flex items-end gap-4">
              <p className="max-w-xs text-sm font-medium text-ink/60">
                Messages from clients, the way they landed in our inbox. Tap any card to read it properly.
              </p>
              {overflowing && (
                <div className="hidden gap-2 sm:flex">
                  <ScrollButton label="Previous" disabled={edges.start} onClick={() => nudge(-1)}>
                    <ArrowLeft className="size-4" />
                  </ScrollButton>
                  <ScrollButton label="Next" disabled={edges.end} onClick={() => nudge(1)}>
                    <ArrowRight className="size-4" />
                  </ScrollButton>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="relative mt-12">
        <div
          ref={scroller}
          onScroll={measure}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className={cx(
            "no-scrollbar flex cursor-grab overflow-x-auto overscroll-x-contain select-none active:cursor-grabbing",
            !overflowing && "justify-center",
          )}
          aria-label="Client messages — scroll for more"
        >
          <div className="flex gap-4 px-4 pb-4 sm:gap-6 sm:px-6">
            {testimonials.map((t, i) => (
              <ChatCard
                key={i}
                t={t}
                onOpen={() => {
                  if (!drag.current.moved) setOpenIndex(i);
                }}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto mt-14 max-w-7xl px-4 sm:mt-16 sm:px-6">
          <GetWebsiteCTA source="testimonials" />
        </div>
      </Reveal>

      <Lightbox index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </section>
  );
}

function ScrollButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border-2 border-ink bg-paper shadow-[3px_3px_0_0_#141414] transition-[transform,background-color,opacity] hover:-translate-y-0.5 hover:bg-yellow disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function ChatCard({ t, onOpen }: { t: Testimonial; onOpen: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -6, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      tabIndex={0}
      role="button"
      aria-label={`Read message from ${t.client}, ${t.business.toLowerCase()}`}
      className="flex w-[18.5rem] shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[5px_5px_0_0_rgba(0,0,0,0.08)] sm:w-[19.5rem]"
    >
      <div className={cx("relative flex aspect-[13/5] items-center justify-center overflow-hidden border-b-2 border-ink", toneClass[t.tone])}>
        <span className="font-display text-4xl font-black tracking-tighter opacity-90">{t.initials}</span>
        <span className="absolute top-2.5 right-2.5 rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 font-display text-[0.55rem] font-bold tracking-[0.12em] text-ink">
          {t.platform}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <ChatWindow t={t} compact />
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          {t.website ? (
            <span className="truncate font-display text-xs font-black tracking-tight underline decoration-orange decoration-2 underline-offset-4">
              {t.website}
            </span>
          ) : (
            <span className="truncate font-display text-xs font-black tracking-tight">{t.client}</span>
          )}
          <span className="shrink-0 font-display text-[0.55rem] font-bold tracking-[0.12em] text-orange">{t.business}</span>
        </div>
      </div>
    </motion.article>
  );
}

/** A little messaging-app window. Renders a screenshot instead when one is provided. */
function ChatWindow({ t, compact = false }: { t: Testimonial; compact?: boolean }) {
  if (t.screenshot) {
    return (
      <div className={cx("relative overflow-hidden rounded-xl border-2 border-ink", compact && "max-h-[300px]")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.screenshot} alt={`Message from ${t.client}`} className="w-full" loading="lazy" draggable={false} />
      </div>
    );
  }
  return (
    <div className={cx("relative overflow-hidden rounded-xl border-2 border-ink", compact && "h-[260px]")}>
      <div className="flex items-center gap-2 border-b-2 border-ink bg-[#1f2c33] px-3 py-2 text-white">
        <span className="grid size-6 place-items-center rounded-full bg-white/15 font-display text-[0.55rem] font-black">{t.initials}</span>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold">{t.client}</p>
          <p className="text-[0.6rem] text-white/60">online</p>
        </div>
      </div>
      <div
        className="flex flex-col gap-1.5 p-2.5"
        style={{
          background: "#efe7dd",
          backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          minHeight: compact ? "100%" : undefined,
        }}
      >
        {t.messages.map((m, i) => (
          <div
            key={i}
            className={cx(
              "relative max-w-[85%] rounded-lg px-2.5 pt-1.5 pb-1 text-[13px] leading-snug text-[#111b21] shadow-[0_1px_0_rgba(0,0,0,0.12)]",
              m.from === "client" ? "self-start rounded-tl-none bg-white" : "self-end rounded-tr-none bg-[#d9fdd3]",
            )}
          >
            {m.text}
            <span className="float-right mt-1 ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[0.6rem] text-[#667781]">
              {m.time}
              {m.from === "us" && <DoubleTick className="h-2.5 w-3.5 text-[#53bdeb]" />}
            </span>
          </div>
        ))}
      </div>
      {compact && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#efe7dd] to-transparent" />}
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const open = index !== null;
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % testimonials.length);
      if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + testimonials.length) % testimonials.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, onClose, onChange]);

  const t = index !== null ? testimonials[index] : null;

  return (
    <AnimatePresence>
      {open && t && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Message from ${t.client}`}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            key={index}
            className="relative w-full max-w-md"
            initial={{ y: 30, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-[8px_8px_0_0_#141414]">
              <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-black tracking-tight uppercase">{t.client}</p>
                  <p className="font-display text-[0.6rem] font-bold tracking-[0.14em] text-orange">
                    {t.business} · VIA {t.platform}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-colors hover:bg-yellow"
                >
                  <Close className="size-4" />
                </button>
              </div>
              <div className="max-h-[70svh] overflow-y-auto p-4">
                <ChatWindow t={t} />
              </div>
            </div>
            {testimonials.length > 1 && (
              <div className="mt-4 flex justify-center gap-3">
                <ScrollButton label="Previous message" disabled={false} onClick={() => onChange((index! - 1 + testimonials.length) % testimonials.length)}>
                  <ArrowLeft className="size-4" />
                </ScrollButton>
                <ScrollButton label="Next message" disabled={false} onClick={() => onChange((index! + 1) % testimonials.length)}>
                  <ArrowRight className="size-4" />
                </ScrollButton>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
