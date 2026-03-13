export const POST_AREAS = [
  "procesos",
  "decisiones-arquitectura",
  "hallazgos-implementacion",
  "resultados-trabajo-diario",
] as const;

export type PostArea = (typeof POST_AREAS)[number];

export function isPostArea(value: string): value is PostArea {
  return POST_AREAS.includes(value as PostArea);
}

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  area: PostArea;
};

export type PostPreview = PostFrontmatter & {
  slug: string;
};

export type Post = PostPreview & {
  content: string;
};
