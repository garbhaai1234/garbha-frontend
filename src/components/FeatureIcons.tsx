/**
 * Faithful animated SVG recreations of the key Garbha feature icons, so the
 * sperm / cells actually move inside them. Coral line style, 64×64 viewBox.
 * Only the sperm-/egg-based icons are redrawn; the rest stay as PNGs.
 */

const CORAL = "#f1575e";

function Svg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke={CORAL}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Sperm that swims along `path` toward the egg, fading in and out, tail wiggling. */
function SwimSperm({
  path,
  dur,
  begin,
}: {
  path: string;
  dur: string;
  begin: string;
}) {
  return (
    <g opacity="0">
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto" path={path} />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.18;0.72;1"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />
      <ellipse cx="0" cy="0" rx="3" ry="2" fill={CORAL} stroke="none" />
      <path d="M-3 0 q -3.5 2.4 -7 0 q -3.5 -2.4 -7 0" strokeWidth="1.3">
        <animate
          attributeName="d"
          values="M-3 0 q -3.5 2.4 -7 0 q -3.5 -2.4 -7 0;M-3 0 q -3.5 -2.4 -7 0 q -3.5 2.4 -7 0;M-3 0 q -3.5 2.4 -7 0 q -3.5 -2.4 -7 0"
          dur="0.4s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

/** Upright sperm (tail pointing down) for the dish icon, bobbing + tail wiggling. */
function DishSperm({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <animateTransform
        attributeName="transform"
        additive="sum"
        type="translate"
        values="0 0;0 -1.6;0 0"
        dur="2.6s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <ellipse cx="0" cy="0" rx="4" ry="6" />
      <line x1="-2.4" y1="-2" x2="2.4" y2="-2" strokeWidth="1.3" />
      <line x1="-2.4" y1="2" x2="2.4" y2="2" strokeWidth="1.3" />
      <path d="M0 6 q 3.5 4 0 8 q -3.5 4 0 8" strokeWidth="1.6">
        <animate
          attributeName="d"
          values="M0 6 q 3.5 4 0 8 q -3.5 4 0 8;M0 6 q -3.5 4 0 8 q 3.5 4 0 8;M0 6 q 3.5 4 0 8 q -3.5 4 0 8"
          dur="0.5s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

function Dot({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <circle cx={cx} cy={cy} r={r} strokeWidth="1.6">
      <animate attributeName="stroke-opacity" values="0.35;1;0.35" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  );
}

export function FeatureIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    /* ---- Smarter Embryo Selection: sperm swimming toward the egg ---- */
    case "embryo":
      return (
        <Svg className={className}>
          <circle cx="32" cy="32" r="29" />
          <path d="M21 11 A24 24 0 0 0 21 53" strokeWidth="2" strokeOpacity="0.9" />
          {/* egg */}
          <circle cx="43" cy="24" r="7.5" />
          <path d="M39.5 21 a3.4 3.4 0 0 1 3.4 -2" strokeWidth="1.4" strokeOpacity="0.85" />
          {/* swimming sperm */}
          <SwimSperm path="M13 46 Q24 31 37 27" dur="3.2s" begin="0s" />
          <SwimSperm path="M11 34 Q22 24 35 22" dur="3.8s" begin="-1.6s" />
        </Svg>
      );

    /* ---- Sperm Selection: three sperm + drifting dots in a dish ---- */
    case "sperm":
      return (
        <Svg className={className}>
          <circle cx="32" cy="32" r="30" />
          <circle cx="32" cy="32" r="26" strokeOpacity="0.9" />
          <DishSperm x={24} y={25} delay={0} />
          <DishSperm x={34} y={21} delay={0.35} />
          <DishSperm x={43} y={29} delay={0.7} />
          <Dot cx={19} cy={42} r={2.2} delay={0.2} />
          <Dot cx={26} cy={47} r={1.6} delay={0.9} />
          <Dot cx={34} cy={45} r={2.4} delay={0.5} />
          <Dot cx={42} cy={44} r={1.6} delay={1.3} />
          <Dot cx={47} cy={38} r={1.8} delay={0.7} />
          <Dot cx={20} cy={20} r={1.6} delay={1.1} />
        </Svg>
      );

    /* ---- Oocyte Selection: cell with pulsing organelles ---- */
    case "oocyte":
      return (
        <Svg className={className}>
          <path
            d="M22 10 C11 14 8 28 12 39 C16 52 35 57 47 50 C57 44 57 29 51 21 C45 13 32 6 22 10 Z"
            strokeWidth="2.2"
          />
          {/* ER swoosh */}
          <path d="M14 33 C22 29 27 40 22 47" strokeWidth="1.6" strokeOpacity="0.75" />
          {/* nucleus */}
          <circle cx="28" cy="19" r="6">
            <animate attributeName="r" values="5.4;6.6;5.4" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* mitochondria */}
          {[
            { x: 38, y: 24, rot: 20 },
            { x: 44, y: 38, rot: -30 },
            { x: 30, y: 46, rot: 10 },
          ].map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${m.y}) rotate(${m.rot})`}>
              <ellipse cx="0" cy="0" rx="6" ry="3.2" strokeWidth="1.6" />
              <path d="M-4 0 l2 -1.6 l2 1.6 l2 -1.6 l2 1.6" strokeWidth="1.1" strokeOpacity="0.8" />
            </g>
          ))}
          {/* ribosome dots */}
          {[
            [36, 15, 0],
            [42, 30, 0.5],
            [37, 34, 1],
            [33, 30, 0.3],
            [40, 46, 0.8],
            [24, 40, 1.2],
            [22, 26, 0.6],
          ].map(([cx, cy, d], i) => (
            <Dot key={i} cx={cx} cy={cy} r={1.7} delay={d} />
          ))}
        </Svg>
      );

    /* ---- Tailored Hormone Therapy: syringe + pulsing/rotating pathogen, no-symbol ---- */
    case "hormone":
      return (
        <Svg className={className}>
          <circle cx="32" cy="32" r="29" />
          {/* prohibition slash */}
          <line x1="14" y1="50" x2="50" y2="14" strokeOpacity="0.9" />
          {/* syringe pointing down-left toward the pathogen */}
          <g transform="rotate(45 32 32)">
            <line x1="32" y1="11" x2="32" y2="15" strokeWidth="2" />
            <line x1="27.5" y1="15" x2="36.5" y2="15" />
            <rect x="28.5" y="15" width="7" height="16" rx="1.6" />
            <line x1="29.6" y1="19" x2="32.6" y2="19" strokeWidth="1.2" />
            <line x1="29.6" y1="22" x2="32.6" y2="22" strokeWidth="1.2" />
            <line x1="29.6" y1="25" x2="32.6" y2="25" strokeWidth="1.2" />
            <line x1="32" y1="31" x2="32" y2="40" />
          </g>
          {/* pathogen */}
          <g transform="translate(21 43)">
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="9s" repeatCount="indefinite" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                const r = (a * Math.PI) / 180;
                return (
                  <line key={a} x1={Math.cos(r) * 5} y1={Math.sin(r) * 5} x2={Math.cos(r) * 8} y2={Math.sin(r) * 8} strokeWidth="1.4" />
                );
              })}
            </g>
            <circle cx="0" cy="0" r="5.5">
              <animate attributeName="r" values="5;6.2;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="-1.4" cy="-0.8" r="1.1" fill={CORAL} stroke="none" />
            <circle cx="1.5" cy="1.4" r="1.1" fill={CORAL} stroke="none" />
          </g>
        </Svg>
      );

    /* ---- Precision Implantation: rotating gear + spinning refresh arrow ---- */
    case "implant":
      return (
        <Svg className={className}>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="16s" repeatCount="indefinite" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const x = 32 + Math.cos(a) * 25;
              const y = 32 + Math.sin(a) * 25;
              return <rect key={i} x={x - 3.4} y={y - 3.4} width="6.8" height="6.8" rx="1.6" transform={`rotate(${i * 45} ${x} ${y})`} />;
            })}
            <circle cx="32" cy="32" r="20" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="360 32 32" to="0 32 32" dur="4.5s" repeatCount="indefinite" />
            <path d="M41 27 A11 11 0 1 0 43.5 33.5" strokeWidth="2.3" />
            <path d="M41.5 20.5 L41 27 L34.5 26" strokeWidth="2.3" />
          </g>
        </Svg>
      );

    /* ---- Evidence-Based IVF: rotating measured dial + dropper with a falling drop ---- */
    case "evidence":
      return (
        <Svg className={className}>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="22s" repeatCount="indefinite" />
            <circle cx="32" cy="32" r="29" strokeWidth="2" />
            <circle cx="32" cy="32" r="23" strokeWidth="1.5" strokeOpacity="0.8" />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 * Math.PI) / 180;
              return (
                <line key={i} x1={32 + Math.cos(a) * 24} y1={32 + Math.sin(a) * 24} x2={32 + Math.cos(a) * 28} y2={32 + Math.sin(a) * 28} strokeWidth="1.6" />
              );
            })}
          </g>
          <path d="M19 39 A18 18 0 0 1 24 20" strokeWidth="1.6" strokeOpacity="0.55" />
          <g transform="rotate(22 32 28)">
            <rect x="29" y="16" width="6" height="15" rx="2" />
            <path d="M30 31 L34 31 L33 37 L31 37 Z" />
            <line x1="30.5" y1="19" x2="33.5" y2="19" strokeWidth="1.2" />
            <line x1="30.5" y1="22" x2="33.5" y2="22" strokeWidth="1.2" />
          </g>
          <path d="M33 40 q -2.4 3 0 5 q 2.4 -2 0 -5 Z" fill={CORAL} stroke="none">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.7;1" dur="2s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 5" keyTimes="0;0.7;1" dur="2s" repeatCount="indefinite" />
          </path>
        </Svg>
      );

    /* ---- Next-Gen Fertility Science: spiral embryo + sperm swimming in ---- */
    case "spiral":
      return (
        <Svg className={className}>
          <path
            d="M10 37 C10 18 34 8 47 21 C57 31 52 46 39 46 C29 46 24 37 30 30 C35 24 43 27 41 35"
            strokeWidth="2.4"
          />
          <circle cx="37" cy="33" r="3.2" />
          <SwimSperm path="M8 54 Q18 47 27 41" dur="3.4s" begin="0s" />
        </Svg>
      );

    /* ---- Smart IVF Analytics (ICSI): egg held by pipette, injecting needle ---- */
    case "icsi":
      return (
        <Svg className={className}>
          <circle cx="31" cy="34" r="15" />
          <circle cx="26" cy="34" r="4" />
          {/* holding pipette: fanned base cradling the egg on the left */}
          <path d="M4 24 L17 32 M4 30 L16 34 M4 42 L16 36 M4 48 L17 39" strokeWidth="1.9" />
          {/* injection micropipette (top-right), moving in and out with a sperm at the tip */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;-3.5 3;0 0" dur="2.6s" repeatCount="indefinite" />
            <line x1="35" y1="30" x2="55" y2="13" strokeWidth="2" />
            <line x1="50" y1="10" x2="59" y2="8" strokeWidth="3.2" />
            <ellipse cx="36.5" cy="29" rx="2" ry="1.3" fill={CORAL} stroke="none" />
          </g>
        </Svg>
      );

    default:
      return null;
  }
}
