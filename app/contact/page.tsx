import { Reveal } from "@/components/Reveal";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-semibold md:text-4xl">Contact Us</h1>
      </Reveal>
      <Reveal>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Questions, feedback, or partnership opportunities? We’d love to hear from you.
        </p>
      </Reveal>

      <Reveal>
        <form className="mt-6 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">Name</label>
            <input id="name" name="name" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white" placeholder="How can we help?" />
          </div>
          <button type="button" className="btn-press inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500">
            Send Message
          </button>
        </form>
      </Reveal>
    </div>
  );
}
