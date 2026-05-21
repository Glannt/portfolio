"use client";

import { Badge, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "IoT & Integration Engineer Lead",
    company: "AISL Smart Locker Ecosystem",
    duration: "Apr 2026 - Present",
    description:
      "Architected and deployed a multi-microservice IoT platform — NestJS gRPC gateway, Python Raspberry Pi hardware agent, and Arduino serial controllers — all orchestrated via MQTT SSL real-time messaging.",
    responsibilities: [
      "Built NestJS API gateway routing to identity, order, locker & payment microservices via gRPC with custom GrpcErrorInterceptor and AllExceptionsFilter",
      "Developed Python IoT agent on Raspberry Pi with RS485/serial manager, CabinetState engine, HeartbeatService, and DiscoveryService for physical locker control",
      "Implemented Arduino C/C++ serial controller with servo pop/open sequences, RS485 bus settling delays, and 200ms sensor debounce logic",
      "Crafted MQTT SSL topic hierarchy enabling sub-second command-to-execution latency across all locker cabinets",
      "Built advertisements, blogs, locker-lease, and promotions modules; engineered pro-rated billing and logistics dispatch algorithms",
      "Configured Prometheus metrics, Docker Compose multi-service orchestration, and Firebase Auth token validation lifecycle",
    ],
    technologies: ["NestJS", "gRPC", "MQTT SSL", "Python", "Arduino C/C++", "Raspberry Pi", "RS485", "PostgreSQL", "SQLite", "Firebase Auth", "Prometheus", "Docker"],
  },
  {
    id: 2,
    role: "Monorepo & Full-Stack Architect",
    company: "Noma Custom Bouquet E-Commerce",
    duration: "Oct 2025 - Mar 2026",
    description:
      "Engineered a full-stack custom bouquet ordering platform in a Turborepo monorepo — featuring MongoDB-backed NestJS APIs, Cloudinary media management, and Gemini AI + ModeLabs generative flower preview pipelines.",
    responsibilities: [
      "Built NestJS REST APIs for bouquet concepts, cart, custom orders, and flowers — with combined multipart/form-data upload endpoints and Cloudinary integration",
      "Integrated Gemini AI and ModeLabs pipelines for prompt-to-3D flower asset generation and real-time bouquet composition previews",
      "Designed React 19 + Vite interactive UI with Ant Design components, Framer Motion micro-animations, and Tailwind CSS v4 design system",
      "Configured Turborepo with pnpm workspaces for unified monorepo builds across NestJS backend and Vite/React frontend",
      "Established conventional commits, Husky pre-commit hooks, lint-staged, and branching/merge strategy conventions",
    ],
    technologies: ["Vite", "React 19", "NestJS", "MongoDB", "Tailwind CSS v4", "Turborepo", "Cloudinary", "Gemini AI", "Ant Design", "pnpm"],
  },
  {
    id: 3,
    role: "Core Full-Stack Developer",
    company: "SBA-personal (Edutest-Gen)",
    duration: "Aug 2025 - Oct 2025",
    description:
      "Built an enterprise academic exam management system — automatic matrix-based paper generation, n8n question search, draggable exam preview, and Docker Compose one-command deployment.",
    responsibilities: [
      "Built Java Spring Boot REST APIs for Subject, Chapter, Lesson, Grade, Question, Option, Exam, Matrix & MatrixDetail entities with JWT security and Swagger docs",
      "Developed React + HeroUI v2 frontend with draggable exam matrix builder, role-based dashboards (admin/teacher), and paginated data tables",
      "Programmed an A4 print preview layout engine rendering dynamically generated exam papers from complexity matrix distributions",
      "Integrated n8n workflow automation for AI-powered dynamic question bank search indexing",
      "Containerized client + server + PostgreSQL with Docker Compose for zero-config one-command deployments",
    ],
    technologies: ["Java Spring Boot", "Gradle", "React", "HeroUI v2", "PostgreSQL", "n8n Workflows", "Docker", "JWT", "Swagger"],
  },
];

export default function Experience() {
  return (
    <div className='space-y-12'>
      <motion.div
        className='space-y-4 text-center'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Engineering Journey
        </h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          My system design accomplishments and key project contributions.
        </p>
      </motion.div>

      <div className='relative'>
        {/* Central timeline line */}
        <div className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-muted' />

        <div className='space-y-12'>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`relative pl-10 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              } md:w-1/2 ${index % 2 === 0 ? "md:ml-0" : "md:ml-auto"}`}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {/* Timeline pin */}
              <div
                className={`absolute top-0 left-2 md:left-auto ${
                  index % 2 === 0 ? "md:-right-6" : "md:-left-6"
                } w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center`}
              >
                <Briefcase className='h-4 w-4 md:h-5 md:w-5 text-primary' />
              </div>

              <Card className="hover:border-primary/40 transition-colors">
                <CardBody className='p-6 space-y-4'>
                  <div className='space-y-2'>
                    <div className={`flex items-center gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <h3 className='text-xl font-bold'>{experience.role}</h3>
                    </div>
                    <div className={`flex items-center gap-2 text-primary font-medium ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <span>{experience.company}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <Calendar className='h-4 w-4' />
                      <span>{experience.duration}</span>
                    </div>
                  </div>

                  <p className='text-muted-foreground text-sm leading-relaxed'>{experience.description}</p>

                  <div className='space-y-2'>
                    <h4 className='font-semibold text-sm'>Key Contributions:</h4>
                    <ul className={`list-disc list-inside space-y-1 text-sm text-muted-foreground ${index % 2 === 0 ? "md:text-right list-none" : "md:text-left"}`}>
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i} className="leading-relaxed">{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    {experience.technologies.map((tech, i) => (
                      <Badge key={i} variant='flat' color="primary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
