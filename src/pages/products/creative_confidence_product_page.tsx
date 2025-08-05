import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, Star, Users, Clock, CheckCircle, Gift, Crown, Share2, Heart, Eye, Play, FileText, Palette } from 'lucide-react';

const CreativeConfidenceProductPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [downloadCount, setDownloadCount] = useState(1247);

  // Product data for Creative Confidence Starter Kit
  const product = {
    id: 'creative-confidence-starter',
    title: 'Creative Confidence Starter Kit',
    subtitle: 'Overcome creative fear & trust your voice',
    description: 'What if the voice in your head saying "you\'re not creative enough" is wrong? This starter kit gives you practical tools to silence the inner critic and start creating with confidence.',
    longDescription: 'Most people think creativity is a talent you\'re born with. That\'s a lie that keeps millions of brilliant minds from sharing their gifts with the world. Creativity isn\'t a talent—it\'s a confidence you can build. This kit gives you the exact tools, scripts, and practices to overcome creative self-doubt and start trusting your unique voice.',
    tier: 'free',
    price: 0,
    originalPrice: 19,
    category: 'Creativity',
    tags: ['confidence', 'creativity', 'mindset', 'fear', 'voice'],
    rating: 4.9,
    reviewCount: 156,
    downloadCount: 1247,
    createdAt: '2025-01-25',
    updatedAt: '2025-01-25',
    author: 'AnchorStack Team',
    isNew: true,
    isFeatured: true,
    gradient: 'from-pink-500 to-orange-400',
    
    // What's included
    includes: [
      {
        icon: '📋',
        title: '7-Day Creative Confidence Challenge',
        description: 'Daily micro-actions to build creative courage. Each day takes 10-15 minutes but builds momentum that lasts.',
        format: 'PDF Guide (12 pages)'
      },
      {
        icon: '🧠',
        title: 'Inner Critic Shutdown Scripts',
        description: 'Specific phrases to use when self-doubt strikes. Turn that negative voice into your creative ally.',
        format: 'Quick Reference Card'
      },
      {
        icon: '✨',
        title: 'Creative Voice Discovery Worksheet',
        description: 'Find your unique creative perspective through guided questions and exercises. No artistic skill required.',
        format: 'Interactive Worksheet'
      },
      {
        icon: '🎯',
        title: 'Quick Start Practice Sheet',
        description: 'Simple daily practices to maintain creative confidence long after the challenge ends.',
        format: 'Printable Tracker'
      },
      {
        icon: '💡',
        title: 'Confidence Affirmations + Phone Wallpapers',
        description: 'Beautifully designed affirmations you can use daily to rewire limiting beliefs about creativity.',
        format: '5 High-Res Images'
      },
      {
        icon: '🎨',
        title: 'BONUS: Creative Project Starter Templates',
        description: 'Simple templates to begin your first creative projects without overwhelm.',
        format: 'Canva Templates'
      }
    ],

    // Challenge breakdown
    challengeDays: [
      {
        day: 1,
        title: 'Permission to Begin',
        description: 'Give yourself official permission to create imperfectly. Start before you feel ready.',
        activity: 'Write "I give myself permission to create badly" and post it where you\'ll see it daily.'
      },
      {
        day: 2,
        title: 'Idea Capture System',
        description: 'Set up a simple system to catch creative sparks before they disappear.',
        activity: 'Choose your idea capture method and collect 5 creative ideas (any ideas, no judgment).'
      },
      {
        day: 3,
        title: 'Creative Courage Exercise',
        description: 'Do one small creative thing that scares you. Build evidence that you can handle discomfort.',
        activity: 'Share one creative piece publicly—a photo, idea, doodle, or thought.'
      },
      {
        day: 4,
        title: 'Comparison Detox',
        description: 'Identify your comparison triggers and create healthy boundaries around inspiration vs. intimidation.',
        activity: 'Unfollow 3 accounts that make you feel "not good enough" and follow 3 that inspire without intimidating.'
      },
      {
        day: 5,
        title: 'Voice Discovery',
        description: 'Explore what makes your perspective unique through guided reflection and exercises.',
        activity: 'Complete the Voice Discovery Worksheet and identify your creative "superpower."'
      },
      {
        day: 6,
        title: 'Share Something',
        description: 'Put one piece of your creative work into the world. Start small, but start.',
        activity: 'Create and share something using your unique voice (using insights from Day 5).'
      },
      {
        day: 7,
        title: 'Confidence Celebration',
        description: 'Acknowledge your progress and plan how to maintain creative momentum.',
        activity: 'Write yourself a letter celebrating your creative courage and plan your next creative project.'
      }
    ],

    // Social proof
    testimonials: [
      {
        name: 'Jennifer M.',
        role: 'Marketing Manager',
        text: 'I always thought I wasn\'t the "creative type." This challenge helped me realize I\'d been creating solutions and ideas my whole life—I just didn\'t recognize it as creativity.',
        rating: 5,
        highlight: 'From "not creative" to creative confidence in 7 days'
      },
      {
        name: 'Marcus K.',
        role: 'Entrepreneur',
        text: 'The inner critic scripts alone were worth it. I actually have tools now instead of just hoping the self-doubt goes away.',
        rating: 5,
        highlight: 'Practical tools that actually work'
      },
      {
        name: 'Sarah L.',
        role: 'Content Creator',
        text: 'Day 3 was terrifying and amazing. I posted my first creative piece online and got such encouraging responses. This kit gave me the push I needed.',
        rating: 5,
        highlight: 'Overcame fear and started sharing'
      },
      {
        name: 'David Chen',
        role: 'Teacher',
        text: 'I\'ve been using these techniques with my students too. Amazing how quickly creative confidence spreads when you have the right framework.',
        rating: 5,
        highlight: 'Works for teaching creativity too'
      }
    ],

    // FAQ
    faq: [
      {
        question: 'I\'ve never considered myself creative. Will this work for me?',
        answer: 'Especially for you! This kit is specifically designed for people who think they\'re "not creative." You\'ll discover that creativity isn\'t about artistic talent—it\'s about confidence, curiosity, and willingness to try. Every person who completes this challenge realizes they\'ve been creative all along.'
      },
      {
        question: 'How much time does the 7-day challenge require?',
        answer: 'Each day takes 10-15 minutes. The activities are designed to be small but powerful—micro-actions that build real momentum without overwhelming your schedule.'
      },
      {
        question: 'What if I don\'t have any artistic skills?',
        answer: 'Perfect! This isn\'t about becoming an artist. It\'s about building creative confidence in whatever field you\'re in—business, problem-solving, communication, innovation. Creativity applies to everything.'
      },
      {
        question: 'Is this just mindset work or are there practical tools?',
        answer: 'Both! You get mindset shifts AND practical tools—scripts for handling self-doubt, worksheets for discovering your voice, templates for starting projects, and systems for maintaining momentum.'
      },
      {
        question: 'What\'s the catch? Why is this free?',
        answer: 'No catch! We believe creative confidence should be accessible to everyone. This is our way of serving the creative community and introducing you to our approach. If you love it, we have deeper resources available, but this kit stands alone as complete value.'
      },
      {
        question: 'Can I share this with my team or students?',
        answer: 'Absolutely! The principles work great for teams, classrooms, and creative communities. Many people use this to help others build creative confidence too.'
      }
    ],

    // Related products
    relatedProducts: [
      {
        id: 'motivational-quotes-pack',
        title: '50 Motivational Quotes Pack',
        price: 0,
        tier: 'free',
        description: 'Inspiration for every creative moment'
      },
      {
        id: 'mindful-productivity-kit',
        title: 'Mindful Productivity Kit',
        price: 27,
        tier: 'premium',
        description: 'Sustainable creative workflows'
      },
      {
        id: 'creative-confidence-unleashed',
        title: 'Creative Confidence Unleashed',
        price: 67,
        tier: 'premium',
        description: 'Complete 30-day transformation system'
      }
    ]
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'free': return <Gift className="w-5 h-5" />;
      case 'premium': return <Star className="w-5 h-5" />;
      case 'exclusive': return <Crown className="w-5 h-5" />;
      default: return <Download className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'free': return 'bg-green-100 text-green-800 border-green-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exclusive': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'FREE';
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Vault</span>
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsInWishlist(!isInWishlist)}
                className={`p-2 rounded-lg ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              >
                <Heart className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Product Header Image */}
              <div className={`h-64 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-24 h-24 border-2 border-white/30 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-white/30 rounded-full"></div>
                
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    100% FREE
                  </span>
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border bg-white/20 backdrop-blur-sm text-green-800 bg-green-100 border-green-200`}>
                    <Gift className="w-4 h-4" />
                    <span className="capitalize font-medium">Free Starter Kit</span>
                  </div>
                </div>
                
                {/* Value indicator */}
                <div className="absolute top-6 right-6 text-white text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl font-bold">$19</div>
                    <div className="text-xs opacity-90">Value</div>
                    <div className="text-lg font-bold text-green-300">FREE</div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                {/* Problem/Solution Hook */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="text-red-800 font-semibold mb-2">🚫 Stop Creative Self-Sabotage</h3>
                  <p className="text-red-700 text-sm mb-2">
                    <strong>The Problem:</strong> You have ideas, but that voice in your head whispers "who are you to create this?" or "someone else has already done it better."
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>The Solution:</strong> This starter kit gives you practical tools to silence the inner critic and start creating with confidence—even if you've never considered yourself "creative."
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-600">{product.downloadCount} downloads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>10-15 min/day</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  {['overview', 'challenge', 'includes', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-pink-500 text-pink-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'challenge' ? '7-Day Challenge' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Starter Kit</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {product.longDescription}
                      </p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-blue-800 font-semibold mb-2">💡 The Truth About Creativity</h4>
                        <p className="text-blue-700 text-sm">
                          Creativity isn't a talent you're born with—it's a confidence you can build. Every person who completes this challenge realizes they've been creative all along. They just needed permission to see it.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Perfect For:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'Entrepreneurs who need creative confidence for marketing',
                          'Professionals wanting to bring innovation to their work',
                          'Anyone who\'s ever said "I\'m not creative" but wants to be',
                          'Creators struggling with impostor syndrome',
                          'Parents who want to model creative confidence',
                          'Teams looking to boost innovation and collaboration'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 7-Day Challenge Tab */}
                {activeTab === 'challenge' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your 7-Day Journey to Creative Confidence</h3>
                    <p className="text-gray-600 mb-6">Each day takes just 10-15 minutes but builds momentum that lasts. Here's your roadmap:</p>
                    
                    <div className="space-y-4">
                      {product.challengeDays.map((day, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {day.day}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{day.title}</h4>
                              <p className="text-gray-600 text-sm mb-2">{day.description}</p>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Today's Activity:</div>
                                <div className="text-sm text-gray-700">{day.activity}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                      <h4 className="text-green-800 font-semibold mb-2">🎯 What You'll Achieve</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Silence your inner critic with proven techniques</li>
                        <li>• Discover your unique creative voice and perspective</li>
                        <li>• Build evidence that you can handle creative discomfort</li>
                        <li>• Create and share something publicly (scary but amazing!)</li>
                        <li>• Develop sustainable practices for ongoing creative confidence</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* What's Included Tab */}
                {activeTab === 'includes' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Everything You Get (Completely Free)</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="text-center text-green-800">
                        <div className="font-bold text-lg mb-1">No Email Required • Instant Download</div>
                        <div className="text-sm">We believe in removing barriers to creativity</div>
                      </div>
                    </div>
                    
                    {product.includes.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl flex-shrink-0">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
                              {item.format}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="text-orange-800 font-semibold mb-2">🎁 Bonus Materials</h4>
                      <ul className="text-orange-700 text-sm space-y-1">
                        <li>• Email signature templates with creative confidence messaging</li>
                        <li>• Quick reference cards for the 7 core principles</li>
                        <li>• Links to additional free creative resources</li>
                        <li>• Access to our private creative confidence community</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">What People Are Saying</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{product.rating} out of 5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {product.testimonials.map((testimonial, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium text-gray-900">{testimonial.name}</div>
                              <div className="text-sm text-gray-600">{testimonial.role}</div>
                            </div>
                            <div className="flex">
                              {[1,2,3,4,5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{testimonial.text}</p>
                          <div className="text-xs text-pink-600 font-medium bg-pink-50 inline-block px-2 py-1 rounded">
                            {testimonial.highlight}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                    {product.faq.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-4xl font-bold text-green-600">FREE</span>
                  <div className="text-sm text-gray-500">
                    <div className="line-through">${product.originalPrice}</div>
                    <div className="text-green-600 font-medium">100% Free</div>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  ${product.originalPrice} value • No strings attached
                </div>
              </div>

              <button className="w-full bg-pink-500 text-white py-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors mb-4 flex items-center justify-center space-x-2 text-lg">
                <Download className="w-6 h-6" />
                <span>Download Free Now</span>
              </button>

              <div className="text-xs text-gray-500 text-center mb-4">
                ✓ Instant download • ✓ No email required • ✓ Always free
              </div>

              {/* Quick Stats */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-medium text-green-600">{product.downloadCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{product.rating}/5 ⭐</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time Required</span>
                  <span className="font-medium">10-15 min/day</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium text-green-600">Beginner-friendly</span>
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-center text-sm text-gray-600 mb-2">
                  🔥 <strong>1,247 people</strong> downloaded this week
                </div>
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live downloads happening now</span>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="border-t border-gray-200 pt-4 mt-4 text-center">
                <div className="text-xs text-gray-500 space-y-1">
                  <div>✓ Trusted by 1,247+ creators</div>
                  <div>✓ Zero spam, always free</div>
                  <div>✓ Works on any device</div>
                </div>
              </div>
            </div>

            {/* Next Step Hint */}
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl shadow-sm border border-pink-200 p-6">
              <h3 className="text-lg font-semibold text-pink-900 mb-2">Love This Kit?</h3>
              <p className="text-pink-700 text-sm mb-4">
                If this starter kit resonates with you, check out our premium <strong>Creative Confidence Unleashed</strong> system for the complete 30-day transformation.
              </p>
              <div className="space-y-2 text-sm text-pink-600">
                <div>• Advanced confidence-building techniques</div>
                <div>• Creative project planning system</div>
                <div>• Habit tracking tools</div>
                <div>• Community access</div>
              </div>
              <button className="w-full mt-4 bg-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
                Learn More
              </button>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {product.relatedProducts.map((related, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      {related.tier === 'free' ? 
                        <Gift className="w-6 h-6 text-white" /> : 
                        <Star className="w-6 h-6 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                        {related.title}
                      </div>
                      <div className="text-xs text-gray-600">{related.description}</div>
                      <div className="text-sm font-medium text-gray-700">
                        {formatPrice(related.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share This */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Kit</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Share on Twitter
                </button>
                <button className="w-full bg-blue-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
                  Share on LinkedIn
                </button>
                <button className="w-full bg-gray-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                  Copy Link
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Help others discover their creative confidence too
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Unlock Your Creative Confidence?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join 1,247+ people who've discovered their creative voice with this free starter kit
          </p>
          <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
            <Download className="w-6 h-6" />
            <span>Download Your Free Kit Now</span>
          </button>
          <div className="text-sm mt-4 opacity-80">
            No email required • Instant access • Always free
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeConfidenceProductPage