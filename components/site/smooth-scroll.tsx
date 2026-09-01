'use client'

import { useEffect, type ReactNode } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let rafId: number
    let lenis: import('lenis').default | null = null

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Enable smooth scroll on touch devices for consistent feel
        smoothTouch: true,
        touchMultiplier: 1.5,
        // Skip smooth scroll for elements marked data-lenis-prevent
        // (inner scrollable panels like the services content pane)
        prevent: (node: HTMLElement) =>
          node.closest('[data-lenis-prevent]') !== null,
      })

      function raf(time: number) {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
