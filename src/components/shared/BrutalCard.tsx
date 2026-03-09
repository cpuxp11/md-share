import { cn } from "@/lib/utils";

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  rotate?: "left" | "right" | "none";
}

export function BrutalCard({
  children,
  className,
  hover = false,
  rotate = "none",
}: BrutalCardProps) {
  const rotateClass = {
    left: "-rotate-1",
    right: "rotate-1",
    none: "",
  }[rotate];

  return (
    <div
      className={cn(
        "border-3 border-[var(--border)] bg-[var(--surface)] brutal-shadow-md",
        hover && "transition-all duration-200 hover:brutal-shadow-hover hover:-translate-y-1",
        rotateClass,
        className
      )}
      style={{ borderWidth: "3px" }}
    >
      {children}
    </div>
  );
}
