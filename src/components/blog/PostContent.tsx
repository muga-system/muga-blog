import Link from "next/link";
import { Post } from "@/domain/Post";
import { renderMdx } from "@/lib/mdx";
import { getAreaLabel } from "@/lib/postAreas";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

type PostContentProps = {
  post: Post;
  previousSlug: string | null;
  nextSlug: string | null;
};

export async function PostContent({ post, previousSlug, nextSlug }: PostContentProps) {
  const mdx = await renderMdx(post.content);

  return (
    <article>
      <header className="mb-12 border-b border-line pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted">
          <p>{formatDate(post.date)}</p>
          <span>·</span>
          <Link href={`/blog?area=${post.area}`} className="uppercase tracking-wide hover:text-ink">
            {getAreaLabel(post.area)}
          </Link>
        </div>
        <h1 className="max-w-reading text-4xl font-medium tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 max-w-reading text-muted">{post.description}</p>
      </header>

      <div className="article-content">{mdx}</div>

      <nav
        className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7 text-sm"
        aria-label="Navegación de artículos"
      >
        {previousSlug ? (
          <Link href={`/blog/${previousSlug}`} className="text-muted hover:text-ink">
            ← Artículo anterior
          </Link>
        ) : (
          <span className="text-muted">&nbsp;</span>
        )}

        {nextSlug ? (
          <Link href={`/blog/${nextSlug}`} className="text-muted hover:text-ink">
            Artículo siguiente →
          </Link>
        ) : (
          <span className="text-muted">&nbsp;</span>
        )}
      </nav>
    </article>
  );
}
