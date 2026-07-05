/**
 * Per-solution animated line-marks, in the shared "AI scan" style: a distinct
 * central subject (oocyte, sperm, embryo, ERA target, DNA, analytics) framed by
 * a slowly-rotating scan ring. Strokes are non-scaling so they stay crisp at
 * icon size; colour follows `currentColor`.
 */
export type SolutionMarkName =
  | "oocyte"
  | "sperm"
  | "embryo"
  | "era"
  | "dna"
  | "smart";

const s = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.6,
  vectorEffect: "non-scaling-stroke" as const,
};

const subjects: Record<SolutionMarkName, React.ReactNode> = {
  oocyte: (
    <>
      <circle {...s} cx="50" cy="50" r="15" />
      <circle {...s} cx="50" cy="50" r="22" strokeDasharray="2 4" opacity={0.6} />
      <circle {...s} cx="45.5" cy="45.5" r="5" />
    </>
  ),
  sperm: (
    <>
      <ellipse {...s} cx="35" cy="50" rx="9" ry="7" />
      <path {...s} d="M44 50 q7 -8 13 0 q6 8 12 0 q4 5 8 1" />
    </>
  ),
  embryo: (
    <>
      <circle {...s} cx="50" cy="50" r="21" />
      <circle {...s} cx="43" cy="43" r="8" />
      <circle {...s} cx="57" cy="43" r="8" />
      <circle {...s} cx="43" cy="57" r="8" />
      <circle {...s} cx="57" cy="57" r="8" />
    </>
  ),
  era: (
    <>
      <circle {...s} cx="50" cy="50" r="21" />
      <circle {...s} cx="50" cy="50" r="13" />
      <circle {...s} cx="50" cy="50" r="6" />
      <circle cx="50" cy="50" r="2.4" fill="currentColor" />
    </>
  ),
  dna: (
    <>
      <path {...s} d="M40 30 C40 42 60 42 60 50 C60 58 40 58 40 70" />
      <path {...s} d="M60 30 C60 42 40 42 40 50 C40 58 60 58 60 70" />
      <path {...s} d="M43 34h14M41.5 40.5h17M41.5 59.5h17M43 66h14" />
    </>
  ),
  smart: (
    <>
      <path {...s} d="M30 68 L44 52 L54 60 L72 37" />
      <path {...s} d="M64 37 h8 v8" />
      <path {...s} d="M30 72 h44" opacity={0.55} />
    </>
  ),
};

export function SolutionMark({
  name,
  className,
}: {
  name: SolutionMarkName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* central subject */}
      {subjects[name]}

      {/* rotating scan ring */}
      <g
        className="animate-spin-slow"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle
          {...s}
          cx="50"
          cy="50"
          r="45"
          strokeWidth={1.2}
          strokeDasharray="2 6"
          opacity={0.45}
        />
        <path
          {...s}
          strokeWidth={1.6}
          d="M50 5 A45 45 0 0 1 82 18"
          opacity={0.9}
        />
      </g>
    </svg>
  );
}
