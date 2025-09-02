import { findPostByIdCached } from "@/lib/queries";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await findPostByIdCached(slug);
  return <p>{post.title}</p>;
}
