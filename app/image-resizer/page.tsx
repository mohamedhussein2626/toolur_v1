"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import { imageToolsApi } from '@/lib/api';
import { 
  Upload, 
  CheckCircle, 
  Shield,
  Clock,
  Maximize2,
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalSize({ width: img.width, height: img.height });
          if (!width && !height) {
            setWidth(img.width);
            setHeight(img.height);
          }
          updatePreview(img, width || img.width, height || img.height);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    if (file && originalSize && (width || height)) {
      const img = new Image();
      img.onload = () => {
        updatePreview(img, width || img.width, height || img.height);
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, [width, height, maintainAspectRatio, file, originalSize]);

  const updatePreview = (img: HTMLImageElement, targetWidth: number, targetHeight: number) => {
    if (!canvasRef.current || !originalSize) return;

    let finalWidth = targetWidth;
    let finalHeight = targetHeight;

    if (maintainAspectRatio && originalSize) {
      const aspectRatio = originalSize.width / originalSize.height;
      if (width && !height) {
        finalHeight = Math.round(width / aspectRatio);
      } else if (height && !width) {
        finalWidth = Math.round(height * aspectRatio);
      } else if (width && height) {
        const widthRatio = width / originalSize.width;
        const heightRatio = height / originalSize.height;
        const ratio = Math.min(widthRatio, heightRatio);
        finalWidth = Math.round(originalSize.width * ratio);
        finalHeight = Math.round(originalSize.height * ratio);
      }
    }

    const canvas = canvasRef.current;
    canvas.width = finalWidth;
    canvas.height = finalHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.9));
    }
  };

  const resizeOptions = [
    ['1920x1080 (Full HD)', '1280x720 (HD)', '1024x768 (Standard)', '800x600'],
    ['640x480 (VGA)', '320x240 (QVGA)', 'Custom Size', 'Maintain Aspect Ratio'],
  ];

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    if (!width && !height) {
      setError('Please specify width or height');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await imageToolsApi.resizeImage(file, width, height, maintainAspectRatio);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while resizing the image');
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
      
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resized-image.jpg';
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
          { label: 'Image Tools', href: '/image-editor' },
          { label: 'Image Resizer' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
              <Maximize2 className="w-8 h-8 text-pink-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Image Resizer</h1>
          <p className="text-gray-600 text-lg">Resize images to any dimensions with live preview</p>
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
              <span className="text-gray-600">Set Size</span>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-gray-300" />
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">3</div>
              <span className="text-gray-600">Resize</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                  setError(null);
                  setResult(null);
                }
              }}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Select File
            </button>
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

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

        {/* Resize Options */}
        {file && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Maximize2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Resize Options</h2>
            </div>
            <p className="text-gray-600 mb-6">Choose from preset sizes or set custom dimensions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {resizeOptions.flat().map((option, index) => {
                let optionWidth: number | undefined;
                let optionHeight: number | undefined;
                
                if (option.includes('1920x1080')) { optionWidth = 1920; optionHeight = 1080; }
                else if (option.includes('1280x720')) { optionWidth = 1280; optionHeight = 720; }
                else if (option.includes('1024x768')) { optionWidth = 1024; optionHeight = 768; }
                else if (option.includes('800x600')) { optionWidth = 800; optionHeight = 600; }
                else if (option.includes('640x480')) { optionWidth = 640; optionHeight = 480; }
                else if (option.includes('320x240')) { optionWidth = 320; optionHeight = 240; }
                
                return (
                  <button 
                    key={index}
                    onClick={() => {
                      if (optionWidth && optionHeight) {
                        setWidth(optionWidth);
                        setHeight(optionHeight);
                      }
                    }}
                    className={`bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border ${
                      width === optionWidth && height === optionHeight ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    } text-sm font-medium transition-colors`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (px)</label>
                <input
                  type="number"
                  value={width || ''}
                  onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Auto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
                <input
                  type="number"
                  value={height || ''}
                  onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Auto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="maintainAspect"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="maintainAspect" className="text-sm text-gray-700">Maintain Aspect Ratio</label>
            </div>
          </div>
        )}

        {/* Live Preview */}
        {file && originalSize && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Original ({originalSize.width} × {originalSize.height}px)</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Original"
                  className="w-full border border-gray-200 rounded-lg max-h-96 object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Preview {width && height ? `(${width} × ${height}px)` : width ? `(${width}px width)` : height ? `(${height}px height)` : ''}
                </p>
                <canvas ref={canvasRef} className="hidden" />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full border border-gray-200 rounded-lg max-h-96 object-contain"
                  />
                ) : (
                  <div className="w-full h-64 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    Adjust size to see preview
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Process Button */}
        {file && !result && (
          <div className="text-center mb-8">
            <button
              onClick={handleProcess}
              disabled={loading || (!width && !height)}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resizing...
                </>
              ) : (
                'Resize Image'
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
                <h3 className="font-semibold text-green-900 mb-2">Resize Complete!</h3>
                {result.metadata && (
                  <p className="text-sm text-green-700">
                    Size: {result.metadata.width} × {result.metadata.height}px
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
            href="/image-editor"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
          >
            ← Back to Image Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
