import type { Note } from "@/types"

import React, { useState } from "react"
import { nanoid } from "nanoid"
import { useNotesStore } from "@/store/useNotesStore"

const QuickNotes: React.FC = () => {
  const { notes, addNote, deleteNote } = useNotesStore()
  const [noteText, setNoteText] = useState("")

  const handleAdd = () => {
    if (noteText.trim() === "") return

addNote({
  id,
  content,
  createdAt: new Date().toISOString(), // string as expected
  timestamp: Date.now(), // number as expected
})


    })

    setNoteText("")
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-anchor-800">📝 Quick Notes</h2>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Type your note here..."
        className="w-full border rounded-md p-2 mb-2"
        rows={3}
      />

      <button
        onClick={handleAdd}
        className="bg-anchor-600 hover:bg-anchor-700 text-white px-4 py-2 rounded-md"
      >
        Add Note
      </button>

      <ul className="mt-4 space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="bg-neutral-100 rounded-md p-3 relative">
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              ✕
            </button>
            <p className="text-sm">{note.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {note.timestamp ? new Date(note.timestamp).toLocaleString() : "No timestamp"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuickNotes
