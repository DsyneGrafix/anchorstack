import VaultTile from "@/components/VaultTile"
import Layout from "@/components/Layout"
import type { VaultProduct } from "@/types"



export default function VaultPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-anchor-800">
          🧰 The AnchorStack Vault
        </h1>
        <p className="text-lg text-center text-anchor-500 mb-12 max-w-2xl mx-auto">
          Your full library of digital clarity tools, planners, and creator kits. All tools below are instantly downloadable.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <VaultTile
            title="Clarity Master Bundle"
            description="$99 – Full library of digital kits, planners & PDFs."
            image="/assets/products/clarity-master.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/gxpksf"
          />
          <VaultTile
            title="Calm Clarity Kit – 7-Day Edition"
            description="$15 – A complete reset for your thoughts, energy, and clarity."
            image="/assets/products/calm-kit.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/nupwf"
          />
          <VaultTile
            title="Momentum Mapping Toolkit"
            description="$19 – Plan your weekly focus with printable maps."
            image="/assets/products/momentum-mapping.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/npruu"
          />
          <VaultTile
            title="Work-Life Integration Mastery"
            description="$9 – Align your life and energy with biblical clarity."
            image="/assets/products/work-life.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/lapqw"
          />
          <VaultTile
            title="AnchorStack Creator Vault Access"
            description="$15 – Instant access to foundational creator tools."
            image="/assets/products/creator-vault.jpg"
            ctaLink="https://grafixartistry6.gumroad.com/l/uebseh"
          />
        </div>
      </div>

  )

    </Layout>
  )
}



