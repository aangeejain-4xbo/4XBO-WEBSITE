# Deploying 4X BackOffice on a Linux VPS

Topology: **nginx** (TLS + `www→apex` redirect) → **Node/Express** (`server.ts`,
built to `dist/server.cjs`) kept alive by **PM2** or **systemd**.

The Node server does the SEO-critical work that `vercel.json` would do on Vercel:
per-route `<head>`/JSON-LD injection (so crawlers & social bots get correct
per-page metadata), immutable caching for `/assets/*`, and real 404s for unknown
paths. `vercel.json` in the repo is **unused on the VPS** (kept only for a
possible future Vercel deploy).

## 1. Build

```bash
npm ci                 # full install (build needs devDeps: vite, esbuild, tsc…)
npm run build          # generates sitemap+robots, builds client to dist/,
                       # bundles server -> dist/server.cjs
```

The build artifacts are: `dist/` (client + `index.html` with the seo markers,
`robots.txt`, `sitemap.xml`) and `dist/server.cjs` (the server). The server reads
`dist/index.html` at startup, so always rebuild + restart together.

Runtime needs only production deps (`express`, `dotenv`). Vite is loaded lazily
and only in dev, so a production box can run with `npm ci --omit=dev` after build,
or just keep the full `node_modules` from the build.

## 2. Run with PM2

```bash
# edit deploy/ecosystem.config.cjs -> set cwd to the project path on the server
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup            # follow the printed command to enable on boot
```

The app listens on `127.0.0.1:3535` (override with `PORT`). Verify locally:

```bash
curl -s localhost:3535/services | grep -oE '<title>[^<]+</title>'
# -> <title>Forex Broker Services & MT5 Administration | 4X BackOffice</title>
curl -s -o /dev/null -w '%{http_code}\n' localhost:3535/does-not-exist   # -> 404
```

### systemd alternative

```ini
# /etc/systemd/system/4xbo.service
[Unit]
Description=4X BackOffice Node server
After=network.target

[Service]
WorkingDirectory=/var/www/4xbo
Environment=NODE_ENV=production
Environment=PORT=3535
ExecStart=/usr/bin/node dist/server.cjs
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```
`sudo systemctl enable --now 4xbo`

## 3. nginx

Copy `deploy/nginx.conf.example` to `/etc/nginx/sites-available/4xbo.com`, adjust
the `root` (path to `dist/`) and TLS cert paths, symlink into `sites-enabled`,
then `sudo nginx -t && sudo systemctl reload nginx`. TLS via certbot:
`sudo certbot --nginx -d 4xbo.com -d www.4xbo.com`.

## 4. Redeploy

```bash
git pull
npm ci && npm run build
pm2 restart 4xbo        # picks up the new dist/index.html + server.cjs
```

## Post-deploy SEO checklist

- [ ] `https://4xbo.com/sitemap.xml` and `/robots.txt` return 200.
- [ ] View-source on `/services` shows the services `<title>` + canonical
      `https://4xbo.com/services` (proves server-side injection works).
- [ ] `http://4xbo.com` and `https://www.4xbo.com` both 301 → `https://4xbo.com`.
- [ ] Submit the sitemap in Google Search Console; validate a page with the
      Rich Results Test (Organization / ProfessionalService / FAQ / Breadcrumb).
- [ ] Re-share a deep link (e.g. /products) on LinkedIn/Slack to confirm the
      per-route OG preview.
