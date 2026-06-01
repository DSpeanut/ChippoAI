"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { categories } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"

function WikiSidebarInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeSub = searchParams.get("sub")
  const activeCat = searchParams.get("cat")

  // Find which category owns the active subcategory
  const ownerCatId = activeSub
    ? categories.find(c => c.subcategories.some(s => s.id === activeSub))?.id
    : null

  const defaultExpanded = ownerCatId ?? activeCat ?? "4"
  const [expandedCategories, setExpandedCategories] = useState<string[]>([defaultExpanded])

  // Keep expanded when URL changes
  useEffect(() => {
    const id = ownerCatId ?? activeCat
    if (id) {
      setExpandedCategories(prev => prev.includes(id) ? prev : [...prev, id])
    }
  }, [activeSub, activeCat, ownerCatId])

  const handleCategoryClick = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
    router.push(`/library?cat=${id}`)
  }

  const handleSubcategoryClick = (id: string) => {
    router.push(`/library?sub=${id}`)
  }

  const isCatActive = (id: string) => activeCat === id && !activeSub
  const isSubActive = (id: string) => activeSub === id

  return (
    <aside className="w-60 shrink-0 border-r border-[#D1FAE5] bg-[#F0FDF9] h-full flex flex-col">
      <div className="px-4 py-3.5 border-b border-[#D1FAE5]">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Knowledge Base</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-0.5">
          {categories.map(cat => (
            <div key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-left",
                  isCatActive(cat.id)
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "hover:bg-[#ECFDF5]"
                )}
              >
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-transform",
                    isCatActive(cat.id) ? "text-white" : "text-[#9CA3AF]",
                    expandedCategories.includes(cat.id) && "rotate-90"
                  )}
                />
                <span className={cn(
                  "text-[13px] font-medium leading-tight",
                  isCatActive(cat.id) ? "text-white" : "text-[#1F2937]"
                )}>
                  {cat.name}
                </span>
              </button>

              {expandedCategories.includes(cat.id) && (
                <div className="ml-5 mt-0.5 mb-1 space-y-0.5">
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(sub.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-1.5 text-left rounded-lg transition-all text-xs",
                        isSubActive(sub.id)
                          ? "bg-[#10B981] text-white shadow-sm rounded-xl"
                          : "text-[#4B7C68] hover:text-[#064E3B] hover:bg-[#ECFDF5]"
                      )}
                    >
                      <span className="leading-tight">{sub.name}</span>
                      <span className={cn(
                        "text-[10px] shrink-0 ml-1 tabular-nums",
                        isSubActive(sub.id) ? "text-emerald-100" : "text-[#9CA3AF]"
                      )}>
                        {sub.entryCount}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}

function SidebarFallback() {
  return (
    <aside className="w-60 shrink-0 border-r border-[#D1FAE5] bg-[#F0FDF9] h-full flex flex-col">
      <div className="px-4 py-3.5 border-b border-[#D1FAE5]">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Knowledge Base</p>
      </div>
    </aside>
  )
}

export function WikiSidebar() {
  return (
    <Suspense fallback={<SidebarFallback />}>
      <WikiSidebarInner />
    </Suspense>
  )
}
