"use client"

import { useState, useEffect, useRef } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { getApplications, addApplication, updateStatus, updateApplication, removeApplication, type Application } from "@/lib/pipeline"
import { AddApplicationModal } from "./AddApplicationModal"
import { EditApplicationModal } from "./EditApplicationModal"
import { ApplicationHeatmap } from "./ApplicationHeatmap"

const COLUMNS = [
  { id: "wishlist",     label: "To-Do",         dot: "bg-stone-400",   text: "text-stone-600",   bg: "bg-stone-50" },
  { id: "applied",      label: "Applied",       dot: "bg-blue-400",    text: "text-blue-700",    bg: "bg-blue-50" },
  { id: "phone_screen", label: "Phone Screen",  dot: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50" },
  { id: "onsite",       label: "Interview",     dot: "bg-orange-500",  text: "text-orange-700",  bg: "bg-orange-50" },
  { id: "offer",        label: "Offer",         dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  { id: "rejected",     label: "Rejected",      dot: "bg-rose-400",    text: "text-rose-700",    bg: "bg-rose-50" },
]

export function PipelineBoard() {
  const [apps, setApps] = useState<Application[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingApp, setEditingApp] = useState<Application | null>(null)
  const [dragOverCol, setDragOverCol] = useState<string | null>(null)
  const draggedId = useRef<string | null>(null)

  useEffect(() => {
    setApps(getApplications())
  }, [])

  function handleAdd(data: { company: string; role: string; url: string; appliedAt: string; status: string }) {
    const app = addApplication(data)
    setApps(prev => [...prev, app])
  }

  function handleDragStart(id: string) {
    draggedId.current = id
  }

  function handleDrop(colId: string) {
    const id = draggedId.current
    if (!id) return
    updateStatus(id, colId)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: colId } : a))
    draggedId.current = null
    setDragOverCol(null)
  }

  function handleEdit(fields: Partial<Omit<Application, "id">>) {
    if (!editingApp) return
    const updated = updateApplication(editingApp.id, fields)
    setApps(prev => prev.map(a => a.id === updated.id ? updated : a))
  }

  function handleRemove(id: string) {
    removeApplication(id)
    setApps(prev => prev.filter(a => a.id !== id))
    setEditingApp(null)
  }

  function formatDate(iso: string) {
    if (!iso) return "—"
    const d = new Date(iso)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <>
      <div className="h-full flex flex-col overflow-hidden bg-white" onDragEnd={() => setDragOverCol(null)}>
        <div className="p-4 border-b border-[#D1FAE5] bg-white flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-base font-semibold text-[#064E3B]">Application Pipeline</h1>
            <p className="text-xs text-[#4B7C68] mt-0.5">{apps.length} application{apps.length !== 1 ? "s" : ""} tracked</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-xs bg-[#10B981] hover:bg-[#064E3B] text-white px-3 py-2 rounded-xl transition-colors font-semibold shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Application
          </button>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-3 p-4 h-full min-w-full">
            {COLUMNS.map(col => {
              const cards = apps.filter(a => a.status === col.id)
              return (
                <div
                  key={col.id}
                  className="flex-1 min-w-44 flex flex-col gap-2"
                  onDragOver={e => { e.preventDefault(); setDragOverCol(col.id) }}
                  onDragLeave={() => setDragOverCol(null)}
                  onDrop={() => handleDrop(col.id)}
                >
                  <div className="flex items-center gap-2 px-1 mb-1">
                    <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className={`text-xs font-bold ${col.text}`}>{col.label}</span>
                    <span className="text-[10px] text-[#9CA3AF] ml-auto font-medium">{cards.length}</span>
                  </div>

                  <div
                    className={cn(
                      "flex flex-col gap-2 overflow-y-auto flex-1 rounded-xl p-1 transition-colors min-h-20",
                      dragOverCol === col.id && "bg-[#F0FDF9] ring-2 ring-[#6EE7B7]"
                    )}
                  >
                    {cards.map(app => (
                      <div
                        key={app.id}
                        draggable
                        onDragStart={e => { e.stopPropagation(); handleDragStart(app.id) }}
                        onClick={() => setEditingApp(app)}
                        className="bg-white border border-[#D1FAE5] hover:border-[#6EE7B7] hover:shadow-md rounded-xl p-3 cursor-pointer active:cursor-grabbing transition-all group"
                      >
                        <p className="text-xs font-bold text-[#1F2937] group-hover:text-[#10B981] leading-tight transition-colors mb-1.5">{app.company}</p>
                        <p className="text-[10px] text-[#4B7C68] leading-tight mb-2 font-medium">{app.role}</p>
                        <span className="text-[10px] text-[#9CA3AF]">Applied {formatDate(app.appliedAt)}</span>
                      </div>
                    ))}

                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full border-2 border-dashed border-[#D1FAE5] hover:border-[#6EE7B7] rounded-xl p-2 text-[10px] text-[#9CA3AF] hover:text-[#10B981] transition-colors flex items-center justify-center gap-1 font-medium"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <ApplicationHeatmap apps={apps} />
      </div>

      {showModal && (
        <AddApplicationModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}

      {editingApp && (
        <EditApplicationModal
          app={editingApp}
          onSave={handleEdit}
          onDelete={() => handleRemove(editingApp.id)}
          onClose={() => setEditingApp(null)}
        />
      )}
    </>
  )
}
