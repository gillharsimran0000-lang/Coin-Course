import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a07",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            background: "#ffce3a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.22), inset 0 6px 0 rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: "50%",
              border: "3px dashed rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#0c0a07",
                fontSize: 72,
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              $
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
