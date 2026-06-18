# Change Log — 4XBO-WEBSITE customizations

A reproducible list of every change made, in order. Paths are relative to the
project root (`C:\Users\Dell\Projects\4XBO-WEBSITE`).

---

## 0. Environment / setup

1. **Cloned** `https://github.com/aangeejain-4xbo/4XBO-WEBSITE.git`, ran `npm install`.
2. **Moved the project out of OneDrive** → `C:\Users\Dell\Projects\4XBO-WEBSITE`.
   - Reason: OneDrive sync collided with Vite's file watcher (EBUSY locks on
     `public/partners/*`), crashing `npm run dev` on every file write.
   - Reinstalled `node_modules` at the new location; deleted the old OneDrive copy.
3. **Desktop shortcuts** (on the OneDrive Desktop, harmless to sync):
   - `4XBO-WEBSITE.lnk` → opens the project folder.
   - `Start 4XBO Website.lnk` → runs `start.bat`.
4. **Added `start.bat`** (project root): cd to its own dir, `npm install` if
   `node_modules` missing, open `http://localhost:3535`, then `npm run dev`.
   - Dev server runs on **port 3535** (per `server.ts`), not 3000.

---

## 1. Directional page-transition curtain — `src/components/PageTransition.tsx`

Made the route-change curtain sweep **with** the navigation direction.

- Added page order: `const PAGE_ORDER = ["/", "/why-us", "/services", "/products", "/contact"]`
  and an `orderIndex(path)` helper (unknown routes sort last).
- Track the previous path in a `useRef`; on each `currentPath` change compute
  `dir` = `1` (forward) if new index ≥ old index, else `-1` (backward).
- Store `{ key, dir }` in state instead of just a key.
- Forward sweeps left→right (`initial x:-100%`, `exit x:100%`); backward reversed
  (`initial x:100%`, `exit x:-100%`).
- The bright gold leading edge moves to the side the panel travels toward
  (`right-0` forward / `left-0` backward).

---

## 2. Footer blank space — `src/components/Footer.tsx`

- Removed `mb-16` from the link-columns grid `<div>` (the one with
  `grid ... lg:grid-cols-12 gap-12 text-left mb-16 relative z-10`).
- Reason: leftover 64px bottom margin from a removed copyright bar created a
  blank gap at the bottom of **every** page.

---

## 3. FAQ — keep hover, remove lag, smoother — `src/components/SEOSections.tsx`

In the FAQ items map (`faqItems.map(...)`):

- **Kept** the `onMouseEnter={() => setOpenFaq(idx)}` / `onMouseLeave={() => setOpenFaq(null)}`
  hover-to-open behavior.
- Replaced the item card's heavy `transition-all duration-500` with a targeted
  transition: `[transition:border-color_400ms_ease,box-shadow_400ms_ease,background-color_400ms_ease]`
  (removes the per-property repaint cascade that caused lag).
- Chevron `motion.div`: `transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}`.
- Expand/collapse `motion.div`: split transition —
  `height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }`, `opacity: { duration: 0.35, ease: "easeInOut" }`
  (smoother, slightly slower open).

---

## 4. Snappier page navigation — `src/App.tsx`

In `renderContent()` the per-route `motion.div` transition durations were tightened
(the curtain already covers the swap, so long content fades read as lag):

- `transition={{ duration: 0.4 }}` → `0.25` (home, products)
- `transition={{ duration: 0.35 }}` → `0.3` (why-us, services, contact)

---

## 5. Technology Partners logos — `src/components/Partners.tsx`

Refactored from per-logo JSX/SVG to a **data-driven** array, every logo on an
identical **white chip that hugs the logo** (no big empty box).

- Replaced `partnerLogos` with:
  ```ts
  const partnerLogos = [
    { id: "primexm",        src: "/partners/primexm.png",      alt: "PrimeXM",            imgClass: "h-[44px]" },
    { id: "metatrader5",    src: "/partners/metatrader5.png",  alt: "MetaTrader 5",       imgClass: "h-[38px]" },
    { id: "centroid",       src: "/partners/centroid.webp",    alt: "Centroid Solutions", imgClass: "h-[44px]" },
    { id: "toolsforbrokers",src: "/partners/toolsforbrokers.jpg", alt: "Tools For Brokers", imgClass: "h-[56px]" },
    { id: "techysquad",     src: "/partners/techysquad.png",   alt: "TechySquad",         imgClass: "h-[44px]" },
  ];
  ```
- `renderCard` signature now takes `{ id, src, alt, imgClass }`.
- Logo holder (inside the `.group` card): white chip that hugs content —
  `bg-white rounded-md inline-flex items-center justify-center px-3.5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.45)] ring-1 ring-white/10`
  containing `<img src alt loading="lazy" decoding="async" className={`${imgClass} max-w-[185px] w-auto object-contain`} />`.
- Inline SVGs for MetaTrader 5 / Centroid / Tools For Brokers were removed.

---

## 6. Logo asset files — `public/partners/`

Final, optimized files (downscaled with high-quality bicubic resampling):

| File | Source | Final size / dims |
|------|--------|-------------------|
| `primexm.png`        | pikpng link (user) → downscaled       | 16.8 KB, 320×124 (was 227 KB, 4721×1830) |
| `metatrader5.png`    | metatrader.com (user's search link)   | 21.6 KB, 360×62 |
| `centroid.webp`      | Bing thumbnail                        | 3.4 KB |
| `toolsforbrokers.jpg`| financemagnates → downscaled          | 6.9 KB, 300×167 (was 68 KB, 900×500) |
| `techysquad.png`     | existing → downscaled                 | 13.8 KB, 180×64 |

Total partner-logo payload: ~313 KB → ~62 KB.

---

## How to reproduce from a fresh clone

Reproducing means **cloning the repo again into a different (non-OneDrive) folder**
— e.g. `C:\Users\Dell\Projects\...` — NOT `OneDrive\Desktop`, or the dev-server
file-lock crashes return. A fresh clone will NOT contain our optimized logo files
or code edits, so both must be re-applied.

1. `git clone https://github.com/aangeejain-4xbo/4XBO-WEBSITE.git` into a
   **non-OneDrive** folder; `cd` in; `npm install`; `npm run dev` (→ http://localhost:3535).
2. Apply the code edits in sections 1–5.
3. Re-create the optimized logo files (section 6) in `public/partners/`
   (re-download the sources, then downscale — or copy them from this project's
   `public/partners/` if it's still around).
4. `npm run lint` to confirm the type-check passes.

> Tip: the simplest way to "do it again" is to just **copy this whole project
> folder** to the new location instead of re-cloning — everything (edits +
> optimized logos + `start.bat`) comes along intact.
