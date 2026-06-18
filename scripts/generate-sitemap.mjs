// Generates public/sitemap.xml and public/robots.txt from one route list.
// Runs on every build (npm "prebuild" hook locally; vercel.json buildCommand on
// Vercel) so <lastmod> is always the build date and the two files never drift.
//
// Keep `routes` in sync with ROUTES in src/seo.ts (a TS module can't be imported
// from a plain node script without a loader, so the path list is mirrored here).
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const SITE = "https://4xbo.com";

const routes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/why-us", changefreq: "weekly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.8" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(PUBLIC_DIR, "robots.txt"), robots, "utf8");
console.log(
  `[seo] Generated sitemap.xml + robots.txt — ${routes.length} routes, lastmod ${lastmod}`
);
