import type { RequestHandler } from "express";
import { type CacheNamespace, cacheService } from "../services/cache.service.js";

/**
 * Caches successful JSON GET responses in Redis, keyed by URL. Sets an
 * `X-Cache: HIT|MISS` header. Services invalidate the namespace on writes.
 */
export const cacheResponse =
  (namespace: CacheNamespace, ttlSeconds?: number): RequestHandler =>
  async (req, res, next) => {
    if (req.method !== "GET") return next();

    const cacheKey = req.originalUrl;
    const cached = await cacheService.get<unknown>(namespace, cacheKey);
    if (cached) {
      res.setHeader("X-Cache", "HIT");
      return res.json(cached);
    }

    res.setHeader("X-Cache", "MISS");
    const originalJson = res.json.bind(res);
    res.json = (body: unknown) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        void cacheService.set(namespace, cacheKey, body, ttlSeconds);
      }
      return originalJson(body);
    };
    next();
  };
