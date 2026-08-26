export type TechCategoryItem = {
  name: string;
  role: string;
  badgeColor?: "primary" | "secondary" | "success" | "warning" | "default" | "danger";
};

export type TechDetailGroup = {
  category: string;
  items: TechCategoryItem[];
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  purpose: string;
  problemStatement: string;
  solution: string;
  architectureDetails?: string[];
  longDescription: string;
  images: string[];
  categories: string[];
  technologies: string[];
  techDetails?: TechDetailGroup[];
  highlights: string[];
  githubUrl: string;
  sourceUrls?: {
    label: string;
    url: string;
  }[];
  liveUrl: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "booking-travel",
    title: "Minh Khoa Travel — Booking & Dispatch Platform",
    subtitle: "Enterprise Multi-Tenant Travel Booking & Automated Dispatch System",
    description:
      "A production multi-tenant travel & airport transfer booking platform built with Spring Modulith (Java 23) and Next.js 16 SSR, featuring dynamic pricing engines, automated flight dispatch, bilingual i18n, and hardened Linux VPS deployment.",
    purpose:
      "Digitize and automate the end-to-end booking, pricing, and driver dispatch operations for travel agencies and airport transfer operators, eliminating manual quote calculations and booking latency.",
    problemStatement:
      "Travel companies struggle with error-prone manual fare quotes across dozens of custom routes, complex peak/nighttime surcharges, flight delay tracking, and fragmented passenger communication across social channels.",
    solution:
      "Engineered an all-in-one modular system combining a high-performance customer-facing booking engine with dynamic route calculation and an automated admin dispatch control tower.",
    architectureDetails: [
      "Spring Modulith package-by-domain boundaries strictly isolating Pricing, Fleet, Dispatch, Masterdata, and Voucher modules.",
      "Next.js 16 Server-Side Rendering (SSR) aggregate APIs delivering sub-50ms TTFB for high SEO ranking.",
      "Linux VPS infrastructure hardened with UFW firewall, Fail2Ban, Traefik v3 reverse proxy with automated Let's Encrypt SSL, and zero-downtime Blue-Green deployment.",
    ],
    longDescription:
      "A high-availability booking ecosystem designed for travel operators and airport transfers. The backend leverages Spring Boot 4 + Spring Modulith for domain-driven modular encapsulation with Caffeine caching, SeaweedFS/S3 object storage, and OAuth2 security. The frontend is powered by Next.js 16 SSR, HeroUI, TanStack Query, and interactive Leaflet map routing for sub-second quote lookups. Fully orchestrated on a hardened Linux VPS with Traefik reverse proxy, SSL auto-renew, Prometheus observability, and Blue-Green zero-downtime CI/CD.",
    images: [
      "/assets/images/work/booking-travel.png",
      "/assets/images/work/booking-travel-2.png",
      "/assets/images/work/booking-travel-3.png",
    ],
    categories: ["web", "backend"],
    technologies: [
      "Java 23",
      "Spring Boot 4",
      "Spring Modulith",
      "Next.js 16",
      "PostgreSQL",
      "Tailwind CSS v4",
      "HeroUI",
      "TanStack Query",
      "Docker",
      "Traefik",
      "Leaflet Maps",
      "Prometheus",
      "Caffeine Cache",
    ],
    techDetails: [
      {
        category: "Backend & Modular Core",
        items: [
          { name: "Java 23 / Spring Boot 4", role: "High-throughput modular micro-core", badgeColor: "primary" },
          { name: "Spring Modulith (DDD)", role: "Strict domain boundaries, modular events, decoupled APIs", badgeColor: "primary" },
          { name: "Spring Data JPA & Hibernate", role: "Optimized relational persistence layer with cascade lifecycles", badgeColor: "default" },
          { name: "Caffeine Cache", role: "Sub-millisecond in-memory caching for route pricing & masterdata", badgeColor: "success" },
          { name: "OAuth2 & Spring Security", role: "Multi-tenant role-based access control (Admin, Staff, Customer)", badgeColor: "warning" },
        ],
      },
      {
        category: "Frontend & User Interface",
        items: [
          { name: "Next.js 16 (App Router / SSR)", role: "Server-side rendering aggregate APIs with sub-50ms TTFB", badgeColor: "primary" },
          { name: "React 19 & HeroUI v2", role: "Component system, date-time range pickers, modal dialogs", badgeColor: "primary" },
          { name: "Tailwind CSS v4", role: "Ultra-fast modern styling tokens and mobile-first responsiveness", badgeColor: "secondary" },
          { name: "TanStack React Query v5", role: "Client-side state synchronization, query caching & prefetching", badgeColor: "success" },
          { name: "Leaflet Maps (GIS)", role: "Interactive route selection, pickup pin-drop, and distance calculation", badgeColor: "warning" },
        ],
      },
      {
        category: "Database & Object Storage",
        items: [
          { name: "PostgreSQL 18", role: "ACID transactional relational database with composite indexes", badgeColor: "primary" },
          { name: "SeaweedFS / AWS S3", role: "Distributed object storage for vehicle fleet photos & media assets", badgeColor: "secondary" },
        ],
      },
      {
        category: "DevOps, VPS & Infrastructure",
        items: [
          { name: "Traefik v3 Reverse Proxy", role: "Dynamic edge routing with automated ACME Let's Encrypt SSL", badgeColor: "primary" },
          { name: "Docker & Docker Compose", role: "Containerized multi-service deployment with isolated bridges", badgeColor: "secondary" },
          { name: "Blue-Green Deployment", role: "Zero-downtime automated release script with healthcheck probing", badgeColor: "success" },
          { name: "Linux VPS Hardening", role: "UFW firewall, Fail2Ban brute-force defense, kernel swap tuning", badgeColor: "danger" },
          { name: "Prometheus & Grafana", role: "Real-time CPU/RAM utilization and JVM metrics monitoring", badgeColor: "warning" },
        ],
      },
    ],
    highlights: [
      "Domain-driven Spring Modulith architecture ensuring strict boundary isolation across core modules (masterdata, pricing, fleet, dispatch, voucher)",
      "Next.js 16 Server-Side Rendering (SSR) aggregate APIs delivering sub-50ms TTFB and SEO-optimized tour/transfer catalog",
      "Advanced dynamic pricing engine calculating route distances, peak surcharges, vehicle class rates, and pro-rated promotion rules",
      "Automated airport transfer workflow with real-time flight lookup and pickup time adjustments",
      "Production VPS infrastructure hardened with UFW, Fail2Ban, Docker Compose, Traefik reverse proxy (Let's Encrypt SSL), and automated log rotation",
      "Zero-downtime Blue-Green deployment pipeline with Prometheus & Grafana telemetry",
    ],
    githubUrl: "https://github.com/Glannt/booking_travel",
    liveUrl: "https://booking.minhkhoatravel.vn",
  },
  {
    id: 2,
    slug: "noma-bouquet",
    title: "Noma Custom Bouquet E-Commerce",
    subtitle: "AI-Powered Visual Composition & Bespoke Flower Ordering Monorepo",
    description:
      "A bespoke e-commerce platform for custom flower bouquets featuring an AI-powered visual preview engine, real-time cart system, distributed message queues, and full-stack monorepo architecture.",
    purpose:
      "Enable flower boutique shoppers to design customized flower arrangements with real-time AI 3D visualization and streamlined checkout.",
    problemStatement:
      "Custom gift bouquet businesses suffer from customer indecision because buyers cannot visualize what flower combinations look like before florist assembly.",
    solution:
      "Combined a prompt-driven generative visual pipeline (LangChain + Google Gemini AI + ModelsLab) with an e-commerce platform handling custom order specifications, distributed queues, and payment gateways.",
    architectureDetails: [
      "Turborepo monorepo with pnpm workspaces powering shared TypeScript configs and decoupled client/API apps.",
      "NestJS 11 backend with BullMQ message queues for asynchronous image synthesis and Redlock distributed locks.",
      "React 19 with Vite, Ant Design v5, and Framer Motion micro-animations.",
    ],
    longDescription:
      "Built inside a Turborepo monorepo with pnpm workspaces, Noma delivers a complete custom bouquet ordering experience. The NestJS backend manages MongoDB collections with BullMQ background workers, Redlock distributed locking, and multipart/form-data uploads via Cloudinary. The React 19 frontend integrates LangChain, Google Gemini AI, and ModelsLab generative pipelines to produce real-time 3D flower composition previews from text prompts, with multi-gateway payments (Stripe & PayOS) and Sentry telemetry.",
    images: ["/assets/images/work/noma.png"],
    categories: ["web", "backend"],
    technologies: [
      "React 19",
      "Vite",
      "NestJS",
      "MongoDB",
      "BullMQ & Redis",
      "Redlock",
      "LangChain",
      "Gemini AI",
      "ModelsLab 3D",
      "Stripe & PayOS",
      "Tailwind CSS v4",
      "Turborepo",
      "Ant Design",
      "Cloudinary",
      "Sentry",
      "pnpm",
      "Framer Motion",
    ],
    techDetails: [
      {
        category: "Backend & Microservices",
        items: [
          { name: "NestJS 11 (TypeScript)", role: "Modular backend framework with dependency injection", badgeColor: "primary" },
          { name: "BullMQ & Redis", role: "Asynchronous task queue for AI image generation jobs", badgeColor: "danger" },
          { name: "Redlock Distributed Lock", role: "Concurrency safety during limited inventory checkout", badgeColor: "warning" },
          { name: "MongoDB & Mongoose", role: "Schema design for complex nested bouquet concepts & options", badgeColor: "success" },
        ],
      },
      {
        category: "AI & Generative Pipelines",
        items: [
          { name: "Google Gemini AI", role: "Natural language flower attribute parsing & prompt enrichment", badgeColor: "primary" },
          { name: "ModelsLab 3D Pipeline", role: "Generative AI model producing realistic 3D bouquet visual previews", badgeColor: "secondary" },
          { name: "LangChain", role: "Structured LLM chains and prompt engineering pipelines", badgeColor: "default" },
        ],
      },
      {
        category: "Frontend & Payments",
        items: [
          { name: "React 19 & Vite", role: "High-performance SPA client with instant HMR", badgeColor: "primary" },
          { name: "Ant Design v5 & Tailwind CSS v4", role: "Comprehensive design system and customizable component suite", badgeColor: "primary" },
          { name: "Stripe & PayOS", role: "Multi-currency credit card and instant QR banking checkout", badgeColor: "success" },
          { name: "Framer Motion", role: "Smooth bouquet customization transitions and page animations", badgeColor: "secondary" },
        ],
      },
    ],
    highlights: [
      "Turborepo monorepo with pnpm workspaces for unified NestJS API and React 19 client builds",
      "NestJS REST API with BullMQ job queues, Redlock concurrency safety, and combined multipart/form-data uploads",
      "LangChain + Google Gemini AI and ModelsLab prompt pipeline for 3D flower asset synthesis",
      "Integrated checkout flows with multi-gateway support (Stripe & PayOS) and transactional cart operations",
      "Cloudinary image asset optimization with gallery upload and compression pipelines",
      "Automated CI/CD with Husky pre-commit hooks, lint-staged, and conventional commits",
    ],
    githubUrl: "https://github.com/Glannt/noma-project",
    liveUrl: "#",
  },
  {
    id: 3,
    slug: "aisl-smart-locker",
    title: "AISL Smart Locker IoT Ecosystem",
    subtitle: "Enterprise Microservices IoT Platform & Hardware Actuation Network",
    description:
      "An enterprise-grade microservices IoT platform for smart locker management — featuring gRPC inter-service communication, MQTT SSL hardware control, Python Raspberry Pi agents, and multi-role logistics dispatch.",
    purpose:
      "Provide a secure, touchless, automated parcel storage, rental, and courier pickup network with edge hardware resilience.",
    problemStatement:
      "Smart locker systems frequently experience connection dropouts, lost hardware command packets, slow response times, and difficult fleet management across distributed physical cabinets.",
    solution:
      "Architected a resilient distributed system with gRPC microservices in the cloud, MQTT SSL broker communication, Raspberry Pi edge daemons with local SQLite persistence, and Arduino serial debouncing.",
    architectureDetails: [
      "API Gateway routing to Identity, Order, Locker, and Payment microservices via high-speed gRPC.",
      "Edge Raspberry Pi hardware agent communicating over RS485 serial to Arduino servo controllers.",
      "Multi-role client interfaces: Flutter cross-platform mobile app, Electron kiosk touch terminal, and Next.js admin portal.",
    ],
    longDescription:
      "AISL is a multi-service ecosystem with a NestJS API gateway orchestrating identity, order, locker, and payment microservices via gRPC. A Python agent running on Raspberry Pi handles RS485/serial communication to Arduino servo controllers for physical locker activation. The system features MQTT SSL broker messaging, SQLite local state persistence, Prometheus metrics, pro-rated subscription billing, Flutter mobile app, Electron kiosk interface, and a multi-role web dashboard for admins and staff.",
    images: ["/assets/images/work/aisl.png"],
    categories: ["iot", "web", "backend", "app"],
    technologies: [
      "NestJS",
      "gRPC",
      "MQTT SSL",
      "Next.js",
      "Flutter",
      "Python",
      "Arduino C/C++",
      "Raspberry Pi",
      "RS485 Serial",
      "PostgreSQL",
      "SQLite",
      "Firebase Auth",
      "Prometheus",
      "Docker",
    ],
    techDetails: [
      {
        category: "Cloud Microservices & Gateway",
        items: [
          { name: "NestJS API Gateway", role: "Unified HTTP/WebSocket gateway with GrpcErrorInterceptor", badgeColor: "primary" },
          { name: "gRPC Inter-Service", role: "Protobuf-compiled microservice communication for zero latency", badgeColor: "primary" },
          { name: "PostgreSQL & Prisma", role: "Centralized relational store for bookings, payments, and users", badgeColor: "secondary" },
          { name: "Firebase Auth", role: "Decentralized JWT token validation lifecycle", badgeColor: "warning" },
        ],
      },
      {
        category: "IoT Hardware & Edge Daemons",
        items: [
          { name: "MQTT SSL Protocol", role: "Sub-second bidirectional command and heartbeat messaging", badgeColor: "danger" },
          { name: "Raspberry Pi & Python", role: "Edge daemon managing local state, serial queues & discovery", badgeColor: "success" },
          { name: "Arduino C/C++", role: "Microcontroller running 200ms debounced servo pulse drivers", badgeColor: "primary" },
          { name: "RS485 Industrial Serial", role: "Noise-resistant multidrop bus communication to cabinet locks", badgeColor: "default" },
          { name: "SQLite Edge DB", role: "Offline cabinet state persistence during network interruptions", badgeColor: "secondary" },
        ],
      },
      {
        category: "Client Ecosystem",
        items: [
          { name: "Flutter Mobile App", role: "Cross-platform mobile app for user reservations and QR unlock", badgeColor: "primary" },
          { name: "Electron / Vite Kiosk", role: "Touchscreen station terminal for on-premise package drop-off", badgeColor: "secondary" },
          { name: "Next.js Web Portal", role: "Admin dashboard for locker telemetry and revenue analytics", badgeColor: "default" },
        ],
      },
    ],
    highlights: [
      "Microservices architecture: gateway + identity, order, locker, payment services via gRPC",
      "Python IoT agent on Raspberry Pi with RS485 serial manager, cabinet state & heartbeat services",
      "MQTT SSL topic hierarchy for sub-second locker open/close command delivery",
      "Arduino C++ serial controller with 200ms debounce for servo pop sequences",
      "Cross-platform client ecosystem: Flutter mobile app, Electron kiosk terminal, and web dashboard",
      "Pro-rated billing engine, locker lease lifecycle, promotions & advertisements modules",
      "Prometheus monitoring and Docker Compose multi-service orchestration",
    ],
    githubUrl: "https://github.com/Glannt/aisl_backend",
    sourceUrls: [
      {
        label: "aisl_backend",
        url: "https://github.com/Glannt/aisl_backend",
      },
      {
        label: "aisl_app",
        url: "https://github.com/Glannt/aisl_app",
      },
      {
        label: "aisl-web",
        url: "https://github.com/Glannt/aisl-web",
      },
      {
        label: "aisl_iot",
        url: "https://github.com/Glannt/aisl_iot",
      },
    ],
    liveUrl: "#",
  },
  {
    id: 4,
    slug: "edutest-gen",
    title: "SBA-personal — Edutest-Gen",
    subtitle: "Enterprise Academic Exam Matrix Generator & AI Question Bank",
    description:
      "An enterprise academic exam management system with automatic matrix-based paper generation, dynamic n8n question search, draggable exam preview, and containerized one-command deployment.",
    purpose:
      "Automate the generation of standardized, balanced academic examination papers based on topic matrices and Bloom's taxonomy complexity distributions.",
    problemStatement:
      "Teachers spend hours manually selecting questions to create balanced exams while avoiding duplicates and ensuring correct difficulty distributions.",
    solution:
      "Developed a full-stack matrix generator with cascade hierarchy (Subject → Chapter → Lesson → Question → Option), printable A4 layouts, and n8n question indexing.",
    architectureDetails: [
      "Java Spring Boot REST API with Gradle, JPA/Hibernate, and JWT authentication.",
      "React frontend with HeroUI v2, draggable drag-and-drop matrix builder, and A4 print preview layout engine.",
      "Docker Compose multi-container setup for one-command deployment.",
    ],
    longDescription:
      "Edutest-Gen is a full-stack academic tool built with Java Spring Boot (Gradle) and React + HeroUI. The backend exposes RESTful APIs for Subject, Chapter, Lesson, Grade, Question, Option, Exam, Matrix, and MatrixDetail entities — with full JWT security, Swagger docs, and paginated responses. The frontend features a draggable exam matrix builder, an A4 PDF print preview layout engine, and role-based dashboards (admin/teacher). All services are containerized with Docker Compose for zero-config deployment.",
    images: ["/assets/images/work/sba.png"],
    categories: ["web", "backend"],
    technologies: [
      "Java Spring Boot",
      "Gradle",
      "React",
      "HeroUI v2",
      "PostgreSQL",
      "n8n Workflows",
      "Docker",
      "JWT Auth",
      "Swagger",
    ],
    techDetails: [
      {
        category: "Backend & Search Workflows",
        items: [
          { name: "Java Spring Boot", role: "Core RESTful business API and matrix generation engine", badgeColor: "primary" },
          { name: "PostgreSQL", role: "Relational database modeling deep question and option hierarchies", badgeColor: "secondary" },
          { name: "n8n Automation", role: "Automated workflow pipeline for question vectorization & search", badgeColor: "warning" },
          { name: "JWT Security", role: "Stateless role-based authentication (Admin / Teacher)", badgeColor: "danger" },
        ],
      },
      {
        category: "Frontend & Layout Engine",
        items: [
          { name: "React & HeroUI v2", role: "Modern interactive interface with glassmorphism touches", badgeColor: "primary" },
          { name: "Draggable Matrix Builder", role: "Drag-and-drop complexity allocation interface", badgeColor: "secondary" },
          { name: "A4 Print Layout Renderer", role: "CSS paged-media layout engine for exact exam printing", badgeColor: "success" },
        ],
      },
    ],
    highlights: [
      "Full entity hierarchy: Subject → Chapter → Lesson → Question → Option with cascade relationships",
      "Matrix & MatrixDetail engine auto-generates balanced exam papers from complexity distributions",
      "A4 printable exam layout renderer with real-time drag-and-drop matrix builder",
      "n8n workflow integration for dynamic AI-powered question bank search indexing",
      "JWT security + Swagger API docs + paginated REST responses",
      "Docker Compose multi-container setup (client + server + PostgreSQL) for one-command deployment",
    ],
    githubUrl: "https://github.com/Glannt/edutest-gen",
    liveUrl: "https://youtu.be/mm71sVoU_HE",
  },
];
