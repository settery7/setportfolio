/* The most important section on the site — docs/build-spec.md §4.

   Presentation is a coverflow carousel, chosen deliberately over the bento
   grid the spec describes. The tradeoff, recorded so nobody has to rediscover
   it: the grid showed all three projects at once and used tile size to say
   which was strongest, while the carousel shows one at a time and makes them
   equal. If projects ever outgrow this section, the carousel is the layout
   that scales. */

import Reveal from "@/components/reveal";
import { coursework } from "@/data/content";
import ProjectCarousel from "@/components/sections/project-carousel";

export default function Featured() {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-20">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        Projects
      </h2>

      <div className="mt-10">
        <ProjectCarousel />
      </div>

      <h3 className="mt-16 font-display text-sm text-muted">Coursework</h3>
      <ul className="mt-4 divide-y divide-edge border-y border-edge">
        {coursework.map((item, index) => (
          <li key={item.title} className="py-4">
            <Reveal delay={index * 70}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {item.title}
              </a>
              <p className="mt-1 text-sm text-muted">{item.note}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-muted">
        Listed as coursework because that is what it is. The certificates above
        evidence the same work.
      </p>
    </section>
  );
}
