import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  updatePassword(email: string, passwordHash: string) {
    return prisma.user.update({ where: { email }, data: { passwordHash } });
  },
};
