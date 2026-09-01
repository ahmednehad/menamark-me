'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Globe2, CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Reveal } from './reveal'

const contactInfo = [
  //{ icon: Phone, label: 'Phone', value: '[ Phone number — placeholder ]' },
  { icon: Mail, label: 'Email', value: 'info@menamark-me.com' },
  { icon: MapPin, label: 'Office', value: 'Dubai Science Park | Dubai, UAE' },
]

const regions = [
  'UAE',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Oman',
  'Bahrain',
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="border-t border-border bg-secondary/40 py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            Contact Us
          </p>
          <h2 className="mt-3 text-display font-extrabold text-foreground">
            Global Manufacturers. Exclusive Regional Rights.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            MENAMark holds Exclusive Regional Representation Agreements with clinically validated,
            internationally certified medical device manufacturers. Our current 2026 portfolio
            represents high-growth segments with strong alignment to GCC healthcare priorities.
          </p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Let&apos;s Discuss Your GCC &amp; MENA Strategy. Whether you are planning market entry
            or strengthening an existing regional presence, our leadership team is available for a
            direct strategic conversation.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              {submitted ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">
                    Thank you
                  </h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Your message has been received. A member of our team will be in
                    touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" name="name" required placeholder="Your name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+971 ..." />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your product and target markets..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="rounded-full">
                    Get in Touch <Send className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Contact details
                </h3>
                <ul className="mt-5 space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                        <item.icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-medium text-foreground">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Globe2 className="size-5 text-primary" />
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Regional presence
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Active commercial and regulatory networks across the GCC and broader MENA region.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <span
                      key={region}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                    >
                      <MapPin className="size-3.5 text-primary" />
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
