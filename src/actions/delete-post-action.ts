"use server";

import { drizzleDb } from "@/drizzle";
import { PostTable } from "@/drizzle/schemas";
import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const deletePostAction = async (id: string) => {
  await asyncDelay(2000);
  if (!id || typeof id !== "string") return { error: "Dados inválidos" };
  const post = await postRepository.findById(id).catch(() => undefined);
  if (!post)
    return {
      error: "Post não encontrado",
    };

  await drizzleDb.delete(PostTable).where(eq(PostTable.id, id));
  revalidateTag("posts");
  revalidateTag(`post-${post.slug}`);
};
