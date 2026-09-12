/* Case study template — docs/build-spec.md §5.

   Five blocks in fixed order, previous/next links at the foot. Statically
   generated for the three project slugs. */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { identity, projects } from "@/data/content";

const featured = projects.filter((p) => p.featured);

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = featured.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${identity.name}`,
    description: project.outcome,
    alternates: { canonical: `/dev/projects/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featured.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();

  const index = featured.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? featured[index - 1] : null;
  const next = index < featured.length - 1 ? featured[index + 1] : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link
        href="/dev#projects"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        Back to projects
      </Link>

      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-3 text-muted">
        {project.role}. {project.year}.
      </p>

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

      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} — the running project`}
          width={1600}
          height={1000}
          priority
          className="mt-8 w-full rounded border border-edge"
        />
      ) : null}

      <Block title="Problem" paragraphs={study.problem} />
      <Block title="What I built" paragraphs={study.built} />

      <section className="mt-12">
        <h2 className="font-display text-sm text-muted">The hard part</h2>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          {study.hardPart.heading}
        </h3>
        {study.hardPart.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>

      <Block title="Result" paragraphs={study.result} />

      {project.gallery ? (
        <Image
          src={project.gallery.src}
          alt={project.gallery.alt}
          width={1400}
          height={1035}
          className="mt-8 w-full rounded border border-edge"
        />
      ) : null}

      <section className="mt-12 border-t border-edge pt-6">
        <h2 className="font-display text-sm text-muted">Links</h2>
        <div className="mt-3 flex flex-wrap gap-5 text-sm">
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
              className="underline underline-offset-4"
            >
              Repository
            </a>
          ) : null}
        </div>
      </section>

      <nav
        aria-label="Other case studies"
        className="mt-12 flex justify-between gap-6 border-t border-edge pt-6 text-sm"
      >
        {previous ? (
          <Link
            href={`/dev/projects/${previous.slug}`}
            className="text-muted hover:text-sand"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/dev/projects/${next.slug}`}
            className="ml-auto text-muted hover:text-sand"
          >
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </main>
  );
}

function Block({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-sm text-muted">{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
