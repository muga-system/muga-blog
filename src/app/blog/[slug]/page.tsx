import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/PostContent";
import { Container } from "@/components/ui/Container";
import { buildPostMetadata } from "@/lib/metadata";
import { getPostService } from "@/lib/postService";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const postService = getPostService();
  const posts = await postService.getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postService = getPostService();
  const post = await postService.getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postService = getPostService();
  const post = await postService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const adjacentPosts = await postService.getAdjacentPosts(slug);

  return (
    <Container className="py-14 md:py-16">
      <PostContent
        post={post}
        previousSlug={adjacentPosts.previous?.slug ?? null}
        nextSlug={adjacentPosts.next?.slug ?? null}
      />
    </Container>
  );
}
