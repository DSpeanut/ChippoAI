"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface Props {
  onAdd: (app: { company: string; role: string; url: string; appliedAt: string; status: string }) => void
  onClose: () => void
}

export function AddApplicationModal({ onAdd, onClose }: Props) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [url, setUrl] = useState("")
  const [appliedAt, setAppliedAt] = useState(new Date().toISOString().split("T")[0])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return
    onAdd({ company: company.trim(), role: role.trim(), url: url.trim(), appliedAt, status: "wishlist" })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#064E3B]">Add Application</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#064E3B] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Company *</label>
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="e.g. Anthropic"
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
              placeholder="e.g. ML Engineer"
              className="w-full text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] block mb-1.5">Job URL</label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
            />
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

          <div className="flex gap-2 pt-1">
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
