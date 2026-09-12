/* docs/build-spec.md §10. Copy is approved in docs/content.md. */

import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { identity } from "@/data/content";

export const metadata: Metadata = {
  title: `Contact — ${identity.name}`,
  description: `Get in touch with ${identity.name}, full-stack and mobile developer based in ${identity.location}.`,
  alternates: { canonical: "/dev/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Get in touch
      </h1>
      <p className="measure mt-4 text-lg text-muted">
        I&rsquo;m looking for full-stack or mobile development work. The fastest
        way to reach me is email, and I read everything that arrives.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>

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
    </main>
  );
}
