import type { Response } from "express";

export function sendData<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ data });
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  meta: { page: number; pageSize: number; total: number },
) {
  return res.json({
    data,
    meta: { ...meta, totalPages: Math.max(1, Math.ceil(meta.total / meta.pageSize)) },
  });
}
