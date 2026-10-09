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
    <form onSubmit={submit} className="mx-auto max-w-sm rounded-3xl border border-white/15 bg-iron p-7 shadow-pop">
      <h1 className="font-display text-2xl font-black tracking-tight uppercase">Sign in</h1>
      <p className="mt-1 text-sm font-medium text-bone/60">Project enquiries from the website live here.</p>
      <label className="mt-6 block">
        <span className="mb-1.5 block font-display text-[0.7rem] font-black tracking-[0.12em]">PASSWORD</span>
        <input
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-[15px] font-medium outline-none focus:border-red"
        />
      </label>
      {error && <p className="mt-3 text-sm font-bold text-red-bright">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-red py-3.5 font-display text-sm font-bold text-white shadow-pop-deep disabled:opacity-60"
      >
        {loading ? "SIGNING IN…" : "SIGN IN"}
      </button>
    </form>
  );
}
