# d-ledger: "Ledger"

## Direction in 5 lines
- **Product:** a freelance portfolio that has to get organisations and small businesses to start a project with Aditya Mer.
- **Character:** exact, quiet and record-like. It reads as a well-kept ledger, not as a spreadsheet app.
- **World:** spreadsheets. Flier turns spreadsheet rows into personal emails, and his clients run their own content through CMSs he built. The whole page sits on one sheet: column letters A–L in a ruler under the header, row numbers down a left ruler (a CSS counter, so every content row is a numbered row), and hairline cells.
- **Moment:** the hero is a real `work.csv` (client, built, status, link). Click a row or arrow through the rows, and that project's live screenshot swaps in the window that rises out of the bottom of the hero. Theska is private, so its row shows a redacted table instead of a screenshot.
- **Signature:** the selected-cell outline, a 2px logo-orange box with a fill-handle square at its corner. There is only one on the page. It marks the one thing that matters in the section you are reading, and its column letters and row number light up in the rulers:
  - the selected hero row
  - "Custom CMS the team runs"
  - "in use at Tata Memorial Hospital"
  - "A CMS your team can edit"
  - Step 2, the fixed quote
  - FastWrite's 6,000+ downloads
  - "You do" (who owns the code)
  - the email cell

## Fonts
Instrument Sans (400/500) for all text. IBM Plex Mono (400/500) for the rulers, labels and data. Tabular figures throughout.

## Borrowed
- **firecrawl.dev:**
  - one framed column with thin outer gutters
  - hairlines that split the sections
  - a hero cell grid of square cells with centre dots
  - mono bracket labels with real content: `[ Mumbai, India ]`, `[ UTC+5:30 ]`, and a live `[ row 3 · youniqueindia.co.in ]` that tracks the selection
  - two pixel clusters: an orange pixel envelope (Flier) and a grey mini table
  - a window-framed product shot rising from the hero
  - neutral ground with one hot accent
- **unlimited.studio:**
  - dot-prefixed lowercase section names (`.work`, `.services`, `.process`, `.about`, `.faq`, `.contact`)
  - image-first case studies with a name, a one-line kind and an arrow link
  - services with concrete deliverables
  - a plain availability line
  - a closing "Let's work together"
- **Left out:** the dark theme, WebGL, the cookie wall, the chat widget, all-caps tracked mono, the pill above the H1, and accent words in headlines. Orange appears only in the outline and its handle, the ruler highlights, the pixel envelope and the selected-row wash. Primary buttons are ink.

## Content
Everything in PLAN.md's information architecture is on the page:
- the header and hero
- 4 case studies, plus a working Flier mail-merge demo that uses the real `flier.demo` data
- 4 services and 4 process steps
- About: bio, all 5 roles, 2 papers with authors and links, 10 side projects (FastWrite stat included), 3 education entries, 6 skill groups and 7 certifications
- 6 FAQs
- Contact: a form (name, email, project type, message) that posts by mailto, plus the email with a copy button, then the footer

## Animations (transform and opacity only, no scroll listeners)
1. **Rows fill in.** As each row enters, its cells fade in and rise 14px with a 70ms stagger, and its hairline draws in from the ruler (scaleX). This runs once, triggered by IntersectionObserver.
2. **The outline moves.** An IntersectionObserver watches a band across the middle of the viewport. When a new section enters it, the outline glides to that section's cell. The outline is made of 4 edges and a handle, each moved with `translate` plus `scaleX`/`scaleY`, so nothing is animated through layout. In the hero it follows the selected row.
3. **The hero window rises.** A CSS scroll-driven animation (`animation-timeline: scroll(root)`, inside `@supports`, desktop only) lifts the screenshot about 1.6 cells out of the hero ledge. Switching rows cross-fades the panes with a 16px rise.
- **Reduced motion:** every transition and animation is off, and every cell is visible and static. Measured: 0 of 151 cells hidden.

## Measured (Playwright, Chromium, file://)
- JS: 5.8 KB inline, hand-written, no libraries. The HTML file is 70 KB in total.
- CLS: 0.0000 at 1440x900 and 0.0092 at 390x844, measured across load plus a full wheel-scroll.
- Long tasks:
  - during the scripted scroll: none at either width
  - at load: one task of 67 ms at 1440, none at 390
- Horizontal overflow at 390: 0 px. scrollWidth equals clientWidth after the fix to the skills rows.
- Keyboard: ↑ ↓ Home End move the row selection with a roving tabindex, and the pane, URL, row label, live region and outline all follow. Enter opens the row's site; on Theska it jumps to the contact form. The Flier recipient table works the same way.

## Template check
Swap in another freelancer's name and the page no longer fits. The hero is his actual `work.csv` (IASCC, Younique India, Flier, Theska), and the grid comes from his own product. The outlined cells are his specific facts: the CMS clients run, Tata Memorial Hospital, FastWrite's downloads and the fixed quote.

## Hero v2 (revision 2 rules)
- **Composition:** H1 `I build what your team runs` set large (about 80px at 1440) across columns A–G, the sub-line `Freelance, from Mumbai.`, then `Start a project` plus a quiet `See the work ↓` text link. On the right, `work.csv` is cut to 2 columns (client, built) and 4 rows with no header row or toolbar hints; the selected-cell outline sits on the active row. Below both, the selected row's live screenshot rises from the bottom edge across 10 columns and is the main visual.
- **Explore:** hovering a row (fine pointers), clicking it or using ↑ ↓ Home End swaps the screenshot. The window still lifts about 1.6 cells on scroll. Theska's private pane now sits near the top of the window so it is visible on the first screen.
- **Quiet rulers:** the hero's row number is hidden, and the A–L letters fade to 16% ink while the hero is the active scope (`html.at-hero`).
- **Removed or moved:** the kicker line, the long paragraph, the availability sentence, the status and link columns, the `↑ ↓ to browse` hint, the `[ Mumbai, India ]`, `[ row 2 · … ]` and `[ UTC+5:30 ]` labels, and the URL text in the window bar (now an icon link with an aria-label). The services phrase moved into the `.work` intro, and UTC+5:30 moved into the contact availability line. The client facts were already in the case studies.
- **Measured:** 25 words and 13 text blocks on the first screen (it was 127 and 34). Overflow at 390: 0 px. CLS: 0.0000 at 1440 and at 390. With reduced motion, 0 of 152 cells are hidden and the window does not animate. Keyboard row navigation, the live region and the open link all still work.
