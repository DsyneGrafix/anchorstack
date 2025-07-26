import { create } from 'zustand';
export const useTimerStore = create((set) => ({
    time: 1500,
    isRunning: false,
    start: () => set({ isRunning: true }),
    stop: () => set({ isRunning: false }),
    reset: () => set({ time: 1500, isRunning: false }),
}));
