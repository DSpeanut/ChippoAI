const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export function sparringChat(body: {
  messages: ChatMessage[]
  topic: string
}) {
  return fetch(`${API_URL}/sparring/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}
