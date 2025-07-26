import { create } from 'zustand'

export type Note = {
  id: string
  content: string
  updatedAt?: string
}

export type NotesState = {
  notes: Note[]
  addNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, { ...note, updatedAt: new Date().toISOString() }],
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),
}))

