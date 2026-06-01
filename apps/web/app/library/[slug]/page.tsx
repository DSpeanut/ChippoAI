import Link from "next/link"
import { WikiSidebar } from "@/components/layout/sidebar"
import { mockEntries, difficultyColors } from "@/data/mock-data"
import type { WikiEntryContent, Source, PromptExample, CodeSnapshot } from "@/data/mock-data"
import { loadEntryContent } from "@/data/content"
import { cn } from "@/lib/utils"
import { ArrowLeft, PlayCircle, ExternalLink, Zap, Lightbulb, Brain, Target, AlertTriangle, BookOpen, Terminal, Code2 } from "lucide-react"
import { CodeSnapshotBlock } from "@/components/wiki/code-snapshot"
import {
  AgentLoopViz, ToolUseViz, FunctionCallingViz, ReActViz, PlanExecuteViz,
  ShortTermMemoryViz, LongTermMemoryViz, EpisodicSemanticViz, MemoryArchitecturesViz,
  LangChainViz, LlamaIndexViz, CrewAIViz, AutoGenViz, ClaudeAgentSDKViz,
  RagPipelineViz, RagChunkingViz, VectorSearchViz, RerankingViz, RagEvalViz,
  MCPViz, APIDesignAIViz, StructuredOutputsViz, JSONModeViz, ToolCallingPatternsViz,
  LLMTracingViz, LLMLoggingViz, LLMEvalViz, RegressionTestingViz,
  IOFilteringViz, ContentModerationViz, PromptInjectionViz, RedTeamingViz,
} from "@/components/wiki/ai-eng-vizzes"

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = mockEntries.find(e => e.slug === slug)

  if (!entry) {
    return (
      <div className="flex h-full">
        <WikiSidebar />
        <div className="flex-1 flex items-center justify-center bg-white">
          <p className="text-[#9CA3AF]">Entry not found.</p>
        </div>
      </div>
    )
  }

  const content = loadEntryContent(slug)

  return (
    <div className="flex h-full">
      <WikiSidebar />
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/library" className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#10B981] transition-colors mb-6 font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Library
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-[#064E3B] mb-3">{entry.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("text-xs px-2.5 py-1 rounded-lg border font-semibold", difficultyColors[entry.difficulty])}>
                {entry.difficulty}
              </span>
              {entry.tags.map(tag => (
                <span key={tag} className="text-xs text-[#4B7C68] bg-[#F0FDF9] px-2 py-1 rounded-lg border border-[#D1FAE5]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {content ? <EntryContent content={content} /> : <PlaceholderContent title={entry.title} />}
        </div>
      </div>
    </div>
  )
}

// Renders inline [1], [2] citation markers as superscript anchor links
function cite(text: string, sources: Source[]) {
  const parts = text.split(/(\[\d+\])/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[(\d+)\]$/)
    if (match) {
      const n = parseInt(match[1])
      const src = sources[n - 1]
      return (
        <a key={i} href={src?.url ?? "#"} target="_blank" rel="noopener noreferrer"
          className="text-[#10B981] hover:text-[#064E3B] font-semibold align-super text-[8pt] transition-colors">
          [{n}]
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function EntryContent({ content }: { content: WikiEntryContent }) {
  return (
    <div className="space-y-4">

      {/* Key Terms */}
      {content.terms && content.terms.length > 0 && (
        <Section icon={<BookOpen className="h-4 w-4 text-sky-500" />} title="Key Terms">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10pt]">
            {content.terms.map((item, i) => (
              <div key={i} className="bg-sky-50 border border-sky-100 rounded-xl p-2.5 flex gap-2">
                <span className="font-bold text-sky-700 shrink-0 min-w-[6rem]">{item.term}</span>
                <span className="text-sky-600/90 leading-snug">{item.def}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Quick Intuition */}
      <Section icon={<Zap className="h-4 w-4 text-[#10B981]" />} title="Quick Intuition">
        <div className="space-y-2.5 text-[10pt] text-[#1F2937] leading-relaxed">
          {content.eli3.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Section>

      {/* Prompt Example */}
      {content.promptExample && (
        <Section icon={<Terminal className="h-4 w-4 text-violet-500" />} title="Prompt Example">
          <PromptExampleBlock example={content.promptExample} />
        </Section>
      )}

      {/* Code Snapshot */}
      {content.codeSnapshot && (
        <Section icon={<Code2 className="h-4 w-4 text-sky-500" />} title="Code Snapshot">
          <CodeSnapshotBlock snapshot={content.codeSnapshot} />
        </Section>
      )}

      {/* When & Why */}
      <Section icon={<Lightbulb className="h-4 w-4 text-amber-500" />} title="When & Why to Use">
        <ul className="space-y-2.5">
          {content.whenWhy.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[10pt] text-[#1F2937]">
              <span className="text-[#10B981] mt-0.5 shrink-0 font-bold">•</span>
              <span><strong className="text-[#064E3B]">{item.title}.</strong> {item.body}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Deep Dive */}
      <Section icon={<Brain className="h-4 w-4 text-purple-500" />} title="Deep Dive">
        <div className="space-y-6 text-[10pt] text-[#1F2937] leading-relaxed">

          {/* Plain-language intro + visualization */}
          {(content.deepDiveIntro || content.visualizationType) && (
            <div className="grid grid-cols-2 gap-6 items-start">
              {content.deepDiveIntro && (
                <div className="space-y-2.5">
                  {content.deepDiveIntro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              )}
              {content.visualizationType && (
                <div className="bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-4">
                  <Visualization type={content.visualizationType} />
                </div>
              )}
            </div>
          )}

          <div className="border-t border-[#ECFDF5] pt-4 space-y-4">
            {content.deepDive.map((section, i) => (
              <div key={i}>
                <h3 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2">{section.heading}</h3>
                <p>{cite(section.body, content.sources)}</p>
                {section.formula && (
                  <div className="my-2.5 bg-[#F0FDF9] border border-[#D1FAE5] rounded-xl p-3 font-mono text-sm text-center text-[#10B981] font-semibold">
                    {section.formula}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* Watch */}
      <Section icon={<PlayCircle className="h-4 w-4 text-red-500" />} title="Watch">
        {content.youtubeUrl ? (
          <div className="aspect-video rounded-xl overflow-hidden border border-[#D1FAE5]">
            <iframe
              src={content.youtubeUrl}
              title={content.youtubeLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video bg-[#F0FDF9] rounded-xl flex items-center justify-center border border-[#D1FAE5]">
            <div className="text-center">
              <PlayCircle className="h-10 w-10 text-[#10B981] mx-auto mb-2 opacity-60" />
              <p className="text-[#9CA3AF] text-xs">{content.youtubeLabel ?? "No video added yet"}</p>
            </div>
          </div>
        )}
      </Section>

      {/* Key Takeaways */}
      <Section icon={<Target className="h-4 w-4 text-emerald-500" />} title="Key Takeaways">
        <ul className="space-y-2">
          {content.takeaways.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-[10pt] text-[#1F2937]">
              <span className="text-[#10B981] font-mono text-xs mt-0.5 shrink-0 font-bold">{i + 1}.</span>
              <span>{cite(point, content.sources)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Interview Edge Cases */}
      <Section icon={<AlertTriangle className="h-4 w-4 text-rose-500" />} title="Interview Edge Cases & Gotchas">
        <ul className="space-y-2.5">
          {content.edgeCases.map((item, i) => (
            <li key={i} className="bg-rose-50 border border-rose-100 rounded-xl p-3 space-y-1.5">
              <p className="text-[10pt] font-semibold text-rose-700">{item.q}</p>
              <p className="text-[10pt] text-rose-600/80 leading-relaxed">{cite(item.a, content.sources)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Sources */}
      <div className="pt-3 border-t border-[#D1FAE5]">
        <div className="flex items-center gap-1.5 mb-2">
          <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF]" />
          <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">Sources</span>
        </div>
        <ol className="space-y-1">
          {content.sources.map((src, i) => (
            <li key={i} id={`source-${i + 1}`} className="flex gap-2 text-xs text-[#4B7C68]">
              <span className="text-[#10B981] font-bold shrink-0">[{i + 1}]</span>
              <a href={src.url} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#064E3B] hover:underline transition-colors">
                {src.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

    </div>
  )
}

function Visualization({ type }: { type: string }) {
  if (type === "linear-regression") return <LinearRegressionViz />
  if (type === "ridge-regression") return <RidgeConstraintViz />
  if (type === "lasso-regression") return <LassoConstraintViz />
  if (type === "polynomial-regression") return <PolynomialRegressionViz />
  if (type === "elastic-net") return <ElasticNetViz />
  if (type === "svr") return <SVRViz />
  if (type === "decision-tree-regressor") return <DecisionTreeRegressorViz />
  if (type === "logistic-regression") return <LogisticRegressionViz />
  if (type === "svm") return <SVMViz />
  if (type === "knn") return <KNNViz />
  if (type === "naive-bayes") return <NaiveBayesViz />
  if (type === "decision-tree") return <DecisionTreeClassifierViz />
  if (type === "lda") return <LDAViz />
  if (type === "qda") return <QDAViz />
  if (type === "k-means") return <KMeansViz />
  if (type === "dbscan") return <DBSCANViz />
  if (type === "hierarchical-clustering") return <HierarchicalClusteringViz />
  if (type === "gmm") return <GMMViz />
  if (type === "mean-shift") return <MeanShiftViz />
  if (type === "hdbscan") return <HDBSCANViz />
  if (type === "umap") return <UMAPViz />
  if (type === "random-forest") return <RandomForestViz />
  if (type === "gradient-boosting") return <GradientBoostingViz />
  if (type === "xgboost") return <XGBoostViz />
  if (type === "lightgbm") return <LightGBMViz />
  if (type === "catboost") return <CatBoostViz />
  if (type === "bagging") return <BaggingViz />
  if (type === "adaboost") return <AdaBoostViz />
  if (type === "stacking") return <StackingViz />
  if (type === "pca") return <PCAViz />
  if (type === "tsne") return <TSNEViz />
  if (type === "lda-dimensionality") return <LDADimViz />
  if (type === "autoencoders") return <AutoencoderViz />
  if (type === "mean") return <MeanViz />
  if (type === "median") return <MedianViz />
  if (type === "mode") return <ModeViz />
  if (type === "variance") return <VarianceViz />
  if (type === "standard-deviation") return <StandardDeviationViz />
  if (type === "skewness") return <SkewnessViz />
  if (type === "kurtosis") return <KurtosisViz />
  if (type === "percentiles-quartiles") return <PercentilesQuartilesViz />
  if (type === "z-test") return <ZTestViz />
  if (type === "t-test") return <TTestViz />
  if (type === "chi-square-test") return <ChiSquareViz />
  if (type === "anova") return <AnovaViz />
  if (type === "mann-whitney-u") return <MannWhitneyViz />
  if (type === "multiple-testing-correction") return <MultipleTestingViz />
  // Finance & Quant Finance
  if (type === "efficient-frontier") return <EfficientFrontierViz />
  if (type === "capm-sml") return <CAPMViz />
  if (type === "yield-curve") return <YieldCurveViz />
  if (type === "options-payoff") return <OptionsPayoffViz />
  if (type === "var-distribution") return <VaRDistributionViz />
  if (type === "drawdown") return <DrawdownViz />
  if (type === "duration-price-yield") return <DurationPriceYieldViz />
  if (type === "sharpe-cml") return <SharpeCMLViz />
  if (type === "greeks-delta") return <GreeksDeltaViz />
  if (type === "brinson-attribution") return <BrinsonAttributionViz />
  if (type === "gbm-paths") return <GBMPathsViz />
  if (type === "factor-returns") return <FactorReturnsViz />
  if (type === "equity-multiples") return <EquityMultiplesViz />
  // ── AI Engineering ────────────────────────────────────────────────────────
  if (type === "agent-loop-viz") return <AgentLoopViz />
  if (type === "tool-use-viz") return <ToolUseViz />
  if (type === "function-calling-viz") return <FunctionCallingViz />
  if (type === "react-pattern-viz") return <ReActViz />
  if (type === "plan-execute-viz") return <PlanExecuteViz />
  if (type === "short-term-memory-viz") return <ShortTermMemoryViz />
  if (type === "long-term-memory-viz") return <LongTermMemoryViz />
  if (type === "episodic-semantic-viz") return <EpisodicSemanticViz />
  if (type === "memory-architectures-viz") return <MemoryArchitecturesViz />
  if (type === "langchain-viz") return <LangChainViz />
  if (type === "llamaindex-viz") return <LlamaIndexViz />
  if (type === "crewai-viz") return <CrewAIViz />
  if (type === "autogen-viz") return <AutoGenViz />
  if (type === "claude-agent-sdk-viz") return <ClaudeAgentSDKViz />
  if (type === "rag-pipeline-viz") return <RagPipelineViz />
  if (type === "rag-chunking-viz") return <RagChunkingViz />
  if (type === "vector-search-viz") return <VectorSearchViz />
  if (type === "reranking-viz") return <RerankingViz />
  if (type === "rag-eval-viz") return <RagEvalViz />
  if (type === "mcp-viz") return <MCPViz />
  if (type === "api-design-ai-viz") return <APIDesignAIViz />
  if (type === "structured-outputs-viz") return <StructuredOutputsViz />
  if (type === "json-mode-viz") return <JSONModeViz />
  if (type === "tool-calling-patterns-viz") return <ToolCallingPatternsViz />
  if (type === "llm-tracing-viz") return <LLMTracingViz />
  if (type === "llm-logging-viz") return <LLMLoggingViz />
  if (type === "llm-eval-viz") return <LLMEvalViz />
  if (type === "regression-testing-viz") return <RegressionTestingViz />
  if (type === "io-filtering-viz") return <IOFilteringViz />
  if (type === "content-moderation-viz") return <ContentModerationViz />
  if (type === "prompt-injection-viz") return <PromptInjectionViz />
  if (type === "red-teaming-viz") return <RedTeamingViz />
  return null
}

function LinearRegressionViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 40 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const data: [number, number][] = [
    [0.08, 0.10], [0.15, 0.20], [0.22, 0.26], [0.30, 0.35],
    [0.40, 0.42], [0.50, 0.53], [0.60, 0.60], [0.68, 0.70],
    [0.78, 0.72], [0.88, 0.84], [0.94, 0.90],
  ]
  const lineY = (x: number) => 0.91 * x + 0.04

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      {/* axis labels */}
      <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Feature (e.g. house size)</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Target (e.g. price)</text>
      {/* regression line */}
      <line x1={sx(0)} y1={sy(lineY(0))} x2={sx(1)} y2={sy(lineY(1))} stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      {/* residuals */}
      {data.map(([xn, yn], i) => (
        <line key={i} x1={sx(xn)} y1={sy(yn)} x2={sx(xn)} y2={sy(lineY(xn))}
          stroke="#F87171" strokeWidth="1.2" strokeDasharray="3,2" />
      ))}
      {/* data points */}
      {data.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r="3.5" fill="#064E3B" opacity="0.75" />
      ))}
      {/* line label */}
      <text x={sx(0.55) + 6} y={sy(lineY(0.55)) - 6} fontSize="9" fill="#10B981" fontWeight="600">ŷ = β₀ + β₁x</text>
      {/* legend */}
      <circle cx={pad.l + 8} cy={H - pad.b + 14} r="3" fill="#064E3B" opacity="0.75" />
      <text x={pad.l + 15} y={H - pad.b + 17} fontSize="7.5" fill="#6B7280">observation</text>
      <line x1={pad.l + 70} y1={H - pad.b + 14} x2={pad.l + 82} y2={H - pad.b + 14} stroke="#F87171" strokeWidth="1.2" strokeDasharray="3,2" />
      <text x={pad.l + 86} y={H - pad.b + 17} fontSize="7.5" fill="#6B7280">residual</text>
      <line x1={pad.l + 138} y1={H - pad.b + 14} x2={pad.l + 150} y2={H - pad.b + 14} stroke="#10B981" strokeWidth="2" />
      <text x={pad.l + 154} y={H - pad.b + 17} fontSize="7.5" fill="#6B7280">fitted line</text>
    </svg>
  )
}

function RidgeConstraintViz() {
  const W = 300, H = 218
  const cx = 125, cy = 108          // β = 0 origin
  const r = 55                       // L2 ball radius
  const olsX = 210, olsY = 52
  const dx = olsX - cx, dy = olsY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const ridgeX = Math.round(cx + r * dx / dist)  // ≈ 171
  const ridgeY = Math.round(cy + r * dy / dist)  // ≈ 78

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={16} y1={cy} x2={W - 8} y2={cy} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={cx} y1={H - 14} x2={cx} y2={8} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - 7} y={cy + 11} fontSize="9" fill="#9CA3AF" textAnchor="end">β₁</text>
      <text x={cx + 5} y={13} fontSize="9" fill="#9CA3AF">β₂</text>

      {/* RSS contours (concentric ellipses centred at OLS) */}
      <ellipse cx={olsX} cy={olsY} rx={80} ry={54} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={66} ry={44} fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={54} ry={36} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* L2 ball */}
      <circle cx={cx} cy={cy} r={r} fill="#F0FDF9" stroke="#10B981" strokeWidth="2" />

      {/* dashed line from OLS to Ridge solution */}
      <line x1={olsX} y1={olsY} x2={ridgeX} y2={ridgeY}
        stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />

      {/* OLS point */}
      <circle cx={olsX} cy={olsY} r={4.5} fill="#F59E0B" />
      <text x={olsX + 7} y={olsY - 3} fontSize="8.5" fill="#F59E0B" fontWeight="700">OLS</text>

      {/* Ridge solution — on the smooth circle boundary */}
      <circle cx={ridgeX} cy={ridgeY} r={5} fill="#10B981" />
      <text x={ridgeX + 7} y={ridgeY - 3} fontSize="8.5" fill="#10B981" fontWeight="700">Ridge</text>

      {/* origin */}
      <circle cx={cx} cy={cy} r={2} fill="#9CA3AF" />
      <text x={cx - 5} y={cy + 12} fontSize="7.5" fill="#9CA3AF" textAnchor="end">0</text>

      {/* L2 label */}
      <text x={cx - r - 4} y={cy - 18} fontSize="7.5" fill="#10B981" textAnchor="end">L2 ball</text>

      {/* key insight annotation */}
      <text x={W / 2} y={H - 2} fontSize="7.5" fill="#6B7280" textAnchor="middle">
        Smooth boundary → solution never lands on an axis → no zeros
      </text>
    </svg>
  )
}

function LassoConstraintViz() {
  const W = 300, H = 218
  const cx = 125, cy = 108          // β = 0 origin
  const r = 55                       // L1 radius
  // diamond vertices
  const dRight = { x: cx + r, y: cy }   // (180, 108) → β₂ = 0
  const dTop   = { x: cx, y: cy - r }   // (125,  53)
  const dLeft  = { x: cx - r, y: cy }   // ( 70, 108)
  const dBot   = { x: cx, y: cy + r }   // (125, 163)

  const olsX = 200, olsY = 72

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={16} y1={cy} x2={W - 8} y2={cy} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={cx} y1={H - 14} x2={cx} y2={8} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - 7} y={cy + 11} fontSize="9" fill="#9CA3AF" textAnchor="end">β₁</text>
      <text x={cx + 5} y={13} fontSize="9" fill="#9CA3AF">β₂</text>

      {/* RSS contours centred at OLS, innermost touches the corner (180,108) */}
      <ellipse cx={olsX} cy={olsY} rx={72} ry={66} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={54} ry={52} fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={36} ry={38} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* L1 diamond */}
      <polygon
        points={`${dRight.x},${dRight.y} ${dTop.x},${dTop.y} ${dLeft.x},${dLeft.y} ${dBot.x},${dBot.y}`}
        fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2"
      />

      {/* dashed line from OLS to Lasso corner */}
      <line x1={olsX} y1={olsY} x2={dRight.x} y2={dRight.y}
        stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />

      {/* OLS point */}
      <circle cx={olsX} cy={olsY} r={4.5} fill="#F59E0B" />
      <text x={olsX + 7} y={olsY - 3} fontSize="8.5" fill="#F59E0B" fontWeight="700">OLS</text>

      {/* Lasso solution at the corner — on β₁ axis → β₂ = 0 */}
      <circle cx={dRight.x} cy={dRight.y} r={6} fill="#8B5CF6" />
      <text x={dRight.x + 8} y={dRight.y - 5} fontSize="8.5" fill="#8B5CF6" fontWeight="700">Lasso</text>
      <text x={dRight.x + 8} y={dRight.y + 9} fontSize="8" fill="#8B5CF6" opacity="0.9">β₂ = 0</text>

      {/* origin */}
      <circle cx={cx} cy={cy} r={2} fill="#9CA3AF" />
      <text x={cx - 5} y={cy + 12} fontSize="7.5" fill="#9CA3AF" textAnchor="end">0</text>

      {/* L1 label */}
      <text x={cx - r - 4} y={cy - 18} fontSize="7.5" fill="#8B5CF6" textAnchor="end">L1 diamond</text>

      {/* key insight annotation */}
      <text x={W / 2} y={H - 2} fontSize="7.5" fill="#6B7280" textAnchor="middle">
        Corner on axis → β₂ = 0 exactly → automatic feature selection
      </text>
    </svg>
  )
}

function PolynomialRegressionViz() {
  const W = 300, H = 215
  const pad = { l: 36, r: 14, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Noisy data points following a cubic-ish curve
  const data: [number, number][] = [
    [0.05, 0.20], [0.10, 0.28], [0.18, 0.42], [0.26, 0.55],
    [0.34, 0.64], [0.42, 0.70], [0.50, 0.72], [0.58, 0.68],
    [0.66, 0.60], [0.74, 0.50], [0.82, 0.38], [0.90, 0.24],
  ]

  // Degree-1 fit (underfit): straight line
  const d1 = (x: number) => 0.72 - 0.48 * x

  // Degree-4 fit (good fit): smooth curve matching the data shape
  const d4 = (x: number) => {
    const t = x - 0.5
    return 0.72 - 0.32 * t - 2.8 * t * t - 0.4 * t * t * t
  }

  // Degree-10 fit (overfit): wiggles wildly
  const d10 = (x: number) => {
    const base = d4(x)
    const wiggle = 0.10 * Math.sin(x * 30) * Math.pow(Math.abs(x - 0.5) + 0.1, 2)
    return Math.min(0.98, Math.max(0.02, base + wiggle))
  }

  const linePoints = (fn: (x: number) => number, steps = 80) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const xn = i / steps
      return `${sx(xn)},${sy(fn(xn))}`
    }).join(" ")

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>y</text>

      {/* grid */}
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="0.8" />
      ))}

      {/* degree-10 overfit (red) */}
      <polyline points={linePoints(d10)} fill="none" stroke="#F87171" strokeWidth="1.4" strokeDasharray="4,2" opacity="0.8" />

      {/* degree-1 underfit (amber) */}
      <polyline points={linePoints(d1)} fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,2" opacity="0.85" />

      {/* degree-4 good fit (green) */}
      <polyline points={linePoints(d4)} fill="none" stroke="#10B981" strokeWidth="2" />

      {/* data points */}
      {data.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={3.2} fill="#064E3B" opacity="0.7" />
      ))}

      {/* legend */}
      <line x1={pad.l + 4} y1={H - pad.b + 14} x2={pad.l + 18} y2={H - pad.b + 14} stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,2" />
      <text x={pad.l + 22} y={H - pad.b + 17} fontSize="7" fill="#6B7280">degree 1 (underfit)</text>
      <line x1={pad.l + 104} y1={H - pad.b + 14} x2={pad.l + 118} y2={H - pad.b + 14} stroke="#10B981" strokeWidth="2" />
      <text x={pad.l + 122} y={H - pad.b + 17} fontSize="7" fill="#6B7280">degree 4</text>
      <line x1={pad.l + 156} y1={H - pad.b + 14} x2={pad.l + 170} y2={H - pad.b + 14} stroke="#F87171" strokeWidth="1.4" strokeDasharray="4,2" />
      <text x={pad.l + 174} y={H - pad.b + 17} fontSize="7" fill="#6B7280">degree 10 (overfit)</text>
    </svg>
  )
}

// ── Elastic Net: rounded-diamond constraint region (L1 + L2 hybrid) ──────────
function ElasticNetViz() {
  const W = 300, H = 218
  const cx = 120, cy = 108
  const r = 52   // half-width of constraint region

  // Rounded diamond via cubic bezier: corners at cardinal points, handles pull inward
  const h = r * 0.45  // control point offset — larger = rounder corner
  const top    = { x: cx,     y: cy - r }
  const right  = { x: cx + r, y: cy     }
  const bottom = { x: cx,     y: cy + r }
  const left   = { x: cx - r, y: cy     }

  const d = [
    `M ${top.x} ${top.y}`,
    `C ${top.x + h} ${top.y}, ${right.x} ${cy - h}, ${right.x} ${right.y}`,
    `C ${right.x} ${cy + h}, ${bottom.x + h} ${bottom.y}, ${bottom.x} ${bottom.y}`,
    `C ${bottom.x - h} ${bottom.y}, ${left.x} ${cy + h}, ${left.x} ${left.y}`,
    `C ${left.x} ${cy - h}, ${top.x - h} ${top.y}, ${top.x} ${top.y}`,
    "Z",
  ].join(" ")

  const olsX = 210, olsY = 58

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={16} y1={cy} x2={W - 8} y2={cy} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={cx} y1={H - 14} x2={cx} y2={8} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - 7} y={cy + 11} fontSize="9" fill="#9CA3AF" textAnchor="end">β₁</text>
      <text x={cx + 5} y={13} fontSize="9" fill="#9CA3AF">β₂</text>

      {/* RSS contours */}
      <ellipse cx={olsX} cy={olsY} rx={80} ry={54} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={62} ry={42} fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx={olsX} cy={olsY} rx={46} ry={30} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* L1 diamond (ghost) */}
      <polygon
        points={`${cx + r},${cy} ${cx},${cy - r} ${cx - r},${cy} ${cx},${cy + r}`}
        fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"
      />
      {/* L2 circle (ghost) */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />

      {/* Elastic Net constraint region */}
      <path d={d} fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" opacity="0.9" />

      {/* OLS point */}
      <circle cx={olsX} cy={olsY} r={4.5} fill="#F59E0B" />
      <text x={olsX + 7} y={olsY - 3} fontSize="8.5" fill="#F59E0B" fontWeight="700">OLS</text>

      {/* Elastic Net solution — on the rounded corner */}
      <circle cx={cx + r - 4} cy={cy - 28} r={5} fill="#D97706" />
      <text x={cx + r + 2} y={cy - 34} fontSize="8.5" fill="#D97706" fontWeight="700">EN</text>

      {/* origin */}
      <circle cx={cx} cy={cy} r={2} fill="#9CA3AF" />

      {/* legend */}
      <line x1={8} y1={H - 26} x2={22} y2={H - 26} stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
      <text x={25} y={H - 23} fontSize="7" fill="#6B7280">L1 (Lasso)</text>
      <line x1={8} y1={H - 14} x2={22} y2={H - 14} stroke="#10B981" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
      <text x={25} y={H - 11} fontSize="7" fill="#6B7280">L2 (Ridge)</text>
      <rect x={100} y={H - 29} width={12} height={8} fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
      <text x={115} y={H - 23} fontSize="7" fill="#6B7280">Elastic Net (rounded corners)</text>
    </svg>
  )
}

// ── SVR: ε-tube around regression line ───────────────────────────────────────
function SVRViz() {
  const W = 320, H = 215
  const pad = { l: 40, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  const fLine = (x: number) => 0.18 + 0.68 * x
  const eps = 0.10   // tube half-width in normalised units

  const data: [number, number, boolean][] = [
    [0.08, 0.24, true],  [0.15, 0.32, true],  [0.23, 0.33, true],
    [0.32, 0.38, false], [0.40, 0.44, true],  [0.48, 0.52, true],
    [0.55, 0.60, true],  [0.63, 0.62, false], [0.70, 0.65, true],
    [0.80, 0.71, true],  [0.88, 0.80, false], [0.95, 0.83, true],
  ]
  // which points are support vectors (on the tube boundary)
  const svIndices = new Set([3, 6, 10])

  // Build tube polygon path
  const steps = 60
  const topPts = Array.from({ length: steps + 1 }, (_, i) => {
    const xn = i / steps
    return `${sx(xn)},${sy(fLine(xn) + eps)}`
  }).join(" ")
  const botPts = Array.from({ length: steps + 1 }, (_, i) => {
    const xn = 1 - i / steps
    return `${sx(xn)},${sy(fLine(xn) - eps)}`
  }).join(" ")

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>y</text>

      {/* ε-tube fill */}
      <polygon points={`${topPts} ${botPts}`} fill="#D1FAE5" opacity="0.6" />

      {/* tube boundary lines */}
      <polyline points={topPts} fill="none" stroke="#10B981" strokeWidth="1.4" strokeDasharray="4,2" />
      <polyline points={botPts.split(" ").reverse().join(" ")} fill="none" stroke="#10B981" strokeWidth="1.4" strokeDasharray="4,2" />

      {/* regression line */}
      <line x1={sx(0)} y1={sy(fLine(0))} x2={sx(1)} y2={sy(fLine(1))} stroke="#064E3B" strokeWidth="2" />

      {/* data points */}
      {data.map(([xn, yn, inside], i) => (
        <g key={i}>
          {svIndices.has(i) && (
            <circle cx={sx(xn)} cy={sy(yn)} r={8} fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          )}
          {/* slack line for outlier points */}
          {!inside && (
            <line x1={sx(xn)} y1={sy(yn)} x2={sx(xn)}
              y2={sy(yn > fLine(xn) ? fLine(xn) + eps : fLine(xn) - eps)}
              stroke="#F87171" strokeWidth="1.2" strokeDasharray="2,1.5" />
          )}
          <circle cx={sx(xn)} cy={sy(yn)} r={3.5}
            fill={inside ? "#064E3B" : "#F87171"} opacity="0.85" />
        </g>
      ))}

      {/* ε annotation */}
      <line x1={sx(0.5)} y1={sy(fLine(0.5))} x2={sx(0.5)} y2={sy(fLine(0.5) + eps)}
        stroke="#10B981" strokeWidth="1" markerEnd="url(#arr)" />
      <text x={sx(0.5) + 4} y={sy(fLine(0.5) + eps / 2)} fontSize="9" fill="#10B981" fontWeight="700">ε</text>

      {/* labels */}
      <text x={sx(0.02) + 4} y={sy(fLine(0.02)) - 6} fontSize="8.5" fill="#064E3B" fontWeight="600">f(x)</text>

      {/* legend */}
      <circle cx={pad.l + 6} cy={H - pad.b + 14} r={3.5} fill="#064E3B" opacity="0.85" />
      <text x={pad.l + 13} y={H - pad.b + 17} fontSize="7" fill="#6B7280">inside tube (no loss)</text>
      <circle cx={pad.l + 118} cy={H - pad.b + 14} r={3.5} fill="#F87171" opacity="0.85" />
      <text x={pad.l + 125} y={H - pad.b + 17} fontSize="7" fill="#6B7280">outside (penalised)</text>
      <circle cx={pad.l + 218} cy={H - pad.b + 14} r={3.5} fill="#064E3B" stroke="#F59E0B" strokeWidth="1.5" opacity="0.85" />
      <text x={pad.l + 226} y={H - pad.b + 17} fontSize="7" fill="#6B7280">SV</text>
    </svg>
  )
}

// ── Decision Tree Regressor: step-function piecewise constant fit ─────────────
function DecisionTreeRegressorViz() {
  const W = 320, H = 215
  const pad = { l: 40, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  const data: [number, number][] = [
    [0.06,0.30],[0.12,0.38],[0.19,0.34],[0.27,0.52],[0.33,0.58],
    [0.40,0.72],[0.46,0.68],[0.53,0.80],[0.58,0.75],[0.64,0.55],
    [0.70,0.48],[0.77,0.45],[0.84,0.32],[0.90,0.28],[0.96,0.22],
  ]

  // Four leaf regions with mean values
  const splits = [0.30, 0.56, 0.72]
  const means  = [0.36, 0.70, 0.54, 0.27]
  const colors = ["#D1FAE5","#A7F3D0","#6EE7B7","#D1FAE5"]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* region fills */}
      {[0, ...splits, 1].map((start, i) => {
        if (i >= splits.length + 1) return null
        const end = i < splits.length ? splits[i] : 1
        return (
          <rect key={i}
            x={sx(start)} y={pad.t}
            width={sx(end) - sx(start)} height={ph}
            fill={colors[i]} opacity="0.35"
          />
        )
      })}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>y</text>

      {/* split lines */}
      {splits.map((s, i) => (
        <line key={i} x1={sx(s)} y1={pad.t} x2={sx(s)} y2={H - pad.b}
          stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,2" />
      ))}

      {/* step-function fit */}
      {[0, ...splits, 1].map((start, i) => {
        if (i >= means.length) return null
        const end = i < splits.length ? splits[i] : 1
        return (
          <line key={i}
            x1={sx(start)} y1={sy(means[i])}
            x2={sx(end)}   y2={sy(means[i])}
            stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"
          />
        )
      })}
      {/* vertical connectors */}
      {splits.map((s, i) => (
        <line key={i}
          x1={sx(s)} y1={sy(means[i])}
          x2={sx(s)} y2={sy(means[i + 1])}
          stroke="#10B981" strokeWidth="2.5"
        />
      ))}

      {/* data points */}
      {data.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={3.5} fill="#064E3B" opacity="0.75" />
      ))}

      {/* split labels */}
      {splits.map((s, i) => (
        <text key={i} x={sx(s)} y={pad.t - 4} textAnchor="middle" fontSize="7.5" fill="#F59E0B" fontWeight="600">
          x={s}
        </text>
      ))}
      <text x={sx(0.15)} y={sy(means[0]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[0]}</text>
      <text x={sx(0.43)} y={sy(means[1]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[1]}</text>
      <text x={sx(0.64)} y={sy(means[2]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[2]}</text>
      <text x={sx(0.84)} y={sy(means[3]) - 6} fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="600">ȳ={means[3]}</text>
    </svg>
  )
}

// ── Logistic Regression: sigmoid curve, threshold, class regions ──────────────
function LogisticRegressionViz() {
  const W = 320, H = 215
  const pad = { l: 42, r: 16, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // x axis: linear score from -6 to +6
  const xMin = -6, xMax = 6
  const sx = (v: number) => pad.l + ((v - xMin) / (xMax - xMin)) * pw
  const sy = (p: number) => pad.t + (1 - p) * ph
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

  const steps = 100
  const sigPoints = Array.from({ length: steps + 1 }, (_, i) => {
    const z = xMin + (i / steps) * (xMax - xMin)
    return `${sx(z)},${sy(sigmoid(z))}`
  }).join(" ")

  const threshold = 0   // decision boundary at z=0 → p=0.5
  const threshX = sx(threshold)

  // Axis ticks
  const xTicks = [-6, -4, -2, 0, 2, 4, 6]
  const yTicks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class region fills */}
      <rect x={pad.l} y={pad.t} width={threshX - pad.l} height={ph} fill="#FEE2E2" opacity="0.4" />
      <rect x={threshX} y={pad.t} width={W - pad.r - threshX} height={ph} fill="#D1FAE5" opacity="0.4" />

      {/* grid lines */}
      {yTicks.map(p => (
        <line key={p} x1={pad.l} y1={sy(p)} x2={W - pad.r} y2={sy(p)}
          stroke="#E5E7EB" strokeWidth="0.8" />
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />

      {/* axis labels */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Linear score  βᵀx</text>
      <text x={11} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H / 2})`}>P(y=1|x)</text>

      {/* y axis ticks */}
      {yTicks.map(p => (
        <g key={p}>
          <line x1={pad.l - 3} y1={sy(p)} x2={pad.l} y2={sy(p)} stroke="#9CA3AF" strokeWidth="1" />
          <text x={pad.l - 5} y={sy(p) + 3} textAnchor="end" fontSize="7" fill="#9CA3AF">{p}</text>
        </g>
      ))}

      {/* x axis ticks */}
      {xTicks.map(v => (
        <g key={v}>
          <line x1={sx(v)} y1={H - pad.b} x2={sx(v)} y2={H - pad.b + 3} stroke="#9CA3AF" strokeWidth="1" />
          <text x={sx(v)} y={H - pad.b + 11} textAnchor="middle" fontSize="7" fill="#9CA3AF">{v}</text>
        </g>
      ))}

      {/* decision boundary */}
      <line x1={threshX} y1={pad.t} x2={threshX} y2={H - pad.b}
        stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={threshX + 3} y={pad.t + 10} fontSize="7.5" fill="#F59E0B" fontWeight="600">threshold</text>
      <text x={threshX + 3} y={pad.t + 19} fontSize="7.5" fill="#F59E0B">p=0.5</text>

      {/* 0.5 horizontal line */}
      <line x1={pad.l} y1={sy(0.5)} x2={W - pad.r} y2={sy(0.5)}
        stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />

      {/* sigmoid curve */}
      <polyline points={sigPoints} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* class labels */}
      <text x={pad.l + 10} y={pad.t + 20} fontSize="8" fill="#EF4444" fontWeight="700">Class 0</text>
      <text x={W - pad.r - 44} y={pad.t + 20} fontSize="8" fill="#059669" fontWeight="700">Class 1</text>

      {/* formula annotation */}
      <text x={sx(2.2)} y={sy(0.88)} fontSize="8.5" fill="#10B981" fontWeight="600">σ(z) = 1/(1+e⁻ᶻ)</text>
    </svg>
  )
}

// ── SVM: margin, support vectors, decision boundary ───────────────────────────
function SVMViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Decision boundary: yn = 0.5 (horizontal in normalised space) + slope
  // boundary: y = 0.3 + 0.5x (in [0,1] space)
  const f  = (x: number) => 0.32 + 0.5 * x
  const m  = 0.16   // half-margin width

  // Points: class +1 (blue, above) and class -1 (orange, below)
  const pos: [number, number, boolean][] = [
    [0.15,0.75,false],[0.25,0.85,false],[0.35,0.78,false],
    [0.50,0.90,false],[0.60,0.80,false],[0.70,0.88,false],
    [0.40,0.65,true ],[0.55,0.72,true ],  // support vectors (pos)
  ]
  const neg: [number, number, boolean][] = [
    [0.10,0.18,false],[0.20,0.28,false],[0.30,0.22,false],
    [0.55,0.38,false],[0.68,0.28,false],[0.80,0.20,false],
    [0.28,0.40,true ],[0.45,0.48,true ],  // support vectors (neg)
  ]

  const lineX0 = 0, lineX1 = 1
  const boundaryPts = `${sx(lineX0)},${sy(f(lineX0))} ${sx(lineX1)},${sy(f(lineX1))}`
  const upperPts    = `${sx(lineX0)},${sy(f(lineX0)+m)} ${sx(lineX1)},${sy(f(lineX1)+m)}`
  const lowerPts    = `${sx(lineX0)},${sy(f(lineX0)-m)} ${sx(lineX1)},${sy(f(lineX1)-m)}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* margin fill */}
      <polygon
        points={`${sx(0)},${sy(f(0)+m)} ${sx(1)},${sy(f(1)+m)} ${sx(1)},${sy(f(1)-m)} ${sx(0)},${sy(f(0)-m)}`}
        fill="#FEF3C7" opacity="0.6"
      />

      {/* margin lines */}
      <polyline points={upperPts} fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="5,3" />
      <polyline points={lowerPts} fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="5,3" />

      {/* decision boundary */}
      <polyline points={boundaryPts} fill="none" stroke="#064E3B" strokeWidth="2.2" />

      {/* margin annotation */}
      <line x1={sx(0.85)} y1={sy(f(0.85)+m)} x2={sx(0.85)} y2={sy(f(0.85)-m)}
        stroke="#F59E0B" strokeWidth="1" />
      <text x={sx(0.87)} y={sy(f(0.85))+3} fontSize="8.5" fill="#F59E0B" fontWeight="700">2/‖w‖</text>

      {/* positive class points */}
      {pos.map(([xn, yn, isSV], i) => (
        <g key={i}>
          {isSV && <circle cx={sx(xn)} cy={sy(yn)} r={8.5} fill="none" stroke="#3B82F6" strokeWidth="1.8" />}
          <circle cx={sx(xn)} cy={sy(yn)} r={4} fill="#3B82F6" />
        </g>
      ))}

      {/* negative class points */}
      {neg.map(([xn, yn, isSV], i) => (
        <g key={i}>
          {isSV && <circle cx={sx(xn)} cy={sy(yn)} r={8.5} fill="none" stroke="#F97316" strokeWidth="1.8" />}
          <circle cx={sx(xn)} cy={sy(yn)} r={4} fill="#F97316" />
        </g>
      ))}

      {/* labels */}
      <text x={sx(0.82)} y={sy(0.86)} fontSize="8" fill="#3B82F6" fontWeight="700">+1</text>
      <text x={sx(0.82)} y={sy(0.20)} fontSize="8" fill="#F97316" fontWeight="700">−1</text>
      <text x={sx(0.02)} y={sy(f(0.02)) - 7} fontSize="8" fill="#064E3B" fontWeight="600">decision boundary</text>

      {/* legend */}
      <circle cx={pad.l + 8} cy={H - pad.b + 14} r={4} fill="#3B82F6" />
      <text x={pad.l + 15} y={H - pad.b + 17} fontSize="7" fill="#6B7280">class +1</text>
      <circle cx={pad.l + 70} cy={H - pad.b + 14} r={4} fill="#F97316" />
      <text x={pad.l + 77} y={H - pad.b + 17} fontSize="7" fill="#6B7280">class −1</text>
      <circle cx={pad.l + 136} cy={H - pad.b + 14} r={4} fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.8" />
      <circle cx={pad.l + 136} cy={H - pad.b + 14} r={7.5} fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={pad.l + 147} y={H - pad.b + 17} fontSize="7" fill="#6B7280">support vector</text>
    </svg>
  )
}

// ── KNN: query point + K nearest neighbours ───────────────────────────────────
function KNNViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Class A (green) and Class B (orange)
  const classA: [number, number][] = [
    [0.12,0.75],[0.20,0.60],[0.18,0.88],[0.30,0.82],[0.35,0.68],
    [0.08,0.55],[0.25,0.45],[0.40,0.78],[0.15,0.42],
  ]
  const classB: [number, number][] = [
    [0.72,0.30],[0.80,0.20],[0.65,0.18],[0.88,0.38],[0.76,0.50],
    [0.60,0.35],[0.90,0.22],[0.82,0.62],[0.68,0.60],
  ]

  // Query point
  const qx = 0.47, qy = 0.55

  // K=5 neighbours (mix: 3 green, 2 orange — predict green)
  const neighbours: { x: number; y: number; cls: "A" | "B" }[] = [
    { x: 0.40, y: 0.78, cls: "A" },
    { x: 0.35, y: 0.68, cls: "A" },
    { x: 0.60, y: 0.35, cls: "B" },
    { x: 0.68, y: 0.60, cls: "B" },
    { x: 0.30, y: 0.82, cls: "A" },
  ]

  // Radius of KNN circle (encompassing all 5 neighbours)
  const dist = (a: { x: number; y: number }) =>
    Math.sqrt(((a.x - qx) * pw) ** 2 + ((a.y - qy) * ph) ** 2)
  const radius = Math.max(...neighbours.map(dist)) + 6

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* KNN search radius */}
      <circle cx={sx(qx)} cy={sy(qy)} r={radius} fill="#F0FDF9" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5,3" />

      {/* neighbour connection lines */}
      {neighbours.map((n, i) => (
        <line key={i}
          x1={sx(qx)} y1={sy(qy)} x2={sx(n.x)} y2={sy(n.y)}
          stroke={n.cls === "A" ? "#059669" : "#F97316"} strokeWidth="1" opacity="0.5"
        />
      ))}

      {/* class A points */}
      {classA.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#059669" opacity="0.85" />
      ))}

      {/* class B points */}
      {classB.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#F97316" opacity="0.85" />
      ))}

      {/* highlighted neighbours */}
      {neighbours.map((n, i) => (
        <circle key={i}
          cx={sx(n.x)} cy={sy(n.y)} r={6.5}
          fill={n.cls === "A" ? "#059669" : "#F97316"}
          stroke="white" strokeWidth="1.5"
        />
      ))}

      {/* query point */}
      <circle cx={sx(qx)} cy={sy(qy)} r={7} fill="#7C3AED" />
      <text x={sx(qx) + 10} y={sy(qy) - 8} fontSize="8.5" fill="#7C3AED" fontWeight="700">query x*</text>

      {/* vote summary */}
      <rect x={W - pad.r - 84} y={pad.t} width={82} height={46} rx="6" fill="white" stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W - pad.r - 42} y={pad.t + 12} textAnchor="middle" fontSize="7.5" fill="#064E3B" fontWeight="700">K=5 vote</text>
      <circle cx={W - pad.r - 68} cy={pad.t + 25} r={4} fill="#059669" />
      <text x={W - pad.r - 60} y={pad.t + 28} fontSize="7.5" fill="#059669" fontWeight="700">3 × A</text>
      <circle cx={W - pad.r - 68} cy={pad.t + 39} r={4} fill="#F97316" />
      <text x={W - pad.r - 60} y={pad.t + 42} fontSize="7.5" fill="#F97316">2 × B</text>
      <text x={W - pad.r - 42} y={pad.t + 56} textAnchor="middle" fontSize="7.5" fill="#059669" fontWeight="700">→ predict A</text>

      {/* legend */}
      <circle cx={pad.l + 6} cy={H - pad.b + 14} r={4.5} fill="#059669" />
      <text x={pad.l + 14} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class A</text>
      <circle cx={pad.l + 62} cy={H - pad.b + 14} r={4.5} fill="#F97316" />
      <text x={pad.l + 70} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class B</text>
      <circle cx={pad.l + 118} cy={H - pad.b + 14} r={5} fill="#7C3AED" />
      <text x={pad.l + 126} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Query point</text>
    </svg>
  )
}

// ── Naive Bayes: class-conditional Gaussian densities ────────────────────────
function NaiveBayesViz() {
  const W = 320, H = 215
  const pad = { l: 42, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // Feature x range [−4, 6]
  const xMin = -4, xMax = 6
  const sx = (v: number) => pad.l + ((v - xMin) / (xMax - xMin)) * pw
  const sy = (p: number) => pad.t + (1 - p) * ph   // 0=bottom, 1=top

  const gauss = (x: number, mu: number, sig: number) =>
    (1 / (sig * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sig) ** 2)

  const mu0 = 0, sig0 = 1.2   // class 0 (red)
  const mu1 = 3, sig1 = 1.0   // class 1 (green)
  const maxDensity = Math.max(gauss(mu0, mu0, sig0), gauss(mu1, mu1, sig1))

  const steps = 120
  const pts0 = Array.from({ length: steps + 1 }, (_, i) => {
    const x = xMin + (i / steps) * (xMax - xMin)
    return `${sx(x)},${sy(gauss(x, mu0, sig0) / maxDensity * 0.88)}`
  }).join(" ")
  const pts1 = Array.from({ length: steps + 1 }, (_, i) => {
    const x = xMin + (i / steps) * (xMax - xMin)
    return `${sx(x)},${sy(gauss(x, mu1, sig1) / maxDensity * 0.88)}`
  }).join(" ")

  // Decision boundary: where P(x|y=0)π₀ = P(x|y=1)π₁ (assume equal priors → where densities cross)
  // Numerically between mu0 and mu1
  let boundX = (mu0 + mu1) / 2
  // Refine: log p(x|0) = log p(x|1) → -(x-mu0)²/(2σ0²) + log(σ1/σ0) = -(x-mu1)²/(2σ1²)
  // Approximate: just find x where gauss(x,0,sig0)≈gauss(x,3,sig1)
  for (let xi = mu0; xi <= mu1; xi += 0.01) {
    if (gauss(xi, mu1, sig1) >= gauss(xi, mu0, sig0)) { boundX = xi; break }
  }

  const xTicks = [-4, -2, 0, 2, 4, 6]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class region shading */}
      <rect x={pad.l} y={pad.t} width={sx(boundX) - pad.l} height={ph} fill="#FEE2E2" opacity="0.3" />
      <rect x={sx(boundX)} y={pad.t} width={W - pad.r - sx(boundX)} height={ph} fill="#D1FAE5" opacity="0.3" />

      {/* filled area under curves */}
      <polygon
        points={`${sx(xMin)},${sy(0)} ${pts0} ${sx(xMax)},${sy(0)}`}
        fill="#FCA5A5" opacity="0.25"
      />
      <polygon
        points={`${sx(xMin)},${sy(0)} ${pts1} ${sx(xMax)},${sy(0)}`}
        fill="#6EE7B7" opacity="0.25"
      />

      {/* curve lines */}
      <polyline points={pts0} fill="none" stroke="#EF4444" strokeWidth="2" />
      <polyline points={pts1} fill="none" stroke="#10B981" strokeWidth="2" />

      {/* axes */}
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>P(x | y)</text>

      {/* x ticks */}
      {xTicks.map(v => (
        <g key={v}>
          <line x1={sx(v)} y1={H - pad.b} x2={sx(v)} y2={H - pad.b + 3} stroke="#9CA3AF" strokeWidth="1" />
          <text x={sx(v)} y={H - pad.b + 11} textAnchor="middle" fontSize="7" fill="#9CA3AF">{v}</text>
        </g>
      ))}

      {/* decision boundary */}
      <line x1={sx(boundX)} y1={pad.t} x2={sx(boundX)} y2={H - pad.b}
        stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="4,2" />
      <text x={sx(boundX) + 3} y={pad.t + 10} fontSize="7.5" fill="#F59E0B" fontWeight="600">decision</text>
      <text x={sx(boundX) + 3} y={pad.t + 19} fontSize="7.5" fill="#F59E0B">boundary</text>

      {/* mean annotations */}
      <line x1={sx(mu0)} y1={H - pad.b - 4} x2={sx(mu0)} y2={H - pad.b + 3} stroke="#EF4444" strokeWidth="1.5" />
      <text x={sx(mu0)} y={H - pad.b - 7} textAnchor="middle" fontSize="7.5" fill="#EF4444" fontWeight="600">μ₀={mu0}</text>
      <line x1={sx(mu1)} y1={H - pad.b - 4} x2={sx(mu1)} y2={H - pad.b + 3} stroke="#10B981" strokeWidth="1.5" />
      <text x={sx(mu1)} y={H - pad.b - 7} textAnchor="middle" fontSize="7.5" fill="#10B981" fontWeight="600">μ₁={mu1}</text>

      {/* curve labels */}
      <text x={sx(mu0) - 30} y={sy(gauss(mu0, mu0, sig0) / maxDensity * 0.88) - 6} fontSize="8" fill="#EF4444" fontWeight="700">P(x|y=0)</text>
      <text x={sx(mu1) + 6} y={sy(gauss(mu1, mu1, sig1) / maxDensity * 0.88) - 6} fontSize="8" fill="#10B981" fontWeight="700">P(x|y=1)</text>
    </svg>
  )
}

// ── Decision Tree Classifier: 2D feature space with rectangular regions ───────
function DecisionTreeClassifierViz() {
  const W = 320, H = 215
  const pad = { l: 34, r: 14, t: 14, b: 34 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Splits: vertical at x=0.5, then horizontal at y=0.55 (left region), y=0.35 (right region)
  const vSplit = 0.50
  const hSplitL = 0.55
  const hSplitR = 0.38

  // Regions → class colours
  const regions = [
    { x1:0, x2:vSplit, y1:hSplitL, y2:1,        cls: "A", fill:"#D1FAE5" },
    { x1:0, x2:vSplit, y1:0, y2:hSplitL,         cls: "B", fill:"#FEE2E2" },
    { x1:vSplit, x2:1, y1:hSplitR, y2:1,          cls: "A", fill:"#D1FAE5" },
    { x1:vSplit, x2:1, y1:0, y2:hSplitR,          cls: "B", fill:"#FEE2E2" },
  ]

  // Data points [x, y, class]
  const pts: [number, number, "A" | "B"][] = [
    [0.10,0.70,"A"],[0.18,0.80,"A"],[0.28,0.72,"A"],[0.35,0.90,"A"],[0.42,0.62,"A"],
    [0.08,0.30,"B"],[0.20,0.25,"B"],[0.32,0.40,"B"],[0.44,0.32,"B"],[0.15,0.48,"B"],
    [0.58,0.58,"A"],[0.68,0.72,"A"],[0.78,0.80,"A"],[0.88,0.65,"A"],[0.94,0.55,"A"],
    [0.56,0.20,"B"],[0.70,0.28,"B"],[0.80,0.18,"B"],[0.90,0.30,"B"],[0.62,0.35,"B"],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* region fills */}
      {regions.map((r, i) => (
        <rect key={i}
          x={sx(r.x1)} y={sy(r.y2)}
          width={sx(r.x2) - sx(r.x1)}
          height={sy(r.y1) - sy(r.y2)}
          fill={r.fill} opacity="0.55"
        />
      ))}

      {/* split lines */}
      <line x1={sx(vSplit)} y1={pad.t} x2={sx(vSplit)} y2={H - pad.b}
        stroke="#F59E0B" strokeWidth="2" />
      <line x1={pad.l} y1={sy(hSplitL)} x2={sx(vSplit)} y2={sy(hSplitL)}
        stroke="#F59E0B" strokeWidth="2" />
      <line x1={sx(vSplit)} y1={sy(hSplitR)} x2={W - pad.r} y2={sy(hSplitR)}
        stroke="#F59E0B" strokeWidth="2" />

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x₁</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H / 2})`}>Feature x₂</text>

      {/* split labels */}
      <text x={sx(vSplit)} y={pad.t - 3} textAnchor="middle" fontSize="7.5" fill="#F59E0B" fontWeight="600">x₁≤0.5?</text>
      <text x={sx(0.08)} y={sy(hSplitL) - 3} fontSize="7.5" fill="#F59E0B" fontWeight="600">x₂≤0.55?</text>
      <text x={sx(0.57)} y={sy(hSplitR) - 3} fontSize="7.5" fill="#F59E0B" fontWeight="600">x₂≤0.38?</text>

      {/* region class labels */}
      <text x={sx(0.25)} y={sy(0.77)} textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">Class A</text>
      <text x={sx(0.25)} y={sy(0.32)} textAnchor="middle" fontSize="9" fill="#EF4444" fontWeight="700">Class B</text>
      <text x={sx(0.75)} y={sy(0.65)} textAnchor="middle" fontSize="9" fill="#059669" fontWeight="700">Class A</text>
      <text x={sx(0.75)} y={sy(0.20)} textAnchor="middle" fontSize="9" fill="#EF4444" fontWeight="700">Class B</text>

      {/* data points */}
      {pts.map(([xn, yn, cls], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4}
          fill={cls === "A" ? "#059669" : "#EF4444"} opacity="0.9" />
      ))}
    </svg>
  )
}

// ── LDA: shared-covariance Gaussians + linear boundary + projection ───────────
function LDAViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Two classes with same covariance (similar ellipse shape)
  // Class 0 (red): centre (0.28, 0.65)
  // Class 1 (blue): centre (0.70, 0.38)
  const pts0: [number, number][] = [
    [0.18,0.72],[0.22,0.58],[0.30,0.78],[0.35,0.62],[0.28,0.85],
    [0.38,0.70],[0.15,0.60],[0.25,0.50],[0.40,0.55],
  ]
  const pts1: [number, number][] = [
    [0.62,0.30],[0.68,0.45],[0.72,0.28],[0.78,0.42],[0.65,0.55],
    [0.82,0.35],[0.58,0.22],[0.75,0.18],[0.88,0.48],
  ]

  // Linear decision boundary: perpendicular bisector of the two means
  // midpoint (0.49, 0.515); direction perpendicular to (0.42, -0.27) → slope
  // boundary passes through midpoint with slope normal to mean difference
  // dy/dx for boundary = -dx_mean/dy_mean = -(0.70-0.28)/(0.38-0.65) = 0.42/0.27 ≈ 1.56
  // boundary line: y - 0.515 = 1.56*(x - 0.49)
  const bnd = (x: number) => 0.515 + 1.56 * (x - 0.49)

  // Projection axis (LDA direction): mean difference direction
  // project onto 1D axis shown at bottom
  const projY = 0.08
  const projPts0 = pts0.map(([x]) => x * 0.42 + 0.28 * (1 - x))  // approximate projections
  const projPts1 = pts1.map(([x]) => x * 0.42 + 0.70 * (1 - x))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class 0 ellipse (shared covariance) */}
      <ellipse cx={sx(0.28)} cy={sy(0.66)} rx={48} ry={30}
        transform={`rotate(-20,${sx(0.28)},${sy(0.66)})`}
        fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" opacity="0.5" />
      {/* class 1 ellipse (same shape = LDA assumption) */}
      <ellipse cx={sx(0.70)} cy={sy(0.37)} rx={48} ry={30}
        transform={`rotate(-20,${sx(0.70)},${sy(0.37)})`}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />

      {/* decision boundary */}
      {(() => {
        const x0 = 0.25, x1 = 0.72
        return <line
          x1={sx(x0)} y1={sy(bnd(x0))} x2={sx(x1)} y2={sy(bnd(x1))}
          stroke="#064E3B" strokeWidth="2.2"
        />
      })()}

      {/* class 0 points */}
      {pts0.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#EF4444" opacity="0.9" />
      ))}
      {/* class 1 points */}
      {pts1.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#3B82F6" opacity="0.9" />
      ))}

      {/* class means */}
      <circle cx={sx(0.28)} cy={sy(0.66)} r={6} fill="#EF4444" stroke="white" strokeWidth="1.5" />
      <circle cx={sx(0.70)} cy={sy(0.37)} r={6} fill="#3B82F6" stroke="white" strokeWidth="1.5" />
      <text x={sx(0.22)} y={sy(0.66) - 9} fontSize="7.5" fill="#EF4444" fontWeight="700">μ₀</text>
      <text x={sx(0.72)} y={sy(0.37) - 9} fontSize="7.5" fill="#3B82F6" fontWeight="700">μ₁</text>

      {/* shared covariance note */}
      <text x={sx(0.50)} y={pad.t + 10} textAnchor="middle" fontSize="7.5" fill="#064E3B" fontWeight="600">Σ₀ = Σ₁ = Σ  →  linear boundary</text>

      {/* projection axis */}
      <line x1={pad.l} y1={sy(projY)} x2={W - pad.r} y2={sy(projY)} stroke="#9CA3AF" strokeWidth="1.2" />
      <text x={W - pad.r - 4} y={sy(projY) + 10} textAnchor="end" fontSize="7.5" fill="#9CA3AF">LDA axis</text>
      {pts0.map(([xn], i) => (
        <line key={i} x1={sx(xn)} y1={sy(projY) - 4} x2={sx(xn)} y2={sy(projY) + 4}
          stroke="#EF4444" strokeWidth="2" opacity="0.6" />
      ))}
      {pts1.map(([xn], i) => (
        <line key={i} x1={sx(xn)} y1={sy(projY) - 4} x2={sx(xn)} y2={sy(projY) + 4}
          stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
      ))}

      {/* legend */}
      <circle cx={pad.l + 6} cy={H - pad.b + 14} r={4} fill="#EF4444" />
      <text x={pad.l + 13} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 0</text>
      <circle cx={pad.l + 60} cy={H - pad.b + 14} r={4} fill="#3B82F6" />
      <text x={pad.l + 67} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 1</text>
      <line x1={pad.l + 116} y1={H - pad.b + 14} x2={pad.l + 132} y2={H - pad.b + 14} stroke="#064E3B" strokeWidth="2" />
      <text x={pad.l + 135} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Linear boundary</text>
    </svg>
  )
}

// ── QDA: class-specific covariances + quadratic boundary ─────────────────────
function QDAViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const sx = (xn: number) => pad.l + xn * pw
  const sy = (yn: number) => pad.t + (1 - yn) * ph

  // Class 0 (red): narrow vertical ellipse, centre (0.28, 0.62)
  // Class 1 (blue): wide horizontal ellipse, centre (0.72, 0.45)
  const pts0: [number, number][] = [
    [0.22,0.78],[0.26,0.55],[0.30,0.82],[0.32,0.60],[0.24,0.68],
    [0.28,0.44],[0.20,0.52],[0.34,0.74],[0.18,0.72],
  ]
  const pts1: [number, number][] = [
    [0.52,0.50],[0.60,0.60],[0.70,0.70],[0.80,0.55],[0.90,0.62],
    [0.55,0.30],[0.65,0.22],[0.78,0.35],[0.88,0.28],
  ]

  // Approximate quadratic boundary as a cubic bezier curve
  // separating the two groups
  const qBoundary = `M ${sx(0.38)},${sy(0.95)} C ${sx(0.50)},${sy(0.60)} ${sx(0.52)},${sy(0.40)} ${sx(0.42)},${sy(0.05)}`
  // Also draw the LDA linear boundary (dashed) for comparison
  const ldaBnd = (x: number) => 0.55 + 0.2 * (x - 0.50)   // roughly

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* class 0 ellipse: narrow, tilted */}
      <ellipse cx={sx(0.27)} cy={sy(0.64)} rx={18} ry={46}
        transform={`rotate(10,${sx(0.27)},${sy(0.64)})`}
        fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" opacity="0.55" />

      {/* class 1 ellipse: wide, horizontal — DIFFERENT shape from class 0 */}
      <ellipse cx={sx(0.72)} cy={sy(0.45)} rx={62} ry={26}
        transform={`rotate(-5,${sx(0.72)},${sy(0.45)})`}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" opacity="0.55" />

      {/* LDA boundary (dashed) for comparison */}
      <line x1={sx(0.35)} y1={sy(ldaBnd(0.35))} x2={sx(0.70)} y2={sy(ldaBnd(0.70))}
        stroke="#9CA3AF" strokeWidth="1.2" strokeDasharray="4,2" />
      <text x={sx(0.68)} y={sy(ldaBnd(0.68)) - 5} fontSize="7" fill="#9CA3AF">LDA (linear)</text>

      {/* QDA quadratic boundary */}
      <path d={qBoundary} fill="none" stroke="#064E3B" strokeWidth="2.2" />
      <text x={sx(0.44)} y={sy(0.82)} fontSize="7.5" fill="#064E3B" fontWeight="700">QDA</text>
      <text x={sx(0.44)} y={sy(0.74)} fontSize="7.5" fill="#064E3B">(quadratic)</text>

      {/* class 0 points */}
      {pts0.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#EF4444" opacity="0.9" />
      ))}
      {/* class 1 points */}
      {pts1.map(([xn, yn], i) => (
        <circle key={i} cx={sx(xn)} cy={sy(yn)} r={4.5} fill="#3B82F6" opacity="0.9" />
      ))}

      {/* class means */}
      <circle cx={sx(0.27)} cy={sy(0.64)} r={5.5} fill="#EF4444" stroke="white" strokeWidth="1.5" />
      <text x={sx(0.30)} y={sy(0.64) - 8} fontSize="7.5" fill="#EF4444" fontWeight="700">μ₀, Σ₀</text>
      <circle cx={sx(0.72)} cy={sy(0.45)} r={5.5} fill="#3B82F6" stroke="white" strokeWidth="1.5" />
      <text x={sx(0.74)} y={sy(0.45) - 8} fontSize="7.5" fill="#3B82F6" fontWeight="700">μ₁, Σ₁</text>

      {/* key difference note */}
      <text x={W / 2} y={pad.t - 3} textAnchor="middle" fontSize="7.5" fill="#064E3B" fontWeight="600">Σ₀ ≠ Σ₁  →  quadratic boundary</text>

      {/* legend */}
      <ellipse cx={pad.l + 8} cy={H - pad.b + 14} rx={6} ry={9} fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" />
      <text x={pad.l + 18} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 0 (Σ₀)</text>
      <ellipse cx={pad.l + 94} cy={H - pad.b + 14} rx={9} ry={6} fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
      <text x={pad.l + 107} y={H - pad.b + 17} fontSize="7" fill="#6B7280">Class 1 (Σ₁)</text>
    </svg>
  )
}

// ── Random Forest: multiple trees voting ─────────────────────────────────────
function RandomForestViz() {
  const W = 320, H = 215
  const treeW = 64, treeH = 90
  const gap = 14
  const totalW = 3 * treeW + 2 * gap
  const startX = (W - totalW) / 2
  const treesY = 14

  // Draw a tiny decision tree (3 nodes, 4 leaves)
  function MiniTree({ x, y, vote, col }: { x: number; y: number; vote: string; col: string }) {
    const cx = x + treeW / 2
    const rootY = y + 14
    const midY = y + 44
    const leafY = y + 72
    const lx1 = cx - 22, lx2 = cx - 6, rx1 = cx + 6, rx2 = cx + 22
    return (
      <g>
        <rect x={x} y={y} width={treeW} height={treeH} rx="6" fill="#F9FAFB" stroke="#D1FAE5" strokeWidth="1.2" />
        {/* root */}
        <circle cx={cx} cy={rootY} r={7} fill="#064E3B" />
        {/* mid level */}
        <line x1={cx} y1={rootY+7} x2={lx1} y2={midY-6} stroke="#9CA3AF" strokeWidth="1" />
        <line x1={cx} y1={rootY+7} x2={rx1+16} y2={midY-6} stroke="#9CA3AF" strokeWidth="1" />
        <circle cx={lx1} cy={midY} r={6} fill="#374151" />
        <circle cx={rx1+16} cy={midY} r={6} fill="#374151" />
        {/* leaves */}
        <line x1={lx1} y1={midY+6} x2={lx1-8} y2={leafY-5} stroke="#9CA3AF" strokeWidth="1" />
        <line x1={lx1} y1={midY+6} x2={lx1+8} y2={leafY-5} stroke="#9CA3AF" strokeWidth="1" />
        <line x1={rx1+16} y1={midY+6} x2={rx2+14} y2={leafY-5} stroke="#9CA3AF" strokeWidth="1" />
        <rect x={lx1-12} y={leafY-5} width={14} height={10} rx="2" fill={col} opacity="0.85" />
        <rect x={lx1-2}  y={leafY-5} width={14} height={10} rx="2" fill="#9CA3AF" opacity="0.5" />
        <rect x={rx2+8}  y={leafY-5} width={14} height={10} rx="2" fill={col} opacity="0.85" />
        {/* vote label */}
        <text x={cx} y={y+treeH+13} textAnchor="middle" fontSize="8" fill={col} fontWeight="700">→ {vote}</text>
      </g>
    )
  }

  const trees = [
    { vote: "Class A", col: "#10B981" },
    { vote: "Class A", col: "#10B981" },
    { vote: "Class B", col: "#F97316" },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {trees.map((t, i) => (
        <MiniTree key={i} x={startX + i * (treeW + gap)} y={treesY} vote={t.vote} col={t.col} />
      ))}

      {/* vote arrows */}
      {trees.map((t, i) => {
        const tx = startX + i * (treeW + gap) + treeW / 2
        return <line key={i} x1={tx} y1={treesY+treeH+24} x2={W/2} y2={H-40}
          stroke="#D1D5DB" strokeWidth="1.2" strokeDasharray="3,2" />
      })}

      {/* majority vote box */}
      <rect x={W/2-55} y={H-42} width={110} height={28} rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      <text x={W/2} y={H-32} textAnchor="middle" fontSize="8" fill="#064E3B" fontWeight="700">Majority vote:</text>
      <text x={W/2} y={H-20} textAnchor="middle" fontSize="9" fill="#10B981" fontWeight="700">Class A (2 vs 1)</text>

      {/* bootstrap annotation */}
      <text x={startX - 2} y={treesY - 3} fontSize="7.5" fill="#9CA3AF">bootstrap samples + random features</text>
    </svg>
  )
}

// ── Gradient Boosting: sequential residual correction ────────────────────────
function GradientBoostingViz() {
  const W = 320, H = 215
  const pad = { l: 38, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const data: [number, number][] = [
    [0.05,0.18],[0.12,0.40],[0.20,0.55],[0.28,0.62],[0.36,0.75],
    [0.45,0.68],[0.53,0.82],[0.62,0.70],[0.72,0.88],[0.82,0.78],[0.92,0.92],
  ]

  // F0: mean prediction (flat line at 0.65)
  const F0 = 0.65
  // F1: after first tree (rough step function)
  const F1 = (x: number) => x < 0.35 ? 0.38 : x < 0.65 ? 0.72 : 0.86
  // F2: closer to true values
  const F2 = (x: number) => 0.12 + 0.82 * x + 0.08 * Math.sin(x * 5)

  const steps = 80
  const f1Pts = Array.from({length: steps+1},(_,i) => `${sx(i/steps)},${sy(F1(i/steps))}`).join(" ")
  const f2Pts = Array.from({length: steps+1},(_,i) => `${sx(i/steps)},${sy(F2(i/steps))}`).join(" ")

  // Residuals after F0
  const residuals = data.map(([x,y]) => ({ x, r: y - F0 }))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W/2} y={H-4} textAnchor="middle" fontSize="8" fill="#9CA3AF">x</text>
      <text x={12} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,12,${H/2})`}>y</text>

      {/* F0: initial flat mean */}
      <line x1={sx(0)} y1={sy(F0)} x2={sx(1)} y2={sy(F0)}
        stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={sx(0.02)+2} y={sy(F0)-4} fontSize="7.5" fill="#9CA3AF">F₀ (mean)</text>

      {/* residual lines from F0 */}
      {residuals.map((r,i) => (
        <line key={i}
          x1={sx(r.x)} y1={sy(F0)} x2={sx(r.x)} y2={sy(F0 + r.r)}
          stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="2,1.5" opacity="0.7" />
      ))}

      {/* F1: after tree 1 */}
      <polyline points={f1Pts} fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="5,2" />
      <text x={sx(0.66)} y={sy(F1(0.66))-6} fontSize="7.5" fill="#F59E0B" fontWeight="600">F₁</text>

      {/* F2: closer fit */}
      <polyline points={f2Pts} fill="none" stroke="#10B981" strokeWidth="2.2" />
      <text x={sx(0.50)} y={sy(F2(0.50))-7} fontSize="7.5" fill="#10B981" fontWeight="600">F₂ (after 2 trees)</text>

      {/* data points */}
      {data.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={4} fill="#064E3B" opacity="0.8" />)}

      {/* legend */}
      <line x1={pad.l+2} y1={H-pad.b+14} x2={pad.l+16} y2={H-pad.b+14} stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="2,1.5" />
      <text x={pad.l+19} y={H-pad.b+18} fontSize="7" fill="#6B7280">residual</text>
      <line x1={pad.l+70} y1={H-pad.b+14} x2={pad.l+84} y2={H-pad.b+14} stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="5,2" />
      <text x={pad.l+87} y={H-pad.b+18} fontSize="7" fill="#6B7280">F₁</text>
      <line x1={pad.l+108} y1={H-pad.b+14} x2={pad.l+122} y2={H-pad.b+14} stroke="#10B981" strokeWidth="2.2" />
      <text x={pad.l+125} y={H-pad.b+18} fontSize="7" fill="#6B7280">F₂</text>
    </svg>
  )
}

// ── XGBoost: gain formula + regularised split ─────────────────────────────────
function XGBoostViz() {
  const W = 320, H = 215
  const pad = { l: 24, r: 16, t: 14, b: 28 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // Two panels: left = gradient landscape, right = split gain illustration
  const divX = 0.52

  // Left: gradient (gᵢ) and hessian (hᵢ) for each point
  const pts: {x:number; g:number; h:number}[] = [
    {x:0.08, g:0.60, h:0.24},{x:0.16, g:0.40, h:0.24},{x:0.24, g:0.20, h:0.20},
    {x:0.32, g:-0.10, h:0.18},{x:0.40, g:-0.30, h:0.21},{x:0.48, g:-0.50, h:0.25},
  ]

  // Right: split gain bar chart
  const splits = [
    { label: "x≤0.3", gain: 0.72, col: "#10B981" },
    { label: "x≤0.5", gain: 0.45, col: "#F59E0B" },
    { label: "x≤0.7", gain: 0.28, col: "#9CA3AF" },
  ]
  const barMaxH = 0.60
  const barW = 0.08
  const barStartX = divX + 0.06

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* divider */}
      <line x1={sx(divX)} y1={pad.t} x2={sx(divX)} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1" strokeDasharray="3,2" />

      {/* LEFT: gradients & hessians */}
      <text x={sx(0.24)} y={pad.t+2} textAnchor="middle" fontSize="8" fill="#064E3B" fontWeight="700">Gradients gᵢ & Hessians hᵢ</text>
      {/* gradient bars */}
      {pts.map((p,i) => (
        <g key={i}>
          {/* gradient bar */}
          <rect x={sx(p.x)-6} y={p.g >= 0 ? sy(p.g) : sy(0)}
            width={6} height={Math.abs(p.g) * ph}
            fill={p.g >= 0 ? "#3B82F6" : "#EF4444"} opacity="0.8" />
          {/* hessian dot */}
          <circle cx={sx(p.x)+4} cy={sy(p.h*0.8)} r={p.h*ph*0.35} fill="#F59E0B" opacity="0.6" />
        </g>
      ))}
      {/* zero line */}
      <line x1={sx(0)} y1={sy(0)} x2={sx(divX)} y2={sy(0)} stroke="#9CA3AF" strokeWidth="0.8" />
      <text x={sx(0)+2} y={sy(0)-3} fontSize="6.5" fill="#9CA3AF">0</text>

      {/* legend left */}
      <rect x={pad.l+2} y={H-pad.b+10} width={6} height={6} fill="#3B82F6" opacity="0.8" />
      <text x={pad.l+10} y={H-pad.b+17} fontSize="6.5" fill="#6B7280">gᵢ (gradient)</text>
      <circle cx={pad.l+82} cy={H-pad.b+13} r={4} fill="#F59E0B" opacity="0.6" />
      <text x={pad.l+88} y={H-pad.b+17} fontSize="6.5" fill="#6B7280">hᵢ (hessian)</text>

      {/* RIGHT: split gain bars */}
      <text x={sx(divX + (1-divX)/2)} y={pad.t+2} textAnchor="middle" fontSize="8" fill="#064E3B" fontWeight="700">Split Gain</text>
      {splits.map((s, i) => {
        const bx = barStartX + i * (barW + 0.04)
        return (
          <g key={i}>
            <rect x={sx(bx)} y={sy(s.gain * barMaxH)} width={sx(bx+barW)-sx(bx)} height={s.gain * barMaxH * ph}
              fill={s.col} opacity="0.85" rx="2" />
            <text x={sx(bx + barW/2)} y={sy(s.gain * barMaxH) - 4} textAnchor="middle" fontSize="7.5" fill={s.col} fontWeight="700">{(s.gain).toFixed(2)}</text>
            <text x={sx(bx + barW/2)} y={H-pad.b+14} textAnchor="middle" fontSize="7" fill="#374151">{s.label}</text>
          </g>
        )
      })}
      {/* best split annotation */}
      <text x={sx(barStartX + barW/2)} y={sy(splits[0].gain * barMaxH) - 14} textAnchor="middle" fontSize="7" fill="#10B981">← best</text>

      {/* formula at bottom */}
      <text x={sx(divX + (1-divX)/2)} y={H-pad.b+26} textAnchor="middle" fontSize="7" fill="#374151">Gain = ½[G²_L/(H_L+λ) + G²_R/(H_R+λ) - ...]</text>
    </svg>
  )
}

// ── LightGBM: leaf-wise vs level-wise ────────────────────────────────────────
function LightGBMViz() {
  const W = 320, H = 215
  const halfW = W / 2 - 8

  // Draw a tree given nodes: [cx, cy, r, isLeaf, loss, isExpanded]
  function TreeNode({ cx, cy, fill, r=8 }: {cx:number;cy:number;fill:string;r?:number}) {
    return <circle cx={cx} cy={cy} r={r} fill={fill} stroke="white" strokeWidth="1.2" />
  }

  // Level-wise (left): expand all nodes at each level
  // Level 0 → 1 → expand both children of both nodes
  const lvlRoot = { x: 80, y: 28 }
  const lvl1 = [{ x: 46, y: 74 }, { x: 114, y: 74 }]
  const lvl2 = [{ x: 28, y: 120 }, { x: 64, y: 120 }, { x: 96, y: 120 }, { x: 132, y: 120 }]

  // Leaf-wise (right): always expand the best leaf
  const lw = { rootX: 230, rootY: 28 }
  const lwNodes = [
    { x: 230, y: 28, loss: "L=1.0", isRoot: true },
    { x: 200, y: 74, loss: "L=0.8", expanded: false },
    { x: 260, y: 74, loss: "L=0.3", expanded: true },  // best, expand
    { x: 240, y: 120, loss: "L=0.2", expanded: false },
    { x: 280, y: 120, loss: "L=0.05", expanded: true }, // best, expand
    { x: 265, y: 165, loss: "" },
    { x: 295, y: 165, loss: "" },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Divider */}
      <line x1={W/2} y1={10} x2={W/2} y2={H-10} stroke="#D1FAE5" strokeWidth="1" strokeDasharray="3,2" />

      {/* LEFT: Level-wise */}
      <text x={80} y={12} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="700">Level-wise (XGBoost)</text>
      {/* edges */}
      {lvl1.map((n,i) => <line key={i} x1={lvlRoot.x} y1={lvlRoot.y+8} x2={n.x} y2={n.y-8} stroke="#9CA3AF" strokeWidth="1.2" />)}
      {lvl2.map((n,i) => <line key={i} x1={lvl1[Math.floor(i/2)].x} y1={lvl1[Math.floor(i/2)].y+8} x2={n.x} y2={n.y-8} stroke="#9CA3AF" strokeWidth="1.2" />)}
      {/* nodes */}
      <TreeNode cx={lvlRoot.x} cy={lvlRoot.y} fill="#374151" />
      {lvl1.map((n,i) => <TreeNode key={i} cx={n.x} cy={n.y} fill="#3B82F6" />)}
      {lvl2.map((n,i) => <TreeNode key={i} cx={n.x} cy={n.y} fill="#93C5FD" r={6} />)}
      {/* depth annotations */}
      <text x={6} y={lvlRoot.y+3} fontSize="6.5" fill="#9CA3AF">d=0</text>
      <text x={6} y={lvl1[0].y+3} fontSize="6.5" fill="#9CA3AF">d=1</text>
      <text x={6} y={lvl2[0].y+3} fontSize="6.5" fill="#9CA3AF">d=2</text>
      <text x={80} y={H-10} textAnchor="middle" fontSize="7" fill="#6B7280">expand all leaves at each depth</text>

      {/* RIGHT: Leaf-wise */}
      <text x={240} y={12} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="700">Leaf-wise (LightGBM)</text>
      {/* edges */}
      <line x1={230} y1={36} x2={200} y2={66} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={230} y1={36} x2={260} y2={66} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={260} y1={82} x2={240} y2={112} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={260} y1={82} x2={280} y2={112} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={280} y1={128} x2={265} y2={157} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={280} y1={128} x2={295} y2={157} stroke="#9CA3AF" strokeWidth="1.2" />
      {/* nodes */}
      <TreeNode cx={230} cy={28} fill="#374151" />
      <TreeNode cx={200} cy={74} fill="#9CA3AF" />       {/* not expanded */}
      <TreeNode cx={260} cy={74} fill="#10B981" />       {/* expanded - best */}
      <TreeNode cx={240} cy={120} fill="#9CA3AF" />
      <TreeNode cx={280} cy={120} fill="#10B981" />      {/* expanded - best */}
      <TreeNode cx={265} cy={165} fill="#6EE7B7" r={6} />
      <TreeNode cx={295} cy={165} fill="#6EE7B7" r={6} />
      {/* labels */}
      <text x={187} y={93} fontSize="6.5" fill="#9CA3AF">wait</text>
      <text x={263} y={93} fontSize="6.5" fill="#10B981" fontWeight="600">best↓</text>
      <text x={268} y={139} fontSize="6.5" fill="#10B981" fontWeight="600">best↓</text>
      <text x={240} y={H-10} textAnchor="middle" fontSize="7" fill="#6B7280">always expand the best leaf</text>
    </svg>
  )
}

// ── CatBoost: ordered target statistics for categoricals ─────────────────────
function CatBoostViz() {
  const W = 320, H = 215
  const pad = { l: 24, r: 14, t: 14, b: 28 }

  // Show ordered encoding: for each row, only use "past" rows to compute cat stat
  const rows = [
    { idx: 1, cat: "A", y: 1, stat: "0.50 (prior)", used: [] },
    { idx: 2, cat: "B", y: 0, stat: "0.50 (prior)", used: [] },
    { idx: 3, cat: "A", y: 1, stat: "1/1=1.00", used: [1] },
    { idx: 4, cat: "A", y: 0, stat: "2/2=1.00", used: [1,3] },
    { idx: 5, cat: "B", y: 1, stat: "0/1=0.00", used: [2] },
    { idx: 6, cat: "A", y: 1, stat: "2/3=0.67", used: [1,3,4] },
  ]

  const rowH = 26
  const tableY = 20
  const cols = { idx: 30, cat: 62, y: 100, stat: 138, bar: 240 }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* title */}
      <text x={W/2} y={12} textAnchor="middle" fontSize="8.5" fill="#064E3B" fontWeight="700">Ordered Target Statistics (random permutation σ)</text>

      {/* header */}
      {[["#", cols.idx], ["Cat", cols.cat], ["y", cols.y], ["cat_stat(xᵢ)", cols.stat]].map(([label,x]) => (
        <text key={String(x)} x={Number(x)} y={tableY+12} fontSize="7.5" fill="#374151" fontWeight="700">{label}</text>
      ))}
      <line x1={pad.l} y1={tableY+16} x2={W-pad.r} y2={tableY+16} stroke="#D1FAE5" strokeWidth="1" />

      {/* rows */}
      {rows.map((r, i) => {
        const ry = tableY + 18 + i * rowH
        const statNum = r.used.length === 0 ? 0.5 : r.used.filter(u => {
          const row = rows.find(rr => rr.idx === u)
          return row?.y === 1
        }).length / r.used.length
        const barW = statNum * 60
        const bg = i % 2 === 0 ? "#F9FAFB" : "white"
        return (
          <g key={i}>
            <rect x={pad.l} y={ry} width={W-pad.l-pad.r} height={rowH-2} fill={bg} rx="2" />
            <text x={cols.idx} y={ry+14} fontSize="7.5" fill="#374151">{r.idx}</text>
            <text x={cols.cat} y={ry+14} fontSize="7.5" fill="#374151" fontWeight="600">{r.cat}</text>
            <text x={cols.y}   y={ry+14} fontSize="7.5" fill={r.y===1?"#10B981":"#EF4444"} fontWeight="600">{r.y}</text>
            <text x={cols.stat} y={ry+14} fontSize="7" fill="#374151">{r.stat}</text>
            {/* stat bar */}
            <rect x={cols.bar} y={ry+4} width={barW} height={rowH-10} rx="2" fill="#10B981" opacity="0.55" />
            {/* "past rows" annotation for row 3 */}
            {i === 2 && (
              <text x={W-pad.r-2} y={ry+14} textAnchor="end" fontSize="6.5" fill="#9CA3AF">↑ uses rows 1</text>
            )}
          </g>
        )
      })}

      <text x={W/2} y={H-6} textAnchor="middle" fontSize="7" fill="#6B7280">Each row uses only "past" rows → no target leakage</text>
    </svg>
  )
}

// ── Bagging: bootstrap samples → models → average ────────────────────────────
function BaggingViz() {
  const W = 320, H = 215

  const trainSet = Array.from({length:12},(_,i) => ({ id: i+1, x: 20+(i%6)*44, y: 30+Math.floor(i/6)*28 }))
  const bootstraps = [
    [1,1,3,5,7,7,9,10,12],
    [2,3,4,6,6,8,9,11,12],
    [1,2,5,5,8,9,10,11,11],
  ]
  const modelY = 130
  const avgY = 185

  const bsCols = ["#3B82F6","#10B981","#F59E0B"]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Training set */}
      <text x={W/2} y={12} textAnchor="middle" fontSize="8" fill="#374151" fontWeight="700">Training Set (n=12)</text>
      {trainSet.map(p => (
        <circle key={p.id} cx={p.x} cy={p.y} r={7} fill="#6B7280" opacity="0.5" />
      ))}
      {trainSet.map(p => (
        <text key={p.id} x={p.x} y={p.y+3} textAnchor="middle" fontSize="6" fill="white" fontWeight="700">{p.id}</text>
      ))}

      {/* Bootstrap sample arrows */}
      {bootstraps.map((_,i) => {
        const bx = 48 + i * 112
        return <line key={i} x1={W/2} y1={62} x2={bx+24} y2={modelY-22}
          stroke={bsCols[i]} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
      })}

      {/* Bootstrap samples + models */}
      {bootstraps.map((bs, i) => {
        const bx = 12 + i * 104
        return (
          <g key={i}>
            <text x={bx+40} y={modelY-10} textAnchor="middle" fontSize="7" fill={bsCols[i]}>
              Bootstrap {i+1}
            </text>
            <rect x={bx} y={modelY} width={80} height={28} rx="6" fill={bsCols[i]} opacity="0.15" stroke={bsCols[i]} strokeWidth="1.2" />
            <text x={bx+40} y={modelY+17} textAnchor="middle" fontSize="8" fill={bsCols[i]} fontWeight="700">Model {i+1}</text>
            {/* arrow to average */}
            <line x1={bx+40} y1={modelY+28} x2={W/2} y2={avgY-10}
              stroke={bsCols[i]} strokeWidth="1.2" />
          </g>
        )
      })}

      {/* Average box */}
      <rect x={W/2-55} y={avgY-10} width={110} height={26} rx="8" fill="#F0FDF9" stroke="#10B981" strokeWidth="1.5" />
      <text x={W/2} y={avgY+6} textAnchor="middle" fontSize="8.5" fill="#064E3B" fontWeight="700">Average / Vote  →  ŷ_bag</text>

      {/* ~63% annotation */}
      <text x={W-4} y={70} textAnchor="end" fontSize="7" fill="#9CA3AF">~63% unique</text>
      <text x={W-4} y={80} textAnchor="end" fontSize="7" fill="#9CA3AF">per bootstrap</text>
    </svg>
  )
}

// ── AdaBoost: sample weights after misclassification ─────────────────────────
function AdaBoostViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // Points: +1 (blue circles) and -1 (orange squares)
  // Round 1: stump splits at x=0.45
  const pts: {x:number;y:number;cls:1|-1;misR1:boolean;misR2:boolean}[] = [
    {x:0.10,y:0.70,cls:1,  misR1:false,misR2:false},
    {x:0.18,y:0.55,cls:1,  misR1:false,misR2:false},
    {x:0.25,y:0.80,cls:1,  misR1:false,misR2:false},
    {x:0.32,y:0.45,cls:1,  misR1:false,misR2:true},  // hard
    {x:0.40,y:0.60,cls:-1, misR1:false,misR2:false},
    {x:0.50,y:0.75,cls:-1, misR1:false,misR2:false},
    {x:0.58,y:0.35,cls:-1, misR1:false,misR2:false},
    {x:0.65,y:0.50,cls:-1, misR1:false,misR2:false},
    {x:0.72,y:0.65,cls:1,  misR1:true, misR2:false}, // misclassified round 1
    {x:0.80,y:0.42,cls:1,  misR1:true, misR2:false}, // misclassified round 1
    {x:0.88,y:0.70,cls:1,  misR1:true, misR2:false}, // misclassified round 1
  ]

  const stump1X = 0.48
  const stump2X = 0.68

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* stump 1 */}
      <line x1={sx(stump1X)} y1={pad.t} x2={sx(stump1X)} y2={H-pad.b}
        stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={sx(stump1X)+2} y={pad.t+10} fontSize="7.5" fill="#9CA3AF">h₁</text>

      {/* stump 2 (focused on right side after weight update) */}
      <line x1={sx(stump2X)} y1={pad.t} x2={sx(stump2X)} y2={H-pad.b}
        stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={sx(stump2X)+2} y={pad.t+10} fontSize="7.5" fill="#F59E0B">h₂</text>

      {/* data points */}
      {pts.map((p,i) => {
        const r = p.misR1 ? 9 : 5.5  // bigger = upweighted
        const ringCol = p.misR1 ? "#EF4444" : "none"
        return (
          <g key={i}>
            {p.misR1 && <circle cx={sx(p.x)} cy={sy(p.y)} r={r+4} fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.6" />}
            {p.cls === 1
              ? <circle cx={sx(p.x)} cy={sy(p.y)} r={r} fill="#3B82F6" opacity="0.9" />
              : <rect x={sx(p.x)-r} y={sy(p.y)-r} width={r*2} height={r*2} rx="2" fill="#F97316" opacity="0.9" />
            }
          </g>
        )
      })}

      {/* annotation */}
      <text x={sx(0.80)} y={sy(0.42)-14} fontSize="7" fill="#EF4444" textAnchor="middle">upweighted</text>
      <text x={sx(0.80)} y={sy(0.42)-6} fontSize="7" fill="#EF4444" textAnchor="middle">after round 1</text>

      {/* legend */}
      <circle cx={pad.l+6} cy={H-pad.b+15} r={5} fill="#3B82F6" />
      <text x={pad.l+14} y={H-pad.b+19} fontSize="7" fill="#6B7280">class +1</text>
      <rect x={pad.l+58} y={H-pad.b+10} width={10} height={10} rx="2" fill="#F97316" />
      <text x={pad.l+71} y={H-pad.b+19} fontSize="7" fill="#6B7280">class −1</text>
      <circle cx={pad.l+120} cy={H-pad.b+15} r={8} fill="none" stroke="#EF4444" strokeWidth="1.5" />
      <text x={pad.l+131} y={H-pad.b+19} fontSize="7" fill="#6B7280">high wᵢ (misclassified)</text>
    </svg>
  )
}

// ── Stacking: OOF predictions → meta-learner ─────────────────────────────────
function StackingViz() {
  const W = 320, H = 215

  const baseModels = [
    { label: "RF",   x: 40,  col: "#3B82F6" },
    { label: "GBM",  x: 120, col: "#10B981" },
    { label: "LR",   x: 200, col: "#F59E0B" },
    { label: "SVM",  x: 280, col: "#8B5CF6" },
  ]
  const trainY = 20, oofY = 90, metaY = 150, predY = 198

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Training data */}
      <rect x={80} y={trainY} width={160} height={26} rx="6" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.2" />
      <text x={160} y={trainY+17} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="700">Training Data (K-fold CV)</text>

      {/* Arrows down to base models */}
      {baseModels.map(m => (
        <line key={m.label} x1={160} y1={trainY+26} x2={m.x} y2={oofY-10}
          stroke="#D1D5DB" strokeWidth="1" />
      ))}

      {/* Base models */}
      {baseModels.map(m => (
        <g key={m.label}>
          <rect x={m.x-22} y={oofY-10} width={44} height={24} rx="6" fill={m.col} opacity="0.15" stroke={m.col} strokeWidth="1.5" />
          <text x={m.x} y={oofY+7} textAnchor="middle" fontSize="8.5" fill={m.col} fontWeight="700">{m.label}</text>
        </g>
      ))}

      {/* OOF predictions column */}
      <text x={160} y={oofY+28} textAnchor="middle" fontSize="7.5" fill="#374151">OOF predictions ẑᵢⱼ (never in-sample)</text>
      <rect x={52} y={oofY+32} width={216} height={22} rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
      {baseModels.map((m,i) => (
        <text key={i} x={52 + i*54 + 27} y={oofY+47} textAnchor="middle" fontSize="7.5" fill="#92400E" fontWeight="600">{`ẑ·${m.label}`}</text>
      ))}

      {/* Arrow to meta-learner */}
      <line x1={160} y1={oofY+54} x2={160} y2={metaY-8} stroke="#D1D5DB" strokeWidth="1.2" />

      {/* Meta-learner */}
      <rect x={90} y={metaY-8} width={140} height={28} rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      <text x={160} y={metaY+9} textAnchor="middle" fontSize="8.5" fill="#064E3B" fontWeight="700">Meta-Learner (e.g. LR)</text>

      {/* Arrow to final prediction */}
      <line x1={160} y1={metaY+20} x2={160} y2={predY-6} stroke="#10B981" strokeWidth="1.5" />
      <text x={160} y={predY+2} textAnchor="middle" fontSize="9" fill="#064E3B" fontWeight="700">ŷ (final prediction)</text>
    </svg>
  )
}

// ── PCA: variance ellipse + principal component arrows ───────────────────────
function PCAViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // Data cloud: elongated along PC1 direction (~45°)
  const mu = [0.50, 0.50]
  const pts: [number,number][] = [
    [0.20,0.22],[0.28,0.30],[0.32,0.35],[0.38,0.40],[0.42,0.44],
    [0.48,0.50],[0.52,0.54],[0.58,0.58],[0.64,0.64],[0.70,0.70],
    [0.26,0.38],[0.36,0.28],[0.62,0.72],[0.72,0.62],
    [0.44,0.56],[0.54,0.44],[0.46,0.62],[0.56,0.38],
  ]

  // PC1 direction (high variance): along y=x direction (45°)
  // PC2 direction (low variance): perpendicular
  const pc1 = { dx: 0.28, dy: 0.28 }
  const pc2 = { dx: 0.10, dy: -0.10 }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Data ellipse */}
      <ellipse cx={sx(0.50)} cy={sy(0.50)} rx={100} ry={28}
        transform={`rotate(-45,${sx(0.50)},${sy(0.50)})`}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4,2" opacity="0.5" />

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W/2} y={H-4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x₁</text>
      <text x={11} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H/2})`}>Feature x₂</text>

      {/* data points */}
      {pts.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={3.5} fill="#1E40AF" opacity="0.7" />)}

      {/* PC1 arrow (long - high variance) */}
      <line x1={sx(mu[0]-pc1.dx)} y1={sy(mu[1]-pc1.dy)}
        x2={sx(mu[0]+pc1.dx)} y2={sy(mu[1]+pc1.dy)}
        stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
      <text x={sx(mu[0]+pc1.dx)+6} y={sy(mu[1]+pc1.dy)} fontSize="9" fill="#EF4444" fontWeight="700">PC1</text>
      <text x={sx(mu[0]+pc1.dx)+6} y={sy(mu[1]+pc1.dy)+10} fontSize="7" fill="#EF4444">high var</text>

      {/* PC2 arrow (short - low variance) */}
      <line x1={sx(mu[0]-pc2.dx)} y1={sy(mu[1]-pc2.dy)}
        x2={sx(mu[0]+pc2.dx)} y2={sy(mu[1]+pc2.dy)}
        stroke="#10B981" strokeWidth="2.5" />
      <text x={sx(mu[0]+pc2.dx)+6} y={sy(mu[1]+pc2.dy)+4} fontSize="9" fill="#10B981" fontWeight="700">PC2</text>
      <text x={sx(mu[0]+pc2.dx)+6} y={sy(mu[1]+pc2.dy)+14} fontSize="7" fill="#10B981">low var</text>

      {/* mean point */}
      <circle cx={sx(mu[0])} cy={sy(mu[1])} r={5} fill="#F59E0B" stroke="white" strokeWidth="1.5" />
      <text x={sx(mu[0])+8} y={sy(mu[1])+3} fontSize="7.5" fill="#F59E0B" fontWeight="600">μ̄</text>

      {/* variance annotation */}
      <text x={sx(0.50)} y={pad.t+8} textAnchor="middle" fontSize="7.5" fill="#374151">PC1 explains most variance → keep</text>
      <text x={sx(0.50)} y={pad.t+18} textAnchor="middle" fontSize="7.5" fill="#374151">PC2 explains little → may discard</text>
    </svg>
  )
}

// ── t-SNE: high-d Gaussian → 2D Student-t, KL divergence ────────────────────
function TSNEViz() {
  const W = 320, H = 215
  const halfW = W / 2 - 10

  // Left: high-d similarities (Gaussian) — concentric circles
  const hd = { cx: 70, cy: 108 }
  // Right: low-d layout (Student-t) — separated clusters
  const ld = { cx: 240, cy: 108 }

  const clusters2D = [
    { cx: 220, cy: 75,  pts: [[208,65],[218,58],[230,68],[225,80],[212,78]], col: "#3B82F6" },
    { cx: 265, cy: 130, pts: [[255,120],[270,115],[278,128],[268,140],[255,135]], col: "#10B981" },
    { cx: 230, cy: 155, pts: [[220,148],[235,143],[244,155],[236,165],[222,160]], col: "#F59E0B" },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* divider */}
      <line x1={W/2} y1={10} x2={W/2} y2={H-10} stroke="#D1FAE5" strokeWidth="1" strokeDasharray="3,2" />

      {/* LEFT: high-dimensional similarities */}
      <text x={hd.cx} y={18} textAnchor="middle" fontSize="8" fill="#374151" fontWeight="700">High-d (Gaussian pᵢⱼ)</text>
      {[0.6,0.45,0.30,0.16].map((r,i) => (
        <ellipse key={i} cx={hd.cx} cy={hd.cy} rx={r*70} ry={r*62}
          fill="none" stroke="#3B82F6" strokeWidth="0.7" opacity={0.25 + i*0.15} />
      ))}
      {/* points in high-d (all crowded together) */}
      {[[60,88],[68,95],[72,105],[80,115],[65,120],[75,92],[58,112],[82,100],[70,130],[55,102]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={["#3B82F6","#10B981","#F59E0B"][i%3]} opacity="0.7" />
      ))}
      <text x={hd.cx} y={H-12} textAnchor="middle" fontSize="7" fill="#6B7280">crowded in 2D → pᵢⱼ high for many pairs</text>

      {/* arrow */}
      <line x1={halfW+8} y1={H/2} x2={W/2-4} y2={H/2} stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x={halfW+W/2/2+8} y={H/2-5} textAnchor="middle" fontSize="7.5" fill="#9CA3AF">t-SNE</text>
      <text x={halfW+W/2/2+8} y={H/2+12} textAnchor="middle" fontSize="7" fill="#9CA3AF">(Student-t qᵢⱼ)</text>

      {/* RIGHT: 2D embedding with separated clusters */}
      <text x={ld.cx} y={18} textAnchor="middle" fontSize="8" fill="#374151" fontWeight="700">2D Embedding (t-SNE)</text>
      {clusters2D.map((cl,ci) => (
        <g key={ci}>
          <ellipse cx={cl.cx} cy={cl.cy} rx={22} ry={18} fill={cl.col} opacity="0.15" />
          {cl.pts.map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={4} fill={cl.col} opacity="0.9" />
          ))}
        </g>
      ))}
      <text x={ld.cx} y={H-12} textAnchor="middle" fontSize="7" fill="#6B7280">Student-t heavy tails → well-separated clusters</text>
    </svg>
  )
}

// ── LDA (dimensionality): Fisher projection ───────────────────────────────────
function LDADimViz() {
  const W = 320, H = 215
  const pad = { l: 20, r: 14, t: 18, b: 38 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const cls = [
    { pts: [[0.15,0.72],[0.20,0.80],[0.25,0.68],[0.30,0.76],[0.18,0.85]], col:"#EF4444", mu:[0.216,0.762] },
    { pts: [[0.55,0.45],[0.60,0.52],[0.65,0.40],[0.70,0.48],[0.58,0.36]], col:"#3B82F6", mu:[0.616,0.442] },
    { pts: [[0.80,0.75],[0.85,0.68],[0.90,0.80],[0.88,0.60],[0.78,0.72]], col:"#10B981", mu:[0.842,0.710] },
  ]

  // Fisher axis direction: along between-class variance
  // Approximate: direction from class 1 mean to class 3 mean
  const ax = 0.842 - 0.216, ay = 0.710 - 0.762
  const alen = Math.sqrt(ax*ax+ay*ay)
  const aun = [ax/alen, ay/alen]

  // Projection axis (shown at bottom)
  const projY = 0.05
  const projStart = [0.08, projY], projEnd = [0.96, projY]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* Fisher discriminant axis */}
      <line x1={sx(0.05)} y1={sy(0.55)} x2={sx(0.95)} y2={sy(0.90)}
        stroke="#F59E0B" strokeWidth="2" />
      <text x={sx(0.96)} y={sy(0.91)+10} fontSize="8" fill="#F59E0B" fontWeight="700">LDA axis w</text>

      {/* class ellipses */}
      {cls.map((cl,i) => (
        <ellipse key={i} cx={sx(cl.mu[0])} cy={sy(cl.mu[1])} rx={36} ry={22}
          transform={`rotate(10,${sx(cl.mu[0])},${sy(cl.mu[1])})`}
          fill={cl.col} stroke={cl.col} strokeWidth="1.2" opacity="0.18" />
      ))}

      {/* data points */}
      {cls.map((cl,ci) => cl.pts.map(([x,y],i) => (
        <circle key={`${ci}-${i}`} cx={sx(x)} cy={sy(y)} r={4.5} fill={cl.col} opacity="0.9" />
      )))}

      {/* class means */}
      {cls.map((cl,i) => (
        <circle key={i} cx={sx(cl.mu[0])} cy={sy(cl.mu[1])} r={6} fill={cl.col} stroke="white" strokeWidth="1.5" />
      ))}

      {/* projection axis at bottom */}
      <line x1={sx(projStart[0])} y1={sy(projY)} x2={sx(projEnd[0])} y2={sy(projY)} stroke="#9CA3AF" strokeWidth="1.5" />
      <text x={sx(projEnd[0])+2} y={sy(projY)+4} fontSize="7.5" fill="#9CA3AF">w projection</text>
      {/* projected means on 1D axis */}
      {cls.map((cl,i) => {
        const proj = cl.mu[0] * aun[0] + cl.mu[1] * aun[1]
        const projX = 0.1 + (proj - 0.4) * 1.2
        return <line key={i} x1={sx(projX)} y1={sy(projY)-5} x2={sx(projX)} y2={sy(projY)+5} stroke={cl.col} strokeWidth="2.5" />
      })}

      {/* annotation */}
      <text x={sx(0.50)} y={pad.t+8} textAnchor="middle" fontSize="7.5" fill="#374151" fontWeight="600">J(w) = |wᵀSᴮw| / |wᵀSᵂw|   max →</text>
      <text x={sx(0.50)} y={pad.t+18} textAnchor="middle" fontSize="7" fill="#374151">classes separated on 1D projection</text>
    </svg>
  )
}

// ── Autoencoder: encoder–bottleneck–decoder architecture ─────────────────────
function AutoencoderViz() {
  const W = 320, H = 215

  // Layer widths (number of units visualised)
  const layers = [
    { units: 5, x: 28,  label: "Input\n(p=5)", col: "#6B7280" },
    { units: 4, x: 90,  label: "Encoder", col: "#3B82F6" },
    { units: 2, x: 160, label: "Latent z\n(d=2)", col: "#10B981" },
    { units: 4, x: 230, label: "Decoder", col: "#8B5CF6" },
    { units: 5, x: 292, label: "Output\nx̂", col: "#6B7280" },
  ]
  const unitH = 16, gap = 6
  const totalH = (units: number) => units * unitH + (units-1) * gap
  const cy = H / 2

  function LayerUnits({ x, units, col }: { x: number; units: number; col: string }) {
    const th = totalH(units)
    const startY = cy - th / 2
    return (
      <>
        {Array.from({length: units}, (_, i) => (
          <rect key={i} x={x-10} y={startY + i*(unitH+gap)} width={20} height={unitH} rx="3"
            fill={col} opacity="0.8" />
        ))}
      </>
    )
  }

  function Connections({ l1, l2 }: { l1: typeof layers[0]; l2: typeof layers[0] }) {
    const th1 = totalH(l1.units), th2 = totalH(l2.units)
    const sy1 = cy - th1/2, sy2 = cy - th2/2
    const result = []
    for (let a = 0; a < l1.units; a++) {
      for (let b = 0; b < l2.units; b++) {
        result.push(
          <line key={`${a}-${b}`}
            x1={l1.x + 10} y1={sy1 + a*(unitH+gap) + unitH/2}
            x2={l2.x - 10} y2={sy2 + b*(unitH+gap) + unitH/2}
            stroke="#D1D5DB" strokeWidth="0.5" opacity="0.5" />
        )
      }
    }
    return <>{result}</>
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* connections */}
      {layers.slice(0,-1).map((l,i) => <Connections key={i} l1={l} l2={layers[i+1]} />)}

      {/* layer units */}
      {layers.map((l,i) => <LayerUnits key={i} x={l.x} units={l.units} col={l.col} />)}

      {/* layer labels */}
      {layers.map((l,i) => (
        <text key={i} x={l.x} y={cy + totalH(l.units)/2 + 16} textAnchor="middle" fontSize="7.5" fill={l.col} fontWeight="600">
          {l.label.split("\n")[0]}
        </text>
      ))}
      {layers.map((l,i) => (
        <text key={i} x={l.x} y={cy + totalH(l.units)/2 + 26} textAnchor="middle" fontSize="7" fill={l.col}>
          {l.label.split("\n")[1] ?? ""}
        </text>
      ))}

      {/* arrows */}
      <line x1={50} y1={cy} x2={76} y2={cy} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={140} y1={cy} x2={146} y2={cy} stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1={174} y1={cy} x2={216} y2={cy} stroke="#9CA3AF" strokeWidth="1.2" />

      {/* bottleneck annotation */}
      <text x={160} y={cy - totalH(2)/2 - 14} textAnchor="middle" fontSize="8" fill="#10B981" fontWeight="700">Bottleneck</text>
      <text x={160} y={cy - totalH(2)/2 - 4} textAnchor="middle" fontSize="7" fill="#10B981">d &lt;&lt; p</text>

      {/* loss annotation */}
      <text x={W/2} y={H-8} textAnchor="middle" fontSize="7.5" fill="#374151">Loss: ‖x − x̂‖²   →   minimise reconstruction error</text>

      {/* encoder/decoder brackets */}
      <line x1={20} y1={18} x2={155} y2={18} stroke="#3B82F6" strokeWidth="1" />
      <text x={87} y={14} textAnchor="middle" fontSize="7.5" fill="#3B82F6" fontWeight="600">Encoder fθ</text>
      <line x1={165} y1={18} x2={305} y2={18} stroke="#8B5CF6" strokeWidth="1" />
      <text x={235} y={14} textAnchor="middle" fontSize="7.5" fill="#8B5CF6" fontWeight="600">Decoder gφ</text>
    </svg>
  )
}

// ── K-Means: centroids + cluster regions + data points ───────────────────────
// ─── Statistics Visualizations ───────────────────────────────────────────────

function MeanViz() {
  const W = 320, H = 180
  const data = [3, 7, 5, 12, 4, 9, 6, 10, 2, 8]
  const mean = data.reduce((a, b) => a + b, 0) / data.length  // = 6.6
  const pad = { l: 40, r: 20, t: 30, b: 40 }
  const xScale = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r)
  const maxVal = 14
  const yScale = (v: number) => H - pad.b - (v / maxVal) * (H - pad.t - pad.b)
  const meanX1 = pad.l, meanX2 = W - pad.r
  const meanY = yScale(mean)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Arithmetic Mean — Balancing Point</text>
      {/* Y axis */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1D5DB" strokeWidth="1" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1D5DB" strokeWidth="1" />
      {/* Deviation lines */}
      {data.map((v, i) => (
        <line key={i} x1={xScale(i)} y1={yScale(v)} x2={xScale(i)} y2={meanY}
          stroke={v >= mean ? "#BFDBFE" : "#FCA5A5"} strokeWidth="2" strokeDasharray="3 2" />
      ))}
      {/* Mean line */}
      <line x1={meanX1} y1={meanY} x2={meanX2} y2={meanY} stroke="#2563EB" strokeWidth="2" />
      <text x={meanX2 + 3} y={meanY + 4} fontSize="9" fill="#2563EB" fontWeight="700">x̄={mean}</text>
      {/* Data points */}
      {data.map((v, i) => (
        <circle key={i} cx={xScale(i)} cy={yScale(v)} r={4}
          fill={v >= mean ? "#3B82F6" : "#EF4444"} stroke="white" strokeWidth="1.2" />
      ))}
      <text x={pad.l - 4} y={yScale(mean) + 4} textAnchor="end" fontSize="8" fill="#2563EB">{mean}</text>
      <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="8.5" fill="#6B7280">Blue above mean  ·  Red below mean  ·  Σ deviations = 0</text>
    </svg>
  )
}

function MedianViz() {
  const W = 320, H = 180
  const data = [2, 4, 6, 8, 10, 100]
  const sorted = [...data].sort((a, b) => a - b)
  const median = (sorted[2] + sorted[3]) / 2  // = 7
  const mean = data.reduce((a, b) => a + b, 0) / data.length  // = 21.67
  const pad = { l: 30, r: 30, t: 30, b: 50 }
  const n = sorted.length
  const xScale = (i: number) => pad.l + (i / (n - 1)) * (W - pad.l - pad.r)
  const barH = 24, barY = 80
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Median vs Mean — Outlier Sensitivity</text>
      {/* Sorted values */}
      {sorted.map((v, i) => (
        <g key={i}>
          <rect x={xScale(i) - 18} y={barY} width={36} height={barH} rx="4"
            fill={i === 2 || i === 3 ? "#D1FAE5" : "#F3F4F6"} stroke={i === 2 || i === 3 ? "#10B981" : "#E5E7EB"} strokeWidth="1.2" />
          <text x={xScale(i)} y={barY + 16} textAnchor="middle" fontSize="10" fill="#374151" fontWeight={i === 2 || i === 3 ? "700" : "400"}>{v}</text>
          <text x={xScale(i)} y={barY + 34} textAnchor="middle" fontSize="7.5" fill="#9CA3AF">x₍{i + 1}₎</text>
        </g>
      ))}
      {/* Median annotation */}
      <line x1={(xScale(2) + xScale(3)) / 2} y1={barY - 4} x2={(xScale(2) + xScale(3)) / 2} y2={barY + barH + 4}
        stroke="#10B981" strokeWidth="2" />
      <text x={(xScale(2) + xScale(3)) / 2} y={barY - 8} textAnchor="middle" fontSize="9" fill="#10B981" fontWeight="700">Median = {median}</text>
      {/* Mean annotation — pulled right by outlier */}
      <text x={W / 2} y={H - 22} textAnchor="middle" fontSize="8.5" fill="#EF4444" fontWeight="600">Mean = {mean.toFixed(1)} ← pulled by outlier (100)</text>
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8" fill="#6B7280">Median is robust — rank only, not magnitude</text>
    </svg>
  )
}

function ModeViz() {
  const W = 320, H = 190
  const counts: Record<string, number> = { A: 2, B: 6, C: 4, D: 1, E: 3 }
  const categories = Object.keys(counts)
  const maxCount = Math.max(...Object.values(counts))
  const pad = { l: 36, r: 16, t: 30, b: 44 }
  const barWidth = (W - pad.l - pad.r) / categories.length - 8
  const xBase = (i: number) => pad.l + i * ((W - pad.l - pad.r) / categories.length) + 4
  const yScale = (v: number) => H - pad.b - (v / (maxCount + 1)) * (H - pad.t - pad.b)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Mode — Most Frequent Value (Category B)</text>
      {[0, 2, 4, 6].map(v => (
        <g key={v}>
          <line x1={pad.l} y1={yScale(v)} x2={W - pad.r} y2={yScale(v)} stroke="#F3F4F6" strokeWidth="1" />
          <text x={pad.l - 4} y={yScale(v) + 4} textAnchor="end" fontSize="8" fill="#9CA3AF">{v}</text>
        </g>
      ))}
      {categories.map((cat, i) => {
        const isMode = counts[cat] === maxCount
        return (
          <g key={cat}>
            <rect x={xBase(i)} y={yScale(counts[cat])} width={barWidth} height={H - pad.b - yScale(counts[cat])} rx="3"
              fill={isMode ? "#FBBF24" : "#BFDBFE"} stroke={isMode ? "#D97706" : "#93C5FD"} strokeWidth="1.5" />
            {isMode && <text x={xBase(i) + barWidth / 2} y={yScale(counts[cat]) - 6} textAnchor="middle" fontSize="9" fill="#D97706" fontWeight="700">MODE</text>}
            <text x={xBase(i) + barWidth / 2} y={yScale(counts[cat]) - (isMode ? 18 : 6)} textAnchor="middle" fontSize="9" fill="#374151">{counts[cat]}</text>
            <text x={xBase(i) + barWidth / 2} y={H - pad.b + 14} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">{cat}</text>
          </g>
        )
      })}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8" fill="#6B7280">Only valid measure of centre for nominal (categorical) data</text>
    </svg>
  )
}

function VarianceViz() {
  const W = 320, H = 190
  const data = [2, 5, 4, 8, 3, 7, 6]
  const mean = data.reduce((a, b) => a + b, 0) / data.length
  const pad = { l: 40, r: 20, t: 30, b: 44 }
  const maxVal = 10
  const xScale = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r)
  const yScale = (v: number) => H - pad.b - (v / maxVal) * (H - pad.t - pad.b)
  const meanY = yScale(mean)
  const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / (data.length - 1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Variance — Mean Squared Deviation</text>
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1D5DB" strokeWidth="1" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1D5DB" strokeWidth="1" />
      {/* Mean line */}
      <line x1={pad.l} y1={meanY} x2={W - pad.r} y2={meanY} stroke="#2563EB" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={W - pad.r + 2} y={meanY + 4} fontSize="8" fill="#2563EB">x̄={mean.toFixed(1)}</text>
      {/* Deviation squares */}
      {data.map((v, i) => {
        const cx = xScale(i), cy = yScale(v)
        const dev = Math.abs(v - mean)
        const sqSize = dev * (H - pad.t - pad.b) / maxVal
        const sqTop = v >= mean ? cy : meanY
        return (
          <g key={i}>
            <rect x={cx - sqSize / 2} y={sqTop} width={sqSize} height={sqSize}
              fill={v >= mean ? "rgba(59,130,246,0.12)" : "rgba(239,68,68,0.12)"}
              stroke={v >= mean ? "#93C5FD" : "#FCA5A5"} strokeWidth="1" />
            <line x1={cx} y1={cy} x2={cx} y2={meanY}
              stroke={v >= mean ? "#3B82F6" : "#EF4444"} strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r={4} fill={v >= mean ? "#3B82F6" : "#EF4444"} stroke="white" strokeWidth="1.2" />
          </g>
        )
      })}
      <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">s² = Σ(xᵢ−x̄)²/(n−1) = {variance.toFixed(2)}</text>
    </svg>
  )
}

function StandardDeviationViz() {
  const W = 320, H = 190
  const pad = { l: 16, r: 16, t: 30, b: 44 }
  const cx = W / 2, cy = H / 2 + 8
  const mu = 50, sigma = 15
  const xMin = 0, xMax = 100
  const xScale = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * (W - pad.l - pad.r)
  const points: string[] = []
  for (let x = xMin; x <= xMax; x += 1) {
    const z = (x - mu) / sigma
    const y = cy - 80 * Math.exp(-0.5 * z * z)
    points.push(`${xScale(x)},${y}`)
  }
  const bands = [
    { mult: 1, color: "#BFDBFE", label: "68%" },
    { mult: 2, color: "#DBEAFE", label: "95%" },
    { mult: 3, color: "#EFF6FF", label: "99.7%" },
  ]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Empirical Rule — 68·95·99.7</text>
      {/* Shaded bands */}
      {[...bands].reverse().map(({ mult, color }) => {
        const x1 = xScale(mu - mult * sigma), x2 = xScale(mu + mult * sigma)
        return <rect key={mult} x={x1} y={cy - 84} width={x2 - x1} height={86} fill={color} />
      })}
      {/* Bell curve */}
      <polyline points={points.join(" ")} fill="none" stroke="#2563EB" strokeWidth="2" />
      {/* Mean line */}
      <line x1={xScale(mu)} y1={cy - 85} x2={xScale(mu)} y2={cy} stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={xScale(mu)} y={cy + 12} textAnchor="middle" fontSize="8.5" fill="#1D4ED8">μ</text>
      {/* σ labels */}
      {[-3, -2, -1, 1, 2, 3].map(k => (
        <text key={k} x={xScale(mu + k * sigma)} y={cy + 12} textAnchor="middle" fontSize="7.5" fill="#6B7280">{k}σ</text>
      ))}
      {/* Band labels */}
      {bands.map(({ mult, label }) => (
        <text key={mult} x={xScale(mu + (mult - 0.5) * sigma)} y={cy - 66} textAnchor="middle" fontSize="7.5" fill="#1D4ED8" fontWeight="600">{label}</text>
      ))}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8.5" fill="#374151">z = (x−μ)/σ  ·  SE = σ/√n</text>
    </svg>
  )
}

function SkewnessViz() {
  const W = 320, H = 200
  const pad = { l: 16, r: 16, t: 30, b: 36 }
  const panelW = (W - pad.l - pad.r - 16) / 3
  const shapes = [
    { label: "Left-Skewed", gamma: -1.2, color: "#FCA5A5", stroke: "#EF4444", sub: "γ₁ < 0", note: "mean<med<mode" },
    { label: "Symmetric", gamma: 0, color: "#BFDBFE", stroke: "#3B82F6", sub: "γ₁ = 0", note: "mean=med=mode" },
    { label: "Right-Skewed", gamma: 1.2, color: "#BBF7D0", stroke: "#10B981", sub: "γ₁ > 0", note: "mean>med>mode" },
  ]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Skewness — Tail Direction (3rd Moment)</text>
      {shapes.map(({ label, gamma, color, stroke, sub, note }, idx) => {
        const ox = pad.l + idx * (panelW + 8)
        const baseY = H - pad.b
        const peakX = gamma < 0 ? 0.65 : gamma > 0 ? 0.35 : 0.5
        const pts: string[] = []
        for (let t = 0; t <= 1; t += 0.02) {
          const x = ox + t * panelW
          let y: number
          if (gamma === 0) {
            const z = (t - 0.5) / 0.15
            y = baseY - 70 * Math.exp(-0.5 * z * z)
          } else if (gamma > 0) {
            y = baseY - 70 * Math.exp(-3 * (t - 0.2) * (t - 0.2) / ((t + 0.1) * 1.5))
          } else {
            y = baseY - 70 * Math.exp(-3 * (t - 0.8) * (t - 0.8) / ((1.1 - t) * 1.5))
          }
          pts.push(`${x},${y}`)
        }
        pts.unshift(`${ox},${baseY}`)
        pts.push(`${ox + panelW},${baseY}`)
        return (
          <g key={idx}>
            <polygon points={pts.join(" ")} fill={color} fillOpacity="0.5" stroke={stroke} strokeWidth="1.5" />
            <text x={ox + panelW / 2} y={pad.t + 14} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="700">{label}</text>
            <text x={ox + panelW / 2} y={pad.t + 26} textAnchor="middle" fontSize="8" fill={stroke}>{sub}</text>
            <text x={ox + panelW / 2} y={H - pad.b + 14} textAnchor="middle" fontSize="7.5" fill="#6B7280">{note}</text>
          </g>
        )
      })}
    </svg>
  )
}

function KurtosisViz() {
  const W = 320, H = 200
  const pad = { l: 20, r: 20, t: 30, b: 36 }
  const midY = H - pad.b
  const shapes = [
    { label: "Platykurtic", kurt: -1, color: "#FDE68A", stroke: "#D97706", tailW: 0.28, peakH: 52, sub: "γ₂ < 0", note: "thin tails" },
    { label: "Mesokurtic", kurt: 0, color: "#BFDBFE", stroke: "#3B82F6", tailW: 0.2, peakH: 72, sub: "γ₂ = 0 (Normal)", note: "normal tails" },
    { label: "Leptokurtic", kurt: 1, color: "#D1FAE5", stroke: "#10B981", tailW: 0.14, peakH: 90, sub: "γ₂ > 0", note: "fat tails" },
  ]
  const panelW = (W - pad.l - pad.r - 16) / 3
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Kurtosis — Tail Heaviness (4th Moment)</text>
      {shapes.map(({ label, color, stroke, tailW, peakH, sub, note }, idx) => {
        const ox = pad.l + idx * (panelW + 8)
        const pts: string[] = []
        for (let t = 0; t <= 1; t += 0.02) {
          const z = (t - 0.5) / tailW
          const x = ox + t * panelW
          const y = midY - peakH * Math.exp(-0.5 * z * z)
          pts.push(`${x},${y}`)
        }
        pts.unshift(`${ox},${midY}`)
        pts.push(`${ox + panelW},${midY}`)
        return (
          <g key={idx}>
            <polygon points={pts.join(" ")} fill={color} fillOpacity="0.55" stroke={stroke} strokeWidth="1.5" />
            <text x={ox + panelW / 2} y={pad.t + 14} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="700">{label}</text>
            <text x={ox + panelW / 2} y={pad.t + 26} textAnchor="middle" fontSize="7.5" fill={stroke}>{sub}</text>
            <text x={ox + panelW / 2} y={H - pad.b + 14} textAnchor="middle" fontSize="7.5" fill="#6B7280">{note}</text>
          </g>
        )
      })}
    </svg>
  )
}

function PercentilesQuartilesViz() {
  const W = 320, H = 180
  const pad = { l: 36, r: 24, t: 30, b: 48 }
  const bxY = 80, bxH = 34
  const Q1 = 30, Q2 = 50, Q3 = 70, wMin = 10, wMax = 100
  const xScale = (v: number) => pad.l + ((v - 0) / 110) * (W - pad.l - pad.r)
  const IQR = Q3 - Q1
  const fence1 = Q1 - 1.5 * IQR, fence2 = Q3 + 1.5 * IQR
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Box Plot — Five-Number Summary + IQR</text>
      {/* Whiskers */}
      <line x1={xScale(wMin)} y1={bxY + bxH / 2} x2={xScale(Q1)} y2={bxY + bxH / 2} stroke="#6B7280" strokeWidth="1.5" />
      <line x1={xScale(Q3)} y1={bxY + bxH / 2} x2={xScale(wMax)} y2={bxY + bxH / 2} stroke="#6B7280" strokeWidth="1.5" />
      <line x1={xScale(wMin)} y1={bxY + 6} x2={xScale(wMin)} y2={bxY + bxH - 6} stroke="#6B7280" strokeWidth="1.5" />
      <line x1={xScale(wMax)} y1={bxY + 6} x2={xScale(wMax)} y2={bxY + bxH - 6} stroke="#6B7280" strokeWidth="1.5" />
      {/* IQR box */}
      <rect x={xScale(Q1)} y={bxY} width={xScale(Q3) - xScale(Q1)} height={bxH} fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" />
      {/* Median line */}
      <line x1={xScale(Q2)} y1={bxY} x2={xScale(Q2)} y2={bxY + bxH} stroke="#1D4ED8" strokeWidth="2.5" />
      {/* Tukey fence */}
      <line x1={xScale(fence1)} y1={bxY - 10} x2={xScale(fence1)} y2={bxY + bxH + 10} stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
      <line x1={xScale(fence2)} y1={bxY - 10} x2={xScale(fence2)} y2={bxY + bxH + 10} stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
      {/* Outlier */}
      <circle cx={xScale(105)} cy={bxY + bxH / 2} r={4} fill="#EF4444" stroke="white" strokeWidth="1.2" />
      <text x={xScale(105)} y={bxY - 4} textAnchor="middle" fontSize="7.5" fill="#EF4444">outlier</text>
      {/* Labels */}
      {[{ v: wMin, l: "min" }, { v: Q1, l: "Q1=25p" }, { v: Q2, l: "Q2=50p" }, { v: Q3, l: "Q3=75p" }, { v: wMax, l: "max" }].map(({ v, l }) => (
        <text key={l} x={xScale(v)} y={bxY + bxH + 14} textAnchor="middle" fontSize="7.5" fill="#374151">{l}</text>
      ))}
      <text x={xScale((Q1 + Q3) / 2)} y={bxY - 6} textAnchor="middle" fontSize="8" fill="#3B82F6" fontWeight="600">IQR = Q3−Q1 = {IQR}</text>
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8" fill="#EF4444">Red dashes: Tukey fence Q1−1.5×IQR, Q3+1.5×IQR</text>
    </svg>
  )
}

function ZTestViz() {
  const W = 320, H = 190
  const pad = { l: 24, r: 24, t: 30, b: 44 }
  const cx = W / 2, baseY = H - pad.b
  const xScale = (z: number) => cx + z * 44
  const yNorm = (z: number) => baseY - 90 * Math.exp(-0.5 * z * z)
  const zCrit = 1.96
  const pts: string[] = []
  for (let z = -3.2; z <= 3.2; z += 0.05) pts.push(`${xScale(z)},${yNorm(z)}`)
  const leftTail: string[] = []
  for (let z = -3.2; z <= -zCrit; z += 0.05) leftTail.push(`${xScale(z)},${yNorm(z)}`)
  const rightTail: string[] = []
  for (let z = zCrit; z <= 3.2; z += 0.05) rightTail.push(`${xScale(z)},${yNorm(z)}`)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Z-Test — Two-Sided Rejection Regions (α=0.05)</text>
      {/* Rejection regions */}
      <polygon points={[`${xScale(-3.2)},${baseY}`, ...leftTail, `${xScale(-zCrit)},${baseY}`].join(" ")} fill="#FCA5A5" fillOpacity="0.7" />
      <polygon points={[`${xScale(zCrit)},${baseY}`, ...rightTail, `${xScale(3.2)},${baseY}`].join(" ")} fill="#FCA5A5" fillOpacity="0.7" />
      {/* Normal curve */}
      <polyline points={pts.join(" ")} fill="none" stroke="#2563EB" strokeWidth="2" />
      <line x1={xScale(-3.2)} y1={baseY} x2={xScale(3.2)} y2={baseY} stroke="#D1D5DB" strokeWidth="1" />
      {/* Critical value lines */}
      <line x1={xScale(-zCrit)} y1={baseY} x2={xScale(-zCrit)} y2={yNorm(-zCrit)} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1={xScale(zCrit)} y1={baseY} x2={xScale(zCrit)} y2={yNorm(zCrit)} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x={xScale(-zCrit)} y={baseY + 12} textAnchor="middle" fontSize="8.5" fill="#EF4444" fontWeight="700">−1.96</text>
      <text x={xScale(zCrit)} y={baseY + 12} textAnchor="middle" fontSize="8.5" fill="#EF4444" fontWeight="700">+1.96</text>
      <text x={xScale(0)} y={baseY + 12} textAnchor="middle" fontSize="8" fill="#374151">0</text>
      <text x={xScale(-2.7)} y={baseY - 10} textAnchor="middle" fontSize="8" fill="#EF4444" fontWeight="600">2.5%</text>
      <text x={xScale(2.7)} y={baseY - 10} textAnchor="middle" fontSize="8" fill="#EF4444" fontWeight="600">2.5%</text>
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8.5" fill="#374151">Z = (x̄−μ₀)/(σ/√n)  ~  N(0,1)  under H₀</text>
    </svg>
  )
}

function TTestViz() {
  const W = 320, H = 200
  const pad = { l: 24, r: 24, t: 30, b: 48 }
  const cx = W / 2, baseY = H - pad.b
  const xScale = (z: number) => cx + z * 40
  const yNorm = (z: number) => baseY - 80 * Math.exp(-0.5 * z * z)
  const yt3 = (z: number) => baseY - 80 * Math.pow(1 + z * z / 3, -2)
  const yt10 = (z: number) => baseY - 80 * Math.pow(1 + z * z / 10, -5.5)
  const ptsNorm: string[] = [], ptst3: string[] = [], ptst10: string[] = []
  for (let z = -3.5; z <= 3.5; z += 0.05) {
    ptsNorm.push(`${xScale(z)},${yNorm(z)}`)
    ptst3.push(`${xScale(z)},${yt3(z)}`)
    ptst10.push(`${xScale(z)},${yt10(z)}`)
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">t-Distribution vs Normal (heavier tails, small n)</text>
      <line x1={xScale(-3.5)} y1={baseY} x2={xScale(3.5)} y2={baseY} stroke="#D1D5DB" strokeWidth="1" />
      <polyline points={ptsNorm.join(" ")} fill="none" stroke="#2563EB" strokeWidth="2" />
      <polyline points={ptst10.join(" ")} fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 3" />
      <polyline points={ptst3.join(" ")} fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Legend */}
      <line x1={pad.l} y1={H - 32} x2={pad.l + 20} y2={H - 32} stroke="#2563EB" strokeWidth="2" />
      <text x={pad.l + 24} y={H - 28} fontSize="8" fill="#374151">N(0,1)</text>
      <line x1={pad.l + 56} y1={H - 32} x2={pad.l + 76} y2={H - 32} stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={pad.l + 80} y={H - 28} fontSize="8" fill="#374151">t(10)</text>
      <line x1={pad.l + 112} y1={H - 32} x2={pad.l + 132} y2={H - 32} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={pad.l + 136} y={H - 28} fontSize="8" fill="#374151">t(3)</text>
      {[-3, -2, -1, 0, 1, 2, 3].map(v => (
        <text key={v} x={xScale(v)} y={baseY + 12} textAnchor="middle" fontSize="7.5" fill="#9CA3AF">{v}</text>
      ))}
      <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="8.5" fill="#374151">T = (x̄−μ₀)/(s/√n)  ~  t(n−1)  under H₀</text>
    </svg>
  )
}

function ChiSquareViz() {
  const W = 320, H = 190
  const pad = { l: 32, r: 24, t: 30, b: 44 }
  const baseY = H - pad.b
  const xMax = 15, critVal = 5.99  // chi2(2, alpha=0.05)
  const xScale = (x: number) => pad.l + (x / xMax) * (W - pad.l - pad.r)
  const yScale = (y: number) => baseY - y * 200
  const chi2pdf = (x: number, k: number) => x <= 0 ? 0 : Math.exp((k / 2 - 1) * Math.log(x) - x / 2 - (k / 2) * Math.log(2) - Math.log(Math.abs(k / 2 - 1) || 1))
  const ptsAll: string[] = [], ptsTail: string[] = []
  for (let x = 0.1; x <= xMax; x += 0.1) {
    const y = chi2pdf(x, 2) * 1.2
    ptsAll.push(`${xScale(x)},${yScale(y)}`)
    if (x >= critVal) ptsTail.push(`${xScale(x)},${yScale(y)}`)
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Chi-Square Distribution χ²(2), α=0.05</text>
      <line x1={pad.l} y1={baseY} x2={W - pad.r} y2={baseY} stroke="#D1D5DB" strokeWidth="1" />
      {/* Rejection region */}
      <polygon points={[`${xScale(critVal)},${baseY}`, ...ptsTail, `${xScale(xMax)},${baseY}`].join(" ")} fill="#FCA5A5" fillOpacity="0.7" />
      <polyline points={ptsAll.join(" ")} fill="none" stroke="#7C3AED" strokeWidth="2" />
      <line x1={xScale(critVal)} y1={baseY} x2={xScale(critVal)} y2={baseY - 60} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x={xScale(critVal)} y={baseY + 14} textAnchor="middle" fontSize="8.5" fill="#EF4444" fontWeight="700">{critVal}</text>
      <text x={xScale(critVal + 2)} y={baseY - 20} textAnchor="middle" fontSize="8" fill="#EF4444" fontWeight="600">5%</text>
      {[0, 3, 6, 9, 12].map(v => (
        <text key={v} x={xScale(v)} y={baseY + 12} textAnchor="middle" fontSize="7.5" fill="#9CA3AF">{v}</text>
      ))}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8.5" fill="#374151">χ² = Σ(O−E)²/E  ~  χ²((r−1)(c−1))  under H₀</text>
    </svg>
  )
}

function AnovaViz() {
  const W = 320, H = 195
  const pad = { l: 36, r: 16, t: 34, b: 44 }
  const groups = [
    { label: "Group A", mean: 52, spread: 6, color: "#BFDBFE", stroke: "#3B82F6", n: 6 },
    { label: "Group B", mean: 68, spread: 7, color: "#D1FAE5", stroke: "#10B981", n: 6 },
    { label: "Group C", mean: 44, spread: 5, color: "#FDE68A", stroke: "#D97706", n: 6 },
  ]
  const grandMean = groups.reduce((s, g) => s + g.mean, 0) / 3
  const yMin = 20, yMax = 100
  const yScale = (v: number) => H - pad.b - ((v - yMin) / (yMax - yMin)) * (H - pad.t - pad.b)
  const gw = (W - pad.l - pad.r - 24) / 3
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">ANOVA — Between-Group vs Within-Group Variance</text>
      {/* Grand mean */}
      <line x1={pad.l} y1={yScale(grandMean)} x2={W - pad.r} y2={yScale(grandMean)} stroke="#6B7280" strokeWidth="1" strokeDasharray="6 3" />
      <text x={W - pad.r + 2} y={yScale(grandMean) + 4} fontSize="7.5" fill="#6B7280">x̄</text>
      {groups.map(({ label, mean, spread, color, stroke, n }, idx) => {
        const ox = pad.l + idx * (gw + 12) + gw / 2
        return (
          <g key={idx}>
            {/* Within-group spread (simulated points) */}
            {Array.from({ length: n }, (_, k) => {
              const jitter = (k - n / 2) * 5.5
              const val = mean + (k % 3 === 0 ? -spread : k % 3 === 1 ? 0 : spread) * 0.8
              return (
                <circle key={k} cx={ox + jitter * 0.3} cy={yScale(val)} r={3} fill={color} stroke={stroke} strokeWidth="1" />
              )
            })}
            {/* Group mean line */}
            <line x1={ox - gw * 0.35} y1={yScale(mean)} x2={ox + gw * 0.35} y2={yScale(mean)} stroke={stroke} strokeWidth="2.5" />
            <text x={ox} y={H - pad.b + 14} textAnchor="middle" fontSize="8.5" fill="#374151">{label}</text>
            <text x={ox} y={yScale(mean) - 6} textAnchor="middle" fontSize="7.5" fill={stroke} fontWeight="700">μ={mean}</text>
          </g>
        )
      })}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="8.5" fill="#374151">F = MSB/MSW  ~  F(k−1, n−k)  under H₀</text>
    </svg>
  )
}

function MannWhitneyViz() {
  const W = 320, H = 195
  const pad = { l: 24, r: 24, t: 30, b: 48 }
  const group1 = [3, 5, 7, 9, 11, 13]
  const group2 = [1, 4, 6, 10, 14, 16]
  const combined = [
    ...group1.map(v => ({ v, g: 1 })),
    ...group2.map(v => ({ v, g: 2 })),
  ].sort((a, b) => a.v - b.v)
  const n = combined.length
  const rankX = (i: number) => pad.l + (i / (n - 1)) * (W - pad.l - pad.r)
  const dotY1 = 90, dotY2 = 120
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Mann-Whitney U — Rank-Based Comparison</text>
      {/* Rank axis */}
      <line x1={pad.l} y1={105} x2={W - pad.r} y2={105} stroke="#D1D5DB" strokeWidth="1" />
      {combined.map(({ v, g }, i) => (
        <g key={i}>
          <circle cx={rankX(i)} cy={g === 1 ? dotY1 : dotY2} r={7}
            fill={g === 1 ? "#BFDBFE" : "#D1FAE5"} stroke={g === 1 ? "#3B82F6" : "#10B981"} strokeWidth="1.5" />
          <text x={rankX(i)} y={(g === 1 ? dotY1 : dotY2) + 4} textAnchor="middle" fontSize="7.5" fill="#374151">{v}</text>
          <text x={rankX(i)} y={105 + 12} textAnchor="middle" fontSize="7" fill="#9CA3AF">r{i + 1}</text>
        </g>
      ))}
      {/* Legend */}
      <circle cx={pad.l + 4} cy={H - 32} r={5} fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" />
      <text x={pad.l + 12} y={H - 28} fontSize="8" fill="#374151">Group 1</text>
      <circle cx={pad.l + 62} cy={H - 32} r={5} fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      <text x={pad.l + 70} y={H - 28} fontSize="8" fill="#374151">Group 2</text>
      <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="8.5" fill="#374151">U/(n₁n₂) = P̂(X{">"}Y) = AUC</text>
    </svg>
  )
}

function MultipleTestingViz() {
  const W = 320, H = 200
  const pad = { l: 36, r: 24, t: 30, b: 44 }
  const m = 20
  const alpha = 0.05
  const bonf = alpha / m
  const bhQ = 0.05
  const pvals = [0.001, 0.003, 0.006, 0.010, 0.018, 0.024, 0.031, 0.042, 0.057, 0.071, 0.089, 0.108, 0.134, 0.160, 0.195, 0.23, 0.29, 0.38, 0.54, 0.78]
  const xScale = (i: number) => pad.l + (i / (m - 1)) * (W - pad.l - pad.r)
  const yScale = (p: number) => pad.t + (Math.log10(p) / Math.log10(0.0005)) * (H - pad.t - pad.b) * (-1)
  const bonfY = pad.t + (Math.log10(bonf) / Math.log10(0.0005)) * (H - pad.t - pad.b) * (-1)
  const alphaY = pad.t + (Math.log10(alpha) / Math.log10(0.0005)) * (H - pad.t - pad.b) * (-1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      <text x={W / 2} y={16} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">Multiple Testing — Bonferroni vs BH-FDR (m=20)</text>
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1D5DB" strokeWidth="1" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1D5DB" strokeWidth="1" />
      {/* Unadjusted alpha */}
      <line x1={pad.l} y1={alphaY} x2={W - pad.r} y2={alphaY} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
      <text x={W - pad.r + 2} y={alphaY + 4} fontSize="7.5" fill="#9CA3AF">α=0.05</text>
      {/* Bonferroni threshold */}
      <line x1={pad.l} y1={bonfY} x2={W - pad.r} y2={bonfY} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={W - pad.r + 2} y={bonfY + 4} fontSize="7.5" fill="#EF4444">Bonf</text>
      {/* BH line: i*q/m for each sorted rank */}
      {pvals.map((_, i) => {
        const bhThresh = ((i + 1) * bhQ) / m
        if (i < m - 1) {
          const x1 = xScale(i), x2 = xScale(i + 1)
          const bhY1 = pad.t + (Math.log10(bhThresh) / Math.log10(0.0005)) * (H - pad.t - pad.b) * (-1)
          const bhThresh2 = ((i + 2) * bhQ) / m
          const bhY2 = pad.t + (Math.log10(bhThresh2) / Math.log10(0.0005)) * (H - pad.t - pad.b) * (-1)
          return <line key={i} x1={x1} y1={bhY1} x2={x2} y2={bhY2} stroke="#3B82F6" strokeWidth="1.5" />
        }
        return null
      })}
      {/* p-values */}
      {pvals.map((p, i) => {
        const py = yScale(p)
        const bhThresh = ((i + 1) * bhQ) / m
        const rejected = p <= bhThresh
        return (
          <circle key={i} cx={xScale(i)} cy={py} r={3.5}
            fill={rejected ? "#10B981" : "#9CA3AF"} stroke="white" strokeWidth="1" />
        )
      })}
      {/* Legend */}
      <line x1={pad.l} y1={H - 20} x2={pad.l + 16} y2={H - 20} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={pad.l + 20} y={H - 16} fontSize="7.5" fill="#374151">Bonferroni</text>
      <line x1={pad.l + 76} y1={H - 20} x2={pad.l + 92} y2={H - 20} stroke="#3B82F6" strokeWidth="1.5" />
      <text x={pad.l + 96} y={H - 16} fontSize="7.5" fill="#374151">BH threshold</text>
      <circle cx={pad.l + 164} cy={H - 20} r={3.5} fill="#10B981" stroke="white" strokeWidth="1" />
      <text x={pad.l + 170} y={H - 16} fontSize="7.5" fill="#374151">BH-rejected</text>
    </svg>
  )
}

function KMeansViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const clusters: { pts: [number,number][]; cx: number; cy: number; fill: string; stroke: string }[] = [
    { pts: [[0.12,0.78],[0.18,0.85],[0.22,0.72],[0.28,0.80],[0.15,0.65],[0.30,0.75],[0.08,0.70]],
      cx: 0.19, cy: 0.75, fill: "#DBEAFE", stroke: "#3B82F6" },
    { pts: [[0.48,0.55],[0.55,0.65],[0.60,0.50],[0.52,0.45],[0.65,0.60],[0.58,0.72],[0.45,0.68]],
      cx: 0.55, cy: 0.59, fill: "#D1FAE5", stroke: "#10B981" },
    { pts: [[0.72,0.22],[0.80,0.30],[0.85,0.18],[0.78,0.38],[0.90,0.28],[0.68,0.15],[0.82,0.12]],
      cx: 0.79, cy: 0.23, fill: "#FEE2E2", stroke: "#EF4444" },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* cluster region blobs (approximate via ellipses) */}
      <ellipse cx={sx(0.19)} cy={sy(0.75)} rx={52} ry={36} fill="#DBEAFE" opacity="0.4" />
      <ellipse cx={sx(0.55)} cy={sy(0.59)} rx={56} ry={40} fill="#D1FAE5" opacity="0.4" />
      <ellipse cx={sx(0.79)} cy={sy(0.23)} rx={52} ry={34} fill="#FEE2E2" opacity="0.4" />

      {/* data points */}
      {clusters.map((cl, ci) =>
        cl.pts.map(([x, y], i) => (
          <circle key={`${ci}-${i}`} cx={sx(x)} cy={sy(y)} r={4.5}
            fill={cl.stroke} opacity="0.85" />
        ))
      )}

      {/* centroid stars */}
      {clusters.map((cl, ci) => {
        const cx = sx(cl.cx), cy = sy(cl.cy)
        const r = 8, ri = 4
        const pts = Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI) / 5 - Math.PI / 2
          const rad = i % 2 === 0 ? r : ri
          return `${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`
        }).join(" ")
        return <polygon key={ci} points={pts} fill={cl.stroke} stroke="white" strokeWidth="1.2" />
      })}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8" fill="#9CA3AF">Feature x₁</text>
      <text x={11} y={H / 2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H / 2})`}>Feature x₂</text>

      {/* legend */}
      <polygon points={`${pad.l+8},${H-pad.b+10} ${pad.l+11},${H-pad.b+17} ${pad.l+8},${H-pad.b+21} ${pad.l+5},${H-pad.b+17}`}
        fill="#9CA3AF" />
      <text x={pad.l + 14} y={H - pad.b + 19} fontSize="7" fill="#6B7280">centroid μₖ</text>
      <circle cx={pad.l + 90} cy={H - pad.b + 15} r={4.5} fill="#9CA3AF" opacity="0.7" />
      <text x={pad.l + 97} y={H - pad.b + 19} fontSize="7" fill="#6B7280">data point</text>
    </svg>
  )
}

// ── DBSCAN: core / border / noise points + ε-rings ───────────────────────────
function DBSCANViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // core points (filled circles), border points, noise
  const coreA:  [number,number][] = [[0.18,0.72],[0.25,0.80],[0.22,0.62],[0.30,0.75],[0.15,0.82]]
  const borderA:[number,number][] = [[0.10,0.68],[0.35,0.78]]
  const coreB:  [number,number][] = [[0.65,0.35],[0.72,0.28],[0.70,0.45],[0.78,0.38]]
  const borderB:[number,number][] = [[0.58,0.30],[0.82,0.42]]
  const noise:  [number,number][] = [[0.42,0.55],[0.90,0.75],[0.05,0.20]]

  // ε radius in screen units (approximate)
  const eps = 26

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* ε-neighbourhood rings on core points */}
      {[...coreA, ...coreB].map(([x, y], i) => (
        <circle key={i} cx={sx(x)} cy={sy(y)} r={eps}
          fill="none" stroke="#10B981" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4" />
      ))}

      {/* cluster A fill */}
      <ellipse cx={sx(0.22)} cy={sy(0.74)} rx={62} ry={42} fill="#D1FAE5" opacity="0.35" />
      {/* cluster B fill */}
      <ellipse cx={sx(0.70)} cy={sy(0.37)} rx={54} ry={38} fill="#DBEAFE" opacity="0.35" />

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* core A */}
      {coreA.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#10B981" stroke="white" strokeWidth="1.2" />)}
      {/* border A */}
      {borderA.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#6EE7B7" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2,1" />)}
      {/* core B */}
      {coreB.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#3B82F6" stroke="white" strokeWidth="1.2" />)}
      {/* border B */}
      {borderB.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={6} fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2,1" />)}
      {/* noise */}
      {noise.map(([x,y],i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={5} fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />)}

      {/* ε annotation */}
      <line x1={sx(0.18)} y1={sy(0.72)} x2={sx(0.18) + eps} y2={sy(0.72)} stroke="#10B981" strokeWidth="1.2" />
      <text x={sx(0.18) + eps / 2} y={sy(0.72) - 4} textAnchor="middle" fontSize="9" fill="#10B981" fontWeight="700">ε</text>

      {/* labels */}
      <text x={sx(0.17)} y={sy(0.91)} fontSize="7.5" fill="#059669" fontWeight="600" textAnchor="middle">Cluster A</text>
      <text x={sx(0.72)} y={sy(0.55)} fontSize="7.5" fill="#2563EB" fontWeight="600" textAnchor="middle">Cluster B</text>
      {noise.map(([x,y],i) => (
        <text key={i} x={sx(x)} y={sy(y) - 9} fontSize="7" fill="#6B7280" textAnchor="middle">noise</text>
      ))}

      {/* legend */}
      <circle cx={pad.l+6}  cy={H-pad.b+15} r={5} fill="#10B981" stroke="white" strokeWidth="1" />
      <text x={pad.l+14} y={H-pad.b+19} fontSize="7" fill="#6B7280">core</text>
      <circle cx={pad.l+50} cy={H-pad.b+15} r={5} fill="#6EE7B7" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2,1" />
      <text x={pad.l+58} y={H-pad.b+19} fontSize="7" fill="#6B7280">border</text>
      <circle cx={pad.l+102} cy={H-pad.b+15} r={5} fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
      <text x={pad.l+110} y={H-pad.b+19} fontSize="7" fill="#6B7280">noise</text>
    </svg>
  )
}

// ── Hierarchical Clustering: dendrogram ──────────────────────────────────────
function HierarchicalClusteringViz() {
  const W = 320, H = 215
  const padL = 30, padR = 20, padT = 14, padB = 50
  const pw = W - padL - padR
  const ph = H - padT - padB

  // 7 leaves, positions evenly spaced along x
  const labels = ["A","B","C","D","E","F","G"]
  const n = labels.length
  const leafX = (i: number) => padL + (i / (n - 1)) * pw
  const leafY = H - padB

  // Dendrogram merges: [left_leaf_idx, right_idx_or_neg, height_norm, result_x_norm]
  // Heights normalised to [0,1], y = padT + (1-h)*ph
  type Merge = { l: number; r: number; h: number; x: number }
  // Bottom-up: merge(0,1), merge(2,3), merge(5,6), merge(m01,m23), merge(4,m56), merge(big,small)
  const merges: Merge[] = [
    { l: 0, r: 1,  h: 0.18, x: (leafX(0)+leafX(1))/2 },   // merge A,B → node 7
    { l: 2, r: 3,  h: 0.22, x: (leafX(2)+leafX(3))/2 },   // merge C,D → node 8
    { l: 5, r: 6,  h: 0.20, x: (leafX(5)+leafX(6))/2 },   // merge F,G → node 9
    { l: 7, r: 8,  h: 0.45, x: ((leafX(0)+leafX(1))/2+(leafX(2)+leafX(3))/2)/2 }, // merge AB,CD → node 10
    { l: 4, r: 9,  h: 0.50, x: (leafX(4)+(leafX(5)+leafX(6))/2)/2 },              // merge E,FG → node 11
    { l: 10, r: 11, h: 0.82, x: W/2 },                                             // merge all → root
  ]

  const sy = (h: number) => padT + (1 - h) * ph
  // node x positions: indices 0-6 are leaves, 7-12 are merged nodes
  const nodeX: number[] = labels.map((_,i) => leafX(i))
  merges.forEach(m => nodeX.push(m.x))

  const cutH = 0.60  // cut line

  // Cluster colouring: nodes below cut get colour
  const colours = ["#3B82F6","#10B981","#F59E0B"]  // 3 clusters after cut

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* y axis */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#D1FAE5" strokeWidth="1.2" />
      {[0,0.25,0.50,0.75,1.0].map(v => (
        <g key={v}>
          <line x1={padL-4} y1={sy(v)} x2={padL} y2={sy(v)} stroke="#9CA3AF" strokeWidth="1" />
          <text x={padL-6} y={sy(v)+3} textAnchor="end" fontSize="7" fill="#9CA3AF">{v.toFixed(2)}</text>
        </g>
      ))}
      <text x={10} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,10,${H/2})`}>Distance</text>

      {/* dendrogram lines */}
      {merges.map((m, i) => {
        const lx = nodeX[m.l], rx = nodeX[m.r]
        const my = sy(m.h)
        const ly = m.l < 7 ? leafY : sy(merges[m.l - 7].h)
        const ry = m.r < 7 ? leafY : sy(merges[m.r - 7].h)
        const col = m.h > cutH ? "#9CA3AF" : colours[Math.floor(i / 2) % 3]
        return (
          <g key={i}>
            <line x1={lx} y1={ly} x2={lx} y2={my} stroke={col} strokeWidth="2" />
            <line x1={rx} y1={ry} x2={rx} y2={my} stroke={col} strokeWidth="2" />
            <line x1={lx} y1={my} x2={rx} y2={my} stroke={col} strokeWidth="2" />
          </g>
        )
      })}

      {/* cut line */}
      <line x1={padL} y1={sy(cutH)} x2={W - padR} y2={sy(cutH)}
        stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x={W - padR - 2} y={sy(cutH) - 4} textAnchor="end" fontSize="7.5" fill="#EF4444" fontWeight="600">cut → 3 clusters</text>

      {/* leaf labels */}
      {labels.map((l, i) => (
        <text key={i} x={leafX(i)} y={leafY + 14} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">{l}</text>
      ))}
    </svg>
  )
}

// ── GMM: overlapping Gaussian ellipses with soft responsibilities ─────────────
function GMMViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const components = [
    { cx: 0.25, cy: 0.70, rx: 52, ry: 28, rot: -25, fill: "#DBEAFE", stroke: "#3B82F6", label: "N(μ₁,Σ₁)", pi: "π₁=0.40" },
    { cx: 0.58, cy: 0.45, rx: 44, ry: 44, rot: 0,   fill: "#D1FAE5", stroke: "#10B981", label: "N(μ₂,Σ₂)", pi: "π₂=0.35" },
    { cx: 0.80, cy: 0.72, rx: 38, ry: 24, rot: 20,  fill: "#FEF3C7", stroke: "#F59E0B", label: "N(μ₃,Σ₃)", pi: "π₃=0.25" },
  ]

  const pts: { x:number; y:number; r1:number; r2:number; r3:number }[] = [
    { x:0.18, y:0.75, r1:0.80, r2:0.15, r3:0.05 },
    { x:0.30, y:0.65, r1:0.70, r2:0.25, r3:0.05 },
    { x:0.50, y:0.55, r1:0.20, r2:0.70, r3:0.10 },
    { x:0.62, y:0.40, r1:0.05, r2:0.90, r3:0.05 },
    { x:0.45, y:0.62, r1:0.35, r2:0.55, r3:0.10 },
    { x:0.78, y:0.70, r1:0.05, r2:0.15, r3:0.80 },
    { x:0.68, y:0.60, r1:0.08, r2:0.50, r3:0.42 },  // boundary point
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Gaussian ellipses (3 layers for density feel) */}
      {components.map((c, i) => (
        <g key={i}>
          <ellipse cx={sx(c.cx)} cy={sy(c.cy)} rx={c.rx * 1.6} ry={c.ry * 1.6}
            transform={`rotate(${c.rot},${sx(c.cx)},${sy(c.cy)})`}
            fill={c.fill} opacity="0.15" />
          <ellipse cx={sx(c.cx)} cy={sy(c.cy)} rx={c.rx * 1.2} ry={c.ry * 1.2}
            transform={`rotate(${c.rot},${sx(c.cx)},${sy(c.cy)})`}
            fill={c.fill} opacity="0.20" />
          <ellipse cx={sx(c.cx)} cy={sy(c.cy)} rx={c.rx} ry={c.ry}
            transform={`rotate(${c.rot},${sx(c.cx)},${sy(c.cy)})`}
            fill={c.fill} stroke={c.stroke} strokeWidth="2" opacity="0.55" />
        </g>
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* component means */}
      {components.map((c, i) => (
        <g key={i}>
          <circle cx={sx(c.cx)} cy={sy(c.cy)} r={5.5} fill={c.stroke} stroke="white" strokeWidth="1.5" />
          <text x={sx(c.cx)+8} y={sy(c.cy)-6} fontSize="7.5" fill={c.stroke} fontWeight="700">{c.label}</text>
          <text x={sx(c.cx)+8} y={sy(c.cy)+5} fontSize="7" fill={c.stroke}>{c.pi}</text>
        </g>
      ))}

      {/* data points (coloured by dominant responsibility) */}
      {pts.map((p, i) => {
        const max = Math.max(p.r1, p.r2, p.r3)
        const col = max === p.r1 ? "#3B82F6" : max === p.r2 ? "#10B981" : "#F59E0B"
        const opacity = 0.5 + max * 0.4
        return <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={5} fill={col} opacity={opacity} />
      })}

      {/* soft assignment annotation for boundary point */}
      <text x={sx(pts[6].x)+8} y={sy(pts[6].y)-2} fontSize="6.5" fill="#374151">50% C₂ / 42% C₃</text>

      {/* legend */}
      <circle cx={pad.l+6} cy={H-pad.b+15} r={5} fill="#9CA3AF" opacity="0.6" />
      <text x={pad.l+14} y={H-pad.b+19} fontSize="7" fill="#6B7280">soft assignment (rᵢₖ)</text>
      <circle cx={pad.l+5} cy={H-pad.b+15} r={5} fill="#3B82F6" stroke="white" strokeWidth="1.2" />
    </svg>
  )
}

// ── Mean Shift: density landscape + gradient ascent paths ────────────────────
function MeanShiftViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 18, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // Two density modes (cluster centres)
  const mode1 = { x: 0.28, y: 0.72 }
  const mode2 = { x: 0.72, y: 0.35 }

  // Trajectory paths converging to each mode
  const paths1: [number,number][][] = [
    [[0.10,0.45],[0.18,0.56],[0.24,0.65],[0.27,0.70],[0.28,0.72]],
    [[0.15,0.88],[0.20,0.82],[0.24,0.77],[0.27,0.74],[0.28,0.72]],
    [[0.42,0.62],[0.36,0.67],[0.31,0.70],[0.29,0.71],[0.28,0.72]],
  ]
  const paths2: [number,number][][] = [
    [[0.55,0.60],[0.62,0.52],[0.67,0.44],[0.70,0.38],[0.72,0.35]],
    [[0.90,0.20],[0.82,0.25],[0.76,0.30],[0.73,0.33],[0.72,0.35]],
    [[0.88,0.55],[0.82,0.46],[0.77,0.40],[0.74,0.37],[0.72,0.35]],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* density halos */}
      {[1.8,1.4,1.0,0.7,0.4].map((r,i) => (
        <g key={i}>
          <ellipse cx={sx(mode1.x)} cy={sy(mode1.y)} rx={r*36} ry={r*30}
            fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity={0.12 + i*0.06} />
          <ellipse cx={sx(mode2.x)} cy={sy(mode2.y)} rx={r*34} ry={r*28}
            fill="none" stroke="#10B981" strokeWidth="0.6" opacity={0.12 + i*0.06} />
        </g>
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />

      {/* convergence paths to mode 1 */}
      {paths1.map((path, i) => {
        const pts = path.map(([x,y]) => `${sx(x)},${sy(y)}`).join(" ")
        return (
          <g key={i}>
            <polyline points={pts} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
            {/* arrow at second-to-last segment */}
            <circle cx={sx(path[path.length-2][0])} cy={sy(path[path.length-2][1])} r={2.5} fill="#3B82F6" opacity="0.7" />
          </g>
        )
      })}

      {/* convergence paths to mode 2 */}
      {paths2.map((path, i) => {
        const pts = path.map(([x,y]) => `${sx(x)},${sy(y)}`).join(" ")
        return (
          <g key={i}>
            <polyline points={pts} fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
            <circle cx={sx(path[path.length-2][0])} cy={sy(path[path.length-2][1])} r={2.5} fill="#10B981" opacity="0.7" />
          </g>
        )
      })}

      {/* starting points */}
      {[...paths1, ...paths2].map((path, i) => (
        <circle key={i} cx={sx(path[0][0])} cy={sy(path[0][1])} r={4}
          fill={i < 3 ? "#3B82F6" : "#10B981"} opacity="0.5" />
      ))}

      {/* modes */}
      <circle cx={sx(mode1.x)} cy={sy(mode1.y)} r={8} fill="#3B82F6" stroke="white" strokeWidth="2" />
      <text x={sx(mode1.x)+11} y={sy(mode1.y)-4} fontSize="8" fill="#3B82F6" fontWeight="700">mode 1</text>
      <circle cx={sx(mode2.x)} cy={sy(mode2.y)} r={8} fill="#10B981" stroke="white" strokeWidth="2" />
      <text x={sx(mode2.x)+11} y={sy(mode2.y)-4} fontSize="8" fill="#10B981" fontWeight="700">mode 2</text>

      {/* legend */}
      <polyline points={`${pad.l+2},${H-pad.b+15} ${pad.l+14},${H-pad.b+15}`}
        fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x={pad.l+17} y={H-pad.b+19} fontSize="7" fill="#6B7280">gradient ascent path</text>
      <circle cx={pad.l+130} cy={H-pad.b+15} r={7} fill="#9CA3AF" stroke="white" strokeWidth="1.5" />
      <text x={pad.l+140} y={H-pad.b+19} fontSize="7" fill="#6B7280">density mode</text>
    </svg>
  )
}

// ── HDBSCAN: condensed cluster tree (density vs cluster lifetime) ─────────────
function HDBSCANViz() {
  const W = 320, H = 215
  const padL = 52, padR = 20, padT = 14, padB = 50
  const pw = W - padL - padR
  const ph = H - padT - padB

  // λ scale (density): bottom = low density (λ_min=0), top = high density
  const sy = (lam: number) => padT + (1 - lam) * ph

  // Root splits at λ=0.05 into two branches
  // Cluster A (blue): born λ=0.05, persists to λ=0.85, splits into A1 (λ=0.50-0.85) and A2 (λ=0.50-0.65, then noise)
  // Cluster B (green): born λ=0.05, persists to λ=0.90
  // Scattered noise falls off at various λ

  const clusters = [
    { label: "Cluster A",  x: padL + pw*0.25, birth: 0.05, death: 0.85, width: 80, col: "#3B82F6" },
    { label: "Cluster B",  x: padL + pw*0.72, birth: 0.05, death: 0.90, width: 60, col: "#10B981" },
  ]
  const subA1 = { x: padL + pw*0.18, birth: 0.50, death: 0.85, width: 30, col: "#3B82F6" }
  const subA2 = { x: padL + pw*0.36, birth: 0.50, death: 0.65, width: 24, col: "#93C5FD" }

  // Noise points (thin lines dropping out)
  const noisePts = [
    { x: padL + pw*0.08, birth: 0.05, death: 0.30 },
    { x: padL + pw*0.45, birth: 0.05, death: 0.22 },
    { x: padL + pw*0.58, birth: 0.05, death: 0.18 },
  ]

  const cutLam = 0.68  // selected flat clustering

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* y axis (λ = 1/distance = density) */}
      <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke="#9CA3AF" strokeWidth="1.2" />
      {[0,0.25,0.50,0.75,1.0].map(v => (
        <g key={v}>
          <line x1={padL-4} y1={sy(v)} x2={padL} y2={sy(v)} stroke="#9CA3AF" strokeWidth="1" />
          <text x={padL-6} y={sy(v)+3} textAnchor="end" fontSize="7" fill="#9CA3AF">{v.toFixed(2)}</text>
        </g>
      ))}
      <text x={11} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H/2})`}>λ (density)</text>

      {/* noise drop-off lines */}
      {noisePts.map((n,i) => (
        <line key={i} x1={n.x} y1={sy(n.birth)} x2={n.x} y2={sy(n.death)}
          stroke="#D1D5DB" strokeWidth="2" />
      ))}

      {/* cluster B */}
      <rect x={clusters[1].x - clusters[1].width/2} y={sy(clusters[1].death)}
        width={clusters[1].width} height={sy(clusters[1].birth) - sy(clusters[1].death)}
        fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      <text x={clusters[1].x} y={sy(clusters[1].death) - 4} textAnchor="middle" fontSize="7.5" fill="#059669" fontWeight="700">{clusters[1].label}</text>

      {/* cluster A (parent, below split) */}
      <rect x={clusters[0].x - clusters[0].width/2} y={sy(0.50)}
        width={clusters[0].width} height={sy(0.05) - sy(0.50)}
        fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />

      {/* sub-clusters A1 and A2 (above split at λ=0.50) */}
      <rect x={subA1.x - subA1.width/2} y={sy(subA1.death)} width={subA1.width} height={sy(subA1.birth)-sy(subA1.death)} fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" />
      <text x={subA1.x} y={sy(subA1.death)-4} textAnchor="middle" fontSize="6.5" fill="#2563EB" fontWeight="700">A₁</text>
      <rect x={subA2.x - subA2.width/2} y={sy(subA2.death)} width={subA2.width} height={sy(subA2.birth)-sy(subA2.death)} fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1" />
      <text x={subA2.x} y={sy(subA2.death)-4} textAnchor="middle" fontSize="6.5" fill="#60A5FA">A₂</text>
      <text x={clusters[0].x} y={sy(0.28)} textAnchor="middle" fontSize="7.5" fill="#2563EB" fontWeight="700">Cluster A</text>

      {/* selected flat clustering line */}
      <line x1={padL} y1={sy(cutLam)} x2={W-padR} y2={sy(cutLam)}
        stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x={W-padR-2} y={sy(cutLam)-4} textAnchor="end" fontSize="7.5" fill="#EF4444" fontWeight="600">selected clustering</text>

      {/* leaf labels */}
      <text x={padL + pw*0.25} y={H-padB+14} textAnchor="middle" fontSize="8" fill="#374151">Cluster A</text>
      <text x={padL + pw*0.72} y={H-padB+14} textAnchor="middle" fontSize="8" fill="#374151">Cluster B</text>
      <text x={padL + pw*0.08} y={H-padB+14} textAnchor="middle" fontSize="7" fill="#9CA3AF">noise</text>
    </svg>
  )
}

// ── UMAP: high-dim → 2D projection preserving neighbourhood structure ─────────
function UMAPViz() {
  const W = 320, H = 215
  const pad = { l: 18, r: 14, t: 14, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // 4 clear clusters after UMAP projection
  const clusters = [
    { pts: [[0.12,0.78],[0.18,0.85],[0.20,0.72],[0.14,0.68],[0.22,0.80]], col: "#3B82F6",  label: "Class A", lx: 0.08, ly: 0.92 },
    { pts: [[0.45,0.80],[0.52,0.88],[0.48,0.72],[0.55,0.78],[0.42,0.84]], col: "#10B981",  label: "Class B", lx: 0.38, ly: 0.92 },
    { pts: [[0.72,0.55],[0.78,0.62],[0.68,0.48],[0.80,0.50],[0.74,0.68]], col: "#F59E0B",  label: "Class C", lx: 0.66, ly: 0.72 },
    { pts: [[0.35,0.25],[0.42,0.32],[0.30,0.18],[0.45,0.22],[0.38,0.38]], col: "#EF4444",  label: "Class D", lx: 0.25, ly: 0.42 },
  ]

  // Neighbourhood edges (thin lines connecting nearby points within cluster)
  const edges: [[number,number],[number,number]][] = [
    [[0.12,0.78],[0.18,0.85]], [[0.18,0.85],[0.20,0.72]], [[0.12,0.78],[0.14,0.68]],
    [[0.45,0.80],[0.52,0.88]], [[0.48,0.72],[0.55,0.78]], [[0.42,0.84],[0.45,0.80]],
    [[0.72,0.55],[0.78,0.62]], [[0.68,0.48],[0.80,0.50]], [[0.74,0.68],[0.72,0.55]],
    [[0.35,0.25],[0.42,0.32]], [[0.30,0.18],[0.35,0.25]], [[0.38,0.38],[0.42,0.32]],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* cluster halos */}
      {clusters.map((cl, i) => {
        const xs = cl.pts.map(p=>p[0]), ys = cl.pts.map(p=>p[1])
        const cx = xs.reduce((a,b)=>a+b)/xs.length
        const cy = ys.reduce((a,b)=>a+b)/ys.length
        return <ellipse key={i} cx={sx(cx)} cy={sy(cy)} rx={38} ry={32} fill={cl.col} opacity="0.12" />
      })}

      {/* neighbourhood edges */}
      {edges.map(([[x1,y1],[x2,y2]], i) => (
        <line key={i} x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)}
          stroke="#D1D5DB" strokeWidth="0.8" opacity="0.6" />
      ))}

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke="#D1FAE5" strokeWidth="1.2" />
      <text x={W/2} y={H-4} textAnchor="middle" fontSize="8" fill="#9CA3AF">UMAP dim 1</text>
      <text x={11} y={H/2} textAnchor="middle" fontSize="8" fill="#9CA3AF" transform={`rotate(-90,11,${H/2})`}>UMAP dim 2</text>

      {/* data points */}
      {clusters.map((cl, ci) =>
        cl.pts.map(([x,y], i) => (
          <circle key={`${ci}-${i}`} cx={sx(x)} cy={sy(y)} r={5} fill={cl.col} opacity="0.9" />
        ))
      )}

      {/* cluster labels */}
      {clusters.map((cl, i) => (
        <text key={i} x={sx(cl.lx)} y={sy(cl.ly)} fontSize="8" fill={cl.col} fontWeight="700">{cl.label}</text>
      ))}

      {/* annotation */}
      <text x={sx(0.58)} y={sy(0.15)} fontSize="7.5" fill="#374151" textAnchor="middle">nearby in 2D</text>
      <text x={sx(0.58)} y={sy(0.08)} fontSize="7.5" fill="#374151" textAnchor="middle">= nearby in high-d</text>
    </svg>
  )
}

// ── Finance & Quant Finance Visualizations ────────────────────────────────────

function EfficientFrontierViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // Frontier: parabola σ² = a(μ - μ_GMV)² + σ²_GMV, mapped to σ (x-axis) vs μ (y-axis)
  const gmv = { sigma: 0.12, mu: 0.06 }
  const pts: [number, number][] = []
  for (let mu = 0.04; mu <= 0.22; mu += 0.002) {
    const sigma = Math.sqrt(0.8 * Math.pow(mu - gmv.mu, 2) + gmv.sigma * gmv.sigma)
    pts.push([sigma, mu])
  }
  const maxS = 0.24, maxMu = 0.24
  const toSVG = (s: number, m: number): [number, number] => [sx(s / maxS), sy(m / maxMu)]

  const frontierPts = pts.map(([s, m]) => toSVG(s, m))
  const [midX, midY] = toSVG(0.185, 0.135)  // label position

  // Tangency portfolio (max Sharpe, rf=0.02)
  const rfMu = 0.02
  let bestSharpe = -Infinity, tangS = 0, tangM = 0
  for (const [s, m] of pts) {
    const sharpe = (m - rfMu) / s
    if (sharpe > bestSharpe) { bestSharpe = sharpe; tangS = s; tangM = m }
  }
  const [tx, ty] = toSVG(tangS, tangM)

  // CML line from rf to tangency and beyond
  const [cmlX0, cmlY0] = toSVG(0, rfMu)
  const slope = (tangM - rfMu) / tangS
  const [cmlX1, cmlY1] = toSVG(maxS, rfMu + slope * maxS)

  // Inefficient portfolios (below GMV)
  const ineffPts = pts.filter(([, m]) => m < gmv.mu)
  const effPts = pts.filter(([, m]) => m >= gmv.mu)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* grid */}
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Risk (σ)</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Return (μ)</text>

      {/* CML */}
      <line x1={cmlX0} y1={cmlY0} x2={cmlX1} y2={cmlY1} stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="4,2" opacity="0.8" />
      <text x={cmlX1 - 4} y={cmlY1 - 5} fontSize="7.5" fill="#F59E0B" textAnchor="end">CML</text>

      {/* inefficient part (dashed) */}
      <polyline
        points={ineffPts.map(([s, m]) => toSVG(s, m).join(",")).join(" ")}
        fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3,2"
      />
      {/* efficient frontier */}
      <polyline
        points={effPts.map(([s, m]) => toSVG(s, m).join(",")).join(" ")}
        fill="none" stroke="#10B981" strokeWidth="2.5"
      />

      {/* GMV */}
      {(() => { const [gx, gy] = toSVG(gmv.sigma, gmv.mu); return (<><circle cx={gx} cy={gy} r={4} fill="#064E3B" /><text x={gx + 6} y={gy + 4} fontSize="7.5" fill="#064E3B" fontWeight="700">GMV</text></>) })()}

      {/* Tangency */}
      <circle cx={tx} cy={ty} r={5} fill="#F59E0B" />
      <text x={tx + 7} y={ty - 3} fontSize="7.5" fill="#F59E0B" fontWeight="700">Tangency</text>

      {/* rf point */}
      <circle cx={cmlX0} cy={cmlY0} r={3} fill="#9CA3AF" />
      <text x={cmlX0 + 5} y={cmlY0 + 4} fontSize="7" fill="#6B7280">r_f</text>

      {/* frontier label */}
      <text x={midX + 8} y={midY} fontSize="8" fill="#10B981" fontWeight="600">Efficient Frontier</text>
    </svg>
  )
}

function CAPMViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  // SML: E[R] = rf + β(E[Rm] - rf), rf=0.03, E[Rm]=0.10
  const rf = 0.03, rm = 0.10
  const smlY = (beta: number) => rf + beta * (rm - rf)
  const maxBeta = 2.2, maxR = 0.21
  const bx = (b: number) => sx(b / maxBeta)
  const ry = (r: number) => sy(r / maxR)

  const stocks = [
    { beta: 0.5, r: 0.065, name: "Low β" },
    { beta: 1.0, r: 0.100, name: "Market" },
    { beta: 1.5, r: 0.135, name: "High β" },
    { beta: 0.8, r: 0.12, name: "Above SML" },  // above (positive alpha)
    { beta: 1.8, r: 0.11, name: "Below SML" },  // below (negative alpha)
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* grid */}
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Beta (β)</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Expected Return</text>

      {/* SML line */}
      <line x1={bx(0)} y1={ry(rf)} x2={bx(maxBeta)} y2={ry(smlY(maxBeta))}
        stroke="#10B981" strokeWidth="2.2" />
      <text x={bx(maxBeta) - 4} y={ry(smlY(maxBeta)) - 5} fontSize="8" fill="#10B981" fontWeight="700" textAnchor="end">SML</text>

      {/* beta=1, market */}
      <line x1={bx(1)} y1={H - pad.b} x2={bx(1)} y2={ry(rm)} stroke="#D1FAE5" strokeWidth="1" strokeDasharray="3,2" />
      <text x={bx(1)} y={H - pad.b + 10} fontSize="7.5" fill="#9CA3AF" textAnchor="middle">β=1</text>

      {/* rf label */}
      <circle cx={bx(0)} cy={ry(rf)} r={3} fill="#9CA3AF" />
      <text x={bx(0) + 5} y={ry(rf) + 4} fontSize="7" fill="#6B7280">r_f</text>

      {/* stock points */}
      {stocks.map((s, i) => {
        const onLine = Math.abs(s.r - smlY(s.beta)) < 0.005
        const above = s.r > smlY(s.beta)
        const col = onLine ? "#064E3B" : above ? "#F59E0B" : "#F87171"
        return (
          <g key={i}>
            <circle cx={bx(s.beta)} cy={ry(s.r)} r={4.5} fill={col} opacity="0.85" />
            {above && !onLine && (
              <text x={bx(s.beta) - 5} y={ry(s.r) - 7} fontSize="7" fill={col} textAnchor="middle">+α</text>
            )}
            {!above && !onLine && (
              <text x={bx(s.beta) + 5} y={ry(s.r) + 10} fontSize="7" fill={col}>-α</text>
            )}
          </g>
        )
      })}

      {/* legend */}
      <circle cx={pad.l + 4} cy={H - pad.b + 22} r={3} fill="#F59E0B" opacity="0.85" />
      <text x={pad.l + 10} y={H - pad.b + 25} fontSize="7" fill="#6B7280">above SML (+α)</text>
      <circle cx={pad.l + 90} cy={H - pad.b + 22} r={3} fill="#F87171" opacity="0.85" />
      <text x={pad.l + 96} y={H - pad.b + 25} fontSize="7" fill="#6B7280">below SML (-α)</text>
    </svg>
  )
}

function YieldCurveViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 20, 30]
  const maxM = 30, maxY = 0.065
  const mx = (m: number) => pad.l + (m / maxM) * pw
  const ry = (y: number) => pad.t + (1 - y / maxY) * ph

  // Normal: upward sloping
  const normal = [0.043, 0.044, 0.045, 0.046, 0.047, 0.050, 0.052, 0.055, 0.058, 0.060]
  // Inverted: downward sloping
  const inverted = [0.054, 0.053, 0.051, 0.048, 0.046, 0.043, 0.041, 0.039, 0.037, 0.035]
  // Flat
  const flat = [0.047, 0.047, 0.047, 0.047, 0.047, 0.047, 0.047, 0.047, 0.047, 0.047]

  const toPoints = (yields: number[]) =>
    maturities.map((m, i) => `${mx(m)},${ry(yields[i])}`).join(" ")

  // Y-axis ticks
  const yTicks = [0.02, 0.03, 0.04, 0.05, 0.06]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* grid */}
      {yTicks.map(y => (
        <line key={y} x1={pad.l} y1={ry(y)} x2={W - pad.r} y2={ry(y)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />

      {/* axis labels */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Maturity (years)</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Yield</text>

      {/* y-axis ticks */}
      {yTicks.map(y => (
        <text key={y} x={pad.l - 4} y={ry(y) + 3} fontSize="7" fill="#9CA3AF" textAnchor="end">{(y * 100).toFixed(0)}%</text>
      ))}
      {/* x-axis ticks */}
      {[2, 5, 10, 20, 30].map(m => (
        <text key={m} x={mx(m)} y={H - pad.b + 10} fontSize="7.5" fill="#9CA3AF" textAnchor="middle">{m}Y</text>
      ))}

      {/* curves */}
      <polyline points={toPoints(flat)} stroke="#9CA3AF" strokeWidth="1.4" strokeDasharray="4,2" fill="none" />
      <polyline points={toPoints(inverted)} fill="none" stroke="#F87171" strokeWidth="1.8" />
      <polyline points={toPoints(normal)} fill="none" stroke="#10B981" strokeWidth="2.2" />

      {/* labels */}
      <text x={mx(22)} y={ry(normal[8]) - 6} fontSize="7.5" fill="#10B981" fontWeight="700">Normal</text>
      <text x={mx(22)} y={ry(inverted[8]) + 12} fontSize="7.5" fill="#F87171" fontWeight="700">Inverted</text>
      <text x={mx(25)} y={ry(flat[8]) - 5} fontSize="7.5" fill="#9CA3AF" fontWeight="600">Flat</text>
    </svg>
  )
}

function OptionsPayoffViz() {
  const W = 320, H = 210
  const pad = { l: 40, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const K = 100, premium = 8
  const sMin = 60, sMax = 150

  const sx = (s: number) => pad.l + ((s - sMin) / (sMax - sMin)) * pw
  const profitRange = 60
  const py = (p: number) => pad.t + (1 - (p + profitRange / 2) / profitRange) * ph

  // Long call payoff
  const callPts: string[] = []
  const putPts: string[] = []
  for (let s = sMin; s <= sMax; s += 2) {
    callPts.push(`${sx(s)},${py(Math.max(0, s - K) - premium)}`)
    putPts.push(`${sx(s)},${py(Math.max(0, K - s) - premium)}`)
  }

  const zeroY = py(0)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* zero line */}
      <line x1={pad.l} y1={zeroY} x2={W - pad.r} y2={zeroY} stroke="#D1FAE5" strokeWidth="1.5" />
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Stock Price at Expiry</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Profit / Loss</text>

      {/* strike line */}
      <line x1={sx(K)} y1={pad.t} x2={sx(K)} y2={H - pad.b} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,2" />
      <text x={sx(K)} y={H - pad.b + 10} fontSize="7.5" fill="#9CA3AF" textAnchor="middle">K={K}</text>

      {/* payoffs */}
      <polyline points={putPts.join(" ")} fill="none" stroke="#818CF8" strokeWidth="2" />
      <polyline points={callPts.join(" ")} fill="none" stroke="#10B981" strokeWidth="2" />

      {/* premium line */}
      <line x1={pad.l} y1={py(-premium)} x2={W - pad.r} y2={py(-premium)} stroke="#F87171" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
      <text x={W - pad.r - 2} y={py(-premium) - 3} fontSize="7" fill="#F87171" textAnchor="end">max loss</text>

      {/* labels */}
      <text x={sx(135)} y={py(35 - premium) - 5} fontSize="8" fill="#10B981" fontWeight="700">Long Call</text>
      <text x={sx(72)} y={py(28 - premium) - 5} fontSize="8" fill="#818CF8" fontWeight="700">Long Put</text>
    </svg>
  )
}

function VaRDistributionViz() {
  const W = 320, H = 210
  const pad = { l: 20, r: 16, t: 20, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // Normal distribution curve
  const mean = 0.01, std = 0.02
  const xMin = mean - 4 * std, xMax = mean + 4 * std
  const varThreshold = mean - 2.33 * std  // 99% VaR
  const esThreshold = mean - 2.7 * std    // approx ES

  const norm = (x: number) => Math.exp(-0.5 * Math.pow((x - mean) / std, 2)) / (std * Math.sqrt(2 * Math.PI))
  const maxDensity = norm(mean)

  const px = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * pw
  const py = (d: number) => pad.t + (1 - d / (maxDensity * 1.05)) * ph

  // Build curve points
  const N = 80
  const curvePts: string[] = []
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin)
    curvePts.push(`${px(x)},${py(norm(x))}`)
  }

  // Tail fill polygon (left of VaR)
  const tailPts: string[] = [`${px(xMin)},${py(0)}`]
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin)
    if (x <= varThreshold) tailPts.push(`${px(x)},${py(norm(x))}`)
  }
  tailPts.push(`${px(varThreshold)},${py(0)}`)

  const varX = px(varThreshold)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* baseline */}
      <line x1={pad.l} y1={py(0)} x2={W - pad.r} y2={py(0)} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Daily P&amp;L</text>

      {/* 1% tail shaded */}
      <polygon points={tailPts.join(" ")} fill="#FCA5A5" opacity="0.5" />

      {/* distribution curve */}
      <polyline points={curvePts.join(" ")} fill="none" stroke="#10B981" strokeWidth="2.2" />

      {/* VaR line */}
      <line x1={varX} y1={pad.t} x2={varX} y2={py(0)} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={varX - 3} y={pad.t + 10} fontSize="7.5" fill="#EF4444" fontWeight="700" textAnchor="end">99% VaR</text>

      {/* annotations */}
      <text x={varX - 18} y={py(0) - 6} fontSize="7.5" fill="#DC2626" textAnchor="middle">1% tail</text>
      <text x={px(mean)} y={py(maxDensity) - 6} fontSize="7.5" fill="#10B981" fontWeight="600" textAnchor="middle">Expected P&amp;L</text>

      {/* legend note */}
      <text x={W - pad.r} y={H - 5} fontSize="7" fill="#9CA3AF" textAnchor="end">Tail beyond VaR = unknown loss</text>
    </svg>
  )
}

function DrawdownViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // Simulated equity curve (normalised 0–1 time, 0–1 value)
  const curve: [number, number][] = [
    [0.00, 0.40], [0.05, 0.45], [0.10, 0.52], [0.15, 0.60], [0.20, 0.65],
    [0.25, 0.72], [0.30, 0.68], [0.35, 0.55], [0.40, 0.48], [0.45, 0.44],
    [0.50, 0.50], [0.55, 0.58], [0.60, 0.66], [0.65, 0.74], [0.70, 0.80],
    [0.75, 0.76], [0.80, 0.70], [0.85, 0.72], [0.90, 0.78], [0.95, 0.84], [1.00, 0.90],
  ]
  const vMin = 0.3, vMax = 1.0
  const tx = (t: number) => pad.l + t * pw
  const vy = (v: number) => pad.t + (1 - (v - vMin) / (vMax - vMin)) * ph

  // Peak before drawdown: t=0.25 (0.72), trough: t=0.45 (0.44)
  const peakT = 0.25, peakV = 0.72
  const troughT = 0.45, troughV = 0.44
  const recoveryT = 0.57  // roughly where it crosses back above peak

  const curvePts = curve.map(([t, v]) => `${tx(t)},${vy(v)}`).join(" ")

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* drawdown shading */}
      <rect x={tx(peakT)} y={vy(peakV)} width={tx(recoveryT) - tx(peakT)}
        height={vy(troughV) - vy(peakV)} fill="#FCA5A5" opacity="0.3" />

      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      {[0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map(v => (
        <line key={v} x1={pad.l} y1={vy(v)} x2={W - pad.r} y2={vy(v)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Time</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Portfolio Value</text>

      {/* equity curve */}
      <polyline points={curvePts} fill="none" stroke="#10B981" strokeWidth="2.2" />

      {/* peak line */}
      <line x1={tx(peakT)} y1={vy(peakV)} x2={tx(recoveryT)} y2={vy(peakV)}
        stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3,2" />

      {/* peak & trough markers */}
      <circle cx={tx(peakT)} cy={vy(peakV)} r={4} fill="#064E3B" />
      <circle cx={tx(troughT)} cy={vy(troughV)} r={4} fill="#EF4444" />

      {/* drawdown arrow */}
      <line x1={tx(0.37)} y1={vy(peakV)} x2={tx(0.37)} y2={vy(troughV)}
        stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x={tx(0.37) + 4} y={(vy(peakV) + vy(troughV)) / 2} fontSize="8" fill="#EF4444" fontWeight="700">MDD</text>

      {/* labels */}
      <text x={tx(peakT) - 2} y={vy(peakV) - 6} fontSize="7.5" fill="#064E3B" textAnchor="middle">Peak</text>
      <text x={tx(troughT)} y={vy(troughV) + 12} fontSize="7.5" fill="#EF4444" textAnchor="middle">Trough</text>
      <text x={tx(recoveryT) + 3} y={vy(peakV) + 4} fontSize="7.5" fill="#9CA3AF">Recovery</text>
    </svg>
  )
}

function DurationPriceYieldViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // Bond price P = C/y * (1 - 1/(1+y)^n) + F/(1+y)^n, C=5, F=100, n=10
  const C = 5, F = 100, n = 10
  const bondPrice = (y: number) => {
    if (y === 0) return C * n + F
    return (C / y) * (1 - Math.pow(1 + y, -n)) + F * Math.pow(1 + y, -n)
  }

  const yMin = 0.01, yMax = 0.12
  const pMin = 60, pMax = 145
  const yx = (y: number) => pad.l + ((y - yMin) / (yMax - yMin)) * pw
  const py = (p: number) => pad.t + (1 - (p - pMin) / (pMax - pMin)) * ph

  const pts: string[] = []
  for (let y = yMin; y <= yMax; y += 0.001) {
    pts.push(`${yx(y)},${py(bondPrice(y))}`)
  }

  // Par yield
  const parY = 0.05
  const parP = bondPrice(parY)

  // Duration tangent at par
  const dy = 0.0001
  const dPdY = (bondPrice(parY + dy) - bondPrice(parY - dy)) / (2 * dy)
  const tangentPts = [
    `${yx(parY - 0.025)},${py(parP + dPdY * (-0.025))}`,
    `${yx(parY + 0.025)},${py(parP + dPdY * 0.025)}`,
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* grid */}
      {[70, 85, 100, 115, 130].map(p => (
        <line key={p} x1={pad.l} y1={py(p)} x2={W - pad.r} y2={py(p)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Yield to Maturity</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Bond Price</text>

      {/* convex price-yield curve */}
      <polyline points={pts.join(" ")} fill="none" stroke="#10B981" strokeWidth="2.2" />

      {/* duration tangent */}
      <polyline points={tangentPts.join(" ")} fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x={yx(parY + 0.028)} y={py(parP + dPdY * 0.028) - 4} fontSize="7.5" fill="#F59E0B">Duration tangent</text>

      {/* par point */}
      <line x1={yx(parY)} y1={pad.t} x2={yx(parY)} y2={H - pad.b} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx={yx(parY)} cy={py(parP)} r={4.5} fill="#064E3B" />
      <text x={yx(parY) + 6} y={py(parP) - 5} fontSize="7.5" fill="#064E3B">Par (y=5%)</text>

      {/* convexity annotation */}
      <text x={yx(0.03)} y={py(130)} fontSize="7.5" fill="#10B981" fontWeight="600">Convexity:</text>
      <text x={yx(0.03)} y={py(125)} fontSize="7.5" fill="#10B981">curve bows above tangent</text>
    </svg>
  )
}

function SharpeCMLViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b
  const sx = (x: number) => pad.l + x * pw
  const sy = (y: number) => pad.t + (1 - y) * ph

  const rf = 0.02
  // Two portfolios on the frontier
  const portfolios = [
    { sigma: 0.10, mu: 0.08, label: "A" },
    { sigma: 0.18, mu: 0.13, label: "B (tangency)" },
    { sigma: 0.26, mu: 0.16, label: "C" },
  ]
  const tangency = portfolios[1]
  const maxS = 0.35, maxMu = 0.25

  const bx = (s: number) => sx(s / maxS)
  const ry = (m: number) => sy(m / maxMu)

  // CML
  const slope = (tangency.mu - rf) / tangency.sigma
  const cmlY = (s: number) => rf + slope * s

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[0.25, 0.5, 0.75].map(v => (
        <line key={v} x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#ECFDF5" strokeWidth="1" />
      ))}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Risk (σ)</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Return (μ)</text>

      {/* CML */}
      <line x1={bx(0)} y1={ry(rf)} x2={bx(maxS)} y2={ry(cmlY(maxS))}
        stroke="#F59E0B" strokeWidth="2" />
      <text x={bx(0.30)} y={ry(cmlY(0.30)) - 6} fontSize="8" fill="#F59E0B" fontWeight="700">CML (slope = Sharpe)</text>

      {/* portfolio points */}
      {portfolios.map((p, i) => (
        <g key={i}>
          <circle cx={bx(p.sigma)} cy={ry(p.mu)} r={5}
            fill={i === 1 ? "#F59E0B" : "#064E3B"} opacity="0.85" />
          <text x={bx(p.sigma) + 7} y={ry(p.mu) + 4} fontSize="8" fill={i === 1 ? "#F59E0B" : "#064E3B"}
            fontWeight={i === 1 ? "700" : "400"}>{p.label}</text>
        </g>
      ))}

      {/* Sharpe triangle at tangency */}
      <line x1={bx(0)} y1={ry(rf)} x2={bx(tangency.sigma)} y2={ry(rf)} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2,2" />
      <line x1={bx(tangency.sigma)} y1={ry(rf)} x2={bx(tangency.sigma)} y2={ry(tangency.mu)} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2,2" />
      <text x={bx(tangency.sigma / 2)} y={ry(rf) + 12} fontSize="7" fill="#6B7280" textAnchor="middle">σ</text>
      <text x={bx(tangency.sigma) + 4} y={(ry(rf) + ry(tangency.mu)) / 2} fontSize="7" fill="#6B7280">μ - r_f</text>

      {/* rf */}
      <circle cx={bx(0)} cy={ry(rf)} r={3} fill="#9CA3AF" />
      <text x={bx(0) + 5} y={ry(rf) + 4} fontSize="7" fill="#6B7280">r_f</text>
    </svg>
  )
}

function GreeksDeltaViz() {
  const W = 320, H = 210
  const pad = { l: 36, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const K = 100, sigma = 0.2, T = 0.5, r = 0.03
  const sMin = 60, sMax = 150

  // Black-Scholes delta approximation using erf
  const erf = (x: number): number => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const t2 = 1 / (1 + p * Math.abs(x))
    const y2 = 1 - ((((a5 * t2 + a4) * t2 + a3) * t2 + a2) * t2 + a1) * t2 * Math.exp(-x * x)
    return sign * y2
  }
  const N = (x: number) => 0.5 * (1 + erf(x / Math.sqrt(2)))
  const callDelta = (s: number) => {
    const d1 = (Math.log(s / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
    return N(d1)
  }
  const putDelta = (s: number) => callDelta(s) - 1

  const sx = (s: number) => pad.l + ((s - sMin) / (sMax - sMin)) * pw
  const dy = (d: number) => pad.t + (1 - (d + 1) / 2) * ph  // map [-1,1] to height

  const callPts: string[] = [], putPts: string[] = []
  for (let s = sMin; s <= sMax; s += 1) {
    callPts.push(`${sx(s)},${dy(callDelta(s))}`)
    putPts.push(`${sx(s)},${dy(putDelta(s))}`)
  }

  const zeroY = dy(0)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[-1, -0.5, 0, 0.5, 1].map(d => (
        <line key={d} x1={pad.l} y1={dy(d)} x2={W - pad.r} y2={dy(d)}
          stroke={d === 0 ? "#D1FAE5" : "#ECFDF5"} strokeWidth={d === 0 ? 1.5 : 1} />
      ))}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Underlying Price</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Delta</text>

      {/* delta labels */}
      {[1, 0.5, 0, -0.5, -1].map(d => (
        <text key={d} x={pad.l - 4} y={dy(d) + 3} fontSize="7" fill="#9CA3AF" textAnchor="end">{d}</text>
      ))}

      {/* strike */}
      <line x1={sx(K)} y1={pad.t} x2={sx(K)} y2={H - pad.b} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,2" />
      <text x={sx(K)} y={H - pad.b + 10} fontSize="7.5" fill="#9CA3AF" textAnchor="middle">K</text>

      <polyline points={putPts.join(" ")} fill="none" stroke="#818CF8" strokeWidth="2" />
      <polyline points={callPts.join(" ")} fill="none" stroke="#10B981" strokeWidth="2" />

      <text x={sx(sMax) - 4} y={dy(callDelta(sMax)) - 5} fontSize="8" fill="#10B981" fontWeight="700" textAnchor="end">Call Δ</text>
      <text x={sx(sMin) + 4} y={dy(putDelta(sMin)) + 12} fontSize="8" fill="#818CF8" fontWeight="700">Put Δ</text>
    </svg>
  )
}

function BrinsonAttributionViz() {
  const W = 320, H = 210
  const pad = { l: 100, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const items = [
    { label: "Allocation", value: 0.8, col: "#10B981" },
    { label: "Selection", value: 1.4, col: "#3B82F6" },
    { label: "Interaction", value: -0.3, col: "#F87171" },
    { label: "Total Active", value: 1.9, col: "#064E3B" },
  ]
  const maxVal = 2.2
  const barH = 28, gap = 10
  const zeroX = pad.l
  const bx = (v: number) => zeroX + (v / maxVal) * pw

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* zero line */}
      <line x1={zeroX} y1={pad.t} x2={zeroX} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Contribution (bps)</text>

      {/* bars */}
      {items.map((item, i) => {
        const y = pad.t + i * (barH + gap)
        const w = (Math.abs(item.value) / maxVal) * pw
        const x = item.value >= 0 ? zeroX : zeroX - w
        const isTot = i === items.length - 1
        return (
          <g key={i}>
            {isTot && <line x1={pad.l - 90} y1={y - 4} x2={W - pad.r} y2={y - 4} stroke="#ECFDF5" strokeWidth="1" />}
            <rect x={x} y={y} width={w} height={barH}
              fill={item.col} opacity={isTot ? 1 : 0.75} rx="3" />
            <text x={pad.l - 6} y={y + barH / 2 + 4} fontSize="8.5" fill="#374151" textAnchor="end"
              fontWeight={isTot ? "700" : "400"}>{item.label}</text>
            <text x={x + (item.value >= 0 ? w + 4 : -4)} y={y + barH / 2 + 4}
              fontSize="8.5" fill={item.col} fontWeight="700"
              textAnchor={item.value >= 0 ? "start" : "end"}>
              {item.value > 0 ? "+" : ""}{(item.value * 100).toFixed(0)}bps
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function GBMPathsViz() {
  const W = 320, H = 210
  const pad = { l: 44, r: 16, t: 16, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  // Deterministic GBM paths using seeded pseudo-random
  const seed = (s: number) => { let x = s; return () => { x = (x * 1664525 + 1013904223) & 0xffffffff; return (x >>> 0) / 0xffffffff } }
  const paths: [number, number][][] = []
  const S0 = 100, mu = 0.10, sigma = 0.25, T = 1, steps = 50
  const dt = T / steps
  const colors = ["#10B981", "#3B82F6", "#F59E0B", "#818CF8", "#EF4444"]

  for (let p = 0; p < 5; p++) {
    const rand = seed(p * 137 + 42)
    const path: [number, number][] = [[0, S0]]
    let S = S0
    for (let i = 1; i <= steps; i++) {
      const u1 = rand(), u2 = rand()
      const z = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-10))) * Math.cos(2 * Math.PI * u2)
      S = S * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z)
      path.push([i / steps, S])
    }
    paths.push(path)
  }

  const allS = paths.flatMap(p => p.map(([, s]) => s))
  const sMin = Math.min(...allS) * 0.95, sMax = Math.max(...allS) * 1.05
  const tx = (t: number) => pad.l + t * pw
  const sy = (s: number) => pad.t + (1 - (s - sMin) / (sMax - sMin)) * ph

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      <line x1={pad.l} y1={sy(S0)} x2={W - pad.r} y2={sy(S0)} stroke="#ECFDF5" strokeWidth="1" strokeDasharray="3,2" />
      <text x={pad.l - 4} y={sy(S0) + 3} fontSize="7" fill="#9CA3AF" textAnchor="end">S₀</text>
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Time</text>
      <text x={10} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" transform={`rotate(-90,10,${H / 2})`}>Asset Price</text>

      {/* paths */}
      {paths.map((path, i) => (
        <polyline key={i}
          points={path.map(([t, s]) => `${tx(t)},${sy(s)}`).join(" ")}
          fill="none" stroke={colors[i]} strokeWidth="1.5" opacity="0.8"
        />
      ))}

      <text x={W - pad.r} y={pad.t + 10} fontSize="7.5" fill="#6B7280" textAnchor="end">
        μ={mu}, σ={sigma}
      </text>
    </svg>
  )
}

function FactorReturnsViz() {
  const W = 320, H = 210
  const pad = { l: 76, r: 24, t: 20, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const factors = [
    { name: "Mkt-RF", annualised: 6.2, col: "#10B981" },
    { name: "SMB", annualised: 2.1, col: "#3B82F6" },
    { name: "HML", annualised: 3.5, col: "#F59E0B" },
    { name: "MOM", annualised: 7.8, col: "#818CF8" },
    { name: "QMJ", annualised: 4.3, col: "#34D399" },
  ]
  const maxVal = 10
  const barH = 24, gap = 8
  const zeroX = pad.l
  const bw = (v: number) => (v / maxVal) * pw

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <line x1={zeroX} y1={pad.t} x2={zeroX} y2={H - pad.b} stroke="#D1FAE5" strokeWidth="1.5" />
      {[2, 4, 6, 8].map(v => (
        <line key={v} x1={zeroX + bw(v)} y1={pad.t} x2={zeroX + bw(v)} y2={H - pad.b}
          stroke="#ECFDF5" strokeWidth="1" />
      ))}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#9CA3AF">Annualised Return (%)</text>

      {factors.map((f, i) => {
        const y = pad.t + i * (barH + gap)
        return (
          <g key={i}>
            <rect x={zeroX} y={y} width={bw(f.annualised)} height={barH}
              fill={f.col} opacity="0.8" rx="3" />
            <text x={zeroX - 6} y={y + barH / 2 + 4} fontSize="9" fill="#374151" textAnchor="end" fontWeight="600">
              {f.name}
            </text>
            <text x={zeroX + bw(f.annualised) + 5} y={y + barH / 2 + 4} fontSize="8" fill={f.col} fontWeight="700">
              {f.annualised}%
            </text>
          </g>
        )
      })}

      <text x={zeroX + 4} y={pad.t - 6} fontSize="7.5" fill="#6B7280">Fama-French factor premia (illustrative)</text>
    </svg>
  )
}

function PromptExampleBlock({ example }: { example: PromptExample }) {
  const lines = example.prompt.split("\n")

  const getLineStyle = (line: string): { label: string | null; color: string; labelColor: string; bgColor: string } => {
    if (line.startsWith("System:")) return { label: "SYS", color: "#C4B5FD", labelColor: "#7C3AED", bgColor: "rgba(124,58,237,0.08)" }
    if (line.startsWith("User:")) return { label: "USR", color: "#93C5FD", labelColor: "#2563EB", bgColor: "rgba(37,99,235,0.08)" }
    if (line.startsWith("Thought:")) return { label: "THK", color: "#FCD34D", labelColor: "#D97706", bgColor: "rgba(217,119,6,0.08)" }
    if (line.startsWith("Action:")) return { label: "ACT", color: "#6EE7B7", labelColor: "#059669", bgColor: "rgba(5,150,105,0.08)" }
    if (line.startsWith("Observation:")) return { label: "OBS", color: "#F9A8D4", labelColor: "#DB2777", bgColor: "rgba(219,39,119,0.08)" }
    return { label: null, color: "#9CA3AF", labelColor: "", bgColor: "transparent" }
  }

  const responseLines = example.response ? example.response.split("\n") : []

  return (
    <div className="rounded-xl overflow-hidden border border-[#1E293B] text-[9.5pt] font-mono">
      {/* header bar */}
      <div className="bg-[#0F172A] flex items-center justify-between px-4 py-2 border-b border-[#1E293B]">
        <span className="text-[#64748B] text-[8.5pt] tracking-wider uppercase">prompt</span>
        <span className="text-violet-400 text-[8.5pt] font-semibold">{example.label}</span>
      </div>

      {/* prompt lines */}
      <div className="bg-[#0F172A] px-4 py-3 space-y-0.5">
        {lines.map((line, i) => {
          const { label, color, labelColor, bgColor } = getLineStyle(line)
          const rest = label ? line.slice(line.indexOf(":") + 1).trim() : line
          return (
            <div
              key={i}
              className="flex gap-2 items-start rounded px-1.5 py-0.5"
              style={{ backgroundColor: bgColor !== "transparent" ? bgColor : undefined }}
            >
              {label ? (
                <span
                  className="shrink-0 text-[7.5pt] font-bold px-1 py-0 rounded mt-0.5 leading-tight"
                  style={{ color: labelColor, backgroundColor: `${labelColor}22` }}
                >
                  {label}
                </span>
              ) : (
                <span className="shrink-0 w-[26px]" />
              )}
              <span className="leading-relaxed whitespace-pre-wrap" style={{ color: label ? color : "#6B7280" }}>
                {label ? rest : line}
              </span>
            </div>
          )
        })}
      </div>

      {/* response */}
      {example.response && (
        <>
          <div className="bg-[#0F172A] border-t border-dashed border-[#1E293B] flex items-center gap-2 px-4 py-1.5">
            <span className="text-[#64748B] text-[8.5pt] tracking-wider uppercase">model response</span>
          </div>
          <div className="bg-[#071A12] px-4 py-3">
            {responseLines.map((line, i) => (
              <div key={i} className="leading-relaxed" style={{ color: line.startsWith("⚠️") ? "#FCA5A5" : line.startsWith("✅") ? "#6EE7B7" : "#34D399" }}>
                {line || "\u00A0"}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function EquityMultiplesViz() {
  const W = 320, H = 200
  const pad = { l: 80, r: 24, t: 20, b: 36 }
  const pw = W - pad.l - pad.r
  const ph = H - pad.t - pad.b

  const multiples = [
    { sector: "Software", pe: 32, col: "#6366F1" },
    { sector: "Pharma", pe: 22, col: "#10B981" },
    { sector: "Consumer", pe: 18, col: "#F59E0B" },
    { sector: "Industrials", pe: 15, col: "#3B82F6" },
    { sector: "Utilities", pe: 13, col: "#EC4899" },
    { sector: "Banks", pe: 10, col: "#8B5CF6" },
  ]
  const maxPE = 40
  const barH = 20, gap = 6

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto">
      {multiples.map((m, i) => {
        const y = pad.t + i * (barH + gap)
        const bw = (m.pe / maxPE) * pw
        return (
          <g key={m.sector}>
            <text x={pad.l - 6} y={y + barH / 2 + 3} fontSize="8" textAnchor="end" fill="#374151">{m.sector}</text>
            <rect x={pad.l} y={y} width={bw} height={barH} rx="3" fill={m.col} fillOpacity={0.8} />
            <text x={pad.l + bw + 4} y={y + barH / 2 + 3} fontSize="8" fill="#374151">{m.pe}×</text>
          </g>
        )
      })}
      <text x={pad.l} y={H - 8} fontSize="7.5" fill="#6B7280">Forward P/E by sector (illustrative)</text>
    </svg>
  )
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-[#D1FAE5] rounded-2xl">
      <div className="text-4xl mb-4">📝</div>
      <p className="text-[#064E3B] text-sm font-semibold">{title}</p>
      <p className="text-[#9CA3AF] text-xs mt-1">Use Claude Code to generate content for this entry.</p>
    </div>
  )
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#D1FAE5] px-6 py-5 space-y-3 shadow-sm">
      <div className="flex items-center gap-2 pb-2 border-b border-[#ECFDF5]">
        {icon}
        <h2 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
