# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for **4X BackOffice**, a B2B Forex back-office solutions company. A React SPA served by a thin Express server. Originally scaffolded as a Google AI Studio app (leftovers remain — see Environment).

**The project root is the `4XBO-WEBSITE/` subfolder** — it holds the `.git` repo, `package.json`, and all source. The Desktop parent folder is just a container; run every command from inside `4XBO-WEBSITE/`. `start.bat` (in the project root) is a Windows convenience launcher: installs deps if missing, opens `http://localhost:3535`, then runs `npm run dev`.

## Commands

```bash
npm install          # install deps
npm run dev          # tsx server.ts — Express + Vite middleware on http://localhost:3535 (PORT env var overrides)
npm run build        # vite build (client → dist/) + esbuild bundles server.ts → dist/server.cjs
npm start            # node dist/server.cjs — serves prebuilt dist/ as a static SPA
npm run lint         # tsc --noEmit (type-check only; no ESLint configured)
npm run clean        # rm -rf dist server.js  (note: uses Unix rm; on Windows use Remove-Item)
```

There is **no test framework**. `npm run lint` (type-check) is the only automated check.

Dev and prod both run through `server.ts`, which listens on `0.0.0.0:${PORT}` — default `3535`, overridable via the `PORT` env var (`parseInt(process.env.PORT || "3535")`). In dev it mounts Vite as middleware (`NODE_ENV !== "production"`); in prod it serves `dist/` statically with an SPA fallback to `index.html`. Running `vite` directly is not the intended workflow.

**Production = Linux VPS: nginx → Node/Express (`server.ts`) via PM2/systemd.** Unlike a Vercel deploy, **`server.ts` runs in production here**, and it does the SEO-critical work: see "Server-side per-route head injection" below. nginx terminates TLS, forces https, and 301-redirects `www → apex`; see `deploy/nginx.conf.example`, `deploy/ecosystem.config.cjs`, and `deploy/README.md`. `vercel.json` exists but is **unused on the VPS** (kept only for a possible future Vercel deploy).

**Server-side per-route head injection (the key prod mechanism).** `index.html` wraps its SEO-managed tags between `<!-- seo:head:start --> … <!-- seo:head:end -->` markers (with homepage defaults inside). In production `server.ts` reads `dist/index.html` once and, per request to a known route, regex-replaces that block with `renderHeadTags(path)` from `src/seo.ts` — so non-JS crawlers and social unfurlers get correct per-page title/description/canonical/OG/Twitter/JSON-LD. Unknown paths get a real **404** + `noindex`. `/assets/*` (hashed) is served `immutable`, 1-year cache. Dev (`npm run dev`) skips injection (Vite middleware serves the shell; the client `useEffect` handles meta). Vite is dynamically imported only in the dev branch, so prod never loads it.

**`robots.txt` + `sitemap.xml` have one source of truth: `scripts/generate-sitemap.mjs`.** It writes both into `public/` from a single route list, stamping `<lastmod>` with the build date. Runs via the `prebuild` npm hook (and `npm run gen:seo` on demand); `server.ts` no longer hardcodes them — they're served as static files. Keep that route list in sync with `ROUTES` in `src/seo.ts`.

## Architecture

**Stack:** React 19 + TypeScript, Vite 6, Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `vite.config.ts` — no `tailwind.config.js`), `motion` (Framer Motion) for animation, `three` + `@react-three/fiber`/`drei` for 3D, `lucide-react` for icons, Express on the server. Path alias `@/*` → repo root.

**Entry point is `src/App.tsx`** (mounted by `src/main.tsx`, wrapped in `RouterProvider`). Note: the main app component lives at `src/App.tsx`, not the repo root.

**Custom router (no react-router).** `src/router.tsx` is a hand-rolled router using React Context + the History API (`pushState`/`popstate`). Valid routes are the `PathRoute` union: `/`, `/why-us`, `/services`, `/products`, `/contact`. `src/App.tsx` reads `currentPath` from `useRouter()` and renders the matching page via a `switch` in `renderContent()` — each page composes section components from `src/components/`. Add a route by extending the `PathRoute` type and adding a `case` in `renderContent()`.

**Code-splitting.** The heaviest views are lazy-loaded to keep the initial bundle small: `Services` (the Three.js/WebGL route) in `src/App.tsx`, and `ContactGlobe` (the 3D globe) in `ContactSection.tsx`. Both use `React.lazy` + `Suspense`. Keep new heavy/3D components lazy.

**SEO metadata lives in `src/seo.ts` — the single source of truth.** It exports per-route `title`/`description`/`keywords`/`ogImage`/`ogImageAlt` (keyed by `PathRoute`, with `DEFAULT_SEO` fallback) and `buildGraph(path)`, which assembles the per-route JSON-LD `@graph` (Organization, WebSite, ProfessionalService with NAP from `src/config.ts`, plus Service nodes on `/services` and a BreadcrumbList on subpages). A `useEffect` in `src/App.tsx` keyed on `currentPath` consumes `seo.ts` to rewrite `document.title`, description/keywords, the full Open Graph **and** Twitter Card sets, the canonical link, and the injected `<script id="structured-data-schema">`. `index.html` holds a static homepage baseline that mirrors `buildGraph("/")` (same `@id`s, so crawlers dedupe). **When adding a page:** add it to the `PathRoute` union, the `renderContent` `switch`, `ROUTE_SEO` in `seo.ts`, the route list in `scripts/generate-sitemap.mjs`, and the `vercel.json` rewrites. The `FAQPage` JSON-LD is emitted **only** by `SEOSections.tsx` (home), co-located with the visible FAQ so the markup stays byte-identical (Google policy) — don't duplicate it elsewhere. Canonical/OG base URL is `https://4xbo.com`.

**Per-route metadata reaches crawlers via the server, not a prerender.** `src/seo.ts` exports `renderHeadTags(path)` (pure string, DOM-free) which `server.ts` injects into the `seo:head` block per request in production — so non-JS crawlers/social bots get correct per-page HTML on the VPS without an SSG build. `seo.ts` has no React runtime import (`import type { PathRoute }`), so esbuild bundles it into `dist/server.cjs` cleanly. The client `useEffect` still updates the same tags on client-side route changes. A build-time prerender remains a possible future optimization but is no longer required for crawler visibility.

**Scroll-reveal animations** use a global IntersectionObserver in `src/App.tsx` that adds the `.in` class to any element with a `data-rv` attribute (CSS `transition-delay` via `data-rv-delay` handles staggering). The observer re-runs on route change and after the loader completes. Shared Framer Motion variants live in `src/lib/animations.ts` (`TRANSITIONS`, `ANIMATION_VARIANTS`, `POST_REVEAL`).

**Icons** go through `src/components/Icon.tsx` — a wrapper that looks up Lucide icons by string `name`, with a custom inline `WhatsApp` SVG and a `HelpCircle` fallback for unknown names. It imports icons via an **explicit `ICONS` registry** (not `import * as LucideIcons`) so only the ~33 icons actually used ship in the bundle — **when you reference a new Lucide icon by name, add it to that registry** or it renders the fallback. Component data (services, why-us cards, map markers) references icons by string name and is centralized in `src/data.ts`, typed by `src/types.ts`.

### Contact / inquiries — no backend

There is **no contact-form API and no email sending.** All "contact" actions are outbound deep-links, centralized in `src/config.ts`:
- WhatsApp click-to-chat (`wa.me` via `WHATSAPP_URL` / `waLink(msg)` with optional prefilled text),
- `tel:` dial (`CONSULTATION_PHONE`),
- Gmail compose links (`DEMO_REQUEST_EMAIL`).

`src/components/TalkModal.tsx` is a channel picker (WhatsApp / Call / Email), and `ContactSection.tsx` is a presentational card + 3D globe — neither POSTs anywhere. **To change the phone number, email, or WhatsApp messages, edit `src/config.ts`** (it updates everywhere). The `server.ts` file contains only the SEO routes and Vite/static serving — nothing else. (`secure_data/submissions.json` is an empty, unreferenced AI Studio leftover — there is no submission storage.)

**3D views are wrapped in `src/components/ErrorBoundary.tsx`** (the Hero infrastructure sphere and the Contact globe) so a WebGL/Three.js failure degrades gracefully instead of blanking the page. Wrap any new Three.js component the same way.

## Environment

`.env.example` and the SMTP / `GEMINI_API_KEY` / `APP_URL` variables in it are **AI Studio scaffolding leftovers and are not used** anywhere in the current source (there is no email or Gemini code). No `.env` is required to run the site.

`vite.config.ts` honors `DISABLE_HMR` (AI Studio sets it) to turn off HMR and file watching — leave that behavior alone.

**Do not run the project from a OneDrive-synced folder** (e.g. `OneDrive\Desktop\…`). OneDrive's sync fights Vite's file watcher and throws `EBUSY` locks on `public/partners/*`, crashing `npm run dev` on every write. Keep the project in a plain local path. See `CHANGES.md` for the full record of local customizations (page-transition direction, FAQ behavior, partner-logo refactor, optimized logo assets).
