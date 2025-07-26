import { create } from "zustand"

export type Note = {
  id: string
  content: string
  updatedAt?: string
}

export type NotesState = {
  notes: Note[]
  addNote: (note: Note) => void
  deleteNote: (id: string) => void
  updateNote: (note: Note) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  updateNote: (updated) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updated.id ? { ...note, ...updated } : note
      ),
    })),
}))