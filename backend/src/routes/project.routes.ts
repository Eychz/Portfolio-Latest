import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";
import { cacheResponse } from "../middleware/cache.js";
import { validate } from "../middleware/validate.js";
import { CacheNamespace } from "../services/cache.service.js";
import { slugParamSchema } from "../schemas/common.schema.js";
import { projectQuerySchema } from "../schemas/project.schema.js";

export const projectRoutes = Router();

projectRoutes.use(cacheResponse(CacheNamespace.projects));
projectRoutes.get("/", validate({ query: projectQuerySchema }), projectController.listPublished);
projectRoutes.get("/:slug", validate({ params: slugParamSchema }), projectController.getBySlug);
