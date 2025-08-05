import React, { useState, useMemo } from 'react';
import { Gift, Star, Crown, Download, ExternalLink, Filter, Search, Grid, List } from 'lucide-react';

const VaultGridLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'popular', 'name', 'tier'

  // Mock vault products - replace with real data
  const vaultProducts = [
    {
      id: 'creative-confidence-starter',
      title: 'Creative Confidence Starter Kit',
      description: 'Overcome creative fear & trust your voice with this 7-day challenge',
      tier: 'free',
      category: 'Creativity',
      tags: ['confidence', 'creativity', 'mindset'],
      downloadCount: 1247,
      rating: 4.9,
      isNew: true,
      isFeatured: true,
      createdAt: '2025-01-25',
      url: '/downloads/creative-confidence-starter.zip',
      gradient: 'from-pink-500 to-orange-400'
    },
    {
      id: 'motivational-quotes-pack',
      title: '50 Motivational Quotes by Theme',
      description: 'Curated inspiration across 5 powerful themes with social templates',
      tier: 'free',
      category: 'Content',
      tags: ['quotes', 'social media', 'inspiration'],
      downloadCount: 2156,
      rating: 4.8,
      isNew: true,
      isFeatured: false,
      createdAt: '2025-01-24',
      url: '/downloads/motivational-quotes-pack.zip',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      id: 'mindful-productivity-kit',
      title: 'Mindful Productivity Kit',
      description: 'Gentle rhythms for sustainable success without burnout',
      tier: 'premium',
      category: 'Productivity',
      tags: ['productivity', 'mindfulness', 'planning'],
      downloadCount: 543,
      rating: 4.9,
      isNew: true,
      isFeatured: true,
      createdAt: '2025-01-23',
      url: '/products/mindful-productivity-kit',
      price: 27,
      gradient: 'from-green-500 to-teal-400'
    },
    {
      id: 'david-after-christ',
      title: "David's Role After Christ's Return",
      description: 'Deep theological exploration of prophetic promises and future kingdom',
      tier: 'premium',
      category: 'Faith',
      tags: ['theology', 'prophecy', 'biblical study'],
      downloadCount: 234,
      rating: 5.0,
      isNew: true,
      isFeatured: false,
      createdAt: '2025-01-22',
      url: '/products/david-after-christ-return',
      price: 19,
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'focus-session-starter',
      title: 'Focus Session Starter Pack',
      description: 'Free templates and guides to master deep work sessions',
      tier: 'free',
      category: 'Focus',
      tags: ['focus', 'templates', 'productivity'],
      downloadCount: 892,
      rating: 4.7,
      isNew: false,
      isFeatured: false,
      createdAt: '2025-01-15',
      url: '/downloads/focus-session-starter.zip',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'creator-goal-template',
      title: 'Creator Goal Planning Template',
      description: 'Simple framework for setting and tracking creator goals',
      tier: 'free',
      category: 'Planning',
      tags: ['goals', 'planning', 'templates'],
      downloadCount: 567,
      rating: 4.6,
      isNew: false,
      isFeatured: false,
      createdAt: '2025-01-10',
      url: '/downloads/creator-goal-template.pdf',
      gradient: 'from-yellow-500 to-orange-400'
    },
    {
      id: 'digital-distraction-cleanse',
      title: 'Digital Distraction Cleanse',
      description: 'Complete system to reclaim your focus and eliminate digital overwhelm',
      tier: 'premium',
      category: 'Focus',
      tags: ['digital wellness', 'focus', 'productivity'],
      downloadCount: 312,
      rating: 4.8,
      isNew: false,
      isFeatured: true,
      createdAt: '2025-01-05',
      url: '/products/digital-distraction-cleanse',
      price: 39,
      gradient: 'from-red-500 to-pink-500'
    },
    {
      id: 'notion-creator-os',
      title: 'Notion Creator OS',
      description: 'Complete Notion workspace template for content creators and entrepreneurs',
      tier: 'premium',
      category: 'Productivity',
      tags: ['notion', 'templates', 'organization'],
      downloadCount: 789,
      rating: 4.9,
      isNew: false,
      isFeatured: true,
      createdAt: '2024-12-28',
      url: '/products/notion-creator-os',
      price: 47,
      gradient: 'from-gray-600 to-blue-600'
    },
    {
      id: 'creator-flywheel',
      title: 'Creator Flywheel System',
      description: 'Advanced framework for building sustainable creator businesses',
      tier: 'exclusive',
      category: 'Business',
      tags: ['business', 'strategy', 'growth'],
      downloadCount: 156,
      rating: 5.0,
      isNew: false,
      isFeatured: true,
      createdAt: '2024-12-20',
      url: '/products/creator-flywheel',
      price: 197,
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  // Get unique categories
  const categories = ['all', ...new Set(vaultProducts.map(p => p.category))];
  const tiers = ['all', 'free', 'premium', 'exclusive'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = vaultProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesTier = selectedTier === 'all' || product.tier === selectedTier;
      const matchesSearch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesTier && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'tier':
        const tierOrder = { free: 0, premium: 1, exclusive: 2 };
        filtered.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
        break;
      default:
        break;
    }

    return filtered;
  }, [vaultProducts, selectedCategory, selectedTier, searchTerm, sortBy]);

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

  const formatPrice = (price) => {
    if (!price) return 'FREE';
    return `$${price}`;
  };

  const ProductCard = ({ product, isListView = false }) => (
    <div className={`group cursor-pointer transition-all duration-300 ${
      isListView 
        ? 'flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200' 
        : 'bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-gray-200 overflow-hidden'
    }`}>
      {/* Card Header/Image Area */}
      {!isListView && (
        <div className={`h-32 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            {product.isNew && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                FEATURED
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium bg-white/90 ${getTierColor(product.tier)}`}>
              {getTierIcon(product.tier)}
              <span className="capitalize">{product.tier}</span>
            </div>
          </div>
        </div>
      )}

      {/* List view tier badge */}
      {isListView && (
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm font-medium ${getTierColor(product.tier)}`}>
          {getTierIcon(product.tier)}
          <span className="capitalize">{product.tier}</span>
        </div>
      )}

      {/* Content */}
      <div className={isListView ? 'flex-1' : 'p-5'}>
        <div className={`flex items-start justify-between ${isListView ? 'mb-2' : 'mb-3'}`}>
          <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors ${
            isListView ? 'text-lg' : 'text-lg'
          }`}>
            {product.title}
          </h3>
          {!isListView && (
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
            </div>
          )}
        </div>

        <p className={`text-gray-600 mb-3 ${isListView ? 'text-sm' : 'text-sm'}`}>
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <Download className="w-3 h-3" />
              <span>{product.downloadCount}</span>
            </span>
            <span>★ {product.rating}</span>
            <span>{product.category}</span>
          </div>

          {isListView && (
            <div className="flex items-center space-x-3">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                {product.tier === 'free' ? 'Download' : 'Get Access'}
              </button>
            </div>
          )}
        </div>

        {/* Action Button for Grid View */}
        {!isListView && (
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            {product.tier === 'free' ? (
              <>
                <Download className="w-4 h-4" />
                <span>Download Free</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Get Access</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Explore the Vault
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover tools, templates, and resources to accelerate your journey
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tiers.map(tier => (
                <option key={tier} value={tier}>
                  {tier === 'all' ? 'All Tiers' : tier.charAt(0).toUpperCase() + tier.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="name">Alphabetical</option>
              <option value="tier">By Tier</option>
            </select>
          </div>

          {/* View Toggle and Results Count */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {vaultProducts.length} products
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isListView={viewMode === 'list'} 
              />
            ))}
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VaultGridLayout;