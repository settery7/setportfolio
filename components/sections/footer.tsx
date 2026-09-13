/* Name, the link to the other track, social links, year — and nothing else.
   docs/build-spec.md §11. */

import Link from "next/link";
import { identity } from "@/data/content";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-edge">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-10 text-sm">
        <span className="font-display font-semibold">{identity.name}</span>

        {/* Back to the fork, not across to the other track. The personal
            side is reachable from the menu only — see nav.tsx. */}
        <Link href="/?stay=1" className="text-muted hover:text-sand">
          &larr; Menu
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
