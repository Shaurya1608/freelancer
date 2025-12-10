"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Reveal } from "@/components/Reveal";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Placeholder for password reset email flow
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <Reveal>
        <AuthCard
          title="Reset your password"
          subtitle={
            sent ? (
              <span className="text-emerald-600 dark:text-emerald-400">
                If an account exists for that email, we’ve sent reset instructions.
              </span>
            ) : (
              <span>
                Remembered your password?{" "}
                <Link className="font-medium text-blue-600 hover:underline dark:text-blue-400" href="/auth/login">
                  Go back to Sign in
                </Link>
              </span>
            )
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
            <button
              type="submit"
              disabled={loading}
              className="btn-press inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </AuthCard>
      </Reveal>
    </div>
  );
}
