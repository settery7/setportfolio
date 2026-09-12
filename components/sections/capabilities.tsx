/* Capability backed by evidence, not a job history — docs/build-spec.md §7.
   Named "capabilities" rather than "experience" deliberately.

   Equal weight, uniform tiles: this is genuinely a set, so no hierarchy. */

import { capabilities } from "@/data/content";

export default function Capabilities() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl border-t border-edge px-6 py-20"
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        What I can do
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <article
            key={capability.title}
            className="rounded-lg border border-edge bg-surface/40 p-6"
          >
            <h3 className="font-display text-lg font-semibold">
              {capability.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">
              {capability.detail}
            </p>
            <a
              href={capability.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm underline underline-offset-4"
            >
              Proof: {capability.proof}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
