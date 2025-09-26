"use server";

import {
  MakePartialPublicPost,
  MakePublicPostFromDb,
  PublicPost,
} from "@/dto/dto";
import { postUpdateSchema } from "@/lib/post/validation";
import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessage } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type updatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export const updatePostAction = async (
  prevState: updatePostActionState,
  formData: FormData
): Promise<updatePostActionState> => {
  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = postUpdateSchema.safeParse(formDataToObj);
  if (!zodParsedObj.success) {
    const errors = getZodErrorMessage(zodParsedObj.error);
    return {
      errors,
      formState: MakePartialPublicPost(formDataToObj),
    };
  }

  const id = formData.get("id")?.toString();
  if (!id || typeof id !== "string") {
    return {
      errors: ["Id inválido"],
      formState: prevState.formState,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post: PostModel;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e) {
    if (e instanceof Error) {
      return {
        formState: MakePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: MakePartialPublicPost(formDataToObj),
      errors: ["Erro desconhecido"],
    };
  }
  revalidateTag("posts");
  redirect(`post-${post.slug}`);

  return {
    formState: MakePublicPostFromDb(post),
    errors: [],
    success: true,
  };
};
