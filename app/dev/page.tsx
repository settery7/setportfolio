/* The professional track. This is what goes on the CV and on LinkedIn.
   Section order follows docs/build-spec.md. No motion in Phase 1. */

import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ProofStrip from "@/components/sections/proof";
import Featured from "@/components/sections/featured";
import Capabilities from "@/components/sections/capabilities";
import Contact from "@/components/sections/contact";
import { identity } from "@/data/content";

export const metadata: Metadata = {
  /* Recruiters search the full name — build-spec §12. */
  title: `${identity.name} — Full-stack developer`,
  description: identity.oneLiner,
  alternates: { canonical: "/dev" },
};

export default function DevPage() {
  return (
    <main>
      <Hero />
      <ProofStrip />
      <Featured />
      <Capabilities />
      <Contact />
    </main>
  );
}
