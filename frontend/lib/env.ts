/** Base URL of the Express API, used by server code and the /api proxy. */
export const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:4000").replace(/\/$/, "")

/** Name of the httpOnly cookie set by the API on login. */
export const SESSION_COOKIE = "portfolio_session"
