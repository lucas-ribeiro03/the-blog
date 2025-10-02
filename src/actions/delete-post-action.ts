"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { postRepository } from "@/repositories/post";
import { revalidateTag } from "next/cache";

export const deletePostAction = async (id: string) => {
  if (!id || typeof id !== "string") return { error: "Dados inválidos" };

  let post;

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      errors: "Você precisa estar logado para fazer isso",
    };
  }
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
