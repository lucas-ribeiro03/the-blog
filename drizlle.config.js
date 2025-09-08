import { DefineConfig } from "drizzle-kit";

export default DefineConfig({
  out: "./src/drizzle/migrations",
  schema: "src/drizzle/schemas.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./db.sqlite3",
  },
});
