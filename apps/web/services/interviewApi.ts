const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export async function fetchQuestions(body: {
  category: string
  difficulty: string
  total_questions: number
}): Promise<string[]> {
  const res = await fetch(`${API_URL}/interview/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error("Failed to generate questions")
  const data = await res.json()
  return data.questions as string[]
}

export function fetchReport(body: {
  category: string
  difficulty: string
  qa_pairs: { question: string; answer: string }[]
}): Promise<Response> {
  return fetch(`${API_URL}/interview/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}
