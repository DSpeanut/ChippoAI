"use client"

import { useState } from "react"
import { sparringChat, type ChatMessage, type SparringMode } from "@/services/api"

export function useSparringChat(topic: string, mode: SparringMode) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(userText: string) {
    if (!userText.trim() || streaming) return

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userText }]
    setMessages(newMessages)
    setStreaming(true)
    setError(null)

    try {
      const res = await sparringChat({ messages: newMessages, topic, mode })

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

  function reset() {
    setMessages([])
    setError(null)
  }

  return { messages, streaming, error, send, reset }
}
