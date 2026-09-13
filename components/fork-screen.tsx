"use client";

/* The fork — docs/build-spec.md §0.

   It is a fork, not a gate. Both doors are real links to real indexable
   routes, the name and identity are readable without clicking anything, and
   the markup is server-rendered so a crawler sees all of it.

   The redirect for returning visitors runs client-side after mount, never on
   the server, for the same reason. Arriving with ?stay suppresses it, which
   is how the Menu control in the nav gets you back here instead of being
   bounced straight out again. */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { identity } from "@/data/content";
import { getTrack, setTrack, type Track } from "@/lib/track";

export default function ForkScreen() {
  const router = useRouter();
  const [hovered, setHovered] = useState<Track | null>(null);

  useEffect(() => {
    const stay = new URLSearchParams(window.location.search).has("stay");
    if (stay) return;
    const track = getTrack();
    if (track) router.replace(`/${track}`);
  }, [router]);

  const panel = (track: Track) => {
    const dimmed = hovered !== null && hovered !== track;
    const grown = hovered === track;
    return [
      "group relative flex min-h-[50vh] flex-1 flex-col justify-end p-8 transition-[flex-grow,opacity] duration-300 ease-out motion-reduce:transition-none sm:min-h-screen sm:p-12",
      grown ? "sm:grow-[1.4]" : "",
      dimmed ? "opacity-50" : "opacity-100",
    ].join(" ");
  };

  return (
    <main className="flex min-h-screen flex-col sm:flex-row">
      <Link
        href="/dev"
        onClick={() => setTrack("dev")}
        onMouseEnter={() => setHovered("dev")}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered("dev")}
        onBlur={() => setHovered(null)}
        className={`${panel("dev")} border-b border-edge sm:border-b-0 sm:border-r`}
      >
        <div className="absolute left-8 top-8 sm:left-12 sm:top-12">
          <h1 className="reveal reveal-1 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {identity.name}
          </h1>
          <p className="reveal reveal-2 measure mt-3 text-muted">
            {identity.oneLiner}
          </p>
        </div>

        <span className="reveal reveal-3 mt-auto block">
          <span className="font-display text-2xl font-semibold sm:text-3xl">
            I&rsquo;m hiring
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
              &rarr;
            </span>
          </span>
          <span className="mt-1 block text-muted">Projects, stack, CV</span>
        </span>
      </Link>

      <Link
        href="/play"
        onClick={() => setTrack("play")}
        onMouseEnter={() => setHovered("play")}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered("play")}
        onBlur={() => setHovered(null)}
        className={panel("play")}
      >
        <span className="reveal reveal-4 mt-auto block">
          <span className="font-display text-2xl font-semibold sm:text-3xl">
            I&rsquo;m curious
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
              &rarr;
            </span>
          </span>
          <span className="mt-1 block text-muted">
            Games and half-finished things
          </span>
        </span>
      </Link>
    </main>
  );
}
