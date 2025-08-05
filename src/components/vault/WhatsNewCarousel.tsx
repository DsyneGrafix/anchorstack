import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Download, Gift, Crown } from 'lucide-react';

const WhatsNewCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock new products data - replace with real data
  const newProducts = [
    {
      id: 'creative-confidence-starter',
      title: 'Creative Confidence Starter Kit',
      description: '7-day challenge to overcome creative fear & trust your voice',
      tier: 'free',
      isNew: true,
      badge: 'Just Added',
      image: '/api/placeholder/400/250',
      gradient: 'from-pink-500 to-orange-400',
      features: ['7-Day Challenge', 'Inner Critic Scripts', 'Voice Discovery'],
      cta: 'Download Free'
    },
    {
      id: 'motivational-quotes-pack',
      title: '50 Motivational Quotes by Theme',
      description: 'Curated inspiration across 5 powerful themes with social templates',
      tier: 'free',
      isNew: true,
      badge: 'Social Media Gold',
      image: '/api/placeholder/400/250',
      gradient: 'from-purple-500 to-blue-500',
      features: ['5 Theme Collections', 'Canva Templates', 'Social Pack'],
      cta: 'Get Quote Pack'
    },
    {
      id: 'mindful-productivity-kit',
      title: 'Mindful Productivity Kit',
      description: 'Gentle rhythms for sustainable success without burnout',
      tier: 'premium',
      isNew: true,
      badge: 'Featured',
      image: '/api/placeholder/400/250',
      gradient: 'from-green-500 to-teal-400',
      features: ['5-Day Challenge', 'Notion Templates', 'Digital Clarity'],
      cta: 'Get Kit - $27',
      price: '$27'
    },
    {
      id: 'david-after-christ',
      title: "David's Role After Christ's Return",
      description: 'Deep theological exploration of prophetic promises and future kingdom',
      tier: 'premium',
      isNew: true,
      badge: 'Theological Deep Dive',
      image: '/api/placeholder/400/250',
      gradient: 'from-indigo-500 to-purple-600',
      features: ['2000+ Words', 'Biblical Analysis', 'Prophetic Insights'],
      cta: 'Read Study - $19',
      price: '$19'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, newProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newProducts.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newProducts.length) % newProducts.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'free': return <Gift className="w-4 h-4" />;
      case 'premium': return <Star className="w-4 h-4" />;
      case 'exclusive': return <Crown className="w-4 h-4" />;
      default: return <Download className="w-4 h-4" />;
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

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>What's New in the Vault</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Fresh Tools for Your Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest productivity tools, creative resources, and spiritual insights
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {newProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className={`bg-gradient-to-r ${product.gradient} p-8 md:p-12 text-white relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-8 left-8 w-24 h-24 border border-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                      {/* Content */}
                      <div className="space-y-6">
                        {/* Badge */}
                        <div className="flex items-center space-x-3">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            {product.badge}
                          </span>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getTierColor(product.tier)}`}>
                            {getTierIcon(product.tier)}
                            <span className="capitalize">{product.tier}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-3">
                            {product.title}
                          </h3>
                          <p className="text-lg opacity-90 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm uppercase tracking-wider opacity-80">
                            What's Included:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.features.map((feature, idx) => (
                              <span 
                                key={idx}
                                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center space-x-4">
                          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            {product.cta}
                          </button>
                          {product.price && (
                            <span className="text-xl font-bold">
                              {product.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Visual/Mockup */}
                      <div className="hidden md:block">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                          <div className="bg-white/90 rounded-lg p-4 text-gray-800">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.tier === 'free' ? 'FREE' : product.price}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                              <div className="flex space-x-2 mt-4">
                                <div className="h-6 bg-blue-200 rounded w-16"></div>
                                <div className="h-6 bg-green-200 rounded w-20"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {newProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Free Products</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Premium Tools</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">4</div>
            <div className="text-sm text-gray-600">New This Week</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600 mb-1">∞</div>
            <div className="text-sm text-gray-600">Value Added</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewCarousel;