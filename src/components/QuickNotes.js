import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNotesStore } from '../store/useNotesStore';
import { nanoid } from 'nanoid';
const QuickNotes = () => {
    const { notes, addNote, deleteNote } = useNotesStore();
    const [noteText, setNoteText] = useState('');
    const handleAdd = () => {
        if (noteText.trim()) {
            addNote({ id: nanoid(), content: noteText.trim() });
            setNoteText('');
        }
    };
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-xl shadow mt-6", children: [_jsx("h3", { className: "text-lg font-bold mb-2", children: "\uD83D\uDCDD Quick Notes" }), _jsx("textarea", { className: "w-full p-2 rounded border dark:border-gray-700 mb-2", rows: 3, value: noteText, onChange: (e) => setNoteText(e.target.value), placeholder: "Write a quick note..." }), _jsx("button", { onClick: handleAdd, className: "bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700", children: "Add Note" }), _jsx("ul", { className: "mt-4 space-y-2", children: notes.map((note) => (_jsxs("li", { className: "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded", children: [_jsx("span", { children: note.content }), _jsx("button", { onClick: () => deleteNote(note.id), className: "text-red-500 hover:text-red-700", children: "\u2715" })] }, note.id))) })] }));
};
export default QuickNotes;
