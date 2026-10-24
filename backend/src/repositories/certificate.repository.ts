import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import type { CertificateQuery } from "../schemas/certificate.schema.js";

export const certificateRepository = {
  async findMany(query: CertificateQuery) {
    const where: Prisma.CertificateWhereInput = {
      category: query.category,
      published: query.published,
    };
    const [items, total] = await prisma.$transaction([
      prisma.certificate.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      prisma.certificate.count({ where }),
    ]);
    return { items, total };
  },

  findBySlug(slug: string) {
    return prisma.certificate.findUnique({ where: { slug } });
  },

  findById(id: string) {
    return prisma.certificate.findUnique({ where: { id } });
  },

  create(data: Prisma.CertificateCreateInput) {
    return prisma.certificate.create({ data });
  },

  update(id: string, data: Prisma.CertificateUpdateInput) {
    return prisma.certificate.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.certificate.delete({ where: { id } });
  },

  count() {
    return prisma.certificate.count();
  },
};
