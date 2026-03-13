import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const mdxComponents: MDXRemoteProps["components"] = {
  a: (props) => {
    const href = props.href ?? "";

    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className="underline decoration-muted underline-offset-4 hover:decoration-ink"
          {...props}
        />
      );
    }

    return (
      <a
        className="underline decoration-muted underline-offset-4 hover:decoration-ink"
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    );
  },
};

export async function renderMdx(source: string) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
    />
  );
}
