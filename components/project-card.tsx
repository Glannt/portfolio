"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, ChevronUp, Zap, ArrowRight, Layers, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardBody } from "@heroui/react";

import { GithubIcon } from "./icons";
import Slider from "./slider";

import { Project } from "@/data/projects";

const categoryLabels: Record<string, string> = {
  app: "App",
  backend: "Backend",
  iot: "IoT",
  web: "Web",
};

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const hasMultipleImages = Array.isArray(project.images) && project.images.length > 1;
  const hasHighlights = project.highlights && project.highlights.length > 0;
  const categories = project.categories.map((category) => categoryLabels[category] ?? category);
  const sourceUrls = project.sourceUrls ?? [
    {
      label: "Source Code",
      url: project.githubUrl,
    },
  ];

  return (
    <Card className='group relative w-full flex flex-col lg:flex-row overflow-hidden border-2 border-zinc-300/85 dark:border-zinc-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-md transition-all duration-300 hover:border-primary/70 hover:shadow-xl hover:ring-1 hover:ring-primary/30 rounded-2xl bg-white dark:bg-content1'>
      {/* Full-Card Clickable Overlay Link */}
      <Link
        aria-label={`View full case study for ${project.title}`}
        className='absolute inset-0 z-0'
        href={`/project/${project.id}`}
      />

      {/* Left side - Media Showcase */}
      <div className='relative z-10 w-full lg:w-[400px] xl:w-[450px] min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] flex-shrink-0 overflow-hidden bg-zinc-950/20'>
        {hasMultipleImages ? (
          <Slider images={project.images} />
        ) : (
          <Link
            aria-label={`View ${project.title} screenshot`}
            className='block relative h-full min-h-[260px] w-full overflow-hidden'
            href={`/project/${project.id}`}
          >
            <Image
              fill
              alt={project.title}
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              sizes='(min-width: 1024px) 450px, 100vw'
              src={project.images[0] || "/placeholder.svg"}
            />
          </Link>
        )}

        {/* Category Badges Overlay */}
        <div className='absolute top-3.5 left-3.5 flex max-w-[calc(100%-2rem)] flex-wrap gap-1.5 pointer-events-none'>
          {categories.map((category) => (
            <span
              key={category}
              className='bg-background/90 backdrop-blur-md text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/30 shadow-md'
            >
              {category}
            </span>
          ))}
        </div>

        {/* Click hint overlay on hover */}
        <div className='absolute bottom-3 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5'>
          <Sparkles className='h-3 w-3 text-primary' />
          <span>Click row to view details</span>
        </div>
      </div>

      {/* Right side - Information, Badges & Actions */}
      <CardBody className='relative z-10 pointer-events-none flex-1 p-6 sm:p-7 lg:p-8 flex flex-col justify-between space-y-4'>
        <div className='space-y-3.5 pointer-events-auto'>
          {/* Subtitle / Role Tag */}
          {project.subtitle && (
            <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary'>
              <Layers className='h-3.5 w-3.5' />
              <span>{project.subtitle}</span>
            </div>
          )}

          {/* Title */}
          <h3 className='text-2xl sm:text-3xl font-extrabold leading-snug text-foreground group-hover:text-primary transition-colors'>
            <Link
              className='hover:underline inline-block'
              href={`/project/${project.id}`}
            >
              {project.title}
            </Link>
          </h3>

          {/* Description & Purpose */}
          <p className='text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3'>
            {project.description}
          </p>

          {/* Technologies Badges (Custom Colored Chip Tags) */}
          <div className='flex flex-wrap gap-1.5 pt-1'>
            {project.technologies.slice(0, 8).map((tech: string, index: number) => (
              <span
                key={index}
                className='px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20'
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 8 && (
              <span className='px-2.5 py-1 rounded-lg bg-default-100 text-muted-foreground text-xs font-medium border border-default-200'>
                +{project.technologies.length - 8} more
              </span>
            )}
          </div>

          {/* Key Highlights Accordion */}
          {hasHighlights && (
            <div className='pt-1'>
              <button
                className='flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer'
                type='button'
                onClick={() => setExpanded(!expanded)}
              >
                <Zap className='h-3.5 w-3.5' />
                Key Highlights & Architecture
                {expanded ? (
                  <ChevronUp className='h-3.5 w-3.5' />
                ) : (
                  <ChevronDown className='h-3.5 w-3.5' />
                )}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.ul
                    animate={{ opacity: 1, height: "auto" }}
                    className='mt-2.5 space-y-1.5 overflow-hidden'
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.highlights.map((item, i) => (
                      <li key={i} className='flex items-start gap-2 text-xs text-muted-foreground'>
                        <span className='text-primary mt-0.5 flex-shrink-0 font-bold'>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Action Button Bar */}
        <div className='flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-default-100 pointer-events-auto'>
          <div className='flex flex-wrap gap-2'>
            {sourceUrls.map((source) => (
              <Button
                key={source.url}
                as='a'
                color='default'
                href={source.url}
                rel='noopener noreferrer'
                size='sm'
                target='_blank'
                variant='flat'
              >
                <GithubIcon className='h-4 w-4' />
                {source.label}
              </Button>
            ))}
            {project.liveUrl && project.liveUrl !== "#" && (
              <Button
                as='a'
                color='primary'
                href={project.liveUrl}
                rel='noopener noreferrer'
                size='sm'
                target='_blank'
                variant='flat'
              >
                <ExternalLink className='h-4 w-4' />
                {project.liveUrl.includes("youtu") ? "Demo Video" : "Live Demo"}
              </Button>
            )}
          </div>

          <Button
            as={Link}
            className='font-semibold text-xs sm:text-sm'
            color='primary'
            href={`/project/${project.id}`}
            size='sm'
            variant='solid'
          >
            Explore Case Study
            <ArrowRight className='h-4 w-4 ml-1' />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
