"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Minimize2,
  Maximize2,
  Crop,
  FilePlus,
  Type,
  Hash,
  Search
} from 'lucide-react';

interface Tool {
  icon: any;
  title: string;
  slug: string;
  description: string;
  color: string;
  iconColor: string;
  endpoint: string;
}

export default function ImageToolsGrid() {
  const [searchQuery, setSearchQuery] = useState('');

  // Only the 5 working Image tools (removed Image Compressor)
  const tools: Tool[] = [
    {
      icon: Maximize2,
      title: 'Resize Image',
      slug: 'image-resizer',
      description: 'Resize images to any dimensions',
      color: 'bg-pink-50',
      iconColor: 'text-pink-600',
      endpoint: '/api/image/resize'
    },
    {
      icon: Crop,
      title: 'Crop Image',
      slug: 'crop-image',
      description: 'Crop images to your desired size',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      endpoint: '/api/image/crop'
    },
    {
      icon: FilePlus,
      title: 'JPG to Word',
      slug: 'jpg-to-word',
      description: 'Convert JPG images to Word documents',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      endpoint: '/api/image/jpg-to-word'
    },
    {
      icon: Type,
      title: 'Image Text Converter',
      slug: 'image-text-converter',
      description: 'Extract text from images using OCR',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      endpoint: '/api/image/image-text-converter'
    },
    {
      icon: Hash,
      title: 'Word Counter',
      slug: 'word-counter',
      description: 'Count words in image text',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      endpoint: '/api/image/word-counter'
    }
  ];

  // Filter tools based on search query
  const filteredTools = tools.filter(tool => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search image tools"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-32 py-3 border border-gray-200 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon;
          // Map slugs to correct routes
          const getRoute = (slug: string) => {
            if (slug === 'image-compressor') return '/image-compressor';
            if (slug === 'image-resizer') return '/image-resizer';
            return `/image-editor/${slug}`;
          };
          return (
            <Link
              key={index}
              href={getRoute(tool.slug)}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 group"
            >
              <div className={`${tool.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${tool.iconColor}`} />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

