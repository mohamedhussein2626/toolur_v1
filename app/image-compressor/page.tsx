"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import { imageToolsApi } from '@/lib/api';
import { 
  Upload, 
  CheckCircle, 
  Shield,
  Clock,
  Lock,
  Globe,
  Star,
  Minimize2,
  Repeat,
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressionLevels = [
    ['High Quality (90%)', 'Medium Quality (70%)', 'Low Quality (50%)', 'Custom Quality'],
    ['Lossless Compression', 'Progressive JPEG', 'Optimize for Web', 'Optimize for Print']
  ];

  const benefits = [
    { icon: CheckCircle, text: 'Free and unlimited image compression with no watermarks' },
    { icon: Star, text: 'Maintain high quality while reducing file size significantly' },
    { icon: Repeat, text: 'Batch compress multiple images at once' },
    { icon: Lock, text: 'Secure processing - your files are automatically deleted after compression' },
    { icon: Globe, text: 'No registration or software installation required - works in web browser' }
  ];

  const steps = [
    'Upload your image file by clicking the upload button or using drag & drop',
    'Select your desired compression level (High, Medium, or Low quality)',
    'Adjust compression settings if needed to balance size and quality',
    'Click "Compress" and download your optimized image'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Image Tools', href: '/image-editor' },
          { label: 'Image Compressor' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Compressor</h1>
          <p className="text-gray-600">Free online image compressor</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white" />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-600 ml-2">Rated by 500+ users daily</span>
            </div>
          </div>
        </div>

        {/* Compressor Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">1</div>
              <span className="font-medium text-gray-900">Select File</span>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-gray-300" />
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">2</div>
              <span className="text-gray-600">Choose Quality</span>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-gray-300" />
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">3</div>
              <span className="text-gray-600">Compress</span>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Minimize2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
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
              <span>Fastest tool download</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Your files are safe, Learn how
            </p>
          </div>
        </div>

        {/* Compression Options */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Minimize2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Compression Options</h2>
          </div>
          <p className="text-gray-600 mb-6">Choose your preferred compression level to balance file size and quality</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {compressionLevels.flat().map((option, index) => {
              let optionQuality = 80;
              if (option.includes('90%')) optionQuality = 90;
              else if (option.includes('70%')) optionQuality = 70;
              else if (option.includes('50%')) optionQuality = 50;
              
              return (
                <button 
                  key={index}
                  onClick={() => setQuality(optionQuality)}
                  className={`bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border ${
                    quality === optionQuality ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  } text-sm font-medium transition-colors`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Process Button */}
        {file && !result && (
          <div className="text-center mb-8">
            <button
              onClick={async () => {
                if (!file) return;
                setLoading(true);
                setError(null);
                setResult(null);
                try {
                  const data = await imageToolsApi.compressImage(file, quality);
                  setResult(data);
                } catch (err: any) {
                  setError(err.message || 'An error occurred while compressing the image');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Compressing...
                </>
              ) : (
                'Compress Image'
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Compression Complete!</h3>
                {result.originalSize && result.compressedSize && (
                  <p className="text-sm text-green-700">
                    Original: {(result.originalSize / 1024 / 1024).toFixed(2)} MB → 
                    Compressed: {(result.compressedSize / 1024 / 1024).toFixed(2)} MB
                    {result.compressionRatio && ` (${result.compressionRatio})`}
                  </p>
                )}
              </div>
                     <button
                       onClick={() => {
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
                           a.download = 'compressed-image.jpg';
                           document.body.appendChild(a);
                           a.click();
                           document.body.removeChild(a);
                           URL.revokeObjectURL(url);
                         } catch (error) {
                           console.error('Download error:', error);
                           alert('Failed to download file. Please try again.');
                         }
                       }}
                       className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                     >
                       <Download className="w-5 h-5" />
                       Download
                     </button>
            </div>
          </div>
        )}

        {/* Back to Tools */}
        <div className="text-center mb-8">
          <Link
            href="/image-editor"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
          >
            ← Back to Image Tools
          </Link>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of image compression</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is an image compressor?</h3>
              <p className="text-gray-700">
                An image compressor is an online tool that reduces image file size while maintaining visual quality. Our image compressor 
                uses advanced algorithms to optimize images for web, email, and storage without noticeable quality loss.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I compress images?</h3>
              <p className="text-gray-700">
                Compressing images is simple: Upload your image file, select your desired compression level (high, medium, or low quality), 
                adjust settings if needed, and click compress. Your optimized image will be ready for download in seconds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is the image compressor free?</h3>
              <p className="text-gray-700">
                Yes, our image compressor is completely free to use. You can compress images without any cost or registration. 
                Premium features are available for users who want extra processing or larger files.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the maximum file size for image compression?</h3>
              <p className="text-gray-700">
                You can compress image files up to 100 MB. Need more? Upgrade to our premium plan for increased file size limits and 
                additional features for faster processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">toolur</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Fast, reliable converters for all your document, media and format needs - trusted globally.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">f</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">𝕏</div>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">TOOLS</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/tools/word-to-pdf" className="hover:text-gray-900">Word to PDF Converter</Link></li>
                <li><Link href="/tools/safe-audio" className="hover:text-gray-900">Safe Audio & Web Video</Link></li>
                <li><Link href="/tools/edit-pdf" className="hover:text-gray-900">Edit and Text from PDF</Link></li>
                <li><Link href="/tools/jpeg-converter" className="hover:text-gray-900">Jpeg Converter for Audio(MP3)</Link></li>
                <li><Link href="/tools/image-converter" className="hover:text-gray-900">Image Converter</Link></li>
                <li><Link href="/tools/file-merger" className="hover:text-gray-900">File Merger</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">SUPPORT</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-gray-900">FAQs</Link></li>
                <li><Link href="/roadmap" className="hover:text-gray-900">Roadmap Discord</Link></li>
                <li><Link href="/report-bug" className="hover:text-gray-900">Report a Bug</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/api" className="hover:text-gray-900">Developers API</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="/api-key" className="hover:text-gray-900">Get API Key</Link></li>
              </ul>
              <h3 className="font-semibold text-gray-900 mb-4 mt-6">COMPANY</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/trust" className="hover:text-gray-900">Trust at Port242</Link></li>
                <li><Link href="/team" className="hover:text-gray-900">Our Team</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-gray-900">Cookie Policy</Link></li>
                <li><Link href="/gdpr" className="hover:text-gray-900">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            <p>© 2025 toolur. All rights reserved</p>
            <p className="mt-2">Terms and Conditions  -  Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

