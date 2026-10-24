import { Router } from "express";
import { certificateController } from "../controllers/certificate.controller.js";
import { contactController } from "../controllers/contact.controller.js";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { projectController } from "../controllers/project.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  adminCertificateQuerySchema,
  createCertificateSchema,
  updateCertificateSchema,
} from "../schemas/certificate.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { messageQuerySchema, updateMessageSchema } from "../schemas/contact.schema.js";
import {
  adminProjectQuerySchema,
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";

export const adminRoutes = Router();

adminRoutes.use(requireAuth, requireRole("ADMIN"));

adminRoutes.get("/stats", dashboardController.stats);

adminRoutes.get("/projects", validate({ query: adminProjectQuerySchema }), projectController.listAll);
adminRoutes.post("/projects", validate({ body: createProjectSchema }), projectController.create);
adminRoutes.get("/projects/:id", validate({ params: idParamSchema }), projectController.getById);
adminRoutes.patch(
  "/projects/:id",
  validate({ params: idParamSchema, body: updateProjectSchema }),
  projectController.update,
);
adminRoutes.delete("/projects/:id", validate({ params: idParamSchema }), projectController.remove);

adminRoutes.get(
  "/certificates",
  validate({ query: adminCertificateQuerySchema }),
  certificateController.listAll,
);
adminRoutes.post("/certificates", validate({ body: createCertificateSchema }), certificateController.create);
adminRoutes.get("/certificates/:id", validate({ params: idParamSchema }), certificateController.getById);
adminRoutes.patch(
  "/certificates/:id",
  validate({ params: idParamSchema, body: updateCertificateSchema }),
  certificateController.update,
);
adminRoutes.delete("/certificates/:id", validate({ params: idParamSchema }), certificateController.remove);

adminRoutes.get("/messages", validate({ query: messageQuerySchema }), contactController.list);
adminRoutes.patch(
  "/messages/:id",
  validate({ params: idParamSchema, body: updateMessageSchema }),
  contactController.update,
);
adminRoutes.delete("/messages/:id", validate({ params: idParamSchema }), contactController.remove);
