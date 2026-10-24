import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { getRedis } from "../lib/redis.js";

export const healthController = {
  async check(_req: Request, res: Response) {
    const database = await prisma.$queryRaw`SELECT 1`.then(() => "up").catch(() => "down");
    const redis = getRedis() ? "up" : "disabled";
    const status = database === "up" ? "ok" : "degraded";
    res.status(status === "ok" ? 200 : 503).json({ status, database, redis, uptime: process.uptime() });
  },
};
