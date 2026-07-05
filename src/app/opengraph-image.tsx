import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card used for every route that doesn't declare its own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #ffffff 0%, #fef4f4 55%, #fde3e4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            color: "#f1575e",
            letterSpacing: -1,
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#22262e",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#57647c",
              maxWidth: 860,
            }}
          >
            AI-powered diagnostics for IVF.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 12,
            width: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #f1575e 0%, #ff4800 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
