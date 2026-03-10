import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// ─── Mock database ────────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        orderBy: vi.fn().mockResolvedValue([]),
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([]),
          orderBy: vi.fn().mockResolvedValue([]),
        }),
      }),
    }),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    }),
    execute: vi.fn().mockResolvedValue([]),
  }),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

// ─── Mock notifications ───────────────────────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ─── Context helpers ──────────────────────────────────────────────────────────
type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function makeAdminCtx(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-open-id",
    email: "admin@flashfixturnover.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makePublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeUserCtx(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "user-open-id",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ─── Auth Tests ───────────────────────────────────────────────────────────────
describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = makeAdminCtx();
    const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];
    ctx.res.clearCookie = (name: string, options: Record<string, unknown>) => {
      clearedCookies.push({ name, options });
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({ maxAge: -1 });
  });

  it("returns current user for authenticated user", async () => {
    const ctx = makeAdminCtx();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).not.toBeNull();
    expect(user?.role).toBe("admin");
  });

  it("returns null for unauthenticated user", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });
});

// ─── Service Request Tests ────────────────────────────────────────────────────
describe("serviceRequest.submit", () => {
  it("accepts a valid service request submission", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.serviceRequest.submit({
      propertyAddress: "123 Main St, Springfield, MO 65801",
      serviceType: "Painting - Interior",
      contactName: "John Smith",
      contactPhone: "(417) 555-0001",
      contactEmail: "john@example.com",
      notes: "Two bedrooms need repainting",
      deadline: "2026-04-01",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects submission with missing required fields", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.serviceRequest.submit({
        propertyAddress: "",
        serviceType: "Painting",
        contactName: "J",
        contactPhone: "555",
        contactEmail: "not-an-email",
      })
    ).rejects.toThrow();
  });
});

describe("serviceRequest.list (admin)", () => {
  it("returns list for admin user", async () => {
    const ctx = makeAdminCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.serviceRequest.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin user", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.serviceRequest.list()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("throws UNAUTHORIZED for unauthenticated user", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.serviceRequest.list()).rejects.toThrow();
  });
});

// ─── Contractor Tests ─────────────────────────────────────────────────────────
describe("contractor.signup", () => {
  it("accepts a valid contractor application", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contractor.signup({
      name: "Mike Johnson",
      phone: "(417) 555-0002",
      trade: "Painting - Interior",
      availability: "Full-time (Mon–Fri)",
      serviceArea: "Springfield, MO (City)",
      yearsExperience: "5–10 years",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects contractor application with missing required fields", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.contractor.signup({
        name: "J",
        phone: "5",
        trade: "",
        availability: "",
        serviceArea: "",
      })
    ).rejects.toThrow();
  });
});

describe("contractor.list (admin)", () => {
  it("returns contractor list for admin", async () => {
    const ctx = makeAdminCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contractor.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("blocks non-admin from contractor list", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.contractor.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

// ─── Contact Tests ────────────────────────────────────────────────────────────
describe("contact.submit", () => {
  it("accepts a valid contact message", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contact.submit({
      name: "Sarah Lee",
      email: "sarah@example.com",
      message: "I need a quote for a full turnover on my 3-bedroom rental.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects contact with invalid email", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.contact.submit({
        name: "Sarah Lee",
        email: "not-valid",
        message: "Short message",
      })
    ).rejects.toThrow();
  });
});

// ─── Blog Tests ───────────────────────────────────────────────────────────────
describe("blog.list", () => {
  it("returns blog posts for public users", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("blog.getBySlug", () => {
  it("returns null for non-existent slug", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.getBySlug({ slug: "non-existent-post" });
    expect(result).toBeNull();
  });
});
