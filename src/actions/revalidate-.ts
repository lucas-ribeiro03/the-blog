"use server";

import { revalidateTag } from "next/cache";

export async function revalidateAction() {
  revalidateTag("posts");
  revalidateTag("post-rotina-matinal-de-pessoas-altamente-eficazes");
}
