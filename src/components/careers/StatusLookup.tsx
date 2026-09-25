"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { applicationStatuses } from "@/content/careers";
import { ArrowRight, Check, Close } from "@/components/icons";
import { cx } from "@/lib/tones";

type Result = {
  id: string;
  name: string;
  roleTitle: string;
  status: string;
  statusLabel: string;
  statusBody: string;
  createdAt: string;
  updatedAt: string;
};

const track = applicationStatuses.filter((s) => s.key !== "closed");

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function StatusLookup({ initialId = "" }: { initialId?: string }) {
  const [id, setId] = useState(initialId);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  // Prefill the last application ID submitted from this browser
  useEffect(() => {
    if (initialId) return;
    try {
      const last = localStorage.getItem("tth-last-application");
      if (last) setId(last);
    } catch {
      /* ignore */
    }
  }, [initialId]);

  async function lookup(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email }),
      });
      const data = (await res.json().catch(() => ({}))) as Result & { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
      setState("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const closed = result?.status === "closed";
  const current = result ? Math.max(0, track.findIndex((s) => s.key === result.status)) : 0;

  return (
    <div className="space-y-6">
      <form onSubmit={lookup} className="rounded-3xl border-2 border-ink bg-paper p-5 shadow-[7px_7px_0_0_#141414] sm:p-8">
        <div className="grid gap-4 sm:grid-cols-[1fr_1.3fr]">
          <label className="block">
            <span className="mb-1.5 block font-display text-[0.7rem] font-black tracking-[0.12em]">APPLICATION ID</span>
            <input
              required
              value={id}
              onChange={(e) => setId(e.target.value.toUpperCase())}
              placeholder="TTH-XXXXXX"
              className="w-full rounded-xl border-2 border-ink bg-cream px-4 py-3 font-display text-[15px] font-bold tracking-wide uppercase outline-none placeholder:text-ink/30 focus:shadow-[3px_3px_0_0_#ff4d00]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-display text-[0.7rem] font-black tracking-[0.12em]">EMAIL YOU APPLIED WITH</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border-2 border-ink bg-cream px-4 py-3 text-[15px] font-medium outline-none placeholder:text-ink/30 focus:shadow-[3px_3px_0_0_#ff4d00]"
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-ink/50">Your ID was shown right after you applied.</p>
          <button
            type="submit"
            disabled={state === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold text-cream shadow-[4px_4px_0_0_#ff4d00] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {state === "loading" ? "CHECKING…" : "CHECK STATUS"}
            <ArrowRight className="size-4" />
          </button>
        </div>
        <AnimatePresence>
          {state === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="mt-4 rounded-xl border-2 border-ink bg-orange/10 px-4 py-3 text-sm font-semibold"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.id + result.status}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-[7px_7px_0_0_#141414]"
          >
            <div className={cx("border-b-2 border-ink p-6 sm:p-8", closed ? "bg-ink text-cream" : "bg-yellow")}>
              <p className="font-display text-[0.65rem] font-black tracking-[0.18em] opacity-70">
                {result.id} · {result.roleTitle.toUpperCase()}
              </p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight uppercase sm:text-4xl">
                Hey {result.name}, {closed ? "update on your application" : "here's where you are"}
              </h2>
              <p className="mt-2 text-sm font-medium opacity-75">
                Applied {fmt(result.createdAt)} · Last update {fmt(result.updatedAt)}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {closed ? (
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream">
                    <Close className="size-4" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-black tracking-tight uppercase">{result.statusLabel}</p>
                    <p className="mt-1 text-sm font-medium text-ink/70">{result.statusBody}</p>
                    <Link href="/careers" className="mt-4 inline-block font-display text-xs font-black tracking-wide text-orange underline-offset-4 hover:underline">
                      SEE OTHER OPEN ROLES →
                    </Link>
                  </div>
                </div>
              ) : (
                <ol className="relative space-y-5">
                  <span aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-ink/10" />
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-2 left-[19px] w-0.5 origin-top bg-orange"
                    initial={{ height: 0 }}
                    animate={{ height: `calc(${(current / Math.max(1, track.length - 1)) * 100}% - 1rem)` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  />
                  {track.map((s, i) => {
                    const done = i < current;
                    const now = i === current;
                    return (
                      <motion.li
                        key={s.key}
                        className="relative flex items-start gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                      >
                        <span
                          className={cx(
                            "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-sm font-black",
                            done && "bg-ink text-cream",
                            now && "bg-orange text-cream shadow-[3px_3px_0_0_#141414]",
                            !done && !now && "bg-cream text-ink/40",
                          )}
                        >
                          {done ? <Check className="size-4" /> : i + 1}
                          {now && <span className="absolute inset-0 animate-ping rounded-full bg-orange/40" />}
                        </span>
                        <div className={cx("pt-1.5", !done && !now && "opacity-45")}>
                          <p className="font-display text-base font-black tracking-tight uppercase">{s.label}</p>
                          {now && <p className="mt-1 text-sm font-medium text-ink/70">{s.body}</p>}
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
