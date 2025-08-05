import React from 'react'

const notes = [
  {
    id: 1,
    title: 'Stay anchored',
    content: 'Remember your calling before chasing the noise.',
  },
  {
    id: 2,
    title: 'Create with purpose',
    content: 'Every draft has divine potential. Edit with faith.',
  },
  {
    id: 3,
    title: 'Let go to grow',
    content: 'What you release makes room for what matters most.',
  },
]

const QuickNotes: React.FC = () => {
  if (!notes || notes.length === 0) {
    console.warn('⚠️ No quick notes found.')
    return (
      <div className="p-4 rounded-xl border bg-yellow-100 text-yellow-900">
        No notes available at the moment. Please check back soon.
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-xl p-4 shadow bg-white dark:bg-gray-800"
        >
          <h3 className="font-bold text-lg">{note.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{note.content}</p>
        </div>
      ))}
    </div>
  )
}

export default QuickNotes

