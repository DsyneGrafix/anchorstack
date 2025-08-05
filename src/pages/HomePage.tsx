import React from 'react'
import { Link } from 'react-router-dom'
import VaultFreebies from '@/components/VaultFreebies'
<Route path="/" element={<HomePage />} />

const featured = [
  {
    title: 'Turning Your Gifts into Ministry',
    summary: 'Learn how to align your creative skills with God’s mission.',
    link: '/vault-content/turning_gifts_into_ministry_article.html',
  },
  {
    title: 'Unleashing Your Inner Creative',
    summary: 'Creativity isn't just for a select few. It’s a habit—and this guide will help you form it.',
    link: '/vault-content/creative_habits_article.html',
  },
  {
    title: 'Rest as a Spiritual Discipline',
    summary: 'Discover how stillness can recharge your purpose.',
    link: '/vault-content/rest_faith_creators_article.html',
  },
]

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to AnchorStack</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your anchor in the storm — clarity, momentum, creation without the noise.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">🌟 Featured Reads</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">🆓 Free Vault Goodies</h2>
        <VaultFreebies />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">🥉 Bronze Quick Wins</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="/vault-content/focus_reboot_checklist.pdf"
            className="block bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <h4 className="text-lg font-bold mb-1">🧭 Focus Reboot Checklist</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Reset your clarity with this 5-minute guide.</p>
          </a>

          <a
            href="/vault-content/creative_jumpstart_template.pdf"
            className="block bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <h4 className="text-lg font-bold mb-1">🎨 Creative Jumpstart Template</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Unblock your creative flow with this fast-start tool.</p>
          </a>
        </div>
      </section>

      <section className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
        <p>© {new Date().getFullYear()} AnchorStack. Built with clarity, faith, and a touch of rebellion.</p>
      </section>
    </main>
  )
}

export default HomePage

