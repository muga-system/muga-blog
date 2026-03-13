import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { isPostArea, Post, PostArea, PostPreview } from "@/domain/Post";
import { PostRepository } from "@/domain/PostRepository";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function buildSlug(fileName: string): string {
  return fileName.replace(/\.mdx$/, "");
}

function isMdxFile(fileName: string): boolean {
  return fileName.endsWith(".mdx");
}

function parseArea(value: unknown): PostArea {
  const area = String(value ?? "procesos");
  return isPostArea(area) ? area : "procesos";
}

export class MDXPostRepository implements PostRepository {
  async getAllPosts(): Promise<PostPreview[]> {
    const files = await readdir(POSTS_DIR);
    const mdxFiles = files.filter(isMdxFile);

    const posts = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const slug = buildSlug(fileName);
        const filePath = path.join(POSTS_DIR, fileName);
        const rawContent = await readFile(filePath, "utf-8");
        const { data } = matter(rawContent);

        return {
          slug,
          title: String(data.title ?? "Sin título"),
          date: String(data.date ?? ""),
          description: String(data.description ?? ""),
          area: parseArea(data.area),
        };
      })
    );

    return posts;
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

    try {
      const rawContent = await readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);

      return {
        slug,
        title: String(data.title ?? "Sin título"),
        date: String(data.date ?? ""),
        description: String(data.description ?? ""),
        area: parseArea(data.area),
        content,
      };
    } catch {
      return null;
    }
  }
}
