"use client";

type ProgressStepsProps = {
  steps: string[];
  current: number; // 0-indexed
};

export function ProgressSteps({ steps, current }: ProgressStepsProps) {
  return (
    <ol className="flex items-center justify-center gap-2">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={[
                "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ring-1",
                done
                  ? "bg-emerald-500 text-white ring-emerald-500"
                  : active
                    ? "bg-blue-600 text-white ring-blue-500"
                    : "bg-gray-100 text-gray-700 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",
              ].join(" ")}
              aria-current={active ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span className="hidden text-sm text-gray-700 dark:text-gray-300 sm:inline">{s}</span>
            {i < steps.length - 1 ? (
              <span className="mx-1 hidden h-px w-10 bg-gray-200 dark:bg-gray-800 sm:block" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
