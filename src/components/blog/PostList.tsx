import { PostPreview } from "@/domain/Post";
import { PostCard } from "@/components/blog/PostCard";

type PostListProps = {
  posts: PostPreview[];
  variant?: "default" | "home" | "archive";
};

export function PostList({ posts, variant = "default" }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-muted">Todavía no hay publicaciones.</p>;
  }

  if (variant === "home") {
    return (
      <div className="border-y border-line">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`${index < posts.length - 1 ? "border-b border-line" : ""}`}
          >
            <PostCard post={post} variant="home" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "archive") {
    return (
      <div className="border-y border-line">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`${index < posts.length - 1 ? "border-b border-line" : ""}`}
          >
            <PostCard post={post} variant="archive" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
