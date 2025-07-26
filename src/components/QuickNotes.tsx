// src/components/QuickNotes.tsx
import React, { useState } from 'react'
import { Plus, Edit3, Trash2, ArrowRight } from 'lucide-react'
import { useNotesStore } from '@/store/useNotesStore'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Link } from 'react-router-dom'

export const QuickNotes: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotesStore()
  const [newNoteContent, setNewNoteContent] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const recentNotes = notes.slice(0, 3)

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      addNote(newNoteContent.trim())
      setNewNoteContent('')
      setIsAdding(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddNote()
    } else if (e.key === 'Escape') {
      setIsAdding(false)
      setNewNoteContent('')
    }
  }

  const truncateText = (text: string, maxLength: number = 80) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <Card className="bg-white border-2 border-anchor-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-anchor-600" />
            <span>Quick Notes</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsAdding(true)}
              size="sm"
              variant="ghost"
              className="text-primary-600 hover:text-primary-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Link to="/notes">
              <Button
                size="sm"
                variant="ghost"
                className="text-anchor-600 hover:text-anchor-700"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isAdding && (
          <div className="space-y-2">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Capture a quick thought... (Ctrl+Enter to save, Esc to cancel)"
              className="w-full p-3 text-sm border border-anchor-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  setIsAdding(false)
                  setNewNoteContent('')
                }}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNote}
                size="sm"
                disabled={!newNoteContent.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        )}

        {recentNotes.length === 0 ? (
          <div className="text-center py-8">
            <Edit3 className="w-12 h-12 text-anchor-300 mx-auto mb-3" />
            <p className="text-anchor-500 text-sm mb-3">
              No notes yet. Capture your first thought!
            </p>
            <Button
              onClick={() => setIsAdding(true)}
              size="sm"
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <div
                key={note.id}
                className="group p-3 bg-anchor-50 rounded-md border border-anchor-100 hover:border-primary-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-anchor-700 flex-1 leading-relaxed">
                    {truncateText(note.content || 'Empty note')}
                  </p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-red-400 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="mt-2 text-xs text-anchor-500">
                  {new Date(note.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
            
            {notes.length > 3 && (
              <Link to="/notes">
                <div className="text-center py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View all {notes.length} notes
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QuickNotes;

