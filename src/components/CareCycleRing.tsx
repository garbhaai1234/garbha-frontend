/**
 * The Garbha Care "cycle ring" (brief §2.1, §2.6): period in coral, the
 * fertile window in teal-500, estimated ovulation in teal-700, today as an
 * outlined marker — always with text labels. Below the ring: the countdowns,
 * a sample basal-temperature chart and a 28-day phase strip.
 * Sample cycle, illustration only. All motion is CSS, gated on
 * prefers-reduced-motion, and the static state is the finished drawing.
 */

const DAYS = 28;
const CX = 130;
const CY = 120;
const R = 88;
const W = 16;

function point(day: number, r = R) {
  // Day 1 starts at the top; days run clockwise.
  const a = ((day - 1) / DAYS) * 2 * Math.PI - Math.PI / 2;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

/** Arc covering whole days `from`..`to` (inclusive), inset slightly so caps don't touch. */
function arc(from: number, to: number) {
  const start = point(from + 0.15);
  const end = point(to + 0.85);
  const large = to + 1 - from > DAYS / 2 ? 1 : 0;
  return `M${start.x.toFixed(2)} ${start.y.toFixed(2)} A${R} ${R} 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

const period = { from: 1, to: 5 };
const fertile = { from: 9, to: 14 };
const ovulation = 14;
const today = 11;
const dayLabels = [1, 7, 14, 21];

/** Sample basal body temperature (°C): low before ovulation, a small dip, then the luteal rise. */
const bbt = [
  36.35, 36.3, 36.38, 36.32, 36.36, 36.33, 36.31, 36.37, 36.34, 36.3, 36.33, 36.31, 36.25, 36.2,
  36.48, 36.62, 36.7, 36.72, 36.74, 36.71, 36.75, 36.73, 36.76, 36.72, 36.7, 36.66, 36.55, 36.45,
];

// Temperature chart frame
const TX0 = 36;
const TX1 = 240;
const TY0 = 314;
const TY1 = 356;
const T_MIN = 36.1;
const T_MAX = 36.9;
const tx = (day: number) => TX0 + ((day - 1) / (DAYS - 1)) * (TX1 - TX0);
const ty = (t: number) => TY1 - ((t - T_MIN) / (T_MAX - T_MIN)) * (TY1 - TY0);
const line = (from: number, to: number) =>
  bbt
    .slice(from - 1, to)
    .map((t, i) => `${i ? "L" : "M"}${tx(from + i).toFixed(2)} ${ty(t).toFixed(2)}`)
    .join(" ");

// Phase strip
const SX0 = 20;
const SX1 = 240;
const SEG = (SX1 - SX0) / DAYS;

function phaseColour(day: number) {
  if (day === ovulation) return "#0F766E";
  if (day >= period.from && day <= period.to) return "#EF6164";
  if (day >= fertile.from && day <= fertile.to) return "#17A090";
  return "#E2E8F0";
}

function phaseName(day: number) {
  if (day >= period.from && day <= period.to) return "Period";
  if (day < ovulation) return "Follicular phase";
  if (day === ovulation) return "Ovulation";
  return "Luteal phase";
}

export function CareCycleRing({ className }: { className?: string }) {
  const ov = point(ovulation + 0.5);
  const td = point(today + 0.5);
  const daysToOvulation = ovulation - today;
  const daysToPeriod = DAYS - today + 1;

  const stats = [
    { value: `~${daysToOvulation} d`, label: "Est. ovulation", colour: "#0F766E" },
    { value: `~${daysToPeriod} d`, label: "Next period", colour: "#EF6164" },
    { value: `${DAYS} d`, label: "Cycle length", colour: "#64748B" },
  ];

  return (
    <svg
      viewBox="0 0 260 420"
      className={className}
      role="img"
      aria-label={`Sample cycle ring: period on days ${period.from} to ${period.to}, estimated fertile window on days ${fertile.from} to ${fertile.to}, estimated ovulation on day ${ovulation}, today is day ${today} (${phaseName(today).toLowerCase()}). Estimated ovulation in ${daysToOvulation} days, next period in about ${daysToPeriod} days. A sample basal temperature chart shows the rise after ovulation.`}
    >
      <defs>
        <linearGradient id="ccr-period" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F9A19A" />
          <stop offset="1" stopColor="#EF6164" />
        </linearGradient>
        <linearGradient id="ccr-fertile" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3CC9B5" />
          <stop offset="1" stopColor="#0F8F80" />
        </linearGradient>
        <linearGradient id="ccr-temp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F28B82" />
          <stop offset="0.5" stopColor="#17A090" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="ccr-luteal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE7E4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FDE7E4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ccr-core" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6FBF6" />
        </radialGradient>
        <radialGradient id="ccr-halo">
          <stop offset="0" stopColor="#17A090" stopOpacity="0.45" />
          <stop offset="1" stopColor="#17A090" stopOpacity="0" />
        </radialGradient>
        <filter id="ccr-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
        <filter id="ccr-ring-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F766E" floodOpacity="0.12" />
        </filter>
        <style>{`
          .ccr-shimmer { display: none }
          @media (prefers-reduced-motion: no-preference) {
            .ccr-draw { stroke-dasharray: 1; animation: ccr-draw 1.3s cubic-bezier(.22,1,.36,1) both }
            .ccr-pop { transform-box: fill-box; transform-origin: center; animation: ccr-pop .5s cubic-bezier(.34,1.56,.64,1) both }
            .ccr-fade { animation: ccr-fade .7s ease-out both }
            .ccr-rise { animation: ccr-rise .8s cubic-bezier(.22,1,.36,1) both }
            .ccr-pulse { transform-box: fill-box; transform-origin: center; animation: ccr-pulse 2.4s ease-out 1.4s infinite both }
            .ccr-glow { transform-box: fill-box; transform-origin: center; animation: ccr-glow 3s ease-in-out infinite alternate }
            .ccr-shimmer { display: inline; stroke-dasharray: .07 1; animation: ccr-shimmer 3.6s linear 1.6s infinite both }
            .ccr-grow { transform-box: fill-box; transform-origin: bottom; animation: ccr-grow .5s cubic-bezier(.22,1,.36,1) both }
            @keyframes ccr-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
            @keyframes ccr-pop { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }
            @keyframes ccr-fade { from { opacity: 0 } to { opacity: 1 } }
            @keyframes ccr-rise { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
            @keyframes ccr-pulse { 0% { transform: scale(1); opacity: .5 } 100% { transform: scale(2.1); opacity: 0 } }
            @keyframes ccr-glow { from { transform: scale(.85); opacity: .55 } to { transform: scale(1.3); opacity: 1 } }
            @keyframes ccr-shimmer { from { stroke-dashoffset: 1.07 } to { stroke-dashoffset: 0 } }
            @keyframes ccr-grow { from { transform: scaleY(0) } to { transform: scaleY(1) } }
          }
        `}</style>
      </defs>

      {/* ── Ring ─────────────────────────────────────────── */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#EEF2F6" strokeWidth={W} filter="url(#ccr-ring-shadow)" />

      {/* One small dot per day, coloured by phase */}
      {Array.from({ length: DAYS }, (_, i) => {
        const d = i + 1;
        const p = point(d + 0.5, R - W / 2 - 8);
        return (
          <circle
            key={d}
            className="ccr-pop"
            style={{ animationDelay: `${0.2 + i * 0.03}s` }}
            cx={p.x}
            cy={p.y}
            r={d === today ? 2.6 : 1.8}
            fill={phaseColour(d) === "#E2E8F0" ? "#CBD5E1" : phaseColour(d)}
            opacity={d === today ? 1 : 0.85}
          />
        );
      })}

      {/* Phase arcs, drawn in */}
      <path
        className="ccr-draw"
        pathLength={1}
        d={arc(period.from, period.to)}
        fill="none"
        stroke="url(#ccr-period)"
        strokeWidth={W}
        strokeLinecap="round"
      />
      <path
        className="ccr-draw"
        style={{ animationDelay: "0.35s" }}
        pathLength={1}
        d={arc(fertile.from, fertile.to)}
        fill="none"
        stroke="url(#ccr-fertile)"
        strokeWidth={W}
        strokeLinecap="round"
      />
      {/* A light travelling along the fertile window */}
      <path
        className="ccr-shimmer"
        pathLength={1}
        d={arc(fertile.from, fertile.to)}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth={W - 8}
        strokeLinecap="round"
      />

      {/* Day numbers outside the ring */}
      <g className="ccr-fade" style={{ animationDelay: "0.6s" }} fontSize="10" fontWeight="600" fill="#94A3B8" textAnchor="middle">
        {dayLabels.map((d) => {
          const p = point(d + 0.5, R + W / 2 + 10);
          return (
            <text key={d} x={p.x} y={p.y + 3.5}>
              {d}
            </text>
          );
        })}
      </g>

      {/* Centre */}
      <circle cx={CX} cy={CY} r={R - W / 2 - 16} fill="url(#ccr-core)" />
      <g className="ccr-rise" style={{ animationDelay: "0.3s" }}>
        <text x={CX} y={CY - 27} textAnchor="middle" fontSize="10.5" letterSpacing="1.2" fill="#64748B" fontWeight="700">
          CYCLE DAY
        </text>
        <text x={CX} y={CY + 9} textAnchor="middle" fontSize="42" fill="#0F172A" fontWeight="800">
          {today}
        </text>
        <text x={CX} y={CY + 24} textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="600">
          {phaseName(today)} · of {DAYS}
        </text>
        <rect x={CX - 48} y={CY + 31} width="96" height="18" rx="9" fill="#CCFBF1" />
        <circle cx={CX - 39} cy={CY + 40} r="2.5" fill="#17A090" />
        <text x={CX - 33} y={CY + 43.5} fontSize="9" fill="#0F766E" fontWeight="700">
          Fertile window · est.
        </text>
      </g>

      {/* Estimated ovulation, with a soft breathing halo */}
      <circle className="ccr-glow" cx={ov.x} cy={ov.y} r="17" fill="url(#ccr-halo)" />
      <g className="ccr-pop" style={{ animationDelay: "1.1s" }}>
        <circle cx={ov.x} cy={ov.y} r="9" fill="#0F766E" stroke="#fff" strokeWidth="3" filter="url(#ccr-soft)" />
        <circle cx={ov.x} cy={ov.y} r="2.5" fill="#fff" />
      </g>

      {/* Today */}
      <circle className="ccr-pulse" cx={td.x} cy={td.y} r="12" fill="#1E293B" opacity="0" />
      <g className="ccr-pop" style={{ animationDelay: "1.25s" }}>
        <circle cx={td.x} cy={td.y} r="12" fill="#fff" stroke="#1E293B" strokeWidth="3" filter="url(#ccr-soft)" />
        <circle cx={td.x} cy={td.y} r="4" fill="#1E293B" />
      </g>

      {/* ── Countdowns ───────────────────────────────────── */}
      {stats.map((s, i) => {
        const x = 12 + i * 80;
        return (
          <g key={s.label} className="ccr-rise" style={{ animationDelay: `${0.9 + i * 0.12}s` }}>
            <rect x={x} y="244" width="76" height="44" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
            <circle cx={x + 12} cy="259" r="3.5" fill={s.colour} />
            <text x={x + 20} y="263.5" fontSize="14" fill="#0F172A" fontWeight="800">
              {s.value}
            </text>
            <text x={x + 38} y="279" textAnchor="middle" fontSize="8.5" fill="#64748B" fontWeight="600">
              {s.label}
            </text>
          </g>
        );
      })}

      {/* ── Sample basal temperature ─────────────────────── */}
      <g className="ccr-fade" style={{ animationDelay: "1.1s" }}>
        <text x="20" y="305" fontSize="9" fill="#475569" fontWeight="700" letterSpacing="0.4">
          Basal temperature · sample
        </text>
        <text x="240" y="305" textAnchor="end" fontSize="8" fill="#94A3B8" fontWeight="600">
          °C
        </text>
        {/* Luteal (post-ovulation) zone and fertile band */}
        <rect x={tx(ovulation + 0.5)} y={TY0 - 2} width={TX1 - tx(ovulation + 0.5)} height={TY1 - TY0 + 4} fill="url(#ccr-luteal)" />
        <rect x={tx(fertile.from - 0.5)} y={TY0 - 2} width={tx(fertile.to + 0.5) - tx(fertile.from - 0.5)} height={TY1 - TY0 + 4} fill="#CCFBF1" opacity="0.5" />
        {[36.3, 36.7].map((t) => (
          <g key={t}>
            <line x1={TX0} x2={TX1} y1={ty(t)} y2={ty(t)} stroke="#E2E8F0" strokeDasharray="2 3" />
            <text x={TX0 - 4} y={ty(t) + 2.5} textAnchor="end" fontSize="7.5" fill="#94A3B8">
              {t.toFixed(1)}
            </text>
          </g>
        ))}
        {/* Today */}
        <line x1={tx(today)} x2={tx(today)} y1={TY0 - 4} y2={TY1 + 2} stroke="#1E293B" strokeOpacity="0.35" strokeDasharray="2 2" />
        {/* Expected after today */}
        <path d={line(today, DAYS)} fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
        <text x={tx(19)} y={ty(36.82)} textAnchor="middle" fontSize="7.5" fill="#0F766E" fontWeight="700">
          rise after ovulation
        </text>
      </g>
      {/* Logged so far, drawn in */}
      <path
        className="ccr-draw"
        style={{ animationDelay: "1.3s" }}
        pathLength={1}
        d={line(1, today)}
        fill="none"
        stroke="url(#ccr-temp)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {bbt.slice(0, today).map((t, i) => (
        <circle
          key={i}
          className="ccr-pop"
          style={{ animationDelay: `${1.4 + i * 0.07}s` }}
          cx={tx(i + 1)}
          cy={ty(t)}
          r={i + 1 === today ? 2.8 : 1.6}
          fill={i + 1 === today ? "#1E293B" : "#fff"}
          stroke={i + 1 === today ? "#fff" : "#17A090"}
          strokeWidth="1.2"
        />
      ))}

      {/* ── 28-day phase strip ───────────────────────────── */}
      {Array.from({ length: DAYS }, (_, i) => {
        const d = i + 1;
        return (
          <rect
            key={d}
            className="ccr-grow"
            style={{ animationDelay: `${1.5 + i * 0.02}s` }}
            x={SX0 + i * SEG + 0.6}
            y={d === today ? 364 : 366}
            width={SEG - 1.2}
            height={d === today ? 12 : 8}
            rx="2"
            fill={phaseColour(d)}
            stroke={d === today ? "#1E293B" : "none"}
            strokeWidth="1.5"
          />
        );
      })}
      <g fontSize="8" fill="#94A3B8" fontWeight="600" textAnchor="middle">
        <text x={SX0 + SEG / 2} y="387">1</text>
        <text x={SX0 + (ovulation - 0.5) * SEG} y="387">14</text>
        <text x={SX1 - SEG / 2} y="387">28</text>
      </g>

      {/* Legend: colour plus text, never colour alone */}
      <g fontSize="9.5" fill="#334155" fontWeight="500">
        <rect x="14" y="400" width="12" height="7" rx="3.5" fill="#EF6164" />
        <text x="30" y="407">Period</text>
        <rect x="70" y="400" width="12" height="7" rx="3.5" fill="#17A090" />
        <text x="86" y="407">Fertile</text>
        <circle cx="131" cy="403.5" r="5" fill="#0F766E" stroke="#fff" strokeWidth="1.5" />
        <text x="140" y="407">Ovulation</text>
        <circle cx="199" cy="403.5" r="5" fill="#fff" stroke="#1E293B" strokeWidth="2" />
        <circle cx="199" cy="403.5" r="1.8" fill="#1E293B" />
        <text x="208" y="407">Today</text>
      </g>
    </svg>
  );
}
