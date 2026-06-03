# Math Cleanup - Learnings

## 2026-06-03 - Start

### Problem
Wiki entry `deepDive` sections have `body` text packed with inline math notation (e.g., `||∇f(x) - ∇f(y)|| ≤ L||x-y||`, `det(A - λI) = 0`), making them hard to read.

### Goal
1. Keep only necessary math expressions in body text
2. Move key formulas to the dedicated `formula` field (already rendered in a green box)
3. Make body text plain English prose

### Approach
- Read each entry's deepDive array
- For each section: simplify body to plain English, extract key formulas to `formula` field
- Use existing formula box rendering: `<div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">`
- Body text should explain concepts in words, not notation

### Entry Structure (JSON)
```json
{
  "deepDive": [
    {
      "heading": "...",
      "body": "...",        // ← THIS needs cleanup
      "formula": "..."      // ← Optional, rendered in box
    }
  ]
}
```

### Pattern Observed
- `eigenvalues-eigenvectors.json`: Already well-done - body is plain English, formula is separate
- `gradient-descent-math.json`: Body has heavy math - needs cleanup
- `entropy.json`: Body has moderate math - some cleanup needed

### Categories (Math-Heavy)
| # | Category | Entries | Math Density |
|---|----------|---------|-------------|
| 1 | Mathematics | 29 | Very High |
| 2 | Statistics | 27 | High |
| 4 | Machine Learning | ~40 | High |
| 5 | Deep Learning | ~31 | High |
| 7 | Training/Optimization | 60 | High |
| 11 | Quant Finance | 29 | High |
| 3 | Data | 31 | Medium |
| 8 | AI Engineering | 32 | Low-Medium |
| 9 | AI/ML System Design | 30 | Low |
| 10 | Finance (Asset Mgmt) | ~39 | Medium |
| 6 | NLP/LLM | 36 | Low-Medium |

## 2026-06-03 - DeepDive Cleanup Completed

### What worked
- Rewriting every `deepDive.body` as explanatory prose made the entries feel much closer to `eigenvalues-eigenvectors.json`.
- Keeping equations only in `formula` fields preserved mathematical precision without making the paragraphs hard to scan.
- For concept-heavy sections, a short formula box plus a prose-first body was better than repeating notation inline.

### Patterns used
- Body text explains what the concept is, why it matters, and how to think about it in words.
- Any symbolic statement, update rule, inequality, or optimization expression belongs in `formula`, not `body`.
- If a section was mostly interpretive, it was fine to omit `formula` entirely.

### Verification notes
- Parsed all 14 edited JSON files successfully with Python.
- Scanned `deepDive.body` content for common math symbols after rewriting.
- `lsp_diagnostics` for `apps/web/data/entries` returned zero diagnostics after installing Biome.
- `npm run build` passed in `apps/web`.
- `npm run lint` still fails because of pre-existing issues in unrelated app files, not the entry JSON files.

## 2026-06-03 - Follow-up 7 Entry Cleanup

### Additional patterns confirmed
- Information theory and probability entries read better when definitions stay verbal and only the canonical identity remains in `formula`.
- Body-only deepDive sections must not leave a dangling trailing comma after removing `formula`; JSON validity needs a quick parse check after edits.
- Scope verification against `HEAD` is useful for proving that only `deepDive[i].body` and `deepDive[i].formula` changed.

### Verification notes
- Parsed all 7 follow-up edited JSON files successfully with Python.
- Scanned the 7 updated `deepDive.body` fields for common math symbols after rewriting.
- Verified against `HEAD` that only `deepDive[i].body` and `deepDive[i].formula` changed in the 7 target files.
- `lsp_diagnostics` for `apps/web/data/entries` returned zero diagnostics.
- `npm run build` passed again in `apps/web`.

## 2026-06-03 - Statistics Cleanup Batch

### Additional patterns confirmed
- Statistics entries read best when definitions stay conceptual in `body` and the named test/statistic identity stays in `formula`.
- DeepDive sections about diagnostics, interpretation, and use cases often work better with no formula at all.
- When removing a `formula` field from a section, trailing commas are the easiest way to break JSON and need a parse check immediately.

### Verification notes
- Parsed all 29 edited Statistics JSON files successfully with Python.
- Scanned all updated `deepDive.body` fields for common math notation after rewriting.
- Verified against `HEAD` that only `deepDive[i].body` and `deepDive[i].formula` changed in the 29 target files.
- `lsp_diagnostics` for `apps/web/data/entries` returned zero diagnostics.
- `npm run build` passed in `apps/web` after the batch cleanup.

## 2026-06-03 - ML and DL Cleanup Batch

### Additional patterns confirmed
- For ML/DL entries, section headings often already carry the technical concept, so the body can be simplified to a short explanation of what the section means and why it matters.
- Many ML/DL entries already had the main equation in `formula`; cleanup mostly required removing symbolic clauses from `body` rather than inventing new formulas.
- A symbol scan across `deepDive.body` is a fast way to identify which listed entries still need cleanup and which can be skipped.

### Verification notes
- Parsed all existing target ML/DL JSON files successfully with Python.
- Scanned all updated target `deepDive.body` fields for common math notation after rewriting.
- Verified against `HEAD` that only `deepDive[i].body` and `deepDive[i].formula` changed in the target ML/DL files.
- `lsp_diagnostics` for `apps/web/data/entries` returned zero diagnostics.
- `npm run build` passed in `apps/web` after the ML/DL cleanup.
