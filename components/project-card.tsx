import { Badge, Button, Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { GithubIcon } from "./icons";
import Slider from "./slider";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  images: string | string[];
  category: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectCard({ project }: { project: ProjectCardProps }) {
  const hasMultipleImages = Array.isArray(project.images) && project.images.length > 1;

  return (
    <Card className='overflow-hidden h-full flex flex-col'>
      <div className='relative h-48 w-full'>
        {hasMultipleImages ? (
          <Slider images={project.images as string[]} />
        ) : (
          <Image
            fill
            alt={project.title}
            className='object-cover transition-transform duration-300 hover:scale-105'
            src={
              Array.isArray(project.images)
                ? project.images[0]
                : project.images || "/placeholder.svg"
            }
          />
        )}
      </div>
      <CardBody className='p-6 flex-grow'>
        <div className='space-y-4'>
          <h3 className='text-xl font-bold'>{project.title}</h3>
          <p className='text-muted-foreground'>{project.description}</p>
          <div className='flex flex-wrap gap-2'>
            {project.technologies.map((tech: string, index: number) => (
              <Badge key={index} variant='shadow'>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className='p-6 pt-0 flex gap-2'>
        <Button size='sm'>
          <a
            className='flex items-center gap-1'
            href={project.githubUrl}
            rel='noopener noreferrer'
            target='_blank'
          >
            <GithubIcon className='h-4 w-4' />
            Code
          </a>
        </Button>
        <Button size='sm'>
          <a
            className='flex items-center gap-1'
            href={project.liveUrl}
            rel='noopener noreferrer'
            target='_blank'
          >
            <ExternalLink className='h-4 w-4' />
            Live Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
