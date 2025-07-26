import { create } from 'zustand';
export const useTimerStore = create((set, get) => ({
    timeLeft: 1500,
    isActive: false,
    isBreak: false,
    currentSession: 1,
    sessionsCompleted: 0,
    startTimer: () => set({ isActive: true }),
    pauseTimer: () => set({ isActive: false }),
    resetTimer: () => set({
        timeLeft: 1500,
        isActive: false,
        isBreak: false,
        currentSession: 1,
        sessionsCompleted: 0,
    }),
    tick: () => {
        const { timeLeft, isActive } = get();
        if (isActive && timeLeft > 0) {
            set({ timeLeft: timeLeft - 1 });
        }
    },
}));
