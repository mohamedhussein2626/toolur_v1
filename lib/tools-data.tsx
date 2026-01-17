import React from 'react';
import { 
  FileText, 
  Image, 
  Edit3, 
  Video, 
  Folder,
  Copy,
  Minimize2,
  Sparkles,
  FileImage,
  Crop,
  Maximize2,
  RefreshCw
} from 'lucide-react';

export const categoryCards = [
  { title: 'PDF Tools', subtitle: 'Solve Your PDF Problems', color: 'bg-purple-500', count: '68 Tools', icon: FileText, filterKey: 'Pdf Tools' },
  { title: 'Image Tools', subtitle: 'Solve Your Image Problems', color: 'bg-orange-500', count: '46 Tools', icon: Image, filterKey: 'Image Tools' },
  { title: 'Video Tools', subtitle: 'Solve Your Video Needs Now', color: 'bg-pink-500', count: '23 Tools', icon: Video, filterKey: 'Video Tools' },
  { title: 'AI Write', subtitle: 'Write Your Text Problems', color: 'bg-blue-500', count: '12 Tools', icon: Edit3, filterKey: 'AI Write' },
  { title: 'File Tools', subtitle: 'Solve Your File Problems', color: 'bg-teal-600', count: '18 Tools', icon: Folder, filterKey: 'Other Tools' }
];

export const popularTools = [
  { icon: <Edit3 className="w-5 h-5" />, name: 'Essay Writer', category: 'AI Write', desc: 'Easily create an essay AI', color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { icon: <Sparkles className="w-5 h-5" />, name: 'Content Improver', category: 'AI Write', desc: 'Improve your content', color: 'bg-green-100', iconColor: 'text-green-600' },
  { icon: <Edit3 className="w-5 h-5" />, name: 'Paragraph Writer', category: 'AI Write', desc: 'Paragraph Writer', color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { icon: <Sparkles className="w-5 h-5" />, name: 'AI Image Generator', category: 'Image Tools', desc: 'Image Generator', color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { icon: <Image className="w-5 h-5" />, name: 'Remove Background', category: 'Image Tools', desc: 'Easily Remove the Background from an Image', color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: <Minimize2 className="w-5 h-5" />, name: 'Image Compressor', category: 'Image Tools', desc: 'Compress images to reduce file size', color: 'bg-orange-100', iconColor: 'text-orange-600' },
  { icon: <Maximize2 className="w-5 h-5" />, name: 'Image Resizer', category: 'Image Tools', desc: 'Resize images to any dimensions', color: 'bg-pink-100', iconColor: 'text-pink-600' },
  { icon: <Crop className="w-5 h-5" />, name: 'Image Cropper', category: 'Image Tools', desc: 'Crop images to your desired size', color: 'bg-green-100', iconColor: 'text-green-600' },
  { icon: <RefreshCw className="w-5 h-5" />, name: 'Image Converter', category: 'Image Tools', desc: 'Convert images between different formats', color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { icon: <Copy className="w-5 h-5" />, name: 'Merge PDF', category: 'Pdf Tools', desc: 'Merge 2 or more PDF files into 1', color: 'bg-orange-100', iconColor: 'text-orange-600' },
  { icon: <FileText className="w-5 h-5" />, name: 'Edit PDF', category: 'Pdf Tools', desc: 'I Edit PDF Online', color: 'bg-green-100', iconColor: 'text-green-600' },
  { icon: <FileImage className="w-5 h-5" />, name: 'PDF to JPG', category: 'Pdf Tools', desc: 'Convert PDF to JPG and extract each page as an image', color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: <Image className="w-5 h-5" />, name: 'JPG to PDF', category: 'Image Tools', desc: 'Upload images and receive as a PDF file', color: 'bg-red-100', iconColor: 'text-red-600' },
  { icon: <Image className="w-5 h-5" />, name: 'Upscale Image', category: 'Image Tools', desc: 'Increase the resolution of your image', color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: <Minimize2 className="w-5 h-5" />, name: 'Compress PDF', category: 'Pdf Tools', desc: 'Lessen the file size of a PDF file', color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { icon: <FileText className="w-5 h-5" />, name: 'Paragraph Completer', category: 'AI Write', desc: 'Paragraph Completer', color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { icon: <Video className="w-5 h-5" />, name: 'Trim Video', category: 'Video Tools', desc: 'Trim and cut video files', color: 'bg-pink-100', iconColor: 'text-pink-600' },
  { icon: <Video className="w-5 h-5" />, name: 'Merge Video', category: 'Video Tools', desc: 'Merge multiple video files', color: 'bg-red-100', iconColor: 'text-red-600' },
  { icon: <Video className="w-5 h-5" />, name: 'Video Converter', category: 'Converter Tools', desc: 'Convert video to different formats', color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: <FileText className="w-5 h-5" />, name: 'Split PDF', category: 'Pdf Tools', desc: 'Split PDF into multiple files', color: 'bg-teal-100', iconColor: 'text-teal-600' },
  { icon: <Folder className="w-5 h-5" />, name: 'File Converter', category: 'Converter Tools', desc: 'Convert files between formats', color: 'bg-gray-100', iconColor: 'text-gray-600' },
  { icon: <Folder className="w-5 h-5" />, name: 'File Compressor', category: 'Other Tools', desc: 'Compress files to reduce size', color: 'bg-purple-100', iconColor: 'text-purple-600' }
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
    case 'Write':
      categoryFilter = ['AI Write'];
      break;
    case 'Video':
      categoryFilter = ['Video Tools'];
      break;
    case 'File':
      categoryFilter = ['Other Tools', 'Converter Tools'];
      break;
    default:
      return [];
  }
  
  return popularTools.filter(tool => categoryFilter.includes(tool.category));
};

