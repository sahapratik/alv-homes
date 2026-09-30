# ALV Homes — The Threshold

The motion refinement of the existing ALV Homes site: six preserved pages, supplied white logo, a real architectural first-arrival scene, synchronized gallery, page transitions, and honest inquiry preparation.

## Run

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. To produce static hosting files:

```sh
npm run build
npm run preview
```

`dist/` is the ready-to-host version. Serve it through an HTTP server; double-clicking `index.html` with a file:// URL will not run module imports reliably. The preview at https://alv-threshold.pratik-s.chatgpt.site is private; no public ALV domain has been changed.

## Project map

- `index.html`: semantic homepage, shared navigation and footer.
- `public/style.css`: design tokens, component styles, breakpoints, reduced-motion states. Vite inlines this stylesheet in the head for a styled first paint.
- `src/main.js`: six hash views, inquiry draft, menus, gallery and GSAP lifecycle.
- `src/data.js`: four checked listings, categories and services.
- `src/motion.js`: entrances, scroll sequences, synchronized gallery, disclosure motion and reduced-motion lifecycle.
- `src/threshold.js`: lazy Three.js architectural aperture and camera passage, entirely procedural geometry.
- `public/assets`: local optimized WebP photographs/renders and WOFF2 fonts.
- `public/licenses`: font licenses, Three.js license and GSAP license source.
- `qa.html`: development-only iframe viewport and frame-timing harness. Not included in the production build.
- `reports`: rationale, implementation, verification and asset documentation.

## Editing

Change property data in `src/data.js`; validate every changed price, specification and image against the corresponding ALV listing page. Four selected properties are presented here; the full ALV inventory and investment categories link to their authoritative official pages. This is a dated editorial snapshot, not an automatically synchronized inventory.

Use `#home`, `#properties`, `#markets`, `#services`, `#about` and `#contact`. Filter examples: `#properties:Villas` and `#properties:Sea%20view`. The prior `Sea View`, `Sea Front` and `Payment Plan` spellings are accepted. Unsupported old filter names fall back to All.

## Inquiry behavior

There is no authorized server endpoint in the supplied project. The form validates required fields, prepares a percent-encoded email draft to ALV's published email address, and leaves sending to the visitor's email app. It never reports receipt or delivery. The official ALV inquiry form and WhatsApp are also available. No client-side personal information is stored.

## 3D and motion

The aperture is abstract architecture, not a marketed property. The first-visit intro starts after hero/module readiness and has a bounded fallback and Skip control. The 3D alternative is enabled above 800px if WebGL2 is available. The gallery pins only above 1024px, at least 820px high, with a fine pointer and sufficient space for the complete stage. Smaller screens, short laptops and touch-first devices use native horizontal browsing. System reduced motion and the footer motion switch disable the camera, pinning and parallax. Rendering is on demand, stops offscreen/when hidden, and disposes resources on route or breakpoint changes.

Use `/?intro=1#home` to request a first-arrival preview, `/?intro=off#home` to omit it, and `/?webgl=off#home` for the static alternative. A failed WebGL context is remembered for this browser session.

Native scrolling is retained. Only the gallery pins, using a transform-based pin to avoid fixed-position boundary layout shifts. Lenis was unnecessary. No 3D model, HDRI or texture network requests are made. Three.js is a separate lazy chunk.

## Before public launch

Read `reports/IMPLEMENTATION-AND-QA.md`, `reports/MOTION-MAP.md`, and `reports/ASSET-LEDGER.md`. The handoff ZIP also contains actual continuous recordings, before/after comparisons, and raw QA measurements. `baseline/` preserves the previously published source for local comparison; it is excluded from the production build. Client imagery rights and current listing availability require ALV confirmation. Validate the WebGL scene on a GPU-enabled browser and real devices. Audit production performance under throttled network/CPU conditions. The preview deliberately uses noindex and disallows crawling; update canonical, sitemap, social-image origin and indexing settings for the authorized final domain.
