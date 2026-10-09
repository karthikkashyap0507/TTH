import type { Metadata } from "next";
import { adminEnabled, isAdmin } from "@/lib/auth";
import { store } from "@/lib/store";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ScaleMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminEnabled()) {
    return (
      <Shell>
        <div className="mx-auto max-w-lg rounded-3xl border border-white/15 bg-iron p-8 shadow-pop">
          <h1 className="font-display text-2xl font-black tracking-tight uppercase">Admin is switched off</h1>
          <p className="mt-3 text-sm font-medium text-bone/70">
            Add <code className="rounded bg-white/10 px-1.5 py-0.5 font-bold">ADMIN_PASSWORD=your-secret</code> to{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-bold">.env.local</code> (or your host&apos;s environment
            variables) and restart the server.
          </p>
        </div>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <AdminLogin />
      </Shell>
    );
  }

  const leads = await store().listLeads();

  return (
    <Shell>
      <AdminDashboard leads={leads} />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dot-grid min-h-svh">
      <header className="border-b border-white/10 bg-ink">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2.5 px-4 sm:px-6">
          <ScaleMark className="size-8" />
          <span className="font-display text-lg font-black tracking-tight">TSH ADMIN</span>
          <a href="/" className="ml-auto font-display text-xs font-bold tracking-wide text-bone/60 hover:text-red-bright">
            VIEW SITE ↗
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
