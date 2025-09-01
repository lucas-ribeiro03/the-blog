import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";
import { dateDistanceToNow, formatDate } from "@/utils/format-datetime";

export default async function PostsList() {
  const posts = await postRepository.findAll();

  console.log(posts);
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-4 group">
          <PostCoverImage
            imageProps={{
              alt: "Alt da imagem",
              src: post.coverImageUrl,
              width: 1200,
              height: 720,
            }}
            linkProps={{ href: post.slug }}
          />
          <div className="flex flex-col gap-4 sm:justify-center">
            <time
              dateTime={formatDate(post.createdAt)}
              className="text-slate-600 block text-sm/tight"
              title={dateDistanceToNow(post.createdAt)}
            >
              {formatDate(post.createdAt)}
            </time>

            <PostHeading as="h2" url="#">
              {post.title}
            </PostHeading>
            <p>{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
