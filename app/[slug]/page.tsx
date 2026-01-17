import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getAllToolSlugs } from '@/lib/mdx';
import { getSchemaObjectBySlug } from '@/lib/schema';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Force dynamic rendering to enable hot reload of MDX files
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export async function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    };
  }

  const { frontmatter } = tool;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.ogTitle || frontmatter.title,
      description: frontmatter.ogDescription || frontmatter.description,
      images: frontmatter.ogImage ? [{ url: frontmatter.ogImage }] : [],
      type: 'website',
    },
    alternates: {
      canonical: frontmatter.canonical,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const { frontmatter, content } = tool;
  const schema = getSchemaObjectBySlug(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { 
            label: frontmatter.category, 
            href: frontmatter.category === 'PDF Tool' ? '/pdf-editor' : 
                  frontmatter.category === 'Image Tool' ? '/image-editor' : 
                  undefined 
          },
          { label: frontmatter.title }
        ]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{frontmatter.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{frontmatter.description}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {frontmatter.category}
              </span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <MDXRemote 
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 toolur. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

