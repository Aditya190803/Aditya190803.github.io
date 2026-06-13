'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Monochrome point-cloud "neural lattice".
 *
 * A field of points distributed on a sphere. Scroll progress (0→1) drives:
 *  - rotation of the whole cloud
 *  - dispersion (points scatter outward then reform)
 *  - a subtle color mix from ink → rust accent
 *
 * Only transforms/attributes are animated — cheap and GPU friendly.
 */

const COUNT = 2600;
const INK = new THREE.Color('#1A1A1A');
const RUST = new THREE.Color('#C2410C');

/** Per-route tint + motion so the backdrop subtly matches each page. */
const ROUTE_PROFILES: Record<string, { rust: number; spin: number; scatter: number }> = {
  '/': { rust: 0.7, spin: 0.06, scatter: 1.4 },
  '/projects': { rust: 0.85, spin: 0.08, scatter: 1.6 },
  '/experience': { rust: 0.55, spin: 0.05, scatter: 1.2 },
  '/research': { rust: 0.65, spin: 0.07, scatter: 1.5 },
  '/skills': { rust: 0.5, spin: 0.09, scatter: 1.3 },
  '/contact': { rust: 0.9, spin: 0.04, scatter: 1.1 },
  '/resume': { rust: 0.4, spin: 0.03, scatter: 0.9 },
};

const DEFAULT_PROFILE = { rust: 0.6, spin: 0.06, scatter: 1.3 };

interface NeuralLatticeProps {
  progressRef: React.MutableRefObject<number>;
  pointer: boolean;
  pathname?: string;
}

export function NeuralLattice({ progressRef, pointer, pathname = '/' }: NeuralLatticeProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Base positions on a fibonacci sphere + seeded radial offset for scatter.
  // A deterministic PRNG keeps this pure across renders (no Math.random).
  const { positions, directions, basePositions } = useMemo(() => {
    let seed = 1337;
    const rand = () => {
      // Mulberry32 — fast deterministic PRNG.
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const directions = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const r = 3.4;
      const px = x * r;
      const py = y * r;
      const pz = z * r;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
      basePositions[i * 3] = px;
      basePositions[i * 3 + 1] = py;
      basePositions[i * 3 + 2] = pz;

      // Outward scatter direction (normalized point + jitter)
      const len = Math.sqrt(px * px + py * py + pz * pz) || 1;
      directions[i * 3] = px / len + (rand() - 0.5) * 0.6;
      directions[i * 3 + 1] = py / len + (rand() - 0.5) * 0.6;
      directions[i * 3 + 2] = pz / len + (rand() - 0.5) * 0.6;
    }
    return { positions, directions, basePositions };
  }, []);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    const mat = materialRef.current;
    if (!pts || !mat) return;

    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const base = pathname.startsWith('/projects/')
      ? ROUTE_PROFILES['/projects']
      : pathname.startsWith('/research/')
        ? ROUTE_PROFILES['/research']
        : ROUTE_PROFILES[pathname] ?? DEFAULT_PROFILE;

    // Pointer parallax (lerped)
    if (pointer) {
      mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
      mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    }

    // Rotation: continuous slow spin + scroll-driven tilt
    pts.rotation.y += delta * base.spin;
    pts.rotation.x = THREE.MathUtils.lerp(pts.rotation.x, p * Math.PI * 0.6 + mouse.current.y * 0.3, 0.05);
    pts.rotation.z = THREE.MathUtils.lerp(pts.rotation.z, mouse.current.x * 0.2, 0.05);

    // Scatter → reform: peaks at mid-scroll (sine), so it "breathes" through the page.
    const scatter = Math.sin(p * Math.PI) * base.scatter;
    const geo = pts.geometry as THREE.BufferGeometry;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      arr[ix] = basePositions[ix] + directions[ix] * scatter;
      arr[ix + 1] = basePositions[ix + 1] + directions[ix + 1] * scatter;
      arr[ix + 2] = basePositions[ix + 2] + directions[ix + 2] * scatter;
    }
    geo.attributes.position.needsUpdate = true;

    // Fade the lattice in after the top/hero area for a cleaner initial view.
    const heroFade = THREE.MathUtils.smoothstep(0.08, 0.28, p);
    mat.color.copy(INK).lerp(RUST, p * base.rust);
    mat.opacity = THREE.MathUtils.lerp(0.08, 0.65, heroFade);
    mat.size = THREE.MathUtils.lerp(0.028, 0.048, heroFade);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.7}
        color={INK}
        depthWrite={false}
      />
    </points>
  );
}
