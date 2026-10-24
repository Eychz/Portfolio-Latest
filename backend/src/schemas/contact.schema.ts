import { z } from "zod";
import { booleanQuery, paginationSchema } from "./common.schema.js";

export const createContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().trim().toLowerCase().max(200),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: real visitors never see or fill this field
  website: z.string().max(0).optional(),
});

export const messageQuerySchema = paginationSchema.extend({
  read: booleanQuery.optional(),
});

export const updateMessageSchema = z.object({ read: z.boolean() });

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type MessageQuery = z.infer<typeof messageQuerySchema>;
