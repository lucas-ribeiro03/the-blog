import { findAllPostsAdmin } from "@/lib/queries/admin";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className="py-6 flex gap-2 flex-col">
      {posts.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
