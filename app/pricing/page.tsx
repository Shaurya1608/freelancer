import { Reveal } from "@/components/Reveal";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    desc: "Post a project and receive proposals.",
    features: ["Unlimited browsing", "Basic posting", "Standard Support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29/mo",
    desc: "Enhanced visibility and faster hiring.",
    features: ["Featured listings", "Priority Support", "Advanced search filters"],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "$99/mo",
    desc: "For teams hiring at scale.",
    features: ["Team management", "Bulk invites", "Dedicated success manager"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-semibold md:text-4xl">Pricing</h1>
      </Reveal>
      <Reveal>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          Simple plans that grow with your hiring needs.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <Reveal key={t.name}>
            <div
              className={`card-hover rounded-2xl border p-6 shadow-sm dark:bg-gray-900 ${
                t.highlight
                  ? "border-blue-300/60 bg-blue-50/60 dark:border-blue-500/40 dark:bg-blue-500/10"
                  : "border-gray-200 bg-white dark:border-gray-800"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{t.desc}</span>
              </div>
              <div className="mt-4 text-3xl font-bold">{t.price}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500">
                {t.cta}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
