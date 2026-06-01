import Link from "next/link"
import { difficultyColors } from "@/data/mock-data"
import { cn } from "@/lib/utils"

type Entry = {
  id: string
  title: string
  slug: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
}

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <Link href={`/library/${entry.slug}`}>
      <div className="group p-4 rounded-2xl border border-[#D1FAE5] bg-white hover:border-[#6EE7B7] hover:shadow-md transition-all cursor-pointer h-full flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <h3 className="text-sm font-semibold text-[#1F2937] group-hover:text-[#10B981] leading-tight transition-colors">
            {entry.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mt-auto flex-wrap">
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md border font-semibold", difficultyColors[entry.difficulty])}>
            {entry.difficulty}
          </span>
          {entry.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] text-[#4B7C68] bg-[#F0FDF9] px-2 py-0.5 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
