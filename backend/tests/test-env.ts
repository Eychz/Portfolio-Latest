import "dotenv/config";

/** Tests run against a separate database so they never touch development data. */
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  (process.env.DATABASE_URL ?? "").replace(/\/([^/?]+)(\?|$)/, "/$1_test$2");
