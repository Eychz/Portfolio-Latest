import { z } from "zod";

export const idParamSchema = z.object({ id: z.string().min(1) });
export const slugParamSchema = z.object({ slug: z.string().min(1).max(200) });

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(50),
});

export const booleanQuery = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

/** Accepts absolute URLs or site-relative paths like /Mockups/air-v1.webp */
export const assetPath = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), {
    message: "Must be a URL or a path starting with /",
  });

export const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => /^https?:\/\//.test(value), { message: "Must be an http(s) URL" });
