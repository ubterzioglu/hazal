import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { QR_PATH, QR_TARGET } from "../shared/qr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveStaticPath() {
  return process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");
}

export function createApp(): Express {
  const app = express();
  const staticPath = resolveStaticPath();

  app.use(express.static(staticPath));

  // Permanent QR entry. Must stay above the SPA catch-all, and must stay a 302:
  // a 301 is cached permanently by browsers, which would freeze QR_TARGET
  // forever and defeat the point of having a redirect at all.
  app.get(QR_PATH, (_req, res) => {
    res.redirect(302, QR_TARGET);
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  return app;
}
