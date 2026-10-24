import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import { contactLimiter } from "../middleware/rate-limit.js";
import { validate } from "../middleware/validate.js";
import { createContactSchema } from "../schemas/contact.schema.js";

export const contactRoutes = Router();

contactRoutes.post("/", contactLimiter, validate({ body: createContactSchema }), contactController.submit);
