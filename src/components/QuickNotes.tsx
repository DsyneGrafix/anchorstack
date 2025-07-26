import { useState } from 'react'

const QuickNotes: React.FC = () => {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])

  const addNote = () => {
    if (!note.trim()) return
    setNotes([note, ...notes])
    setNote('')
  }

  const deleteNote = (i: number) => {
    setNotes(notes.filter((_, idx) => idx !== i))
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">📝 Quick Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a quick note..."
        className="w-full p-3 rounded border border-gray-300 mb-4"
      />
      <button
        onClick={addNote}
        className="bg-anchor-600 hover:bg-anchor-700 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>

      <ul className="mt-6 space-y-2">
        {notes.map((n, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-neutral-100 px-4 py-2 rounded"
          >
            <span>{n}</span>
            <button
              onClick={() => deleteNote(i)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuickNotes

