# FlashFix Turnover LLC — Property Turnover Management System

**Live Site:** [flashfixturnover.com](https://flashfixturnover.com)  
**Company:** FlashFix Turnover LLC  
**Location:** Springfield, MO  
**Contact:** (417) 555-0100 | info@flashfixturnover.com

---

## Overview

A fully automated, branded property turnover management system for FlashFix Turnover LLC. Built with React 19, TypeScript, tRPC, Express, and MySQL/TiDB.

### Features

- **Homepage** — Hero banner, stats, service grid, testimonials, and dual CTAs
- **6 Service Pages** — Painting, Drywall, Cleaning, Lock Changes, Trash Outs, Emergency Maintenance (all SEO-optimized for Springfield, MO)
- **About Page** — LLC info, mission, team, and testimonials
- **Blog Section** — Property management tips with SEO structure
- **Contact Page** — Phone, email, Google Map embed, and quick contact form
- **Request Service Form** — Full validation, photo upload, auto-notifications to owner
- **Contractor Signup Form** — Trade/availability/area fields, auto-notifications
- **Admin Dashboard** — Job tracking (Pending/Assigned/Completed), revenue charts, contractor management, contact messages
- **SEO** — Meta tags, Open Graph, Twitter Cards, LocalBusiness schema, sitemap.xml, robots.txt
- **Vercel Config** — vercel.json with security headers, redirects, and caching

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Backend | Express 4, tRPC 11, Node.js |
| Database | MySQL / TiDB (via Drizzle ORM) |
| Auth | Manus OAuth (admin dashboard protection) |
| Charts | Recharts |
| Deployment | Vercel (recommended) |
| Hosting | flashfixturnover.com |

---

## Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_ORG/flashfix-turnover.git
cd flashfix-turnover

# 2. Install dependencies
pnpm install

# 3. Set environment variables
cp .env.example .env
# Fill in DATABASE_URL and other required variables

# 4. Push database schema
pnpm db:push

# 5. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial FlashFix Turnover deployment"
git remote add origin https://github.com/YOUR_ORG/flashfix-turnover.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository `flashfix-turnover`
4. Vercel will auto-detect the configuration from `vercel.json`
5. Add the required **Environment Variables** (see below)
6. Click **Deploy**

### Step 3: Configure Custom Domain

1. In Vercel dashboard → **Settings → Domains**
2. Add `flashfixturnover.com`
3. Add `www.flashfixturnover.com` (Vercel auto-redirects www → root)
4. Update your DNS records at your domain registrar:
   - **A Record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`
5. SSL certificate is automatically provisioned by Vercel (Let's Encrypt)
6. HTTPS is enforced automatically — HTTP traffic redirects to HTTPS

### Step 4: Verify Deployment

- Visit `https://flashfixturnover.com` — homepage should load
- Visit `https://flashfixturnover.com/sitemap.xml` — sitemap should render
- Visit `https://flashfixturnover.com/robots.txt` — robots.txt should render
- Test the Request Service form — you should receive an owner notification
- Test the Contractor Signup form — you should receive an owner notification
- Visit `https://flashfixturnover.com/dashboard` — sign in to access admin

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | MySQL/TiDB connection string |
| `JWT_SECRET` | ✅ | Session cookie signing secret |
| `VITE_APP_ID` | ✅ | Manus OAuth application ID |
| `OAUTH_SERVER_URL` | ✅ | Manus OAuth backend URL |
| `VITE_OAUTH_PORTAL_URL` | ✅ | Manus login portal URL |
| `OWNER_OPEN_ID` | ✅ | Owner's Manus Open ID (for admin role) |
| `OWNER_NAME` | ✅ | Owner's name |
| `BUILT_IN_FORGE_API_URL` | ✅ | Manus built-in APIs URL |
| `BUILT_IN_FORGE_API_KEY` | ✅ | Manus built-in APIs key (server-side) |
| `VITE_FRONTEND_FORGE_API_KEY` | ✅ | Manus built-in APIs key (frontend) |
| `VITE_FRONTEND_FORGE_API_URL` | ✅ | Manus built-in APIs URL (frontend) |

---

## Project Structure

```
flashfix-turnover/
├── client/
│   ├── public/
│   │   ├── sitemap.xml          ← SEO sitemap
│   │   ├── robots.txt           ← Search engine directives
│   │   └── favicon.svg          ← Brand favicon
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx         ← Homepage with hero/stats/CTA
│   │   │   ├── About.tsx        ← About page with LLC info
│   │   │   ├── Blog.tsx         ← Blog listing page
│   │   │   ├── Contact.tsx      ← Contact page with map
│   │   │   ├── RequestService.tsx ← Service request form
│   │   │   ├── ContractorSignup.tsx ← Contractor application form
│   │   │   ├── Dashboard.tsx    ← Admin dashboard
│   │   │   └── services/
│   │   │       ├── Painting.tsx
│   │   │       ├── Drywall.tsx
│   │   │       ├── Cleaning.tsx
│   │   │       ├── LockChanges.tsx
│   │   │       ├── TrashOuts.tsx
│   │   │       └── EmergencyMaintenance.tsx
│   │   ├── components/
│   │   │   ├── PublicLayout.tsx  ← Navigation + footer wrapper
│   │   │   └── ServicePageTemplate.tsx ← Reusable service page
│   │   └── App.tsx              ← Route definitions
│   └── index.html               ← SEO meta tags + schema markup
├── server/
│   ├── routers.ts               ← All tRPC API routes
│   ├── db.ts                    ← Database query helpers
│   └── storage.ts               ← S3 file storage helpers
├── drizzle/
│   └── schema.ts                ← Database schema (all tables)
├── vercel.json                  ← Vercel deployment config
├── todo.md                      ← Feature tracking
└── README.md                    ← This file
```

---

## Admin Dashboard Access

The dashboard at `/dashboard` is protected by Manus OAuth. Only the account matching `OWNER_OPEN_ID` is automatically granted admin role.

**To promote additional admins:**
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `users` | Auth users (Manus OAuth) |
| `service_requests` | All service request submissions |
| `contractor_signups` | Contractor applications |
| `contact_messages` | Contact form submissions |
| `blog_posts` | Blog content (admin-managed) |

---

## SEO Configuration

- **Sitemap:** `/sitemap.xml` — all pages indexed
- **Robots:** `/robots.txt` — dashboard excluded from indexing
- **Schema:** LocalBusiness + WebSite JSON-LD in `<head>`
- **Open Graph:** Full OG tags for social sharing
- **Meta:** Title, description, keywords per page
- **Keywords:** Springfield MO property turnover, rental maintenance Springfield Missouri

---

## Legal

FlashFix Turnover LLC is a Missouri Limited Liability Company. All rights reserved.  
Licensed, bonded, and insured in the State of Missouri.
