# Aditya Mer Portfolio — Design Tokens

## Color
- Background: #FAF9F6 (very subtle warm paper tint)
- Text / ink: #1A1A1A
- Muted: #6B6B66
- Card surface: #FFFFFF
- Border: #E7E5E0
- Accent (rust): #C2410C, light: #E8744A — used sparingly for emphasis only
- Accent (green): #3F6212 — tags / "impact" labels
- Light mode only (`color-scheme: light`).

## Typography
- Display: Playfair Display (editorial serif, weight 400-900)
- Body: DM Sans (geometric sans, weight 300-600)
- Code/Numbers: JetBrains Mono (monospace, weight 400-500)
- Body line length: 65-75ch max
- Scale ratio: 1.25 (major third)

## Spacing
- Section padding: 6rem top/bottom (desktop), 4rem (mobile)
- Container max-width: 1200px
- Grid: 12 columns, 24px gutter

## Motion
- Easing: cubic-bezier(0.16, 1, 0.3, 1) (exponential ease-out)
- Duration range: 0.6s-1.4s
- Animate only transform and opacity
- No bounce, no elastic

## 3D Background (Scene3D)
- A fixed, full-viewport React Three Fiber canvas behind all content (`z-index: -10`).
- Motif: monochrome point-cloud "neural lattice" — ink particles on a fibonacci sphere.
- Scroll progress (0→1) drives rotation, a scatter→reform "breath", and an ink→rust color mix.
- Strictly monochrome + restrained rust. No rainbow, no glassmorphism.
- Lazy-loaded client-only (`ssr: false`), DPR capped to [1, 1.5], `AdaptiveDpr`.
- Fallback to a static dot-grid + soft aurora when: `prefers-reduced-motion`, small touch
  devices (< 768px coarse pointer), or no WebGL.
- Content sections use a translucent background (`bg-[var(--bg)]/40`) so the lattice reads
  faintly behind them while keeping text legible.

## Elevation
- No box shadows. Use borders (1px solid var(--border)).
- No layered shadows or depth effects.

## Border
- 1px solid #111111 throughout
- No border-radius (0px)

## Components
- Custom cursor: 10px filled ink dot + lagging 38px ring (lerp 0.18), `mix-blend-mode: difference`.
  Fine-pointer only; disabled under reduced-motion. Ring grows + turns rust over interactive elements.
- Navigation: fixed top, transparent until scroll, then solid card surface + border.
- Section numbers: monospace, "NN / Label" format.
- Buttons: border-only or solid ink fill; rust on hover.
- Links: underline-draw on hover (1px, cubic ease-out).

## Scroll system
- Smooth scroll via Lenis, synced to GSAP ScrollTrigger (`SmoothScroll` provider).
- Reusable hooks in `src/lib/gsap.ts`: `useGsapReveal`, `useGsapCounter`, `useGsapHorizontalScroll`.
- Home "Selected Projects" uses a pinned horizontal scroll on desktop; stacks vertically on
  mobile and under reduced-motion.
- All scroll/3D motion honors `prefers-reduced-motion`.
