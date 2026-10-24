import { createApp } from "./app.js";
import { env } from "./config/index.js";
import { logger } from "./lib/logger.js";
import { prisma } from "./lib/prisma.js";
import { connectRedis, disconnectRedis } from "./lib/redis.js";

async function start() {
  await prisma.$connect();
  await connectRedis();

  const server = createApp().listen(env.PORT, () => {
    logger.info(`API listening on http://localhost:${env.PORT}`);
  });

  const shutdown = (signal: string) => {
    logger.info(`${signal} received, shutting down`);
    server.close(async () => {
      await Promise.allSettled([prisma.$disconnect(), disconnectRedis()]);
      process.exit(0);
    });
    // Force exit if connections don't drain in time
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((error) => {
  logger.fatal({ err: error }, "Failed to start server");
  process.exit(1);
});
