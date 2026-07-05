import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { PostCard } from "@/components/PostCard";
import { BlogHeroArt } from "@/components/BlogHeroArt";
import { ArrowRight } from "@/components/Icons";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI and precision medicine in IVF and fertility care from the Garbha.ai team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <BlogHero />

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Articles, browsable by topic */}
          {tags.length > 0 && (
            <section className="py-14 sm:py-20">
              <Container>
                <Reveal>
                  <Kicker index="01">Articles</Kicker>
                  <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                    Explore by topic
                  </h2>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/blog/tag/${tag.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {tag.name}
                        <span className="rounded-full bg-ink-100 px-2 py-0.5 text-xs text-ink-500 group-hover:bg-white group-hover:text-brand-600">
                          {tag.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post, i) => (
                    <Reveal key={post.slug} delay={(i % 3) * 90} className="h-full">
                      <PostCard post={post} />
                    </Reveal>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* CTA */}
          <section className="border-t border-ink-100 py-14 sm:py-20">
            <Container>
              <Reveal>
                <Callout
                  eyebrow="See it in practice"
                  title={
                    <>
                      The technology behind the{" "}
                      <span className="italic text-brand-500">insights</span>
                    </>
                  }
                  description="Explore how Garbha.ai's explainable AI supports every decision in the IVF lab — or book a personalised demo."
                  actions={
                    <>
                      <Button href="/technology" variant="primary">
                        Explore the technology
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button href="/contact" variant="secondary" className="bg-white">
                        Book a demo
                      </Button>
                    </>
                  }
                />
              </Reveal>
            </Container>
          </section>
        </>
      )}
    </>
  );
}

const HERO_TOPICS = [
  "IVF",
  "Artificial Intelligence",
  "Embryology",
  "Precision Medicine",
];

function BlogHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-100">
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(90%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -right-20 top-8 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <Container className="pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              The Garbha.ai Journal
            </span>

            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink-900 sm:text-6xl lg:text-[4.25rem]">
              Insights on{" "}
              <span className="italic text-brand-500">AI &amp; precision medicine</span>{" "}
              in fertility
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-500">
              Plain-language perspectives on the technology transforming IVF and
              fertility care — from embryo grading to personalised treatment.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                Topics
              </span>
              {HERO_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink-600 backdrop-blur"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="animate-float relative mx-auto w-full max-w-[360px] lg:ml-auto lg:mr-0">
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-400/15 blur-2xl" />
              <div className="relative rounded-[2rem] bg-white/70 p-4 shadow-2xl shadow-brand-500/20 ring-1 ring-white/60 backdrop-blur-md">
                <BlogHeroArt className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl rounded-[2rem] bg-ink-50 px-8 py-16 text-center ring-1 ring-inset ring-ink-200/70">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Fresh insights are on the way
          </h2>
          <p className="mt-3 text-ink-500">
            We&rsquo;re preparing plain-language articles on AI and precision
            medicine in IVF. In the meantime, explore what we build.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/technology" variant="primary">
              Explore the technology
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/solutions" variant="secondary">
              View solutions
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
