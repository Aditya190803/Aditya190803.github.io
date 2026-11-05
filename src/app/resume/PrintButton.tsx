"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
      <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
      Print
    </button>
  );
}
