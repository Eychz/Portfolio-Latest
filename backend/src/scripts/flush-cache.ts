/** Clears all cached API responses. Usage: npm run cache:flush */
import { connectRedis, disconnectRedis, getRedis } from "../lib/redis.js";
import { cacheService } from "../services/cache.service.js";

await connectRedis();
if (!getRedis()) {
  console.log("Redis is not available, nothing to flush");
} else {
  await cacheService.flushAll();
  console.log("Cache flushed");
}
await disconnectRedis();
