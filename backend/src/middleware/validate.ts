import type { RequestHandler } from "express";
import { z, type ZodType } from "zod";
import { ApiError } from "../utils/api-error.js";

type Schemas = { body?: ZodType; query?: ZodType; params?: ZodType };

/**
 * Validates and coerces request input. Parsed values replace the originals,
 * so controllers can read `req.body` / `res.locals.query` with correct types.
 */
export const validate =
  (schemas: Schemas): RequestHandler =>
  (req, res, next) => {
    for (const part of ["params", "query", "body"] as const) {
      const schema = schemas[part];
      if (!schema) continue;
      const result = schema.safeParse(req[part] ?? {});
      if (!result.success) {
        return next(ApiError.badRequest("Validation failed", z.flattenError(result.error).fieldErrors));
      }
      // Express 5 exposes req.query as a getter, so parsed queries live on res.locals
      if (part === "query") res.locals.query = result.data;
      else req[part] = result.data;
    }
    next();
  };
