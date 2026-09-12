/* Typed content arrays. Every string here traces back to docs/content.md,
   which traces back to a real repository. Do not add an entry that has no
   artifact behind it. */

export type Project = {
  slug: string;
  title: string;
  outcome: string; // one line, what changed for the user
  role: string;
  year: string;
  tech: string[];
  cover: string | null; // /public path, null until the asset exists
  links: { live?: string; repo?: string; video?: string };
  featured: boolean;
  track: "dev" | "play";
};

export const projects: Project[] = [
  {
    slug: "pykes",
    title: "Pykes",
    outcome:
      "A build-in-public platform where shipping real work grows your project's garden.",
    role: "Solo build",
    year: "2026",
    tech: ["React", "Express", "PostgreSQL", "Redis", "Docker"],
    cover: null,
    links: {
      live: "https://pykes.settery.workers.dev/",
      repo: "https://github.com/settery7/pykes",
    },
    featured: true,
    track: "dev",
  },
  {
    slug: "whaloo",
    title: "Whaloo",
    outcome:
      "A Flutter study app that puts flashcards, schedules and notes in one place.",
    role: "Project manager, and wrote most of the code",
    year: "2025",
    tech: ["Flutter", "Dart"],
    cover: null,
    links: { repo: "https://github.com/settery7/whaloo" },
    featured: true,
    track: "dev",
  },
];

/* Shown openly as coursework. No case studies — the certificates already
   evidence this work; the value here is being straight about what it is. */
export const coursework = [
  {
    title: "Dealership Application",
    note: "IBM Skills Network capstone. Django, React, Node, MongoDB, Kubernetes.",
    href: "https://github.com/settery7/xrwvm-fullstack_developer_capstone",
  },
  {
    title: "CPU simulation",
    note: "Computer Engineering coursework.",
    href: "https://github.com/settery7/Simple-CPU-Simulation",
  },
  {
    title: "Number system conversion",
    note: "Decimal, binary, octal and hexadecimal. Computer Engineering coursework.",
    href: "https://github.com/settery7/Decimal-Binary-Octal-Hex-Conversion",
  },
];

/* Replaces the usual stats tiles. Range and evidence, not years served. */
export const proof = [
  {
    label: "IBM Full Stack Developer Professional Certificate",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/CBEGXGF2N74J",
  },
  {
    label: "Developing AI Applications with Python and Flask",
    href: "https://www.coursera.org/account/accomplishments/verify/FK33G0AW51Q0",
  },
  {
    label: "BS Computer Engineering — Cebu Institute of Technology",
    href: null,
  },
  { label: "Open source on GitHub", href: "https://github.com/settery7" },
];

/* A card with no proof link gets deleted, not padded. */
export const capabilities = [
  {
    title: "Full-stack web",
    detail: "React, Node and Express, PostgreSQL, Redis, WebSockets.",
    proof: "Pykes",
    href: "https://github.com/settery7/pykes",
  },
  {
    title: "Mobile",
    detail: "Flutter and Dart, local persistence, responsive layouts.",
    proof: "Whaloo",
    href: "https://github.com/settery7/whaloo",
  },
  {
    title: "Deployment and infrastructure",
    detail: "Docker, Kubernetes, Caddy, GitHub Actions CI.",
    proof: "Pykes",
    href: "https://github.com/settery7/pykes",
  },
  {
    title: "Testing",
    detail: "Playwright end-to-end suites covering auth and permissions.",
    proof: "Pykes",
    href: "https://github.com/settery7/pykes",
  },
];

export const identity = {
  name: "Clayne Cezclark Nable",
  oneLiner:
    "Computer Engineering graduate building full-stack web and mobile applications — React, Node, PostgreSQL, Flutter — and self-hosting them end to end with Docker.",
  location: "Cebu, Philippines",
  email: "n.cezclayne@gmail.com",
  github: "https://github.com/settery7",
  linkedin: "https://www.linkedin.com/in/settery/",
  /* public/clayne-nable-cv.pdf exists, so the hero renders the download. If
     the file is ever removed, set this back to false rather than shipping a
     link that 404s. */
  cvAvailable: true,
  cvPath: "/clayne-nable-cv.pdf",
  /* Background-removed cutout, 1280×1280 WebP with alpha, 101KB. Converted
     from the 3.85MB source PNG now kept in to-import/. */
  portrait: "/portrait.webp",
  portraitAvailable: true,
};
