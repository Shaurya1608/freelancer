"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  createProject,
  getCurrentUser,
  getProjectsByClient,
  getProposalsByProject,
  updateProposalStatus,
  type Project,
  type Proposal,
} from "@/lib/demo";

export default function ClientDashboardPage() {
  const me = getCurrentUser("client");
  const projects = useProjects(me.id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    tags: "",
  });

  const canCreate =
    form.title && form.description && form.budgetMin && form.budgetMax;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 md:py-14">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Welcome, {me.company ?? me.name}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Client dashboard</p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">Post a new project</h2>
          <form
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canCreate) return;
              createProject({
                clientId: me.id,
                title: form.title,
                description: form.description,
                budgetMin: Number(form.budgetMin),
                budgetMax: Number(form.budgetMax),
                tags: form.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              });
              setForm({ title: "", description: "", budgetMin: "", budgetMax: "", tags: "" });
            }}
          >
            <input
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.currentTarget.value }))}
            />
            <input
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              placeholder="Budget min (USD)"
              inputMode="numeric"
              value={form.budgetMin}
              onChange={(e) => setForm((s) => ({ ...s, budgetMin: e.currentTarget.value }))}
            />
            <input
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              placeholder="Budget max (USD)"
              inputMode="numeric"
              value={form.budgetMax}
              onChange={(e) => setForm((s) => ({ ...s, budgetMax: e.currentTarget.value }))}
            />
            <input
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white md:col-span-4"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.currentTarget.value }))}
            />
            <input
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white md:col-span-3"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm((s) => ({ ...s, tags: e.currentTarget.value }))}
            />
            <button
              type="submit"
              disabled={!canCreate}
              className="btn-press inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Post project
            </button>
          </form>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Your projects</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.title}</div>
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30">
                    ${p.budgetMin.toLocaleString()}–${p.budgetMax.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{p.description}</div>

                <ProjectProposals projectId={p.id} />
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function useProjects(clientId: string) {
  return useMemo(() => getProjectsByClient(clientId), [clientId]);
}

function ProjectProposals({ projectId }: { projectId: string }) {
  const proposals = useMemo(() => getProposalsByProject(projectId), [projectId]);
  if (!proposals.length) {
    return <div className="mt-3 text-sm text-gray-500">No proposals yet.</div>;
  }
  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-3 dark:border-gray-800">
      <div className="mb-2 text-sm font-semibold">Proposals</div>
      <ul className="space-y-2">
        {proposals.map((pr) => (
          <li key={pr.id} className="flex items-center justify-between gap-2 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">${pr.bid.toLocaleString()}</span>
              <span className="text-gray-500">{pr.timeline}</span>
              <span className="hidden truncate text-gray-600 dark:text-gray-400 md:inline">
                {pr.coverLetter}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={pr.status} />
              <ActionButtons id={pr.id} status={pr.status} />
            </div>
          </li>
        ))}
      </ul>
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

function ActionButtons({ id, status }: { id: string; status: Proposal["status"] }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => updateProposalStatus(id, "shortlisted")}
        className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-blue-50 dark:hover:bg-blue-500/10"
      >
        Shortlist
      </button>
      <button
        type="button"
        onClick={() => updateProposalStatus(id, "accepted")}
        className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
      >
        Accept
      </button>
      <button
        type="button"
        onClick={() => updateProposalStatus(id, "rejected")}
        className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
      >
        Reject
      </button>
    </div>
  );
}
