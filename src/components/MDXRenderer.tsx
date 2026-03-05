'use client'; // MUST be first line

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXRendererProps {
  content: MDXRemoteSerializeResult;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return <MDXRemote {...content} />;
}