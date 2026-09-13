"use client";

/* Reveals a child once, when it first scrolls into view.

   Deliberately applied to elements — cards, rows — and never to a whole
   section. CLAUDE.md lists "a fade-and-slide-up entrance on every single
   section" among the things this project does not do, and it is right: doing
   it everywhere is what makes a site feel generated.

   Fires once and then disconnects. Nothing re-animates when you scroll back
   up, which is the behaviour that usually turns a nice effect irritating.

   Reduced motion is handled entirely in CSS: the hidden state only exists
   inside a prefers-reduced-motion: no-preference query, so someone who asked
   for less movement sees the content immediately and no JS branch is needed
   to arrange it. That also keeps setState out of the effect body, where React
   now warns about cascading renders — it only ever fires from the observer
   callback, which is a subscription. */

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "shown" : "hidden"}
      style={{ transitionDelay: `${delay}ms` }}
      className="reveal-on-scroll"
    >
      {children}
    </div>
  );
}
