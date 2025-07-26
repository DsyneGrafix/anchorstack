export default function HeroSection() {
  return (
    <section className="bg-anchor-600 text-white py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Clarity. Focus. Momentum.
          </h1>
          <p className="text-lg md:text-xl text-anchor-100 mb-8">
            The productivity platform built for Kingdom-minded creators.
            Earn Faith Tokens, access exclusive resources, and unlock your calling—one focused session at a time.
          </p>
          <a
            href="/vault"
            className="inline-block bg-accent-400 hover:bg-accent-500 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            🎁 Browse the Vault
          </a>
        </div>
        <div className="relative">
          <img
            src="/assets/hero-tokens.png"
            alt="Faith Tokens"
            className="w-full max-w-md mx-auto drop-shadow-xl animate-fade-in"
          />
        </div>
      </div>
    </section>
  )
}
