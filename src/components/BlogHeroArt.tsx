/**
 * Blog hero illustration — the IVF embryo-development journey animated as a
 * timed sequence: Day 1 pops in, the path draws forward, Day 2 appears, then
 * Day 3 → 4 → 5, where AI selects the blastocyst. Then it loops. All stages
 * share one 8s SMIL timeline so they stay in phase and reset together.
 * Coral brand system; distinct from the homepage EmbryoScore microscope.
 */

const DUR = "8s";

type Pt = { cx: number; cy: number };

// each stage's centre + the moment (0–1 of the cycle) it appears
const STAGES = [
  { cx: 96, cy: 380, k: 0.05 }, // Day 1 — zygote
  { cx: 154, cy: 326, k: 0.21 }, // Day 2 — 2-cell
  { cx: 214, cy: 272, k: 0.37 }, // Day 3 — 4-cell
  { cx: 276, cy: 214, k: 0.53 }, // Day 4 — morula
  { cx: 342, cy: 150, k: 0.69 }, // Day 5 — blastocyst
];

const PATH = "M96 380 Q 118 344 154 326 T 214 272 T 276 214 T 342 150";
const f = (n: number) => Math.max(0, Math.min(1, n)).toFixed(3);

export function BlogHeroArt({ className }: { className?: string }) {
  const [d1, d2, d3, d4, d5] = STAGES;

  return (
    <svg
      viewBox="0 0 440 470"
      className={className}
      role="img"
      aria-label="An IVF embryo developing day by day from a single cell to a Day-5 blastocyst, selected by AI — Garbha.ai"
    >
      <defs>
        <radialGradient id="bg-aura" cx="0.55" cy="0.4" r="0.6">
          <stop stopColor="#f1575e" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#ff7a3c" stopOpacity="0.08" />
          <stop offset="1" stopColor="#f1575e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bg-cell" cx="0.36" cy="0.3" r="0.85">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#ffe4e5" />
          <stop offset="1" stopColor="#f47d82" />
        </radialGradient>
        <radialGradient id="bg-blastfluid" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#fff3f0" />
          <stop offset="1" stopColor="#ffd9cb" />
        </radialGradient>
        <linearGradient id="bg-sel" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f1575e" />
          <stop offset="1" stopColor="#ff5a24" />
        </linearGradient>
        <filter id="bg-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* aura */}
      <circle cx="228" cy="238" r="196" fill="url(#bg-aura)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* developmental path — draws forward as the stages appear */}
      <path
        d={PATH}
        pathLength={1}
        fill="none"
        stroke="#f8a3a7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 1"
        opacity="0.75"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur={DUR}
          repeatCount="indefinite"
          values="1;1;0;0;1"
          keyTimes={`0;${f(d1.k)};${f(d5.k)};0.92;1`}
        />
      </path>

      {/* Day 1 — zygote with two pronuclei */}
      <Stage k={d1.k} cx={d1.cx} cy={d1.cy}>
        <Cell cx={d1.cx} cy={d1.cy} r={22}>
          <circle cx={d1.cx - 6} cy={d1.cy} r={6} fill="#fff" opacity="0.85" />
          <circle cx={d1.cx + 6} cy={d1.cy} r={6} fill="#fff" opacity="0.85" />
        </Cell>
        <DayLabel x={d1.cx} y={d1.cy + 42} text="Day 1" />
      </Stage>

      {/* Day 2 — 2-cell */}
      <Stage k={d2.k} cx={d2.cx} cy={d2.cy}>
        <Cell cx={d2.cx - 13} cy={d2.cy + 2} r={15} />
        <Cell cx={d2.cx + 13} cy={d2.cy - 2} r={15} />
      </Stage>

      {/* Day 3 — 4-cell */}
      <Stage k={d3.k} cx={d3.cx} cy={d3.cy}>
        <Cell cx={d3.cx - 12} cy={d3.cy - 11} r={12} />
        <Cell cx={d3.cx + 12} cy={d3.cy - 11} r={12} />
        <Cell cx={d3.cx - 12} cy={d3.cy + 11} r={12} />
        <Cell cx={d3.cx + 12} cy={d3.cy + 11} r={12} />
      </Stage>

      {/* Day 4 — morula */}
      <Stage k={d4.k} cx={d4.cx} cy={d4.cy}>
        {morula(d4.cx, d4.cy).map((c, i) => (
          <Cell key={i} cx={c.cx} cy={c.cy} r={8} />
        ))}
      </Stage>

      {/* Day 5 — blastocyst, AI-selected */}
      <Stage k={d5.k} cx={d5.cx} cy={d5.cy}>
        <g className="animate-spin-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={d5.cx} cy={d5.cy} r={60} fill="none" stroke="url(#bg-sel)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 10" />
        </g>
        <g className="animate-heartbeat" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={d5.cx} cy={d5.cy} r={46} fill="url(#bg-blastfluid)" stroke="#f8a3a7" strokeWidth="1.5" />
          {ring(d5.cx, d5.cy, 46, 14).map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={6.5} fill="url(#bg-cell)" stroke="#e04d50" strokeOpacity="0.25" strokeWidth="1" />
          ))}
          <circle cx={d5.cx - 15} cy={d5.cy - 12} r={17} fill="url(#bg-cell)" stroke="#e04d50" strokeOpacity="0.3" strokeWidth="1.2" />
          <circle cx={d5.cx - 20} cy={d5.cy - 17} r={5} fill="#fff" opacity="0.9" />
        </g>
        <g>
          <circle cx={d5.cx + 40} cy={d5.cy - 40} r={13} fill="url(#bg-sel)" filter="url(#bg-soft)" opacity="0.5" />
          <circle cx={d5.cx + 40} cy={d5.cy - 40} r={12} fill="url(#bg-sel)" />
          <path d={`M${d5.cx + 34} ${d5.cy - 40} l4 4 l8 -8`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <DayLabel x={d5.cx} y={d5.cy + 76} text="Day 5" />
      </Stage>

      <text
        x="220"
        y="446"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", letterSpacing: "3px" }}
        fontSize="10"
        fontWeight="600"
        fill="#8f9bb0"
      >
        AI EMBRYO DEVELOPMENT · DAY 1–5
      </text>
    </svg>
  );
}

/**
 * Wraps one development stage: an expanding pulse ring flashes when the stage
 * appears, and the content rises + fades in — all on the shared 8s loop.
 */
function Stage({
  k,
  cx,
  cy,
  children,
}: {
  k: number;
  cx: number;
  cy: number;
  children: React.ReactNode;
}) {
  return (
    <g>
      {/* pulse ring on appearance */}
      <circle cx={cx} cy={cy} r={4} fill="none" stroke="#ff5a24" strokeWidth="2.4">
        <animate
          attributeName="r"
          dur={DUR}
          repeatCount="indefinite"
          values="4;4;8;48;48"
          keyTimes={`0;${f(k - 0.02)};${f(k)};${f(k + 0.14)};1`}
        />
        <animate
          attributeName="opacity"
          dur={DUR}
          repeatCount="indefinite"
          values="0;0;0.6;0;0"
          keyTimes={`0;${f(k - 0.02)};${f(k)};${f(k + 0.14)};1`}
        />
      </circle>

      {/* rise + fade-in content */}
      <g opacity="0">
        <animate
          attributeName="opacity"
          dur={DUR}
          repeatCount="indefinite"
          values="0;0;1;1;0"
          keyTimes={`0;${f(k - 0.03)};${f(k)};0.92;1`}
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          dur={DUR}
          repeatCount="indefinite"
          values="0 16;0 16;0 0;0 0;0 0"
          keyTimes={`0;${f(k - 0.03)};${f(k + 0.06)};0.92;1`}
        />
        {children}
      </g>
    </g>
  );
}

function Cell({
  cx,
  cy,
  r,
  children,
}: {
  cx: number;
  cy: number;
  r: number;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#bg-cell)" stroke="#e04d50" strokeOpacity="0.28" strokeWidth="1.2" />
      <circle cx={cx - r * 0.32} cy={cy - r * 0.34} r={r * 0.24} fill="#ffffff" opacity="0.9" />
      {children}
    </g>
  );
}

function DayLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      style={{ fontFamily: "var(--font-sans)", letterSpacing: "1.5px" }}
      fontSize="11"
      fontWeight="700"
      fill="#cf2e2e"
    >
      {text}
    </text>
  );
}

function morula(cx: number, cy: number): Pt[] {
  const out: Pt[] = [{ cx, cy }];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    out.push({ cx: cx + Math.cos(a) * 13, cy: cy + Math.sin(a) * 13 });
  }
  return out;
}

function ring(cx: number, cy: number, r: number, n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return { cx: cx + Math.cos(a) * (r - 6), cy: cy + Math.sin(a) * (r - 6) };
  });
}
