"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import type { Application } from "@/lib/pipeline"

const DAY_LABELS = ["", "M", "", "W", "", "F", ""]
const NUM_WEEKS = 52
const GAP = 3
const LABEL_W = 18

function cellColor(count: number) {
  if (count === 0) return "#E5E7EB"
  if (count === 1) return "#D1FAE5"
  if (count === 2) return "#6EE7B7"
  return "#10B981"
}

export function ApplicationHeatmap({ apps }: { apps: Application[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState(12)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      const size = Math.max(8, Math.floor((w - LABEL_W - GAP - (NUM_WEEKS - 1) * GAP) / NUM_WEEKS))
      setCellSize(size)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { weeks, monthLabels, total } = useMemo(() => {
    const counts: Record<string, number> = {}
    apps.forEach(app => {
      const key = app.appliedAt?.split("T")[0]
      if (key) counts[key] = (counts[key] || 0) + 1
    })

    // Rolling 1 year: start from the Sunday 51 weeks before the most recent Sunday
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = new Date(today)
    start.setDate(today.getDate() - today.getDay() - 51 * 7)

    const weeks: { date: Date; count: number }[][] = []
    const monthLabels: { label: string; col: number }[] = []
    const cur = new Date(start)
    let lastMonth = -1

    for (let w = 0; w < NUM_WEEKS; w++) {
      const week: { date: Date; count: number }[] = []
      for (let d = 0; d < 7; d++) {
        const key = cur.toISOString().split("T")[0]
        if (d === 0 && cur.getMonth() !== lastMonth) {
          monthLabels.push({ label: cur.toLocaleDateString("en-US", { month: "short" }), col: w })
          lastMonth = cur.getMonth()
        }
        week.push({ date: new Date(cur), count: counts[key] || 0 })
        cur.setDate(cur.getDate() + 1)
      }
      weeks.push(week)
    }

    return { weeks, monthLabels, total: Object.values(counts).reduce((a, b) => a + b, 0) }
  }, [apps])

  const colPx = cellSize + GAP

  return (
    <div ref={containerRef} className="shrink-0 border-t border-[#D1FAE5] bg-[#F0FDF9] px-6 py-4">
      <p className="text-xs font-semibold text-[#064E3B] mb-3">
        {total} application{total !== 1 ? "s" : ""} in the last year
      </p>

      {/* Month labels */}
      <div className="relative" style={{ marginLeft: LABEL_W + GAP, height: 16, marginBottom: 4 }}>
        {monthLabels.map(m => (
          <span
            key={m.col}
            className="absolute text-[9px] text-[#9CA3AF] font-medium"
            style={{ left: m.col * colPx }}
          >
            {m.label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="flex" style={{ gap: GAP }}>
        {/* Day labels */}
        <div className="flex flex-col shrink-0" style={{ gap: GAP, width: LABEL_W }}>
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-end text-[9px] text-[#9CA3AF] pr-1"
              style={{ height: cellSize }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}: ${day.count} application${day.count !== 1 ? "s" : ""}`}
                className="rounded-sm cursor-default"
                style={{ width: cellSize, height: cellSize, backgroundColor: cellColor(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[9px] text-[#9CA3AF]">Less</span>
        {["#E5E7EB", "#D1FAE5", "#6EE7B7", "#10B981"].map(c => (
          <div key={c} className="rounded-sm" style={{ width: cellSize, height: cellSize, backgroundColor: c }} />
        ))}
        <span className="text-[9px] text-[#9CA3AF]">More</span>
      </div>
    </div>
  )
}
