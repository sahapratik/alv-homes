> Historical report for the initial implementation. Superseded by IMPLEMENTATION-AND-QA.md and MOTION-MAP.md. Numbers and implementation details below describe the earlier version.

# Implementation and verification

Prepared 29 September 2026.

## Creative rationale

“The Threshold” introduces a considered approach to property rather than a catalogue of effects. A real Alanya coastal photograph is framed by an abstract stone-and-bronze aperture. Scroll motion opens the framing, leading into the founder's statement on an ivory field. Large imagery then takes priority in the property gallery. Dark destination sections and a quiet closing invitation complete the sequence.

Typography remains Cormorant Garamond and Jost. Midnight blue, ivory, bronze and restrained sea-glass tones extend the original design. Text and all controls remain selectable, semantic HTML.

## Implementation by section

| Area | Implemented |
|---|---|
| Arrival | Real ALV coastal imagery, responsive hero image, immediate headline and two usable actions. Removed artificial loading percentages and forced wait. |
| 3D threshold | One lazy Three.js scene with eight box meshes, directional and hemisphere light, small procedural stone variation, bronze edges, capped DPR 1.5. Camera-like advance is produced by moving/opening the frame. No invented villa model. |
| Brand statement | Founder quote verified on the official homepage, readable HTML phrases, restrained opacity/position reveal. |
| Featured properties | Four listing-specific photographs/renders with verified specifications, real links and clear render/amenity labels. Width-derived gallery travel, responsive pin lifecycle, progress and Previous/Next controls. |
| Collection | Category filters, announced result count, direct filtered URLs, links to the full official inventory. Prices explicitly dated. |
| Categories | Official seafront, sea-view, villas, apartments and investment destinations. Keyboard-visible focus treatment. |
| Markets | Distinct Türkiye and Nusa Penida destination imagery, source-grounded pages. Thailand receives an inquiry-led treatment because no Thailand-specific approved photograph was verified. |
| Services | Five native disclosure rows covering discovery, evaluation, viewings, negotiation and completion. Official detailed service links. |
| Trust | Exact short testimonial and attribution from the official contact page, visible without autoplay. |
| Closing | Panoramic coastal image, oversized invitation and clear inquiry action. |
| Contact | Required-field validation and honest email-draft handoff, plus official inquiry form, phone, WhatsApp, verified address/hours. No false “received” state. |
| Navigation | Six hash views, document titles, focus transfer, back/forward state handling, mobile menu and Escape behavior. |
| Accessibility | Native links/buttons/details, alt text, visible focus, skip link, reduced-motion system preference and explicit toggle. |
| Metadata | Canonical to official site, private-preview noindex, robots exclusion, minimal sitemap, favicon and photo-based social metadata. |

## Original audit and architecture

The source was one 221-line HTML file with inline styles, hard-coded listings and scripted SVG imagery. Its contact form hid itself after a timeout without sending a request. Its loader imposed a timed wait. All major selling imagery is replaced here with sourced files.

The enhancement retains a small vanilla application instead of a React migration. Vite provides pinned dependencies, compression-friendly output, local assets and a lazy Three.js chunk. The six hash routes remain appropriate for this private preview and static deployment, but independently indexed route pages would be a separate production routing decision.

The original full hard-coded array is not republished as verified inventory. Four directly checked properties are featured; fourteen other original cards were excluded from this curated preview, with access to the full inventory preserved through official links. In particular, property 152 has conflicting bedroom information across its own source, so that specification is not repeated. Changing price claims, residency/citizenship eligibility, return guarantees, subscriber counts and unsupported awards were not introduced.

The original automatic dark-theme variation and perpetual marquee were replaced by a deliberately alternating navy/ivory composition. This prevents the art direction from depending on operating-system theme. No custom cursor or forced smooth-scroll layer was added.

## Source verification

Business, contact and service information was checked on:

- https://www.alv-homes.com/
- https://www.alv-homes.com/about-us
- https://www.alv-homes.com/our-story
- https://www.alv-homes.com/markets
- https://www.alv-homes.com/services
- https://www.alv-homes.com/contact
- https://www.alv-homes.com/properties/id164
- https://www.alv-homes.com/properties/id165
- https://www.alv-homes.com/properties/id2
- https://www.alv-homes.com/properties/id154

The founder quote is from the homepage. The Anna & Johan Lindberg testimonial is from Contact. A website publication is evidence of what ALV states; it is not independent verification of business outcomes or image ownership.

## Verification scope and limitations

Real Chrome browser inspection used the managed preview. The responsive harness sets an iframe's actual viewport to 1440×900, 1024×768, 768×1024, 390×844, 320×740 and 1440×700; these are layout checks, not real phone hardware tests. A native desktop view around 1363×936 was also inspected.

No horizontal document overflow was measured at those six harness sizes. Hero, statement, collection and narrow catalog screenshots were inspected. A gallery-height defect was found and corrected: pinning now requires at least 820px height, and the pinned section's imagery scales with viewport height. The mobile menu opened, transferred focus to its first link and closed when navigating. Filters changed the selected state, result count and URL. The reduced-motion toggle was exercised: it removed both pin spacers and left zero canvas elements; re-enabling motion restored the two expected spacers. A refreshed Bali filter still showed exactly one property. Back navigation returned through the collection to Home with the matching title.

The email form blocked missing required information. A test using preview@example.com produced a correctly encoded mailto to ALV's published address. The browser has no email client and initially rendered an external-protocol error. The final new-target handoff was then retested: the original contact page remained available with an accurate draft-ready message, persistent encoded draft link and official-form fallback. No email or actual ALV inquiry was sent.

This browser disables WebGL: Three.js reported that it could not create a context. The live 3D appearance, GPU performance and context-loss recovery are therefore NOT visually verified. The code provides a visible photographic/CSS fallback, which remained usable under that actual failure. Do not treat the 3D scene as client-approved until checked on a GPU-enabled browser.

A three-second tablet-width scroll sample collected 182 animation frames: median 16.7 ms, p95 16.7 ms, zero intervals above 50 ms. This measures the remote browser's fallback view, not a mid-range laptop GPU or phone.

A first-paint stylesheet shift was diagnosed and corrected by inlining the authored stylesheet in the HTML head. A fresh 1440×900 warm-cache preview load then measured LCP 372 ms and CLS 0.00451. Earlier resizing/development sessions are not comparable and were discarded as performance benchmarks. These are limited local lab diagnostics, not a production network audit. No field p75 LCP, INP or CLS result is claimed. Lighthouse, CPU/network throttling, real-device touch, 200% browser text enlargement and real GPU traces remain external validation work. The target values from the brief remain targets.

## Required ALV confirmations for public launch

1. Rights to reuse the official property and destination imagery, including any third-party photographer/stock licenses. Existing watermarks remain in the source files.
2. Current availability, prices, render status and completion details of listings 164, 165, 2 and 154.
3. Whether the text-based ALV wordmark is acceptable or a supplied master logo must replace it.
4. The desired production inquiry endpoint, if email drafts and the official form are to be replaced by integrated delivery.
5. Final domain, canonical/indexing policy and a GPU-enabled visual sign-off of the threshold.

## Technical references consulted

- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- https://threejs.org/docs/pages/WebGLRenderer.html
- https://web.dev/articles/vitals
- https://gsap.com/standard-license/

Both supplied guides, “How to Build a 3D Website” and “The 3D Web Toolkit,” were read in full.

## Final transfer-size inventory

| File | Raw bytes | Gzip bytes |
|---|---:|---:|
| `assets/bali.webp` | 224,028 | 224,116 |
| `assets/cormorant-italic.woff2` | 24,672 | 24,700 |
| `assets/cormorant.woff2` | 23,592 | 23,620 |
| `assets/hero-small.webp` | 47,298 | 47,331 |
| `assets/hero.webp` | 206,504 | 206,587 |
| `assets/index-ZiBm9nL5.js` | 135,166 | 52,938 |
| `assets/jost.woff2` | 11,424 | 11,447 |
| `assets/property-154.webp` | 76,950 | 76,993 |
| `assets/property-164.webp` | 136,254 | 136,317 |
| `assets/property-165.webp` | 88,970 | 89,018 |
| `assets/property-2.webp` | 90,152 | 90,200 |
| `assets/threshold-C2-M1Iwd.js` | 474,304 | 118,014 |
| `assets/turkey.webp` | 291,912 | 292,020 |
| `index.html` | 32,570 | 9,295 |
| `style.css` | 23,137 | 5,949 |

Gzip figures are locally measured file encodings, not captured network transfers. WebP and WOFF2 are already compressed. The lazy threshold chunk includes the Three.js runtime; procedural model/texture network payload is zero.
