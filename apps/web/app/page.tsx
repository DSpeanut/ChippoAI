import Link from "next/link"
import { BookOpen, Mic, Swords, Briefcase, ArrowRight } from "lucide-react"
import { ChippoLogo } from "@/components/layout/ChippoLogo"

const FEATURES = [
  {
    href: "/library",
    icon: BookOpen,
    label: "Library",
    color: "bg-emerald-50 border-emerald-200 hover:border-[#10B981]",
    iconBg: "bg-emerald-100",
    iconColor: "text-[#10B981]",
    description: "Browse a structured knowledge base of ML, AI, and finance concepts — each entry includes plain-English explanations, deep dives, and interview edge cases.",
  },
  {
    href: "/interview",
    icon: Mic,
    label: "Interview",
    color: "bg-blue-50 border-blue-200 hover:border-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    description: "Practice voice-based technical interviews. Pick a category, difficulty, and number of questions — the AI interviewer asks, you answer out loud, and get a scored report at the end.",
  },
  {
    href: "/sparring",
    icon: Swords,
    label: "Sparring",
    color: "bg-amber-50 border-amber-200 hover:border-amber-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    description: "Enter any topic and debate it with an AI sparring partner. It challenges your reasoning, explores edge cases, and corrects misconceptions — built to make you think harder.",
  },
  {
    href: "/pipeline",
    icon: Briefcase,
    label: "Pipeline",
    color: "bg-purple-50 border-purple-200 hover:border-purple-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    description: "Track your job applications on a Kanban board. Add roles, drag cards between stages, and see your application activity over the past year in a heatmap.",
  },
]

export default function HomePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-12 bg-white">
      <div className="max-w-6xl w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5 drop-shadow-lg">
            <ChippoLogo size={64} />
          </div>
          <h1 className="text-3xl font-bold text-[#064E3B] tracking-tight mb-3">ChippoAI</h1>
          <p className="text-[#4B7C68] text-base max-w-md mx-auto leading-relaxed">
            Your AI-powered study companion for ML, AI, and finance interview prep.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-4 gap-4">
          {FEATURES.map(({ href, icon: Icon, label, color, iconBg, iconColor, description }) => (
            <Link
              key={href}
              href={href}
              className={`group flex flex-col gap-4 p-6 rounded-2xl border-2 transition-all duration-200 ${color} hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <ArrowRight className="h-4 w-4 text-[#9CA3AF] group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <p className="text-base font-bold text-[#1F2937] mb-1">{label}</p>
                <p className="text-sm text-[#4B7C68] leading-relaxed">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
