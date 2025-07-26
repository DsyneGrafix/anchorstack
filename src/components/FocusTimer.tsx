import { useState, useEffect } from 'react'

const FocusTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const toggleTimer = () => setIsRunning(!isRunning)
  const resetTimer = () => {
    setSeconds(25 * 60)
    setIsRunning(false)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow text-center">
      <h2 className="text-xl font-semibold mb-4">⏱️ Focus Timer</h2>
      <p className="text-4xl font-mono mb-6">{formatTime(seconds)}</p>
      <button
        onClick={toggleTimer}
        className="bg-anchor-600 hover:bg-anchor-700 text-white px-4 py-2 rounded mr-2"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={resetTimer}
        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  )
}

export default FocusTimer

