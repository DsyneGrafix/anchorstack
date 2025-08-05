import Layout from '../layouts/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-anchor-800 mb-6">
          🙏 About AnchorStack
        </h1>
        <p className="text-lg text-anchor-600 mb-8">
          AnchorStack is more than a platform — it's a movement for Kingdom-minded creators, dreamers, and doers who want to reclaim their time, attention, and purpose.
        </p>
        <p className="text-base text-anchor-500 mb-6">
          Everything here was built to help you show up with clarity. Whether you’re launching your first digital product, resetting your habits, or just trying to hear from God again in the noise — you’ll find your tools here.
        </p>
        <p className="text-base text-anchor-500">
          We’re just getting started. New kits, challenges, and tools drop monthly. Join the movement — and build something that actually matters.
        </p>
      </div>
    </Layout>
  )
}
