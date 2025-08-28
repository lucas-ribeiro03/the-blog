import { postRepository } from "@/repositories/post";

export default async function PostsList() {
  const posts = await postRepository.findAll();

  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
