import { ProjectType } from "@prisma/client";
import { z } from "zod";
import { assetPath, booleanQuery, optionalUrl, paginationSchema } from "./common.schema.js";

export const projectQuerySchema = paginationSchema.extend({
  type: z.enum(ProjectType).optional(),
  featured: booleanQuery.optional(),
  category: z.string().trim().max(100).optional(),
  search: z.string().trim().max(100).optional(),
});

export const adminProjectQuerySchema = projectQuerySchema.extend({
  published: booleanQuery.optional(),
});

export const createProjectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens")
    .optional(),
  type: z.enum(ProjectType),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5000).nullish(),
  categories: z.array(z.string().trim().min(1).max(100)).max(20).default([]),
  image: assetPath.nullish(),
  link: optionalUrl.nullish(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateProjectSchema = createProjectSchema.partial();

export type ProjectQuery = z.infer<typeof adminProjectQuerySchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
