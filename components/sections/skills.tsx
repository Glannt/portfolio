"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  GitBranch,
  Star,
  Shield,
  Cpu,
  Database,
  Code,
  Server,
  Zap,
  Pin,
  PinOff,
  X,
  Info,
} from "lucide-react";
import { Button } from "@heroui/react";

type SkillLevel = "Intermediate" | "Basic";

interface SkillNode {
  id: string;
  name: string;
  level: SkillLevel;
  tagline: string;
  tier: number; // Tier 1: Core, Tier 2: Framework/Branch, Tier 3: Specialized/Pattern
  projectUsage?: string;
  children?: SkillNode[];
}

interface SkillTreeBranch {
  id: string;
  categoryName: string;
  tagline: string;
  icon: React.ReactNode;
  rootSkill: SkillNode;
}

const skillTrees: SkillTreeBranch[] = [
  {
    id: "spring_java",
    categoryName: "Java & Spring Ecosystem",
    tagline: "Enterprise Domain-Driven Architecture & Modular Monoliths",
    icon: <Server className='h-5 w-5 text-amber-500' />,
    rootSkill: {
      id: "java",
      name: "Java 23",
      level: "Intermediate",
      tagline: "Core Programming Language, Concurrency & Modern LTS Features",
      tier: 1,
      projectUsage: "Minh Khoa Travel & SBA Edutest-Gen",
      children: [
        {
          id: "spring_boot",
          name: "Spring Boot 4",
          level: "Basic",
          tagline: "Enterprise Application Framework, Starters & Auto-Configuration",
          tier: 2,
          projectUsage: "Core backend services for Minh Khoa Travel & SBA",
          children: [
            {
              id: "spring_modulith",
              name: "Spring Modulith",
              level: "Basic",
              tagline: "Architectural Module Boundaries & Event Publication Registry",
              tier: 3,
              projectUsage: "Strict domain isolation in booking.minhkhoatravel.vn",
            },
            {
              id: "ddd",
              name: "Domain-Driven Design (DDD)",
              level: "Basic",
              tagline: "Tactical DDD: Aggregate Roots, Value Objects, Domain Events & Bounded Contexts",
              tier: 3,
              projectUsage: "Pricing, Fleet, Dispatch & Voucher segregation in Minh Khoa Travel",
            },
          ],
        },
      ],
    },
  },
  {
    id: "nestjs_ts",
    categoryName: "NestJS & Microservices",
    tagline: "Scalable TypeScript Backend & Distributed Messaging",
    icon: <Shield className='h-5 w-5 text-red-500' />,
    rootSkill: {
      id: "typescript_node",
      name: "TypeScript / Node.js",
      level: "Basic",
      tagline: "Type-safe Runtime & High-Concurrency Asynchronous Server Execution",
      tier: 1,
      projectUsage: "AISL Locker Gateway & Noma Bouquet REST API",
      children: [
        {
          id: "nestjs",
          name: "NestJS",
          level: "Intermediate",
          tagline: "Enterprise Modular Architecture, Decorators & Dependency Injection",
          tier: 2,
          projectUsage: "AISL Smart Locker Gateway & Noma Custom Bouquet",
          children: [
            {
              id: "grpc",
              name: "gRPC & Microservices",
              level: "Basic",
              tagline: "Protobuf Contracts & High-Speed Binary RPC Communication",
              tier: 3,
              projectUsage: "Inter-service routing in AISL Smart Locker Ecosystem",
            },
            {
              id: "bullmq",
              name: "BullMQ & Distributed Queues",
              level: "Basic",
              tagline: "Redis-backed Async Background Job Processing, Retries & Redlock",
              tier: 3,
              projectUsage: "Async 3D asset generation & task queues in Noma Bouquet",
            },
          ],
        },
      ],
    },
  },
  {
    id: "react_frontend",
    categoryName: "React & Modern Frontend",
    tagline: "Interactive UI, Server-Side Rendering & Design Systems",
    icon: <Code className='h-5 w-5 text-sky-400' />,
    rootSkill: {
      id: "javascript_ts",
      name: "JavaScript / TypeScript",
      level: "Basic",
      tagline: "Core Web Language, ESNext, DOM Events & Modern Async Patterns",
      tier: 1,
      projectUsage: "All frontend clients & web applications",
      children: [
        {
          id: "react",
          name: "React 19",
          level: "Intermediate",
          tagline: "Component Architecture, Virtual DOM, Hooks & Reactive State",
          tier: 2,
          projectUsage: "Minh Khoa Travel, Noma Bouquet & SBA Exam UI",
          children: [
            {
              id: "nextjs",
              name: "Next.js 16 (App Router / SSR)",
              level: "Basic",
              tagline: "Server-Side Rendering, Server Components & SEO Optimization",
              tier: 3,
              projectUsage: "High-performance client in booking.minhkhoatravel.vn",
            },
            {
              id: "tailwind_heroui",
              name: "Tailwind CSS v4 & HeroUI",
              level: "Basic",
              tagline: "Utility-First CSS, Responsive Glassmorphism & Theme Systems",
              tier: 3,
              projectUsage: "Modern responsive user interfaces across all projects",
            },
            {
              id: "tanstack_query",
              name: "TanStack Query v5",
              level: "Basic",
              tagline: "Async Server State Management, Auto-Caching & Optimistic Updates",
              tier: 3,
              projectUsage: "Client-side server cache synchronization in Minh Khoa Travel",
            },
          ],
        },
      ],
    },
  },
  {
    id: "postgres_database",
    categoryName: "PostgreSQL & Data Engineering",
    tagline: "Relational Persistence, Caching & Document Stores",
    icon: <Database className='h-5 w-5 text-blue-500' />,
    rootSkill: {
      id: "sql_relational",
      name: "Relational SQL & Schemas",
      level: "Basic",
      tagline: "Data Normalization, ACID Transactions & Relational Modeling",
      tier: 1,
      projectUsage: "Data modeling across enterprise platforms",
      children: [
        {
          id: "postgresql",
          name: "PostgreSQL",
          level: "Intermediate",
          tagline: "Advanced Relational Engine, B-Tree Indexes, Connection Pooling & Tuning",
          tier: 2,
          projectUsage: "Primary Database for Minh Khoa Travel & SBA Edutest",
          children: [
            {
              id: "redis",
              name: "Redis & Caching Strategies",
              level: "Basic",
              tagline: "In-Memory Key-Value Caching, Distributed Locks & TTL Expiration",
              tier: 3,
              projectUsage: "Dynamic pricing caching in Minh Khoa Travel & BullMQ",
            },
            {
              id: "mongodb",
              name: "MongoDB (Mongoose)",
              level: "Basic",
              tagline: "Document Database, Dynamic Aggregations & Media Models",
              tier: 3,
              projectUsage: "Custom bouquet data models in Noma E-Commerce",
            },
          ],
        },
      ],
    },
  },
  {
    id: "devops_iot",
    categoryName: "Linux DevOps & IoT Hardware",
    tagline: "VPS Hardening, Docker Compose, MQTT & Embedded Systems",
    icon: <Cpu className='h-5 w-5 text-emerald-400' />,
    rootSkill: {
      id: "linux_systems",
      name: "Linux Systems & Networks",
      level: "Basic",
      tagline: "OS Kernels, Systemd Daemons, Networking & Security",
      tier: 1,
      projectUsage: "Production VPS host environments",
      children: [
        {
          id: "vps_hardening",
          name: "Linux VPS Hardening",
          level: "Basic",
          tagline: "UFW Firewall, Fail2Ban, SSH Key Isolation & Swap Tuning",
          tier: 2,
          projectUsage: "Hardened Ubuntu VPS for booking.minhkhoatravel.vn",
          children: [
            {
              id: "docker_traefik",
              name: "Docker & Traefik v3",
              level: "Basic",
              tagline: "Containerization, Multi-App SSL Automation & Let's Encrypt",
              tier: 3,
              projectUsage: "Reverse proxy and container clusters in production",
            },
            {
              id: "blue_green",
              name: "Blue-Green CI/CD",
              level: "Basic",
              tagline: "Zero-Downtime Deployment & Health Check Polling Automation",
              tier: 3,
              projectUsage: "Automated production release bash scripts",
            },
          ],
        },
        {
          id: "iot_hardware",
          name: "IoT & Hardware Integration",
          level: "Basic",
          tagline: "Physical Actuation, Serial Busses & Real-Time Sensors",
          tier: 2,
          projectUsage: "AISL Smart Locker Hardware Integration",
          children: [
            {
              id: "mqtt_ssl",
              name: "MQTT SSL Protocol",
              level: "Basic",
              tagline: "Lightweight Pub/Sub Messaging & Sub-Second Command Latency",
              tier: 3,
              projectUsage: "Real-time communication with locker hardware",
            },
            {
              id: "rpi_arduino",
              name: "Raspberry Pi & Arduino (RS485)",
              level: "Basic",
              tagline: "Python Daemons, C++ Firmware, Servo Pop Logic & Debounce",
              tier: 3,
              projectUsage: "Hardware control daemons in AISL Locker",
            },
          ],
        },
      ],
    },
  },
  {
    id: "message_queues",
    categoryName: "Message Queues & Event Streaming",
    tagline: "Asynchronous Task Processing, Distributed Pub/Sub & Real-Time Event Brokers",
    icon: <Zap className='h-5 w-5 text-yellow-400' />,
    rootSkill: {
      id: "async_messaging",
      name: "Asynchronous Messaging & Brokers",
      level: "Basic",
      tagline: "Decoupled Event-Driven Communication, Consumer Groups & Task Buffering",
      tier: 1,
      projectUsage: "Decoupled background processing & IoT communication",
      children: [
        {
          id: "kafka",
          name: "Apache Kafka",
          level: "Basic",
          tagline: "Distributed Event Streaming, Partitions, Consumer Groups & High-Throughput Topics",
          tier: 2,
          projectUsage: "Event stream pipelines & asynchronous decoupled architecture",
        },
        {
          id: "message_queue_bullmq",
          name: "Message Queue (BullMQ / RabbitMQ)",
          level: "Basic",
          tagline: "Asynchronous Task Scheduling, Background Queues, Retries, Dead-Letter Queues (DLQ) & Redlock",
          tier: 2,
          projectUsage: "Async 3D asset generation & task queues in Noma Bouquet",
        },
        {
          id: "mqtt_protocol",
          name: "MQTT Protocol (MQTT SSL)",
          level: "Basic",
          tagline: "Lightweight IoT Pub/Sub Telemetry, Topic Filtering, QoS Levels & Sub-Second Latency",
          tier: 2,
          projectUsage: "Real-time hardware command messaging in AISL Smart Locker",
        },
      ],
    },
  },
];

export default function Skills() {
  const [activeTreeId, setActiveTreeId] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [pinnedSkill, setPinnedSkill] = useState<SkillNode | null>(null);

  // Active skill node to display in the detail popover HUD
  const activeDetailNode = pinnedSkill || hoveredSkill;

  const displayedTrees =
    activeTreeId === "all"
      ? skillTrees
      : skillTrees.filter((tree) => tree.id === activeTreeId);

  const handleNodeClick = (node: SkillNode) => {
    if (pinnedSkill?.id === node.id) {
      setPinnedSkill(null); // Unpin if clicking same
    } else {
      setPinnedSkill(node); // Pin new node
    }
  };

  const handleNodeMouseEnter = (node: SkillNode) => {
    if (!pinnedSkill) {
      setHoveredSkill(node);
    }
  };

  const handleNodeMouseLeave = () => {
    setHoveredSkill(null);
  };

  // Render clean compact skill tree nodes
  const renderSkillNode = (node: SkillNode) => {
    const isIntermediate = node.level === "Intermediate";
    const isCurrentActive = activeDetailNode?.id === node.id;
    const isPinned = pinnedSkill?.id === node.id;

    return (
      <div key={node.id} className='relative space-y-2.5'>
        {/* Compact Skill Node Row */}
        <button
          className={`w-full group px-4 py-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-left cursor-pointer relative ${
            isPinned
              ? "bg-primary/20 border-primary ring-2 ring-primary/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_6px_20px_rgba(2,132,199,0.25)]"
              : isCurrentActive
                ? "bg-primary/15 border-primary shadow-md"
                : isIntermediate
                  ? "bg-gradient-to-r from-amber-500/10 via-primary/10 to-white dark:to-content1 border-amber-500/50 hover:border-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.04)]"
                  : "bg-zinc-50/80 dark:bg-content1 hover:bg-zinc-100 dark:hover:bg-default-100/90 border-zinc-300/90 dark:border-zinc-800 hover:border-zinc-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.03)] dark:shadow-none"
          }`}
          type='button'
          onClick={() => handleNodeClick(node)}
          onMouseEnter={() => handleNodeMouseEnter(node)}
          onMouseLeave={handleNodeMouseLeave}
        >
          {/* Skill Title & Tier Marker */}
          <div className='flex items-center gap-2.5 min-w-0 flex-1'>
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isIntermediate ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-zinc-400"
              }`}
            />
            <span
              className={`text-xs sm:text-sm font-bold truncate ${
                isIntermediate
                  ? "text-foreground group-hover:text-primary"
                  : "text-foreground/90 group-hover:text-foreground"
              }`}
            >
              {node.name}
            </span>
          </div>

          {/* Level Tag / Pinned Indicator */}
          <div className='flex items-center gap-1.5 flex-shrink-0'>
            {isPinned && (
              <span className='px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center gap-1 shadow-sm'>
                <Pin className='h-2.5 w-2.5' /> Pinned
              </span>
            )}

            {isIntermediate ? (
              <span className='px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/35 flex items-center gap-1 shadow-sm'>
                <Star className='h-3 w-3 fill-amber-500 text-amber-500' />
                Intermediate
              </span>
            ) : (
              <span className='px-2.5 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-muted-foreground text-[10px] font-semibold uppercase tracking-wider border border-zinc-300 dark:border-zinc-700'>
                Basic
              </span>
            )}
          </div>
        </button>

        {/* Child Sub-Branches with Tree Line Connector */}
        {node.children && node.children.length > 0 && (
          <div className='pl-4 sm:pl-6 border-l-2 border-primary/25 ml-4 sm:ml-5 space-y-2.5 pt-1'>
            {node.children.map((child) => renderSkillNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='relative w-full space-y-8'>
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
          RPG Tech & Skill Tree
        </div>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Interactive Skill Trees
        </h2>
        <p className='text-muted-foreground md:text-lg leading-relaxed flex items-center gap-2'>
          <Info className='h-4 w-4 text-primary flex-shrink-0' />
          <span>
            Hover hoặc click vào kỹ năng để xem chi tiết kiến trúc & ứng dụng thực tế (Hover lia chuột
            ra sẽ tắt, Click để ghim giữ cố định).
          </span>
        </p>
      </motion.div>

      {/* Skill Level Legend Banner */}
      <div className='p-4 rounded-2xl bg-white dark:bg-content1 border-2 border-zinc-300/80 dark:border-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-sm flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-2 text-xs text-muted-foreground font-mono'>
          <Sparkles className='h-4 w-4 text-primary' />
          <span className='font-bold uppercase text-foreground'>Skill Mastery Tiers:</span>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/35 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-sm'>
            <Star className='h-3.5 w-3.5 fill-amber-500' />
            <span>Intermediate: Java, NestJS, PostgreSQL, React</span>
          </div>

          <div className='flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-muted-foreground text-xs font-semibold'>
            <span>🔷 Basic: Spring Modulith, DDD, Next.js, Docker, Traefik, Linux VPS, IoT...</span>
          </div>
        </div>
      </div>

      {/* Tree Category Filter Buttons */}
      <div className='flex flex-wrap gap-2'>
        <Button
          className='font-semibold text-xs sm:text-sm shadow-sm'
          color={activeTreeId === "all" ? "primary" : "default"}
          size='sm'
          variant={activeTreeId === "all" ? "solid" : "flat"}
          onPress={() => setActiveTreeId("all")}
        >
          All Skill Trees ({skillTrees.length})
        </Button>

        {skillTrees.map((tree) => (
          <Button
            key={tree.id}
            className='font-semibold text-xs sm:text-sm shadow-sm'
            color={activeTreeId === "tree.id" ? "primary" : "default"}
            size='sm'
            startContent={tree.icon}
            variant={activeTreeId === tree.id ? "solid" : "flat"}
            onPress={() => setActiveTreeId(tree.id)}
          >
            {tree.categoryName.split(" ")[0]}
          </Button>
        ))}
      </div>

      {/* Main RPG Tree Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start'>
        {displayedTrees.map((tree, treeIdx) => (
          <motion.div
            key={tree.id}
            animate={{ opacity: 1, y: 0 }}
            className='p-5 sm:p-7 rounded-3xl bg-white dark:bg-content1 border-2 border-zinc-300/80 dark:border-zinc-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-md space-y-5'
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, delay: treeIdx * 0.08 }}
          >
            {/* Tree Branch Header */}
            <div className='flex items-center justify-between gap-3 pb-3 border-b border-default-100'>
              <div className='flex items-center gap-2.5'>
                <div className='p-2 rounded-xl bg-primary/10 text-primary border border-primary/20'>
                  {tree.icon}
                </div>
                <div>
                  <h3 className='text-base sm:text-lg font-extrabold text-foreground tracking-tight'>
                    {tree.categoryName}
                  </h3>
                  <p className='text-xs text-muted-foreground'>{tree.tagline}</p>
                </div>
              </div>
            </div>

            {/* Recursive Tree Branches Rendering */}
            <div className='space-y-3 pt-1'>
              {renderSkillNode(tree.rootSkill)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popover / HUD Detail Inspector Panel (Appears on Hover or Click-Pinned) */}
      <AnimatePresence>
        {activeDetailNode && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className='fixed bottom-6 right-6 z-[100] max-w-sm sm:max-w-md w-[calc(100%-3rem)] p-5 rounded-2xl bg-[#12131a] dark:bg-[#151620] border-2 border-primary/60 text-white shadow-[0_20px_45px_rgba(0,0,0,0.9)] space-y-3'
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Popover Header */}
            <div className='flex items-center justify-between gap-2 border-b border-zinc-800 pb-2.5'>
              <div className='flex items-center gap-2'>
                <Zap className='h-4 w-4 text-amber-400' />
                <span className='font-extrabold text-base text-white'>
                  {activeDetailNode.name}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                {pinnedSkill?.id === activeDetailNode.id ? (
                  <button
                    className='text-[11px] font-bold text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-md flex items-center gap-1 border border-sky-500/30 hover:bg-sky-500/25 cursor-pointer'
                    type='button'
                    onClick={() => setPinnedSkill(null)}
                  >
                    <PinOff className='h-3 w-3' /> Unpin
                  </button>
                ) : (
                  <span className='text-[10px] text-zinc-400 font-mono italic'>
                    (Click node to pin)
                  </span>
                )}

                <button
                  aria-label='Close'
                  className='text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer'
                  type='button'
                  onClick={() => {
                    setPinnedSkill(null);
                    setHoveredSkill(null);
                  }}
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Popover Content */}
            <div className='space-y-2.5 text-xs'>
              <div className='flex items-center gap-2'>
                <span className='text-zinc-400'>Mastery Level:</span>
                {activeDetailNode.level === "Intermediate" ? (
                  <span className='px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-extrabold flex items-center gap-1 border border-amber-500/30'>
                    <Star className='h-3 w-3 fill-amber-400' />
                    Intermediate (Core Proficient)
                  </span>
                ) : (
                  <span className='px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700'>
                    Basic (Working Knowledge)
                  </span>
                )}
                <span className='text-zinc-500 font-mono'>Tier {activeDetailNode.tier}</span>
              </div>

              <div>
                <span className='text-zinc-400 block mb-0.5 font-semibold'>
                  Architecture Purpose:
                </span>
                <p className='text-zinc-200 leading-relaxed'>{activeDetailNode.tagline}</p>
              </div>

              {activeDetailNode.projectUsage && (
                <div>
                  <span className='text-zinc-400 block mb-0.5 font-semibold'>
                    Production Application:
                  </span>
                  <p className='text-primary font-bold'>{activeDetailNode.projectUsage}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
