// src/store/useNotesStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Note {
  id: string
  content: string
  createdAt: number
  updatedAt: number
}

export interface NotesState {
  notes: Note[]
  addNote: (content?: string) => void
  updateNote: (id: string, content: string) => void
  deleteNote: (id: string) => void
  searchNotes: (query: string) => Note[]
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (content = '') => {
        const newNote: Note = {
          id: generateId(),
          content,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        
        set((state) => ({
          notes: [newNote, ...state.notes]
        }))
      },

      updateNote: (id: string, content: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, content, updatedAt: Date.now() }
              : note
          )
        }))
      },

      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id)
        }))
      },

      searchNotes: (query: string): Note[] => {
        const { notes } = get()
        if (!query.trim()) return notes
        
        const lowercaseQuery = query.toLowerCase()
        return notes.filter((note) =>
          note.content.toLowerCase().includes(lowercaseQuery)
        )
      }
    }),
    {
      name: 'anchorstack-notes',
      version: 1
    }
  )
)
