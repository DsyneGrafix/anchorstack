// src/components/FocusTimer.tsx
import React, { useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react'
import { useTimerStore } from '@/store/useTimerStore'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const FocusTimer: React.FC = () => {
  const {
    timeLeft,
    isActive,
    currentSession,
    sessionsCompleted,
    isBreak,
    startTimer,
    pauseTimer,
    resetTimer,
    tick
  } = useTimerStore()

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    } else if (timeLeft === 0) {
      // Auto-switch between work/break when timer hits 0
      resetTimer()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, tick, resetTimer])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getSessionType = () => {
    if (isBreak) {
      return sessionsCompleted % 4 === 0 && sessionsCompleted > 0 ? 'Long Break' : 'Short Break'
    }
    return 'Focus Session'
  }

  const getProgress = () => {
    const totalTime = isBreak 
      ? (sessionsCompleted % 4 === 0 && sessionsCompleted > 0 ? 15 * 60 : 5 * 60)
      : 25 * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return (
    <Card className="bg-white border-2 border-primary-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          {isBreak ? (
            <Coffee className="w-5 h-5 text-green-500" />
          ) : (
            <Target className="w-5 h-5 text-primary-500" />
          )}
          <span className={isBreak ? 'text-green-600' : 'text-primary-600'}>
            {getSessionType()}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="relative inline-block">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isBreak ? "#10b981" : "#3b82f6"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            
            {/* Time display overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-anchor-900 font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-anchor-600 mt-1">
                Session {currentSession}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={isActive ? pauseTimer : startTimer}
            className={`px-6 py-2 ${
              isActive 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : isBreak 
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            className="px-6 py-2"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Session Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-anchor-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {sessionsCompleted}
            </div>
            <div className="text-sm text-anchor-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.floor(sessionsCompleted / 4)}
            </div>
            <div className="text-sm text-anchor-600">Cycles Done</div>
          </div>
        </div>

        {/* Next up indicator */}
        <div className="text-center p-3 bg-anchor-50 rounded-md">
          <p className="text-sm text-anchor-600">
            Up next: {
              isBreak 
                ? 'Focus Session' 
                : sessionsCompleted > 0 && (sessionsCompleted + 1) % 4 === 0
                  ? 'Long Break (15 min)'
                  : 'Short Break (5 min)'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}