"use client"

import { useRef, useState, useEffect } from "react"
import { Swords, Send, RotateCcw, Loader2 } from "lucide-react"
import { useSparringChat } from "./useSparringChat"
import { cn } from "@/lib/utils"

export function SparringChat() {
  const [topic, setTopic] = useState("")
  const [started, setStarted] = useState(false)
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, streaming, error, start, send, reset } = useSparringChat(topic)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleStart() {
    if (!topic.trim()) return
    setStarted(true)
    await start()
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
    <div className="h-full flex flex-col bg-white">
      {!started ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 rounded-full bg-white border border-[#D1FAE5] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Swords className="h-10 w-10 text-[#10B981]" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-[#064E3B] mb-2">Sharpen your thinking</h2>
            <p className="text-[#4B7C68] text-sm leading-relaxed">
              Enter a topic you want to explore. Your sparring partner will open with a question — debate back, defend your reasoning, and expect to be pushed.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
            {["Defend edge cases", "Think from both sides", "Spot your blind spots"].map(tip => (
              <div key={tip} className="bg-white border border-[#D1FAE5] rounded-xl p-3 text-center shadow-sm">
                <p className="text-[10px] text-[#4B7C68] font-medium">{tip}</p>
              </div>
            ))}
          </div>

          <div className="w-full max-w-sm space-y-2">
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleStart() }}
              placeholder="e.g. Transformers, RLHF, Black-Scholes..."
              className="w-full text-sm bg-white border border-[#D1FAE5] rounded-xl px-3 py-2.5 text-[#064E3B] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6EE7B7]"
            />
            <button
              onClick={handleStart}
              disabled={!topic.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#064E3B] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <Swords className="h-4 w-4" />
              Start
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#D1FAE5] bg-[#F0FDF9] shrink-0">
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#064E3B]">{topic}</span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-[#4B7C68] hover:text-[#064E3B] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New Session
            </button>
          </div>

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
                placeholder="Respond to the challenge… (Enter to send, Shift+Enter for newline)"
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
  )
}
