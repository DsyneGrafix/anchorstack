import React, { useState, useEffect } from 'react';

const FocusTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 min
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(1500);
  };

  const formatTime = (sec: number): string =>
    `${Math.floor(sec / 60)
      .toString()
      .padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow w-full max-w-md mx-auto mt-4">
      <h2 className="text-lg font-bold mb-2">⏱️ Focus Timer</h2>
      <div className="text-4xl font-mono text-center mb-4">{formatTime(secondsLeft)}</div>
      <div className="flex justify-center gap-4">
        <button onClick={toggleTimer} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="bg-gray-400 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;

