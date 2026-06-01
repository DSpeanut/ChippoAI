"use client"

import { useState } from "react"
import { mockUsage } from "@/data/mock-data"

export function CostWidget() {
  const [expanded, setExpanded] = useState(false)

  const formatTokens = (n: number) =>
    n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}k`

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 bg-white border border-[#D1FAE5] shadow-sm rounded-xl px-3 py-1.5 text-xs font-medium hover:border-[#6EE7B7] transition-all"
      >
        <span className="text-[#10B981]">⚡</span>
        <span className="text-[#1F2937] font-mono">
          {formatTokens(mockUsage.todayTokens)}
        </span>
        <span className="text-[#9CA3AF]">·</span>
        <span className="text-[#064E3B] font-mono font-semibold">${mockUsage.todayCost.toFixed(2)}</span>
        <span className="text-[#9CA3AF] text-[10px]">today</span>
      </button>

      {expanded && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-[#D1FAE5] rounded-2xl shadow-lg z-50 p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#ECFDF5]">
              <span className="text-[#4B7C68] text-xs font-medium">Today</span>
              <div className="flex gap-3">
                <span className="text-[#1F2937] font-mono text-xs">{formatTokens(mockUsage.todayTokens)}</span>
                <span className="text-[#064E3B] font-mono text-xs font-semibold">${mockUsage.todayCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#ECFDF5]">
              <span className="text-[#4B7C68] text-xs font-medium">This month</span>
              <div className="flex gap-3">
                <span className="text-[#1F2937] font-mono text-xs">{formatTokens(mockUsage.monthTokens)}</span>
                <span className="text-[#064E3B] font-mono text-xs font-semibold">${mockUsage.monthCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(mockUsage.breakdown).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] text-xs capitalize">{key}</span>
                  <div className="flex gap-3">
                    <span className="text-[#4B7C68] font-mono text-xs">{formatTokens(val.tokens)}</span>
                    <span className="text-[#4B7C68] font-mono text-xs">${val.cost.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
