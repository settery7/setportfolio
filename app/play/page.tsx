/* The personal track. Phase 2 gives this a real design; for now it exists so
   the track toggle in the nav never points at a 404.

   These are prototypes and experiments, and the page says so plainly. An
   unfinished prototype presented as a prototype is honest and interesting.
   The same thing presented as a finished game is not. */

import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/sections/nav";
import Footer from "@/components/sections/footer";
import { identity } from "@/data/content";

export const metadata: Metadata = {
  title: `Play — ${identity.name}`,
  description:
    "Game prototypes and experiments in Unity and Godot. Mostly unfinished, which is the point.",
  alternates: { canonical: "/play" },
};

const prototypes = [
  {
    title: "How To Swim Your Fish",
    engine: "Godot",
    note: "A hypercasual game where you guide a fish with feed to reach the objective, built with Joprax and Rei-sama077 for Mini Jame Gam #51. The theme put speakers behind the current pushing the fish around.",
    badge: "Mini Jame Gam #51 — 7th, theme implementation",
    badgeHref: "https://itch.io/jam/mini-jame-gam-51/rate/4274527",
    href: "https://github.com/settery7/HowToSwimYourFish",
    cover: "/covers/hty.webp",
  },
  {
    title: "Tek-Trails",
    engine: "Unity",
    note: "A virtual pet that merges study sessions with pet care, plus campus navigation around CIT-U. Team project, abandoned prototype.",
    href: "https://github.com/settery7/Tek-Trails",
  },
  {
    title: "anito",
    engine: "Godot",
    note: "An RPG built around mythical creatures. Early prototype.",
    href: "https://github.com/settery7/anito",
  },
];

export default function PlayPage() {
  return (
    <>
      <Nav track="play" />
      <main className="mx-auto w-full max-w-5xl px-6 py-20">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Play
        </h1>
        <p className="measure mt-4 text-lg text-muted">
          Things I build when nobody is grading them. Mostly unfinished, which
          is the point.
        </p>

        <ul className="mt-10 divide-y divide-edge border-y border-edge">
          {prototypes.map((prototype) => (
            <li key={prototype.title} className="py-6">
              <a
                href={prototype.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl font-semibold underline-offset-4 hover:underline"
              >
                {prototype.title}
              </a>
              <p className="mt-1 font-mono text-xs text-muted">
                {prototype.engine}
              </p>
              {/* The one placement on the site, so it carries --signal here.
                  Nothing else on this page competes for the accent. It links
                  to the results table, which is what turns it from a claim
                  into proof — the standard every other line is held to. */}
              {"badge" in prototype && prototype.badge ? (
                <a
                  href={prototype.badgeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded-full border border-signal px-3 py-1 text-xs text-signal hover:bg-signal hover:text-ink"
                >
                  {prototype.badge}
                </a>
              ) : null}
              <p className="measure mt-2 leading-relaxed text-muted">
                {prototype.note}
              </p>
              {"cover" in prototype && prototype.cover ? (
                <Image
                  src={prototype.cover}
                  alt={`${prototype.title} — title screen`}
                  width={1139}
                  height={635}
                  className="mt-4 w-full max-w-lg rounded border border-edge"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </main>
      <Footer track="play" />
    </>
  );
}
