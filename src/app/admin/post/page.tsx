import { postRepository } from "@/repositories/post";

export const dynamic = "force-dynamic";

export default async function AdminPostPage() {
  const posts = await postRepository.findAll();

  return (
    <div className="py-6 flex gap-2 flex-col">
      {posts.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
