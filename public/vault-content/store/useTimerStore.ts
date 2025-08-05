import { create } from 'zustand';
import { TimerSession } from '@/types';

interface TimerState {
  sessions: TimerSession[];
  addSession: (session: TimerSession) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  sessions: [],
  addSession: (session) => set((state) => ({
    sessions: [...state.sessions, session]
  }))
}));

