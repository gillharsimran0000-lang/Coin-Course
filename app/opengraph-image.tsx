import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a07",
          backgroundImage:
            "radial-gradient(circle at 22% 20%, rgba(255,206,58,0.16), transparent 45%), radial-gradient(circle at 82% 85%, rgba(255,206,58,0.10), transparent 50%)",
        }}
      >
        <div
          style={{
            width: 168,
            height: 168,
            borderRadius: "50%",
            background: "#ffce3a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
            boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.22), inset 0 8px 0 rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              width: 142,
              height: 142,
              borderRadius: "50%",
              border: "4px dashed rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", color: "#0c0a07", fontSize: 92, fontWeight: 700, fontStyle: "italic" }}>
              $
            </div>
          </div>
        </div>
        <div style={{ display: "flex", color: "#f6efd9", fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
          Coin Course
        </div>
        <div style={{ display: "flex", color: "rgba(246,239,217,0.65)", fontSize: 28, marginTop: 18 }}>
          Free financial literacy for every age
        </div>
      </div>
    ),
    { ...size }
  )
}
