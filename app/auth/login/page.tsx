"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Reveal } from "@/components/Reveal";
import { setToken, type AuthResponse, clearToken } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState(search.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as AuthResponse;
      if (!res.ok || "error" in data) {
        setError((data as any).error ?? "Invalid credentials");
        clearToken();
        setLoading(false);
        return;
      }
      setToken(data.token);
      const role = data.user.role;
      const dest =
        role === "client"
          ? "/dashboard/client"
          : role === "freelancer"
            ? "/dashboard/freelancer"
            : "/admin";
      router.push(dest);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <Reveal>
        <AuthCard
          title="Welcome back"
          subtitle={
            <span>
              Don't have an account?{" "}
              <Link className="font-medium text-blue-600 hover:underline dark:text-blue-400" href="/auth/signup">
                Create one
              </Link>
            </span>
          }
        >
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
                <span>Remember me</span>
              </label>
              <Link className="text-blue-600 hover:underline dark:text-blue-400" href="/auth/reset-password">
                Forgot password?
              </Link>
            </div>

            {error ? <div className="rounded-md border border-rose-300/60 bg-rose-50/60 p-2 text-sm text-rose-900 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">{error}</div> : null}
            <button
              type="submit"
              disabled={loading}
              className="btn-press inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </AuthCard>
      </Reveal>
    </div>
  );
}
