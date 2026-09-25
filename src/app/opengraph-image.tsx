import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Brands, Websites & AI Automation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time. */
export default async function OpengraphImage() {
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
          background: "#faf3e5",
          backgroundImage: "radial-gradient(rgba(20,20,20,0.14) 2px, transparent 2px)",
          backgroundSize: "36px 36px",
          color: "#141414",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "#141414",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="46" height="46" viewBox="0 0 64 64" fill="none" stroke="#ff4d00" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 30 32 8l25 22" />
              <path d="M15 26v29h34V26" />
              <path d="M32 38v17" />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>{site.wordmark}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3 }}>WE BUILD BRANDS,</div>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3 }}>WEBSITES & BOTS</div>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3, color: "#ff4d00" }}>ALL IN-HOUSE.</div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["BRAND IDENTITY", "WEBSITES", "AI AGENTS"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                border: "4px solid #141414",
                background: i === 0 ? "#ffc72e" : i === 1 ? "#ff4d00" : "#141414",
                color: i === 0 ? "#141414" : "#faf3e5",
                fontSize: 26,
                fontWeight: 900,
                boxShadow: "6px 6px 0 0 #141414",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
