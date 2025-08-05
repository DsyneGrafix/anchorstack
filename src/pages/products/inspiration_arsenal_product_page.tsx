import React, { useState } from 'react';
import { ArrowLeft, Download, Star, Users, Clock, CheckCircle, Gift, Crown, Share2, Heart, Zap } from 'lucide-react';

const InspirationArsenalProductPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState('complete');

  // Product data for Inspiration Arsenal
  const product = {
    id: 'inspiration-arsenal',
    title: 'Inspiration Arsenal',
    subtitle: 'The ultimate collection for creators who never want to run out of inspiration',
    description: 'Transform your content strategy with 500+ carefully curated quotes across 15 themes, plus advanced templates, automation tools, and a complete inspiration workflow system.',
    longDescription: 'Most creators spend hours hunting for the perfect quote when they should be creating. The Inspiration Arsenal eliminates that problem forever. This isn\'t just a quote collection—it\'s a complete inspiration ecosystem designed to fuel your creativity, engage your audience, and build your brand authority across all platforms.',
    tier: 'premium',
    originalPrice: 197,
    bundles: {
      starter: { price: 47, quotes: 200, themes: 8, templates: 'Basic' },
      complete: { price: 97, quotes: 500, themes: 15, templates: 'Advanced' },
      mastermind: { price: 147, quotes: 500, themes: 15, templates: 'Premium + Automation' }
    },
    category: 'Content Creation',
    tags: ['quotes', 'inspiration', 'content creation', 'social media', 'branding'],
    rating: 4.9,
    reviewCount: 89,
    downloadCount: 234,
    gradient: 'from-purple-600 to-blue-600',
    
    // What's included
    includes: [
      {
        icon: '📚',
        title: '500+ Premium Quotes Collection',
        description: 'Carefully curated quotes across 15 themes, organized by emotion, situation, and audience type.',
        formats: ['Searchable Database', 'Category PDFs', 'Spreadsheet Export'],
        tier: 'all'
      },
      {
        icon: '🎨',
        title: 'Advanced Canva Template Library',
        description: '50+ professionally designed templates for quotes, with multiple style variations and brand customization options.',
        formats: ['Canva Templates', 'PSD Files', 'Design Guidelines'],
        tier: 'complete'
      },
      {
        icon: '📱',
        title: 'Animated Social Media Templates',
        description: 'Motion graphics templates for Instagram Stories, Reels, and TikTok with quote animations and transitions.',
        formats: ['After Effects Files', 'Canva Animations', 'GIF Templates'],
        tier: 'complete'
      },
      {
        icon: '🎯',
        title: 'Quote Selection Guide & Strategy',
        description: 'Master framework for choosing the perfect quote for any situation, audience, or platform.',
        formats: ['Strategy Guide', 'Decision Tree', 'Cheat Sheets'],
        tier: 'all'
      },
      {
        icon: '📅',
        title: 'Quote of the Day Productivity Planner',
        description: 'Transform daily inspiration into actionable productivity with guided reflection and planning prompts.',
        formats: ['Digital Planner', 'Printable Version', 'Notion Template'],
        tier: 'complete'
      },
      {
        icon: '🤖',
        title: 'Content Automation Workflows',
        description: 'Pre-built automation sequences for Buffer, Hootsuite, and other platforms to schedule inspirational content.',
        formats: ['Zapier Templates', 'IFTTT Recipes', 'Platform Integrations'],
        tier: 'mastermind'
      }
    ],

    // Theme categories
    themes: [
      { name: 'Success & Achievement', count: 45, color: 'bg-green-100 text-green-800' },
      { name: 'Resilience & Strength', count: 40, color: 'bg-orange-100 text-orange-800' },
      { name: 'Creativity & Innovation', count: 38, color: 'bg-purple-100 text-purple-800' },
      { name: 'Leadership & Vision', count: 35, color: 'bg-blue-100 text-blue-800' },
      { name: 'Mindfulness & Peace', count: 32, color: 'bg-teal-100 text-teal-800' },
      { name: 'Growth & Learning', count: 30, color: 'bg-indigo-100 text-indigo-800' },
      { name: 'Love & Relationships', count: 28, color: 'bg-pink-100 text-pink-800' },
      { name: 'Dreams & Ambition', count: 33, color: 'bg-yellow-100 text-yellow-800' },
      { name: 'Wisdom & Philosophy', count: 25, color: 'bg-gray-100 text-gray-800' }
    ],

    // Social proof
    testimonials: [
      {
        name: 'Maria Rodriguez',
        role: 'Content Creator • 50K followers',
        text: 'This arsenal literally transformed my content strategy. I went from struggling to find quotes to having a 3-month content calendar filled with engaging posts. My engagement rate increased 340%.',
        rating: 5,
        highlight: '340% engagement increase',
        avatar: '👩‍💼'
      },
      {
        name: 'James Patterson',
        role: 'Marketing Director • Tech Startup',
        text: 'The automation workflows alone saved me 10 hours per week. Our social media presence went from inconsistent to professional overnight. Best investment for our brand.',
        rating: 5,
        highlight: '10 hours saved weekly',
        avatar: '👨‍💻'
      },
      {
        name: 'Sarah Kim',
        role: 'Life Coach • Online Business',
        text: 'The audience-specific collections are GOLD. I can instantly find the perfect quote for my target demographic. My clients always ask where I find such perfect inspiration.',
        rating: 5,
        highlight: 'Perfect audience targeting',
        avatar: '👩‍🏫'
      }
    ],

    // FAQ
    faq: [
      {
        question: 'How is this different from the free 50 Quotes Pack?',
        answer: 'The free pack gives you 50 quotes across 5 themes. The Inspiration Arsenal includes 500+ quotes across 15 themes, plus advanced templates, automation tools, strategy guides, and ongoing updates. It\'s like comparing a sample to a complete professional toolkit.'
      },
      {
        question: 'Can I use these quotes commercially?',
        answer: 'Absolutely! All quotes are either public domain, properly attributed, or original content. You can use them in client work, courses, products, and commercial content without additional licensing fees.'
      },
      {
        question: 'What platforms do the templates work with?',
        answer: 'Templates are optimized for Instagram, Facebook, Twitter, LinkedIn, Pinterest, TikTok, and general web use. We include specific sizing and format variations for each platform\'s requirements.'
      },
      {
        question: 'Is there a refund policy?',
        answer: 'We offer a 60-day money-back guarantee. If the Arsenal doesn\'t transform your content creation process, we\'ll refund every penny, no questions asked.'
      }
    ]
  };

  const formatPrice = (price) => {
    if (!price) return 'FREE';
    return `$${price}`;
  };

  const getBundleFeatures = (bundleName) => {
    return product.includes.filter(item => 
      item.tier === 'all' || 
      (bundleName === 'complete' && (item.tier === 'all' || item.tier === 'complete')) ||
      (bundleName === 'mastermind' && (item.tier === 'all' || item.tier === 'complete' || item.tier === 'mastermind'))
    );
  };

  const savings = product.originalPrice - product.bundles[selectedBundle].price;
  const savingsPercent = Math.round((savings / product.originalPrice) * 100);

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
                {/* Decorative quote bubbles */}
                <div className="absolute top-6 right-6 w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center text-white text-2xl">"</div>
                <div className="absolute bottom-6 left-6 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white text-lg">"</div>
                <div className="absolute top-1/2 right-1/4 w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-white text-sm">"</div>
                
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    LIMITED TIME: 50% OFF
                  </span>
                </div>
                
                <div className="absolute bottom-6 right-6 text-white text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs opacity-90">Was $197</div>
                    <div className="text-2xl font-bold">$97</div>
                    <div className="text-xs opacity-90">Save $100</div>
                  </div>
                </div>

                {/* Centered arsenal icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-8">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  {product.subtitle}
                </p>

                {/* Value Proposition */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="text-blue-800 font-semibold mb-2">⚡ End Quote-Hunting Forever</h3>
                  <p className="text-blue-700 text-sm mb-2">
                    <strong>The Problem:</strong> You spend 30+ minutes finding the perfect quote, then another 20 minutes designing it. Your content calendar stays empty while inspiration slips away.
                  </p>
                  <p className="text-blue-700 text-sm">
                    <strong>The Solution:</strong> 500+ professionally curated quotes + advanced templates + automation workflows = never running out of engaging content again.
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
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-purple-600">{product.downloadCount} creators</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Save 10+ hours/week</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Bundle Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Arsenal</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {Object.entries(product.bundles).map(([key, bundle]) => (
                  <div 
                    key={key}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedBundle === key 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedBundle(key)}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 capitalize mb-2">{key}</h4>
                      <div className="text-2xl font-bold text-purple-600 mb-1">${bundle.price}</div>
                      <div className="text-sm mt-4 opacity-80">
            60-day guarantee • Instant access • Save ${savings} today
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationArsenalProductPage; text-gray-600 mb-3">
                        {bundle.quotes} quotes • {bundle.themes} themes
                      </div>
                      <div className="text-xs text-gray-500">
                        {bundle.templates} templates
                      </div>
                      {key === 'complete' && (
                        <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full mt-2">
                          MOST POPULAR
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  {['overview', 'themes', 'includes', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">The Complete Inspiration System</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {product.longDescription}
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-green-800 font-semibold mb-2">💡 What You'll Achieve</h4>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Never spend 30+ minutes hunting for the perfect quote again</li>
                          <li>• Create 3 months of content in just 2 hours</li>
                          <li>• Increase social media engagement by 200-400%</li>
                          <li>• Build a recognizable brand voice through consistent inspiration</li>
                          <li>• Automate your content calendar with proven workflows</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Perfect For:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'Content creators who want consistent engagement',
                          'Social media managers handling multiple accounts',
                          'Coaches and consultants building thought leadership',
                          'Entrepreneurs growing their personal brand',
                          'Marketing teams needing reliable content assets',
                          'Anyone tired of content creation burnout'
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

                {/* Themes Tab */}
                {activeTab === 'themes' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">15 Comprehensive Theme Categories</h3>
                    <p className="text-gray-600 mb-6">Each theme includes 20-45 carefully curated quotes from thought leaders, philosophers, and innovators.</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {product.themes.map((theme, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{theme.name}</div>
                            <div className="text-xs text-gray-600">{theme.count} quotes</div>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme.color}`}>
                            {theme.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's Included Tab */}
                {activeTab === 'includes' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Everything in Your {selectedBundle.charAt(0).toUpperCase() + selectedBundle.slice(1)} Arsenal</h3>
                    
                    {getBundleFeatures(selectedBundle).map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl flex-shrink-0">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <div className="flex flex-wrap gap-1 ml-2">
                              {item.formats.map((format, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {format}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Creator Success Stories</h3>
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
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{testimonial.avatar}</div>
                              <div>
                                <div className="font-medium text-gray-900">{testimonial.name}</div>
                                <div className="text-sm text-gray-600">{testimonial.role}</div>
                              </div>
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
                          <div className="text-xs text-purple-600 font-medium bg-purple-50 inline-block px-2 py-1 rounded">
                            {testimonial.highlight}
                          </div>
                        </div>
                      ))}
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
            {/* Purchase Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-4xl font-bold text-purple-600">
                    ${product.bundles[selectedBundle].price}
                  </span>
                  <div className="text-sm text-gray-500">
                    <div className="line-through">${product.originalPrice}</div>
                    <div className="text-green-600 font-medium">Save ${savings}</div>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  {savingsPercent}% off • Limited time offer
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4 flex items-center justify-center space-x-2 text-lg">
                <Zap className="w-6 h-6" />
                <span>Get Your Arsenal Now</span>
              </button>

              <div className="text-xs text-gray-500 text-center mb-4">
                ✓ Instant access • ✓ 60-day money-back guarantee • ✓ Lifetime updates
              </div>

              {/* Bundle Comparison */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="text-sm font-medium text-gray-900 mb-2">Your {selectedBundle.charAt(0).toUpperCase() + selectedBundle.slice(1)} includes:</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quotes</span>
                  <span className="font-medium">{product.bundles[selectedBundle].quotes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Themes</span>
                  <span className="font-medium">{product.bundles[selectedBundle].themes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Templates</span>
                  <span className="font-medium">{product.bundles[selectedBundle].templates}</span>
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-center text-sm text-gray-600 mb-2">
                  🔥 <strong>234 creators</strong> are using this arsenal
                </div>
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>7 purchased in the last 24 hours</span>
                </div>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-green-50 rounded-xl shadow-sm border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">💰 60-Day Guarantee</h3>
              <p className="text-green-700 text-sm mb-4">
                If the Inspiration Arsenal doesn't transform your content creation process and save you hours every week, we'll refund every penny.
              </p>
              <div className="text-xs text-green-600 font-medium">
                No questions asked • Full refund • Keep what you've downloaded
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to End Quote-Hunting Forever?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join 234+ content creators who never run out of engaging inspiration
          </p>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-80">Premium Quotes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm opacity-80">Theme Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Templates</div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
            <Zap className="w-6 h-6" />
            <span>Get Your Arsenal Now - ${product.bundles[selectedBundle].price}</span>
          </button>
                    <div className="text-sm opacity-80 mt-2">
            Instant access • Lifetime updates • 60-day money-back guarantee
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationArsenalProductPage;

