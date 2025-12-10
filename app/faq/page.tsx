"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const faqs = [
  { q: "How do I hire a freelancer?", a: "Browse or post a project, review proposals, and invite freelancers to interview." },
  { q: "Is there a fee to join?", a: "Browsing is free. Optional paid plans add visibility and advanced tools." },
  { q: "How are freelancers vetted?", a: "We combine profile signals, reviews, and community reporting for quality." },
  { q: "Do you support escrow?", a: "Payments and escrow will be available in a later step." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-semibold md:text-4xl">Frequently Asked Questions</h1>
      </Reveal>
      <div className="mt-6 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
        {faqs.map((f, i) => {
          const expanded = open === i;
          return (
            <div key={f.q}>
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span className="font-medium">{f.q}</span>
                <span className="text-gray-500">{expanded ? "−" : "+"}</span>
              </button>
              {expanded && (
                <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
