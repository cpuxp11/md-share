import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkCallout from "@r4ai/remark-callout";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { extractToc, type TocItem } from "./extract-toc";
import { transformContent } from "./transforms";

const customSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "section",
    "summary",
    "details",
    "math",
    "semantics",
    "mrow",
    "mi",
    "mo",
    "mn",
    "msup",
    "msub",
    "mfrac",
    "mspace",
    "mtext",
    "annotation",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [
      ...(defaultSchema.attributes?.["*"] || []),
      "className",
      "class",
      "id",
      "style",
      "dataCallout",
      "data-callout",
      "data-callout-type",
      "data-callout-title",
      "data-language",
      "data-theme",
      "data-rehype-pretty-code-figure",
      "data-rehype-pretty-code-title",
      "data-line",
      "data-line-numbers",
      "data-highlighted-line",
      "data-highlighted-chars",
    ],
    code: [
      ...(defaultSchema.attributes?.code || []),
      "className",
      "class",
      "data-language",
      "data-theme",
      "data-line-numbers",
      "style",
    ],
    pre: [
      ...(defaultSchema.attributes?.pre || []),
      "className",
      "class",
      "data-language",
      "data-theme",
      "style",
    ],
    span: [
      ...(defaultSchema.attributes?.span || []),
      "className",
      "class",
      "style",
      "data-line",
      "data-highlighted-line",
      "data-highlighted-chars",
    ],
    div: [
      ...(defaultSchema.attributes?.div || []),
      "className",
      "class",
      "data-callout",
      "data-callout-type",
      "data-callout-title",
    ],
    math: ["xmlns", "display"],
    img: [...(defaultSchema.attributes?.img || []), "loading", "decoding"],
  },
};

export interface ProcessedMarkdown {
  html: string;
  toc: TocItem[];
}

export async function processMarkdown(
  raw: string,
  baseUrl?: string
): Promise<ProcessedMarkdown> {
  const transformed = transformContent(raw, baseUrl);

  const tocItems: TocItem[] = [];

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallout)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: true },
      content: {
        type: "text",
        value: " #",
      },
    })
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "catppuccin-mocha",
      keepBackground: true,
      defaultLang: "plaintext",
    })
    .use(extractToc, { tocItems })
    .use(rehypeSanitize, customSchema as Parameters<typeof rehypeSanitize>[0])
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(transformed);

  return {
    html: String(result),
    toc: tocItems,
  };
}
