import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/* ==========================================================================
   Minimal admin auth: one password (ADMIN_PASSWORD) -> signed cookie.
   Good enough for a small studio dashboard. No password set = admin off.
   ========================================================================== */

export const ADMIN_COOKIE = "tsh_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";

export const adminEnabled = () => !!process.env.ADMIN_PASSWORD;

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && safeEqual(sign(input), sign(expected));
}

export function makeSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !adminEnabled()) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expires = Number(payload.split(".")[1]);
  if (!expires || expires < Date.now() / 1000) return false;
  return safeEqual(sig, sign(payload));
}

export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export const sessionCookie = (token: string) => ({
  name: ADMIN_COOKIE,
  value: token,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
});
