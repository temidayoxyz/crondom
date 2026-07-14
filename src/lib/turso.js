import { createClient } from "@libsql/client/web";

const url = import.meta.env.VITE_TURSO_DATABASE_URL;
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error(
    "Missing VITE_TURSO_DATABASE_URL or VITE_TURSO_AUTH_TOKEN. " +
    "Create a .env file based on .env.example"
  );
}

export const turso = createClient({ url, authToken });
