import { getZodErrorMessage } from "@/utils/get-zod-error-messages";
import { isUrlOrRelativePath } from "@/utils/is-url-or-relative-path";
import sanitizeHtml from "sanitize-html";
import z from "zod";

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(8, "Título deve conter no mínimo 8 caractéres")
    .max(70, "Título deve conter no máximo 70 caractéres"),
  content: z
    .string()
    .trim()
    .min(3, "Conteúdo obrigatório")
    .transform((val) => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, "Autor deve conter no mínimo 4 caractéres")
    .max(70, "Autor deve conter no máximo 30 caractéres"),
  excerpt: z
    .string()
    .trim()
    .min(4, "Autor deve conter no mínimo 4 caractéres")
    .max(200, "Autor deve conter no máximo 200 caractéres"),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: "URL da capa deve ser uma URL ou um caminho para imagem",
  }),
  published: z
    .union([
      z.literal("on"),
      z.literal("true"),
      z.literal("false"),
      z.literal(false),
      z.literal(true),
      z.literal(undefined),
      z.literal(null),
    ])
    .default(false)
    .transform((val) => val === "on" || val === true || val === "true"),
});

export const postCreateSchema = PostBaseSchema;
const obj = {
  author: "Pedro Martins",
  title: "Como a escrita pode mudar sua carreira",
  excerpt: "",
  content:
    "Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.",
  coverImageUrl: "/images/bryen_9.png",
  published: "on",
};

const zodParsedObj = postCreateSchema.safeParse(obj);
if (!zodParsedObj.success) {
  const errors = getZodErrorMessage(z.treeifyError(zodParsedObj.error));
  console.log(errors);
}
