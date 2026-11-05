# fun-isometric mock: notes

**Design summary:** a white, light-mode page of warm grey tiles and pill buttons where outlined isometric slab "stickers" (flat fill, thick black outline, extruded side) carry all the colour. The real client screenshots ride on the tilted screens of sticker devices.

- **Real kit, not imitation.** The skill's own runtime (`kit/fun.ts`, `motions.ts`, worked `icons.ts`) is bundled as is and inlined, MIT credited. Every sticker is drawn on its canvas by `play()` on one shared page clock.
- **Motion comes only from presets.** toss with tossLag/tossLag2 (store bag spilling a ring and a box), jolt (cursor click, website card), clasp + shackle (private Theska padlock), drift (Flier paper plane), wobble + look (AI chat bot), sway/float/bob phased 20 frames apart for the background confetti, and twinkle/sparkle/glint on the beat. There are no hand-written sine loops or CSS wobble keyframes.
- **Faces lean, never just rotate.** The monitor, phone and browser are each one upright silhouette on the house view `VIEWS.right` (tilt [-18, 36], extrude [-4, 18]). The screenshot `<img>` gets the same lean matrix, so it foreshortens exactly with its screen, and it stays real, accessible HTML with alt text.
- **Everything is a slab built from parts.** Bezel, screen, neck and foot. Body, handle, label and contents. Each part has its own depth, with a 5-unit ink outline, no gradients, no shadows and no glow on stickers.
- **Palette slots, not hex.** All stickers use slots under the named `sunset` set (orange main, plum deep, teal ok, gold, tint). The page UI takes its one "gel" accent (the orange pill with its inner light) from the same set, so nothing looks like the rejected blue.
- **The kit site's UI language.** White page, `#f6f3ef` tiles at 24–40px radii, grey pills plus a single gel CTA, Geist / Geist Mono with tight tracking, and the copy button's spring "Copied" roll-in.
- **Background graphics are stickers too.** Sparse confetti slabs (ring, star, pill, coin, sparkle) idle on ambient presets at the page edges, sit `aria-hidden`, and never cover text.
- **Reduced motion.** The kit shows each icon's `still` frame and skips entrances. CSS transitions and animations are switched off, and smooth scroll is off.
- **Honest content.** Only facts from CONTENT.md are used. Theska has no image. The Tata Memorial line is wrapped in `<!-- REMOVABLE -->` comments. There are no testimonials, logos or invented stats.
- **Responsive from 390 to 1440px.** At 960px the hero, Flier, about, FAQ and contact grids stack. The service and process tiles go 4 → 2 → 1 with the sticker beside the text on phones, and there is no horizontal overflow at either width.
