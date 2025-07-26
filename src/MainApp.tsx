import React, { useEffect, useState } from 'react'
import FocusTimer from "@/components/FocusTimer"
import QuickNotes from "@/components/QuickNotes"


const quotes = [
  "Clarity comes when you stop forcing the answer.",
  "Stillness is not weakness. It’s wisdom.",
  "Real progress is focused, not frantic.",
  "One quiet hour is worth ten distracted ones.",
  "Your mind is a garden. Water the still spaces."
]

const Dashboard: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 sm:p-10 text-gray-900 dark:text-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">🎯 AnchorStack Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 italic">
          {quotes[quoteIndex]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <FocusTimer />
        <QuickNotes />
      </div>
    </div>
  )
}

export default Dashboard

