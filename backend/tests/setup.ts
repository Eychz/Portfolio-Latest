import { TEST_DATABASE_URL } from "./test-env.js";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL = TEST_DATABASE_URL;
process.env.REDIS_URL = "";
process.env.JWT_SECRET = "test-secret-that-is-at-least-32-characters-long";
