import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import type { MessageQuery } from "../schemas/contact.schema.js";

export const messageRepository = {
  async findMany(query: MessageQuery) {
    const where: Prisma.ContactMessageWhereInput = { read: query.read };
    const [items, total] = await prisma.$transaction([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      prisma.contactMessage.count({ where }),
    ]);
    return { items, total };
  },

  findById(id: string) {
    return prisma.contactMessage.findUnique({ where: { id } });
  },

  create(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({ data });
  },

  update(id: string, data: Prisma.ContactMessageUpdateInput) {
    return prisma.contactMessage.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.contactMessage.delete({ where: { id } });
  },

  countUnread() {
    return prisma.contactMessage.count({ where: { read: false } });
  },
};
