"use client"

import { useState } from "react"
import { X, Trash2, ExternalLink } from "lucide-react"
import type { Application } from "@/lib/pipeline"

const STAGES = [
  { id: "wishlist",     label: "To-Do" },
  { id: "applied",      label: "Applied" },
  { id: "phone_screen", label: "Phone Screen" },
  { id: "onsite",       label: "Interview" },
  { id: "offer",        label: "Offer" },
  { id: "rejected",     label: "Rejected" },
]

interface Props {
  app: Application
  onSave: (fields: Partial<Omit<Application, "id">>) => void
  onDelete: () => void
  onClose: () => void
}

export function EditApplicationModal({ app, onSave, onDelete, onClose }: Props) {
  const [company, setCompany] = useState(app.company)
  const [role, setRole] = useState(app.role)
  const [url, setUrl] = useState(app.url)
  const [appliedAt, setAppliedAt] = useState(app.appliedAt)
  const [status, setStatus] = useState(app.status)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return
    onSave({ company: company.trim(), role: role.trim(), url: url.trim(), appliedAt, status })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#064E3B]">Edit Application</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#064E3B] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Company *</label>
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              autoFocus
              className="w-full text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Role *</label>
            <input
              type="text"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Job URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
              />
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 border border-[#D1FAE5] rounded-xl text-[#9CA3AF] hover:text-[#10B981] hover:border-[#6EE7B7] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Applied Date</label>
            <input
              type="date"
              value={appliedAt}
              onChange={e => setAppliedAt(e.target.value)}
              className="w-full text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] focus:outline-none focus:border-[#6EE7B7]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Stage</label>
            <div className="grid grid-cols-3 gap-2">
              {STAGES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStatus(s.id)}
                  className={`text-xs py-1.5 px-2 rounded-lg border font-medium transition-colors ${
                    status === s.id
                      ? "bg-[#10B981] border-[#10B981] text-white"
                      : "bg-[#F0FDF9] border-[#D1FAE5] text-[#4B7C68] hover:border-[#6EE7B7]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-1.5 text-sm font-semibold text-rose-500 border border-rose-200 py-2.5 px-3 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm font-semibold text-[#4B7C68] border border-[#D1FAE5] py-2.5 rounded-xl hover:border-[#6EE7B7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!company.trim() || !role.trim()}
              className="flex-1 text-sm font-semibold bg-[#10B981] hover:bg-[#064E3B] disabled:opacity-50 text-white py-2.5 rounded-xl transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
