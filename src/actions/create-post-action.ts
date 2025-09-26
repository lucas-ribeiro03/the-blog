"use server";
import { drizzleDb } from "@/drizzle";
import { PostTable } from "@/drizzle/schemas";
import { MakePartialPublicPost, PublicPost } from "@/dto/dto";
import { postCreateSchema } from "@/lib/post/validation";
import { PostModel } from "@/models/post/post-model";
import { getZodErrorMessage } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type createPostActionState = {
  formState: PublicPost;
  errors: string[];
};

export const createPostAction = async (
  prevState: createPostActionState,
  formData: FormData
): Promise<createPostActionState> => {
  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = postCreateSchema.safeParse(formDataToObj);
  if (!zodParsedObj.success) {
    const errors = getZodErrorMessage(zodParsedObj.error);
    return {
      errors,
      formState: MakePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  };

  await drizzleDb.insert(PostTable).values(newPost);
  revalidateTag("posts");
  redirect(`/admin/post/${newPost.id}`);

  return {
    formState: newPost,
    errors: [],
  };
};
