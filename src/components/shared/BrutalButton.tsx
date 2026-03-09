import { cn } from "@/lib/utils";

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function BrutalButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BrutalButtonProps) {
  const variantStyles = {
    primary: "bg-[var(--accent)] text-white border-[var(--border)]",
    secondary: "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]",
    ghost: "bg-transparent text-[var(--text)] border-transparent shadow-none",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "font-bold brutal-shadow-sm brutal-press transition-all duration-150 cursor-pointer",
        "hover:brutal-shadow-md active:shadow-none active:translate-x-1 active:translate-y-1",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={{ borderWidth: "3px" }}
      {...props}
    >
      {children}
    </button>
  );
}
