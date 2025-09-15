import SinglePost from "@/components/SinglePost";
import SpinLoader from "@/components/SpinLoader";
import { findPostBySlugPublic } from "@/lib/public";
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

  const post = await findPostBySlugPublic(slug);
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
