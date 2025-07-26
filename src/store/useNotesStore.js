import { create } from 'zustand';
export const useNotesStore = create((set) => ({
    notes: [],
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),
}));
