import { processMarkdown } from "@/lib/markdown/processor";
import type { TocItem } from "@/lib/markdown/extract-toc";
import { CodeBlockEnhancer } from "./CodeBlock";
import { MermaidRenderer } from "./MermaidBlock";
import { ImageLightboxHandler } from "./ImageLightbox";

interface MarkdownRendererProps {
  content: string;
  baseUrl?: string;
  onToc?: (toc: TocItem[]) => void;
}

export async function MarkdownRenderer({
  content,
  baseUrl,
}: MarkdownRendererProps) {
  const { html, toc } = await processMarkdown(content, baseUrl);

  return (
    <>
      <script
        type="application/json"
        id="toc-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toc) }}
      />
      <article
        className="markdown-body max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CodeBlockEnhancer />
      <MermaidRenderer />
      <ImageLightboxHandler />
    </>
  );
}
