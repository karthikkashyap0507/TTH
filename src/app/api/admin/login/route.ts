import { NextResponse } from "next/server";
import { adminEnabled, checkPassword, makeSessionToken, sessionCookie } from "@/lib/auth";
import { clientKey, rateLimited } from "@/lib/validate";

export async function POST(req: Request) {
  if (!adminEnabled()) {
    return NextResponse.json({ error: "Admin is disabled. Set ADMIN_PASSWORD in your environment." }, { status: 503 });
  }
  if (rateLimited(`admin-login:${clientKey(req)}`, 6, 5 * 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie(makeSessionToken()));
  return res;
}
