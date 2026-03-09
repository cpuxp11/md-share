import { cn } from "@/lib/utils";

interface BrutalBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function BrutalBadge({
  children,
  variant = "default",
  className,
}: BrutalBadgeProps) {
  const variantStyles = {
    default: "bg-[var(--border)] text-[var(--bg)]",
    accent: "bg-[var(--accent)] text-white",
    muted: "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]",
  };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 text-xs font-bold",
        variantStyles[variant],
        variant === "muted" && "border-2",
        className
      )}
      style={variant !== "muted" ? { borderWidth: "2px", borderColor: "var(--border)" } : undefined}
    >
      {children}
    </span>
  );
}
