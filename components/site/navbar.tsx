'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why MENAMARK', href: '#why' },
  { label: 'How We Operate', href: '#how-we-operate' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/70 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <a href="#top" className="flex items-center gap-2" aria-label="MENAMARK home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 ${
                    isActive ? 'text-primary after:scale-x-100' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            className="rounded-full px-5"
          >
            Contact Us <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-lg text-foreground"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-background lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
              {links.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-[44px] items-center rounded-xl px-4 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <Button
                  render={<a href="#contact" onClick={() => setOpen(false)} />}
                  nativeButton={false}
                  className="h-11 w-full rounded-full text-base"
                >
                  Contact Us <ArrowRight className="size-4" />
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
