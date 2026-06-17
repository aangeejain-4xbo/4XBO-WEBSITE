import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3535", 10);

// ---------------------- TECHNICAL SEO SITEMAP & ROBOTS ----------------------

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nAllow: /\n\nSitemap: https://4xbo.com/sitemap.xml`);
});

app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://4xbo.com/</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://4xbo.com/why-us</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://4xbo.com/services</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://4xbo.com/products</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://4xbo.com/contact</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`);
});

// ---------------------- VITE DEV ENGINE / STATIC SERVING ----------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Status] 4X BackOffice Node Server fully live at http://0.0.0.0:${PORT}`);
  });
}

startServer();
