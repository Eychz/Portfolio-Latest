import { Prisma } from "@prisma/client";
import { projectRepository } from "../repositories/project.repository.js";
import type { CreateProjectInput, ProjectQuery, UpdateProjectInput } from "../schemas/project.schema.js";
import { ApiError } from "../utils/api-error.js";
import { slugify } from "../utils/slugify.js";
import { CacheNamespace, cacheService } from "./cache.service.js";

function handleUniqueSlug(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw ApiError.conflict("A project with this slug already exists");
  }
  throw error;
}

async function getOrThrow(id: string) {
  const project = await projectRepository.findById(id);
  if (!project) throw ApiError.notFound("Project not found");
  return project;
}

export const projectService = {
  list(query: ProjectQuery) {
    return projectRepository.findMany(query);
  },

  async getPublishedBySlug(slug: string) {
    const project = await projectRepository.findBySlug(slug);
    if (!project || !project.published) throw ApiError.notFound("Project not found");
    return project;
  },

  getById: getOrThrow,

  async create(input: CreateProjectInput) {
    const project = await projectRepository
      .create({ ...input, slug: input.slug ?? slugify(input.title) })
      .catch(handleUniqueSlug);
    await cacheService.invalidate(CacheNamespace.projects);
    return project;
  },

  async update(id: string, input: UpdateProjectInput) {
    await getOrThrow(id);
    const project = await projectRepository.update(id, input).catch(handleUniqueSlug);
    await cacheService.invalidate(CacheNamespace.projects);
    return project;
  },

  async remove(id: string) {
    await getOrThrow(id);
    await projectRepository.delete(id);
    await cacheService.invalidate(CacheNamespace.projects);
  },
};
