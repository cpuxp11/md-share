"use client";

import { useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlockEnhancer() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const figures = document.querySelectorAll("[data-rehype-pretty-code-figure]");
    figures.forEach((figure, index) => {
      if (figure.querySelector(".code-copy-btn")) return;

      const pre = figure.querySelector("pre");
      if (!pre) return;

      const wrapper = document.createElement("div");
      wrapper.className = "relative group";
      wrapper.id = `code-block-${index}`;

      // Get language from data attribute
      const code = pre.querySelector("code");
      const lang = code?.getAttribute("data-language") || "";

      if (lang) {
        const badge = document.createElement("div");
        badge.className =
          "absolute top-0 right-0 px-3 py-1 text-xs font-bold bg-[var(--border)] text-[var(--bg)] z-10";
        badge.textContent = lang.toUpperCase();
        wrapper.appendChild(badge);
      }

      figure.parentNode?.insertBefore(wrapper, figure);
      wrapper.appendChild(figure);
    });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".code-copy-btn");
      if (!btn) return;
      const code = btn.closest(".relative")?.querySelector("code");
      if (!code) return;
      navigator.clipboard.writeText(code.textContent || "");
      const id = btn.closest(".relative")?.id || "";
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Add copy buttons after mount
  useEffect(() => {
    const wrappers = document.querySelectorAll("[id^='code-block-']");
    wrappers.forEach((wrapper) => {
      if (wrapper.querySelector(".code-copy-btn")) return;
      const btn = document.createElement("button");
      btn.className =
        "code-copy-btn absolute top-0 left-0 px-2 py-1 text-xs font-bold bg-[var(--surface)] border-2 border-[var(--border)] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10";
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
      wrapper.appendChild(btn);
    });
  }, []);

  return copiedId ? (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[var(--border)] text-[var(--bg)] px-4 py-2 font-bold text-sm brutal-shadow-sm"
      style={{ borderWidth: "3px", borderColor: "var(--border)" }}>
      <Check size={16} />
      Copied!
    </div>
  ) : null;
}
