import type { Request, Response } from "express";
import type { MessageQuery } from "../schemas/contact.schema.js";
import { contactService } from "../services/contact.service.js";
import { sendData, sendPaginated } from "../utils/response.js";

export const contactController = {
  async submit(req: Request, res: Response) {
    await contactService.submit(req.body);
    sendData(res, { message: "Thanks! Your message has been sent." }, 201);
  },

  async list(_req: Request, res: Response) {
    const query = res.locals.query as MessageQuery;
    const { items, total } = await contactService.list(query);
    sendPaginated(res, items, { page: query.page, pageSize: query.pageSize, total });
  },

  async update(req: Request, res: Response) {
    sendData(res, await contactService.markRead(req.params.id as string, req.body.read));
  },

  async remove(req: Request, res: Response) {
    await contactService.remove(req.params.id as string);
    res.status(204).end();
  },
};
