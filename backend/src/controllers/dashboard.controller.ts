import type { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service.js";
import { sendData } from "../utils/response.js";

export const dashboardController = {
  async stats(_req: Request, res: Response) {
    sendData(res, await dashboardService.getStats());
  },
};
