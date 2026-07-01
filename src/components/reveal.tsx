"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
}

/**
 * Reveal — fade + translate on scroll into view.
 * Uses IntersectionObserver (via motion's viewport hook), not scroll listener.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
  duration = 0.9,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
