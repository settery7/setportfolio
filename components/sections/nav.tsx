"use client";

/* Orientation, and the way back to the fork — docs/build-spec.md §1.

   The track toggle is gone. The personal track is reachable from the fork
   screen only, which keeps /dev free of anything a recruiter did not come
   for. Both routes stay real and directly linkable, so nothing is hidden
   from a crawler or from anyone holding the URL — see CLAUDE.md § the core
   concept, where that rule is recorded.

   Menu carries ?stay so the fork does not immediately bounce a returning
   visitor back into the track they just left. */

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Track } from "@/lib/track";

const devLinks = [
  { href: "/dev#projects", label: "Projects" },
  { href: "/dev#about", label: "About" },
  { href: "/dev#contact", label: "Contact" },
];

export default function Nav({ track = "dev" }: { track?: Track }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = track === "dev" ? devLinks : [];

  return (
    <header
      className={`sticky top-0 z-50 bg-ink/80 backdrop-blur-md ${
        scrolled ? "border-b border-edge" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4"
      >
        <Link
          href={track === "dev" ? "/dev" : "/play"}
          className="font-display text-lg font-semibold"
        >
          Clayne.
        </Link>

        <ul className="ml-auto hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted underline-offset-8 hover:text-sand hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/?stay=1"
              className="rounded-full border border-edge px-4 py-1.5 text-sm hover:border-signal"
            >
              &larr; Menu
            </Link>
          </li>
        </ul>

        {links.length > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="ml-auto rounded border border-edge px-3 py-1.5 text-sm sm:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        ) : (
          <Link
            href="/?stay=1"
            className="ml-auto rounded-full border border-edge px-4 py-1.5 text-sm sm:hidden"
          >
            &larr; Menu
          </Link>
        )}
      </nav>

      {open && links.length > 0 && (
        <ul
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-edge px-6 pb-4 sm:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/?stay=1"
              onClick={() => setOpen(false)}
              className="block py-2 text-signal"
            >
              &larr; Back to menu
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
