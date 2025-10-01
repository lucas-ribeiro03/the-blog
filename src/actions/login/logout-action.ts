"use server";

import { asyncDelay } from "@/utils/async-delay";

export const logoutAction = async () => {
  await asyncDelay(3000);
};
