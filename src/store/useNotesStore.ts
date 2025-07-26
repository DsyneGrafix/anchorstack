import { create } from "zustand"

import type { Note } from "@/types"


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
