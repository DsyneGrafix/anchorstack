// src/components/OpinionPoll.tsx - Embeddable Poll Widget
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle, BarChart3 } from 'lucide-react'

interface PollOption {
  id: string
  text: string
  votes: number
}

interface PollData {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
  hasVoted: boolean
}

// Sample poll data - replace with real API
const samplePoll: PollData = {
  id: 'sacred-strategy-preference',
  question: 'Which Sacred Strategy token resonates most with your current season?',
  options: [
    { id: 'clarity', text: '🧭 Clarity - I need divine direction', votes: 47 },
    { id: 'courage', text: '⚔️ Courage - I need to be brave', votes: 23 },
    { id: 'consistency', text: '🔄 Consistency - I need to show up daily', votes: 35 },
    { id: 'compassion', text: '❤️ Compassion - I need a softer heart', votes: 19 },
    { id: 'calling', text: '🌟 Calling - I need purpose clarity', votes: 31 },
  ],
  totalVotes: 155,
  hasVoted: false
}

export const OpinionPoll: React.FC = () => {
  const [poll, setPoll] = useState<PollData>(samplePoll)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [showResults, setShowResults] = useState(poll.hasVoted)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async () => {
    if (!selectedOption) return
    
    setIsVoting(true)
    
    // Simulate API call to record vote
    setTimeout(() => {
      const updatedOptions = poll.options.map(option => 
        option.id === selectedOption 
          ? { ...option, votes: option.votes + 1 }
          : option
      )
      
      setPoll({
        ...poll,
        options: updatedOptions,
        totalVotes: poll.totalVotes + 1,
        hasVoted: true
      })
      
      setShowResults(true)
      setIsVoting(false)
      
      // Track vote in analytics
      console.log('Poll vote recorded:', {
        pollId: poll.id,
        selectedOption,
        timestamp: new Date().toISOString()
      })
    }, 500)
  }

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0
  }

  const getBarWidth = (votes: number) => {
    const maxVotes = Math.max(...poll.options.map(o => o.votes))
    return maxVotes > 0 ? (votes / maxVotes) * 100 : 0
  }

  if (showResults) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-blue-900">
            <BarChart3 className="w-5 h-5 mr-2" />
            Poll Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4 font-medium">
            {poll.question}
          </p>
          
          <div className="space-y-3">
            {poll.options.map((option) => (
              <div key={option.id} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{option.text}</span>
                  <span className="text-sm font-medium text-gray-600">
                    {getPercentage(option.votes)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      option.id === selectedOption 
                        ? 'bg-blue-600' 
                        : 'bg-blue-400'
                    }`}
                    style={{ width: `${getBarWidth(option.votes)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {option.votes} votes
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center justify-between text-sm text-blue-600">
              <span>Total votes: {poll.totalVotes}</span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Thank you for voting!
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded border border-blue-200">
            <p className="text-xs text-gray-600 mb-2">
              <strong>💡 Based on the results:</strong>
            </p>
            <p className="text-sm text-gray-700">
              Many are seeking <strong>Clarity</strong> in their direction. Consider starting with our 
              Faith Token Tracker to bring divine perspective to your daily decisions.
            </p>
            <Button 
              