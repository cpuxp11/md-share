import { create } from "zustand";

interface UIStore {
  tocOpen: boolean;
  setTocOpen: (open: boolean) => void;
  toggleToc: () => void;
  lightboxSrc: string | null;
  openLightbox: (src: string) => void;
  closeLightbox: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  tocOpen: false,
  setTocOpen: (open) => set({ tocOpen: open }),
  toggleToc: () => set((s) => ({ tocOpen: !s.tocOpen })),
  lightboxSrc: null,
  openLightbox: (src) => set({ lightboxSrc: src }),
  closeLightbox: () => set({ lightboxSrc: null }),
}));
