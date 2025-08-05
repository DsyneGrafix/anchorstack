import { create } from 'zustand';
import { Note } from '@/types';

interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (note) => set((state) => ({
    notes: state.notes.map((n) => (n.id === note.id ? note : n))
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter((n) => n.id !== id)
  }))
}));

