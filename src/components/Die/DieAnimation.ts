import type { Variants } from 'framer-motion'

// Use a cubic-bezier array (equivalent to easeInOut) so we avoid string-widening issues.
const easeInOutBezier = [0.42, 0.0, 0.58, 1] as const

export const dieAnimationVariants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  rolling: {
    // keyframes
    scale: [1, 1.08, 1],
    rotateX: [0, 180, 360],
    rotateY: [0, 270, 540],
    transition: {
      duration: 1.2,
      times: [0, 0.5, 1],        // must match keyframe count
      ease: easeInOutBezier,     // OK: Easing can be a 4-number bezier array
    },
  },
  hover: {
    scale: 1.03,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
} satisfies Variants
