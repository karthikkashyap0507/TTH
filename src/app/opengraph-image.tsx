import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site, tagline } from "@/content/site";

export const alt = `${site.name} — ${tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's display font (Archivo Black, SIL Open Font License — see assets/fonts/OFL.txt)
const archivoBlack = readFile(join(process.cwd(), "assets/fonts/Archivo-900.ttf"));

/** Social share card (the preview on WhatsApp, LinkedIn, X…), generated at build time. */
export default async function OpengraphImage() {
  const [first, highlight, ...rest] = site.wordmark.split(" ");
  const line = { fontSize: 60, lineHeight: 1.04, letterSpacing: -1.5, whiteSpace: "nowrap" } as const;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(227,18,28,0.45), transparent 45%), radial-gradient(rgba(245,242,237,0.09) 2px, transparent 2px)",
          backgroundSize: "100% 100%, 36px 36px",
          color: "#f5f2ed",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "#000000",
              border: "2px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 100 100">
              <path d="M5 94.7 41.2 22.5 50 39.8 22.3 94.7Z" fill="#d8394a" />
              <path d="M50 5.4 95 94.7H77.7L41.2 22.5Z" fill="#ff1a33" />
              <rect x="37.5" y="84.8" width="25" height="9.9" fill="#ff2f40" />
            </svg>
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 36, letterSpacing: -0.5 }}>
            <span>{first}</span>
            <span style={{ color: "#ff3d46" }}>{highlight}</span>
            <span>{rest.join(" ")}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* tagline over three lines, last line in red */}
          <div style={line}>THE PERFORMANCE PARTNER</div>
          <div style={line}>BEHIND YOUR FAVORITE</div>
          <div style={{ ...line, color: "#ff3d46" }}>FASHION BRANDS.</div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["PERFORMANCE ADS", "WEB & APPS", "CRM · ERP · AI"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                border: i === 2 ? "3px solid rgba(255,255,255,0.35)" : "3px solid #0a0a0a",
                background: i === 0 ? "#e3121c" : i === 1 ? "#f5f2ed" : "#0a0a0a",
                color: i === 1 ? "#0a0a0a" : "#ffffff",
                fontSize: 24,
                boxShadow: i === 0 ? "6px 6px 0 0 #f5f2ed" : "6px 6px 0 0 #e3121c",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: await archivoBlack, style: "normal", weight: 900 }],
    },
  );
}
