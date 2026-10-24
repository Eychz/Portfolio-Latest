import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import type { ProjectQuery } from "../schemas/project.schema.js";

function buildWhere(query: Partial<ProjectQuery>): Prisma.ProjectWhereInput {
  return {
    type: query.type,
    featured: query.featured,
    published: query.published,
    categories: query.category ? { has: query.category } : undefined,
    OR: query.search
      ? [
          { title: { contains: query.search, mode: "insensitive" } },
          { description: { contains: query.search, mode: "insensitive" } },
        ]
      : undefined,
  };
}

export const projectRepository = {
  async findMany(query: ProjectQuery) {
    const where = buildWhere(query);
    const [items, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      prisma.project.count({ where }),
    ]);
    return { items, total };
  },

  findBySlug(slug: string) {
    return prisma.project.findUnique({ where: { slug } });
  },

  findById(id: string) {
    return prisma.project.findUnique({ where: { id } });
  },

  create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data });
  },

  update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.project.delete({ where: { id } });
  },

  countByType() {
    return prisma.project.groupBy({ by: ["type"], _count: { _all: true } });
  },
};
