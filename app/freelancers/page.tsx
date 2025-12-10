import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <Reveal>
        <h1 className="text-3xl font-semibold md:text-4xl">About FreelanceHub</h1>
      </Reveal>
      <Reveal>
        <p className="mt-2 max-w-3xl text-gray-600 dark:text-gray-400">
          We connect world-class freelancers with forward-thinking teams. Our mission is to make work flexible, efficient, and joyful.
        </p>
      </Reveal>

      <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
        <Reveal>
          <div className="relative h-64 w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Team collaborating"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              We believe great products are built by empowered people. That's why our platform focuses on trust, transparency, and great UX for both sides of the marketplace.
            </p>
            <p>
              With robust search, curated talent, and streamlined collaboration workflows, FreelanceHub helps you move from idea to impact quickly.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
