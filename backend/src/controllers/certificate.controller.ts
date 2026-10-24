import type { Request, Response } from "express";
import type { CertificateQuery } from "../schemas/certificate.schema.js";
import { certificateService } from "../services/certificate.service.js";
import { sendData, sendPaginated } from "../utils/response.js";

export const certificateController = {
  async listPublished(_req: Request, res: Response) {
    const query = res.locals.query as CertificateQuery;
    const { items, total } = await certificateService.list({ ...query, published: true });
    sendPaginated(res, items, { page: query.page, pageSize: query.pageSize, total });
  },

  async getBySlug(req: Request, res: Response) {
    sendData(res, await certificateService.getPublishedBySlug(req.params.slug as string));
  },

  async listAll(_req: Request, res: Response) {
    const query = res.locals.query as CertificateQuery;
    const { items, total } = await certificateService.list(query);
    sendPaginated(res, items, { page: query.page, pageSize: query.pageSize, total });
  },

  async getById(req: Request, res: Response) {
    sendData(res, await certificateService.getById(req.params.id as string));
  },

  async create(req: Request, res: Response) {
    sendData(res, await certificateService.create(req.body), 201);
  },

  async update(req: Request, res: Response) {
    sendData(res, await certificateService.update(req.params.id as string, req.body));
  },

  async remove(req: Request, res: Response) {
    await certificateService.remove(req.params.id as string);
    res.status(204).end();
  },
};
