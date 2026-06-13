'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Scene3DCanvas = dynamic(() => import('./Scene3DCanvas'), {
  ssr: false,
  loading: () => null,
});

type Mode = 'pending' | 'canvas' | 'fallback';

/** Decide once (client-side) whether the device can/should run the 3D canvas. */
function detectMode(): Mode {
  if (typeof window === 'undefined') return 'pending';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallTouch =
    window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 768;

  let webgl = false;
  try {
    const c = document.createElement('canvas');
    webgl = !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    webgl = false;
  }

  return reduce || smallTouch || !webgl ? 'fallback' : 'canvas';
}

/**
 * Mounts the scroll-reactive 3D canvas, or a cheap static dot-grid + aurora
 * fallback when the device prefers reduced motion, is a small touch device,
 * or lacks WebGL. Detection runs once via a lazy state initializer so there is
 * no post-mount setState cascade.
 */
export function Scene3D() {
  const [mode] = useState<Mode>(detectMode);

  if (mode === 'canvas') return <Scene3DCanvas />;

  // Static, GPU-cheap backdrop (no per-frame work).
  return (
    <div className="scene-canvas overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-[-15%]"
        style={{
          backgroundImage:
            'radial-gradient(40% 40% at 20% 22%, color-mix(in oklch, var(--accent) 8%, transparent) 0%, transparent 70%), radial-gradient(45% 45% at 82% 78%, color-mix(in oklch, var(--accent-light) 8%, transparent) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.4]" />
      {/* Static line-art echo of the 3D "neural core" so the reduced-motion /
          no-WebGL fallback still has a quiet focal motif. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,520px)] aspect-square opacity-[0.06]">
        <div className="absolute inset-0 rounded-full border border-[var(--fg)]" />
        <div className="absolute inset-[12%] rounded-full border border-[var(--fg)] rotate-[18deg]" />
        <div className="absolute inset-[26%] rounded-full border border-[var(--fg)] -rotate-[14deg]" />
      </div>
      <div className="absolute inset-0 bg-grain opacity-[0.03] mix-blend-multiply" />
    </div>
  );
}
