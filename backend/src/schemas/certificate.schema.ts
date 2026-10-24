import { CertificateCategory } from "@prisma/client";
import { z } from "zod";
import { assetPath, booleanQuery, paginationSchema } from "./common.schema.js";

export const certificateQuerySchema = paginationSchema.extend({
  category: z.enum(CertificateCategory).optional(),
});

export const adminCertificateQuerySchema = certificateQuerySchema.extend({
  published: booleanQuery.optional(),
});

export const createCertificateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens")
    .optional(),
  title: z.string().trim().min(1).max(200),
  image: assetPath,
  category: z.enum(CertificateCategory).default("CERTIFICATE"),
  published: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateCertificateSchema = createCertificateSchema.partial();

export type CertificateQuery = z.infer<typeof adminCertificateQuerySchema>;
export type CreateCertificateInput = z.infer<typeof createCertificateSchema>;
export type UpdateCertificateInput = z.infer<typeof updateCertificateSchema>;
