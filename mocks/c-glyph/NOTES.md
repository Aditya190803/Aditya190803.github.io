# c-glyph: "Glyph"

## Direction in 5 lines
- **Product:** a freelance site for Aditya Mer that wins organisations and small businesses. The main action is "Start a project".
- **Character:** a calm, exact developer. Drafted-sheet hairlines, mono labels in brackets, near-black ink and very little orange.
- **World:** source code and the client sites it becomes. Every graphic is made from his own material: the IASCC page, his AM logo, and the glyphs `. : / = < > { } #`.
- **Moment:** the first scroll. The hero picture of iascc.in, drawn in code glyphs, resolves cell by cell into the real screenshot, and a readout counts `source → site 0…100%`.
- **Signature:** a canvas glyph render of a real client page that turns into the shipped site. It says "I turn code into real sites" without a slogan.

## Type and colour
- Host Grotesk (400/500) for everything, plus JetBrains Mono (400/500) for labels, data and the glyph atlas.
- Ground `#f7f7f6`, sheet `#fff`, ink `#141414`, hairlines at 9% ink.
- Logo orange `#f07050` is used in the glyph art, the section dots and the 1px reading-progress line. The darker `#c8481f` (4.8:1 on white) is used for the primary button.

## What was borrowed
- **firecrawl.dev:**
  - one framed column with hairline sides, plus full-bleed horizontal rules with `+` marks where they cross the frame;
  - a 96px cell grid with centre dots behind the hero;
  - real bracketed mono labels (`[ 19.07° N, 72.87° E ]`, `[ iascc.in ]`, `[ 01 ]`);
  - ASCII art in ink and orange;
  - bento areas split by hairlines, with no shadow cards.
- **unlimited.studio:**
  - lowercase dot-prefixed section titles (`.work`, `.services`, `.process`, `.about`, `.faq`);
  - case studies first, image-led, each with its name, one line and an arrow link;
  - a plain availability line, services with concrete deliverables, and a "Let's work together" close.
- **Dropped from both:** the pill badge, accent words in headlines, the dark theme, WebGL, the cookie wall, the chat widget, and tracked uppercase mono.

## Sections (all the data)
- Header and hero.
- Work:
  - IASCC, Younique India and Flier (with the "in use at Tata Memorial Hospital" line);
  - Flier's 3 points;
  - Theska, marked as private.
- 4 services and 4 process steps.
- About:
  - bio and education (3);
  - experience (all 5 roles with their highlights);
  - 2 papers with authors and links;
  - 10 open-source projects with Demo, GitHub and PyPI links (FastWrite: 6,000+ PyPI downloads in its first month);
  - 6 skill groups and 7 certifications.
- 6 FAQs.
- Contact form (name, email, project type, message), the email address with a copy button, then the footer.

## Animations (transform and opacity only)
1. **Hero resolve.**
   - The glyph layer (12px cells, 9px on mobile) is baked once into an offscreen canvas. A finer layer (6px cells, 5px on mobile) is baked in idle time.
   - On scroll, 48px blocks go from coarse glyphs to fine glyphs to clear, revealing the real `<img>` underneath. The order runs top to bottom with seeded noise.
   - On desktop, hovering lights up a lens of real-site blocks.
   - About 8 fps twinkle: 18 cells change glyph per tick. It runs only while the hero is visible and the picture isn't fully resolved.
   - The canvas is devicePixelRatio-aware (capped at 2). Layer painting is split into slices of about 8ms.
   - The scroll handler reads only `scrollY`. Offsets are cached on resize.
2. **Reveal once.** A 14px fade-and-rise with a 70ms stagger, via IntersectionObserver.
3. **Hairlines draw in.** The section rules use `scaleX`, with `animation-timeline: view()` in `@supports` and an IntersectionObserver fallback.
4. **Reading-progress line** in the header (`animation-timeline: scroll()`).

The second glyph place is the contact close: the AM logo rendered once in glyphs, faint and static.

**Reduced motion:** everything is visible, with no transitions and no progress line. The hero is drawn once at a fixed 45% (top half site, bottom half code), with no twinkle and no scroll listener.

## Measured
Measured with headless Chromium in this VM, served over local http. This uses software rendering, so real hardware is faster.

| Measure | Result |
|---|---|
| Inline JS | 12.1 KB, hand-written, no libraries (CSS 19.4 KB, whole file 62.6 KB) |
| CLS | 0.022 desktop, 0.001 mobile |
| Horizontal overflow at 390 | 0 px |
| Long tasks during a scripted wheel scroll through the whole page | 0, on desktop and mobile |
| Canvas compose per frame | median 0.1 ms, p95 0.2–0.3 ms, max about 2 ms (about 25 composes per pass) |
| Glyph bake at DPR 2, desktop | about 35–45 ms coarse layer and about 40 ms fine layer, both sliced, so neither is one long task |

- **Load long tasks:**
  - There is one task of 50–65 ms, which is the browser's first style and layout of the whole document. Traced as `UpdateLayoutTree` plus `Layout`, so it isn't page JS. It comes from the long About section on software rendering.
  - Trying `content-visibility:auto` removed it, but broke anchor jumps, so it was reverted.
- **Reduced motion:** 0 hidden reveal elements, and the canvas was composed 2 times in total (no animation).

## Template check
Swap in another freelancer's name and the page breaks:
- the hero art is the real iascc.in page;
- the lede names IASCC, Younique India and Flier;
- the coordinates are Mumbai's;
- the contact glyph field is his AM logo;
- every number comes from data.ts.

No testimonials, logos or stats were invented.

## Files
- `index.html`
- `hero.jpg` (1440x900, first screen)
- `hero-resolved.jpg` (after the scroll resolve)
- `preview-desktop.jpg` (1440, full page)
- `preview-mobile.jpg` (390, full page)

Notes:
- Add `?perf` to the URL to record the per-frame compose cost in `window.__glyph`.
- When opened over `file://`, the canvas is tainted, so the hero falls back to the plain screenshot. Serve the folder over http to see the glyphs.
