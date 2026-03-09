import Link from "next/link";
import { BrutalCard } from "@/components/shared/BrutalCard";
import { BrutalButton } from "@/components/shared/BrutalButton";
import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BrutalCard className="p-8 max-w-md text-center" hover>
        <FileX size={64} className="mx-auto mb-4 text-[var(--accent)]" />
        <h1 className="text-4xl font-black mb-2">404</h1>
        <p className="text-lg mb-6 opacity-70">
          Document not found. Check the URL and try again.
        </p>
        <Link href="/">
          <BrutalButton size="lg">Back to Home</BrutalButton>
        </Link>
      </BrutalCard>
    </div>
  );
}
