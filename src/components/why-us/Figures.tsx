"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { FigureKind } from "@/content/why-us";
import { DoubleTick, StarIcon } from "@/components/icons";

/** Built-in, animated illustrations for the Why Us article. */
export function ArticleFigure({ kind }: { kind: FigureKind }) {
  switch (kind) {
    case "speed":
      return <SpeedFigure />;
    case "chat":
      return <ChatFigure />;
    case "trust":
      return <TrustFigure />;
    case "mobile":
      return <MobileFigure />;
    case "analytics":
      return <AnalyticsFigure />;
  }
}

function useSeen() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return { ref, seen };
}

function SpeedFigure() {
  const { ref, seen } = useSeen();
  const rows = [
    { label: "BEFORE", time: "6.8s", width: "100%", tone: "bg-bone/25", text: "text-bone/55" },
    { label: "AFTER", time: "1.4s", width: "21%", tone: "bg-red", text: "text-red-bright" },
  ];
  return (
    <div ref={ref} className="bg-ink p-5 text-bone sm:p-8">
      <p className="font-display text-[0.65rem] font-black tracking-[0.18em] text-bone/50">TIME UNTIL THE PAGE IS USABLE</p>
      <div className="mt-5 space-y-5">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between font-display font-black">
              <span className="text-xs tracking-[0.14em]">{r.label}</span>
              <span className={`text-2xl tracking-tight sm:text-3xl ${r.text}`}>{r.time}</span>
            </div>
            <div className="mt-2 h-5 overflow-hidden rounded-full border border-white/15 bg-white/5">
              <motion.div
                className={`h-full rounded-full ${r.tone}`}
                initial={{ width: 0 }}
                animate={seen ? { width: r.width } : {}}
                transition={{ duration: i === 0 ? 2.2 : 0.7, ease: "easeOut", delay: 0.2 + i * 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {["COMPRESSED IMAGES", "LESS JAVASCRIPT", "EDGE HOSTING", "NO PLUGIN PILE-UP"].map((t) => (
          <span key={t} className="rounded-full bg-red px-2.5 py-1 font-display text-[0.55rem] font-black tracking-wide text-white">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChatFigure() {
  const { ref, seen } = useSeen();
  const msgs = [
    { me: false, text: "Hi, is the blue kurta available in M? 🙏", time: "11:47 pm" },
    { me: true, text: "Yes! Blue kurta in M is in stock — ₹1,499 with free delivery by Friday. Want me to reserve one?", time: "11:47 pm" },
    { me: false, text: "Yes please", time: "11:48 pm" },
    { me: true, text: "Done ✅ Here's your checkout link. Pay by card, UPI or COD.", time: "11:48 pm" },
  ];
  return (
    <div ref={ref} style={{ background: "#0f0f0f", backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "10px 10px" }} className="p-4 sm:p-6">
      <div className="mx-auto max-w-sm space-y-2">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={seen ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.55, type: "spring", stiffness: 300, damping: 24 }}
            className={`w-fit max-w-[85%] rounded-lg px-3 pt-2 pb-1 text-[13px] leading-snug text-white shadow-[0_1px_0_rgba(0,0,0,0.4)] ${
              m.me ? "ml-auto rounded-tr-none bg-red" : "rounded-tl-none bg-[#262626]"
            }`}
          >
            {m.me && i === 1 && <span className="mb-0.5 block font-display text-[0.55rem] font-black tracking-[0.12em] text-white/75">AI AGENT</span>}
            {m.text}
            <span className="float-right mt-1 ml-2 inline-flex items-center gap-0.5 text-[0.6rem] text-white/55">
              {m.time}
              {m.me && <DoubleTick className="h-2.5 w-3.5 text-white/85" />}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrustFigure() {
  return (
    <div className="bg-ink p-4 text-bone sm:p-7">
      <div className="mx-auto grid max-w-lg gap-4 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-white/12 bg-bone">
          <div className="absolute inset-0 opacity-60 dot-grid-ink" />
          <div className="absolute inset-[18%] rounded-full border-2 border-ink bg-red" />
          <span className="absolute bottom-2 left-2 rounded-full bg-ink px-2 py-0.5 font-display text-[0.55rem] font-black text-bone">
            CUSTOMER PHOTO
          </span>
        </div>
        <div className="flex flex-col">
          <p className="font-display text-lg leading-tight font-black">Handmade Mug</p>
          <div className="mt-1 flex items-center gap-1 text-red-bright">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="size-4" />
            ))}
            <span className="ml-1 text-xs font-bold text-bone/55">4.9 · 212 reviews</span>
          </div>
          <p className="mt-2 font-display text-2xl font-black">₹899</p>
          <ul className="mt-2 space-y-1 text-xs font-semibold text-bone/70">
            <li>🚚 Delivered by Thursday</li>
            <li>↩️ 7-day easy returns</li>
            <li>🔒 Secure UPI & card payments</li>
          </ul>
          <motion.span
            className="mt-auto block rounded-full bg-red py-2.5 text-center font-display text-xs font-black text-white"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ADD TO CART
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function MobileFigure() {
  return (
    <div className="grid place-items-center bg-ink p-5 sm:p-8">
      <div className="relative h-80 w-44 overflow-hidden rounded-[2rem] border-2 border-white/25 bg-bone text-ink shadow-pop">
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-ink/80" />
        <div className="animate-site-scroll space-y-2 p-3 [--scroll-distance:-38%]">
          <div className="aspect-square rounded-xl border-2 border-ink bg-red" />
          <div className="h-2.5 w-3/4 rounded bg-ink" />
          <div className="h-2 w-1/2 rounded bg-ink/30" />
          <div className="grid grid-cols-2 gap-2 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`aspect-square rounded-lg border-2 border-ink ${i % 3 === 0 ? "bg-ink" : "bg-white"}`} />
            ))}
          </div>
          <div className="h-2 w-2/3 rounded bg-ink/30" />
          <div className="h-2 w-1/2 rounded bg-ink/30" />
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t-2 border-ink bg-white p-2">
          <div className="rounded-full bg-red py-2 text-center font-display text-[0.6rem] font-black text-white">BUY NOW · ₹1,299</div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsFigure() {
  const { ref, seen } = useSeen();
  const bars = [
    { label: "INSTAGRAM", v: 82 },
    { label: "GOOGLE", v: 64 },
    { label: "WHATSAPP", v: 48 },
    { label: "DIRECT", v: 30 },
    { label: "ADS", v: 22 },
  ];
  return (
    <div ref={ref} className="bg-ink p-5 text-bone sm:p-8">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-[0.65rem] font-black tracking-[0.18em] text-bone/50">SALES BY SOURCE · THIS WEEK</p>
        <p className="font-display text-xs font-black text-red-bright">+18%</p>
      </div>
      <div className="mt-5 flex h-44 items-end gap-3 border-b-2 border-white/20 sm:gap-5">
        {bars.map((b, i) => (
          <div key={b.label} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              className={`rounded-t-lg ${i === 0 ? "bg-red shadow-[0_0_24px_rgba(227,18,28,0.45)]" : "bg-bone/25"}`}
              initial={{ height: 0 }}
              animate={seen ? { height: `${b.v}%` } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-5">
        {bars.map((b) => (
          <span key={b.label} className="flex-1 truncate text-center font-display text-[0.5rem] font-black tracking-wide text-bone/55 sm:text-[0.6rem]">
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
