import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import {
  serviceRequests,
  contractorSignups,
  contactMessages,
  blogPosts,
} from "../drizzle/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import { ENV } from "./_core/env";

// ─── Admin guard ─────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── Service Requests Router ─────────────────────────────────────────────────
const serviceRequestRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        propertyAddress: z.string().min(5, "Property address is required"),
        serviceType: z.string().min(1, "Service type is required"),
        deadline: z.string().optional(),
        contactName: z.string().min(2, "Contact name is required"),
        contactPhone: z.string().min(7, "Phone number is required"),
        contactEmail: z.string().email("Valid email is required"),
        notes: z.string().optional(),
        photoUrls: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      await db.insert(serviceRequests).values({
        propertyAddress: input.propertyAddress,
        serviceType: input.serviceType,
        deadline: input.deadline,
        contactName: input.contactName,
        contactPhone: input.contactPhone,
        contactEmail: input.contactEmail,
        notes: input.notes,
        photoUrls: input.photoUrls ? JSON.stringify(input.photoUrls) : null,
        status: "pending",
        paymentStatus: "unpaid",
      });

      // Notify owner
      await notifyOwner({
        title: `New Service Request: ${input.serviceType}`,
        content: `New service request from ${input.contactName} at ${input.propertyAddress}. Phone: ${input.contactPhone}, Email: ${input.contactEmail}. Deadline: ${input.deadline || "ASAP"}. Notes: ${input.notes || "None"}`,
      });

      return { success: true };
    }),

  list: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
  }),

  updateStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "assigned", "completed", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(serviceRequests)
        .set({ status: input.status })
        .where(eq(serviceRequests.id, input.id));
      return { success: true };
    }),

  updateQuote: adminProcedure
    .input(z.object({
      id: z.number(),
      quoteAmount: z.string().optional(),
      invoiceAmount: z.string().optional(),
      paymentStatus: z.enum(["unpaid", "partial", "paid"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const updateData: Record<string, unknown> = {};
      if (input.quoteAmount !== undefined) updateData.quoteAmount = input.quoteAmount;
      if (input.invoiceAmount !== undefined) updateData.invoiceAmount = input.invoiceAmount;
      if (input.paymentStatus !== undefined) updateData.paymentStatus = input.paymentStatus;
      await db.update(serviceRequests).set(updateData).where(eq(serviceRequests.id, input.id));
      return { success: true };
    }),

  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { pending: 0, assigned: 0, completed: 0, cancelled: 0, totalRevenue: "0" };

    const [pending, assigned, completed, cancelled, revenue] = await Promise.all([
      db.select({ count: count() }).from(serviceRequests).where(eq(serviceRequests.status, "pending")),
      db.select({ count: count() }).from(serviceRequests).where(eq(serviceRequests.status, "assigned")),
      db.select({ count: count() }).from(serviceRequests).where(eq(serviceRequests.status, "completed")),
      db.select({ count: count() }).from(serviceRequests).where(eq(serviceRequests.status, "cancelled")),
      db.select({ total: sql<string>`COALESCE(SUM(invoiceAmount), 0)` }).from(serviceRequests).where(eq(serviceRequests.paymentStatus, "paid")),
    ]);

    return {
      pending: pending[0]?.count ?? 0,
      assigned: assigned[0]?.count ?? 0,
      completed: completed[0]?.count ?? 0,
      cancelled: cancelled[0]?.count ?? 0,
      totalRevenue: revenue[0]?.total ?? "0",
    };
  }),

  monthlyData: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const rows = await db.execute(sql`
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m') as month,
        COUNT(*) as jobs,
        COALESCE(SUM(CASE WHEN paymentStatus = 'paid' THEN invoiceAmount ELSE 0 END), 0) as revenue
      FROM service_requests
      WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
      ORDER BY month ASC
    `);

    return (rows as any[]).map((r: any) => ({
      month: r.month as string,
      jobs: Number(r.jobs),
      revenue: Number(r.revenue),
    }));
  }),
});

// ─── Contractor Signups Router ────────────────────────────────────────────────
const contractorRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name is required"),
        phone: z.string().min(7, "Phone is required"),
        email: z.string().email().optional().or(z.literal("")),
        trade: z.string().min(1, "Trade is required"),
        availability: z.string().min(1, "Availability is required"),
        serviceArea: z.string().min(1, "Service area is required"),
        yearsExperience: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      await db.insert(contractorSignups).values({
        name: input.name,
        phone: input.phone,
        email: input.email || null,
        trade: input.trade,
        availability: input.availability,
        serviceArea: input.serviceArea,
        yearsExperience: input.yearsExperience,
        notes: input.notes,
        status: "pending",
        jobsCompleted: 0,
      });

      await notifyOwner({
        title: `New Contractor Application: ${input.name}`,
        content: `New contractor signup from ${input.name}. Trade: ${input.trade}, Phone: ${input.phone}, Email: ${input.email || "N/A"}, Availability: ${input.availability}, Service Area: ${input.serviceArea}, Experience: ${input.yearsExperience || "N/A"}`,
      });

      return { success: true };
    }),

  list: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(contractorSignups).orderBy(desc(contractorSignups.createdAt));
  }),

  updateStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "active", "inactive"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(contractorSignups)
        .set({ status: input.status })
        .where(eq(contractorSignups.id, input.id));
      return { success: true };
    }),
});

// ─── Contact Messages Router ──────────────────────────────────────────────────
const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.insert(contactMessages).values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
        read: false,
      });

      await notifyOwner({
        title: `New Contact Message from ${input.name}`,
        content: `From: ${input.name} (${input.email}). Subject: ${input.subject || "General Inquiry"}. Message: ${input.message}`,
      });

      return { success: true };
    }),

  list: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }),
});

// ─── Blog Router ──────────────────────────────────────────────────────────────
const blogRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db.select().from(blogPosts)
        .where(eq(blogPosts.slug, input.slug))
        .limit(1);
      return result[0] ?? null;
    }),
});

// ─── File Upload Router ───────────────────────────────────────────────────────
const uploadRouter = router({
  getUploadUrl: publicProcedure
    .input(z.object({
      filename: z.string(),
      contentType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const ext = input.filename.split(".").pop() || "bin";
      const key = `uploads/service-photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      // Return key for client to use after upload
      return { key, uploadPath: `/api/upload?key=${encodeURIComponent(key)}` };
    }),
});

// ─── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  serviceRequest: serviceRequestRouter,
  contractor: contractorRouter,
  contact: contactRouter,
  blog: blogRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
