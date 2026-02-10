"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  Crop,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function CropPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [cropParams, setCropParams] = useState({ x: 0, y: 0, width: 500, height: 500 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (file && canvasRef.current) {
      loadPdfPreview();
    }
  }, [file, selectedPage]);

  const loadPdfPreview = async () => {
    if (!file || !canvasRef.current) return;
    
    try {
      // Use pdf-lib to get page count and render preview
      const arrayBuffer = await file.arrayBuffer();
      const { PDFDocument } = require('pdf-lib');
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      setPdfPages(pages.length);
      
      // For preview, we'll just show page info (full rendering requires pdf.js)
      const page = pages[selectedPage - 1];
      const { width, height } = page.getSize();
      setCropParams(prev => ({
        ...prev,
        width: Math.min(prev.width, width),
        height: Math.min(prev.height, height)
      }));
    } catch (err) {
      console.error('Error loading PDF:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
      setSelectedPage(1);
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
      const data = await pdfToolsApi.cropPdf(
        file,
        selectedPage,
        cropParams.x,
        cropParams.y,
        cropParams.width,
        cropParams.height
      );
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while cropping the PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result?.file) return;
    
    try {
      let base64Data = result.file;
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1];
      }
      
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cropped.pdf';
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
          { label: 'Crop PDF' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Crop className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop PDF</h1>
          <p className="text-gray-600 text-lg">Crop PDF pages to your desired size</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">1</div>
              <span className="font-medium text-gray-900">Select File</span>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-gray-300" />
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">2</div>
              <span className="text-gray-600">Set Crop Area</span>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-gray-300" />
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">3</div>
              <span className="text-gray-600">Crop</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
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
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
                {pdfPages > 0 && (
                  <p className="text-sm text-blue-600 mt-2">
                    PDF has {pdfPages} page{pdfPages !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* PDF Preview and Crop Parameters */}
          {file && pdfPages > 0 && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {Array.from({ length: pdfPages }, (_, i) => i + 1).map((pageNum) => (
                    <option key={pageNum} value={pageNum}>
                      Page {pageNum}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  <FileText className="w-5 h-5 inline mr-2" />
                  PDF Preview - Page {selectedPage} of {pdfPages}
                </p>
                <canvas ref={canvasRef} className="hidden" />
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">PDF Page {selectedPage}</p>
                  <p className="text-xs text-gray-400 mt-1">Crop parameters will be applied to this page</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">X Position</label>
                  <input
                    type="number"
                    value={cropParams.x}
                    onChange={(e) => setCropParams({ ...cropParams, x: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Y Position</label>
                  <input
                    type="number"
                    value={cropParams.y}
                    onChange={(e) => setCropParams({ ...cropParams, y: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                  <input
                    type="number"
                    value={cropParams.width}
                    onChange={(e) => setCropParams({ ...cropParams, width: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                  <input
                    type="number"
                    value={cropParams.height}
                    onChange={(e) => setCropParams({ ...cropParams, height: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>
              </div>
            </div>
          )}

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

        {file && !result && (
          <div className="text-center mb-8">
            <button
              onClick={handleProcess}
              disabled={loading || pdfPages === 0}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Crop PDF'
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Cropping Complete!</h3>
                {result.metadata && (
                  <p className="text-sm text-green-700">
                    Pages: {result.metadata.pageCount}
                  </p>
                )}
              </div>
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>
        )}

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

