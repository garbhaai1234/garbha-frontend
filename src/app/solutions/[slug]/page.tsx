import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Check, ArrowRight } from "@/components/Icons";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { solutions, getSolution } from "@/content/solutions";
import { TmName } from "@/components/TmName";
import { breadcrumbSchema, faqSchema, absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

const solutionKeywords: Record<string, string[]> = {
  "sperm-selection": [
    "AI sperm selection",
    "AI sperm quality analysis",
    "ICSI sperm selection AI",
    "sperm morphology AI",
  ],
  "oocyte-selection": [
    "AI oocyte selection",
    "oocyte quality assessment AI",
    "egg quality AI IVF",
  ],
  "embryo-scoring": [
    "AI embryo grading",
    "AI embryo selection",
    "EmbryoScore",
    "embryo grading software",
    "time-lapse embryo AI",
  ],
  "endometrial-receptivity": [
    "endometrial receptivity analysis",
    "ERA test AI",
    "implantation window AI",
    "non-invasive ERA",
  ],
  "smart-ivf": ["Smart IVF AI", "IVF analytics", "AI IVF workflow"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: solution.summary,
    keywords: solutionKeywords[solution.slug],
    alternates: {
      canonical: `/solutions/${solution.slug}`,
    },
    openGraph: {
      type: "website",
      title: solution.name,
      description: solution.summary,
      url: `/solutions/${solution.slug}`,
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.slug !== solution.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: solution.name,
    description: solution.summary,
    url: absoluteUrl(`/solutions/${solution.slug}`),
    image: absoluteUrl(solution.image),
    provider: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd
        data={[
          serviceSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: solution.name, path: `/solutions/${solution.slug}` },
          ]),
          ...(solution.faqs?.length ? [faqSchema(solution.faqs)] : []),
        ]}
      />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:radial-gradient(80%_55%_at_50%_0%,black,transparent)]" />
        <Container className="py-16 sm:py-24">
          <Reveal>
            <Link
              href="/solutions"
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              ← All solutions
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-8">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
                  <Image
                    src={solution.image}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                  {solution.tagline}
                </p>
              </div>
              <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
                <TmName name={solution.name} />
              </h1>
            </Reveal>

            <Reveal className="lg:col-span-4 lg:self-end" delay={120}>
              <p className="text-lg leading-8 text-ink-500">
                {solution.overview}
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Request a demo <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Kicker index="01">Key benefits</Kicker>
            <ul className="mt-10">
              {solution.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-4 border-t border-ink-100 py-4"
                >
                  <span className="mt-1 shrink-0 text-brand-500">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="text-base leading-7 text-ink-700">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <Kicker index="02">How it works</Kicker>
            <ol className="mt-10 space-y-10">
              {solution.howItWorks.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="font-display text-3xl font-bold text-brand-500/90 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-ink-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {solution.faqs && solution.faqs.length > 0 && (
        <section className="border-t border-ink-100 py-14 sm:py-20">
          <Container className="max-w-3xl">
            <Reveal>
              <Kicker index="03">FAQ</Kicker>
              <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                Frequently asked questions
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <Accordion
                items={solution.faqs.map((f) => ({ q: f.q, a: f.a }))}
              />
            </Reveal>
          </Container>
        </section>
      )}

      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="04">More</Kicker>
            <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Explore more solutions
            </h2>
          </Reveal>

          <div className="mt-14 border-t border-ink-200">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-ink-200 py-7 transition-colors hover:bg-ink-50 sm:gap-10 sm:px-4"
                >
                  <span className="font-display text-2xl font-bold text-ink-300 transition-colors group-hover:text-brand-500 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
                      <TmName name={s.shortName} />
                    </h3>
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
