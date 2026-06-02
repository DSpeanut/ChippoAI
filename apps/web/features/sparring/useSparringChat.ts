"use client"

import { useState } from "react"
import { sparringChat, type ChatMessage } from "@/services/api"

export function useSparringChat(topic: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function streamResponse(history: ChatMessage[]) {
    setStreaming(true)
    setError(null)

    try {
      const res = await sparringChat({ messages: history, topic })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Request failed")
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n").filter(l => l.startsWith("data: "))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === "[DONE]") break
          try {
            const token = JSON.parse(data) as string
            setMessages(prev => [
              ...prev.slice(0, -1),
              { role: "assistant", content: prev[prev.length - 1].content + token },
            ])
          } catch {
            // skip malformed lines
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setStreaming(false)
    }
  }

  // AI speaks first — no user message shown
  async function start() {
    if (streaming) return
    await streamResponse([])
  }

  async function send(userText: string) {
    if (!userText.trim() || streaming) return
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userText }]
    setMessages(newMessages)
    await streamResponse(newMessages)
  }

  function reset() {
    setMessages([])
    setError(null)
  }

  return { messages, streaming, error, start, send, reset }
}
