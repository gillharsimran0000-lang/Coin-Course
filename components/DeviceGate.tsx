"use client"

import { useEffect } from "react"

type Device = "mobile" | "desktop"

export default function DeviceGate() {
  useEffect(() => {
    const saved = localStorage.getItem("cc-device")
    if (!saved) {
      const detected: Device = window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop"
      localStorage.setItem("cc-device", detected)
    }
  }, [])

  return null
}
