import { PublicPost } from "@/dto/dto";

type createPostActionState = {
  formState: PublicPost;
  errors: string[];
};

export const createPostAction = async (
  prevState: createPostActionState,
  formData: FormData
): Promise<createPostActionState> => {
  const title = formData.get("title")?.toString() || "";

  return {
    formState: { ...prevState.formState, title },
    errors: [],
  };
};
