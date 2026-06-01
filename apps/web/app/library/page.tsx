import { WikiSidebar } from "@/components/layout/sidebar"
import { EntryCard } from "@/components/wiki/entry-card"
import { mockEntries, categories } from "@/data/mock-data"

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string; cat?: string }>
}) {
  const { sub, cat } = await searchParams

  let entries: typeof mockEntries
  let title: string
  let parentName: string | null = null
  let currentName: string

  if (sub) {
    // Subcategory view
    const subcategory = categories.flatMap(c => c.subcategories).find(s => s.id === sub)
    const category = categories.find(c => c.subcategories.some(s => s.id === sub))
    entries = mockEntries.filter(e => e.subcategoryId === sub)
    title = subcategory?.name ?? "Unknown"
    parentName = category?.name ?? null
    currentName = subcategory?.name ?? ""
  } else {
    // Category view — show all entries across every subcategory
    const catId = cat ?? "4"
    const category = categories.find(c => c.id === catId)
    const subIds = new Set(category?.subcategories.map(s => s.id) ?? [])
    entries = mockEntries.filter(e => subIds.has(e.subcategoryId))
    title = category?.name ?? "Library"
    currentName = category?.name ?? ""
  }

  return (
    <div className="flex h-full">
      <WikiSidebar />
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-2">
              {parentName && (
                <>
                  <span>{parentName}</span>
                  <span>›</span>
                </>
              )}
              <span className="text-[#1F2937] font-medium">{currentName}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#064E3B]">{title}</h1>
          </div>

          {entries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {entries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-[#1F2937] text-sm font-medium">No entries yet.</p>
              <p className="text-[#9CA3AF] text-xs mt-1">Use Claude Code to generate content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
