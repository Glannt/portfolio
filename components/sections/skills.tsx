"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge, Button, Card, CardBody, Image } from "@heroui/react";

// Define types for skills
type SkillWithLevel = {
  name: string;
  level: string;
  image: string;
};

type SkillWithoutLevel = {
  name: string;
};

type Skill = SkillWithLevel | SkillWithoutLevel;

// Type guard functions
const hasImage = (skill: Skill): skill is SkillWithLevel => {
  return "image" in skill;
};

const hasLevel = (skill: Skill): skill is SkillWithLevel => {
  return "level" in skill;
};

const skills: Record<string, Skill[]> = {
  frontend: [
    { name: "HTML", level: "Advanced", image: "/assets/images/skills/html.svg" },
    { name: "CSS", level: "Advanced", image: "/assets/images/skills/css.svg" },
    { name: "JavaScript", level: "Advanced", image: "/assets/images/skills/js.svg" },
    { name: "TypeScript", level: "Intermediate", image: "/assets/images/skills/typescript.png" },
    { name: "React", level: "Advanced", image: "/assets/images/skills/react.svg" },
    { name: "Next.js", level: "Intermediate", image: "/assets/images/skills/next.svg" },
    { name: "Tailwind CSS", level: "Advanced", image: "/assets/images/skills/tailwind.svg" },
    { name: "Framer Motion", level: "Intermediate", image: "/assets/images/skills/framer.png" },
  ],
  backend: [
    { name: "Node.js", level: "Advanced", image: "/assets/images/nodejs.png" },
    { name: "Express", level: "Intermediate", image: "/assets/images/express.png" },
    { name: "Python", level: "Intermediate", image: "/assets/images/python.png" },
    { name: "Django", level: "Basic", image: "/assets/images/django.png" },
    { name: "GraphQL", level: "Basic", image: "/assets/images/graphql.png" },
    { name: "RESTful APIs", level: "Advanced", image: "/assets/images/api.png" },
  ],
  database: [
    { name: "MongoDB", level: "Intermediate", image: "/assets/images/mongodb.png" },
    { name: "PostgreSQL", level: "Intermediate", image: "/assets/images/postgresql.png" },
    { name: "MySQL", level: "Basic", image: "/assets/images/mysql.png" },
    { name: "Firebase", level: "Advanced", image: "/assets/images/firebase.png" },
    { name: "Redis", level: "Basic", image: "/assets/images/redis.png" },
  ],
  tools: [
    { name: "Git", level: "Advanced", image: "/assets/images/git.png" },
    { name: "Docker", level: "Intermediate", image: "/assets/images/docker.png" },
    { name: "AWS", level: "Basic", image: "/assets/images/aws.png" },
    { name: "CI/CD", level: "Intermediate", image: "/assets/images/cicd.png" },
    { name: "Jest", level: "Intermediate", image: "/assets/images/jest.png" },
    { name: "Figma", level: "Basic", image: "/assets/images/figma.png" },
  ],
  soft: [
    { name: "Communication" },
    { name: "Teamwork" },
    { name: "Problem Solving" },
    { name: "Time Management" },
    { name: "Adaptability" },
  ],
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
  soft: "Soft Skills",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = React.useState<string>("frontend");

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
          A comprehensive overview of my technical skills and proficiencies.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Left column - Category buttons */}
        <div className='md:col-span-1'>
          <div className='flex flex-col items-center space-y-4'>
            {Object.entries(categoryLabels).map(([category, label]) => (
              <Button
                key={category}
                className='w-full py-5'
                color={activeCategory === category ? "primary" : "default"}
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
                <div key={category} className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                  {skillList.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <Card>
                        <CardBody className='p-8'>
                          <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-3 flex-grow'>
                              {hasImage(skill) && (
                                <div className='w-10 h-10 flex-shrink-0'>
                                  <Image
                                    alt={skill.name}
                                    className='w-full h-full object-contain'
                                    radius='sm'
                                    src={skill.image}
                                  />
                                </div>
                              )}
                              <h3 className='font-medium'>{skill.name}</h3>
                            </div>

                            {hasLevel(skill) && (
                              <Badge
                                color={
                                  skill.level === "Expert"
                                    ? "primary"
                                    : skill.level === "Advanced"
                                      ? "secondary"
                                      : skill.level === "Intermediate"
                                        ? "success"
                                        : "default"
                                }
                                variant={
                                  skill.level === "Expert"
                                    ? "solid"
                                    : skill.level === "Advanced"
                                      ? "flat"
                                      : skill.level === "Intermediate"
                                        ? "faded"
                                        : "shadow"
                                }
                              >
                                {skill.level}
                              </Badge>
                            )}
                          </div>
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
