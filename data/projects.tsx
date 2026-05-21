export type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  categories: string[];
  technologies: string[];
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
    title: "Noma Custom Bouquet E-Commerce",
    description:
      "A bespoke e-commerce platform for custom flower bouquets featuring an AI-powered visual preview engine, real-time cart system, and full-stack monorepo architecture.",
    longDescription:
      "Built inside a Turborepo monorepo with pnpm workspaces, Noma delivers a complete custom bouquet ordering experience. The NestJS backend manages MongoDB collections for bouquet concepts, items, flowers, cart, and custom orders — with multipart/form-data uploads via Cloudinary. The React 19 frontend integrates Gemini AI and ModeLabs generative pipelines to produce real-time 3D flower composition previews from text prompts.",
    images: ["/assets/images/work/noma.png"],
    categories: ["web", "backend"],
    technologies: [
      "React 19",
      "Vite",
      "NestJS",
      "MongoDB",
      "Tailwind CSS v4",
      "Turborepo",
      "Ant Design",
      "Cloudinary",
      "Gemini AI",
      "pnpm",
      "Framer Motion",
    ],
    highlights: [
      "Turborepo monorepo with pnpm workspaces for unified API + client builds",
      "NestJS REST API with combined bouquet concept/items CRUD (multipart/form-data)",
      "Gemini AI + ModeLabs prompt pipeline for 3D flower asset generation",
      "Full cart & custom bouquet ordering flows with transactional integrity",
      "Cloudinary image management with gallery upload support",
      "Git workflow automation with Husky, lint-staged, and conventional commits",
    ],
    githubUrl: "https://github.com/Glannt/noma-project",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "AISL Smart Locker IoT Ecosystem",
    description:
      "An enterprise-grade microservices IoT platform for smart locker management — featuring gRPC inter-service communication, MQTT SSL hardware control, Python Raspberry Pi agents, and multi-role logistics dispatch.",
    longDescription:
      "AISL is a multi-service ecosystem with a NestJS API gateway orchestrating identity, order, locker, and payment microservices via gRPC. A Python agent running on Raspberry Pi handles RS485/serial communication to Arduino servo controllers for physical locker activation. The system features MQTT SSL broker messaging, SQLite local state persistence, Prometheus metrics, pro-rated subscription billing, and a multi-role web interface for admins, staff, and kiosk users.",
    images: ["/assets/images/work/aisl.png"],
    categories: ["iot", "web", "backend", "app"],
    technologies: [
      "NestJS",
      "gRPC",
      "MQTT SSL",
      "Next.js",
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
    highlights: [
      "Microservices architecture: gateway + identity, order, locker, payment services via gRPC",
      "Python IoT agent on Raspberry Pi with RS485 serial manager, cabinet state & heartbeat services",
      "MQTT SSL topic hierarchy for sub-second locker open/close command delivery",
      "Arduino C++ serial controller with 200ms debounce for servo pop sequences",
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
    id: 3,
    title: "SBA-personal — Edutest-Gen",
    description:
      "An enterprise academic exam management system with automatic matrix-based paper generation, dynamic n8n question search, draggable exam preview, and containerized one-command deployment.",
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
