import Link from "next/link";
import { PostList } from "@/components/blog/PostList";
import { isPostArea } from "@/domain/Post";
import { Container } from "@/components/ui/Container";
import { PageTitle } from "@/components/ui/Typography";
import { buildPageMetadata } from "@/lib/metadata";
import { AREA_OPTIONS, getAreaLabel } from "@/lib/postAreas";
import { getPostService } from "@/lib/postService";

export const metadata = buildPageMetadata(
  "Blog técnico",
  "Listado de notas y publicaciones técnicas de muga.dev.",
  "/blog"
);

type BlogPageProps = {
  searchParams: Promise<{ area?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { area } = await searchParams;
  const selectedArea = area && isPostArea(area) ? area : null;

  const postService = getPostService();
  const posts = await postService.getAllPosts();
  const filteredPosts = selectedArea ? posts.filter((post) => post.area === selectedArea) : posts;
  const getAreaCount = (value: (typeof AREA_OPTIONS)[number]["value"]) =>
    posts.filter((post) => post.area === value).length;

  return (
    <Container className="py-14 md:py-16">
      <header className="mb-8 border-b border-line pb-8">
        <p className="text-sm uppercase tracking-wide text-muted">Archivo</p>
        <PageTitle>Blog</PageTitle>
        <p className="mt-3 text-muted">
          Lectura larga sobre procesos, arquitectura, implementación y resultados del trabajo diario.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded border px-2.5 py-1 text-xs ${
              !selectedArea
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            Todas ({posts.length})
          </Link>
          {AREA_OPTIONS.map((option) => {
            const isActive = selectedArea === option.value;
            return (
              <Link
                key={option.value}
                href={`/blog?area=${option.value}`}
                className={`rounded border px-2.5 py-1 text-xs ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:text-ink"
                }`}
              >
                {option.label} ({getAreaCount(option.value)})
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted">
          {filteredPosts.length} notas
          {selectedArea ? ` · ${getAreaLabel(selectedArea)}` : ""}
        </p>
      </header>

      <PostList posts={filteredPosts} variant="archive" />
    </Container>
  );
}
