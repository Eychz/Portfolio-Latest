import type { ErrorRequestHandler, RequestHandler } from "express";
import { isProduction } from "../config/index.js";
import { logger } from "../lib/logger.js";
import { ApiError } from "../utils/api-error.js";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: { message: error.message, ...(error.details ? { details: error.details } : {}) },
    });
  }

  // Malformed JSON bodies from express.json()
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: { message: "Malformed JSON body" } });
  }

  logger.error({ err: error, path: req.originalUrl }, "Unhandled error");
  res.status(500).json({
    error: { message: isProduction ? "Internal server error" : (error as Error).message },
  });
};
