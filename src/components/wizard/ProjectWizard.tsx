"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { wizard } from "@/content/wizard";
import { site, whatsappLink } from "@/content/site";
import { ArrowLeft, ArrowRight, Check, Close, HouseMark, WhatsAppIcon } from "@/components/icons";
import { Confetti } from "@/components/Confetti";
import { cx } from "@/lib/tones";
import { useScrollLock } from "@/lib/useScrollLock";

type Answers = { service: string; budget: string };
type Contact = { name: string; phone: string; email: string; note: string; website: string };

const emptyContact: Contact = { name: "", phone: "", email: "", note: "", website: "" };
const TOTAL = wizard.steps.length + 1;

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export function ProjectWizard({ open, onClose, source }: { open: boolean; onClose: () => void; source: string }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ service: "", budget: "" });
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useScrollLock(open);

  // Reset every time the wizard opens, remember what had focus, and restore it on close.
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setStep(0);
      setDir(1);
      setAnswers({ service: "", budget: "" });
      setContact(emptyContact);
      setStatus("idle");
      setError("");
      requestAnimationFrame(() => panelRef.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) trapFocus(e, panelRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => go(step + 1), 220);
  };

  const summary = `Hi ${site.name}! I'm ${contact.name || "interested in a project"}.\nI need: ${answers.service || "—"}\nBudget: ${answers.budget || "—"}${contact.note ? `\nAbout the project: ${contact.note}` : ""}`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, ...contact, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
      setDir(1);
      setStep(TOTAL);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const done = step === TOTAL;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.1 } }}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-[3px]" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative flex max-h-[94svh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border-2 border-ink bg-cream shadow-[8px_8px_0_0_#141414] outline-none sm:rounded-3xl"
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-paper px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-ink text-orange">
                  <HouseMark className="size-4" />
                </span>
                <p className="font-display text-xs font-black tracking-[0.16em]">
                  {done ? "ALL DONE" : `STEP ${step + 1} / ${TOTAL}`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 place-items-center rounded-full border-2 border-ink bg-cream transition-colors hover:bg-yellow"
                aria-label="Close"
              >
                <Close className="size-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1.5 px-5 pt-4 sm:px-7" aria-hidden="true">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <span key={i} className="h-2 flex-1 overflow-hidden rounded-full border-2 border-ink bg-paper">
                  <motion.span
                    className="block h-full bg-orange"
                    initial={false}
                    animate={{ width: done || i < step ? "100%" : i === step ? "50%" : "0%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              ))}
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-x-hidden overflow-y-auto px-5 pt-5 pb-6 sm:px-7 sm:pb-7">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step < wizard.steps.length && (
                    <ChoiceStep
                      titleId={titleId}
                      title={wizard.steps[step].title}
                      hint={wizard.steps[step].hint}
                      options={wizard.steps[step].options}
                      selected={answers[wizard.steps[step].key as keyof Answers]}
                      onChoose={(v) => choose(wizard.steps[step].key as keyof Answers, v)}
                      onBack={step > 0 ? () => go(step - 1) : undefined}
                    />
                  )}

                  {step === wizard.steps.length && (
                    <form onSubmit={submit} noValidate={false}>
                      <h2 id={titleId} className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
                        {wizard.contactTitle}
                      </h2>
                      <p className="mt-1.5 text-sm font-medium text-ink/60">{wizard.contactHint}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {[answers.service, answers.budget].filter(Boolean).map((a) => (
                          <span key={a} className="rounded-full border-2 border-ink bg-yellow px-3 py-1 font-display text-[0.65rem] font-black tracking-wide">
                            {a.toUpperCase()}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-3.5">
                        <Field label="Your name" required>
                          <input
                            required
                            autoComplete="name"
                            value={contact.name}
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                            placeholder="Priya Sharma"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="WhatsApp number" required>
                          <input
                            required
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            pattern="[\+0-9 \(\)\-]{8,20}"
                            title="Enter a valid phone number"
                            value={contact.phone}
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Email (optional)">
                          <input
                            type="email"
                            autoComplete="email"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            placeholder="you@business.com"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Anything we should know? (optional)">
                          <textarea
                            rows={3}
                            value={contact.note}
                            onChange={(e) => setContact({ ...contact, note: e.target.value })}
                            placeholder="A link to your Instagram, a site you love, a deadline…"
                            className={cx(inputClass, "resize-none")}
                          />
                        </Field>
                        {/* Honeypot — real people never see or fill this */}
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={contact.website}
                          onChange={(e) => setContact({ ...contact, website: e.target.value })}
                          className="absolute -left-[9999px] h-0 w-0 opacity-0"
                          aria-hidden="true"
                        />
                      </div>

                      {status === "error" && (
                        <div className="mt-4 rounded-xl border-2 border-ink bg-orange/10 px-4 py-3 text-sm font-semibold">
                          {error}{" "}
                          <a href={whatsappLink(summary)} target="_blank" rel="noreferrer" className="underline decoration-orange decoration-2 underline-offset-2">
                            Message us on WhatsApp instead →
                          </a>
                        </div>
                      )}

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <BackButton onClick={() => go(step - 1)} />
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold text-cream shadow-[4px_4px_0_0_#ff4d00] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          {status === "sending" ? "SENDING…" : "SEND IT"}
                          <ArrowRight className="size-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {done && (
                    <div className="relative py-4 text-center">
                      <Confetti />
                      <motion.span
                        className="mx-auto grid size-20 place-items-center rounded-full border-2 border-ink bg-orange text-cream shadow-[4px_4px_0_0_#141414]"
                        initial={{ scale: 0, rotate: -40 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                      >
                        <Check className="size-10" />
                      </motion.span>
                      <h2 id={titleId} className="mt-6 font-display text-3xl font-black uppercase tracking-tight">
                        {wizard.successTitle}
                      </h2>
                      <p className="mx-auto mt-2 max-w-sm text-sm font-medium text-ink/65 sm:text-base">{wizard.successBody}</p>
                      <div className="mt-7 flex flex-col items-center gap-3">
                        <a
                          href={whatsappLink(summary)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-[#25D366] px-6 py-3.5 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5"
                        >
                          <WhatsAppIcon className="size-5" />
                          CAN&apos;T WAIT? PING US ON WHATSAPP
                        </a>
                        <button type="button" onClick={onClose} className="font-display text-xs font-bold tracking-[0.14em] text-ink/55 underline-offset-4 hover:underline">
                          CLOSE
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 text-[15px] font-medium outline-none transition-shadow placeholder:text-ink/35 focus:shadow-[3px_3px_0_0_#ff4d00]";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[0.7rem] font-black tracking-[0.12em] uppercase">
        {label}
        {required && <span className="text-orange"> *</span>}
      </span>
      {children}
    </label>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-2.5 font-display text-xs font-bold tracking-wide transition-colors hover:bg-paper"
    >
      <ArrowLeft className="size-3.5" /> BACK
    </button>
  );
}

function ChoiceStep({
  titleId,
  title,
  hint,
  options,
  selected,
  onChoose,
  onBack,
}: {
  titleId: string;
  title: string;
  hint: string;
  options: { value: string; sub: string }[];
  selected: string;
  onChoose: (v: string) => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <h2 id={titleId} className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-1.5 text-sm font-medium text-ink/60">{hint}</p>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {options.map((o, i) => {
          const active = selected === o.value;
          return (
            <motion.button
              key={o.value}
              type="button"
              onClick={() => onChoose(o.value)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={active}
              className={cx(
                "group relative flex items-center justify-between gap-3 rounded-2xl border-2 border-ink px-4 py-3.5 text-left transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#141414]",
                active ? "bg-ink text-cream" : "bg-paper hover:bg-yellow",
                options.length % 2 === 1 && i === options.length - 1 && "sm:col-span-2",
              )}
            >
              <span>
                <span className="block font-display text-sm font-black tracking-tight uppercase">{o.value}</span>
                <span className={cx("mt-0.5 block text-xs font-medium", active ? "text-cream/70" : "text-ink/55")}>{o.sub}</span>
              </span>
              <span
                className={cx(
                  "grid size-6 shrink-0 place-items-center rounded-full border-2",
                  active ? "border-cream bg-orange text-cream" : "border-ink/30",
                )}
              >
                {active && <Check className="size-3.5" />}
              </span>
            </motion.button>
          );
        })}
      </div>
      {onBack && (
        <div className="mt-6">
          <BackButton onClick={onBack} />
        </div>
      )}
    </div>
  );
}

function trapFocus(e: KeyboardEvent, root: HTMLElement) {
  const focusables = root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([tabindex="-1"]), textarea, select, [tabindex]:not([tabindex="-1"])',
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
