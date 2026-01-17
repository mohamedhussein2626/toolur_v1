import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/mdx';
import { getSchemaObjectBySlug } from '@/lib/schema';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('pdf-editor');

  if (!tool) {
    return {
      title: 'PDF Editor',
      description: 'Free online PDF tools',
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

export default function PDFEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = getSchemaObjectBySlug('pdf-editor');

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

