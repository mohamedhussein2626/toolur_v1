import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import { getToolBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { 
  Upload, 
  CheckCircle, 
  Shield,
  Clock,
  Lock,
  Globe,
  Star,
  Minimize2,
  Repeat
} from 'lucide-react';

// Force dynamic rendering to enable hot reload of MDX files
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ImageCompressor() {
  const tool = getToolBySlug('image-compressor');
  const frontmatter = tool?.frontmatter || { title: 'Image Compressor', description: 'Free online image compressor', category: 'Image Tool' };
  const mdxContent = tool?.content || '';

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
          { label: frontmatter.category, href: '/image-editor' },
          { label: frontmatter.title }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{frontmatter.title}</h1>
          <p className="text-gray-600">{frontmatter.description}</p>
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
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Select File
            </button>
            <p className="text-xs text-gray-500 mt-3">🔒 Your file size: ZIP file</p>
            <p className="text-xs text-blue-600">CloudMellow AI - Scan file to detect virus and BOB</p>
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
            {compressionLevels.flat().map((option, index) => (
              <button 
                key={index}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* MDX Content Section - Replaces About Section */}
        {mdxContent && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <MDXRemote 
                source={mdxContent}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </div>
        )}

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

