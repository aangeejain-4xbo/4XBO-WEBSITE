import express from "express";
import path from "path";
import fs from "fs";
import { ROUTES, renderHeadTags } from "./src/seo";

// Env vars (NODE_ENV, PORT) come from the real environment — PM2's ecosystem
// config in prod, the shell in dev. No .env file is used (dotenv removed).

const app = express();
const PORT = parseInt(process.env.PORT || "3535", 10);

// Production runs behind nginx (TLS termination + www->apex redirect). Trust the
// proxy so req.protocol / req.hostname reflect the original request.
app.set("trust proxy", true);

// robots.txt and sitemap.xml are generated into public/ by
// scripts/generate-sitemap.mjs and served as static files — by Vite's public
// dir in dev and by express.static(dist) in prod. Single source of truth, so
// no hardcoded SEO routes live here anymore.

// Replace the marked <head> block in index.html with per-route SEO tags so
// non-JS crawlers and social unfurlers receive correct per-page metadata.
// Matches the whole marked block (the markers may carry trailing comment text).
const SEO_HEAD_RE = /<!--\s*seo:head:start[\s\S]*?seo:head:end\s*-->/;

function injectHead(
  template: string,
  routePath: string,
  opts?: { noindex?: boolean }
): string {
  const block = `<!-- seo:head:start -->\n    ${renderHeadTags(routePath, opts)}\n    <!-- seo:head:end -->`;
  return template.replace(SEO_HEAD_RE, block);
}

// ---------------------- VITE DEV ENGINE / STATIC SERVING ----------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dev: Vite middleware serves index.html; the client (App.tsx) keeps the
    // per-route <head> in sync. No server-side injection needed locally.
    // Vite is imported only here so production never loads it.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Read the built shell once; head injection happens per request.
    const template = fs.readFileSync(path.join(distPath, "index.html"), "utf8");

    // Static files (assets, logos, robots.txt, sitemap.xml). index:false so we
    // render index.html ourselves with per-route head injection. Hashed Vite
    // bundles under /assets are immutable -> cache for a year.
    app.use(
      express.static(distPath, {
        index: false,
        setHeaders: (res, filePath) => {
          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      })
    );

    // Known SPA routes -> 200 with per-route <head> injected.
    app.get(ROUTES as string[], (req, res) => {
      res
        .status(200)
        .set("Cache-Control", "no-cache")
        .type("html")
        .send(injectHead(template, req.path));
    });

    // Unknown paths -> real 404 (noindex), still rendering the SPA shell so the
    // client shows its not-found view.
    app.use((_req, res) => {
      res
        .status(404)
        .set("Cache-Control", "no-cache")
        .type("html")
        .send(injectHead(template, "/", { noindex: true }));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Status] 4X BackOffice Node Server fully live at http://0.0.0.0:${PORT}`);
  });
}

startServer();
