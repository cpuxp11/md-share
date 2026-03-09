"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { BrutalCard } from "@/components/shared/BrutalCard";
import { BrutalButton } from "@/components/shared/BrutalButton";

interface PasswordGateProps {
  children: React.ReactNode;
  path: string;
}

const SESSION_KEY = "md-share-auth";

export function PasswordGate({ children, path }: PasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_KEY);
    if (token === "authenticated") {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/check-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, path }),
      });

      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, "authenticated");
        setAuthenticated(true);
      } else {
        setError("Wrong password. Try again.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong.");
    }
  };

  if (loading) return null;
  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)]">
      <BrutalCard className="p-8 max-w-md w-full" hover>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 flex items-center justify-center bg-[var(--accent)] text-white"
            style={{ borderWidth: "3px", borderColor: "var(--border)" }}
          >
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Protected Document</h2>
          <p className="text-sm text-center opacity-70">
            This document is password protected. Enter the password to continue.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 font-mono text-lg bg-[var(--surface)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ borderWidth: "3px" }}
              autoFocus
            />
            {error && (
              <p className="text-sm font-bold text-red-500">{error}</p>
            )}
            <BrutalButton type="submit" className="w-full" size="lg">
              Unlock
            </BrutalButton>
          </form>
        </div>
      </BrutalCard>
    </div>
  );
}
