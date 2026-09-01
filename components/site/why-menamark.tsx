'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  XCircle,
  CheckCircle2,
  Globe2,
  Shield,
  TrendingUp,
  BarChart3,
  Layers,
  Eye,
} from 'lucide-react'
import { Reveal } from './reveal'

const comparisons = [
  {
    without:
      'Manufacturer communicates with distributor directly — with no regional strategy layer',
    with: 'One regional partner manages commercial strategy, execution, and accountability',
  },
  {
    without: 'No single entity accountable for commercial performance across countries',
    with: "Manufacturer's commercial vision is translated and enforced at the market level",
  },
  {
    without:
      'Market intelligence gaps — pricing, competition, tender intelligence all fragmented',
    with: 'Continuous market intelligence — pricing, competition, forecasting, tender tracking',
  },
  {
    without:
      'Launch timelines delayed by misaligned registration and commercial planning',
    with: 'Registration strategy coordinated with commercial milestones from day one',
  },
  {
    without: 'Distributor performance unmanaged between annual review cycles',
    with: 'Distributor performance monitored monthly against defined KPIs',
  },
  {
    without: 'Duplicate engagement costs in each country',
    with: 'Reduced market-entry risk with a proven regional operating model',
  },
]

const advantages = [
  {
    icon: Globe2,
    title: 'One Regional Strategy',
    desc: 'A single commercial vision — aligned to global strategy — drives all activities across GCC and MENA. Pricing, messaging, launch sequencing, and tender strategy are consistent and managed centrally.',
  },
  {
    icon: Shield,
    title: 'One Point of Accountability',
    desc: 'MENAMark is the single entity accountable for commercial performance across the region. No gaps between countries, no ambiguity between agencies, no unmanaged distributor relationships.',
  },
  {
    icon: TrendingUp,
    title: 'Reduced Market-Entry Risk',
    desc: 'Our established distributor network, regulatory intelligence, and institutional relationships dramatically compress the time-to-market and reduce the risk of entry failure that typically results from market unfamiliarity.',
  },
  {
    icon: Layers,
    title: 'Scalable Commercial Infrastructure',
    desc: "MENAMark's model scales with the manufacturer's growth objectives — from single-market entry to a full GCC portfolio operation — without requiring proportional investment in headcount or regional infrastructure.",
  },
  {
    icon: BarChart3,
    title: 'Commercial Independence from Local Distributors',
    desc: "The manufacturer retains strategic control through MENAMark. Local distributors execute defined commercial plans under MENAMark's supervision — not at their own commercial discretion.",
  },
  {
    icon: Eye,
    title: 'Regional Intelligence as a Permanent Capability',
    desc: 'Competitive positioning, pricing benchmarks, tender outcomes, and regulatory changes across GCC and MENA are monitored continuously — giving the global manufacturer the market insight that field teams typically only see at the country level.',
  },
]

// ═══════════════════════════════════════════════════════════
// Comparison table — container-level reveal, row stagger via index
// ═══════════════════════════════════════════════════════════

/**
 * Desktop row — always rendered once the table is in view.
 * The table container animates in as a unit; individual rows
 * stagger-in using index-based transition delay (no per-row IO).
 */
function ComparisonRow({
  row,
  index,
  visible,
}: {
  row: (typeof comparisons)[0]
  index: number
  visible: boolean
}) {
  const delay = index * 0.06

  return (
    <div className="grid grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`border-t border-border px-6 py-4 ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{row.without}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
        transition={{ duration: 0.4, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={`border-t border-primary/10 px-6 py-4 ${index % 2 === 0 ? 'bg-primary/5' : 'bg-primary/8'}`}
      >
        <p className="text-sm font-medium leading-relaxed text-foreground">{row.with}</p>
      </motion.div>
    </div>
  )
}

/**
 * Mobile card — each card uses Reveal (container-level useInView,
 * not per-element) which is far more reliable.
 */
function MobileComparisonRow({ row }: { row: (typeof comparisons)[0] }) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="bg-muted px-5 py-4">
          <div className="mb-2 flex items-center gap-1.5">
            <XCircle className="size-3 shrink-0 text-destructive" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Without MENAMark
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{row.without}</p>
        </div>
        <div className="bg-primary/10 px-5 py-4">
          <div className="mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="size-3 shrink-0 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              With MENAMark
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">{row.with}</p>
        </div>
      </div>
    </Reveal>
  )
}

/**
 * Table container — uses a single IntersectionObserver on the outer div.
 * When the container enters the viewport, set visible=true and let
 * each ComparisonRow animate in with index-based stagger delay.
 */
function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      // Generous margin — trigger as soon as any part of the table is visible
      { rootMargin: '0px 0px 0px 0px', threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="mt-14">
      {/* ── Desktop / tablet ── */}
      <div
        ref={ref}
        className="hidden overflow-hidden rounded-2xl border border-border sm:block"
      >
        {/* Column headers */}
        <div className="grid grid-cols-2">
          <div className="bg-muted px-6 py-4">
            <div className="flex items-center gap-2">
              <XCircle className="size-5 text-destructive" />
              <span className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                Without MENAMark
              </span>
            </div>
          </div>
          <div className="bg-primary px-6 py-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary-foreground" />
              <span className="font-heading text-sm font-bold uppercase tracking-wide text-primary-foreground">
                With MENAMark
              </span>
            </div>
          </div>
        </div>
        {/* Data rows — animate once container is in view */}
        {comparisons.map((row, i) => (
          <ComparisonRow key={i} row={row} index={i} visible={visible} />
        ))}
      </div>

      {/* ── Mobile ── */}
      <div className="space-y-4 sm:hidden">
        {comparisons.map((row, i) => (
          <MobileComparisonRow key={i} row={row} />
        ))}
      </div>
    </div>
  )
}

export function WhyMenamark() {
  return (
    <section
      id="why"
      className="border-y border-border bg-secondary/40 py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            Why MENAMARK
          </p>
          <h2 className="mt-3 text-display font-extrabold text-foreground">
            The GCC &amp; MENA Complexity Requires a Different Approach.
          </h2>
        </Reveal>

        <Reveal delay={1} className="mx-auto mt-6 max-w-3xl text-center">
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Most manufacturers entering the region face the same structural problem: a capable global
            strategy and an execution gap at the regional level. Relying solely on a local distributor
            leaves commercial strategy undefined, growth unmanaged, and market intelligence opaque.
          </p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            MENAMark resolves this by functioning as the manufacturer&apos;s regional commercial
            organisation — directing strategy, managing execution, and holding the local distributor
            network accountable — while keeping the manufacturer&apos;s own overhead and legal
            exposure to a minimum.
          </p>
        </Reveal>

        {/* ── Comparison table — progressive reveal ── */}
        <ComparisonTable />

        {/* ── Advantage cards ── */}
        <div className="mt-20">
          <Reveal className="text-center">
            <h3 className="text-title font-bold text-foreground">
              The Case for One Regional Partner.
            </h3>
            <p className="mt-3 text-pretty text-muted-foreground">
              The strategic advantages of a single exclusive regional commercial representative are
              structural, not incremental. MENAMark replaces fragmented country-by-country
              management with a coherent regional commercial model.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={i % 3}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:border-primary/40 active:border-primary/40 hover:shadow-xl active:shadow-xl hover:shadow-primary/5 active:shadow-primary/5">
                  <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-active:bg-primary group-hover:text-primary-foreground group-active:text-primary-foreground">
                    <adv.icon className="size-6" />
                  </span>
                  <h4 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {adv.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{adv.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
