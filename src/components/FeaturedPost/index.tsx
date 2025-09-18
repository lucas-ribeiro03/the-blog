import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import ErrorMessage from "../ErrorMessage";

export const FeaturedPost = async () => {
  const posts = await postRepository.findAllPublic();
  if (posts.length <= 0)
    return (
      <ErrorMessage content="Ainda não há posts criados" contentTitle="Ops!" />
    );

  const post = posts[0];
  const postLink = `/post/${post.slug}`;
  return (
    <section className="grid grid-cols-1 gap-8 mb-5 sm:grid-cols-2 sm: items-center group">
      {posts.length <= 0 && (
        <ErrorMessage
          content="Ainda não há posts criados"
          contentTitle="Ops!"
        />
      )}
      <PostCoverImage
        imageProps={{
          alt: post.title,
          src: post.coverImageUrl,
          width: 1200,
          height: 720,
          priority: true,
        }}
        linkProps={{ href: postLink }}
      />
      <PostSummary
        postLink={postLink}
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        title={post.title}
        key={post.id}
      />
    </section>
  );
};
