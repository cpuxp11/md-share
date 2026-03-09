"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Github, Sparkles } from "lucide-react";
import { BrutalCard } from "@/components/shared/BrutalCard";
import { BrutalButton } from "@/components/shared/BrutalButton";
import { SITE_NAME, GITHUB_CONTENT_BASE } from "@/lib/constants";

const SAMPLE_DOCS = [
  { name: "README", path: "README.md", icon: "📖" },
];

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    // If it's a raw GitHub URL, extract the path
    const rawGhMatch = url.match(
      /raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*)/
    );
    if (rawGhMatch) {
      const path = `${rawGhMatch[1]}/${rawGhMatch[2]}/${rawGhMatch[3]}/${rawGhMatch[4]}`;
      router.push(`/view/${path}`);
      return;
    }

    // If it's a GitHub blob URL, convert to raw
    const ghBlobMatch = url.match(
      /github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.*)/
    );
    if (ghBlobMatch) {
      const path = `${ghBlobMatch[1]}/${ghBlobMatch[2]}/${ghBlobMatch[3]}/${ghBlobMatch[4]}`;
      router.push(`/view/${path}`);
      return;
    }

    // Direct path: assume md-share-db
    router.push(`/view/cpuxp/md-share-db/main/${url.replace(/^\//, "")}`);
  };

  const openSample = (path: string) => {
    router.push(`/view/cpuxp/md-share-db/main/${path}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Hero */}
      <div className="text-center mb-8 sm:mb-12">
        <BrutalCard className="inline-block px-6 py-3 mb-6" rotate="right">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[var(--accent)]" />
            <span className="font-bold text-sm">Free Obsidian Publish Alternative</span>
          </div>
        </BrutalCard>

        <h1 className="text-5xl sm:text-7xl font-black mb-4 tracking-tight">
          <span className="text-[var(--color-brutal-h1)]">MD</span>{" "}
          <span className="text-[var(--text)]">Share</span>
        </h1>
        <p className="text-lg sm:text-xl opacity-70 max-w-md mx-auto">
          Share beautiful markdown documents with a single URL.
          <br />
          <span className="font-bold">No server. No cost. Just GitHub.</span>
        </p>
      </div>

      {/* URL Input */}
      <BrutalCard className="w-full max-w-2xl p-6 sm:p-8 mb-8" hover>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-bold text-sm uppercase tracking-wider mb-2">
            <FileText size={16} className="inline mr-2" />
            Enter GitHub Raw URL or Document Path
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://raw.githubusercontent.com/user/repo/main/doc.md"
              className="flex-1 px-4 py-3 font-mono text-sm bg-[var(--surface)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] placeholder:opacity-40"
              style={{ borderWidth: "3px" }}
            />
            <BrutalButton type="submit" size="lg">
              <ArrowRight size={20} />
            </BrutalButton>
          </div>
        </form>
      </BrutalCard>

      {/* Sample Docs */}
      {SAMPLE_DOCS.length > 0 && (
        <div className="w-full max-w-2xl">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-70">
            Sample Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_DOCS.map((doc) => (
              <BrutalCard
                key={doc.path}
                className="p-4 cursor-pointer"
                hover
              >
                <button
                  onClick={() => openSample(doc.path)}
                  className="w-full text-left flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-2xl">{doc.icon}</span>
                  <div>
                    <div className="font-bold">{doc.name}</div>
                    <div className="text-xs opacity-50 font-mono">{doc.path}</div>
                  </div>
                </button>
              </BrutalCard>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center opacity-50 text-sm">
        <a
          href="https://github.com/cpuxp/md-share"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:opacity-100 transition-opacity"
        >
          <Github size={14} />
          {SITE_NAME}
        </a>
      </footer>
    </div>
  );
}
