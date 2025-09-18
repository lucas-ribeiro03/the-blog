import { findAllPostsAdmin } from "@/lib/queries/admin";
import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "../Admin/DeletePostButton";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className="py-6 flex gap-2 flex-col">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className={clsx(
              "flex gap-2 justify-between items-center py-2 px-2",
              !post.published && "bg-slate-600"
            )}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className="text-xs text-slate-400 italic">
                Não publicado
              </span>
            )}

            <DeletePostButton key={post.id} id={post.id} />
          </div>
        );
      })}
    </div>
  );
}
