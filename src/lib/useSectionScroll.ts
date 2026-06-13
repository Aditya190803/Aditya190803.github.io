'use client';

import { type RefObject } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/** Home-page-style section parallax — scrubbed as the section travels through the viewport. */
export function useSectionScroll(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const heroY = useTransform(scrollYProgress, [0, 1], [24, -12]);

  return { scrollYProgress, contentY, heroY };
}