"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  getCurrentUser,
  getProposalsByFreelancer,
  searchProjects,
  type Proposal,
} from "@/lib/demo";

export default function FreelancerDashboardPage() {
  const me = getCurrentUser("freelancer");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");

  const proposals = useProposals(me.id);

  const suggested = useMemo(
    () =>
      searchProjects({
        q,
        tag: tag || undefined,
        status: "open",
      }).slice(0, 6),
    [q, tag]
  );

  const tags = useMemo(() => {
    const s = new Set<string>();
    suggested.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [suggested]);

  const metrics = {
    submitted: proposals.length,
    shortlisted: proposals.filter((p) => p.status === "shortlisted").length,
    accepted: proposals.filter((p) => p.status === "accepted").length,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 md:py-14">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Welcome back, {me.name.split(" ")[0]}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Your freelancer dashboard</p>
          </div>
          <Link
            href="/projects"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500"
          >
            Browse projects
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard label="Proposals sent" value={metrics.submitted} />
          <MetricCard label="Shortlisted" value={metrics.shortlisted} />
          <MetricCard label="Accepted" value={metrics.accepted} />
        </div>
      </Reveal>

      <Reveal>
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Suggested projects</h2>
            <Link href="/projects" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full grid grid-cols-1 gap-3 sm:grid-cols-4">
              <input
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white sm:col-span-2"
                placeholder="Search projects..."
                value={q}
                onChange={(e) => setQ(e.currentTarget.value)}
              />
              <select
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                value={tag}
                onChange={(e) => setTag(e.currentTarget.value)}
              >
                <option value="">Any tag</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            {suggested.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="card-hover block rounded-xl border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-gray-500">
                    ${p.budgetMin.toLocaleString()}–${p.budgetMax.toLocaleString()}
                  </div>
                </div>
                <div className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{p.description}</div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">Recent proposals</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {proposals.slice(0, 6).map((pr) => (
              <div key={pr.id} className="rounded-xl border border-gray-200 p-4 text-sm dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="font-medium">${pr.bid.toLocaleString()}</div>
                  <StatusBadge status={pr.status} />
                </div>
                <div className="mt-1 text-gray-600 dark:text-gray-400">{pr.timeline}</div>
                <p className="mt-2 line-clamp-2 text-gray-700 dark:text-gray-300">{pr.coverLetter}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-900">
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Proposal["status"] }) {
  const cls =
    status === "accepted"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
      : status === "shortlisted"
        ? "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30"
        : status === "rejected"
          ? "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30"
          : "bg-gray-100 text-gray-700 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700";
  return <span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 capitalize ${cls}`}>{status}</span>;
}

function useProposals(freelancerId: string) {
  return useMemo(() => getProposalsByFreelancer(freelancerId), [freelancerId]);
}
