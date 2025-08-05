import React from 'react'

const freebies = [
  {
    title: "Doubt to Determination",
    description: "Turn hesitation into bold faith with this short insight.",
    file: "doubt_to_determination_article.html",
  },
  {
    title: "The Optimism Advantage",
    description: "Discover how biblical hope changes everything.",
    file: "optimism_advantage_article.html",
  },
  {
    title: "Dealing with Worry (Bible-Based Guide)",
    description: "Practical steps to overcome worry through faith.",
    file: "dealing_with_worry_ a_bible-based_guide.html",
  },
  {
    title: "Why You Don’t Need a Morning Routine",
    description: "Break free from the pressure to perform early.",
    file: "why-you-dont-need-a-morning-routine.html",
  },
  {
    title: "Job & Patience",
    description: "Lessons on endurance from the story of Job.",
    file: "job_patience_article.html",
  },
  {
    title: "Trusting God's Character",
    description: "What to hold on to when nothing makes sense.",
    file: "how-trusting-gods-character-helps.html",
  },
  {
    title: "Jericho Walls",
    description: "Let faith shout louder than fear. March boldly.",
    file: "jericho_walls_article.html",
  },
]

export default function VaultFreebies() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">📚 Quick Reads from the Vault</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freebies.map((item) => (
          <a
            key={item.title}
            href={`/vault-content/articles_converted/${item.file}`}
            className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

