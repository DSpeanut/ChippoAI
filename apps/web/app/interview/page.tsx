"use client"

import { useState } from "react"
import { Mic, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { InterviewSession } from "@/features/interview/InterviewSession"

const CATEGORIES = ["Machine Learning", "Deep Learning", "NLP / LLM", "Finance & Quant"]
const DIFFICULTIES = ["Easy", "Medium", "Hard"]
const QUESTION_COUNTS = [3, 5, 10]

export default function InterviewPage() {
  const [category, setCategory] = useState("Machine Learning")
  const [difficulty, setDifficulty] = useState("Medium")
  const [totalQuestions, setTotalQuestions] = useState(5)
  const [started, setStarted] = useState(false)

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-72 border-r border-[#D1FAE5] bg-[#F0FDF9] p-4 flex flex-col gap-4 shrink-0">
        <div className="space-y-5">
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Session Setup</p>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Category</label>
            <div className="space-y-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  disabled={started}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "w-full text-left text-xs px-2.5 py-2 rounded-xl border transition-colors font-medium disabled:opacity-50",
                    category === cat
                      ? "bg-[#10B981] text-white border-[#10B981]"
                      : "text-[#4B7C68] border-[#D1FAE5] bg-white hover:border-[#6EE7B7]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Difficulty</label>
            <div className="flex gap-1.5">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  disabled={started}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "flex-1 text-xs py-1.5 rounded-xl border transition-colors font-medium disabled:opacity-50",
                    difficulty === d
                      ? "bg-[#10B981] text-white border-[#10B981]"
                      : "text-[#4B7C68] border-[#D1FAE5] bg-white hover:border-[#6EE7B7]"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F2937] mb-2 block">Questions</label>
            <div className="flex gap-1.5">
              {QUESTION_COUNTS.map(n => (
                <button
                  key={n}
                  disabled={started}
                  onClick={() => setTotalQuestions(n)}
                  className={cn(
                    "flex-1 text-xs py-1.5 rounded-xl border transition-colors font-medium disabled:opacity-50",
                    totalQuestions === n
                      ? "bg-[#10B981] text-white border-[#10B981]"
                      : "text-[#4B7C68] border-[#D1FAE5] bg-white hover:border-[#6EE7B7]"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setStarted(true)}
          disabled={started}
          className="mt-auto flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#064E3B] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Play className="h-4 w-4" />
          Start Session
        </button>
      </div>

      {/* Main area */}
      {!started ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 rounded-full bg-white border border-[#D1FAE5] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Mic className="h-10 w-10 text-[#10B981]" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-[#064E3B] mb-2">Ready when you are</h2>
            <p className="text-[#4B7C68] text-sm leading-relaxed">
              Pick a category, difficulty, and number of questions — then hit Start. The interviewer will ask questions and you respond by tapping the mic.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {["Voice input (STT)", "AI response (TTS)", "Per-answer feedback"].map(label => (
              <div key={label} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <InterviewSession
          category={category}
          difficulty={difficulty}
          totalQuestions={totalQuestions}
          onReset={() => setStarted(false)}
        />
      )}
    </div>
  )
}
