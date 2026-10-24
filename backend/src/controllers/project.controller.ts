import type { Request, Response } from "express";
import type { ProjectQuery } from "../schemas/project.schema.js";
import { projectService } from "../services/project.service.js";
import { sendData, sendPaginated } from "../utils/response.js";

export const projectController = {
  async listPublished(_req: Request, res: Response) {
    const query = res.locals.query as ProjectQuery;
    const { items, total } = await projectService.list({ ...query, published: true });
    sendPaginated(res, items, { page: query.page, pageSize: query.pageSize, total });
  },

  async getBySlug(req: Request, res: Response) {
    sendData(res, await projectService.getPublishedBySlug(req.params.slug as string));
  },

  async listAll(_req: Request, res: Response) {
    const query = res.locals.query as ProjectQuery;
    const { items, total } = await projectService.list(query);
    sendPaginated(res, items, { page: query.page, pageSize: query.pageSize, total });
  },

  async getById(req: Request, res: Response) {
    sendData(res, await projectService.getById(req.params.id as string));
  },

  async create(req: Request, res: Response) {
    sendData(res, await projectService.create(req.body), 201);
  },

  async update(req: Request, res: Response) {
    sendData(res, await projectService.update(req.params.id as string, req.body));
  },

  async remove(req: Request, res: Response) {
    await projectService.remove(req.params.id as string);
    res.status(204).end();
  },
};
