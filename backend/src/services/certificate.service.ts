import { Prisma } from "@prisma/client";
import { certificateRepository } from "../repositories/certificate.repository.js";
import type {
  CertificateQuery,
  CreateCertificateInput,
  UpdateCertificateInput,
} from "../schemas/certificate.schema.js";
import { ApiError } from "../utils/api-error.js";
import { slugify } from "../utils/slugify.js";
import { CacheNamespace, cacheService } from "./cache.service.js";

function handleUniqueSlug(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw ApiError.conflict("A certificate with this slug already exists");
  }
  throw error;
}

async function getOrThrow(id: string) {
  const certificate = await certificateRepository.findById(id);
  if (!certificate) throw ApiError.notFound("Certificate not found");
  return certificate;
}

export const certificateService = {
  list(query: CertificateQuery) {
    return certificateRepository.findMany(query);
  },

  async getPublishedBySlug(slug: string) {
    const certificate = await certificateRepository.findBySlug(slug);
    if (!certificate || !certificate.published) throw ApiError.notFound("Certificate not found");
    return certificate;
  },

  getById: getOrThrow,

  async create(input: CreateCertificateInput) {
    const certificate = await certificateRepository
      .create({ ...input, slug: input.slug ?? slugify(input.title) })
      .catch(handleUniqueSlug);
    await cacheService.invalidate(CacheNamespace.certificates);
    return certificate;
  },

  async update(id: string, input: UpdateCertificateInput) {
    await getOrThrow(id);
    const certificate = await certificateRepository.update(id, input).catch(handleUniqueSlug);
    await cacheService.invalidate(CacheNamespace.certificates);
    return certificate;
  },

  async remove(id: string) {
    await getOrThrow(id);
    await certificateRepository.delete(id);
    await cacheService.invalidate(CacheNamespace.certificates);
  },
};
