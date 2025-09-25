import { PostModel } from "@/models/post/post-model";

export type PublicPost = Omit<PostModel, "updatedAt">;

export const MakePartialPublicPost = (
  post?: Partial<PostModel>
): PublicPost => {
  return {
    author: post?.author || "",
    content: post?.content || "",
    coverImageUrl: post?.coverImageUrl || "",
    createdAt: post?.createdAt || "",
    excerpt: post?.excerpt || "",
    id: post?.id || "",
    published: post?.published || false,
    slug: post?.slug || "",
    title: post?.title || "",
  };
};

export const MakePublicPostFromDb = (post: PostModel): PublicPost => {
  return MakePartialPublicPost(post);
};
