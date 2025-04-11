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
                Hi, I'm <span className='text-primary'>Thành Đô</span>
              </h1>
              <h2 className='text-2xl sm:text-3xl font-medium text-muted-foreground'>
                Backend Developer
              </h2>
            </div>
            <p className='max-w-[600px] text-muted-foreground md:text-xl'>
              I build exceptional and accessible digital experiences for the web. Passionate about
              creating solutions that are both beautiful and functional.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='https://heroui.com?utm_source=next-app-template'
                title='View my work'
              >
                <Button size='lg' variant='solid'>
                  <a href='resume'>View My Work</a>
                </Button>
              </Link>
              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='https://heroui.com?utm_source=next-app-template'
                title='Contact'
              >
                <Button size='lg' variant='solid'>
                  <a href='contact'>Contact Me</a>
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
          <div className='relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20'>
            <Image
              fill
              priority
              alt='Your Name'
              className='object-cover'
              src='/placeholder.svg?height=400&width=400'
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
