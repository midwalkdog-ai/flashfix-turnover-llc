import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // For API routes, let Vercel handle them normally
  if (req.url?.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  // For all other routes, serve the index.html (SPA fallback)
  try {
    const indexPath = path.join(process.cwd(), "dist", "public", "index.html");
    
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(html);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.error("Error serving index.html:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
