"use client"

import { useEffect, useRef } from "react"

const BARS = 28

export function VoiceVisualizer({ active }: { active: boolean }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const animRef = useRef<number | undefined>(undefined)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!active) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      streamRef.current?.getTracks().forEach(t => t.stop())
      ctxRef.current?.close().catch(() => {})
      analyserRef.current = null
      streamRef.current = null
      barsRef.current.forEach(b => { if (b) b.style.height = "3px" })
      return
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        streamRef.current = stream
        const ctx = new AudioContext()
        ctxRef.current = ctx
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 64
        analyser.smoothingTimeConstant = 0.75
        ctx.createMediaStreamSource(stream).connect(analyser)
        analyserRef.current = analyser

        const data = new Uint8Array(analyser.frequencyBinCount)

        const draw = () => {
          if (!analyserRef.current) return
          analyserRef.current.getByteFrequencyData(data)

          barsRef.current.forEach((bar, i) => {
            if (!bar) return
            const idx = Math.floor((i / BARS) * data.length * 0.6)
            const val = data[idx] / 255
            const h = Math.max(3, val * 52)
            bar.style.height = `${h}px`
          })

          animRef.current = requestAnimationFrame(draw)
        }
        draw()
      })
      .catch(() => {
        // mic denied — animate idle bars as fallback
        let t = 0
        const idle = () => {
          barsRef.current.forEach((bar, i) => {
            if (!bar) return
            bar.style.height = `${4 + Math.sin(t * 0.05 + i * 0.4) * 3}px`
          })
          t++
          animRef.current = requestAnimationFrame(idle)
        }
        idle()
      })

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [active])

  return (
    <div className="flex items-end justify-center gap-[3px] h-14">
      {Array.from({ length: BARS }).map((_, i) => (
        <div
          key={i}
          ref={el => { barsRef.current[i] = el }}
          className="w-1.5 rounded-full bg-rose-500 transition-none"
          style={{ height: "3px" }}
        />
      ))}
    </div>
  )
}
