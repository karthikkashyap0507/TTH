"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Lead } from "@/lib/store";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

const waLink = (phone: string, text: string) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export function AdminDashboard({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const needle = q.trim().toLowerCase();
  const shownLeads = leads.filter((l) => !needle || JSON.stringify(l).toLowerCase().includes(needle));

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  function exportCsv() {
    const rows: string[][] = [
      ["id", "date", "name", "phone", "email", "service", "budget", "note", "source"],
      ...shownLeads.map((l) => [l.id, l.createdAt, l.name, l.phone, l.email ?? "", l.service, l.budget, l.note ?? "", l.source ?? ""]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `tsh-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-xl font-black tracking-tight uppercase">
          Project enquiries <span className="text-bone/40">{leads.length}</span>
        </h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-iron px-4 py-2.5 text-sm font-medium outline-none focus:border-red sm:max-w-xs"
        />
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={exportCsv} className="rounded-full border border-white/15 bg-iron px-4 py-2.5 font-display text-xs font-black hover:border-red hover:bg-red/10">
            EXPORT CSV
          </button>
          <button type="button" onClick={() => router.refresh()} className="rounded-full border border-white/15 bg-iron px-4 py-2.5 font-display text-xs font-black hover:border-red hover:bg-red/10">
            REFRESH
          </button>
          <button type="button" onClick={logout} className="rounded-full bg-red px-4 py-2.5 font-display text-xs font-black text-white hover:bg-red-bright">
            LOG OUT
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {shownLeads.length === 0 && (
          <Empty text={needle ? "No enquiries match your search." : "No project enquiries yet. They'll appear here as soon as someone uses the wizard."} />
        )}
        {shownLeads.map((l) => (
          <article key={l.id} className="rounded-2xl border border-white/15 bg-iron p-5 shadow-pop">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-black tracking-tight">{l.name}</p>
                <p className="text-xs font-bold text-bone/50">
                  {l.id} · {fmt(l.createdAt)}
                  {l.source ? ` · via ${l.source}` : ""}
                </p>
              </div>
              <a
                href={waLink(l.phone, `Hi ${l.name.split(" ")[0]}! This is The Scale House — thanks for reaching out about your ${l.service.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-white/15 bg-[#25D366] px-3 py-1.5 font-display text-[0.65rem] font-black"
              >
                WHATSAPP
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-red px-2.5 py-0.5 font-display text-[0.6rem] font-black uppercase">{l.service}</span>
              <span className="rounded-full border border-white/15 bg-ink px-2.5 py-0.5 font-display text-[0.6rem] font-black uppercase">{l.budget}</span>
            </div>
            <p className="mt-3 text-sm font-semibold">
              📞 {l.phone}
              {l.email && (
                <>
                  {" · "}
                  <a href={`mailto:${l.email}`} className="underline decoration-red underline-offset-2">
                    {l.email}
                  </a>
                </>
              )}
            </p>
            {l.note && <p className="mt-2 rounded-xl bg-ink p-3 text-sm font-medium text-bone/75">“{l.note}”</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-2xl border-2 border-dashed border-white/15 bg-iron/50 p-8 text-center text-sm font-medium text-bone/60 md:col-span-2">{text}</p>;
}
