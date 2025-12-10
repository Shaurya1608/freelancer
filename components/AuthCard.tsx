"use client";

import type { PropsWithChildren, ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle?: string | ReactNode;
};

export function AuthCard({ title, subtitle, children }: PropsWithChildren<AuthCardProps>) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle ? (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</div>
        ) : null}
      </div>
      <div className="card-hover rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
}
