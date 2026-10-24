import { Redis } from "ioredis";
import { env } from "../config/index.js";
import { logger } from "./logger.js";

/**
 * Redis is optional. When REDIS_URL is empty or the server is unreachable,
 * `getRedis()` returns null and callers skip caching instead of failing.
 */
let client: Redis | null = null;
let ready = false;

if (env.REDIS_URL) {
  client = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: (times) => Math.min(times * 500, 10_000),
  });
  client.on("ready", () => {
    ready = true;
    logger.info("Redis connected");
  });
  client.on("end", () => {
    ready = false;
  });
  client.on("error", (error) => {
    if (ready) logger.warn({ err: error }, "Redis connection lost, caching disabled");
    ready = false;
  });
}

export async function connectRedis() {
  if (!client) {
    logger.info("REDIS_URL not set, running without cache");
    return;
  }
  try {
    await client.connect();
  } catch (error) {
    logger.warn({ err: error }, "Redis unavailable, running without cache");
  }
}

export function getRedis(): Redis | null {
  return client && ready ? client : null;
}

export async function disconnectRedis() {
  if (client) await client.quit().catch(() => client?.disconnect());
}
