import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ToolFrontmatter {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical: string;
  category: string;
}

export interface ToolContent {
  frontmatter: ToolFrontmatter;
  content: string;
  slug: string;
}

const contentDirectory = path.join(process.cwd(), 'content/tools');

export function getAllToolSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export function getToolBySlug(slug: string): ToolContent | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: {
      title: data.title || '',
      description: data.description || '',
      ogTitle: data.ogTitle || data.title || '',
      ogDescription: data.ogDescription || data.description || '',
      ogImage: data.ogImage || '',
      canonical: data.canonical || (() => {
        // Use NEXT_PUBLIC_SITE_URL for production, fallback to localhost for development
        // If you set NEXT_PUBLIC_SITE_URL in your .env file, it will use that domain
        // Otherwise, you can hardcode the canonical URL in the MDX file's frontmatter
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        return `${baseUrl}/${slug}`;
      })(),
      category: data.category || 'Other Tools',
    },
    content,
    slug,
  };
}

export function getAllTools(): ToolContent[] {
  const slugs = getAllToolSlugs();
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolContent => tool !== null);
}

