/** Small, dependency-free input helpers shared by the API routes. */

export const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

export const cleanMultiline = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.replace(/\r\n/g, "\n").trim().slice(0, max) : "";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export const isPhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 && /^[+0-9 ()-]+$/.test(v);
};

/** Accepts "example.com/x" too — adds https:// when the scheme is missing. */
export const normaliseUrl = (v: string) => {
  if (!v) return "";
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : "";
  } catch {
    return "";
  }
};

export const stringArray = (v: unknown, allowed?: readonly string[], max = 20) =>
  Array.isArray(v)
    ? v
        .filter((x): x is string => typeof x === "string")
        .map((x) => x.trim().slice(0, 60))
        .filter((x) => x && (!allowed || allowed.includes(x)))
        .slice(0, max)
    : [];

/** Very small in-memory rate limiter (per server instance). */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

export const clientKey = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
