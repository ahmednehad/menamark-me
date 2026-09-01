'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarCheck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Counter } from './counter'
import { WebGLRibbon } from './webgl-ribbon'

// const stats = [
//   { value: 15, suffix: '+', label: 'MENA markets covered' },
//   { value: 200, suffix: '+', label: 'Regulatory approvals' },
//   { value: 50, suffix: '+', label: 'Partner companies' },
// ]

const categories = ['GCC', 'MENA', 'Medical Devices', 'Life Sciences']

export function Hero() {
  const shouldReduce = useReducedMotion()
  const ease = [0.22, 1, 0.36, 1] as const
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.12, delayChildren: 0.05 } },
  }
  const item = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  return (
    <section id="top" className="relative isolate overflow-hidden pt-16 lg:pt-20">
      <WebGLRibbon />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[700px] w-[600px] translate-x-1/3 rounded-full bg-primary/5 blur-[130px]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[400px] w-[500px] rounded-full bg-brand/4 blur-[110px]" aria-hidden />

      <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Category eyebrow */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-14 lg:pt-20">
          {categories.map((cat, i) => (
            <span key={cat} className="flex items-center gap-5">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{cat}</span>
              {i < categories.length - 1 && <span className="h-3 w-px bg-border" aria-hidden />}
            </span>
          ))}
          <span className="ml-auto hidden items-center gap-1.5 lg:flex">
            <MapPin className="size-3 text-primary" />
            <span className="font-heading text-[11px] text-muted-foreground">Dubai Science Park · Est. 2016</span>
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1 variants={item} className="mt-6 text-hero font-extrabold text-foreground lg:mt-8">
          Your Exclusive <span className="text-gradient">Regional</span>
          <br className="hidden sm:block" /> Commercial Extension.
        </motion.h1>

        {/* Content row */}
        <motion.div variants={item} className="mt-10 grid gap-10 border-t border-border pt-10 lg:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pt-12">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              MENAMark Middle East FZ-LLC is the dedicated Exclusive Regional Commercial Representative for international medical device and life sciences manufacturers seeking to build or scale a commercial presence across GCC and MENA.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground lg:hidden">
              <MapPin className="size-3 shrink-0 text-primary" />
              Dubai Science Park, Dubai, UAE · Est. 2016
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-3">
              <Button render={<a href="#contact" />} nativeButton={false} size="lg" className="rounded-full px-8">
                <CalendarCheck className="size-4" />
                Start a Conversation
              </Button>
              <Button render={<a href="#services" />} nativeButton={false} size="lg" variant="outline" className="rounded-full px-8">
                Explore Services <ArrowRight className="size-4" />
              </Button>
            </div>
            {/* <dl className="grid grid-cols-3 divide-x divide-border">
              {stats.map((stat) => (
                <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                  <dd className="font-heading text-2xl font-extrabold tabular-nums text-foreground sm:text-3xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">{stat.label}</dt>
                </div>
              ))}
            </dl> */}
          </div>
        </motion.div>

        {/* Hero image — full width */}
        {/* <motion.div variants={item} className="mt-10 lg:mt-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-primary/8">
            <Image
              src="/images/hero-mena.jpg"
              alt="Modern Middle East skyline merging with a healthcare research environment"
              width={1400}
              height={700}
              priority
              className="h-[260px] w-full object-cover sm:h-[380px] lg:h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" aria-hidden />

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-border/60 bg-background/92 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6"
            >
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
              <span className="font-heading text-sm font-bold text-foreground">Compliance-first</span>
              <span className="h-3.5 w-px bg-border/60" />
              <span className="text-xs text-muted-foreground">Pharmacovigilance &amp; data disclosure</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-xl border border-border/60 bg-background/92 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:bottom-6 sm:right-6 lg:flex"
            >
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
              <span className="text-xs font-medium text-foreground">Active across 15+ MENA markets</span>
            </motion.div>
          </div>
        </motion.div> */}

        <div className="h-14 lg:h-20" />
      </motion.div>
    </section>
  )
}
