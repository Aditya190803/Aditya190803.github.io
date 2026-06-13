/** Shared motion tokens — keep scroll animations consistent site-wide. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const REVEAL_VIEWPORT = {
  once: true,
  margin: '-80px' as const,
};

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration: 0.6, ease: EASE_OUT },
};

export const fadeUpSlow = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.8, ease: EASE_OUT },
};

export const staggerContainer = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: REVEAL_VIEWPORT,
};

export const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  },
};

export const pageEnter = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};