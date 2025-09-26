import { ZodError } from "zod";

export function getZodErrorMessage(error: ZodError): string[] {
  return Object.values(error)
    .map((field) => {
      if (Array.isArray(field)) return field;
      return field?._errors || [];
    })
    .flat()
    .filter(Boolean);
}
