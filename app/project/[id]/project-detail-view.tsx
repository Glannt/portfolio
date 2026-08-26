"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Zap,
  Target,
  Wrench,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button, Card, CardBody } from "@heroui/react";

import ProjectGallery from "./gallery";
import { Project } from "@/data/projects";

interface Props {
  project: Project;
  nextProject: Project;
}

export default function ProjectDetailView({ project, nextProject }: Props) {
  const sourceUrls = project.sourceUrls ?? [
    {
      label: "Source Code",
      url: project.githubUrl,
    },
  ];

  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top Breadcrumb & Navigation */}
      <div className='flex items-center justify-between gap-4 pt-2'>
        <Button
          as={Link}
          className='text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground'
          href='/#projects'
          size='sm'
          startContent={<ArrowLeft className='h-4 w-4' />}
          variant='light'
        >
          Back to all projects
        </Button>

        <div className='flex items-center gap-1.5'>
          {project.categories.map((cat) => (
            <span
              key={cat}
              className='px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/25'
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Header */}
      <div className='space-y-4 max-w-4xl'>
        {project.subtitle && (
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20'>
            <Layers className='h-3.5 w-3.5' />
            {project.subtitle}
          </div>
        )}
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight'>
          {project.title}
        </h1>
        <p className='text-muted-foreground text-base sm:text-lg leading-relaxed'>
          {project.longDescription}
        </p>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-3 pt-2'>
          {project.liveUrl && project.liveUrl !== "#" && (
            <Button
              as='a'
              color='primary'
              href={project.liveUrl}
              rel='noopener noreferrer'
              size='md'
              target='_blank'
              variant='solid'
            >
              <ExternalLink className='h-4 w-4 mr-1' />
              {project.liveUrl.includes("youtu") ? "Watch Demo Video" : "Visit Live Platform"}
            </Button>
          )}

          {sourceUrls.map((source) => (
            <Button
              key={source.url}
              as='a'
              color='default'
              href={source.url}
              rel='noopener noreferrer'
              size='md'
              target='_blank'
              variant='flat'
            >
              <Github className='h-4 w-4 mr-1' />
              {source.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Image Gallery Showcase Component */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl sm:text-2xl font-bold flex items-center gap-2'>
            <span>🖼️ Project Visual Showcase</span>
          </h2>
          <span className='text-xs text-muted-foreground'>
            {project.images.length} {project.images.length > 1 ? "Screenshots" : "Screenshot"}
          </span>
        </div>
        <ProjectGallery images={project.images} title={project.title} />
      </section>

      {/* Grid: Purpose & Problem Statement vs Key Highlights */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Left Column: Purpose & Mission */}
        <Card className='border border-default-200/70 shadow-sm'>
          <CardBody className='p-6 sm:p-8 space-y-6'>
            <div className='flex items-center gap-2.5 text-primary'>
              <Target className='h-6 w-6' />
              <h3 className='text-xl font-bold text-foreground'>Project Purpose & Objectives</h3>
            </div>

            <div className='space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground'>
              <div>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-foreground mb-1'>
                  🎯 Core Purpose
                </h4>
                <p>{project.purpose}</p>
              </div>

              {project.problemStatement && (
                <div>
                  <h4 className='text-xs font-semibold uppercase tracking-wider text-foreground mb-1'>
                    ⚠️ The Challenge & Problem Statement
                  </h4>
                  <p>{project.problemStatement}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h4 className='text-xs font-semibold uppercase tracking-wider text-foreground mb-1'>
                    💡 Engineering Solution
                  </h4>
                  <p>{project.solution}</p>
                </div>
              )}

              {project.architectureDetails && (
                <div className='pt-2 space-y-2'>
                  <h4 className='text-xs font-semibold uppercase tracking-wider text-foreground'>
                    🏗️ Architecture Principles
                  </h4>
                  <ul className='space-y-1.5'>
                    {project.architectureDetails.map((item, idx) => (
                      <li key={idx} className='flex items-start gap-2 text-xs sm:text-sm text-foreground/80'>
                        <CheckCircle2 className='h-4 w-4 text-success flex-shrink-0 mt-0.5' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Right Column: Key Technical Highlights */}
        <Card className='border border-default-200/70 shadow-sm'>
          <CardBody className='p-6 sm:p-8 space-y-6'>
            <div className='flex items-center gap-2.5 text-primary'>
              <Zap className='h-6 w-6' />
              <h3 className='text-xl font-bold text-foreground'>Technical Achievements & Highlights</h3>
            </div>

            <ul className='space-y-3.5'>
              {project.highlights.map((highlight, index) => (
                <li key={index} className='flex items-start gap-3 text-sm text-muted-foreground leading-relaxed'>
                  <span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center mt-0.5'>
                    {index + 1}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* Tools & Technologies Deep-Dive Section */}
      <section className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-primary'>
            <Wrench className='h-6 w-6' />
            <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
              Tools & Technologies Ecosystem
            </h2>
          </div>
          <p className='text-muted-foreground text-sm sm:text-base'>
            Detailed overview of specific frameworks, libraries, and protocols powering this application.
          </p>
        </div>

        {project.techDetails && project.techDetails.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {project.techDetails.map((group, gIdx) => (
              <Card key={gIdx} className='border border-default-200/60 shadow-sm'>
                <CardBody className='p-5 sm:p-6 space-y-4'>
                  <h3 className='text-base font-bold text-foreground pb-2 border-b border-default-100 flex items-center justify-between'>
                    <span>{group.category}</span>
                    <span className='text-xs font-normal text-muted-foreground'>
                      {group.items.length} tools
                    </span>
                  </h3>
                  <div className='space-y-3'>
                    {group.items.map((tool, tIdx) => (
                      <div key={tIdx} className='flex items-start justify-between gap-3 text-sm'>
                        <div className='space-y-0.5 min-w-0'>
                          <span className='font-semibold text-foreground block'>{tool.name}</span>
                          <span className='text-xs text-muted-foreground block'>{tool.role}</span>
                        </div>
                        <span className='px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold font-mono border border-primary/20 flex-shrink-0'>
                          Applied
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className='px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20'
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Next Project Footer Bar */}
      <div className='pt-8 border-t border-default-200/60 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <Button
          as={Link}
          className='font-medium'
          href='/#projects'
          variant='light'
        >
          ← All Projects
        </Button>

        <div className='flex items-center gap-3'>
          <span className='text-xs text-muted-foreground'>Next Project:</span>
          <Button
            as={Link}
            className='font-semibold'
            color='primary'
            href={`/project/${nextProject.id}`}
            variant='flat'
          >
            {nextProject.title}
            <ArrowRight className='h-4 w-4 ml-1' />
          </Button>
        </div>
      </div>
    </div>
  );
}
