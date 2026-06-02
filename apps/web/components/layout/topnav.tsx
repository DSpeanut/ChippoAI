"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChippoLogo } from "./ChippoLogo"
import { BookOpen, Mic, Swords, Briefcase } from "lucide-react"

const navItems = [
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/interview", label: "Interview", icon: Mic },
  { href: "/sparring", label: "Sparring", icon: Swords },
  { href: "/pipeline", label: "Pipeline", icon: Briefcase },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="h-14 border-b border-[#D1FAE5] bg-white backdrop-blur-sm flex items-center px-6 gap-8 shrink-0">
      <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
        <ChippoLogo size={28} />
        <span className="text-sm font-bold text-[#064E3B] tracking-tight">ChippoAI</span>
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
              pathname.startsWith(href)
                ? "bg-[#10B981] text-white shadow-sm"
                : "text-[#4B7C68] hover:text-[#064E3B] hover:bg-[#ECFDF5]"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-xs font-semibold text-white shadow-sm">
        U
      </div>
    </header>
  )
}
