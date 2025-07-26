import React, { useState } from 'react';

interface Note {
  id: string;
  content: string;
}

const QuickNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');

  const addNote = () => {
    if (!noteText.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteText.trim(),
    };
    setNotes((prev) => [...prev, newNote]);
    setNoteText('');
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow w-full max-w-md mx-auto mt-4">
      <h2 className="text-lg font-bold mb-2">📝 Quick Notes</h2>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Write a quick note..."
      />
      <button onClick={addNote} className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4">
        Add Note
      </button>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded"
          >
            <span>{note.content}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickNotes;
