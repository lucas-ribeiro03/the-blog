import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/lib/queries/public";

export default async function PostsList() {
  const posts = await findAllPublicPosts();
  if (posts.length <= 1) return null;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;

        return (
          <div key={post.id} className="flex flex-col gap-4 group">
            <PostCoverImage
              imageProps={{
                alt: "Alt da imagem",
                src: post.coverImageUrl,
                width: 1200,
                height: 720,
              }}
              linkProps={{ href: postLink }}
            />
            <PostSummary
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              title={post.title}
              postLink={postLink}
              key={post.id}
            />
          </div>
        );
      })}
    </div>
  );
}
