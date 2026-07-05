/**
 * Technology hero illustration — "Edge AI at the bench": a processor chip that
 * analyses an embryo on-device, with circuit traces feeding pulsing nodes, data
 * flowing inward, and a scan sweeping the die. Distinct from the homepage
 * EmbryoScore microscope. Self-contained SVG with SMIL/CSS motion.
 */
const L = 150;
const R = 290;
const T = 142;
const B = 282;

const PIN_X = [176, 206, 236, 266];
const PIN_Y = [168, 198, 224, 254];

// circuit traces from the chip edge out to a node
const TRACES: { d: string; node: [number, number] }[] = [
  { d: "M182 142 V102 H78", node: [78, 102] },
  { d: "M262 142 V88 H360", node: [360, 88] },
  { d: "M290 178 H398", node: [398, 178] },
  { d: "M290 252 H358 V322", node: [358, 322] },
  { d: "M150 178 H42", node: [42, 178] },
  { d: "M150 252 H80 V332", node: [80, 332] },
  { d: "M220 282 V404", node: [220, 404] },
];

const CELLS: [number, number, number][] = [
  [210, 196, 12],
  [235, 200, 11],
  [220, 226, 13],
  [200, 220, 9],
  [241, 224, 9],
];

export function TechHeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 470"
      className={className}
      role="img"
      aria-label="Edge AI processor analysing an embryo on-device — Garbha.ai"
    >
      <defs>
        <radialGradient id="th-aura" cx="0.5" cy="0.46" r="0.55">
          <stop stopColor="#f1575e" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#ff7a3c" stopOpacity="0.08" />
          <stop offset="1" stopColor="#f1575e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="th-chip" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f1575e" />
          <stop offset="1" stopColor="#ff5a24" />
        </linearGradient>
        <radialGradient id="th-die" cx="0.5" cy="0.42" r="0.7">
          <stop stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#fff5f4" />
          <stop offset="1" stopColor="#fde3e4" />
        </radialGradient>
        <radialGradient id="th-cell" cx="0.36" cy="0.3" r="0.85">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#ffe4e5" />
          <stop offset="1" stopColor="#f47d82" />
        </radialGradient>
        <linearGradient id="th-scan" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ff5a24" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ff5a24" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff5a24" stopOpacity="0" />
        </linearGradient>
        <clipPath id="th-dieclip">
          <rect x="168" y="160" width="104" height="104" rx="14" />
        </clipPath>
      </defs>

      {/* aura */}
      <circle cx="220" cy="212" r="196" fill="url(#th-aura)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* circuit traces */}
      <g fill="none" stroke="#f8a3a7" strokeWidth="1.6" strokeOpacity="0.55">
        {TRACES.map((t, i) => (
          <path key={i} d={t.d} />
        ))}
      </g>

      {/* flowing data dots (node → chip) */}
      <g fill="#ff5a24">
        {TRACES.map((t, i) => (
          <circle key={i} r="3">
            <animateMotion
              dur={`${2.4 + (i % 3) * 0.6}s`}
              begin={`${-i * 0.5}s`}
              repeatCount="indefinite"
              keyPoints="1;0"
              keyTimes="0;1"
              calcMode="linear"
              path={t.d}
            />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${2.4 + (i % 3) * 0.6}s`} begin={`${-i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* outer nodes */}
      <g>
        {TRACES.map((t, i) => (
          <g key={i}>
            <circle cx={t.node[0]} cy={t.node[1]} r="8" fill="#f1575e" opacity="0.14" />
            <circle cx={t.node[0]} cy={t.node[1]} r="4.5" fill="#f1575e" stroke="#fff" strokeWidth="1.3">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* chip pins */}
      <g stroke="url(#th-chip)" strokeWidth="3" strokeLinecap="round">
        {PIN_X.map((x) => (
          <line key={`t${x}`} x1={x} y1={T} x2={x} y2={T - 10} />
        ))}
        {PIN_X.map((x) => (
          <line key={`b${x}`} x1={x} y1={B} x2={x} y2={B + 10} />
        ))}
        {PIN_Y.map((y) => (
          <line key={`l${y}`} x1={L} y1={y} x2={L - 10} y2={y} />
        ))}
        {PIN_Y.map((y) => (
          <line key={`r${y}`} x1={R} y1={y} x2={R + 10} y2={y} />
        ))}
      </g>

      {/* chip body */}
      <rect x={L} y={T} width={R - L} height={B - T} rx="20" fill="#fff" stroke="url(#th-chip)" strokeWidth="3" />
      <rect x="168" y="160" width="104" height="104" rx="14" fill="url(#th-die)" stroke="#fbc9cb" strokeWidth="1.5" />

      {/* die contents: embryo being analysed + scan */}
      <g clipPath="url(#th-dieclip)">
        <circle cx="220" cy="214" r="60" fill="#fff3f0" opacity="0.7" />
        {CELLS.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="url(#th-cell)" stroke="#e04d50" strokeOpacity="0.3" strokeWidth="1.1" />
            <circle cx={x - r * 0.32} cy={y - r * 0.34} r={r * 0.24} fill="#fff" opacity="0.9" />
          </g>
        ))}
        {/* scan sweep */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 -52;0 52;0 -52" dur="4s" repeatCount="indefinite" />
          <rect x="168" y="186" width="104" height="52" fill="url(#th-scan)" />
          <rect x="168" y="210.5" width="104" height="2.5" fill="#ff5a24" opacity="0.9" />
        </g>
        {/* analysis keypoints */}
        <g fill="#f1575e">
          {CELLS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.6" stroke="#fff" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </g>

      {/* corner reticle on the die */}
      <g stroke="#f1575e" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M182 172 h-10 v10" />
        <path d="M258 172 h10 v10" />
        <path d="M258 252 h10 v-10" />
        <path d="M182 252 h-10 v-10" />
      </g>

      <text
        x="220"
        y="322"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
        fontSize="16"
        fill="#f1575e"
      >
        EDGE AI
      </text>

      <text
        x="220"
        y="442"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", letterSpacing: "3px" }}
        fontSize="10"
        fontWeight="600"
        fill="#8f9bb0"
      >
        ON-DEVICE · EXPLAINABLE
      </text>
    </svg>
  );
}
