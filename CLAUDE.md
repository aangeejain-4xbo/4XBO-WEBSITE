# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for **4X BackOffice**, a B2B Forex back-office solutions company. A React SPA served by a thin Express server. Originally scaffolded as a Google AI Studio app (leftovers remain — see Environment).

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

**Two divergent deployment paths.** `npm start`/`npm run build` use `server.ts` (Express). But `vercel.json` deploys with `vite build` only (framework `vite`, static SPA rewrites) — **`server.ts` never runs on Vercel**. On Vercel the SEO files are served instead from `public/robots.txt` and `public/sitemap.xml` (Vite copies `public/` into `dist/` verbatim). So `/robots.txt` and `/sitemap.xml` have **two sources of truth**: the dynamic Express routes in `server.ts` (used by `npm start`) and the static files in `public/` (used by Vercel and by any static `dist/` serve). They currently duplicate the same content — keep them in sync.

## Architecture

**Stack:** React 19 + TypeScript, Vite 6, Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `vite.config.ts` — no `tailwind.config.js`), `motion` (Framer Motion) for animation, `three` + `@react-three/fiber`/`drei` for 3D, `lucide-react` for icons, Express on the server. Path alias `@/*` → repo root.

**Entry point is `src/App.tsx`** (mounted by `src/main.tsx`, wrapped in `RouterProvider`). Note: the main app component lives at `src/App.tsx`, not the repo root.

**Custom router (no react-router).** `src/router.tsx` is a hand-rolled router using React Context + the History API (`pushState`/`popstate`). Valid routes are the `PathRoute` union: `/`, `/why-us`, `/services`, `/products`, `/contact`. `src/App.tsx` reads `currentPath` from `useRouter()` and renders the matching page via a `switch` in `renderContent()` — each page composes section components from `src/components/`. Add a route by extending the `PathRoute` type and adding a `case` in `renderContent()`.

**Code-splitting.** The heaviest views are lazy-loaded to keep the initial bundle small: `Services` (the Three.js/WebGL route) in `src/App.tsx`, and `ContactGlobe` (the 3D globe) in `ContactSection.tsx`. Both use `React.lazy` + `Suspense`. Keep new heavy/3D components lazy.

**SEO is managed imperatively in `src/App.tsx`.** A `useEffect` keyed on `currentPath` rewrites `document.title`, meta description/keywords, Open Graph tags, canonical link, and an injected JSON-LD `<script id="structured-data-schema">` per route. `index.html` holds the initial/default tags. The sitemap exists as **three hardcoded route lists that must agree**: `src/App.tsx` (the `renderContent` `switch` + SEO `useEffect`), the inline route list in `server.ts`'s `/sitemap.xml` route, and the static `public/sitemap.xml`. When adding a page, update **all three** (and `public/robots.txt` references `https://4xbo.com/sitemap.xml`). The canonical/OG base URL is `https://4xbo.com`.

**Scroll-reveal animations** use a global IntersectionObserver in `src/App.tsx` that adds the `.in` class to any element with a `data-rv` attribute (CSS `transition-delay` via `data-rv-delay` handles staggering). The observer re-runs on route change and after the loader completes. Shared Framer Motion variants live in `src/lib/animations.ts` (`TRANSITIONS`, `ANIMATION_VARIANTS`, `POST_REVEAL`).

**Icons** go through `src/components/Icon.tsx` — a wrapper that looks up Lucide icons by string `name`, with a custom inline `WhatsApp` SVG and a `HelpCircle` fallback for unknown names. Component data (services, why-us cards, map markers) references icons by string name and is centralized in `src/data.ts`, typed by `src/types.ts`.

### Contact / inquiries — no backend

There is **no contact-form API and no email sending.** All "contact" actions are outbound deep-links, centralized in `src/config.ts`:
- WhatsApp click-to-chat (`wa.me` via `WHATSAPP_URL` / `waLink(msg)` with optional prefilled text),
- `tel:` dial (`CONSULTATION_PHONE`),
- Gmail compose links (`DEMO_REQUEST_EMAIL`).

`src/components/TalkModal.tsx` is a channel picker (WhatsApp / Call / Email), and `ContactSection.tsx` is a presentational card + 3D globe — neither POSTs anywhere. **To change the phone number, email, or WhatsApp messages, edit `src/config.ts`** (it updates everywhere). The `server.ts` file contains only the SEO routes and Vite/static serving — nothing else.

## Environment

`.env.example` and the SMTP / `GEMINI_API_KEY` / `APP_URL` variables in it are **AI Studio scaffolding leftovers and are not used** anywhere in the current source (there is no email or Gemini code). No `.env` is required to run the site.

`vite.config.ts` honors `DISABLE_HMR` (AI Studio sets it) to turn off HMR and file watching — leave that behavior alone.
