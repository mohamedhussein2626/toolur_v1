import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/mdx';
import { getSchemaObjectBySlug } from '@/lib/schema';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('image-resizer');

  if (!tool) {
    return {
      title: 'Image Resizer',
      description: 'Free online image resizer',
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

export default function ImageResizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = getSchemaObjectBySlug('image-resizer');

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

