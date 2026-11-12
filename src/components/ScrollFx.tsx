/**
 * Decorative scroll-linked layers, driven entirely by CSS scroll timelines
 * (see "drafting grid" in globals.css). Browsers without them get a still grid.
 */

/** Drafting grid for an empty area; its lit cells hop as the page scrolls. Place it inside a positioned block. */
export function Field() {
  return <div className="field" aria-hidden="true" />;
}

/** Short marker that travels down the left frame line with the scroll. */
export function ScrollFx() {
  return (
    <div className="rail" aria-hidden="true">
      <i />
    </div>
  );
}
