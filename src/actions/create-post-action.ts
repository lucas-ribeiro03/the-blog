"use server";
import { MakePartialPublicPost, PublicPost } from "@/dto/dto";
import { postCreateSchema } from "@/lib/post/validation";
import { getZodErrorMessage } from "@/utils/get-zod-error-messages";

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

  return {
    formState: { ...prevState.formState },
    errors: [],
  };
};
