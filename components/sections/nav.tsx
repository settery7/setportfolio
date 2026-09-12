"use client";

/* Orientation and the track toggle — docs/build-spec.md §1.
   Client because it reads scroll position and writes localStorage. */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { setTrack, type Track } from "@/lib/track";

const links = [
  { href: "/dev#projects", label: "Projects" },
  { href: "/dev#about", label: "About" },
  { href: "/dev/contact", label: "Contact" },
];

export default function Nav({ track = "dev" }: { track?: Track }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* Hairline border appears only after 40px of scroll. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const other: Track = track === "dev" ? "play" : "dev";
  const otherLabel = other === "play" ? "Wander around" : "The work";

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
        <Link href="/dev" className="font-display text-lg font-semibold">
          Clayne.
        </Link>

        <ul className="ml-auto hidden items-center gap-6 sm:flex">
          {links.map((link) => {
            /* In-page anchors are not "the current page" — only a real route
               match counts, or every hash link on /dev claims aria-current. */
            const active = !link.href.includes("#") && pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm underline-offset-8 hover:underline ${
                    active ? "font-semibold underline" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={`/${other}`}
              onClick={() => setTrack(other)}
              className="rounded-full border border-edge px-4 py-1.5 text-sm hover:border-signal"
            >
              {otherLabel}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="ml-auto rounded border border-edge px-3 py-1.5 text-sm sm:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
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
              href={`/${other}`}
              onClick={() => {
                setTrack(other);
                setOpen(false);
              }}
              className="block py-2 text-signal"
            >
              {otherLabel}
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
