import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "src/drizzle/schemas.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./db.sqlite3",
  },
});
