/* Name, the link to the other track, social links, year — and nothing else.
   docs/build-spec.md §11. */

import Link from "next/link";
import { identity } from "@/data/content";
import type { Track } from "@/lib/track";

export default function Footer({ track = "dev" }: { track?: Track }) {
  const other: Track = track === "dev" ? "play" : "dev";

  return (
    <footer className="mt-auto border-t border-edge">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-10 text-sm">
        <span className="font-display font-semibold">{identity.name}</span>

        <Link href={`/${other}`} className="text-muted hover:text-sand">
          {other === "play" ? "Wander around" : "The work"}
        </Link>

        <a
          href={identity.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-sand"
        >
          GitHub
        </a>
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-sand"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${identity.email}`}
          className="text-muted hover:text-sand"
        >
          Email
        </a>

        <span className="ml-auto text-muted">{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
