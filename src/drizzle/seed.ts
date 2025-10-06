import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { PostTable } from "./schemas";

(async () => {
  await drizzleDb.delete(PostTable); //Limpar a base de dados antes de inserir os dados
  const postsJson = new JsonPostRepository();
  const posts = await postsJson.findAll();
  try {
    await drizzleDb.insert(PostTable).values(posts);
    console.log("Posts salvos");
  } catch (e) {
    console.log("Houve um erro");
    console.log(e);
  }
})();
