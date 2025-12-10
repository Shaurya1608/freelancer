import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2 font-semibold">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow">
                FH
              </span>
              <span>FreelanceHub</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Hire top talent and build faster. Designed for teams and creators.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Marketplace</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link className="hover:underline" href="/freelancers">Freelancers</Link></li>
              <li><Link className="hover:underline" href="/projects">Projects</Link></li>
              <li><Link className="hover:underline" href="/categories">Categories</Link></li>
              <li><Link className="hover:underline" href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link className="hover:underline" href="/about">About</Link></li>
              <li><Link className="hover:underline" href="/faq">FAQ</Link></li>
              <li><Link className="hover:underline" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Follow</h4>
            <div className="mt-3 flex gap-3 text-gray-600 dark:text-gray-400">
              <a className="focus-ring inline-flex items-center justify-center rounded-md p-2 hover:text-blue-600 dark:hover:text-blue-400" href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.7.3-1.4.5-2.1.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.4 1-1.4-1.5-3.8-1.5-5.2 0-1 1-1.4 2.5-1 3.9-3.2-.2-6.1-1.7-8.1-4.2-1 1.8-.5 4.2 1.2 5.4-.6 0-1.2-.2-1.8-.5 0 2 1.4 3.8 3.4 4.2-.6.2-1.2.2-1.8.1.5 1.7 2.1 3 3.9 3.1-1.8 1.4-4 2-6.2 1.7 2 1.3 4.3 2 6.7 2 8 0 12.4-6.7 12.1-12.7.8-.6 1.4-1.3 1.9-2.1z"/></svg>
              </a>
              <a className="focus-ring inline-flex items-center justify-center rounded-md p-2 hover:text-blue-600 dark:hover:text-blue-400" href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 8.98h3.96V21H3V8.98zM9.89 8.98H13.7v1.63h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-3.96v-5.33c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.82V21H9.89V8.98z"/></svg>
              </a>
              <a className="focus-ring inline-flex items-center justify-center rounded-md p-2 hover:text-blue-600 dark:hover:text-blue-400" href="#" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.49-1.1-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.9.85.09-.67.35-1.11.63-1.37-2.22-.26-4.55-1.15-4.55-5.12 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.33.1-2.77 0 0 .85-.28 2.8 1.06a9.3 9.3 0 015.1 0c1.95-1.34 2.8-1.06 2.8-1.06.55 1.44.2 2.51.1 2.77.64.72 1.03 1.64 1.03 2.77 0 3.98-2.34 4.85-4.57 5.11.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.04 10.04 0 0022 12.26C22 6.58 17.52 2 12 2z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6 text-sm text-gray-500 dark:border-gray-900 dark:text-gray-400">
          © {new Date().getFullYear()} FreelanceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
