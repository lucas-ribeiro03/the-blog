import slugify from "slugify";
import { makeRandomString } from "./make-random-string";

export const makeSlugFromText = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    trim: true,
    strict: true,
  });
  return `${slug}${makeRandomString()}`;
};
