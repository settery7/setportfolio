/* The fork — docs/build-spec.md §0.

   Server component so the name, the identity line and both doors are in the
   HTML a crawler receives. The interactive parts live in ForkScreen. */

import type { Metadata } from "next";
import ForkScreen from "@/components/fork-screen";
import { identity } from "@/data/content";

export const metadata: Metadata = {
  title: identity.name,
  description: identity.oneLiner,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <ForkScreen />;
}
