"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-900/70 dark:bg-gray-950/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow">
              FH
            </span>
            <span className="hidden sm:inline">FreelanceHub</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm text-gray-700 dark:text-gray-300 md:flex">
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/freelancers">Freelancers</Link>
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/projects">Projects</Link>
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/categories">Categories</Link>
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/pricing">Pricing</Link>
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/about">About</Link>
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/faq">FAQ</Link>
            <Link className="hover:text-blue-600 dark:hover:text-blue-400" href="/contact">Contact</Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            onClick={toggle}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              // Sun
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4V2M12 22v-2M4 12H2m20 0h-2M5 5 4 4m16 16-1-1M5 19l-1 1M20 4l-1 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
            ) : (
              // Moon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            className="btn-press hidden items-center justify-center rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500 md:inline-flex"
          >
            Post a Project
          </button>
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((p) => !p)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden">
          <div className="mx-3 mb-3 space-y-1 rounded-xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {[
              { href: "/freelancers", label: "Freelancers" },
              { href: "/projects", label: "Projects" },
              { href: "/categories", label: "Categories" },
              { href: "/pricing", label: "Pricing" },
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <button className="mt-1 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500">
              Post a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
