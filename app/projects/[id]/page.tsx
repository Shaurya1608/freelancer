"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  getProjectById,
  getUserById,
  getProposalsByProject,
  submitProposal,
  getCurrentUser,
} from "@/lib/demo";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const project = useMemo(() => getProjectById(params.id), [params.id]);
  const client = project ? getUserById(project.clientId) : null;

  const freelancerUser = getCurrentUser("freelancer");

  const [coverLetter, setCoverLetter] = useState("");
  const [bid, setBid] = useState<number | "">("");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Please check the URL and try again.</p>
      </div>
    );
  }

  const proposals = getProposalsByProject(project.id);

  const canSubmit = coverLetter && bid !== "" && timeline;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-semibold">{project.title}</h1>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Posted by{" "}
              <span className="font-medium">{client?.company ?? client?.name ?? "Client"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 capitalize">
              {project.status.replace("_", " ")}
            </span>
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30">
              ${project.budgetMin.toLocaleString()}–${project.budgetMax.toLocaleString()}
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:col-span-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{project.description}</p>
            <h3 className="mt-6 text-sm font-semibold">Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold">Proposals</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {proposals.length} received
            </p>
            <ul className="mt-3 space-y-2">
              {proposals.slice(0, 3).map((pr) => (
                <li key={pr.id} className="rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <span>${pr.bid.toLocaleString()}</span>
                    <span
                      className={[
                        "rounded-md px-2 py-0.5 text-xs font-medium ring-1 capitalize",
                        pr.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
                          : pr.status === "shortlisted"
                            ? "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30"
                            : pr.status === "rejected"
                              ? "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30"
                              : "bg-gray-100 text-gray-700 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",
                      ].join(" ")}
                    >
                      {pr.status}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">{pr.timeline}</div>
                </li>
              ))}
            </ul>
            <Link href="/dashboard/client" className="mt-3 inline-block text-xs text-blue-600 hover:underline dark:text-blue-400">
              View all proposals in dashboard
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">Submit a Proposal</h2>
          {submitted ? (
            <div className="mt-3 rounded-md border border-emerald-300/60 bg-emerald-50/60 p-3 text-sm text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
              Proposal submitted! You can track status in your freelancer dashboard.
            </div>
          ) : (
            <form
              className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!canSubmit) return;
                submitProposal({
                  projectId: project.id,
                  freelancerId: freelancerUser.id,
                  coverLetter: coverLetter.toString(),
                  bid: Number(bid),
                  timeline: timeline.toString(),
                });
                setSubmitted(true);
              }}
            >
              <textarea
                className="md:col-span-2 h-36 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder="Briefly explain why you're a great fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.currentTarget.value)}
                required
              />
              <div className="space-y-3">
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  placeholder="Your bid (USD)"
                  value={bid}
                  onChange={(e) => setBid(e.currentTarget.value ? Number(e.currentTarget.value) : "")}
                  required
                />
                <input
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  placeholder="Timeline (e.g., 4-6 weeks)"
                  value={timeline}
                  onChange={(e) => setTimeline(e.currentTarget.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-press inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
