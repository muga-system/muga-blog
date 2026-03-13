import type { Metadata } from "next";
import { PostPreview } from "@/domain/Post";

export const SITE_URL = "https://muga.dev";
export const SITE_NAME = "muga.dev";
export const SITE_DESCRIPTION =
  "Cuaderno técnico público sobre arquitectura, descubrimientos y procesos de desarrollo.";

export function buildPageMetadata(
  title: string,
  description: string,
  path = ""
): Metadata {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function buildPostMetadata(post: PostPreview): Metadata {
  const path = `/blog/${post.slug}`;
  const canonical = `${SITE_URL}${path}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}
