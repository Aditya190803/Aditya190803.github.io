# b-casework

## Direction in 5 lines
- **Product:** a freelance studio site for one developer. The case studies lead the page and do the selling.
- **Character:** a calm, drafted case file. The page has near-black ink on white, dashed hairlines, mono labels, and the logo orange only on the dot-prefixes, the primary button and the hero monogram.
- **World:** unlimited.studio's IA, turned white. There's a dashed frame grid with `+` marks at the crossings, lowercase dot titles (`.work`, `.services`, `.process`, `.about`, `.faq`, `.contact`), and image-first cards with a round arrow link.
- **Moment:** while you scroll `.work`, each project pins under the header. The next one slides over it, and the one underneath shrinks to 0.96 and dims, leaving a 12px tab of each earlier card showing.
- **Signature:** the sticky stacked case studies. Each scene is composed on its own tinted panel: a desktop capture in a browser frame, overlapped by a phone (IASCC, Flier) or a zoomed detail callout (Younique). Theska is shown as a hairline wireframe with a lock note, because it's private.

## Borrowed
- **From unlimited.studio:**
  - dot-prefixed lowercase section titles with a mono subline and a rule
  - the dashed frame and dashed nav segments in the header
  - large image cards with the name, a one-line description and a round arrow link
  - the plain availability line, and the closing "Let's work together"
- **From firecrawl.dev:**
  - the hero's 96px cell grid with a dot in each cell, faded under the copy and toward the bottom
  - bracketed mono corner labels, all real: `[ 19.08°N 72.88°E ]` (Mumbai), `[ iascc.in · 200 ]`, `[ IEEE TENSYMP '24 ]`, `[ pip install fastwrite ]`
  - dot-matrix art, here Aditya's logo redrawn in dots: the A is filled in orange and the M is outlined in ink, as on his logo
  - a glyph terrain (`.:-=+*%#`) in faint orange behind the contact close
- **Dropped:** the dark theme, WebGL, the cookie wall, the chat widget, tracked all-caps mono, outlined text, the pill above the H1, and any coloured word in a headline.

## Type
- **Hanken Grotesk** (400/500) for everything, and **Martian Mono** (wdth 87.5, 400) for labels and data.
- Both have metric-matched local fallbacks (`size-adjust`), so swapping in the web fonts doesn't shift the layout.

## Animations (transform/opacity only, no scroll listeners)
1. **Sticky stacked case studies.**
   - CSS scroll-driven: inside `@supports (animation-timeline: view()) and (timeline-scope: --a)`, a 1px marker before each next card carries a `view-timeline`.
   - The card underneath runs `scale(1 → .96)` against that timeline, plus a dim overlay's opacity.
   - Fallback: an IntersectionObserver on the same markers toggles `.covered`, with a CSS transition. Its root reaches far below the viewport, so anchor jumps still flip the state. Verified by forcing the fallback.
2. **Reveal on enter.** A fade and a 14px rise, once, with a 70ms stagger. IntersectionObserver adds `.in`. Gated by a `.js` class, so content shows without JS.
3. **Hairlines that draw in.** The section-head rules and the process step bars go `scaleX(0 → 1)` once on entry, and the step bars are staggered.
- `prefers-reduced-motion`: everything is static and visible, and the cards don't scale.

## Measured (Playwright Chromium, file://)
- **JS:** 2.5 KB inline, hand-written, with no libraries.
- **CLS:** 0.0007 at 1440 and at 390. Before the fallback fonts it was 0.30 on mobile, caused by the font swap.
- **Long tasks:** none during a scripted 40px-per-frame scroll of the whole page, at both widths. Frame time was p50 16.7ms and p95 16.8ms. There was one long task of about 60ms at initial parse.
- **Overflow at 390:** scrollWidth is 390. A mono subline used to overflow; that was fixed.
- **Reduced motion:** 0 hidden `.rv` elements and 0 transformed cards. The only elements below opacity 1 are the six decorative rules, which use opacity .2 by design.

## Template check
- Swapping in another freelancer's name doesn't work.
- The hero names his own projects (IASCC, Younique India, Flier). The graphic is his AM logo redrawn in dots, and the corner labels are his coordinates, his client's domain, his paper and his PyPI package.
