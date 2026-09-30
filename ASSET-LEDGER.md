# Asset ledger

Checked 29 September 2026. All photography and property renders came from the official ALV Homes website. No stock photo or invented listing image was added.

**Permission status:** official-site provenance is verified; client authorization for broader republication is not. ALV’s footer reserves rights, and no broad image license was found. This implementation is a private prototype. Public rollout requires ALV to confirm the photographer/stock rights. Source watermarks are retained.

| Local file | Dimensions | Bytes | Represents | Source |
|---|---:|---:|---|---|
| `hero.webp` | 1800 × 1092 | 206,504 | Alanya shore with the historic shipyard walls, hillside and sailboat. Quieter hero alternative with open sky and water. | [Official page](https://www.alv-homes.com/why-turkey) · [Original asset](https://static.wixstatic.com/media/3eee0a_9bf0cb74456d457594d3e6b68767446d~mv2.jpg) |
| `hero-small.webp` | 800 × 485 | 47,298 | Alanya shore with the historic shipyard walls, hillside and sailboat. Quieter hero alternative with open sky and water. | [Official page](https://www.alv-homes.com/why-turkey) · [Original asset](https://static.wixstatic.com/media/3eee0a_9bf0cb74456d457594d3e6b68767446d~mv2.jpg) |
| `turkey.webp` | 1200 × 800 | 291,912 | Alanya harbour and Red Tower backed by mountains. Turkey market card. | [Official page](https://www.alv-homes.com/) · [Original asset](https://static.wixstatic.com/media/3eee0a_38c72c7dcd6c46bbb3e154e746b42f34~mv2.jpg) |
| `bali.webp` | 1200 × 793 | 224,028 | Kelingking Beach cliffs and turquoise water, Nusa Penida, Bali. Bali and surrounding islands market card; do not label as mainland Bali property. | [Official page](https://www.alv-homes.com/) · [Original asset](https://static.wixstatic.com/media/3eee0a_d8f12815a1aa45f8b9090cae97b74b57~mv2.jpg) |
| `property-164.webp` | 1000 × 750 | 136,254 | Furnished penthouse balcony overlooking Alanya, sea and sunset. Photography; matches homepage card. | [Official page](https://www.alv-homes.com/properties/id164) · [Original asset](https://static.wixstatic.com/media/3eee0a_55e1f484150e49b89aeda96f362e0c01~mv2.jpg) |
| `property-165.webp` | 1000 × 500 | 88,970 | Modern villa front elevation and private outdoor area. Architectural visualisation, explicitly labeled on official source. Planned completion end 2026. | [Official page](https://www.alv-homes.com/properties/id165) · [Original asset](https://static.wixstatic.com/media/3eee0a_aa63c97cc2274500a270547da656adcd~mv2.jpg) |
| `property-2.webp` | 1000 × 667 | 90,152 | Seafront infinity pool at sunset at the Kargicak apartment development. Photography of shared amenity; logo watermark included in original. | [Official page](https://www.alv-homes.com/properties/id2) · [Original asset](https://static.wixstatic.com/media/3eee0a_19b13bcb0f4a4d538bf69c191e79dca8~mv2.jpg) |
| `property-154.webp` | 1000 × 562 | 76,950 | White Mediterranean-style Bali apartment development with courtyard swimming pool. Architectural render; retain visualisation label. Apartments have 1–2 bedrooms in narrative; bathrooms unspecified. | [Official page](https://www.alv-homes.com/properties/id154) · [Original asset](https://static.wixstatic.com/media/3eee0a_748e1276b9114a8bbb9030684df4bb99~mv2.jpg) |

## Fonts and code assets

| Asset | Status | Bytes |
|---|---|---:|
| `cormorant.woff2` | Google Fonts source, SIL Open Font License. Locally subset and encoded as WOFF2; license included. | 23,592 |
| `cormorant-italic.woff2` | Google Fonts source, SIL Open Font License. Locally subset and encoded as WOFF2; license included. | 24,672 |
| `jost.woff2` | Google Fonts source, SIL Open Font License. Locally subset and encoded as WOFF2; license included. | 11,424 |
| Three.js 0.180.0 | MIT; license included. | See bundle report |
| GSAP 3.13.0 + ScrollTrigger | Standard no-charge license; source URL included. | See bundle report |
| Architectural aperture | Original procedural boxes/materials in code; conceptual, not a listing. | 0 downloaded model/texture bytes |
| Favicon | Original geometric aperture SVG in HTML. | Inline |
| Supplied logo (`alv-logo.jpg`) | Exact user-supplied `01-LOGO-WEISS_PNG.jpg`. Black JPEG surround is hidden with a CSS luminance mask; original pixels are unchanged. User-supplied brand asset, no general sublicensing claim. | 8829 |

No GLB, HDRI, KTX2, Draco or Meshopt files are needed because there is no external model or texture payload.

Unused source candidates remain documented in `asset-provenance.json`; they are not shipped in the site.
## Motion refinement additions

The new foreground portal, separating mineral planes, bronze edge trace, and camera passage use original Three.js box geometry. The 128×128 mineral variation is generated locally from a deterministic pixel pattern. No external model, texture, image, HDRI, font, sound, or motion-reference footage was added. Existing destination/listing imagery is reused for category focus previews. No video is loaded by the website; proof recordings are separate handoff files.
