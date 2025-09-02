import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

export default async function PostsList() {
  const posts = await postRepository.findAllPublic();

  console.log(posts);
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(1).map((post) => (
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
          <PostSummary
            createdAt={post.createdAt}
            excerpt={post.excerpt}
            title={post.title}
            key={post.id}
          />
        </div>
      ))}
    </div>
  );
}
