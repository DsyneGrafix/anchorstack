import { VaultTile } from "@/components/VaultTile"

import HeroSection from "@/components/HeroSection"





export default function HomePage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <HeroSection />

      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-anchor-800">
          Featured Vault Tools
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <VaultTile
            title="Calm Clarity Kit"
            description="7-day toolkit to restore focus and reset your mind."
            image="/assets/products/calm-kit.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/nupwf"
          />
          <VaultTile
            title="Momentum Mapping Toolkit"
            description="Plan your week with purpose using our printable focus maps."
            image="/assets/products/momentum-mapping.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/npruu"
          />
          <VaultTile
            title="Work-Life Integration Mastery"
            description="Reclaim your time, energy, and attention with biblical clarity."
            image="/assets/products/work-life.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/lapqw"
          />
        </div>
      </section>

      <section className="py-20 bg-anchor-50 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-anchor-700 mb-4">
          More than productivity.
        </h3>
        <p className="text-lg text-anchor-500 max-w-3xl mx-auto mb-6">
          AnchorStack isn’t just another app. It’s a system for Spirit-led action.
          Everything you see here is built to help you stay grounded, focused,
          and faithful to your creative calling.
        </p>
        <a
          href="/about"
          className="inline-block bg-warning-500 hover:bg-warning-600 text-white px-6 py-3 rounded-md font-medium transition"
        >
          Learn More About AnchorStack
        </a>
      </section>
    </main>
  )
}
