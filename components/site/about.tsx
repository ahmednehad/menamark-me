'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Factory, X } from 'lucide-react'
import { Reveal } from './reveal'

const leaders = [
  {
    name: 'Dr. Osama Al Shareef',
    title: 'MENAMARK ME Managing Director',
    location: 'Based in Dubai / UAE',
    photo: '/images/osama-al-shareef.jpg',
    bio:
      'Dr. Osama Al Shareef brings over 25 years of healthcare industry experience across the Gulf and Egypt, shaped by leading international organisations including Boehringer Ingelheim, DUEMX, and Hikma Pharmaceutical. His regional experience spans large enterprises such as Al Gosaibi GTC and Al Salehiya Medical, where he has managed multiple medical device manufacturers - including C.R. Bard (USA), Aspide Medical (France), Grena (UK), TobyOrtho (USA), Stratpharma AG (Switzerland), GEM SRL (Italy), Rochester Medical, and PNN Medical (Denmark) - among others.',
  },
  // {
  //   name: 'Dr. Ghandi Yacoub',
  //   title: 'Managing Director',
  //   bio: null as string | null,
  // },
  // {
  //   name: 'Dr. Wesam Nehad',
  //   title: 'Managing Director',
  //   bio: null as string | null,
  // },
  // {
  //   name: 'Dr. Shamel Beheiry',
  //   title: 'Managing Director',
  //   bio: null as string | null,
  // },
]

const hospitals = [
  'Al Sabah Main (General) Hospital',
  'Al Sabah Maternity Hospital',
  'Kuwait Cancer Control Center (KCCC) — Al Sabah Area',
]

const manufacturers = [
  { name: 'Fehling (Germany)',             desc: 'Surgical instruments and implants' },
  { name: 'Mediflex (USA)',                desc: 'Surgical retractor systems' },
  { name: 'Welfare Medical UK (UK)',       desc: 'Open & laparoscopic disposables' },
  { name: 'DEX Surgical (France)',         desc: 'Laparoscopic wristed instruments' },
  { name: 'HM Cast Korea (South Korea)',   desc: 'Poly-cotton orthopedic casting' },
]

export function About() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tapped, setTapped]   = useState<string | null>(null)
  const [active, setActive]   = useState<typeof leaders[0] | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  // Dispatch: touch-primary devices tap-to-flip first; mouse devices open modal directly.
  function handleCardClick(leader: typeof leaders[0]) {
    // matchMedia is the same signal that drives [@media(hover:hover)] CSS - most reliable cross-browser
    const hasHover =
      typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
    if (hasHover) {
      // Mouse device: hover already shows the back face, click opens modal
      setActive(leader)
    } else {
      // Touch device: toggle flip; only one card flipped at a time
      setTapped(prev => (prev === leader.name ? null : leader.name))
    }
  }
  return (
    <section id="about" className="py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* ── Intro ── */}
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
              About MENAMARK
            </p>
            <h2 className="mt-3 text-display font-extrabold text-foreground">
              Not a Distributor. Not a Consultancy. Your Regional Commercial Team.
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              MENAMark Middle East FZ-LLC was established in 2016 to close the structural gap most
              international life science companies face when entering GCC and MENA: a capable global
              commercial strategy with no regional entity to lead, execute, and sustain it. We are a
              Free Zone company headquartered at Dubai Science Park — embedded in the same ecosystem
              as the region's leading health science institutions, regulators, and industry
              organisations.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              MENAMark is neither a distributor nor a consultancy. We are a regional commercial
              management company: the manufacturer&apos;s strategic and operational arm inside the
              region — representing your interests, managing your distributor network, leading your
              commercial strategy, and coordinating every dimension of market development, while
              ensuring that each country&apos;s legal and regulatory obligations are fulfilled by the
              appropriately licensed local entity.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
              <p className="text-sm font-medium leading-relaxed text-foreground">
                MENAMark acts as the multinational manufacturer&apos;s appointed agent across the
                region — local distributors and sub-distributors deal exclusively with MENAMark,
                never directly with the manufacturer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              When a global manufacturer signs an Exclusive Regional Representation Agreement with
              MENAMark, they gain a permanent commercial presence across GCC and MENA — without the
              overhead, risk, or structural complexity of building it independently.
            </p>
          </Reveal>
        </div>

        {/* ── Team image ── */}
        {/*<Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-border">
            <Image
              src="/images/about-team.jpg"
              alt="MENAMark leadership team at Dubai Science Park"
              width={1400}
              height={600}
              className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[440px]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* ── Leadership ── */}
        <div className="mt-20 border-t border-border pt-16">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                Leadership
              </p>
              <h3 className="mt-3 text-title font-extrabold text-foreground">
                Decades of Combined Regional Expertise
              </h3>
              <p className="mt-4 text-pretty text-muted-foreground">
                MENAMark&apos;s Expertise brings decades of pharmaceutical and medical
                device commercial leadership across GCC, MENA, and IMETA - at organisations
                including Boehringer Ingelheim, Hikma Pharmaceutical, Al Gosaibi GTC, and
                Al Salehiya Medical.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 flex justify-center">
            {leaders.map((leader, i) => (
              <Reveal key={leader.name} delay={i} className="w-full max-w-sm">
                {/* Perspective wrapper */}
                <div
                  className="h-80 cursor-pointer [perspective:1200px]"
                  onMouseEnter={() => setHovered(leader.name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleCardClick(leader)}
                  onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && setActive(leader)
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`View profile for ${leader.name}`}
                >
                  {/* Rotating inner card */}
                  <div
                    className={`relative h-full w-full [transform-style:preserve-3d] transition-[transform] duration-700 ${
                      hovered === leader.name || tapped === leader.name
                        ? '[transform:rotateY(180deg)]'
                        : ''
                    }`}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-10 text-center [backface-visibility:hidden]">
                      <div className="relative size-24 overflow-hidden rounded-full border-2 border-border">
                        <Image
                          src={leader.photo}
                          alt={leader.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="mt-4 font-heading text-base font-bold text-foreground sm:text-lg">
                        {leader.name}
                      </h4>
                      <p className="mt-1 text-sm font-semibold text-primary">{leader.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{leader.location}</p>
                      <p className="mt-4 text-xs text-muted-foreground [@media(hover:hover)]:hidden">
                        Tap to learn more
                      </p>
                      <p className="mt-4 hidden text-xs text-muted-foreground [@media(hover:hover)]:block">
                        Hover to learn more
                      </p>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-8 py-10 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <h4 className="font-heading text-base font-bold text-foreground sm:text-lg">
                        {leader.name}
                      </h4>
                      <p className="text-sm font-semibold text-primary">{leader.title}</p>
                      <p className="text-xs text-muted-foreground">{leader.location}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setTapped(null)
                          setActive(leader)
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:opacity-75"
                      >
                        View Full Profile
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Leadership Modal ── */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              onClick={() => setActive(null)}
            >
              <motion.div
                key="panel"
                initial={{ scale: 0.92, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 16 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close profile"
                  className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <X className="size-4" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative size-28 overflow-hidden rounded-full border-2 border-border">
                    <Image
                      src={active.photo}
                      alt={active.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                    {active.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{active.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{active.location}</p>
                  <div className="mt-6 max-h-72 w-full overflow-y-auto rounded-2xl border border-dashed border-border bg-muted/40 px-5 py-5 text-left">
                    <p className="text-sm font-semibold text-foreground">Biography</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {active.bio ??
                        'Full biography pending from MENAMark team.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Kuwait Track Record ── */}
        <div className="mt-20 border-t border-border pt-16">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                Kuwait Track Record
              </p>
              <h3 className="mt-3 text-title font-extrabold text-foreground">
                Proven In-Market Execution
              </h3>
              <p className="mt-4 text-pretty text-muted-foreground">
                MENAMark&apos;s Kuwait operations demonstrate the company&apos;s ability to deliver
                active product placement in major public healthcare institutions through a structured
                distributor relationship. All activities below are executed through the appointed
                local distributor, Innomedics, under MENAMark&apos;s commercial supervision.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Building2 className="size-5" />
                  </span>
                  <h4 className="font-heading text-lg font-bold text-foreground">
                    Hospitals Currently Supplied
                  </h4>
                </div>
                <ul className="mt-5 space-y-3">
                  {hospitals.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm leading-relaxed text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Factory className="size-5" />
                  </span>
                  <h4 className="font-heading text-lg font-bold text-foreground">
                    Manufacturers Currently Represented in Kuwait
                  </h4>
                </div>
                <ul className="mt-5 space-y-3">
                  {manufacturers.map((m) => (
                    <li key={m.name} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold text-foreground">{m.name}</span>
                        {' '}
                        <span className="text-muted-foreground">— {m.desc}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  )
}
