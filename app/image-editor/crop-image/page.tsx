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
  Download,
  Loader2,
  Crop,
  AlertCircle
} from 'lucide-react';

export default function CropImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (imageRef.current && imageSrc) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        // Set initial crop area to center
        const initialWidth = Math.min(400, img.width * 0.5);
        const initialHeight = Math.min(400, img.height * 0.5);
        setCropArea({
          x: (img.width - initialWidth) / 2,
          y: (img.height - initialHeight) / 2,
          width: initialWidth,
          height: initialHeight
        });
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const getMousePos = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const imgRect = imageRef.current.getBoundingClientRect();
    const scaleX = imageSize.width / imgRect.width;
    const scaleY = imageSize.height / imgRect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageSrc) return;
    setIsDragging(true);
    const pos = getMousePos(e);
    setStartPos(pos);
    setCropArea({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageSrc) return;
    const pos = getMousePos(e);
    setCropArea({
      x: Math.min(startPos.x, pos.x),
      y: Math.min(startPos.y, pos.y),
      width: Math.abs(pos.x - startPos.x),
      height: Math.abs(pos.y - startPos.y)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (cropArea.width === 0 || cropArea.height === 0) {
      setError('Please select a crop area');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await imageToolsApi.cropImage(
        file,
        Math.round(cropArea.x),
        Math.round(cropArea.y),
        Math.round(cropArea.width),
        Math.round(cropArea.height)
      );
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while cropping the image');
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
      a.download = 'cropped-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const getCropStyle = () => {
    if (!imageRef.current || !containerRef.current) return {};
    const imgRect = imageRef.current.getBoundingClientRect();
    const scaleX = imgRect.width / imageSize.width;
    const scaleY = imgRect.height / imageSize.height;
    return {
      left: `${cropArea.x * scaleX}px`,
      top: `${cropArea.y * scaleY}px`,
      width: `${cropArea.width * scaleX}px`,
      height: `${cropArea.height * scaleY}px`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Breadcrumb 
        items={[
          { label: 'Image Tools', href: '/image-editor' },
          { label: 'Crop Image' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Crop className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Image</h1>
          <p className="text-gray-600 text-lg">Drag to select the area you want to crop</p>
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
              <span className="text-gray-600">Select Crop Area</span>
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
              accept="image/*"
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

          {/* Interactive Crop Area */}
          {imageSrc && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Crop Area (Click and Drag)</h3>
              <div 
                ref={containerRef}
                className="relative inline-block max-w-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: 'crosshair' }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Original"
                  className="max-w-full h-auto border border-gray-300 rounded-lg"
                  draggable={false}
                />
                {cropArea.width > 0 && cropArea.height > 0 && (
                  <div
                    className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
                    style={getCropStyle()}
                  >
                    <div className="absolute -top-6 left-0 text-xs text-blue-600 font-medium bg-white px-2 py-1 rounded">
                      {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px
                    </div>
                  </div>
                )}
              </div>
              {cropArea.width > 0 && cropArea.height > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Crop Area: {Math.round(cropArea.x)}, {Math.round(cropArea.y)} - {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px</p>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {result && result.file && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cropped Result</h3>
              <img
                src={`data:image/jpeg;base64,${result.file}`}
                alt="Cropped"
                className="max-w-full h-auto border border-gray-300 rounded-lg"
              />
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
              disabled={loading || cropArea.width === 0 || cropArea.height === 0}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Crop Image'
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
                    Size: {result.metadata.width} x {result.metadata.height}px
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
