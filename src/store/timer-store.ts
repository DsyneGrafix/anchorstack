// src/store/useTimerStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerState {
  timeLeft: number
  isActive: boolean
  currentSession: number
  sessionsCompleted: number
  isBreak: boolean
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tick: () => void
}

const FOCUS_TIME = 25 * 60 // 25 minutes
const SHORT_BREAK = 5 * 60 // 5 minutes  
const LONG_BREAK = 15 * 60 // 15 minutes

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timeLeft: FOCUS_TIME,
      isActive: false,
      currentSession: 1,
      sessionsCompleted: 0,
      isBreak: false,

      startTimer: () => {
        set({ isActive: true })
        
        // Play notification sound (optional)
        if ('Notification' in window && Notification.permission === 'granted') {
          // Request permission first time
        } else if ('Notification' in window && Notification.permission !== 'denied') {
          Notification.requestPermission()
        }
      },

      pauseTimer: () => {
        set({ isActive: false })
      },

      resetTimer: () => {
        const { isBreak, sessionsCompleted } = get()
        
        if (isBreak) {
          // Break finished, start new focus session
          set({
            timeLeft: FOCUS_TIME,
            isActive: false,
            isBreak: false,
            currentSession: sessionsCompleted + 1
          })
        } else {
          // Focus session finished, start break
          const newSessionsCompleted = sessionsCompleted + 1
          const isLongBreak = newSessionsCompleted % 4 === 0
          
          set({
            timeLeft: isLongBreak ? LONG_BREAK : SHORT_BREAK,
            isActive: false,
            isBreak: true,
            sessionsCompleted: newSessionsCompleted
          })
          
          // Show completion notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🎯 Focus Session Complete!', {
              body: `Great work! Time for a ${isLongBreak ? 'long' : 'short'} break.`,
              icon: '/favicon.ico'
            })
          }
        }
      },

      tick: () => {
        const { timeLeft } = get()
        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 })
        } else {
          // Timer finished, auto-reset
          get().resetTimer()
        }
      }
    }),
    {
      name: 'anchorstack-timer',
      // Only persist non-active state
      partialize: (state) => ({
        sessionsCompleted: state.sessionsCompleted,
        currentSession: state.currentSession,
        isBreak: state.isBreak,
        timeLeft: state.timeLeft
      })
    }
  )
)