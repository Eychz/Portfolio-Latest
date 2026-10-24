import { config } from "../config/index.js";
import { getRedis } from "../lib/redis.js";
import { logger } from "../lib/logger.js";

export const CacheNamespace = {
  projects: "projects",
  certificates: "certificates",
} as const;

export type CacheNamespace = (typeof CacheNamespace)[keyof typeof CacheNamespace];

const key = (namespace: string, id: string) => `${config.cache.prefix}${namespace}:${id}`;

/**
 * Thin cache-aside helper over Redis. Every method is a no-op when Redis is
 * unavailable, so the API keeps working (just uncached) without it.
 */
export const cacheService = {
  async get<T>(namespace: CacheNamespace, id: string): Promise<T | null> {
    const redis = getRedis();
    if (!redis) return null;
    try {
      const raw = await redis.get(key(namespace, id));
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (error) {
      logger.warn({ err: error }, "Cache read failed");
      return null;
    }
  },

  async set(namespace: CacheNamespace, id: string, value: unknown, ttlSeconds = config.cache.ttlSeconds) {
    const redis = getRedis();
    if (!redis) return;
    try {
      await redis.set(key(namespace, id), JSON.stringify(value), "EX", ttlSeconds);
    } catch (error) {
      logger.warn({ err: error }, "Cache write failed");
    }
  },

  /** Deletes every cached entry in a namespace (used after writes). */
  async invalidate(namespace: CacheNamespace) {
    const redis = getRedis();
    if (!redis) return;
    try {
      let cursor = "0";
      do {
        const [next, keys] = await redis.scan(cursor, "MATCH", key(namespace, "*"), "COUNT", 200);
        cursor = next;
        if (keys.length) await redis.unlink(...keys);
      } while (cursor !== "0");
    } catch (error) {
      logger.warn({ err: error, namespace }, "Cache invalidation failed");
    }
  },

  async flushAll() {
    await Promise.all(Object.values(CacheNamespace).map((namespace) => this.invalidate(namespace)));
  },
};
