'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'span'
}) {
  const ref = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  // margin: '-40px' triggers when element is 40px inside the viewport
  const inView = useInView(ref as React.RefObject<HTMLElement>, {
    once: true,
    margin: '-40px 0px -40px 0px',
  })

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: shouldReduce ? 0 : 28 }
      }
      transition={{
        duration: shouldReduce ? 0.15 : 0.6,
        delay: inView ? delay * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
