import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm",
  secondary:
    "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50",
  ghost: "text-ink-700 hover:text-brand-700 hover:bg-brand-50",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = clsx(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
