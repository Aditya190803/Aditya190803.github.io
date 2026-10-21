"use client";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-ghost !min-h-11 !px-5 text-[0.95rem]">
      Print
    </button>
  );
}
