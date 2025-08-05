// src/pages/vault/CreativeConfidenceKit.tsx
import React from 'react'
import { Download, CheckCircle, Star, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const kitContents = [
  {
    icon: '📋',
    title: '7-Day Creative Confidence Challenge',
    description: 'Daily micro-actions to build creative courage. Each day takes 10-15 minutes but builds momentum that lasts.'
  },
  {
    icon: '🧠',
    title: 'Inner Critic Shutdown Scripts',
    description: 'Specific phrases to use when self-doubt strikes. Turn that negative voice into your creative ally.'
  },
  {
    icon: '✨',
    title: 'Creative Voice Discovery Worksheet',
    description: 'Find your unique creative perspective through guided questions and exercises. No artistic skill required.'
  },
  {
    icon: '🎯',
    title: 'Quick Start Practice Sheet',
    description: 'Simple daily practices to maintain creative confidence long after the challenge ends.'
  },
  {
    icon: '💡',
    title: 'Confidence Affirmations + Phone Wallpapers',
    description: 'Beautifully designed affirmations you can use daily to rewire limiting beliefs about creativity.'
  }
]

const challengeDays = [
  { day: 1, title: 'Permission to Begin', desc: 'Give yourself official permission to create imperfectly. Start before you feel ready.' },
  { day: 2, title: 'Idea Capture System', desc: 'Set up a simple system to catch creative sparks before they disappear.' },
  { day: 3, title: 'Creative Courage Exercise', desc: 'Do one small creative thing that scares you. Build evidence that you can handle discomfort.' },
  { day: 4, title: 'Comparison Detox', desc: 'Identify your comparison triggers and create healthy boundaries around inspiration vs. intimidation.' },
  { day: 5, title: 'Voice Discovery', desc: 'Explore what makes your perspective unique through guided reflection and exercises.' },
  { day: 6, title: 'Share Something', desc: 'Put one piece of your creative work into the world. Start small, but start.' },
  { day: 7, title: 'Confidence Celebration', desc: 'Acknowledge your progress and plan how to maintain creative momentum.' }
]

const testimonials = [
  {
    text: "I always thought I wasn't the 'creative type.' This challenge helped me realize I'd been creating solutions and ideas my whole life—I just didn't recognize it as creativity.",
    author: "Jennifer M."
  },
  {
    text: "The inner critic scripts alone were worth it. I actually have tools now instead of just hoping the self-doubt goes away.",
    author: "Marcus K."
  },
  {
    text: "Day 3 was terrifying and amazing. I posted my first creative piece online and got such encouraging responses. This kit gave me the push I needed.",
    author: "Sarah L."
  }
]

export const CreativeConfidenceKit: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/downloads/creative-confidence-kit.zip'
    link.download = 'creative-confidence-kit.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-anchor-50">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          to="/vault" 
          className="inline-flex items-center space-x-2 text-anchor-600 hover:text-anchor-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Vault</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
            <CheckCircle className="w-4 h-4" />
            <span>100% FREE</span>
          </div>
          
          <h1 className="text-4xl font-bold text-anchor-900 mb-4">
            🎨 Creative Confidence Starter Kit
          </h1>
          <p className="text-xl text-anchor-600 mb-6">
            Overcome creative fear & trust your voice
          </p>
          <div className="bg-white bg-opacity-60 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-lg font-medium text-orange-800">
              "What if the voice in your head saying 'you're not creative enough' is wrong?"
            </p>
          </div>
        </div>

        {/* Problem/Solution */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4">🚫 Stop Creative Self-Sabotage</h3>
            <p className="text-red-700 mb-3">
              <strong>The Problem:</strong> You have ideas, but that voice in your head whispers "who are you to create this?" or "someone else has already done it better."
            </p>
            <p className="text-red-700">
              <strong>The Solution:</strong> This starter kit gives you practical tools to silence the inner critic and start creating with confidence—even if you've never considered yourself "creative."
            </p>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Ready to Unlock Your Creative Confidence?
            </h3>
            <p className="text-green-700 mb-6 text-lg">
              Download starts immediately. No email required.
            </p>
            <Button 
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3"
            >
              <Download className="w-5 h-5 mr-2" />
              Free Instant Download
            </Button>
          </CardContent>
        </Card>

        {/* Kit Contents */}
        <div>
          <h2 className="text-2xl font-bold text-anchor-900 mb-6">What You Get (Completely Free)</h2>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <h3 className="text