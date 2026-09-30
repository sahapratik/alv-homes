# Refinement pass — Opening the View

Built on the existing Vite + GSAP + Three.js project (no framework change, no new dependencies, no new assets).

## Changed
- **Palette tokens** aligned to the brief: ink #0B1C27, limestone #F3F0E9, champagne bronze #B79A68, sea slate #55717B (`--slate`). The 3D aperture's bronze was toned to match and is less yellow.
- **Icons**: one 1.5px round-cap stroke family. Arrow and external-link glyphs on buttons and links, bed/bath/area icons on listing facts, phone/mail/chat in the footer, chevrons on gallery controls (`src/refine.js`, CSS masks).
- **Buying journey**: a scroll-linked rail. Steps are marked as the visitor passes them and the rail fills to the last step reached. Layout is unchanged and nothing is hidden (IntersectionObserver, transform/opacity only). Reduced motion shows the final state with no transition.
- **Hero**: headline line wrappers moved into static HTML so the LCP text paints without waiting for JS. The preload now uses `imagesrcset`, so phones fetch the 800w image. The first-visit intro was shortened (2.15s → 1.6s, guard 1.8s → 1.5s). On viewports ≤780px tall the headline and both CTAs now fit in the first view (previously clipped at 1366×640).
- **Menu**: body scroll lock, Tab focus trap, Escape restores focus to the button.
- **Inquiry form**: inline field errors (`aria-invalid`, `aria-describedby`), focus moves to the first error, and a clearer status panel. It still only prepares an email draft and never claims delivery.
- **Accessibility/targets**: card names now come from visible content (Label-in-Name), contrast dips during reveals removed, 44px touch targets on mobile, 32px footer links, market cards get keyboard-focus parity with hover.
- **Persistence**: scroll position is saved continuously, so a real reload mid-page restores it (it previously returned to the top on desktop).
- **Honesty fix**: the testimonial link "Read the client story" pointed at the contact page. It is now "Speak with ALV Homes" → #contact.

## Measured here (headless Chromium 141, software GL; lab numbers, not field data)
| | Before | After |
|---|---|---|
| Lighthouse mobile perf / a11y | 69 / 95 | 89 / 100 |
| Lighthouse desktop perf / a11y | 93 / 95 | 96 / 100 |
| Mobile LCP / TBT (simulated) | 3.6 s / 710 ms | 2.1 s / 410 ms |
| Mobile transfer | 520 KiB | 318 KiB |
| CLS | 0 | 0 |
Best-practices 100. SEO is lower only because of the deliberate preview `noindex`.
Stability (fast scroll, reverse, resize, reload) at 1440×900, 1366×640 and 390×844: no horizontal overflow, no console errors, no content left hidden in view.
Desktop first-visit LCP with the 3D intro under 4× CPU throttle: about 3.2 s (0.8 s with `?intro=off`). Check this on a GPU machine.

## Still open
- **Inquiry delivery**: there is no authorised endpoint. Pick one (ALV backend, Formspree, Resend, etc.) and wire it in `mountContact()` in `src/main.js`.
- Owner must confirm imagery rights and listing availability, update canonical/OG/sitemap/noindex for the final domain, and test on physical phones and a GPU browser.
- Not done: new typeface system (Cormorant + Jost kept), scroll-linked Mediterranean→Bali transition, Lenis.
