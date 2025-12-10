"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/proposals", label: "Proposals" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/analytics", label: "Analytics" },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <aside className="sticky top-[64px] h-[calc(100vh-64px)] w-full max-w-xs overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Admin</div>
      <nav className="mt-1 space-y-1.5">
        {items.map((i) => {
          const active = path === i.href;
          return (
            <Link
              key={i.href}
              href={i.href}
              className={[
                "block rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-blue-50 text-blue-900 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-500/30"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800",
              ].join(" ")}
            >
              {i.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
