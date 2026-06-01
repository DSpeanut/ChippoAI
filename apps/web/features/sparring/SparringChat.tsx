"use client"

import { useRef, useState, useEffect } from "react"
import { Swords, Send, RotateCcw, Loader2 } from "lucide-react"
import { useSparringChat } from "./useSparringChat"
import { type SparringMode } from "@/services/api"
import { cn } from "@/lib/utils"

const MODES: { id: SparringMode; label: string; desc: string }[] = [
  { id: "devil", label: "Devil's Advocate", desc: "Agent argues the opposite" },
  { id: "socratic", label: "Socratic", desc: "Agent asks probing questions" },
  { id: "expert", label: "Expert Challenge", desc: "Agent pokes holes in your reasoning" },
]

export function SparringChat() {
  const [topic, setTopic] = useState("")
  const [mode, setMode] = useState<SparringMode>("socratic")
  const [started, setStarted] = useState(false)
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, streaming, error, send, reset } = useSparringChat(topic, mode)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleStart() {
    setStarted(true)
    send(`Let's debate: ${topic || "a topic of your choice"}. I'm ready — open with a challenge.`)
  }

  function handleReset() {
    reset()
    setStarted(false)
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
      setInput("")
    }
  }

  function handleSend() {
    send(input)
    setInput("")
  }

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-72 border-r border-[#D1FAE5] bg-[#F0FDF9] p-4 flex flex-col gap-4 shrink-0">
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Debate Setup</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                disabled={started}
                placeholder="e.g. Transformers, RLHF, Black-Scholes..."
                className="w-full text-xs bg-white border border-[#D1FAE5] rounded-xl px-2.5 py-2 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7] disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Mode</label>
              <div className="space-y-2">
                {MODES.map(m => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex items-start gap-2.5 cursor-pointer p-2.5 rounded-xl border transition-colors",
                      mode === m.id ? "border-[#10B981] bg-[#ECFDF5]" : "border-[#D1FAE5] bg-white hover:border-[#6EE7B7]",
                      started && "pointer-events-none opacity-50"
                    )}
                  >
                    <input
                      type="radio"
                      name="mode"
                      checked={mode === m.id}
                      onChange={() => setMode(m.id)}
                      className="mt-0.5 accent-[#10B981]"
                    />
                    <div>
                      <p className="text-xs text-[#064E3B] font-semibold">{m.label}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-2">
          {started && (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 border border-[#D1FAE5] text-[#4B7C68] text-xs font-semibold px-4 py-2 rounded-xl hover:border-[#6EE7B7] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New Session
            </button>
          )}
          <button
            onClick={handleStart}
            disabled={started || streaming}
            className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#064E3B] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Swords className="h-4 w-4" />
            Start Debate
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-h-0">
        {!started ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 rounded-full bg-white border border-[#D1FAE5] flex items-center justify-center mx-auto mb-6 shadow-md">
                <Swords className="h-10 w-10 text-[#10B981]" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-[#064E3B] mb-2">Sharpen your thinking</h2>
              <p className="text-[#4B7C68] text-sm leading-relaxed">
                Pick a topic, choose a debate mode, and go deep. The sparring partner will challenge your reasoning, ask why, and push back on shallow answers.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              {["Explain your reasoning", "Defend edge cases", "Think deeper"].map(tip => (
                <div key={tip} className="bg-white border border-[#D1FAE5] rounded-xl p-3 text-center shadow-sm">
                  <p className="text-[10px] text-[#4B7C68] font-medium">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-[#ECFDF5] border border-[#D1FAE5] flex items-center justify-center mr-2 mt-0.5 shrink-0">
                      <Swords className="h-3.5 w-3.5 text-[#10B981]" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-[#10B981] text-white rounded-br-sm"
                        : "bg-[#F0FDF9] border border-[#D1FAE5] text-[#064E3B] rounded-bl-sm"
                    )}
                  >
                    {msg.content === "" && msg.role === "assistant" ? (
                      <span className="inline-flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce [animation-delay:300ms]" />
                      </span>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {error && <div className="text-xs text-red-500 text-center py-2">{error}</div>}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-[#D1FAE5] px-4 py-3 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={streaming}
                  placeholder="Make your argument… (Enter to send, Shift+Enter for newline)"
                  rows={1}
                  className="flex-1 resize-none text-sm bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7] disabled:opacity-50 max-h-40 overflow-y-auto"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || streaming}
                  className="p-2.5 rounded-xl bg-[#10B981] hover:bg-[#064E3B] disabled:opacity-40 text-white transition-colors shrink-0"
                >
                  {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
