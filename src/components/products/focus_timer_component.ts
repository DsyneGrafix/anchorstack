// src/components/FocusTimer.tsx
import React, { useEffect } from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { useTimerStore } from '@/store/useTimerStore'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export const FocusTimer: React.FC = () => {
  const {
    minutes,
    seconds,
    isActive,
    isPaused,
    isBreak,
    workMinutes,
    breakMinutes,
    completedSessions,
    start,
    pause,
    reset,
    tick,
    setWorkMinutes,
    setBreakMinutes
  } = useTimerStore()

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      interval = setInterval(tick, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused, tick])

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const progress = isBreak 
    ? ((breakMinutes * 60 - (minutes * 60 + seconds)) / (breakMinutes * 60)) * 100
    : ((workMinutes * 60 - (minutes * 60 + seconds)) / (workMinutes * 60)) * 100

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <span className={isBreak ? 'text-green-600' : 'text-red-600'}>
            {isBreak ? '☕' : '🎯'}
          </span>
          <span>{isBreak ? 'Break Time' : 'Focus Session'}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className={`text-6xl font-mono font-bold ${
            isBreak ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatTime(minutes, seconds)}
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-48 h-48 mx-auto mt-4">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 144 144">
              {/* Background circle */}
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * progress) / 100}
                className={`transition-all duration-1000 ${
                  isBreak ? 'text-green-500' : 'text-red-500'
                }`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isBreak ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-gray-500">
                  {isBreak ? 'Break' : 'Focus'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-3">
          {!isActive || isPaused ? (
            <Button
              onClick={start}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start
            </Button>
          ) : (
            <Button
              onClick={pause}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              size="lg"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Settings */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Work Duration</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWorkMinutes(Math.max(1, workMinutes - 5))}
                disabled={isActive}
              >
                -5
              </Button>
              <span className="w-12 text-center text-sm font-mono">
                {workMinutes}m
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWorkMinutes(Math.min(60, workMinutes + 5))}
                disabled={isActive}
              >
                +5
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Break Duration</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBreakMinutes(Math.max(1, breakMinutes - 1))}
                disabled={isActive}
              >
                -1
              </Button>
              <span className="w-12 text-center text-sm font-mono">
                {breakMinutes}m
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBreakMinutes(Math.min(30, breakMinutes + 1))}
                disabled={isActive}
              >
                +1
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            Sessions completed today: <span className="font-bold text-primary-600">{completedSessions}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}