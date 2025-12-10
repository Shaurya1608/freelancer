"use client";

export type Role = "client" | "freelancer" | "admin";

type RoleSelectorProps = {
  value: Role | null;
  onChange: (r: Role) => void;
};

const roles: Array<{
  key: Role;
  title: string;
  desc: string;
  icon: string;
  accent: string;
}> = [
  { key: "client", title: "Client", desc: "Hire talent and manage projects.", icon: "🧑‍💼", accent: "from-blue-600 to-violet-600" },
  { key: "freelancer", title: "Freelancer", desc: "Find work and grow your career.", icon: "🧑‍💻", accent: "from-emerald-600 to-teal-600" },
  { key: "admin", title: "Admin", desc: "Moderate content and manage the platform.", icon: "🛡️", accent: "from-amber-600 to-pink-600" },
];

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {roles.map((r) => {
        const selected = value === r.key;
        return (
          <button
            key={r.key}
            type="button"
            onClick={() => onChange(r.key)}
            className={[
              "card-hover group relative overflow-hidden rounded-2xl border p-4 text-left transition",
              selected
                ? "border-blue-400 ring-2 ring-blue-300 dark:border-blue-500 dark:ring-blue-500/50"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
            ].join(" ")}
            aria-pressed={selected}
          >
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur",
                r.accent,
              ].join(" ")}
            />
            <div className="flex items-start gap-3">
              <div className="text-xl">{r.icon}</div>
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{r.desc}</div>
              </div>
            </div>
            {selected ? (
              <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                Selected
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
