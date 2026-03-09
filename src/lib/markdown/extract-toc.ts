import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Plugin } from "unified";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ExtractTocOptions {
  tocItems: TocItem[];
}

export const extractToc: Plugin<[ExtractTocOptions], Root> = (options) => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const match = /^h([1-6])$/.exec(node.tagName);
      if (!match) return;

      const level = parseInt(match[1], 10);
      const id = (node.properties?.id as string) || "";
      const text = toString(node).replace(/ #$/, "");

      if (id && text) {
        options.tocItems.push({ id, text, level });
      }
    });
  };
};
