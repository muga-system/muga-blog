import { Post, PostPreview } from "@/domain/Post";
import { PostRepository } from "@/domain/PostRepository";

export class PostService {
  private readonly postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async getAllPosts(): Promise<PostPreview[]> {
    const posts = await this.postRepository.getAllPosts();
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }

  async getRecentPosts(limit: number): Promise<PostPreview[]> {
    const posts = await this.getAllPosts();
    return posts.slice(0, limit);
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return this.postRepository.getPostBySlug(slug);
  }

  async getAdjacentPosts(
    slug: string
  ): Promise<{ previous: PostPreview | null; next: PostPreview | null }> {
    const posts = await this.getAllPosts();
    const currentIndex = posts.findIndex((post) => post.slug === slug);

    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    return {
      previous: posts[currentIndex + 1] ?? null,
      next: posts[currentIndex - 1] ?? null,
    };
  }
}
