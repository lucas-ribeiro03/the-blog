import { drizzleDb } from ".";
import { PostTable } from "./schemas";

(async () => {
  const posts = await drizzleDb.select().from(PostTable);

  console.log(posts);
})();
