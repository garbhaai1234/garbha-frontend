import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  tags: string[];
  readingTime: string;
  cover?: string; // path under /public
};

export type Post = PostMeta & {
  content: string;
};

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function fileToPost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "1970-01-01",
    author: data.author ?? "Garbha.ai",
    tags: data.tags ?? [],
    readingTime: readingTime(content),
    cover: data.cover ?? undefined,
    content,
  };
}

/**
 * Scheduled publishing: a post whose `date` is in the future stays hidden
 * (404, and absent from lists, tags, sitemap and RSS) until 09:00 IST on that
 * date. The blog index, post, tag, sitemap and RSS routes set
 * `revalidate = 3600`, so it goes live on its own within the hour — no
 * redeploy needed.
 */
export function isPublished(date: string, now = Date.now()): boolean {
  const publishAt = Date.parse(`${date}T09:00:00+05:30`);
  return Number.isNaN(publishAt) || publishAt <= now;
}

function readAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = fileToPost(f);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Published posts only, newest first. */
export function getAllPosts(): PostMeta[] {
  return readAllPosts().filter((p) => isPublished(p.date));
}

/**
 * Every post slug, including scheduled ones. Blog post routes are prebuilt
 * from this list (dynamicParams = false), so a scheduled post already has a
 * route that renders 404 until its date, then revalidates into the post.
 */
export function getAllPostSlugs(): string[] {
  return readAllPosts().map((p) => p.slug);
}

/** A published post, or undefined if missing or still scheduled. */
export function getPost(slug: string): Post | undefined {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? `${slug}.mdx` : fs.existsSync(md) ? `${slug}.md` : null;
  if (!file) return undefined;
  const post = fileToPost(file);
  return isPublished(post.date) ? post : undefined;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}

/** URL-safe slug from arbitrary text (tags, heading anchors). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type TagInfo = { name: string; slug: string; count: number };

/** Every tag across all posts, with post counts, most-used first. */
export function getAllTags(): TagInfo[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = slugify(tag);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { name: tag, count: 1 });
    }
  }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getTagName(tagSlug: string): string | undefined {
  return getAllTags().find((t) => t.slug === tagSlug)?.name;
}

export function getPostsByTag(tagSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.some((t) => slugify(t) === tagSlug));
}

/** Posts most related to `slug` — ranked by shared tags, then recency. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) =>
      b.score - a.score || (a.post.date < b.post.date ? 1 : -1),
    )
    .slice(0, limit)
    .map((x) => x.post);
}

export type Heading = { depth: 2 | 3; text: string; id: string };

/** Extract H2/H3 headings from raw MDX for a table of contents (skips code). */
export function extractHeadings(content: string): Heading[] {
  const out: Heading[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").trim();
    out.push({ depth: m[1].length as 2 | 3, text, id: slugify(text) });
  }
  return out;
}
