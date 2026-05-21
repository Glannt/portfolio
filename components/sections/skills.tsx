"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge, Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";

// Define types for skills
type SkillWithLevel = {
  name: string;
  level: string;
  image?: string;
};

type SkillWithoutLevel = {
  name: string;
};

type Skill = SkillWithLevel | SkillWithoutLevel;

// Type guard functions
const hasImage = (skill: Skill): skill is SkillWithLevel => {
  return "image" in skill && !!skill.image;
};

const hasLevel = (skill: Skill): skill is SkillWithLevel => {
  return "level" in skill;
};

const skills: Record<string, Skill[]> = {
  backend: [
    { name: "Java Spring Boot", level: "Advanced" },
    { name: "NestJS (TypeScript)", level: "Advanced" },
    { name: "gRPC", level: "Advanced" },
    { name: "RESTful APIs", level: "Advanced" },
    { name: "Express.js", level: "Intermediate" },
    { name: "Python (FastAPI)", level: "Intermediate" },
    { name: "n8n Automation", level: "Intermediate" },
    { name: "Node.js", level: "Advanced" },
  ],
  frontend: [
    { name: "React 19", level: "Advanced", image: "/assets/images/skills/react.svg" },
    { name: "Next.js", level: "Intermediate", image: "/assets/images/skills/next.svg" },
    { name: "Vite", level: "Advanced" },
    { name: "Tailwind CSS v4", level: "Advanced", image: "/assets/images/skills/tailwind.svg" },
    { name: "JavaScript", level: "Advanced", image: "/assets/images/skills/js.svg" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Ant Design", level: "Advanced" },
    { name: "HeroUI (v2)", level: "Advanced" },
    { name: "Framer Motion", level: "Intermediate" },
    { name: "HTML5", level: "Advanced", image: "/assets/images/skills/html.svg" },
    { name: "CSS3", level: "Advanced", image: "/assets/images/skills/css.svg" },
  ],
  database: [
    { name: "PostgreSQL", level: "Advanced" },
    { name: "MongoDB", level: "Advanced" },
    { name: "SQLite", level: "Advanced" },
    { name: "MySQL", level: "Intermediate" },
    { name: "Firebase", level: "Intermediate" },
  ],
  iot_tools: [
    { name: "MQTT SSL", level: "Advanced" },
    { name: "Arduino / C++", level: "Intermediate" },
    { name: "Raspberry Pi (Python)", level: "Intermediate" },
    { name: "RS485 Serial", level: "Intermediate" },
    { name: "Gemini AI", level: "Intermediate" },
    { name: "Cloudinary", level: "Intermediate" },
    { name: "Docker / Compose", level: "Intermediate" },
    { name: "Turborepo & pnpm", level: "Advanced" },
    { name: "Prometheus", level: "Intermediate" },
    { name: "Git & Conventional Commits", level: "Advanced" },
    { name: "Gradle", level: "Intermediate" },
  ],
  soft: [
    { name: "Systems Thinking" },
    { name: "Microservices Architecture" },
    { name: "Collaborative Git Workflows" },
    { name: "Creative Problem Solving" },
    { name: "Rapid Self-Learning" },
    { name: "Requirements Vetting" },
  ],
};

const categoryLabels = {
  backend: "Backend Development",
  frontend: "Frontend Development",
  database: "Databases",
  iot_tools: "IoT, AI & DevOps",
  soft: "Soft Skills & Mindset",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = React.useState<string>("backend");

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
          Skills & Expertise
        </h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          A comprehensive overview of my technical capabilities in building modern digital products.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Left column - Category buttons */}
        <div className='md:col-span-1'>
          <div className='flex flex-col items-center space-y-4'>
            {Object.entries(categoryLabels).map(([category, label]) => (
              <Button
                key={category}
                className='w-full py-6 font-semibold shadow-sm transition-all duration-300 hover:translate-x-1'
                color={activeCategory === category ? "primary" : "default"}
                variant={activeCategory === category ? "solid" : "flat"}
                onPress={() => setActiveCategory(category)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Right column - Skills content */}
        <div className='md:col-span-3'>
          {Object.entries(skills).map(
            ([category, skillList]) =>
              activeCategory === category && (
                <div key={category} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {skillList.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:border-primary/40 border border-transparent transition-all duration-300 shadow-sm h-full">
                        <CardBody className='p-5 flex flex-row items-center justify-between gap-3'>
                          <div className='flex items-center gap-3 min-w-0'>
                            {hasImage(skill) && skill.image ? (
                              <div className='w-8 h-8 flex-shrink-0 relative'>
                                <Image
                                  alt={skill.name}
                                  fill
                                  className='object-contain'
                                  src={skill.image}
                                />
                              </div>
                            ) : null}
                            <h3 className='font-semibold text-sm truncate'>{skill.name}</h3>
                          </div>

                          {hasLevel(skill) && (
                            <Badge
                              color={
                                skill.level === "Advanced"
                                  ? "primary"
                                  : skill.level === "Intermediate"
                                    ? "success"
                                    : "default"
                              }
                              size="sm"
                              variant="flat"
                            >
                              {skill.level}
                            </Badge>
                          )}
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
