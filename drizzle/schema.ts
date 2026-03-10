import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Service Requests ───────────────────────────────────────────────────────

export const serviceRequests = mysqlTable("service_requests", {
  id: int("id").autoincrement().primaryKey(),
  propertyAddress: text("propertyAddress").notNull(),
  serviceType: varchar("serviceType", { length: 100 }).notNull(),
  deadline: varchar("deadline", { length: 50 }),
  contactName: varchar("contactName", { length: 200 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 30 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  notes: text("notes"),
  photoUrls: text("photoUrls"), // JSON array of S3 URLs
  status: mysqlEnum("status", ["pending", "assigned", "completed", "cancelled"]).default("pending").notNull(),
  assignedContractorId: int("assignedContractorId"),
  quoteAmount: decimal("quoteAmount", { precision: 10, scale: 2 }),
  invoiceAmount: decimal("invoiceAmount", { precision: 10, scale: 2 }),
  paymentStatus: mysqlEnum("paymentStatus", ["unpaid", "partial", "paid"]).default("unpaid").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

// ─── Contractor Signups ──────────────────────────────────────────────────────

export const contractorSignups = mysqlTable("contractor_signups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 320 }),
  trade: varchar("trade", { length: 100 }).notNull(),
  availability: varchar("availability", { length: 100 }).notNull(),
  serviceArea: varchar("serviceArea", { length: 200 }).notNull(),
  yearsExperience: varchar("yearsExperience", { length: 20 }),
  notes: text("notes"),
  status: mysqlEnum("status", ["pending", "active", "inactive"]).default("pending").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  jobsCompleted: int("jobsCompleted").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContractorSignup = typeof contractorSignups.$inferSelect;
export type InsertContractorSignup = typeof contractorSignups.$inferInsert;

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  metaTitle: varchar("metaTitle", { length: 300 }),
  metaDescription: text("metaDescription"),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// ─── Contact Messages ────────────────────────────────────────────────────────

export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  subject: varchar("subject", { length: 300 }),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
