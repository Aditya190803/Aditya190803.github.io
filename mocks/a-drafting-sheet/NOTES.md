# a-drafting-sheet

## Direction (5 lines)
- **Product:** a freelance site for Aditya Mer, a web and AI developer in Mumbai. It sells websites, online stores, web apps and AI work to organisations.
- **Character:** exact, quiet and engineered. The page reads like a technical drawing, not a pitch.
- **World:** a drafting sheet. A framed 12-cell column has thin outer gutters, 1px hairlines and "+" marks where the lines cross. Labels are in mono brackets, and figures are numbered.
- **Moment:** the first screen. Aditya's "AM" logo resolves out of the cell grid dot by dot, surrounded by bracket labels for his real work.
- **Signature:** the dot-matrix AM monogram follows the logo: a solid orange A and an outlined black M. About 70% of its pixels fill in on load, and the rest fill as you scroll. Four small glyph clusters (browser, envelope, paper, cart) mark iascc.in, sendflier.tech, IEEE TENSYMP '24 and youniqueindia.co.in.

## Borrowed
- **firecrawl.dev:**
  - the framed centre column with gutter columns
  - the hero cell grid of 96px squares with centre dots, and the grid continuing into the gutters
  - the corner bracket labels, which here are real: `[ Mumbai, IN ]`, `[ 19.08° N, 72.88° E ]`, `[ taking on new projects ]` and `[ FastWrite, 6,000+ PyPI downloads ]`
  - pixel clusters in cells
  - bento areas split by hairlines
  - mono for data, and the off-white ground
  - Not taken: the pill badge, the accent word in the H1, the orange sparkle marks and the glow under the input.
- **unlimited.studio:**
  - dot-prefixed lowercase section titles (`.work`, `.services` …), where the dot is an orange square pixel that matches the dot matrix
  - image-first case studies at the top of the page
  - the plain availability line
  - services with concrete deliverables
  - the closing "let's work together"
  - Dropped: the dark theme, WebGL, the cookie wall, the chat widget and tracked caps.
- **Own additions:**
  - the footer as a drawing title block ("Drawn by / Location / Sheet 1 of 1")
  - the Flier merge table, which shows one subject line resolved for 4 rows from `data.ts`
  - Theska's hatched "private" panel instead of a fake screenshot

## Type and colour
Geist and Geist Mono at weights 400 and 500. The ink is #141414, the ground #f7f7f6 and the sheet #fff. Hairlines are ink at 9% and 16%. The accent is #F07050, used only for the A pixels, the primary button (ink text gives 6.3:1), the section pixel and the availability square. #C2410C is used for the merge-table variables and the FastWrite stat.

## Animations (3, transform and opacity only)
1. **Cells filling (signature).** SVG pixels go from opacity 0 and scale(.2) to full. The load group is staggered over about 1.6s. The scroll group uses `animation-timeline: scroll(root)` over the first ~330px inside `@supports`; otherwise it runs on a time delay.
2. **Hairlines drawing in.** Each section rule is scaleX 0→1 on a named `view()` timeline (`entry 0%–35%`), with an IntersectionObserver class as the fallback. A faint static line sits underneath, so the frame never looks broken.
3. **Reveal on enter.** A fade plus a 14px rise, once, with a 70ms stagger, via IntersectionObserver.

With `prefers-reduced-motion`, everything is static and visible: 0 of 508 animated elements are hidden or offset. Without JS, everything is visible too, because the hidden states are gated on `html.js`.

## Measured (headless Chromium, file://)
- **JS:** 3.8 KB inline and hand-written, with no libraries. The whole HTML file is 56 KB.
- **CLS:** 0.0023 at 1440, 0.0093 at 1024 and 0.027 at 390. The mobile figure comes from the web-font swap.
- **Long tasks:** 1 during load and 0 during a scripted scroll from top to bottom at all three widths. The frame time median is 16.7ms and the p95 is 17.6–18.8ms.
- **Horizontal overflow at 390:** 0px. The only element past the edge is an ellipsised table cell inside a clipped box.
- **Screenshots:** `hero.jpg` was taken 2.6s after load, so the ~30% of pixels in the scroll group are still pale, as intended. The full-page previews were taken after scrolling to the end, with the sticky header made static only for the capture.

## Template check
Swap the name and the page no longer fits:
- the hero graphic is Aditya's own AM logo, and the labels are his domains, his paper and his coordinates
- the case studies, the Flier merge table and Tata Memorial Hospital are specific to him

The weakest part is the H1, which is plain on purpose ("Websites, online stores and web apps for organisations and small businesses"). The specifics sit in the lead line, which names IASCC, Younique India and Flier.

## Hero v2 (owner: "too much text, not appealing to explore")
- **Composition:** the 96px cell grid and frame stay. Left, a paper block spanning 5 cells holds the H1 "I build what your team runs", one sub-line and two actions (`Start a project`, then `See the work` as a quiet text link). Right, the real IASCC site in a hairline browser window (iascc.webp) with the IASCC phone capture rising from, and clipped by, the hero's bottom edge.
- **Dot matrix → work:** the screenshots start covered by grid cells (paper squares, a few orange or grey). Bottom rows clear first on load. About 13% stay until you scroll (`animation-timeline: scroll(root)`). The windows also rise on scroll: the desktop by half a cell, the phone by 2.2 cells. Two orange pixel clusters sit at the window's corners.
- **Callouts:** two grid cells act as callouts. `[ custom CMS ]` has a leader to an orange box around the Events and Publications menus, which the team edits through the CMS. `[ mobile view ]` points at the phone. The window bar reads `iascc.in`. Counting the bar, that makes 3 labels.
- **Word count:** 25 visible words (count.js reports 24 because the URL bar is aria-hidden). The 1-cell AM monogram is gone, and the header logo carries it.
- **Moved:** the lead paragraph (Aditya Mer, IASCC, Younique India, Flier, "AI comes in where it saves time") and the availability and email line now open the `.work` section. The gutter coordinates moved to the footer's Location cell. iascc.in, sendflier.tech, IEEE TENSYMP '24, youniqueindia.co.in and FastWrite 6,000+ were already in the work and about sections.
- **Checked:** horizontal overflow is 0px at 390, 1024 and 1440. CLS is 0.002 at 1440, 0.012 at 1024 and 0 at 390. With reduced motion, the covers are not rendered, the windows sit at rest and 0 of 256 animated elements are hidden. Without JS, no covers are generated.
