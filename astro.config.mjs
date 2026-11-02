import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://ids-field-guide.vercel.app',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { format: 'directory' },
});
