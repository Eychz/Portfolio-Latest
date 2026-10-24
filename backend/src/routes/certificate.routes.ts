import { Router } from "express";
import { certificateController } from "../controllers/certificate.controller.js";
import { cacheResponse } from "../middleware/cache.js";
import { validate } from "../middleware/validate.js";
import { CacheNamespace } from "../services/cache.service.js";
import { certificateQuerySchema } from "../schemas/certificate.schema.js";
import { slugParamSchema } from "../schemas/common.schema.js";

export const certificateRoutes = Router();

certificateRoutes.use(cacheResponse(CacheNamespace.certificates));
certificateRoutes.get("/", validate({ query: certificateQuerySchema }), certificateController.listPublished);
certificateRoutes.get("/:slug", validate({ params: slugParamSchema }), certificateController.getBySlug);
