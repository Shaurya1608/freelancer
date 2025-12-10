"use client";

import type { PropsWithChildren } from "react";
import { AdminNav } from "@/components/AdminNav";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 md:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage users, projects, proposals, site content, and settings.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminNav />
        <section className="min-h-[50vh] rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          {children}
        </section>
      </div>
    </div>
  );
}
