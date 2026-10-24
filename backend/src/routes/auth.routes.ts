import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rate-limit.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../schemas/auth.schema.js";

export const authRoutes = Router();

authRoutes.post("/login", authLimiter, validate({ body: loginSchema }), authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.get("/me", requireAuth, authController.me);
