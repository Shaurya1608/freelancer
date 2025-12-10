import { Reveal } from "@/components/Reveal";

export default function ProjectsPage() {
  const sample = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    title: ["SaaS Dashboard", "E‑commerce App", "Marketing Site", "AI Chatbot", "Analytics Portal", "Portfolio Site", "Booking System", "CMS Setup", "API Backend"][i % 9],
    budget: ["$2k–$4k", "$4k–$7k", "$8k–$12k"][i % 3],
    desc: "We need a skilled professional to deliver a high-quality solution with best practices and performance.",
    tags: ["Next.js", "TypeScript", "Tailwind", "API", "SEO"].slice(0, 3 + (i % 2)),
  }));

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-semibold md:text-4xl">Browse Projects</h1>
      </Reveal>
      <Reveal>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          Find projects that match your skills and availability.
        </p>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sample.map((p) => (
          <Reveal key={p.id}>
            <div className="card-hover rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{p.budget}</span>
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700">
                    {t}
                  </span>
                ))}
              </div>
              <button className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500">
                View Details
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
