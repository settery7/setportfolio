/* Contact — docs/build-spec.md §10, now a section at the foot of /dev rather
   than its own route. One page, one scroll: a visitor who reads to the end
   arrives at the form instead of having to navigate to it.

   /dev/contact still resolves and redirects here, so any link already shared
   keeps working. */

import ContactForm from "@/components/contact-form";
import Reveal from "@/components/reveal";
import { identity } from "@/data/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl border-t border-edge px-6 py-20"
    >
      {/* Grouped, not animated word by word: heading and intro arrive
          together, then the form. The brief asks for related content to be
          revealed naturally rather than element by element. */}
      <Reveal>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Get in touch
        </h2>
        <p className="measure mt-4 text-lg text-muted">
          I&rsquo;m looking for full-stack or mobile development work. The
          fastest way to reach me is email, and I read everything that arrives.
        </p>
      </Reveal>

      <Reveal delay={90}>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-6 border-t border-edge pt-6 text-sm">
        <a
          href={identity.github}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          GitHub
        </a>
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${identity.email}`}
          className="underline underline-offset-4"
        >
          {identity.email}
        </a>
      </div>
    </section>
  );
}
