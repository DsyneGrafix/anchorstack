import React, { useState } from 'react';
import { useNotesStore } from '../store/useNotesStore';
import { nanoid } from 'nanoid';

const QuickNotes: React.FC = () => {
  const { notes, addNote, deleteNote } = useNotesStore()
  const [noteText, setNoteText] = useState('')

  const handleAdd = () => {
    if (noteText.trim()) {
      addNote({ id: nanoid(), content: noteText.trim() });
      setNoteText('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mt-6">
      <h3 className="text-lg font-bold mb-2">📝 Quick Notes</h3>
      <textarea
        className="w-full p-2 rounded border dark:border-gray-700 mb-2"
        rows={3}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a quick note..."
      />
      <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Add Note
      </button>
      <ul className="mt-4 space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <span>{note.content}</span>
            <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-700">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickNotes;

