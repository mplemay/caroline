import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./lib/db/schema/auth.ts"],
  dialect: "postgresql",
  strict: true,
  verbose: true,
  casing: "snake_case",
  migrations: {
    schema: "public",
  },
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    ssl: process.env.PRODUCTION === "true",
  },
});
