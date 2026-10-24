import { execSync } from "node:child_process";
import { TEST_DATABASE_URL } from "./test-env.js";

// Applies migrations to the test database (creating it if needed); tests clear their own tables
export default function setup() {
  execSync("npx prisma migrate deploy", {
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
    stdio: "ignore",
  });
}
