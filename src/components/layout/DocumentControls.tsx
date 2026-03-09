"use client";

import { useState } from "react";
import { Copy, Download, FileText, Check } from "lucide-react";

interface DocumentControlsProps {
  rawUrl: string;
  rawContent: string;
  title: string;
}

export function DocumentControls({ rawUrl, rawContent, title }: DocumentControlsProps) {
  const [copied, setCopied] = useState(false);

  const copyMd = async () => {
    await navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveMd = () => {
    const blob = new Blob([rawContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openRaw = () => {
    window.open(rawUrl, "_blank");
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={copyMd}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold bg-[var(--surface)] border-[var(--border)] brutal-shadow-sm brutal-press cursor-pointer transition-all hover:brutal-shadow-md"
        style={{ borderWidth: "3px" }}
        title="Copy Markdown"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
      </button>
      <button
        onClick={saveMd}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold bg-[var(--surface)] border-[var(--border)] brutal-shadow-sm brutal-press cursor-pointer transition-all hover:brutal-shadow-md"
        style={{ borderWidth: "3px" }}
        title="Save as .md"
      >
        <Download size={16} />
        <span className="hidden sm:inline">Save</span>
      </button>
      <button
        onClick={openRaw}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold bg-[var(--surface)] border-[var(--border)] brutal-shadow-sm brutal-press cursor-pointer transition-all hover:brutal-shadow-md"
        style={{ borderWidth: "3px" }}
        title="View Raw"
      >
        <FileText size={16} />
        <span className="hidden sm:inline">Raw</span>
      </button>
    </div>
  );
}
