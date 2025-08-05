import React, { useEffect, useState } from 'react'

interface Freebie {
  title: string
  description: string
  file: string
  icon?: string
}

export default function VaultFreebiesHome() {
  const [freebies, setFreebies] = useState<Freebie[]>([])

  useEffect(() => {
    fetch('/data/sidebar-feed.json')
      .then((res) => res.json())
      .then((data) => setFreebies(data))
      .catch((err) => console.error('Failed to load sidebar feed', err))
  }, [])

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">📚 Quick Reads from the Vault</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freebies.map((item) => (
          <a
            key={item.title}
            href={`/vault-content/articles_converted/${item.file}`}
            className="block p-4 bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-xl shadow hover:shadow-md transition border border-purple-200"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{item.icon || '📝'}</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700 leading-snug">{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}