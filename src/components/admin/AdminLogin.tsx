"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Couldn't sign in.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm rounded-3xl border-2 border-ink bg-paper p-7 shadow-[7px_7px_0_0_#141414]">
      <h1 className="font-display text-2xl font-black tracking-tight uppercase">Sign in</h1>
      <p className="mt-1 text-sm font-medium text-ink/60">Leads and job applications live here.</p>
      <label className="mt-6 block">
        <span className="mb-1.5 block font-display text-[0.7rem] font-black tracking-[0.12em]">PASSWORD</span>
        <input
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border-2 border-ink bg-cream px-4 py-3 text-[15px] font-medium outline-none focus:shadow-[3px_3px_0_0_#ff4d00]"
        />
      </label>
      {error && <p className="mt-3 text-sm font-bold text-orange">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-ink py-3.5 font-display text-sm font-bold text-cream shadow-[4px_4px_0_0_#ff4d00] disabled:opacity-60"
      >
        {loading ? "SIGNING IN…" : "SIGN IN"}
      </button>
    </form>
  );
}
