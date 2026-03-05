// components/ClientEntryContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import MDXRenderer from './MDXRenderer';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  contentString: string;
}

export default function EntryContent({ contentString }: Props) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    async function serializeContent() {
      const source = await serialize(contentString, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      });
      setMdxSource(source);
    }
    serializeContent();
  }, [contentString]);

  if (!mdxSource) return null; // or a loading spinner

  return <MDXRenderer content={mdxSource} />;
}