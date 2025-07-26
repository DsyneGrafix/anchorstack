// src/pages/Courses.tsx - Simple, Effective Course Delivery
import React from 'react'
import { BookOpen, Download, Play, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const courseModules = [
  {
    id: 1,
    title: "The Call to Create",
    description: "Every powerful devotional begins with a prompting, not a platform.",
    scripture: "Write the vision; make it plain on tablets - Habakkuk 2:2",
    downloadUrl: "/downloads/module-1-call-to-create.pdf",
    worksheetUrl: "/downloads/module-1-journaling-template.pdf",
    videoUrl: null, // Add when ready
    isLive: true
  },
  {
    id: 2,
    title: "Blueprint Your Structure",
    description: "Turn your message into a clear, actionable devotional framework.",
    scripture: "Let all things be done decently and in order - 1 Corinthians 14:40",
    downloadUrl: "/downloads/module-2-blueprint.pdf",
    worksheetUrl: "/downloads/module-2-structure-template.pdf",
    videoUrl: null,
    isLive: false // Coming soon
  },
  {
    id: 3,
    title: "Writing with Purpose",
    description: "Craft devotional entries that speak to the heart and mind.",
    scripture: "The words of a man's mouth are deep waters - Proverbs 18:4",
    downloadUrl: null,
    worksheetUrl: null,
    videoUrl: null,
    isLive: false
  }
]

export const Courses: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-anchor-900 mb-4">
          🎓 Forge Your First Devotional
        </h1>
        <p className="text-lg text-anchor-600 max-w-2xl mx-auto mb-6">
          Go from calling to creation with a 7-part course built to help you launch 
          devotionals the AnchorStack way — no experience required.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-anchor-500">
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            7 Modules
          </span>
          <span className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            PDF Worksheets
          </span>
          <span className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Lifetime Access
          </span>
        </div>
      </div>

      {/* Course Progress */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800 mb-1">Course Progress</h3>
              <p className="text-sm text-green-600">
                Module 1 is live! Start your devotional journey today.
              </p>
            </div>
            <div className="text-2xl font-bold text-green-600">1/7</div>
          </div>
          <div className="mt-4 w-full bg-green-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-1/7"></div>
          </div>
        </CardContent>
      </Card>

      {/* Module List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-anchor-800">Course Modules</h2>
        
        {courseModules.map((module) => (
          <Card 
            key={module.id}
            className={`${module.isLive ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`
                      flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                      ${module.isLive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}
                    `}>
                      {module.id}
                    </span>
                    <h3 className={`text-lg font-semibold ${
                      module.isLive ? 'text-blue-900' : 'text-gray-600'
                    }`}>
                      {module.title}
                    </h3>
                    {module.isLive && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        LIVE
                      </span>
                    )}
                  </div>
                  
                  <p className={`mb-3 ${module.isLive ? 'text-blue-700' : 'text-gray-500'}`}>
                    {module.description}
                  </p>
                  
                  {module.scripture && (
                    <p className={`text-sm italic ${module.isLive ? 'text-blue-600' : 'text-gray-400'}`}>
                      📖 "{module.scripture}"
                    </p>
                  )}
                </div>
                
                {module.isLive && (
                  <div className="flex flex-col space-y-2 ml-4">
                    {module.downloadUrl && (
                      <Button 
                        onClick={() => window.open(module.downloadUrl, '_blank')}
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Module PDF</span>
                      </Button>
                    )}
                    {module.worksheetUrl && (
                      <Button 
                        onClick={() => window.open(module.worksheetUrl, '_blank')}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Worksheet</span>
                      </Button>
                    )}
                    {module.videoUrl && (
                      <Button 
                        onClick={() => window.open(module.videoUrl, '_blank')}
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Play className="w-4 h-4" />
                        <span>Watch</span>
                      </Button>
                    )}
                  </div>
                )}
                
                {!module.isLive && (
                  <div className="ml-4 text-gray-400 text-sm">
                    Coming Soon
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            Ready to Start Your Devotional Journey?
          </h3>
          <p className="text-purple-700 mb-4">
            Download Module 1 and begin forging your first devotional today.
          </p>
          <Button 
            onClick={() => window.open('/downloads/module-1-call-to-create.pdf', '_blank')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Start Module 1
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}