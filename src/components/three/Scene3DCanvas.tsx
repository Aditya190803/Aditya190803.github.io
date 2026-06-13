'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { getPageProgress } from '@/lib/scrollProgress';
import { NeuralLattice } from './NeuralLattice';

/**
 * Fixed full-viewport R3F canvas rendered behind all page content.
 * Tracks document scroll progress (0→1) and feeds it to the lattice via a ref
 * (no React re-renders per frame).
 */
export default function Scene3DCanvas() {
  const pathname = usePathname();
  const progressRef = useRef(0);
  // Computed once on mount (component is client-only, dynamically imported).
  const [pointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      progressRef.current = getPageProgress();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="scene-canvas">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.6} />
        {/* Ambient particle lattice background (subtle, scroll-reactive). */}
        <NeuralLattice progressRef={progressRef} pointer={pointer} pathname={pathname} />
      </Canvas>
    </div>
  );
}
