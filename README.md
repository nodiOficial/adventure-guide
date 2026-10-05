# Adventure Guide · Link Hub (NFC / QR)

Mobile-first landing page for Adventure Guide — Canyoning Life. Powered by NODI.

## Stack
React 19 · Vite · Tailwind CSS v4 · Framer Motion · Lucide React

## Getting started
```bash
npm install
npm run dev            # local dev server
npm run build          # production build → dist/
npm run build:single   # one self-contained index.html → dist-single/ (easy to host or test)
```

## Where to change things
| What | File |
|---|---|
| Button URLs (placeholders marked `TODO`) | `src/config/links.js` |
| Colors / fonts (design tokens) | `src/index.css` → `@theme` |
| Headline, subtitle, pill | `src/components/Hero.jsx` |
| Footer credit (NODI) | `src/components/Footer.jsx` + `poweredBy` in `links.js` |

## Components
- `BackgroundDecoration` — topographic contours, GPS waypoints, rising particles, mountain ridges, glow. CSS animations only (transform/opacity) for good performance.
- `Hero` — pill, official logo, title and subtitle with staggered fade-up.
- `AdventureLink` — reusable glass card (hover lift, glow, arrow nudge, tap scale 0.98).
- `SocialLink` — maps a config entry to `AdventureLink` with the right icon.
- `RouteLine` — measured SVG trail that connects the card icons (waypoints).
- `Footer` — discreet "Powered by NODI".
- `ClippedImage` — crops empty padding of the logo PNGs with CSS, without editing the files.

## Notes
- Logos are the original files (`src/assets/logos/`). `nodi-web.png` is only a 400px copy of the official NODI logo to keep the page light for mobile data; the original is kept next to it.
- The NODI logo has navy letters on white, so it sits on a small white chip instead of being recolored.
- Accessibility: keyboard focus rings, `aria-label` on external links, `prefers-reduced-motion` respected (CSS + Framer `MotionConfig`), safe-area insets for iPhone, no horizontal scroll.
