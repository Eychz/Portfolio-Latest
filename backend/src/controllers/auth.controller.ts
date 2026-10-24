import type { CookieOptions, Request, Response } from "express";
import { config } from "../config/index.js";
import { authService } from "../services/auth.service.js";
import { sendData } from "../utils/response.js";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.auth.secureCookies,
  sameSite: "lax",
  path: "/",
};

export const authController = {
  async login(req: Request, res: Response) {
    const { user, token } = await authService.login(req.body);
    res.cookie(config.auth.cookieName, token, { ...cookieOptions, maxAge: config.auth.cookieMaxAgeMs });
    // The token is also returned for non-browser clients that use a Bearer header
    sendData(res, { user, token });
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie(config.auth.cookieName, cookieOptions);
    res.status(204).end();
  },

  async me(req: Request, res: Response) {
    sendData(res, await authService.getCurrentUser(req.user!.id));
  },
};
