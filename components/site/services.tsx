'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'

// ═══════════════════════════════════════════════════════════
// Data — unchanged from original
// ═══════════════════════════════════════════════════════════
const services = [
  {
    number: '01',
    title: 'Exclusive Regional Representation',
    intro:
      "MENAMark becomes the manufacturer's exclusive commercial representative and appointed regional agent across GCC and MENA — the regional extension of the global commercial team. A formal Exclusive Regional Representation Agreement defines the territory, responsibilities, and governance framework.",
    bullets: [
      'Primary representation across all agreed GCC and MENA markets',
      'Regional commercial leadership aligned to global strategy',
      'Business development and new-market expansion planning',
      'Territory development and portfolio prioritisation',
      'Relationship management with key stakeholders, health authorities, and institutions',
      'Single regional point of accountability for commercial performance',
    ],
  },
  {
    number: '02',
    title: 'Market Intelligence & Commercial Opportunity Assessment',
    intro:
      'Before capital is deployed, MENAMark delivers structured market intelligence to support executive decision-making — covering commercial feasibility, competitive dynamics, pricing benchmarks, and launch sequencing.',
    bullets: [
      'Market sizing and revenue modelling by country and segment',
      'Competitive landscape analysis and positioning benchmarks',
      'Pricing intelligence — government, tender, private channel',
      'Healthcare system mapping: payers, procurement pathways, decision-makers',
      'Commercial feasibility assessment and investment case support',
      'Launch priority sequencing across GCC and MENA markets',
    ],
  },
  {
    number: '03',
    title: 'Distributor Selection & Performance Management',
    intro:
      'MENAMark identifies, evaluates, appoints, and manages the right distribution partner in each market — replacing informal relationships with structured commercial governance. Each distributor works directly with MENAMark, giving the manufacturer a single, insulated point of control.',
    bullets: [
      'Pre-screened distributor shortlists with full capability profiles',
      'Commercial due diligence: financial standing, regulatory licences, therapeutic portfolio fit',
      'Contract negotiation support: terms, territory, performance obligations',
      'Formal distributor appointment coordination',
      'Monthly KPI monitoring against agreed performance targets',
      'Distributor development planning and capability coaching',
      'Annual performance reviews and strategic planning facilitation',
    ],
  },
  {
    number: '04',
    title: 'Market Access Coordination',
    intro:
      'MENAMark develops the regional registration strategy and manages the technical and administrative process for the locally licensed distributor — who acts as the legal applicant and regulatory license holder in each country — with MENAMark coordinating every step. MENAMark does not act as the regulatory applicant or local authorized representative.',
    bullets: [
      'Registration strategy development: country prioritisation and timeline planning',
      'Regulatory pathway analysis: SFDA, MOHAP, DHA, MOH Kuwait, and other GCC authorities',
      'Technical documentation review and gap analysis in coordination with the manufacturer',
      'MENAMark-managed coordination with local distributors throughout the submission process',
      'Progress monitoring and escalation management',
      'Pricing file support and submission coordination',
      'Post-registration lifecycle planning: renewals, variations, line extensions',
    ],
  },
  {
    number: '05',
    title: 'Commercial Strategy & Product Launch',
    intro:
      'MENAMark designs and executes the full commercial launch architecture — integrating pricing, field activation, KOL engagement, and tender strategy into a coherent go-to-market plan.',
    bullets: [
      'Go-to-market strategy and launch sequencing by market',
      'Commercial planning: sales targets, account prioritisation, channel strategy',
      'Pricing strategy: government, tender, private, and institutional channels',
      'Sales forecasting and business planning',
      'Tender strategy: NUPCO (KSA), MOH Kuwait, DHA, and regional public procurement',
      'Business review facilitation and growth planning',
    ],
  },
  {
    number: '06',
    title: 'Marketing & Medical Promotion',
    intro:
      'MENAMark translates global brand strategy into regionally relevant, medically compliant commercial promotion — building brand equity with clinicians, KOLs, and institutional procurement teams.',
    bullets: [
      'Brand localisation: Arabic and English marketing materials',
      'Regional marketing plan development and execution management',
      'Medical education events, clinical workshops, and product training',
      'Congress and symposium participation — regional and international',
      'KOL identification, mapping, and engagement programme management',
      'Promotional material development and regulatory compliance review',
      'Digital marketing support and regional campaign coordination',
    ],
  },
  {
    number: '07',
    title: 'Dedicated Commercial Field Teams',
    intro:
      "Where the commercial strategy requires dedicated in-market representation, MENAMark coordinates the recruitment, training, and supervision of field commercial teams — operating as an extension of the manufacturer's or distributor's organization in the relevant markets.",
    bullets: [
      'Field team needs assessment and resource planning',
      'Recruitment coordination for medical sales representatives and clinical specialists',
      'Training programme design: product, disease area, commercial skills',
      'Field team management and performance oversight',
      'Daily call activity planning, market visit management, and promotional execution',
      'In-market sales reporting and market intelligence gathering',
    ],
  },
  {
    number: '08',
    title: 'Regional Commercial Coordination & Governance',
    intro:
      'MENAMark maintains the ongoing commercial governance infrastructure that keeps the manufacturer, distributors, and field teams aligned across multiple markets simultaneously.',
    bullets: [
      'Manufacturer communication management: reporting, escalations, approvals',
      'Multi-country distributor coordination: forecasting, inventory, launch alignment',
      'Regional pricing governance and alignment',
      'Tender coordination across GCC procurement channels',
      'Commercial performance reporting and dashboard management',
      'Regulatory milestone tracking and coordination',
      'Regional business reviews and strategic planning facilitation',
    ],
  },
]

// ═══════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════
/** Pixels of page-scroll needed to advance one service on desktop */
const SCROLL_PER_SERVICE = 320
const SCROLL_TOTAL = SCROLL_PER_SERVICE * (services.length - 1)

// ═══════════════════════════════════════════════════════════
// Desktop sub-components
// ═══════════════════════════════════════════════════════════

/** Expanded content shown in the right panel */
function DesktopContent({ service }: { service: (typeof services)[0] }) {
  return (
    <div
      // Note: no data-lenis-prevent here on desktop — wheel events must
      // reach the outer scroll container to advance services
      className="h-full overflow-y-auto px-8 py-8 lg:px-10 lg:py-10"
    >
      <div className="max-w-2xl">
        <span className="font-heading text-6xl font-extrabold text-primary/10 lg:text-8xl">
          {service.number}
        </span>
        <h3 className="mt-1 text-title font-bold text-foreground">{service.title}</h3>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.intro}
        </p>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm leading-relaxed text-foreground">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Left navigation list */
function DesktopNav({
  activeIndex,
  progressRatio,
  onSelect,
}: {
  activeIndex: number
  progressRatio: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden border-r border-border">
      {/* Vertical progress track */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-border/60">
        <div
          className="origin-top bg-primary transition-all duration-300"
          style={{ height: `${progressRatio * 100}%` }}
        />
      </div>

      {/* Scroll hint */}
      <div className="border-b border-border px-6 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Scroll to explore · {activeIndex + 1} / {services.length}
        </p>
      </div>

      {/* Service list */}
      <div className="flex-1 overflow-y-auto">
        {services.map((s, i) => (
          <button
            key={s.number}
            type="button"
            onClick={() => onSelect(i)}
            className={`group relative flex w-full items-start gap-4 px-6 py-4 text-left transition-all duration-200 ${
              i === activeIndex
                ? 'bg-primary/5'
                : 'hover:bg-muted/40'
            }`}
          >
            {/* Active left border */}
            {i === activeIndex && (
              <motion.div
                layoutId="service-nav-indicator"
                className="absolute left-0 top-0 h-full w-0.5 bg-primary"
              />
            )}
            <span
              className={`shrink-0 font-heading text-xs font-bold tabular-nums transition-colors ${
                i === activeIndex ? 'text-primary' : 'text-muted-foreground/40'
              }`}
            >
              {s.number}
            </span>
            <span
              className={`font-heading text-sm font-semibold leading-snug transition-colors ${
                i === activeIndex ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
              }`}
            >
              {s.title}
            </span>
            {i === activeIndex && (
              <ChevronRight className="ml-auto mt-0.5 size-4 shrink-0 text-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// Mobile sub-component — native inner scroll drives advancement
// ═══════════════════════════════════════════════════════════

/**
 * Mobile service card with tap-to-advance navigation.
 * canAdvance becomes true once the content has been scrolled to the bottom,
 * or the content fits within the panel without scrolling.
 */
function MobileContent({
  service, isFirst, isLast, onAdvance, onBack,
}: {
  service: (typeof services)[0]
  isFirst: boolean
  isLast: boolean
  onAdvance: () => void
  onBack: () => void
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [canAdvance, setCanAdvance] = useState(false)

  useEffect(() => {
    const el = divRef.current
    if (!el) return
    el.scrollTop = 0
    setCanAdvance(false)

    const check = () => {
      const fits = el.scrollHeight <= el.clientHeight + 8
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24
      if (fits || atBottom) setCanAdvance(true)
    }

    // rAF ensures layout is settled before measuring
    const raf = requestAnimationFrame(check)
    el.addEventListener('scroll', check, { passive: true })
    return () => { cancelAnimationFrame(raf); el.removeEventListener('scroll', check) }
  }, [service.number])

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable content — data-lenis-prevent skips Lenis for this element */}
      <div
        ref={divRef}
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto p-5 pb-3 sm:p-6"
      >
        <span className="font-heading text-5xl font-extrabold text-primary/10 sm:text-6xl">
          {service.number}
        </span>
        <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-foreground sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.intro}
        </p>
        <ul className="mt-5 space-y-2.5 pb-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm leading-relaxed text-foreground">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation footer */}
      <div className="shrink-0 flex items-center gap-2 border-t border-border px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirst}
          aria-label="Previous service"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={canAdvance ? onAdvance : undefined}
          className={`flex h-10 flex-1 items-center justify-center rounded-full text-sm font-semibold transition-all ${canAdvance ? 'bg-primary text-primary-foreground' : 'cursor-default bg-muted text-muted-foreground'}`}
        >
          {isLast
            ? canAdvance ? 'All services read \u2713' : 'Scroll to finish \u2193'
            : canAdvance ? 'Next service \u2192' : 'Scroll to continue \u2193'}
        </button>
      </div>
    </div>
  )
}

export function Services() {
  const scrollRef = useRef<HTMLDivElement>(null)       // desktop scroll container
  const mobileScrollRef = useRef<HTMLDivElement>(null) // mobile scroll container
  const isDesktopRef = useRef(false)
  const shouldReduce = useReducedMotion()

  // Shared active index — driven by scroll on both desktop and mobile
  const [activeIndex, setActiveIndex] = useState(0)

  /**
   * Set to true during programmatic scrollToService navigation.
   * While true, onScroll ignores position updates so the newly set
   * activeIndex is not immediately overridden by an in-flight scroll event.
   */
  const isProgrammaticRef = useRef(false)

  // Track desktop breakpoint
  useEffect(() => {
    const check = () => { isDesktopRef.current = window.innerWidth >= 1024 }
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // -- Scroll tracking: DESKTOP ONLY --
  // Mobile advancement is driven by inner content scroll (MobileContent.onScroll)
  useEffect(() => {
    const onScroll = () => {
      if (isProgrammaticRef.current) return
      if (!isDesktopRef.current) return

      const container = scrollRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / SCROLL_TOTAL)
      const idx = Math.round(progress * (services.length - 1))
      setActiveIndex(Math.max(0, Math.min(services.length - 1, idx)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Deep-link navigation ──
  const scrollToService = useCallback((num: string) => {
    const idx = services.findIndex((s) => s.number === num)
    if (idx < 0) return

    if (isDesktopRef.current) {
      // Desktop: scroll to the exact position in the tall scroll container
      const container = scrollRef.current
      if (!container) return
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const progress = idx / (services.length - 1)
      const targetY = containerTop + progress * SCROLL_TOTAL
      setActiveIndex(idx)
      isProgrammaticRef.current = true
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' })
      setTimeout(() => { isProgrammaticRef.current = false }, 150)
    } else {
      // Mobile: scroll to the services section start (the panel becomes sticky)
      // then set the active service. The new service's inner content starts at
      // scrollTop = 0 naturally when AnimatePresence mounts it.
      const container = mobileScrollRef.current
      const targetY = container
        ? container.getBoundingClientRect().top + window.scrollY
        : 0
      setActiveIndex(idx)
      isProgrammaticRef.current = true
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' })
      setTimeout(() => { isProgrammaticRef.current = false }, 150)
    }
  }, [])

  // ── Handle URL hash + custom events ──
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#service-')) {
      const num = hash.slice('#service-'.length)
      setTimeout(() => scrollToService(num), 80)
    }
    const handle = (e: Event) => scrollToService((e as CustomEvent<string>).detail)
    window.addEventListener('menamark:open-service', handle)
    return () => window.removeEventListener('menamark:open-service', handle)
  }, [scrollToService])

  // ── Desktop: click nav item → scroll to that service's position ──
  const handleDesktopSelect = useCallback((i: number) => {
    setActiveIndex(i)
    if (scrollRef.current) {
      const containerTop = scrollRef.current.getBoundingClientRect().top + window.scrollY
      const progress = services.length > 1 ? i / (services.length - 1) : 0
      const targetY = containerTop + progress * SCROLL_TOTAL
      isProgrammaticRef.current = true
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' })
      setTimeout(() => { isProgrammaticRef.current = false }, 150)
    }
  }, [])

  // -- Mobile: advance to next service when inner content fully read --
  const handleMobileAdvance = useCallback(() => {
    setActiveIndex(prev => Math.min(prev + 1, services.length - 1))
  }, [])

  const handleMobileBack = useCallback(() => {
    setActiveIndex(prev => Math.max(prev - 1, 0))
  }, [])

  return (
    <section id="services" className="pt-16 pb-0 lg:pt-20">
      {/* ── Section header ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
              What we offer
            </p>
            <h2 className="mt-3 text-display font-extrabold text-foreground">
              An Integrated Service Portfolio Built for Regional Commercial Success.
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              MENAMark&apos;s eight service lines form a coherent commercial management system —
              designed to work as a whole, not as individual transactions.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          DESKTOP — scroll-driven sticky two-panel
      ───────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="relative mt-4 hidden lg:block"
        style={{ height: `calc(100vh + ${SCROLL_TOTAL}px)` }}
        aria-label="Services — scroll to explore"
      >
        {/* Sticky panel — capped at 720px so it doesn't overwhelm large screens */}
        <div
          className="sticky top-20 flex items-center mx-auto max-w-7xl px-5 sm:px-8"
          style={{ height: 'calc(100vh - 5rem)' }}
        >
          <div className="h-full max-h-[720px] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5">
            <div className="grid h-full" style={{ gridTemplateColumns: '280px 1fr' }}>

              {/* Left: service navigation */}
              <DesktopNav
                activeIndex={activeIndex}
                progressRatio={services.length > 1 ? activeIndex / (services.length - 1) : 0}
                onSelect={handleDesktopSelect}
              />

              {/* Right: animated content panel — sync mode for instant service swaps */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="h-full"
                  >
                    <DesktopContent service={services[activeIndex]} />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET
          Sticky card centred in viewport.
          Tap Next/Back to navigate; Next activates once content is scrolled to bottom. */}
      <div
        ref={mobileScrollRef}
        className="relative mt-6 lg:hidden"
        style={{ height: 'calc(100vh + 400px)' }}
      >
        <div
          className="sticky top-[4rem] flex items-center px-5 sm:px-8"
          style={{ height: 'calc(100vh - 4rem)' }}
        >
          <div
            className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5 sm:rounded-3xl"
            style={{ height: 'min(calc(100vh - 10rem), 480px)' }}
          >
            {/* Progress header */}
            <div className="shrink-0 border-b border-border px-5 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {activeIndex + 1} / {services.length}
                </p>
                {/* Tappable dots — jump directly to any service */}
                <div className="flex items-center gap-1">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to service ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'size-2 bg-primary' : 'size-1.5 bg-border hover:bg-muted-foreground'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 h-0.5 w-full rounded-full bg-border">
                <div
                  style={{ width: `${services.length > 1 ? (activeIndex / (services.length - 1)) * 100 : 0}%` }}
                />
              </div>
            </div>
            {/* Content */}
            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                  className="h-full"
                >
                  <MobileContent
                    service={services[activeIndex]}
                    isFirst={activeIndex === 0}
                    isLast={activeIndex === services.length - 1}
                    onAdvance={handleMobileAdvance}
                    onBack={handleMobileBack}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
