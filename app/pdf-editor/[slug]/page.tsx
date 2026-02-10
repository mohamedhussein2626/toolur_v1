"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import { pdfToolsApi } from '@/lib/api';
import { 
  Upload, 
  CheckCircle, 
  Shield,
  Clock,
  Download,
  Loader2,
  FileText,
  Minimize2,
  Scissors,
  FileImage,
  Crop,
  FilePlus,
  AlertCircle
} from 'lucide-react';

const toolConfigs: Record<string, {
  title: string;
  description: string;
  icon: any;
  steps: string[];
  processFn: (file: File, params?: any) => Promise<any>;
}> = {
  'pdf-to-word': {
    title: 'PDF to Word',
    description: 'Convert PDF to Word document',
    icon: FileText,
    steps: ['Select File', 'Convert', 'Download'],
    processFn: (file: File) => pdfToolsApi.pdfToWord(file),
  },
  'word-to-pdf': {
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF',
    icon: FilePlus,
    steps: ['Select File', 'Convert', 'Download'],
    processFn: (file: File) => pdfToolsApi.wordToPdf(file),
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: FileImage,
    steps: ['Select File', 'Convert', 'Download'],
    processFn: (file: File, pageNumber?: number) => pdfToolsApi.pdfToJpg(file, pageNumber),
  },
};

export default function PDFToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);
  
  const toolConfig = toolConfigs[slug];
  
  if (!slug || !toolConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const Icon = toolConfig.icon;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let params: any = {};
      
      // For PDF to JPG, check if pageNumber is provided
      if (slug === 'pdf-to-jpg') {
        const pageInput = document.querySelector<HTMLInputElement>('input[type="number"]');
        if (pageInput && pageInput.value) {
          params = parseInt(pageInput.value);
        }
      }

      const data = await toolConfig.processFn(file, params);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing the file');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result?.file && !result?.files) return;
    
    try {
      // Handle multiple files (for PDF to JPG)
      if (result.files && Array.isArray(result.files)) {
        result.files.forEach((fileData: any, index: number) => {
          let base64Data = fileData.file;
          if (base64Data.includes(',')) {
            base64Data = base64Data.split(',')[1];
          }
          
          const binaryString = atob(base64Data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          const mimeType = fileData.fileType || 'image/jpeg';
          const blob = new Blob([bytes], { type: mimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileData.filename || `page-${index + 1}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
        return;
      }
      
      // Handle single file
      let base64Data = result.file;
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1];
      }
      
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Determine MIME type based on fileType, filename, or slug
      let mimeType = result.fileType;
      if (!mimeType) {
        if (result.filename?.endsWith('.docx')) {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else if (result.filename?.endsWith('.jpg') || result.filename?.endsWith('.jpeg')) {
          mimeType = 'image/jpeg';
        } else if (slug === 'pdf-to-jpg') {
          mimeType = 'image/jpeg';
        } else {
          mimeType = 'application/pdf';
        }
      }
      
      // Determine filename based on result or slug
      let filename = result.filename;
      if (!filename) {
        if (slug === 'pdf-to-jpg') {
          filename = 'page-1.jpg';
        } else if (slug === 'pdf-to-word') {
          filename = 'converted.docx';
        } else if (slug === 'word-to-pdf') {
          filename = 'converted.pdf';
        } else {
          filename = 'processed.pdf';
        }
      }
      
      const blob = new Blob([bytes], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Breadcrumb 
        items={[
          { label: 'PDF Tools', href: '/pdf-editor' },
          { label: toolConfig.title }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{toolConfig.title}</h1>
          <p className="text-gray-600 text-lg">{toolConfig.description}</p>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            {toolConfig.steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4">
                  <div className={`${index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-full w-10 h-10 flex items-center justify-center font-semibold`}>
                    {index + 1}
                  </div>
                  <span className={`${index === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{step}</span>
                </div>
                {index < toolConfig.steps.length - 1 && (
                  <div className="flex-1 mx-4 border-t-2 border-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mb-2"
            >
              Select File
            </button>
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>256-bit SSL encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>No size limits</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span>Fast processing</span>
            </div>
          </div>
        </div>

        {/* Process Button */}
        {file && !result && (
          <div className="text-center mb-8">
            <button
              onClick={handleProcess}
              disabled={loading}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Process ${toolConfig.title}`
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Processing Complete!</h3>
                {result.message && (
                  <p className="text-sm text-green-700">{result.message}</p>
                )}
                {result.originalSize && result.compressedSize && (
                  <p className="text-sm text-green-700">
                    Original: {(result.originalSize / 1024 / 1024).toFixed(2)} MB → 
                    Compressed: {(result.compressedSize / 1024 / 1024).toFixed(2)} MB
                    {result.compressionRatio && ` (${result.compressionRatio})`}
                  </p>
                )}
                {result.files && result.files.length > 0 && (
                  <p className="text-sm text-green-700">
                    {result.files.length} file{result.files.length !== 1 ? 's' : ''} ready to download
                  </p>
                )}
              </div>
              {(result.file || (result.files && result.files.length > 0)) && (
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {result.files && result.files.length > 1 ? `Download All (${result.files.length})` : 'Download'}
                </button>
              )}
            </div>
            {result.files && result.files.length > 1 && (
              <div className="mt-4 space-y-2">
                {result.files.map((fileData: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{fileData.filename}</p>
                      {fileData.pageNumber && (
                        <p className="text-sm text-gray-600">Page {fileData.pageNumber}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        let base64Data = fileData.file;
                        if (base64Data.includes(',')) {
                          base64Data = base64Data.split(',')[1];
                        }
                        const binaryString = atob(base64Data);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                          bytes[i] = binaryString.charCodeAt(i);
                        }
                        const blob = new Blob([bytes], { type: fileData.fileType || 'image/jpeg' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = fileData.filename || `page-${index + 1}.jpg`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Back to Tools */}
        <div className="text-center">
          <Link
            href="/pdf-editor"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
          >
            ← Back to PDF Tools
          </Link>
        </div>
      </div>
    </div>
  );
}

