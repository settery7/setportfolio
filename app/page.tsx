/* Phase 1 scaffold check. This page exists only to prove the tokens and fonts
   are wired correctly, and is replaced entirely by the fork screen in
   docs/build-spec.md §0. No sections, no motion. */

const tokens = [
  { name: "ink", value: "#04211D", use: "page base" },
  { name: "surface", value: "#0A302A", use: "raised cards and panels" },
  { name: "edge", value: "#174A41", use: "hairlines, card borders" },
  { name: "sand", value: "#EDE6D8", use: "primary text" },
  { name: "muted", value: "#7E9A93", use: "secondary text, captions" },
  { name: "signal", value: "#F2A93B", use: "the single accent" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Clayne Cezclark Nable
      </h1>

      <p className="measure mt-4 text-lg text-muted">
        Computer Engineering graduate building full-stack web and mobile
        applications — React, Node, PostgreSQL, Flutter — and self-hosting them
        end to end with Docker. Based in Cebu.
      </p>

      <section className="mt-16">
        <h2 className="font-display text-sm tracking-tight text-muted">
          Tokens
        </h2>
        <ul className="mt-4 divide-y divide-edge border-y border-edge">
          {tokens.map((token) => (
            <li key={token.name} className="flex items-center gap-4 py-3">
              <span
                aria-hidden
                className="size-8 shrink-0 rounded border border-edge"
                style={{ background: `var(--${token.name})` }}
              />
              <span className="font-mono text-sm">--{token.name}</span>
              <span className="font-mono text-sm text-muted">
                {token.value}
              </span>
              <span className="ml-auto text-sm text-muted">{token.use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-sm tracking-tight text-muted">
          Typefaces
        </h2>
        <div className="mt-4 space-y-3">
          <p className="font-display text-2xl">
            Bricolage Grotesque — display, headings only
          </p>
          <p className="font-body text-lg">
            Karla — body text, everything else. Line length caps at 72
            characters.
          </p>
          <p className="font-mono text-sm">
            JetBrains Mono — code snippets only, never decoration
          </p>
        </div>
      </section>

      <p className="mt-16 border-t border-edge pt-6 text-sm text-muted">
        Scaffold only. The accent below is the one thing on this screen carrying{" "}
        <span className="text-signal">--signal</span>, which is the rule: one
        amber thing per screen.
      </p>
    </main>
  );
}
