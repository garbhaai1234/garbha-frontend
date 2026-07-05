import { clsx } from "@/lib/clsx";
import { Kicker } from "@/components/Kicker";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <Kicker>{children}</Kicker>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className={clsx(align === "center" && "flex justify-center")}>
          <Kicker>{eyebrow}</Kicker>
        </div>
      )}
      <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-8 text-ink-500">{description}</p>
      )}
    </div>
  );
}
