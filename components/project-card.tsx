"use client";

import { useState } from "react";
import { Badge, Button, Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import { ExternalLink, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { GithubIcon } from "./icons";
import Slider from "./slider";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  images: string | string[];
  categories: string[];
  technologies: string[];
  highlights?: string[];
  githubUrl: string;
  sourceUrls?: {
    label: string;
    url: string;
  }[];
  liveUrl: string;
}

const categoryLabels: Record<string, string> = {
  app: "App",
  backend: "Backend",
  iot: "IoT",
  web: "Web",
};

export default function ProjectCard({ project }: { project: ProjectCardProps }) {
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
    <Card className='flex h-full min-w-0 flex-col overflow-hidden border border-default-200/70 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-medium'>
      <div className='relative h-56 w-full overflow-hidden sm:h-64'>
        {hasMultipleImages ? (
          <Slider images={project.images as string[]} />
        ) : (
          <Image
            fill
            alt={project.title}
            className='object-cover transition-transform duration-500 hover:scale-105'
            sizes='(min-width: 1024px) 50vw, 100vw'
            src={
              Array.isArray(project.images)
                ? project.images[0]
                : project.images || "/placeholder.svg"
            }
          />
        )}
        <div className='absolute top-3 right-3 flex max-w-[calc(100%-1.5rem)] flex-wrap justify-end gap-1.5'>
          {categories.map((category) => (
            <span
              key={category}
              className='bg-background/80 backdrop-blur-sm text-primary text-xs font-semibold px-2 py-1 rounded-full border border-primary/30'
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <CardBody className='flex-grow space-y-5 p-5 sm:p-6'>
        <div className='space-y-2'>
          <h3 className='text-xl font-bold leading-tight sm:text-2xl'>{project.title}</h3>
          <p className='text-muted-foreground text-sm leading-relaxed'>{project.description}</p>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {project.technologies.slice(0, 6).map((tech: string, index: number) => (
            <Badge key={index} color='primary' size='sm' variant='flat'>
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 6 && (
            <Badge color='default' size='sm' variant='flat'>
              +{project.technologies.length - 6} more
            </Badge>
          )}
        </div>

        {hasHighlights && (
          <div>
            <button
              className='flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors'
              onClick={() => setExpanded(!expanded)}
            >
              <Zap className='h-3 w-3' />
              Key Highlights
              {expanded ? <ChevronUp className='h-3 w-3' /> : <ChevronDown className='h-3 w-3' />}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.ul
                  animate={{ opacity: 1, height: "auto" }}
                  className='mt-2 space-y-1 overflow-hidden'
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.highlights!.map((item, i) => (
                    <li key={i} className='flex items-start gap-2 text-xs text-muted-foreground'>
                      <span className='text-primary mt-0.5 flex-shrink-0'>-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardBody>

      <CardFooter className='flex flex-wrap gap-2 border-t border-default-100 p-5 sm:p-6'>
        {sourceUrls.map((source) => (
          <Button
            key={source.url}
            as='a'
            color='primary'
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
            href={project.liveUrl}
            rel='noopener noreferrer'
            size='sm'
            target='_blank'
            variant='bordered'
          >
            <ExternalLink className='h-4 w-4' />
            {project.liveUrl.includes("youtu") ? "Demo Video" : "Live Demo"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
