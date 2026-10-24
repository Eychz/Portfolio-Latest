import { rateLimit } from "express-rate-limit";
import { config, isTest } from "../config/index.js";

const shared = {
  windowMs: config.rateLimit.windowMs,
  standardHeaders: "draft-8" as const,
  legacyHeaders: false,
  skip: () => isTest,
  message: { error: { message: "Too many requests, please try again later" } },
};

export const apiLimiter = rateLimit({ ...shared, limit: config.rateLimit.max });

// Slows down password guessing on the login endpoint
export const authLimiter = rateLimit({ ...shared, limit: config.rateLimit.authMax, skipSuccessfulRequests: true });

export const contactLimiter = rateLimit({ ...shared, windowMs: 60 * 60 * 1000, limit: config.rateLimit.contactMax });
