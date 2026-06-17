# 4X BackOffice

Marketing/landing site for **4X BackOffice** — a B2B Forex back-office solutions company. A React single-page app served by a thin Express server.

## Tech Stack

- **React 19 + TypeScript** with a hand-rolled router (no react-router)
- **Vite 6** for bundling and dev server
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **motion** (Framer Motion) for animations
- **three** + `@react-three/fiber` / `drei` for 3D (services WebGL view, contact globe)
- **Express** server for dev (Vite middleware) and production (static SPA + SEO routes)

## Prerequisites

- Node.js

## Run Locally

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3535
```

The dev server (`tsx server.ts`) runs Express with Vite middleware. Override the port with the `PORT` environment variable.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Express + Vite middleware dev server on `http://localhost:3535` |
| `npm run build` | Build client to `dist/` and bundle the server to `dist/server.cjs` |
| `npm start` | Serve the prebuilt `dist/` as a static SPA |
| `npm run lint` | Type-check only (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` build output |

## Pages

`/` · `/why-us` · `/services` · `/products` · `/contact`

## Contact

Contact actions are outbound deep-links (WhatsApp, phone, email) — there is no contact-form backend. To change the phone number, email, or WhatsApp messages, edit `src/config.ts`.
