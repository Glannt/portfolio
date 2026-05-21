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
          Get to know more about my academic background, skills, and what drives me as an engineer.
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
          <div className='space-y-4 text-muted-foreground leading-relaxed'>
            <p>
              I am currently a Software Engineering student at **FPT University**, specializing in building 
              high-performance full-stack web architectures and hardware-integrated IoT solutions. 
              My passion lies in bridging the gap between elegant software design and fast, reliable execution.
            </p>
            <p>
              Throughout my academic journey, I have dove deep into real-world project development, ranging from 
              customizable monorepo e-commerce frameworks with AI visual styling engines to real-time IoT-enabled 
              Smart Locker ecosystems using serial commands and MQTT communication.
            </p>
            <p>
              I thrive on tackling complex architecture challenges—such as automated exam question banks, 
              microservice synchronization patterns, database optimization, and secure API lifecycles.
            </p>
          </div>

          <div className='space-y-3'>
            <h4 className='text-xl font-semibold'>Core Interests</h4>
            <div className='flex flex-wrap gap-2'>
              <Badge color="primary" variant="flat">Backend Architecture</Badge>
              <Badge color="secondary" variant="flat">IoT & Embedded Systems</Badge>
              <Badge color="success" variant="flat">Monorepos & Microservices</Badge>
              <Badge color="warning" variant="flat">Automated Workflows (n8n)</Badge>
              <Badge color="default" variant="flat">Database Optimization</Badge>
              <Badge color="danger" variant="flat">Real-time Communications</Badge>
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
              <Card key={index} className="hover:border-primary/40 transition-colors">
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
