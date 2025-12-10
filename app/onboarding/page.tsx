"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Role, RoleSelector } from "@/components/RoleSelector";
import { ProgressSteps } from "@/components/ProgressSteps";
import { FormField } from "@/components/FormField";
import { Reveal } from "@/components/Reveal";

type FreelancerProfile = {
  headline: string;
  bio: string;
  skills: string[];
  hourlyRate: string;
  availability: "full-time" | "part-time" | "contract";
};

type ClientProfile = {
  company: string;
  website: string;
  needs: string;
  budgetRange: "starter" | "growing" | "enterprise";
};

type AdminProfile = {
  department: string;
  note: string;
};

type OnboardingState = {
  role: Role | null;
  name: string;
  email: string;
  freelancer: FreelancerProfile;
  client: ClientProfile;
  admin: AdminProfile;
  completed: boolean;
};

const defaultState: OnboardingState = {
  role: null,
  name: "",
  email: "",
  freelancer: {
    headline: "",
    bio: "",
    skills: [],
    hourlyRate: "",
    availability: "contract",
  },
  client: {
    company: "",
    website: "",
    needs: "",
    budgetRange: "starter",
  },
  admin: {
    department: "",
    note: "",
  },
  completed: false,
};

const steps = ["Role", "Profile", "Preferences", "Review"];

export default function OnboardingPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState<OnboardingState>(defaultState);

  // Prefill from signup page
  useEffect(() => {
    let prefill: Partial<OnboardingState> = {};
    try {
      const raw = localStorage.getItem("onboarding.prefill");
      if (raw) prefill = JSON.parse(raw);
    } catch {
      // ignore
    }
    const roleParam = search.get("role") as Role | null;
    setState((s) => ({
      ...s,
      ...prefill,
      role: (prefill.role as Role | null) ?? roleParam ?? s.role,
      name: (prefill as any).name ?? s.name,
      email: (prefill as any).email ?? s.email,
    }));
  }, [search]);

  useEffect(() => {
    try {
      localStorage.setItem("onboarding.state", JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const canContinue = useMemo(() => {
    if (current === 0) return Boolean(state.role);
    if (current === 1) {
      if (state.role === "freelancer") return Boolean(state.freelancer.headline && state.freelancer.bio);
      if (state.role === "client") return Boolean(state.client.company && state.client.needs);
      if (state.role === "admin") return Boolean(state.admin.department);
      return false;
    }
    if (current === 2) {
      if (state.role === "freelancer") return Boolean(state.freelancer.hourlyRate);
      if (state.role === "client") return Boolean(state.client.budgetRange);
      if (state.role === "admin") return Boolean(state.admin.note);
      return false;
    }
    return true;
  }, [current, state]);

  const next = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const finish = () => {
    // In a real app, submit to backend then route to dashboard
    setState((s) => ({ ...s, completed: true }));
    try {
      localStorage.removeItem("onboarding.prefill");
      localStorage.setItem("onboarding.state", JSON.stringify({ ...state, completed: true }));
    } catch {
      // ignore
    }
    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14">
      <Reveal>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold md:text-3xl">Let’s set up your profile</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This helps us personalize your experience. You can change these later.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col items-center gap-4">
            <ProgressSteps steps={steps} current={current} />
          </div>

          <div className="mt-6 space-y-6">
            {current === 0 && (
              <section className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Select your role</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    This determines the fields we’ll ask next.
                  </p>
                </div>
                <RoleSelector
                  value={state.role}
                  onChange={(r) => setState((s) => ({ ...s, role: r }))}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    id="name"
                    label="Your name"
                    placeholder="Jane Doe"
                    value={state.name}
                    onChange={(e) =>
                      setState((s) => ({ ...s, name: (e.target as HTMLInputElement).value }))
                    }
                  />
                  <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={state.email}
                    onChange={(e) =>
                      setState((s) => ({ ...s, email: (e.target as HTMLInputElement).value }))
                    }
                  />
                </div>
              </section>
            )}

            {current === 1 && (
              <section className="space-y-5">
                {state.role === "freelancer" && (
                  <>
                    <FormField
                      id="headline"
                      label="Professional headline"
                      placeholder="Senior Frontend Engineer"
                      value={state.freelancer.headline}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          freelancer: { ...s.freelancer, headline: (e.target as HTMLInputElement).value },
                        }))
                      }
                    />
                    <FormField
                      as="textarea"
                      id="bio"
                      label="Short bio"
                      rows={5}
                      placeholder="Tell clients about your experience, specialties, and what makes you unique."
                      value={state.freelancer.bio}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          freelancer: { ...s.freelancer, bio: (e.target as HTMLTextAreaElement).value },
                        }))
                      }
                    />
                    <TagInput
                      label="Skills"
                      placeholder="Add a skill and press Enter"
                      values={state.freelancer.skills}
                      onChange={(skills) =>
                        setState((s) => ({ ...s, freelancer: { ...s.freelancer, skills } }))
                      }
                    />
                  </>
                )}

                {state.role === "client" && (
                  <>
                    <FormField
                      id="company"
                      label="Company or team name"
                      placeholder="Acme Inc."
                      value={state.client.company}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          client: { ...s.client, company: (e.target as HTMLInputElement).value },
                        }))
                      }
                    />
                    <FormField
                      id="website"
                      label="Website"
                      type="url"
                      placeholder="https://acme.com"
                      value={state.client.website}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          client: { ...s.client, website: (e.target as HTMLInputElement).value },
                        }))
                      }
                    />
                    <FormField
                      as="textarea"
                      id="needs"
                      label="What are you hiring for?"
                      rows={5}
                      placeholder="Describe your typical projects or immediate needs."
                      value={state.client.needs}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          client: { ...s.client, needs: (e.target as HTMLTextAreaElement).value },
                        }))
                      }
                    />
                  </>
                )}

                {state.role === "admin" && (
                  <>
                    <FormField
                      id="department"
                      label="Department"
                      placeholder="Operations"
                      value={state.admin.department}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          admin: { ...s.admin, department: (e.target as HTMLInputElement).value },
                        }))
                      }
                    />
                    <FormField
                      as="textarea"
                      id="admin-note"
                      label="Notes"
                      rows={4}
                      placeholder="Responsibilities, moderation scope, etc."
                      value={state.admin.note}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          admin: { ...s.admin, note: (e.target as HTMLTextAreaElement).value },
                        }))
                      }
                    />
                  </>
                )}
              </section>
            )}

            {current === 2 && (
              <section className="space-y-5">
                {state.role === "freelancer" && (
                  <>
                    <FormField
                      id="rate"
                      label="Hourly rate (USD)"
                      type="number"
                      placeholder="60"
                      value={state.freelancer.hourlyRate}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          freelancer: { ...s.freelancer, hourlyRate: (e.target as HTMLInputElement).value },
                        }))
                      }
                    />
                    <div>
                      <div className="mb-2 text-sm font-medium">Availability</div>
                      <div className="flex flex-wrap gap-2">
                        {(["full-time", "part-time", "contract"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setState((s) => ({ ...s, freelancer: { ...s.freelancer, availability: opt } }))
                            }
                            className={[
                              "rounded-md px-3 py-1.5 text-sm ring-1 transition",
                              state.freelancer.availability === opt
                                ? "bg-blue-600 text-white ring-blue-500"
                                : "bg-gray-100 text-gray-700 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700",
                            ].join(" ")}
                          >
                            {opt.replace("-", " ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {state.role === "client" && (
                  <>
                    <div>
                      <div className="mb-2 text-sm font-medium">Budget preference</div>
                      <div className="flex flex-wrap gap-2">
                        {(["starter", "growing", "enterprise"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setState((s) => ({ ...s, client: { ...s.client, budgetRange: opt } }))
                            }
                            className={[
                              "rounded-md px-3 py-1.5 text-sm ring-1 transition capitalize",
                              state.client.budgetRange === opt
                                ? "bg-blue-600 text-white ring-blue-500"
                                : "bg-gray-100 text-gray-700 ring-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {state.role === "admin" && (
                  <div className="rounded-lg border border-amber-300/60 bg-amber-50/60 p-4 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                    Admin accounts will require elevated permissions in a future step.
                  </div>
                )}
              </section>
            )}

            {current === 3 && (
              <section className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-950">
                  <div className="font-medium">Summary</div>
                  <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <span className="text-gray-500">Role:</span> {state.role}
                    </li>
                    <li>
                      <span className="text-gray-500">Name:</span> {state.name || "—"}
                    </li>
                    <li>
                      <span className="text-gray-500">Email:</span> {state.email || "—"}
                    </li>
                    {state.role === "freelancer" && (
                      <>
                        <li>
                          <span className="text-gray-500">Headline:</span> {state.freelancer.headline || "—"}
                        </li>
                        <li>
                          <span className="text-gray-500">Skills:</span>{" "}
                          {state.freelancer.skills.length ? state.freelancer.skills.join(", ") : "—"}
                        </li>
                        <li>
                          <span className="text-gray-500">Rate:</span>{" "}
                          {state.freelancer.hourlyRate ? `$${state.freelancer.hourlyRate}/hr` : "—"}
                        </li>
                      </>
                    )}
                    {state.role === "client" && (
                      <>
                        <li>
                          <span className="text-gray-500">Company:</span> {state.client.company || "—"}
                        </li>
                        <li>
                          <span className="text-gray-500">Needs:</span> {state.client.needs || "—"}
                        </li>
                        <li>
                          <span className="text-gray-500">Budget:</span> {state.client.budgetRange}
                        </li>
                      </>
                    )}
                    {state.role === "admin" && (
                      <>
                        <li>
                          <span className="text-gray-500">Department:</span> {state.admin.department || "—"}
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
                  You can edit your profile later in settings. In the next steps we’ll add real authentication and data
                  storage.
                </div>
              </section>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={current === 0}
              className="btn-press inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-gray-800"
            >
              Back
            </button>
            {current < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={!canContinue}
                className="btn-press inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={finish}
                className="btn-press inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-emerald-500/50 transition hover:bg-emerald-500"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function TagInput({
  label,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (values.includes(v)) return;
    onChange([...values, v]);
    setInput("");
  };

  const remove = (v: string) => {
    onChange(values.filter((x) => x !== v));
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2 rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-950">
        {values.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
          >
            {v}
            <button
              type="button"
              onClick={() => remove(v)}
              className="rounded p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700"
              aria-label={`Remove ${v}`}
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="min-w-[140px] flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-gray-400"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            } else if (e.key === "Backspace" && !input && values.length) {
              remove(values[values.length - 1]);
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500"
        >
          Add
        </button>
      </div>
    </div>
  );
}
