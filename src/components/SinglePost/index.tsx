import { findPostBySlugPublic } from "@/lib/public";
import Image from "next/image";
import { PostHeading } from "../PostHeading";
import PostDate from "../PostDate";
import { SafeMarkdown } from "../SafeMarkdown";

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugPublic(slug);
  return (
    <article>
      <header className="flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          alt={post.title}
          src={post.coverImageUrl}
          width={1200}
          height={720}
        />

        <PostHeading as="h1" url={`/post/${post.slug}`} key={post.id}>
          {post.title}
        </PostHeading>
        <p className="flex items-center">
          {post.author} │ <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className="text-xl text-slate-600 mb-4">{post.excerpt}</p>
      <div>
        <SafeMarkdown markdown={post.content} />
      </div>
    </article>
  );
}
