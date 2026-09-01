import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Trust } from '@/components/site/trust'
import { Services } from '@/components/site/services'
import { WhyMenamark } from '@/components/site/why-menamark'
import { HowWeOperate } from '@/components/site/how-we-operate'
import { About } from '@/components/site/about'
import { CTA } from '@/components/site/cta'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — no card wrapper; it IS the base layer */}
        <Hero />

        {/* Each subsequent section "slides over" the previous with .section-card */}
        <div className="section-card" style={{ zIndex: 1 }}>
          <Trust />
        </div>

        <div className="section-card" style={{ zIndex: 2 }}>
          <About />
        </div>

        <div className="section-card" style={{ zIndex: 3 }}>
          <Services />
        </div>

        <div className="section-card" style={{ zIndex: 4 }}>
          <WhyMenamark />
        </div>

        <div className="section-card" style={{ zIndex: 5 }}>
          <HowWeOperate />
        </div>

        <div className="section-card" style={{ zIndex: 6 }}>
          <CTA />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
