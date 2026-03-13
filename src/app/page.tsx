import Link from "next/link";
import { PostList } from "@/components/blog/PostList";
import { Container } from "@/components/ui/Container";
import { Lead, PageTitle } from "@/components/ui/Typography";
import { buildPageMetadata } from "@/lib/metadata";
import { AREA_OPTIONS } from "@/lib/postAreas";
import { getPostService } from "@/lib/postService";

export const metadata = buildPageMetadata(
  "Cuaderno técnico",
  "Notas de laboratorio sobre arquitectura web, procesos, descubrimientos y resultados.",
  "/"
);

export default async function HomePage() {
  const postService = getPostService();
  const posts = await postService.getAllPosts();
  const recentPosts = posts.slice(0, 6);
  const getAreaCount = (area: (typeof AREA_OPTIONS)[number]["value"]) =>
    posts.filter((post) => post.area === area).length;

  return (
    <Container className="py-14 md:py-16">
      <section className="space-y-6 border-b border-line pb-12">
        <p className="text-sm uppercase tracking-wide text-muted">Cuaderno técnico público</p>
        <PageTitle>Notas de estudio de muga.dev</PageTitle>
        <Lead>
          Este sitio documenta procesos, decisiones de arquitectura, hallazgos de implementación y
          resultados del trabajo diario.
        </Lead>
        <div className="flex flex-wrap gap-2 pt-1">
          {AREA_OPTIONS.map((area) => (
            <Link
              key={area.value}
              href={`/blog?area=${area.value}`}
              className="rounded border border-line px-2.5 py-1 text-xs text-muted hover:text-ink"
            >
              {area.label} ({getAreaCount(area.value)})
            </Link>
          ))}
        </div>
        <Link href="/blog" className="inline-block text-sm text-muted hover:text-ink">
          Ver todas las publicaciones →
        </Link>
      </section>

      <section className="pt-10">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="text-sm uppercase tracking-wide text-muted">Publicaciones recientes</h2>
          <p className="text-xs text-muted">{recentPosts.length} notas</p>
        </div>
        <PostList posts={recentPosts} variant="home" />
      </section>
    </Container>
  );
}
