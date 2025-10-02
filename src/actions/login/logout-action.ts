"use server";

import { deleteLoginSession } from "@/lib/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  await asyncDelay(3000);
  await deleteLoginSession();
  redirect("/");
};
