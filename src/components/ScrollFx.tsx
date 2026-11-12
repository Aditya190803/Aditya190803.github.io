/**
 * Decorative scroll-linked layers, driven entirely by CSS scroll timelines
 * (see "scroll backdrop" in globals.css). Browsers without them get a still grid.
 *
 * - `.field`: a faint drafting grid fixed behind the page; a soft patch of it is
 *   lit, and the patch drifts across the grid as the page scrolls.
 * - `.rail`: a short marker that travels down the left frame line with scroll.
 */
export function ScrollFx() {
  return (
    <>
      <div className="field" aria-hidden="true" />
      <div className="rail" aria-hidden="true">
        <i />
      </div>
    </>
  );
}
