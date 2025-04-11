"use client";

import { Badge, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

import { personalTraits } from "@/data/personal-traits";

export default function AboutComponent() {
  return (
    <div className='space-y-12'>
      <motion.div
        className='space-y-4 text-center'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>About Me</h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          Get to know more about my background, skills, and what drives me.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className='text-2xl font-bold'>My Story</h3>
          <div className='space-y-4 text-muted-foreground'>
            <p>
              I&apos;m a passionate developer with over 5 years of experience in building web
              applications. My journey in tech began when I built my first website at the age of 16,
              and I&apos;ve been hooked ever since.
            </p>
            <p>
              After graduating with a degree in Computer Science, I&apos;ve worked with various
              startups and established companies, helping them build scalable and user-friendly
              applications.
            </p>
            <p>
              When I&apos;m not coding, you can find me hiking, reading science fiction, or
              experimenting with new recipes in the kitchen.
            </p>
          </div>

          <div className='space-y-3'>
            <h4 className='text-xl font-semibold'>Personal Interests</h4>
            <div className='flex flex-wrap gap-2'>
              <Badge>Photography</Badge>
              <Badge>Hiking</Badge>
              <Badge>Reading</Badge>
              <Badge>Cooking</Badge>
              <Badge>Travel</Badge>
              <Badge>Music</Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className='text-2xl font-bold'>Personal Traits</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {personalTraits.map((trait, index) => (
              <Card key={index}>
                <CardBody className='p-6 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <div className='p-2 rounded-full bg-primary/10 text-primary'>{trait.icon}</div>
                    <h4 className='font-semibold'>{trait.title}</h4>
                  </div>
                  <p className='text-sm text-muted-foreground'>{trait.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
