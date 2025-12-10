"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getSiteContent } from "@/lib/demo";

export default function Home() {
  const content = getSiteContent();

  return (
    <div className="relative">
      <div className="hero-gradient" aria-hidden="true" />
      <section className="min-h-[68vh] md:min-h-[72vh] relative flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16 lg:py-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30">
              Next-gen freelance marketplace
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </Reveal>
          <Reveal>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              {content.heroTitle}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              {content.heroSubtitle}
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/projects"
                className="btn-press inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-blue-500/50 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Post a Project
              </Link>
              <Link
                href="/freelancers"
                className="btn-press inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-900 dark:text-white dark:ring-gray-800 dark:hover:bg-gray-800"
              >
                Browse Freelancers
              </Link>
              <Link
                href="/auth/signup"
                className="btn-press inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white ring-1 ring-emerald-500/50 transition hover:bg-emerald-500"
              >
                Get Started Free
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Talent", value: "12k+" },
                { label: "Projects", value: "4.3k" },
                { label: "Countries", value: "32" },
                { label: "Avg. rating", value: "4.9" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-200/70 bg-white/70 p-4 text-center dark:border-gray-800 dark:bg-gray-900/60"
                >
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-14 dark:border-gray-900 dark:bg-gray-950/60">
        <div className="mx-auto w-full max-w-7xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold md:text-3xl">Popular Categories</h2>
          </Reveal>
          <Reveal>
            <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
              Explore our most in-demand skills and get matched with the right expert.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.categories.map((c) => (
              <Reveal key={c.title}>
                <Link
                  href="/categories"
                  className="card-hover group block overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 ring-1 ring-black/0 transition-shadow hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-50 p-2.5 dark:bg-blue-500/10">
                      <span className="text-xl">{c.icon ?? "⭐"}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:underline">{c.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{c.text}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Explore experts</span>
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      Explore
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <Reveal>
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-600 to-violet-600 p-8 text-white shadow-lg dark:border-gray-800">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-semibold md:text-3xl">Ready to build something great?</h3>
                  <p className="mt-2 text-white/90">
                    Join thousands of clients and freelancers collaborating on FreelanceHub.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/auth/signup"
                      className="btn-press inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 ring-1 ring-white/40 transition hover:bg-gray-100"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/freelancers"
                      className="btn-press inline-flex items-center justify-center rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
                    >
                      Hire Talent
                    </Link>
                  </div>
                </div>
                <div className="relative h-40 md:h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
                    alt="Collaboration"
                    fill
                    className="rounded-2xl object-cover ring-1 ring-white/30"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
