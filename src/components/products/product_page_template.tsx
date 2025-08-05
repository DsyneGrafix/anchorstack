import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, Star, Users, Clock, CheckCircle, Gift, Crown, Share2, Heart, Eye } from 'lucide-react';

const ProductPage = ({ productId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: 'mindful-productivity-kit',
    title: 'Mindful Productivity Kit',
    subtitle: 'Gentle rhythms for sustainable success',
    description: 'Transform your relationship with productivity through mindful practices that honor your human nature while achieving meaningful results.',
    longDescription: 'Most productivity systems treat you like a machine that needs optimization. This kit treats you like a human who needs rhythm, rest, and sustainable practices that actually stick. Instead of "crushing your goals," you\'ll learn to cultivate your capacity. Instead of forcing productivity, you\'ll discover how to flow with your natural rhythms.',
    tier: 'premium',
    price: 27,
    originalPrice: 47,
    category: 'Productivity',
    tags: ['productivity', 'mindfulness', 'planning', 'sustainability'],
    rating: 4.9,
    reviewCount: 234,
    downloadCount: 543,
    createdAt: '2025-01-23',
    updatedAt: '2025-01-25',
    author: 'AnchorStack Team',
    isNew: true,
    isFeatured: true,
    gradient: 'from-green-500 to-teal-400',
    
    // What's included
    includes: [
      {
        icon: '📋',
        title: '5-Day Mindful Productivity Challenge',
        description: 'Daily practices to build sustainable work rhythms without burnout'
      },
      {
        icon: '🌅',
        title: 'Morning Intention Planner',
        description: 'Printable weekly planner that starts each day with purpose and clarity'
      },
      {
        icon: '🌙',
        title: 'Evening Reflection Journal',
        description: 'End-of-day practice for processing, learning, and celebrating progress'
      },
      {
        icon: '⚙️',
        title: 'Notion Template & PDF Versions',
        description: 'Choose your format - digital Notion workspace or printable PDFs'
      },
      {
        icon: '🎯',
        title: 'Digital Clarity Toolkit',
        description: 'Practical strategies for email management and focus protection'
      },
      {
        icon: '📱',
        title: 'Bonus: Phone Wallpapers & Templates',
        description: 'Mindful productivity reminders and email signature templates'
      }
    ],

    // Social proof
    testimonials: [
      {
        name: 'Sarah K.',
        role: 'Content Creator',
        text: 'Finally, a productivity system that doesn\'t make me feel like a machine. This kit helped me find my sustainable rhythm.',
        rating: 5
      },
      {
        name: 'Marcus T.',
        role: 'Consultant',
        text: 'I\'ve tried every productivity system out there. This is the first one that made me feel more human, not less.',
        rating: 5
      },
      {
        name: 'Jennifer M.',
        role: 'Entrepreneur',
        text: 'The gentle accountability approach changed everything. I\'m more productive but also more at peace.',
        rating: 5
      }
    ],

    // FAQ
    faq: [
      {
        question: 'How is this different from other productivity systems?',
        answer: 'Most systems focus on optimization and efficiency. This kit focuses on sustainability and human-centered approaches that work with your natural rhythms, not against them.'
      },
      {
        question: 'What formats are included?',
        answer: 'You get both digital Notion templates and printable PDFs, so you can choose the format that works best for your workflow.'
      },
      {
        question: 'How long does the challenge take?',
        answer: 'The 5-day challenge requires 10-15 minutes per day. The principles and tools are designed to be used long-term for sustainable productivity.'
      },
      {
        question: 'Is this suitable for teams?',
        answer: 'Absolutely! The principles work great for individual use and can be adapted for team workflows and shared practices.'
      }
    ],

    // Related products
    relatedProducts: [
      {
        id: 'creative-confidence-starter',
        title: 'Creative Confidence Starter Kit',
        price: 0,
        image: '/api/placeholder/200/120'
      },
      {
        id: 'digital-distraction-cleanse',
        title: 'Digital Distraction Cleanse',
        price: 39,
        image: '/api/placeholder/200/120'
      },
      {
        id: 'notion-creator-os',
        title: 'Notion Creator OS',
        price: 47,
        image: '/api/placeholder/200/120'
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

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

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
              <div className={`h-64 bg-gradient-to-r ${product.gradient} relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  {product.isNew && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border bg-white/20 backdrop-blur-sm ${getTierColor(product.tier)}`}>
                    {getTierIcon(product.tier)}
                    <span className="capitalize font-medium">{product.tier}</span>
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

                {/* Stats */}
                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{product.downloadCount} downloads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Updated {new Date(product.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  {['overview', 'includes', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Kit</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {product.longDescription}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Perfect For:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Overwhelmed creators who need sustainable productivity systems</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Recovering perfectionists ready to embrace "good enough" progress</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Spiritual entrepreneurs seeking work-life integration</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Anyone feeling burned out by traditional hustle culture</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* What's Included Tab */}
                {activeTab === 'includes' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                    {product.includes.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
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
                      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
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
                          <div className="flex items-center justify-between mb-2">
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
                          <p className="text-gray-700">{testimonial.text}</p>
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
                        <p className="text-gray-700">{faq.answer}</p>
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
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Save ${savings} ({savingsPercent}% off)
                  </div>
                )}
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 flex items-center justify-center space-x-2">
                {product.tier === 'free' ? (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Free</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    <span>Get Instant Access</span>
                  </>
                )}
              </button>

              <div className="text-xs text-gray-500 text-center mb-4">
                ✓ Instant download • ✓ Lifetime access • ✓ 30-day money-back guarantee
              </div>

              {/* Quick Stats */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-medium">{product.downloadCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{product.rating}/5 ⭐</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {product.relatedProducts.map((related, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{related.title}</div>
                      <div className="text-sm text-gray-600">{formatPrice(related.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;