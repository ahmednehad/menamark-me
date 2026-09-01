import { MapPin, ShieldCheck, Handshake, Award } from 'lucide-react'
import { Reveal } from './reveal'

const highlights = [
  {
    icon: MapPin,
    title: 'Regional expertise',
    desc: 'Deep, on-the-ground knowledge of the GCC market and its regulators.',
  },
  {
    icon: Award,
    title: 'Gulf presence',
    desc: 'A connected network spanning the entire GCC region.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance-driven',
    desc: 'Pharmacovigilance and data disclosure built into everything we do.',
  },
  {
    icon: Handshake,
    title: 'Long-term partnerships',
    desc: 'We act as your dedicated extension, invested in sustainable growth.',
  },
]

const partners = [
  'HM Cast',
  'Fehling',
  'Mediflex',
  'Welfare Medical UK',
  'DEX Surgical',
  'MedApp',
]

export function Trust() {
  return (
    <section className="border-y border-border bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            Why partners choose us
          </p>
          <h2 className="mt-3 text-display font-extrabold text-foreground">
            A trusted regional partner, built on substance
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:border-primary/40 active:border-primary/40 hover:shadow-xl active:shadow-xl hover:shadow-primary/5 active:shadow-primary/5">
                <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-active:bg-primary group-hover:text-primary-foreground group-active:text-primary-foreground">
                  <item.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by leading healthcare brands
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-0 hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((name, i) => (
                <span key={`${name}-${i}`} className="flex items-center">
                  <span className="whitespace-nowrap px-8 font-heading text-base font-bold tracking-wide text-muted-foreground/60 transition-colors hover:text-foreground">
                    {name}
                  </span>
                  <span className="size-1.5 shrink-0 rounded-full bg-border" aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
