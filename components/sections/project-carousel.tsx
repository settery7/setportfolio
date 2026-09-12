"use client";

/* Coverflow carousel for the featured projects.

   Built with CSS 3D transforms and React state rather than a carousel
   library, because CLAUDE.md's stack table does not list one and the effect
   is about forty lines of transform maths.

   Accessibility notes, since carousels are usually where it goes wrong:
   - Arrow keys move between projects when the carousel has focus.
   - Off-centre cards are inert: aria-hidden and removed from the tab order,
     so a keyboard user never tabs into a card they cannot see.
   - A live region announces the current project for screen readers.
   - prefers-reduced-motion removes the transition, not the functionality. */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/content";
import RotatingCover from "@/components/rotating-cover";

const featured = projects.filter((p) => p.featured);

/* A pointer has to travel this far before it counts as a swipe rather than a
   click. Below it, a drag on the active card is still a click on whatever
   sits under the finger — otherwise the links become impossible to press. */
const SWIPE_THRESHOLD = 45;

export default function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const count = featured.length;

  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + count) % count),
    [count],
  );

  /* Swipe, via pointer events so one code path covers touch, pen and a mouse
     drag. touch-action below keeps vertical scrolling with the page. */
  const onPointerDown = (event: React.PointerEvent) => {
    dragStart.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = dragStart.current;
    dragStart.current = null;
    if (start === null) return;
    const travelled = event.clientX - start;
    if (Math.abs(travelled) < SWIPE_THRESHOLD) return;
    /* A swipe that began on a neighbouring card would otherwise also fire
       that card's click, moving two places at once. Swallow the click that
       follows this gesture. */
    swiped.current = true;
    window.setTimeout(() => {
      swiped.current = false;
    }, 0);
    /* Dragging left pulls the next card in, matching how a physical stack
       of cards behaves. */
    go(travelled < 0 ? 1 : -1);
  };

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [go]);

  /* Shortest signed distance around the loop, so card 0 sits next to card 2
     rather than two steps away. With three projects there is always one card
     either side of the centre. */
  const offsetOf = (index: number) => {
    let d = index - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div
      ref={regionRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
    >
      {/* The outer element clips. Off-centre cards are translated sideways and
          rotated, and without this they push the page into horizontal scroll
          at narrow widths — 160px of it at 375px before this was added.
          Clipping keeps the neighbours peeking in, which is the effect anyway.

          Cards are absolutely positioned, so the stage also needs an explicit
          height tall enough for the longest card. Too short and the controls
          below end up underneath the card, out of reach. */}
      <div
        /* select-none stops a drag from painting a text selection across the
           cards, and the dragStart guard stops the browser picking an image
           or a link up as a native drag ghost. Both happen on any pointer
           drag otherwise, and both look broken.

           The cost is that project text inside the carousel cannot be
           selected or copied. Every link is still a real link, so nothing
           becomes unreachable. */
        className="touch-pan-y select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="relative h-[41rem] sm:h-[38rem] [perspective:1600px] [transform-style:preserve-3d]">
          {featured.map((project, index) => {
            const offset = offsetOf(index);
            const isActive = offset === 0;
            const distance = Math.abs(offset);
            return (
              <article
                key={project.slug}
                aria-hidden={!isActive}
                /* Clicking a neighbour brings it to the centre. Only the two
                   visible neighbours accept pointer events; anything further
                   back stays inert so a stray click cannot hit a card nobody
                   can see. Keyboard users have the arrow keys and the buttons
                   below, so no focusable element is added to a hidden card. */
                onClick={
                  isActive
                    ? undefined
                    : () => {
                        if (swiped.current) return;
                        setActive(index);
                      }
                }
                className={`absolute left-1/2 top-0 w-[min(38rem,85vw)] rounded-lg border border-edge bg-surface p-5 transition-transform duration-500 ease-out motion-reduce:transition-none ${
                  isActive ? "" : "cursor-pointer"
                }`}
                style={{
                  transform: `translateX(-50%) translateX(${offset * 58}%) translateZ(${distance * -320}px) rotateY(${offset * -32}deg)`,
                  opacity: distance > 1 ? 0 : isActive ? 1 : 0.45,
                  zIndex: count - distance,
                  pointerEvents: distance <= 1 ? "auto" : "none",
                }}
              >
                {project.cover && project.gallery ? (
                  /* Two images, cross-faded. RemGlove is the only project
                     where one picture cannot carry it: the glove alone reads
                     as electronics, the app alone as any Flutter UI. */
                  <RotatingCover
                    cover={project.cover}
                    gallery={project.gallery}
                    title={project.title}
                    active={isActive}
                  />
                ) : project.cover ? (
                  <Image
                    src={project.cover}
                    alt={`${project.title} — screenshot of the running application`}
                    width={1600}
                    height={1000}
                    draggable={false}
                    className="mb-4 aspect-[16/10] w-full rounded border border-edge object-cover"
                  />
                ) : null}

                <h3 className="font-display text-xl font-semibold">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.role}</p>
                <p className="mt-2 leading-relaxed">{project.outcome}</p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-edge px-2 py-0.5 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isActive ? 0 : -1}
                      className="underline underline-offset-4"
                    >
                      Live demo
                    </a>
                  ) : null}
                  {project.links.repo ? (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isActive ? 0 : -1}
                      className="text-muted underline underline-offset-4"
                    >
                      Repo
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="rounded-full border border-edge px-4 py-2 hover:border-signal"
        >
          &#8249;
        </button>

        <p aria-live="polite" className="text-sm text-muted">
          {featured[active].title} — {active + 1} of {count}
        </p>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="rounded-full border border-edge px-4 py-2 hover:border-signal"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
