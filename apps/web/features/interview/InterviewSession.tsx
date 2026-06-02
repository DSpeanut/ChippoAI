"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Mic, MicOff, Square, Loader2, RotateCcw, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useVoiceAgent } from "./useVoiceAgent"
import { VoiceVisualizer } from "./VoiceVisualizer"
import { fetchQuestions, fetchReport } from "@/services/interviewApi"

type Phase = "generating" | "asking" | "listening" | "recording" | "processing" | "reporting" | "complete"

interface QAPair { question: string; answer: string }

interface Props {
  category: string
  difficulty: string
  totalQuestions: number
  onReset: () => void
}

export function InterviewSession({ category, difficulty, totalQuestions, onReset }: Props) {
  const [phase, setPhase] = useState<Phase>("generating")
  const [questions, setQuestions] = useState<string[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<QAPair[]>([])
  const [transcript, setTranscript] = useState("")
  const [report, setReport] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const { speak, stopSpeaking, listen, stopListening } = useVoiceAgent()
  const initialized = useRef(false)

  const askQuestion = useCallback(async (q: string) => {
    setPhase("asking")
    setIsSpeaking(true)
    await speak(q)
    setIsSpeaking(false)
    setPhase("listening")
  }, [speak])

  // Generate questions on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    fetchQuestions({ category, difficulty, total_questions: totalQuestions })
      .then(qs => {
        setQuestions(qs)
        askQuestion(qs[0])
      })
      .catch(e => {
        setError(e.message)
        setPhase("asking")
      })
  }, [category, difficulty, totalQuestions, askQuestion])

  async function handleMicTap() {
    if (phase !== "listening") return
    setPhase("recording")
    try {
      const text = await listen()
      setPhase("processing")
      if (!text.trim()) {
        // Nothing captured — go back to listening
        setPhase("listening")
        return
      }
      setTranscript(text)
      const newAnswers = [...answers, { question: questions[qIndex], answer: text }]
      setAnswers(newAnswers)

      const next = qIndex + 1
      if (next >= questions.length) {
        setPhase("reporting")
        await generateReport(newAnswers)
      } else {
        setQIndex(next)
        await askQuestion(questions[next])
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Mic error")
      setPhase("listening")
    }
  }

  async function generateReport(pairs: QAPair[]) {
    setReport("")
    try {
      const res = await fetchReport({ category, difficulty, qa_pairs: pairs })
      if (!res.ok) throw new Error("Report generation failed")
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value).split("\n").filter(l => l.startsWith("data: "))
        for (const line of lines) {
          const data = line.slice(6)
          if (data === "[DONE]") break
          try { full += JSON.parse(data) as string; setReport(full) } catch { /* skip */ }
        }
      }
      setPhase("complete")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Report error")
      setPhase("complete")
    }
  }

  function handleReset() {
    stopSpeaking()
    stopListening()
    onReset()
  }

  const progress = questions.length > 0 ? ((qIndex) / questions.length) * 100 : 0

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#D1FAE5] bg-[#F0FDF9] shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#064E3B]">{category}</span>
          <span className="text-xs text-[#9CA3AF]">·</span>
          <span className="text-xs text-[#4B7C68]">{difficulty}</span>
          {questions.length > 0 && phase !== "reporting" && phase !== "complete" && (
            <>
              <span className="text-xs text-[#9CA3AF]">·</span>
              <span className="text-xs text-[#4B7C68]">Q {qIndex + 1} / {questions.length}</span>
            </>
          )}
        </div>
        <button onClick={handleReset} className="flex items-center gap-1.5 text-xs text-[#4B7C68] hover:text-[#064E3B] transition-colors">
          <RotateCcw className="h-3.5 w-3.5" />
          New Session
        </button>
      </div>

      {/* Progress bar */}
      {questions.length > 0 && (
        <div className="h-1 bg-[#F0FDF9] shrink-0">
          <div className="h-1 bg-[#10B981] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Generating */}
        {phase === "generating" && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Loader2 className="h-8 w-8 text-[#10B981] animate-spin" />
            <p className="text-sm text-[#4B7C68]">Preparing your {totalQuestions} questions…</p>
          </div>
        )}

        {/* Active interview */}
        {(phase === "asking" || phase === "listening" || phase === "recording" || phase === "processing") && questions.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-6">
            {answers.map((qa, i) => (
              <div key={i} className="space-y-2">
                <div className="bg-[#F0FDF9] border border-[#D1FAE5] rounded-2xl px-4 py-3">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">Q{i + 1}</p>
                  <p className="text-sm text-[#064E3B]">{qa.question}</p>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#10B981] text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                    <p className="text-[10px] font-bold text-green-100 uppercase mb-1">Your answer</p>
                    <p className="text-sm">{qa.answer}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#F0FDF9] border-2 border-[#6EE7B7] rounded-2xl px-4 py-4">
              <p className="text-[10px] font-bold text-[#10B981] uppercase mb-2">Question {qIndex + 1}</p>
              <p className="text-sm text-[#064E3B] leading-relaxed">{questions[qIndex]}</p>
            </div>

            {phase === "processing" && transcript && (
              <div className="flex justify-end">
                <div className="bg-[#10B981] text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] opacity-70">
                  <p className="text-sm">{transcript}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Report */}
        {(phase === "reporting" || phase === "complete") && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-semibold text-[#064E3B]">Interview Report</h2>
              {phase === "reporting" && <Loader2 className="h-4 w-4 text-[#10B981] animate-spin" />}
            </div>
            <div className="bg-[#F0FDF9] border border-[#D1FAE5] rounded-2xl px-5 py-4 text-sm text-[#064E3B] leading-relaxed whitespace-pre-wrap font-mono">
              {report || <span className="text-[#9CA3AF]">Generating…</span>}
            </div>
          </div>
        )}

        {error && <p className="text-xs text-red-500 text-center mt-4">{error}</p>}
      </div>

      {/* Voice control bar */}
      {(phase === "asking" || phase === "listening" || phase === "recording" || phase === "processing") && (
        <div className="shrink-0 border-t border-[#D1FAE5] bg-white px-6 py-5 flex flex-col items-center gap-3">
          <p className="text-xs text-[#9CA3AF] font-medium">
            {phase === "asking" ? (isSpeaking ? "Interviewer speaking…" : "Preparing…")
              : phase === "listening" ? "Tap mic to answer"
              : phase === "recording" ? "Recording… speak now"
              : "Processing your answer…"}
          </p>

          {phase === "recording" && <VoiceVisualizer active={true} />}

          <div className="flex items-center gap-4">
            {isSpeaking && (
              <button onClick={() => { stopSpeaking(); setIsSpeaking(false); setPhase("listening") }}
                className="p-3 rounded-full border border-[#D1FAE5] text-[#9CA3AF] hover:text-[#064E3B] hover:border-[#6EE7B7] transition-colors"
                title="Skip speech">
                <Square className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleMicTap}
              disabled={phase !== "listening"}
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg",
                phase === "listening"  ? "bg-[#10B981] hover:bg-[#064E3B]" :
                phase === "recording" ? "bg-rose-500 ring-4 ring-rose-200 animate-pulse cursor-not-allowed" :
                "bg-[#E5E7EB] cursor-not-allowed"
              )}
            >
              {phase === "asking"     ? <Volume2 className="h-6 w-6 text-[#9CA3AF]" /> :
               phase === "recording" ? <Mic className="h-6 w-6 text-white" /> :
               phase === "processing" ? <Loader2 className="h-6 w-6 text-[#9CA3AF] animate-spin" /> :
               <Mic className="h-6 w-6 text-white" />}
            </button>
          </div>
          <p className="text-[10px] text-[#9CA3AF]">
            {phase === "listening" ? "Tap → speak → auto-submits when you stop" : ""}
          </p>
        </div>
      )}
    </div>
  )
}
