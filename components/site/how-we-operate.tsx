import { CheckCircle2 } from 'lucide-react'
import { Reveal } from './reveal'

const phases = [
  {
    number: '01',
    title: 'Market Assessment & Opportunity Sizing',
    desc: 'Before any resource is committed, MENAMark conducts a structured evaluation of the commercial opportunity: regulatory landscape, pricing environment, competitive positioning, market sizing, and entry sequencing across target GCC and MENA markets.',
  },
  {
    number: '02',
    title: 'Distributor Search & Appointment',
    desc: 'MENAMark identifies, evaluates, and conducts commercial due diligence on qualified distributors in each target market. We lead contract negotiations, define performance frameworks, and formally appoint each distributor — building a direct, exclusive relationship between MENAMark and the distributor in every market.',
  },
  {
    number: '03',
    title: 'Market Access & Registration Coordination',
    desc: 'MENAMark develops the registration strategy and manages the technical documentation needed by the appointed local distributor — who acts as the legal applicant in each market — with MENAMark coordinating every step. We supervise timelines, facilitate authority alignment, and support pricing file preparation.',
  },
  {
    number: '04',
    title: 'Commercial Launch',
    desc: 'MENAMark leads the go-to-market plan: pricing strategy, launch sequencing, KOL engagement, field force deployment, product training, congress participation, and the first tender submissions — all coordinated regionally and executed locally.',
  },
  {
    number: '05',
    title: 'Ongoing Commercial Operations & Growth',
    desc: 'Post-launch, MENAMark assumes full regional commercial management: distributor performance monitoring, forecast coordination, competitive intelligence, marketing execution, tender management, and ongoing business development — driving year-on-year growth across the portfolio.',
  },
]

const menamarkDoes = [
  "Develops and leads regional commercial strategy on the manufacturer's behalf",
  'Selects, appoints, and manages local distributors and sub-distributors — who deal exclusively with MENAMark',
  'Coordinates market access strategy and supervises registration progress',
  'Manages product launches, commercial planning, and tender submissions',
  'Leads marketing, KOL engagement, and medical education programmes',
  'Recruits and supervises field commercial teams where required',
  'Reports commercial performance to the global manufacturer',
  'Maintains governance and alignment across all active markets',
]

const distributorDoes = [
  'Holds the legal product registration and market authorization in each country',
  'Acts as the local authorized representative with the relevant health authority',
  'Conducts product importation, customs clearance, and quality release',
  'Manages in-country warehousing, inventory, and supply chain',
  'Issues local invoices and manages in-country logistics',
  'Fulfils after-sales service and product complaint obligations',
]

export function HowWeOperate() {
  return (
    <section
      id="how-we-operate"
      className="border-y border-border bg-secondary/40 py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Intro */}
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            How We Operate
          </p>
          <h2 className="mt-3 text-display font-extrabold text-foreground">
            One Agreement.
          </h2>
          <h2 className="mt-3 text-display font-extrabold text-foreground">
            One Regional Strategy.
          </h2>
          <h2 className="mt-3 text-display font-extrabold text-foreground">
            One Accountable Partner.
          </h2>
        </Reveal>

        <Reveal delay={1} className="mx-auto mt-6 max-w-3xl text-center">
          <p className="text-pretty leading-relaxed text-muted-foreground">
            MENAMark&apos;s operating model is structurally distinct from a distributor, a consulting
            firm, and a regulatory affairs agency. It is the layer of regional commercial leadership
            that sits between the global manufacturer and the country-level distribution network.
          </p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Every distributor and sub-distributor works directly and exclusively with MENAMark —
            day-to-day coordination, communication, and accountability all run through MENAMark,
            not the manufacturer.
          </p>
        </Reveal>

        <Reveal delay={2} className="mx-auto mt-5 max-w-3xl">
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center">
            <p className="text-sm font-medium leading-relaxed text-foreground">
              The appointed local distributor in each country is the legally registered importer,
              license holder, and local authorized representative. These roles are distinct, and
              never interchangeable.
            </p>
          </div>
        </Reveal>

        {/* ── 5-step timeline ── */}
        <div className="mt-20">
          <Reveal className="text-center">
            <h3 className="text-title font-bold text-foreground">
              From Market Entry to Sustained Commercial Growth.
            </h3>
            <p className="mt-3 text-pretty text-muted-foreground">
              MENAMark&apos;s engagement model follows a structured commercial lifecycle — reducing
              risk at every stage and building permanent regional capability for the manufacturer.
            </p>
          </Reveal>

          {/* Desktop: horizontal timeline */}
          <div className="mt-12 hidden lg:block">
            <div className="relative grid grid-cols-5 gap-4">
              <div
                className="absolute left-0 right-0 top-7 h-px bg-border"
                aria-hidden
              />
              {phases.map((phase, i) => (
                <Reveal key={phase.number} delay={i}>
                  <div className="relative flex flex-col">
                    <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                      <span className="font-heading text-sm font-extrabold">{phase.number}</span>
                    </span>
                    <h4 className="mt-4 font-heading text-sm font-bold leading-snug text-foreground">
                      Phase {phase.number} — {phase.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {phase.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="mt-10 lg:hidden">
            {phases.map((phase, i) => (
              <Reveal key={phase.number} delay={i % 3}>
                <div className="relative flex gap-4 pb-8 last:pb-0">
                  {i < phases.length - 1 && (
                    <div
                      className="absolute left-7 top-14 h-[calc(100%-3.5rem)] w-px bg-border"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                    <span className="font-heading text-sm font-extrabold">{phase.number}</span>
                  </span>
                  <div className="pt-1">
                    <h4 className="font-heading text-base font-bold text-foreground">
                      Phase {phase.number} — {phase.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── 2-column split: MENAMark vs Distributor ── */}
        <div className="mt-20">
          <Reveal className="text-center">
            <h3 className="text-title font-bold text-foreground">
              How MENAMark Operates on Your Behalf.
            </h3>
            <p className="mt-3 text-pretty text-muted-foreground">
              MENAMark functions as the regional commercial leadership layer between the global
              manufacturer and the in-country distribution and regulatory infrastructure. The model
              is built on three core principles: strategic clarity, commercial accountability, and
              legal accuracy.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0}>
              <div className="h-full rounded-2xl bg-primary p-6 sm:p-8">
                <h4 className="font-heading text-lg font-bold text-primary-foreground">
                  What MENAMark Does
                </h4>
                <ul className="mt-5 space-y-3">
                  {menamarkDoes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-foreground/60" />
                      <span className="text-sm leading-relaxed text-primary-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h4 className="font-heading text-lg font-bold text-foreground">
                  What the Local Distributor Does
                </h4>
                <ul className="mt-5 space-y-3">
                  {distributorDoes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Present Where Your Products Need to Be */}
        <Reveal delay={1}>
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center">
            <p className="text-sm font-medium leading-relaxed text-foreground">
              Present Where Your Products Need to Be. MENAMark maintains active commercial and
              regulatory networks across the GCC and broader MENA region — with particular depth in
              the markets that represent the greatest commercial priority for medical device and life
              sciences manufacturers.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
