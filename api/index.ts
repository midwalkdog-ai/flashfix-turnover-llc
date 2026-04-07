import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerChatRoutes } from "../server/_core/chat";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import fs from "fs";
import path from "path";

const app = express();

// Configure body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Register routes
registerOAuthRoutes(app);
registerChatRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve static files from dist/public
const distPath = path.join(__dirname, "../dist/public");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SPA fallback: serve index.html for all non-API routes
app.get("*", (_req, res) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not found");
  }
});

export default app;
