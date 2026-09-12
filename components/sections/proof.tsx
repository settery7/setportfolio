/* Replaces the reference site's stats tiles — docs/build-spec.md §3.
   Those reward years served. This rewards range and evidence, which is the
   stronger hand for someone early in their career.

   Every link here must open a real verification page. A dead credential link
   is worse than having no strip at all. */

import { proof } from "@/data/content";

export default function ProofStrip() {
  return (
    <section
      aria-label="Credentials and proof"
      className="border-y border-edge bg-surface/40"
    >
      <ul className="mx-auto flex w-full max-w-5xl snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-6 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {proof.map((item) => (
          <li
            key={item.label}
            className="min-w-[16rem] shrink-0 snap-start sm:min-w-0"
          >
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm leading-relaxed underline-offset-4 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="block text-sm leading-relaxed text-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
