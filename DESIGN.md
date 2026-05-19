# Aditya Mer Portfolio — Design Tokens

## Color
- Background: oklch(99% 0.005 85) /* #FAFAFA, very subtle warm tint */
- Text: oklch(12% 0.01 85) /* #111111, ink-dark */
- Card surface: oklch(100% 0 0) /* #FFFFFF */
- Border: oklch(12% 0.01 85) /* matches text */
- No accent colors. Contrast does the work.

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

## Elevation
- No box shadows. Use borders (1px solid #111111)
- No layered shadows or depth effects

## Border
- 1px solid #111111 throughout
- No border-radius (0px)

## Components
- Custom cursor: 10px filled circle #111111, lerp 0.12
- Navigation: fixed top, transparent until scroll, then backdrop-blur
- Section numbers: monospace, gutter position
- Buttons: border-only, no background fill
- Links: underline-draw on hover (1px, cubic ease-out)
