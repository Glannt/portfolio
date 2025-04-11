"use client";

import { Badge, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    duration: "Jan 2022 - Present",
    description:
      "Lead the frontend development team in building and maintaining a complex SaaS platform. Implemented new features, improved performance, and mentored junior developers.",
    responsibilities: [
      "Architected and developed new features using React and TypeScript",
      "Improved application performance by 40% through code optimization",
      "Led the migration from CSS modules to Tailwind CSS",
      "Conducted code reviews and mentored junior developers",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    duration: "Mar 2019 - Dec 2021",
    description:
      "Worked on multiple client projects, developing both frontend and backend solutions. Collaborated with cross-functional teams to deliver high-quality applications.",
    responsibilities: [
      "Developed RESTful APIs using Node.js and Express",
      "Built responsive user interfaces with React",
      "Implemented authentication and authorization systems",
      "Worked with MongoDB and PostgreSQL databases",
    ],
    technologies: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "WebCraft Agency",
    duration: "Jun 2017 - Feb 2019",
    description:
      "Started as an intern and was promoted to a full-time position. Worked on various client websites and web applications.",
    responsibilities: [
      "Developed and maintained client websites",
      "Implemented responsive designs from Figma mockups",
      "Optimized website performance and SEO",
      "Collaborated with designers and project managers",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress", "PHP"],
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
          Work Experience
        </h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          My professional journey and the companies I've worked with.
        </p>
      </motion.div>

      <div className='relative'>
        <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-muted' />

        <div className='space-y-12'>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`relative ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              } md:w-1/2 ${index % 2 === 0 ? "md:ml-0" : "md:ml-auto"}`}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div
                className={`absolute top-0 ${
                  index % 2 === 0 ? "md:-right-6" : "md:-left-6"
                } hidden md:block w-12 h-12 rounded-full bg-background border-4 border-muted flex items-center justify-center`}
              >
                <Briefcase className='h-5 w-5 text-primary' />
              </div>

              <Card>
                <CardBody className='p-6 space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2 md:justify-start'>
                      <Briefcase className='h-4 w-4 md:hidden' />
                      <h3 className='text-xl font-bold'>{experience.role}</h3>
                    </div>
                    <div className='flex items-center gap-2 text-muted-foreground md:justify-start'>
                      <span>{experience.company}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground md:justify-start'>
                      <Calendar className='h-4 w-4' />
                      <span>{experience.duration}</span>
                    </div>
                  </div>

                  <p className='text-muted-foreground'>{experience.description}</p>

                  <div className='space-y-2'>
                    <h4 className='font-semibold'>Key Responsibilities:</h4>
                    <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <div className='flex flex-wrap gap-2 md:justify-start'>
                    {experience.technologies.map((tech, i) => (
                      <Badge key={i} variant='shadow'>
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
