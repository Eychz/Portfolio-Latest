import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/index.js";
import { userRepository } from "../repositories/user.repository.js";
import type { LoginInput } from "../schemas/auth.schema.js";
import type { AuthUser, JwtPayload } from "../types/index.js";
import { ApiError } from "../utils/api-error.js";

// Compared against when the email is unknown so response time doesn't reveal which emails exist
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export const authService = {
  async login({ email, password }: LoginInput) {
    const user = await userRepository.findByEmail(email);
    const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !valid) throw ApiError.unauthorized("Invalid email or password");

    const authUser: AuthUser = { id: user.id, email: user.email, role: user.role };
    return { user: authUser, token: this.signToken(authUser) };
  },

  signToken(user: AuthUser) {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    });
  },

  verifyToken(token: string): AuthUser {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      return { id: payload.sub, email: payload.email, role: payload.role };
    } catch {
      throw ApiError.unauthorized("Invalid or expired session");
    }
  },

  async getCurrentUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.unauthorized("Account no longer exists");
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  },

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  },
};
