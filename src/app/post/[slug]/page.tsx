import { findPostBySlugCached } from "@/lib/queries";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  console.log(slug);

  const post = await findPostBySlugCached(slug);
  console.log(post);
  return <p>{post.title}</p>;
}
