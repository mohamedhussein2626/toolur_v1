import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/mdx';
import { getSchemaObjectBySlug } from '@/lib/schema';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('image-compressor');

  if (!tool) {
    return {
      title: 'Image Compressor',
      description: 'Free online image compressor',
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

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = getSchemaObjectBySlug('image-compressor');

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  );
}

