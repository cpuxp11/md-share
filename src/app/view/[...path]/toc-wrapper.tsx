"use client";

import { useEffect, useState } from "react";
import { TocSidebar } from "@/components/markdown/TocSidebar";
import type { TocItem } from "@/types";

export function TocSidebarWrapper() {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const el = document.getElementById("toc-data");
    if (el) {
      try {
        const data = JSON.parse(el.textContent || "[]");
        setToc(data);
      } catch {
        // ignore
      }
    }
  }, []);

  return <TocSidebar toc={toc} />;
}
