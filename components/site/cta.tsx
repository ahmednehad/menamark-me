import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from './reveal'

export function CTA() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-center sm:px-14 lg:py-24">
          {/* Decorative blobs */}
          <div
            className="absolute -left-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -right-16 size-96 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden
          />
          <div className="relative">
            <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary-foreground/60">
              Ready to expand?
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-display font-extrabold text-primary-foreground">
              Expand into the GCC Region with Confidence
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Partner with a team that knows the markets, the regulators, and the
              path to sustainable growth across the GCC region.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                size="lg"
                variant="secondary"
                className="rounded-full px-8"
              >
                Talk to Our Experts <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
