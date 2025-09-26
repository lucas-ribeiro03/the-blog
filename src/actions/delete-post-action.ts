"use server";

import { postRepository } from "@/repositories/post";
import { revalidateTag } from "next/cache";

export const deletePostAction = async (id: string) => {
  if (!id || typeof id !== "string") return { error: "Dados inválidos" };

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: e.message,
      };
    }

    return {
      errors: "Erro desconhecido",
    };
  }
  revalidateTag("posts");
  revalidateTag(`post-${post.slug}`);
};
