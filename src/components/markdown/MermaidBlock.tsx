"use client";

import { useEffect, useRef } from "react";
import { useMounted } from "@/hooks/use-mounted";

export function MermaidRenderer() {
  const mounted = useMounted();
  const initialized = useRef(false);

  useEffect(() => {
    if (!mounted || initialized.current) return;

    const blocks = document.querySelectorAll(".mermaid-block");
    if (blocks.length === 0) return;

    initialized.current = true;

    import("mermaid").then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
        securityLevel: "loose",
      });

      blocks.forEach(async (block, index) => {
        const encoded = block.getAttribute("data-mermaid");
        if (!encoded) return;
        const code = decodeURIComponent(encoded);
        try {
          const { svg } = await mermaid.render(`mermaid-${index}`, code);
          block.innerHTML = `<div class="mermaid-container">${svg}</div>`;
        } catch {
          // Keep original code block on error
        }
      });
    });
  }, [mounted]);

  return null;
}
