"use client"

import { useEffect, useRef } from "react"
import { paintTowerIcon, type TowerType } from "@/lib/game/engine"

export default function TowerIcon({ type, size = 32 }: { type: TowerType; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width = size * dpr
    cv.height = size * dpr
    const ctx = cv.getContext("2d")!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, size, size)
    // subtle platform disc behind the character
    ctx.fillStyle = "rgba(0,0,0,0.28)"
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2)
    ctx.fill()
    paintTowerIcon(ctx, type, size)
  }, [type, size])
  return <canvas ref={ref} style={{ width: size, height: size }} />
}
