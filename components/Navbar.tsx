"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu, X } from 'lucide-react';
import { categoryCards, getToolsByNavCategory, getToolUrl } from '@/lib/tools-data';

export default function Navbar() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavItem, setMobileNavItem] = useState<string | null>(null);

  const handleToolClick = (toolName: string) => {
    setMobileMenuOpen(false);
    setMobileNavItem(null);
    setHoveredNavItem(null);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-bold text-xl">
              toolur
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {/* PDF Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredNavItem('PDF')}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors">
                <span>PDF</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              {hoveredNavItem === 'PDF' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden"
                  onMouseEnter={() => setHoveredNavItem('PDF')}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <div className="max-h-[480px] overflow-y-auto">
                    <div className="p-2">
                      {getToolsByNavCategory('PDF').map((tool, idx) => (
                        <Link
                          key={idx}
                          href={getToolUrl(tool.name, tool.category)}
                          onClick={() => handleToolClick(tool.name)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors rounded-lg group/item"
                        >
                          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{tool.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1">{tool.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredNavItem('Image')}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors">
                <span>Image</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              {hoveredNavItem === 'Image' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden"
                  onMouseEnter={() => setHoveredNavItem('Image')}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <div className="max-h-[480px] overflow-y-auto">
                    <div className="p-2">
                      {getToolsByNavCategory('Image').map((tool, idx) => (
                        <Link
                          key={idx}
                          href={getToolUrl(tool.name, tool.category)}
                          onClick={() => handleToolClick(tool.name)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors rounded-lg group/item"
                        >
                          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{tool.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1">{tool.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Write Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredNavItem('Write')}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors">
                <span>Write</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              {hoveredNavItem === 'Write' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden"
                  onMouseEnter={() => setHoveredNavItem('Write')}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <div className="max-h-[480px] overflow-y-auto">
                    <div className="p-2">
                      {getToolsByNavCategory('Write').map((tool, idx) => (
                        <Link
                          key={idx}
                          href={getToolUrl(tool.name, tool.category)}
                          onClick={() => handleToolClick(tool.name)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 cursor-pointer transition-colors rounded-lg group/item"
                        >
                          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{tool.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1">{tool.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredNavItem('Video')}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors">
                <span>Video</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              {hoveredNavItem === 'Video' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden"
                  onMouseEnter={() => setHoveredNavItem('Video')}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <div className="max-h-[480px] overflow-y-auto">
                    <div className="p-2">
                      {getToolsByNavCategory('Video').map((tool, idx) => (
                        <Link
                          key={idx}
                          href={getToolUrl(tool.name, tool.category)}
                          onClick={() => handleToolClick(tool.name)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 cursor-pointer transition-colors rounded-lg group/item"
                        >
                          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{tool.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1">{tool.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* File Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredNavItem('File')}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors">
                <span>File</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              {hoveredNavItem === 'File' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden"
                  onMouseEnter={() => setHoveredNavItem('File')}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <div className="max-h-[480px] overflow-y-auto">
                    <div className="p-2">
                      {getToolsByNavCategory('File').map((tool, idx) => (
                        <Link
                          key={idx}
                          href={getToolUrl(tool.name, tool.category)}
                          onClick={() => handleToolClick(tool.name)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-teal-50 cursor-pointer transition-colors rounded-lg group/item"
                        >
                          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{tool.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1">{tool.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium">
            Sign In
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Dynamic Categories - Show all tools organized by category */}
            {categoryCards.map((category) => {
              const navKey = category.title === 'PDF Tools' ? 'PDF' : 
                            category.title === 'Image Tools' ? 'Image' :
                            category.title === 'AI Write' ? 'Write' :
                            category.title === 'Video Tools' ? 'Video' : 'File';
              const tools = getToolsByNavCategory(navKey);
              
              return (
                <div key={category.title}>
                  <button
                    onClick={() => setMobileNavItem(mobileNavItem === navKey ? null : navKey)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">{category.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${mobileNavItem === navKey ? 'rotate-90' : ''}`} />
                  </button>
                  {mobileNavItem === navKey && tools.length > 0 && (
                    <div className="pl-4 pr-2 py-2 space-y-1">
                      {tools.map((tool, idx) => (
                        <Link
                          key={idx}
                          href={getToolUrl(tool.name, tool.category)}
                          onClick={() => handleToolClick(tool.name)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                        >
                          <div className={`w-8 h-8 ${tool.color} rounded-lg flex items-center justify-center ${tool.iconColor} flex-shrink-0`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm">{tool.name}</h4>
                            <p className="text-xs text-gray-600 truncate">{tool.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Sign In Button */}
            <Link href="/login" className="w-full block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium mt-4 text-center">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

