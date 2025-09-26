"use server";
import { PublicPost } from "@/dto/dto";

type createPostActionState = {
  formState: PublicPost;
  errors: string[];
};

export const createPostAction = async (
  prevState: createPostActionState,
  formData: FormData
): Promise<createPostActionState> => {
  const formDataToObj = Object.fromEntries(formData.entries());
  console.log(formDataToObj);

  return {
    formState: { ...prevState.formState },
    errors: [],
  };
};
