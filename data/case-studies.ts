/* Case study content — docs/build-spec.md §5.

   Five blocks, fixed order: problem, what I built, the hard part, result,
   links. Typed rather than MDX so a missing block is a compile error; the
   spec's "done when" requires all five in every case study, and prose files
   cannot enforce that.

   The hard part is the point of each page. It is what separates this from a
   tutorial portfolio, so it explains why the problem existed, not only what
   was done about it. */

export type CaseStudy = {
  problem: string[];
  built: string[];
  hardPart: { heading: string; body: string[] };
  result: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  pykes: {
    problem: [
      "I wanted a platform where developers could share the work they were doing — updates tied to actual projects, rather than scattered across social platforms nobody controls. Nothing that existed did that without charging for it, so the whole thing was built to run on free infrastructure.",
      "That constraint is not a footnote. It decided the architecture.",
    ],
    built: [
      "A build-in-public platform. You register a project, post updates against it, and the project grows a pixel-art garden as you go. Posts are typed — update, idea, bug, shipped, release — and only a shipped post grows the garden, which is the rule the whole thing turns on. There is a follower graph, comments, photo attachments, and an explore feed.",
      "Underneath: a React frontend, an Express API with WebSocket support, PostgreSQL under versioned migrations, Redis for caching and rate limiting, and MinIO for S3-compatible object storage. Account handling is complete rather than demo-grade — email verification, password reset, and per-route rate limiting. Eight Playwright end-to-end specs cover the flows that matter, including who is allowed to make a garden grow.",
    ],
    hardPart: {
      heading: "Why the frontend and backend live on different hosts",
      body: [
        "Pykes runs on two hosts. The frontend is on Cloudflare Workers, the backend on Render. That looks like an odd split until you know why neither half can move.",
        "Cloudflare Workers does not run containers. It runs V8 isolates — small, short-lived execution contexts that spin up per request and can be evicted at any time. Nothing persists between invocations, which is exactly what makes it fast and free at the edge. It is also what makes it unable to host this API. A PostgreSQL client works by opening a TCP connection and keeping it open, and a connection pool only pays for itself if it survives across requests. In an environment where the execution context may not exist a moment later, there is no pool to keep. The same is true of Redis.",
        "So the backend needs an ordinary long-running container, and that is what Render provides. The frontend has the opposite shape: a static React bundle with no state, no sockets and nothing to keep warm, which is precisely what an edge runtime is best at.",
        "The alternative was to put everything on Render. Simpler — one origin, no CORS, one deploy. I hit CORS because of the split and had to handle it. But the cost of consolidating is worse than the cost of CORS: Render's free tier spins a service down after roughly fifteen minutes of inactivity, and a cold start takes the better part of a minute. Consolidating would mean the interface inherits that wait, so a visitor arriving at a sleeping site stares at nothing before the page even renders.",
        "Splitting it means the data waits, not the interface. The page is up instantly from the edge, and only the parts that need the backend pause while it wakes.",
      ],
    },
    result: [
      "A working hobby project, deployed and running. It is feature-complete for what it set out to do.",
      "The honest limit is that going further means paying for infrastructure. The zero-cost requirement that shaped the architecture is also the ceiling on it.",
    ],
  },

  whaloo: {
    problem: [
      "A study reviewer app, built by four of us. Students keep the things they revise with spread across separate apps — flashcards in one, the class timetable in another, notes in a third — and none of them know about each other.",
      "We wanted the reviewing and the scheduling in the same place, so that what you have to study and when you have to study it stop being two separate problems.",
    ],
    built: [
      "A Flutter application combining four tools students normally keep apart: a flashcard system with create, edit and review flows backed by a local database; schedule management; a to-do list; and a file viewer for study materials. The layout adapts to tablet as well as phone.",
      "I ran the project and wrote most of the code. Terms and conditions are included, because it was built for distribution rather than as an exercise.",
    ],
    hardPart: {
      heading:
        "Why the schedule screen kept overflowing, and what actually fixed it",
      body: [
        "The schedule had to draw class blocks as rectangles whose height means something — a 45-minute block and a three-hour block are not the same shape — across seven day columns, on both a phone and a tablet. It produced a constant stream of overflow warnings: the striped bars Flutter paints when a widget asks for more room than it has been given.",
        "The reason those warnings appear is worth stating plainly, because it is what I got wrong first. Flutter lays out by constraints passed down from parent to child. A column tells its children how much space is available, and if the children insist on more, the framework reports an overflow rather than quietly clipping. My schedule blocks were sized by their own content, so a day with enough entries produced a column taller than the screen — and no parent could accommodate it.",
        "My first attempt was a breakpoint. A ResponsiveLayout widget swapped an entire mobile tree for an entire tablet tree at 600px. It doubled the work and it did not help, and the reason it could not help is that the problem was never screen width. Both trees still built blocks whose heights came from their contents, so both still overflowed. Changing which widgets render at which width does nothing about content that does not fit at any width. Those files are still in the repository, marked for deletion.",
        "What worked was to stop laying the rectangles out and start computing them. Every time is normalised to minutes since midnight, so 2:30 PM becomes a single number and a schedule crossing midnight stops being a special case. The visible window comes from the earliest and latest scheduled item rather than a fixed 24 hours, so an empty morning costs no space. One constant converts minutes to pixels, every block's height falls out of its duration, and the grid is given an exact, known height inside a scroll view.",
        "That last part is the actual fix. Once the container's height is a number I calculated rather than whatever the children demand, there is nothing left to overflow — content taller than the screen becomes something you scroll instead of an error.",
      ],
    },
    result: [
      "Built to release readiness across 101 commits, but never submitted to the Play Store or TestFlight.",
      "Worth saying plainly rather than implying a launch that did not happen.",
    ],
  },

  remglove: {
    problem: [
      "Touch screens and voice assistants both assume something about the person using them — a free hand, or a voice the device recognises.",
      "RemGlove is a glove that reads American Sign Language hand signs through flex sensors and uses them to control TVs, lights and fans over Bluetooth Low Energy. Hands-free and contactless, for the people those two interfaces leave out.",
      "It was my thesis capstone, built by a team of three. I was responsible for the wireless layer and the AI.",
    ],
    built: [
      "The glove talks to the phone over BLE using the Nordic UART service, with the ESP32 advertising as RemGloves. The Flutter side exposes connection state as a small state machine — idle, scanning, connecting, connected, disconnected, error — and publishes three streams: live glove data, status and calibration. Each finger arrives both as a raw bend percentage and as a settled bent-or-straight state, calibrated per glove because no two flex sensors read alike.",
      "The AI layer summarises gesture logs. Aggregate counts — devices controlled, commands issued, calibrations run, over a date range — go to Gemini and come back as a short readable report rather than a table. It retries once on failure, and the API key lives in a gitignored secrets file, so it is not in the public repository.",
    ],
    hardPart: {
      heading: "Why the glove sends five bits instead of five sensor readings",
      body: [
        "The obvious way to send hand data over BLE is to stream five analog sensor values continuously and work out the gesture on the phone. We do not do that. The ESP32 decides for itself whether each finger is bent and packs the answer into five bits — bit 0 is the thumb, bit 4 is the pinky — so a whole hand position travels as a single number and reads as something like 11010.",
        "The reason comes down to what BLE actually is. It is Bluetooth Low Energy, and the low energy is the point: it is designed for small, infrequent packets from battery-powered devices, not for continuous streams. Five analog channels sampled fast enough to feel responsive is a lot of traffic for that radio, and every packet costs battery on a board strapped to someone's wrist. A five-bit code is one byte, however fast the hand moves.",
        "The second reason is about where the decision belongs. Streaming raw values means the phone has to interpret them, so the same judgement runs on every device, in a language and a threading model that has nothing to do with the sensors. Deciding on the ESP32 puts the judgement next to the hardware that produced the reading, and the phone receives an answer rather than a question. Thirty-two hand positions are possible in five bits, and each one arrives unambiguous.",
        "The cost is that the thresholds have to be right. A number that says bent when the finger is half-bent is wrong everywhere downstream, and there is no raw signal left on the phone to second-guess it with. That is why calibration is per glove and stored per profile, rather than a constant compiled into the firmware.",
      ],
    },
    result: [
      "It works, and it passed. The thesis was accepted.",
      "The app's own logs carry the numbers: 494 gestures recorded and 99 calibrations across the device list, with 373 gestures in a single week. A smart light and a smart fan are controllable from the glove, and the TV is the most-used device in the history log.",
    ],
  },
};
