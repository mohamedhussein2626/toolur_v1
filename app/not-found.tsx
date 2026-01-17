import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">This page is under development</h1>
          <p className="text-gray-600 mb-8">
            We're working hard to bring you this feature. Please check back soon!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Home
          </Link>
          <Link
            href="/image-editor"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Tools
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

