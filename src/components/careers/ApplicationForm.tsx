"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { availabilityOptions, experienceLevels } from "@/content/careers";
import { ArrowRight, Check } from "@/components/icons";
import { Confetti } from "@/components/Confetti";
import { cx } from "@/lib/tones";

type Fields = {
  name: string;
  email: string;
  phone: string;
  city: string;
  profileUrl: string;
  skills: string[];
  experience: string;
  projectUrl: string;
  secondProjectUrl: string;
  projectNote: string;
  videoUrl: string;
  why: string;
  availability: string;
  company: string; // honeypot
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  city: "",
  profileUrl: "",
  skills: [],
  experience: "",
  projectUrl: "",
  secondProjectUrl: "",
  projectNote: "",
  videoUrl: "",
  why: "",
  availability: "",
  company: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

const looksLikeUrl = (v: string) => /^(https?:\/\/)?[^\s/$.?#]+\.[^\s]{2,}$/i.test(v.trim());

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please add your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email.";
  if (f.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a valid WhatsApp number.";
  if (f.city.trim().length < 2) e.city = "Which city are you in?";
  if (!looksLikeUrl(f.profileUrl)) e.profileUrl = "Add a working link.";
  if (!f.skills.length) e.skills = "Pick at least one skill.";
  if (!f.experience) e.experience = "Pick your experience level.";
  if (!looksLikeUrl(f.projectUrl)) e.projectUrl = "Add a link to your best work.";
  if (f.secondProjectUrl && !looksLikeUrl(f.secondProjectUrl)) e.secondProjectUrl = "That link doesn't look right.";
  if (f.projectNote.trim().length < 20) e.projectNote = "Tell us a little more (20+ characters).";
  if (!looksLikeUrl(f.videoUrl)) e.videoUrl = "Add a link to your intro video.";
  if (!f.availability) e.availability = "When could you start?";
  return e;
}

export function ApplicationForm({ role, roleTitle, skills }: { role: string; roleTitle: string; skills: string[] }) {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const [appId, setAppId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setF((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleSkill = (s: string) =>
    set("skills", f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const v = validate(f);
    setErrors(v);
    if (Object.keys(v).length) {
      setMessage("Please fix the highlighted fields.");
      setStatus("error");
      const first = Object.keys(v)[0];
      document.getElementById(`f-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, role }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string; fields?: Errors };
      if (!res.ok || !data.id) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      try {
        localStorage.setItem("tth-last-application", data.id);
      } catch {
        /* ignore */
      }
      setAppId(data.id);
      window.scrollTo({ top: (document.getElementById("apply")?.offsetTop ?? 0) - 80, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (appId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl border-2 border-ink bg-paper p-7 text-center shadow-[7px_7px_0_0_#141414] sm:p-12"
      >
        <Confetti count={40} spread={280} />
        <span className="mx-auto grid size-20 place-items-center rounded-full border-2 border-ink bg-orange text-cream shadow-[4px_4px_0_0_#141414]">
          <Check className="size-10" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-black tracking-tight uppercase sm:text-4xl">Application sent!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-ink/65 sm:text-base">
          Thanks for applying for <b>{roleTitle}</b>. We review every application with working links — you&apos;ll hear from us
          either way.
        </p>
        <div className="mx-auto mt-7 max-w-sm rounded-2xl border-2 border-ink bg-yellow p-5">
          <p className="font-display text-[0.65rem] font-black tracking-[0.18em]">YOUR APPLICATION ID</p>
          <p className="mt-1 font-display text-3xl font-black tracking-tight">{appId}</p>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(appId).then(() => {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              });
            }}
            className="mt-3 rounded-full border-2 border-ink bg-cream px-4 py-1.5 font-display text-[0.65rem] font-black tracking-wide transition-colors hover:bg-paper"
          >
            {copied ? "COPIED ✓" : "COPY ID"}
          </button>
        </div>
        <p className="mt-4 text-xs font-medium text-ink/55">Save it — you&apos;ll need it (with your email) to check your status.</p>
        <Link
          href={`/status?id=${encodeURIComponent(appId)}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold text-cream shadow-[4px_4px_0_0_#ff4d00] transition-transform hover:-translate-y-0.5"
        >
          CHECK STATUS <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border-2 border-ink bg-paper p-5 shadow-[7px_7px_0_0_#141414] sm:p-9">
      <FormSection no={1} title="About you">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="name" label="Full name" value={f.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" required />
          <TextField id="email" label="Email" type="email" value={f.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" required />
          <TextField id="phone" label="WhatsApp number" type="tel" value={f.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" placeholder="+91 98765 43210" required />
          <TextField id="city" label="City" value={f.city} onChange={(v) => set("city", v)} error={errors.city} autoComplete="address-level2" required />
          <div className="sm:col-span-2">
            <TextField
              id="profileUrl"
              label="Portfolio / LinkedIn / GitHub"
              value={f.profileUrl}
              onChange={(v) => set("profileUrl", v)}
              error={errors.profileUrl}
              placeholder="https://"
              inputMode="url"
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection no={2} title="Your skills">
        <ChipGroup id="skills" label="What are you good at? (pick all that apply)" error={errors.skills} required>
          {skills.map((s) => (
            <Chip key={s} active={f.skills.includes(s)} onClick={() => toggleSkill(s)}>
              {s}
            </Chip>
          ))}
        </ChipGroup>
        <ChipGroup id="experience" label="Experience" error={errors.experience} required>
          {experienceLevels.map((s) => (
            <Chip key={s} active={f.experience === s} onClick={() => set("experience", s)}>
              {s}
            </Chip>
          ))}
        </ChipGroup>
      </FormSection>

      <FormSection no={3} title="Proof of work">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="projectUrl" label="Best project link" value={f.projectUrl} onChange={(v) => set("projectUrl", v)} error={errors.projectUrl} placeholder="https://" inputMode="url" required />
          <TextField id="secondProjectUrl" label="Another project (optional)" value={f.secondProjectUrl} onChange={(v) => set("secondProjectUrl", v)} error={errors.secondProjectUrl} placeholder="https://" inputMode="url" />
          <div className="sm:col-span-2">
            <TextArea
              id="projectNote"
              label="What did you build, and what exactly was your part?"
              value={f.projectNote}
              onChange={(v) => set("projectNote", v)}
              error={errors.projectNote}
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection no={4} title="Say hi on video">
        <div className="grid gap-4">
          <TextField
            id="videoUrl"
            label="60-second intro video (Loom, Drive, YouTube…)"
            value={f.videoUrl}
            onChange={(v) => set("videoUrl", v)}
            error={errors.videoUrl}
            placeholder="https://"
            inputMode="url"
            hint="Make sure the link is viewable by anyone with it."
            required
          />
          <TextArea id="why" label="Why The Tech House? (optional)" value={f.why} onChange={(v) => set("why", v)} />
          <ChipGroup id="availability" label="When can you start?" error={errors.availability} required>
            {availabilityOptions.map((s) => (
              <Chip key={s} active={f.availability === s} onClick={() => set("availability", s)}>
                {s}
              </Chip>
            ))}
          </ChipGroup>
        </div>
      </FormSection>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={f.company}
        onChange={(e) => set("company", e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <AnimatePresence>
        {status === "error" && message && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-xl border-2 border-ink bg-orange/10 px-4 py-3 text-sm font-semibold"
            role="alert"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col-reverse items-start gap-4 border-t-2 border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium text-ink/50">By applying you agree we can contact you about this role.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 font-display text-sm font-black tracking-wide text-cream shadow-[5px_5px_0_0_#141414] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:text-base"
        >
          {status === "sending" ? "SENDING…" : "SUBMIT APPLICATION"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}

/* ------------------------------- pieces ------------------------------- */

function FormSection({ no, title, children }: { no: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t-2 border-ink/10 pt-7 first:border-t-0 first:pt-0 [&+fieldset]:mt-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3" aria-hidden="true">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink font-display text-xs font-black text-cream">{no}</span>
        <h3 className="font-display text-xl font-black tracking-tight uppercase sm:text-2xl">{title}</h3>
      </div>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

const fieldClass = (error?: string) =>
  cx(
    "w-full rounded-xl border-2 bg-cream px-4 py-3 text-[15px] font-medium outline-none transition-shadow placeholder:text-ink/35 focus:shadow-[3px_3px_0_0_#ff4d00]",
    error ? "border-orange" : "border-ink",
  );

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-display text-[0.7rem] font-black tracking-[0.12em] uppercase">
      {children}
      {required && <span className="text-orange"> *</span>}
    </label>
  );
}

function ErrorText({ children }: { children?: string }) {
  return children ? <p className="mt-1.5 text-xs font-bold text-orange">{children}</p> : null;
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  hint,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "url" | "email" | "tel" | "text";
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={`f-${id}`} required={required}>
        {label}
      </Label>
      <input
        id={`f-${id}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        className={fieldClass(error)}
      />
      {hint && !error && <p className="mt-1.5 text-xs font-medium text-ink/45">{hint}</p>}
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={`f-${id}`} required={required}>
        {label}
      </Label>
      <textarea
        id={`f-${id}`}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={cx(fieldClass(error), "resize-y")}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function ChipGroup({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div id={`f-${id}`} role="group" aria-label={label}>
      <p className="mb-2 block font-display text-[0.7rem] font-black tracking-[0.12em] uppercase">
        {label}
        {required && <span className="text-orange"> *</span>}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-bold transition-[background-color,transform] active:scale-95",
        active ? "bg-ink text-cream" : "bg-cream hover:bg-yellow",
      )}
    >
      {active && <Check className="size-3.5 text-yellow" />}
      {children}
    </button>
  );
}
