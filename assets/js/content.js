/*
 * All the text, links and images on the site live in this file.
 * Edit here, commit, and GitHub Pages redeploys in about a minute.
 * You never need to touch index.html or main.js to change content.
 */
window.SITE = {
  name: "Mohamed Kinan",
  initials: "MK",
  role: "Principal Flutter Engineer",
  location: "Cairo, Egypt",
  availability: "Open to remote roles",
  email: "mohamed.kinan3@gmail.com",
  links: {
    github: "https://github.com/mokinan",
    linkedin: "https://www.linkedin.com/in/mohamed-kinan-7883851a8/",
  },

  hero: {
    // <em> renders in the italic serif accent.
    title: "Flutter apps that keep working — <em>offline, at scale,</em> and years after launch.",
    intro:
      "I'm a Principal Flutter Engineer with 7 years of shipping production apps. " +
      "I lead mobile engineering for the Rassd Cloud product line and Madark, " +
      "where I own the architecture, the standards and the release pipeline.",
    // Screens cycled inside the hero phones.
    screens: [
      { src: "assets/img/wallet/home-arabic.png", alt: "Wallet home screen in Arabic" },
      { src: "assets/img/marketplace/feed.png", alt: "Marketplace listing feed" },
      { src: "assets/img/wallet/insights.png", alt: "Wallet spending insights" },
      { src: "assets/img/marketplace/details.png", alt: "Marketplace listing details" },
    ],
  },

  stats: [
    { value: 7, label: "years building production apps with Flutter" },
    { value: 3, label: "products shipped and maintained in production" },
    { value: 2, label: "open-source Dart packages" },
    { text: "AR · EN", label: "bilingual, RTL-first interfaces" },
  ],

  production: {
    note: "Source code is proprietary. Happy to walk through the architecture and decisions in an interview.",
    items: [
      {
        name: "Madark",
        url: "https://madark.sa",
        domain: "Fintech · Education financing",
        description:
          "Tuition financing for parents — from the application through installment plans to repayment.",
        tags: ["Financing", "Installments", "Repayments"],
      },
      {
        name: "Rassd Billing",
        url: "https://rassd.sa",
        domain: "ERP / SaaS · Invoicing",
        description:
          "Cloud billing and invoicing for businesses, part of the Rassd Cloud suite.",
        tags: ["Invoicing", "Cloud ERP"],
      },
      {
        name: "Rassd Attendance",
        url: "https://rassd.sa",
        domain: "ERP / SaaS · Workforce",
        description:
          "Employee attendance tracking and reporting, part of the Rassd Cloud suite.",
        tags: ["Attendance", "Reporting", "Cloud ERP"],
      },
    ],
  },

  projects: [
    {
      id: "wallet",
      name: "Fintech Wallet",
      repo: "https://github.com/mokinan/flutter-fintech-wallet",
      tagline:
        "An offline-first, multi-currency wallet designed around the problems that actually break financial apps.",
      accent: "#1f6b4f",
      accentDark: "#6fd3a8",
      highlights: [
        ["Exact money math", "Integer minor units with ISO 4217 precision. FX is one exact fraction, rounded once."],
        ["No duplicate payments", "Transactional outbox with idempotency keys. Tests drop every server response and still end with exactly one record."],
        ["Single-flight token refresh", "Five concurrent 401s trigger one refresh, and all five requests replay."],
        ["App lock", "Salted PIN hash, biometrics, auto-lock in the background and FLAG_SECURE."],
        ["Failure modes you can try", "Built-in switches simulate offline, a flaky network and lost responses."],
      ],
      stack: ["Bloc", "Drift", "Dio", "Clean Architecture", "GitHub Actions"],
      facts: ["82 tests + E2E", "5 ADRs", "Arabic / RTL"],
      media: {
        main: { src: "assets/img/wallet/offline-sync.gif", alt: "Adding an expense offline, then watching it sync" },
        side: [
          { src: "assets/img/wallet/transfer.png", alt: "Cross-currency transfer" },
          { src: "assets/img/wallet/history.png", alt: "Transaction history" },
        ],
      },
    },
    {
      id: "marketplace",
      name: "Classifieds Marketplace",
      repo: "https://github.com/mokinan/flutter-classifieds-marketplace",
      tagline:
        "A Haraj-style marketplace built as a modular monorepo, running against a live REST API.",
      accent: "#8a4b2a",
      accentDark: "#f0a77f",
      highlights: [
        ["Search that can't show stale results", "Debounced input, and every new query cancels the previous request."],
        ["Offline browsing", "Stale-while-revalidate cache with an honest “last updated” banner instead of an error screen."],
        ["Optimistic UI with honest failures", "Favorites roll back if the server refuses; chat retries with the same client id."],
        ["Posting that survives bad networks", "Compressed photos, per-photo retry, auto-saved drafts."],
        ["Modular monorepo", "pub workspaces: api, ui_kit and app, each with its own tests."],
      ],
      stack: ["Riverpod 3", "go_router", "Dio", "pub workspaces", "GitHub Actions"],
      facts: ["48 tests + E2E", "3 ADRs", "Arabic / RTL"],
      media: {
        main: { src: "assets/img/marketplace/browse.gif", alt: "Browsing, opening a listing and chatting with the seller" },
        side: [
          { src: "assets/img/marketplace/chat.png", alt: "Chat with a seller" },
          { src: "assets/img/marketplace/sell-review.png", alt: "Reviewing an ad before publishing" },
        ],
      },
    },
  ],

  packages: [
    {
      name: "gcc_validators",
      repo: "https://github.com/mokinan/gcc_validators",
      pub: "https://pub.dev/packages/gcc_validators",
      description:
        "Validation and normalization for GCC IBANs, Saudi national IDs and Iqamas, Emirates IDs, mobile and VAT numbers. Pure Dart, Arabic-digit aware, typed errors.",
      code:
        "Iban.validate('sa03 8000 0000 6080 1016 7519')\n" +
        "    .value; // SA0380000000608010167519\n\n" +
        "GccPhone.validateMobile('٠٥٠ ١٢٣ ٤٥٦٧',\n" +
        "    country: GccCountry.saudiArabia)\n" +
        "    .value; // +966501234567",
    },
    {
      name: "durable_sync_queue",
      repo: "https://github.com/mokinan/durable_sync_queue",
      pub: "https://pub.dev/packages/durable_sync_queue",
      description:
        "A persistent, ordered, retrying operation queue for offline-first apps: idempotency keys, per-group ordering, backoff with jitter and dead-lettering. Extracted from the wallet's sync engine.",
      code:
        "final queue = SyncQueue(\n" +
        "  store: myStore,\n" +
        "  handler: (op) => api.send(op),\n" +
        ")..start();\n\n" +
        "await queue.enqueue('create_order', order.toJson(),\n" +
        "    group: 'order:${order.id}');",
    },
  ],

  principles: [
    ["Architecture that survives growth", "Clean Architecture and feature-first modules, with boundaries a new teammate can find on day one."],
    ["Offline is a feature, not an edge case", "Local source of truth, sync queues and safe retries, so a bad network never costs a user their data."],
    ["Quality that runs on every commit", "Unit, widget and integration tests, strict analysis and CI that blocks the merge, not the release."],
    ["Teams over heroes", "Code review, written decisions (ADRs) and onboarding that make the whole team faster."],
  ],

  toolbox: [
    ["Core", ["Flutter", "Dart"]],
    ["State", ["Bloc / Cubit", "Riverpod", "Provider"]],
    ["Architecture", ["Clean Architecture", "Feature-first", "pub workspaces"]],
    ["Data", ["REST", "GraphQL", "Firebase", "WebSockets", "Dio", "Drift"]],
    ["Quality", ["Unit / widget / integration tests", "Static analysis"]],
    ["Delivery", ["GitHub Actions", "Build flavors", "Crashlytics"]],
  ],
};
