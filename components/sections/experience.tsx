"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  UserCheck,
  Layers,
  Sparkles,
  Cpu,
  Server,
  Code2,
  GitBranch,
} from "lucide-react";
import { Button } from "@heroui/react";

interface Milestone {
  id: number;
  projectId?: number;
  phaseNumber: string;
  year: "2026" | "2025";
  role: string;
  isSolo: boolean;
  ownershipBadge: string;
  company: string;
  projectUrl?: string;
  duration: string;
  periodLabel: string;
  shortOverview: string;
  icon: React.ReactNode;
  description: string;
  responsibilities: string[];
  technologies: string[];
  stats?: { label: string; value: string }[];
}

const yearGroups: {
  year: "2026" | "2025";
  title: string;
  subtitle: string;
  milestones: Milestone[];
}[] = [
  {
    year: "2026",
    title: "2026 — Production & Architecture Era",
    subtitle: "Solo End-to-End Delivery, Spring Modulith & IoT Microservices",
    milestones: [
      {
        id: 1,
        projectId: 1,
        phaseNumber: "Phase 04",
        year: "2026",
        role: "Solo Lead Full-Stack & DevOps Engineer",
        isSolo: true,
        ownershipBadge: "100% Solo End-to-End Ownership",
        company: "Minh Khoa Travel (booking.minhkhoatravel.vn)",
        projectUrl: "https://booking.minhkhoatravel.vn",
        duration: "May 2026 - Present",
        periodLabel: "May 2026 - Now",
        shortOverview: "Enterprise Multi-Tenant Travel Booking & Automated Dispatch System",
        icon: <Server className='h-5 w-5 text-sky-400' />,
        description:
          "Single-handedly architected, engineered, and deployed an entire multi-tenant travel & airport transfer booking platform — covering the domain-driven Spring Modulith (Java 23) backend, Next.js 16 SSR frontend, dynamic pricing algorithms, and hardened Linux VPS deployment.",
        responsibilities: [
          "Solo architect of Spring Modulith backend strictly encapsulating pricing, masterdata, fleet, flight tracking, dispatch, and vouchers with Caffeine cache and S3/SeaweedFS storage",
          "Designed and coded high-throughput dynamic pricing calculation engine factoring route distances, peak surcharges, vehicle class multipliers, and promotion validation",
          "Built complete Next.js 16 SSR client with HeroUI, TanStack Query v5, Leaflet interactive map routing, and bilingual Vietnamese/English localization",
          "Hardened production Linux VPS infrastructure from scratch: UFW firewall, Fail2Ban, Traefik reverse proxy with automated Let's Encrypt SSL, and Docker Compose",
          "Configured Prometheus metrics, Actuator health monitoring, and written zero-downtime Blue-Green deployment automation bash scripts",
        ],
        technologies: [
          "Java 23",
          "Spring Boot 4",
          "Spring Modulith",
          "Next.js 16",
          "PostgreSQL",
          "Tailwind CSS v4",
          "Traefik v3",
          "Docker",
          "Prometheus",
          "Leaflet",
          "Caffeine",
          "Blue-Green CI/CD",
        ],
        stats: [
          { label: "Deployment", value: "Production VPS" },
          { label: "Architecture", value: "Spring Modulith" },
          { label: "Role Type", value: "Solo Engineer" },
        ],
      },
      {
        id: 2,
        projectId: 3,
        phaseNumber: "Phase 03",
        year: "2026",
        role: "IoT & Integration Lead Engineer",
        isSolo: false,
        ownershipBadge: "Hardware & Microservices Lead",
        company: "AISL Smart Locker Ecosystem",
        duration: "Apr 2026 - May 2026",
        periodLabel: "Apr 2026 - May 2026",
        shortOverview: "Distributed IoT Ecosystem & Real-Time Hardware Actuation",
        icon: <Cpu className='h-5 w-5 text-amber-400' />,
        description:
          "Architected and deployed a multi-microservice IoT locker ecosystem — NestJS gRPC gateway, Python Raspberry Pi hardware daemon, and Arduino serial controllers — all orchestrated via MQTT SSL real-time messaging.",
        responsibilities: [
          "Built NestJS API gateway routing to identity, order, locker & payment microservices via gRPC with custom GrpcErrorInterceptor and AllExceptionsFilter",
          "Developed Python IoT agent on Raspberry Pi with RS485/serial manager, CabinetState engine, HeartbeatService, and DiscoveryService for physical locker control",
          "Implemented Arduino C/C++ serial controller with servo pop/open sequences, RS485 bus settling delays, and 200ms sensor debounce logic",
          "Crafted MQTT SSL topic hierarchy enabling sub-second command-to-execution latency across all locker cabinets",
          "Engineered pro-rated billing algorithms, promotions modules, and logistics delivery dispatch workflows",
        ],
        technologies: [
          "NestJS",
          "gRPC",
          "MQTT SSL",
          "Python Daemon",
          "Raspberry Pi",
          "Arduino C++",
          "RS485 Serial",
          "PostgreSQL",
          "SQLite",
          "Docker",
        ],
        stats: [
          { label: "Latency", value: "< 250ms MQTT" },
          { label: "Hardware", value: "RS485 + RPi" },
          { label: "Protocol", value: "gRPC + MQTT" },
        ],
      },
    ],
  },
  {
    year: "2025",
    title: "2025 — Foundations & Monorepo Era",
    subtitle: "Enterprise Exam Engine, Turborepo Monorepo & AI Generative Pipelines",
    milestones: [
      {
        id: 3,
        projectId: 2,
        phaseNumber: "Phase 02",
        year: "2025",
        role: "Monorepo & Full-Stack Architect",
        isSolo: false,
        ownershipBadge: "Monorepo & AI Pipeline Architect",
        company: "Noma Custom Bouquet E-Commerce",
        duration: "Oct 2025 - Mar 2026",
        periodLabel: "Oct 2025 - Mar 2026",
        shortOverview: "Turborepo Monorepo with Generative AI Flower Previews",
        icon: <Layers className='h-5 w-5 text-purple-400' />,
        description:
          "Engineered a full-stack custom bouquet ordering platform in a Turborepo monorepo — featuring MongoDB-backed NestJS APIs, BullMQ distributed queues, Cloudinary media management, and Gemini AI + ModeLabs generative flower preview pipelines.",
        responsibilities: [
          "Built NestJS REST APIs for bouquet concepts, cart, custom orders, and flowers — with BullMQ background tasks, Redlock distributed locking, and multipart/form-data uploads",
          "Integrated LangChain, Gemini AI, and ModeLabs pipelines for prompt-to-3D flower asset generation and real-time bouquet composition previews",
          "Designed React 19 + Vite interactive UI with Ant Design components, Framer Motion micro-animations, and Tailwind CSS v4 design system",
          "Integrated Stripe and PayOS multi-gateway payment processing with automated invoice generation and Sentry error monitoring",
          "Configured Turborepo with pnpm workspaces for unified monorepo builds across NestJS backend and Vite/React frontend",
        ],
        technologies: [
          "Turborepo",
          "NestJS",
          "React 19",
          "Vite",
          "MongoDB",
          "BullMQ & Redis",
          "Gemini AI",
          "ModeLabs 3D",
          "Stripe",
          "PayOS",
        ],
        stats: [
          { label: "Monorepo", value: "Turborepo" },
          { label: "AI Integration", value: "Gemini + 3D" },
          { label: "Queue Engine", value: "BullMQ / Redis" },
        ],
      },
      {
        id: 4,
        projectId: 4,
        phaseNumber: "Phase 01",
        year: "2025",
        role: "Core Full-Stack Developer",
        isSolo: false,
        ownershipBadge: "Full-Stack Core Architecture",
        company: "SBA-personal (Edutest-Gen)",
        duration: "Aug 2025 - Oct 2025",
        periodLabel: "Aug 2025 - Oct 2025",
        shortOverview: "Academic Matrix-Based Exam Paper Generation System",
        icon: <Code2 className='h-5 w-5 text-emerald-400' />,
        description:
          "Built an enterprise academic exam management system — automatic matrix-based paper generation, n8n question search, draggable exam preview, and Docker Compose one-command deployment.",
        responsibilities: [
          "Built Java Spring Boot REST APIs for Subject, Chapter, Lesson, Grade, Question, Option, Exam, Matrix & MatrixDetail entities with JWT security and Swagger docs",
          "Developed React + HeroUI v2 frontend with draggable exam matrix builder, role-based dashboards (admin/teacher), and paginated data tables",
          "Programmed an A4 print preview layout engine rendering dynamically generated exam papers from complexity matrix distributions",
          "Integrated n8n workflow automation for AI-powered dynamic question bank search indexing",
          "Containerized client + server + PostgreSQL with Docker Compose for zero-config one-command deployments",
        ],
        technologies: [
          "Java Spring Boot",
          "React",
          "HeroUI v2",
          "PostgreSQL",
          "n8n Workflows",
          "Docker Compose",
          "JWT Security",
        ],
        stats: [
          { label: "Framework", value: "Spring Boot" },
          { label: "Automation", value: "n8n AI Workflows" },
          { label: "Layout", value: "A4 Print Engine" },
        ],
      },
    ],
  },
];

export default function Experience() {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<number>(1); // Default: Minh Khoa (Phase 04)
  const [hoveredMilestoneId, setHoveredMilestoneId] = useState<number | null>(null);

  const allMilestones = yearGroups.flatMap((g) => g.milestones);
  const activeMilestone =
    allMilestones.find((m) => m.id === selectedMilestoneId) || allMilestones[0];

  return (
    <div className='relative z-20 w-full space-y-10 overflow-visible'>
      {/* Section Header */}
      <motion.div
        className='max-w-3xl space-y-3'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20'>
          <GitBranch className='h-3.5 w-3.5' />
          Engineering Mindmap & Milestones
        </div>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Engineering Journey
        </h2>
        <p className='text-muted-foreground md:text-xl leading-relaxed'>
          Mindmap architecture of system milestones and deployments grouped by year. Hover to preview; click any phase to inspect details.
        </p>
      </motion.div>

      {/* 1. Mindmap Branching Container (Grouped by Year with Clean Segment Wires & Dual Endpoints) */}
      <div className='space-y-8'>
        {yearGroups.map((group) => (
          <div
            key={group.year}
            className='relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-content1 border-2 border-zinc-300/80 dark:border-zinc-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_4px_18px_rgba(0,0,0,0.05)] dark:shadow-md space-y-6 overflow-visible'
          >
            {/* Year Hub Header Bar */}
            <div className='flex items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800'>
              <div className='flex items-center gap-3'>
                <span className='px-3.5 py-1 rounded-xl bg-primary text-white text-sm font-extrabold font-mono shadow-sm'>
                  {group.year}
                </span>
                <div>
                  <h3 className='text-base sm:text-lg font-bold text-foreground'>
                    {group.title}
                  </h3>
                  <p className='text-xs text-muted-foreground'>{group.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Mindmap Projects Row with Dedicated Segment Wires */}
            <div className='relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center overflow-visible'>
              {/* Central Dedicated Connecting Wire in the gap between Card 1 and Card 2 */}
              <div className='hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 lg:w-12 items-center justify-between pointer-events-none z-0'>
                {/* Left Endpoint Dot (Đầu mút trái) */}
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                    selectedMilestoneId === group.milestones[0].id
                      ? "bg-primary border-white dark:border-zinc-900 shadow-[0_0_8px_#0284c7] scale-125"
                      : "bg-zinc-300 dark:bg-zinc-700 border-white dark:border-zinc-900"
                  }`}
                />

                {/* Wire Segment Line in the Gap */}
                <div
                  className={`h-[3px] flex-1 transition-all duration-300 ${
                    selectedMilestoneId === group.milestones[0].id ||
                    selectedMilestoneId === group.milestones[1].id
                      ? "bg-primary shadow-[0_0_10px_#0284c7]"
                      : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                />

                {/* Right Endpoint Dot (Đầu mút phải) */}
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                    selectedMilestoneId === group.milestones[1].id
                      ? "bg-primary border-white dark:border-zinc-900 shadow-[0_0_8px_#0284c7]"
                      : "bg-zinc-300 dark:bg-zinc-700 border-white dark:border-zinc-900"
                  }`}
                />
              </div>

              {/* Mindmap Milestone Cards */}
              {group.milestones.map((milestone) => {
                const isSelected = selectedMilestoneId === milestone.id;
                const isHovered = hoveredMilestoneId === milestone.id;

                return (
                  <div
                    key={milestone.id}
                    className='relative flex flex-col items-center overflow-visible'
                    onMouseEnter={() => setHoveredMilestoneId(milestone.id)}
                    onMouseLeave={() => setHoveredMilestoneId(null)}
                  >
                    {/* Milestone Card Button */}
                    <button
                      className={`w-full group p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left cursor-pointer relative z-10 ${
                        isSelected
                          ? "bg-primary/15 border-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_25px_rgba(2,132,199,0.25)] ring-2 ring-primary/40 scale-[1.01]"
                          : "bg-zinc-50/90 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-300/80 dark:border-zinc-800 hover:border-zinc-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.04)]"
                      }`}
                      type='button'
                      onClick={() => setSelectedMilestoneId(milestone.id)}
                    >
                      {/* Circular Icon Pin */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 shadow-md ${
                          isSelected
                            ? "bg-primary text-white ring-4 ring-primary/30 shadow-primary/40 scale-105"
                            : "bg-white dark:bg-content1 border-2 border-zinc-300 dark:border-zinc-700 text-foreground group-hover:border-primary"
                        }`}
                      >
                        {milestone.icon}
                      </div>

                      {/* Card Content & Details */}
                      <div className='space-y-1.5 min-w-0 flex-1'>
                        <div className='flex flex-wrap items-center justify-center sm:justify-start gap-2'>
                          <span
                            className={`text-xs font-mono font-bold uppercase tracking-wider ${
                              isSelected ? "text-primary font-extrabold" : "text-muted-foreground"
                            }`}
                          >
                            {milestone.phaseNumber}
                          </span>

                          <span className='text-[11px] text-muted-foreground font-mono'>
                            • {milestone.periodLabel}
                          </span>

                          {milestone.isSolo && (
                            <span className='px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] font-extrabold border border-sky-500/35 tracking-wider'>
                              SOLO LEAD
                            </span>
                          )}
                        </div>

                        <h4 className='text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors'>
                          {milestone.company}
                        </h4>

                        <p className='text-xs text-muted-foreground line-clamp-2 leading-relaxed'>
                          {milestone.shortOverview}
                        </p>
                      </div>
                    </button>

                    {/* Hover Popover Tooltip (100% Solid Opaque Background, High Contrast, Elevated Z-Index) */}
                    <AnimatePresence>
                      {isHovered && !isSelected && (
                        <motion.div
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className='absolute bottom-[calc(100%+14px)] z-[100] w-68 sm:w-76 p-4 rounded-2xl bg-[#12131a] dark:bg-[#151620] border-2 border-primary/50 text-white text-xs shadow-[0_15px_35px_rgba(0,0,0,0.85)] pointer-events-none'
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className='space-y-2'>
                            <div className='flex items-center justify-between gap-1 pb-1.5 border-b border-zinc-800'>
                              <span className='font-mono text-[11px] text-primary font-bold'>
                                {milestone.phaseNumber}
                              </span>
                              <span className='text-[10px] text-zinc-400 font-mono'>{milestone.duration}</span>
                            </div>
                            <div className='font-bold text-white text-sm leading-snug'>
                              {milestone.role}
                            </div>
                            <div className='text-xs text-zinc-300 line-clamp-2 leading-relaxed'>
                              {milestone.shortOverview}
                            </div>
                            <div className='pt-1 text-[11px] text-primary font-bold flex items-center gap-1'>
                              <span>Click to inspect architecture</span>
                              <span>→</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Selected Milestone Presentation Panel */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeMilestone.id}
          animate={{ opacity: 1, y: 0 }}
          className='w-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-content1 border-2 border-zinc-300/80 dark:border-zinc-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_6px_25px_rgba(0,0,0,0.06)] dark:shadow-xl space-y-8 relative overflow-hidden'
          exit={{ opacity: 0, y: -15 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35 }}
        >
          {/* Top Milestone Header Bar */}
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800'>
            <div className='space-y-3 max-w-3xl'>
              <div className='flex flex-wrap items-center gap-2.5'>
                <span className='px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold border border-primary/25'>
                  {activeMilestone.phaseNumber} ({activeMilestone.year})
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                    activeMilestone.isSolo
                      ? "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30"
                      : "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30"
                  }`}
                >
                  <UserCheck className='h-3.5 w-3.5' />
                  {activeMilestone.ownershipBadge}
                </span>

                <div className='flex items-center gap-1 text-xs text-muted-foreground font-mono'>
                  <Calendar className='h-3.5 w-3.5 text-primary' />
                  <span>{activeMilestone.duration}</span>
                </div>
              </div>

              <h3 className='text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight'>
                {activeMilestone.role}
              </h3>

              <div className='flex items-center gap-2 text-base font-semibold text-primary'>
                <span>{activeMilestone.company}</span>
                {activeMilestone.projectUrl && (
                  <a
                    className='inline-flex items-center text-xs hover:underline'
                    href={activeMilestone.projectUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <ExternalLink className='h-3.5 w-3.5 ml-1' />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Metrics / Key Metric Pill Boxes */}
            {activeMilestone.stats && (
              <div className='flex flex-wrap gap-2.5 sm:gap-3 flex-shrink-0'>
                {activeMilestone.stats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className='px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-center min-w-[100px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.03)]'
                  >
                    <div className='text-xs font-bold text-foreground'>{stat.value}</div>
                    <div className='text-[10px] text-muted-foreground uppercase font-mono mt-0.5'>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core Overview Summary */}
          <div className='p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-sm sm:text-base text-foreground/90 leading-relaxed shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]'>
            <p>{activeMilestone.description}</p>
          </div>

          {/* Key Architectural & Engineering Responsibilities */}
          <div className='space-y-4'>
            <h4 className='text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2'>
              <Sparkles className='h-4 w-4 text-primary' />
              <span>Key Architectural Accomplishments & Responsibilities</span>
            </h4>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5'>
              {activeMilestone.responsibilities.map((resp, rIdx) => (
                <div
                  key={rIdx}
                  className='flex items-start gap-3 p-4 rounded-2xl bg-zinc-50/90 dark:bg-content1 border border-zinc-300/80 dark:border-zinc-800 text-xs sm:text-sm text-foreground/90 leading-relaxed shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_5px_rgba(0,0,0,0.03)]'
                >
                  <CheckCircle2 className='h-4 w-4 text-success flex-shrink-0 mt-0.5' />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Ecosystem Badges */}
          <div className='space-y-3 pt-2'>
            <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
              Core Stack & Infrastructure
            </h4>
            <div className='flex flex-wrap gap-2'>
              {activeMilestone.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className='px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-semibold border border-primary/25 shadow-sm'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Navigation Footer */}
          {activeMilestone.projectId && (
            <div className='pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
              <span className='text-xs text-muted-foreground'>
                Want to see the full architecture diagrams & technical breakdowns?
              </span>

              <Button
                as={Link}
                className='font-semibold text-xs sm:text-sm shadow-md'
                color='primary'
                href={`/project/${activeMilestone.projectId}`}
                size='sm'
                variant='solid'
              >
                View Detailed Case Study
                <ArrowRight className='h-4 w-4 ml-1' />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
