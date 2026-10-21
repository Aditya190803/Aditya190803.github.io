# Aditya Mer — adityamer.dev

Portfolio and client-enquiry site for Aditya Mer, independent web designer and developer in Mumbai.

- Live: https://adityamer.dev

## Stack
- Next.js 16 (App Router, static export to GitHub Pages) + React 19
- Tailwind CSS v4
- GSAP (ScrollTrigger, SplitText) + Lenis for motion and smooth scrolling
- Fonts: Newsreader (display) and Schibsted Grotesk (text)

## Editing content
All copy lives in `src/lib/data.ts`:
- `profile` — name, intro, availability line, contact details
- `featured` — the Flier / SendFlier case study
- `work` — client projects (IASCC, Younique India, Shah Kapadia & Associates)
- `services`, `steps`, `faqs` — the selling sections
- `projects`, `research`, `experience`, `education`, `skills` — Lab section and `/resume`

## Contact form
Set a repository secret named `WEB3FORMS_KEY` (from web3forms.com) and the form sends enquiries to your inbox.
Without it, the form opens the visitor's email app with their message pre-filled.

## Develop
```bash
bun install
bun dev        # http://localhost:3000
bun run lint && bun run test && bun run build
```

Motion respects `prefers-reduced-motion`, and all content is readable without JavaScript.
