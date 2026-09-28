import Link from "next/link";
import Image from "next/image";
import { formatDate, type PostMeta } from "@/lib/blog";

/** Blog index grid card — cover, tags, title, excerpt and meta footer. */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="aspect-[16/10] overflow-hidden bg-ink-50">
        {post.cover && (
          <Image
            src={post.cover}
            alt={post.title}
            width={640}
            height={400}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            unoptimized={post.cover.endsWith(".svg")}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-brand-600">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-500">
          {post.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6 text-xs text-ink-400">
          <span className="font-medium text-ink-600">{post.author}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
