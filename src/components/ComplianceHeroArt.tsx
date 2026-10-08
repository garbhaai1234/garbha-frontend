/**
 * Compliance Hub hero illustrations, one per page, in the style of
 * TechHeroArt: brand gradients, a soft aura and light SMIL motion.
 * - "hub":  a balance weighing the two laws (ART document vs DPDP shield)
 * - "art":  a clinic register being ticked off, an embryo dish and a seal
 * - "dpdp": a shield with a lock, orbiting data records and a 72-hour clock
 * Text inside the art stays within the Latin-1 range, so it never pulls
 * extra web-font subsets.
 */

type Variant = "hub" | "art" | "dpdp";

const labels: Record<Variant, string> = {
  hub: "A balance weighing the ART Act and the DPDP Act — Garbha.ai Compliance Hub",
  art: "A clinic register ticked off against the ART Act, with an embryo dish and a registration seal",
  dpdp: "A shield and lock protecting patient data records, with a 72-hour breach clock",
};

const display = { fontFamily: "var(--font-display)", fontWeight: 800 } as const;
const sans = { fontFamily: "var(--font-sans)", fontWeight: 600 } as const;

/** Shared gradients; ids are prefixed per variant so several can coexist. */
function Defs({ p }: { p: string }) {
  return (
    <defs>
      <radialGradient id={`${p}-aura`} cx="0.5" cy="0.46" r="0.55">
        <stop stopColor="#f1575e" stopOpacity="0.22" />
        <stop offset="0.6" stopColor="#ff7a3c" stopOpacity="0.08" />
        <stop offset="1" stopColor="#f1575e" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${p}-brand`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#f1575e" />
        <stop offset="1" stopColor="#ff5a24" />
      </linearGradient>
      <linearGradient id={`${p}-paper`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#fff5f4" />
      </linearGradient>
      <radialGradient id={`${p}-cell`} cx="0.36" cy="0.3" r="0.85">
        <stop stopColor="#ffffff" />
        <stop offset="0.55" stopColor="#ffe4e5" />
        <stop offset="1" stopColor="#f47d82" />
      </radialGradient>
      <filter id={`${p}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#f1575e" floodOpacity="0.18" />
      </filter>
    </defs>
  );
}

function Aura({ p }: { p: string }) {
  return (
    <circle cx="220" cy="220" r="200" fill={`url(#${p}-aura)`}>
      <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" repeatCount="indefinite" />
    </circle>
  );
}

function Check({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="#fef4f4" stroke="#fbc9cb" strokeWidth="1.2" />
      <path
        d={`M${x - 4} ${y} l3 3 l5 -6`}
        fill="none"
        stroke="#f1575e"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="14"
        strokeDashoffset="14"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="14;0;0;14"
          keyTimes="0;0.15;0.85;1"
          dur="6s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

function Chip({
  x,
  y,
  w,
  text,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  delay?: number;
}) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0;0 -6;0 0"
        dur="5s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <rect x={x} y={y} width={w} height="30" rx="15" fill="#fff" stroke="#fbc9cb" strokeWidth="1.3" />
      <circle cx={x + 16} cy={y + 15} r="4" fill="#f1575e" />
      <text x={x + 28} y={y + 19.5} fontSize="11.5" fill="#3a4356" style={sans}>
        {text}
      </text>
    </g>
  );
}

/* ---------------------------------------------------------------- hub -- */

function HubArt() {
  const p = "ch";
  return (
    <>
      <Defs p={p} />
      <Aura p={p} />

      {/* base + pillar */}
      <path d="M170 392 h100 l-14 -26 h-72 Z" fill={`url(#${p}-brand)`} />
      <rect x="214" y="132" width="12" height="236" rx="6" fill={`url(#${p}-brand)`} />
      <circle cx="220" cy="122" r="16" fill="#fff" stroke={`url(#${p}-brand)`} strokeWidth="4" />
      <circle cx="220" cy="122" r="5" fill="#f1575e" />

      {/* beam + pans, gently rocking */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-3 220 122;3 220 122;-3 220 122"
          dur="7s"
          repeatCount="indefinite"
        />
        <rect x="70" y="117" width="300" height="10" rx="5" fill={`url(#${p}-brand)`} />

        {/* left pan: ART document */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="3 90 122;-3 90 122;3 90 122"
            dur="7s"
            repeatCount="indefinite"
          />
          <path d="M90 127 L50 230 M90 127 L130 230" stroke="#f8a3a7" strokeWidth="1.6" />
          <path d="M38 230 h104 a52 18 0 0 1 -104 0 Z" fill="#fff" stroke="#fbc9cb" strokeWidth="1.5" filter={`url(#${p}-shadow)`} />
          <g transform="translate(62 160)">
            <rect width="56" height="68" rx="7" fill={`url(#${p}-paper)`} stroke="#f8a3a7" strokeWidth="1.5" />
            <rect x="10" y="12" width="36" height="5" rx="2.5" fill="#f1575e" />
            <rect x="10" y="24" width="30" height="4" rx="2" fill="#fbc9cb" />
            <rect x="10" y="33" width="34" height="4" rx="2" fill="#fbc9cb" />
            <rect x="10" y="42" width="24" height="4" rx="2" fill="#fbc9cb" />
            <circle cx="42" cy="56" r="7" fill={`url(#${p}-brand)`} />
          </g>
          <text x="90" y="268" textAnchor="middle" fontSize="15" fill="#22262e" style={display}>
            ART ACT
          </text>
        </g>

        {/* right pan: DPDP shield */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="3 350 122;-3 350 122;3 350 122"
            dur="7s"
            repeatCount="indefinite"
          />
          <path d="M350 127 L310 230 M350 127 L390 230" stroke="#f8a3a7" strokeWidth="1.6" />
          <path d="M298 230 h104 a52 18 0 0 1 -104 0 Z" fill="#fff" stroke="#fbc9cb" strokeWidth="1.5" filter={`url(#${p}-shadow)`} />
          <g transform="translate(322 162)">
            <path d="M28 0 l28 10 v20 c0 18 -12 31 -28 38 c-16 -7 -28 -20 -28 -38 v-20 Z" fill={`url(#${p}-brand)`} />
            <rect x="19" y="30" width="18" height="15" rx="3" fill="#fff" />
            <path d="M22 30 v-5 a6 6 0 0 1 12 0 v5" fill="none" stroke="#fff" strokeWidth="3" />
          </g>
          <text x="350" y="268" textAnchor="middle" fontSize="15" fill="#22262e" style={display}>
            DPDP
          </text>
        </g>
      </g>

      <Chip x={24} y={316} w={128} text="Sec 16 · Sec 21" delay={0} />
      <Chip x={300} y={316} w={118} text="90-day rights" delay={1.4} />

      <text x="220" y="436" textAnchor="middle" fontSize="10" fill="#8f9bb0" style={{ ...sans, letterSpacing: "3px" }}>
        TWO LAWS · ONE CHECKLIST
      </text>
    </>
  );
}

/* ---------------------------------------------------------------- art -- */

const ART_ROWS = ["Registration", "Written consent", "Age limits", "10-year records"];
const DISH_CELLS: [number, number, number][] = [
  [-9, -7, 10],
  [9, -6, 9],
  [-2, 9, 11],
];

function ArtArt() {
  const p = "ca";
  return (
    <>
      <Defs p={p} />
      <Aura p={p} />

      {/* clipboard */}
      <g filter={`url(#${p}-shadow)`}>
        <rect x="96" y="78" width="230" height="300" rx="22" fill={`url(#${p}-paper)`} stroke="#fbc9cb" strokeWidth="1.6" />
      </g>
      <rect x="166" y="64" width="90" height="30" rx="10" fill={`url(#${p}-brand)`} />
      <circle cx="211" cy="79" r="5" fill="#fff" />

      <text x="122" y="132" fontSize="17" fill="#22262e" style={display}>
        Clinic register
      </text>
      <rect x="122" y="142" width="54" height="4" rx="2" fill="#f1575e" />

      {ART_ROWS.map((row, i) => {
        const y = 178 + i * 44;
        return (
          <g key={row}>
            <Check x={134} y={y} delay={i * 0.9} />
            <text x={154} y={y + 4.5} fontSize="13" fill="#3a4356" style={sans}>
              {row}
            </text>
            <rect x="154" y={y + 13} width={110 - i * 12} height="3.5" rx="1.75" fill="#eef1f5" />
          </g>
        );
      })}

      {/* embryo dish, bottom right */}
      <g transform="translate(330 318)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="330 318;330 310;330 318"
          dur="5s"
          repeatCount="indefinite"
        />
        <circle r="58" fill="#fff" stroke="#fbc9cb" strokeWidth="2" filter={`url(#${p}-shadow)`} />
        <circle r="46" fill="#fff8f6" stroke="#fde3e4" strokeWidth="1.5" />
        <circle r="30" fill="#fff3f0" stroke="#f8a3a7" strokeWidth="1.4" strokeDasharray="3 4">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="24s" repeatCount="indefinite" />
        </circle>
        {DISH_CELLS.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={`url(#${p}-cell)`} stroke="#e04d50" strokeOpacity="0.3" strokeWidth="1.1" />
            <circle cx={x - r * 0.32} cy={y - r * 0.34} r={r * 0.24} fill="#fff" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* registration seal, top right */}
      <g transform="translate(352 104)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="352 104;352 98;352 104"
          dur="6s"
          begin="1s"
          repeatCount="indefinite"
        />
        <circle r="40" fill={`url(#${p}-brand)`} filter={`url(#${p}-shadow)`} />
        <circle r="32" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" strokeDasharray="2 3" />
        <text y="-4" textAnchor="middle" fontSize="13" fill="#fff" style={display}>
          ART
        </text>
        <text y="12" textAnchor="middle" fontSize="10" fill="#fff" style={sans}>
          2021
        </text>
      </g>

      <Chip x={40} y={392} w={112} text="Valid 5 years" delay={0.6} />

      <text x="220" y="436" textAnchor="middle" fontSize="10" fill="#8f9bb0" style={{ ...sans, letterSpacing: "3px" }}>
        REGISTER · CONSENT · RECORD
      </text>
    </>
  );
}

/* --------------------------------------------------------------- dpdp -- */

const ORBIT = 132;
const RECORDS = [0, 72, 144, 216, 288];

function DpdpArt() {
  const p = "cd";
  return (
    <>
      <Defs p={p} />
      <Aura p={p} />

      {/* orbit rings */}
      <circle cx="220" cy="210" r={ORBIT} fill="none" stroke="#fbc9cb" strokeWidth="1.4" strokeDasharray="4 6" />
      <circle cx="220" cy="210" r="96" fill="none" stroke="#fde3e4" strokeWidth="1.2" />

      {/* orbiting data records */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 220 210;360 220 210" dur="40s" repeatCount="indefinite" />
        {RECORDS.map((deg) => {
          const a = (deg * Math.PI) / 180;
          const x = 220 + ORBIT * Math.cos(a);
          const y = 210 + ORBIT * Math.sin(a);
          return (
            <g key={deg} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              {/* counter-rotate so the record stays upright */}
              <g>
                <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="40s" repeatCount="indefinite" />
                <rect x="-17" y="-20" width="34" height="40" rx="6" fill="#fff" stroke="#f8a3a7" strokeWidth="1.4" filter={`url(#${p}-shadow)`} />
                <rect x="-10" y="-11" width="20" height="3.5" rx="1.75" fill="#f1575e" />
                <rect x="-10" y="-3" width="16" height="3" rx="1.5" fill="#fbc9cb" />
                <rect x="-10" y="4" width="18" height="3" rx="1.5" fill="#fbc9cb" />
                <circle cx="8" cy="12" r="3.2" fill="#f1575e" />
              </g>
            </g>
          );
        })}
      </g>

      {/* links from the shield to the ring */}
      <g stroke="#f8a3a7" strokeWidth="1.3" strokeOpacity="0.6">
        <line x1="220" y1="150" x2="220" y2="114" />
        <line x1="220" y1="270" x2="220" y2="306" />
        <line x1="160" y1="210" x2="124" y2="210" />
        <line x1="280" y1="210" x2="316" y2="210" />
      </g>

      {/* shield */}
      <g filter={`url(#${p}-shadow)`}>
        <path
          d="M220 130 l66 24 v46 c0 42 -28 72 -66 88 c-38 -16 -66 -46 -66 -88 v-46 Z"
          fill={`url(#${p}-brand)`}
        />
      </g>
      <path
        d="M220 146 l52 19 v36 c0 33 -22 57 -52 70 c-30 -13 -52 -37 -52 -70 v-36 Z"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      {/* lock */}
      <path d="M204 204 v-12 a16 16 0 0 1 32 0 v12" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <rect x="194" y="202" width="52" height="40" rx="8" fill="#fff" />
      <circle cx="220" cy="218" r="5" fill="#f1575e">
        <animate attributeName="r" values="5;6.5;5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <rect x="218" y="221" width="4" height="10" rx="2" fill="#f1575e" />

      {/* 72-hour clock, bottom left */}
      <g transform="translate(78 360)">
        <circle r="38" fill="#fff" stroke="#fbc9cb" strokeWidth="1.6" filter={`url(#${p}-shadow)`} />
        <circle r="30" fill="none" stroke="#fde3e4" strokeWidth="5" />
        <circle
          r="30"
          fill="none"
          stroke={`url(#${p}-brand)`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="188.5"
          strokeDashoffset="188.5"
          transform="rotate(-90)"
        >
          <animate attributeName="stroke-dashoffset" values="188.5;0;0" keyTimes="0;0.8;1" dur="6s" repeatCount="indefinite" />
        </circle>
        <text y="4" textAnchor="middle" fontSize="16" fill="#22262e" style={display}>
          72h
        </text>
      </g>

      <Chip x={290} y={346} w={130} text="Consent logged" delay={0.8} />
      <Chip x={290} y={28} w={118} text="Encrypted" delay={2} />

      <text x="220" y="436" textAnchor="middle" fontSize="10" fill="#8f9bb0" style={{ ...sans, letterSpacing: "3px" }}>
        NOTICE · CONSENT · SECURITY
      </text>
    </>
  );
}

export function ComplianceHeroArt({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 440 450" className={className} role="img" aria-label={labels[variant]}>
      {variant === "hub" && <HubArt />}
      {variant === "art" && <ArtArt />}
      {variant === "dpdp" && <DpdpArt />}
    </svg>
  );
}
