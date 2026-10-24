import { readFileSync } from "node:fs";
import { PrismaClient, type CertificateCategory, type ProjectType } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

type SeedContent = {
  projects: {
    slug: string;
    type: ProjectType;
    title: string;
    description: string | null;
    categories: string[];
    image: string | null;
    link: string | null;
    featured: boolean;
    sortOrder: number;
  }[];
  certificates: {
    slug: string;
    title: string;
    image: string;
    category: CertificateCategory;
    sortOrder: number;
  }[];
};

const prisma = new PrismaClient();

async function main() {
  const content: SeedContent = JSON.parse(
    readFileSync(new URL("./data/content.json", import.meta.url), "utf8"),
  );

  // Upsert by slug so the seed can be re-run without duplicating rows
  for (const project of content.projects) {
    await prisma.project.upsert({ where: { slug: project.slug }, create: project, update: project });
  }
  for (const certificate of content.certificates) {
    await prisma.certificate.upsert({
      where: { slug: certificate.slug },
      create: certificate,
      update: certificate,
    });
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      await prisma.user.create({
        data: { email, name: "Admin", passwordHash: await bcrypt.hash(password, 12) },
      });
      console.log(`Created admin user ${email}`);
    }
  }

  console.log(
    `Seeded ${content.projects.length} projects and ${content.certificates.length} certificates`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
