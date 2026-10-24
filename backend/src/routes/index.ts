import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";
import { adminRoutes } from "./admin.routes.js";
import { authRoutes } from "./auth.routes.js";
import { certificateRoutes } from "./certificate.routes.js";
import { contactRoutes } from "./contact.routes.js";
import { projectRoutes } from "./project.routes.js";

export const routes = Router();

routes.get("/health", healthController.check);
routes.use("/auth", authRoutes);
routes.use("/projects", projectRoutes);
routes.use("/certificates", certificateRoutes);
routes.use("/contact", contactRoutes);
routes.use("/admin", adminRoutes);
