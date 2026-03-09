"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { useMounted } from "@/hooks/use-mounted";

export function ImageLightboxHandler() {
  const mounted = useMounted();
  const { lightboxSrc, openLightbox, closeLightbox } = useUIStore();

  useEffect(() => {
    if (!mounted) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" && target.closest(".markdown-body")) {
        const src = (target as HTMLImageElement).src;
        openLightbox(src);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [mounted, openLightbox]);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxSrc, closeLightbox]);

  if (!lightboxSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
      onClick={closeLightbox}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-[var(--accent)] transition-colors cursor-pointer"
        onClick={closeLightbox}
      >
        <X size={32} />
      </button>
      <img
        src={lightboxSrc}
        alt="Lightbox"
        className="max-w-[90vw] max-h-[90vh] object-contain border-none shadow-none"
        style={{ border: "none", boxShadow: "none" }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
