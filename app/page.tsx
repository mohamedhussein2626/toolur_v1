"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  FileText, 
  Image, 
  Edit3, 
  Video, 
  Folder,
  ArrowRight,
  Search,
  FilePlus,
  Scissors,
  Wand2
} from 'lucide-react';
import { categoryCards, popularTools, getToolUrl, getToolsByNavCategory } from '@/lib/tools-data';

export default function ToolurHomepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = ['All Tools', 'Pdf Tools', 'Video Tools', 'Image Tools', 'Converter Tools', 'Other Tools', 'AI Write'];

  // Helper function to generate tool slug from name
  const getToolSlug = (toolName: string) => {
    return toolName.toLowerCase().replace(/\s+/g, '-');
  };

  // Filter tools for dropdown - shows matching tools as you type
  const dropdownResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    
    return popularTools
      .filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query)
      )
      .slice(0, 8); // Limit to 8 results in dropdown
  }, [searchQuery]);

  // Filter tools based on search query and active category - real-time search
  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const hasQuery = query !== '';
    
    // If there's a search query, search ALL tools regardless of category
    if (hasQuery) {
      return popularTools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query)
      );
    }
    
    // If no search query, filter by category
    if (activeCategory === 'All Tools') {
      return popularTools;
    }
    
    return popularTools.filter(tool => tool.category === activeCategory);
  }, [activeCategory, searchQuery]);


  const handleToolClick = (toolName: string) => {
    // Tool click handler - navigation is handled by Link component
  };

  const handleCategoryCardClick = (filterKey: React.SetStateAction<string>) => {
    setActiveCategory(filterKey);
    setSearchQuery('');
    setShowDropdown(false);
    setTimeout(() => {
      document.getElementById('popular-tools')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearch = () => {
    setShowDropdown(false);
    setTimeout(() => {
      document.getElementById('popular-tools')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleDropdownItemClick = (toolName: string) => {
    setSearchQuery('');
    setShowDropdown(false);
    handleToolClick(toolName);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowDropdown(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding dropdown to allow clicking on items
    setTimeout(() => setShowDropdown(false), 200);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="relative">
          <span className="absolute -top-8 left-12 text-4xl">🎯</span>
          <span className="absolute top-0 right-24 text-2xl">🎨</span>
          <span className="absolute -bottom-4 left-32 text-xl">💡</span>
          <span className="absolute bottom-8 right-12 text-3xl">🚀</span>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Free Tools to Make{' '}
            <span className="bg-teal-700 text-white px-4 py-1">Business</span>{' '}
            Simple
          </h1>
          <p className="text-gray-600 mb-8">
            We offer PDF, video, image and other online tools to make your life easier
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 relative">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              
              {/* Dropdown Results */}
              {showDropdown && dropdownResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {dropdownResults.map((tool, idx) => (
                    <Link
                      key={idx}
                      href={getToolUrl(tool.name, tool.category)}
                      onClick={() => handleDropdownItemClick(tool.name)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{tool.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{tool.desc}</p>
                        <span className="text-xs text-blue-600">{tool.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {/* No results message in dropdown */}
              {showDropdown && searchQuery.trim().length > 0 && dropdownResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No tools found for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {categoryCards.map((card, idx) => {
            // Determine href based on filterKey
            let href = '#';
            if (card.filterKey === 'Pdf Tools') {
              href = '/pdf-editor';
            } else if (card.filterKey === 'Image Tools') {
              href = '/image-editor';
            } else {
              // For other categories, scroll to tools section
              href = '#popular-tools';
            }
            
            const IconComponent = card.icon;
            return (
              <Link
              key={idx}
                href={href}
                onClick={(e) => {
                  if (href === '#popular-tools') {
                    e.preventDefault();
                    handleCategoryCardClick(card.filterKey);
                  }
                }}
                className={`${card.color} text-white rounded-xl p-6 relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform block`}
            >
              <div className="relative z-10">
                <IconComponent className="w-8 h-8 opacity-90 mb-3 text-white fill-white stroke-white" />
                <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{card.subtitle}</p>
                <div className="flex items-center justify-end text-xs">
                  <span className="opacity-75 flex items-center gap-1">See tools <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">1m</div>
            <div className="text-gray-600 text-sm">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">10m</div>
            <div className="text-gray-600 text-sm">Files Converted</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">200+</div>
            <div className="text-gray-600 text-sm">Online Tools</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">500k</div>
            <div className="text-gray-600 text-sm">PDF's Created</div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section id="popular-tools" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Our Most Popular Tools</h2>
          <p className="text-gray-600">We present the best of the best. All free, no catch.</p>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Tool Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery('');
                setShowDropdown(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool, idx) => (
              <Link
              key={idx}
                href={getToolUrl(tool.name, tool.category)}
                onClick={() => handleToolClick(tool.name)}
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} mb-4`}>
                {tool.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{tool.category}</p>
              <p className="text-sm text-gray-600">{tool.desc}</p>
              </Link>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery.trim() 
                ? `No tools found for "${searchQuery}"` 
                : 'No tools found matching your search.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Tools');
              }}
              className="mt-4 text-blue-500 hover:text-blue-600 font-medium underline"
            >
              Clear {searchQuery.trim() ? 'search' : 'filters'}
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            All Tools
          </button>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Free Tools You'd Usually Pay For</h2>
          <p className="text-gray-600">No Limits. No Sign-Up.</p>
          <p className="text-gray-600">Here's our featured tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'PDF Creator', desc: 'Create PDF quickly and easily with our free PDF creator', img: 'bg-blue-100', href: '/pdf-editor', icon: FilePlus },
            { title: 'Background Remover', desc: 'Easily remove the background from an image at a photo', img: 'bg-purple-100', href: '/image-editor', icon: Scissors },
            { title: 'Photo Cleanup', desc: 'Easily clean unwanted objects, items, people from an image', img: 'bg-green-100', href: '/image-editor', icon: Wand2 }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Link key={idx} href={item.href} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow block">
                <div className={`${item.img} h-64 flex items-center justify-center`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <IconComponent className="w-20 h-20 text-gray-700" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <div className="text-blue-500 font-medium flex items-center space-x-2 hover:space-x-3 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Premium Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Get more with Premium</h2>
              <p className="text-blue-100 mb-8">
                Take your projects further with premium tools that stay out of your
                way and work smarter. Create without limits, edit, or roadblocks. Get
                the premium experience.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                  <span>Ad-free</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    ♾️
                  </div>
                  <span>Unlimited usage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                  <span>Faster processing</span>
                </div>
              </div>
              <Link href="/login" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block">
                Get started
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">⚙️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>
                <span className="font-bold">toolur</span>
              </div>
              <p className="text-sm text-gray-600">
                toolur provides free online conversion, pdf, and other handy tools to help you solve problems
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigate</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-600">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600">Terms</Link></li>
                <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href={getToolUrl('Essay Writer', 'AI Write')} className="hover:text-blue-600">Essay Writer</Link></li>
                <li><Link href={getToolUrl('Content Improver', 'AI Write')} className="hover:text-blue-600">Content Improver</Link></li>
                <li><Link href={getToolUrl('Paragraph Writer', 'AI Write')} className="hover:text-blue-600">Paragraph AI Writer</Link></li>
                <li><Link href={getToolUrl('AI Image Generator', 'Image Tools')} className="hover:text-blue-600">AI Image Generator</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href={getToolUrl('Remove Background', 'Image Tools')} className="hover:text-blue-600">Remove Background from Image</Link></li>
                <li><Link href={getToolUrl('Upscale Image', 'Image Tools')} className="hover:text-blue-600">Upscale Image</Link></li>
                <li><Link href={getToolUrl('Compress PDF', 'Pdf Tools')} className="hover:text-blue-600">Compress PDF</Link></li>
                <li><Link href={getToolUrl('JPG to PDF', 'Image Tools')} className="hover:text-blue-600">JPG to PDF</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            © 2025 toolur. All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}