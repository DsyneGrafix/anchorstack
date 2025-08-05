import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Edit3, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotesStore } from '@/store/useNotesStore';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
const QuickNotes = () => {
    const { notes, addNote, updateNote, deleteNote } = useNotesStore();
    const [newNoteContent, setNewNoteContent] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const handleAdd = () => {
        const text = newNoteContent.trim();
        if (!text)
            return;
        addNote({
            id: crypto.randomUUID(),
            content: text,
            createdAt: new Date().toISOString(),
            timestamp: Date.now(),
        });
        setNewNoteContent('');
        setIsAdding(false);
    };
    const handleSaveEdit = (id) => {
        const text = editingContent.trim();
        if (!text)
            return;
        updateNote({
            id,
            content: text,
            createdAt: new Date().toISOString(),
            timestamp: Date.now(),
        });
        setEditingId(null);
    };
    const truncate = (s, len = 100) => s.length > len ? s.slice(0, len) + '…' : s;
    return (_jsxs(Card, { className: "max-w-md mx-auto", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Notes" }) }), _jsxs(CardContent, { children: [isAdding ? (_jsxs("div", { className: "space-y-2", children: [_jsx("textarea", { className: "w-full border p-2 rounded", rows: 3, value: newNoteContent, onChange: (e) => setNewNoteContent(e.target.value) }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx(Button, { onClick: () => setIsAdding(false), variant: "ghost", children: "Cancel" }), _jsxs(Button, { onClick: handleAdd, children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), " Add"] })] })] })) : (_jsxs(Button, { onClick: () => setIsAdding(true), children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), " New Note"] })), _jsxs("div", { className: "mt-4 space-y-3", children: [notes.length === 0 && (_jsx("p", { className: "text-sm text-gray-500", children: "No notes yet." })), notes.map((note) => (_jsx("div", { className: "p-3 border rounded hover:bg-gray-50 transition", children: editingId === note.id ? (_jsxs(_Fragment, { children: [_jsx("textarea", { className: "w-full border p-2 rounded", rows: 2, value: editingContent, onChange: (e) => setEditingContent(e.target.value) }), _jsxs("div", { className: "flex justify-end space-x-2 mt-2", children: [_jsx(Button, { onClick: () => setEditingId(null), variant: "ghost", children: "Cancel" }), _jsx(Button, { onClick: () => handleSaveEdit(note.id), children: "Save" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("p", { className: "flex-1 text-sm leading-snug", children: truncate(note.content, 120) }), _jsxs("div", { className: "flex space-x-2 ml-3", children: [_jsx("button", { onClick: () => {
                                                                setEditingId(note.id);
                                                                setEditingContent(note.content);
                                                            }, children: _jsx(Edit3, { className: "w-4 h-4 text-gray-500" }) }), _jsx("button", { onClick: () => deleteNote(note.id), children: _jsx(Trash2, { className: "w-4 h-4 text-red-500" }) })] })] }), _jsx("div", { className: "mt-1 text-xs text-gray-400", children: new Date(note.createdAt).toLocaleDateString('en-US') })] })) }, note.id)))] }), notes.length > 0 && (_jsx("div", { className: "mt-4 text-center", children: _jsx(Link, { to: "/notes", children: _jsxs(Button, { variant: "ghost", children: ["View all ", notes.length, " ", _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] }) }) }))] })] }));
};
export default QuickNotes;
