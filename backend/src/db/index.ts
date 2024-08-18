import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connection = postgres(
  process.env.DATABASE_URL ||
    "postresql://chatapp:chatapp@localhost:5432/chatapp",
  // Disable notice logs from postgres
  { onnotice: () => {} }
);
export const db = drizzle(connection, { schema });
