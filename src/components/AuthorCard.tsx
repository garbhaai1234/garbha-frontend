import Link from "next/link";
import { authorInitials, type Author } from "@/lib/authors";
import { clsx } from "@/lib/clsx";

/** Circular initials avatar in brand coral. */
export function AuthorAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display font-bold text-white",
        className,
      )}
      aria-hidden
    >
      {authorInitials(name)}
    </span>
  );
}

/** Full "About the author" card shown at the end of an article. */
export function AuthorCard({ author }: { author: Author }) {
  const body = (
    <>
      <AuthorAvatar name={author.name} className="h-14 w-14 text-lg" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          {author.role}
        </p>
        <p className="mt-1 font-display text-lg font-bold text-ink-900">
          {author.name}
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-500">{author.bio}</p>
      </div>
    </>
  );

  const className =
    "flex items-start gap-5 rounded-2xl border border-ink-100 bg-ink-50/60 p-6";

  return author.url ? (
    <Link
      href={author.url}
      className={clsx(className, "transition-colors hover:border-brand-200")}
    >
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
