type IconProps = React.SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Garbha.ai wordmark logo: a stylised seed/embryo inside a protective ring. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <svg viewBox="0 0 32 32" className="h-8 w-8" role="img">
        <circle cx="16" cy="16" r="13" fill="none" stroke="url(#g)" strokeWidth="2.2" />
        <path
          d="M16 9c3.4 1.6 5 4.2 5 7 0 3.3-2.4 6-5 7-2.6-1-5-3.7-5-7 0-2.8 1.6-5.4 5-7Z"
          fill="url(#g)"
        />
        <circle cx="16" cy="15" r="2.2" fill="#fff" />
        <defs>
          <linearGradient id="g" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14b8a6" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Linkedin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.5 8A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h3v1.4c.5-.9 1.6-1.6 3-1.6 2.3 0 3 1.5 3 4V19h-3v-4.3c0-1.2-.4-1.9-1.4-1.9-1 0-1.6.7-1.6 1.9V19h-3v-9Z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
