import { drizzle } from "drizzle-orm/node-postgres";

import { relations } from "@/lib/db/relations";
import * as schema from "@/lib/db/schema";

export const db = drizzle({
  connection: {
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    database: process.env.POSTGRES_DB!,
    ssl: process.env.PRODUCTION === "true",
  },
  schema,
  casing: "snake_case",
  relations,
});
