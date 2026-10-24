import type { RequestHandler } from "express";
import { config } from "../config/index.js";
import { authService } from "../services/auth.service.js";
import { ApiError } from "../utils/api-error.js";

function readToken(req: Parameters<RequestHandler>[0]) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);
  return req.cookies?.[config.auth.cookieName] as string | undefined;
}

/** Requires a valid session cookie or Bearer token and attaches `req.user`. */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = readToken(req);
  if (!token) return next(ApiError.unauthorized());
  try {
    req.user = authService.verifyToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole =
  (...roles: string[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (!roles.includes(req.user.role)) return next(ApiError.forbidden());
    next();
  };
