# Aditya Mer — Freelance portfolio (Next.js)

The freelance site for Aditya Mer, a web and AI developer in Mumbai. It is a light, simple page that leads with real client work, his own product (Flier), services, process, and a contact form. Visual inspiration comes from [insposite.com/portfolio](https://www.insposite.com/portfolio).

- Live: https://adityamer.dev
- Repo: https://github.com/Aditya190803/Aditya190803.github.io

## Sections
Hero → Client work → Flier (an interactive mail-merge demo) → Services → Process → About (research, open source, experience) → FAQ → Contact. There is also a printable `/resume` page.

## Editing content
All copy lives in `src/lib/data.ts`:
- `site` holds the main call to action, the availability line, and an optional `bookingUrl` (a Cal.com or Calendly link adds a "Book a call" button).
- `clientWork`, `flier`, `services`, `steps` and `faqs` hold the freelance content.
- `profile`, `experience`, `projects`, `research`, `education`, `skills` and `certifications` are used by the About section and the résumé.

Client screenshots go in `public/work/` (1600×1000 WebP).

## Design system
`src/app/globals.css` defines the tokens, the 12-column `.wrap` grid, the type scale, buttons, cards, the browser-window frame, and the background graphics (`.bg-grid`, `.bg-dots`, `.glow`, `.frame` with `+` corner marks). It uses one blue accent, cool greys, Schibsted Grotesk, and an Instrument Serif italic accent line. Motion is limited to hover, press and focus feedback, plus one load-in on the hero window, and it respects `prefers-reduced-motion`.

## Contact form
The form posts to Web3Forms. Add a `WEB3FORMS_KEY` repository secret; the deploy workflow exposes it as `NEXT_PUBLIC_WEB3FORMS_KEY`. Without a key, the form opens the visitor's email app with the message filled in.

## Tech stack
- Next.js 16 (App Router, static export) + React 19
- Tailwind CSS v4, lucide-react
- Bun

## Development
```bash
bun install
bun run dev
bun run build
bun run test
```
