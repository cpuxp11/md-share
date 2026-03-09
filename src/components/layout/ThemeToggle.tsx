"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <button
        className="fixed bottom-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-[var(--surface)] border-[var(--border)] brutal-shadow-sm"
        style={{ borderWidth: "3px" }}
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-[var(--surface)] border-[var(--border)] brutal-shadow-sm brutal-press cursor-pointer transition-all duration-200 hover:brutal-shadow-md"
      style={{ borderWidth: "3px" }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
