import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { PostCard } from "@/components/PostCard";
import { AuthorCard, AuthorAvatar } from "@/components/AuthorCard";
import { TableOfContents } from "@/components/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllPostSlugs,
  getPost,
  getRelatedPosts,
  extractHeadings,
  formatDate,
  slugify,
} from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

// Only prebuilt posts exist; any other slug is a 404 without rendering at
// request time (previously an unknown slug surfaced as a 500 in production).
export const dynamicParams = false;

// Scheduled posts are prebuilt as 404s and turn into the post after their
// publish time (see isPublished in lib/blog).
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

/** Flatten React children to plain text for slugified heading anchors. */
function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && "props" in node) {
    return toText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

// Heading overrides give each H2/H3 an id so the TOC can link to it;
// external links open in a new tab with safe rel attributes.
const mdxComponents = {
  h2: (props: { children?: ReactNode }) => (
    <h2 {...props} id={slugify(toText(props.children))} className="scroll-mt-24" />
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3 {...props} id={slugify(toText(props.children))} className="scroll-mt-24" />
  ),
  a: (props: { href?: string; children?: ReactNode }) => {
    const isExternal = /^https?:\/\//i.test(props.href ?? "");
    return isExternal ? (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ) : (
      <a {...props} />
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post.slug, 3);

  return (
    <article>
      <JsonLd
        data={[
          articleSchema(post, author),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* header */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-radial-brand">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              ← Back to blog
            </Link>

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${slugify(tag)}`}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-500 transition-colors hover:text-brand-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink-500">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="flex items-center gap-3">
                <AuthorAvatar name={author.name} className="h-10 w-10 text-sm" />
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-ink-800">{author.name}</p>
                  <p className="text-ink-400">{author.role}</p>
                </div>
              </div>
              <span className="hidden text-ink-300 sm:inline" aria-hidden>
                ·
              </span>
              <div className="flex items-center gap-3 text-sm text-ink-400">
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {post.cover && (
        <Container className="pt-10">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-ink-100">
            <Image
              src={post.cover}
              alt={post.title}
              width={1024}
              height={576}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 808px) 768px, 100vw"
              unoptimized={post.cover.endsWith(".svg")}
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      )}

      {/* body + table of contents */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
            <div className="min-w-0">
              <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink-900 prose-h2:mt-10 prose-h2:text-2xl prose-a:text-brand-700 prose-strong:text-ink-900 prose-blockquote:border-brand-300 prose-blockquote:text-ink-600">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>

              <div className="mt-14">
                <AuthorCard author={author} />
              </div>
            </div>

            {headings.length >= 2 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </Container>
      </section>

      {/* related posts */}
      {related.length > 0 && (
        <section className="border-t border-ink-100 py-14 sm:py-20">
          <Container>
            <Kicker>Keep reading</Kicker>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Related articles
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Callout
            className="mx-auto max-w-4xl"
            eyebrow="Book a demo"
            title={
              <>
                See Garbha.ai in your{" "}
                <span className="italic text-brand-500">clinic</span>
              </>
            }
            description="Book a personalised demo of our AI-powered IVF solutions."
            actions={
              <Button href="/contact" variant="primary">
                Book a demo
              </Button>
            }
          />
        </Container>
      </section>
    </article>
  );
}
