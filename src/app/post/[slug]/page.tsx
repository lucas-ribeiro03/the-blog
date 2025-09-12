import SinglePost from "@/components/SinglePost";
import SpinLoader from "@/components/SpinLoader";
import { findPostBySlugCached } from "@/lib/queries";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-static";

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

  return (
    <Suspense fallback={<SpinLoader />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
