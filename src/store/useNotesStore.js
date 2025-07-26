import { create } from "zustand";
export const useNotesStore = create((set) => ({
    notes: [],
    addNote: (note) => set((state) => ({
        notes: [...state.notes, note],
    })),
    deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
    })),
    updateNote: (updated) => set((state) => ({
        notes: state.notes.map((note) => note.id === updated.id ? { ...note, ...updated } : note),
    })),
}));
