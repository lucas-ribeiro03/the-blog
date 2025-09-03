import { findPostBySlugCached } from "@/lib/queries";
import { Metadata } from "next";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await findPostBySlugCached(slug);
  return {
    title: post.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post = await findPostBySlugCached(slug);

  return <p>{post.title}</p>;
}
