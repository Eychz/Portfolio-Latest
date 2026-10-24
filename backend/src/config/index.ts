import { env, isProduction } from "./env.js";

export { env, isProduction, isTest } from "./env.js";

export const config = {
  corsOrigins: env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean),
  auth: {
    cookieName: "portfolio_session",
    cookieMaxAgeMs: 7 * 24 * 60 * 60 * 1000,
    secureCookies: isProduction,
  },
  cache: {
    prefix: "portfolio:",
    ttlSeconds: env.CACHE_TTL_SECONDS,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 300,
    authMax: 10,
    contactMax: 5,
  },
} as const;
