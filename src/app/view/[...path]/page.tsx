import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { DocumentControls } from "@/components/layout/DocumentControls";
import { TocSidebarWrapper } from "./toc-wrapper";
import { ALLOWED_HOSTS, FETCH_TIMEOUT_MS } from "@/lib/constants";
import type { Metadata } from "next";

interface ViewPageProps {
  params: Promise<{ path: string[] }>;
}

async function fetchMarkdown(path: string[]): Promise<{ content: string; rawUrl: string } | null> {
  const rawUrl = `https://raw.githubusercontent.com/${path.join("/")}`;

  try {
    const url = new URL(rawUrl);
    if (!ALLOWED_HOSTS.includes(url.hostname as typeof ALLOWED_HOSTS[number])) {
      return null;
    }

    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(rawUrl, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const content = await res.text();
    return { content, rawUrl };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ViewPageProps): Promise<Metadata> {
  const { path } = await params;
  const fileName = path[path.length - 1]?.replace(/\.md$/, "") || "Document";
  return {
    title: `${fileName} — MD Share`,
    description: `View ${fileName} on MD Share`,
  };
}

export default async function ViewPage({ params }: ViewPageProps) {
  const { path } = await params;
  const data = await fetchMarkdown(path);

  if (!data) {
    notFound();
  }

  const { content, rawUrl } = data;
  const title = path[path.length - 1]?.replace(/\.md$/, "") || "Document";
  const baseUrl = rawUrl;

  return (
    <div className="min-h-screen">
      <DocumentControls rawUrl={rawUrl} rawContent={content} title={title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex gap-8">
          {/* TOC Sidebar */}
          <TocSidebarWrapper />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <MarkdownRenderer content={content} baseUrl={baseUrl} />
          </main>
        </div>
      </div>
    </div>
  );
}
