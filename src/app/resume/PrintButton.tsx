"use client";

export function PrintButton() {
  return (
    <button className="btn btn-ink btn-sm" type="button" onClick={() => window.print()}>
      Print or save as PDF
    </button>
  );
}
