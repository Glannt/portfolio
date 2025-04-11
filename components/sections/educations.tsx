"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Third-year student of FPT University",
    institution: "University of Technology",
    duration: "2022 - 2026",
    description:
      "Specialized in Software Engineering with a focus on distributed systems and cloud computing. Graduated with honors.",
    achievements: ["GPA: 3.2/4.0"],
  },
];

const certifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2022",
    description: "Validates expertise in designing and deploying scalable systems on AWS.",
  },
  {
    id: 2,
    name: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    date: "2021",
    description: "Demonstrates understanding of Scrum framework and its application.",
  },
  {
    id: 3,
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2020",
    description:
      "Certifies ability to build scalable and highly available applications using Google Cloud technologies.",
  },
  {
    id: 4,
    name: "React Certification",
    issuer: "Meta",
    date: "2019",
    description:
      "Validates proficiency in building applications with React and related technologies.",
  },
];

export default function Education() {
  return (
    <div className='space-y-12'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className='text-2xl font-bold flex items-center gap-2'>
            <GraduationCap className='h-6 w-6' />
            Education
          </h3>

          <div className='space-y-6'>
            {education.map((item, index) => (
              <Card key={item.id}>
                <CardBody className='p-6 space-y-4'>
                  <div className='space-y-2'>
                    <h4 className='text-xl font-bold'>{item.degree}</h4>
                    <div className='text-muted-foreground'>{item.institution}</div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Calendar className='h-4 w-4' />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <p className='text-muted-foreground'>{item.description}</p>

                  <div className='space-y-2'>
                    <h5 className='font-semibold'>Achievements:</h5>
                    <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                      {item.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className='text-2xl font-bold flex items-center gap-2'>
            <Award className='h-6 w-6' />
            Certifications
          </h3>

          <div className='space-y-4'>
            {certifications.map((cert, index) => (
              <Card key={cert.id}>
                <CardBody className='p-6 space-y-2'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h4 className='font-bold'>{cert.name}</h4>
                      <div className='text-sm text-muted-foreground'>{cert.issuer}</div>
                    </div>
                    <div className='text-sm text-muted-foreground'>{cert.date}</div>
                  </div>
                  <p className='text-muted-foreground'>{cert.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
