"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Application, Lead } from "@/lib/store";
import { applicationStatuses, type ApplicationStatus } from "@/content/careers";
import { cx } from "@/lib/tones";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

const waLink = (phone: string, text: string) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

const statusTone: Record<string, string> = {
  received: "bg-paper",
  reviewing: "bg-yellow",
  task: "bg-yellow",
  interview: "bg-orange text-cream",
  offer: "bg-ink text-cream",
  closed: "bg-ink/10 text-ink/60",
};

export function AdminDashboard({ leads, applications }: { leads: Lead[]; applications: Application[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"leads" | "applications">("leads");
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [apps, setApps] = useState(applications);

  const roles = useMemo(() => Array.from(new Set(applications.map((a) => a.roleTitle))), [applications]);

  const needle = q.trim().toLowerCase();
  const shownLeads = leads.filter((l) => !needle || JSON.stringify(l).toLowerCase().includes(needle));
  const shownApps = apps.filter(
    (a) => (roleFilter === "all" || a.roleTitle === roleFilter) && (!needle || JSON.stringify(a).toLowerCase().includes(needle)),
  );

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function update(id: string, patch: { status?: ApplicationStatus; adminNote?: string }) {
    const res = await fetch(`/api/admin/applications/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = (await res.json().catch(() => ({}))) as { application?: Application; error?: string };
    if (!res.ok || !data.application) {
      alert(data.error || "Update failed");
      return false;
    }
    setApps((prev) => prev.map((a) => (a.id === id ? data.application! : a)));
    return true;
  }

  function exportCsv() {
    const rows: string[][] =
      tab === "leads"
        ? [["id", "date", "name", "phone", "email", "service", "budget", "note", "source"], ...shownLeads.map((l) => [l.id, l.createdAt, l.name, l.phone, l.email ?? "", l.service, l.budget, l.note ?? "", l.source ?? ""])]
        : [
            ["id", "date", "status", "role", "name", "email", "phone", "city", "experience", "skills", "profile", "project", "video", "availability"],
            ...shownApps.map((a) => [a.id, a.createdAt, a.status, a.roleTitle, a.name, a.email, a.phone, a.city, a.experience, a.skills.join("; "), a.profileUrl, a.projectUrl, a.videoUrl, a.availability]),
          ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `tth-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-full border-2 border-ink bg-paper p-1">
          {(["leads", "applications"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cx(
                "rounded-full px-4 py-2 font-display text-xs font-black tracking-wide uppercase transition-colors",
                tab === t ? "bg-ink text-cream" : "hover:bg-yellow",
              )}
            >
              {t} <span className={tab === t ? "text-yellow" : "text-ink/40"}>{t === "leads" ? leads.length : apps.length}</span>
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="min-w-0 flex-1 rounded-full border-2 border-ink bg-paper px-4 py-2.5 text-sm font-medium outline-none focus:shadow-[3px_3px_0_0_#ff4d00] sm:max-w-xs"
        />
        {tab === "applications" && roles.length > 1 && (
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-full border-2 border-ink bg-paper px-4 py-2.5 text-sm font-bold outline-none"
          >
            <option value="all">All roles</option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        )}
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={exportCsv} className="rounded-full border-2 border-ink bg-paper px-4 py-2.5 font-display text-xs font-black hover:bg-yellow">
            EXPORT CSV
          </button>
          <button type="button" onClick={() => router.refresh()} className="rounded-full border-2 border-ink bg-paper px-4 py-2.5 font-display text-xs font-black hover:bg-yellow">
            REFRESH
          </button>
          <button type="button" onClick={logout} className="rounded-full bg-ink px-4 py-2.5 font-display text-xs font-black text-cream hover:bg-orange">
            LOG OUT
          </button>
        </div>
      </div>

      {tab === "leads" ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {shownLeads.length === 0 && <Empty text="No project enquiries yet. They'll appear here as soon as someone uses the wizard." />}
          {shownLeads.map((l) => (
            <article key={l.id} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_0_#141414]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-black tracking-tight">{l.name}</p>
                  <p className="text-xs font-bold text-ink/50">
                    {l.id} · {fmt(l.createdAt)}
                    {l.source ? ` · via ${l.source}` : ""}
                  </p>
                </div>
                <a
                  href={waLink(l.phone, `Hi ${l.name.split(" ")[0]}! This is The Tech House — thanks for reaching out about your ${l.service.toLowerCase()}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-full border-2 border-ink bg-[#25D366] px-3 py-1.5 font-display text-[0.65rem] font-black"
                >
                  WHATSAPP
                </a>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border-2 border-ink bg-yellow px-2.5 py-0.5 font-display text-[0.6rem] font-black uppercase">{l.service}</span>
                <span className="rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 font-display text-[0.6rem] font-black uppercase">{l.budget}</span>
              </div>
              <p className="mt-3 text-sm font-semibold">
                📞 {l.phone}
                {l.email && (
                  <>
                    {" · "}
                    <a href={`mailto:${l.email}`} className="underline decoration-orange underline-offset-2">
                      {l.email}
                    </a>
                  </>
                )}
              </p>
              {l.note && <p className="mt-2 rounded-xl bg-cream p-3 text-sm font-medium text-ink/75">“{l.note}”</p>}
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {shownApps.length === 0 && <Empty text="No applications match. New ones show up here the moment they're submitted." />}
          {shownApps.map((a) => (
            <ApplicationRow key={a.id} app={a} onUpdate={update} />
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicationRow({
  app: a,
  onUpdate,
}: {
  app: Application;
  onUpdate: (id: string, patch: { status?: ApplicationStatus; adminNote?: string }) => Promise<boolean>;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(a.adminNote ?? "");
  const [saving, setSaving] = useState(false);

  const links = [
    ["Profile", a.profileUrl],
    ["Best project", a.projectUrl],
    ["Second project", a.secondProjectUrl],
    ["Intro video", a.videoUrl],
  ].filter((l): l is [string, string] => !!l[1]);

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[4px_4px_0_0_#141414]">
      <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5">
        <button type="button" onClick={() => setOpen((v) => !v)} className="min-w-0 flex-1 text-left" aria-expanded={open}>
          <p className="font-display text-lg font-black tracking-tight">
            {a.name} <span className="text-sm text-ink/45">· {a.city}</span>
          </p>
          <p className="text-xs font-bold text-ink/50">
            {a.id} · {a.roleTitle} · {a.experience} · {fmt(a.createdAt)}
          </p>
        </button>
        <select
          value={a.status}
          onChange={(e) => onUpdate(a.id, { status: e.target.value as ApplicationStatus })}
          className={cx("rounded-full border-2 border-ink px-3 py-2 font-display text-xs font-black outline-none", statusTone[a.status])}
          aria-label={`Status for ${a.name}`}
        >
          {applicationStatuses.map((s) => (
            <option key={s.key} value={s.key} className="bg-paper text-ink">
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border-2 border-ink px-3 py-2 font-display text-xs font-black hover:bg-yellow"
        >
          {open ? "HIDE" : "DETAILS"}
        </button>
      </div>

      {open && (
        <div className="grid gap-5 border-t-2 border-ink bg-cream p-4 sm:p-5 md:grid-cols-2">
          <div className="space-y-3 text-sm">
            <p className="font-semibold">
              ✉️ <a className="underline decoration-orange underline-offset-2" href={`mailto:${a.email}`}>{a.email}</a> · 📞 {a.phone}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {a.skills.map((s) => (
                <span key={s} className="rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
            <ul className="space-y-1">
              {links.map(([label, href]) => (
                <li key={label}>
                  <span className="font-bold">{label}: </span>
                  <a href={href} target="_blank" rel="noreferrer" className="break-all text-orange underline underline-offset-2">
                    {href}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              <span className="font-bold">Can start: </span>
              {a.availability}
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-display text-[0.65rem] font-black tracking-[0.14em] text-ink/50">WHAT THEY BUILT</p>
              <p className="mt-1 whitespace-pre-line font-medium">{a.projectNote}</p>
            </div>
            {a.why && (
              <div>
                <p className="font-display text-[0.65rem] font-black tracking-[0.14em] text-ink/50">WHY TTH</p>
                <p className="mt-1 whitespace-pre-line font-medium">{a.why}</p>
              </div>
            )}
            <div>
              <p className="font-display text-[0.65rem] font-black tracking-[0.14em] text-ink/50">PRIVATE NOTES</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-medium outline-none focus:shadow-[3px_3px_0_0_#ff4d00]"
                placeholder="Only visible to admins"
              />
              <button
                type="button"
                disabled={saving || note === (a.adminNote ?? "")}
                onClick={async () => {
                  setSaving(true);
                  await onUpdate(a.id, { adminNote: note });
                  setSaving(false);
                }}
                className="mt-2 rounded-full bg-ink px-4 py-2 font-display text-xs font-black text-cream disabled:opacity-40"
              >
                {saving ? "SAVING…" : "SAVE NOTE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-2xl border-2 border-dashed border-ink/30 bg-paper/60 p-8 text-center text-sm font-medium text-ink/60 md:col-span-2">{text}</p>;
}
