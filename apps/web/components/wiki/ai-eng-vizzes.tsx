// ─── AI Engineering Visualizations ───────────────────────────────────────────
// One SVG component per AI Engineering wiki entry.
// All components are pure SVG — no external dependencies.

const G = "#10B981"   // primary green
const DG = "#064E3B"  // dark green
const LG = "#D1FAE5"  // light green border
const BG = "#F0FDF9"  // light green fill
const GR = "#9CA3AF"  // grey label
const TX = "#1F2937"  // text

// ── Shared helpers ────────────────────────────────────────────────────────────
function Box({ x, y, w, h, fill = BG, stroke = LG, r = 8, children }: {
  x: number; y: number; w: number; h: number
  fill?: string; stroke?: string; r?: number; children?: React.ReactNode
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="1.5" />
      {children}
    </g>
  )
}

function Label({ x, y, text, size = 9, color = TX, bold = false, anchor = "middle" as "middle" | "start" | "end" }: {
  x: number; y: number; text: string; size?: number; color?: string; bold?: boolean; anchor?: "middle" | "start" | "end"
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color}
      fontWeight={bold ? "700" : "400"} fontFamily="system-ui, sans-serif">
      {text}
    </text>
  )
}

function Arrow({ x1, y1, x2, y2, color = G }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len, uy = dy / len
  const ax = x2 - ux * 8, ay = y2 - uy * 8
  return (
    <g>
      <line x1={x1} y1={y1} x2={ax} y2={ay} stroke={color} strokeWidth="1.5" />
      <polygon points={`${x2},${y2} ${ax - uy * 4},${ay + ux * 4} ${ax + uy * 4},${ay - ux * 4}`} fill={color} />
    </g>
  )
}

// ── 8-1: Agent Loop ───────────────────────────────────────────────────────────
export function AgentLoopViz() {
  const cx = 160, cy = 120, r = 75
  const nodes = [
    { label: "Observe", angle: -90 },
    { label: "Think", angle: 30 },
    { label: "Act", angle: 150 },
  ]
  const pts = nodes.map(n => ({
    label: n.label,
    x: cx + r * Math.cos((n.angle * Math.PI) / 180),
    y: cy + r * Math.sin((n.angle * Math.PI) / 180),
  }))

  return (
    <svg viewBox="0 0 320 240" className="w-full">
      {/* Central label */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={10} fill={GR} fontFamily="system-ui">Agent Loop</text>
      {/* Arrows between nodes */}
      {pts.map((p, i) => {
        const q = pts[(i + 1) % pts.length]
        const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2
        const nx = cx - mx, ny = cy - my
        const nl = Math.sqrt(nx * nx + ny * ny)
        const ox = -ny / nl * 18, oy = nx / nl * 18
        return <Arrow key={i} x1={p.x + ox} y1={p.y + oy} x2={q.x + ox} y2={q.y + oy} />
      })}
      {/* Nodes */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={26} fill={BG} stroke={G} strokeWidth="2" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={10} fontWeight="700"
            fill={DG} fontFamily="system-ui">{p.label}</text>
        </g>
      ))}
      {/* Tool box */}
      <rect x={cx - 38} y={cy + 90} width={76} height={26} rx={6} fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
      <text x={cx} y={cy + 107} textAnchor="middle" fontSize={9} fill="#92400E" fontFamily="system-ui" fontWeight="600">External Tool</text>
      <Arrow x1={pts[2].x} y1={pts[2].y + 26} x2={cx - 20} y2={cy + 90} color="#F59E0B" />
      <Arrow x1={cx + 20} y1={cy + 90} x2={pts[0].x + 10} y2={pts[0].y + 22} color="#F59E0B" />
      {/* Termination */}
      <rect x={cx + 100} y={cy - 16} width={62} height={26} rx={6} fill="#FEE2E2" stroke="#FECACA" strokeWidth="1.5" />
      <text x={cx + 131} y={cy - 3} textAnchor="middle" fontSize={9} fill="#991B1B" fontFamily="system-ui">Done / Max</text>
      <text x={cx + 131} y={cy + 9} textAnchor="middle" fontSize={9} fill="#991B1B" fontFamily="system-ui">Steps</text>
      <line x1={pts[1].x + 22} y1={pts[1].y} x2={cx + 100} y2={cy} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  )
}

// ── 8-1: Tool Use ─────────────────────────────────────────────────────────────
export function ToolUseViz() {
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      {/* LLM */}
      <Box x={10} y={80} w={80} h={40} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={50} y={105} text="LLM" size={11} color="#5B21B6" bold />
      </Box>
      {/* Tool Call */}
      <Box x={120} y={60} w={80} h={40} fill={BG} stroke={LG}>
        <Label x={160} y={78} text="tool_call" size={8} color={GR} />
        <Label x={160} y={92} text='{ name, args }' size={8} color={DG} bold />
      </Box>
      {/* Executor */}
      <Box x={120} y={120} w={80} h={40}>
        <Label x={160} y={144} text="Executor" size={10} color={DG} bold />
      </Box>
      {/* External API */}
      <Box x={230} y={80} w={80} h={80} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={270} y={112} text="External" size={9} color="#92400E" />
        <Label x={270} y={126} text="API / Tool" size={9} color="#92400E" bold />
      </Box>
      {/* Arrows */}
      <Arrow x1={90} y1={93} x2={120} y2={80} />
      <Arrow x1={200} y1={80} x2={230} y2={100} color="#F59E0B" />
      <Arrow x1={230} y1={140} x2={200} y2={140} color="#F59E0B" />
      <Arrow x1={120} y1={140} x2={90} y2={107} />
      <line x1={160} y1={100} x2={160} y2={120} stroke={G} strokeWidth="1.5" />
      {/* Labels */}
      <Label x={105} y={73} text="generates" size={8} color={GR} />
      <Label x={215} y={94} text="call" size={8} color={GR} />
      <Label x={215} y={148} text="result" size={8} color={GR} />
      <Label x={105} y={120} text="returns" size={8} color={GR} />
    </svg>
  )
}

// ── 8-1: Function Calling ─────────────────────────────────────────────────────
export function FunctionCallingViz() {
  const steps = [
    { label: "Define Schema", sub: "JSON Schema", color: "#EDE9FE", stroke: "#C4B5FD", tc: "#5B21B6" },
    { label: "LLM Decision", sub: "call or respond?", color: BG, stroke: LG, tc: DG },
    { label: "Parse Args", sub: "validate & type", color: "#ECFDF5", stroke: LG, tc: DG },
    { label: "Execute Fn", sub: "run local code", color: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E" },
  ]
  return (
    <svg viewBox="0 0 320 110" className="w-full">
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={i * 78 + 4} y={30} width={72} height={50} rx={7}
            fill={s.color} stroke={s.stroke} strokeWidth="1.5" />
          <text x={i * 78 + 40} y={51} textAnchor="middle" fontSize={9}
            fontWeight="700" fill={s.tc} fontFamily="system-ui">{s.label}</text>
          <text x={i * 78 + 40} y={65} textAnchor="middle" fontSize={8}
            fill={GR} fontFamily="system-ui">{s.sub}</text>
          {i < steps.length - 1 && (
            <Arrow x1={i * 78 + 76} y1={55} x2={i * 78 + 82} y2={55} />
          )}
        </g>
      ))}
      <Label x={160} y={22} text="Function Calling Flow" size={9} color={GR} />
    </svg>
  )
}

// ── 8-1: ReAct Pattern ────────────────────────────────────────────────────────
export function ReActViz() {
  const rows = [
    { label: "Thought", color: "#EDE9FE", tc: "#5B21B6", ex: "I need to look up X" },
    { label: "Action", color: BG, tc: DG, ex: "search(\"X\")" },
    { label: "Observation", color: "#FEF3C7", tc: "#92400E", ex: "Result: ..." },
  ]
  return (
    <svg viewBox="0 0 320 220" className="w-full">
      <Label x={160} y={18} text="ReAct Loop (repeats until answer)" size={9} color={GR} />
      {/* Question box */}
      <Box x={90} y={24} w={140} h={28} fill="#F1F5F9" stroke="#CBD5E1">
        <Label x={160} y={42} text="Question / Task" size={9} color="#475569" bold />
      </Box>
      <Arrow x1={160} y1={52} x2={160} y2={64} />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={20} y={64 + i * 44} width={100} height={32} rx={7}
            fill={r.color} stroke="#E2E8F0" strokeWidth="1.5" />
          <text x={70} y={82 + i * 44} textAnchor="middle" fontSize={9}
            fontWeight="700" fill={r.tc} fontFamily="system-ui">{r.label}</text>
          <rect x={130} y={68 + i * 44} width={168} height={24} rx={5}
            fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x={214} y={83 + i * 44} textAnchor="middle" fontSize={8}
            fill="#64748B" fontFamily="system-ui, monospace">{r.ex}</text>
          {i < rows.length - 1 && <Arrow x1={70} y1={96 + i * 44} x2={70} y2={108 + i * 44} />}
        </g>
      ))}
      {/* Loop back arrow */}
      <path d="M 20 188 Q 0 140 20 96" fill="none" stroke={G} strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="20,96 12,104 28,104" fill={G} />
      <Label x={4} y={148} text="loop" size={8} color={G} />
      {/* Answer */}
      <Arrow x1={70} y1={196} x2={70} y2={208} />
      <Box x={20} y={208} w={100} h={26} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={70} y={225} text="Final Answer" size={9} color="#166534" bold />
      </Box>
    </svg>
  )
}

// ── 8-1: Plan-and-Execute ─────────────────────────────────────────────────────
export function PlanExecuteViz() {
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      {/* Planner */}
      <Box x={100} y={10} w={120} h={36} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={160} y={24} text="Planner LLM" size={10} color="#5B21B6" bold />
        <Label x={160} y={38} text="creates step list" size={8} color={GR} />
      </Box>
      {/* Steps */}
      {["Step 1", "Step 2", "Step 3"].map((s, i) => (
        <g key={i}>
          <Arrow x1={160} y1={i === 0 ? 46 : 90 + (i - 1) * 44} x2={160} y2={90 + (i - 1) * 44 + (i === 0 ? 0 : 0)} />
          <Box x={90} y={60 + i * 44} w={100} h={28} fill={BG} stroke={LG}>
            <Label x={140} y={76 + i * 44} text={s} size={9} color={DG} bold />
          </Box>
          {/* Executor */}
          <Box x={220} y={60 + i * 44} w={80} h={28} fill="#FEF3C7" stroke="#FDE68A">
            <Label x={260} y={76 + i * 44} text="Executor" size={9} color="#92400E" bold />
          </Box>
          <Arrow x1={190} y1={74 + i * 44} x2={220} y2={74 + i * 44} color="#F59E0B" />
        </g>
      ))}
      <Arrow x1={160} y1={46} x2={160} y2={60} />
      <Arrow x1={160} y1={88} x2={160} y2={104} />
      <Arrow x1={160} y1={132} x2={160} y2={148} />
      {/* Synthesizer */}
      <Box x={90} y={160} w={100} h={30} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={140} y={179} text="Synthesize Answer" size={9} color="#166534" bold />
      </Box>
    </svg>
  )
}

// ── 8-2: Short-term Memory ────────────────────────────────────────────────────
export function ShortTermMemoryViz() {
  const segments = [
    { label: "System Prompt", pct: 0.15, fill: "#EDE9FE", tc: "#5B21B6" },
    { label: "History", pct: 0.40, fill: BG, tc: DG },
    { label: "Retrieved", pct: 0.25, fill: "#FEF3C7", tc: "#92400E" },
    { label: "User Query", pct: 0.20, fill: "#FEE2E2", tc: "#991B1B" },
  ]
  const W = 290, x0 = 15, y0 = 60, h = 44
  let cx = x0
  return (
    <svg viewBox="0 0 320 170" className="w-full">
      <defs>
        <clipPath id="ctx-clip">
          <rect x={x0} y={y0} width={W} height={h} rx={6} />
        </clipPath>
      </defs>
      <Label x={160} y={20} text="Context Window (Token Budget)" size={9} color={GR} />
      <Label x={160} y={36} text="← 128k tokens →" size={9} color={G} bold />
      {/* Window border */}
      <rect x={x0 - 2} y={y0 - 2} width={W + 4} height={h + 4} rx={8}
        fill="none" stroke={G} strokeWidth="2" />
      {segments.map((s, i) => {
        const sw = W * s.pct
        const seg = (
          <g key={i} clipPath="url(#ctx-clip)">
            <rect x={cx} y={y0} width={sw} height={h} fill={s.fill} />
            {sw > 40 && (
              <text x={cx + sw / 2} y={y0 + h / 2 + 4} textAnchor="middle"
                fontSize={8} fontWeight="700" fill={s.tc} fontFamily="system-ui">{s.label}</text>
            )}
          </g>
        )
        cx += sw
        return seg
      })}
      {/* Legend */}
      {segments.map((s, i) => (
        <g key={i}>
          <rect x={15 + i * 72} y={122} width={10} height={10} rx={2} fill={s.fill} stroke="#E2E8F0" />
          <text x={28 + i * 72} y={132} fontSize={8} fill={GR} fontFamily="system-ui">{s.label}</text>
        </g>
      ))}
      {/* Overflow warning */}
      <Label x={160} y={158} text="⚠ Overflow → summarize or truncate oldest history" size={8} color="#EF4444" />
    </svg>
  )
}

// ── 8-2: Long-term Memory ─────────────────────────────────────────────────────
export function LongTermMemoryViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      {/* Agent */}
      <Box x={110} y={10} w={100} h={32} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={160} y={30} text="Agent / LLM" size={10} color="#5B21B6" bold />
      </Box>
      {/* Write path */}
      <Arrow x1={130} y1={42} x2={80} y2={80} color={G} />
      <Label x={80} y={70} text="write" size={8} color={G} />
      {/* Read path */}
      <Arrow x1={80} y1={120} x2={130} y2={42} color="#F59E0B" />
      <Label x={50} y={118} text="retrieve" size={8} color="#F59E0B" />
      {/* Vector Store */}
      <Box x={20} y={80} w={110} h={50} fill={BG} stroke={LG}>
        <Label x={75} y={100} text="Vector Store" size={10} color={DG} bold />
        <Label x={75} y={115} text="embed + index" size={8} color={GR} />
      </Box>
      {/* Query path */}
      <Arrow x1={190} y1={42} x2={240} y2={80} color="#6366F1" />
      <Label x={220} y={70} text="query" size={8} color="#6366F1" />
      {/* External / Episodic DB */}
      <Box x={200} y={80} w={110} h={50} fill="#F5F3FF" stroke="#DDD6FE">
        <Label x={255} y={100} text="Episodic DB" size={10} color="#5B21B6" bold />
        <Label x={255} y={115} text="events / logs" size={8} color={GR} />
      </Box>
      <Arrow x1={240} y1={130} x2={190} y2={42} color="#6366F1" />
      {/* Separator */}
      <line x1={15} y1={155} x2={305} y2={155} stroke={LG} strokeWidth="1" />
      <Label x={160} y={170} text="persists across sessions — survives context resets" size={8} color={GR} />
    </svg>
  )
}

// ── 8-2: Episodic vs Semantic ─────────────────────────────────────────────────
export function EpisodicSemanticViz() {
  const rows = ["What", "Storage", "Example", "Retrieval", "Use case"]
  const episodic = ["Events & interactions", "Vector DB / log", "User asked X on Mon", "By time / recency", "Personalisation"]
  const semantic = ["Facts & knowledge", "Knowledge graph / DB", "Paris is capital of FR", "By similarity", "Grounding / QA"]
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      {/* Headers */}
      <rect x={10} y={10} width={140} height={24} rx={6} fill="#EDE9FE" stroke="#C4B5FD" />
      <Label x={80} y={26} text="Episodic Memory" size={9} color="#5B21B6" bold />
      <rect x={165} y={10} width={145} height={24} rx={6} fill={BG} stroke={LG} />
      <Label x={237} y={26} text="Semantic Memory" size={9} color={DG} bold />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={10} y={40 + i * 30} width={140} height={26} rx={4}
            fill={i % 2 === 0 ? "#F5F3FF" : "white"} stroke="#E2E8F0" />
          <text x={80} y={57 + i * 30} textAnchor="middle" fontSize={8}
            fill="#5B21B6" fontFamily="system-ui">{episodic[i]}</text>
          <rect x={165} y={40 + i * 30} width={145} height={26} rx={4}
            fill={i % 2 === 0 ? BG : "white"} stroke="#E2E8F0" />
          <text x={237} y={57 + i * 30} textAnchor="middle" fontSize={8}
            fill={DG} fontFamily="system-ui">{semantic[i]}</text>
          <text x={155} y={57 + i * 30} textAnchor="middle" fontSize={8}
            fill={GR} fontFamily="system-ui">{r}</text>
        </g>
      ))}
    </svg>
  )
}

// ── 8-2: Memory Architectures ─────────────────────────────────────────────────
export function MemoryArchitecturesViz() {
  const layers = [
    { label: "In-Context (Scratchpad)", sub: "fast, token-limited", fill: "#EDE9FE", stroke: "#C4B5FD", tc: "#5B21B6" },
    { label: "External Retrieval", sub: "vector store / KV cache", fill: BG, stroke: LG, tc: DG },
    { label: "Parametric (Weights)", sub: "frozen training knowledge", fill: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E" },
  ]
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={18} text="Memory Hierarchy" size={9} color={GR} />
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={30 + i * 10} y={30 + i * 50} width={260 - i * 20} height={40} rx={8}
            fill={l.fill} stroke={l.stroke} strokeWidth="2" />
          <text x={160} y={52 + i * 50} textAnchor="middle" fontSize={10}
            fontWeight="700" fill={l.tc} fontFamily="system-ui">{l.label}</text>
          <text x={160} y={65 + i * 50} textAnchor="middle" fontSize={8}
            fill={GR} fontFamily="system-ui">{l.sub}</text>
        </g>
      ))}
      <Label x={160} y={180} text="← fast / expensive          slow / cheap →" size={8} color={GR} />
    </svg>
  )
}

// ── 8-3: LangChain ────────────────────────────────────────────────────────────
export function LangChainViz() {
  const chain = ["Prompt\nTemplate", "LLM", "Output\nParser", "Memory /\nChain"]
  const colors = ["#EDE9FE", BG, "#FEF3C7", "#FEE2E2"]
  const strokes = ["#C4B5FD", LG, "#FDE68A", "#FECACA"]
  const tcs = ["#5B21B6", DG, "#92400E", "#991B1B"]
  return (
    <svg viewBox="0 0 320 120" className="w-full">
      <Label x={160} y={18} text="LCEL Chain: prompt | llm | parser" size={9} color={GR} />
      {chain.map((c, i) => (
        <g key={i}>
          <rect x={10 + i * 76} y={30} width={68} height={52} rx={8}
            fill={colors[i]} stroke={strokes[i]} strokeWidth="1.5" />
          {c.split("\n").map((line, j) => (
            <text key={j} x={44 + i * 76} y={52 + i * 0 + j * 14} textAnchor="middle"
              fontSize={9} fontWeight="700" fill={tcs[i]} fontFamily="system-ui">{line}</text>
          ))}
          {i < chain.length - 1 && <Arrow x1={78 + i * 76} y1={56} x2={84 + i * 76} y2={56} />}
        </g>
      ))}
      <Label x={160} y={102} text="| pipe operator composes steps into a runnable" size={8} color={GR} />
    </svg>
  )
}

// ── 8-3: LlamaIndex ───────────────────────────────────────────────────────────
export function LlamaIndexViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      {/* Ingest */}
      <Label x={80} y={18} text="Index Phase" size={9} color={GR} />
      {["Load Docs", "Transform", "Embed", "Store Index"].map((s, i) => (
        <g key={i}>
          <Box x={10 + i * 72} y={26} w={62} h={28} fill={BG} stroke={LG}>
            <Label x={41 + i * 72} y={44} text={s} size={8} color={DG} bold />
          </Box>
          {i < 3 && <Arrow x1={72 + i * 72} y1={40} x2={78 + i * 72} y2={40} />}
        </g>
      ))}
      {/* Divider */}
      <line x1={15} y1={70} x2={305} y2={70} stroke={LG} strokeWidth="1" strokeDasharray="4 3" />
      {/* Query */}
      <Label x={80} y={88} text="Query Phase" size={9} color={GR} />
      {["User Query", "Retrieve", "Rerank", "Synthesize", "Response"].map((s, i) => (
        <g key={i}>
          <Box x={8 + i * 60} y={96} w={54} h={28} fill={i === 4 ? "#DCFCE7" : BG} stroke={i === 4 ? "#86EFAC" : LG}>
            <Label x={35 + i * 60} y={114} text={s} size={8} color={i === 4 ? "#166534" : DG} bold />
          </Box>
          {i < 4 && <Arrow x1={62 + i * 60} y1={110} x2={66 + i * 60} y2={110} />}
        </g>
      ))}
      <Label x={160} y={152} text="QueryEngine = retriever + node_postprocessors + response_synthesizer" size={7} color={GR} />
    </svg>
  )
}

// ── 8-3: CrewAI ───────────────────────────────────────────────────────────────
export function CrewAIViz() {
  const agents = [
    { label: "Researcher", role: "gathers info", x: 60, y: 60 },
    { label: "Analyst", role: "processes data", x: 190, y: 60 },
    { label: "Writer", role: "produces output", x: 125, y: 150 },
  ]
  return (
    <svg viewBox="0 0 320 210" className="w-full">
      <Label x={160} y={18} text="CrewAI — Role-based Multi-Agent" size={9} color={GR} />
      {/* Manager */}
      <Box x={110} y={24} w={100} h={28} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={160} y={42} text="Manager / Crew" size={9} color="#92400E" bold />
      </Box>
      {agents.map((a, i) => (
        <g key={i}>
          <Arrow x1={160} y1={52} x2={a.x} y2={a.y} color="#F59E0B" />
          <circle cx={a.x} cy={a.y + 20} r={28} fill={BG} stroke={G} strokeWidth="2" />
          <text x={a.x} y={a.y + 17} textAnchor="middle" fontSize={9} fontWeight="700" fill={DG} fontFamily="system-ui">{a.label}</text>
          <text x={a.x} y={a.y + 30} textAnchor="middle" fontSize={7} fill={GR} fontFamily="system-ui">{a.role}</text>
        </g>
      ))}
      {/* Task flow */}
      <Arrow x1={88} y1={80} x2={162} y2={80} />
      <Arrow x1={190} y1={90} x2={153} y2={150} />
      {/* Output */}
      <Box x={95} y={188} w={130} h={26} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={160} y={205} text="Final Output" size={9} color="#166534" bold />
      </Box>
      <Arrow x1={160} y1={178} x2={160} y2={188} />
    </svg>
  )
}

// ── 8-3: AutoGen ──────────────────────────────────────────────────────────────
export function AutoGenViz() {
  const msgs = [
    { from: "UserProxy", to: "Assistant", label: "task", y: 60 },
    { from: "Assistant", to: "UserProxy", label: "code", y: 100 },
    { from: "UserProxy", to: "Assistant", label: "exec result", y: 140 },
    { from: "Assistant", to: "UserProxy", label: "final answer", y: 180 },
  ]
  return (
    <svg viewBox="0 0 320 210" className="w-full">
      <Label x={160} y={18} text="AutoGen — Conversational Agents" size={9} color={GR} />
      {/* Agent columns */}
      <rect x={20} y={28} width={90} height={170} rx={8} fill="#F5F3FF" stroke="#DDD6FE" />
      <Label x={65} y={46} text="UserProxy" size={9} color="#5B21B6" bold />
      <rect x={210} y={28} width={90} height={170} rx={8} fill={BG} stroke={LG} />
      <Label x={255} y={46} text="Assistant" size={9} color={DG} bold />
      {/* Messages */}
      {msgs.map((m, i) => {
        const fromRight = m.from === "Assistant"
        return (
          <g key={i}>
            <Arrow x1={fromRight ? 210 : 110} y1={m.y} x2={fromRight ? 110 : 210} y2={m.y}
              color={fromRight ? G : "#6366F1"} />
            <Label x={160} y={m.y - 6} text={m.label} size={8} color={GR} />
          </g>
        )
      })}
    </svg>
  )
}

// ── 8-3: Claude Agent SDK ─────────────────────────────────────────────────────
export function ClaudeAgentSDKViz() {
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      <Label x={160} y={18} text="Claude Agent SDK Architecture" size={9} color={GR} />
      {/* User */}
      <Box x={120} y={24} w={80} h={28} fill="#F1F5F9" stroke="#CBD5E1">
        <Label x={160} y={42} text="Your App" size={9} color="#475569" bold />
      </Box>
      <Arrow x1={160} y1={52} x2={160} y2={68} />
      {/* Runner */}
      <Box x={80} y={68} w={160} h={32} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={160} y={84} text="Runner / Agent Loop" size={10} color="#5B21B6" bold />
        <Label x={160} y={97} text="manages turn-taking" size={8} color={GR} />
      </Box>
      <Arrow x1={160} y1={100} x2={160} y2={116} />
      {/* Claude API */}
      <Box x={80} y={116} w={160} h={32} fill={BG} stroke={LG}>
        <Label x={160} y={132} text="Claude API" size={10} color={DG} bold />
        <Label x={160} y={145} text="claude-opus-4 / sonnet-4" size={8} color={GR} />
      </Box>
      {/* Tools */}
      <Box x={10} y={130} w={60} h={50} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={40} y={150} text="Tool A" size={9} color="#92400E" bold />
        <Label x={40} y={163} text="(function)" size={7} color={GR} />
      </Box>
      <Box x={250} y={130} w={60} h={50} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={280} y={150} text="Tool B" size={9} color="#92400E" bold />
        <Label x={280} y={163} text="(function)" size={7} color={GR} />
      </Box>
      <Arrow x1={80} y1={148} x2={70} y2={148} color="#F59E0B" />
      <Arrow x1={240} y1={148} x2={250} y2={148} color="#F59E0B" />
      {/* Computer Use */}
      <Box x={90} y={172} w={140} h={24} fill="#FEE2E2" stroke="#FECACA">
        <Label x={160} y={188} text="Computer Use (optional)" size={9} color="#991B1B" bold />
      </Box>
      <Arrow x1={160} y1={148} x2={160} y2={172} color="#EF4444" />
    </svg>
  )
}

// ── 8-4: RAG Pipeline Design ──────────────────────────────────────────────────
export function RagPipelineViz() {
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      <Label x={160} y={14} text="RAG: Offline Ingest + Online Query" size={9} color={GR} />
      {/* Offline */}
      <Label x={80} y={30} text="① Offline Ingest" size={8} color={GR} />
      {["Load", "Chunk", "Embed", "Store"].map((s, i) => (
        <g key={i}>
          <Box x={10 + i * 72} y={36} w={64} h={28} fill={BG} stroke={LG}>
            <Label x={42 + i * 72} y={54} text={s} size={9} color={DG} bold />
          </Box>
          {i < 3 && <Arrow x1={74 + i * 72} y1={50} x2={80 + i * 72} y2={50} />}
        </g>
      ))}
      {/* Divider */}
      <line x1={15} y1={78} x2={305} y2={78} stroke={LG} strokeDasharray="4 3" strokeWidth="1" />
      {/* Online */}
      <Label x={80} y={94} text="② Online Query" size={8} color={GR} />
      {["Query", "Retrieve\n(ANN)", "Re-rank", "Prompt\n+ LLM", "Answer"].map((s, i) => (
        <g key={i}>
          <Box x={8 + i * 60} y={100} w={54} h={36} fill={i === 4 ? "#DCFCE7" : BG} stroke={i === 4 ? "#86EFAC" : LG}>
            {s.split("\n").map((line, j) => (
              <Label key={j} x={35 + i * 60} y={116 + j * 13} text={line} size={8}
                color={i === 4 ? "#166534" : DG} bold />
            ))}
          </Box>
          {i < 4 && <Arrow x1={62 + i * 60} y1={118} x2={66 + i * 60} y2={118} />}
        </g>
      ))}
      {/* Hybrid note */}
      <Label x={160} y={154} text="Retrieve = Dense (ANN) + Sparse (BM25) → RRF merge" size={8} color={GR} />
    </svg>
  )
}

// ── 8-4: RAG Chunking ────────────────────────────────────────────────────────
export function RagChunkingViz() {
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      <Label x={160} y={14} text="Chunking Strategies" size={9} color={GR} />
      {/* Document */}
      <Box x={10} y={22} w={280} h={30} fill="#F1F5F9" stroke="#CBD5E1">
        <Label x={150} y={41} text="Full Document" size={9} color="#475569" bold />
      </Box>
      <Arrow x1={150} y1={52} x2={150} y2={68} />
      {/* Fixed-size */}
      {[0, 1, 2, 3].map(i => (
        <Box key={i} x={12 + i * 72} y={68} w={64} h={24} fill={BG} stroke={LG}>
          <Label x={44 + i * 72} y={84} text={`Chunk ${i + 1}`} size={8} color={DG} bold />
        </Box>
      ))}
      <Label x={150} y={108} text="Fixed-size (RecursiveCharacterSplitter, 512 tok)" size={8} color={GR} />
      <Arrow x1={150} y1={114} x2={150} y2={128} />
      {/* Parent-Child */}
      <Box x={40} y={128} w={230} h={24} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={155} y={144} text="Parent Chunk (large context)" size={8} color="#92400E" bold />
      </Box>
      {[0, 1, 2].map(i => (
        <Box key={i} x={45 + i * 74} y={158} w={66} h={22} fill={BG} stroke={LG}>
          <Label x={78 + i * 74} y={173} text={`Child ${i + 1}`} size={8} color={DG} />
        </Box>
      ))}
      <Label x={150} y={196} text="Parent-Child: retrieve child, return parent for context" size={8} color={GR} />
    </svg>
  )
}

// ── 8-4: Vector Search ────────────────────────────────────────────────────────
export function VectorSearchViz() {
  const pts = [
    { x: 80, y: 70, label: "doc A", fill: BG },
    { x: 130, y: 50, label: "doc B", fill: BG },
    { x: 160, y: 90, label: "doc C ★", fill: "#DCFCE7" },
    { x: 200, y: 60, label: "doc D ★", fill: "#DCFCE7" },
    { x: 240, y: 100, label: "doc E", fill: BG },
    { x: 100, y: 130, label: "doc F", fill: BG },
    { x: 180, y: 140, label: "doc G", fill: BG },
  ]
  const query = { x: 175, y: 80 }
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="ANN Vector Search (HNSW)" size={9} color={GR} />
      {/* Axes */}
      <line x1={40} y1={160} x2={290} y2={160} stroke={LG} strokeWidth="1" />
      <line x1={40} y1={30} x2={40} y2={160} stroke={LG} strokeWidth="1" />
      <Label x={165} y={176} text="embedding dim 1" size={8} color={GR} />
      {/* Radius */}
      <circle cx={query.x} cy={query.y} r={55} fill="none" stroke={G}
        strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={10} fill={p.fill} stroke={p.fill.includes("DC") ? "#86EFAC" : LG} strokeWidth="2" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={7} fill={DG} fontFamily="system-ui">{p.label}</text>
        </g>
      ))}
      {/* Query point */}
      <circle cx={query.x} cy={query.y} r={8} fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
      <Label x={query.x + 12} y={query.y - 6} text="query" size={8} color="#EF4444" bold anchor="start" />
      <Label x={120} y={26} text="★ top-k nearest neighbours returned" size={8} color={G} />
    </svg>
  )
}

// ── 8-4: Reranking Systems ────────────────────────────────────────────────────
export function RerankingViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="Two-Stage Retrieval Funnel" size={9} color={GR} />
      {/* Stage 1 */}
      <Box x={20} y={26} w={120} h={40} fill={BG} stroke={LG}>
        <Label x={80} y={42} text="Bi-Encoder" size={10} color={DG} bold />
        <Label x={80} y={58} text="k=20 candidates" size={8} color={GR} />
      </Box>
      <Arrow x1={140} y1={46} x2={170} y2={46} />
      {/* Stage 2 */}
      <Box x={170} y={26} w={130} h={40} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={235} y={42} text="Cross-Encoder" size={10} color="#92400E" bold />
        <Label x={235} y={58} text="re-score 20, keep 5" size={8} color={GR} />
      </Box>
      {/* Funnel visual */}
      <polygon points="40,100 180,100 160,150 60,150" fill={BG} stroke={LG} strokeWidth="1.5" />
      <Label x={110} y={128} text="20 candidates" size={9} color={DG} bold />
      <polygon points="60,154 160,154 145,185 75,185" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" />
      <Label x={110} y={174} text="Top 5 (precise)" size={9} color="#166534" bold />
      {/* Latency note */}
      <Label x={240} y={115} text="Bi-encoder:" size={8} color={GR} anchor="start" />
      <Label x={240} y={128} text="O(1) lookup" size={8} color={DG} bold anchor="start" />
      <Label x={240} y={148} text="Cross-encoder:" size={8} color={GR} anchor="start" />
      <Label x={240} y={161} text="O(k) forward" size={8} color="#92400E" bold anchor="start" />
      <Label x={240} y={174} text="passes ~200ms" size={8} color={GR} anchor="start" />
    </svg>
  )
}

// ── 8-4: RAG Evaluation ──────────────────────────────────────────────────────
export function RagEvalViz() {
  const metrics = [
    { label: "Faithfulness", sub: "answer grounded in context?", color: BG, tc: DG },
    { label: "Answer Relevance", sub: "answers the question?", color: "#EDE9FE", tc: "#5B21B6" },
    { label: "Context Precision", sub: "retrieved chunks useful?", color: "#FEF3C7", tc: "#92400E" },
    { label: "Context Recall", sub: "all relevant chunks found?", color: "#FEE2E2", tc: "#991B1B" },
  ]
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="RAGAS Evaluation Metrics" size={9} color={GR} />
      {metrics.map((m, i) => (
        <g key={i}>
          <rect x={16} y={26 + i * 40} width={288} height={32} rx={7}
            fill={m.color} stroke="#E2E8F0" strokeWidth="1.5" />
          <text x={90} y={44 + i * 40} textAnchor="middle" fontSize={10}
            fontWeight="700" fill={m.tc} fontFamily="system-serif">{m.label}</text>
          <text x={220} y={44 + i * 40} textAnchor="middle" fontSize={8}
            fill={GR} fontFamily="system-ui">{m.sub}</text>
          {/* Score bar */}
          <rect x={190} y={50 + i * 40} width={100} height={4} rx={2} fill="#E2E8F0" />
          <rect x={190} y={50 + i * 40} width={[80, 70, 60, 65][i]} height={4} rx={2} fill={m.tc} />
        </g>
      ))}
      <Label x={160} y={186} text="RAGAS: score = LLM-as-judge over retrieved context + answer" size={8} color={GR} />
    </svg>
  )
}

// ── 8-5: MCP ─────────────────────────────────────────────────────────────────
export function MCPViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="Model Context Protocol (MCP)" size={9} color={GR} />
      {/* Host */}
      <Box x={100} y={24} w={120} h={36} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={160} y={40} text="MCP Host" size={10} color="#5B21B6" bold />
        <Label x={160} y={53} text="(Claude Desktop / IDE)" size={8} color={GR} />
      </Box>
      {/* Client */}
      <Box x={100} y={80} w={120} h={32} fill={BG} stroke={LG}>
        <Label x={160} y={96} text="MCP Client" size={10} color={DG} bold />
        <Label x={160} y={109} text="manages connections" size={8} color={GR} />
      </Box>
      <Arrow x1={160} y1={60} x2={160} y2={80} />
      {/* Servers */}
      {[
        { label: "File Server", sub: "reads local FS", x: 40 },
        { label: "DB Server", sub: "queries Postgres", x: 160 },
        { label: "API Server", sub: "calls web APIs", x: 262 },
      ].map((s, i) => (
        <g key={i}>
          <Box x={s.x - 45} y={138} w={90} h={36} fill="#FEF3C7" stroke="#FDE68A">
            <Label x={s.x} y={154} text={s.label} size={9} color="#92400E" bold />
            <Label x={s.x} y={167} text={s.sub} size={7} color={GR} />
          </Box>
          <Arrow x1={s.x} y1={112} x2={s.x} y2={138} color="#F59E0B" />
          <Arrow x1={s.x} y1={138} x2={s.x} y2={112} color={G} />
        </g>
      ))}
      {/* JSON-RPC label */}
      <Label x={160} y={130} text="JSON-RPC 2.0 over stdio / SSE" size={8} color={GR} />
    </svg>
  )
}

// ── 8-5: API Design for AI ────────────────────────────────────────────────────
export function APIDesignAIViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="AI API Design Patterns" size={9} color={GR} />
      {/* Client */}
      <Box x={10} y={30} w={80} h={36} fill="#F1F5F9" stroke="#CBD5E1">
        <Label x={50} y={52} text="Client" size={10} color="#475569" bold />
      </Box>
      {/* Request types */}
      <Box x={120} y={24} w={90} h={24} fill={BG} stroke={LG}>
        <Label x={165} y={40} text="REST request" size={8} color={DG} bold />
      </Box>
      <Box x={120} y={56} w={90} h={24} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={165} y={72} text="SSE stream" size={8} color="#5B21B6" bold />
      </Box>
      <Box x={120} y={88} w={90} h={24} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={165} y={104} text="WebSocket" size={8} color="#92400E" bold />
      </Box>
      <Arrow x1={90} y1={36} x2={120} y2={36} />
      <Arrow x1={90} y1={48} x2={120} y2={68} />
      <Arrow x1={90} y1={60} x2={120} y2={100} />
      {/* AI Gateway */}
      <Box x={230} y={48} w={80} h={60} fill={BG} stroke={LG}>
        <Label x={270} y={68} text="AI Gateway" size={9} color={DG} bold />
        <Label x={270} y={82} text="rate limit" size={7} color={GR} />
        <Label x={270} y={94} text="retry / cache" size={7} color={GR} />
        <Label x={270} y={106} text="token budget" size={7} color={GR} />
      </Box>
      <Arrow x1={210} y1={78} x2={230} y2={78} />
      {/* Token budget note */}
      <Label x={160} y={140} text="Rate limit: req/min + token/min (TPM)" size={8} color={GR} />
      <Label x={160} y={154} text="SSE streaming: chunk tokens as they arrive" size={8} color={GR} />
    </svg>
  )
}

// ── 8-5: Structured Outputs ───────────────────────────────────────────────────
export function StructuredOutputsViz() {
  return (
    <svg viewBox="0 0 320 180" className="w-full">
      <Label x={160} y={16} text="Structured Output Pipeline" size={9} color={GR} />
      {/* Schema */}
      <Box x={10} y={26} w={90} h={60} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={55} y={44} text="JSON Schema" size={8} color="#5B21B6" bold />
        <Label x={55} y={58} text="{ name: str" size={7} color="#5B21B6" />
        <Label x={55} y={70} text="  age: int" size={7} color="#5B21B6" />
        <Label x={55} y={82} text="  role: enum }" size={7} color="#5B21B6" />
      </Box>
      <Arrow x1={100} y1={56} x2={120} y2={56} />
      {/* LLM */}
      <Box x={120} y={36} w={80} h={40} fill={BG} stroke={LG}>
        <Label x={160} y={54} text="LLM" size={10} color={DG} bold />
        <Label x={160} y={68} text="constrained decode" size={7} color={GR} />
      </Box>
      <Arrow x1={200} y1={56} x2={220} y2={56} />
      {/* Output */}
      <Box x={220} y={26} w={90} h={60} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={265} y={44} text="Typed Output" size={8} color="#166534" bold />
        <Label x={265} y={58} text='{ "name": "Ana"' size={7} color="#166534" />
        <Label x={265} y={70} text='  "age": 29' size={7} color="#166534" />
        <Label x={265} y={82} text='  "role": "eng" }' size={7} color="#166534" />
      </Box>
      {/* Tools */}
      <Label x={160} y={110} text="Implementations" size={9} color={GR} bold />
      {["Pydantic\n.model_json_schema()", "Outlines\n(grammar-based)", "OpenAI\nresponse_format"].map((t, i) => (
        <g key={i}>
          <Box x={16 + i * 96} y={118} w={88} h={36} fill={BG} stroke={LG}>
            {t.split("\n").map((line, j) => (
              <Label key={j} x={60 + i * 96} y={133 + j * 13} text={line} size={7} color={DG} />
            ))}
          </Box>
        </g>
      ))}
    </svg>
  )
}

// ── 8-5: JSON Mode ────────────────────────────────────────────────────────────
export function JSONModeViz() {
  return (
    <svg viewBox="0 0 320 160" className="w-full">
      <Label x={160} y={16} text="JSON Mode vs Structured Outputs" size={9} color={GR} />
      {[
        { label: "JSON Mode", desc: "forces valid JSON", sub: "no schema enforcement", fill: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E", x: 20 },
        { label: "Structured\nOutputs", desc: "enforces schema", sub: "grammar-constrained", fill: BG, stroke: LG, tc: DG, x: 175 },
      ].map((m, i) => (
        <g key={i}>
          <Box x={m.x} y={26} w={125} h={100} fill={m.fill} stroke={m.stroke}>
            {m.label.split("\n").map((line, j) => (
              <Label key={j} x={m.x + 62} y={44 + j * 14} text={line} size={10} color={m.tc} bold />
            ))}
            <Label x={m.x + 62} y={76} text={m.desc} size={8} color={m.tc} />
            <Label x={m.x + 62} y={90} text={m.sub} size={8} color={GR} />
            <Label x={m.x + 62} y={110} text={i === 0 ? "⚠ may hallucinate keys" : "✓ always matches schema"} size={8} color={i === 0 ? "#EF4444" : "#166534"} />
          </Box>
        </g>
      ))}
      <Label x={160} y={146} text="Use structured outputs whenever schema is known" size={8} color={G} bold />
    </svg>
  )
}

// ── 8-5: Tool Calling Patterns ────────────────────────────────────────────────
export function ToolCallingPatternsViz() {
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      <Label x={160} y={16} text="Tool Calling Patterns" size={9} color={GR} />
      {/* Sequential */}
      <Label x={10} y={34} text="Sequential" size={8} color={GR} anchor="start" />
      {["Tool A", "Tool B", "Tool C"].map((t, i) => (
        <g key={i}>
          <Box x={10 + i * 80} y={40} w={70} h={24} fill={BG} stroke={LG}>
            <Label x={45 + i * 80} y={56} text={t} size={8} color={DG} bold />
          </Box>
          {i < 2 && <Arrow x1={80 + i * 80} y1={52} x2={88 + i * 80} y2={52} />}
        </g>
      ))}
      {/* Parallel */}
      <Label x={10} y={86} text="Parallel" size={8} color={GR} anchor="start" />
      <Box x={10} y={92} w={60} h={24} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={40} y={108} text="LLM call" size={8} color="#5B21B6" bold />
      </Box>
      {["Tool 1", "Tool 2", "Tool 3"].map((t, i) => (
        <g key={i}>
          <Box x={90 + i * 72} y={92} w={62} h={24} fill={BG} stroke={LG}>
            <Label x={121 + i * 72} y={108} text={t} size={8} color={DG} bold />
          </Box>
          <Arrow x1={70} y1={104} x2={90 + i * 72} y2={104} />
        </g>
      ))}
      {/* Fallback */}
      <Label x={10} y={140} text="Fallback" size={8} color={GR} anchor="start" />
      <Box x={10} y={148} w={70} h={24} fill={BG} stroke={LG}>
        <Label x={45} y={164} text="Primary" size={8} color={DG} bold />
      </Box>
      <Arrow x1={80} y1={160} x2={100} y2={160} color="#EF4444" />
      <Label x={90} y={154} text="fail" size={7} color="#EF4444" />
      <Box x={100} y={148} w={70} h={24} fill="#FEE2E2" stroke="#FECACA">
        <Label x={135} y={164} text="Fallback" size={8} color="#991B1B" bold />
      </Box>
      <Label x={200} y={154} text="→" size={12} color={GR} anchor="start" />
      <Box x={210} y={148} w={96} h={24} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={258} y={164} text="Cached result" size={8} color="#166534" bold />
      </Box>
    </svg>
  )
}

// ── 8-6: LLM Tracing ─────────────────────────────────────────────────────────
export function LLMTracingViz() {
  const spans = [
    { label: "Trace: user_query", depth: 0, fill: "#EDE9FE", stroke: "#C4B5FD", tc: "#5B21B6", w: 290 },
    { label: "Span: retrieval", depth: 1, fill: BG, stroke: LG, tc: DG, w: 220 },
    { label: "Span: embed_query", depth: 2, fill: BG, stroke: LG, tc: GR, w: 150 },
    { label: "Span: llm_generate", depth: 1, fill: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E", w: 220 },
  ]
  return (
    <svg viewBox="0 0 320 180" className="w-full">
      <Label x={160} y={16} text="Trace → Span Hierarchy (OpenTelemetry)" size={9} color={GR} />
      {spans.map((s, i) => (
        <g key={i}>
          <rect x={14 + s.depth * 18} y={26 + i * 36} width={s.w} height={26} rx={6}
            fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />
          <text x={22 + s.depth * 18} y={43 + i * 36} fontSize={9}
            fontWeight="700" fill={s.tc} fontFamily="system-ui">{s.label}</text>
          {/* Duration bar */}
          <rect x={14 + s.depth * 18 + s.w - 70} y={34 + i * 36} width={60} height={8} rx={3} fill="#E2E8F0" />
          <rect x={14 + s.depth * 18 + s.w - 70} y={34 + i * 36} width={[60, 40, 20, 55][i]} height={8} rx={3} fill={s.tc} opacity="0.6" />
        </g>
      ))}
      <Label x={160} y={172} text="Tags: model, tokens_in, tokens_out, latency_ms, cost" size={8} color={GR} />
    </svg>
  )
}

// ── 8-6: LLM Logging ─────────────────────────────────────────────────────────
export function LLMLoggingViz() {
  return (
    <svg viewBox="0 0 320 180" className="w-full">
      <Label x={160} y={16} text="LLM Logging Pipeline" size={9} color={GR} />
      {/* LLM call */}
      <Box x={10} y={26} w={80} h={40} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={50} y={43} text="LLM Call" size={9} color="#5B21B6" bold />
        <Label x={50} y={57} text="+ metadata" size={8} color={GR} />
      </Box>
      <Arrow x1={90} y1={46} x2={110} y2={46} />
      {/* Log record */}
      <Box x={110} y={20} w={110} h={52} fill={BG} stroke={LG}>
        <Label x={165} y={36} text="Log Record" size={9} color={DG} bold />
        <Label x={165} y={50} text="prompt_hash" size={7} color={GR} />
        <Label x={165} y={62} text="tokens_in / out" size={7} color={GR} />
        <Label x={165} y={74} text="latency / cost" size={7} color={GR} />
      </Box>
      <Arrow x1={220} y1={46} x2={240} y2={46} />
      {/* Storage options */}
      {[
        { label: "Langfuse", y: 30 },
        { label: "Datadog", y: 60 },
        { label: "S3 / GCS", y: 90 },
      ].map((s, i) => (
        <g key={i}>
          <Box x={240} y={s.y} w={70} h={22} fill="#FEF3C7" stroke="#FDE68A">
            <Label x={275} y={s.y + 15} text={s.label} size={8} color="#92400E" bold />
          </Box>
          {i > 0 && <Arrow x1={240} y1={46} x2={240} y2={s.y + 11} color="#F59E0B" />}
        </g>
      ))}
      {/* Alerts */}
      <Label x={160} y={134} text="Alerts on: cost_spike, latency_p95 > threshold" size={8} color={GR} />
      <Label x={160} y={148} text="Dashboards: cost/day, error rate, token usage by model" size={8} color={GR} />
    </svg>
  )
}

// ── 8-6: LLM Eval Frameworks ─────────────────────────────────────────────────
export function LLMEvalViz() {
  const loop = ["Dataset\n(Q+A pairs)", "Run Pipeline", "Score\n(LLM-as-judge)", "Aggregate\nMetrics", "Compare\nBaseline"]
  return (
    <svg viewBox="0 0 320 130" className="w-full">
      <Label x={160} y={16} text="LLM Evaluation Loop" size={9} color={GR} />
      {loop.map((s, i) => (
        <g key={i}>
          <Box x={8 + i * 60} y={28} w={54} h={46}>
            {s.split("\n").map((line, j) => (
              <Label key={j} x={35 + i * 60} y={48 + j * 13} text={line} size={7} color={DG} bold />
            ))}
          </Box>
          {i < loop.length - 1 && <Arrow x1={62 + i * 60} y1={51} x2={66 + i * 60} y2={51} />}
        </g>
      ))}
      {/* Loop-back */}
      <path d="M 308 75 Q 308 110 160 110 Q 12 110 12 75" fill="none" stroke={G} strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="12,75 6,83 18,83" fill={G} />
      <Label x={160} y={122} text="repeat on every model / prompt / pipeline change" size={8} color={GR} />
    </svg>
  )
}

// ── 8-6: Regression Testing LLM ──────────────────────────────────────────────
export function RegressionTestingViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="LLM Regression Test in CI/CD" size={9} color={GR} />
      {/* PR trigger */}
      <Box x={100} y={24} w={120} h={28} fill="#F1F5F9" stroke="#CBD5E1">
        <Label x={160} y={42} text="PR: prompt / model change" size={8} color="#475569" bold />
      </Box>
      <Arrow x1={160} y1={52} x2={160} y2={68} />
      {/* CI step */}
      <Box x={80} y={68} w={160} h={32} fill={BG} stroke={LG}>
        <Label x={160} y={83} text="CI: run golden dataset (N=100)" size={9} color={DG} bold />
        <Label x={160} y={96} text="score with LLM-as-judge" size={8} color={GR} />
      </Box>
      <Arrow x1={160} y1={100} x2={160} y2={116} />
      {/* Compare */}
      <Box x={80} y={116} w={160} h={28} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={160} y={134} text="compare vs baseline scores" size={9} color="#5B21B6" bold />
      </Box>
      {/* Pass/Fail */}
      <Arrow x1={100} y1={144} x2={60} y2={162} color="#166534" />
      <Box x={10} y={162} w={100} h={26} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={60} y={179} text="✓ Pass → merge" size={9} color="#166534" bold />
      </Box>
      <Arrow x1={220} y1={144} x2={260} y2={162} color="#EF4444" />
      <Box x={210} y={162} w={100} h={26} fill="#FEE2E2" stroke="#FECACA">
        <Label x={260} y={179} text="✗ Fail → block PR" size={9} color="#991B1B" bold />
      </Box>
    </svg>
  )
}

// ── 8-7: Input/Output Filtering ───────────────────────────────────────────────
export function IOFilteringViz() {
  return (
    <svg viewBox="0 0 320 160" className="w-full">
      <Label x={160} y={16} text="Input / Output Filtering Pipeline" size={9} color={GR} />
      {[
        { label: "User Input", fill: "#F1F5F9", stroke: "#CBD5E1", tc: "#475569" },
        { label: "Input Filter\n(LlamaGuard)", fill: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E" },
        { label: "LLM", fill: BG, stroke: LG, tc: DG },
        { label: "Output Filter\n(LlamaGuard)", fill: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E" },
        { label: "Response", fill: "#DCFCE7", stroke: "#86EFAC", tc: "#166534" },
      ].map((s, i) => (
        <g key={i}>
          <Box x={10 + i * 60} y={34} w={54} h={44} fill={s.fill} stroke={s.stroke}>
            {s.label.split("\n").map((line, j) => (
              <text key={j} x={37 + i * 60} y={52 + j * 14} textAnchor="middle"
                fontSize={8} fontWeight="700" fill={s.tc} fontFamily="system-ui">{line}</text>
            ))}
          </Box>
          {i < 4 && <Arrow x1={64 + i * 60} y1={56} x2={68 + i * 60} y2={56} />}
          {/* Block arrows */}
          {(i === 1 || i === 3) && (
            <g>
              <Arrow x1={37 + i * 60} y1={78} x2={37 + i * 60} y2={94} color="#EF4444" />
              <Box x={10 + i * 60} y={94} w={54} h={20} fill="#FEE2E2" stroke="#FECACA">
                <Label x={37 + i * 60} y={108} text="block" size={8} color="#991B1B" bold />
              </Box>
            </g>
          )}
        </g>
      ))}
    </svg>
  )
}

// ── 8-7: Content Moderation ───────────────────────────────────────────────────
export function ContentModerationViz() {
  const cats = ["hate", "violence", "sexual", "self-harm", "spam"]
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="Content Moderation — Classification" size={9} color={GR} />
      {/* Input */}
      <Box x={100} y={24} w={120} h={28} fill="#F1F5F9" stroke="#CBD5E1">
        <Label x={160} y={42} text="User / LLM Content" size={9} color="#475569" bold />
      </Box>
      <Arrow x1={160} y1={52} x2={160} y2={68} />
      {/* Classifier */}
      <Box x={80} y={68} w={160} h={32} fill="#EDE9FE" stroke="#C4B5FD">
        <Label x={160} y={84} text="Multi-class Classifier" size={10} color="#5B21B6" bold />
        <Label x={160} y={97} text="LlamaGuard / custom fine-tune" size={8} color={GR} />
      </Box>
      <Arrow x1={160} y1={100} x2={160} y2={114} />
      {/* Categories */}
      <Label x={160} y={126} text="Category scores (0–1)" size={8} color={GR} />
      {cats.map((c, i) => (
        <g key={i}>
          <Label x={18 + i * 58} y={144} text={c} size={7} color={GR} anchor="start" />
          <rect x={18 + i * 58} y={148} width={50} height={8} rx={3} fill="#E2E8F0" />
          <rect x={18 + i * 58} y={148} width={[8, 12, 5, 4, 18][i]} height={8} rx={3} fill="#EF4444" />
        </g>
      ))}
      {/* Threshold */}
      {cats.map((_, i) => (
        <line key={i} x1={18 + i * 58 + 20} y1={148} x2={18 + i * 58 + 20} y2={156}
          stroke="#F59E0B" strokeWidth="2" />
      ))}
      <Label x={160} y={174} text="threshold line ——  above = flag for review / block" size={8} color="#F59E0B" />
    </svg>
  )
}

// ── 8-7: Prompt Injection Defense ─────────────────────────────────────────────
export function PromptInjectionViz() {
  const layers = [
    { label: "Privilege Separation", sub: "user ≠ system instructions", fill: "#FEE2E2", stroke: "#FECACA", tc: "#991B1B" },
    { label: "Input Sanitisation", sub: "strip / escape untrusted text", fill: "#FEF3C7", stroke: "#FDE68A", tc: "#92400E" },
    { label: "Intent Classifier", sub: "detect injected instructions", fill: "#EDE9FE", stroke: "#C4B5FD", tc: "#5B21B6" },
    { label: "LLM Core", sub: "only sees sanitised context", fill: BG, stroke: LG, tc: DG },
  ]
  return (
    <svg viewBox="0 0 320 200" className="w-full">
      <Label x={160} y={16} text="Defence-in-Depth: Prompt Injection" size={9} color={GR} />
      {/* Attacker */}
      <Box x={10} y={26} w={70} h={28} fill="#FEE2E2" stroke="#FECACA">
        <Label x={45} y={44} text="Attacker" size={9} color="#991B1B" bold />
      </Box>
      <Arrow x1={80} y1={40} x2={100} y2={40} color="#EF4444" />
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={100} y={24 + i * 42} width={210} height={34} rx={7}
            fill={l.fill} stroke={l.stroke} strokeWidth="2" />
          <text x={210} y={38 + i * 42} textAnchor="middle" fontSize={9}
            fontWeight="700" fill={l.tc} fontFamily="system-ui">{l.label}</text>
          <text x={210} y={51 + i * 42} textAnchor="middle" fontSize={7}
            fill={GR} fontFamily="system-ui">{l.sub}</text>
          {i < layers.length - 1 && (
            <Arrow x1={205} y1={58 + i * 42} x2={205} y2={66 + i * 42} />
          )}
        </g>
      ))}
    </svg>
  )
}

// ── 8-7: Red Teaming ──────────────────────────────────────────────────────────
export function RedTeamingViz() {
  return (
    <svg viewBox="0 0 320 190" className="w-full">
      <Label x={160} y={16} text="Red Team → Remediation Cycle" size={9} color={GR} />
      {/* Red team */}
      <Box x={10} y={28} w={100} h={40} fill="#FEE2E2" stroke="#FECACA">
        <Label x={60} y={45} text="Red Team" size={10} color="#991B1B" bold />
        <Label x={60} y={60} text="human + automated" size={8} color={GR} />
      </Box>
      {/* Attack types */}
      {["Jailbreak", "Role-play", "Indirect\nInjection", "Goal\nHijack"].map((a, i) => (
        <g key={i}>
          <Box x={8 + i * 76} y={86} w={68} h={30} fill="#FEE2E2" stroke="#FECACA">
            {a.split("\n").map((line, j) => (
              <Label key={j} x={42 + i * 76} y={98 + j * 12} text={line} size={8} color="#991B1B" bold />
            ))}
          </Box>
          <Arrow x1={60} y1={68} x2={42 + i * 76} y2={86} color="#EF4444" />
        </g>
      ))}
      <Arrow x1={160} y1={116} x2={160} y2={134} />
      {/* Findings */}
      <Box x={60} y={134} w={200} h={28} fill="#FEF3C7" stroke="#FDE68A">
        <Label x={160} y={152} text="Findings → Severity triage" size={9} color="#92400E" bold />
      </Box>
      <Arrow x1={160} y1={162} x2={160} y2={176} />
      <Box x={60} y={176} w={200} h={26} fill="#DCFCE7" stroke="#86EFAC">
        <Label x={160} y={193} text="Guardrail / Policy update" size={9} color="#166534" bold />
      </Box>
    </svg>
  )
}
