"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  FileEdit, 
  Layers,
  Minimize2,
  FileImage,
  Lock,
  FileSpreadsheet,
  Presentation,
  Crop,
  Languages,
  Trash2,
  RotateCw,
  Download,
  PenTool,
  File,
  Shield,
  Droplet,
  StickyNote,
  MessageSquare,
  Smartphone,
  FileType,
  Mail,
  Type,
  Code,
  Search
} from 'lucide-react';

interface Tool {
  icon: any;
  title: string;
  category: string;
  description: string;
  color: string;
  iconColor: string;
}

export default function PDFToolsGrid() {
  const [searchQuery, setSearchQuery] = useState('');

  const tools: Tool[] = [
    {
      icon: Layers,
      title: 'Merge PDF',
      category: 'Pdf Tools',
      description: 'Merge 2 or more PDF files into a single PDF file',
      color: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: FileEdit,
      title: 'Edit PDF',
      category: 'Pdf Tools',
      description: 'Free PDF Editor',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: FileImage,
      title: 'PDF to JPG',
      category: 'Pdf Tools',
      description: 'Convert PDF to JPG and download each page as an image',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: FileText,
      title: 'JPG to PDF',
      category: 'Pdf Tools',
      description: 'Upload images and receive as a PDF',
      color: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    {
      icon: Minimize2,
      title: 'Compress PDF',
      category: 'Pdf Tools',
      description: 'Lessen the file size of a PDF file',
      color: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: FileText,
      title: 'Split PDF',
      category: 'Pdf Tools',
      description: 'Split into one or multiple PDF files',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: FileText,
      title: 'PDF to Word',
      category: 'Pdf Tools',
      description: 'Convert a PDF to Word Document',
      color: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      icon: Image,
      title: 'Change Background...',
      category: 'Image Tools',
      description: 'Change Background of Image',
      color: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: FileText,
      title: 'Word to PDF',
      category: 'Pdf Tools',
      description: 'Convert a Word Document to PDF',
      color: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: FileText,
      title: 'Excel to PDF',
      category: 'Pdf Tools',
      description: 'Upload an Excel spreadsheet and download as a PDF',
      color: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: FileText,
      title: 'EPUB to PDF',
      category: 'Pdf Tools',
      description: 'Convert EPUB file to PDF file',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Crop,
      title: 'Crop PDF',
      category: 'Pdf Tools',
      description: 'Free PDF Cropper',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: Languages,
      title: 'PDF Translator',
      category: 'Pdf Tools',
      description: 'Translate your pdf',
      color: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      icon: FileText,
      title: 'PDF to EPUB',
      category: 'Pdf Tools',
      description: 'Convert PDF file to EPUB file',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: Presentation,
      title: 'Powerpoint to PDF',
      category: 'Pdf Tools',
      description: 'Upload a Powerpoint presentation and download as a PDF',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Image,
      title: 'PDF to PNG',
      category: 'Pdf Tools',
      description: 'Convert PDF to PNG and download each page as an image',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Trash2,
      title: 'PDF Page Deleter',
      category: 'Pdf Tools',
      description: 'Delete 1 or more pages from a PDF',
      color: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      icon: FileText,
      title: 'URL to PDF',
      category: 'Pdf Tools',
      description: 'Enter a URL and receive the PC or mobile web page as a PDF',
      color: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      icon: RotateCw,
      title: 'Rotate PDF',
      category: 'Pdf Tools',
      description: 'Rotate one or more pages in a PDF file',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: FileText,
      title: 'Rearrange PDF',
      category: 'Pdf Tools',
      description: 'Rearrange pages of PDF file',
      color: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    {
      icon: Download,
      title: 'Extract Images PDF',
      category: 'Pdf Tools',
      description: 'Download the Images from a PDF',
      color: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: PenTool,
      title: 'eSign PDF',
      category: 'Pdf Tools',
      description: 'E-sign a PDF with a font or with your signature',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: File,
      title: 'Create PDF',
      category: 'Pdf Tools',
      description: 'Free PDF Creator',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Droplet,
      title: 'PDF Watermark Rem...',
      category: 'Pdf Tools',
      description: 'Remove Watermark from PDF',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: Shield,
      title: 'Protect PDF',
      category: 'Pdf Tools',
      description: 'Add a password to a PDF file',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: FileSpreadsheet,
      title: 'PDF to CSV',
      category: 'Pdf Tools',
      description: 'Extract tables from PDF to CSV',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: FileText,
      title: 'Add Numbers to PDF',
      category: 'Pdf Tools',
      description: 'Add page numbers to a PDF file',
      color: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      icon: Droplet,
      title: 'Add Watermark',
      category: 'Pdf Tools',
      description: 'Stamp an image over your PDF',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Image,
      title: 'IMAGES to PDF',
      category: 'Pdf Tools',
      description: 'Add Images to PDF online',
      color: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      icon: Image,
      title: 'HEIC to PDF',
      category: 'Pdf Tools',
      description: 'Upload images and receive as a PDF',
      color: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: StickyNote,
      title: 'Add Text',
      category: 'Pdf Tools',
      description: 'Add Text to PDF',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: MessageSquare,
      title: 'Annotate PDF',
      category: 'Pdf Tools',
      description: 'Free PDF Editor',
      color: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    {
      icon: FileText,
      title: 'TIFF to PDF',
      category: 'Pdf Tools',
      description: 'Upload images and receive as a PDF',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: FileText,
      title: 'MOBI to PDF',
      category: 'Pdf Tools',
      description: 'Convert MOBI file to PDF file',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'PDF to MOBI',
      category: 'Pdf Tools',
      description: 'Convert PDF file to MOBI file',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: FileType,
      title: 'PDF to TIFF',
      category: 'Pdf Tools',
      description: 'Convert PDF to TIFF and download each page as an image',
      color: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      icon: FileText,
      title: 'AZW3 to PDF',
      category: 'Pdf Tools',
      description: 'Convert AZW3 file to PDF file',
      color: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      icon: FileText,
      title: 'WEBP to PDF',
      category: 'Pdf Tools',
      description: 'Upload images and receive as a PDF',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: FileText,
      title: 'PDF to AZW3',
      category: 'Pdf Tools',
      description: 'Convert PDF file to AZW3 file',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: Mail,
      title: 'MS Outlook to PDF',
      category: 'Pdf Tools',
      description: 'Upload a MS Outlook file on Download as a PDF',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: Type,
      title: 'PDF to Text',
      category: 'Pdf Tools',
      description: 'Convert a PDF to Text',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: Image,
      title: 'GIF to PDF',
      category: 'Pdf Tools',
      description: 'Upload images and receive as a PDF',
      color: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: Code,
      title: 'Extract text from PDF',
      category: 'Pdf Tools',
      description: 'Extract text from PDF document',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    },
    {
      icon: FileText,
      title: 'EPS to PDF',
      category: 'Pdf Tools',
      description: 'Upload images and receive as a PDF',
      color: 'bg-green-50',
      iconColor: 'text-green-500'
    }
  ];

  // Filter tools based on search query
  const filteredTools = tools.filter(tool => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
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
            placeholder="Search"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {filteredTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 group"
            >
              <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${tool.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
              <p className="text-xs text-orange-500 font-medium mb-2">{tool.category}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
