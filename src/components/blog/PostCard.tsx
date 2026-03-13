import Link from "next/link";
import { PostPreview } from "@/domain/Post";
import { toEditorialExcerpt } from "@/lib/excerpt";
import { getAreaLabel } from "@/lib/postAreas";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

type PostCardProps = {
  post: PostPreview;
  variant?: "default" | "home" | "archive";
};

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const excerpt = toEditorialExcerpt(post.description);
  const areaLabel = getAreaLabel(post.area);

  if (variant === "home") {
    return (
      <article className="grid gap-3 py-6 md:grid-cols-[11rem_1fr] md:gap-6">
        <div className="space-y-2">
          <p className="text-sm text-muted">{formatDate(post.date)}</p>
          <Link
            href={`/blog?area=${post.area}`}
            className="inline-flex text-xs uppercase tracking-wide text-muted hover:text-ink"
          >
            {areaLabel}
          </Link>
        </div>
        <div>
          <h3 className="text-2xl font-medium tracking-tight">
            <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-reading text-muted">{excerpt}</p>
        </div>
      </article>
    );
  }

  if (variant === "archive") {
    return (
      <article className="grid gap-2 py-4 md:grid-cols-[9rem_1fr] md:gap-5">
        <div className="space-y-1">
          <p className="text-xs text-muted">{formatDate(post.date)}</p>
          <Link
            href={`/blog?area=${post.area}`}
            className="inline-flex text-[11px] uppercase tracking-wide text-muted hover:text-ink"
          >
            {areaLabel}
          </Link>
        </div>
        <div>
          <h2 className="text-xl font-medium tracking-tight">
            <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="mt-1 max-w-reading text-sm text-muted">{excerpt}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-line py-7">
      <div className="mb-2 flex items-center gap-3">
        <p className="text-sm text-muted">{formatDate(post.date)}</p>
        <Link href={`/blog?area=${post.area}`} className="text-xs uppercase tracking-wide text-muted hover:text-ink">
          {areaLabel}
        </Link>
      </div>
      <h2 className="text-2xl font-medium tracking-tight">
        <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 max-w-reading text-muted">{excerpt}</p>
    </article>
  );
}
