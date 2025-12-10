"use client";

import { Reveal } from "@/components/Reveal";
import { getUsers, getProjects, getProposalsByProject } from "@/lib/demo";

export default function AdminOverviewPage() {
  const users = getUsers();
  const projects = getProjects();
  const proposalsCount = projects.reduce((sum, p) => sum + getProposalsByProject(p.id).length, 0);

  const metrics = [
    { label: "Total users", value: users.length },
    { label: "Projects", value: projects.length },
    { label: "Proposals", value: proposalsCount },
  ];

  return (
    <div>
      <Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-gray-200 bg-white p-5 text-center dark:border-gray-800 dark:bg-gray-900">
              <div className="text-2xl font-bold">{m.value}</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{m.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold">Recent projects</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {projects.slice(0, 6).map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span className="truncate">{p.title}</span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs capitalize ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                    {p.status.replace("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-semibold">System notes</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Use the Content section to update homepage copy, FAQs, and Pricing.</li>
              <li>Use Settings to change site name and feature toggles.</li>
              <li>This demo stores data in your browser storage.</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
