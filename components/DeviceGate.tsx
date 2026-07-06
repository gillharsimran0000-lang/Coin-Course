"use client"

import { useEffect, useState } from "react"

type Device = "mobile" | "desktop"

export default function DeviceGate() {
  const [show, setShow] = useState(false)
  const [detected, setDetected] = useState<Device>("desktop")

  useEffect(() => {
    const saved = localStorage.getItem("cc-device")
    if (!saved) {
      setDetected(window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop")
      setShow(true)
    }
  }, [])

  const pick = (d: Device) => {
    localStorage.setItem("cc-device", d)
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="dg-backdrop">
      <div className="dg-card">
        <div className="dg-logo">Coin Course</div>
        <h2 className="dg-title">What are you using?</h2>
        <p className="dg-sub">We&apos;ll adjust controls and layouts to fit your device.</p>
        <div className="dg-options">
          <button className="dg-opt" onClick={() => pick("mobile")}>
            <span className="dg-opt-label">
              Phone or Tablet
              {detected === "mobile" && <span className="dg-badge">detected</span>}
            </span>
            <span className="dg-opt-desc">Touch-friendly controls throughout</span>
          </button>
          <button className="dg-opt" onClick={() => pick("desktop")}>
            <span className="dg-opt-label">
              Computer
              {detected === "desktop" && <span className="dg-badge">detected</span>}
            </span>
            <span className="dg-opt-desc">Mouse and keyboard shortcuts</span>
          </button>
        </div>
        <p className="dg-note">You can change this anytime in the game menu.</p>
      </div>
    </div>
  )
}
