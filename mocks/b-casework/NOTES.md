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

## Hero v2 (revision 2 rules)
- **Composition:** the work is the hero. A compact top-left block holds the H1 "I build what your team runs" on one line, then one row with the sub-line ("Websites, stores and internal tools. Freelance, from Mumbai.") beside `Start a project` and a quiet "See the work ↓" text link. The IASCC scene (desktop capture overlapped by the phone on its tinted panel) is the first card of the sticky stack and fills the rest of the screen, cropped by the bottom edge. Scrolling pins it and Younique slides over it, so the stack starts in the hero.
- **Removed:** the dot-matrix AM monogram (it duplicated mock A), the "who" line, the lede, the availability sentence and the four corner tags. The `.work` title block was dropped because the stack now sits straight under the hero (the section keeps `id="work"` and `aria-label`). Its rule ("Two client sites… · 04") moved under the stack, the coordinates moved to the `.about` rule, `pip install fastwrite` moved to the FastWrite card, and the IEEE paper and client sentences already live in `.about` and the cards.
- **Labels (2):** `[ ● Open for projects ]` in the hero corner, and `[ 01/04 ]` on the scene (every card now carries its own `0n/04`).
- **Sizing:** `--sceneH` (66vh, 300–620px) now sets every scene's height. The hero's min-height is `100svh - header - sceneH - 9px`, so the scene ends about 24px below the fold and the card's text stays off the first screen. The grid/dot texture sits only behind the scene area, masked away from the copy (on mobile it starts below the buttons). Card 1's images load eagerly with `fetchpriority="high"`. Hovering the first card lifts the browser 6px and the phone 14px.
- **Measured:** count.js reports 24 words on the first screen. The real total is 25, because the aria-hidden `01/04` label isn't counted. Visual share at 1440x900: the scene runs from y=323 to below the fold, about 69% of the area below the header. scrollWidth is 390 at 390. CLS is 0.0003 at 1440 and 0.0005 at 390. With reduced motion, 0 hidden `.rv` and 0 transformed cards.
