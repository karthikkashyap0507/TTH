import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { roles } from "@/content/careers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const pages = ["", "/work", "/why-us", "/about", "/careers", ...roles.map((r) => `/careers/${r.slug}`)];
  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("/careers/") ? 0.5 : 0.8,
  }));
}
