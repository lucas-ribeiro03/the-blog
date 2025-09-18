"use server";

export const DeletePostAction = async (formData: FormData) => {
  const id = formData.get("id");
  console.log(id);
};
