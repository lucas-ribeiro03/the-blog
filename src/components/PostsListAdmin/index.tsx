import { findAllPostsAdmin } from "@/lib/queries/admin";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

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
            <button
              aria-label="Apagar post"
              title="Apagar post"
              className="text-red-500 cursor-pointer transition duration-200 [&_svg]:h-4 [&_svg]:w-4 hover:scale-150 hover:text-red-700"
            >
              <Trash2Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
