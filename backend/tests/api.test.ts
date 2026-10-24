import bcrypt from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

const app = createApp();
const admin = { email: "admin@test.dev", password: "correct-horse-battery" };

async function login() {
  const agent = request.agent(app);
  await agent.post("/api/auth/login").send(admin).expect(200);
  return agent;
}

beforeAll(async () => {
  await prisma.user.create({
    data: { email: admin.email, passwordHash: await bcrypt.hash(admin.password, 4) },
  });
});

beforeEach(async () => {
  await prisma.project.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.contactMessage.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("health", () => {
  it("reports the database as up", async () => {
    const res = await request(app).get("/api/health").expect(200);
    expect(res.body).toMatchObject({ status: "ok", database: "up", redis: "disabled" });
  });
});

describe("public projects", () => {
  it("lists only published projects and filters by type", async () => {
    await prisma.project.createMany({
      data: [
        { slug: "a", type: "SYSTEM", title: "A" },
        { slug: "b", type: "GRAPHIC_DESIGN", title: "B" },
        { slug: "hidden", type: "SYSTEM", title: "Hidden", published: false },
      ],
    });

    const all = await request(app).get("/api/projects").expect(200);
    expect(all.body.data.map((p: { slug: string }) => p.slug).sort()).toEqual(["a", "b"]);

    const systems = await request(app).get("/api/projects?type=SYSTEM").expect(200);
    expect(systems.body.meta.total).toBe(1);
  });

  it("returns 404 for unpublished projects", async () => {
    await prisma.project.create({ data: { slug: "draft", type: "SYSTEM", title: "Draft", published: false } });
    await request(app).get("/api/projects/draft").expect(404);
  });

  it("rejects invalid query parameters", async () => {
    const res = await request(app).get("/api/projects?type=NOPE").expect(400);
    expect(res.body.error.details.type).toBeDefined();
  });
});

describe("auth", () => {
  it("rejects wrong credentials", async () => {
    await request(app).post("/api/auth/login").send({ ...admin, password: "wrong" }).expect(401);
  });

  it("sets an httpOnly session cookie and returns the current user", async () => {
    const res = await request(app).post("/api/auth/login").send(admin).expect(200);
    expect(res.headers["set-cookie"]?.[0]).toMatch(/portfolio_session=.*HttpOnly/);

    const agent = await login();
    const me = await agent.get("/api/auth/me").expect(200);
    expect(me.body.data.email).toBe(admin.email);
  });
});

describe("admin", () => {
  it("requires authentication", async () => {
    await request(app).get("/api/admin/projects").expect(401);
    await request(app).post("/api/admin/projects").send({}).expect(401);
  });

  it("creates, updates and deletes a project", async () => {
    const agent = await login();

    const created = await agent
      .post("/api/admin/projects")
      .send({ type: "SYSTEM", title: "My New Site", link: "https://example.com" })
      .expect(201);
    expect(created.body.data.slug).toBe("my-new-site");

    await agent.post("/api/admin/projects").send({ type: "SYSTEM", title: "My New Site" }).expect(409);

    const id = created.body.data.id;
    const updated = await agent.patch(`/api/admin/projects/${id}`).send({ published: false }).expect(200);
    expect(updated.body.data.published).toBe(false);
    await request(app).get("/api/projects/my-new-site").expect(404);

    await agent.delete(`/api/admin/projects/${id}`).expect(204);
    await agent.get(`/api/admin/projects/${id}`).expect(404);
  });

  it("validates project input", async () => {
    const agent = await login();
    const res = await agent
      .post("/api/admin/projects")
      .send({ type: "SYSTEM", title: "", link: "javascript:alert(1)" })
      .expect(400);
    expect(Object.keys(res.body.error.details)).toEqual(expect.arrayContaining(["title", "link"]));
  });
});

describe("contact", () => {
  it("stores valid messages and shows them to the admin", async () => {
    await request(app)
      .post("/api/contact")
      .send({ name: "Ana", email: "ana@example.com", message: "I'd like a jersey design." })
      .expect(201);

    const agent = await login();
    const res = await agent.get("/api/admin/messages").expect(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("silently drops honeypot submissions", async () => {
    await request(app)
      .post("/api/contact")
      .send({ name: "Bot", email: "bot@example.com", message: "Buy cheap stuff now!!", website: "" })
      .expect(201);
    await request(app)
      .post("/api/contact")
      .send({ name: "Bot", email: "bot@example.com", message: "Buy cheap stuff now!!", website: "spam" })
      .expect(400);
    expect(await prisma.contactMessage.count()).toBe(1);
  });
});
