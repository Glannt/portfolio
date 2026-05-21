"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomeComponent() {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col justify-center'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                Hi, I&apos;m <span className='text-primary'>Thành Đô</span>
              </h1>
              <h2 className='text-2xl sm:text-3xl font-medium text-muted-foreground'>
                Full-Stack & IoT Systems Engineer
              </h2>
            </div>
            <p className='max-w-[600px] text-muted-foreground md:text-xl leading-relaxed'>
              I build exceptional, highly-scalable backend architectures and high-fidelity IoT integrations.
              Passionate about clean code, robust API structures, and real-time physical-digital systems.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link href='/project'>
                <Button size='lg' variant='solid' color='primary'>
                  View My Work
                </Button>
              </Link>
              <Link href='/contact'>
                <Button size='lg' variant='bordered'>
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className='flex justify-center lg:justify-end'
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className='relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/10'>
            <Image
              fill
              priority
              alt='Tống Nguyễn Thành Đô'
              className='object-cover transition-all duration-500 hover:scale-105'
              src='/assets/images/photo.png'
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
