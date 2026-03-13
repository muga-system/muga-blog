import { MDXPostRepository } from "@/infrastructure/MDXPostRepository";
import { PostService } from "@/services/PostService";

const postService = new PostService(new MDXPostRepository());

export function getPostService(): PostService {
  return postService;
}
