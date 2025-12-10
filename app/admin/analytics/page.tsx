"use client";

import { Reveal } from "@/components/Reveal";
import { getUsers, getProjects, getProposalsByProject } from "@/lib/demo";

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const points = values.map((v, i) => `${i * 14},${40 - (v / max) * 40}`).join(" ");
  return (
    <svg width={values.length * 14} height={40} viewBox={`0 0 ${values.length * 14} 40`} aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function AdminAnalyticsPage() {
  const users = getUsers();
  const projects = getProjects();
  const proposalsCount = projects.reduce((sum, p) => sum + getProposalsByProject(p.id).length, 0);

  const seriesUsers = [3, 5, 6, users.length - 2, users.length - 1, users.length].map((n) => Math.max(n, 0));
  const seriesProjects = [2, 3, 5, projects.length - 1, projects.length].map((n) => Math.max(n, 0));
  const seriesProposals = [0, 2, 5, proposalsCount - 1, proposalsCount].map((n) => Math.max(n, 0));

  return (
    <div>
      <Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card title="Users" value={users.length} series={seriesUsers} />
          <Card title="Projects" value={projects.length} series={seriesProjects} />
          <Card title="Proposals" value={proposalsCount} series={seriesProposals} />
        </div>
      </Reveal>
    </div>
  );
}

function Card({ title, value, series }: { title: string; value: number; series: number[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className="text-blue-600 dark:text-blue-400">
          <Sparkline values={series} />
        </div>
      </div>
    </div>
  );
}
