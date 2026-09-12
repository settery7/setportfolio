/* Placeholder for the fork screen — docs/build-spec.md §0 builds this properly
   in Phase 2, with the split panels and the single orchestrated reveal.

   For now it does the two things the fork must always do: show the name and
   the one-line identity so a visitor who never clicks still learns who this
   is, and offer both doors as real, indexable links. No motion yet. */

import Link from "next/link";
import { identity } from "@/data/content";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {identity.name}
      </h1>
      <p className="measure mt-4 text-lg text-muted">{identity.oneLiner}</p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dev"
          className="rounded-lg border border-edge bg-surface/40 p-6 hover:border-signal"
        >
          <span className="font-display text-xl font-semibold">
            I&rsquo;m hiring
          </span>
          <span className="mt-2 block text-muted">Projects, stack, CV</span>
        </Link>

        <Link
          href="/play"
          className="rounded-lg border border-edge bg-surface/40 p-6 hover:border-sand"
        >
          <span className="font-display text-xl font-semibold">
            I&rsquo;m curious
          </span>
          <span className="mt-2 block text-muted">The non-work stuff</span>
        </Link>
      </div>
    </main>
  );
}
