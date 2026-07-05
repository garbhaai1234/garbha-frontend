import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
      <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        {eyebrow && <Kicker>{eyebrow}</Kicker>}
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold leading-[1.03] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-500">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
