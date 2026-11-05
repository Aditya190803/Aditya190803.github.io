# e-editorial: Quiet editorial

## Direction in 5 lines
- **Product:** Aditya Mer, an independent developer in Mumbai who builds websites, online stores and internal tools for organisations and small businesses.
- **Character:** a senior independent studio. It is restrained and confident, with large type at weight 400 and plenty of white space.
- **World:** an architect's drawing sheet: an off-white ground, near-black ink, long hairline rules, and the logo orange used only for measurements.
- **Moment:** the hero's construction drawing draws itself in once on load. Then the case studies pin, and the work moves sideways as you scroll.
- **Signature:** the faint SVG drawing behind the hero. Its dimension lines carry real facts: `2021 → 2026`, `6,000+` (FastWrite, PyPI, month one), Mumbai's coordinates, and the `[ iascc.in ]` and `[ sendflier.tech ]` points on the circle.

## Type
Instrument Sans (400/500) and IBM Plex Mono (400). The H1 is set at up to 100px, weight 400, tracking -0.045em.

## Borrowed
- **firecrawl.dev:**
  - a framed column with two full-height hairline verticals;
  - full-width horizontal rules with `+` marks where they cross the frame;
  - mono bracket labels such as `[ iascc.in ]`;
  - one hot accent on a neutral ground.
- I deliberately opened up the firecrawl frame: there is no hero cell grid, and few lines inside sections.
- **unlimited.studio:**
  - dot-prefixed lowercase section titles (`.work`, `.services`, `.process`, `.about`, `.faq`), with the dot in the logo orange;
  - case studies near the top as image-first cards, each with a name, a one-line kind and an arrow link;
  - the plain availability line;
  - the closing "Let's work together".
- From unlimited.studio I left out the dark theme, WebGL, the cookie wall, the chat widget and the all-caps tracked mono.

## Animations (transform/opacity/stroke-dashoffset only)
1. **Hero drawing:** `stroke-dashoffset` 1 → 0 with `pathLength=1`, staggered 90ms, about 1.6s. The labels then fade in. It plays once on load.
2. **Pinned horizontal case studies (desktop ≥ 900px):**
   - The section height is `100vh + dist`, with `position: sticky` on the inner part.
   - The track animates `translate3d` on a named `view-timeline`, over the range `contain 0%` to `contain 100%`.
   - `dist` is computed in pure CSS from the card width variables, so there is no JS and no layout read.
   - A 1px progress line under the strip runs on the same timeline.
   - Without scroll-driven animation support, the strip falls back to a native horizontal scroller with scroll-snap. On mobile it is a vertical stack.
3. **Reveals and hairlines:**
   - Elements reveal once with a fade and a 14px rise, staggered 70ms inside a group.
   - Section rules draw in with `scaleX` 0 → 1. The process line uses `scaleX` on desktop and `scaleY` on mobile.
   - Both are triggered by an IntersectionObserver that adds a class. There are no scroll listeners.

## Measured (Playwright, Chromium, file://)
| Check | Result |
|---|---|
| Inline JS | **1.5 KB** (1,539 bytes) |
| Total HTML | 49 KB |
| CLS | 1440: **0.0087**; 390: **0.0000** |
| Long tasks on load | One task each: 55 ms (1440), 58 ms (390) |
| Long tasks during scripted scroll | **0** (whole page in 120px steps, one per frame) |
| Horizontal overflow at 390 | none (scrollWidth 390 = clientWidth 390; no offending elements) |

On load, the hero text is static, so it is visible on the first paint.

With `prefers-reduced-motion` set, everything is static:
- All 26 reveal elements are at opacity 1.
- The drawing is shown complete: no animation and dashoffset 0.
- The strip is not pinned: the track has no animation and the sticky part is static, so it becomes the native scroller.
- The rules are drawn.

## Screenshots
| File | What it shows |
|---|---|
| `hero.jpg` | 1440×900 first screen |
| `strip.jpg` | Mid-scroll frame of the pinned strip |
| `preview-desktop.jpg` | 1440 full page |
| `preview-mobile.jpg` | 390 full page |

The full-page desktop capture collapses the pin, so the screenshot doesn't show a blank pinned run-way. In it, the strip appears at its starting position.

## Template check
- **Swapping in another freelancer's name:** the H1 alone ("Websites, online stores and internal tools for organisations and small businesses") would still fit. This is deliberate: the direction calls for a plain headline with no accent word.
- **Everything around the H1 is Aditya's alone:**
  - The drawing's labels: 2021 → 2026, 6,000+ FastWrite downloads, 19.07° N 72.88° E, iascc.in, sendflier.tech.
  - The lede names IASCC and the jewellery store.
  - The first card is IASCC. The Flier card says "In use at Tata Memorial Hospital". Theska is shown as a drafted placeholder marked "Private · details on a call".
- **Verdict:** the page doesn't survive a name swap.

## Anti-slop pass
- There is no pill badge, no accent word or gradient in the headline, and no glow, blob or emoji.
- Headings and buttons have no trailing periods.
- Weights are 400/500 only.
- There is one inline line-icon set at 16px with a 1.5 stroke.
- Every fact comes from CONTENT.md or data.ts.

## Hero v2 (revision 2 rules)
This supersedes the hero description above.
- **Composition:** the H1 `I build what your team runs` is set across two lines at up to 168px (`min(11.4vw, 18.5vh)`). Under it, one row holds the sub-line (`Websites, online stores and internal tools. Freelance, from Mumbai.`), `Start a project` and a quiet `See the work ↓` text link. The long paragraph, the meta line and the availability line are gone.
- **Drawing:** it still draws itself in once. Only 3 labels remain: `2021 → 2026`, `6,000+` and `[ iascc.in ]`. The year ruler, the coordinates, `sendflier.tech` and the caption lines are removed.
- **Invites exploring:** the hero's height is `100svh − header − --stick-pt − --peek` (min 480px). This lets the IASCC screenshot from the work strip peek up from the bottom edge (about 215px at 1440×900). The pinned stage is now top-aligned at the same `--stick-pt`, so the card scrolls straight into the pin without a jump. Screenshots zoom by 1.5% on hover. The `.work` intro text is bottom-aligned, so no extra words sit beside the peek.
- **Moved content:**
  - "Handed it over for the team to run" is now in the `.work` intro.
  - "Independent, Mumbai, clients anywhere" is now in the about bio.
  - The coordinates are now in the footer.
  - IASCC, the jewellery store and FastWrite were already covered in the cards and the about section.
- **Measured:**
  - count.js reports 21 words on the first screen, or 25 including the 3 drawing labels.
  - CLS is 0.0003 (1440), 0.0004 (390) and 0.0005 (1280×720).
  - There is no overflow at 390 or 360.
  - The H1 sets in 2 lines at 1024 to 1920 and in 3 lines at 390.
  - With reduced motion, nothing is hidden, the dash offset is 0 and the strip is unpinned.
