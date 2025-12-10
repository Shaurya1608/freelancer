"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { getSiteContent, updateSiteContent, type SiteContent, type SiteCategory, type SiteTier } from "@/lib/demo";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent>(getSiteContent());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [content]);

  const save = () => {
    updateSiteContent(content);
    setSaved(true);
  };

  const addCategory = () => {
    const c: SiteCategory = { title: "New Category", text: "Description", icon: "⭐" };
    setContent((s) => ({ ...s, categories: [...s.categories, c] }));
  };

  const addFaq = () => {
    setContent((s) => ({ ...s, faqs: [...s.faqs, { q: "New question", a: "Answer" }] }));
  };

  const addTier = () => {
    const t: SiteTier = { name: "New Plan", price: "$0", desc: "Description", features: ["Feature A"], cta: "Get Started" };
    setContent((s) => ({ ...s, pricing: [...s.pricing, t] }));
  };

  return (
    <div>
      <Reveal>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Content Management</div>
          <button
            type="button"
            onClick={save}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Save changes
          </button>
        </div>
      </Reveal>

      {saved && (
        <div className="mt-3 rounded-md border border-emerald-300/60 bg-emerald-50/60 p-3 text-sm text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
          Saved! Home, FAQ, and Pricing pages will reflect these updates.
        </div>
      )}

      <Reveal>
        <section className="mt-6 space-y-4">
          <div className="text-sm font-semibold">Hero</div>
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            placeholder="Hero title"
            value={content.heroTitle}
            onChange={(e) => setContent((s) => ({ ...s, heroTitle: e.currentTarget.value }))}
          />
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            placeholder="Hero subtitle"
            rows={3}
            value={content.heroSubtitle}
            onChange={(e) => setContent((s) => ({ ...s, heroSubtitle: e.currentTarget.value }))}
          />
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Categories</div>
            <button type="button" onClick={addCategory} className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
              Add
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {content.categories.map((c, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-800">
                <input
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Title"
                  value={c.title}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.categories];
                      next[idx] = { ...c, title: e.currentTarget.value };
                      return { ...s, categories: next };
                    })
                  }
                />
                <input
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Icon"
                  value={c.icon ?? ""}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.categories];
                      next[idx] = { ...c, icon: e.currentTarget.value };
                      return { ...s, categories: next };
                    })
                  }
                />
                <textarea
                  className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Description"
                  value={c.text}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.categories];
                      next[idx] = { ...c, text: e.currentTarget.value };
                      return { ...s, categories: next };
                    })
                  }
                />
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    onClick={() =>
                      setContent((s) => ({
                        ...s,
                        categories: s.categories.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">FAQs</div>
            <button type="button" onClick={addFaq} className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
              Add
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {content.faqs.map((f, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-800">
                <input
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Question"
                  value={f.q}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.faqs];
                      next[idx] = { ...f, q: e.currentTarget.value };
                      return { ...s, faqs: next };
                    })
                  }
                />
                <textarea
                  className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Answer"
                  value={f.a}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.faqs];
                      next[idx] = { ...f, a: e.currentTarget.value };
                      return { ...s, faqs: next };
                    })
                  }
                />
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    onClick={() =>
                      setContent((s) => ({
                        ...s,
                        faqs: s.faqs.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Pricing tiers</div>
            <button type="button" onClick={addTier} className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-gray-100 dark:hover:bg-gray-800">
              Add
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {content.pricing.map((t, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-800">
                <input
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Name"
                  value={t.name}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.pricing];
                      next[idx] = { ...t, name: e.currentTarget.value };
                      return { ...s, pricing: next };
                    })
                  }
                />
                <input
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Price"
                  value={t.price}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.pricing];
                      next[idx] = { ...t, price: e.currentTarget.value };
                      return { ...s, pricing: next };
                    })
                  }
                />
                <textarea
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="Description"
                  value={t.desc}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.pricing];
                      next[idx] = { ...t, desc: e.currentTarget.value };
                      return { ...s, pricing: next };
                    })
                  }
                />
                <input
                  className="mb-2 w-full rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
                  placeholder="CTA"
                  value={t.cta}
                  onChange={(e) =>
                    setContent((s) => {
                      const next = [...s.pricing];
                      next[idx] = { ...t, cta: e.currentTarget.value };
                      return { ...s, pricing: next };
                    })
                  }
                />
                <label className="inline-flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(t.highlight)}
                    onChange={(e) =>
                      setContent((s) => {
                        const next = [...s.pricing];
                        next[idx] = { ...t, highlight: e.currentTarget.checked };
                        return { ...s, pricing: next };
                      })
                    }
                  />
                  Highlight
                </label>
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="rounded-md px-2 py-1 text-xs ring-1 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    onClick={() =>
                      setContent((s) => ({
                        ...s,
                        pricing: s.pricing.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
