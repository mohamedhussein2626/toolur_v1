import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import ImageToolsGrid from '@/components/ImageToolsGrid';
import { getToolBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { 
  CheckCircle, 
  Shield,
  Clock,
  Repeat,
  Lock,
  Globe,
  Star
} from 'lucide-react';

// Force dynamic rendering to enable hot reload of MDX files
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ImageEditor() {
  const tool = getToolBySlug('image-editor');
  const frontmatter = tool?.frontmatter || { title: 'Image Editor', description: 'Free online image editor', category: 'Image Tool' };
  const mdxContent = tool?.content || '';

  const conversionOptions = [
    ['JPEG to AVIF', 'JPEG to BMP', 'JPEG to EPS', 'JPEG to GIF'],
    ['JPEG to ICO', 'JPEG to JPG', 'JPEG to DDS', 'JPEG to MS'],
    ['JPEG to PNG', 'JPEG to PS', 'JPEG to PSD', 'JPEG to TGA'],
    ['JPEG to TIM', 'JPEG to WEBP']
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{frontmatter.title}</h1>
          <p className="text-gray-600 text-lg">{frontmatter.description}</p>
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

        {/* Tools Grid with Search - Client Component */}
        <ImageToolsGrid />

        {/* MDX Content Section */}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of image editing</h2>
          <div className="space-y-4">
            {[
              { icon: CheckCircle, text: 'Free and unlimited image editing with no watermarks' },
              { icon: Star, text: 'High-quality output comparing image details' },
              { icon: Repeat, text: 'Batch processing for multiple files at once' },
              { icon: Lock, text: 'Secure processing - your files are automatically deleted after editing' },
              { icon: Globe, text: 'No registration or software installation required - works in web browser' }
            ].map((benefit, index) => {
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
              <h3 className="font-semibold text-gray-900 mb-2">What is an image editor?</h3>
              <p className="text-gray-700">
                An image editor is an online tool that allows you to compress, resize, crop, and convert images. Our image editor 
                maintains file quality while ensuring fast and accurate editing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I edit images?</h3>
              <p className="text-gray-700">
                Editing images is simple: Upload your image file, select your desired operation (compress, resize, crop, or convert), 
                adjust settings if needed, and click process. Your file will be ready for download in seconds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is the image editor free?</h3>
              <p className="text-gray-700">
                Yes, our image editor is completely free to use. You can edit images without any cost or registration. 
                Premium features are available for users who want extra processing or larger files.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the maximum file size for image editing?</h3>
              <p className="text-gray-700">
                You can edit image files up to 100 MB. Need more? Upgrade to our premium plan for increased file size limits and 
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
