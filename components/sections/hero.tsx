/* Say who he is and what he does, once, clearly — docs/build-spec.md §2.
   Static by design. No typewriter, no rotating titles, no particles. */

import Image from "next/image";
import Link from "next/link";
import { identity } from "@/data/content";

export default function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-20 md:grid-cols-[1.4fr_1fr] md:items-center md:py-28">
      <div>
        <h1 className="reveal reveal-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {identity.name}
        </h1>

        <p className="reveal reveal-2 measure mt-5 text-lg leading-relaxed text-muted">
          {identity.oneLiner} Based in {identity.location.split(",")[0]}.
        </p>

        <div className="reveal reveal-3 mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="press nudge rounded-full bg-signal px-5 py-2.5 font-semibold text-ink hover:opacity-90"
          >
            View projects
            <span className="arrow ml-2">&darr;</span>
          </Link>

          {identity.cvAvailable ? (
            <a
              href={identity.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="press nudge rounded-full border border-edge px-5 py-2.5 hover:border-sand"
            >
              Download CV
              <span className="arrow ml-2">&rarr;</span>
            </a>
          ) : null}
        </div>
      </div>

      {identity.portraitAvailable ? (
        <Image
          src={identity.portrait}
          alt={`${identity.name}, photographed straight on`}
          width={640}
          height={640}
          priority
          /* No border or rounding: the portrait is a cutout on transparency,
             so a frame would box in empty space. It sits directly on --ink.
             The mask fades the bottom edge, where the square crop otherwise
             ends in a hard horizontal cut across the shoulders. */
          className="reveal reveal-2 order-first w-full max-w-[16rem] justify-self-center object-contain [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)] md:order-none md:max-w-none"
        />
      ) : null}
    </section>
  );
}
