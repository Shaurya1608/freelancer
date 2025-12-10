"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { deleteProposal, getProjects, getProposalsByProject, updateProposalStatus, type Proposal } from "@/lib/demo";

export default function AdminProposalsPage() {
  const projects = useMemo(() => getProjects(), []);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? "");
  const [data, setData] = useState<Proposal[]>(getProposalsByProject(selectedProjectId));

  const reload = (pid: string) => {
    setSelectedProjectId(pid);
    setData(getProposalsByProject(pid));
  };

  return (
    <div>
      <Reveal>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Proposals</div>
          <select
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            value={selectedProjectId}
            onChange={(e) => reload(e.currentTarget.value)}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2">Bid</th>
                <th className="py-2">Timeline</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((pr) => (
                <tr key={pr.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="py-2">${pr.bid.toLocaleString()}</td>
                  <td className="py-2">{pr.timeline}</td>
                  <td className="py-2 capitalize">
                    <select
                      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950"
                      value={pr.status}
                      onChange={(e) => {
                        const status = e.currentTarget.value as Proposal["status"];
                        updateProposalStatus(pr.id, status);
                        setData((list) => list.map((x) => (x.id === pr.id ? { ...x, status } : x)));
                      }}
                    >
                      <option value="submitted">submitted</option>
                      <option value="shortlisted">shortlisted</option>
                      <option value="accepted">accepted</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                      onClick={() => {
                        deleteProposal(pr.id);
                        setData((list) => list.filter((x) => x.id !== pr.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!data.length && (
                <tr>
                  <td className="py-4 text-gray-500" colSpan={4}>
                    No proposals found for the selected project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
