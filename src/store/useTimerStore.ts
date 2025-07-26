
import { create } from 'zustand';

interface TimerState {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  time: 1500,
  isRunning: false,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),
  reset: () => set({ time: 1500, isRunning: false }),
}));
