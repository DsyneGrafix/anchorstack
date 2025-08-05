import React from 'react'
import FocusTimer from '@/components/FocusTimer'

export default function FocusPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-6 text-anchor-900">🎯 Focus Timer</h1>
      <p className="mb-8 text-sm text-gray-500">
        Stay anchored in your sacred work. This simple Pomodoro-style timer helps you reclaim your attention with spiritual focus.
      </p>
      <FocusTimer />
    </div>
  )
}

