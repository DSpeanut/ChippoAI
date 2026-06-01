import type { CodeSnapshot } from "@/data/mock-data"

export function CodeSnapshotBlock({ snapshot }: { snapshot: CodeSnapshot }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#1E293B] bg-[#0F172A] text-[10pt] font-mono">
      {snapshot.label && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border-b border-[#334155]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          </div>
          <span className="text-[9pt] text-[#94A3B8] ml-1">{snapshot.label}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto leading-relaxed text-[#E2E8F0] whitespace-pre">
        <code>{snapshot.code}</code>
      </pre>
    </div>
  )
}
