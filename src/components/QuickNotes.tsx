import React, { useState } from 'react'
import { Plus, Edit3, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNotesStore } from '@/store/useNotesStore'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface Note {
  id: string
  content: string
  createdAt: number
  timestamp: number
}

const QuickNotes: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotesStore()
  const [newNoteContent, setNewNoteContent] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')

  const handleAdd = () => {
    const text = newNoteContent.trim()
    if (!text) return
    addNote({
  id: crypto.randomUUID(),
  content: text,
  createdAt: new Date().toISOString(),
  timestamp: Date.now()
});

    setNewNoteContent('')
    setIsAdding(false)
  }

  const handleSaveEdit = (id: string) => {
    const text = editingContent.trim()
    if (!text) return
  updateNote({
  id,
  content: text,
  createdAt: new Date().toISOString(),
  timestamp: Date.now()
});

    setEditingId(null)
  }

  const truncate = (s: string, len: number = 100) =>
    s.length > len ? s.slice(0, len) + '…' : s

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Quick Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {isAdding ? (
          <div className="space-y-2">
            <textarea
              className="w-full border p-2 rounded"
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsAdding(false)} variant="ghost">
                Cancel
              </Button>
              <Button onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-1" /> New Note
          </Button>
        )}

        <div className="mt-4 space-y-3">
          {notes.length === 0 && (
            <p className="text-sm text-gray-500">No notes yet.</p>
          )}

          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 border rounded hover:bg-gray-50 transition"
            >
              {editingId === note.id ? (
                <>
                  <textarea
                    className="w-full border p-2 rounded"
                    rows={2}
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button onClick={() => setEditingId(null)} variant="ghost">
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveEdit(note.id)}>
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <p className="flex-1 text-sm leading-snug">
                      {truncate(note.content, 120)}
                    </p>
                    <div className="flex space-x-2 ml-3">
                      <button
                        onClick={() => {
                          setEditingId(note.id)
                          setEditingContent(note.content)
                        }}
                      >
                        <Edit3 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button onClick={() => deleteNote(note.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString('en-US')}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {notes.length > 0 && (
          <div className="mt-4 text-center">
            <Link to="/notes">
              <Button variant="ghost">
                View all {notes.length} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QuickNotes

