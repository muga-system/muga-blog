import { Post, PostPreview } from "@/domain/Post";

export interface PostRepository {
  getAllPosts(): Promise<PostPreview[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
}
