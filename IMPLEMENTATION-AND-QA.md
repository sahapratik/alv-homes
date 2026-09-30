# Motion refinement — implementation and verification

Completed implementation review: 29 September 2026 (UTC). This report supersedes the initial build history. The final production build is generated from the same source as the local motion preview.

## What changed

The Threshold now connects a real Three.js architectural arrival, hero composition, founder statement, collection, categories, markets, service disclosures, testimonial and inquiry. All six pages, property photographs, factual content, typography, palette and section order are retained. The supplied white ALV logo replaces the earlier typographic stand-in.

The gallery uses one measured position for its rail, active card, counter, progress and button destinations. It is the only pinned section. The earlier hero pin and unsuitable short-screen pin behavior caused excess blank travel into the collection. The hero now remains in normal flow, and the collection pins only when its complete stage fits. Focus navigation also clears competing native horizontal scroll offsets.

A final measurement exposed large layout-shift entries when the gallery switched to fixed positioning. A transform-based pin eliminated those entries in the repeated recording. The photo entrance affects images only; all listing facts remain visible throughout. No synthetic loading percentage, invented property scene, fake testimonial or delivered-inquiry claim is used.

See MOTION-MAP.md for exact choreography, duration and purpose. See ASSET-LEDGER.md for provenance and rights status.

## Responsive and interaction checks

Actual iframe viewport dimensions in the remote Chrome browser were used; these are layout checks, not physical-device tests.

| Viewport | Pages checked | Horizontal document overflow | Broken completed images |
|---|---|---:|---:|
| 1440 × 900 | Home, Properties, Markets, Services, Our Story, Contact | 0px on all | 0 |
| 1024 × 768 | All six | 0px on all | 0 |
| 768 × 1024 | All six | 0px on all | 0 |
| 390 × 844 | All six | 0px on all | 0 |
| 320 × 740 | All six | 0px on all | 0 |

Additional checks covered 1440×700 and 1280×820. Home section checks at desktop and mobile covered hero, statement, collection, categories, markets, services, testimonial and closing. The final 320px header was rechecked after increasing the supplied logo size: no overflow, clipped CTA or broken images.

- Gallery: first-to-last, reverse travel and Previous/Next; one eligible desktop pin, no mobile/internal-page pins. The collection remains visible through its entry and exit in the final recordings.
- Navigation: all internal routes, headings/titles, back navigation, filter history, rapid-route interruption, mobile menu and Escape. The latest requested route wins during a transition.
- Filters: Bali produces one matching property and the correct count/URL; Villas filtering is shown in the owner journey.
- Services: native summary activation by mouse and keyboard; animated height settles back to auto. Reduced motion retains native disclosure behavior.
- Inquiry: native required-field failure and valid email-draft preparation checked. Final message accurately asks the visitor to send through their email app. Persistent draft and official-form alternatives remain. Test values used preview@example.com. No email or inquiry was sent.
- Reduced motion: explicit control exercised; zero canvas elements and pin spacers, complete static text/images and working disclosures. Motion can be re-enabled without trapping the visitor. The system preference is supported in code; a separately emulated operating-system preference was not tested here.
- Semantics: native links, buttons, headings, form labels, details/summary, alt text, focus styles, heading focus after route changes and a skip link. Text remains selectable. This is functional verification, not a full WCAG or screen-reader certification.

## Recordings and image proof

The owner presentation is approximately 82 seconds. The separate uncut scroll is approximately 62 seconds. Both final versions use the transform-based pin. Mobile and reduced-motion alternatives are approximately 22 seconds each; they were recorded before the desktop-only pin change, which does not affect those alternatives.

The recordings contain actual consecutive browser screenshots with their original elapsed timestamps, captured in one continuous call per recording. They are silent. The QA controls are cropped away; the site viewport is normalized to its logical size. Output is encoded at 25fps by repeating captured frames, not by generating/interpolating motion. Capture rate is approximately 9fps; therefore the video is evidence of behavior and continuity, not a 25fps/60fps rendering benchmark. Exact counts, elapsed time and maximum capture gaps are in RECORDING-METADATA.json. No cuts, reordered moments or speed ramps conceal behavior.

The development-only qa.html driver reproduces the shown scroll/navigation sequence. Whole-journey contact sheets and denser collection samples were visually inspected. Entrance/mid/exit stills from earlier responsive runs and matched before/after resting states are included. Every individual captured frame was retained during production of the videos, but an exhaustive human review of every frame is not claimed.

Baseline comparison uses the previously published source at commit c24d959a5f953d2d3632c5f641fff259b32d2a28, preserved in baseline/. It is not the much older supplied single-file design in reports/original.html. The deployed Vercel reference was also inspected. Matched comparison sheets show hero, statement, collection and services with the same photography, typography, section composition and factual content. The new logo and removal of unwanted pin travel are intentional changes.

## Performance — actual measurements and limits

| Measurement | Observed result | Meaning |
|---|---:|---|
| Final owner journey, 1280×820 | LCP 3064ms; raw shift sum 0.00827; one 53ms long task | Whole recorded session, WebGL fallback |
| Final uncut scroll, 1280×820 | LCP 3028ms; raw shift sum 0.000093; one 52ms long task | Whole recorded session, WebGL fallback |
| Transform-pin diagnostic, 1440×900 | LCP 172ms; raw shift sum 0.000541 | Warm preview diagnostic, not directly comparable to recording loads |
| Earlier intro-enabled / intro-disabled arrival pair | LCP 3036ms / 3040ms | No demonstrated LCP penalty from the unavailable 3D intro in this pair |
| Earlier 5-second frame sample | median 16.7ms, p95 33.3ms, 3 intervals over 50ms | 162 sampled intervals; remote browser fallback only |
| Previous fixed-pin uncut scroll | raw shift sum 1.70497 | Defect diagnosed and corrected before final recordings |

The harness reports the sum of layout-shift entries without recent input; it is not the official session-window CLS algorithm. Programmatic scroll/activation and screenshot capture affect the lab environment. The final results removed gallery-boundary shift entries, but are not field Core Web Vitals. LCP of roughly 3 seconds in recorded runs does not meet a 2.5-second target. No production p75 LCP, INP, real-GPU frame rate, throttled CPU/network result or Lighthouse score is claimed.

Geometry is lightweight and procedural, Three.js is lazily split, maximum DPR is 1.5, idle/offscreen rendering stops, and resources are disposed on navigation/breakpoint changes. The first arrival has a 1.8-second readiness guard, a 2.15-second sequence after readiness, Skip/Escape/scroll/touch escape and a static alternative. The image and primary actions remain usable HTML. WebGL context failures are remembered for the session to prevent repeated failed context creation.

Final raw/gzip output sizes are in bundle-sizes.json. Gzip values are local encodings, not measured network transfers. The browser failed WebGL before loading the Three.js chunk in the latest fallback path.

## Incomplete visual and performance proof

This browser reports GL_VENDOR and GL_RENDERER as Disabled and cannot create a WebGL context. The real Three.js separating-plane/camera-passage sequence is implemented but its GPU-rendered appearance, context-loss recovery and frame rate are **not visually verified or recorded**. The provided videos show the actual photographic/CSS fallback. A GPU-enabled browser is required for that remaining sign-off; no simulated 3D footage is presented as proof.

Physical-phone touch behavior, real-device GPU performance, CPU/network throttling, full DevTools tracing, screen-reader operation, 200% text enlargement and a comprehensive contrast audit remain untested. These limitations mean the full proof standard in the brief is not completely satisfied here. The private working preview and completed source are provided with these limits explicit.

## Delivery and public launch

This update keeps the existing private preview audience. The original Vercel site and official ALV domain are unchanged. The site prepares an email draft because no authorized delivery endpoint was supplied. Listing prices and availability remain a dated snapshot; check official listing pages before acting on them. ALV must confirm broader imagery publication rights and production-domain/indexing settings before a public rollout.

Official business and listing references were reviewed during the implementation; URLs are retained in ASSET-LEDGER.md, asset-provenance.json and the source. Both supplied 3D guides were read. Codrops and official API references are listed in MOTION-MAP.md.
