import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";
import { solutions } from "@/content/solutions";
import { TmName } from "@/components/TmName";

export const metadata: Metadata = {
  title: "AI IVF Solutions — Embryo, Sperm & Oocyte Selection",
  description:
    "Explore Garbha.ai's AI-powered IVF solutions: AI embryo grading (EmbryoScore), sperm and oocyte selection, endometrial receptivity analysis and Smart IVF analytics.",
  alternates: { canonical: "/solutions" },
  keywords: [
    "AI IVF solutions",
    "AI embryo grading",
    "AI sperm selection",
    "AI oocyte selection",
    "endometrial receptivity analysis",
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-24">
          <Reveal>
            <Kicker index="01">Solutions</Kicker>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
                A modular AI suite for the modern IVF lab
              </h1>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:self-end" delay={120}>
              <p className="text-lg leading-8 text-ink-500">
                Each Garbha.ai module gives your team an objective, interpretable
                signal — from gamete selection through to implantation timing and
                personalised protocols.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-8 sm:py-12">
        <Container>
          <div className="border-t border-ink-200">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-ink-200 py-7 transition-colors hover:bg-ink-50 sm:gap-10 sm:px-4"
                >
                  <span className="font-display text-2xl font-bold text-ink-300 transition-colors group-hover:text-brand-500 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
                      <TmName name={s.shortName} />
                    </h2>
                    <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-6 text-ink-500 sm:mt-2">
                      {s.summary}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
