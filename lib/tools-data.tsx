import React from 'react';
import { 
  Image,
  FileText,
  Minimize2,
  Maximize2,
  Crop,
  FileImage,
  FilePlus,
  Scissors,
  Wand2,
  Type,
  Hash
} from 'lucide-react';

export const categoryCards = [
  { title: 'PDF Tools', subtitle: 'Solve Your PDF Problems', color: 'bg-purple-500', count: '6 Tools', icon: FileText, filterKey: 'Pdf Tools' },
  { title: 'Image Tools', subtitle: 'Solve Your Image Problems', color: 'bg-orange-500', count: '6 Tools', icon: Image, filterKey: 'Image Tools' }
];

// Only the working tools from backend API
export const popularTools = [
  // Image Tools
  { 
    icon: <Minimize2 className="w-5 h-5" />, 
    name: 'Compress Image', 
    category: 'Image Tools', 
    desc: 'Compress images to reduce file size', 
    color: 'bg-orange-100', 
    iconColor: 'text-orange-600',
    endpoint: '/api/image/compress',
    toolType: 'image'
  },
  { 
    icon: <Maximize2 className="w-5 h-5" />, 
    name: 'Resize Image', 
    category: 'Image Tools', 
    desc: 'Resize images to any dimensions', 
    color: 'bg-pink-100', 
    iconColor: 'text-pink-600',
    endpoint: '/api/image/resize',
    toolType: 'image'
  },
  { 
    icon: <Crop className="w-5 h-5" />, 
    name: 'Crop Image', 
    category: 'Image Tools', 
    desc: 'Crop images to your desired size', 
    color: 'bg-green-100', 
    iconColor: 'text-green-600',
    endpoint: '/api/image/crop',
    toolType: 'image'
  },
  { 
    icon: <FilePlus className="w-5 h-5" />, 
    name: 'JPG to Word', 
    category: 'Image Tools', 
    desc: 'Convert JPG images to Word documents', 
    color: 'bg-blue-100', 
    iconColor: 'text-blue-600',
    endpoint: '/api/image/jpg-to-word',
    toolType: 'image'
  },
  { 
    icon: <Type className="w-5 h-5" />, 
    name: 'Image Text Converter', 
    category: 'Image Tools', 
    desc: 'Extract text from images using OCR', 
    color: 'bg-indigo-100', 
    iconColor: 'text-indigo-600',
    endpoint: '/api/image/image-text-converter',
    toolType: 'image'
  },
  { 
    icon: <Hash className="w-5 h-5" />, 
    name: 'Word Counter', 
    category: 'Image Tools', 
    desc: 'Count words in image text', 
    color: 'bg-purple-100', 
    iconColor: 'text-purple-600',
    endpoint: '/api/image/word-counter',
    toolType: 'image'
  },
  // PDF Tools
  { 
    icon: <FileImage className="w-5 h-5" />, 
    name: 'PDF to JPG', 
    category: 'Pdf Tools', 
    desc: 'Convert PDF pages to JPG images', 
    color: 'bg-blue-100', 
    iconColor: 'text-blue-600',
    endpoint: '/api/pdf/pdf-to-jpg',
    toolType: 'pdf'
  },
  { 
    icon: <Minimize2 className="w-5 h-5" />, 
    name: 'Compress PDF', 
    category: 'Pdf Tools', 
    desc: 'Reduce PDF file size', 
    color: 'bg-purple-100', 
    iconColor: 'text-purple-600',
    endpoint: '/api/pdf/compress',
    toolType: 'pdf'
  },
  { 
    icon: <Scissors className="w-5 h-5" />, 
    name: 'Split PDF', 
    category: 'Pdf Tools', 
    desc: 'Split PDF into multiple files', 
    color: 'bg-teal-100', 
    iconColor: 'text-teal-600',
    endpoint: '/api/pdf/split',
    toolType: 'pdf'
  },
  { 
    icon: <FileText className="w-5 h-5" />, 
    name: 'PDF to Word', 
    category: 'Pdf Tools', 
    desc: 'Convert PDF to Word document', 
    color: 'bg-green-100', 
    iconColor: 'text-green-600',
    endpoint: '/api/pdf/pdf-to-word',
    toolType: 'pdf'
  },
  { 
    icon: <Crop className="w-5 h-5" />, 
    name: 'Crop PDF', 
    category: 'Pdf Tools', 
    desc: 'Crop PDF pages', 
    color: 'bg-orange-100', 
    iconColor: 'text-orange-600',
    endpoint: '/api/pdf/crop',
    toolType: 'pdf'
  },
  { 
    icon: <FilePlus className="w-5 h-5" />, 
    name: 'Word to PDF', 
    category: 'Pdf Tools', 
    desc: 'Convert Word documents to PDF', 
    color: 'bg-red-100', 
    iconColor: 'text-red-600',
    endpoint: '/api/pdf/word-to-pdf',
    toolType: 'pdf'
  }
];

// Helper function to generate tool slug from name
export const getToolSlug = (toolName: string) => {
  return toolName.toLowerCase().replace(/\s+/g, '-');
};

// Get tool URL - all image tools go to /image-editor, all PDF tools go to /pdf-editor
export const getToolUrl = (toolName: string, category?: string) => {
  // Route all image tools to /image-editor
  if (category === 'Image Tools') {
    return '/image-editor';
  }
  // Route all PDF tools to /pdf-editor
  if (category === 'Pdf Tools') {
    return '/pdf-editor';
  }
  return `/tools/${getToolSlug(toolName)}`;
};

// Get tools for navigation dropdowns
export const getToolsByNavCategory = (navCategory: string) => {
  let categoryFilter: string[] = [];
  
  switch(navCategory) {
    case 'PDF':
      categoryFilter = ['Pdf Tools'];
      break;
    case 'Image':
      categoryFilter = ['Image Tools'];
      break;
    default:
      return [];
  }
  
  return popularTools.filter(tool => categoryFilter.includes(tool.category));
};
