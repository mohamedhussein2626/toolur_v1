import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import PDFToolsGrid from '@/components/PDFToolsGrid';
import { getToolBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { FileText } from 'lucide-react';

// Force dynamic rendering to enable hot reload of MDX files
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PDFTools() {
  // Load MDX content
  const tool = getToolBySlug('pdf-editor');
  const frontmatter = tool?.frontmatter || { title: 'Pdf Tools', description: 'Free Online PDF Tools', category: 'PDF Tool' };
  const mdxContent = tool?.content || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-orange-400 rounded-full opacity-60" />
      <div className="absolute top-32 left-24 w-4 h-4 bg-blue-400 rounded opacity-60" />
      <div className="absolute top-24 right-32 w-6 h-6 bg-pink-400 rounded-full opacity-60" />
      <div className="absolute top-14 right-10 w-10 h-10 bg-pink-300 rounded-full opacity-60" />
      <div className="absolute top-[500px] right-20 w-5 h-5 bg-yellow-400 rotate-45 opacity-60" />
      <div className="absolute top-[300px] left-32 w-4 h-4 bg-pink-300 rounded-full opacity-60" />
      <div className="absolute bottom-[400px] right-48 w-6 h-6 bg-purple-400 opacity-60" />

      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: frontmatter.category, href: '/pdf-editor' },
          { label: frontmatter.title }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">{frontmatter.title}</h1>
          <p className="text-gray-600">{frontmatter.description}</p>
        </div>

        {/* Tools Grid with Search - Client Component */}
        <PDFToolsGrid />

        {/* MDX Content Section */}
        {mdxContent && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
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
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">toolur</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                toolur provides free online conversion, pdf, and other handy tools to help you solve problems of all types. All files both processed and unprocessed are deleted after 1 hour
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Navigate</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900">Tos</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/tools/essay-writer" className="hover:text-gray-900">Essay Writer</Link></li>
                <li><Link href="/tools/content-improver" className="hover:text-gray-900">Content Improver</Link></li>
                <li><Link href="/tools/paragraph-writer" className="hover:text-gray-900">Paragraph Writer</Link></li>
                <li><Link href="/tools/ai-image-generator" className="hover:text-gray-900">AI Image Generator</Link></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2 text-sm text-gray-600 mt-9">
                <li><Link href="/image-editor" className="hover:text-gray-900">Remove Background from Image</Link></li>
                <li><Link href="/pdf-editor" className="hover:text-gray-900">Merge PDF</Link></li>
                <li><Link href="/pdf-editor" className="hover:text-gray-900">Edit PDF</Link></li>
                <li><Link href="/pdf-editor" className="hover:text-gray-900">PDF to JPG</Link></li>
              </ul>
            </div>

            <div className="md:col-start-4">
              <ul className="space-y-2 text-sm text-gray-600 mt-9">
                <li><Link href="/pdf-editor" className="hover:text-gray-900">JPG to PDF</Link></li>
                <li><Link href="/image-editor" className="hover:text-gray-900">Upscale Image</Link></li>
                <li><Link href="/pdf-editor" className="hover:text-gray-900">Compress PDF</Link></li>
                <li><Link href="/tools/paragraph-completer" className="hover:text-gray-900">Paragraph Completer</Link></li>
              </ul>
            </div>

            <div className="md:col-start-5">
              <ul className="space-y-2 text-sm text-gray-600 mt-9">
                <li><Link href="/pdf-editor" className="hover:text-gray-900">Remove watermark</Link></li>
                <li><Link href="/tools/image-to-text" className="hover:text-gray-900">Image To Text</Link></li>
                <li><Link href="/pdf-editor" className="hover:text-gray-900">Split PDF</Link></li>
                <li><Link href="/tools" className="hover:text-gray-900">Others</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">J</span>
              </div>
              <span className="text-sm text-gray-600">toolur is a <Link href="#" className="text-blue-600 hover:underline">Jenni AI</Link> Company</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 toolur. All rights reserved
            </div>
            <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
