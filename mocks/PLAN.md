# Plan: Aditya Mer, freelance portfolio (round 2)

## Goal
A professional, WHITE-mode site Aditya can send to clients. It must not look AI-generated.
Background graphics in the spirit of firecrawl.dev, plus simple, smooth scroll animation.
Use unlimited.studio as a structural reference, but it is dark and laggy, so make it light and fast.
Include ALL of Aditya's data.

## What we take from the references

### firecrawl.dev (graphics and surface)
- **Framed page.** All content sits in one column bounded by 1px hairlines, running top to bottom.
  - Thin outer gutters on each side.
  - Horizontal hairlines split the sections, so the page reads as a drafted sheet, not floating cards.
  - Small marks (dots or "+") sit where the lines cross.
- **Hero cell grid.** Square cells (~96–100px) with a faint dot at each centre.
  - A few cells hold pixel or dot-matrix clusters.
  - Tiny mono labels in brackets sit in the corners, e.g. `[ iascc.in ]`, `[ 200 OK ]`.
  - Those labels must be real and about Aditya, never Firecrawl's.
- **Glyph and dot-matrix art.** Shapes drawn with characters or dots, in the accent colour, fading out at the edges.
- **Neutral and restrained.** Off-white ground (#f9f9f9 / #fff), near-black ink, one hot accent.
  - Bento areas are divided by hairlines inside the frame, not drop-shadow cards.
  - Mono is used for data and labels.
- Do NOT copy Firecrawl's slop: no pill badge above the H1, no accent-coloured word in the headline.

### unlimited.studio (structure and content strategy)
- Section titles as lowercase, dot-prefixed words: `.work`, `.services`, `.about`. Use this or an equally distinctive device, consistently.
- **Case studies lead the page.** Large image-first cards, each with the project name, a one-line description and an arrow link. The work does the selling.
- A plain availability line ("Open for new projects"), services with concrete tags, and a closing "let's work together".
- Drop from it:
  - the dark theme and the WebGL ribbon
  - the cookie wall and the chat widget
  - all-caps tracked mono everywhere and outlined text
  - anything heavy

## Brand tokens (shared starting point; each mock may tune within reason)
- **Accent:** Aditya's logo orange, around `#F07050`.
  - For text on white, darken it to about `#C2410C`-ish so it meets 4.5:1 contrast.
  - Use it rarely: the primary action, one graphic moment, and the signature marks.
- **Neutrals:** one cool or neutral grey ramp. Ground `#FAFAFA`, surfaces `#FFFFFF`, hairlines = ink at 8–10% opacity, ink around `#141414`.
- **Type:** one sans for everything plus one mono for labels and data. Weights 400/500 (600 max). No 700–900.
  - Banned: Inter, Roboto, Poppins, Montserrat, Space Grotesk, and Schibsted Grotesk (rejected earlier).
  - Free options: Geist + Geist Mono, Host Grotesk + JetBrains Mono, Instrument Sans + IBM Plex Mono, Hanken Grotesk + Martian Mono, Funnel Display/Sans + Geist Mono.

## Information architecture (all data; order may vary per mock)
1. **Header:** wordmark or logo, Work, Services, About, Contact, and one button ("Start a project").
2. **Hero:** what he does, for whom and where, in plain words.
   - One primary action and one secondary.
   - Availability as plain text.
   - The hero graphic follows the background-graphics system.
3. **Work (case studies):**
   - IASCC (website + CMS)
   - Younique India (online store)
   - Flier (his own product, open source, in use at Tata Memorial Hospital, CONFIRMED by owner)
   - Theska (private internal software)
4. **Services:** 4, with concrete deliverables.
5. **Process:** 4 steps.
6. **About:** short bio, education, experience timeline (all 5 roles), published research (2 papers with links), open source and side projects (FastWrite 6,000+ PyPI downloads in month one, ATS System, Verify News, AI Research Agent, Chat with PDF, Mini App Factory, …), skills/stack, and certifications (compact).
7. **FAQ:** 6 questions.
8. **Contact:** a form (name, email, project type, message) plus the email address with a copy button, then the footer.

Data sources: `mocks/CONTENT.md` (verified freelance facts) and `src/lib/data.ts` (profile, experience, projects, research, education, skills, certifications). Use real links.

## Scroll animation (simple, good-looking, FAST)
- Animate only `transform` and `opacity`.
  - No scroll-jacking or smooth-scroll libraries (no Lenis), no parallax on big images.
  - No WebGL, no video.
- Prefer CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) inside `@supports`, with an IntersectionObserver fallback adding a class. Never attach scroll event listeners that read layout.
- Allowed patterns, pick 2 or 3 per mock and use them consistently:
  - Reveal on enter: fade plus a 12–16px rise, once, with a small stagger inside a group.
  - Sticky stacked case studies: each card pins, and the previous one scales to about 0.96 and dims slightly.
  - Hairlines that draw in (scaleX from 0 to 1) as a section enters.
  - A hero graphic that resolves on scroll (dot-matrix → screenshot, or cells filling in).
  - A thin reading-progress line in the header.
- **Budget:**
  - JS under 60 KB, uncompressed, hand-written.
  - No layout shift (CLS < 0.05).
  - Hero visible on the first paint.
  - Smooth at 60fps on a mid-range laptop.
  - `prefers-reduced-motion` makes everything static and visible.

## Anti-slop guardrails (unslop, heydamir)
- No pill badge above the H1. No single accent-coloured, italic or gradient word in headlines. No gradient text.
- No glows, blobs or orbs, glassmorphism, emoji, sparkles, or "New ✨" badges.
- Headings and buttons have no trailing periods and no exclamation marks. No hype words (seamless, unlock, supercharge, elevate, robust, cutting-edge).
- Only real facts. No testimonials, logos or stats that aren't in the data. Plausible, real names only.
- Spacing on a 4px grid. Nested radii add up. One icon set (lucide-style line icons, inline SVG), at one size and stroke.
- Template check: if you swapped in another freelancer's name, would the page still fit? If yes, push the hero graphic and copy until it is specifically Aditya's.

## Deliverables per mock
- `mocks/<slug>/index.html`: one self-contained file (inline CSS/JS).
  - Google Fonts allowed. CDN scripts are allowed only if pinned and truly needed (prefer none).
  - Images from `../assets/`.
- `preview-desktop.jpg` (1440 full page) and `preview-mobile.jpg` (390 full page), plus `hero.jpg` (1440x900 first screen).
- `NOTES.md`: the direction in 5 lines (product, character, world, moment, signature), what was borrowed from each reference, the animations used, and measured numbers (JS KB, CLS, long tasks).
