# The Threshold — motion refinement

The existing ALV design is retained: all six pages, homepage section order, photographs, card layout, fonts, navy/ivory colours, and factual content. The supplied logo replaces the typographic stand-in in the header and footer. Its original JPEG is untouched; a CSS luminance mask makes the black surround transparent when displayed.

| Sequence | Choreography | Purpose / resting state |
|---|---|---|
| First arrival | Actual Three.js portal; bronze edges draw, three mineral planes part, camera passes the foreground portal and resolves to the hero frame. 2.15s after readiness; 1.8s maximum readiness wait. Skip, scroll, touch, Escape, navigation and reduced motion can finish immediately. | A concise architectural introduction. All content and primary actions remain HTML and usable. Asset readiness is based on image decode and module readiness, with no percentage counter. Context availability is checked once and a failure is remembered for the browser session. The first initialization is deferred until after the initial paint opportunity. |
| Hero | 1.7s image resolve; 1.05s frame trace; 1s headline masks, 110ms stagger; copy and labels settle. On scroll, photo travels 15%, content rises 65px and frame turns gently. | Makes the promise and property CTA clear. Native scrolling, no hero pin; backward scroll restores the image and composition. |
| Founder statement | Ivory/light surface recedes; selectable quote phrases gain emphasis; attribution and body follow; a 1.2s fine rule connects them. | A calm reading interval grounded in the verified founder quotation. |
| Collection | 1.15s photographic aperture; facts never masked. Measured rail travel drives one GSAP animation state, counter, progress and button targets. 300ms scrub smoothing; 720ms button travel. | Property inspection remains primary. One transform-based pin on sufficiently tall fine-pointer desktops; native horizontal scrolling elsewhere. Keyboard focus clears any competing native rail scroll offset. |
| Categories | Rules draw over 900ms with 100ms stagger. Labels settle; underline travel and an 8px text shift respond to focus/hover. A verified image glimpse appears in the free space under the introductory copy on wide screens. | Makes destinations tangible while keeping the rows and labels unobscured. No floating cursor or invented imagery. |
| Markets | Short ivory-to-navy change of light, distinct directional masks for Türkiye and Bali, a quiet 6% total image depth travel. Thailand remains text. | Makes the destinations distinct without obscuring their descriptions. |
| Services | A fine rule traces the journey. Native details/summary retains keyboard semantics; 480ms coordinated height change and 320ms body reveal. | Lets visitors understand one step at a time. Height is measured only on activation, not each animation frame. |
| Testimonial | Slow 1.4s settling into complete readability, followed by stillness. | Gives verified client testimony time to be read. |
| Closing | Coastal image resolves from 1.08 scale and a small vertical offset; headline then inquiry action. | Leads to a personal conversation without popups. |
| Internal navigation | Paired navy architectural panels close in 230ms and reopen in 430ms. New page entry is 750–950ms. Latest route wins if interrupted. | Bridges pages, resets/restores scroll and moves focus to the new heading. External links bypass it. |
| Properties | Fast image apertures and 550ms filter response, steady facts and live result count. | Privileges browsing and prices. |
| Markets / Our Story | Editorial image masks followed by headings and readable copy. | Builds place knowledge and credibility. |
| Services page | Journey rule, coordinated accordion and restrained related-link reveals. | Privileges understanding. |
| Contact | Short heading entry, focus and validation feedback; fields never wait for animation. | Keeps completing an inquiry straightforward. A prepared email draft is never described as a delivered inquiry. |
| Reduced motion | Complete static content, no 3D, pin, camera travel, or route curtain. Native gallery and disclosure behavior. | Preserves all content and actions without delayed reading. |

## References studied

The supplied **The 3D Web Toolkit** and **How to Build a 3D Website** were read in full. Three Codrops references informed technique, not layout or identity:

1. [On-Scroll Typography Animations](https://tympanus.net/codrops/2023/01/18/on-scroll-typography-animations/) — semantic type, transform origins, and restrained use of scroll effects. The live demo was inspected; its external loading state was not used as an ALV design model. ALV uses whole lines/phrases rather than scattering characters.
2. [Image To Grid Transition](https://tympanus.net/codrops/2022/05/19/image-to-grid-transition/) — a continuous image-to-destination relationship. Applied as an architectural intro-to-hero handoff, without borrowing its grid or assets.
3. [Creating a Menu Image Animation on Hover](https://tympanus.net/codrops/2020/07/01/creating-a-menu-image-animation-on-hover/) — deliberate image reveals tied to useful destinations. ALV fixes the image in existing whitespace and supports keyboard focus; it does not adopt the large cursor-following swings.

Articles and source explanations informed timings; exact reference timings were not measured. No third-party demo footage, code, or artwork is distributed with this project.

Official API references checked: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), and [Three.js documentation](https://threejs.org/docs/). Existing GSAP 3.13.0 and Three.js 0.180.0 dependencies were preserved.
