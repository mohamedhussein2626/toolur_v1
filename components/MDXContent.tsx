import { getToolBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  slug: string;
  className?: string;
}

export function MDXContent({ slug, className = '' }: MDXContentProps) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return null;
  }

  const { content } = tool;

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}

