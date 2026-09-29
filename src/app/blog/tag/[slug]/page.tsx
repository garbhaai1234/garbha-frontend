import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/Icons";
import {
  getAllTags,
  getAllTagSlugs,
  getPostsByTag,
  getTagName,
} from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/seo";

// Picks up scheduled posts (and their new tags) once they are published.
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllTagSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = getTagName(slug);
  if (!name) return {};
  return {
    title: `${name} — Blog`,
    description: `Articles tagged “${name}” — insights on AI and precision medicine in IVF from Garbha.ai.`,
    alternates: { canonical: `/blog/tag/${slug}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = getTagName(slug);
  if (!name) notFound();

  const posts = getPostsByTag(slug);
  const otherTags = getAllTags().filter((t) => t.slug !== slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name, path: `/blog/tag/${slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-ink-100 bg-radial-brand">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
        <Container className="py-14 sm:py-20">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            ← All articles
          </Link>
          <div className="mt-8">
            <Kicker>Topic</Kicker>
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-6xl">
            {name}
          </h1>
          <p className="mt-5 text-lg text-ink-500">
            {posts.length} article{posts.length === 1 ? "" : "s"} on {name}.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 90} className="h-full">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>

          {otherTags.length > 0 && (
            <div className="mt-16 border-t border-ink-100 pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                Other topics
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {otherTags.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/blog/tag/${t.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    {t.name}
                    <span className="text-ink-400 group-hover:text-brand-500">
                      {t.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Back to all articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
