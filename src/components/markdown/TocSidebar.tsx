"use client";

import { useEffect, useState } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/use-active-heading";
import { useUIStore } from "@/stores/ui-store";
import type { TocItem } from "@/types";

interface TocSidebarProps {
  toc: TocItem[];
}

export function TocSidebar({ toc }: TocSidebarProps) {
  const activeId = useActiveHeading(toc);
  const { tocOpen, setTocOpen, toggleToc } = useUIStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (toc.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (isMobile) setTocOpen(false);
    }
  };

  const minLevel = Math.min(...toc.map((t) => t.level));

  const tocContent = (
    <nav className="space-y-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--text)]">
          Table of Contents
        </h3>
        {isMobile && (
          <button onClick={() => setTocOpen(false)} className="cursor-pointer">
            <X size={20} />
          </button>
        )}
      </div>
      {toc.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className={cn(
            "block w-full text-left text-sm py-1 transition-all duration-200 cursor-pointer truncate",
            "hover:text-[var(--accent)] hover:font-bold",
            activeId === item.id
              ? "text-[var(--accent)] font-bold border-l-3 border-[var(--accent)] pl-2"
              : "text-[var(--text)] opacity-70 pl-2",
          )}
          style={{ paddingLeft: `${(item.level - minLevel) * 12 + 8}px` }}
        >
          {item.text}
        </button>
      ))}
    </nav>
  );

  // Mobile: floating button + overlay
  if (isMobile) {
    return (
      <>
        <button
          onClick={toggleToc}
          className="fixed bottom-20 right-4 z-50 w-12 h-12 flex items-center justify-center bg-[var(--accent)] text-white border-3 border-[var(--border)] brutal-shadow-sm brutal-press cursor-pointer"
          style={{ borderWidth: "3px" }}
          aria-label="Toggle Table of Contents"
        >
          <List size={24} />
        </button>
        {tocOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setTocOpen(false)}
            />
            <div
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[var(--surface)] border-l-3 border-[var(--border)] p-4 overflow-y-auto"
              style={{ borderLeftWidth: "3px" }}
            >
              {tocContent}
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop: sticky sidebar
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        {tocContent}
      </div>
    </aside>
  );
}
