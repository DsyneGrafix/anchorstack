// src/types/index.ts
export interface VaultProduct {
  id: string
  title: string
  description: string
  tier: 'free' | 'premium' | 'exclusive'
  url: string
  category: string
  image?: string
  price?: number
}



export interface TimerSession {
  id: string
  startTime: number
  endTime: number
  duration: number
  type: 'focus' | 'short-break' | 'long-break'
  completed: boolean
}

export interface User {
  id: string
  email: string
  name: string
  preferences: {
    focusTime: number
    shortBreak: number
    longBreak: number
    notifications: boolean
  }
}
export type Note = {
  id: string
  content: string
  createdAt: string
  timestamp: number
}

