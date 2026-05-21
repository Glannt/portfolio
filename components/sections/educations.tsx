"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Bachelor of Software Engineering",
    institution: "FPT University (Vietnam)",
    duration: "2022 - 2026 (Expected)",
    description:
      "Specialized in advanced software development, dynamic database design, microservice architectures, and real-time IoT integration frameworks. Built multiple production-ready systems as part of coursework and personal engineering initiatives.",
    achievements: [
      "GPA: 3.4 / 4.0",
      "Lead Developer & Architect for multiple end-to-end full-stack systems",
    ],
  },
];

const certifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2025",
    description: "Validates technical expertise in designing and deploying scalable, highly available systems on AWS.",
  },
  {
    id: 2,
    name: "Java Spring Boot Enterprise Developer",
    issuer: "FPT Academy / Udemy",
    date: "2024",
    description: "Demonstrates advanced proficiency in Spring MVC, JPA, Hibernate, security configurations, and RESTful API engineering.",
  },
  {
    id: 3,
    name: "Advanced React & Next.js Professional",
    issuer: "Meta / Frontend Masters",
    date: "2023",
    description:
      "Certifies deep understanding of state management, custom hooks, render optimization, dynamic routes, and micro-interactions.",
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
            <GraduationCap className='h-6 w-6 text-primary' />
            Education
          </h3>

          <div className='space-y-6'>
            {education.map((item) => (
              <Card key={item.id} className="hover:border-primary/40 border border-transparent transition-all">
                <CardBody className='p-6 space-y-4'>
                  <div className='space-y-2'>
                    <h4 className='text-xl font-bold'>{item.degree}</h4>
                    <div className='text-primary font-medium'>{item.institution}</div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Calendar className='h-4 w-4' />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <p className='text-muted-foreground text-sm leading-relaxed'>{item.description}</p>

                  <div className='space-y-2'>
                    <h5 className='font-semibold text-sm'>Key Achievements:</h5>
                    <ul className='list-disc list-inside space-y-1 text-sm text-muted-foreground'>
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
            <Award className='h-6 w-6 text-primary' />
            Certifications
          </h3>

          <div className='space-y-4'>
            {certifications.map((cert) => (
              <Card key={cert.id} className="hover:border-primary/40 border border-transparent transition-all">
                <CardBody className='p-6 space-y-2'>
                  <div className='flex justify-between items-start gap-4'>
                    <div>
                      <h4 className='font-bold text-base'>{cert.name}</h4>
                      <div className='text-sm text-primary'>{cert.issuer}</div>
                    </div>
                    <div className='text-xs text-muted-foreground bg-muted px-2 py-1 rounded'>{cert.date}</div>
                  </div>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{cert.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
