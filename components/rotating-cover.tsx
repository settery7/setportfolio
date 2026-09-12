"use client";

/* Cross-fades between two images on a timer. Used by RemGlove, where the
   hardware and the software each tell half the story and a carousel slide
   only has room for one.

   This is the site's only piece of motion that a visitor did not ask for, so
   it is fenced in:
   - It stops entirely under prefers-reduced-motion, showing the first image.
   - It pauses on hover and on focus, which is the pause mechanism WCAG 2.2.2
     wants for anything that auto-updates.
   - It only runs on the active carousel slide. No point animating a card
     angled away from the viewer at 45 degrees. */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 3000;

export default function RotatingCover({
  cover,
  gallery,
  title,
  active,
}: {
  cover: string;
  gallery: { src: string; alt: string };
  title: string;
  active: boolean;
}) {
  const [showSecond, setShowSecond] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!active || paused || reduced.current) return;
    const id = window.setInterval(() => setShowSecond((v) => !v), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [active, paused]);

  const images = [
    { src: cover, alt: `${title} — the hardware`, visible: !showSecond },
    { src: gallery.src, alt: gallery.alt, visible: showSecond },
  ];

  return (
    <div
      className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded border border-edge"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 85vw, 38rem"
          draggable={false}
          className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            image.visible ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
