/**
 * Garbha.ai embryo-scan illustration — a microscope scan-field holding a
 * blastocyst (the "eggs"), with an AI overlay: rotating dial, feature-detection
 * reticle + pulsing keypoints, a sweeping scan beam, and a 94% score ring.
 * Self-contained SVG (gradients, soft-glow filter, CSS + SMIL motion).
 */
const CX = 220;
const CY = 210;

export function HeroArt({ className }: { className?: string }) {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const major = i % 5 === 0;
    const R = 188;
    const r1 = R - (major ? 11 : 5);
    return {
      x1: CX + Math.cos(a) * r1,
      y1: CY + Math.sin(a) * r1,
      x2: CX + Math.cos(a) * R,
      y2: CY + Math.sin(a) * R,
      major,
    };
  });

  const C = 2 * Math.PI * 163;

  return (
    <svg
      viewBox="0 0 440 470"
      className={className}
      role="img"
      aria-label="AI analysing an embryo with a 93% score — Garbha.ai EmbryoScore"
    >
      <defs>
        <radialGradient id="ha-aura" cx="0.5" cy="0.45" r="0.55">
          <stop stopColor="#f1575e" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#ff7a3c" stopOpacity="0.1" />
          <stop offset="1" stopColor="#f1575e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ha-lensbg" cx="0.42" cy="0.36" r="0.7">
          <stop stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#fff5f4" />
          <stop offset="1" stopColor="#fde3e4" />
        </radialGradient>
        <radialGradient id="ha-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#fff3f0" />
          <stop offset="1" stopColor="#ffb59b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ha-cell" cx="0.36" cy="0.3" r="0.82">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#ffe4e5" />
          <stop offset="1" stopColor="#f47d82" />
        </radialGradient>
        <radialGradient id="ha-membrane" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.74" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.92" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f8a3a7" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="ha-score" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f1575e" />
          <stop offset="1" stopColor="#ff5a24" />
        </linearGradient>
        <linearGradient id="ha-scan" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f1575e" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ff5a24" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f1575e" stopOpacity="0" />
        </linearGradient>
        <filter id="ha-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id="ha-lensclip">
          <circle cx={CX} cy={CY} r="139" />
        </clipPath>
      </defs>

      <circle cx={CX} cy={CY} r="205" fill="url(#ha-aura)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" repeatCount="indefinite" />
      </circle>

      <g className="animate-spin-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? "#f1575e" : "#f8a3a7"}
            strokeOpacity={t.major ? 0.9 : 0.5}
            strokeWidth={t.major ? 2 : 1.2}
            strokeLinecap="round"
          />
        ))}
        <circle cx={CX} cy={CY - 188} r="5.5" fill="#f1575e" filter="url(#ha-soft)" />
        <circle cx={CX} cy={CY - 188} r="3" fill="#fff" />
        <circle cx={CX + 163} cy={CY + 94} r="4.5" fill="#ff5a24" filter="url(#ha-soft)" />
        <circle cx={CX - 163} cy={CY + 94} r="4.5" fill="#f47d82" filter="url(#ha-soft)" />
      </g>

      {/* score ring: track + 94% progress */}
      <circle cx={CX} cy={CY} r="163" fill="none" stroke="#fde3e4" strokeWidth="4" />
      <circle
        cx={CX}
        cy={CY}
        r="163"
        fill="none"
        stroke="url(#ha-score)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${0.93 * C} ${C}`}
        transform={`rotate(-90 ${CX} ${CY})`}
      />

      <circle cx={CX} cy={CY} r="139" fill="url(#ha-lensbg)" />
      <circle cx={CX} cy={CY} r="139" fill="none" stroke="#fbc9cb" strokeWidth="1.5" />

      <g clipPath="url(#ha-lensclip)">
        <g stroke="#f1575e" strokeOpacity="0.1" strokeWidth="1" fill="none">
          <circle cx={CX} cy={CY} r="50" />
          <circle cx={CX} cy={CY} r="98" />
          <line x1={CX - 139} y1={CY} x2={CX + 139} y2={CY} />
          <line x1={CX} y1={CY - 139} x2={CX} y2={CY + 139} />
        </g>
        <circle cx={CX} cy={CY + 4} r="94" fill="url(#ha-core)" />
        <Cell cx={198} cy={196} r={26} />
        <Cell cx={243} cy={200} r={24} />
        <Cell cx={220} cy={240} r={27} />
        <Cell cx={185} cy={228} r={18} />
        <Cell cx={256} cy={232} r={18} />
        <Cell cx={224} cy={180} r={17} />
        <Cell cx={206} cy={222} r={15} />
        <Cell cx={237} cy={224} r={14} />
        <circle cx={CX} cy={CY + 4} r="78" fill="url(#ha-membrane)" />
        <circle cx={CX} cy={CY + 4} r="78" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="1.6" />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 -142;0 142;0 -142" dur="4.5s" repeatCount="indefinite" />
          <rect x={CX - 140} y={CY - 26} width="280" height="52" fill="url(#ha-scan)" />
          <rect x={CX - 140} y={CY - 1.5} width="280" height="3" fill="#ff5a24" opacity="0.9" />
        </g>

        {/* swimming sperm circling the egg cluster */}
        <Sperm path="M110 210 C130 145 310 145 330 210 C310 275 130 275 110 210 Z" dur="7s" begin="0s" />
        <Sperm path="M150 205 C168 158 272 164 286 210 C274 256 158 254 150 205 Z" dur="5.5s" begin="-2s" />
        <Sperm path="M135 176 C205 126 336 186 300 240 C262 298 118 258 135 176 Z" dur="8.6s" begin="-4s" />
        <Sperm path="M172 236 C200 202 258 206 274 236 C258 268 190 270 172 236 Z" dur="6.2s" begin="-1s" />
      </g>

      <g stroke="#f1575e" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M144 170 L144 142 L172 142" />
        <path d="M296 142 L324 142 L324 170" />
        <path d="M324 274 L324 302 L296 302" />
        <path d="M172 302 L144 302 L144 274" />
      </g>

      <g fill="#f1575e">
        {[
          [198, 196],
          [243, 200],
          [220, 240],
          [224, 180],
          [185, 228],
          [256, 232],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.6" stroke="#fff" strokeWidth="1.3">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      <text x={CX} y="432" textAnchor="middle" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }} fontSize="34" fill="#f1575e">
        93%
      </text>
      <text x={CX} y="452" textAnchor="middle" style={{ fontFamily: "var(--font-sans)", letterSpacing: "3px" }} fontSize="10" fontWeight="600" fill="#8f9bb0">
        AI EMBRYO SCORE
      </text>
    </svg>
  );
}

/** A single sperm that swims along `path` inside the lens, tail wiggling. */
function Sperm({
  path,
  dur,
  begin,
}: {
  path: string;
  dur: string;
  begin: string;
}) {
  return (
    <g>
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        rotate="auto"
        path={path}
      />
      <ellipse cx="0" cy="0" rx="4" ry="2.8" fill="#f1575e" />
      <path
        d="M-4 0 q -5 4 -10 0 q -5 -4 -10 0"
        fill="none"
        stroke="#f1575e"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M-4 0 q -5 4 -10 0 q -5 -4 -10 0;M-4 0 q -5 -4 -10 0 q -5 4 -10 0;M-4 0 q -5 4 -10 0 q -5 -4 -10 0"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

function Cell({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#ha-cell)" stroke="#e04d50" strokeOpacity="0.3" strokeWidth="1.2" />
      <circle cx={cx - r * 0.32} cy={cy - r * 0.34} r={r * 0.26} fill="#ffffff" opacity="0.9" />
    </g>
  );
}
