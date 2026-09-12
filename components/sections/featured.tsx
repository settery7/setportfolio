/* The most important section on the site — docs/build-spec.md §4.

   Two projects, not three. The Dealership capstone sits in the coursework
   list below because it was built by following course steps and has no
   technical decision to anchor a case study. Do not pad this back to three.

   Covers are null until the real screenshots land in public/. A typographic
   placeholder is honest; a stock image is not. */

import Image from "next/image";
import { coursework, projects } from "@/data/content";

export default function Featured() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-20">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        Projects
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {featured.map((project, index) => (
          <article
            key={project.slug}
            className={`group flex flex-col rounded-lg border border-edge bg-surface/40 p-6 transition-colors duration-200 hover:border-signal ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            {/* Falls back to a dashed placeholder when a cover is missing,
                rather than a broken image or a stock photograph. */}
            {project.cover ? (
              <Image
                src={project.cover}
                alt={`${project.title} — screenshot of the running application`}
                width={1600}
                height={1000}
                className="mb-5 w-full rounded border border-edge object-cover"
              />
            ) : (
              <div className="mb-5 flex h-40 items-center justify-center rounded border border-dashed border-edge text-sm text-muted">
                Screenshot pending
              </div>
            )}

            <h3 className="font-display text-xl font-semibold">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{project.role}</p>
            <p className="measure mt-3 leading-relaxed">{project.outcome}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-edge px-2 py-0.5 font-mono text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  className="text-muted underline underline-offset-4"
                >
                  Repo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <h3 className="mt-16 font-display text-sm text-muted">Coursework</h3>
      <ul className="mt-4 divide-y divide-edge border-y border-edge">
        {coursework.map((item) => (
          <li key={item.title} className="py-4">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {item.title}
            </a>
            <p className="mt-1 text-sm text-muted">{item.note}</p>
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
