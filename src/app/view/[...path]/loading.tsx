import { BrutalCard } from "@/components/shared/BrutalCard";

export default function Loading() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-20">
      <div className="space-y-6 animate-pulse">
        {/* Title skeleton */}
        <BrutalCard className="p-6">
          <div className="h-10 bg-[var(--border)] opacity-20 w-3/4" />
        </BrutalCard>

        {/* Paragraph skeletons */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 bg-[var(--border)] opacity-10 w-full" />
            <div className="h-4 bg-[var(--border)] opacity-10 w-5/6" />
            <div className="h-4 bg-[var(--border)] opacity-10 w-4/6" />
          </div>
        ))}

        {/* Code block skeleton */}
        <BrutalCard className="p-6">
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-[var(--border)] opacity-10"
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            ))}
          </div>
        </BrutalCard>

        {/* More paragraphs */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 bg-[var(--border)] opacity-10 w-full" />
            <div className="h-4 bg-[var(--border)] opacity-10 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
